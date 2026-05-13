import { ref, computed } from 'vue'
import { knowledgeNodes } from '../data/knowledge-graph'
import type { KnowledgeNode } from '../types'

export function useSearch() {
  const query = ref('')
  const isOpen = ref(false)
  const selectedIndex = ref(0)

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []

    return knowledgeNodes
      .filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.nameEn.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q),
      )
      .slice(0, 12)
  })

  function search(text: string) {
    query.value = text
    selectedIndex.value = 0
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    query.value = ''
    selectedIndex.value = 0
  }

  function selectNext() {
    if (results.value.length === 0) return
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  }

  function selectPrev() {
    if (results.value.length === 0) return
    selectedIndex.value =
      (selectedIndex.value - 1 + results.value.length) % results.value.length
  }

  function getSelected(): KnowledgeNode | null {
    return results.value[selectedIndex.value] ?? null
  }

  return {
    query,
    isOpen,
    results,
    selectedIndex,
    search,
    close,
    selectNext,
    selectPrev,
    getSelected,
  }
}
