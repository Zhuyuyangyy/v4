<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Download,
  FileBarChart,
  GitBranch,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from 'lucide-vue-next'
import { fetchEvaluation } from '@/lib/api'
import ParticleBackground from '@/components/evaluation/ParticleBackground.vue'
import EvaluationEvidencePanel from '@/components/evaluation/EvaluationEvidencePanel.vue'
import EvaluationTimeline from '@/components/evaluation/EvaluationTimeline.vue'
import PathReplanPanel from '@/components/evaluation/PathReplanPanel.vue'
import ProfileDeltaPanel from '@/components/evaluation/ProfileDeltaPanel.vue'
import WeaknessDiagnosisPanel from '@/components/evaluation/WeaknessDiagnosisPanel.vue'
import LearningTreeViewport from '@/components/knowledge-tree/LearningTreeViewport.vue'
import type {
  EvaluationEvidence,
  EvaluationStage,
  FlowStatus,
  PathStep,
  ProfileMetric,
  TimelineItem,
  WeaknessNode,
} from '@/types/evaluation-dashboard'

type FlowStep = {
  id: string
  label: string
  description: string
  status: FlowStatus
}

type StageConfig = {
  narrative: string
  evidenceSummary: string
  systemJudgement: string
  evidence: EvaluationEvidence[]
  profile: ProfileMetric[]
  weaknesses: WeaknessNode[]
  weakMetricKeys: string[]
  pathReason: string
  originalPath: PathStep[]
  replannedPath: PathStep[]
}

const router = useRouter()
const stage = ref<EvaluationStage>(0)
const isLoading = ref(false)
const showReportModal = ref(false)
const activeWeaknessId = ref<string>('')
const apiGeneratedAt = ref('')

const baseWeaknesses: WeaknessNode[] = [
  {
    id: 'double-pointer-params',
    label: '二级指针传参',
    severity: 'high',
    reason: '基础题中能识别指针地址，但在函数内修改外部指针时混淆了值传递与地址传递。',
    impact: '会阻塞链表插入、动态数组扩容和资源句柄回收等后续任务。',
    action: '先完成 15 分钟栈帧示意，再做 3 道参数传递修复题。',
  },
  {
    id: 'bfs-queue-advance',
    label: 'BFS 队列推进',
    severity: 'medium',
    reason: '队列出入顺序正确，但 visited 标记时机偏晚，容易产生重复入队。',
    impact: '会影响图搜索复杂度分析，并拖慢最短路径专题推进。',
    action: '观看队列快照资源，并完成一次逐帧推演练习。',
  },
  {
    id: 'dynamic-memory-release',
    label: '动态内存释放',
    severity: 'medium',
    reason: '能写出 malloc/new，但缺少异常分支释放意识，工程实践证据不足。',
    impact: '会影响内存模型、RAII 和系统编程项目的路径评分。',
    action: '补做内存泄漏定位小实验，提交一次释放策略说明。',
  },
]

