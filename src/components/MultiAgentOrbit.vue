<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Agent {
  id: string
  label: string
  sub: string
  color: string
  icon: string
  angle: number
}

const agents: Agent[] = [
  { id: 'profile', label: '画像智能体', sub: 'Profile Agent', color: '#00d4ff', icon: '◎', angle: -90 },
  { id: 'path', label: '路径规划', sub: 'Path Planner', color: '#3b82f6', icon: '◎', angle: -18 },
  { id: 'eval', label: '评估智能体', sub: 'Evaluator', color: '#7c3aed', icon: '◎', angle: 54 },
  { id: 'tutor', label: 'AI 导师', sub: 'AI Tutor', color: '#06d6a0', icon: '◎', angle: 126 },
  { id: 'resource', label: '资源推荐', sub: 'Resource Engine', color: '#f59e0b', icon: '◎', angle: 198 },
]

const CX = 500
const CY = 300
const ORBIT_R = 200

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const agentPositions = computed(() =>
  agents.map(a => ({ ...a, ...polar(CX, CY, ORBIT_R, a.angle) }))
)

// Connection pairs (all-to-all for the inner pentagon + hub connections)
const connections = computed(() => {
  const pairs: { from: typeof agentPositions.value[0]; to: typeof agentPositions.value[0]; key: string }[] = []
  const pos = agentPositions.value
  for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) {
      pairs.push({ from: pos[i], to: pos[j], key: `${pos[i].id}-${pos[j].id}` })
    }
  }
  return pairs
})

// Hub-to-agent connections
const hubConnections = computed(() =>
  agentPositions.value.map(a => ({ agent: a, key: `hub-${a.id}` }))
)

// Signal particles traveling along paths
interface Signal {
  id: number
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
  color: string
}

const signals = ref<Signal[]>([])
let signalId = 0
let animFrame = 0

function spawnSignal() {
  const fromIdx = Math.floor(Math.random() * agents.length)
  let toIdx = Math.floor(Math.random() * agents.length)
  if (toIdx === fromIdx) toIdx = (toIdx + 1) % agents.length
  signals.value.push({
    id: signalId++,
    fromIdx,
    toIdx,
    progress: 0,
    speed: 0.006 + Math.random() * 0.008,
    color: agents[fromIdx].color,
  })
  if (signals.value.length > 18) signals.value.shift()
}

let spawnTimer: ReturnType<typeof setInterval> | null = null

function tick() {
  for (const s of signals.value) {
    s.progress += s.speed
  }
  signals.value = signals.value.filter(s => s.progress < 1)
  animFrame = requestAnimationFrame(tick)
}

// Deterministic background stars
const bgStars = (() => {
  const out: { x: number; y: number; r: number; o: number; tw: boolean }[] = []
  let seed = 31
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 80; i++) {
    out.push({
      x: rand() * 1000,
      y: rand() * 600,
      r: 0.4 + rand() * 1.2,
      o: 0.12 + rand() * 0.4,
      tw: rand() < 0.3,
    })
  }
  return out
})()

// Data flow labels that float between agents
const flowLabels = [
  { from: 0, to: 1, text: '画像数据' },
  { from: 1, to: 4, text: '路径需求' },
  { from: 4, to: 3, text: '资源包' },
  { from: 3, to: 2, text: '学习记录' },
  { from: 2, to: 0, text: '评估反馈' },
]

const flowLabelPositions = computed(() =>
  flowLabels.map(fl => {
    const fp = agentPositions.value[fl.from]
    const tp = agentPositions.value[fl.to]
    return {
      x: (fp.x + tp.x) / 2,
      y: (fp.y + tp.y) / 2,
      text: fl.text,
      color: fp.color,
    }
  })
)

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('agent-orbit-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'agent-orbit-kf'
    styleEl.textContent = `
      @keyframes orbit-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes orbit-pulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
      @keyframes orbit-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      @keyframes orbit-dash { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-24} }
      @keyframes orbit-hub-glow { 0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.55;transform:translate(-50%,-50%) scale(1.08)} }
      @keyframes orbit-twinkle { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
      @keyframes orbit-label-float { 0%,100%{transform:translateY(0);opacity:0.7} 50%{transform:translateY(-3px);opacity:1} }
    `
    document.head.appendChild(styleEl)
  }
  // Start signal spawning
  spawnTimer = setInterval(spawnSignal, 600)
  animFrame = requestAnimationFrame(tick)
})

