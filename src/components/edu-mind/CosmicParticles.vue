<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null

interface NebulaCloud {
  x: number
  y: number
  radius: number
  hue: number
  hueShift: number
  opacity: number
  rotation: number
  rotationSpeed: number
  scaleX: number
  scaleY: number
  driftX: number
  driftY: number
  pulsePhase: number
  pulseSpeed: number
}

interface FlowParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  trail: Array<{ x: number; y: number }>
}

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
  hue: number
}

function createNebulaClouds(w: number, h: number): NebulaCloud[] {
  return [
    {
      x: w * 0.25, y: h * 0.3,
      radius: Math.min(w, h) * 0.35,
      hue: 270, hueShift: 0.02,
      opacity: 0.04,
      rotation: 0, rotationSpeed: 0.0003,
      scaleX: 1.3, scaleY: 0.8,
      driftX: 0.15, driftY: 0.08,
      pulsePhase: 0, pulseSpeed: 0.003,
    },
    {
      x: w * 0.7, y: h * 0.45,
      radius: Math.min(w, h) * 0.4,
      hue: 220, hueShift: 0.015,
      opacity: 0.035,
      rotation: Math.PI / 4, rotationSpeed: -0.0002,
      scaleX: 1.4, scaleY: 0.7,
      driftX: -0.1, driftY: 0.12,
      pulsePhase: Math.PI, pulseSpeed: 0.004,
    },
    {
      x: w * 0.5, y: h * 0.75,
      radius: Math.min(w, h) * 0.28,
      hue: 310, hueShift: 0.01,
      opacity: 0.03,
      rotation: Math.PI / 3, rotationSpeed: 0.0004,
      scaleX: 1.1, scaleY: 0.9,
      driftX: 0.08, driftY: -0.1,
      pulsePhase: Math.PI / 2, pulseSpeed: 0.005,
    },
    {
      x: w * 0.15, y: h * 0.65,
      radius: Math.min(w, h) * 0.22,
      hue: 200, hueShift: 0.025,
      opacity: 0.025,
      rotation: -Math.PI / 6, rotationSpeed: 0.00025,
      scaleX: 1.2, scaleY: 0.85,
      driftX: 0.12, driftY: 0.06,
      pulsePhase: Math.PI * 1.5, pulseSpeed: 0.0035,
    },
    {
      x: w * 0.8, y: h * 0.2,
      radius: Math.min(w, h) * 0.18,
      hue: 340, hueShift: 0.02,
      opacity: 0.02,
      rotation: Math.PI / 2, rotationSpeed: -0.0003,
      scaleX: 0.9, scaleY: 1.2,
      driftX: -0.08, driftY: 0.1,
      pulsePhase: Math.PI * 0.7, pulseSpeed: 0.0045,
    },
  ]
}

function createStars(w: number, h: number): Star[] {
  const count = Math.floor((w * h) / 6000)
  return Array.from({ length: Math.min(count, 250) }, () => {
    const rand = Math.random()
    let hue = 0
    if (rand > 0.6) hue = 200 + Math.random() * 50
    else if (rand > 0.3) hue = 270 + Math.random() * 40
    else if (rand > 0.15) hue = 330 + Math.random() * 30

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      hue,
    }
  })
}

