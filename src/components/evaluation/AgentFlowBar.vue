<script setup lang="ts">
import type { AgentContribution, AgentType } from '@/types/knowledge-tree'

defineProps<{
  agents: AgentContribution[]
  status?: 'analyzing' | 'completed'
}>()

const ORDER: AgentType[] = ['profile', 'planning', 'action', 'reflection', 'evaluation']

function agentStatus(agentType: AgentType, globalStatus?: string): string {
  if (globalStatus === 'analyzing') {
    if (agentType === 'profile') return '已完成'
    if (agentType === 'planning') return '已完成'
    if (agentType === 'action') return '运行中'
    return '待处理'
  }
  return '已完成'
}

function statusClass(agentType: AgentType, globalStatus?: string): string {
  const s = agentStatus(agentType, globalStatus)
  if (s === '已完成') return 'completed'
  if (s === '运行中') return 'running'
  return 'pending'
}
</script>

<template>
  <div class="agent-flow-bar">
    <div
      v-for="type in ORDER"
      :key="type"
      class="agent-flow-item"
    >
      <span class="agent-flow-dot" :class="statusClass(type, status)"></span>
      <span class="agent-flow-name">{{ agents.find((a) => a.agentType === type)?.agentName || type }}</span>
      <span class="agent-flow-status" :class="statusClass(type, status)">{{ agentStatus(type, status) }}</span>
    </div>
  </div>
</template>

<style scoped>
.agent-flow-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 10px 16px;
  background: var(--bg-card, #0d1b2a);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  flex-shrink: 0;
}

.agent-flow-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.agent-flow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-weak, #6f8294);
}

.agent-flow-dot.completed {
  background: var(--success, #45c486);
}

.agent-flow-dot.running {
  background: var(--primary, #46b5d1);
}

.agent-flow-dot.pending {
  background: var(--warning, #e9b949);
}

.agent-flow-name {
  color: var(--text-sub, #a9b8c7);
}

.agent-flow-status {
  color: var(--text-weak, #6f8294);
}

.agent-flow-status.completed {
  color: var(--success, #45c486);
}

.agent-flow-status.running {
  color: var(--primary, #46b5d1);
}

.agent-flow-status.pending {
  color: var(--warning, #e9b949);
}

@media (max-width: 1366px) {
  .agent-flow-bar {
    gap: 16px;
  }
}
</style>
