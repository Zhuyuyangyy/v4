<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {
  useTheme,
  activateEduMindTheme,
  deactivateEduMindTheme,
} from '../composables/useEduMindTheme'
import {
  FileText,
  Network,
  HelpCircle,
  Video,
  Code,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
  User,
  Clock,
  Eye,
  CheckCircle
} from 'lucide-vue-next'

import type { Resource, ResourceCategory, Difficulty, CollectionItem, Recommendation } from '../types/edu-mind'
import {
  INITIAL_RESOURCES,
  INITIAL_RECOMMENDATIONS,
  INITIAL_COLLECTIONS,
  SHUFFLED_RECOMMENDATIONS_GROUPS
} from '../data/edu-mind-data'
import { fetchResources, fetchRecommendedResources } from '@/lib/api'

import Sidebar from '../components/edu-mind/Sidebar.vue'
import Header from '../components/edu-mind/Header.vue'
import RightSidebar from '../components/edu-mind/RightSidebar.vue'
import ResourceCard from '../components/edu-mind/ResourceCard.vue'
import AddResourceModal from '../components/edu-mind/AddResourceModal.vue'

import HomeView from '../components/edu-mind/HomeView.vue'
import CoursesView from '../components/edu-mind/CoursesView.vue'
import LearningPathView from '../components/edu-mind/LearningPathView.vue'
import PracticeView from '../components/edu-mind/PracticeView.vue'
import MindMapView from '../components/edu-mind/MindMapView.vue'
import StudyRecordView from '../components/edu-mind/StudyRecordView.vue'
import FavoritesView from '../components/edu-mind/FavoritesView.vue'
import NotesView from '../components/edu-mind/NotesView.vue'
import ResourceGeneratePanel from '../components/resource/ResourceGeneratePanel.vue'

const { isDark } = useTheme()
const route = useRoute()

const ITEMS_PER_PAGE = 9

const currentTab = ref<string>((() => {
  const saved = localStorage.getItem('edumind_active_tab')
  return (saved && saved !== '首页' && saved !== '学习路径') ? saved : '课程'
})())

watch(currentTab, (val) => {
  localStorage.setItem('edumind_active_tab', val)
})

watch(() => route.query, (q) => {
  if (q.source === 'home' || q.source === 'star-map' || q.source === 'mission') {
    currentTab.value = '资源中心'
  }
}, { immediate: true })

const resources = ref<Resource[]>((() => {
  const saved = localStorage.getItem('resource_center_list')
  if (!saved) return INITIAL_RESOURCES
  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : INITIAL_RESOURCES
  } catch {
    return INITIAL_RESOURCES
  }
})())

const recommendations = ref<Recommendation[]>((() => {
  const saved = localStorage.getItem('resource_recommendations')
  if (!saved) return INITIAL_RECOMMENDATIONS
  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : INITIAL_RECOMMENDATIONS
  } catch {
    return INITIAL_RECOMMENDATIONS
  }
})())

const collections = ref<CollectionItem[]>((() => {
  const saved = localStorage.getItem('resource_collections')
  if (!saved) return INITIAL_COLLECTIONS
  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : INITIAL_COLLECTIONS
  } catch {
    return INITIAL_COLLECTIONS
  }
})())

const weeklyHours = ref<number>((() => {
  const saved = localStorage.getItem('study_weekly_hours')
  return saved ? parseFloat(saved) : 12.5
})())

const activeFilter = ref<ResourceCategory>('全部')
const difficultyFilter = ref<Difficulty>('全部难度')
const sortType = ref<string>('最新发布')
const viewMode = ref<'grid' | 'list'>('grid')
const searchValue = ref<string>('')
const currentPage = ref<number>(1)
const recommendCycleIndex = ref<number>(0)

const selectedResourceDetail = ref<Resource | null>(null)
const showAddModal = ref<boolean>(false)
const toastMessage = ref<string | null>(null)
const mobileSidebarOpen = ref<boolean>(false)

const goalHours = 20

watch(resources, (val) => {
  localStorage.setItem('resource_center_list', JSON.stringify(val))
}, { deep: true })

watch(recommendations, (val) => {
  localStorage.setItem('resource_recommendations', JSON.stringify(val))
}, { deep: true })

watch(collections, (val) => {
  localStorage.setItem('resource_collections', JSON.stringify(val))
}, { deep: true })

watch(weeklyHours, (val) => {
  localStorage.setItem('study_weekly_hours', val.toString())
})

const triggerToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = null
  }, 4000)
}

const handleToggleStar = (id: string) => {
  resources.value = resources.value.map(res => {
    if (res.id === id) {
      const nextState = !res.starred
      if (nextState) {
        if (!collections.value.some(c => c.id === id)) {
          const newItem: CollectionItem = {
            id: res.id,
            title: res.title,
            category: res.category,
            date: res.date
          }
          collections.value = [newItem, ...collections.value]
        }
        triggerToast(`已成功将《${res.title}》添加到收藏夹！`)
      } else {
        collections.value = collections.value.filter(item => item.id !== id)
        triggerToast(`已将《${res.title}》从您的收藏夹中移除`)
      }
      return { ...res, starred: nextState }
    }
    return res
  })

  recommendations.value = recommendations.value.map(rec => {
    if (rec.id === id) {
      return { ...rec, starred: !rec.starred }
    }
    return rec
  })
}

const handleToggleRecommendStar = (id: string) => {
  recommendations.value = recommendations.value.map(rec => {
    if (rec.id === id) {
      const nextState = !rec.starred
      if (nextState) {
        if (!collections.value.some(c => c.id === id)) {
          collections.value = [
            { id: rec.id, title: rec.title, category: rec.category, date: '2024-05-25' },
            ...collections.value
          ]
        }
        triggerToast(`已收藏推荐资源《${rec.title}》`)
      } else {
        collections.value = collections.value.filter(item => item.id !== id)
        triggerToast(`已取消收藏推荐《${rec.title}》`)
      }
      return { ...rec, starred: nextState }
    }
    return rec
  })

  const foundInResources = resources.value.find(r => r.id === id)
  if (foundInResources) {
    resources.value = resources.value.map(r => r.id === id ? { ...r, starred: !r.starred } : r)
  }
}

const handleRefreshRecommend = () => {
  const nextIndex = (recommendCycleIndex.value + 1) % SHUFFLED_RECOMMENDATIONS_GROUPS.length
  recommendCycleIndex.value = nextIndex

  const group = SHUFFLED_RECOMMENDATIONS_GROUPS[nextIndex]

  const synchronizedGroup = group.map(item => ({
    ...item,
    starred: collections.value.some(col => col.id === item.id)
  }))

  recommendations.value = synchronizedGroup
  triggerToast('已为您刷新推荐列表！根据您的搜索特征发现新灵感。')
}

const handleMarkAsCompleted = (hours: number, title: string) => {
  const updated = parseFloat((weeklyHours.value + hours).toFixed(1))
  weeklyHours.value = updated
  triggerToast(`恭喜！您完成学习了 《${title}》, 累计进度 +${hours} 小时！`)
}

