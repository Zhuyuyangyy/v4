<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchLearningPath } from '@/lib/api'
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
  BarChart3,
  Code,
  Layers,
  Brain,
  Activity,
  Calendar,
  ArrowRight,
  Book,
  FileText,
  Lightbulb,
  Flame,
} from 'lucide-vue-next'

const loaded = ref(false)
const isLoading = ref(false)

const phases = ref([
  {
    title: '基础夯实',
    period: '第 1-4 周',
    progress: 100,
    status: 'completed',
    color: '#00d4ff',
    nodes: [
      { name: 'Python 语言基础', progress: 100, duration: '1周', resources: 6 },
      { name: '数据结构入门', progress: 100, duration: '1.5周', resources: 4 },
      { name: '数学基础：线性代数', progress: 100, duration: '1.5周', resources: 5 },
    ],
  },
  {
    title: '核心进阶',
    period: '第 5-10 周',
    progress: 65,
    status: 'active',
    color: '#7c3aed',
    nodes: [
      { name: '机器学习概论', progress: 80, duration: '2周', resources: 8 },
      { name: '监督学习算法', progress: 60, duration: '2周', resources: 6 },
      { name: '无监督学习算法', progress: 40, duration: '1.5周', resources: 4 },
      { name: '模型评估与调优', progress: 20, duration: '1周', resources: 3 },
    ],
  },
  {
    title: '专题深入',
    period: '第 11-16 周',
    progress: 25,
    status: 'active',
    color: '#06d6a0',
    nodes: [
      { name: '深度学习基础', progress: 30, duration: '2周', resources: 7 },
      { name: '自然语言处理', progress: 20, duration: '2周', resources: 5 },
      { name: '计算机视觉', progress: 0, duration: '2周', resources: 5 },
    ],
  },
  {
    title: '实战项目',
    period: '第 17-20 周',
    progress: 0,
    status: 'locked',
    color: '#f59e0b',
    nodes: [
      { name: '综合项目实战', progress: 0, duration: '2周', resources: 3 },
      { name: '作品集构建', progress: 0, duration: '1周', resources: 2 },
      { name: '面试准备', progress: 0, duration: '1周', resources: 4 },
    ],
  },
])

const achievements = [
  { icon: Sparkles, title: '新手启程', earned: true, color: '#00d4ff' },
  { icon: Award, title: '数据达人', earned: true, color: '#7c3aed' },
  { icon: Zap, title: '持续精进', earned: true, color: '#06d6a0' },
  { icon: Target, title: '算法高手', earned: false, color: '#3b82f6' },
  { icon: BookOpen, title: '项目先锋', earned: false, color: '#f59e0b' },
  { icon: Star, title: '全栈突破', earned: false, color: '#f43f5e' },
]

const weeklyGoals = ref([
  { label: '完成 Python 基础', progress: 100, target: '1 章' },
  { label: '数据结构练习', progress: 60, target: '20 题' },
  { label: '阅读论文', progress: 30, target: '2 篇' },
  { label: '编程项目实践', progress: 0, target: '1 个' },
])

const completedPhases = computed(() => phases.value.filter(p => p.status === 'completed').length)
const totalPhases = computed(() => phases.value.length)

const totalProgress = computed(() => {
  const total = phases.value.reduce((sum, p) => sum + p.progress, 0)
  return phases.value.length ? Math.round(total / phases.value.length) : 0
})

const activePhaseCount = computed(() => phases.value.filter(p => p.status === 'active').length)
const totalNodes = computed(() => phases.value.reduce((sum, p) => sum + p.nodes.length, 0))
const completedNodes = computed(() => {
  return phases.value.reduce((sum, p) => sum + p.nodes.filter(n => n.progress === 100).length, 0)
})

const skills = [
  { name: 'Python 编程', level: 82, color: '#00d4ff', category: '语言基础', icon: Code, xp: '2,450' },
  { name: '数据结构', level: 68, color: '#3b82f6', category: '核心基础', icon: Layers, xp: '1,820' },
  { name: '机器学习', level: 55, color: '#7c3aed', category: '核心算法', icon: Brain, xp: '1,340' },
  { name: '深度学习', level: 28, color: '#06d6a0', category: '前沿技术', icon: Activity, xp: '680' },
  { name: '数学基础', level: 70, color: '#f59e0b', category: '理论支撑', icon: Book, xp: '1,560' },
  { name: '工程实践', level: 18, color: '#f43f5e', category: '实战应用', icon: BarChart3, xp: '320' },
]

