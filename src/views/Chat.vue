<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import {
  Send,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  MessageCircle,
  User,
  BookOpen,
  Map,
  BarChart3,
  Sparkles,
  FileText,
  Play,
  Code,
  Target,
  ChevronDown,
  ArrowRight,
  Search,
  Plus,
  Star,
  Bot,
  Brain,
  Layers,
  Zap,
} from 'lucide-vue-next'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
  resources?: { type: string; title: string; color?: string; icon?: any }[]
  suggestions?: string[]
}

interface AgentNode {
  name: string
  icon: any
  status: 'idle' | 'active' | 'done'
  color: string
  desc: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是你的专属学习助手。我可以帮你制定学习计划、生成学习资源、解答问题。告诉我你想学什么？',
    time: '09:30',
    suggestions: ['帮我制定 Python 学习计划', '解释机器学习概念', '生成练习题'],
  },
])

const inputText = ref('')
const isStreaming = ref(false)
const streamContent = ref('')
const chatEndRef = ref<HTMLElement | null>(null)
const showAgentPanel = ref(false)
const selectedPreset = ref('')

const agents = ref<AgentNode[]>([
  { name: '画像分析', icon: User, status: 'idle', color: '#00d4ff', desc: '分析学习特征与能力水平' },
  { name: '资源生成', icon: BookOpen, status: 'idle', color: '#7c3aed', desc: '生成定制学习材料' },
  { name: '路径规划', icon: Map, status: 'idle', color: '#06d6a0', desc: '规划最优学习路径' },
  { name: '质量评估', icon: BarChart3, status: 'idle', color: '#f59e0b', desc: '评估学习效果与反馈' },
])

const historySessions = [
  { id: 1, title: 'Python 机器学习入门', time: '10分钟前' },
  { id: 2, title: '微积分复习 — 泰勒展开', time: '2小时前' },
  { id: 3, title: '数据结构与算法练习', time: '昨天' },
  { id: 4, title: '线性代数基础梳理', time: '3天前' },
  { id: 5, title: '深度学习基础概念', time: '5天前' },
]

const resourceIcons: Record<string, any> = {
  '≡': FileText,
  '◈': Map,
  '✎': FileText,
  '▶': Play,
}

const presets = [
  { icon: Sparkles, label: '制定学习计划', query: '帮我制定一份详细的学习计划' },
  { icon: Target, label: '生成练习题', query: '为我生成一组练习题' },
  { icon: FileText, label: '知识点讲解', query: '请详细讲解一个知识点' },
  { icon: BarChart3, label: '学习诊断', query: '分析我的学习薄弱点' },
]

const agentFlowActive = computed(() => agents.value.some(a => a.status === 'active'))

function scrollToBottom() {
  nextTick(() => {
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

function simulateStream(content: string, suggestions?: string[]) {
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
          { type: '≡', title: 'Python 机器学习入门指南', color: '#00d4ff' },
          { type: '◈', title: '知识图谱：ML 学习路线', color: '#7c3aed' },
          { type: '✎', title: '入门水平自测习题', color: '#06d6a0' },
        ],
        suggestions: suggestions || [
          '继续深入讲解',
          '给我一个代码示例',
          '推荐相关学习资源',
        ],
      })
      streamContent.value = ''
      resetAgents()
    }
  }, 25)
}

function runAgentPipeline(finalContent: string, suggestions?: string[]) {
  agents.value[0].status = 'active'
  setTimeout(() => { agents.value[0].status = 'done'; agents.value[1].status = 'active' }, 800)
  setTimeout(() => { agents.value[1].status = 'done'; agents.value[2].status = 'active' }, 1600)
  setTimeout(() => { agents.value[2].status = 'done'; agents.value[3].status = 'active' }, 2400)
  setTimeout(() => {
    agents.value[3].status = 'done'
    simulateStream(finalContent, suggestions)
  }, 3200)
}

function resetAgents() {
  agents.value.forEach(a => a.status = 'idle')
}

