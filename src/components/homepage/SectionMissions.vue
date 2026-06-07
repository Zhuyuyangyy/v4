<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const T = {
  cyan: '#00d4ff', purple: '#7c3aed', emerald: '#06d6a0',
  amber: '#f59e0b', rose: '#f43f5e',
  text: '#e8edf5', textSub: '#8892b0', textTri: '#4a5568',
  serif: "'Instrument Serif', 'Noto Serif SC', serif",
  sans: "'Outfit', 'PingFang SC', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

interface AgentInfo { id: string; color: string; role: string }
const agentMap: AgentInfo[] = [
  { id: 'profile', color: '#7c3aed', role: 'PROFILE' },
  { id: 'path', color: '#00d4ff', role: 'PATH' },
  { id: 'resource', color: '#06d6a0', role: 'RESOURCE' },
  { id: 'tutor', color: '#f59e0b', role: 'TUTOR' },
  { id: 'eval', color: '#f43f5e', role: 'EVAL' },
  { id: 'feedback', color: '#3b82f6', role: 'FEEDBACK' },
]

interface Mission {
  code: string; priority: string; priorityColor: string
  title: string; objective: string; duration: string
  agents: string[]
  outcome: { label: string; value: string; color: string }
  cta: string; state: 'ready' | 'scheduled' | 'optional'
}

const missions: Mission[] = [
  {
    code: 'TASK-A1', priority: 'P0', priorityColor: T.amber,
    title: '攻克指针与内存薄弱域', objective: '二级指针传参掌握度仅 42%，路径智能体已插入专项训练节点',
    duration: '35 min', agents: ['path', 'resource', 'tutor'],
    outcome: { label: '预期收益', value: '指针掌握度 42% → 65%', color: T.emerald },
    cta: '启动任务', state: 'ready',
  },
  {
    code: 'TASK-B2', priority: 'P0', priorityColor: T.rose,
    title: '补强 4 个评估盲点', objective: '阶段测评发现：二级指针 · BFS visited · 悬空引用 · 队列空判',
    duration: '20 min', agents: ['resource', 'tutor', 'eval', 'feedback'],
    outcome: { label: '预期收益', value: '4 个盲点全部点亮', color: T.rose },
    cta: '直接进入', state: 'ready',
  },
  {
    code: 'TASK-C3', priority: 'P1', priorityColor: T.cyan,
    title: '完成图结构思维导图', objective: '资源推荐智能体已为你生成图结构知识思维导图，覆盖 BFS/DFS/最短路径',
    duration: '25 min', agents: ['resource', 'profile'],
    outcome: { label: '预期收益', value: '图结构 38% → 55%', color: T.purple },
    cta: '查看资源', state: 'ready',
  },
  {
    code: 'TASK-D1', priority: 'P2', priorityColor: T.textSub,
    title: '触发本周阶段测评', objective: '让评估智能体重新校准画像 — 反馈智能体将结果写入 24 维向量',
    duration: '25 min', agents: ['eval', 'feedback', 'profile'],
    outcome: { label: '预期收益', value: '画像 24 维全部刷新', color: T.cyan },
    cta: '查看测评', state: 'scheduled',
  },
]

const stateLabel: Record<string, { text: string; color: string }> = {
  ready: { text: 'READY · 待启动', color: T.emerald },
  scheduled: { text: 'SCHEDULED · 已排期', color: T.amber },
  optional: { text: 'OPTIONAL · 可选', color: T.textSub },
}

const activeMissionIndex = ref(0)
const activeMission = computed(() => missions[activeMissionIndex.value] ?? missions[0])
const activeAgents = computed(() => activeMission.value.agents.map(getAgent).filter(Boolean) as AgentInfo[])

function getAgent(id: string) {
  return agentMap.find(a => a.id === id)
}

function runMission() {
  const mission = activeMission.value
  if (mission.agents.includes('resource')) {
    router.push('/edu-mind')
    return
  }
  if (mission.agents.includes('eval')) {
    router.push('/evaluation')
    return
  }
  router.push('/learning-path')
}
</script>

<template>
  <section class="section-missions">
    <div class="mis-inner">
      <!-- Header -->
      <div class="mis-header">
        <div>
          <div class="mis-eyebrow" :style="`color: ${T.amber}`">
            <span class="eyebrow-dot" :style="`background: ${T.amber}`" />
            MISSION CONSOLE · 任务台
          </div>
          <h2 class="mis-title">下一步执行哪个任务</h2>
          <p class="mis-desc">
            4 个任务都是系统按你当下画像和评估反馈生成的 — 不是固定模板。点 ▶ 启动后会调度对应智能体协作完成。
          </p>
        </div>
        <div class="mis-quota">
          <span class="mis-quota-label">本周配额</span>
          <div class="mis-quota-bars">
            <div v-for="i in 7" :key="i" class="mis-quota-bar"
              :class="{ 'mis-quota-bar-done': i <= 5 }" />
          </div>
          <span class="mis-quota-val">5 / 7 完成</span>
        </div>
      </div>

      <!-- Mission rail -->
      <div class="mission-rail-shell">
        <div class="mission-rail">
          <aside class="rail-list" aria-label="任务队列">
            <div class="rail-list-head">
              <span>EXECUTION QUEUE</span>
              <span>{{ String(missions.length).padStart(2, '0') }}</span>
            </div>

            <button
              v-for="(m, index) in missions"
              :key="m.code"
              class="rail-item"
              :class="{ active: activeMissionIndex === index }"
              :style="`--accent: ${m.priorityColor}; --state: ${stateLabel[m.state].color}`"
              type="button"
              @click="activeMissionIndex = index"
            >
              <span class="rail-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="rail-body">
                <span class="rail-meta">
                  <span>{{ m.priority }}</span>
                  <span>{{ m.code }}</span>
                </span>
                <span class="rail-title">{{ m.title }}</span>
              </span>
              <span class="rail-state">
                <span class="rail-state-dot" />
              </span>
            </button>
          </aside>

          <section class="command-panel"
            :style="`--accent: ${activeMission.priorityColor}; --state: ${stateLabel[activeMission.state].color}; --outcome: ${activeMission.outcome.color}`">
            <div class="command-panel-grid" aria-hidden="true" />
            <div class="command-top">
              <div>
                <div class="command-kicker">
                  <span class="command-priority-mark" />
                  {{ activeMission.priority }} · {{ activeMission.code }}
                </div>
                <h3 class="command-title">{{ activeMission.title }}</h3>
              </div>
              <div class="command-status">
                <span class="mis-state-dot mis-state-dot-pulse" />
                {{ stateLabel[activeMission.state].text }}
              </div>
            </div>

            <p class="command-objective">{{ activeMission.objective }}</p>

            <div class="command-metrics">
              <div class="command-metric">
                <span>预计时长</span>
                <strong>{{ activeMission.duration }}</strong>
              </div>
              <div class="command-metric command-metric-wide">
                <span>{{ activeMission.outcome.label }}</span>
                <strong>{{ activeMission.outcome.value }}</strong>
              </div>
            </div>

            <div class="agent-strip" aria-label="智能体调度链">
              <span v-for="(agent, index) in activeAgents" :key="agent.id" class="agent-node"
                :style="`--agent-color: ${agent.color}`">
                <span class="agent-node-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="agent-node-role">{{ agent.role }}</span>
              </span>
            </div>

            <button class="command-cta" type="button" @click="runMission">
              <span>{{ activeMission.cta }}</span>
              <span class="command-cta-icon" aria-hidden="true" />
            </button>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-missions {
  padding: 90px 56px 80px;
  position: relative;
}

.mis-inner {
  max-width: 1760px;
  margin: 0 auto;
}

.mis-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.mis-eyebrow {
  font-size: 10px;
  letter-spacing: 0.24em;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.eyebrow-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse-soft 1.5s ease-in-out infinite;
}

.mis-title {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-size: 40px;
  font-weight: 500;
  color: #e8edf5;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

.mis-desc {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: #8892b0;
  max-width: 560px;
}

.mis-quota {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(10, 12, 28, 0.7);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 10px 16px;
}

.mis-quota-label {
  font-size: 10px;
  color: #8892b0;
  letter-spacing: 0.16em;
  font-family: 'JetBrains Mono', monospace;
}

.mis-quota-bars {
  display: flex;
  gap: 3px;
}

.mis-quota-bar {
  width: 8px;
  height: 18px;
  border-radius: 2px;
  background: rgba(255,255,255,0.08);
}

.mis-quota-bar-done {
  background: #06d6a0;
  box-shadow: 0 0 5px #06d6a0;
}

.mis-quota-val {
  font-size: 11px;
  color: #e8edf5;
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

/* Mission rail */
.mission-rail-shell {
  padding: 1px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03) 44%, rgba(0,212,255,0.08)),
    rgba(255,255,255,0.02);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.11),
    0 28px 88px rgba(0,0,0,0.28);
}

