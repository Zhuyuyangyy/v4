<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  Search,
  Star,
  FolderOpen,
  Plus,
  Video,
  FileText,
  Code,
  BookOpen,
  Clock,
  Trash2,
  FolderInput,
  CheckSquare,
  Square,
  ChevronDown,
  ArrowUpDown,
  Bookmark,
  X
} from 'lucide-vue-next'

interface CollectionFolder {
  id: string
  name: string
  count: number
  color: string
  updatedAt: string
}

interface FavoriteItem {
  id: string
  type: 'video' | 'document' | 'exercise' | 'note'
  title: string
  sourceCourse: string
  bookmarkedAt: string
  tags: string[]
  starred: boolean
  folderId: string
}

const collectionFolders = reactive<CollectionFolder[]>([
  { id: 'f1', name: '前端开发', count: 8, color: '#4a6cf7', updatedAt: '2小时前' },
  { id: 'f2', name: '算法与数据结构', count: 5, color: '#f59e0b', updatedAt: '1天前' },
  { id: 'f3', name: '人工智能', count: 6, color: '#10b981', updatedAt: '3天前' },
  { id: 'f4', name: '数据库', count: 3, color: '#00d4ff', updatedAt: '1周前' }
])

const favoriteItems = reactive<FavoriteItem[]>([
  { id: 'fav1', type: 'video', title: 'Vue3 组合式 API 核心原理深度解析', sourceCourse: '前端开发进阶', bookmarkedAt: '10分钟前', tags: ['Vue3', '组合式API'], starred: true, folderId: 'f1' },
  { id: 'fav2', type: 'document', title: 'TypeScript 泛型高级用法完全指南', sourceCourse: '前端开发进阶', bookmarkedAt: '30分钟前', tags: ['TypeScript', '泛型'], starred: true, folderId: 'f1' },
  { id: 'fav3', type: 'exercise', title: '二叉树层序遍历与锯齿形遍历', sourceCourse: '算法与数据结构', bookmarkedAt: '2小时前', tags: ['二叉树', 'BFS'], starred: true, folderId: 'f2' },
  { id: 'fav4', type: 'video', title: 'React Hooks 最佳实践与性能优化', sourceCourse: '前端开发进阶', bookmarkedAt: '3小时前', tags: ['React', 'Hooks'], starred: true, folderId: 'f1' },
  { id: 'fav5', type: 'note', title: '深度学习反向传播算法推导笔记', sourceCourse: '人工智能导论', bookmarkedAt: '5小时前', tags: ['深度学习', '反向传播'], starred: true, folderId: 'f3' },
  { id: 'fav6', type: 'document', title: 'MySQL 索引优化与查询调优实战', sourceCourse: '数据库系统原理', bookmarkedAt: '1天前', tags: ['MySQL', '索引'], starred: true, folderId: 'f4' },
  { id: 'fav7', type: 'exercise', title: '动态规划：0-1背包问题变体', sourceCourse: '算法与数据结构', bookmarkedAt: '1天前', tags: ['动态规划', '背包问题'], starred: true, folderId: 'f2' },
  { id: 'fav8', type: 'video', title: 'Transformer 注意力机制逐行代码实现', sourceCourse: '人工智能导论', bookmarkedAt: '2天前', tags: ['Transformer', '注意力'], starred: true, folderId: 'f3' },
  { id: 'fav9', type: 'note', title: 'CSS Grid 与 Flexbox 布局对比总结', sourceCourse: '前端开发进阶', bookmarkedAt: '2天前', tags: ['CSS', '布局'], starred: true, folderId: 'f1' },
  { id: 'fav10', type: 'exercise', title: '图论：Dijkstra 最短路径算法', sourceCourse: '算法与数据结构', bookmarkedAt: '3天前', tags: ['图论', '最短路径'], starred: true, folderId: 'f2' }
])

const searchQuery = ref('')
const activeTypeFilter = ref<string>('全部')
const sortOption = ref<string>('最近收藏')
const selectedItems = reactive<Set<string>>(new Set())
const showNewFolderInput = ref(false)
const newFolderName = ref('')

const typeFilters = ['全部', '课程', '练习', '资源', '笔记']

const typeFilterMap: Record<string, FavoriteItem['type'][]> = {
  '全部': ['video', 'document', 'exercise', 'note'],
  '课程': ['video'],
  '练习': ['exercise'],
  '资源': ['document'],
  '笔记': ['note']
}

