<script setup lang="ts">
import { ref } from 'vue'
import { Info, ChevronDown } from 'lucide-vue-next'

export interface RecommendEvidence {
  profileSource: string
  evaluationReason: string
  pathStage: string
  formatReason: string
}

defineProps<{
  title: string
  reason: string
  evidence?: RecommendEvidence
  profileTag?: string
  pathStage?: string
  format?: string
  estTime?: string
}>()

const open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="rrp-wrapper">
    <button class="rrp-trigger" @click.stop="toggle">
      <Info :size="12" stroke-width="1.5" />
      <span>为什么推荐？</span>
      <ChevronDown :size="12" stroke-width="1.5" :class="['rrp-chev', { open }]" />
    </button>

    <Transition name="drop">
      <div v-if="open" class="rrp-popover" @click.stop>
        <div class="rrp-arrow" />

        <div class="rrp-chain">
          <div class="rrp-chain-header">
            <span class="rrp-chain-icon">🔗</span>
            <span>推荐证据链</span>
          </div>

          <ol class="rrp-steps">
            <li class="rrp-step">
              <span class="rrp-step-num">1</span>
              <div>
                <strong>画像标签</strong>
                <p v-if="evidence?.profileSource">{{ evidence.profileSource }}</p>
                <p v-else-if="profileTag">根据"{{ profileTag }}"标签匹配该资源</p>
                <p v-else>根据学生画像薄弱项分析触发推荐</p>
              </div>
            </li>
            <li class="rrp-step">
              <span class="rrp-step-num">2</span>
              <div>
                <strong>评估证据</strong>
                <p v-if="evidence?.evaluationReason">{{ evidence.evaluationReason }}</p>
                <p v-else>评估智能体检测到该知识域正确率低于阈值</p>
              </div>
            </li>
            <li class="rrp-step">
              <span class="rrp-step-num">3</span>
              <div>
                <strong>路径阶段</strong>
                <p v-if="evidence?.pathStage">{{ evidence.pathStage }}</p>
                <p v-else-if="pathStage">当前学习路径处于"{{ pathStage }}"阶段</p>
                <p v-else>匹配当前学习路径所处阶段</p>
              </div>
            </li>
            <li class="rrp-step">
              <span class="rrp-step-num">4</span>
              <div>
                <strong>形式选择</strong>
                <p v-if="evidence?.formatReason">{{ evidence.formatReason }}</p>
                <p v-else-if="format">基于学习偏好推荐"{{ format }}"形式</p>
                <p v-else>资源形式匹配你的学习偏好</p>
              </div>
            </li>
          </ol>

          <div class="rrp-summary">
            <span>{{ reason }}</span>
            <span v-if="estTime" class="rrp-est">预计 {{ estTime }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.rrp-wrapper {
  position: relative;
  z-index: 5;
}

.rrp-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  background: rgba(0, 212, 255, 0.04);
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.rrp-trigger:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: rgba(255, 255, 255, 0.75);
  background: rgba(0, 212, 255, 0.08);
}

.rrp-chev {
  transition: transform 0.25s ease;
}

.rrp-chev.open {
  transform: rotate(180deg);
}

.rrp-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 340px;
  padding: 18px;
  border-radius: 14px;
  background: rgba(10, 16, 36, 0.98);
  border: 1px solid rgba(120, 180, 255, 0.15);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(18px);
  z-index: 10;
}

.rrp-arrow {
  position: absolute;
  top: -6px;
  left: 18px;
  width: 12px;
  height: 12px;
  background: rgba(10, 16, 36, 0.98);
  border-left: 1px solid rgba(120, 180, 255, 0.15);
  border-top: 1px solid rgba(120, 180, 255, 0.15);
  transform: rotate(45deg);
}

.rrp-chain-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #fff;
  font-weight: 600;
}

.rrp-chain-icon {
  font-size: 14px;
}

.rrp-steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.rrp-step {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.rrp-step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.12);
  color: var(--color-accent-cyan, #00d4ff);
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.rrp-step strong {
  display: block;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 2px;
  font-weight: 500;
}

.rrp-step p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: 0;
}

.rrp-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.08);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.rrp-est {
  color: rgba(245, 158, 11, 0.8);
  font-weight: 500;
  white-space: nowrap;
}

.drop-enter-active {
  transition: all 0.2s ease-out;
}
.drop-leave-active {
  transition: all 0.15s ease-in;
}
.drop-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 500px) {
  .rrp-popover {
    width: 260px;
    left: auto;
    right: -10px;
  }
  .rrp-arrow {
    left: auto;
    right: 24px;
  }
}
</style>