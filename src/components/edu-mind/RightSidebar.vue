<template>
  <aside class="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-4" id="right-sidebar">
    <div class="edu-side-panel">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-[15px] font-semibold text-white flex items-center gap-1.5">
          <Sparkles class="w-4 h-4 text-[#00d4ff]" />
          <span>为你推荐</span>
        </h4>
        <button
          @click="handleRefreshClick"
          class="edu-side-panel__action flex items-center gap-1 text-[13px] font-semibold cursor-pointer"
        >
          <RotateCw :class="['w-3.5 h-3.5', isRotating ? 'animate-spin' : '']" />
          <span>换一换</span>
        </button>
      </div>

      <div class="space-y-2 overflow-y-auto edu-side-scroll edu-side-panel__list">
        <TransitionGroup name="rec-list" tag="div" class="space-y-2">
          <div
            v-for="item in recommendations"
            :key="item.id"
            class="edu-side-item flex gap-3 px-3 py-3 rounded-lg items-center group relative"
          >
            <div :class="['edu-side-item__icon w-9 h-9 rounded-lg flex items-center justify-center shrink-0', getIconAndClass(item.category).bgColor, getIconAndClass(item.category).color]">
              <component :is="getIconAndClass(item.category).icon" class="w-4 h-4" />
            </div>

            <div class="flex-1 min-w-0" @click="emit('collectionItemClick', item.id, item.category)">
              <div class="text-[14.5px] font-semibold text-white mb-1.5 truncate edu-side-item__title cursor-pointer" :title="item.title">
                {{ item.title }}
              </div>
              <div class="flex items-center gap-2">
                <span :class="['edu-side-item__badge text-[11px] px-1.5 py-0.5 rounded font-medium', getIconAndClass(item.category).badgeClass]">
                  {{ item.category }}
                </span>
                <span class="text-[12px] text-[#8b9bc0] flex items-center gap-0.5 font-mono">
                  {{ item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views }} 次阅读
                </span>
              </div>
            </div>

            <button
              @click="emit('toggleRecommendStar', item.id)"
              class="shrink-0 p-1 rounded edu-side-item__star cursor-pointer transition-colors"
              :title="item.starred ? '取消收藏' : '加入收藏'"
            >
              <Star :class="['w-3.5 h-3.5', item.starred ? 'fill-[#fadb14] text-[#fadb14]' : '']" />
            </button>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <div class="edu-side-panel">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-[15px] font-semibold text-white flex items-center gap-1.5">
          <Bookmark class="w-4 h-4 text-[#00d4ff]" />
          <span>我的收藏</span>
        </h4>
        <span class="text-[12px] text-[#8b9bc0] font-mono">共 {{ collections.length }} 个</span>
      </div>

      <div class="space-y-2 overflow-y-auto edu-side-scroll edu-side-panel__list">
        <div
          v-if="collections.length === 0"
          class="edu-side-empty text-center py-8 text-[13px] text-[#8b9bc0] rounded-lg"
        >
          暂未收藏任何资源，点击卡片右上角 ⭐ 即可收藏。
        </div>
        <template v-else>
          <div
            v-for="item in collections"
            :key="item.id"
            @click="emit('collectionItemClick', item.id, item.category)"
            class="edu-side-item flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer"
          >
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', getIconAndClass(item.category).bgColor, getIconAndClass(item.category).color]">
              <component :is="getIconAndClass(item.category).icon" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[14.5px] text-[#d8def0] hover:text-white transition-colors truncate font-semibold">
                {{ item.title }}
              </p>
            </div>
            <span class="text-[12px] text-[#6f7a9e] shrink-0 font-mono">
              {{ item.date }}
            </span>
          </div>
        </template>
      </div>

      <div class="edu-side-panel__footer text-center pt-3 mt-3 text-[12px] text-[#6f7a9e] font-medium">
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
  Sparkles,
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
        bgColor: 'bg-[rgba(91,141,239,0.18)]',
        color: 'text-[#7eb1ff]',
        badgeClass: 'bg-[rgba(91,141,239,0.18)] text-[#7eb1ff] border border-[rgba(126,177,255,0.28)]'
      }
    case '思维导图':
      return {
        icon: Network,
        bgColor: 'bg-[rgba(110,231,183,0.16)]',
        color: 'text-[#7be3b8]',
        badgeClass: 'bg-[rgba(110,231,183,0.16)] text-[#7be3b8] border border-[rgba(123,227,184,0.26)]'
      }
    case '流程图':
      return {
        icon: Network,
        bgColor: 'bg-[rgba(0,212,255,0.12)]',
        color: 'text-[#00d4ff]',
        badgeClass: 'bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border border-[rgba(0,212,255,0.2)]'
      }
    case '习题':
      return {
        icon: HelpCircle,
        bgColor: 'bg-[rgba(255,176,108,0.18)]',
        color: 'text-[#ffb46c]',
        badgeClass: 'bg-[rgba(255,176,108,0.18)] text-[#ffb46c] border border-[rgba(255,180,108,0.28)]'
      }
    case '视频':
      return {
        icon: Video,
        bgColor: 'bg-[rgba(255,121,142,0.18)]',
        color: 'text-[#ff8da1]',
        badgeClass: 'bg-[rgba(255,121,142,0.18)] text-[#ff8da1] border border-[rgba(255,141,161,0.28)]'
      }
    case '代码':
      return {
        icon: Code,
        bgColor: 'bg-[rgba(94,234,212,0.16)]',
        color: 'text-[#7bf0d8]',
        badgeClass: 'bg-[rgba(94,234,212,0.16)] text-[#7bf0d8] border border-[rgba(123,240,216,0.28)]'
      }
    default:
      return {
        icon: FileText,
        bgColor: 'bg-[rgba(154,164,217,0.16)]',
        color: 'text-[#9aa4d9]',
        badgeClass: 'bg-[rgba(154,164,217,0.16)] text-[#9aa4d9] border border-[rgba(154,164,217,0.24)]'
      }
  }
}
</script>

