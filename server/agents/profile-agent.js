import { callLlm, safeParseJson } from '../llm/provider.js'
import { createAgentResult, AGENT_NAMES } from '../schemas.js'

const SYSTEM_PROMPT = `你是一个学习画像分析专家。根据用户的问卷回答，分析其学习能力维度、薄弱点、学习偏好，并给出个性化建议。
请以 JSON 格式返回，包含：dimensions(数组，每项含label/value/color)、weaknesses(数组)、recommendations(数组)。`

export async function runProfileAgent(answers) {
  const start = Date.now()
  const input = { answers }

  const userPrompt = `分析以下学习画像问卷回答：${JSON.stringify(answers)}`
  const llmResult = await callLlm(SYSTEM_PROMPT, userPrompt)
  let output
  let fallbackUsed = false
  const evidence = []

  if (llmResult.content && !llmResult.fallbackUsed) {
    const parsed = safeParseJson(llmResult.content)
    if (parsed) {
      output = parsed
      evidence.push('LLM 生成画像分析')
    } else {
      fallbackUsed = true
    }
  } else {
    fallbackUsed = true
  }

  if (fallbackUsed) {
    output = fallbackProfileAnalysis(answers)
    evidence.push('本地规则 fallback 生成画像分析')
  }

  const durationMs = Date.now() - start
  return createAgentResult({
    agentName: AGENT_NAMES.PROFILE,
    input,
    output,
    confidence: fallbackUsed ? 0.7 : 0.9,
    evidence,
    durationMs,
    fallbackUsed,
  })
}

function fallbackProfileAnalysis(answers) {
  const levelBoost = { beginner: 0, intermediate: 5, advanced: 10, expert: 15 }
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const dimensions = [
    { key: 'knowledgeBase', label: '知识基础', value: clamp((answers.knowledgeBase || 50) + (levelBoost[answers.level] || 0), 0, 100), color: '#00d4ff' },
    { key: 'learningSpeed', label: '学习速度', value: clamp((answers.learningSpeed || 50) + 2, 0, 100), color: '#3b82f6' },
    { key: 'logicalThinking', label: '逻辑思维', value: clamp(answers.logicalThinking || 50, 0, 100), color: '#7c3aed' },
    { key: 'creativity', label: '创造力', value: clamp(answers.creativity || 50, 0, 100), color: '#06d6a0' },
    { key: 'focus', label: '专注力', value: clamp(answers.focus || 50, 0, 100), color: '#f59e0b' },
    { key: 'selfDiscipline', label: '自律性', value: clamp(answers.selfDiscipline || 50, 0, 100), color: '#f43f5e' },
  ]

  const totalScore = Math.round(dimensions.reduce((s, d) => s + d.value, 0) / dimensions.length)
  const weakest = [...dimensions].sort((a, b) => a.value - b.value).slice(0, 3)

  return {
    dimensions: dimensions.map(({ label, value, color }) => ({ label, value, color })),
    totalScore,
    weaknesses: weakest.map((item, i) => ({ tag: `${item.label}提升`, count: 8 - i * 2 })),
    recommendations: [
      `优先巩固 ${weakest[0].label}，每天安排 20 分钟专项训练。`,
      `继续发挥 ${dimensions.sort((a, b) => b.value - a.value)[0].label} 优势。`,
      '建议每两周复盘一次学习进度，动态调整资源和节奏。',
    ],
  }
}
