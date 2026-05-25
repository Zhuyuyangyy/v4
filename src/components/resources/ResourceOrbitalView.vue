<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const CX = 540, CY = 470
const ORBITS = [
  { r: 160, phase: '当前 · 课中答疑', period: 22, color: '#06d6a0' },
  { r: 280, phase: '下一站 · 课后巩固', period: 40, color: '#00d4ff' },
  { r: 400, phase: '远期 · 期末测评', period: 70, color: '#f59e0b' },
]

interface Planet {
  o: number; angle: number; size: number; label: string;
  state: 'done' | 'current' | 'next' | 'upcoming' | 'locked' | 'goal';
  moons?: number; recommended?: boolean
}

const PLANETS: Planet[] = [
  { o: 0, angle: -130, size: 12, label: '神经网络基础', state: 'done', moons: 3 },
  { o: 0, angle: -45, size: 22, label: '卷积运算', state: 'current', moons: 4, recommended: true },
  { o: 0, angle: 50, size: 14, label: '池化层', state: 'next', moons: 2 },
  { o: 0, angle: 150, size: 11, label: '反向传播', state: 'upcoming', moons: 2 },
  { o: 1, angle: -70, size: 18, label: '经典 CNN 架构', state: 'locked' },
  { o: 1, angle: 20, size: 16, label: '调参与正则化', state: 'locked' },
  { o: 1, angle: 130, size: 14, label: '训练技巧', state: 'locked' },
  { o: 1, angle: -160, size: 17, label: '迁移学习', state: 'locked' },
  { o: 2, angle: -40, size: 22, label: '综合项目', state: 'goal' },
  { o: 2, angle: 90, size: 18, label: '期末答辩', state: 'goal' },
  { o: 2, angle: 175, size: 20, label: '论文复现', state: 'goal' },
  { o: 2, angle: -130, size: 16, label: '同行评审', state: 'goal' },
]

const PLANET_STYLE: Record<string, { fill: string; stroke: string; opacity: number; glow: boolean }> = {
  done:     { fill: '#06d6a0',            stroke: '#06d6a0', opacity: 0.55, glow: false },
  current:  { fill: '#f59e0b',            stroke: '#f59e0b', opacity: 1,    glow: true },
  next:     { fill: 'rgba(0,212,255,0.5)', stroke: '#00d4ff', opacity: 0.85, glow: true },
  upcoming: { fill: 'rgba(255,255,255,0.06)', stroke: '#00d4ff', opacity: 0.7, glow: false },
  locked:   { fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.25)', opacity: 0.55, glow: false },
  goal:     { fill: 'rgba(245, 63, 94, 0.18)', stroke: '#f43f5e', opacity: 0.85, glow: true },
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = angleDeg * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// Background stars
const ORBITAL_STARS = (() => {
  const out: { x: number; y: number; r: number; o: number }[] = []
  let s = 113
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 220; i++) {
    out.push({ x: rand() * 1400, y: rand() * 900, r: 0.4 + rand() * 1.6, o: 0.1 + rand() * 0.5 })
  }
  return out
})()

// Asteroid belt
const ASTEROIDS = (() => {
  const out: { x: number; y: number; r: number; o: number }[] = []
  let s = 88
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < 28; i++) {
    const ang = rand() * 360
    const rad = 215 + rand() * 30
    const p = polar(CX, CY, rad, ang)
    out.push({ x: p.x, y: p.y, r: 0.8 + rand() * 1.4, o: 0.2 + rand() * 0.4 })
  }
  return out
})()

const moonTasks = [
  { label: '理解卷积核作用', status: 'done', time: '15min' },
  { label: '看 CNN 原理视频', status: 'done', time: '20min' },
  { label: '手算 3×3 卷积', status: 'now', time: '25min' },
  { label: '代码实现简单卷积', status: 'todo', time: '40min' },
]

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('orbital-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'orbital-kf'
    styleEl.textContent = `
      @keyframes orbital-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbital-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      @keyframes orbital-pulse { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(2.4);opacity:0} }
      @keyframes orbital-pulse-soft { 0%,100%{opacity:1} 50%{opacity:0.55} }
    `
    document.head.appendChild(styleEl)
  }
})
onUnmounted(() => { styleEl?.remove() })
</script>

