<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Map,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from 'lucide-vue-next'

const router = useRouter()

const profileSummary = {
  level: '基础中等',
  strengths: ['C 语言基础', 'Python 编程'],
  weaknesses: ['图结构理解', '指针与内存'],
  preference: '思维导图 + 例题拆解',
  updatedAt: '2026-05-12 15:30',
}

const todayPath = [
  { label: '课前预习', tasks: 2, icon: '📖' },
  { label: '课中答疑', tasks: 1, icon: '💬' },
  { label: '课后巩固', tasks: 1, icon: '✏️' },
  { label: '阶段测评', tasks: 0, icon: '📊' },
]

const lastFeedback = {
  date: '2026-05-12',
  finding: '图结构理解 掌握度降至 42%，已插入补救资源',
  action: '下一轮路径优先复习图结构相关知识',
}

const nextRecommend = {
  title: '图结构思维导图',
  reason: '评估发现你的图结构存在概念混淆，推荐从思维导图层级梳理开始',
  link: '/resources',
}
</script>

<template>
  <div class="lld-root">
    <div class="lld-grid">
      <div class="lld-card">
        <div class="lld-card-hd">
          <User :size="16" stroke-width="1.5" class="lld-hd-icon profile" />
          <span>学生画像摘要</span>
          <span class="lld-badge updated">已更新</span>
        </div>
        <div class="lld-card-body">
          <div class="lld-row">
            <span class="lld-k">当前水平</span>
            <span class="lld-v">{{ profileSummary.level }}</span>
          </div>
          <div class="lld-row">
            <span class="lld-k">优势项</span>
            <span class="lld-v green">{{ profileSummary.strengths.join('、') }}</span>
          </div>
          <div class="lld-row">
            <span class="lld-k">薄弱项</span>
            <span class="lld-v red">{{ profileSummary.weaknesses.join('、') }}</span>
          </div>
          <div class="lld-row">
            <span class="lld-k">资源偏好</span>
            <span class="lld-v">{{ profileSummary.preference }}</span>
          </div>
        </div>
      </div>

      <div class="lld-card">
        <div class="lld-card-hd">
          <Map :size="16" stroke-width="1.5" class="lld-hd-icon path" />
          <span>今日学习路径</span>
        </div>
        <div class="lld-card-body">
          <div
            v-for="step in todayPath"
            :key="step.label"
            class="lld-row"
          >
            <span class="lld-k">{{ step.icon }} {{ step.label }}</span>
            <span class="lld-v">{{ step.tasks > 0 ? step.tasks + ' 项' : '—' }}</span>
          </div>
          <button class="lld-link" @click="router.push('/learning-path')">
            查看完整路径
            <ArrowRight :size="12" stroke-width="1.5" />
          </button>
        </div>
      </div>

      <div class="lld-card">
        <div class="lld-card-hd">
          <AlertTriangle :size="16" stroke-width="1.5" class="lld-hd-icon eval" />
          <span>最近评估反馈</span>
          <span class="lld-badge warn">需关注</span>
        </div>
        <div class="lld-card-body">
          <p class="lld-finding">{{ lastFeedback.finding }}</p>
          <div class="lld-action-hint">
            <TrendingUp :size="13" stroke-width="1.5" />
            <span>{{ lastFeedback.action }}</span>
          </div>
        </div>
      </div>

      <div class="lld-card">
        <div class="lld-card-hd">
          <Lightbulb :size="16" stroke-width="1.5" class="lld-hd-icon rec" />
          <span>下一步推荐</span>
        </div>
        <div class="lld-card-body">
          <p class="lld-rec-title">{{ nextRecommend.title }}</p>
          <p class="lld-rec-reason">{{ nextRecommend.reason }}</p>
          <button class="lld-link" @click="router.push(nextRecommend.link)">
            开始学习
            <ArrowRight :size="12" stroke-width="1.5" />
          </button>
        </div>
      </div>
    </div>

    <div class="lld-footer-tip">
      <span>评估不是终点，而是下一轮画像更新和路径优化的起点。</span>
    </div>
  </div>
</template>

<style scoped>
.lld-root {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 48px;
}

.lld-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.lld-card {
  padding: 20px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(170deg, rgba(14, 18, 42, 0.75), rgba(8, 10, 28, 0.85));
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s var(--ease-out);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.lld-card:hover {
  border-color: rgba(0, 212, 255, 0.12);
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 8px 24px rgba(0, 0, 0, 0.25);
}

.lld-card-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.lld-hd-icon.profile { color: var(--color-accent-cyan, #00d4ff); }
.lld-hd-icon.path { color: #7c3aed; }
.lld-hd-icon.eval { color: #f59e0b; }
.lld-hd-icon.rec { color: #06d6a0; }

.lld-badge {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 500;
}

.lld-badge.updated {
  background: rgba(6, 214, 160, 0.1);
  color: #06d6a0;
}

.lld-badge.warn {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.lld-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lld-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.lld-k {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.lld-v {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.lld-v.green { color: #06d6a0; }
.lld-v.red { color: #f43f5e; }

.lld-finding {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.lld-action-hint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.06);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}

.lld-action-hint svg {
  color: var(--color-accent-cyan);
  flex-shrink: 0;
  margin-top: 1px;
}

.lld-rec-title {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.lld-rec-reason {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  margin: 0;
}

.lld-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  padding: 6px 0;
  font-size: 12px;
  color: var(--color-accent-cyan, #00d4ff);
  cursor: pointer;
  transition: color 0.2s;
}

.lld-link:hover {
  color: #fff;
}

.lld-footer-tip {
  text-align: center;
  padding: 14px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.03), rgba(124, 58, 237, 0.03));
  border: 1px solid rgba(0, 212, 255, 0.05);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
}

@media (max-width: 1000px) {
  .lld-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .lld-grid {
    grid-template-columns: 1fr;
  }
  .lld-root {
    padding: 0 20px 32px;
  }
}
</style>