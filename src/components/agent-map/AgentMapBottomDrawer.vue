<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAgentMapStore } from './store/agentMapStore'
import { ChevronRight, Filter } from 'lucide-vue-next'

const store = useAgentMapStore()
const expanded = ref(false)
const filterQuery = ref('')
const sortKey = ref<'name' | 'state' | 'vitality' | 'messagesProcessed'>('vitality')
const sortAsc = ref(false)

const stateLabels: Record<string, string> = {
  idle: '空闲', working: '工作中', processing: '处理中', pending: '等待中', error: '错误',
}
const stateColors: Record<string, string> = {
  idle: '#475569', working: '#10b981', processing: '#06b6d4', pending: '#f59e0b', error: '#ef4444',
}

const filteredAgents = computed(() => {
  let list = store.agentList.value
  if (filterQuery.value) {
    const q = filterQuery.value.toLowerCase()
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.nameEn.toLowerCase().includes(q) ||
      a.state.includes(q) ||
      a.currentTask.toLowerCase().includes(q)
    )
  }
  return [...list].sort((a, b) => {
    const av = a[sortKey.value]
    const bv = b[sortKey.value]
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv))
    return sortAsc.value ? cmp : -cmp
  })
})

function handleSort(key: typeof sortKey.value) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = key === 'name'
  }
}

function selectAgent(id: string) {
  store.selectAgent(id)
}

const activeCount = computed(() => store.agentList.value.filter(a => a.state === 'working' || a.state === 'processing').length)
</script>

<template>
  <div class="am-drawer" :class="{ expanded }">
    <!-- Handle -->
    <button class="am-drawer-handle" @click="expanded = !expanded">
      <ChevronRight :size="12" stroke-width="2" class="am-drawer-chevron" :class="{ rotated: expanded }" />
      <span class="am-drawer-summary">
        <span class="am-drawer-count">{{ store.agentList.value.length }}</span> 个智能体
        <template v-if="activeCount > 0">
          · <span class="am-drawer-active">{{ activeCount }}</span> 个活跃
        </template>
      </span>
    </button>

    <!-- Table -->
    <div v-if="expanded" class="am-drawer-body">
      <div class="am-drawer-filter">
        <Filter :size="11" stroke-width="2" class="am-filter-icon" />
        <input
          v-model="filterQuery"
          placeholder="按名称、状态或任务筛选..."
          class="am-filter-input"
        />
        <span class="am-filter-count">{{ filteredAgents.length }}/{{ store.agentList.value.length }}</span>
      </div>

      <div class="am-drawer-table-wrap">
        <table class="am-drawer-table">
          <thead>
            <tr>
              <th @click="handleSort('name')" :class="{ active: sortKey === 'name' }">
                名称 {{ sortKey === 'name' ? (sortAsc ? '↑' : '↓') : '' }}
              </th>
              <th @click="handleSort('state')" :class="{ active: sortKey === 'state' }">
                状态 {{ sortKey === 'state' ? (sortAsc ? '↑' : '↓') : '' }}
              </th>
              <th>当前任务</th>
              <th @click="handleSort('vitality')" :class="{ active: sortKey === 'vitality' }">
                健康度 {{ sortKey === 'vitality' ? (sortAsc ? '↑' : '↓') : '' }}
              </th>
              <th @click="handleSort('messagesProcessed')" :class="{ active: sortKey === 'messagesProcessed' }">
                已处理 {{ sortKey === 'messagesProcessed' ? (sortAsc ? '↑' : '↓') : '' }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="am-drawer-row"
              :class="{ selected: store.selectedAgentId.value === agent.id }"
              @click="selectAgent(agent.id)"
            >
              <td>
                <div class="am-row-name">
                  <span class="am-row-dot" :style="{ background: agent.color }" />
                  {{ agent.name }}
                </div>
              </td>
              <td>
                <span class="am-row-state" :style="{ color: stateColors[agent.state], background: stateColors[agent.state] + '12', borderColor: stateColors[agent.state] + '25' }">
                  {{ stateLabels[agent.state] }}
                </span>
              </td>
              <td class="am-row-task">{{ agent.currentTask || '—' }}</td>
              <td>
                <span class="am-row-vitality" :style="{ color: agent.vitality > 60 ? '#10b981' : agent.vitality > 30 ? '#f59e0b' : '#ef4444' }">
                  {{ agent.vitality.toFixed(0) }}%
                </span>
              </td>
              <td class="am-row-msgs">{{ agent.messagesProcessed }}</td>
            </tr>
            <tr v-if="filteredAgents.length === 0">
              <td colspan="5" class="am-empty-row">无匹配结果</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.am-drawer {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  z-index: 8;
  border: 1px solid rgba(125, 211, 252, 0.14);
  border-radius: 12px;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.88)),
    repeating-linear-gradient(90deg, transparent 0 32px, rgba(255, 255, 255, 0.018) 32px 33px);
  backdrop-filter: blur(16px);
  overflow: hidden;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: height 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s;
  height: 36px;
  display: flex;
  flex-direction: column;
}

