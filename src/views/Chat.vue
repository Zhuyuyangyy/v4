<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
  resources?: { type: string; title: string }[]
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是你的专属学习助手。我可以帮你制定学习计划、生成学习资源、解答问题。告诉我你想学什么？',
    time: '09:30',
  },
])

const inputText = ref('')
const isStreaming = ref(false)
const streamContent = ref('')
const chatEndRef = ref<HTMLElement | null>(null)
const showAgentPanel = ref(false)

const agents = [
  { name: '画像分析', status: 'idle', color: '#00d4ff' },
  { name: '资源生成', status: 'idle', color: '#7c3aed' },
  { name: '路径规划', status: 'idle', color: '#06d6a0' },
  { name: '质量评估', status: 'idle', color: '#f59e0b' },
]

const historySessions = [
  { id: 1, title: 'Python 机器学习入门', time: '10分钟前' },
  { id: 2, title: '微积分复习 — 泰勒展开', time: '2小时前' },
  { id: 3, title: '数据结构与算法练习', time: '昨天' },
  { id: 4, title: '线性代数基础梳理', time: '3天前' },
]

function scrollToBottom() {
  nextTick(() => {
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

function simulateStream(content: string) {
  isStreaming.value = true
  streamContent.value = ''
  let i = 0
  const chars = content.split('')
  const interval = setInterval(() => {
    if (i < chars.length) {
      streamContent.value += chars[i]
      i++
      scrollToBottom()
    } else {
      clearInterval(interval)
      isStreaming.value = false
      messages.value.push({
        id: Date.now(),
        role: 'assistant',
        content: content,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        resources: [
          { type: '≡', title: 'Python 机器学习入门指南' },
          { type: '◈', title: '知识图谱：ML 学习路线' },
          { type: '✎', title: '入门水平自测习题' },
        ],
      })
      streamContent.value = ''
    }
  }, 30)
}

function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  })
  inputText.value = ''
  scrollToBottom()

  // Simulate agent activation
  agents[0].status = 'active'
  setTimeout(() => { agents[0].status = 'done'; agents[1].status = 'active' }, 1500)
  setTimeout(() => { agents[1].status = 'done'; agents[2].status = 'active' }, 2500)
  setTimeout(() => { agents[2].status = 'done'; agents[3].status = 'active' }, 3500)
  setTimeout(() => {
    agents[3].status = 'done'
    simulateStream('好的，我已经分析了你的需求。根据你的问题，我建议从基础概念开始，逐步深入实践。我已经为你准备了相关的学习资源，包括入门指南、知识图谱和自测习题。你可以从这些资源开始，遇到问题随时问我！')
  }, 4000)
}

onMounted(scrollToBottom)
</script>

<template>
  <div class="chat">
    <!-- Agent Status Bar -->
    <div class="agent-bar">
      <div class="agent-bar-inner">
        <span class="agent-bar-label">智能体状态</span>
        <div class="agent-dots">
          <div v-for="a in agents" :key="a.name" class="agent-dot-group">
            <span
              :class="['agent-dot', a.status]"
              :style="{ '--dot-color': a.color }"
            />
            <span class="agent-dot-name">{{ a.name }}</span>
          </div>
        </div>
        <button class="agent-toggle" @click="showAgentPanel = !showAgentPanel">
          {{ showAgentPanel ? '收起' : '详情' }}
          <span :class="['toggle-arrow', { open: showAgentPanel }]">▾</span>
        </button>
      </div>
    </div>

    <!-- Agent Detail Panel -->
    <transition name="slide-up">
      <div v-if="showAgentPanel" class="agent-panel">
        <div v-for="a in agents" :key="a.name" class="agent-row">
          <div class="agent-info">
            <span :class="['agent-status-badge', a.status]" :style="{ '--accent': a.color }" />
            <span class="agent-name">{{ a.name }}</span>
          </div>
          <span :class="['agent-status-text', a.status]">
            {{ a.status === 'idle' ? '待命' : a.status === 'active' ? '工作中...' : '完成' }}
          </span>
        </div>
      </div>
    </transition>

    <div class="chat-container">
      <!-- History Sidebar -->
      <aside class="history-sidebar">
        <div class="history-header">
          <h3>历史会话</h3>
          <button class="new-chat-btn">+ 新建</button>
        </div>
        <div class="history-search">
          <span class="search-icon">→</span>
          <input type="text" placeholder="搜索会话..." />
        </div>
        <div class="history-list">
          <button
            v-for="s in historySessions"
            :key="s.id"
            class="history-item"
            :class="{ active: s.id === 1 }"
          >
            <span class="history-title">{{ s.title }}</span>
            <span class="history-time">{{ s.time }}</span>
          </button>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <div class="chat-main">
        <!-- Messages -->
        <div class="messages-area">
          <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
            <div class="message-avatar">
              {{ msg.role === 'assistant' ? 'AI' : 'U' }}
            </div>
            <div class="message-body">
              <div class="message-content">{{ msg.content }}</div>
              <!-- Resource cards -->
              <div v-if="msg.resources" class="resource-cards">
                <div v-for="r in msg.resources" :key="r.title" class="resource-card">
                  <span class="resource-icon">{{ r.type }}</span>
                  <span class="resource-title">{{ r.title }}</span>
                </div>
              </div>
              <div class="message-time">{{ msg.time }}</div>
            </div>
          </div>

          <!-- Streaming message -->
          <div v-if="isStreaming" class="message assistant">
            <div class="message-avatar">AI</div>
            <div class="message-body">
              <div class="message-content streaming">
                {{ streamContent }}<span class="cursor" />
              </div>
            </div>
          </div>

          <div ref="chatEndRef" />
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <button class="attach-btn" title="上传附件">
              <span class="attach-icon">+</span>
            </button>
            <input
              v-model="inputText"
              type="text"
              class="chat-input"
              placeholder="输入你的问题或需求..."
              @keydown.enter="sendMessage"
              :disabled="isStreaming"
            />
            <button
              :class="['send-btn', { active: inputText.trim() }]"
              @click="sendMessage"
              :disabled="isStreaming || !inputText.trim()"
            >
              {{ isStreaming ? '···' : '→' }}
            </button>
          </div>
          <div class="input-hint">
            支持 Markdown 格式 · 可上传文档/图片/代码
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
}

