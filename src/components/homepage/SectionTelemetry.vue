<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { fetchAgentCollaboration, fetchAgentCollaborationDays } from '@/lib/api'
import type {
  AgentCollaborationResponse,
  AgentCollaborationDay,
} from '@/lib/api'

const T = {
  profileCapture: '#8F7CFF',
  profileDiagnosis: '#A78BFA',
  pathPlan: '#35E0D8',
  pathReplan: '#14B8A6',
  resourceSearch: '#45D483',
  resourceGenerate: '#84CC16',
  tutorExplain: '#F0B24A',
  tutorDialogue: '#FB923C',
  evalQuiz: '#F0586E',
  evalCause: '#EC4899',
  feedbackWrite: '#3B82F6',
  reflection: '#6366F1',
  text: '#e8edf5',
  textSub: '#91a3c7',
  textDim: '#52607f',
  mono: "'JetBrains Mono', monospace",
  sans: "'Outfit', 'PingFang SC', sans-serif",
}

type AgentId = string

interface Agent {
  id: AgentId
  name: string
  role: string
  color: string
  artSrc: string
}

interface EventNode {
  id: string
  chain: string
  agent: AgentId
  t: number
  type: string
  label: string
  detail: string
}

interface Chain {
  id: string
  name: string
  summary: string
  issue: string
  outcome: string
  eventIds: string[]
}

function defaultAgents(): Agent[] {
  return [
    { id: 'profileCapture', name: '画像采集', role: 'PROFILE-1', color: T.profileCapture, artSrc: '/homepage/agent-load-profile.png' },
    { id: 'profileDiagnosis', name: '薄弱诊断', role: 'PROFILE-2', color: T.profileDiagnosis, artSrc: '/homepage/agent-load-profile.png' },
    { id: 'pathPlan', name: '路径规划', role: 'PATH-1', color: T.pathPlan, artSrc: '/homepage/agent-load-path.png' },
    { id: 'pathReplan', name: '动态重规划', role: 'PATH-2', color: T.pathReplan, artSrc: '/homepage/agent-load-path.png' },
    { id: 'resourceSearch', name: '资源检索', role: 'RESOURCE-1', color: T.resourceSearch, artSrc: '/homepage/agent-load-resource.png' },
    { id: 'resourceGenerate', name: '资源生成', role: 'RESOURCE-2', color: T.resourceGenerate, artSrc: '/homepage/agent-load-resource.png' },
    { id: 'tutorExplain', name: '讲解辅导', role: 'TUTOR-1', color: T.tutorExplain, artSrc: '/homepage/agent-load-tutor.png' },
    { id: 'tutorDialogue', name: '互动答疑', role: 'TUTOR-2', color: T.tutorDialogue, artSrc: '/homepage/agent-load-tutor.png' },
    { id: 'evalQuiz', name: '评估出题', role: 'EVAL-1', color: T.evalQuiz, artSrc: '/homepage/agent-load-eval.png' },
    { id: 'evalCause', name: '错因分析', role: 'EVAL-2', color: T.evalCause, artSrc: '/homepage/agent-load-eval.png' },
    { id: 'feedbackWrite', name: '反馈回写', role: 'FEEDBACK-1', color: T.feedbackWrite, artSrc: '/homepage/agent-load-feedback.png' },
    { id: 'reflection', name: '成长复盘', role: 'FEEDBACK-2', color: T.reflection, artSrc: '/homepage/agent-load-feedback.png' },
  ]
}

function defaultChains(): Chain[] {
  return [
    { id: 'profile-module', name: '画像诊断模块', summary: '采集真实学习信号，再识别薄弱知识域。', issue: '学习行为信号分散', outcome: '定位 2 个薄弱域', eventIds: ['e1', 'e2'] },
    { id: 'path-module', name: '路径编排模块', summary: '规划与重规划协同，把薄弱点落到学习顺序里。', issue: '当前路径无法补弱', outcome: '重排课后巩固路径', eventIds: ['e3', 'e4', 'e5'] },
    { id: 'resource-module', name: '资源生产模块', summary: '检索候选资源，再生成适配画像的学习材料。', issue: '资源太多且不够贴合', outcome: '生成 5 项个性资源', eventIds: ['e6', 'e7', 'e8'] },
    { id: 'tutor-module', name: '辅导互动模块', summary: '讲解和追问配合，确认学生是否真正理解。', issue: '概念理解不稳定', outcome: '完成两轮追问确认', eventIds: ['e9', 'e10', 'e11'] },
    { id: 'eval-module', name: '测评分析模块', summary: '即时测评后归因，产出可回写的证据。', issue: '学习效果需要量化', outcome: '阶段测评提升到 82 分', eventIds: ['e12', 'e13', 'e14'] },
    { id: 'feedback-module', name: '反馈复盘模块', summary: '回写画像、生成复盘，并触发下一轮路径修正。', issue: '结果需要沉淀为行动', outcome: '生成下一轮学习计划', eventIds: ['e15', 'e16', 'e17', 'e18'] },
  ]
}

