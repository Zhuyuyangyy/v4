import type {
  BaseKnowledgeItem,
  ConstellationNode,
  ConstellationEdge,
  MetroLine,
  MatrixCell,
  ConcentricRing,
  OrbitTrack,
  NodeDetail,
} from './mapTypes'

export const BASE_KNOWLEDGE_ITEMS: BaseKnowledgeItem[] = [
  { id: 'm1', label: '矩阵运算', domain: 'math', mastery: 0.95, importance: 0.9, relations: ['m2', 'ml1', 'dl1'], relationType: 'prerequisite' },
  { id: 'm2', label: '特征值与分解', domain: 'math', mastery: 0.82, importance: 0.7, relations: ['m4', 'ml3'], relationType: 'prerequisite' },
  { id: 'm3', label: '概率论', domain: 'math', mastery: 0.78, importance: 0.85, relations: ['m4', 'ml1'], relationType: 'prerequisite' },
  { id: 'm4', label: '微积分', domain: 'math', mastery: 0.66, importance: 0.8, relations: ['m5'], relationType: 'prerequisite' },
  { id: 'm5', label: '凸优化', domain: 'math', mastery: 0.32, importance: 0.6, relations: [], relationType: 'prerequisite' },
  { id: 'ml1', label: '监督学习', domain: 'ml', mastery: 0.88, importance: 0.95, relations: ['ml2', 'ml3', 'ml5'], relationType: 'prerequisite' },
  { id: 'ml2', label: '无监督学习', domain: 'ml', mastery: 0.62, importance: 0.7, relations: ['ml4'], relationType: 'similar' },
  { id: 'ml3', label: '决策树 / RF', domain: 'ml', mastery: 0.78, importance: 0.65, relations: ['ml4', 'ml5'], relationType: 'similar' },
  { id: 'ml4', label: 'SVM', domain: 'ml', mastery: 0.55, importance: 0.5, relations: [], relationType: 'similar' },
  { id: 'ml5', label: '集成学习', domain: 'ml', mastery: 0.48, importance: 0.55, relations: [], relationType: 'application' },
  { id: 'dl1', label: '神经网络', domain: 'dl', mastery: 0.58, importance: 0.9, relations: ['dl2', 'dl3'], relationType: 'prerequisite' },
  { id: 'dl2', label: 'CNN', domain: 'dl', mastery: 0.32, importance: 0.75, relations: ['dl4'], relationType: 'similar' },
  { id: 'dl3', label: 'RNN / LSTM', domain: 'dl', mastery: 0.20, importance: 0.6, relations: ['dl4', 'dl5'], relationType: 'similar' },
  { id: 'dl4', label: 'Transformer', domain: 'dl', mastery: 0.10, importance: 0.95, relations: ['n2'], relationType: 'application', },
  { id: 'dl5', label: 'Attention', domain: 'dl', mastery: 0.18, importance: 0.85, relations: ['dl4'], relationType: 'prerequisite' },
  { id: 'a1', label: '排序与查找', domain: 'algo', mastery: 0.92, importance: 0.8, relations: ['a2'], relationType: 'prerequisite' },
  { id: 'a2', label: '数据结构', domain: 'algo', mastery: 0.78, importance: 0.9, relations: ['a3', 'a4', 'e1'], relationType: 'prerequisite' },
  { id: 'a3', label: '图算法', domain: 'algo', mastery: 0.42, importance: 0.75, relations: ['a4'], relationType: 'similar' },
  { id: 'a4', label: '动态规划', domain: 'algo', mastery: 0.30, importance: 0.7, relations: [], relationType: 'application' },
  { id: 'e1', label: 'Python 工程', domain: 'eng', mastery: 0.72, importance: 0.6, relations: ['e2', 'e3'], relationType: 'prerequisite' },
  { id: 'e2', label: '版本控制', domain: 'eng', mastery: 0.65, importance: 0.4, relations: ['e3'], relationType: 'prerequisite' },
  { id: 'e3', label: '模型部署', domain: 'eng', mastery: 0.30, importance: 0.5, relations: [], relationType: 'application' },
  { id: 'n1', label: '词向量', domain: 'nlp', mastery: 0.40, importance: 0.6, relations: ['n2'], relationType: 'prerequisite' },
  { id: 'n2', label: 'LLM', domain: 'nlp', mastery: 0.18, importance: 0.9, relations: ['n3', 'n4'], relationType: 'application' },
  { id: 'n3', label: '微调与对齐', domain: 'nlp', mastery: 0.08, importance: 0.7, relations: [], relationType: 'application' },
  { id: 'n4', label: '检索增强', domain: 'nlp', mastery: 0.12, importance: 0.8, relations: [], relationType: 'application' },
]

