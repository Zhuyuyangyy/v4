<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAgentMapStore } from './store/agentMapStore'
import AgentMapHeader from './AgentMapHeader.vue'
import AgentMapLeftSidebar from './AgentMapLeftSidebar.vue'
import AgentMapCanvas from './AgentMapCanvas.vue'
import AgentMapRightSidebar from './AgentMapRightSidebar.vue'
import AgentMapBottomDrawer from './AgentMapBottomDrawer.vue'

const store = useAgentMapStore()
const leftOpen = ref(true)
const rightOpen = ref(true)
const searchQuery = ref('')

const cockpitMetrics = computed(() => [
  { label: 'Active Agents', value: String(store.activeAgentCount.value).padStart(2, '0'), hint: '协同运行' },
  { label: 'Message Flow', value: String(store.systemMetrics.totalMessages).padStart(3, '0'), hint: '跨智能体同步' },
  { label: 'Avg Latency', value: `${store.systemMetrics.avgLatency.toFixed(0)}ms`, hint: '实时响应' },
  { label: 'Loop Health', value: `${store.avgVitality.value}%`, hint: '学习闭环稳定度' },
])

function handleSearch(query: string) {
  searchQuery.value = query
  if (query.trim().length >= 2) {
    const q = query.toLowerCase()
    const match = store.agentList.value.find(a =>
      a.name.toLowerCase().includes(q) || a.nameEn.toLowerCase().includes(q)
    )
    if (match) {
      store.selectAgent(match.id)
    }
  }
}

function handleLayerToggle(key: string, visible: boolean) {
  // Layer visibility is managed by canvas internally
}

onMounted(() => {
  if (!store.selectedAgentId.value) {
    store.selectAgent('profile')
  }
  store.startSimulation()
})

onUnmounted(() => {
  store.stopSimulation()
})
</script>

<template>
  <div class="am-shell">
    <div class="am-cockpit">
      <div class="am-cockpit-title">
        <span class="am-cockpit-dot" />
        <div>
          <strong>CAOSMOS 协作控制台</strong>
          <span>把外部世界模拟的战术视角，映射到我们的学习智能体闭环</span>
        </div>
      </div>
      <div class="am-cockpit-metrics">
        <div v-for="item in cockpitMetrics" :key="item.label" class="am-cockpit-metric">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <em>{{ item.hint }}</em>
        </div>
      </div>
    </div>

    <AgentMapHeader @search="handleSearch" />

    <div class="am-main">
      <AgentMapLeftSidebar v-if="leftOpen" @layer-toggle="handleLayerToggle" />

      <div class="am-center">
        <div class="am-viewport-labels" aria-hidden="true">
          <span>PROFILE INPUT</span>
          <span>RESOURCE ORBIT</span>
          <span>ASSESSMENT LOOP</span>
        </div>
        <AgentMapCanvas @select="(id) => store.selectAgent(id)" />
        <AgentMapBottomDrawer />
      </div>

      <AgentMapRightSidebar v-if="rightOpen" />
    </div>
  </div>
</template>

<style scoped>
.am-shell {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 720px;
  border-radius: 22px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 0%, rgba(0, 212, 255, 0.14), transparent 28%),
    radial-gradient(circle at 84% 22%, rgba(124, 58, 237, 0.12), transparent 30%),
    #020617;
  border: 1px solid rgba(125, 211, 252, 0.18);
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.am-shell::before,
.am-shell::after {
  content: '';
  position: absolute;
  z-index: 3;
  width: 92px;
  height: 92px;
  pointer-events: none;
}

.am-shell::before {
  top: 12px;
  left: 12px;
  border-top: 1px solid rgba(0, 212, 255, 0.5);
  border-left: 1px solid rgba(0, 212, 255, 0.5);
}

.am-shell::after {
  right: 12px;
  bottom: 12px;
  border-right: 1px solid rgba(255, 229, 143, 0.36);
  border-bottom: 1px solid rgba(255, 229, 143, 0.36);
}

.am-cockpit {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) 1.5fr;
  gap: 18px;
  padding: 18px 22px 14px;
  border-bottom: 1px solid rgba(100, 116, 139, 0.15);
  background:
    linear-gradient(90deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.78)),
    repeating-linear-gradient(90deg, transparent 0 34px, rgba(255, 255, 255, 0.02) 34px 35px);
}

.am-cockpit-title {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.am-cockpit-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 18px rgba(0, 212, 255, 0.82), 0 0 42px rgba(0, 212, 255, 0.28);
}

.am-cockpit-title strong {
  display: block;
  color: #e2f8ff;
  font-size: 15px;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
}

.am-cockpit-title span:not(.am-cockpit-dot) {
  display: block;
  margin-top: 4px;
  color: rgba(226, 232, 240, 0.52);
  font-size: 12px;
  line-height: 1.5;
}

.am-cockpit-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.am-cockpit-metric {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(100, 116, 139, 0.18);
  background: rgba(2, 6, 23, 0.46);
}

.am-cockpit-metric span,
.am-cockpit-metric em {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.am-cockpit-metric span {
  color: rgba(148, 163, 184, 0.72);
  font-size: 9px;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.am-cockpit-metric strong {
  display: block;
  margin-top: 5px;
  color: #f8fafc;
  font-family: var(--font-mono);
  font-size: 18px;
}

.am-cockpit-metric em {
  margin-top: 3px;
  color: rgba(125, 211, 252, 0.58);
  font-size: 10px;
  font-style: normal;
}

.am-main {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.am-center {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 48%, rgba(0, 212, 255, 0.08), transparent 26%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0.72));
}

.am-viewport-labels {
  position: absolute;
  z-index: 5;
  top: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.am-viewport-labels span {
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(125, 211, 252, 0.14);
  background: rgba(2, 6, 23, 0.48);
  color: rgba(125, 211, 252, 0.58);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
}

@media (max-width: 900px) {
  .am-shell {
    height: 660px;
  }

  .am-cockpit {
    grid-template-columns: 1fr;
  }

  .am-cockpit-metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .am-viewport-labels {
    display: none;
  }
}
</style>
