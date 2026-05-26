<script setup lang="ts">
import { computed } from 'vue'
import { Sparkles, X, RefreshCw } from 'lucide-vue-next'
import type { ProfileResult } from '@/composables/useProfileSurvey'

const props = defineProps<{
  result: ProfileResult
}>()

const emit = defineEmits<{
  close: []
  regenerate: []
}>()

/* ── Radar helpers ── */
const dimensions = computed(() => props.result.dimensions)
const cx = 170, cy = 170, r = 130
const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]

const points = computed(() => {
  const dims = dimensions.value
  if (!dims.length) return []
  return dims.map((d, i) => {
    const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2
    const val = d.value / 100
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }
  })
})

function skillLevelColor(val: number) {
  if (val >= 80) return '#06d6a0'
  if (val >= 60) return '#00d4ff'
  if (val >= 40) return '#f59e0b'
  return '#f43f5e'
}
</script>

<template>
  <div class="pres">
    <div class="pres-bg-stars">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" class="pres-stars-svg">
        <circle cx="120" cy="180" r="1.5" fill="rgba(0,212,255,0.15)" />
        <circle cx="280" cy="80" r="1" fill="rgba(0,212,255,0.12)" />
        <circle cx="55" cy="400" r="1.2" fill="rgba(124,58,237,0.12)" />
        <circle cx="90" cy="620" r="1" fill="rgba(0,212,255,0.08)" />
        <circle cx="1350" cy="150" r="1.5" fill="rgba(0,212,255,0.12)" />
        <circle cx="1380" cy="450" r="1" fill="rgba(124,58,237,0.1)" />
      </svg>
    </div>

    <!-- Header -->
    <div class="pres-header">
      <div>
        <span class="pres-badge">
          <Sparkles :size="11" stroke-width="1.5" />
          学习画像
        </span>
        <h1 class="pres-title">你的能力星图</h1>
        <p class="pres-sub">基于对话生成的个性化分析报告</p>
      </div>
      <div class="pres-actions">
        <button class="pres-btn" @click="emit('regenerate')">
          <RefreshCw :size="13" stroke-width="1.5" />
          重新生成
        </button>
        <button class="pres-btn pres-close-btn" @click="emit('close')">
          <X :size="16" stroke-width="1.5" />
        </button>
      </div>
    </div>

    <!-- Metrics -->
    <div class="pres-metrics">
      <span class="pres-metric">
        综合评分 <strong class="metric-val">{{ result.totalScore }}</strong>
      </span>
      <span class="pres-mdot" />
      <span class="pres-metric">
        最强维度 <strong class="metric-cyan">{{ result.stats[1]?.value }}</strong>
      </span>
      <span class="pres-mdot" />
      <span class="pres-metric">
        待提升 <strong class="metric-amber">{{ result.stats[2]?.value }}</strong>
      </span>
      <span class="pres-mdot" />
      <span class="pres-metric">
        学习阶段 <strong>{{ result.stats[3]?.value }}</strong>
      </span>
    </div>

    <div class="pres-divider" />

    <!-- Radar + Skills -->
    <div class="pres-two">
      <div class="pres-radar">
        <h2 class="pres-sec-title">能力雷达</h2>
        <div class="pres-radar-body">
          <svg viewBox="0 0 350 350" class="pres-radar-svg">
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
              v-if="points.length"
              :points="points.map(p => `${p.x},${p.y}`).join(' ')"
              fill="rgba(0,212,255,0.1)"
              stroke="#00d4ff" stroke-width="2.5" stroke-linejoin="round"
            />
            <circle
              v-for="(p, i) in points" :key="'pt'+i"
              :cx="p.x" :cy="p.y" r="5"
              :fill="dimensions[i].color"
            />
            <text
              v-for="(d, i) in dimensions" :key="'lb'+i"
              :x="cx + (r + 28) * Math.cos((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              :y="cy + (r + 28) * Math.sin((Math.PI * 2 * i) / dimensions.length - Math.PI / 2)"
              text-anchor="middle" dominant-baseline="middle"
              fill="#8892b0" font-size="13" font-family="Outfit, sans-serif"
            >{{ d.label }}</text>
          </svg>
        </div>
      </div>

      <div class="pres-skills">
        <h2 class="pres-sec-title">技能分布</h2>
        <div class="pres-skill-list">
          <div v-for="g in result.skillTree" :key="g.category" class="pres-skill-group">
            <div class="pres-skill-group-hd">
              <span class="pres-skill-dot" :style="{ background: g.color }" />
              <span class="pres-skill-cat">{{ g.category }}</span>
              <span class="pres-skill-avg">
                {{ Math.round(g.skills.reduce((s, sk) => s + sk.level, 0) / g.skills.length) }}%
              </span>
            </div>
            <div v-for="sk in g.skills" :key="sk.name" class="pres-skill-row">
              <span class="pres-skill-name">{{ sk.name }}</span>
              <div class="pres-skill-bar">
                <div class="pres-skill-fill" :style="{ width: sk.level + '%', background: skillLevelColor(sk.level) }" />
              </div>
              <span class="pres-skill-pct" :style="{ color: skillLevelColor(sk.level) }">{{ sk.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pres-divider" />

    <!-- Weaknesses -->
    <div class="pres-section">
      <h2 class="pres-sec-title">薄弱知识点</h2>
      <div class="pres-weak-cloud">
        <span v-for="w in result.weaknesses" :key="w.tag" class="pres-weak-tag">
          {{ w.tag }}
          <span class="pres-weak-count">{{ w.count }}</span>
        </span>
      </div>
    </div>

    <div class="pres-divider" />

    <!-- Recommendations + Preferences -->
    <div class="pres-two">
      <div class="pres-recs">
        <h2 class="pres-sec-title">学习建议</h2>
        <div class="pres-rec-list">
          <div v-for="(rec, i) in result.recommendations" :key="i" class="pres-rec-item">
            <span class="pres-rec-num">{{ i + 1 }}</span>
            <p class="pres-rec-text">{{ rec }}</p>
          </div>
        </div>
      </div>

      <div class="pres-side">
        <h2 class="pres-sec-title">学习偏好</h2>
        <ul class="pres-pref-list">
          <li v-for="p in result.preferences" :key="p.label" class="pres-pref-item">
            <span class="pres-pref-lbl">{{ p.label }}</span>
            <span class="pres-pref-val">{{ p.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pres {
  position: relative;
  padding: 40px 48px 56px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.pres-bg-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px;
}

.pres-stars-svg {
  width: 100%;
  height: 100%;
}

/* Header */
.pres-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.pres-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.07);
  color: var(--color-accent-cyan);
  border: 1px solid rgba(0, 212, 255, 0.1);
  margin-bottom: 10px;
}

.pres-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
  color: #e8edf5;
  margin-bottom: 6px;
}

.pres-sub {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

.pres-actions {
  display: flex;
  gap: 8px;
}

.pres-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.pres-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.pres-close-btn {
  padding: 8px;
}

/* Metrics */
.pres-metrics {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.pres-metric {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

.pres-metric strong { font-weight: 600; color: #e8edf5; margin-left: 6px; }
.metric-val { font-family: var(--font-mono); font-size: 18px; }
.metric-cyan { color: var(--color-accent-cyan); }
.metric-amber { color: var(--color-accent-amber); }

.pres-mdot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-text-tertiary);
  opacity: 0.3;
}

.pres-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.04);
  margin: 24px 0 28px;
  position: relative;
  z-index: 1;
}

/* Section titles */
.pres-sec-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: #e8edf5;
  margin-bottom: 16px;
}