function defaultEvents(): EventNode[] {
  return [
    { id: 'e1', chain: 'profile-module', agent: 'profileCapture', t: 9 * 60 + 12, type: 'PC', label: '采集学习信号', detail: '采集答题、停留时长、偏好和卡顿行为，更新 24 维画像。' },
    { id: 'e2', chain: 'profile-module', agent: 'profileDiagnosis', t: 9 * 60 + 14, type: 'DG', label: '识别指针薄弱', detail: '二级指针传参题正确率仅 41%，标记为薄弱知识域。' },
    { id: 'e3', chain: 'path-module', agent: 'pathPlan', t: 9 * 60 + 16, type: 'PL', label: '插入补弱节点', detail: '路径规划在课后巩固阶段插入二级指针专项训练。' },
    { id: 'e4', chain: 'path-module', agent: 'pathReplan', t: 9 * 60 + 21, type: 'RP', label: '动态重排路径', detail: '根据卡顿强度推迟进阶节点，前置偏导和梯度复习。' },
    { id: 'e5', chain: 'path-module', agent: 'resourceSearch', t: 9 * 60 + 27, type: 'RQ', label: '发起资源请求', detail: '向资源模块提交薄弱点、偏好和预期掌握度目标。' },
    { id: 'e6', chain: 'resource-module', agent: 'resourceSearch', t: 10 * 60 + 5, type: 'RS', label: '检索候选资源', detail: '命中 18 个候选材料，按难度、时长和偏好打分。' },
    { id: 'e7', chain: 'resource-module', agent: 'resourceGenerate', t: 10 * 60 + 12, type: 'GN', label: '生成个性资源', detail: '生成思维导图、专项练习和图解卡片共 5 项资源。' },
    { id: 'e8', chain: 'resource-module', agent: 'tutorExplain', t: 10 * 60 + 24, type: 'HF', label: '交给辅导模块', detail: '将资源包转换为可讲解的步骤、例题和追问线索。' },
    { id: 'e9', chain: 'tutor-module', agent: 'tutorExplain', t: 11 * 60 + 10, type: 'TX', label: '讲解核心概念', detail: '解释二级指针与数组指针的区别，并生成代码示例。' },
    { id: 'e10', chain: 'tutor-module', agent: 'tutorDialogue', t: 11 * 60 + 18, type: 'QA', label: '连续追问确认', detail: '根据学生回答生成下一轮追问，确认是否真正理解。' },
    { id: 'e11', chain: 'tutor-module', agent: 'evalQuiz', t: 11 * 60 + 36, type: 'EV', label: '请求即时测评', detail: '辅导结束后触发 2 道针对性诊断题。' },
    { id: 'e12', chain: 'eval-module', agent: 'evalQuiz', t: 14 * 60 + 20, type: 'QZ', label: '阶段测评 82 分', detail: '评估出题智能体验证指针补弱效果。' },
    { id: 'e13', chain: 'eval-module', agent: 'evalCause', t: 14 * 60 + 27, type: 'CA', label: '错因归类', detail: '将错题拆成概念遗漏、步骤跳跃和迁移困难三类原因。' },
    { id: 'e14', chain: 'eval-module', agent: 'feedbackWrite', t: 14 * 60 + 35, type: 'WB', label: '提交回写证据', detail: '把测评结论和错因标签交给反馈模块。' },
    { id: 'e15', chain: 'feedback-module', agent: 'feedbackWrite', t: 15 * 60 + 10, type: 'FB', label: '反向写入画像', detail: '将测评薄弱点反向传播至画像 24 维向量。' },
    { id: 'e16', chain: 'feedback-module', agent: 'reflection', t: 15 * 60 + 18, type: 'RF', label: '生成成长复盘', detail: '沉淀今日成就、风险和明日行动建议。' },
    { id: 'e17', chain: 'feedback-module', agent: 'pathReplan', t: 15 * 60 + 32, type: 'RP', label: '触发路径修正', detail: '明日聚焦 4 个反馈盲点，插入思维导图生成节点。' },
    { id: 'e18', chain: 'feedback-module', agent: 'profileCapture', t: 16 * 60 + 3, type: 'NU', label: '画像进入新轮次', detail: '连续学习 5 天，今日还差 14 分钟达标，准备下一轮协同。' },
  ]
}

