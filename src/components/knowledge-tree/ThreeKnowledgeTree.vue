<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

interface KnowledgePoint {
  name: string
  status?: 'mastered' | 'learning' | 'weak' | 'next'
  progress?: number
}

type MarkerType = 'course' | 'branch' | 'knowledge'

const PRIMARY_TREE_MODEL_URL = '/knowledge-tree/dashu.glb'
const FALLBACK_TREE_MODEL_URL = '/knowledge-tree/knowledge-tree-real.glb'
const BACKGROUND_STAGE_MODEL_URL = '/knowledge-tree/glb/main%20to%20tree.glb'
const LEFT_STAGE_MODEL_URL = '/knowledge-tree/glb/leftglb.glb'
const RIGHT_STAGE_MODEL_URL = '/knowledge-tree/glb/rightglb.glb'

interface GeometryBucket {
  geometries: THREE.BufferGeometry[]
  material?: THREE.Material | THREE.Material[]
}

interface GraphMarker {
  id: string
  type: MarkerType
  label: string
  status?: KnowledgePoint['status']
  progress?: number
  description: string
  items?: string[]
}

const props = withDefaults(
  defineProps<{
    modelUrl?: string
    height?: number | string
    fill?: boolean
    knowledgePoints?: KnowledgePoint[]
    sceneScale?: number
    sceneOffsetY?: number
  }>(),
  {
    modelUrl: PRIMARY_TREE_MODEL_URL,
    height: 480,
    fill: false,
    knowledgePoints: () => [],
    sceneScale: 11.4,
    sceneOffsetY: 4.35,
  },
)

const emit = defineEmits<{
  markerSelect: [marker: GraphMarker]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const loadError = ref(false)
const activeMarker = ref<GraphMarker | null | any>(null)
const activeMarkerView = computed<GraphMarker>(() => activeMarker.value ?? {
  id: 'empty',
  type: 'knowledge',
  label: '',
  progress: 0,
  description: '',
})

const courseProgress = computed(() => {
  if (!props.knowledgePoints.length) return 0
  const total = props.knowledgePoints.reduce((sum, point) => sum + (point.progress ?? 0), 0)
  return Math.round(total / props.knowledgePoints.length)
})

const branchGroups = computed(() => {
  const points = props.knowledgePoints.length
    ? props.knowledgePoints
    : [
        { name: '编程基础', status: 'mastered' as const, progress: 90 },
        { name: '数据结构', status: 'learning' as const, progress: 68 },
        { name: '图结构与搜索', status: 'weak' as const, progress: 38 },
      ]

  // 按 course 字段分组
  const courseMap = new Map<string, KnowledgePoint[]>()
  points.forEach(p => {
    const course = (p as any).course ?? '未分类'
    if (!courseMap.has(course)) courseMap.set(course, [])
    courseMap.get(course)!.push(p)
  })

  if (courseMap.size > 0) {
    return Array.from(courseMap.entries()).map(([label, pts]) => ({
      label,
      points: pts,
    }))
  }

  // fallback: 如果没有 course 字段，按3等分
  return [
    { label: '课程主干', points: points.slice(0, 2) },
    { label: '能力分支', points: points.slice(2, 4) },
    { label: '进阶应用', points: points.slice(4) },
  ].filter(group => group.points.length)
})

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let animationId = 0
let rootGroup: THREE.Group | null = null
let backgroundStageGroup: THREE.Group | null = null
let starGroup: THREE.Group | null = null
let markerGroup: THREE.Group | null = null
let auraGroup: THREE.Group | null = null
let raycaster: THREE.Raycaster | null = null
const pointer = new THREE.Vector2()
let interactiveObjects: THREE.Object3D[] = []
let fluidSurfaceTexture: THREE.CanvasTexture | null = null
let fluidGlowTexture: THREE.CanvasTexture | null = null
let fluidBumpTexture: THREE.CanvasTexture | null = null
const fluidMaterials: THREE.MeshStandardMaterial[] = []
const streamMaterials: THREE.MeshBasicMaterial[] = []

type DisposableObject = THREE.Object3D & {
  geometry?: THREE.BufferGeometry
  material?: THREE.Material | THREE.Material[]
}

function createScene() {
  scene = new THREE.Scene()
  scene.background = null
  scene.fog = new THREE.Fog(0x080914, 18, 48)

  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(5.8, 7.9, 13.2)
  camera.lookAt(0, 5.9, 0)

  scene.add(new THREE.AmbientLight(0xffeedd, 0.48))

  const key = new THREE.DirectionalLight(0xffedf3, 1.8)
  key.position.set(3, 10, 6)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xff8090, 0.9)
  rim.position.set(-5, 6, -3)
  scene.add(rim)

  const fill = new THREE.PointLight(0x8ad7ff, 0.55, 24)
  fill.position.set(-4, 3, 5)
  scene.add(fill)

  const stageBlue = new THREE.PointLight(0x2c9dff, 1.25, 30)
  stageBlue.position.set(0, 4.2, -6.5)
  scene.add(stageBlue)

  const rootGlow = new THREE.PointLight(0xffccd8, 1.35, 9)
  rootGlow.position.set(0, 0.5, 0)
  scene.add(rootGlow)
}

