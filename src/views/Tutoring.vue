<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { askTutoringQuestion } from '@/lib/api'
import {
  ArrowRight,
  BookOpen,
  Bot,
  ChevronRight,
  Code,
  GitCompare,
  History,
  Layers,
  Lightbulb,
  MessageCircle,
  Paperclip,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from 'lucide-vue-next'
import type { Course, StudyScenario, TutorSubMode } from '@/types/course'
import type { MultimodalContent } from '@/types/api'
import {
  allCourses,
  dlFlowStages,
  mlFlowStages,
  nlpFlowStages,
  presetQuestionsByScenario,
  scenarioAnswerTemplates,
  scenarioConfigs,
  sharedCodeExamples,
} from '@/components/course/CourseData'
import CodeCanvas from '@/components/canvas/CodeCanvas.vue'
import FlowChart from '@/components/canvas/FlowChart.vue'
import MindMap from '@/components/mindmap/MindMap.vue'
import DesktopPet from '@/components/tutor/DesktopPet.vue'
import EmotionMascot from '@/components/tutor/EmotionMascot.vue'
import ScenarioSelector from '@/components/tutor/ScenarioSelector.vue'
import { useCourseStore } from '@/store/course'
import { useEmotionStore } from '@/store/emotion'

const route = useRoute()
const emotion = useEmotionStore()
const courseStore = useCourseStore()

const question = ref('')
const currentScenario = ref<StudyScenario>('preview')
const currentSubMode = ref<TutorSubMode>('concept-overview')
const history = ref<Array<{ q: string; a: string; time: string; helpful?: boolean; scenario: StudyScenario; submode: TutorSubMode; multimodalContents?: MultimodalContent[] }>>([])
const showHistory = ref(false)
const showCoursePanel = ref(false)
const selectedCourseId = ref(courseStore.currentCourseId)
const activeModalPanel = ref<'code' | 'flow' | 'mindmap' | null>(null)
const isAsking = ref(false)
const petCompletedAt = ref(0)
const petLastResult = ref<'success' | 'error' | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const pendingImages = ref<Array<{ id: string; dataUrl: string; type: string }>>([])

const selectedCourse = computed(() => allCourses.find(c => c.id === selectedCourseId.value))

const scenarioQuestions = computed(() => {
  const scenarioItems = presetQuestionsByScenario[currentScenario.value] ?? []
  const course = selectedCourse.value
  const courseItems: { q: string; category: string; submodes?: string[] }[] = []

  if (course) {
    for (const topic of course.topics) {
      if (!topic.presetQuestions) continue
      for (const preset of topic.presetQuestions) {
        courseItems.push({ q: preset.q, category: topic.name, submodes: [currentSubMode.value] })
      }
    }
  }

  return [...scenarioItems, ...courseItems]
    .filter(item => !item.submodes || item.submodes.length === 0 || item.submodes.includes(currentSubMode.value))
    .slice(0, 8)
})

const activeScenarioConfig = computed(() => scenarioConfigs.find(s => s.key === currentScenario.value))
const activeSubModeConfig = computed(() => activeScenarioConfig.value?.subModes.find(s => s.key === currentSubMode.value))

const sessionHistory = [
  { title: '机器学习预习', count: 6, date: '今天', scenario: 'preview' as StudyScenario },
  { title: 'KNN 算法调试', count: 12, date: '昨天', scenario: 'homework' as StudyScenario },
  { title: '期末考试冲刺', count: 9, date: '3 天前', scenario: 'exam' as StudyScenario },
]

const scenarioColors: Record<string, string> = {
  preview: '#00d4ff',
  inclass: '#7c3aed',
  homework: '#06d6a0',
  exam: '#f59e0b',
}

function generateAnswer(q: string): string {
  const template = scenarioAnswerTemplates[currentScenario.value]
  if (template) return template(q, currentSubMode.value)

  return `## 关于「${q || '这个问题'}」的讲解\n\n这是一个很好的问题。在当前「${activeSubModeConfig.value?.label ?? '问答'}」模式下，我会从概念、原理和应用三个层次帮你拆开。\n\n**关键要点：**\n1. 先确认核心概念\n2. 再解释背后的原理\n3. 最后给出实际应用或练习建议\n\n> 如果某一步不清楚，可以继续追问，我会换一种方式讲。`
}

function formatAnswer(text: string) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/### (.*?)(\n|$)/g, '<h3 class="h3">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 class="h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\|(.+?)\|(.+?)\|/g, match => `<span class="inline-table">${match}</span>`)
    .replace(/\n/g, '<br/>')
}

