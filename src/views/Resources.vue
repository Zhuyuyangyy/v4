<script setup lang="ts">
import { ref, computed } from 'vue'

type ResourceType = 'all' | 'doc' | 'mindmap' | 'exercise' | 'video' | 'code'

const activeFilter = ref<ResourceType>('all')

const filterTabs: { key: ResourceType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'doc', label: '文档' },
  { key: 'mindmap', label: '思维导图' },
  { key: 'exercise', label: '习题' },
  { key: 'video', label: '视频' },
  { key: 'code', label: '代码' },
]

const resources = [
  { type: 'doc' as const, icon: '≡', title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战', tags: ['Python', 'ML'], date: '2026-05-10', color: '#00d4ff' },
  { type: 'mindmap' as const, icon: '◈', title: '深度学习知识图谱', desc: '神经网络、CNN、RNN 架构全景图', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed' },
  { type: 'exercise' as const, icon: '✎', title: '线性代数基础习题', desc: '矩阵运算、特征值、向量空间', tags: ['数学', '练习'], date: '2026-05-08', color: '#06d6a0' },
  { type: 'video' as const, icon: '▶', title: 'Transformer 原理解析', desc: 'Attention 机制与多头注意力详解', tags: ['NLP', '进阶'], date: '2026-05-07', color: '#f59e0b' },
  { type: 'code' as const, icon: '⟨/⟩', title: 'KNN 算法实现', desc: '从零实现 K-近邻分类器', tags: ['算法', '实现'], date: '2026-05-06', color: '#f43f5e' },
  { type: 'doc' as const, icon: '≡', title: '概率论与数理统计速查', desc: '常见分布、假设检验、贝叶斯公式', tags: ['数学', '统计'], date: '2026-05-05', color: '#00d4ff' },
  { type: 'mindmap' as const, icon: '◈', title: '数据结构思维导图', desc: '数组、链表、树、图、哈希表', tags: ['CS基础', '架构'], date: '2026-05-04', color: '#7c3aed' },
  { type: 'exercise' as const, icon: '✎', title: '动态规划专项练习', desc: '经典 DP 问题与解题模板', tags: ['算法', '进阶'], date: '2026-05-03', color: '#06d6a0' },
  { type: 'video' as const, icon: '▶', title: 'PyTorch 快速上手', desc: '张量运算、自动求导、模型构建', tags: ['框架', '入门'], date: '2026-05-02', color: '#f59e0b' },
]

const filtered = computed(() => {
  if (activeFilter.value === 'all') return resources
  return resources.filter(r => r.type === activeFilter.value)
})

</script>

<template>
  <div class="resources">
    <div class="page-header reveal">
      <h1 class="page-title">学习资源中心</h1>
      <p class="page-desc">所有 AI 为你生成的学习资源，集中管理</p>
    </div>

    <!-- Filters -->
    <div class="filters reveal reveal-delay-1">
      <div class="filter-tabs">
        <button
          v-for="f in filterTabs"
          :key="f.key"
          :class="['filter-tab', { active: activeFilter === f.key }]"
          @click="activeFilter = f.key"
        >
          {{ f.label }}
        </button>
      </div>
      <div class="filter-search">
        <span class="search-icon">◎</span>
        <input type="text" placeholder="搜索资源..." />
      </div>
    </div>

    <!-- Grid -->
    <div class="resources-grid">
      <div
        v-for="(r, i) in filtered"
        :key="r.title"
        :class="['resource-card reveal', `reveal-delay-${(i % 4) + 1}`]"
        :style="{ '--card-accent': r.color }"
      >
        <div class="card-top">
          <span class="card-icon">{{ r.icon }}</span>
          <span class="card-type">{{ filterTabs.find(f => f.key === r.type)?.label }}</span>
        </div>
        <h3 class="card-title">{{ r.title }}</h3>
        <p class="card-desc">{{ r.desc }}</p>
        <div class="card-tags">
          <span v-for="tag in r.tags" :key="tag" class="card-tag">{{ tag }}</span>
        </div>
        <div class="card-footer">
          <span class="card-date">{{ r.date }}</span>
          <button class="card-action">查看 →</button>
        </div>
        <div class="card-glow" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.resources {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* === Filters === */
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.filter-tab {
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.filter-tab:hover {
  color: var(--color-text-primary);
}
.filter-tab.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
}

.filter-search {
  position: relative;
}

.filter-search input {
  padding: 10px 14px 10px 36px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 13px;
  width: 240px;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.filter-search input:focus {
  border-color: var(--color-accent-cyan);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: 14px;
}

/* === Grid === */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.resource-card {
  position: relative;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.resource-card:hover {
  border-color: var(--card-accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--card-accent), transparent);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}
.resource-card:hover .card-glow {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  border-radius: var(--radius-sm);
  background: rgba(0, 212, 255, 0.06);
  color: var(--card-accent);
}

.card-type {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  letter-spacing: 0.3px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 19px;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.card-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-date {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.card-action {
  font-size: 13px;
  color: var(--card-accent);
  transition: gap var(--duration-fast) var(--ease-out);
}
.card-action:hover {
  text-shadow: 0 0 10px var(--card-accent);
}
</style>
