import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

const themeMode = ref<ThemeMode>((() => {
  const saved = localStorage.getItem('edumind_theme_mode')
  if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved
  return 'light'
})())

const isDark = ref<boolean>(themeMode.value === 'dark')

const applyTheme = () => {
  let dark: boolean
  if (themeMode.value === 'auto') {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    dark = themeMode.value === 'dark'
  }
  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

watch(themeMode, (val) => {
  localStorage.setItem('edumind_theme_mode', val)
  applyTheme()
})

applyTheme()

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeMode.value === 'auto') applyTheme()
  })
}

export function useTheme() {
  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode
  }

  const toggleTheme = () => {
    themeMode.value = isDark.value ? 'light' : 'dark'
  }

  return {
    themeMode,
    isDark,
    setTheme,
    toggleTheme
  }
}
