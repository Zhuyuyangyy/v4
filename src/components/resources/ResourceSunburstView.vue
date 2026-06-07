<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { BASE_KNOWLEDGE_ITEMS, buildConcentricView } from './mapTransforms'
import type { ConcentricRing, ConcentricNode } from './mapTypes'

const emit = defineEmits<{ 'select-node': [nodeId: string] }>()

const concentricRings = buildConcentricView('dl4', BASE_KNOWLEDGE_ITEMS)

const PALETTE = {
  cyan: '#00d4ff', blue: '#3b82f6', purple: '#7c3aed',
  emerald: '#06d6a0', amber: '#f59e0b', rose: '#f43f5e',
  text: '#e8edf5', textSub: '#8892b0', textTri: '#4a5568',
  pink: '#ff6b9d', yellow: '#ffd700',
}

const RING_COLORS: Record<string, string> = {
  prerequisite: PALETTE.cyan,
  current: PALETTE.emerald,
  application: PALETTE.amber,
  extension: PALETTE.purple,
}

const RING_ALPHAS: Record<string, number> = {
  prerequisite: 0.85,
  current: 1.0,
  application: 0.65,
  extension: 0.45,
}

const RING = { centerR: 92, ring1In: 108, ring1Out: 196, ring2In: 210, ring2Out: 298, ring3In: 312, ring3Out: 380, ring4In: 394, ring4Out: 448 }
const STAGE_W = 1920
const STAGE_H = 1080

const RING_BOUNDS: Record<string, { rIn: number; rOut: number }> = {
  prerequisite: { rIn: RING.ring1In, rOut: RING.ring1Out },
  current: { rIn: RING.ring2In, rOut: RING.ring2Out },
  application: { rIn: RING.ring3In, rOut: RING.ring3Out },
  extension: { rIn: RING.ring4In, rOut: RING.ring4Out },
}

// --- Geometry ---
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number) {
  const p1 = polar(cx, cy, rOut, a0), p2 = polar(cx, cy, rOut, a1)
  const p3 = polar(cx, cy, rIn, a1), p4 = polar(cx, cy, rIn, a0)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
}

function hexA(hex: string, a: number) {
  return hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')
}

// --- Stars (deterministic) ---
const STARS = (() => {
  const out: { x: number; y: number; r: number; o: number; tw: boolean; d: number }[] = []
  let s = 47
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 200; i++) {
    out.push({ x: rand() * STAGE_W, y: rand() * STAGE_H, r: 0.3 + rand() * 1.6, o: 0.08 + rand() * 0.5, tw: rand() < 0.3, d: rand() * 4 })
  }
  return out
})()

// --- Segments ---
interface RingNode extends ConcentricNode { ringId: string; ringLabel: string; ringType: string }

const allRingNodes: RingNode[] = concentricRings.flatMap(ring =>
  ring.nodes.map(n => ({ ...n, ringId: ring.id, ringLabel: ring.label, ringType: ring.relationType }))
)

// --- State ---
const hoverNode = ref<RingNode | null>(null)
const focusedNode = ref<RingNode | null>(null)
const mouse = ref({ x: 0, y: 0 })

const focusedRingId = computed(() => focusedNode.value?.ringId ?? hoverNode.value?.ringId ?? null)
const focusedNodeId = computed(() => focusedNode.value?.id ?? null)
const isAnyFocused = computed(() => !!focusedRingId.value)

// --- Animated counter ---
const allNodes = concentricRings.flatMap(r => r.nodes)
const totalMastery = allNodes.reduce((s, n) => s + n.mastery, 0) / allNodes.length
const animVal = ref(focusedNode.value ? focusedNode.value.mastery * 100 : totalMastery * 100)
let animRaf = 0

function animateTo(target: number) {
  const start = animVal.value
  const t0 = performance.now()
  const dur = 700
  cancelAnimationFrame(animRaf)
  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / dur)
    const ease = 1 - Math.pow(1 - t, 3)
    animVal.value = start + (target - start) * ease
    if (t < 1) animRaf = requestAnimationFrame(tick)
  }
  animRaf = requestAnimationFrame(tick)
}

