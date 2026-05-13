<template>
  <Transition name="slide-up">
    <div class="path-panel glass" v-if="pathNodes.length > 0">
      <!-- Header -->
      <div class="pp-header">
        <div class="pp-header-left">
          <div class="pp-header-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div class="pp-header-text">
            <span class="pp-kicker">LEARNING PATH</span>
            <span class="pp-title">学习航线</span>
          </div>
        </div>
        <button class="pp-expand-btn" @click="expanded=!expanded" :title="expanded ? '收起' : '展开全部'">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" :class="{ rotated: expanded }">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <!-- Stats Row -->
      <div class="pp-stats-row">
        <div class="pp-stat">
          <span class="pp-stat-value mastered">{{ masteredInPath }}</span>
          <span class="pp-stat-label">已完成</span>
        </div>
        <div class="pp-stat-dot" />
        <div class="pp-stat">
          <span class="pp-stat-value in-progress">{{ inProgressCount }}</span>
          <span class="pp-stat-label">进行中</span>
        </div>
        <div class="pp-stat-dot" />
        <div class="pp-stat">
          <span class="pp-stat-value remaining">{{ remainingCount }}</span>
          <span class="pp-stat-label">待学习</span>
        </div>
        <div class="pp-stat-dot" />
        <div class="pp-stat">
          <span class="pp-stat-value hours">{{ totalPathHours }}</span>
          <span class="pp-stat-label">总计学时</span>
        </div>
      </div>

      <!-- Difficulty Distribution + Progress -->
      <div class="pp-mid-row">
        <div class="pp-diff-bar">
          <span
            v-for="d in diffDistribution"
            :key="d.label"
            class="pp-diff-seg"
            :style="{ width: d.pct + '%', background: d.color }"
            :title="`${d.label}: ${d.count} 个节点`"
          />
        </div>
        <div class="pp-progress-compact">
          <span class="pp-progress-pct">{{ progressPct }}%</span>
          <div class="pp-progress-track">
            <div class="pp-progress-fill" :style="{ width: `${progressPct}%` }" />
          </div>
        </div>
      </div>
      <div class="pp-diff-labels">
        <span v-for="d in diffDistribution" :key="d.label" class="pp-diff-lbl">
          <span class="pp-diff-dot" :style="{ background: d.color }" />
          {{ d.count }}
        </span>
        <span class="pp-diff-lbl muted">| {{ totalPathHours }}h</span>
      </div>

      <!-- Next Up -->
      <div class="pp-nextup" v-if="nextUpNode" @click="jumpTo(nextUpNode.id)">
        <span class="pp-nextup-kicker">🎯 下一步</span>
        <div class="pp-nextup-card">
          <div class="pp-nextup-top">
            <span class="pp-nextup-name">{{ nextUpNode.name }}</span>
            <span class="pp-stop-type" :class="typeClass(nextUpNode)">{{ typeLabel(nextUpNode) }}</span>
          </div>
          <div class="pp-nextup-meta">
            <span class="pp-difficulty">
              <span v-for="i in 3" :key="i" class="diff-dot" :class="{ on: nextUpNode.difficulty * 3 >= i }" />
              {{ difficultyLabel(nextUpNode) }}
            </span>
            <span class="pp-system-tag" :style="{ '--sys-clr': systemColor(nextUpNode) }">{{ systemLabel(nextUpNode) }}</span>
            <span class="pp-nextup-time">{{ estimatedNodeHours(nextUpNode) }}h</span>
          </div>
          <div class="pp-nextup-bottom">
            <span class="pp-nextup-today">今日建议 · {{ suggestedDaily }} 分钟专注</span>
            <span v-if="nextUpNode.mastery > 0" class="pp-nextup-pct">{{ Math.round(nextUpNode.mastery * 100) }}%</span>
          </div>
          <div v-if="nextUpNode.mastery > 0" class="pp-nextup-progress">
            <div class="pp-nextup-track">
              <div class="pp-nextup-fill" :style="{ width: `${nextUpNode.mastery * 100}%` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Path Timeline -->
      <div class="pp-body" @wheel.stop>
        <template v-for="(node, index) in displayNodes" :key="node.id">
          <!-- Category milestone separator -->
          <div
            v-if="index > 0 && displayNodes[index - 1].system !== node.system"
            class="pp-milestone"
          >
            <span class="pp-milestone-line" />
            <span class="pp-milestone-label">
              {{ systemLabel(node) }} 阶段
            </span>
            <span class="pp-milestone-line" />
          </div>

          <div
            class="pp-stop"
            :class="{
              mastered: node.mastery >= 0.7,
              current: index === currentStep && node.mastery < 0.7,
            }"
            @click="jumpTo(node.id)"
          >
            <div class="pp-stop-line">
              <div
                class="pp-stop-dot"
                :style="{
                  '--dot-clr': systemColor(node),
                  '--dot-glow': node.mastery >= 0.7 ? 'rgba(115,240,208,0.3)' : colorWithAlpha(systemColor(node), 0.2),
                }"
              >
                <template v-if="node.mastery >= 0.7">
                  <svg viewBox="0 0 16 16" width="7" height="7" fill="currentColor" stroke="none">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </template>
                <span v-else-if="index === currentStep" class="pp-dot-pulse" />
              </div>
              <div v-if="index < displayNodes.length - 1" class="pp-stop-line-connector" :class="{ mastered: node.mastery >= 0.7 }" />
            </div>

            <div class="pp-stop-card" :class="{ active: index === currentStep && node.mastery < 0.7 }">
              <div class="pp-stop-top">
                <span class="pp-stop-name">{{ node.name }}</span>
                <div class="pp-stop-badges">
                  <span class="pp-stop-type" :class="typeClass(node)">{{ typeLabel(node) }}</span>
                  <span v-if="node.mastery >= 0.7" class="pp-stop-check">已掌握</span>
                </div>
              </div>
              <div class="pp-stop-meta">
                <span class="pp-difficulty">
                  <span v-for="i in 3" :key="i" class="diff-dot" :class="{ on: node.difficulty * 3 >= i }" />
                  {{ difficultyLabel(node) }}
                </span>
                <span class="pp-stop-est">{{ estimatedNodeHours(node) }}h</span>
              </div>
              <div v-if="node.mastery > 0 && node.mastery < 0.7" class="pp-stop-progress">
                <div class="pp-stop-progress-track">
                  <div class="pp-stop-progress-fill" :style="{ width: `${node.mastery * 100}%` }" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="pp-footer">
        <span class="pp-footer-text">
          <template v-if="!expanded && pathNodes.length > 6">
            还有 {{ pathNodes.length - 6 }} 个航点
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </template>
          <template v-else>
            {{ masteredInPath }}/{{ pathNodes.length }} 完成 ·
            {{ cumulativeDoneHours }}h / {{ totalPathHours }}h
            <span v-if="remainingCount > 0" class="pp-footer-tip">· 继续加油 💪</span>
          </template>
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAgentStore } from '../../stores/agent'
import { useUniverseStore } from '../../stores/universe'
import type { KnowledgeNode } from '../../types'

