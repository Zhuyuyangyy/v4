<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Component } from 'vue'
import { BookOpen, MessageCircle, RefreshCw, ClipboardCheck, GraduationCap } from 'lucide-vue-next'
import { NODE_CONTENT, STAGE_META, type StageContent } from '@/data/learningPathContents'

interface Topic {
  id: string; label: string; mastery: number; recommended?: boolean
}
interface Domain {
  id: string; name: string; color: string; short: string; mastery: number; topics: Topic[]
}

const props = defineProps<{ domain?: Domain; topic?: Topic }>()
const activeStage = ref<string | null>(null)

const ICON_MAP: Record<string, Component> = {
  BookOpen,
  MessageCircle,
  RefreshCw,
  ClipboardCheck,
  GraduationCap,
}

const stages = computed(() => {
  const domain = props.domain
  const topic = props.topic
  if (!domain || !topic) return []

  return STAGE_META.map((meta, idx) => {
    const topicContent: StageContent[] = []

    // 只取被点击的那颗星的内容
    const nodeStages = NODE_CONTENT[topic.id]
    if (nodeStages && nodeStages[idx]) {
      nodeStages[idx].forEach(r => {
        topicContent.push({ ...r, isRemedial: r.isRemedial || topic.mastery < 0.2 })
      })
    }

    const mastery = topic.mastery
    let status: 'completed' | 'current' | 'locked' = 'locked'
    if (mastery >= 0.7) status = 'completed'
    else if (mastery >= 0.2) status = 'current'

    return {
      ...meta,
      status,
      mastery,
      resources: topicContent.length > 0 ? topicContent : [{ title: `${topic.label} - ${meta.label} 资源加载中`, type: 'doc' }],
    }
  })
})

function toggleStage(id: string) {
  activeStage.value = activeStage.value === id ? null : id
}

watch(() => props.topic?.id, () => { activeStage.value = null })
</script>

<template>
  <div class="path-view" v-if="domain && topic">
    <div class="path-banner">
      <span class="path-banner-dot" :style="{ background: domain.color, boxShadow: `0 0 10px ${domain.color}66` }"></span>
      <span>「{{ topic.label }}」掌握度 {{ Math.round(topic.mastery * 100) }}% · {{ topic.mastery < 0.3 ? '需要重点学习' : topic.mastery < 0.7 ? '继续深入' : '已较好掌握' }}</span>
    </div>

    <div class="path-timeline">
      <div class="timeline-line" />

      <div
        v-for="(stage, idx) in stages"
        :key="stage.id"
        :class="['path-stage', { active: activeStage === stage.id }]"
        :style="{ '--stage-color': stage.color }"
      >
        <div class="stage-header" @click="toggleStage(stage.id)">
          <div class="stage-marker">
            <div class="marker-dot" />
            <div class="marker-ring" />
          </div>
          <div class="stage-info">
            <div class="stage-top-row">
              <component :is="ICON_MAP[stage.icon]" :size="16" stroke-width="1.5" class="stage-icon" />
              <span class="stage-label">{{ stage.label }}</span>
              <span class="stage-index">Phase {{ idx + 1 }}</span>
            </div>
            <span class="stage-count">{{ stage.resources.length }} 个资源</span>
          </div>
          <span :class="['stage-chevron', { open: activeStage === stage.id }]">›</span>
        </div>

        <Transition name="expand">
          <div v-if="activeStage === stage.id" class="stage-resources">
            <div v-for="(res, ri) in stage.resources" :key="ri" :class="['stage-resource', { remedial: res.isRemedial }]">
              <div class="res-connector" />
              <div class="res-content">
                <span class="res-title">{{ res.title }}</span>
                <span v-if="res.isRemedial" class="remedial-badge">评估后新增</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-view { padding: 0 40px 40px; }
.path-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 28px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.path-banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.path-timeline { position: relative; display: flex; flex-direction: column; }
.timeline-line {
  position: absolute; left: 15px; top: 20px; bottom: 20px; width: 2px;
  background: linear-gradient(to bottom, rgba(124,58,237,.25), rgba(0,212,255,.25), rgba(6,214,160,.25), rgba(245,158,11,.25), rgba(244,63,94,.25));
  border-radius: 2px;
}
.path-stage { position: relative; padding-left: 44px; padding-bottom: 8px; }
.stage-header {
  display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 14px;
  background: rgba(12,12,30,.55); backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.06); cursor: pointer; transition: all .25s ease;
}
.stage-header:hover { border-color: color-mix(in srgb, var(--stage-color) 30%, transparent); background: rgba(12,12,30,.75); }
.path-stage.active .stage-header {
  border-color: color-mix(in srgb, var(--stage-color) 35%, transparent);
  background: rgba(12,12,30,.85);
  box-shadow: 0 6px 24px rgba(0,0,0,.2), 0 0 16px color-mix(in srgb, var(--stage-color) 8%, transparent);
}
.stage-marker { position: absolute; left: 6px; top: 24px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.marker-dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--stage-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--stage-color) 40%, transparent); z-index: 1;
}
.marker-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--stage-color) 20%, transparent); transition: all .3s ease;
}
.path-stage.active .marker-ring { border-color: color-mix(in srgb, var(--stage-color) 45%, transparent); transform: scale(1.3); }
.stage-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.stage-top-row { display: flex; align-items: center; gap: 8px; }
.stage-icon { color: var(--stage-color); }
.stage-label { font-family: var(--font-display); font-size: 17px; color: #e8edf5; font-weight: 400; }
.stage-index {
  font-size: 10px; padding: 2px 8px; border-radius: 6px;
  background: color-mix(in srgb, var(--stage-color) 8%, transparent); color: var(--stage-color);
  font-family: var(--font-mono); font-weight: 600; letter-spacing: .06em;
}
.stage-count { font-size: 11px; color: #4a5568; font-family: var(--font-mono); }
.stage-chevron { font-size: 18px; color: #4a5568; transition: all .25s ease; }
.stage-chevron.open { transform: rotate(90deg); color: var(--stage-color); }
.stage-resources { padding: 10px 0 4px 18px; display: flex; flex-direction: column; gap: 6px; }
.stage-resource {
  display: flex; align-items: center; gap: 10px; padding: 11px 16px; border-radius: 12px;
  background: rgba(12,12,30,.4); border: 1px solid rgba(255,255,255,.04); transition: all .25s ease;
}
.stage-resource:hover { border-color: rgba(0,212,255,.12); background: rgba(12,12,30,.6); }
.stage-resource.remedial { border-color: rgba(6,214,160,.18); background: rgba(6,214,160,.04); }
.stage-resource.remedial:hover { border-color: rgba(6,214,160,.3); }
.res-connector {
  width: 6px; height: 6px; border-radius: 50%; background: var(--stage-color); opacity: .5;
  flex-shrink: 0; box-shadow: 0 0 6px color-mix(in srgb, var(--stage-color) 25%, transparent);
}
.res-content { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
.res-title { font-size: 13px; color: #e8edf5; }
.remedial-badge {
  font-size: 10px; font-weight: 600; padding: 2px 9px; border-radius: 6px;
  background: rgba(6,214,160,.1); color: rgba(123,255,200,.9); white-space: nowrap;
  letter-spacing: .04em; font-family: var(--font-mono);
}
.expand-enter-active { transition: all .25s ease; }
.expand-leave-active { transition: all .15s ease-in; }
.expand-enter-from { opacity: 0; transform: translateY(-8px); }
.expand-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
