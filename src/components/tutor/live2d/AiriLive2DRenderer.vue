<script setup lang="ts">
import type { Application } from '@pixi/app'
import type { CSSProperties } from 'vue'
import type { Live2DPetConfig, Live2DMotionSelection } from './live2dPetConfig'
import type { CompanionPetState, Live2DPetMotionRule } from './live2dPetMotionMap'

import { Application as PixiApplication } from '@pixi/app'
import { extensions } from '@pixi/extensions'
import { Ticker, TickerPlugin } from '@pixi/ticker'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ensureCubismCore } from './live2dCore'
import { defaultAiriLive2DPetConfig } from './live2dPetConfig'
import { normalizeLive2DPetMotionMap, resolveLive2DPetMotionRule } from './live2dPetMotionMap'

const props = withDefaults(defineProps<{
  state: CompanionPetState
  width: number
  height: number
  focusAt: { x: number, y: number }
  disableFocus?: boolean
  facing?: 1 | -1
  config?: Partial<Live2DPetConfig>
}>(), {
  disableFocus: false,
  facing: 1,
  config: () => ({}),
})

const resolvedConfig = computed<Live2DPetConfig>(() => ({
  ...defaultAiriLive2DPetConfig,
  ...props.config,
  motions: {
    ...defaultAiriLive2DPetConfig.motions,
    ...props.config?.motions,
  },
  motionMap: {
    ...defaultAiriLive2DPetConfig.motionMap,
    ...props.config?.motionMap,
  },
}))

const emit = defineEmits<{
  (e: 'loading'): void
  (e: 'ready'): void
  (e: 'error', error: Error): void
}>()

type Cubism4Module = typeof import('pixi-live2d-display/cubism4')
type Cubism4Model = InstanceType<Cubism4Module['Live2DModel']>

export interface Live2DMotionCapability {
  groups: Record<string, number>
  groupNames: string[]
  totalMotions: number
}

export interface Live2DMotionHitState {
  source: 'state' | 'manual'
  requestedState: CompanionPetState
  requestedMotionGroup: string | null
  requestedMotionIndex: number | null
  hit: boolean
  fallbackUsed: boolean
  fallbackReason: string | null
  finalMotionKey: string
}

let tickerPluginRegistered = false
let tickerClassRegistered = false
let loadSequence = 0
let isUnmounted = false
let live2dModulePromise: Promise<Cubism4Module> | null = null
let motionSequence = 0
let activeRuleStartedAt = 0

const containerRef = ref<HTMLDivElement>()
const appRef = ref<Application>()
const canvasRef = ref<HTMLCanvasElement>()
const modelRef = ref<Cubism4Model>()
const modelBaseSizeRef = ref<{ width: number, height: number }>()
const isReady = ref(false)
const currentMotionKey = ref('')
const activeRuleRef = ref<Live2DPetMotionRule>()
const motionCapabilityRef = ref<Live2DMotionCapability>({
  groups: {},
  groupNames: [],
  totalMotions: 0,
})
const motionHitStateRef = ref<Live2DMotionHitState>({
  source: 'state',
  requestedState: 'idle',
  requestedMotionGroup: null,
  requestedMotionIndex: null,
  hit: false,
  fallbackUsed: false,
  fallbackReason: null,
  finalMotionKey: '',
})

const stateClass = computed(() => `state-${props.state}`)
const normalizedMotionMap = computed(() => normalizeLive2DPetMotionMap(resolvedConfig.value.motionMap))
const shellStyle = computed<CSSProperties>(() => ({
  transform: `scaleX(${props.facing})`,
}))
const canvasStyle = computed<CSSProperties>(() => ({
  filter: resolvedConfig.value.shadow ? 'drop-shadow(0 14px 26px rgba(34, 169, 255, 0.18))' : 'none',
}))

async function loadLive2DModule() {
  if (!live2dModulePromise) {
    live2dModulePromise = import('pixi-live2d-display/cubism4')
  }

  return live2dModulePromise
}

