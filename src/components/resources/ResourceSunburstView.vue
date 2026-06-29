<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const emit = defineEmits<{ 'select-node': [nodeId: string] }>()

const PALETTE = {
  cyan: '#00d4ff',
  purple: '#7c3aed',
  emerald: '#06d6a0',
  amber: '#f59e0b',
  rose: '#f43f5e',
  text: '#eef4ff',
  textSub: '#9aa6c3',
  yellow: '#ffd166',
}

const RING_COLORS: Record<string, string> = {
  prerequisite: PALETTE.cyan,
  current: PALETTE.emerald,
  application: PALETTE.amber,
  extension: PALETTE.purple,
}

const RELATION_COPY: Record<string, string> = {
  prerequisite: '先修',
  current: '主课',
  application: '应用',
  extension: '迁移',
}

interface CourseNode {
  id: string
  label: string
  mastery: number
  relationToCenter: string
  angle: number
  recommended?: boolean
  courseTitle: string
  lessonCount: number
  duration: string
  taskType: '视频课' | '交互课' | '代码实验' | '专项练习' | '项目任务' | '测评'
  practiceCount: number
  assessment: string
  outcome: string
  reason: string
}

interface CourseRing {
  id: string
  label: string
  relationType: 'prerequisite' | 'current' | 'application' | 'extension'
  summary: string
  nodes: CourseNode[]
}

