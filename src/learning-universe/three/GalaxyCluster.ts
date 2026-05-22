import * as THREE from 'three'
import { StarNode } from './StarNode'
import type { KnowledgeNode, GalaxyCluster } from '../types'
import { knowledgeNodes } from '../data/knowledge-graph'

/* ── Lightweight noise for procedural placement ──── */
function hash2D(x: number, y: number): number {
  let h = x * 374761393 + y * 668265263 + 1274126177
  h = (h ^ (h >> 13)) * 1274126177
  h = h ^ (h >> 16)
  return (h & 0x7fffffff) / 0x7fffffff
}

function smoothNoise2D(x: number, y: number): number {
  const ix = Math.floor(x); const iy = Math.floor(y)
  const fx = x - ix; const fy = y - iy
  const sx = fx * fx * (3 - 2 * fx); const sy = fy * fy * (3 - 2 * fy)
  const n00 = hash2D(ix, iy); const n10 = hash2D(ix + 1, iy)
  const n01 = hash2D(ix, iy + 1); const n11 = hash2D(ix + 1, iy + 1)
  return n00 + (n10 - n00) * sx + ((n01 + (n11 - n01) * sx) - (n00 + (n10 - n00) * sx)) * sy
}

function noise2D(x: number, y: number, octaves = 1): number {
  let value = 0, amplitude = 1, frequency = 1, maxValue = 0
  for (let i = 0; i < octaves; i++) {
    value += smoothNoise2D(x * frequency, y * frequency) * amplitude
    maxValue += amplitude; amplitude *= 0.5; frequency *= 2
  }
  return value / maxValue
}

/** Generate a glow sprite texture via canvas */
function makeGlowSprite(size = 64): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.9)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.4)')
  g.addColorStop(0.8, 'rgba(255,255,255,0.05)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

const glowSprite = makeGlowSprite()

/* ── Spiral galaxy parameters ──────────────────── */
interface SpiralParams {
  count: number        // star particle count
  radius: number       // galaxy radius
  branches: number     // number of spiral arms
  spin: number         // twist amount
  randomness: number   // how much stars deviate from arms
  randomnessPower: number // controls clustering (higher = tighter)
  thickness: number    // vertical spread (0-1)
  armWidth: number     // width of arm particles as fraction of radius
}

const DEFAULT_SPIRAL: SpiralParams = {
  count: 10000,
  radius: 28,
  branches: 3,
  spin: 1.5,
  randomness: 0.35,
  randomnessPower: 2.5,
  thickness: 0.25,
  armWidth: 0.3,
}

function generateSpiralGalaxy(
  params: SpiralParams,
  insideColor: THREE.Color,
  outsideColor: THREE.Color,
): { positions: Float32Array; colors: Float32Array; sizes: Float32Array } {
  const { count, radius, branches, spin, randomness, randomnessPower, thickness } = params
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Distance from center: more stars near center (pow < 1)
    const r = Math.pow(Math.random(), 1.2) * radius

    // Branch assignment: distribute uniformly
    const branchAngle = ((i % branches) / branches) * Math.PI * 2
    const spinAngle = r * spin

    // Random scatter: tighter near center, wider near edge
    const scatter = Math.pow(Math.random(), randomnessPower) * randomness * r
    const theta = Math.random() * Math.PI * 2

    const randomX = Math.cos(theta) * scatter
    const randomZ = Math.sin(theta) * scatter * 0.8
    const randomY = (Math.random() - 0.5) * r * thickness * 0.5

    const angle = branchAngle + spinAngle

    positions[i * 3] = Math.cos(angle) * r + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] = Math.sin(angle) * r + randomZ

    // Color: mix inside → outside based on radius
    const mix = r / radius
    const c = insideColor.clone().lerp(outsideColor, mix)
    // Per-star random brightness variation
    const bright = 0.6 + Math.random() * 0.4
    colors[i * 3] = c.r * bright
    colors[i * 3 + 1] = c.g * bright
    colors[i * 3 + 2] = c.b * bright

    // Size: bigger near center, smaller at edges
    sizes[i] = (0.08 + (1 - mix) * 0.3) * (0.6 + Math.random() * 0.8)
  }

  return { positions, colors, sizes }
}

export class GalaxyClusterNode {
  public group: THREE.Group
  public galaxy: GalaxyCluster
  public starNodes: StarNode[] = []
  public spiralPoints: THREE.Points | null = null
  public glowHalo: THREE.Points | null = null

  constructor(galaxy: GalaxyCluster) {
    this.galaxy = galaxy
    this.group = new THREE.Group()

    const cx = galaxy.position[0]
    const cy = galaxy.position[1]
    const cz = galaxy.position[2]

    // Add noise offset so galaxies don't sit on exact grid points
    const nx = galaxy.position[0]; const nz = galaxy.position[2]
    const offsetX = (noise2D(nx * 0.1, nz * 0.1, 3) - 0.5) * 20
    const offsetZ = (noise2D(nx * 0.1 + 100, nz * 0.1 + 100, 3) - 0.5) * 20
    this.group.position.set(cx + offsetX, cy, cz + offsetZ)

    // ── 1. Generate spiral star field ─────────────────
    this.buildSpiral()

    // ── 2. Place glow halo around galaxy center ────────
    this.buildHalo()

    // ── 3. Place knowledge nodes on spiral arms ────────
    this.placeKnowledgeNodes()
  }

