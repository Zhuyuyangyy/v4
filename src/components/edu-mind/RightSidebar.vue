<template>
  <aside class="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-4" id="right-sidebar">
    <div class="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-[#e8e8e8] dark:border-slate-700/60 shadow-sm">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-[15px] font-semibold text-[#1a1a2e] dark:text-white">为你推荐</h4>
        <button
          @click="handleRefreshClick"
          class="flex items-center gap-1 text-[14px] text-[#4a6cf7] dark:text-[#6a8cff] hover:text-[#3b5bdb] dark:hover:text-[#4a6cf7] transition-colors font-medium cursor-pointer"
        >
          <RotateCw :class="['w-3.5 h-3.5', isRotating ? 'animate-spin' : '']" />
          <span>换一换</span>
        </button>
      </div>

      <div class="space-y-1.5 max-h-[380px] overflow-y-auto">
        <TransitionGroup name="rec-list" tag="div" class="space-y-1.5">
          <div
            v-for="item in recommendations"
            :key="item.id"
            class="flex gap-2.5 p-2 rounded-lg hover:bg-[#f5f7fa] dark:hover:bg-slate-800/60 transition-colors items-center group relative border border-transparent hover:border-[#e8e8e8] dark:hover:border-slate-700/60"
          >
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', getIconAndClass(item.category).bgColor, getIconAndClass(item.category).color]">
              <component :is="getIconAndClass(item.category).icon" class="w-4 h-4" />
            </div>

            <div class="flex-1 min-w-0" @click="emit('collectionItemClick', item.id, item.category)">
              <div class="text-[14px] font-medium text-[#1a1a2e] dark:text-white mb-1 truncate hover:text-[#4a6cf7] dark:hover:text-[#6a8cff] cursor-pointer" :title="item.title">
                {{ item.title }}
              </div>
              <div class="flex items-center gap-2">
                <span :class="['text-[11px] px-1.5 py-0.5 rounded', getIconAndClass(item.category).badgeClass]">
                  {{ item.category }}
                </span>
                <span class="text-[12px] text-[#8c8c8c] dark:text-slate-500 flex items-center gap-0.5">
                  {{ item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views }} 次阅读
                </span>
              </div>
            </div>

            <button
              @click="emit('toggleRecommendStar', item.id)"
              class="shrink-0 p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700 cursor-pointer text-slate-300 hover:text-slate-500 dark:hover:text-slate-400 transition-colors"
            >
              <Star :class="['w-3.5 h-3.5', item.starred ? 'fill-[#fadb14] text-[#fadb14]' : '']" />
            </button>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-[#e8e8e8] dark:border-slate-700/60 shadow-sm">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-[15px] font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-1.5">
          <Bookmark class="w-4 h-4 text-[#4a6cf7] dark:text-[#6a8cff]" />
          <span>我的收藏</span>
        </h4>
        <span class="text-[13px] text-[#8c8c8c] dark:text-slate-500">共 {{ collections.length }} 个</span>
      </div>

      <div class="space-y-1.5 max-h-[300px] overflow-y-auto">
        <div
          v-if="collections.length === 0"
          class="text-center py-6 text-[13px] text-[#8c8c8c] dark:text-slate-500 bg-[#fafafa] dark:bg-slate-800/60 rounded-lg border border-dashed border-[#e8e8e8] dark:border-slate-700/60"
        >
          暂未收藏任何资源，点击卡片右上角 ⭐ 即可收藏。
        </div>
        <template v-else>
          <div
            v-for="item in collections"
            :key="item.id"
            @click="emit('collectionItemClick', item.id, item.category)"
            class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#f5f7fa] dark:hover:bg-slate-800/60 transition-colors cursor-pointer border border-transparent hover:border-[#e8e8e8] dark:hover:border-slate-700/60"
          >
            <div :class="['w-6 h-6 rounded-md flex items-center justify-center shrink-0', getIconAndClass(item.category).bgColor, getIconAndClass(item.category).color]">
              <component :is="getIconAndClass(item.category).icon" class="w-3.5 h-3.5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[14px] text-[#4c4c4c] dark:text-slate-300 hover:text-[#4a6cf7] dark:hover:text-[#6a8cff] transition-colors truncate font-medium">
                {{ item.title }}
              </p>
            </div>
            <span class="text-[12px] text-[#bfbfbf] dark:text-slate-600 shrink-0 font-mono">
              {{ item.date }}
            </span>
          </div>
        </template>
      </div>

      <div class="text-center pt-2.5 mt-2 border-t border-[#e8e8e8] dark:border-slate-700/60 text-[12px] text-[#8c8c8c] dark:text-slate-500">
        学习千钟计，勤奋是舟楫
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  RotateCw,
  Star,
  FileText,
  Video,
  HelpCircle,
  Code,
  Network,
  Bookmark
} from 'lucide-vue-next'
import type { Recommendation, CollectionItem, ResourceCategory } from '../../types/edu-mind'

const props = defineProps<{
  recommendations: Recommendation[]
  collections: CollectionItem[]
}>()

const emit = defineEmits<{
  toggleRecommendStar: [id: string]
  refreshRecommend: []
  collectionItemClick: [id: string, category: ResourceCategory]
}>()

const isRotating = ref(false)

const handleRefreshClick = () => {
  isRotating.value = true
  emit('refreshRecommend')
  setTimeout(() => {
    isRotating.value = false
  }, 600)
}

const getIconAndClass = (category: ResourceCategory) => {
  switch (category) {
    case '文档':
      return {
        icon: FileText,
        bgColor: 'bg-[#e6f4ff]',
        color: 'text-[#1677ff]',
        badgeClass: 'bg-[#e6f4ff] text-[#1677ff]'
      }
    case '思维导图':
      return {
        icon: Network,
        bgColor: 'bg-[#f6ffed]',
        color: 'text-[#52c41a]',
        badgeClass: 'bg-[#f6ffed] text-[#52c41a]'
      }
    case '流程图':
      return {
        icon: Network,
        bgColor: 'bg-[#f9f0ff]',
        color: 'text-[#722ed1]',
        badgeClass: 'bg-[#f9f0ff] text-[#722ed1]'
      }
    case '习题':
      return {
        icon: HelpCircle,
        bgColor: 'bg-[#fff7e6]',
        color: 'text-[#fa8c16]',
        badgeClass: 'bg-[#fff7e6] text-[#fa8c16]'
      }
    case '视频':
      return {
        icon: Video,
        bgColor: 'bg-[#fff1f0]',
        color: 'text-[#ff4d4f]',
        badgeClass: 'bg-[#fff1f0] text-[#ff4d4f]'
      }
    case '代码':
      return {
        icon: Code,
        bgColor: 'bg-[#e6fffb]',
        color: 'text-[#13c2c2]',
        badgeClass: 'bg-[#e6fffb] text-[#13c2c2]'
      }
    default:
      return {
        icon: FileText,
        bgColor: 'bg-[#f5f7fa]',
        color: 'text-[#8c8c8c]',
        badgeClass: 'bg-[#f5f7fa] text-[#8c8c8c]'
      }
  }
}
</script>

<style scoped>
.rec-list-enter-active {
  transition: all 0.2s ease;
}
.rec-list-leave-active {
  transition: all 0.2s ease;
}
.rec-list-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.rec-list-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.rec-list-move {
  transition: transform 0.2s ease;
}
</style>
