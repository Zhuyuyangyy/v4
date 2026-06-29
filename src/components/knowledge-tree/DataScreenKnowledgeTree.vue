<script setup lang="ts">
import { computed } from 'vue'
import type { TreeNode } from './GrowthKnowledgeTree.vue'

interface GraphMarker {
  id: string
  type: 'knowledge'
  label: string
  status?: TreeNode['status']
  progress?: number
  description: string
  items?: string[]
}

const props = defineProps<{
  knowledgePoints: TreeNode[]
}>()

const emit = defineEmits<{
  markerSelect: [marker: GraphMarker]
}>()

const nodes = computed(() => props.knowledgePoints.slice(0, 18))
const weakCount = computed(() => props.knowledgePoints.filter(node => node.status === 'weak').length)
const masteredCount = computed(() => props.knowledgePoints.filter(node => node.status === 'mastered').length)
const averageProgress = computed(() => {
  if (!props.knowledgePoints.length) return 0
  return Math.round(props.knowledgePoints.reduce((sum, node) => sum + node.progress, 0) / props.knowledgePoints.length)
})

const nodeSlots = [
  { x: 39, y: 30, size: 42, delay: 0.1 },
  { x: 47, y: 24, size: 52, delay: 0.18 },
  { x: 57, y: 29, size: 44, delay: 0.26 },
  { x: 34, y: 42, size: 48, delay: 0.34 },
  { x: 50, y: 39, size: 58, delay: 0.42 },
  { x: 66, y: 43, size: 48, delay: 0.5 },
  { x: 28, y: 55, size: 38, delay: 0.58 },
  { x: 42, y: 56, size: 46, delay: 0.66 },
  { x: 58, y: 56, size: 44, delay: 0.74 },
  { x: 72, y: 57, size: 40, delay: 0.82 },
  { x: 22, y: 39, size: 34, delay: 0.9 },
  { x: 76, y: 36, size: 36, delay: 0.98 },
  { x: 31, y: 24, size: 34, delay: 1.06 },
  { x: 67, y: 25, size: 34, delay: 1.14 },
  { x: 44, y: 15, size: 32, delay: 1.22 },
  { x: 55, y: 16, size: 32, delay: 1.3 },
  { x: 20, y: 62, size: 30, delay: 1.38 },
  { x: 80, y: 62, size: 30, delay: 1.46 },
]

function toneForNode(node: TreeNode) {
  if (node.status === 'weak') return '#ff5b2e'
  if (node.status === 'learning') return '#ffb23a'
  if (node.status === 'mastered') return '#bfeeff'
  return '#4ff3ff'
}

function selectNode(node: TreeNode) {
  emit('markerSelect', {
    id: `data-screen-${node.name}`,
    type: 'knowledge',
    label: node.name,
    status: node.status,
    progress: node.progress,
    description: '数据大屏知识节点',
    items: [
      `course: ${node.course ?? 'unclassified'}`,
      `progress: ${node.progress}%`,
    ],
  })
}
</script>

<template>
  <div class="dst-root">
    <div class="dst-header">
      <span class="dst-kicker">AI DIAGNOSTIC TREE</span>
      <strong>知识评估数据树</strong>
      <span>{{ averageProgress }}%</span>
    </div>

    <div class="dst-kpi dst-kpi-left">
      <span>MASTERED</span>
      <strong>{{ masteredCount }}</strong>
      <i />
    </div>
    <div class="dst-kpi dst-kpi-right">
      <span>RISK</span>
      <strong>{{ weakCount }}</strong>
      <i />
    </div>

    <svg class="dst-branch-map" viewBox="0 0 1000 760" aria-hidden="true">
      <defs>
        <linearGradient id="dstBranchGlow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff3f18" stop-opacity="0.95" />
          <stop offset="52%" stop-color="#8ee8ff" stop-opacity="0.78" />
          <stop offset="100%" stop-color="#ff9a34" stop-opacity="0.92" />
        </linearGradient>
        <radialGradient id="dstCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff2c7" stop-opacity="0.95" />
          <stop offset="48%" stop-color="#ff4b1e" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#00d4ff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path class="dst-trunk-path" d="M493 706 C486 604 478 530 492 456 C504 392 526 335 504 248" />
      <path class="dst-trunk-path dst-trunk-secondary" d="M520 708 C535 610 552 533 534 452 C520 390 494 336 505 248" />
      <path class="dst-branch-path" d="M503 424 C426 390 352 332 257 284" />
      <path class="dst-branch-path" d="M504 408 C580 356 654 315 748 270" />
      <path class="dst-branch-path" d="M503 343 C462 300 426 236 371 168" />
      <path class="dst-branch-path" d="M510 340 C562 290 604 235 658 168" />
      <path class="dst-branch-path dst-hot-branch" d="M524 455 C612 427 693 409 790 355" />
      <circle cx="505" cy="452" r="96" fill="url(#dstCoreGlow)" />
    </svg>

    <div class="dst-code-rain" aria-hidden="true">
      <span>010101</span>
      <span>AGENT</span>
      <span>EVAL</span>
      <span>TRACE</span>
      <span>101110</span>
    </div>

    <button
      v-for="(node, index) in nodes"
      :key="node.name"
      class="dst-crystal"
      type="button"
      :class="node.status"
      :style="{
        left: `${nodeSlots[index]?.x ?? 50}%`,
        top: `${nodeSlots[index]?.y ?? 50}%`,
        width: `${nodeSlots[index]?.size ?? 38}px`,
        height: `${nodeSlots[index]?.size ?? 38}px`,
        '--tone': toneForNode(node),
        '--delay': `${nodeSlots[index]?.delay ?? 0}s`,
      }"
      :title="node.name"
      @click="selectNode(node)"
    >
      <span class="dst-crystal-core" />
      <span class="dst-crystal-flare" />
    </button>

    <div class="dst-agent-tags" aria-hidden="true">
      <span class="dst-tag tag-profile">画像分析</span>
      <span class="dst-tag tag-eval">评估证据</span>
      <span class="dst-tag tag-path">路径重规划</span>
      <span class="dst-tag tag-resource">资源回写</span>
    </div>

    <div class="dst-chip" aria-hidden="true">
      <span class="dst-chip-core" />
      <span class="dst-chip-line line-a" />
      <span class="dst-chip-line line-b" />
      <span class="dst-chip-line line-c" />
      <span class="dst-chip-line line-d" />
    </div>
  </div>
