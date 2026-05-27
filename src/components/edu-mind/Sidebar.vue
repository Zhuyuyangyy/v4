<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  PlaySquare,
  Folder,
  CheckSquare,
  Network,
  History,
  Star,
  FileText
} from 'lucide-vue-next'
import { useTheme } from '../../composables/useEduMindTheme'

const { isDark, toggleTheme } = useTheme()

const props = defineProps<{
  weeklyHours: number
  goalHours: number
  currentTab: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  tabChange: [tabName: string]
  close: []
}>()

const percentage = computed(() =>
  Math.min(Math.round((props.weeklyHours / props.goalHours) * 100), 100)
)

const progressWidth = ref(0)

watch(
  percentage,
  (val) => {
    requestAnimationFrame(() => {
      progressWidth.value = val
    })
  },
  { immediate: true }
)

const menuItems = [
  { name: '课程', icon: PlaySquare },
  { name: '资源中心', icon: Folder },
  { name: '练习中心', icon: CheckSquare },
  { name: '思维导图', icon: Network },
  { name: '学习记录', icon: History },
  { name: '收藏夹', icon: Star },
  { name: '笔记', icon: FileText }
]

function handleNavClick(itemName: string) {
  emit('tabChange', itemName)
  emit('close')
}
</script>

<template>
  <!-- Mobile Backdrop Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-slate-900/40 z-35 lg:hidden"
    @click="emit('close')"
    id="sidebar-mobile-backdrop"
  />

  <aside
    :class="[
      'w-[280px] bg-white dark:bg-[#0f172a] border-r border-[#e8e8e8] dark:border-slate-700 flex flex-col fixed h-screen overflow-y-auto z-40 transition-transform duration-300 ease-in-out lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
    id="app-sidebar"
  >
    <!-- Mobile close button -->
    <div class="p-3 flex justify-end lg:hidden border-b border-[#e8e8e8] dark:border-slate-700">
      <button
        type="button"
        @click="emit('close')"
        class="w-7 h-7 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-300 cursor-pointer border-none text-[16px]"
        title="关闭菜单"
      >
        ✕
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-3 flex-1 space-y-0.5">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        :id="`nav-item-${index}`"
        @click="handleNavClick(item.name)"
        :class="[
          'flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-[15px]',
          item.name === currentTab
            ? 'bg-[#f0f4ff] dark:bg-[#4a6cf7]/15 text-accent dark:text-[#6a8cff] font-medium'
            : 'text-slate-500 dark:text-slate-400 hover:bg-[#f5f7fa] dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
        ]"
      >
        <component
          :is="item.icon"
          :size="16"
          :class="[
            'shrink-0',
            item.name === currentTab ? 'text-accent dark:text-[#6a8cff]' : 'text-slate-400 dark:text-slate-500'
          ]"
        />
        <span>{{ item.name }}</span>
        <span
          v-if="item.name === currentTab"
          class="ml-auto w-1.5 h-1.5 bg-[#4a6cf7] rounded-full"
        />
      </div>
    </nav>

    <!-- Theme Toggle -->
    <div class="px-3 pb-2">
      <div
        @click="toggleTheme"
        :class="[
          'flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-[15px] group',
          'text-slate-500 dark:text-slate-400 hover:bg-[#f5f7fa] dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
        ]"
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
      >
        <svg
          v-if="!isDark"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 text-slate-400 group-hover:text-slate-800 transition-colors"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white transition-colors"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <span>{{ isDark ? '浅色模式' : '深色模式' }}</span>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-3 border-t border-[#e8e8e8] dark:border-slate-700 bg-white dark:bg-[#0f172a]">
      <div class="flex items-center gap-2.5 p-2.5 bg-[#f9fafb] dark:bg-slate-800/60 rounded-lg border border-[#e8e8e8] dark:border-slate-700/60">
        <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden shrink-0 border border-slate-300 dark:border-slate-500">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming"
            alt="avatar"
            class="w-full h-full object-cover"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="leading-tight">
          <h4 class="text-[15px] font-medium text-slate-800 dark:text-white">小明同学</h4>
          <div class="flex items-center gap-1 text-[13px] text-slate-400 dark:text-slate-400 mt-0.5">
            <span>Lv.12</span>
            <span class="bg-[#fff2e8] text-[#fa8c16] px-1 rounded-sm text-[12px] font-semibold">V</span>
          </div>
        </div>
      </div>

      <!-- Weekly Progress Tracker -->
      <div class="mt-3 p-2.5 bg-[#f9fafb] dark:bg-slate-800/60 rounded-lg border border-[#e8e8e8] dark:border-slate-700/60">
        <h5 class="text-[13px] text-slate-400 font-medium mb-1.5">学习进度</h5>
        <div class="flex justify-between text-[14px] mb-1.5">
          <span class="text-slate-500 dark:text-slate-400">本周学习</span>
          <span class="text-accent dark:text-[#6a8cff] font-semibold">{{ weeklyHours }} 小时</span>
        </div>

        <div class="h-1.5 bg-[#e8e8e8] dark:bg-slate-700/60 rounded-full overflow-hidden mb-1.5">
          <div
            class="h-full bg-gradient-to-r from-[#4a6cf7] to-[#6a8cff] rounded-full transition-[width] duration-500 ease-out"
            :style="{ width: `${progressWidth}%` }"
          />
        </div>

        <div class="text-[12px] text-slate-400 flex justify-between">
          <span>目标 {{ goalHours }} 小时</span>
          <span>{{ percentage }}%</span>
        </div>
      </div>
    </div>
  </aside>
</template>
