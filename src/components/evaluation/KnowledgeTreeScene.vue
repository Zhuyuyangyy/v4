<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import type {
  EvaluationTreeData,
  KnowledgeModule,
  KnowledgePoint,
  AppleRenderData,
  BranchRenderData,
} from '@/types/knowledge-tree'

const props = defineProps<{
  data: EvaluationTreeData | null
  loading?: boolean
  status?: 'analyzing' | 'completed'
  reducedMotion?: boolean
}>()

const emit = defineEmits<{
  (e: 'apple-hover', apple: AppleRenderData | null, event?: MouseEvent): void
  (e: 'apple-click', apple: AppleRenderData): void
  (e: 'branch-click', module: KnowledgeModule): void
  (e: 'background-click'): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const tooltip = ref<{ show: boolean; x: number; y: number; title: string; lines: string[] }>({
  show: false,
  x: 0,
  y: 0,
  title: '',
  lines: [],
})

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rafId = 0
let raycaster = new THREE.Raycaster()
let pointer = new THREE.Vector2(-999, -999)
let hoveredObject: THREE.Object3D | null = null
let selectedAppleMesh: THREE.Group | null = null

const apples: {
  mesh: THREE.Group
  data: AppleRenderData
  baseScale: number
  branchId: string
  bodyMat: THREE.MeshPhysicalMaterial
  stemMat: THREE.MeshStandardMaterial
  leafMat: THREE.MeshBasicMaterial
  breathPhase: number
  outline?: THREE.Mesh
}[] = []
const branches: { mesh: THREE.Mesh; data: BranchRenderData; baseColor: THREE.Color }[] = []
const branchNodes: BranchNode[] = []
let leafClusters: { mesh: THREE.InstancedMesh; dummy: THREE.Object3D; baseRotations: THREE.Euler[] }[] = []
let treeGroup: THREE.Group
let platformGroup: THREE.Group
let introProgress = 0

const TREE_SCALE = 1.8
const TRUNK_HEIGHT = 1.55 * TREE_SCALE
const TRUNK_BASE_RADIUS = 0.26 * TREE_SCALE
const TRUNK_TOP_RADIUS = 0.09 * TREE_SCALE
const CANOPY_BOTTOM_Y = 1.25 * TREE_SCALE
const CANOPY_TOP_Y = 2.55 * TREE_SCALE
const CANOPY_WIDTH = 2.4 * TREE_SCALE

function hexToRgb(hex: number) {
  return {
    r: ((hex >> 16) & 255) / 255,
    g: ((hex >> 8) & 255) / 255,
    b: (hex & 255) / 255,
  }
}

function masteryToColors(mastery: number): { color: number; emissive: number; intensity: number } {
  if (mastery === 0) return { color: 0x9e9e9e, emissive: 0x424242, intensity: 0 }
  if (mastery < 40) return { color: 0x1e88e5, emissive: 0x0d47a1, intensity: 0.08 }
  if (mastery < 60) return { color: 0x43a047, emissive: 0x1b5e20, intensity: 0.09 }
  if (mastery < 80) return { color: 0xff9800, emissive: 0xe65100, intensity: 0.1 }
  if (mastery < 95) return { color: 0xe53935, emissive: 0xb71c1c, intensity: 0.12 }
  return { color: 0xffd700, emissive: 0xb8860b, intensity: 0.15 }
}

function appleSizeByWeight(weight: number) {
  const base = 0.065 * TREE_SCALE
  const maxBonus = base * 0.1
  return base + Math.min(maxBonus, Math.max(0, (weight - 0.5) * 0.004 * TREE_SCALE))
}

function deterministicRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function createBarkTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#7a5a48'
  ctx.fillRect(0, 0, 512, 1024)

  const gradient = ctx.createLinearGradient(0, 0, 0, 1024)
  gradient.addColorStop(0, '#9a7a68')
  gradient.addColorStop(0.5, '#8a6a58')
  gradient.addColorStop(1, '#6a4a38')
  ctx.fillStyle = gradient
  ctx.globalAlpha = 0.6
  ctx.fillRect(0, 0, 512, 1024)

  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 1024
    const w = 1 + Math.random() * 3
    const h = 8 + Math.random() * 55
    ctx.fillStyle = Math.random() > 0.5 ? '#5a3a28' : '#b09078'
    ctx.globalAlpha = 0.15 + Math.random() * 0.2
    ctx.fillRect(x, y, w, h)
  }

  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 1024
    const r = 1 + Math.random() * 2.5
    ctx.fillStyle = Math.random() > 0.5 ? '#4a2e1e' : '#9c7c64'
    ctx.globalAlpha = 0.1 + Math.random() * 0.12
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 1)
  return texture
}

function createLeafTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.translate(64, 64)

  const grad = ctx.createRadialGradient(-8, -10, 0, 0, 0, 56)
  grad.addColorStop(0, 'rgba(75, 160, 75, 0.96)')
  grad.addColorStop(0.35, 'rgba(45, 110, 45, 0.92)')
  grad.addColorStop(0.7, 'rgba(30, 75, 35, 0.7)')
  grad.addColorStop(1, 'rgba(10, 40, 15, 0)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.ellipse(0, 0, 22, 34, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(145, 210, 145, 0.22)'
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(0, -28)
  ctx.lineTo(0, 28)
  ctx.stroke()

  return new THREE.CanvasTexture(canvas)
}

let barkTexture: THREE.CanvasTexture
let leafTexture: THREE.CanvasTexture
let barkMaterial: THREE.MeshStandardMaterial
let leafMaterial: THREE.MeshBasicMaterial

function initScene() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  scene = new THREE.Scene()
  scene.background = null

  const backdrop = new THREE.Mesh(
    new THREE.SphereGeometry(18, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x0d1b2a,
      transparent: true,
      opacity: 0.55,
      side: THREE.BackSide,
    })
  )
  backdrop.position.set(0, 2, 0)
  scene.add(backdrop)

  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
  camera.position.set(0, 2.8, 6.2)
  camera.lookAt(0, 2.0, 0)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  treeGroup = new THREE.Group()
  platformGroup = new THREE.Group()
  scene.add(treeGroup)
  scene.add(platformGroup)

  barkTexture = createBarkTexture()
  leafTexture = createLeafTexture()

  barkMaterial = new THREE.MeshStandardMaterial({
    map: barkTexture,
    color: 0xffffff,
    roughness: 0.82,
    metalness: 0.02,
    bumpMap: barkTexture,
    bumpScale: 0.02,
  })

  leafMaterial = new THREE.MeshBasicMaterial({
    map: leafTexture,
    color: 0x4a7c4a,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  addLights()
  buildBase()
  buildTrunk()

  window.addEventListener('resize', onResize)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)
  canvas.addEventListener('click', onClick)

  animate()
}

function addLights() {
  if (!scene) return

  const ambient = new THREE.AmbientLight(0x3a4a5a, 0.6)
  scene.add(ambient)

  const sunLight = new THREE.DirectionalLight(0xfff4e5, 1.0)
  sunLight.position.set(2.8, 8, 4)
  sunLight.castShadow = false
  scene.add(sunLight)

  const fillLight = new THREE.DirectionalLight(0xa8c4e0, 0.35)
  fillLight.position.set(-4, 4, 3.5)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0x9ec0d8, 0.28)
  rimLight.position.set(3, 2.5, -3.5)
  scene.add(rimLight)

  const canopyFill = new THREE.DirectionalLight(0xc8e0c8, 0.18)
  canopyFill.position.set(0, 6, 0)
  scene.add(canopyFill)

  const groundBounce = new THREE.PointLight(0x46b5d1, 0.1, 6)
  groundBounce.position.set(0, 0.3, 1.5)
  scene.add(groundBounce)
}

function buildBase() {
  if (!platformGroup) return

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.25, 64),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.002
  shadow.scale.set(1, 0.42, 1)
  platformGroup.add(shadow)

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.22, 1.226, 96),
    new THREE.MeshBasicMaterial({ color: 0x46b5d1, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.003
  platformGroup.add(ring)
}

function buildTrunk() {
  if (!treeGroup) return

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.04, 0.02, 0.03),
    new THREE.Vector3(-0.03, TRUNK_HEIGHT * 0.22, -0.02),
    new THREE.Vector3(0.05, TRUNK_HEIGHT * 0.48, 0.02),
    new THREE.Vector3(-0.02, TRUNK_HEIGHT * 0.75, -0.015),
    new THREE.Vector3(0.015, TRUNK_HEIGHT, 0.01),
  ])

  const segments = 56
  const radialSegments = 20
  const geometry = new THREE.CylinderGeometry(1, 1, TRUNK_HEIGHT, radialSegments, segments, true)
  const pos = geometry.attributes.position

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) + TRUNK_HEIGHT / 2
    const t = Math.max(0, Math.min(1, y / TRUNK_HEIGHT))
    const point = curve.getPointAt(t)
    const radius = TRUNK_BASE_RADIUS * (1 - t * 0.96) + TRUNK_TOP_RADIUS * t
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const angle = Math.atan2(z, x)

    const noise = 1 + Math.sin(angle * 7 + t * 14) * 0.035 + Math.cos(t * 22) * 0.02
    const finalRadius = radius * noise * (1 - t * 0.08)

    pos.setXYZ(i, point.x + Math.cos(angle) * finalRadius, point.y, point.z + Math.sin(angle) * finalRadius)
  }
  geometry.computeVertexNormals()

  const trunk = new THREE.Mesh(geometry, barkMaterial)
  trunk.name = 'trunk'
  trunk.userData = { type: 'trunk' }
  treeGroup.add(trunk)

  buildRoots()
}

