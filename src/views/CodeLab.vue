<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Code, Sparkles, Layers, Wand2, Image, BookOpen, ChevronDown } from 'lucide-vue-next'
import { allCourses, sharedCodeExamples } from '@/components/course/CourseData'
import CodeCanvas from '@/components/canvas/CodeCanvas.vue'
import type { CodeExample, CourseTopic } from '@/types/course'

const router = useRouter()
const selectedCourseId = ref('ai-ml')
const selectedTopicId = ref<string | null>(null)

const coursesWithCode = computed(() => allCourses.filter(c => getCodeExampleCount(c.id) > 0))

function getCodeExampleCount(courseId: string): number {
  const course = allCourses.find(c => c.id === courseId)
  if (!course) return 0
  let count = 0
  for (const t of course.topics) {
    if (t.codeExamples) count += t.codeExamples.length
  }
  return count
}

const selectedCourse = computed(() => allCourses.find(c => c.id === selectedCourseId.value))

const topicsWithCode = computed<CourseTopic[]>(() => {
  const course = selectedCourse.value
  if (!course) return []
  return course.topics.filter(t => t.codeExamples && t.codeExamples.length > 0)
})

const codeExamples = computed(() => {
  const course = selectedCourse.value
  if (!course) return sharedCodeExamples['model-training']
  if (selectedTopicId.value) {
    const topic = course.topics.find(t => t.id === selectedTopicId.value)
    if (topic?.codeExamples?.length) return topic.codeExamples
  }
  const all: CodeExample[] = []
  for (const topic of course.topics) {
    if (topic.codeExamples) all.push(...topic.codeExamples)
  }
  return all.length > 0 ? all : sharedCodeExamples['model-training']
})

const currentTopicLabel = computed(() => {
  if (!selectedTopicId.value) return '全部主题'
  const course = selectedCourse.value
  if (!course) return ''
  const topic = course.topics.find(t => t.id === selectedTopicId.value)
  return topic?.name ?? '全部主题'
})

function selectCourse(id: string) {
  if (id === selectedCourseId.value) return
  selectedCourseId.value = id
  selectedTopicId.value = null
}

function selectTopic(id: string | null) {
  selectedTopicId.value = id
}

const features = computed(() => [
  { icon: Sparkles, title: 'AI 解释代码', desc: '选中代码点击「解释」获取逐行讲解，深入理解每行代码', color: '#7c3aed' },
  { icon: Wand2, title: '语法高亮', desc: 'Python 关键词、字符串、函数名自动着色，结构一目了然', color: '#00d4ff' },
  { icon: Layers, title: '多主题覆盖', desc: `${coursesWithCode.value.length} 个课程方向配备独立代码示例`, color: '#06d6a0' },
  { icon: Image, title: '截图提问', desc: '截图上传 + 涂鸦标注问题区域，精准定位错误', color: '#f59e0b' },
])
</script>

<template>
  <div class="cl-shell">
    <!-- === Glass Top Bar === -->
    <header class="cl-topbar">
      <div class="cl-topbar-inner">
        <div class="cltb-left">
          <button class="cltb-back" @click="router.push('/tutoring')">
            <ArrowLeft :size="15" stroke-width="1.5" />
          </button>
          <span class="cltb-brand">
            <Code :size="14" stroke-width="1.5" class="cltb-brand-icon" />
            代码实验室
          </span>
          <div class="cltb-divider" />
        </div>

        <div class="cltb-center">
          <div class="cltb-course-track">
            <button
              v-for="c in coursesWithCode"
              :key="c.id"
              :class="['cltb-course', { active: selectedCourseId === c.id }]"
              :style="{ '--c-clr': c.color }"
              @click="selectCourse(c.id)"
            >
              <span class="ct-dot" />
              <span class="ct-name">{{ c.name }}</span>
            </button>
          </div>
          <div v-if="topicsWithCode.length > 0" class="cltb-divider" />
          <div class="cltb-topic-track">
            <button
              :class="['cltb-topic', { active: selectedTopicId === null }]"
              @click="selectTopic(null)"
            >全部</button>
            <button
              v-for="t in topicsWithCode"
              :key="t.id"
              :class="['cltb-topic', { active: selectedTopicId === t.id }]"
              @click="selectTopic(t.id)"
            >
              {{ t.name }}
              <span class="ct-badge">{{ t.codeExamples?.length }}</span>
            </button>
          </div>
        </div>

        <div class="cltb-right">
          <span class="cltb-count">{{ codeExamples.length }} 个示例</span>
        </div>
      </div>
    </header>

    <!-- === Left Sidebar + Right Editor === -->
    <div class="cl-body">
      <!-- Sidebar: context + feature cards -->
      <aside class="cl-sidebar">
        <div class="ctx-breadcrumb">
          <span class="ctx-course" :style="{ color: selectedCourse?.color }">{{ selectedCourse?.name }}</span>
          <span class="ctx-sep">/</span>
          <span class="ctx-topic">{{ currentTopicLabel }}</span>
        </div>

        <div class="cl-features">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="cf-card"
            :style="{ '--f-clr': f.color }"
          >
            <div class="cf-icon">
              <component :is="f.icon" :size="18" stroke-width="1.5" />
            </div>
            <div class="cf-body">
              <span class="cf-title">{{ f.title }}</span>
              <span class="cf-desc">{{ f.desc }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main: Code editor -->
      <main class="cl-main">
        <CodeCanvas
          :key="`${selectedCourseId}-${selectedTopicId ?? 'all'}`"
          :examples="codeExamples"
          language="python"
          :initial-code="'# 选择课程示例代码开始练习\n# 或直接在这里输入你的代码\nimport numpy as np\nimport pandas as pd\n\nprint(\'欢迎来到 AI 代码实验室！\')'"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════
   Shell
   ═══════════════════════════════ */
.cl-shell {
  height: calc(100vh - var(--header-height));
  background: transparent;
  display: flex;
  flex-direction: column;
}

/* ═══════════════════════════════
   Glass Top Bar (sticky)
   ═══════════════════════════════ */
.cl-topbar {
  flex-shrink: 0;
  background: color-mix(in srgb, var(--color-bg-primary) 80%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  z-index: 10;
}

.cl-topbar-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 48px;
  max-width: 1440px;
  margin: 0 auto;
}

.cltb-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.cltb-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--color-text-tertiary);
  transition: all 0.15s var(--ease-out);
}
.cltb-back:hover {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
}

