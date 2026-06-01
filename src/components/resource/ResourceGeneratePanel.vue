<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useEduMindTheme'
import { generateResources } from '@/lib/api'
import type { GeneratedResource } from '@/types/api'
import {
  Sparkles,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  X
} from 'lucide-vue-next'

const { isDark } = useTheme()

const FALLBACK_DATA: GeneratedResource[] = [
  {
    id: '1',
    concept: '二级指针传参原理',
    example: 'swap 函数中二级指针的使用',
    exercise: '实现 createNode 函数使用二级指针',
    mistakeReminder: '混淆修改指针变量和修改指针指向的值',
    recommendReason: '画像显示指针掌握度仅 42%，需要强化二级指针理解',
    evidence: {
      profileSource: 'ProfileAgent 识别指针薄弱',
      evaluationReason: '测评正确率 41%',
      pathStage: '课后巩固阶段',
      formatReason: '学生偏好思维导图+例题'
    }
  },
  {
    id: '2',
    concept: 'BFS 队列推进与 visited 标记',
    example: 'BFS 遍历邻接表',
    exercise: '实现 BFS 并正确标记 visited',
    mistakeReminder: '入队前后标记时机不稳定导致重复访问',
    recommendReason: '图结构搜索掌握度 38%，BFS visited 是核心盲点',
    evidence: {
      profileSource: 'EvaluationAgent 发现 BFS 盲点',
      evaluationReason: 'BFS 相关题目正确率 38%',
      pathStage: '搜索训练阶段',
      formatReason: '队列快照动画更直观'
    }
  },
  {
    id: '3',
    concept: '悬空指针与内存释放',
    example: 'free 后继续访问指针',
    exercise: '检测并修复悬空指针代码',
    mistakeReminder: '释放后未置 NULL 导致悬空引用',
    recommendReason: '释放后悬空指针掌握度 36%',
    evidence: {
      profileSource: 'EvaluationAgent 错因分析',
      evaluationReason: '悬空引用相关题目 0/3 正确',
      pathStage: '课后微训练',
      formatReason: '代码追踪练习更有效'
    }
  }
]

