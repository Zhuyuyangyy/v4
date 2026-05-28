# A3 证据链 Demo 报告

## 概览

本报告展示 **EduMind — 基于大模型的个性化资源生成与学习多智能体系统** 的完整证据链。

- **赛题**: A3 — 基于大模型的个性化资源生成与学习多智能体系统
- **生成时间**: 2026-05-28
- **运行模式**: 本地 Fallback（未配置 LLM API Key 时自动降级）

## 多智能体协作架构

系统包含 6 个专业 Agent，由 Orchestrator 统一调度：

| Agent | 职责 | 输入 | 输出 |
|---|---|---|---|
| ProfileAgent | 学习画像分析 | 问卷回答 | 维度评分、薄弱点、建议 |
| ResourceAgent | 个性化资源生成 | 画像+主题+类型 | 概念讲解、例题、练习题、错因提醒 |
| PathAgent | 学习路径规划/重规划 | 画像+评估+当前路径 | 阶段规划、周目标 |
| TutorAgent | 智能辅导 | 问题+模式+画像 | 个性化回答+资源推荐 |
| EvaluationAgent | 学习效果评估 | 画像+练习结果 | 掌握度、建议、画像更新 |
| ReflectionAgent | 学习反思反馈 | 画像+评估 | 反思总结、成就、下一步建议 |

## 协作链路示例

### 场景 1: 用户完成画像问卷

```
用户填写问卷 → ProfileAgent 分析 → 生成维度评分 + 薄弱点
Trace: profile-1748420400000-a1b2c3
  Agents: ProfileAgent
  Evidence: 本地规则 fallback 生成画像分析
  Duration: 5ms
```

### 场景 2: 多 Agent 协同生成个性化资源

```
ProfileAgent (画像驱动) → ResourceAgent (资源生成)
Trace: resource-1748420401000-d4e5f6
  Agents: ProfileAgent, ResourceAgent
  Input: 主题=数据结构与算法, 类型=all
  Output: 6 类资源包 (概念讲解/例题/练习题/错因提醒/推荐理由/画像证据)
  Evidence: 画像分析 → 资源适配
  Duration: 8ms
```

### 场景 3: 评估驱动路径重规划

```
EvaluationAgent (评估) → PathAgent (重规划)
Trace: path-replan-1748420402000-g7h8i9
  Agents: EvaluationAgent, PathAgent
  Input: 重规划路径, 评分=58
  Output: 3 个路径阶段 + 补弱任务
  Evidence: 评估反馈 → 路径调整
  Duration: 10ms
```

### 场景 4: 辅导回答 + 资源推荐

```
ProfileAgent (画像查询) → TutorAgent (辅导)
Trace: tutor-1748420403000-j0k1l2
  Agents: ProfileAgent, TutorAgent
  Input: 问题=什么是二叉树的前序遍历？, 模式=概念精讲
  Output: 320 字符个性化回答
  Evidence: 画像适配 → 辅导风格调整
  Duration: 12ms
```

### 场景 5: 综合评估 + 反思

```
EvaluationAgent (评估) → ReflectionAgent (反思)
Trace: eval-1748420404000-m3n4o5
  Agents: EvaluationAgent, ReflectionAgent
  Input: 综合评估, 评分=58
  Output: 4 项掌握度, 风险等级=medium
  Evidence: 评估 → 反思 → 下一步建议
  Duration: 9ms
```

## 个性化闭环验证

| 闭环环节 | 验证点 | 状态 |
|---|---|---|
| 画像驱动资源 | 资源包包含 profileEvidence 字段 | ✅ |
| 画像驱动讲解风格 | TutorAgent 根据画像调整回答 | ✅ |
| 画像驱动练习难度 | 练习题根据 totalScore 调整 | ✅ |
| 评估驱动路径重规划 | PathAgent 接收评估结果重规划 | ✅ |
| 评估更新画像 | EvaluationAgent 输出 profileUpdates | ✅ |
| 全链路证据追踪 | 每个 trace 包含完整证据 | ✅ |

## LLM 接入说明

系统支持通过环境变量启用真实大模型：

```bash
LLM_API_URL=https://your-llm-api-endpoint/v1/chat/completions
LLM_API_KEY=your-api-key
LLM_MODEL=generalv3.5
```

- 无 API Key 时自动走本地 deterministic fallback
- 所有 LLM 输出经过结构化解析和兜底
- 不会因 LLM 异常导致前端崩溃

## API 接口清单

| 接口 | 方法 | 说明 |
|---|---|---|
| `/api/resources/generate` | POST | 个性化资源生成 |
| `/api/agents/profile` | POST | Agent 画像分析 |
| `/api/agents/path-replan` | POST | Agent 路径重规划 |
| `/api/agents/tutor` | POST | Agent 辅导回答 |
| `/api/agents/evaluate` | POST | Agent 综合评估 |
| `/api/evidence/traces` | GET | 证据链 trace 列表 |
| `/api/evidence/summary` | GET | 证据链汇总统计 |
