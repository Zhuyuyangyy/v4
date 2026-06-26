<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

type DomainId = 'clang' | 'ds' | 'algo' | 'os' | 'net' | 'db' | 'ml'

interface Domain {
  id: DomainId
  name: string
  short: string
  color: string
  mastery: number
  concepts: number
  weak: string[]
  next: string
}

const C = {
  text: '#e8edf5',
  sub: '#91a3c7',
  dim: '#54627f',
  cyan: '#22d3ee',
  sans: "'Outfit', 'PingFang SC', sans-serif",
}

const domains: Domain[] = [
  { id: 'clang', name: 'C语言', short: 'C', color: '#4A8DFF', mastery: 0.88, concepts: 42, weak: ['二级指针', '内存对齐'], next: '强化指针与内存模型专项' },
  { id: 'ds', name: '数据结构', short: 'DS', color: '#35E0D8', mastery: 0.76, concepts: 38, weak: ['图遍历', 'BFS visited'], next: '补全图算法与复杂度分析' },
  { id: 'algo', name: '算法', short: 'AL', color: '#4FD483', mastery: 0.72, concepts: 45, weak: ['动态规划', '二分边界'], next: '练习典型 DP 与二分变形' },
  { id: 'os', name: '操作系统', short: 'OS', color: '#86B7FF', mastery: 0.61, concepts: 34, weak: ['虚拟内存', '进程调度'], next: '梳理内存管理与同步原语' },
  { id: 'net', name: '计算机网络', short: 'NET', color: '#A78BFA', mastery: 0.55, concepts: 28, weak: ['TCP 拥塞控制', 'HTTP/2'], next: '深入传输层与协议栈' },
  { id: 'db', name: '数据库', short: 'DB', color: '#F0B24A', mastery: 0.49, concepts: 30, weak: ['索引优化', '事务隔离'], next: '掌握 SQL 执行计划与锁' },
  { id: 'ml', name: '机器学习', short: 'ML', color: '#F06A7E', mastery: 0.38, concepts: 36, weak: ['反向传播', '正则化'], next: '夯实线性模型与梯度下降' },
]

const graphW = 520
const graphH = 360
const center = { x: graphW / 2, y: graphH / 2 }
const orbitR = 118

function nodePos(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return {
    x: center.x + orbitR * Math.cos(angle),
    y: center.y + orbitR * Math.sin(angle),
  }
}

const nodePositions = computed(() => domains.map((_, i) => nodePos(i, domains.length)))

const selectedId = ref<DomainId>('ds')
const hoverId = ref<DomainId | null>(null)
const activeDomain = computed(() => (
  domains.find(d => d.id === (hoverId.value ?? selectedId.value)) ?? domains[0]
))

function selectDomain(id: DomainId) {
  selectedId.value = id
}

function formatPct(n: number) {
  return `${Math.round(n * 100)}%`
}

const distribution = computed(() => {
  const mastered = domains.filter(d => d.mastery >= 0.8).length
  const fair = domains.filter(d => d.mastery >= 0.5 && d.mastery < 0.8).length
  const weak = domains.filter(d => d.mastery < 0.5).length
  const total = domains.length
  return [
    { label: '已掌握', pct: Math.round((mastered / total) * 100), color: '#4FD483' },
    { label: '一般', pct: Math.round((fair / total) * 100), color: '#F0B24A' },
    { label: '待提升', pct: Math.round((weak / total) * 100), color: '#F06A7E' },
  ]
})

const weakPoints = computed(() => {
  return domains
    .flatMap(d => d.weak.map(w => ({
      name: w,
      domain: d.name,
      color: d.color,
      value: Math.round((1 - d.mastery) * 100),
    })))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
})

const totalConcepts = computed(() => domains.reduce((s, d) => s + d.concepts, 0))
const overallMastery = computed(() => Math.round((domains.reduce((s, d) => s + d.mastery, 0) / domains.length) * 100))

const radarChartRef = ref<HTMLDivElement | null>(null)
let radarChart: echarts.ECharts | null = null

function initRadarChart() {
  if (!radarChartRef.value) return
  radarChart = echarts.init(radarChartRef.value)
  updateRadarChart()
}

