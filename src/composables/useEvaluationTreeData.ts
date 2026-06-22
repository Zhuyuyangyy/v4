import { ref, computed } from 'vue'
import type {
  EvaluationTreeData,
  KnowledgeModule,
  KnowledgePoint,
  KnowledgeUnit,
  CapabilityMetric,
  AgentContribution,
  WeakPointItem,
  TrendPoint,
  AgentType,
} from '@/types/knowledge-tree'
import type { EvaluationResponse, EvaluationDashboardMetric, EvaluationDashboardWeakness } from '@/types/api'
import { fetchEvaluation, fetchLearningPath, fetchKnowledgePath } from '@/lib/api'

const AGENT_CONFIG: { type: AgentType; name: string; color: string }[] = [
  { type: 'profile', name: '画像智能体', color: '#46b5d1' },
  { type: 'planning', name: '规划智能体', color: '#5b8def' },
  { type: 'action', name: '执行智能体', color: '#45c486' },
  { type: 'reflection', name: '反思智能体', color: '#e9a23b' },
  { type: 'evaluation', name: '评估智能体', color: '#7c5cfc' },
]

const MODULE_DEFS = [
  { id: 'basics', name: '基础知识', color: '#46b5d1', units: ['语法基础', '数据类型', '控制结构'] },
  { id: 'concepts', name: '概念理解', color: '#5b8def', units: ['抽象概念', '核心原理', '模型理解'] },
  { id: 'methods', name: '方法应用', color: '#45c486', units: ['算法实现', '设计模式', '调试技巧'] },
  { id: 'reasoning', name: '综合推理', color: '#e9a23b', units: ['问题分析', '方案比较', '复杂度评估'] },
  { id: 'practice', name: '实践操作', color: '#7c5cfc', units: ['项目实战', '代码重构', '测试覆盖'] },
  { id: 'reflection', name: '反思与迁移', color: '#e66a6a', units: ['复盘总结', '知识迁移', '创新应用'] },
]

function masteryToStatus(mastery: number) {
  if (mastery === 0) return 'none'
  if (mastery < 40) return 'weak'
  if (mastery < 60) return 'beginner'
  if (mastery < 80) return 'basic'
  if (mastery < 95) return 'proficient'
  return 'mastered'
}

function generateAgentEvidence(): {
  agentEvidence: {
    agentType: AgentType
    agentName: string
    evidenceType: 'behavior' | 'reflection' | 'task_result' | 'assessment' | 'plan'
    count: number
    samples?: string[]
  }[]
  evidenceCount: number
} {
  const behavior = Math.floor(Math.random() * 8) + 2
  const reflection = Math.floor(Math.random() * 5) + 1
  const taskResult = Math.floor(Math.random() * 6) + 2
  const assessment = Math.floor(Math.random() * 4) + 1
  const plan = Math.floor(Math.random() * 3)
  return {
    agentEvidence: [
      { agentType: 'profile', agentName: '画像智能体', evidenceType: 'behavior', count: behavior },
      { agentType: 'planning', agentName: '规划智能体', evidenceType: 'plan', count: plan },
      { agentType: 'action', agentName: '执行智能体', evidenceType: 'task_result', count: taskResult },
      { agentType: 'reflection', agentName: '反思智能体', evidenceType: 'reflection', count: reflection },
      { agentType: 'evaluation', agentName: '评估智能体', evidenceType: 'assessment', count: assessment },
    ],
    evidenceCount: behavior + reflection + taskResult + assessment + plan,
  }
}

function createKnowledgePoint(moduleName: string, unitId: string, unitName: string, topicId: string, topicLabel: string, masteryPct: number): KnowledgePoint {
  const previous = Math.max(0, Math.min(100, masteryPct + (Math.random() - 0.5) * 16))
  const confidence = 55 + Math.random() * 40
  const weight = 0.8 + Math.random() * 1.2
  const change = masteryPct - previous
  const { agentEvidence, evidenceCount } = generateAgentEvidence()
  const issues = [
    '基础概念记忆不牢，需要重复练习',
    '复杂场景迁移能力不足',
    '边界条件处理经常出错',
    '理论与实践结合较弱',
    '解题步骤不够规范',
  ]
  const recommendations = [
    '完成 3 道针对性基础练习题',
    '回顾前置知识点后重新评估',
    '观看微课并做概念辨析',
    '参与协作任务加深理解',
    '整理错题本并复盘反思',
  ]
  return {
    id: topicId,
    name: topicLabel,
    module: moduleName,
    unit: unitName,
    parentId: unitId,
    mastery: masteryPct,
    previousMastery: previous,
    confidence,
    weight,
    status: masteryToStatus(masteryPct),
    recentChange: change,
    agentEvidence,
    evidenceCount,
    prerequisiteIds: [],
    relatedIds: [],
    lastEvaluatedAt: new Date().toISOString(),
    recommendation: masteryPct < 60 ? recommendations[Math.floor(Math.random() * recommendations.length)] : undefined,
    issue: masteryPct < 60 ? issues[Math.floor(Math.random() * issues.length)] : undefined,
    recentError: masteryPct < 70 ? '最近一次练习中出现了理解性错误' : undefined,
    reasonAnalysis: '综合行为证据与任务结果，智能体判断该知识点掌握尚不稳定。',
  }
}

