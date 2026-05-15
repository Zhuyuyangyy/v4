<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  ChevronRight,
  Code,
  Eye,
  FileText,
  LayoutGrid,
  Map,
  PenTool,
  Play,
  Route,
  Search,
  Sparkles,
  Star,
} from 'lucide-vue-next'
import { fetchRecommendedResources, fetchResources } from '@/lib/api'
import type { ApiResource } from '@/types/api'

type ResourceType = 'all' | 'doc' | 'mindmap' | 'exercise' | 'video' | 'code' | 'flowchart'

const router = useRouter()

const activeFilter = ref<ResourceType>('all')
const searchQuery = ref('')
const selectedResource = ref<ApiResource | null>(null)
const showDetail = ref(false)
const bookmarks = ref<Set<number>>(new Set([0, 3]))
const isLoading = ref(false)

const filterTabs: { key: ResourceType; label: string; icon: unknown }[] = [
  { key: 'all', label: '全部', icon: LayoutGrid },
  { key: 'doc', label: '文档', icon: FileText },
  { key: 'mindmap', label: '思维导图', icon: Map },
  { key: 'flowchart', label: '流程图', icon: Route },
  { key: 'exercise', label: '习题', icon: PenTool },
  { key: 'video', label: '视频', icon: Play },
  { key: 'code', label: '代码', icon: Code },
]

const resourceIcons: Record<ApiResource['type'], unknown> = {
  doc: FileText,
  mindmap: Map,
  exercise: PenTool,
  video: Play,
  code: Code,
}