function buildRoots() {
  if (!treeGroup) return
  const rootCount = 6
  const rand = deterministicRandom(42)
  for (let i = 0; i < rootCount; i++) {
    const angle = (i / rootCount) * Math.PI * 2 + (rand() - 0.5) * 0.25
    const r = 0.42 + rand() * 0.22
    const rootPoints = [
      new THREE.Vector3(Math.cos(angle) * 0.14, 0.35, Math.sin(angle) * 0.14),
      new THREE.Vector3(Math.cos(angle) * 0.24, 0.12, Math.sin(angle) * 0.24),
      new THREE.Vector3(Math.cos(angle) * r, 0.02, Math.sin(angle) * r),
      new THREE.Vector3(Math.cos(angle) * (r + 0.2), 0.005, Math.sin(angle) * (r + 0.2)),
    ]
    const curve = new THREE.CatmullRomCurve3(rootPoints)
    const radius = 0.05 - i * 0.003
    const geometry = buildTaperedBranchGeometry(curve, radius, radius * 0.3, 14)
    const root = new THREE.Mesh(geometry, barkMaterial)
    root.name = 'root'
    treeGroup.add(root)
  }
}

function buildTaperedBranchGeometry(
  curve: THREE.CatmullRomCurve3,
  startRadius: number,
  endRadius: number,
  segments = 24,
  radialSegments = 10
) {
  const avgRadius = (startRadius + endRadius) * 0.5
  const geometry = new THREE.TubeGeometry(curve, segments, avgRadius, radialSegments, false)
  geometry.computeVertexNormals()
  return geometry
}

interface BranchNode {
  id: string
  moduleId: string
  moduleName: string
  color: string
  curve: THREE.CatmullRomCurve3
  startRadius: number
  endRadius: number
  level: number
  parentId?: string
  children: BranchNode[]
  startPoint: THREE.Vector3
  endPoint: THREE.Vector3
  mesh?: THREE.Mesh
  isMain: boolean
}

function buildBranchGeometry(points: THREE.Vector3[], startRadius: number, endRadius: number, segments = 20) {
  const invalid = points.findIndex((p) => !p || typeof p.x !== 'number' || isNaN(p.x))
  if (invalid >= 0) {
    console.error('[TreeDebug] invalid branch point at', invalid, points)
    ;(window as any).__treeDebug = { ...(window as any).__treeDebug, invalidBranchPoint: invalid, points: points.map((p) => (p ? { x: p.x, y: p.y, z: p.z } : null)) }
    const safe = points.map((p) => (p && typeof p.x === 'number' ? p : new THREE.Vector3(0, 1, 0)))
    const curve = new THREE.CatmullRomCurve3(safe)
    const geometry = buildTaperedBranchGeometry(curve, startRadius, endRadius, segments, 8)
    return { geometry, curve }
  }
  const curve = new THREE.CatmullRomCurve3(points)
  const geometry = buildTaperedBranchGeometry(curve, startRadius, endRadius, segments, 8)
  return { geometry, curve }
}

function createBranchNode(
  id: string,
  module: KnowledgeModule,
  points: THREE.Vector3[],
  startRadius: number,
  endRadius: number,
  level: number,
  parentId?: string,
  isMain = false
): BranchNode {
  const { geometry, curve } = buildBranchGeometry(points, startRadius, endRadius, level === 0 ? 30 : 18)
  const mesh = new THREE.Mesh(geometry, barkMaterial)
  mesh.userData = {
    type: 'branch',
    data: {
      id,
      name: module.name,
      moduleId: module.id,
      parentId,
      avgMastery: module.avgMastery,
      isMain,
      points: points.map((p) => ({ x: p.x, y: p.y, z: p.z })),
      radius: startRadius,
      color: module.color,
    } as BranchRenderData,
  }
  mesh.name = id
  branches.push({ mesh, data: mesh.userData.data as BranchRenderData, baseColor: new THREE.Color(0x5c4030) })
  return {
    id,
    moduleId: module.id,
    moduleName: module.name,
    color: module.color,
    curve,
    startRadius,
    endRadius,
    level,
    parentId,
    children: [],
    startPoint: points[0],
    endPoint: points[points.length - 1],
    mesh,
    isMain,
  }
}

