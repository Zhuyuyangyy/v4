<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Award,
  BookOpen,
  Bot,
  Clock,
  GitCompare,
  Lightbulb,
  RefreshCw,
  Route,
  Sparkles,
  Target,
  Zap,
} from 'lucide-vue-next'
import { fetchLearningPath } from '@/lib/api'
import type { StudyScenario } from '@/types/course'
import { allCourses } from '@/components/course/CourseData'
import GalaxyPanel from '@/components/galaxy/GalaxyPanel.vue'
import PathReplanCompare from '@/components/learning-path/PathReplanCompare.vue'
import type { ReplanCompareData } from '@/components/learning-path/PathReplanCompare.vue'
import { phasesToGalaxyData } from '@/components/galaxy/composables/useGalaxyData'
import type { GalaxySceneData } from '@/components/galaxy/galaxy.types'

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
const galaxyPanelRef = ref<InstanceType<typeof GalaxyPanel> | null>(null)

const defaultPhases: PathPhase[] = [
  {
    title: '课前预习',
    period: '路径阶段一',
    progress: 100,
    status: 'completed',
    color: '#00d4ff',
    scenario: 'preview',
    nodes: [
      { name: '根据画像生成预习知识点', progress: 100, duration: '画像智能体 + 路径规划智能体' },
      { name: '预习问题与学习目标', progress: 100, duration: '资源生成智能体' },
      { name: '知识卡片 / 思维导图预览', progress: 100, duration: '多模态资源' },
    ],
  },
  {
    title: '课中答疑',
    period: '路径阶段二',
    progress: 80,
    status: 'active',
    color: '#3b82f6',
    scenario: 'inclass',
    nodes: [
      { name: '实时对话答疑', progress: 90, duration: '辅导智能体' },
      { name: '重难点标注与解析', progress: 85, duration: '资源生成智能体' },
      { name: '课堂知识点掌握度记录', progress: 65, duration: '评估智能体' },
    ],
  },
  {
    title: '课后巩固',
    period: '路径阶段三',
    progress: 55,
    status: 'active',
    color: '#7c3aed',
    scenario: 'homework',
    nodes: [
      { name: '课后练习与错题训练', progress: 60, duration: '资源生成智能体' },
      { name: '知识点薄弱项标记', progress: 50, duration: '评估智能体' },
      { name: '巩固学习资源推荐', progress: 55, duration: '路径规划智能体' },
    ],
  },
  {
    title: '阶段测评',
    period: '路径阶段四',
    progress: 30,
    status: 'active',
    color: '#f59e0b',
    scenario: 'exam',
    nodes: [
      { name: '阶段掌握度评估', progress: 35, duration: '评估智能体' },
      { name: '错因分析与薄弱点识别', progress: 30, duration: '评估智能体 + 画像智能体' },
      { name: '生成评估报告', progress: 25, duration: '反馈智能体' },
    ],
  },
  {
    title: '期末辅导',
    period: '路径阶段五',
    progress: 10,
    status: 'locked',
    color: '#f43f5e',
    scenario: 'exam',
    nodes: [
      { name: '学期知识体系梳理', progress: 15, duration: '路径规划智能体' },
      { name: '综合复习资源生成', progress: 10, duration: '资源生成智能体' },
      { name: '模拟测试与预测', progress: 5, duration: '评估智能体' },
    ],
  },
  {
    title: '成果沉淀',
    period: '路径阶段六',
    progress: 0,
    status: 'locked',
    color: '#06d6a0',
    scenario: 'preview',
    nodes: [
      { name: '学习成果总结', progress: 0, duration: '反馈智能体' },
      { name: '画像全面更新', progress: 0, duration: '画像智能体' },
      { name: '下一阶段路径预规划', progress: 0, duration: '路径规划智能体' },
    ],
  },
]

