<script setup lang="ts">
import { ref } from 'vue'

interface GraphNode {
  id: string
  label: string
  type: 'profile' | 'weakness' | 'resource' | 'task' | 'feedback'
  color: string
  x: number
  y: number
}

interface GraphEdge {
  from: string
  to: string
}

const nodes = ref<GraphNode[]>([
  { id: 'profile', label: '画像标签：图结构理解薄弱', type: 'profile', color: '#7c3aed', x: 50, y: 10 },
  { id: 'weak-1', label: '节点关系', type: 'weakness', color: '#f43f5e', x: 20, y: 30 },
  { id: 'weak-2', label: '边关系', type: 'weakness', color: '#f43f5e', x: 50, y: 30 },
  { id: 'weak-3', label: '层级结构', type: 'weakness', color: '#f43f5e', x: 80, y: 30 },
  { id: 'res-1', label: '图结构思维导图', type: 'resource', color: '#00d4ff', x: 20, y: 52 },
  { id: 'res-2', label: '图论基础文档', type: 'resource', color: '#00d4ff', x: 50, y: 52 },
  { id: 'res-3', label: '层级遍历视频', type: 'resource', color: '#00d4ff', x: 80, y: 52 },
  { id: 'task-1', label: '专项练习 3 题', type: 'task', color: '#06d6a0', x: 30, y: 74 },
  { id: 'task-2', label: '综合练习 5 题', type: 'task', color: '#06d6a0', x: 70, y: 74 },
  { id: 'feedback', label: '掌握度 42% → 68%', type: 'feedback', color: '#f59e0b', x: 50, y: 94 },
])

const edges = ref<GraphEdge[]>([
  { from: 'profile', to: 'weak-1' },
  { from: 'profile', to: 'weak-2' },
  { from: 'profile', to: 'weak-3' },
  { from: 'weak-1', to: 'res-1' },
  { from: 'weak-2', to: 'res-2' },
  { from: 'weak-3', to: 'res-3' },
  { from: 'res-1', to: 'task-1' },
  { from: 'res-2', to: 'task-1' },
  { from: 'res-2', to: 'task-2' },
  { from: 'res-3', to: 'task-2' },
  { from: 'task-1', to: 'feedback' },
  { from: 'task-2', to: 'feedback' },
])

const hoveredNode = ref<string | null>(null)

function onNodeHover(id: string | null) {
  hoveredNode.value = id
}

function isEdgeHighlighted(edge: GraphEdge) {
  if (!hoveredNode.value) return false
  return edge.from === hoveredNode.value || edge.to === hoveredNode.value
}

function isNodeHighlighted(node: GraphNode) {
  if (!hoveredNode.value) return true
  if (node.id === hoveredNode.value) return true
  return edges.value.some(
    e => (e.from === hoveredNode.value && e.to === node.id) ||
         (e.to === hoveredNode.value && e.from === node.id)
  )
}

const typeLabels: Record<GraphNode['type'], string> = {
  profile: '画像标签',
  weakness: '薄弱知识点',
  resource: '推荐资源',
  task: '练习任务',
  feedback: '评估反馈',
}
</script>

