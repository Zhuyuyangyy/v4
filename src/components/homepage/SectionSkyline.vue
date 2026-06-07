<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type DomainId = 'lang' | 'ds' | 'sys' | 'math' | 'ml' | 'dl'

interface Domain {
  id: DomainId
  name: string
  code: string
  color: string
  n: number
  mastery: number
  width: number
  cols: number
  winW: number
  winH: number
  gapX: number
  gapY: number
  roof: 'terrace' | 'antenna' | 'twin' | 'slope' | 'frame' | 'spire'
  weekly: number[]
  hot: number[]
  story: string
  next: string
}

interface WindowCell {
  x: number
  y: number
  i: number
  lit: boolean
  partial: boolean
  hot: boolean
  weekly: boolean
}

const C = {
  text: '#e8edf5',
  sub: '#91a3c7',
  dim: '#54627f',
  amber: '#f0b24a',
  mono: "'JetBrains Mono', monospace",
  sans: "'Outfit', 'PingFang SC', sans-serif",
}

const domains: Domain[] = [
  {
    id: 'lang',
    name: '语言基础',
    code: 'LANG',
    color: '#4A8DFF',
    n: 24,
    mastery: 0.90,
    width: 118,
    cols: 4,
    winW: 15,
    winH: 9,
    gapX: 10,
    gapY: 10,
    roof: 'terrace',
    weekly: [17, 18],
    hot: [],
    story: 'C / Python 基础最稳，语法、指针与函数调用已形成高亮区域。',
    next: '进入更复杂的内存模型与工程实践题。',
  },
  {
    id: 'ds',
    name: '数据结构',
    code: 'DS',
    color: '#35E0D8',
    n: 22,
    mastery: 0.78,
    width: 148,
    cols: 5,
    winW: 14,
    winH: 9,
    gapX: 9,
    gapY: 10,
    roof: 'antenna',
    weekly: [14, 15, 16],
    hot: [19],
    story: '线性表和树结构已点亮，图遍历仍在形成稳定掌握。',
    next: '补强 BFS visited、队列空判和复杂度分析。',
  },
  {
    id: 'sys',
    name: '计算机系统',
    code: 'SYS',
    color: '#4FD483',
    n: 18,
    mastery: 0.58,
    width: 132,
    cols: 3,
    winW: 18,
    winH: 8,
    gapX: 14,
    gapY: 11,
    roof: 'twin',
    weekly: [8, 9],
    hot: [13],
    story: '进程、内存和 I/O 概念正在建造中，已掌握部分核心框架。',
    next: '继续点亮虚拟内存、缓存局部性与系统调用链路。',
  },
  {
    id: 'math',
    name: '数学基础',
    code: 'MATH',
    color: '#86B7FF',
    n: 20,
    mastery: 0.82,
    width: 104,
    cols: 4,
    winW: 12,
    winH: 10,
    gapX: 9,
    gapY: 9,
    roof: 'spire',
    weekly: [13, 14],
    hot: [],
    story: '离散数学与概率基础稳定，为算法和模型理解提供支撑。',
    next: '引入矩阵分解、贝叶斯推断和优化直觉。',
  },
  {
    id: 'ml',
    name: '机器学习',
    code: 'ML',
    color: '#F0B24A',
    n: 20,
    mastery: 0.65,
    width: 154,
    cols: 5,
    winW: 13,
    winH: 9,
    gapX: 10,
    gapY: 10,
    roof: 'slope',
    weekly: [10, 11],
    hot: [15],
    story: '监督学习和评估指标已建立，高阶泛化能力仍在加固。',
    next: '补弱正则化、交叉验证和特征工程判断。',
  },
  {
    id: 'dl',
    name: '深度学习',
    code: 'DL',
    color: '#F06A7E',
    n: 16,
    mastery: 0.42,
    width: 126,
    cols: 4,
    winW: 14,
    winH: 8,
    gapX: 10,
    gapY: 11,
    roof: 'frame',
    weekly: [5],
    hot: [8, 10],
    story: '这座塔还在搭脚手架，基础模块已点亮，但网络结构理解仍不稳定。',
    next: '优先补强反向传播、卷积结构和训练稳定性。',
  },
]

