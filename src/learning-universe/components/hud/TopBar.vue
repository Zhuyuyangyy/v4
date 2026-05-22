<template>
  <div class="top-bar glass-deep">
    <div class="bar-left">
      <div class="logo">
        <div class="logo-badge">
          <svg class="logo-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
          </svg>
        </div>
        <div class="logo-copy">
          <span class="logo-kicker">Deep Space</span>
          <span class="logo-text">AI 学习宇宙</span>
        </div>
      </div>
      <div class="sep" />
      <div class="galaxy-info glass-light" v-if="currentGalaxy">
        <span class="galaxy-dot" :style="{ background: currentGalaxy.color }" />
        <div class="galaxy-copy">
          <span class="galaxy-label">当前星域</span>
          <span class="galaxy-name">{{ currentGalaxy.name }}</span>
        </div>
      </div>
    </div>

    <div class="bar-right">
      <div class="progress-block">
        <div class="progress-label">Mastery</div>
        <div class="progress-value">
          {{ Math.round(overallProgress * 100) }}%
          <span>{{ masteredCount }}/{{ totalCount }} 节点已掌握</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${Math.round(overallProgress * 100)}%` }"
          />
        </div>
      </div>

      <div class="top-bar-actions">
        <div class="bookmarks-dropdown" v-if="bookmarkedNodes.length > 0">
          <button class="bookmarks-btn glass-light" @click="showBookmarks = !showBookmarks">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none">
              <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
            </svg>
            <span class="text-xs">{{ bookmarkedNodes.length }}</span>
          </button>
          <Transition name="dropdown">
            <div v-if="showBookmarks" class="bookmarks-list glass">
              <div class="bookmarks-title">收藏节点</div>
              <div
                v-for="bn in bookmarkedNodes"
                :key="bn.id"
                class="bookmark-item"
                @click="jumpToNode(bn)"
              >
                <div class="bookmark-dot" :class="typeDotClass(bn)" />
                <span class="text-xs text-white/75">{{ bn.name }}</span>
              </div>
            </div>
          </Transition>
        </div>

        <div class="zoom-badge glass-light">
          <span class="zoom-label">View</span>
          <span class="zoom-value">{{ zoomLabel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { useAgentStore } from '../../stores/agent'
import type { KnowledgeNode } from '../../types'

const universe = useUniverseStore()
const agentStore = useAgentStore()

const showBookmarks = ref(false)

const currentGalaxy = computed(() => {
  if (!universe.selectedNode) return null
  return universe.galaxyList.find(g => g.id === universe.selectedNode?.galaxy) ?? null
})

const overallProgress = computed(() => universe.overallProgress)
const masteredCount = computed(() => universe.nodes.filter(n => n.mastery >= 0.7).length)
const totalCount = computed(() => universe.nodes.length)
const bookmarkedNodes = computed(() => universe.bookmarkedNodes)

const zoomLabel = computed(() => {
  switch (universe.currentZoomLevel) {
    case 'universe': return '宇宙总览'
    case 'galaxy': return '银河层级'
    case 'system': return '星系结构'
    case 'planet': return '行星细节'
    default: return ''
  }
})

function jumpToNode(node: KnowledgeNode) {
  universe.selectNode(node.id)
  agentStore.navigateTo(node.id)
  showBookmarks.value = false
}

function typeDotClass(node: KnowledgeNode) {
  switch (node.type) {
    case 'knowledge': return 'dot-knowledge'
    case 'project': return 'dot-project'
    case 'exercise': return 'dot-exercise'
    default: return ''
  }
}
</script>

<style scoped>
.top-bar {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  z-index: 12;
}

.bar-left,
.bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-badge {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.24), transparent 45%),
    linear-gradient(145deg, rgba(110, 144, 255, 0.22), rgba(255, 193, 112, 0.18));
  border: 1px solid rgba(192, 208, 255, 0.16);
  box-shadow: 0 0 28px rgba(98, 133, 255, 0.16);
}

.logo-icon {
  color: #e5ecff;
}

.logo-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.logo-kicker {
  font-size: 0.62rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(141, 169, 255, 0.58);
}

.logo-text {
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(248, 250, 255, 0.94);
}

.sep {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.18), transparent);
}

.galaxy-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
}

.galaxy-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 0 18px currentColor;
}

.galaxy-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.galaxy-label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(160, 179, 255, 0.52);
}

.galaxy-name {
  font-size: 0.82rem;
  color: rgba(243, 247, 255, 0.8);
}

.progress-block {
  min-width: 260px;
  text-align: right;
}

.progress-label {
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(160, 179, 255, 0.52);
}

.progress-value {
  margin-top: 3px;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 10px;
  font-size: 1.08rem;
  font-weight: 600;
  color: rgba(249, 251, 255, 0.94);
}

.progress-value span {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(220, 227, 255, 0.56);
}

.progress-bar {
  margin-top: 10px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7698ff, #72ecff 52%, #ffc07c 100%);
  box-shadow: 0 0 24px rgba(108, 141, 255, 0.45);
  transition: width 0.6s ease;
}

.top-bar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.zoom-badge {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  min-width: 118px;
}

.zoom-label {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(161, 180, 255, 0.5);
}

.zoom-value {
  font-size: 0.74rem;
  color: rgba(243, 247, 255, 0.74);
}

.bookmarks-dropdown {
  position: relative;
}

.bookmarks-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border: none;
  cursor: pointer;
  color: #ffd084;
  transition: transform 0.2s ease, background 0.2s ease;
}

.bookmarks-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 208, 132, 0.08);
}

.bookmarks-list {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 240px;
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
  z-index: 30;
}

.bookmarks-title {
  padding: 6px 8px 10px;
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(162, 182, 255, 0.48);
}

.bookmark-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s ease;
}

.bookmark-item:hover {
  background: rgba(111, 145, 255, 0.1);
}

.bookmark-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

:global(.dot-knowledge) { background: #82a8ff; }
:global(.dot-project) { background: #73f0d0; }
:global(.dot-exercise) { background: #ffae6b; }

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .top-bar {
    padding: 12px 16px;
  }

  .progress-block {
    min-width: 220px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    left: 12px;
    right: 12px;
    min-height: 0;
    padding: 14px;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .bar-left,
  .bar-right {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .progress-block {
    min-width: 0;
    flex: 1;
    text-align: left;
  }

  .progress-value {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .top-bar-actions {
    margin-left: auto;
  }

  .zoom-badge {
    min-width: 102px;
  }
}
</style>
