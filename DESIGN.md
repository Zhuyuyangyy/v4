---
name: EduMind
description: AI-powered personalized learning platform
colors:
  abyss-deep: "#07070d"
  abyss-surface: "#0c0c1a"
  abyss-elevated: "#111128"
  abyss-card: "rgba(18, 22, 48, 0.75)"
  abyss-glass: "rgba(12, 12, 30, 0.6)"
  abyss-raised: "rgba(24, 28, 56, 0.85)"
  aurora-primary: "#00d4ff"
  aurora-blue: "#3b82f6"
  aurora-purple: "#7c3aed"
  aurora-emerald: "#06d6a0"
  aurora-amber: "#f59e0b"
  aurora-rose: "#f43f5e"
  text-primary: "#e8edf5"
  text-secondary: "#8892b0"
  text-tertiary: "#4a5568"
  text-inverse: "#07070d"
  border-subtle: "rgba(0, 212, 255, 0.12)"
  border-hover: "rgba(0, 212, 255, 0.3)"
typography:
  display:
    fontFamily: "'Instrument Serif', 'Georgia', serif"
    fontSize: "clamp(32px, 5vw, 42px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Instrument Serif', 'Georgia', serif"
    fontSize: "clamp(24px, 3vw, 32px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Outfit', 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Outfit', 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Outfit', 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.3px"
  mono:
    fontFamily: "'JetBrains Mono', 'Cascadia Code', monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  section: "40px"
components:
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  navigation-link-hover:
    backgroundColor: "rgba(0, 212, 255, 0.06)"
    textColor: "{colors.text-primary}"
  navigation-link-active:
    backgroundColor: "rgba(0, 212, 255, 0.1)"
    textColor: "{colors.aurora-primary}"
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.aurora-primary}, {colors.aurora-blue})"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 18px"
  card-default:
    backgroundColor: "{colors.abyss-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "28px"
  input-field:
    backgroundColor: "{colors.abyss-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  chip-tag:
    backgroundColor: "rgba(0, 212, 255, 0.06)"
    textColor: "{colors.aurora-primary}"
    rounded: "100px"
    padding: "3px 10px"
---

# Design System: EduMind

## 1. Overview

**Creative North Star: "星空观测站 (Starry Observatory)"**

深邃的暗夜背景如同无垠宇宙，极光般的青色光点在黑暗中指引方向。每一次打开 EduMind，就像走进一座建在山巅的观测站——外面是浩瀚的知识宇宙，内部是温暖、专注、有序的学习空间。界面内容是夜空中最亮的星，所有设计元素只为让星光更清晰。

这个系统明确拒绝企业后台的灰白表格感、拒绝 SaaS 模板的大数字+小标签套路、拒绝为装饰而装饰的玻璃拟态和发光。每个视觉决策都服务于一个目标：**让学习者沉浸于知识本身，而非界面**。

**Key Characteristics:**
- 深邃而不压抑的暗色基底，留白充足
- 极光青作为唯一的导航性色彩，出现克制而有目的
- 氛围光晕替代传统阴影，营造深度感
- 衬线标题 + 无衬线正文，学术感与亲和力平衡
- 信息层层递进，从不一次性抛完所有内容

## 2. Colors

深色基底（深渊）与青色点缀（极光）的二重奏。深渊提供了无干扰的阅读环境，极光在需要引导视线的地方出现。

