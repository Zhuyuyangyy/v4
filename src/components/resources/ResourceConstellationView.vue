<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CNode {
  id: string; d: string; label: string; x: number; y: number; m: number; recommended?: boolean
}
interface CEdge { from: string; to: string }

const DOMAIN: Record<string, { name: string; color: string; short: string }> = {
  math: { name: '数学基础', color: '#00d4ff', short: 'MATH' },
  ml:   { name: '机器学习', color: '#7c3aed', short: 'ML' },
  dl:   { name: '深度学习', color: '#06d6a0', short: 'DL' },
  algo: { name: '算法与数据结构', color: '#f59e0b', short: 'ALGO' },
  eng:  { name: '工程实践', color: '#3b82f6', short: 'ENG' },
  nlp:  { name: 'NLP 与应用', color: '#f43f5e', short: 'NLP' },
}

const nodes = ref<CNode[]>([
  { id: 'm1', d: 'math', label: '矩阵运算', x: 195, y: 360, m: 0.95 },
  { id: 'm2', d: 'math', label: '特征值与分解', x: 330, y: 285, m: 0.82 },
  { id: 'm3', d: 'math', label: '概率论', x: 240, y: 470, m: 0.78 },
  { id: 'm4', d: 'math', label: '微积分', x: 410, y: 410, m: 0.66 },
  { id: 'm5', d: 'math', label: '凸优化', x: 470, y: 510, m: 0.32 },
  { id: 'ml1', d: 'ml', label: '监督学习', x: 600, y: 230, m: 0.88 },
  { id: 'ml2', d: 'ml', label: '无监督学习', x: 745, y: 195, m: 0.62 },
  { id: 'ml3', d: 'ml', label: '决策树 / RF', x: 655, y: 335, m: 0.78 },
  { id: 'ml4', d: 'ml', label: 'SVM', x: 800, y: 320, m: 0.55 },
  { id: 'ml5', d: 'ml', label: '集成学习', x: 570, y: 385, m: 0.48 },
  { id: 'dl1', d: 'dl', label: '神经网络', x: 945, y: 270, m: 0.58 },
  { id: 'dl2', d: 'dl', label: 'CNN', x: 1080, y: 225, m: 0.32 },
  { id: 'dl3', d: 'dl', label: 'RNN / LSTM', x: 1160, y: 345, m: 0.20 },
  { id: 'dl4', d: 'dl', label: 'Transformer', x: 1020, y: 410, m: 0.10, recommended: true },
  { id: 'dl5', d: 'dl', label: 'Attention', x: 1175, y: 460, m: 0.18 },
  { id: 'a1', d: 'algo', label: '排序与查找', x: 220, y: 650, m: 0.92 },
  { id: 'a2', d: 'algo', label: '数据结构', x: 340, y: 705, m: 0.78 },
  { id: 'a3', d: 'algo', label: '图算法', x: 215, y: 775, m: 0.42 },
  { id: 'a4', d: 'algo', label: '动态规划', x: 380, y: 820, m: 0.30 },
  { id: 'e1', d: 'eng', label: 'Python 工程', x: 590, y: 680, m: 0.72 },
  { id: 'e2', d: 'eng', label: '版本控制', x: 700, y: 760, m: 0.65 },
  { id: 'e3', d: 'eng', label: '模型部署', x: 815, y: 700, m: 0.30 },
  { id: 'n1', d: 'nlp', label: '词向量', x: 985, y: 645, m: 0.40 },
  { id: 'n2', d: 'nlp', label: 'LLM', x: 1135, y: 660, m: 0.18 },
  { id: 'n3', d: 'nlp', label: '微调与对齐', x: 1220, y: 770, m: 0.08 },
  { id: 'n4', d: 'nlp', label: '检索增强', x: 1065, y: 790, m: 0.12 },
])

const edges = ref<CEdge[]>([
  { from: 'm1', to: 'm2' }, { from: 'm1', to: 'm3' }, { from: 'm2', to: 'm4' },
  { from: 'm3', to: 'm4' }, { from: 'm4', to: 'm5' }, { from: 'm3', to: 'm5' },
  { from: 'ml1', to: 'ml2' }, { from: 'ml1', to: 'ml3' }, { from: 'ml2', to: 'ml4' },
  { from: 'ml3', to: 'ml4' }, { from: 'ml3', to: 'ml5' }, { from: 'ml1', to: 'ml5' },
  { from: 'dl1', to: 'dl2' }, { from: 'dl1', to: 'dl3' }, { from: 'dl2', to: 'dl4' },
  { from: 'dl3', to: 'dl4' }, { from: 'dl4', to: 'dl5' }, { from: 'dl3', to: 'dl5' },
  { from: 'a1', to: 'a2' }, { from: 'a2', to: 'a3' }, { from: 'a2', to: 'a4' }, { from: 'a3', to: 'a4' },
  { from: 'e1', to: 'e2' }, { from: 'e2', to: 'e3' }, { from: 'e1', to: 'e3' },
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' },
  { from: 'm1', to: 'dl1' }, { from: 'm3', to: 'ml1' }, { from: 'ml1', to: 'dl1' },
  { from: 'a2', to: 'ml5' }, { from: 'dl4', to: 'n2' }, { from: 'a2', to: 'e1' }, { from: 'm4', to: 'ml3' },
])

