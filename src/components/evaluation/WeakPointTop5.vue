<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgePoint } from '@/types/knowledge-tree'

const props = defineProps<{
  points: KnowledgePoint[]
}>()

const topPoints = computed(() => props.points.slice(0, 5))

function barColor(mastery: number) {
  if (mastery < 30) return '#00d4ff'
  if (mastery < 50) return '#3b82f6'
  return '#22c55e'
}
</script>

<template>
  <div class="weak-card">
    <div class="weak-header">
      <div class="card-title">Top 5 待提升知识点</div>
      <div class="weak-more">查看全部 &gt;</div>
    </div>
    <div class="weak-list">
      <div v-for="(p, i) in topPoints" :key="p.id" class="weak-item">
        <div class="weak-rank">{{ i + 1 }}</div>
        <div class="weak-name" :title="p.name">{{ p.name }}</div>
        <div class="weak-bar-bg">
          <div class="weak-bar" :style="{ width: `${p.mastery}%`, background: barColor(p.mastery) }" />
        </div>
        <div class="weak-value" :style="{ color: barColor(p.mastery) }">{{ p.mastery.toFixed(0) }}%</div>
      </div>
      <div v-if="!topPoints.length" class="weak-empty">暂无薄弱知识点</div>
    </div>
  </div>
</template>

<style scoped>
.weak-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 14px;
  border-radius: 16px;
  background: rgba(8, 14, 30, 0.72);
  border: 1px solid rgba(0, 212, 255, 0.18);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 20px rgba(0, 212, 255, 0.08);
  overflow: hidden;
}

.weak-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.1), transparent 55%);
  pointer-events: none;
}

.weak-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #f2f6fa;
  letter-spacing: 0.3px;
}

.weak-more {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.55);
  cursor: pointer;
}

.weak-more:hover {
  color: #00d4ff;
}

.weak-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
}

.weak-item {
  display: grid;
  grid-template-columns: 22px 1fr 100px 34px;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.weak-rank {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(176, 190, 210, 0.85);
  font-size: 11px;
  font-weight: 700;
}

.weak-name {
  color: rgba(242, 246, 250, 0.88);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.weak-bar-bg {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.weak-bar {
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 10px currentColor;
  transition: width 0.6s ease;
}

.weak-value {
  text-align: right;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
}

.weak-empty {
  color: rgba(176, 190, 210, 0.5);
  font-size: 12px;
  text-align: center;
  padding: 20px 0;
}
</style>