.am-drawer.expanded {
  height: min(260px, calc(100% - 36px));
  border-color: rgba(125, 211, 252, 0.24);
}

.am-drawer-handle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 36px;
  flex-shrink: 0;
  text-align: left;
  transition: background 0.15s;
}

.am-drawer-handle:hover {
  background: rgba(14, 165, 233, 0.08);
}

.am-drawer-chevron {
  color: #06b6d4;
  transition: transform 0.2s;
}

.am-drawer-chevron.rotated {
  transform: rotate(90deg);
}

.am-drawer-summary {
  font-size: 11px;
  color: #94a3b8;
}

.am-drawer-count {
  font-family: var(--font-mono);
  color: #e2e8f0;
  font-weight: 600;
}

.am-drawer-active {
  font-family: var(--font-mono);
  color: #10b981;
  font-weight: 600;
}

.am-drawer-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.am-drawer-filter {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-bottom: 1px solid rgba(100, 116, 139, 0.08);
  flex-shrink: 0;
}

.am-filter-icon { color: #475569; flex-shrink: 0; }

.am-filter-input {
  flex: 1;
  font-size: 11px;
  color: #e2e8f0;
}

.am-filter-input::placeholder { color: #334155; }

.am-filter-count {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #475569;
  flex-shrink: 0;
}

.am-drawer-table-wrap {
  flex: 1;
  overflow: auto;
}

.am-drawer-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.am-drawer-table thead {
  position: sticky;
  top: 0;
  background: rgba(15, 23, 42, 0.98);
  z-index: 1;
}

.am-drawer-table th {
  padding: 6px 12px;
  text-align: left;
  font-size: 9px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
  white-space: nowrap;
}

.am-drawer-table th:hover,
.am-drawer-table th.active {
  color: #94a3b8;
}

.am-drawer-row {
  border-top: 1px solid rgba(100, 116, 139, 0.06);
  cursor: pointer;
  transition: background 0.15s;
}

.am-drawer-row:hover {
  background: rgba(30, 41, 59, 0.3);
}

.am-drawer-row.selected {
  background: rgba(6, 182, 212, 0.06);
}

.am-drawer-table td {
  padding: 6px 12px;
  white-space: nowrap;
}

.am-row-name {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e2e8f0;
  font-weight: 500;
}

.am-row-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.am-row-state {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid;
  text-transform: uppercase;
}

.am-row-task {
  color: #64748b;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.am-row-vitality {
  font-family: var(--font-mono);
  font-weight: 600;
}

.am-row-msgs {
  font-family: var(--font-mono);
  color: #64748b;
}

.am-empty-row {
  text-align: center;
  color: #334155;
  padding: 20px !important;
}
</style>
