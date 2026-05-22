import { ref, computed } from 'vue'
import { analyzeProfile as apiAnalyzeProfile } from '@/lib/api'
import { generateResult } from './useProfileSurvey'
import type { SurveyAnswers, ProfileResult } from './useProfileSurvey'

/* ===================================================================
 * 对话式画像提取引擎
 * 学生自由对话 → AI 自然引导 → 后台提取画像
 * =================================================================== */

export type CollectPhase = 'greeting' | 'collecting' | 'chat' | 'generating' | 'complete'

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
  isTyping?: boolean
}

export interface DimensionState {
  key: keyof SurveyAnswers
  label: string
  collected: boolean
  confidence: 'high' | 'medium' | 'low'
  value: string
}

/** 话题：AI 用来引导学生的话题 */
const TOPICS: Array<{
  key: keyof SurveyAnswers
  label: string
  question: string
  keywords: RegExp[]
  extract: (text: string) => string | null
  secondaryKey?: keyof SurveyAnswers
  secondaryQuestion?: string
  secondaryExtract?: (text: string) => string | null
}> = [
  {
    key: 'role',
    label: '身份',
    question: '你是学生还是在职工作者？可以简单介绍一下自己吗？',
    keywords: [/学生/i, /在读/i, /工作/i, /在职/i, /工程师/i, /程序员/i, /自由职业/i, /教师/i],
    extract(text) {
      if (/学生|在读|上学|大学生|研究生/i.test(text)) return 'student'
      if (/工作|在职|上班|工程师|程序员|开发/i.test(text)) return 'professional'
      if (/自由职业/i.test(text)) return 'freelancer'
      if (/教师|老师|科研|研究员/i.test(text)) return 'other'
      return null
    },
    secondaryKey: 'field',
    secondaryQuestion: '那你是哪个方向的呢？计算机、数据科学，还是 AI 相关？',
    secondaryExtract(text) {
      if (/人工智能|AI|机器学习|深度学习/i.test(text)) return 'ai'
      if (/数据科学|数据分析|数据挖掘/i.test(text)) return 'data-science'
      if (/软件工程|软件开发|全栈|后端|前端/i.test(text)) return 'software-eng'
      if (/计算机|编程|算法|网络|安全/i.test(text)) return 'cs'
      return null
    },
  },
  {
    key: 'level',
    label: '水平',
    question: '你觉得自己现在处于什么水平？初级、中级还是高级？',
    keywords: [/初级/i, /中级/i, /高级/i, /入门/i, /基础/i, /资深/i, /专家/i],
    extract(text) {
      if (/初级|入门|基础|新手|刚学|刚开始/i.test(text)) return 'beginner'
      if (/中级|中等|进阶|有一定|1年|两年/i.test(text)) return 'intermediate'
      if (/高级|资深|深入|3年|4年|五年/i.test(text)) return 'advanced'
      if (/专家|精通/i.test(text)) return 'expert'
      return null
    },
    secondaryKey: 'experience',
    secondaryQuestion: '在这个领域有多长时间了？',
    secondaryExtract(text) {
      const m = text.match(/(\d+)\s*年/)
      if (m) { const y = parseInt(m[1]); if (y < 1) return 'less-than-1'; if (y <= 3) return '1-3'; if (y <= 5) return '3-5'; return 'more-than-5' }
      return null
    },
  },
  {
    key: 'shortTermGoal',
    label: '短期目标',
    question: '最近有什么想实现的目标吗？比如掌握技能、完成项目或者准备考试？',
    keywords: [/目标/i, /想学/i, /计划/i, /考试/i, /项目/i, /技能/i],
    extract(text) {
      if (/考试|认证|证书/i.test(text)) return 'exam'
      if (/项目|完成|开发|做个/i.test(text)) return 'project'
      if (/技能|掌握|学会|入门/i.test(text)) return 'skill'
      return null
    },
  },
  {
    key: 'motivation',
    label: '动机',
    question: '是什么让你想学这个方向的？兴趣、工作需要还是自我提升？',
    keywords: [/兴趣/i, /工作/i, /提升/i, /成长/i, /需要/i],
    extract(text) {
      if (/兴趣|爱好|喜欢|好玩/i.test(text)) return 'interest'
      if (/工作|升职|加薪|项目需要|业务/i.test(text)) return 'work'
      if (/成长|提升|自我|进步|转行/i.test(text)) return 'growth'
      if (/学业|考试|毕业|学分/i.test(text)) return 'academic'
      return null
    },
  },
  {
    key: 'bestTime',
    label: '学习时段',
    question: '你一般什么时间段学习效率最高？',
    keywords: [/早上/i, /下午/i, /晚上/i, /深夜/i, /学习/i, /时间/i],
    extract(text) {
      if (/清晨|早上|上午|早起|早晨/i.test(text)) return 'morning'
      if (/下午|午后/i.test(text)) return 'afternoon'
      if (/晚上|晚间|晚饭/i.test(text)) return 'evening'
      if (/深夜|半夜|凌晨|睡前|熬夜/i.test(text)) return 'night'
      return null
    },
    secondaryKey: 'weeklyHours',
    secondaryQuestion: '每周大概能花多少时间学习？',
    secondaryExtract(text) {
      const m = text.match(/(\d+)\s*小时/)
      if (m) { const h = parseInt(m[1]); if (h < 5) return 'less-than-5'; if (h <= 10) return '5-10'; if (h <= 20) return '10-20'; return 'more-than-20' }
      return null
    },
  },
  {
    key: 'resourcePreference',
    label: '学习方式',
    question: '你偏好什么样的学习方式？视频、看书、还是动手练习？',
    keywords: [/视频/i, /看书/i, /练习/i, /项目/i, /实战/i],
    extract(text) {
      if (/视频|课程|网课|教学视频/i.test(text)) return 'video'
      if (/书|文档|阅读|文章|教材|博客/i.test(text)) return 'reading'
      if (/练习|做题|习题|刷题/i.test(text)) return 'practice'
      if (/项目|实战|动手|工程/i.test(text)) return 'project'
      return null
    },
  },
]

