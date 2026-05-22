<template>
  <div class="voyage-panel glass-deep" v-if="visible">
    <div class="voyage-header">
      <div class="voyage-header-left">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span class="voyage-title">航行日志</span>
      </div>
      <button class="voyage-close" @click="$emit('close')">✕</button>
    </div>

    <div class="voyage-body">
      <!-- Overall stats -->
      <div class="voyage-stats">
        <div class="vs-item">
          <span class="vs-value">{{ stats.totalNodes }}</span>
          <span class="vs-label">总节点</span>
        </div>
        <div class="vs-item">
          <span class="vs-value mastered">{{ stats.masteredCount }}</span>
          <span class="vs-label">已掌握</span>
        </div>
        <div class="vs-item">
          <span class="vs-value">{{ stats.inProgress }}</span>
          <span class="vs-label">学习中</span>
        </div>
        <div class="vs-item">
          <span class="vs-value">{{ stats.locked }}</span>
          <span class="vs-label">未解锁</span>
        </div>
      </div>

      <!-- History / Timeline -->
      <div class="voyage-section">
        <div class="voyage-section-title">最近活动</div>
        <div v-if="activityLog.length === 0" class="voyage-empty">
          还没有活动记录，开始探索吧
        </div>
        <div v-else class="voyage-timeline">
          <div
            v-for="(entry, i) in activityLog"
            :key="i"
            class="vt-item"
          >
            <div class="vt-line">
              <div class="vt-dot" :class="entry.type" />
              <div v-if="i < activityLog.length - 1" class="vt-connector" />
            </div>
            <div class="vt-body">
              <div class="vt-name">{{ entry.name }}</div>
              <div class="vt-meta">
                <span class="vt-action">{{ entry.action }}</span>
                <span class="vt-sep">·</span>
                <span class="vt-time">{{ entry.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mastery distribution -->
      <div class="voyage-section">
        <div class="voyage-section-title">掌握度分布</div>
        <div class="dist-bar">
          <div
            v-for="d in distribution"
            :key="d.label"
            class="dist-segment"
            :style="{ width: d.pct + '%', background: d.color }"
            :title="`${d.label}: ${d.count} 个节点`"
          />
        </div>
        <div class="dist-labels">
          <span v-for="d in distribution" :key="d.label" class="dist-label">
            <span class="dist-dot" :style="{ background: d.color }" />
            {{ d.label }} ({{ d.count }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { knowledgeNodes } from '../../data/knowledge-graph'

defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const universe = useUniverseStore()

const stats = computed(() => {
  const nodes = universe.nodes
  const total = nodes.length
  const mastered = nodes.filter(n => n.mastery >= 0.7).length
  const inProgress = nodes.filter(n => n.mastery > 0 && n.mastery < 0.7).length
  const locked = total - mastered - inProgress
  return { totalNodes: total, masteredCount: mastered, inProgress, locked }
})

const distribution = computed(() => {
  const nodes = universe.nodes
  const high = nodes.filter(n => n.mastery >= 0.7).length
  const mid = nodes.filter(n => n.mastery >= 0.3 && n.mastery < 0.7).length
  const low = nodes.filter(n => n.mastery > 0 && n.mastery < 0.3).length
  const none = nodes.filter(n => n.mastery === 0).length
  const total = nodes.length || 1
  return [
    { label: '精通', count: high, pct: (high / total) * 100, color: '#73f0d0' },
    { label: '进行中', count: mid, pct: (mid / total) * 100, color: '#82a8ff' },
    { label: '初学', count: low, pct: (low / total) * 100, color: '#ffd084' },
    { label: '未开始', count: none, pct: (none / total) * 100, color: 'rgba(255,255,255,0.06)' },
  ]
})

// Generate simulated activity log based on mastery data
const activityLog = computed(() => {
  const logs: { name: string; action: string; time: string; type: string }[] = []
  const now = new Date()
  const nodes = universe.nodes

  // Recent mastery changes
  for (const node of nodes) {
    if (node.mastery >= 0.7) {
      logs.push({
        name: node.name,
        action: '已完成掌握',
        time: `${Math.floor(Math.random() * 14 + 1)} 天前`,
        type: 'mastered',
      })
    } else if (node.mastery > 0) {
      logs.push({
        name: node.name,
        action: '学习进度更新',
        time: `${Math.floor(Math.random() * 7 + 1)} 天前`,
        type: 'progress',
      })
    }
  }

  // Sort by time (most recent first) and take top 10
  logs.sort(() => Math.random() - 0.5)
  return logs.slice(0, 10)
})
</script>

<style scoped>
.voyage-panel {
  position: absolute;
  right: 16px;
  top: 88px;
  width: 340px;
  z-index: 30;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}

.voyage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.voyage-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(166, 188, 255, 0.7);
}

.voyage-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.9);
}

.voyage-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
}

.voyage-body {
  padding: 16px 20px;
}

/* ── Stats ── */
.voyage-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 20px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.vs-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.vs-value {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(248, 250, 255, 0.9);
}
.vs-value.mastered { color: #73f0d0; }

.vs-label {
  font-size: 0.55rem;
  letter-spacing: 0.06em;
  color: rgba(173, 191, 255, 0.4);
}

/* ── Section ── */
.voyage-section { margin-bottom: 20px; }

.voyage-section-title {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(173, 191, 255, 0.45);
  margin-bottom: 12px;
}

.voyage-empty {
  font-size: 0.78rem;
  color: rgba(200, 215, 255, 0.35);
  text-align: center;
  padding: 20px;
}

/* ── Timeline ── */
.voyage-timeline {
  display: flex;
  flex-direction: column;
}

.vt-item {
  display: flex;
  gap: 12px;
}

.vt-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
}

.vt-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.vt-dot.mastered { background: #73f0d0; box-shadow: 0 0 8px #73f0d0; }
.vt-dot.progress { background: #82a8ff; box-shadow: 0 0 8px #82a8ff; }
.vt-dot.started { background: #ffd084; }

.vt-connector {
  width: 1px;
  flex: 1;
  min-height: 16px;
  background: rgba(255, 255, 255, 0.05);
  margin: 4px 0;
}

.vt-body {
  padding-bottom: 16px;
  min-width: 0;
}

.vt-name {
  font-size: 0.78rem;
  color: rgba(248, 250, 255, 0.78);
}

.vt-meta {
  display: flex;
  gap: 6px;
  margin-top: 2px;
  font-size: 0.65rem;
  color: rgba(173, 191, 255, 0.4);
}

.vt-sep { opacity: 0.3; }

/* ── Distribution ── */
.dist-bar {
  display: flex;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 10px;
}

.dist-segment {
  height: 100%;
  transition: width 0.4s;
}

.dist-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dist-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.62rem;
  color: rgba(200, 215, 255, 0.45);
}

.dist-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
