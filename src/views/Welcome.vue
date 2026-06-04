<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroConstellation from '@/components/homepage/HeroConstellation.vue'
import AgentLiveTicker from '@/components/homepage/AgentLiveTicker.vue'
import SectionTelemetry from '@/components/homepage/SectionTelemetry.vue'
import SectionSkyline from '@/components/homepage/SectionSkyline.vue'
import SectionMissions from '@/components/homepage/SectionMissions.vue'
import TrainFlow from '@/views/TrainFlow.vue'

const loaded = ref(false)

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

    <!-- Hero constellation -->
    <HeroConstellation />

    <!-- TrainFlow: Multi-agent collaboration visualization -->
    <TrainFlow />

    <!-- Agent live ticker -->
    <AgentLiveTicker />

    <!-- Collaboration telemetry -->
    <SectionTelemetry />

    <!-- Knowledge skyline -->
    <SectionSkyline />

    <!-- Mission console -->
    <SectionMissions />

    <footer class="footer">
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

/* ── Cosmic background ── */
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

/* ── Section headers ── */
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

.section-kicker {
  color: var(--color-accent-cyan);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
}

/* ── Footer ── */
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

/* ── Responsive ── */
@media (max-width: 900px) {
  .agent-collab-section {
    padding: 40px 24px 60px;
  }
  .footer {
    padding: 32px 24px;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .cosmos-nebula,
  .cosmos-stars {
    animation: none !important;
  }
}
</style>
