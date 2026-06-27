<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Activity,
  Bot,
  BrainCircuit,
  Database,
  Edit3,
  KeyRound,
  ListChecks,
  LogOut,
  ShieldCheck,
  Users,
} from 'lucide-vue-next'
import { clearAuthSession } from '@/lib/auth'

const router = useRouter()
const activePanel = ref<'screen' | 'users' | 'roles' | 'profile'>('screen')

const metrics = [
  { label: '智能体调用量', value: '128,640', change: '+18.4%', icon: Bot, color: '#35e0d8' },
  { label: '学生学习时长', value: '9,824h', change: '+12.7%', icon: Activity, color: '#8fa7ff' },
  { label: 'Token 消耗', value: '42.8M', change: '+21.9%', icon: Database, color: '#f0b24a' },
  { label: '错题整理次数', value: '6,312', change: '+9.6%', icon: ListChecks, color: '#45d483' },
]

const agents = [
  { name: '画像诊断智能体', calls: 28640, rate: 88 },
  { name: '资源生成智能体', calls: 34120, rate: 76 },
  { name: '路径规划智能体', calls: 19880, rate: 64 },
  { name: '错因分析智能体', calls: 25140, rate: 72 },
  { name: '反馈回写智能体', calls: 20860, rate: 58 },
]

const students = [
  { name: '小明', role: '学生', status: '学习中', hours: '12.5h', weak: '图搜索' },
  { name: '李华', role: '学生', status: '待复盘', hours: '8.2h', weak: '指针' },
  { name: '王芳', role: '学生', status: '已完成', hours: '16.8h', weak: '动态规划' },
  { name: '赵强', role: '学生', status: '预警', hours: '4.1h', weak: '递归' },
]

const roles = [
  { name: '超级管理员', auth: '数据大屏、用户管理、角色管理、系统设置', count: 2 },
  { name: '教务管理员', auth: '学习数据、错题报表、资源审核', count: 5 },
  { name: '学生用户', auth: '画像生成、学习路径、资源中心、智能评估', count: 268 },
]

function logout() {
  clearAuthSession()
  router.replace('/login')
}
</script>

