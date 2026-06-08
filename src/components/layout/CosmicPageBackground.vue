<script setup lang="ts">
import ThreeParticleBackground from '@/components/homepage/ThreeParticleBackground.vue'
</script>

<template>
  <div class="cosmos-bg" aria-hidden="true">
    <ThreeParticleBackground />
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
</style>
