<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const T = {
  profile: '#8F7CFF',
  path: '#35E0D8',
  resource: '#45D483',
  tutor: '#F0B24A',
  eval: '#F0586E',
  feedback: '#3B82F6',
  text: '#e8edf5',
  textSub: '#91a3c7',
  textDim: '#52607f',
  mono: "'JetBrains Mono', monospace",
  sans: "'Outfit', 'PingFang SC', sans-serif",
}

type AgentId = 'profile' | 'path' | 'resource' | 'tutor' | 'eval' | 'feedback'

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

const agents: Agent[] = [
  { id: 'profile', name: '画像', role: 'PROFILE', color: T.profile, artSrc: '/homepage/agent-load-profile.png' },
  { id: 'path', name: '路径规划', role: 'PATH', color: T.path, artSrc: '/homepage/agent-load-path.png' },
  { id: 'resource', name: '资源推荐', role: 'RESOURCE', color: T.resource, artSrc: '/homepage/agent-load-resource.png' },
  { id: 'tutor', name: 'AI 辅导', role: 'TUTOR', color: T.tutor, artSrc: '/homepage/agent-load-tutor.png' },
  { id: 'eval', name: '评估', role: 'EVAL', color: T.eval, artSrc: '/homepage/agent-load-eval.png' },
  { id: 'feedback', name: '反馈', role: 'FEEDBACK', color: T.feedback, artSrc: '/homepage/agent-load-feedback.png' },
]

const events: EventNode[] = [
  { id: 'e1', chain: 'pointer', agent: 'profile', t: 9 * 60 + 14, type: 'ID', label: '识别指针薄弱', detail: '二级指针传参题正确率仅 41%，画像智能体标记薄弱维度。' },
  { id: 'e2', chain: 'pointer', agent: 'path', t: 9 * 60 + 16, type: 'PL', label: '插入补弱节点', detail: '路径规划在课后巩固阶段插入二级指针专项训练。' },
  { id: 'e3', chain: 'pointer', agent: 'resource', t: 9 * 60 + 17, type: 'RS', label: '匹配 5 个资源', detail: '资源智能体匹配思维导图、专项练习和图解卡片。' },
  { id: 'e4', chain: 'pointer', agent: 'tutor', t: 10 * 60 + 2, type: 'QA', label: '回答指针提问', detail: 'AI 辅导解释二级指针与数组指针的区别。' },
  { id: 'e5', chain: 'pointer', agent: 'eval', t: 10 * 60 + 31, type: 'EV', label: '晨间小测 82 分', detail: '评估智能体验证指针补弱效果，进入画像回写。' },

  { id: 'e6', chain: 'feedback-loop', agent: 'profile', t: 11 * 60 + 5, type: 'ID', label: '画像维度更新', detail: '指针与内存 42%，图结构与搜索 38%，标记为薄弱。' },
  { id: 'e7', chain: 'feedback-loop', agent: 'feedback', t: 11 * 60 + 6, type: 'FB', label: '反向写入画像', detail: '反馈智能体将测评薄弱点反向传播至画像 24 维向量。' },
  { id: 'e8', chain: 'feedback-loop', agent: 'path', t: 13 * 60 + 42, type: 'PL', label: '下午路径重排', detail: '基于反馈插入 BFS 专项与释放后悬空引用练习。' },
  { id: 'e9', chain: 'feedback-loop', agent: 'resource', t: 14 * 60 + 18, type: 'RS', label: '推送视频资源', detail: '推荐图遍历动画视频和 BFS/DFS 对比图解。' },

  { id: 'e10', chain: 'graph', agent: 'tutor', t: 14 * 60 + 56, type: 'QA', label: '回答图遍历 2 问', detail: '解释 BFS visited 数组作用与 DFS 递归栈溢出。' },
  { id: 'e11', chain: 'graph', agent: 'eval', t: 15 * 60 + 30, type: 'EV', label: '阶段测评 76 分', detail: '发现二级指针、BFS visited、悬空引用、队列空判 4 个盲点。' },
  { id: 'e12', chain: 'graph', agent: 'feedback', t: 15 * 60 + 31, type: 'FB', label: '触发路径修正', detail: '将 4 个盲点写入画像，触发 3 天学习序列重排。' },
  { id: 'e13', chain: 'graph', agent: 'path', t: 15 * 60 + 32, type: 'PL', label: '重排学习序列', detail: '明日聚焦 4 个反馈盲点，插入思维导图生成节点。' },
  { id: 'e14', chain: 'graph', agent: 'tutor', t: 16 * 60 + 3, type: 'NU', label: '主动提醒', detail: '连续学习 5 天，今日还差 14 分钟达标，推荐图结构思维导图。' },
]

