<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-[60] overflow-y-auto backdrop-blur-sm animate-fade-in"
      id="resource-modal-overlay"
      @click.self="emit('close')"
    >
      <div
        class="edu-detail-modal bg-white dark:bg-[#1e293b] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#e8e8e8] dark:border-slate-700/60 modal-enter"
        id="resource-modal-container"
        @click.stop
      >
      <div class="bg-gradient-to-r from-slate-50 to-[#f0f4ff]/40 dark:from-slate-800 dark:to-[#4a6cf7]/10 px-6 py-4 border-b border-[#e8e8e8] dark:border-slate-700/60 flex justify-between items-center relative">
        <div class="flex items-center gap-3">
          <span class="text-[13px] font-bold px-2.5 py-1 bg-[#f0f4ff] dark:bg-[#4a6cf7]/15 text-[#4a6cf7] dark:text-[#6a8cff] rounded-md uppercase border border-[#dbe4ff] dark:border-[#4a6cf7]/30">
            {{ resource.category }}
          </span>
          <span
            :class="[
              'text-[12px] font-semibold px-2 py-0.5 rounded',
              resource.difficulty === '高级'
                ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                : resource.difficulty === '中级'
                  ? 'bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400'
                  : 'bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400'
            ]"
          >
            {{ resource.difficulty }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="handleShare"
            class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
            title="分享文章"
          >
            <Share class="w-4 h-4" />
          </button>

          <button
            @click="emit('toggleStar', resource.id)"
            class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
            :title="resource.starred ? '取消收藏' : '加入收藏'"
          >
            <Heart :class="['w-4 h-4', resource.starred ? 'fill-red-500 text-red-500' : '']" />
          </button>

          <button
            @click="emit('close')"
            class="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 rounded-lg text-slate-400 dark:text-slate-500 transition-colors z-10 cursor-pointer"
            id="resource-modal-close"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
              {{ resource.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-[14px] text-slate-500 dark:text-slate-400 py-2 border-b border-dashed border-[#e8e8e8] dark:border-slate-700/60">
              <div class="flex items-center gap-1.5">
                <User class="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>作者: <strong class="text-slate-700 dark:text-slate-300">{{ resource.author }}</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>预计学时: <strong class="text-slate-700 dark:text-slate-300">{{ resource.estimatedTime || '30分钟' }}</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <Eye class="w-4 h-4 text-slate-400" />
                <span>阅读次数: {{ resource.views }}</span>
              </div>
            </div>
          </div>

          <div class="markdown-body text-slate-700 dark:text-slate-300 leading-relaxed text-[16px]">
            <div v-if="resource.contentMarkdown" class="whitespace-pre-line prose select-text space-y-4">
              {{ resource.contentMarkdown }}
            </div>
            <div v-else class="text-slate-400 dark:text-slate-500 italic py-4 text-center">
              该资源正待进一步教研排版上线。您可以直接标记本节课程进度。
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-[#e8e8e8] dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
            <div>
              <p class="text-[15px] font-semibold text-slate-800 dark:text-white">您对本节学习资料的内容评价</p>
              <p class="text-[13px] text-[#8c8c8c] dark:text-slate-500">评分将作为系统向其他小明推荐模型的打分标准</p>
            </div>
            <div class="flex items-center gap-1">
              <button
                v-for="starValue in [1, 2, 3, 4, 5]"
                :key="starValue"
                @mouseenter="hoverRating = starValue"
                @mouseleave="hoverRating = null"
                @click="handleRate(starValue)"
                class="p-1 hover:scale-110 transition-transform cursor-pointer text-slate-300"
              >
                <Star
                  :class="[
                    'w-5 h-5',
                    (hoverRating !== null ? starValue <= hoverRating : starValue <= rating)
                      ? 'text-[#fadb14] fill-[#fadb14]'
                      : 'text-slate-300'
                  ]"
                />
              </button>
              <span class="text-[14px] font-semibold text-slate-600 dark:text-slate-400 gap-1 ml-1">
                ({{ rating.toFixed(1) }}分)
              </span>
            </div>
          </div>
        </div>

        <div class="md:col-span-1 flex flex-col gap-5 mt-6 md:mt-0">
          <div class="bg-[#f0f4ff]/50 dark:bg-[#4a6cf7]/10 rounded-xl p-4 border border-[#d9e2ff] dark:border-[#4a6cf7]/20">
            <h3 class="text-[15px] font-semibold text-slate-800 dark:text-white mb-2">学习控制台</h3>

            <div v-if="isCompleted" class="bg-emerald-50 text-emerald-700 rounded-lg p-2.5 text-[14px] border border-emerald-100 flex items-center gap-2">
              <CheckCircle class="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span class="font-semibold">您已学完本节内容！</span>
                <p class="text-[12px] text-emerald-600 mt-0.5">已计入进度统计，继续保持努力！</p>
              </div>
            </div>

            <div v-else>
              <p class="text-[13px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                读完这些重点内容并理解后，可以将其标记为"已学完"。你将增加
                <strong class="text-[#4a6cf7] dark:text-[#6a8cff]">{{ estimatedHours }} 小时</strong> 个人本周学习进度！
              </p>
              <button
                @click="handleCompleteStudy"
                class="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#4a6cf7] hover:bg-[#3b5bdb] text-white rounded-lg text-[14px] font-semibold transition-all active:transform active:scale-95 cursor-pointer shadow-sm"
              >
                <CheckCircle class="w-4 h-4" />
                <span>标记学完 (+{{ estimatedHours }}h)</span>
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-[#e8e8e8] dark:border-slate-700/60 flex-1 flex flex-col min-h-[180px]">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[14px] font-semibold text-[#1a1a2e] dark:text-white">我的课堂笔记</span>
              <span class="text-[11px] text-[#8c8c8c] dark:text-slate-500 font-medium bg-[#f5f7fa] dark:bg-slate-700 px-1.5 py-0.5 rounded">
                本地私密存储
              </span>
            </div>
            <textarea
              v-model="notes"
              placeholder="可以在这里记下学习关键疑问点、核心逻辑备忘、刷题心得，点击下方一键保存。"
              class="flex-1 w-full text-[14px] text-slate-600 dark:text-slate-300 p-2.5 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 focus:border-[#4a6cf7] focus:bg-white dark:focus:bg-slate-600 focus:ring-1 focus:ring-[#f0f4ff] rounded-lg outline-none resize-none placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              @click="handleSaveNotes"
              class="w-full mt-3 flex items-center justify-center gap-1.5 py-2 hover:bg-[#4a6cf7] border hover:border-[#4a6cf7] hover:text-white border-[#e2e8f0] dark:border-slate-600 text-[#595959] dark:text-slate-400 rounded-lg text-[13px] font-medium transition-all cursor-pointer"
            >
              <Save class="w-3.5 h-3.5" />
              <span>{{ notesSaved ? '笔记已保存' : '保存笔记' }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-[#e8e8e8] dark:border-slate-700/60 flex justify-between items-center shrink-0">
        <p class="text-[13px] text-slate-400 dark:text-slate-500">
          正在学习的资源 ID: <code class="font-mono">{{ resource.id }}</code>
        </p>
        <button
          @click="handlePrint"
          class="flex items-center gap-1 text-[13px] text-slate-500 dark:text-slate-400 hover:text-[#4a6cf7] dark:hover:text-[#6a8cff] cursor-pointer"
        >
          <Printer class="w-3.5 h-3.5" />
          <span>打印备份</span>
        </button>
      </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  X,
  Clock,
  User,
  Eye,
  Star,
  Heart,
  Save,
  CheckCircle,
  Printer,
  Share
} from 'lucide-vue-next'
import { type Resource } from '../../types/edu-mind'

const props = defineProps<{
  resource: Resource
  weeklyHours: number
}>()

const emit = defineEmits<{
  close: []
  toggleStar: [id: string]
  markAsCompleted: [hours: number, title: string]
}>()

const rating = ref<number>(props.resource.rating || 4.5)
const hoverRating = ref<number | null>(null)
const notes = ref<string>('')
const notesSaved = ref(false)
const isCompleted = ref(false)

const estimatedHours = computed(() => {
  const text = props.resource.estimatedTime || '30分钟'
  const parsed = parseInt(text)
  return isNaN(parsed) ? 1.0 : parseFloat((parsed / 60).toFixed(1))
})

function loadLocalStorage() {
  const savedNotes = localStorage.getItem(`notes-${props.resource.id}`)
  if (savedNotes) {
    notes.value = savedNotes
  }
  const completedState = localStorage.getItem(`completed-${props.resource.id}`)
  if (completedState === 'true') {
    isCompleted.value = true
  }
}

onMounted(loadLocalStorage)

watch(() => props.resource.id, () => {
  loadLocalStorage()
  rating.value = props.resource.rating || 4.5
  hoverRating.value = null
  isCompleted.value = false
})

function handleSaveNotes() {
  localStorage.setItem(`notes-${props.resource.id}`, notes.value)
  notesSaved.value = true
  setTimeout(() => {
    notesSaved.value = false
  }, 2000)
}

function handleCompleteStudy() {
  if (isCompleted.value) {
    alert('您已经完成过该资源的阅读了。')
    return
  }
  emit('markAsCompleted', estimatedHours.value, props.resource.title)
  isCompleted.value = true
  localStorage.setItem(`completed-${props.resource.id}`, 'true')
}

function handleRate(starValue: number) {
  rating.value = starValue
  alert(`评价成功！您给本资源打出了 ${starValue} 星高分。`)
}

function handleShare() {
  navigator.clipboard.writeText(window.location.href)
  alert('已复制文章链接，可在新标签页分享打开。')
}

function handlePrint() {
  window.print()
}
</script>

<style scoped>
/* ===== DetailModal 深紫光主题 —— 覆盖所有内联浅色硬编码 ===== */

.modal-enter {
  animation: modalEnter 0.2s ease-out;
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* --- 模态容器主体 --- */
.edu-detail-modal {
  background:
    linear-gradient(180deg, rgba(29, 27, 83, 0.82), rgba(11, 13, 46, 0.96)),
    radial-gradient(circle at 26% 0%, rgba(117, 71, 255, 0.22), transparent 36%);
  border: 1px solid rgba(117, 98, 255, 0.22) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 24px 70px rgba(3, 5, 22, 0.65),
    0 0 50px rgba(116, 79, 255, 0.16) !important;
  color: #f4f2ff;
}

/* --- 头部栏 --- */
#resource-modal-container > :first-child {
  background:
    linear-gradient(90deg, rgba(11, 13, 46, 0.6), rgba(44, 18, 102, 0.35)) !important;
  border-bottom: 1px solid rgba(117, 98, 255, 0.18) !important;
}

/* 头部徽章:分类 */
#resource-modal-container > :first-child > :first-child > :first-child > span:first-child {
  background: rgba(140, 92, 255, 0.18) !important;
  color: #c4b5fd !important;
  border: 1px solid rgba(186, 142, 255, 0.28) !important;
}

/* 头部徽章:难度 */
#resource-modal-container > :first-child > :first-child > :first-child > span:nth-child(2) {
  background: rgba(255, 176, 108, 0.16) !important;
  color: #ffb46c !important;
  border: none;
}

/* 头部图标按钮 */
#resource-modal-container > :first-child > :last-child > button {
  color: #9aa4d9 !important;
}
#resource-modal-container > :first-child > :last-child > button:hover {
  background: rgba(140, 92, 255, 0.16) !important;
  color: #c4b5fd !important;
}

/* --- 右上角关闭按钮 hover 红色 --- */
#resource-modal-container > :first-child > :last-child > button:last-child:hover {
  background: rgba(220, 60, 60, 0.18) !important;
  color: #ff7080 !important;
}

/* --- 内容区主栏标题 --- */
.edu-detail-modal h1,
.edu-detail-modal .font-bold {
  color: #f4f2ff !important;
}

/* --- 作者/学时/阅读行 --- */
.edu-detail-modal .flex.flex-wrap {
  border-bottom-color: rgba(117, 98, 255, 0.14) !important;
}

/* --- 内容正文 --- */
.edu-detail-modal .markdown-body {
  color: #b8c4dc !important;
}

/* --- 评分区块底色 --- */
.edu-detail-modal .bg-slate-50,
.edu-detail-modal .dark\:bg-slate-800\/60 {
  background: rgba(13, 15, 44, 0.72) !important;
  border-color: rgba(117, 98, 255, 0.14) !important;
}

/* --- 学习控制台区 --- */
.edu-detail-modal .bg-\[#f0f4ff\]\/50,
.edu-detail-modal .dark\:bg-\[#4a6cf7\]\/10 {
  background: rgba(140, 92, 255, 0.12) !important;
  border-color: rgba(140, 92, 255, 0.22) !important;
}

/* --- 完成提示 (绿色) --- */
.edu-detail-modal .bg-emerald-50 {
  background: rgba(6, 120, 80, 0.18) !important;
  color: #6ee7b7 !important;
  border-color: rgba(6, 120, 80, 0.28) !important;
}
.edu-detail-modal .text-emerald-600,
.edu-detail-modal .text-emerald-700 {
  color: #6ee7b7 !important;
}

/* --- 标记学完 CTA 按钮 --- */
.edu-detail-modal .bg-\[#4a6cf7\] {
  background: linear-gradient(135deg, #7e3cff, #4e33b6) !important;
  color: #fff !important;
}
.edu-detail-modal .hover\:bg-\[#3b5bdb\]:hover {
  background: linear-gradient(135deg, #6d2de0, #3f28a0) !important;
}

/* --- 笔记区块 --- */
.edu-detail-modal .bg-white,
.edu-detail-modal .dark\:bg-slate-800 {
  background: rgba(13, 15, 44, 0.72) !important;
  border-color: rgba(117, 98, 255, 0.14) !important;
}
.edu-detail-modal textarea {
  background: rgba(13, 15, 44, 0.62) !important;
  border-color: rgba(117, 98, 255, 0.18) !important;
  color: #d8def0 !important;
}
.edu-detail-modal textarea::placeholder {
  color: #6f7a9e !important;
}
.edu-detail-modal textarea:focus {
  border-color: rgba(140, 92, 255, 0.5) !important;
  box-shadow: 0 0 0 3px rgba(140, 92, 255, 0.12) !important;
  background: rgba(13, 15, 44, 0.82) !important;
}

/* --- 笔记保存按钮 --- */
.edu-detail-modal .border-\[\#e2e8f0\] {
  border-color: rgba(117, 98, 255, 0.18) !important;
  color: #9aa4d9 !important;
}
.edu-detail-modal .hover\:bg-\[#4a6cf7\]:hover {
  background: rgba(140, 92, 255, 0.28) !important;
  border-color: rgba(140, 92, 255, 0.42) !important;
  color: #c4b5fd !important;
}

/* --- 底部栏 --- */
#resource-modal-container > div:last-child {
  background: rgba(11, 13, 44, 0.82) !important;
  border-top: 1px solid rgba(117, 98, 255, 0.14) !important;
}
#resource-modal-container > div:last-child p,
#resource-modal-container > div:last-child button {
  color: #6f7a9e !important;
}
#resource-modal-container > div:last-child button:hover {
  color: #c4b5fd !important;
}

/* --- 通用:所有白色文字 → 深色主文字 --- */
.edu-detail-modal .text-slate-900,
.edu-detail-modal .text-slate-800,
.edu-detail-modal .dark\:text-white,
.edu-detail-modal .text-\[\#1a1a2e\] {
  color: #f4f2ff !important;
}
.edu-detail-modal .text-slate-700,
.edu-detail-modal .dark\:text-slate-300 {
  color: #b8c4dc !important;
}
.edu-detail-modal .text-slate-600,
.edu-detail-modal .text-slate-500,
.edu-detail-modal .dark\:text-slate-400,
.edu-detail-modal .text-\[\#8c8c8c\] {
  color: #9aa4d9 !important;
}
.edu-detail-modal .text-slate-400,
.edu-detail-modal .dark\:text-slate-500 {
  color: #6f7a9e !important;
}
.edu-detail-modal .text-slate-300 {
  color: #4a4680 !important;
}

/* --- 通用:所有灰色底/边框 → 深紫光 --- */
.edu-detail-modal .bg-slate-50 {
  background: rgba(13, 15, 44, 0.72) !important;
}
.edu-detail-modal .bg-\[#f5f7fa\] {
  background: rgba(13, 15, 44, 0.62) !important;
}
.edu-detail-modal .bg-\[rgb\(249,250,251\)\],
.edu-detail-modal .bg-\[rgb\(245,247,250\)\] {
  background: rgba(13, 15, 44, 0.62) !important;
}
.edu-detail-modal .bg-\[#f0f4ff\] {
  background: rgba(140, 92, 255, 0.18) !important;
  color: #c4b5fd !important;
}

/* hover 效果 */
.edu-detail-modal .hover\:bg-slate-200:hover {
  background: rgba(140, 92, 255, 0.16) !important;
  color: #c4b5fd !important;
}
.edu-detail-modal .hover\:bg-slate-100:hover {
  background: rgba(140, 92, 255, 0.12) !important;
}
.edu-detail-modal .hover\:bg-red-50:hover {
  background: rgba(220, 60, 60, 0.18) !important;
  color: #ff7080 !important;
}

/* border 覆盖 */
.edu-detail-modal .border-\[\#e8e8e8\] {
  border-color: rgba(117, 98, 255, 0.14) !important;
}
.edu-detail-modal .border-slate-200,
.edu-detail-modal .dark\:border-slate-600 {
  border-color: rgba(117, 98, 255, 0.18) !important;
}
.edu-detail-modal .border-\[\#dbe4ff\] {
  border-color: rgba(186, 142, 255, 0.28) !important;
}
.edu-detail-modal .border-\[\#d9e2ff\] {
  border-color: rgba(140, 92, 255, 0.22) !important;
}
.edu-detail-modal .border-emerald-100 {
  border-color: rgba(6, 120, 80, 0.28) !important;
}
.edu-detail-modal .border-dashed {
  border-style: dashed;
}
</style>
