import { test } from 'node:test'
import assert from 'node:assert/strict'
import { searchKnowledgeBase, searchKnowledgeBaseAdvanced, getKnowledgeBaseStats } from '../server/knowledge-base/vector-store.js'
import { detectDomain } from '../server/knowledge-base/detect-domain.js'
import { retrieveKnowledgeContext, buildKnowledgeEvidence, summarizeKnowledgeForPrompt } from '../server/knowledge-base/retrieval.js'

test('detectDomain identifies algorithm', () => {
  assert.equal(detectDomain('指针别名怎么理解'), 'algorithm')
  assert.equal(detectDomain('BFS visited 时机'), 'algorithm')
  assert.equal(detectDomain('动态规划 子问题'), 'algorithm')
})

test('detectDomain identifies english', () => {
  assert.equal(detectDomain('英语时态选择'), 'english')
  assert.equal(detectDomain('subjunctive mood'), 'english')
})

test('detectDomain identifies pedagogy', () => {
  assert.equal(detectDomain('错因诊断三步法'), 'pedagogy')
  assert.equal(detectDomain('心流状态 复习间隔'), 'pedagogy')
})

test('detectDomain returns method or pedagogy for 番茄钟', () => {
  const result = detectDomain('番茄钟 学习法')
  assert.ok(result === 'method' || result === 'pedagogy')
})

test('detectDomain returns null for empty / unknown', () => {
  assert.equal(detectDomain(''), null)
  assert.equal(detectDomain('xxx yyy zzz'), null)
})

test('searchKnowledgeBase returns matches sorted by score', () => {
  const result = searchKnowledgeBase({ query: '指针别名', limit: 3 })
  assert.ok(result.matches.length >= 1)
  for (let i = 1; i < result.matches.length; i += 1) {
    assert.ok(result.matches[i - 1].score >= result.matches[i].score)
  }
})

test('searchKnowledgeBaseAdvanced returns chunk-level matches', () => {
  const result = searchKnowledgeBaseAdvanced({
    query: '指针别名',
    profile: { weaknesses: [{ tag: '指针' }] },
    limit: 3,
  })
  assert.ok(result.matches.length >= 1)
  for (const match of result.matches) {
    assert.ok(match.id)
    assert.ok(match.title)
    assert.ok(match.text)
    assert.ok(match.scoreBreakdown)
    assert.equal(typeof match.scoreBreakdown.vector, 'number')
    assert.equal(typeof match.scoreBreakdown.tag, 'number')
    assert.equal(typeof match.scoreBreakdown.keyword, 'number')
  }
})

test('searchKnowledgeBaseAdvanced filters by domain', () => {
  const result = searchKnowledgeBaseAdvanced({
    query: '错因诊断',
    domain: 'pedagogy',
    limit: 5,
  })
  assert.equal(result.detectedDomain, 'pedagogy')
  for (const match of result.matches) {
    assert.ok(match.domain === 'pedagogy' || match.domain === 'general')
  }
})

test('searchKnowledgeBaseAdvanced tags boost match score', () => {
  const withTag = searchKnowledgeBaseAdvanced({
    query: '指针',
    profile: { weaknesses: [{ tag: 'pointer', count: 3 }] },
    domain: 'algorithm',
    limit: 3,
  })
  const withoutTag = searchKnowledgeBaseAdvanced({
    query: '指针',
    domain: 'algorithm',
    limit: 3,
  })
  if (withTag.matches.length && withoutTag.matches.length) {
    assert.ok(withTag.matches[0].scoreBreakdown.tag >= withoutTag.matches[0].scoreBreakdown.tag)
  }
})

test('getKnowledgeBaseStats returns counts and domains', () => {
  const stats = getKnowledgeBaseStats()
  assert.ok(stats.totalChunks >= 30, `expected >=30 chunks, got ${stats.totalChunks}`)
  assert.ok(stats.vectorDocuments >= 30)
  assert.ok(Object.keys(stats.domainCounts).length >= 4)
})

test('retrieveKnowledgeContext returns metrics-tracked payload', () => {
  const before = searchKnowledgeBaseAdvanced({ query: 'pointer', limit: 2 })
  const result = retrieveKnowledgeContext({
    agentName: 'TutorAgent',
    query: 'pointer aliasing',
    profile: { weaknesses: [{ tag: 'pointer' }] },
  })
  assert.ok(result.matches)
  assert.equal(result.agentName, 'TutorAgent')
})

test('buildKnowledgeEvidence produces stable strings', () => {
  const kb = { agentName: 'TutorAgent', detectedDomain: 'algorithm', matches: [{ title: 'A' }, { title: 'B' }] }
  const lines = buildKnowledgeEvidence(kb, { summary: 'test' })
  assert.equal(lines.length, 3)
  assert.ok(lines[1].includes('algorithm'))
  assert.ok(lines[2].includes('A / B'))
})

test('summarizeKnowledgeForPrompt truncates long content', () => {
  const matches = [
    { title: 'T', text: 'X'.repeat(500) },
  ]
  const summary = summarizeKnowledgeForPrompt(matches, 200)
  assert.ok(summary.length <= 250)
  assert.ok(summary.includes('T'))
})