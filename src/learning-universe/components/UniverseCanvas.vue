<template>
  <div ref="container" class="universe-canvas" :style="{ '--header-offset': headerOffset + 'px' }">
    <canvas ref="canvasRef" />
    <div class="scene-bloom" aria-hidden="true" />
    <div class="scene-noise" aria-hidden="true" />

    <Transition name="hud-fade">
      <div v-if="sceneReady" class="hud-layer">
        <div class="hud-safe-area">

          <!-- ════════ Mission Control Top Bar ════════ -->
          <header class="mission-bar glass-deep">
            <div class="mission-left">
              <div class="mission-brand">
                <div class="mission-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div class="mission-copy">
                  <span class="mission-kicker">Deep Space Navigation</span>
                  <span class="mission-title">学习路径规划</span>
                </div>
              </div>
              <div class="mission-sep" />
              <div class="mission-stat">
                <span class="mission-stat-label">知识节点</span>
                <span class="mission-stat-value">{{ totalCount }}</span>
              </div>
              <div class="mission-stat">
                <span class="mission-stat-label">已掌握</span>
                <span class="mission-stat-value mastered">{{ masteredCount }}</span>
              </div>
              <div class="mission-stat">
                <span class="mission-stat-label">完成度</span>
                <span class="mission-stat-value">{{ Math.round(overallProgress * 100) }}%</span>
              </div>
            </div>

            <div class="mission-right">
              <div class="mission-progress">
                <div class="mission-progress-track">
                  <div class="mission-progress-fill" :style="{ width: `${Math.round(overallProgress * 100)}%` }" />
                  <div
                    v-for="gp in galaxyProgress"
                    :key="gp.galaxy.id"
                    class="mission-progress-marker"
                    :style="{ left: `${Math.round(gp.progress * 100)}%`, '--m-clr': gp.galaxy.color }"
                    :title="`${gp.galaxy.name}: ${gp.mastered}/${gp.total}`"
                  />
                </div>
              </div>

              <!-- Panel Toggles -->
              <div class="panel-toggles">
                <button
                  class="toggle-btn"
                  :class="{ active: showGoalSetting }"
                  @click="showGoalSetting = !showGoalSetting; showVoyageLog = false; showAchievements = false"
                  title="设定学习目标"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: showVoyageLog }"
                  @click="showVoyageLog = !showVoyageLog; showGoalSetting = false; showAchievements = false"
                  title="航行日志"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: showAchievements }"
                  @click="showAchievements = !showAchievements; showGoalSetting = false; showVoyageLog = false"
                  title="星座成就"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="8" r="6" /><path d="M12 14v8M8 20h8" />
                  </svg>
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: showHeatmap }"
                  @click="showHeatmap = !showHeatmap"
                  title="学习热力图"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </button>
                <button
                  class="toggle-btn"
                  @click="showPathCompare = true"
                  title="路径对比"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </button>
              </div>

              <button class="mission-overview-btn glass-light" @click="resetCamera">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
                </svg>
                宇宙总览
              </button>
            </div>
          </header>

          <!-- ════════ Search Bar ════════ -->
          <SearchBar
            v-if="s"
            :scene-state="s"
            :galaxy-clusters="galaxyClusters"
            :camera-ctrl="cameraCtrl"
            @fly-to="onFlyTo"
          />

          <!-- ════════ Right: Category Star Map ════════ -->
          <aside class="star-map-panel">
            <div class="star-map-header">
              <span class="star-map-kicker">Star Sectors</span>
              <span class="star-map-title">五大星域</span>
            </div>
            <div class="star-map-body">
              <div
                v-for="gp in galaxyProgress"
                :key="gp.galaxy.id"
                class="sector-row"
                :class="{ active: universe.activeSystemFilter === gp.galaxy.id }"
                @click="flyToSystem(gp.galaxy.id)"
              >
                <div class="sector-dot" :style="{ '--s-clr': gp.galaxy.color }" />
                <div class="sector-info">
                  <div class="sector-top">
                    <span class="sector-name">{{ gp.galaxy.name }}</span>
                    <span class="sector-pct">{{ Math.round(gp.progress * 100) }}%</span>
                  </div>
                  <div class="sector-track">
                    <div class="sector-fill" :style="{ width: `${Math.round(gp.progress * 100)}%`, background: gp.galaxy.color }" />
                  </div>
                  <div class="sector-meta">
                    <span>{{ gp.mastered }}/{{ gp.total }} 掌握</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="star-map-footer">
              <div class="legend-tip">
                <span class="legend-dot" style="--l-clr: #82a8ff" />
                知识
              </div>
              <div class="legend-tip">
                <span class="legend-dot" style="--l-clr: #73f0d0" />
                项目
              </div>
              <div class="legend-tip">
                <span class="legend-dot" style="--l-clr: #ffae6b" />
                练习
              </div>
            </div>
          </aside>

          <!-- ════════ Right Panels (toggleable) ════════ -->
          <GoalSetting :visible="showGoalSetting" @close="showGoalSetting = false" @apply="showGoalSetting = false" />
          <VoyageLog :visible="showVoyageLog" @close="showVoyageLog = false" />
          <Achievements :visible="showAchievements" />
          <LearningHeatmap :visible="showHeatmap" />
          <PathCompare :visible="showPathCompare" @close="showPathCompare = false" />

          <!-- ════════ Planet Detail Panel (click a star) ════════ -->
          <KnowledgeCard @fly-to="onCardFlyTo" />

          <!-- ════════ Bottom-left: Agent Suggestion ════════ -->
          <div class="bottom-left-stack">
            <AgentSuggestion />
          </div>

          <!-- ════════ Bottom-right: Path Timeline ════════ -->
          <div class="pathmap-container">
            <PathMap @fly-to="onCardFlyTo" />
          </div>

          <!-- ════════ Controls Hint ════════ -->
          <div class="controls-hint glass-light">
            <div class="controls-hint-label">Navigation</div>
            <div class="controls-hint-text">
              拖拽旋转 · 滚轮缩放 · 点击星体查看详情 · WASD 平移 · 双击复位
            </div>
            <div class="controls-hint-keys">
              <kbd>?</kbd>
              <span class="controls-hint-kbd-text">快捷键</span>
            </div>
          </div>

          <!-- ════════ Quick Actions Bottom Left ════════ -->
          <QuickActions
            @continue="continueLearning"
            @random="randomExplore"
            @weakness="goToWeakness"
          />

          <!-- ════════ Tutorial Overlay (first visit) ════════ -->
          <Transition name="hud-fade">
            <div v-if="showTutorial" class="tutorial-overlay" @click.self="dismissTutorial">
              <div class="tutorial-card glass-card">
                <div class="tutorial-card-header">
                  <div class="tutorial-card-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <h3 class="tutorial-card-title">欢迎来到学习宇宙</h3>
                  <p class="tutorial-card-desc">3 步开启你的星际学习之旅</p>
                </div>
                <div class="tutorial-card-steps">
                  <div class="tutorial-step">
                    <span class="tutorial-step-num">1</span>
                    <div class="tutorial-step-text">
                      <span class="tutorial-step-title">探索星系</span>
                      <span class="tutorial-step-desc">拖拽旋转视角，滚轮缩放，WASD 平移，浏览知识星球</span>
                    </div>
                  </div>
                  <div class="tutorial-step">
                    <span class="tutorial-step-num">2</span>
                    <div class="tutorial-step-text">
                      <span class="tutorial-step-title">查看详情</span>
                      <span class="tutorial-step-desc">点击任意星球查看课程详情、掌握度和前置知识</span>
                    </div>
                  </div>
                  <div class="tutorial-step">
                    <span class="tutorial-step-num">3</span>
                    <div class="tutorial-step-text">
                      <span class="tutorial-step-title">规划路径</span>
                      <span class="tutorial-step-desc">使用目标设定和路径对比功能，定制你的专属学习航线</span>
                    </div>
                  </div>
                </div>
                <button class="tutorial-card-btn" @click="dismissTutorial">
                  开始探索
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Transition>

        </div>
      </div>
    </Transition>

    <!-- ════════ Loading Screen ════════ -->
    <Transition name="hud-fade">
      <div v-if="!sceneReady" class="loading-overlay">
        <div class="loading-content glass-card">
          <div v-if="loadError" class="error-box glass-light">
            <div class="error-title">场景初始化失败</div>
            <div class="error-desc">{{ loadError }}</div>
            <button class="retry-btn glass" @click="reload">重新加载</button>
          </div>
          <template v-else>
            <div class="loading-kicker">航图加载中</div>
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
import { ref, onMounted, onUnmounted, computed, withDefaults } from 'vue'
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