function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return
  selectedPreset.value = ''

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  })
  inputText.value = ''
  scrollToBottom()

  runAgentPipeline(
    '好的，我已经分析了你的需求。根据你的问题，我建议从基础概念开始，逐步深入实践。\n\n**关键要点：**\n\n1. **理解核心原理** — 先掌握基本概念和理论基础\n2. **动手实践** — 通过实际项目巩固所学知识\n3. **持续反馈** — 定期自测，查漏补缺\n\n> 学习是一个循序渐进的过程，不要急于求成。每天坚持学习，效果会越来越好。\n\n我已经为你准备了相关的学习资源，包括入门指南、知识图谱和自测习题。',
    ['继续深入讲解这部分', '给我一个代码示例', '推荐相关学习资源', '有哪些常见的坑？']
  )
}

function usePreset(p: typeof presets[0]) {
  selectedPreset.value = p.label
  inputText.value = p.query
  sendMessage()
}

function useSuggestion(s: string) {
  inputText.value = s
  sendMessage()
}

function copyMessage(content: string) {
  navigator.clipboard.writeText(content)
}

function getResourceIcon(type: string) {
  return resourceIcons[type] || FileText
}

function formatContent(content: string) {
  return content
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="cb"><code>$2</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\n/g, '<br/>')
}

onMounted(scrollToBottom)
</script>