function markerStatusLabel(status?: KnowledgePoint['status']) {
  if (status === 'mastered') return '已完成'
  if (status === 'learning') return '学习中'
  if (status === 'weak') return '薄弱点'
  return '未完成'
}

function setMarkerData(object: THREE.Object3D, marker: GraphMarker) {
  object.userData.marker = marker
  object.traverse(child => {
    child.userData.marker = marker
  })
  interactiveObjects.push(object)
}

function pointIsComplete(point?: KnowledgePoint) {
  return point?.status === 'mastered' || (point?.progress ?? 0) >= 80
}

function pointIsWeak(point?: KnowledgePoint) {
  return point?.status === 'weak'
}

function starColorForPoint(point?: KnowledgePoint) {
  if (pointIsComplete(point)) return 0xdb3f36
  return 0x65dca2
}

function createAppleMesh(size: number, color: number, complete: boolean) {
  const group = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(size, 28, 22),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: complete ? 0.28 : 0.22,
      roughness: 0.48,
      metalness: 0.03,
      depthTest: false,
    }),
  )
  body.scale.set(1, 0.96, 0.9)
  body.renderOrder = 20
  group.add(body)

  const cheek = new THREE.Mesh(
    new THREE.SphereGeometry(size * 0.62, 20, 14),
    new THREE.MeshStandardMaterial({
      color: complete ? 0xff6a52 : 0x9ff0bd,
      emissive: complete ? 0x7a130b : 0x155b37,
      emissiveIntensity: 0.15,
      roughness: 0.56,
      transparent: true,
      opacity: 0.82,
      depthTest: false,
    }),
  )
  cheek.position.set(-size * 0.22, size * 0.04, size * 0.42)
  cheek.scale.set(0.86, 1, 0.28)
  cheek.renderOrder = 21
  group.add(cheek)

  const dimple = new THREE.Mesh(
    new THREE.SphereGeometry(size * 0.3, 18, 10),
    new THREE.MeshStandardMaterial({
      color: complete ? 0x6b1c14 : 0x2c6f42,
      roughness: 0.8,
      depthTest: false,
    }),
  )
  dimple.position.set(0, size * 0.78, size * 0.06)
  dimple.scale.set(1.1, 0.24, 0.82)
  dimple.renderOrder = 22
  group.add(dimple)

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(size * 0.07, size * 0.1, size * 0.48, 10),
    new THREE.MeshStandardMaterial({
      color: 0x6b3b1f,
      roughness: 0.72,
      depthTest: false,
    }),
  )
  stem.position.set(size * 0.06, size * 1.05, 0)
  stem.rotation.z = -0.32
  stem.renderOrder = 23
  group.add(stem)

  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(size * 0.22, 14, 10),
    new THREE.MeshStandardMaterial({
      color: 0x79d34f,
      emissive: 0x1f5318,
      emissiveIntensity: 0.12,
      roughness: 0.5,
      depthTest: false,
    }),
  )
  leaf.position.set(size * 0.32, size * 1.08, size * 0.02)
  leaf.scale.set(1.65, 0.52, 0.16)
  leaf.rotation.z = 0.42
  leaf.renderOrder = 24
  group.add(leaf)

  return group
}

function createAttachedStar(position: THREE.Vector3, size: number, point: KnowledgePoint | undefined, rotationZ = 0) {
  const complete = pointIsComplete(point)
  const weak = pointIsWeak(point)
  const color = starColorForPoint(point)
  const marker: GraphMarker = {
    id: `knowledge-${point?.name ?? position.toArray().join('-')}`,
    type: 'knowledge',
    label: point?.name ?? '知识点',
    status: point?.status ?? 'next',
    progress: point?.progress ?? 0,
    description: `叶片星点代表具体知识点；${markerStatusLabel(point?.status)}时会呈现对应亮度。`,
    items: [
      `来源: ${point?.status === 'weak' ? '测评 / 问答证据' : point?.status === 'mastered' ? '章节练习已通过' : point?.status === 'learning' ? '正在学习路径中' : '下一轮待安排'}`,
      `建议: ${point?.status === 'weak' ? '加入 15 分钟图解补弱' : point?.status === 'mastered' ? '保持点亮，可进入迁移练习' : point?.status === 'learning' ? '继续完成当前微任务' : '等待先修知识点完成'}`,
    ],
  }
  const group = new THREE.Group()
  group.position.copy(position)
  group.rotation.set(-0.18, 0.12, rotationZ)
  group.userData = { complete, weak, baseScale: 1, name: point?.name ?? '', marker }

  const contact = new THREE.Mesh(
    new THREE.CircleGeometry(size * 1.05, 28),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: complete ? 0.4 : weak ? 0.24 : 0.11,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    }),
  )
  contact.position.z = -0.035
  contact.renderOrder = 18
  group.add(contact)

  const apple = createAppleMesh(size, color, complete)
  apple.position.z = 0.01
  apple.scale.setScalar(weak ? 1.06 : 1)
  group.add(apple)

  setMarkerData(group, marker)
  return group
}

