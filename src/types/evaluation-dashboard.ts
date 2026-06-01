export type EvaluationStage = 0 | 1 | 2
export type FlowStatus = 'idle' | 'running' | 'completed' | 'remedy'

export interface ProfileMetric {
  key: string
  label: string
  value: number
  previousValue?: number
}

export interface WeaknessNode {
  id: string
  label: string
  severity: 'low' | 'medium' | 'high'
  reason: string
  impact: string
  action: string
}

export interface EvaluationEvidence {
  id: string
  label: string
  value: string
  detail: string
  tone: 'cyan' | 'purple' | 'emerald' | 'pink'
}

export interface PathStep {
  id: string
  label: string
  type: 'original' | 'remedy' | 'recommended'
}

export interface TimelineItem {
  stage: EvaluationStage
  title: string
  trigger: string
  evidence: string
  updatedFields: string
  delta: string
  pathImpact: string
}
