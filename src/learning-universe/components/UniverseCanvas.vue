<template>
  <div ref="container" class="universe-canvas" :style="{ '--header-offset': headerOffset + 'px' }">
    <canvas ref="canvasRef" />
    <div class="scene-bloom" aria-hidden="true" />
    <div class="scene-noise" aria-hidden="true" />

    <Transition name="hud-fade">
      <div v-if="sceneReady" class="hud-layer">
        <div class="hud-safe-area">
          <KnowledgeCard />
          <div class="controls-hint glass-light">
            <div class="controls-hint-label">Navigation</div>
            <div class="controls-hint-text">
              拖拽旋转 · 滚轮缩放 · 点击星体查看详情 · 双击回到全景
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="hud-fade">
      <div v-if="!sceneReady" class="loading-overlay">
        <div class="loading-content glass-card">
          <div v-if="loadError" class="error-box glass-light">
            <div class="error-title">场景初始化失败</div>
            <div class="error-desc">{{ loadError }}</div>
            <button class="retry-btn glass" @click="reload">重新加载</button>
          </div>
          <template v-else>
            <div class="loading-kicker">Entering Deep Space</div>
            <div class="loading-spinner" />
            <div class="loading-text">{{ loadingMsg }}</div>
            <div class="loading-progress-bar glass-light">
              <div class="loading-progress-fill" :style="{ width: `${loadingProgress}%` }" />
            </div>
            <div class="loading-percent">{{ loadingProgress }}%</div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, withDefaults } from 'vue'
import * as THREE from 'three'
import { useScene, type SceneState } from '../composables/useScene'
import { useCamera } from '../composables/useCamera'
import { useInteraction } from '../composables/useInteraction'
import { useUniverseEvents } from '../composables/useUniverseEvents'
import { useUniverseStore } from '../stores/universe'
import { useAgentStore } from '../stores/agent'
import { GalaxyClusterNode } from '../three/GalaxyCluster'
import { Nebula } from '../three/Nebula'
import { ObsidianGraph } from '../three/ObsidianGraph'
import { galaxies, knowledgeNodes, categoryColors } from '../data/knowledge-graph'

const props = withDefaults(defineProps<{
  headerOffset?: number
}>(), {
  headerOffset: 60,
})

const legendCategories = [
  { id: 'sys_prog_basics', name: '编程与算法基础', nameEn: 'Programming', color: categoryColors.sys_prog_basics },
  { id: 'sys_computer', name: '计算机系统', nameEn: 'Systems', color: categoryColors.sys_computer },
  { id: 'sys_software', name: '软件工程', nameEn: 'Engineering', color: categoryColors.sys_software },
  { id: 'sys_ai', name: '人工智能方向', nameEn: 'AI', color: categoryColors.sys_ai },
  { id: 'sys_frontier', name: '前沿与应用', nameEn: 'Frontier', color: categoryColors.sys_frontier },
]

import KnowledgeCard from './panels/KnowledgeCard.vue'

const canvasRef = ref<HTMLCanvasElement>()
const sceneReady = ref(false)
const loadingMsg = ref('正在校准星图坐标...')
const loadingProgress = ref(0)
const loadError = ref<string | null>(null)

const universe = useUniverseStore()
const agentStore = useAgentStore()
const { init, dispose } = useScene()
const cameraCtrl = useCamera()
const interaction = useInteraction()

let s: SceneState | null = null
let galaxyClusters: GalaxyClusterNode[] = []
let nebulae: Nebula[] = []
let obsidianGraph: ObsidianGraph | null = null
let prevHoveredNode: string | null = null
const keys = { w: false, a: false, s: false, d: false }

const events = useUniverseEvents(
  () => s,
  () => galaxyClusters,
  cameraCtrl,
  interaction,
  universe,
  agentStore,
  () => {},
  () => {},
  keys,
)

function nextTick(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 50))
}

function reload() {
  window.location.reload()
}

function createUniverse() {
  if (!s) return

  galaxyClusters = galaxies.map(g => new GalaxyClusterNode(g))
  galaxyClusters.forEach(gc => s!.stars.add(gc.group))

  nebulae = galaxies.map(g => {
    const pos = new THREE.Vector3(g.position[0], g.position[1], g.position[2])
    return new Nebula(pos, new THREE.Color(g.color), 400, 25)
  })
  nebulae.forEach(n => s!.ambientGroup.add(n.mesh))

  obsidianGraph = new ObsidianGraph()
  obsidianGraph.build(knowledgeNodes)
  s.scene.add(obsidianGraph.group)
}

