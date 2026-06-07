import { runProfileAgent } from './profile-agent.js'
import { runResourceAgent } from './resource-agent.js'
import { runPathAgent } from './path-agent.js'
import { runTutorAgent } from './tutor-agent.js'
import { runEvaluationAgent } from './evaluation-agent.js'
import { runReflectionAgent } from './reflection-agent.js'
import { buildTrace, recordTrace } from '../evidence/recorder.js'
import { AGENT_NAMES } from '../schemas.js'

export async function orchestrateProfileAnalysis(answers) {
  const start = Date.now()
  const profileResult = await runProfileAgent(answers)
  const durationMs = Date.now() - start

  const trace = buildTrace({
    requestId: `profile-${Date.now()}`,
    agents: [AGENT_NAMES.PROFILE],
    inputsSummary: `画像问卷: ${Object.keys(answers || {}).length} 个字段`,
    outputsSummary: `综合评分: ${profileResult.output?.totalScore || 'N/A'}`,
    evidence: profileResult.evidence,
    riskFlags: profileResult.confidence < 0.7 ? ['低置信度'] : [],
    fallbackUsed: profileResult.fallbackUsed,
    durationMs,
    agentResults: [profileResult],
  })
  recordTrace(trace)

  return {
    profile: profileResult.output,
    agentResults: [profileResult],
    trace,
  }
}

export async function orchestrateResourceGeneration({ profile, weaknesses, topic, resourceType }) {
  const start = Date.now()

  const profileResult = await runProfileAgent({ dimensions: profile?.dimensions, totalScore: profile?.totalScore })
  const resourceResult = await runResourceAgent({ profile, weaknesses, topic, resourceType })
  const durationMs = Date.now() - start

  const trace = buildTrace({
    requestId: `resource-${Date.now()}`,
    agents: [AGENT_NAMES.PROFILE, AGENT_NAMES.RESOURCE],
    inputsSummary: `主题: ${topic}, 类型: ${resourceType}`,
    outputsSummary: `资源包: ${Object.keys(resourceResult.output || {}).join(', ')}`,
    evidence: [...profileResult.evidence, ...resourceResult.evidence],
    riskFlags: resourceResult.confidence < 0.7 ? ['资源生成置信度低'] : [],
    fallbackUsed: profileResult.fallbackUsed || resourceResult.fallbackUsed,
    durationMs,
    agentResults: [profileResult, resourceResult],
  })
  recordTrace(trace)

  return {
    resourcePackage: resourceResult.output,
    agentResults: [profileResult, resourceResult],
    trace,
  }
}

export async function orchestratePathReplan({ profile, evaluation, currentPath }) {
  const start = Date.now()

  const evalResult = await runEvaluationAgent({ profile, evaluation })
  const pathResult = await runPathAgent({ profile, evaluation, currentPath, replan: true })
  const durationMs = Date.now() - start

  const trace = buildTrace({
    requestId: `path-replan-${Date.now()}`,
    agents: [AGENT_NAMES.EVALUATION, AGENT_NAMES.PATH],
    inputsSummary: `重规划路径, 评分: ${profile?.totalScore || 'N/A'}`,
    outputsSummary: `路径阶段: ${pathResult.output?.phases?.length || 0} 个`,
    evidence: [...evalResult.evidence, ...pathResult.evidence],
    riskFlags: [],
    fallbackUsed: evalResult.fallbackUsed || pathResult.fallbackUsed,
    durationMs,
    agentResults: [evalResult, pathResult],
  })
  recordTrace(trace)

  return {
    path: pathResult.output,
    evaluation: evalResult.output,
    agentResults: [evalResult, pathResult],
    trace,
  }
}

export async function orchestrateTutoring({ question, mode, profile, resources }) {
  const start = Date.now()

  const profileResult = await runProfileAgent({ dimensions: profile?.dimensions, totalScore: profile?.totalScore })
  const tutorResult = await runTutorAgent({ question, mode, profile, resources })
  const durationMs = Date.now() - start

  const trace = buildTrace({
    requestId: `tutor-${Date.now()}`,
    agents: [AGENT_NAMES.PROFILE, AGENT_NAMES.TUTOR],
    inputsSummary: `问题: ${question?.slice(0, 50)}, 模式: ${mode}`,
    outputsSummary: `回答长度: ${(tutorResult.output?.answer || '').length} 字符`,
    evidence: [...profileResult.evidence, ...tutorResult.evidence],
    riskFlags: [],
    fallbackUsed: profileResult.fallbackUsed || tutorResult.fallbackUsed,
    durationMs,
    agentResults: [profileResult, tutorResult],
  })
  recordTrace(trace)

  return {
    answer: tutorResult.output?.answer || '',
    agentResults: [profileResult, tutorResult],
    trace,
  }
}

