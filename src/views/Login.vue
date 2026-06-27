<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BarChart3,
  BrainCircuit,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-vue-next'
import { setAuthSession, type AuthRole } from '@/lib/auth'

const router = useRouter()
const activeRole = ref<AuthRole>('student')
const account = ref('student')
const password = ref('123456')
const errorText = ref('')

const roleMeta = computed(() => activeRole.value === 'admin'
  ? {
      title: '管理员数据中心',
      desc: '进入智能体调用量、学生学习情况、Token 消耗、错题整理与用户权限管理。',
      account: 'admin',
      password: 'admin123',
      submit: '进入管理大屏',
    }
  : {
      title: '学生学习入口',
      desc: '进入画像生成、学习路径、学习资源、智能评估与错题反馈等学习功能。',
      account: 'student',
      password: '123456',
      submit: '进入学习系统',
    })

function switchRole(role: AuthRole) {
  activeRole.value = role
  account.value = role === 'admin' ? 'admin' : 'student'
  password.value = role === 'admin' ? 'admin123' : '123456'
  errorText.value = ''
}

function handleLogin() {
  if (!account.value.trim() || !password.value.trim()) {
    errorText.value = '请输入账号和密码'
    return
  }

  setAuthSession({
    role: activeRole.value,
    name: activeRole.value === 'admin' ? '管理员' : '学生用户',
    account: account.value.trim(),
    loginAt: new Date().toISOString(),
  })

  router.replace(activeRole.value === 'admin' ? '/admin' : '/home')
}
</script>

<template>
  <main class="login-page">
    <div class="login-bg-grid" aria-hidden="true" />
    <div class="login-stream" aria-hidden="true">
      <span v-for="item in ['AI', 'Token', '错题', '路径', '评估', '资源', '画像', '反馈']" :key="item">
        {{ item }}
      </span>
    </div>

    <section class="login-stage" aria-label="EduMind 登录">
      <div class="login-copy">
        <div class="brand-mark">
          <span><Sparkles :size="18" /></span>
          EduMind
        </div>

        <div class="flow-visual" aria-hidden="true">
          <div class="glass-node source-node">
            <strong>学习行为数据</strong>
            <small>课程  错题  画像  资源</small>
          </div>
          <div class="flow-lines">
            <i />
            <i />
            <i />
          </div>
          <div class="glass-node insight-node">
            <strong>1,000,000</strong>
            <small>Tokens Processed</small>
            <div class="mini-chart">
              <em v-for="n in 20" :key="n" :style="{ height: `${24 + ((n * 17) % 60)}%` }" />
            </div>
          </div>
        </div>

        <h1>一个入口进入学习与管理系统</h1>
        <p>
          用户登录后进入学习功能，管理员登录后进入透明数据大屏、用户管理、角色管理和用户信息修改。
        </p>
      </div>

      <form class="login-card" @submit.prevent="handleLogin">
        <div class="role-switch" role="tablist" aria-label="选择登录角色">
          <button type="button" :class="{ active: activeRole === 'student' }" @click="switchRole('student')">
            <GraduationCap :size="18" />
            <span>用户</span>
          </button>
          <button type="button" :class="{ active: activeRole === 'admin' }" @click="switchRole('admin')">
            <ShieldCheck :size="18" />
            <span>管理员</span>
          </button>
        </div>

        <div class="login-card-head">
          <span class="login-card-icon">
            <BrainCircuit v-if="activeRole === 'student'" :size="24" />
            <BarChart3 v-else :size="24" />
          </span>
          <div>
            <h2>{{ roleMeta.title }}</h2>
            <p>{{ roleMeta.desc }}</p>
          </div>
        </div>

        <label class="login-field">
          <span><UserRound :size="16" />账号</span>
          <input v-model="account" autocomplete="username" placeholder="请输入账号" />
        </label>

        <label class="login-field">
          <span><LockKeyhole :size="16" />密码</span>
          <input v-model="password" type="password" autocomplete="current-password" placeholder="请输入密码" />
        </label>

        <p v-if="errorText" class="login-error">{{ errorText }}</p>

        <button class="login-submit" type="submit">
          {{ roleMeta.submit }}
        </button>

        <div class="login-hints">
          <span>演示账号：{{ roleMeta.account }}</span>
          <span>密码：{{ roleMeta.password }}</span>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #eff8ff;
  background:
    radial-gradient(circle at 20% 22%, rgba(0, 212, 255, 0.18), transparent 30%),
    radial-gradient(circle at 82% 42%, rgba(240, 178, 74, 0.13), transparent 28%),
    linear-gradient(135deg, #040813 0%, #071526 50%, #030611 100%);
}

