import * as THREE from 'three'
import type { ParticleSystemEntity } from '../galaxy.types'

export function createParticles(count = 3000): ParticleSystemEntity {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  // Per-particle animation state
  const initialY = new Float32Array(count)
  const phases = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 30
    const y = (Math.random() - 0.5) * 30
    const z = (Math.random() - 0.5) * 30

    const idx3 = i * 3
    positions[idx3] = x
    positions[idx3 + 1] = y
    positions[idx3 + 2] = z

    initialY[i] = y
    phases[i] = Math.random() * Math.PI * 2

    // Cyan / purple / blue gradient
    const t = Math.random()
    colors[idx3] = 0.0 + t * 0.3
    colors[idx3 + 1] = 0.3 + t * 0.5
    colors[idx3 + 2] = 0.6 + t * 0.4
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.45,
    sizeAttenuation: true,
  })

  const points = new THREE.Points(geometry, material)

  return {
    points,
    update(dt: number, time: number) {
      const posArr = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] = initialY[i] + Math.sin(time * 0.5 + phases[i]) * 0.3
      }
      geometry.attributes.position.needsUpdate = true
      points.rotation.y += dt * 0.02
    },
    dispose() {
      geometry.dispose()
      material.dispose()
    },
  }
}