onMounted(async () => {
  try {
    if (!canvasRef.value) {
      loadError.value = 'Canvas 元素未找到'
      return
    }

    loadingMsg.value = '正在构建 Three.js 深空场景...'
    loadingProgress.value = 10
    s = init(canvasRef.value)

    loadingMsg.value = '正在初始化星际镜头...'
    loadingProgress.value = 25
    cameraCtrl.init(s)

    loadingMsg.value = '正在生成银河知识网络...'
    loadingProgress.value = 40
    await nextTick()
    createUniverse()

    loadingMsg.value = '正在部署 AI 导航建议...'
    loadingProgress.value = 65
    await nextTick()
    agentStore.refreshRecommendation()

    loadingMsg.value = '正在点亮星际粒子与光流...'
    loadingProgress.value = 85
    await nextTick()

    loadingProgress.value = 100
    sceneReady.value = true
    animate()
    events.register()
  } catch (e: any) {
    console.error('Universe init error:', e)
    loadError.value = `初始化失败：${e.message || String(e)}`
  }
})

function animate() {
  if (!s) return
  requestAnimationFrame(animate)

  const time = s.timer.getElapsed()

  if (!cameraCtrl.isDragging.value && !cameraCtrl.isAnimating.value) {
    cameraCtrl.applyInertia(s)
    cameraCtrl.startAutoRotate(s)
  }

  if (keys.w) cameraCtrl.pan(s, 0, -4)
  if (keys.s) cameraCtrl.pan(s, 0, 4)
  if (keys.a) cameraCtrl.pan(s, -4, 0)
  if (keys.d) cameraCtrl.pan(s, 4, 0)

  s.bgStarfield.rotation.y += 0.00006
  s.bgStarfield.rotation.x += 0.00002
  s.bgGalaxies.rotation.y += 0.00003

  for (const gc of galaxyClusters) gc.update(time)
  for (const nebula of nebulae) nebula.update(time)
  if (obsidianGraph) obsidianGraph.update(time)

  const currentHover = universe.hoveredNodeId
  if (currentHover !== prevHoveredNode) {
    prevHoveredNode = currentHover
    obsidianGraph?.onNodeHover(currentHover)
  }

  cameraCtrl.updateZoomLevel(s)
  universe.setZoomLevel(cameraCtrl.zoomLevel.value)
  s.composer.render()
}

onUnmounted(() => {
  events.unregister()
  for (const gc of galaxyClusters) gc.dispose()
  if (obsidianGraph) {
    obsidianGraph.dispose()
    if (s) s.scene.remove(obsidianGraph.group)
    obsidianGraph = null
  }
  dispose(s)
})
</script>

<style scoped>
.universe-canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.universe-canvas canvas {
  display: block;
  position: relative;
  z-index: 1;
}

.scene-bloom,
.scene-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.scene-bloom {
  background:
    radial-gradient(circle at 52% 31%, rgba(255, 220, 158, 0.12), transparent 11%),
    radial-gradient(circle at 51% 34%, rgba(115, 159, 255, 0.08), transparent 21%),
    radial-gradient(circle at 50% 58%, rgba(75, 221, 255, 0.06), transparent 30%);
  filter: blur(14px);
}

.scene-noise {
  opacity: 0.18;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0.8px, transparent 0.8px);
  background-size: 14px 14px;
  mix-blend-mode: soft-light;
  mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.25), transparent 72%);
}

.hud-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.hud-safe-area {
  position: absolute;
  top: var(--header-offset, 0px);
  left: 0;
  right: 0;
  bottom: 0;
}

.hud-layer > *,
.hud-safe-area > * {
  pointer-events: auto;
}

.scene-hero {
  position: absolute;
  top: 142px;
  right: 20px;
  width: 320px;
  padding: 18px 20px;
  z-index: 10;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at 50% 38%, rgba(106, 141, 255, 0.18), transparent 24%),
    linear-gradient(180deg, rgba(2, 4, 12, 0.9), rgba(2, 3, 9, 0.96));
  z-index: 200;
}

.loading-content {
  width: min(480px, 92vw);
  padding: 28px;
  text-align: center;
}

.loading-kicker {
  margin-bottom: 18px;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(151, 176, 255, 0.58);
}

.loading-spinner {
  width: 64px;
  height: 64px;
  margin: 0 auto 22px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-top-color: #7a97ff;
  border-right-color: rgba(255, 194, 112, 0.72);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 42px rgba(108, 141, 255, 0.18);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-progress-bar {
  width: 100%;
  height: 8px;
  overflow: hidden;
  margin: 0 auto;
}

.loading-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #78a3ff, #74ebff 45%, #ffc07c 100%);
  border-radius: 999px;
  transition: width 0.4s ease;
  box-shadow: 0 0 18px rgba(108, 141, 255, 0.45);
}

.loading-percent {
  margin-top: 12px;
  text-align: center;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.error-title {
  color: #f87171;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.error-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  line-height: 1.5;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
}

.legend-panel {
  position: absolute;
  right: 20px;
  top: 240px;
  padding: 18px 18px 16px;
  z-index: 10;
  width: 320px;
}

.legend-title {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.92);
}

