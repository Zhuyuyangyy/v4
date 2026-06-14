export interface KnowledgePoint {
  concept: string;
  description: string;
  difficulty: '入门' | '进阶' | '高级';
}

export interface CodeSample {
  title: string;
  language: string;
  code: string;
}

export interface PresetQA {
  question: string;
  answer: string;
}

export interface CourseItem {
  id: string;
  name: string;
  category: '编程与算法基础' | '计算机系统' | '软件工程' | '人工智能方向' | '前沿与应用';
  difficulty: '入门' | '进阶' | '高级';
  preRequisite: string;
  themeColor: string;
  iconName: 'Code' | 'Layers' | 'GitCompare' | 'Brain' | 'Eye' | 'Shield' | 'Target';
  description: string;
  progress: number; // 0 to 100
  studyHours: number;
  knowledgePoints: KnowledgePoint[];
  codeSamples: CodeSample[];
  presetQA: PresetQA[];
}

export const COURSES_DATA: CourseItem[] = [
  // --- 编程与算法基础 ---
  {
    id: 'prog-c',
    name: 'C语言程序设计',
    category: '编程与算法基础',
    difficulty: '入门',
    preRequisite: '无',
    themeColor: '#00599C',
    iconName: 'Code',
    description: '学习计算机底层语言的开山之作，掌握变量、控制流、函数及核心指针内存操控。',
    progress: 100,
    studyHours: 48,
    knowledgePoints: [
      { concept: '基本语法', description: '数据类型、操作符及格式化输入输出。', difficulty: '入门' },
      { concept: '流程控制', description: 'if-else分支控制与for、while循环结构。', difficulty: '入门' },
      { concept: '函数与递归', description: '函数的定义、声明、值/地址传参与递归。', difficulty: '入门' },
      { concept: '数组与字符串', description: '一维/二维数组存储及字符数组截取判定。', difficulty: '入门' },
      { concept: '指针与内存操控', description: '指针地址、多重指针、数组指针及安全取值。', difficulty: '高级' },
      { concept: '动态内存管理', description: 'malloc、calloc、realloc与内存泄露释放防范。', difficulty: '进阶' }
    ],
    codeSamples: [
      {
        title: '递归斐波那契与指针交换',
        language: 'c',
        code: `#include <stdio.h>\n\n// 递归实现斐波那契数列\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\n// 指针交换\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int n = 10;\n    printf("Fibonacci(%d) = %d\\n", n, fibonacci(n));\n    \n    int x = 5, y = 10;\n    swap(&x, &y);\n    printf("x = %d, y = %d\\n", x, y);\n    return 0;\n}`
      }
    ],
    presetQA: [
      { question: '指针和数组有什么区别和联系？', answer: '指针是一个存储内存地址的变量，而数组是一片连续内存空间的别名。在表达式中，数组名常退化为指向首元素的指针，但数组大小可以通过sizeof求得，且不能被重新赋值赋值操作。' },
      { question: '什么是野指针？如何避免？', answer: '野指针是指向非法或不可用内存地址的指针。避免方法：初始化指针为NULL、及时将用完释放(`free`)后的指针置空、不返回局部变量的指针。' }
    ]
  },
  {
    id: 'prog-py',
    name: 'Python程序设计',
    category: '编程与算法基础',
    difficulty: '入门',
    preRequisite: '无',
    themeColor: '#3776AB',
    iconName: 'Code',
    description: '极速上手高表达力通用语言，深入理解数据结构推导式、高级生成器及闭包装饰器。',
    progress: 100,
    studyHours: 32,
    knowledgePoints: [
      { concept: '基础语法', description: '强类型动态变量、输入输出、切片机制等。', difficulty: '入门' },
      { concept: '高阶数据结构', description: 'List、Tuple、Dict、Set及强大的列表推导式。', difficulty: '入门' },
      { concept: '闭包与装饰器', description: '利用闭包进行无损切面增强（AOP面向切面）。', difficulty: '进阶' },
      { concept: '生成器与迭代器', description: 'yield延迟惰性计算及内存开销节约。', difficulty: '进阶' }
    ],
    codeSamples: [
      {
        title: '装饰器与生成器示范',
        language: 'python',
        code: `import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} 耗时: {time.time() - start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\n# 生成器示例\ndef fibonacci_gen(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b`
      }
    ],
    presetQA: [
      { question: 'Python中列表和元组有什么本质区别？', answer: '列表(list)是可变(mutable)数据结构，可以增删改元素；元组(tuple)是不可变(immutable)数据结构，一旦创建其关联内容及地址不能改变。元组通常做只读记录并充当字典的键名。' },
      { question: 'Python 的 GIL 是什么？如何绕过它？', answer: '全局解释器锁(Global Interpreter Lock)限制任意时刻单进程内只有一个线程在CPU中执行。对于CPU密集型操作，推荐使用多进程(`multiprocessing`)或者调用C编写的高性能第三方包扩展，对于I/O密集型推荐异步并发协程。' }
    ]
  },
  {
    id: 'prog-java',
    name: '面向对象程序设计（Java）',
    category: '编程与算法基础',
    difficulty: '进阶',
    preRequisite: '程序设计基础',
    themeColor: '#ED8B00',
    iconName: 'Code',
    description: '深度精通工业级企业技术平台，研透封装继承多态、异常架构与流式并发。',
    progress: 80,
    studyHours: 42,
    knowledgePoints: [
      { concept: '封装/继承/多态', description: '访问修饰符、extends多继承机制以及动态多态绑定。', difficulty: '入门' },
      { concept: '泛型擦除', description: '类型通配符与编译期安全保障机制。', difficulty: '进阶' },
      { concept: '并发与线程安全', description: 'synchronized、Lock以及高效线程池管理。', difficulty: '高级' },
      { concept: 'Stream与函数式编程', description: 'Lambda接口、并发执行链与空指针自愈。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '泛型管理器与Stream并行流程',
        language: 'java',
        code: `import java.util.*;\nimport java.util.stream.*;\n\npublic class CourseManager<T extends Course> {\n    private List<T> courses = new ArrayList<>();\n    \n    public void add(T course) {\n        courses.add(course);\n    }\n    \n    public List<T> filterByDifficulty(String difficulty) {\n        return courses.stream()\n            .filter(c -> c.getDifficulty().equals(difficulty))\n            .collect(Collectors.toList());\n    }\n    \n    public void processInParallel() {\n        courses.parallelStream()\n            .forEach(c -> System.out.println(Thread.currentThread().getName() + ": " + c.getName()));\n    }\n}`
      }
    ],
    presetQA: [
      { question: 'Java 中 == 和 equals() 有什么区别？', answer: '`==`在基本数据类型时比较其值，在复杂引用类型时比较其在堆中的内存参考地址。`equals()`默认由Object实现也是比较参考地址，但是大多数重构过的类（如String、Integer）则会比较具体的值含义是否相等。' },
      { question: 'HashMap的底层实现机制是什么？', answer: 'Java 8之前使用"数组+单向链表"架构；Java 8之后为"数组+链表+红黑树"。当单格链表长度大于8且数组总长度大于64时，单链表会重塑为红黑树以加速检索耗时。' }
    ]
  },
  {
    id: 'prog-cpp',
    name: '面向对象程序设计（C++）',
    category: '编程与算法基础',
    difficulty: '进阶',
    preRequisite: 'C语言基础',
    themeColor: '#00599C',
    iconName: 'Code',
    description: '完美解锁工程性能巅峰，研透智能指针、虚函数表机制、模板编程与右值移动。',
    progress: 60,
    studyHours: 45,
    knowledgePoints: [
      { concept: '多态与多重继承', description: '虚函数原理、纯虚函数及防止重叠的虚基类。', difficulty: '进阶' },
      { concept: 'RAII与析构释放', description: '利用栈生命周期，在析构函数中自动回收底层资源。', difficulty: '进阶' },
      { concept: '智能指针体系', description: 'shared_ptr、unique_ptr、weak_ptr与循环引用阻隔。', difficulty: '高级' },
      { concept: '移动语义与右值引用', description: '完美转发、转移构造减少隐式深备份数据性能损耗。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'RAII及智能指针完美管理',
        language: 'cpp',
        code: `#include <vector>\n#include <memory>\n#include <algorithm>\n\ntemplate<typename T>\nclass DataManager {\nprivate:\n    std::vector<std::shared_ptr<T>> data;\npublic:\n    void add(std::shared_ptr<T> item) { data.push_back(std::move(item)); }\n    void sort() {\n        std::sort(data.begin(), data.end(),\n            [](const auto& a, const auto& b) { return *a < *b; });\n    }\n};\n\nclass FileHandler {\nprivate:\n    FILE* file;\npublic:\n    FileHandler(const char* filename) {\n        file = fopen(filename, "r");\n        if (!file) throw std::runtime_error("Cannot open file");\n    }\n    ~FileHandler() { if (file) fclose(file); }\n};`
      }
    ],
    presetQA: [
      { question: 'C++ 虚函数是如何实现的？什么是虚映射表？', answer: 'C++通过虚映射表(vtable)及虚指针(vptr)实现多态。凡是有虚函数的类，编译器都会为其生成一个包含所有虚函数入口的虚表。每个对象实例包含一个虚指针，调用时在运行时去查表查出实际调用的代码。' },
      { question: '智能指针 unique_ptr 和 shared_ptr 区别是什么？', answer: '`unique_ptr`独占所批内存的生命所有权，不支持拷贝操作，只能通过`std::move`移动；而`shared_ptr`支持多路共享引用，底层使用动态引用计数，当计数为0时自行终结归还。' }
    ]
  },
  {
    id: 'prog-ds',
    name: '数据结构',
    category: '编程与算法基础',
    difficulty: '进阶',
    preRequisite: '程序设计基础',
    themeColor: '#4CAF50',
    iconName: 'Layers',
    description: '核心筑基课程。深度剖析线性结构、二叉树、图算法、平衡散列与多路B+树索引搜索。',
    progress: 75,
    studyHours: 48,
    knowledgePoints: [
      { concept: '线性结构', description: '有序顺序表、两端开放链表及合并除杂操作。', difficulty: '入门' },
      { concept: '树与高效平衡BST', description: '平衡二叉树(AVL)、自平衡红黑树及B+分层索引。', difficulty: '进阶' },
      { concept: '高级字符串匹配', description: 'KMP算法前后缀匹配重构以及字符哈希模式匹配。', difficulty: '高级' },
      { concept: '图算法', description: '有向图连通分支、最短路径算法与最小生成树模型。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'Python 实现 KMP 匹配',
        language: 'python',
        code: `def build_lps(pattern):\n    lps = [0] * len(pattern)\n    length, i = 0, 1\n    while i < len(pattern):\n        if pattern[i] == pattern[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length - 1]\n            else:\n                lps[i] = 0\n                i += 1\n    return lps\n\ndef kmp_search(text, pattern):\n    lps = build_lps(pattern)\n    i = j = 0\n    positions = []\n    while i < len(text):\n        if text[i] == pattern[j]:\n            i += 1; j += 1\n            if j == len(pattern):\n                positions.append(i - j)\n                j = lps[j - 1]\n        else:\n            if j != 0: j = lps[j - 1]\n            else: i += 1\n    return positions`
      }
    ],
    presetQA: [
      { question: 'B+ 树相比 B 树有哪些绝对优势？数据库为何偏爱它？', answer: '1. B+ 树只有叶子节点存放数据，其他分支节点只放索引值，这样能使一页容纳更多检索索引，大跨度查找时I/O次数更少；2. 所有叶子节点有一条双向链表相连，做范围顺序连续扫表时效率极高，不需要在父子层重叠跳转。' }
    ]
  },
  {
    id: 'prog-algorithm',
    name: '算法设计与分析',
    category: '编程与算法基础',
    difficulty: '高级',
    preRequisite: '数据结构',
    themeColor: '#FF5722',
    iconName: 'Target',
    description: '系统演练复杂工程求解，实战五大算法：分治、贪心、动态规划、回溯与随机分支界定。',
    progress: 50,
    studyHours: 40,
    knowledgePoints: [
      { concept: '渐进性时空复分析', description: '大O渐进、摊还分析与归纳推导。', difficulty: '进阶' },
      { concept: '动态规划(DP)', description: '最优子结构，状态转移方程提取、防止重叠计算。', difficulty: '高级' },
      { concept: '回溯搜索剪枝', description: '状态重构，DFS局部探索分支树深度剪切。', difficulty: '高级' },
      { concept: 'NP完全性证明', description: '定义多项式时间归约证明，区分P、NP、NPC概念。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '0-1背包最强动态规划',
        language: 'python',
        code: `def knapsack_01(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    # 选取的物品回溯\n    selected, w = [], capacity\n    for i in range(n, 0, -1):\n        if dp[i][w] != dp[i-1][w]:\n            selected.append(i-1)\n            w -= weights[i-1]\n    return dp[n][capacity], selected`
      }
    ],
    presetQA: [
      { question: '动态规划(DP)和分治法(Divide and Conquer)的区别是什么？', answer: '分治法是将原问题重构分解成独立无交叠的多个子任务分别求解，如快速排序；而动态规划分解出的子问题是有重叠子问题的，它依靠保存中间答案(备忘录)，避免了大量的重复无用计算。' }
    ]
  },
  {
    id: 'prog-compiler',
    name: '编译原理',
    category: '编程与算法基础',
    difficulty: '高级',
    preRequisite: '数据结构与自动机理论',
    themeColor: '#9C27B0',
    iconName: 'GitCompare',
    description: '深度揭秘源码到机器制品的奇妙转换：手写DFA词法扫描与递归下降语法分析计算。',
    progress: 40,
    studyHours: 44,
    knowledgePoints: [
      { concept: '词法扫描(Lexers)', description: '正则表达式构建NFA/DFA拓扑，生成标记流。', difficulty: '进阶' },
      { concept: '语法分析(Parsers)', description: 'LL(1)自顶向下推导，LR(1)/LALR移进-规约分析。', difficulty: '高级' },
      { concept: '中间代码生成', description: '生成SSA(静态单赋值)树，多重常数折叠优化。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '递归下降法解释型计算器',
        language: 'python',
        code: `class SimpleCalculator:\n    def __init__(self, expr):\n        self.tokens = list(expr.replace(' ', ''))\n        self.pos = 0\n    def parse(self):\n        return self.parse_expr()\n    def parse_expr(self):\n        result = self.parse_term()\n        while self.pos < len(self.tokens):\n            op = self.tokens[self.pos]\n            if op in ('+', '-'):\n                self.pos += 1\n                right = self.parse_term()\n                result = result + right if op == '+' else result - right\n            else: break\n        return result\n    def parse_term(self):\n        result = self.parse_factor()\n        while self.pos < len(self.tokens):\n            op = self.tokens[self.pos]\n            if op in ('*', '/'):\n                self.pos += 1\n                right = self.parse_factor()\n                result = result * right if op == '*' else result / right\n            else: break\n        return result\n    def parse_factor(self):\n        if self.tokens[self.pos] == '(':\n            self.pos += 1\n            r = self.parse_expr()\n            self.pos += 1 # match ')'\n            return r\n        num = ''\n        while self.pos < len(self.tokens) and self.tokens[self.pos].isdigit():\n            num += self.tokens[self.pos]\n            self.pos += 1\n        return int(num)`
      }
    ],
    presetQA: [
      { question: 'LL(k)分析和LR(k)分析法的核心区别？', answer: '`LL`是自顶向下的非确定性推导，从根出发采用左递归最左推导；`LR`是自底向上的规约回退，从叶出发最右推导的逆过程，抗错表达能力强很多，支持更宽展的语法集。' }
    ]
  },

  // --- 计算机系统 ---
  {
    id: 'system-cob',
    name: '计算机组成原理',
    category: '计算机系统',
    difficulty: '进阶',
    preRequisite: '数字逻辑基础',
    themeColor: '#607D8B',
    iconName: 'Layers',
    description: '透视裸机运行真相，研透冯·诺伊曼核心体系、多级Cache刷新、指令周期与流水线冒险。',
    progress: 90,
    studyHours: 48,
    knowledgePoints: [
      { concept: '多级存储层级', description: 'SRAM、DRAM以及Cache写策略与命中率提升。', difficulty: '进阶' },
      { concept: 'CPU流水线管理', description: '数据冒险、控制冒险及分支预测消除停顿。', difficulty: '高级' },
      { concept: '中断与DMA', description: '解放CPU、外设直接自主搬运内存数据机制。', difficulty: '进阶' }
    ],
    codeSamples: [],
    presetQA: [
      { question: '流水线冒险(Hazard)有哪几种？如何化解？', answer: '1. 结构冒险：多条指令抢占同一硬件端口。2. 数据冒险：后一条指令需使用前一条未完成写回的数据，可通过数据旁路(Bypassing)前传。3. 控制冒险：遇到跳转指令导致之后被预装载的指令作废，可通过延迟分支或高级分支预测规避。' }
    ]
  },
  {
    id: 'system-os',
    name: '操作系统',
    category: '计算机系统',
    difficulty: '进阶',
    preRequisite: '计算机组成原理',
    themeColor: '#1565C0',
    iconName: 'Layers',
    description: '打通硬件屏障，探寻虚拟地址交换、分页中断机制、多进程死锁消除与隔离沙箱。',
    progress: 85,
    studyHours: 46,
    knowledgePoints: [
      { concept: '进程模型与调度', description: '时间片轮转、多级反馈队列高频抢占状态及开销。', difficulty: '进阶' },
      { concept: '高并发进程通信同步', description: '信号量机制、互斥体、死锁防治银行家算法。', difficulty: '高级' },
      { concept: '虚拟存储机制', description: '缺页快表(TLB)寻址、页面置换算法。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'Python 信号量互斥控制',
        language: 'python',
        code: `import threading\n\nclass BoundedBuffer:\n    def __init__(self, capacity=5):\n        self.capacity = capacity\n        self.buffer = []\n        self.mutex = threading.Semaphore(1)\n        self.empty = threading.Semaphore(capacity)\n        self.full = threading.Semaphore(0)\n    \n    def produce(self, item):\n        self.empty.acquire()\n        self.mutex.acquire()\n        self.buffer.append(item)\n        print(f"生产: {item}")\n        self.mutex.release()\n        self.full.release()\n    \n    def consume(self):\n        self.full.acquire()\n        self.mutex.acquire()\n        item = self.buffer.pop(0)\n        print(f"消费: {item}")\n        self.mutex.release()\n        self.empty.release()\n        return item`
      }
    ],
    presetQA: [
      { question: '产生死锁(Deadlock)的四个必要条件是什么？', answer: '互斥使用、不可剥夺、持有并请求、环路等待。缺少任何一个都无法产生死锁。避阻死锁的方法包括银行家算法，预分配，打破锁链等。' }
    ]
  },
  {
    id: 'system-net',
    name: '计算机网络',
    category: '计算机系统',
    difficulty: '进阶',
    preRequisite: '操作系统',
    themeColor: '#0277BD',
    iconName: 'Layers',
    description: '全景呈现跨洋互通技术：探秘三次握手多级流量退避、DNS查询以及BGP自治域分发。',
    progress: 80,
    studyHours: 42,
    knowledgePoints: [
      { concept: '物理模型两层转换', description: 'OSI/TCPIP模型、可靠滑动窗口与差错校验。', difficulty: '入门' },
      { concept: '网络层路由器寻址', description: 'IP掩码分块、CIDR聚类及RIP/OSPF链路扩散。', difficulty: '进阶' },
      { concept: '可靠传输拥塞控制', description: '滑动重传机制，快恢复与快重传拥塞窗口滑动。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'TCP多线程套接字响应器',
        language: 'python',
        code: `import socket\nimport threading\n\ndef handle_client(cl_socket, addr):\n    while True:\n        data = cl_socket.recv(1024)\n        if not data: break\n        cl_socket.send(f"Echo: {data.decode()}".encode())\n    cl_socket.close()\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nserver.bind(('0.0.0.0', 8888))\nserver.listen(5)\n# 阻塞接受新客户端循环...`
      }
    ],
    presetQA: [
      { question: 'TCP和UDP协议有哪些核心差异？', answer: '1. TCP是面向连接的、可靠的，保证数据按序送达，支持流量与拥塞等高密度控制。2. UDP是无连接的，尽最大努力交付、没有拥塞控制且报头极短，适用于直播、游戏等要求延迟低的实时场景。' }
    ]
  },
  {
    id: 'system-db',
    name: '数据库系统原理',
    category: '计算机系统',
    difficulty: '进阶',
    preRequisite: '数据结构基础',
    themeColor: '#336791',
    iconName: 'Layers',
    description: '掌握海量存储系统内核：精通SQL范式转换、索引高度优化、两阶段封锁协议(2PL)与隔离。',
    progress: 75,
    studyHours: 40,
    knowledgePoints: [
      { concept: '数据模型与范式', description: '第一范式至BCNF范式转化、无损连接保障。', difficulty: '入门' },
      { concept: '两阶段锁2PL及隔离', description: '解决幻读与脏读、乐观并发/MVCC非阻塞设计。', difficulty: '高级' },
      { concept: '底层物理高密索引', description: '聚簇索引空间合并优势，防树层级恶化。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '学生关联多表多条件级联检索SQL',
        language: 'sql',
        code: `CREATE TABLE Student (\n    sno CHAR(10) PRIMARY KEY,\n    sname VARCHAR(20) NOT NULL,\n    sdept VARCHAR(30)\n);\n\n-- 复杂联表查询\nSELECT s.sname, s.sdept, sc.grade\nFROM Student s\nJOIN SC sc ON s.sno = sc.sno\nJOIN Course c ON sc.cno = c.cno\nWHERE c.cname = '数据库原理'\n  AND sc.grade >= 90\nORDER BY sc.grade DESC;`
      }
    ],
    presetQA: [
      { question: '数据库ACID特性分别是指什么？', answer: '原子性(Atomicity)：事务内所有SQL要么全成功要么全反悔。一致性(Consistency)：让数据库从一个合规状态滑动到另一个合规状态。隔离性(Isolation)：多事务并发不露破绽。持久性(Durability)：成功提交对磁盘是物理落盘，重启不丢。' }
    ]
  },

  // --- 软件工程 ---
  {
    id: 'soft-eng',
    name: '软件工程',
    category: '软件工程',
    difficulty: '进阶',
    preRequisite: '程序设计语言',
    themeColor: '#FF6F00',
    iconName: 'GitCompare',
    description: '系统化驾驭大型技术工程：研透重构分析、敏捷开发迭代、面向切面注入及DevOps持续集成。',
    progress: 85,
    studyHours: 36,
    knowledgePoints: [
      { concept: '敏捷与DevOps流水线', description: '全生命周期、Scrum看板及一键上线热部署。', difficulty: '进阶' },
      { concept: '高聚合解耦模块设计', description: '控制反转(IoC/DI)设计，解除代码紧咬绑定耦合。', difficulty: '高级' }
    ],
    codeSamples: [],
    presetQA: [
      { question: '什么是内聚和耦合？日常编写如何取舍？', answer: '内聚衡量模块内部逻辑单元各司其职的专一性，耦合衡量模块间相互牵制引用的复杂性。我们必须坚定追求"高内聚、低耦合"的宗旨，保证单模块修改不引发生态雪崩。' }
    ]
  },
  {
    id: 'soft-test',
    name: '软件测试',
    category: '软件工程',
    difficulty: '进阶',
    preRequisite: '软件工程基础',
    themeColor: '#D32F2F',
    iconName: 'Target',
    description: '全维度的阻击软件缺陷，掌握黑盒等价分类、白盒多层逻辑覆盖、JMeter高频测试及测试驱动开发。',
    progress: 70,
    studyHours: 32,
    knowledgePoints: [
      { concept: '等价类边界值划分', description: '精确划分输入无效和有效极限点。', difficulty: '入门' },
      { concept: '白盒条件覆盖', description: '条件路径、判定逻辑全分支覆盖检测。', difficulty: '进阶' },
      { concept: '测试驱动开发(TDD)', description: '在编写功能码前先行设计不通过用例。', difficulty: '进阶' }
    ],
    codeSamples: [
      {
        title: '等价类手机号码多用例PyTest',
        language: 'python',
        code: `import pytest\n\ndef is_valid_phone(phone: str) -> bool:\n    if not phone or len(phone) != 11: return False\n    if not phone.isdigit(): return False\n    return phone.startswith(('13', '15', '18', '19'))\n\nclass TestPhoneValidation:\n    def test_valid_phone(self):\n        assert is_valid_phone("13812345678") == True\n    def test_invalid_length(self): \n        assert is_valid_phone("138000") == False`
      }
    ],
    presetQA: [
      { question: '白盒测试中，条件覆盖与判定覆盖有什么高阶差异？', answer: '判定覆盖关注整个大分支语句表达式是True还是False；而条件覆盖则必须拆解开，关注表达式中包含的每个原子断言子条件的值分别都要取一遍True和False，检测维度更彻底。' }
    ]
  },

  // --- 人工智能方向 ---
  {
    id: 'ai-discrete',
    name: '离散数学',
    category: '人工智能方向',
    difficulty: '进阶',
    preRequisite: '高等数学',
    themeColor: '#8E24AA',
    iconName: 'Layers',
    description: '人工智能底层逻辑基础，严密推导数理命题、等价/偏序关系、图论网络流与代数抽象。',
    progress: 80,
    studyHours: 48,
    knowledgePoints: [
      { concept: '命题与谓词逻辑', description: '逻辑连接词、等价演化与演绎推理规则。', difficulty: '进阶' },
      { concept: '关系论', description: '自反、对称等价关系与格、Hasse偏序空间。', difficulty: '进阶' },
      { concept: '图论应用', description: '欧拉半图、哈密顿路、可平面性与网络吞吐。', difficulty: '高级' }
    ],
    codeSamples: [],
    presetQA: [
      { question: '等价关系和偏序关系核心差异在于什么？', answer: '等价关系要求对称性（反映无方向的相同相似）；偏序关系不仅没有对称性，反而必须具备反对称性（反映带有先后大小顺序排位的单向大小，如关系小于等于）。' }
    ]
  },
  {
    id: 'ai-calc',
    name: '概率论与数理统计',
    category: '人工智能方向',
    difficulty: '进阶',
    preRequisite: '微积分基础',
    themeColor: '#00897B',
    iconName: 'Layers',
    description: 'AI不确定性推理源泉，探求贝叶斯公式、大数定律、最大似然估计及多维协方差矩矩阵。',
    progress: 75,
    studyHours: 42,
    knowledgePoints: [
      { concept: '贝叶斯核心推理', description: '先验概率、样本观测条件转换后验计算。', difficulty: '入门' },
      { concept: '随机分布与大数定律', description: '伯努利、泊松高阶分布及中心极限定理证明。', difficulty: '进阶' },
      { concept: '最大似然点估计(MLE)', description: '对采样对象构建似然乘积算子，求导判定。', difficulty: '高级' }
    ],
    codeSamples: [],
    presetQA: [
      { question: '请解释什么是最大似然估计(MLE)？', answer: '最大似然估计核心思想认为："已经观测发生的一批样本，应该使其发生的概率最大化"。也就是通过写出该批样本在此参数下出现的联合概率表达式（似然函数），进而求导获取使这个函数取最大值的参数。' }
    ]
  },
  {
    id: 'ai-intro',
    name: '人工智能导论',
    category: '人工智能方向',
    difficulty: '入门',
    preRequisite: '基础数学',
    themeColor: '#00BCD4',
    iconName: 'Brain',
    description: 'AI全景探索开篇：领略启发式搜索树、逻辑符号系统、浅层感知机及伦理边界。',
    progress: 95,
    studyHours: 32,
    knowledgePoints: [
      { concept: '状态空间与启发式', description: '评估函数，构建A*最佳广度启发深度求解。', difficulty: '进阶' },
      { concept: '早期符号逻辑', description: '知识表示，一阶谓词逻辑消解自动推理。', difficulty: '进阶' }
    ],
    codeSamples: [
      {
        title: 'A* 最佳网格寻路模型',
        language: 'python',
        code: `import heapq\n\ndef a_star_search(start, goal, heuristic, neighbors):\n    open_set = [(0 + heuristic(start, goal), 0, start, [start])]\n    closed_set = set()\n    while open_set:\n        f, g, cur, path = heapq.heappop(open_set)\n        if cur == goal: return path, g\n        if cur in closed_set: continue\n        closed_set.add(cur)\n        for nbr, cost in neighbors(cur):\n            if nbr not in closed_set:\n                heapq.heappush(open_set, (g+cost+heuristic(nbr, goal), g+cost, nbr, path+[nbr]))\n    return None, float('inf')`
      }
    ],
    presetQA: [
      { question: 'A* 搜索算法的启发函数为何必须满足可采纳性(Admissible)？', answer: '即估计代价h(n)必须小于等于实际最短路径代价。一旦出现估计夸大，算法在未探索完真正最短路径时，就会忽略它进而导致求解出的路径不是全局最优解。' }
    ]
  },
  {
    id: 'ai-ml',
    name: '机器学习',
    category: '人工智能方向',
    difficulty: '进阶',
    preRequisite: '概率统计与 Python 程序设计',
    themeColor: '#00d4ff',
    iconName: 'Brain',
    description: '机器学习是现代智能的基石。全维度解锁从线性回归、双边界SVM、决策树精排到AdaBoost与随机森林树套袋、以及非监督K-Means和主成分无损降维投影等核心框架。',
    progress: 85,
    studyHours: 48,
    knowledgePoints: [
      { concept: '特征清洗降维', description: '缺失值均值或矩阵分解填补，对特征空间求取正交主成分方向提取PCA。', difficulty: '进阶' },
      { concept: '监督决策回归', description: '信息增益计算构建信息树分类，高维最大间距支持向量回归SVM。', difficulty: '进阶' },
      { concept: '非提升聚类', description: '随机初始多质点轮廓系数计算，K-Means多次质点迭代更新。', difficulty: '进阶' }
    ],
    codeSamples: [
      {
        title: 'KNN 分类器纯 Python 实现',
        language: 'python',
        code: `import numpy as np\nfrom collections import Counter\n\nclass KNNClassifier:\n    def __init__(self, k=3):\n        self.k = k\n\n    def fit(self, X, y):\n        self.X_train = np.array(X)\n        self.y_train = np.array(y)\n\n    def predict(self, X_test):\n        X_test = np.array(X_test)\n        preds = [self._predict_single(x) for x in X_test]\n        return np.array(preds)\n\n    def _predict_single(self, x):\n        # 欧氏距离计算\n        dists = np.sqrt(np.sum((self.X_train - x) ** 2, axis=1))\n        nearest_indices = np.argsort(dists)[:self.k]\n        nearest_labels = self.y_train[nearest_indices]\n        most_common = Counter(nearest_labels).most_common(1)\n        return most_common[0][0]\n\n# 鸢尾花样例测试\nif __name__ == "__main__":\n    X = [[5.1, 3.5], [4.9, 3.0], [6.2, 3.4], [5.9, 3.0]]\n    y = [0, 0, 1, 1]\n    knn = KNNClassifier(k=2)\n    knn.fit(X, y)\n    print("预测结果为:", knn.predict([[5.0, 3.2], [6.0, 3.1]]))`
      },
      {
        title: 'PyTorch 简单回归网络构建',
        language: 'python',
        code: `import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\nclass Regressor(nn.Module):\n    def __init__(self, in_features):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(in_features, 64),\n            nn.ReLU(),\n            nn.Linear(64, 1)\n        )\n    def forward(self, x):\n        return self.net(x)\n\n# 模拟训练循环\nmodel = Regressor(10)\ncriterion = nn.MSELoss()\noptimizer = optim.SGD(model.parameters(), lr=0.01)\nx_dummy = torch.randn(5, 10)\ny_dummy = torch.randn(5, 1)\n\nfor epoch in range(3):\n    pred = model(x_dummy)\n    loss = criterion(pred, y_dummy)\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n    print(f"Epoch {epoch} loss: {loss.item():.4f}")`
      }
    ],
    presetQA: [
      { question: '机器学习核心范式都有哪几种主要类别？', answer: '主要包含三大类别：监督学习（样本均标有正确输出分类或实数，如分类与回归）、非监督学习（样本没有标签，如K-Means聚类、降维等），以及强化学习（智能体与外部环境交互提供反馈奖励）。' }
    ]
  },
  {
    id: 'ai-dl',
    name: '深度学习',
    category: '人工智能方向',
    difficulty: '高级',
    preRequisite: '机器学习基础以及高等代数',
    themeColor: '#7c3aed',
    iconName: 'Layers',
    description: '深度解密深层特征抽取魔法：深耕BP反向梯度链式求导、池化运算、与ResNet残差阻隔梯度消失原理。',
    progress: 70,
    studyHours: 48,
    knowledgePoints: [
      { concept: '多层感知机与梯度下降', description: 'Sigmoid/ReLU激活函数，深度BP链式法则推导更新。', difficulty: '进阶' },
      { concept: '卷积运算(Convolution)', description: '局部感受野、权值共享，提取图像空间几何边缘。', difficulty: '高级' },
      { concept: '残差骨架ResNet', description: '跳跃连接(Skip Connection)保证几百层网络零梯度阻隔。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'NumPy 实现浅层前向传播',
        language: 'python',
        code: `import numpy as np\n\n# 用于计算前向传播和权值激活\nclass Layer:\n    def __init__(self, in_dim, out_dim):\n        self.W = np.random.randn(in_dim, out_dim) * 0.01\n        self.b = np.zeros((1, out_dim))\n    \n    def forward(self, X):\n        self.input = X\n        self.z = np.dot(X, self.W) + self.b\n        # ReLU 激活动作\n        return np.maximum(0, self.z)`
      }
    ],
    presetQA: [
      { question: '神经网络深度累加为什么容易导致梯度消失？如何防范？', answer: '在多层BP中，采用Sigmoid类激活函数求导最大不超过0.25，多层连续乘积后梯度迅速衰减为0。解决方法包括使用ReLU系列激活、引入ResNet残差短路以及Batch Normalization归一化。' }
    ]
  },
  {
    id: 'ai-nlp',
    name: '自然语言处理',
    category: '人工智能方向',
    difficulty: '高级',
    preRequisite: '深度学习',
    themeColor: '#06d6a0',
    iconName: 'Brain',
    description: '解码人类抽象语言体系：研进Word2Vec高维空间平移、Transformer注意力自注意力矩阵消融及BERT预训练。',
    progress: 60,
    studyHours: 42,
    knowledgePoints: [
      { concept: '词嵌入表征', description: 'Skip-Gram与CBOW模型提取语义空间向量。', difficulty: '进阶' },
      { concept: '自注意力机制(Attention)', description: '多头计算查询Query-Key相似乘积，动态赋权Value。', difficulty: '高级' },
      { concept: '预训练大时代', description: 'BERT双向编码掩码语境模型，GPT自回归因果语言链条。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '多头注意力矩阵数学计算原理',
        language: 'python',
        code: `import numpy as np\n\ndef scalar_token_attention(Q, K, V):\n    """简易计算 Q K V 注意力加权得分值"""\n    d_k = Q.shape[-1]\n    scores = np.dot(Q, K.T) / np.sqrt(d_k)\n    # Softmax 计算特征分布权重\n    weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1, keepdims=True)\n    return np.dot(weights, V)`
      }
    ],
    presetQA: [
      { question: 'Transformer中Self-Attention为什么要除以根号下d_k？', answer: '在d_k（特征维度）特别大时，点积和的数学方差也会特别大，使得经过Softmax后的分布极不平衡，部分值大得突兀导数却几乎为零（梯度饱和）。除以分母常数能拉回标准正态分布，防范梯度阻隔。' }
    ]
  },
  {
    id: 'ai-cv',
    name: '计算机视觉',
    category: '人工智能方向',
    difficulty: '高级',
    preRequisite: '深度学习',
    themeColor: '#f59e0b',
    iconName: 'Eye',
    description: '驱动机器洞察宏观世界：精研两阶段R-CNN区域锚框推荐，实时一阶YOLO系列多尺度网格特征回归。',
    progress: 55,
    studyHours: 44,
    knowledgePoints: [
      { concept: '图像形态转换', description: '双线性拉伸插值、直方图均衡增强。', difficulty: '入门' },
      { concept: '深度分类与迁移', description: '利用ImageNet精调浅层网络在小样本业务特征应用上。', difficulty: '进阶' },
      { concept: '一阶YOLO检测原理', description: '单张图像格点化，全局回归坐标置信与分类。', difficulty: '高级' }
    ],
    codeSamples: [],
    presetQA: [
      { question: '目标检测中，One-Stage和Two-Stage最本质的区别？', answer: 'One-stage(YOLO/SSD)无须专门提取候候选区，一步到位通过密布锚框回归定位并预测分类，极快适合高频实时；Two-stage(Faster R-CNN)则是先经过RPN建议候选范围，再进行二次分类与微调定位，精度更高但费时。' }
    ]
  },
  {
    id: 'ai-rl',
    name: '强化学习 / 生成式AI',
    category: '人工智能方向',
    difficulty: '高级',
    preRequisite: '深度学习以及马尔可夫链理论',
    themeColor: '#f43f5e',
    iconName: 'Brain',
    description: '探讨智能进化的最前沿：马尔可夫决策决策(MDP)贝尔曼递归更新、DQN动作估算、结合扩充生成对决GAN。',
    progress: 40,
    studyHours: 42,
    knowledgePoints: [
      { concept: '马尔可夫自愈控制', description: '贝尔曼方程时差(TD)估算与状态迁移概率矩阵。', difficulty: '进阶' },
      { concept: '深度 Q-Learning (DQN)', description: '引入重演缓冲区解耦合多步时序自相关关联阻隔训练振荡。', difficulty: '高级' },
      { concept: '生成扩散与AGI', description: '对决生成判别GAN，逆向马氏链加噪去噪Diffusion模型。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: 'Q-Learning 梯度逼近核心更新',
        language: 'python',
        code: `import numpy as np\n\nclass SimpleDQN:\n    def __init__(self, state_dim, action_dim, lr=0.001, gamma=0.99):\n        self.state_dim, self.action_dim = state_dim, action_dim\n        self.gamma, self.lr = gamma, lr\n        self.weights = np.random.randn(state_dim, action_dim) * 0.01\n    \n    def predict(self, s): return np.dot(s, self.weights)\n    \n    def update(self, s, a, r, s_next, done):\n        q_val = self.predict(s)\n        q_next = self.predict(s_next)\n        # 贝尔曼目标\n        target = r + (0 if done else self.gamma * np.max(q_next))\n        td_error = target - q_val[a]\n        # 简易多格随机梯度逼近\n        self.weights[:, a] += self.lr * td_error * s`
      }
    ],
    presetQA: [
      { question: 'DQN（深度Q网络）中引入经验回放（Experience Replay）是为了解决什么？', answer: '传统控制由于多连步在空间具有高度自相关性，网络训练极易朝单方向产生灾难性跑偏。经验回放打乱时序前后相关物理制约关系，让其近拟符合i.i.d.(独立同分布)的统计随机法则。' }
    ]
  },

  // --- 前沿与应用 ---
  {
    id: 'app-graphic',
    name: '计算机图形学',
    category: '前沿与应用',
    difficulty: '高级',
    preRequisite: '线性代数及 C++ 程序设计',
    themeColor: '#2E7D32',
    iconName: 'Eye',
    description: '探索数字视界：深入学习正交/透视投影数学矩阵变换、着色器(Shader)光照模型及全局路径追踪。',
    progress: 30,
    studyHours: 42,
    knowledgePoints: [
      { concept: '视口投影变换', description: '三维缩放、四元旋转平移、相机制动视口投影。', difficulty: '进阶' },
      { concept: '网格着色光照', description: 'Phong/Blinn-Phong高光环境衰减数学因子计算。', difficulty: '高级' },
      { concept: '全局光线路径探测', description: '蒙特卡洛积分光线散射路径相交，真实软阴影渲染。', difficulty: '高级' }
    ],
    codeSamples: [],
    presetQA: [
      { question: 'Phong 光照模型与 Blinn-Phong 光照模型的最大的高阶代数学差异？', answer: 'Phong公式计算的是视线反射向量R与视线V的夹角余弦；而Blinn-Phong引入了半角非折叠中间向量H（光照方向L与视线方向V的单位和），大大节省了计算相对复杂的反射向量R的数学硬件损耗。' }
    ]
  },
  {
    id: 'app-security',
    name: '信息安全基础',
    category: '前沿与应用',
    difficulty: '进阶',
    preRequisite: '操作系统和计算机网络',
    themeColor: '#C62828',
    iconName: 'Shield',
    description: '多层安全堡垒防线：研进RSA非对称质数加密、TLS安全四步握手、缓冲区防御及OWASP漏洞围追。',
    progress: 65,
    studyHours: 36,
    knowledgePoints: [
      { concept: '公钥非对称加密', description: '大数质因子难以求模逆，构建RSA非对称单向陷阱函数。', difficulty: '进阶' },
      { concept: 'Web跨站突围防控', description: 'SQL输入参数预编译化，XSS与跨站脚本CSRF请求防护。', difficulty: '进阶' }
    ],
    codeSamples: [],
    presetQA: [
      { question: 'RSA 非对称公钥密码系统基于何种数论难题？', answer: '基于极大的"双素数乘积对大因数进行因数分解"的世纪数学难题。寻找两个高密随机极高位大素数相乘在现代数硬件上瞬间完成，但逆向寻找这两个素数因子却在目前算力下需消耗几万年开销。' }
    ]
  },
  {
    id: 'app-bigdata',
    name: '大数据与云计算',
    category: '前沿与应用',
    difficulty: '高级',
    preRequisite: '分布式文件系统理论以及计算机网络',
    themeColor: '#00695C',
    iconName: 'Layers',
    description: '跨网络并行处理的宏伟架构：精通HDFS三副本容灾、MapReduce单词统计合并、Flink流式处理及k8s容器编排。',
    progress: 50,
    studyHours: 44,
    knowledgePoints: [
      { concept: '分布式副本系统', description: '心跳汇报保持副本同步、文件大分块切片容错。', difficulty: '进阶' },
      { concept: '并行计算模型', description: 'Map拉取散列分类，Reduce按键聚集汇总极速求解。', difficulty: '进阶' },
      { concept: '云原生自动化容器编排', description: 'K8S无感微服务热挂、自我修复、微容器端口弹性无缝扩缩容。', difficulty: '高级' }
    ],
    codeSamples: [
      {
        title: '极简并发 MapReduce 文字聚合统计',
        language: 'python',
        code: `# 模拟 Map 节点处理单流词语\ndef map_function(document):\n    for word in document.lower().split():\n        clean = word.strip('.,!?;:"\'()[]{}')\n        if clean: yield (clean, 1)\n\n# 模拟 Reduce 聚集收尾\ndef reduce_function(word, counts):\n    return (word, sum(counts))\n\ndocuments = ["Hello world hello", "MapReduce is powerful"]\nmapped = [kv for doc in documents for kv in map_function(doc)]\n# 分类洗牌(Shuffle)...\nprint("完成并归集合。")`
      }
    ],
    presetQA: [
      { question: '云计算 IaaS、PaaS、SaaS 主要区别在哪里？', answer: '1. IaaS(基础设施即服务)：租户只享受到虚拟机、裸存储卷等，需自行安装OS及中间件。2. PaaS(平台即服务)：预装了运行时环境（如MySQL、Node等），租户只需上传自己编写的具体业务代码。3. SaaS(软件即服务)：直接服务最终消费者（如网页版腾讯会议/飞书）。' }
    ]
  }
];
