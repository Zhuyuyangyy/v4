<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LoginPanel from '@/components/login/LoginPanel.vue'

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let mediaQuery: MediaQueryList | null = null
const isMobile = ref(false)

function updateCompact(event?: MediaQueryListEvent | MediaQueryList) {
  isMobile.value = Boolean(event?.matches ?? mediaQuery?.matches)
}

// ---- particle flow ----
interface FlowParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  alpha: number
}

let rafId = 0
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1
const particles: FlowParticle[] = []
const maxParticles = 90

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
}

function spawnParticle() {
  const splitRatio = isMobile.value ? 1 : 0.58
  const spawnXMax = width * splitRatio
  const y = Math.random() * height
  const x = Math.random() * spawnXMax * 0.85 + spawnXMax * 0.05

  const targetX = isMobile.value
    ? x + (Math.random() - 0.5) * width * 0.3
    : width * (0.62 + Math.random() * 0.33)
  const targetY = y + (Math.random() - 0.5) * height * 0.25

  const dx = targetX - x
  const dy = targetY - y
  const dist = Math.hypot(dx, dy) || 1
  const speed = 0.4 + Math.random() * 0.8

  particles.push({
    x,
    y,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed * 0.35 + (Math.random() - 0.5) * 0.25,
    life: 1,
    maxLife: 0.6 + Math.random() * 0.7,
    size: 0.8 + Math.random() * 1.6,
    alpha: 0.25 + Math.random() * 0.45,
  })
}

function drawFlow() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  if (particles.length < maxParticles && Math.random() < 0.35) {
    spawnParticle()
  }

  // draw connection lines between nearby particles
  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]
    let connections = 0
    for (let j = i + 1; j < particles.length; j++) {
      if (connections >= 2) break
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist < 90) {
        const lineAlpha = Math.min(a.life, b.life) * (1 - dist / 90) * 0.18
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(80, 180, 255, ${lineAlpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
        connections++
      }
    }
  }
  ctx.restore()

  // draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.004

    if (p.life <= 0 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
      particles.splice(i, 1)
      continue
    }

    const progress = 1 - p.life / p.maxLife
    const currentAlpha = Math.max(0, p.life / p.maxLife) * p.alpha * (1 - progress * 0.5)
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
    glow.addColorStop(0, `rgba(120, 210, 255, ${currentAlpha})`)
    glow.addColorStop(0.5, `rgba(60, 160, 255, ${currentAlpha * 0.5})`)
    glow.addColorStop(1, 'rgba(60, 160, 255, 0)')

    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()
    ctx.restore()
  }

  rafId = requestAnimationFrame(drawFlow)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 900px)')
  updateCompact(mediaQuery)
  mediaQuery.addEventListener('change', updateCompact)
  document.body.classList.add('login-page-active')

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  rafId = requestAnimationFrame(drawFlow)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateCompact)
  document.body.classList.remove('login-page-active')
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(rafId)
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
    </div>

    <canvas ref="canvasRef" class="flow-canvas" aria-hidden="true" />

    <div class="split-layout">
      <section class="visual-pane" aria-label="登录页概念展示">
        <div class="visual-image" aria-hidden="true" />
        <div class="visual-overlay-gradient" aria-hidden="true" />
        <div class="visual-overlay-grid" aria-hidden="true" />
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
  background-image: url('/login.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.18;
  filter: blur(2px) saturate(1.2);
}

.bg-overlay-dark {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(100deg,
      rgba(0, 5, 15, 0.65) 0%,
      rgba(0, 8, 20, 0.72) 40%,
      rgba(2, 10, 25, 0.85) 58%,
      rgba(2, 10, 26, 0.94) 72%,
      rgba(2, 10, 26, 0.98) 100%
    );
}

.bg-grid-fine {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(0, 180, 255, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 180, 255, 0.12) 1px, transparent 1px);
  background-size: 60px 60px;
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
  background: radial-gradient(circle, rgba(0, 120, 255, 0.18), transparent 70%);
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 25%;
  background: radial-gradient(circle, rgba(0, 180, 255, 0.12), transparent 70%);
  animation-delay: -2.5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  bottom: 10%;
  right: 15%;
  background: radial-gradient(circle, rgba(50, 150, 255, 0.1), transparent 70%);
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
    radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%);
}

.flow-canvas {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  touch-action: none;
}

.split-layout {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
}

.visual-pane {
  position: relative;
  width: 58%;
  min-height: 100vh;
  overflow: hidden;
  pointer-events: none;
}

.visual-image {
  position: absolute;
  inset: 0;
  background-image: url('/login.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: scale(1.02);
  transition: transform 0.8s ease-out;
}

.visual-overlay-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(100deg,
      rgba(0, 8, 22, 0.12) 0%,
      rgba(0, 8, 22, 0.28) 45%,
      rgba(2, 10, 26, 0.72) 72%,
      rgba(2, 10, 26, 0.96) 100%
    );
}

.visual-overlay-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 180, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 180, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 70%);
  -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 70%);
}

.auth-pane {
  position: relative;
  z-index: 3;
  width: 42%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 56px;
  pointer-events: none;
  background:
    linear-gradient(100deg,
      rgba(2, 10, 26, 0.2) 0%,
      rgba(2, 10, 26, 0.55) 30%,
      rgba(3, 14, 34, 0.78) 100%
    );
}

.auth-panel-wrapper {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 460px;
  pointer-events: auto;
  animation: wrapper-breath 4s ease-in-out infinite;
}

@keyframes wrapper-breath {
  0%, 100% {
    filter: drop-shadow(0 20px 60px rgba(0, 80, 180, 0.25));
  }
  50% {
    filter: drop-shadow(0 30px 90px rgba(0, 130, 230, 0.45));
  }
}

@media (max-width: 1200px) {
  .visual-pane { width: 52%; }
  .auth-pane {
    width: 48%;
    padding: 32px 40px;
  }
  .auth-panel-wrapper { max-width: 420px; }
}

@media (max-width: 900px) {
  .split-layout {
    flex-direction: column;
  }
  .visual-pane {
    width: 100%;
    min-height: 36vh;
    height: 36vh;
  }
  .visual-image {
    background-position: center top;
  }
  .visual-overlay-gradient {
    background:
      linear-gradient(180deg,
        rgba(0, 8, 22, 0.1) 0%,
        rgba(0, 8, 22, 0.25) 50%,
        rgba(2, 10, 26, 0.95) 100%
      );
  }
  .auth-pane {
    width: 100%;
    min-height: auto;
    padding: 24px;
    background:
      linear-gradient(180deg,
        rgba(2, 10, 26, 0.9) 0%,
        rgba(3, 14, 34, 0.98) 20%,
        rgba(3, 14, 34, 1) 100%
      );
  }
  .auth-panel-wrapper { max-width: 520px; }
  .bg-image {
    background-position: center top;
  }
  .bg-overlay-dark {
    background:
      linear-gradient(180deg,
        rgba(0, 5, 15, 0.45) 0%,
        rgba(0, 8, 20, 0.65) 40%,
        rgba(2, 10, 26, 0.95) 70%,
        rgba(2, 10, 26, 0.99) 100%
      );
  }
}

@media (max-width: 540px) {
  .auth-pane { padding: 20px; }
  .auth-panel-wrapper { max-width: 100%; }
}
</style>
