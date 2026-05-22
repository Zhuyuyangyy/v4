import { shallowRef, type Ref } from 'vue'
import * as THREE from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export function useGalaxyScene(canvasRef: Ref<HTMLCanvasElement | null>, containerRef: Ref<HTMLElement | null>) {
  const scene = shallowRef<THREE.Scene | null>(null)
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null)
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
  const css2dRenderer = shallowRef<CSS2DRenderer | null>(null)
  const composer = shallowRef<EffectComposer | null>(null)
  const bloomPass = shallowRef<UnrealBloomPass | null>(null)

  let bloomEnabled = true
  let resizeObserver: ResizeObserver | null = null
  let disposed = false

  function init() {
    if (!canvasRef.value) return

    const s = new THREE.Scene()
    s.fog = new THREE.FogExp2('#0c0c1a', 0.0008)
    scene.value = s

    const c = new THREE.PerspectiveCamera(50, 2, 0.1, 50)
    c.position.set(0, 8, 12)
    c.lookAt(0, 0, 0)
    camera.value = c

    const r = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: false,
    })
    r.setClearColor('#0c0c1a')
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 0.7
    renderer.value = r

    // Ambient light for base visibility
    const ambient = new THREE.AmbientLight('#222244', 0.3)
    s.add(ambient)

    // Point light at center to illuminate star and nearby planets
    const pointLight = new THREE.PointLight('#00d4ff', 1.5, 18, 2)
    pointLight.position.set(0, 2, 0)
    s.add(pointLight)

    const c2d = new CSS2DRenderer()
    c2d.domElement.style.position = 'absolute'
    c2d.domElement.style.top = '0'
    c2d.domElement.style.left = '0'
    c2d.domElement.style.pointerEvents = 'none'
    css2dRenderer.value = c2d

    updateSize()

    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => updateSize())
      resizeObserver.observe(containerRef.value)
    }
  }

  function initBloom() {
    if (!renderer.value || !scene.value || !camera.value) return

    const comp = new EffectComposer(renderer.value)
    comp.addPass(new RenderPass(scene.value, camera.value))

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(renderer.value.domElement.width, renderer.value.domElement.height),
      0.8,  // strength
      0.3,  // radius
      0.2,  // threshold
    )
    comp.addPass(bloom)

    composer.value = comp
    bloomPass.value = bloom
  }

  function setBloomEnabled(enabled: boolean) {
    bloomEnabled = enabled
  }

  function render() {
    if (!scene.value || !camera.value || !renderer.value) return

    if (bloomEnabled && composer.value) {
      composer.value.render()
    } else {
      renderer.value.render(scene.value, camera.value)
    }
  }

  function updateSize() {
    const el = containerRef.value
    if (!el || !renderer.value || !camera.value || !css2dRenderer.value) return

    const w = el.clientWidth
    const h = el.clientHeight
    if (w === 0 || h === 0) return

    renderer.value.setSize(w, h)
    css2dRenderer.value.setSize(w, h)
    if (composer.value) {
      composer.value.setSize(w, h)
    }
    camera.value.aspect = w / h
    camera.value.updateProjectionMatrix()
  }

  function dispose() {
    disposed = true

    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }

    if (bloomPass.value) {
      bloomPass.value = null
    }

    if (renderer.value) {
      renderer.value.dispose()
      renderer.value = null
    }

    if (css2dRenderer.value) {
      const dom = css2dRenderer.value.domElement
      if (dom.parentNode) dom.parentNode.removeChild(dom)
      css2dRenderer.value = null
    }

    if (scene.value) {
      scene.value.clear()
      scene.value = null
    }

    camera.value = null
    composer.value = null
  }

  return {
    scene,
    camera,
    renderer,
    css2dRenderer,
    composer,
    init,
    initBloom,
    setBloomEnabled,
    render,
    dispose,
    isDisposed: () => disposed,
  }
}

// ─── Performance detection (standalone, not tied to instance) ───

export type PerfTier = 'high' | 'mid' | 'low'

export function detectWebGL2(): boolean {
  const c = document.createElement('canvas')
  return !!c.getContext('webgl2')
}

export function detectGPUTier(): PerfTier {
  const c = document.createElement('canvas')
  const gl = c.getContext('webgl2') || c.getContext('webgl')
  if (!gl) return 'low'

  const debugInfo = (gl as WebGL2RenderingContext).getExtension('WEBGL_debug_renderer_info')
  if (debugInfo) {
    const renderer = (gl as WebGL2RenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    // Integrated / mobile GPUs → low or mid
    if (/mali|adreno|powervr|intel.*hd|intel.*uhd|intel.*iris.*graphics/.test(renderer)) {
      return 'mid'
    }
    // Known low-end
    if (/mali-4|mali-t|adreno 3|adreno 4|intel.*hd graphics [2-4]/.test(renderer)) {
      return 'low'
    }
  }
  return 'high'
}

export function getPerfConfig(tier: PerfTier) {
  switch (tier) {
    case 'high':
      return { particles: 3000, bloomStrength: 0.8, bloomEnabled: true }
    case 'mid':
      return { particles: 1500, bloomStrength: 0.4, bloomEnabled: true }
    case 'low':
      return { particles: 500, bloomStrength: 0, bloomEnabled: false }
  }
}
