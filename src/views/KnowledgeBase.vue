<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  GitBranch,
  Loader2,
  Network,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-vue-next'
import { fetchKnowledgeStatus, fetchLatestProfile, searchKnowledge } from '@/lib/api'
import type { KnowledgeContextResponse, KnowledgeHit, KnowledgeStatusResponse } from '@/types/api'

const router = useRouter()

const query = ref('返像评估 学习效果 薄弱点 画像更新 路径重规划')
const isLoading = ref(false)
const status = ref<KnowledgeStatusResponse | null>(null)
const context = ref<KnowledgeContextResponse | null>(null)
const errorMessage = ref('')

const hits = computed<KnowledgeHit[]>(() => context.value?.matches ?? [])
const topScore = computed(() => hits.value.length ? Math.round(Math.max(...hits.value.map(item => item.score)) * 100) : 0)
const agentList = computed(() => status.value?.syncedAgents?.join(' / ') || 'EvaluationAgent / PathAgent / ReflectionAgent')

async function refreshKnowledge() {
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
        source: 'knowledge-base-page',
        purpose: 'evaluation-agent-rag-debug',
      },
      exerciseResults: {
        correctRate: 0.82,
        weakTopics: ['BFS visited 标记时机', '二级指针传参', '画像反向更新'],
      },
      limit: 6,
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '知识库同步失败'
  } finally {
    isLoading.value = false
  }
}

function askTutor(hit: KnowledgeHit) {
  router.push({ path: '/tutoring', query: { q: hit.agentHint || hit.summary } })
}

onMounted(() => {
  refreshKnowledge()
})
</script>

<template>
  <div class="knowledge-page">
    <section class="kb-header">
      <div>
        <span class="kb-kicker">Local RAG Workspace</span>
        <h1>本地知识库与 Embedding 向量库</h1>
        <p>独立管理返像评估模块的知识检索结果，并把命中上下文交给后端智能体协作链路。</p>
      </div>
      <button type="button" class="kb-refresh" :disabled="isLoading" @click="refreshKnowledge">
        <Loader2 v-if="isLoading" :size="16" stroke-width="1.6" class="spin" />
        <RefreshCw v-else :size="16" stroke-width="1.6" />
        <span>{{ isLoading ? '同步中' : '重新同步' }}</span>
      </button>
    </section>

    <section class="kb-control">
      <div class="search-box">
        <Search :size="17" stroke-width="1.6" />
        <input v-model="query" type="text" aria-label="知识库检索词" @keydown.enter="refreshKnowledge">
      </div>
      <button type="button" class="search-action" :disabled="isLoading" @click="refreshKnowledge">
        <span>检索</span>
        <ArrowRight :size="15" stroke-width="1.6" />
      </button>
    </section>

    <p v-if="errorMessage" class="kb-error">{{ errorMessage }}</p>

    <section class="kb-stats">
      <article class="stat-card">
        <Database :size="18" stroke-width="1.5" />
        <strong>{{ status?.localDocuments ?? 0 }}</strong>
        <span>本地知识文档</span>
      </article>
      <article class="stat-card">
        <GitBranch :size="18" stroke-width="1.5" />
        <strong>{{ status?.vectorDocuments ?? hits.length }}</strong>
        <span>{{ status?.dimensions ?? 0 }} 维向量索引</span>
      </article>
      <article class="stat-card">
        <Activity :size="18" stroke-width="1.5" />
        <strong>{{ topScore }}%</strong>
        <span>最高匹配度</span>
      </article>
      <article class="stat-card">
        <ShieldCheck :size="18" stroke-width="1.5" />
        <strong>{{ hits.length }}</strong>
        <span>当前命中证据</span>
      </article>
    </section>

    <section class="kb-main">
      <div class="kb-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Vector Hits</span>
            <h2>检索命中</h2>
          </div>
          <span class="model-chip">{{ status?.model ?? context?.embedding.model ?? 'local-hash-embedding-v1' }}</span>
        </div>

        <div class="hit-list">
          <button
            v-for="hit in hits"
            :key="hit.id"
            type="button"
            class="hit-row"
            @click="askTutor(hit)"
          >
            <span class="hit-main">
              <span class="hit-title">{{ hit.title }}</span>
              <span class="hit-summary">{{ hit.summary }}</span>
              <span class="hit-tags">
                <span v-for="tag in hit.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
              </span>
            </span>
            <span class="hit-score">{{ Math.round(hit.score * 100) }}%</span>
          </button>

          <div v-if="!hits.length && !isLoading" class="empty-state">暂无命中，换一个检索词试试。</div>
        </div>
      </div>

      <aside class="kb-side">
        <div class="side-card">
          <BrainCircuit :size="19" stroke-width="1.5" />
          <h3>智能体协作</h3>
          <p>{{ agentList }}</p>
        </div>
        <div class="side-card">
          <Network :size="19" stroke-width="1.5" />
          <h3>上下文注入</h3>
          <p>EvaluationAgent 会自动读取命中结果，生成 evidence、suggestions 和 profileUpdates，后续交给 PathAgent 与 ReflectionAgent。</p>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.knowledge-page {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - var(--header-height));
  padding: 32px clamp(20px, 4vw, 52px) 52px;
  color: var(--color-text-primary);
}