.login-bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(145, 223, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(145, 223, 255, 0.07) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(ellipse at center, #000 22%, transparent 82%);
}

.login-stream {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-stream span {
  position: absolute;
  color: rgba(164, 239, 255, 0.34);
  font-size: 13px;
  text-shadow: 0 0 18px rgba(0, 212, 255, 0.72);
}

.login-stream span:nth-child(1) { left: 12%; top: 16%; }
.login-stream span:nth-child(2) { left: 30%; top: 38%; }
.login-stream span:nth-child(3) { left: 58%; top: 20%; }
.login-stream span:nth-child(4) { left: 76%; top: 70%; }
.login-stream span:nth-child(5) { left: 18%; top: 78%; }
.login-stream span:nth-child(6) { left: 66%; top: 45%; }
.login-stream span:nth-child(7) { left: 82%; top: 24%; }
.login-stream span:nth-child(8) { left: 44%; top: 72%; }

.login-stage {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(360px, 460px);
  gap: 56px;
  align-items: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #91dfff;
  font-size: 18px;
  font-weight: 700;
}

.brand-mark span {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(145, 223, 255, 0.26);
  border-radius: 10px;
  background: rgba(4, 15, 30, 0.5);
}

.flow-visual {
  display: grid;
  grid-template-columns: 180px minmax(120px, 1fr) 220px;
  align-items: center;
  gap: 16px;
  max-width: 720px;
  margin: 44px 0 36px;
}

.glass-node,
.login-card {
  border: 1px solid rgba(145, 223, 255, 0.22);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(53, 224, 216, 0.13), rgba(255, 255, 255, 0.04)),
    rgba(5, 14, 29, 0.56);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 24px 70px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(16px) saturate(1.2);
}

.glass-node {
  padding: 18px;
}

.glass-node strong {
  display: block;
  color: #fff;
}

.glass-node small {
  display: block;
  margin-top: 8px;
  color: #9bb1ce;
}

.flow-lines {
  display: grid;
  gap: 10px;
}

.flow-lines i {
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #35e0d8, #f0b24a, transparent);
  box-shadow: 0 0 22px rgba(53, 224, 216, 0.58);
}

.insight-node strong {
  font-size: 32px;
}

.mini-chart {
  display: flex;
  align-items: end;
  gap: 4px;
  height: 54px;
  margin-top: 14px;
}

.mini-chart em {
  width: 100%;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #f0b24a, #35e0d8);
}

.login-copy h1 {
  max-width: 680px;
  margin: 0;
  color: #fff;
  font-size: clamp(42px, 5vw, 76px);
  line-height: 1.03;
  letter-spacing: 0;
}

.login-copy p {
  max-width: 640px;
  margin: 24px 0 0;
  color: #b5c7df;
  font-size: 18px;
  line-height: 1.8;
}

.login-card {
  padding: 24px;
}

.role-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 22px;
}

.role-switch button,
.login-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border: 1px solid rgba(145, 223, 255, 0.14);
  border-radius: 12px;
  color: #adc0dc;
  background: rgba(7, 15, 32, 0.48);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.role-switch button:hover,
.login-submit:hover {
  transform: translateY(-1px);
}

.role-switch button.active {
  color: #fff;
  border-color: rgba(53, 224, 216, 0.44);
  background: rgba(53, 224, 216, 0.14);
  box-shadow: 0 0 24px rgba(53, 224, 216, 0.14);
}

.login-card-head {
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-bottom: 22px;
}

.login-card-icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  color: #35e0d8;
  background: rgba(53, 224, 216, 0.12);
}

.login-card h2 {
  margin: 0;
  color: #fff;
  font-size: 24px;
}

.login-card p {
  margin: 6px 0 0;
  color: #91a7c6;
  line-height: 1.6;
}

.login-field {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.login-field span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #bdd0e8;
  font-size: 13px;
}

.login-field input {
  height: 46px;
  border: 1px solid rgba(145, 223, 255, 0.16);
  border-radius: 12px;
  padding: 0 14px;
  color: #fff;
  background: rgba(3, 9, 20, 0.5);
  outline: none;
}

.login-field input:focus {
  border-color: rgba(53, 224, 216, 0.5);
  box-shadow: 0 0 0 3px rgba(53, 224, 216, 0.1);
}

.login-error {
  margin: 12px 0 0;
  color: #ff8d8d;
}

.login-submit {
  width: 100%;
  margin-top: 20px;
  color: #06101c;
  border: 0;
  background: linear-gradient(135deg, #35e0d8, #f0b24a);
  font-weight: 800;
}

.login-hints {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  color: #7f94b4;
  font-size: 12px;
}

@media (max-width: 960px) {
  .login-stage,
  .flow-visual {
    grid-template-columns: 1fr;
  }

  .login-stage {
    padding: 28px;
  }
}
</style>
