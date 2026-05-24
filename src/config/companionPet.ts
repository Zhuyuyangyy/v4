export type DesktopPetProfile = 'coding-companion' | 'debug-duck'
export type DesktopPetMotion = 'calm' | 'balanced' | 'lively'
export type CompanionMessageTone = 'status' | 'success' | 'error' | 'tip'

export interface DesktopPetProfileMeta {
  id: DesktopPetProfile
  name: string
  shortName: string
  description: string
  helperTitle: string
}

export const desktopPetProfiles: Record<DesktopPetProfile, DesktopPetProfileMeta> = {
  'coding-companion': {
    id: 'coding-companion',
    name: 'CodeMo 学伴',
    shortName: 'CodeMo',
    description: '通用计算机学习陪伴体，适合代码练习、知识讲解和低打扰反馈。',
    helperTitle: 'AI 编程学习陪伴体',
  },
  'debug-duck': {
    id: 'debug-duck',
    name: 'Debug 鸭',
    shortName: 'Debug 鸭',
    description: '借鉴橡皮鸭调试法，偏重代码诊断、错误提示和闯关鼓励。',
    helperTitle: '编程调试小搭子',
  },
}

export const desktopPetMotionOptions: Array<{ id: DesktopPetMotion; label: string; description: string }> = [
  {
    id: 'calm',
    label: '安静',
    description: '待机时尽量保持稳定，只在关键学习事件里响应。',
  },
  {
    id: 'balanced',
    label: '平衡',
    description: '保留轻微注视和状态变化，适合作为默认模式。',
  },
  {
    id: 'lively',
    label: '活跃',
    description: '会更频繁地展示动作和表情，存在感更强。',
  },
]
