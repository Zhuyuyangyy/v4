<template>
  <Transition name="slide">
    <div class="knowledge-card glass" v-if="node">
      <div class="card-header">
        <div class="flex items-center gap-3">
          <div class="type-badge" :class="typeClass">{{ typeLabel }}</div>
          <div>
            <div class="panel-kicker">Focused Node</div>
            <div class="text-lg font-bold hud-text mt-1">{{ node.name }}</div>
            <div class="text-xs text-white/40 mt-1">{{ node.nameEn }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="bookmark-btn"
            :class="{ bookmarked: bookmarked }"
            @click="toggleBookmark"
            :title="bookmarked ? '取消收藏' : '收藏节点'"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" :fill="bookmarked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
              <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
            </svg>
          </button>
          <button class="close-btn" @click="close">✕</button>
        </div>
      </div>

      <div class="card-body">
        <p class="text-sm text-white/64 leading-relaxed">{{ node.description }}</p>

        <div class="stats-grid">
          <div class="stat">
            <div class="stat-label">难度强度</div>
            <div class="stat-bar">
              <div class="stat-fill difficulty" :style="{ width: `${node.difficulty * 100}%` }" />
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">掌握程度</div>
            <div class="stat-bar">
              <div class="stat-fill mastery" :style="{ width: `${node.mastery * 100}%` }" />
            </div>
          </div>
        </div>

        <div class="info-row" v-if="node.prerequisites.length > 0">
          <div class="text-xs text-white/40 mb-2">前置知识</div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="pid in node.prerequisites"
              :key="pid"
              class="tag tag-prereq"
              @click="clickTag(pid)"
            >
              {{ getNodeName(pid) }}
            </span>
          </div>
        </div>

        <div class="info-row" v-if="node.next.length > 0">
          <div class="text-xs text-white/40 mb-2">后续延展</div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="nid in node.next"
              :key="nid"
              class="tag tag-next"
              @click="clickTag(nid)"
            >
              {{ getNodeName(nid) }}
            </span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <button class="action-btn glass-light" @click="startLearning">
          开始学习
        </button>
        <button
          class="action-btn-secondary text-xs"
          :class="{ 'mastery-flash': masteryFlashing }"
          @click="markMastered"
        >
          {{ node.mastery >= 0.7 ? '已掌握 ✓' : '标记为已掌握' }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { useAgentStore } from '../../stores/agent'
import type { KnowledgeNode } from '../../types'

const universe = useUniverseStore()
const agentStore = useAgentStore()

const node = computed<KnowledgeNode | null>(() => universe.selectedNode)
const masteryFlashing = ref(false)

const bookmarked = computed(() => node.value && universe.isBookmarked(node.value.id))

const typeLabel = computed(() => {
  if (!node.value) return ''
  switch (node.value.type) {
    case 'knowledge': return '知识'
    case 'project': return '项目'
    case 'exercise': return '练习'
  }
})

const typeClass = computed(() => {
  if (!node.value) return ''
  switch (node.value.type) {
    case 'knowledge': return 'type-knowledge'
    case 'project': return 'type-project'
    case 'exercise': return 'type-exercise'
  }
})

function getNodeName(id: string): string {
  return universe.nodes.find(n => n.id === id)?.name ?? id
}

function close() {
  universe.selectNode(null)
}

function clickTag(nodeId: string) {
  universe.selectNode(nodeId)
  agentStore.navigateTo(nodeId)
}

function startLearning() {
  if (!node.value) return
  agentStore.navigateTo(node.value.id)
}

function toggleBookmark() {
  if (!node.value) return
  universe.toggleBookmark(node.value.id)
}

function markMastered() {
  if (!node.value) return
  const newVal = node.value.mastery >= 0.7 ? 0.3 : 1.0
  universe.updateMastery(node.value.id, newVal)
  agentStore.refreshRecommendation()
  masteryFlashing.value = true
  setTimeout(() => { masteryFlashing.value = false }, 600)
}
</script>

<style scoped>
.knowledge-card {
  position: absolute;
  left: 16px;
  top: 110px;
  bottom: 120px;
  width: 380px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
}

@media (max-width: 768px) {
  .knowledge-card {
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
    width: 100%;
    height: 58vh;
    border-radius: 24px 24px 0 0;
  }
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 22px 22px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.card-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px;
}

.card-footer {
  padding: 16px 22px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 8px;
}

.type-badge {
  font-size: 0.7rem;
  padding: 5px 12px;
  border-radius: 999px;
  white-space: nowrap;
  letter-spacing: 0.08em;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.type-knowledge { background: rgba(130, 168, 255, 0.14); color: #82a8ff; }
.type-project { background: rgba(115, 240, 208, 0.14); color: #73f0d0; }
.type-exercise { background: rgba(255, 174, 107, 0.14); color: #ffae6b; }

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.46);
  cursor: pointer;
  font-size: 1rem;
  padding: 6px;
  border-radius: 10px;
}

.close-btn:hover {
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.04);
}

.stats-grid {
  display: grid;
  gap: 14px;
  margin: 20px 0 10px;
}

.stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(173, 191, 255, 0.44);
  margin-bottom: 8px;
}

.stat-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.5s ease;
}

.stat-fill.difficulty {
  background: linear-gradient(90deg, #73f0d0, #ffd084 52%, #ff95b2 100%);
  box-shadow: 0 0 18px rgba(255, 192, 124, 0.28);
}

.stat-fill.mastery {
  background: linear-gradient(90deg, #76a0ff, #72ecff 100%);
  box-shadow: 0 0 18px rgba(108, 141, 255, 0.34);
}

.info-row {
  margin-top: 18px;
}

.tag {
  font-size: 0.72rem;
  padding: 6px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.tag-prereq {
  background: rgba(143, 109, 255, 0.12);
  color: rgba(203, 188, 255, 0.84);
  border-color: rgba(143, 109, 255, 0.16);
}

.tag-prereq:hover { background: rgba(143, 109, 255, 0.22); }

.tag-next {
  background: rgba(118, 160, 255, 0.12);
  color: rgba(205, 223, 255, 0.84);
  border-color: rgba(118, 160, 255, 0.16);
}

.tag-next:hover { background: rgba(118, 160, 255, 0.22); }

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 0.88rem;
  border-radius: 16px;
  transition: all 0.2s;
}

.action-btn:hover { background: rgba(111, 145, 255, 0.2); }

.bookmark-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.42);
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s;
  border-radius: 10px;
}

.bookmark-btn:hover { color: #ffd084; background: rgba(255, 208, 132, 0.1); }
.bookmark-btn.bookmarked { color: #ffd084; }

.action-btn-secondary {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(239, 244, 255, 0.72);
}

.action-btn-secondary:hover { border-color: rgba(255, 255, 255, 0.2); }

.mastery-flash {
  border-color: #73f0d0 !important;
  background: rgba(115, 240, 208, 0.1) !important;
  color: #73f0d0 !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
