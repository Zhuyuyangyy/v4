import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const ASSET_BASE = '/ez-tree-env'

function degToRad(degrees: number) {
  return degrees * (Math.PI / 180)
}

// ---------- Simplex noise (JS) ----------
function mod289(v: number): number {
  return v - Math.floor(v / 289.0) * 289.0
}

function permute3(v: THREE.Vector3): THREE.Vector3 {
  return new THREE.Vector3(
    mod289((v.x * 34.0 + 1.0) * v.x),
    mod289((v.y * 34.0 + 1.0) * v.y),
    mod289((v.z * 34.0 + 1.0) * v.z),
  )
}

export function simplex2d(v: THREE.Vector2): number {
  const C = new THREE.Vector4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439)
  let i = new THREE.Vector2(Math.floor(v.x + C.y * (v.x + v.y)), Math.floor(v.y + C.y * (v.x + v.y)))
  let x0 = new THREE.Vector2(v.x - i.x + C.x * (i.x + i.y), v.y - i.y + C.x * (i.x + i.y))
  const i1 = new THREE.Vector2(x0.x > x0.y ? 1.0 : 0.0, x0.x > x0.y ? 0.0 : 1.0)
  const x12 = new THREE.Vector4(x0.x + C.x - i1.x, x0.y + C.x - i1.y, x0.x + C.z, x0.y + C.z)
  i = new THREE.Vector2(mod289(i.x), mod289(i.y))
  let p = permute3(new THREE.Vector3(i.y, i.y + i1.y, i.y + 1.0))
  p = permute3(new THREE.Vector3(p.x + i.x, p.y + i.x + i1.x, p.z + i.x + 1.0))
  let m = new THREE.Vector3(
    Math.max(0.0, 0.5 - x0.dot(x0)),
    Math.max(0.0, 0.5 - (x12.x * x12.x + x12.y * x12.y)),
    Math.max(0.0, 0.5 - (x12.z * x12.z + x12.w * x12.w)),
  )
  m = new THREE.Vector3(m.x * m.x, m.y * m.y, m.z * m.z)
  m = new THREE.Vector3(m.x * m.x, m.y * m.y, m.z * m.z)
  const x = new THREE.Vector3(
    2.0 * ((p.x * C.w) - Math.floor(p.x * C.w)) - 1.0,
    2.0 * ((p.y * C.w) - Math.floor(p.y * C.w)) - 1.0,
    2.0 * ((p.z * C.w) - Math.floor(p.z * C.w)) - 1.0,
  )
  const h = new THREE.Vector3(Math.abs(x.x) - 0.5, Math.abs(x.y) - 0.5, Math.abs(x.z) - 0.5)
  const ox = new THREE.Vector3(Math.floor(x.x + 0.5), Math.floor(x.y + 0.5), Math.floor(x.z + 0.5))
  const a0 = new THREE.Vector3(x.x - ox.x, x.y - ox.y, x.z - ox.z)
  m = new THREE.Vector3(
    m.x * (1.79284291400159 - 0.85373472095314 * (a0.x * a0.x + h.x * h.x)),
    m.y * (1.79284291400159 - 0.85373472095314 * (a0.y * a0.y + h.y * h.y)),
    m.z * (1.79284291400159 - 0.85373472095314 * (a0.z * a0.z + h.z * h.z)),
  )
  const g = new THREE.Vector3(a0.x * x0.x + h.x * x0.y, a0.y * x12.x + h.y * x12.y, a0.z * x12.z + h.z * x12.w)
  return 130.0 * m.dot(g)
}

