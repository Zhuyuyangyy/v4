<template>
  <div class="app-root">
    <!-- 可视化模式切换器（仅在 2D 模式显示） -->
    <div v-if="activeViz !== 'universe'" class="viz-switcher">
      <button
        v-for="mode in vizModes"
        :key="mode.id"
        :class="['viz-btn', { active: activeViz === mode.id }]"
        @click="activeViz = mode.id"
        :title="mode.label"
      >
        <component :is="mode.icon" :size="15" stroke-width="1.5" />
        <span class="viz-btn-label">{{ mode.label }}</span>
      </button>
    </div>

    <!-- 3D 模式下的切换按钮（右下角，仅图标） -->
    <div v-if="activeViz === 'universe'" class="viz-toggle-btn" @click="activeViz = 'constellation'" title="切换到知识图谱">
      <Sparkles :size="18" stroke-width="1.5" />
    </div>

    <!-- 3D 宇宙模式 -->
    <template v-if="activeViz === 'universe'">
      <UniverseCanvas
        ref="universeRef"
        @select-planet="onSelectPlanet"
      />
      <OrbitHUD @open-dashboard="openNavCompass('dashboard')" />
      <StarInfoPanel
        :visible="store.selectedCourseId !== null"
        :mode="panelMode"
        @close="onClosePanel"
        @start-learning="panelMode = 'learning'"
        @exit-learning="panelMode = 'standard'"
        @complete="onCompleteCourse"
        @start-assessment="onStartAssessment"
        @open-code-playground="onOpenCodePlayground"
        @open-lab="onOpenLab"
        @open-faq="onOpenFaq"
        @select-knowledge-point="onSelectKnowledgePoint"
        @select-course="onSelectCourse"
      />
      <NavCompass
        :visible="showNavCompass"
        :initial-tab="navCompassTab"
        @close="showNavCompass = false"
        @open="showNavCompass = true"
        @select-course="onNavCompassSelectCourse"
      />
      <PathFlowBar
        :visible="!!store.selectedPath"
        :path-id="store.selectedPath"
        @select-course="onSelectCourse"
      />
      <AchievementBurst />
      <AssessmentModal :visible="activeModal === 'assessment'" :course-id="modalCourseId" @close="activeModal = null" />
      <LabTaskModal :visible="activeModal === 'lab'" :lab-task-id="modalLabId" @close="activeModal = null" />
      <CodePlaygroundModal :visible="activeModal === 'code'" :code-example-id="modalCodeId" @close="activeModal = null" />
      <FAQDetailModal :visible="activeModal === 'faq'" :faq-id="modalFaqId" @close="activeModal = null" />
      <transition name="path-panel">
        <PathComparisonPanel v-if="showPathComparison" @close="showPathComparison = false" />
      </transition>
    </template>

    <!-- 2D 图谱模式 -->
    <template v-else>
      <div class="viz-container">
        <div class="viz-header">
          <h2 class="viz-title">{{ currentVizLabel }}</h2>
          <p class="viz-subtitle">{{ currentVizDesc }}</p>
        </div>
        <div class="viz-body">
          <ResourceConstellationView v-if="activeViz === 'constellation'" />
          <ResourceMetroView v-if="activeViz === 'metro'" />
          <ResourceSunburstView v-if="activeViz === 'sunburst'" />
          <ResourceMindMapView v-if="activeViz === 'mindmap'" />
          <ResourceOrbitalView v-if="activeViz === 'orbital'" />
          <ResourceMatrixView v-if="activeViz === 'matrix'" />
          <ResourcePathLinkView v-if="activeViz === 'pathlink'" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUniverseStore } from '../stores/universeStore'
import { useKnowledgeGraphData } from '../composables/useKnowledgeGraphData'
import {
  Globe2,
  Sparkles,
  TrainFront,
  Sun,
  Brain,
  Orbit,
  LayoutGrid,
  Route,
} from 'lucide-vue-next'

import UniverseCanvas from '../components/universe/UniverseCanvas.vue'
import OrbitHUD from '../components/ui/OrbitHUD.vue'
import StarInfoPanel from '../components/ui/StarInfoPanel.vue'
import NavCompass from '../components/ui/NavCompass.vue'
import PathFlowBar from '../components/ui/PathFlowBar.vue'
import AchievementBurst from '../components/ui/AchievementBurst.vue'
import AssessmentModal from '../components/ui/AssessmentModal.vue'
import LabTaskModal from '../components/ui/LabTaskModal.vue'
import CodePlaygroundModal from '../components/ui/CodePlaygroundModal.vue'
import FAQDetailModal from '../components/ui/FAQDetailModal.vue'
import PathComparisonPanel from '../components/path/PathComparisonPanel.vue'

import ResourceConstellationView from '../components/resources/ResourceConstellationView.vue'
import ResourceMetroView from '../components/resources/ResourceMetroView.vue'
import ResourceSunburstView from '../components/resources/ResourceSunburstView.vue'
import ResourceMindMapView from '../components/resources/ResourceMindMapView.vue'
import ResourceOrbitalView from '../components/resources/ResourceOrbitalView.vue'
import ResourceMatrixView from '../components/resources/ResourceMatrixView.vue'
import ResourcePathLinkView from '../components/resources/ResourcePathLinkView.vue'

