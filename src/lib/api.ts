import type {
  ApiResource,
  ChatHistoryItem,
  ChatReply,
  EvaluationResponse,
  LearningPathResponse,
  LatestProfileResponse,
  ProfileAnalyzeRequest,
  ProfileAnalyzeResponse,
  TutoringHistoryItem,
  TutoringReply,
} from '@/types/api'
import { useAppStore } from '@/store'

async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  const appStore = useAppStore()
  const method = (init?.method ?? 'GET').toUpperCase()
  const isAiRequest =
    method !== 'GET' &&
    (
      input.startsWith('/api/chat') ||
      input.startsWith('/api/tutoring') ||
      input.startsWith('/api/profile/analyze')
    )

  if (isAiRequest) {
    appStore.beginAiRequest()
  }

  let aiRequestSettled = false

  try {
    const response = await fetch(input, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      ...init,
    })

    if (!response.ok) {
      if (isAiRequest) {
        appStore.finishAiRequest(false)
        aiRequestSettled = true
      }
      throw new Error(`Request failed: ${response.status}`)
    }

    const data = await response.json() as T

    if (isAiRequest) {
      appStore.finishAiRequest(true)
      aiRequestSettled = true
    }

    return data
  } catch (error) {
    if (isAiRequest && !aiRequestSettled) {
      appStore.finishAiRequest(false)
    }
    throw error
  }
}

export function analyzeProfile(payload: ProfileAnalyzeRequest) {
  return requestJson<ProfileAnalyzeResponse>('/api/profile/analyze', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function fetchLatestProfile() {
  const data = await requestJson<LatestProfileResponse>('/api/profile/latest')
  return data.result
}

export function sendChatMessage(message: string) {
  return requestJson<ChatReply>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}

export async function fetchChatHistory() {
  const data = await requestJson<{ items: ChatHistoryItem[] }>('/api/chat/history')
  return data.items
}

export function askTutoringQuestion(question: string, mode: string, scenario?: string) {
  return requestJson<TutoringReply>('/api/tutoring/ask', {
    method: 'POST',
    body: JSON.stringify({ question, mode, scenario }),
  })
}

export async function fetchTutoringHistory() {
  const data = await requestJson<{ items: TutoringHistoryItem[] }>('/api/tutoring/history')
  return data.items
}

export async function fetchResources(type?: string, q?: string) {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  if (q) params.set('q', q)
  const query = params.toString()
  const data = await requestJson<{ items: ApiResource[] }>(`/api/resources${query ? `?${query}` : ''}`)
  return data.items
}

export async function fetchRecommendedResources() {
  const data = await requestJson<{ items: ApiResource[] }>('/api/resources/recommended')
  return data.items
}

export function fetchLearningPath() {
  return requestJson<LearningPathResponse>('/api/learning-path')
}

export function fetchEvaluation() {
  return requestJson<EvaluationResponse>('/api/evaluation')
}
