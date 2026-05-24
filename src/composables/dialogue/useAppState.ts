import { ref, computed } from 'vue'
import type { DimensionMap, ChatMessage, StudyReport, ThemeAccent, VirtualStyle, RecommendCategory } from '@/types/dialogue'

export const activeMenu = ref<'chat' | 'portrait-report' | 'history' | 'recommend'>('chat')
export const isSidebarCollapsed = ref(false)
export const isRightSidebarCollapsed = ref(true)
export const isMetricCollapsed = ref(false)
export const themeAccent = ref<ThemeAccent>('gold')

export const dimensions = ref<DimensionMap>({
  identity: '学生',
  domain: '计算机 / AI',
  level: '初学者',
  experience: null,
  goal: null,
  motivation: null,
  period: null,
  weeklyHours: null,
  method: null,
})

export const chats = ref<ChatMessage[]>([
  {
    id: 'welcome', sender: 'ai',
    text: '你好呀！我是你的 AI 学习导师\n我会通过和你聊天，帮你绘制专属的学习星图。\n先从简单的问题开始吧~',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    source: 'chat',
    suggestChips: ['我是在校学生，学计算机的', '我是程序员，工作3年了', '我刚开始学AI，想转行'],
  },
])
export const inputText = ref('')
export const isAiLoading = ref(false)
export const selectedDimensionInfo = ref<string | null>(null)
export const report = ref<StudyReport | null>(null)
export const showReport = ref(false)
export const exportNotification = ref<string | null>(null)

export const recommendCategory = ref<RecommendCategory>('all')
export const recommendQaInput = ref('')
export const recommendQaMessages = ref<Array<{ sender: 'user' | 'ai'; text: string }>>([
  {
    sender: 'ai',
    text: '👋 您好！我是您的自适应学情推荐专属答疑助理。在此您可以获得由科大讯飞星火大模型为您提供的自学规划及推荐资源解惑。\n\n您可以选择下方的快速预置问题，或者手动输入您想了解的疑虑（例如："这三个推荐我应该按什么顺序学？"、"Gradio项目零基础可以自学吗？"），我会根据您在在校生/程序员学业画像为您量身解答！',
  },
])
export const isRecommendQaLoading = ref(false)

export const isXunfeiSidebarOpen = ref(true)
export const isVirtualMuted = ref(false)
export const virtualStyle = ref<VirtualStyle>('hologram')
export const isXunfeiConnecting = ref(false)
export const isXunfeiSpeaking = ref(false)
export const isXunfeiListening = ref(false)
export const showXunfeiHint = ref(false)
export const xunfeiSubtitle = ref('你好！我是科大讯飞智能虚拟导师。点击下方连麦，开启高阶语音会话。')
export const xunfeiVolume = ref(80)
export const xunfeiLanguage = ref('zh-CN')
export const syncToMainChat = ref(true)
export const textInput = ref('')
export const useNlp = ref(true)

export const collectedCount = computed(() =>
  Object.values(dimensions.value).filter(v => v !== null).length
)
export const canUnlockReport = computed(() => collectedCount.value >= 4)

