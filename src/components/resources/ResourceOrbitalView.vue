<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { BASE_KNOWLEDGE_ITEMS, buildOrbitView } from './mapTransforms'

const emit = defineEmits<{ 'select-node': [nodeId: string] }>()

const CX = 540, CY = 470

const orbitTracks = buildOrbitView(BASE_KNOWLEDGE_ITEMS)

const TRACK_RADII: { a: number; b: number }[] = [
  { a: 120, b: 88 },
  { a: 180, b: 132 },
  { a: 240, b: 176 },
  { a: 300, b: 220 },
  { a: 360, b: 264 },
  { a: 420, b: 308 },
]

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = angleDeg * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function ellipsePolar(cx: number, cy: number, a: number, b: number, angleDeg: number) {
  const rad = angleDeg * Math.PI / 180
  return { x: cx + a * Math.cos(rad), y: cy + b * Math.sin(rad) }
}

function ellipsePath(cx: number, cy: number, a: number, b: number) {
  return `M${cx - a},${cy} A${a},${b} 0 0,1 ${cx + a},${cy} A${a},${b} 0 0,1 ${cx - a},${cy}`
}

function nodeFill(status: string) {
  switch (status) {
    case 'completed': return '#06d6a0'
    case 'in_progress': return '#f59e0b'
    case 'upcoming': return 'rgba(255,255,255,0.06)'
    case 'remedial': return 'rgba(244,63,94,0.18)'
    default: return 'rgba(255,255,255,0.06)'
  }
}

function nodeStroke(status: string) {
  switch (status) {
    case 'completed': return '#06d6a0'
    case 'in_progress': return '#f59e0b'
    case 'upcoming': return 'rgba(255,255,255,0.25)'
    case 'remedial': return '#f43f5e'
    default: return 'rgba(255,255,255,0.25)'
  }
}

function nodeOpacity(status: string) {
  switch (status) {
    case 'completed': return 0.85
    case 'in_progress': return 1
    case 'upcoming': return 0.55
    case 'remedial': return 0.85
    default: return 0.55
  }
}

// Background stars
const ORBITAL_STARS = (() => {
  const out: { x: number; y: number; r: number; o: number }[] = []
  let s = 113
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 220; i++) {
    out.push({ x: rand() * 1400, y: rand() * 900, r: 0.4 + rand() * 1.6, o: 0.1 + rand() * 0.5 })
  }
  return out
})()

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('orbital-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'orbital-kf'
    styleEl.textContent = `
      @keyframes orbital-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbital-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      @keyframes orbital-pulse { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(2.4);opacity:0} }
      @keyframes orbital-pulse-soft { 0%,100%{opacity:1} 50%{opacity:0.55} }
    `
    document.head.appendChild(styleEl)
  }
})
onUnmounted(() => { styleEl?.remove() })
</script>

