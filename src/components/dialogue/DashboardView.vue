<template>
  <section class="dashboard-wrap">
    <!-- ===== SECTION 1: HEATMAP ===== -->
    <section class="d-section" id="d-heatmap">
      <div class="d-container">
        <div class="d-section-header">
          <div class="pre"><span class="line"></span> Section 01 <span class="line"></span></div>
          <h2>学习热力矩阵</h2>
          <p>全年 52 周学习足迹追踪 · 每一格都是你的坚持</p>
        </div>

        <div class="hm-hdr">
          <div class="hm-stats">
            <div class="hm-s"><div class="hsn">18</div><div class="hsl">学习周数</div></div>
            <div class="hm-s"><div class="hsn">42</div><div class="hsl">总学习天数</div></div>
            <div class="hm-s"><div class="hsn" style="color:#5c9a8a">7</div><div class="hsl"><Flame class="lui" style="color:#b86a7a" /> 当前连续</div></div>
            <div class="hm-s"><div class="hsn" style="color:var(--gold-400)">15</div><div class="hsl"><Award class="lui" style="color:var(--gold-400)" /> 最长连续</div></div>
            <div class="hm-s"><div class="hsn">4.2</div><div class="hsl">日均 (h)</div></div>
          </div>
          <div class="hm-nav">
            <button class="active">2026</button>
            <button>2025</button>
          </div>
        </div>

        <div class="d-card" style="padding:24px 20px">
          <div class="hm-wrap">
            <div class="hm-months">
              <span v-for="m in monthLabels" :key="m" class="hm-lbl">{{ m }}</span>
            </div>
            <div class="hm-body">
              <div class="hm-days">
                <span class="hd"></span><span class="hd">周一</span><span class="hd"></span><span class="hd">周三</span><span class="hd"></span><span class="hd">周五</span><span class="hd"></span>
              </div>
              <div class="hm-cols">
                <div v-for="w in 53" :key="w" class="hm-col">
                  <div v-for="d in 7" :key="d" class="hm-cell"
                    :style="{ background: heatColor(w, d) }"
                    :data-tip="heatTip(w, d)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hm-legend">
            <span>少</span>
            <span v-for="l in heatLevels" :key="l" class="lbb" :style="{ background: l }"></span>
            <span>多</span>
          </div>
        </div>

        <div class="hm-bot">
          <div class="d-card">
            <div class="d-card-title"><Calendar class="lui" style="color:var(--gold-400)" /> 月度学习统计</div>
            <div class="mbar-wrap">
              <div v-for="m in monthStats" :key="m.name" class="mbar-row">
                <span class="mn">{{ m.name }}</span>
                <div class="mb"><div class="seg" :style="{ flex: m.active, background: 'rgba(201,168,76,0.5)' }"></div><div class="seg" :style="{ flex: m.inactive, background: 'rgba(201,168,76,0.05)' }"></div></div>
                <span class="mv">{{ m.hours }}h</span>
              </div>
            </div>
          </div>
          <div class="d-card">
            <div class="d-card-title"><Award class="lui" style="color:var(--gold-400)" /> 热力徽章进度</div>
            <div class="bp-wrap">
              <div v-for="bp in badgeProgress" :key="bp.name" class="bp-row">
                <div class="bp-h"><span>{{ bp.name }}</span><span class="bp-p" :style="{ color: bp.pct >= 100 ? '#5c9a8a' : 'var(--gold-400)' }">{{ bp.pct >= 100 ? '✅ 已完成' : bp.pct + '%' }}</span></div>
                <div class="bp-b"><div class="fill" :style="{ width: Math.min(bp.pct, 100) + '%' }"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="d-divider"><hr /></div>

    <!-- ===== SECTION 2: REPORT ===== -->
    <section class="d-section" id="d-report">
      <div class="d-container">
        <div class="d-section-header">
          <div class="pre"><span class="line"></span> Section 02 <span class="line"></span></div>
          <h2>星图诊断报告</h2>
          <p>9 维学习力深度画像与全方位学业能力诊断</p>
        </div>

        <div class="report-top">
          <div class="d-card gauge-wrap">
            <div class="gauge-val">{{ report?.score ?? '—' }}</div>
            <div class="gauge-lbl">综合学力指数</div>
            <div class="gauge-badge"><span class="d-tag d-tag-green">🏅 {{ report?.evaluation || '数据采集中' }}</span></div>
            <div style="margin-top:16px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
              <span class="d-tag d-tag-blue"><TrendingUp class="lui" style="color:#7a8a9a" /> +4 较上次</span>
              <span class="d-tag d-tag-gold"><Zap class="lui" style="color:var(--gold-400)" /> 学习速度 +5</span>
            </div>
          </div>
          <div class="d-card report-meta">
            <div class="meta-item"><Calendar class="lui" style="color:var(--text-muted)" /> <span class="mv">2026-05-24</span></div>
            <div class="meta-item"><User class="lui" style="color:var(--text-muted)" /> <span class="mv">学生 · 计算机 / AI</span></div>
            <div class="meta-item"><Target class="lui" style="color:var(--text-muted)" /> <span class="mv">做项目 · 兴趣驱动</span><span class="d-tag d-tag-gold" style="margin-left:8px">6 / 9 维已采集</span></div>
            <div class="meta-item"><BarChart3 class="lui" style="color:var(--text-muted)" /> <span class="mv">初学者</span></div>
            <div class="meta-bar-wrap">
              <span class="mk">采集进度</span>
              <div class="meta-bar"><div class="fill" :style="{ width: collectedPct + '%' }"></div></div>
              <span class="mpct">{{ collectedPct }}%</span>
            </div>
          </div>
        </div>

        <div class="dash-grid">
          <div class="d-card radar-card">
            <div class="d-card-title"><Radio class="lui" style="color:var(--text-secondary)" /> 能力维度星像</div>
            <div class="radar-inner">
              <div class="radar-svg-wrap">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(201,168,76,0.04)"/><circle cx="70" cy="70" r="45" fill="none" stroke="rgba(201,168,76,0.04)"/><circle cx="70" cy="70" r="30" fill="none" stroke="rgba(201,168,76,0.04)"/><circle cx="70" cy="70" r="15" fill="none" stroke="rgba(201,168,76,0.04)"/>
                  <line x1="70" y1="10" x2="70" y2="130" stroke="rgba(201,168,76,0.05)"/><line x1="10" y1="70" x2="130" y2="70" stroke="rgba(201,168,76,0.05)"/><line x1="28" y1="28" x2="112" y2="112" stroke="rgba(201,168,76,0.05)"/><line x1="112" y1="28" x2="28" y2="112" stroke="rgba(201,168,76,0.05)"/>
                  <polygon points="70,18 108,48 90,100 50,100 32,48" fill="rgba(201,168,76,0.12)" stroke="var(--gold-500)" stroke-width="1.5" stroke-linejoin="round"/>
                  <circle cx="70" cy="18" r="3" fill="var(--gold-500)"/><circle cx="108" cy="48" r="3" fill="var(--gold-500)"/><circle cx="90" cy="100" r="3" fill="var(--gold-500)"/><circle cx="50" cy="100" r="3" fill="var(--gold-500)"/><circle cx="32" cy="48" r="3" fill="var(--gold-500)"/>
                  <polygon points="70,25 100,50 88,96 52,96 40,50" fill="none" stroke="rgba(148,163,184,0.15)" stroke-width="1" stroke-dasharray="3,3"/>
                </svg>
              </div>
              <div class="radar-list">
                <div v-for="dim in radarData" :key="dim.name" class="dim-row">
                  <span class="dn">{{ dim.name }}</span>
                  <div class="db"><div class="fill" :style="{ width: dim.score + '%' }"></div></div>
                  <span class="ds">{{ dim.score }}</span>
                  <span class="dt" :class="dim.trendCls">{{ dim.trend }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-card skills-card">
            <div class="d-card-title"><Brain class="lui" style="color:var(--text-secondary)" /> 技能树图谱</div>
            <div class="skills-colwrap">
              <div class="skill-group"><div class="sg-hdr" style="color:#5c9a8a">✦ 核心实战</div><div class="skill-bubbles"><span v-for="s in skills.core" :key="s" class="skill-b sb-core">{{ s }}</span></div></div>
              <div class="skill-group"><div class="sg-hdr" style="color:var(--gold-400)">♦ 理论根底</div><div class="skill-bubbles"><span v-for="s in skills.foundation" :key="s" class="skill-b sb-found">{{ s }}</span></div></div>
              <div class="skill-group"><div class="sg-hdr" style="color:#94a3b8">⚙ 拓展栈</div><div class="skill-bubbles"><span v-for="s in skills.additional" :key="s" class="skill-b sb-add">{{ s }}</span></div></div>
            </div>
          </div>
        </div>

        <div class="wst-grid">
          <div class="wcard"><h4><AlertTriangle class="lui" style="color:#b86a7a" /> 薄弱环节</h4><ul><li v-for="w in weaknesses" :key="w">{{ w }}</li></ul></div>
          <div class="scard"><h4><Lightbulb class="lui" style="color:#5c9a8a" /> 自适应规划</h4><ul><li v-for="s in suggestions" :key="s">{{ s }}</li></ul></div>
          <div class="ms-wrap"><h4><MapIcon class="lui" style="color:var(--text-secondary)" /> 成长里程碑</h4><div class="ms-list"><div v-for="m in milestones" :key="m.step" class="ms-item"><div class="num">{{ m.step }}</div><h5>{{ m.title }}</h5><p>{{ m.desc }}</p></div></div></div>
        </div>

        <div class="res-grid">
          <div v-for="r in resources" :key="r.title" class="res-item"><span class="d-tag" :class="r.tagCls">{{ r.label }}</span><h5>{{ r.title }}</h5><p>{{ r.desc }}</p></div>
        </div>
        <div class="rfooter"><span><Signature class="lui" style="opacity:0.5" /> 8BA3D0E3F3C</span><span>讯飞星火 · <CheckCircle class="lui" style="color:#5c9a8a" /> APPROVED</span></div>
      </div>
    </section>

    <div class="d-divider"><hr /></div>

    <!-- ===== SECTION 3: STATS ===== -->
    <section class="d-section" id="d-stats">
      <div class="d-container">
        <div class="d-section-header">
          <div class="pre"><span class="line"></span> Section 03 <span class="line"></span></div>
          <h2>学情分析台</h2>
          <p>全方位学习数据可视化，洞察你的学习行为模式</p>
        </div>

        <div class="stat-row">
          <div v-for="s in statCards" :key="s.label" class="d-card stat-item">
            <div class="sn">{{ s.num }}</div>
            <div class="sl"><component :is="s.icon" class="lui" :style="{ color: s.iconColor }" /> {{ s.label }}</div>
            <div class="ss">{{ s.sub }}</div>
          </div>
        </div>

        <div class="stat-chart-row">
          <div class="d-card">
            <div class="d-card-title"><TrendingUp class="lui" style="color:var(--gold-400)" /> 近 7 天学习时长</div>
            <div class="bar-chart-wrap">
              <div class="avg-line" style="bottom:70px"><span class="avg-label">均值</span></div>
              <div v-for="(b, i) in barData" :key="i" class="bar-group">
                <div class="bar" :class="{ 'bar-glow': b.today }" :style="{ height: b.pct + '%', background: b.cls }"><span class="bar-tip">{{ b.val }}h</span></div>
                <span class="bar-lbl" :class="{ 'bar-today': b.today }">{{ b.label }}</span>
              </div>
            </div>
          </div>
          <div class="d-card">
            <div class="d-card-title"><BarChart3 class="lui" style="color:var(--gold-400)" /> 课程方向完成度</div>
            <div class="rings2">
              <div v-for="r in ringData" :key="r.name" class="ri">
                <div class="rv" :style="{ background: r.bg }"><div class="rn">{{ r.pct }}%</div></div>
                <span class="rl">{{ r.name }} <span style="color:var(--text-dim)">{{ r.count }}</span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="stat-bot-row">
          <div class="d-card">
            <div class="d-card-title"><Clock class="lui" style="color:var(--gold-400)" /> 学习时段占比</div>
            <div class="period-stack">
              <div class="period-bar-wrap"><div class="seg" style="flex:3.5;background:linear-gradient(90deg,var(--gold-600),var(--gold-400))">🌅 晨间 35%</div><div class="seg" style="flex:2.5;background:linear-gradient(90deg,#5c7a8a,#7a8a9a)">🌤 午后 25%</div><div class="seg" style="flex:4;background:linear-gradient(90deg,#7a5a6a,#8a7a9a)">🌙 晚间 40%</div></div>
              <div class="period-legend"><div class="pl-item"><span class="dot" style="background:var(--gold-400)"></span>早晨 6-12点 · 5.4h</div><div class="pl-item"><span class="dot" style="background:#7a8a9a"></span>午后 12-18点 · 3.9h</div><div class="pl-item"><span class="dot" style="background:#8a7a9a"></span>晚间 18-24点 · 6.2h</div></div>
            </div>
            <div class="period-mini">
              <div><span style="color:var(--gold-400)">🌅</span><span class="pm-label">最佳时段</span></div>
              <div><span style="color:var(--gold-400);font-weight:700">3.5h</span><span class="pm-label">单日峰值</span></div>
              <div><span style="color:#5c9a8a;font-weight:700">⚡ 92</span><span class="pm-label">效率评分</span></div>
            </div>
          </div>
          <div class="d-card">
            <div class="d-card-title"><ClipboardList class="lui" style="color:var(--gold-400)" /> 本周学习效率</div>
            <div class="eff-grid">
              <div v-for="e in effData" :key="e.name" class="eff-item">
                <div class="eff-hdr"><span class="eff-name">{{ e.icon }} {{ e.name }}</span><span class="eff-score" :style="{ color: e.color }">{{ e.score }}%</span></div>
                <div class="eff-bar"><div class="fill" :style="{ width: e.score + '%', background: e.bg }"></div></div>
              </div>
            </div>
            <div class="eff-summary"><span>综合效率指数</span><span style="font-weight:800;color:#5c9a8a">80.8 / 100</span></div>
          </div>
          <div class="d-card">
            <div class="d-card-title"><TrendingUp class="lui" style="color:var(--gold-400)" /> 能力趋势 · 近 5 次</div>
            <div class="lchart">
              <svg viewBox="0 0 300 130">
                <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(201,168,76,0.04)" stroke-width="1"/><line x1="0" y1="55" x2="300" y2="55" stroke="rgba(201,168,76,0.04)" stroke-width="1"/><line x1="0" y1="85" x2="300" y2="85" stroke="rgba(201,168,76,0.04)" stroke-width="1"/><line x1="0" y1="115" x2="300" y2="115" stroke="rgba(201,168,76,0.04)" stroke-width="1"/>
                <polyline points="0,100 75,85 150,80 225,65 300,55" fill="none" stroke="#5c9a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="0,78 75,72 150,75 225,62 300,52" fill="none" stroke="#7a8a9a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="0,90 75,82 150,86 225,75 300,68" fill="none" stroke="var(--gold-400)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="0" y="126" font-size="8" fill="var(--text-dim)">3月</text><text x="75" y="126" font-size="8" fill="var(--text-dim)">4月</text><text x="150" y="126" font-size="8" fill="var(--text-dim)">5月</text><text x="225" y="126" font-size="8" fill="var(--text-dim)">6月</text><text x="292" y="126" font-size="8" fill="var(--text-dim)">7月</text>
                <rect x="195" y="4" width="8" height="3" rx="1" fill="#5c9a8a"/><text x="205" y="8" font-size="7" fill="var(--text-muted)">学习速度</text><rect x="248" y="4" width="8" height="3" rx="1" fill="#7a8a9a"/><text x="258" y="8" font-size="7" fill="var(--text-muted)">逻辑思维</text>
              </svg>
            </div>
            <div class="insight"><div><span class="ib-lbl">🌅 最佳学习时段</span><br /><span class="ib-val" style="color:#5c9a8a">上午 9:00 – 11:00</span></div><div style="text-align:right"><span class="ib-lbl">⚡ 效率巅峰</span><br /><span class="ib-val" style="color:var(--gold-400)">92 / 100</span></div></div>
          </div>
        </div>
      </div>
    </section>

    <div class="d-divider"><hr /></div>

    <!-- ===== SECTION 4: ACHIEVEMENTS ===== -->
    <section class="d-section" id="d-achievements">
      <div class="d-container">
        <div class="d-section-header">
          <div class="pre"><span class="line"></span> Section 04 <span class="line"></span></div>
          <h2>成就殿堂</h2>
          <p>解锁里程碑，记录你的每一步成长</p>
        </div>

        <div class="ach-top">
          <div v-for="a in achStats" :key="a.label" class="at-item"><div class="atn">{{ a.num }}</div><div class="atl"><component :is="a.icon" class="lui" :style="{ color: a.iconColor }" /> {{ a.label }}</div></div>
        </div>

        <div class="ach-cats">
          <button v-for="(c, i) in achCategories" :key="c.name" :class="{ active: i === 0 }"><component :is="c.icon" class="lui" style="color:var(--text-muted)" /> {{ c.name }}</button>
        </div>

        <div class="ach-grid">
          <div v-for="a in achievements" :key="a.title" class="d-card ach-c" :class="{ locked: a.locked }">
            <div class="ai"><component :is="a.icon" class="lui" :style="{ width: '22px', height: '22px', color: a.locked ? 'var(--text-dim)' : a.iconColor }" /></div>
            <h4>{{ a.title }}</h4>
            <p>{{ a.desc }}</p>
            <div v-if="!a.locked" class="ad"><Calendar class="lui" style="width:10px;height:10px;color:var(--text-dim)" /> {{ a.date }}</div>
            <div v-if="a.locked && a.hint" style="font-size:9px;color:var(--text-dim);margin-top:4px">{{ a.hint }}</div>
          </div>
        </div>

        <div class="d-card" style="margin-top:24px">
          <div class="d-card-title"><BarChart3 class="lui" style="color:var(--gold-400)" /> 成就进度总览</div>
          <div class="ach-prog">
            <div v-for="p in achProgData" :key="p.name" class="ap-item">
              <div class="apn" :style="{ color: p.color }">{{ p.cur }}/{{ p.total }}</div>
              <div class="apl">{{ p.icon }} {{ p.name }}</div>
              <div class="apb"><div class="fill" :style="{ width: p.pct + '%', background: p.color }"></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  TrendingUp, BarChart3, Clock, ClipboardList, Award, Flame, Zap, BookOpen, Layers,
  Brain, Radio, AlertTriangle, Lightbulb, MapIcon, Target, Calendar, CheckCircle,
  Sparkles, Crosshair, Moon, Package, User, Signature
} from 'lucide-vue-next'
import { dimensions, collectedCount, report } from '@/composables/dialogue/useAppState'

