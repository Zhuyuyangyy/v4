<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Slide {
  title: string
  subtitle?: string
  content: string
  icon?: string
  keyPoints?: string[]
  example?: string
  tip?: string
}

const props = defineProps<{
  slides: Slide[]
  color?: string
}>()

const currentSlide = ref(0)
const totalSlides = computed(() => props.slides.length)
const current = computed(() => props.slides[currentSlide.value])

function nextSlide() {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function goToSlide(index: number) {
  currentSlide.value = index
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevSlide()
  }
}

defineExpose({ handleKeydown })
</script>

<template>
  <div class="ppt-container">
    <!-- Header -->
    <div class="ppt-header">
      <span class="ppt-page">{{ currentSlide + 1 }} / {{ totalSlides }}</span>
      <span class="ppt-title">{{ current.title }}</span>
      <span class="ppt-hint">← → 翻页</span>
    </div>

    <!-- Content -->
    <div class="ppt-body">
      <div class="ppt-slide" :key="currentSlide">
        <!-- Title -->
        <div class="slide-title-row">
          <span v-if="current.icon" class="slide-icon">{{ current.icon }}</span>
          <div>
            <h2 class="slide-title">{{ current.title }}</h2>
            <p v-if="current.subtitle" class="slide-subtitle">{{ current.subtitle }}</p>
          </div>
        </div>

        <div class="slide-divider"></div>

        <!-- Content area with scroll -->
        <div class="slide-content-area">
          <div class="slide-main">
            <!-- Content lines -->
            <div v-for="(line, idx) in current.content.split('\n')" :key="idx" class="content-line">
              <template v-if="line.trim()">
                <span v-if="line.startsWith('•') || line.startsWith('-')" class="bullet">•</span>
                <span v-else-if="line.match(/^\d+[.、）)]/)" class="num">{{ line.match(/^\d+[.、）)]/)?.[0] }}</span>
                <span v-else-if="line.startsWith('**') && line.endsWith('**')" class="bold">{{ line.slice(2, -2) }}</span>
                <span v-else class="text">{{ line }}</span>
              </template>
            </div>

            <!-- Example -->
            <div v-if="current.example" class="example-box">
              <div class="example-label">示例代码</div>
              <pre class="example-code">{{ current.example }}</pre>
            </div>

            <!-- Tip -->
            <div v-if="current.tip" class="tip-box">
              <span class="tip-icon">💡</span>
              <span class="tip-text">{{ current.tip }}</span>
            </div>
          </div>

          <!-- Key points -->
          <div v-if="current.keyPoints && current.keyPoints.length > 0" class="slide-sidebar">
            <div class="kp-title">重点掌握</div>
            <div v-for="(point, idx) in current.keyPoints" :key="idx" class="kp-item">
              <span class="kp-num">{{ idx + 1 }}</span>
              <span class="kp-text">{{ point }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="ppt-nav">
      <button class="nav-btn" :disabled="currentSlide === 0" @click="prevSlide">
        <ChevronLeft :size="14" /> 上一页
      </button>
      <div class="nav-dots">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          class="dot"
          :class="{ active: idx === currentSlide }"
          @click="goToSlide(idx)"
        />
      </div>
      <button class="nav-btn" :disabled="currentSlide === totalSlides - 1" @click="nextSlide">
        下一页 <ChevronRight :size="14" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.ppt-container {
  width: 100%;
  height: 800px;
  background: #1a1f2e;
  border-radius: 8px;
  border: 1px solid #2a3040;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  overflow: hidden;
}

/* Header */
.ppt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #151921;
  border-bottom: 1px solid #2a3040;
  font-size: 12px;
}

.ppt-page {
  color: #8a90a0;
  font-weight: 600;
  min-width: 50px;
}

.ppt-title {
  color: #6a7080;
  flex: 1;
  text-align: center;
}

.ppt-hint {
  color: #4a5060;
  min-width: 50px;
  text-align: right;
}

/* Body */
.ppt-body {
  flex: 1;
  overflow: hidden;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
}

.ppt-slide {
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Title */
.slide-title-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.slide-icon {
  font-size: 24px;
}

.slide-title {
  font-size: 18px;
  font-weight: 700;
  color: #e8ecf4;
  margin: 0 0 2px;
}

.slide-subtitle {
  font-size: 12px;
  color: #6a7080;
  margin: 0;
}

.slide-divider {
  height: 1px;
  background: linear-gradient(90deg, #3b82f6, transparent);
  margin-bottom: 10px;
  flex-shrink: 0;
}

/* Content area */
.slide-content-area {
  flex: 1;
  display: flex;
  gap: 14px;
  overflow: hidden;
}

.slide-main {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.slide-main::-webkit-scrollbar {
  width: 4px;
}

.slide-main::-webkit-scrollbar-thumb {
  background: #3a4050;
  border-radius: 2px;
}

.slide-main::-webkit-scrollbar-track {
  background: transparent;
}

/* Content lines */
.content-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 3px 0;
  font-size: 12px;
  color: #c8cdd8;
  line-height: 1.5;
}

.bullet {
  color: #3b82f6;
  font-weight: 600;
  flex-shrink: 0;
}

.num {
  color: #3b82f6;
  font-weight: 600;
  flex-shrink: 0;
  min-width: 20px;
}

.bold {
  font-weight: 600;
  color: #e0e4ec;
}

.text {
  flex: 1;
}

/* Example */
.example-box {
  margin-top: 10px;
  background: #151921;
  border-radius: 4px;
  border: 1px solid #2a3040;
  overflow: hidden;
}

.example-label {
  padding: 4px 10px;
  background: #1a1f2e;
  font-size: 10px;
  font-weight: 600;
  color: #6a7080;
  border-bottom: 1px solid #2a3040;
}

.example-code {
  padding: 10px;
  margin: 0;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 10px;
  color: #a8b8c8;
  line-height: 1.4;
  overflow: auto;
  white-space: pre;
  max-height: 100px;
}

/* Tip */
.tip-box {
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 4px;
  border-left: 2px solid #3b82f6;
}

.tip-icon {
  font-size: 12px;
}

.tip-text {
  font-size: 11px;
  color: #8ab4f8;
  line-height: 1.4;
}

/* Sidebar */
.slide-sidebar {
  width: 160px;
  flex-shrink: 0;
  background: #1e2332;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid #2a3040;
  overflow-y: auto;
}

.kp-title {
  font-size: 10px;
  font-weight: 600;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #2a3040;
}

.kp-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 5px 0;
}

.kp-item + .kp-item {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.kp-num {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: #3b82f6;
  color: white;
  font-size: 9px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kp-text {
  font-size: 11px;
  color: #a0a8b8;
  line-height: 1.3;
}

/* Navigation */
.ppt-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #151921;
  border-top: 1px solid #2a3040;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  background: #1e2332;
  border: 1px solid #2a3040;
  color: #8a90a0;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: #252b3a;
  color: #e0e4ec;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: #2a3040;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.dot:hover {
  background: #3a4050;
}

.dot.active {
  background: #3b82f6;
  width: 16px;
}
</style>
