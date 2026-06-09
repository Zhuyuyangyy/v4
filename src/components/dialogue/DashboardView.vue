<template>
  <section class="dash">
    <!-- ===== 顶部：评分 + 身份一句话 ===== -->
    <header class="dash-hero">
      <div class="dash-hero-inner">
        <div class="hero-score-block">
          <span class="hero-score">{{ report?.score ?? '—' }}</span>
          <span class="hero-score-unit">/ 100</span>
        </div>
        <div class="hero-right">
          <h1 class="hero-title">{{ report?.evaluation || '数据采集中' }}</h1>
          <p class="hero-sub">学生 · 计算机/AI · 初学者 · 兴趣驱动</p>
          <div class="hero-collect">
            <div class="collect-bar"><div class="collect-fill" :style="{ width: collectedPct + '%' }" /></div>
            <span class="collect-text">{{ collectedCount }}/9 维已采集</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ===== 关键洞察（大字引用） ===== -->
    <section class="dash-insight">
      <div class="insight-grid">
        <div class="insight-big">
          <span class="insight-num">90</span>
          <span class="insight-label">学习速度</span>
          <span class="insight-note">+5 较上次</span>
        </div>
        <div class="insight-big">
          <span class="insight-num">65</span>
          <span class="insight-label">专注力</span>
          <span class="insight-note">-4 需关注</span>
        </div>
        <div class="insight-text">
          <p class="insight-quote">{{ weaknesses[0] || '暂无诊断数据' }}</p>
          <span class="insight-from">诊断建议</span>
        </div>
      </div>
    </section>

    <!-- ===== 能力维度（雷达图） ===== -->
    <section class="dash-section">
      <div class="section-inner">
        <h2 class="sec-title">能力维度</h2>
        <div class="radar-layout">
          <RadarChart :points="radarPoints" :size="240" />
          <div class="radar-side">
            <div v-for="dim in radarData" :key="dim.name" class="radar-row">
              <span class="radar-name">{{ dim.name }}</span>
              <span class="radar-score">{{ dim.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 双栏：技能 + 图表 ===== -->
    <section class="dash-section">
      <div class="section-inner two-col">
        <div class="col-left">
          <h2 class="sec-title">技能标签</h2>
          <div class="skill-group">
            <div class="sg-hdr sg-core">核心实战</div>
            <div class="skill-bubbles"><span v-for="s in skills.core" :key="s" class="skill-b sb-core">{{ s }}</span></div>
          </div>
          <div class="skill-group">
            <div class="sg-hdr sg-found">理论基础</div>
            <div class="skill-bubbles"><span v-for="s in skills.foundation" :key="s" class="skill-b sb-found">{{ s }}</span></div>
          </div>
          <div class="skill-group">
            <div class="sg-hdr sg-add">拓展方向</div>
            <div class="skill-bubbles"><span v-for="s in skills.additional" :key="s" class="skill-b sb-add">{{ s }}</span></div>
          </div>
        </div>
        <div class="col-right">
          <h2 class="sec-title">近 7 天</h2>
          <div class="bar-chart-wrap">
            <div v-for="(b, i) in barData" :key="i" class="bar-group">
              <div class="bar" :class="{ 'bar-glow': b.today }" :style="{ height: b.pct + '%', background: b.cls }"><span class="bar-tip">{{ b.val }}h</span></div>
              <span class="bar-lbl" :class="{ 'bar-today': b.today }">{{ b.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 学习路线（横向时间线风格） ===== -->
    <section class="dash-section">
      <div class="section-inner">
        <h2 class="sec-title">学习路线</h2>
        <div class="timeline">
          <div v-for="m in milestones" :key="m.step" class="tl-node">
            <div class="tl-dot">{{ m.step }}</div>
            <div class="tl-content">
              <h4>{{ m.title }}</h4>
              <p>{{ m.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 成就（松散网格，无进度条） ===== -->
    <section class="dash-section">
      <div class="section-inner">
        <h2 class="sec-title">成就</h2>
        <div class="ach-grid">
          <div v-for="a in achievements" :key="a.title" class="ach-item" :class="{ locked: a.locked }">
            <component :is="a.icon" class="ach-icon" :style="{ color: a.locked ? 'var(--text-dim)' : a.iconColor }" />
            <span class="ach-name">{{ a.title }}</span>
            <span class="ach-desc">{{ a.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 学习热力图（单月） ===== -->
    <section class="dash-section dash-section-heatmap">
      <div class="section-inner">
        <div class="hm-top">
          <h2 class="sec-title">学习记录</h2>
          <div class="hm-summary">
            <span>42 天</span>
            <span>连续 7 天</span>
            <span>日均 4.2h</span>
          </div>
        </div>
        <div class="hm-month-nav">
          <button class="hm-month-btn" :class="{ active: hmMonth === i }" v-for="i in 5" :key="i" @click="hmMonth = i">{{ i }}月</button>
        </div>
        <div class="hm-month-grid">
          <div v-for="week in monthWeeks" :key="week.label" class="hm-week-row">
            <span class="hm-week-label">{{ week.label }}</span>
            <div class="hm-week-cells">
              <div v-for="cell in week.days" :key="cell.key" class="hm-cell"
                :class="{ empty: !cell.inMonth }"
                :style="cell.inMonth ? { background: monthHeatColor(cell.level) } : {}"
                :data-tip="cell.tip" />
            </div>
          </div>
        </div>
        <div class="hm-legend"><span>少</span><span v-for="l in heatLevels" :key="l" class="lbb" :style="{ background: l }" /><span>多</span></div>
      </div>
    </section>

    <!-- ===== 底部留白 ===== -->
    <div class="dash-foot" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  BarChart3, Award, Flame, Zap, BookOpen, Layers,
  Brain, Lightbulb, Target, Calendar,
  Sparkles, Crosshair, Moon, User,
} from 'lucide-vue-next'
import { collectedCount, report } from '@/composables/dialogue/useAppState'
import RadarChart from './RadarChart.vue'
import type { RadarPoint } from '@/types/dialogue'

// ---- helpers ----
const rng = (() => {
  let s = 42
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
})()

const heatColors = ['rgba(59, 130, 246,0.04)','rgba(59, 130, 246,0.12)','rgba(59, 130, 246,0.28)','rgba(59, 130, 246,0.48)','rgba(59, 130, 246,0.72)','#3b82f6']
const heatLevels = heatColors

// ---- month heatmap ----
const hmMonth = ref(5) // default May
const hmSeed = (() => {
  const cache = new Map<number, number>()
  return (key: number) => {
    if (!cache.has(key)) { const r = rng(); cache.set(key, r < 0.35 ? 0 : Math.min(Math.floor(r * 5) + 1, 5)) }
    return cache.get(key)!
  }
})()

function monthHeatColor(level: number) { return heatColors[level] }

const monthWeeks = computed(() => {
  const m = hmMonth.value
  const year = 2026
  const daysInMonth = new Date(year, m, 0).getDate()
  const firstDay = new Date(year, m - 1, 1).getDay() // 0=Sun
  const mondayOffset = (firstDay + 6) % 7 // Mon=0
  const dayLabels = ['周一','周二','周三','周四','周五','周六','周日']
  const weeks: { label: string; days: { key: string; level: number; inMonth: boolean; tip: string }[] }[] = []

  let dayNum = 1
  for (let w = 0; w < 6 && dayNum <= daysInMonth; w++) {
    const days: { key: string; level: number; inMonth: boolean; tip: string }[] = []
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d
      if (idx < mondayOffset || dayNum > daysInMonth) {
        days.push({ key: `e-${w}-${d}`, level: 0, inMonth: false, tip: '' })
      } else {
        const seedKey = m * 100 + dayNum
        const lvl = hmSeed(seedKey)
        const hours = lvl === 0 ? 0 : lvl === 5 ? 5 : +(lvl * 0.8 + rng() * 0.4).toFixed(1)
        days.push({ key: `${m}-${dayNum}`, level: lvl, inMonth: true, tip: `${m}月${dayNum}日 ${dayLabels[d]} · ${hours}h` })
        dayNum++
      }
    }
    weeks.push({ label: `第${w + 1}周`, days })
  }
  return weeks
})

const collectedPct = computed(() => Math.round((collectedCount.value / 9) * 100))

const radarData = computed(() => {
  if (report.value?.radarPoints) {
    return report.value.radarPoints.map(p => ({ name: p.dimension, score: p.score, trend: '', trendCls: '' }))
  }
  return [
    { name: '知识基础', score: 85, trend: '+3', trendCls: 't-up' },
    { name: '学习速度', score: 90, trend: '+5', trendCls: 't-up' },
    { name: '逻辑思维', score: 78, trend: '—', trendCls: 't-flat' },
    { name: '创造力', score: 88, trend: '+2', trendCls: 't-up' },
    { name: '专注力', score: 65, trend: '-4', trendCls: 't-down' },
    { name: '自律力', score: 82, trend: '—', trendCls: 't-flat' },
  ]
})

const radarPoints = computed<RadarPoint[]>(() => {
  if (report.value?.radarPoints) return report.value.radarPoints
  return radarData.value.map(d => ({ dimension: d.name, score: d.score }))
})

const skills = computed(() => report.value?.skills || {
  core: ['Python', '机器学习', '深度学习', '大模型应用'],
  foundation: ['算法基础', '数学基础', '线性代数', '项目实战'],
  additional: ['工程化部署', '极简 AI 研发', '计算机视觉'],
})

const weaknesses = computed(() => report.value?.weaknesses || [
  '数学及统计学底子较薄，特别是向量乘法与凸优化基础',
  '项目实战深度有限，缺乏大规模并发部署经验',
  '碎片化学习时间离散，难以形成稳定的编码习惯',
])

const milestones = computed(() => {
  if (report.value?.recommendedPath) {
    return report.value.recommendedPath.map(m => ({ step: m.step, title: m.title, desc: m.description }))
  }
  return [
    { step: 1, title: '巩固优势', desc: '打通 AI 底层认知' },
    { step: 2, title: '补齐短板', desc: '数学 + PyTorch 系统补习' },
    { step: 3, title: '实战跃迁', desc: '完成 2 个 AI 项目' },
    { step: 4, title: '周期校准', desc: '周复盘 + 迭代优化' },
  ]
})

const barData = [
  { label: '一', val: 1.8, pct: 55, cls: 'linear-gradient(180deg,#93c5fd,#3b82f6)', today: false },
  { label: '二', val: 2.5, pct: 70, cls: 'linear-gradient(180deg,#93c5fd,#3b82f6)', today: false },
  { label: '三', val: 1.2, pct: 38, cls: 'linear-gradient(180deg,#93c5fd,#2563eb)', today: false },
  { label: '四', val: 3.0, pct: 85, cls: 'linear-gradient(180deg,#93c5fd,#3b82f6)', today: false },
  { label: '五', val: 3.5, pct: 96, cls: 'linear-gradient(180deg,#93c5fd,#3b82f6)', today: true },
  { label: '六', val: 2.0, pct: 60, cls: 'linear-gradient(180deg,#93c5fd,#3b82f6)', today: false },
  { label: '日', val: 1.5, pct: 46, cls: 'linear-gradient(180deg,#93c5fd,#2563eb)', today: false },
]

const achievements = [
  { title: '初露锋芒', desc: '完成首次画像评测', icon: Sparkles, iconColor: 'var(--gold-400)', locked: false },
  { title: '学海启航', desc: '累计学习超 10h', icon: BookOpen, iconColor: '#5c9a8a', locked: false },
  { title: '逻辑觉醒', desc: '逻辑思维达 85+', icon: Lightbulb, iconColor: '#7a8a9a', locked: false },
  { title: '初火燃起', desc: '连续 3 天打卡', icon: Flame, iconColor: '#b86a7a', locked: false },
  { title: '极速学习', desc: '学习速度达 90+', icon: Zap, iconColor: 'var(--gold-400)', locked: false },
  { title: '目标明确', desc: '完成首个目标', icon: Crosshair, iconColor: '#b86a7a', locked: false },
  { title: '全能学者', desc: '所有维度 80+', icon: Award, iconColor: 'var(--text-dim)', locked: true },
  { title: '七日连击', desc: '连续 7 天打卡', icon: Flame, iconColor: 'var(--text-dim)', locked: true },
]
</script>

<style scoped>
.dash {
  overflow-y: auto;
  height: 100%;
  flex: 1;
  width: 100%;
  min-width: 0;
  background: transparent;
  color: var(--text-primary);
}

/* ===== HERO ===== */
.dash-hero {
  padding: 56px 80px 40px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.dash-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  gap: 40px;
}
.hero-score-block { display: flex; align-items: baseline; gap: 6px; }
.hero-score { font-family: "DM Serif Display", serif; font-size: 80px; font-weight: 400; color: var(--gold-400); line-height: 1; text-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
.hero-score-unit { font-size: 20px; color: var(--text-dim); font-weight: 300; }
.hero-right { flex: 1; }
.hero-title { font-family: "DM Serif Display", serif; font-size: 28px; font-weight: 400; color: #fff; margin: 0 0 6px; }
.hero-sub { font-size: 15px; color: var(--text-muted); margin: 0 0 16px; }
.hero-collect { display: flex; align-items: center; gap: 12px; }
.collect-bar { flex: 1; max-width: 240px; height: 6px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
.collect-fill { height: 100%; border-radius: 999px; background: var(--gold-400); transition: width 1.5s; }
.collect-text { font-size: 13px; color: var(--text-dim); white-space: nowrap; }

/* ===== INSIGHT（大字引用区） ===== */
.dash-insight {
  padding: 0 80px;
  max-width: 1280px;
  margin: 0 auto;
}
.insight-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  margin: 0;
}
.insight-big {
  background: rgba(8, 12, 24, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 130, 246, 0.08);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.insight-num { font-family: "DM Serif Display", serif; font-size: 56px; font-weight: 400; color: var(--gold-400); line-height: 1; }
.insight-label { font-size: 15px; color: var(--text-muted); }
.insight-note { font-size: 13px; color: #5c9a8a; font-weight: 600; margin-top: 4px; }
.insight-text {
  background: rgba(8, 12, 24, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 130, 246, 0.08);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
.insight-quote {
  font-family: "DM Serif Display", serif;
  font-size: 18px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}
.insight-from { font-size: 12px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; }

/* ===== GENERIC SECTION ===== */
.dash-section {
  padding: 0 80px;
  max-width: 1280px;
  margin: 0 auto;
}
.section-inner {
  padding: 48px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.sec-title {
  font-family: "DM Serif Display", serif;
  font-size: 22px;
  font-weight: 400;
  color: #fff;
  margin: 0 0 28px;
}

/* ===== RADAR LAYOUT ===== */
.radar-layout { display: flex; align-items: center; gap: 40px; }
.radar-side { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.radar-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.radar-name { font-size: 14px; color: var(--text-secondary); }
.radar-score { font-size: 15px; font-weight: 700; color: var(--gold-400); font-family: var(--font-mono); }

/* ===== HEATMAP (single month) ===== */
.dash-section-heatmap .section-inner { border-bottom: none; }
.hm-top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
.hm-top .sec-title { margin-bottom: 0; }
.hm-summary { display: flex; gap: 24px; font-size: 14px; color: var(--text-dim); }

.hm-month-nav { display: flex; gap: 4px; margin-bottom: 20px; }
.hm-month-btn { padding: 6px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: var(--text-dim); transition: all .2s; }
.hm-month-btn:hover { color: var(--gold-400); background: rgba(59,130,246,0.06); }
.hm-month-btn.active { background: rgba(59,130,246,0.12); color: var(--gold-400); }

.hm-month-grid { display: flex; flex-direction: column; gap: 6px; }
.hm-week-row { display: flex; align-items: center; gap: 12px; }
.hm-week-label { font-size: 12px; color: var(--text-dim); width: 40px; flex-shrink: 0; text-align: right; }
.hm-week-cells { display: flex; gap: 6px; }
.hm-cell { width: 36px; height: 36px; border-radius: 6px; cursor: pointer; position: relative; transition: all .15s; flex-shrink: 0; }
.hm-cell.empty { background: rgba(255,255,255,0.015); cursor: default; }
.hm-cell:not(.empty):hover { outline: 2px solid var(--gold-500); outline-offset: 1px; z-index: 3; }
.hm-cell::after { content: attr(data-tip); display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #161220; padding: 4px 10px; border-radius: 6px; font-size: 12px; color: var(--text-primary); white-space: nowrap; z-index: 10; margin-bottom: 6px; pointer-events: none; }
.hm-cell:not(.empty):hover::after { display: block; }
.hm-legend { display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-top: 16px; font-size: 12px; color: var(--text-dim); }
.hm-legend .lbb { width: 16px; height: 16px; border-radius: 4px; }

/* ===== TWO COL ===== */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.two-col .col-left, .two-col .col-right { min-width: 0; }

/* ===== SKILLS ===== */
.skill-group { margin-bottom: 20px; }
.sg-hdr { font-size: 14px; font-weight: 600; margin-bottom: 10px; }
.sg-core { color: #5c9a8a; }
.sg-found { color: var(--gold-400); }
.sg-add { color: #94a3b8; }
.skill-bubbles { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-b { padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; }
.sb-core { background: rgba(92,154,138,0.1); color: #5c9a8a; }
.sb-found { background: rgba(59, 130, 246,0.08); color: var(--gold-400); }
.sb-add { background: rgba(148,163,184,0.06); color: #94a3b8; }

/* ===== BAR CHART ===== */
.col-right .sec-title { margin-bottom: 20px; }
.bar-chart-wrap { height: 200px; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; padding: 0 4px; }
.bar-group { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.bar-group .bar { width: 100%; max-width: 48px; border-radius: 6px 6px 0 0; transition: height 1.2s; position: relative; }
.bar-group .bar:hover { opacity: 0.7; }
.bar-group .bar.bar-glow { box-shadow: 0 0 16px rgba(59, 130, 246,0.3); }
.bar-group .bar .bar-tip { display: none; position: absolute; top: -24px; left: 50%; transform: translateX(-50%); background: #161220; padding: 3px 10px; border-radius: 6px; font-size: 13px; white-space: nowrap; color: var(--text-primary); }
.bar-group .bar:hover .bar-tip { display: block; }
.bar-group .bar-lbl { font-size: 13px; color: var(--text-dim); }
.bar-group .bar-lbl.bar-today { color: var(--gold-400); font-weight: 700; }

/* ===== TIMELINE ===== */
.timeline { display: flex; gap: 0; position: relative; }
.timeline::before { content: ''; position: absolute; top: 16px; left: 16px; right: 16px; height: 2px; background: rgba(255,255,255,0.06); }
.tl-node { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; position: relative; }
.tl-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--gold-400); background: var(--bg-deep); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: var(--gold-400); position: relative; z-index: 1; }
.tl-content { text-align: center; }
.tl-content h4 { font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 4px; }
.tl-content p { font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5; }

/* ===== ACHIEVEMENTS ===== */
.ach-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.ach-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.04);
  transition: all .3s;
  cursor: default;
}
.ach-item:hover { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
.ach-item.locked { opacity: 0.3; }
.ach-icon { width: 28px; height: 28px; }
.ach-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.ach-desc { font-size: 12px; color: var(--text-muted); text-align: center; line-height: 1.4; }

/* ===== FOOT ===== */
.dash-foot { height: 80px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 1000px) {
  .dash-hero { padding: 40px 32px 32px; }
  .dash-hero-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
  .hero-score { font-size: 56px; }
  .dash-insight { padding: 0 32px; }
  .insight-grid { grid-template-columns: 1fr; }
  .dash-section { padding: 0 32px; }
  .two-col { grid-template-columns: 1fr; gap: 32px; }
  .timeline { flex-direction: column; gap: 20px; }
  .timeline::before { display: none; }
  .tl-node { flex-direction: row; align-items: flex-start; }
  .tl-content { text-align: left; }
  .ach-grid { grid-template-columns: repeat(2, 1fr); }
  .radar-layout { flex-direction: column; align-items: center; }
  .radar-side { width: 100%; max-width: 320px; }
  .hm-cell { width: 28px; height: 28px; }
}
@media (max-width: 640px) {
  .dash-hero { padding: 32px 20px 24px; }
  .hero-score { font-size: 44px; }
  .insight-num { font-size: 40px; }
  .dash-insight { padding: 0 20px; }
  .dash-section { padding: 0 20px; }
  .ach-grid { grid-template-columns: 1fr 1fr; }
  .hm-cell { width: 22px; height: 22px; }
  .dim-name { width: 56px; font-size: 12px; }
}
</style>
