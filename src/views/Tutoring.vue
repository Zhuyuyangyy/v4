<script setup lang="ts">
import { ref, computed } from 'vue'
import { askTutoringQuestion } from '@/lib/api'
import {
  MessageCircle,
  PenTool,
  FileText,
  Sparkles,
  Code,
  Map,
  Target,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  History,
  Zap,
  Lightbulb,
} from 'lucide-vue-next'

type Mode = 'qa' | 'solve' | 'explain' | 'brainstorm'

interface QAPair {
  q: string
  a: string
  time: string
  helpful?: boolean
  mode: Mode
}

const question = ref('')
const currentMode = ref<Mode>('qa')
const history = ref<QAPair[]>([])
const showHistory = ref(false)
const isAsking = ref(false)

const modes: { key: Mode; icon: any; label: string; desc: string; color: string }[] = [
  { key: 'qa', icon: MessageCircle, label: '自由问答', desc: '开放式提问，AI 即时解答', color: '#00d4ff' },
  { key: 'solve', icon: PenTool, label: '解题助手', desc: '分步解析，详细推导过程', color: '#7c3aed' },
  { key: 'explain', icon: FileText, label: '概念精讲', desc: '深入浅出，系统讲解知识点', color: '#06d6a0' },
  { key: 'brainstorm', icon: Sparkles, label: '举一反三', desc: '拓展延伸，关联相关知识', color: '#f59e0b' },
]

const topicCategories = [
  {
    label: '编程开发',
    icon: Code,
    questions: ['Python 中列表和元组的区别', '什么是闭包？有什么作用？', '解释 RESTful API 设计原则'],
    color: '#00d4ff',
  },
  {
    label: '数据科学',
    icon: Map,
    questions: ['什么是过拟合？如何避免？', '解释交叉验证的原理', 'PCA 降维的原理是什么？'],
    color: '#7c3aed',
  },
  {
    label: '数学基础',
    icon: Target,
    questions: ['什么是梯度下降法？', '解释泰勒展开的意义', '矩阵的特征值有什么意义？'],
    color: '#06d6a0',
  },
  {
    label: '算法与数据结构',
    icon: Code,
    questions: ['动态规划和贪心算法的区别', '解释时间复杂度的概念', '什么是哈希表？冲突如何解决？'],
    color: '#f59e0b',
  },
]

const sessionHistory = [
  { title: 'Python 基础概念', count: 8, date: '今天' },
  { title: '机器学习面试准备', count: 15, date: '昨天' },
  { title: '微积分复习', count: 6, date: '3天前' },
]

const mockAnswers: Record<Mode, (q: string) => string> = {
  qa: (q) => `很好的问题！关于「${q}」，我来为你详细解答。

## 核心概念

首先，我们需要理解这个问题的本质。这是一个非常重要的基础知识，掌握它对于后续学习至关重要。

**关键要点：**

1. **理解基本原理** — 掌握核心定义和公式
2. **实际应用场景** — 了解在现实中的使用
3. **常见误区** — 避免理解上的偏差

> 学习建议：多结合实例来理解抽象概念，效果会更好。`,

  solve: (q) => `让我来逐步解析「${q}」。

## 解题思路

**步骤 1：理解题意**
首先分析题目给出的条件和要求解的问题。

**步骤 2：确定方法**
根据题目类型选择合适的解题方法。

**步骤 3：分步推导**

1. 列出已知条件
2. 应用核心公式
3. 代入数据计算
4. 验证结果

**步骤 4：答案验证**

\`\`\`python
def verify_solution():
    result = solve()
    assert check(result)
    return result
\`\`\`

> 提示：多练习同类题目可以加深理解。`,

  explain: (q) => `## 深入讲解：「${q}」

### 1. 这是什么？

这是一个核心概念，它在相关领域中扮演着基础性的角色。

### 2. 为什么重要？

掌握这个概念可以帮助你：
- 建立扎实的知识基础
- 理解更复杂的进阶内容
- 解决实际应用中的问题

### 3. 如何理解？

**直观理解：**
可以把它想象成一个"黑箱"，输入经过处理得到输出，关键在于理解内部的处理机制。

### 4. 实际应用

在实际项目中，这个概念被广泛应用于：
1. 数据处理流程
2. 算法设计
3. 系统架构`,

  brainstorm: (q) => `关于「${q}」，让我们从多个角度来拓展思考。

### 关联知识

- **概念 A** — 基础前置知识
- **概念 B** — 同一领域的不同方向
- **概念 C** — 进阶应用方向

### 延伸思考

**如果换个角度：**
- 从理论角度看：...
- 从实践角度看：...
- 从历史发展看：...

### 推荐学习路径

1. 先掌握基础概念
2. 完成相关练习
3. 阅读进阶资料
4. 动手实践项目`,
}

