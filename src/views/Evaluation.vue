<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  Award,
  Brain,
  Clock,
  Download,
  FileBarChart,
  PenTool,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-vue-next'
import { fetchEvaluation } from '@/lib/api'
import ThreeKnowledgeTree from '@/components/knowledge-tree/ThreeKnowledgeTree.vue'
import GrowthKnowledgeTree from '@/components/knowledge-tree/GrowthKnowledgeTree.vue'
import ProfileUpdateTrace from '@/components/evaluation/ProfileUpdateTrace.vue'
import ParticleBackground from '@/components/evaluation/ParticleBackground.vue'
import KnowledgeConstellation from '@/components/evaluation/KnowledgeConstellation.vue'
import type { TreeNode } from '@/components/knowledge-tree/GrowthKnowledgeTree.vue'

type SuggestionType = 'weakness' | 'strength' | 'positive' | 'action'

interface StatItem {
  label: string
  value: string
  change: string
  color: string
  icon: unknown
}

interface SuggestionItem {
  text: string
  type: SuggestionType
  icon: unknown
}

const router = useRouter()
const loaded = ref(false)
const isLoading = ref(false)
const showReportModal = ref(false)
const showRoundInsight = ref(false)
const reportDate = ref('2026-05-12')
const selectedWeakNode = ref<TreeNode | null>(null)

const roundInsight = {
  title: '这一轮学习画像已更新',
  subtitle: '大树根据刚完成的一轮练习，重新校准了你的掌握状态和下一轮侧重。',
  metrics: [
    { label: '完成知识点', value: '18', tone: '#06d6a0' },
    { label: '新点亮星标', value: '7', tone: '#ffe58f' },
    { label: '薄弱收敛', value: '2', tone: '#00d4ff' },
  ],
  profile: [
    { label: '主薄弱', before: '指针泛复习', after: '二级指针传参' },
    { label: '学习偏好', before: '文字讲解', after: '栈图 + 队列快照' },
  ],
  route: [
    '下一轮前 20 分钟优先修复二级指针与地址别名',
    '图结构从概念复习切到 BFS visited 标记时机训练',
    '已掌握节点转入迁移题，不再占用主路径时间',
  ],
}

function acceptRoundAdjustment() {
  showRoundInsight.value = false
  router.push({ path: '/learning-path', query: { focus: 'round-adjustment' } })
}

function onTreeNodeClick(node: TreeNode) {
  if (node.status === 'weak') {
    selectedWeakNode.value = node
  }
}

function addToNextPath() {
  if (selectedWeakNode.value) {
    alert(`已将"${selectedWeakNode.value.name}"的补救任务加入下一轮学习路径`)
  }
}

const defaultStats: StatItem[] = [
  { label: '学习时长', value: '128h', change: '+12h', icon: Clock, color: '#00d4ff' },
  { label: '完成资源', value: '47', change: '+5', icon: PenTool, color: '#7c3aed' },
  { label: '平均正确率', value: '82%', change: '+3%', icon: Target, color: '#06d6a0' },
  { label: '知识掌握度', value: '68%', change: '+8%', icon: TrendingUp, color: '#f59e0b' },
]

const defaultSuggestions: SuggestionItem[] = [
  { text: '概率论与数理统计是当前短板，建议安排 2 小时专项复习。', type: 'weakness', icon: AlertTriangle },
  { text: '机器学习基础掌握较稳，可以逐步加入项目实战。', type: 'strength', icon: Sparkles },
  { text: '本周学习时长较上周提升 15%，可以继续保持当前节奏。', type: 'positive', icon: ArrowUp },
  { text: '建议增加编程实战时间，理论与实践比例可以调整到 1:1。', type: 'action', icon: ArrowRight },
]

const stats = ref(defaultStats)
const suggestions = ref(defaultSuggestions)

const subjects = [
  { name: 'C / Python 编程基础', mastery: 90, color: '#00599C' },
  { name: '数据结构与算法', mastery: 78, color: '#4CAF50' },
  { name: '计算机系统（OS/网络/DB）', mastery: 58, color: '#1565C0' },
  { name: '机器学习', mastery: 65, color: '#00d4ff' },
  { name: '深度学习', mastery: 42, color: '#7c3aed' },
  { name: '数学与编程基础', mastery: 82, color: '#f43f5e' },
]

const weeklyTrend = [
  { week: 'W1', you: 55, avg: 50 },
  { week: 'W2', you: 58, avg: 52 },
  { week: 'W3', you: 62, avg: 54 },
  { week: 'W4', you: 68, avg: 55 },
  { week: 'W5', you: 65, avg: 56 },
  { week: 'W6', you: 72, avg: 58 },
  { week: 'W7', you: 78, avg: 60 },
]

const badges = [
  { icon: Sparkles, name: '初识学习', earned: true, color: '#00d4ff' },
  { icon: Zap, name: '连续打卡', earned: true, color: '#06d6a0' },
  { icon: Award, name: '知识达人', earned: true, color: '#7c3aed' },
  { icon: PenTool, name: '刷题能手', earned: false, color: '#f59e0b' },
  { icon: Brain, name: '项目先锋', earned: false, color: '#f43f5e' },
  { icon: TrendingUp, name: '学习大师', earned: false, color: '#3b82f6' },
]

