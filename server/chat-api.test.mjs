import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { test } from 'node:test'

const TEST_PORT = 8791
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`

async function waitForServer(process) {
  const deadline = Date.now() + 5000
  while (Date.now() < deadline) {
    if (process.exitCode !== null) {
      throw new Error(`API server exited early with code ${process.exitCode}`)
    }

    try {
      const response = await fetch(`${BASE_URL}/api/health`)
      if (response.ok) return
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  throw new Error('Timed out waiting for API server')
}

async function withApiServer(fn) {
  const api = spawn(process.execPath, ['server/index.js'], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(TEST_PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let stderr = ''
  api.stderr.on('data', chunk => {
    stderr += chunk.toString()
  })

  try {
    await waitForServer(api)
    await fn()
  } finally {
    if (api.exitCode === null) {
      api.kill()
      await once(api, 'exit')
    }
  }

  assert.equal(stderr, '')
}

test('/api/chat accepts dialogue messages payload and returns dialogue shape', async () => {
  await withApiServer(async () => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ sender: 'user', text: '你好' }],
        currentDimensions: { identity: 'student' },
      }),
    })

    assert.equal(response.status, 200)
    const data = await response.json()
    assert.equal(typeof data.reply, 'string')
    assert.ok(data.reply.length > 0)
    assert.deepEqual(data.extractedDimensions, {})
    assert.ok(Array.isArray(data.suggestChips))
  })
})