interface ModuleCard {
  id: string
  chainId: string
  name: string
  agentNames: string[]
  color: string
  artSrc: string
  eventCount: number
}

function defaultModuleCards(): ModuleCard[] {
  return [
    { id: 'profile-module', chainId: 'profile-module', name: '画像诊断模块', agentNames: ['画像采集', '薄弱诊断'], color: T.profileCapture, artSrc: '/homepage/agent-load-profile.png', eventCount: 2 },
    { id: 'path-module', chainId: 'path-module', name: '路径编排模块', agentNames: ['路径规划', '动态重规划'], color: T.pathPlan, artSrc: '/homepage/agent-load-path.png', eventCount: 3 },
    { id: 'resource-module', chainId: 'resource-module', name: '资源生产模块', agentNames: ['资源检索', '资源生成'], color: T.resourceSearch, artSrc: '/homepage/agent-load-resource.png', eventCount: 3 },
    { id: 'tutor-module', chainId: 'tutor-module', name: '辅导互动模块', agentNames: ['讲解辅导', '互动答疑'], color: T.tutorExplain, artSrc: '/homepage/agent-load-tutor.png', eventCount: 3 },
    { id: 'eval-module', chainId: 'eval-module', name: '测评分析模块', agentNames: ['评估出题', '错因分析'], color: T.evalQuiz, artSrc: '/homepage/agent-load-eval.png', eventCount: 3 },
    { id: 'feedback-module', chainId: 'feedback-module', name: '反馈复盘模块', agentNames: ['反馈回写', '成长复盘'], color: T.feedbackWrite, artSrc: '/homepage/agent-load-feedback.png', eventCount: 4 },
  ]
}

const agents = ref<Agent[]>(defaultAgents())
const chains = ref<Chain[]>(defaultChains())
const events = ref<EventNode[]>(defaultEvents())
const moduleCards = ref<ModuleCard[]>(defaultModuleCards())

const availableDays = ref<AgentCollaborationDay[]>([])
const selectedDay = ref<string>('monday')
const isLoading = ref(false)
const loadError = ref<string | null>(null)

function getTodayDayName(): string {
  const jsDay = new Date().getDay()
  const index = (jsDay + 6) % 7
  const names = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return names[index]
}

function applyCollaborationPayload(data: AgentCollaborationResponse) {
  agents.value = data.agents as Agent[]
  chains.value = data.chains as Chain[]
  events.value = data.events as EventNode[]
  moduleCards.value = data.modules as ModuleCard[]
  selectedChainId.value = chains.value[0]?.id ?? ''
  selectedEventId.value = chains.value[0]?.eventIds[0] ?? null
  pulseIndex.value = 0
}

async function loadDay(day: string) {
  isLoading.value = true
  loadError.value = null
  try {
    const data = await fetchAgentCollaboration(day)
    applyCollaborationPayload(data)
  } catch (error) {
    console.error('Failed to load agent collaboration:', error)
    loadError.value = '数据加载失败，使用默认演示数据'
  } finally {
    isLoading.value = false
  }
}

async function initDays() {
  try {
    const days = await fetchAgentCollaborationDays()
    availableDays.value = days
  } catch (error) {
    console.error('Failed to load available days:', error)
    availableDays.value = [
      { name: 'monday', label: '周一', index: 0 },
      { name: 'tuesday', label: '周二', index: 1 },
      { name: 'wednesday', label: '周三', index: 2 },
      { name: 'thursday', label: '周四', index: 3 },
      { name: 'friday', label: '周五', index: 4 },
      { name: 'saturday', label: '周六', index: 5 },
      { name: 'sunday', label: '周日', index: 6 },
    ]
  }
}

function selectDay(day: string) {
  if (day === selectedDay.value || isLoading.value) return
  selectedDay.value = day
  loadDay(day)
}

onMounted(() => {
  selectedDay.value = getTodayDayName()
  initDays()
  loadDay(selectedDay.value)
})

const W = 1580
const H = 690
const LEFT = 168
const RIGHT = 64
const TOP = 52
const LANE_H = 48
const START = 9 * 60
const END = 18 * 60
const NOW = 16 * 60 + 12
const CHART_W = W - LEFT - RIGHT
const hours = Array.from({ length: 10 }, (_, i) => 9 + i)

const selectedChainId = ref<string>(chains.value[0]?.id ?? '')
const selectedEventId = ref<string | null>(chains.value[0]?.eventIds[0] ?? null)
const hoverEventId = ref<string | null>(null)
const hoverChainId = ref<string | null>(null)
const pulseIndex = ref(0)

