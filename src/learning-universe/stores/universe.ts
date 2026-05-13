const STORAGE_KEY = 'universe_bookmarks'

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveBookmarks(ids: string[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)) } catch { /* noop */ }
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { knowledgeNodes, galaxies } from '../data/knowledge-graph'
import type { KnowledgeNode, GalaxyCluster } from '../types'

export const useUniverseStore = defineStore('universe', () => {
  const nodes = ref<KnowledgeNode[]>(knowledgeNodes)
  const galaxyList = ref<GalaxyCluster[]>(galaxies)
  const selectedNodeId = ref<string | null>(null)
  const hoveredNodeId = ref<string | null>(null)
  const currentZoomLevel = ref<string>('universe')
  const bookmarkedNodeIds = ref<string[]>(loadBookmarks())

  const selectedNode = computed(() =>
    nodes.value.find(n => n.id === selectedNodeId.value) ?? null,
  )

  const galaxyProgress = computed(() => {
    return galaxyList.value.map(g => {
      const gnodes = nodes.value.filter(n => n.galaxy === g.id)
      const total = gnodes.length
      const mastered = gnodes.filter(n => n.mastery >= 0.7).length
      return {
        galaxy: g,
        progress: total > 0 ? mastered / total : 0,
        mastered,
        total,
      }
    })
  })

  const overallProgress = computed(() => {
    const total = nodes.value.length
    const mastered = nodes.value.filter(n => n.mastery >= 0.7).length
    return total > 0 ? mastered / total : 0
  })

  const bookmarkedNodes = computed(() =>
    nodes.value.filter(n => bookmarkedNodeIds.value.includes(n.id)),
  )

  function selectNode(id: string | null) {
    selectedNodeId.value = id
  }

  function hoverNode(id: string | null) {
    hoveredNodeId.value = id
  }

  function setZoomLevel(level: string) {
    currentZoomLevel.value = level
  }

  function updateMastery(nodeId: string, value: number) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node) {
      node.mastery = Math.max(0, Math.min(1, value))
    }
  }

  function toggleBookmark(nodeId: string) {
    const idx = bookmarkedNodeIds.value.indexOf(nodeId)
    if (idx >= 0) {
      bookmarkedNodeIds.value.splice(idx, 1)
    } else {
      bookmarkedNodeIds.value.push(nodeId)
    }
    saveBookmarks(bookmarkedNodeIds.value)
  }

  function isBookmarked(nodeId: string): boolean {
    return bookmarkedNodeIds.value.includes(nodeId)
  }

  return {
    nodes,
    galaxyList,
    selectedNodeId,
    hoveredNodeId,
    currentZoomLevel,
    bookmarkedNodeIds,
    selectedNode,
    galaxyProgress,
    overallProgress,
    bookmarkedNodes,
    selectNode,
    hoverNode,
    setZoomLevel,
    updateMastery,
    toggleBookmark,
    isBookmarked,
  }
})
