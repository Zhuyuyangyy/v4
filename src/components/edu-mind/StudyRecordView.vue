<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Clock,
  BookOpen,
  PenTool,
  Flame,
  Calendar,
  Video,
  FileText,
  CheckCircle,
  TrendingUp,
  Filter,
  ChevronDown,
  BarChart3,
  Target,
  Activity,
  Timer
} from 'lucide-vue-next'

const dateRange = ref<string>('本周')
const activityTypeFilter = ref<string>('全部')

const dateRanges = ['本周', '本月', '近三月', '全部']
const activityTypes = ['全部', '观看视频', '完成练习', '阅读资料']

const stats = ref([
  { label: '总学习时长', value: '128.5h', icon: Clock, color: '#c4b5fd' },
  { label: '完成课程', value: '12', icon: BookOpen, color: '#7be3b8' },
  { label: '完成练习', value: '86', icon: PenTool, color: '#ffb46c' },
  { label: '连续学习', value: '15天', icon: Flame, color: '#ff8da1' }
])

const weeklyData = ref([
  { day: '周一', total: 2.5, video: 1.2, practice: 0.8, reading: 0.5 },
  { day: '周二', total: 1.8, video: 0.6, practice: 0.9, reading: 0.3 },
  { day: '周三', total: 3.2, video: 1.5, practice: 1.0, reading: 0.7 },
  { day: '周四', total: 2.0, video: 0.8, practice: 0.7, reading: 0.5 },
  { day: '周五', total: 4.1, video: 2.0, practice: 1.3, reading: 0.8 },
  { day: '周六', total: 3.5, video: 1.5, practice: 1.5, reading: 0.5 },
  { day: '周日', total: 1.4, video: 0.4, practice: 0.6, reading: 0.4 }
])

const maxWeeklyHours = computed(() => Math.max(...weeklyData.value.map(d => d.total)))
const weeklyTotal = computed(() => weeklyData.value.reduce((a, b) => a + b.total, 0))
const weeklyAvg = computed(() => +(weeklyTotal.value / 7).toFixed(1))

const timeline = ref([
  {
    date: '今天',
    items: [
      { course: 'C语言程序设计', type: '观看视频', typeIcon: Video, duration: '45分钟', time: '14:30', color: '#6d5cff' },
      { course: '数据结构与算法', type: '完成练习', typeIcon: PenTool, duration: '30分钟', time: '11:20', color: '#7be3b8' },
      { course: 'Python编程基础', type: '阅读资料', typeIcon: FileText, duration: '20分钟', time: '09:15', color: '#ffb46c' }
    ]
  },
  {
    date: '昨天',
    items: [
      { course: '机器学习导论', type: '观看视频', typeIcon: Video, duration: '60分钟', time: '20:00', color: '#6d5cff' },
      { course: 'C语言程序设计', type: '完成练习', typeIcon: PenTool, duration: '40分钟', time: '16:45', color: '#7be3b8' },
      { course: '操作系统原理', type: '阅读资料', typeIcon: FileText, duration: '25分钟', time: '14:10', color: '#ffb46c' },
      { course: '数据结构与算法', type: '观看视频', typeIcon: Video, duration: '35分钟', time: '10:30', color: '#6d5cff' }
    ]
  },
  {
    date: '05月24日',
    items: [
      { course: 'Python编程基础', type: '完成练习', typeIcon: PenTool, duration: '50分钟', time: '19:20', color: '#7be3b8' },
      { course: '深度学习基础', type: '观看视频', typeIcon: Video, duration: '55分钟', time: '15:00', color: '#6d5cff' },
      { course: 'C语言程序设计', type: '阅读资料', typeIcon: FileText, duration: '15分钟', time: '11:05', color: '#ffb46c' }
    ]
  }
])

const courseProgress = ref([
  { name: 'C语言程序设计', progress: 78, lastStudied: '今天 14:30', color: '#6d5cff' },
  { name: '数据结构与算法', progress: 62, lastStudied: '今天 11:20', color: '#8b7bff' },
  { name: 'Python编程基础', progress: 45, lastStudied: '今天 09:15', color: '#6d5cff' },
  { name: '机器学习导论', progress: 33, lastStudied: '昨天 20:00', color: '#8b7bff' },
  { name: '操作系统原理', progress: 21, lastStudied: '昨天 14:10', color: '#6d5cff' }
])

const filteredTimeline = computed(() => {
  if (activityTypeFilter.value === '全部') return timeline.value
  return timeline.value.map(group => ({
    ...group,
    items: group.items.filter(item => item.type === activityTypeFilter.value)
  })).filter(group => group.items.length > 0)
})

