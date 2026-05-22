import { ref, shallowRef, onUnmounted, type Ref, type ShallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function useGalaxyControls(
  cameraRef: ShallowRef<THREE.PerspectiveCamera | null>,
  domRef: Ref<HTMLCanvasElement | null>,
) {
  const controls = shallowRef<OrbitControls | null>(null)
  const autoRotate = ref(true)
  let idleTimer: ReturnType<typeof setTimeout> | null = null

  function init() {
    const cam = cameraRef.value
    const dom = domRef.value
    if (!cam || !dom) return

    const c = new OrbitControls(cam, dom)
    c.enableDamping = true
    c.dampingFactor = 0.08
    c.minPolarAngle = 0.3
    c.maxPolarAngle = 1.2
    c.minDistance = 4
    c.maxDistance = 20
    c.autoRotate = true
    c.autoRotateSpeed = 0.5

    dom.addEventListener('pointerdown', onPointerDown)
    dom.addEventListener('pointerup', onPointerUp)

    controls.value = c
  }

  function onPointerDown() {
    if (!controls.value) return
    controls.value.autoRotate = false
    autoRotate.value = false
    if (idleTimer) clearTimeout(idleTimer)
  }

  function onPointerUp() {
    idleTimer = setTimeout(() => {
      if (!controls.value) return
      controls.value.autoRotate = true
      autoRotate.value = true
    }, 3000)
  }

  function dispose() {
    if (idleTimer) clearTimeout(idleTimer)
    if (controls.value) {
      const el = controls.value.domElement
      el?.removeEventListener('pointerdown', onPointerDown)
      el?.removeEventListener('pointerup', onPointerUp)
      controls.value.dispose()
      controls.value = null
    }
  }

  onUnmounted(dispose)

  return {
    controls,
    autoRotate,
    init,
    dispose,
  }
}
