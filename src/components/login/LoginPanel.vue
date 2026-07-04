<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
import type { AuthRole } from '@/lib/auth'

const emit = defineEmits<{
  submit: [{ account: string, password: string, remember: boolean, role: AuthRole }]
}>()

const role = ref<AuthRole>('student')
const account = ref('student')
const password = ref('123456')
const remember = ref(true)
const loading = ref(false)

function switchRole(nextRole: AuthRole) {
  if (loading.value) return

  role.value = nextRole
  account.value = nextRole === 'admin' ? 'admin' : 'student'
  password.value = nextRole === 'admin' ? 'admin123' : '123456'
}

function handleSubmit() {
  if (loading.value) return

  loading.value = true
  emit('submit', {
    account: account.value.trim(),
    password: password.value,
    remember: remember.value,
    role: role.value,
  })
}

defineExpose({
  stopLoading: () => {
    loading.value = false
  },
})
</script>

<template>
  <aside class="login-panel" aria-label="EduMind 登录">
    <div class="panel-glow" aria-hidden="true" />

    <header class="panel-header">
      <p>A3-TRACE Learning Intelligence</p>
      <h1>EduMind</h1>
      <h2>{{ role === 'admin' ? '管理员数据中心入口' : '多智能体个性化学习平台' }}</h2>
      <span>
        {{ role === 'admin'
          ? '进入智能体调用量、学生学习状态、Token 消耗、错题整理、用户与角色权限管理。'
          : '由学习画像、资源生成、路径规划、智能辅导、效果评估与反馈重规划组成的 AI 学习闭环系统。' }}
      </span>
    </header>

    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="role-switch" role="tablist" aria-label="选择登录身份">
        <button
          type="button"
          :class="{ active: role === 'student' }"
          role="tab"
          :aria-selected="role === 'student'"
          @click="switchRole('student')"
        >
          <UserRound :size="15" />
          用户
        </button>
        <button
          type="button"
          :class="{ active: role === 'admin' }"
          role="tab"
          :aria-selected="role === 'admin'"
          @click="switchRole('admin')"
        >
          <ShieldCheck :size="15" />
          管理员
        </button>
      </div>

      <label class="input-field">
        <span><UserRound :size="15" />账号</span>
        <input v-model="account" autocomplete="username" placeholder="请输入账号" />
      </label>

      <label class="input-field">
        <span><LockKeyhole :size="15" />密码</span>
        <input
          v-model="password"
          autocomplete="current-password"
          placeholder="请输入密码"
          type="password"
        />
      </label>

      <div class="form-row">
        <label class="remember">
          <input v-model="remember" type="checkbox" />
          <span>记住我</span>
        </label>
        <button class="ghost-link" type="button">忘记密码</button>
      </div>

      <button class="login-button" type="submit" :disabled="loading">
        <span>
          {{ loading
            ? (role === 'admin' ? '正在打开管理数据大屏' : '正在连接智能体')
            : (role === 'admin' ? '进入管理员数据大屏' : '进入学习智能体系统') }}
        </span>
        <ArrowRight :size="17" />
      </button>
    </form>

    <div class="status-row" aria-label="系统状态">
      <StatusBadge label="Agent Orchestrator Ready" tone="cyan" />
      <StatusBadge label="Trace Evidence Enabled" tone="emerald" />
      <StatusBadge label="Personalized Learning Loop Online" tone="violet" />
    </div>

    <footer class="agent-footer">
      Profile · Resource · Path · Tutor · Evaluation · Reflection
    </footer>
  </aside>
</template>

<style scoped>
.login-panel {
  position: relative;
  width: min(440px, 100%);
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.18);
  border-radius: 24px;
  padding: clamp(24px, 3vw, 34px);
  color: #e8f7ff;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025) 38%, rgba(12, 18, 34, 0.42)),
    rgba(5, 14, 29, 0.58);
  box-shadow:
    0 34px 100px rgba(0, 0, 0, 0.46),
    inset 0 1px 0 rgba(255, 255, 255, 0.11),
    inset 0 0 56px rgba(34, 211, 238, 0.045);
  backdrop-filter: blur(28px) saturate(1.25);
  transform: translateY(16px);
  animation: panel-enter 900ms cubic-bezier(0.19, 1, 0.22, 1) 260ms both;
  transition: border-color 240ms ease, box-shadow 240ms ease, transform 240ms ease;
}

