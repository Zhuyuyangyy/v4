import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const contentDir = path.join(__dirname, 'content')
const storePath = path.join(__dirname, 'store.json')

function readJsonFile(filename) {
  const filePath = path.join(contentDir, filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function nowTime() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function defaultStore() {
  return {
    profileResult: null,
    chatHistory: [],
    tutoringHistory: [],
  }
}

function readStore() {
  if (!fs.existsSync(storePath)) {
    return defaultStore()
  }

  try {
    return { ...defaultStore(), ...JSON.parse(fs.readFileSync(storePath, 'utf8')) }
  } catch {
    return defaultStore()
  }
}

function writeStore(store) {
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8')
}

function keepLast(items, limit = 20) {
  return items.slice(-limit)
}

export function getResources() {
  return readJsonFile('resources.json')
}

export function getRecommendedResources() {
  return readJsonFile('recommended-resources.json')
}

export function getLearningPathPayload() {
  return readJsonFile('learning-path.json')
}

export function getEvaluationPayload() {
  const payload = readJsonFile('evaluation.json')
  return {
    ...payload,
    generatedAt: today(),
  }
}

export function getTutoringTopics() {
  return readJsonFile('tutoring-topics.json')
}

export function getLatestProfileResult() {
  return readStore().profileResult
}

export function saveProfileResult(profileResult) {
  const store = readStore()
  store.profileResult = profileResult
  writeStore(store)
}

export function getChatHistory() {
  return readStore().chatHistory
}

export function saveChatHistoryEntry(userMessage, reply) {
  const store = readStore()
  const timestamp = nowTime()
  const historyItems = [
    ...store.chatHistory,
    {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      time: timestamp,
    },
    {
      id: Date.now() + 1,
      role: 'assistant',
      content: reply.content,
      time: timestamp,
      resources: reply.resources ?? [],
      suggestions: reply.suggestions ?? [],
    },
  ]
  store.chatHistory = keepLast(historyItems, 30)
  writeStore(store)
}

export function getTutoringHistory() {
  return readStore().tutoringHistory
}

export function saveTutoringHistoryEntry({ question, answer, mode, scenario }) {
  const store = readStore()
  store.tutoringHistory = keepLast(
    [
      ...store.tutoringHistory,
      {
        q: question,
        a: answer,
        time: nowTime(),
        mode,
        scenario: scenario || 'preview',
      },
    ],
    20,
  )
  writeStore(store)
}

export function buildChatReply(message) {
  const text = String(message || '').trim()
  const topic = text || '当前学习问题'

  return {
    content:
      `我先帮你把问题拆开来看：${topic}\n\n` +
      '1. 先确认你现在卡住的是概念、实现还是练习。\n' +
      '2. 如果是概念问题，就抓住定义、例子和适用场景。\n' +
      '3. 如果是实现问题，就优先理清输入、输出和边界条件。\n\n' +
      '如果你愿意，我下一步可以继续把它拆成步骤、代码示例，或者配套练习题。',
    resources: [
      { type: 'doc', title: '相关概念速查', color: '#00d4ff' },
      { type: 'mindmap', title: '知识脉络图', color: '#7c3aed' },
      { type: 'exercise', title: '配套练习', color: '#06d6a0' },
    ],
    suggestions: ['用更简单的话解释', '给我一个代码示例', '顺便出 3 道练习题'],
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
    answer:
      `当前模式：${titleMap[mode] || '自由问答'}\n\n` +
      `问题：${q}\n\n` +
      '建议你先抓住“定义、例子、应用”这三个层次。如果你愿意，我可以继续把它拆成步骤、代码或练习。',
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

export function analyzeProfile(answers = {}) {
  const levelBoost = {
    beginner: 0,
    intermediate: 5,
    advanced: 10,
    expert: 15,
  }

  const dimensions = [
    { key: 'knowledgeBase', label: '知识基础', value: clamp((answers.knowledgeBase || 50) + (levelBoost[answers.level] || 0), 0, 100), color: '#00d4ff' },
    { key: 'learningSpeed', label: '学习速度', value: clamp((answers.learningSpeed || 50) + 2, 0, 100), color: '#3b82f6' },
    { key: 'logicalThinking', label: '逻辑思维', value: clamp(answers.logicalThinking || 50, 0, 100), color: '#7c3aed' },
    { key: 'creativity', label: '创造力', value: clamp(answers.creativity || 50, 0, 100), color: '#06d6a0' },
    { key: 'focus', label: '专注力', value: clamp(answers.focus || 50, 0, 100), color: '#f59e0b' },
    { key: 'selfDiscipline', label: '自律性', value: clamp(answers.selfDiscipline || 50, 0, 100), color: '#f43f5e' },
  ]

  const totalScore = Math.round(dimensions.reduce((sum, item) => sum + item.value, 0) / dimensions.length)
  const strongest = [...dimensions].sort((a, b) => b.value - a.value)[0]
  const weakest = [...dimensions].sort((a, b) => a.value - b.value).slice(0, 3)

  const preferences = [
    { label: '最佳时段', value: labelOf(answers.bestTime, [{ value: 'morning', label: '清晨' }, { value: 'afternoon', label: '下午' }, { value: 'evening', label: '晚上' }, { value: 'night', label: '深夜' }]) },
    { label: '资源偏好', value: labelOf(answers.resourcePreference, [{ value: 'video', label: '视频课程' }, { value: 'reading', label: '阅读文档' }, { value: 'practice', label: '练习题' }, { value: 'project', label: '项目实战' }]) },
    { label: '每周投入', value: labelOf(answers.weeklyHours, [{ value: 'less-than-5', label: '小于 5 小时' }, { value: '5-10', label: '5-10 小时' }, { value: '10-20', label: '10-20 小时' }, { value: 'more-than-20', label: '20 小时以上' }]) },
    { label: '学习节奏', value: labelOf(answers.learningPace, [{ value: 'steady', label: '稳扎稳打' }, { value: 'moderate', label: '均衡推进' }, { value: 'fast', label: '快速突破' }]) },
  ]

  return {
    dimensions: dimensions.map(({ label, value, color }) => ({ label, value, color })),
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
          { name: '理论基础', level: dimensions[0].value },
          { name: '问题拆解', level: dimensions[2].value },
          { name: '持续学习', level: dimensions[5].value },
        ],
      },
    ],
    preferences,
    timeline: [
      { date: today(), event: '完成学习画像评估', score: `${totalScore} 分`, type: 'up' },
    ],
    recommendations: [
      `优先巩固 ${weakest[0].label}，每天安排 20 分钟专项训练。`,
      `继续发挥 ${strongest.label} 优势，把它用在当前学习方向的关键任务里。`,
      '建议每两周复盘一次学习进度，动态调整资源和节奏。',
    ],
  }
}
