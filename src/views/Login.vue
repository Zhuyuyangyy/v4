<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AgentGeometryScene from '@/components/login/AgentGeometryScene.vue'
import InkFieldBackground from '@/components/login/InkFieldBackground.vue'
import LoginPanel from '@/components/login/LoginPanel.vue'
import { setAuthSession, type AuthRole } from '@/lib/auth'

const router = useRouter()
const rootRef = ref<HTMLElement | null>(null)
const compactScene = ref(false)
const authOpen = ref(false)
let mediaQuery: MediaQueryList | null = null
let loginTimer = 0

function updateCompact(event?: MediaQueryListEvent | MediaQueryList) {
  compactScene.value = Boolean(event?.matches ?? mediaQuery?.matches)
}

function resolveLoginRole(payload: { account: string, role: AuthRole }) {
  const normalizedAccount = payload.account.trim().toLowerCase()
  return payload.role === 'admin' || normalizedAccount === 'admin' ? 'admin' : 'student'
}

function handleLogin(payload: { account: string, password: string, remember: boolean, role: AuthRole }) {
  window.clearTimeout(loginTimer)

  loginTimer = window.setTimeout(() => {
    const role = resolveLoginRole(payload)
    setAuthSession({
      role,
      name: role === 'admin' ? '管理员' : (payload.account || '学习用户'),
      account: payload.account || (role === 'admin' ? 'admin' : 'student'),
      loginAt: new Date().toISOString(),
    })
    router.replace(role === 'admin' ? '/admin' : '/home')
  }, 1000)
}

function openAuth() {
  authOpen.value = true
}

function closeAuth() {
  authOpen.value = false
}

function handlePointerMove(event: PointerEvent) {
  rootRef.value?.style.setProperty('--cursor-x', `${event.clientX}px`)
  rootRef.value?.style.setProperty('--cursor-y', `${event.clientY}px`)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 900px)')
  updateCompact(mediaQuery)
  mediaQuery.addEventListener('change', updateCompact)
})

onBeforeUnmount(() => {
  window.clearTimeout(loginTimer)
  mediaQuery?.removeEventListener('change', updateCompact)
})
</script>

<template>
  <main ref="rootRef" class="login-view" @pointermove="handlePointerMove">
    <InkFieldBackground :compact="compactScene" />
    <div class="ink-veil" aria-hidden="true" />
    <div class="grain-layer" aria-hidden="true" />
    <div class="login-grid" aria-hidden="true" />
    <div class="cursor-core" aria-hidden="true" />
    <div class="cursor-ring" aria-hidden="true" />

    <section class="visual-pane" aria-label="EduMind 系统入口主页">
      <AgentGeometryScene :compact="compactScene" :show-copy="false" />

      <header class="landing-topbar">
        <div class="brand-block">
          <strong>EduMind</strong>
          <span>A3-TRACE Learning Intelligence</span>
        </div>
        <div class="connection-pill">
          <i />
          Agent Orchestrator Online
        </div>
      </header>

      <section class="landing-copy">
        <p>Multi-Agent Personalized Learning OS</p>
        <h1>
          <span>进入</span>
          <span>AI 学习宇宙</span>
        </h1>
        <span>
          学习画像、资源生成、路径规划、智能辅导、效果评估与反馈重规划在同一个智能体核心中持续协作。
        </span>
      </section>

      <button class="enter-system" type="button" @click="openAuth">
        <span>进入系统</span>
        <i />
      </button>

      <div class="landing-metrics" aria-hidden="true">
        <span>ProfileAgent</span>
        <span>ResourceAgent</span>
        <span>PathAgent</span>
        <span>TutorAgent</span>
        <span>EvaluationAgent</span>
        <span>ReflectionAgent</span>
      </div>
    </section>

    <Transition name="auth-modal">
      <section v-if="authOpen" class="auth-layer" aria-label="登录窗口">
        <button class="auth-backdrop" type="button" aria-label="关闭登录窗口" @click="closeAuth" />
        <div class="auth-dialog">
          <button class="auth-close" type="button" aria-label="关闭登录窗口" @click="closeAuth">×</button>
          <LoginPanel @submit="handleLogin" />
        </div>
      </section>
    </Transition>
  </main>
</template>

<style scoped>
.login-view {
  --cursor-x: 50vw;
  --cursor-y: 50vh;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #f0f6ff;
  background: transparent;
  font-family: 'Avenir Next', 'Avenir', 'Microsoft YaHei UI', 'PingFang SC', sans-serif;
  isolation: isolate;
}

