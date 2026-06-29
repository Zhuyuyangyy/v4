<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { MetroLine, MetroStation } from './mapTypes'

const emit = defineEmits<{ 'select-node': [nodeId: string] }>()

type Station = MetroStation & { lineId?: string; lineColor?: string }

const KP = { bg: '#07070d', text: '#e8edf5', textSub: '#8892b0', emerald: '#06d6a0', cyan: '#00d4ff', purple: '#7c3aed', amber: '#f59e0b', rose: '#f43f5e', blue: '#3b82f6' }

const allMetroLines: MetroLine[] = [
  {
    id: 'basic',
    name: '图基础线',
    color: '#00d4ff',
    waypoints: [[120, 200], [1280, 200]],
    stations: [
      { id: 'g1', x: 140, y: 200, label: '顶点与边', mastery: 0.94, prerequisite: '集合基础', nextStation: '邻接表', estimatedTime: '1h' },
      { id: 'g2', x: 320, y: 200, label: '邻接表', mastery: 0.84, prerequisite: '顶点与边', nextStation: '邻接矩阵', estimatedTime: '2h' },
      { id: 'g3', x: 500, y: 200, label: '邻接矩阵', mastery: 0.72, interchange: ['search'], prerequisite: '二维数组', nextStation: '度与连通', estimatedTime: '2h' },
      { id: 'g4', x: 700, y: 200, label: '度与连通', mastery: 0.66, prerequisite: '邻接结构', nextStation: '图遍历入口', estimatedTime: '2h' },
      { id: 'g5', x: 900, y: 200, label: '图遍历入口', mastery: 0.58, interchange: ['search'], prerequisite: '连通分量', nextStation: '复杂度估算', estimatedTime: '2h' },
      { id: 'g6', x: 1100, y: 200, label: '复杂度估算', mastery: 0.44, prerequisite: 'V/E 规模', nextStation: '专项练习', estimatedTime: '2h' },
    ],
  },
  {
    id: 'search',
    name: '搜索遍历线',
    color: '#06d6a0',
    waypoints: [[120, 380], [1280, 380]],
    stations: [
      { id: 's1', x: 140, y: 380, label: '递归栈', mastery: 0.76, prerequisite: '函数调用', nextStation: 'DFS 模板', estimatedTime: '2h' },
      { id: 's2', x: 320, y: 380, label: 'DFS 模板', mastery: 0.68, interchange: ['basic'], prerequisite: '递归栈', nextStation: '回溯边界', estimatedTime: '3h' },
      { id: 's3', x: 500, y: 380, label: '回溯边界', mastery: 0.52, prerequisite: 'DFS 模板', nextStation: '队列推进', estimatedTime: '3h' },
      { id: 's4', x: 700, y: 380, label: '队列推进', mastery: 0.46, prerequisite: 'FIFO 队列', nextStation: 'visited 标记', estimatedTime: '3h' },
      { id: 's5', x: 900, y: 380, label: 'visited 标记', mastery: 0.32, interchange: ['basic', 'shortest'], recommended: true, youAreHere: true, isRemedial: true, prerequisite: '队列推进', nextStation: '层序距离', estimatedTime: '4h' },
      { id: 's6', x: 1100, y: 380, label: '层序距离', mastery: 0.24, prerequisite: 'visited 标记', nextStation: '最短路入口', estimatedTime: '4h' },
    ],
  },
  {
    id: 'shortest',
    name: '最短路线',
    color: '#f59e0b',
    waypoints: [[260, 560], [1280, 560]],
    stations: [
      { id: 'p1', x: 280, y: 560, label: '无权最短路', mastery: 0.42, interchange: ['search'], prerequisite: 'BFS 层序', nextStation: 'Dijkstra', estimatedTime: '3h' },
      { id: 'p2', x: 500, y: 560, label: 'Dijkstra', mastery: 0.28, isRemedial: true, prerequisite: '优先队列', nextStation: '松弛操作', estimatedTime: '5h' },
      { id: 'p3', x: 720, y: 560, label: '松弛操作', mastery: 0.24, recommended: true, prerequisite: 'Dijkstra', nextStation: '负权判断', estimatedTime: '4h' },
      { id: 'p4', x: 940, y: 560, label: 'Bellman-Ford', mastery: 0.12, prerequisite: '松弛操作', nextStation: 'Floyd', estimatedTime: '5h' },
      { id: 'p5', x: 1160, y: 560, label: 'Floyd', mastery: 0.08, prerequisite: '动态规划', nextStation: '路径恢复', estimatedTime: '5h' },
    ],
  },
  {
    id: 'mst',
    name: '生成树线',
    color: '#7c3aed',
    waypoints: [[120, 740], [1020, 740]],
    stations: [
      { id: 't1', x: 140, y: 740, label: '切分性质', mastery: 0.40, prerequisite: '贪心思想', nextStation: 'Kruskal', estimatedTime: '3h' },
      { id: 't2', x: 360, y: 740, label: 'Kruskal', mastery: 0.34, prerequisite: '排序', nextStation: '并查集', estimatedTime: '4h' },
      { id: 't3', x: 580, y: 740, label: '并查集', mastery: 0.30, isRemedial: true, prerequisite: '树结构', nextStation: 'Prim', estimatedTime: '4h' },
      { id: 't4', x: 800, y: 740, label: 'Prim', mastery: 0.18, prerequisite: '优先队列', nextStation: '综合题', estimatedTime: '5h' },
    ],
  },
  {
    id: 'exam',
    name: '题型线',
    color: '#f43f5e',
    waypoints: [[700, 860], [1280, 860]],
    stations: [
      { id: 'e1', x: 720, y: 860, label: '连通块题', mastery: 0.48, prerequisite: 'DFS/BFS', nextStation: '迷宫题', estimatedTime: '2h' },
      { id: 'e2', x: 900, y: 860, label: '迷宫题', mastery: 0.35, recommended: true, prerequisite: 'visited 标记', nextStation: '拓扑排序', estimatedTime: '3h' },
      { id: 'e3', x: 1080, y: 860, label: '拓扑排序', mastery: 0.20, prerequisite: '入度队列', nextStation: '综合模拟', estimatedTime: '4h' },
      { id: 'e4', x: 1240, y: 860, label: '综合模拟', mastery: 0.10, prerequisite: '多模板组合', nextStation: '复盘', estimatedTime: '4h' },
    ],
  },
]
const lines = ref<MetroLine[]>(allMetroLines.filter(l => l.id !== 'exam'))
const branches = ref<MetroLine[]>(allMetroLines.filter(l => l.id === 'exam'))

