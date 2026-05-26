<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ── Tokens ── */
const T = {
  bg: '#050610',
  surface: '#0a0b1c',
  elevated: '#111228',
  card: 'rgba(14, 18, 40, 0.7)',
  cardHover: 'rgba(20, 26, 56, 0.85)',
  cyan: '#00d4ff',
  purple: '#7c3aed',
  emerald: '#06d6a0',
  amber: '#f59e0b',
  rose: '#f43f5e',
  blue: '#3b82f6',
  text: '#e8edf5',
  textSub: '#8892b0',
  textTri: '#4a5568',
  border: 'rgba(255,255,255,0.06)',
  serif: "'Instrument Serif', 'Noto Serif SC', serif",
  sans: "'Outfit', 'PingFang SC', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

/* ── Agent data ── */
interface AgentActivity {
  verb: string; text: string; detail: string; ts: string
}
interface AgentStat { label: string; value: string }
interface Agent {
  id: string; name: string; en: string; role: string; color: string; glyph: string
  angle: number; orbitRx: number; orbitRy: number; orbitTilt: number; planetSize: number
  activity: AgentActivity; stats: AgentStat[]
}

const agents: Agent[] = [
  { id: 'profile', name: '画像智能体', en: 'Profile Agent', role: 'PROFILE', color: T.purple, glyph: '◉',
    angle: -90, orbitRx: 260, orbitRy: 190, orbitTilt: -6, planetSize: 34,
    activity: { verb: '识别中', text: '检测到指针与图结构 2 个薄弱域', detail: '二级指针传参 41% · BFS visited 38%', ts: '8 秒前' },
    stats: [{ label: '画像维度', value: '24' }, { label: '掌握度', value: '68%' }] },
  { id: 'path', name: '路径规划智能体', en: 'Path Planner', role: 'PATH', color: T.cyan, glyph: '◈',
    angle: -30, orbitRx: 340, orbitRy: 240, orbitTilt: 10, planetSize: 30,
    activity: { verb: '重排中', text: '课后巩固阶段插入 2 个补弱节点', detail: '指针训练 → 图结构思维导图 → BFS 专项', ts: '4 秒前' },
    stats: [{ label: '路径阶段', value: '6' }, { label: '当前场景', value: '课后巩固' }] },
  { id: 'resource', name: '资源推荐智能体', en: 'Resource Engine', role: 'RESOURCE', color: T.emerald, glyph: '◬',
    angle: 30, orbitRx: 290, orbitRy: 220, orbitTilt: -14, planetSize: 28,
    activity: { verb: '匹配中', text: '为图结构薄弱点匹配 5 个资源', detail: '思维导图 1 · 专项练习 3 · 图解卡片 1', ts: '6 秒前' },
    stats: [{ label: '资源池', value: '1.2k+' }, { label: '已完成', value: '47' }] },
  { id: 'tutor', name: 'AI 辅导智能体', en: 'AI Tutor', role: 'TUTOR', color: T.amber, glyph: '◊',
    angle: 90, orbitRx: 330, orbitRy: 235, orbitTilt: 5, planetSize: 32,
    activity: { verb: '待命', text: '随时等你的下一个问题', detail: '支持概念讲解 · 代码辅导 · 错题诊断', ts: '刚刚' },
    stats: [{ label: '辅导模式', value: '10' }, { label: '准确率', value: '94%' }] },
  { id: 'eval', name: '评估智能体', en: 'Evaluator', role: 'EVAL', color: T.rose, glyph: '◆',
    angle: 150, orbitRx: 270, orbitRy: 200, orbitTilt: 12, planetSize: 30,
    activity: { verb: '已完成', text: '阶段测评 82% · 发现 4 个盲点', detail: '二级指针 · BFS visited · 释放后悬空 · 队列空判', ts: '3 分钟前' },
    stats: [{ label: '平均正确率', value: '82%' }, { label: '知识掌握度', value: '68%' }] },
  { id: 'feedback', name: '反馈智能体', en: 'Feedback Agent', role: 'FEEDBACK', color: T.blue, glyph: '◇',
    angle: -150, orbitRx: 310, orbitRy: 225, orbitTilt: -10, planetSize: 28,
    activity: { verb: '反向更新', text: '将测评结果反向写入画像', detail: '图结构 68%→42% · 指针 65%→42% · 新增偏好: 思维导图', ts: '1 分钟前' },
    stats: [{ label: '本周更新', value: '5 次' }, { label: '触发路径修正', value: '3 次' }] },
]

const loopOrder = ['profile', 'path', 'resource', 'tutor', 'eval', 'feedback']

/* ── Geometry ── */
const VIZ_W = 880
const VIZ_H = 880
const CX = VIZ_W / 2
const CY = VIZ_H / 2
const SPHERE_R = 132

function polar(cx: number, cy: number, rx: number, ry: number, deg: number) {
  const rad = deg * Math.PI / 180
  return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) }
}

