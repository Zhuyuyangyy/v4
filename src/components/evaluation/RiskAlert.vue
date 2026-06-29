<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgePoint } from '@/types/knowledge-tree'

const props = defineProps<{
  points: KnowledgePoint[]
  overallMastery: number
}>()

const alerts = computed(() => {
  const list: { level: 'high' | 'medium' | 'low'; title: string; desc: string; time: string }[] = []
  const weak = props.points.filter(p => p.mastery < 60)

  if (weak.length > 0) {
    const reflectionWeak = weak.filter(p => p.module?.includes('反思') || p.name?.includes('反思'))
    if (reflectionWeak.length > 0) {
      list.push({
        level: 'high',
        title: '反思能力薄弱',
        desc: '反思能力得分过低，建议加强反思验证相关学习',
        time: '刚刚',
      })
    }
    list.push({
      level: 'medium',
      title: '知识掌握不均衡',
      desc: `存在 ${weak.length} 个薄弱知识点，建议系统性学习`,
      time: '10 分钟前',
    })
  }

  if (props.overallMastery < 60) {
    list.push({
      level: 'low',
      title: '学习进度波动',
      desc: '整体掌握度低于目标，建议调整学习计划',
      time: '30 分钟前',
    })
  }

  if (list.length === 0) {
    list.push({ level: 'low', title: '暂无风险', desc: '当前学习状态良好', time: '-' })
  }

  return list
})
</script>

<template>
  <div class="risk-card">
    <div class="card-title">风险预警</div>
    <div class="risk-list">
      <div v-for="(alert, i) in alerts" :key="i" class="risk-item">
        <div class="risk-icon" :class="alert.level">
          <svg v-if="alert.level === 'high'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h18.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
          <svg v-else-if="alert.level === 'medium'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
        </div>
        <div class="risk-body">
          <div class="risk-title">{{ alert.title }}</div>
          <div class="risk-desc">{{ alert.desc }}</div>
        </div>
        <div class="risk-level" :class="alert.level">
          {{ alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低' }}
        </div>
        <div class="risk-time">{{ alert.time }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.risk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  background: rgba(13, 18, 38, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(1.2);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.risk-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.08), transparent 60%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  color: rgba(242, 246, 250, 0.9);
  margin-bottom: 12px;
}

.risk-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.risk-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.risk-icon svg { width: 16px; height: 16px; }

.risk-icon.high { background: rgba(239, 68, 68, 0.12); color: #ef4444; }
.risk-icon.medium { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
.risk-icon.low { background: rgba(6, 214, 160, 0.12); color: #06d6a0; }

.risk-body {
  flex: 1;
  min-width: 0;
}

.risk-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(242, 246, 250, 0.9);
}

.risk-desc {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.risk-level {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.risk-level.high { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.risk-level.medium { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.risk-level.low { background: rgba(6, 214, 160, 0.15); color: #06d6a0; }

.risk-time {
  font-size: 11px;
  color: rgba(176, 190, 210, 0.5);
  flex-shrink: 0;
}
</style>
