<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  Palette,
  BookOpen,
  Shield,
  GitCompare,
  Sparkles,
  Bell,
  Clock,
  Sun,
  Moon,
} from 'lucide-vue-next'

const theme = ref('dark')
const language = ref('zh')
const notifications = ref(true)
const studyReminder = ref(true)
const reminderTime = ref('20:00')
const preferredResource = ref('video')
const emailDigest = ref(true)
const soundEnabled = ref(true)
const shareData = ref(false)

const accountEmail = ref('user@example.com')
const accountName = ref('学习者')
const saved = ref(false)

function saveSettings() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}
</script>

<template>
  <div class="settings">
    <div class="page-header reveal">
      <h1 class="page-title">设置</h1>
      <p class="page-desc">个性化配置你的学习体验</p>
    </div>

    <!-- Profile Section -->
    <section class="settings-section reveal reveal-delay-1">
      <h2 class="section-title">
        <span class="section-icon section-icon-profile">
          <User :size="16" stroke-width="1.5" />
        </span>
        个人资料
      </h2>
      <div class="settings-card">
        <div class="profile-row">
          <div class="profile-avatar">
            <span class="avatar-letter">学</span>
            <button class="avatar-edit">✎</button>
          </div>
          <div class="profile-info">
            <span class="profile-name">{{ accountName }}</span>
            <span class="profile-email">{{ accountEmail }}</span>
          </div>
          <button class="action-btn">更换头像</button>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">用户名</span>
            <span class="setting-desc">你的显示名称</span>
          </div>
          <div class="setting-control">
            <input type="text" v-model="accountName" class="setting-input" />
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">邮箱</span>
            <span class="setting-desc">用于登录和通知</span>
          </div>
          <div class="setting-control">
            <input type="email" v-model="accountEmail" class="setting-input" />
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">密码</span>
            <span class="setting-desc">定期更换密码保护账号安全</span>
          </div>
          <div class="setting-control">
            <button class="action-btn">修改密码</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Preferences -->
    <section class="settings-section reveal reveal-delay-2">
      <h2 class="section-title">
        <span class="section-icon section-icon-palette">
          <Palette :size="16" stroke-width="1.5" />
        </span>
        个人偏好
      </h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">主题</span>
            <span class="setting-desc">选择界面主题外观</span>
          </div>
          <div class="setting-control">
            <div class="toggle-group">
              <button
                :class="['toggle-btn', { active: theme === 'light' }]"
                @click="theme = 'light'"
              ><Sun :size="14" stroke-width="1.5" /> 浅色</button>
              <button
                :class="['toggle-btn', { active: theme === 'dark' }]"
                @click="theme = 'dark'"
              ><Moon :size="14" stroke-width="1.5" /> 深色</button>
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">语言</span>
            <span class="setting-desc">界面显示语言</span>
          </div>
          <div class="setting-control">
            <select v-model="language" class="setting-select">
              <option value="zh">简体中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">通知</span>
            <span class="setting-desc">接收学习提醒和动态</span>
          </div>
          <div class="setting-control">
            <button
              :class="['switch', { on: notifications }]"
              @click="notifications = !notifications"
            >
              <span class="switch-knob" />
            </button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">声音</span>
            <span class="setting-desc">操作音效和提示音</span>
          </div>
          <div class="setting-control">
            <button
              :class="['switch', { on: soundEnabled }]"
              @click="soundEnabled = !soundEnabled"
            >
              <span class="switch-knob" />
            </button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">邮件摘要</span>
            <span class="setting-desc">每周学习报告邮件</span>
          </div>
          <div class="setting-control">
            <button
              :class="['switch', { on: emailDigest }]"
              @click="emailDigest = !emailDigest"
            >
              <span class="switch-knob" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Preferences -->
    <section class="settings-section reveal reveal-delay-3">
      <h2 class="section-title">
        <span class="section-icon section-icon-learn">
          <BookOpen :size="16" stroke-width="1.5" />
        </span>
        学习偏好
      </h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">学习时段提醒</span>
            <span class="setting-desc">在设定的学习时间发送提醒</span>
          </div>
          <div class="setting-control">
            <button
              :class="['switch', { on: studyReminder }]"
              @click="studyReminder = !studyReminder"
            >
              <span class="switch-knob" />
            </button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">提醒时间</span>
            <span class="setting-desc">每天的学习提醒时间</span>
          </div>
          <div class="setting-control">
            <input type="time" v-model="reminderTime" class="setting-time" />
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">偏好资源类型</span>
            <span class="setting-desc">优先推荐的学习资源类型</span>
          </div>
          <div class="setting-control">
            <div class="toggle-group">
              <button
                :class="['toggle-btn', { active: preferredResource === 'video' }]"
                @click="preferredResource = 'video'"
              >视频</button>
              <button
                :class="['toggle-btn', { active: preferredResource === 'text' }]"
                @click="preferredResource = 'text'"
              >图文</button>
              <button
                :class="['toggle-btn', { active: preferredResource === 'exercise' }]"
                @click="preferredResource = 'exercise'"
              >习题</button>
            </div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">学习目标</span>
            <span class="setting-desc">设定你的长期学习目标</span>
          </div>
          <div class="setting-control">
            <select class="setting-select">
              <option>深度学习工程师</option>
              <option>数据科学家</option>
              <option>AI 研究员</option>
              <option>全栈开发者</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy -->
    <section class="settings-section reveal reveal-delay-4">
      <h2 class="section-title">
        <span class="section-icon section-icon-privacy">
          <Shield :size="16" stroke-width="1.5" />
        </span>
        隐私与数据
      </h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">学习数据共享</span>
            <span class="setting-desc">允许匿名数据用于改进推荐算法</span>
          </div>
          <div class="setting-control">
            <button
              :class="['switch', { on: shareData }]"
              @click="shareData = !shareData"
            >
              <span class="switch-knob" />
            </button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">导出数据</span>
            <span class="setting-desc">导出你的学习数据和画像</span>
          </div>
          <div class="setting-control">
            <button class="action-btn ghost">导出</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label danger-text">清除数据</span>
            <span class="setting-desc">清除所有学习记录和画像数据</span>
          </div>
          <div class="setting-control">
            <button class="action-btn danger-btn">清除</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Integrations -->
    <section class="settings-section reveal reveal-delay-5">
      <h2 class="section-title">
        <span class="section-icon section-icon-api">
          <GitCompare :size="16" stroke-width="1.5" />
        </span>
        集成与 API
      </h2>
      <div class="settings-card">
        <div class="integration-row">
          <div class="integration-info">
            <span class="integration-name">Notion</span>
            <span class="integration-desc">同步学习笔记到 Notion</span>
          </div>
          <button class="action-btn">连接</button>
        </div>
        <div class="integration-row">
          <div class="integration-info">
            <span class="integration-name">Anki</span>
            <span class="integration-desc">导入学习卡片到 Anki</span>
          </div>
          <button class="action-btn">连接</button>
        </div>
        <div class="integration-row">
          <div class="integration-info">
            <span class="integration-name">API 访问</span>
            <span class="integration-desc">个人 API 密钥管理</span>
          </div>
          <button class="action-btn">管理</button>
        </div>
        <div class="integration-row">
          <div class="integration-info">
            <span class="integration-name">Webhook</span>
            <span class="integration-desc">学习事件回调通知</span>
          </div>
          <button class="action-btn">配置</button>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="settings-section reveal reveal-delay-6">
      <h2 class="section-title">
        <span class="section-icon section-icon-about">
          <Sparkles :size="16" stroke-width="1.5" />
        </span>
        关于
      </h2>
      <div class="settings-card about-card">
        <div class="about-row">
          <span class="about-label">版本</span>
          <span class="about-value">v1.0.0</span>
        </div>
        <div class="about-row">
          <span class="about-label">框架</span>
          <span class="about-value">Vue 3 + TypeScript + Vite</span>
        </div>
        <div class="about-row">
          <span class="about-label">引擎</span>
          <span class="about-value">EduMind AI Engine v2.4</span>
        </div>
        <div class="about-row">
          <span class="about-label">更新</span>
          <span class="about-value">2026-05-11</span>
        </div>
      </div>
    </section>

    <!-- Save -->
    <div class="save-bar">
      <transition name="fade">
        <span v-if="saved" class="save-toast">✓ 设置已保存</span>
      </transition>
      <button class="save-btn" @click="saveSettings">保存设置</button>
    </div>
  </div>
