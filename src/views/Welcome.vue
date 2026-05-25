<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'
import AgentTacticalMap from '@/components/agent-map/AgentTacticalMap.vue'
import LearningLoopDashboard from '@/components/dashboard/LearningLoopDashboard.vue'
import ThreeKnowledgeTree from '@/components/knowledge-tree/ThreeKnowledgeTree.vue'
import MultiAgentOrbit from '@/components/MultiAgentOrbit.vue'

const router = useRouter()
const loaded = ref(false)

useScrollReveal(0.12)

function scrollToAgents() {
  const el = document.querySelector('.tactical-map-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const features = [
  { image: '/shouye-background-tubiao-1.png', title: '画像驱动学习', desc: '根据学习行为、测评结果和提问记录构建学生画像，识别薄弱知识点与学习偏好', accent: '#00d4ff' },
  { image: '/shouye-background-tubiao-2.png', title: '路径动态规划', desc: '围绕课前预习、课中答疑、课后巩固、阶段测评和期末辅导生成个性化路径', accent: '#3b82f6' },
  { image: '/shouye-background-tubiao-3.png', title: '多智能体协同', desc: '画像、路径、资源、评估、反馈智能体协作完成学习闭环', accent: '#7c3aed' },
  { image: '/shouye-background-tubiao-4.png', title: '多模态资源生成', desc: '生成知识卡片、思维导图、练习题、错题解析和虚拟人讲解资源', accent: '#06d6a0' },
  { image: '/shouye-background-tubiao-5.png', title: '评估反向更新画像', desc: '测评不是结束，系统会根据错因和掌握度反向更新学生画像', accent: '#f59e0b' },
  { image: '/shouye-background-tubiao-6.png', title: '正反馈成长闭环', desc: '通过成长树、徽章、能力报告和路径优化形成持续学习激励', accent: '#f43f5e' },
]

const quickQuestions = [
  '帮我制定一份完整的学习计划（24 门课程）',
  'C 语言中指针和数组有什么区别？',
  '操作系统中的死锁是怎么产生的？',
  '解释一下机器学习中的过拟合',
]

const loopSteps = [
  { label: '画像', color: '#00d2ff' },
  { label: '资源', color: '#009dff' },
  { label: '路径', color: '#3859ff' },
  { label: '评估', color: '#7e3aff' },
  { label: '反馈', color: '#c42bff' },
  { label: '反向更新', color: '#ff2a9d' },
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
})
</script>

