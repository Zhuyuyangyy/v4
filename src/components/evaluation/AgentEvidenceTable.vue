<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgePoint } from '@/types/knowledge-tree'

const props = defineProps<{
  points: KnowledgePoint[]
}>()

const AGENT_NAMES: Record<string, string> = {
  profile: '感知智能体',
  planning: '规划智能体',
  action: '执行智能体',
  reflection: '反思智能体',
  evaluation: '评估智能体',
}

const EVIDENCE_TYPES: Record<string, string> = {
  behavior: '行为证据',
  reflection: '反思证据',
  task_result: '任务结果',
  assessment: '评估证据',
  plan: '规划证据',
}

const SOURCES: Record<string, string> = {
  behavior: '传感器日志',
  reflection: '反思报告',
  task_result: '执行日志',
  assessment: '评估报告',
  plan: '规划任务集',
}

const rows = computed(() => {
  return props.points.slice(0, 6).map((p) => {
    const agent = p.agentEvidence?.[0]
    const evidenceType = agent?.evidenceType ?? 'assessment'
    return {
      agent: agent?.agentName ?? AGENT_NAMES[agent?.agentType ?? 'evaluation'] ?? '评估智能体',
      type: EVIDENCE_TYPES[evidenceType] ?? '评估证据',
      source: SOURCES[evidenceType] ?? '系统日志',
      description: agent?.samples?.[0] ?? p.reasonAnalysis ?? '综合评分偏低，需加强该维度学习',
      time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      confidence: `${p.confidence.toFixed(0)}%`,
    }
  })
})
</script>

<template>
  <div class="evidence-card">
    <div class="card-title">智能体评估证据</div>
    <div class="table-wrap">
      <table class="evidence-table">
        <thead>
          <tr>
            <th>智能体</th>
            <th>证据类型</th>
            <th>证据来源</th>
            <th>证据描述</th>
            <th>时间</th>
            <th>置信度</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td><span class="agent-tag">{{ row.agent }}</span></td>
            <td>{{ row.type }}</td>
            <td>{{ row.source }}</td>
            <td class="desc-cell" :title="row.description">{{ row.description }}</td>
            <td class="time-cell">{{ row.time }}</td>
            <td><span class="confidence" :class="{ high: parseInt(row.confidence) >= 80, mid: parseInt(row.confidence) >= 60 && parseInt(row.confidence) < 80 }">{{ row.confidence }}</span></td>
          </tr>
          <tr v-if="!rows.length">
            <td colspan="6" class="empty-cell">暂无评估证据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.evidence-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  background: rgba(13, 18, 38, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(1.2);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.evidence-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(91, 141, 239, 0.08), transparent 60%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  color: rgba(242, 246, 250, 0.9);
  margin-bottom: 12px;
}

.table-wrap {
  position: relative;
  flex: 1;
  overflow: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.evidence-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.evidence-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
}

.evidence-table th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: rgba(176, 190, 210, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;
}

.evidence-table td {
  padding: 10px 12px;
  color: rgba(242, 246, 250, 0.78);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  white-space: nowrap;
}

.evidence-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.desc-cell {
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time-cell {
  color: rgba(176, 190, 210, 0.65);
}

.agent-tag {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 212, 255, 0.12);
  color: #00d4ff;
  font-weight: 500;
}

.confidence {
  font-weight: 700;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: #e66a6a;
}

.confidence.high { color: #45c486; }
.confidence.mid { color: #f59e0b; }

.empty-cell {
  text-align: center;
  color: rgba(176, 190, 210, 0.5);
  padding: 24px;
}
</style>
