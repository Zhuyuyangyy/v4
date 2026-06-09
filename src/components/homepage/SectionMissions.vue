<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const actions = [
  {
    id: 'remedial',
    eyebrow: 'PATH + TUTOR',
    title: '先补一个关键薄弱点',
    desc: '二级指针和 BFS visited 是本轮路径里最影响后续学习的两个节点。',
    cta: '进入补弱路径',
    focus: 'remedial',
    tone: '#35e0d8',
  },
  {
    id: 'resource',
    eyebrow: 'RESOURCE',
    title: '把图结构做成可视资料',
    desc: '打开已经生成的思维导图、例题拆解和专项练习，不再从空白页开始。',
    cta: '查看推荐资源',
    focus: 'recommended',
    tone: '#f0b24a',
  },
  {
    id: 'evaluation',
    eyebrow: 'EVAL + FEEDBACK',
    title: '用一次小测刷新画像',
    desc: '评估结果会回写到画像和下一轮路径，让系统知道你是真的掌握了。',
    cta: '查看评估建议',
    focus: 'evaluation',
    tone: '#f0586e',
  },
  {
    id: 'dialogue',
    eyebrow: 'AI DIALOGUE',
    title: '和智能导师直接聊',
    desc: '不知道先做哪一步时，直接把困惑丢给 AI，它会继续补全画像并拆出下一步。',
    cta: '打开智能对话',
    focus: 'dialogue',
    tone: '#8fa7ff',
  },
]

const signals = [
  { label: '薄弱节点', value: '4', note: '已定位' },
  { label: '路径调整', value: '+3', note: '补救节点' },
  { label: '今日建议', value: '35', note: '分钟' },
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

function onActionClick(action: (typeof actions)[number]) {
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
    <div class="mission-shell">
      <img class="mission-bg-art mission-bg-art-soft" src="/homepage/next-step-left-atmosphere.png" alt="" aria-hidden="true">
      <img class="mission-bg-art" src="/homepage/next-action-beacon.png" alt="" aria-hidden="true">
      <div class="mission-orbit" aria-hidden="true">
        <span />
        <span />
      </div>

      <div class="mission-copy">
        <p class="mission-kicker">NEXT BEST STEP</p>
        <h2 id="next-step-title">你的下一步学习，已经整理好了。</h2>
        <p class="mission-desc">
          系统已经把画像、路径、资源和评估结果合成了一条更短的学习建议：
          今天先处理最卡人的薄弱点，再用小测把结果写回画像。
        </p>

        <div class="signal-row" aria-label="今日学习信号">
          <div v-for="signal in signals" :key="signal.label" class="signal-card">
            <strong>{{ signal.value }}</strong>
            <span>{{ signal.label }}</span>
            <small>{{ signal.note }}</small>
          </div>
        </div>
      </div>

      <div class="action-panel">
        <button
          v-for="action in actions"
          :key="action.id"
          type="button"
          class="action-card"
          :style="{ '--tone': action.tone }"
          @click="onActionClick(action)"
        >
          <span class="action-line" />
          <span class="action-meta">{{ action.eyebrow }}</span>
          <strong>{{ action.title }}</strong>
          <span class="action-desc">{{ action.desc }}</span>
          <span class="action-cta">{{ action.cta }} <i>↗</i></span>
        </button>
      </div>

      <div class="question-strip">
        <span>想自由问？</span>
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
  </section>
</template>

<style scoped>
.section-missions {
  position: relative;
  padding: 78px clamp(24px, 4vw, 56px) 88px;
}

.mission-shell {
  position: relative;
  max-width: 1760px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(420px, 1fr);
  gap: clamp(24px, 4vw, 58px);
  overflow: hidden;
  padding: clamp(28px, 4vw, 54px);
  border: 1px solid rgba(143, 167, 255, 0.18);
  border-radius: 28px;
  background:
    linear-gradient(120deg, rgba(8, 14, 34, 0.22), rgba(5, 10, 24, 0.06)),
    radial-gradient(circle at 16% 10%, rgba(53, 224, 216, 0.07), transparent 34%),
    radial-gradient(circle at 92% 24%, rgba(240, 178, 74, 0.05), transparent 30%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 72px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(4px) saturate(1.04);
}

.mission-shell::after {
  content: '';
  position: absolute;
  inset: 18px;
  pointer-events: none;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.mission-bg-art {
  position: absolute;
  top: 0;
  right: -8%;
  width: min(860px, 56vw);
  height: 100%;
  object-fit: cover;
  opacity: 0.64;
  mix-blend-mode: screen;
  filter: saturate(1.04) contrast(1.08);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.18) 10%, #000 30%, #000 100%);
  pointer-events: none;
}

.mission-bg-art-soft {
  top: -14%;
  left: -8%;
  right: auto;
  width: min(980px, 64vw);
  height: 132%;
  opacity: 0.22;
  filter: saturate(0.92) contrast(1.04);
  mask-image: radial-gradient(ellipse at 50% 50%, #000 0%, rgba(0, 0, 0, 0.7) 54%, transparent 88%);
}

.mission-orbit {
  position: absolute;
  inset: auto -120px -170px auto;
  width: 460px;
  height: 460px;
  border: 1px solid rgba(53, 224, 216, 0.16);
  border-radius: 50%;
  opacity: 0.9;
}

.mission-orbit span {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(143, 167, 255, 0.18);
}

.mission-orbit span:first-child {
  inset: 58px;
}

.mission-orbit span:last-child {
  inset: 128px;
}

.mission-copy,
.action-panel,
.question-strip {
  position: relative;
  z-index: 1;
}

.mission-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mission-kicker,
.action-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #35e0d8;
}

.mission-copy h2 {
  max-width: 760px;
  margin: 12px 0 16px;
  color: #f3f7ff;
  font-family: 'Instrument Serif', 'Noto Serif SC', serif;
  font-size: clamp(34px, 4.2vw, 64px);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.mission-desc {
  max-width: 660px;
  margin: 0;
  color: #9aa9c8;
  font-size: 15px;
  line-height: 1.85;
}

.signal-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 34px;
}

.signal-card {
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.022);
}

.signal-card strong {
  display: block;
  color: #ffffff;
  font-family: 'Instrument Serif', serif;
  font-size: 34px;
  font-weight: 500;
  line-height: 1;
}

.signal-card span,
.signal-card small {
  display: block;
  font-size: 12px;
}

.signal-card span {
  margin-top: 8px;
  color: #d7e3ff;
}

.signal-card small {
  margin-top: 2px;
  color: #667493;
}

.action-panel {
  display: grid;
  gap: 12px;
  align-content: center;
}

.action-card {
  --tone: #35e0d8;
  position: relative;
  display: grid;
  grid-template-columns: 6px 1fr auto;
  column-gap: 18px;
  align-items: center;
  min-height: 124px;
  padding: 20px 22px;
  text-align: left;
  color: #eef4ff;
  border: 1px solid color-mix(in srgb, var(--tone) 22%, rgba(255, 255, 255, 0.08));
  border-radius: 22px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--tone) 14%, transparent), transparent 46%),
    rgba(6, 11, 28, 0.34);
  cursor: pointer;
  transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
}

