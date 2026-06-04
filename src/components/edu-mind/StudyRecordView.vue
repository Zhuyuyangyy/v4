<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from '../../composables/useEduMindTheme'
import {
  Clock,
  BookOpen,
  PenTool,
  Flame,
  Calendar,
  Video,
  FileText,
  CheckCircle,
  TrendingUp,
  Filter,
  ChevronDown,
  BarChart3,
  Trophy,
  Target,
  Activity,
  Timer
} from 'lucide-vue-next'

const { isDark } = useTheme()

const dateRange = ref<string>('本周')
const activityTypeFilter = ref<string>('全部')

const dateRanges = ['本周', '本月', '近三月', '全部']
const activityTypes = ['全部', '观看视频', '完成练习', '阅读资料']

const stats = ref([
  { label: '总学习时长', value: '128.5h', icon: Clock, color: '#4a6cf7', bg: 'bg-[#f0f4ff] dark:bg-[#4a6cf7]/15', iconColor: 'text-[#4a6cf7] dark:text-[#6a8cff]' },
  { label: '完成课程', value: '12', icon: BookOpen, color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-500/15', iconColor: 'text-emerald-500 dark:text-emerald-400' },
  { label: '完成练习', value: '86', icon: PenTool, color: '#f59e0b', bg: 'bg-amber-50 dark:bg-amber-500/15', iconColor: 'text-amber-500 dark:text-amber-400' },
  { label: '连续学习', value: '15天', icon: Flame, color: '#ef4444', bg: 'bg-rose-50 dark:bg-rose-500/15', iconColor: 'text-rose-500 dark:text-rose-400' }
])

const weeklyData = ref([
  { day: '周一', total: 2.5, video: 1.2, practice: 0.8, reading: 0.5 },
  { day: '周二', total: 1.8, video: 0.6, practice: 0.9, reading: 0.3 },
  { day: '周三', total: 3.2, video: 1.5, practice: 1.0, reading: 0.7 },
  { day: '周四', total: 2.0, video: 0.8, practice: 0.7, reading: 0.5 },
  { day: '周五', total: 4.1, video: 2.0, practice: 1.3, reading: 0.8 },
  { day: '周六', total: 3.5, video: 1.5, practice: 1.5, reading: 0.5 },
  { day: '周日', total: 1.4, video: 0.4, practice: 0.6, reading: 0.4 }
])

const maxWeeklyHours = computed(() => Math.max(...weeklyData.value.map(d => d.total)))
const weeklyTotal = computed(() => weeklyData.value.reduce((a, b) => a + b.total, 0))
const weeklyAvg = computed(() => +(weeklyTotal.value / 7).toFixed(1))
const bestDay = computed(() => {
  const sorted = [...weeklyData.value].sort((a, b) => b.total - a.total)
  return sorted[0]
})

// 高级简约配色 — 同一色系不同明度，营造渐变感
const activityColors = {
  video: { bg: '#4f46e5', label: '观看视频', lighter: '#6366f1' },
  practice: { bg: '#6366f1', label: '完成练习', lighter: '#818cf8' },
  reading: { bg: '#818cf8', label: '阅读资料', lighter: '#a5b4fc' },
}

function getBarStackHeight(item: typeof weeklyData.value[0], field: 'video' | 'practice' | 'reading') {
  return (item[field] / maxWeeklyHours.value) * 100
}

const timeline = ref([
  {
    date: '今天',
    items: [
      { course: 'C语言程序设计', type: '观看视频', typeIcon: Video, duration: '45分钟', time: '14:30', color: '#4a6cf7' },
      { course: '数据结构与算法', type: '完成练习', typeIcon: PenTool, duration: '30分钟', time: '11:20', color: '#10b981' },
      { course: 'Python编程基础', type: '阅读资料', typeIcon: FileText, duration: '20分钟', time: '09:15', color: '#f59e0b' }
    ]
  },
  {
    date: '昨天',
    items: [
      { course: '机器学习导论', type: '观看视频', typeIcon: Video, duration: '60分钟', time: '20:00', color: '#4a6cf7' },
      { course: 'C语言程序设计', type: '完成练习', typeIcon: PenTool, duration: '40分钟', time: '16:45', color: '#10b981' },
      { course: '操作系统原理', type: '阅读资料', typeIcon: FileText, duration: '25分钟', time: '14:10', color: '#f59e0b' },
      { course: '数据结构与算法', type: '观看视频', typeIcon: Video, duration: '35分钟', time: '10:30', color: '#4a6cf7' }
    ]
  },
  {
    date: '05月24日',
    items: [
      { course: 'Python编程基础', type: '完成练习', typeIcon: PenTool, duration: '50分钟', time: '19:20', color: '#10b981' },
      { course: '深度学习基础', type: '观看视频', typeIcon: Video, duration: '55分钟', time: '15:00', color: '#4a6cf7' },
      { course: 'C语言程序设计', type: '阅读资料', typeIcon: FileText, duration: '15分钟', time: '11:05', color: '#f59e0b' }
    ]
  }
])

const courseProgress = ref([
  { name: 'C语言程序设计', progress: 78, lastStudied: '今天 14:30', color: '#4a6cf7' },
  { name: '数据结构与算法', progress: 62, lastStudied: '今天 11:20', color: '#6a8cff' },
  { name: 'Python编程基础', progress: 45, lastStudied: '今天 09:15', color: '#4a6cf7' },
  { name: '机器学习导论', progress: 33, lastStudied: '昨天 20:00', color: '#6a8cff' },
  { name: '操作系统原理', progress: 21, lastStudied: '昨天 14:10', color: '#4a6cf7' }
])

const filteredTimeline = computed(() => {
  if (activityTypeFilter.value === '全部') return timeline.value
  return timeline.value.map(group => ({
    ...group,
    items: group.items.filter(item => item.type === activityTypeFilter.value)
  })).filter(group => group.items.length > 0)
})

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case '观看视频': return 'bg-[#f0f4ff] text-[#4a6cf7] dark:bg-[#4a6cf7]/15 dark:text-[#6a8cff]'
    case '完成练习': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
    case '阅读资料': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
    default: return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 dark:bg-[#0f172a]">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#f0f4ff] dark:bg-[#4a6cf7]/15 flex items-center justify-center shrink-0">
          <BarChart3 class="w-5 h-5 text-[#4a6cf7] dark:text-[#6a8cff]" />
        </div>
        <div>
          <h1 class="text-[20px] font-bold text-[#1e293b] dark:text-white tracking-tight leading-tight">学习记录</h1>
          <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">追踪你的学习进度与成长轨迹</p>
        </div>
      </div>
      <div class="flex items-center gap-2 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-xs">
        <Trophy class="w-4 h-4 text-amber-500" />
        <span class="text-[13px] text-slate-500 dark:text-slate-400">累计学习</span>
        <span class="text-[16px] font-bold text-[#4a6cf7] dark:text-[#6a8cff] font-mono">128.5</span>
        <span class="text-[13px] text-slate-500 dark:text-slate-400">小时</span>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-4 flex items-center gap-3.5"
      >
        <div :class="['w-11 h-11 rounded-xl flex items-center justify-center shrink-0', stat.bg]">
          <component :is="stat.icon" :class="['w-5 h-5', stat.iconColor]" />
        </div>
        <div class="min-w-0">
          <div class="text-[22px] font-bold text-[#1e293b] dark:text-white leading-tight font-mono">{{ stat.value }}</div>
          <div class="text-[12.5px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <!-- 左侧：本周学习时长柱状图（重新设计） -->
      <div class="lg:col-span-3 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 flex flex-col">
        <!-- 图表头部：简洁 -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <Activity class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h3 class="text-[14px] font-semibold text-slate-800 dark:text-white leading-tight">本周学习</h3>
              <p class="text-[11px] text-slate-400 dark:text-slate-500">日均 {{ weeklyAvg }}h · 累计 {{ weeklyTotal.toFixed(1) }}h</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <span class="w-2 h-2 rounded-sm" style="background:#4f46e5" />
              视频
            </span>
            <span class="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <span class="w-2 h-2 rounded-sm" style="background:#6366f1" />
              练习
            </span>
            <span class="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <span class="w-2 h-2 rounded-sm" style="background:#818cf8" />
              阅读
            </span>
          </div>
        </div>

        <!-- 柱状图区域 -->
        <div class="relative flex flex-col flex-1">
          <!-- Y轴刻度（极简） -->
          <div class="absolute right-0 top-0 flex flex-col justify-between pointer-events-none select-none" style="height: 280px">
            <span class="text-[10px] text-slate-300 dark:text-slate-600 font-mono font-medium">{{ maxWeeklyHours.toFixed(1) }}</span>
            <span class="text-[10px] text-slate-300 dark:text-slate-600 font-mono font-medium">0</span>
          </div>

          <!-- 上部弹性空间：把柱子推到容器底部 -->
          <div class="flex-1" />

          <!-- 柱子区 -->
          <div class="relative">
            <div class="flex items-end gap-6" style="height: 280px">
              <div
                v-for="(item, idx) in weeklyData"
                :key="item.day"
                class="flex-1 flex flex-col items-center justify-end h-full group"
              >
                <!-- 堆叠柱子 -->
                <div class="relative w-full max-w-[2px] flex flex-col justify-end transition-all duration-500 ease-out"
                  :style="{ height: `${(item.total / maxWeeklyHours) * 100}%`, minHeight: item.total > 0 ? '8px' : 0 }">

                  <!-- 每个柱子的悬浮提示（极简） -->
                  <div class="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                    <div class="bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg px-3 py-2 shadow-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                      <div class="text-[13px] font-semibold text-center mb-1.5">{{ item.day }} · {{ item.total }}h</div>
                      <div class="space-y-1 text-[11px]">
                        <div class="flex items-center justify-between gap-4">
                          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm" style="background:#4f46e5" />视频</span>
                          <span class="font-semibold font-mono">{{ item.video }}h</span>
                        </div>
                        <div class="flex items-center justify-between gap-4">
                          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm" style="background:#6366f1" />练习</span>
                          <span class="font-semibold font-mono">{{ item.practice }}h</span>
                        </div>
                        <div class="flex items-center justify-between gap-4">
                          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm" style="background:#818cf8" />阅读</span>
                          <span class="font-semibold font-mono">{{ item.reading }}h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 三段柱子（同色系渐变） -->
                  <div class="w-full transition-all duration-500 ease-out group-hover:brightness-110"
                    :style="{
                      height: `${(item.reading / item.total) * 100}%`,
                      minHeight: item.reading > 0 ? '4px' : 0,
                      background: `linear-gradient(180deg, #a5b4fc, #818cf8)`,
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px',
                    }"
                  />
                  <div class="w-full transition-all duration-500 ease-out group-hover:brightness-110"
                    :style="{
                      height: `${(item.practice / item.total) * 100}%`,
                      minHeight: item.practice > 0 ? '4px' : 0,
                      background: '#6366f1',
                    }"
                  />
                  <div class="w-full transition-all duration-500 ease-out group-hover:brightness-110"
                    :style="{
                      height: `${(item.video / item.total) * 100}%`,
                      minHeight: item.video > 0 ? '4px' : 0,
                      background: `linear-gradient(180deg, #6366f1, #4f46e5)`,
                      borderBottomLeftRadius: '4px',
                      borderBottomRightRadius: '4px',
                    }"
                  />
                </div>

                <!-- 日期标签 -->
                <span class="mt-2 text-[11px] font-medium text-slate-400 dark:text-slate-500 transition-colors"
                  :class="idx === 4 ? 'text-indigo-500 dark:text-indigo-400 font-semibold' : ''"
                >{{ item.day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：课程进度 -->
      <div class="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
              <Target class="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white">课程进度</h3>
          </div>
          <span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{{ courseProgress.length }} 门</span>
        </div>

        <div class="flex flex-col gap-3.5">
          <div
            v-for="(course, idx) in courseProgress"
            :key="course.name"
            class="group relative"
          >
            <!-- 课程卡片 -->
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer">
              <!-- 排名标识 -->
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold font-mono"
                :style="{
                  background: idx === 0 ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : idx === 1 ? 'linear-gradient(135deg, #94a3b8, #cbd5e1)' : idx === 2 ? 'linear-gradient(135deg, #b45309, #d97706)' : 'rgba(148,163,184,0.1)',
                  color: idx < 3 ? '#fff' : '#94a3b8'
                }"
              >
                {{ idx + 1 }}
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[13px] font-semibold text-[#1e293b] dark:text-white truncate">{{ course.name }}</span>
                  <span class="text-[12px] font-bold font-mono ml-2 shrink-0" :style="{ color: course.color }">{{ course.progress }}%</span>
                </div>

                <!-- 进度条 -->
                <div class="w-full h-1.5 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700 ease-out relative"
                    :style="{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)` }"
                  >
                    <!-- 光泽效果 -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                <div class="flex items-center justify-between mt-1.5">
                  <div class="flex items-center gap-1">
                    <Timer class="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <span class="text-[11px] text-slate-400 dark:text-slate-500">{{ course.lastStudied }}</span>
                  </div>
                  <!-- 状态标签 -->
                  <span
                    class="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                    :class="course.progress >= 80 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' : course.progress >= 50 ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'"
                  >
                    {{ course.progress >= 80 ? '已掌握' : course.progress >= 50 ? '学习中' : '入门' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div class="flex items-center gap-2">
          <Calendar class="w-4 h-4 text-[#4a6cf7] dark:text-[#6a8cff]" />
          <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white">学习动态</h3>
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-lg p-0.5">
            <button
              v-for="range in dateRanges"
              :key="range"
              @click="dateRange = range"
              :class="[
                'px-3 py-1.5 rounded-md text-[12.5px] font-semibold cursor-pointer border-none transition-all',
                dateRange === range
                  ? 'bg-white dark:bg-slate-700 text-[#4a6cf7] dark:text-[#6a8cff] shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 bg-transparent hover:text-slate-700 dark:hover:text-slate-200'
              ]"
            >
              {{ range }}
            </button>
          </div>

          <div class="relative">
            <select
              v-model="activityTypeFilter"
              class="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 pr-7 text-[12.5px] font-semibold text-slate-600 dark:text-slate-300 cursor-pointer outline-none"
            >
              <option v-for="type in activityTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <ChevronDown class="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div
          v-for="(group, gIdx) in filteredTimeline"
          :key="gIdx"
        >
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-2 h-2 rounded-full bg-[#4a6cf7] dark:bg-[#6a8cff] shrink-0" />
            <h4 class="text-[13.5px] font-bold text-[#1e293b] dark:text-white">{{ group.date }}</h4>
            <div class="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
          </div>

          <div class="flex flex-col gap-2.5 ml-1">
            <div
              v-for="(item, iIdx) in group.items"
              :key="iIdx"
              class="flex items-center gap-3 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/60 p-3.5 hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="getTypeBadgeClass(item.type)">
                <component :is="item.typeIcon" class="w-4 h-4" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-[14px] font-semibold text-[#1e293b] dark:text-white truncate">{{ item.course }}</span>
                  <span :class="['text-[11px] px-2 py-0.5 rounded-md font-semibold shrink-0', getTypeBadgeClass(item.type)]">
                    {{ item.type }}
                  </span>
                </div>
                <div class="flex items-center gap-3 mt-1">
                  <span class="text-[12px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock class="w-3 h-3" />
                    {{ item.duration }}
                  </span>
                  <span class="text-[12px] text-slate-400 dark:text-slate-500">{{ item.time }}</span>
                </div>
              </div>

              <div class="shrink-0">
                <CheckCircle class="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredTimeline.length === 0" class="py-12 text-center">
          <Filter class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p class="text-[14px] text-slate-400 dark:text-slate-500">暂无匹配的学习记录</p>
          <p class="text-[12px] text-slate-400 dark:text-slate-500 mt-1">尝试调整筛选条件查看更多</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
            <TrendingUp class="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white leading-tight">学习成就</h3>
            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">已完成 4/6 个成就</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <div v-for="i in 4" :key="i" class="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-500" />
          <div v-for="i in 2" :key="'e'+i" class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="group relative bg-gradient-to-br from-[#f0f4ff] to-white dark:from-[#4a6cf7]/10 dark:to-[#1e293b] rounded-xl border border-[#e2ebff] dark:border-slate-700 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-[#4a6cf7]/5 dark:bg-[#4a6cf7]/10 rounded-bl-full" />
          <div class="text-[32px] mb-2 relative z-10">🔥</div>
          <div class="text-[13px] font-bold text-[#1e293b] dark:text-white relative z-10">连续打卡</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 relative z-10">坚持15天不间断</div>
          <div class="mt-2.5 flex justify-center relative z-10">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#4a6cf7]/10 text-[#4a6cf7] dark:text-[#6a8cff] font-semibold">已达成</span>
          </div>
        </div>
        <div class="group relative bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-500/10 dark:to-[#1e293b] rounded-xl border border-emerald-100 dark:border-slate-700 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-bl-full" />
          <div class="text-[32px] mb-2 relative z-10">📚</div>
          <div class="text-[13px] font-bold text-[#1e293b] dark:text-white relative z-10">课程达人</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 relative z-10">完成12门课程</div>
          <div class="mt-2.5 flex justify-center relative z-10">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">已达成</span>
          </div>
        </div>
        <div class="group relative bg-gradient-to-br from-amber-50 to-white dark:from-amber-500/10 dark:to-[#1e293b] rounded-xl border border-amber-100 dark:border-slate-700 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 dark:bg-amber-500/10 rounded-bl-full" />
          <div class="text-[32px] mb-2 relative z-10">✍️</div>
          <div class="text-[13px] font-bold text-[#1e293b] dark:text-white relative z-10">练习高手</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 relative z-10">累计86道练习</div>
          <div class="mt-2.5 flex justify-center relative z-10">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">已达成</span>
          </div>
        </div>
        <div class="group relative bg-gradient-to-br from-rose-50 to-white dark:from-rose-500/10 dark:to-[#1e293b] rounded-xl border border-rose-100 dark:border-slate-700 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 dark:bg-rose-500/10 rounded-bl-full" />
          <div class="text-[32px] mb-2 relative z-10">⏱️</div>
          <div class="text-[13px] font-bold text-[#1e293b] dark:text-white relative z-10">百小时学者</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 relative z-10">突破100小时</div>
          <div class="mt-2.5 flex justify-center relative z-10">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold">已达成</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}
</style>
