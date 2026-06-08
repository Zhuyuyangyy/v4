<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-vue-next'

interface Agent {
  agentId: string
  agentName: string
  role: string
  input: string
  output: string
  confidence: number
  evidenceTags: string[]
  duration: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  timestamp?: string
}

const props = defineProps<{
  agents: Agent[]
  active: boolean
}>()

const emit = defineEmits<{
  (e: 'agent-select', agent: Agent): void
}>()

const selectedId = ref<string | null>(null)
const flashIds = ref<Set<string>>(new Set())

const prevStatusMap = ref<Map<string, string>>(new Map())

watch(
  () => props.agents.map((a) => `${a.agentId}:${a.status}`).join('|'),
  () => {
    for (const agent of props.agents) {
      const prev = prevStatusMap.value.get(agent.agentId)
      if (prev && prev !== 'completed' && agent.status === 'completed') {
        flashIds.value.add(agent.agentId)
        setTimeout(() => {
          flashIds.value.delete(agent.agentId)
        }, 800)
      }
      prevStatusMap.value.set(agent.agentId, agent.status)
    }
  },
  { immediate: true },
)

function statusIcon(status: Agent['status']) {
  switch (status) {
    case 'running':
      return Loader2
    case 'completed':
      return CheckCircle2
    case 'failed':
      return XCircle
    default:
      return Clock
  }
}

function statusColor(status: Agent['status']) {
  switch (status) {
    case 'running':
      return 'var(--color-accent-cyan)'
    case 'completed':
      return 'var(--color-accent-emerald)'
    case 'failed':
      return 'var(--color-accent-rose)'
    default:
      return 'var(--color-text-tertiary)'
  }
}

function statusClass(status: Agent['status']) {
  return `status-${status}`
}

function isLineActive(index: number) {
  const current = props.agents[index]
  const next = props.agents[index + 1]
  if (!next) return false
  if (current.status === 'completed' && (next.status === 'running' || next.status === 'completed')) return true
  if (current.status === 'running' && next.status === 'running') return true
  return false
}

function formatDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function handleNodeClick(agent: Agent) {
  if (agent.status !== 'completed') return
  selectedId.value = selectedId.value === agent.agentId ? null : agent.agentId
  emit('agent-select', agent)
}

const nodeCount = computed(() => props.agents.length)
</script>