async function askQuestion() {
  const q = question.value.trim()
  if ((!q && pendingImages.value.length === 0) || isAsking.value) return

  const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })

  const multimodalContents: MultimodalContent[] = []
  pendingImages.value.forEach(img => {
    multimodalContents.push({ type: 'image', imageData: img.dataUrl, imageType: img.type })
  })
  if (q) {
    multimodalContents.push({ type: 'text', text: q })
  }

  let answer = generateAnswer(q)
  let petResult: 'success' | 'error' = 'success'
  isAsking.value = true

  try {
    const response = await askTutoringQuestion(q, currentSubMode.value, currentScenario.value, multimodalContents)
    answer = response.answer
  } catch {
    petResult = 'error'
  } finally {
    isAsking.value = false
  }

  history.value.push({
    q,
    a: answer,
    time: now,
    scenario: currentScenario.value,
    submode: currentSubMode.value,
    multimodalContents,
  })

  emotion.recordQuestion(q.slice(0, 20))
  courseStore.recordAnswer(true)
  petLastResult.value = petResult
  petCompletedAt.value = Date.now()
  question.value = ''
  pendingImages.value = []
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  Array.from(target.files).forEach(file => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      pendingImages.value.push({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        dataUrl,
        type: file.type,
      })
    }
    reader.readAsDataURL(file)
  })

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

function removePendingImage(id: string) {
  pendingImages.value = pendingImages.value.filter(img => img.id !== id)
}

function setHelpful(index: number, helpful: boolean) {
  if (history.value[index]) history.value[index].helpful = helpful
}

function askScenarioQuestion(q: string) {
  question.value = q
  askQuestion()
}

function onScenarioChange(scenario: StudyScenario) {
  currentScenario.value = scenario
  courseStore.setScenario(scenario)
}

function onSubModeChange(submode: TutorSubMode) {
  currentSubMode.value = submode
}

function selectSession(session: typeof sessionHistory[number]) {
  currentScenario.value = session.scenario
  showHistory.value = false
}

function selectCourse(course: Course) {
  selectedCourseId.value = course.id
  courseStore.setCourse(course.id)
  showCoursePanel.value = false
}

const currentFlowStages = computed(() => {
  const course = selectedCourse.value
  if (!course) return mlFlowStages
  if (course.subfield === 'dl') return dlFlowStages
  if (course.subfield === 'nlp') return nlpFlowStages
  return mlFlowStages
})

const currentCodeExamples = computed(() => {
  const course = selectedCourse.value
  if (!course) return sharedCodeExamples['model-training']

  const examples: typeof sharedCodeExamples['model-training'] = []
  for (const topic of course.topics) {
    if (topic.codeExamples) examples.push(...topic.codeExamples)
  }
  return examples.length > 0 ? examples : sharedCodeExamples['model-training']
})

const currentMindMap = computed(() => {
  const course = selectedCourse.value
  if (!course) return undefined
  return course.topics[0]?.mindMap
})

function toggleModalPanel(panel: 'code' | 'flow' | 'mindmap') {
  activeModalPanel.value = activeModalPanel.value === panel ? null : panel
}

onMounted(() => {
  const scenario = route.query.scenario
  const q = route.query.q

  if (typeof scenario === 'string' && scenarioConfigs.some(item => item.key === scenario)) {
    currentScenario.value = scenario as StudyScenario
  }

  if (typeof q === 'string' && q.trim()) {
    question.value = q
  }
})
</script>