const achievements = [
  { icon: Route, title: '路径规划智能体', earned: true, color: '#00d4ff' },
  { icon: BookOpen, title: '资源生成智能体', earned: true, color: '#3b82f6' },
  { icon: Bot, title: '辅导智能体', earned: true, color: '#7c3aed' },
  { icon: Target, title: '评估智能体', earned: false, color: '#f59e0b' },
  { icon: Lightbulb, title: '反馈智能体', earned: false, color: '#06d6a0' },
  { icon: RefreshCw, title: '画像反向更新', earned: false, color: '#f43f5e' },
]

const replanCompare: ReplanCompareData = {
  before: [
    { label: '基础概念复习', color: '#00d4ff' },
    { label: '例题训练', color: '#3b82f6' },
    { label: '综合练习', color: '#7c3aed' },
  ],
  trigger: {
    source: '阶段测评发现问题',
    issue: '"图结构理解"掌握度仅 42%',
    evidence: '连续 2 次答错，近 3 次对话均涉及节点关系问题',
    icon: 'alert',
  },
  after: [
    { label: '基础概念复习', color: '#00d4ff' },
    { label: '★ 图结构补救卡片', color: '#f43f5e' },
    { label: '★ 错题专项训练', color: '#f59e0b' },
    { label: '综合练习', color: '#7c3aed' },
  ],
}

const defaultWeeklyGoals = [
  { label: '画像更新完成', progress: 100, target: '已完成' },
  { label: '课前预习资源生成', progress: 60, target: '3 份' },
  { label: '错题分析与补救', progress: 30, target: '10 题' },
  { label: '阶段测评反馈', progress: 0, target: '进行中' },
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
  { label: '剩余任务', value: `${totalNodes.value - completedNodes.value} 项`, change: '待推进', icon: Award },
  { label: '协同智能体', value: '6 个', change: '全部就绪', icon: GitCompare },
  { label: '总体进度', value: `${totalProgress.value}%`, change: `${completedPhases.value}/${totalPhases.value} 阶段`, icon: Sparkles },
])

const aiCourses = computed(() => allCourses.filter(course => course.domain === 'ai'))

const galaxyData = computed<GalaxySceneData | undefined>(() => {
  if (phases.value.length === 0) return undefined
  return phasesToGalaxyData(phases.value)
})

const activePhaseId = ref<string | null>(null)

function onPhaseClick(phaseId: string) {
  activePhaseId.value = activePhaseId.value === phaseId ? null : phaseId
}

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

function focusPathMap() {
  galaxyPanelRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (!activePhaseId.value) {
    const currentPhase = phases.value.find(phase => phase.status === 'active') ?? phases.value[0]
    activePhaseId.value = currentPhase ? currentPhase.title : null
  }
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
  <div class="lp-layout">
    <GalaxyPanel
      ref="galaxyPanelRef"
      class="lp-galaxy"
      :galaxy-data="galaxyData"
      :active-phase-id="activePhaseId"
      :loading="isLoading"
      :empty="phases.length === 0"
      @phase-click="onPhaseClick"
    />
    <div class="lp">
    <div class="lp-hero">
      <div>
        <div class="hero-badge">学习路径</div>
        <h1 class="hero-title">六阶段<span class="gradient-text">学习闭环</span></h1>
        <p class="hero-desc">课前预习 → 课中答疑 → 课后巩固 → 阶段测评 → 期末辅导 → 成果沉淀，每步由对应智能体负责。</p>
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
      <button class="universe-btn" @click="focusPathMap">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" />
          <path d="M2 12h20" />
        </svg>
        查看路径星图
      </button>
    </div>

    <div class="course-overview">
      <div class="co-header">
        <BookOpen :size="14" stroke-width="1.5" />
        <span>多智能体协同</span>
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
        :class="['phase-card', phase.status, { 'active-focus': activePhaseId === phase.title }]"
        :style="{ '--p-color': phase.color }"
        @click="onPhaseClick(phase.title)"
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
            @click.stop="goToTutoring(phase.scenario, node.name)"
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

    <div class="replan-card">
      <div class="replan-header">
        <RefreshCw :size="20" stroke-width="1.5" class="replan-icon" />
        <h2 class="replan-title">评估后路径重规划</h2>
      </div>
      <p class="replan-intro">
        当阶段测评发现知识点掌握度低于阈值时，系统将自动触发路径重规划，
        插入补救资源，并更新学生画像以影响下一轮学习路径。
      </p>
      <PathReplanCompare :data="replanCompare" />
      <div class="replan-tip">
        <Lightbulb :size="14" stroke-width="1.5" />
        <span>评估不是终点，而是下一轮画像更新和路径优化的起点。</span>
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
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

.universe-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.12), rgba(115, 240, 208, 0.08));
  border: 1px solid rgba(122, 151, 255, 0.18);
  color: rgba(230, 238, 255, 0.85);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.universe-btn:hover {
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.2), rgba(115, 240, 208, 0.14));
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(122, 151, 255, 0.12);
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
  position: relative;
}

.phase-list::before {
  content: '';
  position: absolute;
  top: 24px;
  bottom: 24px;
  left: 56px;
  width: 1px;
  background: linear-gradient(to bottom, rgba(0, 212, 255, 0), rgba(0, 212, 255, 0.24), rgba(124, 58, 237, 0.14), rgba(0, 212, 255, 0));
  pointer-events: none;
}

.phase-card {
  padding: 24px;
  position: relative;
  overflow: hidden;
  border-left: 3px solid var(--p-color);
  transition: all 0.2s var(--ease-out);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  cursor: pointer;
}

.phase-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, color-mix(in srgb, var(--p-color) 12%, transparent), transparent 34%);
  opacity: 0;
  transition: opacity 0.25s var(--ease-out);
  pointer-events: none;
}

.phase-card.locked {
  opacity: 0.6;
}

.phase-card:not(.locked):hover {
  border-color: var(--p-color);
  transform: translateY(-2px);
  box-shadow: 0 22px 52px rgba(0, 0, 0, 0.24), 0 0 0 1px color-mix(in srgb, var(--p-color) 18%, transparent);
}

.phase-card:not(.locked):hover::before,
.phase-card.active-focus::before {
  opacity: 1;
}

.phase-card.active-focus {
  border-color: var(--p-color);
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.28), 0 0 0 1px color-mix(in srgb, var(--p-color) 30%, transparent);
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
  background: linear-gradient(90deg, var(--p-color), color-mix(in srgb, var(--p-color) 45%, #ffffff));
  box-shadow: 0 0 18px color-mix(in srgb, var(--p-color) 28%, transparent);
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
  transform: translateX(4px);
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

.lp-layout {
  display: flex;
  min-height: calc(100vh - var(--header-height));
  background:
    radial-gradient(circle at 18% 12%, rgba(0, 212, 255, 0.08), transparent 30%),
    radial-gradient(circle at 78% 8%, rgba(124, 58, 237, 0.08), transparent 28%);
}

.lp-galaxy {
  width: 420px;
  flex-shrink: 0;
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  box-shadow: 18px 0 46px rgba(0, 0, 0, 0.28);
}

.lp {
  flex: 1;
  min-width: 0;
}

@media (max-width: 1100px) {
  .lp-layout {
    flex-direction: column;
  }
  .lp-galaxy {
    width: 100%;
    height: 50vh;
    position: relative;
    top: 0;
    box-shadow: 0 18px 46px rgba(0, 0, 0, 0.24);
  }
}

.replan-card {
  padding: 0 40px;
  margin-top: 28px;
}

.replan-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.replan-icon {
  color: var(--color-accent-cyan);
}

.replan-title {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
}

.replan-intro {
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 20px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

.replan-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-top: 14px;
  border-radius: 10px;
  background: rgba(6, 214, 160, 0.06);
  border: 1px solid rgba(6, 214, 160, 0.12);
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
}

.replan-tip svg {
  color: var(--color-accent-emerald);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .replan-card {
    padding: 0 20px;
  }
}
</style>
