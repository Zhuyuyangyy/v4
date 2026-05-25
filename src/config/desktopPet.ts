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
    label: '待机',
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
    label: '眨眼',
    caption: '随机眨眼，短暂动画后回到待机。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 3,
    columns: 3,
    rows: 1,
    fps: 8,
    loop: false,
    available: true,
  },
  walk: {
    state: 'walk',
    label: '巡逻',
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
    label: '快跑',
    caption: '快速响应，加速巡逻。',
    src: '/desktop-pet/peachu-walk-transparent.png',
    frames: 8,
    columns: 4,
    rows: 2,
    fps: 10,
    loop: true,
    available: true,
  },
  sit: {
    state: 'sit',
    label: '静坐',
    caption: '长时间空闲安静坐下。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 4,
    columns: 2,
    rows: 2,
    fps: 2,
    loop: true,
    available: true,
  },
  sleep: {
    state: 'sleep',
    label: '休眠',
    caption: '超长空闲进入休眠。',
    src: '/desktop-pet/peachu-idle-transparent.png',
    frames: 4,
    columns: 2,
    rows: 2,
    fps: 1,
    loop: true,
    available: true,
  },
  wake: {
    state: 'wake',
    label: '苏醒',
    caption: '收到新问题后苏醒。',
    src: '/desktop-pet/peachu-thinking-transparent.png',
    frames: 5,
    columns: 5,
    rows: 1,
    fps: 8,
    loop: false,
    available: true,
  },
  thinking: {
    state: 'thinking',
    label: '思考',
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
    label: '打字',
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
    label: '庆祝',
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
    label: '出错',
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
