<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Concept { name: string; m: number }
interface SubTopic { id: string; name: string; m: number; concepts: Concept[]; focused?: boolean; recommended?: boolean }
interface Domain { id: string; name: string; color: string; en: string; sub: SubTopic[] }

const PALETTE = {
  cyan: '#00d4ff', blue: '#3b82f6', purple: '#7c3aed',
  emerald: '#06d6a0', amber: '#f59e0b', rose: '#f43f5e',
  text: '#e8edf5', textSub: '#8892b0', textTri: '#4a5568',
}

const DATA: Domain[] = [
  {
    id: 'math', name: '数学基础', color: PALETTE.cyan, en: 'Mathematics',
    sub: [
      { id: 'm1', name: '矩阵 / 线代', m: 0.95, concepts: [
        { name: '向量空间', m: 1 }, { name: '矩阵运算', m: 1 }, { name: '行列式', m: 1 },
        { name: '特征值', m: 1 }, { name: '对角化', m: 1 }, { name: '正交基', m: 0.9 },
        { name: 'SVD', m: 0.8 }, { name: '伪逆', m: 0.7 },
      ]},
      { id: 'm2', name: '微积分', m: 0.66, concepts: [
        { name: '极限', m: 1 }, { name: '导数', m: 1 }, { name: '链式法则', m: 1 },
        { name: '偏导', m: 0.7 }, { name: '梯度', m: 0.6 }, { name: '二阶导', m: 0.3 },
      ]},
      { id: 'm3', name: '概率统计', m: 0.78, concepts: [
        { name: '条件概率', m: 1 }, { name: '贝叶斯', m: 1 }, { name: '常见分布', m: 1 },
        { name: '大数定律', m: 0.8 }, { name: '极大似然', m: 0.7 }, { name: '假设检验', m: 0.5 },
        { name: '马尔可夫链', m: 0.4 },
      ]},
      { id: 'm4', name: '凸优化', m: 0.32, concepts: [
        { name: '凸集', m: 0.6 }, { name: '凸函数', m: 0.5 }, { name: '梯度下降', m: 0.4 },
        { name: '拉格朗日', m: 0.2 }, { name: 'KKT 条件', m: 0 },
      ]},
    ],
  },
  {
    id: 'algo', name: '算法 & 数据', color: PALETTE.amber, en: 'Algorithms',
    sub: [
      { id: 'a1', name: '数据结构', m: 0.88, concepts: [
        { name: '数组', m: 1 }, { name: '链表', m: 1 }, { name: '栈与队列', m: 1 },
        { name: '哈希表', m: 1 }, { name: '堆', m: 0.9 }, { name: '树', m: 0.8 },
        { name: '图', m: 0.7 }, { name: '并查集', m: 0.7 }, { name: '字典树', m: 0.7 },
      ]},
      { id: 'a2', name: '排序 / 查找', m: 0.92, concepts: [
        { name: '快排', m: 1 }, { name: '归并', m: 1 }, { name: '堆排序', m: 1 },
        { name: '二分查找', m: 1 }, { name: 'BFS/DFS', m: 0.8 }, { name: '拓扑排序', m: 0.6 },
      ]},
      { id: 'a3', name: '图算法', m: 0.42, concepts: [
        { name: '最短路', m: 0.8 }, { name: '最小生成树', m: 0.5 }, { name: '强连通分量', m: 0.4 },
        { name: '网络流', m: 0.2 }, { name: '匹配', m: 0.2 }, { name: '欧拉图', m: 0.4 },
        { name: '哈密顿', m: 0 },
      ]},
      { id: 'a4', name: '动态规划', m: 0.30, recommended: true, concepts: [
        { name: '一维 DP', m: 0.8 }, { name: '二维 DP', m: 0.5 }, { name: '区间 DP', m: 0.3 },
        { name: '状态压缩', m: 0.1 }, { name: '树形 DP', m: 0.1 }, { name: '数位 DP', m: 0 },
        { name: '记忆化', m: 0.4 }, { name: '滚动数组', m: 0.3 },
      ]},
    ],
  },
  {
    id: 'eng', name: '工程实践', color: PALETTE.blue, en: 'Engineering',
    sub: [
      { id: 'e1', name: 'Python 工程', m: 0.72, concepts: [
        { name: '虚拟环境', m: 1 }, { name: '包管理', m: 1 }, { name: '类型注解', m: 0.7 },
        { name: '装饰器', m: 0.6 }, { name: '异步编程', m: 0.4 }, { name: '性能调优', m: 0.5 },
      ]},
      { id: 'e2', name: 'Git / 协作', m: 0.85, concepts: [
        { name: '基础流程', m: 1 }, { name: '分支策略', m: 1 }, { name: 'Rebase', m: 0.8 },
        { name: 'Cherry-pick', m: 0.6 },
      ]},
      { id: 'e3', name: '模型部署', m: 0.30, concepts: [
        { name: '模型导出', m: 0.7 }, { name: 'Docker', m: 0.3 }, { name: 'REST API', m: 0.4 },
        { name: 'ONNX', m: 0.1 }, { name: '量化压缩', m: 0 }, { name: '监控', m: 0.3 },
      ]},
      { id: 'e4', name: 'CI / CD', m: 0.18, concepts: [
        { name: 'GitHub Actions', m: 0.4 }, { name: '测试自动化', m: 0.2 },
        { name: '部署流水线', m: 0.1 }, { name: '回滚', m: 0 }, { name: '蓝绿部署', m: 0 },
      ]},
    ],
  },
  {
    id: 'nlp', name: 'NLP 应用', color: PALETTE.rose, en: 'NLP & Apps',
    sub: [
      { id: 'n1', name: '词嵌入', m: 0.40, concepts: [
        { name: 'One-hot', m: 1 }, { name: 'Word2Vec', m: 0.6 }, { name: 'GloVe', m: 0.3 },
        { name: 'FastText', m: 0.2 }, { name: '上下文嵌入', m: 0.1 },
      ]},
      { id: 'n2', name: 'LLM 基础', m: 0.18, concepts: [
        { name: 'Token 化', m: 0.5 }, { name: 'Embedding', m: 0.3 }, { name: '上下文窗口', m: 0.2 },
        { name: '采样策略', m: 0.1 }, { name: 'Prompt 设计', m: 0.2 }, { name: '推理优化', m: 0 },
        { name: 'KV Cache', m: 0 },
      ]},
      { id: 'n3', name: '检索增强', m: 0.12, concepts: [
        { name: '向量检索', m: 0.3 }, { name: 'Chunking', m: 0.2 }, { name: 'Reranking', m: 0 },
        { name: '多轮 RAG', m: 0 },
      ]},
      { id: 'n4', name: '微调对齐', m: 0.05, concepts: [
        { name: 'SFT', m: 0.1 }, { name: 'LoRA', m: 0.1 }, { name: 'RLHF', m: 0 },
        { name: 'DPO', m: 0 }, { name: 'PPO', m: 0 }, { name: '数据构造', m: 0.1 },
      ]},
    ],
  },
  {
    id: 'dl', name: '深度学习', color: PALETTE.emerald, en: 'Deep Learning',
    sub: [
      { id: 'd1', name: '神经网络', m: 0.58, concepts: [
        { name: '感知机', m: 1 }, { name: 'MLP', m: 0.9 }, { name: '反向传播', m: 0.6 },
        { name: '激活函数', m: 0.7 }, { name: '损失函数', m: 0.5 }, { name: '初始化', m: 0.3 },
      ]},
      { id: 'd2', name: 'CNN', m: 0.32, focused: true, concepts: [
        { name: '卷积运算', m: 1 }, { name: '池化', m: 1 }, { name: '感受野', m: 0.4 },
        { name: '经典架构', m: 0 }, { name: '迁移学习', m: 0 },
      ]},
      { id: 'd3', name: 'RNN / 序列', m: 0.22, concepts: [
        { name: 'RNN 基础', m: 0.5 }, { name: 'LSTM', m: 0.3 }, { name: 'GRU', m: 0.2 },
        { name: '序列到序列', m: 0.1 }, { name: '注意力', m: 0.2 }, { name: '梯度消失', m: 0.2 },
      ]},
      { id: 'd4', name: 'Transformer', m: 0.12, concepts: [
        { name: 'Self-Attention', m: 0.3 }, { name: 'Multi-Head', m: 0.1 },
        { name: 'Positional Enc.', m: 0.2 }, { name: 'Encoder', m: 0.1 }, { name: 'Decoder', m: 0 },
        { name: 'Layer Norm', m: 0.2 }, { name: 'FFN', m: 0.1 },
      ]},
    ],
  },
  {
    id: 'ml', name: '机器学习', color: PALETTE.purple, en: 'Machine Learning',
    sub: [
      { id: 'l1', name: '监督学习', m: 0.85, concepts: [
        { name: '线性回归', m: 1 }, { name: '逻辑回归', m: 1 }, { name: 'KNN', m: 1 },
        { name: 'SVM', m: 0.8 }, { name: '朴素贝叶斯', m: 0.7 }, { name: '感知机', m: 0.8 },
        { name: '决策树', m: 0.8 }, { name: '正则化', m: 0.8 },
      ]},
      { id: 'l2', name: '无监督', m: 0.62, concepts: [
        { name: 'K-Means', m: 1 }, { name: '层次聚类', m: 0.7 }, { name: 'DBSCAN', m: 0.5 },
        { name: 'PCA', m: 0.8 }, { name: 'tSNE', m: 0.4 }, { name: 'GMM', m: 0.3 },
      ]},
      { id: 'l3', name: '集成方法', m: 0.55, concepts: [
        { name: 'Bagging', m: 0.7 }, { name: '随机森林', m: 0.8 }, { name: 'Boosting', m: 0.6 },
        { name: 'XGBoost', m: 0.5 }, { name: 'LightGBM', m: 0.3 }, { name: 'Stacking', m: 0.3 },
        { name: 'AdaBoost', m: 0.5 },
      ]},
      { id: 'l4', name: '模型评估', m: 0.48, concepts: [
        { name: '准确率', m: 1 }, { name: '精确召回', m: 0.7 }, { name: 'ROC / AUC', m: 0.5 },
        { name: '交叉验证', m: 0.4 }, { name: '混淆矩阵', m: 0.6 },
      ]},
    ],
  },
]