<template>
  <div class="orbital-view">
    <div class="orbital-banner">
      <span class="banner-dot" style="background:#f59e0b;box-shadow:0 0 10px #f59e0b66"></span>
      <span>中心是当下学习目标，距离越近表示越紧迫。当前阶段在最内圈快速绕转，长期目标则在外圈缓慢漂浮。</span>
    </div>

    <div class="orbital-canvas">
      <svg viewBox="0 0 1400 900" class="orbital-svg">
        <defs>
          <radialGradient id="orb-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="30%" stop-color="#f59e0b" stop-opacity="0.9" />
            <stop offset="70%" stop-color="#f43f5e" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="orb-sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="60%" stop-color="#f59e0b" stop-opacity="1" />
            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.6" />
          </radialGradient>
          <radialGradient id="orb-cur-planet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.6" />
          </radialGradient>
          <filter id="orb-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="orb-glow-md" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Stars -->
        <circle v-for="(s, i) in ORBITAL_STARS" :key="'s'+i"
          :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.o" />

        <!-- Sun glow -->
        <circle :cx="CX" :cy="CY" r="200" fill="url(#orb-sun)" opacity="0.35" />
        <circle :cx="CX" :cy="CY" r="140" fill="url(#orb-sun)" opacity="0.5" />

        <!-- Orbit paths -->
        <g v-for="(orb, i) in ORBITS" :key="'orbit-'+i">
          <circle :cx="CX" :cy="CY" :r="orb.r" fill="none" :stroke="orb.color"
            stroke-opacity="0.18" stroke-width="1"
            :stroke-dasharray="i === 0 ? '0' : i === 1 ? '4 6' : '2 8'" />
          <circle :cx="CX" :cy="CY" :r="orb.r + 0.5" fill="none" :stroke="orb.color"
            stroke-opacity="0.08" stroke-width="3" />
        </g>

        <!-- Asteroids -->
        <circle v-for="(a, i) in ASTEROIDS" :key="'a'+i"
          :cx="a.x" :cy="a.y" :r="a.r" fill="#fff" :opacity="a.o" />

        <!-- Sun -->
        <circle :cx="CX" :cy="CY" r="80" fill="url(#orb-sun-core)" filter="url(#orb-glow-md)" />
        <circle :cx="CX" :cy="CY" r="60" fill="#f59e0b" opacity="0.9" />
        <circle :cx="CX" :cy="CY" r="42" fill="#fff" opacity="0.85" />
        <!-- Corona -->
        <line v-for="i in 12" :key="'corona-'+i"
          :x1="polar(CX, CY, 65, (i / 12) * 360).x" :y1="polar(CX, CY, 65, (i / 12) * 360).y"
          :x2="polar(CX, CY, 88 + (i % 3) * 6, (i / 12) * 360).x" :y2="polar(CX, CY, 88 + (i % 3) * 6, (i / 12) * 360).y"
          stroke="#f59e0b" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />

        <!-- Trajectory line -->
        <line :x1="CX" :y1="CY" :x2="polar(CX, CY, ORBITS[0].r, -45).x" :y2="polar(CX, CY, ORBITS[0].r, -45).y"
          stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="2 6" />

        <!-- Planets -->
        <g v-for="(p, i) in PLANETS" :key="'p'+i">
          <g v-if="p.state === 'current'">
            <circle :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y" :r="p.size + 8"
              fill="none" stroke="#f59e0b" stroke-width="1.5"
              :style="{ transformOrigin: `${polar(CX, CY, ORBITS[p.o].r, p.angle).x}px ${polar(CX, CY, ORBITS[p.o].r, p.angle).y}px`, animation: 'orbital-pulse 2.2s ease-out infinite' }" />
            <circle :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y" :r="p.size + 8"
              fill="none" stroke="#f59e0b" stroke-width="1.5"
              :style="{ transformOrigin: `${polar(CX, CY, ORBITS[p.o].r, p.angle).x}px ${polar(CX, CY, ORBITS[p.o].r, p.angle).y}px`, animation: 'orbital-pulse 2.2s ease-out 1.1s infinite' }" />
          </g>

          <!-- Moon orbits + moons for current -->
          <g v-if="p.moons && p.state === 'current'">
            <circle :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y" :r="p.size + 18"
              fill="none" stroke="#f59e0b" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="2 3" />
            <circle v-for="mi in p.moons" :key="'mc'+i+'-'+mi"
              :cx="polar(polar(CX, CY, ORBITS[p.o].r, p.angle).x, polar(CX, CY, ORBITS[p.o].r, p.angle).y, p.size + 18, (mi / p.moons) * 360 + 30).x"
              :cy="polar(polar(CX, CY, ORBITS[p.o].r, p.angle).x, polar(CX, CY, ORBITS[p.o].r, p.angle).y, p.size + 18, (mi / p.moons) * 360 + 30).y"
              r="2.5" fill="#f59e0b" filter="url(#orb-glow-sm)" />
          </g>
          <g v-if="p.moons && p.state !== 'current' && p.state !== 'locked' && p.state !== 'goal'">
            <circle v-for="mi in p.moons" :key="'mo'+i+'-'+mi"
              :cx="polar(polar(CX, CY, ORBITS[p.o].r, p.angle).x, polar(CX, CY, ORBITS[p.o].r, p.angle).y, p.size + 12, (mi / p.moons) * 360 + 30).x"
              :cy="polar(polar(CX, CY, ORBITS[p.o].r, p.angle).x, polar(CX, CY, ORBITS[p.o].r, p.angle).y, p.size + 12, (mi / p.moons) * 360 + 30).y"
              r="1.5" :fill="PLANET_STYLE[p.state].stroke" opacity="0.4" />
          </g>

          <!-- Planet glow -->
          <circle v-if="PLANET_STYLE[p.state].glow"
            :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y"
            :r="p.size * 1.8" :fill="PLANET_STYLE[p.state].stroke" opacity="0.25" filter="url(#orb-glow-md)" />

          <!-- Planet body -->
          <circle v-if="p.state === 'current'"
            :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y"
            :r="p.size" fill="url(#orb-cur-planet)" />
          <circle v-else
            :cx="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :cy="polar(CX, CY, ORBITS[p.o].r, p.angle).y"
            :r="p.size" :fill="PLANET_STYLE[p.state].fill" :stroke="PLANET_STYLE[p.state].stroke"
            :stroke-width="p.state === 'goal' || p.state === 'upcoming' ? 1.5 : 1"
            :stroke-dasharray="p.state === 'locked' ? '2 2' : 'none'"
            :opacity="PLANET_STYLE[p.state].opacity" />

          <!-- Checkmark for done -->
          <text v-if="p.state === 'done'"
            :x="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :y="polar(CX, CY, ORBITS[p.o].r, p.angle).y + 1"
            fill="#fff" font-size="12" text-anchor="middle" dominant-baseline="middle" opacity="0.85">✓</text>
          <text v-if="p.state === 'goal'"
            :x="polar(CX, CY, ORBITS[p.o].r, p.angle).x" :y="polar(CX, CY, ORBITS[p.o].r, p.angle).y + 1"
            fill="#f43f5e" font-size="14" text-anchor="middle" dominant-baseline="middle">★</text>
        </g>

        <!-- Comet -->
        <g :style="{ transformOrigin: `${CX}px ${CY}px`, animation: 'orbital-spin 60s linear infinite' }">
          <g :transform="`translate(${CX + 400}, ${CY})`">
            <line x1="-22" y1="0" x2="0" y2="0" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" opacity="0.7" />
            <line x1="-44" y1="0" x2="-12" y2="0" stroke="#00d4ff" stroke-width="1" stroke-linecap="round" opacity="0.3" />
            <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#orb-glow-sm)" />
          </g>
        </g>

        <!-- Orbiting particle -->
        <g :style="{ transformOrigin: `${CX}px ${CY}px`, animation: 'orbital-spin-rev 38s linear infinite' }">
          <circle :cx="CX + 280" :cy="CY" r="1.5" fill="#00d4ff" opacity="0.5" />
        </g>
      </svg>

      <!-- Sun label -->
      <div class="sun-label">
        <div class="sun-label-tag">★ CURRENT GOAL</div>
        <div class="sun-label-title">完成深度学习路径</div>
        <div class="sun-label-date">截止 2026-06-30 · 26 天后</div>
      </div>

      <!-- Orbit phase labels -->
      <div v-for="(orb, i) in ORBITS" :key="'ol'+i" class="orbit-label"
        :style="{ left: ((polar(CX, CY, orb.r, 180).x - 26) / 1400 * 100) + '%', top: ((polar(CX, CY, orb.r, 180).y - 30) / 900 * 100) + '%' }">
        <div class="orbit-label-tag" :style="{ color: orb.color }">ORBIT {{ i + 1 }}</div>
        <div class="orbit-label-name">{{ orb.phase }}</div>
      </div>

      <!-- Planet labels -->
      <div v-for="(p, i) in PLANETS" :key="'pl'+i" class="planet-label"
        :style="{
          left: (polar(CX, CY, ORBITS[p.o].r + p.size + 18 + (p.state === 'current' ? 14 : 0), p.angle).x / 1400 * 100) + '%',
          top: (polar(CX, CY, ORBITS[p.o].r + p.size + 18 + (p.state === 'current' ? 14 : 0), p.angle).y / 900 * 100) + '%',
          transform: `translate(${polar(CX, CY, ORBITS[p.o].r + p.size + 18, p.angle).x > CX ? '0' : '-100%'}, -50%)`,
          textAlign: polar(CX, CY, ORBITS[p.o].r + p.size + 18, p.angle).x > CX ? 'left' : 'right',
        }">
        <div class="planet-name" :style="{
          fontSize: p.state === 'current' ? '13px' : '11.5px',
          fontWeight: p.state === 'current' ? 600 : 500,
          color: p.state === 'locked' ? '#8892b0' : p.state === 'current' ? '#f59e0b' : p.state === 'goal' ? '#f43f5e' : '#e8edf5',
        }">{{ p.label }}</div>
        <div v-if="p.state === 'current'" class="planet-sub" style="color:#f59e0b">现在 · 4 任务</div>
        <div v-if="p.state === 'next'" class="planet-sub" style="color:#00d4ff">下一站</div>
        <div v-if="p.state === 'goal'" class="planet-sub" style="color:#f43f5e">远期 · 锁定</div>
      </div>

      <!-- Detail panel -->
      <div class="orbital-detail">
        <div class="detail-header">
          <span class="detail-chip" style="background:rgba(245,158,11,0.12);border-color:#f59e0b33;color:#f59e0b">正在执行</span>
          <span class="detail-orbit">ORBIT 1 · NOW</span>
        </div>
        <div class="detail-title">卷积运算</div>
        <div class="detail-sub">4 个微任务围绕这颗行星 · 完成 2 个</div>
        <div class="moons-title">MOONS · 微任务</div>
        <div class="moons-list">
          <div v-for="(task, i) in moonTasks" :key="i" :class="['moon-task', task.status]">
            <div :class="['moon-check', task.status]">
              <span v-if="task.status === 'done'">✓</span>
              <span v-if="task.status === 'now'">●</span>
            </div>
            <span class="moon-label">{{ task.label }}</span>
            <span class="moon-time">{{ task.time }}</span>
          </div>
        </div>
        <button class="detail-btn" style="background:linear-gradient(135deg,#f59e0b,#f43f5e);box-shadow:0 4px 20px #f59e0b55">继续手算 3×3 卷积 →</button>
      </div>

      <!-- Legend -->
      <div class="orbital-legend">
        <div class="legend-title">PLANET · 状态</div>
        <div class="legend-items">
          <div v-for="d in [
            { c: '#06d6a0', sz: 9, label: '已完成', desc: 'past · ✓', opacity: 0.55 },
            { c: '#f59e0b', sz: 12, label: '当前任务', desc: 'current · ★', glow: true },
            { c: '#00d4ff', sz: 10, label: '下一颗', desc: 'next', opacity: 0.85 },
            { c: 'rgba(255,255,255,0.25)', sz: 10, label: '锁定中', desc: 'locked · 待解锁', dashed: true },
            { c: '#f43f5e', sz: 11, label: '远期目标', desc: 'goal · ★' },
          ]" :key="d.label" class="legend-item">
            <svg width="28" height="20">
              <circle v-if="d.glow" cx="14" cy="10" :r="d.sz + 4" :fill="d.c" opacity="0.3" />
              <circle cx="14" cy="10" :r="d.sz"
                :fill="d.dashed ? 'rgba(255,255,255,0.04)' : d.c" :stroke="d.c"
                stroke-width="1.5" :stroke-dasharray="d.dashed ? '2 2' : 'none'"
                :opacity="d.opacity ?? 1" />
            </svg>
            <span class="legend-label-text">{{ d.label }}</span>
            <span class="legend-desc">{{ d.desc }}</span>
          </div>
        </div>
      </div>

      <!-- Top stats -->
      <div class="top-stats">
        <div class="stat-card">
          <div class="stat-label">阶段完成度</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#f59e0b">38%</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">剩余微任务</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#00d4ff">14</span><span class="stat-unit">/ 23</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">本周节奏</div>
          <div class="stat-value-row"><span class="stat-big" style="color:#06d6a0">2.4</span><span class="stat-unit">颗 / 周</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ob-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.orbital-view { padding: 0 40px 40px; animation: ob-float-up 0.5s ease both; }