const agentStore = useAgentStore()
const universe = useUniverseStore()
const emit = defineEmits<{
  (e: 'flyTo', nodeId: string): void
}>()
const expanded = ref(false)

const pathNodes = computed(() => agentStore.currentPath)

const displayNodes = computed(() => {
  if (expanded.value || pathNodes.value.length <= 6) return pathNodes.value
  return pathNodes.value.slice(0, 6)
})

const currentStep = computed(() => {
  if (pathNodes.value.length === 0) return 0
  return Math.floor(agentStore.shipProgress * (pathNodes.value.length - 1))
})

const masteredInPath = computed(() =>
  pathNodes.value.filter(n => n.mastery >= 0.7).length,
)

const inProgressCount = computed(() =>
  pathNodes.value.filter(n => n.mastery > 0 && n.mastery < 0.7).length,
)

const remainingCount = computed(() =>
  pathNodes.value.filter(n => n.mastery === 0).length,
)

const progressPct = computed(() => {
  if (pathNodes.value.length === 0) return 0
  return Math.round((masteredInPath.value / pathNodes.value.length) * 100)
})

const totalPathHours = computed(() =>
  pathNodes.value.reduce((sum, n) => sum + Math.round(n.difficulty * 20 + 4), 0),
)

const cumulativeDoneHours = computed(() =>
  pathNodes.value.filter(n => n.mastery >= 0.7)
    .reduce((sum, n) => sum + Math.round(n.difficulty * 20 + 4), 0),
)

