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
    <div class="overview-title">
      <span>闭环摘要</span>
      <small>{{ pct }}% mastery</small>
    </div>
    <div class="overview-body">
      <div class="overview-score">
        <div>
          <div class="score-label">平均掌握度</div>
          <div class="score-value">{{ pct }}%</div>
        </div>
        <div class="score-track" aria-hidden="true">
          <span :style="{ width: `${pct}%` }" />
        </div>
      </div>
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
              较昨日 {{ item.up ? '+' : '-' }}{{ item.change }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview-card {
  position: relative;
  padding: 14px;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(18, 22, 48, 0.88), rgba(11, 15, 33, 0.78)),
    rgba(18, 22, 48, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  overflow: hidden;
}

.overview-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 16% 8%, rgba(6, 214, 160, 0.12), transparent 30%),
    radial-gradient(circle at 92% 0%, rgba(0, 212, 255, 0.1), transparent 34%);
  pointer-events: none;
}

.overview-title {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  font-weight: 700;
  color: #f2f6fa;
  margin-bottom: 14px;
  letter-spacing: 0.3px;
}

.overview-title small {
  color: rgba(176, 190, 210, 0.62);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
}

.overview-body {
  position: relative;
  display: grid;
  gap: 12px;
}

.overview-score {
  display: grid;
  grid-template-columns: auto minmax(120px, 1fr);
  align-items: end;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.score-label {
  color: rgba(176, 190, 210, 0.68);
  font-size: 11px;
  margin-bottom: 3px;
}

.score-value {
  color: #06d6a0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

.score-track {
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.07);
  margin-bottom: 8px;
}

.score-track span {
  display: block;
  height: 100%;
  min-width: 4px;
  border-radius: inherit;
  background: linear-gradient(90deg, #06d6a0, #00d4ff);
  transition: width 0.45s ease;
}

.overview-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 9px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.overview-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.18);
}

.overview-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid;
  flex-shrink: 0;
}

.overview-icon svg {
  width: 16px;
  height: 16px;
}

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.overview-value {
  font-size: 18px;
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

@media (max-width: 1280px) {
  .overview-score {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .score-track {
    margin-bottom: 0;
  }
}
</style>