function getTypeBadgeClass(type: string) {
  switch (type) {
    case '观看视频': return 'type-video'
    case '完成练习': return 'type-practice'
    case '阅读资料': return 'type-reading'
    default: return ''
  }
}
</script>

<template>
  <div class="sr-page">

    <!-- 统计卡 -->
    <div class="sr-stats">
      <div v-for="stat in stats" :key="stat.label" class="sr-stat">
        <div class="sr-stat__icon" :style="{ color: stat.color, background: stat.color + '14' }">
          <component :is="stat.icon" :size="18" />
        </div>
        <div>
          <div class="sr-stat__value">{{ stat.value }}</div>
          <div class="sr-stat__label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="sr-main">

      <!-- 本周学习 -->
      <div class="sr-chart">
        <div class="sr-chart__head">
          <div>
            <div class="sr-chart__title">本周学习</div>
            <div class="sr-chart__sub">日均 {{ weeklyAvg }}h · 累计 {{ weeklyTotal.toFixed(1) }}h</div>
          </div>
          <div class="sr-chart__legend">
            <span><i style="background:#6d5cff" />视频</span>
            <span><i style="background:#8b7bff" />练习</span>
            <span><i style="background:#c4b5fd" />阅读</span>
          </div>
        </div>

        <div class="sr-chart__body">
          <!-- 网格线 + Y 轴 -->
          <div class="sr-chart__grid">
            <div v-for="n in 5" :key="n" class="sr-chart__gridline">
              <span class="sr-chart__gridlabel">{{ ((5 - n + 1) / 5 * maxWeeklyHours).toFixed(1) }}h</span>
              <div class="sr-chart__gridline-bar" />
            </div>
          </div>

          <!-- 柱子区 -->
          <div class="sr-chart__bars">
            <div v-for="(item, idx) in weeklyData" :key="item.day" class="sr-col">
              <!-- 数值标签 -->
              <div class="sr-col__val">{{ item.total }}h</div>

              <!-- 堆叠柱子 -->
              <div class="sr-col__track">
                <div class="sr-col__bar" :style="{ height: (item.total / maxWeeklyHours) * 100 + '%' }">
                  <div class="sr-seg sr-seg--reading" :style="{ height: (item.reading / item.total) * 100 + '%' }" />
                  <div class="sr-seg sr-seg--practice" :style="{ height: (item.practice / item.total) * 100 + '%' }" />
                  <div class="sr-seg sr-seg--video" :style="{ height: (item.video / item.total) * 100 + '%' }" />
                </div>
              </div>

              <!-- 日期 -->
              <div class="sr-col__day" :class="{ 'is-active': idx === 5 }">{{ item.day }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程进度 -->
      <div class="sr-courses">
        <div class="sr-courses__head">
          <div class="sr-courses__title">
            <Target :size="16" /> 课程进度
          </div>
          <span class="sr-courses__count">{{ courseProgress.length }} 门</span>
        </div>
        <div class="sr-courses__list">
          <div v-for="(c, idx) in courseProgress" :key="c.name" class="sr-course">
            <div class="sr-course__rank" :class="idx < 3 ? 'top' : ''">{{ idx + 1 }}</div>
            <div class="sr-course__info">
              <div class="sr-course__top">
                <span class="sr-course__name">{{ c.name }}</span>
                <span class="sr-course__pct">{{ c.progress }}%</span>
              </div>
              <div class="sr-course__bar">
                <div class="sr-course__fill" :style="{ width: c.progress + '%', background: c.color }" />
              </div>
              <div class="sr-course__bottom">
                <span><Timer :size="12" /> {{ c.lastStudied }}</span>
                <span class="sr-course__badge" :class="c.progress >= 60 ? 'active' : ''">
                  {{ c.progress >= 60 ? '学习中' : '入门' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习动态 -->
    <div class="sr-section">
      <div class="sr-section__head">
        <div class="sr-section__title"><Calendar :size="16" /> 学习动态</div>
        <div class="sr-section__filters">
          <div class="sr-tabs">
            <button v-for="r in dateRanges" :key="r" @click="dateRange = r"
              :class="{ active: dateRange === r }">{{ r }}</button>
          </div>
          <select v-model="activityTypeFilter" class="sr-select">
            <option v-for="t in activityTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
      </div>

      <div class="sr-timeline">
        <div v-for="(group, gIdx) in filteredTimeline" :key="gIdx" class="sr-tl-group">
          <div class="sr-tl-date">
            <span class="sr-tl-date__dot" />
            {{ group.date }}
            <span class="sr-tl-date__line" />
          </div>
          <div class="sr-tl-items">
            <div v-for="(item, iIdx) in group.items" :key="iIdx" class="sr-tl-item">
              <div class="sr-tl-item__icon" :class="getTypeBadgeClass(item.type)">
                <component :is="item.typeIcon" :size="16" />
              </div>
              <div class="sr-tl-item__body">
                <div class="sr-tl-item__top">
                  <span class="sr-tl-item__course">{{ item.course }}</span>
                  <span class="sr-tl-item__tag" :class="getTypeBadgeClass(item.type)">{{ item.type }}</span>
                </div>
                <div class="sr-tl-item__meta">
                  <span><Clock :size="12" /> {{ item.duration }}</span>
                  <span>{{ item.time }}</span>
                </div>
              </div>
              <CheckCircle :size="16" class="sr-tl-item__check" />
            </div>
          </div>
        </div>
        <div v-if="filteredTimeline.length === 0" class="sr-empty">
          <Filter :size="32" />
          <p>暂无匹配的学习记录</p>
        </div>
      </div>
    </div>

    <!-- 学习成就 -->
    <div class="sr-section">
      <div class="sr-section__head">
        <div class="sr-section__title"><TrendingUp :size="16" /> 学习成就</div>
        <span class="sr-section__sub">已完成 4/6 个</span>
      </div>
      <div class="sr-achievements">
        <div v-for="a in [
          { e: '🔥', t: '连续打卡', d: '坚持15天不间断', c: '#c4b5fd' },
          { e: '📚', t: '课程达人', d: '完成12门课程', c: '#7be3b8' },
          { e: '✍️', t: '练习高手', d: '累计86道练习', c: '#ffb46c' },
          { e: '⏱️', t: '百小时学者', d: '突破100小时', c: '#ff8da1' }
        ]" :key="a.t" class="sr-ach">
          <div class="sr-ach__emoji">{{ a.e }}</div>
          <div class="sr-ach__title">{{ a.t }}</div>
          <div class="sr-ach__desc">{{ a.d }}</div>
          <div class="sr-ach__badge" :style="{ color: a.c, background: a.c + '16' }">已达成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 页面 ===== */
.sr-page { display: flex; flex-direction: column; gap: 20px; }

/* ===== 统计卡 ===== */
.sr-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.sr-stat {
  display: flex; align-items: center; gap: 14px;
  padding: 18px 16px;
  background: rgba(18, 20, 50, 0.6);
  border: 1px solid rgba(117, 98, 255, 0.12);
  border-radius: 14px;
  transition: border-color 0.2s;
}
.sr-stat:hover { border-color: rgba(117, 98, 255, 0.3); }
.sr-stat__icon {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sr-stat__value { font-size: 22px; font-weight: 700; color: #f0f2ff; font-family: "JetBrains Mono", monospace; line-height: 1.1; }
.sr-stat__label { font-size: 12px; color: #8b9bc0; margin-top: 3px; }

/* ===== 两栏主区 ===== */
.sr-main { display: grid; grid-template-columns: 3fr 2fr; gap: 16px; }

/* ===== 柱状图 ===== */
.sr-chart {
  padding: 22px 24px;
  background: rgba(18, 20, 50, 0.6);
  border: 1px solid rgba(117, 98, 255, 0.12);
  border-radius: 14px;
  display: flex; flex-direction: column;
}
.sr-chart__head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.sr-chart__title { font-size: 15px; font-weight: 600; color: #f0f2ff; }
.sr-chart__sub { font-size: 11px; color: #6f7a9e; margin-top: 3px; font-family: "JetBrains Mono", monospace; }
.sr-chart__legend { display: flex; gap: 14px; }
.sr-chart__legend span { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #8b9bc0; }
.sr-chart__legend i { display: inline-block; width: 8px; height: 8px; border-radius: 2px; }

.sr-chart__body {
  flex: 1; display: flex; min-height: 280px;
  padding-bottom: 4px;
}

/* 网格线区 */
.sr-chart__grid {
  display: flex; flex-direction: column; justify-content: space-between;
  width: 48px; flex-shrink: 0; padding-right: 12px;
}
.sr-chart__gridline {
  display: flex; align-items: center; gap: 8px; height: 0; flex: 1;
  position: relative;
}
.sr-chart__gridline:first-child { flex: 0; }
.sr-chart__gridline:last-child { flex: 0; }
.sr-chart__gridlabel {
  font-size: 10px; color: #4a4680; font-family: "JetBrains Mono", monospace;
  width: 36px; text-align: right; flex-shrink: 0;
}
.sr-chart__gridline-bar {
  position: absolute; left: 44px; right: 0; top: 50%;
  height: 1px; background: rgba(117, 98, 255, 0.06);
}

/* 柱子容器 */
.sr-chart__bars {
  flex: 1; display: flex; align-items: flex-end; gap: 0;
  position: relative;
  border-bottom: 1px solid rgba(117, 98, 255, 0.12);
  padding: 0 4px;
}

.sr-col {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  position: relative; padding: 0 4px;
}

/* 数值标签 */
.sr-col__val {
  font-size: 11px; font-weight: 600; color: #c4b5fd;
  font-family: "JetBrains Mono", monospace;
  margin-bottom: 6px; opacity: 0;
  transform: translateY(4px);
  transition: all 0.2s ease;
}
.sr-col:hover .sr-col__val {
  opacity: 1; transform: translateY(0);
}

/* 柱子轨道 */
.sr-col__track {
  width: 100%; height: 240px;
  display: flex; align-items: flex-end; justify-content: center;
}

.sr-col__bar {
  width: 36px; display: flex; flex-direction: column;
  border-radius: 5px 5px 2px 2px; overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

/* hover 时柱子变宽 */
.sr-col:hover .sr-col__bar {
  width: 42px;
  filter: brightness(1.12);
}

/* 柱子分段 */
.sr-seg { transition: height 0.3s ease; flex-shrink: 0; }
.sr-seg--video { background: #6d5cff; }
.sr-seg--practice { background: #8b7bff; }
.sr-seg--reading { background: #c4b5fd; border-radius: 4px 4px 0 0; }

/* 日期 */
.sr-col__day {
  margin-top: 10px; font-size: 11px; color: #8b9bc0;
  transition: color 0.15s; white-space: nowrap;
}
.sr-col__day.is-active { color: #c4b5fd; font-weight: 600; }
.sr-col:hover .sr-col__day { color: #d8def0; }

/* ===== 课程进度 ===== */
.sr-courses {
  padding: 22px 20px;
  background: rgba(18, 20, 50, 0.6);
  border: 1px solid rgba(117, 98, 255, 0.12);
  border-radius: 14px;
}
.sr-courses__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.sr-courses__title { display: flex; align-items: center; gap: 7px; font-size: 15px; font-weight: 600; color: #f0f2ff; }
.sr-courses__title svg { color: #c4b5fd; }
.sr-courses__count { font-size: 11px; color: #6f7a9e; font-family: "JetBrains Mono", monospace; }

.sr-courses__list { display: flex; flex-direction: column; gap: 10px; }
.sr-course {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  background: rgba(13, 15, 40, 0.5);
  border: 1px solid rgba(117, 98, 255, 0.08);
  border-radius: 10px;
  transition: border-color 0.15s;
  cursor: pointer;
}
.sr-course:hover { border-color: rgba(145, 111, 255, 0.3); }
.sr-course__rank {
  width: 26px; height: 26px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; font-family: "JetBrains Mono", monospace;
  background: rgba(154, 164, 217, 0.1); color: #8b9bc0;
  flex-shrink: 0;
}
.sr-course__rank.top { background: linear-gradient(135deg, #ffb46c, #ff8da1); color: #fff; }
.sr-course__info { flex: 1; min-width: 0; }
.sr-course__top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.sr-course__name { font-size: 13px; font-weight: 600; color: #f0f2ff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sr-course__pct { font-size: 12px; font-weight: 700; color: #c4b5fd; font-family: "JetBrains Mono", monospace; margin-left: 8px; flex-shrink: 0; }
.sr-course__bar { height: 4px; background: rgba(58, 48, 122, 0.6); border-radius: 4px; overflow: hidden; }
.sr-course__fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
.sr-course__bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
.sr-course__bottom span { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #6f7a9e; }
.sr-course__badge {
  font-size: 10px; padding: 1px 7px; border-radius: 4px; font-weight: 600;
  background: rgba(255, 180, 108, 0.14); color: #ffb46c;
}
.sr-course__badge.active { background: rgba(109, 92, 255, 0.16); color: #c4b5fd; }

/* ===== 学习动态 ===== */
.sr-section {
  padding: 22px 24px;
  background: rgba(18, 20, 50, 0.6);
  border: 1px solid rgba(117, 98, 255, 0.12);
  border-radius: 14px;
}
.sr-section__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
.sr-section__title { display: flex; align-items: center; gap: 7px; font-size: 15px; font-weight: 600; color: #f0f2ff; }
.sr-section__title svg { color: #c4b5fd; }
.sr-section__sub { font-size: 12px; color: #8b9bc0; }
.sr-section__filters { display: flex; align-items: center; gap: 10px; }

.sr-tabs {
  display: flex; gap: 2px;
  background: rgba(13, 15, 40, 0.6); border-radius: 8px; padding: 3px;
}
.sr-tabs button {
  padding: 5px 14px; border: none; border-radius: 6px;
  font-size: 12px; font-weight: 600; color: #8b9bc0;
  background: transparent; cursor: pointer; transition: all 0.15s;
}
.sr-tabs button.active { background: rgba(109, 92, 255, 0.2); color: #c4b5fd; }
.sr-tabs button:hover:not(.active) { color: #d8def0; }

.sr-select {
  appearance: none;
  padding: 5px 28px 5px 10px; border-radius: 8px;
  background: rgba(13, 15, 40, 0.6);
  border: 1px solid rgba(117, 98, 255, 0.14);
  font-size: 12px; font-weight: 600; color: #d8def0;
  cursor: pointer; outline: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238b9bc0' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}
.sr-select option { background: #0d0f2c; color: #d8def0; }

/* 时间线 */
.sr-timeline { display: flex; flex-direction: column; gap: 24px; }
.sr-tl-group {}
.sr-tl-date {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600; color: #f0f2ff;
  margin-bottom: 10px;
}
.sr-tl-date__dot { width: 7px; height: 7px; border-radius: 50%; background: #6d5cff; flex-shrink: 0; }
.sr-tl-date__line { flex: 1; height: 1px; background: rgba(117, 98, 255, 0.1); }

.sr-tl-items { display: flex; flex-direction: column; gap: 8px; padding-left: 3px; }
.sr-tl-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  background: rgba(13, 15, 40, 0.45);
  border: 1px solid rgba(117, 98, 255, 0.06);
  border-radius: 10px;
  transition: border-color 0.15s;
}
.sr-tl-item:hover { border-color: rgba(145, 111, 255, 0.25); }
.sr-tl-item__icon {
  width: 34px; height: 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.type-video { background: rgba(109, 92, 255, 0.16); color: #c4b5fd; }
.type-practice { background: rgba(123, 227, 184, 0.16); color: #7be3b8; }
.type-reading { background: rgba(255, 180, 108, 0.16); color: #ffb46c; }

.sr-tl-item__body { flex: 1; min-width: 0; }
.sr-tl-item__top { display: flex; align-items: center; gap: 8px; }
.sr-tl-item__course { font-size: 14px; font-weight: 600; color: #f0f2ff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sr-tl-item__tag {
  font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600;
  flex-shrink: 0;
}
.sr-tl-item__meta { display: flex; gap: 12px; margin-top: 4px; font-size: 12px; color: #8b9bc0; }
.sr-tl-item__meta span { display: flex; align-items: center; gap: 4px; }
.sr-tl-item__check { color: #7be3b8; flex-shrink: 0; }

.sr-empty { text-align: center; padding: 48px 0; color: #6f7a9e; }
.sr-empty svg { margin: 0 auto 8px; display: block; }

/* ===== 成就 ===== */
.sr-achievements { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.sr-ach {
  text-align: center; padding: 20px 12px;
  background: rgba(13, 15, 40, 0.45);
  border: 1px solid rgba(117, 98, 255, 0.08);
  border-radius: 12px;
  transition: border-color 0.15s, transform 0.15s;
  cursor: pointer;
}
.sr-ach:hover { border-color: rgba(145, 111, 255, 0.3); transform: translateY(-2px); }
.sr-ach__emoji { font-size: 28px; margin-bottom: 8px; }
.sr-ach__title { font-size: 13px; font-weight: 600; color: #f0f2ff; }
.sr-ach__desc { font-size: 11px; color: #8b9bc0; margin-top: 3px; }
.sr-ach__badge {
  display: inline-block; margin-top: 10px;
  font-size: 10px; padding: 2px 10px; border-radius: 999px; font-weight: 600;
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .sr-stats { grid-template-columns: repeat(2, 1fr); }
  .sr-main { grid-template-columns: 1fr; }
  .sr-achievements { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .sr-stats { grid-template-columns: 1fr; }
  .sr-achievements { grid-template-columns: 1fr; }
}
</style>
