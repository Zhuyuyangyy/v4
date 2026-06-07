<script setup lang="ts">
import { CheckCircle2, CircleDot, Clock3 } from 'lucide-vue-next'
import type { EvaluationStage, TimelineItem } from '@/types/evaluation-dashboard'

defineProps<{
  currentStage: EvaluationStage
  items: TimelineItem[]
}>()
</script>

<template>
  <section class="timeline-card cockpit-card">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Profile Timeline</p>
        <h3>二次画像更新时间线</h3>
      </div>
      <span class="panel-pill">{{ currentStage === 2 ? '深度画像已形成' : '画像演进中' }}</span>
    </div>

    <div class="timeline">
      <article
        v-for="item in items"
        :key="item.stage"
        class="timeline-item"
        :class="{ active: item.stage === currentStage, completed: item.stage <= currentStage }"
      >
        <div class="timeline-marker">
          <CheckCircle2 v-if="item.stage < currentStage" :size="18" stroke-width="1.8" />
          <CircleDot v-else-if="item.stage === currentStage" :size="18" stroke-width="1.8" />
          <Clock3 v-else :size="18" stroke-width="1.8" />
        </div>
        <div class="timeline-body">
          <div class="timeline-top">
            <h4>{{ item.title }}</h4>
            <span>Stage {{ item.stage }}</span>
          </div>
          <div class="timeline-fields">
            <p><b>触发方式</b>{{ item.trigger }}</p>
            <p><b>使用证据</b>{{ item.evidence }}</p>
            <p><b>更新字段</b>{{ item.updatedFields }}</p>
            <p><b>变化幅度</b>{{ item.delta }}</p>
            <p><b>路径影响</b>{{ item.pathImpact }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cockpit-card { border: 1px solid rgba(0, 212, 255, 0.14); background: linear-gradient(145deg, rgba(9, 15, 34, 0.88), rgba(12, 16, 40, 0.7)); border-radius: 24px; box-shadow: 0 18px 55px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(18px); }
.timeline-card { padding: 22px; }
.panel-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; margin-bottom: 22px; }
.eyebrow { margin: 0 0 4px; color: #9b7cff; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
h3 { margin: 0; color: #f7fbff; font-size: 21px; font-family: var(--font-display); font-weight: 400; }
.panel-pill { color: rgba(232,237,245,.7); border: 1px solid rgba(255,255,255,.1); border-radius: 999px; padding: 4px 10px; font-size: 12px; }
.timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.timeline-item { position: relative; display: grid; grid-template-columns: 36px 1fr; gap: 12px; padding: 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.035); opacity: .58; }
.timeline-item.completed { opacity: 1; border-color: rgba(0,212,255,.18); }
.timeline-item.active { background: radial-gradient(circle at 20% 0, rgba(0,212,255,.13), rgba(255,255,255,.035) 45%); box-shadow: inset 0 0 0 1px rgba(0,212,255,.08); }
.timeline-marker { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; color: #00d4ff; background: rgba(0,212,255,.08); border: 1px solid rgba(0,212,255,.22); }
.timeline-item:not(:last-child)::after { content: ''; position: absolute; top: 34px; left: calc(100% - 4px); width: 18px; height: 1px; background: linear-gradient(90deg, rgba(0,212,255,.35), transparent); }
.timeline-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
h4 { margin: 0; color: #fff; font-size: 15px; }
.timeline-top span { color: rgba(6,214,160,.8); font-family: var(--font-mono); font-size: 11px; }
.timeline-fields { display: grid; gap: 7px; }
p { margin: 0; color: rgba(232,237,245,.68); font-size: 12px; line-height: 1.5; }
b { display: block; color: rgba(232,237,245,.42); font-size: 11px; font-weight: 500; margin-bottom: 1px; }
@media (max-width: 980px) { .timeline { grid-template-columns: 1fr; } .timeline-item:not(:last-child)::after { display: none; } }
</style>