const handleCollectionItemClick = (id: string, category: ResourceCategory) => {
  currentTab.value = '资源中心'
  const foundRes = resources.value.find(r => r.id === id)
  if (foundRes) {
    selectedResourceDetail.value = foundRes
  } else {
    const mockDetail: Resource = {
      id,
      title: recommendations.value.find(rec => rec.id === id)?.title || '推荐学习文章资源',
      category,
      description: '这本精心编制的推荐辅导手册包含了各大技术极客的核心笔顺和高阶要点总结。',
      tags: ['学习要点', '独家推荐', category],
      date: '2024-05-25',
      views: 1450,
      starred: true,
      difficulty: '中级',
      author: '官方教研组',
      estimatedTime: '35分钟',
      contentMarkdown: `## 💡 精选推荐学习模块\n\n感谢您的学习热忱！本文章是精选推荐重点，正在云端进行进一步知识树和互动图谱编排。\n\n### 为什么选择学这个？\n1. **行业普适性强**: 该技术点在全行业具备主流大厂的使用占有率优势。\n2. **底层原理讲得通**: 自底向上深入解密内部执行逻辑，拒绝单纯堆砌代码。\n3. **支持互动与实战**: 搭配有精心整理的实操模拟环境和测试训练营配套真题。\n\n*快来添加一堂备忘笔记，或直接在控制台标记学完来获取进度学时吧！*`
    }
    selectedResourceDetail.value = mockDetail
  }
}

const handleAddResource = (newRes: Resource) => {
  resources.value = [newRes, ...resources.value]
  triggerToast(`成功发布并入库全新资源：《${newRes.title}》！`)
}

const filteredResources = computed(() => {
  return resources.value.filter(res => {
    const matchesCategory = activeFilter.value === '全部' || res.category === activeFilter.value
    const matchesDifficulty = difficultyFilter.value === '全部难度' || res.difficulty === difficultyFilter.value
    const normalizedKeyword = searchValue.value.trim().toLowerCase()
    const matchesSearch = !normalizedKeyword ||
      res.title.toLowerCase().includes(normalizedKeyword) ||
      res.description.toLowerCase().includes(normalizedKeyword) ||
      res.tags.some(tag => tag.toLowerCase().includes(normalizedKeyword))
    return matchesCategory && matchesDifficulty && matchesSearch
  })
})