const atlasNodes = [
  { label: '学生画像', detail: '综合评估 68%', progress: 68, tone: '#00d4ff', x: 50, y: 48, kind: 'core' },
  { label: 'C / Python 编程基础', detail: '主干课程', progress: 92, tone: '#06d6a0', x: 50, y: 16, kind: 'course' },
  { label: '数据结构与算法', detail: '分支索引', progress: 68, tone: '#3b82f6', x: 78, y: 34, kind: 'branch' },
  { label: '指针与内存', detail: '薄弱知识点', progress: 42, tone: '#f43f5e', x: 72, y: 68, kind: 'weak' },
  { label: '操作系统原理', detail: '学习中', progress: 55, tone: '#f59e0b', x: 27, y: 68, kind: 'branch' },
  { label: '机器学习实践', detail: '下一阶段', progress: 20, tone: '#7c3aed', x: 22, y: 32, kind: 'next' },
]

const learningStreams = [
  { label: '诊断入口', value: '23 个行为信号', text: '测评错题、资源完成度、对话追问汇入同一条学习画像时间线。', tone: '#00d4ff' },
  { label: '路径修正', value: '2 个薄弱点', text: '图结构与指针训练自动插入下一轮路径，不再只给静态报告。', tone: '#f43f5e' },
  { label: '星标反馈', value: '3 枚已点亮', text: '完成的知识点在树叶上高亮，未完成节点保持低亮等待触发。', tone: '#ffe58f' },
]

const pathStages = [
  { label: '画像采集', value: 88, tone: '#00d4ff' },
  { label: '知识定位', value: 72, tone: '#3b82f6' },
  { label: '薄弱修复', value: 46, tone: '#f43f5e' },
  { label: '下一路径', value: 64, tone: '#7c3aed' },
]

const treeNodes: TreeNode[] = [
  { name: 'C / Python 编程基础', status: 'mastered', progress: 92 },
  { name: '数据结构与算法', status: 'learning', progress: 68 },
  { name: '指针与内存', status: 'weak', progress: 42, issue: '指针传递与内存分配理解不稳定', cause: '概念混淆', remedialResources: ['指针内存图解卡片', '指针专项练习 5 题'], pathImpact: '已插入课后巩固阶段' },
  { name: '图结构与搜索', status: 'weak', progress: 38, issue: '节点关系理解不稳定', cause: '概念混淆', remedialResources: ['图结构思维导图', '专项练习 3 题'], pathImpact: '已插入课后巩固阶段' },
  { name: '操作系统原理', status: 'learning', progress: 55 },
  { name: '机器学习实践', status: 'next', progress: 20 },
]

const fineTreeNodes: TreeNode[] = [
  { name: '栈帧与地址生命周期', status: 'mastered', progress: 86 },
  { name: 'malloc / free 配对', status: 'learning', progress: 58 },
  { name: '二级指针传参', status: 'weak', progress: 41, issue: '无法稳定判断形参修改是否能同步到调用方', cause: '指针层级与地址别名混淆', remedialResources: ['二级指针调用栈图解', 'swap / createNode 对照练习 5 题'], pathImpact: '插入第 3 章课后微训练' },
  { name: '*p 与 p 的读写方向', status: 'weak', progress: 44, issue: '把修改指针变量和修改指针指向的值混在一起', cause: '缺少内存格子图推演', remedialResources: ['指针别名关系画图卡', '逐行 Trace 训练 4 题'], pathImpact: '插入下一轮补弱任务' },
  { name: '邻接表建图', status: 'learning', progress: 68 },
  { name: 'BFS visited 标记时机', status: 'weak', progress: 38, issue: '入队前后标记时机不稳定，导致重复访问或漏节点', cause: '队列推进过程没有形成步骤模型', remedialResources: ['BFS 队列快照动画', 'visited 标记专项 6 题'], pathImpact: '插入第 5 章搜索训练' },
  { name: 'DFS 回溯边界', status: 'learning', progress: 52 },
  { name: '数组越界与指针偏移', status: 'learning', progress: 61 },
  { name: '结构体指针成员访问', status: 'mastered', progress: 84 },
  { name: '链表头插与尾插差异', status: 'learning', progress: 66 },
  { name: '释放后悬空指针', status: 'weak', progress: 36 },
  { name: '递归终止条件', status: 'mastered', progress: 88 },
  { name: '图节点入度统计', status: 'learning', progress: 57 },
  { name: '队列空判边界', status: 'weak', progress: 40 },
  { name: '最短路径初始化', status: 'next', progress: 24 },
  { name: '复杂度从循环推导', status: 'learning', progress: 62 },
  { name: '错题聚类复盘', status: 'weak', progress: 34 },
  { name: '15 分钟图解补弱', status: 'next', progress: 20 },
]

const profileTrace = {
  before: [
    { label: '图结构掌握度', value: '68%' },
    { label: '指针掌握度', value: '65%' },
    { label: '资源偏好', value: '文本讲解' },
  ],
  evidence: [
    '阶段测评错题 2/3 来自图结构与指针',
    '学生连续询问"节点关系"相关问题 3 次',
    '指针相关练习正确率从 65% 下降至 42%',
  ],
  after: [
    { label: '图结构掌握度', value: '42% ↓' },
    { label: '指针掌握度', value: '42% ↓' },
    { label: '新增偏好', value: '思维导图 + 例题拆解' },
  ],
  nextAction: '下一轮路径插入图结构补弱与指针训练资源',
}

const iconMap = {
  Clock,
  PenTool,
  Target,
  TrendingUp,
  Sparkles,
  Award,
  Zap,
  Brain,
} as const

const chartPoints = computed(() => {
  const maxX = 350
  const width = maxX / (weeklyTrend.length - 1)
  const toY = (value: number) => 100 - value
  const youPoints = weeklyTrend.map((item, index) => `${index * width},${toY(item.you)}`).join(' ')
  const avgPoints = weeklyTrend.map((item, index) => `${index * width},${toY(item.avg)}`).join(' ')
  return { youPoints, avgPoints }
})