onUnmounted(() => {
  styleEl?.remove()
  if (spawnTimer) clearInterval(spawnTimer)
  cancelAnimationFrame(animFrame)
})

const hoveredAgent = ref<string | null>(null)
</script>

<template>
  <div class="agent-orbit-wrap" role="img" aria-label="多智能体协作动画：展示五个学习智能体之间的数据流转与协作关系">
    <svg viewBox="0 0 1000 600" class="agent-orbit-svg" aria-hidden="true">
      <defs>
        <radialGradient id="ao-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.25" />
          <stop offset="60%" stop-color="#7c3aed" stop-opacity="0.08" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="ao-node-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#fff" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <filter id="ao-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="ao-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- Background stars -->
      <circle v-for="(s, i) in bgStars" :key="'s'+i"
        :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
        :style="s.tw ? { animation: `orbit-twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.12}s infinite` } : undefined" />

      <!-- Orbit ring -->
      <circle :cx="CX" :cy="CY" :r="ORBIT_R" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
      <circle :cx="CX" :cy="CY" :r="ORBIT_R" fill="none" stroke="rgba(0,212,255,0.08)" stroke-width="1"
        stroke-dasharray="4 8" :style="{ animation: 'orbit-dash 8s linear infinite' }" />
      <circle :cx="CX" :cy="CY" :r="ORBIT_R + 30" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5" />
      <circle :cx="CX" :cy="CY" :r="ORBIT_R - 30" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5" />

      <!-- Hub glow -->
      <circle :cx="CX" :cy="CY" r="60" fill="url(#ao-hub-glow)"
        :style="{ animation: 'orbit-hub-glow 4s ease-in-out infinite' }" />

      <!-- Agent-to-agent connections -->
      <line v-for="c in connections" :key="c.key"
        :x1="c.from.x" :y1="c.from.y" :x2="c.to.x" :y2="c.to.y"
        stroke="rgba(255,255,255,0.04)" stroke-width="0.8" />

      <!-- Hub-to-agent connections -->
      <line v-for="hc in hubConnections" :key="hc.key"
        :x1="CX" :y1="CY" :x2="hc.agent.x" :y2="hc.agent.y"
        :stroke="hc.agent.color" :stroke-opacity="0.12" stroke-width="1"
        stroke-dasharray="3 6" :style="{ animation: 'orbit-dash 6s linear infinite' }" />

      <!-- Signal particles -->
      <g v-for="s in signals" :key="s.id">
        <circle
          :cx="agentPositions[s.fromIdx].x + (agentPositions[s.toIdx].x - agentPositions[s.fromIdx].x) * s.progress"
          :cy="agentPositions[s.fromIdx].y + (agentPositions[s.toIdx].y - agentPositions[s.fromIdx].y) * s.progress"
          r="3" :fill="s.color" :opacity="0.9" filter="url(#ao-glow)" />
        <circle
          :cx="agentPositions[s.fromIdx].x + (agentPositions[s.toIdx].x - agentPositions[s.fromIdx].x) * s.progress"
          :cy="agentPositions[s.fromIdx].y + (agentPositions[s.toIdx].y - agentPositions[s.fromIdx].y) * s.progress"
          r="6" :fill="s.color" :opacity="0.25" />
      </g>

      <!-- Hub center -->
      <circle :cx="CX" :cy="CY" r="18" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.3)" stroke-width="1.5" filter="url(#ao-glow)" />
      <circle :cx="CX" :cy="CY" r="6" fill="#00d4ff" opacity="0.6" filter="url(#ao-glow)" />
      <circle :cx="CX" :cy="CY" r="2.5" fill="#fff" opacity="0.9" />

      <!-- Agent nodes -->
      <g v-for="(a, i) in agentPositions" :key="a.id"
        :style="{ animation: `orbit-float ${3 + i * 0.4}s ease-in-out ${i * 0.2}s infinite` }"
        @mouseenter="hoveredAgent = a.id" @mouseleave="hoveredAgent = null">
        <!-- Outer pulse ring -->
        <circle :cx="a.x" :cy="a.y" r="32" fill="none" :stroke="a.color" stroke-width="1"
          :stroke-opacity="hoveredAgent === a.id ? 0.5 : 0.15"
          :style="{ transformOrigin: `${a.x}px ${a.y}px`, animation: 'orbit-pulse 3s ease-in-out infinite' }" />
        <!-- Glow -->
        <circle :cx="a.x" :cy="a.y" r="24" :fill="a.color" :opacity="0.12" filter="url(#ao-glow-lg)" />
        <!-- Main circle -->
        <circle :cx="a.x" :cy="a.y" r="20" :fill="a.color" :opacity="0.2" :stroke="a.color" stroke-width="1.5" />
        <!-- Inner bright core -->
        <circle :cx="a.x" :cy="a.y" r="8" :fill="a.color" :opacity="0.6" filter="url(#ao-glow)" />
        <circle :cx="a.x" :cy="a.y" r="3" fill="#fff" :opacity="0.8" />
      </g>

      <!-- Flow labels along paths -->
      <g v-for="(fl, i) in flowLabelPositions" :key="'fl'+i"
        :style="{ animation: `orbit-label-float ${3.5 + i * 0.3}s ease-in-out ${i * 0.15}s infinite` }">
        <rect :x="fl.x - 30" :y="fl.y - 10" width="60" height="20" rx="10"
          fill="rgba(7,7,13,0.7)" :stroke="fl.color" stroke-opacity="0.2" stroke-width="0.5" />
        <text :x="fl.x" :y="fl.y + 4" text-anchor="middle" :fill="fl.color"
          font-size="9" font-family="var(--font-mono)" letter-spacing="0.06em" opacity="0.7">
          {{ fl.text }}
        </text>
      </g>
    </svg>

    <!-- Agent labels (HTML overlays for better typography) -->
    <div v-for="(a, i) in agentPositions" :key="'label-'+a.id"
      class="agent-label"
      :style="{
        left: (a.x / 1000 * 100) + '%',
        top: ((a.y + 36) / 600 * 100) + '%',
        '--agent-color': a.color,
      }">
      <div class="agent-label-name">{{ a.label }}</div>
      <div class="agent-label-sub">{{ a.sub }}</div>
    </div>

    <!-- Hub label -->
    <div class="hub-label" :style="{ left: (CX / 1000 * 100) + '%', top: ((CY - 40) / 600 * 100) + '%' }">
      <div class="hub-label-text">学习闭环引擎</div>
    </div>

    <!-- Hover detail card -->
    <Transition name="card-fade">
      <div v-if="hoveredAgent" class="agent-detail-card"
        :style="{ '--card-accent': agentPositions.find(a => a.id === hoveredAgent)?.color }">
        <div class="detail-agent-name">
          {{ agentPositions.find(a => a.id === hoveredAgent)?.label }}
        </div>
        <div class="detail-agent-role">
          {{ agentPositions.find(a => a.id === hoveredAgent)?.sub }}
        </div>
        <div class="detail-agent-desc">
          {{ getAgentDesc(hoveredAgent) }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
function getAgentDesc(id: string): string {
  const descs: Record<string, string> = {
    profile: '分析学习行为、测评成绩与提问记录，构建动态学生画像',
    path: '根据画像生成个性化学习路径，覆盖预习到复习全流程',
    eval: '阶段性测评与错因分析，掌握度追踪与薄弱点定位',
    tutor: '实时答疑、知识讲解与练习推荐，自适应调整难度',
    resource: '智能匹配知识卡片、视频、练习题等多模态学习资源',
  }
  return descs[id] ?? ''
}
</script>

<style scoped>
.agent-orbit-wrap {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  aspect-ratio: 1000 / 600;
}

.agent-orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.agent-label {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
  white-space: nowrap;
}

.agent-label-name {
  font-family: var(--font-display);
  font-size: 14px;
  color: #e8edf5;
  letter-spacing: 0.02em;
}

.agent-label-sub {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--agent-color, #8892b0);
  letter-spacing: 0.1em;
  opacity: 0.6;
  margin-top: 2px;
}

.hub-label {
  position: absolute;
  transform: translateX(-50%);
  pointer-events: none;
  white-space: nowrap;
}

.hub-label-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #00d4ff;
  letter-spacing: 0.12em;
  opacity: 0.6;
  text-align: center;
}

.agent-detail-card {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(12, 12, 30, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 2px solid var(--card-accent, #00d4ff);
  border-radius: 14px;
  padding: 16px 24px;
  min-width: 260px;
  text-align: center;
  z-index: 10;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.detail-agent-name {
  font-family: var(--font-display);
  font-size: 18px;
  color: #e8edf5;
  margin-bottom: 2px;
}

.detail-agent-role {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--card-accent, #8892b0);
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}

.detail-agent-desc {
  font-size: 12px;
  color: #8892b0;
  line-height: 1.6;
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .agent-orbit-svg * {
    animation: none !important;
  }
}
</style>
