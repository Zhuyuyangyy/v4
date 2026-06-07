<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { BASE_KNOWLEDGE_ITEMS, buildMatrixView, getDomainMeta } from './mapTransforms'

const emit = defineEmits<{ 'select-node': [nodeId: string] }>()

const matrixCells = buildMatrixView(BASE_KNOWLEDGE_ITEMS)

const LEVELS = [
  { key: 'remember', name: '了解', en: 'Remember', icon: '◐' },
  { key: 'understand', name: '掌握', en: 'Understand', icon: '◓' },
  { key: 'apply', name: '应用', en: 'Apply', icon: '◑' },
  { key: 'transfer', name: '迁移', en: 'Transfer', icon: '◒' },
  { key: 'create', name: '创新', en: 'Create', icon: '●' },
]

const DOMAIN_ORDER = ['math', 'algo', 'ml', 'dl', 'eng', 'nlp']

const cellsByDomain = computed(() =>
  DOMAIN_ORDER.map(domain => ({
    domain,
    meta: getDomainMeta(domain),
    cells: LEVELS.map(lv => matrixCells.find(c => c.domain === domain && c.level === lv.key)!),
  }))
)

function cellBg(mastery: number, color: string): string {
  if (mastery === 0) return 'rgba(255, 255, 255, 0.02)'
  const alpha = 0.08 + mastery * 0.78
  return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
}

const colAvgs = computed(() =>
  LEVELS.map((_, li) => {
    const vals = DOMAIN_ORDER.map(d => matrixCells.find(c => c.domain === d && c.level === LEVELS[li].key)!.value)
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
        <div v-for="(lv, li) in LEVELS" :key="lv.key" class="col-header">
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
          <div v-for="row in cellsByDomain" :key="row.domain" class="domain-header" :style="{ borderRightColor: row.meta.color + '33' }">
            <div class="domain-top">
              <span class="domain-dot" :style="{ background: row.meta.color, boxShadow: `0 0 8px ${row.meta.color}` }"></span>
              <span class="domain-name">{{ row.meta.name }}</span>
            </div>
            <div class="domain-en">{{ row.meta.short }} · {{ row.cells.length }} 层级</div>
            <div class="domain-avg">
              <div class="domain-avg-track"><div class="domain-avg-fill" :style="{ width: (row.cells.reduce((s, c) => s + c.value, 0) / row.cells.length * 100) + '%', background: row.meta.color }"></div></div>
              <span>{{ Math.round(row.cells.reduce((s, c) => s + c.value, 0) / row.cells.length * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Cells -->
        <div class="cells-col">
          <div v-for="row in cellsByDomain" :key="row.domain" class="cell-row">
            <div v-for="(cell, ci) in row.cells" :key="cell.level"
              :class="['cell', {
                rec: cell.isRecommended,
                weak: cell.isWeak,
              }]"
              :style="{
                background: cellBg(cell.value, row.meta.color),
                borderColor: cell.isRecommended ? '#f59e0b'
                  : cell.isWeak ? '#f43f5e88'
                  : 'rgba(255,255,255,0.04)',
              }"
              :title="`${cell.domainLabel} × ${cell.levelLabel}：${cell.lastScore}% | 证据 ${cell.evidenceCount} 条`"
              @click="emit('select-node', cell.domain)">
              <!-- High mastery gradient -->
              <div v-if="cell.value > 0.6" class="cell-glow" :style="{ background: `radial-gradient(circle at 30% 0%, ${row.meta.color}33, transparent 70%)` }"></div>

              <div class="cell-top">
                <span class="cell-pct" :style="{ color: cell.value === 0 ? '#4a5568' : cell.value > 0.5 ? '#e8edf5' : '#8892b0' }">
                  {{ cell.value === 0 ? '—' : Math.round(cell.value * 100) + '%' }}
                </span>
                <span v-if="cell.value > 0" class="cell-icon" :style="{ color: row.meta.color }">{{ LEVELS[ci].icon }}</span>
              </div>
              <div class="cell-status">{{ statusLabel(cell.value) }}</div>
              <div class="cell-meta">{{ cell.evidenceCount }} 条 · {{ cell.lastScore }}分</div>
              <div v-if="cell.value > 0" class="cell-bar" :style="{ width: (cell.value * 100) + '%', background: row.meta.color }"></div>

              <!-- Recommended star -->
              <div v-if="cell.isRecommended" class="rec-star">★</div>

              <!-- Weak indicator -->
              <div v-if="cell.isWeak && !cell.isRecommended" class="weak-corner"></div>
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
            <div v-for="(lv, li) in LEVELS" :key="lv.key" class="diag-bar-row">
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
  overflow: hidden; cursor: pointer;
}
.cell.rec { box-shadow: 0 0 24px #f59e0b66; }
.cell-glow { position: absolute; inset: 0; pointer-events: none; }
.cell-top { display: flex; align-items: center; justify-content: space-between; position: relative; }
.cell-pct { font-family: var(--font-mono); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.cell-icon { font-size: 14px; opacity: 0.5; }
.cell-status { font-size: 9.5px; color: #8892b0; font-family: var(--font-mono); letter-spacing: 0.06em; position: relative; }
.cell-meta { font-size: 8px; color: #4a5568; font-family: var(--font-mono); letter-spacing: 0.04em; position: relative; }
.cell-bar { position: absolute; left: 0; bottom: 0; height: 3px; opacity: 0.7; }
.cell.weak { border-width: 2px; }
.weak-corner {
  position: absolute; top: 0; right: 0;
  width: 0; height: 0;
  border-style: solid; border-width: 0 14px 14px 0;
  border-color: transparent #f59e0b transparent transparent;
  opacity: 0.7;
}
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
