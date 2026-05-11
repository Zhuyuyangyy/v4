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

const cx = 120, cy = 120, r = 100
const points = radarPoints(cx, cy, r)
const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]

function skillLevelColor(val: number) {
  if (val >= 80) return '#06d6a0'
  if (val >= 60) return '#00d4ff'
  if (val >= 40) return '#f59e0b'
  return '#f43f5e'
}

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 200)
})
</script>

<template>
  <div class="profile">
    <div class="page-header reveal">
      <h1 class="page-title">学习画像</h1>
      <p class="page-desc">AI 驱动的多维度学习分析，全面了解你的学习状态与能力成长</p>
    </div>

    <!-- Overview Stats -->
    <div class="overview-stats reveal reveal-delay-1">
      <div v-for="s in overviewStats" :key="s.label" class="overview-card" :style="{ '--card-accent': s.color }">
        <component :is="s.icon" :size="26" stroke-width="1.5" class="overview-icon" :style="{ color: s.color }" />
        <div class="overview-info">
          <span class="overview-value">{{ s.value }}</span>
          <span class="overview-label">{{ s.label }}</span>
        </div>
        <div class="overview-glow" />
      </div>
    </div>

    <div class="profile-grid">
      <!-- Radar Chart -->
      <div :class="['card radar-card reveal reveal-delay-2', { visible: loaded }]">
        <div class="card-header">
          <h2 class="card-title">能力雷达</h2>
          <span class="card-badge">综合评分 68%</span>
        </div>
        <div class="radar-container">
          <svg viewBox="0 0 240 240" class="radar-svg">
            <!-- Grid levels -->
            <polygon
              v-for="level in gridLevels"
              :key="level"
              :points="dimensions.map((_, i) => {
                const a = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
                const x = cx + r * level * Math.cos(a)
                const y = cy + r * level * Math.sin(a)
                return `${x},${y}`
              }).join(' ')"
              fill="none"
              :stroke="'rgba(0,212,255,0.06)'"
              stroke-width="1"
            />
            <!-- Axis lines -->
            <line
              v-for="(_, i) in dimensions"
              :key="'axis'+i"
              :x1="cx" :y1="cy"
              :x2="cx + r * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              :y2="cy + r * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              stroke="rgba(0,212,255,0.06)"
              stroke-width="1"
            />
            <!-- Data polygon -->
            <polygon
              :points="points.map(p => `${p.x},${p.y}`).join(' ')"
              :fill="loaded ? 'rgba(0,212,255,0.12)' : 'transparent'"
              :stroke="loaded ? '#00d4ff' : 'transparent'"
              stroke-width="2.5"
              class="radar-data"
            />
            <!-- Data points -->
            <circle
              v-for="(p, i) in points"
              :key="'pt'+i"
              :cx="p.x" :cy="p.y"
              r="4.5"
              :fill="dimensions[i].color"
              class="radar-point"
            />
            <!-- Labels -->
            <text
              v-for="(d, i) in dimensions"
              :key="'label'+i"
              :x="cx + (r + 28) * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              :y="cy + (r + 28) * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#8892b0"
              font-size="11"
              font-family="Outfit, sans-serif"
            >
              {{ d.label }}
            </text>
          </svg>
        </div>
        <div class="radar-stats">
          <div v-for="d in dimensions" :key="d.label" class="stat-row">
            <div class="stat-label">
              <span class="stat-dot" :style="{ background: d.color }" />
              {{ d.label }}
            </div>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: loaded ? d.value + '%' : '0%', background: d.color }" />
            </div>
            <span class="stat-value">{{ d.value }}%</span>
          </div>
        </div>
      </div>

      <!-- Skill Tree -->
      <div :class="['card skill-card reveal reveal-delay-3', { visible: loaded }]">
        <div class="card-header">
          <h2 class="card-title">技能树</h2>
          <span class="card-badge">9/24 技能</span>
        </div>
        <div class="skill-tree">
          <div v-for="group in skillTree" :key="group.category" class="skill-group">
            <div class="skill-group-header">
              <span class="skill-group-dot" :style="{ background: group.color }" />
              <span class="skill-group-name">{{ group.category }}</span>
            </div>
            <div class="skill-items">
              <div v-for="sk in group.skills" :key="sk.name" class="skill-item">
                <div class="skill-item-top">
                  <span class="skill-name">{{ sk.name }}</span>
                  <span class="skill-level" :style="{ color: skillLevelColor(sk.level) }">{{ sk.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-bar-fill" :style="{ width: loaded ? sk.level + '%' : '0%', background: skillLevelColor(sk.level) }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Weakness Cloud + Streak -->
      <div :class="['card cloud-card reveal reveal-delay-4', { visible: loaded }]">
        <div class="card-header">
          <h2 class="card-title">薄弱知识点</h2>
          <span class="card-badge">{{ weaknesses.length }} 项</span>
        </div>
        <p class="card-sub">基于学习数据分析的高频薄弱点，建议优先复习</p>
        <div class="cloud">
          <span
            v-for="w in weaknesses"
            :key="w.tag"
            class="cloud-tag"
            :style="{
              fontSize: `${12 + w.count * 1.5}px`,
              opacity: 0.5 + w.count * 0.04,
              '--tag-color': `hsl(${200 + w.count * 5}, 80%, 60%)`,
            }"
          >
            {{ w.tag }}
            <span class="cloud-count">{{ w.count }}</span>
          </span>
        </div>

        <!-- Streak -->
        <div class="streak-section">
          <div class="streak-header">
            <span class="streak-title">本周学习</span>
            <span class="streak-days">5/7 天</span>
          </div>
          <div class="streak-grid">
            <div v-for="d in streakDays" :key="d.day" :class="['streak-day', { active: d.active }]">
              <span>{{ d.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Preferences -->
      <div :class="['card pref-card reveal reveal-delay-5', { visible: loaded }]">
        <div class="card-header">
          <h2 class="card-title">学习偏好</h2>
          <span class="card-badge">个性化</span>
        </div>
        <div class="pref-grid">
          <div class="pref-item">
            <span class="pref-icon pref-icon-time">
              <Clock :size="20" stroke-width="1.5" />
            </span>
            <div>
              <div class="pref-label">最佳学习时段</div>
              <div class="pref-value">晚间 20:00 - 23:00</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-doc">
              <FileText :size="20" stroke-width="1.5" />
            </span>
            <div>
              <div class="pref-label">偏好资源类型</div>
              <div class="pref-value">视频教程 > 习题实践 > 文档阅读</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-target">
              <Target :size="20" stroke-width="1.5" />
            </span>
            <div>
              <div class="pref-label">学习目标</div>
              <div class="pref-value">深度学习工程师 · 6 个月</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-energy">
              <Zap :size="20" stroke-width="1.5" />
            </span>
            <div>
              <div class="pref-label">学习节奏</div>
              <div class="pref-value">稳步推进 (每周 8-10 小时)</div>
            </div>
          </div>
          <div class="pref-item">
            <span class="pref-icon pref-icon-speed">
              <TrendingUp :size="20" stroke-width="1.5" />
            </span>
            <div>
              <div class="pref-label">学习风格</div>
              <div class="pref-value">理论与实践交替 (1:1 比例)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Evolution Timeline -->
      <div :class="['card timeline-card reveal reveal-delay-6', { visible: loaded }]">
        <div class="card-header">
          <h2 class="card-title">画像演变</h2>
          <span class="card-badge">近 10 天</span>
        </div>
        <div class="timeline">
          <div v-for="(t, i) in timeline" :key="i" class="timeline-item">
            <div class="timeline-marker">
              <span class="marker-dot" :class="{ latest: i === 0, down: t.type === 'down' }" />
              <span v-if="i < timeline.length - 1" class="marker-line" />
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ t.date }}</div>
              <div class="timeline-event">{{ t.event }}</div>
              <span v-if="t.score" :class="['timeline-score', t.type === 'up' ? 'up' : 'down']">
                {{ t.score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #fff;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* === Overview Stats === */
.overview-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.overview-card {
  position: relative;
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--card-accent);
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}
.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.overview-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, var(--card-accent) 0%, transparent 70%);
  opacity: 0.03;
  pointer-events: none;
}

