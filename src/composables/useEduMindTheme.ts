import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

// 默认深色:仅对未在 localStorage 主动设置过的用户生效
const themeMode = ref<ThemeMode>((() => {
  const saved = localStorage.getItem('edumind_theme_mode')
  if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved
  return 'dark'
})())

const computeIsDark = (): boolean => {
  if (themeMode.value === 'auto') {
    return typeof window !== 'undefined'
      && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return themeMode.value === 'dark'
}

// isDark 始终反映"当前主题模式应该是不是 dark",与是否激活无关
const isDark = ref<boolean>(computeIsDark())

// 引用计数:多个 EduMind 实例同时挂载也能正确管理 html.dark
let activeCount = 0

const applyToHtml = () => {
  if (typeof document === 'undefined') return
  if (activeCount > 0 && isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const refreshTheme = () => {
  isDark.value = computeIsDark()
  applyToHtml()
}

watch(themeMode, (val) => {
  localStorage.setItem('edumind_theme_mode', val)
  refreshTheme()
})

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeMode.value === 'auto') refreshTheme()
  })
}

/**
 * EduMind 页面挂载时调用。把 html.dark class 挂上去(如果当前是 dark 模式),
 * 让 Tailwind dark: 工具类和全局 override 生效。
 */
export function activateEduMindTheme() {
  activeCount += 1
  applyToHtml()
}

/**
 * EduMind 页面卸载时调用。撤销 html.dark class,避免污染其他路由页面。
 */
export function deactivateEduMindTheme() {
  activeCount = Math.max(0, activeCount - 1)
  applyToHtml()
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
    toggleTheme,
  }
}
