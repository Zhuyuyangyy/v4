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
const showAgentPanel = ref(true)
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
    '好的，我已经分析了你的需求。根据你的问题，我建议从基础概念开始，逐步深入实践。\n\n**关键要点：**\n\n1. **理解核心原理** — 先掌握基本概念和理论基础\n2. **动手实践** — 通过实际项目巩固所学知识\n3. **持续反馈** — 定期自测，查漏补缺\n\n> 学习是一个循序渐进的过程，不要急于求成。每天坚持学习，效果会越来越好。\n\n我已经为你准备了相关的学习资源，包括入门指南、知识图谱和自测习题。你可以从这些资源开始，遇到问题随时问我！',
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
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\n/g, '<br/>')
}

onMounted(scrollToBottom)
</script>

<template>
  <div class="chat">
    <!-- Agent Orchestration Bar -->
    <div class="agent-bar">
      <div class="agent-bar-inner">
        <div class="agent-flow">
          <div
            v-for="(a, i) in agents"
            :key="a.name"
            :class="['agent-step', a.status]"
            :style="{ '--accent': a.color }"
          >
            <div class="step-indicator">
              <component :is="a.icon" v-if="a.status !== 'done'" :size="14" stroke-width="1.5" class="step-svg" />
              <span v-else class="step-check">✓</span>
              <div v-if="a.status === 'active'" class="step-pulse" />
            </div>
            <div class="step-info">
              <span class="step-name">{{ a.name }}</span>
            </div>
            <div v-if="i < agents.length - 1" class="step-connector">
              <div v-if="a.status === 'done'" class="connector-fill" />
            </div>
          </div>
        </div>
        <button
          class="agent-toggle"
          @click="showAgentPanel = !showAgentPanel"
          :aria-label="showAgentPanel ? '收起智能体详情' : '展开智能体详情'"
          :aria-expanded="showAgentPanel"
        >
          <span>{{ showAgentPanel ? '收起' : '详情' }}</span>
          <ChevronDown :size="14" :class="['toggle-arrow', { open: showAgentPanel }]" />
        </button>
      </div>
    </div>

    <!-- Agent Detail Panel -->
    <transition name="slide-up">
      <div v-if="showAgentPanel" class="agent-detail-panel" role="region" aria-label="智能体详情">
        <div
          v-for="a in agents"
          :key="a.name"
          :class="['agent-row', a.status]"
          :style="{ '--accent': a.color }"
        >
          <div class="agent-row-left">
            <span :class="['agent-badge', a.status]">
              <component :is="a.icon" v-if="a.status !== 'done'" :size="14" stroke-width="1.5" />
              <span v-else>✓</span>
            </span>
            <div>
              <div class="agent-row-name">{{ a.name }}</div>
              <div class="agent-row-desc">{{ a.desc }}</div>
            </div>
          </div>
          <div class="agent-row-right">
            <span v-if="a.status === 'active'" class="status-badge working">
              <span class="status-dot" /> 分析中...
            </span>
            <span v-else-if="a.status === 'done'" class="status-badge done">已完成</span>
            <span v-else class="status-badge idle">待命中</span>
          </div>
        </div>
      </div>
    </transition>

    <div class="chat-container">
      <!-- History Sidebar -->
      <aside class="history-sidebar" aria-label="历史会话">
        <div class="history-header">
          <h3>历史会话</h3>
          <button class="new-chat-btn" aria-label="新建会话">+ 新建</button>
        </div>
        <div class="history-search">
          <Search :size="14" class="search-icon" aria-hidden="true" />
          <input type="text" placeholder="搜索会话..." aria-label="搜索历史会话" />
        </div>
        <div class="history-list" role="list">
          <button
            v-for="s in historySessions"
            :key="s.id"
            :class="['history-item', { active: s.id === 1 }]"
            role="listitem"
          >
            <div class="history-item-top">
              <span class="history-category" :class="`cat-${s.id}`">
                {{ ['ML', '数学', '算法', '数学', 'DL'][s.id - 1] }}
              </span>
              <span class="history-title">{{ s.title }}</span>
            </div>
            <span class="history-time">{{ s.time }}</span>
          </button>
        </div>
        <div class="history-footer">
          <span class="history-storage">已使用 2.4 GB / 10 GB</span>
          <div class="history-storage-bar">
            <div class="history-storage-fill" style="width: 24%" />
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <div class="chat-main">
        <!-- Messages -->
        <div class="messages-area" role="log" aria-label="对话消息" aria-live="polite">
          <!-- Presets -->
          <div v-if="messages.length === 1" class="presets-section">
            <div class="presets-label">快速开始</div>
            <div class="presets-grid">
              <button
                v-for="p in presets"
                :key="p.label"
                :class="['preset-card', { active: selectedPreset === p.label }]"
                @click="usePreset(p)"
                :aria-label="p.label"
              >
                <component :is="p.icon" :size="22" stroke-width="1.5" class="preset-svg" aria-hidden="true" />
                <span class="preset-label">{{ p.label }}</span>
              </button>
            </div>
          </div>

          <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
            <div class="message-avatar" aria-hidden="true">
              <span class="avatar-inner">{{ msg.role === 'assistant' ? 'AI' : 'U' }}</span>
              <div v-if="msg.role === 'assistant'" class="avatar-ring" />
            </div>
            <div class="message-body">
              <div class="message-sender">{{ msg.role === 'assistant' ? 'EduMind AI' : '你' }}</div>
              <div class="message-content" v-html="formatContent(msg.content)" />

              <!-- Resource cards -->
              <div v-if="msg.resources" class="resource-strip">
                <div
                  v-for="r in msg.resources"
                  :key="r.title"
                  class="resource-chip"
                  :style="{ '--chip-color': r.color || '#00d4ff' }"
                  role="button"
                  tabindex="0"
                  :aria-label="r.title"
                >
                  <component :is="getResourceIcon(r.type)" :size="16" stroke-width="1.5" class="chip-svg" />
                  <span class="chip-title">{{ r.title }}</span>
                  <ArrowRight :size="14" class="chip-action" />
                </div>
              </div>

              <!-- Suggestions -->
              <div v-if="msg.suggestions && msg.role === 'assistant'" class="suggestions">
                <span class="suggestions-label">继续对话 ▾</span>
                <div class="suggestions-list">
                  <button
                    v-for="s in msg.suggestions"
                    :key="s"
                    class="suggestion-chip"
                    @click="useSuggestion(s)"
                  >
                    {{ s }}
                    <ArrowRight :size="12" class="suggestion-arrow" />
                  </button>
                </div>
              </div>

              <div class="message-footer">
                <span class="message-time">{{ msg.time }}</span>
                <div v-if="msg.role === 'assistant'" class="message-actions">
                  <button class="msg-action" aria-label="复制内容" @click="copyMessage(msg.content)">
                    <Copy :size="14" stroke-width="1.5" />
                  </button>
                  <button class="msg-action" aria-label="有用">
                    <ThumbsUp :size="14" stroke-width="1.5" />
                  </button>
                  <button class="msg-action" aria-label="无用">
                    <ThumbsDown :size="14" stroke-width="1.5" />
                  </button>
                  <button class="msg-action" aria-label="重新生成">
                    <RefreshCw :size="14" stroke-width="1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Streaming message -->
          <div v-if="isStreaming" class="message assistant">
            <div class="message-avatar" aria-hidden="true">
              <span class="avatar-inner">AI</span>
              <div class="avatar-ring" />
            </div>
            <div class="message-body">
              <div class="message-sender">EduMind AI</div>
              <div class="message-content" v-html="formatContent(streamContent)" />
              <div class="streaming-indicator" aria-label="AI 正在输入">
                <span class="streaming-dot" />
                <span class="streaming-dot" />
                <span class="streaming-dot" />
              </div>
            </div>
          </div>

          <div ref="chatEndRef" />
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <button class="attach-btn" aria-label="上传附件">
              <Paperclip :size="18" stroke-width="1.5" />
            </button>
            <input
              v-model="inputText"
              type="text"
              class="chat-input"
              placeholder="输入你的问题或需求..."
              @keydown.enter="sendMessage"
              :disabled="isStreaming"
              aria-label="输入消息"
            />
            <button
              :class="['send-btn', { active: inputText.trim() }]"
              @click="sendMessage"
              :disabled="isStreaming || !inputText.trim()"
              :aria-label="isStreaming ? '发送中' : '发送消息'"
            >
              <Send v-if="!isStreaming" :size="16" stroke-width="2" />
              <span v-else class="sending-dots">···</span>
            </button>
          </div>
          <div class="input-tools">
            <span class="tool-badge">⌘K 命令</span>
            <span class="tool-badge">@ 提及智能体</span>
            <span class="tool-badge">/ 选择模式</span>
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