const concentricRings: CourseRing[] = [
  {
    id: 'prerequisite',
    label: '先修课程包',
    relationType: 'prerequisite',
    summary: '补齐理解 Transformer 前必须用到的数学和神经网络基础',
    nodes: [
      {
        id: 'pre-attention',
        label: 'Attention 入门',
        courseTitle: '注意力机制从 Query / Key / Value 开始',
        mastery: 0.42,
        relationToCenter: '理解自注意力公式前置',
        angle: -42,
        recommended: true,
        lessonCount: 4,
        duration: '55 min',
        taskType: '交互课',
        practiceCount: 12,
        assessment: '3 题公式拆解小测',
        outcome: '能说清 Q/K/V、score、softmax、加权求和',
        reason: '注意力得分和权重解释不稳，建议先补这一环',
      },
      {
        id: 'pre-linear',
        label: '矩阵投影',
        courseTitle: '线性变换与多头投影',
        mastery: 0.68,
        relationToCenter: '支撑多头注意力维度变化',
        angle: 60,
        lessonCount: 3,
        duration: '40 min',
        taskType: '视频课',
        practiceCount: 8,
        assessment: '维度推导检查',
        outcome: '能手算 Wq/Wk/Wv 的输入输出维度',
        reason: '维度推导基本可用，只需要巩固多头拼接',
      },
      {
        id: 'pre-mlp',
        label: '前馈网络',
        courseTitle: 'FFN、残差连接与 LayerNorm',
        mastery: 0.58,
        relationToCenter: '解释 Transformer block 的非注意力部分',
        angle: 168,
        lessonCount: 4,
        duration: '50 min',
        taskType: '代码实验',
        practiceCount: 10,
        assessment: '补全 PyTorch block',
        outcome: '能写出残差、归一化、MLP 的执行顺序',
        reason: 'block 内部顺序容易混淆，需要用代码固定下来',
      },
    ],
  },
  {
    id: 'current',
    label: '核心课程包',
    relationType: 'current',
    summary: '围绕 Transformer 主线完成讲解、推导、编码和小测',
    nodes: [
      {
        id: 'core-self-attn',
        label: '自注意力',
        courseTitle: 'Self-Attention 全流程推导',
        mastery: 0.24,
        relationToCenter: '中心概念',
        angle: -84,
        recommended: true,
        lessonCount: 5,
        duration: '75 min',
        taskType: '交互课',
        practiceCount: 15,
        assessment: '逐步计算 attention matrix',
        outcome: '能从 token embedding 推到 attention output',
        reason: '当前主薄弱点，直接决定后续编码和应用理解',
      },
      {
        id: 'core-mha',
        label: '多头注意力',
        courseTitle: 'Multi-Head Attention 拆头与拼接',
        mastery: 0.18,
        relationToCenter: '中心难点',
        angle: 8,
        recommended: true,
        lessonCount: 4,
        duration: '60 min',
        taskType: '代码实验',
        practiceCount: 11,
        assessment: '实现简化版 MHA',
        outcome: '能解释为什么要拆成多个 head',
        reason: '掌握度低于 40%，需要放在本轮优先学习',
      },
      {
        id: 'core-pos',
        label: '位置编码',
        courseTitle: '位置编码与序列顺序表达',
        mastery: 0.36,
        relationToCenter: '补齐序列位置信息',
        angle: 112,
        recommended: true,
        lessonCount: 3,
        duration: '42 min',
        taskType: '视频课',
        practiceCount: 7,
        assessment: '对比无位置编码输出',
        outcome: '能说明模型为什么需要位置编码',
        reason: '位置编码概念薄弱，影响对序列建模的解释',
      },
      {
        id: 'core-block',
        label: 'Block 编码',
        courseTitle: '从零搭一个 Transformer Encoder Block',
        mastery: 0.12,
        relationToCenter: '中心综合任务',
        angle: 206,
        recommended: true,
        lessonCount: 6,
        duration: '90 min',
        taskType: '代码实验',
        practiceCount: 18,
        assessment: '单元测试通过率',
        outcome: '能实现一个可运行的 encoder block',
        reason: '需要把公式理解落到代码，作为本轮产出任务',
      },
    ],
  },
  {
    id: 'application',
    label: '应用课程包',
    relationType: 'application',
    summary: '把 Transformer 放到真实任务里，理解输入、输出和评价指标',
    nodes: [
      {
        id: 'app-classifier',
        label: '文本分类',
        courseTitle: '用 Encoder 做情感分类',
        mastery: 0.46,
        relationToCenter: 'Encoder 表征应用',
        angle: -18,
        lessonCount: 4,
        duration: '65 min',
        taskType: '项目任务',
        practiceCount: 9,
        assessment: '验证集 F1 对比',
        outcome: '能把 CLS 表征接入分类头',
        reason: '适合承接 encoder block，做第一个完整应用',
      },
      {
        id: 'app-rag',
        label: 'RAG 检索',
        courseTitle: 'Embedding、召回与重排的最小闭环',
        mastery: 0.28,
        relationToCenter: '注意力和语义表示迁移',
        angle: 98,
        recommended: true,
        lessonCount: 5,
        duration: '80 min',
        taskType: '项目任务',
        practiceCount: 13,
        assessment: 'Top-k 命中率实验',
        outcome: '能解释向量检索为什么能找相似语义',
        reason: 'RAG 是当前路径中的应用重点，需要和 Transformer 表征连起来',
      },
      {
        id: 'app-finetune',
        label: '轻量微调',
        courseTitle: 'LoRA 微调概念与参数冻结',
        mastery: 0.16,
        relationToCenter: '大模型训练应用',
        angle: 214,
        recommended: true,
        lessonCount: 4,
        duration: '70 min',
        taskType: '代码实验',
        practiceCount: 10,
        assessment: '参数量和效果对比',
        outcome: '能说明 LoRA 改哪些矩阵、为什么省参数',
        reason: '应用层掌握度偏低，适合作为进阶补弱任务',
      },
    ],
  },
  {
    id: 'extension',
    label: '迁移课程包',
    relationType: 'extension',
    summary: '把中心知识迁移到工程、评估和可解释性场景',
    nodes: [
      {
        id: 'ext-interpret',
        label: '注意力可视化',
        courseTitle: 'Attention Map 可解释性实验',
        mastery: 0.32,
        relationToCenter: '把权重解释为可视证据',
        angle: 26,
        recommended: true,
        lessonCount: 3,
        duration: '45 min',
        taskType: '代码实验',
        practiceCount: 6,
        assessment: '热力图解释报告',
        outcome: '能读懂 attention map 的高亮含义和局限',
        reason: '适合把抽象公式转成可见证据，降低理解门槛',
      },
      {
        id: 'ext-eval',
        label: '模型评估',
        courseTitle: '困惑度、准确率与错误分析',
        mastery: 0.22,
        relationToCenter: '判断模型是否学到有效表示',
        angle: 112,
        recommended: true,
        lessonCount: 4,
        duration: '58 min',
        taskType: '测评',
        practiceCount: 9,
        assessment: '错误样本归因表',
        outcome: '能用指标和样本共同判断模型表现',
        reason: '容易只看单一分数，需要补评价维度',
      },
      {
        id: 'ext-deploy',
        label: '推理部署',
        courseTitle: 'ONNX 导出与批量推理',
        mastery: 0.18,
        relationToCenter: '从模型到服务',
        angle: 204,
        recommended: true,
        lessonCount: 5,
        duration: '85 min',
        taskType: '项目任务',
        practiceCount: 12,
        assessment: '延迟与吞吐记录',
        outcome: '能跑通一个小型 Transformer 推理服务',
        reason: '工程迁移薄弱，适合作为课程末尾项目',
      },
      {
        id: 'ext-paper',
        label: '论文精读',
        courseTitle: 'Attention Is All You Need 精读',
        mastery: 0.26,
        relationToCenter: '把课程知识对回原文',
        angle: 292,
        recommended: true,
        lessonCount: 4,
        duration: '72 min',
        taskType: '视频课',
        practiceCount: 8,
        assessment: '段落批注和概念卡片',
        outcome: '能把论文结构和代码结构对应起来',
        reason: '帮助从课程学习迁移到论文阅读',
      },
    ],
  },
]

const RING = {
  centerR: 94,
  ring1In: 124,
  ring1Out: 205,
  ring2In: 222,
  ring2Out: 303,
  ring3In: 320,
  ring3Out: 392,
  ring4In: 410,
  ring4Out: 485,
}

const STAGE_W = 1920
const STAGE_H = 1080
const CX = STAGE_W / 2
const CY = STAGE_H / 2

const RING_BOUNDS: Record<string, { rIn: number; rOut: number }> = {
  prerequisite: { rIn: RING.ring1In, rOut: RING.ring1Out },
  current: { rIn: RING.ring2In, rOut: RING.ring2Out },
  application: { rIn: RING.ring3In, rOut: RING.ring3Out },
  extension: { rIn: RING.ring4In, rOut: RING.ring4Out },
}

