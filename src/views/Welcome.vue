<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import HeroConstellation from '@/components/homepage/HeroConstellation.vue'
import AgentLiveTicker from '@/components/homepage/AgentLiveTicker.vue'
import SectionTelemetry from '@/components/homepage/SectionTelemetry.vue'
import SectionSkyline from '@/components/homepage/SectionSkyline.vue'
import SectionMissions from '@/components/homepage/SectionMissions.vue'
import AgentHub from '@/components/homepage/AgentHub.vue'
import TrainFlow from '@/views/TrainFlow.vue'

const loaded = ref(false)
const activeHubBeatId = ref('profile')
const controlBeatId = ref('profile')
const controlNonce = ref(0)

const hubStages = [
  { id: 'profile', role: 'PROFILE', name: '画像智能体', color: '#8FA7FF', note: '识别薄弱知识点、学习偏好和卡顿信号' },
  { id: 'path', role: 'PATH', name: '路径规划智能体', color: '#35E0D8', note: '根据画像重排补弱路径和学习顺序' },
  { id: 'resource', role: 'RESOURCE', name: '资源推荐智能体', color: '#45D483', note: '匹配视频、例题、练习和补充材料' },
  { id: 'tutor', role: 'TUTOR', name: 'AI 辅导智能体', color: '#F0B24A', note: '把资源转成讲解、追问和辅导记录' },
  { id: 'eval', role: 'EVAL', name: '评估智能体', color: '#F0586E', note: '生成诊断题并判断是否真正掌握' },
  { id: 'loop', role: 'WRITE-BACK', name: '反馈回写', color: '#FFD78A', note: '把评估结果回写画像和下一轮路径' },
]

const currentHubStage = computed(() => (
  hubStages.find(stage => stage.id === activeHubBeatId.value) ?? hubStages[0]
))

function handleAgentHubBeat(event: MessageEvent) {
  if (event.data?.type !== 'agenthub:beat') return
  activeHubBeatId.value = event.data.id
}

function jumpToAgent(id: string) {
  activeHubBeatId.value = id
  controlBeatId.value = id
  controlNonce.value += 1
}

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
  window.addEventListener('message', handleAgentHubBeat)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleAgentHubBeat)
})
</script>

<template>
  <div class="welcome">
    <div class="home-image-layer" aria-hidden="true">
      <img class="home-art home-art-hero" src="/homepage/agent-constellation-hero.png" alt="">
      <img class="home-art home-art-path" src="/homepage/learning-path-repair.png" alt="">
      <img class="home-art home-art-profile" src="/homepage/profile-evidence-orb.png" alt="">
    </div>

    <HeroConstellation />

    <section class="hub-workbench">
      <aside class="hub-context-card" :style="{ '--stage-color': currentHubStage.color }">
        <span class="hub-context-kicker">AGENT ROLES</span>
        <h2>每个智能体负责什么</h2>

        <div class="hub-agent-list" aria-label="智能体职责说明">
          <button
            v-for="stage in hubStages"
            :key="stage.id"
            type="button"
            class="hub-agent-item"
            :class="{ active: stage.id === activeHubBeatId }"
            :style="{ '--stage-color': stage.color }"
            @click="jumpToAgent(stage.id)"
          >
            <span class="hub-agent-role">{{ stage.role }}</span>
            <strong>{{ stage.name }}</strong>
            <small>{{ stage.note }}</small>
          </button>
        </div>
      </aside>

      <div class="hub-workbench-main">
        <AgentHub :control-beat-id="controlBeatId" :control-nonce="controlNonce" />
        <TrainFlow embedded-stage-only :active-beat-id="activeHubBeatId" />
      </div>
    </section>

    <!-- Agent live ticker -->
    <AgentLiveTicker />

    <!-- Collaboration telemetry -->
    <SectionTelemetry />
    <SectionSkyline />
    <SectionMissions />

    <footer class="footer" aria-hidden="true" />
  </div>
</template>

<style scoped>
.welcome {
  position: relative;
  min-height: 100vh;
  background: transparent;
  isolation: isolate;
  overflow: hidden;
}

.home-image-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.home-art {
  position: absolute;
  display: block;
  object-fit: cover;
  user-select: none;
  mix-blend-mode: screen;
  filter: saturate(0.88) contrast(1.03);
}

