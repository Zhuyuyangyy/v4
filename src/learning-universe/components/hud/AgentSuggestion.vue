<template>
  <Transition name="slide-up">
    <div class="agent-suggestion glass-card" v-if="rec">
      <div class="suggestion-header">
        <div class="agent-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 20h20L12 2z" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </div>
        <div class="flex-1">
          <div class="suggestion-label">AI Navigation</div>
          <div class="suggestion-name">{{ rec.node.name }}</div>
        </div>
        <button class="nav-btn glass-light" @click="navigate" :disabled="agentStore.isNavigating">
          <span v-if="agentStore.isNavigating" class="nav-spinner" />
          <span v-else class="text-xs">导航前往</span>
        </button>
      </div>
      <div class="suggestion-meta">
        <span>难度 {{ difficultyLabel }}</span>
        <span class="meta-sep">路</span>
        <span>掌握度 {{ Math.round(rec.node.mastery * 100) }}%</span>
        <span class="meta-sep">路</span>
        <span>路径 {{ rec.pathLength }} 步</span>
      </div>
      <div class="suggestion-reason">{{ rec.reason }}</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAgentStore } from '../../stores/agent'
import type { AgentRecommendation } from '../../types'

const agentStore = useAgentStore()

const rec = computed<AgentRecommendation | null>(() => agentStore.recommendation)

const difficultyLabel = computed(() => {
  if (!rec.value) return '--'
  const d = rec.value.node.difficulty
  if (d < 0.2) return '入门'
  if (d < 0.4) return '初级'
  if (d < 0.6) return '中级'
  if (d < 0.8) return '高级'
  return '专家'
})

function navigate() {
  if (!rec.value) return
  agentStore.navigateTo(rec.value.nodeId)
}
</script>

<style scoped>
.agent-suggestion {
  position: absolute;
  bottom: 102px;
  right: 20px;
  width: 320px;
  padding: 18px 18px 16px;
  z-index: 10;
}

.suggestion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.agent-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(122, 151, 255, 0.14);
  border-radius: 12px;
  color: #82a8ff;
}

.flex-1 { flex: 1; }

.suggestion-label {
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(143, 170, 255, 0.6);
  margin-bottom: 3px;
}

.suggestion-name {
  font-size: 0.98rem;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
}

.nav-btn {
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.nav-btn:hover { background: rgba(111, 145, 255, 0.16); }
.nav-btn:disabled { opacity: 0.5; cursor: default; }

.nav-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.2);
  border-top-color: #82a8ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.suggestion-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.54);
  margin-bottom: 10px;
}

.meta-sep { color: rgba(255,255,255,0.15); }

.suggestion-reason {
  font-size: 0.76rem;
  color: rgba(231,236,255,0.6);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 10px;
  line-height: 1.65;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .agent-suggestion {
    right: 12px;
    left: 12px;
    width: auto;
    bottom: 84px;
  }
}
</style>