const chains: Chain[] = [
  {
    id: 'pointer',
    name: '指针补弱链',
    summary: '画像发现薄弱，路径与资源立刻接力补救。',
    issue: '二级指针传参卡顿',
    outcome: '晨间小测提升到 82 分',
    eventIds: ['e1', 'e2', 'e3', 'e4', 'e5'],
  },
  {
    id: 'feedback-loop',
    name: '画像回写链',
    summary: '评估结果回流画像，再触发下午学习路径重排。',
    issue: '画像维度需要刷新',
    outcome: '下午补弱路径已重排',
    eventIds: ['e6', 'e7', 'e8', 'e9'],
  },
  {
    id: 'graph',
    name: '图结构干预链',
    summary: '辅导、评估、反馈、路径再次接力，形成下一轮计划。',
    issue: '图遍历与队列空判盲点',
    outcome: '生成 3 天补弱序列',
    eventIds: ['e10', 'e11', 'e12', 'e13', 'e14'],
  },
]

const W = 1580
const H = 430
const LEFT = 168
const RIGHT = 64
const TOP = 52
const LANE_H = 52
const START = 9 * 60
const END = 18 * 60
const NOW = 16 * 60 + 12
const CHART_W = W - LEFT - RIGHT
const hours = Array.from({ length: 10 }, (_, i) => 9 + i)

const selectedChainId = ref(chains[0].id)
const selectedEventId = ref<string | null>(chains[0].eventIds[0])
const hoverEventId = ref<string | null>(null)
const hoverChainId = ref<string | null>(null)
const pulseIndex = ref(0)

const activeChainId = computed(() => hoverChainId.value ?? selectedChainId.value)
const activeChain = computed(() => chains.find(chain => chain.id === activeChainId.value) ?? chains[0])
const activeEvents = computed(() => activeChain.value.eventIds.map(id => eventById(id)).filter(Boolean) as EventNode[])
const allLinks = computed(() => chains.flatMap(chainLinks))
const selectedEvent = computed(() => (
  hoverEventId.value
    ? eventById(hoverEventId.value)
    : selectedEventId.value
      ? eventById(selectedEventId.value)
      : activeEvents.value[pulseIndex.value % activeEvents.value.length]
))
const activeEventIds = computed(() => new Set(activeChain.value.eventIds))

function agentById(id: AgentId) {
  return agents.find(agent => agent.id === id) ?? agents[0]
}

function eventById(id: string) {
  return events.find(event => event.id === id)
}

function xForTime(t: number) {
  return LEFT + ((t - START) / (END - START)) * CHART_W
}

function yForAgent(id: AgentId) {
  return TOP + agents.findIndex(agent => agent.id === id) * LANE_H + LANE_H / 2
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
  const index = activeChain.value.eventIds.indexOf(event.id)
  return index >= 0 ? index : 0
}

