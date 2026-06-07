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

interface Phase {
  id: string; name: string; en: string; color: string
  icon: string; progress: number; status: 'done' | 'active' | 'upcoming'
  agents: string[]; desc: string; detail: string; stat: { label: string; value: string }
}

const phases: Phase[] = [
  { id: 'prep', name: '课前预习', en: 'PRE-STUDY', color: T.purple, icon: '◈',
    progress: 100, status: 'done', agents: ['profile', 'resource'],
    desc: '画像智能体分析你的知识基础，资源推荐智能体推送预习材料',
    detail: '已完成 24/24 个预习节点 · 生成 8 份知识卡片',
    stat: { label: '完成率', value: '100%' } },
  { id: 'qa', name: '课中答疑', en: 'IN-CLASS', color: T.cyan, icon: '✦',
    progress: 100, status: 'done', agents: ['tutor', 'profile'],
    desc: 'AI 辅导智能体实时回答你的课堂问题，画像同步更新',
    detail: '累计 47 次问答 · 平均响应 56ms · 准确率 94%',
    stat: { label: '问答次数', value: '47' } },
  { id: 'review', name: '课后巩固', en: 'REVIEW', color: T.emerald, icon: '◆',
    progress: 68, status: 'active', agents: ['path', 'resource', 'tutor'],
    desc: '路径规划智能体根据测评结果动态调整复习计划',
    detail: '当前在「指针与内存」和「图结构」两个薄弱域重点突破',
    stat: { label: '掌握度', value: '68%' } },
  { id: 'test', name: '阶段测评', en: 'ASSESS', color: T.amber, icon: '◉',
    progress: 42, status: 'active', agents: ['eval', 'feedback'],
    desc: '评估智能体生成个性化试卷，反馈智能体将结果写入画像',
    detail: '本周 8 次测评 · 发现 4 个盲点 · 画像维度已反向更新',
    stat: { label: '正确率', value: '82%' } },
  { id: 'final', name: '期末辅导', en: 'FINAL', color: T.rose, icon: '◇',
    progress: 15, status: 'upcoming', agents: ['tutor', 'eval', 'path'],
    desc: '期末前集中辅导薄弱环节，评估智能体预测考试得分',
    detail: '预计 6 周后进入 · 将覆盖全部 6 个学科域',
    stat: { label: '预计启动', value: '6 周后' } },
  { id: 'archive', name: '成果沉淀', en: 'ARCHIVE', color: T.blue, icon: '◎',
    progress: 0, status: 'upcoming', agents: ['profile', 'feedback'],
    desc: '学习成果归档，画像定格，生成下学期个性化起点',
    detail: '学期结束后自动生成学习报告和知识图谱快照',
    stat: { label: '状态', value: '待启动' } },
]

const agentColors: Record<string, string> = {
  profile: T.purple, path: T.cyan, resource: T.emerald,
  tutor: T.amber, eval: T.rose, feedback: T.blue,
}
const agentNames: Record<string, string> = {
  profile: '画像', path: '路径', resource: '资源',
  tutor: '辅导', eval: '评估', feedback: '反馈',
}

const activePhase = ref<string>('review')
const hoveredPhase = ref<string | null>(null)
const displayPhase = computed(() =>
  (hoveredPhase.value ?? activePhase.value)
)

const currentPhase = computed(() => phases.find(p => p.id === displayPhase.value)!)

// Ring geometry
const RING_CX = 440
const RING_CY = 280
const RING_R = 190
const NODE_R = 22

function nodePos(i: number, total: number) {
  const angle = (i / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: RING_CX + RING_R * Math.cos(angle),
    y: RING_CY + RING_R * Math.sin(angle),
  }
}

