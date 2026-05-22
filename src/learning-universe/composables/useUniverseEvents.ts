import * as THREE from 'three'
import type { SceneState } from './useScene'
import type { GalaxyClusterNode } from '../three/GalaxyCluster'

export interface EventState {
  mouseDown: boolean
  mouseMoved: boolean
  prevMouse: THREE.Vector2
  currMouse: THREE.Vector2
  touchStartPos: { x: number; y: number } | null
  touchStartDist: number
  touchMoved: boolean
}

export function createEventState(): EventState {
  return {
    mouseDown: false,
    mouseMoved: false,
    prevMouse: new THREE.Vector2(),
    currMouse: new THREE.Vector2(),
    touchStartPos: null,
    touchStartDist: 0,
    touchMoved: false,
  }
}

export function useUniverseEvents(
  s: () => SceneState | null,
  galaxyClusters: () => GalaxyClusterNode[],
  cameraCtrl: any,
  interaction: any,
  universe: any,
  agentStore: any,
  spawnClickBurst: (s: SceneState, pos: THREE.Vector3) => void,
  updatePathVisualization: () => void,
  keys: { w: boolean; a: boolean; s: boolean; d: boolean },
) {
  const es = createEventState()

  function getScene(): SceneState | null {
    return s()
  }

  function onMouseDown(e: MouseEvent) {
    const scene = getScene()
    if (!scene) return
    es.mouseDown = true
    es.mouseMoved = false
    es.prevMouse.set(e.clientX, e.clientY)
    es.currMouse.set(e.clientX, e.clientY)
    cameraCtrl.dragStart.set(e.clientX, e.clientY)
  }

  function onMouseMove(e: MouseEvent) {
    const scene = getScene()
    if (!scene) return
    es.currMouse.set(e.clientX, e.clientY)

    if (es.mouseDown) {
      const dx = e.clientX - es.prevMouse.x
      const dy = e.clientY - es.prevMouse.y
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        es.mouseMoved = true
      }
      if (es.mouseMoved && !cameraCtrl.isAnimating.value) {
        cameraCtrl.orbit(scene, dx, dy)
      }
      es.prevMouse.set(e.clientX, e.clientY)
      return
    }

    // Hover detection
    if (!cameraCtrl.isAnimating.value) {
      const ndc = interaction.toNDC(e.clientX, e.clientY)
      const hit = interaction.raycast(scene, ndc, galaxyClusters())
      universe.hoverNode(hit?.nodeId ?? null)
    }
  }

  function onMouseUp(e: MouseEvent) {
    const scene = getScene()
    if (!scene || !es.mouseDown) return
    es.mouseDown = false
    if (es.mouseMoved) {
      cameraCtrl.endDrag()
      return
    }

    // Click - check for node hit
    const ndc = interaction.toNDC(e.clientX, e.clientY)
    const hit = interaction.raycast(scene, ndc, galaxyClusters())
    if (hit) {
      const worldPos = new THREE.Vector3()
      hit.mesh.getWorldPosition(worldPos)
      spawnClickBurst(scene, worldPos)
      universe.selectNode(hit.nodeId)
      cameraCtrl.flyTo(scene, worldPos, hit.nodeId)
      agentStore.navigateTo(hit.nodeId)
    }
  }

  function onDoubleClick() {
    const scene = getScene()
    if (!scene) return
    universe.selectNode(null)
    cameraCtrl.resetView(scene)
    agentStore.refreshRecommendation()
  }

  function onWheel(e: WheelEvent) {
    const scene = getScene()
    if (!scene) return
    e.preventDefault()
    cameraCtrl.zoom(scene, e.deltaY * 0.05)
  }

  function onResize() {
    const scene = getScene()
    if (!scene) return
    cameraCtrl.onResize(scene)
    scene.composer.setSize(window.innerWidth, window.innerHeight)
    scene.bloomPass.resolution.set(window.innerWidth, window.innerHeight)
  }

  // ── Touch events ──────────────────────────────────────────
  function onTouchStart(e: TouchEvent) {
    const scene = getScene()
    if (!scene) return
    if (e.touches.length === 1) {
      es.touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      es.touchStartDist = 0
      es.touchMoved = false
      es.prevMouse.set(e.touches[0].clientX, e.touches[0].clientY)
      es.mouseDown = true
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      es.touchStartDist = Math.sqrt(dx * dx + dy * dy)
      es.mouseDown = false
    }
  }

  function onTouchMove(e: TouchEvent) {
    const scene = getScene()
    if (!scene) return
    e.preventDefault()

    if (e.touches.length === 1 && es.mouseDown) {
      const cx = e.touches[0].clientX
      const cy = e.touches[0].clientY
      es.currMouse.set(cx, cy)

      const dx = cx - es.prevMouse.x
      const dy = cy - es.prevMouse.y
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        es.touchMoved = true
        es.mouseMoved = true
      }
      if (es.touchMoved && !cameraCtrl.isAnimating.value) {
        cameraCtrl.orbit(scene, dx, dy)
      }
      es.prevMouse.set(cx, cy)
      es.touchStartPos = null
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (es.touchStartDist > 0) {
        const delta = (es.touchStartDist - dist) * 0.3
        cameraCtrl.zoom(scene, delta)
      }
      es.touchStartDist = dist
      es.touchMoved = true
      es.mouseDown = false
    }
  }

  function onTouchEnd() {
    const scene = getScene()
    if (!scene) return
    es.mouseDown = false

    if (es.touchMoved) {
      cameraCtrl.endDrag()
      es.touchStartPos = null
      es.touchMoved = false
      return
    }

    // Tap detection
    if (es.touchStartPos) {
      const ndc = interaction.toNDC(es.touchStartPos.x, es.touchStartPos.y)
      const hit = interaction.raycast(scene, ndc, galaxyClusters())
      if (hit) {
        const worldPos = new THREE.Vector3()
        hit.mesh.getWorldPosition(worldPos)
        spawnClickBurst(scene, worldPos)
        universe.selectNode(hit.nodeId)
        cameraCtrl.flyTo(scene, worldPos, hit.nodeId)
        agentStore.navigateTo(hit.nodeId)
      } else {
        universe.selectNode(null)
        cameraCtrl.resetView(scene)
        agentStore.refreshRecommendation()
      }
    }
    es.touchStartPos = null
    es.touchMoved = false
  }

  // ── Keyboard ─────────────────────────────────────────────
  function onKeyDown(e: KeyboardEvent) {
    const scene = getScene()
    if (!scene) return
    switch (e.key.toLowerCase()) {
      case 'escape':
        universe.selectNode(null)
        cameraCtrl.resetView(scene)
        agentStore.refreshRecommendation()
        break
      case 'r':
        agentStore.refreshRecommendation()
        updatePathVisualization()
        break
      case 'w': keys.w = true; break
      case 'a': keys.a = true; break
      case 's': keys.s = true; break
      case 'd': keys.d = true; break
      case 'f':
        if (e.ctrlKey || e.metaKey) e.preventDefault()
        break
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    switch (e.key.toLowerCase()) {
      case 'w': keys.w = false; break
      case 'a': keys.a = false; break
      case 's': keys.s = false; break
      case 'd': keys.d = false; break
    }
  }

  function flyTo(worldPos: THREE.Vector3, nodeId: string) {
    const scene = getScene()
    if (!scene) return
    spawnClickBurst(scene, worldPos)
    cameraCtrl.flyTo(scene, worldPos, nodeId)
  }

  /** Register all event listeners on window */
  function register() {
    if (typeof window === 'undefined') return
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('dblclick', onDoubleClick)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
  }

  /** Unregister all event listeners */
  function unregister() {
    if (typeof window === 'undefined') return
    window.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('dblclick', onDoubleClick)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  return {
    es,
    flyTo,
    register,
    unregister,
    onResize,
  }
}