<template>
  <div class="graph-view">
    <div class="graph-banner">
      <span class="graph-banner-dot"></span>
      <span>资源不是静态列表，而是由画像、路径和评估结果共同驱动生成的资源网络。</span>
    </div>

    <div class="graph-canvas">
      <!-- Subtle grid -->
      <div class="graph-grid"></div>

      <svg class="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(0,212,255,0.2)" />
            <stop offset="100%" stop-color="rgba(124,58,237,0.2)" />
          </linearGradient>
          <linearGradient id="edge-grad-hl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(0,212,255,0.7)" />
            <stop offset="100%" stop-color="rgba(124,58,237,0.7)" />
          </linearGradient>
          <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <line
          v-for="edge in edges"
          :key="edge.from + '-' + edge.to"
          :x1="nodes.find(n => n.id === edge.from)!.x"
          :y1="nodes.find(n => n.id === edge.from)!.y"
          :x2="nodes.find(n => n.id === edge.to)!.x"
          :y2="nodes.find(n => n.id === edge.to)!.y"
          :class="['graph-line', { highlighted: isEdgeHighlighted(edge) }]"
          stroke="url(#edge-grad)"
          stroke-width="0.3"
        />
      </svg>

      <div
        v-for="node in nodes"
        :key="node.id"
        :class="['graph-node', `graph-node--${node.type}`, { dimmed: hoveredNode && !isNodeHighlighted(node) }]"
        :style="{ left: node.x + '%', top: node.y + '%', '--node-color': node.color }"
        @mouseenter="onNodeHover(node.id)"
        @mouseleave="onNodeHover(null)"
      >
        <div class="node-halo"></div>
        <div class="node-dot" />
        <div class="node-label">
          <span class="node-type-badge">{{ typeLabels[node.type] }}</span>
          <span class="node-text">{{ node.label }}</span>
        </div>
      </div>
    </div>

    <div class="graph-legend">
      <div v-for="(label, key) in typeLabels" :key="key" class="legend-item">
        <span class="legend-dot" :style="{ background: key === 'profile' ? '#7c3aed' : key === 'weakness' ? '#f43f5e' : key === 'resource' ? '#00d4ff' : key === 'task' ? '#06d6a0' : '#f59e0b', boxShadow: `0 0 8px ${key === 'profile' ? '#7c3aed' : key === 'weakness' ? '#f43f5e' : key === 'resource' ? '#00d4ff' : key === 'task' ? '#06d6a0' : '#f59e0b'}44` }" />
        <span class="legend-label">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gv-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.graph-view {
  padding: 0 40px 40px;
  animation: gv-float-up 0.5s ease both;
}

.graph-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 28px;
  font-size: 13px;
  color: #8892b0;
  line-height: 1.6;
}

.graph-banner-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 10px #00d4ff66;
  flex-shrink: 0;
}

.graph-canvas {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 18px;
  background: rgba(7, 7, 13, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  margin-bottom: 20px;
}

.graph-grid {
  position: absolute; inset: 0;
  opacity: 0.25; pointer-events: none;
  background-image: linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.graph-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.graph-line {
  transition: all 0.3s ease;
  opacity: 0.4;
}

.graph-line.highlighted {
  opacity: 1;
  stroke: url(#edge-grad-hl);
  stroke-width: 0.5;
}

.graph-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.graph-node.dimmed {
  opacity: 0.2;
}

.graph-node:hover {
  transform: translate(-50%, -50%) scale(1.08);
  z-index: 3;
}

.node-halo {
  position: absolute;
  top: -4px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--node-color);
  opacity: 0.15;
  filter: blur(6px);
  transition: all 0.3s ease;
}

.graph-node:hover .node-halo {
  opacity: 0.3;
  transform: scale(1.4);
}

.node-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--node-color);
  box-shadow: 0 0 14px color-mix(in srgb, var(--node-color) 40%, transparent);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.graph-node:hover .node-dot {
  box-shadow: 0 0 28px color-mix(in srgb, var(--node-color) 55%, transparent);
  transform: scale(1.15);
}

.node-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(12, 12, 30, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.graph-node:hover .node-label {
  border-color: color-mix(in srgb, var(--node-color) 35%, transparent);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3), 0 0 16px color-mix(in srgb, var(--node-color) 10%, transparent);
}

.node-type-badge {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  font-family: var(--font-mono);
  padding: 2px 8px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--node-color) 10%, transparent);
  color: var(--node-color);
}

.node-text {
  font-size: 12.5px;
  color: #e8edf5;
  font-weight: 500;
}

.graph-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 16px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 10px;
  background: rgba(12, 12, 30, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  font-size: 11px;
  color: #8892b0;
  font-weight: 500;
}

@media (max-width: 900px) {
  .graph-view { padding: 0 20px 32px; }
  .graph-canvas { height: 400px; }
  .node-label { padding: 6px 10px; }
  .node-text { font-size: 10px; }
}
</style>