function formatAnswer(text: string) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/### (.*?)(\n|$)/g, '<h3 class="h3">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 class="h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\n/g, '<br/>')
}

async function askQuestion() {
  if (!question.value.trim() || isAsking.value) return
  const q = question.value
  const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  let answer = mockAnswers[currentMode.value](q)
  isAsking.value = true

  try {
    const response = await askTutoringQuestion(q, currentMode.value)
    answer = response.answer
  } catch {
    // Keep local fallback when the API server is unavailable.
  } finally {
    isAsking.value = false
  }

  history.value.push({
    q,
    a: answer,
    time: now,
    mode: currentMode.value,
  })
  question.value = ''
}

function setMode(mode: Mode) {
  currentMode.value = mode
}

function setHelpful(index: number, helpful: boolean) {
  if (history.value[index]) {
    history.value[index].helpful = helpful
  }
}

function askTopic(q: string) {
  question.value = q
  askQuestion()
}
</script>

<template>
  <div class="tutor">
    <!-- Hero -->
    <div class="tutor-hero">
      <div>
        <div class="hero-badge">智能辅导</div>
        <h1 class="hero-title">7×24 <span class="gradient-text">即时答疑</span></h1>
        <p class="hero-desc">多模式深度讲解，随时随地解决你的学习问题</p>
      </div>
      <button class="history-btn" @click="showHistory = !showHistory">
        <History :size="16" stroke-width="1.5" />
        <span>历史记录</span>
        <ArrowRight v-if="!showHistory" :size="14" stroke-width="1.5" class="hist-arrow-right" />
      </button>
    </div>

    <!-- History Panel -->
    <transition name="slide-up">
      <div v-if="showHistory" class="history-panel">
        <button v-for="s in sessionHistory" :key="s.title" class="history-item">
          <div class="history-icon">
            <Lightbulb :size="14" stroke-width="1.5" />
          </div>
          <div class="history-info">
            <span class="history-title">{{ s.title }}</span>
            <span class="history-meta">{{ s.count }} 条对话 · {{ s.date }}</span>
          </div>
          <ChevronRightIcon :size="16" stroke-width="1.5" class="history-chevron" />
        </button>
      </div>
    </transition>

    <!-- Mode Selector -->
    <div class="mode-selector">
      <button
        v-for="m in modes"
        :key="m.key"
        :class="['mode-btn', { active: currentMode === m.key }]"
        :style="{ '--m-clr': m.color }"
        @click="setMode(m.key)"
      >
        <div class="mode-btn-icon">
          <component :is="m.icon" :size="18" stroke-width="1.5" />
        </div>
        <div class="mode-btn-text">
          <span class="mode-btn-label">{{ m.label }}</span>
          <span class="mode-btn-desc">{{ m.desc }}</span>
        </div>
        <div v-if="currentMode === m.key" class="mode-active-indicator" />
      </button>
    </div>

    <!-- Conversation Area -->
    <div v-if="history.length > 0 || isAsking" class="conversation">
      <div v-for="(item, i) in history" :key="i" class="qa-pair">
        <!-- Question -->
        <div class="question-bubble">
          <div class="bubble-avatar q-avatar">Q</div>
          <div class="bubble-content">
            <p>{{ item.q }}</p>
            <span class="bubble-time">{{ item.time }}</span>
          </div>
        </div>

        <!-- Answer -->
        <div class="answer-bubble">
          <div class="bubble-avatar a-avatar">A</div>
          <div class="bubble-content">
            <div class="answer-body" v-html="formatAnswer(item.a)" />
            <div class="answer-footer">
              <button :class="['feedback-btn', { active: item.helpful === true }]" @click="setHelpful(i, true)">
                <ThumbsUp :size="14" stroke-width="1.5" />
              </button>
              <button :class="['feedback-btn', { active: item.helpful === false }]" @click="setHelpful(i, false)">
                <ThumbsDown :size="14" stroke-width="1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isAsking" class="answer-bubble pending-bubble">
        <div class="bubble-avatar a-avatar">A</div>
        <div class="bubble-content">
          <div class="answer-body pending-answer">正在思考中...</div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-mode-icon">
        <component :is="modes.find(m => m.key === currentMode)?.icon" :size="36" stroke-width="1" />
      </div>
      <h3 class="empty-title">{{ modes.find(m => m.key === currentMode)?.label }}</h3>
      <p class="empty-desc">{{ modes.find(m => m.key === currentMode)?.desc }}</p>

      <div class="topic-grid">
        <div v-for="cat in topicCategories" :key="cat.label" class="topic-group" :style="{ '--t-clr': cat.color }">
          <div class="topic-header">
            <component :is="cat.icon" :size="15" stroke-width="1.5" />
            <span>{{ cat.label }}</span>
          </div>
          <div class="topic-list">
            <button v-for="q in cat.questions" :key="q" class="topic-btn" @click="askTopic(q)">
              <span>{{ q }}</span>
              <ArrowRight :size="13" stroke-width="1.5" class="topic-btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-section">
      <div class="mode-indicator">{{ modes.find(m => m.key === currentMode)?.label }} 模式</div>
      <div class="input-row">
        <input
          v-model="question"
          type="text"
          :disabled="isAsking"
          :placeholder="`在「${modes.find(m => m.key === currentMode)?.label}」模式下输入你的问题...`"
          @keydown.enter="askQuestion"
        />
        <button class="ask-btn" @click="askQuestion" :disabled="!question.trim() || isAsking">
          <Zap :size="16" stroke-width="2" />
          <span>{{ isAsking ? '思考中' : '提问' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'
export default {
  components: { ChevronRightIcon }
}
</script>

<style scoped>
.tutor {
  padding: 0;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height) - 64px);
  position: relative;
  z-index: 1;
}

