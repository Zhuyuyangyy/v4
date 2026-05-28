import { callLlm } from '../llm/provider.js'
import { createAgentResult, AGENT_NAMES } from '../schemas.js'

const SYSTEM_PROMPT = `你是一个智能学习辅导老师。根据学生的问题、学习画像和辅导模式，给出详细、有针对性的回答。
回答应包含：1) 问题分析 2) 核心讲解 3) 举例说明 4) 学习建议 5) 相关资源推荐。`

export async function runTutorAgent({ question, mode, profile, resources }) {
  const start = Date.now()
  const input = { question, mode }

  const modeLabels = {
    qa: '自由问答', solve: '解题助手', explain: '概念精讲',
    brainstorm: '举一反三', 'concept-overview': '概念总览',
    'case-intro': '案例引入', 'step-solve': '分步解题', 'debug-guide': '调试指导',
  }
  const modeLabel = modeLabels[mode] || '自由问答'

  const userPrompt = `辅导模式: ${modeLabel}
学生问题: ${question}
学生画像: ${JSON.stringify(profile?.dimensions || [])}
可用资源: ${JSON.stringify(resources?.slice(0, 3) || [])}

请给出个性化辅导回答。`

  const llmResult = await callLlm(SYSTEM_PROMPT, userPrompt)
  let answer
  let fallbackUsed = false
  const evidence = []

  if (llmResult.content && !llmResult.fallbackUsed) {
    answer = llmResult.content
    evidence.push('LLM 生成辅导回答')
  } else {
    fallbackUsed = true
  }

  if (fallbackUsed) {
    answer = fallbackTutorReply({ question, modeLabel, profile })
    evidence.push('本地规则 fallback 生成辅导回答')
  }

  const durationMs = Date.now() - start
  return createAgentResult({
    agentName: AGENT_NAMES.TUTOR,
    input,
    output: { answer, mode: modeLabel },
    confidence: fallbackUsed ? 0.6 : 0.9,
    evidence,
    durationMs,
    fallbackUsed,
  })
}

function fallbackTutorReply({ question, modeLabel, profile }) {
  const q = String(question || '').trim() || '未提供问题'
  const weakest = profile?.weaknesses?.[0]?.tag || ''

  return (
    `当前模式：${modeLabel}\n\n` +
    `问题：${q}\n\n` +
    '**问题分析**\n' +
    '这个问题涉及核心概念的理解和应用。让我们逐步分析。\n\n' +
    '**核心讲解**\n' +
    '1. 首先抓住定义：用一句话说清楚核心概念。\n' +
    '2. 然后理解原理：为什么这样设计，解决了什么问题。\n' +
    '3. 最后看应用：在实际场景中如何使用。\n\n' +
    '**举例说明**\n' +
    '以一个最简单的例子开始，逐步增加复杂度，确保每一步都能理解。\n\n' +
    '**学习建议**\n' +
    (weakest ? `- 针对你的薄弱点"${weakest}"，建议先巩固基础再深入。\n` : '') +
    '- 建议采用"理解→练习→总结"三步法。\n' +
    '- 每次学习后做 5 分钟回顾，加深记忆。\n\n' +
    '**推荐资源**\n' +
    '- 概念速查卡片\n' +
    '- 配套练习题集\n' +
    '- 知识脉络思维导图'
  )
}
