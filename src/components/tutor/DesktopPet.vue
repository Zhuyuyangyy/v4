<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  desktopPetAnimations,
  getDesktopPetDuration,
  resolveDesktopPetAnimation,
  type DesktopPetState,
} from '@/config/desktopPet'
import type { EmotionMood } from '@/store/emotion'

const props = defineProps<{
  isAsking: boolean
  draftQuestion?: string
  lastCompletedAt?: number
  lastResult?: 'success' | 'error' | null
  currentMood?: EmotionMood
}>()

const activeState = ref<DesktopPetState>('idle')
const frameIndex = ref(0)
const statusText = ref('待机中，随时准备开始思考。')

let frameTimer: ReturnType<typeof setInterval> | null = null
let ambientTimer: ReturnType<typeof setTimeout> | null = null
let sequenceId = 0

const resolvedAnimation = computed(() => resolveDesktopPetAnimation(activeState.value))
const stateMeta = computed(() => desktopPetAnimations[activeState.value])
const moodText = computed(() => {
  switch (props.currentMood) {
    case 'positive':
      return '顺畅'
    case 'frustrated':
      return '安抚中'
    case 'anxious':
      return '专注中'
    default:
      return '陪伴中'
  }
})

const frameStyle = computed(() => {
  const animation = resolvedAnimation.value
  const col = frameIndex.value % animation.columns
  const row = Math.floor(frameIndex.value / animation.columns)
  const x = animation.columns === 1 ? 0 : (col / (animation.columns - 1)) * 100
  const y = animation.rows === 1 ? 0 : (row / (animation.rows - 1)) * 100

  return {
    backgroundImage: `url(${animation.src})`,
    backgroundSize: `${animation.columns * 100}% ${animation.rows * 100}%`,
    backgroundPosition: `${x}% ${y}%`,
  }
})

function clearFrameTimer() {
  if (frameTimer) {
    clearInterval(frameTimer)
    frameTimer = null
  }
}

function clearAmbientTimer() {
  if (ambientTimer) {
    clearTimeout(ambientTimer)
    ambientTimer = null
  }
}

function clearTimers() {
  clearFrameTimer()
  clearAmbientTimer()
}

function setState(state: DesktopPetState) {
  activeState.value = state
  const animation = resolvedAnimation.value
  frameIndex.value = 0
  statusText.value = desktopPetAnimations[state].caption
  clearFrameTimer()

  frameTimer = setInterval(() => {
    const nextFrame = frameIndex.value + 1

    if (animation.loop) {
      frameIndex.value = nextFrame % animation.frames
      return
    }

    if (nextFrame >= animation.frames) {
      frameIndex.value = animation.frames - 1
      clearFrameTimer()
      return
    }

    frameIndex.value = nextFrame
  }, Math.round(1000 / animation.fps))
}

function wait(ms: number, token: number) {
  return new Promise<boolean>(resolve => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId)
      resolve(token === sequenceId)
    }, ms)
  })
}

async function playSequence(states: DesktopPetState[], settleState: DesktopPetState) {
  clearAmbientTimer()
  const token = ++sequenceId

  for (const state of states) {
    setState(state)
    const stillActive = await wait(getDesktopPetDuration(state), token)
    if (!stillActive) return
  }

  if (token !== sequenceId) return

  setState(settleState)
  scheduleAmbientMotion()
}

function scheduleAmbientMotion() {
  clearAmbientTimer()

  if (props.isAsking) return

  const delay = 9000 + Math.round(Math.random() * 4000)
  ambientTimer = setTimeout(() => {
    if (props.isAsking) return

    const nextAmbientState: DesktopPetState = Math.random() > 0.6 ? 'walk' : 'idle'
    void playSequence(nextAmbientState === 'walk' ? ['walk'] : ['blink'], 'idle')
  }, delay)
}

watch(
  () => props.isAsking,
  isAsking => {
    if (isAsking) {
      statusText.value = props.draftQuestion?.trim()
        ? `收到问题：${props.draftQuestion.trim().slice(0, 22)}`
        : '收到新问题，开始进入思考流程。'
      void playSequence(['wake', 'thinking'], 'typing')
      return
    }

    scheduleAmbientMotion()
  },
)

watch(
  () => props.lastCompletedAt,
  completedAt => {
    if (!completedAt || props.isAsking) return
    const endState = props.lastResult === 'error' ? 'error' : 'cheer'
    void playSequence([endState], 'idle')
  },
)

onMounted(() => {
  setState('idle')
  scheduleAmbientMotion()
})

onBeforeUnmount(() => {
  sequenceId += 1
  clearTimers()
})
</script>

<template>
  <div class="desktop-pet-card">
    <div class="pet-stage">
      <div class="pet-glow" />
      <div class="pet-sprite" :style="frameStyle" />
    </div>

    <div class="pet-meta">
      <div class="pet-meta-row">
        <span class="pet-pill">{{ stateMeta.label }}</span>
        <span class="pet-mood">{{ moodText }}</span>
      </div>
      <p class="pet-status">{{ statusText }}</p>
      <div class="pet-roadmap">
        <span
          v-for="item in ['idle', 'thinking', 'typing', 'cheer', 'error']"
          :key="item"
          :class="['pet-node', { active: activeState === item }]"
        >
          {{ desktopPetAnimations[item as DesktopPetState].label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-pet-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pet-stage {
  position: relative;
  min-height: 240px;
  border-radius: 20px;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(255, 215, 230, 0.95), rgba(255, 240, 247, 0.92) 40%, rgba(255, 247, 251, 0.94) 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 247, 251, 0.96));
  border: 1px solid rgba(255, 174, 201, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 18px 42px rgba(255, 124, 167, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-glow {
  position: absolute;
  inset: auto 18px 16px;
  height: 28px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 151, 191, 0.26), rgba(255, 151, 191, 0));
  filter: blur(8px);
}

.pet-sprite {
  position: relative;
  z-index: 1;
  width: 196px;
  height: 196px;
  background-repeat: no-repeat;
  image-rendering: auto;
  filter: drop-shadow(0 16px 24px rgba(240, 102, 153, 0.16));
}

.pet-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pet-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.pet-pill,
.pet-mood {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
}

.pet-pill {
  color: #ff5f9c;
  background: rgba(255, 95, 156, 0.1);
  border: 1px solid rgba(255, 95, 156, 0.16);
}

.pet-mood {
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
}

.pet-status {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  min-height: 38px;
}

.pet-roadmap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pet-node {
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 10px;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.pet-node.active {
  color: #ff5f9c;
  border-color: rgba(255, 95, 156, 0.28);
  background: rgba(255, 95, 156, 0.08);
}
</style>