function createMarkerStar(position: THREE.Vector3, size: number, color: number, marker: GraphMarker, rotationZ = 0) {
  const group = new THREE.Group()
  group.position.copy(position)
  group.rotation.set(-0.18, 0.12, rotationZ)
  group.userData = {
    complete: marker.type === 'course' ? (marker.progress ?? 0) >= 75 : (marker.progress ?? 0) >= 70,
    marker,
  }

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(size * 1.45, size * 1.98, 40),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: marker.type === 'course' ? 0.42 : 0.28,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    }),
  )
  halo.position.z = -0.045
  halo.renderOrder = 18
  group.add(halo)

  const apple = createAppleMesh(size, color, marker.type === 'course')
  apple.renderOrder = 20
  group.add(apple)

  setMarkerData(group, marker)
  return group
}

function createEnergyStream(points: THREE.Vector3[], radius: number, opacity: number) {
  const curve = new THREE.CatmullRomCurve3(points)
  const material = new THREE.MeshBasicMaterial({
    color: 0xfff0b0,
    transparent: true,
    opacity,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  streamMaterials.push(material)

  const stream = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, radius, 12, false), material)
  stream.renderOrder = 8
  return stream
}

function createEnergyAura(model: THREE.Group) {
  if (auraGroup) {
    model.remove(auraGroup)
    auraGroup.traverse(child => disposeObject(child as DisposableObject))
  }

  auraGroup = new THREE.Group()
  auraGroup.name = 'FluidTreeAura'

  const auraMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd37a,
    transparent: true,
      opacity: 0.045,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  })

  const trunkGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.48, 6.4, 48, 1, true), auraMaterial.clone())
  trunkGlow.position.set(0, 3.1, 0)
  trunkGlow.renderOrder = 4
  auraGroup.add(trunkGlow)

  const coreGlow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.55, 6.8, 32, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfff0bd,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
  )
  coreGlow.position.set(0, 3.25, 0)
  coreGlow.renderOrder = 5
  auraGroup.add(coreGlow)

  const rootGlow = new THREE.Mesh(
    new THREE.RingGeometry(0.8, 3.6, 88),
    new THREE.MeshBasicMaterial({
      color: 0xffd06a,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
  )
  rootGlow.rotation.x = -Math.PI / 2
  rootGlow.position.y = 0.08
  rootGlow.renderOrder = 3
  auraGroup.add(rootGlow)

  const rootPool = new THREE.Mesh(
    new THREE.CircleGeometry(3.25, 96),
    new THREE.MeshBasicMaterial({
      color: 0xffb84d,
      transparent: true,
      opacity: 0.035,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
  )
  rootPool.rotation.x = -Math.PI / 2
  rootPool.position.y = 0.05
  rootPool.renderOrder = 2
  auraGroup.add(rootPool)

  const canopyGlow = new THREE.Mesh(
    new THREE.SphereGeometry(4.6, 48, 20),
    new THREE.MeshBasicMaterial({
      color: 0xffd68a,
      transparent: true,
      opacity: 0.024,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  canopyGlow.scale.set(1.35, 0.3, 0.72)
  canopyGlow.position.set(0, 7.0, 0)
  canopyGlow.renderOrder = 2
  auraGroup.add(canopyGlow)

  model.add(auraGroup)
}

function addGraphMarkers(model: THREE.Group) {
  if (markerGroup) {
    model.remove(markerGroup)
    markerGroup.traverse(child => disposeObject(child as DisposableObject))
  }

  markerGroup = new THREE.Group()
  markerGroup.name = 'KnowledgeGraphMarkers'

  const courseMarker: GraphMarker = {
    id: 'course-main',
    type: 'course',
    label: '课程总览',
    progress: courseProgress.value,
    description: '树干代表课程主线，所有树枝和叶片知识点都从这里生长出去。',
    items: branchGroups.value.map(group => group.label),
  }
  markerGroup.add(createMarkerStar(new THREE.Vector3(0.08, 12.15, 3.55), 0.38, 0xdb3f36, courseMarker, -0.08))

  const branchAnchors = [
    new THREE.Vector3(-3.65, 10.2, 3.05),
    new THREE.Vector3(3.2, 10.85, 3.18),
    new THREE.Vector3(0.2, 12.9, 3.32),
  ]

  branchGroups.value.forEach((group, index) => {
    const progress = Math.round(group.points.reduce((sum, point) => sum + (point.progress ?? 0), 0) / group.points.length)
    const marker: GraphMarker = {
      id: `branch-${index}`,
      type: 'branch',
      label: group.label,
      progress,
      description: '树枝节点代表课程模块，点击后查看这一分支下的知识点索引。',
      items: group.points.map(point => `${point.name} · ${markerStatusLabel(point.status)} · ${point.progress ?? 0}%`),
    }

    markerGroup!.add(createMarkerStar(branchAnchors[index] ?? branchAnchors[0], 0.3, progress >= 80 ? 0xdb3f36 : 0x65dca2, marker, index * 0.22))
  })

  model.add(markerGroup)
}

function addAttachedStars(model: THREE.Group) {
  if (starGroup) {
    model.remove(starGroup)
    starGroup.traverse(child => disposeObject(child as DisposableObject))
  }

  starGroup = new THREE.Group()
  starGroup.name = 'AttachedKnowledgeStars'

  const count = Math.max(props.knowledgePoints.length, 18)

  // Collect all leaf mesh vertices in world space
  const leafVertices: THREE.Vector3[] = []
  model.updateMatrixWorld(true)
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    const name = child.name.toLowerCase()
    const matName = (Array.isArray(child.material) ? child.material[0] : child.material)?.name?.toLowerCase() ?? ''
    if (!name.includes('leaf') && !matName.includes('leaf')) return
    const geom = child.geometry
    const pos = geom.attributes.position
    if (!pos) return
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(child.matrixWorld)
      leafVertices.push(v.clone())
    }
  })

  // If no leaf vertices found, fall back to bounding box sampling
  if (leafVertices.length === 0) {
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    // Generate points in upper 60% of the model (foliage area)
    for (let i = 0; i < count * 10; i++) {
      const x = center.x + (Math.random() - 0.5) * size.x * 0.8
      const y = center.y + size.y * 0.1 + Math.random() * size.y * 0.5
      const z = center.z + (Math.random() - 0.5) * size.z * 0.8
      leafVertices.push(new THREE.Vector3(x, y, z))
    }
  }

  // Sample 'count' vertices evenly from the collected leaf vertices
  const step = Math.max(1, Math.floor(leafVertices.length / count))
  const sampledPositions: THREE.Vector3[] = []
  for (let i = 0; i < count && i * step < leafVertices.length; i++) {
    const idx = i * step + Math.floor(Math.random() * Math.min(step, 3))
    const safeIdx = Math.min(idx, leafVertices.length - 1)
    sampledPositions.push(leafVertices[safeIdx])
  }
  // Fill remaining if needed
  while (sampledPositions.length < count) {
    sampledPositions.push(leafVertices[Math.floor(Math.random() * leafVertices.length)])
  }

  sampledPositions.forEach((position, index) => {
    const point = props.knowledgePoints[index % Math.max(props.knowledgePoints.length, 1)]
    const size = 0.2 + (index % 3) * 0.03 + Math.random() * 0.05
    const rotation = Math.random() * Math.PI * 2
    // Convert world position to model local space
    const localPos = position.clone()
    model.worldToLocal(localPos)
    starGroup!.add(createAttachedStar(localPos, size, point, rotation))
  })

  model.add(starGroup)
}

function materialKeyForMesh(mesh: THREE.Mesh) {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
  const materialName = material?.name?.toLowerCase() ?? ''
  const meshName = mesh.name.toLowerCase()
  const name = `${meshName} ${materialName}`

  if (
    name.includes('ground')
    || name.includes('shadow')
    || name.includes('temple')
    || name.includes('shrine')
    || name.includes('mist')
    || name.includes('sunshaft')
    || name.includes('knowledge_link')
  ) {
    return 'skip'
  }

  if (name.includes('leaf') || name.includes('ginkgo')) return 'leaf'
  if (name.includes('trunk') || name.includes('branch') || name.includes('bark') || name.includes('ancient')) return 'wood'
  return 'skip'
}

function createFluidTexture(kind: 'surface' | 'glow' | 'bump') {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const image = ctx.createImageData(size, size)
  const data = image.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size
      const ny = y / size
      const centerVein = Math.exp(-Math.pow(nx - 0.5 - Math.sin(ny * 6.2) * 0.055, 2) * 170)
      const leftVein = Math.exp(-Math.pow(nx - 0.27 - Math.sin(ny * 8.1 + 1.8) * 0.045, 2) * 240)
      const rightVein = Math.exp(-Math.pow(nx - 0.73 - Math.sin(ny * 7.4 + 0.4) * 0.042, 2) * 235)
      const hairline =
        Math.max(0, Math.sin((ny * 18 + nx * 11) * Math.PI)) ** 6
        * Math.max(0, Math.sin((nx * 5.5 + ny * 0.6) * Math.PI))
      const vein = Math.max(centerVein, leftVein * 0.9, rightVein * 0.82, hairline * 0.55)
      const flow = 0.58 + 0.42 * Math.sin((ny * 10.5 + nx * 2.7) * Math.PI)
      const glow = Math.max(0, Math.min(1, vein * flow))
      const shellShade = 0.34 + 0.18 * Math.sin(nx * Math.PI * 2) + 0.08 * Math.sin(ny * Math.PI * 5)
      const i = (y * size + x) * 4

      if (kind === 'bump') {
        const v = Math.round(92 + glow * 136 + shellShade * 28)
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      } else if (kind === 'glow') {
        const core = Math.max(glow, centerVein * 0.95)
        data[i] = Math.round(core * 255)
        data[i + 1] = Math.round(core * 210)
        data[i + 2] = Math.round(glow * 96)
        data[i + 3] = Math.round(Math.min(255, core * 255))
      } else {
        const base = Math.max(0, Math.min(1, shellShade))
        data[i] = Math.round(58 + base * 54 + glow * 18)
        data[i + 1] = Math.round(30 + base * 34 + glow * 14)
        data[i + 2] = Math.round(15 + base * 18 + glow * 6)
        data[i + 3] = 255
      }
    }
  }

  ctx.putImageData(image, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3.8, kind === 'glow' ? 3.4 : 2.4)
  texture.colorSpace = kind === 'bump' ? THREE.NoColorSpace : THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true

  return texture
}

function getFluidSurfaceTexture() {
  fluidSurfaceTexture = fluidSurfaceTexture ?? createFluidTexture('surface')
  return fluidSurfaceTexture
}

function getFluidGlowTexture() {
  fluidGlowTexture = fluidGlowTexture ?? createFluidTexture('glow')
  return fluidGlowTexture
}

function getFluidBumpTexture() {
  fluidBumpTexture = fluidBumpTexture ?? createFluidTexture('bump')
  return fluidBumpTexture
}

function cloneEnhancedMaterial(source: THREE.Material | THREE.Material[] | undefined, key: string) {
  const base = Array.isArray(source) ? source[0] : source
  const material = base instanceof THREE.MeshStandardMaterial
    ? base.clone()
    : new THREE.MeshStandardMaterial({ color: key === 'leaf' ? 0xf4e4bd : 0x6b4a31 })

  if (material instanceof THREE.MeshStandardMaterial) {
    material.envMapIntensity = 0.72
    material.roughness = key === 'leaf' ? 0.82 : 0.78
    material.side = key === 'leaf' ? THREE.DoubleSide : THREE.FrontSide
    material.color = new THREE.Color(key === 'leaf' ? 0xe7c66a : 0xffffff)
    material.transparent = false
    material.opacity = 1
    material.emissive = new THREE.Color(key === 'leaf' ? 0x5a3a05 : 0xffc46a)
    material.emissiveIntensity = key === 'leaf' ? 0.18 : 0.34

    if (key === 'wood') {
      material.color = new THREE.Color(0xffffff)
      material.map = getFluidSurfaceTexture()
      material.emissiveMap = null
      material.bumpMap = getFluidBumpTexture()
      material.bumpScale = 0.11
      material.emissive = new THREE.Color(0x1d0b03)
      material.emissiveIntensity = 0.08
      material.roughness = 0.9
      material.metalness = 0.02
      fluidMaterials.push(material)
    }
  }

  return material
}

function enhanceBackgroundStage(model: THREE.Group) {
  model.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return

    child.castShadow = false
    child.receiveShadow = true
    child.frustumCulled = false
    child.matrixAutoUpdate = false

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach(material => {
      if (!(material instanceof THREE.MeshStandardMaterial) && !(material instanceof THREE.MeshBasicMaterial)) return

      const name = `${child.name} ${material.name}`.toLowerCase()
      material.transparent = false
      material.opacity = 1
      material.depthWrite = true

      if (material instanceof THREE.MeshStandardMaterial) {
        material.roughness = 0.62
        material.metalness = Math.max(material.metalness, 0.18)
        material.envMapIntensity = 0.55
        if (name.includes('light') || name.includes('blue') || name.includes('crystal') || name.includes('emissive')) {
          material.emissive = new THREE.Color(0x139cff)
          material.emissiveIntensity = 1.05
        } else {
          material.emissive = new THREE.Color(0x06152a)
          material.emissiveIntensity = 0.18
        }
      }
    })
  })
}

