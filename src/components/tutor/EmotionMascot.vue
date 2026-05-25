<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useEmotionStore, encouragements } from '@/store/emotion'

const emotion = useEmotionStore()
const showMessage = ref(false)
const currentMessage = ref('')
const dismissable = ref(false)

const moodEmoji = computed(() => {
  switch (emotion.currentMood) {
    case 'positive': return '🌻'
    case 'frustrated': return '🌧️'
    case 'anxious': return '⚡'
    default: return '☀️'
  }
})

const moodLabel = computed(() => {
  switch (emotion.currentMood) {
    case 'positive': return '阳光满满'
    case 'frustrated': return '需要关怀'
    case 'anxious': return '专注突破'
    default: return '静静陪伴'
  }
})

const moodColor = computed(() => {
  switch (emotion.currentMood) {
    case 'positive': return '#fbbf24'
    case 'frustrated': return '#f87171'
    case 'anxious': return '#f59e0b'
    default: return '#fbbf24'
  }
})

let timeoutId: ReturnType<typeof setTimeout> | null = null

function showEncouragement() {
  if (timeoutId) clearTimeout(timeoutId)
  const msg = encouragements[Math.floor(Math.random() * encouragements.length)]
  currentMessage.value = msg
  showMessage.value = true
  dismissable.value = false
  emotion.markEncouraged()

  timeoutId = setTimeout(() => {
    dismissable.value = true
  }, 8000)
}

watch(() => emotion.shouldEncourage, (val) => {
  if (val) showEncouragement()
})

function dismiss() {
  if (!dismissable.value) return
  showMessage.value = false
  currentMessage.value = ''
}
</script>

<template>
  <div class="emotion-mascot" :style="{ '--m-clr': moodColor }">
    <transition name="msg-pop">
      <div v-if="showMessage" class="em-msg" @click="dismiss">
        <div class="em-msg-icon">🌻</div>
        <p class="em-msg-text">{{ currentMessage }}</p>
        <button v-if="dismissable" class="em-msg-close" @click.stop="dismiss">✕</button>
      </div>
    </transition>

    <div class="em-sunflower">
      <div class="em-glow" />
      <span class="em-emoji">{{ moodEmoji }}</span>
      <span class="em-mood-label">{{ moodLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.emotion-mascot {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.em-sunflower {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(18, 22, 48, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, var(--m-clr) 20%, var(--color-border));
  box-shadow:
    0 0 20px color-mix(in srgb, var(--m-clr) 8%, transparent),
    0 8px 24px rgba(0, 0, 0, 0.25);
  cursor: default;
  transition: all 0.3s var(--ease-out);
}

.em-sunflower:hover {
  border-color: color-mix(in srgb, var(--m-clr) 35%, var(--color-border));
  box-shadow:
    0 0 32px color-mix(in srgb, var(--m-clr) 14%, transparent),
    0 12px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.em-glow {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--m-clr) 20%, transparent), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
}

.em-emoji {
  font-size: 28px;
  line-height: 1;
  filter: drop-shadow(0 2px 8px rgba(251, 191, 36, 0.25));
}

.em-mood-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--m-clr);
  letter-spacing: 0.06em;
  white-space: nowrap;
  text-shadow: 0 0 12px color-mix(in srgb, var(--m-clr) 30%, transparent);
}

.em-msg {
  max-width: 300px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 16px 16px 4px 16px;
  background: rgba(18, 22, 48, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, var(--m-clr) 15%, var(--color-border));
  box-shadow:
    0 0 16px color-mix(in srgb, var(--m-clr) 6%, transparent),
    0 8px 24px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  position: relative;
}

.em-msg-icon {
  flex-shrink: 0;
  font-size: 16px;
  margin-top: 1px;
}

.em-msg-text {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
}

.em-msg-close {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 10px;
  color: var(--color-text-tertiary);
  opacity: 0;
  transition: opacity 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}
.em-msg:hover .em-msg-close { opacity: 1; }
.em-msg-close:hover { color: var(--color-text-primary); }

.msg-pop-enter-active {
  transition: all 0.35s var(--ease-out);
}
.msg-pop-leave-active {
  transition: all 0.2s var(--ease-in-out);
}
.msg-pop-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.92);
}
.msg-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.92);
}

@media (max-width: 900px) {
  .emotion-mascot {
    right: 16px;
    bottom: 90px;
  }
  .em-msg {
    max-width: 240px;
  }
}
</style>
