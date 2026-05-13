<template>
  <div class="goal-panel glass-deep" v-if="visible">
    <div class="goal-header">
      <div class="goal-header-left">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
        <span class="goal-title">设定学习目标</span>
      </div>
      <button class="goal-close" @click="$emit('close')">✕</button>
    </div>

    <div class="goal-body">
      <!-- Step 1: Goal -->
      <div class="goal-section">
        <div class="goal-section-label">目标</div>
        <div class="goal-chip-group">
          <button
            v-for="g in goalOptions"
            :key="g.value"
            :class="['goal-chip', { active: goal === g.value }]"
            @click="goal = g.value"
          >{{ g.label }}</button>
        </div>
      </div>

      <!-- Step 2: Weekly hours -->
      <div class="goal-section">
        <div class="goal-section-label">每周可投入时间</div>
        <div class="goal-chip-group">
          <button
            v-for="h in hoursOptions"
            :key="h.value"
            :class="['goal-chip', { active: weeklyHours === h.value }]"
            @click="weeklyHours = h.value"
          >{{ h.label }}</button>
        </div>
      </div>

      <!-- Step 3: Target mastery -->
      <div class="goal-section">
        <div class="goal-section-label">目标掌握度</div>
        <div class="goal-chip-group">
          <button
            v-for="m in masteryOptions"
            :key="m.value"
            :class="['goal-chip', { active: targetMastery === m.value }]"
            @click="targetMastery = m.value"
          >{{ m.label }}</button>
        </div>
      </div>

      <!-- Result -->
      <div v-if="goal && weeklyHours && targetMastery" class="goal-result">
        <div class="goal-result-title">路径规划结果</div>
        <div class="goal-result-grid">
          <div class="goal-result-item">
            <span class="goal-result-value">{{ result.dailyMinutes }} 分钟</span>
            <span class="goal-result-label">每日学习</span>
          </div>
          <div class="goal-result-item">
            <span class="goal-result-value">{{ result.weeks }} 周</span>
            <span class="goal-result-label">预计周期</span>
          </div>
          <div class="goal-result-item">
            <span class="goal-result-value">{{ result.nodesPerWeek }}/周</span>
            <span class="goal-result-label">学习节奏</span>
          </div>
          <div class="goal-result-item">
            <span class="goal-result-value" :style="{ color: '#73f0d0' }">{{ result.eta }}</span>
            <span class="goal-result-label">预计完成</span>
          </div>
        </div>
      </div>
    </div>

    <div class="goal-footer">
      <button class="goal-apply-btn" @click="applyGoal">应用路径规划</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { knowledgeNodes } from '../../data/knowledge-graph'

defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'apply'): void }>()

const universe = useUniverseStore()

const goal = ref('6months')
const weeklyHours = ref('10')
const targetMastery = ref('0.7')

const goalOptions = [
  { value: '1month', label: '1 个月' },
  { value: '3months', label: '3 个月' },
  { value: '6months', label: '6 个月' },
  { value: '1year', label: '1 年' },
]

const hoursOptions = [
  { value: '3', label: '≤ 3 小时' },
  { value: '6', label: '6 小时' },
  { value: '10', label: '10 小时' },
  { value: '20', label: '20+ 小时' },
]

const masteryOptions = [
  { value: '0.5', label: '60% 基础了解' },
  { value: '0.7', label: '80% 熟练掌握' },
  { value: '0.9', label: '95% 精通' },
]

const result = computed(() => {
  const total = knowledgeNodes.length
  const mastered = universe.nodes.filter(n => n.mastery >= 0.7).length
  const remaining = total - mastered
  const target = parseFloat(targetMastery.value)
  const hours = parseFloat(weeklyHours.value)
  const goalDuration = goal.value

  // Calculate weeks for goal
  const goalWeeks: Record<string, number> = {
    '1month': 4, '3months': 13, '6months': 26, '1year': 52,
  }
  const totalWeeks = goalWeeks[goalDuration] || 26
  const daysPerWeek = 5
  const dailyHours = hours / daysPerWeek
  const dailyMinutes = Math.round(dailyHours * 60)
  const nodesPerWeek = Math.max(1, Math.round(remaining / totalWeeks))

  // Estimate ETA
  const now = new Date()
  now.setDate(now.getDate() + totalWeeks * 7)
  const etaStr = now.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', year: 'numeric' })

  return {
    dailyMinutes,
    weeks: totalWeeks,
    nodesPerWeek,
    eta: etaStr,
  }
})

function applyGoal() {
  emit('apply')
}
</script>

<style scoped>
.goal-panel {
  position: absolute;
  right: 16px;
  top: 88px;
  width: 340px;
  z-index: 30;
  padding: 0;
  overflow: hidden;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.goal-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(166, 188, 255, 0.7);
}

.goal-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.9);
}

.goal-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
}

.goal-body {
  padding: 16px 20px;
}

.goal-section {
  margin-bottom: 20px;
}

.goal-section-label {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(173, 191, 255, 0.45);
  margin-bottom: 10px;
}

.goal-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.goal-chip {
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  color: rgba(200, 215, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.2s;
}
.goal-chip:hover {
  border-color: rgba(122, 151, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}
.goal-chip.active {
  border-color: rgba(122, 151, 255, 0.3);
  background: rgba(122, 151, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.goal-result {
  background: rgba(122, 151, 255, 0.04);
  border: 1px solid rgba(122, 151, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
}

.goal-result-title {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(173, 191, 255, 0.45);
  margin-bottom: 14px;
}

.goal-result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.goal-result-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.goal-result-value {
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(248, 250, 255, 0.9);
  line-height: 1.2;
}

.goal-result-label {
  font-size: 0.6rem;
  color: rgba(173, 191, 255, 0.4);
}

.goal-footer {
  padding: 12px 20px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.goal-apply-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.25), rgba(122, 151, 255, 0.08));
  border: 1px solid rgba(122, 151, 255, 0.2);
  transition: all 0.25s;
  letter-spacing: 0.03em;
}
.goal-apply-btn:hover {
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.35), rgba(122, 151, 255, 0.15));
  box-shadow: 0 8px 24px rgba(122, 151, 255, 0.12);
}
</style>