<template>
  <div class="tutor">
    <div class="tutor-hero">
      <div>
        <div class="hero-badge">智能辅导</div>
        <h1 class="hero-title">
          <span class="gradient-text">{{ activeSubModeConfig?.label ?? '即时答疑' }}</span>
        </h1>
        <p class="hero-desc">{{ activeScenarioConfig?.description ?? '多模式深度讲解，随时解决你的学习问题。' }}</p>
      </div>
      <div class="hero-actions">
        <button class="hero-btn course-btn" @click="showCoursePanel = !showCoursePanel">
          <BookOpen :size="15" stroke-width="1.5" />
          <span>{{ selectedCourse?.name ?? '选择课程' }}</span>
          <ChevronRight :size="13" stroke-width="1.5" :class="{ rotated: showCoursePanel }" />
        </button>
        <button class="hero-btn" @click="showHistory = !showHistory">
          <History :size="15" stroke-width="1.5" />
          <span>历史</span>
        </button>
      </div>
    </div>

    <transition name="slide-up">
      <div v-if="showCoursePanel" class="course-panel">
        <button
          v-for="c in allCourses"
          :key="c.id"
          :class="['course-chip', { active: selectedCourseId === c.id }]"
          :style="{ '--c-clr': c.color }"
          @click="selectCourse(c)"
        >
          <span class="cc-name">{{ c.name }}</span>
          <span class="cc-diff">{{ c.difficulty === 'beginner' ? '入门' : c.difficulty === 'intermediate' ? '进阶' : '高级' }}</span>
        </button>
      </div>
    </transition>

    <transition name="slide-up">
      <div v-if="showHistory" class="history-panel">
        <button v-for="s in sessionHistory" :key="s.title" class="history-item" @click="selectSession(s)">
          <div class="history-icon">
            <Lightbulb :size="14" stroke-width="1.5" />
          </div>
          <div class="history-info">
            <span class="history-title">{{ s.title }}</span>
            <span class="history-meta">{{ s.count }} 条对话 · {{ s.date }}</span>
          </div>
          <ChevronRight :size="16" stroke-width="1.5" class="history-chevron" />
        </button>
      </div>
    </transition>

    <ScenarioSelector
      :current-scenario="currentScenario"
      :current-sub-mode="currentSubMode"
      @update:scenario="onScenarioChange"
      @update:sub-mode="onSubModeChange"
    />

    <div class="tutor-body">
      <div class="tutor-main">
        <div v-if="history.length > 0" class="conversation">
          <div v-for="(item, i) in history" :key="`${item.time}-${i}`" class="qa-pair">
            <div class="question-bubble">
              <div class="bubble-avatar q-avatar">Q</div>
              <div class="bubble-content">
                <div v-if="item.multimodalContents && item.multimodalContents.length" class="bubble-images">
                  <template v-for="(content, idx) in item.multimodalContents" :key="idx">
                    <img v-if="content.type === 'image'" :src="content.imageData" class="bubble-image" />
                  </template>
                </div>
                <p v-if="item.q">{{ item.q }}</p>
                <span class="bubble-meta">
                  <span class="bubble-tag" :style="{ '--t-clr': scenarioColors[item.scenario] || '#00d4ff' }">
                    {{ scenarioConfigs.find(s => s.key === item.scenario)?.label }}
                  </span>
                  <span class="bubble-time">{{ item.time }}</span>
                </span>
              </div>
            </div>

            <div class="answer-bubble">
              <div class="bubble-avatar a-avatar">A</div>
              <div class="bubble-content">
                <div class="answer-body" v-html="formatAnswer(item.a)" />
                <div class="answer-footer">
                  <button :class="['feedback-btn', { active: item.helpful === true }]" @click="setHelpful(i, true)">
                    <ThumbsUp :size="14" stroke-width="1.5" />
                  </button>
                  <button :class="['feedback-btn', { active: item.helpful === false }]" @click="setHelpful(i, false)">
                    <ThumbsDown :size="14" stroke-width="1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isAsking" class="qa-pair pending-pair">
            <div class="answer-bubble pending-bubble">
              <div class="bubble-avatar a-avatar">A</div>
              <div class="bubble-content">
                <div class="answer-body pending-answer">正在思考中...</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-mode-icon">
            <MessageCircle :size="36" stroke-width="1" />
          </div>
          <h3 class="empty-title">{{ activeSubModeConfig?.label ?? '即时答疑' }}</h3>
          <p class="empty-desc">{{ activeSubModeConfig?.desc ?? '选择一个问题开始，我会一步步帮你讲清楚。' }}</p>

          <div class="topic-grid">
            <div v-for="(qItem, idx) in scenarioQuestions" :key="idx" class="topic-group">
              <div class="topic-header">
                <Lightbulb :size="13" stroke-width="1.5" />
                <span>{{ qItem.category }}</span>
              </div>
              <button class="topic-btn" @click="askScenarioQuestion(qItem.q)">
                <span>{{ qItem.q }}</span>
                <ArrowRight :size="13" stroke-width="1.5" class="topic-btn-arrow" />
              </button>
            </div>
          </div>

          <div v-if="isAsking" class="qa-pair pending-pair">
            <div class="answer-bubble pending-bubble">
              <div class="bubble-avatar a-avatar">A</div>
              <div class="bubble-content">
                <div class="answer-body pending-answer">正在思考中...</div>
              </div>
            </div>
          </div>
        </div>

        <div class="input-section">
          <div class="mode-indicator">
            {{ activeScenarioConfig?.label ?? '辅导' }} · {{ activeSubModeConfig?.label ?? '问答' }}
          </div>
          <div v-if="pendingImages.length > 0" class="pending-images">
            <div v-for="img in pendingImages" :key="img.id" class="pending-image-item">
              <img :src="img.dataUrl" class="pending-image-preview" />
              <button class="remove-image-btn" @click="removePendingImage(img.id)">
                <X :size="14" stroke-width="2" />
              </button>
            </div>
          </div>
          <div class="input-row">
            <input
              ref="fileInputRef"
              type="file"
              class="hidden-file-input"
              accept="image/*"
              multiple
              @change="handleFileSelect"
            />
            <button class="attach-btn" @click="fileInputRef?.click()" aria-label="上传图片">
              <Paperclip :size="16" stroke-width="1.5" />
            </button>
            <input
              v-model="question"
              type="text"
              placeholder="输入问题或上传图片..."
              @keydown.enter="askQuestion"
              :disabled="isAsking"
            />
            <button class="ask-btn" @click="askQuestion" :disabled="(!question.trim() && pendingImages.length === 0) || isAsking">
              <Zap :size="16" stroke-width="2" />
              <span>{{ isAsking ? '思考中' : '提问' }}</span>
            </button>
          </div>
          <div class="mm-toolbar">
            <button
              :class="['mm-btn', { active: activeModalPanel === 'flow' }]"
              :style="{ '--mm-clr': '#00d4ff' }"
              @click="toggleModalPanel('flow')"
            >
              <GitCompare :size="13" stroke-width="1.5" />
              <span>流程图</span>
            </button>
            <button
              :class="['mm-btn', { active: activeModalPanel === 'code' }]"
              :style="{ '--mm-clr': '#7c3aed' }"
              @click="toggleModalPanel('code')"
            >
              <Code :size="13" stroke-width="1.5" />
              <span>代码画板</span>
            </button>
            <button
              :class="['mm-btn', { active: activeModalPanel === 'mindmap' }]"
              :style="{ '--mm-clr': '#06d6a0' }"
              @click="toggleModalPanel('mindmap')"
            >
              <Layers :size="13" stroke-width="1.5" />
              <span>思维导图</span>
            </button>
          </div>
        </div>
      </div>

      <transition name="slide-up">
        <div v-if="activeModalPanel" class="modal-panel-wrap">
          <div class="modal-panel">
            <div class="mp-header">
              <span class="mp-title">
                {{ activeModalPanel === 'flow' ? '数据处理流程图' : activeModalPanel === 'code' ? '交互式代码画板' : '知识思维导图' }}
              </span>
              <button class="mp-close" @click="activeModalPanel = null">×</button>
            </div>
            <div class="mp-body">
              <FlowChart
                v-if="activeModalPanel === 'flow'"
                :stages="currentFlowStages"
                :title="selectedCourse?.name ? `${selectedCourse.name} 流程` : '数据处理流程'"
              />
              <CodeCanvas
                v-if="activeModalPanel === 'code'"
                :examples="currentCodeExamples"
                language="python"
                @explain="code => { question = '请解释这段代码：' + code.slice(0, 100); activeModalPanel = null }"
              />
              <MindMap
                v-if="activeModalPanel === 'mindmap'"
                :nodes="currentMindMap ?? []"
                :title="selectedCourse?.name ?? '知识体系'"
                :color="selectedCourse?.color ?? '#00d4ff'"
                @node-click="node => { question = '讲解一下' + node.label; activeModalPanel = null }"
              />
            </div>
          </div>
        </div>
      </transition>

      <div class="tutor-sidebar">
        <button class="dh-toggle" :class="{ active: true }" title="向日葵学伴">
          <Bot :size="18" stroke-width="1.5" />
        </button>

        <div class="dh-panel">
          <div class="dh-header">
            <Bot :size="18" stroke-width="1.5" />
            <span>向日葵学伴</span>
          </div>

          <div class="dh-slot">
            <DesktopPet
              :is-asking="isAsking"
              :draft-question="question"
              :last-completed-at="petCompletedAt"
              :last-result="petLastResult"
              :current-mood="emotion.currentMood"
            />
          </div>

          <div class="dh-footer">
            <div class="dhf-label">当前讲解</div>
            <p class="dhf-text">
              {{ history.length > 0 ? `${history[history.length - 1].q.slice(0, 50)}...` : '等待提问中...' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <EmotionMascot />
  </div>
</template>

<style scoped>
.tutor {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height) - 64px);
  position: relative;
  z-index: 1;
}

