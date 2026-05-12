<script setup lang="ts">
import { computed } from 'vue'
import { BookOpen, Zap, PenTool, Target, ChevronRight } from 'lucide-vue-next'
import type { StudyScenario, TutorSubMode } from '@/types/course'
import { scenarioConfigs } from '@/components/course/CourseData'

const props = defineProps<{
  currentScenario: StudyScenario
  currentSubMode: TutorSubMode
}>()

const emit = defineEmits<{
  (e: 'update:scenario', v: StudyScenario): void
  (e: 'update:subMode', v: TutorSubMode): void
}>()

const iconMap: Record<string, any> = {
  BookOpen, Zap, PenTool, Target,
}

const scenarios = computed(() =>
  scenarioConfigs.map(sc => ({
    ...sc,
    iconComp: iconMap[sc.icon] || BookOpen,
  }))
)

const activeScenario = computed(() =>
  scenarios.value.find(s => s.key === props.currentScenario)
)

const subModes = computed(() =>
  activeScenario.value?.subModes ?? []
)

function selectScenario(key: StudyScenario) {
  emit('update:scenario', key)
  // Auto-select first sub-mode of new scenario
  const sc = scenarioConfigs.find(s => s.key === key)
  if (sc && sc.subModes.length > 0) {
    emit('update:subMode', sc.subModes[0].key)
  }
}

function selectSubMode(key: TutorSubMode) {
  emit('update:subMode', key)
}
</script>

<template>
  <div class="scenario-selector">
    <!-- Scenario Tabs -->
    <div class="scenario-tabs">
      <button
        v-for="sc in scenarios"
        :key="sc.key"
        :class="['scenario-tab', { active: currentScenario === sc.key }]"
        :style="{ '--s-clr': sc.color }"
        @click="selectScenario(sc.key)"
      >
        <div class="st-icon">
          <component :is="sc.iconComp" :size="16" stroke-width="1.5" />
        </div>
        <div class="st-info">
          <span class="st-label">{{ sc.label }}</span>
          <span class="st-desc">{{ sc.description }}</span>
        </div>
        <div v-if="currentScenario === sc.key" class="st-active-bar" />
      </button>
    </div>

    <!-- Sub-mode Pills -->
    <div v-if="subModes.length > 0" class="submode-row">
      <span class="submode-label">模式：</span>
      <div class="submode-pills">
        <button
          v-for="sm in subModes"
          :key="sm.key"
          :class="['submode-pill', { active: currentSubMode === sm.key }]"
          :style="{ '--s-clr': activeScenario?.color ?? '#00d4ff' }"
          @click="selectSubMode(sm.key)"
        >
          <span class="sp-label">{{ sm.label }}</span>
          <span class="sp-desc">{{ sm.desc }}</span>
          <ChevronRight v-if="currentSubMode === sm.key" :size="12" stroke-width="2" class="sp-arrow" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scenario-selector {
  padding: 0 40px 16px;
}

/* ── Scenario Tabs ── */
.scenario-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.scenario-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  text-align: left;
  transition: all 0.3s var(--ease-out);
  overflow: hidden;
  cursor: pointer;
}

.scenario-tab:hover {
  border-color: var(--s-clr);
  background: color-mix(in srgb, var(--s-clr) 4%, var(--color-bg-card));
}

.scenario-tab.active {
  border-color: var(--s-clr);
  background: color-mix(in srgb, var(--s-clr) 6%, var(--color-bg-card));
  box-shadow: 0 0 20px color-mix(in srgb, var(--s-clr) 8%, transparent);
}

.st-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--s-clr) 10%, transparent);
  color: var(--s-clr);
  flex-shrink: 0;
  transition: all 0.3s var(--ease-out);
}

.scenario-tab.active .st-icon {
  background: color-mix(in srgb, var(--s-clr) 20%, transparent);
}

.st-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.st-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.st-desc {
  font-size: 10px;
  color: var(--color-text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.st-active-bar {
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  border-radius: 1px;
  background: var(--s-clr);
}

/* ── Sub-modes ── */
.submode-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
}

.submode-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-weight: 500;
  flex-shrink: 0;
}

.submode-pills {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.submode-pills::-webkit-scrollbar { display: none; }

.submode-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: transparent;
  font-size: 11px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.submode-pill:hover {
  border-color: var(--s-clr);
  color: var(--color-text-primary);
}

.submode-pill.active {
  background: color-mix(in srgb, var(--s-clr) 8%, transparent);
  border-color: var(--s-clr);
  color: var(--s-clr);
}

.sp-label { font-weight: 500; }
.sp-desc {
  font-size: 10px;
  color: var(--color-text-tertiary);
}
.submode-pill.active .sp-desc { color: color-mix(in srgb, var(--s-clr) 70%, var(--color-text-secondary)); }
.sp-arrow { flex-shrink: 0; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .scenario-selector { padding: 0 20px 12px; }
  .scenario-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  .st-desc { display: none; }
}
</style>
