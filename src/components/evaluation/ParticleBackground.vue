<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'page' | 'stage'
}>(), {
  variant: 'page',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId = 0
let ctx: CanvasRenderingContext2D | null = null
let particles: LightParticle[] = []
let reducedMotion = false

const className = computed(() => ['particle-bg', `particle-bg--${props.variant}`])

const colors = [
  '119, 215, 232',
  '255, 214, 140',
  '230, 190, 126',
  '151, 226, 201',
]

class LightParticle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  targetAlpha: number
  pulseSpeed: number
  pulsePhase: number
  orbit: number
  drift: number

  constructor(width: number, height: number) {
    const lane = Math.random()
    this.originX = props.variant === 'stage'
      ? width * (0.18 + lane * 0.74)
      : Math.random() * width
    this.originY = props.variant === 'stage'
      ? height * (0.18 + Math.sin(lane * Math.PI) * 0.66) + (Math.random() - 0.5) * 120
      : Math.random() * height
    this.x = this.originX
    this.y = this.originY
    const speed = props.variant === 'stage' ? Math.random() * 0.18 + 0.045 : Math.random() * 0.28 + 0.08
    const angle = props.variant === 'stage'
      ? -0.34 + Math.random() * 0.68
      : Math.random() * Math.PI * 2
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.radius = props.variant === 'stage' ? Math.random() * 1.4 + 0.45 : Math.random() * 1.8 + 0.8
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.alpha = Math.random() * 0.38 + 0.08
    this.targetAlpha = props.variant === 'stage' ? Math.random() * 0.26 + 0.12 : Math.random() * 0.42 + 0.12
    this.pulseSpeed = Math.random() * 0.018 + 0.005
    this.pulsePhase = Math.random() * Math.PI * 2
    this.orbit = Math.random() * Math.PI * 2
    this.drift = Math.random() * 0.7 + 0.4
  }

  update(width: number, height: number) {
    if (reducedMotion) return
    this.x += this.vx
    this.y += this.vy
    this.orbit += 0.006 * this.drift

    if (props.variant === 'stage') {
      this.x += Math.cos(this.orbit) * 0.32
      this.y += Math.sin(this.orbit * 0.75) * 0.22
    }

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

    if (props.variant === 'stage') {
      const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 7)
      glow.addColorStop(0, `rgba(${this.color}, ${this.alpha * 0.2})`)
      glow.addColorStop(1, `rgba(${this.color}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function initParticles(width: number, height: number) {
  particles = []
  const density = props.variant === 'stage' ? 6600 : 9000
  const limit = props.variant === 'stage' ? 120 : 110
  const count = Math.min(Math.floor((width * height) / density), limit)
  for (let i = 0; i < count; i++) {
    particles.push(new LightParticle(width, height))
  }
}

function drawConnections(ctx: CanvasRenderingContext2D, width: number, height: number) {
  if (props.variant === 'stage') return
  const maxDist = 150
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.12
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

  if (props.variant === 'stage') {
    const beam = context.createLinearGradient(0, canvas.height, canvas.width, 0)
    beam.addColorStop(0, 'rgba(255, 214, 140, 0)')
    beam.addColorStop(0.45, 'rgba(255, 214, 140, 0.045)')
    beam.addColorStop(0.72, 'rgba(119, 215, 232, 0.05)')
    beam.addColorStop(1, 'rgba(255, 214, 140, 0)')
    context.fillStyle = beam
    context.beginPath()
    context.moveTo(0, canvas.height * 0.68)
    context.bezierCurveTo(canvas.width * 0.28, canvas.height * 0.42, canvas.width * 0.58, canvas.height * 0.72, canvas.width, canvas.height * 0.24)
    context.lineTo(canvas.width, canvas.height * 0.44)
    context.bezierCurveTo(canvas.width * 0.64, canvas.height * 0.86, canvas.width * 0.28, canvas.height * 0.58, 0, canvas.height * 0.86)
    context.closePath()
    context.fill()
  }

  particles.forEach(p => p.update(canvas.width, canvas.height))
  drawConnections(context, canvas.width, canvas.height)
  particles.forEach(p => p.draw(context))

  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const width = props.variant === 'stage' ? rect.width : window.innerWidth
  const height = props.variant === 'stage' ? rect.height : window.innerHeight
  const canvas = canvasRef.value
  canvas.width = Math.max(1, Math.floor(width))
  canvas.height = Math.max(1, Math.floor(height))
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  initParticles(canvas.width, canvas.height)
}

onMounted(() => {
  if (!canvasRef.value) return
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = canvasRef.value.getContext('2d')
  nextTick(() => {
    handleResize()
    animate()
  })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvasRef" :class="className" />
</template>

<style scoped>
.particle-bg {
  pointer-events: none;
}

.particle-bg--page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: radial-gradient(ellipse at 20% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%);
}

.particle-bg--stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background:
    radial-gradient(circle at 50% 70%, rgba(255, 214, 140, 0.13), transparent 22%),
    radial-gradient(circle at 48% 36%, rgba(119, 215, 232, 0.1), transparent 30%),
    linear-gradient(135deg, rgba(5, 8, 18, 0.06), rgba(8, 12, 28, 0.18));
  mix-blend-mode: screen;
}

@media (prefers-reduced-motion: reduce) {
  .particle-bg {
    opacity: 0.72;
  }
}
</style>
