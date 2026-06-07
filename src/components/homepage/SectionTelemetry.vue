<script setup lang="ts">
import { ref, computed } from 'vue'

const T = {
  cyan: '#00d4ff', purple: '#7c3aed', emerald: '#06d6a0',
  amber: '#f59e0b', rose: '#f43f5e', blue: '#3b82f6',
  text: '#e8edf5', textSub: '#8892b0', textTri: '#4a5568',
  serif: "'Instrument Serif', 'Noto Serif SC', serif",
  sans: "'Outfit', 'PingFang SC', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

interface Agent { id: string; name: string; role: string; color: string }
const agents: Agent[] = [
  { id: 'profile', name: '画像智能体', role: 'PROFILE', color: T.purple },
  { id: 'path', name: '路径规划智能体', role: 'PATH', color: T.cyan },
  { id: 'resource', name: '资源推荐智能体', role: 'RESOURCE', color: T.emerald },
  { id: 'tutor', name: 'AI 辅导智能体', role: 'TUTOR', color: T.amber },
  { id: 'eval', name: '评估智能体', role: 'EVAL', color: T.rose },
  { id: 'feedback', name: '反馈智能体', role: 'FEEDBACK', color: T.blue },
]

interface Event {
  id: string; agent: string; t: number; kind: string;
  label: string; detail: string; size?: string
}
interface Link { from: string; to: string }

const W = 1640
const LANE_H = 56
const LEFT_PAD = 160
const RIGHT_PAD = 40
const TIME_START = 9 * 60
const TIME_END = 18 * 60
const NOW = 16 * 60 + 12
const CHART_W = W - LEFT_PAD - RIGHT_PAD

const timeToX = (mins: number) => LEFT_PAD + ((mins - TIME_START) / (TIME_END - TIME_START)) * CHART_W
const agentLaneY = (idx: number) => 80 + idx * LANE_H + LANE_H / 2

const events: Event[] = [
  { id: 'e1', agent: 'profile', t: 9*60+14, kind: 'detect', label: '识别指针薄弱', detail: '学生在二级指针传参题目正确率仅 41%', size: 'lg' },
  { id: 'e2', agent: 'path', t: 9*60+16, kind: 'replan', label: '插入补弱节点', detail: '在课后巩固阶段插入「二级指针专项训练」' },
  { id: 'e3', agent: 'resource', t: 9*60+17, kind: 'match', label: '匹配 5 个资源', detail: '思维导图 1 · 专项练习 3 · 图解卡片 1' },
  { id: 'e4', agent: 'tutor', t: 10*60+2, kind: 'reply', label: '回答指针提问', detail: '解释二级指针与数组指针的区别' },
  { id: 'e5', agent: 'eval', t: 10*60+31, kind: 'score', label: '晨间小测 · 82 分', detail: 'C 语言指针 6 题对 5 题 · 图结构 4 题对 2 题', size: 'lg' },
  { id: 'e6', agent: 'profile', t: 11*60+5, kind: 'update', label: '画像维度更新', detail: '指针与内存 42% · 图结构与搜索 38% 标记为薄弱' },
  { id: 'e7', agent: 'feedback', t: 11*60+6, kind: 'feedback', label: '反向写入画像', detail: '将测评薄弱点反向传播至画像 24 维向量', size: 'lg' },
  { id: 'e8', agent: 'path', t: 13*60+42, kind: 'replan', label: '下午路径重排', detail: '基于反向反馈调整：插入 BFS 专项 + 释放后悬空练习' },
  { id: 'e9', agent: 'resource', t: 14*60+18, kind: 'match', label: '推送视频资源', detail: '图遍历动画演示视频 (8min) · BFS/DFS 对比图解' },
  { id: 'e10', agent: 'tutor', t: 14*60+56, kind: 'reply', label: '回答图遍历 2 问', detail: 'BFS visited 数组的作用 · DFS 递归栈溢出' },
  { id: 'e11', agent: 'eval', t: 15*60+30, kind: 'score', label: '阶段测评 · 76 分', detail: '发现 4 个盲点：二级指针 · BFS visited · 悬空引用 · 队列空判', size: 'lg' },
  { id: 'e12', agent: 'feedback', t: 15*60+31, kind: 'feedback', label: '触发路径修正', detail: '将 4 个盲点写入画像 · 触发路径规划智能体重排 3 天学习序列', size: 'lg' },
  { id: 'e13', agent: 'path', t: 15*60+32, kind: 'replan', label: '重排学习序列', detail: '明日聚焦 4 个反馈盲点 · 插入思维导图生成节点' },
  { id: 'e14', agent: 'tutor', t: 16*60+3, kind: 'nudge', label: '主动提醒', detail: '连续学习 5 天，今日还差 14 分钟达标 · 推荐图结构思维导图' },
]

const links: Link[] = [
  { from: 'e1', to: 'e2' }, { from: 'e1', to: 'e3' },
  { from: 'e5', to: 'e6' }, { from: 'e6', to: 'e7' },
  { from: 'e7', to: 'e8' }, { from: 'e7', to: 'e9' },
  { from: 'e11', to: 'e12' }, { from: 'e12', to: 'e13' },
]

const KIND_GLYPH: Record<string, string> = {
  detect: '⊙', replan: '↻', match: '◆', reply: '✦', score: '◈', update: '⇆', feedback: '↺', nudge: '!',
}

const hover = ref<string | null>(null)
const focused = computed(() => hover.value ? events.find(e => e.id === hover.value) : null)

const connectionIds = computed(() => {
  if (!focused.value) return new Set<string>()
  const id = focused.value.id
  return new Set(links.flatMap(l => l.from === id ? [l.to] : l.to === id ? [l.from] : []))
})

const eventColor = (e: Event) => agents.find(a => a.id === e.agent)?.color || T.cyan
const eventPos = (e: Event) => ({
  x: timeToX(e.t),
  y: agentLaneY(agents.findIndex(a => a.id === e.agent)),
})

function bezierLink(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.4
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

const HOURS = Array.from({ length: 10 }, (_, i) => 9 + i)
const H = 80 + agents.length * LANE_H + 60

const stats = [
  { l: '总事件', v: events.length, c: T.cyan },
  { l: '因果触发', v: links.length, c: T.purple },
  { l: '画像更新', v: 5, c: T.rose },
  { l: '路径变更', v: 3, c: T.emerald },
]

const legend = [
  { k: 'detect', l: '识别' }, { k: 'replan', l: '重排' },
  { k: 'match', l: '匹配' }, { k: 'reply', l: '回答' },
  { k: 'score', l: '评分' }, { k: 'update', l: '更新' },
  { k: 'feedback', l: '反馈' }, { k: 'nudge', l: '提醒' },
]
</script>

<template>
  <section class="section-telemetry">
    <div class="telemetry-inner">
      <!-- Header -->
      <div class="tele-header">
        <div>
          <div class="section-eyebrow" :style="`color: ${T.cyan}`">
            <span class="eyebrow-dot" :style="`background: ${T.cyan}`" />
            COLLABORATION TELEMETRY · MAY 26 · 实况
          </div>
          <h2 class="section-title-hp">
            今天 6 个智能体为你做了 <span :style="`color: ${T.cyan}`">{{ events.length }}</span> 次干预
          </h2>
          <p class="section-desc-hp">横轴时间，竖轴智能体。每个节点是一次事件 — 鼠标悬停可见因果链。</p>
        </div>
        <div class="tele-stats">
          <div v-for="s in stats" :key="s.l" class="tele-stat">
            <div class="tele-stat-label">{{ s.l }}</div>
            <div class="tele-stat-val" :style="`color: ${s.c}`">{{ s.v }}</div>
          </div>
        </div>
      </div>

      <!-- Gantt chart -->
      <div class="tele-chart">
        <svg :viewBox="`0 0 ${W} ${H}`" class="tele-svg">
          <defs>
            <filter id="tel-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <!-- Hour grid -->
          <g v-for="h in HOURS" :key="`h-${h}`">
            <line :x1="timeToX(h * 60)" y1="48" :x2="timeToX(h * 60)" :y2="H - 32"
              stroke="rgba(255,255,255,0.05)" stroke-width="1"
              :stroke-dasharray="h % 3 === 0 ? '0' : '2 4'" />
            <text :x="timeToX(h * 60)" y="36" :fill="T.textTri"
              font-size="10" :font-family="T.mono" text-anchor="middle"
              letter-spacing="0.1em">
              {{ String(h).padStart(2, '0') }}:00
            </text>
          </g>

          <!-- Lane labels + backgrounds -->
          <g v-for="(a, i) in agents" :key="`lane-${a.id}`">
            <rect v-if="focused && focused.agent === a.id"
              :x="LEFT_PAD - 4" :y="agentLaneY(i) - LANE_H / 2 + 4"
              :width="CHART_W + 8" :height="LANE_H - 8"
              :fill="a.color" fill-opacity="0.05" rx="6" />
            <line :x1="LEFT_PAD" :y1="agentLaneY(i)" :x2="W - RIGHT_PAD" :y2="agentLaneY(i)"
              :stroke="a.color" stroke-opacity="0.12" stroke-width="1" />
            <!-- Label -->
            <g class="agent-lane-label" :transform="`translate(18, ${agentLaneY(i)})`">
              <text x="0" y="4" :fill="a.color" fill-opacity="0.45"
                font-size="10" :font-family="T.mono" letter-spacing="0.08em" font-weight="600">
                0{{ i + 1 }}
              </text>
              <text x="116" y="-5" :fill="T.text" font-size="12" :font-family="T.sans"
                text-anchor="end" font-weight="600" letter-spacing="0.02em">
                {{ a.name }}
              </text>
              <text x="116" y="11" :fill="a.color" fill-opacity="0.9"
                font-size="8" :font-family="T.mono" text-anchor="end" letter-spacing="0.2em" font-weight="600">
                {{ a.role }}
              </text>
              <line x1="126" y1="0" x2="151" y2="0"
                :stroke="a.color" stroke-width="1" stroke-opacity="0.42" stroke-linecap="round" />
              <circle cx="154" cy="0" r="2" :fill="a.color" fill-opacity="0.9" />
            </g>
          </g>

          <!-- NOW marker -->
          <line :x1="timeToX(NOW)" y1="48" :x2="timeToX(NOW)" :y2="H - 32"
            :stroke="T.amber" stroke-opacity="0.8" stroke-width="1.5" stroke-dasharray="4 4" />
          <rect :x="timeToX(NOW) - 22" :y="H - 30" width="44" height="18" rx="4"
            :fill="T.amber" fill-opacity="0.18" :stroke="T.amber" stroke-opacity="0.7" stroke-width="1" />
          <text :x="timeToX(NOW)" :y="H - 18" :fill="T.amber"
            font-size="10" :font-family="T.mono" text-anchor="middle" font-weight="600">NOW</text>

          <!-- Causal links -->
          <g v-for="(l, i) in links" :key="`link-${i}`">
            <path v-if="events.find(e => e.id === l.from) && events.find(e => e.id === l.to)"
              :d="bezierLink(
                eventPos(events.find(e => e.id === l.from)!).x,
                eventPos(events.find(e => e.id === l.from)!).y,
                eventPos(events.find(e => e.id === l.to)!).x,
                eventPos(events.find(e => e.id === l.to)!).y
              )"
              fill="none"
              :stroke="focused && (focused.id === l.from || focused.id === l.to) ? T.cyan : 'rgba(150,165,200,0.35)'"
              :stroke-width="focused && (focused.id === l.from || focused.id === l.to) ? 1.8 : 1"
              :stroke-opacity="focused && !(focused.id === l.from || focused.id === l.to) ? 0.1 : focused ? 0.85 : 0.4"
              :stroke-dasharray="focused && (focused.id === l.from || focused.id === l.to) ? '0' : '3 4'"
              :filter="focused && (focused.id === l.from || focused.id === l.to) ? 'url(#tel-glow)' : undefined"
              class="tele-link" />
          </g>

          <!-- Event nodes -->
          <g v-for="e in events" :key="e.id"
            @mouseenter="hover = e.id" @mouseleave="hover = null"
            style="cursor: pointer">
            <circle :cx="eventPos(e).x" :cy="eventPos(e).y" :r="(e.size === 'lg' ? 11 : 8) + 8"
              fill="transparent" />
            <circle v-if="hover === e.id || connectionIds.has(e.id)"
              :cx="eventPos(e).x" :cy="eventPos(e).y" :r="(e.size === 'lg' ? 11 : 8) + 6"
              :fill="eventColor(e)" fill-opacity="0.25" filter="url(#tel-glow)" />
            <circle :cx="eventPos(e).x" :cy="eventPos(e).y" :r="e.size === 'lg' ? 11 : 8"
              :fill="eventColor(e)"
              :fill-opacity="hover && hover !== e.id && !connectionIds.has(e.id) ? 0.2 : 1"
              stroke="rgba(255,255,255,0.9)"
              :stroke-width="hover === e.id ? 1.5 : 0.5"
              :stroke-opacity="hover && hover !== e.id && !connectionIds.has(e.id) ? 0.3 : 0.9"
              class="tele-node" />
            <text :x="eventPos(e).x" :y="eventPos(e).y + 4"
              fill="rgba(20,26,56,0.95)"
              :font-size="(e.size === 'lg' ? 11 : 8) * 0.95"
              :font-family="T.mono" text-anchor="middle" font-weight="700"
              :opacity="hover && hover !== e.id && !connectionIds.has(e.id) ? 0.3 : 1"
              style="pointer-events: none">
              {{ KIND_GLYPH[e.kind] }}
            </text>
          </g>
        </svg>

        <!-- Floating detail card -->
        <div v-if="focused" class="tele-detail"
          :style="`border-color: ${eventColor(focused)}55; box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 24px ${eventColor(focused)}33`">
          <div class="tele-detail-header">
            <span class="tele-detail-role" :style="`color: ${eventColor(focused)}; background: ${eventColor(focused)}15`">
              {{ agents.find(a => a.id === focused!.agent)?.role }}
            </span>
            <span class="tele-detail-time">
              {{ String(Math.floor(focused.t / 60)).padStart(2, '0') }}:{{ String(focused.t % 60).padStart(2, '0') }}
            </span>
          </div>
          <div class="tele-detail-title">{{ focused.label }}</div>
          <div class="tele-detail-desc">{{ focused.detail }}</div>
          <div v-if="connectionIds.size > 0" class="tele-detail-links">
            联动 {{ connectionIds.size }} 个事件 →
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="tele-legend">
        <span class="tele-legend-label">KIND</span>
        <span v-for="item in legend" :key="item.k" class="tele-legend-item">
          <span class="tele-legend-glyph">{{ KIND_GLYPH[item.k] }}</span>
          {{ item.l }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-telemetry {
  padding: 90px 56px 50px;
  position: relative;
}

.telemetry-inner {
  max-width: 1760px;
  margin: 0 auto;
}

.tele-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 24px;
  flex-wrap: wrap;
}

.section-eyebrow {
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

.section-title-hp {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-size: 40px;
  font-weight: 500;
  color: #e8edf5;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

.section-desc-hp {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: #8892b0;
  max-width: 600px;
}

.tele-stats {
  display: flex;
  gap: 16px;
  background: rgba(10, 12, 28, 0.65);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 14px 20px;
  backdrop-filter: blur(12px);
}

.tele-stat { min-width: 70px; }

.tele-stat-label {
  font-size: 9px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.16em;
}

.tele-stat-val {
  font-family: 'Instrument Serif', serif;
  font-size: 22px;
  font-weight: 500;
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
}

.tele-chart {
  position: relative;
  background: linear-gradient(180deg, rgba(10, 12, 28, 0.6), rgba(6, 8, 20, 0.4));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 24px 0;
  overflow: auto;
}

.tele-svg {
  display: block;
  width: 100%;
  min-width: 980px;
  height: auto;
}

.tele-link {
  transition: stroke-opacity 0.2s ease, stroke-width 0.2s ease;
}

.tele-node {
  transition: fill-opacity 0.2s ease, stroke-opacity 0.2s ease;
}

.tele-detail {
  position: absolute;
  right: 24px;
  top: 50px;
  width: 320px;
  background: rgba(8, 10, 24, 0.95);
  border: 1px solid;
  border-radius: 12px;
  padding: 18px;
  backdrop-filter: blur(20px);
  pointer-events: none;
  z-index: 5;
}

.tele-detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.tele-detail-role {
  font-size: 9.5px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.16em;
  padding: 3px 8px;
  border-radius: 4px;
}

.tele-detail-time {
  font-size: 11px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
}

.tele-detail-title {
  font-family: 'Instrument Serif', serif;
  font-size: 18px;
  color: #e8edf5;
  margin-bottom: 6px;
}

.tele-detail-desc {
  font-size: 12px;
  color: #8892b0;
  line-height: 1.55;
}

.tele-detail-links {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 11px;
  color: #00d4ff;
}

.tele-legend {
  margin-top: 18px;
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 11px;
  color: #8892b0;
}

.tele-legend-label {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  color: #4a5568;
}

.tele-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tele-legend-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot { animation: none !important; }
}

@media (max-width: 900px) {
  .section-telemetry {
    padding: 60px 24px 40px;
  }
  .section-title-hp {
    font-size: 28px;
  }
  .tele-stats {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
