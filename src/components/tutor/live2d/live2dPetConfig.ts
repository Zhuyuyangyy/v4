import type { CompanionState } from '@/store'
import type { Live2DPetMotionMap } from './live2dPetMotionMap'

export interface Live2DMotionSelection {
  group: string
  index?: number
}

export interface Live2DPetConfig {
  coreScriptUrl: string
  modelUrl: string
  scale: number
  renderScale: number
  idleMotion?: Live2DMotionSelection
  motions: Partial<Record<CompanionState, Live2DMotionSelection>>
  motionMap: Live2DPetMotionMap
  blink: boolean
  shadow: boolean
}

export const defaultAiriLive2DPetConfig: Live2DPetConfig = {
  coreScriptUrl: '/desktop-pet/live2d/live2dcubismcore.min.js',
  modelUrl: '/desktop-pet/live2d/models/hiyori/Hiyori.model3.json',
  scale: 1.18,
  renderScale: 3,
  idleMotion: {
    group: 'Idle',
    index: 0,
  },
  motions: {
    idle: {
      group: 'Idle',
      index: 0,
    },
    thinking: {
      group: 'Idle',
      index: 3,
    },
    typing: {
      group: 'Idle',
      index: 4,
    },
    cheer: {
      group: 'TapBody',
      index: 0,
    },
    error: {
      group: 'Idle',
      index: 5,
    },
  },
  motionMap: {
    idle: {
      motionGroup: 'Idle',
      motionIndex: 0,
      loop: true,
    },
    thinking: {
      motionGroup: 'Idle',
      motionIndex: 3,
      fallbackState: 'idle',
      minDurationMs: 1600,
    },
    typing: {
      motionGroup: 'Idle',
      motionIndex: 4,
      fallbackState: 'idle',
      loop: true,
    },
    cheer: {
      motionGroup: 'TapBody',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 1000,
    },
    error: {
      motionGroup: 'Idle',
      motionIndex: 5,
      fallbackState: 'idle',
      minDurationMs: 1200,
    },
    sleep: {
      motionGroup: 'Idle',
      motionIndex: 6,
      fallbackState: 'idle',
      loop: true,
    },
    speaking: {
      motionGroup: 'Idle',
      motionIndex: 7,
      fallbackState: 'idle',
      minDurationMs: 800,
    },
    listening: {
      motionGroup: 'Idle',
      motionIndex: 8,
      fallbackState: 'idle',
      minDurationMs: 800,
    },
  },
  blink: true,
  shadow: true,
}
