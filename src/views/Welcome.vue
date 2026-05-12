<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Target, BarChart2, Map, BookOpen, ClipboardCheck, Sliders } from 'lucide-vue-next'
import { useScrollReveal } from '@/composables/useScrollReveal'

const router = useRouter()
const loaded = ref(false)

useScrollReveal(0.12)

const features = [
  { image: '/shouye-background-tubiao-1.png', title: 'AI 智能推荐', desc: '基于学习行为和能力画像，为你推荐最合适的内容' },
  { image: '/shouye-background-tubiao-2.png', title: '个性化学习', desc: '量身定制学习路径，因材施教，精准提升' },
  { image: '/shouye-background-tubiao-3.png', title: 'AI 导师陪伴', desc: '7×24 小时在线辅导，随时解答学习问题' },
  { image: '/shouye-background-tubiao-4.png', title: '多模态内容', desc: '视频、音频、图文、互动，多种形式激发学习' },
  { image: '/shouye-background-tubiao-5.png', title: '学练测评一体化', desc: '学习 - 练习 - 测评 - 反馈，闭环学习更高效' },
  { image: '/shouye-background-tubiao-6.png', title: '数据驱动成长', desc: '学习数据可视化，成长轨迹清晰可见' },
]

const quickQuestions = [
  '帮我制定一份 Python 机器学习的学习计划',
  '解释一下微积分中的泰勒展开',
  '为我生成一组数据结构练习题',
  '分析我的学习薄弱点',
]

const stats = [
  { value: '150万+', label: '活跃学习者', icon: '◎' },
  { value: '3000+', label: '精品课程', icon: '▣' },
  { value: '98.7%', label: '学习效果提升', icon: '⇲' },
  { value: '1000+', label: '合作机构', icon: '⊕' },
]