const SW = 1760
const SH = 560
const GROUND = 462
const MIN_H = 150
const MAX_H = 330
const positions = [118, 382, 650, 912, 1168, 1442]
const selectedId = ref<DomainId>('ds')
const hoverId = ref<DomainId | null>(null)
const locked = ref(false)
const weeklyGlow = ref(false)
const particleSeed = ref(0)

const totalConcepts = computed(() => domains.reduce((sum, d) => sum + d.n, 0))
const masteredTotal = computed(() => domains.reduce((sum, d) => sum + Math.round(d.n * d.mastery), 0))
const overall = computed(() => Math.round((masteredTotal.value / totalConcepts.value) * 100))
const activeDomain = computed(() => (
  domains.find(d => d.id === (hoverId.value ?? selectedId.value)) ?? domains[0]
))
const weeklyTotal = computed(() => domains.reduce((sum, d) => sum + d.weekly.length, 0))

function towerHeight(d: Domain) {
  const conceptWeight = Math.min(1, d.n / 24)
  const masteryWeight = 0.36 + d.mastery * 0.64
  return MIN_H + (MAX_H - MIN_H) * conceptWeight * masteryWeight
}

function towerTop(d: Domain) {
  return GROUND - towerHeight(d)
}

function masteredCount(d: Domain) {
  return Math.round(d.n * d.mastery)
}

function windowsFor(d: Domain): WindowCell[] {
  const rows = Math.ceil(d.n / d.cols)
  const gridW = d.cols * d.winW + (d.cols - 1) * d.gapX
  const gridH = rows * d.winH + (rows - 1) * d.gapY
  const startX = (d.width - gridW) / 2
  const startY = Math.max(42, towerHeight(d) - gridH - 34)
  const mastered = masteredCount(d)
  return Array.from({ length: d.n }, (_, i) => {
    const rowFromBottom = Math.floor(i / d.cols)
    const col = i % d.cols
    const visualRow = rows - 1 - rowFromBottom
    return {
      x: startX + col * (d.winW + d.gapX),
      y: startY + visualRow * (d.winH + d.gapY),
      i,
      lit: i < mastered,
      partial: i >= mastered && i < Math.min(d.n, mastered + 2),
      hot: d.hot.includes(i),
      weekly: d.weekly.includes(i),
    }
  })
}

function selectDomain(id: DomainId) {
  selectedId.value = id
  locked.value = true
}

function triggerWeekly() {
  weeklyGlow.value = false
  window.requestAnimationFrame(() => {
    particleSeed.value += 1
    weeklyGlow.value = true
    window.setTimeout(() => {
      weeklyGlow.value = false
    }, 2600)
  })
}

let cycleTimer: ReturnType<typeof window.setInterval> | undefined

onMounted(() => {
  cycleTimer = window.setInterval(() => {
    if (hoverId.value || locked.value) return
    const index = domains.findIndex(d => d.id === selectedId.value)
    selectedId.value = domains[(index + 1) % domains.length].id
  }, 3400)
})

onBeforeUnmount(() => {
  if (cycleTimer) window.clearInterval(cycleTimer)
})
</script>

