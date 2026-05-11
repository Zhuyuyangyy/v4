<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref(false)

const phases = [
  {
    title: '基础夯实',
    period: '第 1-4 周',
    progress: 100,
    status: 'completed',
    color: '#00d4ff',
    nodes: [
      { name: 'Python 语言基础', progress: 100, duration: '1周' },
      { name: '数据结构入门', progress: 100, duration: '1.5周' },
      { name: '数学基础：线性代数', progress: 100, duration: '1.5周' },
    ],
  },
  {
    title: '核心进阶',
    period: '第 5-10 周',
    progress: 65,
    status: 'active',
    color: '#7c3aed',
    nodes: [
      { name: '机器学习概论', progress: 80, duration: '2周' },
      { name: '监督学习算法', progress: 60, duration: '2周' },
      { name: '无监督学习算法', progress: 40, duration: '1.5周' },
      { name: '模型评估与调优', progress: 20, duration: '1周' },
    ],
  },
  {
    title: '专题深入',
    period: '第 11-16 周',
    progress: 25,
    status: 'active',
    color: '#06d6a0',
    nodes: [
      { name: '深度学习基础', progress: 30, duration: '2周' },
      { name: '自然语言处理', progress: 20, duration: '2周' },
      { name: '计算机视觉', progress: 0, duration: '2周' },
    ],
  },
  {
    title: '实战项目',
    period: '第 17-20 周',
    progress: 0,
    status: 'locked',
    color: '#f59e0b',
    nodes: [
      { name: '综合项目实战', progress: 0, duration: '2周' },
      { name: '作品集构建', progress: 0, duration: '1周' },
      { name: '面试准备', progress: 0, duration: '1周' },
    ],
  },
]

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})
</script>

<template>
  <div class="learning-path">
    <div class="page-header reveal">
      <h1 class="page-title">学习路径</h1>
      <p class="page-desc">个性化定制的学习路线，动态调整，稳步推进</p>
    </div>

    <!-- Overall Progress -->
    <div :class="['overall-progress reveal reveal-delay-1', { visible: loaded }]">
      <div class="progress-stat">
        <span class="progress-value">47%</span>
        <span class="progress-label">总体完成</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 47%" />
      </div>
      <div class="progress-meta">
        <span>已完成 7/15 个阶段</span>
        <span>预计完成：12 周后</span>
      </div>
    </div>

    <!-- Phases Timeline -->
    <div class="path-timeline">
      <div
        v-for="(phase, pIdx) in phases"
        :key="phase.title"
        :class="['phase-block reveal', `reveal-delay-${pIdx + 2}`, phase.status]"
        :style="{ '--phase-color': phase.color }"
      >
        <div class="phase-header">
          <div class="phase-info">
            <span :class="['phase-badge', phase.status]">
              {{ phase.status === 'completed' ? '✓' : phase.status === 'active' ? '●' : '○' }}
            </span>
            <h2 class="phase-title">{{ phase.title }}</h2>
            <span class="phase-period">{{ phase.period }}</span>
          </div>
          <div class="phase-progress-info">
            <span class="phase-progress-text">{{ phase.progress > 0 ? phase.progress + '%' : '未开始' }}</span>
            <span :class="['phase-status-tag', phase.status]">
              {{ phase.status === 'completed' ? '已完成' : phase.status === 'active' ? '进行中' : '锁定' }}
            </span>
          </div>
        </div>

        <!-- Phase Bar -->
        <div class="phase-bar">
          <div class="phase-bar-fill" :style="{ width: phase.progress + '%' }" />
        </div>

        <!-- Nodes -->
        <div class="phase-nodes">
          <div v-for="(node, nIdx) in phase.nodes" :key="node.name" class="node-item">
            <div class="node-info">
              <span class="node-index">{{ pIdx * 10 + nIdx + 1 }}</span>
              <span class="node-name">{{ node.name }}</span>
              <span class="node-duration">{{ node.duration }}</span>
            </div>
            <div class="node-progress">
              <div class="node-bar">
                <div class="node-bar-fill" :style="{ width: node.progress + '%' }" />
              </div>
              <span class="node-progress-text">{{ node.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-path {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* === Overall Progress === */
.overall-progress {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  margin-bottom: 40px;
}

.progress-stat {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 16px;
}

.progress-value {
  font-family: var(--font-display);
  font-size: 48px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.progress-label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.progress-bar {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-purple));
  transition: width 1s var(--ease-out);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-tertiary);
}

/* === Timeline === */
.path-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.phase-block {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--phase-color);
  transition: all var(--duration-normal) var(--ease-out);
}

.phase-block:hover {
  border-color: var(--phase-color);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.phase-block.locked {
  opacity: 0.5;
}
.phase-block.locked:hover {
  opacity: 0.7;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.phase-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.phase-badge.completed {
  background: var(--color-accent-emerald);
  color: #fff;
}
.phase-badge.active {
  background: var(--phase-color);
  color: #fff;
  box-shadow: 0 0 12px var(--phase-color);
  animation: glow-pulse 2s ease-in-out infinite;
}
.phase-badge.locked {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text-tertiary);
}

.phase-title {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: -0.01em;
}

.phase-period {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.phase-progress-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phase-progress-text {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-secondary);
}

.phase-status-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  font-weight: 500;
}
.phase-status-tag.completed {
  background: rgba(6, 214, 160, 0.1);
  color: var(--color-accent-emerald);
}
.phase-status-tag.active {
  background: rgba(0, 212, 255, 0.1);
  color: var(--color-accent-cyan);
}
.phase-status-tag.locked {
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-tertiary);
}

.phase-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  margin-bottom: 20px;
}

.phase-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--phase-color);
  transition: width 1s var(--ease-out);
}

.phase-nodes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  transition: background var(--duration-fast) var(--ease-out);
}
.node-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.node-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.node-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.node-name {
  font-size: 14px;
  font-weight: 500;
}

.node-duration {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.node-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 160px;
}

.node-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.node-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--phase-color);
  transition: width 1s var(--ease-out);
}

.node-progress-text {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  width: 32px;
  text-align: right;
}
</style>
