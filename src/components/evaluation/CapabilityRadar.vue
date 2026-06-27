<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { CapabilityMetric } from '@/types/knowledge-tree'

const props = defineProps<{
  metrics: CapabilityMetric[]
  highlightKey?: string
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
  const indicator = props.metrics.map(m => ({ name: m.label, max: 100 }))
  const current = props.metrics.map(m => m.value)
  const previous = props.metrics.map(m => m.previousValue)

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    legend: {
      data: ['当前得分', '平均水平'],
      bottom: 0,
      textStyle: { color: 'rgba(176,190,210,0.7)', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
    },
    radar: {
      indicator,
      radius: '62%',
      center: ['50%', '46%'],
      axisName: {
        color: 'rgba(176,190,210,0.85)',
        fontSize: 11,
        formatter: (value?: string) => {
          if (!value) return ''
          const metric = props.metrics.find((m) => m.label === value)
          return metric && metric.key === props.highlightKey ? `{a|${value}}` : `{b|${value}}`
        },
        rich: {
          a: {
            color: '#00d4ff',
            fontWeight: 'bold',
          },
          b: {
            color: 'rgba(176,190,210,0.85)',
          },
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(0,212,255,0.04)', 'rgba(0,212,255,0.02)', 'rgba(0,212,255,0.04)', 'rgba(0,212,255,0.02)'],
        },
      },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: current,
            name: '当前得分',
            symbol: 'circle',
            symbolSize: 4,
            areaStyle: { color: 'rgba(0, 212, 255, 0.22)' },
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' },
          },
          {
            value: previous,
            name: '平均水平',
            symbol: 'none',
            lineStyle: { color: 'rgba(176,190,210,0.45)', width: 1.5, type: 'dashed' },
            itemStyle: { color: 'rgba(176,190,210,0.45)' },
          },
        ],
      },
    ],
  }
  chart.setOption(option)
}

onMounted(initChart)
watch(() => props.metrics, updateChart, { deep: true })

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

function onResize() { chart?.resize() }
window.addEventListener('resize', onResize)
</script>

<template>
  <div class="radar-card">
    <div class="card-title">学习维度雷达图</div>
    <div ref="chartRef" class="radar-chart" />
  </div>
</template>

<style scoped>
.radar-card {
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

.radar-card:hover {
  transform: translateY(-1px);
  border-color: rgba(124, 58, 237, 0.28);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.radar-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 88% 0%, rgba(124, 58, 237, 0.09), transparent 48%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 13px;
  font-weight: 700;
  color: #f2f6fa;
  letter-spacing: 0;
}

.radar-chart {
  position: relative;
  flex: 1;
  min-height: 140px;
}
</style>
