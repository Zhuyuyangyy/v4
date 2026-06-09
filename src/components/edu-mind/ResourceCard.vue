<template>
  <div
    v-if="viewMode === 'list'"
    @click="emit('cardClick', resource.id)"
    class="edu-resource-card edu-resource-card--list flex items-center gap-4 p-4 rounded-xl cursor-pointer relative group"
  >
    <div
      class="edu-resource-card__category inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[12px] font-semibold shrink-0 w-20 text-center flex-col gap-1"
    >
      <component :is="categoryStyle.icon" class="w-4 h-4" />
      <span>{{ resource.category }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="text-[15px] font-bold text-white truncate">{{ resource.title }}</h4>
        <span class="edu-resource-card__level text-[11px] font-semibold px-1.5 py-0.5 rounded">
          {{ resource.difficulty }}
        </span>
      </div>
      <p class="text-[13px] text-[#98a0cf] line-clamp-1 leading-relaxed">
        {{ resource.description }}
      </p>
      <div class="flex flex-wrap gap-1.5 mt-1.5">
        <span
          v-for="(tag, idx) in resource.tags"
          :key="idx"
          class="px-1.5 py-0.5 bg-white/5 text-[#8f98d3] text-[11px] rounded-sm border border-white/5"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-end shrink-0 text-right gap-1.5 min-w-[90px]">
      <div class="text-[12px] text-[#8f98d3] flex items-center gap-1">
        <Eye class="w-3 h-3" />
        <span>{{ resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views }}</span>
      </div>
      <span class="text-[11px] text-[#6b74a8] font-mono">{{ resource.date }}</span>
    </div>

    <div class="flex items-center gap-1 shrink-0" @click.stop>
      <button
        @click="emit('toggleStar', resource.id)"
        class="p-1.5 rounded-lg hover:bg-white/10 text-[#6b74a8] hover:text-[#fadb14] transition-colors cursor-pointer"
      >
        <Star :class="['w-4 h-4', resource.starred ? 'text-[#fadb14] fill-[#fadb14]' : '']" />
      </button>

      <div class="relative" ref="dropdownRef">
        <button
          @click="showOptions = !showOptions"
          class="p-1.5 rounded-lg hover:bg-white/10 text-[#6b74a8] hover:text-slate-300 transition-colors cursor-pointer"
        >
          <MoreVertical class="w-4 h-4" />
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 mt-1.5 w-36 bg-[#1e1b4b] rounded-lg shadow-xl border border-[rgba(117,98,255,0.25)] py-1 z-20 animate-fade-in text-left"
        >
          <button
            @click="handleMarkCompleted"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-emerald-400 hover:bg-emerald-900/30 font-medium"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            <span>标记学完 (+{{ simulatedHours }}h)</span>
          </button>
          <button
            @click="handleToggleStarFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-300 hover:bg-white/5"
          >
            <Star class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ resource.starred ? '取消收藏' : '加入收藏' }}</span>
          </button>
          <div class="border-t border-white/10 my-1"></div>
          <button
            @click="handleCardClickFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-blue-400 hover:bg-blue-900/30"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>新窗口阅读</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Grid 模式 -->
  <div
    v-else
    @click="emit('cardClick', resource.id)"
    class="edu-resource-card rounded-xl p-4 cursor-pointer relative flex flex-col justify-between h-[245px] group"
  >
    <div>
      <div class="flex justify-between items-center mb-2.5">
        <div class="edu-resource-card__category inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[13px] font-semibold">
          <component :is="categoryStyle.icon" class="w-3.5 h-3.5 shrink-0" />
          <span>{{ resource.category }}</span>
        </div>

        <div class="flex items-center gap-1" @click.stop>
          <button
            @click="emit('toggleStar', resource.id)"
            class="p-1 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-[#6b74a8] hover:text-[#fadb14] cursor-pointer"
            title="加入我的收藏"
          >
            <Star :class="['w-4 h-4', resource.starred ? 'text-[#fadb14] fill-[#fadb14]' : '']" />
          </button>
        </div>
      </div>

      <div class="mb-2.5">
        <div class="flex items-center gap-1.5 mb-1 flex-wrap">
          <h4
            class="text-[16px] font-bold text-white leading-snug line-clamp-1 duration-150 transition-colors"
            :title="resource.title"
          >
            {{ resource.title }}
          </h4>
          <span class="edu-resource-card__level text-[11px] font-semibold px-1.5 py-0.5 rounded shrink-0">
            {{ resource.difficulty }}
          </span>
        </div>
        <p
          class="text-[13px] text-[#98a0cf] line-clamp-2 leading-relaxed h-[36px]"
          :title="resource.description"
        >
          {{ resource.description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-3.5 select-none">
        <span
          v-for="(tag, idx) in resource.tags"
          :key="idx"
          class="px-1.5 py-0.5 bg-white/5 text-[#8f98d3] text-[11px] rounded-sm border border-white/5"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="pt-2.5 flex justify-between items-center mt-auto">
      <div class="text-[12px] text-[#8b92cc] flex items-center gap-2 font-mono">
        <span>{{ resource.date }}</span>
        <span class="w-1 h-1 bg-[#4a4680] rounded-full"></span>
        <span class="flex items-center gap-0.5">
          <Eye class="w-3 h-3" />
          {{ resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views }}
        </span>
      </div>

      <span class="edu-resource-card__cta flex items-center justify-center gap-1 text-[13px] font-bold transition-transform duration-200">
        <BookOpen class="w-3 h-3" />
        查看详情
      </span>
    </div>

    <div class="absolute top-2 right-2" @click.stop>
      <div class="relative" ref="dropdownRef">
        <button
          @click="showOptions = !showOptions"
          class="p-1 rounded hover:bg-white/10 text-[#6b74a8] hover:text-slate-300 shrink-0 cursor-pointer transition-colors"
        >
          <MoreVertical class="w-3.5 h-3.5" />
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 mt-1 w-36 bg-[#1e1b4b] rounded-lg shadow-xl border border-[rgba(117,98,255,0.25)] py-1 z-20 animate-fade-in text-left"
        >
          <button
            @click="handleMarkCompleted"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-emerald-400 hover:bg-emerald-900/30 font-medium whitespace-nowrap"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            <span>标记学完 (+{{ simulatedHours }}h)</span>
          </button>
          <button
            @click="handleToggleStarFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-300 hover:bg-white/5 whitespace-nowrap"
          >
            <Star class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ resource.starred ? '取消收藏' : '加入收藏' }}</span>
          </button>
          <div class="border-t border-white/10 my-1"></div>
          <button
            @click="handleCardClickFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-blue-400 hover:bg-blue-900/30 whitespace-nowrap"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>新窗口阅读</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Component } from 'vue'
