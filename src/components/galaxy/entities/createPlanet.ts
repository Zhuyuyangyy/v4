import * as THREE from 'three'
import type { GalaxyPhase, PlanetEntity } from '../galaxy.types'

export function createPlanets(
  phases: GalaxyPhase[],
  orbitRadii: number[],
): PlanetEntity[] {
  const n = phases.length
  if (n === 0) return []

  return phases.map((phase, i) => {
    const radius = orbitRadii[i] ?? 3 + (7.5 - 3) * i / Math.max(n - 1, 1)
    const nodeCount = phase.nodes.length
    const size = 0.25 + (nodeCount / 13) * 0.15 // 0.25–0.4 based on node count

    const geo = new THREE.SphereGeometry(size, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: phase.color,
      emissive: phase.color,
      emissiveIntensity: (phase.progress / 100) * 0.5,
      roughness: 0.5,
      metalness: 0.2,
    })

    // Locked state visual
    if (phase.status === 'locked') {
      mat.transparent = true
      mat.opacity = 0.35
    }

    const mesh = new THREE.Mesh(geo, mat)
    if (phase.status === 'locked') {
      mesh.scale.setScalar(0.7)
    }

    let orbitAngle = (i * 2 * Math.PI) / n
    const speed = 0.3 / radius

    // Position on orbit
    mesh.position.set(
      Math.cos(orbitAngle) * radius,
      0,
      Math.sin(orbitAngle) * radius,
    )

    return {
      mesh,
      orbitAngle,
      radius,
      speed,
      data: phase,
      update(dt: number, activePhaseId?: string | null) {
        if (phase.status === 'locked') return

        // Orbit
        orbitAngle += dt * speed
        mesh.position.x = Math.cos(orbitAngle) * radius
        mesh.position.z = Math.sin(orbitAngle) * radius

        // Self-rotation
        mesh.rotation.y += dt * speed * 2
        mesh.rotation.x += dt * speed * 0.3
      },
      setHighlight(active: boolean) {
        if (active) {
          mat.emissiveIntensity = Math.min((phase.progress / 100) * 0.5 * 2, 1.0)
        } else {
          mat.emissiveIntensity = (phase.progress / 100) * 0.5
        }
      },
      dispose() {
        geo.dispose()
        mat.dispose()
      },
    }
  })
}