/* ─── Universe Store ─── */
const universe = useUniverseStore()
const agentStore = useAgentStore()

/* ─── Computed ─── */
const selectedNode = computed(() => universe.selectedNode)

const overallProgress = computed(() => universe.overallProgress)
const totalCount = computed(() => universe.nodes.length)
const masteredCount = computed(() => universe.nodes.filter(n => n.mastery >= 0.7).length)

const galaxyProgress = computed(() => {
  return galaxies.map(g => {
    const gnodes = knowledgeNodes.filter(n => n.galaxy === g.id)
    const total = gnodes.length
    const mastered = gnodes.filter(n => n.mastery >= 0.7).length
    return {
      galaxy: g,
      progress: total > 0 ? mastered / total : 0,
      mastered,
      total,
    }
  })
})

const totalSystems = computed(() => {
  const systems = new Set(knowledgeNodes.map(n => n.system))
  return systems.size
})

const totalHours = computed(() => {
  const total = knowledgeNodes.reduce((sum, n) => sum + Math.round(n.difficulty * 20 + 4), 0)
  return total
})

import KnowledgeCard from './panels/KnowledgeCard.vue'
import SearchBar from './hud/SearchBar.vue'
import AgentSuggestion from './hud/AgentSuggestion.vue'
import PathMap from './panels/PathMap.vue'
import GoalSetting from './panels/GoalSetting.vue'
import VoyageLog from './panels/VoyageLog.vue'
import LearningHeatmap from './panels/LearningHeatmap.vue'
import PathCompare from './panels/PathCompare.vue'
import Achievements from './panels/Achievements.vue'
import QuickActions from './hud/QuickActions.vue'

