<script setup lang="ts">
import { Activity, CheckCircle2, DatabaseZap, Gauge, Lightbulb } from 'lucide-vue-next'
import type { EvaluationEvidence, EvaluationStage } from '@/types/evaluation-dashboard'

defineProps<{
  stage: EvaluationStage
  evidence: EvaluationEvidence[]
  summary: string
  systemJudgement: string
}>()

const icons = [Gauge, CheckCircle2, DatabaseZap, Activity, Lightbulb]
</script>

<template>
  <section class="evidence-card cockpit-card">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Evidence Chain</p>
        <h3>本轮评估证据链</h3>
      </div>
      <span class="stage-chip">Stage {{ stage }}</span>
    </div>

    <p class="summary">{{ summary }}</p>

    <div class="evidence-grid">
      <article v-for="(item, index) in evidence" :key="item.id" class="evidence-item" :class="item.tone">
        <component :is="icons[index % icons.length]" :size="18" stroke-width="1.7" />
        <div>
          <strong>{{ item.label }}</strong>
          <span>{{ item.value }}</span>
          <p>{{ item.detail }}</p>
        </div>
      </article>
    </div>

    <div class="judgement">
      <span>系统判断</span>
      <p>{{ systemJudgement }}</p>
    </div>
  </section>
</template>

<style scoped>
.cockpit-card { border: 1px solid rgba(0, 212, 255, 0.14); background: linear-gradient(145deg, rgba(9, 15, 34, 0.88), rgba(12, 16, 40, 0.7)); border-radius: 22px; box-shadow: 0 18px 55px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(18px); }
.evidence-card { padding: 20px; }
.panel-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; margin-bottom: 14px; }
.eyebrow { margin: 0 0 4px; color: #00d4ff; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
h3 { margin: 0; color: #f7fbff; font-size: 19px; font-family: var(--font-display); font-weight: 400; }
.stage-chip { color: #06d6a0; border: 1px solid rgba(6, 214, 160, .25); background: rgba(6, 214, 160, .07); border-radius: 999px; padding: 4px 10px; font-size: 12px; }
.summary { margin: 0 0 14px; color: rgba(232, 237, 245, .72); font-size: 13px; line-height: 1.7; }
.evidence-grid { display: grid; gap: 10px; }
.evidence-item { display: grid; grid-template-columns: 34px 1fr; gap: 10px; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.035); color: rgba(232,237,245,.8); }
.evidence-item svg { margin-top: 3px; color: var(--tone); filter: drop-shadow(0 0 10px color-mix(in srgb, var(--tone) 60%, transparent)); }
.evidence-item strong { display: block; color: #f7fbff; font-size: 13px; font-weight: 650; }
.evidence-item span { display: block; color: var(--tone); font-family: var(--font-mono); font-size: 16px; margin: 3px 0; }
.evidence-item p { margin: 0; font-size: 12px; line-height: 1.55; color: rgba(232,237,245,.62); }
.cyan { --tone: #00d4ff; } .purple { --tone: #9b7cff; } .emerald { --tone: #06d6a0; } .pink { --tone: #ff6b9a; }
.judgement { margin-top: 14px; padding: 13px; border-radius: 16px; border: 1px solid rgba(124, 58, 237, .22); background: rgba(124, 58, 237, .08); }
.judgement span { color: #9b7cff; font-size: 12px; letter-spacing: .08em; }
.judgement p { margin: 5px 0 0; color: rgba(247,251,255,.88); line-height: 1.65; font-size: 13px; }
</style>
