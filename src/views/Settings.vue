<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('dark')
const language = ref('zh')
const notifications = ref(true)

const studyReminder = ref(true)
const reminderTime = ref('20:00')
const preferredResource = ref('video')

const accountEmail = ref('user@example.com')
const accountName = ref('学习者')
</script>

<template>
  <div class="settings">
    <div class="page-header reveal">
      <h1 class="page-title">设置</h1>
      <p class="page-desc">个性化配置你的学习体验</p>
    </div>

    <div class="settings-sections">
      <!-- Personal Preferences -->
      <section class="settings-section reveal reveal-delay-1">
        <h2 class="section-title">
          <span class="section-icon section-icon-palette">◈</span>
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
                >
                  浅色
                </button>
                <button
                  :class="['toggle-btn', { active: theme === 'dark' }]"
                  @click="theme = 'dark'"
                >
                  深色
                </button>
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
        </div>
      </section>

      <!-- Learning Preferences -->
      <section class="settings-section reveal reveal-delay-2">
        <h2 class="section-title">
          <span class="section-icon section-icon-learn">≡</span>
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
                >
                  视频
                </button>
                <button
                  :class="['toggle-btn', { active: preferredResource === 'text' }]"
                  @click="preferredResource = 'text'"
                >
                  图文
                </button>
                <button
                  :class="['toggle-btn', { active: preferredResource === 'exercise' }]"
                  @click="preferredResource = 'exercise'"
                >
                  习题
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Account -->
      <section class="settings-section reveal reveal-delay-3">
        <h2 class="section-title">
          <span class="section-icon section-icon-account">◎</span>
          账号管理
        </h2>
        <div class="settings-card">
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

      <!-- Danger Zone -->
      <section class="settings-section reveal reveal-delay-4">
        <h2 class="section-title">
          <span class="section-icon section-icon-data">⚠</span>
          数据管理
        </h2>
        <div class="settings-card danger">
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

      <!-- Save -->
      <div class="save-bar">
        <button class="save-btn">保存设置</button>
      </div>
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

.section-title {
  font-family: var(--font-display);
  font-size: 22px;
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

.section-icon-palette { background: rgba(0, 212, 255, 0.1); color: #00d4ff; }
.section-icon-learn { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
.section-icon-account { background: rgba(6, 214, 160, 0.1); color: #06d6a0; }
.section-icon-data { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

.settings-card {
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.settings-card.danger {
  border-color: rgba(244, 63, 94, 0.2);
}

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

/* === Save === */
.save-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
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