<template>
  <div class="chat">
    <!-- Agent Pipeline Bar -->
    <div class="pipeline-bar">
      <div class="pipeline-flow">
        <div
          v-for="(a, i) in agents"
          :key="a.name"
          :class="['pipeline-node', a.status]"
          :style="{ '--node-color': a.color }"
        >
          <div class="node-indicator">
            <div class="node-ring">
              <component :is="a.icon" v-if="a.status !== 'done'" :size="14" stroke-width="1.5" />
              <span v-else class="node-check">✓</span>
            </div>
            <div v-if="a.status === 'active'" class="node-pulse" />
          </div>
          <div class="node-label">{{ a.name }}</div>
          <div v-if="i < agents.length - 1" class="node-connector">
            <div :class="['connector-track', { filled: a.status === 'done' }]" />
          </div>
        </div>
      </div>
      <button class="pipeline-toggle" @click="showAgentPanel = !showAgentPanel" :aria-expanded="showAgentPanel">
        <Layers :size="14" stroke-width="1.5" />
        <ChevronDown :size="12" :class="['toggle-icon', { open: showAgentPanel }]" />
      </button>
    </div>

    <!-- Agent Detail Panel -->
    <transition name="slide-up">
      <div v-if="showAgentPanel" class="agent-detail">
        <div v-for="a in agents" :key="a.name" class="agent-card" :style="{ '--accent': a.color }">
          <div class="agent-card-left">
            <div :class="['agent-badge', a.status]">
              <component :is="a.icon" v-if="a.status !== 'done'" :size="14" stroke-width="1.5" />
              <span v-else class="badge-done">✓</span>
            </div>
            <div class="agent-info">
              <span class="agent-name">{{ a.name }}</span>
              <span class="agent-desc">{{ a.desc }}</span>
            </div>
          </div>
          <span :class="['agent-status-tag', a.status]">
            {{ a.status === 'active' ? '分析中...' : a.status === 'done' ? '已完成' : '待命' }}
          </span>
        </div>
      </div>
    </transition>

    <div class="chat-body">
      <!-- History Sidebar -->
      <aside class="history-sidebar">
        <div class="sidebar-header">
          <h3 class="sidebar-title">对话历史</h3>
          <button class="sidebar-new">
            <Plus :size="14" stroke-width="2" />
            <span>新建</span>
          </button>
        </div>
        <div class="sidebar-search">
          <Search :size="14" stroke-width="1.5" class="search-icon" />
          <input type="text" placeholder="搜索对话..." />
        </div>
        <div class="sidebar-list">
          <button v-for="s in historySessions" :key="s.id" :class="['session-item', { current: s.id === 1 }]">
            <div class="session-category" :class="`cat-${s.id}`">
              {{ ['ML','数学','算法','数学','DL'][s.id-1] }}
            </div>
            <div class="session-info">
              <span class="session-title">{{ s.title }}</span>
              <span class="session-time">{{ s.time }}</span>
            </div>
          </button>
        </div>
        <div class="sidebar-footer">
          <div class="storage-bar">
            <span class="storage-text">存储 2.4 / 10 GB</span>
            <div class="storage-track">
              <div class="storage-fill" style="width:24%" />
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <div class="chat-main">
        <div class="messages-container">
          <!-- Presets (shown at start) -->
          <div v-if="messages.length === 1" class="welcome-section">
            <div class="welcome-header">
              <div class="welcome-avatar">
                <Brain :size="24" stroke-width="1.5" />
              </div>
              <h2 class="welcome-title">有什么我可以帮你的？</h2>
              <p class="welcome-desc">选择以下方向开始学习，或直接输入你的问题</p>
            </div>
            <div class="presets-grid">
              <button v-for="p in presets" :key="p.label" class="preset-card" @click="usePreset(p)">
                <div class="preset-icon">
                  <component :is="p.icon" :size="20" stroke-width="1.5" />
                </div>
                <span class="preset-label">{{ p.label }}</span>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['message', msg.role]"
          >
            <div class="message-avatar">
              <div class="avatar-content">
                {{ msg.role === 'assistant' ? 'AI' : '你' }}
              </div>
            </div>
            <div class="message-body">
              <div class="message-sender">{{ msg.role === 'assistant' ? 'EduMind 助手' : '你' }}</div>
              <div class="message-content" v-html="formatContent(msg.content)" />

              <!-- Resource chips -->
              <div v-if="msg.resources" class="resource-chips">
                <div v-for="r in msg.resources" :key="r.title" class="resource-chip" :style="{ '--chip-color': r.color || '#00d4ff' }">
                  <component :is="getResourceIcon(r.type)" :size="14" stroke-width="1.5" />
                  <span>{{ r.title }}</span>
                  <ArrowRight :size="12" class="chip-arrow" />
                </div>
              </div>

              <!-- Suggestions -->
              <div v-if="msg.suggestions && msg.role === 'assistant'" class="suggestions">
                <button v-for="s in msg.suggestions" :key="s" class="suggestion-chip" @click="useSuggestion(s)">
                  {{ s }}
                  <ArrowRight :size="11" class="suggestion-arrow" />
                </button>
              </div>

              <!-- Message Footer -->
              <div class="message-footer">
                <span class="message-time">{{ msg.time }}</span>
                <div v-if="msg.role === 'assistant'" class="message-actions">
                  <button class="action-btn" @click="copyMessage(msg.content)">
                    <Copy :size="13" stroke-width="1.5" />
                  </button>
                  <button class="action-btn">
                    <ThumbsUp :size="13" stroke-width="1.5" />
                  </button>
                  <button class="action-btn">
                    <ThumbsDown :size="13" stroke-width="1.5" />
                  </button>
                  <button class="action-btn">
                    <RefreshCw :size="13" stroke-width="1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Streaming indicator -->
          <div v-if="isStreaming" class="message assistant">
            <div class="message-avatar">
              <div class="avatar-content">AI</div>
            </div>
            <div class="message-body">
              <div class="message-sender">EduMind 助手</div>
              <div class="message-content" v-html="formatContent(streamContent)" />
              <div class="typing-indicator">
                <span class="typing-dot" /><span class="typing-dot" /><span class="typing-dot" />
              </div>
            </div>
          </div>

          <div ref="chatEndRef" />
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <button class="input-attach" aria-label="上传附件">
              <Paperclip :size="18" stroke-width="1.5" />
            </button>
            <input
              v-model="inputText"
              type="text"
              class="input-field"
              placeholder="输入你的问题或需求..."
              @keydown.enter="sendMessage"
              :disabled="isStreaming"
            />
            <div class="input-commands">
              <span class="cmd-hint">⌘K 命令</span>
              <span class="cmd-hint">@ 提及</span>
            </div>
            <button
              :class="['input-send', { active: inputText.trim() }]"
              @click="sendMessage"
              :disabled="isStreaming || !inputText.trim()"
            >
              <Send v-if="!isStreaming" :size="16" stroke-width="2" />
              <span v-else class="sending-dots">···</span>
            </button>
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
  background: transparent;
  position: relative;
  z-index: 1;
}

/* ====================== Pipeline Bar ====================== */
.pipeline-bar {
  display: flex;
  align-items: center;
  padding: 0 32px;
  height: 52px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.92);
  backdrop-filter: blur(20px);
  gap: 16px;
  flex-shrink: 0;
}

.pipeline-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}
.pipeline-flow::-webkit-scrollbar { display: none; }