.tutor-hero {
  padding: 48px 40px 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-bottom: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.hero-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
  white-space: nowrap;
  background: var(--color-bg-card);
}

.hero-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.course-btn .rotated { transform: rotate(90deg); }

.course-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 40px;
  margin-bottom: 4px;
}

.course-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  font-size: 11px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}

.course-chip:hover {
  border-color: var(--c-clr);
  color: var(--color-text-primary);
}

.course-chip.active {
  background: color-mix(in srgb, var(--c-clr) 8%, transparent);
  border-color: var(--c-clr);
  color: var(--c-clr);
}

.cc-name { font-weight: 500; }
.cc-diff {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
}

.history-panel {
  display: flex;
  gap: 8px;
  padding: 8px 40px;
  margin-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.history-panel::-webkit-scrollbar { display: none; }

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  text-align: left;
  white-space: nowrap;
  color: var(--color-text-primary);
  font-size: 12px;
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
  background: var(--color-bg-card);
  cursor: pointer;
}

.history-item:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
}

.history-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.history-info { display: flex; flex-direction: column; gap: 1px; }
.history-title { display: block; font-weight: 500; }
.history-meta { display: block; font-size: 11px; color: var(--color-text-tertiary); }
.history-chevron { color: var(--color-text-tertiary); }

