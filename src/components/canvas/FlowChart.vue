<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { Play, Pause, RotateCcw, Info, Maximize2 } from 'lucide-vue-next'
import type { FlowStage } from '@/types/course'

const props = defineProps<{
  stages: FlowStage[]
  title?: string
}>()

const activeStageId = ref<string | null>(null)
const isPlaying = ref(false)
const currentStep = ref(-1)
const showDetail = ref(false)
let playTimer: ReturnType<typeof setInterval> | null = null

const totalStages = computed(() => props.stages.length)

function togglePlay() {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

function play() {
  if (currentStep.value >= totalStages.value - 1) {
    currentStep.value = 0
  }
  isPlaying.value = true
  activeStageId.value = props.stages[currentStep.value]?.id ?? null
  playTimer = setInterval(() => {
    if (currentStep.value < totalStages.value - 1) {
      currentStep.value++
      activeStageId.value = props.stages[currentStep.value]?.id ?? null
    } else {
      pause()
    }
  }, 2000)
}

function pause() {
  isPlaying.value = false
  if (playTimer) {
    clearInterval(playTimer)
    playTimer = null
  }
}

function reset() {
  pause()
  currentStep.value = -1
  activeStageId.value = null
}

function selectStage(index: number) {
  pause()
  currentStep.value = index
  activeStageId.value = props.stages[index]?.id ?? null
}

const activeStage = computed(() =>
  props.stages.find(s => s.id === activeStageId.value)
)

function svgArrow(fromIdx: number, toIdx: number) {
  // Simplified arrow positions for horizontal flow
  return ''
}

onMounted(() => {
  nextTick(() => {
    // Auto-play on mount
    play()
  })
})
</script>

<template>
  <div class="flow-chart" :class="{ playing: isPlaying }">
    <!-- Header -->
    <div class="fc-header">
      <div class="fc-title-row">
        <Info :size="14" stroke-width="1.5" />
        <span class="fc-title">{{ title ?? '数据处理流程' }}</span>
      </div>
      <div class="fc-controls">
        <button class="fc-btn" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
          <component :is="isPlaying ? Pause : Play" :size="14" stroke-width="1.5" />
        </button>
        <button class="fc-btn" @click="reset" title="重置">
          <RotateCcw :size="14" stroke-width="1.5" />
        </button>
      </div>
    </div>

    <!-- Flow Stages -->
    <div class="fc-flow">
      <div
        v-for="(stage, idx) in stages"
        :key="stage.id"
        :class="['fc-node', {
          active: activeStageId === stage.id,
          completed: currentStep > idx,
        }]"
        :style="{ '--fc-delay': idx * 0.15 + 's' }"
        @click="selectStage(idx)"
      >
        <div class="fcn-indicator">
          <div class="fcn-dot" />
          <div v-if="activeStageId === stage.id" class="fcn-pulse" />
          <div v-if="currentStep > idx" class="fcn-check">✓</div>
        </div>
        <div class="fcn-label">{{ stage.name }}</div>
        <div v-if="activeStageId === stage.id" class="fcn-glow" />
      </div>

      <!-- Connectors -->
      <div v-for="(_, idx) in stages.slice(0, -1)" :key="'conn-' + idx" class="fc-connector">
        <div :class="['fc-conn-line', { filled: currentStep > idx }]" />
        <div class="fc-conn-arrow">→</div>
      </div>
    </div>

    <!-- Detail Panel -->
    <transition name="slide-up">
      <div v-if="activeStage" class="fc-detail">
        <div class="fcd-header">
          <span class="fcd-name">{{ activeStage.name }}</span>
          <button class="fcd-close" @click="showDetail = false">✕</button>
        </div>
        <p class="fcd-desc">{{ activeStage.description }}</p>

        <!-- Parameters -->
        <div v-if="activeStage.params && activeStage.params.length > 0" class="fcd-params">
          <div v-for="param in activeStage.params" :key="param.key" class="fcd-param">
            <span class="fcd-param-label">{{ param.label }}</span>
            <span class="fcd-param-val">
              {{ param.type === 'select' ? param.options?.[0] : param.default }}
            </span>
          </div>
        </div>

        <!-- Data Preview -->
        <div v-if="activeStage.dataPreview" class="fcd-preview">
          <span class="fcd-preview-label">数据预览</span>
          <code class="fcd-preview-code">{{ activeStage.dataPreview }}</code>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.flow-chart {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px 20px;
  margin: 12px 0;
  overflow: hidden;
}

.fc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.fc-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent-cyan);
}

.fc-title { font-family: var(--font-display); }

.fc-controls {
  display: flex;
  gap: 4px;
}

.fc-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.fc-btn:hover {
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
}

/* ── Flow Layout ── */
.fc-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
  position: relative;
}

.fc-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
  position: relative;
  min-width: 90px;
}

.fc-node:hover {
  background: rgba(0, 212, 255, 0.04);
}

.fc-node.active {
  background: rgba(0, 212, 255, 0.06);
  transform: translateY(-2px);
}

.fcn-indicator {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fcn-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-text-tertiary);
  transition: all 0.3s var(--ease-out);
}

.fc-node.active .fcn-dot {
  background: var(--color-accent-cyan);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.5);
}

.fc-node.completed .fcn-dot {
  background: var(--color-accent-emerald);
}

.fcn-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--color-accent-cyan);
  animation: fcpulse 1.5s ease-out infinite;
}

@keyframes fcpulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}

.fcn-check {
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-accent-emerald);
}

.fcn-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  white-space: nowrap;
}

.fc-node.active .fcn-label { color: var(--color-accent-cyan); }
.fc-node.completed .fcn-label { color: var(--color-accent-emerald); }

.fcn-glow {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: radial-gradient(circle at center, rgba(0,212,255,0.06), transparent);
  pointer-events: none;
}

/* ── Connectors ── */
.fc-connector {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.fc-conn-line {
  width: 40px;
  height: 2px;
  background: var(--color-border);
  border-radius: 1px;
  transition: background 0.4s var(--ease-out);
}

.fc-conn-line.filled {
  background: var(--color-accent-cyan);
}

.fc-conn-arrow {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* ── Detail Panel ── */
.fc-detail {
  margin-top: 16px;
  padding: 14px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.08);
}

.fcd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.fcd-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent-cyan);
}

.fcd-close {
  font-size: 12px;
  color: var(--color-text-tertiary);
  padding: 2px 6px;
  border-radius: 4px;
}

.fcd-close:hover { color: var(--color-text-primary); }

.fcd-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 12px;
}

.fcd-params {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.fcd-param {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  font-size: 11px;
}

.fcd-param-label { color: var(--color-text-tertiary); }
.fcd-param-val {
  color: var(--color-accent-cyan);
  font-weight: 500;
}

.fcd-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fcd-preview-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-tertiary);
}

.fcd-preview-code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-emerald);
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  line-height: 1.5;
}

/* ── Slide Transition ── */
.slide-up-enter-active { transition: all 0.25s var(--ease-out); }
.slide-up-leave-active { transition: all 0.15s var(--ease-in-out); }
.slide-up-enter-from { opacity: 0; transform: translateY(6px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-4px); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .fc-flow { flex-direction: column; }
  .fc-connector { transform: rotate(90deg); }
}
</style>
