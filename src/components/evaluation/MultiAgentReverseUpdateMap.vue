<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type NodeId = 'eval' | 'reflect' | 'profile' | 'path' | 'resource' | 'tutor'
type ToneName = 'cyan' | 'teal' | 'blue' | 'purple' | 'violet' | 'emerald' | 'amber' | 'magenta' | 'rose' | 'orange'
type LinkKind = 'engine' | 'writeback' | 'drive'

interface LoopNode {
  id: NodeId
  cn: string
  en: string
  icon: NodeId
  color: ToneName
  x: number
  y: number
  r: number
  phase: number
  role: string
  emit: string
  engine?: boolean
  hub?: boolean
  img?: string
}

interface LoopLink {
  from: NodeId
  to: NodeId
  kind: LinkKind
  label: string
  phase: number
  bow: number
  hero?: boolean
}

const stage = { w: 1600, h: 980 }

const palette = {
  bg: '#05070f',
  ink: '#070b18',
  cyan: '#22d3ee',
  teal: '#2dd4bf',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  violet: '#a78bfa',
  emerald: '#34d399',
  amber: '#fbbf24',
  gold: '#fcd34d',
  magenta: '#ec4899',
  rose: '#fb5a8c',
  orange: '#fb923c',
  text: '#eaf4ff',
  textSub: '#9bb4d4',
  textTri: '#5a6f92',
}

const nodes: Record<NodeId, LoopNode> = {
  eval: {
    id: 'eval',
    cn: '评估智能体',
    en: 'EVALUATION AGENT',
    icon: 'eval',
    color: 'magenta',
    x: 360,
    y: 320,
    r: 86,
    phase: 1,
    img: '/reverse-evaluation/agent-evaluation.png',
    role: '判断掌握度 / 错因 / 薄弱点',
    emit: '生成结构化评估证据',
  },
  reflect: {
    id: 'reflect',
    cn: '反思智能体',
    en: 'REFLECTION ENGINE',
    icon: 'reflect',
    color: 'orange',
    x: 690,
    y: 320,
    r: 104,
    phase: 2,
    engine: true,
    img: '/reverse-evaluation/agent-reflection.png',
    role: '反思评估结果 / 触发反向回写',
    emit: '决定回写哪些画像维度',
  },
  profile: {
    id: 'profile',
    cn: '画像智能体',
    en: 'PROFILE AGENT',
    icon: 'profile',
    color: 'purple',
    x: 1080,
    y: 374,
    r: 132,
    phase: 3,
    hub: true,
    img: '/reverse-evaluation/agent-profile.png',
    role: '学生模型 / 唯一真相源',
    emit: '画像 6 维度被更新',
  },
  path: {
    id: 'path',
    cn: '路径智能体',
    en: 'PATH AGENT',
    icon: 'path',
    color: 'cyan',
    x: 760,
    y: 690,
    r: 84,
    phase: 4,
    img: '/reverse-evaluation/agent-path.png',
    role: '重排学习路径',
    emit: '插入 1 个补救节点',
  },
  resource: {
    id: 'resource',
    cn: '资源智能体',
    en: 'RESOURCE AGENT',
    icon: 'resource',
    color: 'emerald',
    x: 1080,
    y: 722,
    r: 84,
    phase: 4,
    img: '/reverse-evaluation/agent-resource.png',
    role: '替换 / 推荐资源',
    emit: '重配 3 个资源',
  },
  tutor: {
    id: 'tutor',
    cn: '辅导智能体',
    en: 'TUTOR AGENT',
    icon: 'tutor',
    color: 'amber',
    x: 1400,
    y: 690,
    r: 84,
    phase: 4,
    img: '/reverse-evaluation/agent-tutor.png',
    role: '调整讲解与练习策略',
    emit: '调整 2 处策略',
  },
}

const nodeOrder: NodeId[] = ['eval', 'reflect', 'profile', 'path', 'resource', 'tutor']

const evidenceSources = [
  { label: '学习行为', color: 'teal' as ToneName },
  { label: '测评作答', color: 'magenta' as ToneName },
  { label: '资源完成度', color: 'emerald' as ToneName },
  { label: '对话记录', color: 'cyan' as ToneName },
]

