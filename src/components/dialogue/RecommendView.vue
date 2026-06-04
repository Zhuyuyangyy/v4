<template>
  <section class="flex-1 flex flex-col xl:flex-row h-full overflow-hidden bg-transparent animate-fade-in">
    <!-- Main Area: Course Listing -->
    <div class="flex-1 flex flex-col h-full border-r border-slate-900/40 bg-transparent overflow-y-auto p-6 space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-4 shrink-0 gap-4 text-left">
        <div>
          <h1 class="font-extrabold text-white text-xl tracking-tight font-display flex items-center gap-2">
            <GraduationCap class="w-6 h-6 text-blue-300" />
            <span>EduMind 课程体系</span>
          </h1>
          <p class="text-sm text-slate-400 mt-1">涵盖 <strong class="text-blue-300">5 大方向、24 门课程</strong>，从基础到前沿逐步深入</p>
        </div>
        <div class="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <span class="text-xs font-bold px-3 py-1 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">{{ totalCourses }} 门课程</span>
          <span class="text-sm font-bold px-3 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md text-blue-300 border border-slate-800/40">已测定 {{ collectedCount }} / 9 维指标</span>
        </div>
      </div>

      <!-- Direction Tabs -->
      <div class="flex items-center justify-between">
        <div class="flex bg-slate-950/85 p-1 rounded-xl border border-slate-900/60 gap-1 shrink-0 flex-wrap">
          <button
            v-for="dir in directions" :key="dir.id"
            @click="selectedDirection = dir.id"
            class="py-2 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer"
            :class="selectedDirection === dir.id
              ? 'bg-blue-500/20 text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white border border-transparent hover:bg-slate-900/40'"
          >
            {{ dir.name }}
          </button>
        </div>
        <span class="text-xs text-slate-500 font-medium">
          <template v-if="selectedDirection">
            {{ currentCourses.length }} / {{ directionCourseCount }} 门课程
          </template>
        </span>
      </div>

      <!-- Course Cards -->
      <div class="space-y-4">
        <div v-if="currentCourses.length === 0" class="text-center py-12 text-slate-500">
          <p class="text-base font-medium">暂无课程数据</p>
        </div>
        <CourseCard
          v-for="course in currentCourses" :key="course.id"
          :course="course"
          @consult="handleConsult"
          @qa-click="handleQaFromCourse"
        />
      </div>
    </div>

    <!-- Right: QA Center -->
    <div class="w-full xl:w-[800px] shrink-0 border-t xl:border-t-0 border-slate-900/40 bg-transparent flex flex-col h-[500px] xl:h-full text-slate-300">
      <div class="p-4 border-b border-slate-900/30 bg-[#090b15]/10 flex items-center gap-3 justify-between shrink-0">
        <div class="flex items-center gap-2 text-left">
          <Sparkles class="w-5 h-5 text-emerald-400" />
          <div>
            <h3 class="font-extrabold text-sm text-white">课程答疑中心</h3>
            <span class="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Course QA Advisor</span>
          </div>
        </div>
        <span class="text-[10px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30 font-mono font-bold">AI TUTOR</span>
      </div>

      <div class="flex-1 p-4 overflow-y-auto space-y-4 text-left">
        <div v-for="(msg, index) in recommendQaMessages" :key="index" class="flex flex-col space-y-1 max-w-[90%]" :class="msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'">
          <div class="text-[10px] text-slate-500 font-bold font-mono">{{ msg.sender === 'user' ? 'YOU (用户问询)' : 'AI TUTOR (导师解答)' }}</div>
          <div class="p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap select-text" :class="msg.sender === 'user' ? 'bg-blue-600/20 text-blue-200 border border-blue-500/20 rounded-tr-none' : 'bg-[#0c1224]/50 text-slate-300 border border-slate-900/80 rounded-tl-none font-medium'">
            {{ msg.text }}
          </div>
        </div>

        <div v-if="isRecommendQaLoading" class="flex items-start gap-2 mr-auto max-w-[95%]">
          <div class="p-3.5 bg-[#0c1224]/50 border border-slate-900 rounded-2xl rounded-tl-none text-sm text-slate-400 flex items-center gap-2 font-mono">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>AI 导师正在解答中...</span>
          </div>
        </div>
      </div>

      <!-- Quick Questions -->
      <div class="p-3 border-t border-slate-950/70 bg-[#090b15]/15 shrink-0 space-y-2 text-left">
        <span class="text-xs text-slate-500 font-bold uppercase tracking-wide">💡 您可能想直接问：</span>
        <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          <button
              v-for="(chip, i) in qaChips" :key="i"
              @click="handleSendRecommendQaLocal(chip)"
              :disabled="isRecommendQaLoading"
              class="py-1.5 px-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-blue-300 border border-slate-900 disabled:opacity-40 text-xs font-bold rounded-lg transition-all cursor-pointer select-none truncate max-w-full text-left"
            >
            {{ chip }}
          </button>
        </div>
      </div>

      <!-- QA Input -->
      <form @submit.prevent="handleSendRecommendQaLocal()" class="p-3 border-t border-slate-950/80 bg-[#0a0f1d]/40 shrink-0">
        <div class="flex items-center gap-2">
          <input type="text" v-model="recommendQaInput" :disabled="isRecommendQaLoading"
            placeholder="输入课程相关问题..."
            class="flex-1 bg-slate-950 border border-slate-900 text-slate-200 placeholder:text-slate-600 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50" />
          <button type="submit" :disabled="isRecommendQaLoading || !recommendQaInput.trim()"
            class="p-2.5 rounded-xl shrink-0 transition-opacity disabled:opacity-45"
            :class="recommendQaInput.trim() ? 'bg-cyan-500/20 text-blue-300 border border-cyan-500/30' : 'bg-slate-950 text-slate-600 border border-slate-900'">
            <Send class="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GraduationCap, Brain, Sparkles, Send } from 'lucide-vue-next'
import CourseCard from './CourseCard.vue'
import { directions, courses, getCoursesByDirection } from '@/data/dialogue/courseData'
import type { Course } from '@/data/dialogue/courseData'
import {
  collectedCount, recommendQaInput, recommendQaMessages, isRecommendQaLoading,
} from '@/composables/dialogue/useAppState'
import { handleSendRecommendQa } from '@/composables/dialogue/useChatApi'
import { avatarWriteText, avatarStatus } from '@/composables/dialogue/useAvatarSdk'

const selectedDirection = ref('programming')

const totalCourses = computed(() => courses.length)

const currentCourses = computed(() => getCoursesByDirection(selectedDirection.value))

const directionCourseCount = computed(() => {
  const dir = directions.find(d => d.id === selectedDirection.value)
  if (!dir) return 0
  return getCoursesByDirection(dir.id).length
})

const qaChips = [
  '如何选择适合自己的学习路径？',
  '零基础应该先学哪门课？',
  '这些课程需要多长时间学完？',
  '学习顺序有什么建议？',
]

// QA handler
function handleSendRecommendQaLocal(customText?: string) {
  handleSendRecommendQa(customText)
}

function handleQaFromCourse(question: string) {
  handleSendRecommendQa(question)
}

function handleConsult(course: Course) {
  const question = `请帮我详细介绍一下「${course.name}」这门课程，包括前置要求、核心知识点和学习建议。`
  if (avatarStatus.value === 'connected') {
    avatarWriteText(question, true)
  }
  handleSendRecommendQa(question)
}
</script>