// ---- helpers ----
const rng = (() => {
  // seeded-ish random for stable heatmap
  let s = 42
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
})()

const m = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
const monthLabels = Array.from({ length: 12 }, (_, i) => m[i])

const heatColors = ['rgba(201,168,76,0.04)','rgba(201,168,76,0.12)','rgba(201,168,76,0.28)','rgba(201,168,76,0.48)','rgba(201,168,76,0.72)','#c9a84c']
const heatLevels = heatColors

const hmCache = new Map()
function heatColor(w: number, d: number) {
  const key = w * 7 + d
  if (!hmCache.has(key)) {
    const r = rng()
    const lvl = r < 0.48 ? 0 : Math.min(Math.floor(r * 5) + 1, 5)
    hmCache.set(key, lvl)
  }
  return heatColors[hmCache.get(key)!]
}

const dayNames = ['周一','周二','周三','周四','周五','周六','周日']
function heatTip(w: number, d: number) {
  const lvl = hmCache.get(w * 7 + d) || 0
  const tip = lvl === 0 ? '无活动' : (lvl === 5 ? '5h+' : (lvl * 0.8 + 'h'))
  return dayNames[d - 1] + ' · ' + tip
}

// ---- data ----
const monthStats = [
  { name: '5月', active: 0.65, inactive: 0.35, hours: 21 },
  { name: '4月', active: 0.5, inactive: 0.5, hours: 15 },
  { name: '3月', active: 0.3, inactive: 0.7, hours: 8 },
  { name: '2月', active: 0.12, inactive: 0.88, hours: 3 },
  { name: '1月', active: 0.08, inactive: 0.92, hours: 2 },
]

