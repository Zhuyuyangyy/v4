/* ===================================================================
 * EduMind — 课程内容类型系统
 * 定义课程、知识点、资源、流程图、代码示例等全局类型
 * =================================================================== */

/* ── 枚举类型 ── */

/** 课程领域 */
export type CourseDomain = 'ai' | 'cs' | 'math' | 'electronics'

/** AI 子方向（聚焦深耕） */
export type AISubfield =
  | 'ml'        // 机器学习
  | 'dl'        // 深度学习
  | 'nlp'       // 自然语言处理
  | 'cv'        // 计算机视觉
  | 'rl'        // 强化学习
  | 'llm'       // 大模型应用
  | 'mlops'     // ML 工程

/** 资源类型 */
export type ResourceType = 'doc' | 'mindmap' | 'exercise' | 'video' | 'code' | 'flowchart'

/** 学习场景（场景化辅导） */
export type StudyScenario = 'preview' | 'inclass' | 'homework' | 'exam' | 'project'

/** 难度级别 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

/** 辅导模式（子模式） */
export type TutorSubMode =
  // 预习场景
  | 'concept-overview'
  | 'case-intro'
  // 课中场景
  | 'quick-qa'
  | 'catch-up'
  // 实验场景
  | 'code-tutor'
  | 'debug-help'
  | 'report-guide'
  // 冲刺场景
  | 'review-points'
  | 'problem-types'
  | 'project-guide'

/* ── 核心接口 ── */

/** 知识点 */
export interface Concept {
  id: string
  name: string
  description: string
  difficulty: Difficulty
  /** 前置知识点 ID 列表 */
  prerequisites: string[]
}

/** 流程图阶段 */
export interface FlowStage {
  id: string
  name: string
  description: string
  /** 该阶段的参数（可调节） */
  params?: { key: string; label: string; type: 'number' | 'select'; options?: string[]; default: number | string }[]
  /** 悬停数据预览说明 */
  dataPreview?: string
}

/** 代码示例 */
export interface CodeExample {
  title: string
  description: string
  language: string
  code: string
  /** 预期输出 */
  output?: string
}

/** 资源引用 */
export interface ResourceRef {
  type: ResourceType
  title: string
  url?: string
}

/** 课程主题 */
export interface CourseTopic {
  id: string
  name: string
  description: string
  concepts: Concept[]
  /** 关联资源 */
  resources: ResourceRef[]
  /** 数据处理流程（用于流程图） */
  flowStages?: FlowStage[]
  /** 代码示例（用于代码画板） */
  codeExamples?: CodeExample[]
  /** 预设问题（用于辅导对话） */
  presetQuestions?: { q: string; a: string }[]
  /** 思维导图节点树 */
  mindMap?: MindMapNode[]
}

/** 课程 */
export interface Course {
  id: string
  domain: CourseDomain
  subfield: AISubfield
  name: string
  description: string
  icon: string
  difficulty: Difficulty
  prerequisites: string[]
  topics: CourseTopic[]
  color: string
}

/** 思维导图节点 */
export interface MindMapNode {
  id: string
  label: string
  description?: string
  children?: MindMapNode[]
  /** 关联资源 ID */
  refId?: string
}

/** 场景配置 */
export interface ScenarioConfig {
  key: StudyScenario
  label: string
  icon: string
  description: string
  subModes: { key: TutorSubMode; label: string; desc: string }[]
  color: string
}

/* ── 学习进度类型 ── */

export interface TopicProgress {
  topicId: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  progress: number // 0-100
}
