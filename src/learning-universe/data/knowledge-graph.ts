import type { KnowledgeNode, GalaxyCluster, StarSystemInfo } from '../types'

/**
 * Curriculum data for the EduMind 3D universe.
 * 24 courses across 5 categories, organized as a single galaxy cluster.
 */

// ── Star Systems (5 categories) ───────────────────────────────

export const starSystems: StarSystemInfo[] = [
  { id: 'sys_prog_basics', name: '编程与算法基础', galaxyId: 'gal_main' },
  { id: 'sys_computer',     name: '计算机系统',     galaxyId: 'gal_main' },
  { id: 'sys_software',    name: '软件工程',       galaxyId: 'gal_main' },
  { id: 'sys_ai',          name: '人工智能方向',    galaxyId: 'gal_main' },
  { id: 'sys_frontier',     name: '前沿与应用',     galaxyId: 'gal_main' },
]

// ── Galaxy ────────────────────────────────────────────────────

export const galaxies: GalaxyCluster[] = [
  {
    id: 'gal_main',
    name: '计算机科学',
    nameEn: 'Computer Science',
    color: '#4a6cf7',
    position: [0, 0, 0],
    systems: starSystems,
  },
]

// ── Category colors (for Obsidian-style graph edges) ──────────

export const categoryColors: Record<string, string> = {
  sys_prog_basics: '#4A90D9',  // Blue
  sys_computer:     '#26A69A',  // Teal
  sys_software:    '#FFA726',  // Orange
  sys_ai:          '#AB47BC',  // Purple
  sys_frontier:    '#EF5350',  // Red
}

// ── Knowledge Nodes: 24 courses ───────────────────────────────

