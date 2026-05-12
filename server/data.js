const nowDate = '2026-05-12'

export const resources = [
  { id: 0, type: 'doc', title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战，涵盖监督学习、无监督学习、模型评估等内容。', tags: ['Python', 'ML'], date: '2026-05-10', color: '#00d4ff', reads: 234 },
  { id: 1, type: 'mindmap', title: '深度学习知识图谱', desc: '神经网络、CNN、RNN 架构全景图，清晰梳理深度学习各分支之间的关系与发展脉络。', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189 },
  { id: 2, type: 'exercise', title: '线性代数基础习题', desc: '矩阵运算、特征值、向量空间，精选 50 道经典习题，覆盖线性代数核心知识点。', tags: ['数学', '练习'], date: '2026-05-08', color: '#06d6a0', reads: 156 },
  { id: 3, type: 'video', title: 'Transformer 原理解析', desc: '深入讲解 Attention 机制与多头注意力，从论文推导到代码实现。', tags: ['NLP', '进阶'], date: '2026-05-07', color: '#f59e0b', reads: 312 },
  { id: 4, type: 'code', title: 'KNN 算法实现', desc: '从零实现 K-近邻分类器，包含完整的 Python 代码、测试用例和性能优化技巧。', tags: ['算法', '实现'], date: '2026-05-06', color: '#f43f5e', reads: 98 },
  { id: 5, type: 'doc', title: '概率论与数理统计速查', desc: '常见分布、假设检验、贝叶斯公式，一份全面的概率论速查手册。', tags: ['数学', '统计'], date: '2026-05-05', color: '#00d4ff', reads: 201 },
  { id: 6, type: 'mindmap', title: '数据结构思维导图', desc: '数组、链表、树、图、哈希表，数据结构知识点全景梳理，面试复习必备。', tags: ['CS基础', '架构'], date: '2026-05-04', color: '#7c3aed', reads: 267 },
  { id: 7, type: 'exercise', title: '动态规划专项练习', desc: '经典 DP 问题与解题模板，从背包问题到区间 DP，逐步提升算法能力。', tags: ['算法', '进阶'], date: '2026-05-03', color: '#06d6a0', reads: 143 },
  { id: 8, type: 'video', title: 'PyTorch 快速上手', desc: '张量运算、自动求导、模型构建，30 分钟快速掌握 PyTorch 核心功能。', tags: ['框架', '入门'], date: '2026-05-02', color: '#f59e0b', reads: 378 },
]

export const recommendedResources = [
  { id: 9, type: 'video', title: '机器学习数学基础', desc: '微积分、线性代数、概率论在 ML 中的应用', tags: ['数学', 'ML'], date: '2026-05-11', color: '#00d4ff', reads: 89 },
  { id: 10, type: 'doc', title: '模型部署实战指南', desc: '从训练到生产，ML 模型部署全流程解析', tags: ['工程', '进阶'], date: '2026-05-11', color: '#7c3aed', reads: 67 },
  { id: 11, type: 'code', title: 'Git 版本控制入门', desc: '团队协作必备，Git 工作流与最佳实践', tags: ['工具', '基础'], date: '2026-05-10', color: '#06d6a0', reads: 45 },
]

export const learningPathPayload = {
  phases: [
    {
      title: '基础夯实',
      period: '第 1-4 周',
      progress: 100,
      status: 'completed',
      color: '#00d4ff',
      nodes: [
        { name: 'Python 语言基础', progress: 100, duration: '1 周', resources: 6 },
        { name: '数据结构入门', progress: 100, duration: '1.5 周', resources: 4 },
        { name: '数学基础：线性代数', progress: 100, duration: '1.5 周', resources: 5 },
      ],
    },
    {
      title: '核心进阶',
      period: '第 5-10 周',
      progress: 65,
      status: 'active',
      color: '#7c3aed',
      nodes: [
        { name: '机器学习概论', progress: 80, duration: '2 周', resources: 8 },
        { name: '监督学习算法', progress: 60, duration: '2 周', resources: 6 },
        { name: '无监督学习算法', progress: 40, duration: '1.5 周', resources: 4 },
        { name: '模型评估与调优', progress: 20, duration: '1 周', resources: 3 },
      ],
    },
    {
      title: '专题深入',
      period: '第 11-16 周',
      progress: 25,
      status: 'active',
      color: '#06d6a0',
      nodes: [
        { name: '深度学习基础', progress: 30, duration: '2 周', resources: 7 },
        { name: '自然语言处理', progress: 20, duration: '2 周', resources: 5 },
        { name: '计算机视觉', progress: 0, duration: '2 周', resources: 5 },
      ],
    },
    {
      title: '实战项目',
      period: '第 17-20 周',
      progress: 0,
      status: 'locked',
      color: '#f59e0b',
      nodes: [
        { name: '综合项目实战', progress: 0, duration: '2 周', resources: 3 },
        { name: '作品集构建', progress: 0, duration: '1 周', resources: 2 },
        { name: '面试准备', progress: 0, duration: '1 周', resources: 4 },
      ],
    },
  ],
  weeklyGoals: [
    { label: '完成 Python 基础', progress: 100, target: '1 章' },
    { label: '数据结构练习', progress: 60, target: '20 题' },
    { label: '阅读论文', progress: 30, target: '2 篇' },
    { label: '编程项目实践', progress: 0, target: '1 个' },
  ],
}

export const evaluationPayload = {
  generatedAt: nowDate,
  stats: [
    { label: '学习时长', value: '128h', change: '+12h', color: '#00d4ff' },
    { label: '完成课时', value: '47', change: '+5', color: '#7c3aed' },
    { label: '平均正确率', value: '82%', change: '+3%', color: '#06d6a0' },
    { label: '知识掌握度', value: '68%', change: '+8%', color: '#f59e0b' },
  ],
  suggestions: [
    '概率论与数理统计是当前短板，建议安排两次专项复习。',
    '机器学习基础掌握较稳，可以逐步加入项目实践。',
    '本周学习时长较上周提升 15%，保持当前节奏即可。',
  ],
}

export const tutoringTopics = [
  {
    label: '编程开发',
    questions: ['Python 中列表和元组的区别？', '解释一下闭包及其作用', 'RESTful API 设计有哪些关键原则？'],
  },
  {
    label: '数据科学',
    questions: ['什么是过拟合？如何避免？', '解释交叉验证的原理', 'PCA 降维解决了什么问题？'],
  },
]

export function buildChatReply(message) {
  const text = String(message || '').trim()
  const topic = text || '当前学习问题'
  return {
    content: `我先帮你把问题拆开来看：${topic}\n\n1. 先明确你现在卡住的是概念、实现还是练习。\n2. 如果是概念问题，先抓核心定义和一个最小例子。\n3. 如果是实现问题，优先把输入、输出、边界条件列清楚。\n\n接下来我建议你先告诉我你最想要的是“讲概念”、“给代码示例”还是“出练习题”。`,
    resources: [
      { type: 'doc', title: '相关概念速查', color: '#00d4ff' },
      { type: 'mindmap', title: '知识脉络图', color: '#7c3aed' },
      { type: 'exercise', title: '配套练习', color: '#06d6a0' },
    ],
    suggestions: ['给我一个代码示例', '用更简单的话解释', '顺便出 3 道练习题'],
  }
}

export function buildTutoringReply(question, mode = 'qa') {
  const titleMap = {
    qa: '自由问答',
    solve: '解题助手',
    explain: '概念精讲',
    brainstorm: '举一反三',
  }
  const q = String(question || '').trim() || '未提供问题'

  return {
    answer: `当前模式：${titleMap[mode] || '自由问答'}\n\n问题：${q}\n\n建议你先抓住“定义、例子、应用”这三个层次。如果你愿意，我下一步可以继续把它拆成步骤、代码或练习。`,
    time: '即时返回',
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function labelOf(value, options) {
  const match = options.find(item => item.value === value)
  return match ? match.label : value
}

function today() {
  return nowDate
}

export function analyzeProfile(answers) {
  const levelBoost = {
    beginner: 0,
    intermediate: 5,
    advanced: 10,
    expert: 15,
  }

  const dims = [
    { key: 'knowledgeBase', label: '知识基础', value: clamp((answers.knowledgeBase || 50) + (levelBoost[answers.level] || 0), 0, 100), color: '#00d4ff' },
    { key: 'learningSpeed', label: '学习速度', value: clamp((answers.learningSpeed || 50) + 2, 0, 100), color: '#3b82f6' },
    { key: 'logicalThinking', label: '逻辑思维', value: clamp(answers.logicalThinking || 50, 0, 100), color: '#7c3aed' },
    { key: 'creativity', label: '创造力', value: clamp(answers.creativity || 50, 0, 100), color: '#06d6a0' },
    { key: 'focus', label: '专注力', value: clamp(answers.focus || 50, 0, 100), color: '#f59e0b' },
    { key: 'selfDiscipline', label: '自律性', value: clamp(answers.selfDiscipline || 50, 0, 100), color: '#f43f5e' },
  ]

  const totalScore = Math.round(dims.reduce((sum, item) => sum + item.value, 0) / dims.length)
  const strongest = [...dims].sort((a, b) => b.value - a.value)[0]
  const weakest = [...dims].sort((a, b) => a.value - b.value).slice(0, 3)

  const preferences = [
    { label: '最佳时段', value: labelOf(answers.bestTime, [{ value: 'morning', label: '清晨' }, { value: 'afternoon', label: '下午' }, { value: 'evening', label: '晚上' }, { value: 'night', label: '深夜' }]) },
    { label: '资源偏好', value: labelOf(answers.resourcePreference, [{ value: 'video', label: '视频课程' }, { value: 'reading', label: '阅读文档' }, { value: 'practice', label: '练习题' }, { value: 'project', label: '项目实战' }]) },
    { label: '每周投入', value: labelOf(answers.weeklyHours, [{ value: 'less-than-5', label: '小于 5 小时' }, { value: '5-10', label: '5-10 小时' }, { value: '10-20', label: '10-20 小时' }, { value: 'more-than-20', label: '20 小时以上' }]) },
    { label: '学习节奏', value: labelOf(answers.learningPace, [{ value: 'steady', label: '稳扎稳打' }, { value: 'moderate', label: '均衡推进' }, { value: 'fast', label: '快速突破' }]) },
  ]

  return {
    dimensions: dims.map(({ label, value, color }) => ({ label, value, color })),
    totalScore,
    stats: [
      { label: '综合评分', value: String(totalScore), icon: 'Brain', color: '#00d4ff' },
      { label: '最强维度', value: strongest.label, icon: 'Zap', color: '#3b82f6' },
      { label: '待提升', value: `${weakest.length} 项`, icon: 'BarChart3', color: '#f59e0b' },
      { label: '学习阶段', value: labelOf(answers.level, [{ value: 'beginner', label: '初级' }, { value: 'intermediate', label: '中级' }, { value: 'advanced', label: '高级' }, { value: 'expert', label: '专家' }]), icon: 'BookOpen', color: '#06d6a0' },
    ],
    weaknesses: weakest.map((item, index) => ({ tag: `${item.label}提升`, count: 8 - index * 2 })),
    skillTree: [
      {
        category: '核心能力',
        color: '#00d4ff',
        skills: [
          { name: '理论基础', level: dims[0].value },
          { name: '问题拆解', level: dims[2].value },
          { name: '持续学习', level: dims[5].value },
        ],
      },
    ],
    preferences,
    timeline: [
      { date: today(), event: '完成学习画像评估', score: `${totalScore}分`, type: 'up' },
    ],
    recommendations: [
      `优先巩固 ${weakest[0].label}，每天安排 20 分钟专项训练。`,
      `继续发挥 ${strongest.label} 优势，把它用在当前学习方向的关键任务里。`,
      '建议每两周复盘一次学习进度，动态调整资源和节奏。',
    ],
  }
}