function hexAlpha(hex: string, a: number) {
  const clamped = Math.max(0, Math.min(1, a))
  return hex + Math.round(clamped * 255).toString(16).padStart(2, '0')
}

/* ── Starfield ── */
interface Star { x: number; y: number; r: number; o: number; tw: boolean; d: number }
const stars: Star[] = (() => {
  const out: Star[] = []
  let s = 73
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 110; i++) {
    out.push({
      x: rand() * VIZ_W, y: rand() * VIZ_H,
      r: 0.3 + rand() * 1.4, o: 0.15 + rand() * 0.55,
      tw: rand() < 0.35, d: rand() * 4,
    })
  }
  return out
})()

/* ── Positions (reactive) ── */
interface Pos { x: number; y: number }
const positions = computed<Pos[]>(() =>
  agents.map(a => {
    const p = polar(CX, CY, a.orbitRx, a.orbitRy, a.angle)
    const rad = a.orbitTilt * Math.PI / 180
    const dx = p.x - CX
    const dy = p.y - CY
    return {
      x: CX + dx * Math.cos(rad) - dy * Math.sin(rad),
      y: CY + dx * Math.sin(rad) + dy * Math.cos(rad),
    }
  })
)

const loopPositions = computed<Pos[]>(() =>
  loopOrder.map(id => positions.value[agents.findIndex(a => a.id === id)])
)

/* ── Spotlight ── */
const hoverIdx = ref<number | null>(null)
const spotIdx = ref(0)
let spotTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  spotTimer = setInterval(() => { spotIdx.value = (spotIdx.value + 1) % agents.length }, 3200)
})
onUnmounted(() => { if (spotTimer) clearInterval(spotTimer) })

const activeIdx = computed(() => hoverIdx.value ?? spotIdx.value)
const hotAgentId = computed(() => agents[activeIdx.value]?.id)
const hotLoopIdx = computed(() => loopOrder.indexOf(hotAgentId.value))

/* ── Chip side helper ── */
function chipSide(x: number, y: number): 'left' | 'right' | 'top' | 'bottom' {
  const dx = x - CX
  const dy = y - CY
  if (Math.abs(dx) > Math.abs(dy) * 0.8) return dx > 0 ? 'right' : 'left'
  return dy > 0 ? 'bottom' : 'top'
}

/* ── Wireframe latitude/longitude data ── */
const latitudes = [0.95, 0.78, 0.55, 0.25, 0, -0.3, -0.6, -0.82, -0.95]
const longitudes = [0, 30, 60, 90, 120, 150]

/* ── Stats ── */
const heroStats = [
  { l: '活跃智能体', v: '6', sub: '协同中', c: T.cyan },
  { l: '学习时长', v: '128', sub: 'h', c: T.purple },
  { l: '正确率', v: '82', sub: '%', c: T.emerald },
  { l: '知识掌握度', v: '68', sub: '%', c: T.amber },
]

