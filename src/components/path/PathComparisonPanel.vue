<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, AlertTriangle, Sparkles, GitBranch } from 'lucide-vue-next'

interface PathNode {
  label: string
  isRemedial: boolean
}

const beforeNodes: PathNode[] = [
  { label: 'C语言基础', isRemedial: false },
  { label: '数据结构入门', isRemedial: false },
  { label: '指针基础', isRemedial: false },
  { label: '结构体', isRemedial: false },
  { label: '文件操作', isRemedial: false },
  { label: '算法基础', isRemedial: false },
]

const afterNodes: PathNode[] = [
  { label: 'C语言基础', isRemedial: false },
  { label: '数据结构入门', isRemedial: false },
  { label: '指针基础', isRemedial: false },
  { label: '二级指针专项训练', isRemedial: true },
  { label: '结构体', isRemedial: false },
  { label: '图结构搜索补弱', isRemedial: true },
  { label: 'BFS visited 专项', isRemedial: true },
  { label: '文件操作', isRemedial: false },
  { label: '算法基础', isRemedial: false },
]

const adjustmentReasons = [
  '评估发现指针掌握度仅 42%，在指针基础后插入二级指针专项训练',
  '图结构搜索掌握度 38%，在结构体后插入图结构搜索补弱和BFS visited专项',
  '已掌握节点（C语言基础）转入迁移题，不再占用主路径时间',
]

const remedialCount = computed(() => afterNodes.filter(n => n.isRemedial).length)

const completedLabels = new Set(['C语言基础'])
</script>

<template>
  <div class="pcp-root">
    <div class="pcp-header">
      <GitBranch :size="18" stroke-width="1.5" class="pcp-header-icon" />
      <span class="pcp-header-title">评估前路径 vs 评估后路径</span>
      <span class="pcp-header-badge">+{{ remedialCount }} 补救节点</span>
    </div>

    <div class="pcp-grid">
      <div class="pcp-col pcp-col--before">
        <div class="pcp-col-header">
          <span class="pcp-col-dot pcp-col-dot--before" />
          <span class="pcp-col-label">评估前路径</span>
          <span class="pcp-col-count">{{ beforeNodes.length }} 节点</span>
        </div>
        <div class="pcp-path">
          <template v-for="(node, i) in beforeNodes" :key="node.label">
            <div
              class="pcp-node"
              :class="{
                'pcp-node--completed': completedLabels.has(node.label),
              }"
            >
              <span
                class="pcp-node-dot"
                :class="{
                  'pcp-node-dot--completed': completedLabels.has(node.label),
                }"
              />
              <span class="pcp-node-label">{{ node.label }}</span>
            </div>
            <ArrowRight
              v-if="i < beforeNodes.length - 1"
              :size="14"
              stroke-width="1.2"
              class="pcp-arrow"
            />
          </template>
        </div>
      </div>

      <div class="pcp-col pcp-col--after">
        <div class="pcp-col-header">
          <span class="pcp-col-dot pcp-col-dot--after" />
          <span class="pcp-col-label">评估后路径</span>
          <span class="pcp-col-count">{{ afterNodes.length }} 节点</span>
        </div>
        <div class="pcp-path">
          <template v-for="(node, i) in afterNodes" :key="node.label">
            <div
              class="pcp-node"
              :class="{
                'pcp-node--remedial': node.isRemedial,
                'pcp-node--completed': completedLabels.has(node.label),
              }"
            >
              <span
                class="pcp-node-dot"
                :class="{
                  'pcp-node-dot--remedial': node.isRemedial,
                  'pcp-node-dot--completed': completedLabels.has(node.label),
                }"
              />
              <span class="pcp-node-label">{{ node.label }}</span>
              <span v-if="node.isRemedial" class="pcp-node-badge">
                <AlertTriangle :size="10" stroke-width="2" />
                补救节点
              </span>
            </div>
            <ArrowRight
              v-if="i < afterNodes.length - 1"
              :size="14"
              stroke-width="1.2"
              class="pcp-arrow"
              :class="{ 'pcp-arrow--remedial': node.isRemedial || afterNodes[i + 1]?.isRemedial }"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="pcp-reasons">
      <div class="pcp-reasons-header">
        <Sparkles :size="15" stroke-width="1.5" class="pcp-reasons-icon" />
        <span class="pcp-reasons-title">PathAgent 路径调整原因</span>
      </div>
      <ul class="pcp-reasons-list">
        <li
          v-for="(reason, i) in adjustmentReasons"
          :key="i"
          class="pcp-reason-item"
        >
          <span class="pcp-reason-index">{{ i + 1 }}</span>
          <span class="pcp-reason-text">{{ reason }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pcp-root {
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  background: var(--color-bg-card, rgba(14, 18, 42, 0.8));
  border: 1px solid var(--color-border, rgba(0, 212, 255, 0.1));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.pcp-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.pcp-header-icon {
  color: var(--color-accent-cyan, #00d4ff);
  flex-shrink: 0;
}

.pcp-header-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary, #edf0f7);
  letter-spacing: 0.3px;
}

.pcp-header-badge {
  margin-left: auto;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent-rose, #f43f5e);
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.2);
  letter-spacing: 0.3px;
}

.pcp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.pcp-col {
  padding: 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s var(--ease-out);
}

.pcp-col--before {
  border-color: rgba(0, 212, 255, 0.08);
}

.pcp-col--after {
  border-color: rgba(6, 214, 160, 0.1);
  background: rgba(6, 214, 160, 0.02);
}

.pcp-col-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.pcp-col-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pcp-col-dot--before {
  background: var(--color-accent-cyan, #00d4ff);
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
}

.pcp-col-dot--after {
  background: var(--color-accent-emerald, #06d6a0);
  box-shadow: 0 0 8px rgba(6, 214, 160, 0.3);
}

.pcp-col-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.5px;
}

.pcp-col-count {
  margin-left: auto;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
}

.pcp-path {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.pcp-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.08);
  transition: all 0.25s var(--ease-out);
}

.pcp-node:hover {
  background: rgba(0, 212, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.15);
}

.pcp-node--completed {
  background: rgba(6, 214, 160, 0.06);
  border-color: rgba(6, 214, 160, 0.12);
}

.pcp-node--completed:hover {
  background: rgba(6, 214, 160, 0.1);
  border-color: rgba(6, 214, 160, 0.2);
}

.pcp-node--remedial {
  background: rgba(244, 63, 94, 0.06);
  border: 1px dashed rgba(244, 63, 94, 0.25);
  animation: pcp-remedial-pulse 2.5s ease-in-out infinite;
}

.pcp-node--remedial:hover {
  background: rgba(244, 63, 94, 0.12);
  border-color: rgba(244, 63, 94, 0.4);
}

.pcp-node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-cyan, #00d4ff);
  flex-shrink: 0;
}

