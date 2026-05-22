import type { CompanionState } from '@/store'

export type CompanionPetState =
  | 'idle'
  | 'thinking'
  | 'typing'
  | 'cheer'
  | 'error'
  | 'sleep'
  | 'speaking'
  | 'listening'

export interface Live2DPetMotionRule {
  state: CompanionPetState
  motionGroup?: string
  motionIndex?: number
  fallbackState?: CompanionPetState
  loop: boolean
  priority: number
  minDurationMs: number
}

export interface Live2DPetMotionRuleConfig {
  motionGroup?: string
  motionIndex?: number
  fallbackState?: CompanionPetState
  loop?: boolean
  priority?: number
  minDurationMs?: number
}

export type Live2DPetMotionMap = Partial<Record<CompanionPetState, Live2DPetMotionRuleConfig>>

export const COMPANION_PET_STATES: CompanionPetState[] = [
  'idle',
  'thinking',
  'typing',
  'cheer',
  'error',
  'sleep',
  'speaking',
  'listening',
]

const DEFAULT_PRIORITY_BY_STATE: Record<CompanionPetState, number> = {
  idle: 0,
  sleep: 1,
  listening: 2,
  speaking: 2,
  thinking: 2,
  typing: 2,
  cheer: 3,
  error: 4,
}

const DEFAULT_MIN_DURATION_BY_STATE: Partial<Record<CompanionPetState, number>> = {
  thinking: 800,
  cheer: 1000,
  error: 1000,
  speaking: 700,
  listening: 700,
}

const DEFAULT_FALLBACK_BY_STATE: Partial<Record<CompanionPetState, CompanionPetState>> = {
  thinking: 'idle',
  typing: 'idle',
  cheer: 'idle',
  error: 'idle',
  sleep: 'idle',
  speaking: 'idle',
  listening: 'idle',
}

const LOOPING_STATES = new Set<CompanionPetState>(['idle', 'typing', 'sleep'])

export function normalizeLive2DPetMotionRule(
  state: CompanionPetState,
  rule?: Live2DPetMotionRuleConfig,
): Live2DPetMotionRule {
  return {
    state,
    motionGroup: rule?.motionGroup,
    motionIndex: rule?.motionIndex,
    fallbackState: rule?.fallbackState ?? DEFAULT_FALLBACK_BY_STATE[state],
    loop: rule?.loop ?? LOOPING_STATES.has(state),
    priority: rule?.priority ?? DEFAULT_PRIORITY_BY_STATE[state],
    minDurationMs: Math.max(0, rule?.minDurationMs ?? DEFAULT_MIN_DURATION_BY_STATE[state] ?? 0),
  }
}

export function normalizeLive2DPetMotionMap(
  motionMap?: Live2DPetMotionMap,
): Record<CompanionPetState, Live2DPetMotionRule> {
  return COMPANION_PET_STATES.reduce(
    (result, state) => {
      result[state] = normalizeLive2DPetMotionRule(state, motionMap?.[state])
      return result
    },
    {} as Record<CompanionPetState, Live2DPetMotionRule>,
  )
}

export function resolveLive2DPetMotionRule(
  state: CompanionPetState,
  motionMap?: Live2DPetMotionMap,
): Live2DPetMotionRule {
  const normalized = normalizeLive2DPetMotionMap(motionMap)

  function visit(nextState: CompanionPetState, visited: Set<CompanionPetState>): Live2DPetMotionRule {
    if (visited.has(nextState)) {
      return normalized.idle
    }

    visited.add(nextState)
    const rule = normalized[nextState]

    if (rule.motionGroup) {
      return rule
    }

    if (rule.fallbackState) {
      return visit(rule.fallbackState, visited)
    }

    if (nextState !== 'idle') {
      return visit('idle', visited)
    }

    return rule
  }

  return visit(state, new Set<CompanionPetState>())
}

export function mapCompanionStateToPetState(state: CompanionState): CompanionPetState {
  return state
}