const stageConfigs: Record<EvaluationStage, StageConfig> = {
  0: {
    narrative: '当前处于基础学习阶段，系统已根据学习记录生成初始画像，但尚未完成本轮测评诊断。',
    evidenceSummary: '系统暂时只读取历史学习记录、资源浏览和练习完成度，尚未采集本轮测评证据。',
    systemJudgement: '初始画像可以反映学习基础，但证据粒度不足，无法精确定位错因和重规划路径。',
    evidence: [
      { id: 'history', label: '历史学习记录', value: '18 条', detail: '来自课程完成、笔记和资源浏览。', tone: 'cyan' },
      { id: 'practice', label: '基础练习沉淀', value: '32 题', detail: '仅用于生成初始掌握轮廓。', tone: 'purple' },
      { id: 'resource', label: '资源偏好', value: '图解优先', detail: '用户更常打开可视化资源。', tone: 'emerald' },
    ],
    profile: [
      { key: 'breadth', label: '知识广度', value: 42 },
      { key: 'depth', label: '知识深度', value: 38 },
      { key: 'application', label: '应用能力', value: 35 },
      { key: 'innovation', label: '创新力', value: 28 },
      { key: 'engineering', label: '工程实践', value: 41 },
      { key: 'transfer', label: '知识迁移', value: 33 },
    ],
    weaknesses: [],
    weakMetricKeys: ['depth', 'transfer'],
    pathReason: '尚未完成测评，路径保持“指针基础 → 二级指针 → 链表”的初始安排。',
    originalPath: [
      { id: 'pointer-basic', label: '指针基础', type: 'original' },
      { id: 'double-pointer', label: '二级指针', type: 'original' },
      { id: 'linked-list', label: '链表', type: 'original' },
    ],
    replannedPath: [
      { id: 'pointer-basic', label: '指针基础', type: 'original' },
      { id: 'double-pointer', label: '二级指针', type: 'original' },
      { id: 'linked-list', label: '链表', type: 'original' },
    ],
  },
  1: {
    narrative: '初次评估完成：系统识别出基础掌握情况，并生成第一轮补救路径。',
    evidenceSummary: '测评输入已经转化为题目表现、错题分布和行为证据，画像从初始估计进入第一次校准。',
    systemJudgement: '基础掌握度有明显提升，但二级指针、BFS 队列和内存释放仍会影响后续知识迁移。',
    evidence: [
      { id: 'quiz', label: '完成基础题', value: '12 道', detail: '覆盖指针、图搜索和内存模型。', tone: 'cyan' },
      { id: 'accuracy', label: '基础题正确率', value: '67%', detail: '错题集中在二级指针、BFS 队列、内存模型。', tone: 'pink' },
      { id: 'weakness', label: '发现薄弱点', value: '3 个', detail: '薄弱点已映射到树冠粉色节点。', tone: 'purple' },
      { id: 'behavior', label: '学习行为记录', value: '5 条', detail: '提问、资源浏览和练习提交进入证据链。', tone: 'emerald' },
    ],
    profile: [
      { key: 'breadth', label: '知识广度', previousValue: 42, value: 58 },
      { key: 'depth', label: '知识深度', previousValue: 38, value: 52 },
      { key: 'application', label: '应用能力', previousValue: 35, value: 61 },
      { key: 'innovation', label: '创新力', previousValue: 28, value: 52 },
      { key: 'engineering', label: '工程实践', previousValue: 41, value: 57 },
      { key: 'transfer', label: '知识迁移', previousValue: 33, value: 48 },
    ],
    weaknesses: baseWeaknesses,
    weakMetricKeys: ['depth', 'transfer'],
    pathReason: '首次评估发现二级指针传参是主阻塞点，因此在二级指针之前插入参数传递补救。',
    originalPath: [
      { id: 'pointer-basic', label: '指针基础', type: 'original' },
      { id: 'double-pointer', label: '二级指针', type: 'original' },
      { id: 'linked-list', label: '链表', type: 'original' },
    ],
    replannedPath: [
      { id: 'pointer-basic', label: '指针基础', type: 'original' },
      { id: 'param-remedy', label: '参数传递补救', type: 'remedy' },
      { id: 'double-pointer', label: '二级指针', type: 'original' },
      { id: 'linked-list', label: '链表', type: 'original' },
    ],
  },
  2: {
    narrative: '深度评估完成：系统结合错因、资源学习和迁移任务，完成第二次画像更新。',
    evidenceSummary: '深度评估追加错因复盘、资源完成和迁移任务证据，用于判断补救动作是否真正转化为能力。',
    systemJudgement: '薄弱节点已明显收敛，工程实践和应用能力成为新增长点，路径可以进入迁移任务和项目化训练。',
    evidence: [
      { id: 'transfer', label: '完成迁移任务', value: '4 道', detail: '从指针传参迁移到链表插入和图搜索实现。', tone: 'cyan' },
      { id: 'review', label: '错因复盘', value: '3 条', detail: '用户能解释传参、队列标记和释放策略。', tone: 'emerald' },
      { id: 'resources', label: '资源学习完成', value: '2 个', detail: '补救资源与错题节点形成闭环。', tone: 'purple' },
      { id: 'replan', label: '路径重规划', value: '1 次', detail: '新增迁移任务，并减少重复基础复习。', tone: 'pink' },
      { id: 'mastery', label: '综合掌握度提升', value: '18%', detail: '由深度画像二次更新计算得到。', tone: 'emerald' },
    ],
    profile: [
      { key: 'breadth', label: '知识广度', previousValue: 58, value: 78 },
      { key: 'depth', label: '知识深度', previousValue: 52, value: 76 },
      { key: 'application', label: '应用能力', previousValue: 61, value: 82 },
      { key: 'innovation', label: '创新力', previousValue: 52, value: 74 },
      { key: 'engineering', label: '工程实践', previousValue: 57, value: 82 },
      { key: 'transfer', label: '知识迁移', previousValue: 48, value: 68 },
    ],
    weaknesses: [baseWeaknesses[1]],
    weakMetricKeys: ['transfer'],
    pathReason: '深度评估确认指针补救有效，路径从“补基础”转向“迁移任务 + 项目化应用”。',
    originalPath: [
      { id: 'pointer-basic', label: '指针基础', type: 'original' },
      { id: 'param-remedy', label: '参数传递补救', type: 'remedy' },
      { id: 'double-pointer', label: '二级指针', type: 'original' },
      { id: 'linked-list', label: '链表', type: 'original' },
    ],
    replannedPath: [
      { id: 'double-pointer', label: '二级指针巩固', type: 'original' },
      { id: 'bfs-remedy', label: 'BFS 队列快照', type: 'remedy' },
      { id: 'transfer-task', label: '链表迁移任务', type: 'recommended' },
      { id: 'project', label: '小型内存管理项目', type: 'recommended' },
    ],
  },
}

