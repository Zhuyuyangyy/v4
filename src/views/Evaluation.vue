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
import AgentFlowTimeline from '@/components/evaluation/agentflowtimeline.vue'
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
  subtitle: '系统根据刚完成的一轮练习，重新校准了你的掌握状态和下一轮侧重。',
  metrics: [
    { label: '完成知识点', value: '18', tone: '#06d6a0' },
    { label: '新增亮点', value: '7', tone: '#ffe58f' },
    { label: '薄弱收敛', value: '2', tone: '#00d4ff' },
  ],
  profile: [
    { label: '主要薄弱', before: '指针泛复习', after: '二级指针传参' },
    { label: '学习偏好', before: '文字讲解', after: '栈图 + 队列快照' },
  ],
  route: [
    '下一轮前 20 分钟优先修复二级指针与地址别名',
    '图结构从概念复习切到 BFS visited 标记时机训练',
    '已掌握节点转入迁移题，不再占用主路径时间',
  ],
}

const isReplanning = ref(false)

// Agent collaboration flow state
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
  { agentId: 'profile', agentName: '画像智能体', role: 'PROFILE', input: '学生答题记录 + 历史画像', output: '识别指针与图结构薄弱', confidence: 0.92, evidenceTags: ['画像分析', '薄弱识别'], duration: 320, status: 'pending' },
  { agentId: 'eval', agentName: '评估智能体', role: 'EVAL', input: '练习结果 + 资源完成度', output: '4 个盲点 + 错因归类', confidence: 0.88, evidenceTags: ['效果评估', '错因分析'], duration: 410, status: 'pending' },
  { agentId: 'reflection', agentName: '反思智能体', role: 'REFLECTION', input: '评估结果 + 画像变化', output: '画像更新 + 路径触发', confidence: 0.83, evidenceTags: ['反向传播', '路径触发'], duration: 350, status: 'pending' },
]

// Profile update animation state
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

  // 淇濆瓨鏃ф帉鎻″害鐢ㄤ簬鍔ㄧ敾
  previousMastery.value = {}
  subjects.value.forEach(s => { previousMastery.value[s.name] = s.mastery })

  try {
    const profile = await fetchLatestProfile()
    const result = await agentEvaluate({ profile }) as any

    // Update collaboration flow from agent results.
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

    // 浠庤瘎浼扮粨鏋滄洿鏂版帉鎻″害
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

    // Update suggestions from evaluation result.
    if (result.evaluation?.suggestions) {
      suggestions.value = result.evaluation.suggestions.map((item: any) => {
        const type = item.type ?? inferSuggestionType(item.text)
        return { text: item.text, type, icon: iconForSuggestion(type) }
      })
    }

    // 浠庣敾鍍忔洿鏂版洿鏂皃rofileTrace
    if (result.evaluation?.profileUpdates?.adjustDimensions) {
      const updates = result.evaluation.profileUpdates.adjustDimensions
      profileTrace.after = updates.map((u: any) => ({
        label: u.dimension,
        value: `${u.delta > 0 ? '+' : ''}${u.delta}%`,
      }))
    }
  } catch {
    // fallback: 浠嶇劧鏄剧ず榛樿鏁版嵁
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
  { text: '建议增加编程实战时间，将理论与实践比例调整到 1:1。', type: 'action', icon: ArrowRight },
]

const stats = ref(defaultStats)
const suggestions = ref(defaultSuggestions)

