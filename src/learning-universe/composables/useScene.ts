import { ref, shallowRef } from 'vue'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

export interface SceneState {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  bloomPass: UnrealBloomPass
  timer: THREE.Timer
  stars: THREE.Group
  ambientGroup: THREE.Group
  bgStarfield: THREE.Points
  bgGalaxies: THREE.Points
  animationId: number
}

const state = shallowRef<SceneState | null>(null)
export const isReady = ref(false)

export function useScene() {
  function init(canvas: HTMLCanvasElement): SceneState {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020309)
    scene.fog = new THREE.FogExp2(0x02050f, 0.00009)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.5,
      1000,
    )
    camera.position.set(0, 30, 120)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const ambient = new THREE.AmbientLight(0x24345f, 0.35)
    scene.add(ambient)

    const hemi = new THREE.HemisphereLight(0x243a6e, 0x03040d, 0.42)
    scene.add(hemi)

    const sun = new THREE.DirectionalLight(0xffd8b0, 0.82)
    sun.position.set(70, 42, 94)
    scene.add(sun)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0,
      0.62,
      0.58,
    )
    composer.addPass(bloomPass)

    const outputPass = new OutputPass()
    composer.addPass(outputPass)

    const rgbeLoader = new RGBELoader()
    rgbeLoader.load('/assets/hdri/kloppenheim_02_puresky_2k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      scene.environmentIntensity = 0.22
    }, undefined, (err) => {
      console.warn('HDRI load failed (non-critical):', err)
    })

    const timer = new THREE.Timer()
    const stars = new THREE.Group()
    const ambientGroup = new THREE.Group()

    scene.add(stars)
    scene.add(ambientGroup)

    const bgStarfield = createStarfieldBackground(scene)
    const bgGalaxies = createDistantGalaxies(scene)

    const s: SceneState = {
      scene,
      camera,
      renderer,
      composer,
      bloomPass,
      timer,
      stars,
      ambientGroup,
      bgStarfield,
      bgGalaxies,
      animationId: 0,
    }
    state.value = s
    isReady.value = true
    return s
  }

  function createStarfieldBackground(scene: THREE.Scene): THREE.Points {
    const count = 22000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const layer = Math.random()
      const r = layer < 0.3
        ? 280 + Math.random() * 180
        : 480 + Math.random() * 340

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * (0.8 + Math.random() * 0.3)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const type = Math.random()
      if (type < 0.05) {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 1.0
        sizes[i] = 0.6 + Math.random() * 0.4
      } else if (type < 0.12) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 0.4
        sizes[i] = 0.5 + Math.random() * 0.3
      } else if (type < 0.2) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.7
        sizes[i] = 0.4 + Math.random() * 0.2
      } else {
        const b = 0.7 + Math.random() * 0.3
        colors[i * 3] = b; colors[i * 3 + 1] = b; colors[i * 3 + 2] = b
        sizes[i] = 0.15 + Math.random() * 0.3
      }

      if (layer < 0.3) sizes[i] *= 1.5
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.34,
      sizeAttenuation: true,
      map: createStarSprite(),
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const starfield = new THREE.Points(geo, mat)
    starfield.renderOrder = -1
    scene.add(starfield)
    return starfield
  }

  function createStarSprite(): THREE.Texture {
    const size = 48
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.1, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.3, 'rgba(255,255,255,0.3)')
    g.addColorStop(0.6, 'rgba(255,255,255,0.02)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }

  function createDistantGalaxies(scene: THREE.Scene): THREE.Points {
    const count = 84
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const galaxyColors = [
      new THREE.Color(0x8866ff),
      new THREE.Color(0x4488ff),
      new THREE.Color(0xff66aa),
      new THREE.Color(0xff8844),
      new THREE.Color(0x66ccff),
      new THREE.Color(0xcc88ff),
    ]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 200 + Math.random() * (Math.random() > 0.5 ? 150 : 250)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * (0.4 + Math.random() * 0.3)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = galaxyColors[Math.floor(Math.random() * galaxyColors.length)].clone()
      const bright = 0.5 + Math.random() * 0.3
      colors[i * 3] = c.r * bright
      colors[i * 3 + 1] = c.g * bright
      colors[i * 3 + 2] = c.b * bright

      sizes[i] = 6 + Math.random() * 26
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 7,
      map: createGalaxySprite(),
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const galaxies = new THREE.Points(geo, mat)
    galaxies.renderOrder = -1
    scene.add(galaxies)
    return galaxies
  }

  function createGalaxySprite(): THREE.Texture {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!

    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.1, 'rgba(255,255,255,0.6)')
    g.addColorStop(0.3, 'rgba(255,255,255,0.15)')
    g.addColorStop(0.6, 'rgba(255,255,255,0.03)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)

    return new THREE.CanvasTexture(canvas)
  }

  function dispose(s: SceneState | null) {
    if (!s) return
    cancelAnimationFrame(s.animationId)

    s.scene.traverse((obj) => {
      const o = obj as THREE.Mesh | THREE.Points | THREE.Line
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        if (Array.isArray(o.material)) {
          o.material.forEach(m => {
            disposeMaterialTextures(m)
            m.dispose()
          })
        } else {
          disposeMaterialTextures(o.material)
          o.material.dispose()
        }
      }
    })

    s.composer.dispose()
    s.renderer.dispose()
    s.scene.clear()
    state.value = null
    isReady.value = false
  }

  function disposeMaterialTextures(mat: THREE.Material) {
    for (const key of Object.keys(mat)) {
      const val = (mat as any)[key]
      if (val instanceof THREE.Texture) {
        val.dispose()
      }
    }
  }

  return { state: state as ReturnType<typeof ref<SceneState | null>>, isReady, init, dispose, getState: () => state.value }
}
