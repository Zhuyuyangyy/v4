<script setup lang="ts">
const levels = [
  { label: '完全掌握 95-100%', color: '#e9b949' },
  { label: '熟练掌握 80-94%', color: '#e66a6a' },
  { label: '基本掌握 60-79%', color: '#e9a23b' },
  { label: '初步掌握 40-59%', color: '#45c486' },
  { label: '掌握较弱 1-39%', color: '#46b5d1' },
  { label: '尚未评估 0%', color: '#6f8294' },
]
</script>

<template>
  <div class="tree-legend">
    <div v-for="item in levels" :key="item.label" class="legend-item">
      <span class="legend-dot" :style="{ background: item.color }"></span>
      <span class="legend-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.tree-legend {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  background: rgba(13, 27, 42, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  backdrop-filter: blur(6px);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  color: var(--text-sub, #a9b8c7);
}
</style>
