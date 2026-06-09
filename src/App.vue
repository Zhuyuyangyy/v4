<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
import GlobalCompanionPet from './components/tutor/GlobalCompanionPet.vue'
import { useAppStore } from '@/store'

const showScanLine = ref(true)
const appStore = useAppStore()
const route = useRoute()
const showCompanionPet = computed(() => appStore.desktopPetEnabled && route.path !== '/edu-mind')
</script>

<template>
  <div :class="['app-wrapper', { 'scan-effect': showScanLine }]">
    <AppLayout />
    <GlobalCompanionPet v-if="showCompanionPet" />
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
}
</style>
