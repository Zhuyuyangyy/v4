<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Code, Sparkles } from 'lucide-vue-next'
import { allCourses, sharedCodeExamples } from '@/components/course/CourseData'
import CodeCanvas from '@/components/canvas/CodeCanvas.vue'

const router = useRouter()
const selectedCourseId = ref('ai-ml')
const showCoursePanel = ref(false)

const selectedCourse = computed(() =>
  allCourses.find(c => c.id === selectedCourseId.value)
)

const codeExamples = computed(() => {
  const course = selectedCourse.value
  if (!course) return sharedCodeExamples['model-training']
  const all: any[] = []
  for (const topic of course.topics) {
    if (topic.codeExamples) all.push(...topic.codeExamples)
  }
  return all.length > 0 ? all : sharedCodeExamples['model-training']
})

function selectCourse(id: string) {
  selectedCourseId.value = id
  showCoursePanel.value = false
}
</script>

<template>
  <div class="codelab">
    <!-- Hero -->
    <div class="cl-hero">
      <div class="cl-hero-left">
        <button class="back-btn" @click="router.push('/tutoring')">
          <ArrowLeft :size="16" stroke-width="1.5" />
        </button>
        <div>
          <div class="hero-badge">代码实验室</div>
          <h1 class="hero-title">交互式<span class="gradient-text">代码画板</span></h1>
          <p class="hero-desc">编写、运行、调试 AI 代码，支持截图上传与涂鸦提问</p>
        </div>
      </div>
      <div class="cl-hero-right">
        <button class="hero-btn" @click="showCoursePanel = !showCoursePanel">
          <Code :size="15" stroke-width="1.5" />
          <span>{{ selectedCourse?.name ?? '选择课程' }}</span>
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
          @click="selectCourse(c.id)"
        >
          <span class="cc-name">{{ c.name }}</span>
          <span class="cc-diff">{{ c.difficulty === 'beginner' ? '入门' : c.difficulty === 'intermediate' ? '进阶' : '高级' }}</span>
        </button>
      </div>
    </transition>

    <!-- Code Canvas -->
    <div class="cl-canvas-wrapper">
      <CodeCanvas
        :examples="codeExamples"
        language="python"
        :initial-code="'# 选择左侧课程示例代码开始练习\n# 或直接在这里输入你的代码\nimport numpy as np\nimport pandas as pd\n\nprint(\'欢迎来到 AI 代码实验室！\')'"
      />
    </div>

    <!-- Tips -->
    <div class="cl-tips">
      <div class="tip-card">
        <Sparkles :size="14" stroke-width="1.5" class="tip-icon" />
        <div class="tip-body">
          <span class="tip-title">AI 解释代码</span>
          <span class="tip-desc">选中代码后点击「解释代码」按钮获取逐行讲解</span>
        </div>
      </div>
      <div class="tip-card">
        <Code :size="14" stroke-width="1.5" class="tip-icon" />
        <div class="tip-body">
          <span class="tip-title">上传截图提问</span>
          <span class="tip-desc">遇到 Bug 可截图上传，在图上涂鸦标注问题区域</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.codelab {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 40px;
  position: relative;
  z-index: 1;
}

.cl-hero {
  padding: 48px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.cl-hero-left {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
  margin-top: 4px;
  flex-shrink: 0;
}
.back-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(124, 58, 237, 0.08);
  color: var(--color-accent-purple);
  border: 1px solid rgba(124, 58, 237, 0.1);
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

.cl-hero-right {
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

.course-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0 16px;
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
.cc-diff { font-size: 10px; padding: 1px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); }

.cl-canvas-wrapper {
  margin: 8px 0 24px;
}

.cl-tips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tip-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.tip-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(124, 58, 237, 0.08);
  color: var(--color-accent-purple);
}

.tip-body { display: flex; flex-direction: column; gap: 2px; }
.tip-title { font-size: 13px; font-weight: 600; color: var(--color-text-primary); }
.tip-desc { font-size: 11px; color: var(--color-text-tertiary); }

@media (max-width: 900px) {
  .codelab { padding: 0 20px 32px; }
  .cl-hero { padding: 32px 0 16px; flex-direction: column; }
  .cl-tips { grid-template-columns: 1fr; }
}
</style>
