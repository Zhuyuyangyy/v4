<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LoginPanel from '@/components/login/LoginPanel.vue'

const rootRef = ref<HTMLElement | null>(null)
let mediaQuery: MediaQueryList | null = null
const isMobile = ref(false)

function updateCompact(event?: MediaQueryListEvent | MediaQueryList) {
  isMobile.value = Boolean(event?.matches ?? mediaQuery?.matches)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 900px)')
  updateCompact(mediaQuery)
  mediaQuery.addEventListener('change', updateCompact)
  document.body.classList.add('login-page-active')
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateCompact)
  document.body.classList.remove('login-page-active')
})
</script>

<template>
  <main ref="rootRef" class="login-view">
    <div class="login-bg" aria-hidden="true">
      <div class="bg-image" />
      <div class="bg-overlay-dark" />
      <div class="bg-grid-fine" />
      <div class="bg-glow-orb orb-1" />
      <div class="bg-glow-orb orb-2" />
      <div class="bg-glow-orb orb-3" />
      <div class="bg-vignette" />
      <div class="bg-particles">
        <span v-for="i in 40" :key="i" class="particle" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${4 + Math.random() * 4}s`,
          opacity: 0.2 + Math.random() * 0.5,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`
        }" />
      </div>
    </div>

    <div class="split-layout">
      <section class="visual-pane" aria-label="多智能体学习中枢展示">
        <div class="visual-bg-image" aria-hidden="true"></div>
        <div class="visual-overlay-gradient" aria-hidden="true"></div>
        <div class="visual-overlay-grid" aria-hidden="true"></div>
        <div class="visual-particles" aria-hidden="true">
          <span v-for="i in 25" :key="i" class="particle" :style="{
            left: `${Math.random() * 70}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.5,
            width: `${1.5 + Math.random() * 2}px`,
            height: `${1.5 + Math.random() * 2}px`
          }" />
        </div>
      </section>

      <section class="auth-pane" aria-label="登录面板">
        <div class="auth-panel-wrapper">
          <LoginPanel />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.login-view {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #f0f6ff;
  background: #02060f;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei UI', sans-serif;
  isolation: isolate;
}

.login-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bg-image {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 1200px 800px at 25% 45%, rgba(0, 120, 255, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse 800px 600px at 35% 50%, rgba(0, 80, 180, 0.15) 0%, transparent 60%),
    linear-gradient(135deg,
      #01040d 0%,
      #030a1c 20%,
      #06122e 45%,
      #081a42 70%,
      #050f25 100%
    );
}

.bg-overlay-dark {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 0%, rgba(0, 5, 15, 0.3) 60%, rgba(0, 5, 15, 0.5) 100%);
}

.bg-grid-fine {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(0, 180, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 180, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%);
}

.bg-glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: orb-breathe 8s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  top: 15%;
  left: 10%;
  background: radial-gradient(circle, rgba(0, 120, 255, 0.2), transparent 70%);
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 25%;
  background: radial-gradient(circle, rgba(0, 180, 255, 0.15), transparent 70%);
  animation-delay: -2.5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  bottom: 10%;
  left: 20%;
  background: radial-gradient(circle, rgba(50, 150, 255, 0.12), transparent 70%);
  animation-delay: -5s;
}

@keyframes orb-breathe {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.15);
  }
}

.bg-vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%);
}

.bg-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(100, 200, 255, 0.8);
  border-radius: 50%;
  animation: particle-float linear infinite;
  box-shadow: 0 0 6px rgba(100, 200, 255, 0.6);
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
    opacity: 0;
  }
}

.split-layout {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 100vh;
}

.visual-pane {
  position: relative;
  flex: 0 0 60%;
  min-width: 0;
  overflow: hidden;
}

.visual-bg-image {
  position: absolute;
  inset: 0;
  background-image: url('/login-bg.jpg');
  background-size: cover;
  background-position: center left;
  background-repeat: no-repeat;
}

.visual-overlay-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg,
      rgba(0, 10, 30, 0.15) 0%,
      rgba(0, 10, 30, 0.3) 50%,
      rgba(2, 8, 20, 0.75) 85%,
      #02060f 100%
    );
}

.visual-overlay-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 180, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 180, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 70%);
  -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 70%);
}

.visual-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.visual-particles .particle {
  position: absolute;
  background: rgba(100, 220, 255, 0.9);
  border-radius: 50%;
  animation: particle-float linear infinite;
  box-shadow: 0 0 8px rgba(100, 220, 255, 0.7);
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(30px);
    opacity: 0;
  }
}

.auth-pane {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 56px;
  background: #02060f;
}

.auth-pane::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg,
    transparent,
    rgba(0, 180, 255, 0.25) 20%,
    rgba(0, 200, 255, 0.4) 50%,
    rgba(0, 180, 255, 0.25) 80%,
    transparent
  );
  z-index: 2;
}

.auth-panel-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  animation: wrapper-breath 4s ease-in-out infinite;
}

@keyframes wrapper-breath {
  0%, 100% {
    filter: drop-shadow(0 20px 50px rgba(0, 80, 180, 0.2));
  }
  50% {
    filter: drop-shadow(0 30px 80px rgba(0, 130, 230, 0.4));
  }
}

@media (max-width: 1200px) {
  .visual-pane {
    flex: 0 0 55%;
  }
  .auth-pane { padding: 32px 40px; }
}

@media (max-width: 900px) {
  .split-layout { flex-direction: column; }
  .visual-pane {
    min-height: 35vh;
    flex: 0 0 35vh;
  }
  .visual-bg-image {
    background-position: center top;
  }
  .visual-overlay-gradient {
    background:
      linear-gradient(180deg,
        rgba(0, 10, 30, 0.1) 0%,
        rgba(0, 10, 30, 0.4) 60%,
        #02060f 100%
      );
  }
  .auth-pane {
    flex: 1;
    padding: 24px;
  }
  .auth-pane::before {
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    width: auto;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(0, 180, 255, 0.3) 50%,
      transparent
    );
  }
}
</style>
