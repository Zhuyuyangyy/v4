<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BookOpen, MessageCircle, RefreshCw, ClipboardCheck, GraduationCap } from 'lucide-vue-next'

interface Topic {
  id: string; label: string; mastery: number; recommended?: boolean
}
interface Domain {
  id: string; name: string; color: string; short: string; mastery: number; topics: Topic[]
}

const props = defineProps<{ domain?: Domain; topic?: Topic }>()
const activeStage = ref<string | null>(null)

// ============================================================
//  每颗星（知识点）对应的 5 阶段学习内容
//  阶段: 课前预习 → 课中答疑 → 课后巩固 → 阶段测评 → 期末辅导
// ============================================================

interface StageContent { title: string; type: string; isRemedial?: boolean }

// 每颗星的 5 阶段学习内容（key = 星座节点 ID）
const NODE_CONTENT: Record<string, StageContent[][]> = {

  // ━━━━━━━━━ 数学基础 ━━━━━━━━━
  m1: [ // 矩阵运算
    [{ title: '矩阵加减乘与转置概念', type: 'doc' }, { title: 'NumPy 矩阵创建与基本操作', type: 'video' }, { title: '线性方程组与矩阵关系', type: 'doc' }],
    [{ title: '矩阵乘法结合律常见疑问', type: 'video' }, { title: '逆矩阵与行列式的直觉理解', type: 'doc' }, { title: '分块矩阵运算技巧', type: 'video' }],
    [{ title: '矩阵乘法手算练习', type: 'exercise' }, { title: 'NumPy 矩阵运算编程题', type: 'code' }, { title: '特殊矩阵（对角/对称/稀疏）辨识', type: 'exercise' }],
    [{ title: '矩阵运算综合测试', type: 'exercise' }, { title: '矩阵在图像变换中的应用', type: 'exercise' }],
    [{ title: 'SVD 分解原理与应用', type: 'doc' }, { title: 'PCA 降维中的矩阵运算', type: 'video' }, { title: '矩阵分解在推荐系统中的角色', type: 'doc' }],
  ],
  m2: [ // 特征值与分解
    [{ title: '特征值与特征向量的几何含义', type: 'doc' }, { title: '特征方程求解方法', type: 'video' }, { title: '对角化条件与步骤', type: 'doc' }],
    [{ title: '特征值在 PCA 中的作用', type: 'video' }, { title: '实对称矩阵的谱定理', type: 'doc' }, { title: '特征值与矩阵稳定性的关系', type: 'video' }],
    [{ title: '手动计算 2x2 矩阵特征值', type: 'exercise' }, { title: '用 sklearn 求协方差矩阵特征值', type: 'code' }, { title: '特征值分解验证练习', type: 'exercise' }],
    [{ title: '特征值综合测验', type: 'exercise' }, { title: '特征值在 PageRank 中的应用', type: 'exercise' }],
    [{ title: '特征值在动力系统中的意义', type: 'doc' }, { title: '谱聚类算法原理', type: 'video' }, { title: '特征值在量子计算中的角色', type: 'doc' }],
  ],
  m3: [ // 概率论
    [{ title: '随机变量与概率分布基础', type: 'doc' }, { title: '条件概率与贝叶斯公式', type: 'video' }, { title: '常见分布（正态/泊松/二项）概览', type: 'doc' }],
    [{ title: '贝叶斯推理在垃圾邮件过滤中的应用', type: 'video' }, { title: '联合分布与边缘分布的关系', type: 'doc' }, { title: '大数定律直觉理解', type: 'video' }],
    [{ title: '概率计算综合练习', type: 'exercise' }, { title: '用 Python 模拟概率实验', type: 'code' }, { title: '贝叶斯公式应用题', type: 'exercise' }],
    [{ title: '概率论阶段测评', type: 'exercise' }, { title: '概率在 ML 损失函数中的角色', type: 'exercise' }],
    [{ title: '概率图模型入门', type: 'doc' }, { title: '蒙特卡洛方法原理', type: 'video' }, { title: '概率论在自然语言处理中的应用', type: 'doc' }],
  ],
  m4: [ // 微积分
    [{ title: '导数的定义与几何意义', type: 'doc' }, { title: '常见函数求导公式速查', type: 'video' }, { title: '偏导数与梯度概念', type: 'doc' }],
    [{ title: '链式法则在反向传播中的应用', type: 'video' }, { title: '梯度下降法的数学推导', type: 'doc' }, { title: '多元函数极值条件', type: 'video' }],
    [{ title: '手算导数练习题', type: 'exercise' }, { title: '梯度下降手动模拟', type: 'exercise' }, { title: 'PyTorch 自动求导体验', type: 'code' }],
    [{ title: '微积分基础测验', type: 'exercise' }, { title: '导数在优化算法中的核心角色', type: 'exercise' }],
    [{ title: '积分在概率密度中的应用', type: 'doc' }, { title: '变分法入门', type: 'video' }, { title: '微积分在深度学习优化中的前沿', type: 'doc' }],
  ],
  m5: [ // 凸优化
    [{ title: '凸集与凸函数定义', type: 'doc' }, { title: '优化问题分类（无约束/有约束）', type: 'video' }, { title: '局部最优与全局最优的区别', type: 'doc' }],
    [{ title: '拉格朗日乘子法原理', type: 'video' }, { title: 'SVM 中的凸优化应用', type: 'doc' }, { title: 'KKT 条件直觉理解', type: 'video' }],
    [{ title: '凸函数判定练习', type: 'exercise' }, { title: '用 cvxpy 解简单优化问题', type: 'code' }, { title: '约束优化手算题', type: 'exercise' }],
    [{ title: '凸优化综合测评', type: 'exercise' }, { title: '优化在模型训练中的实际意义', type: 'exercise' }],
    [{ title: '非凸优化与鞍点问题', type: 'doc' }, { title: '学习率调度策略', type: 'video' }, { title: '二阶优化方法（牛顿法）简介', type: 'doc' }],
  ],

  // ━━━━━━━━━ 机器学习 ━━━━━━━━━
  ml1: [ // 监督学习
    [{ title: '监督学习基本框架（输入→标签）', type: 'doc' }, { title: '线性回归原理与公式推导', type: 'video' }, { title: '逻辑回归与 sigmoid 函数', type: 'doc' }],
    [{ title: '损失函数（MSE/CrossEntropy）详解', type: 'video' }, { title: '正则化（L1/L2）防止过拟合', type: 'doc' }, { title: '偏差-方差权衡', type: 'video' }],
    [{ title: '线性回归手写实现', type: 'code' }, { title: '逻辑回归分类练习', type: 'exercise' }, { title: '正则化效果对比实验', type: 'exercise' }],
    [{ title: '监督学习综合测评', type: 'exercise' }, { title: '模型评估指标（Precision/Recall/F1）', type: 'exercise' }],
    [{ title: '核方法与非线性扩展', type: 'doc' }, { title: '半监督学习入门', type: 'video' }, { title: '主动学习策略', type: 'doc' }],
  ],
  ml2: [ // 无监督学习
    [{ title: '无监督学习应用场景概述', type: 'doc' }, { title: 'K-Means 聚类算法原理', type: 'video' }, { title: '降维的意义与方法概览', type: 'doc' }],
    [{ title: 'DBSCAN 与密度聚类', type: 'video' }, { title: 'PCA 降维数学原理', type: 'doc' }, { title: 't-SNE 可视化直觉', type: 'video' }],
    [{ title: 'K-Means 手写实现', type: 'code' }, { title: '聚类效果评估（轮廓系数）', type: 'exercise' }, { title: 'PCA 降维实战', type: 'exercise' }],
    [{ title: '无监督学习综合测评', type: 'exercise' }, { title: '聚类在客户分群中的应用', type: 'exercise' }],
    [{ title: '自编码器与表示学习', type: 'doc' }, { title: '对比学习入门', type: 'video' }, { title: '无监督特征学习前沿', type: 'doc' }],
  ],
  ml3: [ // 决策树/RF
    [{ title: '决策树分裂原理（信息增益）', type: 'doc' }, { title: 'ID3/C4.5/CART 算法对比', type: 'video' }, { title: '随机森林的 Bagging 思想', type: 'doc' }],
    [{ title: '特征重要性排序机制', type: 'video' }, { title: 'OOB 评估与交叉验证', type: 'doc' }, { title: '树模型的过拟合与剪枝', type: 'video' }],
    [{ title: '决策树手写（贪心分裂）', type: 'code' }, { title: 'sklearn 随机森林调参练习', type: 'exercise' }, { title: '特征重要性可视化', type: 'exercise' }],
    [{ title: '树模型综合测评', type: 'exercise' }, { title: '随机森林在表格数据中的优势', type: 'exercise' }],
    [{ title: '梯度提升树（GBDT）原理', type: 'doc' }, { title: 'XGBoost/LightGBM 对比', type: 'video' }, { title: '树模型在竞赛中的应用', type: 'doc' }],
  ],
  ml4: [ // SVM
    [{ title: '最大间隔分类器直觉', type: 'doc' }, { title: '支持向量的定义与作用', type: 'video' }, { title: '软间隔与松弛变量', type: 'doc' }],
    [{ title: '核技巧（RBF/多项式核）', type: 'video' }, { title: 'SVM 对偶问题推导', type: 'doc' }, { title: 'SVM 与逻辑回归的对比', type: 'video' }],
    [{ title: 'sklearn SVM 分类实战', type: 'code' }, { title: '核函数选择实验', type: 'exercise' }, { title: 'SVM 调参（C/gamma）练习', type: 'exercise' }],
    [{ title: 'SVM 综合测评', type: 'exercise' }, { title: 'SVM 在文本分类中的应用', type: 'exercise' }],
    [{ title: 'SVM 回归（SVR）', type: 'doc' }, { title: '大规模 SVM 的近似方法', type: 'video' }, { title: 'SVM 在小样本场景的优势', type: 'doc' }],
  ],
  ml5: [ // 集成学习
    [{ title: '集成学习核心思想（三个臭皮匠）', type: 'doc' }, { title: 'Bagging vs Boosting 对比', type: 'video' }, { title: '偏差-方差分解与集成的关系', type: 'doc' }],
    [{ title: 'AdaBoost 算法详解', type: 'video' }, { title: 'Stacking 混合策略', type: 'doc' }, { title: 'Blending 与多层集成', type: 'video' }],
    [{ title: '实现简单 Bagging 分类器', type: 'code' }, { title: '集成策略对比实验', type: 'exercise' }, { title: 'Kaggle 竞赛中的集成技巧', type: 'exercise' }],
    [{ title: '集成学习综合测评', type: 'exercise' }, { title: '模型融合对精度的提升量化', type: 'exercise' }],
    [{ title: '深度集成（Snapshot Ensemble）', type: 'doc' }, { title: '多模态集成学习', type: 'video' }, { title: '集成在生产环境中的部署', type: 'doc' }],
  ],

  // ━━━━━━━━━ 深度学习 ━━━━━━━━━
  dl1: [ // 神经网络
    [{ title: '感知机模型与激活函数', type: 'doc' }, { title: '多层网络结构与前向传播', type: 'video' }, { title: '万能近似定理', type: 'doc' }],
    [{ title: '反向传播算法推导', type: 'video' }, { title: '梯度消失/爆炸问题', type: 'doc' }, { title: '权重初始化策略', type: 'video' }],
    [{ title: '用 NumPy 手写两层网络', type: 'code' }, { title: '激活函数对比实验', type: 'exercise' }, { title: 'MNIST 手写数字识别', type: 'code' }],
    [{ title: '神经网络基础测评', type: 'exercise' }, { title: '网络深度vs宽度对性能的影响', type: 'exercise' }],
    [{ title: '残差连接与深层网络', type: 'doc' }, { title: '网络架构搜索（NAS）入门', type: 'video' }, { title: '神经网络可解释性', type: 'doc' }],
  ],
  dl2: [ // CNN
    [{ title: '卷积操作的直觉理解', type: 'doc' }, { title: '卷积核/滤波器的工作原理', type: 'video' }, { title: '池化层的作用', type: 'doc' }],
    [{ title: '经典架构 LeNet→AlexNet→VGG', type: 'video' }, { title: 'ResNet 残差学习原理', type: 'doc' }, { title: '感受野计算方法', type: 'video' }],
    [{ title: '用 PyTorch 搭建 CNN', type: 'code' }, { title: 'CIFAR-10 图像分类实战', type: 'code' }, { title: '卷积核可视化实验', type: 'exercise' }],
    [{ title: 'CNN 综合测评', type: 'exercise' }, { title: '数据增强对分类精度的影响', type: 'exercise' }],
    [{ title: '目标检测（YOLO/Faster RCNN）', type: 'doc' }, { title: '语义分割入门', type: 'video' }, { title: 'Vision Transformer（ViT）', type: 'doc' }],
  ],
  dl3: [ // RNN/LSTM
    [{ title: '序列数据与时间步概念', type: 'doc' }, { title: 'RNN 基本结构与隐藏状态', type: 'video' }, { title: '梯度截断解决长期依赖', type: 'doc' }],
    [{ title: 'LSTM 门控机制详解', type: 'video' }, { title: 'GRU 简化门控设计', type: 'doc' }, { title: '双向 RNN 与深层 RNN', type: 'video' }],
    [{ title: '用 LSTM 做文本生成', type: 'code' }, { title: '时间序列预测练习', type: 'exercise' }, { title: 'RNN vs 全连接网络对比', type: 'exercise' }],
    [{ title: '序列模型综合测评', type: 'exercise' }, { title: 'Seq2Seq 在机器翻译中的应用', type: 'exercise' }],
    [{ title: 'Transformer 为何取代 RNN', type: 'doc' }, { title: 'State Space Models 入门', type: 'video' }, { title: '序列建模的未来方向', type: 'doc' }],
  ],
  dl4: [ // Transformer
    [{ title: 'Attention Is All You Need 论文精读', type: 'doc' }, { title: '自注意力机制计算过程', type: 'video' }, { title: 'Multi-Head Attention 原理', type: 'doc' }],
    [{ title: '位置编码（正弦/旋转）详解', type: 'video' }, { title: 'Encoder-Decoder 架构设计', type: 'doc' }, { title: 'Layer Norm 与残差连接', type: 'video' }],
    [{ title: '从零手写 Self-Attention', type: 'code' }, { title: 'Transformer 分类任务实战', type: 'code' }, { title: '注意力权重可视化', type: 'exercise' }],
    [{ title: 'Transformer 架构综合测评', type: 'exercise' }, { title: 'Transformer 复杂度分析', type: 'exercise' }],
    [{ title: 'GPT 系列架构演进', type: 'doc' }, { title: 'Flash Attention 加速原理', type: 'video' }, { title: 'Mamba 与线性注意力', type: 'doc' }],
  ],
  dl5: [ // Attention
    [{ title: '注意力机制的历史演进', type: 'doc' }, { title: 'Bahdanau Attention 原理', type: 'video' }, { title: 'Self-Attention vs Cross-Attention', type: 'doc' }],
    [{ title: '注意力分数计算（点积/加性）', type: 'video' }, { title: '注意力权重的可解释性', type: 'doc' }, { title: '稀疏注意力与高效注意力', type: 'video' }],
    [{ title: '注意力权重热力图绘制', type: 'code' }, { title: '注意力在不同任务中的表现', type: 'exercise' }, { title: '注意力机制变体对比', type: 'exercise' }],
    [{ title: 'Attention 机制综合测评', type: 'exercise' }, { title: '注意力在 CV/NLP 中的跨领域应用', type: 'exercise' }],
    [{ title: '线性注意力与高效 Transformer', type: 'doc' }, { title: '注意力蒸馏技术', type: 'video' }, { title: '可解释 AI 中的注意力分析', type: 'doc' }],
  ],

  // ━━━━━━━━━ 算法与数据结构 ━━━━━━━━━
  a1: [ // 排序与查找
    [{ title: '比较排序复杂度下界', type: 'doc' }, { title: '快速排序分治原理', type: 'video' }, { title: '归并排序稳定性分析', type: 'doc' }],
    [{ title: '堆排序与优先队列', type: 'video' }, { title: '二分查找变体（左/右边界）', type: 'doc' }, { title: '排序算法选择决策树', type: 'video' }],
    [{ title: '手写快排/归并/堆排', type: 'code' }, { title: '二分查找边界题练习', type: 'exercise' }, { title: '排序稳定性验证实验', type: 'exercise' }],
    [{ title: '排序与查找综合测评', type: 'exercise' }, { title: 'O(nlogn) 在大数据中的意义', type: 'exercise' }],
    [{ title: '非比较排序（计数/桶/基数）', type: 'doc' }, { title: '外部排序与磁盘排序', type: 'video' }, { title: '排序在数据库索引中的角色', type: 'doc' }],
  ],
  a2: [ // 数据结构
    [{ title: '数组vs链表内存模型对比', type: 'doc' }, { title: '栈的应用（括号匹配/表达式求值）', type: 'video' }, { title: '队列与滑动窗口', type: 'doc' }],
    [{ title: '哈希表冲突解决（链地址/开放寻址）', type: 'video' }, { title: '红黑树/AVL 树平衡原理', type: 'doc' }, { title: 'B 树/B+ 树在数据库中的应用', type: 'video' }],
    [{ title: '实现 LRU 缓存（哈希+双向链表）', type: 'code' }, { title: '二叉搜索树操作练习', type: 'exercise' }, { title: '堆的建堆与调整操作', type: 'exercise' }],
    [{ title: '数据结构综合测评', type: 'exercise' }, { title: '不同场景下数据结构选型', type: 'exercise' }],
    [{ title: '跳表与概率数据结构', type: 'doc' }, { title: '布隆过滤器原理与应用', type: 'video' }, { title: '一致性哈希在分布式系统中的角色', type: 'doc' }],
  ],
  a3: [ // 图算法
    [{ title: '图的表示（邻接矩阵/邻接表）', type: 'doc' }, { title: 'BFS 广度优先遍历原理', type: 'video' }, { title: 'DFS 深度优先与回溯', type: 'doc' }],
    [{ title: 'Dijkstra 最短路径算法', type: 'video' }, { title: '拓扑排序与任务调度', type: 'doc' }, { title: '最小生成树（Prim/Kruskal）', type: 'video' }],
    [{ title: '用 BFS 求最短路径', type: 'code' }, { title: '拓扑排序应用题', type: 'exercise' }, { title: '图的连通性判断', type: 'exercise' }],
    [{ title: '图算法综合测评', type: 'exercise' }, { title: '图在社交网络分析中的应用', type: 'exercise' }],
    [{ title: 'A* 搜索与启发式算法', type: 'doc' }, { title: '网络流与匹配问题', type: 'video' }, { title: '图神经网络（GNN）入门', type: 'doc' }],
  ],
  a4: [ // 动态规划
    [{ title: '动态规划核心思想（最优子结构）', type: 'doc' }, { title: '重叠子问题与记忆化搜索', type: 'video' }, { title: '状态转移方程设计方法', type: 'doc' }],
    [{ title: '背包问题详解（01/完全/多重）', type: 'video' }, { title: 'LCS/LIS 经典问题', type: 'doc' }, { title: '区间DP与状态压缩', type: 'video' }],
    [{ title: '手写 01 背包 DP', type: 'code' }, { title: 'LIS 最长递增子序列练习', type: 'exercise' }, { title: '编辑距离问题', type: 'exercise' }],
    [{ title: '动态规划综合测评', type: 'exercise' }, { title: 'DP 在序列比对中的应用', type: 'exercise' }],
    [{ title: '概率DP与马尔可夫决策', type: 'doc' }, { title: '强化学习中的 DP 基础', type: 'video' }, { title: 'DP 优化技巧（单调队列/斜率优化）', type: 'doc' }],
  ],

  // ━━━━━━━━━ 工程实践 ━━━━━━━━━
  e1: [ // Python工程
    [{ title: 'Python 虚拟环境（venv/conda）', type: 'doc' }, { title: 'pip/poetry 包管理最佳实践', type: 'video' }, { title: '项目目录结构规范', type: 'doc' }],
    [{ title: '类型提示（Type Hints）详解', type: 'video' }, { title: '代码规范与 PEP8/linting', type: 'doc' }, { title: 'logging 与调试技巧', type: 'video' }],
    [{ title: '搭建 Python 项目脚手架', type: 'code' }, { title: 'pytest 编写单元测试', type: 'code' }, { title: 'requirements.txt 管理练习', type: 'exercise' }],
    [{ title: 'Python 工程能力测评', type: 'exercise' }, { title: '代码质量审查实践', type: 'exercise' }],
    [{ title: 'Python 性能优化技巧', type: 'doc' }, { title: '异步编程（asyncio）入门', type: 'video' }, { title: 'Python 在 ML 工程中的生态', type: 'doc' }],
  ],
  e2: [ // 版本控制
    [{ title: 'Git 基本概念（仓库/分支/提交）', type: 'doc' }, { title: 'Git 工作流（commit/push/pull）', type: 'video' }, { title: '分支管理策略（Git Flow）', type: 'doc' }],
    [{ title: 'merge vs rebase 的选择', type: 'video' }, { title: '冲突解决实操', type: 'doc' }, { title: 'Git bisect 与代码溯源', type: 'video' }],
    [{ title: '创建分支并提交 PR', type: 'code' }, { title: '解决合并冲突练习', type: 'exercise' }, { title: '.gitignore 配置', type: 'exercise' }],
    [{ title: '版本控制综合测评', type: 'exercise' }, { title: '团队协作 Git 工作流考核', type: 'exercise' }],
    [{ title: 'Git Hooks 与 CI/CD 集成', type: 'doc' }, { title: '大型仓库管理策略', type: 'video' }, { title: 'Git 在 MLOps 中的角色', type: 'doc' }],
  ],
  e3: [ // 模型部署
    [{ title: '模型序列化（pickle/torchscript）', type: 'doc' }, { title: 'REST API 设计基础', type: 'video' }, { title: 'Flask/FastAPI 服务搭建', type: 'doc' }],
    [{ title: 'Docker 容器化打包模型', type: 'video' }, { title: '模型量化与压缩', type: 'doc' }, { title: 'ONNX 格式转换与推理', type: 'video' }],
    [{ title: '用 FastAPI 部署推理服务', type: 'code' }, { title: 'Dockerfile 编写练习', type: 'code' }, { title: '模型推理基准测试', type: 'exercise' }],
    [{ title: '部署综合测评', type: 'exercise' }, { title: '端到端部署流程考核', type: 'exercise' }],
    [{ title: 'Kubernetes 编排入门', type: 'doc' }, { title: 'A/B 测试与灰度发布', type: 'video' }, { title: 'MLOps 全流程概览', type: 'doc' }],
  ],

  // ━━━━━━━━━ NLP与应用 ━━━━━━━━━
  n1: [ // 词向量
    [{ title: '分布式假设（Harris 假说）', type: 'doc' }, { title: 'Word2Vec（CBOW/Skip-gram）原理', type: 'video' }, { title: '词向量的数学表示', type: 'doc' }],
    [{ title: '词向量相似度计算与类比', type: 'video' }, { title: 'GloVe 全局向量方法', type: 'doc' }, { title: 'FastText 子词嵌入', type: 'video' }],
    [{ title: '用 Gensim 训练词向量', type: 'code' }, { title: '词向量可视化（t-SNE）', type: 'exercise' }, { title: '词类比任务练习', type: 'exercise' }],
    [{ title: '词向量综合测评', type: 'exercise' }, { title: '词向量在下游任务中的迁移', type: 'exercise' }],
    [{ title: '上下文化词向量（ELMo）', type: 'doc' }, { title: '从词向量到句子嵌入', type: 'video' }, { title: '多语言词向量', type: 'doc' }],
  ],
  n2: [ // LLM
    [{ title: '语言模型基本概念（困惑度）', type: 'doc' }, { title: 'GPT 系列架构演进', type: 'video' }, { title: 'BERT 预训练与微调', type: 'doc' }],
    [{ title: 'In-Context Learning 原理', type: 'video' }, { title: 'Chain-of-Thought 推理', type: 'doc' }, { title: 'LLM 的涌现能力', type: 'video' }],
    [{ title: 'Prompt Engineering 实战', type: 'exercise' }, { title: '用 HuggingFace 调用 LLM', type: 'code' }, { title: 'Few-shot vs Zero-shot 对比实验', type: 'exercise' }],
    [{ title: 'LLM 综合测评', type: 'exercise' }, { title: 'LLM 在不同任务中的表现分析', type: 'exercise' }],
    [{ title: 'MoE（混合专家）架构', type: 'doc' }, { title: '长上下文技术（RoPE/ALiBi）', type: 'video' }, { title: 'LLM 推理加速（KV Cache/投机解码）', type: 'doc' }],
  ],
  n3: [ // 微调与对齐
    [{ title: '全参数微调 vs LoRA 微调', type: 'doc' }, { title: '指令微调（Instruction Tuning）', type: 'video' }, { title: '数据准备与格式规范', type: 'doc' }],
    [{ title: 'RLHF 奖励模型原理', type: 'video' }, { title: 'DPO 直接偏好优化', type: 'doc' }, { title: '对齐税与安全性的权衡', type: 'video' }],
    [{ title: '用 LoRA 微调小模型', type: 'code' }, { title: '构建微调数据集', type: 'exercise' }, { title: '微调效果评估', type: 'exercise' }],
    [{ title: '微调与对齐综合测评', type: 'exercise' }, { title: '微调在垂直领域的应用', type: 'exercise' }],
    [{ title: '宪法 AI（Constitutional AI）', type: 'doc' }, { title: 'RLAIF 替代人类标注', type: 'video' }, { title: '对齐技术前沿综述', type: 'doc' }],
  ],
  n4: [ // 检索增强
    [{ title: 'RAG 基本架构（检索+生成）', type: 'doc' }, { title: '向量数据库原理（FAISS/Milvus）', type: 'video' }, { title: '文档分块与嵌入策略', type: 'doc' }],
    [{ title: '混合检索（BM25+向量）', type: 'video' }, { title: '重排序（Reranking）优化', type: 'doc' }, { title: '检索质量评估指标', type: 'video' }],
    [{ title: '用 LangChain 搭建 RAG', type: 'code' }, { title: '文档嵌入与检索实验', type: 'code' }, { title: 'RAG vs 长上下文对比', type: 'exercise' }],
    [{ title: 'RAG 综合测评', type: 'exercise' }, { title: 'RAG 在企业知识库中的应用', type: 'exercise' }],
    [{ title: 'GraphRAG 图增强检索', type: 'doc' }, { title: 'Self-RAG 自检索机制', type: 'video' }, { title: '多模态 RAG 入门', type: 'doc' }],
  ],
}

