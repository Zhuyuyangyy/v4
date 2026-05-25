<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  ChevronRight,
  Code,
  Compass,
  FileText,
  LayoutGrid,
  Map as MapIcon,
  Network,
  Orbit,
  PenTool,
  Play,
  Route,
  Search,
  Sparkles,
} from 'lucide-vue-next'
import { fetchRecommendedResources, fetchResources } from '@/lib/api'
import type { ApiResource } from '@/types/api'
import ResourceConstellationView from '@/components/resources/ResourceConstellationView.vue'
import ResourceMetroView from '@/components/resources/ResourceMetroView.vue'
import ResourceMatrixView from '@/components/resources/ResourceMatrixView.vue'
import ResourceSunburstView from '@/components/resources/ResourceSunburstView.vue'
import ResourceOrbitalView from '@/components/resources/ResourceOrbitalView.vue'

type ResourceType = 'all' | 'doc' | 'mindmap' | 'exercise' | 'video' | 'code' | 'flowchart'
type ViewMode = 'constellation' | 'metro' | 'matrix' | 'sunburst' | 'orbital'

const router = useRouter()

const activeFilter = ref<ResourceType>('all')
const activeView = ref<ViewMode>('constellation')
const searchQuery = ref('')
const selectedResource = ref<ApiResource | null>(null)
const showDetail = ref(false)
const bookmarks = ref<Set<number>>(new Set([0, 3]))
const isLoading = ref(false)

const viewTabs: { key: ViewMode; label: string; icon: unknown }[] = [
  { key: 'constellation', label: '星座图', icon: Compass },
  { key: 'metro', label: '地铁图', icon: Route },
  { key: 'matrix', label: '认知矩阵', icon: Network },
  { key: 'sunburst', label: '同心圆', icon: Sparkles },
  { key: 'orbital', label: '学习轨道', icon: Orbit },
]

const filterTabs: { key: ResourceType; label: string; icon: unknown }[] = [
  { key: 'all', label: '全部', icon: LayoutGrid },
  { key: 'doc', label: '文档', icon: FileText },
  { key: 'mindmap', label: '思维导图', icon: MapIcon },
  { key: 'flowchart', label: '流程图', icon: Route },
  { key: 'exercise', label: '习题', icon: PenTool },
  { key: 'video', label: '视频', icon: Play },
  { key: 'code', label: '代码', icon: Code },
]

const resourceIcons: Record<ApiResource['type'], unknown> = {
  doc: FileText,
  mindmap: MapIcon,
  exercise: PenTool,
  video: Play,
  code: Code,
}

