<script setup lang="ts">
import { computed } from 'vue'
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  FileText,
  Network,
  PlayCircle,
  RefreshCw,
  Route,
  Sparkles,
  WandSparkles,
} from 'lucide-vue-next'

const props = defineProps<{
  weeklyHours: number
  goalHours: number
}>()

const emit = defineEmits<{
  navigateToTab: [tabName: string]
}>()

const progressPercent = computed(() =>
  Math.min(Math.round((props.weeklyHours / props.goalHours) * 100), 100)
)

const metrics = computed(() => [
  { label: '本周学习', value: `${props.weeklyHours}`, unit: '小时' },
  { label: '目标进度', value: `${progressPercent.value}`, unit: '%' },
  { label: '推荐资源', value: '18', unit: '个' },
  { label: '画像更新', value: '5', unit: '次' },
])

const knowledgeInputs = [
  { icon: BookOpen, label: '当前课程', value: '数据结构与算法', meta: '第 4 章 · 图搜索与最短路' },
  { icon: FileText, label: '教材切片', value: 'BFS / DFS / Dijkstra', meta: '12 个核心概念已入库' },
  { icon: Code2, label: '代码样例', value: '队列遍历模板', meta: 'Python / C++ 双语示例' },
  { icon: ClipboardCheck, label: '题目输入', value: '薄弱点专项练习', meta: '6 道题等待转译' },
]

const pipelineNodes = [
  { icon: Brain, title: '画像诊断', text: '读取近期答题、停留和错因信号', accent: '#8fa7ff' },
  { icon: WandSparkles, title: '资源生成', text: '重写成图解卡片、代码讲解和练习包', accent: '#35e0d8' },
  { icon: Route, title: '路径规划', text: '把新资源插入今日学习顺序', accent: '#f0b24a' },
  { icon: Activity, title: '练习评估', text: '用小测结果反向更新画像', accent: '#45d483' },
]

const workspaceActions = [
  {
    icon: PlayCircle,
    title: '进入课程知识源',
    text: '查看章节、代码和预设问答',
    tone: 'gold',
    run: () => emit('navigateToTab', '课程'),
  },
  {
    icon: Sparkles,
    title: '生成个性化资源',
    text: '把知识点转成材料、导图和练习',
    tone: 'cyan',
    run: () => emit('navigateToTab', '资源中心'),
  },
  {
    icon: ClipboardCheck,
    title: '完成今日练习',
    text: '用 15 分钟小测校准掌握度',
    tone: 'green',
    run: () => emit('navigateToTab', '练习中心'),
  },
  {
    icon: Network,
    title: '打开知识图谱',
    text: '检查概念之间的依赖关系',
    tone: 'blue',
    run: () => emit('navigateToTab', '思维导图'),
  },
]
</script>

<template>
  <section class="edu-translation-home" aria-labelledby="edu-home-title">
    <div class="edu-translation-hero">
      <div class="edu-translation-copy">
        <p class="edu-kicker">
          <span class="edu-kicker-dot" />
          KNOWLEDGE TO LEARNING ACTION
        </p>
        <h1 id="edu-home-title">EduMind 知识转译控制台</h1>
        <p class="edu-lede">
          把课程教材、代码样例和错题信号送入多智能体加工流，转译成适合你的学习资源、路径和练习反馈。
        </p>
        <div class="edu-hero-actions">
          <button type="button" class="edu-primary-action" @click="emit('navigateToTab', '课程')">
            <BookOpen :size="18" />
            <span>查看课程知识源</span>
          </button>
          <button type="button" class="edu-secondary-action" @click="emit('navigateToTab', '资源中心')">
            <Sparkles :size="18" />
            <span>生成学习资源</span>
          </button>
        </div>
      </div>

      <div class="edu-console" aria-label="知识转译流程">
        <section class="edu-panel edu-source-panel">
          <div class="edu-panel-head">
            <span>01</span>
            <strong>课程知识源</strong>
          </div>
          <div class="edu-source-book" aria-hidden="true">
            <div class="edu-book-spine">COURSE</div>
            <div class="edu-book-pages">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div class="edu-source-list">
            <button
              v-for="item in knowledgeInputs"
              :key="item.label"
              type="button"
              class="edu-source-item"
              @click="emit('navigateToTab', '课程')"
            >
              <component :is="item.icon" :size="18" />
              <span>
                <small>{{ item.label }}</small>
                <strong>{{ item.value }}</strong>
                <em>{{ item.meta }}</em>
              </span>
            </button>
          </div>
        </section>

        <section class="edu-panel edu-flow-panel">
          <div class="edu-panel-head">
            <span>02</span>
            <strong>AI 加工流</strong>
          </div>
          <div class="edu-flow-core">
            <div
              v-for="(node, index) in pipelineNodes"
              :key="node.title"
              class="edu-flow-node"
              :style="{ '--node-accent': node.accent, '--node-index': index }"
            >
              <div class="edu-flow-icon">
                <component :is="node.icon" :size="20" />
              </div>
              <div>
                <strong>{{ node.title }}</strong>
                <p>{{ node.text }}</p>
              </div>
              <ArrowRight v-if="index < pipelineNodes.length - 1" class="edu-flow-arrow" :size="16" />
            </div>
          </div>
          <div class="edu-token-meter">
            <span>Tokens processed</span>
            <strong>1,024,000</strong>
            <div class="edu-token-bars" aria-hidden="true">
              <i v-for="i in 34" :key="i" :style="{ '--bar-height': `${28 + ((i * 17) % 56)}%` }" />
            </div>
          </div>
        </section>

        <section class="edu-panel edu-workbench-panel">
          <div class="edu-panel-head">
            <span>03</span>
            <strong>学习工作台</strong>
          </div>
          <div class="edu-workbench-status">
            <CheckCircle2 :size="22" />
            <span>
              <small>今日建议</small>
              <strong>先补图搜索，再做 15 分钟专项练习</strong>
            </span>
          </div>
          <div class="edu-action-grid">
            <button
              v-for="action in workspaceActions"
              :key="action.title"
              type="button"
              class="edu-action-card"
              :class="`tone-${action.tone}`"
              @click="action.run"
            >
              <component :is="action.icon" :size="19" />
              <span>
                <strong>{{ action.title }}</strong>
                <small>{{ action.text }}</small>
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>

    <div class="edu-metric-strip" aria-label="学习状态指标">
      <div v-for="metric in metrics" :key="metric.label" class="edu-metric">
        <small>{{ metric.label }}</small>
        <strong>{{ metric.value }}<span>{{ metric.unit }}</span></strong>
      </div>
      <button type="button" class="edu-refresh" @click="emit('navigateToTab', '练习中心')">
        <RefreshCw :size="16" />
        <span>用练习刷新画像</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.edu-translation-home {
  width: 100%;
  min-height: calc(100vh - 48px);
  color: #edf6ff;
}