const timelineItems: TimelineItem[] = [
  {
    stage: 0,
    title: '初始画像',
    trigger: '读取历史学习记录',
    evidence: '历史行为 18 条，基础练习 32 题',
    updatedFields: '知识广度、工程实践初值',
    delta: '建立 6 个画像维度基线',
    pathImpact: '生成初始主路径，尚未插入补救节点',
  },
  {
    stage: 1,
    title: '第一次评估：基础测评 + 行为记录',
    trigger: '点击“初次评估”',
    evidence: '12 道基础题、67% 正确率、5 条行为记录',
    updatedFields: '知识深度、应用能力、知识迁移',
    delta: '应用能力 +26，知识迁移 +15',
    pathImpact: '插入“参数传递补救”，定位 3 个薄弱点',
  },
  {
    stage: 2,
    title: '第二次评估：错因分析 + 迁移任务 + 深度画像',
    trigger: '点击“深度评估”',
    evidence: '4 道迁移任务、3 条错因复盘、2 个资源完成',
    updatedFields: '工程实践、应用能力、创新力',
    delta: '综合掌握度 +18%，工程实践 +25',
    pathImpact: '减少重复复习，转向迁移任务和项目化训练',
  },
]

const currentConfig = computed(() => stageConfigs[stage.value])
const activeWeakness = computed(() => currentConfig.value.weaknesses.find(item => item.id === activeWeaknessId.value))

const flowSteps = computed<FlowStep[]>(() => {
  const statusByStage: Record<EvaluationStage, FlowStatus[]> = {
    0: ['running', 'idle', 'idle', 'idle', 'idle'],
    1: ['completed', 'completed', 'completed', 'remedy', 'idle'],
    2: ['completed', 'completed', 'completed', 'completed', 'completed'],
  }
  const labels = ['测评输入', '知识点诊断', '画像更新', '路径重规划', '资源推荐']
  const descriptions = ['采集题目表现', '映射错题知识点', '更新六维画像', '插入补救步骤', '推送辅导资源']
  return labels.map((label, index) => ({ id: label, label, description: descriptions[index], status: statusByStage[stage.value][index] }))
})

const dashboardStats = computed(() => [
  { label: '当前阶段', value: `Stage ${stage.value}`, icon: Activity, tone: '#00d4ff' },
  { label: '画像维度', value: `${currentConfig.value.profile.length}`, icon: BarChart3, tone: '#06d6a0' },
  { label: '薄弱节点', value: `${currentConfig.value.weaknesses.length}`, icon: Target, tone: '#ff6b9a' },
  { label: '路径动作', value: stage.value === 2 ? '迁移推荐' : stage.value === 1 ? '补救插入' : '待诊断', icon: GitBranch, tone: '#9b7cff' },
])