const diffDistribution = computed(() => {
  const easy = pathNodes.value.filter(n => n.difficulty < 0.33).length
  const medium = pathNodes.value.filter(n => n.difficulty >= 0.33 && n.difficulty < 0.66).length
  const hard = pathNodes.value.filter(n => n.difficulty >= 0.66).length
  const total = pathNodes.value.length || 1
  return [
    { label: '入门', count: easy, pct: (easy / total) * 100, color: '#73f0d0' },
    { label: '进阶', count: medium, pct: (medium / total) * 100, color: '#ffd084' },
    { label: '高级', count: hard, pct: (hard / total) * 100, color: '#ff95b2' },
  ]
})

const nextUpNode = computed(() => {
  if (pathNodes.value.length === 0) return null
  const next = pathNodes.value.find(n => n.mastery < 0.7)
  return next ?? pathNodes.value[pathNodes.value.length - 1]
})

const suggestedDaily = computed(() => {
  if (!nextUpNode.value) return 30
  const h = estimatedNodeHours(nextUpNode.value)
  return Math.max(20, Math.min(120, Math.round(h * 10)))
})

const systemColors: Record<string, string> = {
  sys_prog_basics: '#4A90D9',
  sys_computer: '#26A69A',
  sys_software: '#FFA726',
  sys_ai: '#AB47BC',
  sys_frontier: '#EF5350',
}

const systemLabels: Record<string, string> = {
  sys_prog_basics: '编程',
  sys_computer: '系统',
  sys_software: '软工',
  sys_ai: 'AI',
  sys_frontier: '前沿',
}

function systemColor(node: KnowledgeNode): string {
  return systemColors[node.system] ?? '#7a97ff'
}

function systemLabel(node: KnowledgeNode): string {
  return systemLabels[node.system] ?? node.system
}

function colorWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function typeLabel(node: KnowledgeNode): string {
  return node.type === 'knowledge' ? '知识' : node.type === 'project' ? '项目' : '练习'
}

function typeClass(node: KnowledgeNode): string {
  return node.type === 'knowledge' ? 'type-k' : node.type === 'project' ? 'type-p' : 'type-e'
}

function difficultyLabel(node: KnowledgeNode): string {
  const d = node.difficulty
  if (d < 0.25) return '入门'
  if (d < 0.5) return '基础'
  if (d < 0.75) return '进阶'
  return '高级'
}

function estimatedNodeHours(node: KnowledgeNode): number {
  return Math.round(node.difficulty * 20 + 4)
}

function jumpTo(nodeId: string) {
  universe.selectNode(nodeId)
  agentStore.navigateTo(nodeId)
  emit('flyTo', nodeId)
}
</script>

<style scoped>
.path-panel {
  position: absolute;
  right: 16px;
  top: 320px;
  bottom: 16px;
  width: 310px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
  background:
    linear-gradient(160deg, rgba(8, 14, 36, 0.88), rgba(4, 8, 18, 0.72)),
    radial-gradient(ellipse at 30% 0%, rgba(122, 151, 255, 0.03), transparent 60%);
  border: 1px solid rgba(180, 200, 255, 0.07);
  border-radius: 18px;
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  box-shadow: 0 14px 48px rgba(0, 0, 0, 0.25);
}

.pp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 10px;
  flex-shrink: 0;
}
.pp-header-left { display: flex; align-items: center; gap: 10px; }
.pp-header-icon {
  width: 32px; height: 32px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(122, 151, 255, 0.12); color: #7a97ff; flex-shrink: 0;
}
.pp-header-text { display: flex; flex-direction: column; gap: 1px; }
.pp-kicker { font-size: 0.48rem; letter-spacing: 0.22em; color: rgba(145, 170, 255, 0.4); }
.pp-title { font-size: 0.85rem; font-weight: 600; color: rgba(248, 250, 255, 0.88); letter-spacing: 0.04em; }

.pp-expand-btn {
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  color: rgba(200, 215, 255, 0.35); cursor: pointer; transition: all 0.2s;
}
.pp-expand-btn:hover { background: rgba(255, 255, 255, 0.04); color: rgba(255, 255, 255, 0.6); }
.pp-expand-btn svg { transition: transform 0.2s ease; }
.pp-expand-btn svg.rotated { transform: rotate(180deg); }

