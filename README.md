# EduMind — 多智能体个性化学习闭环

基于 `Vue 3 + Vite + TypeScript` 的多智能体个性化学习平台，面向 **软件杯 A3 赛题**——"基于大模型的个性化资源生成与学习多智能体系统"。

## 推荐演示流程

```text
1. 首页 → 查看学习闭环驾驶舱（画像摘要、今日路径、评估反馈、下一步推荐）
2. 首页 → 浏览多智能体执行链（每个节点显示输入/处理/输出/状态）
3. 画像页 → 完成问卷，触发 ProfileAgent 分析（自动生成 trace）
4. 资源页 → 点击任意资源卡片的"为什么推荐？"，查看推荐证据链
5. 路径页 → 查看评估后路径重规划对比（评估前路径 vs 评估后路径）
6. 评估页 → 查看画像更新记录（更新前 → 评估证据 → 更新后）
7. 评估页 → 点击成长知识树红色薄弱节点，查看错因、补救资源、路径影响
8. 证据链页 → 查看所有 Agent 协作 trace、Agent 统计、fallback 率、LLM 状态
9. 一键闭环 → POST /api/agents/run 触发 6 Agent 完整闭环
```

## 核心叙事闭环

每个 AI 决策都有可追溯的证据链：

| 页面     | 叙事重点           | 可交互证据         |
| -------- | ------------------ | ------------------ |
| 首页     | 闭环驾驶舱         | 实时画像 + 今日路径 |
| 画像页   | 画像如何生成       | ProfileAgent trace |
| 资源页   | 为什么推荐这个资源 | 推荐证据链弹窗     |
| 路径页   | 为什么路径改变     | 评估前后路径对比   |
| 评估页   | 为什么画像更新     | 画像更新记录       |
| 知识树   | 薄弱点触发补救     | 点击查看详情+按钮  |
| 证据链页 | Agent 协作全过程   | trace + Agent 统计 |
| Agent 图 | 谁处理了什么数据   | 输入/处理/输出/状态|

## 项目结构

- [src/views](D:/ZYY_Project/v4/src/views) 页面视图
- [src/composables](D:/ZYY_Project/v4/src/composables) 组合式逻辑
- [src/components](D:/ZYY_Project/v4/src/components) 组件（agent / dashboard / evaluation / knowledge-tree / learning-path / resources 等）
- [src/lib/api.ts](D:/ZYY_Project/v4/src/lib/api.ts) 前端 API 请求封装
- [src/types/api.ts](D:/ZYY_Project/v4/src/types/api.ts) API 类型定义
- [server/index.js](D:/ZYY_Project/v4/server/index.js) 轻量本地 API 服务入口
- [server/data.js](D:/ZYY_Project/v4/server/data.js) 当前接口 mock 数据与简单业务逻辑
- [server/content](D:/ZYY_Project/v4/server/content) JSON 数据源
- [server/agents/orchestrator.js](D:/ZYY_Project/v4/server/agents/orchestrator.js) Agent 调度器
- [server/agents/profile-agent.js](D:/ZYY_Project/v4/server/agents/profile-agent.js) 画像分析 Agent
- [server/agents/resource-agent.js](D:/ZYY_Project/v4/server/agents/resource-agent.js) 资源生成 Agent
- [server/agents/path-agent.js](D:/ZYY_Project/v4/server/agents/path-agent.js) 路径规划 Agent
- [server/agents/tutor-agent.js](D:/ZYY_Project/v4/server/agents/tutor-agent.js) 辅导 Agent
- [server/agents/evaluation-agent.js](D:/ZYY_Project/v4/server/agents/evaluation-agent.js) 评估 Agent
- [server/agents/reflection-agent.js](D:/ZYY_Project/v4/server/agents/reflection-agent.js) 反思 Agent
- [server/llm/provider.js](D:/ZYY_Project/v4/server/llm/provider.js) LLM 统一接入层
- [server/evidence/recorder.js](D:/ZYY_Project/v4/server/evidence/recorder.js) 证据记录器
- [server/schemas.js](D:/ZYY_Project/v4/server/schemas.js) Agent 输入输出 Schema

## 启动方式

先启动本地 API：

```bash
npm run server
```

再启动前端开发环境：

```bash
npm run dev
```

如果希望后端自动监听重启：

```bash
npm run dev:server
```

说明：

- Vite 已通过 [vite.config.ts](D:/ZYY_Project/v4/vite.config.ts) 把 `/api` 代理到 `http://localhost:8787`
- 默认 API 端口是 `8787`

## 已提供 API

### 基础接口

