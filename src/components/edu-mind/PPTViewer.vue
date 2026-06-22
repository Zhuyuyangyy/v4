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
const progress = computed(() => ((currentSlide.value + 1) / totalSlides.value) * 100)

function nextSlide() {
  if (currentSlide.value < totalSlides.value - 1) currentSlide.value++
}
function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--
}
function goToSlide(i: number) { currentSlide.value = i }
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide() }
}

defineExpose({ handleKeydown })
</script>

<template>
  <div class="pptx">
    <!-- 进度条 -->
    <div class="pptx-progress-track">
      <div class="pptx-progress-fill" :style="{ width: progress + '%' }" />
    </div>

    <!-- 幻灯片主体 -->
    <div class="pptx-viewport">
      <Transition name="pptx-transition" mode="out-in">
        <div class="pptx-slide" :key="currentSlide">

          <!-- ===== 左侧: 大号标题 + 内容 ===== -->
          <div class="pptx-left">
            <!-- 页码装饰 -->
            <div class="pptx-pagenum">
              <span class="pagenum-current">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
              <span class="pagenum-sep">/</span>
              <span class="pagenum-total">{{ String(totalSlides).padStart(2, '0') }}</span>
            </div>

            <!-- 标题区 -->
            <div class="pptx-titlezone">
              <span v-if="current.icon" class="pptx-icon">{{ current.icon }}</span>
              <h1 class="pptx-title">{{ current.title }}</h1>
              <p v-if="current.subtitle" class="pptx-subtitle">{{ current.subtitle }}</p>
            </div>

            <!-- 发光分割 -->
            <div class="pptx-separator">
              <span class="sep-dot" />
              <span class="sep-line" />
              <span class="sep-dot" />
            </div>

            <!-- 正文内容 -->
            <div class="pptx-body-scroll">
              <div class="pptx-content">
                <div v-for="(line, idx) in current.content.split('\n')" :key="idx">
                  <template v-if="line.trim()">
                    <!-- 要点 -->
                    <div v-if="line.startsWith('•') || line.startsWith('-')" class="cl-bullet">
                      <span class="cl-bullet-icon">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="2" fill="currentColor"/></svg>
                      </span>
                      <span>{{ line.replace(/^[\s]*[•\-]\s*/, '') }}</span>
                    </div>
                    <!-- 编号 -->
                    <div v-else-if="line.match(/^\d+[.、）)]/)" class="cl-num">
                      <span class="cl-num-ring">{{ line.match(/^\d+/)?.[0] }}</span>
                      <span>{{ line.replace(/^\d+[.、）)]\s*/, '') }}</span>
                    </div>
                    <!-- 加粗标题行 -->
                    <div v-else-if="line.startsWith('**') && line.endsWith('**')" class="cl-heading">
                      {{ line.slice(2, -2) }}
                    </div>
                    <!-- 普通 -->
                    <div v-else class="cl-text">{{ line }}</div>
                  </template>
                </div>
              </div>

              <!-- 代码块 -->
              <div v-if="current.example" class="pptx-codeblock">
                <div class="codeblock-bar">
                  <span class="cb-dot" /><span class="cb-dot" /><span class="cb-dot" />
                  <span class="cb-label">CODE</span>
                </div>
                <pre class="codeblock-body">{{ current.example }}</pre>
              </div>

              <!-- 提示 -->
              <div v-if="current.tip" class="pptx-callout">
                <div class="callout-icon">💡</div>
                <div class="callout-text">{{ current.tip }}</div>
              </div>
            </div>
          </div>

          <!-- ===== 右侧: 重点卡片 ===== -->
          <div v-if="current.keyPoints && current.keyPoints.length > 0" class="pptx-right">
            <div class="pptx-right-inner">
              <div class="right-head">
                <span class="right-head-icon">✦</span>
                <span>KEY POINTS</span>
              </div>
              <div class="right-cards">
                <div v-for="(point, idx) in current.keyPoints" :key="idx" class="right-card">
                  <div class="rc-num">{{ String(idx + 1).padStart(2, '0') }}</div>
                  <div class="rc-text">{{ point }}</div>
                  <div class="rc-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 底部导航栏 -->
    <div class="pptx-footer">
      <button class="ft-btn" :disabled="currentSlide === 0" @click="prevSlide">
        <ChevronLeft :size="16" />
      </button>

      <div class="ft-center">
        <div class="ft-dots">
          <button
            v-for="(_, idx) in slides" :key="idx"
            class="ft-dot"
            :class="{ on: idx === currentSlide }"
            @click="goToSlide(idx)"
          />
        </div>
        <span class="ft-counter">{{ currentSlide + 1 }} / {{ totalSlides }}</span>
      </div>

      <button class="ft-btn" :disabled="currentSlide === totalSlides - 1" @click="nextSlide">
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ================================================
   PPTX — 大胆重新设计：深空 + 赛博玻璃 + 霓虹
   ================================================ */

