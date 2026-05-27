<template>
  <div
    v-if="viewMode === 'list'"
    @click="emit('cardClick', resource.id)"
    :class="[
      'w-full bg-white dark:bg-[#1e293b] rounded-xl p-4 border transition-all duration-200 hover:shadow-md flex items-center gap-4 cursor-pointer relative',
      resource.featured
        ? 'border-[#4a6cf7] bg-[#fafbff] dark:bg-[#4a6cf7]/10'
        : 'border-[#e8e8e8] hover:border-[#bfbfbf] dark:border-slate-700/60 dark:hover:border-slate-600'
    ]"
  >
    <div
      :class="[
        'px-2.5 py-1.5 rounded-lg flex flex-col items-center justify-center shrink-0 w-20 text-center gap-1',
        categoryStyle.containerClass
      ]"
    >
      <component :is="categoryStyle.icon" class="w-4 h-4" />
      <span class="text-[12px] font-semibold dark:text-slate-200">{{ resource.category }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="text-[16px] font-semibold text-[#1a1a2e] dark:text-white truncate">{{ resource.title }}</h4>
        <span
          :class="[
            'text-[11px] font-medium px-1.5 py-0.5 rounded',
            resource.difficulty === '高级'
              ? 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
              : resource.difficulty === '中级'
                ? 'bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
                : 'bg-green-50 text-green-600 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
          ]"
        >
          {{ resource.difficulty }}
        </span>
      </div>
      <p class="text-[14px] text-[#8c8c8c] dark:text-slate-500 line-clamp-1 mb-2 leading-relaxed">
        {{ resource.description }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="(tag, idx) in resource.tags"
          :key="idx"
          class="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded px-2 py-0.5 text-[12px]"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-end shrink-0 text-right gap-1.5 min-w-[100px]">
      <div class="text-[13px] text-[#8c8c8c] dark:text-slate-500 flex items-center gap-1">
        <Eye class="w-3.5 h-3.5" />
        <span>{{ resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views }} 次阅读</span>
      </div>
      <span class="text-[13px] text-[#bfbfbf] dark:text-slate-600 font-mono">{{ resource.date }}</span>
    </div>

    <div class="flex items-center gap-1 shrink-0" @click.stop>
      <button
        @click="emit('toggleStar', resource.id)"
        class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#d9d9d9] hover:text-[#faad14] transition-colors cursor-pointer"
      >
        <Star :class="['w-4 h-4', resource.starred ? 'text-[#fadb14] fill-[#fadb14]' : '']" />
      </button>

      <div class="relative" ref="dropdownRef">
        <button
          @click="showOptions = !showOptions"
          class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#bfbfbf] hover:text-[#595959] dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          <MoreVertical class="w-4 h-4" />
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 mt-1.5 w-36 bg-white dark:bg-[#1e293b] rounded-lg shadow-xl border border-[#e8e8e8] dark:border-slate-700/60 py-1 z-20 animate-fade-in text-left"
        >
          <button
            @click="handleMarkCompleted"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 font-medium"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            <span>标记学完 (+{{ simulatedHours }}h)</span>
          </button>
          <button
            @click="handleToggleStarFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Star class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ resource.starred ? '取消收藏' : '加入收藏' }}</span>
          </button>
          <div class="border-t border-slate-100 dark:border-slate-700 my-1"></div>
          <button
            @click="handleCardClickFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>新窗口阅读</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    @click="emit('cardClick', resource.id)"
    :class="[
      'bg-white dark:bg-[#1e293b] border rounded-xl p-4 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative flex flex-col justify-between',
      resource.featured
        ? 'border-[#4a6cf7] bg-gradient-to-b from-[#fafbff] to-white dark:from-[#4a6cf7]/10 dark:to-[#1e293b]'
        : 'border-[#e8e8e8] hover:border-[#bfbfbf] dark:border-slate-700 dark:hover:border-slate-600'
    ]"
  >
    <div>
      <div class="flex justify-between items-center mb-2.5">
        <div
          :class="[
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[13px] font-semibold shadow-2xs',
            categoryStyle.containerClass
          ]"
        >
          <component :is="categoryStyle.icon" class="w-3.5 h-3.5 shrink-0" />
          <span>{{ resource.category }}</span>
        </div>

        <div class="flex items-center gap-1" @click.stop>
          <button
            @click="emit('toggleStar', resource.id)"
            class="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 transition-all text-[#d9d9d9] hover:text-[#fadb14] cursor-pointer"
            title="加入我的收藏"
          >
            <Star :class="['w-4 h-4', resource.starred ? 'text-[#fadb14] fill-[#fadb14]' : '']" />
          </button>
        </div>
      </div>

      <div class="mb-2">
        <div class="flex items-center gap-1.5 mb-1 flex-wrap">
          <h4
            class="text-[16px] font-semibold text-[#1a1a2e] dark:text-white leading-snug line-clamp-1 hover:text-[#4a6cf7] dark:hover:text-[#6a8cff] duration-150 transition-colors"
            :title="resource.title"
          >
            {{ resource.title }}
          </h4>
          <span
            :class="[
              'text-[11px] font-medium px-1.5 py-0.2 rounded shrink-0',
              resource.difficulty === '高级'
                ? 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                : resource.difficulty === '中级'
                  ? 'bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
                  : 'bg-green-50 text-green-600 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
            ]"
          >
            {{ resource.difficulty }}
          </span>
        </div>
        <p
          class="text-[14px] text-[#8c8c8c] dark:text-slate-500 line-clamp-2 leading-relaxed h-[36px]"
          :title="resource.description"
        >
          {{ resource.description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-3.5 select-none">
        <span
          v-for="(tag, idx) in resource.tags"
          :key="idx"
          class="px-1.5 py-0.5 bg-[#f5f7fa] dark:bg-slate-800 text-[#8c8c8c] dark:text-slate-400 text-[12px] rounded-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="border-t border-[#e8e8e8] dark:border-slate-700/60 pt-2.5 flex justify-between items-center mt-2.5">
      <div class="flex items-center gap-2 text-[13px] text-[#8c8c8c] dark:text-slate-500">
        <span class="font-mono text-[#bfbfbf] dark:text-slate-600">{{ resource.date }}</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
        <span class="flex items-center gap-0.5">
          <Eye class="w-3 h-3 text-[#bfbfbf] dark:text-slate-600" />
          {{ resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views }} 次阅读
        </span>
      </div>

      <div class="relative" ref="dropdownRef" @click.stop>
        <button
          @click="showOptions = !showOptions"
          class="p-1 rounded text-[#bfbfbf] hover:text-[#595959] dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
        >
          <MoreVertical class="w-3.5 h-3.5" />
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 bottom-full mb-1.5 w-36 bg-white dark:bg-[#1e293b] rounded-lg shadow-xl border border-[#e8e8e8] dark:border-slate-700/60 py-1 z-20 animate-fade-in text-left"
        >
          <button
            @click="handleMarkCompleted"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 font-medium whitespace-nowrap"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            <span>标记学完 (+{{ simulatedHours }}h)</span>
          </button>
          <button
            @click="handleToggleStarFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap"
          >
            <Star class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ resource.starred ? '取消收藏' : '加入收藏' }}</span>
          </button>
          <div class="border-t border-[#e8e8e8] dark:border-slate-700/60 my-1"></div>
          <button
            @click="handleCardClickFromMenu"
            class="w-full text-left flex items-center gap-2 px-3 py-1.5 text-[13px] text-blue-600 dark:text-blue-400 hover:bg-[#ebf3ff] dark:hover:bg-blue-900/30 whitespace-nowrap"
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

function getCategoryStyles(category: ResourceCategory): { icon: Component; containerClass: string } {
  switch (category) {
    case '文档':
      return {
        icon: FileText,
        containerClass: 'bg-[#e6f4ff] text-[#1677ff] border border-[#bae0ff]'
      }
    case '思维导图':
      return {
        icon: Network,
        containerClass: 'bg-[#f6ffed] text-[#52c41a] border border-[#d9f7be]'
      }
    case '流程图':
      return {
        icon: Network,
        containerClass: 'bg-[#f9f0ff] text-[#722ed1] border border-[#efdbff]'
      }
    case '习题':
      return {
        icon: HelpCircle,
        containerClass: 'bg-[#fff7e6] text-[#fa8c16] border border-[#ffd591]'
      }
    case '视频':
      return {
        icon: Video,
        containerClass: 'bg-[#fff1f0] text-[#ff4d4f] border border-[#ffccc7]'
      }
    case '代码':
      return {
        icon: Code,
        containerClass: 'bg-[#e6fffb] text-[#13c2c2] border border-[#b5f5ec]'
      }
    default:
      return {
        icon: FileText,
        containerClass: 'bg-gray-100 text-gray-700 border border-gray-200'
      }
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