type StagePieceRole = 'main' | 'left' | 'right'

function fitBackgroundStageToScene(model: THREE.Group, role: StagePieceRole) {
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const config = {
    main: { scale: 14.1, x: -1.0, y: 5.0, z: -1.0, ry: Math.PI / 6, rz: 0 },
    left: { scale: 10.5, x: -6.5, y: 4.8, z: 1.5, ry: 0.42 + Math.PI / 4, rz: 0 },
    right: { scale: 10.08, x: 4.5, y: 5.34, z: -5.0, ry: -0.42 + 15 * Math.PI / 180, rz: 0 },
  }[role]
  const scale = config.scale / Math.max(0.001, maxDim)

  model.scale.setScalar(scale)
  model.position.sub(center.multiplyScalar(scale))
  model.position.x += config.x
  model.position.y += config.y - box.min.y * scale
  model.position.z += config.z
  model.rotation.y = config.ry
  model.rotation.z = config.rz
  model.updateMatrixWorld(true)
  model.traverse(child => {
    child.matrixAutoUpdate = false
  })
  model.renderOrder = -4
}

function loadBackgroundStage() {
  if (!scene) return

  const loader = new GLTFLoader()
  backgroundStageGroup = new THREE.Group()
  backgroundStageGroup.name = 'KnowledgeTreeStageSet'
  scene.add(backgroundStageGroup)

  const pieces: Array<{ url: string; role: StagePieceRole }> = [
    { url: BACKGROUND_STAGE_MODEL_URL, role: 'main' },
    { url: LEFT_STAGE_MODEL_URL, role: 'left' },
    { url: RIGHT_STAGE_MODEL_URL, role: 'right' },
  ]

  pieces.forEach(piece => {
    loader.load(
      piece.url,
      (gltf) => {
        if (!backgroundStageGroup) return
        const stagePiece = gltf.scene
        stagePiece.name = `KnowledgeTreeStage-${piece.role}`
        enhanceBackgroundStage(stagePiece)
        fitBackgroundStageToScene(stagePiece, piece.role)
        backgroundStageGroup.add(stagePiece)
      },
      undefined,
      (error) => {
        console.warn(`Failed to load knowledge tree ${piece.role} stage:`, error)
      },
    )
  })
}

