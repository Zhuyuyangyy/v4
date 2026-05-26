<template>
  <section class="flex-1 flex flex-col h-full bg-transparent overflow-y-auto p-6 space-y-6 animate-fade-in">
    <div class="max-w-4xl mx-auto w-full space-y-6 text-left">
      <div class="border-b border-slate-900 pb-4 shrink-0">
        <h1 class="font-extrabold text-white text-xl tracking-tight font-display flex items-center gap-2">
          <HistoryIcon class="w-6 h-6 text-amber-300" />
          <span>智绘学力时空轴 (Diagnostic Memory Bank)</span>
        </h1>
        <p class="text-sm text-slate-400 mt-1">本栏归档您过去所有轮次进行过的学力测评历史。您可以随时轻触按钮进行时光折跃及数据热载入。</p>
      </div>

      <div class="space-y-4">
        <div v-for="hist in historyPresets" :key="hist.id"
          class="bg-transparent backdrop-blur-md rounded-2xl border border-slate-900/30 shadow-lg hover:border-blue-900/35 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div class="space-y-3 flex-1 text-left p-4 md:p-0 md:pl-4">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-900">存档时间: {{ hist.date }}</span>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/40 backdrop-blur-md text-amber-300 border border-slate-800/40">{{ hist.evaluation }}</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-200 text-base">{{ hist.title }}</h3>
              <p class="text-sm text-slate-400 font-medium leading-relaxed mt-1">
                身份: <strong class="text-slate-300">{{ hist.dimensions.identity }}</strong> • 领域: <strong class="text-slate-300">{{ hist.dimensions.domain }}</strong> • 水平: <strong class="text-slate-300">{{ hist.dimensions.level }}</strong>
              </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1.5">
              <span v-for="sk in hist.report.skills.core.slice(0, 3)" :key="sk" class="bg-slate-950/60 text-slate-400 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-900">{{ sk }}</span>
              <span class="text-xs text-slate-500 font-mono self-center">...等共 {{ hist.report.skills.core.length + hist.report.skills.foundation.length }} 项</span>
            </div>
          </div>

          <div class="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 border-slate-900 pt-3.5 md:pt-0 w-full md:w-auto shrink-0 gap-4 p-4 md:p-0 md:pr-4">
            <div class="text-left md:text-right">
              <span class="text-xs font-bold text-slate-400 block tracking-wider">测定总学力评分</span>
              <span class="text-3xl font-black text-amber-300 font-display">{{ hist.score }}</span>
            </div>
            <button @click="restoreHistory(hist)"
              class="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border border-cyan-500/25 shadow-lg font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer outline-0 border-none">
              <RefreshCw class="w-4 h-4" />
              <span>恢复此测评特征</span>
            </button>
          </div>
        </div>

        <!-- Badge Section -->
        <div class="bg-transparent rounded-2xl p-6 border border-slate-900 text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div class="space-y-1">
            <h4 class="font-bold text-sm text-amber-300 flex items-center gap-1">
              <Sparkles class="w-4 h-4 opacity-90" />
              <span>全网成智徽章成就已接入</span>
            </h4>
            <p class="text-sm text-slate-400 leading-normal">系统为您成功录入「零基础起程者」、「极客极智路线」、「多元五维高契合」共 3 道时空徽记勋章。</p>
          </div>
          <div class="flex gap-2 shrink-0">
            <span class="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-extrabold px-3 py-1.5 rounded-full">🎖️ 领域新星</span>
            <span class="bg-cyan-500/10 text-amber-300 border border-cyan-500/20 text-xs font-extrabold px-3 py-1.5 rounded-full">🚀 极速破壁人</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { History, Sparkles, RefreshCw } from 'lucide-vue-next'
import { historyPresets, restoreHistory } from '@/composables/dialogue/useAppState'

const HistoryIcon = History
</script>
