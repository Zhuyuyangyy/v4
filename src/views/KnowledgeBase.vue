<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Activity,
  BrainCircuit,
  Database,
  GitBranch,
  Loader2,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-vue-next'
import { fetchKnowledgeStatus, fetchLatestProfile, searchKnowledge } from '@/lib/api'
import MultiAgentReverseUpdateMap from '@/components/evaluation/MultiAgentReverseUpdateMap.vue'
import type { KnowledgeContextResponse, KnowledgeHit, KnowledgeStatusResponse } from '@/types/api'

const query = ref('反向评估 学习画像 存储 薄弱点 画像更新 路径重规划')
const isLoading = ref(false)
const status = ref<KnowledgeStatusResponse | null>(null)
const context = ref<KnowledgeContextResponse | null>(null)
const errorMessage = ref('')

const hits = computed<KnowledgeHit[]>(() => context.value?.matches ?? [])
const hitCount = computed(() => hits.value.length)
const topScore = computed(() => hits.value.length ? Math.round(Math.max(...hits.value.map(item => item.score)) * 100) : 86)

const storageMetrics = computed(() => [
  { label: '画像维度沉淀', value: '6 维', note: '知识、能力、行为、资源、对话、迁移' },
  { label: '本地规则库', value: status.value?.localDocuments ?? 24, note: '用于判断错因与薄弱点' },
  { label: '证据索引', value: status.value?.vectorDocuments ?? hitCount.value ?? 6, note: '学习过程可追溯保存' },
])

const evidenceFindings = computed(() => {
  const findings = [
    { title: '应用能力偏低', detail: '测评题能复述概念，但综合应用题得分下降。', score: 82 },
    { title: '错因集中在标记时机', detail: '广度优先搜索的访问标记时机不稳定，导致路径判断反复出错。', score: 79 },
    { title: '知识迁移不足', detail: '相似题型可以完成，换场景后解题策略断裂。', score: 74 },
  ]

  return findings.map((finding, index) => ({
    ...finding,
    score: hits.value[index] ? Math.round(hits.value[index].score * 100) : finding.score,
  }))
})

const writebackDecisions = [
  { dim: '应用能力', delta: '+26', reason: '把“会概念但不会迁移”的证据回写到画像能力层。' },
  { dim: '知识深度', delta: '+24', reason: '根据错因记录补充算法边界条件掌握度。' },
  { dim: '知识迁移', delta: '+15', reason: '保留为弱项标签，驱动后续补救练习。' },
]

const optimizationActions = [
  { title: '路径重排', detail: '插入 1 个广度优先搜索错因补救节点，放在下一阶段学习前。' },
  { title: '资源重配', detail: '替换 3 个偏理论资源，优先推送可视化演练材料。' },
  { title: '辅导调整', detail: '讲解策略从概念复述切换为“错因追问 + 变式练习”。' },
]

async function refreshReverseEvaluation() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const [nextStatus, profile] = await Promise.all([
      fetchKnowledgeStatus(),
      fetchLatestProfile().catch(() => null),
    ])

    status.value = nextStatus
    context.value = await searchKnowledge({
      query: query.value,
      profile,
      learningData: {
        source: 'reverse-evaluation-page',
        purpose: 'profile-reverse-update-demo',
      },
      exerciseResults: {
        correctRate: 0.82,
        weakTopics: ['广度优先搜索标记时机', '二级指针传参', '画像反向更新'],
      },
      limit: 6,
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '反向评估同步失败'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  document.body.classList.add('reverse-evaluation-active')
  refreshReverseEvaluation()
})

onBeforeUnmount(() => {
  document.body.classList.remove('reverse-evaluation-active')
})
</script>