function geometryMergeKey(geometry: THREE.BufferGeometry) {
  const attributes = Object.entries(geometry.attributes)
    .map(([name, attribute]) => `${name}:${attribute.itemSize}:${attribute.normalized}`)
    .sort()
    .join('|')

  return `${geometry.index ? 'indexed' : 'non-indexed'}:${attributes}`
}

function ensureBarkUvs(geometry: THREE.BufferGeometry) {
  if (geometry.attributes.uv) return

  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  const position = geometry.attributes.position
  if (!box || !position) return

  const centerX = (box.min.x + box.max.x) * 0.5
  const centerZ = (box.min.z + box.max.z) * 0.5
  const height = Math.max(0.001, box.max.y - box.min.y)
  const uv = new Float32Array(position.count * 2)

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i) - centerX
    const y = position.getY(i)
    const z = position.getZ(i) - centerZ
    const angle = Math.atan2(z, x)
    uv[i * 2] = (angle + Math.PI) / (Math.PI * 2)
    uv[i * 2 + 1] = (y - box.min.y) / height
  }

  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
}

function optimizeModelForRuntime(model: THREE.Group) {
  const leafGeometryBuckets = new Map<string, GeometryBucket>()
  let meshCount = 0

  model.updateMatrixWorld(true)

  const optimized = new THREE.Group()
  optimized.name = 'OptimizedKnowledgeTree'

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.geometry) return

    meshCount++
    const key = materialKeyForMesh(child)
    const geometry = child.geometry.clone()
    geometry.applyMatrix4(child.matrixWorld)

    if (key === 'skip') {
      geometry.dispose()
      return
    }

    if (key === 'leaf') {
      const mergeKey = geometryMergeKey(geometry)
      const bucket = leafGeometryBuckets.get(mergeKey) ?? { geometries: [] as THREE.BufferGeometry[], material: child.material }
      bucket.geometries.push(geometry)
      leafGeometryBuckets.set(mergeKey, bucket)
      return
    }

    ensureBarkUvs(geometry)

    const mesh = new THREE.Mesh(geometry, cloneEnhancedMaterial(child.material, key))
    mesh.name = `${child.name || key}-optimized`
    mesh.castShadow = true
    mesh.receiveShadow = true
    optimized.add(mesh)
  })

  if (meshCount < 500) {
    leafGeometryBuckets.forEach(bucket => bucket.geometries.forEach(geometry => geometry.dispose()))
    return model
  }

  leafGeometryBuckets.forEach((bucket, index) => {
    const merged = mergeGeometries(bucket.geometries, false)
    bucket.geometries.forEach(geometry => geometry.dispose())
    if (!merged) return

    merged.computeBoundingSphere()
    merged.computeVertexNormals()

    const mesh = new THREE.Mesh(merged, cloneEnhancedMaterial(bucket.material, 'leaf'))
    mesh.name = `leaf-merged-${index}`
    mesh.castShadow = true
    mesh.receiveShadow = true
    optimized.add(mesh)
  })

  model.traverse(child => disposeObject(child as DisposableObject))

  return optimized
}