const RING = { centerR: 92, domainIn: 104, domainOut: 226, subIn: 240, subOut: 358, dotsR: 384 }
const STAGE_W = 1920
const STAGE_H = 1080

// --- Geometry ---
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number) {
  const p1 = polar(cx, cy, rOut, a0), p2 = polar(cx, cy, rOut, a1)
  const p3 = polar(cx, cy, rIn, a1), p4 = polar(cx, cy, rIn, a0)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
}

function hexA(hex: string, a: number) {
  return hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0')
}

// --- Stars (deterministic) ---
const STARS = (() => {
  const out: { x: number; y: number; r: number; o: number; tw: boolean; d: number }[] = []
  let s = 47
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 200; i++) {
    out.push({ x: rand() * STAGE_W, y: rand() * STAGE_H, r: 0.3 + rand() * 1.6, o: 0.08 + rand() * 0.5, tw: rand() < 0.3, d: rand() * 4 })
  }
  return out
})()

// --- Segments ---
const domainSpan = 360 / DATA.length

interface SegDomain { d: Domain; di: number; a0: number; a1: number; m: number }
interface SegSub { d: Domain; di: number; sub: SubTopic; si: number; a0: number; a1: number; key: string }

const domainSegs: SegDomain[] = DATA.map((d, di) => {
  const a0 = di * domainSpan, a1 = (di + 1) * domainSpan
  const m = d.sub.reduce((s, x) => s + x.m, 0) / d.sub.length
  return { d, di, a0, a1, m }
})