/* ── Stats ── */
.pp-stats-row {
  display: flex; align-items: center; justify-content: space-around;
  padding: 0 14px 6px; flex-shrink: 0;
}
.pp-stat { display: flex; flex-direction: column; align-items: center; gap: 1px; }
.pp-stat-value { font-size: 1rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: rgba(248,250,255,0.85); line-height: 1.2; }
.pp-stat-value.mastered { color: #73f0d0; }
.pp-stat-value.in-progress { color: #82a8ff; }
.pp-stat-value.remaining { color: rgba(255,255,255,0.3); }
.pp-stat-value.hours { color: #ffd084; }
.pp-stat-label { font-size: 0.5rem; letter-spacing: 0.05em; color: rgba(173,191,255,0.35); }
.pp-stat-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.08); }

/* ── Mid Row: Difficulty + Progress ── */
.pp-mid-row {
  display: flex; align-items: center; gap: 10px;
  padding: 0 18px 2px; flex-shrink: 0;
}

.pp-diff-bar {
  flex: 1; display: flex; height: 3px;
  border-radius: 999px; overflow: hidden;
  background: rgba(255,255,255,0.03);
}
.pp-diff-seg { height: 100%; transition: width 0.3s; }

.pp-progress-compact {
  display: flex; align-items: center; gap: 6px;
}
.pp-progress-pct {
  font-size: 0.58rem; font-family: 'JetBrains Mono', monospace; color: rgba(173,191,255,0.35);
  min-width: 26px; text-align: right;
}
.pp-progress-track { width: 44px; height: 3px; background: rgba(255,255,255,0.04); border-radius: 999px; overflow: hidden; }
.pp-progress-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, #7a97ff, #73f0d0); box-shadow: 0 0 8px rgba(108,141,255,0.2); transition: width 0.6s ease; }

.pp-diff-labels {
  display: flex; align-items: center; gap: 8px;
  padding: 0 18px 8px; flex-shrink: 0;
}
.pp-diff-lbl {
  display: flex; align-items: center; gap: 3px;
  font-size: 0.5rem; color: rgba(173,191,255,0.3);
}
.pp-diff-lbl.muted { opacity: 0.5; }
.pp-diff-dot { width: 4px; height: 4px; border-radius: 50%; }

/* ── Next Up ── */
.pp-nextup { padding: 0 14px 8px; flex-shrink: 0; }
.pp-nextup-kicker {
  display: block; font-size: 0.55rem; font-weight: 600;
  letter-spacing: 0.06em; color: rgba(173,191,255,0.45);
  margin-bottom: 5px;
}
.pp-nextup-card {
  padding: 10px 12px; border-radius: 12px;
  border: 1px solid rgba(122, 151, 255, 0.12);
  background: rgba(122, 151, 255, 0.04);
  cursor: pointer; transition: all 0.2s;
}
.pp-nextup-card:hover { border-color: rgba(122,151,255,0.25); background: rgba(122,151,255,0.07); }

.pp-nextup-top { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 4px; }
.pp-nextup-name { font-size: 0.78rem; font-weight: 600; color: rgba(248,250,255,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-nextup-meta { display: flex; align-items: center; gap: 8px; }

.pp-difficulty { display: flex; align-items: center; gap: 3px; font-size: 0.58rem; color: rgba(173,191,255,0.35); }
.diff-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.06); }
.diff-dot.on { background: rgba(255,208,132,0.5); }

.pp-system-tag {
  font-size: 0.5rem; font-weight: 600; padding: 1px 6px;
  border-radius: 4px; letter-spacing: 0.04em;
  background: color-mix(in srgb, var(--sys-clr) 12%, transparent);
  color: var(--sys-clr);
}

.pp-nextup-time { font-size: 0.55rem; font-family: 'JetBrains Mono', monospace; color: rgba(173,191,255,0.3); margin-left: auto; }

.pp-nextup-bottom {
  display: flex; align-items: center; gap: 8px; margin-top: 6px;
}
.pp-nextup-today {
  font-size: 0.6rem; color: rgba(173,191,255,0.4);
}
.pp-nextup-pct { font-size: 0.58rem; font-family: 'JetBrains Mono', monospace; color: rgba(130,168,255,0.5); }

.pp-nextup-progress { margin-top: 6px; }
.pp-nextup-track { height: 3px; background: rgba(255,255,255,0.04); border-radius: 999px; overflow: hidden; }
.pp-nextup-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, rgba(130,168,255,0.4), rgba(130,168,255,0.7)); transition: width 0.4s ease; }

/* ── Milestone Separator ── */
.pp-milestone {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px 4px;
}
.pp-milestone-line { flex: 1; height: 1px; background: rgba(255,255,255,0.04); }
.pp-milestone-label {
  font-size: 0.5rem; font-weight: 600; letter-spacing: 0.06em;
  color: rgba(173,191,255,0.25); white-space: nowrap;
}

