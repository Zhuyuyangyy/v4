<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowRight,
  BookOpen,
  Clock,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from 'lucide-vue-next'
import { askTutoringQuestion, fetchTutoringHistory, fetchTutoringTopics, agentTutoring, fetchLatestProfile } from '@/lib/api'
import type { TutoringHistoryItem, MultimodalContent } from '@/types/api'

const route = useRoute()

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

const inputText = ref('')
const isSending = ref(false)
const messages = ref<ChatMessage[]>([])
const historyItems = ref<TutoringHistoryItem[]>([])
const topics = ref<Array<{ id: string; label: string; category: string }>>([])
const selectedMode = ref('qa')
const chatEndRef = ref<HTMLElement | null>(null)

const modes = [
  { value: 'qa', label: '问答', icon: MessageSquare },
  { value: 'explain', label: '讲解', icon: BookOpen },
  { value: 'practice', label: '练习', icon: Lightbulb },
]

function getTime() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  setTimeout(() => {
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  }, 50)
}

async function loadHistory() {
  try {
    historyItems.value = await fetchTutoringHistory()
  } catch {
    historyItems.value = []
  }
}

async function loadTopics() {
  try {
    const data = await fetchTutoringTopics()
    const rawTopics = (data as any).topics || data
    if (Array.isArray(rawTopics) && rawTopics.length > 0) {
      if (rawTopics[0].questions) {
        topics.value = rawTopics.flatMap((cat: any, ci: number) =>
          (cat.questions || []).map((q: string, qi: number) => ({
            id: `topic-${ci}-${qi}`,
            label: q,
            category: cat.label,
          }))
        )
      } else {
        topics.value = rawTopics
      }
    }
  } catch {
    topics.value = []
  }
}

async function sendQuestion(text?: string) {
  const question = (text || inputText.value).trim()
  if (!question || isSending.value) return

  isSending.value = true
  inputText.value = ''

  messages.value.push({
    id: `user-${Date.now()}`,
    role: 'user',
    content: question,
    time: getTime(),
  })
  scrollToBottom()

  try {
    let answer = ''
    try {
      const profile = await fetchLatestProfile().catch(() => undefined)
      const agentResult = await agentTutoring({
        question,
        mode: selectedMode.value,
        profile,
      })
      answer = agentResult.answer
    } catch {
      const reply = await askTutoringQuestion(question, selectedMode.value, 'preview')
      answer = reply.answer
    }
    messages.value.push({
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: answer,
      time: getTime(),
    })
  } catch {
    messages.value.push({
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: '抱歉，辅导服务暂时不可用，请稍后再试。',
      time: getTime(),
    })
  }

  isSending.value = false
  scrollToBottom()
}

function useTopic(topic: { label: string }) {
  inputText.value = `请帮我讲解：${topic.label}`
  sendQuestion(`请帮我讲解：${topic.label}`)
}

function useHistoryItem(item: TutoringHistoryItem) {
  inputText.value = item.q
  sendQuestion(item.q)
}

onMounted(() => {
  loadHistory()
  loadTopics()

  const queryQ = route.query.q as string
  if (queryQ) {
    inputText.value = queryQ
    sendQuestion(queryQ)
  }
})
</script>

