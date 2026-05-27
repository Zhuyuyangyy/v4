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
  { day: '周一', hours: 2.5 },
  { day: '周二', hours: 1.8 },
  { day: '周三', hours: 3.2 },
  { day: '周四', hours: 2.0 },
  { day: '周五', hours: 4.1 },
  { day: '周六', hours: 3.5 },
  { day: '周日', hours: 1.4 }
])

const maxWeeklyHours = computed(() => Math.max(...weeklyData.value.map(d => d.hours)))

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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-2">
            <Activity class="w-4 h-4 text-[#4a6cf7] dark:text-[#6a8cff]" />
            <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white">本周学习时长</h3>
          </div>
          <span class="text-[12px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg font-medium">
            共 {{ weeklyData.reduce((a, b) => a + b.hours, 0).toFixed(1) }}h
          </span>
        </div>

        <div class="flex items-end justify-between gap-3 h-44 px-1">
          <div
            v-for="item in weeklyData"
            :key="item.day"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <span class="text-[12px] font-bold text-[#4a6cf7] dark:text-[#6a8cff] font-mono">{{ item.hours }}h</span>
            <div class="w-full flex items-end justify-center" style="height: 120px">
              <div
                class="w-full max-w-[36px] rounded-t-lg transition-all duration-300 hover:opacity-80"
                :style="{
                  height: `${(item.hours / maxWeeklyHours) * 100}%`,
                  background: 'linear-gradient(180deg, #4a6cf7, #6a8cff)',
                  minHeight: '8px'
                }"
              />
            </div>
            <span class="text-[12px] text-slate-500 dark:text-slate-400 font-medium">{{ item.day }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
        <div class="flex items-center gap-2 mb-4">
          <Target class="w-4 h-4 text-[#4a6cf7] dark:text-[#6a8cff]" />
          <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white">课程进度</h3>
        </div>

        <div class="flex flex-col gap-4">
          <div
            v-for="course in courseProgress"
            :key="course.name"
            class="group"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[13px] font-semibold text-[#1e293b] dark:text-white truncate max-w-[65%]">{{ course.name }}</span>
              <span class="text-[12px] font-bold text-[#4a6cf7] dark:text-[#6a8cff] font-mono">{{ course.progress }}%</span>
            </div>
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{
                  width: `${course.progress}%`,
                  backgroundColor: course.color
                }"
              />
            </div>
            <div class="flex items-center gap-1 mt-1.5">
              <Timer class="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span class="text-[11.5px] text-slate-400 dark:text-slate-500">{{ course.lastStudied }}</span>
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
        <div class="flex items-center gap-2">
          <TrendingUp class="w-4 h-4 text-[#4a6cf7] dark:text-[#6a8cff]" />
          <h3 class="text-[15px] font-bold text-[#1e293b] dark:text-white">学习成就</h3>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-gradient-to-br from-[#f0f4ff] to-white dark:from-[#4a6cf7]/10 dark:to-[#1e293b] rounded-xl border border-[#e2ebff] dark:border-slate-700 p-4 text-center">
          <div class="text-[28px] mb-1">🔥</div>
          <div class="text-[14px] font-bold text-[#1e293b] dark:text-white">连续打卡</div>
          <div class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">坚持15天不间断</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-500/10 dark:to-[#1e293b] rounded-xl border border-emerald-100 dark:border-slate-700 p-4 text-center">
          <div class="text-[28px] mb-1">📚</div>
          <div class="text-[14px] font-bold text-[#1e293b] dark:text-white">课程达人</div>
          <div class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">完成12门课程学习</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-white dark:from-amber-500/10 dark:to-[#1e293b] rounded-xl border border-amber-100 dark:border-slate-700 p-4 text-center">
          <div class="text-[28px] mb-1">✍️</div>
          <div class="text-[14px] font-bold text-[#1e293b] dark:text-white">练习高手</div>
          <div class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">累计完成86道练习</div>
        </div>
        <div class="bg-gradient-to-br from-rose-50 to-white dark:from-rose-500/10 dark:to-[#1e293b] rounded-xl border border-rose-100 dark:border-slate-700 p-4 text-center">
          <div class="text-[28px] mb-1">⏱️</div>
          <div class="text-[14px] font-bold text-[#1e293b] dark:text-white">百小时学者</div>
          <div class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">总学习时长突破100h</div>
        </div>
      </div>
    </div>
  </div>
</template>