const domainLabels = [
  { d: 'math', x: 105, y: 230 },
  { d: 'ml', x: 545, y: 145 },
  { d: 'dl', x: 990, y: 155 },
  { d: 'algo', x: 140, y: 595 },
  { d: 'eng', x: 555, y: 620 },
  { d: 'nlp', x: 970, y: 595 },
]

// Deterministic starfield
const bgStars = (() => {
  const out: { x: number; y: number; r: number; o: number; tw: boolean }[] = []
  let s = 47
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 160; i++) {
    out.push({ x: rand() * 1400, y: rand() * 900, r: 0.5 + rand() * 1.4, o: 0.15 + rand() * 0.5, tw: rand() < 0.25 })
  }
  return out
})()

function nodeRadius(m: number) { return 4 + m * 7 }
function nodeOpacity(m: number) { return 0.35 + m * 0.65 }

const byId = computed(() => Object.fromEntries(nodes.value.map(n => [n.id, n])))
const focused = computed(() => nodes.value.find(n => n.recommended))

// Cluster halos
const clusterHalos = computed(() => {
  return domainLabels.map(dl => {
    const cluster = nodes.value.filter(n => n.d === dl.d)
    const cx = cluster.reduce((s, n) => s + n.x, 0) / cluster.length
    const cy = cluster.reduce((s, n) => s + n.y, 0) / cluster.length
    const r = Math.max(...cluster.map(n => Math.hypot(n.x - cx, n.y - cy))) + 60
    return { d: dl.d, cx, cy, r, color: DOMAIN[dl.d].color }
  })
})

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('constellation-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'constellation-kf'
    styleEl.textContent = `
      @keyframes constellation-twinkle { 0%,100%{opacity:0.4} 50%{opacity:1} }
      @keyframes constellation-pulse { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(2.4);opacity:0} }
    `
    document.head.appendChild(styleEl)
  }
})
onUnmounted(() => { styleEl?.remove() })
</script>