const links: LoopLink[] = [
  { from: 'eval', to: 'reflect', kind: 'engine', label: '评估结论', phase: 2, bow: 0 },
  { from: 'reflect', to: 'profile', kind: 'writeback', label: '反向回写 / 更新画像', phase: 3, bow: -26, hero: true },
  { from: 'profile', to: 'path', kind: 'drive', label: '驱动重排', phase: 4, bow: 30 },
  { from: 'profile', to: 'resource', kind: 'drive', label: '驱动重配', phase: 4, bow: 0 },
  { from: 'profile', to: 'tutor', kind: 'drive', label: '驱动调整', phase: 4, bow: -30 },
]

const dimensions = [
  { name: '知识广度', before: 42, after: 58, color: 'cyan' as ToneName },
  { name: '知识深度', before: 52, after: 76, color: 'blue' as ToneName },
  { name: '应用能力', before: 35, after: 61, color: 'emerald' as ToneName },
  { name: '创新力', before: 52, after: 74, color: 'violet' as ToneName },
  { name: '工程实践', before: 57, after: 82, color: 'amber' as ToneName },
  { name: '知识迁移', before: 33, after: 48, color: 'rose' as ToneName, weak: true },
]

const phases = [
  { id: 0, k: 'IDLE', cn: '待机', desc: '四类学习证据持续汇入评估智能体。' },
  { id: 1, k: 'EVALUATE', cn: '评估', desc: '评估智能体判断掌握度、错因与薄弱点，产出结构化证据。' },
  { id: 2, k: 'REFLECT', cn: '反思', desc: '反思智能体研判评估结果，决定回写哪些画像维度。' },
  { id: 3, k: 'WRITE-BACK', cn: '反向回写', desc: '画像被反向更新，6 个维度发生跳变。' },
  { id: 4, k: 'FAN-OUT', cn: '扇出重排', desc: '画像驱动路径重排、资源重配与辅导策略调整，闭环完成。' },
]

const stars = Array.from({ length: 130 }, (_, index) => {
  const seed = (index + 9) * 9301 + 49297
  const x = (seed % 1600)
  const y = ((seed * 17) % 980)
  const r = 0.4 + ((seed * 31) % 15) / 10
  const o = 0.08 + ((seed * 13) % 36) / 100
  const d = ((seed * 7) % 50) / 10
  return { x, y, r, o, d }
})

const wrapRef = ref<HTMLElement | null>(null)
const stageScale = ref(1)
let resizeObserver: ResizeObserver | null = null

const phase = ref(0)
const playing = ref(true)
const timers: number[] = []

const currentPhase = computed(() => phases[phase.value] ?? phases[0])
const profileDelta = computed(() => dimensions.reduce((sum, dim) => sum + dim.after - dim.before, 0))

function color(name: ToneName) {
  return palette[name]
}

function hexAlpha(hex: string, alpha: number) {
  const next = Math.round(Math.max(0, Math.min(1, alpha)) * 255).toString(16).padStart(2, '0')
  return `${hex}${next}`
}

function clearTimers() {
  while (timers.length) {
    window.clearTimeout(timers.pop())
  }
}

function startPlayback() {
  clearTimers()
  if (!playing.value) return
  ;[
    [1, 700],
    [2, 2100],
    [3, 3600],
    [4, 5200],
  ].forEach(([nextPhase, delay]) => {
    timers.push(window.setTimeout(() => {
      phase.value = nextPhase
    }, delay))
  })
}

function replay() {
  phase.value = 0
  playing.value = false
  window.setTimeout(() => {
    playing.value = true
    startPlayback()
  }, 80)
}

function jump(nextPhase: number) {
  playing.value = false
  clearTimers()
  phase.value = nextPhase
}

function posX(x: number) {
  return `${x}px`
}

function posY(y: number) {
  return `${y}px`
}

function nodeStyle(node: LoopNode) {
  const tone = color(node.color)
  const size = node.r * 2
  return {
    left: posX(node.x),
    top: posY(node.y),
    width: `${size}px`,
    height: `${size}px`,
    '--tone': tone,
    '--tone-soft': hexAlpha(tone, 0.22),
  }
}

function tagStyle(node: LoopNode) {
  const below = node.id === 'path' || node.id === 'resource' || node.id === 'tutor'
  return {
    left: posX(node.x),
    top: posY(below ? node.y + node.r + 14 : node.y - node.r - 58),
    '--tone': color(node.color),
  }
}

