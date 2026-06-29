<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon?: string
  label: string
  value: string
  sub?: string
  subPositive?: boolean
  accent?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  sub: '',
  subPositive: true,
  accent: '#00d4ff',
})

const iconBg = computed(() => `${props.accent}1a`)
const iconBorder = computed(() => `${props.accent}33`)
</script>

<template>
  <div class="metric-card">
    <div class="metric-icon" :style="{ background: iconBg, borderColor: iconBorder }">
      <slot name="icon" />
    </div>
    <div class="metric-body">
      <div class="metric-label">{{ label }}</div>
      <div class="metric-value" :style="{ color: accent }">{{ value }}</div>
      <div v-if="sub" class="metric-sub" :class="{ positive: subPositive, negative: !subPositive }">
        {{ sub }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(13, 18, 38, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(1.2);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, v-bind(accent + '12'), transparent 60%);
  pointer-events: none;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.metric-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid;
  color: v-bind(accent);
}

.metric-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.metric-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.metric-label {
  font-size: 12px;
  color: rgba(176, 190, 210, 0.72);
  letter-spacing: 0.2px;
}

.metric-value {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
}

.metric-sub {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.55);
}

.metric-sub.positive {
  color: #45c486;
}

.metric-sub.negative {
  color: #e66a6a;
}
</style>