<template>
  <div class="orbital-view">
    <div class="orbital-banner">
      <span class="banner-dot" style="background:#7c3aed;box-shadow:0 0 10px #7c3aed66"></span>
      <span>六条轨道代表学习循环的六个阶段：预习 → 理解 → 练习 → 测评 → 反馈 → 补救。节点沿轨道运行，完成即变绿，进行中脉动发光。</span>
    </div>

    <div class="orbital-canvas">
      <svg viewBox="0 0 1400 900" class="orbital-svg">
        <defs>
          <radialGradient id="orb-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.8" />
            <stop offset="30%" stop-color="#7c3aed" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
          </radialGradient>
          <filter id="orb-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="orb-glow-md" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Stars -->
        <circle v-for="(s, i) in ORBITAL_STARS" :key="'s'+i"
          :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o" />

        <!-- Center glow -->
        <circle :cx="CX" :cy="CY" r="100" fill="url(#orb-center-glow)" opacity="0.5" />

        <!-- Track paths + particle flow -->
        <g v-for="(track, ti) in orbitTracks" :key="'track-'+track.id">
          <path :id="'tp-'+track.id" :d="ellipsePath(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b)"
            fill="none" :stroke="track.color" stroke-opacity="0.18" stroke-width="1"
            :stroke-dasharray="ti < 3 ? '4 6' : '2 8'" />
          <path :d="ellipsePath(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b)"
            fill="none" :stroke="track.color" stroke-opacity="0.06" stroke-width="3" />
          <circle r="2" :fill="track.color" opacity="0.5">
            <animateMotion :dur="(22 + ti * 10) + 's'" repeatCount="indefinite">
              <mpath :href="'#tp-' + track.id" />
            </animateMotion>
          </circle>
          <circle r="1.5" :fill="track.color" opacity="0.3">
            <animateMotion :dur="(22 + ti * 10) + 's'" repeatCount="indefinite" :begin="'-' + (5 + ti * 2) + 's'">
              <mpath :href="'#tp-' + track.id" />
            </animateMotion>
          </circle>
        </g>

        <!-- Center -->
        <circle :cx="CX" :cy="CY" r="42" fill="rgba(124,58,237,0.12)" stroke="#7c3aed" stroke-width="1.5" stroke-opacity="0.35" />
        <circle :cx="CX" :cy="CY" r="28" fill="rgba(124,58,237,0.2)" stroke="#7c3aed" stroke-width="1" stroke-opacity="0.5" />

        <!-- Nodes -->
        <g v-for="(track, ti) in orbitTracks" :key="'nodes-'+track.id">
          <g v-for="node in track.nodes" :key="node.id" class="orbital-planet" @click="emit('select-node', node.id)">
            <circle v-if="node.status === 'in_progress'"
              :cx="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x"
              :cy="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y"
              r="20" fill="#f59e0b" opacity="0.2" filter="url(#orb-glow-md)" />
            <circle v-if="node.status === 'remedial'"
              :cx="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x"
              :cy="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y"
              r="18" fill="#f43f5e" opacity="0.15" filter="url(#orb-glow-md)" />
            <circle v-if="node.status === 'in_progress'"
              :cx="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x"
              :cy="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y"
              r="14" fill="none" stroke="#f59e0b" stroke-width="1.5"
              :style="{ transformOrigin: `${ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x}px ${ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y}px`, animation: 'orbital-pulse 2.2s ease-out infinite' }" />
            <circle
              :cx="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x"
              :cy="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y"
              :r="node.status === 'in_progress' ? 10 : 8"
              :fill="nodeFill(node.status)"
              :stroke="nodeStroke(node.status)"
              :stroke-width="node.status === 'remedial' ? 1.5 : 1"
              :opacity="nodeOpacity(node.status)" />
            <text v-if="node.status === 'completed'"
              :x="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x"
              :y="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y + 1"
              fill="#fff" font-size="10" text-anchor="middle" dominant-baseline="middle" opacity="0.85">✓</text>
            <text v-if="node.entersNextCycle"
              :x="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x + 14"
              :y="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y - 10"
              fill="#7c3aed" font-size="11" opacity="0.8">↻</text>
            <text v-if="node.triggeredResource"
              :x="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x - 14"
              :y="ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y - 10"
              fill="#00d4ff" font-size="9" opacity="0.7">◆</text>
          </g>
        </g>
      </svg>

      <!-- Center label -->
      <div class="sun-label">
        <div class="sun-label-tag">LEARNING GOAL</div>
        <div class="sun-label-title">当前学习目标</div>
      </div>

      <!-- Track labels -->
      <div v-for="(track, ti) in orbitTracks" :key="'tl'+ti" class="orbit-label"
        :style="{ left: ((CX - TRACK_RADII[ti].a - 30) / 1400 * 100) + '%', top: ((CY - 10) / 900 * 100) + '%' }">
        <div class="orbit-label-tag" :style="{ color: track.color }">TRACK {{ ti + 1 }}</div>
        <div class="orbit-label-name">{{ track.name }}</div>
      </div>

      <!-- Node labels -->
      <template v-for="(track, ti) in orbitTracks" :key="'nl-wrap-'+track.id">
        <div v-for="node in track.nodes" :key="'nl-'+node.id" class="planet-label"
          :style="{
            left: (ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).x / 1400 * 100) + '%',
            top: (ellipsePolar(CX, CY, TRACK_RADII[ti].a, TRACK_RADII[ti].b, node.angle).y / 900 * 100) + '%',
            transform: 'translate(-50%, -50%) translateY(-18px)',
          }">
          <div class="planet-name" :style="{
            fontSize: node.status === 'in_progress' ? '12px' : '10.5px',
            fontWeight: node.status === 'in_progress' ? 600 : 500,
            color: node.status === 'completed' ? '#06d6a0' : node.status === 'in_progress' ? '#f59e0b' : node.status === 'remedial' ? '#f43f5e' : '#8892b0',
          }">{{ node.label }}</div>
          <div v-if="node.agentInvolved" class="planet-sub" :style="{ color: track.color }">{{ node.agentInvolved }}</div>
        </div>
      </template>

      <!-- Detail panel -->
      <div class="orbital-detail">
        <div class="detail-header">
          <span class="detail-chip" style="background:rgba(124,58,237,0.12);border-color:#7c3aed33;color:#7c3aed">学习循环</span>
          <span class="detail-orbit">ORBITAL · LOOP</span>
        </div>
        <div class="detail-title">六轨学习循环</div>
        <div class="detail-sub">预习 → 理解 → 练习 → 测评 → 反馈 → 补救</div>
        <div class="moons-title">TRACKS · 轨道状态</div>
        <div class="moons-list">
          <div v-for="track in orbitTracks" :key="track.id" class="moon-task" :class="{ now: track.nodes.some(n => n.status === 'in_progress') }">
            <div :class="['moon-check', track.nodes.some(n => n.status === 'in_progress') ? 'now' : track.nodes.every(n => n.status === 'completed') ? 'done' : 'todo']">
              <span v-if="track.nodes.every(n => n.status === 'completed')">✓</span>
              <span v-else-if="track.nodes.some(n => n.status === 'in_progress')">●</span>
            </div>
            <span class="moon-label">{{ track.name }}</span>
            <span class="moon-time">{{ track.nodes.filter(n => n.status === 'completed').length }}/{{ track.nodes.length }}</span>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="orbital-legend">
        <div class="legend-title">NODE · 节点状态</div>
        <div class="legend-items">
          <div v-for="d in [
            { c: '#06d6a0', label: '已完成', desc: 'completed · ✓' },
            { c: '#f59e0b', label: '进行中', desc: 'in_progress', glow: true },
            { c: 'rgba(255,255,255,0.25)', label: '待开始', desc: 'upcoming' },
            { c: '#f43f5e', label: '需补救', desc: 'remedial' },
            { c: '#7c3aed', label: '循环衔接', desc: '↻ entersNextCycle' },
            { c: '#00d4ff', label: '触发资源', desc: '◆ triggeredResource' },
          ]" :key="d.label" class="legend-item">
            <svg width="28" height="20">
              <circle v-if="d.glow" cx="14" cy="10" r="12" :fill="d.c" opacity="0.3" />
              <circle cx="14" cy="10" r="7"
                :fill="d.c.startsWith('rgba') ? 'rgba(255,255,255,0.06)' : d.c" :stroke="d.c"
                stroke-width="1.5" />
            </svg>
            <span class="legend-label-text">{{ d.label }}</span>
            <span class="legend-desc">{{ d.desc }}</span>
          </div>
        </div>
      </div>

      <!-- Top stats -->
      <div class="top-stats">
        <div class="stat-card">
          <div class="stat-label">阶段完成度</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#f59e0b">38%</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">剩余微任务</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#00d4ff">14</span><span class="stat-unit">/ 23</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">本周节奏</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#06d6a0">2.4</span><span class="stat-unit">颗 / 周</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ob-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.orbital-view { padding: 0 40px 40px; animation: ob-float-up 0.5s ease both; }