</template>

<style scoped>
.dst-root {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 760px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 39%, rgba(71, 205, 255, 0.22), transparent 33%),
    radial-gradient(circle at 62% 46%, rgba(255, 82, 31, 0.2), transparent 22%),
    radial-gradient(ellipse at 50% 84%, rgba(255, 73, 28, 0.2), transparent 38%),
    linear-gradient(180deg, rgba(3, 7, 22, 0.9), rgba(6, 9, 24, 0.98));
}

.dst-root::before,
.dst-root::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dst-root::before {
  background:
    linear-gradient(rgba(64, 221, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 221, 255, 0.04) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(ellipse at 50% 48%, #000 0 55%, transparent 78%);
}

.dst-root::after {
  background:
    linear-gradient(90deg, rgba(1, 5, 18, 0.72), transparent 22%, transparent 76%, rgba(1, 5, 18, 0.76)),
    linear-gradient(180deg, rgba(255, 77, 30, 0.08), transparent 18%, rgba(1, 4, 16, 0.28));
}

.dst-header {
  position: absolute;
  left: 50%;
  top: 28px;
  z-index: 8;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  gap: 14px;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.92);
}

.dst-header strong {
  font-size: 20px;
  letter-spacing: 0.04em;
}

.dst-header span:last-child {
  color: #ffb45f;
  font-family: var(--font-mono);
  font-weight: 800;
}

.dst-kicker,
.dst-kpi span {
  color: rgba(139, 229, 255, 0.62);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.dst-kpi {
  position: absolute;
  z-index: 8;
  top: 108px;
  width: 118px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 79, 31, 0.25);
  background: rgba(7, 13, 32, 0.58);
  box-shadow: inset 0 0 20px rgba(255, 80, 31, 0.08), 0 0 22px rgba(0, 212, 255, 0.08);
}

.dst-kpi-left {
  left: 46px;
}

.dst-kpi-right {
  right: 46px;
}

.dst-kpi strong {
  display: block;
  margin-top: 4px;
  color: #fff3df;
  font-family: var(--font-mono);
  font-size: 27px;
}

.dst-kpi i {
  display: block;
  height: 2px;
  margin-top: 9px;
  background: linear-gradient(90deg, #ff4f1f, transparent);
}

.dst-branch-map {
  position: absolute;
  inset: 7% 3% 0;
  z-index: 3;
  width: 94%;
  height: 83%;
  overflow: visible;
  filter: drop-shadow(0 0 18px rgba(255, 76, 28, 0.28));
}

.dst-trunk-path,
.dst-branch-path {
  fill: none;
  stroke: url(#dstBranchGlow);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.84;
}

.dst-trunk-secondary {
  stroke-width: 5;
  opacity: 0.52;
}

.dst-branch-path {
  stroke-width: 5;
  opacity: 0.72;
}

.dst-hot-branch {
  stroke: #ff5425;
  stroke-width: 7;
  opacity: 0.9;
}

.dst-code-rain {
  position: absolute;
  left: 41%;
  top: 22%;
  z-index: 2;
  display: grid;
  gap: 18px;
  color: rgba(126, 232, 255, 0.22);
  font-family: var(--font-mono);
  font-size: 13px;
  writing-mode: vertical-rl;
  animation: codeDrift 8s linear infinite;
}

.dst-crystal {
  position: absolute;
  z-index: 6;
  display: block;
  transform: translate(-50%, -50%) rotate(45deg);
  border: 1px solid color-mix(in srgb, var(--tone), white 24%);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.74), transparent 34%),
    linear-gradient(315deg, color-mix(in srgb, var(--tone), transparent 18%), rgba(255, 255, 255, 0.06));
  clip-path: polygon(50% 0, 82% 18%, 100% 52%, 70% 100%, 26% 88%, 0 48%, 18% 14%);
  box-shadow:
    0 0 18px color-mix(in srgb, var(--tone), transparent 24%),
    inset 0 0 16px rgba(255, 255, 255, 0.22);
  cursor: pointer;
  animation: crystalFloat 3.8s ease-in-out var(--delay) infinite;
}

.dst-crystal.weak {
  box-shadow:
    0 0 30px rgba(255, 79, 31, 0.9),
    0 0 64px rgba(255, 35, 12, 0.28),
    inset 0 0 16px rgba(255, 255, 255, 0.22);
}

.dst-crystal:hover {
  z-index: 10;
  transform: translate(-50%, -50%) rotate(45deg) scale(1.16);
}

.dst-crystal-core,
.dst-crystal-flare {
  position: absolute;
  inset: 22%;
  background: color-mix(in srgb, var(--tone), white 18%);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  opacity: 0.55;
}

.dst-crystal-flare {
  inset: -24%;
  background: radial-gradient(circle, color-mix(in srgb, var(--tone), transparent 12%), transparent 58%);
  opacity: 0.42;
  animation: flarePulse 2.4s ease-in-out infinite;
}

.dst-agent-tags {
  position: absolute;
  inset: 0;
  z-index: 7;
  pointer-events: none;
}

.dst-tag {
  position: absolute;
  min-width: 68px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 96, 38, 0.54);
  background: linear-gradient(180deg, rgba(255, 75, 30, 0.28), rgba(65, 12, 16, 0.58));
  box-shadow: 0 0 18px rgba(255, 76, 30, 0.28);
  color: rgba(255, 232, 204, 0.92);
  font-size: 12px;
  text-align: center;
}

