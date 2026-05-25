import { reactive, ref, computed } from 'vue'

export type AgentState = 'idle' | 'working' | 'processing' | 'pending' | 'error'

export interface AgentNode {
  id: string
  name: string
  nameEn: string
  icon: string
  state: AgentState
  color: string
  x: number
  y: number
  targetX: number
  targetY: number
  vitality: number
  energy: number
  currentTask: string
  lastAction: string
  input: string[]
  output: string[]
  process: string
  messagesProcessed: number
  errorCount: number
  uptime: number
  connections: string[]
}

export interface AgentMessage {
  id: string
  from: string
  to: string
  content: string
  timestamp: number
  type: 'data' | 'request' | 'response' | 'error'
}

export interface SystemMetrics {
  totalMessages: number
  avgLatency: number
  errorRate: number
  throughput: number
  activeConnections: number
}

const AGENT_DEFINITIONS: Omit<AgentNode, 'state' | 'vitality' | 'energy' | 'currentTask' | 'lastAction' | 'messagesProcessed' | 'errorCount' | 'uptime' | 'targetX' | 'targetY'>[] = [
  {
    id: 'profile',
    name: '画像智能体',
    nameEn: 'Profile Agent',
    icon: '👤',
    color: '#00d4ff',
    x: 200, y: 200,
    input: ['测评结果', '提问记录', '学习行为'],
    output: ['学生画像标签'],
    process: '识别薄弱知识点与学习偏好',
    connections: ['path', 'resource', 'evaluation'],
  },
  {
    id: 'path',
    name: '路径规划智能体',
    nameEn: 'Path Agent',
    icon: '🗺️',
    color: '#3b82f6',
    x: 450, y: 120,
    input: ['画像标签', '课程目标', '阶段任务'],
    output: ['六阶段学习路径'],
    process: '排序学习任务，生成课前/课中/课后/期末路径',
    connections: ['resource', 'feedback'],
  },
  {
    id: 'resource',
    name: '资源生成智能体',
    nameEn: 'Resource Agent',
    icon: '📚',
    color: '#7c3aed',
    x: 700, y: 200,
    input: ['画像偏好', '路径阶段', '知识薄弱点'],
    output: ['多模态学习资源'],
    process: '生成知识卡片、思维导图、练习题、虚拟人讲解',
    connections: ['evaluation'],
  },
  {
    id: 'evaluation',
    name: '评估智能体',
    nameEn: 'Evaluation Agent',
    icon: '📊',
    color: '#f59e0b',
    x: 700, y: 400,
    input: ['测评数据', '答题记录', '学习时长'],
    output: ['评估报告 + 薄弱点'],
    process: '分析测评结果、错题类型、掌握度变化',
    connections: ['feedback', 'profile-update'],
  },
  {
    id: 'feedback',
    name: '反馈智能体',
    nameEn: 'Feedback Agent',
    icon: '💬',
    color: '#06d6a0',
    x: 450, y: 480,
    input: ['评估报告', '错题记录', '路径进度'],
    output: ['学习反馈 + 成长建议'],
    process: '生成正反馈、成长提示和下一步建议',
    connections: ['profile-update'],
  },
  {
    id: 'profile-update',
    name: '画像反向更新',
    nameEn: 'Profile Update Agent',
    icon: '🔄',
    color: '#f43f5e',
    x: 200, y: 400,
    input: ['评估结论', '薄弱点', '学生反馈'],
    output: ['更新后的画像 + 新路径'],
    process: '根据评估结果重构画像，触发下一轮路径优化',
    connections: ['profile'],
  },
]

