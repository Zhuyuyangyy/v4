<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useTheme } from '../../composables/useEduMindTheme'
import {
  Search,
  Plus,
  FileText,
  BookOpen,
  Clock,
  Tag,
  Trash2,
  Save,
  Eye,
  Pencil,
  X,
  ChevronDown,
  StickyNote,
  Calendar,
  ArrowUpDown,
  FolderOpen,
  Hash,
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'

const { isDark } = useTheme()

interface NoteItem {
  id: string
  title: string
  content: string
  course: string
  tags: string[]
  lastEdited: string
  createdAt: string
  wordCount: number
}

const notes = reactive<NoteItem[]>([
  {
    id: 'n1',
    title: 'C语言指针与内存管理核心要点',
    content: '指针是C语言最核心也最危险的概念。指针变量存储的是内存地址，通过 * 运算符可以间接访问该地址处的值。关键要点：\n\n1. 指针声明：int *p 表示 p 是一个指向 int 类型的指针\n2. 取地址运算符 &：获取变量的内存地址\n3. 解引用运算符 *：访问指针指向的值\n4. 指针与数组：数组名本质上是指向第一个元素的指针\n5. 动态内存分配：malloc() 分配内存，free() 释放内存\n6. 常见陷阱：野指针、悬空指针、内存泄漏\n\n特别注意：使用 malloc 后必须检查返回值是否为 NULL，使用完毕后必须调用 free 释放，否则会导致内存泄漏。',
    course: 'C语言程序设计',
    tags: ['指针', '内存管理', 'C语言'],
    lastEdited: '2026-05-26 14:30',
    createdAt: '2026-05-20 10:00',
    wordCount: 256
  },
  {
    id: 'n2',
    title: 'Python列表推导式与生成器表达式对比',
    content: '列表推导式和生成器表达式是Python中非常优雅的语法特性，但它们有本质区别：\n\n列表推导式 [x for x in range(10)]：\n- 立即计算并返回完整列表\n- 占用更多内存\n- 可以多次迭代\n\n生成器表达式 (x for x in range(10))：\n- 惰性计算，按需生成\n- 内存占用极小\n- 只能迭代一次\n\n性能建议：当数据量大且只需遍历一次时，优先使用生成器表达式。例如：sum(x**2 for x in range(1000000)) 比先创建列表再求和高效得多。',
    course: 'Python编程基础',
    tags: ['Python', '列表推导式', '生成器', '性能优化'],
    lastEdited: '2026-05-25 20:15',
    createdAt: '2026-05-22 16:30',
    wordCount: 198
  },
  {
    id: 'n3',
    title: 'Java多线程编程：synchronized与Lock对比',
    content: '在Java并发编程中，synchronized关键字和Lock接口是两种主要的同步机制：\n\nsynchronized：\n- JVM内置关键字，自动释放锁\n- 不可中断，等待的线程会一直阻塞\n- 无法知道是否成功获取锁\n- 支持锁重入\n\nLock（ReentrantLock）：\n- 需要手动加锁和释放锁（必须在finally中释放）\n- 支持可中断的锁获取 tryLock()\n- 支持超时获取锁 tryLock(timeout)\n- 支持公平锁\n- 可以配合Condition实现精准唤醒\n\n选择建议：简单同步用synchronized，需要高级功能（超时、可中断、公平性）时用Lock。',
    course: 'Java面向对象编程',
    tags: ['Java', '多线程', '并发', '锁机制'],
    lastEdited: '2026-05-24 09:45',
    createdAt: '2026-05-18 14:20',
    wordCount: 224
  },
  {
    id: 'n4',
    title: '数据结构：二叉树遍历算法总结',
    content: '二叉树的三种深度优先遍历方式：\n\n前序遍历（根-左-右）：\n- 应用：复制树结构、序列化\n- 递归：visit(root) -> preorder(left) -> preorder(right)\n\n中序遍历（左-根-右）：\n- 应用：BST排序输出\n- 递归：inorder(left) -> visit(root) -> inorder(right)\n\n后序遍历（左-右-根）：\n- 应用：删除树、计算目录大小\n- 递归：postorder(left) -> postorder(right) -> visit(root)\n\n层序遍历（BFS）：\n- 使用队列实现\n- 应用：按层打印、求最大宽度\n\n非递归实现要点：前序和中序用栈，后序需要标记已访问节点或使用双栈法。',
    course: '数据结构与算法',
    tags: ['二叉树', '遍历', '递归', 'BFS'],
    lastEdited: '2026-05-23 18:00',
    createdAt: '2026-05-15 11:30',
    wordCount: 215
  },
  {
    id: 'n5',
    title: '机器学习：KNN算法原理与实现笔记',
    content: 'K近邻算法（K-Nearest Neighbors）核心思想：物以类聚，近朱者赤。\n\n算法步骤：\n1. 计算待分类样本与所有训练样本的距离\n2. 选取距离最近的K个样本\n3. 统计K个样本中各类别的数量\n4. 将待分类样本归为数量最多的类别\n\n距离度量方式：\n- 欧氏距离：最常用\n- 曼哈顿距离：适合高维数据\n- 余弦相似度：适合文本分类\n\nK值选择：\n- K太小：容易过拟合，受噪声影响大\n- K太大：容易欠拟合，决策边界过于平滑\n- 通常通过交叉验证选择最优K值\n\n优缺点：\n- 优点：简单直观，无需训练\n- 缺点：预测慢，对特征尺度敏感（需归一化）',
    course: '机器学习导论',
    tags: ['KNN', '分类算法', '距离度量', '机器学习'],
    lastEdited: '2026-05-22 15:20',
    createdAt: '2026-05-10 09:00',
    wordCount: 243
  },
  {
    id: 'n6',
    title: '深度学习：反向传播算法推导过程',
    content: '反向传播（Backpropagation）是训练神经网络的核心算法，本质是链式法则的应用。\n\n前向传播：\n- 输入层 -> 隐藏层 -> 输出层\n- 每层计算 z = Wx + b, a = activation(z)\n\n损失函数：\n- 均方误差（回归）：L = 1/2 * Σ(y - ŷ)²\n- 交叉熵（分类）：L = -Σy·log(ŷ)\n\n反向传播步骤：\n1. 计算输出层误差 δ_L = ∂L/∂z_L\n2. 反向传播误差 δ_l = (W_{l+1}^T · δ_{l+1}) ⊙ σ\'(z_l)\n3. 计算梯度 ∂L/∂W_l = δ_l · a_{l-1}^T\n4. 更新权重 W = W - η·∂L/∂W\n\n关键技巧：\n- 学习率不宜过大，否则震荡\n- 使用Batch Normalization加速收敛\n- 梯度消失问题可用ReLU缓解',
    course: '深度学习基础',
    tags: ['反向传播', '神经网络', '梯度下降', '深度学习'],
    lastEdited: '2026-05-21 12:40',
    createdAt: '2026-05-08 15:00',
    wordCount: 267
  },
  {
    id: 'n7',
    title: '编译原理：词法分析与正则表达式',
    content: '词法分析是编译器的第一个阶段，将源代码字符流转换为Token序列。\n\nToken类型：\n- 关键字（if, while, return）\n- 标识符（变量名、函数名）\n- 常量（数字、字符串）\n- 运算符（+, -, *, /）\n- 界符（括号、分号）\n\n正则表达式到NFA：\n- Thompson构造法：每个正则表达式对应一个NFA\n- 基本规则：ε转移连接子NFA\n\nNFA到DFA：\n- 子集构造法\n- 计算ε-closure和move操作\n\nDFA最小化：\n- Hopcroft算法\n- 合并等价状态\n\n实际工具：Lex/Flex使用正则表达式定义词法规则，自动生成C代码。',
    course: '编译原理',
    tags: ['词法分析', '正则表达式', 'NFA', 'DFA', '编译器'],
    lastEdited: '2026-05-19 16:50',
    createdAt: '2026-05-05 10:30',
    wordCount: 210
  },
  {
    id: 'n8',
    title: 'C++ RAII机制与智能指针详解',
    content: 'RAII（Resource Acquisition Is Initialization）是C++最重要的编程范式之一。\n\n核心思想：资源的获取与对象的生命周期绑定，对象析构时自动释放资源。\n\n智能指针：\n\nunique_ptr：\n- 独占所有权，不可复制\n- std::make_unique<T>() 创建\n- 适合单一所有者场景\n\nshared_ptr：\n- 共享所有权，引用计数\n- std::make_shared<T>() 创建\n- 最后一个shared_ptr析构时释放资源\n- 注意循环引用问题\n\nweak_ptr：\n- 不增加引用计数\n- 解决shared_ptr循环引用\n- lock() 方法获取shared_ptr\n\n最佳实践：\n- 优先使用unique_ptr\n- 需要共享时用shared_ptr\n- 打破循环引用用weak_ptr\n- 永远不要用裸指针管理资源',
    course: 'C++高级编程',
    tags: ['RAII', '智能指针', '内存安全', 'C++'],
    lastEdited: '2026-05-18 21:30',
    createdAt: '2026-05-03 14:00',
    wordCount: 235
  }
])

const selectedNoteId = ref<string | null>(null)
const searchQuery = ref('')
const courseFilter = ref('全部')
const sortBy = ref<'lastEdited' | 'createdAt'>('lastEdited')
const editorMode = ref<'edit' | 'preview'>('edit')

const editTitle = ref('')
const editContent = ref('')
const editCourse = ref('')
const editTags = ref<string[]>([])
const newTagInput = ref('')

const showDeleteConfirm = ref(false)

const courses = computed(() => {
  const set = new Set(notes.map(n => n.course))
  return ['全部', ...Array.from(set)]
})

const filteredNotes = computed(() => {
  let result = [...notes]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  if (courseFilter.value !== '全部') {
    result = result.filter(n => n.course === courseFilter.value)
  }
  result.sort((a, b) => {
    if (sortBy.value === 'lastEdited') {
      return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  return result
})

const selectedNote = computed(() => {
  if (!selectedNoteId.value) return null
  return notes.find(n => n.id === selectedNoteId.value) || null
})

const totalWordCount = computed(() => notes.reduce((acc, n) => acc + n.wordCount, 0))

const currentEditWordCount = computed(() => {
  if (!editContent.value) return 0
  return editContent.value.replace(/\s/g, '').length
})

const handleSelectNote = (note: NoteItem) => {
  selectedNoteId.value = note.id
  editTitle.value = note.title
  editContent.value = note.content
  editCourse.value = note.course
  editTags.value = [...note.tags]
  editorMode.value = 'edit'
  showDeleteConfirm.value = false
}

const handleCreateNote = () => {
  const newId = `n${Date.now()}`
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const newNote: NoteItem = {
    id: newId,
    title: '未命名笔记',
    content: '',
    course: 'C语言程序设计',
    tags: [],
    lastEdited: timeStr,
    createdAt: timeStr,
    wordCount: 0
  }
  notes.unshift(newNote)
  handleSelectNote(newNote)
}

const handleSaveNote = () => {
  if (!selectedNoteId.value) return
  const idx = notes.findIndex(n => n.id === selectedNoteId.value)
  if (idx === -1) return
  const now = new Date()
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  notes[idx] = {
    ...notes[idx],
    title: editTitle.value || '未命名笔记',
    content: editContent.value,
    course: editCourse.value,
    tags: [...editTags.value],
    lastEdited: timeStr,
    wordCount: currentEditWordCount.value
  }
  selectedNoteId.value = notes[idx].id
}

const handleDeleteNote = () => {
  if (!selectedNoteId.value) return
  const idx = notes.findIndex(n => n.id === selectedNoteId.value)
  if (idx === -1) return
  notes.splice(idx, 1)
  selectedNoteId.value = null
  showDeleteConfirm.value = false
}

const handleAddTag = () => {
  const tag = newTagInput.value.trim()
  if (!tag || editTags.value.includes(tag)) return
  editTags.value.push(tag)
  newTagInput.value = ''
}

const handleRemoveTag = (tag: string) => {
  editTags.value = editTags.value.filter(t => t !== tag)
}

const handleTagKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleAddTag()
  }
}

const getCourseColor = (course: string) => {
  const map: Record<string, string> = {
    'C语言程序设计': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    'Python编程基础': 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
    'Java面向对象编程': 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
    '数据结构与算法': 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    '机器学习导论': 'bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800',
    '深度学习基础': 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800',
    '编译原理': 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
    'C++高级编程': 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800'
  }
  return map[course] || 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
}

const formatTime = (time: string) => {
  const d = new Date(time)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}天前`
  return time
}
</script>

<template>
  <div class="flex-1 flex flex-col gap-5 dark:bg-[#0f172a]">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-[20px] font-bold text-[#1e293b] dark:text-white tracking-tight flex items-center gap-2">
          <StickyNote class="w-5 h-5 text-[#4a6cf7]" />
          我的笔记
        </h1>
        <p class="text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          共 <span class="font-bold text-[#4a6cf7]">{{ notes.length }}</span> 篇笔记，累计 <span class="font-bold text-[#4a6cf7]">{{ totalWordCount }}</span> 字
        </p>
      </div>
      <button
        @click="handleCreateNote"
        class="flex items-center gap-1.5 px-4 py-2 bg-[#4a6cf7] hover:bg-[#3555db] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer transition-colors shadow-sm"
      >
        <Plus class="w-4 h-4" />
        <span>新建笔记</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
      <div class="lg:col-span-5 flex flex-col gap-3 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg px-3 py-2">
          <Search class="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="搜索笔记标题、内容或标签..."
            v-model="searchQuery"
            class="bg-transparent border-none outline-none text-[14px] text-slate-700 dark:text-slate-200 w-full placeholder-slate-400"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-none bg-transparent cursor-pointer shrink-0"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg shrink-0">
            <BookOpen class="w-3.5 h-3.5 text-slate-400" />
            <select
              v-model="courseFilter"
              class="bg-transparent border-none outline-none text-[13px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer"
            >
              <option v-for="c in courses" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg shrink-0">
            <ArrowUpDown class="w-3.5 h-3.5 text-slate-400" />
            <select
              v-model="sortBy"
              class="bg-transparent border-none outline-none text-[13px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer"
            >
              <option value="lastEdited">最近编辑</option>
              <option value="createdAt">创建时间</option>
            </select>
          </div>
          <span class="text-[12px] text-slate-400 dark:text-slate-500 ml-auto">
            {{ filteredNotes.length }} 条结果
          </span>
        </div>

        <div class="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-0.5">
          <div
            v-for="note in filteredNotes"
            :key="note.id"
            @click="handleSelectNote(note)"
            :class="[
              'p-3.5 rounded-xl border cursor-pointer transition-all duration-150 group',
              selectedNoteId === note.id
                ? 'bg-[#f0f4ff] dark:bg-blue-900/20 border-[#4a6cf7]/40 border-l-4 border-l-[#4a6cf7] shadow-sm'
                : 'bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs'
            ]"
          >
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h4 :class="[
                'text-[14.5px] font-bold leading-tight line-clamp-1',
                selectedNoteId === note.id ? 'text-[#4a6cf7]' : 'text-[#1e293b] dark:text-white'
              ]">
                {{ note.title }}
              </h4>
            </div>
            <p class="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
              {{ note.content }}
            </p>
            <div class="flex items-center justify-between gap-2">
              <span :class="['text-[11.5px] px-2 py-0.5 rounded-md font-semibold border', getCourseColor(note.course)]">
                {{ note.course }}
              </span>
              <div class="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
                <Clock class="w-3 h-3" />
                <span>{{ formatTime(note.lastEdited) }}</span>
              </div>
            </div>
            <div v-if="note.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in note.tags.slice(0, 3)"
                :key="tag"
                class="text-[11px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded font-medium"
              >
                #{{ tag }}
              </span>
              <span v-if="note.tags.length > 3" class="text-[11px] px-1.5 py-0.5 text-slate-400 dark:text-slate-500">
                +{{ note.tags.length - 3 }}
              </span>
            </div>
          </div>

          <div v-if="filteredNotes.length === 0" class="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500">
            <FileText class="w-10 h-10 mb-2 text-slate-300 dark:text-slate-600" />
            <p class="text-[14px] font-medium">没有找到匹配的笔记</p>
            <p class="text-[13px] mt-1">尝试修改搜索条件或筛选器</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 flex flex-col bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <template v-if="selectedNote">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700 shrink-0">
            <div class="flex items-center gap-2">
              <button
                @click="editorMode = 'edit'"
                :class="[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold border-none cursor-pointer transition-all',
                  editorMode === 'edit'
                    ? 'bg-[#4a6cf7] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                ]"
              >
                <Pencil class="w-3.5 h-3.5" />
                <span>编辑</span>
              </button>
              <button
                @click="editorMode = 'preview'"
                :class="[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold border-none cursor-pointer transition-all',
                  editorMode === 'preview'
                    ? 'bg-[#4a6cf7] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                ]"
              >
                <Eye class="w-3.5 h-3.5" />
                <span>预览</span>
              </button>
            </div>
            <div class="flex items-center gap-2 text-[12px] text-slate-400 dark:text-slate-500">
              <Calendar class="w-3.5 h-3.5" />
              <span>创建于 {{ selectedNote.createdAt }}</span>
            </div>
          </div>

          <div v-if="editorMode === 'edit'" class="flex-1 flex flex-col overflow-hidden">
            <div class="px-5 pt-4 pb-2">
              <input
                type="text"
                v-model="editTitle"
                placeholder="笔记标题..."
                class="w-full text-[20px] font-bold text-[#1e293b] dark:text-white bg-transparent border-none outline-none placeholder-slate-300 dark:placeholder-slate-600 tracking-tight"
              />
            </div>

            <div class="px-5 pb-3">
              <div class="flex items-center gap-2">
                <FolderOpen class="w-4 h-4 text-slate-400 shrink-0" />
                <span class="text-[13px] text-slate-500 dark:text-slate-400 shrink-0">来源课程</span>
                <select
                  v-model="editCourse"
                  class="text-[13px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                >
                  <option v-for="c in courses.filter(x => x !== '全部')" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <div class="px-5 pb-3">
              <div class="flex items-center gap-2 flex-wrap">
                <Hash class="w-4 h-4 text-slate-400 shrink-0" />
                <span class="text-[13px] text-slate-500 dark:text-slate-400 shrink-0">标签</span>
                <span
                  v-for="tag in editTags"
                  :key="tag"
                  class="inline-flex items-center gap-1 text-[12px] px-2 py-0.5 bg-[#f0f4ff] dark:bg-blue-900/30 text-[#4a6cf7] dark:text-blue-400 rounded-full font-medium border border-[#dce6ff] dark:border-blue-800"
                >
                  {{ tag }}
                  <button
                    @click="handleRemoveTag(tag)"
                    class="text-[#4a6cf7]/60 dark:text-blue-400/60 hover:text-rose-500 dark:hover:text-rose-400 border-none bg-transparent cursor-pointer p-0 leading-none"
                  >
                    <X class="w-3 h-3" />
                  </button>
                </span>
                <input
                  type="text"
                  v-model="newTagInput"
                  @keydown="handleTagKeyDown"
                  placeholder="添加标签..."
                  class="text-[13px] text-slate-600 dark:text-slate-300 bg-transparent border-none outline-none placeholder-slate-300 dark:placeholder-slate-600 w-24 min-w-[60px]"
                />
              </div>
            </div>

            <div class="flex-1 px-5 pb-3 min-h-0">
              <textarea
                v-model="editContent"
                placeholder="开始记录你的学习笔记..."
                class="w-full h-full min-h-[300px] p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-[14px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 outline-none resize-none leading-relaxed font-sans focus:border-[#4a6cf7] dark:focus:border-[#6a8cff] transition-colors"
              />
            </div>

            <div class="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-700 shrink-0 bg-slate-50/50 dark:bg-slate-800/50">
              <div class="flex items-center gap-3">
                <button
                  @click="handleSaveNote"
                  class="flex items-center gap-1.5 px-4 py-1.5 bg-[#4a6cf7] hover:bg-[#3555db] text-white text-[13.5px] font-bold rounded-lg border-none cursor-pointer transition-colors shadow-sm"
                >
                  <Save class="w-3.5 h-3.5" />
                  <span>保存</span>
                </button>
                <button
                  v-if="!showDeleteConfirm"
                  @click="showDeleteConfirm = true"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-rose-300 dark:hover:border-rose-600 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 text-[13px] font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                  <span>删除</span>
                </button>
                <template v-else>
                  <span class="text-[13px] text-rose-500 font-medium">确认删除？</span>
                  <button
                    @click="handleDeleteNote"
                    class="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-[13px] font-bold rounded-lg border-none cursor-pointer transition-colors"
                  >
                    确认
                  </button>
                  <button
                    @click="showDeleteConfirm = false"
                    class="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-[13px] font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    取消
                  </button>
                </template>
              </div>
              <div class="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500">
                <FileText class="w-3.5 h-3.5" />
                <span>{{ currentEditWordCount }} 字</span>
              </div>
            </div>
          </div>

          <div v-else class="flex-1 flex flex-col overflow-hidden">
            <div class="flex-1 overflow-y-auto px-6 py-5">
              <h1 class="text-[22px] font-bold text-[#1e293b] dark:text-white tracking-tight mb-3 leading-tight">
                {{ editTitle || '未命名笔记' }}
              </h1>
              <div class="flex items-center gap-3 mb-4 flex-wrap">
                <span :class="['text-[12px] px-2.5 py-1 rounded-md font-semibold border', getCourseColor(editCourse)]">
                  <BookOpen class="w-3 h-3 inline-block mr-1 -mt-0.5" />
                  {{ editCourse }}
                </span>
                <span
                  v-for="tag in editTags"
                  :key="tag"
                  class="text-[12px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded font-medium"
                >
                  #{{ tag }}
                </span>
              </div>
              <div class="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {{ editContent || '暂无内容' }}
              </div>
            </div>
            <div class="flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-slate-700 shrink-0 bg-slate-50/50 dark:bg-slate-800/50">
              <div class="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500">
                <FileText class="w-3.5 h-3.5" />
                <span>{{ currentEditWordCount }} 字</span>
              </div>
              <div class="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500">
                <Clock class="w-3.5 h-3.5" />
                <span>最后编辑 {{ selectedNote.lastEdited }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex-1 flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
            <div class="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4">
              <FileText class="w-9 h-9 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 class="text-[16px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">选择一篇笔记开始</h3>
            <p class="text-[14px] text-slate-400 dark:text-slate-500 max-w-xs text-center leading-relaxed">
              从左侧列表中选择一篇笔记进行编辑或预览，也可以点击右上角按钮新建笔记
            </p>
            <button
              @click="handleCreateNote"
              class="mt-5 flex items-center gap-1.5 px-4 py-2 bg-[#4a6cf7] hover:bg-[#3555db] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer transition-colors shadow-sm"
            >
              <Plus class="w-4 h-4" />
              <span>新建笔记</span>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
