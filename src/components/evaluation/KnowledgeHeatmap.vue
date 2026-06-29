<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import type { KnowledgeModule } from '@/types/knowledge-tree'

const props = defineProps<{
  modules: KnowledgeModule[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const heatmapData = computed(() => {
  const xLabels = ['单元 1', '单元 2', '单元 3', '单元 4']
  const rows: [number, number, number][] = []
  props.modules.forEach((mod, yi) => {
    xLabels.forEach((_, xi) => {
      const unit = mod.units[xi]
      const value = unit ? Math.round(unit.avgMastery) : 0
      rows.push([xi, yi, value])
    })
  })
  return { xLabels, yLabels: props.modules.map(m => m.name), rows }
})

function initChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value, undefined, { renderer: 'svg' })
  updateChart()
}

function updateChart() {
  if (!chart) return
  const { xLabels, yLabels, rows } = heatmapData.value
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(13,18,38,0.92)',
      borderColor: 'rgba(255,255,255,0.1)',
      textStyle: { color: '#f2f6fa' },
      formatter: (params: any) => `${yLabels[params.value[1]]} · ${xLabels[params.value[0]]}<br/>平均掌握度 <b>${params.value[2]}%</b>`,
    },
    grid: { top: 8, right: 12, bottom: 28, left: 76 },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.04)'] } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(176,190,210,0.72)', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(176,190,210,0.82)', fontSize: 11, width: 70, overflow: 'truncate' },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: -6,
      itemWidth: 10,
      itemHeight: 80,
      textStyle: { color: 'rgba(176,190,210,0.6)', fontSize: 10 },
      inRange: {
        color: ['#1e3a5f', '#2563eb', '#06d6a0', '#f59e0b', '#ef4444'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: rows,
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(255,255,255,0.35)',
          },
        },
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(13,18,38,0.8)',
          borderWidth: 1,
        },
      },
    ],
  }
  chart.setOption(option)
}

onMounted(initChart)
watch(() => props.modules, updateChart, { deep: true })

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

function onResize() { chart?.resize() }
window.addEventListener('resize', onResize)
</script>

<template>
  <div class="heatmap-card">
    <div class="card-title">知识能力热力图</div>
    <div ref="chartRef" class="heatmap-chart" />
  </div>
</template>

<style scoped>
.heatmap-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  background: rgba(13, 18, 38, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(1.2);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.heatmap-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(244, 63, 94, 0.08), transparent 60%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  color: rgba(242, 246, 250, 0.9);
}

.heatmap-chart {
  position: relative;
  flex: 1;
  min-height: 140px;
}
</style>