const resources = ref<ApiResource[]>([
  { id: 0, type: 'doc', title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战，涵盖监督学习、无监督学习、模型评估等内容。', tags: ['Python', 'ML'], date: '2026-05-10', color: '#00d4ff', reads: 234, reason: '你在机器学习基础上掌握度 82%，建议进阶学习', profileTag: 'ML 学习偏好', pathStage: '课后巩固', format: '知识卡片 + 文档', estTime: '15 分钟', recommendEvidence: { profileSource: '画像显示 ML 基础掌握度 82%，建议进阶', evaluationReason: '最近两次练习平均正确率 82%，基础稳固', pathStage: '当前处于课后巩固阶段，适合加入进阶学习资源', formatReason: '文档 + 知识卡片适合巩固阶段，方便随时翻阅' } },
  { id: 1, type: 'mindmap', title: '深度学习知识图谱', desc: '神经网络、CNN、RNN 架构全景图，清晰梳理深度学习各分支之间的关系与发展脉络。', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189, reason: '你的知识树中深度学习进度仅 20%，推荐体系化学习', profileTag: '知识薄弱点', pathStage: '课前预习', format: '思维导图', estTime: '8 分钟', recommendEvidence: { profileSource: '知识树中深度学习进度仅 20%，标记为薄弱方向', evaluationReason: '深度学习相关测评正确率低于 50%', pathStage: '课前预习阶段需要建立知识框架', formatReason: '思维导图适合预习阶段快速建立知识体系结构' } },
  { id: 2, type: 'exercise', title: '线性代数基础习题', desc: '矩阵运算、特征值、向量空间，精选 50 道经典习题，覆盖线性代数核心知识点。', tags: ['数学', '练习'], date: '2026-05-08', color: '#06d6a0', reads: 156, reason: '数学基础稳定，推荐巩固练习保持水平', profileTag: '数学强项', pathStage: '课后巩固', format: '练习题', estTime: '25 分钟', recommendEvidence: { profileSource: '画像标签"数学强项"，掌握度 82%', evaluationReason: '数学相关测评正确率稳定在 80% 以上', pathStage: '课后巩固阶段强化练习', formatReason: '练习题适合已掌握知识点的巩固和自查' } },
  { id: 3, type: 'video', title: 'Transformer 原理解析', desc: '深入讲解 Attention 机制与多头注意力，从论文推导到代码实现。', tags: ['NLP', '进阶'], date: '2026-05-07', color: '#f59e0b', reads: 312, reason: 'NLP 相关课程进度 15%，推荐深入学习', profileTag: 'NLP 方向', pathStage: '课中答疑', format: '视频 + 虚拟人讲解', estTime: '20 分钟', recommendEvidence: { profileSource: 'NLP 方向进度仅 15%，画像标记为待推进', evaluationReason: 'NLP 相关测评多次未完成', pathStage: '课中答疑阶段需要深入讲解', formatReason: '视频讲解适合复杂概念的理解，虚拟人提供交互答疑' } },
  { id: 4, type: 'code', title: 'KNN 算法实现', desc: '从零实现 K-近邻分类器，包含完整的 Python 代码、测试用例和性能优化技巧。', tags: ['算法', '实现'], date: '2026-05-06', color: '#f43f5e', reads: 98, reason: '算法学习进度 68%，推荐实战巩固', profileTag: '算法能力', pathStage: '课后巩固', format: '代码 + 文档', estTime: '12 分钟', recommendEvidence: { profileSource: '算法学习进度 68%，处于瓶颈期', evaluationReason: '算法题正确率波动较大，需要实战巩固', pathStage: '课后巩固阶段适合代码实践', formatReason: '代码实现适合动手型学习者，加深理解' } },
  { id: 5, type: 'doc', title: '概率论与数理统计速查', desc: '常见分布、假设检验、贝叶斯公式，一份全面的概率论速查手册。', tags: ['数学', '统计'], date: '2026-05-05', color: '#00d4ff', reads: 201, reason: '数理基础是 AI 的根基，推荐随时查阅', profileTag: '数学偏好', pathStage: '课前预习', format: '知识卡片', estTime: '5 分钟', recommendEvidence: { profileSource: '画像显示偏好文本讲解类型资源', evaluationReason: '概率论是 ML 基础，需要持续巩固', pathStage: '课前预习阶段需要快速回顾', formatReason: '速查卡片适合碎片时间快速回顾' } },
  { id: 6, type: 'mindmap', title: '数据结构思维导图', desc: '数组、链表、树、图、哈希表，数据结构知识点全景梳理，面试复习必备。', tags: ['CS基础', '架构'], date: '2026-05-04', color: '#7c3aed', reads: 267, reason: '数据结构学习进度 68%，推荐体系化复习', profileTag: 'CS 基础', pathStage: '期末辅导', format: '思维导图', estTime: '10 分钟', recommendEvidence: { profileSource: '画像标记"C / Python 编程基础"为优势，但薄弱项在数据结构', evaluationReason: '图结构与搜索掌握度仅 38%', pathStage: '期末辅导阶段需要全面复习', formatReason: '思维导图适合知识体系全景梳理' } },
  { id: 7, type: 'exercise', title: '动态规划专项练习', desc: '经典 DP 问题与解题模板，从背包问题到区间 DP，逐步提升算法能力。', tags: ['算法', '进阶'], date: '2026-05-03', color: '#06d6a0', reads: 143, reason: '算法进阶是下一步学习目标，推荐挑战', profileTag: '算法短板', pathStage: '课后巩固', format: '练习题 + 错题解析', estTime: '30 分钟' },
  { id: 8, type: 'video', title: 'PyTorch 快速上手', desc: '张量运算、自动求导、模型构建，30 分钟快速掌握 PyTorch 核心功能。', tags: ['框架', '入门'], date: '2026-05-02', color: '#f59e0b', reads: 378, reason: '深度学习框架入门，适合你当前学习阶段', profileTag: 'DL 方向', pathStage: '课中答疑', format: '视频 + 文档', estTime: '18 分钟' },
])

const recommended = ref<ApiResource[]>([
  { id: 9, type: 'video', title: '机器学习数学基础', desc: '微积分、线性代数、概率论在 ML 中的应用', tags: ['数学', 'ML'], date: '2026-05-11', color: '#00d4ff', reads: 89, reason: '你的平均正确率 82%，数学基础是进一步突破的关键', profileTag: 'ML 基础', pathStage: '期末辅导', format: '视频 + 练习题', estTime: '22 分钟' },
  { id: 10, type: 'doc', title: '模型部署实战指南', desc: '从训练到生产，ML 模型部署全流程解析', tags: ['工程', '进阶'], date: '2026-05-11', color: '#7c3aed', reads: 67, reason: '你的项目实践进度仅 20%，推荐实战导向学习', profileTag: '工程能力', pathStage: '课后巩固', format: '文档 + 代码', estTime: '20 分钟' },
  { id: 11, type: 'code', title: 'Git 版本控制入门', desc: '团队协作必备，Git 工作流与最佳实践', tags: ['工具', '基础'], date: '2026-05-10', color: '#06d6a0', reads: 45, reason: '基础工具掌握是协作学习的前提', profileTag: '工具使用', pathStage: '课前预习', format: '代码 + 文档', estTime: '10 分钟' },
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
        <h1 class="hero-title">画像驱动<span class="gradient-text">资源推荐</span></h1>
        <p class="hero-desc">每个资源都由画像智能体和路径规划智能体共同驱动生成，精准匹配你的学习需求。</p>
      </div>
    </div>

    <div class="view-switcher">
      <div class="view-switcher-group">
        <button
          v-for="v in viewTabs"
          :key="v.key"
          :class="['view-btn', { active: activeView === v.key }]"
          @click="activeView = v.key"
        >
          <component :is="v.icon" :size="14" stroke-width="1.5" />
          <span>{{ v.label }}</span>
        </button>
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

    <ResourceConstellationView v-if="activeView === 'constellation'" />
    <ResourceMetroView v-if="activeView === 'metro'" />
    <ResourceMatrixView v-if="activeView === 'matrix'" />
    <ResourceSunburstView v-if="activeView === 'sunburst'" />
    <ResourceOrbitalView v-if="activeView === 'orbital'" />

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
@keyframes rs-float-up {
  0% { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes rs-glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.08); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.15); }
}

.resources {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ── Hero ── */
.res-hero {
  padding: 48px 40px 28px;
  animation: rs-float-up 0.6s ease both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  font-family: var(--font-mono);
  background: rgba(0, 212, 255, 0.06);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-bottom: 14px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 400;
  color: #e8edf5;
  line-height: 1.15;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 14px;
  color: #8892b0;
  line-height: 1.6;
  max-width: 480px;
}

/* ── View switcher ── */
.view-switcher {
  padding: 0 40px 16px;
  animation: rs-float-up 0.6s ease 0.1s both;
}

.view-switcher-group {
  display: flex;
  gap: 3px;
  padding: 4px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: fit-content;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #8892b0;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.view-btn:hover {
  color: #e8edf5;
  background: rgba(255, 255, 255, 0.04);
}

.view-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #00d4ff);
  box-shadow: 0 2px 16px rgba(124, 58, 237, 0.25), 0 0 20px rgba(0, 212, 255, 0.1);
}

/* ── Toolbar ── */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 0 40px 24px;
  animation: rs-float-up 0.6s ease 0.15s both;
}

