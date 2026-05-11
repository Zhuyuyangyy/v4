<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loaded = ref(false)

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
  max-width: 650px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 24px 32px;
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  gap: 8px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(124, 58, 237, 0.3));
  color: #00d4ff;
  font-size: 18px;
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.3);
}

.stat-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
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
  position: relative;
  padding: 80px 60px;
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

.feature-card:hover {
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15);
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