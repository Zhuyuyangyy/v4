<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Award,
  BookOpen,
  Clock,
  GitCompare,
  Sparkles,
  Target,
  Zap,
} from 'lucide-vue-next'
import { fetchLearningPath } from '@/lib/api'
import type { StudyScenario } from '@/types/course'
import { allCourses } from '@/components/course/CourseData'

type PathStatus = 'completed' | 'active' | 'locked'

interface PathNode {
  name: string
  progress: number
  duration: string
  resources?: number
  topicId?: string
}

interface PathPhase {
  title: string
  period: string
  progress: number
  status: PathStatus
  color: string
  scenario: StudyScenario
  nodes: PathNode[]
}

const router = useRouter()
const loaded = ref(false)
const isLoading = ref(false)

const defaultPhases: PathPhase[] = [
  {
    title: '基础夯实',
    period: '第 1-4 周',
    progress: 100,
    status: 'completed',
    color: '#00d4ff',
    scenario: 'preview',
    nodes: [
      { name: 'Python 科学计算', progress: 100, duration: '1.5 周', topicId: 'ml-intro' },
      { name: '概率论与数理统计', progress: 100, duration: '1.5 周', topicId: 'ml-intro' },
      { name: '线性代数与矩阵运算', progress: 100, duration: '1 周', topicId: 'ml-intro' },
    ],
  },
  {
    title: '机器学习核心',
    period: '第 5-10 周',
    progress: 65,
    status: 'active',
    color: '#7c3aed',
    scenario: 'inclass',
    nodes: [
      { name: '机器学习概论与流程', progress: 100, duration: '1 周', topicId: 'ml-intro' },
      { name: 'KNN 与决策树', progress: 80, duration: '1.5 周', topicId: 'ml-supervised' },
      { name: 'SVM 与集成学习', progress: 50, duration: '1.5 周', topicId: 'ml-supervised' },
      { name: '聚类与降维', progress: 30, duration: '1 周', topicId: 'ml-unsupervised' },
      { name: '模型评估与调优', progress: 20, duration: '1 周', topicId: 'ml-supervised' },
    ],
  },
  {
    title: '深度学习专题',
    period: '第 11-16 周',
    progress: 25,
    status: 'active',
    color: '#06d6a0',
    scenario: 'homework',
    nodes: [
      { name: '神经网络与反向传播', progress: 40, duration: '1.5 周', topicId: 'dl-basics' },
      { name: 'CNN 图像识别', progress: 30, duration: '2 周', topicId: 'dl-cnn' },
      { name: 'Transformer 与注意力机制', progress: 15, duration: '2 周', topicId: 'nlp-transformer' },
      { name: 'NLP 预训练模型应用', progress: 0, duration: '1.5 周', topicId: 'nlp-bert' },
    ],
  },
  {
    title: '实战与拓展',
    period: '第 17-20 周',
    progress: 0,
    status: 'locked',
    color: '#f59e0b',
    scenario: 'exam',
    nodes: [
      { name: 'LLM 应用开发实战', progress: 0, duration: '2 周', topicId: 'llm-rag' },
      { name: 'AI Agent 项目', progress: 0, duration: '1.5 周', topicId: 'llm-agent' },
      { name: '模型部署与服务', progress: 0, duration: '1 周', topicId: 'mlops-deploy' },
    ],
  },
]

const achievements = [
  { icon: Sparkles, title: 'Python 启航', earned: true, color: '#00d4ff' },
  { icon: Award, title: '算法入门', earned: true, color: '#7c3aed' },
  { icon: Zap, title: '机器学习', earned: true, color: '#06d6a0' },
  { icon: Target, title: '深度学习', earned: false, color: '#3b82f6' },
  { icon: BookOpen, title: '大模型实战', earned: false, color: '#f59e0b' },
  { icon: Sparkles, title: '全栈 AI 工程师', earned: false, color: '#f43f5e' },
]

const defaultWeeklyGoals = [
  { label: '完成 Python 基础', progress: 100, target: '1 章' },
  { label: '数据结构练习', progress: 60, target: '20 题' },
  { label: '阅读论文', progress: 30, target: '2 篇' },
  { label: '编程项目实战', progress: 0, target: '1 个' },
]

