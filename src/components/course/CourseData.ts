/* ===================================================================
 * EduMind — AI 课程数据集
 * 涵盖 7 个 AI 子方向，提供课程、知识点、代码示例、流程图、思维导图数据
 * =================================================================== */

import type {
  Course,
  FlowStage,
  CodeExample,
  MindMapNode,
  ScenarioConfig,
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
    { q: '大语言模型为什么能"理解"人类语言？', category: '科普', submodes: ['case-intro'] },
    { q: '用一个生活例子解释什么是"监督学习"', category: '案例', submodes: ['case-intro'] },
    { q: '自然语言处理让计算机"看懂"文字的原理是什么？', category: '科普', submodes: ['case-intro', 'concept-overview'] },
    { q: '什么是强化学习？像训练宠物一样训练AI？', category: '案例', submodes: ['case-intro'] },
  ],
  inclass: [
    { q: '能不能再解释一下"过拟合"是什么意思？', category: '概念不清', submodes: ['quick-qa'] },
    { q: '反向传播的链式法则具体是怎么计算的？', category: '算法原理', submodes: ['catch-up'] },
    { q: 'Attention 机制里的 Q、K、V 到底是什么关系？', category: '算法原理', submodes: ['catch-up'] },
    { q: '交叉熵损失函数为什么比均方误差更适合分类？', category: '概念不清', submodes: ['quick-qa'] },
    { q: 'CNN 的卷积层和池化层各有什么作用？', category: '概念不清', submodes: ['quick-qa', 'catch-up'] },
    { q: 'SVM 的核函数是怎么把数据映射到高维的？', category: '算法原理', submodes: ['catch-up'] },
    { q: 'BERT 和 GPT 的结构有什么本质区别？', category: '概念不清', submodes: ['quick-qa'] },
  ],
  homework: [
    { q: '帮我看看这个 KNN 的代码哪里有问题', category: '代码调试', submodes: ['debug-help'] },
    { q: '怎么用 Pandas 对缺失值进行填充？', category: '数据处理', submodes: ['code-tutor'] },
    { q: 'PyTorch 训练循环的标准写法是什么？', category: '代码辅导', submodes: ['code-tutor'] },
    { q: '帮我写一份数据分析实验报告模板', category: '报告撰写', submodes: ['report-guide'] },
    { q: 'Matplotlib 怎么画多个子图的对比图？', category: '代码辅导', submodes: ['code-tutor'] },
    { q: '模型训练完怎么保存和加载？', category: '代码辅导', submodes: ['code-tutor', 'debug-help'] },
    { q: '为什么我的 loss 不下降？', category: 'Bug 调试', submodes: ['debug-help'] },
  ],
  exam: [
    { q: '机器学习面试常考算法有哪些？', category: '考点梳理', submodes: ['review-points'] },
    { q: '偏差和方差的区别 Trade-off 怎么理解？', category: '高频考点', submodes: ['review-points', 'problem-types'] },
    { q: '手撕一个决策树的伪代码', category: '题型解析', submodes: ['problem-types'] },
    { q: 'LLM 大作业从选题到实现的全流程指导', category: '大作业指导', submodes: ['project-guide'] },
    { q: '图像分类项目的完整流程是什么？', category: '大作业指导', submodes: ['project-guide'] },
    { q: 'PCA 降维的数学推导过程', category: '高频考点', submodes: ['review-points', 'problem-types'] },
  ],
}

/* ─── 公共流程图阶段定义 ─── */

/** 机器学习标准流程 */
export const mlFlowStages: FlowStage[] = [
  {
    id: 'data-collection',
    name: '数据采集',
    description: '收集原始数据，包括结构化数据、文本、图像等',
    dataPreview: '原始数据集: 1000 条样本, 20 个特征',
  },
  {
    id: 'data-cleaning',
    name: '数据清洗',
    description: '处理缺失值、异常值、重复数据',
    params: [
      { key: 'missing_strategy', label: '缺失值处理', type: 'select', options: ['删除', '均值填充', '中位数填充', '前向填充'], default: '均值填充' },
      { key: 'outlier_threshold', label: '异常值阈值', type: 'number', default: 3 },
    ],
    dataPreview: '清洗后: 985 条样本, 无缺失值',
  },
  {
    id: 'feature-engineering',
    name: '特征工程',
    description: '特征编码、标准化、降维、特征选择',
    params: [
      { key: 'scale_method', label: '标准化方法', type: 'select', options: ['StandardScaler', 'MinMaxScaler', 'RobustScaler'], default: 'StandardScaler' },
      { key: 'dim_reduction', label: '降维方法', type: 'select', options: ['无', 'PCA', 't-SNE'], default: '无' },
    ],
    dataPreview: '特征矩阵: 985 × 15 维',
  },
  {
    id: 'data-split',
    name: '数据集划分',
    description: '将数据划分为训练集、验证集和测试集',
    params: [
      { key: 'train_ratio', label: '训练集比例', type: 'number', default: 0.7 },
      { key: 'val_ratio', label: '验证集比例', type: 'number', default: 0.15 },
    ],
    dataPreview: '训练集: 689 条 / 验证集: 148 条 / 测试集: 148 条',
  },
  {
    id: 'model-training',
    name: '模型训练',
    description: '选择算法并进行模型训练与超参数调优',
    params: [
      { key: 'algorithm', label: '算法选择', type: 'select', options: ['线性回归', '决策树', '随机森林', 'SVM', 'KNN'], default: '随机森林' },
      { key: 'cv_folds', label: '交叉验证折数', type: 'number', default: 5 },
    ],
    dataPreview: '训练完成: 准确率 0.892',
  },
  {
    id: 'model-evaluation',
    name: '模型评估',
    description: '使用测试集评估模型性能，分析误差',
    dataPreview: '测试集准确率: 0.875 | F1: 0.863 | AUC: 0.912',
  },
]

