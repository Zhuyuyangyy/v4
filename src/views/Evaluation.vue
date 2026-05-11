<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref(false)

const stats = [
  { label: '学习时长', value: '128h', change: '+12h', icon: '◈', color: '#00d4ff' },
  { label: '完成课时', value: '47', change: '+5', icon: '✎', color: '#7c3aed' },
  { label: '平均正确率', value: '82%', change: '+3%', icon: '◎', color: '#06d6a0' },
  { label: '知识掌握度', value: '68%', change: '+8%', icon: '⇲', color: '#f59e0b' },
]

const weeklyData = [45, 52, 38, 65, 70, 55, 80]
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const subjects = [
  { name: 'Python 基础', mastery: 92, color: '#00d4ff' },
  { name: '数据结构', mastery: 75, color: '#3b82f6' },
  { name: '机器学习', mastery: 60, color: '#7c3aed' },
  { name: '深度学习', mastery: 45, color: '#06d6a0' },
  { name: '数学基础', mastery: 70, color: '#f59e0b' },
  { name: '算法设计', mastery: 55, color: '#f43f5e' },
]

const suggestions = [
  '概率论与数理统计是你的薄弱环节，建议安排 2 小时专项复习',
  '机器学习基础掌握良好，可以开始学习进阶内容',
  '本周学习时长较上周增加 15%，保持良好的学习节奏',
  '建议增加编程实践时间，理论与实践比例建议 1:1',
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})

function masteryColor(val: number) {
  if (val >= 80) return 'var(--color-accent-emerald)'
  if (val >= 60) return 'var(--color-accent-cyan)'
  if (val >= 40) return 'var(--color-accent-amber)'
  return 'var(--color-accent-rose)'
}
</script>

<template>
  <div class="evaluation">
    <div class="page-header reveal">
      <h1 class="page-title">学习效果评估</h1>
      <p class="page-desc">数据驱动的学习分析，全面了解你的学习成效</p>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid reveal reveal-delay-1">
      <div v-for="s in stats" :key="s.label" class="stat-card" :style="{ '--stat-color': s.color }">
        <span class="stat-icon">{{ s.icon }}</span>
        <div class="stat-info">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-change">{{ s.change }}</span>
        </div>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="eval-grid">
      <!-- Heatmap -->
      <div :class="['card heatmap-card reveal reveal-delay-2', { visible: loaded }]">
        <h2 class="card-title">本周学习热力</h2>
        <div class="heatmap">
          <div class="heatmap-row">
            <div class="heatmap-labels">
              <span v-for="d in days" :key="d" class="heatmap-day">{{ d }}</span>
            </div>
            <div class="heatmap-bars">
              <div v-for="(v, i) in weeklyData" :key="i" class="heatmap-bar-group">
                <div
                  class="heatmap-bar"
                  :style="{
                    height: v + '%',
                    background: `linear-gradient(180deg, var(--color-accent-cyan), var(--color-accent-purple))`,
                    boxShadow: loaded ? `0 0 15px rgba(0,212,255,${v / 200})` : 'none',
                  }"
                />
                <span class="heatmap-value">{{ v }}m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Knowledge Mastery -->
      <div :class="['card mastery-card reveal reveal-delay-3', { visible: loaded }]">
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
                  boxShadow: loaded ? `0 0 10px ${masteryColor(s.mastery)}` : 'none',
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Growth Curve -->
      <div :class="['card growth-card reveal reveal-delay-4', { visible: loaded }]">
        <h2 class="card-title">能力成长曲线</h2>
        <div class="growth-chart">
          <svg viewBox="0 0 300 120" class="growth-svg">
            <!-- Grid -->
            <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(0,212,255,0.06)" stroke-width="1" />
            <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(0,212,255,0.06)" stroke-width="1" />
            <!-- Line -->
            <polyline
              points="0,110 50,100 100,85 150,70 200,50 250,40 300,30"
              fill="none"
              stroke="url(#growthGrad)"
              stroke-width="2.5"
              class="growth-line"
            />
            <!-- Area -->
            <path
              d="M0,110 L50,100 L100,85 L150,70 L200,50 L250,40 L300,30 L300,120 L0,120 Z"
              fill="url(#growthArea)"
              class="growth-area"
            />
            <!-- Gradient defs -->
            <defs>
              <linearGradient id="growthGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
              <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(0,212,255,0.3)" />
                <stop offset="100%" stop-color="rgba(0,212,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          <div class="growth-labels">
            <span>第1周</span>
            <span>第4周</span>
            <span>第8周</span>
            <span>当前</span>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div :class="['card suggest-card reveal reveal-delay-5', { visible: loaded }]">
        <h2 class="card-title">学习建议</h2>
        <div class="suggest-list">
          <div v-for="(s, i) in suggestions" :key="i" class="suggest-item">
            <span class="suggest-bullet" />
            <span class="suggest-text">{{ s }}</span>
          </div>
        </div>
      </div>
    </div>
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

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* === Stats === */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
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
  margin-bottom: 20px;
}

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
  height: 36px;
  display: flex;
  align-items: center;
}

.heatmap-bars {
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

.heatmap-bar {
  width: 100%;
  max-width: 36px;
  border-radius: 4px 4px 0 0;
  transition: height 1s var(--ease-out);
  min-height: 4px;
}

.heatmap-value {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
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
}

.mastery-value {
  font-size: 14px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.mastery-bar {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s var(--ease-out);
}

/* === Growth === */
.growth-card {
  grid-column: 1 / 2;
}

.growth-svg {
  width: 100%;
  height: 120px;
}

.growth-line {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1.5s var(--ease-out) forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

.growth-area {
  opacity: 0;
  animation: fade-in 1s var(--ease-out) 0.5s forwards;
}

@keyframes fade-in {
  to { opacity: 1; }
}

.growth-labels {
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
  gap: 16px;
}

.suggest-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.06);
}

.suggest-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  flex-shrink: 0;
  margin-top: 8px;
  box-shadow: 0 0 8px var(--color-accent-cyan);
}

.suggest-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}
</style>