const resources = ref<ApiResource[]>([
  { id: 0, type: 'doc', title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战，涵盖监督学习、无监督学习、模型评估等内容。', tags: ['Python', 'ML'], date: '2026-05-10', color: '#00d4ff', reads: 234 },
  { id: 1, type: 'mindmap', title: '深度学习知识图谱', desc: '神经网络、CNN、RNN 架构全景图，清晰梳理深度学习各分支之间的关系与发展脉络。', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189 },
  { id: 2, type: 'exercise', title: '线性代数基础习题', desc: '矩阵运算、特征值、向量空间，精选 50 道经典习题，覆盖线性代数核心知识点。', tags: ['数学', '练习'], date: '2026-05-08', color: '#06d6a0', reads: 156 },
  { id: 3, type: 'video', title: 'Transformer 原理解析', desc: '深入讲解 Attention 机制与多头注意力，从论文推导到代码实现。', tags: ['NLP', '进阶'], date: '2026-05-07', color: '#f59e0b', reads: 312 },
  { id: 4, type: 'code', title: 'KNN 算法实现', desc: '从零实现 K-近邻分类器，包含完整的 Python 代码、测试用例和性能优化技巧。', tags: ['算法', '实现'], date: '2026-05-06', color: '#f43f5e', reads: 98 },
  { id: 5, type: 'doc', title: '概率论与数理统计速查', desc: '常见分布、假设检验、贝叶斯公式，一份全面的概率论速查手册。', tags: ['数学', '统计'], date: '2026-05-05', color: '#00d4ff', reads: 201 },
  { id: 6, type: 'mindmap', title: '数据结构思维导图', desc: '数组、链表、树、图、哈希表，数据结构知识点全景梳理，面试复习必备。', tags: ['CS基础', '架构'], date: '2026-05-04', color: '#7c3aed', reads: 267 },
  { id: 7, type: 'exercise', title: '动态规划专项练习', desc: '经典 DP 问题与解题模板，从背包问题到区间 DP，逐步提升算法能力。', tags: ['算法', '进阶'], date: '2026-05-03', color: '#06d6a0', reads: 143 },
  { id: 8, type: 'video', title: 'PyTorch 快速上手', desc: '张量运算、自动求导、模型构建，30 分钟快速掌握 PyTorch 核心功能。', tags: ['框架', '入门'], date: '2026-05-02', color: '#f59e0b', reads: 378 },
])

const recommended = ref<ApiResource[]>([
  { id: 9, type: 'video', title: '机器学习数学基础', desc: '微积分、线性代数、概率论在 ML 中的应用', tags: ['数学', 'ML'], date: '2026-05-11', color: '#00d4ff', reads: 89 },
  { id: 10, type: 'doc', title: '模型部署实战指南', desc: '从训练到生产，ML 模型部署全流程解析', tags: ['工程', '进阶'], date: '2026-05-11', color: '#7c3aed', reads: 67 },
  { id: 11, type: 'code', title: 'Git 版本控制入门', desc: '团队协作必备，Git 工作流与最佳实践', tags: ['工具', '基础'], date: '2026-05-10', color: '#06d6a0', reads: 45 },
])

const filtered = computed(() => {
  return resources.value.filter(r => {
    if (activeFilter.value !== 'all' && r.type !== activeFilter.value) return false
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.trim().toLowerCase()
    return r.title.toLowerCase().includes(q) || r.tags.some(tag => tag.toLowerCase().includes(q))
  })
})

const filterCounts = computed(() => {
  const counts: Record<string, number> = { all: resources.value.length }
  filterTabs.slice(1).forEach(f => {
    counts[f.key] = resources.value.filter(r => r.type === f.key).length
  })
  return counts
})

const detailItem = computed(() => selectedResource.value ?? resources.value[0])

function toggleBookmark(id: number) {
  if (bookmarks.value.has(id)) bookmarks.value.delete(id)
  else bookmarks.value.add(id)
}

function openDetail(resource: ApiResource) {
  selectedResource.value = resource
  showDetail.value = true
}

function closeDetail() {
  showDetail.value = false
  window.setTimeout(() => {
    selectedResource.value = null
  }, 200)
}

function goToTutor() {
  if (!selectedResource.value) return
  router.push({ path: '/tutoring', query: { q: selectedResource.value.title } })
}

onMounted(async () => {
  isLoading.value = true
  try {
    const [resourceItems, recommendedItems] = await Promise.all([
      fetchResources(),
      fetchRecommendedResources(),
    ])
    resources.value = resourceItems
    recommended.value = recommendedItems
  } catch {
    // Keep the original local cards when the API server is unavailable.
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="resources">
    <div class="res-hero">
      <div>
        <div class="hero-badge">学习资源</div>
        <h1 class="hero-title">个性化<span class="gradient-text">学习内容</span></h1>
        <p class="hero-desc">AI 为你生成的定制化学习材料，覆盖多种类型</p>
      </div>
    </div>

    <div class="toolbar">
      <div class="filter-group">
        <button
          v-for="f in filterTabs"
          :key="f.key"
          :class="['filter-btn', { active: activeFilter === f.key }]"
          @click="activeFilter = f.key"
        >
          <component :is="f.icon" :size="14" stroke-width="1.5" />
          <span>{{ f.label }}</span>
          <span class="filter-count">{{ filterCounts[f.key] }}</span>
        </button>
      </div>
      <div class="search-box">
        <Search :size="16" stroke-width="1.5" class="search-svg" />
        <input v-model="searchQuery" type="text" placeholder="搜索资源名称或标签..." />
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">正在同步学习资源...</div>

    <div class="res-grid">
      <div
        v-for="r in filtered"
        :key="r.id"
        class="res-card"
        :style="{ '--r-color': r.color }"
        @click="openDetail(r)"
      >
        <div class="res-card-glow" />
        <div class="res-card-top">
          <div class="res-type-badge">
            <component :is="resourceIcons[r.type]" :size="16" stroke-width="1.5" />
            <span>{{ filterTabs.find(f => f.key === r.type)?.label }}</span>
          </div>
          <button class="res-bookmark" @click.stop="toggleBookmark(r.id)">
            <Star v-if="bookmarks.has(r.id)" :size="15" stroke-width="2" class="bookmarked" />
            <Star v-else :size="15" stroke-width="1.5" class="unbookmarked" />
          </button>
        </div>
        <h3 class="res-title">{{ r.title }}</h3>
        <p class="res-desc">{{ r.desc }}</p>
        <div class="res-tags">
          <span v-for="tag in r.tags" :key="tag" class="res-tag">{{ tag }}</span>
        </div>
        <div class="res-stats">
          <span class="res-date">{{ r.date }}</span>
          <span class="res-reads">
            <Eye :size="11" stroke-width="1.5" />
            {{ r.reads }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty-state">
      <Search :size="36" stroke-width="1" class="empty-icon" />
      <h3>没有找到匹配的资源</h3>
      <p>尝试更换筛选条件或搜索关键词</p>
    </div>

    <div v-if="activeFilter === 'all' && !searchQuery.trim()" class="recommended">
      <div class="rec-header">
        <div class="rec-header-left">
          <Sparkles :size="18" stroke-width="1.5" class="rec-sparkle" />
          <h2 class="rec-title">为你推荐</h2>
          <span class="rec-subtitle">基于你的学习画像</span>
        </div>
        <button class="rec-more">
          查看全部
          <ChevronRight :size="14" stroke-width="1.5" />
        </button>
      </div>
      <div class="rec-grid">
        <div
          v-for="r in recommended"
          :key="r.id"
          class="rec-card"
          :style="{ '--r-color': r.color }"
          @click="openDetail(r)"
        >
          <div class="rec-flag">NEW</div>
          <div class="rec-type-icon">
            <component :is="resourceIcons[r.type]" :size="16" stroke-width="1.5" />
          </div>
          <h4 class="rec-name">{{ r.title }}</h4>
          <p class="rec-desc">{{ r.desc }}</p>
          <div class="rec-tags">
            <span v-for="tag in r.tags" :key="tag" class="rec-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="scale-in">
      <div v-if="showDetail && selectedResource" class="modal-overlay" @click.self="closeDetail">
        <div class="modal" :style="{ '--m-color': detailItem.color }">
          <div class="modal-strip" />
          <div class="modal-header">
            <span class="modal-type-tag">
              <component :is="resourceIcons[detailItem.type]" :size="16" stroke-width="1.5" />
              {{ filterTabs.find(f => f.key === detailItem.type)?.label }}
            </span>
            <button class="modal-close" @click="closeDetail">✕</button>
          </div>
          <h2 class="modal-title">{{ detailItem.title }}</h2>
          <p class="modal-desc">{{ detailItem.desc }}</p>
          <div class="modal-tags">
            <span v-for="tag in detailItem.tags" :key="tag" class="modal-tag">{{ tag }}</span>
          </div>
          <div class="modal-meta">
            <div class="modal-meta-item">
              <span class="mm-label">创建日期</span>
              <span class="mm-value">{{ detailItem.date }}</span>
            </div>
            <div class="modal-meta-item">
              <span class="mm-label">阅读次数</span>
              <span class="mm-value">{{ detailItem.reads }}</span>
            </div>
            <div class="modal-meta-item">
              <span class="mm-label">资源类型</span>
              <span class="mm-value">{{ filterTabs.find(f => f.key === detailItem.type)?.label }}</span>
            </div>
          </div>
          <div class="modal-preview">
            <h3>内容预览</h3>
            <p>本章节介绍了{{ detailItem.title }}的核心概念和关键知识点。内容包括基础理论、实践应用和进阶拓展三个部分，帮助你系统性地掌握相关知识。</p>
          </div>
          <div class="modal-actions">
            <button class="btn-primary" @click="goToTutor">开始学习 <ArrowRight :size="14" stroke-width="2" /></button>
            <button :class="['btn-ghost', { saved: bookmarks.has(detailItem.id) }]" @click="toggleBookmark(detailItem.id)">
              {{ bookmarks.has(detailItem.id) ? '已收藏' : '收藏' }}
            </button>
            <button class="btn-ghost">下载</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.resources {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.res-hero {
  padding: 48px 40px 24px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-bottom: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 0 40px 24px;
}

.filter-group {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}

.filter-btn:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.03);
}

.filter-btn.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
}

.filter-count {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  font-family: var(--font-mono);
}

.filter-btn.active .filter-count { background: rgba(255, 255, 255, 0.15); }

.search-box {
  position: relative;
  flex-shrink: 0;
}

.search-svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.search-box input {
  padding: 10px 14px 10px 36px;
  border-radius: 10px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 13px;
  width: 240px;
  color: var(--color-text-primary);
  transition: all 0.2s var(--ease-out);
}

.search-box input:focus { border-color: var(--color-accent-cyan); }
.search-box input::placeholder { color: var(--color-text-tertiary); opacity: 0.6; }

.loading-state {
  padding: 0 40px 20px;
  font-size: 12px;
  color: var(--color-accent-cyan);
}

.res-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0 40px 32px;
}

.res-card {
  position: relative;
  padding: 24px;
  border-radius: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s var(--ease-out);
}

.res-card:hover {
  border-color: var(--r-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.res-card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--r-color) 6%, transparent), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s var(--ease-out);
}

.res-card:hover .res-card-glow { opacity: 1; }

.res-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.res-type-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--r-color) 8%, transparent);
  color: var(--r-color);
  font-size: 11px;
  font-weight: 500;
}

