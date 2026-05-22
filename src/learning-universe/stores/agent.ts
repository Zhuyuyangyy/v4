import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AgentRecommendation } from '../types'
import { useAgent } from '../composables/useAgent'

export const useAgentStore = defineStore('agent', () => {
  const {
    recommendedNode,
    currentPath,
    recommendNext,
    getPathToNode,
    findMasteredNodes,
    findUnlockedNodes,
  } = useAgent()

  const recommendation = ref<AgentRecommendation | null>(null)
  const isNavigating = ref(false)
  const shipProgress = ref(0)

  function refreshRecommendation() {
    recommendation.value = recommendNext()
  }

  function navigateTo(nodeId: string) {
    const path = getPathToNode(nodeId)
    const targetNode = path[path.length - 1]
    isNavigating.value = true
    shipProgress.value = 0

    if (targetNode) {
      recommendation.value = {
        nodeId,
        node: targetNode,
        pathLength: path.length,
        reason: `正在导航到 ${targetNode.name}`,
      }
    }
  }

  function updateShipProgress(delta: number) {
    if (!isNavigating.value) return
    shipProgress.value += delta * 0.3
    if (shipProgress.value >= 1) {
      shipProgress.value = 0
      isNavigating.value = false
    }
  }

  return {
    recommendation,
    recommendedNode,
    currentPath,
    isNavigating,
    shipProgress,
    refreshRecommendation,
    navigateTo,
    updateShipProgress,
    findMasteredNodes,
    findUnlockedNodes,
  }
})
