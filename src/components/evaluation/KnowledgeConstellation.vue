<script setup lang="ts">
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const layers = {
  chapter: { name: '章节来源', short: 'CH', color: '#00d4ff' },
  concept: { name: '知识点', short: 'KP', color: '#06d6a0' },
  skill: { name: '微技能', short: 'SK', color: '#f59e0b' },
  evidence: { name: '证据触发', short: 'EV', color: '#f43f5e' },
  next: { name: '下一步', short: 'NX', color: '#7c3aed' },
} as const

type LayerKey = keyof typeof layers

interface StarNode {
  id: string
  layer: LayerKey
  label: string
  source: string
  x: number
  y: number
  mastery: number
  depth: number
  status: 'mastered' | 'stable' | 'learning' | 'weak' | 'next'
  evidence?: string
}

const nodes: StarNode[] = [
  { id: 'ch1', layer: 'chapter', label: '指针与内存模型', source: '第 3 章', x: 150, y: 165, mastery: 0.74, depth: 3, status: 'stable' },
  { id: 'ch2', layer: 'chapter', label: '图结构与搜索', source: '第 5 章', x: 150, y: 512, mastery: 0.48, depth: 2, status: 'learning' },
  { id: 'kp1', layer: 'concept', label: '栈帧与地址生命周期', source: '课件', x: 372, y: 132, mastery: 0.82, depth: 4, status: 'mastered' },
  { id: 'kp2', layer: 'concept', label: '二级指针传参', source: '测评', x: 438, y: 258, mastery: 0.41, depth: 2, status: 'weak', evidence: '错题 3 次' },
  { id: 'kp3', layer: 'concept', label: 'malloc/free 配对', source: '作业', x: 612, y: 185, mastery: 0.56, depth: 2, status: 'learning' },
  { id: 'sk1', layer: 'skill', label: '*p 与 p 的读写方向', source: '问答', x: 710, y: 300, mastery: 0.44, depth: 2, status: 'weak', evidence: '追问 2 次' },
  { id: 'sk2', layer: 'skill', label: '画出指针别名关系', source: '练习', x: 852, y: 214, mastery: 0.63, depth: 3, status: 'learning' },
  { id: 'kp4', layer: 'concept', label: '邻接表建图', source: '实验', x: 390, y: 500, mastery: 0.68, depth: 3, status: 'learning' },
  { id: 'kp5', layer: 'concept', label: 'BFS 队列推进', source: '测评', x: 585, y: 610, mastery: 0.46, depth: 2, status: 'weak', evidence: '测评 -22%' },
  { id: 'sk3', layer: 'skill', label: 'visited 标记时机', source: '错题', x: 760, y: 520, mastery: 0.38, depth: 1, status: 'weak', evidence: '同类错 4 题' },
  { id: 'sk4', layer: 'skill', label: 'DFS 回溯边界', source: '练习', x: 925, y: 630, mastery: 0.52, depth: 2, status: 'learning' },
  { id: 'ev1', layer: 'evidence', label: '错题聚类: 指针别名', source: '证据', x: 1030, y: 360, mastery: 0.34, depth: 1, status: 'weak' },
  { id: 'nx1', layer: 'next', label: '15 分钟图解补弱', source: '下一轮', x: 1100, y: 505, mastery: 0.2, depth: 1, status: 'next' },
]

const edges = [
  ['ch1', 'kp1'], ['ch1', 'kp2'], ['kp1', 'kp3'], ['kp2', 'sk1'], ['kp2', 'sk2'],
  ['kp3', 'sk2'], ['sk1', 'ev1'], ['ch2', 'kp4'], ['ch2', 'kp5'], ['kp4', 'kp5'],
  ['kp5', 'sk3'], ['kp5', 'sk4'], ['sk3', 'ev1'], ['ev1', 'nx1'], ['sk3', 'nx1'],
]

const sourceTags = [
  { label: '第 3 章', color: '#00d4ff' },
  { label: '第 5 章', color: '#00d4ff' },
  { label: '测评', color: '#f43f5e' },
  { label: '问答', color: '#f59e0b' },
  { label: '作业/实验', color: '#06d6a0' },
  { label: '下一轮', color: '#7c3aed' },
]