/* ── Chip positioning style ── */
function chipStyle(x: number, y: number, isHot: boolean, side: string): string {
  const offset = isHot ? 56 : 48
  let dx = 0, dy = 0
  if (side === 'right') dx = offset
  else if (side === 'left') dx = -offset
  else if (side === 'top') dy = -offset
  else dy = offset

  const px = x + dx
  const py = y + dy
  const transform = side === 'left' ? 'translate(-100%, -50%)' : 'translate(0, -50%)'

  return `left:${px}px;top:${py}px;transform:${transform};z-index:${isHot ? 20 : 10};min-width:${isHot ? '240px' : 'auto'}`
}
</script>

<template>
  <section class="hero-constellation">
    <!-- Background grid -->
    <div class="hero-grid" aria-hidden="true" />

    <!-- Layout -->
    <div class="hero-layout">
      <!-- LEFT: copy -->
      <div class="hero-copy">
        <div class="hero-badge-hp">
          <span class="badge-pulse" />
          多智能体学习闭环 · LIVE
        </div>

        <h1 class="hero-title-hp">
          <span>你的学习宇宙</span>
          <span>
            正由
            <em class="gradient-text">6 位 AI 智能体</em>
            协同照亮
          </span>
        </h1>

        <p class="hero-desc">
          画像驱动路径规划，资源匹配评估反馈 —
          画像、路径、资源、辅导、评估、反馈 6 个智能体实时协同，
          覆盖课前预习到成果沉淀的完整学习闭环，
          <span style="color: #00d4ff;">每一次互动都反向更新画像</span>，让系统更懂你。
        </p>

        <div class="hero-ctas">
          <button class="btn-hp-primary" @click="router.push('/profile')">
            开始今日学习 <span class="btn-arrow">→</span>
          </button>
          <button class="btn-hp-ghost" @click="router.push('/learning-path')">
            查看协同实况 <span class="btn-arrow-sm">↗</span>
          </button>
        </div>

        <div class="hero-stats-row">
          <div v-for="s in heroStats" :key="s.l" class="stat-item">
            <div class="stat-label">{{ s.l }}</div>
            <div class="stat-value">
              <span class="stat-num" :style="{ color: s.c }">{{ s.v }}</span>
              <span class="stat-sub">{{ s.sub }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: constellation viz -->
      <div class="hero-viz-wrapper">
        <svg :viewBox="`0 0 ${VIZ_W} ${VIZ_H}`" class="hero-svg">
          <defs>
            <radialGradient id="hp-sphere-outer" cx="50%" cy="50%" r="50%">
              <stop offset="0%" :stop-color="T.cyan" stop-opacity="0.4" />
              <stop offset="45%" :stop-color="T.purple" stop-opacity="0.18" />
              <stop offset="100%" :stop-color="T.purple" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="hp-sphere-body" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#3a8fff" stop-opacity="0.4" />
              <stop offset="40%" stop-color="#1e3a8a" stop-opacity="0.65" />
              <stop offset="100%" stop-color="#0a1230" stop-opacity="0.95" />
            </radialGradient>
            <radialGradient id="hp-sphere-hi" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.3" />
              <stop offset="60%" stop-color="#fff" stop-opacity="0.05" />
              <stop offset="100%" stop-color="#fff" stop-opacity="0" />
            </radialGradient>
            <radialGradient v-for="a in agents" :key="`pg-${a.id}`"
              :id="`hp-planet-${a.id}`" cx="35%" cy="35%" r="65%">
              <stop offset="0%" :stop-color="a.color" stop-opacity="1" />
              <stop offset="60%" :stop-color="a.color" stop-opacity="0.65" />
              <stop offset="100%" stop-color="#000010" stop-opacity="0.9" />
            </radialGradient>
            <filter id="hp-planet-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          <!-- Starfield -->
          <circle v-for="(s, i) in stars" :key="`s-${i}`"
            :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
            :class="{ 'star-twinkle': s.tw }"
            :style="s.tw ? `animation-duration: ${3 + (i % 4)}s; animation-delay: ${s.d}s` : undefined" />

          <!-- Shooting stars -->
          <line x1="50" y1="120" x2="140" y2="170" stroke="#fff" stroke-opacity="0.4"
            stroke-width="1" stroke-linecap="round" stroke-dasharray="2 60"
            class="shooting-star" />
          <line x1="700" y1="780" x2="820" y2="720" stroke="#fff" stroke-opacity="0.3"
            stroke-width="1" stroke-linecap="round" stroke-dasharray="2 80"
            class="shooting-star-r" />

          <!-- Orbit ellipses -->
          <g v-for="(a, i) in agents" :key="`orbit-${a.id}`"
            :style="`transform-origin: ${CX}px ${CY}px; transform: rotate(${a.orbitTilt}deg); opacity: ${hoverIdx != null && hoverIdx !== i ? 0.18 : 0.42}`"
            class="orbit-ellipse">
            <ellipse :cx="CX" :cy="CY" :rx="a.orbitRx" :ry="a.orbitRy"
              fill="none" :stroke="a.color" stroke-opacity="0.6" stroke-width="0.8"
              stroke-dasharray="1 3" />
          </g>

          <!-- Central sphere -->
          <circle :cx="CX" :cy="CY" :r="SPHERE_R + 50" fill="url(#hp-sphere-outer)" opacity="0.7" />

          <!-- Atmospheric rings -->
          <g class="atmo-ring-1" :style="`transform-origin: ${CX}px ${CY}px`">
            <ellipse :cx="CX" :cy="CY" :rx="SPHERE_R + 18" :ry="SPHERE_R + 4"
              fill="none" :stroke="T.cyan" stroke-opacity="0.35" stroke-width="1.5"
              stroke-dasharray="1 12" />
          </g>
          <g class="atmo-ring-2" :style="`transform-origin: ${CX}px ${CY}px`">
            <ellipse :cx="CX" :cy="CY" :rx="SPHERE_R + 28" :ry="SPHERE_R + 10"
              fill="none" :stroke="T.purple" stroke-opacity="0.25" stroke-width="1"
              stroke-dasharray="2 18" />
          </g>

          <!-- Sphere body -->
          <circle :cx="CX" :cy="CY" :r="SPHERE_R" fill="url(#hp-sphere-body)" />

          <!-- Latitude lines -->
          <ellipse v-for="(y, i) in latitudes" :key="`lat-${i}`"
            :cx="CX" :cy="CY + y * SPHERE_R * 0.5"
            :rx="SPHERE_R * Math.sqrt(1 - y * y)"
            :ry="SPHERE_R * Math.sqrt(1 - y * y) * 0.18"
            fill="none" :stroke="T.cyan" stroke-opacity="0.32" stroke-width="0.7" />

          <!-- Longitude lines -->
          <g v-for="deg in longitudes" :key="`lon-${deg}`"
            :style="`transform-origin: ${CX}px ${CY}px; transform: rotate(${deg}deg)`">
            <ellipse :cx="CX" :cy="CY" :rx="SPHERE_R * 0.22" :ry="SPHERE_R"
              fill="none" :stroke="T.cyan" stroke-opacity="0.18" stroke-width="0.6" />
          </g>

          <!-- Inner highlight -->
          <circle :cx="CX - SPHERE_R * 0.3" :cy="CY - SPHERE_R * 0.3" :r="SPHERE_R * 0.55"
            fill="url(#hp-sphere-hi)" opacity="0.9" />

          <!-- Center bright point -->
          <circle :cx="CX" :cy="CY" r="6" fill="#fff" class="center-pulse" />

          <!-- Pulse rings -->
          <circle :cx="CX" :cy="CY" :r="SPHERE_R"
            fill="none" :stroke="T.cyan" stroke-width="1.5" stroke-opacity="0.5"
            class="pulse-ring-1" :style="`transform-origin: ${CX}px ${CY}px`" />
          <circle :cx="CX" :cy="CY" :r="SPHERE_R"
            fill="none" :stroke="T.purple" stroke-width="1" stroke-opacity="0.4"
            class="pulse-ring-2" :style="`transform-origin: ${CX}px ${CY}px`" />

          <!-- Loop connection lines -->
          <g v-for="(p, i) in loopPositions" :key="`edge-${i}`">
            <line :x1="p.x" :y1="p.y"
              :x2="loopPositions[(i + 1) % loopPositions.length].x"
              :y2="loopPositions[(i + 1) % loopPositions.length].y"
              :stroke="hotLoopIdx === i || hotLoopIdx === (i + 1) % loopPositions.length ? T.cyan : '#5b6584'"
              :stroke-opacity="hotLoopIdx === i || hotLoopIdx === (i + 1) % loopPositions.length ? 0.7 : 0.22"
              :stroke-width="hotLoopIdx === i || hotLoopIdx === (i + 1) % loopPositions.length ? 1.5 : 1"
              class="loop-edge" />
            <line :x1="p.x" :y1="p.y"
              :x2="loopPositions[(i + 1) % loopPositions.length].x"
              :y2="loopPositions[(i + 1) % loopPositions.length].y"
              :stroke="T.cyan" stroke-opacity="0.85" stroke-width="1.5"
              stroke-dasharray="3 18"
              class="loop-flow"
              :style="`animation-duration: ${4 + i * 0.4}s; animation-delay: ${i * 0.3}s`" />
          </g>

          <!-- Direction arrows at midpoints -->
          <g v-for="(p, i) in loopPositions" :key="`arr-${i}`">
            <g :transform="`translate(${(p.x + loopPositions[(i + 1) % loopPositions.length].x) / 2}, ${(p.y + loopPositions[(i + 1) % loopPositions.length].y) / 2}) rotate(${Math.atan2(loopPositions[(i + 1) % loopPositions.length].y - p.y, loopPositions[(i + 1) % loopPositions.length].x - p.x) * 180 / Math.PI})`">
              <path d="M -5 -4 L 4 0 L -5 4 Z" :fill="T.cyan" opacity="0.6"
                class="loop-arrow-head"
                :style="`animation-delay: ${i * 0.4}s`" />
            </g>
          </g>

          <!-- Planets -->
          <g v-for="(a, i) in agents" :key="a.id"
            :transform="`translate(${positions[i].x}, ${positions[i].y})${activeIdx === i ? ' scale(1.1)' : ''}`"
            class="planet-group"
            @mouseenter="hoverIdx = i"
            @mouseleave="hoverIdx = null"
            style="cursor: pointer">
            <!-- Outer glow -->
            <circle cx="0" cy="0" :r="a.planetSize * 2.2" :fill="a.color"
              :opacity="activeIdx === i ? 0.18 : 0.1" filter="url(#hp-planet-glow)" />
            <!-- Hot pulse rings -->
            <circle v-if="activeIdx === i" cx="0" cy="0" :r="a.planetSize + 4"
              fill="none" :stroke="a.color" stroke-width="1.5" class="planet-pulse" />
            <circle v-if="activeIdx === i" cx="0" cy="0" :r="a.planetSize + 4"
              fill="none" :stroke="a.color" stroke-width="1.5" class="planet-pulse-delay" />
            <!-- Planet body -->
            <circle cx="0" cy="0" :r="a.planetSize" :fill="`url(#hp-planet-${a.id})`" />
            <!-- Highlight -->
            <circle :cx="-a.planetSize * 0.3" :cy="-a.planetSize * 0.3" :r="a.planetSize * 0.45"
              fill="#ffffff" opacity="0.5" style="filter: blur(6px)" />
            <!-- Outline -->
            <circle cx="0" cy="0" :r="a.planetSize" fill="none" :stroke="a.color"
              stroke-opacity="0.6" stroke-width="1" />
            <!-- Decorative ring -->
            <ellipse cx="0" cy="0" :rx="a.planetSize * 1.5" :ry="a.planetSize * 0.4"
              fill="none" :stroke="a.color" :stroke-opacity="activeIdx === i ? 0.5 : 0.25"
              stroke-width="1" :transform="`rotate(${a.orbitTilt - 18})`" />
          </g>
        </svg>

        <!-- Center sphere label (HTML overlay) -->
        <div class="sphere-label">
          <div class="sphere-eyebrow">STUDENT PROFILE</div>
          <div class="sphere-title">知识宇宙</div>
          <div class="sphere-sub">学习者 · 画像驱动 · 个性化路径</div>
          <div class="sphere-stats">
            <div v-for="s in [{ l: '画像维度', v: '24' }, { l: '掌握度', v: '38%' }, { l: '连续', v: '5 天' }]" :key="s.l" class="sphere-stat">
              <div class="sphere-stat-val">{{ s.v }}</div>
              <div class="sphere-stat-label">{{ s.l }}</div>
            </div>
          </div>
        </div>

        <!-- Loop label -->
        <div class="loop-label">
          <span class="loop-label-dot">◉</span>
          CLOSED LEARNING LOOP · 闭环
        </div>

        <!-- Activity chips (HTML overlay) -->
        <div v-for="(a, i) in agents" :key="`chip-${a.id}`"
          class="activity-chip"
          :class="{
            'chip-hot': activeIdx === i,
            [`chip-${chipSide(positions[i].x, positions[i].y)}`]: true,
          }"
          :style="chipStyle(positions[i].x, positions[i].y, activeIdx === i, chipSide(positions[i].x, positions[i].y))">
          <div class="chip-connector" :class="{ 'chip-connector-right': chipSide(positions[i].x, positions[i].y) === 'right', 'chip-connector-left': chipSide(positions[i].x, positions[i].y) === 'left' }" :style="`background: linear-gradient(${chipSide(positions[i].x, positions[i].y) === 'right' ? '90deg' : '-90deg'}, ${hexAlpha(a.color, 0.6)}, transparent)`" />
          <div class="chip-card" :class="{ 'chip-card-hot': activeIdx === i }" :style="`border-color: ${hexAlpha(a.color, activeIdx === i ? 0.5 : 0.25)}`">
            <div class="chip-header">
              <span class="chip-dot" :style="`background: ${a.color}; box-shadow: 0 0 6px ${a.color}`" />
              <span class="chip-role" :style="`color: ${a.color}`">{{ a.role }}</span>
              <span class="chip-ts">{{ a.activity.ts }}</span>
            </div>
            <div class="chip-name">{{ a.name }}</div>
            <div class="chip-activity">
              <span class="chip-verb" :style="`color: ${a.color}`">· {{ a.activity.verb }}</span>
              {{ a.activity.text }}
            </div>
            <template v-if="activeIdx === i">
              <div class="chip-detail">{{ a.activity.detail }}</div>
              <div class="chip-stats">
                <div v-for="st in a.stats" :key="st.label" class="chip-stat">
                  <div class="chip-stat-label">{{ st.label }}</div>
                  <div class="chip-stat-val" :style="`color: ${a.color}`">{{ st.value }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-cue">
      <span>SCROLL</span>
      <div class="scroll-line" />
    </div>
  </section>
</template>

<style scoped>
.hero-constellation {
  position: relative;
  min-height: 100vh;
  padding: 32px 56px 60px;
  overflow: hidden;
  background:
    radial-gradient(ellipse 900px 500px at 75% 50%, rgba(0, 212, 255, 0.08), transparent 60%),
    radial-gradient(ellipse 700px 500px at 80% 35%, rgba(124, 58, 237, 0.07), transparent 65%),
    radial-gradient(ellipse 600px 400px at 90% 90%, rgba(245, 158, 11, 0.04), transparent 70%),
    #050610;
  z-index: 1;
}

.hero-grid {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.hero-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(0, 980px);
  gap: 32px;
  align-items: center;
  min-height: calc(100vh - 92px);
  max-width: 1760px;
  margin: 0 auto;
}

/* ── Left copy ── */
.hero-copy {
  padding: 20px 0;
}

.hero-badge-hp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.07);
  border: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 12px;
  color: #8892b0;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  font-family: 'Outfit', sans-serif;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 8px #00d4ff;
  animation: pulse-soft 1.5s ease-in-out infinite;
}

