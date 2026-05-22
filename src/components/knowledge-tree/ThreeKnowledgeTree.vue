<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = withDefaults(
  defineProps<{
    modelUrl?: string
    height?: number | string
    fill?: boolean
  }>(),
  {
    modelUrl: '/knowledge-tree/knowledge-tree-red.glb',
    height: 480,
    fill: false,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const loadError = ref(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let animationId = 0
let rootGroup: THREE.Group | null = null

function createScene() {
  scene = new THREE.Scene()

  // Subtle gradient background
  scene.background = new THREE.Color(0x0a0a14)
  scene.fog = new THREE.Fog(0x0a0a14, 18, 36)

  // Camera
  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(5.5, 6.5, 9)
  camera.lookAt(0, 4.5, 0)

  // Lights
  const ambient = new THREE.AmbientLight(0xffeedd, 0.35)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffe8f0, 1.6)
  key.position.set(3, 10, 6)
  key.castShadow = false
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xff8090, 0.7)
  rim.position.set(-5, 6, -3)
  scene.add(rim)

  const fill = new THREE.PointLight(0x88ccff, 0.4, 20)
  fill.position.set(-4, 3, 5)
  scene.add(fill)

  // Root glow
  const rootGlow = new THREE.PointLight(0xffccd8, 1.2, 8)
  rootGlow.position.set(0, 0.5, 0)
  scene.add(rootGlow)
}

function loadModel() {
  if (!scene) return

  const loader = new GLTFLoader()
  loader.load(
    props.modelUrl,
    (gltf) => {
      rootGroup = gltf.scene

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(rootGroup)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 8 / maxDim

      rootGroup.scale.setScalar(scale)
      rootGroup.position.sub(center.multiplyScalar(scale))
      rootGroup.position.y -= (box.min.y * scale)

      // Enhance materials
      rootGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMapIntensity = 0.6
          }
        }
      })

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  if (camera) {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  controls = new OrbitControls(camera!, canvasRef.value)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.enablePan = false
  controls.minDistance = 5
  controls.maxDistance = 20
  controls.target.set(0, 4, 0)
  controls.maxPolarAngle = Math.PI * 0.78
  controls.update()
}

function animate() {
  animationId = requestAnimationFrame(animate)

  // Gentle auto-rotation
  if (rootGroup) {
    rootGroup.rotation.y += 0.002
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
  renderer?.dispose()
  scene?.clear()
})

watch(() => props.modelUrl, () => {
  if (rootGroup && scene) {
    scene.remove(rootGroup)
    rootGroup = null
  }
  loading.value = true
  loadError.value = false
  loadModel()
})
</script>

<template>
  <div class="three-tree-wrapper" :style="fill ? { height: '100%' } : { height: height + 'px' }">
    <canvas ref="canvasRef" class="three-tree-canvas" />
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
  border-radius: 16px;
  overflow: hidden;
  background: #0a0a14;
  border: 1px solid rgba(255, 255, 255, 0.06);
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
}

.three-tree-wrapper:hover .three-tree-hint {
  opacity: 1;
}
</style>