function linkPath(link: LoopLink) {
  const from = nodes[link.from]
  const to = nodes[link.to]
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const x1 = from.x + ux * from.r
  const y1 = from.y + uy * from.r
  const x2 = to.x - ux * to.r
  const y2 = to.y - uy * to.r
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const cx = mx - uy * link.bow
  const cy = my + ux * link.bow
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

function linkLabelStyle(link: LoopLink) {
  const from = nodes[link.from]
  const to = nodes[link.to]
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const x1 = from.x + ux * from.r
  const y1 = from.y + uy * from.r
  const x2 = to.x - ux * to.r
  const y2 = to.y - uy * to.r
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const cx = mx - uy * link.bow
  const cy = my + ux * link.bow
  return {
    left: posX(0.25 * x1 + 0.5 * cx + 0.25 * x2),
    top: posY(0.25 * y1 + 0.5 * cy + 0.25 * y2),
  }
}

function evidencePath(index: number) {
  const ev = nodes.eval
  const baseX = 120
  const y = 200 + index * 64
  return `M ${baseX + 96} ${y} C ${baseX + 200} ${y}, ${ev.x - 160} ${ev.y}, ${ev.x - ev.r} ${ev.y}`
}

function evidenceStyle(index: number, tone: ToneName) {
  return {
    left: posX(120),
    top: posY(200 + index * 64),
    '--tone': color(tone),
  }
}

function linkTone(link: LoopLink) {
  if (link.kind === 'writeback') return palette.magenta
  if (link.kind === 'engine') return palette.orange
  return palette.cyan
}

onMounted(() => {
  const updateScale = () => {
    const width = wrapRef.value?.clientWidth || stage.w
    stageScale.value = Math.min(1, width / stage.w)
  }
  updateScale()
  resizeObserver = new ResizeObserver(updateScale)
  if (wrapRef.value) {
    resizeObserver.observe(wrapRef.value)
  }
  startPlayback()
})

onBeforeUnmount(() => {
  clearTimers()
  resizeObserver?.disconnect()
})
</script>

<template>
  <section ref="wrapRef" class="reverse-loop" aria-label="反向评估画像回写闭环">
    <div
      class="scaled-stage"
      :style="{ width: `${stage.w * stageScale}px`, height: `${stage.h * stageScale}px` }"
    >
      <div class="fixed-stage" :style="{ transform: `scale(${stageScale})` }">
      <div class="stage-header">
        <h2>反向评估 · 画像回写闭环</h2>
        <p>评估 → 反思 → 反向回写 → 扇出优化</p>
      </div>

      <button class="replay-btn" type="button" @click="replay">重播闭环</button>

      <nav class="step-rail" aria-label="演示阶段">
        <template v-for="(item, index) in phases" :key="item.id">
          <button
            type="button"
            :class="{ active: phase === item.id, done: phase > item.id }"
            @click="jump(item.id)"
          >
            <i />
            <span>{{ item.cn }}</span>
          </button>
          <b v-if="index < phases.length - 1" :class="{ done: phase > item.id }" />
        </template>
      </nav>

      <svg class="stage-svg" :viewBox="`0 0 ${stage.w} ${stage.h}`" aria-hidden="true">
        <defs>
          <radialGradient id="loop-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" :stop-color="hexAlpha(palette.purple, 0.16)" />
            <stop offset="55%" :stop-color="hexAlpha(palette.purple, 0.05)" />
            <stop offset="100%" :stop-color="hexAlpha(palette.purple, 0)" />
          </radialGradient>
          <marker id="arr-engine" markerWidth="12" markerHeight="12" refX="7" refY="6" orient="auto">
            <path d="M0 1 L11 6 L0 11 Z" :fill="palette.orange" />
          </marker>
          <marker id="arr-writeback" markerWidth="12" markerHeight="12" refX="7" refY="6" orient="auto">
            <path d="M0 1 L11 6 L0 11 Z" :fill="palette.magenta" />
          </marker>
          <marker id="arr-drive" markerWidth="12" markerHeight="12" refX="7" refY="6" orient="auto">
            <path d="M0 1 L11 6 L0 11 Z" :fill="palette.cyan" />
          </marker>
        </defs>

        <rect width="1600" height="980" :fill="palette.bg" />
        <ellipse cx="1080" cy="374" rx="520" ry="430" fill="url(#loop-aura)" />
        <circle
          v-for="(star, index) in stars"
          :key="index"
          :cx="star.x"
          :cy="star.y"
          :r="star.r"
          fill="#cfe6ff"
          :opacity="star.o"
          class="star"
          :style="{ '--delay': `${star.d}s` }"
        />
        <ellipse
          cx="880"
          cy="540"
          rx="640"
          ry="350"
          fill="none"
          :stroke="hexAlpha(palette.blue, 0.08)"
          stroke-width="1.4"
          stroke-dasharray="2 12"
        />
        <text x="250" y="190" :fill="hexAlpha(palette.textTri, 0.8)" font-size="12" letter-spacing="3">
          正向学习流（画像→路径→资源→辅导→评估）
        </text>

        <g v-for="(source, index) in evidenceSources" :key="source.label">
          <path
            :d="evidencePath(index)"
            fill="none"
            :stroke="hexAlpha(color(source.color), 0.3)"
            stroke-width="1.6"
            stroke-dasharray="6 5"
          />
          <path
            v-if="phase >= 1"
            :d="evidencePath(index)"
            fill="none"
            :stroke="color(source.color)"
            stroke-width="1.6"
            stroke-dasharray="2 14"
            class="flow-line"
          />
        </g>

        <g
          v-for="link in links"
          :key="`${link.from}-${link.to}`"
          :class="{ on: phase >= link.phase }"
          class="beam"
        >
          <path
            :d="linkPath(link)"
            fill="none"
            :stroke="hexAlpha(linkTone(link), 0.16)"
            :stroke-width="link.kind === 'writeback' ? 12 : 8"
            stroke-linecap="round"
          />
          <path
            :d="linkPath(link)"
            fill="none"
            :stroke="hexAlpha(linkTone(link), phase >= link.phase ? 0.78 : 0.36)"
            :stroke-width="link.kind === 'writeback' ? 3.6 : 2.4"
            :stroke-dasharray="link.kind === 'writeback' ? '0' : '8 6'"
            stroke-linecap="round"
            :marker-end="`url(#arr-${link.kind})`"
          />
          <path
            v-if="phase >= link.phase"
            :d="linkPath(link)"
            fill="none"
            stroke="#fff"
            :stroke-width="link.kind === 'writeback' ? 2.4 : 1.6"
            stroke-dasharray="2 16"
            stroke-linecap="round"
            class="flow-line"
          />
        </g>
      </svg>

      <div
        v-for="(source, index) in evidenceSources"
        :key="`${source.label}-pill`"
        class="evidence-pill"
        :style="evidenceStyle(index, source.color)"
      >
        <i />{{ source.label }}
      </div>
      <span class="evidence-title">学习证据汇入</span>

      <div
        v-for="(id, index) in nodeOrder"
        :key="id"
        :class="['agent-core', id, { active: phase >= nodes[id].phase, hub: nodes[id].hub, engine: nodes[id].engine }]"
        :style="{ ...nodeStyle(nodes[id]), '--delay': `${index * 0.24}s` }"
      >
        <div class="core-halo" />
        <svg class="identity-rings" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="94" />
          <circle v-if="nodes[id].hub" cx="100" cy="100" r="99" />
          <circle v-if="nodes[id].engine && phase >= nodes[id].phase" cx="100" cy="100" r="88" />
          <circle v-if="phase >= nodes[id].phase" class="pulse-ring" cx="100" cy="100" r="86" />
        </svg>

        <img
          v-if="nodes[id].img"
          class="core-image"
          :src="nodes[id].img"
          :alt="nodes[id].cn"
          draggable="false"
        >
        <template v-else>
          <svg class="core-orb" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <radialGradient :id="`core-${nodes[id].id}`" cx="42%" cy="38%" r="62%">
                <stop offset="0%" :stop-color="hexAlpha(color(nodes[id].color), phase >= nodes[id].phase ? 0.5 : 0.28)" />
                <stop offset="60%" :stop-color="hexAlpha(color(nodes[id].color), 0.12)" />
                <stop offset="100%" :stop-color="hexAlpha(palette.ink, 0.85)" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="74" :fill="`url(#core-${nodes[id].id})`" />
          </svg>
          <svg class="core-icon" viewBox="0 0 100 100" aria-hidden="true">
            <g v-if="nodes[id].icon === 'eval'">
              <circle cx="44" cy="44" r="22" />
              <line x1="60" y1="60" x2="76" y2="76" />
              <path d="M35 44 L42 51 L55 36" />
            </g>
            <g v-else-if="nodes[id].icon === 'profile'">
              <circle cx="50" cy="50" r="11" class="filled" />
              <ellipse cx="50" cy="50" rx="34" ry="15" transform="rotate(-25 50 50)" />
              <ellipse cx="50" cy="50" rx="34" ry="15" transform="rotate(35 50 50)" />
              <circle cx="80" cy="38" r="4" class="filled" />
              <circle cx="22" cy="60" r="4" class="filled" />
              <circle cx="58" cy="20" r="3.4" class="filled" />
            </g>
            <g v-else-if="nodes[id].icon === 'path'">
              <circle cx="26" cy="50" r="6" class="filled" />
              <path d="M32 50 H50" />
              <path d="M50 50 C62 50 60 28 74 28" />
              <path d="M50 50 C62 50 60 72 74 72" />
              <circle cx="78" cy="28" r="6" class="filled" />
              <circle cx="78" cy="72" r="6" class="filled" />
            </g>
            <g v-else-if="nodes[id].icon === 'resource'">
              <rect x="26" y="40" width="40" height="30" rx="4" />
              <rect x="34" y="32" width="40" height="30" rx="4" opacity="0.75" />
              <line x1="40" y1="52" x2="60" y2="52" />
            </g>
            <g v-else>
              <path d="M24 32 H76 A6 6 0 0 1 82 38 V60 A6 6 0 0 1 76 66 H44 L32 76 V66 H24 A6 6 0 0 1 18 60 V38 A6 6 0 0 1 24 32 Z" />
              <line x1="34" y1="49" x2="34" y2="55" />
              <line x1="44" y1="44" x2="44" y2="60" />
              <line x1="54" y1="46" x2="54" y2="58" />
              <line x1="64" y1="49" x2="64" y2="55" />
            </g>
          </svg>
        </template>
      </div>

      <div
        v-for="id in nodeOrder"
        :key="`${id}-tag`"
        :class="['agent-tag', id, { active: phase >= nodes[id].phase }]"
        :style="tagStyle(nodes[id])"
      >
        <strong>
          <em v-if="nodes[id].engine">引擎</em>
          <em v-if="nodes[id].hub">核心</em>
          {{ nodes[id].cn }}
        </strong>
        <span>{{ nodes[id].role }}</span>
        <small v-if="phase >= nodes[id].phase">→ {{ nodes[id].emit }}</small>
      </div>

      <div
        v-for="link in links"
        :key="`${link.from}-${link.to}-label`"
        :class="['link-chip', link.kind, { hero: link.hero, on: phase >= link.phase }]"
        :style="linkLabelStyle(link)"
      >
        <strong>{{ link.label }}</strong>
        <small v-if="link.hero">画像反向更新</small>
      </div>

      <aside class="profile-panel" :class="{ active: phase >= 3 }">
        <div class="panel-head">
          <span>画像变化 · 六维跳变</span>
          <strong>{{ phase >= 3 ? `+${profileDelta}` : '-' }}</strong>
        </div>
        <div
          v-for="dim in dimensions"
          :key="dim.name"
          class="dim-row"
          :style="{ '--tone': color(dim.color), '--before': `${dim.before}%`, '--after': `${phase >= 3 ? dim.after : dim.before}%` }"
        >
          <span>{{ dim.name }}<i v-if="dim.weak">弱</i></span>
          <b><em /></b>
          <strong>{{ phase >= 3 ? dim.after : dim.before }}</strong>
        </div>
      </aside>

      <aside class="loop-narration">
        <span>第 {{ phase + 1 }} 步 / 共 5 步</span>
        <strong>{{ currentPhase.cn }}</strong>
        <p>{{ currentPhase.desc }}</p>
      </aside>

      <div class="loop-legend">
        <span><i class="evidence" />证据汇入</span>
        <span><i class="engine" />反思链路</span>
        <span><i class="writeback" />反向回写画像</span>
        <span><i class="drive" />画像驱动下游</span>
      </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reverse-loop {
  width: 100%;
  min-height: 720px;
  padding: 18px;
  overflow: hidden;
  border: 1px solid rgba(90, 160, 220, 0.18);
  border-radius: 18px;
  background: #05070f;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 24px 70px rgba(0, 0, 0, 0.38);
}

.scaled-stage {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 14px;
  background: #05070f;
}

.fixed-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 1600px;
  height: 980px;
  overflow: hidden;
  transform-origin: top left;
  font-family: "Outfit", "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #eaf4ff;
}