function buildTree() {
  if (!props.data || !treeGroup) return
  clearTreeContent()

  const modules = props.data.modules.slice(0, 6)
  const rand = deterministicRandom(2024)

  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.04, 0.02, 0.03),
    new THREE.Vector3(-0.03, TRUNK_HEIGHT * 0.22, -0.02),
    new THREE.Vector3(0.05, TRUNK_HEIGHT * 0.48, 0.02),
    new THREE.Vector3(-0.02, TRUNK_HEIGHT * 0.75, -0.015),
    new THREE.Vector3(0.015, TRUNK_HEIGHT, 0.01),
  ])

  const mainBranchConfigs = [
    { angle: 0.15, height: 1.85, spread: 1.25, length: 0.92, bend: 0.18, trunkT: 0.72 },
    { angle: 1.15, height: 2.0, spread: 1.35, length: 1.02, bend: 0.16, trunkT: 0.76 },
    { angle: 2.05, height: 2.1, spread: 1.4, length: 1.1, bend: 0.14, trunkT: 0.8 },
    { angle: 3.0, height: 2.0, spread: 1.35, length: 1.05, bend: 0.16, trunkT: 0.78 },
    { angle: 3.95, height: 1.85, spread: 1.25, length: 0.9, bend: 0.18, trunkT: 0.74 },
    { angle: 4.9, height: 1.7, spread: 1.15, length: 0.85, bend: 0.2, trunkT: 0.7 },
  ]

  const terminalBranches: BranchNode[] = []

  modules.forEach((module, mIdx) => {
    const cfg = mainBranchConfigs[mIdx % mainBranchConfigs.length]
    const moduleId = module.id
    const start = trunkCurve.getPoint(cfg.trunkT)

    const horizontal = new THREE.Vector3(Math.cos(cfg.angle), 0, Math.sin(cfg.angle))
    const end = new THREE.Vector3(
      start.x + horizontal.x * cfg.spread * 0.85 * TREE_SCALE + (rand() - 0.5) * 0.12 * TREE_SCALE,
      cfg.height * TREE_SCALE,
      start.z + horizontal.z * cfg.spread * 0.85 * TREE_SCALE + (rand() - 0.5) * 0.12 * TREE_SCALE
    )
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5).add(new THREE.Vector3(0, cfg.bend * TREE_SCALE, 0))
    const mainRadius = (0.11 + (1 - cfg.trunkT) * 0.04) * TREE_SCALE

    const mainNode = createBranchNode(
      `main-${moduleId}`,
      module,
      [start, mid, end],
      mainRadius,
      mainRadius * 0.5,
      0,
      undefined,
      true
    )
    branchNodes.push(mainNode)
    treeGroup.add(mainNode.mesh!)

    const primaryCount = 3 + Math.floor(rand() * 2)
    for (let pIdx = 0; pIdx < primaryCount; pIdx++) {
      const t = 0.22 + (pIdx / (primaryCount - 1)) * 0.56
      const angleOffset = (pIdx - (primaryCount - 1) / 2) * 0.55
      const baseAngle = cfg.angle + angleOffset + (rand() - 0.5) * 0.2

      const pStart = mainNode.curve.getPoint(t)
      const pTangent = mainNode.curve.getTangent(t)
      const up = new THREE.Vector3(0, 1, 0)
      const horizontalDir = new THREE.Vector3(Math.cos(baseAngle), 0, Math.sin(baseAngle))
      const dir = new THREE.Vector3()
        .addVectors(horizontalDir.multiplyScalar(0.9), up.multiplyScalar(0.35 + rand() * 0.1))
        .normalize()
      dir.applyAxisAngle(pTangent, (rand() - 0.5) * 0.4)

      const pLength = (0.5 + rand() * 0.32) * TREE_SCALE
      const pEnd = pStart.clone().add(dir.multiplyScalar(pLength))
      const pMid = new THREE.Vector3().lerpVectors(pStart, pEnd, 0.5).add(new THREE.Vector3(0, (0.16 + rand() * 0.1) * TREE_SCALE, 0))
      const pRadius = mainNode.endRadius * (0.62 + rand() * 0.12)

      const primaryNode = createBranchNode(
        `primary-${moduleId}-${pIdx}`,
        module,
        [pStart, pMid, pEnd],
        pRadius,
        pRadius * 0.55,
        1,
        mainNode.id,
        false
      )
      branchNodes.push(primaryNode)
      mainNode.children.push(primaryNode)
      treeGroup.add(primaryNode.mesh!)

      const secondaryCount = 2 + Math.floor(rand() * 2)
      for (let sIdx = 0; sIdx < secondaryCount; sIdx++) {
        const st = 0.28 + (sIdx / (secondaryCount - 1)) * 0.55
        const sAngleOffset = (sIdx - (secondaryCount - 1) / 2) * 0.7
        const sBaseAngle = baseAngle + sAngleOffset + (rand() - 0.5) * 0.25

        const sStart = primaryNode.curve.getPoint(st)
        const sTangent = primaryNode.curve.getTangent(st)
        const sHorizontal = new THREE.Vector3(Math.cos(sBaseAngle), 0, Math.sin(sBaseAngle))
        const sDir = new THREE.Vector3()
                  .addVectors(sHorizontal.multiplyScalar(0.82), up.multiplyScalar(0.3 + rand() * 0.1))
                  .normalize()
        sDir.applyAxisAngle(sTangent, (rand() - 0.5) * 0.5)

        const sLength = (0.28 + rand() * 0.2) * TREE_SCALE
        const sEnd = sStart.clone().add(sDir.multiplyScalar(sLength))
        const sMid = new THREE.Vector3().lerpVectors(sStart, sEnd, 0.5).add(new THREE.Vector3(0, (0.09 + rand() * 0.07) * TREE_SCALE, 0))
        const sRadius = primaryNode.endRadius * (0.68 + rand() * 0.12)

        const secondaryNode = createBranchNode(
          `secondary-${moduleId}-${pIdx}-${sIdx}`,
          module,
          [sStart, sMid, sEnd],
          sRadius,
          sRadius * 0.55,
          2,
          primaryNode.id,
          false
        )
        branchNodes.push(secondaryNode)
        primaryNode.children.push(secondaryNode)
        treeGroup.add(secondaryNode.mesh!)

        const twigCount = 1 + Math.floor(rand() * 2)
        for (let twIdx = 0; twIdx < twigCount; twIdx++) {
          const twT = 0.35 + (twIdx / (twigCount - 1)) * 0.5
          const twAngleOffset = (twIdx - (twigCount - 1) / 2) * 0.9
          const twBaseAngle = sBaseAngle + twAngleOffset + (rand() - 0.5) * 0.3

          const twStart = secondaryNode.curve.getPoint(twT)
          const twTangent = secondaryNode.curve.getTangent(twT)
          const twHorizontal = new THREE.Vector3(Math.cos(twBaseAngle), 0, Math.sin(twBaseAngle))
          const twDir = new THREE.Vector3()
                    .addVectors(twHorizontal.multiplyScalar(0.78), up.multiplyScalar(0.25 + rand() * 0.08))
                    .normalize()
          twDir.applyAxisAngle(twTangent, (rand() - 0.5) * 0.55)

          const twLength = (0.12 + rand() * 0.1) * TREE_SCALE
          const twEnd = twStart.clone().add(twDir.multiplyScalar(twLength))
          const twMid = new THREE.Vector3().lerpVectors(twStart, twEnd, 0.5).add(new THREE.Vector3(0, (0.04 + rand() * 0.04) * TREE_SCALE, 0))
          const twRadius = secondaryNode.endRadius * (0.7 + rand() * 0.15)

          const twigNode = createBranchNode(
            `twig-${moduleId}-${pIdx}-${sIdx}-${twIdx}`,
            module,
            [twStart, twMid, twEnd],
            twRadius,
            twRadius * 0.55,
            3,
            secondaryNode.id,
            false
          )
          branchNodes.push(twigNode)
          secondaryNode.children.push(twigNode)
          treeGroup.add(twigNode.mesh!)

          terminalBranches.push(twigNode)
          addLeafCluster(twigNode.endPoint, 0.32 + rand() * 0.14, rand)
          addLeafCluster(
            new THREE.Vector3().lerpVectors(twigNode.startPoint, twigNode.endPoint, 0.6),
            0.26 + rand() * 0.1,
            rand
          )
        }

        addLeafCluster(
          new THREE.Vector3().lerpVectors(secondaryNode.startPoint, secondaryNode.endPoint, 0.72),
          0.3 + rand() * 0.12,
          rand
        )
      }

      addLeafCluster(
        new THREE.Vector3().lerpVectors(primaryNode.startPoint, primaryNode.endPoint, 0.65),
        0.28 + rand() * 0.1,
        rand
      )

      addLeafCluster(
        new THREE.Vector3().lerpVectors(primaryNode.startPoint, primaryNode.endPoint, 0.35),
        0.22 + rand() * 0.08,
        rand
      )
    }
  })

  distributeApples(modules, terminalBranches)
  introProgress = 0
}

