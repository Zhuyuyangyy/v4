<template>
  <Transition name="slide-up">
    <div class="path-panel glass-card" v-if="pathNodes.length > 0">
      <div class="panel-header">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div class="header-text">
          <div class="panel-kicker">Pathway</div>
          <div class="header-title">学习航线</div>
          <div class="header-meta">{{ pathNodes.length }} 个航点 · {{ totalSteps }} 步</div>
        </div>
        <div class="header-progress">
          <div class="progress-ring">
            <svg viewBox="0 0 36 36" width="28" height="28">
              <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3" />
              <path class="ring-fill" :stroke-dasharray="`${progressPct}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#73f0d0" stroke-width="3" stroke-linecap="round" />
            </svg>
            <span class="progress-num">{{ masteredInPath }}/{{ pathNodes.length }}</span>
          </div>
        </div>
      </div>

      <div class="path-timeline">
        <div
          v-for="(node, index) in displayNodes"
          :key="node.id"
          class="path-stop"
          :class="{
            mastered: node.mastery >= 0.7,
            current: index === currentStep,
            future: node.mastery < 0.7 && index !== currentStep,
          }"
          @click="jumpTo(node.id)"
        >
          <div class="stop-line">
            <div class="stop-dot">
              <div class="dot-inner" v-if="node.mastery >= 0.7">✓</div>
            </div>
            <div class="stop-connector" v-if="index < displayNodes.length - 1" />
          </div>
          <div class="stop-info">
            <div class="stop-name">{{ node.name }}</div>
            <div class="stop-detail">
              <span class="detail-type" :class="typeClass(node)">{{ typeLabel(node) }}</span>
              <span class="detail-diff" v-if="node.difficulty > 0">
                难度 {{ Math.round(node.difficulty * 100) }}
              </span>
              <span class="detail-mastery" v-if="node.mastery >= 0.7">已掌握</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="displayNodes.length < pathNodes.length" class="expand-hint" @click="expanded = true">
        <span class="text-xs text-white/35">还有 {{ pathNodes.length - displayNodes.length }} 个航点</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" class="expand-arrow">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAgentStore } from '../../stores/agent'
import { useUniverseStore } from '../../stores/universe'
import type { KnowledgeNode } from '../../types'

const agentStore = useAgentStore()
const universe = useUniverseStore()
const expanded = ref(false)

const pathNodes = computed(() => agentStore.currentPath)

const displayNodes = computed(() => {
  if (expanded.value || pathNodes.value.length <= 8) return pathNodes.value
  return pathNodes.value.slice(0, 6)
})

const currentStep = computed(() =>
  Math.floor(agentStore.shipProgress * (pathNodes.value.length - 1)),
)

const masteredInPath = computed(() =>
  pathNodes.value.filter(n => n.mastery >= 0.7).length,
)

const totalSteps = computed(() =>
  pathNodes.value.length > 0 ? pathNodes.value.length - 1 : 0,
)

const progressPct = computed(() => {
  if (pathNodes.value.length === 0) return 0
  return Math.round((masteredInPath.value / pathNodes.value.length) * 100)
})

function typeLabel(node: KnowledgeNode): string {
  switch (node.type) {
    case 'knowledge': return '知识'
    case 'project': return '项目'
    case 'exercise': return '练习'
    default: return ''
  }
}

function typeClass(node: KnowledgeNode): string {
  switch (node.type) {
    case 'knowledge': return 'type-k'
    case 'project': return 'type-p'
    case 'exercise': return 'type-e'
    default: return ''
  }
}

function jumpTo(nodeId: string) {
  universe.selectNode(nodeId)
  agentStore.navigateTo(nodeId)
}
</script>

<style scoped>
.path-panel {
  position: absolute;
  left: 16px;
  bottom: 120px;
  width: 320px;
  padding: 16px;
  z-index: 10;
  max-height: 360px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .path-panel {
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    width: min(90vw, 340px);
    max-height: 280px;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 12px;
}

.header-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(122, 151, 255, 0.14);
  border-radius: 12px;
  color: #82a8ff;
  flex-shrink: 0;
}

.header-text { flex: 1; min-width: 0; }
.header-title { margin-top: 4px; font-size: 0.94rem; font-weight: 600; color: rgba(248,250,255,0.9); }
.header-meta { font-size: 0.66rem; color: rgba(221,228,255,0.44); margin-top: 3px; }

.header-progress { flex-shrink: 0; }

.progress-ring {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-num {
  position: absolute;
  font-size: 0.52rem;
  color: rgba(255,255,255,0.62);
  font-weight: 600;
}

.path-timeline {
  max-height: 250px;
  overflow-y: auto;
  padding-right: 4px;
}

.path-stop {
  display: flex;
  gap: 10px;
  padding: 7px 6px;
  cursor: pointer;
  border-radius: 14px;
  transition: background 0.2s, transform 0.2s ease;
}

.path-stop:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateX(2px);
}

.stop-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.stop-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
  font-size: 0.45rem;
  color: #73f0d0;
}

.path-stop.mastered .stop-dot {
  border-color: #73f0d0;
  background: rgba(115, 240, 208, 0.12);
}

.path-stop.current .stop-dot {
  border-color: #ffd084;
  background: rgba(255, 208, 132, 0.16);
  box-shadow: 0 0 12px rgba(255, 208, 132, 0.26);
}

.dot-inner {
  line-height: 1;
}

.stop-connector {
  width: 1px;
  flex: 1;
  min-height: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03));
  margin: 3px 0;
}

.path-stop.current .stop-connector {
  background: linear-gradient(180deg, #ffd084, rgba(255,255,255,0.03));
}

.path-stop.mastered .stop-connector {
  background: linear-gradient(180deg, #73f0d0, rgba(255,255,255,0.03));
}

.stop-info {
  flex: 1;
  min-width: 0;
  padding-top: 2px;
}

.stop-name {
  font-size: 0.8rem;
  color: rgba(248, 250, 255, 0.78);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
}

.path-stop.current .stop-name {
  color: #ffd084;
}

.path-stop.mastered .stop-name {
  color: rgba(255, 255, 255, 0.5);
}

.stop-detail {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.34);
}

.detail-type {
  padding: 2px 7px;
  border-radius: 999px;
}

.type-k { background: rgba(130, 168, 255, 0.1); color: rgba(130, 168, 255, 0.72); }
.type-p { background: rgba(115, 240, 208, 0.1); color: rgba(115, 240, 208, 0.72); }
.type-e { background: rgba(255, 174, 107, 0.1); color: rgba(255, 174, 107, 0.72); }

.detail-mastery { color: #73f0d0; }

.expand-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px 6px;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 6px;
  transition: background 0.2s;
}

.expand-hint:hover { background: rgba(255, 255, 255, 0.03); }

.expand-arrow {
  transition: transform 0.2s;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