.overview-icon {
  font-size: 28px;
  color: var(--card-accent);
  flex-shrink: 0;
}

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.overview-value {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  color: #fff;
}

.overview-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* === Grid === */
.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.card {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  transition: border-color var(--duration-normal) var(--ease-out);
}
.card:hover {
  border-color: rgba(0, 212, 255, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: #fff;
}

.card-badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.12);
  font-weight: 500;
}

.card-sub {
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin-bottom: 20px;
  line-height: 1.6;
}

/* === Radar === */
.radar-card {
  grid-column: 1;
}

.radar-container {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}

.radar-svg {
  width: 240px;
  height: 240px;
}

.radar-data {
  transition: all 0.8s var(--ease-out);
}

.radar-point {
  filter: drop-shadow(0 0 6px var(--color-accent-cyan));
}

.radar-stats {
  margin-top: 16px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-size: 13px;
}

.stat-label {
  width: 72px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s var(--ease-out);
}

.stat-value {
  width: 36px;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* === Skill Tree === */
.skill-card {
  grid-column: 2;
}

.skill-tree {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.skill-group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.skill-group-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: 0.3px;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 16px;
}

.skill-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.skill-name {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.skill-level {
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.skill-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s var(--ease-out);
}

/* === Cloud === */
.cloud-card {
  grid-column: 1 / 2;
}

.cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  min-height: 160px;
}

.cloud-tag {
  color: var(--tag-color, var(--color-accent-cyan));
  font-weight: 500;
  cursor: default;
  transition: all var(--duration-fast) var(--ease-out);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.cloud-tag:hover {
  filter: brightness(1.3);
  transform: scale(1.05);
}

.cloud-count {
  font-size: 10px;
  font-family: var(--font-mono);
  opacity: 0.5;
}

/* === Streak === */
.streak-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.streak-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.streak-title {
  font-size: 14px;
  font-weight: 600;
}

.streak-days {
  font-size: 12px;
  color: var(--color-accent-emerald);
  font-family: var(--font-mono);
}

.streak-grid {
  display: flex;
  gap: 8px;
}

.streak-day {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-tertiary);
  transition: all var(--duration-fast) var(--ease-out);
}
.streak-day.active {
  background: rgba(6, 214, 160, 0.12);
  border-color: rgba(6, 214, 160, 0.3);
  color: var(--color-accent-emerald);
  box-shadow: 0 0 12px rgba(6, 214, 160, 0.1);
}

/* === Preferences === */
.pref-card {
  grid-column: 1 / 2;
}

.pref-grid {
  display: grid;
  gap: 18px;
  margin-top: 4px;
}

.pref-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 0;
}