const filteredItems = computed(() => {
  let result = favoriteItems.filter(item => {
    const matchesType = typeFilterMap[activeTypeFilter.value]?.includes(item.type)
    const matchesSearch = !searchQuery.value.trim() ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.sourceCourse.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchesType && matchesSearch
  })

  if (sortOption.value === '最近收藏') {
    result = result.sort((a, b) => a.bookmarkedAt.localeCompare(b.bookmarkedAt))
  } else if (sortOption.value === '最早收藏') {
    result = result.sort((a, b) => b.bookmarkedAt.localeCompare(a.bookmarkedAt))
  } else if (sortOption.value === '按类型') {
    const typeOrder: Record<string, number> = { video: 0, document: 1, exercise: 2, note: 3 }
    result = result.sort((a, b) => typeOrder[a.type] - typeOrder[b.type])
  }

  return result
})

const totalCount = computed(() => favoriteItems.length)

const hasSelection = computed(() => selectedItems.size > 0)

const allSelected = computed(() => filteredItems.value.length > 0 && filteredItems.value.every(item => selectedItems.has(item.id)))

const getTypeIcon = (type: FavoriteItem['type']) => {
  switch (type) {
    case 'video': return Video
    case 'document': return FileText
    case 'exercise': return Code
    case 'note': return BookOpen
  }
}

const getTypeLabel = (type: FavoriteItem['type']) => {
  switch (type) {
    case 'video': return '视频'
    case 'document': return '文档'
    case 'exercise': return '练习'
    case 'note': return '笔记'
  }
}

const getTypeBadgeClass = (type: FavoriteItem['type']) => {
  switch (type) {
    case 'video': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
    case 'document': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
    case 'exercise': return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
    case 'note': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
  }
}

const toggleStar = (item: FavoriteItem) => {
  item.starred = !item.starred
  if (!item.starred) {
    const idx = favoriteItems.findIndex(i => i.id === item.id)
    if (idx !== -1) {
      favoriteItems.splice(idx, 1)
    }
  }
}

const toggleSelect = (id: string) => {
  if (selectedItems.has(id)) {
    selectedItems.delete(id)
  } else {
    selectedItems.add(id)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    filteredItems.value.forEach(item => selectedItems.delete(item.id))
  } else {
    filteredItems.value.forEach(item => selectedItems.add(item.id))
  }
}

const handleDeleteSelected = () => {
  const ids = Array.from(selectedItems)
  ids.forEach(id => {
    const idx = favoriteItems.findIndex(i => i.id === id)
    if (idx !== -1) favoriteItems.splice(idx, 1)
    collectionFolders.forEach(f => {
      if (ids.some(delId => favoriteItems.find(fi => fi.id === delId && fi.folderId === f.id))) {
        f.count = Math.max(0, f.count - 1)
      }
    })
  })
  selectedItems.clear()
}

const handleMoveToFolder = (folderId: string) => {
  selectedItems.forEach(id => {
    const item = favoriteItems.find(i => i.id === id)
    if (item) {
      const oldFolder = collectionFolders.find(f => f.id === item.folderId)
      if (oldFolder) oldFolder.count = Math.max(0, oldFolder.count - 1)
      item.folderId = folderId
      const newFolder = collectionFolders.find(f => f.id === folderId)
      if (newFolder) newFolder.count += 1
    }
  })
  selectedItems.clear()
}

const handleCreateFolder = () => {
  if (!newFolderName.value.trim()) return
  const colors = ['#ef4444', '#06b6d4', '#84cc16', '#ec4899']
  collectionFolders.push({
    id: `f${Date.now()}`,
    name: newFolderName.value.trim(),
    count: 0,
    color: colors[collectionFolders.length % colors.length],
    updatedAt: '刚刚'
  })
  newFolderName.value = ''
  showNewFolderInput.value = false
}