const TASK_TEMPLATES: Record<string, string[]> = {
  profile: ['分析学习行为数据', '更新知识掌握度', '识别薄弱知识点', '生成画像标签'],
  path: ['规划课前预习任务', '调整学习路径', '生成阶段任务清单', '优化复习计划'],
  resource: ['生成思维导图', '创建练习题', '制作知识卡片', '准备虚拟人讲解'],
  evaluation: ['分析测评结果', '统计错题类型', '计算掌握度变化', '生成评估报告'],
  feedback: ['生成成长提示', '创建正反馈消息', '推荐下一步学习', '更新能力报告'],
  'profile-update': ['重构学生画像', '触发路径优化', '同步薄弱点数据', '更新学习偏好'],
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createAgent(def: typeof AGENT_DEFINITIONS[number]): AgentNode {
  return {
    ...def,
    state: 'idle',
    vitality: 60 + Math.random() * 30,
    energy: 70 + Math.random() * 25,
    currentTask: '',
    lastAction: '初始化完成',
    messagesProcessed: Math.floor(Math.random() * 50),
    errorCount: 0,
    uptime: 0,
    targetX: def.x,
    targetY: def.y,
  }
}

// Singleton state
const agents = reactive<Map<string, AgentNode>>(new Map())
const messages = ref<AgentMessage[]>([])
const selectedAgentId = ref<string | null>(null)
const systemMetrics = reactive<SystemMetrics>({
  totalMessages: 0,
  avgLatency: 45,
  errorRate: 0,
  throughput: 0,
  activeConnections: 0,
})
const simulationRunning = ref(false)
let simulationTimer: ReturnType<typeof setInterval> | null = null
let messageTimer: ReturnType<typeof setInterval> | null = null

// Initialize agents
AGENT_DEFINITIONS.forEach(def => {
  agents.set(def.id, createAgent(def))
})

const agentList = computed(() => Array.from(agents.values()))
const selectedAgent = computed(() => selectedAgentId.value ? agents.get(selectedAgentId.value) : null)

const activeAgentCount = computed(() => agentList.value.filter(a => a.state === 'working' || a.state === 'processing').length)
const avgVitality = computed(() => {
  const list = agentList.value
  return list.length > 0 ? Math.round(list.reduce((s, a) => s + a.vitality, 0) / list.length) : 0
})

function selectAgent(id: string | null) {
  selectedAgentId.value = id
}

function sendMessage(from: string, to: string, content: string, type: AgentMessage['type'] = 'data') {
  const msg: AgentMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    from, to, content, timestamp: Date.now(), type,
  }
  messages.value = [...messages.value.slice(-199), msg]
  systemMetrics.totalMessages++
}

function simulateStep() {
  const agentArr = agentList.value
  if (agentArr.length === 0) return

  // Pick 1-2 agents to become active
  const count = 1 + (Math.random() > 0.5 ? 1 : 0)
  for (let i = 0; i < count; i++) {
    const agent = randomPick(agentArr)
    const a = agents.get(agent.id)!
    if (!a) continue

    // State transition
    const roll = Math.random()
    if (roll < 0.4) {
      a.state = 'working'
      a.currentTask = randomPick(TASK_TEMPLATES[a.id] || ['处理中...'])
      a.vitality = Math.min(100, a.vitality + 2 + Math.random() * 3)
      a.messagesProcessed++
      a.lastAction = a.currentTask

      // Send message to connected agent
      if (a.connections.length > 0) {
        const targetId = randomPick(a.connections)
        const target = agents.get(targetId)
        if (target) {
          sendMessage(a.id, targetId, `${a.name} → ${a.currentTask}`, 'data')
        }
      }
    } else if (roll < 0.6) {
      a.state = 'processing'
      a.currentTask = randomPick(TASK_TEMPLATES[a.id] || ['分析中...'])
      a.energy = Math.max(10, a.energy - 1)
    } else if (roll < 0.8) {
      a.state = 'idle'
      a.currentTask = ''
      a.energy = Math.min(100, a.energy + 0.5)
    }

    // Slight position drift for visual interest
    const drift = 3
    a.x = a.x + (Math.random() - 0.5) * drift
    a.y = a.y + (Math.random() - 0.5) * drift
  }

  // Update metrics
  systemMetrics.avgLatency = 30 + Math.random() * 40
  systemMetrics.errorRate = Math.random() * 2
  systemMetrics.throughput = systemMetrics.totalMessages / Math.max(1, (Date.now() / 1000))
  systemMetrics.activeConnections = agentList.value.filter(a => a.state !== 'idle').length
}

function startSimulation() {
  if (simulationRunning.value) return
  simulationRunning.value = true

  // Set some initial agents as working
  const profile = agents.get('profile')
  if (profile) { profile.state = 'working'; profile.currentTask = '分析学习行为数据' }
  const path = agents.get('path')
  if (path) { path.state = 'processing'; path.currentTask = '规划课前预习任务' }

  simulationTimer = setInterval(simulateStep, 2000)
  messageTimer = setInterval(() => {
    // Periodic inter-agent messages
    const source = randomPick(agentList.value)
    if (source.connections.length > 0) {
      const targetId = randomPick(source.connections)
      sendMessage(source.id, targetId, `${source.name} 数据同步`, 'data')
    }
  }, 3500)
}

function stopSimulation() {
  simulationRunning.value = false
  if (simulationTimer) { clearInterval(simulationTimer); simulationTimer = null }
  if (messageTimer) { clearInterval(messageTimer); messageTimer = null }
}

export function useAgentMapStore() {
  return {
    agents,
    agentList,
    selectedAgentId,
    selectedAgent,
    messages,
    systemMetrics,
    simulationRunning,
    activeAgentCount,
    avgVitality,
    selectAgent,
    sendMessage,
    startSimulation,
    stopSimulation,
  }
}
