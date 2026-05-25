<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAgentMapStore } from './store/agentMapStore'
import { Layers, Eye, EyeOff } from 'lucide-vue-next'

const store = useAgentMapStore()

const layers = ref([
  { key: 'agents', label: '智能体节点', icon: '🤖', visible: true },
  { key: 'connections', label: '数据连接', icon: '🔗', visible: true },
  { key: 'messages', label: '消息流', icon: '📨', visible: true },
  { key: 'zones', label: '功能区域', icon: '⬡', visible: true },
])

function toggleLayer(key: string) {
  const layer = layers.value.find(l => l.key === key)
  if (layer) layer.visible = !layer.visible
}

const agentStats = computed(() => {
  const list = store.agentList.value
  return {
    total: list.length,
    working: list.filter(a => a.state === 'working').length,
    processing: list.filter(a => a.state === 'processing').length,
    idle: list.filter(a => a.state === 'idle').length,
    avgVitality: store.avgVitality.value,
    totalMessages: list.reduce((s, a) => s + a.messagesProcessed, 0),
  }
})

const emit = defineEmits<{
  (e: 'layer-toggle', key: string, visible: boolean): void
}>()

function onLayerToggle(key: string) {
  toggleLayer(key)
  const layer = layers.value.find(l => l.key === key)
  if (layer) emit('layer-toggle', key, layer.visible)
}
</script>

<template>
  <aside class="am-left">
    <!-- Homeostasis Dials -->
    <section class="am-left-section">
      <h3 class="am-left-title">系统健康</h3>
      <div class="am-dials">
        <div class="am-dial">
          <div class="am-dial-ring" :style="{ '--pct': agentStats.total, '--color': '#06b6d4' }">
            <svg viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(100,116,139,0.15)" stroke-width="4" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#06b6d4" stroke-width="4"
                :stroke-dasharray="`${(agentStats.total / 10) * 138.2} ${138.2 - (agentStats.total / 10) * 138.2}`"
                stroke-linecap="round"
                transform="rotate(-90 28 28)"
                style="transition: stroke-dasharray 0.6s ease-out" />
            </svg>
            <span class="am-dial-value">{{ agentStats.total }}</span>
          </div>
          <span class="am-dial-label">智能体</span>
        </div>

        <div class="am-dial">
          <div class="am-dial-ring">
            <svg viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(100,116,139,0.15)" stroke-width="4" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#10b981" stroke-width="4"
                :stroke-dasharray="`${(agentStats.avgVitality / 100) * 138.2} ${138.2 - (agentStats.avgVitality / 100) * 138.2}`"
                stroke-linecap="round"
                transform="rotate(-90 28 28)"
                style="transition: stroke-dasharray 0.6s ease-out" />
            </svg>
            <span class="am-dial-value">{{ agentStats.avgVitality }}</span>
          </div>
          <span class="am-dial-label">健康度</span>
        </div>

        <div class="am-dial">
          <div class="am-dial-ring">
            <svg viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(100,116,139,0.15)" stroke-width="4" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#8b5cf6" stroke-width="4"
                :stroke-dasharray="`${(agentStats.working / Math.max(1, agentStats.total)) * 138.2} ${138.2 - (agentStats.working / Math.max(1, agentStats.total)) * 138.2}`"
                stroke-linecap="round"
                transform="rotate(-90 28 28)"
                style="transition: stroke-dasharray 0.6s ease-out" />
            </svg>
            <span class="am-dial-value">{{ agentStats.working }}</span>
          </div>
          <span class="am-dial-label">活跃</span>
        </div>
      </div>
    </section>

    <!-- Agent List -->
    <section class="am-left-section">
      <h3 class="am-left-title">智能体列表</h3>
      <div class="am-agent-list">
        <button
          v-for="agent in store.agentList.value"
          :key="agent.id"
          class="am-agent-item"
          :class="{ selected: store.selectedAgentId.value === agent.id }"
          @click="store.selectAgent(agent.id)"
        >
          <div class="am-agent-dot" :style="{ background: agent.color }" />
          <span class="am-agent-name">{{ agent.name }}</span>
          <span class="am-agent-state" :class="agent.state">{{ agent.state }}</span>
        </button>
      </div>
    </section>

    <!-- Layer Manager -->
    <section class="am-left-section">
      <h3 class="am-left-title">图层控制</h3>
      <div class="am-layers">
        <label
          v-for="layer in layers"
          :key="layer.key"
          class="am-layer-item"
        >
          <div
            class="am-layer-check"
            :class="{ checked: layer.visible }"
            @click.prevent="onLayerToggle(layer.key)"
          >
            <svg v-if="layer.visible" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <polyline points="1,4 3,6 7,2" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="am-layer-icon">{{ layer.icon }}</span>
          <span class="am-layer-label">{{ layer.label }}</span>
        </label>
      </div>
    </section>

    <!-- Messages Processed -->
    <section class="am-left-section">
      <h3 class="am-left-title">消息统计</h3>
      <div class="am-stat-bars">
        <div class="am-stat-row">
          <span class="am-stat-k">总消息</span>
          <span class="am-stat-v cyan">{{ agentStats.totalMessages }}</span>
        </div>
        <div class="am-stat-row">
          <span class="am-stat-k">处理中</span>
          <span class="am-stat-v purple">{{ agentStats.processing }}</span>
        </div>
        <div class="am-stat-row">
          <span class="am-stat-k">空闲</span>
          <span class="am-stat-v muted">{{ agentStats.idle }}</span>
        </div>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.am-left {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid rgba(100, 116, 139, 0.15);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.am-left-section {
  padding: 14px;
  border-bottom: 1px solid rgba(100, 116, 139, 0.1);
}

.am-left-title {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}

/* Dials */
.am-dials {
  display: flex;
  justify-content: space-around;
}

.am-dial {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.am-dial-ring {
  position: relative;
  width: 50px;
  height: 50px;
}

.am-dial-ring svg {
  width: 100%;
  height: 100%;
}

.am-dial-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
}

.am-dial-label {
  font-size: 10px;
  color: #64748b;
}

/* Agent List */
.am-agent-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.am-agent-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #94a3b8;
  transition: all 0.15s;
  text-align: left;
}