function addLeafCluster(center: THREE.Vector3, radius: number, rand: () => number) {
  const count = 24 + Math.floor(rand() * 20)
  const geometry = new THREE.PlaneGeometry(0.22, 0.34)
  const mesh = new THREE.InstancedMesh(geometry, leafMaterial, count)
  mesh.name = 'leaf-cluster'
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

  const dummy = new THREE.Object3D()
  const baseRotations: THREE.Euler[] = []

  for (let i = 0; i < count; i++) {
    const phi = rand() * Math.PI * 2
    const theta = rand() * Math.PI * 0.6
    const r = Math.pow(rand(), 0.7) * radius
    const x = Math.sin(theta) * Math.cos(phi) * r
    const y = Math.cos(theta) * r * 0.55
    const z = Math.sin(theta) * Math.sin(phi) * r

    dummy.position.set(center.x + x, center.y + y, center.z + z)
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI)
    const scale = 0.85 + rand() * 0.55
    dummy.scale.setScalar(scale)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)

    baseRotations.push(dummy.rotation.clone())
  }

  treeGroup.add(mesh)
  leafClusters.push({ mesh, dummy, baseRotations })
}

const appleGeometry = new THREE.SphereGeometry(1, 20, 20)
appleGeometry.scale(1, 0.9, 1)
const appleStemGeometry = new THREE.CylinderGeometry(0.0045, 0.0035, 0.04, 6)
const appleLeafGeometry = new THREE.PlaneGeometry(0.02, 0.03)

