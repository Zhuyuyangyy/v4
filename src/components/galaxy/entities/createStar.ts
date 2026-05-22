import * as THREE from 'three'
import type { StarEntity } from '../galaxy.types'

export function createStar(totalProgress = 0): StarEntity {
  // Main sphere
  const geo = new THREE.SphereGeometry(1.0, 48, 48)
  const mat = new THREE.MeshStandardMaterial({
    color: '#00d4ff',
    emissive: '#004466',
    emissiveIntensity: 0.6,
    roughness: 0.4,
    metalness: 0.1,
  })
  const mesh = new THREE.Mesh(geo, mat)

  // Outer glow layer
  const glowGeo = new THREE.SphereGeometry(1.15, 48, 48)
  const glowMat = new THREE.MeshBasicMaterial({
    color: '#00d4ff',
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  })
  const glowMesh = new THREE.Mesh(glowGeo, glowMat)

  // Progress ring (horizontal torus around star)
  const ringRadius = 1.3
  const ringSegments = 64
  const ringGeo = new THREE.TorusGeometry(ringRadius, 0.02, 8, ringSegments)
  const ringMat = new THREE.MeshBasicMaterial({
    color: '#00d4ff',
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = Math.PI / 2 // horizontal

  // Set initial progress draw range
  const visibleSegments = Math.floor(ringSegments * totalProgress / 100)
  ringGeo.setDrawRange(0, visibleSegments * 6) // 6 indices per segment in torus

  mesh.add(glowMesh)
  mesh.add(ring)

  function updateRing(progress: number) {
    const segs = Math.floor(ringSegments * Math.min(progress, 100) / 100)
    ringGeo.setDrawRange(0, segs * 6)
  }

  return {
    mesh,
    glowMesh,
    update(dt: number, progress?: number) {
      mesh.rotation.y += dt * 0.2
      if (progress !== undefined) {
        updateRing(progress)
      }
    },
    dispose() {
      geo.dispose()
      mat.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
    },
  }
}
