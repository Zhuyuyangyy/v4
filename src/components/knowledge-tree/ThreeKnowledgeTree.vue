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
  }>(),
  {
    modelUrl: '/knowledge-tree/knowledge-tree-real.glb',
    height: 480,
    fill: false,
    knowledgePoints: () => [],
  },
)

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
let starGroup: THREE.Group | null = null
let markerGroup: THREE.Group | null = null
let raycaster: THREE.Raycaster | null = null
const pointer = new THREE.Vector2()
let interactiveObjects: THREE.Object3D[] = []

type DisposableObject = THREE.Object3D & {
  geometry?: THREE.BufferGeometry
  material?: THREE.Material | THREE.Material[]
}

function createScene() {
  scene = new THREE.Scene()
  scene.background = null
  scene.fog = new THREE.Fog(0x080914, 20, 42)

  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(4.0, 8.95, 8.2)
  camera.lookAt(0, 7.45, 0)

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

  const rootGlow = new THREE.PointLight(0xffccd8, 1.35, 9)
  rootGlow.position.set(0, 0.5, 0)
  scene.add(rootGlow)
}

function createStarGeometry(radius = 0.32) {
  const shape = new THREE.Shape()
  const inner = radius * 0.44

  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5
    const r = i % 2 === 0 ? radius : inner
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }

  shape.closePath()

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.018,
    bevelThickness: 0.018,
  })
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
  if (pointIsComplete(point)) return 0xffe58f
  if (pointIsWeak(point)) return 0xff6f8f
  if (point?.status === 'learning') return 0x78d9ff
  return 0x7b8192
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

  const star = new THREE.Mesh(
    createStarGeometry(size),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: complete ? 1.55 : weak ? 0.72 : 0.16,
      roughness: complete ? 0.24 : 0.64,
      metalness: complete ? 0.12 : 0.04,
      transparent: true,
      opacity: complete ? 1 : weak ? 0.9 : 0.5,
      depthTest: false,
    }),
  )
  star.position.z = 0.01
  star.renderOrder = 20
  group.add(star)

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

  const star = new THREE.Mesh(
    createStarGeometry(size),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: marker.type === 'course' ? 1.35 : 0.95,
      roughness: 0.28,
      metalness: 0.1,
      depthTest: false,
    }),
  )
  star.renderOrder = 20
  group.add(star)

  setMarkerData(group, marker)
  return group
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
  markerGroup.add(createMarkerStar(new THREE.Vector3(0.08, 5.75, 2.85), 0.36, 0xffd37a, courseMarker, -0.08))

  const branchAnchors = [
    new THREE.Vector3(-3.35, 9.85, 2.8),
    new THREE.Vector3(2.85, 10.7, 3.0),
    new THREE.Vector3(0.25, 12.85, 3.15),
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

    markerGroup!.add(createMarkerStar(branchAnchors[index] ?? branchAnchors[0], 0.24, 0x78d9ff, marker, index * 0.22))
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

  const starAnchors = [
    { position: [-4.8, 10.75, 3.1], size: 0.22, rotation: 0.2 },
    { position: [-3.4, 12.8, 3.3], size: 0.31, rotation: -0.16 },
    { position: [-2.6, 11.75, 3.05], size: 0.2, rotation: 0.42 },
    { position: [-1.5, 13.55, 3.0], size: 0.29, rotation: 0.22 },
    { position: [-0.55, 12.35, 3.28], size: 0.2, rotation: -0.36 },
    { position: [0.65, 10.35, 2.72], size: 0.24, rotation: -0.12 },
    { position: [1.35, 12.15, 3.22], size: 0.21, rotation: 0.3 },
    { position: [2.35, 13.25, 3.2], size: 0.31, rotation: -0.28 },
    { position: [3.35, 11.05, 3.45], size: 0.21, rotation: -0.18 },
    { position: [4.55, 11.7, 3.65], size: 0.29, rotation: 0.14 },
    { position: [5.45, 10.7, 3.2], size: 0.2, rotation: -0.42 },
    { position: [-5.1, 11.25, 3.1], size: 0.27, rotation: 0.34 },
    { position: [-0.42, 8.25, 1.02], size: 0.22, rotation: 0.18 },
    { position: [0.28, 6.95, 1.38], size: 0.2, rotation: -0.08 },
    { position: [-1.05, 9.45, 2.32], size: 0.19, rotation: 0.12 },
    { position: [1.15, 9.2, 2.55], size: 0.19, rotation: -0.2 },
    { position: [-5.75, 12.05, 3.38], size: 0.18, rotation: 0.48 },
    { position: [-4.25, 13.65, 3.12], size: 0.17, rotation: -0.5 },
    { position: [-3.05, 14.35, 3.28], size: 0.18, rotation: 0.08 },
    { position: [-1.95, 10.7, 2.62], size: 0.16, rotation: -0.24 },
    { position: [-0.85, 14.15, 3.36], size: 0.17, rotation: 0.56 },
    { position: [0.15, 13.25, 3.22], size: 0.16, rotation: -0.46 },
    { position: [0.95, 14.35, 3.12], size: 0.18, rotation: 0.18 },
    { position: [1.95, 10.75, 3.08], size: 0.17, rotation: -0.5 },
    { position: [2.85, 12.05, 3.48], size: 0.16, rotation: 0.54 },
    { position: [3.85, 13.0, 3.55], size: 0.18, rotation: -0.08 },
    { position: [4.95, 12.65, 3.42], size: 0.17, rotation: 0.38 },
    { position: [5.95, 11.55, 3.24], size: 0.16, rotation: -0.32 },
    { position: [-4.7, 9.65, 2.6], size: 0.16, rotation: 0.18 },
    { position: [-2.45, 9.25, 2.5], size: 0.15, rotation: -0.18 },
    { position: [2.55, 9.55, 2.58], size: 0.16, rotation: 0.28 },
    { position: [4.45, 9.95, 2.78], size: 0.15, rotation: -0.44 },
    { position: [-0.18, 7.82, 1.72], size: 0.16, rotation: 0.4 },
    { position: [0.65, 8.45, 2.04], size: 0.15, rotation: -0.52 },
    { position: [-1.55, 8.65, 2.04], size: 0.15, rotation: 0.1 },
    { position: [1.72, 8.35, 2.24], size: 0.15, rotation: -0.08 },
  ]

  starAnchors.forEach((anchor, index) => {
    const [x, y, z] = anchor.position
    const point = props.knowledgePoints[index % Math.max(props.knowledgePoints.length, 1)]
    starGroup!.add(createAttachedStar(new THREE.Vector3(x, y, z), anchor.size, point, anchor.rotation))
  })

  model.add(starGroup)
}