.edu-translation-hero {
  display: grid;
  grid-template-columns: minmax(260px, 0.34fr) minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}

.edu-translation-copy {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(124, 160, 220, 0.16);
  border-radius: 18px;
  padding: 28px;
  background:
    radial-gradient(circle at 18% 20%, rgba(240, 178, 74, 0.14), transparent 34%),
    linear-gradient(145deg, rgba(11, 14, 28, 0.78), rgba(6, 8, 18, 0.52));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 22px 70px rgba(0, 0, 0, 0.28);
}

.edu-kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 22px;
  color: #91dfff;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.16em;
}

.edu-kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #35e0d8;
  box-shadow: 0 0 18px rgba(53, 224, 216, 0.9);
}

.edu-translation-copy h1 {
  margin: 0;
  max-width: 10em;
  color: #fff;
  font-size: clamp(38px, 4.6vw, 68px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: 0;
}

.edu-lede {
  margin: 22px 0 0;
  max-width: 560px;
  color: #b7c7df;
  font-size: 16px;
  line-height: 1.8;
}

.edu-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.edu-primary-action,
.edu-secondary-action,
.edu-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 42px;
  border: 0;
  border-radius: 10px;
  padding: 0 16px;
  color: #fff;
  cursor: pointer;
}

.edu-primary-action {
  background: linear-gradient(135deg, #f0b24a, #35e0d8);
  box-shadow: 0 14px 34px rgba(53, 224, 216, 0.18);
}

.edu-secondary-action,
.edu-refresh {
  border: 1px solid rgba(145, 223, 255, 0.2);
  background: rgba(11, 18, 36, 0.58);
}

.edu-console {
  display: grid;
  grid-template-columns: minmax(220px, 0.92fr) minmax(280px, 1.16fr) minmax(240px, 1fr);
  gap: 14px;
  min-width: 0;
}

.edu-panel {
  position: relative;
  overflow: hidden;
  min-height: 620px;
  border: 1px solid rgba(124, 160, 220, 0.14);
  border-radius: 18px;
  padding: 18px;
  background:
    linear-gradient(145deg, rgba(9, 13, 28, 0.72), rgba(6, 8, 18, 0.44)),
    rgba(5, 7, 16, 0.68);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.edu-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #eff7ff;
  font-size: 15px;
}

.edu-panel-head span {
  color: #6f82a8;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.16em;
}

.edu-source-book {
  position: relative;
  height: 174px;
  margin: 24px 0;
  border-radius: 14px;
  background:
    radial-gradient(circle at 72% 40%, rgba(240, 178, 74, 0.24), transparent 44%),
    linear-gradient(135deg, rgba(91, 56, 26, 0.72), rgba(18, 13, 20, 0.82));
  border: 1px solid rgba(240, 178, 74, 0.18);
}

.edu-book-spine {
  position: absolute;
  left: 18px;
  top: 18px;
  bottom: 18px;
  writing-mode: vertical-rl;
  color: #f7d38d;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  letter-spacing: 0.22em;
}

.edu-book-pages {
  position: absolute;
  right: 18px;
  top: 26px;
  display: grid;
  gap: 9px;
  width: 54%;
}

.edu-book-pages span {
  height: 30px;
  border-radius: 7px;
  background: linear-gradient(90deg, rgba(255, 242, 204, 0.8), rgba(255, 255, 255, 0.18));
}

.edu-source-list,
.edu-action-grid {
  display: grid;
  gap: 10px;
}

.edu-source-item,
.edu-action-card {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(124, 160, 220, 0.13);
  border-radius: 12px;
  padding: 12px;
  text-align: left;
  color: #edf6ff;
  background: rgba(8, 12, 28, 0.52);
  cursor: pointer;
}

.edu-source-item svg {
  color: #f0b24a;
}

.edu-source-item small,
.edu-action-card small,
.edu-workbench-status small,
.edu-metric small {
  display: block;
  color: #7f91b4;
  font-size: 11px;
}

.edu-source-item strong,
.edu-action-card strong,
.edu-workbench-status strong {
  display: block;
  overflow-wrap: anywhere;
  color: #fff;
  font-size: 14px;
  line-height: 1.35;
}

.edu-source-item em {
  display: block;
  margin-top: 3px;
  color: #96a8c8;
  font-size: 12px;
  font-style: normal;
}

.edu-flow-panel {
  background:
    radial-gradient(circle at 50% 38%, rgba(53, 224, 216, 0.16), transparent 34%),
    linear-gradient(145deg, rgba(8, 13, 30, 0.72), rgba(5, 7, 16, 0.46));
}

.edu-flow-core {
  position: relative;
  display: grid;
  gap: 14px;
  margin-top: 28px;
}

.edu-flow-core::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 34px;
  bottom: 34px;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(53, 224, 216, 0.78), transparent);
}