<style scoped>
/* === 父级 aside:占满父级高度,让两个子面板自适应均分 === */
#right-sidebar {
  height: 100%;
}

/* === Sidebar 容器:深蓝光底,与对话页面一致 === */
.edu-side-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  background:
    linear-gradient(135deg, rgba(22, 18, 32, 0.7), rgba(17, 14, 26, 0.5));
  backdrop-filter: blur(16px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 14px 42px rgba(3, 5, 22, 0.28);
  overflow: hidden;
}

.edu-side-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent),
    radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.06), transparent 34%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
  border-radius: inherit;
}

/* === 列表区域:占满容器内剩余高度,内部独立滚动 === */
.edu-side-panel__list {
  flex: 1 1 0;
  min-height: 0;
  padding-right: 2px;
}

/* === 顶部动作按钮:换一换 === */
.edu-side-panel__action {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.18);
  padding: 4px 10px;
  border-radius: 999px;
  transition: all 0.2s ease;
}
.edu-side-panel__action:hover {
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.18);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.2);
}

/* === 列表项:半透明白 + 紫色边框 hover === */
.edu-side-item {
  border: 1px solid transparent;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
  position: relative;
}
.edu-side-item:hover {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 4px 14px rgba(59, 130, 246, 0.1);
}

.edu-side-item__title:hover {
  color: #60a5fa !important;
}

.edu-side-item__star {
  color: #6f7a9e;
}
.edu-side-item__star:hover {
  background: rgba(255, 211, 51, 0.12);
  color: #fadb14;
}

/* === 底部脚注 === */
.edu-side-panel__footer {
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  flex-shrink: 0;
}

.edu-side-empty {
  background: rgba(14, 12, 21, 0.6);
  border: 1px dashed rgba(59, 130, 246, 0.18);
}

/* === 空状态 === */
.edu-side-empty {
  background: rgba(13, 15, 44, 0.6);
  border: 1px dashed rgba(0, 212, 255, 0.22);
}

/* === 滚动条:与 EduMind.vue 主文件一致 === */
.edu-side-scroll::-webkit-scrollbar {
  width: 4px;
}
.edu-side-scroll::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 4px;
}
.edu-side-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.35);
}

.rec-list-enter-active,
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