const DOMAIN_META: Record<string, { name: string; color: string; short: string }> = {
  math: { name: '数学基础', color: '#00d4ff', short: 'MATH' },
  ml: { name: '机器学习', color: '#7c3aed', short: 'ML' },
  dl: { name: '深度学习', color: '#06d6a0', short: 'DL' },
  algo: { name: '算法与数据结构', color: '#f59e0b', short: 'ALGO' },
  eng: { name: '工程实践', color: '#3b82f6', short: 'ENG' },
  nlp: { name: 'NLP 应用', color: '#f43f5e', short: 'NLP' },
}

export function getDomainMeta(domain: string) {
  return DOMAIN_META[domain] || { name: domain, color: '#8892b0', short: domain.toUpperCase() }
}

export function buildConstellationView(items: BaseKnowledgeItem[]): {
  nodes: ConstellationNode[]
  edges: ConstellationEdge[]
} {
  const domainKeys = Object.keys(DOMAIN_META)
  const domainPositions: Record<string, { cx: number; cy: number }> = {
    math: { cx: 300, cy: 350 },
    ml: { cx: 700, cy: 250 },
    dl: { cx: 1050, cy: 300 },
    algo: { cx: 280, cy: 700 },
    eng: { cx: 680, cy: 680 },
    nlp: { cx: 1050, cy: 660 },
  }

  const nodes: ConstellationNode[] = items.map((item, i) => {
    const pos = domainPositions[item.domain]
    const domainItems = items.filter(it => it.domain === item.domain)
    const idx = domainItems.indexOf(item)
    const spread = 120
    const angleOffset = (idx / domainItems.length) * Math.PI * 2
    const r = 40 + idx * 25
    return {
      ...item,
      relationType: item.relationType || 'similar',
      x: pos.cx + r * Math.cos(angleOffset),
      y: pos.cy + r * Math.sin(angleOffset),
    }
  })

  const edges: ConstellationEdge[] = []
  const nodeIds = new Set(items.map(i => i.id))
  for (const item of items) {
    for (const relId of item.relations) {
      if (nodeIds.has(relId)) {
        edges.push({ from: item.id, to: relId, type: item.relationType || 'similar' })
      }
    }
  }

  return { nodes, edges }
}

