<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ThreeKnowledgeTree from '@/components/knowledge-tree/ThreeKnowledgeTree.vue'
import KnowledgeDetailDrawer from '@/components/evaluation/KnowledgeDetailDrawer.vue'
import LearningOverview from '@/components/evaluation/LearningOverview.vue'
import OverallMasteryGauge from '@/components/evaluation/OverallMasteryGauge.vue'
import CapabilityRadar from '@/components/evaluation/CapabilityRadar.vue'
import MasteryDistribution from '@/components/evaluation/MasteryDistribution.vue'
import LearningTrend from '@/components/evaluation/LearningTrend.vue'
import WeakPointTop5 from '@/components/evaluation/WeakPointTop5.vue'
import { useEvaluationTreeData } from '@/composables/useEvaluationTreeData'
import type { AppleRenderData, KnowledgeModule, KnowledgePoint, CapabilityMetric } from '@/types/knowledge-tree'

const route = useRoute()
const learnerName = computed(() => (route.query.learner as string) || '学习者 A')
const courseName = computed(() => (route.query.course as string) || '计算机科学基础')

const { data, loading, error, overallChange, load } = useEvaluationTreeData()
const selectedApple = ref<AppleRenderData | null>(null)
const selectedModule = ref<KnowledgeModule | null>(null)
const selectedPanelTick = ref(0)
const reducedMotion = ref(false)
const timeRange = ref('7d')

interface AgentLens {
  key: string
  name: string
  icon: string
  color: string
  capabilityKey: string
}

const AGENTS: AgentLens[] = [
  { key: 'perception', name: '感知智能体', icon: '👁️', color: '#00d4ff', capabilityKey: 'perception' },
  { key: 'planning', name: '规划智能体', icon: '🧭', color: '#5b8def', capabilityKey: 'planning' },
  { key: 'execution', name: '执行智能体', icon: '⚡', color: '#eab308', capabilityKey: 'execution' },
  { key: 'reflection', name: '反思智能体', icon: '🪞', color: '#a855f7', capabilityKey: 'reflection' },
  { key: 'evaluation', name: '评估智能体', icon: '📊', color: '#06d6a0', capabilityKey: 'evaluation' },
]

const selectedAgent = ref<string>('evaluation')
const panelOpen = ref(true)

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  load()
})

function onBackgroundClick() {
  selectedApple.value = null
  selectedModule.value = null
}

function onReload() {
  load()
}

const statusText = computed(() => {
  if (loading.value) return '加载中'
  return data.value?.status === 'analyzing' ? '分析中' : '已完成'
})

const allPoints = computed<KnowledgePoint[]>(() => {
  if (!data.value?.modules) return []
  return data.value.modules.flatMap((m) => m.units.flatMap((u) => u.points))
})

const allKnowledgePoints = computed(() => {
  return allPoints.value.map((pt) => ({
    name: pt.name,
    status: pt.status,
    progress: Math.round(pt.mastery),
  }))
})

const totalStats = computed(() => {
  const points = allPoints.value
  const total = points.length
  const mastered = points.filter((p) => p.mastery >= 80).length
  const learning = points.filter((p) => p.mastery >= 30 && p.mastery < 80).length
  const unlearned = points.filter((p) => p.mastery < 30).length
  const avgMastery = total ? points.reduce((s, p) => s + p.mastery, 0) / total : 0
  return { total, mastered, learning, unlearned, avgMastery }
})

const agentStats = computed(() => {
  const points = agentPoints.value.length > 0 ? agentPoints.value : allPoints.value
  const total = points.length
  const mastered = points.filter((p) => p.mastery >= 80).length
  const learning = points.filter((p) => p.mastery >= 30 && p.mastery < 80).length
  const unlearned = points.filter((p) => p.mastery < 30).length
  const avgMastery = total ? points.reduce((s, p) => s + p.mastery, 0) / total : 0
  return { total, mastered, learning, unlearned, avgMastery }
})

const stats = agentStats

const distribution = computed(() => [
  { label: '已掌握', key: 'mastered', count: stats.value.mastered, color: '#22c55e' },
  { label: '正在学习', key: 'learning', count: stats.value.learning, color: '#f59e0b' },
  { label: '未学习', key: 'unlearned', count: stats.value.unlearned, color: '#3b82f6' },
])

const agentKey = computed(() => selectedAgent.value)