const activeChainId = computed(() => hoverChainId.value ?? selectedChainId.value)
const activeChain = computed(() => chains.value.find(chain => chain.id === activeChainId.value) ?? chains.value[0])
const activeEvents = computed(() => activeChain.value?.eventIds.map(id => eventById(id)).filter(Boolean) as EventNode[] ?? [])
const allLinks = computed(() => chains.value.flatMap(chainLinks))
const selectedEvent = computed(() => (
  hoverEventId.value
    ? eventById(hoverEventId.value)
    : selectedEventId.value
      ? eventById(selectedEventId.value)
      : activeEvents.value[pulseIndex.value % activeEvents.value.length]
))
const activeEventIds = computed(() => new Set(activeChain.value?.eventIds ?? []))

function agentById(id: AgentId) {
  return agents.value.find(agent => agent.id === id) ?? agents.value[0]
}

function agentIndexLabel(index: number) {
  return String(index + 1).padStart(2, '0')
}

function eventById(id: string) {
  return events.value.find(event => event.id === id)
}

function xForTime(t: number) {
  return LEFT + ((t - START) / (END - START)) * CHART_W
}

function yForAgent(id: AgentId) {
  return TOP + agents.value.findIndex(agent => agent.id === id) * LANE_H + LANE_H / 2
}

function eventPoint(event: EventNode) {
  return { x: xForTime(event.t), y: yForAgent(event.agent) }
}