.hero-title-hp {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-weight: 500;
  font-size: clamp(48px, 5vw, 76px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 24px;
  text-wrap: balance;
}

.hero-title-hp span {
  display: block;
}

.gradient-text {
  font-style: italic;
  background: linear-gradient(135deg, #00d4ff, #7c3aed 60%, #f43f5e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

.hero-desc {
  margin: 0 0 36px;
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255,255,255,0.72);
  max-width: 520px;
  font-weight: 300;
  font-family: 'Outfit', sans-serif;
}

.hero-ctas {
  display: flex;
  gap: 14px;
  margin-bottom: 44px;
}

.btn-hp-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4);
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.02em;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-hp-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(124, 58, 237, 0.5);
}

.btn-hp-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.85);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  backdrop-filter: blur(8px);
  transition: border-color 0.2s ease, color 0.2s ease;
}
.btn-hp-ghost:hover {
  border-color: rgba(0, 212, 255, 0.4);
  color: #00d4ff;
}

.btn-arrow { font-size: 14px; }
.btn-arrow-sm { font-size: 12px; }

.hero-stats-row {
  display: flex;
  gap: 28px;
  align-items: center;
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.stat-label {
  font-size: 9px;
  color: #8892b0;
  letter-spacing: 0.18em;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 4px;
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-num {
  font-family: 'Instrument Serif', serif;
  font-size: 28px;
  line-height: 1;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.stat-sub {
  font-size: 10px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
}

/* ── Right viz ── */
.hero-viz-wrapper {
  position: relative;
  width: 880px;
  height: 880px;
  max-width: 100%;
  margin: 0 auto;
}

.hero-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ── Sphere label overlay ── */
.sphere-label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
  z-index: 4;
}

.sphere-eyebrow {
  font-size: 9.5px;
  color: #00d4ff;
  letter-spacing: 0.28em;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 6px;
  text-shadow: 0 0 12px #00d4ff;
}

.sphere-title {
  font-family: 'Instrument Serif', serif;
  font-size: 34px;
  line-height: 1.05;
  color: #fff;
  letter-spacing: -0.01em;
  font-weight: 500;
  text-shadow: 0 0 24px rgba(0, 212, 255, 0.7);
  margin-bottom: 6px;
}

.sphere-sub {
  font-size: 11px;
  color: #8892b0;
  letter-spacing: 0.12em;
  font-weight: 500;
}

.sphere-stats {
  display: flex;
  gap: 18px;
  margin-top: 16px;
  justify-content: center;
}

.sphere-stat {
  text-align: center;
}

.sphere-stat-val {
  font-family: 'Instrument Serif', serif;
  font-size: 18px;
  color: #fff;
  line-height: 1;
}

.sphere-stat-label {
  font-size: 8.5px;
  color: #4a5568;
  letter-spacing: 0.16em;
  font-family: 'JetBrains Mono', monospace;
  margin-top: 3px;
}

/* ── Loop label ── */
.loop-label {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 100px;
  font-size: 10px;
  color: #00d4ff;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  white-space: nowrap;
}

.loop-label-dot {
  animation: pulse-soft 1.5s ease-in-out infinite;
}

/* ── Activity chips ── */
.activity-chip {
  position: absolute;
  pointer-events: none;
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  max-width: 280px;
}

.chip-connector {
  position: absolute;
  top: 50%;
  height: 1px;
}

.chip-connector-right {
  left: -48px;
  width: 48px;
}

.chip-connector-left {
  right: -48px;
  width: 48px;
}

.chip-card {
  background: rgba(14, 18, 40, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid;
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.3);
  transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
}

.chip-card-hot {
  background: rgba(14, 18, 40, 0.92);
  padding: 12px 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
}

.chip-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.chip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: pulse-soft 1.6s ease-in-out infinite;
}

.chip-role {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.15em;
  font-weight: 500;
}

.chip-ts {
  font-size: 10px;
  color: #4a5568;
  margin-left: auto;
  font-family: 'JetBrains Mono', monospace;
}

.chip-name {
  font-size: 12px;
  font-weight: 600;
  color: #e8edf5;
  line-height: 1.4;
}

.chip-activity {
  font-size: 11px;
  color: #e8edf5;
  line-height: 1.5;
  margin-top: 4px;
}

.chip-verb {
  margin-right: 4px;
}

.chip-detail {
  font-size: 10.5px;
  color: #8892b0;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(255,255,255,0.06);
  line-height: 1.4;
}

.chip-stats {
  display: flex;
  gap: 14px;
  margin-top: 8px;
}

.chip-stat-label {
  font-size: 9px;
  color: #4a5568;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.chip-stat-val {
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

/* ── Scroll cue ── */
.scroll-cue {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #8892b0;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.2em;
  opacity: 0.7;
  z-index: 5;
  pointer-events: none;
}

.scroll-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, #00d4ff, transparent);
  animation: pulse-soft 1.6s ease-in-out infinite;
}

/* ── SVG animations ── */
.star-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.shooting-star {
  animation: dash-flow 8s linear infinite;
}

.shooting-star-r {
  animation: dash-flow 12s linear infinite reverse;
}

.orbit-ellipse {
  transition: opacity 0.3s ease;
}

.atmo-ring-1 {
  animation: spin 60s linear infinite;
}

.atmo-ring-2 {
  animation: spin-rev 90s linear infinite;
}

.center-pulse {
  animation: pulse-soft 2.4s ease-in-out infinite;
}

.pulse-ring-1 {
  animation: pulse-ring 4s ease-out infinite;
}

.pulse-ring-2 {
  animation: pulse-ring 4s ease-out 2s infinite;
}

.loop-edge {
  transition: stroke-opacity 0.3s ease, stroke-width 0.3s ease;
}

.loop-flow {
  animation: dash-flow 4s linear infinite;
}

.loop-arrow-head {
  animation: pulse-soft 2s ease-in-out infinite;
}

.planet-group {
  transition: transform 0.3s ease;
}

.planet-pulse {
  animation: pulse-ring 2s ease-out infinite;
}

.planet-pulse-delay {
  animation: pulse-ring 2s ease-out 1s infinite;
}

/* ── Keyframes ── */
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes dash-flow {
  to { stroke-dashoffset: -30; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes spin-rev {
  to { transform: rotate(-360deg); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .badge-pulse,
  .star-twinkle,
  .shooting-star,
  .shooting-star-r,
  .center-pulse,
  .pulse-ring-1,
  .pulse-ring-2,
  .loop-flow,
  .loop-arrow-head,
  .planet-pulse,
  .planet-pulse-delay,
  .atmo-ring-1,
  .atmo-ring-2,
  .scroll-line,
  .chip-dot,
  .loop-label-dot {
    animation: none !important;
  }

  .orbit-ellipse,
  .planet-group,
  .loop-edge {
    transition: none !important;
  }

  .gradient-text {
    animation: none !important;
    background-position: 0% 50%;
  }
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-viz-wrapper {
    width: 100%;
    max-width: 600px;
    height: auto;
    aspect-ratio: 1;
  }
  .hero-constellation {
    padding: 60px 24px 40px;
    min-height: auto;
  }
}

@media (max-width: 600px) {
  .hero-stats-row {
    flex-wrap: wrap;
    gap: 16px;
  }
  .hero-ctas {
    flex-direction: column;
  }
  .hero-title-hp {
    font-size: 36px;
  }
}
</style>