.cltb-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
  letter-spacing: 0.3px;
}
.cltb-brand-icon { color: var(--color-accent-purple); }

.cltb-divider {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.cltb-center {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  min-width: 0;
}
.cltb-center::-webkit-scrollbar { display: none; }

.cltb-course-track {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

.cltb-course {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text-tertiary);
  border-radius: 6px;
  transition: all 0.15s var(--ease-out);
  white-space: nowrap;
}
.cltb-course:hover { color: var(--color-text-secondary); background: rgba(255,255,255,0.03); }
.cltb-course.active { color: var(--c-clr); background: color-mix(in srgb, var(--c-clr) 8%, transparent); }

.ct-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-clr);
  opacity: 0;
  transition: opacity 0.15s;
}
.cltb-course.active .ct-dot { opacity: 1; }

.cltb-topic-track {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.cltb-topic {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  font-size: 12px;
  color: var(--color-text-tertiary);
  border-radius: 14px;
  border: 1px solid transparent;
  transition: all 0.15s var(--ease-out);
  white-space: nowrap;
}
.cltb-topic:hover { color: var(--color-text-secondary); border-color: rgba(255,255,255,0.06); }
.cltb-topic.active {
  color: var(--color-accent-cyan);
  border-color: rgba(0, 212, 255, 0.12);
  background: rgba(0, 212, 255, 0.04);
}

.ct-badge {
  font-size: 10px;
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
  font-family: var(--font-mono);
  min-width: 14px;
  text-align: center;
}
.cltb-topic.active .ct-badge { background: rgba(0, 212, 255, 0.08); }

.cltb-right { flex-shrink: 0; display: flex; align-items: center; }

.cltb-count {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
  opacity: 0.5;
  white-space: nowrap;
}

/* ═══════════════════════════════
   Body: Sidebar + Editor
   ═══════════════════════════════ */
.cl-body {
  flex: 1;
  display: flex;
  min-height: 0;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 16px 12px;
  gap: 14px;
}

/* ── Sidebar ── */
.cl-sidebar {
  flex-shrink: 0;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
  overflow-y: auto;
}

.ctx-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  padding: 0 4px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.ctx-course { font-weight: 600; opacity: 0.85; }
.ctx-sep { color: var(--color-text-tertiary); opacity: 0.25; }
.ctx-topic { color: var(--color-text-tertiary); opacity: 0.6; }

/* ── Sidebar feature cards ── */
.cl-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cf-card {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--color-bg-elevated);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s var(--ease-out);
  cursor: default;
}
.cf-card:hover {
  border-color: color-mix(in srgb, var(--f-clr) 35%, transparent);
  background: color-mix(in srgb, var(--color-bg-elevated) 80%, var(--f-clr) 3%);
}

.cf-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: color-mix(in srgb, var(--f-clr) 12%, transparent);
  color: var(--f-clr);
  margin-top: 1px;
}

.cf-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.cf-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.cf-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
  line-height: 1.4;
}

/* ── Main (editor) ── */
.cl-main {
  flex: 1;
  display: flex;
  min-width: 0;
  min-height: 0;
}

.cl-main :deep(.code-canvas) {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  border-radius: 14px;
}

.cl-main :deep(.cc-body) {
  flex: 1;
  min-height: 0;
}

.cl-main :deep(.cc-editor),
.cl-main :deep(.cc-output) {
  min-height: 0;
}

.cl-main :deep(.cc-editor-inner) {
  min-height: 0;
  height: 100%;
}

.cl-main :deep(.cc-textarea) {
  min-height: 0;
  height: 100%;
}

/* ═══════════════════════════════
   Responsive
   ═══════════════════════════════ */
@media (max-width: 900px) {
  .cl-body {
    flex-direction: column;
    padding: 8px 12px;
  }
  .cl-sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    gap: 6px;
    padding: 0;
    scrollbar-width: none;
  }
  .cl-sidebar::-webkit-scrollbar { display: none; }
  .ctx-breadcrumb { display: none; }
  .cl-features {
    flex-direction: row;
    gap: 6px;
  }
  .cf-card {
    flex-shrink: 0;
    width: auto;
    padding: 10px 14px;
    white-space: nowrap;
  }
  .cf-desc { display: none; }
}

@media (max-width: 768px) {
  .cltb-right { display: none; }
}

@media (max-width: 480px) {
  .cltb-brand-icon, .cltb-divider { display: none; }
  .cl-body { padding: 4px 8px; }
}
</style>