const activities = [
  { day: '今天', topic: '支持向量机 (SVM)', time: '14:30 - 16:00', duration: '1.5h', type: 'course', color: '#7c3aed' },
  { day: '昨天', topic: '数据标准化与特征工程', time: '20:00 - 21:00', duration: '1h', type: 'practice', color: '#00d4ff' },
  { day: '昨天', topic: '线性代数 - 特征值分解', time: '10:00 - 10:45', duration: '45min', type: 'review', color: '#f59e0b' },
  { day: '3天前', topic: 'Python 高级特性练习', time: '15:00 - 17:00', duration: '2h', type: 'course', color: '#06d6a0' },
  { day: '5天前', topic: '论文阅读: Transformer', time: '19:00 - 19:40', duration: '40min', type: 'reading', color: '#3b82f6' },
]

const activityTypeLabels: Record<string, string> = {
  course: '课程',
  practice: '练习',
  review: '复习',
  reading: '阅读',
}

const timeDist = [
  { label: '机器学习', hours: 5, pct: 38, color: '#7c3aed' },
  { label: 'Python', hours: 3, pct: 23, color: '#00d4ff' },
  { label: '数学', hours: 2.5, pct: 19, color: '#f59e0b' },
  { label: '项目实践', hours: 1.5, pct: 12, color: '#06d6a0' },
  { label: '论文阅读', hours: 1, pct: 8, color: '#3b82f6' },
]

const recommendations = [
  {
    title: '监督学习 - 决策树',
    desc: '继续当前章节学习，完成剩余 40% 内容进入下一阶段',
    tag: '继续学习',
    tagColor: '#7c3aed',
    duration: '约 2 小时',
    type: 'course',
  },
  {
    title: 'Kaggle 入门竞赛',
    desc: '通过实战巩固分类算法知识，积累项目经验',
    tag: '推荐项目',
    tagColor: '#06d6a0',
    duration: '约 4 小时',
    type: 'project',
  },
  {
    title: '模型评估指标复习',
    desc: '为即将到来的调优阶段做好知识储备',
    tag: '预习准备',
    tagColor: '#00d4ff',
    duration: '约 1 小时',
    type: 'review',
  },
]

const maxHours = computed(() => Math.max(...timeDist.map(t => t.hours)))

