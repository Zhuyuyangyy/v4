# 前端开发 Skills 介绍文档

> 最后更新: 2026-05-11
> 本仓库已集成了丰富的 Claude Code Skills，覆盖前端界面设计、动画开发、图标管理、代码质量审查、性能优化等全链路。

---

## 一、核心设计 Skills

### 1. impeccable
- **来源**: `pbakaus/impeccable`
- **功能**: 全能前端界面设计/改进 skill。涵盖 UX 审查、视觉层次、信息架构、认知负载、无障碍、性能、响应式、主题、排版、色彩、动效、微交互、UX 文案、错误状态、国际化、设计系统/令牌等。
- **适用场景**: 设计新界面、重构现有 UI、审查设计质量、统一设计语言。
- **使用方式**: 直接向 Claude 描述需求，skill 会自动加载并指导设计过程。

### 2. high-end-visual-design
- **来源**: `leonxlnx/taste-skill`
- **功能**: 教会 AI 像高端设计机构一样设计。定义了精确的字体、间距、阴影、卡片结构和动画风格，让网站看起来"贵"。屏蔽了常见的 AI 廉价设计默认值。
- **适用场景**: 需要高级感、高端品牌气质的项目。

### 3. minimalist-ui
- **来源**: `leonxlnx/taste-skill`
- **功能**: 干净编辑风格的界面。暖色单色系调色板、排版对比、扁平 bento 网格、柔和粉彩。无渐变、无重阴影。
- **适用场景**: 内容型网站、博客、编辑类应用。

### 4. industrial-brutalist-ui
- **来源**: `leonxlnx/taste-skill`
- **功能**: 融合瑞士排版印刷与军用终端美学的原始机械界面。刚性网格、极端字体尺度对比、实用主义色彩、模拟退化效果。
- **适用场景**: 数据密集型仪表盘、作品集、需要"解构蓝图"感的编辑网站。

### 5. brandkit
- **来源**: `leonxlnx/taste-skill`
- **功能**: 高级品牌套件图像生成 skill。创建高端品牌指南展板、Logo 系统、识别手册和视觉世界展示。
- **适用场景**: 品牌设计、Logo 概念设计、品牌视觉系统搭建。

### 6. gpt-taste
- **来源**: `leonxlnx/taste-skill`
- **功能**: 精英 UX/UI & 高级 GSAP 动效工程师。强制执行 Python 驱动的真随机布局变化、严格的 AIDA 页面结构、宽幅编辑排版、无间隙 bento 网格、严格的 GSAP ScrollTrigger。
- **适用场景**: 需要高级动效和严格设计系统的页面。

### 7. stitch-design-taste
- **来源**: `leonxlnx/taste-skill`
- **功能**: Google Stitch 语义设计系统 Skill。生成代理友好的 DESIGN.md 文件，强制执行高级、反通用的 UI 标准。
- **适用场景**: 需要详细设计文档的项目。

### 8. redesign-existing-projects
- **来源**: `leonxlnx/taste-skill`
- **功能**: 将现有网站和应用升级到高级质量。审计当前设计，识别通用 AI 模式，在不破坏功能的前提下应用高端设计标准。
- **适用场景**: 重构/改版现有项目。

### 9. design-taste-frontend
- **来源**: `leonxlnx/taste-skill`
- **功能**: 高级 UI/UX 工程师。架构数字界面，覆盖默认的 LLM 偏见。强制执行基于指标的规则、严格的组件架构、CSS 硬件加速和均衡的设计工程。
- **适用场景**: 需要高质量工程化设计的前端项目。

### 10. frontend-design
- **功能**: 创建独特、生产级的前端界面。生成创意、精巧的代码，避免通用的 AI 美学。
- **适用场景**: 构建 Web 组件、页面、应用程序、登录页、仪表盘。

### 11. ui-ux-pro-max
- **功能**: UI/UX 设计智能体。包含 50+ 风格、161 种配色方案、57 种字体配对、161 种产品类型、99 条 UX 指南和 25 种图表类型。覆盖 10 种技术栈。
- **适用场景**: 全栈 UI/UX 设计，从按钮到完整应用。

---

## 二、动画 & 动效 Skills

### 1. motion
- **来源**: `pedronauck/skills`
- **功能**: 使用 Motion 库（即 framer-motion）构建 React 动画。支持手势（拖拽、悬停、点击）、滚动效果、弹簧物理、布局动画、SVG 动画。包体积 2.3KB~34KB。
- **适用场景**: 拖拽交互、滚动动画、模态框、轮播、视差效果。

### 2. fixing-motion-performance
- **来源**: `ibelick/ui-skills`
- **功能**: 审计和修复动画性能问题，包括布局抖动、合成器属性、滚动关联动效和模糊效果。
- **适用场景**: 动画卡顿、过渡掉帧、CSS/JS 动画性能审查。

---

## 三、图标 & 素材 Skills

