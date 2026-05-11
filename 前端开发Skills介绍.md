# Claude Code 前端开发 Skills 介绍

> 最后更新: 2026-05-11
> 本文档介绍在当前项目中安装的所有前端开发相关 Skills，帮助你了解每个 Skill 的用途、用法和核心规则。
>
> **调用方式**：在对话中直接描述需求，对应的 Skill 会自动激活。

---

## 一、全部 Skills 总览

| #   | Skill 名称                        | 来源                            | 核心价值                      | 类别         |
| --- | ------------------------------- | ----------------------------- | ------------------------- | ---------- |
| 1   | **frontend-design**             | anthropics/skills             | 独特生产级前端界面                 | 核心设计       |
| 2   | **design-taste-frontend**       | leonxlnx/taste-skill          | 设计品味调节（三个旋钮）              | 核心设计       |
| 3   | **impeccable**                  | pbakaus/impeccable            | 全chu能界面设计与改进              | 核心设计       |
| 4   | **high-end-visual-design**      | leonxlnx/taste-skill          | 高端设计机构级品质                 | 核心设计       |
| 5   | **minimalist-ui**               | leonxlnx/taste-skill          | 干净编辑风格界面                  | 核心设计       |
| 6   | **industrial-brutalist-ui**     | leonxlnx/taste-skill          | 瑞士排版×军用终端美学               | 核心设计       |
| 7   | **brandkit**                    | leonxlnx/taste-skill          | 品牌套件与 Logo 系统生成           | 核心设计       |
| 8   | **gpt-taste**                   | leonxlnx/taste-skill          | GSAP 动效 + 严格设计系统          | 核心设计       |
| 9   | **redesign-existing-projects**  | leonxlnx/taste-skill          | 现有项目高端升级                  | 核心设计       |
| 10  | **stitch-design-taste**         | leonxlnx/taste-skill          | Google Stitch 语义设计系统      | 核心设计       |
| 11  | **ui-ux-pro-max**               | nextlevelbuilder              | 50+风格·161配色·57字体          | UI/UX 设计系统 |
| 12  | **motion**                      | pedronauck/skills             | React 动画（原 framer-motion） | 动画动效       |
| 13  | **fixing-motion-performance**   | ibelick/ui-skills             | 动画性能审计与修复                 | 动画动效       |
| 14  | **better-icons**                | better-auth/better-icons      | 200+ 图标库搜索与获取             | 图标素材       |
| 15  | **image-to-code**               | leonxlnx/taste-skill          | 图片→代码精确还原                 | 图标素材       |
| 16  | **imagegen-frontend-web**       | leonxlnx/taste-skill          | Web 设计参考图生成               | 图标素材       |
| 17  | **imagegen-frontend-mobile**    | leonxlnx/taste-skill          | 移动端 App 概念图生成             | 图标素材       |
| 18  | **baseline-ui**                 | ibelick/ui-skills             | UI 基线·排版·无障碍验证            | 代码质量       |
| 19  | **full-output-enforcement**     | leonxlnx/taste-skill          | 强制完整代码生成                  | 代码质量       |
| 20  | **accessibility**               | addyosmani/web-quality-skills | WCAG 2.2 无障碍指南            | 无障碍        |
| 21  | **fixing-accessibility**        | ibelick/ui-skills             | HTML 无障碍修复                | 无障碍        |
| 22  | **fixing-metadata**             | ibelick/ui-skills             | SEO 元数据审计修复               | SEO        |
| 23  | **web-design-guidelines**       | vercel-labs/agent-skills      | Vercel 设计规范审查             | 设计审查       |
| 24  | **vercel-react-best-practices** | vercel-labs/agent-skills      | 70 条 React/Next.js 性能规则   | 框架工程       |
| 25  | **nextjs-app-router-patterns**  | wshobson/agents               | Next.js 14+ App Router 模式 | 框架工程       |
| 26  | **canvas-design**               | anthropics/skills             | 视觉艺术·海报·PDF 输出            | 辅助工具       |
| 27  | **claude-api**                  | anthropic-internal            | Claude API / SDK 构建优化     | 辅助工具       |

---

## 二、核心设计 Skills（11 个）

### 1. frontend-design（官方核心推荐）
- **来源**: anthropics/skills
- **功能**: 生成**独特、生产级**的前端界面，避免常见的"AI 味"设计（紫色渐变 + 白色背景 + Inter 字体）。
- **核心规则**:
  - 先定设计方向，再写代码
  - 禁止 Inter、Roboto、Arial 等烂大街字体
  - 拒绝千篇一律的紫色渐变配色
  - 不对称布局、重叠元素、打破网格
- **适用场景**: 构建 Web 组件、页面、落地页、仪表盘