/** 深度学习标准流程 */
export const dlFlowStages: FlowStage[] = [
  {
    id: 'data-prep',
    name: '数据准备',
    description: '数据加载、增强、归一化、批次生成',
    dataPreview: '训练集: 50000 张图片, 增强后: 200000 张',
  },
  {
    id: 'model-design',
    name: '模型设计',
    description: '设计网络架构：卷积层、池化层、全连接层',
    params: [
      { key: 'conv_layers', label: '卷积层数', type: 'number', default: 4 },
      { key: 'hidden_dim', label: '隐藏层维度', type: 'number', default: 512 },
    ],
    dataPreview: '参数量: 2.3M',
  },
  {
    id: 'training-loop',
    name: '训练循环',
    description: '前向传播、损失计算、反向传播、参数更新',
    params: [
      { key: 'epochs', label: '训练轮数', type: 'number', default: 50 },
      { key: 'batch_size', label: '批次大小', type: 'number', default: 32 },
      { key: 'learning_rate', label: '学习率', type: 'number', default: 0.001 },
    ],
    dataPreview: 'Epoch 25/50 | Loss: 0.234 | Acc: 0.912',
  },
  {
    id: 'evaluation',
    name: '性能评估',
    description: '在测试集上评估模型泛化能力',
    dataPreview: 'Test Acc: 0.928 | Precision: 0.931 | Recall: 0.925',
  },
  {
    id: 'deployment',
    name: '模型部署',
    description: '导出模型、部署到生产环境、推理测试',
    dataPreview: '推理延迟: 23ms/样本 | 吞吐量: 43 样本/s',
  },
]

/** NLP 文本处理流程 */
export const nlpFlowStages: FlowStage[] = [
  {
    id: 'text-preprocessing',
    name: '文本预处理',
    description: '分词、去停用词、词干提取/词形还原',
    params: [
      { key: 'tokenizer', label: '分词器', type: 'select', options: ['jieba', 'BERT Tokenizer', 'spaCy'], default: 'jieba' },
    ],
    dataPreview: '原始: 1000 篇文档 | 分词后: 85000 个词条',
  },
  {
    id: 'embedding',
    name: '词向量表示',
    description: '将文本转换为数值向量：Word2Vec / GloVe / BERT',
    dataPreview: '词向量维度: 300 | 词汇表大小: 50000',
  },
  {
    id: 'sequence-modeling',
    name: '序列建模',
    description: '使用 RNN / LSTM / Transformer 建模序列依赖',
    params: [
      { key: 'model_type', label: '模型类型', type: 'select', options: ['LSTM', 'GRU', 'Transformer'], default: 'Transformer' },
    ],
    dataPreview: '序列长度: 128 | 隐藏维度: 256',
  },
  {
    id: 'output-generation',
    name: '输出生成',
    description: '根据任务生成：分类标签 / 翻译文本 / 摘要',
    dataPreview: '准确率: 0.934 | BLEU: 0.872',
  },
]

/* ─── 通用代码示例 ─── */