export function buildMetroView(_items: BaseKnowledgeItem[]): MetroLine[] {
  return [
    {
      id: 'math', name: '数学基础线', color: '#00d4ff',
      waypoints: [[120, 200], [1280, 200]],
      stations: [
        { id: 'ms1', x: 140, y: 200, label: '集合 / 线代基础', mastery: 1.0, prerequisite: '—', nextStation: '矩阵运算', estimatedTime: '2h' },
        { id: 'ms2', x: 310, y: 200, label: '矩阵运算', mastery: 0.95, interchange: ['ml'], prerequisite: '线代基础', nextStation: '特征值', estimatedTime: '3h' },
        { id: 'ms3', x: 470, y: 200, label: '特征值与分解', mastery: 0.82, prerequisite: '矩阵运算', nextStation: '微积分', estimatedTime: '4h' },
        { id: 'ms4', x: 640, y: 200, label: '微积分', mastery: 0.66, interchange: ['ml', 'dl'], prerequisite: '特征值', nextStation: '概率统计', estimatedTime: '5h' },
        { id: 'ms5', x: 820, y: 200, label: '概率与统计', mastery: 0.78, prerequisite: '微积分', nextStation: '凸优化', estimatedTime: '3h' },
        { id: 'ms6', x: 980, y: 200, label: '凸优化', mastery: 0.30, interchange: ['ml', 'dl'], recommended: true, isRemedial: true, prerequisite: '概率统计', nextStation: '信息论', estimatedTime: '6h' },
        { id: 'ms7', x: 1150, y: 200, label: '信息论', mastery: 0.05, prerequisite: '凸优化', nextStation: '—', estimatedTime: '4h' },
      ],
    },
    {
      id: 'ml', name: '机器学习线', color: '#7c3aed',
      waypoints: [[120, 370], [1280, 370]],
      stations: [
        { id: 'mls1', x: 140, y: 370, label: 'Python 基础', mastery: 1.0, prerequisite: '—', nextStation: '数据预处理', estimatedTime: '2h' },
        { id: 'mls2', x: 310, y: 370, label: '数据预处理', mastery: 0.88, interchange: ['math'], prerequisite: 'Python', nextStation: '监督学习', estimatedTime: '3h' },
        { id: 'mls3', x: 470, y: 370, label: '监督学习', mastery: 0.82, prerequisite: '数据预处理', nextStation: '回归与分类', estimatedTime: '5h' },
        { id: 'mls4', x: 640, y: 370, label: '回归与分类', mastery: 0.66, interchange: ['math', 'dl'], prerequisite: '监督学习', nextStation: '集成方法', estimatedTime: '4h' },
        { id: 'mls5', x: 820, y: 370, label: '集成方法', mastery: 0.52, prerequisite: '回归与分类', nextStation: '模型评估', estimatedTime: '3h' },
        { id: 'mls6', x: 980, y: 370, label: '模型评估', mastery: 0.46, interchange: ['math', 'dl'], prerequisite: '集成方法', nextStation: 'AutoML', estimatedTime: '4h' },
        { id: 'mls7', x: 1150, y: 370, label: 'AutoML', mastery: 0.10, prerequisite: '模型评估', nextStation: '—', estimatedTime: '5h' },
      ],
    },
    {
      id: 'dl', name: '深度学习线', color: '#06d6a0',
      waypoints: [[400, 540], [1280, 540]],
      stations: [
        { id: 'dls1', x: 420, y: 540, label: '感知机 / MLP', mastery: 0.62, prerequisite: '—', nextStation: '神经网络', estimatedTime: '3h' },
        { id: 'dls2', x: 640, y: 540, label: '神经网络', mastery: 0.50, interchange: ['math', 'ml'], prerequisite: 'MLP', nextStation: 'CNN', estimatedTime: '6h' },
        { id: 'dls3', x: 820, y: 540, label: 'CNN', mastery: 0.32, isRemedial: true, prerequisite: '神经网络', nextStation: 'RNN/LSTM', estimatedTime: '5h' },
        { id: 'dls4', x: 980, y: 540, label: 'RNN / LSTM', mastery: 0.22, interchange: ['math', 'ml'], prerequisite: 'CNN', nextStation: 'Transformer', estimatedTime: '5h' },
        { id: 'dls5', x: 1140, y: 540, label: 'Transformer', mastery: 0.12, youAreHere: true, recommended: true, prerequisite: 'RNN/LSTM', nextStation: '大模型预训练', estimatedTime: '8h' },
        { id: 'dls6', x: 1280, y: 540, label: '大模型预训练', mastery: 0.04, prerequisite: 'Transformer', nextStation: '—', estimatedTime: '10h' },
      ],
    },
    {
      id: 'algo', name: '算法数据线', color: '#f59e0b',
      waypoints: [[120, 710], [1180, 710]],
      stations: [
        { id: 'as1', x: 140, y: 710, label: '数据结构', mastery: 0.88, prerequisite: '—', nextStation: '排序查找', estimatedTime: '4h' },
        { id: 'as2', x: 310, y: 710, label: '排序与查找', mastery: 0.92, prerequisite: '数据结构', nextStation: '图算法', estimatedTime: '3h' },
        { id: 'as3', x: 470, y: 710, label: '图算法', mastery: 0.42, isRemedial: true, recommended: true, prerequisite: '排序查找', nextStation: '动态规划', estimatedTime: '6h' },
        { id: 'as4', x: 640, y: 710, label: '动态规划', mastery: 0.30, interchange: ['eng'], isRemedial: true, prerequisite: '图算法', nextStation: '—', estimatedTime: '8h' },
      ],
    },
    {
      id: 'nlp', name: 'NLP 应用线', color: '#f43f5e',
      waypoints: [[700, 880], [1280, 880]],
      stations: [
        { id: 'ns1', x: 720, y: 880, label: '词嵌入', mastery: 0.40, prerequisite: '—', nextStation: 'RAG', estimatedTime: '3h' },
        { id: 'ns2', x: 900, y: 880, label: 'RAG', mastery: 0.12, interchange: ['dl'], recommended: true, prerequisite: '词嵌入', nextStation: '微调对齐', estimatedTime: '5h' },
        { id: 'ns3', x: 1080, y: 880, label: '微调与对齐', mastery: 0.08, prerequisite: 'RAG', nextStation: 'LLM 应用', estimatedTime: '6h' },
        { id: 'ns4', x: 1240, y: 880, label: 'LLM 应用', mastery: 0.05, prerequisite: '微调对齐', nextStation: '—', estimatedTime: '8h' },
      ],
    },
    {
      id: 'eng', name: '工程实践线', color: '#3b82f6',
      waypoints: [[120, 880], [600, 880]],
      stations: [
        { id: 'es1', x: 140, y: 880, label: 'Python 工程', mastery: 0.72, prerequisite: '—', nextStation: 'Git 协作', estimatedTime: '3h' },
        { id: 'es2', x: 310, y: 880, label: 'Git 协作', mastery: 0.65, prerequisite: 'Python', nextStation: '模型部署', estimatedTime: '2h' },
        { id: 'es3', x: 480, y: 880, label: '模型部署', mastery: 0.30, interchange: ['algo'], prerequisite: 'Git', nextStation: '—', estimatedTime: '5h' },
      ],
    },
  ]
}