const colorsMap = {
  gold: { text: 'text-amber-300', textHover: 'hover:text-amber-200', indicator: 'bg-amber-400', accentGlow: 'amber-400', bgBtn: 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white border border-amber-500/25 shadow-lg', bgBadge: 'bg-amber-950/50 text-amber-300 border-amber-800/40' },
  teal: { text: 'text-teal-400', textHover: 'hover:text-teal-300', indicator: 'bg-teal-400', accentGlow: 'teal-400', bgBtn: 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white border border-teal-500/25 shadow-lg', bgBadge: 'bg-teal-950/50 text-teal-400 border-teal-800/40' },
  ruby: { text: 'text-rose-400', textHover: 'hover:text-rose-300', indicator: 'bg-rose-400', accentGlow: 'rose-400', bgBtn: 'bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white border border-rose-500/25 shadow-lg', bgBadge: 'bg-rose-950/50 text-rose-400 border-rose-800/40' },
  amber: { text: 'text-amber-400', textHover: 'hover:text-amber-300', indicator: 'bg-amber-500', accentGlow: 'amber-500', bgBtn: 'bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white border border-amber-500/25 shadow-lg', bgBadge: 'bg-amber-950/50 text-amber-400 border-amber-800/40' },
}

export const colors = computed(() => ({
  ...colorsMap[themeAccent.value],
  textDark: 'text-slate-100',
  bgLight: 'bg-slate-900/40 backdrop-blur-md',
  border: 'border-slate-800/40',
  borderFocus: 'focus-within:border-cyan-500/80 focus-within:ring-cyan-950/40',
  glow: 'shadow-cyan-950/50',
}))

export const historyPresets = [
  {
    id: 'hist-1', title: '零基础 Python 与网页入门星图', score: 83, date: '2026-05-20', evaluation: '良好 (Good)',
    dimensions: { identity: '零基础兴趣', domain: '计算机 / AI', level: '零基础', experience: '无实际经验', goal: '做项目', motivation: '兴趣驱动', period: '1个月快速突破', weeklyHours: '5-10小时', method: '在线网课' },
    report: {
      score: 83, evaluation: '良好 (Good)',
      radarPoints: [
        { dimension: '知识基础', score: 72 }, { dimension: '学习速度', score: 85 }, { dimension: '逻辑思维', score: 80 },
        { dimension: '创造力', score: 92 }, { dimension: '专注力', score: 78 }, { dimension: '自律力', score: 82 },
      ],
      weaknesses: ['基本的网络编程 concept 需要时间消化', '自律专注偶有偏差，请确立分段打卡计划'],
      suggestions: ['使用 Vercel 一键部署你的第一个 Web Demo 树立信心', '跟随 Github 开源简单计算器项目进行代码临摹'],
      skills: { core: ['HTML/CSS', 'JavaScript', 'Python 基础', 'Gradio'], foundation: ['Web 运作原理', 'Git 版本管理', '页面排版'], additional: ['TailwindCSS', '数据库基础'] },
      recommendedPath: [
        { step: 1, title: '语法筑基', description: '搞定 Python 核心' }, { step: 2, title: '前端探秘', description: '掌握 HTML/CSS 书写' },
        { step: 3, title: '工程拼装', description: '对接 AI 简易接口' }, { step: 4, title: '云端直升', description: '部署应用线上可见' },
      ],
    },
  },
  {
    id: 'hist-2', title: '计算机视觉跨向智能控制规划', score: 91, date: '2026-05-18', evaluation: '极优 (Outstanding)',
    dimensions: { identity: '科研人员', domain: '机器人工程', level: '有一定基础', experience: '1-2 年', goal: '论文科研', motivation: '学业要求', period: '6+个月深度沉淀', weeklyHours: '大于20小时', method: '实战项目' },
    report: {
      score: 91, evaluation: '极优 (Outstanding)',
      radarPoints: [
        { dimension: '知识基础', score: 94 }, { dimension: '学习速度', score: 88 }, { dimension: '逻辑思维', score: 95 },
        { dimension: '创造力', score: 86 }, { dimension: '专注力', score: 91 }, { dimension: '自律力', score: 93 },
      ],
      weaknesses: ['物理硬件对接（ROS/ROS2）工程调试经验欠缺', '主流仿真平台 Web 性能瓶颈尚待突破'],
      suggestions: ['精学 PyTorch 对应卷积和注意力算子优化', '结合 Gazebo 虚拟环境实现小车路径模拟闭环'],
      skills: { core: ['PyTorch', 'OpenCV', 'ROS2', '强化学习'], foundation: ['三维重构', '矩阵论', 'Kalman 滤波'], additional: ['模型剪枝与量化部署', 'C++ 性能编程'] },
      recommendedPath: [
        { step: 1, title: '图像算法机制', description: '吃透 OpenCV 空间算子' }, { step: 2, title: '网络模型修改', description: '优化 Vision Transformer' },
        { step: 3, title: '仿真控制打通', description: '连通 ROS 与 Gazebo 状态' }, { step: 4, title: '实验指标收割', description: '输出仿真性能对比表格' },
      ],
    },
  },
] as const

export function showNotification(msg: string, duration = 2500) {
  exportNotification.value = msg
  setTimeout(() => { exportNotification.value = null }, duration)
}

export function resetConversation() {
  dimensions.value = {
    identity: null, domain: null, level: null, experience: null,
    goal: null, motivation: null, period: null, weeklyHours: null, method: null,
  }
  chats.value = [{
    id: `reset-1`, sender: 'ai',
    text: '你好呀！我是你的 AI 学习导师\n关于您的专属 AI 学习星图，让我们重新梳理一下吧！\n能跟我透露一下，您当前的工作或学习背景吗？',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    source: 'chat',
    suggestChips: ['我是在校学生，学计算机的', '我是程序员，工作3年了', '目前零基础，想要跨界学习AI'],
  }]
  showReport.value = false
  report.value = null
  activeMenu.value = 'chat'
}

export function handleChipClick(chipText: string) {
  inputText.value = chipText
}

export function restoreHistory(preset: { dimensions: Record<string, string | null>; report: Record<string, unknown>; date: string; title: string }) {
  dimensions.value = { ...preset.dimensions } as unknown as DimensionMap
  report.value = JSON.parse(JSON.stringify(preset.report)) as StudyReport
  const dateStr = preset.date
  chats.value = [
    { id: `msg-hist-${Date.now()}-ai-1`, sender: 'ai', source: 'chat', text: `🕰️ [时空脉络复活成功] 正在载入您于 ${dateStr} 归档的「${preset.title}」画像底层特征。`, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) },
    { id: `msg-hist-${Date.now()}-ai-2`, sender: 'ai', source: 'chat', text: `✅ 属性特征已重组：\n• 身份: ${preset.dimensions.identity}\n• 领域: ${preset.dimensions.domain}\n• 阶段: ${preset.dimensions.level}\n• 目标: ${preset.dimensions.goal}\n\n您可点击侧边栏「报告」按钮详细参阅，或在此继续与导师进行日常交互学程！`, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) },
  ]
  showReport.value = true
  activeMenu.value = 'portrait-report'
  showNotification(`已加载历史存档: ${preset.title}`)
}