function pointBelongsToAgent(point: KnowledgePoint): boolean {
  if (!agentKey.value || agentKey.value === 'evaluation') return true
  // Direct evidence match
  if (point.agentEvidence?.some((ev) => ev.agentType === agentKey.value || ev.agentName?.includes(AGENTS.find((a) => a.key === agentKey.value)?.name ?? ''))) {
    return true
  }
  // Capability / domain heuristics
  const agent = AGENTS.find((a) => a.key === agentKey.value)
  if (!agent) return true
  const label = `${point.module} ${point.unit} ${point.name}`.toLowerCase()
  const capabilityMap: Record<string, string[]> = {
    perception: ['感知', '识别', '检测', '观察', '数据', '特征'],
    planning: ['规划', '计划', '路径', '编排', '目标', '策略'],
    execution: ['执行', '实现', '编码', '任务', '操作', '运行'],
    reflection: ['反思', '复盘', '总结', '错误', '改进', '优化'],
    evaluation: ['评估', '测评', '测试', '验证', '度量', '评分'],
  }
  return capabilityMap[agent.key]?.some((kw) => label.includes(kw)) ?? true
}

const agentPoints = computed(() => allPoints.value.filter(pointBelongsToAgent))

const weakPoints = computed(() => {
  const pool = agentPoints.value.length > 0 ? agentPoints.value : allPoints.value
  return [...pool]
    .filter((p) => p.mastery < 60)
    .sort((a, b) => a.mastery - b.mastery)
})

const highlightNames = computed(() => {
  if (agentKey.value === 'evaluation') return []
  return agentPoints.value.map((p) => p.name)
})

