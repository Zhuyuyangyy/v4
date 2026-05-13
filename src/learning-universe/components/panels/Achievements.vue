<template>
  <div class="achievements-card glass-light" v-if="visible">
    <div class="ach-header">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M12 14v8M8 20h8" />
      </svg>
      <span class="ach-title">星座成就</span>
      <span class="ach-count">{{ earnedCount }}/{{ achievements.length }}</span>
    </div>

    <div class="ach-body">
      <div
        v-for="a in achievements"
        :key="a.id"
        class="ach-item"
        :class="{ earned: a.earned }"
      >
        <div class="ach-icon" :style="{ '--ach-clr': a.color, opacity: a.earned ? 1 : 0.25 }">
          <span v-html="a.icon" />
        </div>
        <div class="ach-info">
          <span class="ach-name" :style="{ color: a.earned ? 'rgba(248,250,255,0.9)' : 'rgba(200,215,255,0.35)' }">
            {{ a.name }}
          </span>
          <span class="ach-desc">{{ a.description }}</span>
          <div v-if="!a.earned" class="ach-progress">
            <div class="ach-progress-track">
              <div class="ach-progress-fill" :style="{ width: a.progress + '%', background: a.color }" />
            </div>
            <span class="ach-progress-pct">{{ a.progress }}%</span>
          </div>
          <span v-else class="ach-earned-badge">✓ 已解锁</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUniverseStore } from '../../stores/universe'

defineProps<{ visible: boolean }>()

const universe = useUniverseStore()

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earned: boolean
  progress: number
}

const achievements = computed<Achievement[]>(() => {
  const nodes = universe.nodes
  const total = nodes.length
  const mastered = nodes.filter(n => n.mastery >= 0.7).length
  const progNodes = nodes.filter(n => n.system === 'sys_prog_basics')
  const progMastered = progNodes.filter(n => n.mastery >= 0.7).length
  const aiNodes = nodes.filter(n => n.system === 'sys_ai')
  const aiMastered = aiNodes.filter(n => n.mastery >= 0.7).length

  return [
    {
      id: 'first_step',
      name: '启程之星',
      description: '掌握第一个知识节点',
      icon: '★',
      color: '#82a8ff',
      earned: mastered >= 1,
      progress: mastered >= 1 ? 100 : Math.round((mastered / 1) * 100),
    },
    {
      id: 'half_way',
      name: '半程领航员',
      description: '掌握超过 50% 的知识节点',
      icon: '✦',
      color: '#73f0d0',
      earned: mastered / total >= 0.5,
      progress: Math.round((mastered / total) * 100),
    },
    {
      id: 'programming_star',
      name: '编程之星',
      description: '完成编程与算法基础星域',
      icon: '◆',
      color: '#4A90D9',
      earned: progNodes.length > 0 && progMastered === progNodes.length,
      progress: progNodes.length > 0 ? Math.round((progMastered / progNodes.length) * 100) : 0,
    },
    {
      id: 'ai_navigator',
      name: 'AI 领航员',
      description: 'AI 方向掌握度超过 60%',
      icon: '◇',
      color: '#AB47BC',
      earned: aiNodes.length > 0 && aiMastered >= Math.ceil(aiNodes.length * 0.6),
      progress: aiNodes.length > 0 ? Math.round((aiMastered / aiNodes.length) * 100) : 0,
    },
    {
      id: 'full_mastery',
      name: '全知之眼',
      description: '所有节点掌握度超过 80%',
      icon: '◎',
      color: '#ffd084',
      earned: mastered / total >= 0.8,
      progress: Math.round((mastered / total) * 100),
    },
    {
      id: 'completionist',
      name: '宇宙探索者',
      description: '掌握所有知识节点',
      icon: '⍟',
      color: '#ff95b2',
      earned: mastered === total,
      progress: Math.round((mastered / total) * 100),
    },
  ]
})

const earnedCount = computed(() => achievements.value.filter(a => a.earned).length)
</script>

<style scoped>
.achievements-card {
  position: absolute;
  right: 16px;
  top: 88px;
  width: 260px;
  z-index: 15;
  padding: 14px 16px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.ach-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(166, 188, 255, 0.6);
}

.ach-title {
  flex: 1;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(248, 250, 255, 0.75);
}

.ach-count {
  font-size: 0.62rem;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(200, 215, 255, 0.4);
}

.ach-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ach-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
.ach-item:last-child { border-bottom: none; }

.ach-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--ach-clr) 12%, transparent);
  color: var(--ach-clr);
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: all 0.3s;
}
.ach-item.earned .ach-icon {
  box-shadow: 0 0 16px color-mix(in srgb, var(--ach-clr) 25%, transparent);
}

.ach-info {
  flex: 1;
  min-width: 0;
}

.ach-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  transition: color 0.3s;
}

.ach-desc {
  display: block;
  font-size: 0.62rem;
  color: rgba(173, 191, 255, 0.4);
  margin-top: 2px;
}

.ach-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.ach-progress-track {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  overflow: hidden;
}

.ach-progress-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.4s;
}

.ach-progress-pct {
  font-size: 0.58rem;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(173, 191, 255, 0.35);
}

.ach-earned-badge {
  display: inline-block;
  font-size: 0.58rem;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(115, 240, 208, 0.1);
  color: #73f0d0;
}
</style>