const STAGE_META = [
  { id: 'pre', label: '课前预习', icon: BookOpen, color: '#7c3aed' },
  { id: 'in', label: '课中答疑', icon: MessageCircle, color: '#00d4ff' },
  { id: 'post', label: '课后巩固', icon: RefreshCw, color: '#06d6a0' },
  { id: 'eval', label: '阶段测评', icon: ClipboardCheck, color: '#f59e0b' },
  { id: 'final', label: '期末辅导', icon: GraduationCap, color: '#f43f5e' },
]

const stages = computed(() => {
  const domain = props.domain
  const topic = props.topic
  if (!domain || !topic) return []

  return STAGE_META.map((meta, idx) => {
    const topicContent: { title: string; type: string; isRemedial?: boolean }[] = []

    // 只取被点击的那颗星的内容
    const nodeStages = NODE_CONTENT[topic.id]
    if (nodeStages && nodeStages[idx]) {
      nodeStages[idx].forEach(r => {
        topicContent.push({ ...r, isRemedial: r.isRemedial || topic.mastery < 0.2 })
      })
    }

    const mastery = topic.mastery
    let status: 'completed' | 'current' | 'locked' = 'locked'
    if (mastery >= 0.7) status = 'completed'
    else if (mastery >= 0.2) status = 'current'

    return {
      ...meta,
      status,
      mastery,
      resources: topicContent.length > 0 ? topicContent : [{ title: `${topic.label} - ${meta.label} 资源加载中`, type: 'doc' }],
    }
  })
})

