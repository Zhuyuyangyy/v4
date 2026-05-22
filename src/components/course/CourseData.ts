/* ===================================================================
 * EduMind — AI 课程数据集（完整版）
 * 涵盖 5 大方向 24 门课程，提供课程、知识点、代码示例、
 * 流程图、思维导图、学习场景数据
 * =================================================================== */

import type {
  Course,
  FlowStage,
  CodeExample,
  MindMapNode,
  ScenarioConfig,
  CategoryConfig,
  AISubfield,
} from '@/types/course'

/* ─── 工具函数 ─── */

export function getCourseBySubfield(sf: AISubfield): Course | undefined {
  return allCourses.find(c => c.subfield === sf)
}

export function getCourseById(id: string): Course | undefined {
  return allCourses.find(c => c.id === id)
}

export function getCoursesByDomain(domain: string): Course[] {
  return allCourses.filter(c => c.domain === domain)
}

export function getCoursesByCategory(cat: string): Course[] {
  return allCourses.filter(c => c.category === cat)
}

export function getCategoryConfigs(): CategoryConfig[] {
  return categoryConfigs
}

/* ─── 大类方向配置 ─── */

export const categoryConfigs: CategoryConfig[] = [
  {
    key: 'programming',
    label: '编程与算法基础',
    seq: 1,
    courses: ['c-lang', 'python', 'java-oop', 'cpp-oop', 'data-structure', 'algorithm', 'compiler'],
  },
  {
    key: 'systems',
    label: '计算机系统',
    seq: 2,
    courses: ['computer-arch', 'os', 'computer-network', 'database'],
  },
  {
    key: 'software',
    label: '软件工程',
    seq: 3,
    courses: ['software-eng', 'software-test'],
  },
  {
    key: 'ai',
    label: '人工智能方向',
    seq: 4,
    courses: ['discrete-math', 'probability', 'ai-intro', 'ai-ml', 'ai-dl', 'ai-nlp', 'ai-cv', 'ai-rl'],
  },
  {
    key: 'frontier',
    label: '前沿与应用',
    seq: 5,
    courses: ['computer-graphics', 'security', 'big-data-cloud'],
  },
]

/* ─── 场景配置 ─── */

export const scenarioConfigs: ScenarioConfig[] = [
  {
    key: 'preview',
    label: '课前预习',
    icon: 'BookOpen',
    description: '新课预热，通俗化讲解降低学习门槛',
    color: '#00d4ff',
    subModes: [
      { key: 'concept-overview', label: '概念速览', desc: '快速了解核心概念' },
      { key: 'case-intro', label: '案例式科普', desc: '通过案例理解抽象内容' },
    ],
  },
  {
    key: 'inclass',
    label: '课中解惑',
    icon: 'Zap',
    description: '即时扫清课堂知识盲区',
    color: '#7c3aed',
    subModes: [
      { key: 'quick-qa', label: '碎片答疑', desc: '精简回答不打断节奏' },
      { key: 'catch-up', label: '跟不上了', desc: '重新讲解当前知识点' },
    ],
  },
  {
    key: 'homework',
    label: '课后实验',
    icon: 'PenTool',
    description: '全流程实操指导，规范实验操作',
    color: '#06d6a0',
    subModes: [
      { key: 'code-tutor', label: '代码辅导', desc: '逐行指导代码编写' },
      { key: 'debug-help', label: 'Bug 调试', desc: '定位并修复代码错误' },
      { key: 'report-guide', label: '报告撰写', desc: '规范实验报告格式' },
    ],
  },
  {
    key: 'exam',
    label: '考前冲刺',
    icon: 'Target',
    description: '聚焦高频考点，助力综合考核',
    color: '#f59e0b',
    subModes: [
      { key: 'review-points', label: '考点梳理', desc: '梳理高频考点' },
      { key: 'problem-types', label: '题型解析', desc: '典型题详解' },
      { key: 'project-guide', label: '大作业指导', desc: '项目全流程指导' },
    ],
  },
]

/* ─── 预设问题（按场景） ─── */

export const presetQuestionsByScenario: Record<string, { q: string; category: string; submodes?: string[] }[]> = {
  preview: [
    { q: '什么是机器学习？它和传统编程有什么不同？', category: '概念入门', submodes: ['concept-overview'] },
    { q: '深度学习是怎么从神经网络发展而来的？', category: '概念入门', submodes: ['concept-overview'] },
    { q: '大语言模型为什么能理解人类语言？', category: '科普', submodes: ['case-intro'] },
    { q: '用一个生活例子解释什么是监督学习', category: '案例', submodes: ['case-intro'] },
    { q: '计算机网络的 TCP/IP 协议栈是什么？', category: '概念入门', submodes: ['concept-overview'] },
    { q: '什么是操作系统？它主要做什么？', category: '概念入门', submodes: ['concept-overview'] },
  ],
  inclass: [
    { q: '能不能再解释一下过拟合是什么意思？', category: '概念不清', submodes: ['quick-qa'] },
    { q: '反向传播的链式法则具体是怎么计算的？', category: '算法原理', submodes: ['catch-up'] },
    { q: 'Attention 机制里的 Q、K、V 到底是什么关系？', category: '算法原理', submodes: ['catch-up'] },
    { q: '交叉熵损失函数为什么比均方误差更适合分类？', category: '概念不清', submodes: ['quick-qa'] },
    { q: 'CNN 的卷积层和池化层各有什么作用？', category: '概念不清', submodes: ['quick-qa', 'catch-up'] },
  ],
  homework: [
    { q: '帮我看看这个 KNN 的代码哪里有问题', category: '代码调试', submodes: ['debug-help'] },
    { q: '怎么用 Pandas 对缺失值进行填充？', category: '数据处理', submodes: ['code-tutor'] },
    { q: 'PyTorch 训练循环的标准写法是什么？', category: '代码辅导', submodes: ['code-tutor'] },
    { q: '帮我写一份数据分析实验报告模板', category: '报告撰写', submodes: ['report-guide'] },
  ],
  exam: [
    { q: '机器学习面试常考算法有哪些？', category: '考点梳理', submodes: ['review-points'] },
    { q: '偏差和方差的区别 Trade-off 怎么理解？', category: '高频考点', submodes: ['review-points', 'problem-types'] },
    { q: '手撕一个决策树的伪代码', category: '题型解析', submodes: ['problem-types'] },
    { q: 'LLM 大作业从选题到实现的全流程指导', category: '大作业指导', submodes: ['project-guide'] },
  ],
}

/* ─── 公共流程图阶段定义 ─── */

export const mlFlowStages: FlowStage[] = [
  { id: 'data-collection', name: '数据采集', description: '收集原始数据，包括结构化数据、文本、图像等', dataPreview: '原始数据集: 1000 条样本, 20 个特征' },
  { id: 'data-cleaning', name: '数据清洗', description: '处理缺失值、异常值、重复数据', params: [{ key: 'missing_strategy', label: '缺失值处理', type: 'select', options: ['删除', '均值填充', '中位数填充', '前向填充'], default: '均值填充' }, { key: 'outlier_threshold', label: '异常值阈值', type: 'number', default: 3 }], dataPreview: '清洗后: 985 条样本, 无缺失值' },
  { id: 'feature-engineering', name: '特征工程', description: '特征编码、标准化、降维、特征选择', params: [{ key: 'scale_method', label: '标准化方法', type: 'select', options: ['StandardScaler', 'MinMaxScaler', 'RobustScaler'], default: 'StandardScaler' }, { key: 'dim_reduction', label: '降维方法', type: 'select', options: ['无', 'PCA', 't-SNE'], default: '无' }], dataPreview: '特征矩阵: 985 × 15 维' },
  { id: 'data-split', name: '数据集划分', description: '将数据划分为训练集、验证集和测试集', params: [{ key: 'train_ratio', label: '训练集比例', type: 'number', default: 0.7 }, { key: 'val_ratio', label: '验证集比例', type: 'number', default: 0.15 }], dataPreview: '训练集: 689 条 / 验证集: 148 条 / 测试集: 148 条' },
  { id: 'model-training', name: '模型训练', description: '选择算法并进行模型训练与超参数调优', params: [{ key: 'algorithm', label: '算法选择', type: 'select', options: ['线性回归', '决策树', '随机森林', 'SVM', 'KNN'], default: '随机森林' }, { key: 'cv_folds', label: '交叉验证折数', type: 'number', default: 5 }], dataPreview: '训练完成: 准确率 0.892' },
  { id: 'model-evaluation', name: '模型评估', description: '使用测试集评估模型性能，分析误差', dataPreview: '测试集准确率: 0.875 | F1: 0.863 | AUC: 0.912' },
]

export const dlFlowStages: FlowStage[] = [
  { id: 'data-prep', name: '数据准备', description: '数据加载、增强、归一化、批次生成', dataPreview: '训练集: 50000 张图片, 增强后: 200000 张' },
  { id: 'model-design', name: '模型设计', description: '设计网络架构：卷积层、池化层、全连接层', params: [{ key: 'conv_layers', label: '卷积层数', type: 'number', default: 4 }, { key: 'hidden_dim', label: '隐藏层维度', type: 'number', default: 512 }], dataPreview: '参数量: 2.3M' },
  { id: 'training-loop', name: '训练循环', description: '前向传播、损失计算、反向传播、参数更新', params: [{ key: 'epochs', label: '训练轮数', type: 'number', default: 50 }, { key: 'batch_size', label: '批次大小', type: 'number', default: 32 }, { key: 'learning_rate', label: '学习率', type: 'number', default: 0.001 }], dataPreview: 'Epoch 25/50 | Loss: 0.234 | Acc: 0.912' },
  { id: 'evaluation', name: '性能评估', description: '在测试集上评估模型泛化能力', dataPreview: 'Test Acc: 0.928 | Precision: 0.931 | Recall: 0.925' },
  { id: 'deployment', name: '模型部署', description: '导出模型、部署到生产环境、推理测试', dataPreview: '推理延迟: 23ms/样本 | 吞吐量: 43 样本/s' },
]

export const nlpFlowStages: FlowStage[] = [
  { id: 'text-preprocessing', name: '文本预处理', description: '分词、去停用词、词干提取/词形还原', params: [{ key: 'tokenizer', label: '分词器', type: 'select', options: ['jieba', 'BERT Tokenizer', 'spaCy'], default: 'jieba' }], dataPreview: '原始: 1000 篇文档 | 分词后: 85000 个词条' },
  { id: 'embedding', name: '词向量表示', description: '将文本转换为数值向量：Word2Vec / GloVe / BERT', dataPreview: '词向量维度: 300 | 词汇表大小: 50000' },
  { id: 'sequence-modeling', name: '序列建模', description: '使用 RNN / LSTM / Transformer 建模序列依赖', params: [{ key: 'model_type', label: '模型类型', type: 'select', options: ['LSTM', 'GRU', 'Transformer'], default: 'Transformer' }], dataPreview: '序列长度: 128 | 隐藏维度: 256' },
  { id: 'output-generation', name: '输出生成', description: '根据任务生成：分类标签 / 翻译文本 / 摘要', dataPreview: '准确率: 0.934 | BLEU: 0.872' },
]

/* ─── 通用代码示例 ─── */