const canvasRef = ref<HTMLCanvasElement>()
const sceneReady = ref(false)
const loadingMsg = ref('正在校准星图坐标...')
const loadingProgress = ref(0)
const loadError = ref<string | null>(null)

/* ─── Panel Toggles ─── */
const showGoalSetting = ref(false)
const showVoyageLog = ref(false)
const showAchievements = ref(false)
const showPathCompare = ref(false)
const showHeatmap = ref(false)

/* ─── Tutorial ─── */
const TUTORIAL_KEY = 'universe_tutorial_seen'
const showTutorial = ref(!localStorage.getItem(TUTORIAL_KEY))
function dismissTutorial() {
  showTutorial.value = false
  try { localStorage.setItem(TUTORIAL_KEY, '1') } catch {}
}

/* ─── Category filter ─── */
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

function resetCamera() {
  if (!s) return
  cameraCtrl.resetView(s)
  universe.selectNode(null)
}

function onFlyTo(pos: THREE.Vector3, nodeId: string) {
  if (!s) return
  cameraCtrl.flyTo(s, pos, nodeId)
  universe.selectNode(nodeId)
}

function onCardFlyTo(nodeId: string) {
  if (!s) return
  const node = knowledgeNodes.find(n => n.id === nodeId)
  if (!node) return
  const pos = new THREE.Vector3(node.position[0], node.position[1], node.position[2])
  cameraCtrl.flyTo(s, pos, nodeId)
  universe.selectNode(nodeId)
}

/* ─── QuickActions Handlers ─── */
function continueLearning() {
  // Find last-interacted node (highest mastery > 0 that's not at 100%)
  const candidates = universe.nodes
    .filter(n => n.mastery > 0 && n.mastery < 0.7)
    .sort((a, b) => b.mastery - a.mastery)
  if (candidates.length === 0) return
  const target = candidates[0]
  universe.selectNode(target.id)
  agentStore.navigateTo(target.id)
}

