<template>
  <div class="flex items-center justify-center relative select-none">
    <svg :width="size" :height="size" class="overflow-visible">
      <defs>
        <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(201, 168, 76, 0.15)" />
          <stop offset="100%" stop-color="rgba(201, 168, 76, 0)" />
        </radialGradient>
      </defs>

      <circle :cx="center" :cy="center" :r="maxRadius" fill="url(#radar-glow)" />

      <path
        v-for="(path, i) in gridPaths"
        :key="'scale-' + i"
        :d="path"
        fill="none"
        stroke="rgba(203, 213, 225, 0.4)"
        stroke-width="1"
        :stroke-dasharray="i === 4 ? 'none' : '3,3'"
      />

      <line
        v-for="(line, i) in axisLines"
        :key="'axis-' + i"
        :x1="line.x1" :y1="line.y1"
        :x2="line.x2" :y2="line.y2"
        stroke="rgba(203, 213, 225, 0.5)"
        stroke-width="1"
      />

      <path
        :d="dataPath"
        fill="rgba(201, 168, 76, 0.18)"
        stroke="#c9a84c"
        stroke-width="2.5"
        class="transition-all duration-700 ease-out"
      />

      <g v-for="(pt, i) in dataPoints" :key="'data-dot-' + i" class="transition-all duration-700 ease-out">
        <circle :cx="pt.x" :cy="pt.y" r="4.5" fill="#c9a84c" stroke="#ffffff" stroke-width="1.5" />
        <circle :cx="pt.x" :cy="pt.y" r="9" fill="transparent" class="hover:fill-[rgba(59,130,246,0.1)] cursor-pointer">
          <title>{{ points[i].dimension }}: {{ points[i].score }}</title>
        </circle>
      </g>

      <g v-for="(p, i) in points" :key="'label-group-' + i" class="font-sans">
        <text
          :x="getLabelCoords(i).x"
          :y="getLabelCoords(i).y"
          :text-anchor="getLabelAnchor(i)"
          dy="0.33em"
          class="text-[11px] font-semibold text-gray-700 fill-current"
        >{{ p.dimension }}</text>
        <text
          :x="getLabelCoords(i).x"
          :y="getLabelCoords(i).y + (Math.sin(getAngle(i)) > 0.8 ? 16 : 11)"
          :text-anchor="getLabelAnchor(i)"
          dy="0.33em"
          class="text-[10px] font-bold fill-current" style="color: var(--gold-500)"
        >{{ p.score }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RadarPoint } from '@/types/dialogue'

const props = withDefaults(defineProps<{
  points: RadarPoint[]
  size?: number
}>(), {
  size: 260,
})

const center = computed(() => props.size / 2)
const maxRadius = computed(() => (props.size / 2) * 0.72)
const numAxes = computed(() => props.points.length)

function getAngle(index: number) {
  return (index * 2 * Math.PI) / numAxes.value - Math.PI / 2
}

function getCoordinates(index: number, value: number) {
  const angle = getAngle(index)
  const r = (value / 100) * maxRadius.value
  return {
    x: center.value + r * Math.cos(angle),
    y: center.value + r * Math.sin(angle),
  }
}

function getLabelCoords(index: number) {
  const angle = getAngle(index)
  return {
    x: center.value + (maxRadius.value + 18) * Math.cos(angle),
    y: center.value + (maxRadius.value + 14) * Math.sin(angle),
  }
}

function getLabelAnchor(index: number) {
  const angle = getAngle(index)
  if (Math.abs(Math.cos(angle)) > 0.1) return Math.cos(angle) > 0 ? 'start' : 'end'
  return 'middle'
}

const scales = [0.2, 0.4, 0.6, 0.8, 1.0]
const gridPaths = computed(() =>
  scales.map(scale => {
    const pts = Array.from({ length: numAxes.value }, (_, i) => {
      const { x, y } = getCoordinates(i, scale * 100)
      return `${x},${y}`
    })
    return `M ${pts.join(' L ')} Z`
  })
)

const dataPoints = computed(() =>
  props.points.map((p, i) => getCoordinates(i, p.score))
)

const dataPath = computed(() =>
  `M ${dataPoints.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')} Z`
)

const axisLines = computed(() =>
  Array.from({ length: numAxes.value }, (_, i) => {
    const end = getCoordinates(i, 100)
    return { x1: center.value, y1: center.value, x2: end.x, y2: end.y }
  })
)
</script>