const averageMastery = computed(() => {
  const sum = subjects.reduce((total, item) => total + item.mastery, 0)
  return Math.round(sum / subjects.length)
})

function suggestIconColor(type: SuggestionType) {
  const colors: Record<SuggestionType, string> = {
    weakness: 'var(--color-accent-rose)',
    strength: 'var(--color-accent-cyan)',
    positive: 'var(--color-accent-emerald)',
    action: 'var(--color-accent-amber)',
  }
  return { color: colors[type] }
}

function inferSuggestionType(text: string): SuggestionType {
  if (text.includes('短板') || text.includes('薄弱') || text.includes('加强')) return 'weakness'
  if (text.includes('保持') || text.includes('提升')) return 'positive'
  if (text.includes('可以') || text.includes('掌握')) return 'strength'
  return 'action'
}

function iconForSuggestion(type: SuggestionType) {
  if (type === 'weakness') return AlertTriangle
  if (type === 'strength') return Sparkles
  if (type === 'positive') return ArrowUp
  return ArrowRight
}

function iconForStat(label: string, iconName?: string) {
  if (iconName && iconName in iconMap) {
    return iconMap[iconName as keyof typeof iconMap]
  }

  if (label.includes('时长')) return Clock
  if (label.includes('课时') || label.includes('资源')) return PenTool
  if (label.includes('正确率')) return Target
  if (label.includes('掌握')) return TrendingUp
  return Brain
}

function goToTutoring(text?: string) {
  router.push({ path: '/tutoring', query: text ? { q: text } : {} })
}

function masteryColor(value: number) {
  if (value >= 80) return 'var(--color-accent-emerald)'
  if (value >= 60) return 'var(--color-accent-cyan)'
  if (value >= 40) return 'var(--color-accent-amber)'
  return 'var(--color-accent-rose)'
}

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    loaded.value = true
  }, 100)

  fetchEvaluation()
    .then(data => {
      stats.value = data.stats.map(item => ({
        ...item,
        icon: iconForStat(item.label, item.icon),
      }))

      suggestions.value = data.suggestions.map(item => {
        const type = item.type ?? inferSuggestionType(item.text)
        return {
          text: item.text,
          type,
          icon: iconForSuggestion(type),
        }
      })

      reportDate.value = data.generatedAt
    })
    .catch(() => {
    })
    .finally(() => {
      isLoading.value = false
      setTimeout(() => {
        showRoundInsight.value = true
      }, 350)
    })
})
</script>

