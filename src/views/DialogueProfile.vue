<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import {
  ArrowRight, Brain, Check, Copy, Lightbulb, RefreshCw,
  RotateCcw, Send, Sparkles, ThumbsDown, ThumbsUp, X, Wand2,
  User, BookOpen, Route, Server, Atom, Key,
  Paperclip, Smile, Rocket, Clock, ChevronUp,
  Star, ChartLine, CirclePlus,
} from 'lucide-vue-next'
import { useDialogueProfile } from '@/composables/useDialogueProfile'
import ProfileResults from '@/components/tutor/ProfileResults.vue'

const {
  phase, messages, result,
  analysisProgress, analysisMessage,
  dimensions, collectedCount, totalCount, progressPercent, canGenerate,
  getGreeting, addMessage, processMessage, generateProfileResult, reset: resetProfile,
} = useDialogueProfile()

const inputText = ref('')
const isSending = ref(false)
const isStreaming = ref(false)
const streamContent = ref('')
const showFullReport = ref(false)
const chatEndRef = ref<HTMLElement | null>(null)
const showApiKey = ref(false)
const whisperMode = ref(false)

/* ── Virtual human state ── */
const vhStatus = computed(() => {
  if (isStreaming.value || isSending.value) return 'speaking'
  if (phase.value === 'generating' || phase.value === 'greeting') return 'thinking'
  return 'listening'
})

const vhStatusLabel: Record<string, string> = {
  listening: '在线评估中',
  speaking: '回复中',
  thinking: '深度思考中',
}

/* ── Chat ── */
function scrollToBottom() {
  nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'smooth' }))
}

async function sendMessage(text?: string) {
  const content = (text ?? inputText.value).trim()
  if (!content || isSending.value || isStreaming.value) return
  inputText.value = ''
  isSending.value = true
  addMessage('user', content)
  scrollToBottom()
  await delay(150)
  const { assistantContent } = processMessage(content)
  isStreaming.value = true
  streamContent.value = ''
  const chars = assistantContent.split('')
  for (let i = 0; i < chars.length; i++) {
    streamContent.value += chars[i]
    scrollToBottom()
    await delay(14 + Math.random() * 16)
  }
  isStreaming.value = false
  isSending.value = false
  addMessage('assistant', assistantContent)
  streamContent.value = ''
  scrollToBottom()
}

function quickSend(text: string) { inputText.value = text; sendMessage() }

const starters = [
  '我是在校学生，学计算机的',
  '我是程序员，工作3年了',
  '我刚开始学AI，想转行',
]

async function invokeGenerate() {
  if (isSending.value || isStreaming.value) return
  if (phase.value === 'complete' && result.value) { showFullReport.value = true; return }
  addMessage('user', '生成我的学习画像报告')
  scrollToBottom()
  await delay(300)
  isSending.value = true
  const genMsg = addMessage('assistant', '正在为您绘制全脑画像，请稍候...')
  scrollToBottom()
  await generateProfileResult()
  genMsg.content = `画像已生成！综合评分：**${result.value?.totalScore ?? 0} 分**`
  isSending.value = false
  scrollToBottom()
}

function formatContent(c: string) {
  return c.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="cb"><code>$2</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\n/g, '<br/>')
}

function copyMsg(c: string) { navigator.clipboard.writeText(c) }

function initChat() { if (messages.value.length === 0) addMessage('assistant', getGreeting()) }
function handleReset() { resetProfile(); initChat() }

onMounted(() => setTimeout(initChat, 400))
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

/* ── Score preview for right panel after generation ── */
const scoreRings = computed(() => {
  if (!result.value) return []
  return result.value.dimensions.slice(0, 4).map(d => ({
    label: d.label,
    value: d.value,
    color: d.color,
  }))
})
</script>

