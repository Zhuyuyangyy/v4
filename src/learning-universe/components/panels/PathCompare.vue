<template>
  <Transition name="modal-fade">
    <div v-if="visible" class="path-compare-overlay" @click.self="$emit('close')">
      <div class="path-compare glass-card">
        <div class="pc-header">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span class="pc-title">路径对比</span>
          <button class="pc-close" @click="$emit('close')">✕</button>
        </div>

        <div class="pc-body">
          <div
            v-for="(path, i) in paths"
            :key="path.id"
            class="pc-path"
            :class="{ recommended: path.recommended }"
            @click="selectPath(path.id)"
          >
            <div class="pc-path-header">
              <div class="pc-path-name-row">
                <span v-if="path.recommended" class="pc-rec-badge">推荐</span>
                <span class="pc-path-name">{{ path.name }}</span>
              </div>
              <span class="pc-path-desc">{{ path.description }}</span>
            </div>

            <div class="pc-path-stats">
              <div class="pc-path-stat">
                <span class="pc-stat-value">{{ path.nodeCount }}</span>
                <span class="pc-stat-label">节点</span>
              </div>
              <div class="pc-path-stat">
                <span class="pc-stat-value">{{ path.hours }}h</span>
                <span class="pc-stat-label">学时</span>
              </div>
              <div class="pc-path-stat">
                <span class="pc-stat-value">{{ path.weeks }}w</span>
                <span class="pc-stat-label">周期</span>
              </div>
            </div>

            <div class="pc-difficulty">
              <span class="pc-diff-label">难度分布</span>
              <div class="pc-diff-bar">
                <div
                  class="pc-diff-seg"
                  :style="{ width: path.difficulty.easy + '%', background: '#73f0d0' }"
                  title="基础"
                />
                <div
                  class="pc-diff-seg"
                  :style="{ width: path.difficulty.medium + '%', background: '#ffd084' }"
                  title="进阶"
                />
                <div
                  class="pc-diff-seg"
                  :style="{ width: path.difficulty.hard + '%', background: '#ff95b2' }"
                  title="高级"
                />
              </div>
              <div class="pc-diff-labels">
                <span>基础 {{ path.difficulty.easy }}%</span>
                <span>进阶 {{ path.difficulty.medium }}%</span>
                <span>高级 {{ path.difficulty.hard }}%</span>
              </div>
            </div>

            <div class="pc-action-bar">
              <button
                class="pc-select-btn"
                :class="{ selected: selected === path.id }"
                @click.stop="selectPath(path.id)"
              >
                {{ selected === path.id ? '当前路径' : '选择此路径' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { knowledgeNodes } from '../../data/knowledge-graph'

defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const universe = useUniverseStore()
const selected = ref('balanced')

interface PathOption {
  id: string
  name: string
  description: string
  nodeCount: number
  hours: number
  weeks: number
  difficulty: { easy: number; medium: number; hard: number }
  recommended: boolean
}

const paths: PathOption[] = [
  {
    id: 'express',
    name: '快速路径',
    description: '直奔核心目标，跳过非必需前置',
    nodeCount: 14,
    hours: 68,
    weeks: 8,
    difficulty: { easy: 20, medium: 50, hard: 30 },
    recommended: false,
  },
  {
    id: 'balanced',
    name: '扎实路径（推荐）',
    description: '兼顾广度与深度，系统性学习',
    nodeCount: 24,
    hours: 120,
    weeks: 16,
    difficulty: { easy: 30, medium: 45, hard: 25 },
    recommended: true,
  },
  {
    id: 'deep',
    name: '深度路径',
    description: '覆盖所有知识点与项目实践',
    nodeCount: 32,
    hours: 180,
    weeks: 24,
    difficulty: { easy: 25, medium: 40, hard: 35 },
    recommended: false,
  },
]

function selectPath(id: string) {
  selected.value = id
}
</script>

<style scoped>
.path-compare-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 4, 12, 0.6);
  backdrop-filter: blur(8px);
  z-index: 400;
  padding: 24px;
}

.path-compare {
  width: min(680px, 92vw);
  max-height: 80vh;
  overflow-y: auto;
  padding: 0;
}

.pc-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(166, 188, 255, 0.7);
}

.pc-title {
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.9);
}

.pc-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
}

.pc-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pc-path {
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.25s;
}
.pc-path:hover {
  border-color: rgba(122, 151, 255, 0.15);
  background: rgba(122, 151, 255, 0.03);
}
.pc-path.recommended {
  border-color: rgba(122, 151, 255, 0.2);
  background: rgba(122, 151, 255, 0.04);
}

.pc-path-header { margin-bottom: 14px; }
.pc-path-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.pc-rec-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(122, 151, 255, 0.15);
  color: #82a8ff;
  letter-spacing: 0.05em;
}
.pc-path-name { font-size: 0.95rem; font-weight: 600; color: rgba(248, 250, 255, 0.9); }
.pc-path-desc { display: block; font-size: 0.72rem; color: rgba(200, 215, 255, 0.5); }

.pc-path-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 14px;
}

.pc-path-stat {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.pc-stat-value { font-size: 1.05rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: rgba(248, 250, 255, 0.85); }
.pc-stat-label { font-size: 0.6rem; color: rgba(173, 191, 255, 0.4); }

.pc-difficulty { margin-bottom: 14px; }
.pc-diff-label { font-size: 0.6rem; letter-spacing: 0.1em; color: rgba(173, 191, 255, 0.4); margin-bottom: 6px; }
.pc-diff-bar { display: flex; height: 4px; border-radius: 999px; overflow: hidden; margin-bottom: 6px; }
.pc-diff-seg { height: 100%; transition: width 0.3s; }
.pc-diff-labels { display: flex; gap: 12px; font-size: 0.6rem; color: rgba(173, 191, 255, 0.35); }

.pc-action-bar { padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.04); }
.pc-select-btn {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: rgba(200, 215, 255, 0.6);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;
}
.pc-select-btn:hover { border-color: rgba(122, 151, 255, 0.2); color: rgba(255, 255, 255, 0.8); }
.pc-select-btn.selected {
  background: rgba(122, 151, 255, 0.1);
  border-color: rgba(122, 151, 255, 0.25);
  color: #82a8ff;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .path-compare,
.modal-fade-leave-to .path-compare {
  transform: scale(0.95);
}
</style>
