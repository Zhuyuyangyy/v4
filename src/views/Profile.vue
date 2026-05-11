<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Clock,
  Zap,
  BookOpen,
  Award,
  Target,
  FileText,
  Sparkles,
  TrendingUp,
  Activity,
  BarChart3,
  Brain,
  ChevronRight,
} from 'lucide-vue-next'

const loaded = ref(false)

const dimensions = [
  { label: '知识基础', value: 78, color: '#00d4ff' },
  { label: '学习速度', value: 65, color: '#3b82f6' },
  { label: '逻辑思维', value: 82, color: '#7c3aed' },
  { label: '创造力', value: 70, color: '#06d6a0' },
  { label: '专注力', value: 55, color: '#f59e0b' },
  { label: '自律性', value: 60, color: '#f43f5e' },
]

const weaknesses = [
  { tag: '概率论', count: 12 },
  { tag: 'Python 高级', count: 8 },
  { tag: '数据结构', count: 7 },
  { tag: '线性代数', count: 6 },
  { tag: '微积分', count: 5 },
  { tag: '算法分析', count: 4 },
  { tag: '数据库', count: 3 },
  { tag: '深度学习', count: 3 },
  { tag: '网络协议', count: 2 },
]

const timeline = [
  { date: '2026-05-10', event: '完成机器学习入门评估', score: '+15%', type: 'up' },
  { date: '2026-05-08', event: '更新学习目标：深度学习方向', score: '', type: '' },
  { date: '2026-05-05', event: '薄弱点检测：概率论基础', score: '-8%', type: 'down' },
  { date: '2026-05-05', event: '完成数据结构阶段测评', score: '+12%', type: 'up' },
  { date: '2026-05-01', event: '首次画像建立', score: '', type: '' },
]

const overviewStats = [
  { label: '累计学习', value: '128h', icon: Clock, color: '#00d4ff' },
  { label: '连续打卡', value: '23天', icon: Zap, color: '#06d6a0' },
  { label: '完成课程', value: '18门', icon: BookOpen, color: '#7c3aed' },
  { label: '获得徽章', value: '9个', icon: Award, color: '#f59e0b' },
]

const skillTree = [
  {
    category: '编程基础',
    color: '#00d4ff',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 60 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    category: '数据科学',
    color: '#7c3aed',
    skills: [
      { name: 'NumPy/Pandas', level: 75 },
      { name: '数据可视化', level: 65 },
      { name: '统计分析', level: 55 },
    ],
  },
  {
    category: '机器学习',
    color: '#06d6a0',
    skills: [
      { name: '监督学习', level: 70 },
      { name: '无监督学习', level: 50 },
      { name: '模型评估', level: 45 },
    ],
  },
  {
    category: '深度学习',
    color: '#f59e0b',
    skills: [
      { name: '神经网络', level: 40 },
      { name: 'CNN/RNN', level: 25 },
      { name: 'Transformer', level: 15 },
    ],
  },
]

const streakDays = [
  { day: '一', active: true },
  { day: '二', active: true },
  { day: '三', active: true },
  { day: '四', active: false },
  { day: '五', active: true },
  { day: '六', active: true },
  { day: '日', active: false },
]

function radarPoints(cx: number, cy: number, r: number) {
  return dimensions.map((d, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    const val = d.value / 100
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }
  })
}

const cx = 140, cy = 140, r = 115
const points = radarPoints(cx, cy, r)
const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]

function skillLevelColor(val: number) {
  if (val >= 80) return '#06d6a0'
  if (val >= 60) return '#00d4ff'
  if (val >= 40) return '#f59e0b'
  return '#f43f5e'
}

const totalScore = Math.round(dimensions.reduce((s, d) => s + d.value, 0) / dimensions.length)

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
})
</script>

