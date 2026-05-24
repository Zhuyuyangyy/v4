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
  modelUrl: '/desktop-pet/live2d/models/hiyori_free_zh/hiyori_free_t08.model3.json',
  scale: 1.04,
  renderScale: 2,
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
      index: 0,
    },
    typing: {
      group: 'Idle',
      index: 0,
    },
    cheer: {
      group: 'Tap@Body',
      index: 0,
    },
    error: {
      group: 'FlickDown',
      index: 0,
    },
  },
  motionMap: {
    idle: {
      motionGroup: 'Idle',
      motionIndex: 0,
      loop: true,
    },
    thinking: {
      motionGroup: 'Tap',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 1500,
    },
    typing: {
      motionGroup: 'Idle',
      motionIndex: 1,
      fallbackState: 'idle',
      loop: true,
    },
    cheer: {
      motionGroup: 'Tap@Body',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 1000,
    },
    error: {
      motionGroup: 'FlickDown',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 1200,
    },
    sleep: {
      motionGroup: 'Idle',
      motionIndex: 2,
      fallbackState: 'idle',
      loop: true,
    },
    speaking: {
      motionGroup: 'Tap@Body',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 700,
    },
    listening: {
      motionGroup: 'Flick@Body',
      motionIndex: 0,
      fallbackState: 'idle',
      minDurationMs: 700,
    },
  },
  blink: true,
  shadow: true,
}