const centerPercent = computed(() => Math.round(animVal.value))

watch(focusedNode, () => {
  const target = focusedNode.value ? focusedNode.value.mastery * 100 : totalMastery * 100
  animateTo(target)
}, { immediate: true })

// --- Mouse ---
function onMove(e: MouseEvent) { mouse.value = { x: e.clientX, y: e.clientY } }
onMounted(() => window.addEventListener('mousemove', onMove))
onUnmounted(() => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animRaf) })

function onNodeHover(node: RingNode | null) { hoverNode.value = node }
function onNodeClick(node: RingNode) {
  if (focusedNode.value && focusedNode.value.id === node.id) focusedNode.value = null
  else focusedNode.value = node
  emit('select-node', node.id)
}
function closeDetail() { focusedNode.value = null }

// --- Derived ---
const nodeCount = allNodes.length
const weakCount = allNodes.filter(n => n.mastery < 0.4).length
const recommendedCount = allNodes.filter(n => n.recommended).length
const masteredCount = computed(() => {
  if (!focusedNode.value) return allNodes.filter(n => n.mastery >= 0.9).length
  const ring = concentricRings.find(r => r.id === focusedNode.value!.ringId)
  return ring ? ring.nodes.filter(n => n.mastery >= 0.9).length : 0
})
const inProgressCount = computed(() => {
  if (!focusedNode.value) return allNodes.filter(n => n.mastery > 0 && n.mastery < 0.9).length
  const ring = concentricRings.find(r => r.id === focusedNode.value!.ringId)
  return ring ? ring.nodes.filter(n => n.mastery > 0 && n.mastery < 0.9).length : 0
})
</script>

