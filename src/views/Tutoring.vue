<script setup lang="ts">
import { ref } from 'vue'

const question = ref('')
const history = ref<{ q: string; a: string }[]>([])
const hasResult = ref(false)

const relatedQuestions = [
  '什么是梯度下降法？',
  '解释反向传播算法',
  'SVM 和决策树的区别',
  '什么是过拟合？如何避免？',
]

function askQuestion() {
  if (!question.value.trim()) return
  const q = question.value
  history.value.push({
    q,
    a: '很好的问题！让我为你详细解答。\n\n这是一个涉及核心概念的问题。首先，我们需要理解其基本原理，然后通过具体的例子来加深认识。\n\n**关键要点：**\n\n1. 这是理解该领域的基础\n2. 它与多个相关概念有密切联系\n3. 在实际应用中需要注意边界条件\n\n> 提示：建议结合具体案例来学习，这样理解会更深刻。\n\n你可以继续追问，或者让我换个角度来解释。',
  })
  hasResult.value = true
  question.value = ''
}

function askRelated(q: string) {
  question.value = q
  askQuestion()
}
</script>

<template>
  <div class="tutoring">
    <div class="page-header reveal">
      <h1 class="page-title">智能辅导</h1>
      <p class="page-desc">7×24 即时答疑，多模态深度讲解</p>
    </div>

    <div class="tutoring-layout">
      <!-- Main Area -->
      <div class="tutoring-main">
        <!-- Conversation -->
        <div v-if="history.length > 0" class="qa-list">
          <div v-for="(item, i) in history" :key="i" class="qa-pair reveal">
            <div class="question-bubble">
              <span class="bubble-icon">Q</span>
              <span>{{ item.q }}</span>
            </div>
            <div class="answer-bubble">
              <span class="bubble-icon">A</span>
              <div class="answer-content">{{ item.a }}</div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">⊕</div>
          <h3>有什么想问的？</h3>
          <p>输入你的问题，AI 辅导师将为你详细解答</p>
          <div class="related-chips">
            <button
              v-for="r in relatedQuestions"
              :key="r"
              class="related-chip"
              @click="askRelated(r)"
            >
              {{ r }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="tutoring-input">
          <div class="input-row">
            <input
              v-model="question"
              type="text"
              placeholder="输入你的问题..."
              @keydown.enter="askQuestion"
            />
            <button class="ask-btn" @click="askQuestion" :disabled="!question.trim()">
              提问 →
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="tutoring-sidebar">
        <div class="sidebar-card">
          <h3>辅导模式</h3>
          <div class="mode-list">
            <button class="mode-item active">
              <span class="mode-icon mode-icon-chat">↗</span>
              <span>自由问答</span>
            </button>
            <button class="mode-item">
              <span class="mode-icon mode-icon-solve">✎</span>
              <span>解题助手</span>
            </button>
            <button class="mode-item">
              <span class="mode-icon mode-icon-book">≡</span>
              <span>概念精讲</span>
            </button>
            <button class="mode-item">
              <span class="mode-icon mode-icon-idea">✦</span>
              <span>举一反三</span>
            </button>
          </div>
        </div>
        <div class="sidebar-card">
          <h3>相似问题</h3>
          <div class="related-list">
            <button v-for="r in relatedQuestions" :key="r" class="related-item" @click="askRelated(r)">
              {{ r }}
            </button>
          </div>
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
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.12);
  margin-left: 40px;
}

.answer-bubble {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
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

.question-bubble .bubble-icon {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
}

.answer-bubble .bubble-icon {
  background: linear-gradient(135deg, var(--color-accent-purple), #a855f7);
  color: #fff;
}

.answer-content {
  white-space: pre-wrap;
}

/* === Empty State === */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  color: var(--color-accent-cyan);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-family: var(--font-display);
  font-size: 24px;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 32px;
}

.related-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 500px;
}

.related-chip {
  padding: 10px 18px;
  border-radius: 100px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.related-chip:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.06);
}

/* === Input === */
.tutoring-input {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
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
  transition: border-color var(--duration-fast) var(--ease-out);
}
.input-row input:focus {
  border-color: var(--color-accent-cyan);
}

.ask-btn {
  padding: 14px 24px;
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

/* === Sidebar === */
.tutoring-sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  margin-bottom: 14px;
}

.mode-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mode-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}
.mode-item:hover {
  background: rgba(0, 212, 255, 0.04);
  color: var(--color-text-primary);
}
.mode-item.active {
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.mode-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  flex-shrink: 0;
}

.mode-icon-chat { background: rgba(0, 212, 255, 0.1); color: #00d4ff; }
.mode-icon-solve { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
.mode-icon-book { background: rgba(6, 214, 160, 0.1); color: #06d6a0; }
.mode-icon-idea { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

.related-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.related-item {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: left;
  line-height: 1.4;
  transition: all var(--duration-fast) var(--ease-out);
}
.related-item:hover {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.04);
}
</style>