  private buildSpiral() {
    const galaxyColor = new THREE.Color(this.galaxy.color)
    const insideColor = new THREE.Color('#ffcc80') // warm gold center
    const outsideColor = galaxyColor.clone()

    const params = { ...DEFAULT_SPIRAL }
    // More stars for bigger galaxies (more systems = bigger)
    const systemCount = this.galaxy.systems.length
    params.count = 10000 + systemCount * 2500
    params.radius = 30 + systemCount * 6

    const { positions, colors, sizes } = generateSpiralGalaxy(
      params, insideColor, outsideColor,
    )

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.25,
      map: glowSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    this.spiralPoints = new THREE.Points(geo, mat)
    this.spiralPoints.renderOrder = 1
    this.group.add(this.spiralPoints)
  }

  private buildHalo() {
    const count = 200
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    const baseColor = new THREE.Color(this.galaxy.color)
    const radius = 8

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.pow(Math.random(), 0.5) * radius
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.3
      positions[i * 3 + 2] = Math.cos(phi) * r

      const c = baseColor.clone()
      const bright = 0.3 + Math.random() * 0.4
      colors[i * 3] = c.r * bright
      colors[i * 3 + 1] = c.g * bright
      colors[i * 3 + 2] = c.b * bright

      sizes[i] = (1 + Math.random() * 3) * (1 - r / radius)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 1.5,
      map: glowSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    this.glowHalo = new THREE.Points(geo, mat)
    this.glowHalo.renderOrder = 0
    this.group.add(this.glowHalo)
  }

  private placeKnowledgeNodes() {
    const galaxyNodes = knowledgeNodes.filter(n => n.galaxy === this.galaxy.id)
    if (galaxyNodes.length === 0) return

    // Sort nodes by difficulty so easier ones are closer to center
    const sorted = [...galaxyNodes].sort((a, b) => a.difficulty - b.difficulty)
    const branches = DEFAULT_SPIRAL.branches
    const galaxyRadius = 30 + this.galaxy.systems.length * 6
    const spin = DEFAULT_SPIRAL.spin

    // Randomly assign each node to a branch + randomize order for natural look
    const assignments = sorted.map((node, i) => ({
      node,
      branch: Math.floor(Math.random() * branches),
      // Assign radial progression with randomness
      t: (i / Math.max(sorted.length - 1, 1)) * 0.8 + 0.1,
      // Pre-compute random offsets for each node
      radialJitter: (Math.random() - 0.5) * 10,
      angularJitter: (Math.random() - 0.5) * 0.4,
      heightJitter: (Math.random() - 0.5) * 4,
    }))

    for (const a of assignments) {
      const { node, branch, t, radialJitter, angularJitter, heightJitter } = a

      const radius = 4 + t * (galaxyRadius - 6) + radialJitter
      const spinAngle = radius * spin
      const branchAngle = (branch / branches) * Math.PI * 2
      const angle = branchAngle + spinAngle + angularJitter

      const localX = Math.cos(angle) * Math.max(1, radius)
      const localZ = Math.sin(angle) * Math.max(1, radius)
      const localY = heightJitter

      // Update node position in data
      node.position = [
        this.group.position.x + localX,
        this.group.position.y + localY,
        this.group.position.z + localZ,
      ]

      const color = getNodeColor(node)
      const star = new StarNode(node, new THREE.Color(color), localX, localY, localZ)
      star.mesh.userData = { nodeId: node.id, galaxyId: this.galaxy.id }
      this.starNodes.push(star)
      this.group.add(star.mesh)
    }
  }

  update(time: number) {
    // Slow rotation of spiral particles for depth feel
    if (this.spiralPoints) {
      this.spiralPoints.rotation.y += 0.00008
    }
    if (this.glowHalo) {
      this.glowHalo.rotation.y += 0.00015
      // Pulse halo opacity gently
      const mat = this.glowHalo.material as THREE.PointsMaterial
      mat.opacity = 0.12 + Math.sin(time * 0.3) * 0.04
    }
    // Update individual star nodes
    for (const star of this.starNodes) {
      star.update(time)
    }
  }

  dispose() {
    for (const star of this.starNodes) star.dispose()
    if (this.spiralPoints) {
      this.spiralPoints.geometry.dispose()
      ;(this.spiralPoints.material as THREE.Material).dispose()
    }
    if (this.glowHalo) {
      this.glowHalo.geometry.dispose()
      ;(this.glowHalo.material as THREE.Material).dispose()
    }
    this.starNodes = []
    this.spiralPoints = null
    this.glowHalo = null
  }
}

function getNodeColor(node: KnowledgeNode): string {
  switch (node.type) {
    case 'knowledge': return '#60a5fa'
    case 'project': return '#4ade80'
    case 'exercise': return '#fb923c'
    default: return '#60a5fa'
  }
}
