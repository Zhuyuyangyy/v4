import type { GalaxyPhase, GalaxyNode, GalaxySceneData, GalaxyDomain } from '../galaxy.types'

interface RawPhase {
  title: string
  period: string
  progress: number
  status: 'completed' | 'active' | 'locked'
  color: string
  nodes: RawNode[]
}

interface RawNode {
  name: string
  progress: number
  topicId?: string
}

function slugify(text: string): string {
  return text
    .replace(/[^\w一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function mapNodeStatus(nodeProgress: number, phaseStatus: string): GalaxyNode['status'] {
  if (nodeProgress >= 100) return 'completed'
  if (phaseStatus === 'locked') return 'locked'
  if (nodeProgress > 0) return 'active'
  return 'available'
}

export function phasesToGalaxyData(rawPhases: RawPhase[]): GalaxySceneData {
  const phases: GalaxyPhase[] = rawPhases.map((p) => ({
    id: slugify(p.title),
    title: p.title,
    period: p.period,
    progress: p.progress,
    status: p.status,
    color: p.color,
    nodes: p.nodes.map((n): GalaxyNode => ({
      id: slugify(n.name),
      name: n.name,
      progress: n.progress,
      status: mapNodeStatus(n.progress, p.status),
    })),
  }))

  const domain: GalaxyDomain = {
    id: 'ai',
    name: 'AI',
    phases,
    color: '#00d4ff',
  }

  const totalProgress = phases.length > 0
    ? phases.reduce((sum, p) => sum + p.progress, 0) / phases.length
    : 0

  return {
    domains: [domain],
    totalProgress: Math.round(totalProgress),
  }
}
