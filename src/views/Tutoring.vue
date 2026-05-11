<script setup lang="ts">
import { ref, computed } from 'vue'
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

> 学习建议：多结合实例来理解抽象概念，效果会更好。

## 相关概念

这个问题还与以下知识点密切相关：
- 前置知识：需要先掌握的基础概念
- 延伸阅读：进阶学习的方向

你可以继续追问，我会为你进一步解答！`,

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
# 示例代码
def verify_solution():
    result = solve()
    assert check(result)
    return result
\`\`\`

> 提示：多练习同类题目可以加深理解。

最终答案需要根据具体题目进行计算。建议你先自己尝试，遇到困难时再继续提问。`,

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

**形式化定义：**
在数学上，这个概念可以用以下方式表示：

> 定义：若满足条件 A，则称 X 具有性质 Y。

### 4. 类比说明

这个概念类似于日常生活中的 ____ ，都是通过 ____ 来实现 ____ 的。

### 5. 实际应用

在实际项目中，这个概念被广泛应用于：
1. 数据处理流程
2. 算法设计
3. 系统架构

希望这个讲解对你有帮助！如需深入了解某个方面，请继续提问。`,

  brainstorm: (q) => `关于「${q}」，让我们从多个角度来拓展思考。

## 🔗 关联知识

### 1. 相关概念
以下概念与你的问题密切相关：

- **概念 A** — 基础前置知识
- **概念 B** — 同一领域的不同方向
- **概念 C** — 进阶应用方向

### 2. 实际应用场景

| 场景 | 应用方式 | 难度 |
|------|---------|------|
| 场景一 | 直接应用 | ⭐⭐ |
| 场景二 | 组合使用 | ⭐⭐⭐ |
| 场景三 | 创新应用 | ⭐⭐⭐⭐ |

### 3. 延伸思考

**如果换个角度：**
- 从理论角度看：...
- 从实践角度看：...
- 从历史发展看：...

### 4. 推荐学习路径

1. 先掌握基础概念
2. 完成相关练习
3. 阅读进阶资料
4. 动手实践项目

> 📌 学习是循序渐进的过程，每一步都很重要。