function selectChain(id: string) {
  selectedChainId.value = id
  const chain = chains.find(item => item.id === id)
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
  const chain = chains.find(item => item.id === event.chain)
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
        <div>
          <div class="tele-eyebrow">
            <span />
            MULTI-AGENT CAUSAL TELEMETRY
          </div>
          <h2>
            今天 6 个智能体协同了 <strong>{{ events.length }}</strong> 次干预，串成
            <strong>{{ chains.length }}</strong> 条干预链
          </h2>
          <p>因果接力是主角：谁先发现，谁立刻行动，谁再评估和回写。</p>
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
                  0{{ agents.indexOf(agent) + 1 }}
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

          <div class="causal-footer" :style="`--footer-color: ${agentById(selectedEvent?.agent || 'profile').color}`">
            <div class="footer-story">
              <span>AGENT LOAD MAP</span>
              <strong>今日接力负载</strong>
              <p>底部不重复右侧详情，而是显示 6 个智能体在 3 条链里的参与强度。</p>
            </div>

            <div class="footer-steps" aria-label="智能体今日参与强度">
              <button
                v-for="agent in agents"
                :key="agent.id"
                type="button"
                class="footer-step"
                :class="{ active: selectedEvent?.agent === agent.id }"
                :style="`--step-color: ${agent.color}; --load: ${(events.filter(event => event.agent === agent.id).length / events.length) * 100}%`"
                @click="selectNode(events.find(event => event.agent === agent.id && activeEventIds.has(event.id)) || events.find(event => event.agent === agent.id) || activeEvents[0])"
              >
                <img class="footer-step-art" :src="agent.artSrc" alt="" aria-hidden="true">
                <span>{{ agent.role }}</span>
                <strong>{{ agent.name }}</strong>
                <small>{{ events.filter(event => event.agent === agent.id).length }} 次参与</small>
              </button>
            </div>
          </div>
        </div>

        <aside class="chain-detail" :style="`--detail-color: ${agentById(selectedEvent?.agent || 'profile').color}`">
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
  grid-template-columns: minmax(0, 1fr) minmax(380px, 0.42fr);
  gap: 26px;
  align-items: end;
  margin-bottom: 20px;
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

.chain-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.chain-tab {
  appearance: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  min-height: 62px;
  padding: 12px 13px;
  border: 1px solid rgba(150, 175, 220, 0.14);
  border-radius: 12px;
  background: rgba(8, 12, 30, 0.24);
  color: #e8edf5;
  text-align: left;
  backdrop-filter: blur(12px) saturate(1.16);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease, background 0.22s ease;
}

.chain-tab:hover,
.chain-tab.active {
  transform: translateY(-2px);
  border-color: rgba(53, 224, 216, 0.42);
  background: linear-gradient(135deg, rgba(53, 224, 216, 0.11), rgba(8, 12, 30, 0.26));
}

.chain-tab:active {
  transform: scale(0.985);
}

.chain-tab span {
  overflow: hidden;
  color: #dbe8ff;
  font-size: 13px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chain-tab strong {
  color: #35e0d8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 26px;
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

.footer-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(92px, 1fr);
  gap: 10px;
}

.footer-step {
  --step-color: #35e0d8;
  --load: 20%;
  appearance: none;
  cursor: pointer;
  min-width: 0;
  display: grid;
  gap: 4px;
  position: relative;
  overflow: hidden;
  align-content: space-between;
  padding: 13px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px;
  background: rgba(255,255,255,0.03);
  text-align: left;
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.22s ease,
    background 0.22s ease;
}

.footer-step::before {
  content: '';
  position: absolute;
  left: 0;
  right: auto;
  bottom: 0;
  width: var(--load);
  height: 4px;
  background: var(--step-color);
  opacity: 0.75;
}

.footer-step::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--step-color) 12%, transparent), transparent 64%),
    linear-gradient(180deg, transparent 0%, rgba(4, 8, 18, 0.22) 100%);
  opacity: 0.28;
  mix-blend-mode: screen;
  transition: opacity 0.22s ease;
  pointer-events: none;
}

.footer-step:hover,
.footer-step.active {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--step-color) 48%, transparent);
  background: color-mix(in srgb, var(--step-color) 9%, rgba(255,255,255,0.035));
}

.footer-step:hover::after,
.footer-step.active::after {
  opacity: 0.48;
}

.footer-step:active {
  transform: scale(0.98);
}

.footer-step-art {
  position: absolute;
  inset: -14% -18% -16% 18%;
  width: 102%;
  height: 132%;
  object-fit: cover;
  opacity: 0.34;
  mix-blend-mode: screen;
  filter: saturate(0.92) contrast(1.04);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.38) 22%, #000 64%, transparent 100%);
  pointer-events: none;
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-step:hover .footer-step-art,
.footer-step.active .footer-step-art {
  opacity: 0.52;
  transform: translateX(-3px) scale(1.02);
}

.footer-step span {
  position: relative;
  z-index: 1;
  color: var(--step-color);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.footer-step strong {
  position: relative;
  z-index: 1;
  overflow: hidden;
  color: #e8edf5;
  font-size: 15px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer-step small {
  position: relative;
  z-index: 1;
  overflow: hidden;
  color: #8497bd;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  .tele-hero,
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

  .footer-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .section-telemetry {
    padding: 54px 16px 38px;
  }

  .chain-tabs {
    grid-template-columns: 1fr;
  }

  .footer-steps {
    grid-template-columns: 1fr;
  }

  .tele-hero h2 {
    font-size: 28px;
  }
}
</style>