### 1. better-icons
- **来源**: `better-auth/better-icons`
- **功能**: 图标搜索与检索 CLI。可搜索 200+ 图标库（Iconify）并获取 SVG。提供 `better-icons search <query>` 和 `better-icons get <id>` 命令。
- **适用场景**: 项目中需要查找和使用图标时。

### 2. image-to-code
- **来源**: `leonxlnx/taste-skill`
- **功能**: 精英网站"图转码" skill。先生成设计图片，深度分析，然后精确实现网站。
- **适用场景**: 需要从设计图生成代码的项目。

### 3. imagegen-frontend-web
- **来源**: `leonxlnx/taste-skill`
- **功能**: 高级前端图片方向 skill。为每个 section 生成独立的水平图片。强制执行构图变化、背景图片自由度和一致的配色方案。
- **适用场景**: 登录页、营销网站的设计参考生成。

### 4. imagegen-frontend-mobile
- **来源**: `leonxlnx/taste-skill`
- **功能**: 精英移动应用图片生成 skill。为 iOS、Android 和跨平台移动产品创建高级、原生感的屏幕概念和流程。
- **适用场景**: 移动端产品设计、App 界面概念生成。

---

## 四、代码质量 & 审查 Skills

### 1. baseline-ui
- **来源**: `ibelick/ui-skills`
- **功能**: 验证动画时长、强制执行排版缩放、检查组件可访问性、防止 Tailwind CSS 项目中的布局反模式。
- **适用场景**: 构建 UI 组件、审查 CSS 工具类、强制设计一致性。

### 2. full-output-enforcement
- **来源**: `leonxlnx/taste-skill`
- **功能**: 覆盖默认的 LLM 截断行为。强制完整代码生成，禁止占位符模式，干净处理 token 限制分割。
- **适用场景**: 需要完整、无省略输出的代码生成任务。

---

## 五、无障碍 & SEO Skills

### 1. fixing-accessibility
- **来源**: `ibelick/ui-skills`
- **功能**: 审计和修复 HTML 可访问性问题，包括 ARIA 标签、键盘导航、焦点管理、颜色对比度和表单错误。
- **适用场景**: 添加交互控件、表单、对话框或审查 WCAG 合规性。

### 2. fixing-metadata
- **来源**: `ibelick/ui-skills`
- **功能**: 审计和修复 HTML 元数据，包括页面标题、Meta 描述、Canonical URL、Open Graph 标签、Twitter 卡片、Favicon、JSON-LD 结构化数据和 Robots 指令。
- **适用场景**: 添加 SEO 元数据、修复社交分享预览、设置规范 URL。

### 3. accessibility
- **功能**: 遵循 WCAG 2.2 指南审计和改进 Web 无障碍性。
- **适用场景**: 屏幕阅读器支持、键盘导航、无障碍审查。

---

## 六、框架 & 工程化 Skills

### 1. nextjs-app-router-patterns
- **功能**: Next.js 14+ App Router 精通 skill。涵盖服务端组件、流式渲染、并行路由和高级数据获取。
- **适用场景**: 构建 Next.js 应用、实现 SSR/SSG、优化 RSC。

### 2. vercel-react-best-practices
- **功能**: Vercel 工程团队的 React 和 Next.js 性能优化指南。
- **适用场景**: 编写/重构 React 组件、数据获取、打包优化。

### 3. web-design-guidelines
- **功能**: 审查 UI 代码是否符合 Web 界面指南。
- **适用场景**: UI 审查、无障碍审计、设计评审。

---

## 七、其他辅助 Skills

### canvas-design
纯设计工具，在 `.png` 和 `.pdf` 文档中创建视觉艺术作品。
### update-config
配置 Claude Code 设置和钩子。
### keybindings-help
自定义键盘快捷键。
### simplify
审查变更代码的质量和效率并修复问题。
### fewer-permission-prompts
减少权限提示的频率。
### loop
设置定时循环任务。
### claude-api
构建和优化 Claude API / Anthropic SDK 应用。
### init
初始化 CLAUDE.md 文件。
### review
审查 Pull Request。
### security-review
完成安全审查。

---

## 总结

本次新增的 5 组 Skills 及其子 skills 极大增强了前端开发能力：

| Skill 组 | 安装包 | 子 skills 数量 | 核心价值 |
|----------|--------|---------------|---------|
| **impeccable** | `pbakaus/impeccable` | 1 | 全能界面设计与改进 |
| **taste-skill** | `leonxlnx/taste-skill` | 11 | 高端设计品味与规范 |
| **motion** | `pedronauck/skills` | 1 | React 动画开发 |
| **better-icons** | `better-auth/better-icons` | 1 | 200+ 图标库搜索 |
| **ui-skills** | `ibelick/ui-skills` | 4 | UI 基线、无障碍、SEO、动效性能 |

合计新增 **18 个 Skills**，仓库总计已有 **40+ 前端相关 Skills**，覆盖从设计到开发、从动画到无障碍、从图标到 SEO 的全链路前端工作流。
