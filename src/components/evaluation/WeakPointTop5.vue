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
      <div class="weak-more">按掌握度排序</div>
    </div>
    <div class="weak-list">
      <div v-for="(p, i) in topPoints" :key="p.id" class="weak-item">
        <div class="weak-rank">{{ String(i + 1).padStart(2, '0') }}</div>
        <div class="weak-main">
          <div class="weak-name" :title="p.name">{{ p.name }}</div>
          <div class="weak-bar-bg">
            <div class="weak-bar" :style="{ width: `${p.mastery}%`, background: barColor(p.mastery) }" />
          </div>
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
  padding: 15px;
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(18, 22, 48, 0.78), rgba(12, 16, 34, 0.7)),
    rgba(18, 22, 48, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
  overflow: hidden;
}

.weak-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 88% 0%, rgba(244, 63, 94, 0.08), transparent 44%),
    radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.05), transparent 36%);
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
  font-size: 13px;
  font-weight: 700;
  color: #f2f6fa;
  letter-spacing: 0;
}

.weak-more {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.58);
}

.weak-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

.weak-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 42px;
  align-items: center;
  gap: 11px;
  font-size: 12px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.055);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.weak-item:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(244, 63, 94, 0.2);
}

.weak-rank {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(244, 63, 94, 0.08);
  color: rgba(255, 153, 177, 0.92);
  font-size: 10px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
}

.weak-main {
  min-width: 0;
}

.weak-name {
  color: rgba(242, 246, 250, 0.88);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.weak-bar-bg {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.weak-bar {
  height: 100%;
  border-radius: 999px;
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