function enhanceOriginalModel(model: THREE.Group) {
  // 统计知识点状态分布
  const weakCount = props.knowledgePoints.filter(p => p.status === 'weak').length
  const masteredCount = props.knowledgePoints.filter(p => p.status === 'mastered').length
  const learningCount = props.knowledgePoints.filter(p => p.status === 'learning').length
  const total = Math.max(props.knowledgePoints.length, 1)

  // 根据掌握度比例决定树叶整体色调
  // mastered多→偏绿, weak多→偏红, learning多→偏蓝
  const weakRatio = weakCount / total
  const masteredRatio = masteredCount / total
  const learningRatio = learningCount / total

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return

    child.castShadow = true
    child.receiveShadow = true

    const name = child.name.toLowerCase()
    const materials = Array.isArray(child.material) ? child.material : [child.material]

    materials.forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = 0.72
        material.roughness = Math.min(material.roughness + 0.08, 0.85)

        if (name.includes('leaf') || material.name.toLowerCase().includes('leaf')) {
          material.side = THREE.DoubleSide
          material.transparent = true
          material.opacity = 0.96

          // 根据掌握度分布混合颜色
          const r = weakRatio * 0.6 + learningRatio * 0.1 + masteredRatio * 0.05
          const g = masteredRatio * 0.5 + learningRatio * 0.2 + weakRatio * 0.05
          const b = learningRatio * 0.5 + masteredRatio * 0.1 + weakRatio * 0.1
          material.emissive = new THREE.Color(r, g, b)
          material.emissiveIntensity = 0.15 + weakRatio * 0.2
        }

        if (name.includes('trunk') || name.includes('branch') || material.name.toLowerCase().includes('wood')) {
          material.emissive = new THREE.Color(0x2a1109)
          material.emissiveIntensity = 0.12
        }
      }
    })
  })

}