.orbital-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 20px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.orbital-canvas {
  position: relative; width: 100%; aspect-ratio: 1400 / 900;
  border-radius: 18px; background: rgba(7, 7, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06); overflow: hidden;
}
.orbital-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.orbital-planet { cursor: pointer; }

.sun-label {
  position: absolute; left: calc(540 / 1400 * 100%); top: calc((470 + 110) / 900 * 100%);
  transform: translateX(-50%); z-index: 5; text-align: center; pointer-events: none;
}
.sun-label-tag { font-size: 10px; color: #7c3aed; letter-spacing: 0.22em; font-family: var(--font-mono); margin-bottom: 4px; }
.sun-label-title { font-family: var(--font-display); font-size: 22px; color: #e8edf5; line-height: 1.1; text-shadow: 0 0 20px #7c3aed88; }
.sun-label-date { font-size: 11px; color: #8892b0; margin-top: 4px; font-family: var(--font-mono); letter-spacing: 0.05em; }

.orbit-label {
  position: absolute; transform: translate(-100%, 0);
  text-align: right; pointer-events: none; z-index: 4;
}
.orbit-label-tag { font-size: 10px; font-family: var(--font-mono); letter-spacing: 0.18em; margin-bottom: 2px; }
.orbit-label-name { font-family: var(--font-display); font-size: 14px; color: #e8edf5; text-shadow: 0 0 12px currentColor; }

.planet-label {
  position: absolute; pointer-events: none; z-index: 6; white-space: nowrap;
}
.planet-name { font-weight: 500; text-shadow: 0 1px 6px rgba(0,0,0,0.9); }
.planet-sub { font-size: 9px; font-family: var(--font-mono); letter-spacing: 0.15em; margin-top: 1px; }

/* Detail panel */
.orbital-detail {
  position: absolute; right: 24px; top: 160px; width: 320px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 22px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.detail-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.detail-chip {
  font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  border: 1px solid; letter-spacing: 0.04em;
}
.detail-orbit { font-size: 10px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.18em; }
.detail-title { font-family: var(--font-display); font-size: 24px; color: #e8edf5; line-height: 1.1; margin-bottom: 6px; }
.detail-sub { font-size: 12px; color: #8892b0; margin-bottom: 16px; }
.moons-title { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 10px; }
.moons-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.moon-task {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
}
.moon-task.now { background: #f59e0b12; border-color: #f59e0b66; }
.moon-task.done { background: rgba(6, 214, 160, 0.06); border-color: #06d6a033; }
.moon-check {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; color: #000;
}
.moon-check.done { background: #06d6a0; }
.moon-check.now { background: #f59e0b; box-shadow: 0 0 12px #f59e0bcc; }
.moon-check.todo { background: transparent; border: 1.5px solid #4a5568; }
.moon-label { flex: 1; font-size: 12px; color: #e8edf5; }
.moon-task.done .moon-label { text-decoration: line-through; text-decoration-color: #4a5568; }
.moon-task.todo .moon-label { color: #8892b0; }
.moon-time { font-size: 10px; color: #8892b0; font-family: var(--font-mono); }
.detail-btn {
  width: 100%; color: #fff; border: none; border-radius: 10px;
  padding: 11px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
}

/* Legend */
.orbital-legend {
  position: absolute; right: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 16px 22px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.legend-title { font-size: 10px; letter-spacing: 0.18em; color: #8892b0; margin-bottom: 12px; font-family: var(--font-mono); }
.legend-items { display: flex; flex-direction: column; gap: 8px; }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 11.5px; }
.legend-label-text { color: #e8edf5; font-weight: 500; width: 80px; }
.legend-desc { color: #8892b0; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; }

/* Top stats */
.top-stats {
  position: absolute; top: 20px; right: 20px; z-index: 9;
  display: flex; gap: 12px;
}
.stat-card {
  background: rgba(12,12,30,0.7); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 10px 16px;
}
.stat-label { font-size: 9px; letter-spacing: 0.18em; color: #8892b0; font-family: var(--font-mono); margin-bottom: 3px; }
.stat-value-row { display: flex; align-items: baseline; gap: 4px; }
.stat-big { font-family: var(--font-display); font-size: 22px; line-height: 1; }
.stat-unit { font-size: 10px; color: #8892b0; }

@media (max-width: 900px) {
  .orbital-view { padding: 0 20px 32px; }
  .orbital-detail, .orbital-legend { position: static; width: 100%; margin-top: 12px; }
  .top-stats { position: static; flex-wrap: wrap; margin-top: 12px; }
}
</style>
