# Claude Code 前端开发 Skills 介绍

> 本文档介绍在当前项目中安装的所有前端开发相关 Skills，帮助你了解每个 Skill 的用途、用法和核心规则。

---

## 已安装 Skills 列表

| # | Skill 名称 | 来源 | 安装量 | 类别 |
|---|-----------|------|--------|------|
| 1 | **frontend-design** | anthropics/skills | 391.4K+ | 设计质量 |
| 2 | **design-taste-frontend** | leonxlnx/taste-skill | 49.4K+ | 设计品味 |
| 3 | **ui-ux-pro-max** | nextlevelbuilder | 155.9K+ | UI/UX 设计系统 |
| 4 | **web-design-guidelines** | vercel-labs/agent-skills | 308.8K+ | 设计审查 |
| 5 | **vercel-react-best-practices** | vercel-labs/agent-skills | 386.5K+ | React 性能优化 |
| 6 | **nextjs-app-router-patterns** | wshobson/agents | 16.8K+ | Next.js 框架 |
| 7 | **accessibility** | addyosmani/web-quality-skills | 21.5K+ | 无障碍 |
| 8 | **canvas-design** | anthropics/skills | 51.1K+ | 视觉艺术 |

---

## 1. frontend-design（官方核心推荐）

### 基本信息
- **来源**: anthropics/skills
- **安装量**: 391.4K（所有 Skill 中最高）
- **适用场景**: 构建 Web 组件、页面、落地页、仪表盘、React 组件、HTML/CSS 布局

### 核心功能
生成**独特、生产级**的前端界面，避免常见的"AI 味"设计（如紫色渐变 + 白色背景 + Inter 字体）。

### 使用方法
直接在对话中描述需求，或者输入：
```
/frontend-design
用 Vue 3 + TailwindCSS 构建一个暗色主题的 AI 产品落地页
```

### 核心规则
1. **先定设计方向** — 在写代码前确定大胆的美学方向（极简、复古未来、有机自然、奢华精致等）
2. **字体要求** — 禁止使用 Inter、Roboto、Arial 等烂大街字体
3. **色彩要求** — 拒绝千篇一律的紫色渐变配色方案
4. **动效设计** — 使用 CSS-only 方案或 Framer Motion，强调高冲击力的交互动效
5. **布局创新** — 不对称布局、重叠元素、对角线流、打破网格

### 禁止事项
- ❌ Inter、Roboto、Arial、system-ui 等通用字体
- ❌ 紫色渐变 + 白底的"AI 标准配色"
- ❌ 可预测的布局和组件模式
- ❌ 每次生成都趋于相同的设计（如总是用 Space Grotesk）

---

## 2. design-taste-frontend（设计品味调节器）

### 基本信息
- **来源**: leonxlnx/taste-skill
- **安装量**: 49.4K+
- **适用场景**: 需要精细控制 UI 设计的"激进程度"、动效强度、视觉密度

### 核心功能
三位可调节的 **"设计旋钮"**，让你精确控制 AI 的输出风格：

| 参数 | 默认值 | 范围 | 说明 |
|------|--------|------|------|
| `DESIGN_VARIANCE` | **8** | 1（完全对称）→ 10（艺术混乱） | 控制布局的激进程度 |
| `MOTION_INTENSITY` | **6** | 1（静态）→ 10（电影级物理动效） | 控制动画强度 |
| `VISUAL_DENSITY` | **4** | 1（画廊留白）→ 10（驾驶舱密集） | 控制信息密度 |

### 使用方法
直接描述需求即可，如果希望调整风格，可以在描述中指定，例如：
```
设计一个仪表盘页面，DESIGN_VARIANCE=5，偏保守风格
```

### 核心规则

#### 设计工程规则
1. **字体** — 强制使用独特字体（Geist、Outfit、Cabinet Grotesk、Satoshi），仪表盘 UI 禁止衬线字体
2. **色彩** — 最多 1 个强调色，饱和度 < 80%，禁止 AI 紫色/蓝色
3. **布局** — 禁止居中 Hero（当 VARIANCE > 4 时），强制使用分屏/不对称布局
4. **卡片** — 禁止滥用卡片，用 `border-t`、`divide-y` 或留白替代
5. **状态覆盖** — 必须实现 Loading（骨架屏）、Empty（空状态）、Error（错误状态）