.action-card:hover {
  transform: translateX(-6px);
  border-color: color-mix(in srgb, var(--tone) 52%, rgba(255, 255, 255, 0.1));
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--tone) 22%, transparent), transparent 54%),
    rgba(8, 14, 34, 0.50);
}

.action-line {
  grid-row: 1 / span 4;
  width: 6px;
  height: 76px;
  border-radius: 999px;
  background: var(--tone);
  box-shadow: 0 0 18px color-mix(in srgb, var(--tone) 58%, transparent);
}

.action-meta,
.action-card strong,
.action-desc {
  grid-column: 2;
}

.action-card strong {
  margin-top: 8px;
  color: #f4f8ff;
  font-size: 19px;
  line-height: 1.25;
}

.action-desc {
  margin-top: 6px;
  color: #8fa0c0;
  font-size: 13px;
  line-height: 1.55;
}

.action-cta {
  grid-column: 3;
  grid-row: 1 / span 4;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: center;
  color: var(--tone);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.action-cta i {
  font-style: normal;
  transition: transform 0.24s ease;
}

.action-card:hover .action-cta i {
  transform: translate(3px, -3px);
}

.question-strip {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.question-strip span {
  color: #7281a1;
  font-size: 13px;
}

.question-strip button {
  border: 1px solid rgba(53, 224, 216, 0.18);
  border-radius: 999px;
  background: rgba(53, 224, 216, 0.06);
  color: #dce8ff;
  padding: 9px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.question-strip button:hover {
  transform: translateY(-1px);
  border-color: rgba(53, 224, 216, 0.42);
  background: rgba(53, 224, 216, 0.13);
}

@media (prefers-reduced-motion: reduce) {
  .action-card,
  .action-cta i,
  .question-strip button {
    transition: none !important;
  }
}

@media (max-width: 980px) {
  .mission-shell {
    grid-template-columns: 1fr;
  }

  .mission-bg-art {
    right: -42%;
    width: 118vw;
    opacity: 0.24;
  }

  .mission-bg-art-soft {
    left: -38%;
    width: 120vw;
    opacity: 0.16;
  }

  .action-card {
    grid-template-columns: 6px 1fr;
  }

  .action-cta {
    grid-column: 2;
    grid-row: auto;
    margin-top: 10px;
  }
}

@media (max-width: 640px) {
  .section-missions {
    padding: 54px 18px 64px;
  }

  .mission-shell {
    padding: 24px;
    border-radius: 22px;
  }

  .signal-row {
    grid-template-columns: 1fr;
  }
}
</style>
