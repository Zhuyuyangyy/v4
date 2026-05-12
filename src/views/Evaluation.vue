<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchEvaluation } from '@/lib/api'
import {
  Clock,
  PenTool,
  Target,
  TrendingUp,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  Star,
  BarChart3,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
  Brain,
  Download,
  FileBarChart,
} from 'lucide-vue-next'

const loaded = ref(false)
const isLoading = ref(false)
const showReportModal = ref(false)
const reportDate = ref('2026-05-11')

const stats = ref([
  { label: '学习时长', value: '128h', change: '+12h', icon: Clock, color: '#00d4ff' },
  { label: '完成课时', value: '47', change: '+5', icon: PenTool, color: '#7c3aed' },
  { label: '平均正确率', value: '82%', change: '+3%', icon: Target, color: '#06d6a0' },
  { label: '知识掌握度', value: '68%', change: '+8%', icon: TrendingUp, color: '#f59e0b' },
])

const weeklyData = [45, 52, 38, 65, 70, 55, 80]
const peerAvg = [42, 48, 40, 52, 55, 50, 58]
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const subjects = [
  { name: 'Python 基础', mastery: 92, color: '#00d4ff' },
  { name: '数据结构', mastery: 75, color: '#3b82f6' },
  { name: '机器学习', mastery: 60, color: '#7c3aed' },
  { name: '深度学习', mastery: 45, color: '#06d6a0' },
  { name: '数学基础', mastery: 70, color: '#f59e0b' },
  { name: '算法设计', mastery: 55, color: '#f43f5e' },
]

const weeklyTrend = [
  { week: 'W1', you: 55, avg: 50 },
  { week: 'W2', you: 58, avg: 52 },
  { week: 'W3', you: 62, avg: 54 },
  { week: 'W4', you: 68, avg: 55 },
  { week: 'W5', you: 65, avg: 56 },
  { week: 'W6', you: 72, avg: 58 },
  { week: 'W7', you: 78, avg: 60 },
]

const suggestions = ref([
  { text: '概率论与数理统计是你的薄弱环节，建议安排 2 小时专项复习', type: 'weakness' as const, icon: AlertTriangle },
  { text: '机器学习基础掌握良好，可以开始学习进阶内容', type: 'strength' as const, icon: Sparkles },
  { text: '本周学习时长较上周增加 15%，保持良好的学习节奏', type: 'positive' as const, icon: ArrowUp },
  { text: '建议增加编程实践时间，理论与实践比例建议 1:1', type: 'action' as const, icon: ArrowRight },
])

const badges = [
  { icon: Sparkles, name: '初识学习', earned: true, color: '#00d4ff' },
  { icon: Zap, name: '连续打卡', earned: true, color: '#06d6a0' },
  { icon: Award, name: '知识达人', earned: true, color: '#7c3aed' },
  { icon: PenTool, name: '刷题能手', earned: false, color: '#f59e0b' },
  { icon: BookOpen, name: '项目先锋', earned: false, color: '#f43f5e' },
  { icon: Star, name: '学习大师', earned: false, color: '#3b82f6' },
]

function suggestIconColor(type: string) {
  const colors: Record<string, string> = {
    weakness: 'var(--color-accent-rose)',
    strength: 'var(--color-accent-cyan)',
    positive: 'var(--color-accent-emerald)',
    action: 'var(--color-accent-amber)',
  }
  return { color: colors[type] || 'var(--color-text-tertiary)' }
}

function masteryColor(val: number) {
  if (val >= 80) return 'var(--color-accent-emerald)'
  if (val >= 60) return 'var(--color-accent-cyan)'
  if (val >= 40) return 'var(--color-accent-amber)'
  return 'var(--color-accent-rose)'
}

function chartHeight(val: number) {
  return Math.max(val * 2, 8)
}

function trendLinePath(data: { week: string; you: number; avg: number }[]) {
  const w = 100 / (data.length - 1)
  const youPoints = data.map((d, i) => `${i * w},${100 - d.you}`).join(' ')
  const avgPoints = data.map((d, i) => `${i * w},${100 - d.avg}`).join(' ')
  return { youPoints, avgPoints }
}

const { youPoints, avgPoints } = trendLinePath(weeklyTrend.map(d => ({ ...d, you: d.you * 0.8, avg: d.avg * 0.8 })))

