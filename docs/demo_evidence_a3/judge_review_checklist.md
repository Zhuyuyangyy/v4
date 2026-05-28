# 评委验证清单

## 多智能体协作验证

- [ ] **智能体数量验证**：确认系统包含 6 个智能体（画像、资源、路径、辅导、评估、反馈），查看 demo_trace_sample.json 中 agents 数组长度为 6
- [ ] **执行顺序验证**：确认智能体按 PROFILE → RESOURCE → PATH → TUTOR → EVAL → FEEDBACK 顺序执行，查看各智能体 timestamp 递增
- [ ] **输入输出衔接验证**：确认前序智能体输出作为后序智能体输入，例如 resource 的 input 包含 profile 的 output
- [ ] **协作完整性验证**：确认 6 个智能体状态均为 completed，无中断或跳过
- [ ] **置信度验证**：确认各智能体 confidence 值在合理范围内（0.8~1.0），查看 demo_trace_sample.json 中各 agent 的 confidence 字段
- [ ] **证据标签验证**：确认每个智能体携带 evidenceTags，标签内容与该智能体职责匹配

## 个性化资源生成验证

- [ ] **薄弱点覆盖验证**：确认生成的资源覆盖画像识别出的全部薄弱点（二级指针传参、BFS visited 标记、悬空指针），查看 resource 智能体 output
- [ ] **学习偏好适配验证**：确认资源类型与学生偏好（思维导图、例题拆解）匹配，查看 resource 智能体 process 描述
- [ ] **资源多样性验证**：确认生成资源包含多种形式（思维导图、例题拆解、代码练习），而非单一类型
- [ ] **资源质量验证**：确认生成内容准确无误，无知识性错误，可现场抽查资源内容
- [ ] **个性化差异验证**：对比不同画像学生的资源生成结果，确认资源内容因画像不同而有所差异

## 学习画像验证

- [ ] **画像维度验证**：确认画像包含多维度数据（pointerMastery、graphMastery、overallProgress 等），查看 demo_trace_sample.json 中 profileSnapshot
- [ ] **薄弱点识别验证**：确认画像正确识别学生薄弱点，与预设答题记录一致，查看 profileSnapshot 中 weaknesses 字段
- [ ] **画像更新验证**：确认辅导后画像数据更新，掌握度提升，薄弱点减少，对比 profileSnapshot 与 profileAfterSnapshot
- [ ] **偏好记录验证**：确认画像记录学生学习偏好（思维导图、例题拆解），查看 profileSnapshot 中 preferences 字段
- [ ] **画像变化量化验证**：确认画像变化可量化（指针 +29%、图结构 +27%），查看 demo_trace_report.md 中画像变化记录表

## 证据链追溯验证

- [ ] **全链路可追溯验证**：确认从画像分析到反馈建议每一步均有记录，查看 demo_trace_sample.json 完整内容
- [ ] **时间戳连续性验证**：确认各智能体 timestamp 连续递增，无时间跳跃或缺失，查看各 agent 的 timestamp 字段
- [ ] **输入来源可追溯验证**：确认每个智能体的 input 可追溯到前序智能体的 output，逐个检查 agents 数组中的 input/output 对应关系
- [ ] **证据标签体系验证**：确认 evidenceTags 覆盖关键环节（画像分析、资源生成、路径规划、交互辅导、效果评估、闭环反馈），查看各 agent 的 evidenceTags
- [ ] **路径调整可追溯验证**：确认路径调整有明确记录（原始路径、调整后路径、调整原因），查看 demo_trace_sample.json 中 pathAdjustment 字段
- [ ] **工作流 ID 关联验证**：确认所有记录关联同一 workflowId（wf-demo-001），可通过 workflowId 检索完整证据链

## 闭环验证

- [ ] **闭环完整性验证**：确认 6 个环节形成完整闭环：分析→生成→规划→辅导→评估→反馈，查看 demo_trace_sample.json 中 summary 字段
- [ ] **学习效果验证**：确认辅导后学生掌握度有实质提升（整体 +23%），查看 eval 智能体 output 和 profileAfterSnapshot
- [ ] **反馈闭环验证**：确认反馈智能体输出包含巩固建议和后续方向，形成下一轮闭环入口，查看 feedback 智能体 output
- [ ] **薄弱点消除验证**：确认薄弱点从 3 项减少至 1 项，验证闭环有效性，对比 profileSnapshot 与 profileAfterSnapshot 中 weaknesses
- [ ] **端到端耗时验证**：确认完整闭环在合理时间内完成（25 秒），查看 startTime 与 endTime 差值
- [ ] **闭环可重复验证**：确认系统可对同一学生再次执行闭环，前次反馈作为后次输入，验证闭环可持续迭代