function registerPixiPlugins(module: Cubism4Module) {
  if (!tickerClassRegistered) {
    module.Live2DModel.registerTicker(Ticker)
    tickerClassRegistered = true
  }

  if (!tickerPluginRegistered) {
    extensions.add(TickerPlugin)
    tickerPluginRegistered = true
  }
}

function resolveMaxFps(limit: number) {
  if (!limit || limit <= 0) {
    return 0
  }

  return Math.max(1, Math.round(limit))
}

async function probeMotionCapability(modelUrl: string) {
  try {
    const response = await fetch(modelUrl, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error(`Failed to load model settings: ${response.status}`)
    }

    const payload = await response.json() as {
      FileReferences?: {
        Motions?: Record<string, Array<unknown>>
      }
    }
    const motions = payload.FileReferences?.Motions ?? {}
    const groups = Object.fromEntries(
      Object.entries(motions).map(([groupName, entries]) => [groupName, Array.isArray(entries) ? entries.length : 0]),
    )
    const groupNames = Object.keys(groups)
    const totalMotions = Object.values(groups).reduce((sum, count) => sum + count, 0)

    motionCapabilityRef.value = {
      groups,
      groupNames,
      totalMotions,
    }
  } catch {
    motionCapabilityRef.value = {
      groups: {},
      groupNames: [],
      totalMotions: 0,
    }
  }
}

async function initRenderer() {
  if (!containerRef.value) return

  const sequence = ++loadSequence
  motionSequence += 1
  isReady.value = false
  currentMotionKey.value = ''
  activeRuleRef.value = undefined
  activeRuleStartedAt = 0
  emit('loading')
  destroyRenderer()

  try {
    await ensureCubismCore(resolvedConfig.value.coreScriptUrl)
    if (isUnmounted || sequence !== loadSequence) return

    const live2dModule = await loadLive2DModule()
    if (isUnmounted || sequence !== loadSequence) return

    registerPixiPlugins(live2dModule)
    await probeMotionCapability(resolvedConfig.value.modelUrl)
    if (isUnmounted || sequence !== loadSequence) return

    const app = new PixiApplication({
      width: Math.max(1, Math.round(props.width * resolvedConfig.value.renderScale)),
      height: Math.max(1, Math.round(props.height * resolvedConfig.value.renderScale)),
      backgroundAlpha: 0,
      preserveDrawingBuffer: true,
      autoDensity: false,
      resolution: 1,
    })

    app.ticker.maxFPS = resolveMaxFps(0)
    app.stage.scale.set(resolvedConfig.value.renderScale)

    appRef.value = app
    canvasRef.value = app.view as HTMLCanvasElement
    canvasRef.value.style.width = '100%'
    canvasRef.value.style.height = '100%'
    canvasRef.value.style.display = 'block'
    containerRef.value.appendChild(canvasRef.value)

    const model = await live2dModule.Live2DModel.from(resolvedConfig.value.modelUrl, {
      autoInteract: false,
    })

    if (isUnmounted || sequence !== loadSequence) {
      model.destroy()
      app.destroy(true)
      return
    }

    modelRef.value = model
    app.stage.addChild(model)
    modelBaseSizeRef.value = readModelBaseSize(model)
    positionModel()
    syncFocus(true)
    await syncMotion(true)
    isReady.value = true
    emit('ready')
  } catch (error) {
    destroyRenderer()
    const normalized = error instanceof Error ? error : new Error(String(error))
    console.warn('[DesktopPetLive2D] renderer fallback:', normalized)
    emit('error', normalized)
  }
}