.filter-group {
  display: flex;
  gap: 3px;
  padding: 4px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #8892b0;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  color: #e8edf5;
  background: rgba(255, 255, 255, 0.04);
}

.filter-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  box-shadow: 0 2px 12px rgba(0, 212, 255, 0.2);
}

.filter-count {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono);
}

.filter-btn.active .filter-count { background: rgba(255, 255, 255, 0.18); }

.search-box {
  position: relative;
  flex-shrink: 0;
}

.search-svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a5568;
  opacity: 0.6;
}

.search-box input {
  padding: 10px 16px 10px 38px;
  border-radius: 12px;
  background: rgba(12, 12, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 13px;
  width: 260px;
  color: #e8edf5;
  font-family: var(--font-sans, 'Outfit', sans-serif);
  transition: all 0.25s ease;
}

.search-box input:focus {
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);
}
.search-box input::placeholder { color: #4a5568; opacity: 0.7; }

.loading-state {
  padding: 0 40px 20px;
  font-size: 12px;
  color: #00d4ff;
  font-family: var(--font-mono);
}

.mindmap-section {
  padding: 0 40px 32px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon { color: #4a5568; opacity: 0.2; margin-bottom: 14px; }

.empty-state h3 {
  font-family: var(--font-display);
  font-size: 20px;
  color: #8892b0;
  margin-bottom: 8px;
}

.empty-state p { font-size: 13px; color: #4a5568; }

/* ── Recommended ── */
.recommended {
  padding: 0 40px 40px;
  animation: rs-float-up 0.6s ease 0.2s both;
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.rec-header-left { display: flex; align-items: center; gap: 10px; }
.rec-sparkle { color: #00d4ff; }

.rec-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: #e8edf5;
  letter-spacing: -0.01em;
}

.rec-subtitle {
  font-size: 12px;
  color: #4a5568;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}

.rec-more {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #00d4ff;
  padding: 7px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.12);
  transition: all 0.25s ease;
}

.rec-more:hover {
  background: rgba(0, 212, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.25);
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.rec-card {
  position: relative;
  padding: 22px;
  border-radius: 16px;
  background: rgba(12, 12, 30, 0.55);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.35s ease;
  overflow: hidden;
}

.rec-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, transparent 40%, var(--r-color));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.rec-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 30px color-mix(in srgb, var(--r-color) 12%, transparent);
}

.rec-card:hover::before { opacity: 1; }

.rec-flag {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 9px;
  font-weight: 700;
  font-family: var(--font-mono);
  padding: 3px 9px;
  border-radius: 6px;
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff;
  letter-spacing: 0.08em;
}

.rec-type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--r-color) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--r-color) 15%, transparent);
  color: var(--r-color);
  margin-bottom: 14px;
}