<template>
  <div class="agent-flow-timeline" :class="{ 'is-active': active }">
    <!-- Horizontal layout -->
    <div class="flow-track flow-track--horizontal">
      <template v-for="(agent, index) in agents" :key="agent.agentId">
        <div
          class="flow-node"
          :class="[
            statusClass(agent.status),
            { selected: selectedId === agent.agentId, flash: flashIds.has(agent.agentId), clickable: agent.status === 'completed' },
          ]"
          :style="{ '--status-color': statusColor(agent.status), '--node-index': index }"
          @click="handleNodeClick(agent)"
        >
          <!-- Glow layer for running -->
          <div v-if="agent.status === 'running'" class="node-glow" />

          <!-- Flash overlay -->
          <div v-if="flashIds.has(agent.agentId)" class="node-flash" />

          <!-- Icon -->
          <div class="node-icon">
            <component
              :is="statusIcon(agent.status)"
              :size="20"
              :stroke-width="1.8"
              :class="{ 'spin-animation': agent.status === 'running' }"
            />
          </div>

          <!-- Agent name -->
          <span class="node-name">{{ agent.agentName }}</span>

          <!-- Role -->
          <span class="node-role">{{ agent.role }}</span>

          <!-- Duration & Confidence (completed only) -->
          <div v-if="agent.status === 'completed'" class="node-metrics">
            <span class="metric-duration">{{ formatDuration(agent.duration) }}</span>
            <span class="metric-confidence">{{ Math.round(agent.confidence * 100) }}%</span>
          </div>

          <!-- Running progress hint -->
          <div v-if="agent.status === 'running'" class="node-running-hint">
            <span class="running-dot" />
            执行中
          </div>

          <!-- Failed label -->
          <div v-if="agent.status === 'failed'" class="node-failed-hint">失败</div>

          <!-- Pending label -->
          <div v-if="agent.status === 'pending'" class="node-pending-hint">等待中</div>
        </div>

        <!-- Connector line -->
        <div
          v-if="index < agents.length - 1"
          class="flow-connector"
          :class="{ active: isLineActive(index) }"
        >
          <div class="connector-line" />
          <div class="connector-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8m0 0L7 3m3 3L7 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </template>
    </div>

    <!-- Vertical layout (narrow screens) -->
    <div class="flow-track flow-track--vertical">
      <template v-for="(agent, index) in agents" :key="agent.agentId">
        <div class="vertical-step">
          <!-- Vertical connector -->
          <div v-if="index > 0" class="vertical-connector" :class="{ active: isLineActive(index - 1) }">
            <div class="vertical-connector-line" />
          </div>

          <div
            class="flow-node"
            :class="[
              statusClass(agent.status),
              { selected: selectedId === agent.agentId, flash: flashIds.has(agent.agentId), clickable: agent.status === 'completed' },
            ]"
            :style="{ '--status-color': statusColor(agent.status) }"
            @click="handleNodeClick(agent)"
          >
            <div v-if="agent.status === 'running'" class="node-glow" />
            <div v-if="flashIds.has(agent.agentId)" class="node-flash" />

            <div class="node-header-row">
              <div class="node-icon">
                <component
                  :is="statusIcon(agent.status)"
                  :size="18"
                  :stroke-width="1.8"
                  :class="{ 'spin-animation': agent.status === 'running' }"
                />
              </div>
              <div class="node-text">
                <span class="node-name">{{ agent.agentName }}</span>
                <span class="node-role">{{ agent.role }}</span>
              </div>
              <div v-if="agent.status === 'completed'" class="node-metrics">
                <span class="metric-duration">{{ formatDuration(agent.duration) }}</span>
                <span class="metric-confidence">{{ Math.round(agent.confidence * 100) }}%</span>
              </div>
              <div v-if="agent.status === 'running'" class="node-running-hint">
                <span class="running-dot" />
                执行中
              </div>
              <div v-if="agent.status === 'failed'" class="node-failed-hint">失败</div>
              <div v-if="agent.status === 'pending'" class="node-pending-hint">等待中</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.agent-flow-timeline {
  width: 100%;
  overflow: visible;
}

/* ── Horizontal track ── */
.flow-track--horizontal {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 24px 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 212, 255, 0.2) transparent;
}

.flow-track--horizontal::-webkit-scrollbar {
  height: 4px;
}

.flow-track--horizontal::-webkit-scrollbar-thumb {
  background: rgba(0, 212, 255, 0.2);
  border-radius: 2px;
}

/* ── Vertical track (hidden on wide screens) ── */
.flow-track--vertical {
  display: none;
}

/* ── Node ── */
.flow-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 14px 14px;
  min-width: 110px;
  border-radius: 16px;
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out), background 0.35s var(--ease-out);
  cursor: default;
  flex-shrink: 0;
}

.flow-node.clickable {
  cursor: pointer;
}

.flow-node.clickable:hover {
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025));
  border-color: rgba(255, 255, 255, 0.12);
}

.flow-node.selected {
  border-color: var(--status-color);
  box-shadow: 0 0 0 1px var(--status-color), 0 0 20px rgba(0, 212, 255, 0.12);
}

/* Status variants */
.flow-node.status-pending {
  opacity: 0.5;
}

.flow-node.status-running {
  border-color: rgba(0, 212, 255, 0.3);
  background: linear-gradient(175deg, rgba(0, 212, 255, 0.08), rgba(0, 212, 255, 0.02));
}

.flow-node.status-completed {
  border-color: rgba(6, 214, 160, 0.2);
  opacity: 1;
}

.flow-node.status-failed {
  border-color: rgba(244, 63, 94, 0.25);
  opacity: 1;
}

/* ── Glow ── */
.node-glow {
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.15), transparent 70%);
  animation: glow-pulse 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.04);
  }
}

/* ── Flash ── */
.node-flash {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: radial-gradient(circle, rgba(6, 214, 160, 0.4), transparent 70%);
  animation: flash-burst 0.8s var(--ease-out) forwards;
  pointer-events: none;
}