const DIMENSION_LABELS: Record<string, string> = {
  role: '身份', field: '领域', level: '水平', experience: '经验',
  shortTermGoal: '短期目标', motivation: '动机',
  bestTime: '学习时段', weeklyHours: '每周时长', resourcePreference: '学习方式',
}

const RESPONSES: Record<string, (label: string) => string> = {
  role: (v) => `${v}，了解！这样我可以更有针对性地给你建议。`,
  field: (v) => `${v}方向，很不错！这个领域发展很快。`,
  level: (v) => `${v}，好的，我会根据你的基础来调整。`,
  experience: (v) => `${v}的经验，很好！`,
  shortTermGoal: (v) => `短期目标是${v}，明白了！`,
  motivation: (v) => `${v}，这个动力很好！`,
  bestTime: (v) => `${v}效率最高，记住了。`,
  weeklyHours: (v) => `每周${v}，了解了。`,
  resourcePreference: (v) => `喜欢${v}，好的！`,
}

const VALUE_LABELS: Record<string, Record<string, string>> = {
  role: { student: '学生', professional: '职场人士', freelancer: '自由职业', other: '' },
  field: { cs: '计算机科学', ai: '人工智能', 'data-science': '数据科学', 'software-eng': '软件工程' },
  level: { beginner: '初级', intermediate: '中级', advanced: '高级', expert: '专家' },
  experience: { 'less-than-1': '不到1年', '1-3': '1-3年', '3-5': '3-5年', 'more-than-5': '5年以上' },
  shortTermGoal: { skill: '掌握技能', project: '完成项目', exam: '备考' },
  motivation: { interest: '兴趣', work: '工作', growth: '成长', academic: '学业' },
  bestTime: { morning: '清晨', afternoon: '下午', evening: '晚上', night: '深夜' },
  weeklyHours: { 'less-than-5': '不到5小时', '5-10': '5-10小时', '10-20': '10-20小时', 'more-than-20': '20小时以上' },
  resourcePreference: { video: '视频课程', reading: '阅读文档', practice: '动手练习', project: '项目实战' },
}

const CHAT_RESPONSES = [
  '嗯，有意思，能详细说说吗？',
  '明白了，还有别的想分享的吗？',
  '好的，我记下了。',
  '不错，继续说说你的想法？',
  '理解了，接下来我们再看看其他方面。',
]