.pcp-node-dot--completed {
  background: var(--color-accent-emerald, #06d6a0);
  box-shadow: 0 0 6px rgba(6, 214, 160, 0.4);
}

.pcp-node-dot--remedial {
  background: var(--color-accent-rose, #f43f5e);
  box-shadow: 0 0 6px rgba(244, 63, 94, 0.4);
}

.pcp-node-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.pcp-node--completed .pcp-node-label {
  color: rgba(6, 214, 160, 0.85);
}

.pcp-node--remedial .pcp-node-label {
  color: rgba(244, 63, 94, 0.9);
  font-weight: 600;
}

.pcp-node-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: var(--color-accent-rose, #f43f5e);
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.pcp-arrow {
  color: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.pcp-arrow--remedial {
  color: rgba(244, 63, 94, 0.3);
}

.pcp-reasons {
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(124, 58, 237, 0.03);
  border: 1px solid rgba(124, 58, 237, 0.08);
}

.pcp-reasons-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.pcp-reasons-icon {
  color: var(--color-accent-purple, #7c3aed);
  flex-shrink: 0;
}

.pcp-reasons-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.5px;
}

.pcp-reasons-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pcp-reason-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.2s ease;
}

.pcp-reason-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.pcp-reason-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  color: var(--color-accent-purple, #7c3aed);
  background: rgba(124, 58, 237, 0.1);
  flex-shrink: 0;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
}

.pcp-reason-text {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

@keyframes pcp-remedial-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0);
  }
  50% {
    box-shadow: 0 0 12px 2px rgba(244, 63, 94, 0.12);
  }
}

@media (max-width: 768px) {
  .pcp-grid {
    grid-template-columns: 1fr;
  }

  .pcp-root {
    padding: 16px;
  }
}
</style>
