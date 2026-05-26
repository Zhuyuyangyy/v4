<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TickerItem {
  agent: string
  t: string
  text: string
}

interface AgentInfo {
  id: string
  color: string
  role: string
}

const agents: AgentInfo[] = [
  { id: 'profile', color: '#7c3aed', role: 'PROFILE' },
  { id: 'path', color: '#00d4ff', role: 'PATH' },
  { id: 'resource', color: '#06d6a0', role: 'RESOURCE' },
  { id: 'eval', color: '#f43f5e', role: 'EVAL' },
  { id: 'feedback', color: '#3b82f6', role: 'FEEDBACK' },
  { id: 'tutor', color: '#f59e0b', role: 'TUTOR' },
]

const initialItems: TickerItem[] = [
  { agent: 'profile', t: '14:32:17', text: '检测到学生在「指针与内存」维度掌握度仅 42%，标记为薄弱域' },
  { agent: 'path', t: '14:32:18', text: '课后巩固阶段插入「二级指针专项训练」节点，优先级 P0' },
  { agent: 'resource', t: '14:32:19', text: '为图结构薄弱点匹配 5 个资源：思维导图 1 · 专项练习 3 · 图解卡片 1' },
  { agent: 'eval', t: '14:32:20', text: '阶段测评完成 · 82 分 · 发现 4 个盲点：二级指针 · BFS visited · 悬空引用 · 队列空判' },
  { agent: 'feedback', t: '14:32:21', text: '反向更新画像：图结构 68%→42% · 指针 65%→42% · 新增学习偏好「思维导图」' },
  { agent: 'tutor', t: '14:32:23', text: '待命中 · 支持 10 种辅导模式 · 概念讲解 / 代码辅导 / 错题诊断 / 思维导图生成' },
]

const items = ref<TickerItem[]>([...initialItems])
let timer: ReturnType<typeof setInterval> | null = null

function getAgent(id: string) {
  return agents.find(a => a.id === id)
}

onMounted(() => {
  timer = setInterval(() => {
    const first = items.value.shift()
    if (first) items.value.push(first)
  }, 2800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="ticker-wrap">
    <div class="ticker-bar">
      <div class="ticker-indicator">
        <span class="ticker-dot" />
        <span class="ticker-label">LIVE AGENT STREAM</span>
      </div>
      <div class="ticker-items">
        <div v-for="(item, i) in items.slice(0, 3)" :key="`${item.agent}-${item.t}-${i}`"
          class="ticker-item"
          :class="{ 'ticker-item-1': i === 0, 'ticker-item-2': i === 1, 'ticker-item-3': i === 2 }">
          <span class="ticker-time">{{ item.t }}</span>
          <span class="ticker-role" :style="`color: ${getAgent(item.agent)?.color}; background: ${getAgent(item.agent)?.color}15`">
            {{ getAgent(item.agent)?.role }}
          </span>
          <span class="ticker-text">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker-wrap {
  max-width: 1760px;
  margin: -20px auto 0;
  padding: 0 56px;
  position: relative;
  z-index: 3;
}

.ticker-bar {
  background: rgba(10, 12, 28, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.ticker-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 18px;
  border-right: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

.ticker-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 8px #00d4ff;
  animation: pulse-soft 1.4s ease-in-out infinite;
}

.ticker-label {
  font-size: 10px;
  color: #00d4ff;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.2em;
  font-weight: 500;
  white-space: nowrap;
}

.ticker-items {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 22px;
  overflow: hidden;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  transition: opacity 0.4s ease;
}

.ticker-item-1 { opacity: 1; }
.ticker-item-2 { opacity: 0.7; }
.ticker-item-3 { opacity: 0.5; }

.ticker-time {
  font-size: 10px;
  color: #4a5568;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.ticker-role {
  font-size: 9.5px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.ticker-text {
  font-size: 12px;
  color: #e8edf5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-dot {
    animation: none !important;
  }
}

@media (max-width: 900px) {
  .ticker-wrap {
    padding: 0 24px;
    margin-top: -12px;
  }
  .ticker-item-2,
  .ticker-item-3 {
    display: none;
  }
}
</style>
