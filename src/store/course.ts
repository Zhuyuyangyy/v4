import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Course, StudyScenario, TopicProgress, AISubfield } from '@/types/course'
import { allCourses, getCourseBySubfield } from '@/components/course/CourseData'

export const useCourseStore = defineStore('course', () => {
  /* ── State ── */
  const currentCourseId = ref<string>('ai-ml')
  const currentScenario = ref<StudyScenario>('preview')
  const topicProgress = ref<Map<string, TopicProgress>>(new Map())
  const completedTopics = ref<Set<string>>(new Set())
  const totalQuestions = ref(0)
  const correctAnswers = ref(0)

  /* ── Getters ── */
  const currentCourse = computed<Course | undefined>(() =>
    allCourses.find(c => c.id === currentCourseId.value)
  )

  const availableCourses = computed(() => allCourses)

  const currentProgress = computed(() => {
    if (!currentCourse.value) return 0
    const total = currentCourse.value.topics.length
    if (total === 0) return 0
    const done = currentCourse.value.topics.filter(t => completedTopics.value.has(t.id)).length
    return Math.round((done / total) * 100)
  })

  const accuracy = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((correctAnswers.value / totalQuestions.value) * 100)
  })

  /* ── Actions ── */
  function setCourse(id: string) {
    currentCourseId.value = id
  }

  function setCourseBySubfield(sf: AISubfield) {
    const course = getCourseBySubfield(sf)
    if (course) currentCourseId.value = course.id
  }

  function setScenario(s: StudyScenario) {
    currentScenario.value = s
  }

  function completeTopic(topicId: string) {
    completedTopics.value.add(topicId)
    topicProgress.value.set(topicId, {
      topicId,
      status: 'completed',
      progress: 100,
    })
  }

  function recordAnswer(correct: boolean) {
    totalQuestions.value++
    if (correct) correctAnswers.value++
  }

  function resetProgress() {
    topicProgress.value = new Map()
    completedTopics.value = new Set()
    totalQuestions.value = 0
    correctAnswers.value = 0
  }

  return {
    currentCourseId,
    currentScenario,
    topicProgress,
    completedTopics,
    totalQuestions,
    correctAnswers,
    currentCourse,
    availableCourses,
    currentProgress,
    accuracy,
    setCourse,
    setCourseBySubfield,
    setScenario,
    completeTopic,
    recordAnswer,
    resetProgress,
  }
})