.home-art-hero {
  top: 72px;
  right: -12vw;
  width: min(1120px, 64vw);
  opacity: 0.68;
  transform: rotate(-1.5deg);
  mask-image: radial-gradient(ellipse at 62% 48%, #000 0%, rgba(0, 0, 0, 0.9) 58%, transparent 92%);
}

.home-art-path {
  top: 1320px;
  left: -10vw;
  width: min(760px, 50vw);
  opacity: 0.52;
  transform: rotate(3deg);
  mask-image: radial-gradient(ellipse at 48% 50%, #000 0%, rgba(0, 0, 0, 0.84) 58%, transparent 90%);
}

.home-art-profile {
  top: 2320px;
  right: -8vw;
  width: min(680px, 46vw);
  opacity: 0.48;
  transform: rotate(-4deg);
  mask-image: radial-gradient(ellipse at 50% 50%, #000 0%, rgba(0, 0, 0, 0.82) 58%, transparent 88%);
}

/* Home section transparency */
:deep(.hero-constellation),
:deep(.agent-hub-section),
:deep(.trainflow-page),
:deep(.section-telemetry),
:deep(.section-skyline),
:deep(.section-missions),
:deep(.section-loop),
:deep(.section-schematic),
:deep(.section-agent-chain),
:deep(.agent-writing-section) {
  background: transparent !important;
}

:deep(.hero-constellation) {
  overflow: visible;
}

:deep(.agent-hub-section) {
  position: relative;
  z-index: 1;
  padding: 72px 36px 52px;
}

:deep(.agent-hub-frame) {
  display: block;
  width: 100%;
  height: 560px;
  min-height: 0;
  border: 0;
  border-radius: 18px;
  background: transparent;
}

:deep(.hero-grid),
:deep(.hero-starfield) {
  opacity: 0.46;
}

:deep(.sky-canvas),
:deep(.mission-rail),
:deep(.mission-rail-shell),
:deep(.tele-chart),
:deep(.loop-stage),
:deep(.schematic-stage),
:deep(.chain-board),
:deep(.tf-shell),
:deep(.log-container),
:deep(.agent-stage),
:deep(.hub-frame-shell),
:deep(.hero-visual-shell),
:deep(.hero-dashboard),
:deep(.hero-card),
:deep(.hero-side-panel) {
  background:
    radial-gradient(ellipse at 62% 20%, rgba(0, 212, 255, 0.08), transparent 58%),
    linear-gradient(145deg, rgba(7, 10, 24, 0.30), rgba(4, 7, 18, 0.12)) !important;
  backdrop-filter: blur(8px) saturate(1.18);
}

:deep(.sky-callout),
:deep(.activity-chip .chip-card),
:deep(.tele-detail-card),
:deep(.tele-stats),
:deep(.sky-stats),
:deep(.mis-quota),
:deep(.stage-work-order),
:deep(.course-chip),
:deep(.handoff-strip),
:deep(.loop-leap),
:deep(.writeback-strip),
:deep(.mission-card),
:deep(.mission-detail),
:deep(.mission-agent-row),
:deep(.metric-card),
:deep(.domain-card),
:deep(.activity-chip),
:deep(.chip-card) {
  background: rgba(8, 12, 30, 0.26) !important;
  backdrop-filter: blur(10px) saturate(1.2);
}

:deep(.agent-stage) {
  border-color: rgba(120, 160, 220, 0.18) !important;
}

:deep(.stage-watermark) {
  opacity: 0.045 !important;
}

.hub-workbench {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(260px, 0.34fr) minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
  max-width: 1760px;
  margin: 0 auto;
  padding: 72px 36px 56px;
}

.hub-context-card {
  --stage-color: #00d4ff;
  min-height: 640px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  border: 1px solid color-mix(in srgb, var(--stage-color) 32%, rgba(120, 160, 220, 0.14));
  border-radius: 18px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--stage-color) 36%, transparent), transparent 1px) 0 0 / 100% 52px,
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--stage-color) 12%, transparent), transparent 52%),
    linear-gradient(145deg, rgba(7, 10, 24, 0.22), rgba(4, 7, 18, 0.08));
  backdrop-filter: blur(10px) saturate(1.2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hub-context-kicker {
  color: var(--stage-color);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.hub-context-card h2 {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(28px, 2.4vw, 38px);
  font-weight: 500;
  line-height: 1.06;
}

.hub-agent-list {
  display: grid;
  gap: 9px;
  margin-top: 2px;
}

.hub-agent-item {
  --stage-color: #00d4ff;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  gap: 4px 12px;
  align-items: start;
  width: 100%;
  appearance: none;
  text-align: left;
  cursor: pointer;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--stage-color) 18%, rgba(120, 160, 220, 0.12));
  border-radius: 13px;
  background: rgba(8, 12, 30, 0.14);
  transition:
    transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.28s ease,
    background 0.28s ease,
    box-shadow 0.28s ease;
}

