export type NodeType = 'knowledge' | 'project' | 'exercise'

export interface KnowledgeNode {
  id: string
  name: string
  nameEn: string
  type: NodeType
  difficulty: number // 0–1
  mastery: number // 0–1
  galaxy: string
  system: string
  prerequisites: string[]
  next: string[]
  position: [number, number, number]
  description: string
}

export interface GalaxyCluster {
  id: string
  name: string
  nameEn: string
  color: string
  position: [number, number, number]
  systems: StarSystemInfo[]
}

export interface StarSystemInfo {
  id: string
  name: string
  galaxyId: string
}

export interface PathEdge {
  from: string
  to: string
}

export interface AgentRecommendation {
  nodeId: string
  node: KnowledgeNode
  pathLength: number
  reason: string
}

export type ZoomLevel = 'universe' | 'galaxy' | 'system' | 'planet'
