<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref(false)

const dimensions = [
  { label: '知识基础', value: 78, color: '#00d4ff' },
  { label: '学习速度', value: 65, color: '#3b82f6' },
  { label: '逻辑思维', value: 82, color: '#7c3aed' },
  { label: '创造力', value: 70, color: '#06d6a0' },
  { label: '专注力', value: 55, color: '#f59e0b' },
  { label: '自律性', value: 60, color: '#f43f5e' },
]

const weaknesses = [
  { tag: '概率论', count: 12 },
  { tag: 'Python 高级', count: 8 },
  { tag: '数据结构', count: 7 },
  { tag: '线性代数', count: 6 },
  { tag: '微积分', count: 5 },
  { tag: '算法分析', count: 4 },
  { tag: '数据库', count: 3 },
]

const timeline = [
  { date: '2026-05-10', event: '完成机器学习入门评估', score: '+15%' },
  { date: '2026-05-08', event: '更新学习目标：深度学习方向', score: '' },
  { date: '2026-05-05', event: '薄弱点检测：概率论基础', score: '-8%' },
  { date: '2026-05-01', event: '首次画像建立', score: '' },
]

function radarPoints(cx: number, cy: number, r: number) {
  return dimensions.map((d, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    const val = d.value / 100
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }
  })
}

const cx = 120, cy = 120, r = 100
const points = radarPoints(cx, cy, r)
const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})
</script>