function buildPath(waypoints: [number, number][], radius = 14): string {
  if (waypoints.length < 2) return ''
  let d = `M ${waypoints[0][0]} ${waypoints[0][1]}`
  for (let i = 1; i < waypoints.length - 1; i++) {
    const [px, py] = waypoints[i - 1]
    const [cx, cy] = waypoints[i]
    const [nx, ny] = waypoints[i + 1]
    const lenA = Math.hypot(cx - px, cy - py)
    const lenB = Math.hypot(nx - cx, ny - cy)
    const r = Math.min(radius, lenA / 2, lenB / 2)
    const ax = cx - ((cx - px) / lenA) * r
    const ay = cy - ((cy - py) / lenA) * r
    const bx = cx + ((nx - cx) / lenB) * r
    const by = cy + ((ny - cy) / lenB) * r
    d += ` L ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`
  }
  const last = waypoints[waypoints.length - 1]
  d += ` L ${last[0]} ${last[1]}`
  return d
}

function stationFill(mastery: number, lineColor: string): string {
  if (mastery >= 0.8) return lineColor
  if (mastery >= 0.4) return lineColor + '66'
  return KP.bg
}

const allStations = computed(() => {
  const out: Station[] = []
  lines.value.forEach(line => line.stations.forEach(s => out.push({ ...s, lineId: line.id, lineColor: line.color })))
  branches.value.forEach(line => line.stations.forEach(s => out.push({ ...s, lineId: line.id, lineColor: line.color })))
  return out
})