interface RingNode extends CourseNode {
  ringId: string
  ringLabel: string
  ringType: string
}

interface RingSegment extends RingNode {
  startAngle: number
  endAngle: number
  labelAngle: number
  ringIndex: number
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number) {
  const p1 = polar(cx, cy, rOut, a0)
  const p2 = polar(cx, cy, rOut, a1)
  const p3 = polar(cx, cy, rIn, a1)
  const p4 = polar(cx, cy, rIn, a0)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
}

function hexA(hex: string, a: number) {
  return hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')
}

function segmentFill(segment: RingSegment) {
  const color = segment.mastery < 0.4 ? PALETTE.rose : RING_COLORS[segment.ringType]
  const alpha = 0.13 + segment.mastery * 0.32
  return hexA(color, alpha)
}

function segmentStroke(segment: RingSegment) {
  if (segment.recommended) return PALETTE.yellow
  return segment.mastery < 0.4 ? PALETTE.rose : RING_COLORS[segment.ringType]
}

function masteryArc(segment: RingSegment) {
  const span = segment.endAngle - segment.startAngle
  const end = segment.startAngle + Math.max(4, span * segment.mastery)
  const bounds = RING_BOUNDS[segment.ringType]
  return arcPath(CX, CY, bounds.rOut - 10, bounds.rOut - 3, segment.startAngle, end)
}

const STARS = (() => {
  const out: { x: number; y: number; r: number; o: number; tw: boolean; d: number }[] = []
  let seed = 47
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < 180; i += 1) {
    out.push({
      x: rand() * STAGE_W,
      y: rand() * STAGE_H,
      r: 0.35 + rand() * 1.35,
      o: 0.08 + rand() * 0.42,
      tw: rand() < 0.28,
      d: rand() * 4,
    })
  }
  return out
})()

const ringSegments = computed(() =>
  concentricRings.map((ring, ringIndex) => {
    const count = Math.max(1, ring.nodes.length)
    const rawSpan = 360 / count
    const visibleSpan = count === 1 ? 292 : Math.max(44, rawSpan - 10)

    return {
      ...ring,
      segments: ring.nodes.map((node) => {
        const startAngle = node.angle - visibleSpan / 2
        const endAngle = node.angle + visibleSpan / 2
        return {
          ...node,
          ringId: ring.id,
          ringLabel: ring.label,
          ringType: ring.relationType,
          ringIndex,
          startAngle,
          endAngle,
          labelAngle: node.angle,
        } satisfies RingSegment
      }),
    }
  })
)

const allNodes = concentricRings.flatMap((ring) => ring.nodes)
const nodeCount = allNodes.length
const weakCount = allNodes.filter((node) => node.mastery < 0.4).length
const recommendedCount = allNodes.filter((node) => node.recommended).length
const totalLessons = allNodes.reduce((sum, node) => sum + node.lessonCount, 0)
const totalPractice = allNodes.reduce((sum, node) => sum + node.practiceCount, 0)
const totalMastery = allNodes.reduce((sum, node) => sum + node.mastery, 0) / allNodes.length

const hoverNode = ref<RingSegment | null>(null)
const focusedNode = ref<RingSegment | null>(null)
const mouse = ref({ x: 0, y: 0 })
const animVal = ref(totalMastery * 100)
let animRaf = 0

const activeNode = computed(() => focusedNode.value ?? hoverNode.value)
const activeNodeId = computed(() => activeNode.value?.id ?? null)
const activeRingId = computed(() => activeNode.value?.ringId ?? null)
const centerPercent = computed(() => Math.round(animVal.value))

const masteredCount = computed(() => {
  const nodes = focusedNode.value
    ? concentricRings.find((ring) => ring.id === focusedNode.value?.ringId)?.nodes ?? []
    : allNodes
  return nodes.filter((node) => node.mastery >= 0.9).length
})

const inProgressCount = computed(() => {
  const nodes = focusedNode.value
    ? concentricRings.find((ring) => ring.id === focusedNode.value?.ringId)?.nodes ?? []
    : allNodes
  return nodes.filter((node) => node.mastery > 0 && node.mastery < 0.9).length
})

function labelPosition(segment: RingSegment) {
  const bounds = RING_BOUNDS[segment.ringType]
  const point = polar(CX, CY, bounds.rOut + (segment.ringIndex === 3 ? 34 : 28), segment.labelAngle)
  return {
    left: `${(point.x / STAGE_W) * 100}%`,
    top: `${(point.y / STAGE_H) * 100}%`,
  }
}

function ringLabelPosition(ringType: string, index: number) {
  const bounds = RING_BOUNDS[ringType]
  const point = polar(CX, CY, (bounds.rIn + bounds.rOut) / 2, 38 + index * 84)
  return {
    left: `${(point.x / STAGE_W) * 100}%`,
    top: `${(point.y / STAGE_H) * 100}%`,
  }
}

function animateTo(target: number) {
  const start = animVal.value
  const t0 = performance.now()
  const dur = 520
  cancelAnimationFrame(animRaf)

  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / dur)
    const ease = 1 - Math.pow(1 - t, 3)
    animVal.value = start + (target - start) * ease
    if (t < 1) animRaf = requestAnimationFrame(tick)
  }

  animRaf = requestAnimationFrame(tick)
}

