/* ===================================================================
 * EduMind — 课程内容类型系统
 * 定义课程、知识点、资源、流程图、代码示例等全局类型
 * 支持 5 大方向 24 门课程
 * =================================================================== */

/* ── 枚举类型 ── */

/** 课程大类方向（5大方向） */
export type CourseCategory =
  | 'programming'   // 一、编程与算法基础
  | 'systems'       // 二、计算机系统
  | 'software'      // 三、软件工程
  | 'ai'            // 四、人工智能方向
  | 'frontier'      // 五、前沿与应用

/** 课程领域（原有，兼容使用） */
export type CourseDomain = 'ai' | 'cs' | 'math' | 'electronics' | 'se' | 'advance'

/** AI 子方向 */
export type AISubfield =
  | 'ml'        // 机器学习
  | 'dl'        // 深度学习
  | 'nlp'       // 自然语言处理
  | 'cv'        // 计算机视觉
  | 'rl'        // 强化学习
  | 'llm'       // 大模型应用
  | 'mlops'     // ML 工程
  | 'ai-intro'  // AI 概论

/** 资源类型 */
export type ResourceType = 'doc' | 'mindmap' | 'exercise' | 'video' | 'code' | 'flowchart'

/** 学习场景 */
export type StudyScenario = 'preview' | 'inclass' | 'homework' | 'exam' | 'project'

/** 难度级别 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

/** 辅导模式 */
export type TutorSubMode =
  | 'concept-overview'
  | 'case-intro'
  | 'quick-qa'
  | 'catch-up'
  | 'code-tutor'
  | 'debug-help'
  | 'report-guide'
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
  prerequisites: string[]
}

/** 流程图阶段 */
export interface FlowStage {
  id: string
  name: string
  description: string
  params?: { key: string; label: string; type: 'number' | 'select'; options?: string[]; default: number | string }[]
  dataPreview?: string
}

/** 代码示例 */
export interface CodeExample {
  title: string
  description: string
  language: string
  code: string
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
  resources: ResourceRef[]
  flowStages?: FlowStage[]
  codeExamples?: CodeExample[]
  presetQuestions?: { q: string; a: string }[]
  mindMap?: MindMapNode[]
}

/** 课程 */
export interface Course {
  id: string
  /** 所属大类方向 */
  category: CourseCategory
  /** 课程序号（1-24） */
  seq: number
  domain: CourseDomain
  subfield?: string
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

/** 大类方向配置 */
export interface CategoryConfig {
  key: CourseCategory
  label: string
  seq: number
  courses: string[] // course id 列表
}

/* ── 学习进度类型 ── */

export interface TopicProgress {
  topicId: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  progress: number
}