<template>
  <div class="page">
    <!-- Background nebulas -->
    <div class="nebula n1" />
    <div class="nebula n2" />
    <div class="nebula n3" />

    <!-- Modal -->
    <transition name="fade">
      <div v-if="showFullReport && result" class="modal-mask" @click.self="showFullReport = false">
        <div class="modal-bg" />
        <div class="modal-wrap">
          <ProfileResults :result="result" @close="showFullReport = false" />
        </div>
      </div>
    </transition>

    <!-- ═══════════ MAIN GRID ═══════════ -->
    <main class="grid-main">

      <!-- ══════ LEFT SIDEBAR ══════ -->
      <aside class="sidebar">
        <!-- Logo -->
        <div class="panel logo-panel">
          <div class="logo-accent" />
          <div class="logo-row">
            <span class="logo-icon">🤖</span>
            <span class="logo-text">小智 AI</span>
            <span class="logo-badge">Beta</span>
          </div>
          <p class="logo-sub">🧠 对话式画像诊断沙盘</p>
        </div>

        <!-- ════════════════════════════════════════════════
             VIRTUAL HUMAN SLOT — 虚拟人区域
             替换下方 .vh-body 为你的虚拟人组件
             接收 status: 'listening' | 'speaking' | 'thinking'
             ════════════════════════════════════════════════ -->
        <div class="panel vh-panel">
          <div class="vh-glow" />
          <div class="vh-body">
            <!-- 虚拟人 Avatar 占位 -->
            <div class="vh-avatar" :class="vhStatus">
              <!-- SVG Robot Face -->
              <svg viewBox="0 0 100 100" class="vh-svg">
                <defs>
                  <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#06b6d4" />
                    <stop offset="50%" stop-color="#8b5cf6" />
                    <stop offset="100%" stop-color="#ec4899" />
                  </linearGradient>
                </defs>
                <path d="M50,12 L50,4 M40,4 L60,4" stroke="url(#vg)" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="50" cy="46" r="26" fill="rgba(12,15,38,0.9)" stroke="url(#vg)" stroke-width="1.5"/>
                <rect x="33" y="38" width="34" height="12" rx="6" fill="url(#vg)" opacity="0.85" />
                <circle cx="43" cy="44" r="2.5" fill="#fff" class="eye-pulse" />
                <circle cx="57" cy="44" r="2.5" fill="#fff" class="eye-pulse" />
                <path d="M38,62 Q50,68 62,62" stroke="url(#vg)" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M22,82 C30,73 45,71 50,71 C55,71 70,73 78,82 L72,92 L28,92 Z" fill="rgba(12,15,38,0.8)" stroke="url(#vg)" stroke-width="1.5"/>
              </svg>
              <span class="vh-status-dot" />
            </div>
            <h3 class="vh-name">AI 诊断官 · 小智</h3>
            <p class="vh-desc">基于自适应大模型，通过多轮交互智能探测并建立您的学习成长拓扑画像。</p>
          </div>
        </div>
        <!-- ════════════════════════════════════════════════
             VIRTUAL HUMAN SLOT — END
             ════════════════════════════════════════════════ -->

        <!-- Quick Actions -->
        <div class="panel">
          <div class="panel-title">快捷面板</div>
          <div class="qa-grid">
            <button class="qa-btn" @click="invokeGenerate()">
              <Wand2 :size="16" class="qa-icon purple" />
              <span class="qa-lbl">生成画像</span>
              <span class="qa-sub">多维技术评定</span>
            </button>
            <button class="qa-btn" @click="quickSend('帮我分析一下我的学习情况')">
              <BookOpen :size="16" class="qa-icon blue" />
              <span class="qa-lbl">知识图谱</span>
              <span class="qa-sub">诊断定位现状</span>
            </button>
            <button class="qa-btn" @click="quickSend('帮我制定一个学习计划')">
              <Route :size="16" class="qa-icon pink" />
              <span class="qa-lbl">自适应计划</span>
              <span class="qa-sub">定制进阶路线</span>
            </button>
            <button class="qa-btn" @click="result ? showFullReport = true : invokeGenerate()">
              <Server :size="16" class="qa-icon green" />
              <span class="qa-lbl">报告存档</span>
              <span class="qa-sub">阅览历史快照</span>
            </button>
          </div>
        </div>

        <!-- Quick Questions -->
        <div class="panel qa-list-panel">
          <div class="panel-title">快捷对答预设</div>
          <div class="qq-list">
            <button v-for="s in starters" :key="s" class="qq-btn" @click="quickSend('你问我答：' + s)">
              <span>{{ s }}</span>
              <ArrowRight :size="12" class="qq-arw" />
            </button>
          </div>
          <div class="panel-footer">🔒 SECURE LINK · AES 256</div>
        </div>
      </aside>

      <!-- ══════ CENTER CHAT ══════ -->
      <section class="chat-col">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="ch-left">
            <div class="ch-avatar-ring">
              <span class="ch-ring-spin" />
              <Atom :size="20" class="ch-atom" />
            </div>
            <div>
              <div class="ch-title-row">
                <h2 class="ch-title">AI 导师 · 小智</h2>
                <span class="ch-badge">NEURAL ENGINE</span>
              </div>
              <div class="ch-status-row">
                <span class="ch-status-dot" :class="vhStatus" />
                <span class="ch-status-text">{{ vhStatusLabel[vhStatus] }}</span>
                <div class="ch-waves">
                  <span v-for="i in 5" :key="i" class="ch-wave" />
                </div>
              </div>
            </div>
          </div>
          <div class="ch-progress">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none" />
              <circle cx="16" cy="16" r="13" stroke="#818cf8" stroke-width="2.5" fill="none"
                stroke-linecap="round"
                :stroke-dasharray="81.68"
                :stroke-dashoffset="81.68 * (1 - progressPercent / 100)"
                transform="rotate(-90 16 16)"
              />
            </svg>
            <span class="ch-prog-text">{{ progressPercent }}%</span>
            <span class="ch-prog-lbl">画像进度</span>
          </div>
        </div>

        <!-- Messages -->
        <div class="chat-msgs">
          <div class="chat-msgs-inner">
            <div v-for="msg in messages" :key="msg.id" :class="['msg-row', msg.role]">
              <div v-if="msg.role === 'assistant'" class="msg-av ai-av">
                <Atom :size="12" />
              </div>
              <div v-if="msg.role === 'user'" class="msg-av user-av">
                <User :size="12" />
              </div>
              <div class="msg-body">
                <div class="msg-bubble" :class="msg.role">
                  <span v-html="formatContent(msg.content)" />
                </div>
                <div class="msg-meta">
                  <span>{{ msg.time }}</span>
                  <button v-if="msg.role === 'assistant'" class="msg-copy" @click="copyMsg(msg.content)">
                    <Copy :size="10" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Streaming -->
            <div v-if="isStreaming" class="msg-row assistant">
              <div class="msg-av ai-av"><Atom :size="12" /></div>
              <div class="msg-body">
                <div class="msg-bubble assistant">
                  <span v-html="formatContent(streamContent)" /><span class="cursor">▌</span>
                </div>
              </div>
            </div>

            <!-- Typing indicator (idle listening) -->
            <div v-if="!isStreaming && !isSending && messages.length > 0 && phase !== 'complete'" class="typing-bar">
              <span class="typing-dot" /><span class="typing-dot" /><span class="typing-dot" />
              <span class="typing-txt">小智正在聆听...</span>
            </div>

            <!-- Generating -->
            <div v-if="phase === 'generating'" class="gen-area">
              <div class="gen-spin" />
              <span>{{ analysisMessage }}</span>
            </div>

            <div ref="chatEndRef" />
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <div class="engine-bar">
            <label class="toggle-wrap">
              <input type="checkbox" v-model="whisperMode" class="toggle-input" />
              <div class="toggle-track" />
              <span class="toggle-lbl">🤖 Gemini 2.5 极速诊断模式</span>
            </label>
            <span class="engine-status">📝 引导问答模式 (本地智能回复)</span>
          </div>

          <div v-if="whisperMode" class="api-row">
            <Key :size="14" class="api-icon" />
            <input type="password" class="api-input" placeholder="输入 Gemini API Key 体验真实多轮脑力激荡..." />
          </div>

          <div class="input-wrap">
            <div class="input-actions">
              <button class="ia-btn" title="上传附件"><CirclePlus :size="16" /></button>
              <button class="ia-btn" title="表情"><Smile :size="16" /></button>
            </div>
            <textarea
              v-model="inputText"
              class="input-field"
              placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"
              rows="2"
              @keydown.enter.prevent="!isSending && !isStreaming && sendMessage()"
              :disabled="isSending || isStreaming || phase === 'generating'"
            />
            <button
              :class="['send-btn', { on: inputText.trim() }]"
              :disabled="!inputText.trim() || isSending || isStreaming || phase === 'generating'"
              @click="sendMessage()"
            >
              <Send :size="14" />
            </button>
          </div>
        </div>
      </section>

      <!-- ══════ RIGHT DASHBOARD ══════ -->
      <aside class="dash-col">
        <!-- Progress Ring -->
        <div class="panel">
          <div class="panel-title">采集完成度</div>
          <div class="dash-ring-area">
            <div class="dash-ring-wrap">
              <div class="dash-ring-bg-glow" />
              <svg viewBox="0 0 112 112" class="dash-ring-svg">
                <circle cx="56" cy="56" r="44" stroke="rgba(255,255,255,0.04)" stroke-width="6" fill="none" />
                <circle cx="56" cy="56" r="44" stroke="rgba(99,102,241,0.08)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
                <circle cx="56" cy="56" r="44" stroke="url(#drg)" stroke-width="7" fill="none"
                  stroke-linecap="round"
                  :stroke-dasharray="276.5"
                  :stroke-dashoffset="276.5 * (1 - progressPercent / 100)"
                  transform="rotate(-90 56 56)"
                  class="dash-ring-arc"
                />
                <defs>
                  <linearGradient id="drg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#06b6d4" />
                    <stop offset="40%" stop-color="#8b5cf6" />
                    <stop offset="100%" stop-color="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="dash-ring-center">
                <span class="dash-pct">{{ progressPercent }}%</span>
                <span class="dash-pct-lbl">已完成</span>
              </div>
            </div>
            <div class="dash-ring-stats">
              <div class="dash-stat">
                <span class="dash-stat-dot green" />
                <span>已采集维度 <strong>{{ collectedCount }}/{{ totalCount }}</strong></span>
              </div>
              <div class="dash-stat">
                <span class="dash-stat-dot blue" />
                <span>部分采集 <strong>0/{{ totalCount }}</strong></span>
              </div>
              <div class="dash-stat">
                <span class="dash-stat-dot gray" />
                <span>待采集 <strong>{{ totalCount - collectedCount }}/{{ totalCount }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Generating progress -->
          <div v-if="phase === 'generating'" class="dash-gen">
            <div class="dash-gen-track"><div class="dash-gen-fill" :style="{width:analysisProgress+'%'}" /></div>
            <span class="dash-gen-txt">{{ analysisMessage }}</span>
          </div>

          <!-- Result preview -->
          <div v-if="phase === 'complete' && result" class="dash-gen">
            <div class="dash-score-row">
              <span>综合评分</span>
              <strong>{{ result.totalScore }}</strong>
            </div>
            <div class="dash-mini-bars">
              <div v-for="d in result.dimensions.slice(0,4)" :key="d.label" class="dash-mini-bar">
                <span class="dash-mini-lbl">{{ d.label }}</span>
                <div class="dash-mini-track"><div class="dash-mini-fill" :style="{width:d.value+'%',background:d.color}" /></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dimension Checklist -->
        <div class="panel">
          <div class="panel-title-row">
            <span class="panel-title">维度深度校验盘</span>
            <button class="panel-collapse"><ChevronUp :size="10" /></button>
          </div>
          <div class="dim-list">
            <div
              v-for="d in dimensions"
              :key="d.key"
              :class="['dim-item', { done: d.collected }]"
            >
              <span class="dim-check">
                <Check v-if="d.collected" :size="9" stroke-width="3" />
                <span v-else class="dim-bolt">⚡</span>
              </span>
              <div class="dim-info">
                <span class="dim-lbl">{{ d.label }}</span>
                <span class="dim-val">{{ d.collected ? d.value : d.label + '...' }}</span>
              </div>
              <ChevronUp :size="10" class="dim-chev" />
            </div>
          </div>
        </div>

        <!-- Generate -->
        <div class="panel gen-panel">
          <div class="gen-condition">
            <span>全景画像生成</span>
            <span class="gen-cond-text">{{ collectedCount === totalCount ? '✨ 维度已全部集齐！' : '需完成所有维度采集' }}</span>
          </div>
          <button
            :class="['gen-btn', { ready: canGenerate || phase === 'complete' }]"
            :disabled="!canGenerate && phase !== 'complete'"
            @click="invokeGenerate()"
          >
            <Rocket :size="14" />
            <span>{{ phase === 'complete' ? '查看完整报告' : '绘制并启动全脑画像' }}</span>
          </button>
          <button class="reset-btn" @click="handleReset">
            <Clock :size="13" />
            <span>重置采集沙盒</span>
          </button>
        </div>

        <!-- Score -->
        <div class="panel">
          <div class="panel-title-row">
            <span class="panel-title">实时多维能力评级</span>
            <span class="panel-title-sub">(画像生成后修正)</span>
          </div>
          <div class="score-area">
            <div class="score-big">
              <div class="score-big-val">
                {{ result?.totalScore ?? '--' }}<span class="score-big-unit">/100</span>
              </div>
              <div class="score-stars">
                <Star v-for="i in 5" :key="i" :size="10" :class="{ filled: result && i <= Math.round(result.totalScore / 20) }" />
              </div>
            </div>
            <div class="score-bars">
              <div v-for="sr in scoreRings" :key="sr.label" class="score-bar-row">
                <div class="sbr-top">
                  <span>{{ sr.label }}</span>
                  <span class="sbr-val">{{ sr.value }}</span>
                </div>
                <div class="sbr-track">
                  <div class="sbr-fill" :style="{ width: sr.value + '%', background: sr.color }" />
                </div>
              </div>
              <div v-if="!result" class="score-placeholder">
                <div v-for="i in 4" :key="i" class="sbr-track placeholder"><div class="sbr-fill" style="width:60%;background:rgba(255,255,255,0.04)" /></div>
              </div>
            </div>
          </div>

          <button class="report-btn" @click="result ? showFullReport = true : invokeGenerate()">
            <ChartLine :size="13" />
            <span>深度阅览脑图分析报告</span>
            <ArrowRight :size="11" />
          </button>
        </div>
      </aside>
    </main>

    <!-- Toast -->
    <div class="toast" id="toast-el">
      <span>✅ 已就绪</span>
    </div>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════ */
.page {
  --hdr: calc(var(--header-height, 56px));
  min-height: calc(100vh - var(--hdr));
  background: #030512;
  position: relative;
  z-index: 1;
  font-family: 'Noto Sans SC', sans-serif;
  padding: 16px 16px 0;
}

/* Nebulas */
.nebula {
  position: fixed;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}
.n1 { top: 10%; left: 15%; width: 550px; height: 550px; background: rgba(99,102,241,0.08); }
.n2 { bottom: 15%; right: 10%; width: 600px; height: 600px; background: rgba(168,85,247,0.06); }
.n3 { top: 60%; left: 45%; width: 400px; height: 400px; background: rgba(6,182,212,0.04); }

/* ═══════════════════════════════════════════
   GRID
   ═══════════════════════════════════════════ */
.grid-main {
  max-width: 1650px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr 280px;
  gap: 20px;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - var(--hdr) - 32px);
}

@media (max-width: 1300px) { .grid-main { grid-template-columns: 180px 1fr 240px; gap: 16px; } }
@media (max-width: 1024px) { .grid-main { grid-template-columns: 1fr; } }

/* ── Panel base ── */
.panel {
  background: rgba(10, 12, 32, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 16px 18px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.panel:hover {
  border-color: rgba(99, 102, 241, 0.2);
}
.panel-title {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.panel-title-sub {
  font-size: 8.5px;
  color: rgba(255, 255, 255, 0.2);
  margin-left: auto;
  font-weight: 400;
}
.panel-collapse {
  display: flex;
  padding: 4px;
  color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.panel-collapse:hover { color: rgba(255, 255, 255, 0.5); }
.panel-footer {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 9px;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  font-family: monospace;
  letter-spacing: 0.1em;
}

/* ═══════════════════════════════════════════
   LEFT SIDEBAR
   ═══════════════════════════════════════════ */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Logo */
.logo-panel {
  position: relative;
  overflow: hidden;
}
.logo-accent {
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: linear-gradient(to bottom, #6366f1, #a855f7, #f43f5e);
  box-shadow: 0 0 10px rgba(139,92,246,0.4);
}
.logo-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.logo-icon { font-size: 18px; }
.logo-text {
  font-size: 15px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.05em;
}
.logo-badge {
  font-size: 8px;
  padding: 1px 6px;
  border-radius: 100px;
  background: linear-gradient(90deg, #6366f1, #a855f7);
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 10px rgba(99,102,241,0.3);
}
.logo-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* ═══════════════════════════════════════════
   VIRTUAL HUMAN SLOT — 虚拟人接入区
   ═══════════════════════════════════════════ */
.vh-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.vh-glow {
  position: absolute;
  width: 120px; height: 120px;
  background: linear-gradient(to top right, rgba(168,85,247,0.08), rgba(59,130,246,0.08));
  border-radius: 50%;
  filter: blur(30px);
  top: 16px;
  transition: all 0.5s ease;
}
.vh-panel:hover .vh-glow { transform: scale(1.2); }
.vh-body { position: relative; z-index: 1; }

.vh-avatar {
  position: relative;
  width: 96px; height: 96px;
  margin: 0 auto 12px;
  border-radius: 50%;
  border: 2px solid rgba(99, 102, 241, 0.15);
  padding: 5px;
  background: rgba(3,5,18,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  box-shadow: 0 0 20px rgba(99,102,241,0.1);
}
.vh-avatar.speaking {
  border-color: rgba(6,182,212,0.5);
  box-shadow: 0 0 30px rgba(6,182,212,0.15);
}
.vh-avatar.thinking {
  border-color: rgba(168,85,247,0.5);
  box-shadow: 0 0 30px rgba(168,85,247,0.15);
  animation: ringPulse 2s ease-in-out infinite;
}
@keyframes ringPulse { 50% { box-shadow: 0 0 40px rgba(168,85,247,0.25); } }

.vh-svg { width: 100%; height: 100%; }
.eye-pulse { animation: blink 3s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }

.vh-status-dot {
  position: absolute;
  bottom: 6px; right: 6px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid #0a0d24;
  box-shadow: 0 0 8px rgba(16,185,129,0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot { 50% { opacity: 0.5; } }

.vh-name {
  font-size: 13px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 4px;
  letter-spacing: 0.02em;
}
.vh-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
  line-height: 1.5;
}

/* Quick Actions */
.qa-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.qa-btn {
  padding: 10px 8px;
  border-radius: 12px;
  background: rgba(26, 32, 77, 0.45);
  border: 1px solid rgba(99, 102, 241, 0.08);
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}
.qa-btn:hover {
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(26, 32, 77, 0.6);
}
.qa-icon { margin-bottom: 4px; }
.qa-icon.purple { color: #a855f7; }
.qa-icon.blue { color: #3b82f6; }
.qa-icon.pink { color: #f43f5e; }
.qa-icon.green { color: #10b981; }
.qa-lbl {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2px;
}
.qa-sub {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.25);
}

/* Quick Questions */
.qa-list-panel { display: flex; flex-direction: column; }

.qq-list { display: flex; flex-direction: column; gap: 6px; }

.qq-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(3,5,18,0.5);
  border: 1px solid rgba(255,255,255,0.04);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}
.qq-btn:hover {
  border-color: rgba(99, 102, 241, 0.2);
  color: rgba(255, 255, 255, 0.6);
}
.qq-arw {
  color: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.qq-btn:hover .qq-arw {
  color: #818cf8;
  transform: translateX(2px);
}

/* ═══════════════════════════════════════════
   CENTER CHAT
   ═══════════════════════════════════════════ */
.chat-col {
  display: flex;
  flex-direction: column;
  background: rgba(10, 12, 32, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  overflow: hidden;
  height: calc(100vh - var(--hdr) - 32px);
  position: relative;
}
.chat-col::before, .chat-col::after {
  content: '';
  position: absolute;
  width: 8px; height: 8px;
  border-color: rgba(139, 92, 246, 0.3);
  border-style: solid;
  pointer-events: none;
  z-index: 5;
}
.chat-col::before { top: 0; left: 0; border-width: 1.5px 0 0 1.5px; }
.chat-col::after { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  background: rgba(3,5,18,0.5);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.ch-left { display: flex; align-items: center; gap: 12px; }
.ch-avatar-ring {
  position: relative;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(26,32,77,0.4);
  border: 1px solid rgba(99,102,241,0.2);
  display: flex; align-items: center; justify-content: center;
}
.ch-ring-spin {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-top-color: rgba(99,102,241,0.3);
  animation: spin 6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ch-atom { color: #818cf8; }
.ch-title-row { display: flex; align-items: center; gap: 6px; margin-bottom: 2px; }
.ch-title { font-size: 13px; font-weight: 900; color: rgba(255,255,255,0.9); margin: 0; }
.ch-badge {
  font-size: 7px;
  padding: 1px 6px;
  border-radius: 100px;
  background: linear-gradient(90deg, rgba(168,85,247,0.1), rgba(99,102,241,0.1));
  color: rgba(165, 180, 252, 0.8);
  border: 1px solid rgba(99,102,241,0.15);
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 0.05em;
}
.ch-status-row { display: flex; align-items: center; gap: 6px; }
.ch-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}
.ch-status-dot.listening { background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.5); }
.ch-status-dot.speaking { background: #06b6d4; box-shadow: 0 0 6px rgba(6,182,212,0.5); animation: pulse-dot 1s ease infinite; }
.ch-status-dot.thinking { background: #a855f7; box-shadow: 0 0 6px rgba(168,85,247,0.5); animation: pulse-dot 0.6s ease infinite; }

.ch-status-text { font-size: 11px; color: rgba(255,255,255,0.4); }
.ch-waves { display: flex; align-items: flex-end; gap: 1.5px; height: 12px; margin-left: 6px; }
.ch-wave {
  width: 2.5px;
  background: #818cf8;
  border-radius: 2px;
  animation: wave 1s ease-in-out infinite;
}
.ch-wave:nth-child(1) { height: 6px; animation-delay: 0s; }
.ch-wave:nth-child(2) { height: 10px; animation-delay: 0.15s; }
.ch-wave:nth-child(3) { height: 14px; animation-delay: 0.3s; }
.ch-wave:nth-child(4) { height: 8px; animation-delay: 0.45s; }
.ch-wave:nth-child(5) { height: 4px; animation-delay: 0.6s; }
@keyframes wave { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

.ch-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(3,5,18,0.5);
  border: 1px solid rgba(99,102,241,0.08);
  position: relative;
}
.ch-prog-text {
  font-size: 11px;
  font-weight: 700;
  color: #818cf8;
  font-family: monospace;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.ch-prog-lbl {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.3);
  margin-left: 4px;
}

/* Messages */
.chat-msgs {
  flex: 1;
  overflow-y: auto;
  position: relative;
  background: rgba(3,5,18,0.2);
}
.chat-msgs-inner {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
}

.msg-row {
  display: flex;
  gap: 10px;
  max-width: 85%;
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.msg-row.user { flex-direction: row-reverse; margin-left: auto; }
.msg-av {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ai-av {
  background: rgba(21,26,68,0.8);
  border: 1px solid rgba(99,102,241,0.15);
  color: #818cf8;
}
.user-av {
  background: linear-gradient(135deg, #2563eb, #6366f1);
  border: 1px solid rgba(99,102,241,0.2);
  color: #fff;
  box-shadow: 0 0 10px rgba(99,102,241,0.2);
}
.msg-body { max-width: 100%; }
.msg-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
}
.msg-bubble.assistant {
  background: rgba(15,18,53,0.9);
  border: 1px solid rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.8);
  border-top-left-radius: 4px;
}
.msg-bubble.user {
  background: linear-gradient(135deg, #2563eb, #6366f1);
  color: #fff;
  border-top-right-radius: 4px;
  box-shadow: 0 4px 15px rgba(59,130,246,0.1);
}
.msg-bubble :deep(strong) { color: #fff; }
.msg-bubble :deep(blockquote) {
  border-left: 2px solid #818cf8; padding: 4px 12px; margin: 4px 0;
  background: rgba(99,102,241,0.04); border-radius: 0 6px 6px 0;
  color: rgba(255,255,255,0.4); font-style: italic;
}
.msg-bubble :deep(.cb) {
  display: block; background: rgba(0,0,0,0.3); padding: 10px; margin: 4px 0;
  border: 1px solid rgba(255,255,255,0.04); border-radius: 8px;
  font-size: 11px; color: #06b6d4; overflow-x: auto;
}
.cursor { animation: blink 0.8s step-end infinite; color: #818cf8; }
@keyframes blink { 50% { opacity: 0; } }

.msg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  font-size: 8px;
  color: rgba(255,255,255,0.2);
}
.msg-row.user .msg-meta { justify-content: flex-end; }
.msg-copy {
  display: flex;
  padding: 2px;
  border-radius: 4px;
  color: rgba(255,255,255,0.2);
  transition: all 0.2s ease;
  opacity: 0;
}
.msg-row:hover .msg-copy { opacity: 1; }
.msg-copy:hover { color: #818cf8; background: rgba(99,102,241,0.1); }
@media (hover: none) { .msg-copy { opacity: 1; } }

/* Typing */
.typing-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
}
.typing-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #818cf8;
  animation: bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,100% { transform: translateY(0); opacity: 0.3; } 50% { transform: translateY(-4px); opacity: 1; } }
.typing-txt {
  font-size: 10px;
  color: rgba(255,255,255,0.2);
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 4px;
}

/* Generating */
.gen-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  color: rgba(255,255,255,0.3);
  font-size: 12px;
}
.gen-spin {
  width: 16px; height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.04);
  border-top-color: #818cf8;
  animation: spin 0.7s linear infinite;
}

/* Input */
.chat-input-area {
  flex-shrink: 0;
  padding: 14px 20px 16px;
  border-top: 1px solid rgba(255,255,255,0.04);
  background: rgba(3,5,18,0.5);
}

.engine-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 10px;
}
.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.toggle-input { display: none; }
.toggle-track {
  width: 28px; height: 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  position: relative;
  transition: background 0.3s ease;
}
.toggle-input:checked + .toggle-track {
  background: linear-gradient(90deg, #a855f7, #f43f5e);
}
.toggle-track::after {
  content: '';
  position: absolute;
  top: 2px; left: 2px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  transition: transform 0.3s ease;
}
.toggle-input:checked + .toggle-track::after { transform: translateX(12px); }
.toggle-lbl { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.02em; }
.engine-status { font-size: 9px; color: rgba(255,255,255,0.2); font-family: monospace; }

.api-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(3,5,18,0.6);
  border: 1px solid rgba(168,85,247,0.1);
}
.api-icon { color: rgba(168,85,247,0.3); flex-shrink: 0; }
.api-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}
.api-input::placeholder { color: rgba(255,255,255,0.15); }

.input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 8px 8px 12px;
  border-radius: 16px;
  background: rgba(3,5,18,0.7);
  border: 1px solid rgba(255,255,255,0.04);
  transition: border-color 0.3s ease;
}
.input-wrap:focus-within {
  border-color: rgba(99, 102, 241, 0.3);
}
.input-actions {
  display: flex;
  gap: 4px;
  padding-bottom: 4px;
}
.ia-btn {
  display: flex;
  padding: 4px;
  color: rgba(255,255,255,0.2);
  border-radius: 6px;
  transition: all 0.2s ease;
}
.ia-btn:hover { color: #818cf8; }
.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  min-height: 20px;
  max-height: 80px;
  font-family: inherit;
}
.input-field::placeholder { color: rgba(255,255,255,0.15); }

.send-btn {
  width: 36px; height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.15);
  background: linear-gradient(90deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1));
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.send-btn.on {
  color: #fff;
  background: linear-gradient(90deg, #6366f1, #a855f7, #f43f5e);
  box-shadow: 0 4px 16px rgba(168,85,247,0.2);
}
.send-btn:disabled { cursor: not-allowed; opacity: 0.3; }

/* ═══════════════════════════════════════════
   RIGHT DASHBOARD
   ═══════════════════════════════════════════ */
.dash-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

/* Progress Ring */
.dash-ring-area {
  display: flex;
  gap: 16px;
  align-items: center;
}
.dash-ring-wrap {
  position: relative;
  width: 112px; height: 112px;
  flex-shrink: 0;
}
.dash-ring-bg-glow {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: rgba(99,102,241,0.04);
  filter: blur(12px);
}
.dash-ring-svg { width: 100%; height: 100%; }
.dash-ring-arc { transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.dash-ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dash-pct {
  font-size: 22px;
  font-weight: 900;
  font-family: monospace;
  background: linear-gradient(135deg, #06b6d4, #a855f7, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.dash-pct-lbl {
  font-size: 7px;
  color: rgba(255,255,255,0.3);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.dash-ring-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.dash-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.35);
}
.dash-stat strong { color: rgba(255,255,255,0.6); font-family: monospace; margin-left: 4px; }
.dash-stat-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dash-stat-dot.green { background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.5); }
.dash-stat-dot.blue { background: #06b6d4; box-shadow: 0 0 6px rgba(6,182,212,0.3); }
.dash-stat-dot.gray { background: rgba(255,255,255,0.08); }

/* Generating in dash */
.dash-gen { margin-top: 12px; }
.dash-gen-track { height: 3px; background: rgba(255,255,255,0.04); border-radius: 2px; overflow: hidden; }
.dash-gen-fill { height: 100%; background: #818cf8; border-radius: 2px; transition: width 0.3s ease; }
.dash-gen-txt { font-size: 9px; color: rgba(255,255,255,0.2); margin-top: 4px; display: block; }
.dash-score-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  margin-bottom: 8px;
}
.dash-score-row strong { font-size: 18px; color: #818cf8; font-family: monospace; }
.dash-mini-bars { display: flex; flex-direction: column; gap: 3px; }
.dash-mini-bar { display: flex; align-items: center; gap: 6px; }
.dash-mini-lbl { font-size: 9px; color: rgba(255,255,255,0.25); width: 40px; flex-shrink: 0; }
.dash-mini-track { flex: 1; height: 3px; background: rgba(255,255,255,0.04); border-radius: 2px; overflow: hidden; }
.dash-mini-fill { height: 100%; border-radius: 2px; }

/* Dimension list */
.dim-list { display: flex; flex-direction: column; gap: 6px; }
.dim-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.04);
  background: rgba(3,5,18,0.3);
  transition: all 0.3s ease;
  cursor: default;
}
.dim-item.done {
  background: rgba(16,185,129,0.04);
  border-color: rgba(16,185,129,0.15);
}
.dim-check {
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.04);
  color: transparent;
  transition: all 0.3s ease;
}
.dim-item.done .dim-check {
  background: rgba(16,185,129,0.1);
  border-color: rgba(16,185,129,0.3);
  color: #10b981;
  box-shadow: 0 0 8px rgba(16,185,129,0.2);
}
.dim-bolt { color: rgba(255,255,255,0.15); }
.dim-info { flex: 1; min-width: 0; }
.dim-lbl {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  margin-bottom: 2px;
}
.dim-item.done .dim-lbl { color: rgba(255,255,255,0.7); }
.dim-val {
  font-size: 9px;
  color: rgba(255,255,255,0.2);
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dim-item.done .dim-val { color: rgba(16,185,129,0.6); }
.dim-chev {
  color: rgba(255,255,255,0.1);
  flex-shrink: 0;
}

/* Generate panel */
.gen-condition {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  margin-bottom: 10px;
}
.gen-cond-text {
  font-size: 8px;
  color: rgba(255,255,255,0.15);
  font-family: monospace;
}
.gen-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 6px;
}
.gen-btn.ready {
  color: #fff;
  background: linear-gradient(90deg, #6366f1, #a855f7, #f43f5e);
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(168,85,247,0.15);
}
.gen-btn.ready:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(168,85,247,0.25); }
.gen-btn:disabled { cursor: not-allowed; opacity: 0.3; }

.reset-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 10px;
  color: rgba(255,255,255,0.2);
  background: rgba(3,5,18,0.5);
  border: 1px solid rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 0.2s ease;
}
.reset-btn:hover {
  border-color: rgba(99,102,241,0.2);
  color: rgba(255,255,255,0.4);
}

/* Score */
.score-area {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.score-big {
  text-align: center;
  flex-shrink: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(3,5,18,0.5);
  border: 1px solid rgba(255,255,255,0.04);
  min-width: 72px;
}
.score-big-val {
  font-size: 28px;
  font-weight: 900;
  color: rgba(255,255,255,0.8);
  font-family: monospace;
  line-height: 1;
}
.score-big-unit { font-size: 10px; color: rgba(255,255,255,0.3); font-weight: 400; }
.score-stars {
  display: flex;
  justify-content: center;
  gap: 1px;
  margin-top: 6px;
}
.score-stars :deep(svg) { color: rgba(255,255,255,0.06); }
.score-stars :deep(.filled) { color: #f59e0b; fill: #f59e0b; }

.score-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sbr-top {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(255,255,255,0.25);
  margin-bottom: 2px;
}
.sbr-val { font-weight: 700; color: #818cf8; font-family: monospace; }
.sbr-track { height: 4px; border-radius: 4px; background: rgba(3,5,18,0.6); overflow: hidden; }
.sbr-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
.sbr-track.placeholder { margin-bottom: 4px; }

.score-placeholder { display: flex; flex-direction: column; gap: 10px; }

.report-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 10px;
  color: rgba(165,180,252,0.6);
  background: rgba(26,32,77,0.4);
  border: 1px solid rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 0.2s ease;
}
.report-btn:hover {
  border-color: rgba(99,102,241,0.15);
  color: rgba(165,180,252,0.8);
}
.report-btn :last-child { margin-left: auto; }

/* ═══════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════ */
.modal-mask {
  position: fixed; inset: 0;
  z-index: 100;
  display: flex; align-items: center; justify-content: center;
  padding: 32px;
}
.modal-bg {
  position: absolute; inset: 0;
  background: rgba(3,5,18,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.modal-wrap {
  position: relative;
  width: 100%;
  max-width: 1050px;
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 24px;
}

/* Toast */
.toast {
  position: fixed; bottom: 24px; right: 24px;
  padding: 12px 20px;
  background: rgba(10,12,32,0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 16px;
  font-size: 11px;
  color: rgba(255,255,255,0.7);
  z-index: 50;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 1024px) {
  .sidebar, .dash-col { display: none; }
  .chat-col { height: calc(100vh - var(--hdr) - 32px); border-radius: 16px; }
  .page { padding: 8px 8px 0; }
}
</style>