function updateRadarChart() {
  if (!radarChart) return
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    legend: {
      data: ['当前水平', '目标水平'],
      textStyle: { color: '#7f93ba', fontSize: 10 },
      right: 0,
      top: 0,
      itemWidth: 8,
      itemHeight: 8,
    },
    radar: {
      indicator: [
        { name: '编码能力', max: 100 },
        { name: '算法思维', max: 100 },
        { name: '系统设计', max: 100 },
        { name: '数学基础', max: 100 },
        { name: '机器学习', max: 100 },
        { name: '工程实践', max: 100 },
      ],
      radius: '62%',
      center: ['50%', '54%'],
      axisName: { color: '#9badcc', fontSize: 10 },
      splitArea: { areaStyle: { color: ['rgba(150,175,220,0.05)', 'rgba(150,175,220,0.02)'] } },
      axisLine: { lineStyle: { color: 'rgba(150,175,220,0.12)' } },
      splitLine: { lineStyle: { color: 'rgba(150,175,220,0.10)' } },
    },
    series: [{
      type: 'radar',
      data: [
        { value: [82, 74, 58, 78, 42, 64], name: '当前水平', itemStyle: { color: '#22d3ee' }, areaStyle: { color: 'rgba(34,211,238,0.18)' } },
        { value: [90, 88, 80, 85, 78, 82], name: '目标水平', itemStyle: { color: '#a78bfa' }, lineStyle: { type: 'dashed' }, areaStyle: { color: 'rgba(167,139,250,0.08)' } },
      ],
    }],
  }
  radarChart.setOption(option)
}

function handleResize() {
  radarChart?.resize()
}

onMounted(() => {
  nextTick(() => initRadarChart())
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  radarChart?.dispose()
})
</script>

<template>
  <section class="section-skyline">
    <div class="skyline-inner">
      <header class="sky-header">
        <div>
          <div class="sky-eyebrow"><span />KNOWLEDGE MAP</div>
          <h2>知识地图</h2>
          <p class="sky-sub">以学习中枢为核心，查看各学科域的掌握度与薄弱连接。</p>
        </div>
        <div class="sky-score glass-card">
          <span>总体掌握度</span>
          <strong>{{ overallMastery }}%</strong>
        </div>
      </header>

      <div class="knowledge-board">
        <div class="graph-panel glass-card">
          <div class="graph-header">
            <span class="card-title">知识成长图谱</span>
            <span class="graph-meta">{{ totalConcepts }} 知识点 · {{ domains.length }} 域</span>
          </div>
          <div class="graph-shell">
            <svg :viewBox="`0 0 ${graphW} ${graphH}`" class="knowledge-svg">
              <defs>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g class="graph-links">
                <line
                  v-for="(d, i) in domains"
                  :key="`link-${d.id}`"
                  :x1="center.x"
                  :y1="center.y"
                  :x2="nodePositions[i].x"
                  :y2="nodePositions[i].y"
                  :stroke="d.color"
                  :class="{ active: activeDomain.id === d.id }"
                  :style="{ '--link-color': d.color }"
                />
                <line x1="nodePositions[1].x" y1="nodePositions[1].y" x2="nodePositions[2].x" y2="nodePositions[2].y" stroke="rgba(150,175,220,0.12)" />
                <line x1="nodePositions[3].x" y1="nodePositions[3].y" x2="nodePositions[4].x" y2="nodePositions[4].y" stroke="rgba(150,175,220,0.12)" />
                <line x1="nodePositions[5].x" y1="nodePositions[5].y" x2="nodePositions[6].x" y2="nodePositions[6].y" stroke="rgba(150,175,220,0.12)" />
              </g>

              <g class="graph-nodes">
                <g
                  v-for="(d, i) in domains"
                  :key="d.id"
                  class="node"
                  :class="{ active: activeDomain.id === d.id }"
                  :style="{ '--node-color': d.color }"
                  :transform="`translate(${nodePositions[i].x}, ${nodePositions[i].y})`"
                  @mouseenter="hoverId = d.id"
                  @mouseleave="hoverId = null"
                  @click="selectDomain(d.id)"
                >
                  <circle class="node-orbit" r="28" />
                  <circle class="node-core" :r="10 + d.mastery * 10" />
                  <text class="node-label" y="44" text-anchor="middle">{{ d.name }}</text>
                  <text class="node-pct" y="58" text-anchor="middle">{{ formatPct(d.mastery) }}</text>
                </g>

                <g class="center-node" :transform="`translate(${center.x}, ${center.y})`">
                  <circle class="center-orbit" r="34" />
                  <circle class="center-core" r="18" />
                  <text class="center-label" y="5" text-anchor="middle">学习中枢</text>
                </g>
              </g>
            </svg>

            <Transition name="fade">
              <div
                :key="activeDomain.id"
                class="node-detail glass-card"
                :style="{ '--detail-color': activeDomain.color }"
              >
                <div class="detail-kicker">DOMAIN INFO</div>
                <div class="detail-title">{{ activeDomain.name }}</div>
                <div class="detail-meta">{{ activeDomain.concepts }} 知识点 · {{ formatPct(activeDomain.mastery) }}</div>
                <div class="detail-weak">
                  <span>薄弱项</span>
                  {{ activeDomain.weak.join('、') }}
                </div>
                <div class="detail-next">
                  <span>建议</span>
                  {{ activeDomain.next }}
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div class="data-col">
          <div class="glass-card distribution-card">
            <div class="card-title">掌握度分布</div>
            <div class="dist-bar">
              <div
                v-for="seg in distribution"
                :key="seg.label"
                class="dist-segment"
                :style="{ width: `${seg.pct}%`, background: seg.color }"
              >
                <span v-if="seg.pct > 10">{{ seg.pct }}%</span>
              </div>
            </div>
            <div class="dist-legend">
              <span v-for="seg in distribution" :key="seg.label">
                <i :style="{ background: seg.color }" />
                {{ seg.label }}
              </span>
            </div>
          </div>

          <div class="glass-card radar-card">
            <div class="card-title">能力雷达</div>
            <div ref="radarChartRef" class="radar-body" />
          </div>

          <div class="glass-card weak-card">
            <div class="card-title">待提升知识点 TOP5</div>
            <div class="weak-list">
              <div v-for="(item, idx) in weakPoints" :key="idx" class="weak-item">
                <div class="weak-info">
                  <span class="weak-name">{{ item.name }}</span>
                  <span class="weak-domain" :style="{ color: item.color }">{{ item.domain }}</span>
                </div>
                <div class="weak-track">
                  <div
                    class="weak-fill"
                    :style="{ width: `${item.value}%`, background: item.color, '--fill-color': item.color }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-skyline {
  position: relative;
  padding: 24px;
  color: #e8edf5;
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.skyline-inner {
  max-width: 1440px;
  margin: 0 auto;
}

