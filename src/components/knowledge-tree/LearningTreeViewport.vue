<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EvaluationStage, ProfileMetric, WeaknessNode } from '@/types/evaluation-dashboard'

interface LearningTreeViewportProps {
  stage: EvaluationStage
  profile: ProfileMetric[]
  weaknesses: WeaknessNode[]
  activeWeaknessId?: string
}

const props = defineProps<LearningTreeViewportProps>()
const emit = defineEmits<{ weaknessClick: [id: string] }>()

const hoveredWeaknessId = ref<string | null>(null)

const averageProfile = computed(() => {
  if (!props.profile.length) return 0
  return Math.round(props.profile.reduce((sum, item) => sum + item.value, 0) / props.profile.length)
})

const canopyScale = computed(() => [0.9, 1.03, 1.15][props.stage])
const leafOpacity = computed(() => [0.58, 0.76, 0.92][props.stage])
const visibleWeaknesses = computed(() => props.stage === 2 ? props.weaknesses.slice(0, 1) : props.weaknesses)
const fruits = computed(() => props.stage === 2 ? [
  { x: 258, y: 134 }, { x: 370, y: 160 }, { x: 305, y: 228 }, { x: 438, y: 245 },
] : [])
const recommendationNodes = computed(() => props.stage === 0 ? [] : [
  { x: 434, y: 174, label: '参数传递补救' },
  { x: 210, y: 252, label: 'BFS 队列快照' },
  ...(props.stage === 2 ? [{ x: 486, y: 318, label: '迁移任务' }] : []),
])

const weaknessPositions = [
  { x: 438, y: 286 },
  { x: 202, y: 208 },
  { x: 333, y: 113 },
]

const tooltipText = computed(() => {
  const id = hoveredWeaknessId.value
  return props.weaknesses.find(item => item.id === id)?.reason ?? ''
})
</script>