function fitModelToScene(model: THREE.Group) {
  function clipRootGeometry(geom: THREE.BufferGeometry) {
    const pos = geom.attributes.position
    const norm = geom.attributes.normal
    const idx = geom.index
    if (!pos || !norm || !idx) return
    const clipThresholdY = -2.5
    const keepMask = new Uint8Array(pos.count)
    for (let i = 0; i < pos.count; i++) {
      keepMask[i] = pos.getY(i) >= clipThresholdY ? 1 : 0
    }
    const newIdxArr: number[] = []
    for (let i = 0; i < idx.count; i += 3) {
      const a = idx.getX(i), b = idx.getX(i + 1), c = idx.getX(i + 2)
      if (keepMask[a] && keepMask[b] && keepMask[c]) {
        newIdxArr.push(a, b, c)
      }
    }
    if (newIdxArr.length > 0) {
      geom.setIndex(newIdxArr)
      geom.computeBoundingBox()
      geom.computeBoundingSphere()
    }
  }
  model.traverse(obj => {
    if (obj instanceof THREE.Mesh && obj.geometry) {
      clipRootGeometry(obj.geometry)
    }
  })
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = props.sceneScale / maxDim

  model.scale.setScalar(scale)
  model.position.sub(center.multiplyScalar(scale))
  model.position.y -= box.min.y * scale
  model.position.y += props.sceneOffsetY - 3.2
  model.position.x += 0.5
  model.position.z += 0.3
}

function loadModel(modelUrl = props.modelUrl, hasTriedFallback = false) {
  if (!scene) return

  const loader = new GLTFLoader()
  loader.load(
    modelUrl,
    (gltf) => {
      try {
        rootGroup = optimizeModelForRuntime(gltf.scene)
        interactiveObjects = []

        enhanceOriginalModel(rootGroup)
        createEnergyAura(rootGroup)
        fitModelToScene(rootGroup)
        addGraphMarkers(rootGroup)
        addAttachedStars(rootGroup)

        scene!.add(rootGroup)
        loadError.value = false
        loading.value = false
      } catch (error) {
        console.error('Failed to render knowledge tree model:', error)
        removeCurrentModel()
        if (!hasTriedFallback && modelUrl !== FALLBACK_TREE_MODEL_URL) {
          loadModel(FALLBACK_TREE_MODEL_URL, true)
          return
        }
        loadError.value = true
        loading.value = false
      }
    },
    undefined,
    (error) => {
      console.error('Failed to load knowledge tree model:', error)
      if (!hasTriedFallback && modelUrl !== FALLBACK_TREE_MODEL_URL) {
        loadModel(FALLBACK_TREE_MODEL_URL, true)
        return
      }
      loadError.value = true
      loading.value = false
    },
  )
}

function getCanvasSize() {
  if (!canvasRef.value) return { w: 600, h: 480 }
  const rect = canvasRef.value.parentElement?.getBoundingClientRect()
  const w = rect?.width ?? 600
  const h = props.fill ? (rect?.height ?? 480) : (typeof props.height === 'number' ? props.height : 480)
  return { w, h }
}

function initRenderer() {
  if (!canvasRef.value) return

  const { w, h } = getCanvasSize()

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(w, h)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12

  if (camera) {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  controls = new OrbitControls(camera!, canvasRef.value)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.enablePan = false
  controls.minDistance = 3.4
  controls.maxDistance = 22
  controls.target.set(0, 5.9, 0)
  controls.maxPolarAngle = Math.PI * 0.78
  controls.update()

  raycaster = new THREE.Raycaster()
  canvasRef.value.addEventListener('pointermove', handlePointerMove)
  canvasRef.value.addEventListener('click', handleCanvasClick)
}

function markerFromIntersection(event: PointerEvent) {
  if (!canvasRef.value || !camera || !raycaster || !interactiveObjects.length) return null

  const rect = canvasRef.value.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)

  const hits = raycaster.intersectObjects(interactiveObjects, true)
  const hit = hits.find(item => item.object.userData.marker)
  return (hit?.object.userData.marker ?? null) as GraphMarker | null
}

