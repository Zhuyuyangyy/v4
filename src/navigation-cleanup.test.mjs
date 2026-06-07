import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

test('standalone mindmap route and top navigation entry are removed', async () => {
  const [routerSource, layoutSource] = await Promise.all([
    readFile(new URL('./router/index.ts', import.meta.url), 'utf8'),
    readFile(new URL('./components/layout/AppLayout.vue', import.meta.url), 'utf8'),
  ])

  assert.equal(routerSource.includes("path: '/mindmap'"), false)
  assert.equal(routerSource.includes("name: 'mindmap'"), false)
  assert.equal(routerSource.includes("MindMapView.vue"), false)
  assert.equal(layoutSource.includes("path: '/mindmap'"), false)
})