<template>
  <div class="profile">
    <div class="page-header reveal">
      <h1 class="page-title">学习画像</h1>
      <p class="page-desc">AI 驱动的多维度学习分析，全面了解你的学习状态</p>
    </div>

    <div class="profile-grid">
      <!-- Radar Chart -->
      <div :class="['card radar-card reveal reveal-delay-1', { visible: loaded }]">
        <h2 class="card-title">能力雷达</h2>
        <div class="radar-container">
          <svg viewBox="0 0 240 240" class="radar-svg">
            <!-- Grid levels -->
            <polygon
              v-for="level in gridLevels"
              :key="level"
              :points="dimensions.map((_, i) => {
                const a = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
                const x = cx + r * level * Math.cos(a)
                const y = cy + r * level * Math.sin(a)
                return `${x},${y}`
              }).join(' ')"
              fill="none"
              stroke="rgba(0,212,255,0.08)"
              stroke-width="1"
            />
            <!-- Axis lines -->
            <line
              v-for="(_, i) in dimensions"
              :key="'axis'+i"
              :x1="cx" :y1="cy"
              :x2="cx + r * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              :y2="cy + r * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              stroke="rgba(0,212,255,0.08)"
              stroke-width="1"
            />
            <!-- Data polygon -->
            <polygon
              :points="points.map(p => `${p.x},${p.y}`).join(' ')"
              :fill="loaded ? 'rgba(0,212,255,0.12)' : 'transparent'"
              :stroke="loaded ? '#00d4ff' : 'transparent'"
              stroke-width="2"
              class="radar-data"
            />
            <!-- Data points -->
            <circle
              v-for="(p, i) in points"
              :key="'pt'+i"
              :cx="p.x" :cy="p.y"
              r="4"
              :fill="dimensions[i].color"
              class="radar-point"
            />
            <!-- Labels -->
            <text
              v-for="(d, i) in dimensions"
              :key="'label'+i"
              :x="cx + (r + 28) * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              :y="cy + (r + 28) * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#8892b0"
              font-size="11"
              font-family="Outfit, sans-serif"
            >
              {{ d.label }}
            </text>
          </svg>
        </div>
        <div class="radar-stats">
          <div v-for="d in dimensions" :key="d.label" class="stat-row">
            <div class="stat-label">
              <span class="stat-dot" :style="{ background: d.color }" />
              {{ d.label }}
            </div>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: d.value + '%', background: d.color }" />
            </div>
            <span class="stat-value">{{ d.value }}%</span>
          </div>
        </div>
      </div>

      <!-- Weakness Cloud -->
      <div :class="['card cloud-card reveal reveal-delay-2', { visible: loaded }]">
        <h2 class="card-title">薄弱知识点</h2>
        <p class="card-sub">基于学习数据分析的高频薄弱点</p>
        <div class="cloud">
          <span
            v-for="w in weaknesses"
            :key="w.tag"
            class="cloud-tag"
            :style="{
              fontSize: `${12 + w.count * 2}px`,
              opacity: 0.5 + w.count * 0.04,
              '--tag-color': `hsl(${200 + w.count * 5}, 80%, 60%)`,
            }"
          >
            {{ w.tag }}
          </span>
        </div>
      </div>

      <!-- Learning Preferences -->
      <div :class="['card pref-card reveal reveal-delay-3', { visible: loaded }]">
        <h2 class="card-title">学习偏好</h2>
        <div class="pref-grid">
          <div class="pref-item">
            <span class="pref-icon pref-icon-time">⌚</span>
            <div>
              <div class="pref-label">最佳学习时段</div>
              <div class="pref-value">晚间 20:00 - 23:00</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-doc">≡</span>
            <div>
              <div class="pref-label">偏好资源类型</div>
              <div class="pref-value">视频教程 > 习题实践 > 文档阅读</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-target">◎</span>
            <div>
              <div class="pref-label">学习目标</div>
              <div class="pref-value">深度学习工程师 · 6个月</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-energy">✦</span>
            <div>
              <div class="pref-label">学习节奏</div>
              <div class="pref-value">稳步推进 (每周 8-10 小时)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Evolution Timeline -->
      <div :class="['card timeline-card reveal reveal-delay-4', { visible: loaded }]">
        <h2 class="card-title">画像演变</h2>
        <div class="timeline">
          <div v-for="(t, i) in timeline" :key="i" class="timeline-item">
            <div class="timeline-marker">
              <span class="marker-dot" :class="{ latest: i === 0 }" />
              <span v-if="i < timeline.length - 1" class="marker-line" />
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ t.date }}</div>
              <div class="timeline-event">{{ t.event }}</div>
              <span v-if="t.score" :class="['timeline-score', t.score.startsWith('+') ? 'up' : 'down']">
                {{ t.score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
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

.profile-grid {
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
  font-size: 22px;
  margin-bottom: 4px;
}

.card-sub {
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin-bottom: 20px;
}

/* === Radar === */
.radar-card {
  grid-column: 1;
}

.radar-container {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.radar-svg {
  width: 240px;
  height: 240px;
}

.radar-data {
  transition: all 0.8s var(--ease-out);
}

.radar-point {
  filter: drop-shadow(0 0 4px var(--color-accent-cyan));
}

.radar-stats {
  margin-top: 16px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  font-size: 13px;
}

.stat-label {
  width: 72px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
}

.stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s var(--ease-out);
}

.stat-value {
  width: 36px;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* === Cloud === */
.cloud-card {
  grid-column: 2;
}

.cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.cloud-tag {
  color: var(--tag-color, var(--color-accent-cyan));
  font-weight: 500;
  cursor: default;
  transition: all var(--duration-fast) var(--ease-out);
}
.cloud-tag:hover {
  filter: brightness(1.3);
  transform: scale(1.05);
}

/* === Preferences === */
.pref-card {
  grid-column: 1;
}

.pref-grid {
  display: grid;
  gap: 20px;
  margin-top: 16px;
}

.pref-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pref-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(0, 212, 255, 0.06);
  flex-shrink: 0;
  font-size: 20px;
}

.pref-icon-time { background: rgba(0, 212, 255, 0.08); color: #00d4ff; }
.pref-icon-doc { background: rgba(124, 58, 237, 0.08); color: #7c3aed; }
.pref-icon-target { background: rgba(6, 214, 160, 0.08); color: #06d6a0; }
.pref-icon-energy { background: rgba(245, 158, 11, 0.08); color: #f59e0b; }

.pref-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-bottom: 2px;
  letter-spacing: 0.3px;
}

.pref-value {
  font-size: 14px;
  font-weight: 500;
}

/* === Timeline === */
.timeline-card {
  grid-column: 2;
}

.timeline {
  margin-top: 16px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
}

.marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.2);
  border: 2px solid var(--color-accent-cyan);
  flex-shrink: 0;
}
.marker-dot.latest {
  background: var(--color-accent-cyan);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.marker-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
}

.timeline-content {
  padding-bottom: 24px;
}

.timeline-date {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  margin-bottom: 4px;
}

.timeline-event {
  font-size: 14px;
  color: var(--color-text-primary);
}

.timeline-score {
  display: inline-block;
  font-size: 12px;
  font-family: var(--font-mono);
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 4px;
}
.timeline-score.up {
  color: var(--color-accent-emerald);
  background: rgba(6, 214, 160, 0.1);
}
.timeline-score.down {
  color: var(--color-accent-rose);
  background: rgba(244, 63, 94, 0.1);
}
</style>