function linkPath(from: EventNode, to: EventNode) {
  const a = eventPoint(from)
  const b = eventPoint(to)
  const dx = Math.max(42, (b.x - a.x) * 0.42)
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`
}

function chainLinks(chain: Chain) {
  return chain.eventIds.slice(0, -1).map((id, index) => {
    const from = eventById(id)
    const to = eventById(chain.eventIds[index + 1])
    return from && to ? { from, to, chainId: chain.id, index } : null
  }).filter(Boolean) as Array<{ from: EventNode; to: EventNode; chainId: string; index: number }>
}

function timeLabel(t: number) {
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

function nodeOrder(event: EventNode) {
  const index = activeChain.value?.eventIds.indexOf(event.id) ?? -1
  return index >= 0 ? index : 0
}

function selectChain(id: string) {
  selectedChainId.value = id
  const chain = chains.value.find(item => item.id === id)
  selectedEventId.value = chain?.eventIds[0] ?? null
  hoverChainId.value = null
  hoverEventId.value = null
  pulseIndex.value = 0
}

function selectNode(event: EventNode) {
  selectedChainId.value = event.chain
  selectedEventId.value = event.id
  hoverChainId.value = null
  hoverEventId.value = null
  const chain = chains.value.find(item => item.id === event.chain)
  pulseIndex.value = Math.max(0, chain?.eventIds.indexOf(event.id) ?? 0)
}

let timer: ReturnType<typeof window.setInterval> | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    if (hoverEventId.value) return
    pulseIndex.value = (pulseIndex.value + 1) % activeChain.value.eventIds.length
  }, 1550)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="section-telemetry">
    <div class="telemetry-inner">
      <header class="tele-hero">
        <div class="tele-hero-main">
          <div class="tele-eyebrow">
            <span />
            MULTI-AGENT CAUSAL TELEMETRY
          </div>
          <h2>
            12 个智能体在 6 个模块内协同了 <strong>{{ events.length }}</strong> 次干预，串成
            <strong>{{ chains.length }}</strong> 条模块链
          </h2>
          <p>因果接力是主角：谁先发现，谁立刻行动，谁再评估和回写。</p>
          <div v-if="loadError" class="day-load-error">{{ loadError }}</div>
        </div>

        <div class="tele-hero-controls">
          <div class="day-switcher" aria-label="星期切换">
            <button
              v-for="day in availableDays"
              :key="day.name"
              type="button"
              class="day-tab"
              :class="{ active: selectedDay === day.name, today: getTodayDayName() === day.name }"
              :disabled="isLoading"
              @click="selectDay(day.name)"
            >
              {{ day.label }}
            </button>
          </div>

          <div class="chain-tabs" aria-label="干预链选择">
            <button
              v-for="chain in chains"
              :key="chain.id"
              type="button"
              class="chain-tab"
              :class="{ active: chain.id === activeChainId }"
              @click="selectChain(chain.id)"
            >
              <span>{{ chain.name }}</span>
              <strong>{{ chain.eventIds.length }}</strong>
            </button>
          </div>
        </div>
      </header>

      <div class="telemetry-board">
        <div class="timeline-shell">
          <svg :viewBox="`0 0 ${W} ${H}`" class="timeline-svg" role="img" aria-label="多智能体因果接力时间线">
            <defs>
              <filter id="chain-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient
                v-for="link in allLinks"
                :id="`grad-${link.from.id}-${link.to.id}`"
                :key="`grad-${link.from.id}-${link.to.id}`"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" :stop-color="agentById(link.from.agent).color" />
                <stop offset="100%" :stop-color="agentById(link.to.agent).color" />
              </linearGradient>
              <linearGradient id="now-band" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(240,178,74,0)" />
                <stop offset="50%" stop-color="rgba(240,178,74,0.20)" />
                <stop offset="100%" stop-color="rgba(240,178,74,0)" />
              </linearGradient>
            </defs>

            <g class="time-grid">
              <g v-for="hour in hours" :key="hour">
                <line :x1="xForTime(hour * 60)" y1="42" :x2="xForTime(hour * 60)" :y2="H - 46" />
                <text :x="xForTime(hour * 60)" y="30" text-anchor="middle">{{ String(hour).padStart(2, '0') }}:00</text>
              </g>
            </g>

            <g class="agent-lanes">
              <g v-for="agent in agents" :key="agent.id">
                <line :x1="LEFT" :y1="yForAgent(agent.id)" :x2="W - RIGHT" :y2="yForAgent(agent.id)" :stroke="agent.color" />
                <text class="agent-index" x="24" :y="yForAgent(agent.id) + 4" :fill="agent.color">
                  {{ agentIndexLabel(agents.indexOf(agent)) }}
                </text>
                <text class="agent-name" x="72" :y="yForAgent(agent.id) - 4">{{ agent.name }}</text>
                <text class="agent-role" x="72" :y="yForAgent(agent.id) + 15" :fill="agent.color">{{ agent.role }}</text>
              </g>
            </g>

            <g class="now-layer">
              <rect :x="xForTime(NOW) - 24" y="40" width="48" :height="H - 86" fill="url(#now-band)" />
              <line :x1="xForTime(NOW)" y1="38" :x2="xForTime(NOW)" :y2="H - 44" />
              <text :x="xForTime(NOW)" :y="H - 22" text-anchor="middle">NOW</text>
            </g>

            <g class="chain-links">
              <path
                v-for="link in allLinks"
                :key="`${link.from.id}-${link.to.id}`"
                :d="linkPath(link.from, link.to)"
                :stroke="`url(#grad-${link.from.id}-${link.to.id})`"
                :class="{ active: link.chainId === activeChainId }"
                :style="`--delay: ${link.index * 160}ms`"
              />
            </g>

            <g class="event-nodes">
              <g
                v-for="event in events"
                :key="event.id"
                class="event-node"
                :class="{
                  active: activeEventIds.has(event.id),
                  pulse: selectedEvent?.id === event.id,
                  dimmed: !activeEventIds.has(event.id),
                }"
                :style="`--node-color: ${agentById(event.agent).color}; --order: ${nodeOrder(event)}`"
                :transform="`translate(${eventPoint(event).x}, ${eventPoint(event).y})`"
                @mouseenter="hoverEventId = event.id; hoverChainId = event.chain"
                @mouseleave="hoverEventId = null; hoverChainId = null"
                @click.stop="selectNode(event)"
              >
                <circle class="node-hit" r="18" />
                <circle class="node-core" r="11" />
                <circle class="node-inner" r="6" />
                <text y="4" text-anchor="middle">{{ event.type }}</text>
              </g>
            </g>
          </svg>

          <div class="causal-footer" :style="`--footer-color: ${agentById(selectedEvent?.agent || 'profileCapture').color}`">
            <div class="footer-story">
              <span>MODULE OVERVIEW</span>
              <strong>模块协作概览</strong>
              <p>六大业务模块的接力情况，点击卡片可聚焦到对应干预链。</p>
            </div>

            <div class="module-grid" aria-label="模块协作概览">
              <button
                v-for="mod in moduleCards"
                :key="mod.id"
                type="button"
                class="module-card"
                :class="{ active: activeChainId === mod.chainId }"
                :style="`--module-color: ${mod.color}; --load: ${events.length ? (mod.eventCount / events.length) * 100 : 0}%`"
                @click="selectChain(mod.chainId)"
              >
                <div class="module-card-top">
                  <span class="module-card-dot" />
                  <strong>{{ mod.name }}</strong>
                  <span class="module-card-count">{{ mod.eventCount }}</span>
                </div>
                <div class="module-card-agents">
                  <span v-for="(agentName, idx) in mod.agentNames" :key="idx">{{ agentName }}</span>
                </div>
                <div class="module-card-bar">
                  <i />
                </div>
              </button>
            </div>
          </div>
        </div>

        <aside class="chain-detail" :style="`--detail-color: ${agentById(selectedEvent?.agent || 'profileCapture').color}`">
          <div class="detail-kicker">SELECTED CHAIN</div>
          <h3>{{ activeChain.name }}</h3>
          <p>{{ activeChain.summary }}</p>

          <div class="detail-metrics">
            <div>
              <span>ISSUE</span>
              <strong>{{ activeChain.issue }}</strong>
            </div>
            <div>
              <span>OUTCOME</span>
              <strong>{{ activeChain.outcome }}</strong>
            </div>
          </div>

          <div v-if="selectedEvent" class="detail-event">
            <div class="detail-time">{{ timeLabel(selectedEvent.t) }}</div>
            <div>
              <span :style="`color: ${agentById(selectedEvent.agent).color}`">
                {{ agentById(selectedEvent.agent).role }}
              </span>
              <strong>{{ selectedEvent.label }}</strong>
              <small>{{ selectedEvent.detail }}</small>
            </div>
          </div>

          <ol class="handoff-list">
            <li
              v-for="(event, index) in activeEvents"
              :key="event.id"
              :class="{ current: selectedEvent?.id === event.id }"
              :style="`--item-color: ${agentById(event.agent).color}`"
            >
              <span>{{ index + 1 }}</span>
              <div>
                <strong>{{ agentById(event.agent).name }}</strong>
                <small>{{ event.label }}</small>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-telemetry {
  position: relative;
  padding: 64px 40px 44px;
}

.telemetry-inner {
  max-width: 1760px;
  margin: 0 auto;
}

.tele-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.36fr);
  gap: 28px;
  align-items: start;
  margin-bottom: 20px;
}

