<script lang="ts">
export interface TreeBranch {
  id: string
  label: string
  mastery: number
  topics: { id: string; label: string; mastery: number }[]
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Sparkles } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  branches: TreeBranch[]
  overallMastery?: number
  compact?: boolean
}>(), {
  overallMastery: 0,
  compact: false,
})

const emit = defineEmits<{
  (e: 'nodeClick', branchId: string, topicId: string): void
  (e: 'branchClick', branchId: string): void
}>()

const time = ref(0)
let rafId = 0

const BRANCH_COLORS = [
  '#00d4ff',
  '#7c3aed',
  '#06d6a0',
  '#f59e0b',
  '#f43f5e',
  '#3b82f6',
]

function branchColor(index: number) {
  return BRANCH_COLORS[index % BRANCH_COLORS.length]
}

function branchAngle(index: number, total: number) {
  const spread = 130
  const startAngle = -spread / 2
  return startAngle + (spread / Math.max(total - 1, 1)) * index
}

function starGlow(mastery: number) {
  if (mastery >= 80) return 'full'
  if (mastery >= 50) return 'partial'
  if (mastery >= 20) return 'dim'
  return 'off'
}

const litCount = computed(() => {
  let lit = 0
  for (const b of props.branches) {
    for (const t of b.topics) {
      if (t.mastery >= 50) lit++
    }
  }
  return lit
})

const totalCount = computed(() => {
  let total = 0
  for (const b of props.branches) {
    total += b.topics.length
  }
  return total
})

const particles = computed(() => {
  const list = []
  for (let i = 0; i < 35; i++) {
    list.push({
      id: i,
      x: Math.sin(i * 2.39996) * 45 + 50,
      y: Math.cos(i * 1.73205) * 45 + 40,
      size: 1.5 + (i % 4) * 0.8,
      delay: (i * 0.3) % 4,
      duration: 3 + (i % 3),
    })
  }
  return list
})

function animate() {
  time.value = performance.now() / 1000
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})

function handleStarClick(branchId: string, topicId: string) {
  emit('nodeClick', branchId, topicId)
}

function handleBranchClick(branchId: string) {
  emit('branchClick', branchId)
}
</script>

