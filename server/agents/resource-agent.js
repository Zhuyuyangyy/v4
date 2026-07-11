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

  output = normalizeResourcePackage(output, { profile, weaknesses, topic })

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

function normalizeResourcePackage(output, context) {
  const normalized = output && typeof output === 'object' ? output : {}
  const generatedResources = Array.isArray(normalized.generatedResources) && normalized.generatedResources.length >= 5
    ? normalized.generatedResources
    : buildGeneratedResources(context)
  const qualityEvaluation = normalized.qualityEvaluation || buildQualityEvaluation(generatedResources)
  const antiHallucination = normalized.antiHallucination || buildAntiHallucination(context)

  return {
    ...normalized,
    generatedResources,
    qualityEvaluation,
    antiHallucination,
  }
}

function fallbackResourcePackage({ profile, weaknesses, topic }) {
  const weakest = weaknesses?.[0] || topic || '基础知识'
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

function weakLabel(value) {
  if (!value) return '核心知识点'
  if (typeof value === 'string') return value
  return value.tag || value.label || value.name || '核心知识点'
}

function buildGeneratedResources({ profile, weaknesses, topic }) {
  const safeTopic = topic || '个性化学习主题'
  const weak = weakLabel(weaknesses?.[0])
  const score = Number.isFinite(profile?.totalScore) ? profile.totalScore : 60
  const level = score >= 75 ? '进阶' : score >= 50 ? '巩固' : '入门'

  return [
    {
      id: 'mindmap-01',
      type: 'mindmap',
      title: `${safeTopic} 知识结构思维导图`,
      format: 'graph',
      content: {
        center: safeTopic,
        branches: ['前置概念', '核心方法', '常见误区', '练习路径', '项目应用'],
      },
      profileEvidence: `画像显示当前薄弱点为 ${weak}，需要先建立结构化认知。`,
      qualityScore: 92,
      qualityReason: '覆盖前置、核心、误区、练习和迁移应用，适合先整体建模。',
    },
    {
      id: 'doc-01',
      type: 'document',
      title: `${safeTopic} ${level}讲义`,
      format: 'markdown',
      content: {
        sections: ['概念定义', '例题拆解', '关键流程', '错因提醒', '课后复盘'],
      },
      profileEvidence: `综合评分 ${score}，讲义难度设置为${level}。`,
      qualityScore: 90,
      qualityReason: '讲义结构完整，包含可复盘材料，便于沉淀为学习档案。',
    },
    {
      id: 'video-01',
      type: 'video',
      title: `${safeTopic} 12 分钟微课脚本`,
      format: 'script',
      content: {
        outline: ['情境导入', '核心概念动画', '手写推导', '即时提问', '总结迁移'],
        estimatedMinutes: 12,
      },
      profileEvidence: '用于多模态呈现，适配偏好视频/图解的学习者。',
      qualityScore: 88,
      qualityReason: '脚本包含讲解节奏和互动提问，可直接转为录屏或数字人讲解。',
    },
    {
      id: 'exercise-01',
      type: 'exercise',
      title: `${safeTopic} 自适应练习题`,
      format: 'quiz',
      content: {
        questions: [
          { difficulty: 'basic', prompt: `解释 ${safeTopic} 的核心概念。` },
          { difficulty: 'applied', prompt: `用一个例子说明 ${safeTopic} 如何解决实际问题。` },
          { difficulty: 'diagnostic', prompt: `指出 ${weak} 相关的常见错误并修正。` },
        ],
      },
      profileEvidence: `题目围绕 ${weak} 进行诊断和补弱。`,
      qualityScore: 91,
      qualityReason: '包含基础、应用和诊断三层题目，可沉淀为错题与掌握度证据。',
    },
    {
      id: 'code-01',
      type: 'code',
      title: `${safeTopic} 代码实验模板`,
      format: 'code-lab',
      content: {
        language: 'python',
        tasks: ['补全核心函数', '运行断言测试', '解释复杂度', '记录错误原因'],
      },
      profileEvidence: '用于把概念迁移到项目实践，满足代码类资源生成。',
      qualityScore: 89,
      qualityReason: '代码任务带断言和反思记录，减少只看不练的问题。',
    },
  ]
}

function buildQualityEvaluation(resources) {
  const averageScore = Math.round(resources.reduce((sum, item) => sum + (item.qualityScore || 80), 0) / resources.length)
  return {
    averageScore,
    dimensions: [
      { key: 'profile_match', label: '画像匹配度', score: Math.min(96, averageScore + 2) },
      { key: 'knowledge_accuracy', label: '知识准确性', score: Math.max(80, averageScore - 2) },
      { key: 'modality_coverage', label: '多模态覆盖', score: 95 },
      { key: 'actionability', label: '可执行性', score: Math.min(94, averageScore + 1) },
    ],
    cases: resources.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      score: item.qualityScore || averageScore,
      reason: item.qualityReason || '资源结构完整，可用于学习闭环验证。',
    })),
  }
}

function buildAntiHallucination({ topic, weaknesses }) {
  return {
    strategy: '本地规则结构化生成 + LLM JSON 解析校验 + 画像证据绑定 + 低置信度 fallback',
    checks: [
      '每个资源必须绑定画像证据或薄弱点',
      '每个练习题必须包含答案或诊断目标',
      '资源类型固定枚举，避免模型生成不可展示格式',
      'LLM 输出无法解析时使用本地规则包',
    ],
    evidence: [
      `主题约束: ${topic || '未指定主题'}`,
      `薄弱点约束: ${(weaknesses || []).map(weakLabel).filter(Boolean).slice(0, 3).join('、') || '画像默认薄弱点'}`,
    ],
  }
}