function handlePointerMove(event: PointerEvent) {
  if (!canvasRef.value) return
  canvasRef.value.style.cursor = markerFromIntersection(event) ? 'pointer' : 'grab'
}

function handleCanvasClick(event: PointerEvent) {
  const marker = markerFromIntersection(event)
  if (marker) {
    activeMarker.value = marker
    emit('markerSelect', marker)
  }
}

function animate() {
  animationId = requestAnimationFrame(animate)

  if (rootGroup) {
    rootGroup.rotation.y += 0.0012
    const t = performance.now() * 0.004
    const flow = (performance.now() * 0.00018) % 1
    if (fluidSurfaceTexture) fluidSurfaceTexture.offset.y = -flow * 0.35
    if (fluidGlowTexture) fluidGlowTexture.offset.y = -flow
    if (fluidBumpTexture) fluidBumpTexture.offset.y = -flow * 0.28
    fluidMaterials.forEach((material, index) => {
      material.emissiveIntensity = 0.14 + Math.sin(t * 0.9 + index * 0.21) * 0.04
    })
    streamMaterials.forEach((material, index) => {
      material.opacity = 0.38 + Math.max(0, Math.sin(t * 1.1 + index * 1.35)) * 0.34
    })
    starGroup?.children.forEach((star, index) => {
      const pulse = 1 + Math.sin(t + index * 0.7) * (star.userData.complete ? 0.095 : 0.035)
      star.scale.setScalar(pulse)
    })
    markerGroup?.children.forEach((star, index) => {
      const pulse = 1 + Math.sin(t * 0.8 + index * 0.9) * 0.075
      star.scale.setScalar(pulse)
    })
    auraGroup?.children.forEach((aura, index) => {
      const pulse = 1 + Math.sin(t * 0.65 + index * 1.2) * 0.055
      aura.scale.setScalar(pulse)
    })
  }

  controls?.update()
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

function handleResize() {
  if (!canvasRef.value || !renderer || !camera) return

  const { w, h } = getCanvasSize()

  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

function disposeObject(object: DisposableObject) {
  object.geometry?.dispose()
  if (Array.isArray(object.material)) {
    object.material.forEach(material => material.dispose())
  } else {
    object.material?.dispose()
  }
}

function removeCurrentModel() {
  if (rootGroup && scene) {
    scene.remove(rootGroup)
    rootGroup.traverse(child => disposeObject(child as DisposableObject))
  }
  rootGroup = null
  starGroup = null
  markerGroup = null
  auraGroup = null
  interactiveObjects = []
  fluidMaterials.length = 0
  streamMaterials.length = 0
}

function removeBackgroundStage() {
  if (backgroundStageGroup && scene) {
    scene.remove(backgroundStageGroup)
    backgroundStageGroup.traverse(child => disposeObject(child as DisposableObject))
  }
  backgroundStageGroup = null
}

onMounted(() => {
  createScene()
  initRenderer()
  loadBackgroundStage()
  loadModel()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  controls?.dispose()
  canvasRef.value?.removeEventListener('pointermove', handlePointerMove)
  canvasRef.value?.removeEventListener('click', handleCanvasClick)
  removeCurrentModel()
  removeBackgroundStage()
  renderer?.dispose()
  fluidSurfaceTexture?.dispose()
  fluidGlowTexture?.dispose()
  fluidBumpTexture?.dispose()
  scene?.clear()
})

watch(() => props.modelUrl, () => {
  removeCurrentModel()
  loading.value = true
  loadError.value = false
  loadModel()
})

watch(() => props.knowledgePoints, () => {
  if (!rootGroup) return
  interactiveObjects = []
  addGraphMarkers(rootGroup)
  addAttachedStars(rootGroup)
  // 动态更新树叶颜色
  enhanceOriginalModel(rootGroup)
}, { deep: true })
</script>

<template>
  <div class="three-tree-wrapper" :style="fill ? { height: '100%' } : { height: typeof height === 'number' ? `${height}px` : height }">
    <canvas ref="canvasRef" class="three-tree-canvas" aria-label="3D knowledge tree" />
    <div v-if="loading" class="three-tree-loading">
      <div class="loading-spinner" />
      <span>加载 3D 知识树...</span>
    </div>
    <div v-if="loadError" class="three-tree-error">
      <span>3D 模型加载失败</span>
    </div>
    <div class="three-tree-hint">
      <span>拖拽旋转 · 滚轮缩放</span>
    </div>
  </div>
</template>

<style scoped>
.three-tree-wrapper {
  position: relative;
  width: 100%;
  border-radius: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
}

.three-tree-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.three-tree-loading,
.three-tree-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--color-text-tertiary);
  font-size: 13px;
  background: rgba(10, 10, 20, 0.85);
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-top-color: var(--color-accent-cyan, #00d4ff);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.three-tree-error {
  color: var(--color-accent-rose, #f43f5e);
}

.three-tree-hint {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.35);
  font-size: 11px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.three-tree-wrapper:hover .three-tree-hint {
  opacity: 1;
}
</style>
