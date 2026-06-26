<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Target, BookOpen, FileCheck, MessageCircle } from 'lucide-vue-next'
import type { Component } from 'vue'

const router = useRouter()

interface Action {
  id: string
  icon: Component
  title: string
  desc: string
  cta: string
  focus: string
  tone: string
  time: string
}

const actions: Action[] = [
  {
    id: 'remedial',
    icon: Target,
    title: '先补一个关键薄弱点',
    desc: '聚焦二级指针与 BFS visited，快速打通后续学习阻塞。',
    cta: '开始补弱',
    focus: 'remedial',
    tone: '#35e0d8',
    time: '15 min',
  },
  {
    id: 'resource',
    icon: BookOpen,
    title: '查看今日推荐资源',
    desc: '已生成思维导图、例题拆解和专项练习，直接开始。',
    cta: '开始学习',
    focus: 'recommended',
    tone: '#f0b24a',
    time: '20 min',
  },
  {
    id: 'evaluation',
    icon: FileCheck,
    title: '用一次小测刷新画像',
    desc: '评估结果会回写画像，让下轮路径更准确。',
    cta: '开始测评',
    focus: 'evaluation',
    tone: '#f0586e',
    time: '25 min',
  },
  {
    id: 'dialogue',
    icon: MessageCircle,
    title: '和智能导师聊聊',
    desc: '不知道先做哪一步？把困惑丢给 AI 导师。',
    cta: '开始对话',
    focus: 'dialogue',
    tone: '#8fa7ff',
    time: '10 min',
  },
]

const metrics = [
  { label: '今日推荐任务数', value: '4', unit: '个' },
  { label: '预计学习时长', value: '35', unit: 'min' },
  { label: '资源匹配度', value: '92', unit: '%' },
]

const quickQuestions = [
  '帮我解释二级指针',
  'BFS visited 到底什么时候标记？',
  '给我 20 分钟复习安排',
]

function goToResources(focus: string, extraQuery: Record<string, string> = {}) {
  router.push({
    name: 'edu-mind',
    query: {
      source: 'home',
      focus,
      ...extraQuery,
    },
  })
}

function onActionClick(action: Action) {
  if (action.id === 'dialogue') {
    router.push('/dialogue')
    return
  }
  goToResources(action.focus, { mission: action.id })
}

function askTutor(question: string) {
  router.push({ path: '/dialogue', query: { q: question } })
}
</script>

<template>
  <section class="section-missions" aria-labelledby="next-step-title">
    <div class="missions-inner">
      <header class="missions-header">
        <div>
          <div class="missions-eyebrow">NEXT BEST STEP</div>
          <h2 id="next-step-title">下一步学习建议</h2>
          <p class="missions-sub">基于画像与路径，为你精选今日最值得先做的学习任务。</p>
        </div>

        <div class="metrics-row">
          <div v-for="m in metrics" :key="m.label" class="metric-card glass-card">
            <div class="metric-label">{{ m.label }}</div>
            <div class="metric-value">{{ m.value }}<small>{{ m.unit }}</small></div>
          </div>
        </div>
      </header>

      <div class="actions-grid">
        <button
          v-for="action in actions"
          :key="action.id"
          type="button"
          class="action-card glass-card"
          :style="{ '--tone': action.tone }"
          @click="onActionClick(action)"
        >
          <div class="action-icon">
            <component :is="action.icon" :size="20" />
          </div>
          <div class="action-body">
            <div class="action-title">{{ action.title }}</div>
            <div class="action-desc">{{ action.desc }}</div>
            <div class="action-meta">
              <span class="action-time">{{ action.time }}</span>
              <span class="action-cta">{{ action.cta }}</span>
            </div>
          </div>
        </button>
      </div>

      <div class="quick-questions">
        <span class="quick-label">快速提问</span>
        <div class="question-chips">
          <button
            v-for="question in quickQuestions"
            :key="question"
            type="button"
            @click="askTutor(question)"
          >
            {{ question }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-missions {
  position: relative;
  padding: 24px;
  color: #e8edf5;
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.missions-inner {
  max-width: 1440px;
  margin: 0 auto;
}

.missions-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: end;
  margin-bottom: 18px;
}

.missions-eyebrow {
  font-size: 10px;
  font-weight: 600;
  color: #22d3ee;
  letter-spacing: 0.18em;
}

.missions-header h2 {
  margin: 8px 0 0;
  color: #f7fbff;
  font-size: 26px;
  font-weight: 760;
  line-height: 1.1;
}

.missions-sub {
  margin: 6px 0 0;
  color: #91a3c7;
  font-size: 13px;
  line-height: 1.6;
}

.metrics-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
  padding: 12px 16px;
}

