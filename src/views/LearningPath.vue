<template>
  <div class="lp-page">
    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">✦ KNOWLEDGE CONSTELLATION</div>
        <h2 class="lp-section-title">知识星座</h2>
        <p class="lp-section-desc">对话分析后自动生成，智能体持续更新知识点掌握状态</p>
      </div>
      <ResourceConstellationView />
    </section>

    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH</div>
        <h2 class="lp-section-title">学习路径</h2>
        <p class="lp-section-desc">根据当前学习阶段，逐步解锁闯关</p>
      </div>
      <ResourcePathLinkView />
    </section>

    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">◇ KNOWLEDGE MATRIX</div>
        <h2 class="lp-section-title">知识点矩阵</h2>
        <p class="lp-section-desc">认知层级 × 学科领域的掌握度全景</p>
      </div>
      <ResourceMatrixView />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useKnowledgeGraphData } from '../composables/useKnowledgeGraphData'
import ResourceConstellationView from '../components/resources/ResourceConstellationView.vue'
import ResourcePathLinkView from '../components/resources/ResourcePathLinkView.vue'
import ResourceMatrixView from '../components/resources/ResourceMatrixView.vue'

const { domains, edges, loading, loadFromBackend } = useKnowledgeGraphData()

onMounted(() => {
  loadFromBackend().catch(() => {})
})
</script>

<style scoped>
.lp-page {
  display: flex;
  flex-direction: column;
}
.lp-section { padding: 0 40px; }
.lp-section:first-child { padding-top: 24px; }
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
@media (max-width: 900px) {
  .lp-section { padding: 0 16px; }
}
</style>