export const sharedCodeExamples: Record<string, CodeExample[]> = {
  'data-cleaning': [
    {
      title: 'Pandas 缺失值处理',
      description: '使用 Pandas 检测和填充数据中的缺失值',
      language: 'python',
      code: `import pandas as pd
import numpy as np

# 加载数据
df = pd.read_csv('data.csv')

# 检测缺失值
print(df.isnull().sum())

# 方法1: 删除含有缺失值的行
df_clean = df.dropna()

# 方法2: 用均值填充数值列
df['age'].fillna(df['age'].mean(), inplace=True)

# 方法3: 用众数填充类别列
df['gender'].fillna(df['gender'].mode()[0], inplace=True)

# 方法4: 前向填充时间序列
df['sensor_value'].fillna(method='ffill', inplace=True)

print(f'清洗前: {len(df)} 行, 清洗后: {len(df_clean)} 行')`,
      output: `age       5
gender    3
income    12
salary    8
dtype: int64\n清洗前: 1000 行, 清洗后: 985 行`,
    },
    {
      title: '异常值检测 (IQR 方法)',
      description: '使用四分位距法检测并处理异常值',
      language: 'python',
      code: `import numpy as np
import pandas as pd

def detect_outliers_iqr(data, factor=1.5):
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1

    lower_bound = Q1 - factor * IQR
    upper_bound = Q3 + factor * IQR

    outliers = (data < lower_bound) | (data > upper_bound)
    return outliers, lower_bound, upper_bound

# 示例
data = np.random.randn(1000) * 10 + 50
data[::50] = np.random.randn(20) * 50 + 50  # 引入异常值

outliers, lb, ub = detect_outliers_iqr(data)
print(f"异常值数量: {outliers.sum()}")
print(f"正常范围: [{lb:.2f}, {ub:.2f}]")

# 处理异常值（截尾）
data_clean = np.clip(data, lb, ub)`,
      output: `异常值数量: 23\n正常范围: [32.45, 67.89]`,
    },
  ],
  'feature-engineering': [
    {
      title: '特征标准化与 PCA 降维',
      description: '使用 StandardScaler 和 PCA 进行特征处理',
      language: 'python',
      code: `from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import numpy as np

# 原始特征矩阵
X = np.random.randn(200, 50)  # 200 样本, 50 维特征

# 1. 标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(f"标准化后均值: {X_scaled.mean(axis=0)[:5].round(4)}")
print(f"标准化后方差: {X_scaled.var(axis=0)[:5].round(4)}")

# 2. PCA 降维
pca = PCA(n_components=0.95)  # 保留 95% 方差
X_pca = pca.fit_transform(X_scaled)

print(f"降维前维度: {X_scaled.shape[1]}")
print(f"降维后维度: {X_pca.shape[1]}")
print(f"累计解释方差: {pca.explained_variance_ratio_.cumsum()[-1]:.3f}")`,
      output: `标准化后均值: [ 0.   -0.    0.    0.    0.  ]\n标准化后方差: [1. 1. 1. 1. 1.]\n降维前维度: 50\n降维后维度: 28\n累计解释方差: 0.953`,
    },
  ],
  'model-training': [
    {
      title: 'KNN 分类器实现',
      description: '从零实现 K-近邻算法并评测',
      language: 'python',
      code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from collections import Counter

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y

    def predict(self, X):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x):
        # 计算距离
        distances = [np.sqrt(np.sum((x - x_train)**2))
                     for x_train in self.X_train]
        # 获取 K 个最近邻的索引
        k_indices = np.argsort(distances)[:self.k]
        k_labels = [self.y_train[i] for i in k_indices]
        # 投票
        most_common = Counter(k_labels).most_common(1)
        return most_common[0][0]

# 使用鸢尾花数据集测试
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

knn = KNN(k=3)
knn.fit(X_train, y_train)
predictions = knn.predict(X_test)

accuracy = np.mean(predictions == y_test)
print(f"KNN 准确率: {accuracy:.4f}")`,
      output: `KNN 准确率: 0.9667`,
    },
    {
      title: 'PyTorch 简单神经网络',
      description: '使用 PyTorch 构建和训练一个简单的全连接网络',
      language: 'python',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

# 定义网络
class SimpleNet(nn.Module):
    def __init__(self, input_dim=10, hidden_dim=64, output_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Linear(hidden_dim // 2, output_dim),
        )

    def forward(self, x):
        return self.net(x)

# 初始化
model = SimpleNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 模拟训练循环
X = torch.randn(100, 10)
y = torch.randint(0, 2, (100,))

for epoch in range(10):
    optimizer.zero_grad()
    outputs = model(X)
    loss = criterion(outputs, y)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 2 == 0:
        _, predicted = torch.max(outputs, 1)
        acc = (predicted == y).float().mean()
        print(f"Epoch {epoch+1}/10 | Loss: {loss.item():.4f} | Acc: {acc.item():.4f}")`,
      output: `Epoch 2/10 | Loss: 0.6892 | Acc: 0.5500\nEpoch 4/10 | Loss: 0.6621 | Acc: 0.6700\nEpoch 6/10 | Loss: 0.6234 | Acc: 0.6900\nEpoch 8/10 | Loss: 0.5845 | Acc: 0.7400\nEpoch 10/10 | Loss: 0.5321 | Acc: 0.8100`,
    },
  ],
}

/* ===================================================================
 * 课程数据: 7 个 AI 子方向
 * =================================================================== */