function generateMockModules(): KnowledgeModule[] {
  return MODULE_DEFS.map((m) => {
    const units: KnowledgeUnit[] = m.units.map((unitName) => {
      const count = Math.floor(Math.random() * 3) + 3
      const points: KnowledgePoint[] = Array.from({ length: count }).map((_, i) =>
        createKnowledgePoint(m.name, `${m.id}-${unitName}`, unitName, `${m.id}-${unitName}-${i}`, `${unitName} 知识点 ${i + 1}`, Math.random() * 100),
      )
      return {
        id: `${m.id}-${unitName}`,
        name: unitName,
        module: m.name,
        avgMastery: points.reduce((s, p) => s + p.mastery, 0) / points.length,
        points,
      }
    })
    return {
      id: m.id,
      name: m.name,
      color: m.color,
      agentColor: m.color,
      avgMastery: units.reduce((s, u) => s + u.avgMastery, 0) / units.length,
      units,
    }
  })
}

const DOMAIN_COLORS = ['#46b5d1', '#5b8def', '#45c486', '#e9a23b', '#7c5cfc', '#e66a6a', '#f59e0b', '#06d6a0']

function buildModulesFromKnowledgePath(pathData: any): KnowledgeModule[] | null {
  const phases = pathData?.phases
  if (!Array.isArray(phases) || phases.length === 0) return null

  return phases.map((phase: any, pi: number) => {
    const moduleId = phase.id || `phase-${pi}`
    const moduleName = phase.name || `阶段 ${pi + 1}`
    const color = phase.color || DOMAIN_COLORS[pi % DOMAIN_COLORS.length]
    const topics: any[] = Array.isArray(phase.topics) ? phase.topics : []

    const units: KnowledgeUnit[] = []
    if (topics.length > 0) {
      // Group topics into logical units of up to 4 items to avoid overly flat trees
      const unitSize = Math.min(4, Math.max(2, Math.ceil(topics.length / 3)))
      for (let i = 0; i < topics.length; i += unitSize) {
        const slice = topics.slice(i, i + unitSize)
        const unitId = `${moduleId}-unit-${Math.floor(i / unitSize)}`
        const unitName = `单元 ${Math.floor(i / unitSize) + 1}`
        const points = slice.map((topic: any, ti: number) => {
          const rawMastery = typeof topic.mastery === 'number' ? topic.mastery : typeof topic.progress === 'number' ? topic.progress / 100 : Math.random() * 0.6 + 0.2
          const masteryPct = Math.round(rawMastery * 100)
          return createKnowledgePoint(moduleName, unitId, unitName, topic.id || `${unitId}-topic-${ti}`, topic.name || topic.label || `知识点 ${ti + 1}`, masteryPct)
        })
        units.push({
          id: unitId,
          name: unitName,
          module: moduleName,
          avgMastery: points.reduce((s, p) => s + p.mastery, 0) / points.length,
          points,
        })
      }
    }

    return {
      id: moduleId,
      name: moduleName,
      color,
      agentColor: color,
      avgMastery: units.length > 0 ? units.reduce((s, u) => s + u.avgMastery, 0) / units.length : 0,
      units,
    }
  })
}

function generateCapabilities(): CapabilityMetric[] {
  return [
    { key: 'concept', label: '概念理解', value: 72, previousValue: 66 },
    { key: 'analysis', label: '问题分析', value: 58, previousValue: 52 },
    { key: 'tools', label: '工具使用', value: 81, previousValue: 78 },
    { key: 'collab', label: '协作能力', value: 65, previousValue: 60 },
    { key: 'reflection', label: '反思能力', value: 70, previousValue: 64 },
    { key: 'transfer', label: '知识迁移', value: 54, previousValue: 48 },
  ]
}

function generateAgentContributions(): AgentContribution[] {
  return AGENT_CONFIG.map((a) => ({
    agentType: a.type,
    agentName: a.name,
    color: a.color,
    behaviorEvidence: a.type === 'profile' ? 12 : a.type === 'action' ? 8 : Math.floor(Math.random() * 5),
    reflectionEvidence: a.type === 'reflection' ? 5 : Math.floor(Math.random() * 3),
    taskResultEvidence: a.type === 'action' ? 8 : a.type === 'evaluation' ? 3 : Math.floor(Math.random() * 4),
    assessmentEvidence: a.type === 'evaluation' ? 6 : Math.floor(Math.random() * 3),
  }))
}

function generateTrends(): TrendPoint[] {
  return Array.from({ length: 7 }).map((_, i) => ({
    date: `06-${String(12 + i).padStart(2, '0')}`,
    mastery: 55 + i * 3 + Math.random() * 5,
  }))
}