const sortedResources = computed(() => {
  return [...filteredResources.value].sort((a, b) => {
    if (sortType.value === '最多阅读') {
      return b.views - a.views
    }
    if (sortType.value === '最多收藏') {
      const aVal = a.starred ? 1 : 0
      const bVal = b.starred ? 1 : 0
      return bVal - aVal
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

const totalItemsCount = computed(() => sortedResources.value.length)
const totalPagesCount = computed(() => Math.max(Math.ceil(totalItemsCount.value / ITEMS_PER_PAGE), 1))
const paginatedResources = computed(() => {
  return sortedResources.value.slice(
    (currentPage.value - 1) * ITEMS_PER_PAGE,
    currentPage.value * ITEMS_PER_PAGE
  )
})

watch([activeFilter, difficultyFilter, sortType, searchValue], () => {
  currentPage.value = 1
})

const getCountForFilter = (category: ResourceCategory) => {
  return resources.value.filter(res => {
    const matchesDifficulty = difficultyFilter.value === '全部难度' || res.difficulty === difficultyFilter.value
    const matchesSearch = !searchValue.value ||
      res.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      res.description.toLowerCase().includes(searchValue.value.toLowerCase())
    const matchesCat = category === '全部' || res.category === category
    return matchesCat && matchesDifficulty && matchesSearch
  }).length
}

const categoriesList: { name: ResourceCategory; icon: any }[] = [
  { name: '全部', icon: BookOpen },
  { name: '文档', icon: FileText },
  { name: '思维导图', icon: Network },
  { name: '流程图', icon: Network },
  { name: '习题', icon: HelpCircle },
  { name: '视频', icon: Video },
  { name: '代码', icon: Code },
]

const handleCardClick = (id: string) => {
  const resObj = resources.value.find(r => r.id === id)
  if (resObj) selectedResourceDetail.value = resObj
}

const isUnimplementedTab = computed(() => {
  return !['首页', '学习路径', '课程', '资源中心', '练习中心', '思维导图', '学习记录', '收藏夹', '笔记'].includes(currentTab.value)
})

onMounted(async () => {
  // 进入 /edu-mind 时把 html.dark class 挂上(如果当前模式是 dark)
  // 离开时撤回,避免污染其他路由页面
  activateEduMindTheme()

  try {
    const items = await fetchResources()
    if (items && items.length > 0) {
      resources.value = items.map((item, i) => ({
        id: String(item.id || i + 1),
        title: item.title,
        category: (item.type === 'doc' ? '文档' : item.type === 'mindmap' ? '思维导图' : item.type === 'exercise' ? '习题' : item.type === 'video' ? '视频' : item.type === 'code' ? '代码' : '文档') as ResourceCategory,
        description: item.desc,
        tags: item.tags,
        date: item.date,
        views: item.reads,
        starred: false,
        difficulty: (item.difficulty || '中级') as Difficulty,
        author: item.author || '系统推荐',
        estimatedTime: item.estTime || '30分钟',
        contentMarkdown: item.reason || item.desc,
      }))
    }
  } catch { /* keep local data */ }

  try {
    const recItems = await fetchRecommendedResources()
    if (recItems && recItems.length > 0) {
      recommendations.value = recItems.map((item, i) => ({
        id: String(item.id || i + 1),
        title: item.title,
        category: (item.type === 'doc' ? '文档' : item.type === 'mindmap' ? '思维导图' : item.type === 'exercise' ? '习题' : item.type === 'video' ? '视频' : item.type === 'code' ? '代码' : '文档') as ResourceCategory,
        views: item.reads,
        starred: false,
        iconType: item.type || 'doc',
      }))
    }
  } catch { /* keep local data */ }
})

onBeforeUnmount(() => {
  deactivateEduMindTheme()
})
</script>

<template>
  <div id="edu-mind-app" class="w-full max-w-full h-screen font-sans flex antialiased select-none" style="background-color: var(--edu-bg-page); color: var(--edu-text-main);">
    <Sidebar
      :weeklyHours="weeklyHours"
      :goalHours="goalHours"
      :currentTab="currentTab"
      :isOpen="mobileSidebarOpen"
      @tabChange="(tab: string) => currentTab = tab"
      @close="mobileSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col ml-0 min-w-0 h-screen overflow-y-auto">


      <div class="edu-main-stage flex-1 p-5 sm:p-6 flex flex-col">
        <div v-if="currentTab === '首页'" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1 min-w-0">
            <HomeView :weeklyHours="weeklyHours" :goalHours="goalHours" @navigateToTab="(tab: string) => currentTab = tab" />
          </div>
          <RightSidebar
            :recommendations="recommendations"
            :collections="collections"
            @toggleRecommendStar="handleToggleRecommendStar"
            @refreshRecommend="handleRefreshRecommend"
            @collectionItemClick="handleCollectionItemClick"
          />
        </div>

        <div v-if="currentTab === '学习路径'" class="w-full">
          <LearningPathView @navigateToTab="(tab: string) => currentTab = tab" />
        </div>

        <div v-if="currentTab === '课程'" class="w-full">
          <CoursesView @addWeeklyHours="handleMarkAsCompleted" @navigateToTab="(tab: string) => currentTab = tab" />
        </div>

        <div v-if="currentTab === '练习中心'" class="w-full h-full flex flex-col">
          <PracticeView @addWeeklyHours="handleMarkAsCompleted" />
        </div>

        <div v-if="currentTab === '思维导图'" class="w-full flex-1 min-h-0 flex flex-col">
          <MindMapView />
        </div>

        <div v-if="currentTab === '学习记录'" class="w-full">
          <StudyRecordView />
        </div>

        <div v-if="currentTab === '收藏夹'" class="w-full">
          <FavoritesView />
        </div>

        <div v-if="currentTab === '笔记'" class="w-full">
          <NotesView />
        </div>

        <div v-if="currentTab === '资源中心'" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1 min-w-0 flex flex-col gap-5">

            <!-- ====== 列表视图 ====== -->
            <template v-if="!selectedResourceDetail">
            <ResourceGeneratePanel />
            <div class="flex flex-wrap gap-2" id="filter-tabs-container">
              <button
                v-for="(cat, idx) in categoriesList"
                :key="idx"
                @click="activeFilter = cat.name"
                :class="[
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[14.5px] cursor-pointer transition-all duration-200',
                  activeFilter === cat.name
                    ? 'bg-[#f0f4ff] border-[#4a6cf7] text-accent font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#1e293b] border-[#e8e8e8] dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-[#4a6cf7] hover:text-accent'
                ]"
              >
                <component :is="cat.icon" :size="14" class="shrink-0 text-current" />
                <span class="font-medium">{{ cat.name }}</span>
                <span :class="['text-[12px] px-1 bg-slate-100 dark:bg-slate-700 rounded-md font-mono', activeFilter === cat.name ? 'text-accent bg-[#f0f4ff]' : 'text-slate-700 dark:text-slate-400']">
                  {{ getCountForFilter(cat.name).toLocaleString() }}
                </span>
              </button>
            </div>

            <div class="flex justify-between items-center bg-white dark:bg-[#1e293b] p-3.5 rounded-xl border border-[#e8e8e8] dark:border-slate-700/60 shadow-xs gap-3">
              <div class="text-[16px] text-slate-800 dark:text-white font-semibold shrink-0">
                筛选出 <span class="text-accent font-bold">{{ totalItemsCount }}</span> 个资源
              </div>

              <div class="flex items-center gap-3 ml-auto">
                <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-700 rounded-lg px-2 py-1">
                  <span class="text-[12px] text-slate-500 dark:text-slate-400 font-bold uppercase select-none shrink-0">难度</span>
                  <select
                    v-model="difficultyFilter"
                    class="bg-transparent border-none outline-none text-[14px] text-slate-500 dark:text-slate-300 font-medium cursor-pointer"
                  >
                    <option value="全部难度">全部难度</option>
                    <option value="初级">🌱 初级</option>
                    <option value="中级">🍂 中级</option>
                    <option value="高级">🔥 高级</option>
                  </select>
                </div>

                <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-[#e8e8e8] dark:border-slate-700 rounded-lg px-2 py-1">
                  <span class="text-[12px] text-slate-500 dark:text-slate-400 font-bold uppercase select-none shrink-0">排序</span>
                  <select
                    v-model="sortType"
                    class="bg-transparent border-none outline-none text-[14px] text-slate-500 dark:text-slate-300 font-medium cursor-pointer"
                  >
                    <option value="最新发布">最新发布</option>
                    <option value="最多阅读">最多阅读 (热门)</option>
                    <option value="最多收藏">最多收藏 (星标)</option>
                  </select>
                </div>

                <div class="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700 shrink-0">
                  <button
                    @click="viewMode = 'grid'"
                    :class="['p-1 rounded-md transition-all cursor-pointer', viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-xs text-accent' : 'text-slate-500 dark:text-slate-400']"
                    title="九宫格视图"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    :class="['p-1 rounded-md transition-all cursor-pointer', viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-xs text-accent' : 'text-slate-500 dark:text-slate-400']"
                    title="纵向列表视图"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"></line>
                      <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"></line>
                      <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"></line>
                      <circle cx="4" cy="6" r="1.5" stroke="currentColor" stroke-width="1.5"></circle>
                      <circle cx="4" cy="12" r="1.5" stroke="currentColor" stroke-width="1.5"></circle>
                      <circle cx="4" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="paginatedResources.length === 0" class="bg-white dark:bg-[#1e293b] rounded-2xl p-12 max-w-xl mx-auto text-center border border-[#e8e8e8] dark:border-slate-700/60 shadow-xs my-6 w-full animate-fade-in">
              <HelpCircle :size="48" class="text-slate-400 mx-auto mb-4" />
              <h3 class="text-[15px] font-semibold text-slate-800 dark:text-white mb-1">未搜索到相关学习资源</h3>
              <p class="text-[14px] text-slate-500 dark:text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
                没有找到符合当前筛选模式和关键字的学习材料。试着减少过滤词、放宽难易门槛，或点击下方一建发布全新材料。
              </p>
              <button
                @click="searchValue = ''; activeFilter = '全部'; difficultyFilter = '全部难度'"
                class="px-4 py-2 bg-[#f0f4ff] hover:bg-[#dbe4ff] text-accent text-[14px] font-semibold rounded-lg shadow-sm border border-[#dbe4ff] cursor-pointer"
              >
                清除所有过滤条件
              </button>
            </div>

            <div
              v-else
              :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'flex flex-col gap-3'"
              id="resource-cards-list-view"
            >
              <ResourceCard
                v-for="item in paginatedResources"
                :key="item.id"
                :resource="item"
                :viewMode="viewMode"
                @toggleStar="handleToggleStar"
                @cardClick="handleCardClick"
                @markAsCompleted="handleMarkAsCompleted"
              />
            </div>

            <div v-if="totalItemsCount > ITEMS_PER_PAGE" class="flex justify-between items-center bg-white dark:bg-[#1e293b] px-5 py-3.5 rounded-xl border border-[#e8e8e8] dark:border-slate-700/60 shadow-xs mt-2 select-none">
              <div class="flex gap-1">
                <button
                  :disabled="currentPage === 1"
                  @click="currentPage = Math.max(currentPage - 1, 1)"
                  class="w-8 h-8 rounded-md border border-slate-200 dark:border-slate-600 flex items-center justify-center p-0 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft :size="16" class="text-slate-600 dark:text-slate-300" />
                </button>

                <button
                  v-for="pageIdx in totalPagesCount"
                  :key="pageIdx"
                  @click="currentPage = pageIdx"
                  :class="[
                    'w-8 h-8 rounded-md border text-[14px] font-medium transition-all cursor-pointer',
                    currentPage === pageIdx
                      ? 'bg-[#4a6cf7] border-[#4a6cf7] text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                  ]"
                >
                  {{ pageIdx }}
                </button>

                <button
                  :disabled="currentPage === totalPagesCount"
                  @click="currentPage = Math.min(currentPage + 1, totalPagesCount)"
                  class="w-8 h-8 rounded-md border border-slate-200 dark:border-slate-600 flex items-center justify-center p-0 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight :size="16" class="text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              <div class="text-[14px] text-slate-500 font-medium font-mono">
                共 {{ totalItemsCount }} 条
              </div>
            </div>
            </template>

            <!-- ====== 详情子页面 ====== -->
            <template v-else>
              <div class="resource-detail-page">
                <button class="resource-detail-back" @click="selectedResourceDetail = null">
                  <ChevronLeft :size="18" /> 返回资源列表
                </button>

                <div class="resource-detail-header">
                  <div class="resource-detail-badges">
                    <span class="resource-detail-category">{{ selectedResourceDetail.category }}</span>
                    <span class="resource-detail-difficulty">{{ selectedResourceDetail.difficulty }}</span>
                  </div>
                  <div class="resource-detail-actions">
                    <button
                      @click="handleToggleStar(selectedResourceDetail!.id)"
                      class="resource-detail-star"
                    >
                      <Star :size="18" :class="selectedResourceDetail.starred ? 'fill-[#fadb14] text-[#fadb14]' : ''" />
                      <span>{{ selectedResourceDetail.starred ? '已收藏' : '收藏' }}</span>
                    </button>
                  </div>
                </div>

                <h1 class="resource-detail-title">{{ selectedResourceDetail.title }}</h1>

                <div class="resource-detail-meta">
                  <span><User :size="14" /> 作者: {{ selectedResourceDetail.author }}</span>
                  <span><Clock :size="14" /> 预计学时: {{ selectedResourceDetail.estimatedTime || '30分钟' }}</span>
                  <span><Eye :size="14" /> 阅读次数: {{ selectedResourceDetail.views }}</span>
                </div>

                <div class="resource-detail-body">
                  <div v-if="selectedResourceDetail.contentMarkdown" class="whitespace-pre-line leading-relaxed">
                    {{ selectedResourceDetail.contentMarkdown }}
                  </div>
                  <div v-else class="text-[#8892b0] italic py-4 text-center">
                    该资源正待进一步教研排版上线。
                  </div>
                </div>

                <div class="resource-detail-tags">
                  <span v-for="(tag, idx) in selectedResourceDetail.tags" :key="idx" class="resource-detail-tag">
                    {{ tag }}
                  </span>
                </div>

                <div class="resource-detail-bottom">
                  <div class="resource-detail-rating">
                    <p class="resource-detail-rating-title">您对本节学习资料的内容评价</p>
                    <p class="resource-detail-rating-sub">评分将作为系统向其他同学推荐模型的打分标准</p>
                  </div>
                  <div class="resource-detail-learn">
                    <p>读完这些重点内容并理解后，可以将其标记为"已学完"。</p>
                    <button
                      @click="handleMarkAsCompleted(
                        parseFloat(((parseInt(selectedResourceDetail.estimatedTime || '30') / 60)).toFixed(1)),
                        selectedResourceDetail.title
                      )"
                      class="resource-detail-cta"
                    >
                      <CheckCircle :size="16" /> 标记学完
                    </button>
                  </div>
                </div>
              </div>
            </template>

          </div>

          <RightSidebar
            :recommendations="recommendations"
            :collections="collections"
            @toggleRecommendStar="handleToggleRecommendStar"
            @refreshRecommend="handleRefreshRecommend"
            @collectionItemClick="handleCollectionItemClick"
          />
        </div>

        <div v-if="isUnimplementedTab" class="bg-white dark:bg-[#1e293b] rounded-2xl p-12 max-w-xl mx-auto text-center border border-[#e8e8e8] dark:border-slate-700/60 shadow-xs my-12 animate-fade-in">
          <HelpCircle :size="48" class="text-slate-300 mx-auto mb-4" />
          <h3 class="text-[15px] font-semibold text-slate-800 dark:text-white mb-1">功能正在对接中</h3>
          <p class="text-[14.5px] text-slate-400 dark:text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
            《{{ currentTab }}》应用模块正在接收 AGI 后台数据库与交互算法更新。您可以点击下方快速返回首页或大纲中心进行学习打卡。
          </p>
          <button
            @click="currentTab = '首页'"
            class="px-4 py-2 bg-[#4a6cf7] hover:bg-[#3555db] text-white text-[14px] font-semibold rounded-lg shadow-sm border-none cursor-pointer"
          >
            返回首页主控台
          </button>
        </div>
      </div>

      <footer class="bg-white dark:bg-[#1e293b] border-t border-[#e8e8e8] dark:border-slate-700/60 py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-[13px] gap-2">
        <span>© 2026 资源中心。本周进阶目标持续推动。</span>
        <div class="flex gap-4">
          <span class="cursor-pointer hover:text-accent transition-all">帮助中心</span>
          <span class="cursor-pointer hover:text-accent transition-all">隐私政策</span>
          <span class="cursor-pointer hover:text-accent transition-all">服务条款</span>
        </div>
      </footer>
    </div>

    <Transition name="modal-fade">
      <AddResourceModal
        v-if="showAddModal"
        @close="showAddModal = false"
        @addResource="handleAddResource"
      />
    </Transition>

    <Transition name="toast-slide">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 border border-slate-700 dark:border-slate-600 text-white shadow-xl rounded-full px-5 py-2.5 flex items-center gap-2.5 z-50 text-[14px] backdrop-blur-sm"
      >
        <Sparkles :size="16" class="text-amber-400 shrink-0" />
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

#edu-mind-app {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 77% 10%, rgba(59, 130, 246, 0.06), transparent 30%),
    radial-gradient(circle at 10% 34%, rgba(59, 130, 246, 0.04), transparent 28%),
    linear-gradient(180deg, #07060a 0%, #0e0c15 52%, #161220 100%);
}

#edu-mind-app::before {
  content: "";
  position: fixed;
  inset: var(--header-height) 0 0 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle, rgba(59, 130, 246, 0.2) 0 1px, transparent 1.5px),
    linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.015) 1px, transparent 1px);
  background-size: 140px 140px, 64px 64px, 64px 64px;
  opacity: 0.5;
  z-index: 0;
}