.legend-subtitle {
  margin-top: 6px;
  font-size: 0.75rem;
  line-height: 1.6;
  color: rgba(225, 231, 255, 0.54);
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.legend-dot {
  --dot-color: #7a97ff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  background: var(--dot-color);
  box-shadow: 0 0 20px var(--dot-color);
}

.legend-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.legend-label {
  font-size: 0.78rem;
  color: rgba(248, 250, 255, 0.86);
  white-space: nowrap;
}

.legend-value {
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(167, 184, 255, 0.5);
}

.controls-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 18px;
  min-width: min(90vw, 440px);
  text-align: center;
}

.controls-hint-label {
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(145, 170, 255, 0.58);
}

.controls-hint-text {
  margin-top: 4px;
  font-size: 0.75rem;
  color: rgba(239, 244, 255, 0.7);
}

.hud-fade-enter-active,
.hud-fade-leave-active {
  transition: opacity 0.6s ease;
}

.hud-fade-enter-from,
.hud-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1280px) {
  .legend-panel,
  .scene-hero {
    width: 280px;
  }
}

@media (max-width: 900px) {
  .scene-hero,
  .legend-panel {
    right: 12px;
  }

  .scene-hero {
    top: 146px;
    width: 240px;
    padding: 14px 16px;
  }

  .legend-panel {
    top: auto;
    bottom: 164px;
    width: 240px;
    padding: 14px;
  }
}

@media (max-width: 768px) {
  .scene-bloom {
    opacity: 0.72;
  }

  .scene-noise {
    opacity: 0.1;
  }

  .scene-hero {
    top: 142px;
    left: 12px;
    right: 12px;
    width: auto;
  }

  .legend-panel {
    display: none;
  }

  .controls-hint {
    bottom: 14px;
    min-width: 0;
    width: calc(100vw - 24px);
  }

  .loading-content {
    padding: 22px;
  }
}
</style>

<!-- unscoped: glass utilities used by v7 child components -->
<style>
.glass {
  background: linear-gradient(155deg, rgba(10, 17, 42, 0.78), rgba(5, 10, 24, 0.52));
  border: 1px solid rgba(196, 212, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(26px) saturate(148%);
  -webkit-backdrop-filter: blur(26px) saturate(148%);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.38);
}

.glass-deep {
  background:
    linear-gradient(155deg, rgba(8, 13, 34, 0.88), rgba(4, 8, 18, 0.7)),
    radial-gradient(circle at top, rgba(124, 151, 255, 0.12), transparent 42%);
  border: 1px solid rgba(162, 187, 255, 0.14);
  border-radius: 24px;
  backdrop-filter: blur(30px) saturate(150%);
  -webkit-backdrop-filter: blur(30px) saturate(150%);
  box-shadow: 0 24px 100px rgba(0, 0, 0, 0.42);
}

.glass-light {
  background: linear-gradient(160deg, rgba(15, 24, 54, 0.62), rgba(9, 14, 30, 0.45));
  border: 1px solid rgba(196, 212, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(18px) saturate(145%);
  -webkit-backdrop-filter: blur(18px) saturate(145%);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
}

.glass-card {
  background:
    linear-gradient(155deg, rgba(9, 16, 38, 0.82), rgba(6, 10, 23, 0.66)),
    radial-gradient(circle at top right, rgba(255, 195, 114, 0.08), transparent 30%);
  border: 1px solid rgba(188, 208, 255, 0.12);
  border-radius: 24px;
  backdrop-filter: blur(30px) saturate(155%);
  -webkit-backdrop-filter: blur(30px) saturate(155%);
  box-shadow: 0 22px 72px rgba(0, 0, 0, 0.35);
}

.glass::before,
.glass-deep::before,
.glass-light::before,
.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), transparent 34%);
  pointer-events: none;
}

.panel-kicker {
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(143, 170, 255, 0.66);
}

.panel-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.92);
  letter-spacing: 0.03em;
}

.panel-caption {
  font-size: 0.76rem;
  line-height: 1.6;
  color: rgba(226, 232, 255, 0.58);
}

.hud-text {
  color: rgba(248, 250, 255, 0.95);
  text-shadow: 0 0 28px rgba(112, 154, 255, 0.2);
}

.loading-text {
  font-size: 1.18rem;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  color: rgba(248, 250, 255, 0.95);
  text-shadow: 0 0 28px rgba(112, 154, 255, 0.2);
}

.loading-percent {
  margin-top: 12px;
  text-align: center;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.text-red-300 { color: #f87171; }
.font-bold { font-weight: 700; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.text-white\/60 { color: rgba(255, 255, 255, 0.6); }
.text-white\/80 { color: rgba(255, 255, 255, 0.8); }
.text-white\/40 { color: rgba(255, 255, 255, 0.4); }
.mb-2 { margin-bottom: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.leading-6 { line-height: 1.5rem; }
</style>
