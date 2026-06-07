<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle, ArrowRight, BookOpenCheck } from 'lucide-vue-next'
import type { WeaknessNode } from '@/types/evaluation-dashboard'

const props = defineProps<{
  weaknesses: WeaknessNode[]
  activeWeaknessId?: string
}>()

const emit = defineEmits<{
  select: [id: string]
  openResource: [item: WeaknessNode]
}>()

const sortedWeaknesses = computed(() => {
  const weight = { high: 3, medium: 2, low: 1 }
  return [...props.weaknesses].sort((a, b) => weight[b.severity] - weight[a.severity])
})
</script>

<template>
  <section class="weakness-card cockpit-card">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Weakness Diagnosis</p>
        <h3>薄弱点定位</h3>
      </div>
      <span class="panel-pill">{{ weaknesses.length }} 个待处理</span>
    </div>

    <div v-if="weaknesses.length" class="weakness-list">
      <article
        v-for="item in sortedWeaknesses"
        :key="item.id"
        class="weakness-item"
        :class="[item.severity, { active: activeWeaknessId === item.id }]"
        @click="emit('select', item.id)"
      >
        <div class="weakness-title">
          <AlertTriangle :size="17" stroke-width="1.8" />
          <strong>{{ item.label }}</strong>
          <span>{{ item.severity }}</span>
        </div>
        <dl>
          <div><dt>错因</dt><dd>{{ item.reason }}</dd></div>
          <div><dt>影响路径</dt><dd>{{ item.impact }}</dd></div>
          <div><dt>补救动作</dt><dd>{{ item.action }}</dd></div>
        </dl>
        <button type="button" class="resource-btn" @click.stop="emit('openResource', item)">
          <BookOpenCheck :size="15" stroke-width="1.7" />
          查看辅导资源
          <ArrowRight :size="14" stroke-width="1.7" />
        </button>
      </article>
    </div>

    <div v-else class="empty-state">
      <BookOpenCheck :size="24" stroke-width="1.6" />
      <p>深度评估后，主要薄弱点已被补救路径覆盖。</p>
    </div>
  </section>
</template>

<style scoped>
.cockpit-card { border: 1px solid rgba(0, 212, 255, 0.14); background: linear-gradient(145deg, rgba(9, 15, 34, 0.88), rgba(12, 16, 40, 0.7)); border-radius: 22px; box-shadow: 0 18px 55px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(18px); }
.weakness-card { padding: 20px; }
.panel-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
.eyebrow { margin: 0 0 4px; color: #ff6b9a; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
h3 { margin: 0; color: #f7fbff; font-size: 19px; font-family: var(--font-display); font-weight: 400; }
.panel-pill { color: rgba(232,237,245,.7); border: 1px solid rgba(255,255,255,.1); border-radius: 999px; padding: 4px 10px; font-size: 12px; }
.weakness-list { display: grid; gap: 12px; }
.weakness-item { padding: 14px; border-radius: 18px; border: 1px solid rgba(244, 63, 94, .22); background: rgba(244, 63, 94, .055); cursor: pointer; transition: transform .2s ease, border-color .2s ease, background .2s ease; }
.weakness-item:hover, .weakness-item.active { transform: translateY(-2px); border-color: rgba(255, 107, 154, .62); background: rgba(244, 63, 94, .095); box-shadow: 0 0 0 1px rgba(255, 107, 154, .08), 0 18px 35px rgba(244, 63, 94, .08); }
.weakness-title { display: flex; align-items: center; gap: 9px; color: #ff7aa7; }
.weakness-title strong { color: #fff; font-size: 14px; }
.weakness-title span { margin-left: auto; color: rgba(255, 122, 167, .85); font-size: 11px; text-transform: uppercase; border: 1px solid rgba(255, 122, 167, .26); border-radius: 999px; padding: 2px 8px; }
dl { display: grid; gap: 8px; margin: 12px 0; }
dl div { display: grid; grid-template-columns: 68px 1fr; gap: 10px; }
dt { color: rgba(232,237,245,.45); font-size: 12px; }
dd { margin: 0; color: rgba(232,237,245,.78); font-size: 12px; line-height: 1.55; }
.resource-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 9px 12px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, .22); color: #00d4ff; background: rgba(0, 212, 255, .07); transition: background .2s ease, transform .2s ease; }
.resource-btn:hover { background: rgba(0, 212, 255, .13); transform: translateY(-1px); }
.empty-state { display: grid; place-items: center; gap: 10px; min-height: 160px; color: rgba(6,214,160,.85); text-align: center; border: 1px dashed rgba(6,214,160,.25); border-radius: 18px; background: rgba(6,214,160,.055); }
.empty-state p { margin: 0; max-width: 260px; color: rgba(232,237,245,.72); line-height: 1.65; }
</style>