<template>
  <div :class="['kt-tree', { compact }]">
    <div class="kt-header">
      <div class="kt-header-left">
        <Sparkles :size="16" stroke-width="1.5" class="kt-icon" />
        <span class="kt-title">知识灵树</span>
      </div>
      <div class="kt-stats">
        <span class="kt-lit">{{ litCount }}</span>
        <span class="kt-sep">/</span>
        <span class="kt-total">{{ totalCount }}</span>
        <span class="kt-label">知识点已点亮</span>
      </div>
    </div>

    <div class="kt-scene">
      <div class="kt-bg-glow" />
      <div class="kt-ring-outer" />
      <div class="kt-ring-inner" />

      <svg class="kt-svg" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="rgba(140,160,220,0.6)" />
            <stop offset="40%" stop-color="rgba(220,225,240,0.9)" />
            <stop offset="100%" stop-color="rgba(240,242,255,1)" />
          </linearGradient>
          <linearGradient id="veinGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="rgba(80,140,255,0.2)" />
            <stop offset="50%" stop-color="rgba(100,170,255,0.6)" />
            <stop offset="100%" stop-color="rgba(120,190,255,0.9)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(100,170,255,0.5)" />
            <stop offset="60%" stop-color="rgba(80,140,255,0.15)" />
            <stop offset="100%" stop-color="rgba(60,100,255,0)" />
          </radialGradient>
          <radialGradient id="leafGrad" cx="30%" cy="30%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
            <stop offset="60%" stop-color="rgba(200,220,255,0.4)" />
            <stop offset="100%" stop-color="rgba(100,150,200,0.2)" />
          </radialGradient>
        </defs>

        <ellipse cx="200" cy="440" rx="80" ry="12" fill="url(#ringGlow)" opacity="0.8" />

        <path
          d="M200 440
             C196 400 202 360 198 320
             C194 280 204 240 200 200
             C196 160 202 120 200 80"
          stroke="url(#trunkGrad)"
          stroke-width="18"
          fill="none"
          stroke-linecap="round"
        />
        <path
          d="M200 440
             C196 400 202 360 198 320
             C194 280 204 240 200 200
             C196 160 202 120 200 80"
          stroke="url(#veinGrad)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          filter="url(#glow)"
          :stroke-dasharray="`4 ${8 + Math.sin(time * 0.5) * 2}`"
        />
        <path
          d="M200 440
             C204 410 198 370 202 340
             C206 310 200 270 200 230"
          stroke="url(#veinGrad)"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          filter="url(#glow)"
          :stroke-dasharray="`3 ${10 + Math.cos(time * 0.7) * 3}`"
          opacity="0.5"
        />

        <template v-for="(branch, bIdx) in branches" :key="branch.id">
          <path
            :d="`
              M200 ${220 - bIdx * 12}
              Q
              ${180 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 25}
              ${190 - bIdx * 12}
              ${200 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 70}
              ${130 - bIdx * 10}
              T
              ${200 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 110}
              ${80 - bIdx * 8}
            `"
            :stroke="branchColor(bIdx)"
            stroke-width="4"
            fill="none"
            stroke-linecap="round"
            opacity="0.7"
            filter="url(#glow)"
          />
          <path
            :d="`
              M200 ${220 - bIdx * 12}
              Q
              ${180 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 25}
              ${190 - bIdx * 12}
              ${200 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 70}
              ${130 - bIdx * 10}
            `"
            :stroke="branchColor(bIdx)"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            opacity="0.4"
            :stroke-dasharray="`2 ${6 + Math.sin(time + bIdx) * 2}`"
          />

          <ellipse
            :cx="200 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 120"
            :cy="70 - bIdx * 8"
            rx="50"
            ry="35"
            fill="url(#leafGrad)"
            opacity="0.7"
          />

          <g
            v-for="(topic, tIdx) in branch.topics"
            :key="topic.id"
            class="kt-star-group"
            @click="handleStarClick(branch.id, topic.id)"
          >
            <circle
              :cx="
                200
                + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * (40 + tIdx * 20)
                + Math.cos(tIdx * 1.8) * 12
              "
              :cy="
                120 - bIdx * 12
                - tIdx * 12
                + Math.sin(tIdx * 2.1) * 8
              "
              r="7"
              :fill="starGlow(topic.mastery) !== 'off' ? branchColor(bIdx) : 'rgba(255,255,255,0.06)'"
              :opacity="starGlow(topic.mastery) !== 'off' ? 1 : 0.3"
              :filter="starGlow(topic.mastery) === 'full' ? 'url(#starGlow)' : ''"
              class="kt-star"
            />
            <circle
              v-if="starGlow(topic.mastery) === 'full'"
              :cx="
                200
                + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * (40 + tIdx * 20)
                + Math.cos(tIdx * 1.8) * 12
              "
              :cy="
                120 - bIdx * 12
                - tIdx * 12
                + Math.sin(tIdx * 2.1) * 8
              "
              r="3.5"
              fill="white"
              opacity="0.95"
            />
            <title>{{ topic.label }} ({{ topic.mastery }}%)</title>
          </g>

          <text
            :x="200 + Math.sin(branchAngle(bIdx, branches.length) * Math.PI / 180) * 125"
            :cy="75 - bIdx * 8"
            fill="white"
            font-size="9.5"
            font-weight="600"
            opacity="0.75"
            text-anchor="middle"
            class="kt-branch-label"
            @click="handleBranchClick(branch.id)"
          >
            {{ branch.label }}
          </text>
        </template>

        <circle
          v-for="p in particles"
          :key="p.id"
          :cx="p.x * 4"
          :cy="p.y * 4.8"
          :r="p.size"
          fill="rgba(150,200,255,0.6)"
          class="kt-particle"
          :style="{ animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }"
        />
      </svg>
    </div>

    <div class="kt-legend">
      <div class="kt-legend-item">
        <span class="kt-legend-dot full" />已掌握
      </div>
      <div class="kt-legend-item">
        <span class="kt-legend-dot partial" />学习中
      </div>
      <div class="kt-legend-item">
        <span class="kt-legend-dot off" />未开始
      </div>
    </div>
  </div>
</template>

<style scoped>
.kt-tree {
  background: linear-gradient(180deg, rgba(8, 6, 24, 0.95) 0%, rgba(16, 12, 40, 0.9) 100%);
  border: 1px solid rgba(100, 150, 255, 0.12);
  border-radius: 18px;
  padding: 20px 24px 16px;
  position: relative;
  overflow: hidden;
}
.kt-tree.compact {
  padding: 16px 20px 12px;
}

.kt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.kt-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.kt-icon {
  color: #60a5fa;
}
.kt-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
.kt-stats {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: 13px;
}
.kt-lit {
  font-size: 22px;
  font-weight: 700;
  color: #60a5fa;
  font-family: var(--font-display);
}
.kt-sep {
  color: rgba(255, 255, 255, 0.2);
  margin: 0 1px;
}
.kt-total {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}
.kt-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  margin-left: 6px;
}

.kt-scene {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 6;
  max-height: 420px;
  margin: 0 auto;
}

.kt-bg-glow {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 30%;
  background: radial-gradient(ellipse, rgba(80, 140, 255, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.kt-ring-outer {
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  aspect-ratio: 2.5 / 1;
  border-radius: 50%;
  border: 1px solid rgba(100, 170, 255, 0.2);
  box-shadow: 0 0 20px rgba(80, 140, 255, 0.15), inset 0 0 15px rgba(80, 140, 255, 0.08);
  pointer-events: none;
}
.kt-ring-inner {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 35%;
  aspect-ratio: 2.5 / 1;
  border-radius: 50%;
  border: 1.5px solid rgba(100, 170, 255, 0.35);
  box-shadow: 0 0 30px rgba(80, 160, 255, 0.25), inset 0 0 20px rgba(80, 160, 255, 0.12);
  pointer-events: none;
}

.kt-svg {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.kt-star-group {
  cursor: pointer;
}
.kt-star {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.kt-star-group:hover .kt-star {
  r: 10;
}

.kt-branch-label {
  cursor: pointer;
  transition: opacity 0.2s;
}
.kt-branch-label:hover {
  opacity: 1 !important;
}

.kt-particle {
  animation: ktFloat 4s ease-in-out infinite;
}

@keyframes ktFloat {
  0%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-6px);
  }
}

.kt-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
}
.kt-legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}
.kt-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.kt-legend-dot.full {
  background: #60a5fa;
  box-shadow: 0 0 6px rgba(96, 165, 250, 0.6);
}
.kt-legend-dot.partial {
  background: rgba(96, 165, 250, 0.4);
}
.kt-legend-dot.off {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .kt-tree {
    padding: 14px 16px 12px;
  }
  .kt-scene {
    max-height: 320px;
  }
}
</style>