function materialKeyForMesh(mesh: THREE.Mesh) {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
  const materialName = material?.name?.toLowerCase() ?? ''
  const meshName = mesh.name.toLowerCase()
  if (meshName.includes('leaf') || materialName.includes('leaf')) return 'leaf'
  return 'wood'
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
    material.transparent = key === 'leaf'
    material.opacity = key === 'leaf' ? 0.96 : 1
    material.emissive = new THREE.Color(key === 'leaf' ? 0x301010 : 0x2a1109)
    material.emissiveIntensity = key === 'leaf' ? 0.08 : 0.12
  }

  return material
}

function optimizeModelForRuntime(model: THREE.Group) {
  const leafGeometries: THREE.BufferGeometry[] = []
  let leafMaterial: THREE.Material | THREE.Material[] | undefined
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

    if (key === 'leaf') {
      leafMaterial = leafMaterial ?? child.material
      leafGeometries.push(geometry)
      return
    }

    const mesh = new THREE.Mesh(geometry, cloneEnhancedMaterial(child.material, key))
    mesh.name = `${child.name || key}-optimized`
    mesh.castShadow = true
    mesh.receiveShadow = true
    optimized.add(mesh)
  })

  if (meshCount < 500) return model

  const merged = mergeGeometries(leafGeometries, false)
  leafGeometries.forEach(geometry => geometry.dispose())
  if (merged) {
    merged.computeBoundingSphere()
    merged.computeVertexNormals()

    const mesh = new THREE.Mesh(merged, cloneEnhancedMaterial(leafMaterial, 'leaf'))
    mesh.name = 'leaf-merged'
    mesh.castShadow = true
    mesh.receiveShadow = true
    optimized.add(mesh)
  }

  model.traverse(child => disposeObject(child as DisposableObject))

  return optimized
}

function enhanceOriginalModel(model: THREE.Group) {
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
          material.emissive = new THREE.Color(0x301010)
          material.emissiveIntensity = 0.08
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
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 11.4 / maxDim

  model.scale.setScalar(scale)
  model.position.sub(center.multiplyScalar(scale))
  model.position.y -= box.min.y * scale
  model.position.y += 4.35
}