.stage-svg,
.stage-header,
.step-rail,
.replay-btn,
.evidence-pill,
.evidence-title,
.agent-core,
.agent-tag,
.link-chip,
.profile-panel,
.loop-narration,
.loop-legend {
  position: absolute;
}

.stage-svg {
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.star {
  animation: twinkle 4s ease-in-out var(--delay) infinite;
}

.flow-line {
  animation: flow 1.35s linear infinite;
  opacity: 0.95;
}

.beam {
  opacity: 0.18;
  transition: opacity 0.55s ease;
}

.beam.on {
  opacity: 1;
}

.stage-header {
  top: 2.7%;
  left: 50%;
  z-index: 9;
  width: min(720px, 58%);
  transform: translateX(-50%);
  text-align: center;
}

.stage-header h2 {
  margin: 0;
  font-family: "Noto Serif SC", serif;
  font-size: clamp(22px, 2.4vw, 38px);
  font-weight: 600;
  letter-spacing: 0;
  color: #fff;
  text-shadow: 0 0 24px rgba(236, 72, 153, 0.45);
}

.stage-header p {
  margin: 7px 0 0;
  font-size: clamp(10px, 0.8vw, 13px);
  letter-spacing: 0.18em;
  color: #9bb4d4;
  text-transform: uppercase;
}

.replay-btn {
  top: 3.1%;
  right: 2.5%;
  z-index: 9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(236, 72, 153, 0.42);
  border-radius: 999px;
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.step-rail {
  top: 11.8%;
  left: 50%;
  z-index: 9;
  display: flex;
  align-items: center;
  padding: 9px 18px;
  border: 1px solid rgba(90, 160, 220, 0.18);
  border-radius: 999px;
  background: rgba(6, 10, 22, 0.86);
  backdrop-filter: blur(8px);
  transform: translateX(-50%);
}

.step-rail button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 58px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #5a6f92;
  font-size: 11px;
  cursor: pointer;
}

.step-rail i {
  width: 13px;
  height: 13px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.step-rail button.active {
  color: #fff;
}

.step-rail button.active i {
  border-color: #fb923c;
  background: #fb923c;
  box-shadow: 0 0 12px rgba(251, 146, 60, 0.8);
}

.step-rail button.done i {
  border-color: rgba(34, 211, 238, 0.7);
  background: rgba(34, 211, 238, 0.45);
}

.step-rail b {
  width: 34px;
  height: 2px;
  margin: 0 2px 16px;
  background: rgba(255, 255, 255, 0.1);
}

.step-rail b.done {
  background: rgba(34, 211, 238, 0.5);
}

.evidence-title {
  top: 15.1%;
  left: 7.5%;
  z-index: 4;
  color: #5a6f92;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  transform: translateX(-50%);
}

.evidence-pill {
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 13px;
  border: 1px solid color-mix(in srgb, var(--tone), transparent 58%);
  border-radius: 999px;
  background: rgba(7, 12, 26, 0.86);
  color: #eaf4ff;
  font-size: 13px;
  white-space: nowrap;
  transform: translate(-50%, -50%);
}

.evidence-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--tone);
  box-shadow: 0 0 7px var(--tone);
}