export function useDialogueProfile() {
  /* ── State ── */
  const phase = ref<CollectPhase>('greeting')
  const messages = ref<ChatMessage[]>([])
  const collectedAnswers = ref<Partial<SurveyAnswers>>({})
  const topicQueue = ref<typeof TOPICS>([...TOPICS])
  const currentTopicIndex = ref(-1)
  const result = ref<ProfileResult | null>(null)
  const analysisProgress = ref(0)
  const analysisMessage = ref('')
  let msgCounter = 0

  /* ── Getters ── */
  const dimensions = computed<DimensionState[]>(() =>
    TOPICS.map(t => {
      const key = t.key
      const val = collectedAnswers.value[key]
      return {
        key,
        label: DIMENSION_LABELS[key] ?? key,
        collected: val !== undefined && val !== '',
        confidence: val ? 'high' as const : 'low' as const,
        value: typeof val === 'string' ? (VALUE_LABELS[key]?.[val] ?? val) : String(val ?? ''),
      }
    })
  )

  const collectedCount = computed(() => dimensions.value.filter(d => d.collected).length)
  const totalCount = computed(() => TOPICS.length)
  const progressPercent = computed(() => Math.round((collectedCount.value / totalCount.value) * 100))
  const canGenerate = computed(() => collectedCount.value >= 4)

  /* ── Topics that still need collection ── */
  const pendingTopics = computed(() =>
    TOPICS.filter(t => {
      const val = collectedAnswers.value[t.key]
      return !val || val === ''
    })
  )

  /* ── Actions ── */
  function addMessage(role: 'user' | 'assistant', content: string): ChatMessage {
    const msg: ChatMessage = {
      id: Date.now() + msgCounter++,
      role,
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(msg)
    return msg
  }

  function getGreeting(): string {
    return '你好！我是你的 AI 学习导师 🎓\n\n我可以帮你生成专属的学习画像，让你更清楚地了解自己的能力分布和学习特点。\n\n先聊聊你的情况吧——你是学生还是在职工作者？'
  }

  /** Process user message: extract info, determine response */
  function processMessage(text: string): { assistantContent: string; extracted: string[] } {
    const extracted: string[] = []

    if (phase.value === 'greeting') {
      phase.value = 'collecting'
    }

    // Try to extract from pending topics
    for (const topic of pendingTopics.value) {
      const value = topic.extract(text)
      if (value !== null) {
        ;(collectedAnswers.value as any)[topic.key] = value
        const label = VALUE_LABELS[topic.key]?.[value] ?? value
        extracted.push(topic.label)

        // Also try secondary extraction
        if (topic.secondaryKey && topic.secondaryExtract) {
          const secValue = topic.secondaryExtract(text)
          if (secValue !== null) {
            ;(collectedAnswers.value as any)[topic.secondaryKey] = secValue
          }
        }

        break // extract one topic per message
      }
    }

    // Build response
    let response = ''

    if (extracted.length > 0) {
      const key = pendingTopics.value.find(t => extracted.includes(t.label))?.key
      if (key) {
        const val = collectedAnswers.value[key]
        const label = typeof val === 'string' ? (VALUE_LABELS[key]?.[val] ?? val) : ''
        if (label) {
          response = RESPONSES[key]?.(label) ?? ''
        }
      }

      // Check if secondary question needed
      const topic = TOPICS.find(t => extracted.includes(t.label))
      if (topic?.secondaryKey && !collectedAnswers.value[topic.secondaryKey]) {
        response += '\n\n' + topic.secondaryQuestion
      } else {
        // Ask next question
        const next = getNextQuestion()
        if (next) {
          response += '\n\n' + next
        } else {
          // All collected
          phase.value = 'chat'
          response += '\n\n太好了，我对你已经有了基本了解！你可以让我生成学习画像报告，或者继续自由聊天。'
        }
      }
    } else if (phase.value === 'collecting') {
      // Didn't extract anything, try to keep conversation going
      const current = pendingTopics.value[0]
      if (current) {
        response = '没关系，换个方式问——' + current.question
      } else {
        response = CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)]
      }
    } else {
      response = CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)]
    }

    return { assistantContent: response, extracted }
  }

  function getNextQuestion(): string | null {
    const next = pendingTopics.value[0]
    if (!next) return null
    // Check if secondary still needed
    if (next.secondaryKey && !collectedAnswers.value[next.secondaryKey]) {
      return next.secondaryQuestion ?? next.question
    }
    return next.question
  }

  async function generateProfileResult() {
    phase.value = 'generating'
    analysisProgress.value = 0

    const msgs = ['整理对话信息...', '分析能力维度...', '评估知识体系...', '检测薄弱环节...', '生成个性化画像...']
    for (let i = 0; i < msgs.length; i++) {
      analysisMessage.value = msgs[i]
      analysisProgress.value = ((i + 1) / msgs.length) * 100
      await delay(350 + Math.random() * 300)
    }

    try {
      result.value = await apiAnalyzeProfile(collectedAnswers.value as SurveyAnswers)
    } catch {
      result.value = generateResult(collectedAnswers.value as SurveyAnswers)
    }

    phase.value = 'complete'
  }

  function reset() {
    phase.value = 'greeting'
    messages.value = []
    collectedAnswers.value = {}
    topicQueue.value = [...TOPICS]
    currentTopicIndex.value = -1
    result.value = null
    analysisProgress.value = 0
    analysisMessage.value = ''
  }

  return {
    phase,
    messages,
    collectedAnswers,
    result,
    analysisProgress,
    analysisMessage,
    dimensions,
    collectedCount,
    totalCount,
    progressPercent,
    canGenerate,
    getGreeting,
    addMessage,
    processMessage,
    generateProfileResult,
    reset,
  }
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }
