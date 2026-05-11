<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Sparkles,
  Award,
  TrendingUp,
  LayoutGrid,
  Target,
  Zap,
  BookOpen,
  Star,
  GitCompare,
} from 'lucide-vue-next'

const loaded = ref(false)

const phases = [
  {
    title: '基础夯实',
    period: '第 1-4 周',
    progress: 100,
    status: 'completed',
    color: '#00d4ff',
    nodes: [
      { name: 'Python 语言基础', progress: 100, duration: '1周' },
      { name: '数据结构入门', progress: 100, duration: '1.5周' },
      { name: '数学基础：线性代数', progress: 100, duration: '1.5周' },
    ],
  },
  {
    title: '核心进阶',
    period: '第 5-10 周',
    progress: 65,
    status: 'active',
    color: '#7c3aed',
    nodes: [
      { name: '机器学习概论', progress: 80, duration: '2周' },
      { name: '监督学习算法', progress: 60, duration: '2周' },
      { name: '无监督学习算法', progress: 40, duration: '1.5周' },
      { name: '模型评估与调优', progress: 20, duration: '1周' },
    ],
  },
  {
    title: '专题深入',
    period: '第 11-16 周',
    progress: 25,
    status: 'active',
    color: '#06d6a0',
    nodes: [
      { name: '深度学习基础', progress: 30, duration: '2周' },
      { name: '自然语言处理', progress: 20, duration: '2周' },
      { name: '计算机视觉', progress: 0, duration: '2周' },
    ],
  },
  {
    title: '实战项目',
    period: '第 17-20 周',
    progress: 0,
    status: 'locked',
    color: '#f59e0b',
    nodes: [
      { name: '综合项目实战', progress: 0, duration: '2周' },
      { name: '作品集构建', progress: 0, duration: '1周' },
      { name: '面试准备', progress: 0, duration: '1周' },
    ],
  },
]

const achievements = [
  { icon: Sparkles, title: '新手启程', desc: '完成第一个学习阶段', earned: true, color: '#00d4ff' },
  { icon: Award, title: '数据达人', desc: '掌握 3 种数据可视化工具', earned: true, color: '#7c3aed' },
  { icon: Zap, title: '持续精进', desc: '连续学习 7 天', earned: true, color: '#06d6a0' },
  { icon: Target, title: '算法高手', desc: '完成数据结构课程', earned: false, color: '#3b82f6' },
  { icon: BookOpen, title: '项目先锋', desc: '完成第一个实战项目', earned: false, color: '#f59e0b' },
  { icon: Star, title: '全栈突破', desc: '完成全部学习路径', earned: false, color: '#f43f5e' },
]

const weeklyGoals = [
  { label: '完成 Python 基础', progress: 100, target: '1 章' },
  { label: '数据结构练习', progress: 60, target: '20 题' },
  { label: '阅读论文', progress: 30, target: '2 篇' },
  { label: '编程项目实践', progress: 0, target: '1 个' },
]

const learningStats = [
  { label: '本周学习时长', value: '12.5h', change: '+15%', icon: Award },
  { label: '本周完成节点', value: '4/6', change: '进行中', icon: GitCompare },
  { label: '总学习天数', value: '67天', change: '23天连续', icon: Sparkles },
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})
</script>

