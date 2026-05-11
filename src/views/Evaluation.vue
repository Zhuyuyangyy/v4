<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  GitCompare,
  BarChart3,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
} from 'lucide-vue-next'

const loaded = ref(false)
const showReportModal = ref(false)

const stats = [
  { label: '学习时长', value: '128h', change: '+12h', icon: Clock, color: '#00d4ff' },
  { label: '完成课时', value: '47', change: '+5', icon: PenTool, color: '#7c3aed' },
  { label: '平均正确率', value: '82%', change: '+3%', icon: Target, color: '#06d6a0' },
  { label: '知识掌握度', value: '68%', change: '+8%', icon: TrendingUp, color: '#f59e0b' },
]

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

const suggestions = [
  { text: '概率论与数理统计是你的薄弱环节，建议安排 2 小时专项复习', type: 'weakness' as const, icon: AlertTriangle },
  { text: '机器学习基础掌握良好，可以开始学习进阶内容', type: 'strength' as const, icon: Sparkles },
  { text: '本周学习时长较上周增加 15%，保持良好的学习节奏', type: 'positive' as const, icon: ArrowUp },
  { text: '建议增加编程实践时间，理论与实践比例建议 1:1', type: 'action' as const, icon: ArrowRight },
]

const badges = [
  { icon: Sparkles, name: '初识学习', desc: '完成首次学习画像', earned: true, color: '#00d4ff' },
  { icon: Zap, name: '连续打卡', desc: '连续学习 7 天', earned: true, color: '#06d6a0' },
  { icon: Award, name: '知识达人', desc: '掌握 5 个以上知识点', earned: true, color: '#7c3aed' },
  { icon: PenTool, name: '刷题能手', desc: '完成 100 道练习题', earned: false, color: '#f59e0b' },
  { icon: BookOpen, name: '项目先锋', desc: '完成一个实战项目', earned: false, color: '#f43f5e' },
  { icon: Star, name: '学习大师', desc: '综合评分达到 85%', earned: false, color: '#3b82f6' },
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
  return Math.max(val * 2.2, 8)
}

function trendLinePath(data: { week: string; you: number; avg: number }[]) {
  const w = 100 / (data.length - 1)
  const youPoints = data.map((d, i) => `${i * w},${100 - d.you * 0.8}`).join(' ')
  const avgPoints = data.map((d, i) => `${i * w},${100 - d.avg * 0.8}`).join(' ')
  return { youPoints, avgPoints }
}

const { youPoints, avgPoints } = trendLinePath(weeklyTrend)

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})
</script>

