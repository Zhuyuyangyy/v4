import type { Resource, Recommendation, CollectionItem } from '../types/edu-mind'

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: '微服务架构设计指南',
    description: '深入讲解微服务架构的设计原则、核心模式与高并发治理最佳实践。',
    category: '文档',
    tags: ['架构设计', '微服务', '后端开发'],
    date: '2024-05-20',
    views: 1200,
    starred: true,
    featured: true,
    difficulty: '高级',
    author: '架构大师张三',
    rating: 4.8,
    estimatedTime: '45分钟',
    contentMarkdown: `## 🏆 微服务架构设计指南

微服务架构是一种将单一应用程序开发为一组小型服务的方法，每个服务在自己的进程中运行，并使用轻量级机制（通常是HTTP REST API或gRPC）进行通信。

### 核心设计原则
1. **单一职责原则 (Single Responsibility)**: 每一个微服务应该专注于解决一个具体、明确的业务问题。
2. **服务自治 (Service Autonomy)**: 每个微服务都拥有独立的开发、测试、部署、升级和数据源控制。
3. **去中心化治理 (Decentralized Governance)**: 根据具体业务需要决定技术栈，不强求统一。

### 关键架构保障
- **服务网关 (API Gateway)**: 作为统一入口，提供路由、自愈、安全和限流。
- **服务注册与发现 (Service Registry)**: 控制并监控大量微服务节点的生命周期与健康状态。
- **断路器 (Circuit Breaker)**: 在下游服务雪崩时熔断，并进行服务降级。

*祝你在构建超大规模云原生架构实践旅程中取得成功！*`
  },
  {
    id: 'res-2',
    title: '计算机网络知识体系',
    description: '计算机网络从经典五层模型到进阶协议重点知识点，包括三次握手与四次挥手深度图解。',
    category: '思维导图',
    tags: ['计算机网络', 'TCP/IP', '网络协议'],
    date: '2024-05-18',
    views: 845,
    starred: false,
    difficulty: '中级',
    author: '网络研究所',
    rating: 4.6,
    estimatedTime: '25分钟',
    contentMarkdown: `## 🌐 计算机网络知识体系 (系统化整理)

快速梳理网络底层逻辑，是每位技术工程师升级进阶的核心基础。

### 经典五层参考模型
- **应用层**: DNS, HTTP, HTTPS, FTP, SMTP
- **传输层**: TCP (保障可靠到达), UDP (极致性能，无连接)
- **网络层**: IP 协议，核心进行寻找路由和子网划分
- **数据链路层**: MAC 地址与网络交换机数据帧广播
- **物理层**: 双绞线、光纤、比特流传输机制

### TCP 三次握手极简图解
1. **Client -> SYN -> Server**: 客户端："你好，听到吗？"
2. **Server -> SYN+ACK -> Client**: 服务端："听到了！你能听到我吗？"
3. **Client -> ACK -> Server**: 客户端："能！我们开始说话吧！"`
  },
  {
    id: 'res-3',
    title: '用户注册与授权流程图',
    description: '详细展示现代Web应用中采用OAuth2 + JWT双令牌刷新的核心安全注册与登录流转流程。',
    category: '流程图',
    tags: ['流程设计', '安全防护', '产品设计'],
    date: '2024-05-17',
    views: 623,
    starred: false,
    difficulty: '中级',
    author: '安全团队小李',
    rating: 4.5,
    estimatedTime: '15分钟',
    contentMarkdown: `## 📌 用户注册与第三方授权全维度流程图

这是一个涵盖本地注册以及第三方接入时（OAuth2）的双核心时序流程。

### JWT 双令牌安全体系 (Access + Refresh Token)
1. **鉴权成功**: 颁发 \`access_token\`（有效期15分钟）加 \`refresh_token\`（有效期7天，存于安全HttpOnly Cookie）。
2. **调用受期路由**: 客户端携带 \`access_token\` 鉴权。
3. **过期后无感刷新**: 客户端静默向后端 \`/api/auth/refresh\` 路由发送 \`refresh_token\` 并静默更换全新的 \`access_token\` 。

> 这种机制完美实现了安全保障与用户流畅体验的完美统一。`
  },
  {
    id: 'res-4',
    title: '数据结构与经典算法刷题集',
    description: '重温大厂面试经典：包含双指针、回溯、贪心算法、动态规划及高频100题深度剖析。',
    category: '习题',
    tags: ['数据结构', '算法', '高频面试题'],
    date: '2024-05-16',
    views: 2100,
    starred: false,
    difficulty: '高级',
    author: '刷题达人',
    rating: 4.9,
    estimatedTime: '120分钟',
    contentMarkdown: `## 📝 数据结构与算法极致训练营

本习题册是深入理解工程底层思维和各大技术企业核心面试筛选的最高频难题合集。

### 核心解题套路精编
1. **双指针法 (Two Pointers)**: 解决有序数组冲突和最长连续区间问题的好手。
2. **滑窗机制 (Sliding Window)**: 重在维持一个符合特定条件的双向伸缩开口。
3. **DFS/BFS 选择**: 深度遍历偏向"不撞南墙不回头"（状态空间巨大较合适），广度遍历天然是寻找"最短路径/最小代价"。

### 高频大厂热点题目
- 无重复字符的最长子串
- 二叉树的最近公共祖先
- 三数之和
- 接雨水问题（经典双指针）`
  },
  {
    id: 'res-5',
    title: 'Spring Boot 零基础极速入门',
    description: '从工程开端到核心组件装配，全面详解自动配置机制与Starter封装实战。',
    category: '视频',
    tags: ['Spring Boot', 'Java', '后端开发'],
    date: '2024-05-15',
    views: 3400,
    starred: true,
    featured: true,
    difficulty: '初级',
    author: 'IT研习社',
    rating: 4.7,
    estimatedTime: '90分钟',
    contentMarkdown: `## 🎥 高清视频教程：Spring Boot 敏捷开发实战落地

本在线视频教程聚焦于如何使用 Spring Boot 快速构建符合云原生产业规范的核心后端服务。

### 精讲核心大纲
1. **环境一键配置**: 使用 Maven 构建多云骨架项目。
2. **自动配置原理**: 详解 \`@SpringBootApplication\` 下包含的 \`@EnableAutoConfiguration\`。
3. **条件装配魔法**: 初探 \`@ConditionalOnClass\` 和 \`@ConditionalOnProperty\`。
4. **数据接入集成**: 自适应多数据源、Spring Data JPA 与 MyBatis Plus 快捷选用。

*请点击下方或通过资源中心页面直接解锁完整的在线音视频直播与多媒体代码课程。*`
  },
  {
    id: 'res-6',
    title: 'Python 进阶网络爬虫实战',
    description: '涵盖 Scrapy 分布式框架技术，JS逆向解密安全对抗以及反反爬虫策略体系落地。',
    category: '代码',
    tags: ['Python', '爬虫工程师', '安全对抗'],
    date: '2024-05-14',
    views: 1500,
    starred: false,
    difficulty: '高级',
    author: '数据探针队',
    rating: 4.4,
    estimatedTime: '60分钟',
    contentMarkdown: `## 🐍 Python 深度分布式网络爬虫实战

面向生产环境的结构化海量数据高效采集。

### 反爬虫策略终极应对方案：
- **IP 代理池设计**: 自动轮询请求，去除失效节点。
- **动态渲染页面防护**: 采用 Playwright 异步队列，渲染完整的加密脚本内容。
- **自定义 User-Agent / Cookie 伪装策略**: 近似仿真真实普通用户的系统参数调用链路。

\`\`\`python
# 核心下载拦截中间件示例 (简易版)
import random

class RandomUserAgentMiddleware:
    def __init__(self, user_agents):
        self.user_agents = user_agents

    def process_request(self, request, spider):
        request.headers['User-Agent'] = random.choice(self.user_agents)
\`\`\``
  },
  {
    id: 'res-7',
    title: 'Linux 核心必会命令手册',
    description: '日常研发及生产环境部署中最常用、最高效的Linux经典命令汇总及实战演示。',
    category: '文档',
    tags: ['Linux', '终端命令', 'DevOps运维'],
    date: '2024-05-13',
    views: 982,
    starred: false,
    difficulty: '初级',
    author: '运维老张',
    rating: 4.3,
    estimatedTime: '30分钟',
    contentMarkdown: `## 🐧 Linux 经典研发与系统维护大指南

本手册不堆砌所有底层命令，而是直接精准切入在研发团队工作中用得最多、救命频率最高的核心集合。

### 监控资源负载三驾马车
1. \`top\` / \`htop\`: 全维度的 CPU、内存、进程占用状态交互。
2. \`df -h\`: 快速查看节点各存储扇区卷容量分布。
3. \`free -m\`: 精确查询物理内存與交换分区分配和预留大小。

### 经典利器：日志诊断流
- **实时滚屏**: \`tail -f /var/log/nginx/error.log\`
- **正则检索**: \`grep -rn "NullPointerException" ./logs/\`
- **统计合并**: \`awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 10\` (统计前十名高访问IP)`
  },
  {
    id: 'res-8',
    title: '机器学习算法导图',
    description: '覆盖监督、无监督、深度学习核心算法的理论知识归纳与业务选择决策图谱。',
    category: '思维导图',
    tags: ['人工智能', '机器学习', '数据建模'],
    date: '2024-05-12',
    views: 1100,
    starred: false,
    difficulty: '高级',
    author: 'AI前沿实验室',
    rating: 4.7,
    estimatedTime: '55分钟',
    contentMarkdown: `## 🤖 机器学习基础算法与架构模型选择思维导图

一张图看清各个经典算法模型在现实推荐、图像、预测和分类任务中的核心位置。

### 核心演化节点
1. **监督式学习 (Supervised Learnings)**:
   - 线性回归 & 逻辑回归
   - 决策树与集成学习 (Random Forest, XGBoost, LightGBM)
   - 支持向量机 (SVM)
2. **无监督式学习 (Unsupervised)**:
   - 聚类算法: K-Means, DBScan
   - 降维机制: PCA
3. **强化/深度模型**:
   - 卷积神经网络 (CNN) —— 图像视觉主力
   - 循环神经网络 (RNN/LSTM) —— 时间序列预测`
  },
  {
    id: 'res-9',
    title: '系统登录模块架构方案',
    description: '包含单点登录 (SSO)、OAuth、防中间人攻击与令牌续期机制的系统登录流程规划。',
    category: '流程图',
    tags: ['架构设计', '登录体系', '多点漫游'],
    date: '2024-05-11',
    views: 654,
    starred: false,
    difficulty: '中级',
    author: '安全架构组',
    rating: 4.5,
    estimatedTime: '20分钟',
    contentMarkdown: `## 🔐 生产级高安全性单点登录 (SSO) 与鉴权架构

本文档基于大中型分布式系统的演进，详解登录阶段的多点漫游及会话维持。

### CAS 单点登录主要流程
1. 客户端访问系统子模块A，子模块重定向至统一认证中心。
2. 认证中心完成用户校验登录，颁发 TGT (Ticket Granting Ticket)。
3. 为子系统A签发临时 ST (Service Ticket) 并重定向。
4. 子系统A后端在幕后与认证中心通信直接校验该票据，成功后完成登录。`
  },
  {
    id: 'res-10',
    title: 'Docker 容器化基础实战',
    description: '容器革命之源：带你精通 Dockerfile 编写，分层原理与镜像瘦身大法。',
    category: '文档',
    tags: ['Docker', 'DevOps', '云原生'],
    date: '2024-05-09',
    views: 1420,
    starred: false,
    difficulty: '初级',
    author: 'DevOps专家班',
    rating: 4.6,
    estimatedTime: '35分钟',
    contentMarkdown: `## 🐋 零基础 Docker 实操训练指南

理解容器背后的进程隔离、命名空间及联合文件系统机制。

### 分层构建与最佳瘦身法则
- **选取精简的基础镜像**: 尽量采用 \`alpine\` 或是 \`slim\` 构建（例如从 \`node:20\` 瘦身至 \`node:20-alpine\`，能够节省数十倍大小）。
- **合并 Run 命令**: 尽量把多个 \`RUN\` 命令通过 \`&&\` 合并在同一层，减少生成的中间临时镜像厚度。
- **使用多阶段构建 (Multi-stage builds)**: 开发、测试依赖仅在构建阶段加载，最终容器内只包含生产环境制品。`
  }
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  { id: 'rec-1', title: '操作系统经典真题思维导图', category: '思维导图', views: 756, starred: false, iconType: 'mindmap' },
  { id: 'rec-2', title: 'Redis 进阶从零到集群破壁', category: '视频', views: 2300, starred: false, iconType: 'video' },
  { id: 'rec-3', title: '企业级大单全套电商实战代码', category: '代码', views: 1200, starred: false, iconType: 'code' },
  { id: 'rec-4', title: 'MySQL 锁机制及高频面试题', category: '习题', views: 987, starred: false, iconType: 'exercise' },
  { id: 'rec-5', title: 'Docker 容器化全套保姆级指南', category: '文档', views: 1800, starred: true, iconType: 'document' },
  { id: 'rec-6', title: 'React 19 特型与并发模式原理', category: '文档', views: 1450, starred: false, iconType: 'document' },
  { id: 'rec-7', title: 'Golang 高流处理管道实录', category: '代码', views: 890, starred: false, iconType: 'code' },
];