const subSegs: SegSub[] = DATA.flatMap((d, di) =>
  d.sub.map((sub, si) => {
    const span = domainSpan / d.sub.length
    const a0 = di * domainSpan + si * span
    const a1 = di * domainSpan + (si + 1) * span
    return { d, di, sub, si, a0, a1, key: sub.id }
  })
)

// --- State ---
const hoverSub = ref<SegSub | null>(null)

const focusedSub = ref<SegSub | null>(null)
const mouse = ref({ x: 0, y: 0 })

const focusedDomainId = computed(() => focusedSub.value?.d.id ?? hoverSub.value?.d.id ?? null)
const focusedSubId = computed(() => focusedSub.value?.sub.id ?? hoverSub.value?.sub.id ?? null)
const isAnyFocused = computed(() => !!focusedDomainId.value)

// --- Animated counter ---
const allConcepts = DATA.flatMap(d => d.sub.flatMap(s => s.concepts))
const totalMastery = allConcepts.reduce((s, c) => s + c.m, 0) / allConcepts.length
const animVal = ref(focusedSub.value ? focusedSub.value.sub.m * 100 : totalMastery * 100)
let animRaf = 0

function animateTo(target: number) {
  const start = animVal.value
  const t0 = performance.now()
  const dur = 700
  cancelAnimationFrame(animRaf)
  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / dur)
    const ease = 1 - Math.pow(1 - t, 3)
    animVal.value = start + (target - start) * ease
    if (t < 1) animRaf = requestAnimationFrame(tick)
  }
  animRaf = requestAnimationFrame(tick)
}

const centerPercent = computed(() => Math.round(animVal.value))

watch(focusedSub, () => {
  const target = focusedSub.value ? focusedSub.value.sub.m * 100 : totalMastery * 100
  animateTo(target)
}, { immediate: true })

// --- Mouse ---
function onMove(e: MouseEvent) { mouse.value = { x: e.clientX, y: e.clientY } }
onMounted(() => window.addEventListener('mousemove', onMove))
onUnmounted(() => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animRaf) })

function onSubHover(seg: SegSub | null) { hoverSub.value = seg }
function onSubClick(seg: SegSub) {
  if (focusedSub.value && focusedSub.value.sub.id === seg.sub.id) focusedSub.value = null
  else focusedSub.value = seg
}
function closeDetail() { focusedSub.value = null }

// --- Derived ---
const subCount = DATA.reduce((s, d) => s + d.sub.length, 0)
const conceptCount = allConcepts.length
const weakest = [...DATA].sort((a, b) => {
  const am = a.sub.reduce((s, x) => s + x.m, 0) / a.sub.length
  const bm = b.sub.reduce((s, x) => s + x.m, 0) / b.sub.length
  return am - bm
})[0]
const weakestM = weakest.sub.reduce((s, x) => s + x.m, 0) / weakest.sub.length
const masteredCount = computed(() => {
  if (!focusedSub.value) return allConcepts.filter(c => c.m >= 0.9).length
  return focusedSub.value.sub.concepts.filter(c => c.m >= 0.9).length
})
const inProgressCount = computed(() => {
  if (!focusedSub.value) return allConcepts.filter(c => c.m > 0 && c.m < 0.9).length
  return focusedSub.value.sub.concepts.filter(c => c.m > 0 && c.m < 0.9).length
})
</script>

