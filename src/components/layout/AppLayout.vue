<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import {
  Home,
  MessageCircle,
  User,
  BookOpen,
  Map,
  GraduationCap,
  BarChart3,
  Settings,
  Sparkles,
  Code,
  Layers,
} from 'lucide-vue-next'

const route = useRoute()
useScrollReveal(0.12)

const isHomePage = computed(() => route.path === '/')

const navItems = [
  { path: '/', label: '欢迎', icon: Home },
  { path: '/profile', label: '画像', icon: User },
  { path: '/chat', label: '对话', icon: MessageCircle },
  { path: '/resources', label: '资源', icon: BookOpen },
  { path: '/learning-path', label: '路径', icon: Map },
  { path: '/tutoring', label: '辅导', icon: GraduationCap },
  { path: '/codelab', label: '代码', icon: Code },
  { path: '/mindmap', label: '图谱', icon: Layers },
  { path: '/evaluation', label: '评估', icon: BarChart3 },
  { path: '/settings', label: '设置', icon: Settings },
]
</script>

<template>
  <div class="layout">
    <!-- Top Navigation Bar -->
    <header class="topbar" role="banner">
      <div class="topbar-inner">
        <router-link to="/" class="topbar-brand" aria-label="EduMind 首页">
          <span class="brand-icon">
            <Sparkles :size="18" stroke-width="1.5" />
          </span>
          <span class="brand-text">EduMind</span>
        </router-link>

        <nav class="topbar-nav" aria-label="主导航">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="['nav-item', { active: route.path === item.path }]"
            :aria-current="route.path === item.path ? 'page' : undefined"
          >
            <component :is="item.icon" :size="16" stroke-width="1.5" class="nav-icon-svg" aria-hidden="true" />
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-indicator" :class="{ visible: route.path === item.path }" />
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content" id="main-content" :class="{ 'has-background': !isHomePage }">
      <div v-if="!isHomePage" class="background-image" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* === Top Bar === */
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(7, 7, 13, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  z-index: var(--z-dropdown);
}

.topbar-inner {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 32px;
}

@media (min-width: 1024px) {
  .topbar-inner {
    padding: 0 40px;
    gap: 40px;
  }
}

/* === Brand === */
.topbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.brand-text {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
}

/* === Nav === */
.topbar-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}
.topbar-nav::-webkit-scrollbar {
  display: none;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  min-height: 44px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .nav-item {
    padding: 10px 20px;
    font-size: 14px;
  }
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: rgba(0, 212, 255, 0.06);
}

.nav-item.active {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.1);
}

.nav-icon-svg {
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-item:hover .nav-icon-svg {
  transform: scale(1.1);
}

.nav-label {
  letter-spacing: 0.3px;
}

.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: var(--color-accent-cyan);
  border-radius: 1px;
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
  transition: transform var(--duration-normal) var(--ease-out);
}

.nav-indicator.visible {
  transform: translateX(-50%) scaleX(1);
}

/* === Main Content === */
.main-content {
  flex: 1;
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
  position: relative;
  overflow: hidden;
}

.main-content.has-background {
  background: transparent;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/all-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.35;
  z-index: 0;
}
</style>
