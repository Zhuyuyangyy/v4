import { ref } from 'vue'

type ThemeMode = 'light' | 'dark' | 'auto'

// edu-mind 页面仅保留深色模式，isDark 始终为 true
const themeMode = ref<ThemeMode>('dark')
const isDark = ref<boolean>(true)

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

/**
 * EduMind 页面挂载时调用。把 html.dark class 挂上去，
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
  // edu-mind 仅深色模式，setTheme / toggleTheme 保留签名但为空操作
  const setTheme = (_mode: ThemeMode) => {}
  const toggleTheme = () => {}

  return {
    themeMode,
    isDark,
    setTheme,
    toggleTheme,
  }
}