/* ── Body ── */
.pp-body {
  flex: 1; overflow-y: auto;
  padding: 2px 8px 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.04) transparent;
  min-height: 0;
}
.pp-body::-webkit-scrollbar { width: 3px; }
.pp-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }

.pp-stop { display: flex; gap: 8px; cursor: pointer; transition: transform 0.2s ease; }
.pp-stop:hover { transform: translateX(-2px); }

.pp-stop-line { display: flex; flex-direction: column; align-items: center; padding-top: 8px; width: 18px; flex-shrink: 0; }

.pp-stop-dot {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid var(--dot-clr, rgba(255,255,255,0.15));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.3s; position: relative;
  background: transparent;
  box-shadow: 0 0 8px var(--dot-glow, transparent);
}
.pp-stop.mastered .pp-stop-dot { border-color: #73f0d0; background: rgba(115,240,208,0.15); color: #73f0d0; }
.pp-stop.current .pp-stop-dot { border-color: #82a8ff; background: rgba(130,168,255,0.15); box-shadow: 0 0 14px rgba(130,168,255,0.3); }

.pp-dot-pulse {
  width: 5px; height: 5px; border-radius: 50%; background: #82a8ff;
  animation: dot-pulse 1.5s ease-out infinite;
}
@keyframes dot-pulse { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }

.pp-stop-line-connector {
  width: 1px; flex: 1; min-height: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01));
  margin: 3px 0;
}
.pp-stop.mastered .pp-stop-line-connector { background: linear-gradient(180deg, rgba(115,240,208,0.2), rgba(255,255,255,0.01)); }
.pp-stop.current .pp-stop-line-connector { background: linear-gradient(180deg, rgba(130,168,255,0.25), rgba(255,255,255,0.01)); }

.pp-stop-card {
  flex: 1; padding: 6px 8px; margin: 2px 0; border-radius: 8px;
  border: 1px solid transparent; transition: all 0.2s; min-width: 0;
}
.pp-stop-card.active { border-color: rgba(130,168,255,0.12); background: rgba(130,168,255,0.03); }
.pp-stop:hover .pp-stop-card { border-color: rgba(255,255,255,0.04); background: rgba(255,255,255,0.02); }

.pp-stop-top { display: flex; justify-content: space-between; align-items: center; gap: 4px; }
.pp-stop-name { font-size: 0.7rem; font-weight: 500; color: rgba(248,250,255,0.72); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s; }
.pp-stop.current .pp-stop-name { color: #82a8ff; }
.pp-stop.mastered .pp-stop-name { color: rgba(248,250,255,0.4); }

.pp-stop-badges { display: flex; gap: 3px; flex-shrink: 0; }
.pp-stop-type { font-size: 0.48rem; font-weight: 600; padding: 1px 6px; border-radius: 4px; letter-spacing: 0.03em; }
.type-k { background: rgba(130,168,255,0.1); color: rgba(130,168,255,0.65); }
.type-p { background: rgba(115,240,208,0.1); color: rgba(115,240,208,0.65); }
.type-e { background: rgba(255,174,107,0.1); color: rgba(255,174,107,0.65); }

.pp-stop-check { font-size: 0.48rem; font-weight: 600; padding: 1px 5px; border-radius: 3px; background: rgba(115,240,208,0.08); color: #73f0d0; }

.pp-stop-meta { display: flex; align-items: center; gap: 8px; margin-top: 3px; }
.pp-stop-est { font-size: 0.52rem; font-family: 'JetBrains Mono', monospace; color: rgba(173,191,255,0.3); margin-left: auto; }

.pp-stop-progress { margin-top: 4px; }
.pp-stop-progress-track { height: 2px; background: rgba(255,255,255,0.03); border-radius: 999px; overflow: hidden; }
.pp-stop-progress-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, rgba(130,168,255,0.3), rgba(130,168,255,0.6)); transition: width 0.4s ease; }

/* ── Footer ── */
.pp-footer {
  padding: 7px 14px 9px; border-top: 1px solid rgba(255,255,255,0.03);
  text-align: center; cursor: pointer; transition: background 0.2s; flex-shrink: 0;
}
.pp-footer:hover { background: rgba(255,255,255,0.02); }
.pp-footer-text { font-size: 0.55rem; color: rgba(173,191,255,0.3); letter-spacing: 0.02em; }
.pp-footer-tip { opacity: 0.6; }

/* ── Transition ── */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(12px); }
</style>