<template>
  <div class="evaluation">
    <div class="page-header reveal">
      <div class="page-header-row">
        <div>
          <h1 class="page-title">学习效果评估</h1>
          <p class="page-desc">数据驱动的学习分析，全面了解你的学习成效</p>
        </div>
        <button class="report-btn" @click="showReportModal = true" aria-label="生成评估报告">
          <BarChart3 :size="16" stroke-width="1.5" />
          生成评估报告
        </button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid reveal reveal-delay-1">
      <div v-for="s in stats" :key="s.label" class="stat-card" :style="{ '--stat-color': s.color }">
        <component :is="s.icon" :size="22" stroke-width="1.5" class="stat-icon" :style="{ color: 'var(--stat-color)' }" />
        <div class="stat-info">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-change">{{ s.change }}</span>
        </div>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>

    <!-- Badges -->
    <div class="badges-strip reveal reveal-delay-2">
      <span class="badges-label">成就徽章</span>
      <div class="badges-list">
        <div
          v-for="b in badges"
          :key="b.name"
          :class="['badge-item', { earned: b.earned }]"
          :style="{ '--badge-color': b.color }"
          :title="b.name + ': ' + b.desc"
        >
          <span class="badge-icon">
              <component :is="b.icon" v-if="b.earned" :size="18" stroke-width="1.5" :style="{ color: b.color }" />
              <span v-else style="opacity: 0.3">○</span>
            </span>
          <span class="badge-name">{{ b.name }}</span>
        </div>
      </div>
    </div>

    <div class="eval-grid">
      <!-- Heatmap -->
      <div :class="['card heatmap-card reveal reveal-delay-3', { visible: loaded }]">
        <div class="card-header-row">
          <h2 class="card-title">本周学习热力</h2>
          <div class="card-legend">
            <span class="legend-item"><span class="legend-dot you" /> 你</span>
            <span class="legend-item"><span class="legend-dot avg" /> 平均值</span>
          </div>
        </div>
        <div class="heatmap">
          <div class="heatmap-row">
            <div class="heatmap-labels">
              <span v-for="d in days" :key="d" class="heatmap-day">{{ d }}</span>
            </div>
            <div class="heatmap-chart">
              <!-- Bars (you) -->
              <div v-for="(v, i) in weeklyData" :key="'bar'+i" class="heatmap-bar-group">
                <div class="bar-pair">
                  <div
                    class="heatmap-bar you"
                    :style="{ height: chartHeight(v) + 'px' }"
                  >
                    <div class="bar-glow" />
                  </div>
                  <div
                    class="heatmap-bar avg"
                    :style="{ height: chartHeight(peerAvg[i]) + 'px' }"
                  />
                </div>
                <span class="heatmap-value">{{ v }}m</span>
              </div>
            </div>
          </div>
          <div class="heatmap-footer">
            <span class="heatmap-total">本周累计：{{ weeklyData.reduce((a, b) => a + b, 0) }} 分钟</span>
            <span class="heatmap-compare">较上周 ↑ 12%</span>
          </div>
        </div>
      </div>

      <!-- Knowledge Mastery -->
      <div :class="['card mastery-card reveal reveal-delay-4', { visible: loaded }]">
        <h2 class="card-title">知识掌握度</h2>
        <div class="mastery-list">
          <div v-for="s in subjects" :key="s.name" class="mastery-item">
            <div class="mastery-header">
              <span class="mastery-name">{{ s.name }}</span>
              <span class="mastery-value" :style="{ color: masteryColor(s.mastery) }">{{ s.mastery }}%</span>
            </div>
            <div class="mastery-bar">
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

      <!-- Growth Curve -->
      <div :class="['card growth-card reveal reveal-delay-5', { visible: loaded }]">
        <div class="card-header-row">
          <h2 class="card-title">能力成长曲线</h2>
          <div class="card-legend">
            <span class="legend-item"><span class="legend-dot you" /> 你</span>
            <span class="legend-item"><span class="legend-dot avg" /> 平均</span>
          </div>
        </div>
        <div class="trend-chart">
          <svg viewBox="0 0 350 140" class="trend-svg">
            <!-- Grid -->
            <line x1="0" y1="35" x2="350" y2="35" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="70" x2="350" y2="70" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="105" x2="350" y2="105" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <!-- Avg line -->
            <polyline
              :points="avgPoints"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              stroke-width="2"
              stroke-dasharray="6 4"
              class="trend-line avg"
            />
            <!-- You line -->
            <polyline
              :points="youPoints"
              fill="none"
              stroke="url(#trendGrad)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="trend-line you"
            />
            <!-- Area -->
            <path
              :d="`M${youPoints} L350,140 L0,140 Z`"
              fill="url(#trendArea)"
              class="trend-area"
            />
            <!-- Dots -->
            <circle
              v-for="(d, i) in weeklyTrend"
              :key="'dot'+i"
              :cx="i * (350 / (weeklyTrend.length - 1))"
              :cy="100 - d.you * 0.8"
              r="4"
              fill="#00d4ff"
              class="trend-dot"
            />
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
              <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(0,212,255,0.2)" />
                <stop offset="100%" stop-color="rgba(0,212,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          <div class="trend-labels">
            <span v-for="d in weeklyTrend" :key="d.week">{{ d.week }}</span>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div :class="['card suggest-card reveal reveal-delay-6', { visible: loaded }]">
        <h2 class="card-title">学习建议</h2>
        <div class="suggest-list">
          <div
            v-for="(s, i) in suggestions"
            :key="i"
            :class="['suggest-item', s.type]"
          >
            <span class="suggest-icon">
              <component :is="s.icon" :size="16" stroke-width="1.5" :style="suggestIconColor(s.type)" />
            </span>
            <span class="suggest-text">{{ s.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <transition name="scale-in">
      <div v-if="showReportModal" class="report-overlay" @click.self="showReportModal = false">
        <div class="report-modal">
          <div class="report-top">
            <h2 class="report-title">学习评估报告</h2>
            <button class="report-close" @click="showReportModal = false">✕</button>
          </div>

          <div class="report-body">
            <div class="report-summary">
              <div class="report-grade">
                <span class="grade-score">B+</span>
                <span class="grade-label">综合评级</span>
              </div>
              <div class="report-stats-grid">
                <div class="report-stat">
                  <span class="rs-label">学习总时长</span>
                  <span class="rs-value">128 小时</span>
                </div>
                <div class="report-stat">
                  <span class="rs-label">完成课程</span>
                  <span class="rs-value">18 门</span>
                </div>
                <div class="report-stat">
                  <span class="rs-label">平均正确率</span>
                  <span class="rs-value">82%</span>
                </div>
                <div class="report-stat">
                  <span class="rs-label">连续学习</span>
                  <span class="rs-value">23 天</span>
                </div>
              </div>
            </div>

            <div class="report-section">
              <h3>学习总结</h3>
              <p>在过去一个月中，你保持了良好的学习节奏，累计学习 128 小时，完成了 18 门课程的学习。你的知识掌握度从 60% 提升到了 68%，机器学习领域进步最为显著。</p>
            </div>

            <div class="report-section">
              <h3>待改进领域</h3>
              <p>概率论与数理统计是你的主要薄弱环节，建议投入更多时间进行专项训练。同时，深度学习领域的知识掌握度较低，可以考虑调整学习计划，增加相关学习时间。</p>
            </div>

            <div class="report-section">
              <h3>下一步建议</h3>
              <ul class="report-recommendations">
                <li>制定概率论专项复习计划，目标 2 周内完成基础巩固</li>
                <li>每周至少完成 3 道编程实战题，保持代码手感</li>
                <li>尝试参与开源项目或竞赛，将理论知识应用于实践</li>
                <li>保持当前的学习节奏，适当增加周末学习时间</li>
              </ul>
            </div>
          </div>

          <div class="report-footer">
            <span class="report-date">报告生成时间：2026-05-11</span>
            <div class="report-actions">
              <button class="report-btn-secondary">预览</button>
              <button class="report-btn-primary">下载 PDF</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.evaluation {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.report-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 13px;
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;
}
.report-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
}

/* === Stats === */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 24px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--stat-color);
  transition: all var(--duration-normal) var(--ease-out);
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border-radius: var(--radius-md);
  background: rgba(0, 212, 255, 0.06);
  color: var(--stat-color);
  margin-bottom: 12px;
}

