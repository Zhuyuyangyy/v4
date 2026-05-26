<script setup lang="ts">
import { ref, computed } from 'vue'

const T = {
  cyan: '#00d4ff', purple: '#7c3aed', emerald: '#06d6a0',
  amber: '#f59e0b', rose: '#f43f5e', blue: '#3b82f6',
  text: '#e8edf5', textSub: '#8892b0', textTri: '#4a5568',
  serif: "'Instrument Serif', 'Noto Serif SC', serif",
  sans: "'Outfit', 'PingFang SC', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

interface Domain {
  id: string; name: string; en: string; color: string;
  n: number; m: number; hot: boolean
}

const domains: Domain[] = [
  { id: 'cpy', name: 'C / Python', en: 'LANG', color: T.blue, n: 24, m: 0.90, hot: false },
  { id: 'ds', name: '数据结构', en: 'DS', color: T.amber, n: 22, m: 0.78, hot: false },
  { id: 'sys', name: '计算机系统', en: 'SYS', color: T.emerald, n: 18, m: 0.58, hot: false },
  { id: 'ml', name: '机器学习', en: 'ML', color: T.purple, n: 20, m: 0.65, hot: false },
  { id: 'dl', name: '深度学习', en: 'DL', color: '#1de9b6', n: 16, m: 0.42, hot: true },
  { id: 'math', name: '数学基础', en: 'MATH', color: T.cyan, n: 20, m: 0.82, hot: false },
]

const SW = 1760
const SH = 580
const TOWER_MAX_H = 380
const TOWER_MIN_H = 180
const TOWER_W = 120
const TOWER_BOTTOM = SH - 110
const PEDESTAL_H = 14

function towerHeight(n: number) {
  const t = (n - 12) / (28 - 12)
  return TOWER_MIN_H + Math.max(0, Math.min(1, t)) * (TOWER_MAX_H - TOWER_MIN_H)
}

const N = domains.length
const totalUsable = SW - 80
const gap = (totalUsable - N * TOWER_W) / (N + 1)
const positions = domains.map((_, i) => 40 + gap + i * (TOWER_W + gap))

const totalConcepts = domains.reduce((s, d) => s + d.n, 0)
const masteredTotal = domains.reduce((s, d) => s + Math.round(d.n * d.m), 0)
const overallM = Math.round((masteredTotal / totalConcepts) * 100)

// Starfield
const stars = (() => {
  const out: { x: number; y: number; r: number; o: number; d: number }[] = []
  let s = 999
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 90; i++) {
    out.push({
      x: rand() * SW, y: rand() * (TOWER_BOTTOM - 50),
      r: 0.3 + rand() * 1.2, o: 0.15 + rand() * 0.6, d: rand() * 5,
    })
  }
  return out
})()

const hover = ref<string | null>(null)
const hoveredDomain = computed(() => hover.value ? domains.find(d => d.id === hover.value) : null)

const moonX = SW * 0.16
const moonY = 110

/* ── Compute windows grid for a tower ── */
interface Win { x: number; y: number; lit: boolean; partial: boolean; i: number }
function computeWindows(d: { n: number; m: number }): Win[] {
  const cols = 5
  const cellW = 14
  const cellH = 8
  const gapX = 6
  const gapY = 7
  const rows = Math.ceil(d.n / cols)
  const masteredCount = Math.round(d.n * d.m)
  const h = towerHeight(d.n)
  const totalW = cols * cellW + (cols - 1) * gapX
  const startX = (120 - totalW) / 2
  const innerH = h - 56
  const usableY = innerH - 12
  const totalGridH = rows * cellH + (rows - 1) * gapY
  const yStart = 30 + Math.max(0, (usableY - totalGridH) / 2)

  const windows: Win[] = []
  for (let i = 0; i < d.n; i++) {
    const r = rows - 1 - Math.floor(i / cols)
    const c = i % cols
    const x = startX + c * (cellW + gapX)
    const y = yStart + r * (cellH + gapY)
    const lit = i < masteredCount
    const partial = !lit && i < masteredCount + 2
    windows.push({ x, y, lit, partial, i })
  }
  return windows
}
</script>