const trend = computed(() => {
  const today = new Date()
  const values = [42, 46, 50, 53, 55, 58, stats.value.avgMastery]
  return values.map((mastery, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return {
      date: `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      mastery,
    }
  })
})

const capabilities = computed<CapabilityMetric[]>(() => {
  if (data.value?.capabilities?.length) return data.value.capabilities
  return [
    { key: 'comprehension', label: '综合理解', value: 68, previousValue: 62 },
    { key: 'planning', label: '规划能力', value: 78, previousValue: 72 },
    { key: 'execution', label: '执行能力', value: 64, previousValue: 60 },
    { key: 'reflection', label: '反思能力', value: 41, previousValue: 38 },
    { key: 'evaluation', label: '评估能力', value: 57, previousValue: 52 },
    { key: 'perception', label: '感知能力', value: 92, previousValue: 85 },
  ]
})

const agentCapabilityValue = computed(() => {
  const agent = AGENTS.find((a) => a.key === selectedAgent.value)
  if (!agent) return stats.value.avgMastery
  const metric = capabilities.value.find((m) => m.key === agent.capabilityKey)
  return metric?.value ?? stats.value.avgMastery
})

const metrics = computed(() => {
  const agent = AGENTS.find((a) => a.key === selectedAgent.value)
  const accent = agent?.color ?? '#00d4ff'
  const agentAvg = agentCapabilityValue.value
  const statusMap: Record<string, { label: string; sub: string }> = {
    perception: { label: '敏锐', sub: '感知优秀' },
    planning: { label: '良好', sub: '规划清晰' },
    execution: { label: '稳健', sub: '执行到位' },
    reflection: { label: '需加强', sub: '反思不足' },
    evaluation: { label: 'Proficient', sub: '综合优秀' },
  }
  return [
    { icon: 'progress', label: `${agent?.name ?? '学习'}进度`, value: `${agentAvg.toFixed(1)}%`, sub: `较昨日 ↑2.1%`, subPositive: true, accent },
    { icon: 'mastery', label: '掌握度', value: `${stats.value.avgMastery.toFixed(1)}%`, sub: `较昨日 ↑1.8%`, subPositive: true, accent: '#5b8def' },
    { icon: 'confidence', label: '置信度', value: `${Math.round(50 + agentAvg * 0.35)}%`, sub: '较昨日 ↓3.2%', subPositive: false, accent: '#45c486' },
    { icon: 'trend', label: '提升趋势', value: '+3.2%', sub: `较昨日 ↑0.7%`, subPositive: true, accent: '#e9a23b' },
    { icon: 'weight', label: '权重', value: '1.03', sub: '较昨日 ↑0.02', subPositive: true, accent: '#7c5cfc' },
    { icon: 'status', label: '状态', value: statusMap[selectedAgent.value]?.label ?? 'Proficient', sub: statusMap[selectedAgent.value]?.sub ?? '优秀', subPositive: true, accent: '#06d6a0' },
  ]
})

function appleColorForStatus(status?: string): string {
  // Binary mastery palette to match the tree apples
  if (status === 'mastered' || status === 'proficient') return '#22c55e'
  return '#ef4444'
}

function onMarkerSelect(marker: any) {
  if (!marker) return
  const buildApple = (point: any, unitId = '', moduleId = ''): AppleRenderData => {
    const color = appleColorForStatus(point.status)
    return {
      point,
      position: { x: 0, y: 0, z: 0 },
      branchEnd: { x: 0, y: 0, z: 0 },
      size: 0.12,
      color,
      emissive: color,
      unitId,
      moduleId,
    }
  }
  for (const mod of data.value?.modules ?? []) {
    for (const unit of mod.units) {
      const point = unit.points.find((p) => p.name === marker.label)
      if (!point) continue
      selectedApple.value = buildApple(point, unit.id, mod.id)
      selectedPanelTick.value += 1
      selectedModule.value = null
      return
    }
  }
  const fallbackModule = data.value?.modules?.[0]
  const fallbackUnit = fallbackModule?.units?.[0]
  const fallbackPoint = fallbackUnit?.points?.[0]
  if (fallbackPoint) {
    selectedApple.value = buildApple(fallbackPoint, fallbackUnit?.id, fallbackModule?.id)
    selectedModule.value = null
    selectedPanelTick.value += 1
  }
}
</script>

<template>
  <div class="evaluation-page" :class="{ 'reduced-motion': reducedMotion }">
    <header class="dashboard-header">
      <div class="header-left">
        <div class="brand">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h1 class="header-title">智能学习驾驶舱</h1>
            <p class="header-subtitle">学习效果数据洞察与知识图谱分析</p>
          </div>
        </div>
      </div>
      <div class="header-right">
        <span class="update-time">数据更新时间：{{ new Date().toLocaleString('zh-CN') }}</span>
        <span class="header-status" :class="data?.status || 'completed'">{{ statusText }}</span>
        <select v-model="timeRange" class="time-select">
          <option value="7d">近7天</option>
          <option value="30d">近30天</option>
          <option value="today">今天</option>
        </select>
      </div>
    </header>

    <main class="dashboard-grid">
      <button class="panel-toggle" :class="{ 'panel-open': panelOpen }" @click="panelOpen = !panelOpen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19l-7-7 7-7" v-if="panelOpen"/>
          <path d="M3 12h18M3 6h18M3 18h18" v-else/>
        </svg>
        {{ panelOpen ? '收起分析' : '智能体分析' }}
      </button>

      <section class="tree-section">
        <div class="tree-card">
          <div class="section-header">
            <span class="section-title">知识树状态</span>
            <div class="legend">
              <span class="legend-item"><i style="background:#22c55e" />已掌握</span>
              <span class="legend-item"><i style="background:#ef4444" />待掌握</span>
            </div>
          </div>
          <div class="tree-viewport">
            <div v-if="loading" class="scene-overlay">
              <div class="skeleton-tree" />
              <span>知识树加载中…</span>
            </div>
            <div v-else-if="error && !data" class="scene-overlay error">
              数据加载失败：{{ error }}
              <button class="reload-btn" @click="onReload">重试</button>
            </div>
            <ThreeKnowledgeTree
              v-if="data"
              fill
              :height="'100%'"
              :knowledge-points="(allKnowledgePoints as any)"
              :highlight-names="highlightNames"
              :show-background-stage="true"
              @marker-select="onMarkerSelect"
            />
          </div>
          <div class="tree-footer">
            <div class="tree-stat">
              <div class="tree-stat-value">{{ totalStats.total }}</div>
              <div class="tree-stat-label">知识点总数</div>
            </div>
            <div class="tree-stat">
              <div class="tree-stat-value">{{ totalStats.mastered }}</div>
              <div class="tree-stat-label">已掌握</div>
            </div>
            <div class="tree-stat">
              <div class="tree-stat-value">{{ totalStats.learning }}</div>
              <div class="tree-stat-label">正在学习</div>
            </div>
            <div class="tree-stat">
              <div class="tree-stat-value">{{ totalStats.unlearned }}</div>
              <div class="tree-stat-label">未学习</div>
            </div>
            <div class="tree-stat">
              <div class="tree-stat-value">{{ totalStats.avgMastery.toFixed(0) }}%</div>
              <div class="tree-stat-label">平均掌握度</div>
            </div>
          </div>
          <p class="tree-tip">提示：点击节点可查看知识点详情与学习建议</p>
        </div>
      </section>

      <aside class="right-panel" :class="{ open: panelOpen }">
        <div class="right-scroll">
          <div class="agent-selector">
            <div
              v-for="agent in AGENTS"
              :key="agent.key"
              class="agent-tab"
              :class="{ active: selectedAgent === agent.key }"
              :style="{ '--agent-color': agent.color }"
              @click="selectedAgent = agent.key"
            >
              <span class="agent-icon">{{ agent.icon }}</span>
              <span class="agent-name">{{ agent.name }}</span>
            </div>
          </div>

          <LearningOverview
            :total="stats.total"
            :mastered="stats.mastered"
            :learning="stats.learning"
            :unlearned="stats.unlearned"
            :avg-mastery="stats.avgMastery"
          />

          <div class="charts-grid">
            <OverallMasteryGauge :value="stats.avgMastery" :total="stats.total" :change="overallChange" :trends="trend" />
            <CapabilityRadar :metrics="capabilities" :highlight-key="AGENTS.find(a => a.key === selectedAgent)?.capabilityKey" />
            <LearningTrend :trends="trend" />
            <MasteryDistribution :distribution="distribution" />
          </div>

          <WeakPointTop5 :points="weakPoints" />
        </div>
      </aside>
    </main>

    <KnowledgeDetailDrawer
      :key="selectedApple?.point.id || selectedPanelTick"
      :apple="selectedApple"
      @close="onBackgroundClick"
    />
  </div>
</template>

<style scoped>
.evaluation-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #f2f6fa;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 100%, rgba(124, 58, 237, 0.08) 0%, transparent 40%),
    #060b18;
}

.dashboard-header {
  position: relative;
  z-index: 10;
  height: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(6, 11, 24, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(1.2);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.brand-logo svg { width: 22px; height: 22px; }

.header-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.3px;
}

.header-subtitle {
  font-size: 12px;
  color: rgba(176, 190, 210, 0.65);
  margin: 2px 0 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.update-time {
  font-size: 12px;
  color: rgba(176, 190, 210, 0.6);
}

.header-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.header-status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.header-status.completed { color: #45c486; background: rgba(69, 196, 134, 0.12); }
.header-status.analyzing { color: #00d4ff; background: rgba(0, 212, 255, 0.12); }

.time-select {
  padding: 5px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f2f6fa;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

.dashboard-grid {
  flex: 1;
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.tree-section {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.right-panel {
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 520px;
  z-index: 20;
  border-radius: 18px;
  background: rgba(6, 11, 24, 0.78);
  border: 1px solid rgba(0, 212, 255, 0.15);
  backdrop-filter: blur(28px) saturate(1.3);
  box-shadow:
    0 14px 44px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 30px rgba(0, 212, 255, 0.08);
  transform: translateX(calc(100% + 32px));
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.right-panel.open {
  transform: translateX(0);
}

.right-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(0, 212, 255, 0.08), transparent 60%);
  pointer-events: none;
  border-radius: inherit;
}

.panel-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(13, 18, 38, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(1.2);
  color: #f2f6fa;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.panel-toggle:hover {
  background: rgba(13, 18, 38, 0.88);
  transform: translateY(-1px);
}

.panel-toggle.panel-open {
  right: 552px;
}

.panel-toggle svg {
  width: 18px;
  height: 18px;
}

.right-scroll {
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-scroll::-webkit-scrollbar {
  width: 5px;
}

.right-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.right-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.agent-selector {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(8, 14, 30, 0.72);
  border: 1px solid rgba(0, 212, 255, 0.15);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 20px rgba(0, 212, 255, 0.06);
}

.agent-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.agent-tab:hover {
  background: rgba(255, 255, 255, 0.07);
}

.agent-tab.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(124, 58, 237, 0.18));
  border-color: var(--agent-color);
  box-shadow: 0 0 16px color-mix(in srgb, var(--agent-color) 30%, transparent);
}

.agent-icon {
  font-size: 16px;
  line-height: 1;
}

.agent-name {
  font-size: 12px;
  color: rgba(176, 190, 210, 0.85);
  font-weight: 500;
}

.agent-tab.active .agent-name {
  color: #f2f6fa;
  font-weight: 600;
}

.tree-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
  border: none;
  overflow: hidden;
}

.section-header {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(6, 11, 24, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(1.2);
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(242, 246, 250, 0.9);
}

.legend {
  display: flex;
  gap: 10px;
  font-size: 11px;
  color: rgba(176, 190, 210, 0.7);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-item i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.tree-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.tree-footer {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 32px;
  padding: 12px 28px;
  border-radius: 14px;
  background: rgba(6, 11, 24, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(1.2);
}

.tree-stat {
  text-align: center;
}

.tree-stat-value {
  font-size: 22px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: #f2f6fa;
}

.tree-stat-label {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.65);
  margin-top: 2px;
}

.tree-tip {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin: 0;
  font-size: 11px;
  color: rgba(176, 190, 210, 0.45);
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px 180px;
  gap: 12px;
}

.charts-grid > * {
  min-height: 0;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 20;
  background: #0d1226;
  color: rgba(176, 190, 210, 0.8);
  font-size: 14px;
}

.skeleton-tree {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

.scene-overlay.error {
  color: #e66a6a;
}

.reload-btn {
  padding: 6px 14px;
  border: 1px solid rgba(230, 106, 106, 0.35);
  background: rgba(230, 106, 106, 0.08);
  color: #e66a6a;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

@media (max-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: 1.6fr 1fr;
  }
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    overflow: auto;
  }
  .tree-section {
    min-height: 420px;
  }
  .right-panel {
    max-height: 50vh;
  }
}

.reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
</style>