function runInitialEvaluation() {
  isLoading.value = true
  window.setTimeout(() => {
    stage.value = 1
    activeWeaknessId.value = baseWeaknesses[0].id
    isLoading.value = false
  }, 360)
}

function runDeepEvaluation() {
  if (stage.value === 0) return
  isLoading.value = true
  window.setTimeout(() => {
    stage.value = 2
    activeWeaknessId.value = baseWeaknesses[1].id
    isLoading.value = false
  }, 420)
}

function resetDemo() {
  stage.value = 0
  activeWeaknessId.value = ''
}

function selectWeakness(id: string) {
  activeWeaknessId.value = id
}

function openWeaknessResource(item: WeaknessNode) {
  router.push({
    name: 'Resources',
    query: {
      source: 'evaluation',
      weakness: item.id,
      focus: item.label,
    },
  })
}

function generateReport() {
  showReportModal.value = true
}

onMounted(async () => {
  try {
    const data = await fetchEvaluation()
    apiGeneratedAt.value = data.generatedAt
  } catch (error) {
    console.warn('Failed to fetch evaluation mock payload', error)
  }
})
</script>

<template>
  <main class="evaluation cockpit-shell">
    <ParticleBackground />

    <header class="cockpit-header">
      <div class="header-copy">
        <span class="hero-badge">EduMind Evaluation Cockpit</span>
        <h1>学习评估驾驶舱</h1>
        <p>
          把“测评输入 → 证据采集 → 画像更新 → 知识树生长 → 薄弱点定位 → 路径重规划 → 辅导资源推荐”放在同一张驾驶舱里。
        </p>
        <strong>{{ currentConfig.narrative }}</strong>
      </div>

      <div class="header-actions">
        <button type="button" class="btn primary" :disabled="isLoading" @click="runInitialEvaluation">
          <Zap :size="16" stroke-width="1.8" />
          初次评估
        </button>
        <button type="button" class="btn purple" :disabled="stage === 0 || isLoading" :title="stage === 0 ? '请先完成初次评估' : ''" @click="runDeepEvaluation">
          <Sparkles :size="16" stroke-width="1.8" />
          深度评估
        </button>
        <button type="button" class="btn ghost" @click="resetDemo">
          <RotateCcw :size="16" stroke-width="1.8" />
          重置演示
        </button>
        <button type="button" class="btn report" @click="generateReport">
          <FileBarChart :size="16" stroke-width="1.8" />
          生成评估报告
        </button>
      </div>
    </header>

    <section class="summary-grid" aria-label="评估概览">
      <article v-for="item in dashboardStats" :key="item.label" class="summary-card" :style="{ '--tone': item.tone }">
        <component :is="item.icon" :size="20" stroke-width="1.7" />
        <div>
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </article>
    </section>

    <section class="process-strip" aria-label="评估流程条">
      <article v-for="(stepItem, index) in flowSteps" :key="stepItem.id" class="process-step" :class="stepItem.status">
        <div class="step-index">{{ index + 1 }}</div>
        <div>
          <strong>{{ stepItem.label }}</strong>
          <span>{{ stepItem.description }}</span>
          <em>{{ stepItem.status === 'idle' ? '未开始' : stepItem.status === 'running' ? '进行中' : stepItem.status === 'completed' ? '已完成' : '需要补救' }}</em>
        </div>
        <ArrowRight v-if="index < flowSteps.length - 1" class="step-arrow" :size="16" stroke-width="1.6" />
      </article>
    </section>

    <section class="cockpit-grid">
      <LearningTreeViewport
        class="tree-panel"
        :stage="stage"
        :profile="currentConfig.profile"
        :weaknesses="currentConfig.weaknesses"
        :active-weakness-id="activeWeaknessId"
        @weakness-click="selectWeakness"
      />

      <aside class="evidence-stack">
        <EvaluationEvidencePanel
          :stage="stage"
          :evidence="currentConfig.evidence"
          :summary="currentConfig.evidenceSummary"
          :system-judgement="currentConfig.systemJudgement"
        />
        <ProfileDeltaPanel :metrics="currentConfig.profile" :weak-keys="currentConfig.weakMetricKeys" />
        <WeaknessDiagnosisPanel
          :weaknesses="currentConfig.weaknesses"
          :active-weakness-id="activeWeaknessId"
          @select="selectWeakness"
          @open-resource="openWeaknessResource"
        />
        <PathReplanPanel
          :original-path="currentConfig.originalPath"
          :replanned-path="currentConfig.replannedPath"
          :reason="currentConfig.pathReason"
          :active="stage > 0"
        />
      </aside>
    </section>

    <section class="active-explain" v-if="activeWeakness">
      <div>
        <span>树 ↔ 画像 ↔ 路径联动</span>
        <p>
          当前选中 <b>{{ activeWeakness.label }}</b>：树冠粉色节点来自错题证据，画像中薄弱维度会以粉色提示，并在路径面板插入对应补救步骤。
        </p>
      </div>
      <button type="button" class="btn primary small" @click="openWeaknessResource(activeWeakness)">查看该薄弱点资源</button>
    </section>

    <EvaluationTimeline :current-stage="stage" :items="timelineItems" />

    <transition name="modal-fade">
      <div v-if="showReportModal" class="modal-mask" @click.self="showReportModal = false">
        <section class="report-modal">
          <div class="modal-head">
            <div>
              <p>Mock Report</p>
              <h2>学习评估报告已生成</h2>
            </div>
            <button type="button" @click="showReportModal = false">×</button>
          </div>
          <div class="report-body">
            <p>报告将包含本轮证据链、画像前后对比、薄弱点错因、路径重规划和推荐资源清单。</p>
            <ul>
              <li>当前阶段：Stage {{ stage }}</li>
              <li>API mock 日期：{{ apiGeneratedAt || '本地演示数据' }}</li>
              <li>优先补救：{{ activeWeakness?.label || '请先完成初次评估' }}</li>
            </ul>
          </div>
          <div class="modal-actions">
            <button class="btn ghost" type="button" @click="showReportModal = false">关闭</button>
            <button class="btn primary" type="button">
              <Download :size="15" stroke-width="1.7" />
              下载 PDF（Mock）
            </button>
          </div>
        </section>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.cockpit-shell {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 40px clamp(18px, 4vw, 46px) 60px;
  color: #e8edf5;
  background:
    radial-gradient(circle at 20% 0%, rgba(0, 212, 255, 0.08), transparent 32%),
    radial-gradient(circle at 82% 12%, rgba(124, 58, 237, 0.1), transparent 28%);
}

