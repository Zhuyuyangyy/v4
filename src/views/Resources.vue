<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  LayoutGrid,
  FileText,
  Map,
  PenTool,
  Play,
  Code,
  Search,
  ArrowRight,
  Star,
  Sparkles,
} from 'lucide-vue-next'

type ResourceType = 'all' | 'doc' | 'mindmap' | 'exercise' | 'video' | 'code'

const activeFilter = ref<ResourceType>('all')
const searchQuery = ref('')
const selectedResource = ref<null | typeof resources[0]>(null)
const showDetail = ref(false)
const bookmarks = ref<Set<number>>(new Set([0, 3]))

const filterTabs: { key: ResourceType; label: string; icon: any }[] = [
  { key: 'all', label: '全部', icon: LayoutGrid },
  { key: 'doc', label: '文档', icon: FileText },
  { key: 'mindmap', label: '思维导图', icon: Map },
  { key: 'exercise', label: '习题', icon: PenTool },
  { key: 'video', label: '视频', icon: Play },
  { key: 'code', label: '代码', icon: Code },
]

const resourceIcons: Record<string, any> = {
  doc: FileText,
  mindmap: Map,
  exercise: PenTool,
  video: Play,
  code: Code,
}

const resources = [
  { id: 0, type: 'doc' as const, title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战，涵盖监督学习、无监督学习、模型评估等内容，适合初学者入门。', tags: ['Python', 'ML'], date: '2026-05-10', color: '#00d4ff', reads: 234 },
  { id: 1, type: 'mindmap' as const, title: '深度学习知识图谱', desc: '神经网络、CNN、RNN 架构全景图，清晰梳理深度学习各分支之间的关系与发展脉络。', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189 },
  { id: 2, type: 'exercise' as const, title: '线性代数基础习题', desc: '矩阵运算、特征值、向量空间，精选 50 道经典习题，覆盖线性代数核心知识点。', tags: ['数学', '练习'], date: '2026-05-08', color: '#06d6a0', reads: 156 },
  { id: 3, type: 'video' as const, title: 'Transformer 原理解析', desc: '深入讲解 Attention 机制与多头注意力，从论文推导到代码实现，全面掌握 Transformer 架构。', tags: ['NLP', '进阶'], date: '2026-05-07', color: '#f59e0b', reads: 312 },
  { id: 4, type: 'code' as const, title: 'KNN 算法实现', desc: '从零实现 K-近邻分类器，包含完整的 Python 代码、测试用例和性能优化技巧。', tags: ['算法', '实现'], date: '2026-05-06', color: '#f43f5e', reads: 98 },
  { id: 5, type: 'doc' as const, title: '概率论与数理统计速查', desc: '常见分布、假设检验、贝叶斯公式，一份全面的概率论速查手册。', tags: ['数学', '统计'], date: '2026-05-05', color: '#00d4ff', reads: 201 },
  { id: 6, type: 'mindmap' as const, title: '数据结构思维导图', desc: '数组、链表、树、图、哈希表，数据结构知识点全景梳理，面试复习必备。', tags: ['CS基础', '架构'], date: '2026-05-04', color: '#7c3aed', reads: 267 },
  { id: 7, type: 'exercise' as const, title: '动态规划专项练习', desc: '经典 DP 问题与解题模板，从背包问题到区间 DP，逐步提升算法能力。', tags: ['算法', '进阶'], date: '2026-05-03', color: '#06d6a0', reads: 143 },
  { id: 8, type: 'video' as const, title: 'PyTorch 快速上手', desc: '张量运算、自动求导、模型构建，30 分钟快速掌握 PyTorch 核心功能。', tags: ['框架', '入门'], date: '2026-05-02', color: '#f59e0b', reads: 378 },
]

const recommended = [
  { id: 9, type: 'video' as const, title: '机器学习数学基础', desc: '微积分、线性代数、概率论在 ML 中的应用', tags: ['数学', 'ML'], date: '2026-05-11', color: '#00d4ff', reads: 89 },
  { id: 10, type: 'doc' as const, title: '模型部署实战指南', desc: '从训练到生产，ML 模型部署全流程解析', tags: ['工程', '进阶'], date: '2026-05-11', color: '#7c3aed', reads: 67 },
  { id: 11, type: 'code' as const, title: 'Git 版本控制入门', desc: '团队协作必备，Git 工作流与最佳实践', tags: ['工具', '基础'], date: '2026-05-10', color: '#06d6a0', reads: 45 },
]

const filtered = computed(() => {
  return resources.filter(r => {
    if (activeFilter.value !== 'all' && r.type !== activeFilter.value) return false
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      return r.title.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q))
    }
    return true
  })
})

const filterCounts = computed(() => {
  const counts: Record<string, number> = { all: resources.length }
  filterTabs.slice(1).forEach(f => {
    counts[f.key] = resources.filter(r => r.type === f.key).length
  })
  return counts
})

function toggleBookmark(id: number) {
  if (bookmarks.value.has(id)) bookmarks.value.delete(id)
  else bookmarks.value.add(id)
}

