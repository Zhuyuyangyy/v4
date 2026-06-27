<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

interface DistributionItem {
  label: string
  key: string
  count: number
  color: string
}

const props = defineProps<{
  distribution: DistributionItem[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const total = computed(() => props.distribution.reduce((s, d) => s + d.count, 0))

function initChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value, undefined, { renderer: 'svg' })
  updateChart()
}

function updateChart() {
  if (!chart) return
  const data = props.distribution
    .filter(d => d.count > 0)
    .map(d => ({ value: d.count, name: d.label, itemStyle: { color: d.color } }))

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(176,190,210,0.8)', fontSize: 11 },
      formatter: (name: string) => {
        const item = props.distribution.find(d => d.label === name)
        const pct = total.value ? ((item?.count ?? 0) / total.value * 100).toFixed(1) : '0.0'
        return `${name}  ${item?.count ?? 0} (${pct}%)`
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['54%', '72%'],
        center: ['34%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(13,18,38,0.8)',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#f2f6fa',
            formatter: '{b}\n{d}%',
          },
          itemStyle: {
            shadowBlur: 12,
            shadowColor: 'rgba(255,255,255,0.25)',
          },
        },
        data,
      },
    ],
  }
  chart.setOption(option)
}

onMounted(initChart)
watch(() => props.distribution, updateChart, { deep: true })

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

function onResize() { chart?.resize() }
window.addEventListener('resize', onResize)
</script>

<template>
  <div class="dist-card">
    <div class="card-title">掌握度分布</div>
    <div ref="chartRef" class="dist-chart" />
  </div>
</template>

<style scoped>
.dist-card {
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

.dist-card:hover {
  transform: translateY(-1px);
  border-color: rgba(6, 214, 160, 0.26);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.dist-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 88% 0%, rgba(6, 214, 160, 0.09), transparent 48%);
  pointer-events: none;
}

.card-title {
  position: relative;
  font-size: 13px;
  font-weight: 700;
  color: #f2f6fa;
  letter-spacing: 0;
}

.dist-chart {
  position: relative;
  flex: 1;
  min-height: 140px;
}
</style>