export const allCourses: Course[] = [
  /* ─── 1. 机器学习基础 ─── */
  {
    id: 'ai-ml',
    domain: 'ai',
    subfield: 'ml',
    name: '机器学习基础',
    description: '从零掌握监督学习、无监督学习、模型评估与特征工程核心方法',
    icon: 'Brain',
    difficulty: 'beginner',
    prerequisites: ['Python 基础', '概率统计基础'],
    color: '#00d4ff',
    topics: [
      {
        id: 'ml-intro',
        name: '机器学习概述',
        description: '机器学习的定义、分类与基本流程',
        concepts: [
          { id: 'ml-def', name: '机器学习定义', description: '利用数据驱动模型自动改进性能的方法', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-types', name: '学习范式分类', description: '监督学习、无监督学习、半监督学习、强化学习', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-flow', name: '机器学习流程', description: '数据采集→清洗→特征工程→训练→评估→部署', difficulty: 'beginner', prerequisites: [] },
        ],
        resources: [
          { type: 'doc', title: '机器学习入门指南' },
          { type: 'mindmap', title: '学习范式对比图' },
          { type: 'flowchart', title: 'ML 完整流程图' },
        ],
        flowStages: mlFlowStages,
        codeExamples: sharedCodeExamples['model-training'],
        presetQuestions: [
          { q: '什么是监督学习和无监督学习的区别？', a: '监督学习使用带标签的数据训练模型预测目标变量，如分类和回归；无监督学习使用无标签数据发现数据内在结构，如聚类和降维。' },
          { q: '如何判断模型是否过拟合？', a: '过拟合表现为训练集表现很好但测试集表现差。可通过学习曲线观察训练/验证 loss 差距是否过大，或通过交叉验证评估泛化能力。' },
        ],
        mindMap: [
          {
            id: 'mm-ml-root', label: '机器学习',
            children: [
              { id: 'mm-ml-sup', label: '监督学习', description: '有标签数据训练',
                children: [
                  { id: 'mm-ml-reg', label: '回归: 线性/岭/Lasso' },
                  { id: 'mm-ml-cls', label: '分类: KNN/决策树/SVM' },
                  { id: 'mm-ml-ens', label: '集成: 随机森林/XGBoost' },
                ] },
              { id: 'mm-ml-unsup', label: '无监督学习', description: '无标签数据',
                children: [
                  { id: 'mm-ml-clu', label: '聚类: K-Means/DBSCAN' },
                  { id: 'mm-ml-dm', label: '降维: PCA/t-SNE' },
                ] },
              { id: 'mm-ml-eval', label: '模型评估', description: '性能度量',
                children: [
                  { id: 'mm-ml-metric', label: '指标: 准确率/F1/AUC' },
                  { id: 'mm-ml-cv', label: '交叉验证' },
                  { id: 'mm-ml-tuning', label: '调参: 网格/随机搜索' },
                ] },
            ],
          },
        ],
      },
      {
        id: 'ml-supervised',
        name: '监督学习算法',
        description: 'KNN、决策树、SVM、集成学习等核心算法',
        concepts: [
          { id: 'ml-knn', name: 'K-近邻算法', description: '基于样本间距离进行投票分类', difficulty: 'beginner', prerequisites: ['ml-def'] },
          { id: 'ml-dt', name: '决策树', description: '基于特征信息增益/基尼系数进行树形决策', difficulty: 'intermediate', prerequisites: ['ml-def'] },
          { id: 'ml-svm', name: '支持向量机', description: '通过寻找最大间隔超平面进行分类', difficulty: 'advanced', prerequisites: ['ml-def'] },
          { id: 'ml-rf', name: '随机森林', description: '集成多棵决策树进行投票/平均', difficulty: 'intermediate', prerequisites: ['ml-dt'] },
          { id: 'ml-xgb', name: 'XGBoost', description: '基于梯度提升的高效集成学习框架', difficulty: 'advanced', prerequisites: ['ml-rf'] },
        ],
        resources: [
          { type: 'doc', title: '监督学习算法对比' },
          { type: 'exercise', title: '分类算法练习题' },
          { type: 'code', title: 'KNN 从零实现' },
        ],
        codeExamples: [
          { title: '决策树分类', description: '使用决策树对鸢尾花数据集分类', language: 'python',
            code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

data = load_iris()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 决策树
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X_train, y_train)
y_pred = dt.predict(X_test)

print(classification_report(y_test, y_pred, target_names=data.target_names))`,
            output: `precision   recall  f1-score\nsetosa       1.00     1.00     1.00\nversicolor   1.00     0.90     0.95\nvirginica    0.92     1.00     0.96\naccuracy                     0.97` },
        ],
        presetQuestions: [
          { q: 'KNN 中 K 值怎么选择？', a: 'K 值过小容易过拟合（受噪声影响大），K 值过大容易欠拟合（类别界限模糊）。一般从 3 开始尝试，配合交叉验证选择最优 K 值。' },
          { q: '决策树是如何选择特征的？', a: '决策树通过信息增益（ID3）、增益率（C4.5）或基尼系数（CART）来度量特征分类纯度提升程度，选择纯度提升最大的特征进行分裂。' },
        ],
      },
      {
        id: 'ml-unsupervised',
        name: '无监督学习',
        description: '聚类分析、降维与密度估计',
        concepts: [
          { id: 'ml-kmeans', name: 'K-Means 聚类', description: '基于距离的迭代聚类算法', difficulty: 'beginner', prerequisites: [] },
          { id: 'ml-dbscan', name: 'DBSCAN 聚类', description: '基于密度的聚类，可发现任意形状簇', difficulty: 'intermediate', prerequisites: [] },
          { id: 'ml-pca', name: '主成分分析 (PCA)', description: '通过正交变换将数据从高维映射到低维', difficulty: 'intermediate', prerequisites: [] },
        ],
        resources: [
          { type: 'doc', title: '聚类算法对比分析' },
          { type: 'code', title: 'K-Means 实现' },
          { type: 'mindmap', title: '无监督学习全景图' },
        ],
        codeExamples: [
          { title: 'K-Means 聚类与可视化', description: '使用 K-Means 聚类并可视化结果', language: 'python',
            code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs

# 生成模拟数据
X, y_true = make_blobs(n_samples=300, centers=4,
                       cluster_std=0.60, random_state=42)

# K-Means 聚类
kmeans = KMeans(n_clusters=4, random_state=42)
y_kmeans = kmeans.fit_predict(X)

# 可视化
plt.scatter(X[:, 0], X[:, 1], c=y_kmeans,
            s=50, cmap='viridis')
plt.scatter(kmeans.cluster_centers_[:, 0],
            kmeans.cluster_centers_[:, 1],
            marker='x', s=200, linewidths=3,
            color='red')
plt.title('K-Means 聚类结果')
plt.show()`,
            output: '可视化显示 4 个聚类中心（红叉）和 300 个数据点的分类着色' },
        ],
        presetQuestions: [
          { q: 'K-Means 的 K 值怎么确定？', a: '常用肘部法（Elbow Method）：绘制 K 值与误差平方和(SSE)曲线，选择曲线拐点处的 K 值。也可使用轮廓系数(Silhouette Score)评估聚类效果。' },
        ],
      },
    ],
  },

  /* ─── 2. 深度学习 ─── */
  {
    id: 'ai-dl',
    domain: 'ai',
    subfield: 'dl',
    name: '深度学习',
    description: '从神经网络基础到 CNN、RNN、Transformer 架构',
    icon: 'Layers',
    difficulty: 'intermediate',
    prerequisites: ['机器学习基础', '线性代数'],
    color: '#7c3aed',
    topics: [
      {
        id: 'dl-basics',
        name: '神经网络基础',
        description: '感知机、多层神经网络、反向传播与激活函数',
        concepts: [
          { id: 'dl-perceptron', name: '感知机', description: '单层神经网络，线性分类器', difficulty: 'beginner', prerequisites: [] },
          { id: 'dl-mlp', name: '多层感知机 (MLP)', description: '含隐藏层的全连接神经网络', difficulty: 'intermediate', prerequisites: ['dl-perceptron'] },
          { id: 'dl-backprop', name: '反向传播', description: '通过链式法则计算梯度，更新网络参数', difficulty: 'advanced', prerequisites: ['dl-mlp'] },
          { id: 'dl-activation', name: '激活函数', description: 'ReLU、Sigmoid、Tanh、Softmax 等', difficulty: 'beginner', prerequisites: [] },
        ],
        resources: [
          { type: 'doc', title: '神经网络入门' },
          { type: 'code', title: 'NumPy 实现 MLP' },
          { type: 'video', title: '反向传播可视化' },
        ],
        codeExamples: [
          { title: 'NumPy 实现单层神经网络', description: '使用 NumPy 从零实现一个神经元的训练', language: 'python',
            code: `import numpy as np

class Neuron:
    def __init__(self, n_inputs):
        self.weights = np.random.randn(n_inputs) * 0.01
        self.bias = 0

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, inputs):
        z = np.dot(inputs, self.weights) + self.bias
        return self.sigmoid(z)

    def train(self, X, y, lr=0.1, epochs=100):
        for epoch in range(epochs):
            outputs = self.forward(X)
            error = y - outputs
            # 梯度下降
            d_weights = np.dot(X.T, error * outputs * (1 - outputs))
            d_bias = np.mean(error * outputs * (1 - outputs))
            self.weights += lr * d_weights
            self.bias += lr * d_bias
            if epoch % 20 == 0:
                loss = np.mean(error ** 2)
                print(f"Epoch {epoch}: Loss = {loss:.6f}")`,
            output: 'Epoch 0: Loss = 0.251234\nEpoch 20: Loss = 0.089123\nEpoch 40: Loss = 0.045678\nEpoch 60: Loss = 0.023456\nEpoch 80: Loss = 0.012345' },
        ],
        mindMap: [
          {
            id: 'mm-dl-root', label: '深度学习',
            children: [
              { id: 'mm-dl-basic', label: '神经网络基础', children: [
                { id: 'mm-dl-perc', label: '感知机' },
                { id: 'mm-dl-bp', label: '反向传播' },
                { id: 'mm-dl-act', label: '激活函数' },
              ] },
              { id: 'mm-dl-cnn', label: 'CNN', children: [
                { id: 'mm-dl-conv', label: '卷积层' },
                { id: 'mm-dl-pool', label: '池化层' },
                { id: 'mm-dl-fc', label: '全连接层' },
              ] },
              { id: 'mm-dl-rnn', label: 'RNN', children: [
                { id: 'mm-dl-lstm', label: 'LSTM' },
                { id: 'mm-dl-gru', label: 'GRU' },
              ] },
              { id: 'mm-dl-trans', label: 'Transformer', children: [
                { id: 'mm-dl-attn', label: '自注意力' },
                { id: 'mm-dl-mha', label: '多头注意力' },
                { id: 'mm-dl-ffn', label: '前馈网络' },
              ] },
            ],
          },
        ],
      },
      {
        id: 'dl-cnn',
        name: '卷积神经网络',
        description: '卷积层、池化层、经典 CNN 架构',
        concepts: [
          { id: 'dl-conv', name: '卷积运算', description: '卷积核在输入上滑动提取局部特征', difficulty: 'intermediate', prerequisites: ['dl-mlp'] },
          { id: 'dl-pooling', name: '池化层', description: '下采样操作：最大池化、平均池化', difficulty: 'intermediate', prerequisites: ['dl-conv'] },
          { id: 'dl-classic-cnn', name: '经典架构', description: 'LeNet、AlexNet、VGG、ResNet', difficulty: 'advanced', prerequisites: ['dl-conv', 'dl-pooling'] },
        ],
        resources: [
          { type: 'doc', title: 'CNN 架构演化' },
          { type: 'code', title: 'PyTorch CNN 实现' },
          { type: 'mindmap', title: 'CNN 架构演进图' },
        ],
        flowStages: dlFlowStages,
      },
    ],
  },

  /* ─── 3. 自然语言处理 ─── */
  {
    id: 'ai-nlp',
    domain: 'ai',
    subfield: 'nlp',
    name: '自然语言处理',
    description: '文本处理、词向量、序列模型、大语言模型技术',
    icon: 'FileText',
    difficulty: 'intermediate',
    prerequisites: ['深度学习', 'Python 编程'],
    color: '#06d6a0',
    topics: [
      {
        id: 'nlp-basics',
        name: 'NLP 基础',
        description: '分词、词性标注、命名实体识别',
        concepts: [
          { id: 'nlp-tokenization', name: '分词技术', description: '基于规则/统计/神经网络的分词方法', difficulty: 'beginner', prerequisites: [] },
          { id: 'nlp-embedding', name: '词向量', description: 'Word2Vec、GloVe、FastText 分布式表示', difficulty: 'intermediate', prerequisites: ['nlp-tokenization'] },
          { id: 'nlp-seq', name: '序列标注', description: 'POS Tagging、NER、Chunking', difficulty: 'intermediate', prerequisites: ['nlp-tokenization'] },
        ],
        flowStages: nlpFlowStages,
        resources: [
          { type: 'doc', title: 'NLP 入门教程' },
          { type: 'code', title: 'Word2Vec 实现' },
          { type: 'flowchart', title: 'NLP 处理流程' },
        ],
      },
      {
        id: 'nlp-transformer',
        name: 'Transformer 与预训练模型',
        description: '自注意力机制、BERT、GPT 系列',
        concepts: [
          { id: 'nlp-attention', name: '注意力机制', description: 'Query-Key-Value 注意力计算', difficulty: 'advanced', prerequisites: ['nlp-seq'] },
          { id: 'nlp-bert', name: 'BERT', description: '双向编码器表示，MLM+NSP 预训练', difficulty: 'advanced', prerequisites: ['nlp-attention'] },
          { id: 'nlp-gpt', name: 'GPT 系列', description: '自回归语言模型，Scaling Law', difficulty: 'advanced', prerequisites: ['nlp-attention'] },
        ],
        resources: [
          { type: 'doc', title: 'Transformer 精讲' },
          { type: 'mindmap', title: '预训练模型演进' },
          { type: 'video', title: '注意力机制可视化' },
        ],
        codeExamples: [
          { title: 'Transformer 注意力机制实现', description: '实现单头自注意力计算', language: 'python',
            code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q, K, V: (batch, heads, seq_len, d_k)
    """
    d_k = K.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1))
    scores = scores / (d_k ** 0.5)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    attention = F.softmax(scores, dim=-1)
    output = torch.matmul(attention, V)
    return output, attention

# 示例
batch, heads, seq, d_k = 2, 8, 16, 64
Q = torch.randn(batch, heads, seq, d_k)
K = torch.randn(batch, heads, seq, d_k)
V = torch.randn(batch, heads, seq, d_k)

output, attn = scaled_dot_product_attention(Q, K, V)
print(f"输出形状: {output.shape}")
print(f"注意力权重形状: {attn.shape}")`,
            output: `输出形状: torch.Size([2, 8, 16, 64])\n注意力权重形状: torch.Size([2, 8, 16, 16])` },
        ],
      },
    ],
  },

  /* ─── 4. 计算机视觉 ─── */
  {
    id: 'ai-cv',
    domain: 'ai',
    subfield: 'cv',
    name: '计算机视觉',
    description: '图像分类、目标检测、语义分割、生成模型',
    icon: 'Eye',
    difficulty: 'intermediate',
    prerequisites: ['深度学习', '线性代数'],
    color: '#f59e0b',
    topics: [
      {
        id: 'cv-classification',
        name: '图像分类',
        description: '图像分类网络与迁移学习',
        concepts: [
          { id: 'cv-classic-net', name: '经典分类网络', description: 'AlexNet, VGG, ResNet, EfficientNet', difficulty: 'intermediate', prerequisites: ['dl-conv'] },
          { id: 'cv-transfer', name: '迁移学习', description: '利用预训练模型微调到新任务', difficulty: 'intermediate', prerequisites: ['cv-classic-net'] },
        ],
        resources: [
          { type: 'doc', title: '图像分类实战' },
          { type: 'code', title: 'ResNet 实现' },
          { type: 'exercise', title: '分类任务练习' },
        ],
      },
      {
        id: 'cv-detection',
        name: '目标检测',
        description: '两阶段与单阶段检测算法',
        concepts: [
          { id: 'cv-rcnn', name: 'Faster R-CNN', description: '两阶段检测：RPN + ROI Head', difficulty: 'advanced', prerequisites: ['cv-classic-net'] },
          { id: 'cv-yolo', name: 'YOLO 系列', description: '单阶段实时检测算法', difficulty: 'advanced', prerequisites: ['cv-classic-net'] },
        ],
        resources: [
          { type: 'doc', title: '目标检测综述' },
          { type: 'code', title: 'YOLOv8 使用教程' },
        ],
      },
    ],
  },

  /* ─── 5. 强化学习 ─── */
  {
    id: 'ai-rl',
    domain: 'ai',
    subfield: 'rl',
    name: '强化学习',
    description: 'MDP、Q-Learning、策略梯度、深度强化学习',
    icon: 'Zap',
    difficulty: 'advanced',
    prerequisites: ['机器学习基础', '概率论'],
    color: '#f43f5e',
    topics: [
      {
        id: 'rl-basics',
        name: '强化学习基础',
        description: 'MDP、贝尔曼方程、价值迭代',
        concepts: [
          { id: 'rl-mdp', name: '马尔可夫决策过程', description: '状态、动作、奖励、转移概率的数学框架', difficulty: 'intermediate', prerequisites: [] },
          { id: 'rl-bellman', name: '贝尔曼方程', description: '价值函数与最优策略的递归关系', difficulty: 'advanced', prerequisites: ['rl-mdp'] },
        ],
        resources: [
          { type: 'doc', title: 'RL 入门' },
          { type: 'mindmap', title: 'RL 算法分类' },
        ],
      },
      {
        id: 'rl-deep',
        name: '深度强化学习',
        description: 'DQN、Policy Gradient、PPO',
        resources: [],
        concepts: [
          { id: 'rl-dqn', name: 'Deep Q-Network', description: '用神经网络近似 Q 函数', difficulty: 'advanced', prerequisites: ['rl-bellman'] },
          { id: 'rl-ppo', name: 'PPO', description: '近端策略优化，稳定高效的策略梯度方法', difficulty: 'advanced', prerequisites: ['rl-dqn'] },
        ],
      },
    ],
  },

  /* ─── 6. 大模型应用 ─── */
  {
    id: 'ai-llm',
    domain: 'ai',
    subfield: 'llm',
    name: '大模型应用开发',
    description: 'Prompt Engineering、RAG、Fine-tuning、AI Agent',
    icon: 'Sparkles',
    difficulty: 'intermediate',
    prerequisites: ['NLP 基础', 'Python 编程'],
    color: '#3b82f6',
    topics: [
      {
        id: 'llm-prompt',
        name: '提示工程',
        description: '设计高效 Prompt，掌握 In-Context Learning',
        concepts: [
          { id: 'llm-prompt-design', name: 'Prompt 设计原则', description: '清晰、具体、分步、角色设定', difficulty: 'beginner', prerequisites: [] },
          { id: 'llm-cot', name: '思维链 (CoT)', description: '引导模型逐步推理的提示技术', difficulty: 'intermediate', prerequisites: ['llm-prompt-design'] },
          { id: 'llm-fewshot', name: '少样本学习', description: '在 Prompt 中提供示例引导输出', difficulty: 'beginner', prerequisites: ['llm-prompt-design'] },
        ],
        codeExamples: [
          { title: 'Prompt 模板设计', description: '结构化 Prompt 实现分类任务', language: 'python',
            code: `# 结构化 Prompt 模板
SYSTEM_PROMPT = """你是一个专业的AI学习助手。
请基于以下上下文回答问题，如果不知道就说不知道。"""

def create_classification_prompt(text, categories):
    prompt = f"""请将以下文本分类到最适合的类别中。

可选类别: {', '.join(categories)}

文本: "{text}"

请只返回类别名称，不要额外解释。"""
    return prompt

# 示例
categories = ["技术", "教育", "医疗", "金融"]
prompt = create_classification_prompt(
    "Transformer架构在自然语言处理领域取得了巨大成功",
    categories
)
print(prompt)`,
            output: '请将以下文本分类到最适合的类别中。\n\n可选类别: 技术, 教育, 医疗, 金融\n\n文本: "Transformer架构在自然语言处理领域取得了巨大成功"\n\n请只返回类别名称，不要额外解释。' },
        ],
        resources: [
          { type: 'doc', title: 'Prompt Engineering 指南' },
          { type: 'exercise', title: 'Prompt 设计练习' },
        ],
      },
      {
        id: 'llm-rag',
        name: 'RAG 与知识库',
        description: '检索增强生成：向量数据库、文档检索、上下文融合',
        concepts: [
          { id: 'llm-rag-flow', name: 'RAG 流程', description: '文档分块→向量化→检索→生成', difficulty: 'intermediate', prerequisites: ['llm-prompt-design'] },
          { id: 'llm-vector-db', name: '向量数据库', description: 'Milvus、FAISS、ChromaDB 等', difficulty: 'intermediate', prerequisites: ['llm-rag-flow'] },
          { id: 'llm-chunk', name: '文档分块策略', description: '固定大小/语义分块/递归分块', difficulty: 'intermediate', prerequisites: ['llm-rag-flow'] },
        ],
        presetQuestions: [
          { q: 'RAG 和 Fine-tuning 有什么区别？', a: 'RAG 通过检索外部知识增强模型回答，不改变模型参数，适合知识密集型任务；Fine-tuning 通过微调更新模型参数，适合改变模型行为或格式。RAG 更灵活可追溯，Fine-tuning 更高效但成本高。' },
          { q: '怎么设计一个好的 RAG 系统？', a: '关键要素：1)合理的文档分块策略 2)高质量的嵌入模型 3)高效的向量检索 4)有效的检索结果融合 5)清晰的 Prompt 指令。还需要考虑检索精度与召回率的平衡。' },
        ],
        resources: [
          { type: 'doc', title: 'RAG 从入门到精通' },
          { type: 'code', title: 'RAG 系统实现' },
        ],
      },
      {
        id: 'llm-agent',
        name: 'AI Agent',
        description: 'ReAct 框架、工具调用、多智能体协作',
        resources: [],
        concepts: [
          { id: 'llm-react', name: 'ReAct 框架', description: 'Reasoning + Acting 交替进行', difficulty: 'advanced', prerequisites: ['llm-prompt-design'] },
          { id: 'llm-tool-use', name: '工具调用', description: 'Function Calling 机制与工具定义', difficulty: 'advanced', prerequisites: ['llm-react'] },
          { id: 'llm-multi-agent', name: '多智能体系统', description: '多角色协作、任务分解与结果聚合', difficulty: 'advanced', prerequisites: ['llm-tool-use'] },
        ],
        presetQuestions: [
          { q: '什么是 ReAct 框架？', a: 'ReAct (Reasoning + Acting) 让模型交替进行推理和行动：思考当前状态→决定要执行的动作→观察动作结果→继续推理。这种循环使 Agent 能有效解决复杂任务。' },
        ],
      },
    ],
  },

  /* ─── 7. 机器学习工程 ─── */
  {
    id: 'ai-mlops',
    domain: 'ai',
    subfield: 'mlops',
    name: '机器学习工程',
    description: '实验管理、模型部署、CI/CD、监控与 A/B 测试',
    icon: 'GitCompare',
    difficulty: 'advanced',
    prerequisites: ['机器学习基础', '软件工程'],
    color: '#a855f7',
    topics: [
      {
        id: 'mlops-exp',
        name: '实验管理',
        description: 'MLflow、实验追踪、版本管理',
        concepts: [
          { id: 'mlops-mlflow', name: 'MLflow', description: '实验跟踪、模型注册、部署管理平台', difficulty: 'intermediate', prerequisites: [] },
          { id: 'mlops-data-version', name: '数据版本管理', description: 'DVC 数据版本控制和流水线管理', difficulty: 'intermediate', prerequisites: [] },
        ],
        resources: [
          { type: 'doc', title: 'MLflow 实战' },
          { type: 'code', title: 'DVC 流水线配置' },
        ],
      },
      {
        id: 'mlops-deploy',
        name: '模型部署',
        description: 'REST API、容器化、推理优化',
        resources: [],
        concepts: [
          { id: 'mlops-fastapi', name: 'FastAPI 服务', description: '使用 FastAPI 部署模型为 REST API', difficulty: 'intermediate', prerequisites: [] },
          { id: 'mlops-docker', name: 'Docker 容器化', description: '模型服务容器化与镜像管理', difficulty: 'intermediate', prerequisites: ['mlops-fastapi'] },
          { id: 'mlops-monitoring', name: '模型监控', description: '数据漂移、概念漂移、性能衰减监测', difficulty: 'advanced', prerequisites: ['mlops-fastapi'] },
        ],
        codeExamples: [
          { title: 'FastAPI 模型服务', description: '使用 FastAPI 部署机器学习模型', language: 'python',
            code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# 加载模型
model = joblib.load('model.pkl')

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: float
    probability: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    pred = model.predict(features)[0]
    proba = model.predict_proba(features).max()
    return PredictionResponse(
        prediction=float(pred),
        probability=float(proba)
    )

@app.get("/health")
async def health():
    return {"status": "ok"}`,
            output: 'FastAPI 服务已启动: http://localhost:8000/docs' },
        ],
      },
    ],
  },
]

/* ─── 预设问答基础模板（场景感知） ─── */

export const scenarioAnswerTemplates: Record<string, (q: string, subMode?: string) => string> = {
  'preview': (q, subMode) => {
    if (subMode === 'case-intro') {
      return `## 🔍 通过案例理解

关于「${q}」，我们用一个生活中的例子来理解：

### 场景类比
> 想象一下你在厨房做菜的过程...

### 核心要点
1. **直观理解** — 不需要公式也能明白
2. **实际联系** — 和你已知的概念关联起来
3. **学习路径** — 接下来需要掌握哪些基础知识

**小提示**：这个知识点在后续学习中会反复出现，先建立直觉很重要。`
    }
    return `## 📖 概念速览

### 它的核心思想
「${q}」的本质其实很简单——让我们用最直白的语言来解释。

### 关键要点
1. **它是什么** — 定义和核心特征
2. **为什么重要** — 在实际中的应用价值
3. **如何掌握** — 推荐的学习路径

### 前置知识
在深入学习之前，建议先了解：
- ✅ 基础概念
- ✅ 相关预备知识

> 💡 预习阶段不需要完全理解，建立整体印象即可。`
  },
  'inclass': (q, subMode) => {
    if (subMode === 'catch-up') {
      return `## 🔄 重新梳理

刚才讲的「${q}」部分，我们换个角度重新理解：

### 换个说法
不要看公式，先理解思路：

**核心思想**：...

### 分步拆解
1. **第一步** — 我们想解决什么问题？
2. **第二步** — 怎么解决（直观理解）？
3. **第三步** — 数学上怎么表示（公式）？

### 课堂要点速记
| 关键点 | 说明 |
|--------|------|
| 核心概念 | ... |
| 推导关键 | ... |
| 注意陷阱 | ... |

> 不着急，这个概念确实需要多花点时间。现在清楚了吗？`
    }
    return `## ⚡ 快速解答

关于「${q}」：

**一句话解释**：...

### 核心要点
1. **定义** — 简洁准确的定义
2. **关键** — 理解这个概念的切入点
3. **注意** — 常见的理解误区

> 如果还有疑问，随时可以切换"跟不上了"模式，我会更详细地重新讲解。`
  },
  'homework': (q, subMode) => {
    if (subMode === 'debug-help') {
      return `## 🐛 Bug 调试分析

让我看看「${q}」这段代码的问题：

### 错误定位
通过分析，可能的问题出在：

1. **问题一** — 具体描述
2. **问题二** — 具体描述

### 修复方案
\`\`\`python
# 修改后的代码
def fixed_code():
    pass
\`\`\`

### 预防建议
- 建议在编写时注意...
- 可以使用调试工具逐步执行

> 需要我进一步解释修复原理吗？`
    }
    if (subMode === 'report-guide') {
      return `## 📝 实验报告指导

关于「${q}」，以下是规范的实验报告结构：

### 实验报告模板
1. **实验目的** — 明确本次实验要掌握的内容
2. **实验环境** — 硬件配置、软件版本
3. **实验步骤** — 分步记录操作过程
4. **结果分析** — 展示实验结果并分析
5. **总结与反思** — 遇到的问题和收获

### 格式要求
- 代码需要添加注释说明
- 图表要有标题和编号
- 结论要基于数据支持

> 需要我帮你填充某个具体部分吗？`
    }
    return `## 💻 代码辅导

关于「${q}」：

### 思路分析
要解决这个问题，我们需要：

1. **理解需求** — 明确输入和期望输出
2. **设计方案** — 选择合适的算法/工具
3. **逐步实现** — 分步编写代码

### 参考代码
\`\`\`python
# 核心实现
def solution():
    pass
\`\`\`

### 代码说明
- **关键函数** — 作用和参数
- **注意事项** — 边界条件和异常处理`
  },
  'exam': (q, subMode) => {
    if (subMode === 'project-guide') {
      return `## 🎯 大作业全流程指导

关于「${q}」：

### 项目选题建议
1. **选题方向** — 选择难度适中、感兴趣的方向
2. **可行性评估** — 数据是否可得、技术栈是否熟悉

### 实施流程
1. **需求分析** → 2. **数据准备** → 3. **模型构建** → 4. **评估优化** → 5. **报告撰写**

### 评分要点
| 评分项 | 权重 | 注意事项 |
|--------|------|----------|
| 选题创新 | 20% | 有一定新意 |
| 工作量 | 30% | 数据量、模型复杂度 |
| 结果分析 | 30% | 深入分析而非堆砌 |
| 报告规范 | 20% | 结构完整、格式规范 |

> 需要我帮你梳理具体某个环节吗？`
    }
    return `## 📚 考点解析

关于「${q}」：

### 考点定位
这是一个**高频/核心**考点，在考试中通常以**选择/简答/计算**形式出现。

### 核心要点
1. **定义** — 标准表述
2. **关键公式/原理** — 必须掌握
3. **常见题型** — 典型考法

### 答题模板
\`\`\`
答题思路：
1. 先给出定义
2. 解释原理/推导
3. 举例说明
\`\`\`

### 易错提醒
- ❌ 常见错误一
- ❌ 常见错误二

> 需要我做几道同类题目帮你巩固吗？`
  },
}