watch(
  activeNode,
  () => {
    const target = activeNode.value ? activeNode.value.mastery * 100 : totalMastery * 100
    animateTo(target)
  },
  { immediate: true },
)

function onMove(e: MouseEvent) {
  mouse.value = { x: e.clientX, y: e.clientY }
}

function onSegmentHover(node: RingSegment | null) {
  hoverNode.value = node
}

function onSegmentClick(node: RingSegment) {
  focusedNode.value = focusedNode.value?.id === node.id ? null : node
  emit('select-node', node.id)
}

function closeDetail() {
  focusedNode.value = null
}

onMounted(() => window.addEventListener('mousemove', onMove))
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(animRaf)
})
</script>

<template>
  <div class="sunburst-wrap" @mousemove="onMove">
    <div class="sb-stats">
      <div class="sb-stat-card">
        <div class="sb-stat-label">课程包</div>
        <div class="sb-stat-val">
          <span class="sb-stat-num">{{ nodeCount }}</span>
          <span class="sb-stat-sub">门</span>
        </div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">课时</div>
        <div class="sb-stat-val">
          <span class="sb-stat-num is-cyan">{{ totalLessons }}</span>
          <span class="sb-stat-sub">节</span>
        </div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">练习</div>
        <div class="sb-stat-val">
          <span class="sb-stat-num is-rose">{{ totalPractice }}</span>
          <span class="sb-stat-sub">题</span>
        </div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">优先补弱</div>
        <div class="sb-stat-val">
          <span class="sb-stat-num is-amber">{{ recommendedCount }}</span>
          <span class="sb-stat-sub">门</span>
        </div>
      </div>
    </div>

    <div class="sb-legend">
      <div class="sb-legend-title">RINGS · 关系层级</div>
      <div v-for="(ring, i) in concentricRings" :key="ring.id" class="sb-legend-row">
        <span
          class="sb-legend-dot"
          :style="{
            background: hexA(RING_COLORS[ring.relationType], 0.16),
            borderColor: RING_COLORS[ring.relationType],
            color: RING_COLORS[ring.relationType],
          }"
        >
          {{ i + 1 }}
        </span>
        <span class="sb-legend-label">{{ ring.label }}</span>
        <span class="sb-legend-info">{{ ring.nodes.length }} 门 · {{ ring.nodes.reduce((sum, node) => sum + node.lessonCount, 0) }} 节</span>
      </div>
    </div>

    <svg class="sb-svg" :viewBox="`0 0 ${STAGE_W} ${STAGE_H}`" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="sb-cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="PALETTE.purple" stop-opacity="0.42" />
          <stop offset="58%" :stop-color="PALETTE.purple" stop-opacity="0.14" />
          <stop offset="100%" :stop-color="PALETTE.purple" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="sb-cd" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1c2444" />
          <stop offset="58%" stop-color="#0d1327" />
          <stop offset="100%" stop-color="#080a14" />
        </radialGradient>
        <filter id="sb-glow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g>
        <circle
          v-for="(star, i) in STARS"
          :key="'star-' + i"
          :cx="star.x"
          :cy="star.y"
          :r="star.r"
          fill="#ffffff"
          :opacity="star.o"
          :class="star.tw ? 'sb-twinkle' : undefined"
          :style="star.tw ? { animationDelay: `${star.d}s` } : undefined"
        />
      </g>

      <circle :cx="CX" :cy="CY" :r="RING.ring4Out + 76" fill="url(#sb-cg)" opacity="0.68" />
      <circle :cx="CX" :cy="CY" :r="RING.ring4Out + 16" fill="none" :stroke="hexA(PALETTE.cyan, 0.18)" stroke-width="1" stroke-dasharray="2 12" class="sb-orbit-slow" />
      <circle :cx="CX" :cy="CY" :r="RING.ring3Out + 22" fill="none" :stroke="hexA(PALETTE.purple, 0.22)" stroke-width="1" stroke-dasharray="1 18" class="sb-orbit-slow-rev" />

      <g v-for="ring in ringSegments" :key="'guide-' + ring.id">
        <path
          :d="arcPath(CX, CY, RING_BOUNDS[ring.relationType].rIn, RING_BOUNDS[ring.relationType].rOut, 0, 359.7)"
          :fill="hexA(RING_COLORS[ring.relationType], 0.025)"
          :stroke="hexA(RING_COLORS[ring.relationType], 0.11)"
          stroke-width="1"
        />
      </g>

      <g v-for="ring in ringSegments" :key="'ring-' + ring.id" :class="{ 'is-muted-ring': activeRingId && activeRingId !== ring.id }">
        <g
          v-for="segment in ring.segments"
          :key="segment.id"
          class="sb-segment"
          :class="{
            'is-active': activeNodeId === segment.id,
            'is-recommended': segment.recommended,
            'is-weak': segment.mastery < 0.4,
          }"
          @mouseenter="onSegmentHover(segment)"
          @mouseleave="onSegmentHover(null)"
          @click="onSegmentClick(segment)"
        >
          <path
            class="sb-segment-base"
            :d="arcPath(CX, CY, RING_BOUNDS[segment.ringType].rIn, RING_BOUNDS[segment.ringType].rOut, segment.startAngle, segment.endAngle)"
            :fill="segmentFill(segment)"
            :stroke="segmentStroke(segment)"
            :stroke-opacity="activeNodeId === segment.id ? 0.92 : segment.recommended ? 0.78 : 0.42"
            :stroke-width="activeNodeId === segment.id ? 2.4 : 1.25"
          />
          <path
            class="sb-mastery-edge"
            :d="masteryArc(segment)"
            :fill="segment.mastery < 0.4 ? hexA(PALETTE.rose, 0.82) : hexA(RING_COLORS[segment.ringType], 0.82)"
            :filter="activeNodeId === segment.id || segment.recommended ? 'url(#sb-glow)' : undefined"
          />
          <circle
            v-if="segment.recommended"
            :cx="polar(CX, CY, RING_BOUNDS[segment.ringType].rOut - 22, segment.labelAngle).x"
            :cy="polar(CX, CY, RING_BOUNDS[segment.ringType].rOut - 22, segment.labelAngle).y"
            r="5"
            :fill="PALETTE.yellow"
            filter="url(#sb-glow)"
          />
        </g>
      </g>

      <g v-if="activeNode">
        <line
          :x1="CX"
          :y1="CY"
          :x2="polar(CX, CY, (RING_BOUNDS[activeNode.ringType].rIn + RING_BOUNDS[activeNode.ringType].rOut) / 2, activeNode.labelAngle).x"
          :y2="polar(CX, CY, (RING_BOUNDS[activeNode.ringType].rIn + RING_BOUNDS[activeNode.ringType].rOut) / 2, activeNode.labelAngle).y"
          :stroke="RING_COLORS[activeNode.ringType]"
          stroke-opacity="0.42"
          stroke-width="1.4"
          stroke-dasharray="4 8"
          class="sb-shimmer"
        />
      </g>

      <g class="sb-flow-orbit">
        <circle
          v-for="i in 6"
          :key="'flow-' + i"
          :cx="polar(CX, CY, RING.ring4Out + 31, i * 60).x"
          :cy="polar(CX, CY, RING.ring4Out + 31, i * 60).y"
          r="2.3"
          :fill="i % 2 ? PALETTE.cyan : PALETTE.purple"
          opacity="0.7"
          filter="url(#sb-glow)"
        />
      </g>

      <circle :cx="CX" :cy="CY" :r="RING.centerR + 17" fill="none" :stroke="hexA(PALETTE.purple, 0.26)" stroke-width="1.2" stroke-dasharray="3 7" class="sb-orbit-med" />
      <circle :cx="CX" :cy="CY" :r="RING.centerR" fill="url(#sb-cd)" :stroke="hexA(PALETTE.purple, 0.58)" stroke-width="1.5" />
      <circle :cx="CX" :cy="CY" :r="RING.centerR - 18" fill="none" :stroke="hexA(PALETTE.cyan, 0.18)" stroke-width="1" />
    </svg>

    <template v-for="ring in ringSegments" :key="'labels-' + ring.id">
      <div
        v-for="segment in ring.segments"
        :key="'label-' + segment.id"
        class="sb-sub-label"
        :class="{ 'is-active': activeNodeId === segment.id, 'is-dim': activeRingId && activeRingId !== ring.id }"
        :style="labelPosition(segment)"
      >
        <div
          class="sb-sl-name"
          :style="{ color: activeNodeId === segment.id ? RING_COLORS[segment.ringType] : segment.mastery < 0.4 ? PALETTE.rose : PALETTE.text }"
        >
          {{ segment.label }}
        </div>
        <div class="sb-sl-meta" :style="{ color: segment.mastery < 0.4 ? PALETTE.rose : RING_COLORS[segment.ringType] }">
          {{ Math.round(segment.mastery * 100) }}%
        </div>
        <div class="sb-sl-task">{{ segment.taskType }} · {{ segment.duration }}</div>
      </div>
    </template>

    <div
      v-for="(ring, i) in concentricRings"
      :key="'ring-label-' + ring.id"
      class="sb-domain-label"
      :class="{ 'is-dim': activeRingId && activeRingId !== ring.id }"
      :style="ringLabelPosition(ring.relationType, i)"
    >
      <div class="sb-dl-name" :style="{ color: RING_COLORS[ring.relationType] }">{{ RELATION_COPY[ring.relationType] }}</div>
      <div class="sb-dl-sub">{{ ring.label }}</div>
    </div>

    <div class="sb-center">
      <div class="sb-center-sub">{{ focusedNode ? 'FOCUSED · 此项' : 'TRANSFORMER' }}</div>
      <div class="sb-center-pct">{{ centerPercent }}<span class="sb-center-pct-unit">%</span></div>
      <div class="sb-center-info">
        <template v-if="focusedNode">
          {{ focusedNode.label }}<br />
          {{ focusedNode.ringLabel }}
        </template>
        <template v-else>
          {{ concentricRings.length }} 个课程包 · {{ nodeCount }} 门课<br />
          先修、主课、应用、迁移逐层推进
        </template>
      </div>
    </div>

    <div v-if="hoverNode && (!focusedNode || focusedNode.id !== hoverNode.id)" class="sb-tooltip" :style="{ left: mouse.x + 16 + 'px', top: mouse.y + 16 + 'px', borderColor: hexA(RING_COLORS[hoverNode.ringType], 0.42) }">
      <div class="sb-tt-en" :style="{ color: RING_COLORS[hoverNode.ringType] }">{{ hoverNode.ringLabel }}</div>
      <div class="sb-tt-name">{{ hoverNode.courseTitle }}</div>
      <div class="sb-tt-meta">{{ hoverNode.taskType }} · {{ hoverNode.lessonCount }} 节 · {{ hoverNode.duration }} · {{ hoverNode.practiceCount }} 题</div>
      <div class="sb-tt-bar-wrap">
        <div class="sb-tt-bar-bg">
          <div class="sb-tt-bar" :style="{ width: `${hoverNode.mastery * 100}%`, background: hoverNode.mastery < 0.4 ? PALETTE.rose : RING_COLORS[hoverNode.ringType] }"></div>
        </div>
        <span class="sb-tt-pct" :style="{ color: hoverNode.mastery < 0.4 ? PALETTE.rose : RING_COLORS[hoverNode.ringType] }">{{ Math.round(hoverNode.mastery * 100) }}%</span>
      </div>
      <div class="sb-tt-hint">{{ hoverNode.recommended ? '推荐学习 · ' : '' }}{{ hoverNode.reason }}</div>
    </div>

    <transition name="sb-slide">
      <div v-if="focusedNode" class="sb-detail">
        <div class="sb-detail-header">
          <span
            class="sb-detail-tag"
            :style="{
              color: RING_COLORS[focusedNode.ringType],
              background: hexA(RING_COLORS[focusedNode.ringType], 0.11),
              borderColor: hexA(RING_COLORS[focusedNode.ringType], 0.28),
            }"
          >
            <span class="sb-detail-tag-dot" :style="{ background: RING_COLORS[focusedNode.ringType], boxShadow: `0 0 8px ${RING_COLORS[focusedNode.ringType]}` }"></span>
            {{ focusedNode.ringLabel }}
          </span>
          <button class="sb-detail-close" type="button" aria-label="关闭" @click="closeDetail">&times;</button>
        </div>

        <div class="sb-detail-title">{{ focusedNode.courseTitle }}</div>
        <div class="sb-detail-sub">中心课程: Transformer · {{ focusedNode.label }} · {{ RELATION_COPY[focusedNode.ringType] }}关系</div>

        <div class="sb-detail-mastery">
          <div class="sb-detail-mastery-head">
            <span class="sb-detail-mastery-label">掌握度</span>
            <span class="sb-detail-mastery-val" :style="{ color: focusedNode.mastery < 0.4 ? PALETTE.rose : RING_COLORS[focusedNode.ringType] }">
              {{ Math.round(focusedNode.mastery * 100) }}%
            </span>
          </div>
          <div class="sb-detail-mastery-bar-bg">
            <div
              class="sb-detail-mastery-bar"
              :style="{
                width: `${focusedNode.mastery * 100}%`,
                background: `linear-gradient(90deg, ${focusedNode.mastery < 0.4 ? PALETTE.rose : RING_COLORS[focusedNode.ringType]}, ${PALETTE.cyan})`,
                boxShadow: `0 0 14px ${hexA(focusedNode.mastery < 0.4 ? PALETTE.rose : RING_COLORS[focusedNode.ringType], 0.45)}`,
              }"
            ></div>
          </div>
        </div>

        <div class="sb-detail-stats">
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedNode.mastery >= 0.9 ? PALETTE.emerald : PALETTE.textSub }">{{ focusedNode.mastery >= 0.9 ? '是' : '否' }}</div>
            <div class="sb-detail-stat-label">已掌握</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: RING_COLORS[focusedNode.ringType] }">{{ focusedNode.lessonCount }}</div>
            <div class="sb-detail-stat-label">课时</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedNode.recommended ? PALETTE.yellow : PALETTE.textSub }">{{ focusedNode.practiceCount }}</div>
            <div class="sb-detail-stat-label">练习题</div>
          </div>
        </div>

        <div class="sb-detail-concepts-title">COURSE · 课程细节</div>
        <div class="sb-detail-concepts">
          <div class="sb-detail-concept">
            <span class="sb-dc-dot" :style="{ background: RING_COLORS[focusedNode.ringType] }"></span>
            <span class="sb-dc-name">{{ focusedNode.taskType }} · {{ focusedNode.duration }}</span>
            <span class="sb-dc-pct" :style="{ color: RING_COLORS[focusedNode.ringType] }">{{ focusedNode.ringLabel }}</span>
          </div>
          <div class="sb-detail-concept">
            <span class="sb-dc-dot" :style="{ background: focusedNode.mastery < 0.4 ? PALETTE.rose : PALETTE.emerald }"></span>
            <span class="sb-dc-name">{{ focusedNode.assessment }}</span>
            <span class="sb-dc-pct" :style="{ color: focusedNode.mastery < 0.4 ? PALETTE.rose : PALETTE.emerald }">测评</span>
          </div>
          <div class="sb-detail-concept">
            <span class="sb-dc-dot" :style="{ background: PALETTE.yellow }"></span>
            <span class="sb-dc-name">{{ focusedNode.outcome }}</span>
            <span class="sb-dc-pct" :style="{ color: PALETTE.yellow }">目标</span>
          </div>
          <div class="sb-detail-note">
            <span>推荐原因</span>
            <strong>{{ focusedNode.reason }}</strong>
          </div>
        </div>

        <button
          class="sb-detail-btn"
          type="button"
          :style="{ background: `linear-gradient(135deg, ${RING_COLORS[focusedNode.ringType]}, ${PALETTE.purple})`, boxShadow: `0 10px 28px ${hexA(RING_COLORS[focusedNode.ringType], 0.34)}` }"
        >
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
  min-height: 560px;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 18px;
  background:
    radial-gradient(ellipse 900px 620px at 50% 48%, rgba(124, 58, 237, 0.18), transparent 62%),
    radial-gradient(ellipse 760px 520px at 18% 20%, rgba(0, 212, 255, 0.08), transparent 62%),
    radial-gradient(ellipse 760px 520px at 84% 78%, rgba(245, 158, 11, 0.08), transparent 62%),
    #070914;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.sb-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.22; }
  50% { opacity: 0.9; }
}

