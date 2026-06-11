<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Activity, CheckCircle2, ArrowRight, Clock, AlertTriangle, Sparkles } from 'lucide-vue-next'
import { fetchEvidenceTraces, fetchEvidenceSummary } from '@/lib/api'
import type { EvidenceTrace, EvidenceSummary, EvidenceSummaryResponse, TraceAgentResult, TraceRecord } from '@/types/api'

const summary = ref<EvidenceSummary | null>(null)
const traces = ref<EvidenceTrace[]>([])
const loading = ref(true)
const usingFallback = ref(false)

const FALLBACK_SUMMARY: EvidenceSummary = {
  workflowId: 'wf-fallback-001',
  totalAgents: 6,
  completedAgents: 6,
  totalDuration: 3200,
  traceCount: 14,
  keyFindings: [
    '指针与内存掌握度仅 42%',
    '图结构搜索存在 BFS visited 标记时机问题',
    '学生偏好从文本讲解转向思维导图+例题',
  ],
  profileUpdates: [
    { field: '图结构掌握度', before: '68%', after: '42%', evidence: '阶段测评错题 2/3 来自图结构' },
    { field: '指针掌握度', before: '65%', after: '42%', evidence: '指针练习正确率下降至 42%' },
  ],
  pathAdjustments: [
    { reason: '评估发现 4 个盲点', addedNodes: ['二级指针专项训练', 'BFS visited 标记专项'], removedNodes: [] },
  ],
}

const FALLBACK_TRACES: EvidenceTrace[] = [
  {
    traceId: 't-001', workflowId: 'wf-fallback-001', agentId: 'profile', agentName: '画像智能体',
    input: '测评结果 + 提问记录 + 学习行为', output: '识别指针与图结构为薄弱项，偏好思维导图',
    confidence: 0.92, evidenceTags: ['测评数据', '答题记录'], timestamp: '2025-05-26T09:14:00Z', duration: 480,
  },
  {
    traceId: 't-002', workflowId: 'wf-fallback-001', agentId: 'path', agentName: '路径规划智能体',
    input: '画像标签 + 课程目标 + 阶段任务', output: '插入二级指针专项与 BFS visited 标记专项节点',
    confidence: 0.88, evidenceTags: ['画像标签', '薄弱点'], timestamp: '2025-05-26T09:16:00Z', duration: 520,
  },
  {
    traceId: 't-003', workflowId: 'wf-fallback-001', agentId: 'resource', agentName: '资源推荐智能体',
    input: '画像偏好 + 路径阶段 + 知识薄弱点', output: '匹配 5 个资源：思维导图 1 · 专项练习 3 · 图解卡片 1',
    confidence: 0.85, evidenceTags: ['偏好匹配', '资源库'], timestamp: '2025-05-26T09:17:00Z', duration: 360,
  },
  {
    traceId: 't-004', workflowId: 'wf-fallback-001', agentId: 'tutor', agentName: 'AI 辅导智能体',
    input: '指针提问 + 图遍历提问', output: '解释二级指针与数组指针区别；BFS visited 数组作用',
    confidence: 0.90, evidenceTags: ['对话上下文', '知识图谱'], timestamp: '2025-05-26T10:02:00Z', duration: 640,
  },
  {
    traceId: 't-005', workflowId: 'wf-fallback-001', agentId: 'eval', agentName: '评估智能体',
    input: '测评数据 + 答题记录 + 学习时长', output: '阶段测评 76 分，发现 4 个盲点',
    confidence: 0.94, evidenceTags: ['测评结果', '错题分析'], timestamp: '2025-05-26T15:30:00Z', duration: 800,
  },
  {
    traceId: 't-006', workflowId: 'wf-fallback-001', agentId: 'feedback', agentName: '反馈智能体',
    input: '评估报告 + 错题记录 + 路径进度', output: '4 个盲点写入画像，触发路径规划智能体重排',
    confidence: 0.87, evidenceTags: ['反馈传播', '画像更新'], timestamp: '2025-05-26T15:31:00Z', duration: 400,
  },
]