.sky-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: end;
  margin-bottom: 18px;
}

.sky-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #22d3ee;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.sky-eyebrow span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  animation: soft-pulse 1.6s ease-in-out infinite;
}

.sky-header h2 {
  margin: 8px 0 0;
  color: #f7fbff;
  font-size: 26px;
  font-weight: 760;
  line-height: 1.1;
}

.sky-sub {
  margin: 6px 0 0;
  color: #91a3c7;
  font-size: 13px;
  line-height: 1.6;
}

.sky-score {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
  padding: 12px 16px;
}

.sky-score span {
  font-size: 10px;
  color: #7f93ba;
  letter-spacing: 0.08em;
}

.sky-score strong {
  font-size: 28px;
  font-weight: 760;
  color: #22d3ee;
  line-height: 1;
}

.glass-card {
  position: relative;
  border-radius: 16px;
  padding: 16px;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(34, 211, 238, 0.04), transparent 46%),
    linear-gradient(180deg, rgba(12, 18, 38, 0.72), rgba(6, 10, 24, 0.55));
  border: 1px solid rgba(150, 175, 220, 0.10);
  backdrop-filter: blur(26px) saturate(1.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 18px 46px rgba(0, 0, 0, 0.22);
  isolation: isolate;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.35), transparent);
  opacity: 0.6;
}

.card-title {
  font-size: 13px;
  font-weight: 650;
  color: #c8d6f0;
  letter-spacing: 0.04em;
}

.knowledge-board {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
}

.graph-panel {
  display: flex;
  flex-direction: column;
  min-height: 420px;
}

.graph-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.graph-meta {
  font-size: 11px;
  color: #7f93ba;
}

.graph-shell {
  position: relative;
  flex: 1 1 auto;
  min-height: 320px;
}