<template>
  <main class="admin-dashboard">
    <aside class="admin-nav">
      <div class="admin-logo">
        <ShieldCheck :size="22" />
        <span>
          <strong>管理员后台</strong>
          <small>EduMind Data Center</small>
        </span>
      </div>

      <button :class="{ active: activePanel === 'screen' }" @click="activePanel = 'screen'">
        <BrainCircuit :size="18" /> 数据大屏
      </button>
      <button :class="{ active: activePanel === 'users' }" @click="activePanel = 'users'">
        <Users :size="18" /> 用户管理
      </button>
      <button :class="{ active: activePanel === 'roles' }" @click="activePanel = 'roles'">
        <KeyRound :size="18" /> 角色管理
      </button>
      <button :class="{ active: activePanel === 'profile' }" @click="activePanel = 'profile'">
        <Edit3 :size="18" /> 用户信息修改
      </button>

      <button class="logout-button" @click="logout">
        <LogOut :size="18" /> 退出登录
      </button>
    </aside>

    <section class="admin-main">
      <div class="admin-header">
        <div>
          <p>EDUMIND ADMIN OBSERVATORY</p>
          <h1>智能学习运营数据大屏</h1>
        </div>
        <div class="admin-live">
          <span />
          实时同步中
        </div>
      </div>

      <template v-if="activePanel === 'screen'">
        <div class="metric-grid">
          <article v-for="metric in metrics" :key="metric.label" class="metric-card" :style="{ '--metric-color': metric.color }">
            <component :is="metric.icon" :size="22" />
            <span>{{ metric.label }}</span>
            <strong>{{ metric.value }}</strong>
            <em>{{ metric.change }}</em>
          </article>
        </div>

        <div class="screen-grid">
          <section class="glass-panel agent-panel">
            <div class="panel-head">
              <h2>智能体调用量排行</h2>
              <span>Agent Calls</span>
            </div>
            <div class="agent-list">
              <div v-for="agent in agents" :key="agent.name" class="agent-row">
                <div>
                  <strong>{{ agent.name }}</strong>
                  <span>{{ agent.calls.toLocaleString() }} 次调用</span>
                </div>
                <div class="agent-bar">
                  <i :style="{ width: `${agent.rate}%` }" />
                </div>
              </div>
            </div>
          </section>

          <section class="glass-panel token-panel">
            <div class="panel-head">
              <h2>Token 消耗趋势</h2>
              <span>Tokens</span>
            </div>
            <div class="token-chart" aria-hidden="true">
              <i v-for="n in 28" :key="n" :style="{ height: `${28 + ((n * 23) % 62)}%` }" />
            </div>
            <p>今日峰值出现在 20:00，主要由资源生成、错因分析、反馈回写触发。</p>
          </section>

          <section class="glass-panel learning-panel">
            <div class="panel-head">
              <h2>学生学习情况</h2>
              <span>Learning Status</span>
            </div>
            <div class="status-rings">
              <div><strong>76%</strong><span>按计划学习</span></div>
              <div><strong>18%</strong><span>需要复盘</span></div>
              <div><strong>6%</strong><span>学习预警</span></div>
            </div>
          </section>

          <section class="glass-panel mistake-panel">
            <div class="panel-head">
              <h2>错题整理与知识回写</h2>
              <span>Mistake Loop</span>
            </div>
            <ul>
              <li>图搜索专项错题：1,248 次</li>
              <li>指针与内存错题：986 次</li>
              <li>动态规划错题：814 次</li>
              <li>已触发画像回写：4,206 次</li>
            </ul>
          </section>
        </div>
      </template>

      <section v-else-if="activePanel === 'users'" class="glass-panel table-panel">
        <div class="panel-head">
          <h2>用户管理</h2>
          <span>新增、禁用、查看学习状态</span>
        </div>
        <table>
          <thead>
            <tr><th>姓名</th><th>角色</th><th>状态</th><th>本周学习</th><th>薄弱点</th><th>操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.name">
              <td>{{ student.name }}</td>
              <td>{{ student.role }}</td>
              <td>{{ student.status }}</td>
              <td>{{ student.hours }}</td>
              <td>{{ student.weak }}</td>
              <td><button>编辑</button><button>重置密码</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-else-if="activePanel === 'roles'" class="role-grid">
        <article v-for="role in roles" :key="role.name" class="glass-panel role-card">
          <h2>{{ role.name }}</h2>
          <p>{{ role.auth }}</p>
          <strong>{{ role.count }} 人</strong>
          <button>修改权限</button>
        </article>
      </section>

      <section v-else class="glass-panel profile-panel">
        <div class="panel-head">
          <h2>用户信息修改</h2>
          <span>管理员资料与安全设置</span>
        </div>
        <div class="profile-form">
          <label><span>姓名</span><input value="管理员" /></label>
          <label><span>账号</span><input value="admin" /></label>
          <label><span>手机号</span><input value="138****2026" /></label>
          <label><span>权限组</span><input value="超级管理员" /></label>
          <button>保存修改</button>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.admin-dashboard {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
  color: #eaf7ff;
  background:
    radial-gradient(circle at 25% 12%, rgba(53, 224, 216, 0.16), transparent 34%),
    radial-gradient(circle at 78% 30%, rgba(240, 178, 74, 0.12), transparent 28%),
    #050914;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(145, 223, 255, 0.12);
  padding: 24px;
  background: rgba(4, 10, 22, 0.55);
  backdrop-filter: blur(16px);
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.admin-logo svg {
  color: #35e0d8;
}

.admin-logo strong,
.admin-logo small {
  display: block;
}

.admin-logo small {
  color: #7e94b3;
  font-size: 11px;
}

.admin-nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 14px;
  color: #9eb4d3;
  background: transparent;
  cursor: pointer;
  transition: transform 180ms ease, color 180ms ease, border-color 180ms ease, background 180ms ease;
}

.admin-nav button:hover {
  transform: translateX(2px);
  color: #fff;
}

.admin-nav button.active {
  color: #fff;
  border-color: rgba(53, 224, 216, 0.28);
  background: rgba(53, 224, 216, 0.12);
}

.logout-button {
  margin-top: auto;
}

.admin-main {
  position: relative;
  overflow: hidden;
  padding: 28px;
}

