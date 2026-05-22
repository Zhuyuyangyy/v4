export type DesktopPetState =
  | 'idle'
  | 'blink'
  | 'walk'
  | 'run'
  | 'sit'
  | 'sleep'
  | 'wake'
  | 'thinking'
  | 'typing'
  | 'cheer'
  | 'error'

export interface DesktopPetAnimation {
  state: DesktopPetState
  label: string
  caption: string
  src: string
  frames: number
  columns: number
  rows: number
  fps: number
  loop: boolean
  available: boolean
  fallbackTo?: DesktopPetState
}

export const desktopPetAnimations: Record<DesktopPetState, DesktopPetAnimation> = {
  idle: {
    state: 'idle',
    label: 'Idle',
    caption: '待机陪伴，轻呼吸和眨眼。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 12,
    columns: 4,
    rows: 3,
    fps: 4,
    loop: true,
    available: true,
  },
  blink: {
    state: 'blink',
    label: 'Blink',
    caption: '随机眨眼，用待机序列回退。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 12,
    columns: 4,
    rows: 3,
    fps: 7,
    loop: false,
    available: false,
    fallbackTo: 'idle',
  },
  walk: {
    state: 'walk',
    label: 'Walk',
    caption: '在面板里巡逻，保持生命感。',
    src: '/desktop-pet/peachu-walk-transparent.png',
    frames: 8,
    columns: 4,
    rows: 2,
    fps: 6,
    loop: true,
    available: true,
  },
  run: {
    state: 'run',
    label: 'Run',
    caption: '快速响应，当前先复用 walk。',
    src: '/desktop-pet/peachu-walk-transparent.png',
    frames: 8,
    columns: 4,
    rows: 2,
    fps: 8,
    loop: true,
    available: false,
    fallbackTo: 'walk',
  },
  sit: {
    state: 'sit',
    label: 'Sit',
    caption: '长时间空闲坐下，当前先复用 idle。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 12,
    columns: 4,
    rows: 3,
    fps: 5,
    loop: true,
    available: false,
    fallbackTo: 'idle',
  },
  sleep: {
    state: 'sleep',
    label: 'Sleep',
    caption: '超长空闲进入休眠，当前先复用 idle。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 12,
    columns: 4,
    rows: 3,
    fps: 4,
    loop: true,
    available: false,
    fallbackTo: 'idle',
  },
  wake: {
    state: 'wake',
    label: 'Wake',
    caption: '收到新问题后苏醒，当前先复用 thinking。',
    src: '/desktop-pet/peachu-thinking-transparent.png',
    frames: 10,
    columns: 5,
    rows: 2,
    fps: 7,
    loop: false,
    available: false,
    fallbackTo: 'thinking',
  },
  thinking: {
    state: 'thinking',
    label: 'Thinking',
    caption: '收到问题后先思考，再转入打字。',
    src: '/desktop-pet/peachu-thinking-transparent.png',
    frames: 10,
    columns: 5,
    rows: 2,
    fps: 5,
    loop: false,
    available: true,
  },
  typing: {
    state: 'typing',
    label: 'Typing',
    caption: '正在生成回答，循环打字。',
    src: '/desktop-pet/peachu-typing-transparent.png',
    frames: 12,
    columns: 4,
    rows: 3,
    fps: 7,
    loop: true,
    available: true,
  },
  cheer: {
    state: 'cheer',
    label: 'Cheer',
    caption: '回答完成，庆祝一下。',
    src: '/desktop-pet/peachu-cheer-transparent.png',
    frames: 16,
    columns: 4,
    rows: 4,
    fps: 8,
    loop: false,
    available: true,
  },
  error: {
    state: 'error',
    label: 'Error',
    caption: '请求失败时进入委屈修 bug 模式。',
    src: '/desktop-pet/peachu-error-transparent.png',
    frames: 14,
    columns: 5,
    rows: 3,
    fps: 7,
    loop: false,
    available: true,
  },
}

export function resolveDesktopPetAnimation(state: DesktopPetState): DesktopPetAnimation {
  const animation = desktopPetAnimations[state]

  if (animation.available || !animation.fallbackTo) {
    return animation
  }

  return resolveDesktopPetAnimation(animation.fallbackTo)
}

export function getDesktopPetDuration(state: DesktopPetState) {
  const animation = resolveDesktopPetAnimation(state)
  return Math.round((animation.frames / animation.fps) * 1000)
}
