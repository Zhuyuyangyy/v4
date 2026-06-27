<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  BrainCircuit,
  Database,
  GitBranch,
  Network,
  ShieldCheck,
} from 'lucide-vue-next'
import MultiAgentReverseUpdateMap from '@/components/evaluation/MultiAgentReverseUpdateMap.vue'

interface ReverseEvidenceHit {
  title: string
  detail: string
  score: number
}

const errorMessage = ref('')

const hits = computed<ReverseEvidenceHit[]>(() => [
  { title: '应用能力偏低', detail: '测评题能复述概念，但综合应用题得分下降。', score: 82 },
  { title: '错因集中在标记时机', detail: '广度优先搜索的访问标记时机不稳定，导致路径判断反复出错。', score: 79 },
  { title: '知识迁移不足', detail: '相似题型可以完成，换场景后解题策略断裂。', score: 74 },
])
const hitCount = computed(() => hits.value.length)
const topScore = 86

const storageMetrics = computed(() => [
  { label: '画像维度沉淀', value: '6 维', note: '知识、能力、行为、资源、对话、迁移' },
  { label: '本地规则库', value: 24, note: '用于判断错因与薄弱点' },
  { label: '证据索引', value: hitCount.value + 3, note: '学习过程可追溯保存' },
])

const evidenceFindings = computed(() => {
  return hits.value
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

const decisionFlow = computed(() => [
  { step: '01', title: '收集过程证据', detail: `本轮聚合 ${hitCount.value + 3} 条画像索引与学习日志。` },
  { step: '02', title: '命中薄弱点', detail: 'BFS visited 标记时机被连续命中，判定为可回写弱项。' },
  { step: '03', title: '写入画像版本', detail: '应用能力、知识深度、知识迁移三个维度发生校准。' },
  { step: '04', title: '驱动下游调整', detail: '补弱路径、可视化资源和辅导追问顺序同步更新。' },
])

onMounted(() => {
  document.body.classList.add('reverse-evaluation-active')
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
        <h1>反向更新</h1>
        <p>评估结果回写画像，并同步调整学习路径、资源推荐和辅导策略。</p>
        <div class="hero-flow" aria-label="反向更新流程">
          <span>评估证据</span>
          <i />
          <span>画像校准</span>
          <i />
          <span>下游优化</span>
        </div>
      </div>
    </section>

    <section class="loop-shell">
      <MultiAgentReverseUpdateMap />
    </section>

    <section class="reverse-results" aria-label="反向评估结果">
      <div class="result-heading">
        <span class="reverse-kicker">画像校准结果</span>
        <h2>从画像存储到学习优化</h2>
        <p>下面展示的不是工程检索日志，而是评估真正产生的业务结果：画像怎样沉淀、证据命中了什么、反思如何决策、校准后如何优化学习过程。</p>
      </div>

      <p v-if="errorMessage" class="error-line">{{ errorMessage }}</p>

      <div class="decision-flow" aria-label="本轮反向更新决策流水">
        <div v-for="item in decisionFlow" :key="item.step" :data-step="item.step">
          <b>{{ item.step }}</b>
          <span>{{ item.title }}</span>
          <small>{{ item.detail }}</small>
        </div>
      </div>

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

.reverse-results {
  border: 1px solid rgba(90, 160, 220, 0.2);
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.reverse-hero {
  display: block;
  margin-bottom: 14px;
  padding: 14px 4px 16px;
  border-bottom: 1px solid rgba(132, 190, 220, 0.16);
}

.hero-copy {
  display: grid;
  grid-template-columns: minmax(180px, auto) minmax(280px, 1fr) auto;
  gap: 18px;
  align-items: center;
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
  margin: 0;
  color: #fff;
  font-family: 'Noto Serif SC', 'Noto Sans SC', serif;
  font-weight: 700;
  letter-spacing: 0;
}

.reverse-hero h1 {
  font-size: clamp(28px, 2.8vw, 40px);
  line-height: 1.1;
  text-shadow: 0 0 18px rgba(34, 211, 238, 0.22);
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
  max-width: 720px;
  color: #b8c6da;
}

.hero-flow {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  min-width: 310px;
  color: #8fa5c4;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.hero-flow i {
  width: 28px;
  height: 1px;
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.28), rgba(236, 72, 153, 0.68));
}

.hero-flow span:nth-of-type(2) {
  color: #eaf4ff;
}

.loop-shell {
  position: relative;
  margin-bottom: 14px;
}

.reverse-results {
  padding: 18px;
  border-radius: 10px 10px 18px 18px;
  background: transparent;
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

.decision-flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 0 0 14px;
}

.decision-flow div {
  position: relative;
  min-height: 112px;
  padding: 14px;
  overflow: hidden;
  border: 1px solid rgba(132, 190, 220, 0.16);
  border-radius: 10px;
  background: transparent;
}

.decision-flow div::after {
  position: absolute;
  right: -16px;
  bottom: -24px;
  color: rgba(255, 255, 255, 0.045);
  font-family: var(--font-mono);
  font-size: 72px;
  font-weight: 900;
  content: attr(data-step);
}

.decision-flow b,
.decision-flow span,
.decision-flow small {
  position: relative;
  z-index: 1;
  display: block;
}

.decision-flow b {
  width: fit-content;
  padding: 3px 6px;
  border: 1px solid rgba(34, 211, 238, 0.28);
  border-radius: 5px;
  color: #22d3ee;
  font-family: var(--font-mono);
  font-size: 10px;
}

.decision-flow span {
  margin-top: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
}

.decision-flow small {
  margin-top: 6px;
  color: #9bb4d4;
  font-size: 12px;
  line-height: 1.55;
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
  background: transparent;
  box-shadow: none;
}

.evidence-card {
  background: transparent;
}

.reflection-card {
  background: transparent;
}

.optimize-card {
  background: transparent;
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
  background: transparent;
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
  opacity: 0.86;
  filter: saturate(1.08) contrast(1.04) drop-shadow(0 10px 28px rgba(34, 211, 238, 0.16));
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
  background: transparent;
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
  background: transparent;
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

@media (max-width: 1180px) {
  .decision-flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .story-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 920px) {
  .hero-copy {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .hero-flow {
    justify-content: flex-start;
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .reverse-page {
    padding-inline: 12px;
  }

  .trace-strip {
    align-items: stretch;
    flex-direction: column;
  }

  .hero-flow {
    flex-wrap: wrap;
    white-space: normal;
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .decision-flow {
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
