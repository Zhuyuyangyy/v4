<template>
  <Transition name="panel-slide">
    <div class="planet-panel" v-if="node" @wheel.stop>
      <div class="panel-orbit" :style="{ '--orbit-clr': orbitColor }" />

      <!-- Header -->
      <div class="panel-header">
        <div class="header-top">
          <div class="badge-row">
            <span class="type-badge" :class="typeClass">{{ typeLabel }}</span>
            <span class="system-badge">{{ systemName }}</span>
          </div>
          <button
            class="bookmark-btn"
            :class="{ marked: bookmarked }"
            @click="toggleBookmark"
            :title="bookmarked ? '取消收藏' : '收藏此星球'"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" :fill="bookmarked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5">
              <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
            </svg>
          </button>
        </div>
        <h2 class="panel-title">{{ node.name }}</h2>
        <p class="panel-title-en">{{ node.nameEn }}</p>
        <p class="panel-desc">{{ node.description }}</p>
      </div>

      <!-- Scrollable Body -->
      <div class="panel-body" @wheel.stop>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-block">
            <span class="stat-label">难度指数</span>
            <div class="star-row">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= starRating }">★</span>
              <span class="diff-label">{{ diffLabel }}</span>
            </div>
          </div>
          <div class="stat-block">
            <span class="stat-label">掌握程度</span>
            <div class="mastery-display">
              <div class="mastery-track">
                <div class="mastery-fill" :style="{ width: `${node.mastery * 100}%`, background: masteryGradient }" />
              </div>
              <span class="mastery-num" :style="{ color: masteryColor }">{{ Math.round(node.mastery * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Meta info -->
        <div class="meta-grid">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            <div class="meta-text">
              <span class="meta-label">预估学时</span>
              <span class="meta-value">{{ estimatedHours }} 小时</span>
            </div>
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div class="meta-text">
              <span class="meta-label">所属星域</span>
              <span class="meta-value">{{ systemName }}</span>
            </div>
          </div>
          <div class="meta-item" v-if="relatedCount > 0">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
            <div class="meta-text">
              <span class="meta-label">同域课程</span>
              <span class="meta-value">{{ relatedCount }} 门</span>
            </div>
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
            </svg>
            <div class="meta-text">
              <span class="meta-label">学习阶段</span>
              <span class="meta-value">{{ stageLabel }}</span>
            </div>
          </div>
        </div>

        <!-- Learning Objectives -->
        <div class="section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M16 21v-2a4 4 0 00-8 0v2" />
            </svg>
            学习目标
          </div>
          <ul class="objective-list">
            <li v-for="(obj, i) in objectives" :key="i" class="objective-item">
              <span class="objective-check">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" stroke="none">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              </span>
              {{ obj }}
            </li>
          </ul>
        </div>

        <!-- Prerequisites -->
        <div class="section" v-if="node.prerequisites.length > 0">
          <div class="section-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            前置知识
          </div>
          <div class="tag-group">
            <button v-for="pid in node.prerequisites" :key="pid" class="tag prereq-tag" @click="clickTag(pid)">
              <span class="tag-dot" />{{ getNodeName(pid) }}
            </button>
          </div>
        </div>

        <!-- Next -->
        <div class="section" v-if="node.next.length > 0">
          <div class="section-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            后续延展
          </div>
          <div class="tag-group">
            <button v-for="nid in node.next" :key="nid" class="tag next-tag" @click="clickTag(nid)">
              {{ getNodeName(nid) }}<span class="tag-arrow">→</span>
            </button>
          </div>
        </div>

        <!-- Content Outline -->
        <div class="section" v-if="topicPreview.length > 0">
          <div class="section-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
            内容概要
          </div>
          <ul class="topic-list">
            <li v-for="(topic, i) in topicPreview" :key="i" class="topic-item">
              <span class="topic-bullet" :style="{ background: orbitColor }" />{{ topic }}
            </li>
          </ul>
        </div>

        <!-- Related courses in same system -->
        <div class="section" v-if="relatedNodes.length > 0">
          <div class="section-title">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
            同域课程
          </div>
          <div class="related-list">
            <button
              v-for="rn in relatedNodes"
              :key="rn.id"
              class="related-item"
              @click="clickTag(rn.id)"
            >
              <span class="related-dot" :class="dotClass(rn)" />
              <span class="related-name">{{ rn.name }}</span>
              <span class="related-pct">{{ Math.round(rn.mastery * 100) }}%</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="panel-footer">
        <button class="action-primary" @click="startLearning">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          开始探索
        </button>
        <button class="action-secondary" :class="{ mastered: node.mastery >= 0.7 }" @click="markMastered">
          <svg v-if="node.mastery < 0.7" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          {{ node.mastery >= 0.7 ? '已掌握' : '标记掌握' }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUniverseStore } from '../../stores/universe'
import { useAgentStore } from '../../stores/agent'
import { knowledgeNodes } from '../../data/knowledge-graph'

const emit = defineEmits<{
  (e: 'flyTo', nodeId: string): void
}>()

const universe = useUniverseStore()
const agentStore = useAgentStore()

const node = computed(() => universe.selectedNode)

const starRating = computed(() => Math.max(1, Math.round((node.value?.difficulty ?? 0) * 5)))

const diffLabel = computed(() => {
  if (!node.value) return ''
  const d = node.value.difficulty
  if (d < 0.2) return '入门'
  if (d < 0.4) return '基础'
  if (d < 0.6) return '进阶'
  if (d < 0.8) return '高级'
  return '专家'
})

const systemName = computed(() => {
  if (!node.value) return ''
  const m: Record<string, string> = {
    sys_prog_basics: '编程与算法基础',
    sys_computer: '计算机系统',
    sys_software: '软件工程',
    sys_ai: '人工智能',
    sys_frontier: '前沿与应用',
  }
  return m[node.value.system] ?? node.value.system
})

const systemColors: Record<string, string> = {
  sys_prog_basics: '#4A90D9',
  sys_computer: '#26A69A',
  sys_software: '#FFA726',
  sys_ai: '#AB47BC',
  sys_frontier: '#EF5350',
}

const orbitColor = computed(() => {
  if (!node.value) return '#7a97ff'
  return systemColors[node.value.system] ?? '#7a97ff'
})

const masteryColor = computed(() => {
  if (!node.value) return 'rgba(255,255,255,0.5)'
  const m = node.value.mastery
  if (m >= 0.7) return '#73f0d0'
  if (m >= 0.4) return '#ffd084'
  return '#ff95b2'
})

const masteryGradient = computed(() => {
  if (!node.value) return 'linear-gradient(90deg, #7a97ff, #72ecff)'
  const m = node.value.mastery
  if (m >= 0.7) return 'linear-gradient(90deg, #73f0d0, #4dd0a8)'
  if (m >= 0.4) return 'linear-gradient(90deg, #ffd084, #ffb347)'
  return 'linear-gradient(90deg, #ff95b2, #f06292)'
})

const bookmarked = computed(() => node.value && universe.isBookmarked(node.value.id))

const typeLabel = computed(() => {
  if (!node.value) return ''
  return node.value.type === 'knowledge' ? '知识' : node.value.type === 'project' ? '项目' : '练习'
})

const typeClass = computed(() => {
  if (!node.value) return ''
  return node.value.type === 'knowledge' ? 'type-knowledge' : node.value.type === 'project' ? 'type-project' : 'type-exercise'
})

const estimatedHours = computed(() => {
  if (!node.value) return 0
  return Math.round(node.value.difficulty * 20 + 4)
})

const stageLabel = computed(() => {
  if (!node.value) return '未开始'
  if (node.value.mastery === 0) return '未开始'
  if (node.value.mastery >= 0.7) return '已掌握'
  return '学习中'
})

/* ── Learning Objectives ── */
const objectives = computed(() => {
  if (!node.value) return []
  const list: Record<string, string[]> = {
    c_c_lang: ['掌握C语言基本语法与数据类型', '理解指针与内存管理', '能编写结构化程序', '掌握文件I/O操作'],
    c_python: ['熟练使用Python基础语法', '理解函数式与面向对象编程', '能使用标准库开发', '掌握Python高级特性'],
    c_java_oop: ['掌握OOP三大特性', '熟练使用集合框架', '能编写多线程程序', '掌握Lambda与Stream API'],
    c_cpp_oop: ['理解引用与类设计', '掌握继承与多态机制', '熟练使用STL容器与算法', '理解智能指针与移动语义'],
    c_ds: ['掌握线性表与树结构', '理解图与散列表原理', '能分析算法复杂度', '能选择合适数据结构'],
    c_algorithm: ['掌握递归与分治思想', '理解动态规划原理', '能解决经典算法问题', '具备算法优化意识'],
    c_compiler: ['理解编译流程各阶段', '能实现词法语法分析器', '理解中间代码生成', '了解代码优化技术'],
    c_computer_arch: ['理解CPU指令集架构', '掌握存储器层次结构', '理解流水线技术', '了解并行计算基础'],
    c_os: ['理解进程与线程管理', '掌握内存管理机制', '理解文件系统设计', '掌握并发同步技术'],
    c_network: ['理解TCP/IP协议栈', '掌握路由交换原理', '理解应用层协议', '具备网络编程能力'],
    c_db: ['掌握关系模型与SQL', '理解索引与事务', '掌握查询优化方法', '了解NoSQL系统'],
    c_software_eng: ['理解软件工程全流程', '掌握常见设计模式', '具备项目管理意识', '了解DevOps实践'],
    c_software_test: ['掌握测试方法论', '能编写单元测试', '理解自动化测试', '了解性能测试方法'],
    c_discrete_math: ['掌握命题逻辑推理', '理解集合与关系', '掌握图论基础知识', '了解组合数学'],
    c_probability: ['掌握概率论基础', '理解随机变量分布', '掌握数理统计方法', '了解贝叶斯推断'],
    c_ai_intro: ['理解AI核心概念', '掌握搜索算法', '了解知识表示方法', '理解AI伦理问题'],
    c_ml: ['掌握监督学习方法', '理解无监督学习', '能进行模型评估', '掌握特征工程技术'],
    c_dl: ['理解神经网络原理', '掌握CNN图像处理', '理解RNN与Transformer', '了解生成模型'],
    c_nlp: ['掌握文本预处理方法', '理解词向量表示', '掌握序列标注技术', '了解机器翻译原理'],
    c_cv: ['理解图像处理基础', '掌握目标检测方法', '理解语义分割', '了解3D视觉技术'],
    c_rl: ['理解MDP与贝尔曼方程', '掌握Q-Learning', '理解策略梯度方法', '了解多智能体系统'],
    c_computer_graphics: ['理解图形管线流程', '掌握三维变换', '理解光照模型', '了解光线追踪原理'],
    c_security: ['掌握密码学基础', '理解Web安全', '掌握系统安全方法', '了解隐私保护技术'],
    c_big_data_cloud: ['理解分布式系统原理', '掌握Hadoop生态', '了解Spark计算', '掌握云原生技术'],
  }
  return list[node.value.id] ?? ['理解核心概念与原理', '掌握基本实践技能', '能解决常见问题', '具备进阶学习能力']
})

/* ── Topic previews ── */
const topicPreview = computed(() => {
  if (!node.value) return []
  const topics: Record<string, string[]> = {
    c_c_lang: ['数据类型与运算符', '流程控制结构', '函数与指针', '动态内存管理', '文件I/O操作'],
    c_python: ['基础语法与数据结构', '函数式编程', '面向对象编程', '模块与包管理', '高级特性'],
    c_java_oop: ['类与对象设计', '封装继承多态', '集合框架', '多线程编程', 'Lambda与Stream'],
    c_cpp_oop: ['引用与类设计', '继承与多态', '模板编程', 'STL容器与算法', '智能指针与移动语义'],
    c_ds: ['线性表与栈队列', '树与图', '散列表', '排序与查找', '高级数据结构'],
    c_algorithm: ['递归与分治', '动态规划', '贪心算法', '回溯与搜索', '图论算法'],
    c_compiler: ['词法分析', '语法分析', '语义分析', '中间代码生成', '代码优化与生成'],
    c_computer_arch: ['CPU结构与指令集', '存储器层次', '流水线技术', 'I/O系统', '并行计算基础'],
    c_os: ['进程管理', '内存管理', '文件系统', '设备管理', '并发与同步'],
    c_network: ['网络体系结构', 'TCP/IP协议栈', '路由与交换', '应用层协议', '网络安全基础'],
    c_db: ['关系模型与SQL', '索引与事务', '查询优化', '数据库设计', 'NoSQL系统'],
    c_software_eng: ['需求分析', '架构设计', '设计模式', '项目管理', 'DevOps实践'],
    c_software_test: ['测试方法论', '单元测试', '自动化测试', '性能测试', '持续集成'],
    c_discrete_math: ['命题逻辑', '集合与关系', '图论基础', '组合数学', '代数结构'],
    c_probability: ['概率论基础', '随机变量', '数理统计', '贝叶斯推断', '信息论基础'],
    c_ai_intro: ['AI发展史', '问题求解', '知识表示', '搜索算法', 'AI伦理'],
    c_ml: ['监督学习', '无监督学习', '模型评估', '特征工程', '集成学习'],
    c_dl: ['神经网络基础', 'CNN图像处理', 'RNN序列建模', 'Transformer架构', '生成模型'],
    c_nlp: ['文本预处理', '词向量表示', '序列标注', '文本分类', '机器翻译'],
    c_cv: ['图像处理基础', '目标检测', '语义分割', '人脸识别', '3D视觉'],
    c_rl: ['MDP与贝尔曼方程', 'Q-Learning', '策略梯度', '深度强化学习', '多智能体系统'],
    c_computer_graphics: ['图形管线', '三维变换', '光照模型', '纹理映射', '光线追踪'],
    c_security: ['密码学基础', 'Web安全', '系统安全', '网络安全', '隐私保护'],
    c_big_data_cloud: ['分布式系统', 'Hadoop生态', 'Spark计算', '云原生技术', '数据工程'],
  }
  return topics[node.value.id] ?? ['核心概念讲解', '实践案例分析', '常见问题解析', '进阶应用拓展']
})

/* ── Related nodes in same system ── */
const relatedNodes = computed(() => {
  if (!node.value) return []
  return knowledgeNodes
    .filter(n => n.system === node.value!.system && n.id !== node.value!.id)
    .slice(0, 6)
})

const relatedCount = computed(() => relatedNodes.value.length)

function dotClass(n: typeof knowledgeNodes[0]) {
  return n.type === 'knowledge' ? 'dot-knowledge' : n.type === 'project' ? 'dot-project' : 'dot-exercise'
}

function getNodeName(id: string): string {
  return knowledgeNodes.find(n => n.id === id)?.name ?? id
}

function clickTag(nodeId: string) {
  universe.selectNode(nodeId)
  agentStore.navigateTo(nodeId)
  emit('flyTo', nodeId)
}

function startLearning() {
  if (!node.value) return
  agentStore.navigateTo(node.value.id)
}

function toggleBookmark() {
  if (!node.value) return
  universe.toggleBookmark(node.value.id)
}

function markMastered() {
  if (!node.value) return
  const newVal = node.value.mastery >= 0.7 ? 0.3 : 1.0
  universe.updateMastery(node.value.id, newVal)
  agentStore.refreshRecommendation()
}
</script>

<style scoped>
.planet-panel {
  position: absolute;
  left: 16px;
  top: 100px;
  bottom: 100px;
  width: 380px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
  background:
    linear-gradient(160deg, rgba(8, 14, 36, 0.92), rgba(4, 8, 18, 0.78)),
    radial-gradient(ellipse at 20% 10%, rgba(122, 151, 255, 0.06), transparent 60%);
  border: 1px solid rgba(180, 200, 255, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(32px) saturate(150%);
  -webkit-backdrop-filter: blur(32px) saturate(150%);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.panel-orbit {
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--orbit-clr, #7a97ff), transparent);
  opacity: 0.6;
}

/* ── Header ── */
.panel-header {
  padding: 20px 24px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.badge-row { display: flex; gap: 6px; flex-wrap: wrap; }

.type-badge {
  font-size: 0.62rem; font-weight: 600; padding: 4px 12px;
  border-radius: 999px; letter-spacing: 0.06em;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.type-knowledge { background: rgba(130, 168, 255, 0.15); color: #82a8ff; border-color: rgba(130, 168, 255, 0.2); }
.type-project { background: rgba(115, 240, 208, 0.15); color: #73f0d0; border-color: rgba(115, 240, 208, 0.2); }
.type-exercise { background: rgba(255, 174, 107, 0.15); color: #ffae6b; border-color: rgba(255, 174, 107, 0.2); }

.system-badge {
  font-size: 0.58rem; font-weight: 500; padding: 4px 10px;
  border-radius: 999px; background: rgba(255, 255, 255, 0.04);
  color: rgba(200, 215, 255, 0.55); border: 1px solid rgba(255, 255, 255, 0.06);
}

.bookmark-btn {
  background: none; border: none; color: rgba(255, 255, 255, 0.3);
  cursor: pointer; padding: 6px; border-radius: 10px; transition: all 0.2s; flex-shrink: 0;
}
.bookmark-btn:hover { color: #ffd084; background: rgba(255, 208, 132, 0.1); }
.bookmark-btn.marked { color: #ffd084; }

.panel-title {
  font-family: 'Instrument Serif', serif; font-size: 1.3rem; font-weight: 600;
  color: rgba(248, 250, 255, 0.95); line-height: 1.2; margin-bottom: 3px; letter-spacing: 0.02em;
}

.panel-title-en {
  font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(180, 198, 255, 0.42); margin-bottom: 10px;
}

.panel-desc {
  font-size: 0.75rem; line-height: 1.6; color: rgba(220, 230, 255, 0.6);
}

/* ── Body (scrollable + wheel capture) ── */
.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 24px 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
}
.panel-body::-webkit-scrollbar { width: 3px; }
.panel-body::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 2px; }

/* ── Stats ── */
.stats-grid { display: grid; gap: 14px; margin-bottom: 14px; }
.stat-block { display: flex; flex-direction: column; gap: 6px; }

.stat-label {
  font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(173, 191, 255, 0.42);
}

.star-row { display: flex; align-items: center; gap: 2px; }
.star { font-size: 0.95rem; color: rgba(255, 255, 255, 0.08); line-height: 1; }
.star.filled { color: #ffd084; text-shadow: 0 0 10px rgba(255, 208, 132, 0.35); }
.diff-label { font-size: 0.6rem; color: rgba(200, 215, 255, 0.35); margin-left: 6px; }

.mastery-display { display: flex; align-items: center; gap: 10px; }
.mastery-track { flex: 1; height: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; }
.mastery-fill { height: 100%; border-radius: inherit; transition: width 0.6s ease; box-shadow: 0 0 10px rgba(108, 141, 255, 0.15); }
.mastery-num { font-size: 0.78rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; min-width: 30px; text-align: right; }

/* ── Meta Grid ── */
.meta-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  margin-bottom: 16px; padding: 12px 14px;
  background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.04);
}
.meta-item { display: flex; align-items: center; gap: 8px; }
.meta-icon { color: rgba(160, 180, 255, 0.35); flex-shrink: 0; }
.meta-text { display: flex; flex-direction: column; gap: 1px; }
.meta-label { font-size: 0.55rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(173, 191, 255, 0.38); }
.meta-value { font-size: 0.75rem; color: rgba(248, 250, 255, 0.75); }

/* ── Sections ── */
.section { margin-bottom: 16px; }

.section-title {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(173, 191, 255, 0.42); margin-bottom: 8px;
}

/* ── Objectives ── */
.objective-list { display: flex; flex-direction: column; gap: 5px; }
.objective-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.72rem; color: rgba(220, 230, 255, 0.6); line-height: 1.4;
}
.objective-check {
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  background: rgba(130, 168, 255, 0.08); color: rgba(130, 168, 255, 0.4);
}

/* ── Tags ── */
.tag-group { display: flex; flex-wrap: wrap; gap: 5px; }
.tag {
  font-size: 0.7rem; padding: 5px 10px; border-radius: 999px;
  cursor: pointer; transition: all 0.2s;
  border: 1px solid transparent; display: inline-flex; align-items: center; gap: 5px;
}
.prereq-tag { background: rgba(143, 109, 255, 0.1); color: rgba(203, 188, 255, 0.8); border-color: rgba(143, 109, 255, 0.15); }
.prereq-tag:hover { background: rgba(143, 109, 255, 0.22); color: rgba(223, 210, 255, 0.95); }
.tag-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(143, 109, 255, 0.5); }
.next-tag { background: rgba(118, 160, 255, 0.1); color: rgba(205, 223, 255, 0.8); border-color: rgba(118, 160, 255, 0.12); }
.next-tag:hover { background: rgba(118, 160, 255, 0.2); color: rgba(230, 240, 255, 0.95); }
.tag-arrow { font-size: 0.65rem; opacity: 0.35; }

/* ── Topic List ── */
.topic-list { display: flex; flex-direction: column; gap: 4px; }
.topic-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.72rem; color: rgba(220, 230, 255, 0.55); line-height: 1.4; padding: 3px 0;
}
.topic-bullet { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }

/* ── Related List ── */
.related-list { display: flex; flex-direction: column; gap: 3px; }
.related-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 10px;
  border: 1px solid transparent; background: transparent;
  cursor: pointer; transition: all 0.2s;
  text-align: left; width: 100%;
}
.related-item:hover { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.04); }

.related-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.related-name { flex: 1; font-size: 0.7rem; color: rgba(248, 250, 255, 0.65); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.related-pct { font-size: 0.6rem; font-family: 'JetBrains Mono', monospace; color: rgba(173, 191, 255, 0.35); }

/* ── Footer ── */
.panel-footer {
  padding: 12px 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex; gap: 8px; flex-shrink: 0;
}

.action-primary {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px; border: none; border-radius: 14px; cursor: pointer;
  font-size: 0.82rem; font-weight: 600; color: #fff; letter-spacing: 0.03em;
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.25), rgba(122, 151, 255, 0.08));
  border: 1px solid rgba(122, 151, 255, 0.2);
  transition: all 0.25s ease;
}
.action-primary:hover {
  background: linear-gradient(135deg, rgba(122, 151, 255, 0.35), rgba(122, 151, 255, 0.15));
  border-color: rgba(122, 151, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(122, 151, 255, 0.15);
}

.action-secondary {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 11px 16px; border-radius: 14px; cursor: pointer;
  font-size: 0.72rem; font-weight: 500; white-space: nowrap;
  color: rgba(239, 244, 255, 0.6);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s;
}
.action-secondary:hover { border-color: rgba(255, 255, 255, 0.18); color: rgba(255, 255, 255, 0.85); }
.action-secondary.mastered { color: #73f0d0; border-color: rgba(115, 240, 208, 0.2); background: rgba(115, 240, 208, 0.06); }

/* ── Transitions ── */
.panel-slide-enter-active, .panel-slide-leave-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.panel-slide-enter-from, .panel-slide-leave-to { opacity: 0; transform: translateX(-24px) scale(0.97); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .planet-panel { left: 0; right: 0; top: auto; bottom: 0; width: 100%; height: 60vh; border-radius: 24px 24px 0 0; }
  .panel-header { padding: 16px 20px 12px; }
  .panel-body { padding: 12px 20px 2px; }
  .panel-footer { padding: 10px 20px 14px; }
}
</style>
