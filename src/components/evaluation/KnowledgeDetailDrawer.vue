<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  BookOpenCheck,
  Gauge,
  Layers3,
  Target,
  X,
} from 'lucide-vue-next'
import type { AppleRenderData } from '@/types/knowledge-tree'

const props = defineProps<{
  apple: AppleRenderData | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()

const p = computed(() => props.apple?.point)
const mastery = computed(() => Math.round(p.value?.mastery ?? 0))
const changeValue = computed(() => {
  if (!p.value) return 0
  return p.value.mastery - p.value.previousMastery
})

const changeText = computed(() => {
  const diff = changeValue.value
  if (Math.abs(diff) < 0.1) return '与上次持平'
  return `${diff >= 0 ? '提升' : '下降'} ${Math.abs(diff).toFixed(1)}%`
})

const changeTone = computed(() => {
  if (Math.abs(changeValue.value) < 0.1) return 'flat'
  return changeValue.value >= 0 ? 'up' : 'down'
})

const statusLabel = computed(() => {
  const status = p.value?.status
  if (status === 'mastered' || status === 'proficient') return '已掌握'
  if (status === 'basic') return '基本掌握'
  if (status === 'beginner') return '初步掌握'
  if (status === 'weak') return '薄弱'
  if (status === 'none') return '尚未评估'
  return status || '待巩固'
})

const priorityLabel = computed(() => {
  const value = mastery.value
  if (value < 30) return '优先补齐'
  if (value < 60) return '专项巩固'
  if (value < 80) return '迁移训练'
  return '保持熟练'
})

const practiceSteps = computed(() => {
  if (mastery.value < 30) {
    return ['概念回看 6 分钟', '基础题 5 题', '错因复述 1 次']
  }
  if (mastery.value < 60) {
    return ['薄弱点定位', '变式训练 4 题', '讲解后复测']
  }
  return ['综合应用题', '迁移场景追问', '形成知识卡片']
})

function formatDate(iso: string) {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleString('zh-CN')
  } catch {
    return iso
  }
}

function startPractice() {
  const point = p.value
  if (!point?.id || !point.name) return
  router.push({
    path: '/tutoring',
    query: {
      source: 'evaluation',
      mode: 'practice',
      knowledgePointId: point.id,
      topic: point.name,
      module: point.module,
      unit: point.unit || '',
      mastery: String(Math.round(point.mastery)),
    },
  })
}
</script>