.dst-tag::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 100%;
  width: 1px;
  height: 58px;
  background: linear-gradient(transparent, rgba(255, 96, 38, 0.72));
}

.tag-profile {
  left: 29%;
  top: 47%;
}

.tag-eval {
  left: 43%;
  top: 37%;
}

.tag-path {
  right: 27%;
  top: 46%;
}

.tag-resource {
  right: 18%;
  top: 55%;
}

.dst-chip {
  position: absolute;
  left: 50%;
  bottom: 2%;
  z-index: 5;
  width: min(62vw, 760px);
  height: 230px;
  transform: translateX(-50%) perspective(760px) rotateX(62deg);
  border: 1px solid rgba(255, 79, 31, 0.35);
  background:
    linear-gradient(rgba(255, 79, 31, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 79, 31, 0.16) 1px, transparent 1px),
    radial-gradient(ellipse at 50% 48%, rgba(255, 76, 30, 0.28), rgba(4, 10, 24, 0.12) 56%, transparent 74%);
  background-size: 42px 42px, 42px 42px, auto;
  box-shadow: 0 0 44px rgba(255, 76, 30, 0.24), inset 0 0 38px rgba(255, 76, 30, 0.12);
}

.dst-chip-core {
  position: absolute;
  left: 50%;
  top: 42%;
  width: 210px;
  height: 76px;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 188, 98, 0.48);
  background: rgba(8, 12, 30, 0.68);
  box-shadow: 0 0 28px rgba(255, 82, 31, 0.28);
}

.dst-chip-line {
  position: absolute;
  left: 50%;
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.82), rgba(255, 89, 35, 0.92), transparent);
  box-shadow: 0 0 16px rgba(255, 80, 36, 0.42);
  animation: chipFlow 2.8s ease-in-out infinite;
}

.line-a { top: 34%; width: 76%; }
.line-b { top: 48%; width: 88%; animation-delay: 0.4s; }
.line-c { top: 62%; width: 62%; animation-delay: 0.8s; }
.line-d { top: 76%; width: 44%; animation-delay: 1.2s; }

@keyframes crystalFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -7px; }
}

@keyframes flarePulse {
  0%, 100% { opacity: 0.18; transform: scale(0.8); }
  50% { opacity: 0.55; transform: scale(1.15); }
}

@keyframes chipFlow {
  0%, 100% { opacity: 0.26; scale: 0.72 1; }
  50% { opacity: 1; scale: 1 1; }
}

@keyframes codeDrift {
  from { transform: translateY(-30px); }
  to { transform: translateY(80px); }
}

@media (max-width: 900px) {
  .dst-kpi {
    display: none;
  }

  .dst-header {
    grid-template-columns: 1fr;
    gap: 3px;
    text-align: center;
  }

  .dst-chip {
    width: 86vw;
  }
}
</style>