const backgroundStars = Array.from({ length: 88 }, (_, index) => {
  const x = (index * 151) % 1200
  const y = (index * 97 + 41) % 720
  return {
    x: x + 34,
    y: y + 28,
    r: 0.65 + (index % 4) * 0.28,
    opacity: 0.1 + (index % 6) * 0.05,
  }
})

const nodeById = Object.fromEntries(nodes.map(node => [node.id, node]))
const weakNodes = nodes.filter(node => node.status === 'weak')
const selectedNodeId = ref('kp2')

const selectedNode = computed(() => nodes.find(node => node.id === selectedNodeId.value) ?? weakNodes[0] ?? nodes[0])

function radius(node: StarNode) {
  return 5 + node.mastery * 7 + node.depth * 1.3
}

function opacity(mastery: number) {
  return 0.32 + mastery * 0.64
}

function statusText(status: StarNode['status']) {
  if (status === 'mastered') return '已掌握'
  if (status === 'stable') return '较稳定'
  if (status === 'learning') return '学习中'
  if (status === 'weak') return '需补强'
  return '下一步'
}
</script>

<template>
  <section class="constellation-shell" :class="{ compact }">
    <div class="constellation-head">
      <div>
        <span class="constellation-kicker">Course Depth Map</span>
        <h2>课程知识深度图</h2>
      </div>
      <div class="source-tags" aria-label="知识来源">
        <span v-for="tag in sourceTags" :key="tag.label" :style="{ '--tag-color': tag.color }">
          {{ tag.label }}
        </span>
      </div>
    </div>

    <div class="constellation-stage">
      <svg viewBox="0 0 1200 720" class="constellation-svg" aria-label="课程知识深度图">
        <defs>
          <filter id="course-star-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="course-star-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="48%" stop-color="#fff" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
        </defs>

        <circle
          v-for="star in backgroundStars"
          :key="`${star.x}-${star.y}`"
          :cx="star.x"
          :cy="star.y"
          :r="star.r"
          fill="#fff"
          :opacity="star.opacity"
        />

        <path class="depth-ribbon" d="M132 168 C330 110 410 260 610 190 C790 128 850 335 1030 360 C1095 370 1118 430 1100 505" />
        <path class="depth-ribbon secondary" d="M158 515 C360 430 470 625 585 610 C700 598 705 500 760 520 C830 550 875 610 925 630" />

        <line
          v-for="(edge, index) in edges"
          :key="index"
          :x1="nodeById[edge[0]].x"
          :y1="nodeById[edge[0]].y"
          :x2="nodeById[edge[1]].x"
          :y2="nodeById[edge[1]].y"
          :stroke="nodeById[edge[1]].status === 'weak' ? '#f43f5e' : layers[nodeById[edge[1]].layer].color"
          :stroke-opacity="nodeById[edge[1]].status === 'weak' ? 0.42 : 0.22"
          :stroke-width="nodeById[edge[1]].status === 'weak' ? 1.8 : 1.1"
          :stroke-dasharray="nodeById[edge[1]].layer === 'evidence' || nodeById[edge[1]].layer === 'next' ? '4 7' : undefined"
        />

        <g
          v-for="node in nodes"
          :key="node.id"
          class="star-node"
          :class="{ selected: selectedNode.id === node.id }"
          role="button"
          tabindex="0"
          @click="selectedNodeId = node.id"
          @keydown.enter="selectedNodeId = node.id"
        >
          <circle
            :cx="node.x"
            :cy="node.y"
            :r="radius(node) * 3"
            fill="url(#course-star-core)"
            :opacity="node.mastery * 0.32"
          />
          <circle
            :cx="node.x"
            :cy="node.y"
            :r="radius(node) * 1.75"
            :fill="node.status === 'weak' ? '#f43f5e' : layers[node.layer].color"
            :opacity="node.mastery * 0.25"
            filter="url(#course-star-glow)"
          />
          <circle
            :cx="node.x"
            :cy="node.y"
            :r="radius(node)"
            :fill="node.status === 'weak' ? '#f43f5e' : layers[node.layer].color"
            :opacity="opacity(node.mastery)"
            filter="url(#course-star-glow)"
          />
          <circle
            :cx="node.x"
            :cy="node.y"
            :r="Math.max(2, radius(node) * 0.42)"
            fill="#fff"
            :opacity="0.42 + node.mastery * 0.5"
          />
          <circle
            :cx="node.x"
            :cy="node.y"
            :r="radius(node) + node.depth * 4.2"
            fill="none"
            :stroke="node.status === 'weak' ? '#f43f5e' : layers[node.layer].color"
            :stroke-opacity="0.14 + node.depth * 0.06"
            stroke-width="1"
            :stroke-dasharray="node.depth < 3 ? '3 5' : undefined"
          />
          <circle
            v-if="node.status === 'weak' || node.status === 'next'"
            :cx="node.x"
            :cy="node.y"
            :r="radius(node) + 10"
            fill="none"
            :stroke="node.status === 'weak' ? '#f43f5e' : '#7c3aed'"
            stroke-width="1.6"
            class="pulse-ring"
          />
        </g>
      </svg>

      <div
        v-for="node in nodes"
        :key="node.id"
        class="node-label"
        :class="{ weak: node.status === 'weak' }"
        :style="{
          left: `${(node.x / 1200) * 100}%`,
          top: `${((node.y + radius(node) + 10) / 720) * 100}%`,
          opacity: 0.38 + node.mastery * 0.58,
        }"
      >
        <small>{{ node.source }}</small>
        {{ node.label }}
      </div>

      <aside class="focus-panel">
        <span class="focus-chip">{{ selectedNode.source }} · D{{ selectedNode.depth }}</span>
        <h3>{{ selectedNode.label }}</h3>
        <p>
          {{ selectedNode.status === 'weak'
            ? '该节点由错题或追问触发，已经进入补弱队列。建议先看图解，再做短题组验证。'
            : selectedNode.status === 'mastered'
              ? '该节点已稳定点亮，可以进入迁移练习或作为后续知识点的先修基础。'
              : selectedNode.status === 'next'
                ? '这是下一轮学习路径中的待启动任务，会在薄弱点修复后自动展开。'
                : '该节点处于学习中，系统会继续收集作业、测评和问答证据来更新掌握度。'
          }}
        </p>
        <div class="selected-meta">
          <span>掌握 {{ Math.round(selectedNode.mastery * 100) }}%</span>
          <span>{{ statusText(selectedNode.status) }}</span>
          <span>{{ selectedNode.evidence ?? '证据收集中' }}</span>
        </div>
        <div class="focus-list">
          <span v-for="node in weakNodes" :key="node.id">
            <i :style="{ background: '#f43f5e' }" />
            {{ node.source }} · {{ node.label }} · {{ statusText(node.status) }} · D{{ node.depth }}
          </span>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.constellation-shell {
  position: relative;
  max-width: 1320px;
  margin: 0 auto;
  padding: 28px 40px 58px;
}