<template>
  <transition name="slide">
    <div v-if="apple" class="detail-drawer" role="complementary" aria-label="知识点诊断详情">
      <div class="drawer-topbar">
        <div class="drawer-pill">
          <Layers3 :size="14" />
          <span>{{ p?.module || '学习模块' }}</span>
        </div>
        <button class="icon-button" type="button" aria-label="关闭知识点详情" @click="emit('close')">
          <X :size="18" />
        </button>
      </div>

      <div class="drawer-body">
        <section class="diagnosis-hero">
          <div class="hero-copy">
            <span class="eyebrow">Knowledge diagnosis</span>
            <h2>{{ p?.name }}</h2>
            <p>{{ p?.unit || '本轮画像推荐知识点' }}</p>
          </div>

          <div class="mastery-orb" :style="{ '--accent': apple.color }">
            <strong>{{ mastery }}</strong>
            <span>掌握度</span>
          </div>
        </section>

        <div class="signal-row">
          <div>
            <span>状态</span>
            <strong>{{ statusLabel }}</strong>
          </div>
          <div>
            <span>变化</span>
            <strong :class="changeTone">{{ changeText }}</strong>
          </div>
          <div>
            <span>置信度</span>
            <strong>{{ p?.confidence.toFixed(0) }}%</strong>
          </div>
        </div>

        <section class="priority-panel">
          <div class="panel-title">
            <Target :size="16" />
            <span>{{ priorityLabel }}</span>
          </div>
          <p>{{ p?.recommendation || '先完成一轮短练习，再用结果刷新学习画像。' }}</p>
          <div class="mastery-track" aria-hidden="true">
            <span :style="{ width: `${mastery}%`, background: apple.color }" />
          </div>
        </section>

        <section class="drawer-section">
          <div class="section-title">
            <Gauge :size="15" />
            <span>诊断依据</span>
          </div>
          <p class="drawer-text">{{ p?.reasonAnalysis || '系统正在根据画像、练习记录和评估结果生成诊断。' }}</p>
          <div v-if="p?.recentError" class="error-note">{{ p.recentError }}</div>
        </section>

        <section class="practice-card">
          <div class="section-title">
            <BookOpenCheck :size="15" />
            <span>练习路径</span>
          </div>
          <ol>
            <li v-for="step in practiceSteps" :key="step">{{ step }}</li>
          </ol>
        </section>

        <dl class="meta-list">
          <div>
            <dt>最近评估</dt>
            <dd>{{ formatDate(p?.lastEvaluatedAt || '') }}</dd>
          </div>
          <div>
            <dt>权重</dt>
            <dd>{{ p?.weight.toFixed(2) }}</dd>
          </div>
        </dl>
      </div>

      <div class="drawer-actions">
        <button class="action-btn secondary" type="button" @click="emit('close')">稍后处理</button>
        <button class="action-btn primary" type="button" @click="startPractice">
          <span>开始练习</span>
          <ArrowRight :size="17" />
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.detail-drawer {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 500;
  display: flex;
  width: min(460px, 100vw);
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  color: #f8fafc;
  background:
    radial-gradient(circle at 18% 0%, rgba(34, 197, 94, 0.13), transparent 32%),
    radial-gradient(circle at 90% 18%, rgba(0, 212, 255, 0.11), transparent 28%),
    linear-gradient(180deg, rgba(8, 13, 28, 0.98), rgba(3, 7, 18, 0.99));
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    -26px 0 70px rgba(0, 0, 0, 0.44),
    inset 1px 0 0 rgba(255, 255, 255, 0.06);
  transform-origin: right center;
}

.detail-drawer::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(180deg, black, transparent 74%);
}

.drawer-topbar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 20px 12px;
}

.drawer-pill,
.icon-button {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(18px);
}

.drawer-pill {
  min-width: 0;
  gap: 8px;
  max-width: calc(100% - 54px);
  padding: 8px 10px;
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.82);
  font-size: 12px;
  font-weight: 700;
}

.drawer-pill span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-button {
  width: 38px;
  height: 38px;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 12px;
  color: rgba(226, 232, 240, 0.72);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transform: translateY(-1px);
}

.drawer-body {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding: 8px 20px 20px;
}

.drawer-body::-webkit-scrollbar {
  width: 4px;
}

.drawer-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.28);
}

.diagnosis-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 104px;
  gap: 16px;
  align-items: stretch;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.028)),
    rgba(15, 23, 42, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09);
}

.hero-copy {
  min-width: 0;
}

.eyebrow {
  display: block;
  margin-bottom: 9px;
  color: rgba(148, 163, 184, 0.82);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-copy h2 {
  margin: 0;
  color: #ffffff;
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.04;
  overflow-wrap: anywhere;
}

.hero-copy p {
  margin: 10px 0 0;
  color: rgba(203, 213, 225, 0.72);
  font-size: 13px;
  line-height: 1.6;
}

.mastery-orb {
  --accent: #22c55e;
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 104px;
  border: 1px solid color-mix(in srgb, var(--accent) 42%, transparent);
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 58%),
    rgba(2, 6, 23, 0.68);
  box-shadow: inset 0 0 24px color-mix(in srgb, var(--accent) 12%, transparent);
}

.mastery-orb strong {
  color: var(--accent);
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 34px;
  line-height: 1;
}

