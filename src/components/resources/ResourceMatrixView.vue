<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const COG_LEVELS = [
  { key: 'remember',   name: '记忆',  en: 'Remember',   icon: '◐' },
  { key: 'understand', name: '理解',  en: 'Understand', icon: '◓' },
  { key: 'apply',      name: '应用',  en: 'Apply',      icon: '◑' },
  { key: 'analyze',    name: '分析',  en: 'Analyze',    icon: '◒' },
  { key: 'evaluate',   name: '评价',  en: 'Evaluate',   icon: '◍' },
  { key: 'create',     name: '创造',  en: 'Create',     icon: '●' },
]

const COG_DOMAINS = [
  { key: 'math', name: '数学基础',       color: '#00d4ff', en: 'Mathematics',     count: '14 子项' },
  { key: 'algo', name: '算法与数据结构', color: '#f59e0b', en: 'Algorithms',      count: '18 子项' },
  { key: 'ml',   name: '机器学习',       color: '#7c3aed', en: 'Machine Learning', count: '21 子项' },
  { key: 'dl',   name: '深度学习',       color: '#06d6a0', en: 'Deep Learning',   count: '16 子项' },
  { key: 'eng',  name: '工程实践',       color: '#3b82f6', en: 'Engineering',     count: '11 子项' },
  { key: 'nlp',  name: 'NLP 应用',       color: '#f43f5e', en: 'NLP & Apps',      count: '9 子项' },
]

const COG_DATA: Record<string, number[]> = {
  math: [0.95, 0.90, 0.82, 0.65, 0.40, 0.15],
  algo: [0.92, 0.88, 0.80, 0.62, 0.42, 0.20],
  ml:   [0.85, 0.78, 0.72, 0.55, 0.32, 0.10],
  dl:   [0.50, 0.35, 0.22, 0.10, 0.05, 0.00],
  eng:  [0.80, 0.70, 0.60, 0.45, 0.25, 0.10],
  nlp:  [0.30, 0.18, 0.08, 0.04, 0.00, 0.00],
}

const RECOMMENDED = { domain: 'dl', level: 2 }
const SECONDARY_RECS = [
  { domain: 'nlp', level: 1 },
  { domain: 'math', level: 4 },
]

function cellBg(mastery: number, color: string): string {
  if (mastery === 0) return 'rgba(255, 255, 255, 0.02)'
  const alpha = 0.08 + mastery * 0.78
  return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
}

const colAvgs = computed(() =>
  COG_LEVELS.map((_, li) => {
    const vals = COG_DOMAINS.map(d => COG_DATA[d.key][li])
    return vals.reduce((s, v) => s + v, 0) / vals.length
  })
)

function statusLabel(m: number): string {
  if (m === 0) return '未触及'
  if (m < 0.3) return '入门期'
  if (m < 0.6) return '巩固期'
  if (m < 0.85) return '熟练'
  return '精通 ✓'
}

// Inject keyframes
let styleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (!document.getElementById('matrix-kf')) {
    styleEl = document.createElement('style')
    styleEl.id = 'matrix-kf'
    styleEl.textContent = `@keyframes matrix-pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }`
    document.head.appendChild(styleEl)
  }
})
onUnmounted(() => { styleEl?.remove() })
</script>

