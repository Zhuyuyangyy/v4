<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Layers, BookOpen, ArrowRight } from 'lucide-vue-next'
import { allCourses } from '@/components/course/CourseData'
import type { MindMapNode } from '@/types/course'
import MindMap from '@/components/mindmap/MindMap.vue'

const router = useRouter()
const selectedCourseId = ref('ai-ml')

const selectedCourse = computed(() =>
  allCourses.find(c => c.id === selectedCourseId.value)
)

const mindMapNodes = computed(() => {
  const course = selectedCourse.value
  if (!course) return []
  // Collect all mind maps from all topics
  const allMaps: { topicName: string; nodes: MindMapNode[] }[] = []
  for (const topic of course.topics) {
    if (topic.mindMap && topic.mindMap.length > 0) {
      allMaps.push({ topicName: topic.name, nodes: topic.mindMap })
    }
  }
  return allMaps
})

const courses = computed(() => allCourses)

const currentColor = computed(() => selectedCourse.value?.color ?? '#00d4ff')

function handleNodeClick(node: MindMapNode) {
  // Navigate to tutoring with the node name as query
  router.push({ path: '/tutoring', query: { q: `解释一下 ${node.label}` } })
}
</script>

<template>
  <div class="mm-view">
    <!-- Hero -->
    <div class="mm-hero">
      <div class="mm-hero-left">
        <button class="back-btn" @click="router.push('/tutoring')">
          <ArrowLeft :size="16" stroke-width="1.5" />
        </button>
        <div>
          <div class="hero-badge">知识图谱</div>
          <h1 class="hero-title">思维<span class="gradient-text">导图</span></h1>
          <p class="hero-desc">可视化知识体系，理清 AI 知识脉络</p>
        </div>
      </div>
    </div>

    <!-- Course Tabs -->
    <div class="mm-tabs">
      <button
        v-for="c in courses"
        :key="c.id"
        :class="['mm-tab', { active: selectedCourseId === c.id }]"
        :style="{ '--t-clr': c.color }"
        @click="selectedCourseId = c.id"
      >
        <span class="mm-tab-name">{{ c.name }}</span>
        <span class="mm-tab-diff">{{ c.difficulty === 'beginner' ? '入门' : c.difficulty === 'intermediate' ? '进阶' : '高级' }}</span>
      </button>
    </div>

    <!-- Mind Maps -->
    <div v-if="mindMapNodes.length > 0" class="mm-content">
      <div v-for="(item, idx) in mindMapNodes" :key="idx" class="mm-section">
        <MindMap
          :nodes="item.nodes"
          :title="item.topicName"
          :color="currentColor"
          @node-click="handleNodeClick"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="mm-empty">
      <Layers :size="48" stroke-width="1" class="mm-empty-icon" />
      <h3 class="mm-empty-title">暂无思维导图</h3>
      <p class="mm-empty-desc">当前课程还没有生成思维导图，请选择其他课程</p>
    </div>

    <!-- Related Resources -->
    <div class="mm-related">
      <div class="mr-header">
        <BookOpen :size="14" stroke-width="1.5" />
        <span>关联资源</span>
      </div>
      <div class="mr-grid">
        <div class="mr-card" @click="router.push('/resources')">
          <span class="mr-card-title">学习资源中心</span>
          <span class="mr-card-desc">查看课程配套文档与视频</span>
          <ArrowRight :size="14" stroke-width="1.5" class="mr-card-arrow" />
        </div>
        <div class="mr-card" @click="router.push('/tutoring')">
          <span class="mr-card-title">智能辅导</span>
          <span class="mr-card-desc">针对知识点提问与解答</span>
          <ArrowRight :size="14" stroke-width="1.5" class="mr-card-arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mm-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 40px;
  position: relative;
  z-index: 1;
}

.mm-hero {
  padding: 48px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.mm-hero-left {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
  margin-top: 4px;
  flex-shrink: 0;
}
.back-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(6, 214, 160, 0.08);
  color: var(--color-accent-emerald);
  border: 1px solid rgba(6, 214, 160, 0.1);
  margin-bottom: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc { font-size: 14px; color: var(--color-text-secondary); }

/* Tabs */
.mm-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.mm-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-out);
}
.mm-tab:hover {
  border-color: var(--t-clr);
  color: var(--color-text-primary);
}
.mm-tab.active {
  background: color-mix(in srgb, var(--t-clr) 8%, transparent);
  border-color: var(--t-clr);
  color: var(--t-clr);
}
.mm-tab-name { font-weight: 500; }
.mm-tab-diff { font-size: 10px; padding: 1px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); }

/* Content */
.mm-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mm-section { }

/* Empty State */
.mm-empty {
  text-align: center;
  padding: 80px 20px;
}
.mm-empty-icon { color: var(--color-text-tertiary); opacity: 0.3; margin-bottom: 16px; }
.mm-empty-title { font-family: var(--font-display); font-size: 22px; color: var(--color-text-secondary); margin-bottom: 8px; }
.mm-empty-desc { font-size: 13px; color: var(--color-text-tertiary); }

/* Related */
.mm-related {
  margin-top: 32px;
}
.mr-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin-bottom: 12px;
}
.mr-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.mr-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  border-radius: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  position: relative;
}
.mr-card:hover {
  border-color: var(--color-accent-cyan);
  transform: translateY(-1px);
}
.mr-card-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); }
.mr-card-desc { font-size: 12px; color: var(--color-text-tertiary); }
.mr-card-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-accent-cyan);
  opacity: 0;
  transition: opacity 0.2s var(--ease-out);
}
.mr-card:hover .mr-card-arrow { opacity: 1; }

@media (max-width: 900px) {
  .mm-view { padding: 0 20px 32px; }
  .mm-hero { padding: 32px 0 16px; }
  .mr-grid { grid-template-columns: 1fr; }
}
</style>