// ---------- Shader snippets ----------
const SIMPLEX2D_GLSL = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}
float simplex2d(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

const SKYBOX_VERTEX = `
varying vec3 vPosition;
void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const SKYBOX_FRAGMENT = `
precision mediump float;
varying vec3 vPosition;
uniform float uSunAzimuth;
uniform float uSunElevation;
uniform vec3 uSunColor;
uniform vec3 uSkyColorLow;
uniform vec3 uSkyColorHigh;
uniform float uSunSize;
void main() {
  float azimuth = radians(uSunAzimuth);
  float elevation = radians(uSunElevation);
  vec3 sunDirection = normalize(vec3(
    cos(elevation) * sin(azimuth),
    sin(elevation),
    cos(elevation) * cos(azimuth)
  ));
  vec3 direction = normalize(vPosition);
  float t = direction.y * 0.5 + 0.5;
  vec3 skyColor = mix(uSkyColorLow, uSkyColorHigh, t);
  float sunIntensity = pow(max(dot(direction, sunDirection), 0.0), 1000.0 / uSunSize);
  vec3 sunColor = uSunColor * sunIntensity;
  gl_FragColor = vec4(skyColor + sunColor, 1.0);
}
`

// ---------- Skybox ----------
export interface SkyboxOptions {
  sunAzimuth?: number
  sunElevation?: number
  sunColor?: THREE.Color
  skyColorLow?: THREE.Color
  skyColorHigh?: THREE.Color
  sunSize?: number
}

export class EzSkybox extends THREE.Mesh {
  sun: THREE.DirectionalLight
  ambient: THREE.AmbientLight

  constructor(options: SkyboxOptions = {}) {
    super()
    const sunAzimuth = options.sunAzimuth ?? 90
    const sunElevation = options.sunElevation ?? 30
    const sunColor = options.sunColor ?? new THREE.Color(0xffe5b0)
    const skyColorLow = options.skyColorLow ?? new THREE.Color(0x6fa2ef)
    const skyColorHigh = options.skyColorHigh ?? new THREE.Color(0x2053ff)
    const sunSize = options.sunSize ?? 1

    this.name = 'EzSkybox'
    this.geometry = new THREE.SphereGeometry(900, 64, 64)
    this.material = new THREE.ShaderMaterial({
      vertexShader: SKYBOX_VERTEX,
      fragmentShader: SKYBOX_FRAGMENT,
      uniforms: {
        uSunAzimuth: { value: sunAzimuth },
        uSunElevation: { value: sunElevation },
        uSunColor: { value: sunColor },
        uSkyColorLow: { value: skyColorLow },
        uSkyColorHigh: { value: skyColorHigh },
        uSunSize: { value: sunSize },
      },
      side: THREE.BackSide,
    })

    this.sun = new THREE.DirectionalLight(sunColor, 3.2)
    this.sun.castShadow = true
    this.sun.shadow.camera.left = -40
    this.sun.shadow.camera.right = 40
    this.sun.shadow.camera.top = 40
    this.sun.shadow.camera.bottom = -40
    this.sun.shadow.mapSize.set(1024, 1024)
    this.sun.shadow.bias = -0.0005
    this.sun.shadow.normalBias = 0.2
    this.add(this.sun)

    this.ambient = new THREE.AmbientLight(0xffffff, 0.72)
    this.add(this.ambient)

    this.updateSunPosition(sunAzimuth, sunElevation)
  }

  updateSunPosition(azimuthDeg: number, elevationDeg: number) {
    const el = degToRad(elevationDeg)
    const az = degToRad(azimuthDeg)
    this.sun.position.set(
      60 * Math.cos(el) * Math.sin(az),
      60 * Math.sin(el),
      60 * Math.cos(el) * Math.cos(az),
    )
  }
}

// ---------- Ground ----------
export interface GroundOptions {
  scale?: number
  patchiness?: number
  radius?: number
}

let groundTexturesLoaded = false
let grassTexture: THREE.Texture | null = null
let dirtTexture: THREE.Texture | null = null
let dirtNormalTexture: THREE.Texture | null = null

async function loadGroundTextures() {
  if (groundTexturesLoaded) return
  const loader = new THREE.TextureLoader()
  grassTexture = await loader.loadAsync(`${ASSET_BASE}/grass.jpg`)
  grassTexture.wrapS = THREE.RepeatWrapping
  grassTexture.wrapT = THREE.RepeatWrapping
  grassTexture.colorSpace = THREE.SRGBColorSpace

  dirtTexture = await loader.loadAsync(`${ASSET_BASE}/dirt_color.jpg`)
  dirtTexture.wrapS = THREE.RepeatWrapping
  dirtTexture.wrapT = THREE.RepeatWrapping
  dirtTexture.colorSpace = THREE.SRGBColorSpace

  dirtNormalTexture = await loader.loadAsync(`${ASSET_BASE}/dirt_normal.jpg`)
  dirtNormalTexture.wrapS = THREE.RepeatWrapping
  dirtNormalTexture.wrapT = THREE.RepeatWrapping

  groundTexturesLoaded = true
}

export class EzGround extends THREE.Mesh {
  constructor(options: GroundOptions = {}) {
    super()
    this.name = 'EzGround'
    this.geometry = new THREE.CircleGeometry(options.radius ?? 120, 64)
    this.rotation.x = -Math.PI / 2
    this.receiveShadow = true
    const scale = options.scale ?? 80
    const patchiness = options.patchiness ?? 0.7

    this.material = new THREE.MeshPhongMaterial({
      color: 0x7fb556,
      emissive: new THREE.Color(0x5a8a3c),
      emissiveIntensity: 0.05,
      shininess: 0.1,
    })

    loadGroundTextures().then(() => {
      const material = this.material as THREE.MeshPhongMaterial
      material.normalMap = dirtNormalTexture
      material.needsUpdate = true

      material.onBeforeCompile = (shader) => {
        shader.uniforms.uNoiseScale = { value: scale }
        shader.uniforms.uPatchiness = { value: patchiness }
        shader.uniforms.uGrassTexture = { value: grassTexture }
        shader.uniforms.uDirtTexture = { value: dirtTexture }

        shader.vertexShader = `varying vec3 vWorldPosition;\n${shader.vertexShader}`
        shader.fragmentShader = `
          varying vec3 vWorldPosition;
          uniform float uNoiseScale;
          uniform float uPatchiness;
          uniform sampler2D uGrassTexture;
          uniform sampler2D uDirtTexture;
          ${SIMPLEX2D_GLSL}
          ${shader.fragmentShader}
        `

        shader.vertexShader = shader.vertexShader.replace(
          '#include <worldpos_vertex>',
          `#include <worldpos_vertex>\n  vWorldPosition = worldPosition.xyz;`,
        )

        shader.fragmentShader = shader.fragmentShader.replace(
          'void main() {',
          'void main() {',
        )

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          `
          vec2 uv = vec2(vWorldPosition.x, vWorldPosition.z);
          vec3 grassColor = texture2D(uGrassTexture, uv / 30.0).rgb;
          vec3 dirtColor = texture2D(uDirtTexture, uv / 30.0).rgb;
          float n = 0.5 + 0.5 * simplex2d(uv / uNoiseScale);
          float s = smoothstep(uPatchiness - 0.1, uPatchiness + 0.1, n);
          vec4 sampledDiffuseColor = vec4(mix(grassColor, dirtColor, s), 1.0);
          diffuseColor *= sampledDiffuseColor;
          `,
        )

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <normal_fragment_maps>',
          `
          vec3 mapN = texture2D(normalMap, uv / 30.0).xyz * 2.0 - 1.0;
          mapN.xy *= normalScale;
          normal = normalize(tbn * mapN);
          `,
        )
      }
    })
  }
}