.agent-core {
  z-index: 5;
  transform: translate(-50%, -50%);
}

.agent-core.hub {
  z-index: 7;
}

.agent-core.engine {
  z-index: 6;
}

.core-halo {
  position: absolute;
  inset: -42%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tone-soft), rgba(255, 255, 255, 0.02) 38%, transparent 66%);
  filter: blur(16px);
}

.identity-rings,
.core-orb,
.core-icon,
.core-image {
  position: absolute;
}

.identity-rings,
.core-orb {
  inset: 0;
  width: 100%;
  height: 100%;
}

.identity-rings {
  z-index: 1;
  overflow: visible;
}

.identity-rings circle {
  fill: none;
  stroke: color-mix(in srgb, var(--tone), transparent 48%);
  stroke-width: 1.5;
  stroke-dasharray: 4 7;
  transform-origin: 100px 100px;
  animation: spin 17s linear infinite;
}

.agent-core.engine .identity-rings circle {
  stroke-dasharray: 4 5;
  animation-duration: 9s;
}

.identity-rings .pulse-ring {
  stroke: var(--tone);
  stroke-width: 2;
  stroke-dasharray: none;
  animation: ring 1.8s ease-out infinite;
}

.core-orb {
  z-index: 2;
}

.core-orb circle {
  stroke: color-mix(in srgb, var(--tone), transparent 32%);
  stroke-width: 1.5;
}

