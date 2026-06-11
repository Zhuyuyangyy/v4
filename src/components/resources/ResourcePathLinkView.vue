<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, MessageCircle, RefreshCw, ClipboardCheck, GraduationCap } from 'lucide-vue-next'

interface PathResource {
  title: string
  isRemedial?: boolean
  type?: string
}

interface PathStage {
  id: string
  label: string
  icon: unknown
  color: string
  resources: PathResource[]
}

const stages = ref<PathStage[]>([
  {
    id: 'pre',
    label: '课前预习',
    icon: BookOpen,
    color: '#7c3aed',
    resources: [
      { title: '指针与地址速查卡', type: 'doc' },
      { title: '内存格子图入门', type: 'mindmap' },
    ],
  },
  {
    id: 'in',
    label: '课中答疑',
    icon: MessageCircle,
    color: '#00d4ff',
    resources: [
      { title: '*p 与 p 的读写区别', type: 'video' },
      { title: '函数参数地址传递演示', type: 'video' },
    ],
  },
  {
    id: 'post',
    label: '课后巩固',
    icon: RefreshCw,
    color: '#06d6a0',
    resources: [
      { title: '二级指针调用栈图解', type: 'mindmap' },
      { title: 'swap / createNode 改写 5 题', type: 'exercise', isRemedial: true },
    ],
  },
  {
    id: 'eval',
    label: '阶段测评',
    icon: ClipboardCheck,
    color: '#f59e0b',
    resources: [
      { title: '指针别名判断小测', type: 'exercise' },
      { title: '链表插入函数补全', type: 'code' },
    ],
  },
  {
    id: 'final',
    label: '期末辅导',
    icon: GraduationCap,
    color: '#f43f5e',
    resources: [
      { title: '野指针与空指针排查清单', type: 'mindmap' },
      { title: '逐行 Trace 复盘讲解', type: 'video' },
    ],
  },
])

const activeStage = ref<string | null>('post')

function toggleStage(id: string) {
  activeStage.value = activeStage.value === id ? null : id
}
</script>

<template>
  <div class="path-view">
    <div class="path-banner">
      <span class="path-banner-dot"></span>
      <span>路径链展示 C 指针补救资源如何被安排到课前、课中、课后、测评和辅导阶段，高亮项是评估后新增的补弱资源。</span>
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
              <component :is="stage.icon" :size="16" stroke-width="1.5" class="stage-icon" />
              <span class="stage-label">{{ stage.label }}</span>
              <span class="stage-index">Phase {{ idx + 1 }}</span>
            </div>
            <span class="stage-count">{{ stage.resources.length }} 个资源</span>
          </div>

          <span :class="['stage-chevron', { open: activeStage === stage.id }]">›</span>
        </div>

        <Transition name="expand">
          <div v-if="activeStage === stage.id" class="stage-resources">
            <div
              v-for="res in stage.resources"
              :key="res.title"
              :class="['stage-resource', { remedial: res.isRemedial }]"
            >
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
@keyframes pv-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.path-view {
  padding: 0 40px 40px;
  animation: pv-float-up 0.5s ease both;
}

.path-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 28px;
  font-size: 13px;
  color: #8892b0;
  line-height: 1.6;
}

.path-banner-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #06d6a0;
  box-shadow: 0 0 10px #06d6a066;
  flex-shrink: 0;
}

.path-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-line {
  position: absolute;
  left: 15px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(124, 58, 237, 0.25),
    rgba(0, 212, 255, 0.25),
    rgba(6, 214, 160, 0.25),
    rgba(245, 158, 11, 0.25),
    rgba(244, 63, 94, 0.25)
  );
  border-radius: 2px;
}

.path-stage {
  position: relative;
  padding-left: 44px;
  padding-bottom: 8px;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 14px;
  background: rgba(12, 12, 30, 0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.25s ease;
}

.stage-header:hover {
  border-color: color-mix(in srgb, var(--stage-color) 30%, transparent);
  background: rgba(12, 12, 30, 0.75);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.path-stage.active .stage-header {
  border-color: color-mix(in srgb, var(--stage-color) 35%, transparent);
  background: rgba(12, 12, 30, 0.85);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2), 0 0 16px color-mix(in srgb, var(--stage-color) 8%, transparent);
}

.stage-marker {
  position: absolute;
  left: 6px;
  top: 24px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--stage-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--stage-color) 40%, transparent);
  z-index: 1;
}

.marker-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--stage-color) 20%, transparent);
  transition: all 0.3s ease;
}

.path-stage.active .marker-ring {
  border-color: color-mix(in srgb, var(--stage-color) 45%, transparent);
  transform: scale(1.3);
}

.stage-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stage-top-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage-icon {
  color: var(--stage-color);
}

.stage-label {
  font-family: var(--font-display);
  font-size: 17px;
  color: #e8edf5;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.stage-index {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--stage-color) 8%, transparent);
  color: var(--stage-color);
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.stage-count {
  font-size: 11px;
  color: #4a5568;
  font-family: var(--font-mono);
}

.stage-chevron {
  font-size: 18px;
  color: #4a5568;
  transition: all 0.25s ease;
}

.stage-chevron.open {
  transform: rotate(90deg);
  color: var(--stage-color);
}

.stage-resources {
  padding: 10px 0 4px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stage-resource {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  border-radius: 12px;
  background: rgba(12, 12, 30, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.25s ease;
}

.stage-resource:hover {
  border-color: rgba(0, 212, 255, 0.12);
  background: rgba(12, 12, 30, 0.6);
}

.stage-resource.remedial {
  border-color: rgba(6, 214, 160, 0.18);
  background: rgba(6, 214, 160, 0.04);
}

.stage-resource.remedial:hover {
  border-color: rgba(6, 214, 160, 0.3);
}

.res-connector {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--stage-color);
  opacity: 0.5;
  flex-shrink: 0;
  box-shadow: 0 0 6px color-mix(in srgb, var(--stage-color) 25%, transparent);
}

.res-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.res-title {
  font-size: 13px;
  color: #e8edf5;
}

.remedial-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 6px;
  background: rgba(6, 214, 160, 0.1);
  color: rgba(123, 255, 200, 0.9);
  white-space: nowrap;
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
}

.expand-enter-active { transition: all 0.25s ease; }
.expand-leave-active { transition: all 0.15s ease-in; }
.expand-enter-from { opacity: 0; transform: translateY(-8px); }
.expand-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 900px) {
  .path-view { padding: 0 20px 32px; }
}
</style>
