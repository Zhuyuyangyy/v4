<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loaded = ref(false)

const features = [
  { icon: '◎', title: '智能画像', desc: '通过对话深度分析，构建你的多维度学习画像', color: '#00d4ff' },
  { icon: '▣', title: '个性化资源', desc: '文档、思维导图、习题、视频 — AI 根据你的需求生成', color: '#7c3aed' },
  { icon: '⇲', title: '学习路径', desc: '动态规划最优学习路线，因材施教', color: '#06d6a0' },
  { icon: '⊕', title: '智能辅导', desc: '7×24 即时答疑，多模态深度讲解', color: '#f59e0b' },
  { icon: '◈', title: '效果评估', desc: '数据驱动的学习分析，精准定位薄弱点', color: '#f43f5e' },
  { icon: '✦', title: '多智能体协同', desc: '多个 AI 智能体并行工作，为你生成最优质的内容', color: '#3b82f6' },
]

const quickQuestions = [
  '帮我制定一份 Python 机器学习的学习计划',
  '解释一下微积分中的泰勒展开',
  '为我生成一组数据结构练习题',
  '分析我的学习薄弱点',
]

const stats = [
  { value: '150万+', label: '学习者加入', icon: '◎' },
  { value: '3000+', label: '精品课程', icon: '▣' },
  { value: '98.7%', label: '学习效果提升', icon: '⇲' },
  { value: '1000+', label: '合作院校机构', icon: '⊕' },
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
})
</script>

<template>
  <div class="welcome">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg-glow" />
      <div class="hero-content">
        <div :class="['hero-badge', { visible: loaded }]">
          <span class="badge-dot" />
          AI × 教育 让学习更高效
        </div>
        <h1 :class="['hero-title', { visible: loaded }]">
          <span class="title-line">探索知识宇宙</span>
          <span class="title-line">成就<span class="text-gradient">无限可能</span></span>
        </h1>
        <p :class="['hero-sub', { visible: loaded }]">
          AI 驱动的个性化学习平台，连接优质内容与先进技术，<br>
          激发每一个学习者的潜能，面向未来，全面成长。
        </p>
        <div :class="['hero-actions', { visible: loaded }]">
          <button class="btn-primary" @click="router.push('/chat')">
            开始免费学习
            <span class="btn-arrow">→</span>
          </button>
          <button class="btn-ghost" @click="router.push('/profile')">
            了解平台优势
            <span class="btn-icon">◎</span>
          </button>
        </div>
        
        <div :class="['hero-stats', { visible: loaded }]">
          <div v-for="(stat, i) in stats" :key="i" class="stat-item">
            <span class="stat-icon">{{ stat.icon }}</span>
            <div class="stat-content">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Animated particles -->
      <div class="hero-particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          opacity: 0.3 + Math.random() * 0.5,
        }" />
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="section-header reveal">
        <h2 class="section-title">核心功能</h2>
        <p class="section-desc">全方位个性化学习体验</p>
      </div>
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          :class="['feature-card reveal', `reveal-delay-${i + 1}`]"
          :style="{ '--card-accent': f.color }"
        >
          <div class="card-icon">{{ f.icon }}</div>
          <h3 class="card-title">{{ f.title }}</h3>
          <p class="card-desc">{{ f.desc }}</p>
          <div class="card-glow" />
        </div>
      </div>
    </section>

    <!-- Quick Start -->
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
          <span class="question-icon">↗</span>
          <span class="question-text">{{ q }}</span>
          <span class="question-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>EduMind — Personalized Learning Multi-Agent System</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome {
  position: relative;
}

/* === Hero === */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 40px 60px;
  overflow: hidden;
  background-image: url('/shouye-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-bg-glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.08), transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s var(--ease-out);
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
  box-shadow: 0 0 8px var(--color-accent-cyan);
  animation: glow-pulse 2s ease-in-out infinite;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.15s;
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.title-line {
  display: block;
}

.text-gradient {
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0 0 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.3s;
}
.hero-sub.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.45s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.45);
}

.btn-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 500;
  transition: all var(--duration-fast) var(--ease-out);
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}
.btn-ghost:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
}

.btn-icon {
  font-size: 14px;
}

/* === Hero Stats === */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px 32px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.6s;
}
.hero-stats.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2));
  color: var(--color-accent-cyan);
  font-size: 16px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* === Particles === */
.hero-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  animation: float linear infinite;
}

/* === Sections === */
section {
  padding: 100px 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.section-desc {
  color: var(--color-text-secondary);
  font-size: 16px;
}

/* === Features Grid === */
.features {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  padding: 36px 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.feature-card:hover {
  border-color: var(--card-accent, var(--color-accent-cyan));
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--card-accent, var(--color-accent-cyan)), transparent);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.feature-card:hover .card-glow {
  opacity: 1;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 22px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: rgba(0, 212, 255, 0.06);
  color: var(--card-accent, var(--color-accent-cyan));
  line-height: 1;
}

.card-title {
  font-family: var(--font-display);
  font-size: 22px;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.card-desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

/* === Quick Questions === */
.questions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.question-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  text-align: left;
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.question-card:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
  transform: translateX(4px);
}

.question-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  border-radius: var(--radius-sm);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  flex-shrink: 0;
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

/* === Footer === */
.footer {
  padding: 40px 60px;
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.footer p {
  color: var(--color-text-tertiary);
  font-size: 13px;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

/* === Responsive === */
@media (max-width: 900px) {
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .questions-grid {
    grid-template-columns: 1fr;
  }
  section {
    padding: 60px 24px;
  }
  .hero-content {
    max-width: 100%;
  }
}
</style>