.orbital-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 20px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.orbital-canvas {
  position: relative; width: 100%; aspect-ratio: 1400 / 900;
  border-radius: 18px; background: rgba(7, 7, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06); overflow: hidden;
}
.orbital-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

.sun-label {
  position: absolute; left: calc(540 / 1400 * 100%); top: calc((470 + 110) / 900 * 100%);
  transform: translateX(-50%); z-index: 5; text-align: center; pointer-events: none;
}
.sun-label-tag { font-size: 10px; color: #f59e0b; letter-spacing: 0.22em; font-family: var(--font-mono); margin-bottom: 4px; }
.sun-label-title { font-family: var(--font-display); font-size: 22px; color: #e8edf5; line-height: 1.1; text-shadow: 0 0 20px #f59e0b88; }
.sun-label-date { font-size: 11px; color: #8892b0; margin-top: 4px; font-family: var(--font-mono); letter-spacing: 0.05em; }

.orbit-label {
  position: absolute; transform: translate(-100%, 0);
  text-align: right; pointer-events: none; z-index: 4;
}
.orbit-label-tag { font-size: 10px; font-family: var(--font-mono); letter-spacing: 0.18em; margin-bottom: 2px; }
.orbit-label-name { font-family: var(--font-display); font-size: 14px; color: #e8edf5; text-shadow: 0 0 12px currentColor; }

.planet-label {
  position: absolute; pointer-events: none; z-index: 6; white-space: nowrap;
}
.planet-name { font-weight: 500; text-shadow: 0 1px 6px rgba(0,0,0,0.9); }
.planet-sub { font-size: 9px; font-family: var(--font-mono); letter-spacing: 0.15em; margin-top: 1px; }

/* Detail panel */
.orbital-detail {
  position: absolute; right: 24px; top: 160px; width: 320px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 22px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.detail-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.detail-chip {
  font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  border: 1px solid; letter-spacing: 0.04em;
}
.detail-orbit { font-size: 10px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.18em; }
.detail-title { font-family: var(--font-display); font-size: 24px; color: #e8edf5; line-height: 1.1; margin-bottom: 6px; }
.detail-sub { font-size: 12px; color: #8892b0; margin-bottom: 16px; }
.moons-title { font-size: 10px; color: #8892b0; letter-spacing: 0.18em; font-family: var(--font-mono); margin-bottom: 10px; }
.moons-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.moon-task {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
}
.moon-task.now { background: #f59e0b12; border-color: #f59e0b66; }
.moon-task.done { background: rgba(6, 214, 160, 0.06); border-color: #06d6a033; }
.moon-check {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; color: #000;
}
.moon-check.done { background: #06d6a0; }
.moon-check.now { background: #f59e0b; box-shadow: 0 0 12px #f59e0bcc; }
.moon-check.todo { background: transparent; border: 1.5px solid #4a5568; }
.moon-label { flex: 1; font-size: 12px; color: #e8edf5; }
.moon-task.done .moon-label { text-decoration: line-through; text-decoration-color: #4a5568; }
.moon-task.todo .moon-label { color: #8892b0; }
.moon-time { font-size: 10px; color: #8892b0; font-family: var(--font-mono); }
.detail-btn {
  width: 100%; color: #fff; border: none; border-radius: 10px;
  padding: 11px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
}

/* Legend */
.orbital-legend {
  position: absolute; right: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 16px 22px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.legend-title { font-size: 10px; letter-spacing: 0.18em; color: #8892b0; margin-bottom: 12px; font-family: var(--font-mono); }
.legend-items { display: flex; flex-direction: column; gap: 8px; }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 11.5px; }
.legend-label-text { color: #e8edf5; font-weight: 500; width: 80px; }
.legend-desc { color: #8892b0; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; }

/* Top stats */
.top-stats {
  position: absolute; top: 20px; right: 20px; z-index: 9;
  display: flex; gap: 12px;
}
.stat-card {
  background: rgba(12,12,30,0.7); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 10px 16px;
}
.stat-label { font-size: 9px; letter-spacing: 0.18em; color: #8892b0; font-family: var(--font-mono); margin-bottom: 3px; }
.stat-value-row { display: flex; align-items: baseline; gap: 4px; }
.stat-big { font-family: var(--font-display); font-size: 22px; line-height: 1; }
.stat-unit { font-size: 10px; color: #8892b0; }

@media (max-width: 900px) {
  .orbital-view { padding: 0 20px 32px; }
  .orbital-detail, .orbital-legend { position: static; width: 100%; margin-top: 12px; }
  .top-stats { position: static; flex-wrap: wrap; margin-top: 12px; }
}
</style>
