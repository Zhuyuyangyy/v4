<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTheme } from '../../composables/useEduMindTheme'
import {
  Network,
  Search,
  Plus,
  Minus,
  Download,
  Trash2,
  PlusCircle,
  FileText,
  CheckCircle,
  BookOpen,
  ArrowLeft,
  Undo2,
  Redo2,
  Sliders,
  Maximize,
  Keyboard,
  Compass,
  Palette,
  Layout,
  FolderOpen,
  Layers,
  Sparkle
} from 'lucide-vue-next'

interface MindNode {
  id: string
  label: string
  side?: 'left' | 'right' | 'root'
  color?: string
  collapsed?: boolean
  priority?: 'P1' | 'P2' | 'P3' | 'None'
  progress?: 0 | 25 | 50 | 75 | 100
  notes?: string
  children?: MindNode[]
}

interface NodeLayout {
  id: string
  x: number
  y: number
  width: number
  height: number
  side: 'left' | 'right' | 'root'
  node: MindNode
  level: number
}

interface MindTheme {
  id: string
  name: string
  bgClass: string
  canvasBg: string
  gridColor: string
  rootBox: string
  rootText: string
  branchColors: string[]
  nodeBorder: string
  textColor: string
  accentColor: string
  isDark: boolean
}

type StructureStyle = 'curved' | 'logic-right' | 'org-vertical'

const PREMIUM_THEMES: MindTheme[] = [
  {
    id: 'classic-snow',
    name: '极地晴雪',
    bgClass: 'bg-[#fafbfe]',
    canvasBg: '#fafbfe',
    gridColor: '#e2e8f0',
    rootBox: 'bg-gradient-to-r from-[#4a6cf7] to-[#3b82f6] text-white border-none shadow-md',
    rootText: 'text-white',
    branchColors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'],
    nodeBorder: 'border-[#cbd5e1] hover:border-[#4a6cf7]',
    textColor: 'text-[#334155]',
    accentColor: '#4a6cf7',
    isDark: false
  },
  {
    id: 'midnight-charcoal',
    name: '黑曜重力',
    bgClass: 'bg-[#0f172a]',
    canvasBg: '#0f172a',
    gridColor: '#1e293b',
    rootBox: 'bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#8b5cf6] text-white border-none shadow-lg shadow-pink-500/10',
    rootText: 'text-white font-extrabold',
    branchColors: ['#ec4899', '#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#06b6d4'],
    nodeBorder: 'border-slate-700 hover:border-pink-500 bg-slate-900',
    textColor: 'text-slate-200',
    accentColor: '#ec4899',
    isDark: true
  },
  {
    id: 'fresh-matcha',
    name: '雨后龙井',
    bgClass: 'bg-[#f4f7f4]',
    canvasBg: '#f4f7f4',
    gridColor: '#e2eae2',
    rootBox: 'bg-emerald-600 text-white border-none shadow-sm',
    rootText: 'text-white',
    branchColors: ['#059669', '#10b981', '#22c55e', '#84cc16', '#65a30d', '#15803d'],
    nodeBorder: 'border-emerald-200 hover:border-emerald-600 bg-white/90',
    textColor: 'text-slate-800',
    accentColor: '#059669',
    isDark: false
  },
  {
    id: 'macaron-cream',
    name: '马卡龙奶油',
    bgClass: 'bg-[#fdbfe7]/10',
    canvasBg: '#fdfbf7',
    gridColor: '#f3eade',
    rootBox: 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white shadow-md border-none',
    rootText: 'text-white',
    branchColors: ['#fb7185', '#c084fc', '#818cf8', '#34d399', '#fbbf24', '#f472b6'],
    nodeBorder: 'border-pink-200 hover:border-pink-400 bg-white',
    textColor: 'text-slate-700',
    accentColor: '#fb7185',
    isDark: false
  },
  {
    id: 'retro-mustard',
    name: '中古摩登',
    bgClass: 'bg-[#f1ecd1]',
    canvasBg: '#f1ecd1',
    gridColor: '#e5dbb0',
    rootBox: 'bg-[#40513B] text-white border-none shadow-md',
    rootText: 'text-white',
    branchColors: ['#609966', '#9DC08B', '#f59e0b', '#e11d48', '#8b5cf6', '#06b6d4'],
    nodeBorder: 'border-stone-450 hover:border-stone-800 bg-[#f7f5e8]',
    textColor: 'text-stone-850',
    accentColor: '#40513B',
    isDark: false
  },
  {
    id: 'ultra-slate',
    name: '黑胶极简',
    bgClass: 'bg-white',
    canvasBg: '#ffffff',
    gridColor: '#f1f5f9',
    rootBox: 'bg-slate-900 border-none text-white shadow-lg shadow-slate-900/10',
    rootText: 'text-white',
    branchColors: ['#334155', '#475569', '#64748b', '#94a3b8', '#1e293b', '#64748b'],
    nodeBorder: 'border-slate-250 hover:border-slate-800 bg-white',
    textColor: 'text-slate-800',
    accentColor: '#0f172a',
    isDark: false
  },
  {
    id: 'coral-sunset',
    name: '日落珊瑚',
    bgClass: 'bg-[#faf6f0]',
    canvasBg: '#faf6f0',
    gridColor: '#ebdcd0',
    rootBox: 'bg-[#f97316] text-white border-none shadow-md',
    rootText: 'text-white',
    branchColors: ['#f97316', '#ea580c', '#fa9043', '#fb923c', '#ca8a04', '#e11d48'],
    nodeBorder: 'border-orange-200 hover:border-[#f97316] bg-white',
    textColor: 'text-amber-950',
    accentColor: '#f97316',
    isDark: false
  },
  {
    id: 'aurora-navy',
    name: '极光幽蓝',
    bgClass: 'bg-[#0b132b]',
    canvasBg: '#0b132b',
    gridColor: '#1c2541',
    rootBox: 'bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white border-none shadow-xl',
    rootText: 'text-white',
    branchColors: ['#00b4d8', '#00f5d4', '#70e000', '#9b5de5', '#f15bb5', '#fee440'],
    nodeBorder: 'border-cyan-900 hover:border-cyan-400 bg-[#1c2541]',
    textColor: 'text-cyan-100',
    accentColor: '#00b4d8',
    isDark: true
  }
]

