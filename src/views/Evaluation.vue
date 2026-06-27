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

const labeledPointIds = computed(() => {
  return new Set(
    [...allPoints.value]
      .filter((pt) => pt.mastery < 65 || pt.status === 'weak' || pt.status === 'none')
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, 8)
      .map((pt) => pt.id),
  )
})

function labelBadgeForPoint(pt: KnowledgePoint) {
  if (!labeledPointIds.value.has(pt.id)) return undefined
  if (pt.status === 'none' || pt.mastery < 30) return '先学'
  if (pt.status === 'weak' || pt.mastery < 50) return '补弱'
  if (pt.mastery < 65) return '巩固'
  return '练习'
}

function labelToneForPoint(pt: KnowledgePoint) {
  if (pt.status === 'none' || pt.mastery < 50) return 'danger'
  if (pt.mastery < 65) return 'warning'
  return 'info'
}

const allKnowledgePoints = computed(() => {
  return allPoints.value.map((pt) => ({
    name: pt.name,
    status: pt.status,
    progress: Math.round(pt.mastery),
    course: pt.module,
    labelBadge: labelBadgeForPoint(pt),
    labelTone: labelToneForPoint(pt),
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

const stats = totalStats

const distribution = computed(() => [
  { label: '已掌握', key: 'mastered', count: stats.value.mastered, color: '#22c55e' },
  { label: '正在学习', key: 'learning', count: stats.value.learning, color: '#f59e0b' },
  { label: '未学习', key: 'unlearned', count: stats.value.unlearned, color: '#3b82f6' },
])

const weakPoints = computed(() => {
  return [...allPoints.value]
    .filter((p) => p.mastery < 60)
    .sort((a, b) => a.mastery - b.mastery)
})

const highlightNames = computed(() => [])

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
  // Derive radar dimensions from the learning path modules/units instead of agent capabilities
  if (!data.value?.modules?.length) {
    return [
      { key: 'all', label: '全部路径', value: stats.value.avgMastery, previousValue: Math.max(0, stats.value.avgMastery - 6) },
    ]
  }
  return data.value.modules.map((m) => ({
    key: m.id,
    label: m.name,
    value: Math.round(m.avgMastery),
    previousValue: Math.max(0, Math.round(m.avgMastery) - 6),
  }))
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

    <main class="dashboard-grid" :class="{ 'panel-open': panelOpen }">
      <button
        class="panel-toggle"
        :class="{ 'panel-open': panelOpen }"
        :aria-expanded="panelOpen"
        aria-controls="evaluation-analysis-panel"
        @click="panelOpen = !panelOpen"
      >
        <span class="panel-toggle-glow" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 17l-5-5 5-5M19 17l-5-5 5-5" v-if="panelOpen"/>
          <path d="M13 17l5-5-5-5M5 17l5-5-5-5" v-else/>
        </svg>
        <span class="panel-toggle-text">{{ panelOpen ? '收起分析' : '展开学习分析' }}</span>
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

      <aside id="evaluation-analysis-panel" class="right-panel" :class="{ open: panelOpen }">
        <div class="right-scroll">
          <div class="analysis-header">
            <div>
              <span class="analysis-kicker">Evaluation cockpit</span>
              <h2>学习分析</h2>
            </div>
            <div class="analysis-status">
              <span>{{ statusText }}</span>
              <strong>{{ totalStats.avgMastery.toFixed(0) }}%</strong>
            </div>
          </div>
          <Transition name="panel-fade" mode="out-in">
            <div :key="selectedPanelTick" class="panel-content">
              <LearningOverview
                :total="stats.total"
                :mastered="stats.mastered"
                :learning="stats.learning"
                :unlearned="stats.unlearned"
                :avg-mastery="stats.avgMastery"
              />

              <div class="charts-grid">
                <OverallMasteryGauge :value="stats.avgMastery" :total="stats.total" :change="overallChange" :trends="trend" />
                <CapabilityRadar :metrics="capabilities" />
                <LearningTrend :trends="trend" />
                <MasteryDistribution :distribution="distribution" />
              </div>

              <WeakPointTop5 :points="weakPoints" />
            </div>
          </Transition>
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
  display: grid;
  grid-template-columns: 1fr 0fr;
  transition: grid-template-columns 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.dashboard-grid.panel-open {
  grid-template-columns: 1fr 520px;
}

.tree-section {
  position: relative;
  z-index: 1;
  min-width: 0;
  min-height: 0;
}

.right-panel {
  position: relative;
  z-index: 20;
  width: 520px;
  height: 100%;
  border-radius: 0;
  background:
    linear-gradient(180deg, rgba(15, 19, 43, 0.94), rgba(8, 11, 26, 0.96)),
    rgba(7, 7, 13, 0.94);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  border-bottom: none;
  border-right: none;
  backdrop-filter: blur(28px) saturate(1.2);
  box-shadow:
    -18px 0 46px rgba(0, 0, 0, 0.38),
    inset 1px 0 0 rgba(0, 212, 255, 0.08);
  overflow: hidden;
}

.right-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    radial-gradient(circle at 86% 6%, rgba(0, 212, 255, 0.1), transparent 34%),
    radial-gradient(circle at 18% 94%, rgba(245, 158, 11, 0.055), transparent 30%);
  background-size: 42px 42px, 42px 42px, auto, auto;
  pointer-events: none;
  border-radius: inherit;
}

.right-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  border-radius: inherit;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
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
  background: rgba(13, 18, 38, 0.82);
  border: 1px solid rgba(0, 212, 255, 0.25);
  backdrop-filter: blur(24px) saturate(1.2);
  color: #f2f6fa;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.35),
    0 0 18px rgba(0, 212, 255, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: right 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.panel-toggle-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.14), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  pointer-events: none;
}

.panel-toggle:hover .panel-toggle-glow {
  opacity: 1;
}

.panel-toggle:hover {
  background: rgba(13, 18, 38, 0.95);
  transform: translateY(-1px);
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.4),
    0 0 28px rgba(0, 212, 255, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 212, 255, 0.4);
}

.panel-toggle:active {
  transform: translateY(0);
}

.panel-toggle.panel-open {
  right: 536px;
  border-color: rgba(0, 212, 255, 0.4);
}

.panel-toggle svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.panel-toggle-text {
  white-space: nowrap;
}

.right-scroll {
  position: relative;
  z-index: 2;
  height: 100%;
  overflow-y: auto;
  padding: 18px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.right-scroll::-webkit-scrollbar {
  width: 4px;
}

.right-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.right-scroll::-webkit-scrollbar-thumb {
  background: rgba(136, 146, 176, 0.3);
  border-radius: 4px;
}

.analysis-header {
  position: sticky;
  top: -18px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0 14px;
  background: linear-gradient(180deg, rgba(13, 17, 38, 0.98) 0%, rgba(13, 17, 38, 0.88) 72%, rgba(13, 17, 38, 0) 100%);
}

.analysis-kicker {
  display: block;
  margin-bottom: 4px;
  color: rgba(136, 146, 176, 0.82);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.analysis-header h2 {
  margin: 0;
  color: #f2f6fa;
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1;
}

.analysis-status {
  min-width: 92px;
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
  text-align: right;
}

.analysis-status span {
  display: block;
  margin-bottom: 2px;
  color: rgba(176, 190, 210, 0.68);
  font-size: 11px;
}

.analysis-status strong {
  color: #06d6a0;
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 18px;
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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
  grid-template-rows: 196px 172px;
  gap: 10px;
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
  .dashboard-grid.panel-open {
    grid-template-columns: 1fr 460px;
  }
  .right-panel {
    width: 460px;
  }
  .panel-toggle.panel-open {
    right: 476px;
  }
}

@media (max-width: 1024px) {
  .dashboard-grid,
  .dashboard-grid.panel-open {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    overflow: auto;
  }
  .tree-section {
    min-height: 420px;
  }
  .right-panel {
    width: 100%;
    height: auto;
    max-height: 0;
    border-radius: 16px 16px 0 0;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .right-panel.open {
    max-height: 58vh;
    opacity: 1;
    transform: translateY(0);
  }
  .panel-toggle,
  .panel-toggle.panel-open {
    right: 16px;
  }
  .analysis-header {
    top: -18px;
  }
  .charts-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 180px);
  }
}

.reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
</style>