.core-icon {
  top: 50%;
  left: 50%;
  z-index: 3;
  width: 48%;
  height: 48%;
  overflow: visible;
  fill: none;
  stroke: color-mix(in srgb, #fff, var(--tone) 18%);
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 8px var(--tone));
  transform: translate(-50%, -50%);
  animation: bob 5s ease-in-out var(--delay) infinite;
}

.core-icon .filled {
  fill: currentColor;
  stroke: none;
  color: color-mix(in srgb, #fff, var(--tone) 12%);
}

.core-image {
  inset: -8%;
  z-index: 3;
  width: 116%;
  height: 116%;
  object-fit: contain;
  object-position: center;
  mix-blend-mode: normal;
  opacity: 0.96;
  filter: saturate(1.18) contrast(1.08) drop-shadow(0 0 18px color-mix(in srgb, var(--tone), transparent 24%));
  animation: image-bob 5.5s ease-in-out var(--delay) infinite;
  mask-image: radial-gradient(circle at 50% 48%, #000 68%, transparent 89%);
}

.agent-tag {
  z-index: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  gap: 4px;
  pointer-events: none;
  transform: translate(-50%, 0);
}

.agent-tag strong {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  padding: 5px 15px 5px 7px;
  border: 1.5px solid color-mix(in srgb, var(--tone), transparent 52%);
  border-radius: 999px;
  background: rgba(6, 10, 22, 0.92);
  color: #fff;
  font-family: "Noto Serif SC", serif;
  font-size: clamp(14px, 1.15vw, 20px);
  font-weight: 600;
  white-space: nowrap;
}

.agent-tag.active strong {
  border-color: color-mix(in srgb, var(--tone), transparent 20%);
  box-shadow: 0 0 24px color-mix(in srgb, var(--tone), transparent 58%);
}

.agent-tag em {
  padding: 1px 6px;
  border: 1px solid color-mix(in srgb, var(--tone), transparent 54%);
  border-radius: 4px;
  background: color-mix(in srgb, var(--tone), transparent 84%);
  color: var(--tone);
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  font-style: normal;
  letter-spacing: 0.1em;
}

.agent-tag span {
  max-width: 100%;
  padding: 2px 11px;
  border: 1px solid color-mix(in srgb, var(--tone), transparent 84%);
  border-radius: 6px;
  background: color-mix(in srgb, var(--tone), transparent 94%);
  color: #9bb4d4;
  font-size: 10px;
  white-space: nowrap;
}

.agent-tag small {
  color: var(--tone);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  white-space: nowrap;
}

.link-chip {
  z-index: 6;
  padding: 5px 13px;
  border: 1px solid rgba(34, 211, 238, 0.3);
  border-radius: 999px;
  background: rgba(6, 10, 22, 0.94);
  color: #22d3ee;
  font-size: 12px;
  opacity: 0.2;
  transform: translate(-50%, -50%);
  transition: opacity 0.45s ease, filter 0.45s ease;
}

.link-chip.on {
  opacity: 1;
}

.link-chip.engine {
  border-color: rgba(251, 146, 60, 0.44);
  color: #fb923c;
}

.link-chip.writeback {
  border-color: rgba(236, 72, 153, 0.52);
  color: #ec4899;
}

.link-chip.hero {
  width: 190px;
  padding: 10px 12px;
  border-radius: 0;
  text-align: center;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.35));
}