<template>
  <div class="evaluation">
    <ParticleBackground />
    <div class="eval-page-header">
      <div class="header-left">
        <div class="hero-badge">效果评估</div>
        <h1 class="page-title">学习效果<span class="gradient-text">数据洞察</span></h1>
        <p class="page-subtitle">从测评结果、资源完成度和知识树变化中识别薄弱点，并反向更新学生画像。</p>
        <p v-if="isLoading" class="page-status">正在同步评估数据...</p>
      </div>
      <div class="header-right">
        <button class="report-btn" @click="showReportModal = true">
          <FileBarChart :size="16" stroke-width="1.5" />
          <span>生成评估报告</span>
        </button>
      </div>
    </div>

    <div class="eval-summary-cards">
      <div v-for="item in stats" :key="item.label" class="summary-card" :style="{ '--s-color': item.color }">
        <div class="summary-icon">
          <component :is="item.icon" :size="20" stroke-width="1.5" />
        </div>
        <div class="summary-body">
          <div class="summary-top">
            <span class="summary-value">{{ item.value }}</span>
            <span class="summary-change">{{ item.change }}</span>
          </div>
          <span class="summary-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div class="eval-main-grid">
      <div class="card profile-trace-card">
        <div class="card-head">
          <h2 class="card-title-sm">画像更新记录</h2>
          <span class="card-tag">反向更新</span>
        </div>
        <ProfileUpdateTrace :data="profileTrace" />
      </div>

      <div class="card three-mini-card">
        <div class="card-head">
          <h2 class="card-title-sm">学习状态可视化</h2>
          <span class="card-tag">3D</span>
        </div>
        <ThreeKnowledgeTree fill :knowledge-points="fineTreeNodes" />
        <transition name="round-panel">
          <section v-if="showRoundInsight" class="round-insight-panel" aria-label="学习画像更新提示">
            <div class="round-insight-head">
              <div class="round-chip">
                <Sparkles :size="15" stroke-width="1.8" />
                <span>大树更新</span>
              </div>
              <button class="round-close" type="button" aria-label="关闭学习画像更新提示" @click="showRoundInsight = false">×</button>
            </div>

            <h3>{{ roundInsight.title }}</h3>
            <p class="round-copy">{{ roundInsight.subtitle }}</p>

            <div class="round-metrics">
              <div v-for="item in roundInsight.metrics" :key="item.label" class="round-metric" :style="{ '--round-tone': item.tone }">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </div>
            </div>

            <div class="round-profile-shift">
              <div v-for="item in roundInsight.profile" :key="item.label" class="shift-row">
                <span>{{ item.label }}</span>
                <strong>{{ item.before }}</strong>
                <ArrowRight :size="13" stroke-width="1.6" />
                <em>{{ item.after }}</em>
              </div>
            </div>

            <div class="round-route">
              <span class="route-title">下一轮侧重路线</span>
              <button v-for="item in roundInsight.route" :key="item" type="button" class="route-node" @click="goToTutoring(item)">
                <span class="route-dot" />
                <span>{{ item }}</span>
              </button>
            </div>

            <div class="round-actions">
              <button class="round-secondary" type="button" @click="showRoundInsight = false">稍后查看</button>
              <button class="round-primary" type="button" @click="acceptRoundAdjustment">
                接受调整路线
                <ArrowRight :size="14" stroke-width="1.7" />
              </button>
            </div>
          </section>
        </transition>
      </div>
    </div>

    <div class="eval-knowledge-section">
      <div class="card growth-tree-card">
        <div class="card-head">
          <h2 class="card-title-sm">成长知识树</h2>
          <span class="card-tag">评估反馈</span>
        </div>
        <GrowthKnowledgeTree :nodes="treeNodes" @node-click="onTreeNodeClick" />
        <div class="tree-feedback">
          <div class="tree-fb-item weak">
            <AlertTriangle :size="14" stroke-width="1.5" />
            <span>指针与内存、图结构为薄弱点，已自动生成补救资源</span>
          </div>
          <div class="tree-fb-item action">
            <ArrowRight :size="14" stroke-width="1.5" />
            <span>下一轮学习路径将优先安排薄弱知识点的复习任务</span>
          </div>
        </div>
      </div>

      <div v-if="selectedWeakNode" class="card weak-detail-card">
        <div class="weak-detail-header">
          <AlertTriangle :size="16" stroke-width="1.5" />
          <span>{{ selectedWeakNode.name }}</span>
          <button class="weak-detail-close" @click="selectedWeakNode = null">✕</button>
        </div>
        <div class="weak-detail-grid">
          <div class="weak-detail-item">
            <span class="weak-detail-label">薄弱点名称</span>
            <span class="weak-detail-value">{{ selectedWeakNode.name }}</span>
          </div>
          <div class="weak-detail-item">
            <span class="weak-detail-label">错因</span>
            <span class="weak-detail-value">{{ selectedWeakNode.cause }}</span>
          </div>
          <div class="weak-detail-item">
            <span class="weak-detail-label">问题描述</span>
            <span class="weak-detail-value">{{ selectedWeakNode.issue }}</span>
          </div>
          <div class="weak-detail-item">
            <span class="weak-detail-label">补救资源</span>
            <span class="weak-detail-value">{{ selectedWeakNode.remedialResources?.join('、') }}</span>
          </div>
          <div class="weak-detail-item full-width">
            <span class="weak-detail-label">路径影响</span>
            <span class="weak-detail-value">{{ selectedWeakNode.pathImpact }}</span>
          </div>
        </div>
        <div class="weak-detail-actions">
          <button class="weak-btn primary" @click="router.push('/resources')">
            查看补救资源
            <ArrowRight :size="12" stroke-width="1.5" />
          </button>
          <button class="weak-btn secondary" @click="addToNextPath()">
            加入下一轮路径
            <ArrowRight :size="12" stroke-width="1.5" />
          </button>
        </div>
      </div>
    </div>

    <div class="eval-bottom-grid">
      <div class="card chart-card">
        <div class="card-head">
          <h2 class="card-title-sm">能力成长曲线</h2>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot cyan" />我的</span>
            <span class="legend-item"><span class="legend-dot dim" />平均</span>
          </div>
        </div>
        <div class="chart-body">
          <svg viewBox="0 0 350 120" class="trend-svg">
            <line x1="0" y1="30" x2="350" y2="30" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="60" x2="350" y2="60" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <line x1="0" y1="90" x2="350" y2="90" stroke="rgba(0,212,255,0.04)" stroke-width="1" />
            <polyline :points="chartPoints.avgPoints" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="5 4" />
            <polyline :points="chartPoints.youPoints" fill="none" stroke="url(#trendLine)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-labels">
            <span v-for="item in weeklyTrend" :key="item.week">{{ item.week }}</span>
          </div>
          <div class="chart-footer">
            <span>累计提升 <strong>23%</strong></span>
            <span>较上周 <strong class="up">+12%</strong></span>
          </div>
        </div>
      </div>

      <div class="card mastery-card">
        <div class="card-head">
          <h2 class="card-title-sm">知识掌握度</h2>
          <span class="mastery-avg">平均 {{ averageMastery }}%</span>
        </div>
        <div class="mastery-list">
          <div v-for="subject in subjects" :key="subject.name" class="mastery-row">
            <div class="mastery-top">
              <span class="mastery-name">{{ subject.name }}</span>
              <span class="mastery-pct" :style="{ color: masteryColor(subject.mastery) }">{{ subject.mastery }}%</span>
            </div>
            <div class="mastery-track">
              <div
                class="mastery-fill"
                :style="{
                  width: loaded ? `${subject.mastery}%` : '0%',
                  background: masteryColor(subject.mastery),
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card suggest-card">
        <div class="card-head">
          <h2 class="card-title-sm">学习建议</h2>
          <span class="suggest-count">{{ suggestions.length }} 条</span>
        </div>
        <div class="suggest-list">
          <div
            v-for="(item, index) in suggestions"
            :key="index"
            :class="['suggest-item', item.type]"
            @click="goToTutoring(item.text)"
          >
            <div class="suggest-icon">
              <component :is="item.icon" :size="15" stroke-width="1.5" :style="suggestIconColor(item.type)" />
            </div>
            <span class="suggest-text">{{ item.text }}</span>
            <ArrowRight :size="13" stroke-width="1.5" class="suggest-arrow" />
          </div>
        </div>
      </div>

      <div class="card badge-card">
        <div class="card-head">
          <h2 class="card-title-sm">成就徽章</h2>
          <span class="suggest-count">{{ badges.filter(b => b.earned).length }}/{{ badges.length }}</span>
        </div>
        <div class="badge-grid">
          <div
            v-for="badge in badges"
            :key="badge.name"
            :class="['badge-item', { earned: badge.earned }]"
            :style="{ '--b-color': badge.color }"
          >
            <component :is="badge.icon" v-if="badge.earned" :size="18" stroke-width="2" />
            <span v-else class="badge-locked">•</span>
            <span class="badge-name">{{ badge.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <KnowledgeConstellation />

    <section class="learning-atlas-section">
      <div class="atlas-shell">
        <div class="atlas-head">
          <div>
            <span class="atlas-kicker">Knowledge Atlas</span>
            <h2>学习星图</h2>
          </div>
          <div class="atlas-score">
            <strong>{{ averageMastery }}%</strong>
            <span>综合掌握</span>
          </div>
        </div>

        <div class="atlas-layout">
          <div class="mindmap-canvas">
            <svg class="mindmap-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M50 48 C50 34 50 26 50 16" />
              <path d="M50 48 C62 42 68 36 78 34" />
              <path d="M50 48 C63 54 68 62 72 68" />
              <path d="M50 48 C40 56 34 63 27 68" />
              <path d="M50 48 C38 42 30 36 22 32" />
            </svg>
            <button
              v-for="node in atlasNodes"
              :key="node.label"
              class="atlas-node"
              :class="node.kind"
              :style="{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.tone, '--node-progress': `${node.progress}%` }"
              type="button"
            >
              <span class="node-orbit" />
              <strong>{{ node.label }}</strong>
              <em>{{ node.detail }}</em>
              <small>{{ node.progress }}%</small>
            </button>
          </div>

          <div class="atlas-side">
            <div v-for="stream in learningStreams" :key="stream.label" class="stream-row" :style="{ '--stream-color': stream.tone }">
              <span class="stream-pin" />
              <div>
                <span class="stream-label">{{ stream.label }}</span>
                <strong>{{ stream.value }}</strong>
                <p>{{ stream.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="path-console">
          <div class="path-rail">
            <div
              v-for="stage in pathStages"
              :key="stage.label"
              class="path-stage"
              :style="{ '--stage-color': stage.tone, '--stage-value': `${stage.value}%` }"
            >
              <span>{{ stage.label }}</span>
              <strong>{{ stage.value }}%</strong>
            </div>
          </div>
          <div class="path-suggestions">
            <button
              v-for="(item, index) in suggestions.slice(0, 3)"
              :key="index"
              :class="['path-suggestion', item.type]"
              type="button"
              @click="goToTutoring(item.text)"
            >
              <component :is="item.icon" :size="15" stroke-width="1.5" :style="suggestIconColor(item.type)" />
              <span>{{ item.text }}</span>
              <ArrowRight :size="13" stroke-width="1.5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <transition name="scale-in">
      <div v-if="showReportModal" class="modal-overlay" @click.self="showReportModal = false">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">学习评估报告</h2>
            <button class="modal-close-btn" @click="showReportModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="report-summary">
              <div class="report-grade">
                <span class="grade-letter">B+</span>
                <span class="grade-label">综合评级</span>
              </div>
              <div class="report-metrics">
                <div class="metric-item">
                  <span class="metric-label">学习总时长</span>
                  <span class="metric-value">128 小时</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">完成课时</span>
                  <span class="metric-value">47 节</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">平均正确率</span>
                  <span class="metric-value">82%</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">知识掌握度</span>
                  <span class="metric-value">68%</span>
                </div>
              </div>
            </div>
            <div class="report-section">
              <h3>阶段总结</h3>
              <p>当前学习节奏稳定，机器学习基础表现较好，但在深度学习和大模型应用上的完成度还有明显提升空间。</p>
            </div>
            <div class="report-section">
              <h3>下一步建议</h3>
              <ul class="rec-list">
                <li>优先补足概率统计与模型评估相关内容。</li>
                <li>增加项目驱动学习，把知识点转成可运行成果。</li>
                <li>每周做一次短复盘，及时调整学习节奏。</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <span class="footer-date">{{ reportDate }}</span>
            <div class="footer-actions">
              <button class="btn-ghost">预览</button>
              <button class="btn-primary">
                <Download :size="14" stroke-width="1.5" />
                下载 PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.evaluation {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.eval-page-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.header-left {
  max-width: 600px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-bottom: 12px;
}

.page-title {
  margin: 0 0 8px;
  color: #fff;
  font-size: 34px;
  font-family: var(--font-display);
  font-weight: 400;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.page-status {
  margin-top: 8px;
  color: var(--color-accent-cyan);
  font-size: 14px;
}

.header-right {
  flex-shrink: 0;
  padding-top: 28px;
}

.report-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.15);
  color: var(--color-accent-cyan);
  white-space: nowrap;
  transition: all 0.2s var(--ease-out);
}

.report-btn:hover {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.16), rgba(124, 58, 237, 0.16));
}

.eval-summary-cards {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--s-color) 12%, transparent);
  color: var(--s-color);
  flex-shrink: 0;
}

