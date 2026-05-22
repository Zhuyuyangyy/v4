<<<<<<< HEAD
# EduMind Frontend + Lightweight API

这是一个基于 `Vue 3 + Vite + TypeScript` 的个性化学习平台前端项目，当前补了一套轻量本地 API 服务，方便页面从假数据逐步切到真实接口。

## 当前完成内容

- 学习画像页已接入 `/api/profile/analyze`
- 学习资源页已接入 `/api/resources` 和 `/api/resources/recommended`
- 智能辅导页已接入 `/api/tutoring/ask`
- 学习路径页已接入 `/api/learning-path`
- 效果评估页已接入 `/api/evaluation`
- 所有已接入页面都保留了 fallback 策略
  API 可用时使用接口数据
  API 不可用时继续展示本地默认数据
=======
# EduMind

一个基于 `Vue 3 + Vite + TypeScript` 的个性化学习平台示例项目，当前已经补齐一版可运行的本地后端，并完成主要页面的前后端联调。

## 当前完成度

- 学习画像接入 `/api/profile/analyze`
- 资源页接入 `/api/resources` 和 `/api/resources/recommended`
- 学习路径接入 `/api/learning-path`
- 效果评估接入 `/api/evaluation`
- 智能辅导接入 `/api/tutoring/ask`
- 自由对话页接入 `/api/chat`
- 所有已接入页面都保留本地 fallback，接口不可用时不会直接空白
>>>>>>> feature/your-dev

## 项目结构

- [src/views](D:/ZYY_Project/v4/src/views) 页面视图
- [src/composables](D:/ZYY_Project/v4/src/composables) 组合式逻辑
- [src/lib/api.ts](D:/ZYY_Project/v4/src/lib/api.ts) 前端 API 请求封装
<<<<<<< HEAD
- [src/types/api.ts](D:/ZYY_Project/v4/src/types/api.ts) API 类型定义
- [server/index.js](D:/ZYY_Project/v4/server/index.js) 轻量本地 API 服务入口
- [server/data.js](D:/ZYY_Project/v4/server/data.js) 当前接口 mock 数据与简单业务逻辑

## 启动方式

先启动本地 API：
=======
- [src/types/api.ts](D:/ZYY_Project/v4/src/types/api.ts) 前后端通信类型
- [server/index.js](D:/ZYY_Project/v4/server/index.js) 本地 API 服务入口
- [server/data.js](D:/ZYY_Project/v4/server/data.js) 数据读取与后端业务逻辑
- [server/content](D:/ZYY_Project/v4/server/content) JSON 数据源

## 启动方式

先启动本地后端：
>>>>>>> feature/your-dev

```bash
npm run server
```

<<<<<<< HEAD
开发模式启动前端：
=======
再启动前端开发环境：
>>>>>>> feature/your-dev

```bash
npm run dev
```

如果希望后端自动监听重启：

```bash
npm run dev:server
```

说明：

<<<<<<< HEAD
- Vite 已通过 [vite.config.ts](D:/ZYY_Project/v4/vite.config.ts) 把 `/api` 代理到 `http://localhost:8787`
- 默认 API 端口是 `8787`

## 已提供接口
=======
- Vite 会把 `/api` 代理到 `http://localhost:8787`
- 默认后端端口是 `8787`

## 已提供 API
>>>>>>> feature/your-dev

- `GET /api/health`
- `POST /api/profile/analyze`
- `POST /api/chat`
- `POST /api/tutoring/ask`
- `GET /api/tutoring/topics`
- `GET /api/resources`
- `GET /api/resources/recommended`
- `GET /api/learning-path`
- `GET /api/evaluation`

## 页面接入说明

### 学习画像

- 文件：[useProfileSurvey.ts](D:/ZYY_Project/v4/src/composables/useProfileSurvey.ts)
- 优先请求 `/api/profile/analyze`
- 请求失败时回退到前端本地生成逻辑

