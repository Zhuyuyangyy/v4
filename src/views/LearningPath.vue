<template>
  <div class="lp-page">
    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">✦ KNOWLEDGE CONSTELLATION</div>
        <h2 class="lp-section-title">知识星座</h2>
        <p class="lp-section-desc">对话分析后自动生成，智能体持续更新知识点掌握状态。点击星星查看该知识点的学习路径。</p>
      </div>
      <ResourceConstellationView @select-node="onSelectNode" />
    </section>

    <section class="lp-section" v-if="selectedTopic">
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH</div>
        <h2 class="lp-section-title">{{ selectedTopic.label }} · 学习路径</h2>
        <p class="lp-section-desc">「{{ selectedDomain!.name }}」领域 → {{ selectedTopic.label }} 的5阶段学习计划</p>
      </div>
      <ResourcePathLinkView :domain="selectedDomain!" :topic="selectedTopic" />
    </section>

    <section class="lp-section" v-else>
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH</div>
        <h2 class="lp-section-title">学习路径</h2>
        <p class="lp-section-desc">点击上方星座中的任意一颗星星，查看该知识点的详细学习计划</p>
      </div>
      <div class="lp-empty-hint">
        <span class="hint-icon">👆</span>
        <span>请先点击知识星座中的任意一颗星</span>
      </div>
    </section>

    <section class="lp-section lp2-full">
      <div class="lp-section-header">
        <div class="lp-section-badge">◈ LEARNING PATH 2</div>
        <h2 class="lp-section-title">学习路径2</h2>
        <p class="lp-section-desc">两栏布局占位（60 / 40）</p>
      </div>
      <div class="lp2-grid">
        <div class="lp2-pane lp2-left">
          <!-- 悬浮航点卡片叠层 -->
          <div class="lp2-overlay">
            <div
              v-for="(s, idx) in [
                { idx: 0, label: '课前预习', meta: '前置知识 · 基础铺垫', color: '#00d4ff', cls: 'card-1' },
                { idx: 1, label: '课中答疑', meta: '实时互动 · 即时反馈', color: '#22d3ee', cls: 'card-2' },
                { idx: 2, label: '课后巩固', meta: '练习强化 · 薄弱回补', color: '#a78bfa', cls: 'card-3' },
                { idx: 3, label: '阶段测评', meta: '诊断考核 · 画像更新', color: '#f59e0b', cls: 'card-4' },
                { idx: 4, label: '期末辅导', meta: '综合复盘 · 终极通关', color: '#facc15', cls: 'card-5' },
              ]"
              :key="s.idx"
              :class="['floating-card', s.cls, { active: selectedStageIdx === s.idx }]"
              :style="{ '--line-color': s.color, '--line-glow': s.color + '99' }"
              @click="onSelectStage(s.idx)"
            >
              <span class="fc-corner fc-tl" /><span class="fc-corner fc-tr" />
              <span class="fc-corner fc-bl" /><span class="fc-corner fc-br" />
              <div class="fc-head">
                <span class="fc-pulse" :style="{ background: s.color, boxShadow: `0 0 6px ${s.color}, 0 0 12px ${s.color}` }" />
                <span class="fc-tag" :style="{ color: s.color, textShadow: `0 0 6px ${s.color}66` }">STAGE · {{ s.idx + 1 }}</span>
              </div>
              <div class="fc-title">{{ s.label }}</div>
              <div class="fc-meta">{{ s.meta }}</div>
            </div>
          </div>
        </div>
        <div class="lp2-pane lp2-right">
          <div class="level-card" :style="{ '--stage-color': currentStage.color }">
            <span class="level-corner corner-tl" :style="{ borderColor: currentStage.color }" />
            <span class="level-corner corner-tr" :style="{ borderColor: currentStage.color }" />
            <span class="level-corner corner-bl" :style="{ borderColor: currentStage.color }" />
            <span class="level-corner corner-br" :style="{ borderColor: currentStage.color }" />

            <div class="level-card-header">
              <span class="level-card-tag" :style="{ color: currentStage.color, textShadow: `0 0 8px ${currentStage.color}80` }">✦ {{ currentStage.label.toUpperCase() }}</span>
              <span class="level-card-id">PHASE · 0{{ selectedStageIdx + 1 }} / 05</span>
            </div>

            <h3 class="level-card-title">{{ currentLevelTitle }}</h3>

            <div class="level-card-info">
              <div class="info-row">
                <span class="info-label">所属领域</span>
                <span class="info-value">{{ selectedDomain ? selectedDomain.name : '—' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">掌握度</span>
                <span class="info-value">
                  <span class="difficulty-dot" :style="{ background: currentStage.color, boxShadow: `0 0 6px ${currentStage.color}` }" />
                  {{ selectedTopic ? Math.round(selectedTopic.mastery * 100) + '%' : '—' }}
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">任务数</span>
                <span class="info-value">{{ currentTaskCount }} 个</span>
              </div>
              <div class="info-row">
                <span class="info-label">预计时长</span>
                <span class="info-value">~ {{ currentTaskCount * 15 }} 分钟</span>
              </div>
              <div class="info-row">
                <span class="info-label">阶段说明</span>
                <span class="info-value">{{ currentStage.label }} · 第 {{ selectedStageIdx + 1 }} 阶段</span>
              </div>

              <!-- 任务清单 -->
              <div v-if="currentStageContent.length > 0" class="task-list">
                <div class="task-list-title">任务清单</div>
                <div
                  v-for="(t, ti) in currentStageContent"
                  :key="ti"
                  class="task-item"
                >
                  <div class="task-connector" />
                  <span class="task-num">{{ String(ti + 1).padStart(2, '0') }}</span>
                  <div class="task-content">
                    <span class="task-title">{{ t.title }}</span>
                    <span v-if="t.isRemedial" class="remedial-badge">评估后新增</span>
                  </div>
                  <div class="task-actions">
                    <button class="res-btn res-btn--doc" @click.stop="goToResource(t, 'doc')">
                      <span>文档</span>
                    </button>
                    <button class="res-btn res-btn--video" @click.stop="goToResource(t, 'video')">
                      <span>视频</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="level-card-footer">
              <div class="footer-progress">
                <div class="progress-track"><div class="progress-fill" :style="{ width: ((selectedStageIdx + 1) / 5 * 100) + '%', background: `linear-gradient(90deg, ${currentStage.color}, ${currentStage.color}aa)`, boxShadow: `0 0 8px ${currentStage.color}80` }" /></div>
                <span class="progress-text">进度 · Phase {{ selectedStageIdx + 1 }}/5</span>
              </div>
              <button class="start-btn" :style="{ background: `linear-gradient(135deg, ${currentStage.color}, ${currentStage.color}99)`, boxShadow: `0 0 16px ${currentStage.color}66` }">{{ selectedStageIdx === 4 ? '期末通关 →' : '开始本阶段 →' }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lp-section">
      <div class="lp-section-header">
        <div class="lp-section-badge">◇ KNOWLEDGE MATRIX</div>
        <h2 class="lp-section-title">知识点矩阵</h2>
        <p class="lp-section-desc">认知层级 × 学科领域的掌握度全景</p>
      </div>
      <ResourceMatrixView @select-node="onSelectNode" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useKnowledgeGraphData } from '../composables/useKnowledgeGraphData'
import { LEARNING_STAGES, getStageContent } from '../components/resources/mapTransforms'
import ResourceConstellationView from '../components/resources/ResourceConstellationView.vue'
import ResourcePathLinkView from '../components/resources/ResourcePathLinkView.vue'
import ResourceMatrixView from '../components/resources/ResourceMatrixView.vue'

const router = useRouter()
const { domains, edges, loading, loadFromBackend } = useKnowledgeGraphData()
const selectedNodeId = ref<string | null>(null)
const selectedStageIdx = ref(0) // 默认第 1 阶段

// 找到被点击的 domain
const selectedDomain = computed(() => {
  if (!selectedNodeId.value) return null
  for (const d of domains.value) {
    if (d.topics.some(t => t.id === selectedNodeId.value)) return d
  }
  return null
})

// 找到被点击的那颗星（单个知识点）
const selectedTopic = computed(() => {
  if (!selectedNodeId.value || !selectedDomain.value) return null
  return selectedDomain.value.topics.find(t => t.id === selectedNodeId.value) || null
})

// 当前选中的阶段元数据（颜色/标签）
const currentStage = computed(() => LEARNING_STAGES[selectedStageIdx.value] ?? LEARNING_STAGES[0])

// 当前选中的阶段资源（基于 selectedTopic.id 和 selectedStageIdx）
const currentStageContent = computed(() => {
  if (!selectedTopic.value) return []
  return getStageContent(selectedTopic.value.id, selectedStageIdx.value)
})

// 当前选中的关卡标题（知识点 + 阶段）
const currentLevelTitle = computed(() => {
  if (!selectedTopic.value) return '请先选择知识点'
  return `${selectedTopic.value.label} · ${currentStage.value.label}`
})

// 任务数
const currentTaskCount = computed(() => currentStageContent.value.length)

function onSelectNode(nodeId: string) {
  selectedNodeId.value = selectedNodeId.value === nodeId ? null : nodeId
  // 切换知识点时重置回第 1 阶段
  selectedStageIdx.value = 0
}

function onSelectStage(stageIdx: number) {
  selectedStageIdx.value = stageIdx
}

/**
 * 跳转到资源中心, 带 query 参数让 EduMind 自动打开对应资源
 * - resourceTitle: 资源标题
 * - domain: 领域名
 * - topic: 主题名
 * - stage: 阶段名
 * - sourceType: 'doc' | 'video'
 */
function goToResource(
  res: { title: string; type: string },
  sourceType: 'doc' | 'video',
) {
  router.push({
    path: '/resources',
    query: {
      resourceTitle: res.title,
      domain: selectedDomain.value?.name || '',
      topic: selectedTopic.value?.label || '',
      stage: currentStage.value.label,
      sourceType,
    },
  })
}

onMounted(() => {
  loadFromBackend(true).catch(() => {})
})
</script>

<style scoped>
.lp-page {
  display: flex;
  flex-direction: column;
}
.lp-section { padding: 0 40px; max-width: 1500px; margin-left: auto; margin-right: auto; width: 100%; }
.lp-section:first-child {
  padding: 24px 200px 0;
  max-width: none;
}
.lp-section-header { padding: 0 0 16px; }
.lp-section-badge {
  font-size: 12px; font-weight: 700; letter-spacing: 0.16em;
  color: rgba(0, 212, 255, 0.6);
  font-family: 'JetBrains Mono', monospace; margin-bottom: 6px;
}
.lp-section-title {
  font-size: 22px; font-weight: 700; color: #f0f2ff;
  margin: 0 0 4px; letter-spacing: -0.01em;
}
.lp-section-desc { font-size: 15px; color: #6f7a9e; margin: 0; }
.lp-section + .lp-section { margin-top: 12px; }
.lp-section:last-child { padding-bottom: 40px; }

.lp-empty-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.4);
  border: 1px dashed rgba(255, 255, 255, 0.08);
  color: #6f7a9e;
  font-size: 15px;
}
.hint-icon { font-size: 20px; }

/* Learning Path 2 — 两栏占位布局(60 / 40) */
.lp2-full {
  padding: 0 200px;
  max-width: none;
}
.lp2-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
}
.lp2-pane {
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.4);
}
.lp2-left {
  /* 图片原始尺寸 1568 × 1003,精确匹配以避免裁剪 */
  position: relative;
  aspect-ratio: 1568 / 1003;
  background-image: url('/learning-path/chaungguan1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

/* === 悬浮航点叠层 === */
.lp2-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  pointer-events: auto;
  min-width: 152px;
  padding: 12px 14px 11px;
  background: linear-gradient(135deg, rgba(7, 11, 24, 0.78), rgba(7, 11, 24, 0.55));
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(0, 212, 255, 0.45);
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(0, 212, 255, 0.1) inset,
    0 0 20px rgba(0, 212, 255, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
  animation: fc-float 5s ease-in-out infinite;
  cursor: pointer;
  --line-color: #00d4ff;
  --line-glow: rgba(0, 212, 255, 0.6);
}

/* 卡片底部中间往下的连接线 */
.floating-card::after {
  content: '';
  position: absolute;
  bottom: -46px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 46px;
  background: linear-gradient(to bottom, var(--line-color) 0%, transparent 100%);
  box-shadow: 0 0 6px var(--line-glow);
  pointer-events: none;
  opacity: 0.75;
  animation: line-pulse 2.4s ease-in-out infinite;
}
/* 线条末端小节点 */
.floating-card::before {
  content: '';
  position: absolute;
  bottom: -52px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--line-color);
  box-shadow: 0 0 8px var(--line-color), 0 0 14px var(--line-glow);
  pointer-events: none;
  animation: line-dot 2.4s ease-in-out infinite;
}

@keyframes line-pulse {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 0.95; }
}
@keyframes line-dot {
  0%, 100% { transform: translateX(-50%) scale(1);   opacity: 1;   }
  50%      { transform: translateX(-50%) scale(1.6); opacity: 0.4; }
}

