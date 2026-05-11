import{d as F,a,b as s,F as p,r as _,l as f,m as y,D as L,S as I,t as n,s as E,v as K,x as Q,e as C,n as v,p as $,w as U,T as j,i as g,j as l,k as q,f as S,M as R,q as X,_ as Y}from"./index-CCfb86pd.js";import{P as G}from"./pen-tool-C5N5JcKG.js";import{F as J}from"./file-text-B5e3NTE6.js";import{T as O,a as W}from"./thumbs-down-Cfdt5TJa.js";import{C as D}from"./code-B3_2ww5-.js";import{T as Z}from"./target-2BPZfdAl.js";const ss={class:"tutoring"},es={class:"tutoring-layout"},os={class:"tutoring-main"},ts={class:"mode-tabs reveal reveal-delay-1"},ls=["onClick"],ns={class:"mode-tab-icon"},as={class:"mode-tab-info"},is={class:"mode-tab-label"},cs={class:"mode-tab-desc"},rs={key:0,class:"qa-list"},ds={class:"question-bubble"},us={class:"question-text"},ps={class:"bubble-time"},_s={class:"answer-bubble"},vs=["innerHTML"],bs={class:"answer-footer"},ks={class:"answer-feedback"},hs=["onClick"],ms=["onClick"],fs={key:1,class:"empty-state"},ys={class:"empty-graphic"},gs={class:"topic-browse"},ws={class:"topic-group-header"},Cs={class:"topic-group-icon"},$s={class:"topic-group-label"},qs={class:"topic-items"},Ts=["onClick"],xs={class:"tutoring-input"},zs={class:"input-mode-badge"},As={class:"input-row"},Ms=["placeholder"],Ss=["disabled"],Ds={class:"tutoring-sidebar"},Ps={class:"sidebar-card modes-quick"},Bs={class:"mode-list"},Hs=["onClick"],Ns={class:"mode-item-info"},Vs={class:"mode-item-label"},Fs={class:"mode-item-desc"},Ls={class:"sidebar-card sessions-card"},Is={class:"sessions-header"},Es={key:0,class:"session-list"},Ks={class:"session-info"},Qs={class:"session-title"},Us={class:"session-meta"},js=F({__name:"Tutoring",setup(Rs){const r=g(""),i=g("qa"),b=g([]),k=g(!1),d=[{key:"qa",icon:L,label:"自由问答",desc:"开放式提问，AI 即时解答",color:"#00d4ff"},{key:"solve",icon:G,label:"解题助手",desc:"分步解析，详细推导过程",color:"#7c3aed"},{key:"explain",icon:J,label:"概念精讲",desc:"深入浅出，系统讲解知识点",color:"#06d6a0"},{key:"brainstorm",icon:I,label:"举一反三",desc:"拓展延伸，关联相关知识",color:"#f59e0b"}],P=[{label:"编程开发",icon:D,questions:["Python 中列表和元组的区别","什么是闭包？有什么作用？","解释 RESTful API 设计原则"],color:"#00d4ff"},{label:"数据科学",icon:R,questions:["什么是过拟合？如何避免？","解释交叉验证的原理","PCA 降维的原理是什么？"],color:"#7c3aed"},{label:"数学基础",icon:Z,questions:["什么是梯度下降法？","解释泰勒展开的意义","矩阵的特征值有什么意义？"],color:"#06d6a0"},{label:"算法与数据结构",icon:D,questions:["动态规划和贪心算法的区别","解释时间复杂度的概念","什么是哈希表？冲突如何解决？"],color:"#f59e0b"}],B=[{title:"Python 基础概念",count:8,date:"今天"},{title:"机器学习面试准备",count:15,date:"昨天"},{title:"微积分复习",count:6,date:"3天前"}],H={qa:t=>`很好的问题！关于「${t}」，我来为你详细解答。

## 核心概念

首先，我们需要理解这个问题的本质。这是一个非常重要的基础知识，掌握它对于后续学习至关重要。

**关键要点：**

1. **理解基本原理** — 掌握核心定义和公式
2. **实际应用场景** — 了解在现实中的使用
3. **常见误区** — 避免理解上的偏差

> 学习建议：多结合实例来理解抽象概念，效果会更好。

## 相关概念

这个问题还与以下知识点密切相关：
- 前置知识：需要先掌握的基础概念
- 延伸阅读：进阶学习的方向

你可以继续追问，我会为你进一步解答！`,solve:t=>`让我来逐步解析「${t}」。

## 解题思路

**步骤 1：理解题意**
首先分析题目给出的条件和要求解的问题。

**步骤 2：确定方法**
根据题目类型选择合适的解题方法。

**步骤 3：分步推导**

1. 列出已知条件
2. 应用核心公式
3. 代入数据计算
4. 验证结果

**步骤 4：答案验证**

\`\`\`python
# 示例代码
def verify_solution():
    result = solve()
    assert check(result)
    return result
\`\`\`

> 提示：多练习同类题目可以加深理解。

最终答案需要根据具体题目进行计算。建议你先自己尝试，遇到困难时再继续提问。`,explain:t=>`## 深入讲解：「${t}」

### 1. 这是什么？

这是一个核心概念，它在相关领域中扮演着基础性的角色。

### 2. 为什么重要？

掌握这个概念可以帮助你：
- 建立扎实的知识基础
- 理解更复杂的进阶内容
- 解决实际应用中的问题

### 3. 如何理解？

**直观理解：**
可以把它想象成一个"黑箱"，输入经过处理得到输出，关键在于理解内部的处理机制。

**形式化定义：**
在数学上，这个概念可以用以下方式表示：

> 定义：若满足条件 A，则称 X 具有性质 Y。

### 4. 类比说明

这个概念类似于日常生活中的 ____ ，都是通过 ____ 来实现 ____ 的。

### 5. 实际应用

在实际项目中，这个概念被广泛应用于：
1. 数据处理流程
2. 算法设计
3. 系统架构

希望这个讲解对你有帮助！如需深入了解某个方面，请继续提问。`,brainstorm:t=>`关于「${t}」，让我们从多个角度来拓展思考。

## 🔗 关联知识

### 1. 相关概念
以下概念与你的问题密切相关：

- **概念 A** — 基础前置知识
- **概念 B** — 同一领域的不同方向
- **概念 C** — 进阶应用方向

### 2. 实际应用场景

| 场景 | 应用方式 | 难度 |
|------|---------|------|
| 场景一 | 直接应用 | ⭐⭐ |
| 场景二 | 组合使用 | ⭐⭐⭐ |
| 场景三 | 创新应用 | ⭐⭐⭐⭐ |

### 3. 延伸思考

**如果换个角度：**
- 从理论角度看：...
- 从实践角度看：...
- 从历史发展看：...

### 4. 推荐学习路径

1. 先掌握基础概念
2. 完成相关练习
3. 阅读进阶资料
4. 动手实践项目

> 📌 学习是循序渐进的过程，每一步都很重要。

这样的拓展对你有帮助吗？需要深入哪个方向？`};function N(t){return t.replace(/```(\w*)\n([\s\S]*?)```/g,'<pre class="tutor-code"><code>$2</code></pre>').replace(/### (.*?)(\n|$)/g,'<h3 class="tutor-h3">$1</h3>').replace(/## (.*?)(\n|$)/g,'<h2 class="tutor-h2">$1</h2>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/> (.*?)(\n|$)/g,"<blockquote>$1</blockquote>").replace(/\| (.+?) \| (.+?) \| (.+?) \|/g,(o,u,h,m)=>u.includes("---")?"":`<div class="tutor-table-row"><span>${u}</span><span>${h}</span><span>${m}</span></div>`).replace(/\n/g,"<br/>")}function w(){if(!r.value.trim())return;const t=r.value,o=new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"}),u=H[i.value](t);b.value.push({q:t,a:u,time:o,mode:i.value}),r.value=""}function T(t){i.value=t}function x(t,o){b.value[t]&&(b.value[t].helpful=o)}function V(t){r.value=t,w()}return(t,o)=>{var u,h,m,z,A;return l(),a("div",ss,[o[13]||(o[13]=s("div",{class:"page-header reveal"},[s("h1",{class:"page-title"},"智能辅导"),s("p",{class:"page-desc"},"7×24 即时答疑，多模态深度讲解，让学习事半功倍")],-1)),s("div",es,[s("div",os,[s("div",ts,[(l(),a(p,null,_(d,e=>s("button",{key:e.key,class:v(["mode-tab",{active:i.value===e.key}]),style:q({"--tab-color":e.color}),onClick:c=>T(e.key)},[s("span",ns,[(l(),f(y(e.icon),{size:20,"stroke-width":"1.5",style:{color:"var(--tab-color)"}}))]),s("div",as,[s("span",is,n(e.label),1),s("span",cs,n(e.desc),1)])],14,ls)),64))]),b.value.length>0?(l(),a("div",rs,[(l(!0),a(p,null,_(b.value,(e,c)=>(l(),a("div",{key:c,class:"qa-pair reveal"},[s("div",ds,[o[2]||(o[2]=s("span",{class:"bubble-icon bubble-q"},"Q",-1)),s("span",us,n(e.q),1),s("span",ps,n(e.time),1)]),s("div",_s,[o[6]||(o[6]=s("span",{class:"bubble-icon bubble-a"},"A",-1)),s("div",{class:"answer-content",innerHTML:N(e.a)},null,8,vs),s("div",bs,[s("div",ks,[o[5]||(o[5]=s("span",{class:"feedback-label"},"这个回答有帮助吗？",-1)),s("button",{class:v(["feedback-btn",{active:e.helpful===!0}]),onClick:M=>x(c,!0),"aria-label":"标记为有帮助"},[$(S(O),{size:14,"stroke-width":"1.5"}),o[3]||(o[3]=C(" 有帮助 ",-1))],10,hs),s("button",{class:v(["feedback-btn",{active:e.helpful===!1}]),onClick:M=>x(c,!1),"aria-label":"标记为需要改进"},[$(S(W),{size:14,"stroke-width":"1.5"}),o[4]||(o[4]=C(" 需要改进 ",-1))],10,ms)])])])]))),128))])):(l(),a("div",fs,[s("div",ys,[(l(),f(y((u=d.find(e=>e.key===i.value))==null?void 0:u.icon),{size:36,"stroke-width":"1",class:"empty-icon"})),o[7]||(o[7]=s("div",{class:"empty-ring"},null,-1))]),s("h3",null,n((h=d.find(e=>e.key===i.value))==null?void 0:h.label),1),s("p",null,n((m=d.find(e=>e.key===i.value))==null?void 0:m.desc),1),s("div",gs,[(l(),a(p,null,_(P,e=>s("div",{key:e.label,class:"topic-group",style:q({"--group-color":e.color})},[s("div",ws,[s("span",Cs,[(l(),f(y(e.icon),{size:16,"stroke-width":"1.5",style:{color:"var(--group-color)"}}))]),s("span",$s,n(e.label),1)]),s("div",qs,[(l(!0),a(p,null,_(e.questions,c=>(l(),a("button",{key:c,class:"topic-item",onClick:M=>V(c)},[s("span",null,n(c),1),o[8]||(o[8]=s("span",{class:"topic-arrow"},"→",-1))],8,Ts))),128))])],4)),64))])])),s("div",xs,[s("div",zs,n((z=d.find(e=>e.key===i.value))==null?void 0:z.label)+" 模式 ",1),s("div",As,[E(s("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>r.value=e),type:"text",placeholder:`在${(A=d.find(e=>e.key===i.value))==null?void 0:A.label}模式下输入你的问题...`,onKeydown:Q(w,["enter"])},null,40,Ms),[[K,r.value]]),s("button",{class:"ask-btn",onClick:w,disabled:!r.value.trim()},[...o[9]||(o[9]=[s("span",null,"提问",-1),s("span",{class:"ask-arrow"},"→",-1)])],8,Ss)])])]),s("aside",Ds,[s("div",Ps,[o[10]||(o[10]=s("h3",null,"切换模式",-1)),s("div",Bs,[(l(),a(p,null,_(d,e=>s("button",{key:e.key,class:v(["mode-item",{active:i.value===e.key}]),style:q({"--mode-color":e.color}),onClick:c=>T(e.key)},[s("span",{class:v(["mode-item-icon",{active:i.value===e.key}])},[(l(),f(y(e.icon),{size:16,"stroke-width":"1.5"}))],2),s("div",Ns,[s("span",Vs,n(e.label),1),s("span",Fs,n(e.desc),1)])],14,Hs)),64))])]),s("div",Ls,[s("div",Is,[o[11]||(o[11]=s("h3",null,"历史记录",-1)),s("button",{class:"sessions-toggle",onClick:o[1]||(o[1]=e=>k.value=!k.value)},[C(n(k.value?"收起":"展开")+" ",1),s("span",{class:v(["sessions-arrow",{open:k.value}])},"▾",2)])]),$(j,{name:"slide-up"},{default:U(()=>[k.value?(l(),a("div",Es,[(l(),a(p,null,_(B,e=>s("button",{key:e.title,class:"session-item"},[s("div",Ks,[s("span",Qs,n(e.title),1),s("span",Us,n(e.count)+" 条对话 · "+n(e.date),1)]),o[12]||(o[12]=s("span",{class:"session-arrow"},"→",-1))])),64))])):X("",!0)]),_:1})])])])])}}}),Zs=Y(js,[["__scopeId","data-v-d646789c"]]);export{Zs as default};