<template>
  <div class="reverse-page">
    <div class="page-aurora" aria-hidden="true" />

    <section class="reverse-hero">
      <div class="hero-copy">
        <span class="reverse-kicker">反向评估控制台</span>
        <h1>反向评估闭环</h1>
        <p>持续保存学习画像，评估智能体发现薄弱点，反思智能体判断要回写的画像维度，再驱动路径、资源和辅导策略重新优化。</p>
      </div>

      <div class="hero-actions">
        <div class="live-chip">
          <Sparkles :size="15" stroke-width="1.6" />
          <span>{{ isLoading ? '画像同步中' : '闭环在线' }}</span>
        </div>
        <button type="button" class="refresh-btn" :disabled="isLoading" @click="refreshReverseEvaluation">
          <Loader2 v-if="isLoading" :size="16" stroke-width="1.6" class="spin" />
          <RefreshCw v-else :size="16" stroke-width="1.6" />
          <span>{{ isLoading ? '同步中' : '刷新画像' }}</span>
        </button>
      </div>
    </section>

    <section class="loop-shell">
      <MultiAgentReverseUpdateMap />
    </section>

    <section class="reverse-results" aria-label="反向评估结果">
      <div class="result-heading">
        <span class="reverse-kicker">画像反向更新结果</span>
        <h2>从学习画像存储到反向优化</h2>
        <p>下面展示的不是工程检索日志，而是反向评估真正产生的业务结果：画像被怎样保存、证据命中了什么、反思决定如何回写、更新后如何优化学习过程。</p>
      </div>

      <p v-if="errorMessage" class="error-line">{{ errorMessage }}</p>

      <div class="story-grid">
        <article class="story-card storage-card">
          <header>
            <Database :size="21" stroke-width="1.5" />
            <div>
              <span>第一步</span>
              <h3>学习画像存储</h3>
            </div>
          </header>
          <div class="card-visual">
            <img src="/reverse-evaluation/visual-profile-storage.png" alt="" aria-hidden="true">
          </div>
          <p>系统持续保存学生画像，不只记录分数，还记录错因、行为、资源完成度和对话反馈，作为后续评估的真实依据。</p>
          <div class="metric-list">
            <div v-for="metric in storageMetrics" :key="metric.label">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
              <small>{{ metric.note }}</small>
            </div>
          </div>
        </article>

        <article class="story-card evidence-card">
          <header>
            <ShieldCheck :size="21" stroke-width="1.5" />
            <div>
              <span>第二步</span>
              <h3>评估命中证据</h3>
            </div>
          </header>
          <div class="card-visual">
            <img src="/reverse-evaluation/visual-evidence-hit.png" alt="" aria-hidden="true">
          </div>
          <p>评估智能体读取学习画像和过程证据，定位当前学习问题，形成可追溯的命中依据。</p>
          <div class="finding-list">
            <div v-for="finding in evidenceFindings" :key="finding.title">
              <b>{{ finding.score }}%</b>
              <span>{{ finding.title }}</span>
              <small>{{ finding.detail }}</small>
            </div>
          </div>
        </article>

        <article class="story-card reflection-card">
          <header>
            <BrainCircuit :size="21" stroke-width="1.5" />
            <div>
              <span>第三步</span>
              <h3>反思回写决策</h3>
            </div>
          </header>
          <div class="card-visual">
            <img src="/reverse-evaluation/visual-reflection-writeback.png" alt="" aria-hidden="true">
          </div>
          <p>反思智能体不是直接生成报告，而是判断“哪些画像维度需要更新、更新幅度是多少、依据来自哪里”。</p>
          <div class="writeback-list">
            <div v-for="decision in writebackDecisions" :key="decision.dim">
              <strong>{{ decision.delta }}</strong>
              <span>{{ decision.dim }}</span>
              <small>{{ decision.reason }}</small>
            </div>
          </div>
        </article>

        <article class="story-card optimize-card">
          <header>
            <Network :size="21" stroke-width="1.5" />
            <div>
              <span>第四步</span>
              <h3>画像更新后优化</h3>
            </div>
          </header>
          <div class="card-visual">
            <img src="/reverse-evaluation/visual-learning-optimize.png" alt="" aria-hidden="true">
          </div>
          <p>画像更新后，下游智能体会重新编排学习过程，让评估结果真正改变后续学习，而不是停留在一份报告里。</p>
          <div class="action-list">
            <div v-for="action in optimizationActions" :key="action.title">
              <GitBranch v-if="action.title === '路径重排'" :size="16" stroke-width="1.5" />
              <Activity v-else-if="action.title === '资源重配'" :size="16" stroke-width="1.5" />
              <BrainCircuit v-else :size="16" stroke-width="1.5" />
              <span>{{ action.title }}</span>
              <small>{{ action.detail }}</small>
            </div>
          </div>
        </article>
      </div>

      <div class="trace-strip">
        <span>画像存储</span>
        <i />
        <span>评估命中</span>
        <i />
        <span>反思回写</span>
        <i />
        <span>学习优化</span>
        <strong>本轮画像可信度 {{ topScore }}%</strong>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reverse-page {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - var(--header-height));
  padding: 28px clamp(18px, 3.2vw, 44px) 48px;
  overflow: hidden;
  color: var(--color-text-primary);
  font-family: 'Noto Sans SC', var(--font-body), system-ui, sans-serif;
  background:
    radial-gradient(circle at 18% 2%, rgba(236, 72, 153, 0.16), transparent 30%),
    radial-gradient(circle at 86% 24%, rgba(139, 92, 246, 0.17), transparent 34%),
    linear-gradient(180deg, rgba(4, 7, 18, 0.3), rgba(3, 6, 15, 0.94));
}