function destroyRenderer() {
  motionSequence += 1

  if (modelRef.value) {
    try {
      modelRef.value.destroy()
    } catch {
      // Ignore Live2D disposal errors during fallback teardown.
    }
    modelRef.value = undefined
  }

  if (appRef.value) {
    try {
      appRef.value.destroy(true)
    } catch {
      // Ignore Pixi disposal errors during renderer shutdown.
    }
    appRef.value = undefined
  }

  if (containerRef.value) {
    containerRef.value.innerHTML = ''
  }

  canvasRef.value = undefined
  modelBaseSizeRef.value = undefined
  isReady.value = false
  currentMotionKey.value = ''
  activeRuleRef.value = undefined
  activeRuleStartedAt = 0
  motionCapabilityRef.value = {
    groups: {},
    groupNames: [],
    totalMotions: 0,
  }
  motionHitStateRef.value = {
    source: 'state',
    requestedState: 'idle',
    requestedMotionGroup: null,
    requestedMotionIndex: null,
    hit: false,
    fallbackUsed: false,
    fallbackReason: null,
    finalMotionKey: '',
  }
}

function readModelBaseSize(model: Cubism4Model) {
  const bounds = model.getLocalBounds()

  return {
    width: Math.max(1, Math.abs(bounds.width)),
    height: Math.max(1, Math.abs(bounds.height)),
  }
}

function positionModel() {
  if (!modelRef.value) return

  const model = modelRef.value
  const baseSize = modelBaseSizeRef.value ?? readModelBaseSize(model)
  const baseWidth = baseSize.width
  const baseHeight = baseSize.height
  const fitScale = Math.min((props.width * 0.82) / baseWidth, (props.height * 0.92) / baseHeight)
  const nextScale = Math.max(0.0001, fitScale * resolvedConfig.value.scale)

  model.anchor.set(0.5, 1)
  model.scale.set(nextScale, nextScale)
  model.x = props.width / 2
  model.y = props.height * 0.98
}

function resolveLegacyStateMotion(state: CompanionPetState) {
  const legacyMotions = resolvedConfig.value.motions
  return legacyMotions[state as keyof typeof legacyMotions] ?? resolvedConfig.value.idleMotion
}

function resolveStateRule(state: CompanionPetState) {
  return resolveLive2DPetMotionRule(state, resolvedConfig.value.motionMap)
}

function createMotionKey(rule: Live2DPetMotionRule) {
  return `${rule.motionGroup ?? 'fallback'}:${rule.motionIndex ?? 'random'}:${rule.loop ? 'loop' : 'once'}`
}

function resolveMotionSelection(rule: Live2DPetMotionRule): Live2DMotionSelection | undefined {
  if (rule.motionGroup) {
    return {
      group: rule.motionGroup,
      index: rule.motionIndex,
    }
  }

  return resolveLegacyStateMotion(rule.state)
}

async function startMotion(selection?: Live2DMotionSelection) {
  if (!modelRef.value || !selection) return false

  try {
    const live2dModule = await loadLive2DModule()
    return await modelRef.value.motion(selection.group, selection.index, live2dModule.MotionPriority.FORCE)
  } catch {
    return false
  }
}

function getCapabilityCount(groupName?: string) {
  if (!groupName) {
    return 0
  }

  return motionCapabilityRef.value.groups[groupName] ?? 0
}

function resolveSelectionFailureReason(selection?: Live2DMotionSelection) {
  if (!selection) {
    return 'missing-motion-selection'
  }

  const availableCount = getCapabilityCount(selection.group)
  if (availableCount <= 0) {
    return 'motion-group-missing'
  }

  const requestedIndex = selection.index ?? 0
  if (requestedIndex < 0 || requestedIndex >= availableCount) {
    return 'motion-index-out-of-range'
  }

  return 'motion-api-rejected'
}

function updateMotionHitState(nextState: Live2DMotionHitState) {
  motionHitStateRef.value = nextState
}

function commitActiveRule(rule: Live2DPetMotionRule, motionKey: string) {
  activeRuleRef.value = rule
  activeRuleStartedAt = Date.now()
  currentMotionKey.value = motionKey
}