function toggleStage(id: string) {
  activeStage.value = activeStage.value === id ? null : id
}

watch(() => props.topic?.id, () => { activeStage.value = null })
</script>

<template>
  <div class="path-view" v-if="domain && topic">
    <div class="path-banner">
      <span class="path-banner-dot" :style="{ background: domain.color, boxShadow: `0 0 10px ${domain.color}66` }"></span>
      <span>「{{ topic.label }}」掌握度 {{ Math.round(topic.mastery * 100) }}% · {{ topic.mastery < 0.3 ? '需要重点学习' : topic.mastery < 0.7 ? '继续深入' : '已较好掌握' }}</span>
    </div>

    <div class="path-timeline">
      <div class="timeline-line" />

      <div
        v-for="(stage, idx) in stages"
        :key="stage.id"
        :class="['path-stage', { active: activeStage === stage.id }]"
        :style="{ '--stage-color': stage.color }"
      >
        <div class="stage-header" @click="toggleStage(stage.id)">
          <div class="stage-marker">
            <div class="marker-dot" />
            <div class="marker-ring" />
          </div>
          <div class="stage-info">
            <div class="stage-top-row">
              <component :is="stage.icon" :size="16" stroke-width="1.5" class="stage-icon" />
              <span class="stage-label">{{ stage.label }}</span>
              <span class="stage-index">Phase {{ idx + 1 }}</span>
            </div>
            <span class="stage-count">{{ stage.resources.length }} 个资源</span>
          </div>
          <span :class="['stage-chevron', { open: activeStage === stage.id }]">›</span>
        </div>

        <Transition name="expand">
          <div v-if="activeStage === stage.id" class="stage-resources">
            <div v-for="(res, ri) in stage.resources" :key="ri" :class="['stage-resource', { remedial: res.isRemedial }]">
              <div class="res-connector" />
              <div class="res-content">
                <span class="res-title">{{ res.title }}</span>
                <span v-if="res.isRemedial" class="remedial-badge">评估后新增</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-view { padding: 0 40px 40px; }