.metric-label {
  font-size: 10px;
  color: #7f93ba;
  letter-spacing: 0.06em;
}

.metric-value {
  font-size: 24px;
  font-weight: 760;
  color: #f7fbff;
  line-height: 1;
}

.metric-value small {
  margin-left: 2px;
  font-size: 11px;
  color: #7f93ba;
  font-weight: 500;
}

.glass-card {
  position: relative;
  border-radius: 16px;
  padding: 16px;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(34, 211, 238, 0.04), transparent 46%),
    linear-gradient(180deg, rgba(12, 18, 38, 0.72), rgba(6, 10, 24, 0.55));
  border: 1px solid rgba(150, 175, 220, 0.10);
  backdrop-filter: blur(26px) saturate(1.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 18px 46px rgba(0, 0, 0, 0.22);
  isolation: isolate;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.35), transparent);
  opacity: 0.6;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.action-card {
  --tone: #22d3ee;
  appearance: none;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  text-align: left;
  color: inherit;
  border-color: color-mix(in srgb, var(--tone) 22%, rgba(255, 255, 255, 0.08));
  background:
    radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--tone) 10%, transparent), transparent 50%),
    linear-gradient(180deg, rgba(12, 18, 38, 0.72), rgba(6, 10, 24, 0.55));
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--tone) 50%, rgba(255, 255, 255, 0.1));
  background:
    radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--tone) 16%, transparent), transparent 52%),
    linear-gradient(180deg, rgba(14, 22, 46, 0.78), rgba(7, 12, 28, 0.60));
}

.action-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  flex: 0 0 auto;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 10%, rgba(255, 255, 255, 0.03));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tone) 22%, rgba(255, 255, 255, 0.06));
}

.action-body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.action-title {
  font-size: 15px;
  font-weight: 700;
  color: #f7fbff;
  line-height: 1.25;
}

.action-desc {
  font-size: 12px;
  color: #91a3c7;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.action-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.action-time {
  font-size: 10px;
  color: #7f93ba;
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.action-cta {
  font-size: 11px;
  font-weight: 700;
  color: var(--tone);
  padding: 5px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--tone) 10%, rgba(255, 255, 255, 0.03));
  border: 1px solid color-mix(in srgb, var(--tone) 28%, rgba(255, 255, 255, 0.08));
}

.quick-questions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(150, 175, 220, 0.08);
}

.quick-label {
  font-size: 12px;
  color: #7f93ba;
  font-weight: 600;
}

.question-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.question-chips button {
  appearance: none;
  cursor: pointer;
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.06);
  color: #dce8ff;
  padding: 8px 13px;
  font-size: 12px;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.question-chips button:hover {
  transform: translateY(-1px);
  border-color: rgba(34, 211, 238, 0.42);
  background: rgba(34, 211, 238, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .action-card,
  .question-chips button {
    transition: none !important;
  }
}

@media (max-width: 1100px) {
  .actions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .missions-header {
    grid-template-columns: 1fr;
  }

  .metrics-row {
    width: 100%;
  }

  .metric-card {
    flex: 1 1 0;
    min-width: 0;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .section-missions {
    padding: 16px;
  }

  .metrics-row {
    display: grid;
    grid-template-columns: 1fr;
  }

  .action-card {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