.pptx {
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  /* 多层深空背景 */
  background:
    radial-gradient(ellipse 120% 80% at 10% 90%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse 100% 60% at 90% 10%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
    linear-gradient(160deg, #060a18 0%, #0a1628 35%, #0d0f20 70%, #080c1a 100%);
  border: 1px solid rgba(100, 160, 255, 0.08);
  box-shadow:
    0 0 60px rgba(59, 130, 246, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

/* ====== 顶部进度条 ====== */
.pptx-progress-track {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.03);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.pptx-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
  border-radius: 0 3px 3px 0;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5), 0 0 4px rgba(139, 92, 246, 0.4);
  position: relative;
}

.pptx-progress-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.4);
}

/* ====== 幻灯片视口 ====== */
.pptx-viewport {
  flex: 1;
  overflow: hidden;
  padding: 28px 32px 20px;
}

.pptx-slide {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 28px;
}

/* ====== 左栏 ====== */
.pptx-left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 页码 */
.pptx-pagenum {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.pagenum-current {
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
}

.pagenum-sep {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.12);
  margin: 0 2px;
}

.pagenum-total {
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.2);
  font-family: 'SF Mono', 'Cascadia Code', monospace;
}

/* 标题区 */
.pptx-titlezone {
  flex-shrink: 0;
  margin-bottom: 16px;
}

.pptx-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 6px;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
}

.pptx-title {
  font-size: 26px;
  font-weight: 800;
  color: #f0f4ff;
  margin: 0;
  line-height: 1.25;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(59, 130, 246, 0.15);
}

.pptx-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin: 6px 0 0;
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* 分割符 */
.pptx-separator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  flex-shrink: 0;
}

.sep-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
}

.sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.35), rgba(139, 92, 246, 0.15), transparent);
}

/* 内容滚动区 */
.pptx-body-scroll {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.pptx-body-scroll::-webkit-scrollbar { width: 3px; }
.pptx-body-scroll::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 3px;
}
.pptx-body-scroll::-webkit-scrollbar-track { background: transparent; }

.pptx-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* --- 内容行: 要点 --- */
.cl-bullet {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13.5px;
  color: #c0cfe4;
  line-height: 1.55;
  background: rgba(59, 130, 246, 0.03);
  border: 1px solid rgba(59, 130, 246, 0.05);
  transition: all 0.2s;
}

.cl-bullet:hover {
  background: rgba(59, 130, 246, 0.07);
  border-color: rgba(59, 130, 246, 0.12);
  transform: translateX(4px);
}

.cl-bullet-icon {
  flex-shrink: 0;
  color: #3b82f6;
  margin-top: 2px;
}

/* --- 内容行: 编号 --- */
.cl-num {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13.5px;
  color: #c0cfe4;
  line-height: 1.55;
  transition: all 0.2s;
}

.cl-num:hover {
  background: rgba(139, 92, 246, 0.05);
  transform: translateX(4px);
}

