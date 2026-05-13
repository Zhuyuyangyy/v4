import * as THREE from 'three'

// Cached glow sprite for all nebulae
let glowSprite: THREE.Texture | null = null

function getGlowSprite(): THREE.Texture {
  if (glowSprite) return glowSprite
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.1, 'rgba(255,255,255,0.6)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.2)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.03)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  glowSprite = new THREE.CanvasTexture(canvas)
  return glowSprite
}

export class Nebula {
  public mesh: THREE.Points
  private baseOpacity: number
  private rotationSpeed: number

  constructor(
    position: THREE.Vector3,
    color: THREE.Color,
    count = 1200,
    spread = 35,
    opacity = 0.25,
  ) {
    this.baseOpacity = opacity
    this.rotationSpeed = 0.0001 + Math.random() * 0.0002

    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Use a flattened disk distribution with variably clumpy density
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      // Clump - more particles closer to center
      const r = Math.pow(Math.random(), 0.5) * spread

      // Flatten on Y (like a pancake galaxy)
      const flatFactor = 0.2 + Math.random() * 0.15

      positions[i * 3] = position.x + Math.sin(phi) * Math.cos(theta) * r
      positions[i * 3 + 1] = position.y + Math.sin(phi) * Math.sin(theta) * r * flatFactor
      positions[i * 3 + 2] = position.z + Math.cos(phi) * r

      // Size: large in center -> small at edges
      const distRatio = 1 - r / spread
      sizes[i] = (0.5 + distRatio * 3.5) * (0.4 + Math.random() * 1.2)

      // Color with variation
      const c = color.clone()
      const brightness = 0.4 + distRatio * 0.6
      const hueShift = (Math.random() - 0.5) * 0.05
      c.r = Math.min(1, Math.max(0, c.r * brightness + (Math.random() - 0.5) * 0.08 + hueShift))
      c.g = Math.min(1, Math.max(0, c.g * brightness + (Math.random() - 0.5) * 0.08 - hueShift * 0.5))
      c.b = Math.min(1, Math.max(0, c.b * brightness + (Math.random() - 0.5) * 0.08 + hueShift * 0.5))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 2.0,
      map: getGlowSprite(),
      vertexColors: true,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    this.mesh = new THREE.Points(geo, mat)
  }

  update(time: number) {
    this.mesh.rotation.y += this.rotationSpeed
    const mat = this.mesh.material as THREE.PointsMaterial
    // Slow pulse
    mat.opacity = this.baseOpacity + Math.sin(time * 0.3 + this.mesh.position.x) * 0.05
  }

  dispose() {
    this.mesh.geometry.dispose()
    ;(this.mesh.material as THREE.PointsMaterial).dispose()
  }
}