export const knowledgeNodes: KnowledgeNode[] = [
  // ════════════════ 1. 编程与算法基础 (7 courses) ════════════

  {
    id: 'c_c_lang',
    name: 'C语言程序设计',
    nameEn: 'C Programming',
    type: 'knowledge',
    difficulty: 0.15,
    mastery: 0.85,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: [],
    next: ['c_cpp_oop', 'c_ds', 'c_computer_arch'],
    position: [0, 0, 0],
    description: '数据类型、流程控制、函数、指针、动态内存管理、文件操作。',
  },
  {
    id: 'c_python',
    name: 'Python程序设计',
    nameEn: 'Python Programming',
    type: 'knowledge',
    difficulty: 0.15,
    mastery: 0.9,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: [],
    next: ['c_java_oop', 'c_ds', 'c_ai_intro', 'c_ml'],
    position: [0, 0, 0],
    description: '基础语法、数据结构、函数式编程、面向对象、模块与包、高级特性。',
  },
  {
    id: 'c_java_oop',
    name: '面向对象程序设计(Java)',
    nameEn: 'Object-Oriented Programming (Java)',
    type: 'project',
    difficulty: 0.4,
    mastery: 0.6,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: ['c_python'],
    next: ['c_software_eng', 'c_ds'],
    position: [0, 0, 0],
    description: '类与对象、封装继承多态、集合框架、多线程、Lambda与Stream API。',
  },
  {
    id: 'c_cpp_oop',
    name: '面向对象程序设计(C++)',
    nameEn: 'Object-Oriented Programming (C++)',
    type: 'knowledge',
    difficulty: 0.4,
    mastery: 0.5,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: ['c_c_lang'],
    next: ['c_computer_graphics', 'c_ds'],
    position: [0, 0, 0],
    description: '引用、类与对象、继承多态、模板、STL容器、智能指针、移动语义。',
  },
  {
    id: 'c_ds',
    name: '数据结构',
    nameEn: 'Data Structures',
    type: 'knowledge',
    difficulty: 0.45,
    mastery: 0.5,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: ['c_c_lang', 'c_python'],
    next: ['c_algorithm', 'c_compiler', 'c_db'],
    position: [0, 0, 0],
    description: '线性表、栈队列、树与二叉树、图、散列表、堆、并查集、平衡树。',
  },
  {
    id: 'c_algorithm',
    name: '算法设计与分析',
    nameEn: 'Algorithm Design & Analysis',
    type: 'exercise',
    difficulty: 0.65,
    mastery: 0.25,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: ['c_ds'],
    next: [],
    position: [0, 0, 0],
    description: '递归分治、动态规划、贪心算法、回溯法、图算法、NP完全理论、近似算法。',
  },
  {
    id: 'c_compiler',
    name: '编译原理',
    nameEn: 'Compiler Design',
    type: 'exercise',
    difficulty: 0.7,
    mastery: 0.1,
    galaxy: 'gal_main',
    system: 'sys_prog_basics',
    prerequisites: ['c_ds', 'c_cpp_oop'],
    next: [],
    position: [0, 0, 0],
    description: '词法分析、语法分析(LL/LR)、语义分析、中间代码生成、代码优化、目标代码生成。',
  },

  // ════════════════ 2. 计算机系统 (4 courses) ═════════════════

  {
    id: 'c_computer_arch',
    name: '计算机组成原理',
    nameEn: 'Computer Organization',
    type: 'knowledge',
    difficulty: 0.4,
    mastery: 0.45,
    galaxy: 'gal_main',
    system: 'sys_computer',
    prerequisites: ['c_c_lang'],
    next: ['c_os', 'c_network'],
    position: [0, 0, 0],
    description: '冯·诺依曼结构、数据表示、运算器、存储系统、指令系统、CPU流水线、总线与I/O。',
  },
  {
    id: 'c_os',
    name: '操作系统',
    nameEn: 'Operating Systems',
    type: 'knowledge',
    difficulty: 0.5,
    mastery: 0.35,
    galaxy: 'gal_main',
    system: 'sys_computer',
    prerequisites: ['c_computer_arch', 'c_c_lang'],
    next: ['c_security', 'c_bigdata'],
    position: [0, 0, 0],
    description: '进程线程、CPU调度、同步互斥、死锁、内存管理、文件系统、设备管理、虚拟化。',
  },
  {
    id: 'c_network',
    name: '计算机网络',
    nameEn: 'Computer Networks',
    type: 'knowledge',
    difficulty: 0.45,
    mastery: 0.4,
    galaxy: 'gal_main',
    system: 'sys_computer',
    prerequisites: ['c_computer_arch'],
    next: ['c_security', 'c_bigdata'],
    position: [0, 0, 0],
    description: 'OSI/TCP/IP模型、物理层、数据链路层、IP路由、TCP/UDP、HTTP/HTTPS、网络安全。',
  },
  {
    id: 'c_db',
    name: '数据库系统原理',
    nameEn: 'Database Systems',
    type: 'project',
    difficulty: 0.45,
    mastery: 0.35,
    galaxy: 'gal_main',
    system: 'sys_computer',
    prerequisites: ['c_ds', 'c_software_eng'],
    next: ['c_bigdata'],
    position: [0, 0, 0],
    description: '关系模型、SQL语言、范式设计、B+树索引、事务ACID、并发控制、查询优化、NoSQL。',
  },

  // ════════════════ 3. 软件工程 (2 courses) ═══════════════════

  {
    id: 'c_software_eng',
    name: '软件工程',
    nameEn: 'Software Engineering',
    type: 'knowledge',
    difficulty: 0.4,
    mastery: 0.3,
    galaxy: 'gal_main',
    system: 'sys_software',
    prerequisites: ['c_java_oop', 'c_python'],
    next: ['c_software_test', 'c_db'],
    position: [0, 0, 0],
    description: '需求工程、系统设计、架构模式(MVC/微服务)、UML建模、测试、DevOps/CI/CD。',
  },
  {
    id: 'c_software_test',
    name: '软件测试',
    nameEn: 'Software Testing',
    type: 'knowledge',
    difficulty: 0.45,
    mastery: 0.2,
    galaxy: 'gal_main',
    system: 'sys_software',
    prerequisites: ['c_software_eng'],
    next: [],
    position: [0, 0, 0],
    description: '黑盒/白盒测试、单元测试(JUnit/PyTest)、集成测试、自动化测试(Selenium)、性能测试。',
  },

  // ════════════════ 4. 人工智能方向 (8 courses) ═══════════════

  {
    id: 'c_discrete_math',
    name: '离散数学',
    nameEn: 'Discrete Mathematics',
    type: 'knowledge',
    difficulty: 0.4,
    mastery: 0.5,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: [],
    next: ['c_ai_intro'],
    position: [0, 0, 0],
    description: '数理逻辑、集合论、图论、代数系统(群环域)、组合数学。',
  },
  {
    id: 'c_probability',
    name: '概率论与数理统计',
    nameEn: 'Probability & Statistics',
    type: 'knowledge',
    difficulty: 0.45,
    mastery: 0.6,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: [],
    next: ['c_ml', 'c_rl'],
    position: [0, 0, 0],
    description: '概率基础、随机变量、多维随机变量、大数定律、参数估计、假设检验、回归分析。',
  },
  {
    id: 'c_ai_intro',
    name: '人工智能导论',
    nameEn: 'Introduction to AI',
    type: 'knowledge',
    difficulty: 0.2,
    mastery: 0.55,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_python', 'c_discrete_math'],
    next: ['c_ml'],
    position: [0, 0, 0],
    description: 'AI定义、问题求解与搜索、知识与推理、机器学习入门、神经网络基础、AI伦理。',
  },
  {
    id: 'c_ml',
    name: '机器学习',
    nameEn: 'Machine Learning',
    type: 'project',
    difficulty: 0.5,
    mastery: 0.3,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_python', 'c_probability', 'c_ai_intro'],
    next: ['c_dl', 'c_rl'],
    position: [0, 0, 0],
    description: 'KNN、决策树、SVM、随机森林、XGBoost、K-Means、PCA、模型评估与调参。',
  },
  {
    id: 'c_dl',
    name: '深度学习',
    nameEn: 'Deep Learning',
    type: 'knowledge',
    difficulty: 0.55,
    mastery: 0.2,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_ml'],
    next: ['c_nlp', 'c_cv'],
    position: [0, 0, 0],
    description: '感知机MLP、反向传播、CNN(LeNet/VGG/ResNet)、激活函数、BatchNorm、Dropout。',
  },
  {
    id: 'c_nlp',
    name: '自然语言处理',
    nameEn: 'Natural Language Processing',
    type: 'project',
    difficulty: 0.5,
    mastery: 0.1,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_dl', 'c_python'],
    next: [],
    position: [0, 0, 0],
    description: '分词、词向量(Word2Vec/GloVe)、RNN/LSTM、注意力机制、Transformer(BERT/GPT)。',
  },
  {
    id: 'c_cv',
    name: '计算机视觉',
    nameEn: 'Computer Vision',
    type: 'project',
    difficulty: 0.5,
    mastery: 0.1,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_dl'],
    next: [],
    position: [0, 0, 0],
    description: '图像分类(AlexNet/ResNet)、目标检测(Faster R-CNN/YOLO)、迁移学习、图像分割。',
  },
  {
    id: 'c_rl',
    name: '强化学习与生成式AI',
    nameEn: 'Reinforcement Learning & GenAI',
    type: 'knowledge',
    difficulty: 0.7,
    mastery: 0.0,
    galaxy: 'gal_main',
    system: 'sys_ai',
    prerequisites: ['c_ml', 'c_probability'],
    next: [],
    position: [0, 0, 0],
    description: 'MDP、贝尔曼方程、DQN、PPO、GAN、扩散模型、VAE、多模态生成(Stable Diffusion)。',
  },

  // ════════════════ 5. 前沿与应用 (3 courses) ═════════════════

  {
    id: 'c_computer_graphics',
    name: '计算机图形学',
    nameEn: 'Computer Graphics',
    type: 'knowledge',
    difficulty: 0.65,
    mastery: 0.05,
    galaxy: 'gal_main',
    system: 'sys_frontier',
    prerequisites: ['c_cpp_oop'],
    next: [],
    position: [0, 0, 0],
    description: '图形流水线、三维变换与投影、光照模型(Phong)、Bézier曲线曲面、光线追踪、纹理映射。',
  },
  {
    id: 'c_security',
    name: '信息安全基础',
    nameEn: 'Information Security',
    type: 'knowledge',
    difficulty: 0.5,
    mastery: 0.1,
    galaxy: 'gal_main',
    system: 'sys_frontier',
    prerequisites: ['c_network', 'c_os'],
    next: [],
    position: [0, 0, 0],
    description: 'CIA三要素、对称/非对称加密、哈希与数字签名、身份认证、Web安全(OWASP Top 10)、隐私保护。',
  },
  {
    id: 'c_bigdata',
    name: '大数据与云计算',
    nameEn: 'Big Data & Cloud Computing',
    type: 'knowledge',
    difficulty: 0.6,
    mastery: 0.0,
    galaxy: 'gal_main',
    system: 'sys_frontier',
    prerequisites: ['c_db', 'c_os', 'c_network'],
    next: [],
    position: [0, 0, 0],
    description: 'HDFS、MapReduce、Spark、Hive、Kafka、Docker/Kubernetes、AWS/GCP云服务。',
  },
]