.rec-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  color: #e8edf5;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.rec-desc {
  font-size: 12.5px;
  color: #8892b0;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-tags { display: flex; gap: 5px; flex-wrap: wrap; }

.rec-tag {
  font-size: 10px;
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.06);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.08);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 13, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 40px;
  backdrop-filter: blur(8px);
}

.modal {
  background: rgba(12, 12, 30, 0.85);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 0;
  max-width: 620px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.06);
}

.modal-strip {
  height: 3px;
  background: linear-gradient(90deg, var(--m-color), color-mix(in srgb, var(--m-color) 20%, transparent));
  border-radius: 22px 22px 0 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px 0;
}

.modal-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  font-family: var(--font-mono);
  color: var(--m-color);
  padding: 4px 12px;
  border-radius: 100px;
  background: color-mix(in srgb, var(--m-color) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--m-color) 18%, transparent);
}

.modal-close {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #4a5568;
  transition: all 0.2s ease;
  font-size: 18px;
}

.modal-close:hover { background: rgba(255, 255, 255, 0.06); color: #e8edf5; }

.modal-title {
  font-family: var(--font-display);
  font-size: 28px;
  color: #e8edf5;
  padding: 14px 28px 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.modal-desc {
  font-size: 14px;
  color: #8892b0;
  line-height: 1.7;
  padding: 10px 28px 0;
}

.modal-tags {
  display: flex;
  gap: 6px;
  padding: 16px 28px 0;
  flex-wrap: wrap;
}

.modal-tag {
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.1);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.modal-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px 28px;
}

.modal-meta-item {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mm-label { font-size: 10px; color: #4a5568; letter-spacing: 0.08em; font-family: var(--font-mono); }
.mm-value { font-size: 15px; font-weight: 500; color: #e8edf5; }

.modal-preview { padding: 0 28px 20px; }

.modal-preview h3 {
  font-family: var(--font-display);
  font-size: 16px;
  color: #e8edf5;
  margin-bottom: 10px;
}

.modal-preview p {
  font-size: 13px;
  color: #8892b0;
  line-height: 1.7;
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.modal-actions {
  display: flex;
  gap: 10px;
  padding: 18px 28px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  border-radius: 10px;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
}

.btn-primary:hover { box-shadow: 0 6px 28px rgba(0, 212, 255, 0.35); transform: translateY(-1px); }

.btn-ghost {
  padding: 11px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #8892b0;
  font-size: 13px;
  transition: all 0.25s ease;
}

.btn-ghost:hover { border-color: var(--m-color); color: var(--m-color); background: color-mix(in srgb, var(--m-color) 6%, transparent); }
.btn-ghost.saved { color: #f59e0b; border-color: rgba(245, 158, 11, 0.25); background: rgba(245, 158, 11, 0.06); }

@media (max-width: 900px) {
  .res-hero { padding: 32px 20px 20px; }
  .view-switcher { padding: 0 20px 12px; }
  .view-switcher-group { width: 100%; overflow-x: auto; }
  .view-btn { flex: 1; justify-content: center; padding: 8px 10px; }
  .toolbar { padding: 0 20px 20px; flex-direction: column; align-items: stretch; }
  .loading-state { padding: 0 20px 20px; }
  .search-box input { width: 100%; }
  .mindmap-section { padding: 0 20px 24px; }
  .rec-grid { grid-template-columns: 1fr; }
  .recommended { padding: 0 20px 32px; }
  .modal-meta { grid-template-columns: 1fr; }
}
</style>