<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'

const showScanLine = ref(true)
</script>

<template>
  <div :class="['app-wrapper', { 'scan-effect': showScanLine }]">
    <AppLayout />
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  z-index: 1;
}
</style>