.mastery-orb span {
  margin-top: 7px;
  color: rgba(226, 232, 240, 0.66);
  font-size: 12px;
}

.signal-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.signal-row div,
.priority-panel,
.drawer-section,
.practice-card,
.meta-list {
  border: 1px solid rgba(255, 255, 255, 0.085);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

.signal-row div {
  min-width: 0;
  padding: 11px 12px;
  border-radius: 14px;
}

.signal-row span {
  display: block;
  margin-bottom: 7px;
  color: rgba(148, 163, 184, 0.78);
  font-size: 11px;
}

.signal-row strong {
  display: block;
  overflow: hidden;
  color: #f8fafc;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.signal-row strong.up {
  color: #22c55e;
}

.signal-row strong.down {
  color: #fb7185;
}

.priority-panel,
.drawer-section,
.practice-card {
  padding: 16px;
  border-radius: 16px;
}

.priority-panel {
  background:
    linear-gradient(135deg, rgba(34, 197, 94, 0.09), rgba(0, 212, 255, 0.045)),
    rgba(255, 255, 255, 0.035);
}

.panel-title,
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f8fafc;
  font-size: 13px;
  font-weight: 800;
}

.priority-panel p,
.drawer-text {
  margin: 10px 0 0;
  color: rgba(203, 213, 225, 0.78);
  font-size: 13px;
  line-height: 1.75;
}

.mastery-track {
  height: 8px;
  margin-top: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.mastery-track span {
  display: block;
  height: 100%;
  min-width: 4px;
  border-radius: inherit;
  transition: width 0.35s ease;
}

.error-note {
  margin-top: 12px;
  padding: 11px 12px;
  border: 1px solid rgba(251, 113, 133, 0.18);
  border-radius: 12px;
  color: #fecdd3;
  background: rgba(244, 63, 94, 0.09);
  font-size: 12px;
  line-height: 1.6;
}

.practice-card ol {
  display: grid;
  gap: 9px;
  margin: 13px 0 0;
  padding: 0;
  list-style: none;
}

.practice-card li {
  position: relative;
  min-height: 34px;
  padding: 8px 10px 8px 34px;
  border-radius: 12px;
  color: rgba(226, 232, 240, 0.86);
  background: rgba(15, 23, 42, 0.72);
  font-size: 13px;
}

.practice-card li::before {
  content: '';
  position: absolute;
  left: 13px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 14px rgba(34, 197, 94, 0.65);
  transform: translateY(-50%);
}

.meta-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px;
  gap: 1px;
  padding: 4px;
  border-radius: 16px;
}

.meta-list div {
  min-width: 0;
  padding: 10px 11px;
}

.meta-list dt {
  color: rgba(148, 163, 184, 0.74);
  font-size: 11px;
}

.meta-list dd {
  margin: 6px 0 0;
  overflow: hidden;
  color: rgba(248, 250, 252, 0.9);
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drawer-actions {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 10px;
  padding: 14px 20px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(3, 7, 18, 0.84);
  backdrop-filter: blur(18px);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn.secondary {
  color: rgba(226, 232, 240, 0.74);
  background: rgba(255, 255, 255, 0.045);
}

.action-btn.secondary:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.action-btn.primary {
  color: #03130a;
  border-color: rgba(34, 197, 94, 0.78);
  background: linear-gradient(135deg, #b7f7c8, #22c55e);
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.22);
}

.action-btn.primary:hover {
  border-color: rgba(187, 247, 208, 0.9);
  background: linear-gradient(135deg, #dcfce7, #4ade80);
}

@media (max-width: 520px) {
  .diagnosis-hero {
    grid-template-columns: 1fr;
  }

  .mastery-orb {
    min-height: 88px;
  }

  .signal-row,
  .drawer-actions,
  .meta-list {
    grid-template-columns: 1fr;
  }
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
  transform: translateX(100%) scale(0.98);
}
</style>