/* === Agent Orchestration Bar === */
.agent-bar {
  border-bottom: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.9);
  backdrop-filter: blur(16px);
  flex-shrink: 0;
}

.agent-bar-inner {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 16px;
}

@media (min-width: 1024px) {
  .agent-bar-inner {
    padding: 12px 24px;
    gap: 20px;
  }
}

.agent-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}
.agent-flow::-webkit-scrollbar { display: none; }

.agent-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  flex-shrink: 0;
}

.step-indicator {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-svg {
  color: rgba(255, 255, 255, 0.25);
  transition: color var(--duration-normal) var(--ease-out);
  z-index: 1;
}

.step-check {
  font-size: 14px;
  color: var(--color-accent-emerald);
  z-index: 1;
}

.agent-step.active .step-svg,
.agent-step.done .step-svg {
  color: #fff;
}

.step-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: ring-expand 1.5s ease-out infinite;
}

.step-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.35);
  transition: color var(--duration-normal) var(--ease-out);
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .step-name { font-size: 13px; }
}

.agent-step.active .step-name,
.agent-step.done .step-name {
  color: #fff;
}

.step-connector {
  width: 20px;
  height: 2px;
  position: relative;
  margin: 0 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
  overflow: hidden;
}

.connector-fill {
  height: 100%;
  background: var(--color-accent-cyan);
  animation: connector-flow 0.6s var(--ease-out);
}