<template>
  <section class="section-skyline">
    <div class="skyline-inner">
      <header class="sky-header">
        <div>
          <div class="sky-eyebrow">
            <span />
            KNOWLEDGE HORIZON
          </div>
          <h2>
            你的知识地平线
            <strong>{{ masteredTotal }}</strong>
            / {{ totalConcepts }} 概念已点亮
          </h2>
          <p>每座塔是一块学科域，每扇窗是一枚具体知识点。城市越亮，学习画像越清晰。</p>
        </div>

        <div class="sky-actions">
          <div class="sky-score">
            <span>MASTERY</span>
            <strong>{{ overall }}%</strong>
          </div>
          <button type="button" class="weekly-button" :class="{ active: weeklyGlow }" @click="triggerWeekly">
            <span>THIS WEEK</span>
            <strong>+{{ weeklyTotal }}</strong>
          </button>
        </div>
      </header>

      <div class="skyline-board">
        <div class="sky-canvas">
          <svg :viewBox="`0 0 ${SW} ${SH}`" class="sky-svg" role="img" aria-label="知识地平线城市天际线">
            <defs>
              <linearGradient id="horizon-band" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#4A8DFF" stop-opacity="0.10" />
                <stop offset="45%" stop-color="#35E0D8" stop-opacity="0.22" />
                <stop offset="100%" stop-color="#F06A7E" stop-opacity="0.16" />
              </linearGradient>
              <linearGradient
                v-for="d in domains"
                :key="`body-${d.id}`"
                :id="`body-${d.id}`"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" :stop-color="d.color" stop-opacity="0.16" />
                <stop offset="100%" stop-color="#070B1A" stop-opacity="0.72" />
              </linearGradient>
            </defs>

            <g class="sky-depth">
              <circle v-for="i in 44" :key="i" :cx="38 + i * 41" :cy="36 + (i * 37) % 170" :r="i % 5 === 0 ? 1.25 : 0.7" />
            </g>

            <path
              class="horizon-band"
              :d="`M 40 ${GROUND + 10} C 380 ${GROUND - 32}, 650 ${GROUND + 36}, 940 ${GROUND} S 1430 ${GROUND - 26}, 1720 ${GROUND + 6}`"
            />

            <g
              v-for="(d, index) in domains"
              :key="d.id"
              class="tower"
              :class="{ active: activeDomain.id === d.id, muted: activeDomain.id !== d.id }"
              :style="`--tower-color: ${d.color}; --tower-delay: ${index * 120}ms`"
              :transform="`translate(${positions[index]}, ${activeDomain.id === d.id ? -8 : 0})`"
              @mouseenter="hoverId = d.id"
              @mouseleave="hoverId = null"
              @click="selectDomain(d.id)"
            >
              <g class="tower-label" :transform="`translate(${d.width / 2}, ${Math.max(30, towerTop(d) - 72)})`">
                <text class="tower-title" text-anchor="middle">{{ d.name }} {{ d.code }}</text>
                <text class="tower-meta" y="23" text-anchor="middle">
                  {{ Math.round(d.mastery * 100) }}% · {{ masteredCount(d) }}/{{ d.n }} 概念
                </text>
              </g>

              <g class="tower-building" :transform="`translate(0, ${towerTop(d)})`">
                <path
                  v-if="d.roof === 'slope'"
                  class="tower-roof"
                  :d="`M 0 30 L ${d.width * 0.66} 0 L ${d.width} 30 Z`"
                />
                <path
                  v-else-if="d.roof === 'spire'"
                  class="tower-roof"
                  :d="`M ${d.width * 0.18} 34 L ${d.width / 2} 0 L ${d.width * 0.82} 34 Z`"
                />
                <path
                  v-else-if="d.roof === 'twin'"
                  class="tower-roof"
                  :d="`M 0 24 L 0 8 L ${d.width * 0.42} 8 L ${d.width * 0.42} 0 L ${d.width * 0.58} 0 L ${d.width * 0.58} 8 L ${d.width} 8 L ${d.width} 24 Z`"
                />
                <path
                  v-else-if="d.roof === 'antenna'"
                  class="tower-roof"
                  :d="`M 0 26 L ${d.width} 26 L ${d.width} 42 L 0 42 Z M ${d.width / 2} 26 L ${d.width / 2} 0`"
                />
                <path
                  v-else-if="d.roof === 'frame'"
                  class="tower-roof scaffold"
                  :d="`M 0 28 L ${d.width} 28 M ${d.width * 0.18} 28 L ${d.width * 0.5} 0 L ${d.width * 0.82} 28`"
                />
                <path
                  v-else
                  class="tower-roof"
                  :d="`M 0 24 L ${d.width} 24 L ${d.width} 38 L 0 38 Z`"
                />

                <rect
                  class="tower-body"
                  :x="0"
                  :y="d.roof === 'frame' ? 28 : 30"
                  :width="d.width"
                  :height="towerHeight(d) - 30"
                  :fill="`url(#body-${d.id})`"
                />

                <g v-if="d.roof === 'frame'" class="scaffold-lines">
                  <line v-for="n in 5" :key="`v-${n}`" :x1="(n - 1) * d.width / 4" :y1="32" :x2="(n - 1) * d.width / 4" :y2="towerHeight(d) - 6" />
                  <line v-for="n in 7" :key="`h-${n}`" x1="0" :y1="42 + n * 22" :x2="d.width" :y2="42 + n * 22" />
                  <line x1="0" y1="34" :x2="d.width" :y2="towerHeight(d) - 8" />
                  <line :x1="d.width" y1="34" x2="0" :y2="towerHeight(d) - 8" />
                </g>

                <g class="window-grid">
                  <rect
                    v-for="cell in windowsFor(d)"
                    :key="cell.i"
                    class="window-cell"
                    :class="{
                      lit: cell.lit,
                      partial: cell.partial,
                      hot: cell.hot,
                      weekly: cell.weekly,
                      weeklyActive: weeklyGlow && cell.weekly,
                    }"
                    :style="`--cell-color: ${cell.hot ? C.amber : d.color}; --cell-delay: ${(index * 90) + (cell.i % d.cols) * 55 + Math.floor(cell.i / d.cols) * 80}ms`"
                    :x="cell.x"
                    :y="cell.y"
                    :width="d.winW"
                    :height="d.winH"
                    rx="2"
                  />
                </g>

                <g v-if="weeklyGlow" class="weekly-particles" :key="particleSeed">
                  <circle
                    v-for="cell in windowsFor(d).filter(w => w.weekly)"
                    :key="`p-${cell.i}`"
                    class="weekly-particle"
                    :style="`--particle-delay: ${cell.i * 70}ms; --cell-color: ${d.color}`"
                    :cx="cell.x + d.winW / 2"
                    :cy="cell.y + d.winH / 2"
                    r="2"
                  />
                </g>

                <rect class="tower-base" :x="-8" :y="towerHeight(d) - 8" :width="d.width + 16" height="16" rx="3" />
              </g>
            </g>
          </svg>
        </div>

        <aside class="sky-detail" :style="`--detail-color: ${activeDomain.color}`">
          <div class="detail-kicker">ACTIVE DOMAIN</div>
          <h3>{{ activeDomain.name }} {{ activeDomain.code }}</h3>
          <p>{{ activeDomain.story }}</p>

          <div class="detail-stats">
            <div>
              <span>WINDOWS</span>
              <strong>{{ activeDomain.n }}</strong>
            </div>
            <div>
              <span>LIT</span>
              <strong>{{ masteredCount(activeDomain) }}</strong>
            </div>
            <div>
              <span>FOCUS</span>
              <strong>{{ activeDomain.hot.length }}</strong>
            </div>
          </div>

          <div class="detail-next">
            <span>NEXT ACTION</span>
            <strong>{{ activeDomain.next }}</strong>
          </div>
        </aside>
      </div>

      <div class="sky-legend">
        <span>LEGEND</span>
        <i class="legend-lit" /> 已掌握
        <i class="legend-partial" /> 进行中
        <i class="legend-empty" /> 未点亮
        <i class="legend-hot" /> 待加强
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-skyline {
  position: relative;
  padding: 44px 0 56px;
}