.pref-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(0, 212, 255, 0.06);
  flex-shrink: 0;
  font-size: 18px;
}

.pref-icon-time { background: rgba(0, 212, 255, 0.08); color: #00d4ff; }
.pref-icon-doc { background: rgba(124, 58, 237, 0.08); color: #7c3aed; }
.pref-icon-target { background: rgba(6, 214, 160, 0.08); color: #06d6a0; }
.pref-icon-energy { background: rgba(245, 158, 11, 0.08); color: #f59e0b; }
.pref-icon-speed { background: rgba(244, 63, 94, 0.08); color: #f43f5e; }

.pref-label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-bottom: 2px;
  letter-spacing: 0.3px;
}

.pref-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* === Timeline === */
.timeline-card {
  grid-column: 2;
}

.timeline {
  margin-top: 4px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
}

.marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.15);
  border: 2px solid var(--color-accent-cyan);
  flex-shrink: 0;
}
.marker-dot.latest {
  background: var(--color-accent-cyan);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.5);
}
.marker-dot.down {
  border-color: var(--color-accent-rose);
  background: rgba(244, 63, 94, 0.15);
}

.marker-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
}

.timeline-content {
  padding-bottom: 24px;
}

.timeline-date {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  margin-bottom: 4px;
}

.timeline-event {
  font-size: 14px;
  color: var(--color-text-primary);
}

.timeline-score {
  display: inline-block;
  font-size: 12px;
  font-family: var(--font-mono);
  margin-top: 6px;
  padding: 2px 10px;
  border-radius: 4px;
  font-weight: 600;
}
.timeline-score.up {
  color: var(--color-accent-emerald);
  background: rgba(6, 214, 160, 0.1);
}
.timeline-score.down {
  color: var(--color-accent-rose);
  background: rgba(244, 63, 94, 0.1);
}

@media (max-width: 900px) {
  .profile-grid { grid-template-columns: 1fr; }
  .radar-card, .skill-card, .cloud-card, .pref-card, .timeline-card {
    grid-column: 1;
  }
  .overview-stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
