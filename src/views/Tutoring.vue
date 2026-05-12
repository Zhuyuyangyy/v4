<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MessageCircle,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  History,
  Zap,
  Bot,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Code,
  GitCompare,
  Layers,
} from 'lucide-vue-next'
import type { StudyScenario, TutorSubMode, Course } from '@/types/course'
import {
  allCourses,
  presetQuestionsByScenario,
  scenarioAnswerTemplates,
  scenarioConfigs,
  mlFlowStages,
  dlFlowStages,
  nlpFlowStages,
  sharedCodeExamples,
} from '@/components/course/CourseData'
import { useEmotionStore } from '@/store/emotion'
import { useCourseStore } from '@/store/course'
import ScenarioSelector from '@/components/tutor/ScenarioSelector.vue'
import EmotionMascot from '@/components/tutor/EmotionMascot.vue'
import CodeCanvas from '@/components/canvas/CodeCanvas.vue'
import FlowChart from '@/components/canvas/FlowChart.vue'
import MindMap from '@/components/mindmap/MindMap.vue'

/* ── Stores ── */
const emotion = useEmotionStore()
const courseStore = useCourseStore()

/* ── State ── */
const question = ref('')
const currentScenario = ref<StudyScenario>('preview')
const currentSubMode = ref<TutorSubMode>('concept-overview')
const history = ref<{ q: string; a: string; time: string; helpful?: boolean; scenario: StudyScenario; submode: TutorSubMode }[]>([])
const showHistory = ref(false)
const showCoursePanel = ref(false)
const selectedCourseId = ref(courseStore.currentCourseId)

// ── 多模态面板 ──
const activeModalPanel = ref<'code' | 'flow' | 'mindmap' | null>(null)

/* ── Computed ── */
const selectedCourse = computed(() =>
  allCourses.find(c => c.id === selectedCourseId.value)
)

const scenarioQuestions = computed(() => {
  const qs = presetQuestionsByScenario[currentScenario.value] ?? []
  const course = selectedCourse.value
  // Also collect course-specific preset questions
  const courseQs: { q: string; category: string; submodes?: string[] }[] = []
  if (course) {
    for (const topic of course.topics) {
      if (topic.presetQuestions) {
        for (const pq of topic.presetQuestions) {
          courseQs.push({ q: pq.q, category: topic.name, submodes: [currentSubMode.value] })
        }
      }
    }
  }
  // Filter by sub-mode
  const filtered = [...qs, ...courseQs].filter(item =>
    !item.submodes || item.submodes.length === 0 || item.submodes.includes(currentSubMode.value)
  )
  return filtered.slice(0, 8) // Max 8 questions
})

const activeScenarioConfig = computed(() =>
  scenarioConfigs.find(s => s.key === currentScenario.value)
)

const activeSubModeConfig = computed(() => {
  const sc = scenarioConfigs.find(s => s.key === currentScenario.value)
  return sc?.subModes.find(sm => sm.key === currentSubMode.value)
})

const sessionHistory = [
  { title: '机器学习预习', count: 6, date: '今天', scenario: 'preview' as StudyScenario },
  { title: 'KNN 算法调试', count: 12, date: '昨天', scenario: 'homework' as StudyScenario },
  { title: '期末考试冲刺', count: 9, date: '3天前', scenario: 'exam' as StudyScenario },
]

/* ── Scenario Indicator ── */
const scenarioColors: Record<string, string> = {
  preview: '#00d4ff',
  inclass: '#7c3aed',
  homework: '#06d6a0',
  exam: '#f59e0b',
}

/* ── Answer Generation (Scenario-aware) ── */
function generateAnswer(q: string): string {
  const template = scenarioAnswerTemplates[currentScenario.value]
  if (template) {
    return template(q, currentSubMode.value)
  }
  // Fallback
  return `关于「${q}」的解答：\n\n这是一个很好的问题。在当前「${activeSubModeConfig.value?.label ?? ''}」模式下，我来为你详细解答。\n\n**关键要点：**\n1. 核心概念\n2. 原理说明\n3. 实际应用\n\n> 需要更深入的解释可以继续追问。`
}

/* ── Formatting ── */
function formatAnswer(text: string) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/### (.*?)(\n|$)/g, '<h3 class="h3">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 class="h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\|(.+?)\|(.+?)\|/g, (m) => `<span class="inline-table">${m}</span>`)
    .replace(/\n/g, '<br/>')
}

/* ── Actions ── */
function askQuestion() {
  if (!question.value.trim()) return
  const q = question.value
  const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const answer = generateAnswer(q)

  history.value.push({
    q,
    a: answer,
    time: now,
    scenario: currentScenario.value,
    submode: currentSubMode.value,
  })

  // Record for emotion detection
  emotion.recordQuestion(q.slice(0, 20))
  courseStore.recordAnswer(true) // Simulated: mark as "correct" for now

  question.value = ''
}

