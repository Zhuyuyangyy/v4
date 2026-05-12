import type * as THREE from 'three'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// ─── entities 返回值类型 ───

export interface StarEntity {
  mesh: THREE.Mesh
  glowMesh: THREE.Mesh
  update: (dt: number, progress?: number) => void
  dispose: () => void
}

export interface PlanetEntity {
  mesh: THREE.Mesh
  satelliteGroup?: THREE.Group
  orbitAngle: number
  radius: number
  speed: number
  data: GalaxyPhase
  update: (dt: number, activePhaseId?: string | null) => void
  setHighlight: (active: boolean) => void
  dispose: () => void
}

export interface OrbitRingEntity {
  line: THREE.Line
  radius: number
  update: (progress: number, status: string) => void
  dispose: () => void
}

export interface SatelliteEntity {
  points: THREE.Points
  update: (planetPos: THREE.Vector3, dt: number) => void
  dispose: () => void
}

export interface ParticleSystemEntity {
  points: THREE.Points
  update: (dt: number, time: number) => void
  dispose: () => void
}

// ─── 星系数据映射类型 ───

export interface GalaxyNode {
  id: string
  name: string
  progress: number
  status: 'completed' | 'active' | 'available' | 'locked'
}

export interface GalaxyPhase {
  id: string
  title: string
  period: string
  progress: number
  status: 'completed' | 'active' | 'locked'
  color: string
  nodes: GalaxyNode[]
}

export interface GalaxyDomain {
  id: string
  name: string
  phases: GalaxyPhase[]
  color: string
}

export interface GalaxySceneData {
  domains: GalaxyDomain[]
  totalProgress: number
}

// ─── 实体集合 ───

export interface GalaxyEntities {
  star: StarEntity | null
  planets: PlanetEntity[]
  orbitRings: OrbitRingEntity[]
  satellites: SatelliteEntity[]
  particles: ParticleSystemEntity | null
  css2dRenderer: CSS2DRenderer | null
}