</template>

<style scoped>
.settings {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 42px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #fff;
}

.page-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.settings-section {
  margin-bottom: 36px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  font-size: 16px;
  flex-shrink: 0;
}

.section-icon-profile { background: rgba(0, 212, 255, 0.1); color: #00d4ff; }
.section-icon-palette { background: rgba(0, 212, 255, 0.1); color: #00d4ff; }
.section-icon-learn { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
.section-icon-privacy { background: rgba(6, 214, 160, 0.1); color: #06d6a0; }
.section-icon-api { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.section-icon-about { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

.settings-card {
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.settings-card.danger {
  border-color: rgba(244, 63, 94, 0.2);
}

/* === Profile Row === */
.profile-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--color-border);
}

.profile-avatar {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-letter {
  font-family: var(--font-display);
  font-size: 28px;
  color: #fff;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  color: #fff;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform var(--duration-fast) var(--ease-out);
}
.avatar-edit:hover {
  transform: scale(1.1);
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.profile-email {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

/* === Setting Rows === */
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}
.setting-row:last-child {
  border-bottom: none;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.setting-label.danger-text {
  color: var(--color-accent-rose);
}

.setting-desc {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* === Toggle Group === */
.toggle-group {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
}

.toggle-btn {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}
.toggle-btn:hover {
  color: var(--color-text-primary);
}
.toggle-btn.active {
  color: #fff;
  background: var(--color-accent-cyan);
  box-shadow: 0 2px 10px rgba(0, 212, 255, 0.3);
}

/* === Switch === */
.switch {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  transition: background var(--duration-fast) var(--ease-out);
  padding: 0;
  flex-shrink: 0;
}
.switch.on {
  background: var(--color-accent-cyan);
}

.switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform var(--duration-fast) var(--ease-out);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.switch.on .switch-knob {
  transform: translateX(20px);
}

/* === Select === */
.setting-select {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-primary);
  appearance: none;
  cursor: pointer;
  min-width: 120px;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.setting-select:focus {
  border-color: var(--color-accent-cyan);
}

/* === Input === */
.setting-input {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-primary);
  min-width: 200px;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.setting-input:focus {
  border-color: var(--color-accent-cyan);
}

.setting-time {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-primary);
  color-scheme: dark;
}

/* === Action Buttons === */
.action-btn {
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-out);
}
.action-btn:hover {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}
.action-btn.ghost {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}
.action-btn.danger-btn {
  border-color: rgba(244, 63, 94, 0.3);
  color: var(--color-accent-rose);
}
.action-btn.danger-btn:hover {
  background: rgba(244, 63, 94, 0.1);
}

/* === Integration === */
.integration-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}
.integration-row:last-child {
  border-bottom: none;
}

.integration-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.integration-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.integration-desc {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

/* === About === */
.about-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}
.about-row:last-child {
  border-bottom: none;
}

.about-label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.about-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

/* === Save === */
.save-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
  position: sticky;
  bottom: 0;
  background: linear-gradient(180deg, transparent, var(--color-bg-primary) 40%);
  padding-bottom: 24px;
}

.save-toast {
  font-size: 13px;
  color: var(--color-accent-emerald);
  font-weight: 500;
}

.save-btn {
  padding: 12px 36px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: all var(--duration-fast) var(--ease-out);
}
.save-btn:hover {
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-1px);
}
</style>
