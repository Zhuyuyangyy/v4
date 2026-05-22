import type { Live2DPetConfig } from './live2dPetConfig'

import { defaultAiriLive2DPetConfig } from './live2dPetConfig'

export type Live2DPetPresetId = 'airi_default' | 'airi_compact' | 'airi_focus'

export interface Live2DPetPreset {
  id: Live2DPetPresetId
  name: string
  description: string
  config: Partial<Live2DPetConfig>
}

export const LIVE2D_PET_PRESETS: Record<Live2DPetPresetId, Live2DPetPreset> = {
  airi_default: {
    id: 'airi_default',
    name: 'AIRI Default',
    description: 'Current floating AIRI-style companion preset with the standard stage size and shadow.',
    config: {
      modelUrl: defaultAiriLive2DPetConfig.modelUrl,
      scale: defaultAiriLive2DPetConfig.scale,
      idleMotion: defaultAiriLive2DPetConfig.idleMotion,
      renderScale: defaultAiriLive2DPetConfig.renderScale,
      motionMap: defaultAiriLive2DPetConfig.motionMap,
      shadow: defaultAiriLive2DPetConfig.shadow,
    },
  },
  airi_compact: {
    id: 'airi_compact',
    name: 'AIRI Compact',
    description: 'A smaller right-corner preset that keeps AIRI readable without taking over the viewport.',
    config: {
      modelUrl: defaultAiriLive2DPetConfig.modelUrl,
      scale: 0.86,
      idleMotion: {
        group: 'Idle',
        index: 1,
      },
      renderScale: 1.5,
      motionMap: {
        idle: {
          motionGroup: 'Idle',
          motionIndex: 1,
          loop: true,
        },
        thinking: {
          motionGroup: 'Flick@Body',
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
          minDurationMs: 900,
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
          motionGroup: 'Tap',
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
      shadow: true,
    },
  },
  airi_focus: {
    id: 'airi_focus',
    name: 'AIRI Focus',
    description: 'A calmer study preset with softer staging, slightly steadier scale, and a lighter visual footprint.',
    config: {
      modelUrl: defaultAiriLive2DPetConfig.modelUrl,
      scale: 0.96,
      idleMotion: {
        group: 'Idle',
        index: 2,
      },
      renderScale: 1.75,
      motionMap: {
        idle: {
          motionGroup: 'Idle',
          motionIndex: 2,
          loop: true,
        },
        thinking: {
          motionGroup: 'Idle',
          motionIndex: 1,
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
          motionGroup: 'Flick@Body',
          motionIndex: 0,
          fallbackState: 'idle',
          minDurationMs: 900,
        },
        error: {
          motionGroup: 'Flick',
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
          motionGroup: 'Tap',
          motionIndex: 0,
          fallbackState: 'idle',
          minDurationMs: 700,
        },
        listening: {
          motionGroup: 'Idle',
          motionIndex: 1,
          fallbackState: 'idle',
          loop: true,
          minDurationMs: 700,
        },
      },
      shadow: false,
    },
  },
}

export const DEFAULT_LIVE2D_PET_PRESET_ID: Live2DPetPresetId = 'airi_default'

export function getLive2DPetPresetConfig(presetId: Live2DPetPresetId): Partial<Live2DPetConfig> {
  const preset = LIVE2D_PET_PRESETS[presetId] ?? LIVE2D_PET_PRESETS[DEFAULT_LIVE2D_PET_PRESET_ID]

  return {
    ...preset.config,
    idleMotion: preset.config.idleMotion ? { ...preset.config.idleMotion } : undefined,
    motions: preset.config.motions
      ? {
          ...preset.config.motions,
        }
      : undefined,
    motionMap: preset.config.motionMap
      ? Object.fromEntries(
          Object.entries(preset.config.motionMap).map(([state, rule]) => [
            state,
            rule ? { ...rule } : rule,
          ]),
        )
      : undefined,
  }
}
