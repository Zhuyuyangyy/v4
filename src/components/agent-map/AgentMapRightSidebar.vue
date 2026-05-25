<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAgentMapStore } from './store/agentMapStore'
import { X, Pin, Activity, Zap, Clock, MessageSquare } from 'lucide-vue-next'

const store = useAgentMapStore()
const agent = computed(() => store.selectedAgent.value)

const stateLabels: Record<string, string> = {
  idle: '空闲', working: '工作中', processing: '处理中', pending: '等待中', error: '错误',
}
const stateColors: Record<string, string> = {
  idle: '#475569', working: '#10b981', processing: '#06b6d4', pending: '#f59e0b', error: '#ef4444',
}

function clearSelection() {
  store.selectAgent(null)
}

const recentMessages = computed(() => {
  if (!agent.value) return []
  return store.messages.value
    .filter(m => m.from === agent.value!.id || m.to === agent.value!.id)
    .slice(-6)
    .reverse()
})

const connectedAgents = computed(() => {
  if (!agent.value) return []
  return agent.value.connections
    .map(id => store.agents.get(id))
    .filter(Boolean)
})
</script>

<template>
  <aside class="am-right" v-if="store.selectedAgentId.value">
    <!-- Header -->
    <div class="am-right-hd">
      <h3 class="am-right-title">智能体详情</h3>
      <button class="am-right-close" @click="clearSelection">
        <X :size="14" stroke-width="2" />
      </button>
    </div>

    <div class="am-right-body" v-if="agent">
      <!-- Identity -->
      <div class="am-inspect-identity">
        <div class="am-inspect-icon" :style="{ background: agent.color + '15', borderColor: agent.color + '40' }">
          <span>{{ agent.icon }}</span>
        </div>
        <div class="am-inspect-info">
          <h4 class="am-inspect-name">{{ agent.name }}</h4>
          <span class="am-inspect-en">{{ agent.nameEn }}</span>
        </div>
        <span class="am-inspect-state" :style="{ color: stateColors[agent.state], background: stateColors[agent.state] + '15', borderColor: stateColors[agent.state] + '30' }">
          {{ stateLabels[agent.state] }}
        </span>
      </div>

      <!-- Vitality & Energy bars -->
      <div class="am-inspect-bars">
        <div class="am-bar-row">
          <span class="am-bar-label">健康度</span>
          <span class="am-bar-value" :style="{ color: agent.vitality > 60 ? '#10b981' : agent.vitality > 30 ? '#f59e0b' : '#ef4444' }">{{ agent.vitality.toFixed(0) }}%</span>
        </div>
        <div class="am-bar-track">
          <div class="am-bar-fill" :style="{ width: agent.vitality + '%', background: agent.vitality > 60 ? '#10b981' : agent.vitality > 30 ? '#f59e0b' : '#ef4444' }" />
        </div>
        <div class="am-bar-row">
          <span class="am-bar-label">能量</span>
          <span class="am-bar-value" style="color: #3b82f6">{{ agent.energy.toFixed(0) }}%</span>
        </div>
        <div class="am-bar-track">
          <div class="am-bar-fill" :style="{ width: agent.energy + '%', background: '#3b82f6' }" />
        </div>
      </div>

      <!-- Current Task -->
      <div class="am-inspect-section" v-if="agent.currentTask">
        <h5 class="am-section-label">当前任务</h5>
        <div class="am-task-card">
          <Activity :size="12" :color="agent.color" stroke-width="2" />
          <span>{{ agent.currentTask }}</span>
        </div>
      </div>

      <!-- Process description -->
      <div class="am-inspect-section">
        <h5 class="am-section-label">处理逻辑</h5>
        <p class="am-process-text">{{ agent.process }}</p>
      </div>

      <!-- I/O -->
      <div class="am-inspect-section">
        <h5 class="am-section-label">输入</h5>
        <div class="am-tags">
          <span v-for="item in agent.input" :key="item" class="am-tag">{{ item }}</span>
        </div>
        <h5 class="am-section-label" style="margin-top: 10px">输出</h5>
        <div class="am-tags">
          <span v-for="item in agent.output" :key="item" class="am-tag output">{{ item }}</span>
        </div>
      </div>

      <!-- Connected Agents -->
      <div class="am-inspect-section">
        <h5 class="am-section-label">连接的智能体 ({{ connectedAgents.length }})</h5>
        <div class="am-connected-list">
          <button
            v-for="ca in connectedAgents"
            :key="ca!.id"
            class="am-connected-item"
            @click="store.selectAgent(ca!.id)"
          >
            <div class="am-connected-dot" :style="{ background: ca!.color }" />
            <span>{{ ca!.name }}</span>
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="am-inspect-section">
        <h5 class="am-section-label">运行统计</h5>
        <div class="am-stats-grid">
          <div class="am-stat-cell">
            <MessageSquare :size="12" stroke-width="1.5" class="am-stat-icon" />
            <span class="am-stat-num">{{ agent.messagesProcessed }}</span>
            <span class="am-stat-desc">已处理</span>
          </div>
          <div class="am-stat-cell">
            <Zap :size="12" stroke-width="1.5" class="am-stat-icon warn" />
            <span class="am-stat-num">{{ agent.errorCount }}</span>
            <span class="am-stat-desc">错误</span>
          </div>
        </div>
      </div>

      <!-- Recent Messages -->
      <div class="am-inspect-section" v-if="recentMessages.length > 0">
        <h5 class="am-section-label">最近消息</h5>
        <div class="am-msg-list">
          <div v-for="msg in recentMessages" :key="msg.id" class="am-msg-item">
            <div class="am-msg-header">
              <span class="am-msg-from">{{ store.agents.get(msg.from)?.name || msg.from }}</span>
              <span class="am-msg-arrow">→</span>
              <span class="am-msg-to">{{ store.agents.get(msg.to)?.name || msg.to }}</span>
            </div>
            <p class="am-msg-content">{{ msg.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Empty state -->
  <aside class="am-right am-right-empty" v-else>
    <div class="am-empty-state">
      <div class="am-empty-icon">👁</div>
      <p class="am-empty-text">点击地图上的智能体节点查看详情</p>
    </div>
  </aside>
</template>

<style scoped>
.am-right {
  width: 260px;
  flex-shrink: 0;
  border-left: 1px solid rgba(100, 116, 139, 0.15);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: slide-in 0.2s ease-out;
}

.am-right-empty {
  display: none;
  width: 0;
}

@keyframes slide-in {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.am-right-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(100, 116, 139, 0.1);
}

.am-right-title {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.am-right-close {
  color: #475569;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s;
}

.am-right-close:hover {
  color: #94a3b8;
  background: rgba(30, 41, 59, 0.6);
}

.am-right-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  overflow-y: auto;
}

/* Identity */
.am-inspect-identity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.am-inspect-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.am-inspect-info {
  flex: 1;
  min-width: 0;
}

.am-inspect-name {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
}

.am-inspect-en {
  font-size: 10px;
  color: #475569;
}

.am-inspect-state {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid;
  text-transform: uppercase;
  flex-shrink: 0;
}

/* Bars */
.am-inspect-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.am-bar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.am-bar-label {
  font-size: 11px;
  color: #64748b;
}

.am-bar-value {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.am-bar-track {
  height: 3px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 2px;
  overflow: hidden;
}

.am-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease-out;
}

/* Sections */
.am-inspect-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.am-section-label {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

/* Task */
.am-task-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(100, 116, 139, 0.15);
  font-size: 11px;
  color: #e2e8f0;
}

/* Process */
.am-process-text {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}

/* Tags */
.am-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.am-tag {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
  border: 1px solid rgba(100, 116, 139, 0.1);
}

.am-tag.output {
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.15);
  background: rgba(6, 182, 212, 0.05);
}

/* Connected */
.am-connected-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.am-connected-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 11px;
  color: #94a3b8;
  transition: all 0.15s;
  text-align: left;
}

.am-connected-item:hover {
  background: rgba(30, 41, 59, 0.6);
  color: #e2e8f0;
}

.am-connected-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Stats */
.am-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.am-stat-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(100, 116, 139, 0.08);
}

.am-stat-icon { color: #06b6d4; }
.am-stat-icon.warn { color: #f59e0b; }

.am-stat-num {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: #e2e8f0;
}

.am-stat-desc {
  font-size: 9px;
  color: #475569;
}

/* Messages */
.am-msg-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.am-msg-item {
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(100, 116, 139, 0.08);
}

.am-msg-header {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 600;
  margin-bottom: 3px;
}

.am-msg-from { color: #06b6d4; }
.am-msg-arrow { color: #334155; font-size: 8px; }
.am-msg-to { color: #64748b; }

.am-msg-content {
  font-size: 10px;
  color: #94a3b8;
  margin: 0;
  line-height: 1.4;
}

/* Empty state */
.am-right-empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.am-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 20px;
}

.am-empty-icon {
  font-size: 28px;
  opacity: 0.25;
}

.am-empty-text {
  font-size: 11px;
  color: #475569;
  margin: 0;
}
</style>