.kb-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 18px;
}

.kb-kicker,
.panel-kicker {
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.kb-header h1 {
  margin: 6px 0 8px;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 500;
  letter-spacing: 0;
}

.kb-header p {
  max-width: 720px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.kb-refresh,
.search-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  font-size: 13px;
  font-weight: 700;
}

.kb-refresh:disabled,
.search-action:disabled {
  cursor: wait;
  opacity: 0.62;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.kb-control {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  margin-bottom: 14px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(7, 12, 26, 0.76);
  color: var(--color-accent-cyan);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff;
  font-size: 14px;
}

.kb-error {
  margin: 0 0 14px;
  padding: 10px 12px;
  border: 1px solid rgba(244, 63, 94, 0.25);
  border-radius: 8px;
  background: rgba(244, 63, 94, 0.08);
  color: #ff9aae;
  font-size: 13px;
}

.kb-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.stat-card,
.kb-panel,
.side-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(7, 12, 26, 0.78);
}

.stat-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 10px;
  align-items: center;
  min-height: 82px;
  padding: 14px;
  color: var(--color-accent-cyan);
}

.stat-card strong {
  color: #fff;
  font-family: var(--font-mono);
  font-size: 22px;
}

.stat-card span {
  grid-column: 2;
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.kb-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 14px;
}

.kb-panel {
  min-width: 0;
  padding: 16px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-bottom: 12px;
}

.panel-head h2,
.side-card h3 {
  margin: 3px 0 0;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.model-chip {
  max-width: 240px;
  overflow: hidden;
  padding: 4px 8px;
  border: 1px solid rgba(0, 212, 255, 0.16);
  border-radius: 999px;
  color: var(--color-accent-cyan);
  font-family: var(--font-mono);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hit-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 13px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.035);
  text-align: left;
}

.hit-row:hover {
  border-color: rgba(0, 212, 255, 0.26);
  background: rgba(0, 212, 255, 0.07);
}

.hit-main {
  min-width: 0;
}

.hit-title {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.hit-summary {
  display: block;
  margin-top: 4px;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.55;
}

.hit-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.hit-tags span {
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-tertiary);
  font-size: 10px;
}

.hit-score {
  flex-shrink: 0;
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 800;
}

.kb-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.side-card {
  padding: 16px;
  color: var(--color-accent-cyan);
}

.side-card p,
.empty-state {
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.65;
}

.empty-state {
  padding: 14px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
}

@media (max-width: 920px) {
  .kb-header,
  .kb-main {
    grid-template-columns: 1fr;
  }

  .kb-header {
    display: grid;
  }

  .kb-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .kb-control,
  .kb-stats {
    grid-template-columns: 1fr;
  }

  .model-chip {
    display: none;
  }
}
</style>