.summary-body {
  flex: 1;
}

.summary-top {
  display: flex;
  align-items: baseline;
  gap: 8px;
  justify-content: space-between;
}

.summary-value {
  color: #fff;
  font-size: 22px;
  font-family: var(--font-display);
}

.summary-change {
  color: var(--color-accent-emerald);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
}

.summary-label {
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.eval-main-grid {
  max-width: none;
  margin: 0 auto;
  padding: 0 8px;
  transform: translateY(-176px);
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: -156px;
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title-sm {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 20px;
}

.card-tag {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
}

.three-mini-card :deep(.three-tree-wrapper) {
  border-radius: 0;
}

.three-mini-card {
  position: relative;
  order: -1;
  min-height: calc(100vh - 64px);
  padding: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
}

.three-mini-card .card-head {
  position: absolute;
  top: 10px;
  left: 34px;
  right: 34px;
  z-index: 2;
  margin-bottom: 0;
  pointer-events: none;
}

.three-mini-card :deep(.three-tree-wrapper) {
  height: calc(100vh - 42px);
  min-height: 760px;
  border: 0;
}

.three-mini-card :deep(.three-tree-canvas) {
  min-height: 760px;
}

.round-insight-panel {
  position: absolute;
  left: 34px;
  bottom: 42px;
  z-index: 5;
  width: min(430px, calc(100vw - 80px));
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(255, 229, 143, 0.2);
  background:
    radial-gradient(circle at 16% 0%, rgba(255, 229, 143, 0.18), transparent 32%),
    linear-gradient(145deg, rgba(8, 13, 28, 0.84), rgba(13, 18, 42, 0.72));
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  color: rgba(255, 255, 255, 0.92);
}

.round-insight-panel::before {
  content: '';
  position: absolute;
  left: 64px;
  bottom: 100%;
  width: 1px;
  height: 70px;
  background: linear-gradient(to top, rgba(255, 229, 143, 0.52), rgba(0, 212, 255, 0));
  box-shadow: 0 0 22px rgba(255, 229, 143, 0.36);
}

.round-insight-panel::after {
  content: '';
  position: absolute;
  left: 57px;
  bottom: calc(100% + 64px);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffe58f;
  box-shadow: 0 0 18px rgba(255, 229, 143, 0.8), 0 0 38px rgba(0, 212, 255, 0.28);
}

.round-insight-head,
.round-actions,
.shift-row,
.round-chip {
  display: flex;
  align-items: center;
}

.round-insight-head {
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.round-chip {
  gap: 7px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 229, 143, 0.22);
  background: rgba(255, 229, 143, 0.08);
  color: #ffe58f;
  font-size: 12px;
  font-weight: 700;
}

.round-close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.66);
  transition: all 0.2s var(--ease-out);
}

