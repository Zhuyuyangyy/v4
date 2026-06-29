<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-vue-next'

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

const displayAgents = computed(() => props.agents ?? [])

function statusIcon(status: Agent['status']) {
  if (status === 'running') return Loader2
  if (status === 'completed') return CheckCircle2
  if (status === 'failed') return XCircle
  return Clock
}

function statusText(status: Agent['status']) {
  if (status === 'running') return '执行中'
  if (status === 'completed') return '已完成'
  if (status === 'failed') return '失败'
  return '等待中'
}

function selectAgent(agent: Agent) {
  if (agent.status !== 'completed') return
  selectedId.value = selectedId.value === agent.agentId ? null : agent.agentId
  emit('agent-select', agent)
}
</script>

<template>
  <div class="agent-flow-timeline" :class="{ active }">
    <template v-for="(agent, index) in displayAgents" :key="agent.agentId">
      <button
        type="button"
        class="agent-flow-node"
        :class="[`status-${agent.status}`, { selected: selectedId === agent.agentId }]"
        :disabled="agent.status !== 'completed'"
        @click="selectAgent(agent)"
      >
        <span class="agent-icon">
          <component
            :is="statusIcon(agent.status)"
            :size="18"
            stroke-width="1.8"
            :class="{ spin: agent.status === 'running' }"
          />
        </span>
        <span class="agent-main">
          <strong>{{ agent.agentName }}</strong>
          <small>{{ agent.role }}</small>
        </span>
        <span class="agent-meta">
          <b>{{ statusText(agent.status) }}</b>
          <small v-if="agent.status === 'completed'">{{ agent.duration }}ms · {{ Math.round(agent.confidence * 100) }}%</small>
        </span>
      </button>

      <span
        v-if="index < displayAgents.length - 1"
        class="agent-connector"
        :class="{ on: agent.status === 'completed' }"
        aria-hidden="true"
      />
    </template>
  </div>
</template>

<style scoped>
.agent-flow-timeline {
  display: flex;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  padding: 6px 2px 10px;
}

.agent-flow-node {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(92px, 1fr);
  grid-template-rows: auto auto;
  gap: 7px 10px;
  min-width: 178px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(8, 15, 34, 0.62);
  color: var(--color-text-secondary);
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.agent-flow-node:disabled {
  cursor: default;
}

.agent-flow-node:not(:disabled) {
  cursor: pointer;
}

.agent-flow-node:not(:disabled):hover,
.agent-flow-node.selected {
  transform: translateY(-1px);
  border-color: rgba(34, 211, 238, 0.34);
  background: rgba(8, 24, 46, 0.74);
}

.agent-icon {
  grid-row: 1 / span 2;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.status-pending .agent-icon {
  color: #8da2c0;
}

.status-running .agent-icon {
  color: #22d3ee;
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
}

.status-completed .agent-icon {
  color: #34d399;
}

.status-failed .agent-icon {
  color: #fb7185;
}

.agent-main,
.agent-meta {
  display: grid;
  gap: 2px;
}

.agent-main strong {
  color: #eef5ff;
  font-size: 13px;
  line-height: 1.25;
}

.agent-main small,
.agent-meta small {
  color: #8da2c0;
  font-size: 11px;
  line-height: 1.25;
}

.agent-meta {
  grid-column: 2;
}

.agent-meta b {
  color: #cbd8eb;
  font-size: 11px;
  font-weight: 700;
}

.agent-connector {
  align-self: center;
  width: 28px;
  height: 1px;
  flex: 0 0 28px;
  background: rgba(255, 255, 255, 0.12);
}

.agent-connector.on {
  background: linear-gradient(90deg, #34d399, #22d3ee);
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.24);
}

.spin {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 760px) {
  .agent-flow-timeline {
    flex-direction: column;
  }

  .agent-connector {
    width: 1px;
    height: 18px;
    margin-left: 28px;
  }
}
</style>