// ---------- Grass + Flowers ----------
export interface GrassOptions {
  instanceCount?: number
  maxInstanceCount?: number
  flowerCount?: number
  scale?: number
  patchiness?: number
  size?: THREE.Vector3
  sizeVariation?: THREE.Vector3
  windStrength?: THREE.Vector3
  windFrequency?: number
  windScale?: number
}

let grassAssetsLoaded = false
let grassMeshTemplate: THREE.Mesh | null = null
let whiteFlowerTemplate: THREE.Object3D | null = null
let blueFlowerTemplate: THREE.Object3D | null = null
let yellowFlowerTemplate: THREE.Object3D | null = null

async function loadGrassAssets() {
  if (grassAssetsLoaded) return
  const gltfLoader = new GLTFLoader()

  grassMeshTemplate = (await gltfLoader.loadAsync(`${ASSET_BASE}/grass.glb`)).scene.children[0] as THREE.Mesh
  whiteFlowerTemplate = (await gltfLoader.loadAsync(`${ASSET_BASE}/flower_white.glb`)).scene.children[0]
  blueFlowerTemplate = (await gltfLoader.loadAsync(`${ASSET_BASE}/flower_blue.glb`)).scene.children[0]
  yellowFlowerTemplate = (await gltfLoader.loadAsync(`${ASSET_BASE}/flower_yellow.glb`)).scene.children[0]

  ;[whiteFlowerTemplate, blueFlowerTemplate, yellowFlowerTemplate].forEach((flower) => {
    flower.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && (o as THREE.Mesh).material) {
        const mesh = o as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat.map) {
          mesh.material = new THREE.MeshPhongMaterial({ map: mat.map })
        }
      }
    })
  })

  grassAssetsLoaded = true
}