.tele-hero-main {
  display: grid;
  gap: 10px;
}

.tele-hero-controls {
  display: grid;
  gap: 16px;
  align-content: start;
  justify-items: end;
}

.tele-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.22em;
}

.tele-eyebrow span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #35e0d8;
  animation: soft-pulse 1.5s ease-in-out infinite;
}

.tele-hero h2 {
  margin: 10px 0 0;
  max-width: 980px;
  color: #f7fbff;
  font-family: var(--font-display, 'Outfit', 'PingFang SC', sans-serif);
  font-size: clamp(30px, 3vw, 48px);
  line-height: 1.08;
  font-weight: 750;
  letter-spacing: 0;
}

.tele-hero h2 strong {
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-weight: 800;
}

.tele-hero p {
  max-width: 680px;
  margin: 12px 0 0;
  color: #91a3c7;
  font-size: 14px;
  line-height: 1.7;
}

.day-load-error {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(240, 88, 110, 0.12);
  color: #f0586e;
  font-size: 12px;
}

.day-switcher {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  padding: 6px;
  border: 1px solid rgba(150, 175, 220, 0.14);
  border-radius: 14px;
  background: rgba(8, 12, 30, 0.42);
  backdrop-filter: blur(14px) saturate(1.18);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.05);
}

.day-tab {
  appearance: none;
  cursor: pointer;
  min-width: 46px;
  padding: 7px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #9badcc;
  font-size: 13px;
  font-weight: 600;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
}

.day-tab:hover {
  transform: translateY(-1px);
  border-color: rgba(150, 175, 220, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: #e8edf5;
}

.day-tab.active {
  border-color: rgba(53, 224, 216, 0.55);
  background: linear-gradient(135deg, rgba(53, 224, 216, 0.18), rgba(53, 224, 216, 0.06));
  color: #f7fbff;
  box-shadow: 0 4px 12px rgba(53, 224, 216, 0.14);
}

.day-tab.today {
  color: #35e0d8;
}

.day-tab.today::after {
  content: '·';
  display: inline-block;
  margin-left: 3px;
  color: #35e0d8;
  font-weight: 800;
}

.day-tab.today.active::after {
  color: #f7fbff;
}

.day-tab:disabled {
  opacity: 0.5;
  cursor: wait;
}

.chain-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.chain-tab {
  appearance: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  min-height: 56px;
  padding: 10px 12px;
  border: 1px solid rgba(150, 175, 220, 0.12);
  border-radius: 10px;
  background: rgba(8, 12, 30, 0.22);
  color: #e8edf5;
  text-align: left;
  backdrop-filter: blur(10px) saturate(1.12);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease, background 0.22s ease;
}

.chain-tab:hover,
.chain-tab.active {
  transform: translateY(-2px);
  border-color: rgba(53, 224, 216, 0.38);
  background: linear-gradient(135deg, rgba(53, 224, 216, 0.10), rgba(8, 12, 30, 0.24));
}

.chain-tab:active {
  transform: scale(0.985);
}

.chain-tab span {
  overflow: hidden;
  color: #dbe8ff;
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chain-tab strong {
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 20px;
  line-height: 1;
}

.telemetry-board {
  position: relative;
  z-index: 45;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  align-items: stretch;
}

.timeline-shell,
.chain-detail {
  border: 1px solid rgba(150, 175, 220, 0.10);
  border-radius: 18px;
  background:
    radial-gradient(ellipse at 22% 8%, rgba(53, 224, 216, 0.06), transparent 42%),
    linear-gradient(180deg, rgba(8, 12, 30, 0.13), rgba(5, 7, 18, 0.05));
  backdrop-filter: blur(4px) saturate(1.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.045);
}

.timeline-shell {
  position: relative;
  overflow: auto;
  min-height: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
}

.timeline-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.035) 46%, transparent 58%);
  animation: board-scan 6.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.timeline-svg {
  display: block;
  width: 100%;
  min-width: 1080px;
  height: auto;
  flex: 0 0 auto;
}