const badgeProgress = [
  { name: '🔥 连续 7 天打卡', pct: 100 },
  { name: '🔥 连续 15 天打卡', pct: 46 },
  { name: '📖 累计 50h 学习', pct: 84 },
  { name: '🌙 夜学模式 (10 次)', pct: 30 },
]

const collectedPct = computed(() => Math.round((collectedCount.value / 9) * 100))

const radarData = computed(() => {
  if (report.value?.radarPoints) {
    return report.value.radarPoints.map(p => ({ name: p.dimension, score: p.score, trend: '', trendCls: '' }))
  }
  return [
    { name: '知识基础', score: 85, trend: '↑3', trendCls: 't-up' },
    { name: '学习速度', score: 90, trend: '↑5', trendCls: 't-up' },
    { name: '逻辑思维', score: 78, trend: '—', trendCls: 't-flat' },
    { name: '创造力', score: 88, trend: '↑2', trendCls: 't-up' },
    { name: '专注力', score: 65, trend: '↓4', trendCls: 't-down' },
    { name: '自律力', score: 82, trend: '—', trendCls: 't-flat' },
  ]
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

const suggestions = computed(() => report.value?.suggestions || [
  '从小项目入手，先做出成果，再深究理论',
  '系统补充线性代数+概率统计，用 Jupyter 探索矩阵变换',
  '保持每周 10h+ 浸润式学习，定期与社区讨论',
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

const resources = [
  { label: '精品微课', title: '大模型极速全栈实战', desc: 'PyTorch · QLoRA · LangChain Agent', tagCls: 'd-tag-blue' },
  { label: '开源项目', title: 'Gradio + PDF 智能摘要', desc: '50 行代码搭建 AI 阅读助手', tagCls: 'd-tag-green' },
  { label: '核心文献', title: 'RAG 双路召回优化', desc: 'BM25 + 语义 Embedding 重排', tagCls: 'd-tag-purple' },
]

const barData = [
  { label: '一', val: 1.8, pct: 55, cls: 'linear-gradient(180deg,#e8d48b,#c9a84c)', today: false },
  { label: '二', val: 2.5, pct: 70, cls: 'linear-gradient(180deg,#e8d48b,#c9a84c)', today: false },
  { label: '三', val: 1.2, pct: 38, cls: 'linear-gradient(180deg,#e8d48b,#b8923a)', today: false },
  { label: '四', val: 3.0, pct: 85, cls: 'linear-gradient(180deg,#e8d48b,#c9a84c)', today: false },
  { label: '五', val: 3.5, pct: 96, cls: 'linear-gradient(180deg,#f0df9a,#d4ad3a)', today: true },
  { label: '六', val: 2.0, pct: 60, cls: 'linear-gradient(180deg,#e8d48b,#c9a84c)', today: false },
  { label: '日', val: 1.5, pct: 46, cls: 'linear-gradient(180deg,#e8d48b,#b8923a)', today: false },
]

const ringData = [
  { name: '编程基础', count: '7门', pct: 85, bg: 'conic-gradient(#5c9a8a 0% 85%, rgba(22,18,32,0.8) 85% 100%)' },
  { name: 'AI 方向', count: '8门', pct: 62, bg: 'conic-gradient(#7a8a9a 0% 62%, rgba(22,18,32,0.8) 62% 100%)' },
  { name: '软件工程', count: '2门', pct: 55, bg: 'conic-gradient(var(--gold-400) 0% 55%, rgba(22,18,32,0.8) 55% 100%)' },
  { name: '计算机系统', count: '4门', pct: 40, bg: 'conic-gradient(#b86a7a 0% 40%, rgba(22,18,32,0.8) 40% 100%)' },
]

const statCards = [
  { num: '42.5', label: '总学习时长 (h)', sub: '📈 较上周 +12%', icon: BookOpen, iconColor: 'var(--gold-400)' },
  { num: '18', label: '已完成课程', sub: '🏆 完成率 75%', icon: Layers, iconColor: 'var(--gold-400)' },
  { num: '7', label: '当前连续天数', sub: '🏅 最长 15 天', icon: Flame, iconColor: '#b86a7a' },
  { num: '89', label: '综合效率评分', sub: '⏰ 最佳: 上午', icon: Zap, iconColor: 'var(--gold-400)' },
]

const effData = [
  { name: '专注力', icon: '🎯', score: 82, color: '#5c9a8a', bg: 'linear-gradient(90deg,#5c9a8a,#7ab8a8)' },
  { name: '理解度', icon: '📖', score: 78, color: '#7a8a9a', bg: 'linear-gradient(90deg,#6a7a8a,#8a9aaa)' },
  { name: '完成率', icon: '✅', score: 75, color: 'var(--gold-400)', bg: 'linear-gradient(90deg,var(--gold-500),var(--gold-300))' },
  { name: '持久性', icon: '💪', score: 88, color: '#8a7a9a', bg: 'linear-gradient(90deg,#7a6a8a,#9a8aaa)' },
]

const achStats = [
  { num: '12', label: '已获得', icon: Award, iconColor: 'var(--gold-400)' },
  { num: '24', label: '总成就', icon: Package, iconColor: 'var(--text-muted)' },
  { num: '50%', label: '收集进度', icon: BarChart3, iconColor: 'var(--text-muted)' },
]

const achCategories = [
  { name: '全部 (24)', icon: BarChart3 },
  { name: '里程碑 (8)', icon: Award },
  { name: '能力突破 (6)', icon: Zap },
  { name: '打卡 (5)', icon: Flame },
  { name: '课程 (5)', icon: BookOpen },
]

const achievements = [
  { title: '初露锋芒', desc: '完成首次学习画像评测', icon: Sparkles, iconColor: 'var(--gold-400)', locked: false, date: '2026-05-20' },
  { title: '学海启航', desc: '累计学习超过 10 小时', icon: BookOpen, iconColor: '#5c9a8a', locked: false, date: '2026-05-22' },
  { title: '逻辑觉醒', desc: '逻辑思维维度达到 85+', icon: Lightbulb, iconColor: '#7a8a9a', locked: false, date: '2026-05-23' },
  { title: '初火燃起', desc: '首次连续 3 天打卡', icon: Flame, iconColor: '#b86a7a', locked: false, date: '2026-05-21' },
  { title: '极速学习者', desc: '学习速度维度达到 90+', icon: Zap, iconColor: 'var(--gold-400)', locked: false, date: '2026-05-24' },
  { title: '目标明确', desc: '设定并完成首个目标', icon: Crosshair, iconColor: '#b86a7a', locked: false, date: '2026-05-20' },
  { title: '全能学者', desc: '所有维度 80+', icon: Award, iconColor: 'var(--text-dim)', locked: true, hint: '需提升: 专注力' },
  { title: '七日连击', desc: '连续 7 天打卡', icon: Flame, iconColor: 'var(--text-dim)', locked: true },
  { title: '深度学习', desc: '完成深度学习课程', icon: Brain, iconColor: 'var(--text-dim)', locked: true },
  { title: '夜猫子', desc: '累计 10 次晚间学习', icon: Moon, iconColor: 'var(--text-dim)', locked: true },
]

const achProgData = [
  { name: '里程碑', icon: '🏅', cur: 5, total: 8, pct: 62, color: '#5c9a8a' },
  { name: '能力突破', icon: '💪', cur: 3, total: 6, pct: 50, color: '#7a8a9a' },
  { name: '打卡', icon: '🔥', cur: 2, total: 5, pct: 40, color: 'var(--gold-400)' },
  { name: '课程', icon: '📚', cur: 2, total: 5, pct: 40, color: '#b86a7a' },
]
</script>

<style scoped>
.dashboard-wrap {
  overflow-y: auto;
  height: 100%;
  flex: 1;
  width: 100%;
  min-width: 0;
  background: var(--bg-deep);
  color: var(--text-primary);
}

.d-container { padding: 0 80px; max-width: 1800px; margin: 0 auto; }
.d-section { padding: 56px 0; }

.d-section-header { margin-bottom: 28px; }
.d-section-header .pre { font-size: 11px; font-weight: 700; color: var(--gold-400); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 6px; }
.d-section-header .pre .line { display: inline-block; width: 24px; height: 1px; background: var(--gold-500); margin: 0 8px; vertical-align: middle; }
.d-section-header h2 { font-family: "DM Serif Display", serif; font-size: 30px; font-weight: 400; color: #fff; letter-spacing: -0.02em; }
.d-section-header p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

.d-card { background: linear-gradient(135deg, rgba(22,18,32,0.5), rgba(17,14,26,0.3)); border-radius: 14px; padding: 22px; }
.d-card-title { font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }

.d-divider { padding: 0 80px; max-width: 1800px; margin: 0 auto; }
.d-divider hr { border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent); margin: 0; }

.d-tag { display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; }
.d-tag-gold { background: rgba(201,168,76,0.1); color: var(--gold-400); }
.d-tag-green { background: rgba(92,154,138,0.12); color: #5c9a8a; }
.d-tag-blue { background: rgba(122,138,154,0.12); color: #7a8a9a; }
.d-tag-purple { background: rgba(138,122,154,0.12); color: #8a7a9a; }

.lui { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; width: 14px; height: 14px; }

/* ===== HEATMAP ===== */
.hm-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px; }
.hm-stats { display: flex; gap: 28px; flex-wrap: wrap; }
.hm-s { text-align: center; }
.hm-s .hsn { font-size: 20px; font-weight: 800; color: var(--text-primary); }
.hm-s .hsl { font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 3px; justify-content: center; }
.hm-nav { display: flex; gap: 4px; }
.hm-nav button { padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: var(--text-muted); transition: all .2s; }
.hm-nav button:hover { color: var(--gold-400); background: rgba(201,168,76,0.08); }
.hm-nav button.active { background: rgba(201,168,76,0.12); color: var(--gold-400); }

.hm-wrap { overflow-x: auto; padding: 4px 0; }
.hm-months { display: flex; gap: 0; margin-bottom: 4px; padding-left: 32px; }
.hm-months .hm-lbl { font-size: 10px; color: var(--text-dim); flex: 1; text-align: left; min-width: 0; }
.hm-body { display: flex; }
.hm-days { display: flex; flex-direction: column; gap: 3px; margin-right: 4px; }
.hm-days .hd { font-size: 10px; color: var(--text-dim); height: 13px; display: flex; align-items: center; line-height: 1; }
.hm-cols { display: flex; gap: 3px; }
.hm-col { display: flex; flex-direction: column; gap: 3px; }
.hm-cell { width: 13px; height: 13px; border-radius: 2px; cursor: pointer; position: relative; transition: all .1s; flex-shrink: 0; }
.hm-cell:hover { outline: 2px solid var(--gold-500); outline-offset: 1px; z-index: 3; }
.hm-cell::after { content: attr(data-tip); display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #161220; padding: 3px 8px; border-radius: 6px; font-size: 10px; color: var(--text-primary); white-space: nowrap; z-index: 10; margin-bottom: 4px; pointer-events: none; }
.hm-cell:hover::after { display: block; }

.hm-legend { display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-top: 10px; font-size: 10px; color: var(--text-dim); }
.hm-legend .lbb { width: 13px; height: 13px; border-radius: 2px; }

.hm-bot { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }

.mbar-wrap { display: flex; flex-direction: column; gap: 8px; }
.mbar-row { display: flex; align-items: center; gap: 10px; }
.mbar-row .mn { font-size: 12px; color: var(--text-secondary); width: 36px; flex-shrink: 0; }
.mbar-row .mb { flex: 1; height: 20px; display: flex; gap: 2px; border-radius: 4px; overflow: hidden; }
.mbar-row .mb .seg { border-radius: 2px; }
.mbar-row .mv { font-size: 12px; color: var(--gold-400); font-weight: 600; width: 36px; text-align: right; }

.bp-wrap { display: flex; flex-direction: column; gap: 10px; }
.bp-row .bp-h { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px; align-items: center; gap: 8px; }
.bp-row .bp-h .bp-p { font-weight: 600; white-space: nowrap; }
.bp-row .bp-b { height: 4px; background: rgba(22,18,32,0.7); border-radius: 4px; overflow: hidden; }
.bp-row .bp-b .fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--gold-500), var(--gold-300)); transition: width 1s; }

/* ===== REPORT ===== */
.report-top { display: grid; grid-template-columns: 260px 1fr; gap: 20px; margin-bottom: 20px; }
.gauge-wrap { text-align: center; padding: 28px 20px 24px; }
.gauge-val { font-size: 50px; font-weight: 400; font-family: "DM Serif Display", serif; background: linear-gradient(135deg, var(--gold-300), var(--gold-500)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
.gauge-lbl { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
.gauge-badge { margin-top: 12px; }

.report-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; align-content: center; }
.meta-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.meta-item .mv { color: var(--text-primary); font-weight: 600; }
.meta-bar-wrap { display: flex; align-items: center; gap: 10px; grid-column: 1 / -1; }
.meta-bar-wrap .mk { color: var(--text-muted); font-size: 12px; width: 60px; }
.meta-bar { flex: 1; max-width: 280px; height: 5px; background: rgba(22,18,32,0.8); border-radius: 10px; overflow: hidden; }
.meta-bar .fill { height: 100%; background: linear-gradient(90deg, var(--gold-500), var(--gold-300)); border-radius: 10px; transition: width 1.5s; }
.meta-bar-wrap .mpct { font-size: 12px; font-weight: 700; color: var(--gold-400); }

.dash-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.radar-card { grid-column: 1 / 2; }
.skills-card { grid-column: 2 / 6; }

.radar-inner { display: flex; gap: 14px; align-items: center; }
.radar-svg-wrap { flex-shrink: 0; }
.radar-list { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.dim-row { display: flex; align-items: center; gap: 6px; }
.dim-row .dn { font-size: 11px; color: var(--text-secondary); width: 48px; flex-shrink: 0; }
.dim-row .db { flex: 1; height: 4px; background: rgba(22,18,32,0.8); border-radius: 10px; overflow: hidden; }
.dim-row .db .fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, var(--gold-500), var(--gold-300)); }
.dim-row .ds { font-size: 11px; font-weight: 700; color: var(--gold-400); width: 24px; text-align: right; }
.dim-row .dt { font-size: 9px; width: 28px; }
.t-up { color: #5c9a8a; }
.t-down { color: #b86a7a; }
.t-flat { color: var(--text-dim); }

.skills-colwrap { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; height: 100%; }
.skill-group { display: flex; flex-direction: column; gap: 8px; }
.skill-group .sg-hdr { font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.skill-bubbles { display: flex; flex-wrap: wrap; gap: 5px; }
.skill-b { padding: 4px 12px; border-radius: 14px; font-size: 11px; font-weight: 600; cursor: default; }
.sb-core { background: rgba(92,154,138,0.1); color: #5c9a8a; }
.sb-found { background: rgba(201,168,76,0.08); color: var(--gold-400); }
.sb-add { background: rgba(148,163,184,0.06); color: #94a3b8; }

.wst-grid { display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 14px; margin-bottom: 20px; }
.wcard { border-radius: 14px; padding: 18px; background: rgba(244,63,94,0.03); }
.wcard h4 { font-size: 12px; color: #b86a7a; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.wcard ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.wcard li { font-size: 12px; color: var(--text-secondary); line-height: 1.5; padding-left: 14px; position: relative; }
.wcard li::before { content: '•'; position: absolute; left: 0; color: #b86a7a; }

.scard { border-radius: 14px; padding: 18px; background: rgba(16,185,129,0.03); }
.scard h4 { font-size: 12px; color: #5c9a8a; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.scard ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.scard li { font-size: 12px; color: var(--text-secondary); line-height: 1.5; padding-left: 14px; position: relative; }
.scard li::before { content: '✓'; position: absolute; left: 0; color: #5c9a8a; }

.ms-wrap { border-radius: 14px; padding: 18px; background: rgba(22,18,32,0.15); }
.ms-wrap h4 { font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
.ms-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ms-item { padding: 12px; border-radius: 10px; background: rgba(22,18,32,0.25); position: relative; }
.ms-item .num { width: 22px; height: 22px; border-radius: 50%; background: rgba(22,18,32,0.5); border: 1px solid rgba(201,168,76,0.15); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; color: var(--gold-400); margin-bottom: 6px; }
.ms-item h5 { font-size: 12px; color: var(--text-primary); font-weight: 600; }
.ms-item p { font-size: 11px; color: var(--text-muted); line-height: 1.4; }

.res-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 10px; }
.res-item { padding: 14px; border-radius: 12px; background: rgba(22,18,32,0.15); }
.res-item h5 { font-size: 13px; color: var(--text-primary); margin-bottom: 4px; font-weight: 600; }
.res-item p { font-size: 11px; color: var(--text-muted); line-height: 1.5; }
.res-item .d-tag { margin-bottom: 6px; }

.rfooter { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-dim); padding: 4px 4px 0; align-items: center; }

/* ===== STATS ===== */
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
.stat-item { text-align: center; padding: 20px 12px; }
.stat-item .sn { font-size: 28px; font-weight: 900; background: linear-gradient(135deg, var(--gold-300), var(--gold-500)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
.stat-item .sl { font-size: 12px; color: var(--text-muted); margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 4px; }
.stat-item .ss { font-size: 10px; color: var(--text-dim); margin-top: 2px; }

.stat-chart-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; margin-bottom: 20px; }

.bar-chart-wrap { height: 170px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; padding: 8px 4px 0; position: relative; }
.bar-chart-wrap::before { content: ''; position: absolute; left: 0; right: 0; bottom: 36px; height: 1px; background: rgba(201,168,76,0.06); }
.bar-group { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.bar-group .bar { width: 100%; max-width: 44px; border-radius: 4px 4px 0 0; transition: height 1.2s; position: relative; }
.bar-group .bar:hover { opacity: 0.7; }
.bar-group .bar.bar-glow { box-shadow: 0 0 12px rgba(201,168,76,0.3); }
.bar-group .bar .bar-tip { display: none; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: #161220; padding: 2px 8px; border-radius: 6px; font-size: 10px; white-space: nowrap; color: var(--text-primary); }
.bar-group .bar:hover .bar-tip { display: block; }
.bar-group .bar-lbl { font-size: 10px; color: var(--text-dim); }
.bar-group .bar-lbl.bar-today { color: var(--gold-400); font-weight: 700; }
.avg-line { position: absolute; left: 0; right: 0; border-top: 1.5px dashed rgba(148,163,184,0.25); pointer-events: none; }
.avg-line .avg-label { position: absolute; right: -24px; top: -7px; font-size: 8px; color: rgba(148,163,184,0.3); }

.rings2 { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 12px; padding: 4px 0; }
.rings2 .ri { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.rings2 .ri .rv { width: 68px; height: 68px; border-radius: 50%; position: relative; }
.rings2 .ri .rv .rn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; color: var(--text-primary); }
.rings2 .ri .rl { font-size: 11px; color: var(--text-muted); }

.stat-bot-row { display: grid; grid-template-columns: 1.2fr 0.9fr 1fr; gap: 18px; margin-bottom: 20px; }

.period-stack { display: flex; flex-direction: column; gap: 12px; }
.period-bar-wrap { height: 34px; border-radius: 10px; overflow: hidden; display: flex; background: rgba(22,18,32,0.5); }
.period-bar-wrap .seg { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.8); }
.period-legend { display: flex; gap: 16px; flex-wrap: wrap; }
.period-legend .pl-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); }
.period-legend .pl-item .dot { width: 8px; height: 8px; border-radius: 4px; }
.period-mini { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 8px; }
.period-mini > div { text-align: center; padding: 8px; border-radius: 10px; background: rgba(22,18,32,0.2); }
.period-mini .pm-label { display: block; font-size: 10px; color: var(--text-muted); margin-top: 2px; }

.eff-grid { display: flex; flex-direction: column; gap: 10px; }
.eff-item .eff-hdr { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; }
.eff-item .eff-hdr .eff-name { color: var(--text-secondary); }
.eff-item .eff-hdr .eff-score { font-weight: 700; }
.eff-item .eff-bar { height: 5px; background: rgba(22,18,32,0.7); border-radius: 6px; overflow: hidden; }
.eff-item .eff-bar .fill { height: 100%; border-radius: 6px; transition: width 1s; }
.eff-summary { margin-top: 12px; padding: 8px 12px; border-radius: 10px; background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.08); display: flex; justify-content: space-between; font-size: 11px; }
.eff-summary span:first-child { color: var(--text-muted); }

.lchart { height: 150px; }
.lchart svg { width: 100%; height: 100%; }

.insight { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(201,168,76,0.05); }
.insight .ib-lbl { font-size: 11px; color: var(--text-muted); }
.insight .ib-val { font-size: 14px; font-weight: 700; }

/* ===== ACHIEVEMENTS ===== */
.ach-top { display: flex; gap: 40px; margin-bottom: 22px; flex-wrap: wrap; }
.ach-top .at-item { text-align: center; }
.ach-top .at-item .atn { font-size: 24px; font-weight: 800; color: var(--text-primary); }
.ach-top .at-item .atl { font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; justify-content: center; }

.ach-cats { display: flex; gap: 6px; margin-bottom: 22px; flex-wrap: wrap; }
.ach-cats button { padding: 6px 18px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: var(--text-muted); transition: all .2s; display: flex; align-items: center; gap: 4px; }
.ach-cats button:hover { color: var(--gold-400); background: rgba(201,168,76,0.08); }
.ach-cats button.active { background: rgba(201,168,76,0.12); color: var(--gold-400); }

.ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.ach-c { text-align: center; padding: 20px 12px; cursor: pointer; transition: all .3s; }
.ach-c:hover { transform: translateY(-3px); }
.ach-c.locked { opacity: 0.3; filter: grayscale(0.7); cursor: default; pointer-events: none; }
.ach-c .ai { width: 46px; height: 46px; margin: 0 auto 10px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: rgba(201,168,76,0.05); }
.ach-c h4 { font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
.ach-c p { font-size: 10px; color: var(--text-muted); line-height: 1.4; }
.ach-c .ad { font-size: 9px; color: var(--text-dim); margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 3px; }

.ach-prog { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; text-align: center; }
.ap-item .apn { font-size: 20px; font-weight: 800; }
.ap-item .apl { font-size: 10px; color: var(--text-muted); margin-top: 2px; }
.ap-item .apb { height: 3px; background: rgba(22,18,32,0.7); border-radius: 4px; margin-top: 8px; overflow: hidden; }
.ap-item .apb .fill { height: 100%; border-radius: 4px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .dash-grid { grid-template-columns: 1fr 1fr; }
  .radar-card { grid-column: 1 / -1; }
  .skills-card { grid-column: 1 / -1; }
  .wst-grid { grid-template-columns: 1fr; }
  .ms-list { grid-template-columns: repeat(4, 1fr); }
  .stat-chart-row { grid-template-columns: 1fr; }
  .stat-bot-row { grid-template-columns: 1fr 1fr; }
  .report-top { grid-template-columns: 1fr; }
  .report-meta { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .d-container { padding: 0 24px; }
  .d-divider { padding: 0 24px; }
  .dash-grid { grid-template-columns: 1fr; }
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .stat-chart-row { grid-template-columns: 1fr; }
  .stat-bot-row { grid-template-columns: 1fr; }
  .hm-bot { grid-template-columns: 1fr; }
  .ms-list { grid-template-columns: 1fr 1fr; }
  .res-grid { grid-template-columns: 1fr; }
  .ach-grid { grid-template-columns: repeat(2, 1fr); }
  .ach-prog { grid-template-columns: repeat(2, 1fr); }
  .skills-colwrap { grid-template-columns: 1fr; }
}
</style>