const phases = ref<PathPhase[]>(defaultPhases)
const weeklyGoals = ref(defaultWeeklyGoals)

const totalPhases = computed(() => phases.value.length)
const completedPhases = computed(() => phases.value.filter(phase => phase.status === 'completed').length)
const totalProgress = computed(() => {
  const sum = phases.value.reduce((total, phase) => total + phase.progress, 0)
  return phases.value.length ? Math.round(sum / phases.value.length) : 0
})
const totalNodes = computed(() => phases.value.reduce((total, phase) => total + phase.nodes.length, 0))
const completedNodes = computed(() => {
  return phases.value.reduce((total, phase) => total + phase.nodes.filter(node => node.progress === 100).length, 0)
})
const weeklyGoalsDone = computed(() => weeklyGoals.value.filter(goal => goal.progress === 100).length)

const learningStats = computed(() => [
  { label: '本周学习', value: '14.5h', change: '+18%', icon: Award },
  { label: '完成节点', value: `${completedNodes.value}/${totalNodes.value}`, change: '持续推进', icon: GitCompare },
  { label: '总体进度', value: `${totalProgress.value}%`, change: `${completedPhases.value}/${totalPhases.value} 阶段`, icon: Sparkles },
])

const aiCourses = computed(() => allCourses.filter(course => course.domain === 'ai'))

function normalizePhases(phasesFromApi: Array<Omit<PathPhase, 'scenario'>>) {
  return phasesFromApi.map((phase, index) => ({
    ...phase,
    scenario: defaultPhases[index]?.scenario ?? 'preview',
    nodes: phase.nodes.map((node, nodeIndex) => ({
      ...node,
      topicId: defaultPhases[index]?.nodes[nodeIndex]?.topicId,
    })),
  }))
}