#edu-mind-app > * {
  position: relative;
  z-index: 1;
}

/* Subtle transition for all interactive elements */
#edu-mind-app button,
#edu-mind-app a,
#edu-mind-app select,
#edu-mind-app input,
#edu-mind-app textarea {
  transition: all 0.2s ease-out;
}

html.dark #edu-mind-app {
  color-scheme: dark;
}

/* Neutralize v4 global resets for edu-mind components */
#edu-mind-app button {
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-align: inherit;
}

/* Text accent color */
#edu-mind-app .text-accent {
  color: #3b82f6;
}
#edu-mind-app .hover\:text-accent:hover {
  color: #3b82f6;
}
#edu-mind-app .group:hover .group-hover\:text-accent {
  color: #3b82f6;
}

#edu-mind-app ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

#edu-mind-app ::-webkit-scrollbar-track {
  background: transparent;
}

#edu-mind-app ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

html.dark #edu-mind-app ::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.15);
}

#edu-mind-app ::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

html.dark #edu-mind-app ::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.25);
}

/* Account for v4 topbar height */
#edu-mind-app #app-sidebar {
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
}

#edu-mind-app #main-header {
  top: var(--header-height);
}

/* === Unified border refinement === */
#edu-mind-app {
  --edu-border-subtle: #f3f4f6;      /* subtle dividers, sidebar */
  --edu-border-default: #e5e7eb;     /* card containers */
  --edu-border-hover: #d1d5db;       /* interactive hover states */
  --edu-border-dark-subtle: rgba(59, 130, 246, 0.08);  /* dark subtle */
  --edu-border-dark: rgba(59, 130, 246, 0.12);         /* dark default */
  --edu-border-dark-hover: rgba(59, 130, 246, 0.2);   /* dark hover */
}