function openDetail(r: typeof resources[0]) {
  selectedResource.value = r
  showDetail.value = true
}

function closeDetail() {
  showDetail.value = false
  setTimeout(() => { selectedResource.value = null }, 200)
}
</script>

<template>
  <div class="resources">
    <div class="page-header reveal">
      <h1 class="page-title">学习资源中心</h1>
      <p class="page-desc">所有 AI 为你生成的学习资源，集中管理，随时查阅</p>
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
          <span class="filter-tab-icon">
              <component :is="f.icon" :size="14" stroke-width="1.5" />
            </span>
          <span>{{ f.label }}</span>
          <span class="filter-count">{{ filterCounts[f.key] }}</span>
        </button>
      </div>
      <div class="filter-search">
        <Search :size="16" stroke-width="1.5" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索资源..."
        />
      </div>
    </div>

    <!-- Grid -->
    <div class="resources-grid">
      <div
        v-for="(r, i) in filtered"
        :key="r.id"
        :class="['resource-card reveal', `reveal-delay-${(i % 4) + 1}`]"
        :style="{ '--card-accent': r.color }"
        @click="openDetail(r)"
      >
        <div class="card-top">
          <div class="card-icon-wrapper">
              <component :is="resourceIcons[r.type]" :size="18" stroke-width="1.5" class="card-icon" />
            </div>
          <span class="card-type">{{ filterTabs.find(f => f.key === r.type)?.label }}</span>
          <button
            :class="['bookmark-btn', { active: bookmarks.has(r.id) }]"
            @click.stop="toggleBookmark(r.id)"
          >
            {{ bookmarks.has(r.id) ? '★' : '☆' }}
          </button>
        </div>
        <h3 class="card-title">{{ r.title }}</h3>
        <p class="card-desc">{{ r.desc }}</p>
        <div class="card-tags">
          <span v-for="tag in r.tags" :key="tag" class="card-tag">{{ tag }}</span>
        </div>
        <div class="card-footer">
          <div class="card-meta">
            <span class="card-date">{{ r.date }}</span>
            <span class="card-reads">{{ r.reads }} 次阅读</span>
          </div>
          <button class="card-action" @click.stop="openDetail(r)">
            查看详情 →
          </button>
        </div>
        <div class="card-glow" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filtered.length === 0" class="empty-state">
      <span class="empty-icon">
        <Search :size="40" stroke-width="1" />
      </span>
      <h3>没有找到匹配的资源</h3>
      <p>尝试更换筛选条件或搜索关键词</p>
    </div>

    <!-- Recommended -->
    <div v-if="activeFilter === 'all' && !searchQuery" class="recommended-section reveal reveal-delay-3">
      <div class="section-header">
        <h2 class="section-title">
                    <span class="section-accent">
          <Sparkles :size="18" stroke-width="1.5" />
        </span>
          为你推荐
        </h2>
        <span class="section-sub">基于你的学习画像和兴趣</span>
      </div>
      <div class="recommended-grid">
        <div
          v-for="r in recommended"
          :key="r.id"
          class="recommended-card"
          :style="{ '--card-accent': r.color }"
          @click="openDetail(r)"
        >
          <div class="rec-top">
            <span class="rec-badge">NEW</span>
              <component :is="resourceIcons[r.type]" :size="18" stroke-width="1.5" class="rec-icon" />
          </div>
          <h4 class="rec-title">{{ r.title }}</h4>
          <p class="rec-desc">{{ r.desc }}</p>
          <div class="rec-footer">
            <span class="rec-tag" v-for="tag in r.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Overlay -->
    <transition name="scale-in">
      <div v-if="showDetail && selectedResource" class="detail-overlay" @click.self="closeDetail">
        <div class="detail-modal" :style="{ '--modal-accent': selectedResource.color }">
          <div class="detail-top">
            <div class="detail-type">
              <component :is="resourceIcons[selectedResource.type]" :size="18" stroke-width="1.5" class="detail-type-icon" />
              <span>{{ filterTabs.find(f => f.key === selectedResource.type)?.label }}</span>
            </div>
            <button class="detail-close" @click="closeDetail">✕</button>
          </div>

          <h2 class="detail-title">{{ selectedResource.title }}</h2>
          <p class="detail-desc">{{ selectedResource.desc }}</p>

          <div class="detail-tags">
            <span v-for="tag in selectedResource.tags" :key="tag" class="detail-tag">{{ tag }}</span>
          </div>

          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">创建日期</span>
              <span class="meta-value">{{ selectedResource.date }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">阅读次数</span>
              <span class="meta-value">{{ selectedResource.reads }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">资源类型</span>
              <span class="meta-value">{{ filterTabs.find(f => f.key === selectedResource.type)?.label }}</span>
            </div>
          </div>

          <div class="detail-preview">
            <h3 class="preview-title">内容预览</h3>
            <div class="preview-content">
              <p>本章节介绍了{{ selectedResource.title }}的核心概念和关键知识点。内容包括基础理论、实践应用和进阶拓展三个部分，帮助你系统性地掌握相关知识。</p>
              <p>学习完本资源后，建议完成配套练习以巩固所学内容。如遇到任何问题，可以随时向 AI 辅导师提问。</p>
            </div>
          </div>

          <div class="detail-actions">
            <button class="detail-btn primary">
              <span>开始学习</span>
              <span>→</span>
            </button>
            <button :class="['detail-btn ghost', { bookmarked: bookmarks.has(selectedResource.id) }]" @click="toggleBookmark(selectedResource.id)">
              {{ bookmarks.has(selectedResource.id) ? '★ 已收藏' : '☆ 收藏' }}
            </button>
            <button class="detail-btn ghost">下载</button>
          </div>
        </div>
      </div>
    </transition>
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
  color: #fff;
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
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.filter-tab:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.03);
}
.filter-tab.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  box-shadow: 0 2px 12px rgba(0, 212, 255, 0.25);
}