const AGENT_COLORS: Record<string, string> = {
  profile: '#7c3aed',
  path: '#00d4ff',
  resource: '#06d6a0',
  tutor: '#f59e0b',
  eval: '#f43f5e',
  feedback: '#3b82f6',
}

function agentColor(agentId: string) {
  return AGENT_COLORS[agentId] || '#00d4ff'
}

function formatDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rs = s % 60
  return `${m}m ${rs}s`
}

function formatTimestamp(ts: string) {
  const d = new Date(ts)
  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function confidenceLevel(c: number) {
  if (c >= 0.9) return 'high'
  if (c >= 0.8) return 'medium'
  return 'low'
}

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : []
}

function toNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function toStringValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function agentIdFromName(name: string) {
  return name
    .replace(/Agent$/i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'agent'
}

function normalizeSummary(raw: unknown): EvidenceSummary {
  const data = (raw ?? {}) as Partial<EvidenceSummary & EvidenceSummaryResponse>
  const agentCounts = data.agentCounts && typeof data.agentCounts === 'object' ? data.agentCounts : {}
  const totalAgents = toNumber(data.totalAgents, Object.keys(agentCounts).length)
  const completedAgents = toNumber(data.completedAgents, totalAgents)
  const traceCount = toNumber(data.traceCount, toNumber(data.totalTraces, 0))
  const fallbackRate = toNumber(data.fallbackRate, 0)
  const riskFlagCount = toNumber(data.riskFlagCount, 0)
  const riskRate = toNumber(data.riskRate, 0)
  const llmAvailable = data.llmAvailable ?? fallbackRate < 100
  const keyFindings = toArray<string>(data.keyFindings)

  return {
    workflowId: toStringValue(data.workflowId, data.lastTraceAt ? 'wf-live-summary' : FALLBACK_SUMMARY.workflowId),
    totalAgents,
    completedAgents,
    totalDuration: toNumber(data.totalDuration, toNumber(data.avgDurationMs, 0)),
    traceCount,
    keyFindings: keyFindings.length
      ? keyFindings
      : [
          `累计追踪 ${traceCount} 条证据链，覆盖 ${totalAgents} 类智能体。`,
          `当前 Fallback 率 ${fallbackRate}%，LLM ${llmAvailable ? '已连接' : '暂不可用'}。`,
          riskFlagCount > 0
            ? `发现 ${riskFlagCount} 个风险标记，风险率 ${riskRate}%。`
            : '暂无风险标记，证据链运行稳定。',
        ],
    profileUpdates: toArray<EvidenceSummary['profileUpdates'][number]>(data.profileUpdates),
    pathAdjustments: toArray<EvidenceSummary['pathAdjustments'][number]>(data.pathAdjustments).map((item) => ({
      reason: toStringValue(item.reason, '路径根据最新证据保持当前规划'),
      addedNodes: toArray<string>(item.addedNodes),
      removedNodes: toArray<string>(item.removedNodes),
    })),
  }
}

function normalizeEvidenceTrace(raw: Partial<EvidenceTrace>, index = 0, workflowId = 'wf-live-summary'): EvidenceTrace {
  const agentName = toStringValue(raw.agentName, 'EvidenceAgent')
  return {
    traceId: toStringValue(raw.traceId, `${workflowId}-${index}`),
    workflowId: toStringValue(raw.workflowId, workflowId),
    agentId: toStringValue(raw.agentId, agentIdFromName(agentName)),
    agentName,
    input: toStringValue(raw.input, '暂无输入摘要'),
    output: toStringValue(raw.output, '暂无输出摘要'),
    confidence: toNumber(raw.confidence, 0.6),
    evidenceTags: toArray<string>(raw.evidenceTags),
    timestamp: toStringValue(raw.timestamp, new Date().toISOString()),
    duration: toNumber(raw.duration, 0),
  }
}

function normalizeTraceRecord(record: TraceRecord, recordIndex: number): EvidenceTrace[] {
  const requestId = toStringValue(record.requestId, `trace-${recordIndex}`)
  const agentResults = toArray<TraceAgentResult>(record.agentResults)

  if (!agentResults.length) {
    return [
      normalizeEvidenceTrace(
        {
          traceId: requestId,
          workflowId: requestId,
          agentId: agentIdFromName(toArray<string>(record.agents)[0] || 'EvidenceAgent'),
          agentName: toArray<string>(record.agents).join(' / ') || 'EvidenceAgent',
          input: record.inputsSummary,
          output: record.outputsSummary,
          confidence: record.fallbackUsed ? 0.6 : 0.82,
          evidenceTags: toArray<string>(record.evidence),
          timestamp: record.timestamp,
          duration: record.durationMs,
        },
        recordIndex,
        requestId,
      ),
    ]
  }

  return agentResults.map((result, index) =>
    normalizeEvidenceTrace(
      {
        traceId: `${requestId}-${index}`,
        workflowId: requestId,
        agentId: agentIdFromName(result.agentName),
        agentName: result.agentName,
        input: result.inputSummary || record.inputsSummary,
        output: result.outputSummary || record.outputsSummary,
        confidence: result.confidence,
        evidenceTags: result.evidence || record.evidence,
        timestamp: record.timestamp,
        duration: result.durationMs || record.durationMs,
      },
      index,
      requestId,
    ),
  )
}

function normalizeTraces(raw: unknown): EvidenceTrace[] {
  const data = raw as { traces?: Partial<EvidenceTrace>[]; items?: TraceRecord[] }
  const directTraces = toArray<Partial<EvidenceTrace>>(data?.traces)
  if (directTraces.length) {
    return directTraces.map((trace, index) => normalizeEvidenceTrace(trace, index))
  }

  return toArray<TraceRecord>(data?.items).flatMap((record, index) => normalizeTraceRecord(record, index))
}

const totalDurationDisplay = computed(() => {
  const dur = summary.value?.totalDuration ?? 0
  return formatDuration(dur)
})

onMounted(async () => {
  try {
    const [summaryRes, tracesRes] = await Promise.all([
      fetchEvidenceSummary(),
      fetchEvidenceTraces(),
    ])
    summary.value = normalizeSummary(summaryRes)
    traces.value = normalizeTraces(tracesRes)
  } catch {
    summary.value = FALLBACK_SUMMARY
    traces.value = FALLBACK_TRACES
    usingFallback.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="etv-root">
    <div v-if="loading" class="etv-loading">
      <Activity :size="20" class="etv-spin" />
      <span>加载证据链...</span>
    </div>

    <template v-else>
      <div v-if="usingFallback" class="etv-fallback-notice">
        <AlertTriangle :size="14" />
        <span>API 不可用，已切换至示例数据</span>
      </div>

      <!-- Summary Section -->
      <section v-if="summary" class="etv-section etv-summary">
        <div class="etv-section-hd">
          <Sparkles :size="16" class="etv-section-icon" />
          <h2 class="etv-section-title">证据总览</h2>
        </div>

        <div class="etv-stats-grid">
          <div class="etv-stat-card">
            <div class="etv-stat-val" style="color: var(--color-accent-cyan)">{{ summary.totalAgents }}</div>
            <div class="etv-stat-label">总智能体</div>
          </div>
          <div class="etv-stat-card">
            <div class="etv-stat-val" style="color: var(--color-accent-emerald)">{{ summary.completedAgents }}</div>
            <div class="etv-stat-label">已完成</div>
          </div>
          <div class="etv-stat-card">
            <div class="etv-stat-val" style="color: var(--color-accent-amber)">{{ totalDurationDisplay }}</div>
            <div class="etv-stat-label">总耗时</div>
          </div>
          <div class="etv-stat-card">
            <div class="etv-stat-val" style="color: var(--color-accent-purple)">{{ summary.traceCount }}</div>
            <div class="etv-stat-label">追踪数</div>
          </div>
        </div>

        <!-- Key Findings -->
        <div class="etv-findings">
          <h3 class="etv-sub-title">关键发现</h3>
          <ul class="etv-finding-list">
            <li v-for="(finding, i) in summary.keyFindings" :key="i" class="etv-finding-item">
              <span class="etv-finding-dot" />
              <span>{{ finding }}</span>
            </li>
          </ul>
        </div>

        <!-- Profile Updates -->
        <div v-if="summary.profileUpdates.length" class="etv-updates">
          <h3 class="etv-sub-title">画像更新</h3>
          <div class="etv-update-grid">
            <div v-for="(upd, i) in summary.profileUpdates" :key="i" class="etv-update-card">
              <div class="etv-update-field">{{ upd.field }}</div>
              <div class="etv-update-flow">
                <span class="etv-update-before">{{ upd.before }}</span>
                <ArrowRight :size="14" class="etv-update-arrow" />
                <span class="etv-update-after">{{ upd.after }}</span>
              </div>
              <div class="etv-update-evidence">
                <AlertTriangle :size="12" />
                <span>{{ upd.evidence }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Path Adjustments -->
        <div v-if="summary.pathAdjustments.length" class="etv-adjustments">
          <h3 class="etv-sub-title">路径调整</h3>
          <div v-for="(adj, i) in summary.pathAdjustments" :key="i" class="etv-adj-card">
            <div class="etv-adj-reason">
              <Activity :size="13" />
              <span>{{ adj.reason }}</span>
            </div>
            <div v-if="adj.addedNodes.length" class="etv-adj-nodes">
              <span class="etv-adj-label added">新增节点</span>
              <span v-for="node in adj.addedNodes" :key="node" class="etv-adj-node added">{{ node }}</span>
            </div>
            <div v-if="adj.removedNodes.length" class="etv-adj-nodes">
              <span class="etv-adj-label removed">移除节点</span>
              <span v-for="node in adj.removedNodes" :key="node" class="etv-adj-node removed">{{ node }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Trace Timeline -->
      <section class="etv-section etv-timeline">
        <div class="etv-section-hd">
          <Activity :size="16" class="etv-section-icon" />
          <h2 class="etv-section-title">执行追踪</h2>
        </div>

        <div class="etv-timeline-list">
          <div
            v-for="trace in traces"
            :key="trace.traceId"
            class="etv-trace-card"
            :style="{ '--trace-accent': agentColor(trace.agentId) }"
          >
            <div class="etv-trace-glow" />

            <div class="etv-trace-hd">
              <span class="etv-trace-badge" :style="{ background: `${agentColor(trace.agentId)}18`, color: agentColor(trace.agentId), borderColor: `${agentColor(trace.agentId)}33` }">
                {{ trace.agentName }}
              </span>
              <div class="etv-trace-meta">
                <Clock :size="12" />
                <span>{{ formatTimestamp(trace.timestamp) }}</span>
                <span class="etv-trace-dur">{{ formatDuration(trace.duration) }}</span>
              </div>
            </div>

            <div class="etv-trace-flow">
              <div class="etv-trace-io">
                <span class="etv-trace-io-label">输入</span>
                <span class="etv-trace-io-value">{{ trace.input }}</span>
              </div>
              <ArrowRight :size="16" class="etv-trace-flow-arrow" />
              <div class="etv-trace-io">
                <span class="etv-trace-io-label">输出</span>
                <span class="etv-trace-io-value output">{{ trace.output }}</span>
              </div>
            </div>

            <div class="etv-trace-footer">
              <div :class="['etv-trace-confidence', confidenceLevel(trace.confidence)]">
                <CheckCircle2 :size="12" />
                <span>{{ Math.round(trace.confidence * 100) }}%</span>
              </div>
              <div class="etv-trace-tags">
                <span v-for="tag in trace.evidenceTags" :key="tag" class="etv-trace-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.etv-root {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 20px;
  font-family: var(--font-body);
  color: var(--color-text-primary);
}

.etv-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 60px 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.etv-spin {
  animation: etv-spin-anim 1s linear infinite;
}

@keyframes etv-spin-anim {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.etv-fallback-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  margin-bottom: 20px;
  border-radius: var(--radius-md);
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.15);
  color: var(--color-accent-amber);
  font-size: 12px;
}

.etv-section {
  margin-bottom: 32px;
}

.etv-section-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.etv-section-icon {
  color: var(--color-accent-cyan);
}

.etv-section-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.etv-sub-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 10px;
  letter-spacing: 0.04em;
}

.etv-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.etv-stat-card {
  padding: 16px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  text-align: center;
}

.etv-stat-val {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.etv-stat-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
  letter-spacing: 0.06em;
}

.etv-findings {
  margin-bottom: 24px;
}

.etv-finding-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.etv-finding-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: rgba(244, 63, 94, 0.04);
  border: 1px solid rgba(244, 63, 94, 0.08);
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.etv-finding-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-rose);
  flex-shrink: 0;
  margin-top: 6px;
}

.etv-updates {
  margin-bottom: 24px;
}

.etv-update-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.etv-update-card {
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.etv-update-field {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.etv-update-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.etv-update-before {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.etv-update-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.etv-update-after {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent-rose);
}

.etv-update-evidence {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11px;
  color: var(--color-text-tertiary);
  line-height: 1.5;
}

.etv-update-evidence svg {
  color: var(--color-accent-amber);
  flex-shrink: 0;
  margin-top: 1px;
}

.etv-adjustments {
  margin-bottom: 8px;
}

.etv-adj-card {
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.etv-adj-reason {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
}

.etv-adj-reason svg {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

.etv-adj-nodes {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.etv-adj-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.etv-adj-label.added {
  color: var(--color-accent-emerald);
}

.etv-adj-label.removed {
  color: var(--color-accent-rose);
}

.etv-adj-node {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  font-weight: 500;
}

.etv-adj-node.added {
  background: rgba(6, 214, 160, 0.1);
  border: 1px solid rgba(6, 214, 160, 0.2);
  color: var(--color-accent-emerald);
}

.etv-adj-node.removed {
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.2);
  color: var(--color-accent-rose);
}

.etv-timeline-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.etv-trace-card {
  position: relative;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
}

.etv-trace-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.etv-trace-glow {
  position: absolute;
  top: -24px;
  left: 20px;
  width: 80px;
  height: 50px;
  background: radial-gradient(ellipse, var(--trace-accent, #00d4ff), transparent 70%);
  opacity: 0.06;
  pointer-events: none;
}

.etv-trace-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.etv-trace-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid;
}

.etv-trace-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.etv-trace-dur {
  color: var(--color-text-secondary);
}

.etv-trace-flow {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.etv-trace-io {
  flex: 1;
  min-width: 0;
}

.etv-trace-io-label {
  display: block;
  font-size: 9px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.etv-trace-io-value {
  font-size: 12.5px;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.etv-trace-io-value.output {
  color: var(--color-text-primary);
  font-weight: 500;
}

.etv-trace-flow-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  margin-top: 16px;
}

.etv-trace-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.etv-trace-confidence {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
}

.etv-trace-confidence.high {
  color: var(--color-accent-emerald);
}

.etv-trace-confidence.medium {
  color: var(--color-accent-amber);
}

.etv-trace-confidence.low {
  color: var(--color-accent-rose);
}

.etv-trace-tags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.etv-trace-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

@media (max-width: 700px) {
  .etv-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .etv-trace-flow {
    flex-direction: column;
    gap: 8px;
  }

  .etv-trace-flow-arrow {
    transform: rotate(90deg);
    margin-top: 0;
    align-self: center;
  }

  .etv-update-grid {
    grid-template-columns: 1fr;
  }
}
</style>
