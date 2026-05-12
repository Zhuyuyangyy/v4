import * as THREE from 'three'
import type { GalaxyPhase, OrbitRingEntity } from '../galaxy.types'

export function createOrbitRings(
  phases: GalaxyPhase[],
  minRadius = 3,
  maxRadius = 7.5,
): OrbitRingEntity[] {
  const n = phases.length
  if (n === 0) return []

  const segments = 64

  return phases.map((phase, i) => {
    const radius = n === 1
      ? (minRadius + maxRadius) / 2
      : minRadius + (maxRadius - minRadius) * i / (n - 1)

    // Full circle vertices in XZ plane
    const positions: number[] = []
    for (let j = 0; j < segments; j++) {
      const angle = (j / segments) * Math.PI * 2
      positions.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    }
    // Close the loop
    positions.push(positions[0], positions[1], positions[2])

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    const mat = new THREE.LineBasicMaterial({
      color: phase.color,
      transparent: true,
      opacity: statusOpacity(phase.status),
      depthWrite: false,
    })

    const line = new THREE.Line(geo, mat)

    // Initial draw range based on progress
    const visibleSegs = Math.floor(segments * phase.progress / 100)
    geo.setDrawRange(0, visibleSegs + 1) // +1 to close

    return {
      line,
      radius,
      update(progress: number, status: string) {
        const segs = Math.floor(segments * Math.min(progress, 100) / 100)
        geo.setDrawRange(0, segs + 1)
        mat.opacity = statusOpacity(status)
      },
      dispose() {
        geo.dispose()
        mat.dispose()
      },
    }
  })
}

function statusOpacity(status: string): number {
  switch (status) {
    case 'completed': return 0.5
    case 'active': return 0.3
    case 'locked': default: return 0.15
  }
}
