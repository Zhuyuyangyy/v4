import { LOCAL_KNOWLEDGE_DOCUMENTS } from './documents.js'

const DIMENSIONS = 96
const MODEL_NAME = 'local-hash-embedding-v1'

function hashToken(token) {
  let hash = 2166136261
  for (let index = 0; index < token.length; index += 1) {
    hash ^= token.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function tokenize(text) {
  const normalized = String(text || '').toLowerCase()
  const words = normalized.match(/[a-z0-9_+#.-]+|[\u4e00-\u9fff]/g) || []
  const cjk = normalized.match(/[\u4e00-\u9fff]{2,}/g) || []
  const bigrams = cjk.flatMap(item => {
    const tokens = []
    for (let index = 0; index < item.length - 1; index += 1) {
      tokens.push(item.slice(index, index + 2))
    }
    return tokens
  })
  return [...words, ...bigrams].filter(Boolean)
}

function embedText(text) {
  const vector = new Array(DIMENSIONS).fill(0)
  const tokens = tokenize(text)

  for (const token of tokens) {
    const hash = hashToken(token)
    const index = hash % DIMENSIONS
    const sign = hash & 1 ? 1 : -1
    vector[index] += sign * (1 + Math.min(token.length, 8) / 8)
  }

  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1
  return vector.map(value => value / norm)
}

function cosineSimilarity(left, right) {
  let score = 0
  for (let index = 0; index < DIMENSIONS; index += 1) {
    score += left[index] * right[index]
  }
  return score
}

function documentText(document) {
  return [
    document.title,
    document.type,
    document.tags?.join(' '),
    document.summary,
    document.content,
    document.agentHint,
  ].filter(Boolean).join('\n')
}

const VECTOR_INDEX = LOCAL_KNOWLEDGE_DOCUMENTS.map(document => ({
  document,
  embedding: embedText(documentText(document)),
}))

function buildQuery({ query, profile, learningData, exerciseResults }) {
  const dimensions = Array.isArray(profile?.dimensions)
    ? profile.dimensions.map(item => `${item.label || item.key || ''} ${item.value ?? ''}`).join(' ')
    : ''
  const weaknesses = Array.isArray(profile?.weaknesses)
    ? profile.weaknesses.map(item => `${item.tag || item.label || ''} ${item.count ?? ''}`).join(' ')
    : ''

  return [
    query,
    dimensions,
    weaknesses,
    JSON.stringify(learningData || {}),
    JSON.stringify(exerciseResults || {}),
  ].filter(Boolean).join('\n')
}

export function searchKnowledgeBase({ query, profile, learningData, exerciseResults, limit = 4 } = {}) {
  const finalQuery = buildQuery({ query, profile, learningData, exerciseResults })
  const queryEmbedding = embedText(finalQuery || 'evaluation profile learning weakness')
  const matches = VECTOR_INDEX
    .map(({ document, embedding }) => ({
      id: document.id,
      source: document.source,
      title: document.title,
      type: document.type,
      tags: document.tags,
      summary: document.summary,
      agentHint: document.agentHint,
      score: Number(cosineSimilarity(queryEmbedding, embedding).toFixed(4)),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)

  return {
    query: finalQuery,
    matches,
    embedding: {
      model: MODEL_NAME,
      dimensions: DIMENSIONS,
      indexSize: VECTOR_INDEX.length,
      generatedAt: new Date().toISOString(),
    },
  }
}

export function getKnowledgeBaseStats() {
  const localDocuments = LOCAL_KNOWLEDGE_DOCUMENTS.filter(item => item.source === 'local').length
  const vectorDocuments = LOCAL_KNOWLEDGE_DOCUMENTS.length

  return {
    model: MODEL_NAME,
    dimensions: DIMENSIONS,
    localDocuments,
    vectorDocuments,
    syncedAgents: ['EvaluationAgent', 'PathAgent', 'ReflectionAgent'],
    updatedAt: new Date().toISOString(),
  }
}