.tutor-body {
  flex: 1;
  display: flex;
  gap: 0;
  overflow: hidden;
  position: relative;
}

.tutor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.conversation {
  flex: 1;
  overflow-y: auto;
  padding: 0 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes message-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.qa-pair {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-bubble,
.answer-bubble {
  display: flex;
  gap: 12px;
}

.question-bubble { justify-content: flex-end; }
.answer-bubble { justify-content: flex-start; }
.pending-bubble { animation: message-in 0.3s var(--ease-out); }

.bubble-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.q-avatar {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  order: 1;
}

.a-avatar {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.bubble-content { max-width: 80%; }
.question-bubble .bubble-content { order: 0; }

.question-bubble .bubble-content p {
  display: inline-block;
  padding: 12px 18px;
  border-radius: 14px 14px 4px 14px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.08));
  border: 1px solid rgba(0, 212, 255, 0.1);
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.6;
}

.bubble-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.bubble-tag {
  font-size: 10px;
  padding: 1px 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--t-clr) 10%, transparent);
  color: var(--t-clr);
}

.bubble-time {
  font-size: 10px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.question-bubble .bubble-meta { justify-content: flex-end; }
.answer-bubble .bubble-content { width: 100%; }

.answer-body {
  padding: 16px 20px;
  border-radius: 14px 14px 14px 4px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.75;
  color: var(--color-text-primary);
}

.answer-body :deep(.h2) {
  font-family: var(--font-display);
  font-size: 16px;
  color: #fff;
  margin: 14px 0 6px;
}

.answer-body :deep(.h3) {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--color-accent-cyan);
  margin: 10px 0 4px;
}

.answer-body :deep(strong) { color: #fff; font-weight: 600; }

.answer-body :deep(blockquote) {
  border-left: 2px solid var(--color-accent-cyan);
  padding: 6px 14px;
  margin: 6px 0;
  background: rgba(0, 212, 255, 0.04);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.answer-body :deep(.code-block) {
  display: block;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  margin: 6px 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-accent-cyan);
}

.pending-answer {
  color: var(--color-text-secondary);
}

.answer-footer {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  padding-left: 4px;
}

.feedback-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-tertiary);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}

.feedback-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
}

.feedback-btn.active {
  background: rgba(0, 212, 255, 0.08);
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 40px;
  overflow-y: auto;
}

.empty-mode-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 20px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
}

.empty-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #fff;
  margin-bottom: 4px;
}

.empty-desc {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin-bottom: 28px;
}

.topic-grid {
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.topic-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topic-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-cyan);
}

.topic-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: left;
  transition: all 0.2s var(--ease-out);
  width: 100%;
  cursor: pointer;
}

