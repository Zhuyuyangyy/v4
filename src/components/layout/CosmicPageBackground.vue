<script setup lang="ts">
import ThreeParticleBackground from '@/components/homepage/ThreeParticleBackground.vue'

withDefaults(defineProps<{
  variant?: 'cosmic' | 'genre'
}>(), {
  variant: 'cosmic',
})
</script>

<template>
  <div class="cosmos-bg" :class="`variant-${variant}`" aria-hidden="true">
    <ThreeParticleBackground :variant="variant" />
    <div class="cosmos-vignette" />
  </div>
</template>

<style scoped>
.cosmos-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.cosmos-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(2, 4, 12, 0.28) 0%, transparent 34%, rgba(2, 4, 12, 0.08) 100%),
    radial-gradient(ellipse at center, transparent 40%, rgba(3, 4, 12, 0.34) 100%);
}

.variant-genre .cosmos-vignette {
  background:
    linear-gradient(180deg, rgba(42, 14, 5, 0.18) 0%, transparent 24%, rgba(2, 6, 14, 0.18) 100%),
    radial-gradient(ellipse 1100px 620px at 58% 44%, transparent 0 42%, rgba(0, 4, 12, 0.24) 84%),
    linear-gradient(90deg, rgba(0, 0, 0, 0.22), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.16));
}
</style>