.round-close:hover {
  color: #fff;
  border-color: rgba(255, 229, 143, 0.32);
  background: rgba(255, 229, 143, 0.08);
}

.round-insight-panel h3 {
  margin: 0;
  font-size: 22px;
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: 0;
}

.round-copy {
  margin: 8px 0 16px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 13px;
  line-height: 1.65;
}

.round-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.round-metric {
  min-height: 62px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--round-tone) 26%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--round-tone) 12%, transparent), rgba(255, 255, 255, 0.025));
}

.round-metric strong {
  display: block;
  color: var(--round-tone);
  font-family: var(--font-mono);
  font-size: 19px;
  line-height: 1;
}

.round-metric span {
  display: block;
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
}

.round-profile-shift {
  display: grid;
  gap: 8px;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.shift-row {
  gap: 8px;
  min-width: 0;
  color: rgba(255, 255, 255, 0.64);
  font-size: 12px;
}

.shift-row span {
  width: 64px;
  flex: 0 0 auto;
  color: rgba(255, 255, 255, 0.46);
}

.shift-row strong,
.shift-row em {
  min-width: 0;
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shift-row strong {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.shift-row em {
  color: #7ef9d4;
  font-weight: 700;
}

.round-route {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.route-title {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.route-node {
  display: grid;
  grid-template-columns: 11px 1fr;
  gap: 9px;
  align-items: start;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  background: rgba(0, 212, 255, 0.045);
  color: rgba(255, 255, 255, 0.72);
  text-align: left;
  font-size: 12px;
  line-height: 1.5;
  transition: all 0.2s var(--ease-out);
}

.route-node:hover {
  border-color: rgba(0, 212, 255, 0.28);
  background: rgba(0, 212, 255, 0.08);
  color: #fff;
}

.route-dot {
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 14px rgba(0, 212, 255, 0.62);
}

.round-actions {
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.round-secondary,
.round-primary {
  min-height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s var(--ease-out);
}

.round-secondary {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.62);
}

.round-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(255, 229, 143, 0.34);
  background: linear-gradient(135deg, rgba(255, 229, 143, 0.96), rgba(0, 212, 255, 0.88));
  color: #07101f;
  box-shadow: 0 12px 28px rgba(0, 212, 255, 0.18);
}

.round-primary:hover,
.round-secondary:hover {
  transform: translateY(-1px);
}

.round-panel-enter-active,
.round-panel-leave-active {
  transition: opacity 0.36s var(--ease-out), transform 0.36s var(--ease-out), filter 0.36s var(--ease-out);
}

.round-panel-enter-from,
.round-panel-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.97);
  filter: blur(6px);
}

.profile-trace-card {
  display: none;
}

.eval-knowledge-section {
  display: none !important;
}

.growth-tree-card {
  grid-column: 1;
}

.tree-feedback {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.tree-fb-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tree-fb-item.weak {
  background: rgba(244, 63, 94, 0.05);
  border: 1px solid rgba(244, 63, 94, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.tree-fb-item.action {
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.tree-fb-item.weak svg {
  color: var(--color-accent-rose);
  flex-shrink: 0;
  margin-top: 2px;
}

.tree-fb-item.action svg {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
  margin-top: 2px;
}

.weak-detail-card {
  border-color: rgba(244, 63, 94, 0.15);
  background: rgba(244, 63, 94, 0.02);
  animation: slideDown 0.25s ease-out;
}

.weak-detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.weak-detail-header svg {
  color: #f43f5e;
}

.weak-detail-close {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.2s;
}

.weak-detail-close:hover {
  color: #fff;
}

.weak-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.weak-detail-item {
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.weak-detail-item.full-width {
  grid-column: 1 / -1;
}

.weak-detail-label {
  display: block;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.weak-detail-value {
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.weak-detail-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.weak-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.weak-btn.primary {
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: var(--color-accent-cyan);
}

.weak-btn.primary:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.35);
}

.weak-btn.secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.55);
}

.weak-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  color: #fff;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.eval-bottom-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px 40px;
  display: none !important;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
}

.chart-card {
  grid-column: 1 / -1;
}

.chart-legend {
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.cyan {
  background: var(--color-accent-cyan);
}

.legend-dot.dim {
  background: rgba(255, 255, 255, 0.2);
}

.trend-svg {
  width: 100%;
  height: 120px;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 13px;
}

.chart-footer strong {
  color: #fff;
}

.chart-footer .up {
  color: var(--color-accent-emerald);
}

.mastery-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mastery-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mastery-top {
  display: flex;
  justify-content: space-between;
}

.mastery-name {
  color: var(--color-text-secondary);
  font-size: 13px;
}

.mastery-pct {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
}

.mastery-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s var(--ease-out);
}

.mastery-avg {
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.suggest-card {
  grid-column: 1 / -1;
}

.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggest-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.suggest-item:hover {
  transform: translateX(2px);
}

.suggest-item.weakness {
  background: rgba(244, 63, 94, 0.04);
  border: 1px solid rgba(244, 63, 94, 0.08);
}

.suggest-item.strength {
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

.suggest-item.positive {
  background: rgba(6, 214, 160, 0.04);
  border: 1px solid rgba(6, 214, 160, 0.08);
}

.suggest-item.action {
  background: rgba(245, 158, 11, 0.04);
  border: 1px solid rgba(245, 158, 11, 0.08);
}

.suggest-icon,
.suggest-arrow {
  flex-shrink: 0;
}

.suggest-text {
  color: var(--color-text-secondary);
  flex: 1;
}

.suggest-count {
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.badge-card {
  grid-column: 1 / -1;
}

.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
  min-width: 80px;
  transition: all 0.2s;
}

.badge-item.earned {
  border-color: color-mix(in srgb, var(--b-color) 45%, transparent);
  color: var(--b-color);
}

.badge-item:not(.earned) {
  opacity: 0.4;
}

.badge-locked {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.3);
}

.badge-name {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

.learning-atlas-section {
  display: none;
  max-width: 1320px;
  margin: 0 auto;
  padding: 18px 40px 56px;
}

.atlas-shell {
  position: relative;
  overflow: hidden;
  padding: 28px;
  border: 1px solid rgba(0, 212, 255, 0.13);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(0, 212, 255, 0.08), transparent 30%),
    linear-gradient(315deg, rgba(124, 58, 237, 0.1), transparent 34%),
    rgba(8, 11, 28, 0.7);
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.28);
}

.atlas-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: radial-gradient(circle at 50% 40%, #000 0, transparent 72%);
  pointer-events: none;
}

.atlas-head,
.atlas-layout,
.path-console {
  position: relative;
  z-index: 1;
}

.atlas-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}

.atlas-kicker {
  display: inline-flex;
  color: rgba(126, 231, 255, 0.72);
  font-size: 11px;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.atlas-head h2 {
  margin: 4px 0 0;
  color: #fff;
  font-size: 28px;
  font-family: var(--font-display);
  font-weight: 400;
}

.atlas-score {
  min-width: 112px;
  text-align: right;
}

.atlas-score strong {
  display: block;
  color: #ffe58f;
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
}

.atlas-score span {
  color: rgba(255, 255, 255, 0.48);
  font-size: 12px;
}

.atlas-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.62fr);
  gap: 26px;
  align-items: stretch;
}

.mindmap-canvas {
  position: relative;
  min-height: 460px;
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 48%, rgba(0, 212, 255, 0.13), transparent 24%),
    radial-gradient(circle at 78% 34%, rgba(59, 130, 246, 0.1), transparent 18%),
    radial-gradient(circle at 24% 70%, rgba(245, 158, 11, 0.08), transparent 18%),
    rgba(255, 255, 255, 0.025);
}

.mindmap-lines {
  position: absolute;
  inset: 8%;
  width: 84%;
  height: 84%;
  overflow: visible;
}

.mindmap-lines path {
  fill: none;
  stroke: rgba(128, 223, 255, 0.34);
  stroke-width: 0.34;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 7px rgba(0, 212, 255, 0.45));
}