.page-aurora {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.045) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 38%, #000 0, transparent 70%);
}

.reverse-hero,
.reverse-results {
  border: 1px solid rgba(90, 160, 220, 0.2);
  background:
    linear-gradient(rgba(5, 8, 18, 0.36), rgba(5, 8, 18, 0.52)),
    url('/reverse-evaluation/panel-bg-magenta.png') center / cover,
    rgba(5, 10, 24, 0.88);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
}

.reverse-hero {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: center;
  margin-bottom: 14px;
  padding: 18px 22px;
  border-radius: 18px 18px 10px 10px;
}

.reverse-kicker {
  color: #22d3ee;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.reverse-hero h1,
.result-heading h2 {
  margin: 5px 0 7px;
  color: #fff;
  font-family: 'Noto Serif SC', 'Noto Sans SC', serif;
  font-weight: 700;
  letter-spacing: 0;
  text-shadow: 0 0 28px rgba(236, 72, 153, 0.5);
}

.reverse-hero h1 {
  font-size: clamp(30px, 3.8vw, 54px);
}

.result-heading h2 {
  font-size: clamp(24px, 2.4vw, 34px);
}

.reverse-hero p,
.result-heading p,
.story-card p {
  margin: 0;
  color: #a9bad4;
  font-size: 14px;
  line-height: 1.75;
}

.reverse-hero p {
  max-width: 860px;
}

.hero-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
}

.live-chip,
.refresh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
}

.live-chip {
  padding: 0 14px;
  border: 1px solid rgba(52, 211, 153, 0.32);
  background: rgba(52, 211, 153, 0.09);
  color: #34d399;
  box-shadow: 0 0 22px rgba(52, 211, 153, 0.12);
}

.refresh-btn {
  border: 1px solid rgba(236, 72, 153, 0.34);
  background: rgba(236, 72, 153, 0.1);
  color: #fb5a8c;
}

.refresh-btn:disabled {
  cursor: wait;
  opacity: 0.62;
}

.spin {
  animation: spin 0.8s linear infinite;
}

.loop-shell {
  position: relative;
  margin-bottom: 14px;
}

.reverse-results {
  padding: 18px;
  border-radius: 10px 10px 18px 18px;
  background:
    linear-gradient(rgba(4, 8, 18, 0.76), rgba(4, 8, 18, 0.9)),
    url('/reverse-evaluation/panel-bg-cyan.png') center / cover,
    rgba(4, 10, 24, 0.9);
}

.result-heading {
  display: grid;
  gap: 4px;
  max-width: 980px;
  margin-bottom: 16px;
}