.admin-main::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(145, 223, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(145, 223, 255, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
}

.admin-header,
.metric-grid,
.screen-grid,
.table-panel,
.role-grid,
.profile-panel {
  position: relative;
  z-index: 1;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.admin-header p {
  margin: 0 0 8px;
  color: #35e0d8;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
}

.admin-header h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(32px, 4vw, 56px);
  letter-spacing: 0;
}

.admin-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(53, 224, 216, 0.22);
  border-radius: 999px;
  padding: 8px 14px;
  color: #91dfff;
  background: rgba(53, 224, 216, 0.08);
}

.admin-live span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #35e0d8;
  box-shadow: 0 0 14px #35e0d8;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.metric-card,
.glass-panel {
  border: 1px solid rgba(145, 223, 255, 0.14);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(53, 224, 216, 0.1), rgba(255, 255, 255, 0.035)),
    rgba(5, 14, 29, 0.58);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.24);
  backdrop-filter: blur(14px);
}

.metric-card {
  padding: 18px;
}

.metric-card svg {
  color: var(--metric-color);
}

.metric-card span,
.metric-card em {
  display: block;
  margin-top: 10px;
  color: #91a7c6;
  font-style: normal;
}

.metric-card strong {
  display: block;
  margin-top: 8px;
  color: #fff;
  font-size: 30px;
  font-variant-numeric: tabular-nums;
}

.metric-card em {
  color: var(--metric-color);
}

.screen-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;
  margin-top: 14px;
}

.glass-panel {
  padding: 20px;
}

.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.panel-head h2 {
  margin: 0;
  color: #fff;
}

.panel-head span {
  color: #7e94b3;
  font-size: 12px;
}

.agent-row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-top: 16px;
}

.agent-row strong,
.agent-row span {
  display: block;
}

.agent-row span {
  margin-top: 4px;
  color: #7e94b3;
  font-size: 12px;
}

.agent-bar {
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(145, 223, 255, 0.1);
}

.agent-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #35e0d8, #f0b24a);
}

.token-chart {
  display: flex;
  align-items: end;
  gap: 5px;
  height: 180px;
}

.token-chart i {
  width: 100%;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #f0b24a, #35e0d8);
}

.token-panel p,
.mistake-panel li,
.role-card p {
  color: #a8bbd5;
  line-height: 1.7;
}

.status-rings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.status-rings div {
  display: grid;
  place-items: center;
  min-height: 146px;
  border: 1px solid rgba(53, 224, 216, 0.18);
  border-radius: 50%;
  text-align: center;
  background: radial-gradient(circle, rgba(53, 224, 216, 0.15), transparent 68%);
}

.status-rings strong {
  color: #fff;
  font-size: 28px;
}

.status-rings span {
  color: #91a7c6;
}

.mistake-panel ul {
  margin: 0;
  padding-left: 18px;
}

.table-panel {
  overflow-x: auto;
}

.table-panel table {
  width: 100%;
  border-collapse: collapse;
}

.table-panel th,
.table-panel td {
  border-bottom: 1px solid rgba(145, 223, 255, 0.12);
  padding: 14px 10px;
  text-align: left;
  white-space: nowrap;
}

.table-panel th {
  color: #91dfff;
}

.table-panel button,
.role-card button,
.profile-form button {
  margin-right: 8px;
  border: 1px solid rgba(53, 224, 216, 0.26);
  border-radius: 9px;
  padding: 7px 11px;
  color: #fff;
  background: rgba(53, 224, 216, 0.1);
  cursor: pointer;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.role-card strong {
  display: block;
  margin: 18px 0;
  color: #35e0d8;
  font-size: 28px;
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.profile-form label {
  display: grid;
  gap: 8px;
}

.profile-form span {
  color: #91a7c6;
}

.profile-form input {
  height: 44px;
  border: 1px solid rgba(145, 223, 255, 0.16);
  border-radius: 11px;
  padding: 0 12px;
  color: #fff;
  background: rgba(3, 9, 20, 0.5);
}

.profile-form button {
  min-height: 44px;
}

@media (max-width: 1120px) {
  .admin-dashboard,
  .screen-grid,
  .metric-grid,
  .role-grid,
  .profile-form {
    grid-template-columns: 1fr;
  }

  .admin-nav {
    position: static;
  }
}
</style>