#### 禁止的设计模式（"AI Tells"）
- ❌ Neon/外发光效果
- ❌ 纯黑色 `#000000`
- ❌ 过饱和的强调色
- ❌ Inter 字体
- ❌ 过大的 H1 标题
- ❌ 3 列等宽卡片布局
- ❌ 通用名称（John Doe、Sarah Chan）
- ❌ 虚假数据（99.99%、50%）
- ❌ Unsplash 图片链接
- ❌ 默认状态的 shadcn/ui（必须自定义）

#### 性能护栏
- 粒子/噪点滤镜只用于 `fixed` 伪元素，不能用于滚动容器
- 永远只通过 `transform` 和 `opacity` 做动画（不用 top/left/width/height）
- 严格控制 z-index 层级

---

## 3. web-design-guidelines（Vercel 设计规范审查）

### 基本信息
- **来源**: vercel-labs/agent-skills
- **安装量**: 308.8K+
- **适用场景**: UI 设计审查、无障碍检查、设计审计、UX 评审

### 核心功能
**审查你的前端代码**，对照 Vercel 的 Web 界面设计规范进行检查，输出 `file:line` 格式的问题报告。

### 使用方法
```
/web-design-guidelines src/components/Button.tsx
/web-design-guidelines src/pages/*.tsx
```

或者直接说：
```
帮我审查一下我的 UI 设计
检查这个页面的无障碍问题
对我的网站进行最佳实践审计
```

### 工作流程
1. 从 Vercel 官方源拉取最新指南
2. 读取你指定的文件
3. 逐条检查所有规则
4. 输出 `file:line` 格式的问题列表

### 检查范围
从 Vercel 官方源拉取实时规则，涵盖：
- 布局规范
- 色彩系统
- 排版规则
- 无障碍（Accessibility）
- 响应式设计
- 交互模式

---

## 4. canvas-design（画布艺术设计）

### 基本信息
- **来源**: anthropics/skills
- **安装量**: 51.1K+
- **适用场景**: 海报、艺术作品、静态视觉设计、PDF/PNG 输出

### 核心功能
创建具有**设计哲学**的视觉艺术作品，输出为 `.pdf` 或 `.png` 文件。

### 使用方法
描述你想要的艺术作品，如：
```
创建一个以"数据流动"为主题的海报
设计一张极简主义风格的活动宣传图
```

### 工作流程
1. **创建设计哲学** — 生成一个 `.md` 文件，描述视觉哲学（命名、空间、色彩、构图等）
2. **在画布上表达** — 将哲学在画布上通过视觉表达（输出为 `.pdf` 或 `.png`）

### 核心原则
- **视觉表达优先** — 90% 视觉设计，10% 必要文字
- **专家工艺感** — 作品必须看起来经过无数小时的精心打磨
- **极简文字** — 文字作为视觉点缀，而非说明段落
- **原创性** — 严禁抄袭现有艺术家的作品
- **多页支持** — 可以生成多页 PDF 讲述视觉故事

### 设计哲学示例
| 流派名称 | 核心理念 |
|---------|---------|
| Concrete Poetry | 通过宏伟形式和粗犷几何进行交流 |
| Chromatic Language | 颜色作为主要信息系统 |
| Analog Meditation | 通过纹理和呼吸空间进行安静的视觉沉思 |
| Organic Systems | 自然聚类和模块化生长模式 |
| Geometric Silence | 纯粹的秩序和克制 |

---

## 5. ui-ux-pro-max（UI/UX 设计系统大全）

### 基本信息
- **来源**: nextlevelbuilder/ui-ux-pro-max-skill
- **安装量**: 155.9K+
- **适用场景**: 新建页面/组件时选择设计系统、审查现有 UI、改善 UX 质量