<template>
  <div class="tutoring">
    <div class="tutoring-body">
      <aside class="tutoring-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">辅导主题</h3>
          <div class="topic-list">
            <button v-for="topic in topics" :key="topic.id" class="topic-item" @click="useTopic(topic)">
              <Sparkles :size="14" stroke-width="1.5" />
              <span>{{ topic.label }}</span>
            </button>
            <div v-if="topics.length === 0" class="empty-hint">暂无主题</div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">辅导历史</h3>
          <div class="history-list">
            <button v-for="(item, i) in historyItems" :key="i" class="history-item" @click="useHistoryItem(item)">
              <span class="history-q">{{ item.q }}</span>
              <span class="history-meta">{{ item.mode }} · {{ item.time }}</span>
            </button>
            <div v-if="historyItems.length === 0" class="empty-hint">暂无历史</div>
          </div>
        </div>
      </aside>

      <div class="tutoring-main">
        <div class="messages-container">
          <div v-if="messages.length === 0" class="welcome-section">
            <div class="welcome-icon">
              <BookOpen :size="32" stroke-width="1.5" />
            </div>
            <h2 class="welcome-title">智能辅导</h2>
            <p class="welcome-subtitle">选择辅导模式，输入你的问题，AI 将为你提供个性化辅导</p>
            <div class="mode-selector">
              <button
                v-for="mode in modes"
                :key="mode.value"
                :class="['mode-btn', { active: selectedMode === mode.value }]"
                @click="selectedMode = mode.value"
              >
                <component :is="mode.icon" :size="16" stroke-width="1.5" />
                <span>{{ mode.label }}</span>
              </button>
            </div>
          </div>

          <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
            <div class="message-avatar">
              {{ msg.role === 'assistant' ? 'AI' : '你' }}
            </div>
            <div class="message-body">
              <div class="message-content">{{ msg.content }}</div>
              <span class="message-time">{{ msg.time }}</span>
            </div>
          </div>

          <div v-if="isSending" class="message assistant">
            <div class="message-avatar">AI</div>
            <div class="message-body">
              <div class="typing-indicator">
                <span class="typing-dot" /><span class="typing-dot" /><span class="typing-dot" />
              </div>
            </div>
          </div>

          <div ref="chatEndRef" />
        </div>

        <div class="input-area">
          <div class="input-wrapper">
            <div class="mode-chips">
              <button
                v-for="mode in modes"
                :key="mode.value"
                :class="['mode-chip', { active: selectedMode === mode.value }]"
                @click="selectedMode = mode.value"
              >
                <component :is="mode.icon" :size="12" stroke-width="1.5" />
              </button>
            </div>
            <input
              v-model="inputText"
              type="text"
              class="input-field"
              placeholder="输入你的问题..."
              @keydown.enter="sendQuestion()"
              :disabled="isSending"
            />
            <button
              :class="['input-send', { active: inputText.trim() && !isSending }]"
              @click="sendQuestion()"
              :disabled="!inputText.trim() || isSending"
            >
              <Send :size="16" stroke-width="2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tutoring {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
  background: transparent;
  position: relative;
  z-index: 1;
}

.tutoring-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.tutoring-sidebar {
  width: 240px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: rgba(8, 8, 20, 0.5);
  backdrop-filter: blur(8px);
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-section {
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 10px;
}

.topic-list,
.history-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  text-align: left;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.topic-item:hover {
  background: rgba(0, 212, 255, 0.04);
  border-color: rgba(0, 212, 255, 0.1);
  color: var(--color-accent-cyan);
}

.history-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  text-align: left;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.history-item:hover {
  background: rgba(0, 212, 255, 0.04);
  border-color: rgba(0, 212, 255, 0.1);
}

.history-q {
  font-size: 12px;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-meta {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.empty-hint {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding: 8px 0;
}

.tutoring-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px;
}

.welcome-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.12));
  color: var(--color-accent-cyan);
  margin-bottom: 20px;
}

.welcome-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 8px;
}

.welcome-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  max-width: 400px;
  margin-bottom: 24px;
}

.mode-selector {
  display: flex;
  gap: 10px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text-secondary);
  font-size: 13px;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.mode-btn.active {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.message {
  display: flex;
  gap: 12px;
  max-width: 700px;
  animation: msg-in 0.3s var(--ease-out);
}

.message.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

@keyframes msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.message.assistant .message-avatar {
  background: linear-gradient(135deg, #00d4ff, #3b82f6);
  color: #fff;
}

.message.user .message-avatar {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.7;
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

.message-time {
  display: block;
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
  padding-left: 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
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

.input-area {
  padding: 12px 24px 16px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(20px);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px 6px 12px;
  border-radius: 14px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  max-width: 700px;
  margin: 0 auto;
  transition: border-color 0.2s var(--ease-out);
}

.input-wrapper:focus-within {
  border-color: var(--color-accent-cyan);
}

.mode-chips {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.mode-chip {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.mode-chip.active {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.08);
}

.input-field {
  flex: 1;
  padding: 8px 6px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
}

.input-field::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.6;
}

.input-send {
  width: 36px;
  height: 36px;
  border-radius: 10px;
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

@media (max-width: 768px) {
  .tutoring-sidebar { display: none; }
  .messages-container { padding: 16px; }
  .input-area { padding: 10px 12px 14px; }
}
</style>