.login-panel:hover {
  border-color: rgba(103, 232, 249, 0.34);
  box-shadow:
    0 38px 120px rgba(0, 0, 0, 0.52),
    0 0 50px rgba(34, 211, 238, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transform: translateY(10px);
}

.panel-glow {
  position: absolute;
  inset: -1px;
  pointer-events: none;
  background:
    linear-gradient(120deg, transparent 0 28%, rgba(103, 232, 249, 0.16), transparent 48% 100%);
  transform: translateX(-70%);
  animation: panel-scan 5.4s cubic-bezier(0.19, 1, 0.22, 1) infinite;
}

.panel-header {
  position: relative;
}

.panel-header p {
  margin: 0 0 14px;
  color: #67e8f9;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.panel-header h1 {
  margin: 0;
  font-size: clamp(42px, 5vw, 60px);
  line-height: 0.94;
  letter-spacing: 0.02em;
}

.panel-header h2 {
  margin: 10px 0 0;
  color: rgba(226, 245, 255, 0.88);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.panel-header > span {
  display: block;
  margin-top: 18px;
  color: rgba(201, 222, 237, 0.7);
  font-size: 13px;
  line-height: 1.9;
}

.login-form {
  position: relative;
  display: grid;
  gap: 16px;
  margin-top: 30px;
}

.role-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 16px;
  padding: 5px;
  background: rgba(2, 8, 23, 0.32);
}

.role-switch button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: rgba(226, 245, 255, 0.62);
  background: transparent;
  cursor: pointer;
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    color 260ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 260ms cubic-bezier(0.16, 1, 0.3, 1),
    background 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.role-switch button:hover {
  color: #f5fbff;
  transform: translateY(-1px);
}

.role-switch button.active {
  color: #f8fbff;
  border-color: rgba(103, 232, 249, 0.36);
  background:
    linear-gradient(135deg, rgba(34, 211, 238, 0.18), rgba(139, 92, 246, 0.16)),
    rgba(255, 255, 255, 0.045);
  box-shadow: 0 10px 28px rgba(34, 211, 238, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.input-field {
  display: grid;
  gap: 9px;
}

.input-field span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(226, 245, 255, 0.76);
  font-size: 13px;
}

.input-field input {
  height: 50px;
  border: 1px solid rgba(125, 211, 252, 0.16);
  border-radius: 14px;
  padding: 0 15px;
  color: #f5fbff;
  background: rgba(2, 8, 23, 0.48);
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.input-field input::placeholder {
  color: rgba(148, 163, 184, 0.66);
}

.input-field input:focus {
  border-color: rgba(103, 232, 249, 0.66);
  background: rgba(2, 8, 23, 0.62);
  box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.1), 0 0 24px rgba(34, 211, 238, 0.12);
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.remember {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(226, 245, 255, 0.68);
  font-size: 13px;
}

.remember input {
  width: 15px;
  height: 15px;
  accent-color: #22d3ee;
}

.ghost-link {
  border: 0;
  color: rgba(103, 232, 249, 0.82);
  background: transparent;
  font-size: 13px;
  cursor: pointer;
}

.login-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  overflow: hidden;
  border: 0;
  border-radius: 15px;
  color: #f8fbff;
  background: linear-gradient(100deg, #2563eb, #06b6d4 48%, #8b5cf6);
  box-shadow: 0 18px 44px rgba(37, 99, 235, 0.28), 0 0 26px rgba(34, 211, 238, 0.18);
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.login-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.26), transparent);
  transform: translateX(-120%);
  transition: transform 550ms cubic-bezier(0.19, 1, 0.22, 1);
}

.login-button:hover {
  transform: translateY(-2px);
  filter: saturate(1.15);
  box-shadow: 0 22px 60px rgba(37, 99, 235, 0.34), 0 0 34px rgba(34, 211, 238, 0.26);
}

.login-button:hover::after {
  transform: translateX(120%);
}

.login-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.login-button span,
.login-button svg {
  position: relative;
  z-index: 1;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 24px;
}

.agent-footer {
  margin-top: 28px;
  border-top: 1px solid rgba(125, 211, 252, 0.12);
  padding-top: 17px;
  color: rgba(201, 222, 237, 0.58);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@keyframes panel-enter {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.98);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateY(16px);
    filter: blur(0);
  }
}

@keyframes panel-scan {
  0%, 55% {
    transform: translateX(-82%);
    opacity: 0;
  }

  68% {
    opacity: 1;
  }

  100% {
    transform: translateX(82%);
    opacity: 0;
  }
}
</style>