async function playRule(rule: Live2DPetMotionRule, requestId: number) {
  const selection = resolveMotionSelection(rule)
  const motionKey = createMotionKey(rule)
  const requestedMotionGroup = selection?.group ?? null
  const requestedMotionIndex = selection?.index ?? null

  if (selection && currentMotionKey.value === motionKey) {
    commitActiveRule(rule, motionKey)
    updateMotionHitState({
      source: 'state',
      requestedState: rule.state,
      requestedMotionGroup,
      requestedMotionIndex,
      hit: true,
      fallbackUsed: false,
      fallbackReason: null,
      finalMotionKey: motionKey,
    })
    return
  }

  let started = false
  let requestedFailureReason: string | null = null
  if (selection) {
    started = await startMotion(selection)
    if (requestId !== motionSequence || isUnmounted) {
      return
    }
    if (!started) {
      requestedFailureReason = resolveSelectionFailureReason(selection)
    }
  } else {
    requestedFailureReason = resolveSelectionFailureReason(selection)
  }

  if (started) {
    commitActiveRule(rule, motionKey)
    updateMotionHitState({
      source: 'state',
      requestedState: rule.state,
      requestedMotionGroup,
      requestedMotionIndex,
      hit: true,
      fallbackUsed: false,
      fallbackReason: null,
      finalMotionKey: motionKey,
    })
    return
  }

  if (rule.state !== 'idle') {
    const fallbackRule = resolveStateRule(rule.fallbackState ?? 'idle')
    const fallbackSelection = resolveMotionSelection(fallbackRule)
    const fallbackMotionKey = createMotionKey(fallbackRule)

    if (fallbackSelection && currentMotionKey.value === fallbackMotionKey) {
      commitActiveRule(fallbackRule, fallbackMotionKey)
      updateMotionHitState({
        source: 'state',
        requestedState: rule.state,
        requestedMotionGroup,
        requestedMotionIndex,
        hit: false,
        fallbackUsed: true,
        fallbackReason: requestedFailureReason,
        finalMotionKey: fallbackMotionKey,
      })
      return
    }

    const fallbackStarted = fallbackSelection ? await startMotion(fallbackSelection) : false
    if (requestId !== motionSequence || isUnmounted) {
      return
    }

    if (fallbackStarted) {
      commitActiveRule(fallbackRule, fallbackMotionKey)
      updateMotionHitState({
        source: 'state',
        requestedState: rule.state,
        requestedMotionGroup,
        requestedMotionIndex,
        hit: false,
        fallbackUsed: true,
        fallbackReason: requestedFailureReason,
        finalMotionKey: fallbackMotionKey,
      })
      return
    }
  }

  commitActiveRule(rule, `${rule.state}:visual-only`)
  updateMotionHitState({
    source: 'state',
    requestedState: rule.state,
    requestedMotionGroup,
    requestedMotionIndex,
    hit: false,
    fallbackUsed: Boolean(rule.fallbackState),
    fallbackReason: requestedFailureReason ?? 'fallback-motion-unavailable',
    finalMotionKey: `${rule.state}:visual-only`,
  })
}

async function syncMotion(force = false, requestedState = props.state) {
  if (!modelRef.value) return

  const nextRule = resolveStateRule(requestedState)
  const nextKey = createMotionKey(nextRule)

  if (!force && currentMotionKey.value === nextKey) {
    activeRuleRef.value = nextRule
    return
  }

  const requestId = ++motionSequence
  await playRule(nextRule, requestId)
}

function syncFocus(instant = false) {
  if (!modelRef.value || props.disableFocus) return

  modelRef.value.focus(props.focusAt.x, props.focusAt.y, instant)
}

watch(
  () => props.state,
  async () => {
    await syncMotion()
  },
)

watch(
  () => JSON.stringify({
    motionMap: normalizedMotionMap.value,
    idleMotion: resolvedConfig.value.idleMotion ?? null,
    motions: resolvedConfig.value.motions,
  }),
  async () => {
    await syncMotion(true)
  },
)

watch(
  () => [props.width, props.height, resolvedConfig.value.scale, resolvedConfig.value.renderScale] as const,
  () => {
    if (appRef.value) {
      appRef.value.renderer.resize(
        Math.max(1, Math.round(props.width * resolvedConfig.value.renderScale)),
        Math.max(1, Math.round(props.height * resolvedConfig.value.renderScale)),
      )
      appRef.value.stage.scale.set(resolvedConfig.value.renderScale)
    }
    positionModel()
  },
)

