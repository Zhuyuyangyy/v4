<template>
  <div class="quick-actions glass-light">
    <button class="qa-btn" @click="$emit('continue')" title="继续学习上次的节点">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      <span class="qa-label">继续航行</span>
    </button>
    <div class="qa-divider" />
    <button class="qa-btn" @click="$emit('random')" title="跳转到一个随机未掌握节点">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 2l-6 6M21 2v6M21 2h-6M3 12h6M3 18h6M3 6h6" />
        <path d="M15 22l3-3-3-3" />
        <path d="M9 22l-3-3 3-3" />
      </svg>
      <span class="qa-label">随机探索</span>
    </button>
    <div class="qa-divider" />
    <button class="qa-btn" @click="$emit('weakness')" title="跳转到掌握度最低的节点">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
      <span class="qa-label">攻克弱项</span>
    </button>
    <div class="qa-divider" />
    <button class="qa-btn" @click="showBookmarks = !showBookmarks" title="查看已收藏的节点">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
      <span class="qa-label">收藏夹</span>
      <span v-if="bookmarkedCount > 0" class="qa-badge">{{ bookmarkedCount }}</span>
    </button>

    <Transition name="drop-fade">
      <div v-if="showBookmarks && bookmarkedNodes.length > 0" class="qa-dropdown">
        <div class="qa-dropdown-header">收藏节点</div>
        <div
          v-for="bn in bookmarkedNodes"
          :key="bn.id"
          class="qa-dropdown-item"
          @click="jumpTo(bn)"
        >
          <span class="qa-dropdown-dot" :class="typeDotClass(bn)" />
          <div class="qa-dropdown-info">
            <span class="qa-dropdown-name">{{ bn.name }}</span>
            <span class="qa-dropdown-name-en">{{ bn.nameEn }}</span>
          </div>
          <span class="qa-dropdown-pct">{{ Math.round(bn.mastery * 100) }}%</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { useAgentStore } from '../../stores/agent'
import type { KnowledgeNode } from '../../types'

const emit = defineEmits<{
  (e: 'continue'): void
  (e: 'random'): void
  (e: 'weakness'): void
}>()

const universe = useUniverseStore()
const agentStore = useAgentStore()

const showBookmarks = ref(false)

const bookmarkedNodes = computed(() => universe.bookmarkedNodes)
const bookmarkedCount = computed(() => bookmarkedNodes.value.length)

function typeDotClass(node: KnowledgeNode) {
  switch (node.type) {
    case 'knowledge': return 'dot-knowledge'
    case 'project': return 'dot-project'
    case 'exercise': return 'dot-exercise'
    default: return ''
  }
}

function jumpTo(node: KnowledgeNode) {
  universe.selectNode(node.id)
  agentStore.navigateTo(node.id)
  showBookmarks.value = false
}
</script>

<style scoped>
.quick-actions {
  position: absolute;
  left: 16px;
  bottom: 80px;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 4px;
  z-index: 10;
}

.qa-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  color: rgba(230, 238, 255, 0.65);
  font-size: 0.72rem;
  border-radius: 10px;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  background: transparent;
}
.qa-btn:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(122, 151, 255, 0.08);
}

.qa-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.qa-badge {
  font-size: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(255, 208, 132, 0.15);
  color: #ffd084;
  padding: 1px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

/* ── Dropdown ── */
.qa-dropdown {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 260px;
  max-height: 280px;
  overflow-y: auto;
  background:
    linear-gradient(160deg, rgba(8, 14, 36, 0.96), rgba(4, 8, 18, 0.9));
  border: 1px solid rgba(180, 200, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(24px);
  padding: 8px;
  z-index: 30;
}

.qa-dropdown-header {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(162, 182, 255, 0.4);
  padding: 6px 8px 10px;
}

.qa-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s;
}
.qa-dropdown-item:hover {
  background: rgba(111, 145, 255, 0.1);
}

.qa-dropdown-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.qa-dropdown-info {
  flex: 1;
  min-width: 0;
}

.qa-dropdown-name {
  display: block;
  font-size: 0.78rem;
  color: rgba(248, 250, 255, 0.78);
}

.qa-dropdown-name-en {
  display: block;
  font-size: 0.58rem;
  color: rgba(169, 187, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.qa-dropdown-pct {
  font-size: 0.65rem;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(255, 255, 255, 0.35);
}

.drop-fade-enter-active,
.drop-fade-leave-active {
  transition: all 0.2s ease;
}
.drop-fade-enter-from,
.drop-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
