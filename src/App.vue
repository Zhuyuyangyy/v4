<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
import GlobalCompanionPet from './components/tutor/GlobalCompanionPet.vue'
import NewUserPetGuide from './components/tutor/NewUserPetGuide.vue'
import { useAppStore } from '@/store'

const showScanLine = ref(true)
const appStore = useAppStore()
const route = useRoute()
const isAuthShellPage = computed(() => route.path === '/login' || route.path === '/admin')
const showCompanionPet = computed(() => appStore.desktopPetEnabled && route.path !== '/edu-mind' && !isAuthShellPage.value)
</script>

<template>
  <div :class="['app-wrapper', { 'scan-effect': showScanLine }]">
    <AppLayout />
    <GlobalCompanionPet v-if="showCompanionPet" />
    <NewUserPetGuide v-if="!isAuthShellPage" />
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
}

:global(html.new-user-guide-open),
:global(html.new-user-guide-open body) {
  overflow: hidden;
}
</style>