const getPreConfiguredMindMap = (courseId: string): MindNode => {
  if (courseId === 'prog-py' || courseId.toLowerCase().includes('py')) {
    return {
      id: 'root',
      label: 'Python 程序设计',
      side: 'root',
      priority: 'None',
      progress: 0,
      children: [
        {
          id: 'py-1',
          label: '基础语法',
          priority: 'P1',
          progress: 100,
          children: [
            { id: 'py-1-1', label: '变量与数据类型', priority: 'None', progress: 100 },
            { id: 'py-1-2', label: '运算符与表达式', priority: 'None', progress: 100 },
            { id: 'py-1-3', label: '流程控制语句', priority: 'None', progress: 100 },
            { id: 'py-1-4', label: '函数定义与调用', priority: 'None', progress: 100 }
          ]
        },
        {
          id: 'py-2',
          label: '数据结构',
          priority: 'P1',
          progress: 75,
          children: [
            { id: 'py-2-1', label: '列表与元组', priority: 'None', progress: 100 },
            { id: 'py-2-2', label: '字典与集合', priority: 'None', progress: 100 },
            { id: 'py-2-3', label: '字符串操作', priority: 'None', progress: 75 },
            { id: 'py-2-4', label: '列表推导式', priority: 'P2', progress: 50 }
          ]
        },
        {
          id: 'py-3',
          label: '面向对象编程',
          priority: 'P1',
          progress: 50,
          children: [
            { id: 'py-3-1', label: '类与对象', priority: 'None', progress: 100 },
            { id: 'py-3-2', label: '继承与多态', priority: 'None', progress: 75 },
            { id: 'py-3-3', label: '魔术方法', priority: 'P2', progress: 25 },
            { id: 'py-3-4', label: '属性与方法装饰器', priority: 'P2', progress: 0 }
          ]
        },
        {
          id: 'py-4',
          label: '高级特性', priority: 'P2',
          progress: 50,
          children: [
            { id: 'py-4-1', label: '装饰器与闭包', priority: 'P1', progress: 50 },
            { id: 'py-4-2', label: '生成器与迭代器', priority: 'P1', progress: 25 },
            { id: 'py-4-3', label: '上下文管理器', priority: 'P2', progress: 0 },
            { id: 'py-4-4', label: '异常处理机制', priority: 'None', progress: 100 }
          ]
        },
        {
          id: 'py-5',
          label: '文件与模块', priority: 'P2',
          progress: 75,
          children: [
            { id: 'py-5-1', label: '文件读写操作', priority: 'None', progress: 100 },
            { id: 'py-5-2', label: 'JSON与CSV处理', priority: 'None', progress: 75 },
            { id: 'py-5-3', label: '模块与包管理', priority: 'None', progress: 50 },
            { id: 'py-5-4', label: '虚拟环境配置', priority: 'P2', progress: 25 }
          ]
        },
        {
          id: 'py-6',
          label: '常用标准库', priority: 'P2',
          progress: 25,
          children: [
            { id: 'py-6-1', label: 'os 与 sys 模块', priority: 'None', progress: 75 },
            { id: 'py-6-2', label: 'datetime 时间处理', priority: 'None', progress: 50 },
            { id: 'py-6-3', label: 're 正则表达式', priority: 'P2', progress: 25 },
            { id: 'py-6-4', label: 'collections 高级容器', priority: 'P2', progress: 0 }
          ]
        },
        {
          id: 'py-7',
          label: '实战项目', priority: 'P3',
          progress: 0,
          children: [
            { id: 'py-7-1', label: '网络爬虫入门', priority: 'P2', progress: 25 },
            { id: 'py-7-2', label: '数据分析项目', priority: 'P2', progress: 0 },
            { id: 'py-7-3', label: '自动化脚本', priority: 'P2', progress: 0 }
          ]
        }
      ]
    }
  }

  if (courseId === 'prog-java' || courseId.toLowerCase().includes('java')) {
    return {
      id: 'root',
      label: 'Java 开发体系',
      side: 'root', priority: 'None',
      progress: 0,
      children: [
        {
          id: 'jv-1',
          label: 'Java 基础', priority: 'P1',
          progress: 100,
          children: [
            { id: 'jv-1-1', label: '数据类型与变量', priority: 'None', progress: 100 },
            { id: 'jv-1-2', label: '运算符与流程控制', priority: 'None', progress: 100 },
            { id: 'jv-1-3', label: '数组与字符串', priority: 'None', progress: 100 },
            { id: 'jv-1-4', label: '方法与重载', priority: 'None', progress: 100 }
          ]
        },
        {
          id: 'jv-2',
          label: '面向对象', priority: 'P1',
          progress: 100,
          children: [
            { id: 'jv-2-1', label: '类与对象', priority: 'None', progress: 100 },
            { id: 'jv-2-2', label: '封装继承多态', priority: 'None', progress: 100 },
            { id: 'jv-2-3', label: '抽象类与接口', priority: 'None', progress: 75 },
            { id: 'jv-2-4', label: '内部类与匿名类', priority: 'P2', progress: 50 }
          ]
        },
        {
          id: 'jv-3',
          label: '核心 API', priority: 'P1',
          progress: 75,
          children: [
            { id: 'jv-3-1', label: '集合框架', priority: 'None', progress: 100 },
            { id: 'jv-3-2', label: '泛型与类型擦除', priority: 'P1', progress: 50 },
            { id: 'jv-3-3', label: 'IO 与 NIO', priority: 'P1', progress: 75 },
            { id: 'jv-3-4', label: '反射与注解', priority: 'P2', progress: 25 }
          ]
        },
        {
          id: 'jv-4',
          label: '并发编程', priority: 'P1',
          progress: 50,
          children: [
            { id: 'jv-4-1', label: '线程创建与管理', priority: 'None', progress: 100 },
            { id: 'jv-4-2', label: 'synchronized 锁', priority: 'None', progress: 75 },
            { id: 'jv-4-3', label: 'JUC 并发工具包', priority: 'P1', progress: 25 },
            { id: 'jv-4-4', label: '线程池原理', priority: 'P1', progress: 0 }
          ]
        },
        {
          id: 'jv-5',
          label: 'JVM 原理', priority: 'P2',
          progress: 50,
          children: [
            { id: 'jv-5-1', label: '内存模型', priority: 'P1', progress: 50 },
            { id: 'jv-5-2', label: '垃圾收集器', priority: 'P1', progress: 25 },
            { id: 'jv-5-3', label: '类加载机制', priority: 'P2', progress: 0 },
            { id: 'jv-5-4', label: '性能调优', priority: 'P3', progress: 0 }
          ]
        },
        {
          id: 'jv-6',
          label: 'Spring 生态', priority: 'P2',
          progress: 25,
          children: [
            { id: 'jv-6-1', label: 'Spring Core IOC/AOP', priority: 'P1', progress: 75 },
            { id: 'jv-6-2', label: 'Spring Boot', priority: 'P1', progress: 50 },
            { id: 'jv-6-3', label: 'Spring MVC', priority: 'P1', progress: 25 },
            { id: 'jv-6-4', label: 'Spring Data JPA', priority: 'P2', progress: 0 }
          ]
        }
      ]
    }
  }

  if (courseId === 'prog-c' || courseId.toLowerCase().includes('c-') || courseId.includes('C语言')) {
    return {
      id: 'root',
      label: 'C 语言程序设计',
      side: 'root', priority: 'None',
      progress: 0,
      children: [
        {
          id: 'c-1',
          label: '基础语法', priority: 'P1',
          progress: 100,
          children: [
            { id: 'c-1-1', label: '数据类型与常量变量', priority: 'None', progress: 100 },
            { id: 'c-1-2', label: '运算符与表达式', priority: 'None', progress: 100 },
            { id: 'c-1-3', label: '流程控制语句', priority: 'None', progress: 100 },
            { id: 'c-1-4', label: '函数与递归', priority: 'None', progress: 75 }
          ]
        },
        {
          id: 'c-2',
          label: '指针与内存', priority: 'P1',
          progress: 75,
          children: [
            { id: 'c-2-1', label: '指针基础', priority: 'None', progress: 100 },
            { id: 'c-2-2', label: '指针与数组', priority: 'None', progress: 75 },
            { id: 'c-2-3', label: '指针与函数', priority: 'P1', progress: 50 },
            { id: 'c-2-4', label: 'void 指针与函数指针', priority: 'P1', progress: 25 }
          ]
        },
        {
          id: 'c-3',
          label: '内存管理', priority: 'P1',
          progress: 50,
          children: [
            { id: 'c-3-1', label: '堆栈内存分配', priority: 'None', progress: 100 },
            { id: 'c-3-2', label: 'malloc 与 free', priority: 'None', progress: 75 },
            { id: 'c-3-3', label: '内存泄漏防范', priority: 'P2', progress: 50 },
            { id: 'c-3-4', label: '野指针问题', priority: 'P1', progress: 25 }
          ]
        },
        {
          id: 'c-4',
          label: '结构体与联合体', priority: 'P2',
          progress: 75,
          children: [
            { id: 'c-4-1', label: '结构体定义与使用', priority: 'None', progress: 100 },
            { id: 'c-4-2', label: '结构体指针', priority: 'None', progress: 75 },
            { id: 'c-4-3', label: '联合体与枚举', priority: 'P2', progress: 50 },
            { id: 'c-4-4', label: '位段与内存对齐', priority: 'P2', progress: 0 }
          ]
        },
        {
          id: 'c-5',
          label: '文件操作', priority: 'P2',
          progress: 50,
          children: [
            { id: 'c-5-1', label: '文件打开与关闭', priority: 'None', progress: 100 },
            { id: 'c-5-2', label: '文本文件读写', priority: 'None', progress: 75 },
            { id: 'c-5-3', label: '二进制文件操作', priority: 'P1', progress: 25 },
            { id: 'c-5-4', label: '文件定位与缓冲', priority: 'P2', progress: 0 }
          ]
        },
        {
          id: 'c-6',
          label: '预处理与编译', priority: 'P2',
          progress: 50,
          children: [
            { id: 'c-6-1', label: '宏定义与宏展开', priority: 'None', progress: 75 },
            { id: 'c-6-2', label: '文件包含与条件编译', priority: 'None', progress: 50 },
            { id: 'c-6-3', label: '编译过程详解', priority: 'P2', progress: 0 }
          ]
        }
      ]
    }
  }

  return {
    id: 'root',
    label: '数据结构与算法',
    side: 'root', priority: 'None',
    progress: 0,
    children: [
      {
        id: 'ds-1',
        label: '线性结构', priority: 'P1',
        progress: 100,
        children: [
          { id: 'ds-1-1', label: '数组与动态数组', priority: 'None', progress: 100 },
          { id: 'ds-1-2', label: '链表操作', priority: 'None', progress: 100 },
          { id: 'ds-1-3', label: '栈与应用', priority: 'None', progress: 100 },
          { id: 'ds-1-4', label: '队列与循环队列', priority: 'None', progress: 75 }
        ]
      },
      {
        id: 'ds-2',
        label: '树与二叉树', priority: 'P1',
        progress: 75,
        children: [
          { id: 'ds-2-1', label: '二叉树遍历', priority: 'None', progress: 100 },
          { id: 'ds-2-2', label: '二叉搜索树', priority: 'None', progress: 75 },
          { id: 'ds-2-3', label: '平衡二叉树 AVL', priority: 'P1', progress: 50 },
          { id: 'ds-2-4', label: '红黑树原理', priority: 'P1', progress: 25 },
          { id: 'ds-2-5', label: '堆与优先队列', priority: 'P2', progress: 0 }
        ]
      },
      {
        id: 'ds-3',
        label: '图论', priority: 'P1',
        progress: 50,
        children: [
          { id: 'ds-3-1', label: '图的存储结构', priority: 'None', progress: 100 },
          { id: 'ds-3-2', label: 'DFS 深度优先', priority: 'None', progress: 75 },
          { id: 'ds-3-3', label: 'BFS 广度优先', priority: 'None', progress: 75 },
          { id: 'ds-3-4', label: '最短路径算法', priority: 'P1', progress: 50 },
          { id: 'ds-3-5', label: '最小生成树', priority: 'P1', progress: 25 },
          { id: 'ds-3-6', label: '拓扑排序', priority: 'P2', progress: 0 }
        ]
      },
      {
        id: 'ds-4',
        label: '排序算法', priority: 'P1',
        progress: 75,
        children: [
          { id: 'ds-4-1', label: '冒泡与选择排序', priority: 'None', progress: 100 },
          { id: 'ds-4-2', label: '插入排序', priority: 'None', progress: 100 },
          { id: 'ds-4-3', label: '快速排序', priority: 'None', progress: 75 },
          { id: 'ds-4-4', label: '归并排序', priority: 'None', progress: 50 },
          { id: 'ds-4-5', label: '堆排序', priority: 'P2', progress: 25 }
        ]
      },
      {
        id: 'ds-5',
        label: '查找算法', priority: 'P1',
        progress: 100,
        children: [
          { id: 'ds-5-1', label: '顺序查找', priority: 'None', progress: 100 },
          { id: 'ds-5-2', label: '二分查找', priority: 'None', progress: 100 },
          { id: 'ds-5-3', label: '哈希查找', priority: 'None', progress: 75 },
          { id: 'ds-5-4', label: '二叉搜索树查找', priority: 'P2', progress: 50 }
        ]
      },
      {
        id: 'ds-6',
        label: '动态规划', priority: 'P1',
        progress: 50,
        children: [
          { id: 'ds-6-1', label: '状态转移方程', priority: 'P1', progress: 50 },
          { id: 'ds-6-2', label: '背包问题', priority: 'P1', progress: 25 },
          { id: 'ds-6-3', label: '最长公共子序列', priority: 'P2', progress: 0 },
          { id: 'ds-6-4', label: '矩阵链乘法', priority: 'P2', progress: 0 }
        ]
      },
      {
        id: 'ds-7',
        label: '贪心算法', priority: 'P2',
        progress: 50,
        children: [
          { id: 'ds-7-1', label: '活动选择问题', priority: 'None', progress: 100 },
          { id: 'ds-7-2', label: '霍夫曼编码', priority: 'P1', progress: 50 },
          { id: 'ds-7-3', label: '最小生成树贪心', priority: 'P1', progress: 25 }
        ]
      },
      {
        id: 'ds-8',
        label: '高级数据结构', priority: 'P2',
        progress: 25,
        children: [
          { id: 'ds-8-1', label: '并查集', priority: 'P2', progress: 50 },
          { id: 'ds-8-2', label: '字典树 Trie', priority: 'P2', progress: 25 },
          { id: 'ds-8-3', label: '线段树', priority: 'P2', progress: 0 },
          { id: 'ds-8-4', label: '树状数组', priority: 'P3', progress: 0 }
        ]
      }
    ]
  }
}