<template>
  <div class="constellation-view">
    <div class="constellation-banner">
      <span class="banner-dot" style="background:#00d4ff;box-shadow:0 0 10px #00d4ff66"></span>
      <span>每颗星是一个知识点，亮度即掌握度。同域知识点连成一组星座；跨域的知识桥用更细的光路点连。</span>
    </div>

    <div class="constellation-canvas">
      <svg viewBox="0 0 1400 900" class="constellation-svg">
        <defs>
          <radialGradient id="c-star-bright" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="40%" stop-color="#fff" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <filter id="c-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="c-glow-md" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Background starfield -->
        <circle v-for="(s, i) in bgStars" :key="'s'+i"
          :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
          :style="s.tw ? { animation: `constellation-twinkle ${2 + (i % 5)}s ease-in-out ${i * 0.13}s infinite` } : undefined" />

        <!-- Cluster halos -->
        <circle v-for="h in clusterHalos" :key="h.d"
          :cx="h.cx" :cy="h.cy" :r="h.r" :fill="h.color" opacity="0.04" />

        <!-- Edges -->
        <line v-for="(e, i) in edges" :key="'e'+i"
          :x1="byId[e.from]?.x" :y1="byId[e.from]?.y"
          :x2="byId[e.to]?.x" :y2="byId[e.to]?.y"
          :stroke="byId[e.from]?.d === byId[e.to]?.d ? DOMAIN[byId[e.from]!.d].color : '#8892b0'"
          :stroke-opacity="byId[e.from]?.d === byId[e.to]?.d ? 0.35 + Math.min(byId[e.from]!.m, byId[e.to]!.m) * 0.3 : 0.14"
          :stroke-width="byId[e.from]?.d === byId[e.to]?.d ? 1.3 : 0.8"
          :stroke-dasharray="byId[e.from]?.d !== byId[e.to]?.d ? '3 4' : 'none'" />

        <!-- Nodes -->
        <g v-for="n in nodes" :key="n.id">
          <circle :cx="n.x" :cy="n.y" :r="nodeRadius(n.m) * 3.2"
            fill="url(#c-star-bright)" :opacity="n.m * 0.4" />
          <circle :cx="n.x" :cy="n.y" :r="nodeRadius(n.m) * 1.9"
            :fill="DOMAIN[n.d].color" :opacity="n.m * 0.25" filter="url(#c-glow-md)" />
          <circle :cx="n.x" :cy="n.y" :r="nodeRadius(n.m)"
            :fill="DOMAIN[n.d].color" :opacity="nodeOpacity(n.m)" filter="url(#c-glow-sm)" />
          <circle :cx="n.x" :cy="n.y" :r="Math.max(1.5, nodeRadius(n.m) * 0.45)"
            fill="#fff" :opacity="0.55 + n.m * 0.45" />
          <!-- Recommended pulse -->
          <g v-if="n.recommended" :style="{ transformOrigin: `${n.x}px ${n.y}px`, animation: 'constellation-pulse 2.4s ease-out infinite' }">
            <circle :cx="n.x" :cy="n.y" :r="nodeRadius(n.m) + 6"
              fill="none" :stroke="DOMAIN[n.d].color" stroke-width="1.5" />
          </g>
        </g>
      </svg>

      <!-- Domain labels -->
      <div v-for="dl in domainLabels" :key="dl.d" class="domain-label"
        :style="{ left: (dl.x / 1400 * 100) + '%', top: (dl.y / 900 * 100) + '%', color: DOMAIN[dl.d].color }">
        <div class="domain-short">{{ DOMAIN[dl.d].short }}</div>
        {{ DOMAIN[dl.d].name }}
      </div>

      <!-- Node labels -->
      <div v-for="n in nodes" :key="'l'+n.id" class="node-label-overlay"
        :style="{ left: (n.x / 1400 * 100) + '%', top: ((n.y + nodeRadius(n.m) + 8) / 900 * 100) + '%', opacity: 0.4 + n.m * 0.55 }">
        {{ n.label }}
      </div>

      <!-- Recommended pin -->
      <div v-if="focused" class="rec-pin"
        :style="{ left: (focused.x / 1400 * 100) + '%', top: (focused.y / 900 * 100) + '%' }">
        <div class="rec-pin-inner">
          <span class="rec-pin-dot"></span>
          <span>下一颗星 · 推荐学习</span>
        </div>
      </div>

      <!-- Detail card -->
      <div class="detail-card" v-if="focused">
        <div class="detail-header">
          <span class="detail-chip" style="background:rgba(124,58,237,0.18);border-color:#7c3aed66;color:#7c3aed">当前聚焦</span>
          <span class="detail-domain">DL · TRANSFORMER</span>
        </div>
        <div class="detail-title">Transformer</div>
        <div class="detail-sub">这颗星几乎还没亮起来 — 你只接触了 10%</div>
        <div class="mastery-bar-header">
          <span>掌握度</span>
          <span class="mastery-pct" style="color:#7c3aed">10%</span>
        </div>
        <div class="mastery-track"><div class="mastery-fill" style="width:10%"></div></div>
        <div class="detail-stats">
          <div class="stat-row"><span>前置知识</span><span class="stat-val">3 颗 · 已掌握 2</span></div>
          <div class="stat-row"><span>推荐资源</span><span class="stat-val">4 个 · 含视频 1</span></div>
          <div class="stat-row"><span>预计学习时长</span><span class="stat-val mono">~ 45 min</span></div>
        </div>
        <button class="detail-btn">点亮这颗星 →</button>
      </div>

      <!-- Legend -->
      <div class="legend-card">
        <div class="legend-title">MASTERY · 亮度</div>
        <div class="legend-samples">
          <div v-for="m in [0.1, 0.35, 0.6, 0.85]" :key="m" class="legend-sample">
            <svg width="28" height="28">
              <circle cx="14" cy="14" :r="nodeRadius(m) * 1.8" fill="#00d4ff" :opacity="m * 0.3" />
              <circle cx="14" cy="14" :r="nodeRadius(m)" fill="#00d4ff" :opacity="nodeOpacity(m)" />
              <circle cx="14" cy="14" :r="Math.max(1.5, nodeRadius(m) * 0.45)" fill="#fff" :opacity="0.5 + m * 0.5" />
            </svg>
            <span class="legend-pct">{{ Math.round(m * 100) }}%</span>
          </div>
        </div>
        <div class="legend-divider"></div>
        <div class="legend-domains">
          <div v-for="(v, k) in DOMAIN" :key="k" class="legend-domain-item">
            <span class="legend-dot" :style="{ background: v.color, boxShadow: `0 0 6px ${v.color}` }"></span>
            {{ v.name }}
          </div>
        </div>
      </div>

      <!-- Top stats -->
      <div class="top-stats">
        <div class="stat-card">
          <div class="stat-label">已点亮</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#06d6a0">14</span><span class="stat-unit">/ 26 颗</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">推荐学习</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#7c3aed">6</span><span class="stat-unit">颗</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">薄弱星座</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#f43f5e">深度学习</span><span class="stat-unit">20%</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes cv-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.constellation-view { padding: 0 40px 40px; animation: cv-float-up 0.5s ease both; }
