<script setup lang="ts">
import { AlertTriangle, MoveRight } from 'lucide-vue-next'

interface ProfileField {
  label: string
  value: string
}

interface ProfileTraceData {
  before: ProfileField[]
  evidence: string[]
  after: ProfileField[]
  nextAction: string
}

const props = defineProps<{
  data: ProfileTraceData
}>()
</script>

<template>
  <div class="put-root">
    <div class="put-grid">
      <div class="put-block before">
        <div class="put-block-hd">
          <span class="put-block-label">更新前</span>
        </div>
        <div class="put-fields">
          <div v-for="f in data.before" :key="f.label" class="put-field">
            <span class="put-f-label">{{ f.label }}</span>
            <span class="put-f-value">{{ f.value }}</span>
          </div>
        </div>
      </div>

      <div class="put-block evidence">
        <div class="put-block-hd">
          <span class="put-block-label ev-label">评估证据</span>
        </div>
        <div class="put-ev-list">
          <div v-for="(ev, i) in data.evidence" :key="i" class="put-ev-item">
            <AlertTriangle :size="13" stroke-width="1.5" class="put-ev-icon" />
            <span>{{ ev }}</span>
          </div>
        </div>
      </div>

      <div class="put-block after">
        <div class="put-block-hd">
          <span class="put-block-label af-label">更新后</span>
        </div>
        <div class="put-fields">
          <div v-for="f in data.after" :key="f.label" class="put-field">
            <span class="put-f-label">{{ f.label }}</span>
            <span class="put-f-value af">{{ f.value }}</span>
          </div>
        </div>
        <div class="put-next">
          <MoveRight :size="12" stroke-width="1.5" />
          <span>{{ data.nextAction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.put-root {
  width: 100%;
}

.put-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
}

.put-block {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.02);
}

.put-block.before {
  border-color: rgba(255, 255, 255, 0.06);
}

.put-block.evidence {
  border-color: rgba(244, 63, 94, 0.12);
  background: rgba(244, 63, 94, 0.03);
}

.put-block.after {
  border-color: rgba(6, 214, 160, 0.1);
  background: rgba(6, 214, 160, 0.03);
}

.put-block-hd {
  margin-bottom: 10px;
}

.put-block-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
}

.ev-label {
  color: rgba(244, 63, 94, 0.7);
}

.af-label {
  color: rgba(6, 214, 160, 0.7);
}

.put-fields {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.put-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.put-f-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.put-f-value {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
}

.put-f-value.af {
  color: #06d6a0;
}

.put-ev-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.put-ev-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.put-ev-icon {
  color: #f43f5e;
  flex-shrink: 0;
  margin-top: 1px;
}

.put-next {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.06);
  border: 1px solid rgba(0, 212, 255, 0.08);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
}

.put-next svg {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
}

@media (max-width: 800px) {
  .put-grid {
    grid-template-columns: 1fr;
  }
}
</style>
