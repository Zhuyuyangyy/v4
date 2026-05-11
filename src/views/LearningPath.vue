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
  Route,
  CheckCircle2,
  Clock,
  ChevronRight,
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
  { icon: Sparkles, title: '新手启程', earned: true, color: '#00d4ff' },
  { icon: Award, title: '数据达人', earned: true, color: '#7c3aed' },
  { icon: Zap, title: '持续精进', earned: true, color: '#06d6a0' },
  { icon: Target, title: '算法高手', earned: false, color: '#3b82f6' },
  { icon: BookOpen, title: '项目先锋', earned: false, color: '#f59e0b' },
  { icon: Star, title: '全栈突破', earned: false, color: '#f43f5e' },
]

const weeklyGoals = [
  { label: '完成 Python 基础', progress: 100, target: '1 章' },
  { label: '数据结构练习', progress: 60, target: '20 题' },
  { label: '阅读论文', progress: 30, target: '2 篇' },
  { label: '编程项目实践', progress: 0, target: '1 个' },
]

const learningStats = [
  { label: '本周学习', value: '12.5h', change: '+15%', icon: Award },
  { label: '完成节点', value: '4/6', change: '进行中', icon: GitCompare },
  { label: '总天数', value: '67天', change: '23天连续', icon: Sparkles },
]

const completedPhases = phases.filter(p => p.status === 'completed').length
const totalPhases = phases.length

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
})
</script>

