<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  AlertTriangle,
  ArrowLeft,
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
import { fetchEvaluation, agentPathReplan, fetchLatestProfile, agentEvaluate, fetchEvidenceTraces, fetchEvidenceSummary } from '@/lib/api'
import ThreeKnowledgeTree from '@/components/knowledge-tree/ThreeKnowledgeTree.vue'
import ParticleBackground from '@/components/evaluation/ParticleBackground.vue'
import AgentFlowTimeline from '@/components/evaluation/AgentFlowTimeline.vue'
import EvidenceTraceView from '@/components/evidence/EvidenceTraceView.vue'
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
const isGeneratingReport = ref(false)

async function generateReportOld() {
  isGeneratingReport.value = true
  try {
    const profile = await fetchLatestProfile()
    await agentEvaluate({ profile })
  } catch { /* fallback to modal display */ }
  isGeneratingReport.value = false
  showReportModal.value = true
}
const showRoundInsight = ref(false)
const reportDate = ref('2026-05-12')

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

const isReplanning = ref(false)

// Agent协作流状态
interface AgentNode {
  agentId: string
  agentName: string
  role: string
  input: string
  output: string
  confidence: number
  evidenceTags: string[]
  duration: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  timestamp?: string
}

const agentFlowActive = ref(false)
const agentNodes = ref<AgentNode[]>([])
const selectedAgent = ref<AgentNode | null>(null)

const defaultAgentNodes: AgentNode[] = [
  { agentId: 'profile', agentName: '画像智能体', role: '画像建模', input: '学生答题记录 + 历史画像', output: '识别指针与图结构薄弱', confidence: 0.92, evidenceTags: ['画像分析', '薄弱识别'], duration: 320, status: 'pending' },
  { agentId: 'eval', agentName: '评估智能体', role: '证据评估', input: '练习结果 + 资源完成度', output: '4 个盲点 + 错因归类', confidence: 0.88, evidenceTags: ['效果评估', '错因分析'], duration: 410, status: 'pending' },
  { agentId: 'reflection', agentName: '反思智能体', role: '路径反思', input: '评估结果 + 画像变化', output: '画像更新 + 路径触发', confidence: 0.83, evidenceTags: ['反向传播', '路径触发'], duration: 350, status: 'pending' },
]

// 画像更新动画状态
const previousMastery = ref<Record<string, number>>({})
const masteryDeltas = ref<Record<string, number>>({})

function animateAgentFlow() {
  agentFlowActive.value = true
  agentNodes.value = defaultAgentNodes.map(n => ({ ...n, status: 'pending' as const }))
  selectedAgent.value = null

  const delays = [0, 800, 1600]
  agentNodes.value.forEach((node, i) => {
    setTimeout(() => {
      agentNodes.value[i] = { ...agentNodes.value[i], status: 'running' }
    }, delays[i])
    setTimeout(() => {
      agentNodes.value[i] = { ...agentNodes.value[i], status: 'completed', timestamp: new Date().toISOString() }
      if (i === agentNodes.value.length - 1) {
        agentFlowActive.value = false
      }
    }, delays[i] + node.duration + 200)
  })
}

async function generateReport() {
  isGeneratingReport.value = true
  animateAgentFlow()

  // 保存旧掌握度用于动画
  previousMastery.value = {}
  subjects.value.forEach(s => { previousMastery.value[s.name] = s.mastery })

  try {
    const profile = await fetchLatestProfile()
    const result = await agentEvaluate({ profile }) as any

    // 从agent结果更新协作流
    if (result.agentResults && result.agentResults.length > 0) {
      result.agentResults.forEach((ar: any, i: number) => {
        if (i < agentNodes.value.length) {
          agentNodes.value[i] = {
            ...agentNodes.value[i],
            status: 'completed',
            confidence: ar.confidence ?? agentNodes.value[i].confidence,
            duration: ar.durationMs ?? agentNodes.value[i].duration,
            output: typeof ar.output === 'string' ? ar.output : JSON.stringify(ar.output?.mastery ?? ar.output?.riskAssessment ?? {}).slice(0, 60),
            evidenceTags: ar.evidence ?? agentNodes.value[i].evidenceTags,
            timestamp: new Date().toISOString(),
          }
        }
      })
      agentFlowActive.value = false
    }

    // 从评估结果更新掌握度
    if (result.evaluation?.mastery) {
      const masteryMap: Record<string, number> = {}
      result.evaluation.mastery.forEach((m: any) => { masteryMap[m.name] = m.level })
      subjects.value = subjects.value.map(s => {
        const newMastery = masteryMap[s.name] ?? s.mastery
        const delta = newMastery - s.mastery
        if (delta !== 0) masteryDeltas.value[s.name] = delta
        return { ...s, mastery: newMastery }
      })
    }

    // 从评估结果更新建议
    if (result.evaluation?.suggestions) {
      suggestions.value = result.evaluation.suggestions.map((item: any, index: number) => {
        const type = item.type ?? inferSuggestionType(item.text)
        return { text: normalizeSuggestionText(item.text, index), type, icon: iconForSuggestion(type) }
      })
    }

    // 从画像更新更新profileTrace
    if (result.evaluation?.profileUpdates?.adjustDimensions) {
      const updates = result.evaluation.profileUpdates.adjustDimensions
      profileTrace.after = updates.map((u: any) => ({
        label: u.dimension,
        value: `${u.delta > 0 ? '+' : ''}${u.delta}%`,
      }))
    }
  } catch {
    // fallback: 仍然显示默认数据
  }

  isGeneratingReport.value = false
  showReportModal.value = true
}

function handleAgentSelect(agent: AgentNode) {
  selectedAgent.value = selectedAgent.value?.agentId === agent.agentId ? null : agent
}

