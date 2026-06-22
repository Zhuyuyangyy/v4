<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { TrendPoint } from '@/types/knowledge-tree'

const props = defineProps<{
  trends: TrendPoint[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

function initChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value, undefined, { renderer: 'svg' })
  updateChart()
}

function updateChart() {
  if (!chart) return
  const dates = props.trends.map(t => t.date)
  const values = props.trends.map(t => Number(t.mastery.toFixed(1)))

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(13,18,38,0.92)',
      borderColor: 'rgba(255,255,255,0.1)',
      textStyle: { color: '#f2f6fa' },
    },
    grid: { top: 24, right: 16, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      axisLabel: { color: 'rgba(176,190,210,0.7)', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(176,190,210,0.7)', fontSize: 10, formatter: '{value}' },
    },
    series: [
      {
        name: '掌握度',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: values,
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#00d4ff' },
              { offset: 1, color: '#7c3aed' },
            ],
          },
        },
        itemStyle: { color: '#00d4ff', borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
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
watch(() => props.trends, updateChart, { deep: true })

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

function onResize() { chart?.resize() }
window.addEventListener('resize', onResize)
</script>

<template>
  <div class="trend-card">
    <div class="card-title">学习效果趋势</div>
    <div ref="chartRef" class="trend-chart" />
  </div>
</template>

<style scoped>
.trend-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 14px;
  border-radius: 16px;
  background: rgba(8, 14, 30, 0.72);
  border: 1px solid rgba(0, 212, 255, 0.18);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 20px rgba(0, 212, 255, 0.08);
  overflow: hidden;
}

.trend-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.1), transparent 55%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 14px;
  font-weight: 700;
  color: #f2f6fa;
  letter-spacing: 0.3px;
}

.trend-chart {
  position: relative;
  flex: 1;
  min-height: 120px;
}
</style>
