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
  type: string
  title: string
  color?: string
}

export interface ChatReply {
  content: string
  resources?: ChatResource[]
  suggestions?: string[]
}

export interface TutoringReply {
  answer: string
  time: string
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
  }>
  suggestions: string[]
}

export type ProfileAnalyzeRequest = SurveyAnswers
export type ProfileAnalyzeResponse = ProfileResult