.skyline-inner {
  max-width: 1840px;
  margin: 0 auto;
  padding: 0 40px;
}

.sky-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  margin-bottom: 22px;
}

.sky-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.22em;
}

.sky-eyebrow span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #35e0d8;
  animation: soft-pulse 1.6s ease-in-out infinite;
}

.sky-header h2 {
  margin: 10px 0 0;
  color: #f7fbff;
  font-family: var(--font-display, 'Outfit', 'PingFang SC', sans-serif);
  font-size: clamp(30px, 3vw, 46px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: 0;
}

.sky-header h2 strong {
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
}

.sky-header p {
  max-width: 680px;
  margin: 10px 0 0;
  color: #91a3c7;
  font-size: 14px;
  line-height: 1.7;
}

.sky-actions {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.sky-score,
.weekly-button {
  min-width: 126px;
  padding: 13px 15px;
  border: 1px solid rgba(150, 175, 220, 0.14);
  border-radius: 13px;
  background: rgba(8, 12, 30, 0.24);
  backdrop-filter: blur(12px) saturate(1.14);
}

.sky-score span,
.weekly-button span {
  display: block;
  color: #7f93ba;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.sky-score strong,
.weekly-button strong {
  display: block;
  margin-top: 4px;
  color: #f7fbff;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 28px;
  line-height: 1;
}

.weekly-button {
  appearance: none;
  cursor: pointer;
  text-align: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease, background 0.22s ease;
}

.weekly-button:hover,
.weekly-button.active {
  transform: translateY(-2px);
  border-color: rgba(53, 224, 216, 0.42);
  background: linear-gradient(135deg, rgba(53, 224, 216, 0.12), rgba(8, 12, 30, 0.24));
}

.weekly-button:active {
  transform: scale(0.98);
}

.skyline-board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 14px;
  align-items: stretch;
}

.sky-canvas,
.sky-detail {
  border: 1px solid rgba(150, 175, 220, 0.13);
  border-radius: 16px;
  background:
    radial-gradient(ellipse at 50% 108%, rgba(53, 224, 216, 0.10), transparent 62%),
    linear-gradient(180deg, rgba(6, 8, 28, 0.34), rgba(4, 6, 16, 0.16));
  backdrop-filter: blur(8px) saturate(1.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}

.sky-canvas {
  position: relative;
  overflow: auto hidden;
}

.sky-svg {
  display: block;
  width: 100%;
  min-width: 1080px;
  height: auto;
}

.sky-depth circle {
  fill: rgba(220, 236, 255, 0.42);
  animation: star-drift 12s ease-in-out infinite alternate;
}

.horizon-band {
  fill: none;
  stroke: url(#horizon-band);
  stroke-width: 18;
  stroke-linecap: round;
  filter: blur(1px);
  stroke-dasharray: 80 38;
  animation: horizon-flow 18s linear infinite;
}

.tower {
  cursor: pointer;
  opacity: 0;
  animation: tower-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--tower-delay);
  transition: opacity 0.28s ease;
}

.tower.muted {
  opacity: 0.48;
}

.tower.active {
  opacity: 1;
}

.tower-label {
  pointer-events: none;
}

.tower-title {
  fill: #f7fbff;
  font-family: var(--font-display, 'Outfit', 'PingFang SC', sans-serif);
  font-size: 17px;
  font-weight: 760;
}

.tower-meta {
  fill: #91a3c7;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.tower-roof,
.tower-body {
  stroke: color-mix(in srgb, var(--tower-color) 42%, rgba(255,255,255,0.10));
  stroke-width: 1;
}

.tower-roof {
  fill: rgba(6, 9, 22, 0.70);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.tower.active .tower-body,
.tower.active .tower-roof {
  filter: drop-shadow(0 0 14px color-mix(in srgb, var(--tower-color) 35%, transparent));
}

.scaffold {
  fill: none;
}

.scaffold-lines line {
  stroke: color-mix(in srgb, var(--tower-color) 34%, rgba(255,255,255,0.08));
  stroke-width: 1;
  opacity: 0.7;
}

.window-cell {
  fill: rgba(10, 15, 34, 0.72);
  stroke: color-mix(in srgb, var(--cell-color) 26%, rgba(255,255,255,0.12));
  stroke-width: 0.8;
  opacity: 0;
  animation: window-on 0.45s ease forwards;
  animation-delay: var(--cell-delay);
}

.window-cell.lit {
  fill: color-mix(in srgb, var(--cell-color) 72%, rgba(255,255,255,0.16));
  stroke: color-mix(in srgb, var(--cell-color) 78%, white);
}

.window-cell.partial {
  fill: color-mix(in srgb, var(--cell-color) 38%, rgba(10, 15, 34, 0.74));
  animation: window-on 0.45s ease forwards, partial-breathe 2.8s ease-in-out infinite;
}

.window-cell.hot {
  fill: color-mix(in srgb, #f0b24a 72%, rgba(10, 15, 34, 0.28));
  stroke: #ffd18a;
  animation: window-on 0.45s ease forwards, hot-beacon 1.4s ease-in-out infinite;
}

.window-cell.weeklyActive {
  animation: weekly-pop 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards, hot-beacon 1.1s ease-in-out infinite;
}

.weekly-particle {
  fill: var(--cell-color);
  opacity: 0;
  animation: particle-rise 1.2s ease-out forwards;
  animation-delay: var(--particle-delay);
}

.tower-base {
  fill: color-mix(in srgb, var(--tower-color) 18%, rgba(6, 9, 22, 0.86));
  stroke: color-mix(in srgb, var(--tower-color) 38%, rgba(255,255,255,0.08));
}

.sky-detail {
  --detail-color: #35e0d8;
  min-height: 100%;
  padding: 18px;
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--detail-color) 14%, transparent), transparent 42%),
    rgba(8, 12, 30, 0.26);
}

.detail-kicker,
.detail-stats span,
.detail-next span {
  color: #7f93ba;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.sky-detail h3 {
  margin: 9px 0 0;
  color: #f7fbff;
  font-size: 22px;
  font-weight: 780;
}

.sky-detail p {
  margin: 10px 0 14px;
  color: #9badcc;
  font-size: 13px;
  line-height: 1.7;
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.detail-stats div {
  display: grid;
  gap: 6px;
}

.detail-stats strong {
  color: var(--detail-color);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 24px;
}

.detail-next {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--detail-color) 30%, rgba(255,255,255,0.08));
  border-radius: 13px;
  background: color-mix(in srgb, var(--detail-color) 8%, rgba(255,255,255,0.035));
}

.detail-next strong {
  color: #e8edf5;
  font-size: 13px;
  line-height: 1.6;
}

.sky-legend {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 16px;
  color: #91a3c7;
  font-size: 11px;
}

.sky-legend span {
  color: #54627f;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  letter-spacing: 0.18em;
}

.sky-legend i {
  display: inline-block;
  width: 12px;
  height: 8px;
  border-radius: 2px;
}

.legend-lit { background: #35e0d8; }
.legend-partial { background: rgba(53, 224, 216, 0.42); }
.legend-empty { border: 1px solid #54627f; background: rgba(10, 15, 34, 0.72); }
.legend-hot { background: #f0b24a; }

@keyframes tower-rise {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes window-on {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes partial-breathe {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

@keyframes hot-beacon {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(240,178,74,0)); }
  50% { filter: drop-shadow(0 0 8px rgba(240,178,74,0.75)); }
}

@keyframes weekly-pop {
  0% { opacity: 0.35; transform: scale(0.84); }
  55% { opacity: 1; transform: scale(1.35); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes particle-rise {
  0% { opacity: 0.9; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-32px) scale(0.2); }
}

@keyframes horizon-flow {
  to { stroke-dashoffset: -118; }
}

@keyframes star-drift {
  from { opacity: 0.22; transform: translateX(0); }
  to { opacity: 0.58; transform: translateX(8px); }
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.42; transform: scale(0.76); }
}

@media (prefers-reduced-motion: reduce) {
  .sky-eyebrow span,
  .sky-depth circle,
  .horizon-band,
  .tower,
  .window-cell,
  .window-cell.partial,
  .window-cell.hot,
  .weekly-particle {
    animation: none !important;
  }
}

@media (max-width: 1100px) {
  .sky-header,
  .skyline-board {
    grid-template-columns: 1fr;
  }

  .sky-detail {
    min-height: auto;
  }
}

@media (max-width: 720px) {
  .section-skyline {
    padding: 42px 0 46px;
  }

  .skyline-inner {
    padding: 0 16px;
  }

  .sky-actions {
    width: 100%;
  }

  .sky-score,
  .weekly-button {
    flex: 1;
    min-width: 0;
  }
}
</style>