const subjects = ref([
  { name: 'C / Python 编程基础', mastery: 90, color: '#00599C' },
  { name: '数据结构与算法', mastery: 78, color: '#4CAF50' },
  { name: '计算机系统', mastery: 58, color: '#1565C0' },
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
  { icon: Sparkles, name: '鍒濊瘑瀛︿範', earned: true, color: '#00d4ff' },
  { icon: Zap, name: '杩炵画鎵撳崱', earned: true, color: '#06d6a0' },
  { icon: Award, name: '鐭ヨ瘑杈句汉', earned: true, color: '#7c3aed' },
  { icon: PenTool, name: '鍒烽鑳芥墜', earned: false, color: '#f59e0b' },
  { icon: Brain, name: '椤圭洰鍏堥攱', earned: false, color: '#f43f5e' },
  { icon: TrendingUp, name: '瀛︿範澶у笀', earned: false, color: '#3b82f6' },
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
  { label: '诊断入口', value: '23 个行为信号', text: '测评错题、资源完成度和对话追问汇入同一条学习画像时间线。', tone: '#00d4ff' },
  { label: '路径修正', value: '2 个薄弱点', text: '图结构与指针训练自动插入下一轮路径，不再只给静态报告。', tone: '#f43f5e' },
  { label: '星标反馈', value: '3 枚已点亮', text: '完成的知识点在树叶上高亮，未完成节点保持低亮等待触发。', tone: '#ffe58f' },
]

const pathStages = [
  { label: 'Profile capture', value: 88, tone: '#00d4ff' },
  { label: 'Knowledge location', value: 72, tone: '#3b82f6' },
  { label: 'Weakness repair', value: 46, tone: '#f43f5e' },
  { label: 'Next path', value: 64, tone: '#7c3aed' },
]

const fineTreeNodes: TreeNode[] = [
  { name: 'Stack frame lifetime', course: 'C programming', status: 'mastered', progress: 86 },
  { name: 'malloc / free pairing', course: 'C programming', status: 'learning', progress: 58 },
  { name: 'Double pointer parameters', course: 'C programming', status: 'weak', progress: 41, issue: 'Cannot reliably judge whether parameter changes sync to the caller.', cause: 'Pointer levels and address aliases are mixed.', remedialResources: ['Double pointer call-stack diagram', 'swap / createNode comparison drills'], pathImpact: 'Insert chapter 3 micro practice' },
  { name: '*p and p write direction', course: 'C programming', status: 'weak', progress: 44, issue: 'Confuses changing a pointer variable with changing the pointed value.', cause: 'Needs memory-cell tracing.', remedialResources: ['Pointer alias sketch card', 'Line-by-line trace drills'], pathImpact: 'Insert next repair task' },
  { name: 'Dangling pointer after free', course: 'C programming', status: 'weak', progress: 36 },
  { name: 'Struct pointer member access', course: 'C programming', status: 'mastered', progress: 84 },
  { name: 'Array bounds and pointer offset', course: 'C programming', status: 'learning', progress: 61 },
  { name: 'Adjacency list graph build', course: 'Data structures', status: 'learning', progress: 68 },
  { name: 'BFS visited timing', course: 'Data structures', status: 'weak', progress: 38, issue: 'Visited marking timing causes repeated or missed nodes.', cause: 'Queue progression model is not stable.', remedialResources: ['BFS queue snapshot animation', 'visited marking drills'], pathImpact: 'Insert graph search training' },
  { name: 'DFS backtracking boundary', course: 'Data structures', status: 'learning', progress: 52 },
  { name: 'Head and tail insert difference', course: 'Data structures', status: 'learning', progress: 66 },
  { name: 'Queue empty boundary', course: 'Data structures', status: 'weak', progress: 40 },
  { name: 'Graph indegree counting', course: 'Data structures', status: 'learning', progress: 57 },
  { name: 'Shortest path initialization', course: 'Data structures', status: 'next', progress: 24 },
  { name: 'Recursion termination', course: 'Algorithms', status: 'mastered', progress: 88 },
  { name: 'Complexity from loops', course: 'Algorithms', status: 'learning', progress: 62 },
  { name: 'Mistake clustering review', course: 'Algorithms', status: 'weak', progress: 34 },
  { name: '15 minute diagram repair', course: 'Algorithms', status: 'next', progress: 20 },
]

const profileTrace = {
  before: [
    { label: 'Graph structure mastery', value: '68%' },
    { label: 'Pointer mastery', value: '65%' },
    { label: 'Resource preference', value: 'Text explanation' },
  ],
  evidence: [
    'Two thirds of stage assessment mistakes came from graphs and pointers',
    'Student asked about node relationships three times',
    'Pointer exercise accuracy dropped from 65% to 42%',
  ],
  after: [
    { label: 'Graph structure mastery', value: '42%' },
    { label: 'Pointer mastery', value: '42%' },
    { label: 'New preference', value: 'Mind map and example breakdown' },
  ],
  nextAction: 'Insert graph repair and pointer training resources into the next path',
}

const selectedNode = ref<TreeNode | null>(null)

const selectedNodeDetail = computed(() => {
  const node = selectedNode.value
  if (!node) return null
  const course = node.course ?? 'Uncategorized'
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
  // 鐭ヨ瘑鐐硅嫻鏋滐細鐩存帴鍖归厤
  const point = fineTreeNodes.find(n => n.name === marker?.label)
  if (point) {
    selectedNode.value = point
    return
  }

  // 璇剧▼/鍒嗘敮鏍囪锛氭樉绀鸿璇剧▼鐨勭涓€涓杽寮辩煡璇嗙偣锛屾垨绗竴涓煡璇嗙偣
  if (marker?.type === 'course' || marker?.type === 'branch') {
    const courseName = marker.label
    const courseNodes = fineTreeNodes.filter(n => n.course === courseName)
    if (courseNodes.length > 0) {
      const weakNode = courseNodes.find(n => n.status === 'weak')
      selectedNode.value = weakNode ?? courseNodes[0]
    }
  }
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

const averageMastery = computed(() => {
  const sum = subjects.value.reduce((total, item) => total + item.mastery, 0)
  return Math.round(sum / subjects.value.length)
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
  if (text.includes('鐭澘') || text.includes('钖勫急') || text.includes('鍔犲己')) return 'weakness'
  if (text.includes('淇濇寔') || text.includes('鎻愬崌')) return 'positive'
  if (text.includes('鍙互') || text.includes('鎺屾彙')) return 'strength'
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

    if (label.includes('??')) return Clock
    if (label.includes('??') || label.includes('??')) return PenTool
    if (label.includes('???')) return Target
    if (label.includes('??')) return TrendingUp
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

  // 鍒濆鍖朅gent鍗忎綔娴侊紙榛樿pending鐘舵€侊級
  agentNodes.value = defaultAgentNodes.map(n => ({ ...n, status: 'pending' }))

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
      const dashboard = (data as any).dashboard
      if (dashboard?.weaknesses) {
        const weakIds = dashboard.weaknesses.map((w: any) => w.id)
        const weakMap: Record<string, any> = {}
        dashboard.weaknesses.forEach((w: any) => { weakMap[w.id] = w })
        // 鏄犲皠weakness鍒癴ineTreeNodes
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

      // Update subject mastery from dashboard metrics.
      if (dashboard?.profileMetrics) {
        const metricMap: Record<string, number> = {}
        dashboard.profileMetrics.forEach((m: any) => {
          metricMap[m.label] = m.stage2
        })
        const nameMap: Array<[string, string]> = [
          ['知识广度', 'C / Python 编程基础'],
          ['知识深度', '数据结构与算法'],
          ['应用能力', '计算机系统（OS/网络/DB）'],
          ['创新力', '机器学习'],
          ['工程实践', '深度学习'],
          ['知识迁移', '数学与编程基础'],
        ]
        subjects.value = subjects.value.map(s => {
          const metricLabel = nameMap.find(([, v]) => v === s.name)?.[0]
          if (metricLabel && metricMap[metricLabel] !== undefined) {
            return { ...s, mastery: metricMap[metricLabel] }
          }
          return s
        })
      }

      // 浠巇ashboard.evidenceRounds鏇存柊profileTrace
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
            <h2 class="card-title-sm">瀛︿範鐘舵€佸彲瑙嗗寲</h2>
            <span class="card-tag">3D</span>
          </div>
          <ThreeKnowledgeTree fill :knowledge-points="fineTreeNodes" :scene-scale="10.2" :scene-height-scale="1.45" :scene-offset-y="4.35" @marker-select="handleMarkerSelect" />
        </div>
      </div>

      <div class="eval-right-panel">
        <div class="right-scroll-area">
          <!-- Detail state: when a node is selected -->
          <template v-if="selectedNodeDetail">
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

            <!-- 璇剧▼淇℃伅 -->
            <div class="detail-course-bar">
              <span class="detail-course-name">{{ selectedNodeDetail.course }}</span>
              <span class="detail-course-mastery">璇剧▼鎺屾彙 {{ selectedNodeDetail.courseMastery }}%</span>
              <span v-if="selectedNodeDetail.courseWeakCount > 0" class="detail-course-weak">{{ selectedNodeDetail.courseWeakCount }} ???</span>
            </div>

            <div class="detail-meter">
              <i :style="{ width: `${Math.max(4, selectedNodeDetail.progress)}%`, background: masteryColor(selectedNodeDetail.progress) }" />
            </div>

            <div v-if="selectedNodeDetail.issue" class="detail-block">
              <span class="detail-label">闂璇婃柇</span>
              <p>{{ selectedNodeDetail.issue }}</p>
            </div>
            <div v-if="selectedNodeDetail.cause" class="detail-block">
              <span class="detail-label">鏍瑰洜鍒嗘瀽</span>
              <p>{{ selectedNodeDetail.cause }}</p>
            </div>
            <div v-if="selectedNodeDetail.remedialResources.length" class="detail-block">
              <span class="detail-label">琛ユ晳璧勬簮</span>
              <ul>
                <li v-for="res in selectedNodeDetail.remedialResources" :key="res" @click="goToTutoring(res)">{{ res }}</li>
              </ul>
            </div>
            <div v-if="selectedNodeDetail.pathImpact" class="detail-block">
              <span class="detail-label">璺緞褰卞搷</span>
              <p>{{ selectedNodeDetail.pathImpact }}</p>
            </div>

            <!-- 鍚岃绋嬬煡璇嗙偣鍒楄〃 -->
            <div class="detail-block">
              <span class="detail-label">鍚岃绋嬬煡璇嗙偣</span>
              <div class="detail-sibling-list">
                <button
                  v-for="sib in selectedNodeDetail.siblings"
                  :key="sib.name"
                  :class="['detail-sibling-item', sib.status, { active: sib.name === selectedNodeDetail.name }]"
                  type="button"
                  @click="selectedNode = sib"
                >
                  <span class="sib-dot" />
                  <span class="sib-name">{{ sib.name }}</span>
                  <span class="sib-pct" :style="{ color: masteryColor(sib.progress) }">{{ sib.progress }}%</span>
                </button>
              </div>
            </div>

            <!-- Round insight info (moved from left overlay) -->
            <div v-if="showRoundInsight" class="detail-block round-insight-compact">
              <span class="detail-label">澶ф爲鏇存柊</span>
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
                <button class="round-secondary-sm" type="button" @click="showRoundInsight = false">绋嶅悗</button>
                <button class="round-primary-sm" type="button" @click="acceptRoundAdjustment">鎺ュ彈璋冩暣</button>
              </div>
            </div>

            <div class="detail-actions">
              <button type="button" class="detail-btn-secondary" @click="goToTutoring(selectedNodeDetail.name)">杩涘叆杈呭</button>
              <button type="button" class="detail-btn-primary" @click="addToNextPath">鍔犲叆璺緞</button>
            </div>
          </template>
          <template v-else>
            <div class="right-header">
              <div class="hero-badge">????</div>
              <h1 class="page-title">????<span class="accent-text">????</span></h1>
              <p class="page-subtitle">??????????????????????????????????</p>
              <p v-if="isLoading" class="page-status">????????...</p>
            </div>

            <div class="card agent-flow-card">
              <div class="card-head">
                <h2 class="card-title-sm">Multi-agent collaboration flow</h2>
                <span class="card-tag">Agent</span>
              </div>
              <AgentFlowTimeline :agents="agentNodes" :active="agentFlowActive" @agent-select="handleAgentSelect" />
              <transition name="agent-detail">
                <div v-if="selectedAgent" class="agent-detail-panel">
                  <div class="agent-detail-head">
                    <span class="agent-detail-name">{{ selectedAgent?.agentName }}</span>
                    <span class="agent-detail-confidence">Confidence {{ ((selectedAgent?.confidence ?? 0) * 100).toFixed(0) }}%</span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">Input</span>
                    <span>{{ selectedAgent?.input }}</span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">Output</span>
                    <span>{{ selectedAgent?.output }}</span>
                  </div>
                  <div class="agent-detail-row">
                    <span class="agent-detail-label">Time</span>
                    <span>{{ selectedAgent?.duration }}ms</span>
                  </div>
                  <div v-if="selectedAgent?.evidenceTags.length" class="agent-detail-tags">
                    <span v-for="tag in selectedAgent?.evidenceTags" :key="tag" class="agent-tag">{{ tag }}</span>
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

            <div class="card mastery-card">
              <div class="card-head">
                <h2 class="card-title-sm">知识掌握度</h2>
                <span class="mastery-avg">平均 {{ averageMastery }}%</span>
              </div>
              <div class="mastery-list">
                <div v-for="subject in subjects" :key="subject.name" class="mastery-row">
                  <div class="mastery-top">
                    <span class="mastery-name">{{ subject.name }}</span>
                    <div class="mastery-pct-group">
                      <span class="mastery-pct" :style="{ color: masteryColor(subject.mastery) }">{{ subject.mastery }}%</span>
                      <span v-if="masteryDeltas[subject.name]" class="mastery-delta" :class="masteryDeltas[subject.name] > 0 ? 'up' : 'down'">
                        {{ masteryDeltas[subject.name] > 0 ? '+' : '' }}{{ masteryDeltas[subject.name] }}%
                      </span>
                    </div>
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
                <h2 class="card-title-sm">瀛︿範寤鸿</h2>
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
                <h2 class="card-title-sm">鎴愬氨寰界珷</h2>
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
                  <span v-else class="badge-locked">--</span>
                </div>
              </div>
            </div>

            <div class="card chart-card">
              <div class="card-head">
                <h2 class="card-title-sm">鑳藉姏鎴愰暱鏇茬嚎</h2>
                <div class="chart-legend">
                  <span class="legend-item"><span class="legend-dot cyan" />鎴戠殑</span>
                  <span class="legend-item"><span class="legend-dot dim" />骞冲潎</span>
                </div>
              </div>
              <div class="chart-body">
                <svg viewBox="0 0 350 60" class="trend-svg">
                  <polyline :points="chartPoints.avgPoints" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="4 3" />
                  <polyline :points="chartPoints.youPoints" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="chart-footer">
                  <span>绱 +23%</span>
                  <span>杈冧笂鍛?<strong class="up">+12%</strong></span>
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
                <span>{{ isGeneratingReport ? '姝ｅ湪鐢熸垚...' : '鐢熸垚璇勪及鎶ュ憡' }}</span>
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
            <h2 class="modal-title">瀛︿範璇勪及鎶ュ憡</h2>
            <button class="modal-close-btn" @click="showReportModal = false">关闭</button>
          </div>
          <div class="modal-body">
            <div class="report-summary">
              <div class="report-grade">
                <span class="grade-letter">B+</span>
                <span class="grade-label">缁煎悎璇勭骇</span>
              </div>
              <div class="report-metrics">
                <div class="metric-item">
                  <span class="metric-label">学习总时长</span>
                  <span class="metric-value">128 灏忔椂</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">瀹屾垚璇炬椂</span>
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
              <h3>闃舵鎬荤粨</h3>
              <p>当前学习节奏稳定，机器学习基础表现较好，但在深度学习和大模型应用上的完成度仍有明显提升空间。</p>
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
              <button class="btn-ghost">棰勮</button>
              <button class="btn-primary">
                <Download :size="14" stroke-width="1.5" />
                涓嬭浇 PDF
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
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 14, 39, 0.72);
  backdrop-filter: blur(30px) saturate(1.3);
  -webkit-backdrop-filter: blur(30px) saturate(1.3);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    inset 0 0 0 1px rgba(0, 212, 255, 0.03);
}

.eval-right-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E");
  opacity: 0.5;
  border-radius: inherit;
}

.right-scroll-area {
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

/* Summary cards 鈥?flat, no hero-metric */
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

/* Left panel 鈥?3D tree only, no overlays */
.three-mini-card {
  position: relative;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-radius: 0;
}

.three-mini-card .card-head {
  position: absolute;
  top: 10px;
  left: 24px;
  right: 24px;
  z-index: 2;
  margin-bottom: 0;
  pointer-events: none;
}

.three-mini-card :deep(.three-tree-wrapper) {
  height: 100vh;
  min-height: 760px;
  border: 0;
  border-radius: 0;
}

.three-mini-card :deep(.three-tree-canvas) {
  min-height: 760px;
}

/* Detail panel (right panel detail state) */
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

/* Badges 鈥?single row */
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

/* Chart 鈥?mini sparkline */
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
  content: '>';
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