.constellation-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 12px;
}

.constellation-kicker {
  color: rgba(126, 231, 255, 0.72);
  font-size: 11px;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.constellation-head h2 {
  margin: 4px 0 0;
  color: #fff;
  font-size: 28px;
  font-family: var(--font-display);
  font-weight: 400;
}

.source-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: 430px;
}

.source-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 3px 9px;
  border: 1px solid color-mix(in srgb, var(--tag-color) 34%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--tag-color) 12%, rgba(5, 7, 18, 0.72));
  color: color-mix(in srgb, var(--tag-color) 78%, #fff);
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
}

.constellation-stage {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  border: 1px solid rgba(0, 212, 255, 0.13);
  border-radius: 18px;
  background:
    radial-gradient(ellipse 780px 460px at 18% 10%, rgba(124, 58, 237, 0.18), transparent 58%),
    radial-gradient(ellipse 760px 460px at 92% 82%, rgba(0, 212, 255, 0.14), transparent 56%),
    rgba(7, 8, 18, 0.82);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.3);
}

.constellation-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.035) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(ellipse at center, #000 25%, transparent 82%);
  pointer-events: none;
}

.constellation-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.depth-ribbon {
  fill: none;
  stroke: rgba(0, 212, 255, 0.18);
  stroke-width: 18;
  stroke-linecap: round;
  filter: drop-shadow(0 0 18px rgba(0, 212, 255, 0.22));
}