// Interchange columns
const interchangeCols = computed(() => {
  const xGroups: Record<number, Station[]> = {}
  allStations.value.filter(s => s.interchange).forEach(s => {
    if (!xGroups[s.x]) xGroups[s.x] = []
    xGroups[s.x].push(s)
  })
  return Object.entries(xGroups)
    .filter(([, sts]) => sts.length >= 2)
    .map(([col, sts]) => {
      const ys = sts.map(s => s.y).sort((a, b) => a - b)
      return { col: Number(col), y1: ys[0], y2: ys[ys.length - 1] }
    })
})

const youAreHereStation = computed(() => allStations.value.find(s => s.youAreHere))

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('metro-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'metro-kf'
    styleEl.textContent = `
      @keyframes metro-pulse { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(2.4);opacity:0} }
      @keyframes metro-pulse-soft { 0%,100%{opacity:1} 50%{opacity:0.55} }
    `
    document.head.appendChild(styleEl)
  }
})
onUnmounted(() => { styleEl?.remove() })
</script>

<template>
  <div class="metro-view">
    <div class="metro-banner">
      <span class="banner-dot" style="background:#06d6a0;box-shadow:0 0 10px #06d6a066"></span>
      <span>地铁图看的是学习顺序和路线换乘：先学什么、在哪补弱、何时跨到下一个方向，重点是路径规划，不是知识点关系图的重复版。</span>
    </div>

    <div class="metro-canvas">
      <svg viewBox="0 0 1400 900" class="metro-svg">
        <defs>
          <filter id="m-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="m-glow-md" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Line halos -->
        <path v-for="(line, i) in [...lines, ...branches]" :key="'halo-'+i"
          :d="buildPath(line.waypoints)" fill="none" :stroke="line.color"
          stroke-opacity="0.18" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"
          filter="url(#m-glow-md)" />

        <!-- Lines -->
        <path v-for="(line, i) in [...lines, ...branches]" :key="'line-'+i"
          :d="buildPath(line.waypoints)" fill="none" :stroke="line.color"
          stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.9" />

        <!-- Inner stripe -->
        <path v-for="(line, i) in [...lines, ...branches]" :key="'inner-'+i"
          :d="buildPath(line.waypoints)" fill="none" :stroke="line.color"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.4" />

        <!-- Interchange connectors -->
        <g v-for="ic in interchangeCols" :key="ic!.col">
          <line :x1="ic!.col" :y1="ic!.y1" :x2="ic!.col" :y2="ic!.y2"
            stroke="#fff" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round" />
          <line :x1="ic!.col" :y1="ic!.y1" :x2="ic!.col" :y2="ic!.y2"
            stroke="#fff" stroke-opacity="0.5" stroke-width="1" stroke-linecap="round" stroke-dasharray="2 3" />
        </g>

        <!-- Stations -->
        <g v-for="(s, i) in allStations" :key="'st-'+i" class="metro-station" @click="emit('select-node', s.id)">
          <circle v-if="s.interchange" :cx="s.x" :cy="s.y" :r="(s.interchange ? 13 : 9) + 4"
            fill="none" stroke="#fff" stroke-opacity="0.25" stroke-width="1" />
          <circle v-if="s.recommended" :cx="s.x" :cy="s.y" :r="(s.interchange ? 13 : 9) + 2"
            fill="none" :stroke="s.lineColor" stroke-width="2"
            :style="{ transformOrigin: `${s.x}px ${s.y}px`, animation: 'metro-pulse 2.2s ease-out infinite' }" />
          <g v-if="s.youAreHere">
            <circle :cx="s.x" :cy="s.y" :r="9 + 2" fill="none" :stroke="s.lineColor" stroke-width="2"
              :style="{ transformOrigin: `${s.x}px ${s.y}px`, animation: 'metro-pulse 1.8s ease-out infinite' }" />
            <circle :cx="s.x" :cy="s.y" :r="9 + 12" fill="none" :stroke="s.lineColor" stroke-width="1.5"
              :style="{ transformOrigin: `${s.x}px ${s.y}px`, animation: 'metro-pulse 1.8s ease-out 0.6s infinite' }" />
          </g>
          <circle :cx="s.x" :cy="s.y" :r="s.interchange ? 13 : 9"
            :fill="stationFill(s.mastery, s.lineColor!)" :stroke="s.lineColor" stroke-width="2.5"
            :filter="s.mastery >= 0.5 ? 'url(#m-glow-sm)' : undefined" />
          <path v-if="s.mastery >= 0.4 && s.mastery < 0.8"
            :d="`M ${s.x} ${s.y - 9} A 9 9 0 0 1 ${s.x} ${s.y + 9} Z`" :fill="s.lineColor" />
        </g>
      </svg>

      <!-- Line labels -->
      <div v-for="line in lines" :key="'ll-'+line.id" class="line-label"
        :style="{
          left: ((line.waypoints[0][0] - 100) / 1400 * 100) + '%',
          top: ((line.waypoints[0][1] - 14) / 900 * 100) + '%',
          transform: line.id === 'eng' ? 'translate(50%, -50%) rotate(-90deg)' : undefined,
        }">
        <div class="line-badge" :style="{ background: line.color + '14', borderColor: line.color + '44' }">
          <span class="line-badge-dot" :style="{ background: line.color }"></span>
          {{ line.name }}
        </div>
      </div>

      <!-- Station labels (horizontal lines) -->
      <template v-for="line in lines" :key="'sl-'+line.id">
        <div v-for="s in line.stations" :key="line.id+'-'+s.x+'-'+s.y" class="station-label"
          :style="{
            left: (s.x / 1400 * 100) + '%',
            top: ((s.y + (line.id === 'math' ? -38 : line.id === 'ml' ? -42 : 40)) / 900 * 100) + '%',
          }">
          <div class="station-name" :style="{ fontSize: s.interchange ? '12px' : '11px', fontWeight: s.interchange ? 600 : 500, color: s.mastery >= 0.6 ? KP.text : KP.textSub }">
            {{ s.label }}
          </div>
          <div v-if="s.mastery > 0 && s.mastery < 1" class="station-pct" :style="{ color: line.color }">
            {{ Math.round(s.mastery * 100) }}%
          </div>
        </div>
      </template>

      <!-- Branch labels -->
      <template v-for="line in branches" :key="'bl-'+line.id">
        <div v-for="(s, i) in line.stations" :key="'b-'+line.id+'-'+i" class="branch-label"
          :style="{ left: ((s.x + 22) / 1400 * 100) + '%', top: ((s.y - 8) / 900 * 100) + '%' }">
          <span class="branch-tag" :style="{ color: line.color }">题型</span>
          {{ s.label }}
        </div>
      </template>

      <!-- You are here -->
      <div v-if="youAreHereStation" class="you-are-here"
        :style="{ left: (youAreHereStation.x / 1400 * 100) + '%', top: ((youAreHereStation.y - 60) / 900 * 100) + '%' }">
        <div class="yah-pill">
          <span class="yah-dot"></span>
          你现在在这里
        </div>
        <div class="yah-arrow"></div>
      </div>

      <!-- Legend -->
      <div class="metro-legend">
        <div class="legend-title">STATION · 站点状态</div>
        <div class="legend-items">
          <div v-for="d in [
            { label: '已掌握', m: 1, c: KP.cyan },
            { label: '学习中', m: 0.5, c: KP.cyan },
            { label: '未抵达', m: 0, c: KP.cyan },
          ]" :key="d.label" class="legend-item">
            <svg width="32" height="32">
              <circle cx="16" cy="16" r="9"
                :fill="stationFill(d.m, d.c)" :stroke="d.c" stroke-width="2.5" />
              <path v-if="d.m > 0 && d.m < 1" d="M 16 7 A 9 9 0 0 1 16 25 Z" :fill="d.c" />
            </svg>
            <span>{{ d.label }}</span>
          </div>
          <div class="legend-item">
            <svg width="32" height="32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="1" />
              <circle cx="16" cy="16" r="11" fill="#00d4ff" stroke="#00d4ff" stroke-width="2.5" />
            </svg>
            <span>换乘站</span>
          </div>
        </div>
      </div>

      <!-- Info card -->
      <div class="metro-info-card">
        <div class="info-header">
          <span class="info-chip" style="background:rgba(245,158,11,0.12);border-color:#f59e0b33;color:#f59e0b">本月行程</span>
          <span class="info-date">GRAPH · 2026</span>
        </div>
        <div class="info-title">
          再坐 4 站，<br />就能从<span style="color:#06d6a0">队列推进</span>到达<span style="color:#06d6a0">BFS 最短路</span>
        </div>
        <div class="info-desc">预计需 2 次换乘 · 经过 <span style="color:#00d4ff">邻接结构</span> 与 <span style="color:#7c3aed">visited 标记</span></div>
        <div class="info-progress">
          <template v-for="(c, i) in ['#06d6a0','#06d6a0','#06d6a0','#00d4ff','#7c3aed','#06d6a0']" :key="i">
            <div class="prog-dot" :style="{ background: i <= 2 ? c : 'transparent', borderColor: c }"></div>
            <div v-if="i < 5" class="prog-line" :style="{ background: c }"></div>
          </template>
        </div>
        <div class="info-progress-labels"><span>当前</span><span>4 站后</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes mv-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.metro-view { padding: 0 40px 40px; animation: mv-float-up 0.5s ease both; }