<template>
  <section class="tree-viewport" :class="`stage-${stage}`">
    <div class="tree-header">
      <div>
        <p>Knowledge Tree</p>
        <h3>画像驱动的知识树生长</h3>
      </div>
      <div class="score-orb">
        <strong>{{ averageProfile }}</strong>
        <span>综合掌握</span>
      </div>
    </div>

    <div class="model-reserve">3D 模型预留：public/models/knowledge_tree.glb · 当前使用稳定 SVG fallback</div>

    <svg class="tree-svg" viewBox="0 0 640 560" role="img" aria-label="学习知识树，展示掌握节点、薄弱节点和推荐路径">
      <defs>
        <radialGradient id="canopyGradient" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#16f2c2" stop-opacity="0.9" />
          <stop offset="55%" stop-color="#0b8fff" stop-opacity="0.46" />
          <stop offset="100%" stop-color="#15335f" stop-opacity="0.08" />
        </radialGradient>
        <linearGradient id="trunkGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#36e8ca" stop-opacity="0.62" />
          <stop offset="0.44" stop-color="#1b5f88" stop-opacity="0.8" />
          <stop offset="1" stop-color="#233150" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="goldFlow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#ffe58f" stop-opacity="0" />
          <stop offset="0.45" stop-color="#ffe58f" stop-opacity="0.95" />
          <stop offset="1" stop-color="#00d4ff" stop-opacity="0" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      <g class="roots" :class="{ deep: stage === 2 }">
        <path d="M316 420 C270 450 230 484 166 500" />
        <path d="M324 420 C370 452 428 478 506 496" />
        <path d="M320 428 C312 468 300 500 266 534" />
        <path d="M320 428 C342 466 364 500 408 532" />
      </g>

      <g class="trunk">
        <path d="M314 432 C304 360 322 310 306 252 C294 204 314 170 334 120" />
        <path d="M320 320 C260 292 222 250 178 196" />
        <path d="M322 286 C380 254 420 216 472 150" />
        <path d="M314 250 C360 232 402 250 454 302" />
        <path d="M310 225 C270 200 242 160 226 112" />
      </g>

      <g v-if="stage > 0" class="flow-lines" filter="url(#glow)">
        <path d="M316 426 C314 340 320 260 334 122" />
        <path d="M321 318 C370 274 420 218 472 150" />
        <path v-if="stage === 2" d="M318 310 C370 324 428 322 500 316" />
      </g>

      <g class="canopy" :style="{ transform: `scale(${canopyScale})`, opacity: leafOpacity }">
        <circle cx="320" cy="178" r="118" />
        <circle cx="230" cy="214" r="86" />
        <circle cx="420" cy="222" r="96" />
        <circle cx="292" cy="105" r="72" />
        <circle cx="386" cy="122" r="70" />
        <circle v-if="stage >= 1" cx="500" cy="286" r="70" />
        <circle v-if="stage === 2" cx="178" cy="304" r="66" />
      </g>

      <g class="mastery-nodes">
        <circle v-for="metric in profile" :key="metric.key" :cx="140 + metric.value * 4.4" :cy="98 + (metric.value % 5) * 42" :r="5 + metric.value / 18" />
      </g>

      <g class="recommendations">
        <g v-for="node in recommendationNodes" :key="node.label" class="recommendation-node">
          <circle :cx="node.x" :cy="node.y" r="9" />
          <text :x="node.x + 14" :y="node.y + 4">{{ node.label }}</text>
        </g>
      </g>

      <g class="fruits">
        <circle v-for="fruit in fruits" :key="`${fruit.x}-${fruit.y}`" :cx="fruit.x" :cy="fruit.y" r="10" />
      </g>

      <g class="weaknesses">
        <g
          v-for="(item, index) in visibleWeaknesses"
          :key="item.id"
          class="weakness-node"
          :class="[item.severity, { active: activeWeaknessId === item.id }]"
          tabindex="0"
          @click="emit('weaknessClick', item.id)"
          @keyup.enter="emit('weaknessClick', item.id)"
          @mouseenter="hoveredWeaknessId = item.id"
          @mouseleave="hoveredWeaknessId = null"
        >
          <circle :cx="weaknessPositions[index]?.x ?? 320" :cy="weaknessPositions[index]?.y ?? 180" r="13" />
          <circle class="inner" :cx="weaknessPositions[index]?.x ?? 320" :cy="weaknessPositions[index]?.y ?? 180" r="5" />
          <text :x="(weaknessPositions[index]?.x ?? 320) + 16" :y="(weaknessPositions[index]?.y ?? 180) + 4">{{ item.label }}</text>
        </g>
      </g>
    </svg>

    <div v-if="hoveredWeaknessId" class="tree-tooltip">{{ tooltipText }}</div>

    <div class="legend">
      <span><i class="healthy" />已掌握</span>
      <span><i class="weak" />薄弱点</span>
      <span><i class="next" />下一步推荐</span>
      <span><i class="flow" />能力提升路径</span>
      <span><i class="fruit" />深度评估成果</span>
    </div>
  </section>
</template>