<template>
  <div class="learning-path">
    <div class="page-header reveal">
      <h1 class="page-title">学习路径</h1>
      <p class="page-desc">个性化定制的学习路线，动态调整，稳步推进</p>
    </div>

    <!-- Overall Progress + Stats -->
    <div class="path-top reveal reveal-delay-1">
      <div :class="['overall-progress', { visible: loaded }]">
        <div class="progress-stat">
          <div class="progress-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6" />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="url(#progressGrad)"
                stroke-width="6"
                stroke-linecap="round"
                :stroke-dasharray="264"
                :stroke-dashoffset="loaded ? 264 * 0.53 : 264"
                transform="rotate(-90 50 50)"
                class="progress-arc"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#00d4ff" />
                  <stop offset="100%" stop-color="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <div class="progress-center">
              <span class="progress-value">47%</span>
              <span class="progress-label">总体完成</span>
            </div>
          </div>
          <div class="progress-details">
            <div class="progress-detail-item">
              <span class="detail-label">已完成</span>
              <span class="detail-value">7 / 15</span>
              <span class="detail-unit">个阶段</span>
            </div>
            <div class="progress-detail-item">
              <span class="detail-label">剩余</span>
              <span class="detail-value">12</span>
              <span class="detail-unit">周</span>
            </div>
            <div class="progress-detail-item">
              <span class="detail-label">预计完成</span>
              <span class="detail-value">2026-08</span>
              <span class="detail-unit"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Stats -->
      <div class="learning-stats">
        <div v-for="s in learningStats" :key="s.label" class="stat-card">
          <component :is="s.icon" :size="22" stroke-width="1.5" class="stat-icon" />
          <div class="stat-body">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-change" v-if="s.change.startsWith('+')">{{ s.change }}</span>
            <span class="stat-change neutral" v-else>{{ s.change }}</span>
          </div>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- Milestones -->
    <div class="milestones-section reveal reveal-delay-2">
      <h2 class="section-title">
        <Sparkles :size="18" stroke-width="1.5" class="section-accent" style="color: var(--color-accent-cyan);" />
        里程碑
      </h2>
      <div class="milestones-grid">
        <div
          v-for="a in achievements"
          :key="a.title"
          :class="['milestone-card', { earned: a.earned }]"
          :style="{ '--m-color': a.color }"
        >
          <component :is="a.icon" :size="22" stroke-width="1.5" class="milestone-icon" :style="{ color: a.color }" />
          <div class="milestone-body">
            <span class="milestone-title">{{ a.title }}</span>
            <span class="milestone-desc">{{ a.desc }}</span>
          </div>
          <span class="milestone-status">{{ a.earned ? '✓' : '🔒' }}</span>
        </div>
      </div>
    </div>

    <!-- Weekly Goals -->
    <div class="weekly-section reveal reveal-delay-3">
      <h2 class="section-title">
        <TrendingUp :size="18" stroke-width="1.5" class="section-accent" style="color: var(--color-accent-cyan);" />
        本周目标
      </h2>
      <div class="weekly-goals">
        <div v-for="g in weeklyGoals" :key="g.label" class="goal-card">
          <div class="goal-header">
            <span class="goal-label">{{ g.label }}</span>
            <span class="goal-target">{{ g.target }}</span>
          </div>
          <div class="goal-bar">
            <div class="goal-bar-fill" :style="{ width: loaded ? g.progress + '%' : '0%' }" />
          </div>
          <span class="goal-progress">{{ g.progress }}%</span>
        </div>
      </div>
    </div>

    <!-- Phases Timeline -->
    <h2 class="section-title reveal reveal-delay-4">
      <LayoutGrid :size="18" stroke-width="1.5" class="section-accent" style="color: var(--color-accent-cyan);" />
      阶段路线
    </h2>
    <div class="path-timeline">
      <div
        v-for="(phase, pIdx) in phases"
        :key="phase.title"
        :class="['phase-block reveal', `reveal-delay-${pIdx + 4}`, phase.status]"
        :style="{ '--phase-color': phase.color }"
      >
        <div class="phase-header">
          <div class="phase-info">
            <span :class="['phase-badge', phase.status]">
              {{ phase.status === 'completed' ? '✓' : phase.status === 'active' ? '●' : '○' }}
            </span>
            <h2 class="phase-title">{{ phase.title }}</h2>
            <span class="phase-period">{{ phase.period }}</span>
          </div>
          <div class="phase-progress-info">
            <span class="phase-progress-text">{{ phase.progress > 0 ? phase.progress + '%' : '未开始' }}</span>
            <span :class="['phase-status-tag', phase.status]">
              {{ phase.status === 'completed' ? '已完成' : phase.status === 'active' ? '进行中' : '锁定' }}
            </span>
          </div>
        </div>

        <div class="phase-bar">
          <div class="phase-bar-fill" :style="{ width: loaded ? phase.progress + '%' : '0%' }" />
        </div>

        <div class="phase-nodes">
          <div v-for="(node, nIdx) in phase.nodes" :key="node.name" class="node-item">
            <div class="node-info">
              <span class="node-index" :class="{ done: node.progress === 100 }">
                {{ node.progress === 100 ? '✓' : pIdx * 10 + nIdx + 1 }}
              </span>
              <span class="node-name">{{ node.name }}</span>
              <span class="node-duration">{{ node.duration }}</span>
            </div>
            <div class="node-progress">
              <div class="node-bar">
                <div class="node-bar-fill" :style="{ width: loaded ? node.progress + '%' : '0%', background: node.progress === 100 ? 'var(--color-accent-emerald)' : 'var(--phase-color)' }" />
              </div>
              <span class="node-progress-text">{{ node.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-path {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #fff;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* === Section Title === */
.section-title {
  font-family: var(--font-display);
  font-size: 26px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.section-accent {
  color: var(--color-accent-cyan);
  font-size: 18px;
}

/* === Path Top === */
.path-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

/* === Overall Progress === */
.overall-progress {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.progress-stat {
  display: flex;
  align-items: center;
  gap: 32px;
}

.progress-circle {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
}

.progress-arc {
  transition: stroke-dashoffset 1.5s var(--ease-out);
}

.progress-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-value {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  color: #fff;
}

.progress-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.progress-details {
  display: flex;
  gap: 24px;
}

.progress-detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.detail-value {
  font-size: 22px;
  font-family: var(--font-display);
  color: #fff;
  line-height: 1;
}

.detail-unit {
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* === Learning Stats === */
.learning-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
}
.stat-card:hover {
  border-color: rgba(0, 212, 255, 0.15);
  transform: translateX(4px);
}

.stat-icon {
  font-size: 24px;
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.stat-body {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 22px;
  color: #fff;
  line-height: 1;
}

.stat-change {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-accent-emerald);
}
.stat-change.neutral {
  color: var(--color-accent-cyan);
}

.stat-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* === Milestones === */
.milestones-section {
  margin-bottom: 40px;
}

.milestones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.milestone-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
}
.milestone-card.earned {
  border-color: rgba(0, 212, 255, 0.15);
}
.milestone-card:not(.earned) {
  opacity: 0.5;
}

.milestone-icon {
  font-size: 24px;
  color: var(--m-color);
  flex-shrink: 0;
}

.milestone-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.milestone-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.milestone-desc {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.milestone-status {
  font-size: 14px;
  opacity: 0.5;
}

/* === Weekly Goals === */
.weekly-section {
  margin-bottom: 40px;
}

.weekly-goals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.goal-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
}
.goal-card:hover {
  border-color: rgba(0, 212, 255, 0.15);
}

.goal-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.goal-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.goal-target {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.goal-bar {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.goal-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-blue));
  transition: width 1s var(--ease-out);
}

.goal-progress {
  font-size: 14px;
  font-family: var(--font-mono);
  color: var(--color-accent-cyan);
  width: 40px;
  text-align: right;
}

/* === Timeline === */
.path-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phase-block {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--phase-color);
  transition: all var(--duration-normal) var(--ease-out);
}
.phase-block:hover {
  border-color: var(--phase-color);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
.phase-block.locked {
  opacity: 0.45;
}
.phase-block.locked:hover {
  opacity: 0.7;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.phase-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}
.phase-badge.completed {
  background: var(--color-accent-emerald);
  color: #fff;
}
.phase-badge.active {
  background: var(--phase-color);
  color: #fff;
  box-shadow: 0 0 12px var(--phase-color);
  animation: glow-pulse 2s ease-in-out infinite;
}
.phase-badge.locked {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text-tertiary);
}

.phase-title {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: -0.01em;
  color: #fff;
}

.phase-period {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.phase-progress-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phase-progress-text {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-secondary);
}

.phase-status-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  font-weight: 500;
}
.phase-status-tag.completed {
  background: rgba(6, 214, 160, 0.1);
  color: var(--color-accent-emerald);
}
.phase-status-tag.active {
  background: rgba(0, 212, 255, 0.1);
  color: var(--color-accent-cyan);
}
.phase-status-tag.locked {
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-tertiary);
}

.phase-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  margin-bottom: 20px;
}

.phase-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--phase-color);
  transition: width 1s var(--ease-out);
}

.phase-nodes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  transition: background var(--duration-fast) var(--ease-out);
}
.node-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.node-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.node-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.node-index.done {
  background: rgba(6, 214, 160, 0.15);
  color: var(--color-accent-emerald);
}

.node-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.node-duration {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.node-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 160px;
}

.node-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.node-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s var(--ease-out);
}

.node-progress-text {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  width: 36px;
  text-align: right;
}

@media (max-width: 900px) {
  .path-top { grid-template-columns: 1fr; }
  .milestones-grid { grid-template-columns: 1fr; }
  .weekly-goals { grid-template-columns: 1fr; }
  .progress-stat { flex-direction: column; align-items: flex-start; }
  .progress-details { width: 100%; justify-content: space-between; }
}
</style>