export function createMockData(): EvaluationTreeData {
  const modules = generateMockModules()
  const allPoints = modules.flatMap((m) => m.units.flatMap((u) => u.points))
  const overallMastery = allPoints.reduce((s, p) => s + p.mastery * p.weight, 0) / allPoints.reduce((s, p) => s + p.weight, 0)
  const previousOverallMastery = Math.max(0, overallMastery - 6.2)
  const weakPoints = allPoints
    .filter((p) => p.mastery < 60)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      module: p.module,
      mastery: p.mastery,
      confidence: p.confidence,
      issue: p.issue || '掌握度偏低',
      action: p.recommendation || '针对性练习',
    }))
  return {
    learnerName: '学习者 A',
    courseName: '计算机科学基础',
    evaluatedAt: new Date().toLocaleString('zh-CN'),
    status: 'completed',
    overallMastery,
    previousOverallMastery,
    modules,
    capabilities: generateCapabilities(),
    weakPoints,
    agentContributions: generateAgentContributions(),
    agentConclusion:
      '规划智能体发现任务拆分较完整，但执行阶段在综合推理模块出现重复错误；反思智能体已识别该问题，建议下一轮增加针对性练习与复盘。',
    trends: generateTrends(),
  }
}

export function useEvaluationTreeData() {
  const data = ref<EvaluationTreeData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const appleDistribution = computed(() => {
    if (!data.value) return []
    const points = data.value.modules.flatMap((m) => m.units.flatMap((u) => u.points))
    return [
      { label: '完全掌握', key: 'mastered', count: points.filter((p) => p.status === 'mastered').length, color: '#e9b949' },
      { label: '熟练掌握', key: 'proficient', count: points.filter((p) => p.status === 'proficient').length, color: '#e66a6a' },
      { label: '基本掌握', key: 'basic', count: points.filter((p) => p.status === 'basic').length, color: '#e9a23b' },
      { label: '初步掌握', key: 'beginner', count: points.filter((p) => p.status === 'beginner').length, color: '#45c486' },
      { label: '掌握较弱', key: 'weak', count: points.filter((p) => p.status === 'weak').length, color: '#46b5d1' },
      { label: '尚未评估', key: 'none', count: points.filter((p) => p.status === 'none').length, color: '#6f8294' },
    ]
  })

  const overallChange = computed(() => {
    if (!data.value) return 0
    return data.value.overallMastery - data.value.previousOverallMastery
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      const [apiData, learningPathData, aiPathData] = await Promise.allSettled([
        fetchEvaluation(),
        fetchLearningPath().catch(() => null),
        fetchKnowledgePath().catch(() => null),
      ])

      const mock = createMockData()

      // Prefer AI-generated knowledge path, then learning path, so the tree reflects the constellation data
      const pathPayload =
        (aiPathData.status === 'fulfilled' && aiPathData.value?.result) ? aiPathData.value.result :
        (learningPathData.status === 'fulfilled' && learningPathData.value) ? learningPathData.value :
        null
      const pathModules = buildModulesFromKnowledgePath(pathPayload)
      if (pathModules && pathModules.length > 0) {
        mock.modules = pathModules
      }

      if (apiData.status === 'fulfilled' && apiData.value?.dashboard) {
        const d = apiData.value.dashboard
        mock.evaluatedAt = apiData.value.generatedAt ?? mock.evaluatedAt
        if (d.profileMetrics?.length) {
          mock.capabilities = d.profileMetrics
            .filter((c: EvaluationDashboardMetric) => c.key && c.label)
            .map((c: EvaluationDashboardMetric) => {
              const total = Math.max(1, c.stage0 + c.stage1 + c.stage2)
              const value = Math.round(((c.stage1 * 0.5 + c.stage2) / total) * 100)
              return {
                key: c.key,
                label: c.label,
                value,
                previousValue: Math.max(0, value - 6),
              }
            })
        }
        if (d.weaknesses?.length) {
          mock.weakPoints = d.weaknesses.slice(0, 5).map((w: EvaluationDashboardWeakness) => ({
            id: w.id,
            name: w.label,
            module: '综合模块',
            mastery: w.severity === 'high' ? 25 : w.severity === 'medium' ? 45 : 55,
            confidence: 70,
            issue: w.reason,
            action: w.action,
          }))
        }
        if (apiData.value.stats?.length) {
          mock.agentConclusion = apiData.value.stats.map((s) => `${s.label}: ${s.value}（${s.change}）`).join('；')
        }
      }

      // Recompute overall mastery and weak points from the (possibly path-derived) modules
      const allPoints = mock.modules.flatMap((m) => m.units.flatMap((u) => u.points))
      if (allPoints.length > 0) {
        mock.overallMastery = allPoints.reduce((s, p) => s + p.mastery * p.weight, 0) / allPoints.reduce((s, p) => s + p.weight, 0)
        mock.previousOverallMastery = Math.max(0, mock.overallMastery - 6.2)
        mock.weakPoints = allPoints
          .filter((p) => p.mastery < 60)
          .sort((a, b) => a.mastery - b.mastery)
          .slice(0, 5)
          .map((p) => ({
            id: p.id,
            name: p.name,
            module: p.module,
            mastery: p.mastery,
            confidence: p.confidence,
            issue: p.issue || '掌握度偏低',
            action: p.recommendation || '针对性练习',
          }))
      }

      data.value = mock
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      data.value = createMockData()
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, appleDistribution, overallChange, load }
}
