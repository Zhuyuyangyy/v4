<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '欢迎', icon: '→' },
  { path: '/chat', label: '对话', icon: '↗' },
  { path: '/profile', label: '画像', icon: '◎' },
  { path: '/resources', label: '资源', icon: '▣' },
  { path: '/learning-path', label: '路径', icon: '⇲' },
  { path: '/tutoring', label: '辅导', icon: '⊕' },
  { path: '/evaluation', label: '评估', icon: '◈' },
  { path: '/settings', label: '设置', icon: '⚙' },
]
</script>

<template>
  <div class="layout">
    <!-- Top Navigation Bar -->
    <header class="topbar">
      <div class="topbar-inner">
        <router-link to="/" class="topbar-brand">
          <span class="brand-icon">✦</span>
          <span class="brand-text">EduMind</span>
        </router-link>

        <nav class="topbar-nav">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="['nav-item', { active: route.path === item.path }]"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-indicator" :class="{ visible: route.path === item.path }" />
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
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
  padding: 0 40px;
  gap: 40px;
}

/* === Brand === */
.topbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  font-size: 16px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-text {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
}

.brand-sub {
  font-size: 11px;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
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
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: rgba(0, 212, 255, 0.06);
}

.nav-item.active {
  color: var(--color-accent-cyan);
  background: rgba(0, 212, 255, 0.1);
}

.nav-label {
  font-size: 14px;
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

/* === Topbar Actions === */
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-login {
  padding: 10px 24px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn-login:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}

.btn-try {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
}

.btn-try:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 212, 255, 0.4);
}

/* === Main Content === */
.main-content {
  flex: 1;
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
}
</style>