export async function orchestrateFullEvaluation({ profile, learningData, exerciseResults, knowledgeContext }) {
  const start = Date.now()

  const evalResult = await runEvaluationAgent({ profile, learningData, exerciseResults, knowledgeContext })
  const reflectResult = await runReflectionAgent({ profile, evaluation: evalResult.output })
  const durationMs = Date.now() - start

  const trace = buildTrace({
    requestId: `eval-${Date.now()}`,
    agents: [AGENT_NAMES.EVALUATION, AGENT_NAMES.REFLECTION],
    inputsSummary: `综合评估, 评分: ${profile?.totalScore || 'N/A'}`,
    outputsSummary: `掌握度: ${evalResult.output?.mastery?.length || 0} 项, 风险: ${reflectResult.output?.riskAssessment?.level || 'N/A'}`,
    evidence: [...evalResult.evidence, ...reflectResult.evidence],
    riskFlags: reflectResult.output?.riskAssessment?.level === 'high' ? ['高风险'] : [],
    fallbackUsed: evalResult.fallbackUsed || reflectResult.fallbackUsed,
    durationMs,
    agentResults: [evalResult, reflectResult],
  })
  recordTrace(trace)

  return {
    evaluation: evalResult.output,
    reflection: reflectResult.output,
    agentResults: [evalResult, reflectResult],
    trace,
  }
}

export async function orchestrateFullRun({ answers, topic, resourceType, question, mode }) {
  const start = Date.now()

  const profileResult = await runProfileAgent(answers || {})
  const profile = profileResult.output

  const resourceResult = await runResourceAgent({ profile, weaknesses: profile?.weaknesses || [], topic: topic || '核心概念', resourceType: resourceType || 'all' })

  const tutorResult = await runTutorAgent({ question: question || '请帮我梳理学习重点', mode: mode || 'qa', profile, resources: [] })

  const evalResult = await runEvaluationAgent({ profile, learningData: {}, exerciseResults: {} })

  const pathResult = await runPathAgent({ profile, evaluation: evalResult.output, replan: true })

  const reflectResult = await runReflectionAgent({ profile, evaluation: evalResult.output })

  const durationMs = Date.now() - start
  const allAgentResults = [profileResult, resourceResult, tutorResult, evalResult, pathResult, reflectResult]
  const allEvidence = allAgentResults.flatMap(r => r.evidence || [])
  const anyFallback = allAgentResults.some(r => r.fallbackUsed)

  const trace = buildTrace({
    requestId: `full-run-${Date.now()}`,
    agents: [AGENT_NAMES.PROFILE, AGENT_NAMES.RESOURCE, AGENT_NAMES.TUTOR, AGENT_NAMES.EVALUATION, AGENT_NAMES.PATH, AGENT_NAMES.REFLECTION],
    inputsSummary: `完整闭环: 画像+资源+辅导+评估+路径+反思`,
    outputsSummary: `评分: ${profile?.totalScore || 'N/A'}, 路径: ${pathResult.output?.phases?.length || 0} 阶段, 风险: ${reflectResult.output?.riskAssessment?.level || 'N/A'}`,
    evidence: allEvidence,
    riskFlags: reflectResult.output?.riskAssessment?.level === 'high' ? ['高风险'] : [],
    fallbackUsed: anyFallback,
    durationMs,
    agentResults: allAgentResults,
  })
  recordTrace(trace)

  return {
    workflowId: `wf-${Date.now()}`,
    agentResults: allAgentResults,
    resourcePackage: resourceResult.output,
    tutoringAnswer: tutorResult.output?.answer || '',
    evaluation: evalResult.output,
    path: pathResult.output,
    reflection: reflectResult.output,
    profile,
    trace,
  }
}
