<script setup lang="ts">
import { useRouter } from 'vue-router'
import { X } from '@lucide/vue'
import type { NodeDetail } from './mapTypes'

const props = defineProps<{
  detail: NodeDetail | null
  visible: boolean
  currentMode: string
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

function goToResource() {
  if (!props.detail) return
  router.push({
    name: 'edu-mind',
    query: {
      source: 'star-map',
      mode: props.currentMode,
      nodeId: props.detail.nodeId,
      focus: props.detail.label,
    },
  })
}
</script>

<template>
  <Transition name="knd-slide">
    <div v-if="visible && detail" class="knd-card">
      <div class="knd-header">
        <div class="knd-title-row">
          <span class="knd-mode-tag">{{ detail.mode.toUpperCase() }}</span>
          <h4 class="knd-title">{{ detail.label }}</h4>
        </div>
        <button class="knd-close" @click="emit('close')">
          <X :size="14" />
        </button>
      </div>

      <div class="knd-fields">
        <div v-for="f in detail.fields" :key="f.key" class="knd-field">
          <span class="knd-field-label">{{ f.label }}</span>
          <span class="knd-field-value">{{ f.value }}</span>
        </div>
      </div>

      <button class="knd-btn" @click="goToResource">查看资源 →</button>
    </div>
  </Transition>
</template>

<style scoped>
.knd-card {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 320px;
  background: rgba(8, 16, 42, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 180, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  z-index: 20;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 120, 255, 0.08), inset 0 1px 0 rgba(100, 180, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.knd-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.knd-title-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.knd-mode-tag {
  font-size: 9px;
  font-family: var(--font-mono);
  letter-spacing: 0.22em;
  color: #00d4ff;
  background: rgba(0, 180, 255, 0.1);
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 100px;
  padding: 2px 8px;
  width: fit-content;
}

.knd-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #e8edf5;
  margin: 0;
  line-height: 1.15;
}

.knd-close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.knd-close:hover {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.knd-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.knd-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 8px;
}

.knd-field-label {
  font-size: 11px;
  color: #8892b0;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.knd-field-value {
  font-size: 12px;
  color: #e8edf5;
  font-weight: 500;
  text-align: right;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.knd-btn {
  width: 100%;
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 180, 255, 0.3);
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  font-family: inherit;
}

.knd-btn:hover {
  box-shadow: 0 6px 28px rgba(0, 180, 255, 0.45);
  transform: translateY(-1px);
}

.knd-btn:active {
  transform: translateY(0);
}

.knd-slide-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.knd-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.knd-slide-enter-from { opacity: 0; transform: translateX(16px); }
.knd-slide-leave-to { opacity: 0; transform: translateX(8px); }
</style>
