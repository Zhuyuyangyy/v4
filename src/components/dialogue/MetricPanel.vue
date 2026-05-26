<template>
  <div class="bg-transparent backdrop-blur-md border-r border-slate-900/20 flex flex-col h-full overflow-y-auto shrink-0 transition-all duration-300"
    :class="isMetricCollapsed ? 'w-[64px] p-2 bg-transparent' : 'w-full md:w-[400px] p-5 space-y-5'">
    <!-- Collapsed State -->
    <template v-if="isMetricCollapsed">
      <div class="flex flex-col items-center py-2 h-full w-full space-y-6">
        <button @click="isMetricCollapsed = false" class="p-1.5 rounded-lg hover:bg-slate-900 border border-slate-900 bg-transparent text-slate-300 hover:text-cyan-400 shadow-sm transition-colors cursor-pointer" title="展开采集指标">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <div class="flex-1 flex flex-col items-center justify-center space-y-3.5 w-full">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider select-none text-center" style="writing-mode: vertical-lr">学习画像进度</span>
          <span class="text-sm font-black text-cyan-400 font-mono">{{ Math.round((collectedCount / 9) * 100) }}%</span>
          <div class="w-2.5 h-44 bg-transparent rounded-full relative overflow-hidden flex flex-col justify-end border border-slate-800 shadow-inner">
            <div class="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out" :style="{ height: `${(collectedCount / 9) * 100}%` }" />
          </div>
          <span class="text-xs font-bold text-slate-400 font-mono">{{ collectedCount }}/9</span>
        </div>
        <button
          @click="triggerReport"
          :disabled="!canUnlockReport"
          class="p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
          :class="canUnlockReport ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/50 animate-pulse' : 'bg-transparent text-slate-500 cursor-not-allowed border border-slate-900'"
          title="可以生成星图测绘报告了！"
        >
          <Sparkles class="w-4 h-4" />
        </button>
      </div>
    </template>

    <!-- Expanded State -->
    <template v-else>
      <!-- Progress Panel -->
      <div class="bg-transparent rounded-2xl border border-slate-900/30 backdrop-blur-md p-4 shrink-0 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-slate-200 tracking-wider uppercase">采集进度</h2>
          <button @click="isMetricCollapsed = true" class="p-1 rounded-lg hover:bg-slate-900 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" title="折叠指标日志">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Circular Progress -->
        <div class="flex flex-col items-center justify-center py-2 relative">
          <svg class="w-24 h-24 transform -rotate-90 overflow-visible">
            <circle cx="48" cy="48" r="38" stroke="rgba(15, 23, 42, 0.82)" stroke-width="8" fill="transparent" />
            <circle cx="48" cy="48" r="38" stroke="#06b6d4" stroke-width="8" fill="transparent"
              :stroke-dasharray="2 * Math.PI * 38"
              :stroke-dashoffset="2 * Math.PI * 38 * (1 - collectedCount / 9)"
              stroke-linecap="round"
              class="transition-all duration-1000 ease-out" />
          </svg>
          <div class="absolute text-center flex flex-col items-center justify-center">
            <span class="text-xl font-black text-slate-200 font-display">{{ Math.round((collectedCount / 9) * 100) }}%</span>
            <span class="text-xs font-semibold text-slate-400">已采集 {{ collectedCount }}/9</span>
          </div>
        </div>
        <p class="text-sm text-center text-slate-400 leading-normal px-2">继续聊聊，完善你的学习画像吧~</p>
      </div>

      <!-- Dimensions Checklist -->
      <div class="space-y-3.5 flex-1">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-slate-200 tracking-wider uppercase">维度日志</h2>
          <button v-if="selectedDimensionInfo" @click="selectedDimensionInfo = null" class="text-xs text-cyan-400 font-medium hover:text-cyan-300">清除说明</button>
        </div>

        <div v-if="selectedDimensionInfo" class="p-2.5 bg-cyan-950/25 border border-cyan-900/40 rounded-xl text-sm leading-relaxed text-slate-200 animate-fade-in">
          <span class="font-bold">「{{ selectedDimensionInfo }}」</span>说明: 系统根据当前会话分析精准提炼出和您该维度匹配的信息作为特征入库。
        </div>

        <div class="space-y-1.5 text-sm">
          <div
            v-for="(row, idx) in dimensionRows"
            :key="idx"
            @click="selectNodeDetail(row.label.split(' ')[1])"
            class="flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer"
            :class="row.isChecked
              ? 'bg-[#0b1022]/85 border-slate-900 text-slate-100'
              : 'bg-transparent border-dashed border-slate-900 text-slate-500'"
          >
            <span class="font-semibold text-sm">{{ row.label }}</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold" :class="row.isChecked ? 'text-cyan-400' : 'text-slate-500'">
                {{ row.display }}
              </span>
              <Check v-if="row.isChecked" class="w-4 h-4 text-emerald-400 stroke-[3]" />
              <div v-else class="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2 shrink-0 pt-3 border-t border-slate-900">
        <button
          @click="triggerReport"
          :disabled="!canUnlockReport"
          class="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          :class="canUnlockReport ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/50' : 'bg-[#030611]/80 text-slate-500 border border-slate-900 cursor-not-allowed'"
        >
          <Sparkles class="w-4 h-4" />
          <span>开始星图测绘</span>
        </button>

        <button @click="resetConversation" class="w-full py-2.5 bg-slate-950/40 hover:bg-rose-950/25 border border-rose-900/50 hover:border-rose-850/50 text-rose-400 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
          <RefreshCw class="w-4 h-4" />
          <span>重置对话</span>
        </button>
      </div>

      <!-- Scoring Panel -->
      <div class="p-3 bg-[#0b0f1a]/15 backdrop-blur-sm border border-slate-900/30 rounded-2xl shrink-0 space-y-2">
        <div class="flex items-center justify-between text-sm text-white font-bold">
          <span>画像评分 (示例)</span>
          <span class="text-cyan-400 font-black">87</span>
        </div>
        <div class="flex gap-0.5">
          <Sparkles v-for="i in 5" :key="'star-' + i" class="w-3.5 h-3.5" :class="i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-800'" />
        </div>
        <div class="space-y-1 text-xs text-slate-400">
          <div v-for="(score, label) in sampleScores" :key="label" class="flex justify-between items-center gap-2">
            <span class="shrink-0">{{ label }}</span>
            <div class="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden">
              <div class="bg-cyan-500 h-full rounded-full" :style="{ width: `${score}%` }" />
            </div>
            <span class="text-xs text-cyan-400 font-bold w-8 text-right">{{ score }}</span>
          </div>
        </div>
        <button
          @click="triggerReport"
          :disabled="!canUnlockReport"
          class="w-full py-2 mt-1 rounded-lg text-sm font-bold text-center transition-all cursor-pointer"
          :class="canUnlockReport ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50 hover:bg-cyan-950/60' : 'bg-slate-950 text-slate-600 cursor-not-allowed border border-slate-900'"
        >查看完整星图</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sparkles, ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-vue-next'
import {
  isMetricCollapsed, dimensions, collectedCount, canUnlockReport,
  selectedDimensionInfo, selectNodeDetail, resetConversation,
} from '@/composables/dialogue/useAppState'
import { triggerReport } from '@/composables/dialogue/useChatApi'

const dimensionKeys = [
  { key: 'identity' as const, idx: 1, label: '身份' },
  { key: 'domain' as const, idx: 2, label: '领域' },
  { key: 'level' as const, idx: 3, label: '水平' },
  { key: 'experience' as const, idx: 4, label: '经验' },
  { key: 'goal' as const, idx: 5, label: '短期目标' },
  { key: 'motivation' as const, idx: 6, label: '动机' },
  { key: 'period' as const, idx: 7, label: '学习时段' },
  { key: 'weeklyHours' as const, idx: 8, label: '每周时长' },
  { key: 'method' as const, idx: 9, label: '学习方式' },
]

const dimensionRows = computed(() =>
  dimensionKeys.map(dk => ({
    label: `${dk.idx} ${dk.label}`,
    isChecked: dimensions.value[dk.key] !== null,
    display: dimensions.value[dk.key] || '待捕获',
  }))
)

const sampleScores = { '知识基础': 85, '学习速度': 90, '逻辑思维': 88, '创造力': 82 }
</script>