const learningSteps = [
  {
    num: "01",
    title: "目标设定",
    color: "#00d2ff",
    icon: Target,
    desc: "明确目标，制定计划"
  },
  {
    num: "02",
    title: "能力评估",
    color: "#009dff",
    icon: BarChart2,
    desc: "多维测评，定位短板"
  },
  {
    num: "03",
    title: "路径规划",
    color: "#3859ff",
    icon: Map,
    desc: "AI推荐，最优路径"
  },
  {
    num: "04",
    title: "学习执行",
    color: "#7e3aff",
    icon: BookOpen,
    desc: "沉浸学习，掌握知识"
  },
  {
    num: "05",
    title: "阶段测评",
    color: "#c42bff",
    icon: ClipboardCheck,
    desc: "阶段测评，查漏补缺"
  },
  {
    num: "06",
    title: "调整优化",
    color: "#ff2a9d",
    icon: Sliders,
    desc: "数据驱动，动态调整"
  }
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
          <span class="title-line">A I 知识宇宙</span>
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
            <span class="btn-icon">↗</span>
          </button>
        </div>
        
        <div :class="['hero-stats', { visible: loaded }]">
          <div v-for="(stat, i) in stats" :key="i" class="stat-item">
            <span class="stat-icon">{{ stat.icon }}</span>
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
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
        <h2 class="section-title">我们的平台优势</h2>
        <div class="section-divider">
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
        </div>
      </div>
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          :class="['feature-card reveal', `reveal-delay-${i + 1}`]"
        >
          <div class="card-image-wrapper">
            <img :src="f.image" :alt="f.title" class="card-image" />
          </div>
          <h3 class="card-title">{{ f.title }}</h3>
          <p class="card-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="learning-path">
      <div class="lp-bg-stars"></div>
      <div class="lp-bg-line-1"></div>
      <div class="lp-bg-line-2"></div>
      <div class="lp-bg-grid"></div>
      <div class="lp-bg-planet-large"></div>
      <div class="lp-bg-planet-ring"></div>
      
      <div class="lp-card">
        <div class="lp-header reveal">
          <h2 class="lp-title">个性化学习路径</h2>
          <p class="lp-subtitle">从目标到掌握，步步精准</p>
          <div class="lp-divider"></div>
        </div>

        <div class="lp-timeline">
          <div class="lp-timeline-track">
              <div class="lp-timeline-line"></div>
              <div class="lp-timeline-nodes">
                <div
                  v-for="(step, i) in learningSteps"
                  :key="`node-${i}`"
                  :class="['lp-node reveal', `reveal-delay-${i + 1}`]"
                  :style="{ '--node-index': i }"
                >
                  <span class="lp-node-num">{{ step.num }}</span>
                  <span class="lp-node-title">{{ step.title }}</span>
                  <div class="lp-node-dot" :style="{ '--dot-color': step.color }"></div>
                </div>
              </div>
            </div>

          <div class="lp-icons-row">
            <div
              v-for="(step, i) in learningSteps"
              :key="`icon-${i}`"
              :class="['lp-icon-wrapper reveal', `reveal-delay-${i + 1}`]"
              :style="{ '--icon-color': step.color, '--node-index': i }"
            >
              <div class="lp-icon-container">
                <div class="lp-icon-bg"></div>
                <div class="lp-icon-ring lp-ring-pulse"></div>
                <component :is="step.icon" class="lp-icon" stroke-width="1.5" />
              </div>
            </div>
          </div>

          <div class="lp-desc-row">
            <div
              v-for="(step, i) in learningSteps"
              :key="`desc-${i}`"
              :class="['lp-desc reveal', `reveal-delay-${i + 1}`]"
              v-html="step.desc"
            ></div>
          </div>
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
    <footer class="footer reveal">
      <p>EduMind — Personalized Learning Multi-Agent System</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome {
  position: relative;
  min-height: 100vh;
  background-image: url('/shouye-background-2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
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

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(7, 7, 13, 0.6) 100%);
  pointer-events: none;
  z-index: 1;
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
  animation: pulse-glow 4s ease-in-out infinite;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 650px;
  left: 100px;
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
  font-size: clamp(52px, 8vw, 80px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.15s;
  color: #fff;
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.title-line {
  display: block;
}

.text-gradient {
  background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-sub {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.75;
  margin: 0 0 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out) 0.3s;
  font-weight: 400;
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
  gap: 10px;
  padding: 16px 40px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.4);
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px rgba(124, 58, 237, 0.5);
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
  gap: 10px;
  padding: 16px 36px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  font-weight: 500;
  transition: all var(--duration-fast) var(--ease-out);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
}
.btn-ghost:hover {
  border-color: rgba(0, 212, 255, 0.6);
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.btn-icon {
  font-size: 14px;
}

/* === Hero Stats === */
.hero-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 32px;
  padding: 28px 40px;
  border-radius: 20px;
  background: rgba(10, 20, 40, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2));
  color: #00d4ff;
  font-size: 20px;
  box-shadow: 
    0 0 20px rgba(0, 212, 255, 0.3),
    inset 0 0 15px rgba(0, 212, 255, 0.1);
}

.stat-value {
  font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 34px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1;
  text-shadow: 0 0 25px rgba(0, 212, 255, 0.6);
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  letter-spacing: 0.05em;
  font-weight: 500;
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
}

.section-title {
  font-family: var(--font-display);
  font-size: 36px;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 0;
}

.section-desc {
  color: var(--color-text-secondary);
  font-size: 16px;
}

/* === Features Grid === */
.features {
  background-image: url('/shouye-background-2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  padding: 80px 60px;
}

.features::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  pointer-events: none;
  z-index: 1;
}

.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.divider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.6);
}

.divider-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 60px auto 0;
}

.feature-card {
  position: relative;
  padding: 40px 24px;
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.03) 0%, transparent 100%);
  pointer-events: none;
}

.feature-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.6s var(--ease-out);
  pointer-events: none;
}

.feature-card:hover {
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15);
}

.feature-card:hover::after {
  opacity: 1;
  animation: gradient-rotate 3s linear infinite;
}

.feature-card:nth-child(odd) .card-image-wrapper {
  animation: float-slow 6s ease-in-out infinite;
}

.feature-card:nth-child(even) .card-image-wrapper {
  animation: float-slow 6s ease-in-out infinite;
  animation-delay: -3s;
}

.card-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  width: 160px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  border-radius: var(--radius-lg);
  background: rgba(0, 212, 255, 0.08);
  overflow: hidden;
}

.card-image {
  width: 160px;
  height: 120px;
  object-fit: cover;
  object-position: center center;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
  transition: transform var(--duration-normal) var(--ease-out);
}

