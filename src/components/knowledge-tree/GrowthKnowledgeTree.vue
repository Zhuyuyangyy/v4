<script setup lang="ts">
import { computed } from 'vue'
import {
  Sprout,
  TreePine,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-vue-next'

export interface TreeNode {
  name: string
  status: 'mastered' | 'learning' | 'weak' | 'next'
  progress: number
  course?: string
  issue?: string
  cause?: string
  remedialResources?: string[]
  pathImpact?: string
}

defineProps<{
  nodes: TreeNode[]
  overallMastery?: number
}>()

const emit = defineEmits<{
  (e: 'nodeClick', node: TreeNode): void
}>()

const statusConfig = {
  mastered: { color: '#06d6a0', label: '已掌握', icon: CheckCircle2, bg: 'rgba(6,214,160,0.08)' },
  learning: { color: '#3b82f6', label: '学习中', icon: BookOpen, bg: 'rgba(59,130,246,0.08)' },
  weak: { color: '#f43f5e', label: '薄弱点', icon: AlertTriangle, bg: 'rgba(244,63,94,0.08)' },
  next: { color: '#7c3aed', label: '待学习', icon: Sparkles, bg: 'rgba(124,58,237,0.08)' },
}

function statusIcon(status: string) {
  return statusConfig[status as keyof typeof statusConfig]?.icon ?? BookOpen
}

function statusColor(status: string) {
  return statusConfig[status as keyof typeof statusConfig]?.color ?? '#7c3aed'
}

function statusBg(status: string) {
  return statusConfig[status as keyof typeof statusConfig]?.bg ?? 'rgba(124,58,237,0.08)'
}

const showHeader = false
</script>

<template>
  <div class="gkt-root">
    <div class="gkt-tree-visual">
      <div class="gkt-trunk">
        <div class="gkt-trunk-label">
          <Sprout :size="20" stroke-width="1.5" />
          <span>学生画像</span>
        </div>
      </div>

      <div class="gkt-branch-line" />

      <div class="gkt-branches">
        <div
          v-for="(node, index) in nodes"
          :key="node.name"
          :class="['gkt-leaf', node.status]"
          :style="{
            '--leaf-color': statusColor(node.status),
            '--leaf-bg': statusBg(node.status),
            animationDelay: `${index * 0.12}s`,
          }"
          @click="emit('nodeClick', node)"
        >
          <div class="gkt-leaf-icon">
            <component :is="statusIcon(node.status)" :size="20" stroke-width="1.5" />
          </div>
          <div class="gkt-leaf-info">
            <span class="gkt-leaf-name">{{ node.name }}</span>
            <div class="gkt-leaf-bar">
              <div
                class="gkt-leaf-fill"
                :style="{ width: `${node.progress}%`, background: statusColor(node.status) }"
              />
            </div>
            <div class="gkt-leaf-footer">
              <span class="gkt-leaf-pct">{{ node.progress }}%</span>
              <span
                class="gkt-leaf-status"
                :style="{ color: statusColor(node.status) }"
              >
                {{ statusConfig[node.status].label }}
              </span>
            </div>
          </div>

          <div v-if="node.status === 'weak'" class="gkt-weak-dot" />
        </div>
      </div>

      <div class="gkt-fruits">
        <div class="gkt-fruit-row">
          <div
            v-for="(node, index) in nodes.filter(n => n.status === 'mastered')"
            :key="'fruit-' + node.name"
            class="gkt-fruit"
            :style="{ animationDelay: `${index * 0.2 + 0.6}s` }"
          >
            <span class="gkt-fruit-icon">✦</span>
            <span class="gkt-fruit-label">{{ node.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="gkt-legend">
      <div class="gkt-legend-item">
        <span class="gkt-legend-dot mastered" />已掌握
      </div>
      <div class="gkt-legend-item">
        <span class="gkt-legend-dot learning" />学习中
      </div>
      <div class="gkt-legend-item">
        <span class="gkt-legend-dot weak" />薄弱点
      </div>
      <div class="gkt-legend-item">
        <span class="gkt-legend-dot next" />待学习
      </div>
    </div>
  </div>
</template>

<style scoped>
.gkt-root {
  background: linear-gradient(180deg, rgba(10, 16, 36, 0.9) 0%, rgba(16, 20, 44, 0.85) 100%);
  border: 1px solid rgba(120, 180, 255, 0.12);
  border-radius: 20px;
  padding: 28px 24px 20px;
}

.gkt-tree-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px 0 16px;
}

.gkt-trunk {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gkt-trunk-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.12));
  border: 1px solid rgba(0, 212, 255, 0.18);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.gkt-branch-line {
  width: 2px;
  height: 24px;
  background: linear-gradient(to bottom, rgba(0, 212, 255, 0.5), rgba(124, 58, 237, 0.3));
  border-radius: 1px;
}

.gkt-branches {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 560px;
}

.gkt-leaf {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--leaf-bg);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  animation: leafIn 0.4s ease both;
}

.gkt-leaf:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.gkt-leaf.weak {
  border-color: rgba(244, 63, 94, 0.2);
}

.gkt-leaf-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--leaf-color);
  background: rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
}

.gkt-leaf-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gkt-leaf-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.gkt-leaf-bar {
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.gkt-leaf-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease;
}

.gkt-leaf-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gkt-leaf-pct {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono);
}

.gkt-leaf-status {
  font-size: 11px;
  font-weight: 500;
}

.gkt-weak-dot {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f43f5e;
  box-shadow: 0 0 10px rgba(244, 63, 94, 0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}

.gkt-fruits {
  width: 100%;
  max-width: 560px;
  padding-top: 4px;
}

.gkt-fruit-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.gkt-fruit {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 10px;
  background: rgba(6, 214, 160, 0.08);
  border: 1px solid rgba(6, 214, 160, 0.15);
  animation: fruitIn 0.4s ease both;
}

.gkt-fruit-icon {
  color: #06d6a0;
  font-size: 14px;
}

.gkt-fruit-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.gkt-legend {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.gkt-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}

.gkt-legend-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.gkt-legend-dot.mastered {
  background: #06d6a0;
  box-shadow: 0 0 6px rgba(6, 214, 160, 0.5);
}

.gkt-legend-dot.learning {
  background: #3b82f6;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
}

.gkt-legend-dot.weak {
  background: #f43f5e;
  box-shadow: 0 0 6px rgba(244, 63, 94, 0.5);
}

.gkt-legend-dot.next {
  background: #7c3aed;
  box-shadow: 0 0 6px rgba(124, 58, 237, 0.5);
}

@keyframes leafIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fruitIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 6px rgba(244, 63, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(244, 63, 94, 0.8);
  }
}

@media (max-width: 640px) {
  .gkt-branches {
    grid-template-columns: 1fr;
  }
}
</style>