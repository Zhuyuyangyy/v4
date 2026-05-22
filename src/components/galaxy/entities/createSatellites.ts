import * as THREE from 'three'
import type { GalaxyPhase, SatelliteEntity } from '../galaxy.types'

export function createSatellites(phases: GalaxyPhase[]): SatelliteEntity[] {
  return phases.map((phase) => {
    const nodes = phase.nodes
    const count = nodes.length
    if (count === 0) {
      return {
        points: new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ visible: false })),
        update() {},
        dispose() {},
      }
    }

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const basePhases = new Float32Array(count)
    const orbitRadii = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const nodeStatus = nodes[i].progress === 100 ? 'completed'
        : nodes[i].progress > 0 ? 'active'
        : 'locked'

      // Random point on sphere around planet center
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.5 + Math.random() * 0.3

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      basePhases[i] = Math.random() * Math.PI * 2
      orbitRadii[i] = r

      // Color by status
      const [cr, cg, cb] = nodeColor(nodeStatus)
      colors[i * 3] = cr
      colors[i * 3 + 1] = cg
      colors[i * 3 + 2] = cb
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)

    return {
      points,
      update(planetPos: THREE.Vector3, dt: number) {
        // Orbit satellites around the planet
        const posArr = geo.attributes.position.array as Float32Array
        for (let i = 0; i < count; i++) {
          basePhases[i] += dt * (0.5 + i * 0.1)
          const a = basePhases[i]
          const r = orbitRadii[i]
          posArr[i * 3] = planetPos.x + Math.cos(a) * r
          posArr[i * 3 + 1] = planetPos.y + Math.sin(a * 1.3) * r * 0.6
          posArr[i * 3 + 2] = planetPos.z + Math.sin(a) * r
        }
        geo.attributes.position.needsUpdate = true
      },
      dispose() {
        geo.dispose()
        mat.dispose()
      },
    }
  })
}

function nodeColor(status: string): [number, number, number] {
  switch (status) {
    case 'completed': return [1.0, 1.0, 1.0]   // bright white
    case 'active': return [0.5, 0.7, 1.0]      // cool blue
    case 'locked': default: return [0.15, 0.15, 0.2] // dim
  }
}