const selectedCourseId = ref<string>(localStorage.getItem('edumind_current_course_id') || 'prog-ds')
const viewMode = ref<'map' | 'outline'>('map')
const activeTab = ref<'样式' | '大纲' | '笔记'>('样式')
const activeThemeId = ref<string>('classic-snow')
const currentTheme = computed(() => PREMIUM_THEMES.find(t => t.id === activeThemeId.value) || PREMIUM_THEMES[0])

const { isDark: globalIsDark, setTheme: setGlobalTheme } = useTheme()
watch(globalIsDark, (val) => {
  const darkTheme = PREMIUM_THEMES.find(t => t.isDark)
  const lightTheme = PREMIUM_THEMES.find(t => !t.isDark)
  activeThemeId.value = val ? (darkTheme?.id || 'midnight-charcoal') : (lightTheme?.id || 'classic-snow')
}, { immediate: true })
watch(activeThemeId, (id) => {
  const theme = PREMIUM_THEMES.find(t => t.id === id)
  if (theme) {
    setGlobalTheme(theme.isDark ? 'dark' : 'light')
  }
})

const structureStyle = ref<StructureStyle>('curved')

const zoom = ref<number>(100)
const pan = reactive<{ x: number; y: number }>({ x: 0, y: 0 })
const isDragging = ref<boolean>(false)
const dragStart = reactive<{ x: number; y: number }>({ x: 0, y: 0 })

const selectedNodeId = ref<string>('root')

const history = ref<string[]>([])
const historyIndex = ref<number>(-1)

const searchText = ref<string>('')
const searchMatches = ref<string[]>([])
const currentMatchIndex = ref<number>(0)

const showShortcutsHelp = ref<boolean>(false)

const toastStr = ref<string | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null
const showToast = (msg: string) => {
  toastStr.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastStr.value = null }, 3000)
}

const editingNodeId = ref<string | null>(null)
const editingLabelText = ref<string>('')

const mindmapRoot = ref<MindNode>(getPreConfiguredMindMap(selectedCourseId.value))

const nodeNotes = ref<Record<string, string>>({
  'root': '# 数据结构与算法 核心考点导图\n\n本章面向各大计算机笔面试、经典算法及主流大厂高难度考点进行深度重组。可在右侧样式面板中切换折弯线缆和极直连线，标记学习进阶权重。',
  'ds-1': '### 1. 数据结构基础\n\n- 这是所有算法运行的承载介质，包括数组、链表、栈、队列、树、图、哈希表。\n- 每一项的插入、删除、空满检测的时间与空间开销都必须要了如指掌。',
  'ds-1-1': '### 1.1 数组与链表\n\n- **数组**: 连续物理寻址快，$O(1)$复杂度，但扩容费时。\n- **链表**: 指针链条随机排列，空间利用率高，插入节点动作极为频繁。',
  'ds-2': '### 2. 算法基础\n\n- 掌握基础的评估手段（时空复杂度分析）与五大经典算法设计哲学：递归分治、动态规划、贪心及回溯。',
  'ds-3': '### 3. 排序与查找\n\n- 极其高频！要求能够现场手撕快速排序、归并排序、堆排序，并能熟练默写二分折半查找。'
})

const pushToHistory = (newRoot: MindNode) => {
  const rootStr = JSON.stringify(newRoot)
  const updatedHistory = history.value.slice(0, historyIndex.value + 1)
  updatedHistory.push(rootStr)
  if (updatedHistory.length > 40) {
    updatedHistory.shift()
  }
  history.value = updatedHistory
  historyIndex.value = updatedHistory.length - 1
}

watch(selectedCourseId, () => {
  const loadedMap = getPreConfiguredMindMap(selectedCourseId.value)
  mindmapRoot.value = loadedMap
  history.value = [JSON.stringify(loadedMap)]
  historyIndex.value = 0
  selectedNodeId.value = 'root'
})

let checkInterval: ReturnType<typeof setInterval> | null = null
const handleStorageChange = () => {
  const storedId = localStorage.getItem('edumind_current_course_id')
  if (storedId && storedId !== selectedCourseId.value) {
    selectedCourseId.value = storedId
  }
}

onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
  checkInterval = setInterval(handleStorageChange, 900)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  if (checkInterval) clearInterval(checkInterval)
  if (toastTimer) clearTimeout(toastTimer)
})

const handleUndo = () => {
  if (historyIndex.value > 0) {
    const prevIdx = historyIndex.value - 1
    const parsed = JSON.parse(history.value[prevIdx])
    mindmapRoot.value = parsed
    historyIndex.value = prevIdx
    showToast("撤销操作成功")
  } else {
    showToast("没有可撤销的记录")
  }
}

const handleRedo = () => {
  if (historyIndex.value < history.value.length - 1) {
    const nextIdx = historyIndex.value + 1
    const parsed = JSON.parse(history.value[nextIdx])
    mindmapRoot.value = parsed
    historyIndex.value = nextIdx
    showToast("重做操作成功")
  } else {
    showToast("没有可重做的记录")
  }
}

const findNodeDeep = (node: MindNode, id: string): MindNode | null => {
  if (node.id === id) return node
  if (node.children) {
    for (const child of node.children) {
      const res = findNodeDeep(child, id)
      if (res) return res
    }
  }
  return null
}

const getActiveNode = (): MindNode | null => {
  return findNodeDeep(mindmapRoot.value, selectedNodeId.value)
}

const handleUpdateNodeLabel = (id: string, newLabel: string) => {
  const updateRecursive = (node: MindNode): MindNode => {
    if (node.id === id) {
      return { ...node, label: newLabel }
    }
    if (node.children) {
      return { ...node, children: node.children.map(updateRecursive) }
    }
    return node
  }
  const finalTree = updateRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  pushToHistory(finalTree)
}

const handleAddChildTopic = (parentId: string) => {
  const parentNode = findNodeDeep(mindmapRoot.value, parentId)
  if (!parentNode) return

  const freshId = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const freshNode: MindNode = {
    id: freshId,
    label: '编写考点主题',
    priority: 'None',
    progress: 0,
    children: []
  }

  const addRecursive = (node: MindNode): MindNode => {
    if (node.id === parentId) {
      return {
        ...node,
        collapsed: false,
        children: [...(node.children || []), freshNode]
      }
    }
    if (node.children) {
      return { ...node, children: node.children.map(addRecursive) }
    }
    return node
  }

  const finalTree = addRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  selectedNodeId.value = freshId
  editingNodeId.value = freshId
  editingLabelText.value = '编写考点主题'
  pushToHistory(finalTree)
  showToast("成功添加分支子主题 (Tab)")
}

const handleAddSiblingTopic = (currentNodeId: string) => {
  if (currentNodeId === 'root') {
    showToast("中心主题不可添加同级分支")
    return
  }

  const findParent = (node: MindNode): MindNode | null => {
    if (node.children) {
      for (const child of node.children) {
        if (child.id === currentNodeId) return node
        const res = findParent(child)
        if (res) return res
      }
    }
    return null
  }

  const parent = findParent(mindmapRoot.value)
  if (!parent) return

  const freshId = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const freshNode: MindNode = {
    id: freshId,
    label: '编写同级考点',
    priority: 'None',
    progress: 0,
    children: []
  }

  const addSiblingRecursive = (node: MindNode): MindNode => {
    if (node.id === parent.id) {
      const idx = node.children?.findIndex(c => c.id === currentNodeId) ?? -1
      const newChildren = [...(node.children || [])]
      if (idx !== -1) {
        newChildren.splice(idx + 1, 0, freshNode)
      } else {
        newChildren.push(freshNode)
      }
      return { ...node, children: newChildren }
    }
    if (node.children) {
      return { ...node, children: node.children.map(addSiblingRecursive) }
    }
    return node
  }

  const finalTree = addSiblingRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  selectedNodeId.value = freshId
  editingNodeId.value = freshId
  editingLabelText.value = '编写同级考点'
  pushToHistory(finalTree)
  showToast("成功添加同级考点主题 (Enter)")
}