.causal-footer {
  --footer-color: #35e0d8;
  display: grid;
  grid-template-columns: minmax(240px, 0.24fr) minmax(0, 1fr);
  gap: 16px;
  flex: 1 1 auto;
  min-height: 250px;
  margin: 12px 18px 18px;
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--footer-color) 26%, rgba(150,175,220,0.12));
  border-radius: 14px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--footer-color) 10%, transparent), transparent),
    rgba(4, 8, 18, 0.20);
  backdrop-filter: blur(5px) saturate(1.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}

.footer-story {
  display: grid;
  gap: 8px;
  align-content: start;
  padding-right: 14px;
  border-right: 1px solid rgba(255,255,255,0.08);
}

.footer-story span {
  color: #7f93ba;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.footer-story strong {
  color: #f7fbff;
  font-size: 20px;
  font-weight: 750;
}

.footer-story p {
  margin: 0;
  color: #91a3c7;
  font-size: 12px;
  line-height: 1.55;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-content: start;
}

.module-card {
  --module-color: #35e0d8;
  --load: 0%;
  appearance: none;
  cursor: pointer;
  display: grid;
  gap: 10px;
  position: relative;
  overflow: hidden;
  padding: 14px;
  border: 1px solid rgba(150, 175, 220, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  text-align: left;
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;
}

.module-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--module-color);
  opacity: 0.55;
  transition: opacity 0.22s ease;
}

.module-card:hover,
.module-card.active {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--module-color) 36%, rgba(150, 175, 220, 0.14));
  background: rgba(255, 255, 255, 0.045);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}

.module-card:hover::before,
.module-card.active::before {
  opacity: 0.9;
}

.module-card:active {
  transform: scale(0.985);
}

.module-card-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.module-card-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--module-color);
  opacity: 0.75;
}

.module-card-top strong {
  flex: 1;
  min-width: 0;
  color: #f1f6ff;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.module-card-count {
  color: var(--module-color);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
}

.module-card-agents {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.module-card-agents span {
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(150, 175, 220, 0.08);
  color: #9badcc;
  font-size: 11px;
  font-weight: 500;
}

.module-card-bar {
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: rgba(150, 175, 220, 0.10);
  overflow: hidden;
}

.module-card-bar i {
  display: block;
  width: var(--load);
  height: 100%;
  border-radius: 2px;
  background: var(--module-color);
  opacity: 0.7;
  transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.time-grid line {
  stroke: rgba(255,255,255,0.055);
  stroke-dasharray: 2 6;
}

.time-grid text,
.now-layer text {
  fill: #52607f;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.agent-lanes line {
  stroke-opacity: 0.16;
}

.agent-index,
.agent-role {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.agent-name {
  fill: #f1f6ff;
  font-family: var(--font-display, 'Outfit', 'PingFang SC', sans-serif);
  font-size: 14px;
  font-weight: 650;
}

.now-layer line {
  stroke: #f0b24a;
  stroke-width: 1.4;
  stroke-dasharray: 4 6;
  animation: now-flow 1.4s linear infinite;
}

.chain-links path {
  fill: none;
  stroke-width: 1.4;
  stroke-opacity: 0.16;
  stroke-dasharray: 4 10;
  transition: stroke-opacity 0.22s ease, stroke-width 0.22s ease;
}

.chain-links path.active {
  filter: url(#chain-glow);
  stroke-width: 2.6;
  stroke-opacity: 0.92;
  stroke-dasharray: 9 13;
  animation: chain-flow 1.5s linear infinite;
  animation-delay: var(--delay);
}

.event-node {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.22s ease;
}

.event-node.dimmed {
  opacity: 0.22;
}

.node-hit {
  fill: transparent;
}

.node-core {
  fill: rgba(6, 9, 22, 0.92);
  stroke: var(--node-color);
  stroke-width: 1.6;
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--node-color) 42%, transparent));
}

.node-inner {
  fill: var(--node-color);
  opacity: 0.36;
}

.event-node text {
  fill: #f7fbff;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 7px;
  font-weight: 800;
  pointer-events: none;
}

.event-node.active .node-inner {
  animation: ordered-pulse 2.2s ease-in-out infinite;
  animation-delay: calc(var(--order) * 120ms);
}

.event-node.pulse .node-core {
  stroke-width: 2.4;
  animation: node-breathe 1.1s ease-in-out infinite;
}

.chain-detail {
  --detail-color: #35e0d8;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 18px;
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--detail-color) 10%, transparent), transparent 42%),
    rgba(8, 12, 30, 0.14);
}