.depth-ribbon.secondary {
  stroke: rgba(245, 158, 11, 0.14);
}

.pulse-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: constellationPulse 2.2s ease-out infinite;
}

.star-node {
  cursor: pointer;
}

.star-node > circle {
  transition: opacity 0.18s ease, stroke-width 0.18s ease, transform 0.18s ease;
  transform-box: fill-box;
  transform-origin: center;
}

.star-node:hover > circle,
.star-node.selected > circle {
  opacity: 1;
}

.star-node.selected > circle:nth-last-child(2) {
  stroke-width: 2.4;
}

.star-node.selected > circle:first-child {
  transform: scale(1.18);
}

@keyframes constellationPulse {
  0% { transform: scale(0.86); opacity: 1; }
  100% { transform: scale(2.15); opacity: 0; }
}

.node-label,
.focus-panel {
  position: absolute;
  z-index: 2;
}

.node-label {
  transform: translateX(-50%);
  max-width: 170px;
  color: rgba(232, 237, 245, 0.9);
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.82);
  pointer-events: none;
}

.node-label small {
  display: inline-flex;
  margin-right: 4px;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.52);
  font-size: 9px;
}

.node-label.weak {
  color: rgba(255, 190, 204, 0.96);
}

.focus-panel {
  right: 30px;
  bottom: 30px;
  width: min(386px, calc(100% - 60px));
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(9, 10, 24, 0.76);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.36);
}

.focus-chip {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.12);
  border: 1px solid rgba(244, 63, 94, 0.26);
  font-size: 11px;
}

.focus-panel h3 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
}

.focus-panel p {
  margin: 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  line-height: 1.7;
}

.focus-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.selected-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 14px;
}

.selected-meta span {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.66);
  font-size: 11px;
}

.focus-list span {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.focus-list i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 12px #f43f5e;
}

.constellation-shell.compact {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}

.constellation-shell.compact .constellation-head {
  margin-bottom: 9px;
}

.constellation-shell.compact .constellation-kicker {
  font-size: 9px;
  letter-spacing: 0.08em;
}

.constellation-shell.compact .constellation-head h2 {
  font-size: 18px;
}

.constellation-shell.compact .source-tags {
  max-width: 206px;
  gap: 4px;
}

.constellation-shell.compact .source-tags span {
  min-height: 18px;
  padding: 2px 7px;
  font-size: 9px;
}

.constellation-shell.compact .constellation-stage {
  min-height: 338px;
  border-radius: 14px;
  background:
    radial-gradient(ellipse 460px 260px at 14% 12%, rgba(124, 58, 237, 0.2), transparent 58%),
    radial-gradient(ellipse 420px 260px at 92% 82%, rgba(0, 212, 255, 0.15), transparent 56%),
    rgba(7, 8, 18, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 44px rgba(0, 0, 0, 0.25);
}

.constellation-shell.compact .node-label {
  display: none;
}

.constellation-shell.compact .focus-panel {
  left: 14px;
  right: 14px;
  bottom: 14px;
  width: auto;
  padding: 14px;
  border-radius: 12px;
}

.constellation-shell.compact .focus-chip {
  margin-bottom: 8px;
  padding: 3px 8px;
  font-size: 10px;
}

.constellation-shell.compact .focus-panel h3 {
  margin-bottom: 4px;
  font-size: 16px;
}

.constellation-shell.compact .focus-panel p {
  font-size: 11px;
  line-height: 1.55;
}

.constellation-shell.compact .focus-list {
  gap: 5px;
  margin-top: 10px;
}

.constellation-shell.compact .focus-list span {
  font-size: 10px;
}

@media (max-width: 900px) {
  .constellation-shell {
    padding: 24px 20px 44px;
  }

  .constellation-head {
    flex-direction: column;
  }

  .source-tags {
    justify-content: flex-start;
  }

  .constellation-stage {
    min-height: 560px;
  }
}

@media (max-width: 640px) {
  .source-tags {
    max-width: none;
  }

  .node-label {
    display: none;
  }

  .focus-panel {
    left: 18px;
    right: 18px;
    bottom: 18px;
    width: auto;
  }
}
</style>