const handleRemoveTopic = (targetId: string) => {
  if (targetId === 'root') {
    showToast("中心主导图节点不可移除")
    return
  }

  const deleteRecursive = (node: MindNode): MindNode | null => {
    if (node.children) {
      const filtered = node.children
        .map(deleteRecursive)
        .filter((n): n is MindNode => n !== null)
      return { ...node, children: filtered }
    }
    return node.id === targetId ? null : node
  }

  const finalTree = deleteRecursive(mindmapRoot.value)
  if (finalTree) {
    mindmapRoot.value = finalTree
    pushToHistory(finalTree)
    selectedNodeId.value = 'root'
    showToast("已安全剪裁指定的考点分支")
  }
}

const handleToggleCollapse = (id: string) => {
  const toggleRecursive = (node: MindNode): MindNode => {
    if (node.id === id) {
      return { ...node, collapsed: !node.collapsed }
    }
    if (node.children) {
      return { ...node, children: node.children.map(toggleRecursive) }
    }
    return node
  }
  const finalTree = toggleRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  pushToHistory(finalTree)
}

const handleSetPriority = (id: string, prio: 'P1' | 'P2' | 'P3' | 'None') => {
  const updateRecursive = (node: MindNode): MindNode => {
    if (node.id === id) {
      return { ...node, priority: prio }
    }
    if (node.children) {
      return { ...node, children: node.children.map(updateRecursive) }
    }
    return node
  }
  const finalTree = updateRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  pushToHistory(finalTree)
  showToast(`优先级已更新为 [${prio === 'None' ? '无' : prio}]`)
}

const handleSetProgress = (id: string, val: 0 | 25 | 50 | 75 | 100) => {
  const updateRecursive = (node: MindNode): MindNode => {
    if (node.id === id) {
      return { ...node, progress: val }
    }
    if (node.children) {
      return { ...node, children: node.children.map(updateRecursive) }
    }
    return node
  }
  const finalTree = updateRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  pushToHistory(finalTree)
  showToast(`学习进度已设定为 ${val}%`)
}

const handleSaveNotes = (id: string, text: string) => {
  nodeNotes.value = {
    ...nodeNotes.value,
    [id]: text
  }
}

watch(searchText, () => {
  if (!searchText.value.trim()) {
    searchMatches.value = []
    return
  }
  const matches: string[] = []
  const traverse = (node: MindNode) => {
    if (node.label.toLowerCase().includes(searchText.value.toLowerCase())) {
      matches.push(node.id)
    }
    if (node.children) {
      node.children.forEach(traverse)
    }
  }
  traverse(mindmapRoot.value)
  searchMatches.value = matches
  currentMatchIndex.value = 0
  if (matches.length > 0) {
    selectedNodeId.value = matches[0]
  }
})

const handleNextSearchMatch = () => {
  if (searchMatches.value.length === 0) return
  const nextIdx = (currentMatchIndex.value + 1) % searchMatches.value.length
  currentMatchIndex.value = nextIdx
  selectedNodeId.value = searchMatches.value[nextIdx]
}

const handleKeyDown = (e: KeyboardEvent) => {
  const targetTag = (e.target as HTMLElement).tagName.toUpperCase()
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) {
    return
  }

  if (e.key === 'Tab') {
    e.preventDefault()
    handleAddChildTopic(selectedNodeId.value)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    handleAddSiblingTopic(selectedNodeId.value)
  } else if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault()
    handleRemoveTopic(selectedNodeId.value)
  } else if (e.key === 'Spacebar' || e.key === ' ') {
    e.preventDefault()
    const activeItem = getActiveNode()
    if (activeItem) {
      editingNodeId.value = activeItem.id
      editingLabelText.value = activeItem.label
    }
  } else if (e.key === 'Escape') {
    editingNodeId.value = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleCollapseAllNodes = (coll: boolean) => {
  const processRecursive = (node: MindNode): MindNode => {
    return {
      ...node,
      collapsed: coll,
      children: node.children?.map(processRecursive)
    }
  }
  const finalTree = processRecursive(mindmapRoot.value)
  mindmapRoot.value = finalTree
  pushToHistory(finalTree)
  showToast(coll ? "已全面收拢所有考点分支" : "已全部展开所有考点叶节点")
}

const handleResetCanvasOffset = () => {
  zoom.value = 100
  pan.x = 0
  pan.y = 0
  showToast("画布重置居中")
}

const handleZoom = (direction: 'in' | 'out') => {
  if (direction === 'in') {
    zoom.value = Math.min(zoom.value + 10, 160)
  } else {
    zoom.value = Math.max(zoom.value - 10, 50)
  }
}

const handlePanMouseDown = (e: MouseEvent) => {
  const targetEl = e.target as HTMLElement
  if (targetEl.closest('button') || targetEl.closest('input') || targetEl.closest('.interactive-node-box')) {
    return
  }
  isDragging.value = true
  dragStart.x = e.clientX - pan.x
  dragStart.y = e.clientY - pan.y
}

const handlePanMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  pan.x = e.clientX - dragStart.x
  pan.y = e.clientY - dragStart.y
}

const handlePanMouseUp = () => {
  isDragging.value = false
}

const getNodeSubtreeHeight = (node: MindNode): number => {
  if (node.collapsed || !node.children || node.children.length === 0) {
    return 56
  }
  const childrenHeight = node.children.reduce((acc, child) => acc + getNodeSubtreeHeight(child), 0)
  const spacing = (node.children.length - 1) * 28
  return Math.max(56, childrenHeight + spacing)
}

const layoutTreeNodes = (): { layouts: NodeLayout[]; bounds: { minX: number; maxX: number; minY: number; maxY: number } } => {
  const layouts: NodeLayout[] = []
  let minX = -400, maxX = 400, minY = -200, maxY = 200
  const horizontalGap = 260

  const rootChildren = mindmapRoot.value.children || []
  let leftChildren: MindNode[] = []
  let rightChildren: MindNode[] = []

  if (structureStyle.value === 'curved') {
    leftChildren = rootChildren.filter((node, idx) => node.side === 'left' || (!node.side && idx % 2 === 1))
    rightChildren = rootChildren.filter((node, idx) => node.side === 'right' || (!node.side && idx % 2 === 0))
  } else if (structureStyle.value === 'org-vertical') {
    rightChildren = rootChildren
  } else {
    rightChildren = rootChildren
  }

  const layoutChildrenBranch = (
    nodeList: MindNode[],
    parentX: number,
    parentY: number,
    direction: 'left' | 'right',
    level: number
  ) => {
    if (nodeList.length === 0) return

    const totalBranchHeight = nodeList.reduce((acc, node) => acc + getNodeSubtreeHeight(node), 0) + (nodeList.length - 1) * 28
    let startY = parentY - totalBranchHeight / 2

    nodeList.forEach(node => {
      const subtreeH = getNodeSubtreeHeight(node)
      const childX = parentX + (direction === 'left' ? -horizontalGap : horizontalGap)
      const childY = startY + subtreeH / 2

      const isLevel1 = level === 1
      const nodeWidth = isLevel1 ? 170 : 140
      const nodeHeight = isLevel1 ? 44 : 36

      layouts.push({
        id: node.id,
        x: childX,
        y: childY,
        width: nodeWidth,
        height: nodeHeight,
        side: direction,
        node,
        level
      })

      minX = Math.min(minX, childX - 100)
      maxX = Math.max(maxX, childX + 100)
      minY = Math.min(minY, childY - 50)
      maxY = Math.max(maxY, childY + 50)

      if (node.children && !node.collapsed && node.children.length > 0) {
        layoutChildrenBranch(node.children, childX, childY, direction, level + 1)
      }

      startY += subtreeH + 28
    })
  }

  layouts.push({
    id: 'root',
    x: 0,
    y: 0,
    width: 200,
    height: 56,
    side: 'root',
    node: mindmapRoot.value,
    level: 0
  })

  layoutChildrenBranch(rightChildren, 0, 0, 'right', 1)
  layoutChildrenBranch(leftChildren, 0, 0, 'left', 1)

  return { layouts, bounds: { minX, maxX, minY, maxY } }
}

const computedLayout = computed(() => layoutTreeNodes())
const placedLayoutsComputed = computed(() => computedLayout.value.layouts)

const getXmindConnectionPaths = (): { d: string; color: string; id: string; strokeWidth: string }[] => {
  const paths: { d: string; color: string; id: string; strokeWidth: string }[] = []
  const layoutMap = new Map<string, NodeLayout>()
  placedLayoutsComputed.value.forEach(l => layoutMap.set(l.id, l))

  const recurseConnections = (node: MindNode) => {
    const parentLayout = layoutMap.get(node.id)
    if (!parentLayout || node.collapsed || !node.children) return

    node.children.forEach((child, index) => {
      const childLayout = layoutMap.get(child.id)
      if (!childLayout) return

      let startX = parentLayout.x + (childLayout.side === 'left' ? -parentLayout.width / 2 : parentLayout.width / 2)
      let startY = parentLayout.y

      let endX = childLayout.x + (childLayout.side === 'left' ? childLayout.width / 2 : -childLayout.width / 2)
      let endY = childLayout.y

      let linkColor = currentTheme.value.branchColors[index % currentTheme.value.branchColors.length]
      if (parentLayout.id !== 'root') {
        const ancestralBranch = placedLayoutsComputed.value.find(l => l.id === childLayout.id)
        if (ancestralBranch) {
          const rootSubIdx = mindmapRoot.value.children?.findIndex(
            c => c.id === childLayout.id || findNodeDeep(c, childLayout.id) !== null
          ) ?? 0
          if (rootSubIdx !== -1) {
            linkColor = currentTheme.value.branchColors[rootSubIdx % currentTheme.value.branchColors.length]
          }
        }
      }

      let strokeVal = "2"
      if (childLayout.level === 1) {
        strokeVal = "5"
      } else if (childLayout.level === 2) {
        strokeVal = "3"
      } else {
        strokeVal = "2"
      }

      let pathString = ''

      if (structureStyle.value === 'curved') {
        const dx = endX - startX
        const cpOffset = Math.abs(dx) * 0.55
        const cp1x = startX + (childLayout.side === 'left' ? -cpOffset : cpOffset)
        const cp2x = endX + (childLayout.side === 'left' ? cpOffset : -cpOffset)
        pathString = `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`
      } else if (structureStyle.value === 'logic-right') {
        const breakX = startX + (endX - startX) * 0.45
        pathString = `M ${startX} ${startY} L ${breakX} ${startY} L ${breakX} ${endY} L ${endX} ${endY}`
      } else {
        pathString = `M ${startX} ${startY} Q ${startX + (endX - startX) / 2} ${endY}, ${endX} ${endY}`
      }

      paths.push({
        d: pathString,
        color: linkColor,
        id: `${node.id}-${child.id}`,
        strokeWidth: strokeVal
      })

      recurseConnections(child)
    })
  }

  recurseConnections(mindmapRoot.value)
  return paths
}

