<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { Play, RotateCcw, Upload, Pen, Image, Sparkles, FileCode, Terminal, X, Download } from 'lucide-vue-next'
import type { CodeExample } from '@/types/course'

const props = defineProps<{
  examples?: CodeExample[]
  initialCode?: string
  language?: string
}>()

const emit = defineEmits<{
  (e: 'explain', code: string): void
}>()

/* ── State ── */
const code = ref(props.initialCode ?? '# 在这里输入你的代码\nprint("Hello EduMind!")')
const output = ref('')
const isRunning = ref(false)
const activeTab = ref<'editor' | 'preview'>('editor')
const showExamples = ref(false)
const screenshotPreview = ref<string | null>(null)
const isDrawing = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

/* ── Computed ── */
const selectedExample = ref<CodeExample | null>(null)

/* ── Simulated Run ── */
function runCode() {
  if (!code.value.trim()) return
  isRunning.value = true
  output.value = ''
  activeTab.value = 'preview'

  // Simulate execution with artificial delay
  const lines = code.value.split('\n')
  const printMatches = [...code.value.matchAll(/print\((.*?)\)/g)]
  const errorMatch = code.value.match(/error|raise|bug/i)

  setTimeout(() => {
    let result = ''

    // Simulate outputs
    if (printMatches.length > 0) {
      for (const m of printMatches) {
        try {
          // Simple evaluation of print arguments (safe simulation)
          const arg = m[1].replace(/^["']|["']$/g, '')
          result += `${arg}\n`
        } catch {
          result += `${m[1]}\n`
        }
      }
    } else if (code.value.includes('import') && code.value.includes('pandas')) {
      result = 'DataFrame shape: (1000, 8)\n   age  income  score\n0   25    5000   85.5\n1   30    8000   90.2\n2   22    3000   78.0\n...'
    } else if (code.value.includes('import') && code.value.includes('sklearn')) {
      result = 'Model accuracy: 0.9567\nConfusion Matrix:\n[[32  1]\n [ 2  35]]'
    } else if (code.value.includes('def ') && code.value.includes('return')) {
      result = 'Function defined successfully ✓\nTest result: 42'
    } else {
      result = '✓ 代码执行完成\n（模拟运行环境，输出仅供参考）'
    }

    output.value = result
    isRunning.value = false
  }, 600 + Math.random() * 400)
}

function resetCode() {
  if (selectedExample.value) {
    code.value = selectedExample.value.code
  } else if (props.initialCode) {
    code.value = props.initialCode
  } else {
    code.value = '# 在这里输入你的代码\nprint("Hello EduMind!")'
  }
  output.value = ''
  activeTab.value = 'editor'
}

function selectExample(ex: CodeExample) {
  selectedExample.value = ex
  code.value = ex.code
  output.value = ''
  activeTab.value = 'editor'
  showExamples.value = false
}

function handleFileUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // If it's an image file, show as screenshot
  if (file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      screenshotPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  } else {
    // If it's a text file, read as code
    const reader = new FileReader()
    reader.onload = () => {
      code.value = reader.result as string
    }
    reader.readAsText(file)
  }
}

function clearScreenshot() {
  screenshotPreview.value = null
}

function handleExplain() {
  emit('explain', code.value)
}
</script>

<template>
  <div class="code-canvas">
    <!-- Toolbar -->
    <div class="cc-toolbar">
      <div class="cc-toolbar-left">
        <button
          :class="['cc-tab', { active: activeTab === 'editor' }]"
          @click="activeTab = 'editor'"
        >
          <FileCode :size="14" stroke-width="1.5" />
          <span>代码</span>
        </button>
        <button
          :class="['cc-tab', { active: activeTab === 'preview' }]"
          @click="activeTab = 'preview'"
        >
          <Terminal :size="14" stroke-width="1.5" />
          <span>运行结果</span>
          <span v-if="output" class="cc-dot" />
        </button>

        <div class="cc-divider" />

        <!-- Preset Examples -->
        <div v-if="examples && examples.length > 0" class="cc-examples-wrapper">
          <button class="cc-btn cc-examples-btn" @click="showExamples = !showExamples">
            <FileCode :size="13" stroke-width="1.5" />
            <span>示例代码</span>
          </button>
          <transition name="fade">
            <div v-if="showExamples" class="cc-examples-dropdown">
              <button
                v-for="(ex, idx) in examples"
                :key="idx"
                class="cc-example-item"
                @click="selectExample(ex)"
              >
                <span class="cei-title">{{ ex.title }}</span>
                <span class="cei-desc">{{ ex.description }}</span>
              </button>
            </div>
          </transition>
        </div>
      </div>

      <div class="cc-toolbar-right">
        <!-- Upload Screenshot -->
        <button class="cc-btn" title="上传截图" @click="fileInput?.click()">
          <Image :size="13" stroke-width="1.5" />
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/*,.py,.txt,.js,.ts"
          style="display: none"
          @change="handleFileUpload"
        />

        <!-- Draw mode -->
        <button :class="['cc-btn', { active: isDrawing }]" title="涂鸦标注" @click="isDrawing = !isDrawing">
          <Pen :size="13" stroke-width="1.5" />
        </button>

        <!-- AI Explain -->
        <button class="cc-btn cc-explain-btn" title="AI 解释代码" @click="handleExplain">
          <Sparkles :size="13" stroke-width="1.5" />
          <span>解释代码</span>
        </button>

        <div class="cc-divider" />

        <button class="cc-btn" title="重置代码" @click="resetCode">
          <RotateCcw :size="13" stroke-width="1.5" />
        </button>
        <button class="cc-btn cc-run-btn" :disabled="isRunning" @click="runCode">
          <Play :size="13" stroke-width="1.5" />
          <span>{{ isRunning ? '运行中...' : '运行' }}</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="cc-body">
      <!-- Code Editor -->
      <div v-show="activeTab === 'editor'" class="cc-editor">
        <textarea
          v-model="code"
          class="cc-textarea"
          spellcheck="false"
          wrap="off"
        />
        <!-- Screenshot Overlay -->
        <div v-if="screenshotPreview" class="cc-screenshot-overlay">
          <img :src="screenshotPreview" alt="截图" class="cc-screenshot-img" />
          <div v-if="isDrawing" class="cc-drawing-canvas" />
          <button class="cc-screenshot-close" @click="clearScreenshot">
            <X :size="14" stroke-width="1.5" />
          </button>
          <div class="cc-screenshot-label">
            <Image :size="12" stroke-width="1.5" />
            截图参考
          </div>
        </div>
      </div>

      <!-- Output -->
      <div v-show="activeTab === 'preview'" class="cc-output">
        <div v-if="isRunning" class="cc-output-loading">
          <div class="cc-spinner" />
          <span>执行中...</span>
        </div>
        <pre v-else-if="output" class="cc-output-text">{{ output }}</pre>
        <div v-else class="cc-output-empty">
          <Play :size="24" stroke-width="1" />
          <span>点击「运行」查看结果</span>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="cc-statusbar">
      <span class="cc-lang">{{ language ?? 'python' }}</span>
      <span class="cc-sep">|</span>
      <span class="cc-lines">{{ code.split('\n').length }} 行</span>
      <span v-if="selectedExample" class="cc-sep">|</span>
      <span v-if="selectedExample" class="cc-example-name">{{ selectedExample.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.code-canvas {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  margin: 12px 0;
}

/* ── Toolbar ── */
.cc-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid var(--color-border);
  gap: 8px;
  flex-wrap: wrap;
}