async function acceptRoundAdjustment() {
  showRoundInsight.value = false
  isReplanning.value = true
  try {
    const profile = await fetchLatestProfile()
    const evaluation = await fetchEvaluation().catch(() => null)
    await agentPathReplan({ profile, evaluation })
  } catch { /* fallback: navigate anyway */ }
  isReplanning.value = false
  router.push({ path: '/learning-path', query: { focus: 'round-adjustment' } })
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

const subjects = ref([
  { name: 'C / Python 编程基础', mastery: 90, color: '#00599C' },
  { name: '数据结构与算法', mastery: 78, color: '#4CAF50' },
  { name: '计算机系统（OS/网络/DB）', mastery: 58, color: '#1565C0' },
  { name: '机器学习', mastery: 65, color: '#00d4ff' },
  { name: '深度学习', mastery: 42, color: '#7c3aed' },
  { name: '数学与编程基础', mastery: 82, color: '#f43f5e' },
])

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

const fineTreeNodes: TreeNode[] = [
  // C 语言程序设计
  { name: '栈帧与地址生命周期', course: 'C 语言程序设计', status: 'mastered', progress: 86 },
  { name: 'malloc / free 配对', course: 'C 语言程序设计', status: 'learning', progress: 58 },
  { name: '二级指针传参', course: 'C 语言程序设计', status: 'weak', progress: 41, issue: '无法稳定判断形参修改是否能同步到调用方', cause: '指针层级与地址别名混淆', remedialResources: ['二级指针调用栈图解', 'swap / createNode 对照练习 5 题'], pathImpact: '插入第 3 章课后微训练' },
  { name: '*p 与 p 的读写方向', course: 'C 语言程序设计', status: 'weak', progress: 44, issue: '把修改指针变量和修改指针指向的值混在一起', cause: '缺少内存格子图推演', remedialResources: ['指针别名关系画图卡', '逐行 Trace 训练 4 题'], pathImpact: '插入下一轮补弱任务' },
  { name: '释放后悬空指针', course: 'C 语言程序设计', status: 'weak', progress: 36 },
  { name: '结构体指针成员访问', course: 'C 语言程序设计', status: 'mastered', progress: 84 },
  { name: '数组越界与指针偏移', course: 'C 语言程序设计', status: 'learning', progress: 61 },
  // 数据结构
  { name: '邻接表建图', course: '数据结构', status: 'learning', progress: 68 },
  { name: 'BFS visited 标记时机', course: '数据结构', status: 'weak', progress: 38, issue: '入队前后标记时机不稳定，导致重复访问或漏节点', cause: '队列推进过程没有形成步骤模型', remedialResources: ['BFS 队列快照动画', 'visited 标记专项 6 题'], pathImpact: '插入第 5 章搜索训练' },
  { name: 'DFS 回溯边界', course: '数据结构', status: 'learning', progress: 52 },
  { name: '链表头插与尾插差异', course: '数据结构', status: 'learning', progress: 66 },
  { name: '队列空判边界', course: '数据结构', status: 'weak', progress: 40 },
  { name: '图节点入度统计', course: '数据结构', status: 'learning', progress: 57 },
  { name: '最短路径初始化', course: '数据结构', status: 'next', progress: 24 },
  // 算法设计与分析
  { name: '递归终止条件', course: '算法设计与分析', status: 'mastered', progress: 88 },
  { name: '复杂度从循环推导', course: '算法设计与分析', status: 'learning', progress: 62 },
  { name: '错题聚类复盘', course: '算法设计与分析', status: 'weak', progress: 34 },
  { name: '15 分钟图解补弱', course: '算法设计与分析', status: 'next', progress: 20 },
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

const selectedNode = ref<TreeNode | null>(null)
const detailPulseKey = ref(0)

const selectedNodeDetail = computed(() => {
  const node = selectedNode.value
  if (!node) return null
  const course = node.course ?? '未分类'
  const siblings = fineTreeNodes.filter(n => n.course === course)
  const courseMastery = siblings.length > 0 ? Math.round(siblings.reduce((sum, n) => sum + n.progress, 0) / siblings.length) : 0
  const courseWeakCount = siblings.filter(n => n.status === 'weak').length
  return {
    name: node.name,
    course,
    status: node.status,
    progress: node.progress,
    issue: node.issue ?? null,
    cause: node.cause ?? null,
    remedialResources: node.remedialResources ?? [],
    pathImpact: node.pathImpact ?? null,
    siblings,
    courseMastery,
    courseWeakCount,
  }
})

function handleMarkerSelect(marker: any) {
  // 知识点苹果：直接匹配
  const point = fineTreeNodes.find(n => n.name === marker?.label)
  if (point) {
    selectNode(point)
    return
  }

  // 课程/分支标记：显示该课程的第一个薄弱知识点，或第一个知识点
  if (marker?.type === 'course' || marker?.type === 'branch') {
    const courseName = marker.label
    const courseNodes = fineTreeNodes.filter(n => n.course === courseName)
    if (courseNodes.length > 0) {
      const weakNode = courseNodes.find(n => n.status === 'weak')
      selectNode(weakNode ?? courseNodes[0])
      return
    }

    const listedCourse = marker.items?.find((item: string) => fineTreeNodes.some(n => n.course === item))
    const listedNodes = listedCourse ? fineTreeNodes.filter(n => n.course === listedCourse) : []
    const fallbackNode = listedNodes.find(n => n.status === 'weak')
      ?? fineTreeNodes.find(n => n.status === 'weak')
      ?? fineTreeNodes[0]
    if (fallbackNode) selectNode(fallbackNode)
  }
}

function selectNode(node: TreeNode) {
  selectedNode.value = node
  detailPulseKey.value += 1
}

function closeNodeDetail() {
  selectedNode.value = null
}

function addToNextPath() {
  if (!selectedNode.value) return
  showRoundInsight.value = true
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

const overviewLinePoints = computed(() => {
  const maxX = 320
  const width = maxX / (weeklyTrend.length - 1)
  const toY = (value: number) => 86 - value * 0.72
  return weeklyTrend.map((item, index) => `${index * width},${toY(item.you)}`).join(' ')
})

const overviewAvgLinePoints = computed(() => {
  const maxX = 320
  const width = maxX / (weeklyTrend.length - 1)
  const toY = (value: number) => 86 - value * 0.72
  return weeklyTrend.map((item, index) => `${index * width},${toY(item.avg)}`).join(' ')
})

const overviewBars = computed(() => subjects.value.map((subject) => ({
  label: subject.name
    .replace('C / Python', '编程基础')
    .replace('OS/网络/DB', '操作系统、网络与数据库'),
  value: subject.mastery,
  tone: masteryColor(subject.mastery),
})))

const weeklyBars = computed(() => weeklyTrend.map((item, index) => ({
  label: item.week.replace('W', '第 ') + ' 周',
  value: item.you,
  height: Math.max(18, item.you * 0.82),
  delta: item.you - item.avg,
  delay: `${index * 80}ms`,
})))

const averageMastery = computed(() => {
  const sum = subjects.value.reduce((total, item) => total + item.mastery, 0)
  return Math.round(sum / subjects.value.length)
})

const windRoseSegments = computed(() => {
  const total = Math.max(subjects.value.length, 1)
  const center = 82
  return subjects.value.map((subject, index) => {
    const angle = -90 + index * (360 / total)
    const length = 22 + subject.mastery * 0.42
    const width = Math.max(9, 28 - total)
    const rad = angle * Math.PI / 180
    const x = center + Math.cos(rad) * (length * 0.46)
    const y = center + Math.sin(rad) * (length * 0.46)
    return {
      ...subject,
      angle,
      length,
      width,
      x,
      y,
      tone: masteryColor(subject.mastery),
    }
  })
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

function normalizeSuggestionText(text: string, index = 0) {
  const cleaned = `${text ?? ''}`.trim()
  if (cleaned && !/[A-Za-z]/.test(cleaned)) return cleaned

  const fallback = [
    '指针与内存理解仍是短板，建议先用图解复盘，再完成 15 分钟专项练习。',
    '数据结构的队列推进需要继续巩固，建议用步骤快照复盘错题。',
    '本周学习节奏保持良好，可以把下一轮重点放在迁移应用题。',
    '建议增加编程实战时间，把理论复习和上机练习调整为一比一。',
  ]
  return fallback[index % fallback.length]
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

  // 初始化Agent协作流（默认pending状态）
  agentNodes.value = defaultAgentNodes.map(n => ({ ...n, status: 'pending' }))

  fetchEvaluation()
    .then(data => {
      stats.value = data.stats.map(item => ({
        ...item,
        icon: iconForStat(item.label, item.icon),
      }))

      suggestions.value = data.suggestions.map((item, index) => {
        const type = item.type ?? inferSuggestionType(item.text)
        return {
          text: normalizeSuggestionText(item.text, index),
          type,
          icon: iconForSuggestion(type),
        }
      })

      reportDate.value = data.generatedAt

      // 从dashboard.weaknesses更新fineTreeNodes的薄弱状态
      const dashboard = (data as any).dashboard
      if (dashboard?.weaknesses) {
        const weakIds = dashboard.weaknesses.map((w: any) => w.id)
        const weakMap: Record<string, any> = {}
        dashboard.weaknesses.forEach((w: any) => { weakMap[w.id] = w })
        // 映射weakness到fineTreeNodes
        fineTreeNodes.forEach(node => {
          const matched = dashboard.weaknesses.find((w: any) =>
            node.name.includes(w.label) || w.label.includes(node.name.split(' ')[0])
          )
          if (matched) {
            node.status = 'weak'
            node.issue = matched.reason
            node.cause = matched.impact
            node.remedialResources = [matched.action]
          }
        })
      }

      // 从dashboard.profileMetrics更新subjects掌握度
      if (dashboard?.profileMetrics) {
        const metricMap: Record<string, number> = {}
        dashboard.profileMetrics.forEach((m: any) => {
          metricMap[m.label] = m.stage2 // 使用最新阶段的数据
        })
        // 映射到subjects
        const nameMap: Record<string, string> = {
          '知识广度': 'C / Python 编程基础',
          '知识深度': '数据结构与算法',
          '应用能力': '计算机系统（OS/网络/DB）',
          '创新力': '机器学习',
          '工程实践': '深度学习',
          '知识迁移': '数学与编程基础',
        }
        subjects.value = subjects.value.map(s => {
          const metricLabel = Object.entries(nameMap).find(([, v]) => v === s.name)?.[0]
          if (metricLabel && metricMap[metricLabel] !== undefined) {
            return { ...s, mastery: metricMap[metricLabel] }
          }
          return s
        })
      }

      // 从dashboard.evidenceRounds更新profileTrace
      if (dashboard?.evidenceRounds && dashboard.evidenceRounds.length > 0) {
        const latestRound = dashboard.evidenceRounds[dashboard.evidenceRounds.length - 1]
        profileTrace.evidence = latestRound.evidence
        profileTrace.nextAction = latestRound.pathImpact
      }
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
    <div class="eval-split-layout">
      <div class="eval-left-panel">
        <div class="card three-mini-card">
          <div class="card-head">
            <h2 class="card-title-sm">学习状态可视化</h2>
            <span class="card-tag">树枝=课程 · 苹果=知识点</span>
          </div>
          <ParticleBackground variant="stage" class="tree-stage-particles" />
          <ThreeKnowledgeTree
            fill
            horizontal-only-controls
            :knowledge-points="fineTreeNodes"
            :scene-scale="8.45"
            :scene-stretch-y="1.24"
            :scene-offset-y="5.34"
            :scene-offset-x="-0.82"
            :scene-depth-offset="-1.05"
            @marker-select="handleMarkerSelect"
          />
        </div>
      </div>

      <div class="eval-right-panel">
        <div class="right-scroll-area">
          <!-- Detail state: when a node is selected -->
          <template v-if="selectedNodeDetail">
            <div :key="detailPulseKey" class="detail-pulse-shell">
            <div class="detail-header">
              <button class="detail-back" type="button" @click="closeNodeDetail">
                <ArrowLeft :size="16" stroke-width="1.5" />
                <span>返回总览</span>
              </button>
              <div class="detail-status-row">
                <span class="detail-badge" :class="selectedNodeDetail.status">
                  {{ selectedNodeDetail.status === 'mastered' ? '已掌握' : selectedNodeDetail.status === 'weak' ? '薄弱点' : selectedNodeDetail.status === 'learning' ? '学习中' : '待学习' }}
                </span>
                <span class="detail-pct" :style="{ color: masteryColor(selectedNodeDetail.progress) }">{{ selectedNodeDetail.progress }}%</span>
              </div>
            </div>

            <h2 class="detail-title">{{ selectedNodeDetail.name }}</h2>

            <!-- 课程信息 -->
            <div class="detail-diagnosis-card">
              <div class="detail-mastery-orb" :style="{ '--mastery': selectedNodeDetail.progress, '--mastery-tone': masteryColor(selectedNodeDetail.progress) }">
                <svg viewBox="0 0 120 120" class="detail-mastery-svg" aria-label="知识点掌握度">
                  <circle cx="60" cy="60" r="45" class="detail-orb-track" />
                  <circle cx="60" cy="60" r="45" class="detail-orb-fill" pathLength="100" />
                </svg>
                <div class="detail-orb-center">
                  <strong>{{ selectedNodeDetail.progress }}%</strong>
                  <span>掌握度</span>
                </div>
              </div>
              <div class="detail-course-summary">
                <div class="detail-course-bar">
                  <span class="detail-course-name">{{ selectedNodeDetail.course }}</span>
                  <span class="detail-course-mastery">课程掌握 {{ selectedNodeDetail.courseMastery }}%</span>
                  <span v-if="selectedNodeDetail.courseWeakCount > 0" class="detail-course-weak">{{ selectedNodeDetail.courseWeakCount }} 个薄弱</span>
                </div>
                <p>{{ selectedNodeDetail.issue ?? '该章节表现稳定，下一轮重点观察迁移应用和题型变化。' }}</p>
              </div>
            </div>

            <div v-if="selectedNodeDetail.issue" class="detail-block">
              <span class="detail-label">问题诊断</span>
              <p>{{ selectedNodeDetail.issue }}</p>
            </div>
            <div v-if="selectedNodeDetail.cause" class="detail-block">
              <span class="detail-label">根因分析</span>
              <p>{{ selectedNodeDetail.cause }}</p>
            </div>
            <div v-if="selectedNodeDetail.remedialResources.length" class="detail-block">
              <span class="detail-label">补救资源</span>
              <ul>
                <li v-for="res in selectedNodeDetail.remedialResources" :key="res" @click="goToTutoring(res)">{{ res }}</li>
              </ul>
            </div>
            <div v-if="selectedNodeDetail.pathImpact" class="detail-block">
              <span class="detail-label">路径影响</span>
              <p>{{ selectedNodeDetail.pathImpact }}</p>
            </div>

            <!-- 同课程知识点列表 -->
            <div class="detail-block">
              <span class="detail-label">同课程知识点</span>
              <div class="detail-sibling-list">
                <button
                  v-for="sib in selectedNodeDetail.siblings"
                  :key="sib.name"
                  :class="['detail-sibling-item', sib.status, { active: sib.name === selectedNodeDetail.name }]"
                  type="button"
                  @click="selectNode(sib)"
                >
                  <span class="sib-dot" />
                  <span class="sib-name">{{ sib.name }}</span>
                  <span class="sib-pct" :style="{ color: masteryColor(sib.progress) }">{{ sib.progress }}%</span>
                </button>
              </div>
            </div>

            <!-- Round insight info (moved from left overlay) -->
            <div v-if="showRoundInsight" class="detail-block round-insight-compact">
              <span class="detail-label">大树更新</span>
              <p class="round-compact-copy">{{ roundInsight.subtitle }}</p>
              <div class="round-compact-metrics">
                <div v-for="item in roundInsight.metrics" :key="item.label" class="round-compact-metric">
                  <strong :style="{ color: item.tone }">{{ item.value }}</strong>
                  <span>{{ item.label }}</span>
                </div>
              </div>
              <div class="round-compact-routes">
                <button v-for="item in roundInsight.route" :key="item" type="button" class="route-chip" @click="goToTutoring(item)">{{ item }}</button>
              </div>
              <div class="round-compact-actions">
                <button class="round-secondary-sm" type="button" @click="showRoundInsight = false">稍后</button>
                <button class="round-primary-sm" type="button" @click="acceptRoundAdjustment">接受调整</button>
              </div>
            </div>

            <div class="detail-actions">
              <button type="button" class="detail-btn-secondary" @click="goToTutoring(selectedNodeDetail.name)">进入辅导</button>
              <button type="button" class="detail-btn-primary" @click="addToNextPath">加入路径</button>
            </div>
            </div>
          </template>

          <!-- Overview state: default -->
          <template v-else>
            <div class="right-header">
              <div class="hero-badge">效果评估</div>
              <h1 class="page-title">学习效果<span class="accent-text">数据洞察</span></h1>
              <p class="page-subtitle">从测评结果、资源完成度和知识树变化中识别薄弱点，并反向更新学生画像。</p>
              <p v-if="isLoading" class="page-status">正在同步评估数据...</p>
            </div>

            <div class="card agent-flow-card">
              <div class="card-head">
                <h2 class="card-title-sm">多智能体协作流</h2>
                <span class="card-tag">Agent</span>
              </div>
              <AgentFlowTimeline :agents="agentNodes" :active="agentFlowActive" @agent-select="handleAgentSelect" />
              <transition name="agent-detail">
                <div v-if="selectedAgent" class="agent-detail-panel">
                  <div class="agent-detail-head">
                    <span class="agent-detail-name">{{ selectedAgent.agentName }}</span>
                    <span class="agent-detail-confidence" :style="{ color: selectedAgent.confidence >= 0.8 ? '#06d6a0' : selectedAgent.confidence >= 0.6 ? '#f59e0b' : '#f43f5e' }">
                      置信度 {{ (selectedAgent.confidence * 100).toFixed(0) }}%
                    </span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">输入</span>
                    <span>{{ selectedAgent.input }}</span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">输出</span>
                    <span>{{ selectedAgent.output }}</span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">耗时</span>
                    <span>{{ selectedAgent.duration }}ms</span>
                  </div>
                  <div v-if="selectedAgent.evidenceTags.length" class="agent-detail-tags">
                    <span v-for="tag in selectedAgent.evidenceTags" :key="tag" class="agent-tag">{{ tag }}</span>
                  </div>
                </div>
              </transition>
            </div>

            <div class="eval-summary-cards">
              <div v-for="item in stats" :key="item.label" class="summary-card">
                <div class="summary-icon" :style="{ color: item.color }">
                  <component :is="item.icon" :size="16" stroke-width="1.5" />
                </div>
                <div class="summary-body">
                  <span class="summary-value">{{ item.value }}</span>
                  <span class="summary-change">{{ item.change }}</span>
                </div>
                <span class="summary-label">{{ item.label }}</span>
              </div>
            </div>

            <div class="card effect-overview-card">
              <div class="card-head">
                <h2 class="card-title-sm">学习效果总览</h2>
                <span class="suggest-count">多图动态</span>
              </div>
              <div class="effect-overview-grid">
                <div class="effect-line-panel">
                  <div class="effect-panel-head">
                    <span>近七周成长趋势</span>
                    <strong>+23%</strong>
                  </div>
                  <svg viewBox="0 0 320 92" class="effect-line-svg" aria-label="学习成长折线图">
                    <defs>
                      <linearGradient id="effectLineFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="rgba(0, 212, 255, 0.28)" />
                        <stop offset="100%" stop-color="rgba(0, 212, 255, 0)" />
                      </linearGradient>
                    </defs>
                    <polyline :points="overviewAvgLinePoints" class="effect-line-avg" />
                    <polyline :points="overviewLinePoints" class="effect-line-main" />
                    <circle
                      v-for="(point, index) in weeklyTrend"
                      :key="point.week"
                      :cx="index * (320 / (weeklyTrend.length - 1))"
                      :cy="86 - point.you * 0.72"
                      r="3"
                      class="effect-line-dot"
                      :style="{ '--dot-delay': `${index * 90}ms` }"
                    />
                  </svg>
                </div>

                <div class="effect-bar-panel">
                  <div class="effect-panel-head">
                    <span>课程掌握条形图</span>
                    <strong>{{ averageMastery }}%</strong>
                  </div>
                  <div class="effect-bars">
                    <div v-for="bar in overviewBars" :key="bar.label" class="effect-bar-row">
                      <span>{{ bar.label }}</span>
                      <i>
                        <b :style="{ width: loaded ? `${bar.value}%` : '0%', background: bar.tone }" />
                      </i>
                      <strong :style="{ color: bar.tone }">{{ bar.value }}%</strong>
                    </div>
                  </div>
                </div>

                <div class="effect-column-panel">
                  <div class="effect-panel-head">
                    <span>周表现柱状图</span>
                    <strong>对比均值</strong>
                  </div>
                  <div class="effect-columns">
                    <div
                      v-for="bar in weeklyBars"
                      :key="bar.label"
                      class="effect-column"
                      :style="{ '--bar-height': loaded ? `${bar.height}px` : '8px', '--bar-delay': bar.delay }"
                    >
                      <span>{{ bar.delta >= 0 ? '+' : '' }}{{ bar.delta }}</span>
                      <i />
                      <em>{{ bar.label }}</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mastery-card">
              <div class="card-head">
                <h2 class="card-title-sm">学习风玫瑰</h2>
                <span class="mastery-avg">平均 {{ averageMastery }}%</span>
              </div>
              <div class="wind-rose-body">
                <svg viewBox="0 0 180 180" class="wind-rose-svg" aria-label="学习风玫瑰图">
                  <defs>
                    <radialGradient id="roseCoreGlow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stop-color="rgba(0, 212, 255, 0.28)" />
                      <stop offset="100%" stop-color="rgba(0, 212, 255, 0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="90" cy="90" r="70" class="rose-grid" />
                  <circle cx="90" cy="90" r="48" class="rose-grid" />
                  <circle cx="90" cy="90" r="26" class="rose-grid" />
                  <g class="rose-axis-group">
                    <line v-for="segment in windRoseSegments" :key="`axis-${segment.name}`" x1="90" y1="20" x2="90" y2="160" :style="{ transform: `rotate(${segment.angle + 90}deg)` }" />
                  </g>
                  <g v-for="segment in windRoseSegments" :key="segment.name" class="rose-segment" :style="{ '--rose-angle': `${segment.angle}deg`, '--rose-tone': segment.tone, '--rose-scale': loaded ? segment.length / 78 : 0, '--rose-delay': `${segment.mastery * 5}ms` }">
                    <path d="M 90 90 C 100 67, 103 39, 90 18 C 77 39, 80 67, 90 90 Z" />
                    <circle cx="90" cy="22" r="2.6" />
                  </g>
                  <circle cx="90" cy="90" r="30" class="rose-core-halo" />
                  <circle cx="90" cy="90" r="18" class="rose-core" />
                  <text x="90" y="88" text-anchor="middle" class="rose-core-value">{{ averageMastery }}%</text>
                  <text x="90" y="102" text-anchor="middle" class="rose-core-label">均值</text>
                </svg>
                <div class="wind-rose-legend">
                  <button
                    v-for="segment in windRoseSegments"
                    :key="segment.name"
                    type="button"
                    class="wind-rose-item"
                    @click="selectedNode = fineTreeNodes.find(n => n.course === segment.name) ?? selectedNode"
                  >
                    <i :style="{ background: segment.tone }" />
                    <span>{{ segment.name }}</span>
                    <strong :style="{ color: segment.tone }">{{ segment.mastery }}%</strong>
                  </button>
                </div>
                <div class="wind-rose-footer">
                  <span>风向越短代表下一轮越需要补强</span>
                  <strong>{{ subjects.filter(s => s.mastery < averageMastery).length }} 个低于均值</strong>
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
              <div class="badge-row">
                <div
                  v-for="badge in badges"
                  :key="badge.name"
                  :class="['badge-item', { earned: badge.earned }]"
                  :title="badge.name"
                >
                  <component :is="badge.icon" v-if="badge.earned" :size="16" stroke-width="2" :style="{ color: badge.color }" />
                  <span v-else class="badge-locked">•</span>
                </div>
              </div>
            </div>

            <div class="card chart-card">
              <div class="card-head">
                <h2 class="card-title-sm">能力成长曲线</h2>
                <div class="chart-legend">
                  <span class="legend-item"><span class="legend-dot cyan" />我的</span>
                  <span class="legend-item"><span class="legend-dot dim" />平均</span>
                </div>
              </div>
              <div class="chart-body">
                <svg viewBox="0 0 350 60" class="trend-svg">
                  <polyline :points="chartPoints.avgPoints" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="4 3" />
                  <polyline :points="chartPoints.youPoints" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="chart-footer">
                  <span>累计 +23%</span>
                  <span>较上周 <strong class="up">+12%</strong></span>
                </div>
              </div>
            </div>

            <section class="evidence-trace-section">
              <div class="evidence-trace-header">
                <span class="evidence-kicker">证据链追溯</span>
                <h2 class="section-title-sm">画像更新<span class="accent-text">证据链</span></h2>
              </div>
              <EvidenceTraceView />
            </section>

            <div class="right-footer">
              <button class="report-btn" @click="generateReport" :disabled="isGeneratingReport">
                <FileBarChart :size="16" stroke-width="1.5" />
                <span>{{ isGeneratingReport ? '正在生成...' : '生成评估报告' }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

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

.eval-split-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  min-height: 100vh;
}

.eval-left-panel {
  position: relative;
  overflow: hidden;
}

.eval-right-panel {
  position: relative;
  border-left: 1px solid var(--color-border);
  background:
    linear-gradient(180deg, rgba(7, 9, 20, 0.78), rgba(7, 9, 20, 0.92)),
    url('/reverse-evaluation/overview-observatory-map.png') top center / cover no-repeat,
    var(--color-bg-card);
}

.eval-right-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 16%, rgba(0, 212, 255, 0.1), transparent 28%),
    linear-gradient(90deg, rgba(0, 0, 0, 0.16), transparent 42%);
  opacity: 0.68;
}

.right-scroll-area {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-scroll-area::-webkit-scrollbar {
  width: 4px;
}

.right-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.right-scroll-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

:global(.global-pet) {
  transform: translateX(140px) scale(0.86);
  opacity: 0.68;
}

.right-header {
  margin-bottom: 2px;
}

.hero-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-bottom: 8px;
}

.page-title {
  margin: 0 0 6px;
  color: #fff;
  font-size: 22px;
  font-family: var(--font-display);
  font-weight: 400;
}

.accent-text {
  color: var(--color-accent-cyan);
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.page-status {
  margin-top: 6px;
  color: var(--color-accent-cyan);
  font-size: 12px;
}

/* Summary cards — flat, no hero-metric */
.eval-summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.summary-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.summary-body {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.summary-value {
  color: #fff;
  font-size: 14px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.summary-change {
  color: var(--color-accent-emerald);
  font-size: 10px;
  font-weight: 600;
  font-family: var(--font-mono);
}

.summary-label {
  color: var(--color-text-tertiary);
  font-size: 10px;
  margin-left: auto;
  white-space: nowrap;
}

.effect-overview-card {
  min-height: 332px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 10%, rgba(0, 212, 255, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012)),
    var(--color-bg-card);
}

.effect-overview-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 10px;
  min-height: 276px;
}

.effect-line-panel,
.effect-bar-panel,
.effect-column-panel {
  min-width: 0;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(4, 8, 18, 0.46);
}

.effect-line-panel {
  grid-column: 1 / -1;
  min-height: 128px;
}

.effect-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 11px;
}

.effect-panel-head strong {
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
  font-size: 11px;
}

.effect-line-svg {
  display: block;
  width: 100%;
  height: 92px;
  overflow: visible;
}

.effect-line-avg,
.effect-line-main {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.effect-line-avg {
  stroke: rgba(255, 255, 255, 0.16);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.effect-line-main {
  stroke: var(--color-accent-cyan);
  stroke-width: 2.6;
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  filter: drop-shadow(0 0 9px rgba(0, 212, 255, 0.34));
  animation: effectLineDraw 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.effect-line-dot {
  fill: rgba(7, 13, 26, 0.94);
  stroke: var(--color-accent-cyan);
  stroke-width: 2;
  opacity: 0;
  animation: effectDotIn 0.34s var(--ease-out) var(--dot-delay) forwards;
}

.effect-bars {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.effect-bar-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px 34px;
  align-items: center;
  gap: 7px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 10px;
}

.effect-bar-row span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.effect-bar-row i {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
}

.effect-bar-row b {
  display: block;
  height: 100%;
  border-radius: inherit;
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.effect-bar-row strong {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 10px;
}

.effect-columns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: end;
  gap: 6px;
  height: 112px;
}

.effect-column {
  display: grid;
  grid-template-rows: 16px 1fr 16px;
  align-items: end;
  justify-items: center;
  min-width: 0;
}

.effect-column span {
  color: rgba(255, 255, 255, 0.48);
  font-family: var(--font-mono);
  font-size: 9px;
}

.effect-column i {
  width: 100%;
  max-width: 14px;
  height: var(--bar-height);
  border-radius: 999px 999px 3px 3px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.82), rgba(6, 214, 160, 0.4));
  transform-origin: bottom;
  animation: effectBarRise 0.72s cubic-bezier(0.16, 1, 0.3, 1) var(--bar-delay) both;
}

.effect-column em {
  color: rgba(255, 255, 255, 0.42);
  font-style: normal;
  font-size: 9px;
  white-space: nowrap;
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-title-sm {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
}

.card-tag {
  font-size: 10px;
  color: var(--color-text-tertiary);
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
}

/* Left panel — 3D tree only, no overlays */
.three-mini-card {
  position: relative;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 70%, rgba(255, 207, 130, 0.08), transparent 24%),
    radial-gradient(circle at 54% 32%, rgba(0, 212, 255, 0.09), transparent 34%),
    linear-gradient(180deg, rgba(4, 8, 18, 0.12), rgba(5, 7, 16, 0.34));
  border: 0;
  border-radius: 0;
}

.three-mini-card .card-head {
  position: absolute;
  top: 10px;
  left: 24px;
  right: 24px;
  z-index: 4;
  margin-bottom: 0;
  pointer-events: none;
}

.tree-stage-particles {
  z-index: 1;
  opacity: 0.92;
}

.three-mini-card :deep(.three-tree-wrapper) {
  position: relative;
  z-index: 2;
  height: calc(100vh + 150px);
  min-height: 930px;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.three-mini-card :deep(.three-tree-canvas) {
  min-height: 930px;
}

/* Detail panel (right panel detail state) */
.detail-pulse-shell {
  animation: detailPanelReplay 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.detail-pulse-shell .detail-header,
.detail-pulse-shell .detail-title,
.detail-pulse-shell .detail-diagnosis-card,
.detail-pulse-shell .detail-block,
.detail-pulse-shell .detail-actions {
  animation: detailItemIn 0.46s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.detail-pulse-shell .detail-title {
  animation-delay: 45ms;
}

.detail-pulse-shell .detail-diagnosis-card {
  animation-delay: 90ms;
}

.detail-pulse-shell .detail-block {
  animation-delay: 145ms;
}

.detail-pulse-shell .detail-actions {
  animation-delay: 210ms;
}

.detail-pulse-shell .detail-sibling-item {
  animation: detailSiblingIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.detail-pulse-shell .detail-sibling-item:nth-child(1) { animation-delay: 90ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(2) { animation-delay: 120ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(3) { animation-delay: 150ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(4) { animation-delay: 180ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(5) { animation-delay: 210ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(6) { animation-delay: 240ms; }
.detail-pulse-shell .detail-sibling-item:nth-child(7) { animation-delay: 270ms; }

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.detail-back:hover {
  border-color: rgba(0, 212, 255, 0.28);
  color: var(--color-accent-cyan);
}

.detail-status-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.1);
  color: #9ee7ff;
  border: 1px solid rgba(0, 212, 255, 0.18);
}

.detail-badge.weak {
  background: rgba(244, 63, 94, 0.1);
  color: #ff9aae;
  border-color: rgba(244, 63, 94, 0.18);
}

.detail-badge.mastered {
  background: rgba(6, 214, 160, 0.1);
  color: #7ef9d4;
  border-color: rgba(6, 214, 160, 0.18);
}

.detail-badge.learning {
  background: rgba(0, 212, 255, 0.1);
  color: #9ee7ff;
  border-color: rgba(0, 212, 255, 0.18);
}

.detail-badge.next {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.detail-pct {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
}

.detail-title {
  margin: 0 0 6px;
  color: #fff;
  font-size: 18px;
  font-family: var(--font-display);
  font-weight: 500;
}

.detail-course-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.detail-course-name {
  color: var(--color-accent-cyan);
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 212, 255, 0.08);
}

.detail-course-mastery {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  font-family: var(--font-mono);
}

.detail-course-weak {
  color: #f43f5e;
  font-size: 11px;
  font-family: var(--font-mono);
}

.detail-diagnosis-card {
  display: grid;
  grid-template-columns: 118px 1fr;
  gap: 14px;
  align-items: center;
  margin: 10px 0 14px;
  padding: 14px;
  border: 1px solid rgba(0, 212, 255, 0.14);
  border-radius: 12px;
  background:
    radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--mastery-tone, #00d4ff) 13%, transparent), transparent 42%),
    rgba(255, 255, 255, 0.025);
}

.detail-mastery-orb {
  --mastery: 0;
  --mastery-tone: var(--color-accent-cyan);
  position: relative;
  width: 112px;
  height: 112px;
  display: grid;
  place-items: center;
}

.detail-mastery-svg {
  width: 112px;
  height: 112px;
  transform: rotate(-90deg);
  filter: drop-shadow(0 0 14px color-mix(in srgb, var(--mastery-tone) 48%, transparent));
}

.detail-orb-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 9;
}

.detail-orb-fill {
  fill: none;
  stroke: var(--mastery-tone);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-dasharray: var(--mastery) 100;
  animation: detailOrbFill 0.82s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.detail-orb-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-align: center;
}

.detail-orb-center strong {
  color: #fff;
  font-family: var(--font-mono);
  font-size: 22px;
  line-height: 1;
}

.detail-orb-center span {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 11px;
}

.detail-course-summary {
  min-width: 0;
}

.detail-course-summary .detail-course-bar {
  margin-bottom: 8px;
}

.detail-course-summary p {
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 12px;
  line-height: 1.6;
}

.detail-sibling-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.detail-sibling-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  text-align: left;
}

.detail-sibling-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.detail-sibling-item.active {
  background: rgba(0, 212, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.2);
}

.sib-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.detail-sibling-item.mastered .sib-dot { background: #06d6a0; }
.detail-sibling-item.learning .sib-dot { background: #00d4ff; }
.detail-sibling-item.weak .sib-dot { background: #f43f5e; }
.detail-sibling-item.next .sib-dot { background: rgba(255, 255, 255, 0.3); }

.sib-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sib-pct {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.detail-meter {
  height: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 16px;
}

.detail-meter i {
  display: block;
  height: 100%;
  border-radius: inherit;
  transition: width 0.4s var(--ease-out);
}

.detail-block {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
}

.detail-label {
  display: block;
  margin-bottom: 4px;
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.detail-block p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  line-height: 1.6;
}

.detail-block ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-block li {
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.72);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.detail-block li:hover {
  background: rgba(0, 212, 255, 0.08);
  color: #fff;
}

.detail-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.detail-btn-secondary,
.detail-btn-primary {
  flex: 1;
  min-height: 34px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s var(--ease-out);
}

.detail-btn-secondary {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
}

.detail-btn-secondary:hover {
  border-color: rgba(0, 212, 255, 0.28);
  color: var(--color-accent-cyan);
}

.detail-btn-primary {
  border: 1px solid rgba(0, 212, 255, 0.24);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.detail-btn-primary:hover {
  background: rgba(0, 212, 255, 0.14);
}

/* Round insight (compact, in right panel) */
.round-insight-compact {
  border-color: rgba(255, 229, 143, 0.15);
}

.round-compact-copy {
  margin: 4px 0 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  line-height: 1.5;
}

.round-compact-metrics {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.round-compact-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.round-compact-metric strong {
  font-family: var(--font-mono);
  font-size: 14px;
}

.round-compact-metric span {
  color: var(--color-text-tertiary);
  font-size: 10px;
}

.round-compact-routes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.route-chip {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  background: rgba(0, 212, 255, 0.04);
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
  font-size: 11px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.route-chip:hover {
  border-color: rgba(0, 212, 255, 0.24);
  color: #fff;
}

.round-compact-actions {
  display: flex;
  gap: 8px;
}

.round-secondary-sm,
.round-primary-sm {
  flex: 1;
  min-height: 30px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 11px;
  transition: all 0.2s var(--ease-out);
}

.round-secondary-sm {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
}

.round-primary-sm {
  border: 1px solid rgba(0, 212, 255, 0.24);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.round-primary-sm:hover {
  background: rgba(0, 212, 255, 0.14);
}

/* Mastery */
.mastery-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mastery-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mastery-top {
  display: flex;
  justify-content: space-between;
}

.mastery-name {
  color: var(--color-text-secondary);
  font-size: 11px;
}

.mastery-pct {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 11px;
}

.mastery-track {
  height: 4px;
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
  font-size: 10px;
}

.ring-map-layout {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  align-items: center;
}

.course-ring-map {
  width: 140px;
  height: 140px;
  overflow: visible;
}

.ring-grid {
  fill: none;
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 1;
}

.ring-core {
  fill: rgba(0, 212, 255, 0.08);
  stroke: rgba(0, 212, 255, 0.28);
  stroke-width: 1;
}

.ring-core-value {
  fill: rgba(235, 248, 255, 0.94);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
}

.ring-core-label {
  fill: rgba(255, 255, 255, 0.5);
  font-size: 8px;
}

.ring-arc {
  transform-box: fill-box;
  transform-origin: center;
  transform: rotate(var(--ring-start));
}

.ring-arc circle {
  fill: none;
  stroke: var(--ring-tone);
  stroke-width: 5;
  stroke-linecap: round;
  filter: drop-shadow(0 0 7px color-mix(in srgb, var(--ring-tone), transparent 42%));
  animation: ringReveal 0.72s var(--ease-out) both;
}

.ring-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.ring-legend-item {
  display: grid;
  grid-template-columns: 8px 1fr auto;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(6, 10, 22, 0.44);
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  transition: transform 0.18s var(--ease-out), border-color 0.18s var(--ease-out), background 0.18s var(--ease-out);
}

.ring-legend-item:hover {
  transform: translateX(2px);
  border-color: rgba(0, 212, 255, 0.22);
  background: rgba(0, 212, 255, 0.06);
}

.ring-legend-item i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ring-legend-item span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}

.ring-legend-item strong {
  font-family: var(--font-mono);
  font-size: 11px;
}

.mastery-pct-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mastery-delta {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 3px;
  animation: delta-flash 0.6s var(--ease-out);
}

.mastery-delta.up {
  color: #06d6a0;
  background: rgba(6, 214, 160, 0.1);
}

.mastery-delta.down {
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.1);
}

@keyframes delta-flash {
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

/* Suggestions */
.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.suggest-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
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
  font-size: 11px;
}

.suggest-count {
  color: var(--color-text-tertiary);
  font-size: 10px;
}

.prescription-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.prescription-item {
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  gap: 9px;
  align-items: center;
  width: 100%;
  padding: 9px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015)),
    rgba(7, 10, 22, 0.54);
  text-align: left;
  cursor: pointer;
  transition: transform 0.18s var(--ease-out), border-color 0.18s var(--ease-out), background 0.18s var(--ease-out);
}

.prescription-item:hover {
  transform: translateY(-1px);
  border-color: rgba(0, 212, 255, 0.2);
  background:
    linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(255, 255, 255, 0.02)),
    rgba(7, 10, 22, 0.68);
}

.prescription-index {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}

.prescription-body {
  min-width: 0;
}

.prescription-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.prescription-top strong {
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
}

.prescription-top span {
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
  font-size: 10px;
  white-space: nowrap;
}

.prescription-body p {
  margin: 0;
  color: rgba(255, 255, 255, 0.56);
  font-size: 11px;
  line-height: 1.45;
}

.prescription-icon {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
}

/* Badges — single row */
.badge-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.badge-item {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s;
}

.badge-item.earned {
  border-color: rgba(255, 255, 255, 0.12);
}

.badge-item:not(.earned) {
  opacity: 0.3;
}

.badge-locked {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}

/* Chart — mini sparkline */
.chart-legend {
  display: flex;
  gap: 10px;
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.legend-dot.cyan {
  background: var(--color-accent-cyan);
}

.legend-dot.dim {
  background: rgba(255, 255, 255, 0.2);
}

.wind-rose-body {
  display: grid;
  grid-template-columns: 164px 1fr;
  gap: 12px;
  align-items: center;
}

.wind-rose-svg {
  width: 170px;
  height: 170px;
  overflow: visible;
}

.rose-grid {
  fill: none;
  stroke: rgba(255, 255, 255, 0.075);
  stroke-width: 1;
}

.rose-axis-group {
  transform-origin: 90px 90px;
}

.rose-axis-group line {
  stroke: rgba(255, 255, 255, 0.045);
  stroke-width: 1;
  transform-origin: 90px 90px;
}

.rose-segment {
  transform-origin: 90px 90px;
  transform: rotate(var(--rose-angle)) scale(var(--rose-scale));
  animation: roseBladeIn 0.72s cubic-bezier(0.16, 1, 0.3, 1) var(--rose-delay) both;
}

.rose-segment path {
  fill: color-mix(in srgb, var(--rose-tone) 58%, transparent);
  stroke: color-mix(in srgb, var(--rose-tone) 88%, transparent);
  stroke-width: 1;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--rose-tone) 42%, transparent));
}

.rose-segment circle {
  fill: var(--rose-tone);
  opacity: 0.86;
}

.rose-core-halo {
  fill: url(#roseCoreGlow);
}

.rose-core {
  fill: rgba(5, 10, 24, 0.92);
  stroke: rgba(0, 212, 255, 0.28);
  stroke-width: 1;
}

.rose-core-value {
  fill: #fff;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}

.rose-core-label {
  fill: rgba(255, 255, 255, 0.48);
  font-size: 8px;
}

.wind-rose-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.wind-rose-item {
  display: grid;
  grid-template-columns: 8px 1fr auto;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  transition: background 0.18s var(--ease-out), border-color 0.18s var(--ease-out), transform 0.18s var(--ease-out);
}

.wind-rose-item:hover {
  transform: translateX(2px);
  border-color: rgba(0, 212, 255, 0.2);
  background: rgba(0, 212, 255, 0.055);
}

.wind-rose-item i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.wind-rose-item span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}

.wind-rose-item strong {
  font-family: var(--font-mono);
  font-size: 11px;
}

.wind-rose-footer {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
}

.wind-rose-footer strong {
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
}

.trend-svg {
  width: 100%;
  height: 48px;
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 11px;
}

.chart-footer strong {
  color: #fff;
}

.chart-footer .up {
  color: var(--color-accent-emerald);
}

@keyframes detailOrbFill {
  from { stroke-dasharray: 0 100; }
  to { stroke-dasharray: var(--mastery) 100; }
}

@keyframes detailPanelReplay {
  from {
    opacity: 0.72;
    transform: translateY(8px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes detailItemIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes detailSiblingIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes effectLineDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes effectDotIn {
  from { opacity: 0; transform: scale(0.4); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes effectBarRise {
  from { transform: scaleY(0.12); opacity: 0; }
  to { transform: scaleY(1); opacity: 1; }
}

@keyframes roseBladeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.route-map-body {
  position: relative;
}

.route-map-svg {
  width: 100%;
  height: 104px;
  display: block;
}

.route-map-grid line {
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 1;
}

.route-average {
  fill: none;
  stroke: rgba(255, 255, 255, 0.18);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.route-area {
  fill: url(#routeAreaGradient);
  opacity: 0;
  animation: routeFade 0.42s var(--ease-out) 0.12s forwards;
}

.route-line {
  fill: none;
  stroke: var(--color-accent-cyan);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: url('#routeGlow');
  stroke-dasharray: 380;
  stroke-dashoffset: 380;
  animation: routeDraw 0.92s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.route-node {
  opacity: 0;
  animation: routeNodeIn 0.36s var(--ease-out) var(--node-delay) forwards;
}

.route-node circle {
  fill: rgba(8, 13, 28, 0.95);
  stroke: var(--color-accent-cyan);
  stroke-width: 2;
}

.route-node text {
  fill: rgba(235, 248, 255, 0.76);
  font-family: var(--font-mono);
  font-size: 9px;
}

.route-map-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 11px;
}

.route-map-footer strong {
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
}

@keyframes ringReveal {
  from { stroke-dashoffset: 160; opacity: 0; }
  to { stroke-dashoffset: 0; opacity: 1; }
}

@keyframes routeDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes routeFade {
  to { opacity: 1; }
}

@keyframes routeNodeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Evidence trace */
.evidence-trace-section {
  padding: 0;
}

.evidence-trace-header {
  margin-bottom: 10px;
}

.evidence-kicker {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-bottom: 6px;
}

.section-title-sm {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-family: var(--font-display);
  font-weight: 400;
}

/* Footer */
.right-footer {
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
}

.report-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.12);
  color: var(--color-accent-cyan);
  white-space: nowrap;
  width: 100%;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s var(--ease-out);
}

.report-btn:hover {
  background: rgba(0, 212, 255, 0.1);
}

/* Agent flow */
.agent-flow-card {
  padding: 14px;
}

.agent-detail-panel {
  margin-top: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.agent-detail-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.agent-detail-name {
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

.agent-detail-confidence {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}

.agent-detail-row {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  line-height: 1.5;
}

.agent-detail-label {
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  min-width: 32px;
  flex-shrink: 0;
}

.agent-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.agent-tag {
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 9px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.12);
  color: rgba(0, 212, 255, 0.9);
}

.agent-detail-enter-active,
.agent-detail-leave-active {
  transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.agent-detail-enter-from,
.agent-detail-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Modal */
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
  color: var(--color-accent-cyan);
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
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: var(--color-accent-cyan);
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
}

.btn-primary:hover {
  background: rgba(0, 212, 255, 0.18);
}

@media (max-width: 900px) {
  .eval-split-layout {
    grid-template-columns: 1fr;
  }

  .eval-left-panel {
    min-height: 60vh;
  }

  .eval-right-panel {
    border-left: 0;
    border-top: 1px solid var(--color-border);
  }

  .right-scroll-area {
    height: auto;
    max-height: none;
    overflow-y: visible;
  }

  .three-mini-card :deep(.three-tree-wrapper) {
    height: 60vh;
    min-height: 500px;
  }

  .eval-summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .eval-summary-cards {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 20px;
  }
}
</style>