/* Structural borders (sidebar, header) - more subtle */
#edu-mind-app #app-sidebar {
  border-right-color: var(--edu-border-subtle) !important;
}
html.dark #edu-mind-app #app-sidebar {
  border-right-color: var(--edu-border-dark-subtle) !important;
}

#edu-mind-app #main-header {
  border-bottom-color: var(--edu-border-default) !important;
}
html.dark #edu-mind-app #main-header {
  border-bottom-color: var(--edu-border-dark) !important;
}

/* Cards & containers - default border */
#edu-mind-app .border-\[#e8e8e8\] {
  border-color: var(--edu-border-default) !important;
}
html.dark #edu-mind-app .border-\[#e8e8e8\] {
  border-color: var(--edu-border-dark) !important;
}
#edu-mind-app .border-\[#bfbfbf\],
#edu-mind-app .border-\[#cbd5e1\],
#edu-mind-app .border-\[#d5dae6\] {
  border-color: var(--edu-border-default) !important;
}

/* Dividers & separators */
#edu-mind-app .border-\[#f0f0f0\],
#edu-mind-app .border-\[#f1f1f5\],
#edu-mind-app .border-\[#fafafa\] {
  border-color: var(--edu-border-subtle) !important;
}
html.dark #edu-mind-app .border-\[#f0f0f0\],
html.dark #edu-mind-app .border-\[#f1f1f5\],
html.dark #edu-mind-app .border-\[#fafafa\] {
  border-color: var(--edu-border-dark-subtle) !important;
}

/* Tailwind slate overrides */
#edu-mind-app .border-slate-100,
#edu-mind-app .border-slate-200 {
  border-color: var(--edu-border-default) !important;
}
#edu-mind-app .border-gray-200 {
  border-color: var(--edu-border-default) !important;
}
html.dark #edu-mind-app .border-slate-600,
html.dark #edu-mind-app .border-slate-700 {
  border-color: var(--edu-border-dark) !important;
}
html.dark #edu-mind-app .border-slate-800 {
  border-color: var(--edu-border-dark-subtle) !important;
}

/* Hover borders */
#edu-mind-app .hover\:border-\[#bfbfbf\]:hover {
  border-color: var(--edu-border-hover) !important;
}
html.dark #edu-mind-app .hover\:border-gray-300:hover,
html.dark #edu-mind-app .dark\:hover\:border-slate-600:hover {
  border-color: var(--edu-border-dark-hover) !important;
}

/* Animations (global so child components can use them) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-scale-up {
  animation: scaleUp 0.3s ease-out forwards;
}

@keyframes pulse {
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ===== CSS Variables — 深蓝+蓝色宇宙主题 ===== */
#edu-mind-app {
  --edu-bg-page: #07060a;
  --edu-bg-card: rgba(17, 14, 26, 0.7);
  --edu-bg-inset: rgba(14, 12, 21, 0.6);
  --edu-bg-elevated: rgba(22, 18, 32, 0.9);
  --edu-bg-deep: rgba(59, 130, 246, 0.08);
  --edu-border: rgba(59, 130, 246, 0.12);
  --edu-border-subtle: rgba(59, 130, 246, 0.08);
  --edu-text-main: #e0e7ff;
  --edu-text-muted: #a5b4d8;
  --edu-text-dim: #6b7fa8;
  --edu-accent: #3b82f6;
  --edu-accent-soft: rgba(59, 130, 246, 0.1);
  background: var(--edu-bg-page);
  color: var(--edu-text-main);
}

/* All dark: bg overrides */
html.dark #edu-mind-app .dark\:bg-\[#0f172a\],
html.dark #edu-mind-app .dark\:bg-\[\#0f172a\] { background-color: var(--edu-bg-page) !important; }
html.dark #edu-mind-app .dark\:bg-\[#1e293b\],
html.dark #edu-mind-app .dark\:bg-\[\#1e293b\] { background-color: var(--edu-bg-card) !important; }
html.dark #edu-mind-app .dark\:bg-slate-800 { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .dark\:bg-slate-700 { background-color: var(--edu-bg-elevated) !important; }
html.dark #edu-mind-app .dark\:bg-slate-800\/60 { background-color: rgba(14, 12, 21, 0.7) !important; }
html.dark #edu-mind-app .dark\:bg-slate-900\/60 { background-color: rgba(7, 6, 10, 0.85) !important; }
html.dark #edu-mind-app .dark\:bg-slate-950 { background-color: #050408 !important; }
html.dark #edu-mind-app .dark\:bg-slate-950\/40 { background-color: rgba(5, 4, 8, 0.6) !important; }
html.dark #edu-mind-app .dark\:bg-slate-950\/80 { background-color: rgba(5, 4, 8, 0.9) !important; }
html.dark #edu-mind-app .dark\:bg-slate-900\/40 { background-color: rgba(7, 6, 10, 0.6) !important; }
html.dark #edu-mind-app .dark\:bg-slate-600 { background-color: var(--edu-bg-elevated) !important; }
html.dark #edu-mind-app .dark\:bg-blue-900\/30 { background-color: rgba(30, 58, 138, 0.25) !important; }
html.dark #edu-mind-app .bg-white { background-color: var(--edu-bg-card) !important; }
html.dark #edu-mind-app .bg-slate-50 { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .bg-slate-100 { background-color: var(--edu-bg-elevated) !important; }
html.dark #edu-mind-app .bg-gray-50 { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .bg-\[#f0f4ff\] { background-color: var(--edu-accent-soft) !important; }
html.dark #edu-mind-app .bg-\[#f9fafb\] { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .bg-\[#f5f7fa\] { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .bg-\[#f0f2f5\] { background-color: var(--edu-bg-inset) !important; }
html.dark #edu-mind-app .bg-\[#fafbff\] { background-color: var(--edu-bg-card) !important; }
html.dark #edu-mind-app .bg-red-50 { background-color: rgba(120, 28, 28, 0.15) !important; }
html.dark #edu-mind-app .bg-green-50 { background-color: rgba(6, 78, 59, 0.15) !important; }
html.dark #edu-mind-app .bg-orange-50 { background-color: rgba(120, 53, 15, 0.15) !important; }
html.dark #edu-mind-app .bg-slate-50\/50 { background-color: rgba(14, 12, 21, 0.5) !important; }
html.dark #edu-mind-app .bg-slate-50\/70 { background-color: rgba(14, 12, 21, 0.7) !important; }
html.dark #edu-mind-app .bg-slate-50\/90 { background-color: rgba(14, 12, 21, 0.9) !important; }
html.dark #edu-mind-app [class*="bg-white/"] { background-color: var(--edu-bg-card) !important; }