<template>
  <div class="profile">
    <!-- Hero Section -->
    <div class="profile-hero">
      <div class="hero-content">
        <div class="hero-badge">学习画像</div>
        <h1 class="hero-title">你的多维学习<span class="gradient-text">能力图谱</span></h1>
        <p class="hero-desc">AI 驱动的多维度学习分析，全面了解你的学习特征与能力水平</p>
      </div>
      <div class="hero-score">
        <div class="score-ring">
          <svg viewBox="0 0 100 100" class="score-svg">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" stroke-width="4"
              stroke-linecap="round"
              :stroke-dasharray="263.9"
              :stroke-dashoffset="loaded ? 263.9 * (1 - totalScore / 100) : 263.9"
              transform="rotate(-90 50 50)"
              class="score-arc"
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div class="score-inner">
            <span class="score-num">{{ totalScore }}</span>
            <span class="score-label">综合</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row">
      <div v-for="s in overviewStats" :key="s.label" class="stat-card" :style="{ '--stat-color': s.color }">
        <div class="stat-icon-wrap">
          <component :is="s.icon" :size="18" stroke-width="1.5" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
        <div class="stat-glow" />
      </div>
    </div>

    <!-- Main Layout -->
    <div class="profile-layout">
      <!-- Left Column -->
      <div class="profile-left">
        <!-- Radar Card -->
        <div class="card radar-card">
          <div class="card-header">
            <h2 class="card-title">能力雷达</h2>
            <span class="card-badge">6 维评估</span>
          </div>
          <div class="radar-body">
            <svg viewBox="0 0 280 280" class="radar-svg">
              <polygon
                v-for="level in gridLevels" :key="level"
                :points="dimensions.map((_, i) => {
                  const a = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
                  return `${cx + r * level * Math.cos(a)},${cy + r * level * Math.sin(a)}`
                }).join(' ')"
                fill="none" stroke="rgba(0,212,255,0.05)" stroke-width="1"
              />
              <line
                v-for="(_, i) in dimensions" :key="'ax'+i"
                :x1="cx" :y1="cy"
                :x2="cx + r * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
                :y2="cy + r * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
                stroke="rgba(0,212,255,0.05)" stroke-width="1"
              />
              <polygon
                :points="points.map(p => `${p.x},${p.y}`).join(' ')"
                :fill="loaded ? 'rgba(0,212,255,0.1)' : 'transparent'"
                :stroke="loaded ? '#00d4ff' : 'transparent'"
                stroke-width="2.5" class="radar-fill"
                stroke-linejoin="round"
              />
              <circle
                v-for="(p, i) in points" :key="'pt'+i"
                :cx="p.x" :cy="p.y" r="5"
                :fill="dimensions[i].color"
                :class="{ 'radar-point': true, visible: loaded }"
              />
              <text
                v-for="(d, i) in dimensions" :key="'lb'+i"
                :x="cx + (r + 28) * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
                :y="cy + (r + 28) * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
                text-anchor="middle" dominant-baseline="middle"
                fill="#8892b0" font-size="12" font-family="Outfit, sans-serif"
              >{{ d.label }}</text>
            </svg>
          </div>
        </div>

        <!-- Weakness Card -->
        <div class="card weakness-card">
          <div class="card-header">
            <h2 class="card-title">薄弱知识点</h2>
            <span class="card-badge">{{ weaknesses.length }} 项</span>
          </div>
          <div class="weakness-cloud">
            <span v-for="w in weaknesses" :key="w.tag" class="weakness-tag" :style="{
              fontSize: `${12 + w.count * 1.2}px`,
              opacity: 0.5 + w.count * 0.04,
              '--tag-hue': `${200 + w.count * 5}`,
            }">
              {{ w.tag }}
              <span class="weakness-count">{{ w.count }}</span>
            </span>
          </div>
          <div class="streak-section">
            <div class="streak-header">
              <span>本周学习</span>
              <span class="streak-score">5/7 天</span>
            </div>
            <div class="streak-grid">
              <div v-for="d in streakDays" :key="d.day" :class="['streak-cell', { active: d.active }]">
                <span>{{ d.day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="profile-right">
        <!-- Skill Tree Card -->
        <div class="card skill-card">
          <div class="card-header">
            <h2 class="card-title">技能树</h2>
            <span class="card-badge">9 / 24</span>
          </div>
          <div class="skill-groups">
            <div v-for="g in skillTree" :key="g.category" class="skill-group">
              <div class="skill-group-header">
                <span class="skill-group-dot" :style="{ background: g.color }" />
                <span class="skill-group-name">{{ g.category }}</span>
                <span class="skill-group-avg">
                  {{ Math.round(g.skills.reduce((s, sk) => s + sk.level, 0) / g.skills.length) }}%
                </span>
              </div>
              <div v-for="sk in g.skills" :key="sk.name" class="skill-row">
                <span class="skill-name">{{ sk.name }}</span>
                <div class="skill-track">
                  <div
                    class="skill-fill"
                    :style="{
                      width: loaded ? sk.level + '%' : '0%',
                      background: skillLevelColor(sk.level),
                    }"
                  />
                </div>
                <span class="skill-pct" :style="{ color: skillLevelColor(sk.level) }">{{ sk.level }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Card -->
        <div class="card prefs-card">
          <div class="card-header">
            <h2 class="card-title">学习偏好</h2>
          </div>
          <div class="prefs-grid">
            <div class="pref-item">
              <div class="pref-icon" style="--pf-color: #00d4ff">
                <Clock :size="16" stroke-width="1.5" />
              </div>
              <div class="pref-info">
                <span class="pref-label">最佳时段</span>
                <span class="pref-value">晚间 20:00-23:00</span>
              </div>
            </div>
            <div class="pref-item">
              <div class="pref-icon" style="--pf-color: #7c3aed">
                <FileText :size="16" stroke-width="1.5" />
              </div>
              <div class="pref-info">
                <span class="pref-label">资源偏好</span>
                <span class="pref-value">视频 > 习题 > 文档</span>
              </div>
            </div>
            <div class="pref-item">
              <div class="pref-icon" style="--pf-color: #06d6a0">
                <Target :size="16" stroke-width="1.5" />
              </div>
              <div class="pref-info">
                <span class="pref-label">学习目标</span>
                <span class="pref-value">深度学习工程师 · 6 个月</span>
              </div>
            </div>
            <div class="pref-item">
              <div class="pref-icon" style="--pf-color: #f59e0b">
                <TrendingUp :size="16" stroke-width="1.5" />
              </div>
              <div class="pref-info">
                <span class="pref-label">学习节奏</span>
                <span class="pref-value">每周 8-10 小时</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Card -->
        <div class="card timeline-card">
          <div class="card-header">
            <h2 class="card-title">画像演变</h2>
            <span class="card-badge">近 10 天</span>
          </div>
          <div class="timeline-list">
            <div v-for="(t, i) in timeline" :key="i" class="timeline-item">
              <div class="timeline-marker">
                <div :class="['timeline-dot', { latest: i === 0, down: t.type === 'down' }]" />
                <div v-if="i < timeline.length - 1" class="timeline-line" />
              </div>
              <div class="timeline-body">
                <span class="timeline-date">{{ t.date }}</span>
                <span class="timeline-event">{{ t.event }}</span>
                <span v-if="t.score" :class="['timeline-score', t.type]">{{ t.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ====================== Hero ====================== */
.profile-hero {
  padding: 48px 40px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.hero-content { flex: 1; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-bottom: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  max-width: 400px;
  line-height: 1.6;
}

.hero-score {
  flex-shrink: 0;
}

.score-ring {
  position: relative;
  width: 88px;
  height: 88px;
}

.score-svg { width: 100%; height: 100%; }

.score-arc {
  transition: stroke-dashoffset 0.8s var(--ease-out);
}

.score-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-num {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.score-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

/* ====================== Stats Row ====================== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0 40px;
  margin-bottom: 28px;
}

.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s var(--ease-out);
}
.stat-card:hover {
  border-color: var(--stat-color);
  transform: translateY(-2px);
}

.stat-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--stat-color) 12%, transparent);
  color: var(--stat-color);
  flex-shrink: 0;
}

.stat-info { display: flex; flex-direction: column; gap: 2px; }
.stat-value {
  font-family: var(--font-display);
  font-size: 22px;
  color: #fff;
  line-height: 1;
}
.stat-label { font-size: 11px; color: var(--color-text-tertiary); }

.stat-glow {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--stat-color) 8%, transparent), transparent);
  pointer-events: none;
}

/* ====================== Layout ====================== */
.profile-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 20px;
  padding: 0 40px 40px;
}

.profile-left { display: flex; flex-direction: column; gap: 20px; }
.profile-right { display: flex; flex-direction: column; gap: 20px; }

/* ====================== Common Card ====================== */
.card {
  padding: 24px;
  border-radius: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: border-color 0.2s var(--ease-out);
}
.card:hover { border-color: rgba(0, 212, 255, 0.1); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

.card-badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.06);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.08);
  font-weight: 500;
}

/* ====================== Radar ====================== */
.radar-body {
  display: flex;
  justify-content: center;
}

.radar-svg {
  width: 260px;
  height: 260px;
}

.radar-fill {
  transition: fill 0.5s var(--ease-out), stroke 0.5s var(--ease-out);
}

.radar-point {
  transition: r 0.3s var(--ease-out);
}

/* ====================== Weakness ====================== */
.weakness-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 4px 0;
  align-items: center;
  min-height: 80px;
}

.weakness-tag {
  color: hsl(var(--tag-hue), 80%, 60%);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  transition: all 0.2s var(--ease-out);
}
.weakness-tag:hover {
  filter: brightness(1.3);
  background: rgba(255, 255, 255, 0.03);
}

.weakness-count {
  font-size: 10px;
  font-family: var(--font-mono);
  opacity: 0.5;
}

.streak-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.streak-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
}

.streak-score {
  font-family: var(--font-mono);
  color: var(--color-accent-emerald);
  font-weight: 600;
}

.streak-grid {
  display: flex;
  gap: 6px;
}

.streak-cell {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
}
.streak-cell.active {
  background: rgba(6, 214, 160, 0.12);
  border-color: rgba(6, 214, 160, 0.3);
  color: var(--color-accent-emerald);
  box-shadow: 0 0 12px rgba(6, 214, 160, 0.1);
}

/* ====================== Skill Tree ====================== */
.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skill-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.skill-group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.skill-group-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  flex: 1;
}

