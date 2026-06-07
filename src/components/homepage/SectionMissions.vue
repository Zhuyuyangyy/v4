<script setup lang="ts">
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

const quickQuestions = [
  '帮我制定 6 阶段完整学习计划（24 门课程）',
  '二级指针传参和数组指针有什么区别？',
  'BFS 中 visited 数组的作用是什么？',
  '机器学习中的过拟合怎么解决？',
]

const focusMap: Record<string, string> = {
  '启动任务': 'remedial',
  '直接进入': 'remedial',
  '查看资源': 'recommended',
  '查看测评': 'evaluation',
}

function getAgent(id: string) {
  return agentMap.find(a => a.id === id)
}

function goToResources(focus: string, extraQuery: Record<string, string> = {}) {
  router.push({
    name: 'edu-mind',
    query: {
      source: 'home',
      focus,
      ...extraQuery,
    },
  })
}

function onMissionCta(m: Mission) {
  const focus = focusMap[m.cta] || 'today'
  goToResources(focus, { mission: m.code })
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

      <!-- Mission cards -->
      <div class="mis-grid">
        <div v-for="m in missions" :key="m.code" class="mis-card"
          :style="`--accent: ${m.priorityColor}`">
          <div class="mis-card-top">
            <div class="mis-card-top-left">
              <span class="mis-priority" :style="`color: ${m.priorityColor}; background: ${m.priorityColor}18; border-color: ${m.priorityColor}55`">
                ◆ {{ m.priority }}
              </span>
              <span class="mis-code">{{ m.code }}</span>
            </div>
            <span class="mis-state" :style="`color: ${stateLabel[m.state].color}`">
              <span class="mis-state-dot"
                :class="{ 'mis-state-dot-pulse': m.state === 'ready' }"
                :style="`background: ${stateLabel[m.state].color}; box-shadow: 0 0 6px ${stateLabel[m.state].color}`" />
              {{ stateLabel[m.state].text }}
            </span>
          </div>

          <div class="mis-card-title">{{ m.title }}</div>
          <div class="mis-card-objective">{{ m.objective }}</div>

          <div class="mis-card-specs">
            <div>
              <div class="mis-spec-label">预计时长</div>
              <div class="mis-spec-val">{{ m.duration }}</div>
            </div>
            <div class="mis-spec-divider" />
            <div>
              <div class="mis-spec-label">调用智能体</div>
              <div class="mis-spec-agents">
                <span v-for="aid in m.agents" :key="aid" class="mis-agent-badge"
                  :style="`color: ${getAgent(aid)?.color}; background: ${getAgent(aid)?.color}14; border-color: ${getAgent(aid)?.color}33`">
                  <span class="mis-agent-dot" :style="`background: ${getAgent(aid)?.color}`" />
                  {{ getAgent(aid)?.role }}
                </span>
              </div>
            </div>
          </div>

          <div class="mis-outcome"
            :style="`background: ${m.outcome.color}10; border-color: ${m.outcome.color}33`">
            <div>
              <div class="mis-outcome-label">{{ m.outcome.label }}</div>
              <div class="mis-outcome-val" :style="`color: ${m.outcome.color}`">{{ m.outcome.value }}</div>
            </div>
            <span class="mis-outcome-arrow" :style="`color: ${m.outcome.color}`">↗</span>
          </div>

          <button class="mis-cta"
            :style="`background: linear-gradient(135deg, ${m.priorityColor}, ${m.priorityColor}CC)`"
            @click="onMissionCta(m)">
            ▶ {{ m.cta }}
          </button>
        </div>
      </div>

      <!-- Free dialogue -->
      <div class="mis-free">
        <div class="mis-free-left">
          <div class="mis-free-eyebrow" :style="`color: ${T.cyan}`">OR · 自由对话</div>
          <div class="mis-free-title">不想跟着任务走？直接问它一个问题</div>
        </div>
        <div class="mis-free-questions">
          <button v-for="q in quickQuestions" :key="q" class="mis-free-btn"
            @click="router.push('/chat')">
            {{ q }}
          </button>
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

/* Grid */
.mis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
}

.mis-card {
  position: relative;
  padding: 24px;
  background: rgba(10, 14, 32, 0.7);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  backdrop-filter: blur(14px);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 280px;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.mis-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 28px color-mix(in srgb, var(--accent) 20%, transparent);
}

.mis-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mis-card-top-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mis-priority {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 9.5px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.mis-code {
  font-size: 10px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.15em;
}

.mis-state {
  font-size: 9.5px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.14em;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.mis-state-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.mis-state-dot-pulse {
  animation: pulse-soft 1.5s ease-in-out infinite;
}

.mis-card-title {
  font-family: 'Instrument Serif', serif;
  font-size: 24px;
  line-height: 1.15;
  color: #e8edf5;
  letter-spacing: -0.01em;
}

.mis-card-objective {
  font-size: 12.5px;
  color: #8892b0;
  line-height: 1.5;
}

.mis-card-specs {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
}

.mis-spec-label {
  font-size: 9px;
  color: #4a5568;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  margin-bottom: 3px;
}

.mis-spec-val {
  font-family: 'Instrument Serif', serif;
  font-size: 16px;
  color: #e8edf5;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.mis-spec-divider {
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.06);
}

.mis-spec-agents {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
}

.mis-agent-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 100px;
  border: 1px solid;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.mis-agent-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.mis-outcome {
  padding: 12px 14px;
  border: 1px solid;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mis-outcome-label {
  font-size: 9.5px;
  color: #8892b0;
  letter-spacing: 0.16em;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 2px;
}

.mis-outcome-val {
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.mis-outcome-arrow {
  font-size: 18px;
  opacity: 0.6;
}

.mis-cta {
  margin-top: auto;
  background: linear-gradient(135deg, #00d4ff, #00d4ffCC);
  color: #0a0e1c;
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  cursor: pointer;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease;
}

.mis-cta:hover {
  transform: translateY(-1px);
}

/* Free dialogue */
.mis-free {
  margin-top: 32px;
  padding: 20px 28px;
  background: rgba(10, 14, 32, 0.5);
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.mis-free-left {
  flex: 1 1 320px;
}

.mis-free-eyebrow {
  font-size: 9.5px;
  letter-spacing: 0.2em;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 4px;
}

.mis-free-title {
  font-family: 'Instrument Serif', serif;
  font-size: 18px;
  color: #e8edf5;
}

.mis-free-questions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 2 1 600px;
  justify-content: flex-end;
}

.mis-free-btn {
  padding: 8px 14px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 100px;
  color: #e8edf5;
  font-size: 12px;
  font-family: 'Outfit', sans-serif;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease;
}

.mis-free-btn:hover {
  background: rgba(0, 212, 255, 0.14);
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot, .mis-state-dot-pulse {
    animation: none !important;
  }
  .mis-card {
    transition: none !important;
  }
}

@media (max-width: 900px) {
  .section-missions {
    padding: 60px 24px 60px;
  }
  .mis-title { font-size: 28px; }
  .mis-grid {
    grid-template-columns: 1fr;
  }
  .mis-free {
    flex-direction: column;
    align-items: stretch;
  }
  .mis-free-questions {
    justify-content: flex-start;
  }
}
</style>
