<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import type { TrendPoint } from '@/types/knowledge-tree'

const props = defineProps<{
  value: number
  total: number
  change?: number
  trends?: TrendPoint[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const pct = computed(() => Math.round(props.value))

function initChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value, undefined, { renderer: 'svg' })
  updateChart()
}

function updateChart() {
  if (!chart) return
  const trend = props.trends ?? []
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    grid: { top: 6, right: 0, bottom: 0, left: 0 },
    xAxis: { show: false, type: 'category', data: trend.map(t => t.date) },
    yAxis: { show: false, type: 'value', min: 0, max: 100 },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '92%',
        center: ['50%', '42%'],
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 1,
              colorStops: [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: '#7c3aed' },
              ],
            },
            shadowBlur: 16,
            shadowColor: 'rgba(0, 212, 255, 0.45)',
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, 'rgba(255,255,255,0.06)']],
          },
        },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: [{ value: pct.value }],
        detail: {
          valueAnimation: true,
          offsetCenter: [0, 0],
          fontSize: 28,
          fontWeight: 800,
          color: '#f2f6fa',
          formatter: '{value}%',
          fontFamily: '"JetBrains Mono", monospace',
        },
        title: { show: false },
      },
      {
        type: 'line',
        xAxisIndex: 0,
        yAxisIndex: 0,
        smooth: true,
        symbol: 'none',
        data: trend.map(t => Number(t.mastery.toFixed(1))),
        lineStyle: { width: 2, color: '#00d4ff' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.25)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' },
            ],
          },
        },
      },
    ],
  }
  chart.setOption(option)
}

onMounted(initChart)
watch(() => [props.value, props.trends], updateChart, { deep: true })

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

function onResize() { chart?.resize() }
window.addEventListener('resize', onResize)
</script>

<template>
  <div class="gauge-card">
    <div class="card-title">综合掌握度</div>
    <div ref="chartRef" class="gauge-chart" />
    <div class="gauge-meta">
      <span class="gauge-total">已评估 {{ total }} 个知识点</span>
      <span v-if="change !== undefined" class="gauge-change" :class="{ positive: change >= 0, negative: change < 0 }">
        {{ change >= 0 ? '+' : '-' }}{{ Math.abs(change).toFixed(1) }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.gauge-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 13px;
  border-radius: 14px;
  background: rgba(18, 22, 48, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.gauge-card:hover {
  transform: translateY(-1px);
  border-color: rgba(0, 212, 255, 0.24);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gauge-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 88% 0%, rgba(0, 212, 255, 0.08), transparent 48%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 13px;
  font-weight: 700;
  color: #f2f6fa;
  margin-bottom: 4px;
  letter-spacing: 0;
}

.gauge-chart {
  position: relative;
  flex: 1;
  min-height: 150px;
}

.gauge-meta {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(176, 190, 210, 0.7);
}

.gauge-change {
  font-weight: 700;
}

.gauge-change.positive { color: #45c486; }
.gauge-change.negative { color: #ef4444; }
</style>
