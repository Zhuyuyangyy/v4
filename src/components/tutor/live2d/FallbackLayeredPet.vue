<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  shellStyle: CSSProperties
  shadowStyle: CSSProperties
  bodyStyle: CSSProperties
  headStyle: CSSProperties
  eyesStyle: CSSProperties
  frontHairStyle: CSSProperties
  dragging?: boolean
}>()
</script>

<template>
  <div class="pet-shell-core">
    <div class="pet-shadow-layer" :style="shadowStyle" />
    <div class="pet-stage" :style="shellStyle">
      <div class="pet-layer pet-body-layer" :style="bodyStyle" />
      <div class="pet-layer pet-head-layer" :style="headStyle" />
      <div class="pet-layer pet-eyes-layer" :style="eyesStyle" />
      <div class="pet-layer pet-front-hair-layer" :style="frontHairStyle" />
    </div>
  </div>
</template>

<style scoped>
.pet-shell-core {
  position: relative;
  width: 100%;
  height: 100%;
}

.pet-stage,
.pet-layer,
.pet-shadow-layer {
  position: absolute;
  inset: 0;
}

.pet-stage {
  transform-origin: center bottom;
  will-change: transform;
}

.pet-layer,
.pet-shadow-layer {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform-origin: 50% 42%;
  transition: transform 150ms ease-out;
  will-change: transform;
}

.pet-shadow-layer {
  background-image: url('/desktop-pet/layered/shadow.png');
  transform-origin: 50% 88%;
}

.pet-body-layer {
  background-image: url('/desktop-pet/layered/body.png');
  transform-origin: 50% 58%;
  animation: pet-breathe 4.6s ease-in-out infinite;
}

.pet-head-layer {
  background-image: url('/desktop-pet/layered/head.png');
}

.pet-eyes-layer {
  background-image: url('/desktop-pet/layered/eyes.png');
  transform-origin: 50% 37%;
}

.pet-front-hair-layer {
  background-image: url('/desktop-pet/layered/frontHair.png');
}

@keyframes pet-breathe {
  0%,
  100% {
    transform: translateY(0) scaleY(1);
  }

  50% {
    transform: translateY(-2px) scaleY(1.015);
  }
}
</style>