const WIND_SHADER_HEADER = `
uniform float uTime;
uniform vec3 uWindStrength;
uniform float uWindFrequency;
uniform float uWindScale;
`

function appendWindShader(material: THREE.Material, instanced = false) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 }
    shader.uniforms.uWindStrength = { value: new THREE.Vector3(0.3, 0, 0.3) }
    shader.uniforms.uWindFrequency = { value: 1.0 }
    shader.uniforms.uWindScale = { value: 400.0 }

    shader.vertexShader = `${WIND_SHADER_HEADER}\n${SIMPLEX2D_GLSL}\n${shader.vertexShader}`

    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      'void main() {',
    )

    const vertexBody = instanced
      ? `
        vec4 mvPosition = instanceMatrix * vec4(transformed, 1.0);
        float windOffset = 2.0 * 3.14 * simplex2d((modelMatrix * mvPosition).xz / uWindScale);
        vec3 windSway = position.y * uWindStrength *
          sin(uTime * uWindFrequency + windOffset) *
          cos(uTime * 1.4 * uWindFrequency + windOffset);
        mvPosition.xyz += windSway;
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;
      `
      : `
        vec4 mvPosition = vec4(transformed, 1.0);
        float windOffset = 2.0 * 3.14 * simplex2d((modelMatrix * mvPosition).xz / uWindScale);
        vec3 windSway = 0.2 * position.y * uWindStrength *
          sin(uTime * uWindFrequency + windOffset) *
          cos(uTime * 1.4 * uWindFrequency + windOffset);
        mvPosition.xyz += windSway;
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;
      `

    shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', vertexBody)
    material.userData.shader = shader
  }
}

export class EzGrass extends THREE.Object3D {
  options: Required<GrassOptions>
  grassMesh?: THREE.InstancedMesh
  flowers: THREE.Group

  constructor(options: GrassOptions = {}) {
    super()
    this.name = 'EzGrass'
    this.options = {
      instanceCount: options.instanceCount ?? 500,
      maxInstanceCount: options.maxInstanceCount ?? 1500,
      flowerCount: options.flowerCount ?? 5,
      scale: options.scale ?? 45,
      patchiness: options.patchiness ?? 0.74,
      size: options.size ?? new THREE.Vector3(0.5, 0.4, 0.5),
      sizeVariation: options.sizeVariation ?? new THREE.Vector3(0.12, 0.18, 0.12),
      windStrength: options.windStrength ?? new THREE.Vector3(0.25, 0, 0.25),
      windFrequency: options.windFrequency ?? 1.0,
      windScale: options.windScale ?? 400.0,
    }

    this.flowers = new THREE.Group()
    this.add(this.flowers)

    loadGrassAssets().then(() => {
      this.generateGrass()
      this.generateFlowers(whiteFlowerTemplate!)
      this.generateFlowers(blueFlowerTemplate!)
      this.generateFlowers(yellowFlowerTemplate!)
    })
  }

  get instanceCount(): number {
    return this.grassMesh?.count ?? this.options.instanceCount
  }

  set instanceCount(value: number) {
    if (this.grassMesh) this.grassMesh.count = value
  }

  update(elapsedTime: number) {
    this.traverse((o) => {
      const mesh = o as THREE.Mesh
      const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
      const shader = material?.userData?.shader
      if (shader) {
        shader.uniforms.uTime.value = elapsedTime
      }
    })
  }

  private generateGrass() {
    const templateMaterial = Array.isArray(grassMeshTemplate!.material)
      ? (grassMeshTemplate!.material[0] as THREE.MeshStandardMaterial)
      : (grassMeshTemplate!.material as THREE.MeshStandardMaterial)
    const grassMaterial = new THREE.MeshPhongMaterial({
      map: templateMaterial.map,
      emissive: new THREE.Color(0x308040),
      emissiveIntensity: 0.05,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    })
    grassMaterial.color.multiplyScalar(0.72)
    appendWindShader(grassMaterial, true)

    this.grassMesh = new THREE.InstancedMesh(
      grassMeshTemplate!.geometry,
      grassMaterial,
      this.options.maxInstanceCount,
    )

    const dummy = new THREE.Object3D()
    let count = 0
    for (let i = 0; i < this.options.maxInstanceCount; i++) {
      const r = 2 + Math.random() * 50
      const theta = Math.random() * 2.0 * Math.PI
      const p = new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta))
      const n = 0.5 + 0.5 * simplex2d(new THREE.Vector2(p.x / this.options.scale, p.z / this.options.scale))
      if (n > this.options.patchiness && Math.random() + 0.6 > this.options.patchiness) continue