.feature-card:hover .card-image {
  transform: scale(1.05);
}

.card-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.card-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
  position: relative;
  z-index: 1;
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

/* === Learning Path === */
.learning-path {
  position: relative;
  min-height: 600px;
  padding: 80px 60px;
  background: transparent;
  overflow: hidden;
}

.lp-bg-stars,
.lp-bg-line-1,
.lp-bg-line-2,
.lp-bg-grid,
.lp-bg-planet-large,
.lp-bg-planet-ring {
  display: none;
}

.lp-card {
  position: relative;
  z-index: 10;
  max-width: 1140px;
  margin: 0 auto;
  background: rgba(10, 16, 36, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 40px 56px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.lp-header {
  text-align: left;
  margin-bottom: 40px;
}

.lp-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #f0f6ff;
  margin: 0 0 10px;
}

.lp-subtitle {
  font-size: 14px;
  color: #7b8c9e;
  letter-spacing: 0.15em;
  font-weight: 300;
  margin: 0 0 16px;
}

.lp-divider {
  width: 50px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(to right, #00d2ff, #7e3aff);
}

.lp-timeline {
  overflow-x: auto;
  padding-bottom: 16px;
}

.lp-timeline-track {
  position: relative;
  min-width: 900px;
}

.lp-timeline-line {
  position: absolute;
  top: 100px;
  left: calc(100% / 12);
  right: calc(100% / 12);
  height: 3px;
  background: linear-gradient(to right, #00d2ff, #009dff, #3859ff, #7e3aff, #c42bff, #ff2a9d);
  background-size: 200% 100%;
  border-radius: 3px;
  box-shadow: 0 0 15px rgba(126, 58, 255, 0.4);
  animation: line-gradient-shift 4s ease-in-out infinite;
}

@keyframes line-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.lp-timeline-nodes {
  display: flex;
  justify-content: space-between;
  padding: 0 calc(100% / 12);
}

.lp-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

.lp-node-num {
  font-size: 24px;
  font-weight: 700;
  color: var(--dot-color, #00d2ff);
}

.lp-node-title {
  font-size: 14px;
  font-weight: 500;
  color: #e2e8f0;
  letter-spacing: 0.05em;
}

.lp-node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--dot-color);
  box-shadow: 
    0 0 15px var(--dot-color), 
    0 0 30px color-mix(in srgb, var(--dot-color) 40%, transparent),
    inset 0 0 2px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

.lp-icons-row {
  display: flex;
  justify-content: space-between;
  padding: 0 8.333%;
  margin-top: 20px;
}

.lp-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  width: 68px;
  animation: icon-float 4s ease-in-out infinite;
  animation-delay: calc(var(--node-index, 0) * 0.3s);
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.lp-icon-container {
  position: relative;
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lp-icon-bg {
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(10, 16, 36, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.lp-icon-ring {
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid var(--icon-color);
  box-shadow: 0 0 12px var(--icon-color), 0 0 30px color-mix(in srgb, var(--icon-color) 30%, transparent);
  transition: all 0.3s ease;
}

.lp-ring-pulse {
  animation: icon-ring-pulse 3s ease-in-out infinite;
  animation-delay: calc(var(--node-index, 0) * 0.3s);
}

	@keyframes icon-ring-pulse {
	  0%, 100% { opacity: 0.6; }
	  50% { opacity: 1; }
	}

.lp-icon-wrapper:hover .lp-icon-ring {
  transform: scale(1.05);
}

.lp-icon {
  position: relative;
  width: 24px;
  height: 24px;
  color: var(--icon-color);
  filter: drop-shadow(0 0 8px var(--icon-color));
  transition: all 0.3s ease;
  z-index: 1;
}

.lp-icon-wrapper:hover .lp-icon {
  transform: scale(1.1);
}

.lp-desc-row {
  display: flex;
  justify-content: space-between;
  padding: 0 8.333%;
  margin-top: 6px;
}

.lp-desc {
  width: 68px;
  text-align: center;
  font-size: 11px;
  color: #7b8c9e;
  line-height: 1.6;
  letter-spacing: 0.01em;
  font-weight: 400;
  white-space: nowrap;
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