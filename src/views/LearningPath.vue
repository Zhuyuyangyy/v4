<template>
  <div class="app-root">
      <UniverseCanvas
        ref="universeRef"
        @select-planet="onSelectPlanet"
      />

      <OrbitHUD
        @open-dashboard="openNavCompass('dashboard')"
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

      <AssessmentModal
        :visible="activeModal === 'assessment'"
        :course-id="modalCourseId"
        @close="activeModal = null"
      />

      <LabTaskModal
        :visible="activeModal === 'lab'"
        :lab-task-id="modalLabId"
        @close="activeModal = null"
      />

      <CodePlaygroundModal
        :visible="activeModal === 'code'"
        :code-example-id="modalCodeId"
        @close="activeModal = null"
      />

      <FAQDetailModal
        :visible="activeModal === 'faq'"
        :faq-id="modalFaqId"
        @close="activeModal = null"
      />

      <transition name="path-panel">
        <PathComparisonPanel v-if="showPathComparison" @close="showPathComparison = false" />
      </transition>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useUniverseStore } from '../stores/universeStore'
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

const store = useUniverseStore()
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
</style>