/* === Agent Bar === */
.agent-bar {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px);
  flex-shrink: 0;
}

.agent-bar-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 24px;
  font-size: 13px;
}

.agent-bar-label {
  color: var(--color-text-tertiary);
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.agent-dots {
  display: flex;
  gap: 16px;
  flex: 1;
}

.agent-dot-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.agent-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all var(--duration-normal) var(--ease-out);
}

.agent-dot.idle {
  background: rgba(255, 255, 255, 0.1);
}

.agent-dot.active {
  background: var(--dot-color);
  box-shadow: 0 0 12px var(--dot-color);
  animation: glow-pulse 1s ease-in-out infinite;
}

.agent-dot.done {
  background: var(--dot-color);
  box-shadow: 0 0 6px var(--dot-color);
}

.agent-dot-name {
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.agent-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text-tertiary);
  font-size: 12px;
  transition: color var(--duration-fast) var(--ease-out);
}
.agent-toggle:hover {
  color: var(--color-accent-cyan);
}

.toggle-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.toggle-arrow.open {
  transform: rotate(180deg);
}

/* === Agent Panel === */
.agent-panel {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-tertiary);
}

.agent-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.agent-status-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.agent-status-badge.idle { background: rgba(255,255,255,0.15); }
.agent-status-badge.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: glow-pulse 1s ease-in-out infinite; }
.agent-status-badge.done { background: var(--accent); box-shadow: 0 0 6px var(--accent); }

.agent-name {
  font-size: 13px;
  font-weight: 500;
}

.agent-status-text {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* === Chat Container === */
.chat-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* === History Sidebar === */
.history-sidebar {
  width: 260px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: var(--color-bg-glass);
  flex-shrink: 0;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.history-header h3 {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.new-chat-btn {
  font-size: 13px;
  color: var(--color-accent-cyan);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all var(--duration-fast) var(--ease-out);
}
.new-chat-btn:hover {
  background: rgba(0, 212, 255, 0.1);
}

.history-search {
  padding: 0 16px 12px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: 12px;
  opacity: 0.6;
}

.history-search input {
  width: 100%;
  padding: 8px 12px 8px 32px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  font-size: 13px;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.history-search input:focus {
  border-color: var(--color-accent-cyan);
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.history-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: var(--radius-sm);
  text-align: left;
  transition: all var(--duration-fast) var(--ease-out);
}
.history-item:hover {
  background: rgba(0, 212, 255, 0.04);
}
.history-item.active {
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.15);
}

.history-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.history-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* === Main Chat === */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 800px;
  animation: reveal-up 0.3s var(--ease-out);
}

.message.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.message.assistant .message-avatar {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
}

.message.user .message-avatar {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-content {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
}

.message.assistant .message-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.message.user .message-content {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.12));
  border: 1px solid rgba(0, 212, 255, 0.15);
}

.message-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 6px;
  padding: 0 4px;
}

.streaming .cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: var(--color-accent-cyan);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 0.8s step-end infinite;
}

/* === Resource Cards === */
.resource-cards {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.resource-card:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
  transform: translateY(-1px);
}

.resource-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 13px;
  border-radius: 4px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.resource-title {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

/* === Input === */
.input-area {
  padding: 20px 24px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-glass);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.input-wrapper:focus-within {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);
}

.attach-btn {
  padding: 12px 4px;
  color: var(--color-text-tertiary);
  transition: color var(--duration-fast) var(--ease-out);
}
.attach-btn:hover {
  color: var(--color-accent-cyan);
}

.attach-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1.5px solid currentColor;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.chat-input {
  flex: 1;
  padding: 14px 8px;
  font-size: 14px;
  color: var(--color-text-primary);
}
.chat-input::placeholder {
  color: var(--color-text-tertiary);
}

.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.04);
  transition: all var(--duration-fast) var(--ease-out);
}
.send-btn.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
}
.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.input-hint {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-align: center;
  margin-top: 8px;
}
</style>