function loadModel() {
  if (!scene) return

  const loader = new GLTFLoader()
  loader.load(
    props.modelUrl,
    (gltf) => {
      rootGroup = optimizeModelForRuntime(gltf.scene)
      interactiveObjects = []

      enhanceOriginalModel(rootGroup)
      addGraphMarkers(rootGroup)
      addAttachedStars(rootGroup)
      fitModelToScene(rootGroup)

      scene!.add(rootGroup)
      loading.value = false
    },
    undefined,
    () => {
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
  controls.maxDistance = 18
  controls.target.set(0, 7.45, 0)
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
  if (marker) activeMarker.value = marker
}

function animate() {
  animationId = requestAnimationFrame(animate)

  if (rootGroup) {
    rootGroup.rotation.y += 0.0012
    const t = performance.now() * 0.004
    starGroup?.children.forEach((star, index) => {
      const pulse = 1 + Math.sin(t + index * 0.7) * (star.userData.complete ? 0.095 : 0.035)
      star.scale.setScalar(pulse)
    })
    markerGroup?.children.forEach((star, index) => {
      const pulse = 1 + Math.sin(t * 0.8 + index * 0.9) * 0.075
      star.scale.setScalar(pulse)
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
  interactiveObjects = []
}

onMounted(() => {
  createScene()
  initRenderer()
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
  renderer?.dispose()
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
    <aside v-if="activeMarker" class="tree-index-panel-v2" :class="activeMarkerView.status">
      <button class="tree-index-close" type="button" @click="activeMarker = null">x</button>
      <div class="tree-index-head">
        <span class="tree-index-type">
          {{ activeMarkerView.type === 'course' ? '课程主干' : activeMarkerView.type === 'branch' ? '分支索引' : '知识点星标' }}
        </span>
        <span v-if="activeMarkerView.status" class="tree-index-status" :class="activeMarkerView.status">
          {{ markerStatusLabel(activeMarkerView.status) }}
        </span>
      </div>
      <h3>{{ activeMarkerView.label }}</h3>
      <p>{{ activeMarkerView.description }}</p>
      <div v-if="typeof activeMarkerView.progress === 'number'" class="tree-index-progress">
        <div>
          <span>掌握度</span>
          <strong>{{ activeMarkerView.progress }}%</strong>
        </div>
        <div class="tree-index-meter">
          <i :style="{ width: `${Math.max(4, activeMarkerView.progress ?? 0)}%` }" />
        </div>
      </div>
      <ul v-if="activeMarkerView.items?.length" class="tree-index-list">
        <li v-for="item in activeMarkerView.items" :key="item">{{ item }}</li>
      </ul>
    </aside>
    <aside v-if="false && activeMarker" class="tree-index-panel" :class="activeMarkerView.status">
      <button class="tree-index-close" type="button" @click="activeMarker = null">×</button>
      <span class="tree-index-type">
        {{ activeMarker.type === 'course' ? '课程节点' : activeMarker.type === 'branch' ? '树枝索引' : '知识点' }}
      </span>
      <h3>{{ activeMarkerView.label }}</h3>
      <p>{{ activeMarkerView.description }}</p>
      <div v-if="typeof activeMarkerView.progress === 'number'" class="tree-index-progress">
        <span>掌握度</span>
        <strong>{{ activeMarkerView.progress }}%</strong>
      </div>
      <ul v-if="activeMarkerView.items?.length" class="tree-index-list">
        <li v-for="item in activeMarkerView.items" :key="item">{{ item }}</li>
      </ul>
      <span v-if="activeMarkerView.status" class="tree-index-status" :class="activeMarkerView.status">
        {{ markerStatusLabel(activeMarkerView.status) }}
      </span>
    </aside>
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

.tree-index-panel,
.tree-index-panel-v2 {
  position: absolute;
  top: 88px;
  right: 24px;
  z-index: 4;
  width: min(320px, calc(100% - 48px));
  padding: 20px;
  border-radius: 14px;
  background: rgba(6, 8, 18, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  color: #fff;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.34);
}

.tree-index-panel-v2 {
  width: min(390px, calc(100% - 48px));
  padding: 18px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 0 0, rgba(0, 212, 255, 0.16), transparent 38%),
    linear-gradient(180deg, rgba(9, 12, 28, 0.88), rgba(7, 9, 20, 0.72));
  border-color: rgba(126, 231, 255, 0.18);
}

.tree-index-panel-v2.weak {
  border-color: rgba(244, 63, 94, 0.26);
  background:
    radial-gradient(circle at 0 0, rgba(244, 63, 94, 0.17), transparent 38%),
    linear-gradient(180deg, rgba(16, 8, 20, 0.9), rgba(7, 9, 20, 0.72));
}

.tree-index-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 34px;
}

.tree-index-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
}

.tree-index-type,
.tree-index-status {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  color: #9ee7ff;
  background: rgba(120, 217, 255, 0.12);
  border: 1px solid rgba(120, 217, 255, 0.2);
}

.tree-index-panel h3,
.tree-index-panel-v2 h3 {
  margin: 14px 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.tree-index-panel p,
.tree-index-panel-v2 p {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  line-height: 1.7;
}

.tree-index-progress {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 12px;
  align-items: end;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.62);
  font-size: 12px;
}

.tree-index-progress span {
  display: block;
  margin-bottom: 3px;
}

.tree-index-progress strong {
  color: #ffe58f;
  font-size: 20px;
}

.tree-index-meter {
  height: 7px;
  margin-bottom: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
}

.tree-index-meter i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #00d4ff, #ffe58f);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.55);
}

.tree-index-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.tree-index-list li {
  padding: 9px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.tree-index-status {
  margin-top: 0;
}

.tree-index-status.mastered {
  color: #ffe58f;
  background: rgba(255, 229, 143, 0.14);
  border-color: rgba(255, 229, 143, 0.28);
}

.tree-index-status.weak {
  color: #ff9aae;
  background: rgba(255, 111, 143, 0.14);
  border-color: rgba(255, 111, 143, 0.28);
}

.tree-index-status.next {
  color: rgba(255, 255, 255, 0.52);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}
</style>