export function handleQuickSandboxDeduce() {
  dimensions.value = {
    identity: '程序员', domain: '计算机 / AI', level: '有一定基础', experience: '1-2 年',
    goal: '做项目', motivation: '职业转型', period: '3个月系统掌握', weeklyHours: '10-20小时', method: '实战项目',
  }
  showNotification('⚡ 正在请求星核引擎执行维度评测拟合...')
  setTimeout(() => {
    report.value = {
      score: 89, evaluation: '极优 (Outstanding)',
      radarPoints: [
        { dimension: '知识基础', score: 81 }, { dimension: '学习速度', score: 94 }, { dimension: '逻辑思维', score: 90 },
        { dimension: '创造力', score: 92 }, { dimension: '专注力', score: 86 }, { dimension: '自律力', score: 88 },
      ],
      weaknesses: ['系统分布式与边缘端推理算力调优实践尚浅', '在复杂 Agent 路由架构与对抗微调层面稍有盲区'],
      suggestions: ['推荐通过 Gradio/Streamlit 快速构造模型 Web 表单，建立最小闭环验证', '建议借助 LlamaIndex 补全向量存储与 RAG 双路召回机制'],
      skills: { core: ['React SPA', 'Python 快速开发', '大模型API集成', 'Prompt Engineering'], foundation: ['提示词机制', '数据库框架', 'Git工作流', '多线程编程'], additional: ['Docker 容器服务', 'Agent 路由链', '模型冷启动调优'] },
      recommendedPath: [
        { step: 1, title: '技术环境跑通', description: '配置 Pyenv 虚拟栈与大模型直连端口' }, { step: 2, title: '全栈交互构造', description: '构造基于 Gradio 与 FastAPI 后端的交互端点' },
        { step: 3, title: '召回通道拟合', description: '引入 Pinecone 向量并执行 RAG 双轨增效测评' }, { step: 4, title: '工程实战解禁', description: '上线容器云并收集线上日志进行微调迭代' },
      ],
    }
    showReport.value = true
    activeMenu.value = 'portrait-report'
    showNotification('🎉 模拟画像及自适应评测报告生成成功！')
  }, 1200)
}

export function handleExportPDF() {
  showNotification('正在生成本页学习画像报告 PDF...')
  setTimeout(() => {
    window.print()
    exportNotification.value = null
  }, 1200)
}

export function handleShare() {
  navigator.clipboard.writeText(window.location.href)
  showNotification('页面链接已复制，可分享此画像报告给好友！')
}

export function selectNodeDetail(nodeLabel: string) {
  selectedDimensionInfo.value = nodeLabel
}