@keyframes connector-flow {
  from { width: 0; }
  to { width: 100%; }
}

.agent-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-tertiary);
  font-size: 12px;
  padding: 8px 12px;
  min-height: 36px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-out);
  flex-shrink: 0;
}
.agent-toggle:hover {
  color: var(--color-accent-cyan);
  border-color: rgba(0, 212, 255, 0.3);
}

.toggle-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.toggle-arrow.open { transform: rotate(180deg); }

/* === Agent Detail Panel === */
.agent-detail-panel {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(12, 12, 30, 0.8);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 1024px) {
  .agent-detail-panel {
    padding: 16px 24px;
  }
}

.agent-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  min-height: 44px;
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast) var(--ease-out);
}
.agent-row:hover { background: rgba(255, 255, 255, 0.02); }

.agent-row-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-badge {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.agent-badge.active {
  background: rgba(0, 212, 255, 0.1);
  color: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}
.agent-badge.done {
  background: rgba(6, 214, 160, 0.15);
  color: var(--color-accent-emerald);
}

.agent-row-name {
  font-size: 13px;
  font-weight: 500;
}
.agent-row-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.status-badge {
  font-size: 11px;
  padding: 4px 12px;
  min-height: 28px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.status-badge.idle { background: rgba(255,255,255,0.04); color: var(--color-text-tertiary); }
.status-badge.working { background: rgba(0,212,255,0.1); color: var(--color-accent-cyan); }
.status-badge.done { background: rgba(6,214,160,0.1); color: var(--color-accent-emerald); }

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  animation: glow-pulse 1s ease-in-out infinite;
}

/* === Chat Container === */
.chat-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* === History Sidebar === */
.history-sidebar {
  width: 240px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 24, 0.5);
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .history-sidebar { width: 260px; }
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 12px;
}

@media (min-width: 1024px) {
  .history-header { padding: 20px 20px 12px; }
}

.history-header h3 {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #fff;
}

.new-chat-btn {
  font-size: 12px;
  color: var(--color-accent-cyan);
  padding: 6px 14px;
  min-height: 32px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all var(--duration-fast) var(--ease-out);
  font-weight: 500;
}
.new-chat-btn:hover {
  background: rgba(0, 212, 255, 0.1);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
}

.history-search {
  padding: 0 12px 12px;
  position: relative;
}
@media (min-width: 1024px) {
  .history-search { padding: 0 16px 12px; }
}

.search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  opacity: 0.5;
}
@media (min-width: 1024px) {
  .search-icon { left: 28px; }
}

.history-search input {
  width: 100%;
  padding: 8px 12px 8px 32px;
  min-height: 36px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.history-search input:focus {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.06);
}
.history-search input::placeholder { color: var(--color-text-tertiary); }

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (min-width: 1024px) {
  .history-list { padding: 0 12px 12px; }
}

.history-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  min-height: 44px;
  border-radius: var(--radius-sm);
  text-align: left;
  transition: all var(--duration-fast) var(--ease-out);
  border: 1px solid transparent;
  width: 100%;
}
.history-item:hover {
  background: rgba(0, 212, 255, 0.03);
  border-color: rgba(0, 212, 255, 0.06);
}
.history-item.active {
  background: rgba(0, 212, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.12);
}