/* ====================== Hero ====================== */
.tutor-hero {
  padding: 48px 40px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-bottom: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
  white-space: nowrap;
  flex-shrink: 0;
}
.history-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.hist-arrow-right { transition: transform 0.2s var(--ease-out); }

/* ====================== History Panel ====================== */
.history-panel {
  display: flex;
  gap: 8px;
  padding: 12px 40px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;
}
.history-panel::-webkit-scrollbar { display: none; }

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  text-align: left;
  white-space: nowrap;
  color: var(--color-text-primary);
  font-size: 12px;
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
  background: var(--color-bg-card);
}
.history-item:hover {
  border-color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
}

.history-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.history-info { display: flex; flex-direction: column; gap: 1px; }
.history-title { display: block; font-weight: 500; }
.history-meta { display: block; font-size: 11px; color: var(--color-text-tertiary); }

.history-chevron { color: var(--color-text-tertiary); }

/* ====================== Mode Selector ====================== */
.mode-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0 40px;
  margin-bottom: 20px;
}

.mode-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  text-align: left;
  transition: all 0.3s var(--ease-out);
  overflow: hidden;
}
.mode-btn:hover {
  border-color: var(--m-clr);
  background: color-mix(in srgb, var(--m-clr) 4%, var(--color-bg-card));
}
.mode-btn.active {
  border-color: var(--m-clr);
  background: color-mix(in srgb, var(--m-clr) 6%, var(--color-bg-card));
  box-shadow: 0 0 20px color-mix(in srgb, var(--m-clr) 8%, transparent);
}

.mode-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--m-clr) 10%, transparent);
  color: var(--m-clr);
  flex-shrink: 0;
  transition: all 0.3s var(--ease-out);
}
.mode-btn.active .mode-btn-icon {
  background: color-mix(in srgb, var(--m-clr) 20%, transparent);
}