const clearSelection = () => {
  selectedItems.clear()
}
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 p-1">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#f0f4ff] dark:bg-[#4a6cf7]/20 flex items-center justify-center">
          <Bookmark class="w-5 h-5 text-[#4a6cf7] dark:text-[#6a8cff]" />
        </div>
        <div>
          <h1 class="text-[18px] font-bold text-[#1e293b] dark:text-white tracking-tight">收藏夹</h1>
          <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">管理你的学习收藏，随时回顾重点内容</p>
        </div>
      </div>
      <span class="text-[13px] font-bold bg-[#f0f4ff] dark:bg-[#4a6cf7]/20 text-[#4a6cf7] dark:text-[#6a8cff] px-3 py-1 rounded-full border border-[#4a6cf7]/10 dark:border-[#6a8cff]/20">
        {{ totalCount }} 项收藏
      </span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <div
        v-for="folder in collectionFolders"
        :key="folder.id"
        class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
      >
        <div class="flex items-start justify-between mb-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :style="{ backgroundColor: folder.color + '18' }"
          >
            <FolderOpen class="w-5 h-5" :style="{ color: folder.color }" />
          </div>
          <span class="text-[12px] text-slate-400 dark:text-slate-500 font-mono">{{ folder.count }} 项</span>
        </div>
        <h4 class="text-[14px] font-bold text-[#1e293b] dark:text-white leading-tight mb-1 group-hover:text-[#4a6cf7] dark:group-hover:text-[#6a8cff] transition-colors">
          {{ folder.name }}
        </h4>
        <div class="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
          <Clock class="w-3 h-3" />
          <span>{{ folder.updatedAt }}</span>
        </div>
      </div>

      <div
        v-if="!showNewFolderInput"
        @click="showNewFolderInput = true"
        class="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 p-4 cursor-pointer hover:border-[#4a6cf7] dark:hover:border-[#6a8cff] hover:bg-[#f0f4ff]/30 dark:hover:bg-[#4a6cf7]/5 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[120px]"
      >
        <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#4a6cf7]/10 transition-colors">
          <Plus class="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </div>
        <span class="text-[13px] font-semibold text-slate-400 dark:text-slate-500">新建收藏夹</span>
      </div>

      <div
        v-if="showNewFolderInput"
        class="bg-white dark:bg-[#1e293b] rounded-2xl border-2 border-[#4a6cf7]/40 dark:border-[#6a8cff]/40 shadow-xs p-4 flex flex-col gap-2 min-h-[120px] justify-center"
      >
        <input
          v-model="newFolderName"
          type="text"
          placeholder="输入收藏夹名称"
          class="w-full px-3 py-1.5 text-[13px] border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-[#1e293b] dark:text-white outline-none focus:border-[#4a6cf7] dark:focus:border-[#6a8cff] transition-colors"
          @keyup.enter="handleCreateFolder"
        />
        <div class="flex gap-2">
          <button
            @click="handleCreateFolder"
            class="flex-1 py-1.5 text-[12px] font-bold bg-[#4a6cf7] hover:bg-[#3555db] text-white rounded-lg border-none cursor-pointer transition-colors"
          >
            创建
          </button>
          <button
            @click="showNewFolderInput = false; newFolderName = ''"
            class="px-3 py-1.5 text-[12px] font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
      <div class="p-4 border-b border-slate-100 dark:border-slate-700">
        <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div class="flex items-center gap-2 flex-1 w-full sm:w-auto relative bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg px-3 py-2">
            <Search class="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索收藏内容..."
              class="bg-transparent border-none outline-none text-[14px] text-[#1e293b] dark:text-white w-full placeholder-slate-400"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-transparent border-none cursor-pointer"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg p-0.5 select-none">
              <button
                v-for="filter in typeFilters"
                :key="filter"
                @click="activeTypeFilter = filter"
                :class="[
                  'px-3 py-1.5 rounded-md text-[13px] font-semibold cursor-pointer border-none transition-all',
                  activeTypeFilter === filter
                    ? 'bg-white dark:bg-slate-700 text-[#4a6cf7] dark:text-[#6a8cff] shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 bg-transparent hover:text-slate-800 dark:hover:text-slate-200'
                ]"
              >
                {{ filter }}
              </button>
            </div>

            <div class="relative flex items-center gap-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg">
              <ArrowUpDown class="w-3.5 h-3.5 text-slate-400" />
              <select
                v-model="sortOption"
                class="bg-transparent border-none outline-none text-[13px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer appearance-none pr-4"
              >
                <option value="最近收藏">最近收藏</option>
                <option value="最早收藏">最早收藏</option>
                <option value="按类型">按类型</option>
              </select>
              <ChevronDown class="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div class="divide-y divide-slate-100 dark:divide-slate-700/60">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          :class="[
            'flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group',
            selectedItems.has(item.id) ? 'bg-[#f0f4ff]/50 dark:bg-[#4a6cf7]/5' : ''
          ]"
        >
          <button
            @click.stop="toggleSelect(item.id)"
            class="shrink-0 bg-transparent border-none cursor-pointer p-0"
          >
            <CheckSquare
              v-if="selectedItems.has(item.id)"
              class="w-4.5 h-4.5 text-[#4a6cf7] dark:text-[#6a8cff]"
            />
            <Square
              v-else
              class="w-4.5 h-4.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500 transition-colors"
            />
          </button>

          <div
            :class="[
              'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
              item.type === 'video' ? 'bg-blue-50 dark:bg-blue-900/30' :
              item.type === 'document' ? 'bg-emerald-50 dark:bg-emerald-900/30' :
              item.type === 'exercise' ? 'bg-amber-50 dark:bg-amber-900/30' :
              'bg-purple-50 dark:bg-purple-900/30'
            ]"
          >
            <component
              :is="getTypeIcon(item.type)"
              :class="[
                'w-4 h-4',
                item.type === 'video' ? 'text-blue-500 dark:text-blue-400' :
                item.type === 'document' ? 'text-emerald-500 dark:text-emerald-400' :
                item.type === 'exercise' ? 'text-amber-500 dark:text-amber-400' :
                'text-purple-500 dark:text-purple-400'
              ]"
            />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <h4 class="text-[14px] font-semibold text-[#1e293b] dark:text-white truncate leading-tight">
                {{ item.title }}
              </h4>
              <span :class="['text-[11px] px-1.5 py-0.5 rounded border font-bold shrink-0', getTypeBadgeClass(item.type)]">
                {{ getTypeLabel(item.type) }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-[12px] text-slate-400 dark:text-slate-500">
              <span class="flex items-center gap-1">
                <BookOpen class="w-3 h-3" />
                {{ item.sourceCourse }}
              </span>
              <span class="flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ item.bookmarkedAt }}
              </span>
            </div>
            <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="text-[11px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded font-medium"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <button
            @click.stop="toggleStar(item)"
            class="shrink-0 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 border-none bg-transparent cursor-pointer transition-colors"
            :title="item.starred ? '取消收藏' : '加入收藏'"
          >
            <Star
              class="w-4.5 h-4.5 transition-colors"
              :class="item.starred ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-400'"
            />
          </button>
        </div>

        <div v-if="filteredItems.length === 0" class="py-12 text-center">
          <Bookmark class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h4 class="text-[15px] font-semibold text-slate-500 dark:text-slate-400">暂无匹配的收藏内容</h4>
          <p class="text-[13px] text-slate-400 dark:text-slate-500 mt-1">尝试调整筛选条件或搜索关键词</p>
        </div>
      </div>
    </div>

    <Transition name="batch-bar">
      <div
        v-if="hasSelection"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg"
      >
        <button
          @click="toggleSelectAll"
          class="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
        >
          <CheckSquare v-if="allSelected" class="w-3.5 h-3.5 text-[#4a6cf7] dark:text-[#6a8cff]" />
          <Square v-else class="w-3.5 h-3.5" />
          <span>{{ allSelected ? '取消全选' : '全选' }}</span>
        </button>

        <span class="text-[13px] text-slate-400 dark:text-slate-500 font-medium">
          已选 <span class="text-[#4a6cf7] dark:text-[#6a8cff] font-bold">{{ selectedItems.size }}</span> 项
        </span>

        <div class="h-4 w-px bg-slate-200 dark:bg-slate-700" />

        <div class="relative group">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <FolderInput class="w-3.5 h-3.5" />
            <span>移动到</span>
            <ChevronDown class="w-3 h-3" />
          </button>
          <div class="absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg py-1.5 hidden group-hover:block z-50">
            <button
              v-for="folder in collectionFolders"
              :key="folder.id"
              @click="handleMoveToFolder(folder.id)"
              class="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-none bg-transparent transition-colors text-left"
            >
              <FolderOpen class="w-3.5 h-3.5 shrink-0" :style="{ color: folder.color }" />
              <span class="truncate">{{ folder.name }}</span>
            </button>
          </div>
        </div>

        <button
          @click="handleDeleteSelected"
          class="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 cursor-pointer transition-colors"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>删除</span>
        </button>

        <button
          @click="clearSelection"
          class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-pointer border-none bg-transparent transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.batch-bar-enter-active {
  animation: slideUp 0.25s ease-out;
}
.batch-bar-leave-active {
  animation: slideUp 0.2s ease-in reverse;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
