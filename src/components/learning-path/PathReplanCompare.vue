<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, AlertTriangle, GitCompare, TrendingUp } from 'lucide-vue-next'

interface ReplanStep {
  label: string
  color: string
}

export interface ReplanCompareData {
  before: ReplanStep[]
  trigger: {
    source: string
    issue: string
    evidence: string
    icon?: string
  }
  after: ReplanStep[]
}

const props = defineProps<{
  data: ReplanCompareData
}>()

const triggerIcon = computed(() => {
  switch (props.data.trigger.icon) {
    case 'alert': return AlertTriangle
    case 'trend': return TrendingUp
    default: return AlertTriangle
  }
})
</script>

<template>
  <div class="prc-root">
    <div class="prc-grid">
      <div class="prc-col before">
        <div class="prc-col-header">
          <span class="prc-col-label">评估前路径</span>
        </div>
        <div class="prc-path">
          <div
            v-for="(step, i) in data.before"
            :key="step.label"
            class="prc-node"
            :style="{ '--n-c': step.color }"
          >
            <span class="prc-node-dot" />
            <span class="prc-node-label">{{ step.label }}</span>
            <ArrowRight
              v-if="i < data.before.length - 1"
              :size="12"
              stroke-width="1.2"
              class="prc-node-arrow"
            />
          </div>
        </div>
      </div>

      <div class="prc-col trigger">
        <div class="prc-trigger-card">
          <div class="prc-col-header">
            <span class="prc-col-label trigger-label">评估发现</span>
          </div>
          <div class="prc-trigger-body">
            <component :is="triggerIcon" :size="18" stroke-width="1.5" class="prc-trigger-icon" />
            <div class="prc-trigger-info">
              <p class="prc-trigger-source">{{ data.trigger.source }}</p>
              <p class="prc-trigger-issue">{{ data.trigger.issue }}</p>
              <p class="prc-trigger-evidence">{{ data.trigger.evidence }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="prc-col after">
        <div class="prc-col-header">
          <span class="prc-col-label after-label">评估后路径</span>
        </div>
        <div class="prc-path">
          <div
            v-for="(step, i) in data.after"
            :key="step.label"
            :class="['prc-node', { inserted: step.color === '#f43f5e' || step.color === '#f59e0b' }]"
            :style="{ '--n-c': step.color }"
          >
            <span class="prc-node-dot" />
            <span class="prc-node-label">{{ step.label }}</span>
            <span
              v-if="step.color === '#f43f5e' || step.color === '#f59e0b'"
              class="prc-node-badge"
              :style="{ '--badge-bg': step.color }"
            >
              {{ step.color === '#f43f5e' ? '补救资源' : '评估触发' }}
            </span>
            <ArrowRight
              v-if="i < data.after.length - 1"
              :size="12"
              stroke-width="1.2"
              class="prc-node-arrow"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="prc-tip">
      <GitCompare :size="14" stroke-width="1.5" />
      <span>评估后路径中标记的步骤为系统根据评估结果自动插入的补救任务。</span>
    </div>
  </div>
</template>

<style scoped>
.prc-root {
  width: 100%;
}

.prc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.prc-col {
  padding: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
}

.prc-col.before {
  border-color: rgba(255, 255, 255, 0.06);
}

.prc-col.trigger {
  border-color: rgba(244, 63, 94, 0.15);
  background: rgba(244, 63, 94, 0.03);
}

.prc-col.after {
  border-color: rgba(6, 214, 160, 0.12);
  background: rgba(6, 214, 160, 0.03);
}

.prc-col-header {
  margin-bottom: 14px;
}

.prc-col-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.5px;
}

.trigger-label {
  color: rgba(244, 63, 94, 0.75);
}

.after-label {
  color: rgba(6, 214, 160, 0.75);
}

.prc-path {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
}

.prc-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}

.prc-node.inserted {
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(244, 63, 94, 0.08);
  border: 1px dashed rgba(244, 63, 94, 0.2);
}

.prc-node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--n-c, #00d4ff);
  flex-shrink: 0;
}

.prc-node-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.prc-node-arrow {
  color: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.prc-trigger-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.prc-trigger-body {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.prc-trigger-icon {
  color: #f43f5e;
  flex-shrink: 0;
  margin-top: 1px;
}

.prc-trigger-info {
  min-width: 0;
}

.prc-trigger-source {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.prc-trigger-issue {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 4px;
}

.prc-trigger-evidence {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
}

.prc-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.04);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.prc-tip svg {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.prc-node-badge {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  color: #fff;
  background: var(--badge-bg, #f43f5e);
  white-space: nowrap;
  margin-left: 4px;
}

@media (max-width: 900px) {
  .prc-grid {
    grid-template-columns: 1fr;
  }
}
</style>