function createAppleMesh(color: number, emissive: number, intensity: number, size: number) {
  const group = new THREE.Group()

  const appleMat = new THREE.MeshPhysicalMaterial({
    color,
    emissive,
    emissiveIntensity: intensity,
    metalness: 0.01,
    roughness: 0.36,
    clearcoat: 0.12,
    clearcoatRoughness: 0.45,
    transparent: color === 0x6f8294,
    opacity: color === 0x6f8294 ? 0.8 : 1,
  })
  const apple = new THREE.Mesh(appleGeometry, appleMat)
  apple.name = 'apple-body'
  apple.scale.setScalar(size)
  group.add(apple)

  const stemMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })
  const stem = new THREE.Mesh(appleStemGeometry, stemMat)
  stem.position.y = size * 0.36
  stem.rotation.z = 0.15
  group.add(stem)

  const leafMat = new THREE.MeshBasicMaterial({ color: 0x558b2f, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
  const leaf = new THREE.Mesh(appleLeafGeometry, leafMat)
  leaf.position.set(size * 0.14, size * 0.42, 0)
  leaf.rotation.set(0.3, 0, -0.45)
  group.add(leaf)

  return { group, appleMat, stemMat, leafMat }
}

function createAppleOutline(size: number) {
  const geometry = new THREE.SphereGeometry(size * 1.16, 20, 20)
  geometry.scale(1, 0.9, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide,
    depthWrite: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'apple-outline'
  return mesh
}

function hashString(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function distributeApples(modules: KnowledgeModule[], terminalBranches: BranchNode[]) {
  const moduleBranches: Record<string, BranchNode[]> = {}
  terminalBranches.forEach((tb) => {
    if (!moduleBranches[tb.moduleId]) moduleBranches[tb.moduleId] = []
    moduleBranches[tb.moduleId].push(tb)
  })

  const placedPositions: THREE.Vector3[] = []
  const minDistSq = (0.09 * TREE_SCALE) ** 2

  modules.forEach((module) => {
    const branchesForModule = moduleBranches[module.id] || []
    if (branchesForModule.length === 0) return

    const points = module.units.flatMap((u) => u.points)

    points.forEach((point, pIdx) => {
      const rand = deterministicRandom(hashString(module.id) + hashString(point.id) + pIdx + 2024)
      let attempts = 0
      let applePos: THREE.Vector3 | null = null
      let hangPoint: THREE.Vector3 | null = null
      let selectedBranch: BranchNode | null = null

      while (attempts < 30 && !applePos) {
        const branchIdx = Math.floor(rand() * branchesForModule.length)
        const branch = branchesForModule[branchIdx]
        const t = 0.35 + rand() * 0.55
        const posOnCurve = branch.curve.getPoint(t)
        const tangent = branch.curve.getTangent(t)
        const gravity = new THREE.Vector3(0, -1, 0)
        const hangDir = new THREE.Vector3()
          .addVectors(tangent.clone().multiplyScalar(0.08), gravity.clone().multiplyScalar(0.92))
          .normalize()

        const size = appleSizeByWeight(point.weight)
        const hangLength = size * 0.85
        const candidate = posOnCurve.clone().add(hangDir.multiplyScalar(hangLength))

        const tooClose = placedPositions.some((p) => p.distanceToSquared(candidate) < minDistSq)
        if (!tooClose && candidate.y > 0.45 && candidate.y < CANOPY_TOP_Y - 0.1) {
          applePos = candidate
          hangPoint = posOnCurve
          selectedBranch = branch
        }
        attempts++
      }

      if (!applePos || !hangPoint || !selectedBranch) return
      placedPositions.push(applePos)

      const { color, emissive, intensity } = masteryToColors(point.mastery)
      const size = appleSizeByWeight(point.weight)
      const { group, appleMat, stemMat, leafMat } = createAppleMesh(color, emissive, intensity, size)
      group.position.copy(applePos)
      group.userData = { type: 'apple', data: point, moduleId: module.id, branchId: selectedBranch.id }
      group.name = `apple-${point.id}`
      group.visible = true
      treeGroup.add(group)

      apples.push({
        mesh: group,
        data: {
          point,
          position: { x: applePos.x, y: applePos.y, z: applePos.z },
          branchEnd: { x: hangPoint.x, y: hangPoint.y, z: hangPoint.z },
          size,
          color: '#' + new THREE.Color(color).getHexString(),
          emissive: '#' + new THREE.Color(emissive).getHexString(),
          unitId: point.unit || '',
          moduleId: module.id,
        },
        baseScale: 1,
        branchId: selectedBranch.id,
        bodyMat: appleMat,
        stemMat,
        leafMat,
        breathPhase: rand() * Math.PI * 2,
      })
    })
  })
}

function clearTreeContent() {
  apples.splice(0, apples.length)
  branches.splice(0, branches.length)
  branchNodes.splice(0, branchNodes.length)

  leafClusters.forEach((lc) => {
    lc.mesh.geometry.dispose()
    treeGroup.remove(lc.mesh)
  })
  leafClusters.splice(0, leafClusters.length)

  const keep = new Set<string>(['trunk'])
  for (let i = treeGroup.children.length - 1; i >= 0; i--) {
    const child = treeGroup.children[i]
    if (!keep.has(child.name)) {
      treeGroup.remove(child)
      if (child instanceof THREE.Mesh || child instanceof THREE.Group || child instanceof THREE.InstancedMesh) {
        child.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
            obj.geometry?.dispose()
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
            else obj.material?.dispose()
          }
        })
      }
    }
  }
}