.history-item-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.history-category {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.cat-1 { background: rgba(0, 212, 255, 0.12); color: #00d4ff; }
.cat-2 { background: rgba(124, 58, 237, 0.12); color: #7c3aed; }
.cat-3 { background: rgba(6, 214, 160, 0.12); color: #06d6a0; }
.cat-4 { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
.cat-5 { background: rgba(244, 63, 94, 0.12); color: #f43f5e; }

.history-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.history-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-left: auto;
}

.history-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  .history-footer { padding: 16px 20px; }
}

.history-storage {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.history-storage-bar {
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  margin-top: 6px;
  overflow: hidden;
}
.history-storage-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-purple));
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 1024px) {
  .messages-area { padding: 24px 32px; gap: 28px; }
}

/* === Presets === */
.presets-section {
  margin-bottom: 8px;
}

.presets-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (min-width: 768px) {
  .presets-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
}

.preset-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  min-height: 80px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
  text-align: center;
}
.preset-card:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.preset-card.active {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
}

.preset-svg {
  color: var(--color-accent-cyan);
}

.preset-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* === Messages === */
.message {
  display: flex;
  gap: 12px;
  max-width: 820px;
  animation: reveal-up 0.3s var(--ease-out);
}

.message.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-inner {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.message.assistant .avatar-inner {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
}

.message.user .avatar-inner {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.avatar-ring {
  position: absolute;
  inset: -3px;
  border-radius: calc(var(--radius-sm) + 3px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  animation: glow-pulse 3s ease-in-out infinite;
}

.message-sender {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  margin-bottom: 6px;
  letter-spacing: 0.3px;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-content {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 14px;
  line-height: 1.75;
  white-space: pre-wrap;
}

.message.assistant .message-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.message.user .message-content {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.12);
}

.message-content :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.message-content :deep(blockquote) {
  border-left: 3px solid var(--color-accent-cyan);
  padding: 8px 16px;
  margin: 8px 0;
  background: rgba(0, 212, 255, 0.04);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.message-content :deep(.code-block) {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 16px;
  margin: 8px 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-accent-cyan);
}

/* === Resource Strip === */
.resource-strip {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.resource-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  min-height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.resource-chip:hover {
  border-color: var(--chip-color);
  background: rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.chip-svg {
  color: var(--chip-color);
  flex-shrink: 0;
}

.chip-title {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--color-text-primary);
}

.chip-action {
  color: var(--color-text-tertiary);
  transition: transform var(--duration-fast) var(--ease-out);
  flex-shrink: 0;
}
.resource-chip:hover .chip-action {
  color: var(--chip-color);
  transform: translateX(3px);
}

/* === Suggestions === */
.suggestions {
  margin-top: 12px;
}

.suggestions-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.3px;
  margin-bottom: 6px;
  display: block;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.suggestion-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  min-height: 36px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.12);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.suggestion-chip:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.suggestion-arrow {
  opacity: 0;
  transition: all var(--duration-fast) var(--ease-out);
}
.suggestion-chip:hover .suggestion-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* === Message Footer === */
.message-footer {
  display: flex;
  align-items: center;
  gap: 16px;
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
  align-items: center;
  gap: 2px;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.message:hover .message-actions {
  opacity: 1;
}

@media (hover: none) {
  .message-actions { opacity: 1; }
}

.msg-action {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: var(--color-text-tertiary);
  transition: all var(--duration-fast) var(--ease-out);
}
.msg-action:hover {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
}

/* === Streaming Indicator === */
.streaming-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 4px 0;
  align-items: center;
}

.streaming-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  animation: streaming-bounce 1s ease-in-out infinite;
}
.streaming-dot:nth-child(2) { animation-delay: 0.15s; }
.streaming-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes streaming-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-4px); opacity: 1; }
}

/* === Input === */
.input-area {
  padding: 14px 16px 18px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.8);
  backdrop-filter: blur(12px);
}

@media (min-width: 1024px) {
  .input-area { padding: 16px 24px 20px; }
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 4px 4px 14px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-out);
}
.input-wrapper:focus-within {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.08), inset 0 0 20px rgba(0, 212, 255, 0.02);
}

.attach-btn {
  padding: 8px;
  color: var(--color-text-tertiary);
  transition: color var(--duration-fast) var(--ease-out);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  min-width: 36px;
}
.attach-btn:hover {
  color: var(--color-accent-cyan);
}

.chat-input {
  flex: 1;
  padding: 10px 8px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
  min-height: 24px;
}
.chat-input::placeholder {
  color: var(--color-text-tertiary);
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.04);
  transition: all var(--duration-fast) var(--ease-out);
  flex-shrink: 0;
}
.send-btn.active {
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
}
.send-btn:hover:not(:disabled).active {
  transform: scale(1.05);
}

.sending-dots {
  letter-spacing: 2px;
  font-weight: 700;
}

.input-tools {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  padding: 0 2px;
  flex-wrap: wrap;
}

.tool-badge {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding: 4px 10px;
  min-height: 26px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
}

@media (max-width: 768px) {
  .presets-grid { grid-template-columns: repeat(2, 1fr); }
  .history-sidebar { display: none; }
  .messages-area { padding: 16px; }
}
</style>
