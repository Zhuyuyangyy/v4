<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { resolveDesktopPetAnimation } from '@/config/desktopPet'
import { useAppStore, type CompanionState } from '@/store'
import AiriLive2DRenderer from './live2d/AiriLive2DRenderer.vue'

const appStore = useAppStore()

const useLive2D = ref(true)
const live2dReady = ref(false)
const live2dError = ref<Error | null>(null)

const frameIndex = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const isSnapping = ref(false)
const interactionState = ref<CompanionState | null>(null)
const movementDirection = ref(1)
const targetLook = ref({ x: 0, y: 0 })
const currentLook = ref({ x: 0, y: 0 })

let frameTimer: ReturnType<typeof setInterval> | null = null
let dragPointerId: number | null = null
let dragOffsetX = 0
let dragOffsetY = 0
let pointerStartX = 0
let pointerStartY = 0
let draggedDistance = 0
let interactionTimer: ReturnType<typeof setTimeout> | null = null
let snapTimer: ReturnType<typeof setTimeout> | null = null
let lookAnimationId: number | null = null

const PET_POSITION_KEY = 'global-companion-pet-position'
const DRAG_THRESHOLD = 8
const LOOK_RANGE_X = 220
const LOOK_RANGE_Y = 180
const LOOK_ACTIVE_DISTANCE = 360
const LOOK_OFFSET_X = 9
const LOOK_OFFSET_Y = 6
const LOOK_ROTATION = 7
const LOOK_LERP = 0.18

const stateMap: Record<CompanionState, 'idle' | 'thinking' | 'typing' | 'cheer' | 'error'> = {
  idle: 'idle',
  thinking: 'thinking',
  typing: 'typing',
  cheer: 'cheer',
  error: 'error',
}

const displayState = computed<CompanionState>(() => interactionState.value ?? appStore.companionState)
const animationState = computed(() => {
  if (isDragging.value || isSnapping.value) return 'walk'
  return stateMap[displayState.value]
})
const activeAnimation = computed(() => resolveDesktopPetAnimation(animationState.value))

const frameStyle = computed(() => {
  const animation = activeAnimation.value
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

const petStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
}))

const live2dFocus = computed(() => ({
  x: currentLook.value.x * getPetMetrics().width * 0.42,
  y: currentLook.value.y * getPetMetrics().height * 0.28,
}))

const spriteStyle = computed(() => {
  const lookX = currentLook.value.x
  const lookY = currentLook.value.y
  const tilt = isDragging.value ? movementDirection.value * 6 : lookX * LOOK_ROTATION
  const translateX = lookX * LOOK_OFFSET_X
  const translateY = lookY * LOOK_OFFSET_Y
  const scaleY = 1 - Math.abs(lookY) * 0.015

  return {
    ...frameStyle.value,
    transform: `translate(${translateX}px, ${translateY}px) scaleX(${movementDirection.value}) scaleY(${scaleY}) rotate(${tilt}deg)`,
    transformOrigin: 'center bottom',
  }
})

function stopFrameTimer() {
  if (!frameTimer) return
  clearInterval(frameTimer)
  frameTimer = null
}

function stopInteractionTimer() {
  if (!interactionTimer) return
  clearTimeout(interactionTimer)
  interactionTimer = null
}

function stopSnapTimer() {
  if (!snapTimer) return
  clearTimeout(snapTimer)
  snapTimer = null
}

function stopLookAnimation() {
  if (lookAnimationId === null) return
  cancelAnimationFrame(lookAnimationId)
  lookAnimationId = null
}

function playCurrentState() {
  stopFrameTimer()
  frameIndex.value = 0

  const animation = activeAnimation.value

  frameTimer = setInterval(() => {
    if (animation.loop) {
      frameIndex.value = (frameIndex.value + 1) % animation.frames
      return
    }

    if (frameIndex.value >= animation.frames - 1) {
      stopFrameTimer()
      return
    }

    frameIndex.value += 1
  }, Math.round(1000 / animation.fps))
}

function animateLook() {
  currentLook.value = {
    x: currentLook.value.x + (targetLook.value.x - currentLook.value.x) * LOOK_LERP,
    y: currentLook.value.y + (targetLook.value.y - currentLook.value.y) * LOOK_LERP,
  }

  lookAnimationId = requestAnimationFrame(animateLook)
}

function getPetMetrics() {
  const compact = window.innerWidth <= 900
  return {
    width: compact ? 150 : 220,
    height: compact ? 210 : 300,
  }
}

function getDefaultPosition() {
  const metrics = getPetMetrics()
  return {
    x: Math.max(16, window.innerWidth - metrics.width - 24),
    y: Math.max(72, window.innerHeight - metrics.height - 24),
  }
}

function clampPosition(nextX: number, nextY: number) {
  const metrics = getPetMetrics()
  const maxX = Math.max(16, window.innerWidth - metrics.width - 8)
  const maxY = Math.max(72, window.innerHeight - metrics.height - 8)

  return {
    x: Math.min(Math.max(8, nextX), maxX),
    y: Math.min(Math.max(72, nextY), maxY),
  }
}

function persistPosition() {
  window.localStorage.setItem(PET_POSITION_KEY, JSON.stringify(position.value))
}

function restorePosition() {
  const fallback = getDefaultPosition()

  try {
    const raw = window.localStorage.getItem(PET_POSITION_KEY)
    if (!raw) {
      position.value = fallback
      return
    }

    const parsed = JSON.parse(raw) as { x?: number; y?: number }
    if (typeof parsed.x !== 'number' || typeof parsed.y !== 'number') {
      position.value = fallback
      return
    }

    position.value = clampPosition(parsed.x, parsed.y)
  } catch {
    position.value = fallback
  }
}

