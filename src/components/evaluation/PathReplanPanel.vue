<script setup lang="ts">
import { GitBranch, Plus, Route } from 'lucide-vue-next'
import type { PathStep } from '@/types/evaluation-dashboard'

defineProps<{
  originalPath: PathStep[]
  replannedPath: PathStep[]
  reason: string
  active: boolean
}>()
</script>

<template>
  <section class="path-card cockpit-card" :class="{ active }">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Path Replan</p>
        <h3>路径重规划建议</h3>
      </div>
      <Route :size="20" stroke-width="1.7" />
    </div>

    <p class="reason">{{ reason }}</p>

    <div class="path-compare">
      <div class="path-row muted">
        <span class="row-label">原路径</span>
        <div class="steps">
          <template v-for="(step, index) in originalPath" :key="step.id">
            <span class="step original">{{ step.label }}</span>
            <span v-if="index < originalPath.length - 1" class="connector" />
          </template>
        </div>
      </div>

      <div class="path-row replanned">
        <span class="row-label">调整后</span>
        <div class="steps">
          <template v-for="(step, index) in replannedPath" :key="step.id">
            <span class="step" :class="step.type">
              <Plus v-if="step.type === 'remedy'" :size="12" stroke-width="2" />
              {{ step.label }}
            </span>
            <span v-if="index < replannedPath.length - 1" class="connector" />
          </template>
        </div>
      </div>
    </div>

    <div class="impact-note">
      <GitBranch :size="16" stroke-width="1.7" />
      新增补救步骤会优先连接薄弱知识点，再回到主路径推进。
    </div>
  </section>
</template>

<style scoped>
.cockpit-card { border: 1px solid rgba(0, 212, 255, 0.14); background: linear-gradient(145deg, rgba(9, 15, 34, 0.88), rgba(12, 16, 40, 0.7)); border-radius: 22px; box-shadow: 0 18px 55px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(18px); }
.path-card { padding: 20px; }
.path-card.active { border-color: rgba(6, 214, 160, .25); box-shadow: 0 18px 55px rgba(0,0,0,.3), 0 0 40px rgba(6,214,160,.08); }
.panel-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; margin-bottom: 12px; color: #00d4ff; }
.eyebrow { margin: 0 0 4px; color: #00d4ff; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
h3 { margin: 0; color: #f7fbff; font-size: 19px; font-family: var(--font-display); font-weight: 400; }
.reason { margin: 0 0 16px; color: rgba(232,237,245,.72); font-size: 13px; line-height: 1.7; }
.path-compare { display: grid; gap: 14px; }
.path-row { display: grid; gap: 9px; }
.row-label { color: rgba(232,237,245,.55); font-size: 12px; }
.steps { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; }
.step { display: inline-flex; align-items: center; gap: 5px; padding: 7px 10px; border-radius: 999px; border: 1px solid rgba(0, 212, 255, .18); background: rgba(0, 212, 255, .06); color: rgba(247,251,255,.86); font-size: 12px; }
.step.original { opacity: .72; }
.step.remedy { color: #ff7aa7; border-color: rgba(244,63,94,.4); background: rgba(244,63,94,.11); box-shadow: 0 0 18px rgba(244,63,94,.12); animation: remedy-pulse 1.4s ease infinite; }
.step.recommended { color: #ffe58f; border-color: rgba(255,229,143,.3); background: rgba(255,229,143,.08); }
.connector { width: 18px; height: 1px; background: linear-gradient(90deg, rgba(0,212,255,.24), rgba(6,214,160,.4)); }
.impact-note { margin-top: 16px; display: flex; gap: 8px; align-items: center; color: rgba(6,214,160,.88); font-size: 12px; line-height: 1.5; }
@keyframes remedy-pulse { 0%, 100% { box-shadow: 0 0 12px rgba(244,63,94,.1); } 50% { box-shadow: 0 0 24px rgba(244,63,94,.28); } }
</style>