function createFlowParticle(w: number, h: number, nebula: NebulaCloud): FlowParticle {
  const angle = Math.random() * Math.PI * 2
  const dist = Math.random() * nebula.radius * 0.6
  return {
    x: nebula.x + Math.cos(angle) * dist,
    y: nebula.y + Math.sin(angle) * dist,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    hue: nebula.hue + (Math.random() - 0.5) * 30,
    life: 0,
    maxLife: 100 + Math.random() * 150,
    trail: [],
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  let nebulaClouds: NebulaCloud[] = []
  let stars: Star[] = []
  let flowParticles: FlowParticle[] = []
  let frame = 0

  function resize() {
    if (!canvas || !ctx) return
    const parent = canvas.parentElement
    if (!parent) return
    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    nebulaClouds = createNebulaClouds(rect.width, rect.height)
    stars = createStars(rect.width, rect.height)
    flowParticles = []
  }

  resize()
  resizeObserver = new ResizeObserver(() => resize())
  if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

  function drawNebulaCloud(ctx: CanvasRenderingContext2D, cloud: NebulaCloud, frame: number) {
    cloud.rotation += cloud.rotationSpeed
    cloud.x += cloud.driftX * Math.sin(frame * 0.001)
    cloud.y += cloud.driftY * Math.cos(frame * 0.001)
    cloud.hue += cloud.hueShift

    const pulse = Math.sin(frame * cloud.pulseSpeed + cloud.pulsePhase) * 0.2 + 0.8
    const currentOpacity = cloud.opacity * pulse

    ctx.save()
    ctx.translate(cloud.x, cloud.y)
    ctx.rotate(cloud.rotation)
    ctx.scale(cloud.scaleX, cloud.scaleY)

    const layers = 5
    for (let i = layers; i >= 0; i--) {
      const layerRadius = cloud.radius * (1 - i * 0.15)
      const layerOpacity = currentOpacity * (1 - i * 0.15)
      const hue = cloud.hue + i * 10

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerRadius)
      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, ${layerOpacity * 1.5})`)
      gradient.addColorStop(0.2, `hsla(${hue + 10}, 65%, 45%, ${layerOpacity})`)
      gradient.addColorStop(0.5, `hsla(${hue - 10}, 60%, 35%, ${layerOpacity * 0.5})`)
      gradient.addColorStop(0.8, `hsla(${hue + 20}, 50%, 25%, ${layerOpacity * 0.15})`)
      gradient.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, layerRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 0; i < 3; i++) {
      const streamAngle = (frame * 0.002 + i * Math.PI * 2 / 3) % (Math.PI * 2)
      const streamDist = cloud.radius * 0.3
      const sx = Math.cos(streamAngle) * streamDist
      const sy = Math.sin(streamAngle) * streamDist * 0.6

      const streamGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, cloud.radius * 0.4)
      const streamHue = cloud.hue + 30 + i * 20
      const streamOpacity = currentOpacity * 0.8 * (0.5 + Math.sin(frame * 0.005 + i) * 0.5)
      streamGrad.addColorStop(0, `hsla(${streamHue}, 80%, 60%, ${streamOpacity})`)
      streamGrad.addColorStop(0.5, `hsla(${streamHue}, 70%, 45%, ${streamOpacity * 0.3})`)
      streamGrad.addColorStop(1, 'transparent')

      ctx.fillStyle = streamGrad
      ctx.beginPath()
      ctx.arc(sx, sy, cloud.radius * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  function animate() {
    if (!canvas || !ctx) return
    const w = canvas.width / (window.devicePixelRatio || 1)
    const h = canvas.height / (window.devicePixelRatio || 1)

    ctx.clearRect(0, 0, w, h)
    frame++

    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    for (const cloud of nebulaClouds) {
      drawNebulaCloud(ctx, cloud, frame)
    }
    ctx.restore()

    if (frame % 3 === 0 && flowParticles.length < 150) {
      const nebula = nebulaClouds[Math.floor(Math.random() * nebulaClouds.length)]
      flowParticles.push(createFlowParticle(w, h, nebula))
    }

    flowParticles = flowParticles.filter(p => {
      p.life++
      p.trail.unshift({ x: p.x, y: p.y })
      if (p.trail.length > 8) p.trail.pop()

      const progress = p.life / p.maxLife
      const alpha = Math.pow(1 - progress, 2)

      p.x += p.vx + Math.sin(frame * 0.01 + p.life * 0.05) * 0.3
      p.y += p.vy + Math.cos(frame * 0.008 + p.life * 0.04) * 0.2

      p.vx *= 0.998
      p.vy *= 0.998

      if (alpha <= 0) return false

      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      if (p.trail.length > 1) {
        for (let i = 0; i < p.trail.length - 1; i++) {
          const t = i / p.trail.length
          const trailAlpha = alpha * (1 - t) * 0.5
          ctx.strokeStyle = `hsla(${p.hue}, 70%, 65%, ${trailAlpha})`
          ctx.lineWidth = p.size * (1 - t * 0.6)
          ctx.beginPath()
          ctx.moveTo(p.trail[i].x, p.trail[i].y)
          ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y)
          ctx.stroke()
        }
      }

      ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${alpha * 0.8})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

      const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
      glowGrad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha * 0.3})`)
      glowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      return p.life < p.maxLife
    })

    for (const star of stars) {
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase)
      const opacity = star.opacity * (0.5 + twinkle * 0.5)

      if (star.hue > 0) {
        ctx.fillStyle = `hsla(${star.hue}, 70%, 80%, ${opacity})`
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      }

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()

      if (star.size > 1.2 && opacity > 0.5) {
        ctx.fillStyle = star.hue > 0
          ? `hsla(${star.hue}, 70%, 80%, ${opacity * 0.15})`
          : `rgba(255, 255, 255, ${opacity * 0.15})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" class="cosmic-particles-canvas" aria-hidden="true" />
</template>

<style>
.cosmic-particles-canvas {
  position: fixed !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
  z-index: 0 !important;
}
</style>