.skill-group-avg {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.skill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0 5px 16px;
}

.skill-name {
  font-size: 13px;
  color: var(--color-text-secondary);
  width: 100px;
  flex-shrink: 0;
}

.skill-track {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s var(--ease-out);
}

.skill-pct {
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 600;
  width: 34px;
  text-align: right;
}

/* ====================== Preferences ====================== */
.prefs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.pref-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  transition: all 0.2s var(--ease-out);
}
.pref-item:hover {
  border-color: var(--pf-color);
  background: color-mix(in srgb, var(--pf-color) 4%, transparent);
}

.pref-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--pf-color) 12%, transparent);
  color: var(--pf-color);
  flex-shrink: 0;
}

.pref-info { display: flex; flex-direction: column; gap: 1px; }
.pref-label { font-size: 11px; color: var(--color-text-tertiary); }
.pref-value { font-size: 13px; font-weight: 500; color: var(--color-text-primary); }

/* ====================== Timeline ====================== */
.timeline-list {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 14px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  border: 2px solid var(--color-accent-cyan);
  flex-shrink: 0;
  transition: all 0.2s var(--ease-out);
}
.timeline-dot.latest {
  background: var(--color-accent-cyan);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
}
.timeline-dot.down {
  border-color: var(--color-accent-rose);
  background: rgba(244, 63, 94, 0.1);
}

.timeline-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
}

.timeline-body {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-date {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.timeline-event {
  font-size: 13px;
  color: var(--color-text-primary);
}

.timeline-score {
  display: inline-block;
  font-size: 11px;
  font-family: var(--font-mono);
  margin-top: 4px;
  padding: 2px 10px;
  border-radius: 6px;
  font-weight: 600;
  width: fit-content;
}
.timeline-score.up { color: var(--color-accent-emerald); background: rgba(6, 214, 160, 0.1); }
.timeline-score.down { color: var(--color-accent-rose); background: rgba(244, 63, 94, 0.1); }

/* ====================== Responsive ====================== */
@media (max-width: 900px) {
  .profile-hero { padding: 32px 20px 24px; flex-direction: column; align-items: flex-start; }
  .stats-row { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
  .profile-layout { padding: 0 20px 32px; grid-template-columns: 1fr; }
  .prefs-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 28px; }
}
</style>