.detail-kicker,
.detail-metrics span,
.detail-event span {
  color: #7f93ba;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.18em;
}

.chain-detail h3 {
  margin: 8px 0 0;
  color: #f7fbff;
  font-size: 22px;
  font-weight: 750;
}

.chain-detail p {
  margin: 10px 0 18px;
  color: #9badcc;
  font-size: 13px;
  line-height: 1.65;
}

.detail-metrics {
  display: grid;
  gap: 10px;
  padding: 14px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.detail-metrics div {
  display: grid;
  gap: 5px;
}

.detail-metrics strong {
  color: #e8edf5;
  font-size: 13px;
  font-weight: 650;
}

.detail-event {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 12px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--detail-color) 34%, rgba(255,255,255,0.08));
  border-radius: 14px;
  background: color-mix(in srgb, var(--detail-color) 8%, rgba(255,255,255,0.035));
}

.detail-time {
  color: var(--detail-color);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  font-weight: 700;
}

.detail-event div:last-child {
  display: grid;
  gap: 6px;
}

.detail-event strong {
  color: #f7fbff;
  font-size: 15px;
}

.detail-event small {
  color: #9badcc;
  font-size: 12px;
  line-height: 1.55;
}

.handoff-list {
  display: grid;
  gap: 8px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.handoff-list li {
  --item-color: #35e0d8;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  padding: 8px 9px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px;
  background: rgba(255,255,255,0.03);
  opacity: 0.68;
}

.handoff-list li.current {
  border-color: color-mix(in srgb, var(--item-color) 45%, transparent);
  opacity: 1;
}

.handoff-list li > span {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: var(--item-color);
  border: 1px solid color-mix(in srgb, var(--item-color) 42%, transparent);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
}

.handoff-list strong {
  color: #e8edf5;
  font-size: 12px;
}

.handoff-list small {
  display: block;
  margin-top: 3px;
  color: #8497bd;
  font-size: 11px;
  line-height: 1.45;
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.78); }
}

@keyframes chain-flow {
  to { stroke-dashoffset: -44; }
}

@keyframes now-flow {
  to { stroke-dashoffset: -20; }
}

@keyframes board-scan {
  0%, 20% { transform: translateX(-120%); opacity: 0; }
  38% { opacity: 0.7; }
  62%, 100% { transform: translateX(120%); opacity: 0; }
}

@keyframes ordered-pulse {
  0%, 100% { opacity: 0.32; }
  45% { opacity: 0.82; }
}

@keyframes node-breathe {
  0%, 100% { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--node-color) 36%, transparent)); }
  50% { filter: drop-shadow(0 0 18px color-mix(in srgb, var(--node-color) 72%, transparent)); }
}

@media (prefers-reduced-motion: reduce) {
  .tele-eyebrow span,
  .timeline-shell::after,
  .now-layer line,
  .chain-links path.active,
  .event-node.active .node-inner,
  .event-node.pulse .node-core {
    animation: none !important;
  }
}

@media (max-width: 1100px) {
  .tele-hero {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tele-hero-controls {
    justify-items: stretch;
  }

  .day-switcher {
    justify-content: flex-start;
  }

  .telemetry-board {
    grid-template-columns: 1fr;
  }

  .chain-detail {
    min-height: auto;
  }

  .causal-footer {
    grid-template-columns: 1fr;
  }

  .footer-story {
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 12px;
  }

  .module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .section-telemetry {
    padding: 54px 16px 38px;
  }

  .chain-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .module-grid {
    grid-template-columns: 1fr;
  }

  .tele-hero h2 {
    font-size: 28px;
  }

  .day-switcher {
    gap: 4px;
    padding: 4px;
  }

  .day-tab {
    min-width: 38px;
    padding: 6px 9px;
    font-size: 12px;
  }
}
</style>
