# AgentHub 中心球替换为「公路 + 小汽车 + 2 智能体连线」

日期：2026-06-18
范围：仅 `public/agenthub/index.html` 单文件 + 新增 `public/agenthub/assets/car/` 资源目录。
不改：`src/components/homepage/AgentHub.vue`、`Welcome.vue`、postMessage 协议。

## 目标

在现有 3D 智能体枢纽场景中，把中心小球 (`coreBall`) 替换为「沿 spiral 跑的开源小汽车」+「螺旋上方的发光公路」+「随 beat 切换连接 2 个智能体节点的贝塞尔线」，让用户进入主页后**一眼看懂**「系统在按路径接力跑」。

## 用户已确认的关键决策

| 决策点 | 选定 |
|---|---|
| 改动范围 | 只替换核心元素（推荐），保留 spiral 场景与 postMessage |
| 汽车模型来源 | Khronos 官方 glTF-Sample-Models（CC-BY 4.0） |
| 加载方式 | 下载到 `public/agenthub/assets/car/`，仓库自含 |
| 视觉风格 | 低多边形 + 引擎发光，与现有 bloom 调性一致 |
| 行驶路径 | 沿用现有 `spiralAt(t)` |
| 路面提示 | ribbon 公路上画虚线 + 箭头 |
| 运动时序 | 持续跑、beat 切换时 2 智能体连线重新指向 |

## 架构

- 单文件改动：`public/agenthub/index.html`（约 120 行新增 + 30 行替换）
- 新资源目录：`public/agenthub/assets/car/`
  - `car.glb`（GLB 二进制，单文件 < 1MB）
  - `LICENSE.md`（CC-BY 4.0 声明，附带 Khronos 链接）
- 依赖：仅追加 `import('https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js')`，不引入 npm 包

## 组件

### 1. 资源加载

- 在 hub 初始化阶段（已有 `(async function () { ... })()` 内部）追加：
  - `const { GLTFLoader } = await import('https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');`
  - `const gltf = await new GLTFLoader().loadAsync('/agenthub/assets/car/car.glb');`
  - `const car = gltf.scene;`
- 加载失败兜底：catch 后用 `THREE.Group` 拼一个低多边形占位车（box + cabin + 4 wheels），保证场景始终有车
- 加载中状态：与现有 `loadtip` 文案切换为「正在加载智能小车…」

### 2. 公路（ribbon）

- 复用现有 `spiralAt(t)` 函数（输出位置与切线），新增 `spiralRoadMesh`：
  - 用 `THREE.Mesh` + 自定义 BufferGeometry（沿 path 切片，160 段）
  - 每段平面沿切线对齐，宽度 0.5
  - 路面材质：`MeshStandardMaterial`，emissive 弱蓝（`#1a2a3a`），emissiveIntensity 1.6
- 路面纹理（canvas 程序化生成 64×256）：
  - 中央虚线（黄白相间，dashSize=14）
  - 一侧方向箭头（每 64 像素一个，cyan）
  - `texture.wrapS = RepeatWrapping` + `repeat.set(8, 1)`
- 公路与汽车关系：公路沿 spiral 平铺在 y+0.05；汽车走外圈环（r=12.5），与 ribbon 平行但不重合（视觉上"车在公路上方的架空轨道跑"，强化"接力叙事"）
- 公路边缘灯带：2 条 `TubeGeometry`（cyan additive 0.55）沿 path 边缘走，强化"公路"识别度

### 3. 汽车

- 模型：Khronos 官方 glTF-Sample-Models 中的 `CesiumMilkTruck.glb`（CC-BY 4.0，440KB），下载到 `public/agenthub/assets/car/car.glb`
- 路径：固定外圈 r=12.5，y=0.5 + sin 摆动 ±0.4，绕 Y 轴 360° 一圈约 11s。**采用外圈环而非 spiralAt 的原因**：spiral 终点进 plaza 中心会被 coreBall/capsule 遮挡，外圈环保证车始终在画面里、始终在 5 个节点同高度
- 朝向：每帧用 `carGroup.lookAt(nextPos)`，车头沿路径切线
- 装饰：2 个前轮位置加 cyan 引擎光晕（glowSprite 0.5），2 个后轮加 warm gold 尾灯（glowSprite 0.35），车底 1 束 PointLight (0x9fd6ff, 1.6, 3.4) + 路面光圈 (glowSprite 0.9) + 顶部 marker (glowSprite 0.5)
- 速度：carT += 0.0009/帧；不与 beat 同步，持续跑

### 4. 2 智能体连线

- 节点：当前 beat 对应的 1 个智能体节点（hubStages[i]）+ 它在 6 模块顺序中的**下一个**节点（hubStages[i+1]）。loop 拍时连「反馈」→「画像」（闭环首尾相接）
- 线：`THREE.Line2` + `LineMaterial`（`three/examples/jsm/lines/...`），虚线模式
- 路径：贝塞尔曲线，控制点抬升 0.4 高度 + 横向偏移
- 颜色：随 beat 切换，色板沿用现有 `TF` 主题（cyan / gold / purple / emerald）
- beat 切换时机：现有 `state.id` 变化时（`setBeat` 触发）重新计算端点

### 5. 移除/缩放 `coreBall`

- 不删除 `coreBall` 节点（避免动太多），缩放至 0、停用其 light sprite
- 保留 `coreBall` 的 `glowTex` 引用给公路材质（`emissiveMap`）

## 数据流

```
Welcome.vue
  ↓ postMessage({type:'agenthub:setBeat', id})
iframe contentWindow
  ↓ HUB.setBeat(i, id)
  ↓ _apply()
    ├─ 更新 active beat 高亮（现有逻辑）
    ├─ 重新计算 2 智能体端点（新增）
    └─ 更新 2 智能体连线颜色（新增）
每帧 RAF:
  ├─ 现有 spiral flow particles 推进
  ├─ 公路 ribbon UV 平移（视觉跑动）
  └─ 汽车沿 spiralAt(t) 前进 + 朝向切线
```

## 错误处理

- GLTFLoader 失败 → 用占位 `THREE.Group`（box body + cabin + 4 wheels）兜底
- 资源 404 → 兜底占位车 + 控制台 `console.warn('[AgentHub] car.glb missing, fallback active')`
- WebGL context lost → 现有逻辑已有 `webglcontextlost` 处理，不变

## 验收

1. 启动 dev server（已有 5175），访问主页，新手弹窗关闭后，hub iframe 内可见：
   - 中心区域有「螺旋发光公路 + 沿公路跑的小汽车 + 2 条彩色虚线连接 2 个智能体节点」
   - 汽车与 spiral 微粒同步运动，转角自然
2. 点击主页"6 模块协同"列表中的任一模块：
   - 2 条连线指向的节点对变化
   - 连线颜色切换
   - 汽车继续在公路上跑（不被 beat 切换打断）
3. 控制台无报错（GLTFLoader 失败时允许一条 warn）
4. 缩窄到 720px / 1180px / 1680px 任一宽度，hub 容器自适应、3D 不变形（沿用现有 iframe 响应式）
5. 对比修改前后截图：旧版中心是小球+光晕，新版是「公路+车+连线」，整体氛围保留

## 不做

- 不引入 npm 包（保持 esm.sh CDN 一致）
- 不改 postMessage 协议
- 不改 Welcome.vue 任何 prop 或事件
- 不做镜头切换、不做 7-beat 叙事（保留现有 5 拍 + writeback）
- 不做 VR/AR / 触屏手势（保留现有鼠标拖拽 + 滚轮缩放）