.floating-card:hover {
  transform: translateY(-6px) scale(1.04);
  border-color: rgba(0, 212, 255, 0.9);
  box-shadow:
    0 0 0 1px rgba(0, 212, 255, 0.3) inset,
    0 0 32px rgba(0, 212, 255, 0.55),
    0 12px 32px rgba(0, 0, 0, 0.6);
  animation-play-state: paused;
}

/* 选中状态：放大 + 同色边框光晕 */
.floating-card.active {
  transform: translateY(-4px) scale(1.06);
  border-color: var(--line-color);
  box-shadow:
    0 0 0 1px var(--line-glow) inset,
    0 0 28px var(--line-glow),
    0 12px 32px rgba(0, 0, 0, 0.6);
  animation-play-state: paused;
  z-index: 2;
}
.floating-card.active::after,
.floating-card.active::before {
  animation-play-state: paused;
}
.floating-card:hover::after,
.floating-card:hover::before {
  animation-play-state: paused;
}

@keyframes fc-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}

/* 4 个角的小括号 */
.fc-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1.5px solid #00d4ff;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.7));
}
.fc-tl { top: -1px;    left: -1px;    border-right: none;  border-bottom: none; border-top-left-radius: 12px; }
.fc-tr { top: -1px;    right: -1px;   border-left: none;   border-bottom: none; border-top-right-radius: 12px; }
.fc-bl { bottom: -1px; left: -1px;    border-right: none;  border-top: none;    border-bottom-left-radius: 12px; }
.fc-br { bottom: -1px; right: -1px;   border-left: none;   border-top: none;    border-bottom-right-radius: 12px; }

