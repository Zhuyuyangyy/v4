<template>
  <div class="app-root">
    <!-- 可视化模式切换器 -->
    <div class="viz-switcher">
      <button
        v-for="mode in vizModes"
        :key="mode.id"
        :class="['viz-btn', { active: activeViz === mode.id }]"
        @click="selectViz(mode.id)"
        :title="mode.label"
      >
        <component :is="mode.icon" :size="15" stroke-width="1.5" />
        <span class="viz-btn-label">{{ mode.label }}</span>
      </button>
    </div>

    <!-- 3D 宇宙模式 -->
    <template v-if="activeViz === 'universe'">
      <UniverseCanvas
        ref="universeRef"
        @select-planet="onSelectPlanet"
      />
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
          <h2 class="viz-title">多维知识图谱</h2>
          <p class="viz-subtitle">星座、地铁、同心圆、思维导图、矩阵和路径链分别展示不同学习维度；同心圆会聚焦具体课程包和补弱任务。</p>
        </div>
        <div class="viz-body viz-body--all">
          <section id="viz-section-constellation" class="viz-section" style="--section-accent: #00d4ff">
            <div class="viz-section-head">
              <span class="viz-section-kicker">01 · Cross-domain</span>
              <div>
                <h3>星座图</h3>
                <p>RAG / 检索增强的跨域依赖关系</p>
              </div>
            </div>
            <ResourceConstellationView />
          </section>

          <section id="viz-section-metro" class="viz-section" style="--section-accent: #06d6a0">
            <div class="viz-section-head">
              <span class="viz-section-kicker">02 · Route</span>
              <div>
                <h3>地铁图</h3>
                <p>图算法学习路线、BFS visited 与最短路换乘</p>
              </div>
            </div>
            <ResourceMetroView />
          </section>

          <section id="viz-section-sunburst" class="viz-section" style="--section-accent: #f59e0b">
            <div class="viz-section-head">
              <span class="viz-section-kicker">03 · Center</span>
              <div>
                <h3>同心圆</h3>
                <p>Transformer 中心知识的先修、同域、应用和迁移层级</p>
              </div>
            </div>
            <ResourceSunburstView />
          </section>

          <section id="viz-section-mindmap" class="viz-section" style="--section-accent: #7c3aed">
            <div class="viz-section-head">
              <span class="viz-section-kicker">04 · Structure</span>
              <div>
                <h3>思维导图</h3>
                <p>递归与动态规划的结构化展开</p>
              </div>
            </div>
            <ResourceMindMapView />
          </section>

          <section id="viz-section-matrix" class="viz-section" style="--section-accent: #f43f5e">
            <div class="viz-section-head">
              <span class="viz-section-kicker">05 · Ability</span>
              <div>
                <h3>矩阵图</h3>
                <p>C 指针能力矩阵：识别、解释、改写、迁移、排错</p>
              </div>
            </div>
            <ResourceMatrixView />
          </section>

          <section id="viz-section-pathlink" class="viz-section" style="--section-accent: #8892b0">
            <div class="viz-section-head">
              <span class="viz-section-kicker">06 · Resources</span>
              <div>
                <h3>路径链</h3>
                <p>C 指针补救资源如何进入课前、课中、课后、测评和辅导阶段</p>
              </div>
            </div>
            <ResourcePathLinkView />
          </section>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useUniverseStore } from '../stores/universeStore'
import { useKnowledgeGraphData } from '../composables/useKnowledgeGraphData'
import {
  Globe2,
  Sparkles,
  TrainFront,
  Sun,
  Brain,
  LayoutGrid,
  Route,
} from 'lucide-vue-next'

import UniverseCanvas from '../components/universe/UniverseCanvas.vue'
import StarInfoPanel from '../components/ui/StarInfoPanel.vue'
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
import ResourceMatrixView from '../components/resources/ResourceMatrixView.vue'
import ResourcePathLinkView from '../components/resources/ResourcePathLinkView.vue'

const store = useUniverseStore()
const { loadFromBackend } = useKnowledgeGraphData()

const vizModes = [
  { id: 'universe', label: '星图', icon: Globe2, desc: '3D 宇宙学习路径' },
  { id: 'constellation', label: '星座图', icon: Sparkles, desc: '知识点如星辰，亮度即掌握度' },
  { id: 'metro', label: '地铁图', icon: TrainFront, desc: '每条线是一个学科，每站是一个知识点' },
  { id: 'sunburst', label: '同心圆', icon: Sun, desc: '围绕中心课程展开先修、应用、练习和迁移任务' },
  { id: 'mindmap', label: '思维导图', icon: Brain, desc: '知识结构展开，点击折叠/展开' },
  { id: 'matrix', label: '矩阵图', icon: LayoutGrid, desc: '知识点掌握度矩阵' },
  { id: 'pathlink', label: '路径链', icon: Route, desc: '学习路径关联链路' },
]