/* Accent */
html.dark #edu-mind-app .bg-\[#4a6cf7\] { background-color: #3b82f6 !important; }
html.dark #edu-mind-app .dark\:bg-\[#4a6cf7\]\/15 { background-color: rgba(59, 130, 246, 0.12) !important; }
html.dark #edu-mind-app .dark\:bg-\[#4a6cf7\]\/20 { background-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .dark\:bg-\[#4a6cf7\]\/5 { background-color: rgba(59, 130, 246, 0.04) !important; }
html.dark #edu-mind-app .dark\:bg-\[#4a6cf7\]\/10 { background-color: rgba(59, 130, 246, 0.08) !important; }
html.dark #edu-mind-app .from-\[#4a6cf7\] { --tw-gradient-from: #3b82f6 !important; }
html.dark #edu-mind-app .to-\[#6a8cff\] { --tw-gradient-to: #60a5fa !important; }
html.dark #edu-mind-app .hover\:bg-\[#4a6cf7\]:hover { background-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .hover\:bg-\[#3555db\]:hover { background-color: #1d4ed8 !important; }

/* Text */
html.dark #edu-mind-app .text-accent { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .text-\[#4a6cf7\] { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .dark\:text-\[#6a8cff\] { color: #60a5fa !important; }
html.dark #edu-mind-app .dark\:text-white { color: var(--edu-text-main) !important; }
html.dark #edu-mind-app .dark\:text-slate-200 { color: #a5b4d8 !important; }
html.dark #edu-mind-app .dark\:text-slate-300 { color: #a5b4d8 !important; }
html.dark #edu-mind-app .dark\:text-slate-400 { color: var(--edu-text-muted) !important; }
html.dark #edu-mind-app .dark\:text-slate-500 { color: var(--edu-text-dim) !important; }
html.dark #edu-mind-app .hover\:text-\[#4a6cf7\]:hover { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .hover\:text-accent:hover { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .group:hover .group-hover\:text-accent { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .dark\:hover\:text-\[#6a8cff\]:hover { color: #60a5fa !important; }
html.dark #edu-mind-app .dark\:group-hover\:text-\[#6a8cff\] { color: #60a5fa !important; }

/* Border */
html.dark #edu-mind-app .dark\:border-slate-700 { border-color: var(--edu-border) !important; }
html.dark #edu-mind-app .dark\:border-slate-700\/60 { border-color: var(--edu-border-subtle) !important; }
html.dark #edu-mind-app .dark\:border-slate-600 { border-color: rgba(59, 130, 246, 0.12) !important; }
html.dark #edu-mind-app .dark\:border-slate-800 { border-color: var(--edu-border-subtle) !important; }
html.dark #edu-mind-app .dark\:border-\[#6a8cff\]\/20 { border-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .dark\:border-\[#6a8cff\]\/40 { border-color: rgba(59, 130, 246, 0.25) !important; }
html.dark #edu-mind-app .dark\:border-\[#4a6cf7\]\/30 { border-color: rgba(59, 130, 246, 0.2) !important; }
html.dark #edu-mind-app .hover\:border-\[\#4a6cf7\]\/30:hover { border-color: rgba(59, 130, 246, 0.22) !important; }

/* Hover */
html.dark #edu-mind-app .dark\:hover\:bg-slate-700:hover { background-color: rgba(22, 18, 32, 0.5) !important; }
html.dark #edu-mind-app .dark\:hover\:bg-slate-800\/80:hover { background-color: rgba(17, 14, 26, 0.8) !important; }
html.dark #edu-mind-app .dark\:hover\:border-slate-600:hover { border-color: rgba(59, 130, 246, 0.2) !important; }
html.dark #edu-mind-app .dark\:focus\:border-\[#6a8cff\]:focus { border-color: #3b82f6 !important; }
html.dark #edu-mind-app .focus\:border-\[#4a6cf7\]:focus { border-color: #3b82f6 !important; }
html.dark #edu-mind-app .focus\:ring-\[#4a6cf7\]\/10 { --tw-ring-color: rgba(59, 130, 246, 0.1) !important; }

/* Sidebar & header */
html.dark #edu-mind-app #app-sidebar { background-color: var(--edu-bg-page) !important; border-right-color: var(--edu-border-subtle) !important; }
html.dark #edu-mind-app #main-header { border-bottom-color: var(--edu-border-subtle) !important; }
html.dark #edu-mind-app ::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.12) !important; }
html.dark #edu-mind-app ::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.22) !important; }
html.dark #edu-mind-app ::selection { background: rgba(59, 130, 246, 0.2); color: #fff; }
html.dark #edu-mind-app input::placeholder { color: rgba(165, 180, 216, 0.7) !important; }

/* Smooth transition */
html.dark #edu-mind-app * { transition-property: background-color, border-color, color, box-shadow; transition-duration: 0.15s; transition-timing-function: ease-out; }

/* ===== 所有硬编码暗色值统一覆盖（isDarkTheme 三元 + dark: 类） ===== */
/* 最深背景 → #07060a */
html.dark #edu-mind-app .bg-\[\#090a24\],
html.dark #edu-mind-app .bg-\[\#0a0c24\],
html.dark #edu-mind-app .bg-\[\#0a0c12\] { background-color: #07060a !important; }
html.dark #edu-mind-app .dark\:bg-\[\#090a24\],
html.dark #edu-mind-app .dark\:bg-\[\#0a0c24\] { background-color: #07060a !important; }