<template>
  <div class="sunburst-wrap" @mousemove="onMove">
    <!-- Stats strip -->
    <div class="sb-stats">
      <div class="sb-stat-card">
        <div class="sb-stat-label">已点亮</div>
        <div class="sb-stat-val"><span class="sb-stat-num">{{ masteredCount }}</span><span class="sb-stat-sub"> / {{ nodeCount }}</span></div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">进行中</div>
        <div class="sb-stat-val"><span class="sb-stat-num" style="color:var(--color-accent-cyan)">{{ inProgressCount }}</span><span class="sb-stat-sub"> 个</span></div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">薄弱节点</div>
        <div class="sb-stat-val"><span class="sb-stat-num" style="color:var(--color-accent-rose)">{{ weakCount }}</span><span class="sb-stat-sub"> 个</span></div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">推荐学习</div>
        <div class="sb-stat-val"><span class="sb-stat-num" style="color:var(--color-accent-amber)">{{ recommendedCount }}</span><span class="sb-stat-sub"> 个</span></div>
      </div>
    </div>

    <!-- Legend -->
    <div class="sb-legend">
      <div class="sb-legend-title">RINGS &middot; 由内向外</div>
      <div v-for="(ring, i) in concentricRings" :key="ring.id" class="sb-legend-row">
        <span class="sb-legend-dot" :style="{ background: hexA(RING_COLORS[ring.relationType], 0.18), borderColor: RING_COLORS[ring.relationType], color: RING_COLORS[ring.relationType] }">{{ i + 1 }}</span>
        <span class="sb-legend-label">{{ ring.label }}</span>
        <span class="sb-legend-info">{{ ring.nodes.length }} 个节点</span>
      </div>
    </div>

    <!-- Hint -->
    <div class="sb-hint" :style="{ opacity: focusedNode ? 0 : 0.7 }">
      <span class="sb-hint-dot"></span>
      HOVER &middot; CLICK 任意节点
    </div>

    <!-- SVG Stage -->
    <svg class="sb-svg" :viewBox="`0 0 ${STAGE_W} ${STAGE_H}`" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="sb-cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="PALETTE.purple" stop-opacity="0.5" />
          <stop offset="50%" :stop-color="PALETTE.purple" stop-opacity="0.18" />
          <stop offset="100%" :stop-color="PALETTE.purple" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="sb-cd" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1a1638" />
          <stop offset="60%" stop-color="#0c0c1a" />
          <stop offset="100%" stop-color="#07070d" />
        </radialGradient>
        <filter id="sb-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="sb-blur-md" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <!-- Stars -->
      <g>
        <circle v-for="(s, i) in STARS" :key="'s'+i" :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
          :class="s.tw ? 'sb-twinkle' : undefined" :style="s.tw ? { animationDelay: `${s.d}s` } : undefined" />
      </g>

      <!-- Center halo -->
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.ring4Out + 50" fill="url(#sb-cg)" opacity="0.55" />

      <!-- Guide rings -->
      <template v-for="ring in concentricRings" :key="'g-'+ring.id">
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING_BOUNDS[ring.relationType].rIn" fill="none" stroke="#fff" :stroke-opacity="0.04" stroke-width="1" />
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING_BOUNDS[ring.relationType].rOut" fill="none" stroke="#fff" :stroke-opacity="0.04" stroke-width="1" />
      </template>

      <!-- Rotating sheen -->
      <g class="sb-orbit-slow">
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.ring4Out + 4" fill="none" :stroke="PALETTE.cyan" :stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="2 240" />
      </g>
      <g class="sb-orbit-slow-rev">
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.ring3Out + 8" fill="none" :stroke="PALETTE.purple" :stroke-opacity="0.4" stroke-width="1" stroke-dasharray="1 320" />
      </g>

      <!-- Concentric rings -->
      <g v-for="ring in concentricRings" :key="'ring-'+ring.id"
        :style="{ opacity: isAnyFocused && focusedRingId !== ring.id ? 0.35 : 1, transition: 'opacity 0.35s ease' }">
        <template v-for="node in ring.nodes" :key="node.id">
          <g @mouseenter="onNodeHover({ ...node, ringId: ring.id, ringLabel: ring.label, ringType: ring.relationType })"
            @mouseleave="onNodeHover(null)"
            @click="onNodeClick({ ...node, ringId: ring.id, ringLabel: ring.label, ringType: ring.relationType })"
            :style="{ cursor: 'pointer', transition: 'opacity 0.3s ease' }">
            <circle :cx="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).x"
              :cy="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).y"
              :r="focusedNodeId === node.id ? 28 : 22"
              :fill="node.mastery < 0.4 ? hexA(PALETTE.pink, 0.12 * RING_ALPHAS[ring.relationType]) : hexA(RING_COLORS[ring.relationType], 0.08 * RING_ALPHAS[ring.relationType])"
              :stroke="node.recommended ? PALETTE.yellow : (focusedNodeId === node.id ? RING_COLORS[ring.relationType] : hexA(RING_COLORS[ring.relationType], 0.35 * RING_ALPHAS[ring.relationType]))"
              :stroke-width="node.recommended ? 2 : (focusedNodeId === node.id ? 2 : 0.8)"
              :stroke-dasharray="node.recommended ? '4 3' : undefined"
              style="transition: all 0.2s ease" />
            <circle :cx="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).x"
              :cy="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).y"
              :r="focusedNodeId === node.id ? 28 : 22"
              :fill="node.mastery < 0.4 ? hexA(PALETTE.pink, 0.25 * RING_ALPHAS[ring.relationType] * node.mastery) : hexA(RING_COLORS[ring.relationType], 0.4 * RING_ALPHAS[ring.relationType] * node.mastery)"
              :filter="node.mastery > 0.5 || focusedNodeId === node.id ? 'url(#sb-blur)' : undefined"
              style="transition: all 0.2s ease" />
            <circle v-if="focusedNodeId === node.id"
              :cx="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).x"
              :cy="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).y"
              r="30" :fill="hexA('#ffffff', 0.06)" />
            <circle v-if="node.recommended"
              :cx="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).x"
              :cy="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, node.angle).y"
              r="26" fill="none" :stroke="PALETTE.yellow" stroke-width="1.5" stroke-dasharray="4 3" class="sb-pulse-soft" />
          </g>
        </template>
      </g>

      <!-- Connection lines from center to focused node -->
      <g v-if="focusedNode" key="beam">
        <line :x1="STAGE_W/2" :y1="STAGE_H/2"
          :x2="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[focusedNode.ringType].rIn + RING_BOUNDS[focusedNode.ringType].rOut) / 2, focusedNode.angle).x"
          :y2="polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[focusedNode.ringType].rIn + RING_BOUNDS[focusedNode.ringType].rOut) / 2, focusedNode.angle).y"
          :stroke="RING_COLORS[focusedNode.ringType]" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="3 6" class="sb-shimmer" />
        <circle :cx="polar(STAGE_W/2, STAGE_H/2, RING.centerR, focusedNode.angle).x"
          :cy="polar(STAGE_W/2, STAGE_H/2, RING.centerR, focusedNode.angle).y"
          r="3" :fill="RING_COLORS[focusedNode.ringType]" filter="url(#sb-blur)" />
      </g>

      <!-- Flow particles -->
      <g class="sb-flow-orbit">
        <circle v-for="i in 5" :key="'fp'+i" :cx="polar(STAGE_W/2, STAGE_H/2, RING.ring4Out + 14, i * 72).x" :cy="polar(STAGE_W/2, STAGE_H/2, RING.ring4Out + 14, i * 72).y" r="2" :fill="PALETTE.cyan" opacity="0.65" filter="url(#sb-blur)" />
      </g>

      <!-- Center disc ring -->
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.centerR + 14" fill="none" :stroke="hexA(PALETTE.purple, 0.18)" stroke-width="1" stroke-dasharray="2 4" class="sb-orbit-med" />
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.centerR" fill="url(#sb-cd)" :stroke="hexA(PALETTE.purple, 0.5)" stroke-width="1.5" />
    </svg>

    <!-- Node labels (HTML overlay) -->
    <template v-for="ring in concentricRings" :key="'nl-'+ring.id">
      <div v-for="node in ring.nodes" :key="'nl-'+node.id" class="sb-sub-label" :style="{
        left: polar(STAGE_W/2, STAGE_H/2, RING_BOUNDS[ring.relationType].rOut + 24, node.angle).x / STAGE_W * 100 + '%',
        top: polar(STAGE_W/2, STAGE_H/2, RING_BOUNDS[ring.relationType].rOut + 24, node.angle).y / STAGE_H * 100 + '%',
        opacity: focusedRingId && focusedRingId !== ring.id ? 0.32 : 1,
      }">
        <div class="sb-sl-name" :style="{
          fontSize: (focusedNodeId === node.id || hoverNode?.id === node.id) ? '14px' : '12.5px',
          fontWeight: (focusedNodeId === node.id || hoverNode?.id === node.id) ? 600 : 500,
          color: focusedNodeId === node.id ? RING_COLORS[ring.relationType] : (node.mastery > 0.5 ? PALETTE.text : PALETTE.textSub),
        }">{{ node.label }}</div>
        <div class="sb-sl-pct" :style="{ color: node.mastery < 0.4 ? PALETTE.pink : RING_COLORS[ring.relationType] }">{{ Math.round(node.mastery * 100) }}%</div>
      </div>
    </template>

    <!-- Ring labels -->
    <template v-for="(ring, i) in concentricRings" :key="'rl-'+ring.id">
      <div class="sb-domain-label" :style="{
        left: polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, i * 90 + 45).x / STAGE_W * 100 + '%',
        top: polar(STAGE_W/2, STAGE_H/2, (RING_BOUNDS[ring.relationType].rIn + RING_BOUNDS[ring.relationType].rOut) / 2, i * 90 + 45).y / STAGE_H * 100 + '%',
        opacity: focusedRingId && focusedRingId !== ring.id ? 0.35 : 1,
      }">
        <div class="sb-dl-name" :style="{ color: RING_COLORS[ring.relationType], fontSize: '16px' }">{{ ring.label }}</div>
      </div>
    </template>

    <!-- Center label -->
    <div class="sb-center">
      <div class="sb-center-sub">{{ focusedNode ? 'FOCUSED &middot; 此项' : 'TRANSFORMER' }}</div>
      <div class="sb-center-pct">{{ centerPercent }}<span class="sb-center-pct-unit">%</span></div>
      <div class="sb-center-info">
        <template v-if="focusedNode">{{ focusedNode.label }}<br />{{ focusedNode.ringLabel }}</template>
        <template v-else>{{ concentricRings.length }} 层环 &middot; {{ nodeCount }} 节点<br />知识扩散视图</template>
      </div>
    </div>

    <!-- Hover tooltip -->
    <div v-if="hoverNode && (!focusedNode || focusedNode.id !== hoverNode.id)" class="sb-tooltip" :style="{ left: mouse.x + 16 + 'px', top: mouse.y + 16 + 'px' }">
      <div class="sb-tt-en" :style="{ color: RING_COLORS[hoverNode.ringType] }">{{ hoverNode.ringLabel.toUpperCase() }}</div>
      <div class="sb-tt-name">{{ hoverNode.label }}</div>
      <div class="sb-tt-bar-wrap">
        <div class="sb-tt-bar-bg"><div class="sb-tt-bar" :style="{ width: hoverNode.mastery * 100 + '%', background: hoverNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[hoverNode.ringType] }"></div></div>
        <span class="sb-tt-pct" :style="{ color: hoverNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[hoverNode.ringType] }">{{ Math.round(hoverNode.mastery * 100) }}%</span>
      </div>
      <div class="sb-tt-hint">{{ hoverNode.recommended ? '⭐ 推荐学习 &middot; ' : '' }}点击查看详情</div>
    </div>

    <!-- Detail panel -->
    <transition name="sb-slide">
      <div v-if="focusedNode" class="sb-detail">
        <div class="sb-detail-header">
          <span class="sb-detail-tag" :style="{ color: RING_COLORS[focusedNode.ringType], background: hexA(RING_COLORS[focusedNode.ringType], 0.1), borderColor: hexA(RING_COLORS[focusedNode.ringType], 0.25) }">
            <span class="sb-detail-tag-dot" :style="{ background: RING_COLORS[focusedNode.ringType], boxShadow: `0 0 6px ${RING_COLORS[focusedNode.ringType]}` }"></span>
            {{ focusedNode.ringLabel.toUpperCase() }}
          </span>
          <button class="sb-detail-close" @click="closeDetail">&times;</button>
        </div>
        <div class="sb-detail-title">{{ focusedNode.label }}</div>
        <div class="sb-detail-sub">中心: Transformer &middot; {{ focusedNode.ringLabel }}</div>

        <div class="sb-detail-mastery">
          <div class="sb-detail-mastery-head">
            <span class="sb-detail-mastery-label">掌握度</span>
            <span class="sb-detail-mastery-val" :style="{ color: focusedNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[focusedNode.ringType] }">{{ Math.round(focusedNode.mastery * 100) }}%</span>
          </div>
          <div class="sb-detail-mastery-bar-bg">
            <div class="sb-detail-mastery-bar" :style="{ width: focusedNode.mastery * 100 + '%', background: `linear-gradient(90deg, ${focusedNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[focusedNode.ringType]}, ${PALETTE.cyan})`, boxShadow: `0 0 12px ${focusedNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[focusedNode.ringType]}88` }"></div>
          </div>
        </div>

        <div class="sb-detail-stats">
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedNode.mastery >= 0.9 ? '#06d6a0' : PALETTE.textSub }">{{ focusedNode.mastery >= 0.9 ? '是' : '否' }}</div>
            <div class="sb-detail-stat-label">已精通</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedNode.mastery < 0.4 ? PALETTE.pink : RING_COLORS[focusedNode.ringType] }">{{ focusedNode.mastery < 0.4 ? '薄弱' : '正常' }}</div>
            <div class="sb-detail-stat-label">状态</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedNode.recommended ? PALETTE.yellow : PALETTE.textSub }">{{ focusedNode.recommended ? '是' : '否' }}</div>
            <div class="sb-detail-stat-label">推荐</div>
          </div>
        </div>

        <div class="sb-detail-concepts-title">RELATION &middot; 关系</div>
        <div class="sb-detail-concepts">
          <div class="sb-detail-concept" :class="focusedNode.mastery >= 0.9 ? 'done' : focusedNode.mastery > 0 ? 'partial' : 'todo'">
            <div class="sb-dc-dot" :class="focusedNode.mastery >= 0.9 ? 'done' : focusedNode.mastery > 0 ? 'partial' : 'todo'"
              :style="focusedNode.mastery >= 0.9 ? { background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' } : focusedNode.mastery > 0 ? { background: RING_COLORS[focusedNode.ringType] } : {}"></div>
            <span class="sb-dc-name" :class="{ 'sb-dc-todo': focusedNode.mastery === 0, 'sb-dc-done': focusedNode.mastery >= 0.9 }">中心: Transformer</span>
            <span class="sb-dc-pct" :style="{ color: PALETTE.textTri }">10%</span>
          </div>
          <div class="sb-detail-concept partial" :style="{ animationDelay: '0.04s' }">
            <div class="sb-dc-dot partial" :style="{ background: RING_COLORS[focusedNode.ringType] }"></div>
            <span class="sb-dc-name">关系: {{ focusedNode.ringLabel }}</span>
            <span class="sb-dc-pct" :style="{ color: RING_COLORS[focusedNode.ringType] }">{{ focusedNode.ringType === 'prerequisite' ? '先修' : focusedNode.ringType === 'current' ? '同域' : focusedNode.ringType === 'application' ? '应用' : '拓展' }}</span>
          </div>
          <div v-if="focusedNode.recommended" class="sb-detail-concept partial" :style="{ animationDelay: '0.08s' }">
            <div class="sb-dc-dot partial" :style="{ background: PALETTE.yellow }"></div>
            <span class="sb-dc-name">推荐学习</span>
            <span class="sb-dc-pct" :style="{ color: PALETTE.yellow }">⭐</span>
          </div>
        </div>

        <button class="sb-detail-btn" :style="{ background: `linear-gradient(135deg, ${RING_COLORS[focusedNode.ringType]}, ${PALETTE.purple})`, boxShadow: `0 6px 22px ${hexA(RING_COLORS[focusedNode.ringType], 0.4)}` }">
          进入 {{ focusedNode.label }} 学习 &rarr;
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.sunburst-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 80vh;
  background: radial-gradient(ellipse 1100px 800px at 50% 50%, #7c3aed1c, transparent 60%),
    radial-gradient(ellipse 1300px 900px at 15% 15%, #00d4ff0a, transparent 60%),
    radial-gradient(ellipse 1100px 800px at 85% 85%, #f43f5e08, transparent 60%),
    #07070d;
  border-radius: 18px;
  overflow: hidden;
  margin: 0 40px 40px;
}

.sb-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Animations */
@keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes shimmer-flow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -200; } }
@keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes orbit-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes float-up { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
@keyframes count-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }

.sb-twinkle { animation: twinkle 2.4s ease-in-out infinite; }
.sb-pulse-soft { animation: pulse-soft 1.8s ease-in-out infinite; }
.sb-shimmer { animation: shimmer-flow 1.6s linear infinite; }
.sb-orbit-slow { transform-origin: 960px 540px; animation: orbit-spin 80s linear infinite; }
.sb-orbit-slow-rev { transform-origin: 960px 540px; animation: orbit-spin-rev 110s linear infinite; }
.sb-orbit-med { transform-origin: 960px 540px; animation: orbit-spin 30s linear infinite; }
.sb-flow-orbit { transform-origin: 960px 540px; animation: orbit-spin 18s linear infinite; }

/* Stats strip */
.sb-stats {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 18;
  display: flex;
  gap: 12px;
  align-items: center;
  animation: float-up 0.7s ease 0.2s both;
}
.sb-stat-card {
  background: rgba(12, 12, 30, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px 18px;
  min-width: 90px;
}
.sb-stat-wide { min-width: 170px; }
.sb-stat-label { font-size: 9px; letter-spacing: 0.18em; color: #8892b0; font-family: var(--font-mono); margin-bottom: 4px; }
.sb-stat-val { display: flex; align-items: baseline; gap: 5px; }
.sb-stat-num { font-family: var(--font-display); font-size: 20px; color: #06d6a0; line-height: 1; }
.sb-stat-sub { font-size: 10px; color: #8892b0; }

/* Legend */
.sb-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 20;
  padding: 18px 24px;
  background: rgba(12, 12, 30, 0.72);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  animation: float-up 0.7s ease 0.4s both;
}
.sb-legend-title { font-size: 10px; letter-spacing: 0.22em; color: #8892b0; margin-bottom: 12px; font-family: var(--font-mono); }
.sb-legend-row { display: flex; align-items: center; gap: 10px; font-size: 12px; margin-bottom: 9px; }
.sb-legend-dot {
  width: 20px; height: 20px; border-radius: 4px;
  border: 1.5px solid;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-family: var(--font-mono); font-weight: 600;
}
.sb-legend-label { color: #e8edf5; font-weight: 500; min-width: 130px; }
.sb-legend-info { color: #8892b0; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; }

/* Hint */
.sb-hint {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 15;
  font-size: 12px;
  color: #8892b0;
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.sb-hint-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00d4ff;
  animation: pulse-soft 1.6s ease-in-out infinite;
}

/* Domain labels */
.sb-domain-label {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
  transition: opacity 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
}
.sb-dl-name { font-family: var(--font-display); font-size: 22px; color: #e8edf5; line-height: 1.05; white-space: nowrap; }
.sb-dl-pct { font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.2em; margin-top: 4px; }

/* Sub-topic labels */
.sb-sub-label {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}
.sb-sl-name { font-family: var(--font-sans, 'Outfit', sans-serif); text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9); transition: all 0.25s ease; }
.sb-sl-pct { font-size: 10px; font-family: var(--font-mono); margin-top: 2px; opacity: 0.85; }

/* Center label */
.sb-center {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  text-align: center;
  pointer-events: none;
  z-index: 5;
}
.sb-center-sub { font-size: 10px; color: #8892b0; letter-spacing: 0.28em; font-family: var(--font-mono); margin-bottom: 6px; transition: color 0.3s ease; }
.sb-center-pct {
  font-family: var(--font-display); font-size: 64px; color: #e8edf5; line-height: 1; letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  animation: count-pulse 3s ease-in-out infinite;
}
.sb-center-pct-unit { font-size: 26px; color: #8892b0; }
.sb-center-info { font-size: 12px; color: #8892b0; margin-top: 10px; line-height: 1.45; font-family: var(--font-sans, 'Outfit', sans-serif); }

/* Tooltip */
.sb-tooltip {
  position: fixed;
  pointer-events: none;
  z-index: 50;
  background: rgba(12, 12, 30, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid;
  border-radius: 10px;
  padding: 10px 14px;
  max-width: 260px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: float-up 0.18s ease;
}
.sb-tt-en { font-size: 9px; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 4px; }
.sb-tt-name { font-family: var(--font-display); font-size: 20px; color: #e8edf5; line-height: 1.1; }
.sb-tt-bar-wrap { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.sb-tt-bar-bg { flex: 1; height: 3px; background: rgba(255, 255, 255, 0.06); border-radius: 2px; overflow: hidden; }
.sb-tt-bar { height: 100%; border-radius: 2px; }
.sb-tt-pct { font-size: 11px; font-family: var(--font-mono); font-weight: 600; }
.sb-tt-hint { font-size: 10px; color: #8892b0; margin-top: 6px; }

/* Detail panel */
.sb-detail {
  position: absolute;
  top: 20px; right: 20px;
  width: 380px;
  padding: 26px;
  background: rgba(12, 12, 30, 0.78);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.5);
  z-index: 30;
  max-height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sb-slide-enter-active, .sb-slide-leave-active { transition: opacity 0.32s ease, transform 0.32s ease; }
.sb-slide-enter-from, .sb-slide-leave-to { opacity: 0; transform: translateX(12px); }

.sb-detail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.sb-detail-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-family: var(--font-mono); letter-spacing: 0.18em;
  border: 1px solid; padding: 4px 10px; border-radius: 100px;
}
.sb-detail-tag-dot { width: 6px; height: 6px; border-radius: 50%; }
.sb-detail-close {
  background: transparent; border: none; color: #8892b0;
  cursor: pointer; font-size: 20px; padding: 4px; line-height: 1;
  border-radius: 6px; transition: all 0.2s ease;
}
.sb-detail-close:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }
.sb-detail-title { font-family: var(--font-display); font-size: 32px; line-height: 1.05; margin-bottom: 6px; color: #e8edf5; letter-spacing: -0.02em; }
.sb-detail-sub { font-size: 12px; color: #8892b0; margin-bottom: 18px; line-height: 1.5; }

.sb-detail-mastery { margin-bottom: 16px; }
.sb-detail-mastery-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.sb-detail-mastery-label { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); }
.sb-detail-mastery-val { font-family: var(--font-mono); font-size: 18px; font-weight: 600; }
.sb-detail-mastery-bar-bg { height: 5px; background: rgba(255, 255, 255, 0.06); border-radius: 3px; overflow: hidden; }
.sb-detail-mastery-bar { height: 100%; border-radius: 3px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

.sb-detail-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.sb-detail-stat { padding: 10px 12px; background: rgba(255, 255, 255, 0.025); border-radius: 10px; text-align: center; }
.sb-detail-stat-val { font-family: var(--font-display); font-size: 24px; line-height: 1; }
.sb-detail-stat-label { font-size: 10px; color: #8892b0; margin-top: 4px; letter-spacing: 0.06em; }

.sb-detail-concepts-title { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 10px; }
.sb-detail-concepts { display: flex; flex-direction: column; gap: 5px; overflow-y: auto; flex: 1; min-height: 0; }
.sb-detail-concept {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 11px; border-radius: 8px;
  animation: float-up 0.4s ease both;
}
.sb-detail-concept.done { background: #06d6a010; border: 1px solid #06d6a033; }
.sb-detail-concept.partial { border: 1px solid; }
.sb-detail-concept.todo { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); }
.sb-dc-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.sb-dc-dot.todo { background: transparent; border: 1.5px solid #4a5568; }
.sb-dc-name { flex: 1; font-size: 13px; color: #e8edf5; }
.sb-dc-todo { color: #8892b0; }
.sb-dc-done { text-decoration: line-through; text-decoration-color: #4a5568; }
.sb-dc-pct { font-size: 10px; font-family: var(--font-mono); }

.sb-detail-btn {
  margin-top: 16px; width: 100%; flex-shrink: 0;
  color: #fff; border: none; border-radius: 10px;
  padding: 12px 16px; font-size: 13px; font-weight: 600;
  font-family: var(--font-sans, 'Outfit', sans-serif);
  cursor: pointer; letter-spacing: 0.02em;
}
</style>