onMounted(() => {
  isLoading.value = true
  setTimeout(() => { loaded.value = true }, 100)
  fetchLearningPath()
    .then(data => {
      phases.value = data.phases
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
    <!-- ================== Hero ================== -->
    <div class="lp-hero">
      <div>
        <div class="hero-badge">学习路径</div>
        <h1 class="hero-title">个性化<span class="gradient-text">学习路线</span></h1>
        <p class="hero-desc">AI 为你量身定制的学习路径，稳步达成学习目标</p>
        <p v-if="isLoading" class="page-status">正在同步学习路径...</p>
      </div>
      <div class="hero-progress">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3" />
          <circle cx="28" cy="28" r="24" fill="none" stroke="url(#hpGrad)" stroke-width="3" stroke-linecap="round"
            :stroke-dasharray="150.8" :stroke-dashoffset="loaded ? 150.8 * (1 - totalProgress / 100) : 150.8"
            transform="rotate(-90 28 28)" class="progress-arc" />
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

    <!-- ================== Quick Stats ================== -->
    <div class="quick-stats">
      <div class="qs-card">
        <div class="qs-icon" style="background: rgba(0,212,255,0.1); color: #00d4ff;">
          <Award :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">12.5h</span>
          <span class="qs-label">本周学习</span>
        </div>
        <span class="qs-change up">+15%</span>
      </div>
      <div class="qs-card">
        <div class="qs-icon" style="background: rgba(124,58,237,0.1); color: #7c3aed;">
          <CheckCircle2 :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">{{ completedNodes }}/{{ totalNodes }}</span>
          <span class="qs-label">完成节点</span>
        </div>
        <span class="qs-change">{{ activePhaseCount }} 阶段进行中</span>
      </div>
      <div class="qs-card">
        <div class="qs-icon" style="background: rgba(6,214,160,0.1); color: #06d6a0;">
          <Flame :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">23天</span>
          <span class="qs-label">连续学习</span>
        </div>
        <span class="qs-change up">+3天</span>
      </div>
      <div class="qs-card">
        <div class="qs-icon" style="background: rgba(245,158,11,0.1); color: #f59e0b;">
          <Target :size="18" stroke-width="1.5" />
        </div>
        <div class="qs-body">
          <span class="qs-value">{{ completedPhases }}/{{ totalPhases }}</span>
          <span class="qs-label">阶段完成</span>
        </div>
        <span class="qs-change">剩余 12 周</span>
      </div>
    </div>

    <!-- ================== Skill Mastery ================== -->
    <section class="section">
      <div class="section-head">
        <div class="section-head-left">
          <Brain :size="18" stroke-width="1.5" class="section-icon" />
          <h2 class="section-title">技能掌握</h2>
        </div>
        <span class="section-badge">6 项技能</span>
      </div>
      <div class="skill-grid">
        <div v-for="s in skills" :key="s.name" class="skill-card" :style="{ '--s-color': s.color }">
          <div class="skill-top">
            <div class="skill-icon-wrap">
              <component :is="s.icon" :size="16" stroke-width="1.5" />
            </div>
            <span class="skill-category">{{ s.category }}</span>
          </div>
          <span class="skill-name">{{ s.name }}</span>
          <div class="skill-bar-track">
            <div
              class="skill-bar-fill"
              :style="{ width: loaded ? s.level + '%' : '0%' }"
            />
          </div>
          <div class="skill-meta">
            <span class="skill-level">{{ s.level }}%</span>
            <span class="skill-xp">{{ s.xp }} XP</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================== Phase Timeline ================== -->
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
                <div class="node-tags">
                  <span class="node-duration">
                    <Clock :size="11" stroke-width="1.5" />
                    {{ node.duration }}
                  </span>
                  <span v-if="node.resources" class="node-resources">
                    <Book :size="11" stroke-width="1.5" />
                    {{ node.resources }} 资源
                  </span>
                </div>
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

    <!-- ================== Bottom: Activity + Recommendations ================== -->
    <div class="bottom-duo">
      <!-- Study Activity -->
      <section class="card">
        <div class="card-head">
          <div class="card-head-left">
            <Activity :size="16" stroke-width="1.5" class="card-head-icon" />
            <h2 class="card-title-sm">学习动态</h2>
          </div>
          <span class="card-badge">最近 5 天</span>
        </div>
        <div class="activity-timeline">
          <div v-for="(a, i) in activities" :key="i" class="activity-item">
            <div class="activity-dot-wrap">
              <div class="activity-dot" :style="{ background: a.color }" />
              <div v-if="i < activities.length - 1" class="activity-line" />
            </div>
            <div class="activity-body">
              <div class="activity-head">
                <span class="activity-topic">{{ a.topic }}</span>
                <span class="activity-duration">{{ a.duration }}</span>
              </div>
              <div class="activity-foot">
                <span class="activity-day">{{ a.day }}</span>
                <span class="activity-type" :style="{ color: a.color }">{{ activityTypeLabels[a.type] || a.type }}</span>
                <span class="activity-time">{{ a.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Time Distribution -->
      <section class="card">
        <div class="card-head">
          <div class="card-head-left">
            <BarChart3 :size="16" stroke-width="1.5" class="card-head-icon" />
            <h2 class="card-title-sm">本周分布</h2>
          </div>
          <span class="card-badge">13 h</span>
        </div>
        <div class="dist-list">
          <div v-for="d in timeDist" :key="d.label" class="dist-item">
            <div class="dist-head">
              <span class="dist-label">{{ d.label }}</span>
              <span class="dist-hours">{{ d.hours }}h</span>
            </div>
            <div class="dist-track">
              <div
                class="dist-fill"
                :style="{
                  width: loaded ? d.pct + '%' : '0%',
                  background: d.color,
                }"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ================== Bottom Grid ================== -->
    <div class="bottom-grid">
      <!-- Weekly Goals -->
      <div class="card">
        <div class="card-head">
          <div class="card-head-left">
            <Target :size="16" stroke-width="1.5" class="card-head-icon" />
            <h2 class="card-title-sm">本周目标</h2>
          </div>
          <span class="card-badge">{{ weeklyGoals.filter(g => g.progress === 100).length }}/{{ weeklyGoals.length }}</span>
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

      <!-- Recommendations -->
      <div class="card">
        <div class="card-head">
          <div class="card-head-left">
            <Lightbulb :size="16" stroke-width="1.5" class="card-head-icon" />
            <h2 class="card-title-sm">推荐学习</h2>
          </div>
          <span class="card-badge">AI 推荐</span>
        </div>
        <div class="rec-list">
          <div v-for="r in recommendations" :key="r.title" class="rec-item">
            <div class="rec-head">
              <span class="rec-title">{{ r.title }}</span>
              <span class="rec-duration">{{ r.duration }}</span>
            </div>
            <p class="rec-desc">{{ r.desc }}</p>
            <div class="rec-foot">
              <span class="rec-tag" :style="{ background: r.tagColor + '18', color: r.tagColor, borderColor: r.tagColor + '30' }">
                {{ r.tag }}
              </span>
              <button class="rec-btn">
                去学习
                <ChevronRight :size="14" stroke-width="2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Milestones -->
      <div class="card">
        <div class="card-head">
          <div class="card-head-left">
            <Star :size="16" stroke-width="1.5" class="card-head-icon" />
            <h2 class="card-title-sm">里程碑</h2>
          </div>
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

.page-status {
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-accent-cyan);
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
  flex-shrink: 0;
}

.qs-body { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.qs-value { font-family: var(--font-display); font-size: 18px; color: #fff; line-height: 1; }
.qs-label { font-size: 11px; color: var(--color-text-tertiary); }
.qs-change { font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); white-space: nowrap; }
.qs-change.up { color: var(--color-accent-emerald); }

/* ====================== Section Shared ====================== */
.section {
  padding: 0 40px;
  margin-bottom: 28px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-head-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: #fff;
}

.section-badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

/* ====================== Skill Mastery ====================== */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.skill-card {
  padding: 18px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--s-color);
  transition: all 0.25s var(--ease-out);
}
.skill-card:hover {
  border-color: var(--s-color);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.skill-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.skill-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--s-color) 12%, transparent);
  color: var(--s-color);
  flex-shrink: 0;
}

.skill-category {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.skill-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
}

.skill-bar-track {
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  margin-bottom: 8px;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--s-color);
  transition: width 0.8s var(--ease-out);
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--s-color);
}

