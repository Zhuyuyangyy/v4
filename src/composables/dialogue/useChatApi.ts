import {
  chats, dimensions, inputText, isAiLoading, report, showReport, activeMenu, canUnlockReport,
  recommendQaInput, recommendQaMessages, isRecommendQaLoading,
  isXunfeiConnecting, isXunfeiListening, isXunfeiSpeaking,
  xunfeiSubtitle, isVirtualMuted, xunfeiLanguage, xunfeiVolume, syncToMainChat,
} from './useAppState'
import { avatarStatus, avatarWriteText, setAvatarNlpHandler, setAvatarAsrHandler, getAvatarInstance } from './useAvatarSdk'
import type { ChatMessage, StudyReport, ChatResponse } from '@/types/dialogue'

function getTime() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
}

setAvatarNlpHandler((data: any) => {
  if (!syncToMainChat.value) return
  const text = data?.payload?.choices?.text?.[0]?.content || data?.text || ''
  if (!text) return
  isXunfeiSpeaking.value = true

  const last = chats.value[chats.value.length - 1]
  if (last?.sender === 'ai' && last?.source === 'chat' && last.text === text) return
  if (last?.source === 'xunfei' && last?.sender === 'ai') {
    chats.value = [...chats.value.slice(0, -1), { ...last, text }]
  } else {
    chats.value = [
      ...chats.value,
      { id: `xf-ai-${Date.now()}`, sender: 'ai', text, time: getTime(), source: 'xunfei' },
    ]
  }
})

setAvatarAsrHandler((data: any) => {
  if (!syncToMainChat.value) return
  const text = data?.payload?.result?.text || data?.text || ''
  if (!text) return

  const last = chats.value[chats.value.length - 1]
  if (last?.source === 'asr') {
    chats.value = [...chats.value.slice(0, -1), { ...last, text }]
  } else {
    chats.value = [
      ...chats.value,
      { id: `xf-user-${Date.now()}`, sender: 'user', text, time: getTime(), source: 'asr' },
    ]
  }
})

export async function sendMessage() {
  if (!inputText.value.trim() || isAiLoading.value) return

  const userMsgText = inputText.value.trim()
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}-user`, sender: 'user', text: userMsgText, time: getTime(), source: 'chat',
  }
  chats.value = [...chats.value, userMsg]
  inputText.value = ''
  isAiLoading.value = true

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chats.value,
        currentDimensions: dimensions.value,
      }),
    })
    const data: ChatResponse = await res.json()

    if (data.extractedDimensions) {
      dimensions.value = { ...dimensions.value, ...data.extractedDimensions }
    }

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}-ai`, sender: 'ai',
      text: data.reply, time: getTime(),
      capturedTags: data.capturedTags || [],
      suggestChips: data.suggestChips || [],
      source: 'chat',
    }

    if (dimensions.value.identity && dimensions.value.domain && dimensions.value.level && !dimensions.value.goal) {
      dimensions.value = { ...dimensions.value, goal: '做项目' }
    }

    chats.value = [...chats.value, aiMsg]
    if (data.report) report.value = data.report

    if (syncToMainChat.value && avatarStatus.value === 'connected') {
      avatarWriteText(data.reply, false)
      isXunfeiSpeaking.value = true
    }
  } catch (err) {
    console.error('Message transmission error:', err)
  } finally {
    isAiLoading.value = false
  }
}

export async function triggerReport() {
  if (!canUnlockReport.value) return
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chats.value, currentDimensions: dimensions.value }),
    })
    const data = await res.json()
    if (data.report) {
      report.value = data.report
      showReport.value = true
      activeMenu.value = 'portrait-report'
    }
  } catch {
    const fallback: StudyReport = {
      score: 87, evaluation: '优秀',
      radarPoints: [
        { dimension: '知识基础', score: 85 }, { dimension: '学习速度', score: 90 },
        { dimension: '逻辑思维', score: 88 }, { dimension: '创造力', score: 82 },
        { dimension: '专注力', score: 80 }, { dimension: '自律力', score: 86 },
      ],
      weaknesses: ['数学基础需要加强，特别是线性代数和概率统计', '项目实战经验较少，缺乏完整项目开发经历', '学习时长可以适当增加，建议每周 ≥ 10 小时'],
      suggestions: ['从小项目入手，边学边做，建立项目经验', '系统补充数学基础，推荐相关课程和练习', '保持当前学习节奏，逐步提升深度学习能力'],
      skills: { core: ['Python', '机器学习', '深度学习', '数据分析'], foundation: ['算法基础', '数学基础', '项目实战', '大模型应用'], additional: ['工程化部署', '强化学习', '计算机视觉'] },
      recommendedPath: [
        { step: 1, title: '巩固优势', description: '夯实基础知识' }, { step: 2, title: '补齐短板', description: '强化薄弱环节' },
        { step: 3, title: '实战跃迁', description: '完成项目实践' }, { step: 4, title: '周期校准', description: '定期复盘优化' },
      ],
    }
    report.value = fallback
    showReport.value = true
    activeMenu.value = 'portrait-report'
  }
}