.hub-agent-item:hover {
  transform: translateX(3px);
  border-color: color-mix(in srgb, var(--stage-color) 44%, rgba(120, 160, 220, 0.16));
  background: color-mix(in srgb, var(--stage-color) 7%, rgba(8, 12, 30, 0.18));
}

.hub-agent-item:active {
  transform: translateX(3px) scale(0.985);
}

.hub-agent-item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--stage-color) 70%, white);
  outline-offset: 3px;
}

.hub-agent-role {
  grid-row: span 2;
  color: var(--stage-color);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  line-height: 1.4;
}

.hub-agent-item strong {
  color: #f7fbff;
  font-size: 14px;
  line-height: 1.3;
}

.hub-agent-item small {
  color: #8da3c8;
  font-size: 12px;
  line-height: 1.5;
}

.hub-agent-item.active {
  border-color: color-mix(in srgb, var(--stage-color) 58%, transparent);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--stage-color) 42%, transparent), transparent 4px),
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--stage-color) 14%, transparent), transparent 60%),
    rgba(8, 12, 30, 0.20);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 10px 28px color-mix(in srgb, var(--stage-color) 12%, transparent);
}

.hub-workbench-main {
  min-width: 0;
}

.hub-workbench-main :deep(.agent-hub-section) {
  max-width: none;
  padding: 0;
}

.hub-workbench-main :deep(.agent-hub-frame) {
  height: 560px;
}

.hub-workbench-main :deep(.hub-head) {
  margin-top: 14px;
}

.hub-workbench-main :deep(.hub-head h2) {
  font-size: clamp(24px, 2vw, 32px);
}

.hub-workbench-main :deep(.trainflow-page) {
  padding: 0;
  margin-top: 14px;
}

.hub-workbench-main :deep(.agent-stage) {
  min-height: 0;
}

.hub-workbench-main :deep(.stage-grid-2) {
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 18px;
  padding: 18px;
  height: auto;
}

.hub-workbench-main :deep(.stage-agent-name) {
  font-size: 25px;
}

.hub-workbench-main :deep(.mastery-section) {
  margin-top: 12px;
}

.hub-workbench-main :deep(.stage-watermark) {
  font-size: 190px;
  right: -28px;
}

.hub-workbench-main :deep(.course-chip) {
  max-width: 100%;
}

.hub-workbench-main :deep(.course-name) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hub-workbench-main :deep(.thinking-thread) {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.hub-workbench-main :deep(.think-step) {
  align-items: flex-start;
}

.hub-workbench-main :deep(.think-connector) {
  display: none;
}

.hub-workbench-main :deep(.courses-section) {
  margin-top: 14px;
}

.hub-workbench-main :deep(.handoff-strip) {
  margin-top: 14px;
}

/* ── Section headers ── */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.5vw, 36px);
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 400;
  text-wrap: balance;
}

.section-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
  margin: 0;
}

.section-kicker {
  color: var(--color-accent-cyan);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
}

/* ── Footer ── */
.footer {
  padding: 48px 60px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
}

.footer p {
  color: var(--color-text-tertiary);
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .home-art-hero {
    top: 96px;
    right: -44vw;
    width: 118vw;
    opacity: 0.36;
  }

  .home-art-path,
  .home-art-profile {
    width: 92vw;
    opacity: 0.22;
  }

  .hub-workbench {
    grid-template-columns: 1fr;
    padding: 48px 16px 36px;
  }

  .hub-context-card,
  .hub-workbench-main :deep(.agent-stage) {
    min-height: auto;
  }

  .agent-collab-section {
    padding: 40px 24px 60px;
  }
  :deep(.agent-hub-section) {
    padding: 48px 16px 36px;
  }
  :deep(.agent-hub-frame) {
    height: 460px;
    min-height: 0;
  }
  .footer {
    padding: 32px 24px;
  }
}

@media (min-width: 901px) and (max-width: 1320px) {
  .hub-workbench {
    grid-template-columns: 1fr;
  }

  .hub-context-card {
    min-height: auto;
  }

  .hub-workbench-main :deep(.stage-grid-2) {
    grid-template-columns: 300px minmax(0, 1fr);
  }
}

</style>
