---
name: image-vision
description: 调用本地LM Studio的qwen/qwen3.5-9b模型识别图片。当需要识别图片、分析截图、理解图像内容时使用此skill。
user-invocable: true
allowed-tools:
  - Bash
  - Read
---

# /image-vision — 本地图片识别

调用 LM Studio 中本地部署的 `qwen/qwen3.5-9b` 模型识别图片内容。该模型具有推理链（reasoning）能力，会在内部分析图片后输出结果。

参数: `$ARGUMENTS`

---

## 用法

```
/image-vision <图片路径> [问题描述]
```

- `<图片路径>`: 必填，本地图片文件的绝对路径
- `[问题描述]`: 可选，要对图片提出的问题，默认为"请详细描述这张图片的内容"

示例:
```
/image-vision D:/screenshots/app.png
/image-vision D:/photos/ui.png 这个界面有哪些按钮和文字
/image-vision D:/designs/mockup.png 描述配色方案和布局
```

---

## 执行流程

### 1. 解析参数

从 `$ARGUMENTS` 中提取:
- 图片路径: 以 `/` 或盘符（如 `C:` `D:`）开头的参数
- 问题描述: 剩余参数拼接，默认为"请详细描述这张图片的内容，包括布局、文字、颜色、图标等所有细节。用中文回答。"

### 2. 验证图片

用 Read 工具确认图片文件存在。支持: PNG, JPG, JPEG, WEBP, GIF, BMP。

### 3. 调用 LM Studio API

使用 Python 脚本编码图片并调用 LM Studio API。**关键: max_tokens 必须设为 3000 以上**，因为该模型会消耗大量 token 进行内部推理（reasoning），如果 max_tokens 太小会导致最终 content 为空。

**调用脚本（保存为临时 Python 文件执行）:**

```python
import base64, json, sys, urllib.request, os

IMAGE_PATH = r"<图片绝对路径>"
QUESTION = r"<问题描述>"

# 读取并编码图片
with open(IMAGE_PATH, 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# 检测 MIME 类型
ext = os.path.splitext(IMAGE_PATH)[1].lower()
mime_map = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.webp': 'image/webp', '.gif': 'image/gif', '.bmp': 'image/bmp'}
mime = mime_map.get(ext, 'image/png')

# 构建请求 - 使用标准 OpenAI vision 格式
payload = {
    'model': 'qwen/qwen3.5-9b',
    'messages': [{
        'role': 'user',
        'content': [
            {'type': 'text', 'text': QUESTION},
            {'type': 'image_url', 'image_url': {'url': f'data:{mime};base64,{image_data}'}}
        ]
    }],
    'max_tokens': 4096,
    'temperature': 0.3
}

req = urllib.request.Request(
    'http://localhost:1234/v1/chat/completions',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        content = result['choices'][0]['message'].get('content', '')
        if not content:
            print('WARNING: 模型返回空内容，可能是max_tokens不够（reasoning消耗了大量token）', file=sys.stderr)
        print(content)
except Exception as e:
    error_msg = str(e)
    if 'Model reloaded' in error_msg:
        print('模型正在重新加载中，请等待几秒后重试', file=sys.stderr)
    elif 'crashed' in error_msg:
        print('模型崩溃了，请在 LM Studio 中重新加载 qwen/qwen3.5-9b 后重试', file=sys.stderr)
    else:
        print(f'API调用失败: {error_msg}', file=sys.stderr)
    sys.exit(1)
```

### 4. 执行方式

将上述 Python 脚本写入临时文件（如 `/tmp/image_vision.py`），然后执行:

```bash
"/c/Users/Lenovo/python-sdk/python3.13.2/python.exe" /tmp/image_vision.py
```

### 5. 返回结果

- 将模型输出的内容直接展示给用户
- 如果 content 为空但 reasoning_content 有内容，说明 max_tokens 不够，需要增大后重试
- 如果模型崩溃，提示用户在 LM Studio 中重新加载模型后重试
- 如果 LM Studio 未运行，提示用户启动 LM Studio 的本地服务器

---

## 模型特性

`qwen/qwen3.5-9b` 是一个具有推理链（chain-of-thought reasoning）能力的模型。处理图片时:
- 模型会先在内部推理分析图片（消耗 reasoning tokens）
- 然后输出最终的 content
- **max_tokens 必须 >= 3000**，推荐 4096，否则推理过程会占据所有 token 导致最终输出为空
- 推理过程在 `reasoning_content` 字段中，可以忽略

---

## 故障排除

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| content 为空 | max_tokens 太小，reasoning 消耗完 | 增大 max_tokens 到 4096+ |
| 模型崩溃 (crashed) | 模型未正确加载或 GPU 内存不足 | 在 LM Studio 中重新加载模型 |
| Model reloaded | 模型正在切换模式 | 等待 5-10 秒后重试 |
| 连接失败 | LM Studio 服务器未启动 | 在 LM Studio 设置中开启本地服务器 |