.constellation-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 20px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.constellation-canvas {
  position: relative; width: 100%; aspect-ratio: 1400 / 900;
  border-radius: 18px; background: rgba(7, 7, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06); overflow: hidden;
}
.constellation-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

.domain-label {
  position: absolute; pointer-events: none;
  font-family: var(--font-display); font-size: 18px; letter-spacing: 0.05em;
  opacity: 0.85; text-shadow: 0 0 16px currentColor;
}
.domain-short {
  font-size: 9px; letter-spacing: 0.35em; opacity: 0.7;
  font-family: var(--font-mono); margin-bottom: 2px;
}
.node-label-overlay {
  position: absolute; transform: translateX(-50%);
  font-size: 10.5px; font-weight: 500; color: #e8edf5;
  pointer-events: none; white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0,0,0,0.8);
}
.rec-pin {
  position: absolute; transform: translate(28px, -100%); z-index: 8;
}
.rec-pin-inner {
  background: rgba(124, 58, 237, 0.18); border: 1px solid #7c3aed66;
  border-radius: 10px; padding: 8px 12px; backdrop-filter: blur(12px);
  display: flex; align-items: center; gap: 8px; white-space: nowrap;
  font-size: 11px; color: #e8edf5; font-weight: 500;
  box-shadow: 0 0 20px #7c3aed55;
}
.rec-pin-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #7c3aed; box-shadow: 0 0 8px #7c3aed;
}

/* Detail card */
.detail-card {
  position: absolute; right: 24px; bottom: 24px; width: 320px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 20px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.detail-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.detail-chip {
  font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  border: 1px solid; letter-spacing: 0.04em;
}
.detail-domain { font-size: 10px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.12em; }
.detail-title { font-family: var(--font-display); font-size: 24px; color: #e8edf5; line-height: 1.1; margin-bottom: 4px; }
.detail-sub { font-size: 12px; color: #8892b0; margin-bottom: 16px; }
.mastery-bar-header { display: flex; justify-content: space-between; font-size: 10px; color: #8892b0; margin-bottom: 6px; letter-spacing: 0.12em; }
.mastery-pct { font-family: var(--font-mono); font-weight: 600; }
.mastery-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; margin-bottom: 16px; overflow: hidden; }
.mastery-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #00d4ff); border-radius: 2px; }
.detail-stats { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: #8892b0; margin-bottom: 16px; }
.stat-row { display: flex; justify-content: space-between; }
.stat-val { color: #e8edf5; }
.mono { font-family: var(--font-mono); }
.detail-btn {
  width: 100%; background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff; border: none; border-radius: 10px;
  padding: 11px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
  box-shadow: 0 4px 20px #00d4ff55;
}

/* Legend */
.legend-card {
  position: absolute; left: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 16px 20px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.legend-title { font-size: 10px; letter-spacing: 0.18em; color: #8892b0; margin-bottom: 12px; font-family: var(--font-mono); }
.legend-samples { display: flex; align-items: center; gap: 12px; }
.legend-sample { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.legend-pct { font-size: 10px; color: #8892b0; font-family: var(--font-mono); }
.legend-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
.legend-domains { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }
.legend-domain-item { display: flex; align-items: center; gap: 6px; font-size: 10.5px; color: #8892b0; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* Top stats */
.top-stats {
  position: absolute; top: 20px; right: 20px; z-index: 9;
  display: flex; gap: 12px;
}
.stat-card {
  background: rgba(12,12,30,0.6); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 10px 16px;
}
.stat-label { font-size: 9px; letter-spacing: 0.18em; color: #8892b0; font-family: var(--font-mono); margin-bottom: 4px; }
.stat-value-row { display: flex; align-items: baseline; gap: 4px; }
.stat-big { font-family: var(--font-display); font-size: 20px; line-height: 1; }
.stat-unit { font-size: 10px; color: #8892b0; }

@media (max-width: 900px) {
  .constellation-view { padding: 0 20px 32px; }
  .detail-card, .legend-card { position: static; width: 100%; margin-top: 12px; }
  .top-stats { position: static; flex-wrap: wrap; margin-top: 12px; }
}
</style>
