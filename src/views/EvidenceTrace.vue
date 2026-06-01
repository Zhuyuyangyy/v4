<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import EvidenceTraceView from '@/components/evidence/EvidenceTraceView.vue'
import { fetchEvidenceTraces, fetchEvidenceSummary } from '@/lib/api'
import type { EvidenceTrace, EvidenceSummary } from '@/types/api'

const loaded = ref(false)

const FALLBACK_SUMMARY: EvidenceSummary = {
  workflowId: 'wf-demo-001',
  totalAgents: 6,
  completedAgents: 6,
  totalDuration: 3200,
  traceCount: 14,
  keyFindings: [
    '指针与内存掌握度仅 42%，标记为薄弱域',
    '图结构搜索存在 BFS visited 标记时机问题',
    '学生偏好从文本讲解转向思维导图+例题拆解',
  ],
  profileUpdates: [
    { field: '图结构掌握度', before: '68%', after: '42%', evidence: '阶段测评错题 2/3 来自图结构' },
    { field: '指针掌握度', before: '65%', after: '42%', evidence: '指针练习正确率下降至 42%' },
    { field: '学习偏好', before: '文本讲解', after: '思维导图 + 例题拆解', evidence: '连续 3 次追问图解类资源' },
  ],
  pathAdjustments: [
    { reason: '评估发现 4 个盲点', addedNodes: ['二级指针专项训练', 'BFS visited 标记专项'], removedNodes: [] },
    { reason: '已掌握节点优化', addedNodes: [], removedNodes: ['C语言基础复习'] },
  ],
}

const FALLBACK_TRACES: EvidenceTrace[] = [
  { traceId: 't1', workflowId: 'wf-demo-001', agentId: 'profile', agentName: '画像智能体', input: '学生答题记录 + 历史画像', output: '识别指针与图结构薄弱', confidence: 0.92, evidenceTags: ['画像分析', '薄弱识别'], timestamp: '2026-05-28T14:32:17', duration: 320 },
  { traceId: 't2', workflowId: 'wf-demo-001', agentId: 'resource', agentName: '资源推荐智能体', input: '薄弱知识点 + 偏好', output: '5 个个性化资源', confidence: 0.87, evidenceTags: ['资源匹配', 'LLM生成'], timestamp: '2026-05-28T14:32:19', duration: 480 },
  { traceId: 't3', workflowId: 'wf-demo-001', agentId: 'path', agentName: '路径规划智能体', input: '画像 + 评估反馈', output: '插入 2 个补弱节点', confidence: 0.85, evidenceTags: ['路径重排', '补弱插入'], timestamp: '2026-05-28T14:32:18', duration: 290 },
  { traceId: 't4', workflowId: 'wf-demo-001', agentId: 'tutor', agentName: 'AI 辅导智能体', input: '学生提问 + 上下文', output: '概念讲解 + 代码示例', confidence: 0.90, evidenceTags: ['辅导生成', '多模式'], timestamp: '2026-05-28T14:32:23', duration: 560 },
  { traceId: 't5', workflowId: 'wf-demo-001', agentId: 'eval', agentName: '评估智能体', input: '练习结果 + 资源完成度', output: '4 个盲点 + 错因归类', confidence: 0.88, evidenceTags: ['效果评估', '错因分析'], timestamp: '2026-05-28T14:32:20', duration: 410 },
  { traceId: 't6', workflowId: 'wf-demo-001', agentId: 'feedback', agentName: '反馈智能体', input: '评估结果 + 画像变化', output: '画像更新 + 路径触发', confidence: 0.83, evidenceTags: ['反向传播', '路径触发'], timestamp: '2026-05-28T14:32:21', duration: 350 },
]

const summary = ref<EvidenceSummary>(FALLBACK_SUMMARY)
const traces = ref<EvidenceTrace[]>(FALLBACK_TRACES)
const isFallback = ref(false)

onMounted(async () => {
  try {
    const [summaryData, tracesData] = await Promise.all([
      fetchEvidenceSummary(),
      fetchEvidenceTraces(),
    ])
    summary.value = summaryData
    traces.value = tracesData.traces
  } catch {
    isFallback.value = true
  } finally {
    loaded.value = true
  }
})
</script>

<template>
  <div class="evidence-page">
    <div class="evidence-page-bg" />

    <div class="evidence-page-content">
      <div class="evidence-page-header">
        <router-link to="/" class="evidence-back-btn">
          <ArrowLeft :size="16" stroke-width="1.5" />
          <span>返回首页</span>
        </router-link>
        <div>
          <div class="evidence-badge">EVIDENCE TRACE</div>
          <h1 class="evidence-title">多智能体协作<span class="evidence-gradient">证据链追溯</span></h1>
          <p class="evidence-subtitle">查看最近一次完整工作流 trace，每个 Agent 的输入、输出、置信度和证据标签均可验证。</p>
        </div>
      </div>

      <div v-if="isFallback" class="evidence-fallback-notice">
        当前使用演示数据（后端 API 未连接），展示完整证据链结构供评委审阅。
      </div>

      <EvidenceTraceView />
    </div>
  </div>
</template>

<style scoped>
.evidence-page {
  position: relative;
  min-height: 100vh;
  background: #070a18;
  color: #e8edf5;
}

.evidence-page-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(0, 212, 255, 0.06), transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(124, 58, 237, 0.06), transparent 50%);
}

.evidence-page-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px 60px;
}

.evidence-page-header {
  margin-bottom: 32px;
}

.evidence-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 20px;
  text-decoration: none;
  transition: all 0.2s;
}

.evidence-back-btn:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.evidence-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(124, 58, 237, 0.08);
  color: #7c3aed;
  border: 1px solid rgba(124, 58, 237, 0.12);
  margin-bottom: 12px;
  letter-spacing: 0.12em;
}

.evidence-title {
  margin: 0 0 8px;
  color: #fff;
  font-size: 34px;
  font-weight: 400;
}

.evidence-gradient {
  background: linear-gradient(135deg, #7c3aed, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.evidence-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.evidence-fallback-notice {
  padding: 12px 18px;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .evidence-page-content {
    padding: 24px 20px 40px;
  }

  .evidence-title {
    font-size: 26px;
  }
}
</style>