watch(
  () => [props.focusAt.x, props.focusAt.y, props.disableFocus] as const,
  () => {
    syncFocus()
  },
)

watch(
  () => resolvedConfig.value.modelUrl,
  async () => {
    await initRenderer()
  },
)

onMounted(async () => {
  await initRenderer()
})

onBeforeUnmount(() => {
  isUnmounted = true
  loadSequence += 1
  destroyRenderer()
})

defineExpose({
  canvasElement: () => canvasRef.value,
  isLive2DReady: () => isReady.value,
  reload: initRenderer,
  getMotionCapability: () => ({
    ...motionCapabilityRef.value,
    groups: { ...motionCapabilityRef.value.groups },
    groupNames: [...motionCapabilityRef.value.groupNames],
  }),
  getMotionHitState: () => ({
    ...motionHitStateRef.value,
  }),
  getMotionDebug: () => ({
    currentMotionKey: currentMotionKey.value,
    activeRule: activeRuleRef.value ? { ...activeRuleRef.value } : null,
    activeElapsedMs: activeRuleStartedAt > 0 ? Math.max(0, Date.now() - activeRuleStartedAt) : 0,
    hasDeferredSync: false,
    hasAutoFallback: false,
  }),
  testMotion: async (groupName: string, index = 0) => {
    const selection = {
      group: groupName,
      index,
    }
    const manualMotionKey = `${groupName}:${index}:manual`
    const started = await startMotion(selection)
    const fallbackReason = started ? null : resolveSelectionFailureReason(selection)

    if (started) {
      currentMotionKey.value = manualMotionKey
      activeRuleStartedAt = Date.now()
    }

    updateMotionHitState({
      source: 'manual',
      requestedState: props.state,
      requestedMotionGroup: groupName,
      requestedMotionIndex: index,
      hit: started,
      fallbackUsed: false,
      fallbackReason,
      finalMotionKey: started ? manualMotionKey : `${groupName}:${index}:manual-miss`,
    })

    return started
  },
  setState: async (state: CompanionPetState) => {
    if (state === props.state) {
      await syncMotion(true)
      return
    }

    await syncMotion(true, state)
  },
})
</script>

<template>
  <div class="airi-live2d-renderer" :class="[stateClass, { ready: isReady }]" :style="shellStyle">
    <div ref="containerRef" class="airi-live2d-canvas" :style="canvasStyle" />
  </div>
</template>

<style scoped>
.airi-live2d-renderer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-origin: center bottom;
}

.airi-live2d-canvas {
  width: 100%;
  height: 100%;
  transform-origin: center bottom;
  transition:
    filter 180ms ease,
    transform 180ms ease,
    opacity 180ms ease;
}

.airi-live2d-renderer:not(.ready) .airi-live2d-canvas {
  opacity: 0;
}

.airi-live2d-renderer.state-thinking .airi-live2d-canvas {
  transform: translateY(-1px);
  filter: drop-shadow(0 14px 26px rgba(255, 193, 92, 0.2));
}

.airi-live2d-renderer.state-typing .airi-live2d-canvas {
  animation: pet-typing-pulse 0.9s ease-in-out infinite;
}

.airi-live2d-renderer.state-cheer .airi-live2d-canvas {
  animation: pet-cheer-pop 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.airi-live2d-renderer.state-error .airi-live2d-canvas {
  animation: pet-error-wobble 0.48s ease;
  filter: drop-shadow(0 14px 24px rgba(255, 110, 138, 0.22));
}

@keyframes pet-typing-pulse {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-2px);
  }
}

@keyframes pet-cheer-pop {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  40% {
    transform: translateY(-6px) scale(1.03);
  }
}

@keyframes pet-error-wobble {
  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-2px);
  }

  40% {
    transform: translateX(2px);
  }

  60% {
    transform: translateX(-1px);
  }

  80% {
    transform: translateX(1px);
  }
}
</style>