.pipeline-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.3s var(--ease-out);
}

.node-indicator {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-ring {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.25);
  transition: all 0.3s var(--ease-out);
  z-index: 1;
}
.pipeline-node.active .node-ring {
  background: color-mix(in srgb, var(--node-color) 20%, transparent);
  color: var(--node-color);
  box-shadow: 0 0 16px color-mix(in srgb, var(--node-color) 30%, transparent);
}
.pipeline-node.done .node-ring {
  background: color-mix(in srgb, var(--node-color) 25%, transparent);
  color: var(--node-color);
}

.node-check { font-size: 13px; font-weight: 700; }

.node-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--node-color);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.85); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

.node-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  transition: color 0.3s var(--ease-out);
}
.pipeline-node.active .node-label { color: var(--node-color); }
.pipeline-node.done .node-label { color: rgba(255, 255, 255, 0.7); }

.node-connector {
  width: 24px;
  height: 2px;
  margin: 0 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
  overflow: hidden;
}
.connector-track {
  height: 100%;
  width: 0;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--node-color), var(--color-accent-cyan));
  transition: width 0.5s var(--ease-out);
}
.connector-track.filled { width: 100%; }

.pipeline-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text-tertiary);
  font-size: 12px;
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
}
.pipeline-toggle:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.toggle-icon { transition: transform 0.2s var(--ease-out); }
.toggle-icon.open { transform: rotate(180deg); }

/* ====================== Agent Detail ====================== */
.agent-detail {
  padding: 16px 32px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(10, 10, 24, 0.85);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.agent-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}
.agent-card:hover {
  border-color: color-mix(in srgb, var(--accent) 20%, transparent);
}

.agent-card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.agent-badge.active { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }
.agent-badge.done { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }

.badge-done { font-weight: 700; }

.agent-info { display: flex; flex-direction: column; gap: 1px; }
.agent-name { font-size: 13px; font-weight: 500; color: var(--color-text-primary); }
.agent-desc { font-size: 11px; color: var(--color-text-tertiary); }

.agent-status-tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  font-weight: 500;
}
.agent-status-tag.idle { background: rgba(255, 255, 255, 0.04); color: var(--color-text-tertiary); }
.agent-status-tag.active { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }
.agent-status-tag.done { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); }

/* ====================== Chat Body ====================== */
.chat-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ====================== History Sidebar ====================== */
.history-sidebar {
  width: 260px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: rgba(8, 8, 20, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 12px;
}

.sidebar-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.3px;
}

.sidebar-new {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.12));
  color: var(--color-accent-cyan);
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s var(--ease-out);
}
.sidebar-new:hover {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2));
}

.sidebar-search {
  padding: 0 16px 12px;
  position: relative;
}
.search-icon {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  opacity: 0.4;
}
.sidebar-search input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-primary);
  transition: border-color 0.2s var(--ease-out);
}
.sidebar-search input:focus { border-color: var(--color-accent-cyan); }
.sidebar-search input::placeholder { color: var(--color-text-tertiary); opacity: 0.6; }

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-align: left;
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
  width: 100%;
}
.session-item:hover {
  background: rgba(0, 212, 255, 0.03);
  border-color: rgba(0, 212, 255, 0.06);
}
.session-item.current {
  background: rgba(0, 212, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.1);
}

.session-category {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}
.cat-1 { background: rgba(0, 212, 255, 0.12); color: #00d4ff; }
.cat-2 { background: rgba(124, 58, 237, 0.12); color: #7c3aed; }
.cat-3 { background: rgba(6, 214, 160, 0.12); color: #06d6a0; }
.cat-4 { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
.cat-5 { background: rgba(244, 63, 94, 0.12); color: #f43f5e; }

.session-info { flex: 1; min-width: 0; }
.session-title {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.session-time {
  display: block;
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
}

.storage-bar { display: flex; flex-direction: column; gap: 6px; }
.storage-text { font-size: 10px; color: var(--color-text-tertiary); }
.storage-track {
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}
.storage-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-purple));
}

/* ====================== Main Chat Area ====================== */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: transparent;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ====================== Welcome / Presets ====================== */
.welcome-section {
  padding: 40px 20px;
  text-align: center;
}

.welcome-header {
  margin-bottom: 32px;
}

.welcome-avatar {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15));
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.welcome-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
}

.welcome-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.preset-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--ease-out);
  text-align: center;
}
.preset-card:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.preset-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  transition: all 0.3s var(--ease-out);
}
.preset-card:hover .preset-icon {
  background: rgba(0, 212, 255, 0.15);
  transform: scale(1.05);
}