.am-agent-item:hover {
  background: rgba(30, 41, 59, 0.6);
  color: #e2e8f0;
}

.am-agent-item.selected {
  background: rgba(6, 182, 212, 0.1);
  color: #06b6d4;
}

.am-agent-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.am-agent-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.am-agent-state {
  font-family: var(--font-mono);
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 3px;
  text-transform: uppercase;
}

.am-agent-state.idle { color: #64748b; background: rgba(100, 116, 139, 0.15); }
.am-agent-state.working { color: #10b981; background: rgba(16, 185, 129, 0.12); }
.am-agent-state.processing { color: #06b6d4; background: rgba(6, 182, 212, 0.12); }
.am-agent-state.pending { color: #f59e0b; background: rgba(245, 158, 11, 0.12); }
.am-agent-state.error { color: #ef4444; background: rgba(239, 68, 68, 0.12); }

/* Layers */
.am-layers {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.am-layer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  cursor: pointer;
  font-size: 11px;
  color: #94a3b8;
  transition: color 0.15s;
}

.am-layer-item:hover {
  color: #e2e8f0;
}

.am-layer-check {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(100, 116, 139, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}

.am-layer-check.checked {
  border-color: #06b6d4;
  background: rgba(6, 182, 212, 0.15);
}

.am-layer-icon {
  font-size: 12px;
}

.am-layer-label {
  flex: 1;
}

/* Stats */
.am-stat-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.am-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.am-stat-k {
  font-size: 11px;
  color: #64748b;
}

.am-stat-v {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.am-stat-v.cyan { color: #06b6d4; }
.am-stat-v.purple { color: #8b5cf6; }
.am-stat-v.muted { color: #475569; }
</style>