/* Two column */
.pres-two {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: start;
  position: relative;
  z-index: 1;
}

@media (max-width: 820px) { .pres-two { grid-template-columns: 1fr; gap: 24px; } }

/* Radar */
.pres-radar-body {
  display: flex;
  justify-content: center;
}

.pres-radar-svg {
  width: 300px;
  height: 300px;
}

/* Skills */
.pres-skill-list { display: flex; flex-direction: column; gap: 16px; }

.pres-skill-group-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.pres-skill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.pres-skill-cat { font-size: 14px; font-weight: 600; color: var(--color-text-primary); flex: 1; }
.pres-skill-avg { font-size: 12px; font-family: var(--font-mono); color: var(--color-text-tertiary); }

.pres-skill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0 4px 16px;
}

.pres-skill-name { font-size: 13px; color: var(--color-text-secondary); width: 90px; flex-shrink: 0; }
.pres-skill-bar { flex: 1; height: 5px; border-radius: 3px; background: rgba(255,255,255,0.04); overflow: hidden; }
.pres-skill-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
.pres-skill-pct { font-size: 12px; font-family: var(--font-mono); font-weight: 600; width: 34px; text-align: right; }

/* Weaknesses */
.pres-weak-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.pres-weak-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: #7eb8d4;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.08);
}

.pres-weak-count { font-size: 11px; font-family: var(--font-mono); opacity: 0.45; }

/* Recommendations */
.pres-rec-list { display: flex; flex-direction: column; gap: 10px; }
.pres-rec-item { display: flex; gap: 12px; align-items: flex-start; }
.pres-rec-num {
  width: 24px; height: 24px; border-radius: 50%;
  background: rgba(0,212,255,0.08);
  color: var(--color-accent-cyan);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.pres-rec-text { font-size: 14px; color: var(--color-text-secondary); line-height: 1.65; flex: 1; margin: 0; }

/* Preferences */
.pres-pref-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
}
.pres-pref-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.pres-pref-item:last-child { border-bottom: none; }
.pres-pref-lbl { font-size: 13px; color: var(--color-text-tertiary); width: 70px; flex-shrink: 0; }
.pres-pref-val { font-size: 14px; font-weight: 500; color: var(--color-text-primary); }

@media (max-width: 600px) {
  .pres { padding: 24px 16px 32px; }
  .pres-title { font-size: 24px; }
  .pres-metrics { flex-direction: column; gap: 6px; }
  .pres-mdot { display: none; }
  .pres-radar-svg { width: 240px; height: 240px; }
}
</style>
