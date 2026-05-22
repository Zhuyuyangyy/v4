import { ref } from 'vue'
import type { KnowledgeNode, AgentRecommendation } from '../types'
import { knowledgeNodes } from '../data/knowledge-graph'

/**
 * AI Agent 核心逻辑
 *
 * 当前实现：
 *   - Dijkstra 最短路径算法作基础路径规划
 *   - 增强型推荐引擎：基于多维度评分（难度、掌握度、路径距离、前置依赖）生成个性化推荐
 *   - 推荐理由变化丰富（8种话术模板 + 节点关系感知）
 *
 * 未来可升级：
 *   - 替换 recommendNext() 中的评分逻辑为 LLM 调用
 *   - 传入用户学习历史给 LLM 做更深层的分析
 *   - 保持 getPathToNode() 作为路径规划不变
 */

export function useAgent() {
  const recommendedNode = ref<KnowledgeNode | null>(null)
  const currentPath = ref<KnowledgeNode[]>([])

  // ── Graph utilities ───────────────────────────────────

  function buildGraph(): Map<string, string[]> {
    const adj = new Map<string, string[]>()
    for (const node of knowledgeNodes) {
      adj.set(node.id, [...node.next])
    }
    return adj
  }

  /**
   * Dijkstra: shortest paths from start nodes
   */
  function dijkstra(startIds: string[]): Map<string, { dist: number; path: string[] }> {
    const adj = buildGraph()
    const result = new Map<string, { dist: number; path: string[] }>()
    const pq: [string, number, string[]][] = startIds.map(id => [id, 0, [id]])
    const visited = new Set<string>()

    while (pq.length > 0) {
      pq.sort((a, b) => a[1] - b[1])
      const [current, dist, path] = pq.shift()!
      if (visited.has(current)) continue
      visited.add(current)
      if (!result.has(current) || result.get(current)!.dist > dist) {
        result.set(current, { dist, path })
      }
      const neighbors = adj.get(current) || []
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          pq.push([neighbor, dist + 1, [...path, neighbor]])
        }
      }
    }
    return result
  }

  function findMasteredNodes(): KnowledgeNode[] {
    return knowledgeNodes.filter(n => n.mastery >= 0.7)
  }

  // ── Intelligence Layer ────────────────────────────────

  /**
   * Multi-factor scoring for recommendation quality.
   * Lower score = better recommendation.
   */
  function scoreNode(node: KnowledgeNode, pathDist: number): number {
    const diffScore = node.difficulty * 0.35       // Prefer easier nodes
    const distScore = Math.min(pathDist, 5) * 0.25  // Prefer closer nodes
    const masteryBonus = (1 - node.mastery) * 0.3   // Prefer low-mastery nodes
    // Random factor to add variety (0-5% influence)
    const variety = Math.random() * 0.05
    return diffScore + distScore + masteryBonus + variety
  }

  /**
   * Generate a natural-sounding recommendation reason with variety.
   */
  function generateReason(node: KnowledgeNode, path: KnowledgeNode[], masteredCount: number): string {
    const templates = [
      // Context-aware reasons
      () => {
        if (path.length > 1 && path[path.length - 2]) {
          const prev = path[path.length - 2]
          return `完成「${prev.name}」后，建议继续深入「${node.name}」，这是自然的学习路径`
        }
        return `「${node.name}」是当前最优的学习方向，难度适中，可以开始学习了`
      },
      () => {
        if (node.prerequisites.length > 0) {
          const prereqs = node.prerequisites.map(id => knowledgeNodes.find(n => n.id === id)?.name).filter(Boolean)
          return `前置知识「${prereqs.join('、')}」已掌握，现在可以学习「${node.name}」了`
        }
        return `「${node.name}」没有前置依赖，可以直接开始学习`
      },
      // Difficulty-aware
      () => {
        if (node.difficulty < 0.3) return `「${node.name}」难度较低，适合作为当前阶段的学习目标，快速建立信心`
        if (node.difficulty > 0.7) return `「${node.name}」难度较高，但你的知识储备已经足够，可以挑战一下`
        return `「${node.name}」难度适中，距离当前掌握的知识点很近，适合继续推进`
      },
      // Progress-aware
      () => {
        const galaxy = knowledgeNodes.filter(n => n.galaxy === node.galaxy)
        const galaxyMastered = galaxy.filter(n => n.mastery >= 0.7).length
        const galaxyTotal = galaxy.length
        if (galaxyTotal > 0) {
          const pct = Math.round(galaxyMastered / galaxyTotal * 100)
          if (pct < 30) return `在「${node.name}」所在星系的学习进度为 ${pct}%，继续推进这个星系的知识点`
          if (pct > 70) return `这个星系即将完成（${pct}%），学习「${node.name}」向新星系进发`
          return `当前星系进度 ${pct}%，「${node.name}」是接下来的好目标`
        }
        return `推荐学习「${node.name}」，拓展你的知识版图`
      },
      // Mastery-aware
      () => {
        if (node.mastery < 0.2) return `「${node.name}」掌握度较低（${Math.round(node.mastery * 100)}%），建议优先巩固这个知识点`
        return `「${node.name}」已有 ${Math.round(node.mastery * 100)}% 掌握度，再进一步就能完全掌握了`
      },
      // Type-aware
      () => {
        if (node.type === 'project') return `理论之后需要实践，「${node.name}」是一个实战项目，可以动手试试`
        if (node.type === 'exercise') return `「${node.name}」是一个练习，通过练习巩固已学知识`
        return `探索「${node.name}」，扩展你的知识体系`
      },
      // Path length aware
      () => {
        if (path.length <= 2) return `「${node.name}」距离你已掌握的知识只有 ${path.length - 1} 步，轻松可达`
        return `虽然「${node.name}」需要 ${path.length - 1} 步的学习路径，但每一步都有前置支撑`
      },
      // Emergent
      () => {
        const nextNodes = node.next.map(id => knowledgeNodes.find(n => n.id === id)?.name).filter(Boolean)
        if (nextNodes.length > 0) {
          return `掌握「${node.name}」后，可以继续学习 ${nextNodes.slice(0, 2).join('、')}${nextNodes.length > 2 ? ' 等' : ''}，学习路径很清晰`
        }
        return `「${node.name}」是一个终点知识点，掌握后可以考虑探索新的星系`
      },
    ]

    // Select template based on node properties for variety
    const idx = Math.floor(
      (node.difficulty * 7 + node.mastery * 3 + path.length * 2 + masteredCount) % templates.length
    )
    return templates[idx]()
  }

  // ── Public API ────────────────────────────────────────

  function recommendNext(): AgentRecommendation | null {
    const masteredIds = new Set(findMasteredNodes().map(n => n.id))
    const masteredArr = [...masteredIds]

    if (masteredArr.length === 0) {
      // No mastered nodes → recommend the easiest root node
      const roots = knowledgeNodes
        .filter(n => n.prerequisites.length === 0)
        .sort((a, b) => a.difficulty - b.difficulty)

      if (roots.length === 0) return null

      const target = roots[0]
      recommendedNode.value = target
      currentPath.value = [target]

      return {
        nodeId: target.id,
        node: target,
        pathLength: 1,
        reason: generateReason(target, [target], 0),
      }
    }

    // Dijkstra from all mastered nodes
    const paths = dijkstra(masteredArr)
    const candidates: { node: KnowledgeNode; dist: number; path: string[] }[] = []

    for (const node of knowledgeNodes) {
      if (node.mastery >= 0.7) continue
      const p = paths.get(node.id)
      if (!p || p.dist <= 0 || p.dist >= 15) continue

      // Check prerequisites met
      const prereqMet = node.prerequisites.every(pid => masteredIds.has(pid))
      if (prereqMet) {
        candidates.push({ node, dist: p.dist, path: p.path })
      }
    }

    // Fallback: include nodes even if prerequisites not fully met
    if (candidates.length === 0) {
      for (const node of knowledgeNodes) {
        if (node.mastery >= 0.7) continue
        const p = paths.get(node.id)
        if (p && p.dist > 0 && p.dist < 15) {
          candidates.push({ node, dist: p.dist, path: p.path })
        }
      }
    }

    if (candidates.length === 0) return null

    // Score and sort
    candidates.sort((a, b) => scoreNode(a.node, a.dist) - scoreNode(b.node, b.dist))

    const best = candidates[0]
    const pathNodes = best.path
      .map(id => knowledgeNodes.find(n => n.id === id)!)
      .filter(Boolean)

    recommendedNode.value = best.node
    currentPath.value = pathNodes

    return {
      nodeId: best.node.id,
      node: best.node,
      pathLength: best.dist,
      reason: generateReason(best.node, pathNodes, masteredArr.length),
    }
  }

  function getPathToNode(targetId: string): KnowledgeNode[] {
    const mastered = findMasteredNodes().map(n => n.id)
    if (mastered.length === 0) return []

    const allPaths = dijkstra(mastered)
    const found = allPaths.get(targetId)
    if (!found) return []

    return found.path
      .map(id => knowledgeNodes.find(n => n.id === id)!)
      .filter(Boolean)
  }

  function findUnlockedNodes(): KnowledgeNode[] {
    const mastered = new Set(findMasteredNodes().map(n => n.id))
    return knowledgeNodes.filter(n => {
      if (n.mastery >= 0.7) return false
      return n.prerequisites.every(p => mastered.has(p))
    })
  }

  return {
    recommendedNode,
    currentPath,
    recommendNext,
    getPathToNode,
    findMasteredNodes,
    findUnlockedNodes,
  }
}