      dummy.position.copy(p)
      dummy.rotation.set(0, 2 * Math.PI * Math.random(), 0)
      dummy.scale.set(
        this.options.sizeVariation.x * Math.random() + this.options.size.x,
        this.options.sizeVariation.y * Math.random() + this.options.size.y,
        this.options.sizeVariation.z * Math.random() + this.options.size.z,
      )
      dummy.updateMatrix()

      const color = new THREE.Color(0.25 + Math.random() * 0.1, 0.3 + Math.random() * 0.3, 0.1)
      this.grassMesh.setMatrixAt(count, dummy.matrix)
      this.grassMesh.setColorAt(count, color)
      count++
    }

    this.grassMesh.count = Math.min(count, this.options.instanceCount)
    this.grassMesh.receiveShadow = true
    this.grassMesh.castShadow = true
    this.grassMesh.instanceMatrix.needsUpdate = true
    if (this.grassMesh.instanceColor) this.grassMesh.instanceColor.needsUpdate = true
    this.add(this.grassMesh)
  }

  private generateFlowers(flowerTemplate: THREE.Object3D) {
    for (let i = 0; i < this.options.flowerCount; i++) {
      const r = 3 + Math.random() * 35
      const theta = Math.random() * 2.0 * Math.PI
      const p = new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta))
      const n = 0.5 + 0.5 * simplex2d(new THREE.Vector2(p.x / this.options.scale, p.z / this.options.scale))
      if (n > this.options.patchiness && Math.random() + 0.8 > this.options.patchiness) continue

      const flower = flowerTemplate.clone()
      flower.position.copy(p)
      flower.rotation.set(0, 2 * Math.PI * Math.random(), 0)
      const scale = 0.015 + 0.02 * Math.random()
      flower.scale.set(scale, scale, scale)
      flower.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.isMesh && mesh.material) {
          appendWindShader(mesh.material as THREE.Material, false)
        }
      })
      this.flowers.add(flower)
    }
  }
}

// ---------- Rocks ----------
export interface RockOptions {
  count?: number
  spread?: number
  size?: THREE.Vector3
  sizeVariation?: THREE.Vector3
}

let rockAssetsLoaded = false
let rock1Mesh: THREE.Mesh | null = null
let rock2Mesh: THREE.Mesh | null = null
let rock3Mesh: THREE.Mesh | null = null

async function loadRockAssets() {
  if (rockAssetsLoaded) return
  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
  gltfLoader.setDRACOLoader(dracoLoader)

  rock1Mesh = (await gltfLoader.loadAsync(`${ASSET_BASE}/rock1.glb`)).scene.children[0] as THREE.Mesh
  rock2Mesh = (await gltfLoader.loadAsync(`${ASSET_BASE}/rock2.glb`)).scene.children[0] as THREE.Mesh
  rock3Mesh = (await gltfLoader.loadAsync(`${ASSET_BASE}/rock3.glb`)).scene.children[0] as THREE.Mesh

  rockAssetsLoaded = true
}

export class EzRocks extends THREE.Group {
  options: Required<RockOptions>

  constructor(options: RockOptions = {}) {
    super()
    this.name = 'EzRocks'
    this.options = {
      count: options.count ?? 12,
      spread: options.spread ?? 40,
      size: options.size ?? new THREE.Vector3(0.4, 0.4, 0.4),
      sizeVariation: options.sizeVariation ?? new THREE.Vector3(0.6, 0.6, 0.6),
    }

    loadRockAssets().then(() => {
      this.add(this.generateInstances(rock1Mesh!))
      this.add(this.generateInstances(rock2Mesh!))
      this.add(this.generateInstances(rock3Mesh!))
    })
  }