.cc-toolbar-left,
.cc-toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cc-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.cc-tab:hover { color: var(--color-text-secondary); }

.cc-tab.active {
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
}

.cc-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent-emerald);
}

.cc-divider {
  width: 1px;
  height: 16px;
  background: var(--color-border);
  margin: 0 4px;
}

.cc-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}

.cc-btn:hover { color: var(--color-text-primary); background: rgba(255,255,255,0.04); }
.cc-btn.active { color: var(--color-accent-cyan); background: rgba(0,212,255,0.06); }

.cc-explain-btn { color: var(--color-accent-cyan); }
.cc-explain-btn:hover { background: rgba(0,212,255,0.06); }

.cc-run-btn {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff !important;
  padding: 5px 12px;
}

.cc-run-btn:hover:not(:disabled) {
  box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
}

.cc-run-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Examples Dropdown ── */
.cc-examples-wrapper { position: relative; }

.cc-examples-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  width: 240px;
  max-height: 200px;
  overflow-y: auto;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  z-index: 20;
  padding: 6px;
}

.cc-example-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 6px;
  text-align: left;
  width: 100%;
  font-size: 11px;
  transition: background 0.15s;
}

.cc-example-item:hover { background: rgba(0, 212, 255, 0.06); }

.cei-title { font-weight: 600; color: var(--color-text-primary); }
.cei-desc { font-size: 10px; color: var(--color-text-tertiary); }

/* ── Body ── */
.cc-body {
  display: flex;
  min-height: 200px;
  max-height: 400px;
}

.cc-editor,
.cc-output {
  flex: 1;
  position: relative;
  min-height: 200px;
}

.cc-editor {
  border-right: 1px solid var(--color-border);
}

.cc-textarea {
  width: 100%;
  height: 100%;
  min-height: 200px;
  resize: vertical;
  padding: 16px;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  tab-size: 4;
  outline: none;
}

.cc-textarea:focus {
  background: rgba(0, 212, 255, 0.02);
}

.cc-textarea::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.4;
}

/* Screenshot overlay */
.cc-screenshot-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
}

.cc-screenshot-img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  object-fit: contain;
}

.cc-drawing-canvas {
  position: absolute;
  inset: 0;
  cursor: crosshair;
}

.cc-screenshot-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(0,0,0,0.5);
  color: #fff;
}

.cc-screenshot-close:hover { background: rgba(0,0,0,0.7); }

.cc-screenshot-label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: var(--color-text-tertiary);
  background: rgba(0,0,0,0.5);
  padding: 3px 8px;
  border-radius: 4px;
}

/* Output */
.cc-output {
  display: flex;
  align-items: stretch;
}

.cc-output-text {
  flex: 1;
  padding: 16px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-accent-emerald);
  white-space: pre-wrap;
  overflow: auto;
}

.cc-output-loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.cc-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent-cyan);
  border-radius: 50%;
  animation: cc-spin 0.6s linear infinite;
}

@keyframes cc-spin { to { transform: rotate(360deg); } }

.cc-output-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
  font-size: 12px;
}

/* ── Status Bar ── */
.cc-statusbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-top: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.2);
  font-size: 10px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.cc-sep { opacity: 0.3; }
.cc-example-name { color: var(--color-accent-cyan); }

/* ── Transition ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .cc-body { flex-direction: column; max-height: none; }
  .cc-editor { border-right: none; border-bottom: 1px solid var(--color-border); }
}
</style>
