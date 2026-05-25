<script setup lang="ts">
import { ref } from 'vue'

interface MindNode {
  id: string
  label: string
  children?: MindNode[]
  color?: string
}

const tree = ref<MindNode>({
  id: 'root',
  label: '深度学习',
  color: '#00d4ff',
  children: [
    {
      id: 'nn',
      label: '神经网络基础',
      color: '#7c3aed',
      children: [
        { id: 'nn-1', label: '感知机', color: '#7c3aed' },
        { id: 'nn-2', label: '激活函数', color: '#7c3aed' },
        { id: 'nn-3', label: '反向传播', color: '#7c3aed' },
      ],
    },
    {
      id: 'cnn',
      label: 'CNN',
      color: '#06d6a0',
      children: [
        { id: 'cnn-1', label: '卷积层', color: '#06d6a0' },
        { id: 'cnn-2', label: '池化层', color: '#06d6a0' },
        { id: 'cnn-3', label: '特征提取', color: '#06d6a0' },
      ],
    },
    {
      id: 'rnn',
      label: 'RNN',
      color: '#f59e0b',
      children: [
        { id: 'rnn-1', label: '序列建模', color: '#f59e0b' },
        { id: 'rnn-2', label: 'LSTM', color: '#f59e0b' },
        { id: 'rnn-3', label: 'GRU', color: '#f59e0b' },
      ],
    },
    {
      id: 'app',
      label: '应用场景',
      color: '#f43f5e',
      children: [
        { id: 'app-1', label: '图像识别', color: '#f43f5e' },
        { id: 'app-2', label: '文本处理', color: '#f43f5e' },
        { id: 'app-3', label: '医学图像', color: '#f43f5e' },
      ],
    },
  ],
})

const expanded = ref<Set<string>>(new Set(['root', 'nn', 'cnn', 'rnn', 'app']))

function toggleExpand(id: string) {
  if (expanded.value.has(id)) {
    expanded.value.delete(id)
  } else {
    expanded.value.add(id)
  }
}
</script>

<template>
  <div class="mindmap-view">
    <div class="mindmap-banner">
      <span class="mindmap-banner-dot"></span>
      <span>当前资源知识结构展开，点击分支节点可折叠/展开子节点。</span>
    </div>

    <div class="mindmap-tree">
      <div class="mindmap-root">
        <div class="mindmap-node mindmap-node--root" :style="{ '--node-color': tree.color }">
          <div class="node-dot node-dot--root" />
          <span class="node-label node-label--root">{{ tree.label }}</span>
        </div>

        <div class="mindmap-branches">
          <div v-for="branch in tree.children" :key="branch.id" class="mindmap-branch">
            <div class="branch-connector">
              <svg width="24" height="40" viewBox="0 0 24 40" class="connector-svg">
                <path d="M12 0 L12 16 L24 16 L24 40" fill="none" :stroke="branch.color ?? '#00d4ff'" stroke-width="1.5" opacity="0.3" />
              </svg>
            </div>

            <div class="branch-content">
              <div
                class="mindmap-node mindmap-node--branch"
                :style="{ '--node-color': branch.color }"
                @click="toggleExpand(branch.id)"
              >
                <div class="node-dot" :style="{ background: branch.color }" />
                <span class="node-label">{{ branch.label }}</span>
                <span class="expand-indicator">{{ expanded.has(branch.id) ? '−' : '+' }}</span>
              </div>

              <Transition name="slide">
                <div v-if="expanded.has(branch.id) && branch.children" class="mindmap-leaves">
                  <div v-for="leaf in branch.children" :key="leaf.id" class="mindmap-leaf">
                    <div class="leaf-connector">
                      <svg width="20" height="2" viewBox="0 0 20 2">
                        <line x1="0" y1="1" x2="20" y2="1" :stroke="leaf.color ?? '#00d4ff'" stroke-width="1" opacity="0.25" />
                      </svg>
                    </div>
                    <div class="mindmap-node mindmap-node--leaf" :style="{ '--node-color': leaf.color }">
                      <div class="node-dot node-dot--leaf" :style="{ background: leaf.color }" />
                      <span class="node-label node-label--leaf">{{ leaf.label }}</span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes mm-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.mindmap-view {
  padding: 0 40px 40px;
  animation: mm-float-up 0.5s ease both;
}

.mindmap-banner {
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

.mindmap-banner-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #7c3aed;
  box-shadow: 0 0 10px #7c3aed66;
  flex-shrink: 0;
}

.mindmap-tree {
  padding: 36px;
  border-radius: 18px;
  background: rgba(7, 7, 13, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.mindmap-root {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mindmap-node {
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
}

.mindmap-node--root {
  margin-bottom: 28px;
}

.mindmap-node--branch {
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(12, 12, 30, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 4px;
  transition: all 0.25s ease;
}

.mindmap-node--branch:hover {
  border-color: color-mix(in srgb, var(--node-color) 35%, transparent);
  background: rgba(12, 12, 30, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 12px color-mix(in srgb, var(--node-color) 8%, transparent);
}

.mindmap-node--leaf {
  padding: 7px 14px;
  border-radius: 10px;
  background: rgba(12, 12, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.25s ease;
}

.mindmap-node--leaf:hover {
  border-color: color-mix(in srgb, var(--node-color) 25%, transparent);
  background: rgba(12, 12, 30, 0.7);
}

.node-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--node-color);
  box-shadow: 0 0 10px color-mix(in srgb, var(--node-color) 30%, transparent);
  flex-shrink: 0;
}

.node-dot--root {
  width: 18px;
  height: 18px;
  box-shadow: 0 0 20px color-mix(in srgb, var(--node-color) 40%, transparent);
}

.node-dot--leaf {
  width: 7px;
  height: 7px;
  box-shadow: 0 0 6px color-mix(in srgb, var(--node-color) 20%, transparent);
}

.node-label {
  font-size: 13px;
  color: #e8edf5;
  font-weight: 500;
}

.node-label--root {
  font-family: var(--font-display);
  font-size: 22px;
  color: #e8edf5;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.node-label--leaf {
  font-size: 12px;
  color: #8892b0;
  font-weight: 400;
}

.expand-indicator {
  font-size: 14px;
  color: var(--node-color);
  font-weight: 600;
  margin-left: 6px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: color-mix(in srgb, var(--node-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--node-color) 15%, transparent);
}

.mindmap-branches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.mindmap-branch {
  display: flex;
  gap: 0;
}

.branch-connector {
  flex-shrink: 0;
  margin-right: 4px;
}

.connector-svg {
  display: block;
}

.branch-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.mindmap-leaves {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 14px;
  margin-top: 6px;
  border-left: 1px solid color-mix(in srgb, var(--node-color) 12%, transparent);
}

.mindmap-leaf {
  display: flex;
  align-items: center;
  gap: 4px;
}

.leaf-connector {
  flex-shrink: 0;
}

.slide-enter-active { transition: all 0.25s ease; }
.slide-leave-active { transition: all 0.15s ease-in; }
.slide-enter-from { opacity: 0; transform: translateY(-8px); }
.slide-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 900px) {
  .mindmap-view { padding: 0 20px 32px; }
  .mindmap-tree { padding: 20px; }
  .mindmap-branches { grid-template-columns: 1fr; }
}
</style>