### 2. design-taste-frontend（设计品味调节器）
- **来源**: leonxlnx/taste-skill
- **功能**: 三位可调节的"设计旋钮"精确控制输出风格：

  | 参数 | 默认值 | 范围 | 说明 |
  |------|--------|------|------|
  | `DESIGN_VARIANCE` | 8 | 1（对称）→ 10（艺术混乱） | 布局激进程度 |
  | `MOTION_INTENSITY` | 6 | 1（静态）→ 10（电影动效） | 动画强度 |
  | `VISUAL_DENSITY` | 4 | 1（留白）→ 10（密集） | 信息密度 |

- **核心规则**:
  - 强制独特字体（Geist、Outfit、Cabinet Grotesk、Satoshi）
  - 最多 1 个强调色，饱和度 < 80%
  - 禁止居中对齐 Hero（VARIANCE > 4 时）
  - 必须实现 Loading / Empty / Error 状态

### 3. impeccable（全能界面设计改进）
- **来源**: pbakaus/impeccable
- **功能**: 全能前端界面设计/改进 skill。涵盖 UX 审查、视觉层次、信息架构、认知负载、无障碍、性能、响应式、主题、排版、色彩、动效、微交互、UX 文案、错误状态、国际化、设计系统/令牌等。
- **适用场景**: 设计新界面、重构现有 UI、审查设计质量、统一设计语言

### 4. high-end-visual-design（高端视觉设计）
- **来源**: leonxlnx/taste-skill
- **功能**: 教会 AI 像高端设计机构一样设计。定义精确的字体、间距、阴影、卡片结构和动画风格，让网站看起来"贵"。屏蔽常见的 AI 廉价设计默认值。
- **适用场景**: 需要高级感、高端品牌气质的项目

### 5. minimalist-ui（极简编辑风格）
- **来源**: leonxlnx/taste-skill
- **功能**: 干净编辑风格的界面。暖色单色系调色板、排版对比、扁平 bento 网格、柔和粉彩。无渐变、无重阴影。
- **适用场景**: 内容型网站、博客、编辑类应用

### 6. industrial-brutalist-ui（工业野兽派）
- **来源**: leonxlnx/taste-skill
- **功能**: 融合瑞士排版印刷与军用终端美学的原始机械界面。刚性网格、极端字体尺度对比、实用主义色彩、模拟退化效果。
- **适用场景**: 数据密集型仪表盘、作品集、解构蓝图感的编辑网站

### 7. brandkit（品牌套件生成）
- **来源**: leonxlnx/taste-skill
- **功能**: 高级品牌套件图像生成 skill。创建高端品牌指南展板、Logo 系统、识别手册和视觉世界展示。
- **适用场景**: 品牌设计、Logo 概念设计、品牌视觉系统搭建

### 8. gpt-taste（精英 GSAP 动效）
- **来源**: leonxlnx/taste-skill
- **功能**: 精英 UX/UI & 高级 GSAP 动效工程师。强制执行 Python 驱动的真随机布局变化、严格的 AIDA 页面结构、宽幅编辑排版、无间隙 bento 网格、严格的 GSAP ScrollTrigger。
- **适用场景**: 需要高级动效和严格设计系统的页面

### 9. redesign-existing-projects（现有项目高端升级）
- **来源**: leonxlnx/taste-skill
- **功能**: 将现有网站和应用升级到高级质量。审计当前设计，识别通用 AI 模式，在不破坏功能的前提下应用高端设计标准。
- **适用场景**: 重构/改版现有项目

### 10. stitch-design-taste（语义设计系统）
- **来源**: leonxlnx/taste-skill
- **功能**: Google Stitch 语义设计系统 Skill。生成代理友好的 DESIGN.md 文件，强制执行高级、反通用的 UI 标准。
- **适用场景**: 需要详细设计文档的项目

### 11. ui-ux-pro-max（UI/UX 设计系统大全）
- **来源**: nextlevelbuilder
- **功能**: 最大的 UI/UX 设计知识库，内置 50+ 设计风格、161 种配色方案、57 种字体搭配、161 种产品类型推荐、99 条 UX 准则和 25 种图表类型。覆盖 10 种技术栈。
- **核心规则分类**:

  | 优先级 | 类别 | 核心要求 |
  |--------|------|---------|
  | P1 | 无障碍 | 对比度 4.5:1、Alt 文本、键盘导航 |
  | P2 | 触摸与交互 | 44×44px 触控区域、加载反馈 |
  | P3 | 性能 | WebP/AVIF 图片、CLS < 0.1 |
  | P4 | 风格选择 | 匹配产品类型、SVG 图标 |
  | P5 | 布局与响应式 | 移动优先、禁止水平滚动 |
  | P6 | 排版与色彩 | 基础 16px、行高 1.5 |
  | P7 | 动画 | 150-300ms、空间连续性 |
  | P8 | 表单与反馈 | 可见标签、就近错误显示 |
  | P9 | 导航模式 | 可预测返回、深层链接 |
  | P10 | 图表与数据 | 图例、工具提示 |

