<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { resolveDesktopPetAnimation } from '@/config/desktopPet'
import { useAppStore, type CompanionState } from '@/store'
import { sendChatMessage } from '@/lib/api'
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

/* ── Chat panel state ── */
const showChat = ref(false)
const chatMessages = ref<{ role: 'user' | 'assistant'; text: string }[]>([])
const chatInput = ref('')
const isChatSending = ref(false)
const chatPanelRef = ref<HTMLElement | null>(null)
const chatInputRef = ref<HTMLInputElement | null>(null)

function toggleChat() {
  showChat.value = !showChat.value
  if (showChat.value && chatMessages.value.length === 0) {
    chatMessages.value.push({
      role: 'assistant',
      text: '你好！我是你的学习伙伴，有什么问题可以问我~',
    })
  }
  if (showChat.value) {
    nextTick(() => chatInputRef.value?.focus())
  }
}

async function sendChat() {
  const text = chatInput.value.trim()
  if (!text || isChatSending.value) return

  chatMessages.value.push({ role: 'user', text })
  chatInput.value = ''
  isChatSending.value = true
  interactionState.value = 'thinking'
  playCurrentState()

  try {
    const reply = await sendChatMessage(text)
    const content = reply.content ?? '抱歉，我暂时无法回答这个问题。'
    chatMessages.value.push({ role: 'assistant', text: content })
    interactionState.value = 'cheer'
  } catch {
    chatMessages.value.push({ role: 'assistant', text: '网络似乎有点问题，稍后再试试吧~' })
    interactionState.value = 'error'
  } finally {
    isChatSending.value = false
    playCurrentState()
    setTimeout(() => {
      interactionState.value = null
      playCurrentState()
    }, 1200)
    nextTick(() => {
      if (chatPanelRef.value) chatPanelRef.value.scrollTop = chatPanelRef.value.scrollHeight
    })
  }
}

/* ── Pet animation state ── */
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

/* Chat panel position: always above the pet */
const chatPanelStyle = computed(() => {
  const metrics = getPetMetrics()
  const petOnLeft = position.value.x < window.innerWidth / 2
  return {
    bottom: `${window.innerHeight - position.value.y + 8}px`,
    ...(petOnLeft
      ? { left: `${position.value.x}px` }
      : { right: `${window.innerWidth - position.value.x - metrics.width}px` }),
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
    toggleChat()
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
  <!-- Chat panel (above pet) -->
  <transition name="chat-pop">
    <div v-if="showChat" class="pet-chat-panel" :style="chatPanelStyle" @pointerdown.stop>
      <div class="chat-panel-header">
        <span class="chat-panel-title">学习助手</span>
        <button class="chat-panel-close" type="button" @click="showChat = false">✕</button>
      </div>
      <div ref="chatPanelRef" class="chat-panel-body">
        <div v-for="(msg, i) in chatMessages" :key="i" :class="['chat-msg', msg.role]">
          <div class="chat-msg-bubble">{{ msg.text }}</div>
        </div>
        <div v-if="isChatSending" class="chat-msg assistant">
          <div class="chat-msg-bubble typing-dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
      <div class="chat-panel-input">
        <input
          ref="chatInputRef"
          v-model="chatInput"
          type="text"
          placeholder="问我任何学习问题..."
          :disabled="isChatSending"
          @keydown.enter="sendChat"
        />
        <button type="button" class="chat-send-btn" :disabled="isChatSending || !chatInput.trim()" @click="sendChat">
          ↑
        </button>
      </div>
    </div>
  </transition>

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

/* ── Chat panel ── */
.pet-chat-panel {
  position: fixed;
  z-index: 41;
  width: 340px;
  max-width: calc(100vw - 32px);
  border-radius: 16px;
  background: rgba(10, 14, 39, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 0 0 1px rgba(0, 212, 255, 0.04);
  backdrop-filter: blur(30px) saturate(1.3);
  -webkit-backdrop-filter: blur(30px) saturate(1.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pet-chat-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.6;
}

.chat-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.chat-panel-title {
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.chat-panel-close {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.chat-panel-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.chat-panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 14px;
  max-height: 320px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-panel-body::-webkit-scrollbar {
  width: 3px;
}

.chat-panel-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.chat-msg {
  display: flex;
}

.chat-msg.user {
  justify-content: flex-end;
}

.chat-msg.assistant {
  justify-content: flex-start;
}

.chat-msg-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.6;
  word-break: break-word;
}

.chat-msg.user .chat-msg-bubble {
  background: rgba(0, 212, 255, 0.15);
  color: #e0f4ff;
  border-bottom-right-radius: 4px;
}

.chat-msg.assistant .chat-msg-bubble {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  border-bottom-left-radius: 4px;
}

.typing-dots {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
}

.typing-dots span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.6);
  animation: dot-bounce 1.2s ease-in-out infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.15s; }
.typing-dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes dot-bounce {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-4px); }
}

.chat-panel-input {
  display: flex;
  gap: 6px;
  padding: 10px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.chat-panel-input input {
  flex: 1;
  min-width: 0;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-panel-input input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.chat-panel-input input:focus {
  border-color: rgba(0, 212, 255, 0.3);
}

.chat-send-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}

.chat-send-btn:hover:not(:disabled) {
  background: rgba(0, 212, 255, 0.2);
}

.chat-send-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Chat panel transition */
.chat-pop-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.chat-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.chat-pop-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

.chat-pop-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
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
  .pet-chat-panel {
    width: 290px;
  }
}
</style>