.preset-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.3;
}

/* ====================== Messages ====================== */
.message {
  display: flex;
  gap: 14px;
  max-width: 780px;
  animation: message-in 0.3s var(--ease-out);
}
.message.user { margin-left: auto; flex-direction: row-reverse; }

@keyframes message-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-avatar {
  flex-shrink: 0;
}

.avatar-content {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.message.assistant .avatar-content {
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
}
.message.user .avatar-content {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.message-body { flex: 1; min-width: 0; }

.message-sender {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  margin-bottom: 6px;
  display: block;
  letter-spacing: 0.3px;
}

.message-content {
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.75;
  white-space: pre-wrap;
  color: var(--color-text-primary);
}
.message.assistant .message-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}
.message.user .message-content {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.08));
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.message-content :deep(strong) { color: #fff; font-weight: 600; }
.message-content :deep(blockquote) {
  border-left: 2px solid var(--color-accent-cyan);
  padding: 8px 16px;
  margin: 8px 0;
  background: rgba(0, 212, 255, 0.04);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
  font-style: italic;
}
.message-content :deep(.cb) {
  display: block;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-accent-cyan);
}

/* Resource Chips */
.resource-chips {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.resource-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  font-size: 12px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}
.resource-chip:hover {
  border-color: var(--chip-color);
  background: color-mix(in srgb, var(--chip-color) 8%, transparent);
}
.resource-chip :first-child { color: var(--chip-color); flex-shrink: 0; }
.chip-arrow { color: var(--color-text-tertiary); opacity: 0; transition: all 0.2s var(--ease-out); }
.resource-chip:hover .chip-arrow { opacity: 1; color: var(--chip-color); transform: translateX(3px); }

/* Suggestions */
.suggestions { margin-top: 10px; }

.suggestion-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  margin: 0 6px 6px 0;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.1);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}
.suggestion-chip:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}
.suggestion-arrow { opacity: 0; transition: all 0.2s var(--ease-out); }
.suggestion-chip:hover .suggestion-arrow { opacity: 1; transform: translateX(3px); }

/* Message Footer */
.message-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
  padding: 0 4px;
}

.message-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.message-actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s var(--ease-out);
}
.message:hover .message-actions { opacity: 1; }
@media (hover: none) { .message-actions { opacity: 1; } }

.action-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}
.action-btn:hover { color: var(--color-accent-cyan); background: rgba(0, 212, 255, 0.08); }

/* Typing indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 4px 0;
}
.typing-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  animation: typing-bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes typing-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-4px); opacity: 1; }
}

/* ====================== Input Area ====================== */
.input-area {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(20px);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px 6px 16px;
  border-radius: 16px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  transition: all 0.2s var(--ease-out);
  max-width: 800px;
  margin: 0 auto;
}
.input-wrapper:focus-within {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.06);
}

.input-attach {
  display: flex;
  padding: 6px;
  color: var(--color-text-tertiary);
  transition: color 0.2s var(--ease-out);
  flex-shrink: 0;
}
.input-attach:hover { color: var(--color-accent-cyan); }

.input-field {
  flex: 1;
  padding: 8px 6px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
  min-height: 24px;
}
.input-field::placeholder { color: var(--color-text-tertiary); opacity: 0.6; }

.input-commands {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.cmd-hint {
  font-size: 10px;
  color: var(--color-text-tertiary);
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  opacity: 0.6;
}

.input-send {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
}
.input-send.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
}
.input-send:hover:not(:disabled).active { transform: scale(1.05); }
.sending-dots { letter-spacing: 3px; font-weight: 700; }

/* ====================== Responsive ====================== */
@media (max-width: 768px) {
  .presets-grid { grid-template-columns: repeat(2, 1fr); }
  .history-sidebar { display: none; }
  .messages-container { padding: 20px 16px; }
  .pipeline-bar { padding: 0 16px; }
  .input-area { padding: 12px 12px 16px; }
  .input-commands { display: none; }
}
</style>
