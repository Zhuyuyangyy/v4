import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { Galaxy, Course } from '../types'
import { useUniverseStore } from '../stores/universeStore'
import { useSpiralLayout } from './useSpiralLayout'

const DIFFICULTY_INTERMEDIATE = '\u8fdb\u9636'
const DIFFICULTY_ADVANCED = '\u9ad8\u7ea7'

const PLANET_TEXTURES = [
  '/planet/planet_cyan.png',
  '/planet/planet_emerald.png',
  '/planet/planet_amber.png',
  '/planet/planet_purple.png',
]

function createPlanetLabel(name: string, yOffset: number): CSS2DObject {
  const div = document.createElement('div')
  div.textContent = name
  div.style.color = '#ffffff'
  div.style.fontSize = '14px'
  div.style.fontWeight = 'bold'
  div.style.textShadow = '0 0 10px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.8)'
  div.style.whiteSpace = 'nowrap'
  div.style.pointerEvents = 'none'
  div.style.userSelect = 'none'
  div.style.background = 'rgba(0,0,0,0.4)'
  div.style.padding = '2px 8px'
  div.style.borderRadius = '4px'
  const label = new CSS2DObject(div)
  label.position.set(0, yOffset, 0)
  label.name = 'planet-label'
  return label
}

export function usePlanetLoader(parentGroup: THREE.Group) {
  const textureLoader = new THREE.TextureLoader()
  const textureCache = new Map<string, THREE.Texture>()
  const planetMeshes = new Map<number, THREE.Object3D>()

  function loadTexture(path: string) {
    const cached = textureCache.get(path)
    if (cached) return cached

    const texture = textureLoader.load(path)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    textureCache.set(path, texture)
    return texture
  }

  function getCourseRadius(course?: Course) {
    if (course?.difficulty === DIFFICULTY_ADVANCED) return 2.5
    if (course?.difficulty === DIFFICULTY_INTERMEDIATE) return 2.0
    return 1.6
  }

  function createProceduralPlanet(
    course: Course | undefined,
    galaxy: Galaxy | undefined,
    courseId: number,
    textureIndex: number,
  ) {
    const group = new THREE.Group()
    group.userData.courseId = courseId
    group.name = `planet-${courseId}`

    const radius = getCourseRadius(course) + (Math.random() - 0.5) * 0.25
    const baseColor = new THREE.Color(course?.themeColor || galaxy?.color || '#4488aa')

    const material = new THREE.MeshStandardMaterial({
      map: loadTexture(PLANET_TEXTURES[textureIndex % PLANET_TEXTURES.length]),
      color: baseColor,
      roughness: 0.52,
      metalness: 0.18,
      emissive: baseColor.clone().multiplyScalar(0.12),
      emissiveIntensity: 0.35,
    })
    const planet = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), material)
    planet.castShadow = true
    planet.receiveShadow = true
    planet.userData.courseId = courseId
    planet.name = `planet-core-${courseId}`
    group.add(planet)

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const glow = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.08, 48, 48), glowMaterial)
    glow.userData.courseId = courseId
    glow.name = `planet-glow-${courseId}`
    group.add(glow)

    if (courseId % 3 === 0) {
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: loadTexture('/planet/ring_glow.png'),
        color: baseColor,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 1.35, radius * 1.85, 96), ringMaterial)
      ring.rotation.x = Math.PI / 2.7
      ring.rotation.z = Math.PI / 7
      ring.userData.courseId = courseId
      ring.name = `planet-ring-${courseId}`
      group.add(ring)
    }

    if (course) {
      group.add(createPlanetLabel(course.name, radius + 0.7))
    }

    return group
  }

  async function loadAllPlanets(
    galaxies: Galaxy[],
    courses: Course[],
    onProgress: (pct: number) => void,
  ): Promise<Map<number, THREE.Object3D>> {
    const store = useUniverseStore()
    const spiral = useSpiralLayout(galaxies)
    const planetLayouts = spiral.computePlanetPositions()

    planetMeshes.clear()

    for (let index = 0; index < planetLayouts.length; index++) {
      const layout = planetLayouts[index]
      const galaxy = galaxies.find(g => g.id === layout.galaxyId)
      const course = courses.find((c) => c.id === layout.courseId)
      const model = createProceduralPlanet(course, galaxy, layout.courseId, index)
      model.position.copy(layout.position)

      applyPlanetState(model, store.getPlanetState(layout.courseId))

      parentGroup.add(model)
      planetMeshes.set(layout.courseId, model)
      onProgress(((index + 1) / planetLayouts.length) * 100)
    }

    return planetMeshes
  }

  function applyPlanetState(model: THREE.Object3D, state: string) {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        const mat = child.material

        if (child.geometry && !child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals()
        }
        mat.flatShading = false

        const textures = [mat.map, mat.roughnessMap, mat.metalnessMap, mat.normalMap, mat.aoMap, mat.emissiveMap]
        const hasTextures = textures.some((tex) => tex !== null && tex !== undefined)
        textures.forEach((tex) => {
          if (tex) {
            tex.anisotropy = 16
            tex.minFilter = THREE.LinearMipmapLinearFilter
            tex.magFilter = THREE.LinearFilter
            tex.generateMipmaps = true
            tex.needsUpdate = true
          }
        })

        switch (state) {
          case 'locked':
            if (hasTextures) {
              mat.color.multiplyScalar(0.45)
              mat.emissive = new THREE.Color(0x111111)
              mat.emissiveIntensity = 0.1
            } else {
              mat.color.set('#445566')
              mat.emissive = new THREE.Color(0x111122)
              mat.emissiveIntensity = 0.15
            }
            mat.roughness = 0.65
            mat.metalness = 0.2
            break
          case 'available':
            if (!hasTextures) {
              mat.roughness = 0.4
              mat.metalness = 0.3
            } else {
              mat.roughness = 0.5
              mat.metalness = 0.2
            }
            mat.emissive = mat.color.clone().multiplyScalar(0.2)
            mat.emissiveIntensity = 0.4
            break
          case 'completed':
            if (!hasTextures) {
              mat.roughness = 0.35
              mat.metalness = 0.35
            } else {
              mat.roughness = 0.45
              mat.metalness = 0.25
            }
            mat.emissive = new THREE.Color(0x22aa44)
            mat.emissiveIntensity = 0.4
            break
        }
      }
    })
  }

  return { loadAllPlanets, planetMeshes }
}