.skill-xp {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

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
  flex: 1;
  min-width: 0;
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

.node-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.node-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.node-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.node-duration,
.node-resources {
  display: inline-flex;
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
  flex-shrink: 0;
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

/* ====================== Bottom Duo (Activity + Distribution) ====================== */
.bottom-duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0 40px;
  margin-bottom: 28px;
}

/* ====================== Card Shared ====================== */
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
  margin-bottom: 18px;
}

.card-head-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-head-icon {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
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
  white-space: nowrap;
}

/* ====================== Activity Timeline ====================== */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding-bottom: 4px;
}

.activity-dot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
  padding-top: 4px;
}

.activity-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px color-mix(in srgb, currentColor 30%, transparent);
}

.activity-line {
  width: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  margin-top: 4px;
}

.activity-body {
  flex: 1;
  padding-bottom: 16px;
  min-width: 0;
}

.activity-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.activity-topic {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.activity-duration {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-accent-cyan);
  white-space: nowrap;
  flex-shrink: 0;
}

.activity-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.activity-day {
  font-weight: 500;
}

.activity-type {
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  font-weight: 500;
}

.activity-time {
  color: var(--color-text-tertiary);
}

/* ====================== Time Distribution ====================== */
.dist-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dist-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dist-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dist-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.dist-hours {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
}

.dist-track {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.dist-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s var(--ease-out);
}

/* ====================== Bottom Grid ====================== */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 0 40px 40px;
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

/* Recommendations */
.rec-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rec-item {
  padding: 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}
.rec-item:hover {
  border-color: rgba(0, 212, 255, 0.1);
  background: rgba(0, 212, 255, 0.03);
}

.rec-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.rec-title {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.rec-duration {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

.rec-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-bottom: 8px;
}

.rec-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.rec-tag {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 100px;
  border: 1px solid;
}

.rec-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent-cyan);
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.08);
  transition: all 0.2s var(--ease-out);
}
.rec-btn:hover {
  background: rgba(0, 212, 255, 0.15);
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
.milestone-item.earned {
  border-color: color-mix(in srgb, var(--m-color) 30%, transparent);
  color: var(--color-text-primary);
}
.milestone-item:not(.earned) { opacity: 0.5; }
.milestone-item:hover { border-color: var(--m-color); }

.milestone-icon { color: var(--m-color); flex-shrink: 0; }
.milestone-locked { opacity: 0.3; font-size: 14px; }
.milestone-name { font-weight: 500; }

/* ====================== Responsive ====================== */
@media (max-width: 1100px) {
  .skill-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .lp-hero { padding: 32px 20px 24px; }
  .quick-stats { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
  .section { padding: 0 20px; }
  .phase-list { padding: 0 20px; }
  .bottom-duo { padding: 0 20px; grid-template-columns: 1fr; }
  .bottom-grid {
    padding: 0 20px 32px;
    grid-template-columns: 1fr;
  }
  .skill-grid { grid-template-columns: 1fr; }
  .milestone-grid { grid-template-columns: 1fr; }
  .node-right { width: 100px; }
}
</style>
