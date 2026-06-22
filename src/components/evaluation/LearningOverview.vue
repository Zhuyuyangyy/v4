<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total: number
  mastered: number
  learning: number
  unlearned: number
  avgMastery: number
}

const props = defineProps<Props>()

const pct = computed(() => Math.round(props.avgMastery))

const items = computed(() => [
  { label: '知识点总数', value: props.total, icon: 'book', color: '#00d4ff', change: 5, up: true },
  { label: '已掌握', value: props.mastered, icon: 'check', color: '#22c55e', change: 2, up: true },
  { label: '正在学习', value: props.learning, icon: 'clock', color: '#f59e0b', change: 3, up: true },
  { label: '未学习', value: props.unlearned, icon: 'doc', color: '#ef4444', change: 1, up: false },
])
</script>

<template>
  <div class="overview-card">
    <div class="overview-title">学习概览</div>
    <div class="overview-body">
      <div class="overview-metrics">
        <div v-for="item in items" :key="item.label" class="overview-item">
          <div class="overview-icon" :style="{ color: item.color, background: item.color + '1a', borderColor: item.color + '33' }">
            <svg v-if="item.icon === 'book'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <svg v-else-if="item.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <svg v-else-if="item.icon === 'clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div class="overview-info">
            <div class="overview-value" :style="{ color: item.color }">{{ item.value }}</div>
            <div class="overview-label">{{ item.label }}</div>
            <div class="overview-change" :class="{ up: item.up, down: !item.up }">
              较昨日 {{ item.up ? '↑' : '↓' }} {{ item.change }}
            </div>
          </div>
        </div>
      </div>
      <div class="overview-gauge">
        <div ref="gaugeRef" class="gauge-ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10" />
            <circle
              cx="60" cy="60" r="50" fill="none" stroke="url(#ringGrad)" stroke-width="10"
              stroke-linecap="round" stroke-dasharray="314" :stroke-dashoffset="314 - (pct / 100) * 314"
              transform="rotate(-90 60 60)"
              style="filter: drop-shadow(0 0 6px rgba(0,212,255,0.45));"
            />
          </svg>
          <div class="gauge-text">
            <div class="gauge-pct">{{ pct }}%</div>
            <div class="gauge-label">平均掌握度</div>
            <div class="gauge-change up">较昨日 ↑ 3.2%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview-card {
  position: relative;
  padding: 16px;
  border-radius: 16px;
  background: rgba(8, 14, 30, 0.72);
  border: 1px solid rgba(0, 212, 255, 0.18);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 20px rgba(0, 212, 255, 0.08);
  overflow: hidden;
}

.overview-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(0, 212, 255, 0.1), transparent 55%);
  pointer-events: none;
}

.overview-title {
  position: relative;
  font-size: 15px;
  font-weight: 700;
  color: #f2f6fa;
  margin-bottom: 14px;
  letter-spacing: 0.3px;
}

.overview-body {
  position: relative;
  display: flex;
  gap: 14px;
}

.overview-metrics {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.overview-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid;
}

.overview-icon svg {
  width: 18px;
  height: 18px;
}

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.overview-value {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
  font-family: 'JetBrains Mono', monospace;
}

.overview-label {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.72);
}

.overview-change {
  font-size: 10px;
  color: rgba(176, 190, 210, 0.55);
}

.overview-change.up { color: #45c486; }
.overview-change.down { color: #ef4444; }

.overview-gauge {
  width: 130px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gauge-ring {
  position: relative;
  width: 120px;
  height: 120px;
}

.gauge-ring svg {
  width: 100%;
  height: 100%;
}

.gauge-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge-pct {
  font-size: 24px;
  font-weight: 800;
  color: #f2f6fa;
  font-family: 'JetBrains Mono', monospace;
}

.gauge-label {
  font-size: 10px;
  color: rgba(176, 190, 210, 0.7);
}

.gauge-change {
  font-size: 10px;
  margin-top: 2px;
}

.gauge-change.up { color: #45c486; }
</style>
