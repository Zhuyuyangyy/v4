import type { ProfileResult, SurveyAnswers } from '@/composables/useProfileSurvey'

export interface ApiResource {
  id: number
  type: 'doc' | 'mindmap' | 'exercise' | 'video' | 'code'
  title: string
  desc: string
  tags: string[]
  date: string
  color: string
  reads: number
}

export interface ChatResource {
  type: 'doc' | 'mindmap' | 'exercise' | 'video' | 'code'
  title: string
  color?: string
}

export interface ApiSuggestion {
  text: string
  type?: 'weakness' | 'strength' | 'positive' | 'action'
}

export interface ChatReply {
  content: string
  resources?: ChatResource[]
  suggestions?: string[]
}

export interface ChatHistoryItem {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
  resources?: ChatResource[]
  suggestions?: string[]
}

export interface TutoringReply {
  answer: string
  time: string
}

export interface TutoringHistoryItem {
  q: string
  a: string
  time: string
  helpful?: boolean
  scenario: string
  mode: string
}

export interface LearningPathResponse {
  phases: Array<{
    title: string
    period: string
    progress: number
    status: string
    color: string
    nodes: Array<{
      name: string
      progress: number
      duration: string
      resources: number
    }>
  }>
  weeklyGoals: Array<{
    label: string
    progress: number
    target: string
  }>
}

export interface EvaluationResponse {
  generatedAt: string
  stats: Array<{
    label: string
    value: string
    change: string
    color: string
    icon?: string
  }>
  suggestions: ApiSuggestion[]
}

export type ProfileAnalyzeRequest = SurveyAnswers
export type ProfileAnalyzeResponse = ProfileResult
export interface LatestProfileResponse {
  result: ProfileResult | null
}