.filter-tab-icon {
  font-size: 12px;
}

.filter-count {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  font-family: var(--font-mono);
}

.filter-search {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: 13px;
  opacity: 0.5;
}

.filter-search input {
  padding: 10px 14px 10px 38px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 13px;
  width: 240px;
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-out);
}
.filter-search input:focus {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.06);
}
.filter-search input::placeholder {
  color: var(--color-text-tertiary);
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
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}
.resource-card:hover {
  border-color: var(--card-accent);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
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
  gap: 10px;
  margin-bottom: 14px;
}

.card-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.card-icon {
  font-size: 16px;
  color: var(--card-accent);
}

.card-type {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  letter-spacing: 0.3px;
}

.bookmark-btn {
  margin-left: auto;
  font-size: 16px;
  color: var(--color-text-tertiary);
  padding: 4px;
  transition: all var(--duration-fast) var(--ease-out);
}
.bookmark-btn:hover {
  color: var(--color-accent-amber);
  transform: scale(1.1);
}
.bookmark-btn.active {
  color: #f59e0b;
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.card-title {
  font-family: var(--font-display);
  font-size: 20px;
  margin-bottom: 8px;
  line-height: 1.3;
  color: #fff;
}

.card-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-date {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.card-reads {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.card-action {
  font-size: 13px;
  color: var(--card-accent);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-out);
}
.card-action:hover {
  background: rgba(0, 0, 0, 0.2);
  text-shadow: 0 0 10px var(--card-accent);
}

/* === Empty State === */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;
}

.empty-icon {
  font-size: 48px;
  color: var(--color-text-tertiary);
  opacity: 0.3;
  margin-bottom: 16px;
  display: block;
}

.empty-state h3 {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

/* === Recommended === */
.recommended-section {
  margin-top: 48px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 28px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-accent {
  color: var(--color-accent-cyan);
  font-size: 20px;
}

.section-sub {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.recommended-card {
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}
.recommended-card:hover {
  border-color: var(--card-accent);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.rec-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.rec-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  letter-spacing: 0.5px;
}

.rec-icon {
  font-size: 16px;
  color: var(--card-accent);
  margin-left: auto;
}

.rec-title {
  font-family: var(--font-display);
  font-size: 17px;
  color: #fff;
  margin-bottom: 6px;
}

.rec-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-footer {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.rec-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
}

/* === Detail Overlay === */
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 40px;
}

.detail-modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--modal-accent);
  border-radius: var(--radius-xl);
  padding: 40px;
  max-width: 640px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

.detail-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.detail-type {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--modal-accent);
  font-weight: 500;
}

.detail-type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.3);
  font-size: 14px;
}

.detail-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  transition: all var(--duration-fast) var(--ease-out);
}
.detail-close:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text-primary);
}

.detail-title {
  font-family: var(--font-display);
  font-size: 32px;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
}

.detail-desc {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.detail-tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.detail-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.meta-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.detail-preview {
  margin-bottom: 28px;
}

.preview-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: #fff;
  margin-bottom: 12px;
}

.preview-content {
  padding: 16px 20px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border);
}

.preview-content p {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 8px;
}
.preview-content p:last-child {
  margin-bottom: 0;
}

.detail-actions {
  display: flex;
  gap: 12px;
}

.detail-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  transition: all var(--duration-fast) var(--ease-out);
}

.detail-btn.primary {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
}
.detail-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.4);
}

.detail-btn.ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}
.detail-btn.ghost:hover {
  border-color: var(--modal-accent);
  color: var(--modal-accent);
}
.detail-btn.ghost.bookmarked {
  color: var(--color-accent-amber);
  border-color: rgba(245, 158, 11, 0.3);
}

@media (max-width: 900px) {
  .resources-grid { grid-template-columns: 1fr; }
  .recommended-grid { grid-template-columns: 1fr; }
  .detail-meta { grid-template-columns: 1fr; }
  .filters { flex-direction: column; align-items: stretch; }
  .filter-search input { width: 100%; }
}
</style>
