import { defineStore } from 'pinia'
import { ref } from 'vue'

const APP_SETTINGS_KEY = 'app-settings'
const COMPANION_RESET_MS: Record<Exclude<CompanionState, 'idle'>, number> = {
  thinking: 900,
  typing: 1200,
  cheer: 1400,
  error: 1600,
}

export type CompanionState = 'idle' | 'thinking' | 'typing' | 'cheer' | 'error'

export const useAppStore = defineStore('app', () => {
  const currentTheme = ref('dark')
  const desktopPetEnabled = ref(true)
  const companionState = ref<CompanionState>('idle')
  const activeAiRequests = ref(0)
  let companionTimeout: ReturnType<typeof setTimeout> | null = null

  function loadSettings() {
    if (typeof window === 'undefined') return

    try {
      const raw = window.localStorage.getItem(APP_SETTINGS_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as {
        desktopPetEnabled?: boolean
        currentTheme?: string
      }
      if (typeof parsed.desktopPetEnabled === 'boolean') {
        desktopPetEnabled.value = parsed.desktopPetEnabled
      }
      if (typeof parsed.currentTheme === 'string') {
        currentTheme.value = parsed.currentTheme
      }
    } catch {
      // Ignore invalid local storage payloads and use defaults.
    }
  }

  function persistSettings() {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(
      APP_SETTINGS_KEY,
      JSON.stringify({
        currentTheme: currentTheme.value,
        desktopPetEnabled: desktopPetEnabled.value,
      }),
    )
  }

  function setDesktopPetEnabled(enabled: boolean) {
    desktopPetEnabled.value = enabled
    persistSettings()
  }

  function setTheme(theme: string) {
    currentTheme.value = theme
    persistSettings()
  }

  function clearCompanionTimeout() {
    if (!companionTimeout) return
    clearTimeout(companionTimeout)
    companionTimeout = null
  }

  function setCompanionIdle() {
    clearCompanionTimeout()
    companionState.value = 'idle'
  }

  function pulseCompanion(state: Exclude<CompanionState, 'idle'>, duration = COMPANION_RESET_MS[state]) {
    if (!desktopPetEnabled.value) return
    if (activeAiRequests.value > 0 && state === 'thinking') return

    clearCompanionTimeout()
    companionState.value = state
    companionTimeout = setTimeout(() => {
      companionState.value = activeAiRequests.value > 0 ? 'typing' : 'idle'
      companionTimeout = null
    }, duration)
  }

  function triggerPageLoading() {
    pulseCompanion('thinking')
  }

  function beginAiRequest() {
    if (!desktopPetEnabled.value) return

    activeAiRequests.value += 1
    clearCompanionTimeout()
    companionState.value = 'typing'
  }

  function finishAiRequest(success: boolean) {
    activeAiRequests.value = Math.max(0, activeAiRequests.value - 1)
    pulseCompanion(success ? 'cheer' : 'error')
  }

  loadSettings()

  return {
    currentTheme,
    desktopPetEnabled,
    companionState,
    activeAiRequests,
    setDesktopPetEnabled,
    setTheme,
    setCompanionIdle,
    triggerPageLoading,
    beginAiRequest,
    finishAiRequest,
  }
})
