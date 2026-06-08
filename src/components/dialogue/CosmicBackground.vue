<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 w-full h-full pointer-events-none select-none z-[-1]"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  let width = window.innerWidth
  let height = window.innerHeight

  const initCanvasSize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
  }
  initCanvasSize()

  const mouse = {
    x: width / 2, y: height / 2,
    targetX: width / 2, targetY: height / 2,
    active: false, radius: 280,
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouse.targetX = e.clientX; mouse.targetY = e.clientY; mouse.active = true
  }
  const handleMouseLeave = () => { mouse.active = false }
  window.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)

  // --- Cool tech-blue observatory palette ---
  const colors = {
    warmWhite: 'rgba(220, 230, 255, ',
    amber: 'rgba(96, 165, 250, ',
    gold: 'rgba(59, 130, 246, ',
    deepGold: 'rgba(37, 99, 235, ',
    brightGold: 'rgba(147, 197, 253, ',
    teal: 'rgba(34, 211, 238, ',
    ruby: 'rgba(129, 140, 248, ',
    softRuby: 'rgba(165, 180, 252, ',
  }
  const starPalette = [colors.warmWhite, colors.amber, colors.gold, colors.deepGold, colors.brightGold, colors.teal, colors.ruby]

  // ============================================================
  // 1. DEEP STARS — background starfield
  // ============================================================
  class TwinkleStar {
    x: number; y: number; size: number; baseOpacity: number; opacity: number
    twinkleSpeed: number; colorBase: string; isSupergiant: boolean
    phase: number; pulseOffset: number
    constructor() {
      this.x = Math.random() * width; this.y = Math.random() * height
      this.isSupergiant = Math.random() < 0.04
      this.size = this.isSupergiant
        ? Math.random() * 2.5 + 1.2
        : Math.random() * 1.1 + 0.15
      this.baseOpacity = this.isSupergiant
        ? Math.random() * 0.5 + 0.45
        : Math.random() * 0.65 + 0.12
      this.opacity = this.baseOpacity
      this.twinkleSpeed = 0.001 + Math.random() * 0.006
      this.colorBase = starPalette[Math.floor(Math.random() * starPalette.length)]
      this.phase = Math.random() * Math.PI * 2
      this.pulseOffset = Math.random() * 100
    }
    update(time: number) {
      const f = this.isSupergiant ? 0.25 : 0.75
      this.opacity = this.baseOpacity * (
        (1 - f) + f * Math.sin(time * this.twinkleSpeed + this.phase)
      )
    }
    draw(c: CanvasRenderingContext2D, time: number) {
      if (this.x < -5 || this.x > width + 5 || this.y < -5 || this.y > height + 5) return

      // Supergiant: elaborate cross glow
      if (this.isSupergiant && this.opacity > 0.35) {
        const glowRad = this.size * (5 + Math.sin(time * 0.002 + this.pulseOffset) * 1.5)
        c.save()
        c.globalAlpha = this.opacity * 0.55

        // Outer halo
        const halo = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRad)
        halo.addColorStop(0, `${this.colorBase}0.4)`)
        halo.addColorStop(0.25, `${this.colorBase}0.12)`)
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        c.fillStyle = halo; c.beginPath(); c.arc(this.x, this.y, glowRad, 0, Math.PI * 2); c.fill()

        // Cross spikes
        const spikeLen = glowRad * 1.6
        c.strokeStyle = `${this.colorBase}0.6)`; c.lineWidth = 0.5
        c.beginPath()
        c.moveTo(this.x - spikeLen, this.y); c.lineTo(this.x + spikeLen, this.y)
        c.moveTo(this.x, this.y - spikeLen); c.lineTo(this.x, this.y + spikeLen)
        c.stroke()

        // Diagonal spikes
        c.strokeStyle = `${this.colorBase}0.25)`
        c.lineWidth = 0.3
        const diag = spikeLen * 0.65
        c.beginPath()
        c.moveTo(this.x - diag, this.y - diag); c.lineTo(this.x + diag, this.y + diag)
        c.moveTo(this.x - diag, this.y + diag); c.lineTo(this.x + diag, this.y - diag)
        c.stroke()

        c.restore()
      }

      // Core dot
      c.fillStyle = `${this.colorBase}${this.opacity})`
      c.beginPath(); c.arc(this.x, this.y, this.size, 0, Math.PI * 2); c.fill()
    }
  }

  // ============================================================
  // 2. FLOATING DUST — tiny shimmering particles
  // ============================================================
  class DustMote {
    x: number; y: number; size: number; vx: number; vy: number
    opacity: number; baseOpacity: number; phase: number; color: string
    constructor() {
      this.x = Math.random() * width * 1.2 - width * 0.1
      this.y = Math.random() * height * 1.2 - height * 0.1
      this.size = Math.random() * 1.2 + 0.4
      this.vx = (Math.random() - 0.5) * 0.08
      this.vy = (Math.random() - 0.5) * 0.08
      this.baseOpacity = Math.random() * 0.3 + 0.08
      this.opacity = this.baseOpacity
      this.phase = Math.random() * Math.PI * 2
      const r = Math.random()
      this.color = r < 0.5 ? colors.gold : r < 0.75 ? colors.amber : colors.warmWhite
    }
    update(time: number, mx: number, my: number, isActive: boolean) {
      this.x += this.vx; this.y += this.vy
      // Wrap around
      if (this.x < -width * 0.1) this.x = width * 1.1
      if (this.x > width * 1.1) this.x = -width * 0.1
      if (this.y < -height * 0.1) this.y = height * 1.1
      if (this.y > height * 1.1) this.y = -height * 0.1

      this.opacity = this.baseOpacity * (0.6 + 0.4 * Math.sin(time * 0.0018 + this.phase))

      // Gentle mouse repulsion
      if (isActive) {
        const dx = this.x - mx, dy = this.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 0.3
          this.x += (dx / dist) * force
          this.y += (dy / dist) * force
        }
      }
    }
    draw(c: CanvasRenderingContext2D) {
      if (this.opacity < 0.02) return
      c.fillStyle = `${this.color}${this.opacity})`
      c.beginPath(); c.arc(this.x, this.y, this.size, 0, Math.PI * 2); c.fill()
    }
  }

  // ============================================================
  // 3. CONSTELLATION LINKS
  // ============================================================
  class ConstellationLink {
    starA: TwinkleStar; starB: TwinkleStar; maxDist: number
    constructor(a: TwinkleStar, b: TwinkleStar) { this.starA = a; this.starB = b; this.maxDist = 130 }
    draw(c: CanvasRenderingContext2D, time: number) {
      const dx = this.starA.x - this.starB.x, dy = this.starA.y - this.starB.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < this.maxDist) {
        const alpha = (1 - dist / this.maxDist) * 0.12 *
          Math.min(this.starA.opacity, this.starB.opacity) *
          (0.8 + 0.2 * Math.sin(time * 0.0005 + this.starA.x * 0.01))
        if (alpha > 0.01) {
          c.strokeStyle = `rgba(59, 130, 246, ${alpha})`
          c.lineWidth = 0.4
          c.beginPath(); c.moveTo(this.starA.x, this.starA.y); c.lineTo(this.starB.x, this.starB.y); c.stroke()
        }
      }
    }
  }

  // ============================================================
  // 4. GALAXY SPIRAL PARTICLES
  // ============================================================
  class GalaxyClusterParticle {
    angle: number; distance: number; offsetDistance: number
    size: number; color: string; speed: number; armIndex: number; particleBrightness: number
    pulseOffset: number; warpX = 0; warpY = 0
    constructor() {
      const coreFactor = Math.pow(Math.random(), 2.1)
      const minDim = Math.min(width, height)
      this.distance = coreFactor * (minDim * 0.75)
      this.offsetDistance = (Math.random() - 0.5) * (this.distance * 0.22 + 15)
      this.armIndex = Math.floor(Math.random() * 4)
      const a = 10, b = 0.44
      this.angle = Math.log(Math.max(1, this.distance) / a) / b + (this.armIndex * (Math.PI / 2)) + (Math.random() - 0.5) * 0.24
      this.size = Math.random() * 1.8 + 0.25
      this.speed = 0.00006 + (1.2 / (this.distance + 40)) * 0.045
      this.particleBrightness = Math.random() * 0.5 + 0.5
      this.pulseOffset = Math.random() * Math.PI * 2

      const r = Math.random()
      if (this.distance < minDim * 0.08) this.color = r < 0.7 ? colors.amber : colors.warmWhite
      else if (this.distance < minDim * 0.22) this.color = r < 0.55 ? colors.gold : colors.deepGold
      else if (this.distance < minDim * 0.4) this.color = r < 0.5 ? colors.amber : colors.teal
      else this.color = r < 0.5 ? colors.gold : (r < 0.75 ? colors.ruby : colors.softRuby)
    }
    update(time: number, mx: number, my: number, isActive: boolean) {
      this.angle += this.speed
      this.warpX *= 0.9; this.warpY *= 0.9
      if (isActive) {
        const r = this.distance + this.offsetDistance
        const lx = Math.cos(this.angle) * r, ly = Math.sin(this.angle) * r
        const tiltY = 0.35, rotAngle = -0.38
        const cosR = Math.cos(rotAngle), sinR = Math.sin(rotAngle)
        const sx = lx, sy = ly * tiltY
        const cx = width * 0.55, cy = height * 0.46
        const screenX = cx + (sx * cosR - sy * sinR), screenY = cy + (sx * sinR + sy * cosR)
        const dx = mx - screenX, dy = my - screenY
        const mDist = Math.sqrt(dx * dx + dy * dy)
        if (mDist < 200) {
          const pull = (1 - mDist / 200) * 14
          const a = Math.atan2(dy, dx)
          this.warpX = Math.cos(a) * pull; this.warpY = Math.sin(a) * pull
        }
      }
    }
    draw(c: CanvasRenderingContext2D, cx: number, cy: number, time: number) {
      const r = this.distance + this.offsetDistance
      const lx = Math.cos(this.angle) * r, ly = Math.sin(this.angle) * r
      const tiltY = 0.35, rot = -0.38
      const cosR = Math.cos(rot), sinR = Math.sin(rot)
      const sx = lx, sy = ly * tiltY
      const x = cx + (sx * cosR - sy * sinR) + this.warpX
      const y = cy + (sx * sinR + sy * cosR) + this.warpY
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return
      const shimmer = this.particleBrightness * (0.5 + 0.5 * Math.sin(time * 0.0028 + this.pulseOffset))
      c.fillStyle = `${this.color}${shimmer})`
      c.beginPath()
      if (this.size > 1.3) c.arc(x, y, this.size, 0, Math.PI * 2)
      else c.fillRect(x, y, this.size, this.size)
      c.fill()
    }
  }

  // ============================================================
  // 5. NEBULA CLOUDS
  // ============================================================
  class NebulaVapor {
    x: number; y: number; size: number; colorBase: string; vx: number; vy: number
    opacityLimit: number; phaseOffset: number; layers: number
    constructor() {
      this.x = Math.random() * width; this.y = Math.random() * height
      this.size = Math.min(width, height) * (0.35 + Math.random() * 0.4)
      const nebulaColors = [
        'rgba(59, 130, 246,', 'rgba(37, 99, 235,', 'rgba(34, 211, 238,',
        'rgba(214, 74, 122,', 'rgba(160, 80, 120,', 'rgba(232, 228, 216,',
      ]
      this.colorBase = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
      this.vx = (Math.random() - 0.5) * 0.025
      this.vy = (Math.random() - 0.5) * 0.025
      this.opacityLimit = 0.018 + Math.random() * 0.028
      this.phaseOffset = Math.random() * Math.PI * 2
      this.layers = 2 + Math.floor(Math.random() * 2)
    }
    update() {
      this.x += this.vx; this.y += this.vy
      if (this.x < -this.size) this.x = width + this.size
      if (this.x > width + this.size) this.x = -this.size
      if (this.y < -this.size) this.y = height + this.size
      if (this.y > height + this.size) this.y = -this.size
    }
    draw(c: CanvasRenderingContext2D, time: number) {
      const pulse = 1.0 + 0.06 * Math.sin(time * 0.00015 + this.phaseOffset)
      const currentSize = this.size * pulse

      // Multi-layer nebula for depth
      for (let i = 0; i < this.layers; i++) {
        const layerRatio = 1 - i * 0.25
        const layerSize = currentSize * (1 + i * 0.3)
        const grad = c.createRadialGradient(
          this.x + i * 15, this.y + i * 10, 0,
          this.x + i * 15, this.y + i * 10, layerSize
        )
        grad.addColorStop(0, `${this.colorBase}${this.opacityLimit * 0.8 * layerRatio})`)
        grad.addColorStop(0.4, `${this.colorBase}${this.opacityLimit * 0.35 * layerRatio})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        c.fillStyle = grad
        c.beginPath()
        c.arc(this.x + i * 15, this.y + i * 10, layerSize, 0, Math.PI * 2)
        c.fill()
      }
    }
  }

  // ============================================================
  // 6. METEOR / SHOOTING STAR
  // ============================================================
  class CosmicMeteorSpark {
    x: number; y: number; vx: number; vy: number; size: number; color: string; life: number; maxLife: number
    constructor(x: number, y: number, color: string) {
      this.x = x; this.y = y
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2.5 + 0.5
      this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed
      this.size = Math.random() * 1.5 + 0.4; this.color = color
      this.maxLife = 30 + Math.random() * 30; this.life = this.maxLife
    }
    update() { this.x += this.vx; this.y += this.vy; this.life-- }
    draw(c: CanvasRenderingContext2D) {
      const ratio = this.life / this.maxLife
      c.fillStyle = this.color.replace(/[\d.]+\)$/, `${ratio * 0.85})`)
      c.beginPath(); c.arc(this.x, this.y, this.size, 0, Math.PI * 2); c.fill()
    }
  }

  class KineticMeteorStreak {
    x = 0; y = 0; vx = 0; vy = 0; active = false; speed = 0; colorIndex = 0
    constructor() { this.reset() }
    reset() {
      this.x = Math.random() * width * 0.45
      this.y = Math.random() * height * 0.15
      this.speed = 15 + Math.random() * 12
      this.vx = this.speed
      this.vy = this.speed * (0.2 + Math.random() * 0.35)
      this.colorIndex = Math.floor(Math.random() * 3)
      this.active = false
    }
    trigger() { this.reset(); this.active = true }
    update(sparks: CosmicMeteorSpark[]) {
      if (!this.active) return
      this.x += this.vx; this.y += this.vy
      if (Math.random() < 0.4) {
        const sc = this.colorIndex === 0 ? colors.brightGold : this.colorIndex === 1 ? colors.teal : colors.ruby
        sparks.push(new CosmicMeteorSpark(this.x, this.y, sc))
      }
      if (this.x > width || this.y > height) {
        const ec = this.colorIndex === 0 ? colors.gold : this.colorIndex === 1 ? colors.teal : colors.ruby
        for (let i = 0; i < 30; i++) {
          sparks.push(new CosmicMeteorSpark(
            Math.min(this.x, width), Math.min(this.y, height), ec
          ))
        }
        this.active = false
      }
    }
    draw(c: CanvasRenderingContext2D) {
      if (!this.active) return
      c.save()

      // Glowing head
      const glowGrad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, 8)
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      glowGrad.addColorStop(1, 'rgba(96, 165, 250, 0)')
      c.fillStyle = glowGrad
      c.beginPath(); c.arc(this.x, this.y, 8, 0, Math.PI * 2); c.fill()

      // Trail
      const trail = c.createLinearGradient(this.x, this.y, this.x - this.vx * 2, this.y - this.vy * 2)
      if (this.colorIndex === 0) {
        trail.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
        trail.addColorStop(0.15, 'rgba(147, 197, 253, 0.95)')
        trail.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)')
      } else if (this.colorIndex === 1) {
        trail.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
        trail.addColorStop(0.15, 'rgba(45, 212, 184, 0.9)')
        trail.addColorStop(0.5, 'rgba(26, 154, 138, 0.2)')
      } else {
        trail.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
        trail.addColorStop(0.15, 'rgba(214, 74, 122, 0.9)')
        trail.addColorStop(0.5, 'rgba(158, 42, 90, 0.2)')
      }
      trail.addColorStop(1, 'rgba(0,0,0,0)')
      c.strokeStyle = trail; c.lineWidth = 2.2
      c.beginPath()
      c.moveTo(this.x, this.y)
      c.lineTo(this.x - this.vx * 1.8, this.y - this.vy * 1.8)
      c.stroke()
      c.restore()
    }
  }

  // ============================================================
  // 7. GALAXY RING WAVE — occasional expanding rings
  // ============================================================
  class RingWave {
    radius = 0; maxRadius: number; opacity = 0.8; color: string; x: number; y: number; speed: number
    constructor(cx: number, cy: number) {
      this.x = cx; this.y = cy
      this.maxRadius = Math.min(width, height) * (0.3 + Math.random() * 0.4)
      this.speed = 0.3 + Math.random() * 0.3
      const r = Math.random()
      this.color = r < 0.4 ? 'rgba(59, 130, 246,' : r < 0.7 ? 'rgba(147, 197, 253,' : 'rgba(34, 211, 238,'
    }
    update() {
      this.radius += this.speed
      this.opacity = Math.max(0, 0.6 * (1 - this.radius / this.maxRadius))
    }
    get alive() { return this.opacity > 0.01 }
    draw(c: CanvasRenderingContext2D) {
      c.save()
      c.globalAlpha = this.opacity * 0.3
      c.strokeStyle = this.color + `${this.opacity * 0.5})`
      c.lineWidth = 0.5
      c.beginPath()
      c.ellipse(this.x, this.y, this.radius, this.radius * 0.35, -0.38, 0, Math.PI * 2)
      c.stroke()
      c.restore()
    }
  }

  // ============================================================
  // INSTANTIATE EVERYTHING
  // ============================================================
  const deepStars = Array.from({ length: 400 }, () => new TwinkleStar())
  const dustMotes = Array.from({ length: 120 }, () => new DustMote())
  const linksList: ConstellationLink[] = []

  const generateConstellations = () => {
    linksList.length = 0
    for (let i = 0; i < deepStars.length; i++) {
      for (let j = i + 1; j < deepStars.length; j++) {
        if (deepStars[i].isSupergiant && deepStars[j].isSupergiant) {
          if (Math.random() < 0.15) linksList.push(new ConstellationLink(deepStars[i], deepStars[j]))
        } else if (Math.random() < 0.005) {
          linksList.push(new ConstellationLink(deepStars[i], deepStars[j]))
        }
      }
    }
  }
  generateConstellations()

  const particlesList = Array.from({ length: 2500 }, () => new GalaxyClusterParticle())
  const nebulaeList = Array.from({ length: 20 }, () => new NebulaVapor())
  const meteorStreak = new KineticMeteorStreak()
  const activeSparks: CosmicMeteorSpark[] = []
  const ringWaves: RingWave[] = []
  let ringWaveTimer = 0

  // ============================================================
  // ANIMATION LOOP
  // ============================================================
  const animate = (time: number) => {
    mouse.x += (mouse.targetX - mouse.x) * 0.05
    mouse.y += (mouse.targetY - mouse.y) * 0.05

    // --- Background gradient ---
    ctx.globalCompositeOperation = 'source-over'
    const bgGrad = ctx.createRadialGradient(
      width * 0.5, height * 0.45, 0,
      width * 0.5, height * 0.45, Math.max(width, height) * 0.75
    )
    bgGrad.addColorStop(0, '#0e0b18')
    bgGrad.addColorStop(0.3, '#090712')
    bgGrad.addColorStop(0.6, '#06050c')
    bgGrad.addColorStop(1, '#030307')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, width, height)

    ctx.globalCompositeOperation = 'screen'

    // Nebulae (deepest layer)
    nebulaeList.forEach(gas => { gas.update(); gas.draw(ctx, time) })

    // Dust motes
    dustMotes.forEach(m => { m.update(time, mouse.x, mouse.y, mouse.active); m.draw(ctx) })

    // Constellations
    linksList.forEach(link => link.draw(ctx, time))

    // Stars
    deepStars.forEach(star => { star.update(time); star.draw(ctx, time) })

    // Galaxy particles
    const cx = width * 0.54, cy = height * 0.44
    const minDim = Math.min(width, height)
    particlesList.forEach(p => { p.update(time, mouse.x, mouse.y, mouse.active); p.draw(ctx, cx, cy, time) })

    // Galaxy center — cool tech-blue glow
    const scaleY = 0.35, rotation = -0.38
    const majorRad = minDim * 0.28
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation); ctx.scale(1, scaleY)
    const coronaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, majorRad)
    coronaGrad.addColorStop(0, 'rgba(147, 197, 253, 0.2)')
    coronaGrad.addColorStop(0.2, 'rgba(59, 130, 246, 0.14)')
    coronaGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.06)')
    coronaGrad.addColorStop(0.8, 'rgba(34, 211, 238, 0.02)')
    coronaGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = coronaGrad
    ctx.beginPath(); ctx.arc(0, 0, majorRad, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    // Galaxy core — bright pulsing center
    const pulseIntensity = 0.85 + 0.15 * Math.sin(time * 0.0015)
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation); ctx.scale(1, scaleY)
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, minDim * 0.06 * pulseIntensity)
    coreGrad.addColorStop(0, 'rgba(224, 242, 254, 1.0)')
    coreGrad.addColorStop(0.1, 'rgba(147, 197, 253, 0.9)')
    coreGrad.addColorStop(0.35, 'rgba(96, 165, 250, 0.4)')
    coreGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.1)')
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = coreGrad
    ctx.beginPath(); ctx.arc(0, 0, minDim * 0.06 * pulseIntensity, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Ring waves
    ringWaveTimer++
    if (ringWaveTimer > 200 + Math.random() * 300) {
      ringWaves.push(new RingWave(cx, cy))
      ringWaveTimer = 0
    }
    for (let i = ringWaves.length - 1; i >= 0; i--) {
      ringWaves[i].update(); ringWaves[i].draw(ctx)
      if (!ringWaves[i].alive) ringWaves.splice(i, 1)
    }

    // Meteors
    if (!meteorStreak.active && Math.random() < 0.003) meteorStreak.trigger()
    meteorStreak.update(activeSparks); meteorStreak.draw(ctx)
    for (let i = activeSparks.length - 1; i >= 0; i--) {
      activeSparks[i].update(); activeSparks[i].draw(ctx)
      if (activeSparks[i].life <= 0) activeSparks.splice(i, 1)
    }

    ctx.globalCompositeOperation = 'source-over'
    animationFrameId = requestAnimationFrame(animate)
  }
  animationFrameId = requestAnimationFrame(animate)

  const handleResize = () => {
    initCanvasSize()
    deepStars.length = 0
    for (let i = 0; i < 400; i++) deepStars.push(new TwinkleStar())
    generateConstellations()
    particlesList.length = 0
    for (let i = 0; i < 2500; i++) particlesList.push(new GalaxyClusterParticle())
    dustMotes.length = 0
    for (let i = 0; i < 120; i++) dustMotes.push(new DustMote())
    nebulaeList.length = 0
    for (let i = 0; i < 20; i++) nebulaeList.push(new NebulaVapor())
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>