/* 深背景 → #0e0c15 */
html.dark #edu-mind-app .bg-\[\#0d0f2c\],
html.dark #edu-mind-app .bg-\[\#111438\],
html.dark #edu-mind-app .bg-\[\#151835\],
html.dark #edu-mind-app .bg-\[\#111338\],
html.dark #edu-mind-app .bg-\[\#0d0f2a\],
html.dark #edu-mind-app .bg-\[\#0d1130\],
html.dark #edu-mind-app .bg-\[\#1a1640\] { background-color: #0e0c15 !important; }
html.dark #edu-mind-app .dark\:bg-\[\#0d0f2c\],
html.dark #edu-mind-app .dark\:bg-\[\#111438\],
html.dark #edu-mind-app .dark\:bg-\[\#16183c\],
html.dark #edu-mind-app .dark\:hover\:bg-\[\#0d0f2c\]:hover,
html.dark #edu-mind-app .dark\:hover\:bg-\[\#16183c\]:hover,
html.dark #edu-mind-app .hover\:bg-\[\#111438\]:hover,
html.dark #edu-mind-app .hover\:bg-\[\#111338\]:hover,
html.dark #edu-mind-app .hover\:bg-\[\#1a1640\]:hover { background-color: #0e0c15 !important; }

/* 中间层背景 → #161220 */
html.dark #edu-mind-app .bg-\[\#101235\],
html.dark #edu-mind-app .bg-\[\#161840\],
html.dark #edu-mind-app .bg-\[\#1b1d45\] { background-color: #161220 !important; }

/* 带透明度的深背景 */
html.dark #edu-mind-app .bg-\[\#111338\]\/70,
html.dark #edu-mind-app .bg-\[\#111338\]\/50,
html.dark #edu-mind-app .bg-\[\#151835\]\/60,
html.dark #edu-mind-app .bg-\[\#0d0f2c\]\/80,
html.dark #edu-mind-app .bg-\[\#0d0f2c\]\/60,
html.dark #edu-mind-app .bg-\[\#0d0f2c\]\/90,
html.dark #edu-mind-app .hover\:bg-\[\#111438\]\/90:hover,
html.dark #edu-mind-app .hover\:bg-\[\#0d0f2c\]\/90:hover,
html.dark #edu-mind-app .dark\:hover\:bg-\[\#0d0f2c\]\/90:hover { background-color: rgba(14, 12, 21, 0.7) !important; }
html.dark #edu-mind-app .bg-\[\#1a1640\]\/35 { background-color: rgba(14, 12, 21, 0.35) !important; }

/* 边框 → 蓝色边框 */
html.dark #edu-mind-app .border-\[\#252060\],
html.dark #edu-mind-app .border-\[\#1e1b4b\],
html.dark #edu-mind-app .border-\[\#262058\],
html.dark #edu-mind-app .border-\[\#26205a\],
html.dark #edu-mind-app .border-\[\#201c50\],
html.dark #edu-mind-app .border-\[\#252055\],
html.dark #edu-mind-app .border-\[\#2d2660\],
html.dark #edu-mind-app .border-\[\#282260\],
html.dark #edu-mind-app .border-\[\#282265\] { border-color: rgba(59, 130, 246, 0.1) !important; }
html.dark #edu-mind-app .dark\:border-\[\#252060\],
html.dark #edu-mind-app .dark\:border-\[\#282260\],
html.dark #edu-mind-app .dark\:border-\[\#1e1b4b\] { border-color: rgba(59, 130, 246, 0.1) !important; }
html.dark #edu-mind-app .dark\:hover\:border-\[\#282260\]:hover,
html.dark #edu-mind-app .dark\:hover\:border-\[\#6d5cff\]:hover,
html.dark #edu-mind-app .hover\:border-\[\#282260\]:hover,
html.dark #edu-mind-app .hover\:border-\[\#00d4ff\]:hover { border-color: rgba(59, 130, 246, 0.2) !important; }

/* 边框带透明度 */
html.dark #edu-mind-app .border-\[\#252060\]\/20,
html.dark #edu-mind-app .border-\[\#252060\]\/30,
html.dark #edu-mind-app .border-\[\#1e1b4b\]\/90 { border-color: rgba(59, 130, 246, 0.08) !important; }

/* 分割线 */
html.dark #edu-mind-app .bg-\[\#252060\],
html.dark #edu-mind-app .bg-\[\#252940\] { background-color: rgba(59, 130, 246, 0.08) !important; }

/* 深色文字 → 使用对话页面文字色 */
html.dark #edu-mind-app .text-\[\#b8c4dc\] { color: #a5b4d8 !important; }
html.dark #edu-mind-app .text-\[\#9aa4d9\],
html.dark #edu-mind-app .text-\[\#8b9bc0\],
html.dark #edu-mind-app .dark\:text-\[\#8b9bc0\] { color: #a5b4d8 !important; }
html.dark #edu-mind-app .text-\[\#6f7a9e\] { color: #6b7fa8 !important; }
html.dark #edu-mind-app .text-\[\#f0f2ff\],
html.dark #edu-mind-app .text-\[\#f0f6fc\] { color: #e0e7ff !important; }
html.dark #edu-mind-app .dark\:text-\[\#00d4ff\],
html.dark #edu-mind-app .text-\[\#00d4ff\] { color: #3b82f6 !important; }
html.dark #edu-mind-app .hover\:text-\[\#00d4ff\]:hover,
html.dark #edu-mind-app .hover\:text-\[\#f0f2ff\]:hover,
html.dark #edu-mind-app .dark\:hover\:text-white:hover { color: #e0e7ff !important; }
html.dark #edu-mind-app .hover\:text-\[\#fff\]:hover { color: #e0e7ff !important; }

/* text-indigo-200 → 浅蓝 */
html.dark #edu-mind-app .text-indigo-200 { color: #a5b4d8 !important; }

/* 焦点边框 */
html.dark #edu-mind-app .focus\:border-\[\#00d4ff\],
html.dark #edu-mind-app .focus\:ring-\[\#00d4ff\] { border-color: #3b82f6 !important; --tw-ring-color: rgba(59, 130, 246, 0.15) !important; }

/* rgba(59,130,246,0.12) 边框 → 蓝色 */
html.dark #edu-mind-app [class*="border-[rgba(59"] { border-color: rgba(59, 130, 246, 0.1) !important; }

/* ===== 主色统一收敛 — 所有蓝色在 dark 下指向同一套 ===== */
/* 残留的浅色主色 #4a6cf7 在深色下应该 → --edu-accent (#3b82f6) */
html.dark #edu-mind-app .text-\[\#4a6cf7\],
html.dark #edu-mind-app .text-accent { color: var(--edu-accent) !important; }
html.dark #edu-mind-app .border-\[\#4a6cf7\] { border-color: var(--edu-accent) !important; }
html.dark #edu-mind-app .bg-\[\#4a6cf7\] { background-color: var(--edu-accent) !important; }
html.dark #edu-mind-app .bg-\[\#3b82f6\] { background-color: var(--edu-accent) !important; }
/* 过深的偏紫蓝 #6a8cff → 统一到蓝色 #3b82f6 用于 hover/亮态 */
html.dark #edu-mind-app .text-\[\#6a8cff\] { color: #60a5fa !important; }
/* 主按钮悬停 */
html.dark #edu-mind-app .hover\:bg-\[\#3555db\]:hover,
html.dark #edu-mind-app .hover\:bg-\[\#2563eb\]:hover { background-color: #2563eb !important; }