这样的拓展对你有帮助吗？需要深入哪个方向？`,
}

function formatAnswer(text: string) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="tutor-code"><code>$2</code></pre>')
    .replace(/### (.*?)(\n|$)/g, '<h3 class="tutor-h3">$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2 class="tutor-h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
    .replace(/\| (.+?) \| (.+?) \| (.+?) \|/g, (m, a, b, c) => {
      if (a.includes('---')) return ''
      return `<div class="tutor-table-row"><span>${a}</span><span>${b}</span><span>${c}</span></div>`
    })
    .replace(/\n/g, '<br/>')
}

function askQuestion() {
  if (!question.value.trim()) return
  const q = question.value
  const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const answer = mockAnswers[currentMode.value](q)

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
  <div class="tutoring">
    <div class="page-header reveal">
      <h1 class="page-title">智能辅导</h1>
      <p class="page-desc">7×24 即时答疑，多模态深度讲解，让学习事半功倍</p>
    </div>

    <div class="tutoring-layout">
      <!-- Main Area -->
      <div class="tutoring-main">
        <!-- Mode Tabs -->
        <div class="mode-tabs reveal reveal-delay-1">
          <button
            v-for="m in modes"
            :key="m.key"
            :class="['mode-tab', { active: currentMode === m.key }]"
            :style="{ '--tab-color': m.color }"
            @click="setMode(m.key)"
          >
            <span class="mode-tab-icon">
              <component :is="m.icon" :size="20" stroke-width="1.5" style="color: var(--tab-color)" />
            </span>
            <div class="mode-tab-info">
              <span class="mode-tab-label">{{ m.label }}</span>
              <span class="mode-tab-desc">{{ m.desc }}</span>
            </div>
          </button>
        </div>

        <!-- Conversation -->
        <div v-if="history.length > 0" class="qa-list">
          <div v-for="(item, i) in history" :key="i" class="qa-pair reveal">
            <div class="question-bubble">
              <span class="bubble-icon bubble-q">Q</span>
              <span class="question-text">{{ item.q }}</span>
              <span class="bubble-time">{{ item.time }}</span>
            </div>
            <div class="answer-bubble">
              <span class="bubble-icon bubble-a">A</span>
              <div class="answer-content" v-html="formatAnswer(item.a)" />
              <div class="answer-footer">
                <div class="answer-feedback">
                  <span class="feedback-label">这个回答有帮助吗？</span>
                  <button
                    :class="['feedback-btn', { active: item.helpful === true }]"
                    @click="setHelpful(i, true)"
                    aria-label="标记为有帮助"
                  >
                    <ThumbsUp :size="14" stroke-width="1.5" />
                    有帮助
                  </button>
                  <button
                    :class="['feedback-btn', { active: item.helpful === false }]"
                    @click="setHelpful(i, false)"
                    aria-label="标记为需要改进"
                  >
                    <ThumbsDown :size="14" stroke-width="1.5" />
                    需要改进
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Empty State -->
        <div v-else class="empty-state">
          <div class="empty-graphic">
            <component :is="modes.find(m => m.key === currentMode)?.icon" :size="36" stroke-width="1" class="empty-icon" />
            <div class="empty-ring" />
          </div>
          <h3>{{ modes.find(m => m.key === currentMode)?.label }}</h3>
          <p>{{ modes.find(m => m.key === currentMode)?.desc }}</p>

          <div class="topic-browse">
            <div
              v-for="cat in topicCategories"
              :key="cat.label"
              class="topic-group"
              :style="{ '--group-color': cat.color }"
            >
              <div class="topic-group-header">
                <span class="topic-group-icon">
                  <component :is="cat.icon" :size="16" stroke-width="1.5" style="color: var(--group-color)" />
                </span>
                <span class="topic-group-label">{{ cat.label }}</span>
              </div>
              <div class="topic-items">
                <button
                  v-for="q in cat.questions"
                  :key="q"
                  class="topic-item"
                  @click="askTopic(q)"
                >
                  <span>{{ q }}</span>
                  <span class="topic-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="tutoring-input">
          <div class="input-mode-badge">
            {{ modes.find(m => m.key === currentMode)?.label }} 模式
          </div>
          <div class="input-row">
            <input
              v-model="question"
              type="text"
              :placeholder="`在${modes.find(m => m.key === currentMode)?.label}模式下输入你的问题...`"
              @keydown.enter="askQuestion"
            />
            <button class="ask-btn" @click="askQuestion" :disabled="!question.trim()">
              <span>提问</span>
              <span class="ask-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="tutoring-sidebar">
        <div class="sidebar-card modes-quick">
          <h3>切换模式</h3>
          <div class="mode-list">
            <button
              v-for="m in modes"
              :key="m.key"
              :class="['mode-item', { active: currentMode === m.key }]"
              :style="{ '--mode-color': m.color }"
              @click="setMode(m.key)"
            >
              <span :class="['mode-item-icon', { active: currentMode === m.key }]">
                <component :is="m.icon" :size="16" stroke-width="1.5" />
              </span>
              <div class="mode-item-info">
                <span class="mode-item-label">{{ m.label }}</span>
                <span class="mode-item-desc">{{ m.desc }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="sidebar-card sessions-card">
          <div class="sessions-header">
            <h3>历史记录</h3>
            <button class="sessions-toggle" @click="showHistory = !showHistory">
              {{ showHistory ? '收起' : '展开' }}
              <span :class="['sessions-arrow', { open: showHistory }]">▾</span>
            </button>
          </div>
          <transition name="slide-up">
            <div v-if="showHistory" class="session-list">
              <button
                v-for="s in sessionHistory"
                :key="s.title"
                class="session-item"
              >
                <div class="session-info">
                  <span class="session-title">{{ s.title }}</span>
                  <span class="session-meta">{{ s.count }} 条对话 · {{ s.date }}</span>
                </div>
                <span class="session-arrow">→</span>
              </button>
            </div>
          </transition>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.tutoring {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #fff;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

.tutoring-layout {
  display: flex;
  gap: 24px;
  min-height: 70vh;
}

.tutoring-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* === Mode Tabs === */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.mode-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  text-align: left;
  transition: all var(--duration-normal) var(--ease-out);
}
.mode-tab:hover {
  border-color: var(--tab-color);
  background: rgba(0, 0, 0, 0.15);
}
.mode-tab.active {
  border-color: var(--tab-color);
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 -2px 0 var(--tab-color);
}

.mode-tab-icon {
  font-size: 22px;
  color: var(--tab-color);
  flex-shrink: 0;
}

.mode-tab-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mode-tab-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.mode-tab-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
  display: none;
}

/* === Q&A === */
.qa-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.qa-pair {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-bubble,
.answer-bubble {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  line-height: 1.7;
}

.question-bubble {
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-left: 40px;
  align-items: flex-start;
}

.answer-bubble {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  flex-direction: column;
}

.bubble-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.bubble-q {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
}

.bubble-a {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.question-text {
  flex: 1;
  color: var(--color-text-primary);
}

.bubble-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  font-family: var(--font-mono);
}

.answer-content {
  flex: 1;
  white-space: pre-wrap;
  color: var(--color-text-primary);
}

.answer-content :deep(.tutor-h2) {
  font-family: var(--font-display);
  font-size: 18px;
  color: #fff;
  margin: 16px 0 8px;
}

.answer-content :deep(.tutor-h3) {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--color-accent-cyan);
  margin: 12px 0 6px;
}

.answer-content :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.answer-content :deep(blockquote) {
  border-left: 3px solid var(--color-accent-cyan);
  padding: 8px 16px;
  margin: 8px 0;
  background: rgba(0, 212, 255, 0.04);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.answer-content :deep(.tutor-code) {
  display: block;
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

.answer-content :deep(.tutor-table-row) {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
}
.answer-content :deep(.tutor-table-row:first-child) {
  font-weight: 600;
  color: #fff;
}

/* === Answer Footer === */
.answer-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.answer-feedback {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feedback-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.feedback-btn {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-out);
}
.feedback-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}
.feedback-btn.active {
  background: rgba(0, 212, 255, 0.08);
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

/* === Empty State === */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  overflow-y: auto;
}

.empty-graphic {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.empty-icon {
  font-size: 36px;
  color: var(--color-accent-cyan);
  z-index: 1;
}

.empty-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(0, 212, 255, 0.15);
  animation: ring-expand 3s ease-out infinite;
}

.empty-state h3 {
  font-family: var(--font-display);
  font-size: 24px;
  color: #fff;
  margin-bottom: 8px;
}

.empty-state > p {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 32px;
}

.topic-browse {
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.topic-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.topic-group-icon {
  font-size: 16px;
  color: var(--group-color);
}

.topic-group-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.topic-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topic-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: left;
  transition: all var(--duration-fast) var(--ease-out);
}
.topic-item:hover {
  border-color: var(--group-color);
  color: var(--color-text-primary);
  background: rgba(0, 0, 0, 0.15);
}

.topic-arrow {
  font-size: 12px;
  opacity: 0;
  transition: all var(--duration-fast) var(--ease-out);
}
.topic-item:hover .topic-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* === Input === */
.tutoring-input {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}

.input-mode-badge {
  font-size: 11px;
  color: var(--color-accent-cyan);
  margin-bottom: 8px;
  padding: 2px 10px;
  display: inline-block;
  border-radius: 4px;
  background: rgba(0, 212, 255, 0.06);
}

.input-row {
  display: flex;
  gap: 12px;
}

.input-row input {
  flex: 1;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.input-row input:focus {
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.06);
}
.input-row input::placeholder {
  color: var(--color-text-tertiary);
}

.ask-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;
}
.ask-btn:hover:not(:disabled) {
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-1px);
}
.ask-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ask-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.ask-btn:hover:not(:disabled) .ask-arrow {
  transform: translateX(3px);
}

/* === Sidebar === */
.tutoring-sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-card {
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}

.sidebar-card h3 {
  font-family: var(--font-display);
  font-size: 17px;
  color: #fff;
  margin-bottom: 14px;
}

.mode-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mode-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
  width: 100%;
}
.mode-item:hover {
  background: rgba(255, 255, 255, 0.03);
}
.mode-item.active {
  background: rgba(0, 0, 0, 0.15);
  border-left: 2px solid var(--mode-color);
}

.mode-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--mode-color);
  flex-shrink: 0;
}
.mode-item-icon.active {
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 12px var(--mode-color);
}

.mode-item-info {
  display: flex;
  flex-direction: column;
}

.mode-item-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.mode-item-desc {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* === Sessions === */
.sessions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sessions-toggle {
  font-size: 12px;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}
.sessions-toggle:hover {
  color: var(--color-accent-cyan);
}

.sessions-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
  font-size: 10px;
}
.sessions-arrow.open {
  transform: rotate(180deg);
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  text-align: left;
  transition: all var(--duration-fast) var(--ease-out);
}
.session-item:hover {
  background: rgba(0, 212, 255, 0.04);
}

.session-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.session-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.session-meta {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.session-arrow {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

@media (max-width: 900px) {
  .mode-tabs { grid-template-columns: repeat(2, 1fr); }
  .topic-browse { grid-template-columns: 1fr; }
  .tutoring-sidebar { display: none; }
}
</style>
