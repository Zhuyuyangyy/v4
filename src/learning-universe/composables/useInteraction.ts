import { ref } from 'vue'
import * as THREE from 'three'
import type { SceneState } from './useScene'
import type { GalaxyClusterNode } from '../three/GalaxyCluster'

export function useInteraction() {
  const hoveredNodeId = ref<string | null>(null)
  const raycaster = new THREE.Raycaster()
  raycaster.params.Points.threshold = 0.8

  function getIntersections(
    s: SceneState,
    mouseNDC: THREE.Vector2,
    galaxyClusters: GalaxyClusterNode[],
  ) {
    raycaster.setFromCamera(mouseNDC, s.camera)

    const meshes: THREE.Object3D[] = []
    for (const gc of galaxyClusters) {
      for (const star of gc.starNodes) {
        meshes.push(star.mesh)
      }
    }
    return raycaster.intersectObjects(meshes, false)
  }

  function raycast(
    s: SceneState,
    mouseNDC: THREE.Vector2,
    galaxyClusters: GalaxyClusterNode[],
  ): { nodeId: string; point: THREE.Vector3; mesh: THREE.Mesh } | null {
    const hits = getIntersections(s, mouseNDC, galaxyClusters)
    if (hits.length > 0) {
      const obj = hits[0].object as THREE.Mesh
      const nodeId = obj.userData?.nodeId as string | undefined
      if (nodeId) {
        return {
          nodeId,
          point: hits[0].point,
          mesh: obj,
        }
      }
    }
    return null
  }

  function toNDC(clientX: number, clientY: number): THREE.Vector2 {
    return new THREE.Vector2(
      (clientX / window.innerWidth) * 2 - 1,
      -(clientY / window.innerHeight) * 2 + 1,
    )
  }

  return {
    hoveredNodeId,
    raycaster,
    getIntersections,
    raycast,
    toNDC,
  }
}