.atlas-node {
  position: absolute;
  width: clamp(118px, 13vw, 172px);
  min-height: 76px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 12px 14px 12px 16px;
  border: 1px solid color-mix(in srgb, var(--node-color) 36%, rgba(255, 255, 255, 0.08));
  border-radius: 14px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--node-color) 17%, transparent), transparent 64%),
    rgba(4, 8, 20, 0.72);
  color: #fff;
  text-align: left;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}

.atlas-node.core {
  width: clamp(150px, 15vw, 206px);
  min-height: 96px;
  border-color: rgba(0, 212, 255, 0.5);
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 229, 143, 0.2), transparent 30%),
    linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(124, 58, 237, 0.12));
}

.atlas-node strong {
  font-size: 14px;
  font-weight: 650;
  line-height: 1.25;
}

.atlas-node em {
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  font-style: normal;
}

.atlas-node small {
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: var(--node-color);
  font-family: var(--font-mono);
  font-size: 12px;
}

.node-orbit {
  position: absolute;
  inset: -7px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--node-color) 24%, transparent);
  opacity: 0.42;
}

.atlas-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.stream-row {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  padding: 4px 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.stream-row:last-child {
  border-bottom: 0;
}

.stream-pin {
  width: 12px;
  height: 12px;
  margin-top: 7px;
  border-radius: 50%;
  background: var(--stream-color);
  box-shadow: 0 0 22px color-mix(in srgb, var(--stream-color) 82%, transparent);
}

.stream-label {
  display: block;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.42);
  font-size: 11px;
}