<template>
  <div class="welcome">
    <div class="cosmos-bg">
      <div class="cosmos-bg-image" />
      <div class="cosmos-nebula nebula-1" />
      <div class="cosmos-nebula nebula-2" />
      <div class="cosmos-nebula nebula-3" />
      <div class="cosmos-stars" />
      <div class="cosmos-vignette" />
    </div>

    <section class="hero">
      <div class="hero-content">
        <div :class="['hero-badge', { visible: loaded }]">
          <span class="badge-dot" />
          多智能体学习闭环
        </div>
        <h1 :class="['hero-title', { visible: loaded }]">
          让每一次学习<br>都反向优化画像
        </h1>
        <p :class="['hero-sub', { visible: loaded }]">
          基于科大讯飞 AI 能力构建画像、资源、路径、评估、反馈一体化学习系统。<br>
          多智能体协同生成个性化资源，评估后反向更新学生画像。
        </p>
        <div :class="['hero-actions', { visible: loaded }]">
          <button class="btn-primary" @click="router.push('/profile')">
            开始画像诊断
          </button>
          <button class="btn-ghost" @click="router.push('/learning-path')">
            查看学习路径
          </button>
        </div>
      </div>

      <div class="scroll-hint" @click="scrollToAgents">
        <span class="scroll-hint-text">闭环驾驶舱</span>
        <svg class="scroll-hint-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </section>

    <!-- 多智能体协作动画 -->
    <section class="agent-collab-section reveal">
      <div class="section-header">
        <p class="section-kicker">Multi-Agent Collaboration</p>
        <h2 class="section-title agent-collab-title">五大智能体，实时协同</h2>
        <p class="section-desc">画像驱动路径规划，资源匹配评估反馈 — 数据在智能体之间无缝流转</p>
      </div>
      <MultiAgentOrbit />
    </section>

    <LearningLoopDashboard />

    <!-- 多智能体战术地图 -->
    <section class="tactical-map-section reveal">
      <div class="section-header">
        <p class="section-kicker">Multi-Agent Tactical Map</p>
        <h2 class="section-title">多智能体协同作战地图</h2>
        <p class="section-desc">实时监控六大智能体的运行状态、数据流转与协作关系</p>
      </div>
      <div class="tactical-intro">
        <div>
          <p class="section-kicker">Caosmos-Inspired Agent Command</p>
          <h2 class="section-title">多智能体协作控制台</h2>
          <p class="section-desc">把画像、路径、资源、评估、反馈和画像更新放进同一张实时战术地图，看到数据如何在智能体之间流动。</p>
        </div>
        <div class="tactical-head-rail" aria-hidden="true">
          <span>World View</span>
          <span>Live Signals</span>
          <span>Learning Loop</span>
        </div>
      </div>
      <AgentTacticalMap />
    </section>

    <!-- 原始协作链展示（保留作为补充） -->
    <section class="features">
      <div class="section-header reveal">
        <h2 class="section-title">核心能力矩阵</h2>
        <p class="section-desc">画像、资源、路径、评估、正反馈、反向更新画像</p>
      </div>
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          :class="[
            'feature-card reveal',
            `reveal-delay-${i + 1}`,
            {
              'feature-card-wide': i === 0 || i === 3 || i === 5,
              'feature-card-model': i === 5,
            },
          ]"
          :style="{ '--card-accent': f.accent }"
        >
          <div class="card-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="card-body">
            <h3 class="card-title">{{ f.title }}</h3>
            <p class="card-desc">{{ f.desc }}</p>
          </div>
          <div class="card-image-wrapper">
            <ThreeKnowledgeTree v-if="i === 5" :height="150" class="card-tree-model" />
            <img v-else :src="f.image" :alt="f.title" class="card-image" />
          </div>
        </div>
      </div>
    </section>

    <section class="loop-bar-section reveal">
      <div class="loop-bar">
        <template v-for="(step, i) in loopSteps" :key="step.label">
          <span class="loop-node" :style="{ '--loop-color': step.color }">{{ step.label }}</span>
          <span v-if="i < loopSteps.length - 1" class="loop-arrow">→</span>
        </template>
        <span class="loop-arrow loop-arrow-return">→</span>
        <span class="loop-node loop-node-return" :style="{ '--loop-color': loopSteps[0].color }">{{ loopSteps[0].label }}</span>
      </div>
      <p class="loop-bar-caption">评估不是终点，而是下一轮画像更新和路径优化的起点</p>
    </section>

    <section class="quick-start">
      <div class="section-header reveal">
        <h2 class="section-title">快速开始</h2>
        <p class="section-desc">选择一个问题，立即开启对话</p>
      </div>
      <div class="questions-grid">
        <button
          v-for="(q, i) in quickQuestions"
          :key="i"
          :class="['question-card reveal', `reveal-delay-${i + 1}`]"
          @click="router.push('/chat')"
        >
          <span class="question-text">{{ q }}</span>
          <span class="question-arrow">→</span>
        </button>
      </div>
    </section>

    <footer class="footer reveal">
      <p>多智能体学习闭环 · 科大讯飞 AI 教育系统</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome {
  position: relative;
  min-height: 100vh;
  background: transparent;
}

.cosmos-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.cosmos-bg-image {
  position: absolute;
  inset: 0;
  background-image: url('/shouye-background-2.png');
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  opacity: 0.45;
}

.cosmos-nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: nebulaDrift 20s ease-in-out infinite alternate;
}

.nebula-1 {
  top: -15%;
  left: -10%;
  width: 600px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.04), transparent 70%);
  animation-duration: 25s;
}