---

## 三、动画 & 动效 Skills（2 个）

### 1. motion（React 动画库）
- **来源**: pedronauck/skills
- **功能**: 使用 Motion 库（`motion`，原 `framer-motion`）构建 React 动画。支持手势（拖拽、悬停、点击）、滚动效果、弹簧物理、布局动画、SVG 动画。包体积 2.3KB~34KB。
- **适用场景**: 拖拽交互、滚动动画、模态框、轮播、视差效果

### 2. fixing-motion-performance（动画性能修复）
- **来源**: ibelick/ui-skills
- **功能**: 审计和修复动画性能问题，包括布局抖动、合成器属性、滚动关联动效和模糊效果。
- **适用场景**: 动画卡顿、过渡掉帧、CSS/JS 动画性能审查

---

## 四、图标 & 素材 Skills（4 个）

### 1. better-icons（图标搜索 CLI）
- **来源**: better-auth/better-icons
- **功能**: 图标搜索与检索 CLI。可搜索 200+ 图标库（Iconify）并获取 SVG。
- **命令**: `better-icons search <query>` 查找图标，`better-icons get <id>` 获取 SVG
- **适用场景**: 项目中需要查找和使用图标时

### 2. image-to-code（图片转代码）
- **来源**: leonxlnx/taste-skill
- **功能**: 精英网站"图转码" skill。先生成设计图片，深度分析，然后精确实现网站。
- **适用场景**: 需要从设计图生成代码的项目

### 3. imagegen-frontend-web（Web 设计参考图）
- **来源**: leonxlnx/taste-skill
- **功能**: 为每个页面 section 生成独立的水平设计参考图。强制执行构图变化、背景图片自由度和一致的配色方案。
- **适用场景**: 登录页、营销网站的设计参考生成

### 4. imagegen-frontend-mobile（移动端设计图）
- **来源**: leonxlnx/taste-skill
- **功能**: 为 iOS、Android 和跨平台移动产品创建高级、原生感的 App 屏幕概念和流程。
- **适用场景**: 移动端产品设计、App 界面概念生成

---

## 五、代码质量 Skills（2 个）

### 1. baseline-ui（UI 基线验证）
- **来源**: ibelick/ui-skills
- **功能**: 验证动画时长、强制执行排版缩放、检查组件可访问性、防止 Tailwind CSS 项目中的布局反模式。
- **适用场景**: 构建 UI 组件、审查 CSS 工具类、强制设计一致性

### 2. full-output-enforcement（强制完整输出）
- **来源**: leonxlnx/taste-skill
- **功能**: 覆盖默认的 LLM 截断行为。强制完整代码生成，禁止占位符模式，干净处理 token 限制分割。
- **适用场景**: 需要完整、无省略输出的代码生成任务

---

## 六、无障碍 Skills（2 个）

### 1. accessibility（WCAG 无障碍指南）
- **来源**: addyosmani/web-quality-skills（Google 工程师 Addy Osmani）
- **功能**: 基于 WCAG 2.2 标准的全面无障碍指南，涵盖 POUR 四项原则。包含代码示例、反模式和测试清单。
- **核心检查项**:
  - 图片 Alt 文本、色彩对比度 4.5:1（AA）/ 7:1（AAA）
  - 键盘可访问、`:focus-visible`、跳过链接
  - `prefers-reduced-motion: reduce`
  - 原生元素优先，合理使用 ARIA

### 2. fixing-accessibility（HTML 无障碍修复）
- **来源**: ibelick/ui-skills
- **功能**: 审计和修复 HTML 可访问性问题，包括 ARIA 标签、键盘导航、焦点管理、颜色对比度和表单错误。
- **适用场景**: 添加交互控件、表单、对话框或审查 WCAG 合规性

---

## 七、SEO Skills（1 个）

### 1. fixing-metadata（SEO 元数据审计）
- **来源**: ibelick/ui-skills
- **功能**: 审计和修复 HTML 元数据，包括页面标题、Meta 描述、Canonical URL、Open Graph 标签、Twitter 卡片、Favicon、JSON-LD 结构化数据和 Robots 指令。
- **适用场景**: 添加 SEO 元数据、修复社交分享预览、设置规范 URL

---

## 八、框架 & 工程化 Skills（3 个）