  private generateInstances(mesh: THREE.Mesh): THREE.InstancedMesh {
    const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material as THREE.Material, this.options.count * 3)
    const dummy = new THREE.Object3D()
    let count = 0
    for (let i = 0; i < this.options.count; i++) {
      const p = new THREE.Vector3(
        2 * (Math.random() - 0.5) * this.options.spread,
        0.05,
        2 * (Math.random() - 0.5) * this.options.spread,
      )
      dummy.position.copy(p)
      dummy.rotation.set(0, 2 * Math.PI * Math.random(), 0)
      dummy.scale.set(
        this.options.sizeVariation.x * Math.random() + this.options.size.x,
        this.options.sizeVariation.y * Math.random() + this.options.size.y,
        this.options.sizeVariation.z * Math.random() + this.options.size.z,
      )
      dummy.updateMatrix()
      instancedMesh.setMatrixAt(count, dummy.matrix)
      count++
    }
    instancedMesh.count = count
    instancedMesh.instanceMatrix.needsUpdate = true
    instancedMesh.castShadow = true
    instancedMesh.receiveShadow = true
    return instancedMesh
  }
}

// ---------- Clouds ----------
export class EzClouds extends THREE.Mesh {
  constructor() {
    super()
    this.name = 'EzClouds'
    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.9,
      fog: true,
      side: THREE.DoubleSide,
    })

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0.0 }
      shader.vertexShader = `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        ${shader.vertexShader}
      `
      shader.fragmentShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        ${shader.fragmentShader}
      `
      shader.vertexShader = shader.vertexShader.replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>\n  vUv = uv;\n  vWorldPosition = worldPosition.xyz;`,
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        vec3 permute(vec3 x) {
          return mod(((x * 34.0) + 1.0) * x, 289.0);
        }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        void main() {`,
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        float n = snoise(vUv * 5.0 + uTime / 40.0) + snoise(vUv * 10.0 + uTime / 30.0);
        float cloud = smoothstep(0.2, 0.8, 0.5 * n + 0.4);
        diffuseColor = vec4(1.0, 1.0, 1.0, cloud * opacity / (0.01 * length(vWorldPosition)));
        `,
      )
      const material = this.material as THREE.MeshBasicMaterial
      material.userData.shader = shader
    }

    this.geometry = new THREE.PlaneGeometry(600, 600)
  }

  update(elapsedTime: number) {
    const material = this.material as THREE.MeshBasicMaterial
    const shader = material.userData?.shader
    if (shader) shader.uniforms.uTime.value = elapsedTime
  }
}

// ---------- Environment ----------
export interface EnvironmentOptions {
  skybox?: SkyboxOptions
  ground?: GroundOptions
  grass?: GrassOptions
  rocks?: RockOptions
  fogColor?: THREE.Color
  fogDensity?: number
  enableClouds?: boolean
}

export class EzTreeEnvironment extends THREE.Group {
  skybox: EzSkybox
  ground: EzGround
  grass: EzGrass
  rocks: EzRocks
  clouds?: EzClouds

  constructor(options: EnvironmentOptions = {}) {
    super()
    this.name = 'EzTreeEnvironment'

    this.skybox = new EzSkybox(options.skybox)
    this.add(this.skybox)

    this.ground = new EzGround(options.ground)
    this.add(this.ground)

    this.grass = new EzGrass(options.grass)
    this.add(this.grass)

    this.rocks = new EzRocks(options.rocks)
    this.add(this.rocks)

    if (options.enableClouds !== false) {
      this.clouds = new EzClouds()
      this.clouds.position.set(0, 80, 0)
      this.clouds.rotation.x = Math.PI / 2
      this.add(this.clouds)
    }
  }

  update(elapsedTime: number) {
    this.grass.update(elapsedTime)
    this.clouds?.update(elapsedTime)
  }
}

export async function preloadEzTreeAssets(): Promise<void> {
  await Promise.all([
    loadGroundTextures(),
    loadGrassAssets(),
    loadRockAssets(),
  ])
}

export function applyEzTreeAtmosphere(
  scene: THREE.Scene,
  options: EnvironmentOptions = {},
): EzTreeEnvironment {
  const env = new EzTreeEnvironment(options)
  scene.add(env)

  const fogColor = options.fogColor ?? new THREE.Color(0x94b9f8)
  scene.fog = new THREE.FogExp2(fogColor, options.fogDensity ?? 0.018)

  return env
}