.nebula-2 {
  top: 30%;
  right: -8%;
  width: 500px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(124, 58, 237, 0.06), rgba(59, 130, 246, 0.03), transparent 70%);
  animation-duration: 30s;
  animation-delay: -5s;
}

.nebula-3 {
  bottom: -10%;
  left: 20%;
  width: 700px;
  height: 450px;
  background: radial-gradient(ellipse, rgba(6, 214, 160, 0.04), rgba(0, 212, 255, 0.03), transparent 70%);
  animation-duration: 22s;
  animation-delay: -10s;
}

@keyframes nebulaDrift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -20px) scale(1.05); }
}

.cosmos-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(1px 1px at 25% 45%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1.5px 1.5px at 40% 15%, rgba(0, 212, 255, 0.5), transparent),
    radial-gradient(1px 1px at 55% 70%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 70% 30%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1.5px 1.5px at 85% 55%, rgba(124, 58, 237, 0.4), transparent),
    radial-gradient(1px 1px at 15% 80%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 90% 10%, rgba(0, 212, 255, 0.3), transparent),
    radial-gradient(1px 1px at 50% 90%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 35% 60%, rgba(59, 130, 246, 0.4), transparent),
    radial-gradient(1px 1px at 65% 85%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 80% 75%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 5% 55%, rgba(0, 212, 255, 0.35), transparent),
    radial-gradient(1px 1px at 45% 35%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1.5px 1.5px at 95% 45%, rgba(124, 58, 237, 0.3), transparent),
    radial-gradient(1px 1px at 20% 95%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 75% 5%, rgba(0, 212, 255, 0.4), transparent),
    radial-gradient(1px 1px at 60% 50%, rgba(255, 255, 255, 0.3), transparent);
  animation: twinkle 8s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

.cosmos-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 16, 0.6) 100%);
}

.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 60px 60px;
  overflow: hidden;
  z-index: 1;
}

.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.04), transparent 70%);
  pointer-events: none;
  animation: heroGlow 6s ease-in-out infinite alternate;
}

@keyframes heroGlow {
  0% { opacity: 0.7; transform: translateX(-50%) scale(1); }
  100% { opacity: 1; transform: translateX(-50%) scale(1.05); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.15);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out) 0.15s, transform 0.6s var(--ease-out) 0.15s;
  color: #fff;
  font-weight: 400;
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-sub {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0 0 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out) 0.3s, transform 0.6s var(--ease-out) 0.3s;
  font-weight: 400;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}
.hero-sub.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out) 0.45s, transform 0.6s var(--ease-out) 0.45s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 32px;
  border-radius: var(--radius-md);
  background: var(--color-accent-cyan);
  color: var(--color-text-inverse);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.25);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
  background: transparent;
  cursor: pointer;
}
.btn-ghost:hover {
  border-color: rgba(0, 212, 255, 0.4);
  color: var(--color-accent-cyan);
}

.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  animation: floatHint 2.5s ease-in-out infinite;
}

.scroll-hint-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.scroll-hint-arrow {
  color: rgba(0, 212, 255, 0.35);
  width: 18px;
  height: 18px;
}

.scroll-hint:hover .scroll-hint-text {
  color: rgba(255, 255, 255, 0.5);
}

.scroll-hint:hover .scroll-hint-arrow {
  color: rgba(0, 212, 255, 0.6);
}

@keyframes floatHint {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

section {
  padding: 80px 60px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.5vw, 36px);
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 400;
  text-wrap: balance;
}

.section-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
  margin: 0;
}

.features {
  position: relative;
  padding: 80px 60px;
  z-index: 1;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  padding: 32px 28px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out);
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}

.feature-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--card-accent);
  opacity: 0;
  transition: opacity 0.3s var(--ease-out);
}

.feature-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-4px);
}

.feature-card:hover::after {
  opacity: 0.6;
}

.feature-card-wide {
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
}

.feature-card-wide .card-body {
  flex: 1;
}

.feature-card-wide .card-image-wrapper {
  width: 120px;
  height: 90px;
  flex-shrink: 0;
}

.feature-card-model .card-image-wrapper {
  width: 190px;
  height: 150px;
  background: rgba(0, 0, 0, 0.16);
}

