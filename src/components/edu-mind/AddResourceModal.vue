<script setup lang="ts">
import { ref } from 'vue'
import { X, Save } from 'lucide-vue-next'
import type { Resource, ResourceCategory, Difficulty } from '../../types/edu-mind'

const emit = defineEmits<{
  close: []
  addResource: [newRes: Resource]
}>()

const title = ref('')
const description = ref('')
const category = ref<ResourceCategory>('文档')
const difficulty = ref<Difficulty>('中级')
const tagsInput = ref('')
const estimatedTime = ref('30分钟')
const contentMarkdown = ref('')
const authorName = ref('小明同学')

function handleSubmit() {
  if (!title.value.trim() || !description.value.trim()) {
    alert('请将标题和简介填写完整之后再提交。')
    return
  }

  const tags = tagsInput.value
    .split(/[，, ]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const newRes: Resource = {
    id: `custom-${Date.now()}`,
    title: title.value.trim(),
    description: description.value.trim(),
    category: category.value,
    tags: tags.length > 0 ? tags : ['自定义', category.value],
    date: new Date().toISOString().split('T')[0],
    views: 120,
    starred: false,
    difficulty: difficulty.value,
    author: authorName.value.trim() || '不愿透露姓名的小明',
    rating: 5.0,
    estimatedTime: estimatedTime.value,
    contentMarkdown: contentMarkdown.value.trim() || `## ${title.value}\n\n${description.value}\n\n*快来丰富您的私人学习笔记或教程内容吧！*`
  }

  emit('addResource', newRes)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-fade-in" id="add-modal-overlay">
    <div
      class="bg-white dark:bg-[#1e293b] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#e8e8e8] dark:border-slate-700/60 animate-scale-up"
      id="add-modal-container"
    >
      <!-- Header -->
      <div class="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-[#e8e8e8] dark:border-slate-700/60 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="p-1 px-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-[13px] font-bold">CREATE 新建</span>
          <h2 class="text-[16px] font-semibold text-slate-800 dark:text-white">发布全新学习资源</h2>
        </div>
        <button
          @click="emit('close')"
          class="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 rounded-lg text-slate-400 dark:text-slate-500 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Content Form Scrollable -->
      <form @submit.prevent="handleSubmit" class="flex-1 overflow-y-auto p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- Title -->
          <div class="col-span-2">
            <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">资源标题 *</label>
            <input
              type="text"
              required
              v-model="title"
              placeholder="例如：React 19 Hooks 高阶开发实战汇总"
              class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none"
            />
          </div>

          <!-- Author -->
          <div>
            <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">贡献作者名</label>
            <input
              type="text"
              v-model="authorName"
              placeholder="例如：小明同学"
              class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none"
            />
          </div>

          <!-- Estimated learning hours -->
          <div>
            <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">核心阅读学时</label>
            <input
              type="text"
              v-model="estimatedTime"
              placeholder="例如：45分钟"
              class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none"
            />
          </div>

          <!-- Category dropdown -->
          <div>
            <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">资源格式分类</label>
            <select
              v-model="category"
              class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none cursor-pointer"
            >
              <option value="文档">📃 文档</option>
              <option value="思维导图">🌐 思维导图</option>
              <option value="流程图">📌 流程图</option>
              <option value="习题">📝 习题</option>
              <option value="视频">🎥 视频</option>
              <option value="代码">💻 代码</option>
            </select>
          </div>

          <!-- Difficulty dropdown -->
          <div>
            <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">建议受众难度</label>
            <select
              v-model="difficulty"
              class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none cursor-pointer"
            >
              <option value="初级">🌱 初级 (新手友好)</option>
              <option value="中级">🍂 中级 (进阶积累)</option>
              <option value="高级">🔥 高级 (深度架构)</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">一句话简要介绍 *</label>
          <textarea
            required
            rows="2"
            v-model="description"
            placeholder="概括介绍这篇资源的重点和目标。让其他小明快速抓住要素。"
            class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none resize-none"
          />
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">检索标签 (由逗号或空格分隔)</label>
          <input
            type="text"
            v-model="tagsInput"
            placeholder="例如：React19 前端开发 性能优化"
            class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none"
          />
        </div>

        <!-- Core study resources document -->
        <div>
          <label class="block text-[13px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase flex justify-between">
            <span>详细 Markdown 学习正文内容</span>
            <span class="text-[12px] text-slate-400 dark:text-slate-500 font-normal">支持标准的超链接和文字段落</span>
          </label>
          <textarea
            rows="5"
            v-model="contentMarkdown"
            placeholder="# 标题...&#10;&#10;此处录下相关的笔记要点。&#10;- 原理一：&#10;- 原理二："
            class="w-full text-[14px] p-2.5 bg-white dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-600 dark:text-white focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7]/10 rounded-lg outline-none font-mono"
          />
        </div>
      </form>

      <!-- Footer controls -->
      <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-[#e8e8e8] dark:border-slate-700/60 flex justify-end gap-2.5 shrink-0">
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 bg-white dark:bg-slate-700 border border-[#e8e8e8] dark:border-slate-600 shadow-xs hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-[13px] font-semibold rounded-lg cursor-pointer"
        >
          取消
        </button>

        <button
          @click="handleSubmit"
          class="flex items-center gap-1 px-4 py-2 bg-[#4a6cf7] hover:bg-[#3b5bdb] text-white border border-[#4a6cf7] text-[13px] font-semibold rounded-lg cursor-pointer shadow-sm active:transform active:scale-95"
        >
          <Save class="w-3.5 h-3.5" />
          <span>发布入库</span>
        </button>
      </div>
    </div>
  </div>
</template>