<template>
  <div class="matrix-view">
    <div class="matrix-banner">
      <span class="banner-dot" style="background:#f59e0b;box-shadow:0 0 10px #f59e0b66"></span>
      <span>行是知识域，列是认知层级 — 从「记得住」到「能创造」。同一个知识域在不同认知深度上的差距，一张矩阵就能说清。</span>
    </div>

    <div class="matrix-canvas">
      <!-- Depth axis -->
      <div class="depth-axis">
        <span>表层 · 浅</span>
        <div class="depth-line"></div>
        <span style="color:#f43f5e">深层 · 创造</span>
      </div>

      <!-- Column headers -->
      <div class="col-headers">
        <div v-for="(lv, li) in COG_LEVELS" :key="lv.key"
          :class="['col-header', { rec: li === RECOMMENDED.level }]">
          <div class="col-top">
            <span class="col-name">{{ lv.name }}</span>
            <span class="col-level">L{{ li + 1 }}</span>
          </div>
          <div class="col-en">{{ lv.en.toUpperCase() }}</div>
          <div class="col-avg-track"><div class="col-avg-fill" :style="{ width: (colAvgs[li] * 100) + '%' }"></div></div>
          <div class="col-avg-label">平均 {{ Math.round(colAvgs[li] * 100) }}%</div>
        </div>
      </div>

      <!-- Matrix grid -->
      <div class="matrix-grid">
        <!-- Domain headers (left) -->
        <div class="domain-col">
          <div v-for="d in COG_DOMAINS" :key="d.key" class="domain-header" :style="{ borderRightColor: d.color + '33' }">
            <div class="domain-top">
              <span class="domain-dot" :style="{ background: d.color, boxShadow: `0 0 8px ${d.color}` }"></span>
              <span class="domain-name">{{ d.name }}</span>
            </div>
            <div class="domain-en">{{ d.en.toUpperCase() }} · {{ d.count }}</div>
            <div class="domain-avg">
              <div class="domain-avg-track"><div class="domain-avg-fill" :style="{ width: (COG_DATA[d.key].reduce((s, v) => s + v, 0) / COG_LEVELS.length * 100) + '%', background: d.color }"></div></div>
              <span>{{ Math.round(COG_DATA[d.key].reduce((s, v) => s + v, 0) / COG_LEVELS.length * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Cells -->
        <div class="cells-col">
          <div v-for="d in COG_DOMAINS" :key="d.key" class="cell-row">
            <div v-for="(lv, li) in COG_LEVELS" :key="lv.key"
              :class="['cell', {
                rec: RECOMMENDED.domain === d.key && RECOMMENDED.level === li,
                sec: SECONDARY_RECS.some(r => r.domain === d.key && r.level === li),
              }]"
              :style="{
                background: cellBg(COG_DATA[d.key][li], d.color),
                borderColor: (RECOMMENDED.domain === d.key && RECOMMENDED.level === li) ? '#f59e0b'
                  : (SECONDARY_RECS.some(r => r.domain === d.key && r.level === li)) ? d.color + '88'
                  : 'rgba(255,255,255,0.04)',
              }">
              <!-- High mastery gradient -->
              <div v-if="COG_DATA[d.key][li] > 0.6" class="cell-glow" :style="{ background: `radial-gradient(circle at 30% 0%, ${d.color}33, transparent 70%)` }"></div>

              <div class="cell-top">
                <span class="cell-pct" :style="{ color: COG_DATA[d.key][li] === 0 ? '#4a5568' : COG_DATA[d.key][li] > 0.5 ? '#e8edf5' : '#8892b0' }">
                  {{ COG_DATA[d.key][li] === 0 ? '—' : Math.round(COG_DATA[d.key][li] * 100) + '%' }}
                </span>
                <span v-if="COG_DATA[d.key][li] > 0" class="cell-icon" :style="{ color: d.color }">{{ lv.icon }}</span>
              </div>
              <div class="cell-status">{{ statusLabel(COG_DATA[d.key][li]) }}</div>
              <div v-if="COG_DATA[d.key][li] > 0" class="cell-bar" :style="{ width: (COG_DATA[d.key][li] * 100) + '%', background: d.color }"></div>

              <!-- Recommended star -->
              <div v-if="RECOMMENDED.domain === d.key && RECOMMENDED.level === li" class="rec-star">★</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Annotation -->
      <div class="annotation">
        <div class="annotation-badge">★ 推荐补这一格</div>
      </div>

      <!-- Bottom detail -->
      <div class="matrix-detail">
        <div class="detail-chips">
          <span class="detail-chip" style="background:rgba(245,158,11,0.12);border-color:#f59e0b33;color:#f59e0b">★ 主要推荐</span>
          <span class="detail-chip" style="background:rgba(244,63,94,0.12);border-color:#f43f5e33;color:#f43f5e">跳跃式提升点</span>
        </div>
        <div class="detail-title">
          <span style="color:#06d6a0">深度学习</span>
          <span style="color:#8892b0; margin: 0 12px">×</span>
          <span style="color:#f59e0b">应用</span>
        </div>
        <div class="detail-desc">你已经"理解"了 35%，但"应用"层只有 22% — 知识停在头脑里，没落到代码里。建议加入实战练习与项目。</div>
        <div class="detail-metrics">
          <div class="metric-card">
            <div class="metric-label">当前差距</div>
            <div class="metric-value" style="color:#f59e0b">−13 个百分点</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">推荐资源</div>
            <div class="metric-value" style="color:#06d6a0">5 个 · 含代码 2</div>
          </div>
        </div>
        <button class="detail-btn" style="background:linear-gradient(135deg,#f59e0b,#f43f5e);box-shadow:0 4px 20px #f59e0b55">看看具体怎么补 →</button>
      </div>

      <!-- Diagnostic panel -->
      <div class="diagnostic">
        <div class="diag-title">DIAGNOSTIC · 整体诊断</div>
        <div class="diag-section">
          <div class="diag-label">认知深度均值</div>
          <div class="diag-big-row">
            <span class="diag-big">L 2.6</span>
            <span class="diag-sub">/ L 6</span>
            <span class="diag-trend">↑ 上月 +0.3</span>
          </div>
          <div class="diag-note">主要停在「理解→应用」之间</div>
        </div>
        <div class="diag-divider"></div>
        <div class="diag-section">
          <div class="diag-label">认知分布</div>
          <div class="diag-bars">
            <div v-for="(lv, li) in COG_LEVELS" :key="lv.key" class="diag-bar-row">
              <span class="diag-bar-label">{{ lv.name }}</span>
              <div class="diag-bar-track"><div class="diag-bar-fill" :style="{ width: (colAvgs[li] * 100) + '%' }"></div></div>
              <span class="diag-bar-pct">{{ Math.round(colAvgs[li] * 100) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes mx-float-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

.matrix-view { padding: 0 40px 40px; animation: mx-float-up 0.5s ease both; }
.matrix-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 20px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.matrix-canvas {
  position: relative; padding: 24px;
  border-radius: 18px; background: rgba(7, 7, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
}

/* Depth axis */
.depth-axis {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 16px; padding-left: 220px;
  font-size: 10px; font-family: var(--font-mono); color: #8892b0; letter-spacing: 0.18em;
}
.depth-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, #f59e0b33, #f59e0b, #f43f5e);
}

/* Column headers */
.col-headers {
  display: flex; gap: 8px; margin-bottom: 8px; padding-left: 220px;
}
.col-header {
  width: 156px; padding: 10px 14px; border-radius: 10px;
  border: 1px solid transparent;
}
.col-header.rec {
  background: rgba(245, 158, 11, 0.06); border-color: #f59e0b44;
}
.col-top { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.col-name { font-family: var(--font-display); font-size: 18px; color: #e8edf5; }
.col-level { font-size: 11px; color: #4a5568; font-family: var(--font-mono); margin-left: auto; letter-spacing: 0.08em; }
.col-en { font-size: 9px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.18em; margin-bottom: 8px; }
.col-avg-track { height: 3px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
.col-avg-fill { height: 100%; background: #f59e0b; opacity: 0.6; }
.col-avg-label { font-size: 10px; color: #8892b0; margin-top: 4px; font-family: var(--font-mono); }

/* Matrix grid */
.matrix-grid { display: flex; gap: 0; }
.domain-col { display: flex; flex-direction: column; gap: 8px; }
.domain-header {
  width: 200px; height: 90px; padding: 10px 14px;
  display: flex; flex-direction: column; justify-content: center;
  border-right: 2px solid;
}
.domain-top { display: flex; align-items: center; gap: 8px; }
.domain-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
.domain-name { font-family: var(--font-display); font-size: 17px; color: #e8edf5; }
.domain-en { font-size: 10px; color: #4a5568; font-family: var(--font-mono); margin-top: 3px; letter-spacing: 0.1em; }
.domain-avg { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-family: var(--font-mono); margin-top: 6px; width: fit-content; }
.domain-avg-track { width: 50px; height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; overflow: hidden; }
.domain-avg-fill { height: 100%; }

.cells-col { display: flex; flex-direction: column; gap: 8px; }
.cell-row { display: flex; gap: 8px; }
.cell {
  position: relative; width: 156px; height: 90px;
  border: 1px solid; border-radius: 8px; padding: 10px 14px;
  display: flex; flex-direction: column; justify-content: space-between;
  overflow: hidden;
}
.cell.rec { box-shadow: 0 0 24px #f59e0b66; }
.cell-glow { position: absolute; inset: 0; pointer-events: none; }
.cell-top { display: flex; align-items: center; justify-content: space-between; position: relative; }
.cell-pct { font-family: var(--font-mono); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.cell-icon { font-size: 14px; opacity: 0.5; }
.cell-status { font-size: 9.5px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.06em; position: relative; }
.cell-bar { position: absolute; left: 0; bottom: 0; height: 3px; opacity: 0.7; }
.rec-star {
  position: absolute; top: -8px; right: -8px;
  width: 24px; height: 24px; border-radius: 50%;
  background: #f59e0b; color: #000;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  box-shadow: 0 0 16px #f59e0baa;
  animation: matrix-pulse 2s ease-in-out infinite;
}

/* Annotation */
.annotation {
  position: absolute;
  right: 280px; top: 200px;
  z-index: 8; pointer-events: none;
}
.annotation-badge {
  background: rgba(245, 158, 11, 0.14); border: 1px solid #f59e0b;
  border-radius: 10px; padding: 8px 12px;
  font-size: 11px; color: #f59e0b; font-weight: 600;
  white-space: nowrap; letter-spacing: 0.02em;
  box-shadow: 0 0 20px #f59e0b66;
}

/* Detail card */
.matrix-detail {
  margin-top: 24px; padding: 22px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
  max-width: 520px;
}
.detail-chips { display: flex; gap: 8px; margin-bottom: 14px; }
.detail-chip {
  font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  border: 1px solid; letter-spacing: 0.04em;
}
.detail-title { font-family: var(--font-display); font-size: 22px; color: #e8edf5; line-height: 1.15; margin-bottom: 6px; }
.detail-desc { font-size: 12px; color: #8892b0; line-height: 1.6; margin-bottom: 16px; }
.detail-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.metric-card { padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 10px; }
.metric-label { font-size: 10px; color: #8892b0; letter-spacing: 0.12em; margin-bottom: 4px; }
.metric-value { font-family: var(--font-mono); font-size: 18px; font-weight: 600; }
.detail-btn {
  width: 100%; color: #fff; border: none; border-radius: 10px;
  padding: 11px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
}

/* Diagnostic */
.diagnostic {
  position: absolute; right: 24px; bottom: 24px;
  background: rgba(12, 12, 30, 0.72); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px;
  padding: 22px; width: 280px; z-index: 10;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
}
.diag-title { font-size: 10px; letter-spacing: 0.18em; color: #8892b0; margin-bottom: 14px; font-family: var(--font-mono); }
.diag-section { margin-bottom: 0; }
.diag-label { font-size: 11px; color: #8892b0; margin-bottom: 4px; }
.diag-big-row { display: flex; align-items: baseline; gap: 6px; }
.diag-big { font-family: var(--font-display); font-size: 28px; color: #e8edf5; line-height: 1; }
.diag-sub { font-size: 11px; color: #8892b0; }
.diag-trend { font-size: 11px; color: #06d6a0; margin-left: auto; }
.diag-note { font-size: 10px; color: #4a5568; margin-top: 3px; }
.diag-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
.diag-bars { display: flex; flex-direction: column; gap: 6px; }
.diag-bar-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.diag-bar-label { width: 36px; color: #8892b0; font-size: 10px; }
.diag-bar-track { flex: 1; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
.diag-bar-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #f43f5e); opacity: 0.85; }
.diag-bar-pct { font-size: 10px; color: #8892b0; font-family: var(--font-mono); width: 30px; text-align: right; }

@media (max-width: 900px) {
  .matrix-view { padding: 0 20px 32px; }
  .matrix-canvas { padding: 16px; overflow-x: auto; }
  .matrix-detail, .diagnostic { position: static; width: 100%; margin-top: 16px; }
  .annotation { position: static; margin-top: 12px; }
}
</style>