import {
  Star,
  Eye,
  MoreVertical,
  FileText,
  Video,
  HelpCircle,
  Code,
  Network,
  CheckCircle,
  BookOpen
} from 'lucide-vue-next'
import { type Resource, type ResourceCategory } from '../../types/edu-mind'

const props = defineProps<{
  resource: Resource
  viewMode: 'grid' | 'list'
}>()

const emit = defineEmits<{
  toggleStar: [id: string]
  cardClick: [id: string]
  markAsCompleted: [hours: number, title: string]
}>()

const showOptions = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function getCategoryStyles(category: ResourceCategory): { icon: Component } {
  switch (category) {
    case '文档': return { icon: FileText }
    case '思维导图': return { icon: Network }
    case '流程图': return { icon: Network }
    case '习题': return { icon: HelpCircle }
    case '视频': return { icon: Video }
    case '代码': return { icon: Code }
    default: return { icon: FileText }
  }
}

const categoryStyle = computed(() => getCategoryStyles(props.resource.category))

const simulatedHours = computed(() => {
  const minText = props.resource.estimatedTime || '30分钟'
  const parsed = parseInt(minText)
  return isNaN(parsed) ? 1.0 : parseFloat((parsed / 60).toFixed(1))
})

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showOptions.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function handleMarkCompleted() {
  emit('markAsCompleted', simulatedHours.value, props.resource.title)
  showOptions.value = false
}

function handleToggleStarFromMenu() {
  emit('toggleStar', props.resource.id)
  showOptions.value = false
}

function handleCardClickFromMenu() {
  emit('cardClick', props.resource.id)
  showOptions.value = false
}
</script>

<style scoped>
.edu-resource-card {
  border: none;
  background:
    linear-gradient(180deg, rgba(29, 27, 83, 0.82), rgba(11, 13, 46, 0.96)),
    radial-gradient(circle at 26% 0%, rgba(117, 71, 255, 0.22), transparent 36%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 14px 42px rgba(3, 5, 22, 0.28);
  overflow: hidden;
}

.edu-resource-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, rgba(149, 118, 255, 0.08), transparent),
    radial-gradient(circle at 100% 100%, rgba(79, 56, 214, 0.2), transparent 34%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
  border-radius: inherit;
}

.edu-resource-card:hover {
  transform: translateY(-4px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 18px 52px rgba(17, 10, 64, 0.5),
    0 0 28px rgba(116, 79, 255, 0.22);
}

.edu-resource-card:hover::before {
  opacity: 1;
}

.edu-resource-card--list:hover {
  transform: none;
}

.edu-resource-card__category {
  background: rgba(92, 75, 226, 0.26);
  color: #c7d7ff;
  border: 1px solid rgba(134, 116, 255, 0.3);
  box-shadow: inset 0 0 16px rgba(118, 88, 255, 0.12);
}

.edu-resource-card__level {
  border-color: rgba(255, 172, 83, 0.22);
  background: rgba(255, 143, 58, 0.14);
  color: #ffae4a;
}

.edu-resource-card__cta {
  min-width: 0;
  max-width: 130px;
  height: 34px;
  padding: 0 14px;
  color: #fff;
  border-radius: 7px;
  background: linear-gradient(135deg, #7e3cff, #4e33b6);
  box-shadow: 0 10px 24px rgba(76, 48, 180, 0.3);
}

.edu-resource-card:hover .edu-resource-card__cta {
  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(126, 78, 255, 0.44);
}
</style>