export const INITIAL_COLLECTIONS: CollectionItem[] = [
  { id: 'res-1', title: '微服务架构设计指南', category: '文档', date: '2024-05-20' },
  { id: 'res-5', title: 'Spring Boot 入门教程', category: '视频', date: '2024-05-15' },
  { id: 'res-2', title: '计算机网络知识体系', category: '思维导图', date: '2024-05-18' }
];

export const SHUFFLED_RECOMMENDATIONS_GROUPS: Recommendation[][] = [
  [
    { id: 'rec-1', title: '操作系统经典真题思维导图', category: '思维导图', views: 756, starred: false, iconType: 'mindmap' },
    { id: 'rec-2', title: 'Redis 进阶从零到集群破壁', category: '视频', views: 2300, starred: false, iconType: 'video' },
    { id: 'rec-3', title: '企业级大单全套电商实战代码', category: '代码', views: 1200, starred: false, iconType: 'code' },
    { id: 'rec-4', title: 'MySQL 锁机制及高频面试题', category: '习题', views: 987, starred: false, iconType: 'exercise' },
    { id: 'rec-5', title: 'Docker 容器化全套保姆级指南', category: '文档', views: 1800, starred: true, iconType: 'document' }
  ],
  [
    { id: 'rec-6', title: 'React 19 特型与并发模式原理', category: '文档', views: 1450, starred: false, iconType: 'document' },
    { id: 'rec-7', title: 'Golang 高流处理管道实录', category: '代码', views: 890, starred: false, iconType: 'code' },
    { id: 'rec-2', title: 'Redis 进阶从零到集群破壁', category: '视频', views: 2300, starred: false, iconType: 'video' },
    { id: 'rec-1', title: '操作系统经典真题思维导图', category: '思维导图', views: 756, starred: false, iconType: 'mindmap' },
    { id: 'rec-4', title: 'MySQL 锁机制及高频面试题', category: '习题', views: 987, starred: false, iconType: 'exercise' }
  ],
  [
    { id: 'rec-4', title: 'MySQL 锁机制及高频面试题', category: '习题', views: 987, starred: false, iconType: 'exercise' },
    { id: 'rec-5', title: 'Docker 容器化全套保姆级指南', category: '文档', views: 1800, starred: true, iconType: 'document' },
    { id: 'rec-7', title: 'Golang 高流处理管道实录', category: '代码', views: 890, starred: false, iconType: 'code' },
    { id: 'rec-6', title: 'React 19 特型与并发模式原理', category: '文档', views: 1450, starred: false, iconType: 'document' },
    { id: 'rec-3', title: '企业级大单全套电商实战代码', category: '代码', views: 1200, starred: false, iconType: 'code' }
  ]
];
