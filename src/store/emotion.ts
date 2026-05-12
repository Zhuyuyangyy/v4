import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type EmotionMood = 'positive' | 'neutral' | 'frustrated' | 'anxious'

export const useEmotionStore = defineStore('emotion', () => {
  /* ── State ── */
  const totalQuestions = ref(0)
  const topicQuestionCount = ref<Map<string, number>>(new Map())
  const recentErrors = ref<string[]>([])
  const maxRecentErrors = 10
  const encouragementGiven = ref<Set<string>>(new Set())
  const lastEncouragementTime = ref(0)
  const encouragementCooldown = 60000 // 1 minute cooldown

  /* ── Getters ── */
  const currentMood = computed<EmotionMood>(() => {
    // 检查是否有频繁提问的知识点
    for (const [, count] of topicQuestionCount.value) {
      if (count >= 4) return 'frustrated'
    }

    // 检查近期错误率
    if (recentErrors.value.length >= 5) {
      const recentTotal = Math.min(totalQuestions.value, maxRecentErrors)
      const errorRate = recentErrors.value.length / recentTotal
      if (errorRate > 0.5) return 'anxious'
    }

    // 正常状态
    if (totalQuestions.value > 0 && recentErrors.value.length === 0) return 'positive'

    return 'neutral'
  })

  const shouldEncourage = computed(() => {
    if (currentMood.value === 'frustrated' || currentMood.value === 'anxious') {
      const now = Date.now()
      if (now - lastEncouragementTime.value > encouragementCooldown) {
        return true
      }
    }
    return false
  })

  const frustratedTopics = computed(() => {
    const topics: string[] = []
    for (const [topic, count] of topicQuestionCount.value) {
      if (count >= 3) topics.push(topic)
    }
    return topics
  })

  /* ── Actions ── */
  function recordQuestion(topic: string) {
    totalQuestions.value++
    const current = topicQuestionCount.value.get(topic) ?? 0
    topicQuestionCount.value.set(topic, current + 1)
  }

  function recordError(topic: string) {
    recentErrors.value.push(topic)
    if (recentErrors.value.length > maxRecentErrors) {
      recentErrors.value.shift()
    }
  }

  function markEncouraged() {
    lastEncouragementTime.value = Date.now()
  }

  function reset() {
    totalQuestions.value = 0
    topicQuestionCount.value = new Map()
    recentErrors.value = []
    encouragementGiven.value = new Set()
    lastEncouragementTime.value = 0
  }

  return {
    totalQuestions,
    topicQuestionCount,
    recentErrors,
    encouragementGiven,
    lastEncouragementTime,
    currentMood,
    shouldEncourage,
    frustratedTopics,
    recordQuestion,
    recordError,
    markEncouraged,
    reset,
  }
})

/* ── 鼓励话术库 ── */
export const encouragements = [
  '别着急，这个知识点确实有难度，我们换个角度再试试 💪',
  '遇到困难是学习的一部分，你已经比上次进步了！',
  '这个问题很多人都会卡住，你并不孤单，我们一步步来 🤝',
  '休息一下眼睛，回来再看这个问题可能会有新思路 ✨',
  '你已经问了很好的问题，这说明你在认真思考！',
  '学习就像训练模型，loss 不降的时候就调整一下学习率 😄',
  'Debug 是程序员的基本素养，找到 bug 就是胜利！',
  '这个概念确实抽象，但掌握之后你会豁然开朗的 🌟',
]