.res-bookmark {
  color: var(--color-text-tertiary);
  padding: 4px;
  transition: all 0.2s var(--ease-out);
}

.res-bookmark:hover { color: var(--color-accent-amber); transform: scale(1.1); }

.bookmarked { color: #f59e0b; fill: #f59e0b; }
.unbookmarked { opacity: 0.6; }

.res-title {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 400;
  margin-bottom: 8px;
  line-height: 1.3;
  color: #fff;
}

.res-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.res-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.res-tag {
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

.res-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.res-date {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.res-reads {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon { color: var(--color-text-tertiary); opacity: 0.25; margin-bottom: 14px; }

.empty-state h3 {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.empty-state p { font-size: 13px; color: var(--color-text-tertiary); }

.recommended {
  padding: 0 40px 40px;
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.rec-header-left { display: flex; align-items: center; gap: 10px; }
.rec-sparkle { color: var(--color-accent-cyan); }

.rec-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

.rec-subtitle {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.rec-more {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-accent-cyan);
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s var(--ease-out);
}

.rec-more:hover { background: rgba(0, 212, 255, 0.06); }

.rec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.rec-card {
  position: relative;
  padding: 20px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
}

.rec-card:hover {
  border-color: var(--r-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.rec-flag {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  letter-spacing: 0.5px;
}

.rec-type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--r-color) 10%, transparent);
  color: var(--r-color);
  margin-bottom: 12px;
}

.rec-name {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 6px;
}

.rec-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-tags { display: flex; gap: 5px; flex-wrap: wrap; }

.rec-tag {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 40px;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 0;
  max-width: 620px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.modal-strip {
  height: 3px;
  background: linear-gradient(90deg, var(--m-color), color-mix(in srgb, var(--m-color) 30%, transparent));
  border-radius: 20px 20px 0 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px 0;
}

.modal-type-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--m-color);
  font-weight: 500;
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.modal-close:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }

.modal-title {
  font-family: var(--font-display);
  font-size: 26px;
  color: #fff;
  padding: 12px 28px 0;
  line-height: 1.2;
}

.modal-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  padding: 8px 28px 0;
}

.modal-tags {
  display: flex;
  gap: 6px;
  padding: 14px 28px 0;
  flex-wrap: wrap;
}

.modal-tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.modal-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 18px 28px;
}

.modal-meta-item {
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mm-label { font-size: 11px; color: var(--color-text-tertiary); letter-spacing: 0.3px; }
.mm-value { font-size: 15px; font-weight: 500; color: var(--color-text-primary); }

.modal-preview { padding: 0 28px 20px; }

.modal-preview h3 {
  font-family: var(--font-display);
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
}

.modal-preview p {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  padding: 14px 16px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border);
}

.modal-actions {
  display: flex;
  gap: 10px;
  padding: 16px 28px 24px;
  border-top: 1px solid var(--color-border);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
}

.btn-primary:hover { box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3); }

.btn-ghost {
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 13px;
  transition: all 0.2s var(--ease-out);
}

.btn-ghost:hover { border-color: var(--m-color); color: var(--m-color); }
.btn-ghost.saved { color: var(--color-accent-amber); border-color: rgba(245, 158, 11, 0.3); }

@media (max-width: 900px) {
  .res-hero { padding: 32px 20px 20px; }
  .toolbar { padding: 0 20px 20px; flex-direction: column; align-items: stretch; }
  .loading-state { padding: 0 20px 20px; }
  .search-box input { width: 100%; }
  .res-grid { padding: 0 20px 24px; grid-template-columns: 1fr; }
  .rec-grid { grid-template-columns: 1fr; }
  .recommended { padding: 0 20px 32px; }
  .modal-meta { grid-template-columns: 1fr; }
}
</style>
