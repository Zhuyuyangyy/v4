<script setup lang="ts">
import { computed } from 'vue'
import type { EvaluationTreeData, AgentContribution } from '@/types/knowledge-tree'

const props = defineProps<{
  data: EvaluationTreeData | null
  change: number
  distribution: { label: string; key: string; count: number; color: string }[]
  reducedMotion?: boolean
}>()

const totalApples = computed(() => props.distribution.reduce((s, d) => s + d.count, 0))

function circumference(r: number) {
  return 2 * Math.PI * r
}

function ringDash(value: number, r: number) {
  const c = circumference(r)
  return `${(value / 100) * c} ${c}`
}

const maxCapability = computed(() => {
  if (!props.data) return 100
  return Math.max(100, ...props.data.capabilities.map((c) => c.value))
})

function agentLabel(agent: AgentContribution) {
  if (agent.agentType === 'profile') return `采集 ${agent.behaviorEvidence} 条证据`
  if (agent.agentType === 'planning') return `生成 ${agent.taskResultEvidence} 条规划`
  if (agent.agentType === 'action') return `完成 ${agent.taskResultEvidence} 个任务`
  if (agent.agentType === 'reflection') return `提交 ${agent.reflectionEvidence} 条反思`
  if (agent.agentType === 'evaluation') return `完成 ${agent.assessmentEvidence} 次评估`
  return `贡献 ${agent.behaviorEvidence + agent.reflectionEvidence + agent.taskResultEvidence + agent.assessmentEvidence} 条`
}
</script>

<template>
  <div class="summary-panel">
    <div class="panel-card overall-card">
      <div class="card-title">综合掌握度</div>
      <div class="overall-body">
        <div class="overall-number">
          <span class="number-value">{{ (data?.overallMastery ?? 0).toFixed(0) }}</span>
          <span class="number-unit">%</span>
        </div>
        <div class="overall-meta">
          <div class="overall-ring">
            <svg viewBox="0 0 48 48" class="ring-svg">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4" />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--primary, #46b5d1)"
                stroke-width="4"
                stroke-linecap="round"
                :stroke-dasharray="ringDash(data?.overallMastery ?? 0, 20)"
                transform="rotate(-90 24 24)"
              />
            </svg>
          </div>
          <div class="change-row" :class="{ up: change >= 0, down: change < 0 }">
            <span>较上次 {{ change >= 0 ? '提升' : '下降' }} {{ Math.abs(change).toFixed(1) }}%</span>
          </div>
          <div class="eval-count">已评估 {{ totalApples }} 个知识点</div>
        </div>
      </div>
    </div>

    <div class="panel-card">
      <div class="card-title">掌握度分布</div>
      <div class="distribution-bar">
        <span
          v-for="item in distribution"
          :key="item.key"
          class="dist-segment"
          :style="{ width: totalApples ? (item.count / totalApples) * 100 + '%' : '0%', background: item.color }"
          :title="`${item.label}: ${item.count}`"
        />
      </div>
      <div class="distribution-legend">
        <div v-for="item in distribution" :key="item.key" class="dist-item">
          <span class="dist-dot" :style="{ background: item.color }"></span>
          <span class="dist-label">{{ item.label }}</span>
          <span class="dist-count">{{ item.count }}</span>
        </div>
      </div>
    </div>

    <div class="panel-card">
      <div class="card-title">核心能力</div>
      <div class="capabilities">
        <div v-for="cap in data?.capabilities" :key="cap.key" class="cap-row">
          <span class="cap-label">{{ cap.label }}</span>
          <div class="cap-bar-wrap">
            <div class="cap-bar" :style="{ width: (cap.value / maxCapability) * 100 + '%' }"></div>
          </div>
          <span class="cap-value" :class="{ low: cap.value < 60 }">{{ cap.value }}</span>
        </div>
      </div>
    </div>

    <div class="panel-card">
      <div class="card-title">智能体贡献</div>
      <div class="agent-contribs">
        <div v-for="agent in data?.agentContributions" :key="agent.agentType" class="agent-row">
          <span class="agent-dot" :style="{ background: agent.color }"></span>
          <span class="agent-name">{{ agent.agentName }}</span>
          <span class="agent-label">{{ agentLabel(agent) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow-y: auto;
  padding-right: 4px;
}

.panel-card {
  background: var(--bg-card, #0d1b2a);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 14px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main, #f2f6fa);
  margin-bottom: 12px;
}

.overall-body {
  display: flex;
  align-items: center;
  gap: 14px;
}

.overall-number {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.number-value {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: var(--text-main, #f2f6fa);
}

.number-unit {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-sub, #a9b8c7);
}

.overall-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.overall-ring {
  width: 44px;
  height: 44px;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.change-row {
  font-size: 12px;
  color: var(--text-sub, #a9b8c7);
}

.change-row.up {
  color: var(--success, #45c486);
}

.change-row.down {
  color: var(--danger, #e66a6a);
}

.eval-count {
  font-size: 12px;
  color: var(--text-weak, #6f8294);
}

.distribution-bar {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 10px;
}

.dist-segment {
  height: 100%;
  transition: width 0.6s ease;
}

.distribution-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
}

.dist-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.dist-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dist-label {
  color: var(--text-sub, #a9b8c7);
}

.dist-count {
  margin-left: auto;
  color: var(--text-main, #f2f6fa);
  font-weight: 500;
}

.capabilities {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cap-row {
  display: grid;
  grid-template-columns: 56px 1fr 30px;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.cap-label {
  color: var(--text-sub, #a9b8c7);
}

.cap-bar-wrap {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
}

.cap-bar {
  height: 100%;
  border-radius: 3px;
  background: var(--primary, #46b5d1);
  transition: width 0.6s ease;
}

.cap-value {
  text-align: right;
  color: var(--text-main, #f2f6fa);
  font-weight: 500;
}

.cap-value.low {
  color: var(--warning, #e9b949);
}

.agent-contribs {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.agent-row {
  display: grid;
  grid-template-columns: 8px 84px 1fr;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.agent-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.agent-name {
  color: var(--text-sub, #a9b8c7);
}

.agent-label {
  text-align: right;
  color: var(--text-main, #f2f6fa);
}
</style>