.mode-btn-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.mode-btn-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}
.mode-btn-desc {
  font-size: 10px;
  color: var(--color-text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mode-active-indicator {
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  border-radius: 1px;
  background: var(--m-clr);
}

/* ====================== Conversation ====================== */
.conversation {
  flex: 1;
  overflow-y: auto;
  padding: 0 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes message-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.qa-pair {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-bubble,
.answer-bubble {
  display: flex;
  gap: 12px;
}

.question-bubble {
  justify-content: flex-end;
}

.answer-bubble {
  justify-content: flex-start;
}

.pending-bubble {
  animation: message-in 0.3s var(--ease-out);
}

.bubble-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.q-avatar {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  order: 1;
}
.a-avatar {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.bubble-content {
  max-width: 80%;
}

.question-bubble .bubble-content {
  order: 0;
}

.question-bubble .bubble-content p {
  display: inline-block;
  padding: 12px 18px;
  border-radius: 14px 14px 4px 14px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.08));
  border: 1px solid rgba(0, 212, 255, 0.1);
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.6;
}

.answer-bubble .bubble-content {
  width: 100%;
}

.answer-body {
  padding: 16px 20px;
  border-radius: 14px 14px 14px 4px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.75;
  color: var(--color-text-primary);
}

.answer-body :deep(.h2) {
  font-family: var(--font-display);
  font-size: 16px;
  color: #fff;
  margin: 14px 0 6px;
}
.answer-body :deep(.h3) {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--color-accent-cyan);
  margin: 10px 0 4px;
}
.answer-body :deep(strong) { color: #fff; font-weight: 600; }
.answer-body :deep(blockquote) {
  border-left: 2px solid var(--color-accent-cyan);
  padding: 6px 14px;
  margin: 6px 0;
  background: rgba(0, 212, 255, 0.04);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
  font-style: italic;
}
.answer-body :deep(.code-block) {
  display: block;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  margin: 6px 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-accent-cyan);
}

.pending-answer {
  color: var(--color-text-secondary);
}

.bubble-time {
  display: block;
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
  font-family: var(--font-mono);
}

.question-bubble .bubble-time { text-align: right; }

.answer-footer {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  padding-left: 4px;
}

.feedback-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-tertiary);
  border: 1px solid transparent;
  transition: all 0.2s var(--ease-out);
}
.feedback-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
}
.feedback-btn.active {
  background: rgba(0, 212, 255, 0.08);
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

/* ====================== Empty State ====================== */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 40px;
  overflow-y: auto;
}

.empty-mode-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 20px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
}

.empty-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #fff;
  margin-bottom: 4px;
}

.empty-desc {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin-bottom: 28px;
}

.topic-grid {
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.topic-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--t-clr);
  margin-bottom: 8px;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topic-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: left;
  transition: all 0.2s var(--ease-out);
  width: 100%;
}
.topic-btn:hover {
  border-color: var(--t-clr);
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--t-clr) 4%, transparent);
}

.topic-btn-arrow { opacity: 0; transition: all 0.2s var(--ease-out); flex-shrink: 0; }
.topic-btn:hover .topic-btn-arrow { opacity: 1; transform: translateX(3px); color: var(--t-clr); }

/* ====================== Input Area ====================== */
.input-section {
  padding: 16px 40px 24px;
  border-top: 1px solid var(--color-border);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(20px);
}

.mode-indicator {
  font-size: 11px;
  color: var(--color-accent-cyan);
  margin-bottom: 8px;
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.06);
  font-weight: 500;
}

.input-row {
  display: flex;
  gap: 10px;
}

.input-row input {
  flex: 1;
  padding: 12px 18px;
  border-radius: 12px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text-primary);
  transition: all 0.2s var(--ease-out);
}
.input-row input:focus { border-color: var(--color-accent-cyan); }
.input-row input::placeholder { color: var(--color-text-tertiary); opacity: 0.6; }

.ask-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 22px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s var(--ease-out);
  white-space: nowrap;
}
.ask-btn:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
  transform: translateY(-1px);
}
.ask-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ====================== Responsive ====================== */
@media (max-width: 900px) {
  .tutor-hero { padding: 32px 20px 20px; flex-direction: column; }
  .mode-selector { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
  .empty-state { padding: 20px; }
  .conversation { padding: 0 20px 20px; }
  .input-section { padding: 16px 20px 20px; }
  .topic-grid { grid-template-columns: 1fr; }
  .history-panel { padding: 12px 20px; }
}
</style>