.card-number {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--card-accent);
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  letter-spacing: -0.01em;
}

.card-desc {
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.card-image-wrapper {
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(0, 212, 255, 0.04);
  overflow: hidden;
}

.feature-card-wide .card-image-wrapper {
  display: flex;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.card-tree-model {
  width: 100%;
  height: 100%;
}

.card-tree-model :deep(.three-tree-wrapper) {
  border: 0;
  border-radius: 12px;
  background: transparent;
}

.card-tree-model :deep(.three-tree-hint) {
  display: none;
}

.loop-bar-section {
  padding: 48px 60px;
  text-align: center;
}

.loop-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto 16px;
}

.loop-node {
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--loop-color);
  background: color-mix(in srgb, var(--loop-color) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--loop-color) 20%, transparent);
  transition: background 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
}

.loop-node:hover {
  background: color-mix(in srgb, var(--loop-color) 14%, transparent);
  border-color: color-mix(in srgb, var(--loop-color) 40%, transparent);
}

.loop-arrow {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.15);
  font-weight: 300;
}

.loop-arrow-return {
  color: rgba(0, 212, 255, 0.3);
  font-weight: 400;
}

.loop-node-return {
  border-style: dashed;
}

.loop-bar-caption {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.02em;
  margin: 0;
}

.quick-start {
  padding: 80px 60px;
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  max-width: 760px;
  margin: 0 auto;
}

.question-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: left;
  transition: border-color var(--duration-normal) var(--ease-out), background var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.question-card:hover {
  border-color: rgba(0, 212, 255, 0.25);
  background: rgba(0, 212, 255, 0.03);
  transform: translateX(4px);
}

.question-text {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.question-arrow {
  color: var(--color-text-tertiary);
  font-size: 14px;
  transition: transform var(--duration-fast) var(--ease-out);
}
.question-card:hover .question-arrow {
  color: var(--color-accent-cyan);
  transform: translateX(4px);
}

.footer {
  padding: 48px 60px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
}

.footer p {
  color: var(--color-text-tertiary);
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.tactical-map-section {
  max-width: 1460px;
  margin: 0 auto;
  padding: 54px 32px 86px;
  position: relative;
  z-index: 1;
}

.tactical-map-section > .section-header {
  display: none;
}

.tactical-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 28px;
  margin: 0 auto 24px;
  padding: 0 8px;
}

.tactical-intro .section-kicker,
.tactical-intro .section-title,
.tactical-intro .section-desc {
  text-align: left;
}

.tactical-intro .section-desc {
  max-width: 680px;
  line-height: 1.7;
}

.tactical-head-rail {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-radius: 999px;
  border: 1px solid rgba(125, 211, 252, 0.14);
  background: rgba(2, 6, 23, 0.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.tactical-head-rail span {
  padding: 7px 12px;
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.68);
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(100, 116, 139, 0.16);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.section-kicker {
  color: var(--color-accent-cyan);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .feature-card-wide {
    grid-column: span 1;
    flex-direction: column;
  }
  .feature-card-wide .card-image-wrapper {
    display: none;
  }
  .feature-card-model .card-image-wrapper {
    display: flex;
    width: 100%;
    height: 180px;
  }
  .questions-grid {
    grid-template-columns: 1fr;
  }
  section {
    padding: 60px 24px;
  }
  .tactical-intro {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .tactical-head-rail {
    width: 100%;
    overflow-x: auto;
  }
  .hero {
    padding: 60px 24px 40px;
    min-height: 70vh;
  }
  .loop-bar {
    gap: 4px;
  }
  .loop-node {
    padding: 6px 14px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}

.agent-collab-section {
  padding: 60px 40px 80px;
  max-width: 1100px;
  margin: 0 auto;
}

.agent-collab-title {
  text-wrap: balance;
}

@media (prefers-reduced-motion: reduce) {
  .cosmos-nebula,
  .cosmos-stars,
  .scroll-hint {
    animation: none !important;
  }
  .hero-badge,
  .hero-title,
  .hero-sub,
  .hero-actions {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
