import * as THREE from 'three'
import { ObsidianEdge } from './ObsidianEdge'
import type { KnowledgeNode } from '../types'
import { categoryColors } from '../data/knowledge-graph'

/**
 * Minimal Obsidian-style graph edge manager.
 * Clean straight lines between related nodes, colored by category.
 */
export class ObsidianGraph {
  public group: THREE.Group
  private _edges: Map<string, ObsidianEdge> = new Map()
  private _adjacency: Map<string, Set<string>> = new Map()
  private _nodeMap: Map<string, KnowledgeNode> = new Map()
  private _colorMap: Map<string, THREE.Color> = new Map()

  constructor() {
    this.group = new THREE.Group()
    this.group.renderOrder = 1
    for (const [id, hex] of Object.entries(categoryColors)) {
      this._colorMap.set(id, new THREE.Color(hex))
    }
  }

  build(nodes: KnowledgeNode[]) {
    this.clear()
    for (const n of nodes) this._nodeMap.set(n.id, n)

    const drawn = new Set<string>()

    for (const node of nodes) {
      for (const nextId of node.next) {
        const target = this._nodeMap.get(nextId)
        if (!target) continue
        const key = [node.id, nextId].sort().join('::')
        if (drawn.has(key)) continue
        drawn.add(key)
        this._createEdge(node, target)
      }
      for (const preId of node.prerequisites) {
        const source = this._nodeMap.get(preId)
        if (!source) continue
        const key = [node.id, preId].sort().join('::')
        if (drawn.has(key)) continue
        drawn.add(key)
        this._createEdge(source, node)
      }
    }
  }

  private _getColor(node: KnowledgeNode): THREE.Color {
    return this._colorMap.get(node.system) ?? new THREE.Color(0x666666)
  }

  private _createEdge(a: KnowledgeNode, b: KnowledgeNode) {
    const startPos = new THREE.Vector3(...a.position)
    const endPos = new THREE.Vector3(...b.position)
    const color = this._getColor(a).clone()

    const edge = new ObsidianEdge(a.id, b.id, startPos, endPos, color)
    const edgeId = `${a.id}->${b.id}`
    this._edges.set(edgeId, edge)
    this._addAdjacency(a.id, edgeId)
    this._addAdjacency(b.id, edgeId)
    this.group.add(edge.line)
  }

  // ── Animation ──

  update(time: number) {
    for (const edge of this._edges.values()) {
      edge.update(time)
    }
  }

  // ── Interaction ──

  onNodeHover(nodeId: string | null) {
    if (!nodeId) {
      for (const e of this._edges.values()) { e.setHighlight(false); e.setDim(false) }
      return
    }
    const connected = this._adjacency.get(nodeId)
    for (const [edgeId, edge] of this._edges) {
      if (connected?.has(edgeId)) {
        edge.setHighlight(true)
      } else {
        edge.setDim(true)
      }
    }
  }

  getConnectedNodeIds(nodeId: string): string[] {
    const connected = this._adjacency.get(nodeId)
    if (!connected) return []
    const result = new Set<string>()
    for (const edgeId of connected) {
      const edge = this._edges.get(edgeId)
      if (!edge) continue
      if (edge.fromId !== nodeId) result.add(edge.fromId)
      if (edge.toId !== nodeId) result.add(edge.toId)
    }
    return Array.from(result)
  }

  private _addAdjacency(nodeId: string, edgeId: string) {
    if (!this._adjacency.has(nodeId)) this._adjacency.set(nodeId, new Set())
    this._adjacency.get(nodeId)!.add(edgeId)
  }

  clear() {
    for (const e of this._edges.values()) e.dispose()
    this._edges.clear()
    this._adjacency.clear()
  }

  dispose() {
    this.clear()
    this._nodeMap.clear()
  }
}