/* 蓝色调带透明度的覆盖 */
html.dark #edu-mind-app .bg-\[\#4a6cf7\]\/10 { background-color: rgba(59, 130, 246, 0.1) !important; }
html.dark #edu-mind-app .bg-\[\#4a6cf7\]\/15 { background-color: rgba(59, 130, 246, 0.12) !important; }
html.dark #edu-mind-app .bg-\[\#4a6cf7\]\/20 { background-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .bg-\[\#4a6cf7\]\/5 { background-color: rgba(59, 130, 246, 0.04) !important; }
html.dark #edu-mind-app .border-\[\#4a6cf7\]\/10 { border-color: rgba(59, 130, 246, 0.1) !important; }
html.dark #edu-mind-app .border-\[\#4a6cf7\]\/20 { border-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .border-\[\#4a6cf7\]\/30 { border-color: rgba(59, 130, 246, 0.2) !important; }
html.dark #edu-mind-app .border-\[\#4a6cf7\]\/40 { border-color: rgba(59, 130, 246, 0.25) !important; }
html.dark #edu-mind-app .hover\:bg-\[\#4a6cf7\]:hover { background-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .hover\:border-\[\#4a6cf7\]:hover { border-color: rgba(59, 130, 246, 0.25) !important; }
html.dark #edu-mind-app .focus\:border-\[\#4a6cf7\]:focus { border-color: #3b82f6 !important; }
html.dark #edu-mind-app .focus\:ring-\[\#4a6cf7\] { --tw-ring-color: rgba(59, 130, 246, 0.15) !important; }
html.dark #edu-mind-app .focus\:ring-\[\#4a6cf7\]\/10 { --tw-ring-color: rgba(59, 130, 246, 0.1) !important; }
html.dark #edu-mind-app .ring-\[\#4a6cf7\] { --tw-ring-color: rgba(59, 130, 246, 0.15) !important; }

/* 浅色主题的蓝色按钮也统一为蓝色 */
html.dark #edu-mind-app .bg-\[\#f0f4ff\] { background-color: rgba(59, 130, 246, 0.08) !important; }
html.dark #edu-mind-app .text-\[\#6a8cff\] { color: #60a5fa !important; }
html.dark #edu-mind-app .hover\:bg-\[\#4a6cf7\]:hover { background-color: rgba(59, 130, 246, 0.18) !important; }
html.dark #edu-mind-app .hover\:bg-\[\#3b5bdb\]:hover { background-color: #1d4ed8 !important; }

/* toggle 背景色 */
html.dark #edu-mind-app .bg-\[\#4a6cf7\] { background-color: #3b82f6 !important; }

/* ===== 卡片在深色下加强分层(发光感) ===== */
html.dark #edu-mind-app .shadow-xs,
html.dark #edu-mind-app .shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.03) !important;
}
html.dark #edu-mind-app .shadow-md {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.05) !important;
}
html.dark #edu-mind-app .shadow-xl,
html.dark #edu-mind-app .shadow-2xl {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(59, 130, 246, 0.08) !important;
}

/* 卡片 hover 加微微极光感 */
html.dark #edu-mind-app .hover\:shadow-md:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45), 0 0 20px rgba(59, 130, 246, 0.05) !important;
}

/* ===== Input / Select / Textarea 在深色下的可读性 ===== */
html.dark #edu-mind-app input,
html.dark #edu-mind-app select,
html.dark #edu-mind-app textarea {
  color: var(--edu-text-main);
}
html.dark #edu-mind-app input:focus,
html.dark #edu-mind-app select:focus,
html.dark #edu-mind-app textarea:focus {
  outline: none;
  border-color: var(--edu-accent) !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* ===== 模态遮罩在深色下更深、更模糊 ===== */
html.dark #edu-mind-app .bg-slate-900\/60 { background-color: rgba(0, 0, 0, 0.75) !important; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }

.edu-main-stage {
  background:
    radial-gradient(circle at 72% 0%, rgba(59, 130, 246, 0.05), transparent 36%),
    radial-gradient(circle at 20% 68%, rgba(59, 130, 246, 0.03), transparent 30%);
}



/* ===== 资源详情子页面 ===== */
.resource-detail-page {
  background: rgba(14, 12, 21, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  padding: 28px 32px;
}
.resource-detail-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600; color: #60a5fa;
  background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.18);
  padding: 6px 14px; border-radius: 8px; cursor: pointer;
  transition: all 0.15s; margin-bottom: 20px;
}
.resource-detail-back:hover { background: rgba(59, 130, 246, 0.18); color: #93c5fd; }

.resource-detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.resource-detail-badges { display: flex; gap: 8px; }
.resource-detail-category {
  font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 6px;
  background: rgba(59, 130, 246, 0.12); color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.2);
}
.resource-detail-difficulty {
  font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 6px;
  background: rgba(255, 180, 108, 0.14); color: #ffb46c;
}
.resource-detail-actions { display: flex; gap: 8px; }
.resource-detail-star {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: #a5b4d8;
  padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.1);
  background: transparent; cursor: pointer; transition: all 0.15s;
}
.resource-detail-star:hover { border-color: rgba(59, 130, 246, 0.25); color: #fadb14; }

.resource-detail-title {
  font-size: 24px; font-weight: 800; color: #e0e7ff;
  line-height: 1.3; margin-bottom: 14px;
}
.resource-detail-meta {
  display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #a5b4d8;
  padding-bottom: 16px; margin-bottom: 20px;
  border-bottom: 1px dashed rgba(59, 130, 246, 0.1);
}
.resource-detail-meta span { display: flex; align-items: center; gap: 6px; }
.resource-detail-meta strong { color: #a5b4d8; }

.resource-detail-body {
  font-size: 15px; color: #a5b4d8; line-height: 1.8;
  margin-bottom: 20px; min-height: 80px;
}
.resource-detail-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.resource-detail-tag {
  font-size: 12px; padding: 3px 10px; border-radius: 5px;
  background: rgba(59, 130, 246, 0.08); color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.resource-detail-bottom {
  display: flex; gap: 20px; padding-top: 20px;
  border-top: 1px solid rgba(59, 130, 246, 0.08);
}
.resource-detail-rating { flex: 1; }
.resource-detail-rating-title { font-size: 15px; font-weight: 600; color: #e0e7ff; }
.resource-detail-rating-sub { font-size: 13px; color: #a5b4d8; margin-top: 4px; }

.resource-detail-learn { flex: 1; text-align: right; }
.resource-detail-learn p { font-size: 13px; color: #a5b4d8; margin-bottom: 10px; }
.resource-detail-cta {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 24px; border-radius: 8px; border: none;
  font-size: 14px; font-weight: 700; color: #fff; cursor: pointer;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.25);
  transition: all 0.15s;
}
.resource-detail-cta:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(59, 130, 246, 0.35); }
</style>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.toast-slide-enter-active {
  transition: all 0.3s ease-out;
}
.toast-slide-leave-active {
  transition: all 0.2s ease-in;
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, 30px) scale(0.9);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 0) scale(0.9);
}

</style>