@keyframes shimmer-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -180; }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbit-spin-rev {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes float-up {
  0% { transform: translateY(8px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes count-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.018); }
}

.sb-twinkle { animation: twinkle 2.6s ease-in-out infinite; }
.sb-shimmer { animation: shimmer-flow 1.8s linear infinite; }
.sb-orbit-slow { transform-origin: 960px 540px; animation: orbit-spin 86s linear infinite; }
.sb-orbit-slow-rev { transform-origin: 960px 540px; animation: orbit-spin-rev 118s linear infinite; }
.sb-orbit-med { transform-origin: 960px 540px; animation: orbit-spin 34s linear infinite; }
.sb-flow-orbit { transform-origin: 960px 540px; animation: orbit-spin 19s linear infinite; }

.sb-stats {
  position: absolute;
  top: 18px;
  left: 50%;
  z-index: 18;
  display: flex;
  gap: 10px;
  align-items: center;
  transform: translateX(-50%);
  animation: float-up 0.55s ease 0.08s both;
}

.sb-stat-card {
  min-width: 92px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(9, 13, 28, 0.66);
  backdrop-filter: blur(18px);
}

.sb-stat-label {
  margin-bottom: 4px;
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.sb-stat-val {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.sb-stat-num {
  color: #06d6a0;
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 22px;
  line-height: 1;
}

.sb-stat-num.is-cyan { color: #00d4ff; }
.sb-stat-num.is-rose { color: #f43f5e; }
.sb-stat-num.is-amber { color: #f59e0b; }
.sb-stat-sub { color: #8892b0; font-size: 11px; }

.sb-legend {
  position: absolute;
  bottom: 18px;
  left: 18px;
  z-index: 20;
  min-width: 238px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(9, 13, 28, 0.72);
  backdrop-filter: blur(18px);
  animation: float-up 0.55s ease 0.18s both;
}

.sb-legend-title {
  margin-bottom: 12px;
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.sb-legend-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
}

.sb-legend-row:last-child { margin-bottom: 0; }

.sb-legend-dot {
  display: inline-flex;
  width: 21px;
  height: 21px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid;
  border-radius: 6px;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 700;
}

.sb-legend-label {
  min-width: 82px;
  color: #eef4ff;
  font-weight: 600;
}

.sb-legend-info {
  color: #8a96b4;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
}

.sb-segment {
  cursor: pointer;
  transition: opacity 0.28s ease;
}

.sb-segment-base,
.sb-mastery-edge {
  transition:
    fill 0.22s ease,
    stroke 0.22s ease,
    stroke-width 0.22s ease,
    opacity 0.22s ease;
}

.sb-segment:hover .sb-segment-base,
.sb-segment.is-active .sb-segment-base {
  filter: url(#sb-glow);
}

.sb-segment.is-recommended .sb-segment-base {
  stroke-dasharray: 6 5;
}

.sb-segment.is-weak .sb-segment-base {
  stroke-opacity: 0.72;
}

.is-muted-ring {
  opacity: 0.34;
  transition: opacity 0.28s ease;
}

.sb-domain-label {
  position: absolute;
  z-index: 8;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.78);
  transform: translate(-50%, -50%);
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.sb-domain-label.is-dim { opacity: 0.28; }

.sb-dl-name {
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
}

.sb-dl-sub {
  margin-top: 4px;
  color: #9aa6c3;
  font-size: 10px;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.sb-sub-label {
  position: absolute;
  z-index: 9;
  max-width: 150px;
  padding: 5px 8px;
  border-radius: 7px;
  text-align: center;
  transform: translate(-50%, -50%);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    background 0.25s ease;
  pointer-events: none;
}

.sb-sub-label.is-active {
  z-index: 12;
  background: rgba(5, 8, 18, 0.52);
  transform: translate(-50%, -50%) scale(1.06);
}

.sb-sub-label.is-dim { opacity: 0.24; }

.sb-sl-name {
  overflow: hidden;
  font-family: var(--font-sans, sans-serif);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.12;
  text-overflow: ellipsis;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.82);
  white-space: nowrap;
}

.sb-sl-meta {
  margin-top: 2px;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 700;
}

.sb-sl-task {
  margin-top: 2px;
  overflow: hidden;
  color: #9aa6c3;
  font-size: 9px;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sb-center {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 238px;
  text-align: center;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.sb-center-sub {
  margin-bottom: 6px;
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.22em;
}

.sb-center-pct {
  color: #eef4ff;
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 64px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: 0;
  animation: count-pulse 3s ease-in-out infinite;
}

.sb-center-pct-unit {
  color: #9aa6c3;
  font-size: 25px;
}

.sb-center-info {
  margin-top: 10px;
  color: #9aa6c3;
  font-size: 12px;
  line-height: 1.45;
}

.sb-tooltip {
  position: fixed;
  z-index: 50;
  max-width: 260px;
  padding: 11px 14px;
  border: 1px solid;
  border-radius: 10px;
  background: rgba(9, 13, 28, 0.92);
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(18px);
  pointer-events: none;
}

.sb-tt-en {
  margin-bottom: 4px;
  font-size: 10px;
  font-weight: 700;
}

.sb-tt-name {
  color: #eef4ff;
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 18px;
  line-height: 1.1;
}

.sb-tt-meta {
  margin-top: 6px;
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.04em;
}

.sb-tt-bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 9px;
}

.sb-tt-bar-bg {
  flex: 1;
  height: 4px;
  overflow: hidden;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
}

.sb-tt-bar {
  height: 100%;
  border-radius: 3px;
}

.sb-tt-pct {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  font-weight: 800;
}

.sb-tt-hint {
  margin-top: 7px;
  color: #9aa6c3;
  font-size: 11px;
}

.sb-detail {
  position: absolute;
  top: 18px;
  right: clamp(260px, 18vw, 310px);
  z-index: 30;
  display: flex;
  width: 360px;
  max-height: calc(100% - 36px);
  flex-direction: column;
  overflow: hidden;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(9, 13, 28, 0.92);
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.54);
  backdrop-filter: blur(24px);
}

.sb-slide-enter-active,
.sb-slide-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.sb-slide-enter-from,
.sb-slide-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.sb-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
}

.sb-detail-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.sb-detail-tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.sb-detail-close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  color: #9aa6c3;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  transition: background 0.18s ease, color 0.18s ease;
}

.sb-detail-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.sb-detail-title {
  margin-bottom: 6px;
  color: #eef4ff;
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 30px;
  line-height: 1.08;
  letter-spacing: 0;
}

.sb-detail-sub {
  margin-bottom: 18px;
  color: #9aa6c3;
  font-size: 12px;
  line-height: 1.5;
}

.sb-detail-mastery {
  margin-bottom: 16px;
}

.sb-detail-mastery-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 7px;
}

.sb-detail-mastery-label {
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.16em;
}

.sb-detail-mastery-val {
  font-family: var(--font-mono, monospace);
  font-size: 18px;
  font-weight: 800;
}

.sb-detail-mastery-bar-bg {
  height: 6px;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}

.sb-detail-mastery-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.42s ease;
}

.sb-detail-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.sb-detail-stat {
  padding: 10px 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
}

.sb-detail-stat-val {
  font-family: var(--font-display, var(--font-sans, sans-serif));
  font-size: 22px;
  line-height: 1;
}

.sb-detail-stat-label {
  margin-top: 4px;
  color: #9aa6c3;
  font-size: 10px;
}

.sb-detail-concepts-title {
  margin-bottom: 10px;
  color: #9aa6c3;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.16em;
}

.sb-detail-concepts {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
}

.sb-detail-concept {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.028);
}

.sb-detail-note {
  margin-top: 2px;
  padding: 10px 11px;
  border: 1px solid rgba(255, 209, 102, 0.18);
  border-radius: 9px;
  background: rgba(255, 209, 102, 0.06);
}

.sb-detail-note span {
  display: block;
  margin-bottom: 5px;
  color: #ffd166;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.sb-detail-note strong {
  display: block;
  color: #eef4ff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
}

.sb-dc-dot {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 50%;
}

.sb-dc-name {
  flex: 1;
  color: #eef4ff;
  font-size: 13px;
}

.sb-dc-pct {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 800;
}

.sb-detail-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px 14px;
  border: 0;
  border-radius: 9px;
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  font-family: var(--font-sans, sans-serif);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

@media (max-width: 980px) {
  .sunburst-wrap {
    min-height: 620px;
    max-height: none;
  }

  .sb-stats {
    top: 12px;
    width: calc(100% - 24px);
    justify-content: center;
    gap: 6px;
  }

  .sb-stat-card {
    min-width: 0;
    flex: 1;
    padding: 8px 9px;
  }

  .sb-stat-num { font-size: 18px; }
  .sb-legend { bottom: 12px; left: 12px; padding: 12px; min-width: 190px; }
  .sb-detail { right: 12px; left: 12px; top: auto; bottom: 12px; width: auto; max-height: 50%; }
  .sb-sub-label { max-width: 100px; }
  .sb-sl-name { font-size: 10px; }
  .sb-sl-task { display: none; }
}
</style>
