<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TickerItem {
  agent: string
  text: string
}

interface AgentInfo {
  id: string
  color: string
  name: string
}

const agents: AgentInfo[] = [
  { id: 'profile', color: '#7c3aed', name: '画像智能体' },
  { id: 'path', color: '#00d4ff', name: '路径规划' },
  { id: 'resource', color: '#06d6a0', name: '资源推荐' },
  { id: 'eval', color: '#f43f5e', name: '学习评估' },
  { id: 'feedback', color: '#3b82f6', name: '反馈优化' },
  { id: 'tutor', color: '#f59e0b', name: '智能辅导' },
]

const initialItems: TickerItem[] = [
  { agent: 'profile', text: '识别到「指针与内存」掌握度仅 42%，标记为薄弱知识域' },
  { agent: 'path', text: '在课后巩固阶段插入「二级指针专项训练」学习节点' },
  { agent: 'resource', text: '为薄弱点匹配了 5 个学习资源，包括思维导图和专项练习' },
  { agent: 'eval', text: '完成阶段性测评，发现 4 个知识盲点需要进一步巩固' },
  { agent: 'feedback', text: '已更新学习画像，指针类知识点优先级提升' },
  { agent: 'tutor', text: '准备好提供辅导，支持概念讲解、代码辅导、错题诊断等模式' },
]

const items = ref<TickerItem[]>([...initialItems])
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function getAgent(id: string) {
  return agents.find(a => a.id === id)
}

function nextItem() {
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

onMounted(() => {
  timer = setInterval(nextItem, 4500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="collaboration-log">
    <div class="log-header">
      <h3 class="log-title">多智能体协作</h3>
      <span class="log-desc">六位智能体协同工作，为你构建个性化学习体验</span>
    </div>
    
    <div class="log-container">
      <div class="log-track">
        <div 
          v-for="(item, i) in items" 
          :key="`${item.agent}-${i}`"
          class="log-entry"
          :class="{ 'log-entry-active': i === currentIndex }"
        >
          <div class="log-agent" :style="`color: ${getAgent(item.agent)?.color}`">
            {{ getAgent(item.agent)?.name }}
          </div>
          <div class="log-content">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collaboration-log {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 56px;
  position: relative;
  z-index: 3;
}

.log-header {
  text-align: center;
  margin-bottom: 32px;
}

.log-title {
  margin: 0;
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: 28px;
  font-weight: 400;
  color: #e8edf5;
  letter-spacing: -0.01em;
}

.log-desc {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: #8892b0;
  font-family: 'Outfit', 'Segoe UI', sans-serif;
}

.log-container {
  background: rgba(18, 22, 48, 0.75);
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 16px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}

.log-track {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.log-entry {
  display: flex;
  gap: 16px;
  padding: 14px 0;
  opacity: 0.4;
  transition: opacity 0.6s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-entry-active {
  opacity: 1;
}

.log-agent {
  flex-shrink: 0;
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 12px;
  font-weight: 500;
  padding-top: 2px;
  min-width: 90px;
}

.log-content {
  flex: 1;
  font-family: 'Outfit', 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #e8edf5;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .collaboration-log {
    padding: 0 24px;
    margin-top: 32px;
  }
  
  .log-title {
    font-size: 24px;
  }
  
  .log-container {
    padding: 20px;
  }
  
  .log-entry {
    flex-direction: column;
    gap: 4px;
  }
  
  .log-agent {
    min-width: auto;
  }
}
</style>
