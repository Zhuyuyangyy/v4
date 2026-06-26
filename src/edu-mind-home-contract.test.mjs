import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')

test('EduMind home renders the knowledge translation console story', () => {
  const home = read('./components/edu-mind/HomeView.vue')

  assert.match(home, /知识转译控制台/)
  assert.match(home, /课程知识源/)
  assert.match(home, /AI 加工流/)
  assert.match(home, /学习工作台/)
  assert.match(home, /画像诊断/)
  assert.match(home, /资源生成/)
  assert.match(home, /路径规划/)
  assert.match(home, /练习评估/)
})

test('EduMind home actions navigate to existing feature tabs', () => {
  const home = read('./components/edu-mind/HomeView.vue')

  for (const tab of ['课程', '资源中心', '练习中心', '思维导图']) {
    assert.match(home, new RegExp(`emit\\('navigateToTab', '${tab}'\\)`))
  }
})

test('EduMind route opens on 首页 and sidebar exposes the entry tab', () => {
  const view = read('./views/EduMind.vue')
  const sidebar = read('./components/edu-mind/Sidebar.vue')

  assert.match(view, /return saved \|\| '首页'/)
  assert.match(view, /currentTab === '首页'/)
  assert.match(sidebar, /name: '首页'/)
})