.link-chip strong,
.link-chip small {
  display: block;
}

.link-chip small {
  margin-top: 2px;
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
}

.profile-panel {
  top: 38.2%;
  left: 77.4%;
  z-index: 9;
  width: 250px;
  padding: 14px 16px;
  border: 1px solid rgba(139, 92, 246, 0.32);
  border-radius: 14px;
  background: rgba(8, 15, 32, 0.84);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transform: translate(0, -50%);
}

.profile-panel::before {
  position: absolute;
  top: 0;
  right: 16px;
  left: 16px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
  content: "";
}

.profile-panel.active {
  border-color: rgba(139, 92, 246, 0.58);
  box-shadow: 0 0 28px rgba(139, 92, 246, 0.3);
}

.panel-head,
.dim-row {
  display: grid;
  align-items: center;
}

.panel-head {
  grid-template-columns: 1fr auto;
  margin-bottom: 11px;
}

.panel-head span {
  color: #a78bfa;
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.panel-head strong {
  color: #34d399;
  font-family: "Noto Serif SC", serif;
  font-size: 18px;
}

.dim-row {
  grid-template-columns: 58px 1fr 30px;
  gap: 8px;
  margin-top: 7px;
}

.dim-row span {
  display: flex;
  align-items: center;
  gap: 3px;
  color: #eaf4ff;
  font-size: 10px;
  white-space: nowrap;
}

.dim-row i {
  padding: 0 3px;
  border-radius: 3px;
  background: rgba(251, 90, 140, 0.18);
  color: #fb5a8c;
  font-size: 7px;
  font-style: normal;
}

.dim-row b {
  position: relative;
  height: 7px;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
}

.dim-row b::before,
.dim-row em {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  content: "";
}

.dim-row b::before {
  width: var(--before);
  background: rgba(255, 255, 255, 0.14);
}

.dim-row em {
  width: var(--after);
  background: linear-gradient(90deg, color-mix(in srgb, var(--tone), transparent 48%), var(--tone));
  box-shadow: 0 0 8px color-mix(in srgb, var(--tone), transparent 42%);
  transition: width 1.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.dim-row strong {
  color: var(--tone);
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  text-align: right;
}

.loop-narration {
  bottom: 3.8%;
  left: 2.5%;
  z-index: 9;
  width: 360px;
  padding: 15px 18px;
  border: 1px solid rgba(90, 160, 220, 0.18);
  border-radius: 14px;
  background: rgba(8, 15, 32, 0.84);
  backdrop-filter: blur(8px);
}

.loop-narration span {
  color: #22d3ee;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
}

.loop-narration strong {
  margin-left: 8px;
  color: #fff;
  font-size: 15px;
}

.loop-narration p {
  margin: 7px 0 0;
  color: #9bb4d4;
  font-size: 13px;
  line-height: 1.55;
}

.loop-legend {
  bottom: 3.1%;
  left: 50%;
  z-index: 9;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 10px 24px;
  border: 1px solid rgba(90, 160, 220, 0.18);
  border-radius: 999px;
  background: rgba(6, 10, 22, 0.82);
  backdrop-filter: blur(8px);
  transform: translateX(-50%);
}

.loop-legend span {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9bb4d4;
  font-size: 12px;
  white-space: nowrap;
}

.loop-legend i {
  width: 32px;
  height: 2px;
  background: #2dd4bf;
}

.loop-legend .engine {
  background: repeating-linear-gradient(90deg, #fb923c 0 6px, transparent 6px 10px);
}

.loop-legend .writeback {
  height: 3px;
  background: #ec4899;
}

.loop-legend .drive {
  background: repeating-linear-gradient(90deg, #22d3ee 0 6px, transparent 6px 10px);
}

@keyframes flow {
  to {
    stroke-dashoffset: -18;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.18;
  }
  50% {
    opacity: 1;
  }
}

@keyframes ring {
  from {
    opacity: 0.8;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.35);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-7px);
  }
}

@keyframes image-bob {
  0%,
  100% {
    transform: translateX(5%) translateY(0) scale(1);
  }
  50% {
    transform: translateX(5%) translateY(-7px) scale(1.015);
  }
}

@media (max-width: 1100px) {
  .reverse-loop {
    padding: 10px;
  }

  .loop-legend {
    gap: 12px;
    padding-inline: 14px;
  }
}
</style>