.ink-veil,
.grain-layer,
.login-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.ink-veil {
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(10, 20, 45, 0.15), rgba(15, 40, 80, 0.02) 42%, rgba(10, 25, 55, 0.1)),
    radial-gradient(circle at 51% 49%, transparent 0 36%, rgba(15, 35, 70, 0.03) 58%, rgba(10, 20, 45, 0.12) 100%),
    linear-gradient(180deg, rgba(10, 16, 35, 0.12), transparent 25%, transparent 75%, rgba(150, 190, 235, 0.05));
  opacity: 0.5;
}

.grain-layer {
  z-index: 3;
  inset: -45%;
  opacity: 0.26;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
  animation: grain-shift 7s steps(6) infinite;
}

.login-grid {
  z-index: 2;
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(125, 211, 252, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(125, 211, 252, 0.07) 1px, transparent 1px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 4px);
  background-size: 96px 96px, 96px 96px, 100% 4px;
  mask-image: radial-gradient(circle at 50% 50%, #000 0 42%, transparent 79%);
}

.cursor-core,
.cursor-ring {
  position: fixed;
  top: var(--cursor-y);
  left: var(--cursor-x);
  z-index: 25;
  border-radius: 999px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

.cursor-core {
  width: 6px;
  height: 6px;
  background: rgba(226, 245, 255, 0.96);
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.9);
}

.cursor-ring {
  width: 46px;
  height: 46px;
  border: 1px solid rgba(180, 240, 255, 0.42);
  background: rgba(34, 211, 238, 0.035);
  transition:
    width 420ms cubic-bezier(0.16, 1, 0.3, 1),
    height 420ms cubic-bezier(0.16, 1, 0.3, 1),
    background 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-pane,
.auth-layer {
  position: relative;
  z-index: 4;
  min-width: 0;
}

.visual-pane {
  min-height: 100vh;
}

.landing-topbar {
  position: fixed;
  top: clamp(24px, 4vw, 48px);
  left: clamp(24px, 5vw, 72px);
  right: clamp(24px, 5vw, 72px);
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  pointer-events: none;
  animation: text-reveal 1100ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both;
}

.brand-block {
  display: grid;
  gap: 6px;
}

.brand-block strong {
  color: #f7fbff;
  font-size: clamp(28px, 4vw, 52px);
  line-height: 0.9;
  letter-spacing: 0.08em;
  text-shadow: 0 0 28px rgba(103, 232, 249, 0.16);
}

.brand-block span,
.connection-pill,
.landing-copy p,
.landing-metrics,
.enter-system {
  font-family: 'Microsoft YaHei UI', 'PingFang SC', sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.brand-block span {
  color: rgba(125, 211, 252, 0.72);
  font-size: 11px;
}

.connection-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  border: 1px solid rgba(125, 211, 252, 0.26);
  border-radius: 999px;
  padding: 0 16px;
  color: rgba(226, 245, 255, 0.8);
  background: rgba(2, 8, 23, 0.24);
  font-size: 10px;
  backdrop-filter: blur(16px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.connection-pill i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 18px rgba(45, 212, 191, 0.9);
}

.landing-copy {
  position: fixed;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(142px, 18vh, 210px);
  z-index: 7;
  max-width: min(620px, calc(100vw - 48px));
  pointer-events: none;
}

.landing-copy p {
  margin: 0 0 16px;
  color: #67e8f9;
  font-size: 11px;
  animation: text-reveal 1000ms cubic-bezier(0.16, 1, 0.3, 1) 360ms both;
}

.landing-copy h1 {
  margin: 0;
  color: #f8fbff;
  font-size: clamp(46px, 6.2vw, 92px);
  line-height: 0.96;
  letter-spacing: 0;
  text-shadow: 0 10px 55px rgba(0, 0, 0, 0.48), 0 0 35px rgba(34, 211, 238, 0.14);
}

.landing-copy h1 span {
  display: block;
  overflow: hidden;
  animation: text-reveal 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.landing-copy h1 span:nth-child(2) {
  background: linear-gradient(94deg, #f8fbff 0%, #9cecff 42%, #7c8cff 78%, #f8fbff 100%);
  background-clip: text;
  color: transparent;
  animation-delay: 120ms;
}

.landing-copy > span {
  display: block;
  max-width: 460px;
  margin-top: 20px;
  color: rgba(201, 222, 237, 0.74);
  font-size: 15px;
  line-height: 1.9;
  animation: text-reveal 1100ms cubic-bezier(0.16, 1, 0.3, 1) 520ms both;
}

.enter-system {
  position: fixed;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(48px, 8vh, 86px);
  z-index: 8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: min(260px, calc(100vw - 48px));
  min-height: 58px;
  overflow: hidden;
  border: 1px solid rgba(190, 241, 255, 0.72);
  color: #f8fbff;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(14, 165, 233, 0.04) 44%, rgba(139, 92, 246, 0.08)),
    rgba(2, 8, 23, 0.24);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  backdrop-filter: blur(16px);
  animation: text-reveal 1100ms cubic-bezier(0.16, 1, 0.3, 1) 720ms both;
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), border-color 520ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.enter-system::before {
  content: '';
  position: absolute;
  top: -80px;
  left: -90px;
  width: 58px;
  height: 220px;
  transform: rotate(34deg);
  background: rgba(255, 255, 255, 0.45);
  transition: left 760ms cubic-bezier(0.16, 1, 0.3, 1);
}

.enter-system:hover {
  transform: translateY(-3px);
  border-color: rgba(103, 232, 249, 0.9);
  box-shadow: 0 24px 78px rgba(14, 165, 233, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.enter-system:hover ~ .cursor-ring,
.login-view:has(.enter-system:hover) .cursor-ring,
.login-view:has(.auth-close:hover) .cursor-ring {
  width: 68px;
  height: 68px;
  background: rgba(125, 211, 252, 0.08);
}

.enter-system:hover::before {
  left: 120%;
}

.enter-system span,
.enter-system i {
  position: relative;
  z-index: 1;
}

.enter-system i {
  width: 34px;
  height: 1px;
  background: currentColor;
}

.enter-system i::after {
  content: '';
  position: absolute;
  right: -1px;
  top: -4px;
  width: 9px;
  height: 9px;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transform: rotate(45deg);
}

.landing-metrics {
  position: fixed;
  right: clamp(24px, 5vw, 72px);
  bottom: clamp(48px, 8vh, 86px);
  z-index: 7;
  display: grid;
  gap: 10px;
  color: rgba(226, 245, 255, 0.48);
  font-size: 10px;
  text-align: right;
  pointer-events: none;
}

.auth-layer {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background:
    radial-gradient(circle at var(--cursor-x) var(--cursor-y), rgba(34, 211, 238, 0.12), transparent 24%),
    rgba(1, 5, 16, 0.42);
  backdrop-filter: blur(18px) saturate(1.14);
  cursor: pointer;
}

.auth-dialog {
  position: relative;
  z-index: 1;
  width: min(450px, 100%);
}

.auth-close {
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(125, 211, 252, 0.28);
  border-radius: 50%;
  color: #e8f7ff;
  background: rgba(2, 8, 23, 0.76);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
  backdrop-filter: blur(12px);
}

.auth-modal-enter-active,
.auth-modal-leave-active {
  transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.auth-modal-enter-active .auth-dialog,
.auth-modal-leave-active .auth-dialog {
  transition: transform 620ms cubic-bezier(0.16, 1, 0.3, 1), filter 620ms cubic-bezier(0.16, 1, 0.3, 1);
}

.auth-modal-enter-from,
.auth-modal-leave-to {
  opacity: 0;
}

.auth-modal-enter-from .auth-dialog,
.auth-modal-leave-to .auth-dialog {
  transform: translateY(24px) scale(0.96);
  filter: blur(10px);
}

@keyframes text-reveal {
  from {
    opacity: 0;
    transform: translateY(28px);
    filter: blur(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes grain-shift {
  0%, 100% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-3%, 2%);
  }

  50% {
    transform: translate(2%, -3%);
  }

  75% {
    transform: translate(-2%, 2%);
  }
}

@media (max-width: 900px) {
  .login-view {
    min-height: 100svh;
  }

  .visual-pane {
    min-height: 100svh;
  }

  .landing-topbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .landing-copy {
    right: 24px;
    bottom: 154px;
  }

  .landing-copy h1 {
    font-size: clamp(40px, 12vw, 54px);
  }

  .landing-metrics {
    display: none;
  }

  .enter-system {
    right: 24px;
  }
}

@media (pointer: coarse) {
  .cursor-core,
  .cursor-ring {
    display: none;
  }
}
</style>