function setHelpful(index: number, helpful: boolean) {
  if (history.value[index]) {
    history.value[index].helpful = helpful
  }
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

function selectSession(s: typeof sessionHistory[0]) {
  currentScenario.value = s.scenario
  showHistory.value = false
}

function selectCourse(course: Course) {
  selectedCourseId.value = course.id
  courseStore.setCourse(course.id)
  showCoursePanel.value = false
}

/* ── 多模态面板数据 ── */
const currentFlowStages = computed(() => {
  const course = selectedCourse.value
  // Return flow stages based on current scenario / course
  if (!course) return mlFlowStages
  const sf = course.subfield
  if (sf === 'dl') return dlFlowStages
  if (sf === 'nlp') return nlpFlowStages
  return mlFlowStages
})

const currentCodeExamples = computed(() => {
  const course = selectedCourse.value
  if (!course) return sharedCodeExamples['model-training']
  // Collect all code examples from the course
  const examples: any[] = []
  for (const topic of course.topics) {
    if (topic.codeExamples) {
      examples.push(...topic.codeExamples)
    }
  }
  return examples.length > 0 ? examples : sharedCodeExamples['model-training']
})

const currentMindMap = computed(() => {
  const course = selectedCourse.value
  if (!course) return undefined
  const topic = course.topics[0]
  return topic.mindMap
})

function toggleModalPanel(panel: 'code' | 'flow' | 'mindmap') {
  activeModalPanel.value = activeModalPanel.value === panel ? null : panel
}
</script>

<template>
  <div class="tutor">
    <!-- ====================== Hero ====================== -->
    <div class="tutor-hero">
      <div>
        <div class="hero-badge">智能辅导</div>
        <h1 class="hero-title">
          <span class="gradient-text">{{ activeSubModeConfig?.label ?? '即时答疑' }}</span>
        </h1>
        <p class="hero-desc">{{ activeScenarioConfig?.description ?? '多模式深度讲解，随时随地解决你的学习问题' }}</p>
      </div>
      <div class="hero-actions">
        <!-- Course Selector -->
        <button class="hero-btn course-btn" @click="showCoursePanel = !showCoursePanel">
          <BookOpen :size="15" stroke-width="1.5" />
          <span>{{ selectedCourse?.name ?? '选择课程' }}</span>
          <ChevronRight :size="13" stroke-width="1.5" :class="{ rotated: showCoursePanel }" />
        </button>
        <!-- History -->
        <button class="hero-btn" @click="showHistory = !showHistory">
          <History :size="15" stroke-width="1.5" />
          <span>历史</span>
        </button>
      </div>
    </div>

    <!-- Course Panel -->
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

    <!-- History Panel -->
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

    <!-- ====================== Scenario Selector ====================== -->
    <ScenarioSelector
      :current-scenario="currentScenario"
      :current-sub-mode="currentSubMode"
      @update:scenario="onScenarioChange"
      @update:sub-mode="onSubModeChange"
    />

    <!-- ====================== Main Content Area ====================== -->
    <div class="tutor-body">
      <!-- Left: Conversation / Empty State -->
      <div class="tutor-main">
        <!-- Conversation -->
        <div v-if="history.length > 0" class="conversation">
          <div v-for="(item, i) in history" :key="i" class="qa-pair">
            <!-- Question -->
            <div class="question-bubble">
              <div class="bubble-avatar q-avatar">Q</div>
              <div class="bubble-content">
                <p>{{ item.q }}</p>
                <span class="bubble-meta">
                  <span class="bubble-tag" :style="{ '--t-clr': scenarioColors[item.scenario] || '#00d4ff' }">
                    {{ scenarioConfigs.find(s => s.key === item.scenario)?.label }}
                  </span>
                  <span class="bubble-time">{{ item.time }}</span>
                </span>
              </div>
            </div>

            <!-- Answer -->
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
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-mode-icon">
            <MessageCircle :size="36" stroke-width="1" />
          </div>
          <h3 class="empty-title">{{ activeSubModeConfig?.label ?? '开始学习' }}</h3>
          <p class="empty-desc">{{ activeSubModeConfig?.desc ?? '选择一个问题开始，或输入你的问题' }}</p>

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
        </div>

        <!-- Input Area -->
        <div class="input-section">
          <div class="mode-indicator">
            {{ activeScenarioConfig?.label ?? '辅导' }} ·
            {{ activeSubModeConfig?.label ?? '问答' }}
          </div>
          <div class="input-row">
            <input
              v-model="question"
              type="text"
              :placeholder="`在「${activeSubModeConfig?.label ?? '问答'}」模式下输入问题...`"
              @keydown.enter="askQuestion"
            />
            <button class="ask-btn" @click="askQuestion" :disabled="!question.trim()">
              <Zap :size="16" stroke-width="2" />
              <span>提问</span>
            </button>
          </div>
          <!-- Multi-modal Toolbar -->
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

      <!-- Multi-modal Panel Overlay -->
      <transition name="slide-up">
        <div v-if="activeModalPanel" class="modal-panel-wrap">
          <div class="modal-panel">
            <div class="mp-header">
              <span class="mp-title">
                {{ activeModalPanel === 'flow' ? '数据处理流程图' : activeModalPanel === 'code' ? '交互式代码画板' : '知识思维导图' }}
              </span>
              <button class="mp-close" @click="activeModalPanel = null">✕</button>
            </div>
            <div class="mp-body">
              <!-- FlowChart -->
              <FlowChart
                v-if="activeModalPanel === 'flow'"
                :stages="currentFlowStages"
                :title="selectedCourse?.name ? selectedCourse.name + ' 流程' : '数据处理流程'"
              />
              <!-- CodeCanvas -->
              <CodeCanvas
                v-if="activeModalPanel === 'code'"
                :examples="currentCodeExamples"
                language="python"
                @explain="(c) => { question = '请解释这段代码：' + c.slice(0, 100); activeModalPanel = null; }"
              />
              <!-- MindMap -->
              <MindMap
                v-if="activeModalPanel === 'mindmap'"
                :nodes="currentMindMap ?? []"
                :title="selectedCourse?.name ?? '知识体系'"
                :color="selectedCourse?.color ?? '#00d4ff'"
                @node-click="(n: any) => { question = '解释一下' + n.label; activeModalPanel = null; }"
              />
            </div>
          </div>
        </div>
      </transition>

      <!-- ============================================================ -->
      <!-- Right: Digital Human Panel (reserved)                        -->
      <!-- ============================================================ -->
      <!--
        AI 数字人面板 — 集成说明：
        ==========
        1. 替换 #digital-human-slot 中的 TODO 内容为实际的数字人组件
        2. 数字人组件应接收以下 props:
           - currentQuestion: string   (当前用户问题)
           - currentAnswer: string     (当前 AI 回答)
           - scenario: string           (当前场景: preview/inclass/homework/exam)
           - subMode: string           (当前子模式)
        3. 该面板已实现折叠/展开功能
        4. 面板宽度: 280px (展开) / 0 (折叠)
      -->
      <div class="tutor-sidebar">
        <button
          class="dh-toggle"
          :class="{ active: true }"
          title="AI 数字人"
        >
          <Bot :size="18" stroke-width="1.5" />
        </button>

        <div class="dh-panel">
          <!-- ========== DH Panel Content ========== -->
          <div class="dh-header">
            <Bot :size="18" stroke-width="1.5" />
            <span>AI 数字人</span>
          </div>

          <!-- === DIGITAL HUMAN SLOT (reserved) === -->
          <!--
            TODO: 在此替换为数字人组件
            <DigitalHuman
              :current-question="history[history.length - 1]?.q ?? ''"
              :current-answer="history[history.length - 1]?.a ?? ''"
              :scenario="currentScenario"
              :sub-mode="currentSubMode"
            />
          -->
          <div id="digital-human-slot" class="dh-slot">
            <div class="dh-placeholder">
              <div class="dhp-icon">
                <Bot :size="36" stroke-width="1" />
              </div>
              <span class="dhp-text">AI 数字人</span>
              <span class="dhp-hint">集成后将在此显示</span>
            </div>
          </div>
          <!-- === END DIGITAL HUMAN SLOT === -->

          <div class="dh-footer">
            <div class="dhf-label">当前讲解</div>
            <p class="dhf-text">
              {{ history.length > 0 ? history[history.length - 1].q.slice(0, 50) + '...' : '等待提问中...' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Emotion Mascot -->
    <EmotionMascot />
  </div>
</template>

<script lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'
export default {
  components: { ChevronRightIcon }
}
</script>

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

/* ====================== Hero ====================== */
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

.course-btn { gap: 6px; }
.course-btn .rotated { transform: rotate(90deg); }

/* ── Course Panel ── */
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

/* ── History Panel ── */
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

/* ====================== Tutor Body (Sidebar layout) ====================== */
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

/* ====================== Conversation ====================== */
.conversation {
  flex: 1;
  overflow-y: auto;
  padding: 0 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.qa-pair {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-bubble, .answer-bubble {
  display: flex;
  gap: 12px;
}

.question-bubble { justify-content: flex-end; }
.answer-bubble { justify-content: flex-start; }

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

/* ====================== Empty State ====================== */
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

/* ====================== Input Area ====================== */
.input-section {
  padding: 16px 40px 24px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(20px);
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

/* ============================================================ */
/* Digital Human Sidebar Panel                                  */
/* ============================================================ */
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
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.dh-panel {
  width: 260px;
  margin-left: -1px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0 14px 14px 0;
  border-left: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
}

.dh-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* ── Digital Human Slot (reserved) ── */
.dh-slot {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  min-height: 200px;
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
  border-top: 1px solid var(--color-border);
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

/* ====================== Multi-modal Toolbar ====================== */
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

/* ====================== Modal Panel ====================== */
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

/* ====================== Responsive ====================== */
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