<style scoped>
.tree-viewport { position: relative; min-height: 720px; overflow: hidden; border-radius: 30px; border: 1px solid rgba(0, 212, 255, .16); background: radial-gradient(circle at 50% 28%, rgba(0, 212, 255, .18), transparent 34%), radial-gradient(circle at 72% 68%, rgba(124, 58, 237, .16), transparent 32%), linear-gradient(160deg, rgba(5, 9, 24, .92), rgba(9, 14, 35, .74)); box-shadow: 0 28px 90px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08); backdrop-filter: blur(20px); }
.tree-header { position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 20px; padding: 24px 26px 0; }
.tree-header p { margin: 0 0 4px; color: #00d4ff; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
.tree-header h3 { margin: 0; color: #fff; font-family: var(--font-display); font-size: 24px; font-weight: 400; }
.score-orb { width: 88px; height: 88px; display: grid; place-items: center; align-content: center; border-radius: 50%; border: 1px solid rgba(0,212,255,.28); background: radial-gradient(circle, rgba(0,212,255,.18), rgba(124,58,237,.08)); box-shadow: 0 0 35px rgba(0,212,255,.15); }
.score-orb strong { color: #fff; font-size: 28px; font-family: var(--font-display); line-height: 1; }
.score-orb span { color: rgba(232,237,245,.62); font-size: 11px; }
.model-reserve { position: relative; z-index: 2; display: inline-flex; margin: 14px 26px 0; color: rgba(232,237,245,.48); font-size: 11px; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; padding: 5px 10px; background: rgba(255,255,255,.035); }
.tree-svg { position: absolute; inset: 96px 0 40px; width: 100%; height: calc(100% - 136px); }
.canopy { transform-box: fill-box; transform-origin: center; transition: transform .8s cubic-bezier(.2,.8,.2,1), opacity .8s ease; }
.canopy circle { fill: url(#canopyGradient); filter: drop-shadow(0 0 20px rgba(0,212,255,.2)); }
.trunk path { fill: none; stroke: url(#trunkGradient); stroke-width: 20; stroke-linecap: round; stroke-linejoin: round; }
.trunk path:not(:first-child) { stroke-width: 12; }
.roots path { fill: none; stroke: rgba(0,212,255,.24); stroke-width: 4; stroke-linecap: round; opacity: .72; }
.roots.deep path { stroke: rgba(6,214,160,.52); stroke-width: 6; filter: drop-shadow(0 0 10px rgba(6,214,160,.25)); }
.flow-lines path { fill: none; stroke: url(#goldFlow); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 72 220; animation: flow 2.1s linear infinite; }
.mastery-nodes circle { fill: #15e6b3; opacity: .72; filter: drop-shadow(0 0 10px rgba(21,230,179,.52)); }
.recommendation-node circle { fill: #ffe58f; opacity: .88; filter: drop-shadow(0 0 18px rgba(255,229,143,.72)); animation: node-pulse 1.8s ease infinite; }
.recommendation-node text { fill: rgba(255,229,143,.82); font-size: 12px; }
.fruits circle { fill: #ff7aa7; filter: drop-shadow(0 0 16px rgba(255,122,167,.62)); animation: fruit-pop .72s ease both; }
.weakness-node { cursor: pointer; outline: none; }
.weakness-node circle:first-child { fill: rgba(244,63,94,.52); stroke: rgba(255,122,167,.9); stroke-width: 2; filter: drop-shadow(0 0 16px rgba(244,63,94,.58)); }
.weakness-node .inner { fill: #ffd1df; }
.weakness-node text { fill: rgba(255,209,223,.9); font-size: 12px; paint-order: stroke; stroke: rgba(5,9,24,.88); stroke-width: 3px; }
.weakness-node.active circle:first-child { fill: rgba(255,107,154,.85); stroke: #fff; animation: weak-active 1.1s ease infinite; }
.tree-tooltip { position: absolute; right: 24px; bottom: 78px; max-width: 300px; color: rgba(247,251,255,.9); font-size: 12px; line-height: 1.6; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,122,167,.28); background: rgba(16, 13, 32, .88); box-shadow: 0 16px 34px rgba(0,0,0,.28); }
.legend { position: absolute; left: 24px; right: 24px; bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px 16px; color: rgba(232,237,245,.62); font-size: 12px; }
.legend span { display: inline-flex; align-items: center; gap: 7px; }
.legend i { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.legend .healthy { background: #15e6b3; box-shadow: 0 0 10px rgba(21,230,179,.6); }
.legend .weak { background: #ff6b9a; box-shadow: 0 0 10px rgba(255,107,154,.6); }
.legend .next { background: #ffe58f; box-shadow: 0 0 10px rgba(255,229,143,.55); }
.legend .flow { width: 22px; border-radius: 999px; background: linear-gradient(90deg, #ffe58f, #00d4ff); }
.legend .fruit { background: #ff7aa7; }
@keyframes flow { to { stroke-dashoffset: -292; } }
@keyframes node-pulse { 0%,100% { opacity: .56; transform: scale(1); transform-box: fill-box; transform-origin: center; } 50% { opacity: 1; transform: scale(1.22); } }
@keyframes weak-active { 50% { filter: drop-shadow(0 0 26px rgba(255,107,154,.95)); } }
@keyframes fruit-pop { from { transform: scale(0); transform-box: fill-box; transform-origin: center; opacity: 0; } to { transform: scale(1); opacity: 1; } }
@media (max-width: 760px) { .tree-viewport { min-height: 560px; } .tree-svg { inset-top: 118px; } .score-orb { width: 72px; height: 72px; } .legend { position: static; padding: 0 20px 20px; } }
</style>