.stat-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 1;
  color: #fff;
}

.stat-change {
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--color-accent-emerald);
}

.stat-label {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

/* === Badges === */
.badges-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  margin-bottom: 32px;
  overflow-x: auto;
}

.badges-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.badges-list {
  display: flex;
  gap: 16px;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: default;
  white-space: nowrap;
}
.badge-item.earned {
  border-color: rgba(0, 212, 255, 0.15);
  background: rgba(0, 212, 255, 0.04);
}
.badge-item:not(.earned) {
  opacity: 0.5;
}

.badge-icon {
  font-size: 16px;
  color: var(--badge-color);
}

.badge-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* === Grid === */
.eval-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.card {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.card-title {
  font-family: var(--font-display);
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.card-header-row .card-title {
  margin-bottom: 0;
}

.card-legend {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-dot.you { background: var(--color-accent-cyan); }
.legend-dot.avg { background: rgba(255, 255, 255, 0.2); }

/* === Heatmap === */
.heatmap-card {
  grid-column: 1 / 2;
}

.heatmap-row {
  display: flex;
  gap: 16px;
}

.heatmap-labels {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.heatmap-day {
  font-size: 12px;
  color: var(--color-text-tertiary);
  height: 44px;
  display: flex;
  align-items: center;
}

.heatmap-chart {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  height: 220px;
}

.heatmap-bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
  justify-content: flex-end;
}

.bar-pair {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 100%;
}

.heatmap-bar {
  width: 16px;
  border-radius: 4px 4px 0 0;
  transition: height 1s var(--ease-out);
  position: relative;
  min-height: 4px;
}
.heatmap-bar.you {
  background: linear-gradient(180deg, var(--color-accent-cyan), var(--color-accent-blue));
}
.heatmap-bar.avg {
  background: rgba(255, 255, 255, 0.1);
}

.bar-glow {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 8px;
  background: var(--color-accent-cyan);
  filter: blur(8px);
  opacity: 0.4;
}

.heatmap-value {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.heatmap-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  font-size: 13px;
}

.heatmap-total {
  color: var(--color-text-secondary);
}

.heatmap-compare {
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
}

/* === Mastery === */
.mastery-card {
  grid-column: 2 / 3;
}

.mastery-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mastery-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.mastery-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.mastery-value {
  font-size: 14px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.mastery-bar {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s var(--ease-out);
}

/* === Trend === */
.growth-card {
  grid-column: 1 / 2;
}

.trend-chart {
  position: relative;
}

.trend-svg {
  width: 100%;
  height: 140px;
}

.trend-line.you {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1.5s var(--ease-out) forwards;
}

.trend-line.avg {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1.5s var(--ease-out) 0.3s forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

.trend-area {
  opacity: 0;
  animation: fade-in 1s var(--ease-out) 0.5s forwards;
}

.trend-dot {
  opacity: 0;
  animation: fade-in 0.3s var(--ease-out) 1s forwards;
}

@keyframes fade-in {
  to { opacity: 1; }
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

/* === Suggestions === */
.suggest-card {
  grid-column: 2 / 3;
}

.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggest-item {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  align-items: flex-start;
}
.suggest-item.weakness {
  background: rgba(244, 63, 94, 0.04);
  border: 1px solid rgba(244, 63, 94, 0.08);
}
.suggest-item.strength {
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.08);
}
.suggest-item.positive {
  background: rgba(6, 214, 160, 0.04);
  border: 1px solid rgba(6, 214, 160, 0.08);
}
.suggest-item.action {
  background: rgba(245, 158, 11, 0.04);
  border: 1px solid rgba(245, 158, 11, 0.08);
}

.suggest-icon {
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.suggest-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

/* === Report Modal === */
.report-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 40px;
}

.report-modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

.report-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 0;
}

.report-title {
  font-family: var(--font-display);
  font-size: 28px;
  color: #fff;
}

.report-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  transition: all var(--duration-fast) var(--ease-out);
}
.report-close:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.report-body {
  padding: 24px 32px 32px;
}

.report-summary {
  display: flex;
  gap: 32px;
  padding: 24px;
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
}

.report-grade {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.grade-score {
  font-family: var(--font-display);
  font-size: 48px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.grade-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
}

.report-stats-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.report-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rs-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.rs-value {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.report-section {
  margin-bottom: 24px;
}

.report-section h3 {
  font-family: var(--font-display);
  font-size: 18px;
  color: #fff;
  margin-bottom: 8px;
}

.report-section p {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.report-recommendations {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.report-recommendations li {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding-left: 20px;
  position: relative;
}
.report-recommendations li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent-cyan);
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-top: 1px solid var(--color-border);
}

.report-date {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.report-actions {
  display: flex;
  gap: 10px;
}

.report-btn-secondary {
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.report-btn-secondary:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.report-btn-primary {
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all var(--duration-fast) var(--ease-out);
}
.report-btn-primary:hover {
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
}

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .eval-grid { grid-template-columns: 1fr; }
  .heatmap-card, .mastery-card, .growth-card, .suggest-card {
    grid-column: 1;
  }
  .page-header-row { flex-direction: column; gap: 16px; }
  .report-summary { flex-direction: column; }
}
</style>