.error-line {
  margin: 0 0 14px;
  padding: 10px 12px;
  border: 1px solid rgba(244, 63, 94, 0.25);
  border-radius: 10px;
  background: rgba(244, 63, 94, 0.08);
  color: #ff9aae;
  font-size: 13px;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.story-card {
  min-height: 310px;
  padding: 16px;
  border: 1px solid rgba(90, 160, 220, 0.18);
  border-radius: 14px;
  background:
    linear-gradient(rgba(4, 10, 24, 0.72), rgba(4, 10, 24, 0.88)),
    url('/reverse-evaluation/panel-bg-cyan.png') center / cover;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 46px rgba(0, 0, 0, 0.22);
}

.evidence-card {
  background:
    linear-gradient(rgba(4, 10, 24, 0.72), rgba(4, 10, 24, 0.88)),
    url('/reverse-evaluation/panel-bg-magenta.png') center / cover;
}

.reflection-card {
  background:
    linear-gradient(rgba(4, 10, 24, 0.72), rgba(4, 10, 24, 0.88)),
    url('/reverse-evaluation/panel-bg-amber.png') center / cover;
}

.optimize-card {
  background:
    linear-gradient(rgba(4, 10, 24, 0.72), rgba(4, 10, 24, 0.88)),
    url('/reverse-evaluation/panel-bg-purple.png') center / cover;
}

.story-card header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #22d3ee;
}

.evidence-card header {
  color: #fb5a8c;
}

.reflection-card header {
  color: #fbbf24;
}

.optimize-card header {
  color: #a78bfa;
}

.story-card header span {
  color: #8396b8;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.story-card h3 {
  margin: 2px 0 0;
  color: #fff;
  font-size: 17px;
  font-weight: 900;
}

.card-visual {
  position: relative;
  height: 166px;
  margin: 0 0 12px;
  overflow: hidden;
  border-radius: 12px;
  background:
    radial-gradient(circle at 50% 62%, rgba(34, 211, 238, 0.16), transparent 50%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0));
}

.card-visual::after {
  position: absolute;
  right: 12%;
  bottom: 12px;
  left: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232, 237, 245, 0.45), transparent);
  content: "";
}

.card-visual img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(278px, 90%);
  height: auto;
  object-fit: contain;
  pointer-events: none;
  transform: translate(-50%, -50%);
  filter: saturate(1.08) contrast(1.04);
}

.reflection-card .card-visual img,
.optimize-card .card-visual img {
  width: min(300px, 94%);
}

.metric-list,
.finding-list,
.writeback-list,
.action-list {
  display: grid;
  gap: 9px;
  margin-top: 14px;
}

.metric-list div,
.finding-list div,
.writeback-list div,
.action-list div {
  display: grid;
  gap: 3px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(2, 7, 18, 0.48);
}

.metric-list strong,
.finding-list b,
.writeback-list strong {
  color: #fff;
  font-family: var(--font-mono);
  font-size: 17px;
  line-height: 1;
}

.metric-list span,
.finding-list span,
.writeback-list span,
.action-list span {
  color: #fff;
  font-size: 13px;
  font-weight: 800;
}

.metric-list small,
.finding-list small,
.writeback-list small,
.action-list small {
  color: #9bb4d4;
  font-size: 11px;
  line-height: 1.55;
}

.finding-list b {
  color: #fb5a8c;
}

.writeback-list strong {
  color: #fbbf24;
}

.action-list div {
  grid-template-columns: auto 1fr;
  align-items: start;
  color: #a78bfa;
}

.action-list small {
  grid-column: 2;
}

.trace-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 999px;
  background: rgba(3, 8, 20, 0.72);
  color: #9bb4d4;
  font-size: 12px;
}

.trace-strip i {
  width: 34px;
  height: 2px;
  background: linear-gradient(90deg, #22d3ee, #ec4899);
}

.trace-strip strong {
  margin-left: auto;
  color: #34d399;
  font-family: var(--font-mono);
}

:global(body.reverse-evaluation-active .global-pet) {
  transform: translateX(86px) scale(0.9);
  opacity: 0.78;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1180px) {
  .story-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 920px) {
  .reverse-hero {
    display: grid;
  }

  .hero-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .reverse-page {
    padding-inline: 12px;
  }

  .hero-actions,
  .trace-strip {
    align-items: stretch;
    flex-direction: column;
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .trace-strip i {
    display: none;
  }

  .trace-strip strong {
    margin-left: 0;
  }
}
</style>