const activeViz = ref('universe')

const panelMode = ref<'mini' | 'standard' | 'learning'>('standard')
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

async function selectViz(id: string) {
  activeViz.value = id
  if (id === 'universe') return

  await nextTick()
  document.getElementById(`viz-section-${id}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
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
  top: 74px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 120;
  display: flex;
  gap: 4px;
  padding: 6px;
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(18, 24, 46, 0.92), rgba(7, 7, 13, 0.88)),
    url('/learning-path/knowledge-panel-bg.png') center / cover;
  backdrop-filter: blur(24px);
  border: 1px solid rgba(167, 222, 255, 0.12);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.06);
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
  background:
    radial-gradient(circle at 12% 8%, rgba(0, 212, 255, 0.08), transparent 32%),
    radial-gradient(circle at 88% 16%, rgba(6, 214, 160, 0.05), transparent 30%),
    var(--color-bg-base);
  overflow-y: auto;
  padding-top: 124px;
}

.viz-header {
  max-width: 1480px;
  width: calc(100% - 48px);
  margin: 0 auto;
  padding: 34px 0 4px;
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
  max-width: 760px;
}

.viz-body {
  flex: 1;
  padding: 20px 0;
  animation: viz-fade-in 0.5s ease 0.1s both;
}

.viz-body--all {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: calc(100% - 48px);
  max-width: 1480px;
  margin: 0 auto;
  padding-bottom: 72px;
}

.viz-section {
  position: relative;
  scroll-margin-top: 84px;
  overflow: hidden;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(10, 14, 28, 0.78), rgba(7, 7, 13, 0.92)),
    url('/learning-path/knowledge-panel-bg.png') center / cover;
  border: 1px solid rgba(167, 222, 255, 0.1);
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.24);
  transition: border-color 180ms ease, transform 180ms ease;
}

.viz-section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--section-accent) 30%, transparent), transparent 34%),
    radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--section-accent) 14%, transparent), transparent 32%);
  opacity: 0.38;
}

.viz-section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(255, 255, 255, 0.03);
}

.viz-section:hover {
  border-color: color-mix(in srgb, var(--section-accent) 24%, rgba(167, 222, 255, 0.1));
}

.viz-section-head {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 22px;
  align-items: baseline;
  padding: 26px 32px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.viz-section-head h3 {
  margin: 0 0 5px;
  font-family: var(--font-display);
  font-size: 25px;
  font-weight: 400;
  color: #e8edf5;
  letter-spacing: 0;
}

.viz-section-head p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #8892b0;
}

.viz-section-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  color: color-mix(in srgb, var(--section-accent) 76%, #e8edf5);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.viz-section :deep(.constellation-view),
.viz-section :deep(.metro-view),
.viz-section :deep(.sunburst-wrap),
.viz-section :deep(.mindmap-view),
.viz-section :deep(.matrix-view),
.viz-section :deep(.path-view) {
  position: relative;
  z-index: 1;
}

.viz-section :deep(.constellation-canvas),
.viz-section :deep(.metro-canvas),
.viz-section :deep(.mindmap-tree),
.viz-section :deep(.matrix-canvas) {
  background:
    linear-gradient(180deg, rgba(7, 9, 18, 0.70), rgba(7, 7, 13, 0.88)),
    url('/learning-path/knowledge-panel-bg.png') center / cover !important;
  border-color: rgba(167, 222, 255, 0.10) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.viz-section :deep(.path-timeline) {
  padding: 20px;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(7, 9, 18, 0.56), rgba(7, 7, 13, 0.76)),
    url('/learning-path/knowledge-panel-bg.png') center / cover;
  border: 1px solid rgba(167, 222, 255, 0.08);
}

.viz-section :deep(.constellation-banner),
.viz-section :deep(.metro-banner),
.viz-section :deep(.mindmap-banner),
.viz-section :deep(.matrix-banner),
.viz-section :deep(.path-banner) {
  background: rgba(8, 12, 24, 0.58);
  border-color: rgba(167, 222, 255, 0.08);
}

@keyframes viz-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .viz-switcher {
    top: 70px;
    bottom: auto;
    max-width: calc(100vw - 24px);
    overflow-x: auto;
  }
  .viz-btn-label { display: none; }
  .viz-btn { padding: 10px; }
  .viz-header,
  .viz-body--all {
    width: calc(100% - 24px);
  }
  .viz-header { padding: 24px 0 0; }
  .viz-section {
    border-radius: 18px;
  }
  .viz-section-head {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 20px 18px 14px;
  }
}
</style>