<template>
  <section class="section-skyline">
    <div class="skyline-inner">
      <!-- Header -->
      <div class="sky-header">
        <div>
          <div class="section-eyebrow" :style="`color: ${T.emerald}`">
            <span class="eyebrow-dot" :style="`background: ${T.emerald}`" />
            YOUR KNOWLEDGE HORIZON · 此刻
          </div>
          <h2 class="section-title-hp">
            你的知识地平线 · 共 <span :style="`color: ${T.emerald}`">{{ masteredTotal }}</span> / {{ totalConcepts }} 概念已点亮
          </h2>
          <p class="section-desc-hp">
            每座塔楼是一个学科域，每扇亮窗是你已掌握的具体知识点。
            塔顶闪烁的灯标 <span :style="`color: ${T.amber}`">◉</span> 表示评估发现的待加强方向。
          </p>
        </div>
        <div class="sky-stats">
          <div>
            <div class="sky-stat-label">整体掌握度</div>
            <div class="sky-stat-val" :style="`color: ${T.emerald}`">
              {{ overallM }}<span class="sky-stat-unit">%</span>
            </div>
          </div>
          <div class="sky-stat-divider" />
          <div>
            <div class="sky-stat-label">本周新点亮</div>
            <div class="sky-stat-val sky-stat-val-sm" :style="`color: ${T.cyan}`">
              +12<span class="sky-stat-unit"> 概念</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skyline SVG -->
      <div class="sky-canvas">
        <svg :viewBox="`0 0 ${SW} ${SH}`" class="sky-svg">
          <defs>
            <linearGradient id="sky-tower-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0c1024" />
              <stop offset="100%" stop-color="#06081a" />
            </linearGradient>
            <radialGradient id="sky-moon-grad" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#e8edf5" />
              <stop offset="80%" stop-color="#a3aec0" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#5a6273" stop-opacity="0.4" />
            </radialGradient>
            <linearGradient v-for="d in domains" :key="`refl-${d.id}`"
              :id="`sky-refl-${d.id}`" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :stop-color="d.color" stop-opacity="0.4" />
              <stop offset="100%" :stop-color="d.color" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- Stars -->
          <circle v-for="(s, i) in stars" :key="`star-${i}`"
            :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
            class="sky-star"
            :style="`animation-duration: ${3 + (i % 4)}s; animation-delay: ${s.d}s`" />

          <!-- Moon -->
          <circle :cx="moonX" :cy="moonY" r="38" fill="url(#sky-moon-grad)" opacity="0.5"
            style="filter: drop-shadow(0 0 24px rgba(168, 200, 255, 0.4))" />
          <circle :cx="moonX - 8" :cy="moonY - 6" r="3" fill="rgba(0,0,0,0.18)" />
          <circle :cx="moonX + 10" :cy="moonY + 4" r="5" fill="rgba(0,0,0,0.15)" />
          <circle :cx="moonX + 2" :cy="moonY + 12" r="2.5" fill="rgba(0,0,0,0.12)" />

          <!-- Horizon glow -->
          <ellipse :cx="SW / 2" :cy="TOWER_BOTTOM + 4" :rx="SW * 0.45" ry="50"
            :fill="T.cyan" opacity="0.06" style="filter: blur(20px)" />

          <!-- Ground grid -->
          <line x1="0" :y1="TOWER_BOTTOM + 5" :x2="SW" :y2="TOWER_BOTTOM + 5"
            :stroke="T.cyan" stroke-opacity="0.35" stroke-width="1" />
          <line v-for="i in 5" :key="`gh-${i}`"
            x1="0" :y1="TOWER_BOTTOM + 6 + i * 18" :x2="SW" :y2="TOWER_BOTTOM + 6 + i * 18"
            :stroke="T.cyan" :stroke-opacity="0.1 * (1 - i * 0.18)" stroke-width="0.5" />
          <line v-for="i in 12" :key="`gv-${i}`"
            :x1="SW / 2 + ((i - 1) / 11 * SW - SW / 2) * 0.6 * 0.4"
            :y1="TOWER_BOTTOM + 6"
            :x2="SW / 2 + ((i - 1) / 11 * SW - SW / 2) * 0.6 * 1.5"
            :y2="TOWER_BOTTOM + 96"
            :stroke="T.cyan" stroke-opacity="0.08" stroke-width="0.5" />

          <!-- Towers -->
          <g v-for="(d, i) in domains" :key="d.id"
            :transform="`translate(${positions[i]}, 0)`"
            @mouseenter="hover = d.id" @mouseleave="hover = null"
            style="cursor: pointer"
            :opacity="hover && hover !== d.id ? 0.5 : 1"
            class="tower-group">
            <!-- Ambient halo -->
            <rect :x="-12" :y="TOWER_BOTTOM - towerHeight(d.n) - 12"
              :width="TOWER_W + 24" :height="towerHeight(d.n) + 24"
              :fill="d.color" :opacity="hover === d.id ? 0.1 : 0.04"
              style="filter: blur(20px)" />

            <!-- Tower body -->
            <rect x="0" :y="TOWER_BOTTOM - towerHeight(d.n)"
              :width="TOWER_W" :height="towerHeight(d.n) - 8"
              fill="url(#sky-tower-grad)"
              :stroke="d.color" :stroke-opacity="hover === d.id ? 0.7 : 0.35"
              stroke-width="1" rx="2" />

            <!-- Side stripes -->
            <rect x="3" :y="TOWER_BOTTOM - towerHeight(d.n) + 8" width="2"
              :height="towerHeight(d.n) - 24"
              :fill="d.color" :opacity="hover === d.id ? 0.95 : 0.55" />
            <rect :x="TOWER_W - 5" :y="TOWER_BOTTOM - towerHeight(d.n) + 8" width="2"
              :height="towerHeight(d.n) - 24"
              :fill="d.color" :opacity="hover === d.id ? 0.6 : 0.3" />

            <!-- Top spire -->
            <rect :x="TOWER_W / 2 - 2" :y="TOWER_BOTTOM - towerHeight(d.n) - 22"
              width="4" height="22" :fill="d.color" opacity="0.6" />
            <circle :cx="TOWER_W / 2" :cy="TOWER_BOTTOM - towerHeight(d.n) - 26"
              r="3" :fill="d.color"
              :style="`filter: drop-shadow(0 0 8px ${d.color}); animation-delay: ${i * 0.25}s`"
              class="spire-light" />

            <!-- Hot indicator -->
            <circle v-if="d.hot"
              :cx="TOWER_W / 2" :cy="TOWER_BOTTOM - towerHeight(d.n) - 26"
              r="6" fill="none" :stroke="T.amber" stroke-width="1"
              class="hot-pulse" />

            <!-- Windows -->
            <g v-for="w in computeWindows(d)" :key="w.i">
              <rect v-if="w.lit" :x="w.x - 1" :y="w.y - 1" :width="16" :height="10"
                rx="1.5" :fill="d.color" opacity="0.35" style="filter: blur(2px)" />
              <rect :x="w.x" :y="w.y" width="14" height="8" rx="1.2"
                :fill="w.lit ? d.color : w.partial ? `${d.color}66` : '#10131f'"
                :stroke="w.lit ? 'rgba(255,255,255,0.5)' : `${d.color}22`"
                stroke-width="0.5"
                :opacity="w.lit ? 1 : w.partial ? 0.8 : 0.55" />
            </g>

            <!-- Pedestal -->
            <rect x="-6" :y="TOWER_BOTTOM - 8" :width="TOWER_W + 12" :height="PEDESTAL_H"
              fill="#0a0e1c" :stroke="d.color" stroke-opacity="0.45" stroke-width="0.8" rx="2" />
            <rect x="-6" :y="TOWER_BOTTOM - 8" :width="TOWER_W + 12" height="3"
              :fill="d.color" :opacity="hover === d.id ? 0.7 : 0.45" />

            <!-- Reflection -->
            <rect x="6" :y="TOWER_BOTTOM + 8" :width="TOWER_W - 12"
              :height="Math.min(70, towerHeight(d.n) * 0.35)"
              :fill="`url(#sky-refl-${d.id})`" :opacity="hover === d.id ? 0.45 : 0.28" />

            <!-- Tower name -->
            <g :transform="`translate(${TOWER_W / 2}, ${TOWER_BOTTOM - towerHeight(d.n) - 60})`">
              <text text-anchor="middle" :fill="d.color" font-size="9.5"
                :font-family="T.mono" letter-spacing="0.18em" opacity="0.9">
                {{ d.en }}
              </text>
              <text text-anchor="middle" y="16" :fill="T.text" font-size="14"
                :font-family="T.serif" font-weight="500">
                {{ d.name }}
              </text>
              <text text-anchor="middle" y="34" :fill="d.color" font-size="18"
                :font-family="T.serif" font-weight="500">
                {{ Math.round(d.m * 100) }}<tspan font-size="10" :fill="T.textSub">%</tspan>
              </text>
              <text text-anchor="middle" y="48" :fill="T.textTri" font-size="9.5" :font-family="T.mono">
                {{ Math.round(d.n * d.m) }} / {{ d.n }} 概念
              </text>
            </g>
          </g>
        </svg>

        <!-- Hover callout -->
        <div v-if="hoveredDomain" class="sky-callout"
          :style="`border-color: ${hoveredDomain.color}55; box-shadow: 0 12px 36px rgba(0,0,0,0.6), 0 0 24px ${hoveredDomain.color}33`">
          <div class="sky-callout-eyebrow" :style="`color: ${hoveredDomain.color}`">
            {{ hoveredDomain.en }} · DOMAIN
          </div>
          <div class="sky-callout-title">{{ hoveredDomain.name }}</div>
          <div class="sky-callout-stats">
            <div>
              <div class="sky-callout-stat-label">掌握</div>
              <div class="sky-callout-stat-val" :style="`color: ${hoveredDomain.color}`">
                {{ Math.round(hoveredDomain.m * 100) }}%
              </div>
            </div>
            <div>
              <div class="sky-callout-stat-label">已点亮</div>
              <div class="sky-callout-stat-val">
                {{ Math.round(hoveredDomain.n * hoveredDomain.m) }}/{{ hoveredDomain.n }}
              </div>
            </div>
          </div>
          <div class="sky-callout-desc">
            {{ hoveredDomain.hot
              ? `评估发现这里有 ${hoveredDomain.n - Math.round(hoveredDomain.n * hoveredDomain.m)} 个未点亮的窗户 — 路径智能体已优先插入补弱节点。`
              : hoveredDomain.m > 0.7
                ? '这座塔几乎全亮，可挑战更深层的认知层级，或尝试阶段测评验证掌握度。'
                : '稳步推进中，资源推荐智能体已为你匹配了专项练习和思维导图资源。' }}
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="sky-legend">
        <span class="sky-legend-label">LEGEND</span>
        <span class="sky-legend-item">
          <span class="sky-legend-swatch" :style="`background: ${T.cyan}; box-shadow: 0 0 6px ${T.cyan}`" />
          已掌握
        </span>
        <span class="sky-legend-item">
          <span class="sky-legend-swatch" :style="`background: ${T.cyan}66`" />
          进行中
        </span>
        <span class="sky-legend-item">
          <span class="sky-legend-swatch sky-legend-swatch-off" />
          未点亮
        </span>
        <span class="sky-legend-item">
          <span class="sky-legend-dot" :style="`background: ${T.amber}; box-shadow: 0 0 8px ${T.amber}`" />
          评估标记为待加强
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-skyline {
  padding: 40px 0 60px;
  position: relative;
}