.stream-row strong {
  display: block;
  color: #fff;
  font-size: 18px;
}

.stream-row p {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  line-height: 1.65;
}

.path-console {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 24px;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.path-rail {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  gap: 12px;
}

.path-stage {
  position: relative;
  min-height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 24px;
}

.path-stage::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 42px;
  height: var(--stage-value);
  max-height: 84px;
  border-radius: 999px 999px 4px 4px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--stage-color) 72%, transparent), rgba(255, 255, 255, 0.025));
  opacity: 0.74;
}

.path-stage span,
.path-stage strong {
  position: relative;
  z-index: 1;
}

.path-stage span {
  color: rgba(255, 255, 255, 0.56);
  font-size: 12px;
}

.path-stage strong {
  color: #fff;
  font-family: var(--font-mono);
  font-size: 13px;
}

.path-suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.path-suggestion {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) 14px;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
}

.path-suggestion span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  backdrop-filter: blur(4px);
}

.modal {
  width: 100%;
  max-width: 620px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 0;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--color-text-tertiary);
}

.modal-title {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 400;
}

.modal-body {
  padding: 20px 28px 28px;
}

.report-summary {
  display: flex;
  gap: 28px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.24);
  margin-bottom: 20px;
}

.report-grade {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grade-letter {
  font-size: 40px;
  font-family: var(--font-display);
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grade-label {
  margin-top: 4px;
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.report-metrics {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-item {
  display: flex;
  flex-direction: column;
}

.metric-label {
  color: var(--color-text-tertiary);
  font-size: 11px;
}

.metric-value {
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}

.report-section {
  margin-bottom: 20px;
}

.report-section h3 {
  margin: 0 0 6px;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 16px;
}

.report-section p,
.rec-list li {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 13px;
}

.rec-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.rec-list li {
  padding-left: 18px;
  position: relative;
}

.rec-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent-cyan);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  border-top: 1px solid var(--color-border);
}

.footer-date {
  color: var(--color-text-tertiary);
  font-size: 11px;
  font-family: var(--font-mono);
}

.footer-actions {
  display: flex;
  gap: 8px;
}

.btn-ghost {
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
}

@media (max-width: 900px) {
  .eval-page-header {
    padding: 28px 20px 0;
    flex-direction: column;
  }

  .header-right {
    padding-top: 0;
  }

  .eval-summary-cards {
    padding: 20px 20px 0;
    grid-template-columns: repeat(2, 1fr);
  }

  .eval-main-grid {
    padding: 16px 20px 0;
    grid-template-columns: 1fr;
  }

  .round-insight-panel {
    top: 92px;
    bottom: auto;
    left: 20px;
    width: min(420px, calc(100vw - 40px));
  }

  .round-insight-panel::before,
  .round-insight-panel::after {
    display: none;
  }

  .eval-knowledge-section {
    padding: 16px 20px 0;
  }

  .eval-bottom-grid {
    padding: 16px 20px 40px;
    grid-template-columns: 1fr;
  }

  .learning-atlas-section {
    padding: 16px 20px 44px;
  }

  .atlas-shell {
    padding: 22px;
  }

  .atlas-layout,
  .path-console {
    grid-template-columns: 1fr;
  }

  .mindmap-canvas {
    min-height: 430px;
  }

  .chart-card,
  .suggest-card,
  .badge-card {
    grid-column: 1;
  }
}

@media (max-width: 640px) {
  .eval-summary-cards {
    grid-template-columns: 1fr;
  }

  .eval-main-grid {
    transform: translateY(-132px);
    margin-bottom: -112px;
  }

  .three-mini-card :deep(.three-tree-wrapper),
  .three-mini-card :deep(.three-tree-canvas) {
    min-height: 660px;
  }

  .round-insight-panel {
    left: 16px;
    right: 16px;
    width: auto;
    padding: 15px;
  }

  .round-insight-panel h3 {
    font-size: 19px;
  }

  .round-metrics {
    grid-template-columns: 1fr;
  }

  .shift-row {
    flex-wrap: wrap;
  }

  .round-actions {
    justify-content: stretch;
  }

  .round-secondary,
  .round-primary {
    flex: 1;
    justify-content: center;
  }

  .atlas-head {
    flex-direction: column;
  }

  .atlas-score {
    text-align: left;
  }

  .mindmap-canvas {
    min-height: 500px;
  }

  .mindmap-lines {
    display: none;
  }

  .atlas-node {
    width: 42%;
  }

  .atlas-node.core {
    width: 54%;
  }

  .path-rail {
    grid-template-columns: repeat(2, 1fr);
  }

  .weak-detail-grid {
    grid-template-columns: 1fr;
  }

  .weak-detail-item.full-width {
    grid-column: 1;
  }

  .report-summary {
    flex-direction: column;
  }

  .modal-overlay {
    padding: 20px;
  }
}
</style>