// Arc path between two nodes
function arcPath(i: number, total: number) {
  const a1 = (i / total) * 2 * Math.PI - Math.PI / 2
  const a2 = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2
  const r = RING_R
  const x1 = RING_CX + r * Math.cos(a1), y1 = RING_CY + r * Math.sin(a1)
  const x2 = RING_CX + r * Math.cos(a2), y2 = RING_CY + r * Math.sin(a2)
  const large = 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

// Overall stats
const overallProgress = Math.round(phases.reduce((s, p) => s + p.progress, 0) / phases.length)
const activeAgents = 6
const completedTasks = 47
</script>

<template>
  <section class="section-loop">
    <div class="loop-inner">
      <!-- Header -->
      <div class="loop-header">
        <div>
          <div class="loop-eyebrow" :style="`color: ${T.cyan}`">
            <span class="eyebrow-dot" :style="`background: ${T.cyan}`" />
            LEARNING LOOP · 六阶段闭环
          </div>
          <h2 class="loop-title">
            你的学习不是线性的，是<span :style="`color: ${T.cyan}`"> 6 个阶段循环上升</span>
          </h2>
          <p class="loop-desc">
            每个阶段由不同智能体组合驱动 — 画像识别薄弱点，路径动态调整，评估反向更新。
            <span :style="`color: ${T.emerald}`">当前处于课后巩固阶段</span>，正在突破指针与图结构。
          </p>
        </div>
        <div class="loop-stats">
          <div class="loop-stat">
            <div class="loop-stat-label">整体进度</div>
            <div class="loop-stat-ring">
              <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3" />
                <circle cx="24" cy="24" r="20" fill="none" :stroke="T.cyan" stroke-width="3"
                  stroke-linecap="round" :stroke-dasharray="`${overallProgress * 1.257} 125.7`"
                  transform="rotate(-90 24 24)" class="stat-ring-anim" />
              </svg>
              <span class="loop-stat-ring-val" :style="`color: ${T.cyan}`">{{ overallProgress }}%</span>
            </div>
          </div>
          <div class="loop-stat">
            <div class="loop-stat-label">活跃智能体</div>
            <div class="loop-stat-val" :style="`color: ${T.purple}`">{{ activeAgents }}</div>
          </div>
          <div class="loop-stat">
            <div class="loop-stat-label">已完成资源</div>
            <div class="loop-stat-val" :style="`color: ${T.emerald}`">{{ completedTasks }}</div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="loop-content">
        <!-- LEFT: Ring visualization -->
        <div class="loop-ring-wrap">
          <svg :viewBox="`0 0 ${RING_CX * 2} ${RING_CY * 2}`" class="loop-ring-svg">
            <defs>
              <filter id="loop-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="loop-center-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" :stop-color="T.cyan" stop-opacity="0.15" />
                <stop offset="100%" :stop-color="T.purple" stop-opacity="0" />
              </radialGradient>
            </defs>

            <!-- Orbit ring bg -->
            <circle :cx="RING_CX" :cy="RING_CY" :r="RING_R + 8" fill="none"
              stroke="rgba(255,255,255,0.03)" stroke-width="1" />
            <circle :cx="RING_CX" :cy="RING_CY" :r="RING_R" fill="none"
              stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <circle :cx="RING_CX" :cy="RING_CY" :r="RING_R - 8" fill="none"
              stroke="rgba(255,255,255,0.03)" stroke-width="1" />

            <!-- Center glow -->
            <circle :cx="RING_CX" :cy="RING_CY" r="80" fill="url(#loop-center-grad)" />

            <!-- Arc connections -->
            <g v-for="(_, i) in phases.length" :key="`arc-${i}`">
              <path :d="arcPath(i, phases.length)" fill="none"
                :stroke="phases[i].status === 'done' ? phases[i].color : 'rgba(255,255,255,0.08)'"
                :stroke-width="phases[i].status === 'done' ? 2 : 1"
                :stroke-opacity="phases[i].status === 'done' ? 0.6 : 0.3"
                :stroke-dasharray="phases[i].status === 'done' ? '0' : '3 5'" />
              <!-- Flow animation on active arc -->
              <path v-if="phases[i].status === 'active'"
                :d="arcPath(i, phases.length)" fill="none"
                :stroke="phases[i].color" stroke-width="2"
                stroke-dasharray="4 12" class="arc-flow" />
            </g>

            <!-- Phase nodes -->
            <g v-for="(p, i) in phases" :key="p.id"
              :style="displayPhase === p.id ? `filter: url(#loop-glow)` : undefined"
              @mouseenter="hoveredPhase = p.id" @mouseleave="hoveredPhase = null"
              style="cursor: pointer">
              <!-- Outer ring for active -->
              <circle v-if="p.status === 'active'"
                :cx="nodePos(i, phases.length).x" :cy="nodePos(i, phases.length).y"
                r="30" fill="none" :stroke="p.color" stroke-width="1"
                stroke-opacity="0.4" class="node-pulse" />
              <!-- Node bg -->
              <circle :cx="nodePos(i, phases.length).x" :cy="nodePos(i, phases.length).y"
                :r="NODE_R" fill="rgba(10,14,32,0.9)"
                :stroke="displayPhase === p.id ? p.color : `${p.color}88`"
                :stroke-width="displayPhase === p.id ? 2.5 : 1.5" />
              <!-- Progress arc -->
              <circle v-if="p.progress > 0"
                :cx="nodePos(i, phases.length).x" :cy="nodePos(i, phases.length).y"
                :r="NODE_R - 3" fill="none" :stroke="p.color" stroke-width="2"
                stroke-linecap="round"
                :stroke-dasharray="`${(p.progress / 100) * 2 * Math.PI * (NODE_R - 3)} ${2 * Math.PI * (NODE_R - 3)}`"
                :transform="`rotate(-90 ${nodePos(i, phases.length).x} ${nodePos(i, phases.length).y})`"
                opacity="0.8" />
              <!-- Icon -->
              <text :x="nodePos(i, phases.length).x" :y="nodePos(i, phases.length).y + 4.5"
                text-anchor="middle" :fill="p.color" font-size="14"
                font-family="'JetBrains Mono', monospace" font-weight="700"
                :opacity="displayPhase === p.id ? 1 : 0.7">
                {{ p.icon }}
              </text>
            </g>

            <!-- Center label -->
            <text :x="RING_CX" :y="RING_CY - 10" text-anchor="middle"
              :fill="T.text" font-size="16" :font-family="T.serif" font-weight="500">
              {{ currentPhase.name }}
            </text>
            <text :x="RING_CX" :y="RING_CY + 10" text-anchor="middle"
              :fill="T.textSub" font-size="10" :font-family="T.mono" letter-spacing="0.14em">
              {{ currentPhase.en }}
            </text>
            <text :x="RING_CX" :y="RING_CY + 28" text-anchor="middle"
              :fill="currentPhase.color" font-size="20" :font-family="T.serif" font-weight="500">
              {{ currentPhase.stat.value }}
            </text>
          </svg>

          <!-- Phase labels around ring (HTML for better text) -->
          <div v-for="(p, i) in phases" :key="`label-${p.id}`" class="ring-phase-label"
            :class="{ 'ring-phase-label-active': displayPhase === p.id }"
            :style="{
              left: (nodePos(i, phases.length).x / (RING_CX * 2) * 100) + '%',
              top: (nodePos(i, phases.length).y / (RING_CY * 2) * 100) + '%',
              '--phase-color': p.color,
            }"
            @mouseenter="hoveredPhase = p.id" @mouseleave="hoveredPhase = null">
            <div class="ring-phase-name">{{ p.name }}</div>
            <div class="ring-phase-pct" :style="`color: ${p.color}`">{{ p.progress }}%</div>
          </div>
        </div>

        <!-- RIGHT: Phase detail panel -->
        <div class="loop-detail">
          <Transition name="detail-slide" mode="out-in">
            <div :key="displayPhase" class="loop-detail-inner">
              <!-- Phase header -->
              <div class="detail-phase-header">
                <div class="detail-phase-icon" :style="`color: ${currentPhase.color}; background: ${currentPhase.color}15; border-color: ${currentPhase.color}33`">
                  {{ currentPhase.icon }}
                </div>
                <div>
                  <div class="detail-phase-en" :style="`color: ${currentPhase.color}`">{{ currentPhase.en }}</div>
                  <div class="detail-phase-name">{{ currentPhase.name }}</div>
                </div>
                <div class="detail-phase-badge"
                  :class="{
                    'badge-done': currentPhase.status === 'done',
                    'badge-active': currentPhase.status === 'active',
                    'badge-upcoming': currentPhase.status === 'upcoming',
                  }">
                  {{ currentPhase.status === 'done' ? '已完成' : currentPhase.status === 'active' ? '进行中' : '待启动' }}
                </div>
              </div>

              <!-- Description -->
              <p class="detail-desc">{{ currentPhase.desc }}</p>

              <!-- Progress bar -->
              <div class="detail-progress-wrap">
                <div class="detail-progress-bar">
                  <div class="detail-progress-fill"
                    :style="`width: ${currentPhase.progress}%; background: ${currentPhase.color}`" />
                </div>
                <span class="detail-progress-val" :style="`color: ${currentPhase.color}`">{{ currentPhase.stat.label }} {{ currentPhase.stat.value }}</span>
              </div>

              <!-- Active agents -->
              <div class="detail-agents-label">调用智能体</div>
              <div class="detail-agents">
                <span v-for="aid in currentPhase.agents" :key="aid" class="detail-agent-chip"
                  :style="`color: ${agentColors[aid]}; background: ${agentColors[aid]}0a; border-color: ${agentColors[aid]}22`">
                  {{ agentNames[aid] }}智能体
                </span>
              </div>

              <!-- Detail text -->
              <div class="detail-info">
                <div class="detail-info-icon" :style="`color: ${currentPhase.color}`">ℹ</div>
                <div class="detail-info-text">{{ currentPhase.detail }}</div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-loop {
  padding: 90px 56px 60px;
  position: relative;
}