.metro-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 20px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.metro-canvas {
  position: relative; width: 100%; aspect-ratio: 1400 / 900;
  border-radius: 18px; background: rgba(7, 7, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06); overflow: hidden;
}
.metro-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

.line-label { position: absolute; pointer-events: none; white-space: nowrap; }
.line-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 10px; border: 1px solid; border-radius: 100px;
  font-size: 11px; font-weight: 500; letter-spacing: 0.12em; color: #e8edf5;
}
.line-badge-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }

.station-label {
  position: absolute; transform: translateX(-50%);
  pointer-events: none; white-space: nowrap; text-align: center;
}
.metro-station { cursor: pointer; }
.station-name { font-weight: 500; text-shadow: 0 1px 4px rgba(0,0,0,0.8); letter-spacing: 0.01em; }
.station-pct { font-size: 9px; font-family: var(--font-mono); margin-top: 2px; letter-spacing: 0.05em; opacity: 0.85; }

.branch-label {
  position: absolute; pointer-events: none; white-space: nowrap;
  font-size: 11px; color: #e8edf5; font-weight: 500;
  text-shadow: 0 1px 4px rgba(0,0,0,0.8);
}
.branch-tag { font-family: var(--font-mono); font-size: 9px; margin-right: 6px; letter-spacing: 0.15em; }