.topic-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-text-primary);
  background: rgba(0, 212, 255, 0.04);
}

.topic-btn-arrow { opacity: 0; transition: all 0.2s var(--ease-out); flex-shrink: 0; }
.topic-btn:hover .topic-btn-arrow { opacity: 1; transform: translateX(3px); color: var(--color-accent-cyan); }

.input-section {
  padding: 16px 40px 24px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(20px);
}

.hidden-file-input {
  display: none;
}

.pending-images {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.pending-image-item {
  position: relative;
  width: 72px;
  height: 72px;
}

.pending-image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.remove-image-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.remove-image-btn:hover {
  transform: scale(1.1);
}

.attach-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: var(--color-text-tertiary);
  border-radius: 12px;
  transition: color 0.2s var(--ease-out);
  flex-shrink: 0;
}

.attach-btn:hover {
  color: var(--color-accent-cyan);
}

.bubble-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.bubble-image {
  max-width: 280px;
  max-height: 200px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  object-fit: contain;
}

.mode-indicator {
  font-size: 11px;
  color: var(--color-accent-cyan);
  margin-bottom: 8px;
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.06);
  font-weight: 500;
}

.input-row {
  display: flex;
  gap: 10px;
}

.input-row input {
  flex: 1;
  padding: 12px 18px;
  border-radius: 12px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text-primary);
  transition: all 0.2s var(--ease-out);
}

.input-row input:focus { border-color: var(--color-accent-cyan); }
.input-row input::placeholder { color: var(--color-text-tertiary); opacity: 0.6; }

.ask-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 22px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
  white-space: nowrap;
}

.ask-btn:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
  transform: translateY(-1px);
}

.ask-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.tutor-sidebar {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 16px 16px 16px 0;
  flex-shrink: 0;
}

.dh-toggle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
  z-index: 2;
}

.dh-toggle:hover,
.dh-toggle.active {
  border-color: var(--color-accent-amber);
  color: var(--color-accent-amber);
}

.dh-panel {
  width: 260px;
  margin-left: -1px;
  background: var(--color-bg-card);
  border: 1px solid rgba(251, 191, 36, 0.12);
  border-radius: 0 14px 14px 0;
  border-left: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
  box-shadow: 0 0 24px rgba(251, 191, 36, 0.04);
}

.dh-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(251, 191, 36, 0.1);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent-amber);
}

.dh-slot {
  flex: 1;
  display: flex;
  align-items: stretch;
  padding: 16px 12px;
  min-height: 200px;
  overflow: hidden;
}

.dh-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.dhp-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.06);
  border: 1px dashed rgba(0, 212, 255, 0.2);
  color: rgba(0, 212, 255, 0.3);
  animation: dh-pulse 3s ease-in-out infinite;
}

@keyframes dh-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.dhp-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-tertiary);
}

.dhp-hint {
  font-size: 10px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.dh-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(251, 191, 36, 0.1);
}

.dhf-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.dhf-text {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mm-toolbar {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.mm-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 11px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.mm-btn:hover {
  border-color: var(--mm-clr);
  color: var(--mm-clr);
  background: color-mix(in srgb, var(--mm-clr) 6%, transparent);
}

.mm-btn.active {
  background: color-mix(in srgb, var(--mm-clr) 10%, transparent);
  border-color: var(--mm-clr);
  color: var(--mm-clr);
}

.modal-panel-wrap {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 7, 13, 0.7);
  backdrop-filter: blur(4px);
  padding: 40px;
}

.modal-panel {
  width: 100%;
  max-width: 900px;
  max-height: 80vh;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}

.mp-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: #fff;
}

.mp-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-tertiary);
  transition: all 0.2s;
}

.mp-close:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text-primary);
}

.mp-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

@media (max-width: 1100px) {
  .dh-panel { width: 220px; }
}

@media (max-width: 900px) {
  .tutor-hero { padding: 32px 20px 8px; flex-direction: column; }
  .tutor-hero .hero-actions { width: 100%; }
  .tutor-main .conversation { padding: 0 20px 20px; }
  .tutor-main .empty-state { padding: 20px; }
  .tutor-main .input-section { padding: 16px 20px 20px; }
  .course-panel { padding: 8px 20px; }
  .history-panel { padding: 8px 20px; }
  .topic-grid { grid-template-columns: 1fr; }
  .tutor-sidebar { display: none; }
}
</style>