.path-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 14px;
  background: rgba(12, 12, 30, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 28px; font-size: 13px; color: #8892b0; line-height: 1.6;
}
.path-banner-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.path-timeline { position: relative; display: flex; flex-direction: column; }
.timeline-line {
  position: absolute; left: 15px; top: 20px; bottom: 20px; width: 2px;
  background: linear-gradient(to bottom, rgba(124,58,237,.25), rgba(0,212,255,.25), rgba(6,214,160,.25), rgba(245,158,11,.25), rgba(244,63,94,.25));
  border-radius: 2px;
}
.path-stage { position: relative; padding-left: 44px; padding-bottom: 8px; }
.stage-header {
  display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 14px;
  background: rgba(12,12,30,.55); backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.06); cursor: pointer; transition: all .25s ease;
}
.stage-header:hover { border-color: color-mix(in srgb, var(--stage-color) 30%, transparent); background: rgba(12,12,30,.75); }
.path-stage.active .stage-header {
  border-color: color-mix(in srgb, var(--stage-color) 35%, transparent);
  background: rgba(12,12,30,.85);
  box-shadow: 0 6px 24px rgba(0,0,0,.2), 0 0 16px color-mix(in srgb, var(--stage-color) 8%, transparent);
}
.stage-marker { position: absolute; left: 6px; top: 24px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.marker-dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--stage-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--stage-color) 40%, transparent); z-index: 1;
}
.marker-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--stage-color) 20%, transparent); transition: all .3s ease;
}
.path-stage.active .marker-ring { border-color: color-mix(in srgb, var(--stage-color) 45%, transparent); transform: scale(1.3); }
.stage-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.stage-top-row { display: flex; align-items: center; gap: 8px; }
.stage-icon { color: var(--stage-color); }
.stage-label { font-family: var(--font-display); font-size: 17px; color: #e8edf5; font-weight: 400; }
.stage-index {
  font-size: 10px; padding: 2px 8px; border-radius: 6px;
  background: color-mix(in srgb, var(--stage-color) 8%, transparent); color: var(--stage-color);
  font-family: var(--font-mono); font-weight: 600; letter-spacing: .06em;
}
.stage-count { font-size: 11px; color: #4a5568; font-family: var(--font-mono); }
.stage-chevron { font-size: 18px; color: #4a5568; transition: all .25s ease; }
.stage-chevron.open { transform: rotate(90deg); color: var(--stage-color); }
.stage-resources { padding: 10px 0 4px 18px; display: flex; flex-direction: column; gap: 6px; }
.stage-resource {
  display: flex; align-items: center; gap: 10px; padding: 11px 16px; border-radius: 12px;
  background: rgba(12,12,30,.4); border: 1px solid rgba(255,255,255,.04); transition: all .25s ease;
}
.stage-resource:hover { border-color: rgba(0,212,255,.12); background: rgba(12,12,30,.6); }
.stage-resource.remedial { border-color: rgba(6,214,160,.18); background: rgba(6,214,160,.04); }
.stage-resource.remedial:hover { border-color: rgba(6,214,160,.3); }
.res-connector {
  width: 6px; height: 6px; border-radius: 50%; background: var(--stage-color); opacity: .5;
  flex-shrink: 0; box-shadow: 0 0 6px color-mix(in srgb, var(--stage-color) 25%, transparent);
}
.res-content { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
.res-title { font-size: 13px; color: #e8edf5; }
.remedial-badge {
  font-size: 10px; font-weight: 600; padding: 2px 9px; border-radius: 6px;
  background: rgba(6,214,160,.1); color: rgba(123,255,200,.9); white-space: nowrap;
  letter-spacing: .04em; font-family: var(--font-mono);
}
.expand-enter-active { transition: all .25s ease; }
.expand-leave-active { transition: all .15s ease-in; }
.expand-enter-from { opacity: 0; transform: translateY(-8px); }
.expand-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