.cockpit-header {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 28px;
  align-items: end;
}

.hero-badge {
  display: inline-flex;
  padding: 5px 13px;
  border-radius: 999px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  background: rgba(0, 212, 255, 0.08);
  color: #00d4ff;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.header-copy h1 {
  margin: 14px 0 10px;
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 400;
  line-height: 0.96;
  color: #fff;
}

.header-copy p {
  max-width: 880px;
  margin: 0;
  color: rgba(232, 237, 245, 0.68);
  font-size: 15px;
  line-height: 1.8;
}

.header-copy strong {
  display: block;
  max-width: 780px;
  margin-top: 12px;
  color: rgba(6, 214, 160, 0.94);
  font-size: 14px;
  line-height: 1.7;
  font-weight: 550;
}

.header-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(128px, 1fr));
  gap: 10px;
  min-width: 300px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 10px 14px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(247, 251, 255, 0.92);
  background: rgba(255, 255, 255, 0.045);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn:hover:not(:disabled) { transform: translateY(-1px); }
.btn:disabled { opacity: 0.42; cursor: not-allowed; }
.btn.primary { border-color: rgba(0, 212, 255, 0.34); background: linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(6, 214, 160, 0.12)); color: #8ff5ff; }
.btn.purple { border-color: rgba(124, 58, 237, 0.34); background: linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(0, 212, 255, 0.08)); color: #c8b8ff; }
.btn.report { border-color: rgba(6, 214, 160, 0.24); color: #9af7dc; }
.btn.ghost { color: rgba(232, 237, 245, 0.72); }
.btn.small { min-height: 34px; padding: 8px 12px; font-size: 12px; }

.summary-grid,
.process-strip,
.cockpit-grid,
.active-explain,
.timeline-card {
  max-width: 1480px;
  margin-left: auto;
  margin-right: auto;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(14, 18, 42, 0.62);
  backdrop-filter: blur(16px);
}

.summary-card svg { color: var(--tone); filter: drop-shadow(0 0 12px color-mix(in srgb, var(--tone) 65%, transparent)); }
.summary-card strong { display: block; color: #fff; font-family: var(--font-display); font-size: 24px; font-weight: 400; line-height: 1; }
.summary-card span { color: rgba(232, 237, 245, 0.56); font-size: 12px; }

.process-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 18px;
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(0, 212, 255, 0.13);
  background: rgba(10, 14, 34, 0.66);
  backdrop-filter: blur(18px);
}

.process-step {
  position: relative;
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 10px;
  align-items: start;
  min-height: 94px;
  padding: 13px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
}

.step-index {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(232, 237, 245, 0.7);
  font-family: var(--font-mono);
}

.process-step strong { display: block; color: #fff; font-size: 14px; }
.process-step span { display: block; margin-top: 3px; color: rgba(232, 237, 245, 0.55); font-size: 12px; }
.process-step em { display: inline-flex; margin-top: 9px; color: rgba(232, 237, 245, 0.55); font-size: 11px; font-style: normal; }
.step-arrow { position: absolute; right: -15px; top: 40px; color: rgba(0, 212, 255, 0.34); z-index: 2; }
.process-step.running { border-color: rgba(0, 212, 255, 0.32); background: rgba(0, 212, 255, 0.07); }
.process-step.completed { border-color: rgba(6, 214, 160, 0.26); background: rgba(6, 214, 160, 0.06); }
.process-step.remedy { border-color: rgba(255, 107, 154, 0.34); background: rgba(244, 63, 94, 0.07); }
.process-step.running .step-index, .process-step.completed .step-index { color: #07111f; background: #00d4ff; border-color: transparent; }
.process-step.completed .step-index { background: #06d6a0; }
.process-step.remedy .step-index { color: #fff; background: #ff6b9a; border-color: transparent; }
.process-step.running em { color: #00d4ff; }
.process-step.completed em { color: #06d6a0; }
.process-step.remedy em { color: #ff7aa7; }

.cockpit-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(360px, 2fr);
  gap: 20px;
  margin-top: 22px;
  align-items: start;
}

.evidence-stack {
  display: grid;
  gap: 16px;
}

.active-explain {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-top: 18px;
  padding: 16px 18px;
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 154, 0.22);
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(0, 212, 255, 0.045));
}

.active-explain span { color: #ff7aa7; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
.active-explain p { margin: 5px 0 0; color: rgba(232, 237, 245, 0.75); line-height: 1.7; font-size: 13px; }
.active-explain b { color: #fff; }

.timeline-card { margin-top: 20px; }

.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(2, 6, 16, 0.72);
  backdrop-filter: blur(10px);
}

.report-modal {
  width: min(560px, 100%);
  border-radius: 26px;
  border: 1px solid rgba(0, 212, 255, 0.18);
  background: linear-gradient(145deg, rgba(9, 15, 34, 0.96), rgba(12, 16, 40, 0.92));
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.48);
  padding: 22px;
}

.modal-head { display: flex; justify-content: space-between; gap: 16px; }
.modal-head p { margin: 0 0 4px; color: #00d4ff; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; }
.modal-head h2 { margin: 0; color: #fff; font-family: var(--font-display); font-weight: 400; }
.modal-head button { width: 34px; height: 34px; border-radius: 50%; color: rgba(232, 237, 245, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.04); }
.report-body { margin-top: 16px; color: rgba(232, 237, 245, 0.72); line-height: 1.7; }
.report-body ul { margin: 12px 0 0; padding-left: 18px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@media (max-width: 1180px) {
  .cockpit-header { grid-template-columns: 1fr; }
  .header-actions { grid-template-columns: repeat(4, minmax(0, 1fr)); min-width: 0; }
  .process-strip { grid-template-columns: 1fr; }
  .step-arrow { display: none; }
  .cockpit-grid { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .cockpit-shell { padding: 26px 14px 42px; }
  .header-actions, .summary-grid { grid-template-columns: 1fr; }
  .active-explain { align-items: stretch; flex-direction: column; }
}
</style>
