<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId = 0
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  targetAlpha: number
}

const colors = [
  '0, 212, 255',
  '124, 58, 237',
  '6, 214, 160',
  '245, 158, 11',
]

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  targetAlpha: number
  pulseSpeed: number
  pulsePhase: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    const speed = Math.random() * 0.3 + 0.1
    const angle = Math.random() * Math.PI * 2
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.radius = Math.random() * 2 + 1
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.alpha = Math.random() * 0.5 + 0.1
    this.targetAlpha = Math.random() * 0.6 + 0.2
    this.pulseSpeed = Math.random() * 0.02 + 0.005
    this.pulsePhase = Math.random() * Math.PI * 2
  }

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0

    this.pulsePhase += this.pulseSpeed
    this.alpha = this.targetAlpha + Math.sin(this.pulsePhase) * 0.15
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
    ctx.fill()
  }
}

function initParticles(width: number, height: number) {
  particles = []
  const count = Math.min(Math.floor((width * height) / 8000), 120)
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(width, height))
  }
}

function drawConnections(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const maxDist = 150
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.15
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}

function animate() {
  if (!canvasRef.value || !ctx) return
  const canvas = canvasRef.value
  const context = ctx
  context.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(p => p.update(canvas.width, canvas.height))
  drawConnections(context, canvas.width, canvas.height)
  particles.forEach(p => p.draw(context))

  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas.width, canvas.height)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  initParticles(canvasRef.value.width, canvasRef.value.height)
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-bg" />
</template>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse at 20% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%);
}
</style>