const store = useUniverseStore()
const { loadFromBackend } = useKnowledgeGraphData()

const vizModes = [
  { id: 'universe', label: '星图', icon: Globe2, desc: '3D 宇宙学习路径' },
  { id: 'constellation', label: '星座图', icon: Sparkles, desc: '知识点如星辰，亮度即掌握度' },
  { id: 'metro', label: '地铁图', icon: TrainFront, desc: '每条线是一个学科，每站是一个知识点' },
  { id: 'sunburst', label: '旭日图', icon: Sun, desc: '由内向外展开知识层级与掌握度' },
  { id: 'mindmap', label: '思维导图', icon: Brain, desc: '知识结构展开，点击折叠/展开' },
  { id: 'orbital', label: '轨道图', icon: Orbit, desc: '知识领域轨道运行' },
  { id: 'matrix', label: '矩阵图', icon: LayoutGrid, desc: '知识点掌握度矩阵' },
  { id: 'pathlink', label: '路径链', icon: Route, desc: '学习路径关联链路' },
]

const activeViz = ref('universe')

const currentVizLabel = computed(() => vizModes.find(m => m.id === activeViz.value)?.label || '')
const currentVizDesc = computed(() => vizModes.find(m => m.id === activeViz.value)?.desc || '')

const panelMode = ref<'mini' | 'standard' | 'learning'>('standard')
const showNavCompass = ref(false)
const navCompassTab = ref('dashboard')
const universeRef = ref<InstanceType<typeof UniverseCanvas> | null>(null)

const activeModal = ref<'assessment' | 'lab' | 'code' | 'faq' | null>(null)
const showPathComparison = ref(true)
const modalCourseId = ref(0)
const modalLabId = ref('')
const modalCodeId = ref('')
const modalFaqId = ref('')

function onKeyboardShortcut(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (activeModal.value) { activeModal.value = null; return }
    if (showNavCompass.value) { showNavCompass.value = false; return }
    if (store.selectedCourseId !== null) { onClosePanel(); return }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyboardShortcut)
  document.body.classList.add('universe-body')
  loadFromBackend()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyboardShortcut)
  document.body.classList.remove('universe-body')
})

function onSelectPlanet(courseId: number) {
  store.selectCourse(courseId)
  panelMode.value = 'standard'
  universeRef.value?.flyToPlanet(courseId)
}

function onClosePanel() {
  store.selectCourse(null)
  panelMode.value = 'standard'
}

function onCompleteCourse() {
  if (store.selectedCourseId) store.completeCourse(store.selectedCourseId)
}

function onStartAssessment() {
  if (store.selectedCourseId) {
    modalCourseId.value = store.selectedCourseId
    activeModal.value = 'assessment'
  }
}

function onOpenCodePlayground(codeExampleId: string) {
  modalCodeId.value = codeExampleId
  activeModal.value = 'code'
}

function onOpenLab(labTaskId: string) {
  modalLabId.value = labTaskId
  activeModal.value = 'lab'
}

function onOpenFaq(faqId: string) {
  modalFaqId.value = faqId
  activeModal.value = 'faq'
}

function onSelectKnowledgePoint(_name: string, _event: MouseEvent) {
  panelMode.value = 'learning'
}

function onSelectCourse(courseId: number) {
  store.selectCourse(courseId)
  panelMode.value = 'standard'
  universeRef.value?.flyToPlanet(courseId)
}

function openNavCompass(tab: string) {
  navCompassTab.value = tab
  showNavCompass.value = true
}

function onNavCompassSelectCourse(courseId: number) {
  showNavCompass.value = false
  store.selectCourse(courseId)
  panelMode.value = 'standard'
  universeRef.value?.flyToPlanet(courseId)
}
</script>

<style scoped>
.app-root {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 可视化切换器 */
.viz-switcher {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 4px;
  padding: 6px;
  border-radius: 14px;
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.viz-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.viz-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-primary);
}

.viz-btn.active {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.25);
  color: var(--color-accent-cyan);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.15);
}

.viz-btn-label {
  letter-spacing: 0.02em;
}

/* 2D 图谱容器 */
.viz-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-base);
  overflow-y: auto;
  padding-top: 64px;
}

.viz-header {
  padding: 32px 40px 0;
  animation: viz-fade-in 0.4s ease both;
}

.viz-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
  color: #e8edf5;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.viz-subtitle {
  font-size: 14px;
  color: #8892b0;
  margin: 0;
  line-height: 1.6;
}

.viz-body {
  flex: 1;
  padding: 20px 0;
  animation: viz-fade-in 0.5s ease 0.1s both;
}

@keyframes viz-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .viz-switcher {
    top: auto;
    bottom: 12px;
    max-width: calc(100vw - 24px);
    overflow-x: auto;
  }
  .viz-btn-label { display: none; }
  .viz-btn { padding: 10px; }
  .viz-header { padding: 24px 20px 0; }
}
</style>