### 核心功能
最大的 UI/UX 设计知识库，内置 50+ 设计风格、161 种配色方案、57 种字体搭配、161 种产品类型推荐、99 条 UX 准则和 25 种图表类型。

### 使用方法
```bash
# 生成完整设计系统（推荐）
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "fintech dashboard dark" --design-system

# 搜索特定领域
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark" --domain style
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "sans serif modern" --domain typography
```

支持 10 个技术栈：React、Next.js、Vue、Svelte、SwiftUI、React Native、Flutter、Tailwind、shadcn/ui、HTML/CSS。

### 十大规则分类（按优先级）

| 优先级 | 类别 | 影响 |
|--------|------|------|
| P1 | **无障碍** | CRITICAL — 对比度 4.5:1、Alt 文本、键盘导航、Aria 标签 |
| P2 | **触摸与交互** | CRITICAL — 最小 44×44px 触控区域、8px+ 间距、加载反馈 |
| P3 | **性能** | HIGH — WebP/AVIF 图片、懒加载、CLS < 0.1 |
| P4 | **风格选择** | HIGH — 匹配产品类型、一致性、SVG 图标（禁止 emoji） |
| P5 | **布局与响应式** | HIGH — 移动优先、禁止水平滚动、viewport meta |
| P6 | **排版与色彩** | MEDIUM — 基础 16px、行高 1.5、语义化颜色 token |
| P7 | **动画** | MEDIUM — 150-300ms 时长、动效传达意义、空间连续性 |
| P8 | **表单与反馈** | MEDIUM — 可见标签、错误就近显示、渐进式披露 |
| P9 | **导航模式** | HIGH — 可预测返回、底部导航 ≤5 项、深层链接 |
| P10 | **图表与数据** | LOW — 图例、工具提示、无障碍配色 |

### 特色功能：设计系统持久化
```bash
# 生成设计系统并保存为 MASTER.md
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "saas analytics" --design-system --persist -p "MyProject"

# 为特定页面生成覆盖规则
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "dashboard" --design-system --persist -p "MyProject" --page "dashboard"
```
生成的文件结构：
```
design-system/
├── MASTER.md            # 全局设计系统
└── pages/
    └── dashboard.md     # 页面级覆盖规则
```

---

## 6. vercel-react-best-practices（Vercel React 性能优化）

### 基本信息
- **来源**: vercel-labs/agent-skills
- **安装量**: 386.5K+
- **适用场景**: 编写新的 React 组件、Next.js 页面、数据获取、代码审查、性能优化

### 核心功能
由 Vercel 团队维护的 **70 条 React/Next.js 性能优化规则**，按影响程度分 8 个优先级。写 React 代码时自动生效。

### 八大规则类别

| 优先级 | 类别 | 影响 | 核心规则 |
|--------|------|------|---------|
| P1 | **消除瀑布请求** | CRITICAL | `Promise.all()` 并行请求、`Suspense` 流式加载、提前 `await` |
| P2 | **包体积优化** | CRITICAL | 直接导入避免 barrel 文件、`next/dynamic` 动态导入、预加载 |
| P3 | **服务端性能** | HIGH | `React.cache()` 去重、LRU 缓存跨请求、最小化 RSC props |
| P4 | **客户端数据获取** | MEDIUM-HIGH | SWR 自动去重、被动事件监听器 |
| P5 | **重渲染优化** | MEDIUM | `React.memo`、`useMemo`/`useCallback`、`startTransition` |
| P6 | **渲染性能** | MEDIUM | `content-visibility`、静态 JSX 提升、三元表达式代替 `&&` |
| P7 | **JavaScript 性能** | LOW-MEDIUM | `Map`/`Set` O(1) 查找、批量 DOM 操作、`requestIdleCallback` |
| P8 | **高级模式** | LOW | `useEffectEvent`、ref 存储事件处理函数 |