.you-are-here {
  position: absolute;
  transform: translateX(-50%); z-index: 10; pointer-events: none;
}
.yah-pill {
  background: #06d6a022; border: 1.5px solid #06d6a0; border-radius: 100px;
  padding: 5px 12px 5px 8px; font-size: 11px; font-weight: 600; color: #06d6a0;
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  box-shadow: 0 0 24px #06d6a088;
}
.yah-dot { width: 6px; height: 6px; border-radius: 50%; background: #06d6a0; animation: metro-pulse-soft 1.5s ease-in-out infinite; }
.yah-arrow {
  width: 0; height: 0; margin: 4px auto 0;
  border-left: 6px solid transparent; border-right: 6px solid transparent;
  border-top: 8px solid #06d6a0;
}

/* Legend */
.metro-legend {
  position: absolute; left: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 18px 22px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.legend-title { font-size: 10px; letter-spacing: 0.18em; color: #8892b0; margin-bottom: 14px; font-family: var(--font-mono); }
.legend-items { display: flex; gap: 22px; align-items: center; }
.legend-item { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 10px; color: #8892b0; }

/* Info card */
.metro-info-card {
  position: absolute; right: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 22px; width: 320px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.info-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.info-chip {
  font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  border: 1px solid; letter-spacing: 0.04em;
}
.info-date { font-size: 10px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.12em; }
.info-title { font-family: var(--font-display); font-size: 18px; color: #e8edf5; line-height: 1.15; margin-bottom: 6px; }
.info-desc { font-size: 11px; color: #8892b0; margin-bottom: 16px; line-height: 1.5; }
.info-progress { display: flex; align-items: center; gap: 4px; }
.prog-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid; flex-shrink: 0; }
.prog-line { flex: 1; height: 2px; opacity: 0.4; }
.info-progress-labels { display: flex; justify-content: space-between; margin-top: 8px; font-size: 10px; color: #8892b0; }

@media (max-width: 900px) {
  .metro-view { padding: 0 20px 32px; }
  .metro-legend, .metro-info-card { position: static; width: 100%; margin-top: 12px; }
}
</style>
