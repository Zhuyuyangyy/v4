<template>
  <div class="search-bar" :class="{ open: isOpen && results.length > 0 }">
    <div class="search-input-wrapper glass-light">
      <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="search-input"
        placeholder="搜索知识节点、课程方向、AI 推荐..."
        @input="onInput"
        @keydown.escape="closeSearch"
        @keydown.down.prevent="searchCtrl.selectNext()"
        @keydown.up.prevent="searchCtrl.selectPrev()"
        @keydown.enter="onEnter"
      />
      <button v-if="query" class="search-clear" @click="clearSearch">✕</button>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen && results.length > 0" class="search-results glass">
        <div
          v-for="(node, i) in results"
          :key="node.id"
          class="search-result-item"
          :class="{ highlighted: i === searchCtrl.selectedIndex.value }"
          @click="selectNode(node)"
          @mouseenter="setSelectedIndex(i)"
        >
          <div class="result-left">
            <span class="result-type-dot" :class="typeClass(node)" />
            <div>
              <div class="result-name">{{ node.name }}</div>
              <div class="result-name-en">{{ node.nameEn }}</div>
            </div>
          </div>
          <div class="result-meta">
            <span class="result-mastery">{{ Math.round(node.mastery * 100) }}%</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearch } from '../../composables/useSearch'
import { useUniverseStore } from '../../stores/universe'
import { useAgentStore } from '../../stores/agent'
import type { KnowledgeNode } from '../../types'
import * as THREE from 'three'
import type { GalaxyClusterNode } from '../../three/GalaxyCluster'
import type { SceneState } from '../../composables/useScene'

defineProps<{
  sceneState: SceneState | null
  galaxyClusters: GalaxyClusterNode[]
  cameraCtrl: any
}>()

const emit = defineEmits<{
  flyTo: [pos: THREE.Vector3, nodeId: string]
}>()

const universe = useUniverseStore()
const agentStore = useAgentStore()
const searchCtrl = useSearch()
const inputRef = ref<HTMLInputElement>()

const query = ref('')
const isOpen = ref(false)
const results = ref<KnowledgeNode[]>([])

watch(() => searchCtrl.query.value, v => { query.value = v })
watch(() => query.value, v => { searchCtrl.query.value = v })
watch(() => searchCtrl.isOpen.value, v => { isOpen.value = v })
watch(() => searchCtrl.results.value, v => { results.value = v })

function onInput() {
  searchCtrl.search(query.value)
}

function clearSearch() {
  query.value = ''
  searchCtrl.close()
  inputRef.value?.focus()
}

function closeSearch() {
  searchCtrl.close()
}

function selectNode(node: KnowledgeNode) {
  searchCtrl.close()
  universe.selectNode(node.id)

  const worldPos = new THREE.Vector3(...node.position)
  emit('flyTo', worldPos, node.id)
  agentStore.navigateTo(node.id)
}

function onEnter() {
  const sel = searchCtrl.getSelected()
  if (sel) selectNode(sel)
}

function setSelectedIndex(index: number) {
  searchCtrl.selectedIndex.value = index
}

function typeClass(node: KnowledgeNode) {
  switch (node.type) {
    case 'knowledge': return 'dot-knowledge'
    case 'project': return 'dot-project'
    case 'exercise': return 'dot-exercise'
    default: return ''
  }
}
</script>

<style scoped>
.search-bar {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: min(640px, calc(100vw - 440px));
  z-index: 20;
}

@media (max-width: 768px) {
  .search-bar {
    top: 104px;
    width: calc(100vw - 24px);
  }
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  min-height: 56px;
  border-radius: 20px;
  border: 1px solid rgba(200, 216, 255, 0.1);
  transition: border-color 0.2s, transform 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: rgba(122, 151, 255, 0.34);
  transform: translateY(-1px);
}

.search-icon {
  color: rgba(214, 224, 255, 0.44);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: rgba(249, 251, 255, 0.92);
  font-size: 0.95rem;
  font-family: inherit;
}

.search-input::placeholder {
  color: rgba(216, 225, 255, 0.34);
}

.search-clear {
  background: none;
  border: none;
  color: rgba(220, 227, 255, 0.4);
  cursor: pointer;
  font-size: 0.78rem;
  padding: 4px;
}

.search-clear:hover {
  color: rgba(255, 255, 255, 0.8);
}

.search-results {
  margin-top: 10px;
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid rgba(197, 213, 255, 0.1);
  border-radius: 20px;
}

.search-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}

.search-result-item:hover,
.search-result-item.highlighted {
  background: rgba(111, 145, 255, 0.11);
  transform: translateX(2px);
}

.result-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.result-type-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 14px currentColor;
}

.dot-knowledge { background: #82a8ff; }
.dot-project { background: #73f0d0; }
.dot-exercise { background: #ffae6b; }

.result-name {
  font-size: 0.85rem;
  color: rgba(249, 251, 255, 0.88);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-name-en {
  margin-top: 3px;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(169, 187, 255, 0.42);
}

.result-meta {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.48);
  flex-shrink: 0;
}

.result-mastery {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.22s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