function onResize() {
  if (!canvasRef.value || !renderer || !camera) return
  const width = canvasRef.value.clientWidth
  const height = canvasRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function onPointerMove(event: PointerEvent) {
  if (!canvasRef.value || !camera || !scene) return
  const rect = canvasRef.value.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(treeGroup.children, true)
  const hit = intersects.find((i) => {
    const type = i.object.userData?.type
    return type === 'apple' || type === 'branch'
  })

  if (hit) {
    const obj = hit.object as THREE.Object3D
    if (obj.userData.type === 'apple') {
      let group = obj
      while (group.parent && group.parent !== treeGroup) group = group.parent
      const appleData = apples.find((a) => a.mesh === group)
      if (appleData) {
        hoverApple(appleData)
        showTooltip(event, appleData.data.point)
      }
    } else if (obj.userData.type === 'branch') {
      hoverBranch(obj as THREE.Mesh)
      hideTooltip()
    } else {
      clearHover()
      hideTooltip()
    }
  } else {
    clearHover()
    hideTooltip()
  }
}

function onPointerLeave() {
  clearHover()
  hideTooltip()
}

function onClick(event: MouseEvent) {
  if (!canvasRef.value || !camera || !scene) return
  const rect = canvasRef.value.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(treeGroup.children, true)
  const hit = intersects.find((i) => {
    const type = i.object.userData?.type
    return type === 'apple' || type === 'branch'
  })
  if (hit) {
    const obj = hit.object as THREE.Object3D
    if (obj.userData.type === 'apple') {
      let group = obj
      while (group.parent && group.parent !== treeGroup) group = group.parent
      const appleData = apples.find((a) => a.mesh === group)
      if (appleData) {
        selectApple(appleData)
        emit('apple-click', appleData.data)
      }
    } else if (obj.userData.type === 'branch') {
      const mesh = obj as THREE.Mesh
      const module = props.data?.modules.find((m) => m.id === mesh.userData.data.moduleId)
      if (module) emit('branch-click', module)
    }
  } else {
    clearSelection()
    emit('background-click')
  }
}

function hoverApple(apple: (typeof apples)[0]) {
  clearHover()
  hoveredObject = apple.mesh
  apple.mesh.scale.setScalar(1.04)
  const body = apple.mesh.getObjectByName('apple-body') as THREE.Mesh | undefined
  if (body) {
    const mat = body.material as THREE.MeshPhysicalMaterial
    mat.emissiveIntensity = Math.min(0.22, mat.emissiveIntensity + 0.08)
  }

  const branch = branches.find((b) => b.data.id === apple.branchId)
  if (branch) {
    const highlightMat = barkMaterial.clone()
    highlightMat.color = new THREE.Color(0x6b4d3a)
    branch.mesh.material = highlightMat
  }
}

function hoverBranch(branchMesh: THREE.Mesh) {
  clearHover()
  hoveredObject = branchMesh
  const moduleId = branchMesh.userData.data.moduleId
  branches.forEach((b) => {
    if (b.data.moduleId !== moduleId) {
      const dimMat = barkMaterial.clone()
      dimMat.color = new THREE.Color(0x3d2b1f).multiplyScalar(0.72)
      b.mesh.material = dimMat
    } else {
      const highlightMat = barkMaterial.clone()
      highlightMat.color = new THREE.Color(0x6b4d3a)
      b.mesh.material = highlightMat
    }
  })
  apples.forEach((a) => {
    const dim = a.data.moduleId !== moduleId
    a.mesh.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.name === 'apple-body') {
        const m = obj.material as THREE.MeshPhysicalMaterial
        m.opacity = dim ? 0.32 : a.data.point.mastery === 0 ? 0.8 : 1
      }
    })
  })
}