const resources = ref<GeneratedResource[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const generated = ref(false)
const evidenceModalResource = ref<GeneratedResource | null>(null)

async function handleGenerate() {
  loading.value = true
  error.value = null
  try {
    const result = await generateResources()
    resources.value = result.items
    generated.value = true
  } catch (e: any) {
    error.value = e?.message || '生成失败，已使用示例数据'
    resources.value = FALLBACK_DATA
    generated.value = true
  } finally {
    loading.value = false
  }
}

function openEvidence(resource: GeneratedResource) {
  evidenceModalResource.value = resource
}

function closeEvidence() {
  evidenceModalResource.value = null
}

const EVIDENCE_FIELDS: { key: keyof GeneratedResource['evidence']; label: string }[] = [
  { key: 'profileSource', label: '画像来源' },
  { key: 'evaluationReason', label: '评估依据' },
  { key: 'pathStage', label: '学习阶段' },
  { key: 'formatReason', label: '格式推荐' }
]
</script>

<template>
  <div class="rgp-wrapper">
    <div class="rgp-header">
      <div class="rgp-header-left">
        <Sparkles :size="20" class="rgp-header-icon" />
        <h3 class="rgp-header-title">AI 个性化生成资源</h3>
      </div>
      <button
        class="rgp-generate-btn"
        :disabled="loading"
        @click="handleGenerate"
      >
        <Sparkles v-if="!loading" :size="16" class="rgp-btn-icon" />
        <span v-if="loading" class="rgp-spinner"></span>
        <span>{{ loading ? '生成中...' : generated ? '重新生成' : 'AI 个性化生成资源' }}</span>
      </button>
    </div>

    <div v-if="error" class="rgp-error">
      <AlertTriangle :size="14" />
      <span>{{ error }}</span>
    </div>

    <div v-if="generated && resources.length > 0" class="rgp-grid">
      <div
        v-for="item in resources"
        :key="item.id"
        class="rgp-card"
      >
        <div class="rgp-card-header">
          <BookOpen :size="16" class="rgp-card-header-icon" />
          <h4 class="rgp-card-concept">{{ item.concept }}</h4>
        </div>

        <div class="rgp-card-body">
          <div class="rgp-card-section">
            <span class="rgp-section-label rgp-section-label--concept">概念讲解</span>
            <p class="rgp-section-text">{{ item.concept }}</p>
          </div>

          <div class="rgp-card-section">
            <span class="rgp-section-label rgp-section-label--example">例题</span>
            <p class="rgp-section-text">{{ item.example }}</p>
          </div>

          <div class="rgp-card-section">
            <span class="rgp-section-label rgp-section-label--exercise">练习题</span>
            <p class="rgp-section-text">{{ item.exercise }}</p>
          </div>

          <div class="rgp-card-section">
            <span class="rgp-section-label rgp-section-label--mistake">
              <AlertTriangle :size="12" />
              错因提醒
            </span>
            <p class="rgp-section-text">{{ item.mistakeReminder }}</p>
          </div>

          <div class="rgp-card-section">
            <span class="rgp-section-label rgp-section-label--reason">推荐理由</span>
            <p class="rgp-section-text">{{ item.recommendReason }}</p>
          </div>
        </div>

        <div class="rgp-card-footer">
          <button class="rgp-evidence-btn" @click="openEvidence(item)">
            <HelpCircle :size="14" />
            <span>为什么推荐我？</span>
            <ChevronRight :size="14" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="rgp-modal">
        <div v-if="evidenceModalResource" class="rgp-overlay" @click.self="closeEvidence">
          <div class="rgp-modal">
            <div class="rgp-modal-header">
              <div class="rgp-modal-title-row">
                <HelpCircle :size="18" class="rgp-modal-title-icon" />
                <h3 class="rgp-modal-title">推荐依据</h3>
              </div>
              <button class="rgp-modal-close" @click="closeEvidence">
                <X :size="18" />
              </button>
            </div>

            <div class="rgp-modal-body">
              <div class="rgp-modal-concept">{{ evidenceModalResource.concept }}</div>

              <div class="rgp-modal-fields">
                <div
                  v-for="field in EVIDENCE_FIELDS"
                  :key="field.key"
                  class="rgp-modal-field"
                >
                  <span class="rgp-modal-field-label">{{ field.label }}</span>
                  <span class="rgp-modal-field-value">{{ evidenceModalResource.evidence[field.key] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.rgp-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rgp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.rgp-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rgp-header-icon {
  color: #4a6cf7;
  flex-shrink: 0;
}

.rgp-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

:root.dark .rgp-header-title,
.dark .rgp-header-title {
  color: #fff;
}

.rgp-generate-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #4a6cf7 0%, #6a8cff 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(74, 108, 247, 0.3);
  white-space: nowrap;
}

.rgp-generate-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #3555db 0%, #5a7cee 100%);
  box-shadow: 0 4px 14px rgba(74, 108, 247, 0.4);
  transform: translateY(-1px);
}

.rgp-generate-btn:active:not(:disabled) {
  transform: translateY(0);
}

.rgp-generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.rgp-btn-icon {
  flex-shrink: 0;
}

.rgp-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: rgp-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes rgp-spin {
  to { transform: rotate(360deg); }
}

.rgp-error {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #fff7e6;
  border: 1px solid #ffd591;
  color: #fa8c16;
  font-size: 13px;
}

.dark .rgp-error {
  background: rgba(250, 140, 22, 0.1);
  border-color: rgba(250, 140, 22, 0.3);
  color: #ffa940;
}

.rgp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.rgp-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.rgp-card:hover {
  box-shadow: 0 6px 20px rgba(74, 108, 247, 0.1);
  border-color: #bfbfbf;
  transform: translateY(-2px);
}

.dark .rgp-card {
  background: #1e293b;
  border-color: rgba(51, 65, 85, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.dark .rgp-card:hover {
  box-shadow: 0 6px 20px rgba(74, 108, 247, 0.15);
  border-color: #475569;
}

.rgp-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rgp-card-header-icon {
  color: #4a6cf7;
  flex-shrink: 0;
}

.rgp-card-concept {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.dark .rgp-card-concept {
  color: #fff;
}

.rgp-card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rgp-card-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.rgp-section-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 7px;
  border-radius: 4px;
  width: fit-content;
}

.rgp-section-label--concept {
  background: #e6f4ff;
  color: #1677ff;
}

.rgp-section-label--example {
  background: #f6ffed;
  color: #52c41a;
}

.rgp-section-label--exercise {
  background: #fff7e6;
  color: #fa8c16;
}

.rgp-section-label--mistake {
  background: #fff1f0;
  color: #ff4d4f;
}

.rgp-section-label--reason {
  background: #f0f4ff;
  color: #4a6cf7;
}

.dark .rgp-section-label--concept {
  background: rgba(22, 119, 255, 0.15);
  color: #69b1ff;
}

.dark .rgp-section-label--example {
  background: rgba(82, 196, 26, 0.15);
  color: #95de64;
}

.dark .rgp-section-label--exercise {
  background: rgba(250, 140, 22, 0.15);
  color: #ffa940;
}

.dark .rgp-section-label--mistake {
  background: rgba(255, 77, 79, 0.15);
  color: #ff7875;
}

.dark .rgp-section-label--reason {
  background: rgba(74, 108, 247, 0.15);
  color: #6a8cff;
}

.rgp-section-text {
  font-size: 13px;
  color: #595959;
  line-height: 1.5;
  margin: 0;
}

.dark .rgp-section-text {
  color: #94a3b8;
}

.rgp-card-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

.dark .rgp-card-footer {
  border-top-color: #334155;
}

.rgp-evidence-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background: #fafbff;
  color: #4a6cf7;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rgp-evidence-btn:hover {
  background: #f0f4ff;
  border-color: #4a6cf7;
  box-shadow: 0 2px 6px rgba(74, 108, 247, 0.15);
}

.dark .rgp-evidence-btn {
  background: rgba(74, 108, 247, 0.08);
  border-color: #334155;
  color: #6a8cff;
}

.dark .rgp-evidence-btn:hover {
  background: rgba(74, 108, 247, 0.15);
  border-color: #4a6cf7;
}

.rgp-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  padding: 20px;
}

.dark .rgp-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.rgp-modal {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  animation: rgp-modal-in 0.25s ease-out;
}

.dark .rgp-modal {
  background: #1e293b;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

@keyframes rgp-modal-in {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.rgp-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.dark .rgp-modal-header {
  border-bottom-color: #334155;
}

.rgp-modal-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rgp-modal-title-icon {
  color: #4a6cf7;
  flex-shrink: 0;
}

.rgp-modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.dark .rgp-modal-title {
  color: #fff;
}

.rgp-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #8c8c8c;
  cursor: pointer;
  transition: all 0.15s ease;
}

.rgp-modal-close:hover {
  background: #f5f5f5;
  color: #1a1a2e;
}

.dark .rgp-modal-close:hover {
  background: #334155;
  color: #fff;
}

.rgp-modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rgp-modal-concept {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  padding-bottom: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.dark .rgp-modal-concept {
  color: #fff;
  border-bottom-color: #334155;
}

.rgp-modal-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rgp-modal-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rgp-modal-field-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8c8c8c;
}

.dark .rgp-modal-field-label {
  color: #64748b;
}

.rgp-modal-field-value {
  font-size: 14px;
  color: #1a1a2e;
  line-height: 1.5;
  padding: 8px 12px;
  background: #f8f9fb;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.dark .rgp-modal-field-value {
  color: #e2e8f0;
  background: #0f172a;
  border-color: #334155;
}

.rgp-modal-enter-active {
  transition: opacity 0.25s ease;
}

.rgp-modal-leave-active {
  transition: opacity 0.2s ease;
}

.rgp-modal-enter-from,
.rgp-modal-leave-to {
  opacity: 0;
}
</style>
