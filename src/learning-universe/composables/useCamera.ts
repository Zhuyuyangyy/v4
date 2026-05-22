import { ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import type { ZoomLevel } from '../types'
import type { SceneState } from './useScene'

export function useCamera() {
  const target = ref(new THREE.Vector3(0, 0, 0))
  const isDragging = ref(false)
  const isAnimating = ref(false)
  const zoomLevel = ref<ZoomLevel>('universe')
  const selectedNodeId = ref<string | null>(null)
  const lastInteraction = ref(0)
  const autoRotating = ref(false)
  const dragStart = new THREE.Vector2()

  let spherical = new THREE.Spherical()

  // Inertia velocity
  let velocityTheta = 0
  let velocityPhi = 0

  function init(s: SceneState) {
    const camPos = s.camera.position
    spherical.setFromVector3(camPos.clone().sub(target.value))
    lastInteraction.value = performance.now()
  }

  function updateZoomLevel(s: SceneState) {
    const dist = s.camera.position.distanceTo(target.value)
    if (dist > 150) zoomLevel.value = 'universe'
    else if (dist > 40) zoomLevel.value = 'galaxy'
    else if (dist > 10) zoomLevel.value = 'system'
    else zoomLevel.value = 'planet'
  }

  function orbit(s: SceneState, deltaX: number, deltaY: number) {
    isDragging.value = true
    velocityTheta = -deltaX * 0.005
    velocityPhi = -deltaY * 0.005
    applyOrbit(s)
    lastInteraction.value = performance.now()
    autoRotating.value = false
  }

  function endDrag() {
    isDragging.value = false
  }

  function applyOrbit(s: SceneState) {
    spherical.theta += velocityTheta
    spherical.phi += velocityPhi
    spherical.phi = Math.max(0.1, Math.min(Math.PI * 0.45, spherical.phi))

    const pos = new THREE.Vector3().setFromSpherical(spherical).add(target.value)
    s.camera.position.copy(pos)
    s.camera.lookAt(target.value)
    updateZoomLevel(s)
  }

  function applyInertia(s: SceneState) {
    if (Math.abs(velocityTheta) < 0.0001 && Math.abs(velocityPhi) < 0.0001) {
      velocityTheta = 0
      velocityPhi = 0
      return
    }
    velocityTheta *= 0.94
    velocityPhi *= 0.94
    applyOrbit(s)
  }

  function startAutoRotate(s: SceneState) {
    if (isDragging.value || isAnimating.value) return
    const elapsed = performance.now() - lastInteraction.value
    if (elapsed > 30000) {
      autoRotating.value = true
      velocityTheta = 0.001
      velocityPhi = 0
      applyOrbit(s)
    }
  }

  function zoom(s: SceneState, delta: number) {
    spherical.radius -= delta * 3
    spherical.radius = Math.max(3, Math.min(350, spherical.radius))

    const pos = new THREE.Vector3().setFromSpherical(spherical).add(target.value)
    // Smooth zoom via GSAP
    gsap.to(s.camera.position, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: true,
    })
    s.camera.lookAt(target.value)
    updateZoomLevel(s)
    lastInteraction.value = performance.now()
    autoRotating.value = false
  }

  function flyTo(s: SceneState, worldPos: THREE.Vector3, nodeId: string | null = null) {
    isAnimating.value = true
    // Safety timeout: force end animation after 3s
    const animTimeout = setTimeout(() => { isAnimating.value = false }, 3000)
    selectedNodeId.value = nodeId
    autoRotating.value = false
    velocityTheta = 0
    velocityPhi = 0

    const tgt = worldPos.clone()

    gsap.to(target.value, {
      x: tgt.x, y: tgt.y, z: tgt.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => s.camera.lookAt(target.value),
    })

    const direction = s.camera.position.clone().sub(tgt).normalize()
    const closePos = tgt.clone().add(direction.multiplyScalar(8))

    gsap.to(s.camera.position, {
      x: closePos.x, y: closePos.y, z: closePos.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        spherical.setFromVector3(s.camera.position.clone().sub(target.value))
      },
      onComplete: () => {
        clearTimeout(animTimeout)
        isAnimating.value = false
        updateZoomLevel(s)
      },
    })

    lastInteraction.value = performance.now()
  }

  function resetView(s: SceneState) {
    isAnimating.value = true
    const animTimeout = setTimeout(() => { isAnimating.value = false }, 3000)
    selectedNodeId.value = null
    autoRotating.value = false
    velocityTheta = 0
    velocityPhi = 0

    gsap.to(target.value, {
      x: 0, y: 0, z: 0,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => s.camera.lookAt(target.value),
    })

    gsap.to(s.camera.position, {
      x: 0, y: 30, z: 120,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        spherical.setFromVector3(s.camera.position.clone().sub(target.value))
      },
      onComplete: () => {
        clearTimeout(animTimeout)
        isAnimating.value = false
        zoomLevel.value = 'universe'
      },
    })
  }

  function pan(s: SceneState, dx: number, dy: number) {
    const right = new THREE.Vector3()
    const up = new THREE.Vector3()
    s.camera.getWorldDirection(new THREE.Vector3())
    right.crossVectors(s.camera.up, new THREE.Vector3().subVectors(s.camera.position, target.value).normalize()).normalize()
    up.copy(s.camera.up).normalize()

    const panSpeed = spherical.radius * 0.002
    target.value.add(right.multiplyScalar(-dx * panSpeed))
    target.value.add(up.multiplyScalar(dy * panSpeed))
    s.camera.lookAt(target.value)
    lastInteraction.value = performance.now()
    autoRotating.value = false
  }

  function onResize(s: SceneState) {
    s.camera.aspect = window.innerWidth / window.innerHeight
    s.camera.updateProjectionMatrix()
    s.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  return {
    target, isDragging, isAnimating, zoomLevel, selectedNodeId, autoRotating,
    dragStart,
    init, orbit, endDrag, zoom, flyTo, resetView, updateZoomLevel, onResize,
    applyInertia, startAutoRotate, pan,
  }
}
