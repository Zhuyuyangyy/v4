<script setup lang="ts">
import { ref } from 'vue'
import GalaxyScene from './GalaxyScene.vue'
import type { GalaxySceneData } from './galaxy.types'

defineProps<{
  galaxyData?: GalaxySceneData
  activePhaseId?: string | null
  loading?: boolean
  empty?: boolean
  error?: boolean
}>()

const emit = defineEmits<{
  'phase-click': [phaseId: string]
  'webgl-error': []
}>()

// Handle WebGL error internally
const hasWebGLError = ref(false)

function onWebGLError() {
  hasWebGLError.value = true
  emit('webgl-error')
}
</script>

<template>
  <div class="galaxy-panel">
    <div class="panel-scene">
      <GalaxyScene v-show="!error && !hasWebGLError" :galaxy-data="galaxyData" :active-phase-id="activePhaseId" @phase-click="$emit('phase-click', $event)" @webgl-error="onWebGLError" />
    </div>

    <div v-if="loading" class="panel-overlay">
      <div class="overlay-content">
        <div class="overlay-spinner" />
        <span>星图加载中...</span>
      </div>
    </div>

    <div v-else-if="error || hasWebGLError" class="panel-overlay">
      <div class="overlay-content">
        <span class="overlay-icon">!</span>
        <span>您的浏览器不支持 3D 加速</span>
      </div>
    </div>

    <div v-else-if="empty" class="panel-overlay">
      <div class="overlay-content">
        <span>开始你的学习之旅</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.galaxy-panel {
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  background: #0c0c1a;
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.panel-scene {
  width: 100%;
  height: 100%;
}

.panel-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  z-index: 10;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-family: var(--font-body);
}

.overlay-icon {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-accent-amber);
}

.overlay-spinner {
  width: 28px;
  height: 28px;
  border: 2px solid rgba(0, 212, 255, 0.15);
  border-top-color: var(--color-accent-cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