### Primary
- **极光青 (Aurora Cyan)** (#00d4ff / oklch(0.78 0.15 210)): 系统中唯一的主动色。用于导航激活态、主要按钮、链接、焦点指示器。使用量不超过界面面积的 10%——它的稀缺性就是力量。

### Secondary
- **极光紫 (Aurora Purple)** (#7c3aed / oklch(0.52 0.23 295)): 辅助强调色。用于用户头像、次要按钮、特定的数据可视化元素。与极光青配合营造渐变效果。
- **极光翠 (Aurora Emerald)** (#06d6a0 / oklch(0.72 0.18 165)): 正向反馈色。已完成状态、增长指标、成功徽章。
- **极光金 (Aurora Amber)** (#f59e0b / oklch(0.74 0.16 75)): 警示与中等优先级。进行中状态、部分完成标记。
- **极光玫 (Aurora Rose)** (#f43f5e / oklch(0.56 0.22 15)): 报错与高风险。错误状态、低掌握度标记。

### Neutral
- **深渊底 (Abyss Deep)** (#07070d): 主背景色。页面级背景。
- **深渊表 (Abyss Surface)** (#0c0c1a): 次级背景。侧边栏、面板区域。
- **深渊上 (Abyss Elevated)** (#111128): 卡片和容器的基底。
- **深渊面 (Abyss Card)** (rgba(18, 22, 48, 0.75)): 默认卡片背景，半透明增加层次。
- **深渊玻 (Abyss Glass)** (rgba(12, 12, 30, 0.6)): 毛玻璃效果基底。
- **深渊凸 (Abyss Raised)** (rgba(24, 28, 56, 0.85)): 弹窗、浮动元素背景。
- **文白 (Text Primary)** (#e8edf5): 主要文本色。
- **文灰 (Text Secondary)** (#8892b0): 次要文本、描述文字。
- **文暗 (Text Tertiary)** (#4a5568): 最低优先级文本、占位符。
- **线隐 (Border Subtle)** (rgba(0, 212, 255, 0.12)): 默认分割线和边框。
- **线显 (Border Hover)** (rgba(0, 212, 255, 0.3)): 悬浮和高亮状态边框。

## 3. Typography

**Display Font:** Instrument Serif (Georgia, serif)
**Body Font:** Outfit (Segoe UI, sans-serif)
**Mono Font:** JetBrains Mono (Cascadia Code, monospace)

**Character:** Instrument Serif 的连笔和出锋赋予标题手工感和学术气质，与 Outfit 的几何简洁形成优雅对比。这对组合既有知识产品的权威感，又保持了现代数字界面的亲和力。

### Hierarchy
- **Display** (400, clamp(32px, 5vw, 42px), 1.05): 页面级大标题。仅用于 page-header 区域，h1 使用。
- **Headline** (400, clamp(24px, 3vw, 32px), 1.2): 区块标题。卡片标题、section 标题。
- **Title** (600, 18px, 1.3): 组件内强调标题。资源卡片标题、模式选择标题。
- **Body** (400, 14px, 1.7): 正文内容。消息内容、描述文本。最大行宽 70ch。
- **Label** (500, 12px, 1.4): 标签、按钮文字、辅助信息。全大写时 letter-spacing 增加。
- **Mono** (400, 13px, 1.6): 代码块、统计数据、时间戳、键盘快捷键。

**The Serif-as-Signpost Rule.** Instrument Serif 仅用于标题级别（h1-h3），不作为正文或标签字体。它的装饰性意味着稀缺才有力量。

## 4. Elevation

深度通过氛围光晕（glow）而非传统阴影来传达。页面层次由浅入深：背景（最暗）→ 卡片（半透明中层）→ 弹窗（最亮最实）。glow 效果仅出现在交互状态（hover、active、focus），静态时保持平坦。

### Glow Vocabulary
- **极光微光** (0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)): 品牌发光。用于导航激活指示器、品牌图标。
- **极光辉光** (0 4px 20px rgba(0, 212, 255, 0.15)): 卡片重点强调。主要按钮 hover、选中卡片的额外层次。
- **氛围柔光** (0 8px 32px rgba(0, 0, 0, 0.3)): 弹窗容器阴影。提供深度分离。
- **星点光晕** (box-shadow: 0 0 12px var(--color)): 数据点、徽章、状态指示器的小范围光晕。

**The Static-Flat Rule.** 表面在静止状态是平坦的。光晕和阴影只在交互响应中出现（hover、focus、active、选中状态）。静态的发光会被视为过度装饰。

## 5. Components

### Navigation (Top Bar)
- **Shape:** 通栏，无圆角。内部导航项使用 sm 圆角 (6px)。
- **Background:** 深渊底半透明 (rgba(7, 7, 13, 0.85)) + 24px backdrop-blur。
- **Border:** 底部 1px 分割线 (rgba(255,255,255,0.1))。
- **Items:** 内联 flex 排列，hover 时轻微背景变色 (rgba(0,212,255,0.06))。激活项使用极光青文字 + 浅色背景 + 底部指示线发光。
- **Brand:** 极光青->极光紫渐变图标 + Instrument Serif 品牌名。

### Buttons
- **Shape:** md 圆角 (10px)，无边框或 1px 实体边框。
- **Primary (CTA):** 极光青->极光蓝渐变背景，白色文字，font-weight 600。hover 时轻微上浮 (translateY(-2px)) + 辉光增强。
- **Ghost:** 透明背景，1px 边框 (线隐)，次要文字色。hover 时边框转为极光青，文字转为极光青。
- **Danger:** 极光玫边框 + 文字，hover 时背景淡红。
- **Action (内联):** 无边框，icon 或文字。hover 时颜色增强 + 4px 圆角浅背景。

### Cards
- **Corner Style:** lg 圆角 (16px) 为主，md (10px) 用于子卡片。
- **Background:** 深渊面 (rgba(18, 22, 48, 0.75))，半透明。
- **Border:** 1px 线隐。
- **Hover:** 边框转为极光青半透明，轻微上浮 (translateY(-2px))，出现顶端极光线 glow。
- **Internal Padding:** 24-28px 标准，视内容密度可调至 20px。

### Inputs / Fields
- **Style:** 深渊凸背景 (rgba(24, 28, 56, 0.85))，1px 线隐边框，md 圆角 (10px)。
- **Focus:** 边框转为极光青，出现极光微光盒子阴影。
- **Placeholder:** 文暗色 (#4a5568)。
- **Chat Input:** 特殊变体：圆角更大 (lg=16px)，内嵌 attach 按钮和 send 按钮，圆角药丸风格。

### Chips / Tags
- **Style:** 全圆角 (100px / 9999px)，极光青 6% 背景，1px 极光青 10% 边框，12px 字号。
- **Suggestion Chips:** 药丸形。hover 时边框转为极光青，出现右箭头动画。
- **Resource Type Chips:** 小圆角 (4px)，类型色文字 + 边框。

### Toggle / Switch
- **Track:** 44x24px，圆角 12px，关闭时淡白 10% 背景，开启时极光青背景。
- **Knob:** 20x20px 圆形，白色 (#fff)，开启时 translateX(20px)。100ms ease-out 过渡。

### Progress Bars
- **Track:** 4-6px 高度，圆角 2-3px，淡白 5% 背景。
- **Fill:** 渐变色或纯色（取决于上下文），宽度过渡 1s ease-out。

### Modal / Overlay
- **Overlay:** fixed 全屏，黑色 70% + 8px backdrop-blur。
- **Container:** 深渊凸背景，1px 线隐边框，xl 圆角 (24px)，最大宽度 640px。
- **Backdrop Clicks:** 点击遮罩关闭弹窗。

## 6. Do's and Don'ts

### Do:
- **Do** 让极光青的使用量不超过界面面积的 10%。它的稀缺性是力量。
- **Do** 使用氛围光晕（glow）来表达深度和交互反馈。
- **Do** 保持静态表面平坦——光晕只在交互状态出现。
- **Do** 使用 Instrument Serif 仅限于 h1-h3 标题级别。
- **Do** 尽量使用两栏或三栏网格布局来组织信息。
- **Do** 标题使用 Instrument Serif，正文使用 Outfit。
- **Do** 在 hover 和 focus 状态提供清晰但克制的视觉反馈。
- **Do** 遵守"信息渐进呈现"原则：先展示概要，再提供详情入口。

### Don't:
- **Don't** 使用 border-left 大于 1px 作为彩色侧边条纹装饰卡片。（已在 Evaluation stats、Profile overview、LearningPath phases 中出现，需移除。）
- **Don't** 使用 `background-clip: text` 实现渐变文字。（已在多处出现，需替换为纯色强调。）
- **Don't** 使用企业后台风格的数据表格布局。（避免密集表格、纯功能驱动排列。）
- **Don't** 使用"大数字 + 小标签 + 渐变文字"的 hero-metric 模板。（已在 Evaluation stats 中出现。）
- **Don't** 为装饰目的使用玻璃拟态（glassmorphism）。
- **Don't** 使用嵌套卡片（cards inside cards inside cards）。
- **Don't** 使用全大写标签正文（ALL CAPS）超过 3 个词。
- **Don't** 在同一个页面混用不同的卡片圆角风格。保持一致性。
- **Don't** 使用 em dash（—）代替逗号、冒号或分号。