.edu-flow-node {
  --node-accent: #35e0d8;
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 18px;
  gap: 12px;
  align-items: center;
  min-height: 96px;
  border: 1px solid color-mix(in srgb, var(--node-accent) 28%, rgba(124, 160, 220, 0.13));
  border-radius: 14px;
  padding: 12px;
  background:
    radial-gradient(circle at 0% 50%, color-mix(in srgb, var(--node-accent) 14%, transparent), transparent 58%),
    rgba(7, 11, 26, 0.7);
}

.edu-flow-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  color: var(--node-accent);
  background: color-mix(in srgb, var(--node-accent) 12%, rgba(255, 255, 255, 0.04));
}

.edu-flow-node strong {
  color: #fff;
}

.edu-flow-node p {
  margin: 4px 0 0;
  color: #9eb0ce;
  font-size: 13px;
  line-height: 1.5;
}

.edu-flow-arrow {
  color: var(--node-accent);
  opacity: 0.78;
}

.edu-token-meter {
  margin-top: 22px;
  border: 1px solid rgba(53, 224, 216, 0.18);
  border-radius: 14px;
  padding: 14px;
  background: rgba(4, 12, 22, 0.68);
}

.edu-token-meter span {
  color: #7f91b4;
  font-size: 12px;
}

.edu-token-meter strong {
  display: block;
  margin-top: 4px;
  color: #fff;
  font-size: 28px;
}

.edu-token-bars {
  display: flex;
  align-items: end;
  gap: 3px;
  height: 52px;
  margin-top: 12px;
}

.edu-token-bars i {
  width: 100%;
  height: var(--bar-height);
  min-height: 8px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #f0b24a, #35e0d8);
}

.edu-workbench-status {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin: 24px 0 14px;
  border: 1px solid rgba(69, 212, 131, 0.18);
  border-radius: 14px;
  padding: 14px;
  color: #45d483;
  background: rgba(69, 212, 131, 0.08);
}

.edu-action-card.tone-gold svg { color: #f0b24a; }
.edu-action-card.tone-cyan svg { color: #35e0d8; }
.edu-action-card.tone-green svg { color: #45d483; }
.edu-action-card.tone-blue svg { color: #8fa7ff; }

.edu-metric-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  gap: 12px;
  margin-top: 16px;
}

.edu-metric {
  border: 1px solid rgba(124, 160, 220, 0.13);
  border-radius: 14px;
  padding: 14px;
  background: rgba(8, 12, 28, 0.52);
}

.edu-metric strong {
  display: block;
  color: #fff;
  font-size: 24px;
}

.edu-metric span {
  margin-left: 4px;
  color: #7f91b4;
  font-size: 12px;
}

@media (hover: hover) {
  .edu-source-item:hover,
  .edu-action-card:hover,
  .edu-secondary-action:hover,
  .edu-refresh:hover {
    border-color: rgba(53, 224, 216, 0.34);
    transform: translateY(-1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .edu-source-item,
  .edu-action-card,
  .edu-secondary-action,
  .edu-refresh {
    transition: none;
  }
}

@media (max-width: 1280px) {
  .edu-translation-hero,
  .edu-console {
    grid-template-columns: 1fr;
  }

  .edu-panel {
    min-height: auto;
  }
}

@media (max-width: 760px) {
  .edu-translation-home {
    min-height: auto;
  }

  .edu-translation-copy,
  .edu-panel {
    border-radius: 14px;
    padding: 16px;
  }

  .edu-metric-strip {
    grid-template-columns: 1fr 1fr;
  }

  .edu-refresh {
    grid-column: 1 / -1;
  }
}
</style>