<<<<<<< HEAD
### 学习资源

- 文件：[Resources.vue](D:/ZYY_Project/v4/src/views/Resources.vue)
- 页面加载时请求资源列表和推荐资源
- 请求期间显示轻量 loading 文案
=======
### 资源页

- 文件：[Resources.vue](D:/ZYY_Project/v4/src/views/Resources.vue)
- 页面加载时请求资源列表和推荐资源
- 请求期间显示 loading 文案

### 学习路径

- 文件：[LearningPath.vue](D:/ZYY_Project/v4/src/views/LearningPath.vue)
- 页面加载时请求 `/api/learning-path`
- 接口数据与本地场景配置合并，失败时保留本地路径数据

### 效果评估

- 文件：[Evaluation.vue](D:/ZYY_Project/v4/src/views/Evaluation.vue)
- 页面加载时请求 `/api/evaluation`
- 后端返回纯数据，前端负责把 `icon` 字符串映射成 Vue 组件
>>>>>>> feature/your-dev

### 智能辅导

- 文件：[Tutoring.vue](D:/ZYY_Project/v4/src/views/Tutoring.vue)
- 提问时调用 `/api/tutoring/ask`
- 请求期间禁用输入和按钮，并显示“正在思考中...”

<<<<<<< HEAD
### 学习路径

- 文件：[LearningPath.vue](D:/ZYY_Project/v4/src/views/LearningPath.vue)
- 页面加载时请求 `/api/learning-path`
- 请求失败时保留本地默认内容

### 效果评估

- 文件：[Evaluation.vue](D:/ZYY_Project/v4/src/views/Evaluation.vue)
- 页面加载时请求 `/api/evaluation`
- 后端返回纯数据，前端补上对应 icon 组件

## 校验

当前已通过：

```bash
./node_modules/.bin/vue-tsc --noEmit
```

说明：

- 在当前桌面沙箱环境里，`vite build` 可能因为 `esbuild` 子进程权限报 `spawn EPERM`
- 这不等于源码有类型错误；本轮修改的 TypeScript 校验已经通过

## 下一步建议

- 给 [Chat.vue](D:/ZYY_Project/v4/src/views/Chat.vue) 明确定位后接入 `/api/chat`
- 把 [server/data.js](D:/ZYY_Project/v4/server/data.js) 的硬编码数据迁到 JSON 或文件存储
- 统一前后端的画像分析逻辑，减少重复实现
- 给资源页和路径页补更完整的 skeleton/loading UI
=======
### 自由对话

- 文件：[Chat.vue](D:/ZYY_Project/v4/src/views/Chat.vue)
- 提问时调用 `/api/chat`
- 保留流式打字效果和本地 fallback 回复

## 后端说明

当前后端是轻量 Node HTTP 服务，但已经做了两步增强：

- 接口数据从 [server/content](D:/ZYY_Project/v4/server/content) 下的 JSON 文件读取，改数据不需要改代码
- `readJson` 增加了 1MB body 大小限制，并对非法 JSON 返回 `400`
- 新增 [server/store.json](D:/ZYY_Project/v4/server/store.json) 作为轻量持久化文件，用来保存最近一次学习画像、自由对话记录和智能辅导历史

当前持久化接口：

- `GET /api/profile/latest`
- `GET /api/chat/history`
- `GET /api/tutoring/history`

## 校验

建议本地运行：

```bash
./node_modules/.bin/vue-tsc --noEmit
node --check server/index.js
```

也可以直接手动验证接口：

```bash
curl -s http://localhost:8787/api/health
curl -s http://localhost:8787/api/learning-path
curl -s http://localhost:8787/api/evaluation
```

## 下一步建议

- 给后端补最轻量的持久化，例如 `store.json`
- 明确 `Chat` 和 `Tutoring` 的长期分工
- 补齐 empty / error / retry 状态
- 继续把评估、路径、画像里的重复规则抽成共享逻辑
>>>>>>> feature/your-dev