.knowledge-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.graph-links line {
  stroke-width: 1.2;
  stroke-opacity: 0.16;
  transition: stroke-opacity 0.2s ease, stroke-width 0.2s ease;
}

.graph-links line.active {
  stroke-opacity: 0.8;
  stroke-width: 2;
  filter: drop-shadow(0 0 6px var(--link-color));
}

.graph-nodes .node {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.graph-nodes:hover .node:not(:hover):not(.active) {
  opacity: 0.45;
}

.node-orbit {
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1;
  transition: all 0.2s ease;
}

.node-core {
  fill: color-mix(in srgb, var(--node-color) 72%, rgba(255, 255, 255, 0.12));
  stroke: color-mix(in srgb, var(--node-color) 90%, white);
  stroke-width: 1.2;
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--node-color) 55%, transparent));
  transition: all 0.2s ease;
}

.node.active .node-orbit {
  stroke: color-mix(in srgb, var(--node-color) 50%, rgba(255, 255, 255, 0.14));
}

.node.active .node-core {
  fill: color-mix(in srgb, var(--node-color) 86%, white);
  filter: drop-shadow(0 0 18px color-mix(in srgb, var(--node-color) 80%, transparent));
}

.node-label {
  fill: #c8d6f0;
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
}

.node-pct {
  fill: #7f93ba;
  font-size: 9px;
  pointer-events: none;
}

.center-node {
  pointer-events: none;
}

.center-orbit {
  fill: transparent;
  stroke: rgba(34, 211, 238, 0.25);
  stroke-width: 1;
  stroke-dasharray: 4 4;
  animation: slow-rotate 24s linear infinite;
}

.center-core {
  fill: rgba(8, 14, 34, 0.9);
  stroke: #22d3ee;
  stroke-width: 1.5;
  filter: drop-shadow(0 0 14px rgba(34, 211, 238, 0.45));
}

.center-label {
  fill: #22d3ee;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.node-detail {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 190px;
  padding: 12px;
  pointer-events: none;
  --detail-color: #22d3ee;
}

.detail-kicker {
  font-size: 9px;
  color: #7f93ba;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}

.detail-title {
  font-size: 16px;
  font-weight: 720;
  color: #f7fbff;
  margin-bottom: 2px;
}

.detail-meta {
  font-size: 11px;
  color: var(--detail-color);
  margin-bottom: 10px;
}

.detail-weak,
.detail-next {
  font-size: 11px;
  line-height: 1.55;
  color: #9badcc;
  margin-top: 8px;
}

.detail-weak span,
.detail-next span {
  display: block;
  font-size: 9px;
  color: #7f93ba;
  letter-spacing: 0.08em;
  margin-bottom: 2px;
}

.detail-next {
  padding: 8px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--detail-color) 8%, rgba(255, 255, 255, 0.03));
  border: 1px solid color-mix(in srgb, var(--detail-color) 20%, rgba(255, 255, 255, 0.06));
}

.data-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.distribution-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dist-bar {
  display: flex;
  height: 22px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.dist-segment {
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
  color: #070b1a;
  transition: width 0.4s ease;
}

.dist-legend {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 11px;
  color: #91a3c7;
}

.dist-legend i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
}

.radar-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 220px;
}

.radar-body {
  flex: 1 1 auto;
  width: 100%;
  min-height: 200px;
  margin-top: 8px;
}

.weak-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weak-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weak-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.weak-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.weak-name {
  font-size: 12px;
  color: #e8edf5;
}

.weak-domain {
  font-size: 10px;
}

.weak-track {
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.weak-fill {
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 0 8px color-mix(in srgb, var(--fill-color) 35%, transparent);
  transition: width 0.6s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@keyframes slow-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .sky-eyebrow span,
  .center-orbit {
    animation: none !important;
  }
}

@media (max-width: 1100px) {
  .knowledge-board {
    grid-template-columns: 1fr;
  }

  .graph-panel {
    min-height: 380px;
  }

  .node-detail {
    width: 170px;
  }
}

@media (max-width: 720px) {
  .section-skyline {
    padding: 16px;
  }

  .sky-header {
    grid-template-columns: 1fr;
  }

  .sky-score {
    width: fit-content;
  }
}
</style>