export function buildMatrixView(items: BaseKnowledgeItem[]): MatrixCell[] {
  const levels = [
    { key: 'remember', label: '了解' },
    { key: 'understand', label: '掌握' },
    { key: 'apply', label: '应用' },
    { key: 'transfer', label: '迁移' },
    { key: 'create', label: '创新' },
  ]
  const domainOrder = ['math', 'algo', 'ml', 'dl', 'eng', 'nlp']
  const domainLabels: Record<string, string> = {
    math: '数学基础', algo: '算法与数据', ml: '机器学习', dl: '深度学习', eng: '工程实践', nlp: 'NLP 应用',
  }
  const decayPerLevel = [0, 0.08, 0.22, 0.40, 0.60]

  const cells: MatrixCell[] = []
  for (const domain of domainOrder) {
    const domainItems = items.filter(i => i.domain === domain)
    const avgMastery = domainItems.reduce((s, i) => s + i.mastery, 0) / domainItems.length
    for (let li = 0; li < levels.length; li++) {
      const value = Math.max(0, Math.min(1, avgMastery - decayPerLevel[li]))
      const isWeak = value > 0 && value < 0.4
      const isRecommended = isWeak && (li === Math.ceil(avgMastery * 5) - 1)
      cells.push({
        domain,
        domainLabel: domainLabels[domain] || domain,
        level: levels[li].key,
        levelLabel: levels[li].label,
        value,
        evidenceCount: Math.round(value * 12),
        lastScore: Math.round(value * 100),
        isWeak,
        isRecommended,
      })
    }
  }
  return cells
}

export function buildConcentricView(centerId: string, items: BaseKnowledgeItem[]): ConcentricRing[] {
  const center = items.find(i => i.id === centerId) || items.find(i => i.id === 'dl4')!
  const centerDomain = center.domain

  const sameDomain = items.filter(i => i.domain === centerDomain && i.id !== center.id)
  const prerequisiteIds = new Set(items.filter(i => i.relations.includes(center.id)).map(i => i.id))
  const applicationIds = new Set(items.filter(i => center.relations.includes(i.id)).map(i => i.id))

  const prerequisites = items.filter(i => prerequisiteIds.has(i.id))
  const applications = items.filter(i => applicationIds.has(i.id))
  const currentChapter = sameDomain.filter(i => !prerequisiteIds.has(i.id) && !applicationIds.has(i.id))
  const extensions = items.filter(i =>
    i.domain !== centerDomain &&
    !prerequisiteIds.has(i.id) &&
    !applicationIds.has(i.id) &&
    i.mastery < 0.5
  ).slice(0, 4)

  function assignAngles(arr: { id: string; label: string; mastery: number; recommended?: boolean }[], startAngle: number) {
    return arr.map((item, i) => ({
      ...item,
      relationToCenter: '',
      angle: startAngle + (i / arr.length) * 360,
    }))
  }

  return [
    {
      id: 'prerequisite', label: '先修基础', relationType: 'prerequisite',
      nodes: assignAngles(prerequisites.map(i => ({ id: i.id, label: i.label, mastery: i.mastery, recommended: i.mastery < 0.4 })), 0),
    },
    {
      id: 'current', label: '当前章节', relationType: 'current',
      nodes: assignAngles(currentChapter.map(i => ({ id: i.id, label: i.label, mastery: i.mastery })), 60),
    },
    {
      id: 'application', label: '应用场景', relationType: 'application',
      nodes: assignAngles(applications.map(i => ({ id: i.id, label: i.label, mastery: i.mastery })), 150),
    },
    {
      id: 'extension', label: '拓展迁移', relationType: 'extension',
      nodes: assignAngles(extensions.map(i => ({ id: i.id, label: i.label, mastery: i.mastery, recommended: true })), 240),
    },
  ]
}

