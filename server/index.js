import http from 'node:http'
import { URL } from 'node:url'
import {
  analyzeProfile,
  buildChatReply,
  buildTutoringReply,
  getChatHistory,
  getEvaluationPayload,
  getLearningPathPayload,
  getLatestProfileResult,
  getRecommendedResources,
  getResources,
  getTutoringHistory,
  getTutoringTopics,
  saveChatHistoryEntry,
  saveProfileResult,
  saveTutoringHistoryEntry,
  getAgentWorkflow,
  generateResourcesPayload,
  getEvidenceTraces,
  getEvidenceSummary,
} from './data.js'
import {
  orchestrateProfileAnalysis,
  orchestrateResourceGeneration,
  orchestratePathReplan,
  orchestrateTutoring,
  orchestrateFullEvaluation,
} from './agents/orchestrator.js'
import { getTraces, getTraceSummary } from './evidence/recorder.js'
import { validateResourceGenerateInput } from './schemas.js'
import { isLlmAvailable } from './llm/provider.js'

const PORT = Number(process.env.PORT || 8787)
const MAX_BODY_SIZE = 1024 * 1024

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  })
  res.end(JSON.stringify(payload))
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not Found' })
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0

    req.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY_SIZE) {
        const error = new Error('Payload too large')
        error.statusCode = 413
        req.destroy(error)
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        error.statusCode = 400
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function listResources(searchParams) {
  const type = searchParams.get('type')
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const resources = getResources()

  return resources.filter(item => {
    if (type && type !== 'all' && item.type !== type) {
      return false
    }
    if (!q) {
      return true
    }
    return item.title.toLowerCase().includes(q) || item.tags.some(tag => tag.toLowerCase().includes(q))
  })
}

function latestUserMessage(messages) {
  if (!Array.isArray(messages)) return ''
  const latest = [...messages].reverse().find(item => item?.sender === 'user' || item?.role === 'user')
  return String(latest?.text || latest?.content || '').trim()
}

function toDialogueChatReply(reply) {
  return {
    reply: reply.content,
    extractedDimensions: {},
    capturedTags: [],
    suggestChips: reply.suggestions ?? [],
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    notFound(res)
    return
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    })
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const { pathname, searchParams } = url

  try {
    if (req.method === 'GET' && pathname === '/api/health') {
      sendJson(res, 200, { ok: true })
      return
    }

    if (req.method === 'POST' && pathname === '/api/profile/analyze') {
      const body = await readJson(req)
      const result = analyzeProfile(body)
      saveProfileResult(result)
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'GET' && pathname === '/api/profile/latest') {
      sendJson(res, 200, { result: getLatestProfileResult() })
      return
    }

    if (req.method === 'POST' && pathname === '/api/chat') {
      const body = await readJson(req)
      const isDialoguePayload = Array.isArray(body.messages)
      const message = isDialoguePayload ? latestUserMessage(body.messages) : String(body.message || '').trim()
      const reply = buildChatReply(message, body.multimodalContents)
      saveChatHistoryEntry(message, reply, body.multimodalContents)
      sendJson(res, 200, isDialoguePayload ? toDialogueChatReply(reply) : reply)
      return
    }

    if (req.method === 'GET' && pathname === '/api/chat/history') {
      sendJson(res, 200, { items: getChatHistory() })
      return
    }

    if (req.method === 'POST' && pathname === '/api/tutoring/ask') {
      const body = await readJson(req)
      const reply = buildTutoringReply(body.question, body.mode, body.multimodalContents)
      saveTutoringHistoryEntry({
        question: String(body.question || '').trim() || '未提供问题',
        answer: reply.answer,
        mode: body.mode || 'qa',
        scenario: body.scenario || 'preview',
        multimodalContents: body.multimodalContents || [],
      })
      sendJson(res, 200, reply)
      return
    }

    if (req.method === 'GET' && pathname === '/api/tutoring/history') {
      sendJson(res, 200, { items: getTutoringHistory() })
      return
    }

    if (req.method === 'GET' && pathname === '/api/tutoring/topics') {
      sendJson(res, 200, { topics: getTutoringTopics() })
      return
    }

    if (req.method === 'GET' && pathname === '/api/resources') {
      sendJson(res, 200, { items: listResources(searchParams) })
      return
    }

    if (req.method === 'GET' && pathname === '/api/resources/recommended') {
      sendJson(res, 200, { items: getRecommendedResources() })
      return
    }

    if (req.method === 'GET' && pathname === '/api/learning-path') {
      sendJson(res, 200, getLearningPathPayload())
      return
    }

    if (req.method === 'GET' && pathname === '/api/evaluation') {
      sendJson(res, 200, getEvaluationPayload())
      return
    }

    if (req.method === 'GET' && pathname === '/api/agent/workflow') {
      sendJson(res, 200, getAgentWorkflow())
      return
    }

    if (req.method === 'POST' && pathname === '/api/resources/generate') {
      const body = await readJson(req)
      const validation = validateResourceGenerateInput(body)
      if (!validation.valid) {
        sendJson(res, 400, { error: 'Bad Request', details: validation.errors })
        return
      }
      const profile = body.profile || getLatestProfileResult() || {}
      const weaknesses = body.weaknesses || profile.weaknesses || []
      const result = await orchestrateResourceGeneration({
        profile,
        weaknesses,
        topic: body.topic,
        resourceType: body.resourceType,
      })
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'POST' && pathname === '/api/agents/profile') {
      const body = await readJson(req)
      const result = await orchestrateProfileAnalysis(body)
      saveProfileResult(result.profile)
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'POST' && pathname === '/api/agents/path-replan') {
      const body = await readJson(req)
      const profile = body.profile || getLatestProfileResult() || {}
      const result = await orchestratePathReplan({
        profile,
        evaluation: body.evaluation,
        currentPath: body.currentPath,
      })
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'POST' && pathname === '/api/agents/tutor') {
      const body = await readJson(req)
      const profile = body.profile || getLatestProfileResult() || {}
      const result = await orchestrateTutoring({
        question: body.question,
        mode: body.mode,
        profile,
        resources: body.resources,
      })
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'POST' && pathname === '/api/agents/evaluate') {
      const body = await readJson(req)
      const profile = body.profile || getLatestProfileResult() || {}
      const result = await orchestrateFullEvaluation({
        profile,
        learningData: body.learningData,
        exerciseResults: body.exerciseResults,
      })
      sendJson(res, 200, result)
      return
    }

    if (req.method === 'GET' && pathname === '/api/evidence/traces') {
      const limit = Number(searchParams.get('limit') || 50)
      const offset = Number(searchParams.get('offset') || 0)
      const traces = getTraces(limit, offset)
      sendJson(res, 200, { items: traces, total: traces.length })
      return
    }

    if (req.method === 'GET' && pathname === '/api/evidence/summary') {
      const summary = getTraceSummary()
      sendJson(res, 200, { ...summary, llmAvailable: isLlmAvailable() })
      return
    }

    notFound(res)
  } catch (error) {
    const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode : 500
    sendJson(res, statusCode, {
      error: statusCode === 413 ? 'Payload Too Large' : statusCode === 400 ? 'Bad Request' : 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

server.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