onMounted(() => {
  isLoading.value = true
  setTimeout(() => { loaded.value = true }, 100)
  fetchEvaluation()
    .then(data => {
      stats.value = data.stats.map((item, index) => ({
        ...item,
        icon: stats.value[index]?.icon ?? Clock,
      }))
      suggestions.value = data.suggestions.map((text, index) => ({
        text,
        type: suggestions.value[index]?.type ?? 'action',
        icon: suggestions.value[index]?.icon ?? ArrowRight,
      }))
      reportDate.value = data.generatedAt
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
  <div class="evaluation">
    <!-- Hero -->
    <div class="eval-hero">
      <div>
        <div class="hero-badge">效果评估</div>
        <h1 class="hero-title">学习效果<span class="gradient-text">数据洞察</span></h1>
        <p class="hero-desc">数据驱动的学习分析，追踪你的每一步成长</p>
        <p v-if="isLoading" class="page-status">正在同步评估数据...</p>
      </div>
      <button class="report-btn" @click="showReportModal = true">
        <FileBarChart :size="16" stroke-width="1.5" />
        <span>生成评估报告</span>
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card" :style="{ '--s-color': s.color }">
        <div class="stat-icon">
          <component :is="s.icon" :size="20" stroke-width="1.5" />
        </div>
        <div class="stat-body">
          <div class="stat-top">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-change">{{ s.change }}</span>
          </div>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
      <div class="badge-strip">
        <div
          v-for="b in badges.slice(0, 3)"
          :key="b.name"
          :class="['mini-badge', { earned: b.earned }]"
          :style="{ '--b-color': b.color }"
        >
          <component :is="b.icon" v-if="b.earned" :size="14" stroke-width="2" />
          <span v-else class="badge-locked">○</span>
        </div>
        <span class="badge-more">+{{ badges.filter(b => !b.earned).length }} 待解锁</span>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-grid">
      <!-- Growth Curve -->
      <div class="card chart-card">
        <div class="card-head">
          <h2 class="card-title-sm">能力成长曲线</h2>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot cyan" /> 我的
            </span>
            <span class="legend-item">
              <span class="legend-dot dim" /> 平均
            </span>
          </div>
        </div>
        <div class="chart-body">
          <svg viewBox="0 0 350 120" class="trend-svg">
            <line x1="0" y1="30" x2="350" y2="30" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="60" x2="350" y2="60" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="90" x2="350" y2="90" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <polyline :points="avgPoints" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="5 4" />
            <polyline :points="youPoints" fill="none" stroke="url(#tg)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path :d="`M${youPoints} L350,120 L0,120 Z`" fill="url(#ta)" />
            <circle v-for="(d, i) in weeklyTrend" :key="i" :cx="i * (350 / (weeklyTrend.length - 1))" :cy="80 - d.you * 0.8" r="4" fill="#00d4ff" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />
            <defs>
              <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
              <linearGradient id="ta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(0,212,255,0.15)" />
                <stop offset="100%" stop-color="rgba(0,212,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-labels">
            <span v-for="d in weeklyTrend" :key="d.week">{{ d.week }}</span>
          </div>
          <div class="chart-footer">
            <span>累计提升 <strong>23%</strong></span>
            <span>较上周 <strong class="up">↑ 12%</strong></span>
          </div>
        </div>
      </div>

      <!-- Knowledge Mastery -->
      <div class="card mastery-card">
        <div class="card-head">
          <h2 class="card-title-sm">知识掌握度</h2>
          <span class="mastery-avg">平均 66%</span>
        </div>
        <div class="mastery-list">
          <div v-for="s in subjects" :key="s.name" class="mastery-row">
            <div class="mastery-top">
              <span class="mastery-name">{{ s.name }}</span>
              <span class="mastery-pct" :style="{ color: masteryColor(s.mastery) }">{{ s.mastery }}%</span>
            </div>
            <div class="mastery-track">
              <div
                class="mastery-fill"
                :style="{
                  width: loaded ? s.mastery + '%' : '0%',
                  background: masteryColor(s.mastery),
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div class="card suggest-card">
        <div class="card-head">
          <h2 class="card-title-sm">学习建议</h2>
          <span class="suggest-count">{{ suggestions.length }} 条</span>
        </div>
        <div class="suggest-list">
          <div v-for="(s, i) in suggestions" :key="i" :class="['suggest-item', s.type]">
            <div class="suggest-icon">
              <component :is="s.icon" :size="15" stroke-width="1.5" :style="suggestIconColor(s.type)" />
            </div>
            <span class="suggest-text">{{ s.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <transition name="scale-in">
      <div v-if="showReportModal" class="modal-overlay" @click.self="showReportModal = false">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">学习评估报告</h2>
            <button class="modal-close-btn" @click="showReportModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="report-summary">
              <div class="report-grade">
                <span class="grade-letter">B+</span>
                <span class="grade-label">综合评级</span>
              </div>
              <div class="report-metrics">
                <div class="metric-item">
                  <span class="metric-label">学习总时长</span>
                  <span class="metric-value">128 小时</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">完成课程</span>
                  <span class="metric-value">18 门</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">平均正确率</span>
                  <span class="metric-value">82%</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">连续学习</span>
                  <span class="metric-value">23 天</span>
                </div>
              </div>
            </div>
            <div class="report-section">
              <h3>学习总结</h3>
              <p>在过去一个月中，你保持了良好的学习节奏，累计学习 128 小时，完成了 18 门课程的学习。你的知识掌握度从 60% 提升到了 68%，机器学习领域进步最为显著。</p>
            </div>
            <div class="report-section">
              <h3>待改进领域</h3>
              <p>概率论与数理统计是你的主要薄弱环节，建议投入更多时间进行专项训练。同时，深度学习领域的知识掌握度较低，可以考虑调整学习计划。</p>
            </div>
            <div class="report-section">
              <h3>下一步建议</h3>
              <ul class="rec-list">
                <li>制定概率论专项复习计划，目标 2 周内完成基础巩固</li>
                <li>每周至少完成 3 道编程实战题，保持代码手感</li>
                <li>尝试参与开源项目或竞赛，将理论知识应用于实践</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <span class="footer-date">{{ reportDate }}</span>
            <div class="footer-actions">
              <button class="btn-ghost">预览</button>
              <button class="btn-primary">
                <Download :size="14" stroke-width="1.5" />
                下载 PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.evaluation {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ====================== Hero ====================== */
.eval-hero {
  padding: 48px 40px 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.report-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.15);
  color: var(--color-accent-cyan);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s var(--ease-out);
}
.report-btn:hover {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(124, 58, 237, 0.18));
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.1);
}

/* ====================== Stats Grid ====================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
  padding: 0 40px;
  margin-bottom: 28px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--ease-out);
}
.stat-card:hover {
  border-color: var(--s-color);
  transform: translateY(-2px);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--s-color) 12%, transparent);
  color: var(--s-color);
  flex-shrink: 0;
}

.stat-body { flex: 1; }

.stat-top {
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
  font-weight: 600;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.badge-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
}

.mini-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--b-color);
  transition: all 0.2s var(--ease-out);
}
.mini-badge.earned {
  border-color: color-mix(in srgb, var(--b-color) 50%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--b-color) 15%, transparent);
}

.badge-locked { opacity: 0.3; }

.badge-more {
  font-size: 11px;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

/* ====================== Dashboard Grid ====================== */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
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
  margin-bottom: 20px;
}

.card-title-sm {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

/* ====================== Chart Card ====================== */
.chart-card { grid-column: 1 / -1; }

.chart-legend {
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.legend-item { display: flex; align-items: center; gap: 6px; }
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-dot.cyan { background: var(--color-accent-cyan); }
.legend-dot.dim { background: rgba(255, 255, 255, 0.2); }

.chart-body { position: relative; }

.trend-svg { width: 100%; height: 120px; }

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
}
.chart-footer strong { font-family: var(--font-mono); color: #fff; }
.chart-footer .up { color: var(--color-accent-emerald); }

/* ====================== Mastery ====================== */
.mastery-avg {
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.mastery-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mastery-row { display: flex; flex-direction: column; gap: 4px; }

.mastery-top {
  display: flex;
  justify-content: space-between;
}

.mastery-name {
  font-size: 13px;
  color: var(--color-text-primary);
}

.mastery-pct {
  font-size: 13px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.mastery-track {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s var(--ease-out);
}

/* ====================== Suggestions ====================== */
.suggest-card { grid-column: 2 / 3; }

.suggest-count {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggest-item {
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
.suggest-item.weakness { background: rgba(244, 63, 94, 0.04); border: 1px solid rgba(244, 63, 94, 0.08); }
.suggest-item.strength { background: rgba(0, 212, 255, 0.04); border: 1px solid rgba(0, 212, 255, 0.08); }
.suggest-item.positive { background: rgba(6, 214, 160, 0.04); border: 1px solid rgba(6, 214, 160, 0.08); }
.suggest-item.action { background: rgba(245, 158, 11, 0.04); border: 1px solid rgba(245, 158, 11, 0.08); }

.suggest-icon { flex-shrink: 0; margin-top: 2px; }

/* ====================== Modal ====================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 40px;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  max-width: 620px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 0;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: #fff;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}
.modal-close-btn:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }

.modal-body { padding: 20px 28px 28px; }

.report-summary {
  display: flex;
  gap: 28px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
}

.report-grade {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.grade-letter {
  font-family: var(--font-display);
  font-size: 40px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.grade-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
}

.report-metrics {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-item { display: flex; flex-direction: column; gap: 2px; }
.metric-label { font-size: 11px; color: var(--color-text-tertiary); }
.metric-value { font-size: 17px; font-weight: 600; color: #fff; }

.report-section { margin-bottom: 20px; }
.report-section h3 {
  font-family: var(--font-display);
  font-size: 16px;
  color: #fff;
  margin-bottom: 6px;
}
.report-section p {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.rec-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.rec-list li {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding-left: 18px;
  position: relative;
}
.rec-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent-cyan);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  border-top: 1px solid var(--color-border);
}

.footer-date {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.footer-actions { display: flex; gap: 8px; }

.btn-ghost {
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}
.btn-ghost:hover { border-color: var(--color-accent-cyan); color: var(--color-accent-cyan); }

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
}
.btn-primary:hover { box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3); }

/* ====================== Responsive ====================== */
@media (max-width: 900px) {
  .eval-hero { padding: 32px 20px 24px; flex-direction: column; }
  .stats-grid { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
  .badge-strip { display: none; }
  .dashboard-grid { padding: 0 20px 32px; grid-template-columns: 1fr; }
  .chart-card, .suggest-card { grid-column: 1; }
}
</style>