export const sharedCodeExamples: Record<string, CodeExample[]> = {
  'data-cleaning': [
    {
      title: 'Pandas 缺失值处理',
      description: '使用 Pandas 检测和填充数据中的缺失值',
      language: 'python',
      code: `import pandas as pd\nimport numpy as np\ndf = pd.read_csv('data.csv')\nprint(df.isnull().sum())\ndf_clean = df.dropna()\ndf['age'].fillna(df['age'].mean(), inplace=True)\ndf['gender'].fillna(df['gender'].mode()[0], inplace=True)\ndf['sensor_value'].fillna(method='ffill', inplace=True)\nprint(f'清洗前: {len(df)} 行, 清洗后: {len(df_clean)} 行')`,
      output: 'age 5\n清洗前: 1000 行, 清洗后: 985 行',
    },
    {
      title: '异常值检测 (IQR 方法)',
      description: '使用四分位距法检测并处理异常值',
      language: 'python',
      code: `import numpy as np\ndef detect_outliers_iqr(data, factor=1.5):\n    Q1 = np.percentile(data, 25)\n    Q3 = np.percentile(data, 75)\n    IQR = Q3 - Q1\n    lower = Q1 - factor * IQR\n    upper = Q3 + factor * IQR\n    outliers = (data < lower) | (data > upper)\n    return outliers, lower, upper`,
      output: '异常值数量: 23',
    },
  ],
  'model-training': [
    {
      title: 'KNN 分类器从零实现',
      description: '从零实现 K-近邻算法并评测',
      language: 'python',
      code: `import numpy as np\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom collections import Counter\n\nclass KNN:\n    def __init__(self, k=3): self.k = k\n    def fit(self, X, y): self.X_train, self.y_train = X, y\n    def predict(self, X): return np.array([self._predict(x) for x in X])\n    def _predict(self, x):\n        dists = [np.sqrt(np.sum((x - x_train)**2)) for x_train in self.X_train]\n        k_labels = [self.y_train[i] for i in np.argsort(dists)[:self.k]]\n        return Counter(k_labels).most_common(1)[0][0]\n\niris = load_iris()\nX, y = iris.data, iris.target\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nknn = KNN(k=3)\nknn.fit(X_train, y_train)\npredictions = knn.predict(X_test)\naccuracy = np.mean(predictions == y_test)\nprint(f"KNN 准确率: {accuracy:.4f}")`,
      output: 'KNN 准确率: 0.9667',
    },
    {
      title: 'PyTorch 简单神经网络',
      description: '使用 PyTorch 构建和训练一个简单的全连接网络',
      language: 'python',
      code: `import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(10, 64), nn.ReLU(), nn.Dropout(0.2),\n            nn.Linear(64, 32), nn.ReLU(),\n            nn.Linear(32, 2))\n    def forward(self, x): return self.net(x)\n\nmodel = SimpleNet()\ncriterion = nn.CrossEntropyLoss()\noptimizer = optim.Adam(model.parameters(), lr=0.001)\nX = torch.randn(100, 10)\ny = torch.randint(0, 2, (100,))\nfor epoch in range(10):\n    optimizer.zero_grad()\n    outputs = model(X)\n    loss = criterion(outputs, y)\n    loss.backward()\n    optimizer.step()`,
      output: 'Epoch 10/10 | Loss: 0.5321 | Acc: 0.8100',
    },
  ],
}

/* ===================================================================
 * 课程数据：5 大方向 24 门课程
 * =================================================================== */