function goToTutoring(scenario: StudyScenario, nodeName?: string) {
  router.push({
    path: '/tutoring',
    query: { scenario, ...(nodeName ? { q: nodeName } : {}) },
  })
}

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    loaded.value = true
  }, 100)

  fetchLearningPath()
    .then(data => {
      phases.value = normalizePhases(data.phases as Array<Omit<PathPhase, 'scenario'>>)
      weeklyGoals.value = data.weeklyGoals
    })
    .catch(() => {
      // Keep local fallback data when the API server is unavailable.
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="lp">
    <div class="lp-hero">
      <div>
        <div class="hero-badge">学习路径</div>
        <h1 class="hero-title">个性化<span class="gradient-text">学习路线</span></h1>
        <p class="hero-desc">AI 为你量身定制的学习路线，稳步推进到下一个阶段。</p>
        <p v-if="isLoading" class="page-status">正在同步学习路径...</p>
      </div>
      <div class="hero-progress">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3" />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="url(#hpGrad)"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="150.8"
            :stroke-dashoffset="loaded ? 150.8 * (1 - totalProgress / 100) : 150.8"
            transform="rotate(-90 28 28)"
            class="progress-arc"
          />
          <defs>
            <linearGradient id="hpGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#00d4ff" />
              <stop offset="100%" stop-color="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div class="hp-center">
          <span class="hp-pct">{{ totalProgress }}%</span>
          <span class="hp-lbl">总进度</span>
        </div>
      </div>
    </div>

    <div class="course-overview">
      <div class="co-header">
        <BookOpen :size="14" stroke-width="1.5" />
        <span>AI 课程体系</span>
      </div>
      <div class="co-grid">
        <div
          v-for="course in aiCourses"
          :key="course.id"
          class="co-chip"
          :style="{ '--c-clr': course.color }"
          @click="goToTutoring('preview', course.name)"
        >
          <span class="co-name">{{ course.name }}</span>
          <span class="co-diff">
            {{ course.difficulty === 'beginner' ? '入门' : course.difficulty === 'intermediate' ? '进阶' : '高级' }}
          </span>
        </div>
      </div>
    </div>

    <div class="quick-stats">
      <div v-for="item in learningStats" :key="item.label" class="qs-card">
        <div class="qs-icon">
          <component :is="item.icon" :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">{{ item.value }}</span>
          <span class="qs-label">{{ item.label }}</span>
        </div>
        <span class="qs-change">{{ item.change }}</span>
      </div>
      <div class="qs-card qs-summary">
        <div class="qs-summary-inner">
          <span>{{ completedPhases }}/{{ totalPhases }} 阶段完成</span>
          <span class="qs-remain">{{ totalNodes - completedNodes }} 个节点待推进</span>
        </div>
      </div>
    </div>

    <div class="phase-list">
      <div
        v-for="(phase, phaseIndex) in phases"
        :key="phase.title"
        :class="['phase-card', phase.status]"
        :style="{ '--p-color': phase.color }"
      >
        <div class="phase-top">
          <div class="phase-info">
            <div :class="['phase-badge', phase.status]">
              {{ phase.status === 'completed' ? '✓' : phase.status === 'active' ? phaseIndex + 1 : '•' }}
            </div>
            <div>
              <h2 class="phase-title">{{ phase.title }}</h2>
              <span class="phase-period">{{ phase.period }}</span>
            </div>
          </div>
          <div class="phase-meta">
            <span class="phase-pct">{{ phase.progress > 0 ? `${phase.progress}%` : '未开始' }}</span>
            <span :class="['phase-tag', phase.status]">
              {{ phase.status === 'completed' ? '已完成' : phase.status === 'active' ? '进行中' : '未解锁' }}
            </span>
          </div>
        </div>

        <div class="phase-progress-bar">
          <div class="phase-progress-fill" :style="{ width: loaded ? `${phase.progress}%` : '0%' }" />
        </div>

        <div class="phase-nodes">
          <div
            v-for="(node, nodeIndex) in phase.nodes"
            :key="node.name"
            class="node-card"
            @click="goToTutoring(phase.scenario, node.name)"
          >
            <div class="node-left">
              <div :class="['node-check', { done: node.progress === 100 }]">
                {{ node.progress === 100 ? '✓' : phaseIndex * 10 + nodeIndex + 1 }}
              </div>
              <div class="node-info">
                <span class="node-name">{{ node.name }}</span>
                <span class="node-duration">
                  <Clock :size="11" stroke-width="1.5" />
                  {{ node.duration }}
                </span>
              </div>
            </div>
            <div class="node-right">
              <div class="node-track">
                <div
                  class="node-fill"
                  :style="{
                    width: loaded ? `${node.progress}%` : '0%',
                    background: node.progress === 100 ? 'var(--color-accent-emerald)' : 'var(--p-color)',
                  }"
                />
              </div>
              <span class="node-pct">{{ node.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-grid">
      <div class="card">
        <div class="card-head">
          <h2 class="card-title-sm">本周目标</h2>
          <span class="card-badge">{{ weeklyGoalsDone }}/{{ weeklyGoals.length }}</span>
        </div>
        <div class="goal-list">
          <div v-for="goal in weeklyGoals" :key="goal.label" class="goal-item">
            <div class="goal-top">
              <span class="goal-label">{{ goal.label }}</span>
              <span class="goal-target">{{ goal.target }}</span>
            </div>
            <div class="goal-track">
              <div class="goal-fill" :style="{ width: loaded ? `${goal.progress}%` : '0%' }" />
            </div>
            <span class="goal-pct">{{ goal.progress }}%</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-head">
          <h2 class="card-title-sm">里程碑</h2>
          <span class="card-badge">{{ achievements.filter(item => item.earned).length }}/{{ achievements.length }}</span>
        </div>
        <div class="milestone-grid">
          <div
            v-for="item in achievements"
            :key="item.title"
            :class="['milestone-item', { earned: item.earned }]"
            :style="{ '--m-color': item.color }"
          >
            <component :is="item.icon" v-if="item.earned" :size="16" stroke-width="1.5" class="milestone-icon" />
            <span v-else class="milestone-locked">•</span>
            <span class="milestone-name">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lp {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0 40px;
  position: relative;
  z-index: 1;
}

.lp-hero,
.quick-stats,
.phase-list,
.course-overview,
.bottom-grid {
  padding-left: 40px;
  padding-right: 40px;
}

.lp-hero {
  padding-top: 48px;
  padding-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-bottom: 12px;
}

.hero-title {
  margin: 0 0 8px;
  color: #fff;
  font-size: 34px;
  font-family: var(--font-display);
  font-weight: 400;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc,
.page-status {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.page-status {
  margin-top: 8px;
  color: var(--color-accent-cyan);
}

.hero-progress {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.progress-arc,
.phase-progress-fill,
.goal-fill,
.node-fill {
  transition: all 0.6s var(--ease-out);
}

.hp-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hp-pct {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono);
  line-height: 1;
}

.hp-lbl {
  color: var(--color-text-tertiary);
  font-size: 8px;
  margin-top: 2px;
}

.course-overview {
  padding-bottom: 20px;
}

.co-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.co-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.co-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.co-chip:hover {
  border-color: var(--c-clr);
  background: color-mix(in srgb, var(--c-clr) 6%, var(--color-bg-card));
  transform: translateY(-1px);
}

.co-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.co-diff {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-tertiary);
  font-size: 10px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.qs-card,
.phase-card,
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.qs-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
}

.qs-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.1);
  flex-shrink: 0;
}

.qs-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.qs-value {
  color: #fff;
  font-size: 18px;
  font-family: var(--font-display);
}

.qs-label,
.qs-change,
.qs-remain,
.phase-period,
.goal-target,
.node-duration,
.node-pct {
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.qs-summary {
  justify-content: center;
}

.qs-summary-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.phase-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.phase-card {
  padding: 24px;
  border-top: 3px solid var(--p-color);
  transition: all 0.2s var(--ease-out);
}

.phase-card.locked {
  opacity: 0.6;
}

.phase-card:not(.locked):hover {
  border-color: var(--p-color);
}

.phase-top,
.phase-info,
.phase-meta,
.goal-top,
.card-head,
.node-left,
.node-right,
.node-info {
  display: flex;
  align-items: center;
}

.phase-top,
.goal-top,
.card-head {
  justify-content: space-between;
}

.phase-top {
  margin-bottom: 14px;
}

.phase-info,
.phase-meta,
.node-left,
.node-right,
.node-info {
  gap: 10px;
}

.phase-badge,
.node-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.phase-badge.completed,
.node-check.done {
  background: rgba(6, 214, 160, 0.16);
  color: var(--color-accent-emerald);
}

.phase-badge.active {
  background: var(--p-color);
  color: #fff;
}

.phase-badge.locked,
.node-check {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-tertiary);
}

.phase-title,
.card-title-sm {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 400;
}

.phase-title {
  font-size: 22px;
}

.card-title-sm {
  font-size: 20px;
}

.phase-pct {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 14px;
}

.phase-tag,
.card-badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
}

.phase-tag.completed {
  background: rgba(6, 214, 160, 0.1);
  color: var(--color-accent-emerald);
}

.phase-tag.active {
  background: color-mix(in srgb, var(--p-color) 12%, transparent);
  color: var(--p-color);
}

.phase-tag.locked {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-tertiary);
}

.phase-progress-bar,
.goal-track,
.node-track {
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.phase-progress-bar {
  margin-bottom: 18px;
}

.phase-progress-fill {
  height: 100%;
  background: var(--p-color);
}

.phase-nodes,
.goal-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node-card,
.milestone-item {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}

.node-card {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.node-card:hover {
  border-color: color-mix(in srgb, var(--p-color) 15%, transparent);
  background: color-mix(in srgb, var(--p-color) 4%, transparent);
}

.node-name,
.goal-label,
.milestone-name {
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 500;
}

.node-right {
  width: 140px;
}

.node-track {
  flex: 1;
}

.node-fill {
  height: 100%;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  padding: 24px;
}

.card-badge {
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.goal-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.goal-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-blue));
}

.goal-pct {
  align-self: flex-end;
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 12px;
}

.milestone-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

.milestone-item.earned {
  border-color: color-mix(in srgb, var(--m-color) 28%, transparent);
}

.milestone-icon {
  color: var(--m-color);
}

.milestone-locked {
  opacity: 0.35;
}

@media (max-width: 900px) {
  .lp-hero,
  .quick-stats,
  .phase-list,
  .course-overview,
  .bottom-grid {
    padding-left: 20px;
    padding-right: 20px;
  }

  .lp-hero {
    padding-top: 32px;
    flex-direction: column;
    align-items: flex-start;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .milestone-grid {
    grid-template-columns: 1fr;
  }

  .node-right {
    width: 110px;
  }
}
</style>