.loop-inner {
  max-width: 1760px;
  margin: 0 auto;
}

.loop-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 36px;
  gap: 24px;
  flex-wrap: wrap;
}

.loop-eyebrow {
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

.loop-title {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-size: 40px;
  font-weight: 500;
  color: #e8edf5;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

.loop-desc {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: #8892b0;
  max-width: 620px;
}

.loop-stats {
  display: flex;
  gap: 16px;
  background: rgba(10, 12, 28, 0.65);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 14px 22px;
  backdrop-filter: blur(12px);
}

.loop-stat { min-width: 70px; text-align: center; }

.loop-stat-label {
  font-size: 9px;
  color: #8892b0;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.16em;
  margin-bottom: 6px;
}

.loop-stat-val {
  font-family: 'Instrument Serif', serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.loop-stat-ring {
  position: relative;
  width: 48px;
  height: 48px;
  margin: 0 auto;
}

.loop-stat-ring svg {
  width: 100%;
  height: 100%;
}

.loop-stat-ring-val {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
}

.stat-ring-anim {
  animation: ring-fill 1.2s ease-out forwards;
  stroke-dasharray: 0 125.7;
}

@keyframes ring-fill {
  to { stroke-dasharray: var(--ring-val, 82) 125.7; }
}

/* Main content layout */
.loop-content {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 32px;
  align-items: start;
}

/* Ring viz */
.loop-ring-wrap {
  position: relative;
  aspect-ratio: 880 / 560;
}

.loop-ring-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.arc-flow {
  animation: dash-flow 3s linear infinite;
}

@keyframes dash-flow {
  to { stroke-dashoffset: -30; }
}

.node-pulse {
  animation: node-pulse-anim 2s ease-in-out infinite;
}

@keyframes node-pulse-anim {
  0%, 100% { opacity: 0.4; transform-origin: center; }
  50% { opacity: 0.15; }
}

/* Phase labels positioned around ring */
.ring-phase-label {
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: auto;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.ring-phase-label:hover,
.ring-phase-label-active {
  background: rgba(255,255,255,0.04);
}

.ring-phase-label-active .ring-phase-name {
  color: #e8edf5;
}

.ring-phase-name {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: #8892b0;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.ring-phase-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

/* Detail panel */
.loop-detail {
  background: rgba(10, 14, 32, 0.7);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px;
  backdrop-filter: blur(14px);
  min-height: 380px;
}

.detail-slide-enter-active,
.detail-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.detail-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.detail-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.detail-phase-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-phase-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid;
  font-size: 18px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
}

.detail-phase-en {
  font-size: 9px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  margin-bottom: 2px;
}

.detail-phase-name {
  font-family: 'Instrument Serif', serif;
  font-size: 22px;
  color: #e8edf5;
  line-height: 1.1;
}

.detail-phase-badge {
  margin-left: auto;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  padding: 4px 10px;
  border-radius: 100px;
  font-weight: 600;
}

.badge-done {
  color: #06d6a0;
  background: rgba(6, 214, 160, 0.1);
  border: 1px solid rgba(6, 214, 160, 0.3);
}

.badge-active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.badge-upcoming {
  color: #4a5568;
  background: rgba(74, 85, 104, 0.1);
  border: 1px solid rgba(74, 85, 104, 0.3);
}

.detail-desc {
  font-size: 13px;
  color: #8892b0;
  line-height: 1.6;
  margin-bottom: 18px;
}

.detail-progress-wrap {
  margin-bottom: 20px;
}

.detail-progress-bar {
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.detail-progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.detail-progress-val {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.detail-agents-label {
  font-size: 9px;
  color: #4a5568;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.16em;
  margin-bottom: 6px;
}

.detail-agents {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.detail-agent-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid;
  font-size: 12px;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  transition: all 0.25s ease;
}

.detail-agent-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.detail-info {
  display: flex;
  gap: 10px;
  padding: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
}

.detail-info-icon {
  font-size: 14px;
  opacity: 0.6;
  flex-shrink: 0;
}

.detail-info-text {
  font-size: 12px;
  color: #8892b0;
  line-height: 1.55;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot, .node-pulse, .arc-flow { animation: none !important; }
  .stat-ring-anim { animation: none !important; }
  .detail-slide-enter-active, .detail-slide-leave-active { transition: none !important; }
}

@media (max-width: 1100px) {
  .loop-content {
    grid-template-columns: 1fr;
  }
  .loop-detail {
    min-height: auto;
  }
}

@media (max-width: 900px) {
  .section-loop { padding: 60px 24px 40px; }
  .loop-title { font-size: 28px; }
  .loop-header { flex-direction: column; align-items: flex-start; }
}
</style>