<template>
  <div class="sunburst-wrap" @mousemove="onMove">
    <!-- Stats strip -->
    <div class="sb-stats">
      <div class="sb-stat-card">
        <div class="sb-stat-label">已点亮</div>
        <div class="sb-stat-val"><span class="sb-stat-num">{{ masteredCount }}</span><span class="sb-stat-sub"> / {{ conceptCount }}</span></div>
      </div>
      <div class="sb-stat-card">
        <div class="sb-stat-label">进行中</div>
        <div class="sb-stat-val"><span class="sb-stat-num" style="color:var(--color-accent-cyan)">{{ inProgressCount }}</span><span class="sb-stat-sub"> 个</span></div>
      </div>
      <div class="sb-stat-card sb-stat-wide">
        <div class="sb-stat-label">薄弱方向</div>
        <div class="sb-stat-val"><span class="sb-stat-num" style="color:var(--color-accent-rose)">{{ weakest.name }}</span><span class="sb-stat-sub"> {{ Math.round(weakestM * 100) }}%</span></div>
      </div>
    </div>

    <!-- Legend -->
    <div class="sb-legend">
      <div class="sb-legend-title">RINGS &middot; 由内向外</div>
      <div v-for="(r, i) in [
        { label: '我的整体掌握度', color: PALETTE.purple, info: '中心总览' },
        { label: '6 个学科领域', color: PALETTE.cyan, info: '内环 / 大方向' },
        { label: '24 个子方向', color: PALETTE.emerald, info: '外环 / 主题' },
        { label: '134 个知识点', color: PALETTE.amber, info: '外缘 / 光点' },
      ]" :key="i" class="sb-legend-row">
        <span class="sb-legend-dot" :style="{ background: hexA(r.color, 0.18), borderColor: r.color, color: r.color }">{{ i }}</span>
        <span class="sb-legend-label">{{ r.label }}</span>
        <span class="sb-legend-info">{{ r.info }}</span>
      </div>
    </div>

    <!-- Hint -->
    <div class="sb-hint" :style="{ opacity: focusedSub ? 0 : 0.7 }">
      <span class="sb-hint-dot"></span>
      HOVER &middot; CLICK 任意扇区
    </div>

    <!-- SVG Stage -->
    <svg class="sb-svg" :viewBox="`0 0 ${STAGE_W} ${STAGE_H}`" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="sb-cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="PALETTE.purple" stop-opacity="0.5" />
          <stop offset="50%" :stop-color="PALETTE.purple" stop-opacity="0.18" />
          <stop offset="100%" :stop-color="PALETTE.purple" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="sb-cd" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1a1638" />
          <stop offset="60%" stop-color="#0c0c1a" />
          <stop offset="100%" stop-color="#07070d" />
        </radialGradient>
        <filter id="sb-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="sb-blur-md" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <!-- Stars -->
      <g>
        <circle v-for="(s, i) in STARS" :key="'s'+i" :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o"
          :class="s.tw ? 'sb-twinkle' : undefined" :style="s.tw ? { animationDelay: `${s.d}s` } : undefined" />
      </g>

      <!-- Center halo -->
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.dotsR + 50" fill="url(#sb-cg)" opacity="0.55" />

      <!-- Guide rings -->
      <circle v-for="r in [RING.domainIn, RING.domainOut, RING.subIn, RING.subOut, RING.dotsR]" :key="'g'+r"
        :cx="STAGE_W/2" :cy="STAGE_H/2" :r="r" fill="none" stroke="#fff" :stroke-opacity="0.04" stroke-width="1" />

      <!-- Rotating sheen -->
      <g class="sb-orbit-slow">
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.dotsR + 4" fill="none" :stroke="PALETTE.cyan" :stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="2 240" />
      </g>
      <g class="sb-orbit-slow-rev">
        <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.subOut + 8" fill="none" :stroke="PALETTE.purple" :stroke-opacity="0.4" stroke-width="1" stroke-dasharray="1 320" />
      </g>

      <!-- Domain ring -->
      <g v-for="seg in domainSegs" :key="'dom-'+seg.d.id" :style="{ opacity: isAnyFocused && focusedDomainId !== seg.d.id ? 0.3 : 1, transition: 'opacity 0.35s ease' }">
        <path :d="arcPath(STAGE_W/2, STAGE_H/2, RING.domainIn, RING.domainOut, seg.a0 + 0.5, seg.a1 - 0.5)"
          :fill="hexA(seg.d.color, 0.08)" :stroke="hexA(seg.d.color, focusedDomainId === seg.d.id ? 0.6 : 0.3)" :stroke-width="focusedDomainId === seg.d.id ? 1.5 : 0.8" />
        <path :d="arcPath(STAGE_W/2, STAGE_H/2, RING.domainIn, RING.domainIn + (RING.domainOut - RING.domainIn) * seg.m, seg.a0 + 0.5, seg.a1 - 0.5)"
          :fill="hexA(seg.d.color, 0.42)" :filter="focusedDomainId === seg.d.id ? 'url(#sb-blur)' : undefined" />
      </g>

      <!-- Sub-topic ring -->
      <g v-for="seg in subSegs" :key="'sub-'+seg.key"
        @mouseenter="onSubHover(seg)" @mouseleave="onSubHover(null)" @click="onSubClick(seg)"
        :style="{ cursor: 'pointer', opacity: isAnyFocused && focusedDomainId !== seg.d.id && focusedSubId !== seg.sub.id ? 0.22 : 1, transition: 'opacity 0.3s ease' }">
        <path :d="arcPath(STAGE_W/2, STAGE_H/2, RING.subIn - (focusedSubId === seg.sub.id ? 4 : 0), RING.subOut + (focusedSubId === seg.sub.id ? 8 : 0), seg.a0 + 0.25, seg.a1 - 0.25)"
          :fill="hexA(seg.d.color, 0.04)" :stroke="seg.sub.recommended || focusedSubId === seg.sub.id ? seg.d.color : hexA(seg.d.color, 0.22)" :stroke-width="focusedSubId === seg.sub.id ? 2 : seg.sub.recommended ? 1.5 : 0.6"
          style="transition: all 0.2s ease" />
        <path :d="arcPath(STAGE_W/2, STAGE_H/2, RING.subIn - (focusedSubId === seg.sub.id ? 4 : 0), RING.subIn - (focusedSubId === seg.sub.id ? 4 : 0) + (RING.subOut + (focusedSubId === seg.sub.id ? 8 : 0) - (RING.subIn - (focusedSubId === seg.sub.id ? 4 : 0))) * seg.sub.m, seg.a0 + 0.25, seg.a1 - 0.25)"
          :fill="hexA(seg.d.color, 0.55 + seg.sub.m * 0.35)" :filter="seg.sub.m > 0.5 || focusedSubId === seg.sub.id ? 'url(#sb-blur)' : undefined" />
        <path v-if="focusedSubId === seg.sub.id" :d="arcPath(STAGE_W/2, STAGE_H/2, RING.subIn - 4, RING.subOut + 8, seg.a0 + 0.25, seg.a1 - 0.25)" :fill="hexA('#ffffff', 0.06)" />
        <path v-if="seg.sub.recommended" :d="arcPath(STAGE_W/2, STAGE_H/2, RING.subIn - 4, RING.subOut + 4, seg.a0 + 0.25, seg.a1 - 0.25)"
          fill="none" :stroke="seg.d.color" stroke-width="1.5" class="sb-pulse-soft" />
      </g>

      <!-- Concept dots -->
      <template v-for="(seg, segIdx) in subSegs" :key="'dots-'+seg.key">
        <g v-for="(c, j) in seg.sub.concepts" :key="seg.key+'-'+j"
          :style="{ opacity: isAnyFocused && focusedDomainId !== seg.d.id && focusedSubId !== seg.sub.id ? 0.18 : 1, transition: 'opacity 0.3s ease' }">
          <circle v-if="c.m >= 0.5" :cx="polar(STAGE_W/2, STAGE_H/2, RING.dotsR, seg.a0 + 0.4 + ((seg.a1 - seg.a0 - 0.8) * (j + 0.5)) / seg.sub.concepts.length).x"
            :cy="polar(STAGE_W/2, STAGE_H/2, RING.dotsR, seg.a0 + 0.4 + ((seg.a1 - seg.a0 - 0.8) * (j + 0.5)) / seg.sub.concepts.length).y"
            r="6" :fill="seg.d.color" opacity="0.3" filter="url(#sb-blur)" />
          <circle :cx="polar(STAGE_W/2, STAGE_H/2, RING.dotsR, seg.a0 + 0.4 + ((seg.a1 - seg.a0 - 0.8) * (j + 0.5)) / seg.sub.concepts.length).x"
            :cy="polar(STAGE_W/2, STAGE_H/2, RING.dotsR, seg.a0 + 0.4 + ((seg.a1 - seg.a0 - 0.8) * (j + 0.5)) / seg.sub.concepts.length).y"
            :r="focusedSubId === seg.sub.id ? (c.m >= 0.5 ? 3.4 : 2.4) : (c.m >= 0.5 ? 2.6 : 1.6)"
            :fill="c.m >= 0.5 ? seg.d.color : (c.m > 0 ? hexA(seg.d.color, 0.5) : '#fff')"
            :opacity="c.m >= 0.5 ? 1 : (c.m > 0 ? 1 : 0.2)"
            :class="c.m >= 0.5 ? 'sb-twinkle' : undefined"
            :style="c.m >= 0.5 ? { animationDelay: `${(segIdx * 0.1 + j * 0.13) % 2.4}s` } : undefined" />
        </g>
      </template>

      <!-- Beam -->
      <g v-if="focusedSub" key="beam">
        <line :x1="polar(STAGE_W/2, STAGE_H/2, RING.centerR, (focusedSub.a0 + focusedSub.a1) / 2).x"
          :y1="polar(STAGE_W/2, STAGE_H/2, RING.centerR, (focusedSub.a0 + focusedSub.a1) / 2).y"
          :x2="polar(STAGE_W/2, STAGE_H/2, RING.subOut, (focusedSub.a0 + focusedSub.a1) / 2).x"
          :y2="polar(STAGE_W/2, STAGE_H/2, RING.subOut, (focusedSub.a0 + focusedSub.a1) / 2).y"
          :stroke="focusedSub.d.color" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="3 6" class="sb-shimmer" />
        <circle :cx="polar(STAGE_W/2, STAGE_H/2, RING.centerR, (focusedSub.a0 + focusedSub.a1) / 2).x"
          :cy="polar(STAGE_W/2, STAGE_H/2, RING.centerR, (focusedSub.a0 + focusedSub.a1) / 2).y"
          r="3" :fill="focusedSub.d.color" filter="url(#sb-blur)" />
      </g>

      <!-- Flow particles -->
      <g class="sb-flow-orbit">
        <circle v-for="i in 5" :key="'fp'+i" :cx="polar(STAGE_W/2, STAGE_H/2, RING.subOut + 14, i * 72).x" :cy="polar(STAGE_W/2, STAGE_H/2, RING.subOut + 14, i * 72).y" r="2" :fill="PALETTE.cyan" opacity="0.65" filter="url(#sb-blur)" />
      </g>

      <!-- Center disc ring -->
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.centerR + 14" fill="none" :stroke="hexA(PALETTE.purple, 0.18)" stroke-width="1" stroke-dasharray="2 4" class="sb-orbit-med" />
      <circle :cx="STAGE_W/2" :cy="STAGE_H/2" :r="RING.centerR" fill="url(#sb-cd)" :stroke="hexA(PALETTE.purple, 0.5)" stroke-width="1.5" />
    </svg>

    <!-- Domain labels (HTML overlay) -->
    <template v-for="d in DATA" :key="'dl-'+d.id">
      <div class="sb-domain-label" :style="{
        left: polar(STAGE_W/2, STAGE_H/2, (RING.domainIn + RING.domainOut) / 2, DATA.indexOf(d) * domainSpan + domainSpan / 2).x / STAGE_W * 100 + '%',
        top: polar(STAGE_W/2, STAGE_H/2, (RING.domainIn + RING.domainOut) / 2, DATA.indexOf(d) * domainSpan + domainSpan / 2).y / STAGE_H * 100 + '%',
        opacity: focusedDomainId && focusedDomainId !== d.id ? 0.35 : 1,
      }">
        <div class="sb-dl-name">{{ d.name }}</div>
        <div class="sb-dl-pct" :style="{ color: d.color }">{{ Math.round(d.sub.reduce((s, x) => s + x.m, 0) / d.sub.length * 100) }}%</div>
      </div>
    </template>

    <!-- Sub-topic labels -->
    <template v-for="seg in subSegs" :key="'sl-'+seg.key">
      <div v-if="polar(STAGE_W/2, STAGE_H/2, RING.dotsR + 32, (seg.a0 + seg.a1) / 2).x > 40 && polar(STAGE_W/2, STAGE_H/2, RING.dotsR + 32, (seg.a0 + seg.a1) / 2).x < STAGE_W - 40"
        class="sb-sub-label" :style="{
          left: polar(STAGE_W/2, STAGE_H/2, RING.dotsR + 32, (seg.a0 + seg.a1) / 2).x / STAGE_W * 100 + '%',
          top: polar(STAGE_W/2, STAGE_H/2, RING.dotsR + 32, (seg.a0 + seg.a1) / 2).y / STAGE_H * 100 + '%',
          opacity: focusedDomainId && focusedDomainId !== seg.d.id ? 0.32 : 1,
        }">
        <div class="sb-sl-name" :style="{ fontSize: (focusedSubId === seg.sub.id || hoverSub?.sub.id === seg.sub.id) ? '14px' : '12.5px', fontWeight: (focusedSubId === seg.sub.id || hoverSub?.sub.id === seg.sub.id) ? 600 : 500, color: focusedSubId === seg.sub.id ? seg.d.color : (seg.sub.m > 0.5 ? PALETTE.text : PALETTE.textSub) }">{{ seg.sub.name }}</div>
        <div class="sb-sl-pct" :style="{ color: seg.d.color }">{{ Math.round(seg.sub.m * 100) }}%</div>
      </div>
    </template>

    <!-- Center label -->
    <div class="sb-center">
      <div class="sb-center-sub">{{ focusedSub ? 'FOCUSED &middot; 此项' : 'MY KNOWLEDGE' }}</div>
      <div class="sb-center-pct">{{ centerPercent }}<span class="sb-center-pct-unit">%</span></div>
      <div class="sb-center-info">
        <template v-if="focusedSub">{{ focusedSub.sub.name }}<br />{{ focusedSub.sub.concepts.length }} 个知识点</template>
        <template v-else>{{ DATA.length }} 学科 &middot; {{ subCount }} 子方向<br />{{ conceptCount }} 知识点</template>
      </div>
    </div>

    <!-- Hover tooltip -->
    <div v-if="hoverSub && (!focusedSub || focusedSub.sub.id !== hoverSub.sub.id)" class="sb-tooltip" :style="{ left: mouse.x + 16 + 'px', top: mouse.y + 16 + 'px' }">
      <div class="sb-tt-en" :style="{ color: hoverSub.d.color }">{{ hoverSub.d.en.toUpperCase() }}</div>
      <div class="sb-tt-name">{{ hoverSub.sub.name }}</div>
      <div class="sb-tt-bar-wrap">
        <div class="sb-tt-bar-bg"><div class="sb-tt-bar" :style="{ width: hoverSub.sub.m * 100 + '%', background: hoverSub.d.color }"></div></div>
        <span class="sb-tt-pct" :style="{ color: hoverSub.d.color }">{{ Math.round(hoverSub.sub.m * 100) }}%</span>
      </div>
      <div class="sb-tt-hint">{{ hoverSub.sub.concepts.length }} 知识点 &middot; 点击查看详情</div>
    </div>

    <!-- Detail panel -->
    <transition name="sb-slide">
      <div v-if="focusedSub" class="sb-detail">
        <div class="sb-detail-header">
          <span class="sb-detail-tag" :style="{ color: focusedSub.d.color, background: hexA(focusedSub.d.color, 0.1), borderColor: hexA(focusedSub.d.color, 0.25) }">
            <span class="sb-detail-tag-dot" :style="{ background: focusedSub.d.color, boxShadow: `0 0 6px ${focusedSub.d.color}` }"></span>
            {{ focusedSub.d.en.toUpperCase() }}
          </span>
          <button class="sb-detail-close" @click="closeDetail">&times;</button>
        </div>
        <div class="sb-detail-title">{{ focusedSub.sub.name }}</div>
        <div class="sb-detail-sub">{{ focusedSub.d.name }} &middot; {{ focusedSub.sub.concepts.length }} 个具体知识点</div>

        <div class="sb-detail-mastery">
          <div class="sb-detail-mastery-head">
            <span class="sb-detail-mastery-label">掌握度</span>
            <span class="sb-detail-mastery-val" :style="{ color: focusedSub.d.color }">{{ Math.round(focusedSub.sub.m * 100) }}%</span>
          </div>
          <div class="sb-detail-mastery-bar-bg">
            <div class="sb-detail-mastery-bar" :style="{ width: focusedSub.sub.m * 100 + '%', background: `linear-gradient(90deg, ${focusedSub.d.color}, ${PALETTE.cyan})`, boxShadow: `0 0 12px ${focusedSub.d.color}88` }"></div>
          </div>
        </div>

        <div class="sb-detail-stats">
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" style="color:#06d6a0">{{ focusedSub.sub.concepts.filter(c => c.m >= 0.9).length }}</div>
            <div class="sb-detail-stat-label">已精通</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" :style="{ color: focusedSub.d.color }">{{ focusedSub.sub.concepts.filter(c => c.m > 0 && c.m < 0.9).length }}</div>
            <div class="sb-detail-stat-label">进行中</div>
          </div>
          <div class="sb-detail-stat">
            <div class="sb-detail-stat-val" style="color:var(--color-text-secondary)">{{ focusedSub.sub.concepts.filter(c => c.m === 0).length }}</div>
            <div class="sb-detail-stat-label">未触及</div>
          </div>
        </div>

        <div class="sb-detail-concepts-title">CONCEPTS &middot; 知识点</div>
        <div class="sb-detail-concepts">
          <div v-for="(c, i) in focusedSub.sub.concepts" :key="i" class="sb-detail-concept" :class="c.m >= 0.9 ? 'done' : c.m > 0 ? 'partial' : 'todo'"
            :style="{ animationDelay: `${i * 0.04}s` }">
            <div class="sb-dc-dot" :class="c.m >= 0.9 ? 'done' : c.m > 0 ? 'partial' : 'todo'" :style="c.m >= 0.9 ? { background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' } : c.m > 0 ? { background: focusedSub.d.color } : {}"></div>
            <span class="sb-dc-name" :class="{ 'sb-dc-todo': c.m === 0, 'sb-dc-done': c.m >= 0.9 }">{{ c.name }}</span>
            <span class="sb-dc-pct" :style="{ color: c.m >= 0.9 ? '#06d6a0' : c.m > 0 ? focusedSub.d.color : PALETTE.textTri }">{{ c.m === 0 ? '&mdash;' : Math.round(c.m * 100) + '%' }}</span>
          </div>
        </div>

        <button class="sb-detail-btn" :style="{ background: `linear-gradient(135deg, ${focusedSub.d.color}, ${PALETTE.purple})`, boxShadow: `0 6px 22px ${hexA(focusedSub.d.color, 0.4)}` }">
          进入 {{ focusedSub.sub.name }} 学习 &rarr;
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.sunburst-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 80vh;
  background: radial-gradient(ellipse 1100px 800px at 50% 50%, #7c3aed1c, transparent 60%),
    radial-gradient(ellipse 1300px 900px at 15% 15%, #00d4ff0a, transparent 60%),
    radial-gradient(ellipse 1100px 800px at 85% 85%, #f43f5e08, transparent 60%),
    #07070d;
  border-radius: 18px;
  overflow: hidden;
  margin: 0 40px 40px;
}

.sb-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Animations */
@keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes shimmer-flow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -200; } }
@keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes orbit-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes float-up { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
@keyframes count-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }

.sb-twinkle { animation: twinkle 2.4s ease-in-out infinite; }
.sb-pulse-soft { animation: pulse-soft 1.8s ease-in-out infinite; }
.sb-shimmer { animation: shimmer-flow 1.6s linear infinite; }
.sb-orbit-slow { transform-origin: 960px 540px; animation: orbit-spin 80s linear infinite; }
.sb-orbit-slow-rev { transform-origin: 960px 540px; animation: orbit-spin-rev 110s linear infinite; }
.sb-orbit-med { transform-origin: 960px 540px; animation: orbit-spin 30s linear infinite; }
.sb-flow-orbit { transform-origin: 960px 540px; animation: orbit-spin 18s linear infinite; }

/* Stats strip */
.sb-stats {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 18;
  display: flex;
  gap: 12px;
  align-items: center;
  animation: float-up 0.7s ease 0.2s both;
}
.sb-stat-card {
  background: rgba(12, 12, 30, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px 18px;
  min-width: 90px;
}
.sb-stat-wide { min-width: 170px; }
.sb-stat-label { font-size: 9px; letter-spacing: 0.18em; color: #8892b0; font-family: var(--font-mono); margin-bottom: 4px; }
.sb-stat-val { display: flex; align-items: baseline; gap: 5px; }
.sb-stat-num { font-family: var(--font-display); font-size: 20px; color: #06d6a0; line-height: 1; }
.sb-stat-sub { font-size: 10px; color: #8892b0; }

/* Legend */
.sb-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 20;
  padding: 18px 24px;
  background: rgba(12, 12, 30, 0.72);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  animation: float-up 0.7s ease 0.4s both;
}
.sb-legend-title { font-size: 10px; letter-spacing: 0.22em; color: #8892b0; margin-bottom: 12px; font-family: var(--font-mono); }
.sb-legend-row { display: flex; align-items: center; gap: 10px; font-size: 12px; margin-bottom: 9px; }
.sb-legend-dot {
  width: 20px; height: 20px; border-radius: 4px;
  border: 1.5px solid;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-family: var(--font-mono); font-weight: 600;
}
.sb-legend-label { color: #e8edf5; font-weight: 500; min-width: 130px; }
.sb-legend-info { color: #8892b0; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; }

/* Hint */
.sb-hint {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 15;
  font-size: 12px;
  color: #8892b0;
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.sb-hint-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00d4ff;
  animation: pulse-soft 1.6s ease-in-out infinite;
}

/* Domain labels */
.sb-domain-label {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
  transition: opacity 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
}
.sb-dl-name { font-family: var(--font-display); font-size: 22px; color: #e8edf5; line-height: 1.05; white-space: nowrap; }
.sb-dl-pct { font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.2em; margin-top: 4px; }

/* Sub-topic labels */
.sb-sub-label {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}
.sb-sl-name { font-family: var(--font-sans, 'Outfit', sans-serif); text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9); transition: all 0.25s ease; }
.sb-sl-pct { font-size: 10px; font-family: var(--font-mono); margin-top: 2px; opacity: 0.85; }

/* Center label */
.sb-center {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  text-align: center;
  pointer-events: none;
  z-index: 5;
}
.sb-center-sub { font-size: 10px; color: #8892b0; letter-spacing: 0.28em; font-family: var(--font-mono); margin-bottom: 6px; transition: color 0.3s ease; }
.sb-center-pct {
  font-family: var(--font-display); font-size: 64px; color: #e8edf5; line-height: 1; letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  animation: count-pulse 3s ease-in-out infinite;
}
.sb-center-pct-unit { font-size: 26px; color: #8892b0; }
.sb-center-info { font-size: 12px; color: #8892b0; margin-top: 10px; line-height: 1.45; font-family: var(--font-sans, 'Outfit', sans-serif); }

/* Tooltip */
.sb-tooltip {
  position: fixed;
  pointer-events: none;
  z-index: 50;
  background: rgba(12, 12, 30, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid;
  border-radius: 10px;
  padding: 10px 14px;
  max-width: 260px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: float-up 0.18s ease;
}
.sb-tt-en { font-size: 9px; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 4px; }
.sb-tt-name { font-family: var(--font-display); font-size: 20px; color: #e8edf5; line-height: 1.1; }
.sb-tt-bar-wrap { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.sb-tt-bar-bg { flex: 1; height: 3px; background: rgba(255, 255, 255, 0.06); border-radius: 2px; overflow: hidden; }
.sb-tt-bar { height: 100%; border-radius: 2px; }
.sb-tt-pct { font-size: 11px; font-family: var(--font-mono); font-weight: 600; }
.sb-tt-hint { font-size: 10px; color: #8892b0; margin-top: 6px; }

/* Detail panel */
.sb-detail {
  position: absolute;
  top: 20px; right: 20px;
  width: 380px;
  padding: 26px;
  background: rgba(12, 12, 30, 0.78);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.5);
  z-index: 30;
  max-height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sb-slide-enter-active, .sb-slide-leave-active { transition: opacity 0.32s ease, transform 0.32s ease; }
.sb-slide-enter-from, .sb-slide-leave-to { opacity: 0; transform: translateX(12px); }

.sb-detail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.sb-detail-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-family: var(--font-mono); letter-spacing: 0.18em;
  border: 1px solid; padding: 4px 10px; border-radius: 100px;
}
.sb-detail-tag-dot { width: 6px; height: 6px; border-radius: 50%; }
.sb-detail-close {
  background: transparent; border: none; color: #8892b0;
  cursor: pointer; font-size: 20px; padding: 4px; line-height: 1;
  border-radius: 6px; transition: all 0.2s ease;
}
.sb-detail-close:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }
.sb-detail-title { font-family: var(--font-display); font-size: 32px; line-height: 1.05; margin-bottom: 6px; color: #e8edf5; letter-spacing: -0.02em; }
.sb-detail-sub { font-size: 12px; color: #8892b0; margin-bottom: 18px; line-height: 1.5; }

.sb-detail-mastery { margin-bottom: 16px; }
.sb-detail-mastery-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.sb-detail-mastery-label { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); }
.sb-detail-mastery-val { font-family: var(--font-mono); font-size: 18px; font-weight: 600; }
.sb-detail-mastery-bar-bg { height: 5px; background: rgba(255, 255, 255, 0.06); border-radius: 3px; overflow: hidden; }
.sb-detail-mastery-bar { height: 100%; border-radius: 3px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

.sb-detail-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.sb-detail-stat { padding: 10px 12px; background: rgba(255, 255, 255, 0.025); border-radius: 10px; text-align: center; }
.sb-detail-stat-val { font-family: var(--font-display); font-size: 24px; line-height: 1; }
.sb-detail-stat-label { font-size: 10px; color: #8892b0; margin-top: 4px; letter-spacing: 0.06em; }

.sb-detail-concepts-title { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 10px; }
.sb-detail-concepts { display: flex; flex-direction: column; gap: 5px; overflow-y: auto; flex: 1; min-height: 0; }
.sb-detail-concept {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 11px; border-radius: 8px;
  animation: float-up 0.4s ease both;
}
.sb-detail-concept.done { background: #06d6a010; border: 1px solid #06d6a033; }
.sb-detail-concept.partial { border: 1px solid; }
.sb-detail-concept.todo { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); }
.sb-dc-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.sb-dc-dot.todo { background: transparent; border: 1.5px solid #4a5568; }
.sb-dc-name { flex: 1; font-size: 13px; color: #e8edf5; }
.sb-dc-todo { color: #8892b0; }
.sb-dc-done { text-decoration: line-through; text-decoration-color: #4a5568; }
.sb-dc-pct { font-size: 10px; font-family: var(--font-mono); }

.sb-detail-btn {
  margin-top: 16px; width: 100%; flex-shrink: 0;
  color: #fff; border: none; border-radius: 10px;
  padding: 12px 16px; font-size: 13px; font-weight: 600;
  font-family: var(--font-sans, 'Outfit', sans-serif);
  cursor: pointer; letter-spacing: 0.02em;
}
</style>
