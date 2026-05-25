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
const idleSince = ref(Date.now())

let frameTimer: ReturnType<typeof setInterval> | null = null
let ambientTimer: ReturnType<typeof setTimeout> | null = null
let sequenceId = 0

const resolvedAnimation = computed(() => resolveDesktopPetAnimation(activeState.value))
const stateMeta = computed(() => desktopPetAnimations[activeState.value])
const moodText = computed(() => {
  switch (props.currentMood) {
    case 'positive':
      return '阳光满满'
    case 'frustrated':
      return '温柔安抚'
    case 'anxious':
      return '专注陪伴'
    default:
      return '静静陪伴'
  }
})

const moodIcon = computed(() => {
  switch (props.currentMood) {
    case 'positive': return '🌻'
    case 'frustrated': return '🌧'
    case 'anxious': return '⚡'
    default: return '☀'
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

const stateColorMap: Record<DesktopPetState, string> = {
  idle: '#fbbf24',
  blink: '#fbbf24',
  walk: '#f59e0b',
  run: '#f97316',
  sit: '#d97706',
  sleep: '#92400e',
  wake: '#fbbf24',
  thinking: '#60a5fa',
  typing: '#34d399',
  cheer: '#f472b6',
  error: '#f87171',
}

const activeColor = computed(() => stateColorMap[activeState.value] || '#fbbf24')

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

  const idleDuration = Date.now() - idleSince.value
  let nextAmbientState: DesktopPetState
  let delay: number

  if (idleDuration > 120000) {
    nextAmbientState = 'sleep'
    delay = 6000 + Math.round(Math.random() * 3000)
  } else if (idleDuration > 60000) {
    nextAmbientState = 'sit'
    delay = 8000 + Math.round(Math.random() * 4000)
  } else {
    const roll = Math.random()
    if (roll > 0.7) {
      nextAmbientState = 'walk'
    } else if (roll > 0.4) {
      nextAmbientState = 'blink'
    } else {
      nextAmbientState = 'idle'
    }
    delay = 9000 + Math.round(Math.random() * 4000)
  }

  ambientTimer = setTimeout(() => {
    if (props.isAsking) return

    void playSequence([nextAmbientState], nextAmbientState === 'sleep' || nextAmbientState === 'sit' ? nextAmbientState : 'idle')
  }, delay)
}

watch(
  () => props.isAsking,
  isAsking => {
    if (isAsking) {
      idleSince.value = Date.now()
      statusText.value = props.draftQuestion?.trim()
        ? `收到问题：${props.draftQuestion.trim().slice(0, 22)}`
        : '收到新问题，开始进入思考流程。'
      void playSequence(['wake', 'thinking'], 'typing')
      return
    }

    idleSince.value = Date.now()
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
  <div class="desktop-pet-card" :style="{ '--pet-clr': activeColor }">
    <div class="pet-stage">
      <div class="pet-sun-rays" />
      <div class="pet-sprite" :style="frameStyle" />
      <div class="pet-ground" />
    </div>

    <div class="pet-meta">
      <div class="pet-meta-row">
        <span class="pet-pill">{{ stateMeta.label }}</span>
        <span class="pet-mood">{{ moodIcon }} {{ moodText }}</span>
      </div>
      <p class="pet-status">{{ statusText }}</p>
      <div class="pet-roadmap">
        <span
          v-for="item in ['idle', 'thinking', 'typing', 'cheer', 'error', 'sleep']"
          :key="item"
          :class="['pet-node', { active: activeState === item }]"
          :style="activeState === item ? { '--n-clr': stateColorMap[item] } : {}"
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
  gap: 12px;
}

.pet-stage {
  position: relative;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 50% at 50% 40%, rgba(251, 191, 36, 0.08), transparent),
    radial-gradient(ellipse 60% 40% at 30% 30%, rgba(245, 158, 11, 0.06), transparent),
    linear-gradient(180deg, rgba(18, 22, 48, 0.95), rgba(12, 12, 26, 0.98));
  border: 1px solid rgba(251, 191, 36, 0.15);
  box-shadow:
    inset 0 1px 0 rgba(251, 191, 36, 0.08),
    0 12px 32px rgba(0, 0, 0, 0.3),
    0 0 48px rgba(251, 191, 36, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-sun-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -55%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.04) 40%, transparent 70%);
  animation: sun-pulse 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sun-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -55%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -55%) scale(1.08); }
}

.pet-sprite {
  position: relative;
  z-index: 1;
  width: 180px;
  height: 180px;
  background-repeat: no-repeat;
  image-rendering: auto;
  filter: drop-shadow(0 8px 20px rgba(251, 191, 36, 0.15));
  transition: filter 0.3s ease;
}

.pet-ground {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(251, 191, 36, 0.12), transparent);
  filter: blur(6px);
  pointer-events: none;
}

.pet-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
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
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 999px;
}

.pet-pill {
  color: var(--pet-clr);
  background: color-mix(in srgb, var(--pet-clr) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--pet-clr) 20%, transparent);
  transition: all 0.3s ease;
}

.pet-mood {
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-size: 10px;
}

.pet-status {
  margin: 0;
  font-size: 11px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  min-height: 32px;
}

.pet-roadmap {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pet-node {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  transition: all 0.25s ease;
}

.pet-node.active {
  color: var(--n-clr, #fbbf24);
  border-color: color-mix(in srgb, var(--n-clr, #fbbf24) 30%, transparent);
  background: color-mix(in srgb, var(--n-clr, #fbbf24) 8%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--n-clr, #fbbf24) 10%, transparent);
}
</style>