.mission-rail {
  display: grid;
  grid-template-columns: minmax(300px, 0.82fr) minmax(0, 1.7fr);
  gap: 0;
  min-height: 460px;
  border-radius: 23px;
  overflow: hidden;
  background:
    radial-gradient(circle at 74% 16%, rgba(0,212,255,0.08), transparent 28%),
    linear-gradient(135deg, rgba(7, 10, 24, 0.98), rgba(4, 7, 18, 0.94));
}

.rail-list {
  position: relative;
  padding: 24px 18px;
  border-right: 1px solid rgba(255,255,255,0.07);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.035), transparent 42%),
    rgba(255,255,255,0.016);
}

.rail-list::before {
  content: '';
  position: absolute;
  left: 38px;
  top: 76px;
  bottom: 32px;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(136,146,176,0.22), transparent);
}

.rail-list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 4px;
  color: rgba(136,146,176,0.72);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
}

.rail-item {
  position: relative;
  width: 100%;
  min-height: 78px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: #e8edf5;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
  transition:
    transform 0.55s cubic-bezier(0.32, 0.72, 0, 1),
    background 0.55s cubic-bezier(0.32, 0.72, 0, 1),
    color 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.rail-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 24%, transparent), rgba(255,255,255,0.06)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.rail-item.active,