function randomExplore() {
  const unlocked = agentStore.findUnlockedNodes().filter(n => n.mastery < 0.7)
  if (unlocked.length === 0) return
  const target = unlocked[Math.floor(Math.random() * unlocked.length)]
  universe.selectNode(target.id)
  agentStore.navigateTo(target.id)
}

function goToWeakness() {
  const sorted = [...universe.nodes].sort((a, b) => a.mastery - b.mastery)
  const target = sorted[0]
  universe.selectNode(target.id)
  agentStore.navigateTo(target.id)
}

/* ─── Fly to a star system ─── */
const SYSTEM_CENTERS: Record<string, [number, number, number]> = {
  sys_prog_basics: [10, 0, 0],
  sys_ai: [7.9, 0, 20.5],
  sys_frontier: [-12.8, 0, 9.6],
  sys_software: [-5.5, 0, -4.3],
  sys_computer: [4.0, 0, -13.4],
}

function flyToSystem(systemId: string | null) {
  universe.setSystemFilter(systemId)
  if (!s || !systemId) {
    if (!s) return
    resetCamera()
    return
  }
  const center = SYSTEM_CENTERS[systemId]
  if (center) {
    cameraCtrl.flyTo(s, new THREE.Vector3(center[0], center[1], center[2]))
  }
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
    radial-gradient(circle at 52% 31%, rgba(220, 200, 180, 0.08), transparent 11%),
    radial-gradient(circle at 51% 34%, rgba(130, 168, 255, 0.06), transparent 21%),
    radial-gradient(circle at 50% 58%, rgba(75, 221, 255, 0.04), transparent 30%);
  filter: blur(10px);
}

.scene-noise {
  opacity: 0.12;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0.8px, transparent 0.8px);
  background-size: 14px 14px;
  mix-blend-mode: soft-light;
  mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent 72%);
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

/* ═══════════════════════════════════════════
   Mission Control Top Bar
   ═══════════════════════════════════════════ */
.mission-bar {
  position: absolute;
  top: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  min-height: 58px;
  z-index: 20;
  gap: 12px;
  border: 1px solid rgba(180, 200, 255, 0.1);
  border-radius: 20px;
}

.mission-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mission-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mission-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(110, 144, 255, 0.18), rgba(255, 193, 112, 0.12));
  border: 1px solid rgba(192, 208, 255, 0.12);
  color: #e5ecff;
  box-shadow: 0 0 20px rgba(98, 133, 255, 0.1);
}

.mission-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mission-kicker {
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(141, 169, 255, 0.42);
}

.mission-title {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(248, 250, 255, 0.92);
}

.mission-sep {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.06);
}

.mission-stat {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mission-stat-label {
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(173, 191, 255, 0.35);
}

.mission-stat-value {
  font-size: 1rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(248, 250, 255, 0.85);
  line-height: 1.3;
}

.mission-stat-value.mastered {
  color: #73f0d0;
}

.mission-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.mission-progress {
  width: 160px;
}

.mission-progress-track {
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  overflow: visible;
  position: relative;
}

.mission-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7a97ff, #72ecff 52%, #73f0d0);
  box-shadow: 0 0 12px rgba(108, 141, 255, 0.25);
  transition: width 0.6s ease;
}

.mission-progress-marker {
  position: absolute;
  top: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--m-clr);
  border: 2px solid rgba(8, 14, 36, 0.9);
  transform: translateX(-50%);
  box-shadow: 0 0 6px var(--m-clr);
  transition: left 0.6s ease;
}

