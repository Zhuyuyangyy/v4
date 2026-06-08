<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let animationId = 0
let particleField: THREE.Points | null = null
let energyRibbon: THREE.Points | null = null
let resizeObserver: ResizeObserver | null = null
let prefersReducedMotion = false

function createGlowTexture(size = 96) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const half = size / 2
  const glow = ctx.createRadialGradient(half, half, 0, half, half, half)
  glow.addColorStop(0, 'rgba(255,255,255,1)')
  glow.addColorStop(0.12, 'rgba(210,238,255,0.86)')
  glow.addColorStop(0.42, 'rgba(80,180,255,0.22)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createParticleField(texture: THREE.Texture) {
  const count = 1650
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const radius = 18 + Math.pow(Math.random(), 0.58) * 60
    const theta = Math.random() * Math.PI * 2
    const band = (Math.random() - 0.5) * 0.52
    const spiral = theta + radius * 0.038

    positions[i * 3] = Math.cos(spiral) * radius
    positions[i * 3 + 1] = band * radius + (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = Math.sin(spiral) * radius - 24 + (Math.random() - 0.5) * 18

    const mix = Math.random()
    if (mix < 0.42) color.setHSL(0.56 + Math.random() * 0.05, 0.78, 0.62)
    else if (mix < 0.72) color.setHSL(0.78 + Math.random() * 0.06, 0.62, 0.58)
    else color.setHSL(0.09 + Math.random() * 0.05, 0.82, 0.62)

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.74,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

function createEnergyRibbon(texture: THREE.Texture) {
  const count = 460
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 7.4
    const radius = 10 + t * 32
    const wave = Math.sin(t * Math.PI * 5) * 4

    positions[i * 3] = Math.cos(angle) * radius - 8
    positions[i * 3 + 1] = Math.sin(angle * 0.48) * 5 + wave
    positions[i * 3 + 2] = Math.sin(angle) * radius - 18

    color.setHSL(0.52 + t * 0.18, 0.86, 0.58)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    map: texture,
    size: 1.2,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

function resize() {
  if (!renderer || !camera || !canvasRef.value) return
  const parent = canvasRef.value.parentElement
  const width = parent?.clientWidth || window.innerWidth
  const height = parent?.clientHeight || window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}

function animate(start = performance.now()) {
  if (!renderer || !scene || !camera) return
  const elapsed = (performance.now() - start) * 0.001

  if (particleField) {
    particleField.rotation.y = elapsed * 0.035
    particleField.rotation.x = Math.sin(elapsed * 0.18) * 0.08 - 0.18
  }

  if (energyRibbon) {
    energyRibbon.rotation.y = -elapsed * 0.09
    energyRibbon.rotation.z = Math.sin(elapsed * 0.22) * 0.08
  }

  renderer.render(scene, camera)
  if (!prefersReducedMotion) animationId = requestAnimationFrame(() => animate(start))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const texture = createGlowTexture()
  if (!texture) return

  try {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 220)
    camera.position.set(0, 10, 56)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    particleField = createParticleField(texture)
    particleField.rotation.x = -0.18
    particleField.rotation.z = -0.1
    scene.add(particleField)

    energyRibbon = createEnergyRibbon(texture)
    energyRibbon.position.set(12, -2, 4)
    scene.add(energyRibbon)

    resize()
    resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)
    window.addEventListener('resize', resize)

    ready.value = true
    animate()
  } catch (error) {
    console.warn('Three particle background failed:', error)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resize)

  for (const points of [particleField, energyRibbon]) {
    points?.geometry.dispose()
    const material = points?.material
    if (Array.isArray(material)) material.forEach(m => m.dispose())
    else material?.dispose()
  }

  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
})
</script>

<template>
  <div class="three-particle-bg" :class="{ ready }" aria-hidden="true">
    <canvas ref="canvasRef" />
    <div class="particle-fallback" />
    <div class="particle-scan" />
  </div>
</template>

<style scoped>
.three-particle-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse 1100px 760px at 72% 42%, rgba(12, 180, 255, 0.12), transparent 58%),
    radial-gradient(ellipse 760px 520px at 22% 72%, rgba(247, 164, 58, 0.08), transparent 66%),
    linear-gradient(160deg, #02050e 0%, #07101f 42%, #04040b 100%);
}

.three-particle-bg canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
  transition: opacity 900ms ease;
}

.three-particle-bg.ready canvas {
  opacity: 1;
}

.particle-fallback,
.particle-scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle-fallback {
  background:
    radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1px 1px at 42% 16%, rgba(94,223,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 68% 38%, rgba(255,204,122,0.44), transparent),
    radial-gradient(1px 1px at 82% 72%, rgba(176,132,255,0.5), transparent),
    radial-gradient(1px 1px at 28% 84%, rgba(255,255,255,0.4), transparent);
  opacity: 0.75;
}

.particle-scan {
  background:
    linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at 56% 42%, black 0%, transparent 74%);
  -webkit-mask-image: radial-gradient(ellipse at 56% 42%, black 0%, transparent 74%);
  opacity: 0.28;
}
</style>
