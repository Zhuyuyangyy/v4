<script setup lang="ts">
import { computed } from 'vue'
import type { ProfileMetric } from '@/types/evaluation-dashboard'

const props = defineProps<{
  metrics: ProfileMetric[]
  weakKeys?: string[]
}>()

const maxValue = computed(() => Math.max(...props.metrics.map(metric => metric.value), 100))
</script>

<template>
  <section class="delta-card cockpit-card">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Profile Delta</p>
        <h3>画像更新前后对比</h3>
      </div>
      <span class="panel-pill">{{ metrics.length }} 个维度</span>
    </div>

    <div class="metric-list">
      <article
        v-for="metric in metrics"
        :key="metric.key"
        class="metric-row"
        :class="{ weak: weakKeys?.includes(metric.key) }"
      >
        <div class="metric-meta">
          <span class="metric-label">{{ metric.label }}</span>
          <span v-if="weakKeys?.includes(metric.key)" class="weak-tag">需补强</span>
        </div>
        <div class="metric-values">
          <span class="previous">{{ metric.previousValue ?? metric.value }}</span>
          <span class="arrow">→</span>
          <span class="current">{{ metric.value }}</span>
          <span v-if="metric.previousValue !== undefined" class="delta">+{{ Math.max(metric.value - metric.previousValue, 0) }}</span>
        </div>
        <div class="track" aria-hidden="true">
          <span class="previous-track" :style="{ width: `${((metric.previousValue ?? metric.value) / maxValue) * 100}%` }" />
          <span class="current-track" :style="{ width: `${(metric.value / maxValue) * 100}%` }" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cockpit-card {
  position: relative;
  border: 1px solid rgba(0, 212, 255, 0.14);
  background:
    radial-gradient(circle at 0 0, rgba(0, 212, 255, 0.12), transparent 30%),
    linear-gradient(145deg, rgba(9, 15, 34, 0.86), rgba(12, 16, 40, 0.68));
  border-radius: 22px;
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
}
.delta-card { padding: 20px; }
.panel-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
.eyebrow { margin: 0 0 4px; color: #00d4ff; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
h3 { margin: 0; color: #f7fbff; font-size: 19px; font-family: var(--font-display); font-weight: 400; }
.panel-pill { color: rgba(232, 237, 245, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px; padding: 4px 10px; font-size: 12px; white-space: nowrap; }
.metric-list { display: grid; gap: 13px; }
.metric-row { padding: 12px; border-radius: 16px; background: rgba(255, 255, 255, 0.035); border: 1px solid rgba(255, 255, 255, 0.07); }
.metric-row.weak { border-color: rgba(244, 63, 94, 0.35); background: rgba(244, 63, 94, 0.055); }
.metric-meta, .metric-values { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.metric-label { color: rgba(247, 251, 255, 0.9); font-size: 13px; }
.weak-tag { color: #ff7aa7; font-size: 11px; border: 1px solid rgba(244, 63, 94, 0.35); border-radius: 999px; padding: 2px 8px; }
.metric-values { justify-content: flex-start; margin-top: 8px; font-family: var(--font-mono); }
.previous { color: rgba(232, 237, 245, 0.46); }
.arrow { color: rgba(124, 58, 237, 0.9); }
.current { color: #f7fbff; font-size: 18px; animation: number-rise 0.52s ease both; }
.delta { margin-left: auto; color: #06d6a0; font-weight: 700; }
.track { position: relative; height: 7px; margin-top: 10px; border-radius: 999px; background: rgba(255, 255, 255, 0.06); overflow: hidden; }
.previous-track, .current-track { position: absolute; inset: 0 auto 0 0; border-radius: inherit; }
.previous-track { background: rgba(124, 58, 237, 0.26); }
.current-track { background: linear-gradient(90deg, #00d4ff, #06d6a0); box-shadow: 0 0 18px rgba(0, 212, 255, 0.38); animation: grow-track 0.7s ease both; }
@keyframes grow-track { from { transform: scaleX(0.55); transform-origin: left; opacity: 0.5; } to { transform: scaleX(1); opacity: 1; } }
@keyframes number-rise { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>