@keyframes flash-burst {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}

/* ── Icon ── */
.node-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--status-color);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.3s, border-color 0.3s;
}

.status-running .node-icon {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.25);
}

.status-completed .node-icon {
  background: rgba(6, 214, 160, 0.1);
  border-color: rgba(6, 214, 160, 0.2);
}

.status-failed .node-icon {
  background: rgba(244, 63, 94, 0.1);
  border-color: rgba(244, 63, 94, 0.2);
}

.spin-animation {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ── Text ── */
.node-name {
  color: var(--color-text-secondary, rgba(232, 237, 245, 0.88));
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.node-role {
  color: var(--color-text-tertiary, rgba(232, 237, 245, 0.45));
  font-size: 11px;
  text-align: center;
  line-height: 1.2;
}

/* ── Metrics ── */
.node-metrics {
  display: flex;
  gap: 8px;
  margin-top: 2px;
}

.metric-duration {
  color: var(--color-text-tertiary, rgba(232, 237, 245, 0.5));
  font-family: var(--font-mono, monospace);
  font-size: 11px;
}

.metric-confidence {
  color: var(--color-accent-emerald, #06d6a0);
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  font-weight: 500;
}

/* ── Status hints ── */
.node-running-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-accent-cyan, #00d4ff);
  font-size: 11px;
  margin-top: 2px;
}

.running-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-cyan, #00d4ff);
  animation: dot-pulse 1.2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.node-failed-hint {
  color: var(--color-accent-rose, #f43f5e);
  font-size: 11px;
  margin-top: 2px;
}

.node-pending-hint {
  color: var(--color-text-tertiary, rgba(232, 237, 245, 0.35));
  font-size: 11px;
  margin-top: 2px;
}

/* ── Connector ── */
.flow-connector {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0 -1px;
  position: relative;
}

.connector-line {
  width: 28px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1px;
  transition: background 0.4s var(--ease-out);
}

.flow-connector.active .connector-line {
  background: linear-gradient(90deg, var(--color-accent-cyan, #00d4ff), rgba(0, 212, 255, 0.3));
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
}

.connector-arrow {
  color: rgba(255, 255, 255, 0.15);
  transition: color 0.4s var(--ease-out);
  flex-shrink: 0;
}

.flow-connector.active .connector-arrow {
  color: var(--color-accent-cyan, #00d4ff);
}

/* ── Vertical layout (responsive) ── */
@media (max-width: 768px) {
  .flow-track--horizontal {
    display: none;
  }

  .flow-track--vertical {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 16px 8px;
  }

  .vertical-step {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .vertical-connector {
    display: flex;
    justify-content: center;
    padding: 2px 0;
  }

  .vertical-connector-line {
    width: 2px;
    height: 20px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 1px;
    transition: background 0.4s var(--ease-out);
  }

  .vertical-connector.active .vertical-connector-line {
    background: linear-gradient(180deg, var(--color-accent-cyan, #00d4ff), rgba(0, 212, 255, 0.3));
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
  }

  /* Vertical node layout: horizontal row */
  .flow-track--vertical .flow-node {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    min-width: unset;
  }

  .flow-track--vertical .node-header-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .flow-track--vertical .node-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .flow-track--vertical .node-name {
    text-align: left;
    max-width: unset;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .flow-track--vertical .node-role {
    text-align: left;
  }

  .flow-track--vertical .node-metrics {
    margin-top: 0;
    flex-shrink: 0;
  }

  .flow-track--vertical .node-running-hint,
  .flow-track--vertical .node-failed-hint,
  .flow-track--vertical .node-pending-hint {
    margin-top: 0;
    flex-shrink: 0;
  }

  .flow-track--vertical .node-glow {
    inset: -2px;
    border-radius: 18px;
  }

  .flow-track--vertical .node-flash {
    border-radius: 16px;
  }
}

/* ── Small screens ── */
@media (max-width: 480px) {
  .flow-track--vertical .flow-node {
    padding: 10px 12px;
  }

  .flow-track--vertical .node-icon {
    width: 32px;
    height: 32px;
  }

  .flow-track--vertical .node-name {
    font-size: 12px;
  }
}
</style>