.fc-head {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
}
.fc-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 6px #00d4ff, 0 0 12px #00d4ff;
  animation: fc-pulse 1.6s ease-in-out infinite;
  flex-shrink: 0;
}
.fc-pulse.mid   { background: #a78bfa; box-shadow: 0 0 6px #a78bfa, 0 0 12px #a78bfa; }
.fc-pulse.cyan2 { background: #22d3ee; box-shadow: 0 0 6px #22d3ee, 0 0 12px #22d3ee; }
.fc-pulse.amber { background: #f59e0b; box-shadow: 0 0 6px #f59e0b, 0 0 12px #f59e0b; }
.fc-pulse.end   { background: #facc15; box-shadow: 0 0 6px #facc15, 0 0 12px #facc15; }

@keyframes fc-pulse {
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%      { transform: scale(1.5); opacity: 0.4; }
}

.fc-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #00d4ff;
  text-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
}
.card-2 .fc-tag { color: #22d3ee; text-shadow: 0 0 6px rgba(34, 211, 238, 0.4); }
.card-3 .fc-tag { color: #a78bfa; text-shadow: 0 0 6px rgba(167, 139, 250, 0.4); }
.card-4 .fc-tag { color: #f59e0b; text-shadow: 0 0 6px rgba(245, 158, 11, 0.4); }
.card-5 .fc-tag { color: #facc15; text-shadow: 0 0 6px rgba(250, 204, 21, 0.4); }

.fc-title {
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 4px;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}
.fc-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #8da3c8;
  letter-spacing: 0.06em;
}

/* 5 个航点位置(沿星轨曲线均匀分布) */
.card-1 { top: calc(24% + 250px); left: 10%;   animation-delay: 0s;   --line-color: #00d4ff; --line-glow: rgba(0, 212, 255, 0.6);   }
.card-2 { top: calc(14% + 250px);  left: 40%;  animation-delay: 0.5s; --line-color: #22d3ee; --line-glow: rgba(34, 211, 238, 0.6); }
.card-3 { top: 32%;  left: 72%;  animation-delay: 1.0s; --line-color: #a78bfa; --line-glow: rgba(167, 139, 250, 0.6); }
.card-4 { top: 23%;  left: 38%;  animation-delay: 1.5s; --line-color: #f59e0b; --line-glow: rgba(245, 158, 11, 0.6);  }
.card-5 { top: 19%;  right: 82%;  animation-delay: 2.0s; --line-color: #facc15; --line-glow: rgba(250, 204, 21, 0.6);  }
.lp2-right {
  /* 不设 aspect-ratio,跟随 grid stretch 自动与左栏等高 */
  min-height: 100%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

/* === Sci-Fi Level Card === */
.level-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 26px 28px 22px;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 212, 255, 0.02) 50%, rgba(124, 58, 237, 0.05) 100%);
  border: 1px solid rgba(0, 212, 255, 0.35);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  box-shadow:
    0 0 0 1px rgba(0, 212, 255, 0.08) inset,
    0 0 32px rgba(0, 212, 255, 0.18),
    0 12px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* 角落装饰括号 */
.level-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid #00d4ff;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.6));
}
.corner-tl { top: -1px;    left: -1px;    border-right: none; border-bottom: none; border-top-left-radius: 16px; }
.corner-tr { top: -1px;    right: -1px;   border-left: none;  border-bottom: none; border-top-right-radius: 16px; }
.corner-bl { bottom: -1px; left: -1px;    border-right: none; border-top: none;    border-bottom-left-radius: 16px; }
.corner-br { bottom: -1px; right: -1px;   border-left: none;  border-top: none;    border-bottom-right-radius: 16px; }

/* 卡片顶部装饰光线 */
.level-card::before {
  content: '';
  position: absolute;
  top: 0; left: 16px; right: 16px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00d4ff 50%, transparent);
  opacity: 0.6;
}

.level-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.15);
}
.level-card-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #00d4ff;
  text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
}
.level-card-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #facc15;
  padding: 3px 8px;
  border: 1px solid rgba(250, 204, 21, 0.4);
  border-radius: 4px;
  background: rgba(250, 204, 21, 0.06);
}

.level-card-title {
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 18px;
  letter-spacing: 0.02em;
  text-shadow: 0 0 16px rgba(0, 212, 255, 0.4);
}

.level-card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.info-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  font-size: 15px;
  line-height: 1.5;
}
.info-label {
  flex-shrink: 0;
  width: 84px;
  color: #8da3c8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.06em;
}
.info-value {
  flex: 1;
  color: #eaf2ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.difficulty-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #06d6a0;
  box-shadow: 0 0 6px #06d6a0;
}
.info-value.reward {
  color: #facc15;
  font-weight: 600;
  text-shadow: 0 0 6px rgba(250, 204, 21, 0.3);
}

/* 任务清单 */
.task-list {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed rgba(0, 212, 255, 0.15);
}
.task-list-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--stage-color, #00d4ff);
  text-shadow: 0 0 6px color-mix(in srgb, var(--stage-color, #00d4ff) 40%, transparent);
  margin-bottom: 10px;
}
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.04);
  margin-bottom: 6px;
  transition: all 0.2s ease;
}
.task-item:hover {
  background: rgba(0, 0, 0, 0.32);
  border-color: color-mix(in srgb, var(--stage-color, #00d4ff) 30%, transparent);
}
/* 圆点连接器（仿 ResourcePathLinkView 的 res-connector） */
.task-connector {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--stage-color, #00d4ff);
  box-shadow: 0 0 6px color-mix(in srgb, var(--stage-color, #00d4ff) 60%, transparent);
  flex-shrink: 0;
  opacity: 0.85;
}
.task-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--stage-color, #00d4ff);
  text-shadow: 0 0 4px color-mix(in srgb, var(--stage-color, #00d4ff) 50%, transparent);
  flex-shrink: 0;
  width: 20px;
}
.task-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.task-title {
  font-size: 12.5px;
  color: #eaf2ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
}
/* 评估后新增标识（仿 ResourcePathLinkView 的 remedial-badge） */
.remedial-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 5px;
  background: rgba(6, 214, 160, 0.12);
  color: rgba(123, 255, 200, 0.9);
  white-space: nowrap;
  letter-spacing: 0.04em;
  font-family: 'JetBrains Mono', monospace;
  width: fit-content;
}
/* 文档/视频按钮（一直显示） */
.task-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.res-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
}
.res-btn--doc {
  background: rgba(59, 130, 246, 0.08);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.18);
}
.res-btn--doc:hover {
  background: rgba(59, 130, 246, 0.18);
  border-color: rgba(59, 130, 246, 0.35);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
}
.res-btn--video {
  background: rgba(139, 92, 246, 0.08);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.18);
}
.res-btn--video:hover {
  background: rgba(139, 92, 246, 0.18);
  border-color: rgba(139, 92, 246, 0.35);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
}

/* 卡片底部 */
.level-card-footer {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 212, 255, 0.15);
  display: flex;
  align-items: center;
  gap: 14px;
}
.footer-progress {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.progress-track {
  height: 4px;
  background: rgba(0, 212, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #7c3aed);
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
  border-radius: 2px;
  transition: width 0.6s ease;
}
.progress-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #6f7a9e;
  letter-spacing: 0.08em;
}
.start-btn {
  flex-shrink: 0;
  padding: 8px 16px;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.06em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.4);
  transition: all 0.2s ease;
}
.start-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.55);
}

@media (max-width: 900px) {
  .lp-section { padding: 0 16px; }
  .lp2-full { padding: 0 16px; }
  .lp2-grid { grid-template-columns: 1fr; min-height: auto; }
  .lp2-pane { min-height: 240px; }
  .level-card { padding: 20px 18px 16px; }
  .level-card-title { font-size: 18px; }
  .info-label { width: 70px; font-size: 12px; }
}
</style>