export function handleSendRecommendQa(customText?: string) {
  const textToSend = customText || recommendQaInput.value
  if (!textToSend.trim() || isRecommendQaLoading.value) return

  recommendQaMessages.value = [...recommendQaMessages.value, { sender: 'user', text: textToSend }]
  recommendQaInput.value = ''
  isRecommendQaLoading.value = true

  if (avatarStatus.value === 'connected') {
    avatarWriteText(textToSend, true)
    isXunfeiSpeaking.value = true

    const nlpHandler = (data: any) => {
      const response = data?.payload?.choices?.text?.[0]?.content || data?.text || ''
      if (response) {
        recommendQaMessages.value = [...recommendQaMessages.value, { sender: 'ai', text: response }]
        isRecommendQaLoading.value = false
        isXunfeiSpeaking.value = false
      }
      const instance = getAvatarInstance()
      if (instance) instance.off('nlp', nlpHandler)
    }

    const instance = getAvatarInstance()
    if (instance) instance.on('nlp', nlpHandler)
  } else {
    setTimeout(() => {
      let response = ''
      const query = textToSend.toLowerCase()
      if (query.includes('顺序') || query.includes('规划') || query.includes('学习路径')) {
        response = `💡 **学习路径规划建议：**\n\nEduMind 课程体系推荐以下学习路径：\n\n**入门阶段（零基础）：**\n1. **Python程序设计** → 入门编程基础，无前置要求\n2. **C语言程序设计** → 打下扎实的底层编程功底\n3. **人工智能导论** → 建立 AI 整体认知\n\n**进阶阶段（有基础）：**\n4. **数据结构** → 掌握核心数据组织方式\n5. **机器学习** → 深入 AI 核心算法\n6. **深度学习** → 掌握神经网络与 CNN\n\n**高级阶段（专项突破）：**\n7. **自然语言处理** 或 **计算机视觉** → 按兴趣选择方向\n8. **强化学习 / 生成式AI** → 前沿技术拓展\n9. **大数据与云计算** → 工程化部署能力`
      } else if (query.includes('零基础') || query.includes('新手') || query.includes('没有基础') || query.includes('入门')) {
        response = `🌱 **零基础学习指南：**\n\n别担心！EduMind 课程体系为零基础同学设计了清晰的入门路径：\n\n**推荐课程（按顺序）：**\n1. **Python程序设计** — 语法简洁，上手快，适合编程启蒙\n2. **C语言程序设计** — 理解底层原理，夯实基础\n3. **人工智能导论** — 建立 AI 整体知识框架\n4. **数据结构** — 培养算法思维\n\n**学习建议：**\n- Python 入门可从列表、字典等数据结构开始，配合小项目练习\n- 每天保持 1-2 小时编码实践，比纯看书效果好 3 倍\n- 每学完一门课，尝试做一个综合小项目巩固知识`
      } else if (query.includes('课程') || query.includes('介绍') || query.includes('学科') || query.includes('内容')) {
        response = `🎓 **EduMind 课程体系概览：**\n\n共 **5 大方向、24 门课程**，由浅入深覆盖计算机核心知识：\n\n**1. 编程与算法基础（7门）：**\nC/Python/Java/C++ 编程语言 → 数据结构 → 算法设计 → 编译原理\n\n**2. 计算机系统（4门）：**\n计算机组成原理 → 操作系统 → 计算机网络 → 数据库系统原理\n\n**3. 软件工程（2门）：**\n软件工程 → 软件测试\n\n**4. 人工智能方向（8门）：**\n离散数学 → 概率统计 → AI 导论 → 机器学习 → 深度学习 → NLP → 计算机视觉 → 强化学习/生成式AI\n\n**5. 前沿与应用（3门）：**\n计算机图形学 → 信息安全 → 大数据与云计算\n\n每门课都包含核心知识点、代码示例和预设问答，可点击课程卡片展开查看。`
      } else {
        response = `🤖 **EduMind 课程答疑：**\n\n收到您对课程的提问！针对【${dimensions.value.identity || '学习者'}】的身份，我的建议是：\n\n1. 根据当前水平选择起点：零基础从 **Python程序设计** 开始，有基础可直接进入 **数据结构** 或 **机器学习**\n2. 建议按 "基础 → 核心 → 方向" 的三层结构推进学习\n3. 每门课都配有**核心知识点**、**代码示例**和**预设问答**，可展开课程卡片查看详情\n4. 如需进一步了解某门课程的具体内容，点击课程卡片上的「连麦咨询」按钮，我可以为你详细讲解`
      }
      recommendQaMessages.value = [...recommendQaMessages.value, { sender: 'ai', text: response }]
      isRecommendQaLoading.value = false
    }, 1005)
  }
}