const connectionPaths = computed(() => getXmindConnectionPaths())

const getProgressRingAttrs = (progress: number, color: string) => {
  const size = 15
  const strokeWidth = 2.4
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference
  return { size, strokeWidth, radius, circumference, strokeDashoffset, color }
}

const getPriorityBadgeClass = (priority: 'P1' | 'P2' | 'P3' | 'None') => {
  const priorityColors: Record<string, string> = {
    P1: 'bg-rose-500 text-white shadow-rose-200 border-rose-400',
    P2: 'bg-amber-500 text-white shadow-amber-200 border-amber-450',
    P3: 'bg-sky-500 text-white shadow-sky-200 border-sky-400'
  }
  return priorityColors[priority] || ''
}

const handleExportJSON = () => {
  const data = {
    mindmap: mindmapRoot.value,
    editedNotes: nodeNotes.value,
    theme: activeThemeId.value,
    exportedAt: new Date().toISOString()
  }
  const text = JSON.stringify(data, null, 2)
  const blob = new Blob([text], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${mindmapRoot.value.label}_xmind.json`
  a.click()
  showToast("思维导图 JSON 纲要导出成功")
}

const handleExportMarkdown = () => {
  let mdText = `# ${mindmapRoot.value.label}\n\n`

  const recurseMd = (node: MindNode, depth: number) => {
    const indent = '  '.repeat(depth)
    const prioTag = node.priority && node.priority !== 'None' ? ` [${node.priority}]` : ''
    const progTag = node.progress !== undefined && node.progress > 0 ? ` (${node.progress}%)` : ''
    mdText += `${indent}- ${node.label}${prioTag}${progTag}\n`

    const note = nodeNotes.value[node.id]
    if (note) {
      const noteIndent = '  '.repeat(depth + 1)
      mdText += `${noteIndent}> ${note.replace(/\n/g, `\n${noteIndent}> `)}\n`
    }

    if (node.children && !node.collapsed) {
      node.children.forEach(c => recurseMd(c, depth + 1))
    }
  }

  mindmapRoot.value.children?.forEach(c => recurseMd(c, 0))

  const blob = new Blob([mdText], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${mindmapRoot.value.label}_学习大纲.md`
  a.click()
  showToast("成功生成并下载 Markdown 笔记")
}

const getNodeStyle = (layout: NodeLayout, isSelected: boolean) => {
  const nodeVal = layout.node
  const rootSubIdx = mindmapRoot.value.children?.findIndex(
    c => c.id === nodeVal.id || findNodeDeep(c, nodeVal.id) !== null
  ) ?? 0
  const branchColor = currentTheme.value.branchColors[rootSubIdx === -1 ? 0 : rootSubIdx % currentTheme.value.branchColors.length]

  const isRoot = layout.id === 'root'
  const isLevel1 = layout.level === 1
  const isSubTopic = layout.level >= 2

  let nodeStyle: Record<string, string> = {
    left: `${layout.x}px`,
    top: `${layout.y}px`,
    transform: 'translate(-50%, -50%)',
  }

  if (isRoot) {
    nodeStyle = {
      ...nodeStyle,
      borderRadius: '28px',
      boxShadow: isSelected
        ? `0 0 0 4px ${branchColor}40, 0 8px 24px -4px rgba(0,0,0,0.15)`
        : '0 8px 24px -4px rgba(0,0,0,0.12)',
    }
  } else if (isLevel1) {
    nodeStyle = {
      ...nodeStyle,
      backgroundColor: isSelected
        ? (currentTheme.value.isDark ? 'rgba(74, 108, 247, 0.22)' : `${branchColor}12`)
        : (currentTheme.value.isDark ? '#1e293b' : '#ffffff'),
      borderLeft: layout.side === 'right' ? `5px solid ${branchColor}` : '2px solid transparent',
      borderRight: layout.side === 'left' ? `5px solid ${branchColor}` : '2px solid transparent',
      borderTop: isSelected ? `2px solid ${branchColor}` : '2px solid transparent',
      borderBottom: `3px solid ${branchColor}`,
      borderRadius: '14px',
      boxShadow: isSelected
        ? `0 0 0 3px ${branchColor}30, 0 4px 12px -2px rgba(0,0,0,0.08)`
        : '0 2px 8px -2px rgba(0,0,0,0.06)',
      color: currentTheme.value.isDark ? '#f1f5f9' : '#1e293b',
    }
  } else if (isSubTopic) {
    nodeStyle = {
      ...nodeStyle,
      backgroundColor: isSelected
        ? (currentTheme.value.isDark ? 'rgba(74, 108, 247, 0.22)' : `${branchColor}10`)
        : 'transparent',
      borderBottom: `2.5px solid ${branchColor}`,
      borderRadius: '10px',
      borderColor: 'transparent',
      boxShadow: 'none',
      color: currentTheme.value.isDark ? '#cbd5e1' : '#475569',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingLeft: '6px',
      paddingRight: '6px',
      paddingBottom: '4px',
    }
  }

  return nodeStyle
}

const getNodeClasses = (layout: NodeLayout, isSelected: boolean, searchPulsing: boolean) => {
  const isRoot = layout.id === 'root'
  const isLevel1 = layout.level === 1
  const isSubTopic = layout.level >= 2

  let classes = `absolute interactive-node-box pointer-events-auto cursor-pointer select-none max-w-[240px] break-all border-2 text-[14.5px] font-bold transition-all `

  if (isRoot) {
    classes += `${currentTheme.value.rootBox} rounded-[28px] px-7 py-4 text-[16px] `
  } else if (isSelected && !isSubTopic) {
    classes += `rounded-[14px] px-5 py-3 shadow-md `
  } else if (isLevel1) {
    classes += `rounded-[14px] px-5 py-3 hover:shadow-sm `
  } else {
    classes += `px-2 py-1.5 `
  }

  if (searchPulsing) {
    classes += `animate-bounce ring-4 ring-amber-500 border-amber-500 `
  }

  return classes
}

const getBranchColor = (nodeId: string) => {
  const rootSubIdx = mindmapRoot.value.children?.findIndex(
    c => c.id === nodeId || findNodeDeep(c, nodeId) !== null
  ) ?? 0
  return currentTheme.value.branchColors[rootSubIdx === -1 ? 0 : rootSubIdx % currentTheme.value.branchColors.length]
}

const onCourseSelect = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value
  selectedCourseId.value = val
  localStorage.setItem('edumind_current_course_id', val)
  showToast("考点思维导图模板载入完毕")
}

const onNodeClick = (nodeId: string, e: MouseEvent) => {
  e.stopPropagation()
  selectedNodeId.value = nodeId
}

const onNodeDoubleClick = (nodeId: string, label: string, e: MouseEvent) => {
  e.stopPropagation()
  editingNodeId.value = nodeId
  editingLabelText.value = label
}

const onEditBlur = (nodeId: string) => {
  handleUpdateNodeLabel(nodeId, editingLabelText.value)
  editingNodeId.value = null
}

const onEditKeyDown = (nodeId: string, e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleUpdateNodeLabel(nodeId, editingLabelText.value)
    editingNodeId.value = null
  } else if (e.key === 'Escape') {
    editingNodeId.value = null
  }
}

const onCollapseClick = (nodeId: string, e: MouseEvent) => {
  e.stopPropagation()
  handleToggleCollapse(nodeId)
}

const onOutlineClick = (layoutId: string, label: string) => {
  selectedNodeId.value = layoutId
  showToast(`大纲同步跳转到: ${label}`)
}

const onOutlineViewClick = (layoutId: string, label: string) => {
  selectedNodeId.value = layoutId
  viewMode.value = 'map'
  showToast(`画布已为您快捷调焦至: ${label}`)
}
</script>

<template>
  <div class="w-full flex-1 flex flex-col min-h-0" id="mindmap-workspace-root">

    <!-- TOAST NOTIFIER FLOATER -->
    <Transition name="toast">
      <div
        v-if="toastStr"
        class="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white border border-slate-700 px-6 py-3 rounded-2xl shadow-2xl z-50 text-[15px] font-semibold flex items-center gap-2.5"
      >
        <span class="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        <span class="text-slate-100">{{ toastStr }}</span>
      </div>
    </Transition>

    <!-- UPPER HEADER COMPONENT AND TOGGLES -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#1e293b] px-6 py-4.5 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-2xs">
      <div>
        <div class="flex items-center gap-2">
          <span class="bg-[#4a6cf7]/10 text-[#4a6cf7] px-2.5 py-1 text-[13px] font-bold tracking-wide uppercase rounded-md">Xmind Edition</span>
          <span class="text-[14px] text-slate-400 dark:text-slate-500 font-medium">快捷、流式、高频考点总览</span>
        </div>
        <h2 class="text-[20px] font-extrabold text-[#1e293b] dark:text-white mt-1 flex items-center gap-2 tracking-tight">
          <span>智能思维导图</span>
          <Sparkle class="w-4 h-4 text-amber-500" />
        </h2>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto self-stretch">
        <div class="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-600">
          <button
            @click="viewMode = 'map'; showToast('已切换至 心灵制图 模式')"
            :class="`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
              viewMode === 'map' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-3xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`"
          >
            <Network class="w-3.5 h-3.5 text-blue-500" />
            <span>导图视图</span>
          </button>
          <button
            @click="viewMode = 'outline'; showToast('已导入 纲要树 结构')"
            :class="`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
              viewMode === 'outline' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-3xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`"
          >
            <Layers class="w-3.5 h-3.5 text-orange-500" />
            <span>大纲模式</span>
          </button>
        </div>

        <div class="h-6 w-[1.5px] bg-slate-200 dark:bg-slate-600 hidden md:block" />

        <select
          :value="selectedCourseId"
          @change="onCourseSelect"
          class="px-3.5 py-2 text-xs font-bold bg-[#f1f5f9] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="prog-ds">📁 数据结构与算法 学习大纲</option>
          <option value="prog-py">📁 Python 程序设计 基础总览</option>
          <option value="prog-java">📁 Java 面向对象核心体系</option>
          <option value="prog-c">📁 C 语言系统与物理存储</option>
        </select>
      </div>
    </div>

    <!-- REAL-TIME XMIND SHORTCUT ACTIONS QUICK NAVIGATION RAIL -->
    <div class="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-3xs select-none">
      <div class="flex items-center gap-2.5 flex-wrap">
        <button
          @click="handleAddSiblingTopic(selectedNodeId)"
          class="flex items-center gap-1.5 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-[14px] font-semibold rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer transition-colors"
          title="快捷键: Enter"
        >
          <PlusCircle class="w-3.5 h-3.5 text-[#10b981]" />
          <span>添加同级分支 <kbd class="font-mono text-[11.5px] bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400">Enter</kbd></span>
        </button>

        <button
          @click="handleAddChildTopic(selectedNodeId)"
          class="flex items-center gap-1.5 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-[14px] font-semibold rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer transition-colors"
          title="快捷键: Tab"
        >
          <Compass class="w-3.5 h-3.5 text-[#3b82f6]" />
          <span>插入子课题 <kbd class="font-mono text-[11.5px] bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400">Tab</kbd></span>
        </button>

        <button
          @click="handleRemoveTopic(selectedNodeId)"
          class="flex items-center gap-1.5 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-700 text-[14px] font-semibold rounded-xl border border-transparent cursor-pointer transition-colors"
          title="快捷键: Delete"
        >
          <Trash2 class="w-3.5 h-3.5 text-red-500 transition-transform hover:scale-105" />
          <span>剪掉节点 <kbd class="font-mono text-[11.5px] bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400">Del</kbd></span>
        </button>

        <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-600" />

        <button
          @click="handleCollapseAllNodes(true)"
          class="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-[13.5px] font-medium rounded-lg border-none bg-transparent cursor-pointer"
        >
          收叠所有
        </button>

        <button
          @click="handleCollapseAllNodes(false)"
          class="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-[13.5px] font-medium rounded-lg border-none bg-transparent cursor-pointer"
        >
          展开层级
        </button>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-600">
          <button
            @click="handleUndo"
            :disabled="historyIndex <= 0"
            class="p-1.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-45 rounded-lg border-none bg-transparent cursor-pointer transition-all"
            title="撤销 (Ctrl+Z)"
          >
            <Undo2 class="w-3.5 h-3.5" />
          </button>
          <button
            @click="handleRedo"
            :disabled="historyIndex >= history.length - 1"
            class="p-1.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-45 rounded-lg border-none bg-transparent cursor-pointer transition-all"
            title="重做"
          >
            <Redo2 class="w-3.5 h-3.5" />
          </button>
        </div>

        <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-600" />

        <div class="relative flex items-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-100/90 dark:hover:bg-slate-800/90 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-600">
          <Search class="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
          <input
            type="text"
            placeholder="搜索考点/导图..."
            :value="searchText"
            @input="searchText = ($event.target as HTMLInputElement).value"
            class="bg-transparent border-none text-[13px] outline-none w-32 font-bold text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
          />
          <div v-if="searchMatches.length > 0" class="flex items-center gap-1.5 ml-2">
            <span class="text-[12px] text-slate-400 font-mono font-bold leading-none">{{ currentMatchIndex + 1 }}/{{ searchMatches.length }}</span>
            <button
              @click="handleNextSearchMatch"
              class="p-0.5 hover:bg-amber-100 text-amber-600 rounded cursor-pointer border-none bg-transparent text-[11px] font-bold"
            >
              下一个
            </button>
          </div>
        </div>

        <button
          @click="showShortcutsHelp = !showShortcutsHelp"
          class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#4a6cf7] rounded-xl border-none bg-transparent cursor-pointer"
          title="快捷键图例说明"
        >
          <Keyboard class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- DIALOG OVERLAY: KEYBOARD SHORTCUTS EXPLAINER -->
    <Transition name="modal">
      <div
        v-if="showShortcutsHelp"
        class="fixed inset-0 bg-slate-900/35 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none"
        @click="showShortcutsHelp = false"
      >
        <div
          class="bg-white dark:bg-[#1e293b] rounded-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700 p-6 shadow-2xl relative"
          @click.stop
        >
          <h3 class="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <Keyboard class="w-4 h-4 text-[#4a6cf7]" />
            <span>Xmind 极速键盘操作流</span>
          </h3>

          <div class="flex flex-col gap-3 font-sans">
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
              <span class="text-xs text-slate-500">新建子节点</span>
              <span class="text-[12.5px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-3xs font-extrabold">Tab</span>
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
              <span class="text-xs text-slate-500">新建同级节点</span>
              <span class="text-[12.5px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-3xs font-extrabold">Enter</span>
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
              <span class="text-xs text-slate-500">双击卡片 / 空格修改内容</span>
              <span class="text-[12.5px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-3xs font-extrabold">Space</span>
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
              <span class="text-xs text-slate-500">删除当前分支</span>
              <span class="text-[12.5px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-3xs font-extrabold">Delete</span>
            </div>
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
              <span class="text-xs text-slate-500">关闭当前气泡</span>
              <span class="text-[12.5px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded shadow-3xs font-extrabold">Esc</span>
            </div>
          </div>

          <button
            @click="showShortcutsHelp = false"
            class="mt-5 w-full bg-[#4a6cf7] hover:bg-blue-600 text-white font-bold text-xs py-2 rounded-xl border-none cursor-pointer"
          >
            我知道了
          </button>
        </div>
      </div>
    </Transition>

    <!-- MAIN GRID WORKSPACE CONFIGURATION -->
    <template v-if="viewMode === 'map'">
      <div class="grid grid-cols-1 lg:grid-cols-12 grid-rows-[1fr] border border-slate-200 dark:border-slate-700 bg-[#f8fafc] dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-3xs flex-1 min-h-0">

        <!-- LEFT 9 COLUMNS: THE XMIND INTERACTIVE CANVAS -->
        <div
          @mousedown="handlePanMouseDown"
          @mousemove="handlePanMouseMove"
          @mouseup="handlePanMouseUp"
          @mouseleave="handlePanMouseUp"
          :class="`col-span-12 lg:col-span-9 h-full overflow-hidden relative select-none border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 ${
            currentTheme.bgClass
          } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`"
          :style="{ backgroundColor: currentTheme.canvasBg }"
          id="mindmap-canvas-container"
        >

          <!-- CANVAS GRID LINES BACKGROUND GAUGE -->
          <div
            class="absolute inset-0 pointer-events-none"
            :style="{
              backgroundImage: `radial-gradient(${currentTheme.gridColor} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }"
          />

          <!-- FLOATING ACTION TOOLBAR: ZOOM AND ADAPTATION PANEL -->
          <div class="absolute bottom-4 right-4 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xs border border-slate-200/90 dark:border-slate-700 px-3 py-2 rounded-2xl shadow-md z-30 flex items-center gap-3">
            <button
              @click="handleZoom('out')"
              class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-500 text-slate-500 dark:text-slate-400 rounded-lg cursor-pointer border-none bg-transparent"
              title="缩小"
            >
              <Minus class="w-4 h-4" />
            </button>
            <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 select-none">{{ zoom }}%</span>
            <button
              @click="handleZoom('in')"
              class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-500 text-slate-500 dark:text-slate-400 rounded-lg cursor-pointer border-none bg-transparent"
              title="放大"
            >
              <Plus class="w-4 h-4" />
            </button>
            <div class="w-[1.5px] h-4 bg-slate-200 dark:bg-slate-600" />
            <button
              @click="handleResetCanvasOffset"
              class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 bg-transparent border-none rounded-lg cursor-pointer text-xs font-bold"
              title="视野归心居中"
            >
              <Maximize class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- DYNAMIC CONNECTOR PATHS (SVG) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-10 transition-all duration-150">
            <g :style="{
              transform: `translate(${pan.x + 380}px, ${pan.y + 310}px) scale(${zoom / 100})`,
              transformOrigin: '0 0'
            }">
              <path
                v-for="pathObj in connectionPaths"
                :key="pathObj.id"
                :d="pathObj.d"
                fill="none"
                :stroke="pathObj.color"
                :stroke-width="pathObj.strokeWidth"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="opacity-85 hover:opacity-100 transition-all duration-200 cursor-pointer"
              />
            </g>
          </svg>

          <!-- INTERACTIVE COMPOSABLE MIND NODES LAYER -->
          <div
            :style="{
              transform: `translate(${pan.x + 380}px, ${pan.y + 310}px) scale(${zoom / 100})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }"
            class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            id="mindmap-nodes-container"
          >
            <div
              v-for="layout in placedLayoutsComputed"
              :key="layout.id"
              @click="onNodeClick(layout.node.id, $event)"
              @dblclick="onNodeDoubleClick(layout.node.id, layout.node.label, $event)"
              :style="getNodeStyle(layout, selectedNodeId === layout.node.id)"
              :class="getNodeClasses(layout, selectedNodeId === layout.node.id, searchMatches.includes(layout.node.id) && searchMatches[currentMatchIndex] === layout.node.id)"
            >
              <!-- Inline Text Input on Editing state -->
              <input
                v-if="editingNodeId === layout.node.id"
                type="text"
                :value="editingLabelText"
                @input="editingLabelText = ($event.target as HTMLInputElement).value"
                @blur="onEditBlur(layout.node.id)"
                @keydown="onEditKeyDown(layout.node.id, $event)"
                class="w-full text-center border-none py-0.5 rounded outline-none font-bold text-slate-800 bg-amber-50"
                autofocus
              />
              <div v-else class="flex flex-col gap-1">
                  <div
                    v-if="(layout.node.priority && layout.node.priority !== 'None') || (layout.node.progress !== undefined && layout.node.progress > 0)"
                    class="flex items-center gap-1.5 flex-wrap justify-start mb-0.5"
                  >
                    <span
                      v-if="layout.node.priority && layout.node.priority !== 'None'"
                    :class="`w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-black border text-center leading-none shadow-xs shrink-0 select-none ${getPriorityBadgeClass(layout.node.priority)}`"
                    :title="`优先级 ${layout.node.priority}`"
                  >
                    {{ layout.node.priority.replace('P', '') }}
                  </span>

                  <svg
                    v-if="layout.node.progress !== undefined && layout.node.progress > 0"
                    :width="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size"
                    :height="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size"
                    class="shrink-0 -rotate-90"
                  >
                    <circle
                      :cx="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size / 2"
                      :cy="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size / 2"
                      :r="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).radius"
                      :stroke="currentTheme.isDark ? '#334155' : '#e2e8f0'"
                      :stroke-width="1.2"
                      fill="transparent"
                    />
                    <circle
                      :cx="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size / 2"
                      :cy="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).size / 2"
                      :r="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).radius"
                      :stroke="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).color"
                      :stroke-width="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).strokeWidth"
                      fill="transparent"
                      :stroke-dasharray="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).circumference"
                      :stroke-dashoffset="getProgressRingAttrs(layout.node.progress, getBranchColor(layout.node.id)).strokeDashoffset"
                      stroke-linecap="round"
                      class="transition-all duration-300"
                    />
                  </svg>
                </div>

                <div class="flex items-center justify-between gap-1.5">
                  <span :class="`w-full leading-normal ${
                    layout.id === 'root' ? 'text-center font-black uppercase' :
                    layout.level === 1 ? 'text-left font-extrabold' :
                    'text-left font-semibold text-[13.5px]'
                  }`">{{ layout.node.label }}</span>

                  <FileText
                    v-if="(nodeNotes[layout.node.id] || '').trim()"
                    class="w-3.5 h-3.5 text-slate-400 shrink-0 select-none animate-bounce"
                    title="该考点带有拓展学习笔记"
                  />
                </div>
              </div>

              <button
                v-if="layout.node.children && layout.node.children.length > 0"
                @click="onCollapseClick(layout.node.id, $event)"
                :style="{ transform: 'translate(-50%, -50%)' }"
                :class="`absolute top-1/2 w-4.5 h-4.5 bg-slate-50 border border-slate-300 text-[12px] rounded-full flex items-center justify-center cursor-pointer shadow-3xs hover:bg-slate-100 z-50 text-slate-600 transition-transform hover:scale-105 pointer-events-auto ${
                  layout.side === 'left' ? 'left-0.5' : 'right-0.5 translate-x-1'
                }`"
              >
                {{ layout.node.collapsed ? '+' : '-' }}
              </button>
            </div>
          </div>

        </div>

        <!-- RIGHT 3 COLUMNS: XMIND PROPERTIES FORMATTER SIDEBAR -->
        <div class="col-span-12 lg:col-span-3 bg-white dark:bg-[#1e293b] p-5 flex flex-col justify-between select-none border-l border-slate-200 dark:border-slate-700">
          <div class="flex flex-col gap-5">

            <!-- Sidebar Header Category selector tabs -->
            <div class="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-700 pb-3">
              <button
                @click="activeTab = '样式'"
                :class="`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border-none bg-transparent cursor-pointer transition-all ${
                  activeTab === '样式' ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`"
              >
                <Palette class="w-3.5 h-3.5" />
                <span>Xmind 样式</span>
              </button>
              <button
                @click="activeTab = '大纲'"
                :class="`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border-none bg-transparent cursor-pointer transition-all ${
                  activeTab === '大纲' ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`"
              >
                <FolderOpen class="w-3.5 h-3.5" />
                <span>节点大纲</span>
              </button>
              <button
                @click="activeTab = '笔记'"
                :class="`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border-none bg-transparent cursor-pointer transition-all ${
                  activeTab === '笔记' ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`"
              >
                <FileText class="w-3.5 h-3.5" />
                <span>延伸笔记</span>
              </button>
            </div>

            <!-- TAB 1: STYLE PANEL -->
            <div v-if="activeTab === '样式'" class="flex flex-col gap-5">

              <!-- Category 1: Structural Paths Style -->
              <div>
                <span class="text-[13.5px] font-bold text-slate-400 dark:text-slate-500 block mb-2 font-sans">1. 导图骨架样式</span>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    @click="structureStyle = 'curved'; showToast('已切换为 Xmind 极光贝塞尔曲线线段')"
                    :class="`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer bg-white dark:bg-slate-800 transition-all ${
                      structureStyle === 'curved' ? 'border-[#4a6cf7] bg-blue-50/35 dark:bg-blue-900/30 ring-1 ring-[#4a6cf7]' : 'hover:border-slate-300 dark:hover:border-slate-500'
                    }`"
                  >
                    <Network class="w-4 h-4 text-blue-500" />
                    <span class="text-[12px] font-bold text-slate-700 dark:text-slate-300 mt-1">贝塞尔曲线</span>
                  </button>

                  <button
                    @click="structureStyle = 'logic-right'; showToast('已重塑为直角折线连接方式')"
                    :class="`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer bg-white dark:bg-slate-800 transition-all ${
                      structureStyle === 'logic-right' ? 'border-[#4a6cf7] bg-blue-50/35 dark:bg-blue-900/30 ring-1 ring-[#4a6cf7]' : 'hover:border-slate-300 dark:hover:border-slate-500'
                    }`"
                  >
                    <Layout class="w-4 h-4 text-emerald-500" />
                    <span class="text-[12px] font-bold text-slate-700 dark:text-slate-300 mt-1">直角折线图</span>
                  </button>

                  <button
                    @click="structureStyle = 'org-vertical'; showToast('已开启极简直连线连接方式')"
                    :class="`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer bg-white dark:bg-slate-800 transition-all ${
                      structureStyle === 'org-vertical' ? 'border-[#4a6cf7] bg-blue-50/35 dark:bg-blue-900/30 ring-1 ring-[#4a6cf7]' : 'hover:border-slate-300 dark:hover:border-slate-500'
                    }`"
                  >
                    <Compass class="w-4 h-4 text-orange-500" />
                    <span class="text-[12px] font-bold text-slate-700 dark:text-slate-300 mt-1">极简直连线</span>
                  </button>
                </div>
              </div>

              <!-- Category 2: Xmind Multi-Themes selection Grid -->
              <div>
                <span class="text-[13.5px] font-bold text-slate-400 dark:text-slate-500 block mb-2 font-sans">2. 预设美学主题 (Core Themes)</span>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="theme in PREMIUM_THEMES"
                    :key="theme.id"
                    @click="activeThemeId = theme.id; showToast(`主题切换为 [${theme.name}]`)"
                    :class="`flex items-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all text-left ${
                      activeThemeId === theme.id ? 'border-[#4a6cf7] bg-blue-50/40 dark:bg-blue-900/30 ring-1 ring-[#4a6cf7]' : 'hover:border-slate-300 dark:hover:border-slate-500'
                    }`"
                  >
                    <span class="text-[13px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ theme.name }}</span>
                  </button>
                </div>
              </div>

              <div class="h-[1px] bg-slate-100 dark:bg-slate-700 my-1" />

              <!-- Category 3: Selected Node Active topic parameters -->
              <div>
                <div class="flex items-center gap-1 text-[13.5px] font-bold text-slate-400 dark:text-slate-500 mb-2.5 font-sans">
                  <Sliders class="w-3.5 h-3.5" />
                  <span>3. 激活项属性 (Node Parameters)</span>
                </div>

                <div v-if="getActiveNode()" class="bg-slate-50/70 dark:bg-slate-800 border border-slate-150 dark:border-slate-600 rounded-xl p-3.5 flex flex-col gap-3.5 font-sans">
                  <span class="text-[12px] font-bold text-slate-400 dark:text-slate-500 block uppercase">当前节点: <span class="text-[#4a6cf7] font-extrabold">{{ getActiveNode()?.label }}</span></span>

                  <!-- Option 1: Task Priority Badge selectors -->
                  <div>
                    <span class="text-[13px] text-slate-500 dark:text-slate-400 block mb-1.5 font-semibold">1. 考点权重优先级</span>
                    <div class="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-150 dark:border-slate-600 justify-between">
                      <button
                        v-for="prio in (['P1', 'P2', 'P3', 'None'] as const)"
                        :key="prio"
                        @click="handleSetPriority(selectedNodeId, prio)"
                        :class="`flex-1 py-1.5 text-[12px] font-bold rounded-lg border cursor-pointer transition-all ${
                          getActiveNode()?.priority === prio
                            ? prio === 'P1' ? 'bg-rose-500 text-white border-rose-500 shadow-xs' : prio === 'P2' ? 'bg-amber-500 text-white border-amber-500 shadow-xs' : prio === 'P3' ? 'bg-sky-500 text-white border-sky-500 shadow-xs' : 'bg-slate-700 text-white border-slate-705'
                            : 'bg-white hover:bg-slate-55 text-slate-600 border-transparent'
                        }`"
                      >
                        {{ prio === 'None' ? '无权重' : prio }}
                      </button>
                    </div>
                  </div>

                  <!-- Option 3: Progress completion status indicators -->
                  <div>
                    <span class="text-[13px] text-slate-500 dark:text-slate-400 block mb-1.5 font-semibold">3. 学习备考掌握度</span>
                    <div class="grid grid-cols-5 gap-1 text-center font-mono">
                      <button
                        v-for="prog in ([0, 25, 50, 75, 100] as const)"
                        :key="prog"
                        @click="handleSetProgress(selectedNodeId, prog)"
                        :class="`py-1 rounded-lg border text-[12px] font-bold cursor-pointer transition-all ${
                          getActiveNode()?.progress === prog
                            ? 'bg-[#4a6cf7] text-white border-[#4a6cf7]'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-150'
                        }`"
                      >
                        {{ prog }}%
                      </button>
                    </div>
                  </div>

                </div>
                <div v-else class="text-center py-8 text-slate-400 dark:text-slate-500 text-[13.5px] font-medium border border-dashed border-slate-200 dark:border-slate-600 rounded-xl leading-relaxed">
                  点击选中画布中的任何考点节点，<br />即可在此设置权重优先级与学习进度。
                </div>
              </div>

            </div>

            <!-- TAB 2: FLAT OUTLINE LIST VIEW -->
            <div v-if="activeTab === '大纲'" class="flex flex-col gap-3">
              <span class="text-[13.5px] font-bold text-slate-400 dark:text-slate-500 block mb-1 font-sans">考点大纲层级结构列表</span>

              <div class="max-h-[360px] overflow-y-auto border border-slate-150 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 rounded-xl p-3 flex flex-col gap-2 select-none">
                <div
                  v-for="layout in placedLayoutsComputed"
                  :key="layout.id"
                  @click="onOutlineClick(layout.id, layout.node.label)"
                  :style="{ paddingLeft: `${layout.level * 14}px` }"
                  :class="`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors text-xs font-semibold ${
                    selectedNodeId === layout.id
                      ? 'bg-[#4a6cf7]/10 text-[#4a6cf7]'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-slate-400"
                    :style="{ backgroundColor: currentTheme.branchColors[layout.level % currentTheme.branchColors.length] }"
                  />
                  <span class="truncate">{{ layout.node.label }}</span>
                </div>
              </div>

              <span class="text-[12px] text-slate-400 dark:text-slate-500 font-medium leading-normal block">
                提示: 双击导图内的卡片或者右侧大纲项目可以随时同步聚焦。
              </span>
            </div>

            <!-- TAB 3: EXTENDED STUDY NOTES FOR SELECTED NODE -->
            <div v-if="activeTab === '笔记'" class="flex flex-col gap-3 font-sans">
              <div class="flex items-center justify-between">
                <span class="text-[13.5px] font-bold text-slate-400 dark:text-slate-500 block font-sans">拓展学习与归纳笔记</span>
                <span class="text-[12px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                  <CheckCircle class="w-3 h-3 text-emerald-500" />
                  已自动保存
                </span>
              </div>

              <div v-if="getActiveNode()" class="flex flex-col gap-3">
                <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                  <BookOpen class="w-3.5 h-3.5 text-blue-500 mr-1" />
                  <span class="font-bold">备考总结卡: </span>
                  <span class="truncate text-[#4a6cf7] font-semibold">{{ getActiveNode()?.label }}</span>
                </div>

                <textarea
                  :value="nodeNotes[selectedNodeId] || ''"
                  @input="handleSaveNotes(selectedNodeId, ($event.target as HTMLTextAreaElement).value)"
                  placeholder="在此写入针对本高频考点的手写总结、答题要点、备考警示、或代码示例。支持直接渲染..."
                  class="w-full h-80 border border-slate-200 dark:border-slate-600 focus:border-[#4a6cf7] focus:ring-1 focus:ring-[#4a6cf7] rounded-xl p-3.5 text-xs font-semibold leading-relaxed text-slate-800 dark:text-white outline-none resize-none placeholder:text-slate-400/80 bg-slate-50/20 dark:bg-slate-800"
                />
              </div>
              <div v-else class="text-center py-10 text-slate-400 dark:text-slate-500 text-[13.5px] font-medium border border-dashed border-slate-200 dark:border-slate-600 rounded-xl">
                请先在思维导图中点选一个考点分支，即可归纳相关延伸学习笔记卡。
              </div>
            </div>

          </div>

          <!-- LOWER PORTION: EXPORT AND FORMAT FILES BUTTONS -->
          <div class="flex flex-col gap-2 mt-5 border-t border-slate-100 dark:border-slate-700 pt-4.5">
            <span class="text-[13px] text-slate-400 dark:text-slate-500 block mb-1">多维学习成果生成 (Export Data)</span>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="handleExportMarkdown"
                class="flex items-center justify-center gap-1.5 py-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-[#ea580c] hover:border-[#ea580c] font-bold text-xs bg-white dark:bg-slate-800 rounded-xl border border-orange-200 dark:border-orange-800 cursor-pointer transition-colors"
              >
                <FileText class="w-3.5 h-3.5" />
                <span>导出MD笔记</span>
              </button>
              <button
                @click="handleExportJSON"
                class="flex items-center justify-center gap-1.5 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[#4a6cf7] hover:border-blue-400 font-bold text-xs bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 cursor-pointer transition-colors"
              >
                <Download class="w-3.5 h-3.5" />
                <span>导出纯数据</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </template>

    <!-- FALLBACK BIG OUTLINE EXPLORATION STRUCTURE VIEW -->
    <template v-else>
      <div class="bg-white dark:bg-[#1e293b] border border-slate-200/90 dark:border-slate-700 rounded-2xl p-6 md:p-10 shadow-3xs min-h-[500px]" id="mindmap-fullscreen-outline-panel">
        <div class="max-w-3xl mx-auto flex flex-col gap-6 font-sans">
          <div>
            <h3 class="text-xl font-extrabold text-[#111827] dark:text-white flex items-center gap-2">
              <span>{{ mindmapRoot.label }} 结构存贮纲要</span>
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              采用树级可交互索引形式展现，直接点击纲要条目，不仅可以大纲中直接打字段，还能瞬间跳回思维导图内聚焦！
            </p>
          </div>

          <div class="border border-slate-100 dark:border-slate-700 bg-[#f8fafc]/60 dark:bg-slate-800/60 rounded-2xl p-5 flex flex-col gap-3 shadow-3xs">
            <div
              v-for="layout in placedLayoutsComputed"
              :key="layout.id"
              :style="{ paddingLeft: `${layout.level * 24}px` }"
              @click="onOutlineViewClick(layout.id, layout.node.label)"
              :class="`flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                selectedNodeId === layout.id
                  ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20 scale-101'
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-3xs'
              }`"
            >
              <div class="flex items-center gap-2">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  :style="{ backgroundColor: currentTheme.branchColors[layout.level % currentTheme.branchColors.length] }"
                />
                <span class="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{{ layout.node.label }}</span>

                <span
                  v-if="layout.node.priority && layout.node.priority !== 'None'"
                  class="bg-rose-500 text-white font-mono scale-90 px-1 py-0.5 rounded text-[10px] font-bold"
                >{{ layout.node.priority }}</span>

                <span
                  v-if="layout.node.progress !== undefined && layout.node.progress > 0"
                  class="bg-blue-500 text-white font-mono scale-90 px-1 py-0.5 rounded text-[10px] font-bold"
                >{{ layout.node.progress }}% 进度</span>
              </div>

              <span class="text-[13px] text-slate-400 dark:text-slate-500 font-medium truncate max-w-sm">
                {{ nodeNotes[layout.id] ? nodeNotes[layout.id].replace(/[#`*_\-]/g, '').slice(0, 48) + '...' : '暂无附加笔记笔记记录' }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 self-stretch border-t border-slate-100 dark:border-slate-700 pt-5 mt-3">
            <button
              @click="handleExportMarkdown"
              class="flex items-center gap-1.5 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 font-semibold text-white text-xs rounded-xl border-none cursor-pointer transition-colors"
            >
              <FileText class="w-3.5 h-3.5" />
              <span>一键下载 MD 格式整套学习笔记</span>
            </button>
            <button
              @click="viewMode = 'map'"
              class="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-slate-700 dark:text-slate-300 text-xs rounded-xl border-none cursor-pointer transition-colors"
            >
              <ArrowLeft class="w-3.5 h-3.5" />
              <span>返回 Xmind 二维思维导图</span>
            </button>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.25s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.95);
}

.modal-enter-active {
  transition: all 0.2s ease-out;
}
.modal-leave-active {
  transition: all 0.15s ease-in;
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div {
  transform: scale(0.95) translateY(15px);
}
.modal-leave-to > div {
  transform: scale(0.95) translateY(15px);
}
</style>
