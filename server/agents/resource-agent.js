import { callLlm, safeParseJson } from '../llm/provider.js'
import { createAgentResult, AGENT_NAMES } from '../schemas.js'

const SYSTEM_PROMPT = `你是一个个性化学习资源生成专家。根据用户画像、薄弱点和主题，生成包含以下内容的资源包：
1. concept: 概念讲解
2. example: 例题
3. exercise: 练习题（含题目、选项、答案、解析）
4. errorTip: 常见错因提醒
5. recommendReason: 推荐理由
6. profileEvidence: 适配画像证据

请以 JSON 格式返回，包含以上六个字段。每个字段是字符串或对象。`

export async function runResourceAgent({ profile, weaknesses, topic, resourceType }) {
  const start = Date.now()
  const input = { profile, weaknesses, topic, resourceType }

  const userPrompt = `用户画像: ${JSON.stringify(profile?.dimensions || [])}
薄弱点: ${JSON.stringify(weaknesses || [])}
主题: ${topic}
资源类型: ${resourceType || 'all'}

请生成个性化学习资源包。`

  const llmResult = await callLlm(SYSTEM_PROMPT, userPrompt)
  let output
  let fallbackUsed = false
  const evidence = []

  if (llmResult.content && !llmResult.fallbackUsed) {
    const parsed = safeParseJson(llmResult.content)
    if (parsed) {
      output = parsed
      evidence.push('LLM 生成个性化资源')
    } else {
      fallbackUsed = true
    }
  } else {
    fallbackUsed = true
  }

  if (fallbackUsed) {
    output = fallbackResourcePackage({ profile, weaknesses, topic })
    evidence.push('本地规则 fallback 生成资源包')
  }

  const durationMs = Date.now() - start
  return createAgentResult({
    agentName: AGENT_NAMES.RESOURCE,
    input,
    output,
    confidence: fallbackUsed ? 0.65 : 0.88,
    evidence,
    durationMs,
    fallbackUsed,
  })
}

function fallbackResourcePackage({ profile, weaknesses, topic }) {
  const weakest = weaknesses?.[0]?.tag || topic || '基础知识'
  const level = profile?.totalScore > 70 ? '进阶' : profile?.totalScore > 40 ? '中级' : '入门'

  return {
    concept: `${topic}是当前学习重点。从基本定义出发：${topic}的核心思想是将复杂问题分解为可操作的步骤。${level}学习者应重点关注概念间的关联和实际应用场景。`,
    example: {
      title: `${topic} — 典型例题`,
      description: `已知条件：与${topic}相关的标准问题场景。求解：运用${topic}的核心方法，逐步推导出结果。`,
      steps: ['理解题意，识别关键信息', '选择合适的${topic}方法', '逐步计算并验证', '总结规律，举一反三'],
    },
    exercise: {
      title: `${topic} — 练习题`,
      questions: [
        { question: `关于${topic}的基本概念，以下哪项描述最准确？`, options: ['A. 核心定义', 'B. 错误描述', 'C. 部分正确', 'D. 无关描述'], correctAnswer: 'A', explanation: `${topic}的核心定义是...` },
        { question: `在${topic}的应用中，以下哪种方法最有效？`, options: ['A. 方法一', 'B. 方法二', 'C. 方法三', 'D. 方法四'], correctAnswer: 'B', explanation: `方法二最适合${level}水平的学习者。` },
        { question: `关于${topic}的常见误区，以下哪项需要特别注意？`, options: ['A. 误区一', 'B. 误区二', 'C. 误区三', 'D. 误区四'], correctAnswer: 'C', explanation: `这是${weakest}相关的常见错误。` },
      ],
    },
    errorTip: `学习${topic}时常见错误：1) 概念混淆，把${topic}与相关概念混淆；2) 步骤遗漏，忽略中间验证环节；3) 边界条件处理不当。建议针对"${weakest}"做专项训练。`,
    recommendReason: `该资源包针对你的薄弱点"${weakest}"定制，难度适配${level}水平，内容覆盖概念理解、例题演示和实战练习三个层次。`,
    profileEvidence: `画像分析显示你在${weakest}方面得分偏低，综合评分${profile?.totalScore || 50}分，推荐从基础概念开始巩固。`,
  }
}
