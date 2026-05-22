<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'
import GlobalCompanionPet from './components/tutor/GlobalCompanionPet.vue'
import { useAppStore } from '@/store'

const showScanLine = ref(true)
const appStore = useAppStore()
</script>

<template>
  <div :class="['app-wrapper', { 'scan-effect': showScanLine }]">
    <AppLayout />
    <GlobalCompanionPet v-if="appStore.desktopPetEnabled" />
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  z-index: 1;
}
</style>