### 典型优化示例
```typescript
// ❌ 串行请求（瀑布效应）
const user = await getUser();
const posts = await getPosts(user.id);

// ✅ 并行请求
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

---

## 7. accessibility（Web 无障碍标准指南）

### 基本信息
- **来源**: addyosmani/web-quality-skills（Google 工程师 Addy Osmani）
- **安装量**: 21.5K+
- **适用场景**: 无障碍审计、WCAG 合规检查、屏幕阅读器支持、键盘导航优化

### 核心功能
基于 **WCAG 2.2** 标准的全面无障碍指南，涵盖 POUR 四项原则（可感知、可操作、可理解、健壮性）。包含代码示例、反模式和测试清单。

### 使用方法
```
帮我检查这个页面的无障碍问题
给这个组件添加无障碍支持
/accessibility
```

### WCAG 合规等级
| 等级 | 要求 | 目标 |
|------|------|------|
| **A** | 最低无障碍 | 必须通过 |
| **AA** | 标准合规 | 应该通过（很多国家法律要求） |
| **AAA** | 增强无障碍 | 锦上添花 |

### 核心检查项

#### 可感知
- **图片 Alt 文本** — 有意义的图片用描述性 alt，装饰性图片用 `alt=""`
- **色彩对比度** — 正文 4.5:1（AA）/ 7:1（AAA），大文本 3:1（AA）/ 4.5:1（AAA）
- **不依赖颜色传达信息** — 错误状态要用图标 + 文字，不能只用红色
- **媒体替代** — 视频需要字幕、音频需要文字稿

#### 可操作
- **键盘可访问** — 所有功能必须可通过键盘操作，优先使用原生 `<button>` 等元素
- **焦点可见** — 使用 `:focus-visible`，不要 `outline: none`
- **跳过链接** — 提供"跳转到主内容"链接
- **目标尺寸** — 交互元素最小 24×24px（WCAG 2.2 新增）
- **尊重减少动效** — 检测 `prefers-reduced-motion: reduce`

#### 可理解
- **页面语言** — 使用 `<html lang="zh-CN">`
- **一致导航** — 导航在所有页面保持一致
- **表单标签** — 每个输入框都要有程序关联的 `<label>`
- **错误处理** — 使用 `aria-invalid`、`aria-describedby`、`role="alert"`

#### 健壮性
- **优先使用原生元素** — `<button>` 优于 `div[role="button"]`
- **合理使用 ARIA** — 正确使用角色和状态
- **Live Regions** — 动态内容使用 `aria-live` 区域

### 测试清单
- [ ] 键盘导航：Tab 遍历整个页面，Enter/Space 激活
- [ ] 屏幕阅读器：VoiceOver (Mac) / NVDA (Windows)
- [ ] 缩放：200% 缩放下内容可用
- [ ] 高对比度模式
- [ ] `prefers-reduced-motion: reduce`

---

## 8. nextjs-app-router-patterns（Next.js App Router 模式）

### 基本信息
- **来源**: wshobson/agents
- **安装量**: 16.8K+
- **适用场景**: 构建 Next.js 14+ 项目、从 Pages Router 迁移、实现 SSR/SSG/RSC

### 核心功能
Next.js 14+ App Router 的完整模式指南，涵盖 **Server Components、流式渲染、并行路由、路由拦截、数据缓存、Server Actions** 等核心概念。

### 使用方法
当使用 Next.js App Router 构建页面时自动触发。

### 核心概念

| 模式 | 位置 | 使用场景 |
|------|------|---------|
| **Server Components** | 服务器端 | 数据获取、重计算、密钥处理 |
| **Client Components** | 浏览器端 | 交互、Hook、浏览器 API |
| **静态渲染** | 构建时 | 内容很少变化的页面 |
| **动态渲染** | 请求时 | 个性化或实时数据 |
| **流式渲染** | 渐进式 | 大型页面、慢数据源 |

### 文件约定
```
app/
├── layout.tsx         # 共享 UI 包装器
├── page.tsx           # 路由 UI
├── loading.tsx        # 加载 UI（Suspense）
├── error.tsx          # 错误边界
├── not-found.tsx      # 404 UI
├── route.ts           # API 端点
├── template.tsx       # 重新挂载的布局
├── default.tsx        # 并行路由回退
└── opengraph-image.tsx  # OG 图片生成
```

### 八大模式

1. **Server Components 数据获取** — 直接在 Server Component 中 `async` 获取数据
2. **Client Components** — 用 `'use client'` 标记交互式组件
3. **Server Actions** — 用 `"use server"` 处理表单提交和数据变更
4. **并行路由** — 使用 `@slot` 实现独立的加载状态
5. **路由拦截** — `(.)photos/[id]` 实现 Modal 模式
6. **流式渲染** — 用 `Suspense` 包裹慢速组件实现渐进加载
7. **路由处理器** — `app/api/*` 替代 Pages Router 的 `pages/api/*`
8. **元数据与 SEO** — `generateMetadata` 动态生成 SEO 标签

### 缓存策略
```typescript
// 不缓存（始终新鲜）
fetch(url, { cache: "no-store" });

// 永久缓存（静态）
fetch(url, { cache: "force-cache" });

// ISR - 60 秒后重新验证
fetch(url, { next: { revalidate: 60 } });

// 基于标签的失效
fetch(url, { next: { tags: ["products"] } });
```

### 最佳实践
- ✅ 默认使用 Server Components，只在需要时加 `'use client'`
- ✅ 数据获取放在使用数据的地方（colocate）
- ✅ 用 Suspense 边界启用流式渲染
- ✅ 用并行路由实现独立加载状态
- ✅ 用 Server Actions 处理数据变更
- ❌ 不要传不可序列化的数据通过 Server → Client 边界
- ❌ 不要在 Server Component 中使用 Hooks
- ❌ 不要在 Client Component 中直接获取数据（用 Server Components 或 React Query）
- ❌ 不要忽略加载状态，始终提供 loading.tsx 或 Suspense

---

## 快速参考

### 常用命令速查

| 需求 | 操作 |
|------|------|
| 构建新页面/组件 | 直接描述需求（自动触发 frontend-design + ui-ux-pro-max） |
| 选择配色/字体/风格 | ui-ux-pro-max 自动匹配产品类型推荐 |
| 调整设计激进程度 | 在需求中指定 VARIANCE/MOTION/VISUAL 参数 |
| React 性能优化 | 写代码时 vercel-react-best-practices 自动生效 |
| Next.js App Router 开发 | 自动触发 nextjs-app-router-patterns |
| 审查现有 UI 质量 | `/web-design-guidelines <文件路径>` |
| 检查无障碍问题 | 直接说"检查无障碍"触发 accessibility |
| 创建艺术海报/设计图 | 描述想要的视觉效果触发 canvas-design |
| 要求独特的"非 AI 感"设计 | 使用 `/frontend-design` 启动 |

### 技巧建议

1. **日常开发流程** — 新建页面时，先让 ui-ux-pro-max 生成设计系统（配色/字体/风格），然后用 frontend-design 实现代码
2. **React/Next.js 项目** — vercel-react-best-practices 和 nextjs-app-router-patterns 会在写代码时自动优化
3. **需要精细控制** — 在描述中添加具体数值（"设计偏保守一点"、"动效多一些"），design-taste-frontend 会自动适配
4. **完成设计后** — 用 web-design-guidelines 审查代码质量，用 accessibility 检查无障碍合规
5. **需要视觉艺术品** — 用 canvas-design 生成海报/宣传图/艺术作品

---

## 安装记录

这些 Skills 通过以下命令安装在本项目目录中：

```bash
# 第一批（设计核心）
npx skills add anthropics/skills@frontend-design
npx skills add leonxlnx/taste-skill@design-taste-frontend
npx skills add anthropics/skills@canvas-design

# 第二批（审查与规范）
npx skills add vercel-labs/agent-skills@web-design-guidelines
npx skills add addyosmani/web-quality-skills@accessibility

# 第三批（UI/UX 设计系统）
npx skills add nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max

# 第四批（React/Next.js 框架）
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
npx skills add wshobson/agents@nextjs-app-router-patterns
```

安装位置：`.agents/skills/` 目录，并在 `.claude/skills/` 中创建了符号链接。