.rail-item:hover {
  background: color-mix(in srgb, var(--accent) 10%, rgba(255,255,255,0.025));
  transform: translateX(4px);
}

.rail-item.active::before {
  opacity: 1;
}

.rail-index {
  position: relative;
  z-index: 1;
  color: color-mix(in srgb, var(--accent) 72%, #e8edf5);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.rail-index::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--accent);
  box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 55%, transparent);
  transform: translateY(-50%) rotate(45deg);
}

.rail-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.rail-meta {
  display: flex;
  gap: 10px;
  color: rgba(136,146,176,0.66);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.18em;
}

.rail-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(232,237,245,0.88);
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.02em;
}

.rail-state {
  justify-self: end;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--state) 52%, rgba(255,255,255,0.1));
}

.rail-state-dot {
  display: block;
  width: 4px;
  height: 4px;
  margin: 1px;
  border-radius: 50%;
  background: var(--state);
}

.command-panel {
  position: relative;
  min-width: 0;
  padding: 38px 210px 38px 42px;
  overflow: hidden;
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%),
    linear-gradient(145deg, rgba(7, 10, 24, 0.82), rgba(4, 7, 18, 0.36));
}

.command-panel-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(90deg, transparent, #000 16%, #000 82%, transparent);
  opacity: 0.55;
}

.command-panel > *:not(.command-panel-grid) {
  position: relative;
  z-index: 1;
}

.command-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255,255,255,0.075);
}

.command-kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: color-mix(in srgb, var(--accent) 88%, #e8edf5);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.command-priority-mark {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--accent);
  transform: rotate(45deg);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent);
}

.command-title {
  margin: 16px 0 0;
  color: #e8edf5;
  font-family: 'Instrument Serif', serif;
  font-size: 46px;
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.02em;
}

.command-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--state);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  white-space: nowrap;
  padding-top: 4px;
}

.mis-state-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--state);
  box-shadow: 0 0 12px var(--state);
}

.mis-state-dot-pulse {
  animation: pulse-soft 1.5s ease-in-out infinite;
}

.command-objective {
  max-width: 760px;
  margin: 26px 0 0;
  color: rgba(181,190,216,0.78);
  font-size: 15px;
  line-height: 1.75;
}

.command-metrics {
  display: grid;
  grid-template-columns: minmax(150px, 0.38fr) minmax(0, 1fr);
  gap: 12px;
  margin-top: 28px;
}

.command-metric {
  min-height: 90px;
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.065);
  background: rgba(255,255,255,0.025);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.055);
}

.command-metric span {
  display: block;
  margin-bottom: 10px;
  color: rgba(136,146,176,0.72);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
}

.command-metric strong {
  color: #e8edf5;
  font-family: 'Instrument Serif', serif;
  font-size: 27px;
  font-weight: 500;
  line-height: 1;
}

.command-metric-wide strong {
  color: var(--outcome);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-size: 20px;
  font-weight: 750;
}

.agent-strip {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 30px;
  padding: 18px 0 6px;
}

.agent-node {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
  min-width: 116px;
  color: color-mix(in srgb, var(--agent-color) 88%, #e8edf5);
  font-family: 'JetBrains Mono', monospace;
}

.agent-node:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 74px;
  top: 8px;
  width: 74px;
  height: 1px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--agent-color) 42%, transparent), rgba(255,255,255,0.08));
}

.agent-node-index {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(232,237,245,0.46);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.agent-node-index::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--agent-color);
  transform: rotate(45deg);
  box-shadow: 0 0 14px color-mix(in srgb, var(--agent-color) 55%, transparent);
}

.agent-node-role {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.command-cta {
  margin-top: 38px;
  min-width: 240px;
  min-height: 54px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, rgba(255,255,255,0.08));
  background: color-mix(in srgb, var(--accent) 10%, rgba(255,255,255,0.035));
  color: #e8edf5;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 8px 8px 24px;
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  transition:
    transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    border-color 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    background 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.command-cta:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 48%, rgba(255,255,255,0.08));
  background: color-mix(in srgb, var(--accent) 16%, rgba(255,255,255,0.04));
}

.command-cta-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 38%, transparent);
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.command-cta-icon::before {
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #050916;
  transform: translateX(1px);
}

.command-cta:hover .command-cta-icon {
  transform: translateX(2px) scale(1.04);
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot, .mis-state-dot-pulse {
    animation: none !important;
  }
  .rail-item,
  .command-cta,
  .command-cta-icon {
    transition: none !important;
  }
}

@media (max-width: 900px) {
  .section-missions {
    padding: 60px 24px 60px;
  }
  .mis-title { font-size: 28px; }
  .mission-rail {
    grid-template-columns: 1fr;
  }
  .rail-list {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .command-panel {
    padding: 28px 24px;
  }
  .command-top,
  .command-metrics {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
  .command-title {
    font-size: 34px;
  }
  .agent-strip {
    flex-wrap: wrap;
    gap: 14px;
  }
  .agent-node:not(:last-child)::after {
    display: none;
  }
}
</style>
