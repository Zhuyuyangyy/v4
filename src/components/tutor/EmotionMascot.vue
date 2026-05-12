<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Sparkles, Smile, Frown, AlertCircle, Heart } from 'lucide-vue-next'
import { useEmotionStore, encouragements } from '@/store/emotion'

const emotion = useEmotionStore()
const showMessage = ref(false)
const currentMessage = ref('')
const dismissable = ref(false)

const moodIcon = computed(() => {
  switch (emotion.currentMood) {
    case 'positive': return Sparkles
    case 'frustrated': return Frown
    case 'anxious': return AlertCircle
    default: return Smile
  }
})

const moodColor = computed(() => {
  switch (emotion.currentMood) {
    case 'positive': return '#06d6a0'
    case 'frustrated': return '#f43f5e'
    case 'anxious': return '#f59e0b'
    default: return '#00d4ff'
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

  // Auto dismiss after 8 seconds
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
  <div class="emotion-mascot">
    <!-- Encouragement Message -->
    <transition name="msg-pop">
      <div v-if="showMessage" class="em-msg" :style="{ '--m-clr': moodColor }" @click="dismiss">
        <div class="em-msg-icon"><Heart :size="14" stroke-width="2" :color="moodColor" /></div>
        <p class="em-msg-text">{{ currentMessage }}</p>
        <button v-if="dismissable" class="em-msg-close" @click.stop="dismiss">✕</button>
      </div>
    </transition>

    <!-- Mascot Icon -->
    <div class="em-icon" :style="{ '--m-clr': moodColor }">
      <component :is="moodIcon" :size="20" stroke-width="1.5" />
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

/* ── Mascot Icon ── */
.em-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1px solid color-mix(in srgb, var(--m-clr) 30%, transparent);
  color: var(--m-clr);
  box-shadow: 0 0 20px color-mix(in srgb, var(--m-clr) 10%, transparent);
  cursor: default;
  transition: all 0.3s var(--ease-out);
}

/* ── Message Card ── */
.em-msg {
  max-width: 300px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 14px 14px 4px 14px;
  background: var(--color-bg-card);
  border: 1px solid color-mix(in srgb, var(--m-clr) 15%, var(--color-border));
  cursor: pointer;
  position: relative;
}

.em-msg-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.em-msg-text {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
}

.em-msg-close {
  position: absolute;
  top: 4px;
  right: 6px;
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
}
.em-msg:hover .em-msg-close { opacity: 1; }
.em-msg-close:hover { color: var(--color-text-primary); }

/* ── Transitions ── */
.msg-pop-enter-active {
  transition: all 0.3s var(--ease-out);
}
.msg-pop-leave-active {
  transition: all 0.2s var(--ease-in-out);
}
.msg-pop-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
.msg-pop-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.95);
}

/* ── Responsive ── */
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