- `GET /api/health`
- `POST /api/profile/analyze` — 画像分析（已接入 ProfileAgent + trace）
- `POST /api/chat` — 自由对话（已接入 trace 记录）
- `POST /api/tutoring/ask` — 智能辅导（已接入 TutorAgent + trace）
- `GET /api/tutoring/topics`
- `GET /api/resources`
- `GET /api/resources/recommended`
- `GET /api/learning-path`
- `GET /api/evaluation`
- `GET /api/profile/latest`
- `GET /api/chat/history`
- `GET /api/tutoring/history`

### A3 多智能体接口

- `POST /api/agents/profile` — ProfileAgent 画像分析
- `POST /api/resources/generate` — ProfileAgent → ResourceAgent 个性化资源生成
- `POST /api/agents/tutor` — ProfileAgent → TutorAgent 智能辅导
- `POST /api/agents/evaluate` — EvaluationAgent → ReflectionAgent 综合评估
- `POST /api/agents/path-replan` — EvaluationAgent → PathAgent 路径重规划
- `POST /api/agents/run` — 一键完整闭环（6 Agent 串行）

### 证据链接口

- `GET /api/evidence/traces` — 查询 trace 列表
- `GET /api/evidence/summary` — trace 统计摘要（含 LLM 状态）

## 页面接入说明

### 学习画像

- 文件：[useProfileSurvey.ts](D:/ZYY_Project/v4/src/composables/useProfileSurvey.ts)
- 优先请求 `/api/profile/analyze`
- 请求失败时回退到前端本地生成逻辑

### 学习资源

- 文件：[Resources.vue](D:/ZYY_Project/v4/src/views/Resources.vue)
- 页面加载时请求资源列表和推荐资源
- 资源卡片包含推荐证据链弹窗（画像标签 → 评估证据 → 路径阶段 → 形式选择）
- 证据链包含具体数字：正确率、提问次数、学习阶段等

### 学习路径

- 文件：[LearningPath.vue](D:/ZYY_Project/v4/src/views/LearningPath.vue)
- 六阶段路径：课前预习 → 课中答疑 → 课后巩固 → 阶段测评 → 期末辅导 → 成果沉淀
- 评估后路径重规划对比展示，新增补救步骤以红色/黄色标签标注

### 效果评估

- 文件：[Evaluation.vue](D:/ZYY_Project/v4/src/views/Evaluation.vue)
- 成长知识树支持点击薄弱节点查看错因、补救资源、路径影响
- 点击"加入下一轮路径"按钮触发前端模拟反馈
- 画像更新记录展示更新前后对比及评估证据

### 智能辅导

- 文件：[Tutoring.vue](D:/ZYY_Project/v4/src/views/Tutoring.vue)
- 提问时调用 `/api/tutoring/ask`
- 请求期间禁用输入和按钮，并显示"正在思考中..."

### 自由对话

- 文件：[Chat.vue](D:/ZYY_Project/v4/src/views/Chat.vue)
- 提问时调用 `/api/chat`
- 保留流式打字效果和本地 fallback 回复

## 后端说明

当前后端是轻量 Node HTTP 服务，已接入多智能体系统：

- 接口数据从 [server/content](D:/ZYY_Project/v4/server/content) 下的 JSON 文件读取，改数据不需要改代码
- `readJson` 增加了 1MB body 大小限制，并对非法 JSON 返回 `400`
- 新增 [server/store.json](D:/ZYY_Project/v4/server/store.json) 作为轻量持久化文件
- 6 个专业 Agent + Orchestrator，每个 Agent 支持 LLM 调用 + 本地 fallback
- 证据链自动记录，主流程（画像、辅导、对话）均已接入 trace

当前持久化接口：

- `GET /api/profile/latest`
- `GET /api/chat/history`
- `GET /api/tutoring/history`

## 校验

```bash
./node_modules/.bin/vue-tsc --noEmit
```

也可以直接手动验证接口：

```bash
curl -s http://localhost:8787/api/health
curl -s http://localhost:8787/api/learning-path
curl -s http://localhost:8787/api/evaluation

# 测试 A3 多智能体接口
curl -s -X POST http://localhost:8787/api/agents/run -H 'Content-Type: application/json' -d '{}'
curl -s http://localhost:8787/api/evidence/summary
curl -s http://localhost:8787/api/evidence/traces
```

## A3 升级详情

详见 [docs/A3_COMPETITION_UPGRADE.md](D:/ZYY_Project/v4/docs/A3_COMPETITION_UPGRADE.md)

## 下一步建议

- 补齐 empty / error / retry 状态
- 接入真实 LLM API Key，提升 Agent 输出质量
- 前端资源页、路径页增加调用 `/api/resources/generate` 和 `/api/agents/path-replan` 的按钮
- 证据链页面增加按 Agent 筛选、时间范围筛选
- 增加前端"一键闭环"演示按钮，调用 `/api/agents/run`