/* ── Assign 3D positions for all nodes ─────────────────────────
   Distributes nodes in a spiral galaxy layout across 5 systems.
   Each system orbits at a unique radius/angle; nodes within a
   system form a tight cluster around the system center.          */
const SYSTEM_ORBITS: Record<string, { r: number; angle: number }> = {
  sys_prog_basics: { r: 10, angle: 0 },
  sys_ai:          { r: 22, angle: 1.2 },
  sys_frontier:    { r: 16, angle: 2.5 },
  sys_software:    { r: 7,  angle: 3.8 },
  sys_computer:    { r: 14, angle: 5.0 },
}

function distributeNodes() {
  const groups: Record<string, typeof knowledgeNodes> = {}
  for (const n of knowledgeNodes) {
    if (!groups[n.system]) groups[n.system] = []
    groups[n.system].push(n)
  }

  for (const [sysId, nodes] of Object.entries(groups)) {
    const orbit = SYSTEM_ORBITS[sysId]
    if (!orbit) continue
    const count = nodes.length
    const cx = orbit.r * Math.cos(orbit.angle)
    const cz = orbit.r * Math.sin(orbit.angle)
    const clusterR = 2 + count * 0.8

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 - Math.PI / 2
      const spread = clusterR * (0.4 + 0.6 * (i / count))
      const x = cx + spread * Math.cos(a)
      const z = cz + spread * Math.sin(a)
      const y = (i % 3 - 1) * 1.2
      nodes[i].position = [Math.round(x * 10) / 10, y, Math.round(z * 10) / 10]
    }
  }
}

distributeNodes()
