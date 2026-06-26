<script setup lang="ts">
import { computed } from 'vue'
import type { AppleRenderData } from '@/types/knowledge-tree'

const props = defineProps<{
  apple: AppleRenderData | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const p = computed(() => props.apple?.point)

const changeText = computed(() => {
  if (!p.value) return ''
  const diff = p.value.mastery - p.value.previousMastery
  if (Math.abs(diff) < 0.1) return '与上次持平'
  return `${diff >= 0 ? '提升' : '下降'} ${Math.abs(diff).toFixed(1)}%`
})

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('zh-CN')
  } catch {
    return iso
  }
}
</script>

<template>
  <transition name="slide">
    <div v-if="apple" class="detail-drawer">
      <div class="drawer-header">
        <div class="drawer-title">{{ p?.name }}</div>
        <button class="drawer-close" @click="emit('close')">×</button>
      </div>
      <div class="drawer-body">
        <div class="drawer-section metrics">
          <div class="metric">
            <span class="metric-label">掌握度</span>
            <span class="metric-value" :style="{ color: apple.color }">{{ p?.mastery.toFixed(1) }}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">上次</span>
            <span class="metric-value">{{ p?.previousMastery.toFixed(1) }}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">变化</span>
            <span class="metric-value change">{{ changeText }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">置信度</span>
            <span class="metric-value">{{ p?.confidence.toFixed(0) }}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">权重</span>
            <span class="metric-value">{{ p?.weight.toFixed(2) }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">状态</span>
            <span class="metric-value status">{{ p?.status }}</span>
          </div>
        </div>

        <div class="drawer-section">
          <div class="section-title">归属信息</div>
          <div class="info-row"><span>模块</span><span>{{ p?.module }}</span></div>
          <div class="info-row"><span>单元</span><span>{{ p?.unit || '-' }}</span></div>
          <div class="info-row"><span>最近评估</span><span>{{ formatDate(p?.lastEvaluatedAt || '') }}</span></div>
        </div>

        <div class="drawer-section">
          <div class="section-title">原因分析</div>
          <p class="drawer-text">{{ p?.reasonAnalysis }}</p>
        </div>

        <div v-if="p?.recentError" class="drawer-section">
          <div class="section-title">最近错误</div>
          <p class="drawer-text error">{{ p.recentError }}</p>
        </div>

        <div v-if="p?.recommendation" class="drawer-section">
          <div class="section-title">推荐任务</div>
          <p class="drawer-text">{{ p.recommendation }}</p>
        </div>

        <div class="drawer-actions">
          <button class="action-btn primary">开始练习</button>
          <button class="action-btn" @click="emit('close')">关闭</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.detail-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background:
    radial-gradient(circle at 18% 8%, rgba(232, 95, 69, 0.12), transparent 28%),
    var(--bg-card, #0d1b2a);
  border-left: 1px solid rgba(232, 95, 69, 0.18);
  z-index: 500;
  display: flex;
  flex-direction: column;
  box-shadow:
    -22px 0 54px rgba(0, 0, 0, 0.32),
    inset 1px 0 0 rgba(255, 255, 255, 0.06);
  transform-origin: right center;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.drawer-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main, #f2f6fa);
}

.drawer-close {
  background: transparent;
  border: none;
  color: var(--text-weak, #6f8294);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.drawer-close:hover {
  color: var(--text-main, #f2f6fa);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
}

.drawer-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 12px;
  color: var(--text-weak, #6f8294);
  margin-bottom: 8px;
}

.metrics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

.metric {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.055);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 11px;
  color: var(--text-weak, #6f8294);
}

.metric-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main, #f2f6fa);
}

.metric-value.change {
  color: var(--success, #45c486);
}

.metric-value.status {
  font-size: 12px;
  text-transform: capitalize;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.info-row span:first-child {
  color: var(--text-weak, #6f8294);
}

.info-row span:last-child {
  color: var(--text-main, #f2f6fa);
}

.evidence-row {
  display: grid;
  grid-template-columns: 1fr 70px 44px;
  gap: 8px;
  font-size: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.ev-agent {
  font-weight: 500;
  color: var(--text-main, #f2f6fa);
}

.ev-type {
  color: var(--text-sub, #a9b8c7);
}

.ev-count {
  text-align: right;
  color: var(--text-main, #f2f6fa);
}

.evidence-total {
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-sub, #a9b8c7);
  text-align: right;
}

.drawer-text {
  font-size: 12px;
  color: var(--text-sub, #a9b8c7);
  line-height: 1.7;
  margin: 0;
}

.drawer-text.error {
  color: var(--danger, #e66a6a);
}

.drawer-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.action-btn {
  flex: 1;
  padding: 9px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-sub, #a9b8c7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main, #f2f6fa);
}

.action-btn.primary {
  background: var(--primary, #46b5d1);
  border-color: var(--primary, #46b5d1);
  color: var(--bg-card, #0d1b2a);
}

.action-btn.primary:hover {
  opacity: 0.9;
}

.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.34s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.26s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.96);
}
</style>