### 1. vercel-react-best-practices（Vercel React 性能优化）
- **来源**: vercel-labs/agent-skills
- **功能**: Vercel 团队维护的 **70 条 React/Next.js 性能优化规则**，按影响程度分 8 个优先级：

  | 优先级 | 类别 | 核心规则 |
  |--------|------|---------|
  | P1 | 消除瀑布请求 | `Promise.all()` 并行、Suspense 流式 |
  | P2 | 包体积优化 | 避免 barrel、动态导入 |
  | P3 | 服务端性能 | React.cache() 去重 |
  | P4 | 客户端数据 | SWR 自动去重 |
  | P5 | 重渲染优化 | React.memo、useMemo |
  | P6 | 渲染性能 | content-visibility |
  | P7 | JavaScript 性能 | Map/Set O(1) 查找 |
  | P8 | 高级模式 | useEffectEvent |

### 2. nextjs-app-router-patterns（Next.js App Router）
- **来源**: wshobson/agents
- **功能**: Next.js 14+ App Router 完整模式指南，涵盖 Server Components、流式渲染、并行路由、路由拦截、数据缓存、Server Actions。
- **文件约定**: `layout.tsx` / `page.tsx` / `loading.tsx` / `error.tsx` / `not-found.tsx` / `route.ts`
- **八大模式**:
  1. Server Components 数据获取
  2. Client Components 交互
  3. Server Actions 表单提交
  4. 并行路由 @slot
  5. 路由拦截 Modal
  6. Suspense 流式渲染
  7. 路由处理器 API
  8. generateMetadata SEO

### 3. web-design-guidelines（Vercel 设计规范审查）
- **来源**: vercel-labs/agent-skills
- **功能**: 审查前端代码，对照 Vercel 的 Web 界面设计规范进行检查，输出 `file:line` 格式的问题报告。
- **使用方法**: `/web-design-guidelines <文件路径>`

---

## 九、其他辅助 Skills

| Skill | 功能 |
|-------|------|
| **canvas-design** | 创建视觉艺术作品，输出为 .pdf / .png |
| **claude-api** | 构建和优化 Claude API / Anthropic SDK 应用 |
| **simplify** | 审查变更代码的质量和效率并修复问题 |
| **security-review** | 完成安全审查 |
| **review** | 审查 Pull Request |
| **init** | 初始化 CLAUDE.md 文件 |

---

## 十、新增 Skills 汇总（2026-05-11 安装）

本次批量新增 5 组 Skills：

| Skill 组 | 安装包 | 子 skills 数 | 核心价值 |
|----------|--------|:-----------:|---------|
| **impeccable** | `pbakaus/impeccable` | 1 | 全能界面设计与改进 |
| **taste-skill** | `leonxlnx/taste-skill` | 11 | 高端设计品味与规范（brandkit / gpt-taste / high-end-visual-design / minimalist-ui / industrial-brutalist-ui / image-to-code / imagegen-frontend-web / imagegen-frontend-mobile / redesign-existing-projects / full-output-enforcement / stitch-design-taste） |
| **motion** | `pedronauck/skills` | 1 | React 动画开发 |
| **better-icons** | `better-auth/better-icons` | 1 | 200+ 图标库搜索与获取 |
| **ui-skills** | `ibelick/ui-skills` | 4 | baseline-ui / fixing-accessibility / fixing-metadata / fixing-motion-performance |

合计新增 **18 个 Skills**，仓库总计已有 **40+ 前端相关 Skills**。

---

## 十一、快速参考

### 常用需求 → 对应 Skill

| 需求 | 推荐 Skill |
|------|-----------|
| **新建页面/组件** | frontend-design / impeccable |
| **让页面更有高级感** | high-end-visual-design / design-taste-frontend |
| **现有项目改版升级** | redesign-existing-projects |
| **品牌视觉系统搭建** | brandkit |
| **添加动画效果** | motion |
| **动画卡顿/性能问题** | fixing-motion-performance |
| **查找图标** | better-icons |
| **从设计图生成代码** | image-to-code |
| **配色/字体/风格选择** | ui-ux-pro-max |
| **审查 UI 质量** | web-design-guidelines |
| **检查无障碍问题** | accessibility / fixing-accessibility |
| **修复 SEO 元数据** | fixing-metadata |
| **React 性能优化** | vercel-react-best-practices |
| **Next.js App Router** | nextjs-app-router-patterns |
| **强制完整代码输出** | full-output-enforcement |
| **UI 基线一致性验证** | baseline-ui |

### 使用技巧

1. **新建页面流程** — 先用 ui-ux-pro-max 或 impeccable 确定设计方向，再编码实现
2. **React/Next.js 项目** — vercel-react-best-practices、nextjs-app-router-patterns 自动生效
3. **精细控制设计风格** — 在描述中加入 MOTION_INTENSITY / DESIGN_VARIANCE 等参数
4. **完成后审查** — 用 web-design-guidelines 审查代码，accessibility 检查无障碍
5. **图标即用** — 随时用 `better-icons search <关键词>` 查找并获取 SVG