export function buildOrbitView(_items: BaseKnowledgeItem[]): OrbitTrack[] {
  return [
    {
      id: 'preview', name: '预习轨道', color: '#7c3aed',
      nodes: [
        { id: 'pv1', label: '知识预检', status: 'completed', agentInvolved: 'ProfileAgent', angle: -150 },
        { id: 'pv2', label: '预习材料推送', status: 'completed', agentInvolved: 'ResourceAgent', triggeredResource: true, angle: -90 },
        { id: 'pv3', label: '预习自测', status: 'in_progress', agentInvolved: 'EvalAgent', angle: -30 },
      ],
    },
    {
      id: 'understand', name: '理解轨道', color: '#00d4ff',
      nodes: [
        { id: 'un1', label: '概念讲解', status: 'completed', agentInvolved: 'TutorAgent', angle: -120 },
        { id: 'un2', label: '示例演示', status: 'in_progress', agentInvolved: 'TutorAgent', angle: -60 },
        { id: 'un3', label: '知识关联', status: 'upcoming', angle: 0 },
      ],
    },
    {
      id: 'practice', name: '练习轨道', color: '#06d6a0',
      nodes: [
        { id: 'pr1', label: '基础练习', status: 'completed', agentInvolved: 'ResourceAgent', triggeredResource: true, angle: -100 },
        { id: 'pr2', label: '专项训练', status: 'remedial', agentInvolved: 'PathAgent', triggeredResource: true, entersNextCycle: true, angle: -40 },
        { id: 'pr3', label: '综合应用', status: 'upcoming', angle: 20 },
      ],
    },
    {
      id: 'assess', name: '测评轨道', color: '#f59e0b',
      nodes: [
        { id: 'as1', label: '阶段小测', status: 'completed', agentInvolved: 'EvalAgent', angle: -130 },
        { id: 'as2', label: '能力评估', status: 'in_progress', agentInvolved: 'EvalAgent', angle: -70 },
        { id: 'as3', label: '画像更新', status: 'upcoming', agentInvolved: 'FeedbackAgent', entersNextCycle: true, angle: -10 },
      ],
    },
    {
      id: 'feedback', name: '反馈轨道', color: '#f43f5e',
      nodes: [
        { id: 'fb1', label: '薄弱点识别', status: 'completed', agentInvolved: 'ProfileAgent', angle: -140 },
        { id: 'fb2', label: '路径修正', status: 'in_progress', agentInvolved: 'PathAgent', angle: -80 },
        { id: 'fb3', label: '补救触发', status: 'upcoming', agentInvolved: 'ResourceAgent', triggeredResource: true, entersNextCycle: true, angle: -20 },
      ],
    },
    {
      id: 'remedial', name: '补救轨道', color: '#3b82f6',
      nodes: [
        { id: 'rm1', label: '针对性复习', status: 'upcoming', agentInvolved: 'TutorAgent', triggeredResource: true, angle: -110 },
        { id: 'rm2', label: '二次测评', status: 'upcoming', agentInvolved: 'EvalAgent', angle: -50 },
        { id: 'rm3', label: '闭环验证', status: 'upcoming', agentInvolved: 'FeedbackAgent', entersNextCycle: true, angle: 10 },
      ],
    },
  ]
}