<template>
  <div class="lp">
    <!-- Hero -->
    <div class="lp-hero">
      <div>
        <div class="hero-badge">学习路径</div>
        <h1 class="hero-title">个性化<span class="gradient-text">学习路线</span></h1>
        <p class="hero-desc">AI 为你量身定制的学习路径，稳步达成学习目标</p>
      </div>
      <div class="hero-progress">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3" />
          <circle cx="28" cy="28" r="24" fill="none" stroke="url(#hpGrad)" stroke-width="3" stroke-linecap="round"
            :stroke-dasharray="150.8" :stroke-dashoffset="loaded ? 150.8 * 0.53 : 150.8"
            transform="rotate(-90 28 28)" class="progress-arc" />
          <defs>
            <linearGradient id="hpGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#00d4ff" /><stop offset="100%" stop-color="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div class="hp-center">
          <span class="hp-pct">47%</span>
          <span class="hp-lbl">总进度</span>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div v-for="s in learningStats" :key="s.label" class="qs-card">
        <div class="qs-icon">
          <component :is="s.icon" :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">{{ s.value }}</span>
          <span class="qs-label">{{ s.label }}</span>
        </div>
        <span :class="['qs-change', { up: s.change.startsWith('+') }]">{{ s.change }}</span>
      </div>
      <div class="qs-card qs-summary">
        <div class="qs-summary-inner">
          <span>{{ completedPhases }}/{{ totalPhases }} 阶段完成</span>
          <span class="qs-remain">剩余 12 周</span>
        </div>
      </div>
    </div>

    <!-- Phase Timeline -->
    <div class="phase-list">
      <div
        v-for="(phase, pIdx) in phases"
        :key="phase.title"
        :class="['phase-card', phase.status]"
        :style="{ '--p-color': phase.color }"
      >
        <div class="phase-top">
          <div class="phase-info">
            <div :class="['phase-badge', phase.status]">
              {{ phase.status === 'completed' ? '✓' : phase.status === 'active' ? (pIdx + 1) : '○' }}
            </div>
            <div>
              <h2 class="phase-title">{{ phase.title }}</h2>
              <span class="phase-period">{{ phase.period }}</span>
            </div>
          </div>
          <div class="phase-meta">
            <span class="phase-pct">{{ phase.progress > 0 ? phase.progress + '%' : '未开始' }}</span>
            <span :class="['phase-tag', phase.status]">
              {{ phase.status === 'completed' ? '已完成' : phase.status === 'active' ? '进行中' : '已锁定' }}
            </span>
          </div>
        </div>

        <div class="phase-progress-bar">
          <div class="phase-progress-fill" :style="{ width: loaded ? phase.progress + '%' : '0%' }" />
        </div>

        <div class="phase-nodes">
          <div v-for="(node, nIdx) in phase.nodes" :key="node.name" class="node-card">
            <div class="node-left">
              <div :class="['node-check', { done: node.progress === 100 }]">
                {{ node.progress === 100 ? '✓' : pIdx * 10 + nIdx + 1 }}
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
                    width: loaded ? node.progress + '%' : '0%',
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

    <!-- Bottom Grid -->
    <div class="bottom-grid">
      <!-- Weekly Goals -->
      <div class="card">
        <div class="card-head">
          <h2 class="card-title-sm">本周目标</h2>
          <span class="card-badge">4 个目标</span>
        </div>
        <div class="goal-list">
          <div v-for="g in weeklyGoals" :key="g.label" class="goal-item">
            <div class="goal-top">
              <span class="goal-label">{{ g.label }}</span>
              <span class="goal-target">{{ g.target }}</span>
            </div>
            <div class="goal-track">
              <div class="goal-fill" :style="{ width: loaded ? g.progress + '%' : '0%' }" />
            </div>
            <span class="goal-pct">{{ g.progress }}%</span>
          </div>
        </div>
      </div>

      <!-- Milestones -->
      <div class="card">
        <div class="card-head">
          <h2 class="card-title-sm">里程碑</h2>
          <span class="card-badge">{{ achievements.filter(a => a.earned).length }}/6</span>
        </div>
        <div class="milestone-grid">
          <div
            v-for="a in achievements"
            :key="a.title"
            :class="['milestone-item', { earned: a.earned }]"
            :style="{ '--m-color': a.color }"
          >
            <component :is="a.icon" v-if="a.earned" :size="16" stroke-width="1.5" class="milestone-icon" />
            <span v-else class="milestone-locked">○</span>
            <span class="milestone-name">{{ a.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lp {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ====================== Hero ====================== */
.lp-hero {
  padding: 48px 40px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
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

.hero-progress {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.progress-arc {
  transition: stroke-dashoffset 0.8s var(--ease-out);
}

.hp-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hp-pct { font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: #fff; line-height: 1; }
.hp-lbl { font-size: 8px; color: var(--color-text-tertiary); margin-top: 1px; }

/* ====================== Quick Stats ====================== */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0 40px;
  margin-bottom: 28px;
}

.qs-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all 0.2s var(--ease-out);
}
.qs-card:hover { border-color: var(--color-accent-cyan); }

.qs-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(0, 212, 255, 0.1);
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.qs-body { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.qs-value { font-family: var(--font-display); font-size: 18px; color: #fff; line-height: 1; }
.qs-label { font-size: 11px; color: var(--color-text-tertiary); }
.qs-change { font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); }
.qs-change.up { color: var(--color-accent-emerald); }

.qs-summary { justify-content: center; }

.qs-summary-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.qs-remain { font-size: 11px; color: var(--color-text-tertiary); }

/* ====================== Phase Timeline ====================== */
.phase-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 40px;
  margin-bottom: 28px;
}

.phase-card {
  padding: 24px;
  border-radius: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--p-color);
  transition: all 0.3s var(--ease-out);
}
.phase-card.locked { opacity: 0.55; }
.phase-card:not(.locked):hover {
  border-color: var(--p-color);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.phase-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.phase-info { display: flex; align-items: center; gap: 14px; }

.phase-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.phase-badge.completed { background: var(--color-accent-emerald); color: #fff; }
.phase-badge.active { background: var(--p-color); color: #fff; box-shadow: 0 0 16px color-mix(in srgb, var(--p-color) 40%, transparent); }
.phase-badge.locked { background: rgba(255, 255, 255, 0.06); color: var(--color-text-tertiary); }

.phase-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.phase-period {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.phase-meta { display: flex; align-items: center; gap: 10px; }

.phase-pct {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.phase-tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  font-weight: 500;
}
.phase-tag.completed { background: rgba(6,214,160,0.1); color: var(--color-accent-emerald); }
.phase-tag.active { background: color-mix(in srgb, var(--p-color) 12%, transparent); color: var(--p-color); }
.phase-tag.locked { background: rgba(255,255,255,0.04); color: var(--color-text-tertiary); }

/* Phase Progress */
.phase-progress-bar {
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  margin-bottom: 18px;
}

.phase-progress-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--p-color);
  transition: width 0.6s var(--ease-out);
}

/* Nodes */
.phase-nodes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.node-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}
.node-card:hover {
  border-color: color-mix(in srgb, var(--p-color) 15%, transparent);
  background: color-mix(in srgb, var(--p-color) 3%, transparent);
}

.node-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.node-check {
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
.node-check.done { background: rgba(6, 214, 160, 0.15); color: var(--color-accent-emerald); }

.node-info { display: flex; align-items: center; gap: 8px; }

.node-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.node-duration {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.node-right {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 140px;
}

.node-track {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.node-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s var(--ease-out);
}

.node-pct {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  width: 32px;
  text-align: right;
}

/* ====================== Bottom Grid ====================== */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0 40px 40px;
}

.card {
  padding: 24px;
  border-radius: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: border-color 0.2s var(--ease-out);
}
.card:hover { border-color: rgba(0, 212, 255, 0.1); }

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-title-sm {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

.card-badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

/* Goals */
.goal-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.goal-item { display: flex; flex-direction: column; gap: 4px; }

.goal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goal-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.goal-target {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.goal-track {
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.goal-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-blue));
  transition: width 0.6s var(--ease-out);
}

.goal-pct {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-accent-cyan);
  width: 100%;
  text-align: right;
}

/* Milestones */
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
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}
.milestone-item.earned { border-color: color-mix(in srgb, var(--m-color) 30%, transparent); color: var(--color-text-primary); }
.milestone-item:not(.earned) { opacity: 0.5; }
.milestone-item:hover { border-color: var(--m-color); }

.milestone-icon { color: var(--m-color); flex-shrink: 0; }
.milestone-locked { opacity: 0.3; font-size: 14px; }
.milestone-name { font-weight: 500; }

/* ====================== Responsive ====================== */
@media (max-width: 900px) {
  .lp-hero { padding: 32px 20px 24px; }
  .quick-stats { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
  .phase-list { padding: 0 20px; }
  .bottom-grid { padding: 0 20px 32px; grid-template-columns: 1fr; }
  .milestone-grid { grid-template-columns: 1fr; }
  .node-right { width: 100px; }
}
</style>