export const allCourses: Course[] = [

  /* ==================================================================
   * 一、编程与算法基础（7门）
   * ================================================================== */

  /* ─── 1. C 语言程序设计 ─── */
  {
    id: 'c-lang', category: 'programming', seq: 1, domain: 'cs',
    name: 'C语言程序设计',
    description: '掌握 C 语言语法、指针、内存管理、文件操作，建立扎实的编程基础',
    icon: 'Code', difficulty: 'beginner', prerequisites: [],
    color: '#00599C',
    topics: [
      {
        id: 'c-basics', name: 'C 语言基础', description: '基本语法、流程控制、函数',
        concepts: [
          { id: 'c-syntax', name: '基本语法', description: '数据类型、运算符、表达式、输入输出', difficulty: 'beginner', prerequisites: [] },
          { id: 'c-control', name: '流程控制', description: 'if-else、switch、for、while、do-while', difficulty: 'beginner', prerequisites: ['c-syntax'] },
          { id: 'c-function', name: '函数', description: '函数定义与调用、参数传递、递归', difficulty: 'beginner', prerequisites: ['c-control'] },
          { id: 'c-array', name: '数组与字符串', description: '一维/二维数组、字符数组、字符串处理', difficulty: 'beginner', prerequisites: ['c-function'] },
        ],
        resources: [{ type: 'doc', title: 'C 语言入门指南' }, { type: 'exercise', title: 'C 语言基础练习' }],
        codeExamples: [
          { title: '递归求斐波那契数列', description: '使用递归函数计算斐波那契数列', language: 'c',
            code: '#include <stdio.h>\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\nint main() {\n    int n = 10;\n    printf("Fibonacci(%d) = %d\\n", n, fibonacci(n));\n    return 0;\n}',
            output: 'Fibonacci(10) = 55' },
        ],
      },
      {
        id: 'c-pointer', name: '指针与内存管理', description: '指针、动态内存、结构体',
        concepts: [
          { id: 'c-pointer-adv', name: '指针高级用法', description: '指针运算、指针与数组、函数指针', difficulty: 'intermediate', prerequisites: ['c-function'] },
          { id: 'c-struct', name: '结构体与共用体', description: '结构体定义、嵌套、联合体、枚举', difficulty: 'intermediate', prerequisites: ['c-pointer-adv'] },
          { id: 'c-memory', name: '动态内存管理', description: 'malloc、calloc、realloc、free', difficulty: 'intermediate', prerequisites: ['c-pointer-adv'] },
        ],
        resources: [{ type: 'doc', title: 'C 指针深度解析' }],
        codeExamples: [
          { title: '指针交换与动态数组', description: '使用指针交换变量，动态分配数组', language: 'c',
            code: '#include <stdio.h>\n#include <stdlib.h>\nvoid swap(int *a, int *b) {\n    int temp = *a; *a = *b; *b = temp;\n}\nint main() {\n    int *arr = (int*)malloc(5 * sizeof(int));\n    for (int i = 0; i < 5; i++) arr[i] = i * 10;\n    free(arr);\n    return 0;\n}' },
        ],
        presetQuestions: [
          { q: '指针和数组有什么区别和联系？', a: '指针保存内存地址，可用指针运算访问数组元素；数组名在表达式中退化为指向首元素的指针，但 sizeof 操作结果不同。' },
          { q: '什么是野指针？如何避免？', a: '野指针指向已释放或无效内存。避免：初始化指针为 NULL，free 后置 NULL，不返回局部变量地址。' },
        ],
      },
    ],
  },

  /* ─── 2. Python 程序设计 ─── */
  {
    id: 'python', category: 'programming', seq: 2, domain: 'cs',
    name: 'Python程序设计',
    description: '掌握 Python 语法、数据结构和高级特性，能够独立完成 Python 项目开发',
    icon: 'Code', difficulty: 'beginner', prerequisites: [],
    color: '#3776AB',
    topics: [
      {
        id: 'py-basics', name: 'Python 基础', description: '语法、数据结构、函数',
        concepts: [
          { id: 'py-syntax', name: '基础语法', description: '变量、数据类型、运算符、输入输出', difficulty: 'beginner', prerequisites: [] },
          { id: 'py-data-struct', name: '内置数据结构', description: '列表、元组、字典、集合、推导式', difficulty: 'beginner', prerequisites: ['py-syntax'] },
          { id: 'py-function', name: '函数与作用域', description: '函数定义、参数类型、lambda、装饰器', difficulty: 'beginner', prerequisites: ['py-data-struct'] },
        ],
        resources: [{ type: 'doc', title: 'Python 入门教程' }, { type: 'exercise', title: 'Python 基础练习' }],
        codeExamples: [
          { title: '装饰器与排序', description: '使用装饰器测量函数执行时间', language: 'python',
            code: 'import time\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} 耗时: {time.time()-start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr)//2]\n    return [x for x in arr if x < pivot] + [x for x in arr if x == pivot] + [x for x in arr if x > pivot]\n\nprint(quick_sort([3, 6, 8, 10, 1, 2, 1]))' },
        ],
      },
      {
        id: 'py-advanced', name: 'Python 高级特性', description: '生成器、面向对象、模块化',
        concepts: [
          { id: 'py-oo', name: '面向对象编程', description: '类与对象、继承、多态、特殊方法', difficulty: 'intermediate', prerequisites: ['py-function'] },
          { id: 'py-iterator', name: '迭代器与生成器', description: 'yield、生成器表达式、迭代协议', difficulty: 'intermediate', prerequisites: ['py-function'] },
          { id: 'py-module', name: '模块与包', description: '模块导入、包管理、pip 使用', difficulty: 'beginner', prerequisites: ['py-function'] },
        ],
        resources: [{ type: 'doc', title: 'Python 高级编程' }],
        codeExamples: [
          { title: '生成器实现斐波那契', description: '使用生成器惰性计算斐波那契数列', language: 'python',
            code: 'def fibonacci_gen(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci_gen(10)))',
            output: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]' },
        ],
        presetQuestions: [
          { q: '列表和元组的区别是什么？', a: '列表可变，元组不可变；列表用 []，元组用 ()；元组可作字典键，列表不可。' },
          { q: '生成器和迭代器有什么区别？', a: '生成器是用 yield 创建的特殊迭代器，惰性计算；迭代器实现了 __iter__ 和 __next__ 协议。' },
        ],
      },
    ],
  },

  /* ─── 3. 面向对象程序设计（Java） ─── */
  {
    id: 'java-oop', category: 'programming', seq: 3, domain: 'cs',
    name: '面向对象程序设计（Java）',
    description: '使用 Java 深入掌握 OOP 思想：封装、继承、多态、泛型、集合与多线程',
    icon: 'Code', difficulty: 'intermediate', prerequisites: ['程序设计基础'],
    color: '#ED8B00',
    topics: [
      {
        id: 'java-oop-core', name: 'Java OOP 核心', description: '封装、继承、多态、接口',
        concepts: [
          { id: 'java-class', name: '类与对象', description: '类的定义、构造方法、this、static', difficulty: 'beginner', prerequisites: [] },
          { id: 'java-inherit', name: '继承与多态', description: 'extends、super、重写、抽象类、接口', difficulty: 'intermediate', prerequisites: ['java-class'] },
          { id: 'java-package', name: '封装与包', description: '访问修饰符、包机制、import', difficulty: 'beginner', prerequisites: ['java-class'] },
        ],
        resources: [{ type: 'doc', title: 'Java OOP 思想详解' }],
        codeExamples: [
          { title: '泛型类与流式处理', description: '使用泛型和 Stream API 处理课程对象', language: 'java',
            code: 'import java.util.*;\nimport java.util.stream.*;\n\nclass Course<T> {\n    private String name;\n    private T data;\n    public Course(String name, T data) { this.name = name; this.data = data; }\n    public String getName() { return name; }\n    public T getData() { return data; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Course<Integer>> courses = Arrays.asList(\n            new Course<>("Math", 90), new Course<>("CS", 85));\n        courses.stream()\n            .filter(c -> c.getData() >= 85)\n            .forEach(c -> System.out.println(c.getName()));\n    }\n}' },
        ],
      },
      {
        id: 'java-adv', name: 'Java 高级特性', description: '集合框架、多线程、异常处理',
        concepts: [
          { id: 'java-collection', name: '集合框架', description: 'List、Set、Map、Collections、Comparable', difficulty: 'intermediate', prerequisites: ['java-inherit'] },
          { id: 'java-thread', name: '多线程', description: 'Thread、Runnable、synchronized、线程池', difficulty: 'advanced', prerequisites: ['java-collection'] },
          { id: 'java-exception', name: '异常处理', description: 'try-catch-finally、自定义异常、try-with-resources', difficulty: 'beginner', prerequisites: ['java-class'] },
        ],
        resources: [{ type: 'doc', title: 'Java 并发编程实战' }, { type: 'exercise', title: 'Java 编程练习' }],
        presetQuestions: [
          { q: 'Java 中 == 和 equals() 有什么区别？', a: '== 比较引用地址，equals() 比较内容（默认同 ==，String 等类已重写）。' },
          { q: '接口和抽象类的区别？', a: '抽象类可有构造方法和成员变量，支持单继承；接口仅抽象方法（JDK8+ 可有 default 方法），支持多实现。' },
        ],
      },
    ],
  },

  /* ─── 4. 面向对象程序设计（C++） ─── */
  {
    id: 'cpp-oop', category: 'programming', seq: 4, domain: 'cs',
    name: '面向对象程序设计（C++）',
    description: '掌握 C++ OOP、模板、STL、智能指针与移动语义',
    icon: 'Code', difficulty: 'intermediate', prerequisites: ['C 语言基础'],
    color: '#00599C',
    topics: [
      {
        id: 'cpp-oop-core', name: 'C++ OOP 核心', description: '类、继承、多态、运算符重载',
        concepts: [
          { id: 'cpp-class', name: '类与对象', description: '构造/析构、拷贝构造、拷贝赋值、this', difficulty: 'beginner', prerequisites: [] },
          { id: 'cpp-poly', name: '继承与多态', description: '虚函数、纯虚函数、抽象类、虚函数表机制', difficulty: 'intermediate', prerequisites: ['cpp-class'] },
          { id: 'cpp-op-overload', name: '运算符重载', description: '二元/一元运算符重载、类型转换函数', difficulty: 'intermediate', prerequisites: ['cpp-class'] },
        ],
        resources: [{ type: 'doc', title: 'C++ OOP 详解' }],
        codeExamples: [
          { title: 'RAII 文件处理器', description: '使用 RAII 模式管理文件资源', language: 'cpp',
            code: '#include <iostream>\n#include <fstream>\n#include <stdexcept>\nclass FileHandler {\n    std::ofstream file;\npublic:\n    FileHandler(const std::string& name) { file.open(name); if (!file) throw std::runtime_error("无法打开"); }\n    ~FileHandler() { if (file.is_open()) file.close(); }\n    void write(const std::string& data) { file << data; }\n    FileHandler(const FileHandler&) = delete;\n    FileHandler& operator=(const FileHandler&) = delete;\n};' },
        ],
      },
      {
        id: 'cpp-modern', name: '现代 C++ 特性', description: '模板、STL、智能指针、移动语义',
        concepts: [
          { id: 'cpp-template', name: '模板', description: '函数模板、类模板、模板特化、SFINAE', difficulty: 'advanced', prerequisites: ['cpp-class'] },
          { id: 'cpp-stl', name: 'STL 容器与算法', description: 'vector、map、set、算法库、迭代器', difficulty: 'intermediate', prerequisites: ['cpp-template'] },
          { id: 'cpp-smart-ptr', name: '智能指针与移动语义', description: 'unique_ptr、shared_ptr、weak_ptr、右值引用、move', difficulty: 'advanced', prerequisites: ['cpp-stl'] },
        ],
        resources: [{ type: 'doc', title: '现代 C++ 特性精讲' }],
        presetQuestions: [
          { q: 'C++ 中虚函数是如何实现的？', a: '通过虚函数表（vtable）实现。每个含虚函数的类有一个虚函数表指针 vptr，指向存储函数地址的虚函数表，实现动态绑定。' },
          { q: '智能指针的原理是什么？', a: 'RAII 包装裸指针，自动管理生命周期。unique_ptr 独占所有权，shared_ptr 引用计数共享，weak_ptr 解决循环引用。' },
        ],
      },
    ],
  },

  /* ─── 5. 数据结构 ─── */
  {
    id: 'data-structure', category: 'programming', seq: 5, domain: 'cs',
    name: '数据结构',
    description: '系统掌握线性表、树、图、散列表等核心数据结构及其应用',
    icon: 'Layers', difficulty: 'intermediate', prerequisites: ['C/C++ 或 Java 程序设计'],
    color: '#4CAF50',
    topics: [
      {
        id: 'ds-linear', name: '线性结构', description: '线性表、栈、队列、字符串',
        concepts: [
          { id: 'ds-list', name: '线性表', description: '顺序表、单链表、双链表、循环链表', difficulty: 'beginner', prerequisites: [] },
          { id: 'ds-stack-queue', name: '栈与队列', description: '顺序栈、链栈、循环队列、双端队列', difficulty: 'beginner', prerequisites: ['ds-list'] },
          { id: 'ds-string', name: '字符串与模式匹配', description: 'BF 算法、KMP 算法', difficulty: 'intermediate', prerequisites: ['ds-list'] },
        ],
        resources: [{ type: 'doc', title: '数据结构入门' }, { type: 'exercise', title: '线性结构习题' }],
        codeExamples: [
          { title: 'KMP 字符串匹配', description: 'KMP 模式匹配算法实现', language: 'python',
            code: 'def build_lps(pattern):\n    lps = [0] * len(pattern)\n    length, i = 0, 1\n    while i < len(pattern):\n        if pattern[i] == pattern[length]:\n            length += 1; lps[i] = length; i += 1\n        elif length != 0:\n            length = lps[length - 1]\n        else:\n            lps[i] = 0; i += 1\n    return lps\n\ndef kmp(text, pattern):\n    lps = build_lps(pattern)\n    i = j = 0; pos = []\n    while i < len(text):\n        if text[i] == pattern[j]:\n            i += 1; j += 1\n            if j == len(pattern): pos.append(i-j); j = lps[j-1]\n        elif j != 0: j = lps[j-1]\n        else: i += 1\n    return pos\n\nprint(kmp("ABABDABACDABABCABAB", "ABABCABAB"))',
            output: '[10]' },
        ],
      },
      {
        id: 'ds-nonlinear', name: '非线性结构', description: '树、图、散列表',
        concepts: [
          { id: 'ds-tree', name: '树与二叉树', description: '二叉树遍历、线索二叉树、BST、堆、哈夫曼树', difficulty: 'intermediate', prerequisites: ['ds-stack-queue'] },
          { id: 'ds-graph', name: '图', description: '邻接矩阵/表、DFS、BFS、最短路径、最小生成树', difficulty: 'advanced', prerequisites: ['ds-tree'] },
          { id: 'ds-hash', name: '散列表', description: '哈希函数、冲突解决、链地址/开放地址', difficulty: 'intermediate', prerequisites: ['ds-list'] },
        ],
        resources: [{ type: 'doc', title: '树与图算法' }, { type: 'mindmap', title: '数据结构知识图谱' }],
        presetQuestions: [
          { q: '链表和数组各自的优缺点？', a: '数组随机访问 O(1)，插入删除 O(n)；链表插入删除 O(1)，随机访问 O(n)。数组空间连续、缓存友好。' },
          { q: 'B+ 树相比 B 树的优势？', a: 'B+ 树内节点不存数据，可存更多键，树更矮；叶子节点链表连接，范围查询高效。' },
        ],
      },
    ],
  },

  /* ─── 6. 算法设计与分析 ─── */
  {
    id: 'algorithm', category: 'programming', seq: 6, domain: 'cs',
    name: '算法设计与分析',
    description: '掌握递归分治、动态规划、贪心、回溯等算法设计范式与复杂度分析',
    icon: 'Target', difficulty: 'advanced', prerequisites: ['数据结构'],
    color: '#FF5722',
    topics: [
      {
        id: 'algo-paradigm', name: '算法设计范式', description: '递归、分治、贪心、动态规划',
        concepts: [
          { id: 'algo-divide', name: '递归与分治', description: '二分搜索、归并/快速排序、大整数乘法', difficulty: 'intermediate', prerequisites: [] },
          { id: 'algo-dp', name: '动态规划', description: '背包问题、LCS、最短路径、矩阵连乘', difficulty: 'advanced', prerequisites: ['algo-divide'] },
          { id: 'algo-greedy', name: '贪心算法', description: '活动选择、哈夫曼编码、最小生成树', difficulty: 'intermediate', prerequisites: ['algo-divide'] },
        ],
        resources: [{ type: 'doc', title: '算法设计手册' }, { type: 'exercise', title: '算法练习 50 题' }],
        codeExamples: [
          { title: '0-1 背包动态规划', description: 'DP 解 0-1 背包问题并回溯选中物品', language: 'python',
            code: 'def knapsack(weights, values, cap):\n    n = len(weights)\n    dp = [[0]*(cap+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(1, cap+1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1]+dp[i-1][w-weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    selected = []; w = cap\n    for i in range(n, 0, -1):\n        if dp[i][w] != dp[i-1][w]:\n            selected.append(i-1); w -= weights[i-1]\n    return dp[n][cap], selected\n\nw = [2,3,4,5]; v = [3,4,5,6]\nprint(knapsack(w, v, 8))',
            output: '(10, [3, 1, 0])' },
        ],
      },
      {
        id: 'algo-advanced', name: '高级算法', description: '回溯、图算法、NP 理论',
        concepts: [
          { id: 'algo-backtrack', name: '回溯法', description: '八皇后、数独、子集和、图着色', difficulty: 'advanced', prerequisites: ['algo-dp'] },
          { id: 'algo-graph', name: '图算法', description: '拓扑排序、强连通分量、最大流最小割', difficulty: 'advanced', prerequisites: ['ds-graph'] },
          { id: 'algo-np', name: 'NP 完全理论', description: 'P 与 NP、NP 完全、归约证明', difficulty: 'advanced', prerequisites: ['algo-backtrack'] },
        ],
        resources: [{ type: 'doc', title: '算法导论精要' }, { type: 'mindmap', title: '算法体系全景' }],
        presetQuestions: [
          { q: '动态规划和分治的区别？', a: '分治将问题分成独立子问题，递归求解合并；DP 子问题重叠，自底向上填表，避免重复计算。' },
          { q: '什么情况下适合贪心？', a: '贪心选择性质和最优子结构。局部最优能推出全局最优（如 Huffman 编码、Dijkstra）。' },
        ],
      },
    ],
  },

  /* ─── 7. 编译原理 ─── */
  {
    id: 'compiler', category: 'programming', seq: 7, domain: 'cs',
    name: '编译原理',
    description: '理解编译器工作流程：词法分析、语法分析、语义分析、代码生成与优化',
    icon: 'GitCompare', difficulty: 'advanced', prerequisites: ['数据结构', '程序设计语言'],
    color: '#9C27B0',
    topics: [
      {
        id: 'compiler-front', name: '编译器前端', description: '词法分析、语法分析、语义分析',
        concepts: [
          { id: 'comp-lexer', name: '词法分析', description: '正则表达式、NFA/DFA、词法分析器生成', difficulty: 'intermediate', prerequisites: [] },
          { id: 'comp-parser', name: '语法分析', description: '上下文无关文法、LL(1)、LR 分析器', difficulty: 'advanced', prerequisites: ['comp-lexer'] },
          { id: 'comp-semantic', name: '语义分析', description: '属性文法、语法制导翻译、类型检查', difficulty: 'advanced', prerequisites: ['comp-parser'] },
        ],
        resources: [{ type: 'doc', title: '编译原理入门' }],
        codeExamples: [
          { title: '递归下降计算器', description: '用递归下降分析法实现算术表达式计算', language: 'python',
            code: 'class Calculator:\n    def __init__(self, expr):\n        self.tokens = list(expr.replace(" ",""))\n        self.pos = 0\n    def parse(self):\n        r = self.expr()\n        if self.pos < len(self.tokens): raise ValueError("语法错误")\n        return r\n    def expr(self):\n        r = self.term()\n        while self.pos < len(self.tokens) and self.tokens[self.pos] in "+-":\n            op = self.tokens[self.pos]; self.pos += 1\n            r2 = self.term()\n            r = r + r2 if op == "+" else r - r2\n        return r\n    def term(self):\n        r = self.factor()\n        while self.pos < len(self.tokens) and self.tokens[self.pos] in "*/":\n            op = self.tokens[self.pos]; self.pos += 1\n            r2 = self.factor()\n            r = r * r2 if op == "*" else r / r2\n        return r\n    def factor(self):\n        if self.tokens[self.pos] == "(":\n            self.pos += 1; r = self.expr()\n            self.pos += 1; return r\n        n = ""\n        while self.pos < len(self.tokens) and self.tokens[self.pos].isdigit():\n            n += self.tokens[self.pos]; self.pos += 1\n        return int(n)\n\nprint(Calculator("3+5*(2+4)").parse())',
            output: '33' },
        ],
      },
      {
        id: 'compiler-back', name: '编译器后端', description: '中间代码、优化、目标代码生成',
        concepts: [
          { id: 'comp-ir', name: '中间表示', description: '三地址码、SSA 形式、语法树、DAG', difficulty: 'advanced', prerequisites: ['comp-semantic'] },
          { id: 'comp-opt', name: '代码优化', description: '常量折叠、公共子表达式消除、循环优化', difficulty: 'advanced', prerequisites: ['comp-ir'] },
          { id: 'comp-codegen', name: '代码生成', description: '指令选择、寄存器分配、指令调度', difficulty: 'advanced', prerequisites: ['comp-opt'] },
        ],
        resources: [{ type: 'doc', title: '编译器后端技术' }],
        presetQuestions: [
          { q: '编译器和解释器的区别？', a: '编译器一次性将源码转为目标代码再执行；解释器逐行翻译执行。编译器生成可执行文件，解释器需要运行时。' },
          { q: 'LL(1) 和 LR(1) 的区别？', a: 'LL(1) 从左到右扫描、最左推导、向前看 1 个 token；LR(1) 从左到右扫描、最右推导逆过程。LR 文法表达能力更强。' },
        ],
      },
    ],
  },

  /* ==================================================================
   * 二、计算机系统（4门）
   * ================================================================== */

  /* ─── 8. 计算机组成原理 ─── */
  {
    id: 'computer-arch', category: 'systems', seq: 8, domain: 'cs',
    name: '计算机组成原理',
    description: '理解计算机硬件系统结构：数据表示、CPU、存储系统、I/O',
    icon: 'Monitor', difficulty: 'intermediate', prerequisites: ['数字逻辑', '程序设计基础'],
    color: '#607D8B',
    topics: [
      {
        id: 'arch-basics', name: '计算机系统基础', description: '冯·诺依曼结构、数据表示',
        concepts: [
          { id: 'arch-von', name: '冯·诺依曼结构', description: '运算器、控制器、存储器、输入输出、存储程序概念', difficulty: 'beginner', prerequisites: [] },
          { id: 'arch-data-repr', name: '数据表示', description: '原码/反码/补码、IEEE754 浮点数、字符编码', difficulty: 'intermediate', prerequisites: ['arch-von'] },
          { id: 'arch-alu', name: '运算方法与 ALU', description: '定点加减乘除、浮点运算、ALU 原理', difficulty: 'intermediate', prerequisites: ['arch-data-repr'] },
        ],
        resources: [{ type: 'doc', title: '计算机组成原理概览' }],
      },
      {
        id: 'arch-core', name: '存储系统与 CPU', description: 'Cache、虚拟存储、CPU 流水线',
        concepts: [
          { id: 'arch-memory', name: '存储系统', description: '层次结构、Cache 映射与替换、虚拟存储器', difficulty: 'intermediate', prerequisites: ['arch-basics'] },
          { id: 'arch-cpu', name: '中央处理器', description: '数据通路、微程序控制、指令流水线', difficulty: 'advanced', prerequisites: ['arch-memory'] },
          { id: 'arch-bus-io', name: '总线与 I/O', description: '总线结构、中断、DMA、I/O 接口', difficulty: 'intermediate', prerequisites: ['arch-cpu'] },
        ],
        resources: [{ type: 'doc', title: 'CPU 架构深度解析' }, { type: 'exercise', title: '组成原理习题' }],
        presetQuestions: [
          { q: '冯·诺依曼结构的核心思想？', a: '存储程序概念——指令和数据以同等地位存放在存储器中，计算机按地址访问并自动执行。' },
          { q: 'Cache 的写策略有哪些？', a: '写直达（同时写 Cache 和主存）和写回（仅写 Cache，脏块换出时写回主存）。写回性能更好但实现复杂。' },
        ],
      },
    ],
  },

  /* ─── 9. 操作系统 ─── */
  {
    id: 'os', category: 'systems', seq: 9, domain: 'cs',
    name: '操作系统',
    description: '掌握进程管理、内存管理、文件系统与设备管理的核心原理',
    icon: 'Server', difficulty: 'intermediate', prerequisites: ['计算机组成原理', '程序设计'],
    color: '#1565C0',
    topics: [
      {
        id: 'os-process', name: '进程与并发', description: '进程线程、CPU 调度、同步互斥、死锁',
        concepts: [
          { id: 'os-proc-thread', name: '进程与线程', description: '进程状态、PCB、线程模型、进程通信 IPC', difficulty: 'intermediate', prerequisites: [] },
          { id: 'os-sched', name: 'CPU 调度', description: 'FCFS/SJF/RR/优先级/多级队列调度算法', difficulty: 'intermediate', prerequisites: ['os-proc-thread'] },
          { id: 'os-sync', name: '同步与互斥', description: '临界区、信号量、管程、生产者消费者问题', difficulty: 'advanced', prerequisites: ['os-proc-thread'] },
          { id: 'os-deadlock', name: '死锁', description: '死锁条件、死锁预防/避免/检测、银行家算法', difficulty: 'intermediate', prerequisites: ['os-sync'] },
        ],
        resources: [{ type: 'doc', title: '操作系统核心概念' }, { type: 'video', title: '进程同步精讲' }],
        codeExamples: [
          { title: '生产者消费者（信号量）', description: '使用信号量实现生产者消费者问题', language: 'python',
            code: 'import threading, time, random\nclass BoundedBuffer:\n    def __init__(self, cap=5):\n        self.buf = []; self.cap = cap\n        self.mutex = threading.Semaphore(1)\n        self.empty = threading.Semaphore(cap)\n        self.full = threading.Semaphore(0)\n    def produce(self, item):\n        self.empty.acquire(); self.mutex.acquire()\n        self.buf.append(item)\n        print(f"生产: {item} -> {self.buf}")\n        self.mutex.release(); self.full.release()\n    def consume(self):\n        self.full.acquire(); self.mutex.acquire()\n        item = self.buf.pop(0)\n        print(f"消费: {item} <- {self.buf}")\n        self.mutex.release(); self.empty.release()\n        return item' },
        ],
      },
      {
        id: 'os-memory', name: '内存管理与文件系统', description: '虚拟内存、文件系统、设备管理',
        concepts: [
          { id: 'os-vm', name: '内存管理', description: '分页、分段、段页式、TLB、页面置换算法', difficulty: 'advanced', prerequisites: ['os-sched'] },
          { id: 'os-fs', name: '文件系统', description: '文件结构、目录实现、磁盘调度、空闲空间管理', difficulty: 'intermediate', prerequisites: ['os-vm'] },
          { id: 'os-device', name: '设备管理', description: '设备独立性、SPOOLing、缓冲技术', difficulty: 'intermediate', prerequisites: ['os-fs'] },
        ],
        resources: [{ type: 'doc', title: '内存管理深度解析' }],
        presetQuestions: [
          { q: '进程和线程的区别？', a: '进程拥有独立内存空间，线程共享所属进程的内存；进程切换开销大，线程切换开销小。' },
          { q: '什么是死锁？四个必要条件？', a: '互斥、持有并等待、不可剥夺、循环等待。破坏任一条件即可预防死锁。' },
        ],
      },
    ],
  },

  /* ─── 10. 计算机网络 ─── */
  {
    id: 'computer-network', category: 'systems', seq: 10, domain: 'cs',
    name: '计算机网络',
    description: '掌握 TCP/IP 协议栈、路由算法、应用层协议与网络安全基础',
    icon: 'Globe', difficulty: 'intermediate', prerequisites: ['计算机组成原理'],
    color: '#0277BD',
    topics: [
      {
        id: 'net-protocol', name: '网络协议', description: 'TCP/IP 协议栈、路由算法',
        concepts: [
          { id: 'net-layers', name: '网络体系结构', description: 'OSI 七层模型、TCP/IP 四层模型', difficulty: 'beginner', prerequisites: [] },
          { id: 'net-transport', name: '传输层', description: 'TCP/UDP、TCP 拥塞控制、三次握手与四次挥手', difficulty: 'intermediate', prerequisites: ['net-layers'] },
          { id: 'net-network', name: '网络层', description: 'IP 协议、子网划分、CIDR、RIP/OSPF/BGP', difficulty: 'intermediate', prerequisites: ['net-layers'] },
        ],
        resources: [{ type: 'doc', title: 'TCP/IP 协议详解' }, { type: 'video', title: 'TCP 握手与挥手动画' }],
        codeExamples: [
          { title: 'TCP 回显服务器', description: '使用套接字编程构建多线程 TCP 回显服务器', language: 'python',
            code: 'import socket, threading\ndef handle(c, addr):\n    print(f"新连接: {addr}")\n    while True:\n        data = c.recv(1024)\n        if not data: break\n        c.send(f"Echo: {data.decode()}".encode())\n    c.close()\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nserver.bind(("0.0.0.0", 8888))\nserver.listen(5)\nprint("Server on :8888")\nwhile True:\n    client, addr = server.accept()\n    threading.Thread(target=handle, args=(client, addr)).start()' },
        ],
      },
      {
        id: 'net-app', name: '应用层与安全', description: 'HTTP、DNS、网络安全协议',
        concepts: [
          { id: 'net-http', name: '应用层协议', description: 'HTTP/HTTPS、DNS、SMTP、FTP、DHCP', difficulty: 'intermediate', prerequisites: ['net-transport'] },
          { id: 'net-security', name: '网络安全', description: '对称/非对称加密、SSL/TLS、防火墙、VPN', difficulty: 'advanced', prerequisites: ['net-http'] },
          { id: 'net-wireless', name: '无线与移动网络', description: 'Wi-Fi、移动通信、Ad Hoc 网络', difficulty: 'intermediate', prerequisites: ['net-http'] },
        ],
        resources: [{ type: 'doc', title: 'HTTP 协议详解' }, { type: 'exercise', title: '计算机网络习题' }],
        presetQuestions: [
          { q: 'TCP 三次握手的过程？', a: '1)客户端发 SYN；2)服务端回 SYN+ACK；3)客户端发 ACK。确保双方收发能力正常，防止已失效连接请求到达。' },
          { q: 'HTTP 和 HTTPS 的区别？', a: 'HTTPS 使用 SSL/TLS 加密传输，默认 443 端口；HTTP 明文传输，默认 80 端口。HTTPS 需要 CA 证书。' },
        ],
      },
    ],
  },

  /* ─── 11. 数据库系统原理 ─── */
  {
    id: 'database', category: 'systems', seq: 11, domain: 'cs',
    name: '数据库系统原理',
    description: '掌握关系模型、SQL、范式设计、事务管理与查询优化',
    icon: 'Database', difficulty: 'intermediate', prerequisites: ['数据结构', '程序设计'],
    color: '#336791',
    topics: [
      {
        id: 'db-relational', name: '关系数据库', description: '关系模型、SQL、范式设计',
        concepts: [
          { id: 'db-model', name: '关系模型', description: '关系代数、元组演算、关系完整性约束', difficulty: 'beginner', prerequisites: [] },
          { id: 'db-sql', name: 'SQL 语言', description: 'DDL/DML/DCL、嵌套查询、连接、视图、事务', difficulty: 'intermediate', prerequisites: ['db-model'] },
          { id: 'db-norm', name: '关系数据库设计', description: '函数依赖、范式 1NF~BCNF、模式分解', difficulty: 'intermediate', prerequisites: ['db-sql'] },
        ],
        resources: [{ type: 'doc', title: 'SQL 从入门到精通' }, { type: 'exercise', title: 'SQL 练习题' }],
        codeExamples: [
          { title: '学生选课系统 SQL', description: '学生选课数据库建表与查询', language: 'sql',
            code: 'CREATE TABLE Student (sno CHAR(10) PRIMARY KEY, sname VARCHAR(20) NOT NULL, sdept VARCHAR(30));\nCREATE TABLE Course (cno CHAR(8) PRIMARY KEY, cname VARCHAR(50), ccredit DECIMAL(3,1));\nCREATE TABLE SC (sno CHAR(10), cno CHAR(8), grade DECIMAL(5,2), PRIMARY KEY(sno,cno));\n\n-- 查询选修数据库原理且成绩>90的学生\nSELECT s.sname, sc.grade\nFROM Student s JOIN SC sc ON s.sno=sc.sno JOIN Course c ON sc.cno=c.cno\nWHERE c.cname="数据库原理" AND sc.grade>=90\nORDER BY sc.grade DESC;' },
        ],
      },
      {
        id: 'db-advanced', name: '数据库高级', description: '索引、事务、并发控制、NoSQL',
        concepts: [
          { id: 'db-index', name: '索引与存储', description: 'B+ 树索引、哈希索引、聚簇索引、存储引擎', difficulty: 'intermediate', prerequisites: ['db-sql'] },
          { id: 'db-transaction', name: '事务管理', description: 'ACID、并发控制、封锁协议、隔离级别', difficulty: 'advanced', prerequisites: ['db-sql'] },
          { id: 'db-nosql', name: 'NoSQL 数据库', description: '键值/文档/列族/图数据库、CAP 理论', difficulty: 'intermediate', prerequisites: ['db-index'] },
        ],
        resources: [{ type: 'doc', title: '数据库索引原理' }, { type: 'mindmap', title: '数据库体系全景' }],
        presetQuestions: [
          { q: '什么是事务 ACID？', a: '原子性(Atomicity)：事务不可分割；一致性(Consistency)：事务前后数据一致；隔离性(Isolation)：并发事务互不干扰；持久性(Durability)：提交后永久保存。' },
          { q: '数据库范式的作用？', a: '消除数据冗余和更新异常。1NF 列不可分，2NF 消除部分依赖，3NF 消除传递依赖，BCNF 消除主属性对候选码的部分依赖。' },
        ],
      },
    ],
  },

  /* ==================================================================
   * 三、软件工程（2门）
   * ================================================================== */

  /* ─── 12. 软件工程 ─── */
  {
    id: 'software-eng', category: 'software', seq: 12, domain: 'se',
    name: '软件工程',
    description: '掌握软件生命周期、需求分析、架构设计、项目管理与 DevOps',
    icon: 'GitCompare', difficulty: 'intermediate', prerequisites: ['程序设计基础'],
    color: '#FF6F00',
    topics: [
      {
        id: 'se-process', name: '软件过程与需求', description: '过程模型、需求工程、UML 建模',
        concepts: [
          { id: 'se-lifecycle', name: '软件生命周期', description: '瀑布、敏捷/Scrum、迭代、螺旋模型', difficulty: 'beginner', prerequisites: [] },
          { id: 'se-requirement', name: '需求工程', description: '需求获取、分析、规格说明、验证', difficulty: 'intermediate', prerequisites: ['se-lifecycle'] },
          { id: 'se-uml', name: 'UML 建模', description: '用例图、类图、时序图、状态图、活动图', difficulty: 'intermediate', prerequisites: ['se-requirement'] },
        ],
        resources: [{ type: 'doc', title: '软件工程实践指南' }, { type: 'mindmap', title: 'UML 图解' }],
      },
      {
        id: 'se-design', name: '架构设计与项目管理', description: '架构风格、设计模式、项目管理',
        concepts: [
          { id: 'se-arch', name: '软件架构', description: 'MVC/MVVM、微服务、分层架构、事件驱动', difficulty: 'intermediate', prerequisites: ['se-uml'] },
          { id: 'se-pattern', name: '设计模式', description: '单例、工厂、观察者、策略、适配器等模式', difficulty: 'intermediate', prerequisites: ['se-arch'] },
          { id: 'se-mgmt', name: '项目管理', description: '估算、进度管理、风险管理、CMMI', difficulty: 'advanced', prerequisites: ['se-arch'] },
          { id: 'se-devops', name: 'DevOps', description: 'CI/CD、持续交付、基础设施即代码', difficulty: 'advanced', prerequisites: ['se-mgmt'] },
        ],
        resources: [{ type: 'doc', title: '设计模式精讲' }, { type: 'video', title: '微服务架构' }],
        presetQuestions: [
          { q: '瀑布和敏捷开发的核心区别？', a: '瀑布是线性顺序模型，阶段划分明确，变更代价高；敏捷迭代增量开发，拥抱变化，团队自组织。' },
          { q: '什么是高内聚低耦合？', a: '高内聚指模块内部功能紧密相关；低耦合指模块间依赖弱。提高可维护性和复用性。' },
        ],
      },
    ],
  },

  /* ─── 13. 软件测试 ─── */
  {
    id: 'software-test', category: 'software', seq: 13, domain: 'se',
    name: '软件测试',
    description: '掌握黑盒/白盒测试方法、自动化测试框架与性能测试',
    icon: 'Target', difficulty: 'intermediate', prerequisites: ['软件工程'],
    color: '#D32F2F',
    topics: [
      {
        id: 'test-methods', name: '测试方法', description: '黑盒测试、白盒测试、测试设计',
        concepts: [
          { id: 'test-blackbox', name: '黑盒测试', description: '等价类划分、边界值分析、决策表、正交实验', difficulty: 'intermediate', prerequisites: [] },
          { id: 'test-whitebox', name: '白盒测试', description: '语句/分支/路径/条件覆盖、逻辑覆盖', difficulty: 'intermediate', prerequisites: ['test-blackbox'] },
          { id: 'test-level', name: '测试级别', description: '单元测试、集成测试、系统测试、验收测试', difficulty: 'beginner', prerequisites: ['test-blackbox'] },
        ],
        resources: [{ type: 'doc', title: '软件测试方法论' }],
      },
      {
        id: 'test-auto', name: '自动化与性能测试', description: '自动化测试框架、性能测试工具',
        concepts: [
          { id: 'test-auto-fw', name: '自动化测试', description: 'Selenium、PyTest/JUnit、数据驱动、TDD', difficulty: 'advanced', prerequisites: ['test-whitebox'] },
          { id: 'test-perf', name: '性能测试', description: '负载/压力测试、JMeter、吞吐量/延迟分析', difficulty: 'advanced', prerequisites: ['test-level'] },
          { id: 'test-mgmt', name: '测试管理', description: '测试计划、用例管理、缺陷生命周期、测试报告', difficulty: 'intermediate', prerequisites: ['test-level'] },
        ],
        resources: [{ type: 'doc', title: '自动化测试实战' }],
        codeExamples: [
          { title: 'PyTest 参数化测试', description: '使用 PyTest 对手机号验证函数进行参数化测试', language: 'python',
            code: 'import pytest\ndef is_valid_phone(phone: str) -> bool:\n    if not phone or len(phone) != 11 or not phone.isdigit(): return False\n    return phone.startswith(("13","14","15","17","18","19"))\n\nclass TestPhone:\n    def test_valid(self): assert is_valid_phone("13812345678") == True\n    def test_invalid_len(self): assert is_valid_phone("1234567890") == False\n    @pytest.mark.parametrize("p", ["13800000000","15912345678","18800001111"])\n    def test_multi(self, p): assert is_valid_phone(p) == True' },
        ],
        presetQuestions: [
          { q: '黑盒和白盒测试的区别？', a: '黑盒不看代码，从功能需求设计用例；白盒基于代码内部结构，覆盖执行路径。' },
          { q: '什么是 TDD？', a: '测试驱动开发：先写测试再写实现，红-绿-重构循环，确保代码可测试性和覆盖率。' },
        ],
      },
    ],
  },

  /* ==================================================================
   * 四、人工智能方向（8门）
   * ================================================================== */

  /* ─── 14. 离散数学 ─── */
  {
    id: 'discrete-math', category: 'ai', seq: 14, domain: 'math',
    name: '离散数学',
    description: '掌握数理逻辑、集合论、图论、代数系统与组合数学基础',
    icon: 'Layers', difficulty: 'intermediate', prerequisites: ['高中数学'],
    color: '#8E24AA',
    topics: [
      {
        id: 'dm-logic', name: '数理逻辑与集合论', description: '命题逻辑、谓词逻辑、集合与关系',
        concepts: [
          { id: 'dm-prop', name: '命题逻辑', description: '命题联结词、真值表、逻辑等价、推理规则', difficulty: 'intermediate', prerequisites: [] },
          { id: 'dm-pred', name: '谓词逻辑', description: '量词、谓词公式、前束范式', difficulty: 'intermediate', prerequisites: ['dm-prop'] },
          { id: 'dm-set', name: '集合与关系', description: '集合运算、关系性质、等价/偏序关系、函数', difficulty: 'beginner', prerequisites: ['dm-prop'] },
        ],
        resources: [{ type: 'doc', title: '离散数学入门' }],
      },
      {
        id: 'dm-graph', name: '图论与代数', description: '图、树、代数系统',
        concepts: [
          { id: 'dm-graph-theory', name: '图论', description: '欧拉图/哈密顿图、树、匹配、网络流、平面图', difficulty: 'intermediate', prerequisites: ['dm-set'] },
          { id: 'dm-algebra', name: '代数系统', description: '群/环/域、布尔代数、格、同态同构', difficulty: 'advanced', prerequisites: ['dm-set'] },
          { id: 'dm-combo', name: '组合数学', description: '排列组合、生成函数、容斥原理、鸽巢原理', difficulty: 'intermediate', prerequisites: ['dm-set'] },
        ],
        resources: [{ type: 'doc', title: '图论算法与应用' }],
        presetQuestions: [
          { q: '命题逻辑和谓词逻辑的区别？', a: '命题逻辑以原子命题为基本单位；谓词逻辑引入个体、谓词和量词，表达力更强。' },
          { q: '欧拉路径和哈密顿路径的区别？', a: '欧拉路径经过每条边一次，哈密顿路径经过每个顶点一次。前者关注边，后者关注点。' },
        ],
      },
    ],
  },

  /* ─── 15. 概率论与数理统计 ─── */
  {
    id: 'probability', category: 'ai', seq: 15, domain: 'math',
    name: '概率论与数理统计',
    description: '掌握概率基础、随机变量、参数估计与假设检验，为机器学习打基础',
    icon: 'Layers', difficulty: 'intermediate', prerequisites: ['高等数学'],
    color: '#00897B',
    topics: [
      {
        id: 'prob-basics', name: '概率基础', description: '概率定义、条件概率、随机变量',
        concepts: [
          { id: 'prob-fund', name: '概率基础', description: '样本空间、事件概率、条件概率、贝叶斯公式', difficulty: 'beginner', prerequisites: [] },
          { id: 'prob-rv', name: '随机变量', description: '离散/连续分布、分布函数、期望、方差', difficulty: 'intermediate', prerequisites: ['prob-fund'] },
          { id: 'prob-multi', name: '多维随机变量', description: '联合分布、边缘分布、协方差、相关系数', difficulty: 'intermediate', prerequisites: ['prob-rv'] },
        ],
        resources: [{ type: 'doc', title: '概率论核心概念' }],
      },
      {
        id: 'prob-stat', name: '数理统计', description: '参数估计、假设检验、回归分析',
        concepts: [
          { id: 'stats-est', name: '参数估计', description: '点估计（矩估计/MLE）、区间估计、估计量评价', difficulty: 'advanced', prerequisites: ['prob-multi'] },
          { id: 'stats-test', name: '假设检验', description: '显著性水平、t 检验、卡方检验、p 值', difficulty: 'advanced', prerequisites: ['stats-est'] },
          { id: 'stats-regress', name: '回归分析', description: '线性回归、多元回归、逻辑回归', difficulty: 'intermediate', prerequisites: ['prob-multi'] },
        ],
        resources: [{ type: 'doc', title: '数理统计与机器学习' }],
        presetQuestions: [
          { q: '贝叶斯公式的核心思想？', a: '利用先验概率和证据更新后验概率：P(A|B)=P(B|A)P(A)/P(B)。是机器学习和 AI 推理的数学基础。' },
          { q: '大数定律和中心极限定理的区别？', a: '大数定律说样本均值依概率收敛于期望；中心极限定理说样本均值的分布趋近正态分布。' },
        ],
      },
    ],
  },

  /* ─── 16. 人工智能导论 ─── */
  {
    id: 'ai-intro', category: 'ai', seq: 16, domain: 'ai',
    name: '人工智能导论',
    description: '概览 AI 各领域、问题求解、知识表示与推理',
    icon: 'Brain', difficulty: 'beginner', prerequisites: [],
    color: '#00BCD4',
    topics: [
      {
        id: 'ai-fund', name: 'AI 基础与搜索', description: 'AI 定义、问题求解、搜索算法',
        concepts: [
          { id: 'ai-def', name: 'AI 概述', description: 'AI 定义与目标、图灵测试、发展简史、三大学派', difficulty: 'beginner', prerequisites: [] },
          { id: 'ai-search', name: '问题求解与搜索', description: '状态空间、盲目搜索、启发式搜索（A*）', difficulty: 'intermediate', prerequisites: ['ai-def'] },
        ],
        resources: [{ type: 'doc', title: '人工智能导论' }],
        codeExamples: [
          { title: 'A* 搜索算法', description: '实现 A* 算法求解网格最短路径', language: 'python',
            code: 'import heapq\ndef astar(start, goal, h, neighbors):\n    open_set = [(0+h(start,goal), 0, start, [start])]\n    closed = set()\n    while open_set:\n        f, g, cur, path = heapq.heappop(open_set)\n        if cur == goal: return path, g\n        if cur in closed: continue\n        closed.add(cur)\n        for nxt, cost in neighbors(cur):\n            if nxt not in closed:\n                ng = g + cost\n                heapq.heappush(open_set, (ng+h(nxt,goal), ng, nxt, path+[nxt]))\n    return None, float("inf")\n\ndef h(a,b): return abs(a[0]-b[0])+abs(a[1]-b[1])\ndef nbrs(pos):\n    D = [(0,1),(1,0),(0,-1),(-1,0)]\n    return [((pos[0]+d[0],pos[1]+d[1]),1) for d in D]\n\npath, cost = astar((0,0),(3,3),h,nbrs)\nprint(f"Path: {path}, Cost: {cost}")',
            output: 'Path: [(0,0), (0,1), (0,2), (0,3), (1,3), (2,3), (3,3)], Cost: 6' },
        ],
      },
      {
        id: 'ai-overview', name: 'AI 全领域概览', description: '知识表示、AI 各子领域入门',
        concepts: [
          { id: 'ai-knowledge', name: '知识与推理', description: '谓词逻辑表示、产生式系统、框架表示、语义网络', difficulty: 'intermediate', prerequisites: ['ai-search'] },
          { id: 'ai-subfields', name: 'AI 子领域速览', description: 'ML、DL、NLP、CV、RL、LLM 领域简介', difficulty: 'beginner', prerequisites: ['ai-def'] },
          { id: 'ai-ethics', name: 'AI 伦理与安全', description: 'AI 对齐、偏见公平、可解释性、隐私保护', difficulty: 'beginner', prerequisites: ['ai-subfields'] },
        ],
        resources: [{ type: 'doc', title: 'AI 发展前沿报告' }, { type: 'mindmap', title: 'AI 知识体系全景图' }],
        presetQuestions: [
          { q: '什么是图灵测试？', a: '人类通过文本与机器对话，若无法分辨是否为机器，则机器通过测试。但图灵测试不能衡量真正的理解能力。' },
          { q: 'AI、ML 和 DL 的关系？', a: 'AI 是最大范畴，ML 是 AI 子集（数据驱动学习），DL 是 ML 子集（多层神经网络）。' },
        ],
      },
    ],
  },

  /* ─── 17. 机器学习 ─── */
  {
    id: 'ai-ml', category: 'ai', seq: 17, domain: 'ai', subfield: 'ml',
    name: '机器学习',
    description: '从零掌握监督学习、无监督学习、模型评估与特征工程核心方法',
    icon: 'Brain', difficulty: 'beginner', prerequisites: ['Python 基础', '概率统计基础'],
    color: '#00d4ff',
    topics: [
      {
        id: 'ml-intro', name: '机器学习概述', description: '机器学习的定义、分类与基本流程',
        concepts: [
          { id: 'ml-def', name: '机器学习定义', description: '利用数据驱动模型自动改进性能的方法', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-types', name: '学习范式分类', description: '监督学习、无监督学习、半监督学习、强化学习', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-flow', name: '机器学习流程', description: '数据采集→清洗→特征工程→训练→评估→部署', difficulty: 'beginner', prerequisites: [] },
        ],
        resources: [{ type: 'doc', title: '机器学习入门指南' }, { type: 'mindmap', title: '学习范式对比图' }, { type: 'flowchart', title: 'ML 完整流程图' }],
        flowStages: mlFlowStages,
        codeExamples: sharedCodeExamples['model-training'],
        presetQuestions: [
          { q: '什么是监督学习和无监督学习的区别？', a: '监督学习使用带标签的数据训练模型预测目标变量；无监督学习使用无标签数据发现数据内在结构。' },
          { q: '如何判断模型是否过拟合？', a: '过拟合表现为训练集表现好但测试集差。可通过学习曲线观察训练/验证 loss 差距，或通过交叉验证评估泛化能力。' },
        ],
        mindMap: [{ id: 'mm-ml-root', label: '机器学习', children: [
          { id: 'mm-ml-sup', label: '监督学习', children: [{ id: 'mm-ml-reg', label: '回归' }, { id: 'mm-ml-cls', label: '分类: KNN/决策树/SVM' }, { id: 'mm-ml-ens', label: '集成: 随机森林/XGBoost' }] },
          { id: 'mm-ml-unsup', label: '无监督学习', children: [{ id: 'mm-ml-clu', label: '聚类: K-Means/DBSCAN' }, { id: 'mm-ml-dm', label: '降维: PCA/t-SNE' }] },
          { id: 'mm-ml-eval', label: '模型评估', children: [{ id: 'mm-ml-metric', label: '指标: 准确率/F1/AUC' }, { id: 'mm-ml-cv', label: '交叉验证' }, { id: 'mm-ml-tuning', label: '调参' }] },
        ]}],
      },
      {
        id: 'ml-supervised', name: '监督学习算法', description: 'KNN、决策树、SVM、集成学习等核心算法',
        concepts: [
          { id: 'ml-knn', name: 'K-近邻算法', description: '基于样本间距离进行投票分类', difficulty: 'beginner', prerequisites: ['ml-def'] },
          { id: 'ml-dt', name: '决策树', description: '基于信息增益/基尼系数进行树形决策', difficulty: 'intermediate', prerequisites: ['ml-def'] },
          { id: 'ml-svm', name: '支持向量机', description: '通过寻找最大间隔超平面进行分类', difficulty: 'advanced', prerequisites: ['ml-def'] },
          { id: 'ml-rf', name: '随机森林', description: '集成多棵决策树进行投票/平均', difficulty: 'intermediate', prerequisites: ['ml-dt'] },
          { id: 'ml-xgb', name: 'XGBoost', description: '基于梯度提升的高效集成学习框架', difficulty: 'advanced', prerequisites: ['ml-rf'] },
        ],
        resources: [{ type: 'doc', title: '监督学习算法对比' }, { type: 'exercise', title: '分类算法练习题' }],
        codeExamples: [
          { title: '决策树分类', description: '使用决策树对鸢尾花数据集分类', language: 'python',
            code: `from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\ndata = load_iris()\nX, y = data.data, data.target\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\ndt = DecisionTreeClassifier(max_depth=3, random_state=42)\ndt.fit(X_train, y_train)\ny_pred = dt.predict(X_test)\nprint(classification_report(y_test, y_pred, target_names=data.target_names))`,
            output: 'precision   recall  f1-score\nsetosa       1.00     1.00     1.00\nversicolor   1.00     0.90     0.95\nvirginica    0.92     1.00     0.96\naccuracy                     0.97' },
        ],
        presetQuestions: [
          { q: 'KNN 中 K 值怎么选择？', a: 'K 值过小容易过拟合（受噪声影响大），K 值过大容易欠拟合（类别界限模糊）。一般从 3 开始尝试，配合交叉验证选择最优 K 值。' },
        ],
      },
      {
        id: 'ml-unsupervised', name: '无监督学习', description: '聚类分析、降维与密度估计',
        concepts: [
          { id: 'ml-kmeans', name: 'K-Means 聚类', description: '基于距离的迭代聚类算法', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-dbscan', name: 'DBSCAN 聚类', description: '基于密度的聚类，可发现任意形状簇', difficulty: 'intermediate', prerequisites: [] },
          { id: 'ml-pca', name: '主成分分析 (PCA)', description: '通过正交变换将数据从高维映射到低维', difficulty: 'intermediate', prerequisites: [] },
        ],
        resources: [{ type: 'doc', title: '聚类算法对比分析' }, { type: 'code', title: 'K-Means 实现' }, { type: 'mindmap', title: '无监督学习全景图' }],
        presetQuestions: [
          { q: 'K-Means 的 K 值怎么确定？', a: '常用肘部法：绘制 K 值与 SSE 曲线，选择拐点处的 K 值。也可使用轮廓系数评估聚类效果。' },
        ],
      },
    ],
  },

  /* ─── 18. 深度学习 ─── */
  {
    id: 'ai-dl', category: 'ai', seq: 18, domain: 'ai', subfield: 'dl',
    name: '深度学习',
    description: '从神经网络基础到 CNN、RNN、Transformer 架构',
    icon: 'Layers', difficulty: 'intermediate', prerequisites: ['机器学习基础', '线性代数'],
    color: '#7c3aed',
    topics: [
      {
        id: 'dl-basics', name: '神经网络基础', description: '感知机、多层神经网络、反向传播与激活函数',
        concepts: [
          { id: 'dl-perceptron', name: '感知机', description: '单层神经网络，线性分类器', difficulty: 'beginner', prerequisites: [] },
          { id: 'dl-mlp', name: '多层感知机 (MLP)', description: '含隐藏层的全连接神经网络', difficulty: 'intermediate', prerequisites: ['dl-perceptron'] },
          { id: 'dl-backprop', name: '反向传播', description: '通过链式法则计算梯度，更新网络参数', difficulty: 'advanced', prerequisites: ['dl-mlp'] },
          { id: 'dl-activation', name: '激活函数', description: 'ReLU、Sigmoid、Tanh、Softmax 等', difficulty: 'beginner', prerequisites: [] },
        ],
        resources: [{ type: 'doc', title: '神经网络入门' }, { type: 'code', title: 'NumPy 实现 MLP' }],
        codeExamples: [
          { title: 'NumPy 单层神经网络', description: '从零实现一个神经元的训练', language: 'python',
            code: 'import numpy as np\nclass Neuron:\n    def __init__(self, n_inputs):\n        self.w = np.random.randn(n_inputs)*0.01; self.b = 0\n    def sigmoid(self, x): return 1/(1+np.exp(-np.clip(x,-500,500)))\n    def forward(self, x): return self.sigmoid(np.dot(x,self.w)+self.b)\n    def train(self, X, y, lr=0.1, epochs=100):\n        for epoch in range(epochs):\n            out = self.forward(X)\n            err = y - out\n            self.w += lr * np.dot(X.T, err*out*(1-out))\n            self.b += lr * np.mean(err*out*(1-out))\n            if epoch % 20 == 0: print(f"Epoch {epoch}: Loss = {np.mean(err**2):.6f}")' },
        ],
        mindMap: [{ id: 'mm-dl-root', label: '深度学习', children: [
          { id: 'mm-dl-basic', label: '神经网络基础', children: [{ id: 'mm-dl-perc', label: '感知机' }, { id: 'mm-dl-bp', label: '反向传播' }, { id: 'mm-dl-act', label: '激活函数' }] },
          { id: 'mm-dl-cnn', label: 'CNN', children: [{ id: 'mm-dl-conv', label: '卷积层' }, { id: 'mm-dl-pool', label: '池化层' }, { id: 'mm-dl-fc', label: '全连接层' }] },
          { id: 'mm-dl-rnn', label: 'RNN', children: [{ id: 'mm-dl-lstm', label: 'LSTM' }, { id: 'mm-dl-gru', label: 'GRU' }] },
          { id: 'mm-dl-trans', label: 'Transformer', children: [{ id: 'mm-dl-attn', label: '自注意力' }, { id: 'mm-dl-mha', label: '多头注意力' }, { id: 'mm-dl-ffn', label: '前馈网络' }] },
        ]}],
      },
      {
        id: 'dl-cnn', name: '卷积神经网络', description: '卷积层、池化层、经典 CNN 架构',
        concepts: [
          { id: 'dl-conv', name: '卷积运算', description: '卷积核在输入上滑动提取局部特征', difficulty: 'intermediate', prerequisites: ['dl-mlp'] },
          { id: 'dl-pooling', name: '池化层', description: '下采样操作：最大池化、平均池化', difficulty: 'intermediate', prerequisites: ['dl-conv'] },
          { id: 'dl-classic-cnn', name: '经典架构', description: 'LeNet、AlexNet、VGG、ResNet', difficulty: 'advanced', prerequisites: ['dl-conv', 'dl-pooling'] },
        ],
        resources: [{ type: 'doc', title: 'CNN 架构演化' }, { type: 'code', title: 'PyTorch CNN 实现' }],
        flowStages: dlFlowStages,
      },
    ],
  },

  /* ─── 19. 自然语言处理 ─── */
  {
    id: 'ai-nlp', category: 'ai', seq: 19, domain: 'ai', subfield: 'nlp',
    name: '自然语言处理',
    description: '文本处理、词向量、序列模型、大语言模型技术',
    icon: 'FileText', difficulty: 'intermediate', prerequisites: ['深度学习', 'Python 编程'],
    color: '#06d6a0',
    topics: [
      {
        id: 'nlp-basics', name: 'NLP 基础', description: '分词、词性标注、命名实体识别',
        concepts: [
          { id: 'nlp-tokenization', name: '分词技术', description: '基于规则/统计/神经网络的分词方法', difficulty: 'beginner', prerequisites: [] },
          { id: 'nlp-embedding', name: '词向量', description: 'Word2Vec、GloVe、FastText 分布式表示', difficulty: 'intermediate', prerequisites: ['nlp-tokenization'] },
          { id: 'nlp-seq', name: '序列标注', description: 'POS Tagging、NER、Chunking', difficulty: 'intermediate', prerequisites: ['nlp-tokenization'] },
        ],
        flowStages: nlpFlowStages,
        resources: [{ type: 'doc', title: 'NLP 入门教程' }, { type: 'code', title: 'Word2Vec 实现' }],
      },
      {
        id: 'nlp-transformer', name: 'Transformer 与预训练模型', description: '自注意力机制、BERT、GPT 系列',
        concepts: [
          { id: 'nlp-attention', name: '注意力机制', description: 'Query-Key-Value 注意力计算', difficulty: 'advanced', prerequisites: ['nlp-seq'] },
          { id: 'nlp-bert', name: 'BERT', description: '双向编码器表示，MLM+NSP 预训练', difficulty: 'advanced', prerequisites: ['nlp-attention'] },
          { id: 'nlp-gpt', name: 'GPT 系列', description: '自回归语言模型，Scaling Law', difficulty: 'advanced', prerequisites: ['nlp-attention'] },
        ],
        resources: [{ type: 'doc', title: 'Transformer 精讲' }, { type: 'mindmap', title: '预训练模型演进' }],
        codeExamples: [
          { title: 'Scaled Dot-Product Attention', description: '实现单头自注意力计算', language: 'python',
            code: 'import torch\nimport torch.nn.functional as F\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = K.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)\n    if mask is not None: scores = scores.masked_fill(mask == 0, float("-inf"))\n    attn = F.softmax(scores, dim=-1)\n    return torch.matmul(attn, V), attn\n\nQ = torch.randn(2, 8, 16, 64)\nK = torch.randn(2, 8, 16, 64)\nV = torch.randn(2, 8, 16, 64)\noutput, attn = scaled_dot_product_attention(Q, K, V)\nprint(f"Output: {output.shape}, Attn: {attn.shape}")',
            output: 'Output: torch.Size([2, 8, 16, 64]), Attn: torch.Size([2, 8, 16, 16])' },
        ],
      },
    ],
  },

  /* ─── 20. 计算机视觉 ─── */
  {
    id: 'ai-cv', category: 'ai', seq: 20, domain: 'ai', subfield: 'cv',
    name: '计算机视觉',
    description: '图像分类、目标检测、语义分割、生成模型',
    icon: 'Eye', difficulty: 'intermediate', prerequisites: ['深度学习', '线性代数'],
    color: '#f59e0b',
    topics: [
      {
        id: 'cv-classification', name: '图像分类', description: '图像分类网络与迁移学习',
        concepts: [
          { id: 'cv-classic-net', name: '经典分类网络', description: 'AlexNet, VGG, ResNet, EfficientNet', difficulty: 'intermediate', prerequisites: ['dl-conv'] },
          { id: 'cv-transfer', name: '迁移学习', description: '利用预训练模型微调到新任务', difficulty: 'intermediate', prerequisites: ['cv-classic-net'] },
        ],
        resources: [{ type: 'doc', title: '图像分类实战' }, { type: 'code', title: 'ResNet 实现' }],
      },
      {
        id: 'cv-detection', name: '目标检测', description: '两阶段与单阶段检测算法',
        concepts: [
          { id: 'cv-rcnn', name: 'Faster R-CNN', description: '两阶段检测：RPN + ROI Head', difficulty: 'advanced', prerequisites: ['cv-classic-net'] },
          { id: 'cv-yolo', name: 'YOLO 系列', description: '单阶段实时检测算法', difficulty: 'advanced', prerequisites: ['cv-classic-net'] },
        ],
        resources: [{ type: 'doc', title: '目标检测综述' }, { type: 'code', title: 'YOLOv8 使用教程' }],
      },
    ],
  },

  /* ─── 21. 强化学习 / 生成式AI ─── */
  {
    id: 'ai-rl', category: 'ai', seq: 21, domain: 'ai', subfield: 'rl',
    name: '强化学习 / 生成式AI',
    description: 'MDP、Q-Learning、策略梯度、深度强化学习与生成式模型',
    icon: 'Zap', difficulty: 'advanced', prerequisites: ['机器学习基础', '概率论'],
    color: '#f43f5e',
    topics: [
      {
        id: 'rl-basics', name: '强化学习基础', description: 'MDP、贝尔曼方程、价值迭代',
        concepts: [
          { id: 'rl-mdp', name: '马尔可夫决策过程', description: '状态、动作、奖励、转移概率的数学框架', difficulty: 'intermediate', prerequisites: [] },
          { id: 'rl-bellman', name: '贝尔曼方程', description: '价值函数与最优策略的递归关系', difficulty: 'advanced', prerequisites: ['rl-mdp'] },
        ],
        resources: [{ type: 'doc', title: 'RL 入门' }, { type: 'mindmap', title: 'RL 算法分类' }],
      },
      {
        id: 'rl-deep', name: '深度强化学习与生成式AI', description: 'DQN、PPO、GAN、扩散模型',
        concepts: [
          { id: 'rl-dqn', name: 'Deep Q-Network', description: '用神经网络近似 Q 函数', difficulty: 'advanced', prerequisites: ['rl-bellman'] },
          { id: 'rl-ppo', name: 'PPO', description: '近端策略优化，稳定高效的策略梯度方法', difficulty: 'advanced', prerequisites: ['rl-dqn'] },
          { id: 'gen-gan', name: '生成对抗网络', description: '生成器与判别器对抗训练、GAN 变体', difficulty: 'advanced', prerequisites: ['dl-mlp'] },
          { id: 'gen-diffusion', name: '扩散模型', description: '前向加噪与反向去噪、Stable Diffusion', difficulty: 'advanced', prerequisites: ['dl-mlp'] },
        ],
        resources: [{ type: 'doc', title: '深度强化学习' }, { type: 'doc', title: '生成式模型综述' }],
        codeExamples: [
          { title: 'DQN 核心逻辑', description: '简化的 Deep Q-Network 实现', language: 'python',
            code: 'import numpy as np\nclass SimpleDQN:\n    def __init__(self, state_dim, action_dim, gamma=0.99):\n        self.w = np.random.randn(state_dim, action_dim)*0.01\n        self.gamma = gamma\n    def predict(self, s): return np.dot(s, self.w)\n    def update(self, s, a, r, ns, done):\n        q = self.predict(s)\n        target = r + (0 if done else self.gamma * np.max(self.predict(ns)))\n        self.w[a] += 0.001 * (target - q[a]) * s\n    def act(self, s, eps=0.1):\n        return np.random.randint(self.w.shape[1]) if np.random.random()<eps else np.argmax(self.predict(s))' },
        ],
        presetQuestions: [
          { q: '什么是 ReAct 框架？', a: 'ReAct (Reasoning + Acting) 让模型交替进行推理和行动：思考当前状态→决定执行动作→观察结果→继续推理。' },
        ],
      },
    ],
  },

  /* ==================================================================
   * 五、前沿与应用（3门）
   * ================================================================== */

  /* ─── 22. 计算机图形学 ─── */
  {
    id: 'computer-graphics', category: 'frontier', seq: 22, domain: 'cs',
    name: '计算机图形学',
    description: '掌握图形渲染管线、三维变换、光照模型与动画技术',
    icon: 'Monitor', difficulty: 'advanced', prerequisites: ['线性代数', 'C++ 程序设计'],
    color: '#2E7D32',
    topics: [
      {
        id: 'cg-basics', name: '图形学基础', description: '图形管线、二维/三维变换',
        concepts: [
          { id: 'cg-pipeline', name: '图形渲染管线', description: '顶点处理、光栅化、片段处理、输出合并', difficulty: 'beginner', prerequisites: [] },
          { id: 'cg-transform', name: '几何变换', description: '仿射变换、投影变换、视口变换、齐次坐标', difficulty: 'intermediate', prerequisites: ['cg-pipeline'] },
          { id: 'cg-curve', name: '曲线与曲面', description: 'Bézier 曲线、B-样条、NURBS', difficulty: 'advanced', prerequisites: ['cg-transform'] },
        ],
        resources: [{ type: 'doc', title: '计算机图形学入门' }],
      },
      {
        id: 'cg-advanced', name: '高级渲染', description: '光照、纹理、光线追踪',
        concepts: [
          { id: 'cg-lighting', name: '光照与着色', description: 'Phong/Blinn-Phong 模型、着色频率、着色器', difficulty: 'advanced', prerequisites: ['cg-transform'] },
          { id: 'cg-texture', name: '纹理映射', description: 'UV 映射、Mipmap、法线贴图、环境贴图', difficulty: 'intermediate', prerequisites: ['cg-lighting'] },
          { id: 'cg-raytrace', name: '光线追踪', description: '光线求交、路径追踪、全局光照', difficulty: 'advanced', prerequisites: ['cg-lighting'] },
        ],
        resources: [{ type: 'doc', title: '光线追踪实战' }],
        presetQuestions: [
          { q: '渲染管线的主要阶段？', a: '顶点处理→光栅化→片段处理→输出合并。现代 GPU 使用可编程着色器取代固定管线。' },
          { q: 'Phong 光照模型组成？', a: '环境光(Ambient)+漫反射(Diffuse)+镜面高光(Specular)。Blinn-Phong 用半角向量替代反射向量计算高光。' },
        ],
      },
    ],
  },

  /* ─── 23. 信息安全基础 ─── */
  {
    id: 'security', category: 'frontier', seq: 23, domain: 'cs',
    name: '信息安全基础',
    description: '掌握密码学、身份认证、Web 安全与系统安全核心知识',
    icon: 'Shield', difficulty: 'intermediate', prerequisites: ['计算机网络', '操作系统'],
    color: '#C62828',
    topics: [
      {
        id: 'sec-crypto', name: '密码学基础', description: '加密算法、哈希、数字签名',
        concepts: [
          { id: 'sec-symmetric', name: '对称加密', description: 'AES、DES、流密码/分组密码、加密模式', difficulty: 'intermediate', prerequisites: [] },
          { id: 'sec-asymmetric', name: '非对称加密', description: 'RSA、ECC、密钥交换（DH）、PKI', difficulty: 'advanced', prerequisites: ['sec-symmetric'] },
          { id: 'sec-hash', name: '哈希与数字签名', description: 'MD5/SHA 系列、HMAC、DSA、数字证书', difficulty: 'intermediate', prerequisites: ['sec-asymmetric'] },
        ],
        resources: [{ type: 'doc', title: '密码学入门' }],
      },
      {
        id: 'sec-web', name: 'Web 安全与系统防护', description: 'Web 漏洞、系统安全、隐私保护',
        concepts: [
          { id: 'sec-web-vuln', name: 'Web 安全漏洞', description: 'SQL 注入、XSS、CSRF、SSRF、OWASP Top 10', difficulty: 'advanced', prerequisites: ['sec-hash'] },
          { id: 'sec-sys', name: '系统安全', description: '缓冲区溢出、提权、Rootkit、安全加固', difficulty: 'advanced', prerequisites: ['sec-web-vuln'] },
          { id: 'sec-privacy', name: '隐私保护', description: '数据脱敏、差分隐私、同态加密、联邦学习', difficulty: 'advanced', prerequisites: ['sec-hash'] },
        ],
        resources: [{ type: 'doc', title: 'Web 安全攻防实战' }],
        presetQuestions: [
          { q: '对称和非对称加密的区别？', a: '对称加密加解密使用同一密钥，速度快适合大量数据；非对称加密用公钥/私钥对，安全性高适合密钥交换和数字签名。' },
          { q: '什么是 OWASP Top 10？', a: 'OWASP 发布的十大 Web 安全风险，包括注入、失效身份认证、XSS、失效访问控制等。' },
        ],
      },
    ],
  },

  /* ─── 24. 大数据与云计算 ─── */
  {
    id: 'big-data-cloud', category: 'frontier', seq: 24, domain: 'advance',
    name: '大数据与云计算',
    description: '掌握 Hadoop 生态、Spark、流式计算、容器化与云原生技术',
    icon: 'Cloud', difficulty: 'advanced', prerequisites: ['数据库', '操作系统', '计算机网络'],
    color: '#00695C',
    topics: [
      {
        id: 'bd-basics', name: '大数据技术', description: 'Hadoop、MapReduce、Spark、流式计算',
        concepts: [
          { id: 'bd-hadoop', name: 'Hadoop 生态', description: 'HDFS 架构、MapReduce 编程模型、YARN 资源管理', difficulty: 'intermediate', prerequisites: [] },
          { id: 'bd-spark', name: 'Spark 计算引擎', description: 'RDD/Dataset/DataFrame、Spark SQL、MLlib', difficulty: 'advanced', prerequisites: ['bd-hadoop'] },
          { id: 'bd-stream', name: '流式计算', description: 'Kafka、Flink、Storm、流批一体', difficulty: 'advanced', prerequisites: ['bd-spark'] },
          { id: 'bd-nosql', name: 'NoSQL 与数据仓库', description: 'HBase、MongoDB、Cassandra、Hive 数据仓库', difficulty: 'intermediate', prerequisites: ['bd-hadoop'] },
        ],
        resources: [{ type: 'doc', title: 'Hadoop 权威指南' }, { type: 'code', title: 'Spark ML 示例' }],
        codeExamples: [
          { title: 'MapReduce WordCount', description: '模拟 MapReduce 实现单词计数', language: 'python',
            code: 'from collections import defaultdict\ndef mapper(doc):\n    for word in doc.lower().split():\n        yield (word.strip(".,!?;:"\""), 1)\ndef reducer(word, counts):\n    return (word, sum(counts))\n\ndocs = ["Hello world hello","MapReduce is powerful","World of big data"]\nmapped = [kv for doc in docs for kv in mapper(doc)]\nshuffled = defaultdict(list)\nfor w,c in mapped: shuffled[w].append(c)\nresult = [reducer(w,cs) for w,cs in shuffled.items()]\nfor w,c in sorted(result, key=lambda x:-x[1]):\n    print(f"{w}: {c}")',
            output: 'hello: 2\nworld: 2\nis: 1\nof: 1\ndata: 1\nmapreduce: 1\npowerful: 1\nbig: 1' },
        ],
      },
      {
        id: 'cloud-native', name: '云计算与云原生', description: '云服务模型、容器云、云原生架构',
        concepts: [
          { id: 'cloud-service', name: '云计算基础', description: 'IaaS/PaaS/SaaS、虚拟化、公有/私有/混合云', difficulty: 'beginner', prerequisites: [] },
          { id: 'cloud-container', name: '容器与编排', description: 'Docker 容器、Kubernetes 架构、Pod/Service/Deployment', difficulty: 'advanced', prerequisites: ['cloud-service'] },
          { id: 'cloud-native-tech', name: '云原生生态', description: '微服务、服务网格 Istio、声明式 API、Serverless', difficulty: 'advanced', prerequisites: ['cloud-container'] },
        ],
        resources: [{ type: 'doc', title: 'Kubernetes 入门实战' }, { type: 'mindmap', title: '云原生技术全景' }],
        presetQuestions: [
          { q: 'HDFS 和 MapReduce 的作用？', a: 'HDFS 是分布式文件系统，提供高吞吐数据存储；MapReduce 是分布式计算框架，将计算推向数据。' },
          { q: 'Docker 和虚拟机的区别？', a: 'Docker 容器共享宿主机内核，轻量级秒级启动；虚拟机包含完整 OS，资源隔离更强但开销大。' },
        ],
      },
    ],
  },
]

/* ─── 预设问答基础模板（场景感知） ─── */

export const scenarioAnswerTemplates: Record<string, (q: string, subMode?: string) => string> = {
  'preview': (q, subMode) => {
    if (subMode === 'case-intro') {
      return `## 通过案例理解\n\n关于「${q}」，我们用一个生活中的例子来理解：\n\n### 场景类比\n> 想象一下你在厨房做菜的过程...\n\n### 核心要点\n1. **直观理解** — 不需要公式也能明白\n2. **实际联系** — 和你已知的概念关联起来\n3. **学习路径** — 接下来需要掌握哪些基础知识\n\n**小提示**：这个知识点在后续学习中会反复出现，先建立直觉很重要。`
    }
    return `## 概念速览\n\n### 它的核心思想\n「${q}」的本质其实很简单——让我们用最直白的语言来解释。\n\n### 关键要点\n1. **它是什么** — 定义和核心特征\n2. **为什么重要** — 在实际中的应用价值\n3. **如何掌握** — 推荐的学习路径\n\n### 前置知识\n在深入学习之前，建议先了解：\n- ✅ 基础概念\n- ✅ 相关预备知识\n\n> 💡 预习阶段不需要完全理解，建立整体印象即可。`
  },
  'inclass': (q, subMode) => {
    if (subMode === 'catch-up') {
      return `## 重新梳理\n\n刚才讲的「${q}」部分，我们换个角度重新理解：\n\n### 换个说法\n不要看公式，先理解思路：\n\n**核心思想**：...\n\n### 分步拆解\n1. **第一步** — 我们想解决什么问题？\n2. **第二步** — 怎么解决（直观理解）？\n3. **第三步** — 数学上怎么表示（公式）？\n\n### 课堂要点速记\n| 关键点 | 说明 |\n|--------|------|\n| 核心概念 | ... |\n| 推导关键 | ... |\n| 注意陷阱 | ... |\n\n> 不着急，这个概念确实需要多花点时间。现在清楚了吗？`
    }
    return `## 快速解答\n\n关于「${q}」：\n\n**一句话解释**：...\n\n### 核心要点\n1. **定义** — 简洁准确的定义\n2. **关键** — 理解这个概念的切入点\n3. **注意** — 常见的理解误区\n\n> 如果还有疑问，随时可以切换"跟不上了"模式，我会更详细地重新讲解。`
  },
  'homework': (q, subMode) => {
    if (subMode === 'debug-help') {
      return `## Bug 调试分析\n\n让我看看「${q}」这段代码的问题：\n\n### 错误定位\n通过分析，可能的问题出在：\n\n1. **问题一** — 具体描述\n2. **问题二** — 具体描述\n\n### 修复方案\n\`\`\`python\n# 修改后的代码\ndef fixed_code():\n    pass\n\`\`\`\n\n### 预防建议\n- 建议在编写时注意...\n- 可以使用调试工具逐步执行\n\n> 需要我进一步解释修复原理吗？`
    }
    if (subMode === 'report-guide') {
      return `## 实验报告指导\n\n关于「${q}」，以下是规范的实验报告结构：\n\n### 实验报告模板\n1. **实验目的** — 明确本次实验要掌握的内容\n2. **实验环境** — 硬件配置、软件版本\n3. **实验步骤** — 分步记录操作过程\n4. **结果分析** — 展示实验结果并分析\n5. **总结与反思** — 遇到的问题和收获\n\n### 格式要求\n- 代码需要添加注释说明\n- 图表要有标题和编号\n- 结论要基于数据支持\n\n> 需要我帮你填充某个具体部分吗？`
    }
    return `## 代码辅导\n\n关于「${q}」：\n\n### 思路分析\n要解决这个问题，我们需要：\n\n1. **理解需求** — 明确输入和期望输出\n2. **设计方案** — 选择合适的算法/工具\n3. **逐步实现** — 分步编写代码\n\n### 参考代码\n\`\`\`python\n# 核心实现\ndef solution():\n    pass\n\`\`\`\n\n### 代码说明\n- **关键函数** — 作用和参数\n- **注意事项** — 边界条件和异常处理`
  },
  'exam': (q, subMode) => {
    if (subMode === 'project-guide') {
      return `## 大作业全流程指导\n\n关于「${q}」：\n\n### 项目选题建议\n1. **选题方向** — 选择难度适中、感兴趣的方向\n2. **可行性评估** — 数据是否可得、技术栈是否熟悉\n\n### 实施流程\n1. **需求分析** → 2. **数据准备** → 3. **模型构建** → 4. **评估优化** → 5. **报告撰写**\n\n### 评分要点\n| 评分项 | 权重 | 注意事项 |\n|--------|------|----------|\n| 选题创新 | 20% | 有一定新意 |\n| 工作量 | 30% | 数据量、模型复杂度 |\n| 结果分析 | 30% | 深入分析而非堆砌 |\n| 报告规范 | 20% | 结构完整、格式规范 |\n\n> 需要我帮你梳理具体某个环节吗？`
    }
    return `## 考点解析\n\n关于「${q}」：\n\n### 考点定位\n这是一个**高频/核心**考点，在考试中通常以**选择/简答/计算**形式出现。\n\n### 核心要点\n1. **定义** — 标准表述\n2. **关键公式/原理** — 必须掌握\n3. **常见题型** — 典型考法\n\n### 答题模板\n\`\`\`\n答题思路：\n1. 先给出定义\n2. 解释原理/推导\n3. 举例说明\n\`\`\`\n\n### 易错提醒\n- ❌ 常见错误一\n- ❌ 常见错误二\n\n> 需要我做几道同类题目帮你巩固吗？`
  },
}