.mission-overview-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  color: rgba(230, 238, 255, 0.7);
  font-size: 0.72rem;
  border-radius: 10px;
  transition: all 0.2s;
  white-space: nowrap;
}
.mission-overview-btn:hover {
  color: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

/* ── Panel Toggles ── */
.panel-toggles {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  color: rgba(200, 215, 255, 0.4);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}
.toggle-btn:hover {
  color: rgba(255, 255, 255, 0.75);
  border-color: rgba(122, 151, 255, 0.15);
  background: rgba(122, 151, 255, 0.06);
}
.toggle-btn.active {
  color: #82a8ff;
  border-color: rgba(122, 151, 255, 0.2);
  background: rgba(122, 151, 255, 0.1);
}

/* ═══════════════════════════════════════════
   Right: Star Map Panel (category progress)
   ═══════════════════════════════════════════ */
.star-map-panel {
  position: absolute;
  right: 16px;
  top: 82px;
  width: 210px;
  z-index: 15;
  background:
    linear-gradient(160deg, rgba(8, 14, 36, 0.82), rgba(4, 8, 18, 0.65)),
    radial-gradient(ellipse at 30% 0%, rgba(122, 151, 255, 0.03), transparent 60%);
  border: 1px solid rgba(180, 200, 255, 0.07);
  border-radius: 16px;
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  padding: 14px;
  overflow: hidden;
}

.star-map-header {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.star-map-kicker {
  font-size: 0.5rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(141, 169, 255, 0.38);
}

.star-map-title {
  display: block;
  margin-top: 2px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.85);
  letter-spacing: 0.03em;
}

.star-map-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sector-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  padding: 4px 6px;
  margin: 0 -6px;
  border-radius: 10px;
  transition: all 0.2s;
}
.sector-row:hover {
  background: rgba(122, 151, 255, 0.06);
}
.sector-row.active {
  background: rgba(122, 151, 255, 0.1);
  border: 1px solid rgba(122, 151, 255, 0.15);
  padding: 3px 5px;
}

.sector-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--s-clr);
  box-shadow: 0 0 8px var(--s-clr);
  flex-shrink: 0;
  margin-top: 3px;
}

.sector-info {
  flex: 1;
  min-width: 0;
}

.sector-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.sector-name {
  font-size: 0.68rem;
  color: rgba(248, 250, 255, 0.65);
  font-weight: 500;
}

.sector-pct {
  font-size: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(200, 215, 255, 0.38);
}

.sector-track {
  height: 2px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 2px;
}

.sector-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.6s ease;
}

.sector-meta {
  font-size: 0.55rem;
  color: rgba(173, 191, 255, 0.3);
}

.star-map-footer {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.legend-tip {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.55rem;
  color: rgba(200, 215, 255, 0.35);
}

.legend-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--l-clr);
}

/* ═══════════════════════════════════════════
   Bottom Controls Hint
   ═══════════════════════════════════════════ */
.controls-hint {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  min-width: min(90vw, 340px);
  text-align: center;
  border-radius: 14px;
  border: 1px solid rgba(180, 200, 255, 0.05);
}

.controls-hint-label {
  font-size: 0.52rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(145, 170, 255, 0.38);
}

.controls-hint-text {
  margin-top: 2px;
  font-size: 0.65rem;
  color: rgba(239, 244, 255, 0.48);
}

.controls-hint-keys {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
}

.controls-hint-keys kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(239, 244, 255, 0.4);
}

.controls-hint-kbd-text {
  font-size: 0.55rem;
  color: rgba(145, 170, 255, 0.3);
}

/* ═══════════════════════════════════════════
   Tutorial Overlay
   ═══════════════════════════════════════════ */
.tutorial-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 4, 12, 0.65);
  backdrop-filter: blur(8px);
  z-index: 400;
  padding: 24px;
}

.tutorial-card {
  width: min(420px, 90vw);
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(180, 200, 255, 0.1);
}

.tutorial-card-header {
  text-align: center;
  padding: 28px 28px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tutorial-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  background: linear-gradient(145deg, rgba(110, 144, 255, 0.2), rgba(255, 193, 112, 0.12));
  color: #e5ecff;
  box-shadow: 0 0 24px rgba(98, 133, 255, 0.1);
}

.tutorial-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.92);
  margin-bottom: 4px;
}

.tutorial-card-desc {
  font-size: 0.78rem;
  color: rgba(200, 215, 255, 0.5);
}

.tutorial-card-steps {
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tutorial-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.tutorial-step-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(122, 151, 255, 0.1);
  color: #7a97ff;
  flex-shrink: 0;
}