export function buildNodeDetail(
  mode: NodeDetail['mode'],
  nodeId: string,
  items: BaseKnowledgeItem[],
): NodeDetail | null {
  const item = items.find(i => i.id === nodeId)
  if (!item) return null

  const domainMeta = getDomainMeta(item.domain)

  switch (mode) {
    case 'constellation':
      return {
        mode,
        nodeId: item.id,
        label: item.label,
        fields: [
          { key: 'domain', label: '所属领域', value: domainMeta.name },
          { key: 'connections', label: '关联节点数', value: String(item.relations.length) },
          { key: 'importance', label: '重要性', value: `${Math.round(item.importance * 100)}%` },
          { key: 'mastery', label: '掌握度', value: `${Math.round(item.mastery * 100)}%` },
          { key: 'relationType', label: '关键关系', value: item.relationType === 'prerequisite' ? '先修依赖' : item.relationType === 'similar' ? '相似概念' : item.relationType === 'application' ? '应用关联' : '易错关联' },
        ],
        resourceLink: { focus: item.label, nodeId: item.id },
      }
    case 'metro': {
      const metroData = buildMetroView(items)
      let station: { id: string; label: string; mastery: number; prerequisite?: string; nextStation?: string; estimatedTime?: string; isRemedial?: boolean; interchange?: string[] } | null = null
      let lineName = ''
      for (const line of metroData) {
        const found = line.stations.find(s => s.label === item.label)
        if (found) { station = found; lineName = line.name; break }
      }
      return {
        mode,
        nodeId: item.id,
        label: item.label,
        fields: [
          { key: 'line', label: '所在线路', value: lineName },
          { key: 'prerequisite', label: '前置站点', value: station?.prerequisite || '—' },
          { key: 'next', label: '下一站', value: station?.nextStation || '—' },
          { key: 'interchange', label: '换乘方向', value: station?.interchange?.join(', ') || '无' },
          { key: 'time', label: '预计耗时', value: station?.estimatedTime || '—' },
          { key: 'remedial', label: '补救点', value: station?.isRemedial ? '是' : '否' },
        ],
        resourceLink: { focus: item.label, nodeId: item.id },
      }
    }
    case 'matrix': {
      const matrixData = buildMatrixView(items)
      const cell = matrixData.find(c => c.domain === item.domain && c.level === 'apply')
      return {
        mode,
        nodeId: item.id,
        label: item.label,
        fields: [
          { key: 'domain', label: '领域', value: domainMeta.name },
          { key: 'level', label: '认知层级', value: cell?.levelLabel || '应用' },
          { key: 'completion', label: '完成度', value: `${Math.round((cell?.value || item.mastery) * 100)}%` },
          { key: 'evidence', label: '测评证据', value: `${cell?.evidenceCount || 0} 条` },
          { key: 'weak', label: '薄弱原因', value: item.mastery < 0.4 ? '掌握度低于 40%' : '—' },
        ],
        resourceLink: { focus: item.label, nodeId: item.id },
      }
    }
    case 'concentric':
      return {
        mode,
        nodeId: item.id,
        label: item.label,
        fields: [
          { key: 'center', label: '中心知识', value: 'Transformer' },
          { key: 'relation', label: '关系类型', value: item.relationType === 'prerequisite' ? '先修基础' : item.relationType === 'application' ? '应用场景' : '拓展迁移' },
          { key: 'why', label: '为什么关联', value: `${item.label} 是理解中心概念的${item.relationType === 'prerequisite' ? '前置条件' : item.relationType === 'application' ? '应用方向' : '延伸知识'}` },
          { key: 'mastery', label: '掌握度', value: `${Math.round(item.mastery * 100)}%` },
        ],
        resourceLink: { focus: item.label, nodeId: item.id },
      }
    case 'orbital': {
      const orbitData = buildOrbitView(items)
      let orbitNode: { id: string; label: string; status: string; agentInvolved?: string; triggeredResource?: boolean; entersNextCycle?: boolean } | null = null
      let trackName = ''
      for (const track of orbitData) {
        const found = track.nodes.find(n => n.id === item.id || n.label === item.label)
        if (found) { orbitNode = found; trackName = track.name; break }
      }
      return {
        mode,
        nodeId: item.id,
        label: item.label,
        fields: [
          { key: 'track', label: '当前阶段', value: trackName },
          { key: 'status', label: '完成状态', value: orbitNode?.status === 'completed' ? '已完成' : orbitNode?.status === 'in_progress' ? '进行中' : orbitNode?.status === 'remedial' ? '需补救' : '待开始' },
          { key: 'agent', label: '智能体介入', value: orbitNode?.agentInvolved || '无' },
          { key: 'resource', label: '触发资源推荐', value: orbitNode?.triggeredResource ? '是' : '否' },
          { key: 'next', label: '下一步动作', value: orbitNode?.entersNextCycle ? '进入下一轮循环' : orbitNode?.status === 'upcoming' ? '等待前置完成' : '继续当前阶段' },
        ],
        resourceLink: { focus: item.label, nodeId: item.id },
      }
    }
  }
}
