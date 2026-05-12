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

## 项目结构

- [src/views](D:/ZYY_Project/v4/src/views) 页面视图
- [src/composables](D:/ZYY_Project/v4/src/composables) 组合式逻辑
- [src/lib/api.ts](D:/ZYY_Project/v4/src/lib/api.ts) 前端 API 请求封装
- [src/types/api.ts](D:/ZYY_Project/v4/src/types/api.ts) API 类型定义
- [server/index.js](D:/ZYY_Project/v4/server/index.js) 轻量本地 API 服务入口
- [server/data.js](D:/ZYY_Project/v4/server/data.js) 当前接口 mock 数据与简单业务逻辑

## 启动方式

先启动本地 API：

```bash
npm run server
```

开发模式启动前端：

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

## 已提供接口

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

### 学习资源

- 文件：[Resources.vue](D:/ZYY_Project/v4/src/views/Resources.vue)
- 页面加载时请求资源列表和推荐资源
- 请求期间显示轻量 loading 文案

### 智能辅导

- 文件：[Tutoring.vue](D:/ZYY_Project/v4/src/views/Tutoring.vue)
- 提问时调用 `/api/tutoring/ask`
- 请求期间禁用输入和按钮，并显示“正在思考中...”

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