export function runXunfeiSimulation(customQuestion?: string) {
  if (isXunfeiConnecting.value || isXunfeiListening.value) return
  if (isXunfeiSpeaking.value) {
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel() } catch { /* ignore */ }
    isXunfeiSpeaking.value = false
    xunfeiSubtitle.value = '你好！已为您停止播报。点击下方问题，随时开启新轮次的高阶对讲！'
    return
  }

  const targetQuestion = customQuestion || '我该如何科学地规划自己的日常AI学习道路呢？'
  isXunfeiListening.value = true
  xunfeiSubtitle.value = `🎙️ [实时收音中...] \n"${targetQuestion}"`

  setTimeout(() => {
    isXunfeiListening.value = false
    isXunfeiConnecting.value = true
    xunfeiSubtitle.value = '⚡「科大讯飞星火模型」深度大语言引擎多维语义分析中...'

    setTimeout(() => {
      isXunfeiConnecting.value = false
      isXunfeiSpeaking.value = true

      let responseText = ''
      if (targetQuestion.includes('Python程序设计') || targetQuestion.includes('C语言') || targetQuestion.includes('数据结构') || (targetQuestion.includes('介绍') && (targetQuestion.includes('课程') || targetQuestion.includes('门')))) {
        responseText = `根据 EduMind 课程体系，我来为您详细介绍！我们拥有 5 大方向共 24 门精品课程。如果您是零基础入门，建议从 **Python程序设计** 开始——它语法简洁、上手快，无前置要求，包含基础语法、数据结构、函数、面向对象等核心内容。学完 Python 后可以继续学习 **C语言程序设计** 来深入理解底层原理，再进入 **数据结构与算法** 的进阶学习。每门课程都配有核心知识点表格、可运行的代码示例以及预设问答环节，你可以随时在课程页面展开查看详情！`
      } else if (targetQuestion.includes('算法') || targetQuestion.includes('大模型')) {
        responseText = '关于当下的大模型，我建议你不仅要通过论文学习 Transformer 核心运作理论，更要把精力投放在 LoRA/QLoRA 高效微调、量化推理提速（比如 vLLM），以及使用 LangChain 或 LlamaIndex 搭建 RAG（检索增强生成）和 AI Agent 智能路由工作流。这是目前一线大厂最欠缺的工程实战技能，求职加分极大！'
      } else if (targetQuestion.includes('零基础') || targetQuestion.includes('项目')) {
        responseText = '零基础学习，切忌陷入死记硬背！最有效的办法是树立"最小项目闭环"。首周先学习 Python 基础并使用 Gradio 调用免费 API 搭建一个带图形页面的 PDF 智能摘要阅读助手，发布到 HuggingFace。有了立竿见影的实战反馈，能极大激发你的自学成就感和内驱力！'
      } else if (targetQuestion.includes('规划') || targetQuestion.includes('星图') || targetQuestion.includes('路径')) {
        responseText = 'EduMind 学习路径建议：入门阶段从 Python 和 C 语言开始打基础；进阶阶段学习数据结构和机器学习核心算法；高级阶段按兴趣选择 NLP、计算机视觉或大数据方向。每门课程都配有代码示例和预设问答，你可以随时展开课程卡片查看详情。'
      } else {
        responseText = '收到您对课程的咨询！EduMind 课程体系涵盖 5 大方向共 24 门课程，从编程基础到人工智能前沿均有覆盖。您可以在课程页面浏览所有课程，点击课程卡片展开查看核心知识点、代码示例和预设问答。如需深入了解某门具体课程，我也很乐意为您详细讲解！'
      }

      xunfeiSubtitle.value = `"${responseText}"`

      if (!isVirtualMuted.value) {
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(responseText)
            utterance.lang = xunfeiLanguage.value
            utterance.volume = xunfeiVolume.value / 100
            utterance.rate = 1.05
            utterance.onend = () => { isXunfeiSpeaking.value = false }
            utterance.onerror = () => { isXunfeiSpeaking.value = false }
            window.speechSynthesis.speak(utterance)
          } else {
            setTimeout(() => { isXunfeiSpeaking.value = false }, 8000)
          }
        } catch {
          setTimeout(() => { isXunfeiSpeaking.value = false }, 8000)
        }
      } else {
        setTimeout(() => { isXunfeiSpeaking.value = false }, 8000)
      }

      if (syncToMainChat.value) {
        const currentTime = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
        chats.value = [
          ...chats.value,
          { id: `xf-user-${Date.now()}`, sender: 'user', text: targetQuestion, time: currentTime, source: 'xunfei' },
          { id: `xf-ai-${Date.now()}`, sender: 'ai', text: responseText, time: currentTime, source: 'xunfei' },
        ]
      }
    }, 1200)
  }, 2000)
}