function clampLook(value: number) {
  return Math.min(1, Math.max(-1, value))
}

function updateLookTarget(clientX: number, clientY: number) {
  if (isDragging.value) {
    targetLook.value = { x: 0, y: 0 }
    return
  }

  const metrics = getPetMetrics()
  const centerX = position.value.x + metrics.width / 2
  const centerY = position.value.y + metrics.height * 0.38
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  const distance = Math.hypot(deltaX, deltaY)

  if (distance > LOOK_ACTIVE_DISTANCE) {
    targetLook.value = { x: 0, y: 0 }
    return
  }

  targetLook.value = {
    x: clampLook(deltaX / LOOK_RANGE_X),
    y: clampLook(deltaY / LOOK_RANGE_Y),
  }
}

function snapToEdge() {
  const metrics = getPetMetrics()
  const midpoint = window.innerWidth / 2
  const snapX = position.value.x + metrics.width / 2 < midpoint
    ? 8
    : Math.max(8, window.innerWidth - metrics.width - 8)

  movementDirection.value = snapX <= 8 ? 1 : -1
  isSnapping.value = true
  position.value = clampPosition(snapX, position.value.y)
  stopSnapTimer()
  snapTimer = window.setTimeout(() => {
    isSnapping.value = false
    playCurrentState()
    snapTimer = null
  }, 220)
}

function triggerInteraction() {
  stopInteractionTimer()
  interactionState.value = 'cheer'
  playCurrentState()
  interactionTimer = window.setTimeout(() => {
    interactionState.value = null
    playCurrentState()
    interactionTimer = null
  }, 1200)
}

function handlePointerMove(event: PointerEvent) {
  updateLookTarget(event.clientX, event.clientY)

  if (dragPointerId !== event.pointerId) return

  const deltaX = event.clientX - pointerStartX
  const deltaY = event.clientY - pointerStartY
  draggedDistance = Math.max(draggedDistance, Math.hypot(deltaX, deltaY))

  if (!isDragging.value && draggedDistance >= DRAG_THRESHOLD) {
    isDragging.value = true
    isSnapping.value = false
    stopSnapTimer()
    playCurrentState()
  }

  if (!isDragging.value) return

  movementDirection.value = event.movementX < 0 ? -1 : event.movementX > 0 ? 1 : movementDirection.value
  position.value = clampPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY)
}

function endDrag(event?: PointerEvent) {
  if (event && dragPointerId !== event.pointerId) return

  const wasDragging = isDragging.value
  isDragging.value = false
  dragPointerId = null
  draggedDistance = 0
  targetLook.value = { x: 0, y: 0 }

  if (wasDragging) {
    snapToEdge()
    playCurrentState()
  } else if (displayState.value === 'idle') {
    triggerInteraction()
  }

  persistPosition()
}

function startDrag(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement | null
  if (!target) return

  dragPointerId = event.pointerId
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  draggedDistance = 0
  isDragging.value = false

  const rect = target.getBoundingClientRect()
  dragOffsetX = event.clientX - rect.left
  dragOffsetY = event.clientY - rect.top

  target.setPointerCapture(event.pointerId)
}

function handleResize() {
  position.value = clampPosition(position.value.x, position.value.y)
  persistPosition()
}

function onLive2DError(error: Error) {
  console.warn('[GlobalCompanionPet] Live2D renderer failed:', error.message)
  live2dError.value = error
}

watch(
  () => animationState.value,
  () => {
    playCurrentState()
  },
)

onMounted(() => {
  restorePosition()
  playCurrentState()
  animateLook()
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', endDrag)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  stopFrameTimer()
  stopInteractionTimer()
  stopSnapTimer()
  stopLookAnimation()
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', endDrag)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="global-pet" :class="{ dragging: isDragging, snapping: isSnapping }" :style="petStyle" @pointerdown="startDrag">
    <div v-if="useLive2D" class="global-pet-live2d">
      <AiriLive2DRenderer
        :state="displayState"
        :width="220"
        :height="300"
        :focus-at="live2dFocus"
        @ready="live2dReady = true; live2dError = null"
        @error="onLive2DError"
      />
    </div>
    <template v-else-if="!live2dError">
      <div class="global-pet-aura" />
      <div class="global-pet-sprite" :style="spriteStyle" />
    </template>
  </div>
</template>

<style scoped>
.global-pet {
  position: fixed;
  z-index: 40;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  user-select: none;
  touch-action: none;
}

.global-pet-live2d {
  position: relative;
  width: 220px;
  height: 300px;
  pointer-events: auto;
}

.global-pet-aura {
  position: absolute;
  bottom: 12px;
  width: 88px;
  height: 22px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0));
  filter: blur(12px);
  animation: aura-glow 3s ease-in-out infinite;
}

@keyframes aura-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.global-pet-sprite {
  position: relative;
  z-index: 1;
  width: 112px;
  height: 112px;
  background-repeat: no-repeat;
  transition: transform 160ms ease-out;
  filter:
    drop-shadow(0 12px 22px rgba(251, 191, 36, 0.2))
    drop-shadow(0 2px 8px rgba(255, 255, 255, 0.15));
  cursor: grab;
}

.global-pet.dragging .global-pet-sprite {
  cursor: grabbing;
}

.global-pet.snapping {
  transition:
    left 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    top 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (max-width: 900px) {
  .global-pet-live2d {
    width: 150px;
    height: 210px;
  }
  .global-pet-sprite {
    width: 92px;
    height: 92px;
  }
  .global-pet-aura {
    width: 72px;
  }
}
</style>