.skyline-inner {
  max-width: 1840px;
  margin: 0 auto;
  padding: 0 40px;
}

.sky-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  gap: 24px;
  flex-wrap: wrap;
}

.section-eyebrow {
  font-size: 10px;
  letter-spacing: 0.24em;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.eyebrow-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse-soft 1.5s ease-in-out infinite;
}

.section-title-hp {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-size: 40px;
  font-weight: 500;
  color: #e8edf5;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

.section-desc-hp {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: #8892b0;
  max-width: 620px;
}

.sky-stats {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 22px;
  background: rgba(10, 12, 28, 0.65);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  backdrop-filter: blur(12px);
}

.sky-stat-label {
  font-size: 9px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
}

.sky-stat-val {
  font-family: 'Instrument Serif', serif;
  font-size: 36px;
  line-height: 1;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.sky-stat-val-sm { font-size: 24px; }

.sky-stat-unit {
  font-size: 14px;
  color: #8892b0;
}

.sky-stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.08);
}

.sky-canvas {
  position: relative;
  background:
    radial-gradient(ellipse 1200px 400px at 50% 110%, rgba(0, 212, 255, 0.06), transparent 70%),
    linear-gradient(180deg, #06081c 0%, #050610 60%, #030410 100%);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}

.sky-svg {
  display: block;
  width: 100%;
}

.tower-group {
  transition: opacity 0.3s ease;
}

.sky-star {
  animation: twinkle 3s ease-in-out infinite;
}

.spire-light {
  animation: pulse-soft 1.8s ease-in-out infinite;
}

.hot-pulse {
  animation: pulse-ring 1.8s ease-out infinite;
  transform-origin: center;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Hover callout */
.sky-callout {
  position: absolute;
  right: 24px;
  top: 24px;
  width: 280px;
  padding: 18px;
  background: rgba(8, 10, 24, 0.95);
  border: 1px solid;
  border-radius: 12px;
  backdrop-filter: blur(16px);
  pointer-events: none;
  z-index: 5;
}

.sky-callout-eyebrow {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.2em;
  margin-bottom: 6px;
}

.sky-callout-title {
  font-family: 'Instrument Serif', serif;
  font-size: 22px;
  color: #e8edf5;
  margin-bottom: 12px;
}

.sky-callout-stats {
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
}

.sky-callout-stat-label {
  font-size: 9px;
  color: #4a5568;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.14em;
}

.sky-callout-stat-val {
  font-family: 'Instrument Serif', serif;
  font-size: 22px;
  color: #e8edf5;
}

.sky-callout-desc {
  font-size: 11.5px;
  color: #8892b0;
  line-height: 1.5;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* Legend */
.sky-legend {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 11px;
  color: #8892b0;
}

.sky-legend-label {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  color: #4a5568;
}

.sky-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.sky-legend-swatch {
  display: inline-block;
  width: 11px;
  height: 7px;
  border-radius: 1px;
}

.sky-legend-swatch-off {
  background: #10131f;
  border: 1px solid #4a5568;
}

.sky-legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse-soft 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot, .sky-legend-dot, .spire-light, .hot-pulse, .sky-star {
    animation: none !important;
  }
  .tower-group {
    transition: none !important;
  }
}

@media (max-width: 900px) {
  .section-skyline { padding: 40px 0 40px; }
  .skyline-inner { padding: 0 16px; }
  .section-title-hp { font-size: 28px; }
  .sky-header { flex-direction: column; align-items: flex-start; }
}
</style>
