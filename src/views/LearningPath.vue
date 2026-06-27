<template>
  <div class="lp-page">
    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">✦ KNOWLEDGE CONSTELLATION</div>
        <h2 class="lp-section-title">知识星座</h2>
        <p class="lp-section-desc">对话分析后自动生成，智能体持续更新知识点掌握状态。点击星星查看该知识点的学习路径。</p>
      </div>
      <ResourceConstellationView @select-node="onSelectNode" />
    </section>

    <section class="lp-section" v-if="selectedTopic">
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH</div>
        <h2 class="lp-section-title">{{ selectedTopic.label }} · 学习路径</h2>
        <p class="lp-section-desc">「{{ selectedDomain!.name }}」领域 → {{ selectedTopic.label }} 的5阶段学习计划</p>
      </div>
      <ResourcePathLinkView :domain="selectedDomain!" :topic="selectedTopic" />
    </section>

    <section class="lp-section" v-else>
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH</div>
        <h2 class="lp-section-title">学习路径</h2>
        <p class="lp-section-desc">点击上方星座中的任意一颗星星，查看该知识点的详细学习计划</p>
      </div>
      <div class="lp-empty-hint">
        <span class="hint-icon">👆</span>
        <span>请先点击知识星座中的任意一颗星</span>
      </div>
    </section>

    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">◇ KNOWLEDGE MATRIX</div>
        <h2 class="lp-section-title">知识点矩阵</h2>
        <p class="lp-section-desc">认知层级 × 学科领域的掌握度全景</p>
      </div>
      <ResourceMatrixView @select-node="onSelectNode" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useKnowledgeGraphData } from '../composables/useKnowledgeGraphData'
import ResourceConstellationView from '../components/resources/ResourceConstellationView.vue'
import ResourcePathLinkView from '../components/resources/ResourcePathLinkView.vue'
import ResourceMatrixView from '../components/resources/ResourceMatrixView.vue'

const { domains, edges, loading, loadFromBackend } = useKnowledgeGraphData()
const selectedNodeId = ref<string | null>(null)

// 找到被点击的 domain
const selectedDomain = computed(() => {
  if (!selectedNodeId.value) return null
  for (const d of domains.value) {
    if (d.topics.some(t => t.id === selectedNodeId.value)) return d
  }
  return null
})

// 找到被点击的那颗星（单个知识点）
const selectedTopic = computed(() => {
  if (!selectedNodeId.value || !selectedDomain.value) return null
  return selectedDomain.value.topics.find(t => t.id === selectedNodeId.value) || null
})

function onSelectNode(nodeId: string) {
  selectedNodeId.value = selectedNodeId.value === nodeId ? null : nodeId
}

onMounted(() => {
  loadFromBackend(true).catch(() => {})
})
</script>

<style scoped>
.lp-page {
  display: flex;
  flex-direction: column;
}
.lp-section { padding: 0 40px; max-width: 1500px; margin-left: auto; margin-right: auto; width: 100%; }
.lp-section:first-child {
  padding: 24px 100px 0;
  max-width: none;
}
.lp-section-header { padding: 0 0 16px; }
.lp-section-badge {
  font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
  color: rgba(0, 212, 255, 0.6);
  font-family: 'JetBrains Mono', monospace; margin-bottom: 6px;
}
.lp-section-title {
  font-size: 22px; font-weight: 700; color: #f0f2ff;
  margin: 0 0 4px; letter-spacing: -0.01em;
}
.lp-section-desc { font-size: 13px; color: #6f7a9e; margin: 0; }
.lp-section + .lp-section { margin-top: 12px; }
.lp-section:last-child { padding-bottom: 40px; }

.lp-empty-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.4);
  border: 1px dashed rgba(255, 255, 255, 0.08);
  color: #6f7a9e;
  font-size: 14px;
}
.hint-icon { font-size: 20px; }

@media (max-width: 900px) {
  .lp-section { padding: 0 16px; }
}
</style>