.tutorial-step-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tutorial-step-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.85);
}

.tutorial-step-desc {
  font-size: 0.7rem;
  color: rgba(200, 215, 255, 0.48);
  line-height: 1.5;
}

.tutorial-card-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 56px);
  margin: 0 28px 24px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.25), rgba(122, 151, 255, 0.08));
  border: 1px solid rgba(122, 151, 255, 0.2);
  transition: all 0.25s;
}
.tutorial-card-btn:hover {
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.35), rgba(122, 151, 255, 0.15));
  box-shadow: 0 8px 24px rgba(122, 151, 255, 0.12);
}

/* ═══════════════════════════════════════════
   Bottom-left Stack (AgentSuggestion)
   ═══════════════════════════════════════════ */
.bottom-left-stack {
  position: absolute;
  left: 16px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
  max-width: 280px;
}

/* ═══════════════════════════════════════════
   Loading Overlay
   ═══════════════════════════════════════════ */
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
  to { transform: rotate(360deg); }
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

.hud-fade-enter-active,
.hud-fade-leave-active {
  transition: opacity 0.6s ease;
}

.hud-fade-enter-from,
.hud-fade-leave-to {
  opacity: 0;
}

.loading-text {
  font-size: 1.18rem;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  color: rgba(248, 250, 255, 0.95);
  text-shadow: 0 0 28px rgba(112, 154, 255, 0.2);
}

/* ═══════════════════════════════════════════
   Responsive
   ═══════════════════════════════════════════ */
@media (max-width: 1200px) {
  .star-map-panel {
    display: none;
  }
  .bottom-left-stack {
    display: none;
  }
  .pathmap-container {
    display: none;
  }
}

@media (max-width: 1100px) {
  .mission-progress {
    width: 120px;
  }
  .mission-stat:nth-child(3) {
    display: none;
  }
}

@media (max-width: 900px) {
  .mission-stat:not(:first-of-type) {
    display: none;
  }
  .mission-sep {
    display: none;
  }
  .mission-progress {
    width: 80px;
  }
  .panel-toggles {
    display: none;
  }
}

@media (max-width: 768px) {
  .mission-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 16px;
    gap: 10px;
  }
  .mission-left {
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .mission-right {
    justify-content: space-between;
  }
  .mission-progress {
    flex: 1;
  }
  .bottom-left-stack {
    display: none;
  }

  .scene-bloom {
    opacity: 0.72;
  }
  .scene-noise {
    opacity: 0.1;
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

<style>
/* ── Glass utilities (unscoped, unified) ── */
.glass {
  background: linear-gradient(155deg, rgba(10, 17, 42, 0.78), rgba(5, 10, 24, 0.52));
  border: 1px solid rgba(196, 212, 255, 0.1);
  border-radius: 18px;
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.32);
}

.glass-deep {
  background:
    linear-gradient(155deg, rgba(8, 13, 34, 0.88), rgba(4, 8, 18, 0.7)),
    radial-gradient(circle at top, rgba(124, 151, 255, 0.1), transparent 42%);
  border: 1px solid rgba(162, 187, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(28px) saturate(148%);
  -webkit-backdrop-filter: blur(28px) saturate(148%);
  box-shadow: 0 22px 80px rgba(0, 0, 0, 0.38);
}

.glass-light {
  background: linear-gradient(160deg, rgba(15, 24, 54, 0.58), rgba(9, 14, 30, 0.4));
  border: 1px solid rgba(196, 212, 255, 0.08);
  border-radius: 14px;
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.glass-card {
  background:
    linear-gradient(155deg, rgba(9, 16, 38, 0.82), rgba(6, 10, 23, 0.66)),
    radial-gradient(circle at top right, rgba(255, 195, 114, 0.06), transparent 30%);
  border: 1px solid rgba(188, 208, 255, 0.1);
  border-radius: 22px;
  backdrop-filter: blur(28px) saturate(150%);
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.3);
}

.glass::before,
.glass-deep::before,
.glass-light::before,
.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
