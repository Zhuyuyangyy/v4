<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
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
  Bookmark,
  ChevronRight,
  Eye,
  Route,
} from 'lucide-vue-next'

const router = useRouter()

type ResourceType = 'all' | 'doc' | 'mindmap' | 'exercise' | 'video' | 'code' | 'flowchart'

const activeFilter = ref<ResourceType>('all')
const searchQuery = ref('')
const selectedResource = ref<null | typeof resources[0]>(null)
const showDetail = ref(false)
const bookmarks = ref<Set<number>>(new Set([0, 3]))

const filterTabs: { key: ResourceType; label: string; icon: any }[] = [
  { key: 'all', label: '全部', icon: LayoutGrid },
  { key: 'doc', label: '文档', icon: FileText },
  { key: 'mindmap', label: '思维导图', icon: Map },
  { key: 'flowchart', label: '流程图', icon: Route },
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
  // ── 机器学习 ──
  { id: 0, type: 'doc' as const, title: 'Python 机器学习入门指南', desc: '从零开始掌握 ML 核心概念与实战，涵盖监督学习、无监督学习、模型评估等内容。', tags: ['ML', '入门'], date: '2026-05-10', color: '#00d4ff', reads: 234 },
  { id: 1, type: 'mindmap' as const, title: '监督学习算法全景图', desc: 'KNN、决策树、SVM、随机森林、XGBoost 对比分析，清晰梳理各算法适用场景。', tags: ['ML', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189 },
  { id: 2, type: 'exercise' as const, title: '机器学习面试 100 题', desc: '精选机器学习面试高频题目，涵盖算法原理、模型评估、特征工程等核心考点。', tags: ['ML', '面试'], date: '2026-05-08', color: '#06d6a0', reads: 156 },
  { id: 3, type: 'video' as const, title: '模型评估与交叉验证', desc: '深入讲解偏差方差权衡、交叉验证方法、ROC/AUC 等评估指标。', tags: ['ML', '进阶'], date: '2026-05-07', color: '#f59e0b', reads: 312 },
  { id: 4, type: 'code' as const, title: 'KNN 算法从零实现', desc: '从零实现 K-近邻分类器，包含完整的 Python 代码、测试用例和性能优化技巧。', tags: ['ML', '实现'], date: '2026-05-06', color: '#f43f5e', reads: 98 },
  { id: 5, type: 'doc' as const, title: '特征工程实战指南', desc: '特征编码、标准化、PCA 降维、特征选择，系统掌握特征工程核心方法。', tags: ['ML', '工程'], date: '2026-05-05', color: '#00d4ff', reads: 201 },
  { id: 6, type: 'doc' as const, title: '集成学习原理与实战', desc: 'Bagging、Boosting、Stacking 三大集成范式，从随机森林到 XGBoost/LightGBM。', tags: ['ML', '进阶'], date: '2026-05-04', color: '#00d4ff', reads: 267 },

  // ── 深度学习 ──
  { id: 7, type: 'mindmap' as const, title: '深度学习知识图谱', desc: '神经网络、CNN、RNN、Transformer 架构全景图，清晰梳理深度学习发展脉络。', tags: ['DL', '架构'], date: '2026-05-09', color: '#7c3aed', reads: 189 },
  { id: 8, type: 'video' as const, title: '反向传播完整推导', desc: '从计算图到链式法则，手写推导反向传播的每一步，彻底理解梯度如何传递。', tags: ['DL', '数学'], date: '2026-05-07', color: '#7c3aed', reads: 312 },
  { id: 9, type: 'code' as const, title: 'PyTorch 神经网络模板', desc: '完整的 PyTorch 训练脚本模板：数据加载、模型定义、训练循环、评估、保存。', tags: ['DL', '框架'], date: '2026-05-06', color: '#7c3aed', reads: 178 },
  { id: 10, type: 'doc' as const, title: 'CNN 架构演进史', desc: '从 LeNet 到 ResNet、EfficientNet、ConvNeXt，梳理卷积神经网络架构演化。', tags: ['DL', 'CV'], date: '2026-05-05', color: '#7c3aed', reads: 145 },

  // ── 自然语言处理 ──
  { id: 11, type: 'video' as const, title: 'Transformer 原理解析', desc: '深入讲解 Attention 机制与多头注意力，从论文推导到代码实现，面试必考。', tags: ['NLP', '核心'], date: '2026-05-07', color: '#06d6a0', reads: 312 },
  { id: 12, type: 'code' as const, title: 'BERT 文本分类实战', desc: '使用预训练 BERT 模型进行文本分类 Fine-tuning，涵盖数据准备到模型部署。', tags: ['NLP', '实战'], date: '2026-05-04', color: '#06d6a0', reads: 134 },
  { id: 13, type: 'doc' as const, title: 'Word2Vec 与词向量详解', desc: '分布式语义表示、CBOW 与 Skip-gram、负采样，从原理到实战完整解析。', tags: ['NLP', '基础'], date: '2026-05-03', color: '#06d6a0', reads: 189 },
  { id: 14, type: 'mindmap' as const, title: 'NLP 技术全景图', desc: '从分词到大模型，自然语言处理核心技术栈完整梳理与对比。', tags: ['NLP', '架构'], date: '2026-05-02', color: '#06d6a0', reads: 223 },

  // ── 大模型与 LLM ──
  { id: 15, type: 'doc' as const, title: 'Prompt Engineering 完全指南', desc: '从基础 Prompt 设计到进阶的 Chain-of-Thought、Few-Shot、ReAct 等高级技巧。', tags: ['LLM', 'Prompt'], date: '2026-05-06', color: '#f59e0b', reads: 456 },
  { id: 16, type: 'code' as const, title: 'RAG 系统完整实现', desc: '基于向量数据库的检索增强生成系统，文档分块→向量化→检索→生成的完整流程。', tags: ['LLM', 'RAG'], date: '2026-05-05', color: '#f59e0b', reads: 234 },
  { id: 17, type: 'video' as const, title: 'AI Agent 入门到实战', desc: 'ReAct 框架、工具调用、Function Calling、多智能体协作，构建自主 AI Agent。', tags: ['LLM', 'Agent'], date: '2026-05-04', color: '#f59e0b', reads: 345 },
  { id: 18, type: 'doc' as const, title: 'GPT 系列模型技术报告解读', desc: '从 GPT-1 到 GPT-4、Scaling Law、InstructGPT，大模型技术演进路线全面解读。', tags: ['LLM', '进阶'], date: '2026-05-03', color: '#f59e0b', reads: 267 },
  { id: 19, type: 'exercise' as const, title: '大模型面试 80 题', desc: 'LLM 方向精选面试题：Transformer、RLHF、RAG、Agent、模型压缩等高频考点。', tags: ['LLM', '面试'], date: '2026-05-02', color: '#f59e0b', reads: 156 },

  // ── 计算机视觉 ──
  { id: 20, type: 'doc' as const, title: '目标检测算法综述', desc: '从 R-CNN 到 YOLOv8、DETR，两阶段与单阶段目标检测算法全面对比。', tags: ['CV', '目标检测'], date: '2026-05-01', color: '#f43f5e', reads: 189 },
  { id: 21, type: 'code' as const, title: 'YOLOv8 训练自定义数据集', desc: '使用 YOLOv8 训练自己的目标检测模型，从数据标注到模型导出的完整流程。', tags: ['CV', '实战'], date: '2026-04-30', color: '#f43f5e', reads: 234 },
  { id: 22, type: 'video' as const, title: '图像分类迁移学习', desc: '使用预训练 ResNet 进行迁移学习，在小数据集上实现高精度图像分类。', tags: ['CV', '入门'], date: '2026-04-29', color: '#f43f5e', reads: 167 },

  // ── 强化学习 ──
  { id: 23, type: 'doc' as const, title: '强化学习入门：从 MDP 到 PPO', desc: '马尔可夫决策过程、贝尔曼方程、Q-Learning、Policy Gradient、PPO 完整入门。', tags: ['RL', '入门'], date: '2026-04-28', color: '#3b82f6', reads: 145 },
  { id: 24, type: 'code' as const, title: 'DQN 玩转 Atari 游戏', desc: '使用 Deep Q-Network 训练智能体玩 Atari 游戏，从环境搭建到训练完成。', tags: ['RL', '实现'], date: '2026-04-27', color: '#3b82f6', reads: 98 },

  // ── MLOps ──
  { id: 25, type: 'doc' as const, title: 'MLflow 实验管理实战', desc: '实验追踪、模型注册、版本管理，使用 MLflow 构建可复现的机器学习实验流程。', tags: ['MLOps', '工程'], date: '2026-04-26', color: '#a855f7', reads: 123 },
  { id: 26, type: 'code' as const, title: 'FastAPI 模型服务部署', desc: '使用 FastAPI 将 ML 模型部署为 RESTful API 服务，包含 Docker 容器化方案。', tags: ['MLOps', '部署'], date: '2026-04-25', color: '#a855f7', reads: 189 },
  { id: 27, type: 'doc' as const, title: '模型监控与数据漂移检测', desc: '生产环境模型监控方案：数据漂移检测、概念漂移、模型性能衰减预警。', tags: ['MLOps', '监控'], date: '2026-04-24', color: '#a855f7', reads: 78 },

  // ── 编程与算法基础 ──
  { id: 28, type: 'doc' as const, title: 'C 语言指针深度解析', desc: '深入理解 C 语言指针、数组与指针的关系、函数指针、动态内存管理。', tags: ['C', '编程'], date: '2026-05-12', color: '#00599C', reads: 167 },
  { id: 29, type: 'code' as const, title: 'Python 装饰器与生成器', desc: '深入理解 Python 装饰器原理、生成器与协程，写出更 Pythonic 的代码。', tags: ['Python', '进阶'], date: '2026-05-11', color: '#3776AB', reads: 198 },
  { id: 30, type: 'doc' as const, title: 'Java OOP 核心思想详解', desc: '封装、继承、多态、接口与抽象类的深入解析，配合实战案例。', tags: ['Java', 'OOP'], date: '2026-05-10', color: '#ED8B00', reads: 145 },
  { id: 31, type: 'doc' as const, title: 'C++ 模板与 STL 实战', desc: '函数模板、类模板、STL 容器与算法、智能指针，现代 C++ 开发必备。', tags: ['C++', '模板'], date: '2026-05-09', color: '#00599C', reads: 134 },
  { id: 32, type: 'mindmap' as const, title: '数据结构知识图谱', desc: '线性表、树、图、散列表、堆等核心数据结构全景对比与应用场景。', tags: ['数据结构', '体系'], date: '2026-05-08', color: '#4CAF50', reads: 223 },
  { id: 33, type: 'exercise' as const, title: '算法面试 150 题', desc: '精选高频算法面试题，涵盖动态规划、贪心、回溯、图论等核心算法。', tags: ['算法', '面试'], date: '2026-05-07', color: '#FF5722', reads: 289 },
  { id: 34, type: 'doc' as const, title: '编译原理入门与实践', desc: '从词法分析到代码生成，理解编译器的工作流程与核心原理。', tags: ['编译', '系统'], date: '2026-05-06', color: '#9C27B0', reads: 98 },

  // ── 计算机系统 ──
  { id: 35, type: 'doc' as const, title: '计算机组成原理精要', desc: 'CPU 结构、存储器层次、流水线技术、I/O 系统，硬件核心知识全覆盖。', tags: ['组成原理', '硬件'], date: '2026-05-05', color: '#607D8B', reads: 145 },
  { id: 36, type: 'video' as const, title: '操作系统核心概念精讲', desc: '进程管理、内存管理、文件系统、设备管理，OS 四大核心模块深入解析。', tags: ['OS', '核心'], date: '2026-05-04', color: '#1565C0', reads: 256 },
  { id: 37, type: 'code' as const, title: 'TCP 套接字编程实战', desc: '从基础 TCP/UDP 编程到多线程并发服务器，网络编程完整实战教程。', tags: ['网络', '编程'], date: '2026-05-03', color: '#0277BD', reads: 167 },
  { id: 38, type: 'exercise' as const, title: '数据库 SQL 强化练习', desc: '从基础查询到复杂嵌套、事务、索引优化，50 道 SQL 实战练习题。', tags: ['数据库', 'SQL'], date: '2026-05-02', color: '#336791', reads: 189 },

  // ── 软件工程 ──
  { id: 39, type: 'doc' as const, title: '软件工程实践指南', desc: '需求分析、架构设计、设计模式、项目管理、DevOps 全流程实践。', tags: ['软工', '实践'], date: '2026-05-01', color: '#FF6F00', reads: 123 },
  { id: 40, type: 'code' as const, title: 'PyTest 自动化测试实战', desc: '单元测试、参数化测试、Mock、Fixture 覆盖，构建高质量自动化测试体系。', tags: ['测试', '自动化'], date: '2026-04-30', color: '#D32F2F', reads: 156 },

  // ── 前沿与应用 ──
  { id: 41, type: 'doc' as const, title: '信息安全基础入门', desc: '密码学、Web 安全、系统安全、隐私保护，信息安全核心知识全解析。', tags: ['安全', '入门'], date: '2026-04-29', color: '#C62828', reads: 134 },
  { id: 42, type: 'doc' as const, title: '大数据技术全景', desc: 'Hadoop、Spark、Flink、Kafka 大数据核心技术栈与生态体系。', tags: ['大数据', '体系'], date: '2026-04-28', color: '#00695C', reads: 178 },
  { id: 43, type: 'code' as const, title: 'Docker + K8s 容器化部署', desc: '从 Docker 容器到 Kubernetes 编排，云原生应用部署完整实战。', tags: ['云原生', '部署'], date: '2026-04-27', color: '#00695C', reads: 234 },
  { id: 44, type: 'doc' as const, title: '计算机图形学入门', desc: '图形管线、三维变换、光照模型、光线追踪，图形学核心概念入门。', tags: ['图形学', '渲染'], date: '2026-04-26', color: '#2E7D32', reads: 89 },
]

const recommended = [
  { id: 100, type: 'doc' as const, title: '数据结构与算法刷题指南', desc: '从基础数据结构到高级算法，系统刷题路线与方法论', tags: ['编程', '算法'], date: '2026-05-12', color: '#4CAF50', reads: 345 },
  { id: 101, type: 'mindmap' as const, title: 'AI 算法工程师技能树', desc: '从基础到前沿，AI 算法工程师完整技能图谱与学习路线', tags: ['AI', '体系'], date: '2026-05-12', color: '#7c3aed', reads: 256 },
  { id: 102, type: 'code' as const, title: '操作系统实验：生产者消费者', desc: '使用信号量和管程解决经典同步问题，含完整代码实现', tags: ['OS', '实战'], date: '2026-05-11', color: '#1565C0', reads: 189 },
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

const detailItem = computed(() => selectedResource.value!)

function goToTutor() {
  const item = selectedResource.value
  if (!item) return
  router.push({ path: '/tutoring', query: { q: item.title } })
}
</script>

<template>
  <div class="resources">
    <!-- Hero -->
    <div class="res-hero">
      <div>
        <div class="hero-badge">学习资源</div>
        <h1 class="hero-title">个性化<span class="gradient-text">学习内容</span></h1>
        <p class="hero-desc">AI 为你生成的定制化学习材料，覆盖多种类型</p>
      </div>
    </div>

    <!-- Filter + Search Bar -->
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

    <!-- Resource Grid -->
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

    <!-- Empty State -->
    <div v-if="filtered.length === 0" class="empty-state">
      <Search :size="36" stroke-width="1" class="empty-icon" />
      <h3>没有找到匹配的资源</h3>
      <p>尝试更换筛选条件或搜索关键词</p>
    </div>

    <!-- Recommended Section -->
    <div v-if="activeFilter === 'all' && !searchQuery" class="recommended">
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

    <!-- Detail Modal -->
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

/* ====================== Hero ====================== */
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

/* ====================== Toolbar ====================== */
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

/* ====================== Resource Grid ====================== */
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

/* ====================== Empty State ====================== */
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

/* ====================== Recommended ====================== */
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

/* ====================== Modal ====================== */
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
.btn-ghost.saved { color: var(--color-accent-amber); border-color: rgba(245,158,11,0.3); }

/* ====================== Responsive ====================== */
@media (max-width: 900px) {
  .res-hero { padding: 32px 20px 20px; }
  .toolbar { padding: 0 20px 20px; flex-direction: column; align-items: stretch; }
  .search-box input { width: 100%; }
  .res-grid { padding: 0 20px 24px; grid-template-columns: 1fr; }
  .rec-grid { grid-template-columns: 1fr; }
  .recommended { padding: 0 20px 32px; }
  .modal-meta { grid-template-columns: 1fr; }
}
</style>
