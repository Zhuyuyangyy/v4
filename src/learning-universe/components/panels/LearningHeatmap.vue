<template>
  <div class="heatmap-card glass-light" v-if="visible">
    <div class="hm-header">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
      <span class="hm-title">学习热力图</span>
      <span class="hm-streak" v-if="streak > 0">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" stroke="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        连续 {{ streak }} 天
      </span>
    </div>

    <div class="hm-body">
      <div class="hm-grid">
        <div
          v-for="(week, wi) in weeks"
          :key="wi"
          class="hm-week"
        >
          <div
            v-for="(day, di) in week"
            :key="di"
            class="hm-day"
            :class="dayLevel(day)"
            :title="`${formatDate(wi, di)}: ${day > 0 ? day + ' 次活动' : '无活动'}`"
          />
        </div>
      </div>
      <div class="hm-legend">
        <span class="hm-legend-label">少</span>
        <span class="hm-legend-cell level-0" />
        <span class="hm-legend-cell level-1" />
        <span class="hm-legend-cell level-2" />
        <span class="hm-legend-cell level-3" />
        <span class="hm-legend-cell level-4" />
        <span class="hm-legend-label">多</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps<{ visible: boolean }>()

// Generate 20 weeks of simulated data based on mastery patterns
const weeks = computed(() => {
  const w: number[][] = []
  for (let wi = 0; wi < 20; wi++) {
    const week: number[] = []
    for (let di = 0; di < 7; di++) {
      // Simulate some activity patterns with a "weekday" bias
      const base = Math.random()
      if (di < 5) {
        // Weekdays: higher chance of activity
        week.push(base > 0.35 ? Math.floor(Math.random() * 5) + 1 : 0)
      } else {
        // Weekends: lower
        week.push(base > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0)
      }
    }
    w.push(week)
  }
  // Make recent weeks more active
  const recent = w.length - 3
  for (let i = recent; i < w.length; i++) {
    for (let d = 0; d < 7; d++) {
      if (w[i][d] === 0 && Math.random() > 0.3) w[i][d] = Math.floor(Math.random() * 3) + 1
    }
  }
  return w
})

const streak = computed(() => {
  // Simulated streak
  return Math.floor(Math.random() * 12) + 3
})

function dayLevel(val: number): string {
  if (val === 0) return 'level-0'
  if (val <= 2) return 'level-1'
  if (val <= 4) return 'level-2'
  if (val <= 6) return 'level-3'
  return 'level-4'
}

function formatDate(weekIdx: number, dayIdx: number): string {
  const d = new Date()
  d.setDate(d.getDate() - (20 - weekIdx) * 7 + dayIdx)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<style scoped>
.heatmap-card {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 18px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hm-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(166, 188, 255, 0.6);
}

.hm-title {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(248, 250, 255, 0.7);
}

.hm-streak {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  font-size: 0.62rem;
  color: #ffd084;
  font-family: 'JetBrains Mono', monospace;
}

.hm-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hm-grid {
  display: flex;
  gap: 3px;
}

.hm-week {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hm-day {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.15s;
}
.hm-day:hover {
  transform: scale(1.4);
  box-shadow: 0 0 8px rgba(122, 151, 255, 0.3);
}

.level-0 { background: rgba(255, 255, 255, 0.04); }
.level-1 { background: rgba(122, 151, 255, 0.15); }
.level-2 { background: rgba(122, 151, 255, 0.35); }
.level-3 { background: rgba(122, 151, 255, 0.55); }
.level-4 { background: #7a97ff; box-shadow: 0 0 6px rgba(122, 151, 255, 0.3); }

.hm-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.hm-legend-label {
  font-size: 0.55rem;
  color: rgba(173, 191, 255, 0.35);
}

.hm-legend-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
</style>