function clearHover() {
  if (hoveredObject) {
    if (hoveredObject.userData.type === 'apple') {
      const apple = apples.find((a) => a.mesh === hoveredObject)
      if (apple) {
        apple.mesh.scale.setScalar(apple.mesh === selectedAppleMesh ? 1.04 : 1)
        const body = apple.mesh.getObjectByName('apple-body') as THREE.Mesh | undefined
        if (body) {
          const mat = body.material as THREE.MeshPhysicalMaterial
          const original = masteryToColors(apple.data.point.mastery)
          mat.emissiveIntensity = original.intensity
        }
      }
    }
    branches.forEach((b) => {
      b.mesh.material = barkMaterial
    })
    apples.forEach((a) => {
      a.mesh.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.name === 'apple-body') {
          const m = obj.material as THREE.MeshPhysicalMaterial
          m.opacity = a.data.point.mastery === 0 ? 0.8 : 1
        }
      })
    })
  }
  hoveredObject = null
}

function selectApple(apple: (typeof apples)[0]) {
  clearSelection()
  selectedAppleMesh = apple.mesh
  apple.mesh.scale.setScalar(1.04)
  const outline = createAppleOutline(apple.data.size)
  apple.mesh.add(outline)
  apple.outline = outline
}

function clearSelection() {
  if (selectedAppleMesh) {
    selectedAppleMesh.scale.setScalar(1)
    const apple = apples.find((a) => a.mesh === selectedAppleMesh)
    if (apple && apple.outline) {
      selectedAppleMesh.remove(apple.outline)
      apple.outline.geometry.dispose()
      if (Array.isArray(apple.outline.material)) apple.outline.material.forEach((m) => m.dispose())
      else apple.outline.material.dispose()
      apple.outline = undefined
    }
    selectedAppleMesh = null
  }
}

function showTooltip(event: PointerEvent, point: KnowledgePoint) {
  tooltip.value = {
    show: true,
    x: event.clientX + 14,
    y: event.clientY + 14,
    title: point.name,
    lines: [`掌握度 ${point.mastery.toFixed(1)}%`, `置信度 ${point.confidence.toFixed(0)}%`, point.module],
  }
}

function hideTooltip() {
  tooltip.value.show = false
}

function animate() {
  rafId = requestAnimationFrame(animate)
  const now = performance.now() * 0.001

  introProgress = Math.min(1, introProgress + 0.015)

  const motionEnabled = !props.reducedMotion
  apples.forEach((a) => {
    if (motionEnabled && a.mesh.visible && a.mesh !== hoveredObject && a.mesh !== selectedAppleMesh) {
      const breathe = 1 + Math.sin(now * 0.6 + a.breathPhase) * 0.01
      a.mesh.scale.setScalar(breathe)
    }
  })

  if (motionEnabled) {
    leafClusters.forEach((lc, clusterIdx) => {
      const wind = Math.sin(now * 0.35 + clusterIdx) * 0.012
      for (let i = 0; i < lc.mesh.count; i++) {
        lc.mesh.getMatrixAt(i, lc.dummy.matrix)
        lc.dummy.matrix.decompose(lc.dummy.position, lc.dummy.quaternion, lc.dummy.scale)
        lc.dummy.rotation.copy(lc.baseRotations[i])
        lc.dummy.rotation.z += wind
        lc.dummy.rotation.x += wind * 0.4
        lc.dummy.updateMatrix()
        lc.mesh.setMatrixAt(i, lc.dummy.matrix)
      }
      lc.mesh.instanceMatrix.needsUpdate = true
    })
  }

  renderer?.render(scene!, camera!)
}

onMounted(() => {
  initScene()
  if (props.data) buildTree()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  if (canvasRef.value) {
    canvasRef.value.removeEventListener('pointermove', onPointerMove)
    canvasRef.value.removeEventListener('pointerleave', onPointerLeave)
    canvasRef.value.removeEventListener('click', onClick)
  }
  renderer?.dispose()
})

watch(
  () => props.data,
  () => {
    if (scene && treeGroup) buildTree()
  },
  { deep: true }
)
</script>

<template>
  <div class="knowledge-tree-scene">
    <canvas ref="canvasRef" class="tree-canvas" />
    <transition name="fade">
      <div v-if="tooltip.show" class="tree-tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        <div class="tooltip-title">{{ tooltip.title }}</div>
        <div v-for="(line, i) in tooltip.lines" :key="i" class="tooltip-line">{{ line }}</div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.knowledge-tree-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tree-canvas {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
}
.tree-tooltip {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  background: rgba(11, 24, 36, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 14px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  color: var(--text-main, #f2f6fa);
  font-size: 12px;
  min-width: 140px;
}
.tooltip-title {
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-main, #f2f6fa);
}
.tooltip-line {
  line-height: 1.6;
  color: var(--text-sub, #a9b8c7);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
