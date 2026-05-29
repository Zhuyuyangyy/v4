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
  reason?: string
  profileTag?: string
  pathStage?: string
  format?: string
  estTime?: string
  recommendEvidence?: {
    profileSource: string
    evaluationReason: string
    pathStage: string
    formatReason: string
  }
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

export interface MultimodalContent {
  type: 'text' | 'image'
  text?: string
  imageData?: string
  imageType?: string
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
  multimodalContents?: MultimodalContent[]
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
  multimodalContents?: MultimodalContent[]
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

export interface AgentResult {
  agentName: string
  inputSummary: string
  outputSummary: string
  input: unknown
  output: unknown
  confidence: number
  evidence: string[]
  durationMs: number
  status: string
  fallbackUsed: boolean
}

export interface TraceAgentResult {
  agentName: string
  inputSummary: string
  outputSummary: string
  confidence: number
  evidence: string[]
  durationMs: number
  fallbackUsed: boolean
}

export interface TraceRecord {
  requestId: string
  timestamp: string
  agents: string[]
  inputsSummary: string
  outputsSummary: string
  evidence: string[]
  riskFlags: string[]
  fallbackUsed: boolean
  durationMs: number
  agentResults: TraceAgentResult[]
}

export interface ResourceGenerateRequest {
  profile?: ProfileResult
  weaknesses?: Array<{ tag: string; count: number }>
  topic: string
  resourceType: string
}

export interface ResourcePackage {
  concept: string
  example: { title: string; description: string; steps: string[] }
  exercise: { title: string; questions: Array<{ question: string; options: string[]; correctAnswer: string; explanation: string }> }
  errorTip: string
  recommendReason: string
  profileEvidence: string
}

export interface ResourceGenerateResponse {
  resourcePackage: ResourcePackage
  agentResults: AgentResult[]
  trace: TraceRecord
}

export interface EvidenceTracesResponse {
  items: TraceRecord[]
  total: number
}

export interface EvidenceSummaryResponse {
  totalTraces: number
  fallbackCount: number
  fallbackRate: number
  riskFlagCount: number
  riskRate: number
  avgDurationMs: number
  agentCounts: Record<string, number>
  lastTraceAt: string | null
  llmAvailable: boolean
}

export interface PathReplanResponse {
  path: LearningPathResponse & { replanReason?: string }
  evaluation: unknown
  agentResults: AgentResult[]
  trace: TraceRecord
}

export interface TutorAgentResponse {
  answer: string
  agentResults: AgentResult[]
  trace: TraceRecord
}

export interface FullEvaluationResponse {
  evaluation: unknown
  reflection: unknown
  agentResults: AgentResult[]
  trace: TraceRecord
}

export interface FullRunRequest {
  answers?: unknown
  topic?: string
  resourceType?: string
  question?: string
  mode?: string
}

export interface FullRunResponse {
  workflowId: string
  agentResults: AgentResult[]
  resourcePackage: ResourcePackage
  tutoringAnswer: string
  evaluation: unknown
  path: LearningPathResponse & { replanReason?: string }
  reflection: unknown
  profile: ProfileResult
  trace: TraceRecord
}