.cl-num-ring {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  color: #a78bfa;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'SF Mono', monospace;
  background: rgba(139, 92, 246, 0.06);
}

/* --- 内容行: 加粗标题 --- */
.cl-heading {
  font-size: 15px;
  font-weight: 700;
  color: #e8edf8;
  padding: 10px 12px 4px;
  letter-spacing: -0.01em;
}

/* --- 内容行: 普通文字 --- */
.cl-text {
  font-size: 13px;
  color: #8898b4;
  padding: 3px 12px;
  line-height: 1.55;
}

/* ====== 代码块 ====== */
.pptx-codeblock {
  margin-top: 16px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(100, 160, 255, 0.08);
  background: rgba(6, 10, 24, 0.7);
}

.codeblock-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(15, 22, 40, 0.8);
  border-bottom: 1px solid rgba(100, 160, 255, 0.06);
}

.cb-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  opacity: 0.5;
}
.cb-dot:nth-child(1) { background: #ff5f57; }
.cb-dot:nth-child(2) { background: #febc2e; }
.cb-dot:nth-child(3) { background: #28c840; }

.cb-label {
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  color: rgba(59, 130, 246, 0.5);
  letter-spacing: 0.12em;
  font-family: 'SF Mono', monospace;
}

.codeblock-body {
  padding: 16px 18px;
  margin: 0;
  font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
  font-size: 11.5px;
  color: #8fa8c8;
  line-height: 1.65;
  overflow: auto;
  white-space: pre;
  max-height: 130px;
  background: transparent;
}

/* ====== 提示 callout ====== */
.pptx-callout {
  margin-top: 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background:
    linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.02));
  border: 1px solid rgba(251, 191, 36, 0.12);
  position: relative;
  overflow: hidden;
}

.pptx-callout::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #fbbf24, #f59e0b);
}

.callout-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.callout-text {
  font-size: 12.5px;
  color: #d4b870;
  line-height: 1.6;
}

/* ====== 右侧重点面板 ====== */
.pptx-right {
  width: 240px;
  flex-shrink: 0;
}

.pptx-right-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(ellipse 100% 50% at 50% 0%, rgba(59, 130, 246, 0.06), transparent 60%),
    rgba(12, 16, 32, 0.6);
  border: 1px solid rgba(100, 160, 255, 0.08);
  border-radius: 14px;
  padding: 18px 16px;
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.right-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 800;
  color: rgba(59, 130, 246, 0.7);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(100, 160, 255, 0.06);
  font-family: 'SF Mono', monospace;
}

.right-head-icon {
  font-size: 14px;
  color: #3b82f6;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.right-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.right-cards::-webkit-scrollbar { width: 2px; }
.right-cards::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.15); border-radius: 2px; }

.right-card {
  position: relative;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.04);
  border: 1px solid rgba(59, 130, 246, 0.07);
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.right-card:hover {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.18);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.1);
}

.rc-num {
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.12));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
  font-family: 'SF Mono', monospace;
}

.rc-text {
  font-size: 12px;
  color: #8fa8c8;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

.rc-glow {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%);
  pointer-events: none;
}

/* ====== 底部导航 ====== */
.pptx-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(8, 12, 24, 0.7);
  border-top: 1px solid rgba(100, 160, 255, 0.06);
  backdrop-filter: blur(16px);
  flex-shrink: 0;
}

.ft-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.12);
  color: #60a5fa;
  cursor: pointer;
  transition: all 0.2s;
}

.ft-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.18);
  border-color: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.15);
}

.ft-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.ft-center {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ft-dots {
  display: flex;
  gap: 6px;
}

.ft-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid rgba(100, 160, 255, 0.15);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.ft-dot:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.1);
}

.ft-dot.on {
  background: #3b82f6;
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.2);
}

.ft-counter {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.25);
  font-family: 'SF Mono', monospace;
  letter-spacing: 0.06em;
}

/* ====== 切换动画 ====== */
.pptx-transition-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.pptx-transition-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}
.pptx-transition-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
.pptx-transition-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
