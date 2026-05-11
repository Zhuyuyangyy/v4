import{h as w,o as A,a as q,d as V,c as p,b as e,n as r,e as y,u as M,F as m,r as g,f as x,g as I,i as L,j as c,t as v,k as b,l as B,m as E,_ as S}from"./index-r_32d53y.js";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=l=>{for(const t in l)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l=>l==="";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(...l)=>l.filter((t,o,i)=>!!t&&t.trim()!==""&&i.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=l=>l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=l=>l.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,i)=>i?i.toUpperCase():o.toLowerCase());/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=l=>{const t=z(l);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=({name:l,iconNode:t,absoluteStrokeWidth:o,"absolute-stroke-width":i,strokeWidth:d,"stroke-width":u,size:h=f.width,color:_=f.stroke,...s},{slots:a})=>w("svg",{...f,...s,width:h,height:h,stroke:_,"stroke-width":$(o)||$(i)||o===!0||i===!0?Number(d||u||f["stroke-width"])*24/Number(h):d||u||f["stroke-width"],class:j("lucide",s.class,...l?[`lucide-${C(T(l))}-icon`,`lucide-${C(l)}`]:["lucide-icon"]),...!a.default&&!O(s)&&{"aria-hidden":"true"}},[...t.map(n=>w(...n)),...a.default?[a.default()]:[]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(l,t)=>(o,{slots:i,attrs:d})=>w(D,{...d,...o,iconNode:t,name:l},i);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=k("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=k("chart-no-axes-column",[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=k("clipboard-check",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=k("map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=k("sliders-vertical",[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=k("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);function Z(l=.1){let t=null;function o(){document.querySelectorAll(".reveal").forEach(d=>t==null?void 0:t.observe(d))}A(()=>{t=new IntersectionObserver(d=>{d.forEach(u=>{u.isIntersecting&&(u.target.classList.add("visible"),t==null||t.unobserve(u.target))})},{threshold:l,rootMargin:"0px 0px -80px 0px"}),o(),new MutationObserver(()=>{o()}).observe(document.getElementById("app"),{childList:!0,subtree:!0})}),q(()=>{t==null||t.disconnect()})}const Q={class:"welcome"},G={class:"hero"},J={class:"hero-content"},X={class:"stat-icon"},Y={class:"stat-value"},K={class:"stat-label"},W={class:"hero-particles"},ee={class:"features"},se={class:"features-grid"},te={class:"card-image-wrapper"},ae=["src","alt"],le={class:"card-title"},ne={class:"card-desc"},oe={class:"learning-path"},ie={class:"lp-card"},de={class:"lp-timeline"},re={class:"lp-timeline-track"},ce={class:"lp-timeline-nodes"},ue={class:"lp-node-num"},pe={class:"lp-node-title"},ve={class:"lp-icons-row"},he={class:"lp-icon-container"},me={class:"lp-desc-row"},ge=["innerHTML"],ye={class:"quick-start"},ke={class:"questions-grid"},fe={class:"question-text"},be=V({__name:"Welcome",setup(l){const t=I(),o=L(!1);Z(.12);const i=[{image:"/shouye-background-tubiao-1.png",title:"AI 智能推荐",desc:"基于学习行为和能力画像，为你推荐最合适的内容"},{image:"/shouye-background-tubiao-2.png",title:"个性化学习",desc:"量身定制学习路径，因材施教，精准提升"},{image:"/shouye-background-tubiao-3.png",title:"AI 导师陪伴",desc:"7×24 小时在线辅导，随时解答学习问题"},{image:"/shouye-background-tubiao-4.png",title:"多模态内容",desc:"视频、音频、图文、互动，多种形式激发学习"},{image:"/shouye-background-tubiao-5.png",title:"学练测评一体化",desc:"学习 - 练习 - 测评 - 反馈，闭环学习更高效"},{image:"/shouye-background-tubiao-6.png",title:"数据驱动成长",desc:"学习数据可视化，成长轨迹清晰可见"}],d=["帮我制定一份 Python 机器学习的学习计划","解释一下微积分中的泰勒展开","为我生成一组数据结构练习题","分析我的学习薄弱点"],u=[{value:"150万+",label:"学习者加入",icon:"◎"},{value:"3000+",label:"精品课程",icon:"▣"},{value:"98.7%",label:"学习效果提升",icon:"⇲"},{value:"1000+",label:"合作院校机构",icon:"⊕"}],h=[{num:"01",title:"目标设定",color:"#00d2ff",icon:F,desc:"明确目标，制定计划"},{num:"02",title:"能力评估",color:"#009dff",icon:P,desc:"多维测评，定位短板"},{num:"03",title:"路径规划",color:"#3859ff",icon:R,desc:"AI推荐，最优路径"},{num:"04",title:"学习执行",color:"#7e3aff",icon:N,desc:"沉浸学习，掌握知识"},{num:"05",title:"阶段测评",color:"#c42bff",icon:H,desc:"阶段测评，查漏补缺"},{num:"06",title:"调整优化",color:"#ff2a9d",icon:U,desc:"数据驱动，动态调整"}];return A(()=>{setTimeout(()=>{o.value=!0},100)}),(_,s)=>(c(),p("div",Q,[e("section",G,[s[8]||(s[8]=e("div",{class:"hero-bg-glow"},null,-1)),e("div",J,[e("div",{class:r(["hero-badge",{visible:o.value}])},[...s[3]||(s[3]=[e("span",{class:"badge-dot"},null,-1),y(" AI × 教育 让学习更高效 ",-1)])],2),e("h1",{class:r(["hero-title",{visible:o.value}])},[...s[4]||(s[4]=[e("span",{class:"title-line"},"探索知识宇宙",-1),e("span",{class:"title-line"},[y("成就"),e("span",{class:"text-gradient"},"无限可能")],-1)])],2),e("p",{class:r(["hero-sub",{visible:o.value}])},[...s[5]||(s[5]=[y(" AI 驱动的个性化学习平台，连接优质内容与先进技术，",-1),e("br",null,null,-1),y(" 激发每一个学习者的潜能，面向未来，全面成长。 ",-1)])],2),e("div",{class:r(["hero-actions",{visible:o.value}])},[e("button",{class:"btn-primary",onClick:s[0]||(s[0]=a=>M(t).push("/chat"))},[...s[6]||(s[6]=[y(" 开始免费学习 ",-1),e("span",{class:"btn-arrow"},"→",-1)])]),e("button",{class:"btn-ghost",onClick:s[1]||(s[1]=a=>M(t).push("/profile"))},[...s[7]||(s[7]=[y(" 了解平台优势 ",-1),e("span",{class:"btn-icon"},"↗",-1)])])],2),e("div",{class:r(["hero-stats",{visible:o.value}])},[(c(),p(m,null,g(u,(a,n)=>e("div",{key:n,class:"stat-item"},[e("span",X,v(a.icon),1),e("span",Y,v(a.value),1),e("span",K,v(a.label),1)])),64))],2)]),e("div",W,[(c(),p(m,null,g(20,a=>e("span",{key:a,class:"particle",style:b({left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*5}s`,animationDuration:`${3+Math.random()*4}s`,width:`${2+Math.random()*4}px`,height:`${2+Math.random()*4}px`,opacity:.3+Math.random()*.5})},null,4)),64))])]),e("section",ee,[s[9]||(s[9]=x('<div class="section-header reveal" data-v-9f94d73e><h2 class="section-title" data-v-9f94d73e>我们的平台优势</h2><div class="section-divider" data-v-9f94d73e><span class="divider-dot" data-v-9f94d73e></span><span class="divider-line" data-v-9f94d73e></span><span class="divider-dot" data-v-9f94d73e></span></div></div>',1)),e("div",se,[(c(),p(m,null,g(i,(a,n)=>e("div",{key:a.title,class:r(["feature-card reveal",`reveal-delay-${n+1}`])},[e("div",te,[e("img",{src:a.image,alt:a.title,class:"card-image"},null,8,ae)]),e("h3",le,v(a.title),1),e("p",ne,v(a.desc),1)],2)),64))])]),e("section",oe,[s[14]||(s[14]=x('<div class="lp-bg-stars" data-v-9f94d73e></div><div class="lp-bg-line-1" data-v-9f94d73e></div><div class="lp-bg-line-2" data-v-9f94d73e></div><div class="lp-bg-grid" data-v-9f94d73e></div><div class="lp-bg-planet-large" data-v-9f94d73e></div><div class="lp-bg-planet-ring" data-v-9f94d73e></div>',6)),e("div",ie,[s[13]||(s[13]=e("div",{class:"lp-header reveal"},[e("h2",{class:"lp-title"},"个性化学习路径"),e("p",{class:"lp-subtitle"},"从目标到掌握，步步精准"),e("div",{class:"lp-divider"})],-1)),e("div",de,[e("div",re,[s[10]||(s[10]=e("div",{class:"lp-timeline-line"},null,-1)),e("div",ce,[(c(),p(m,null,g(h,(a,n)=>e("div",{key:`node-${n}`,class:r(["lp-node reveal",`reveal-delay-${n+1}`]),style:b({"--node-index":n})},[e("span",ue,v(a.num),1),e("span",pe,v(a.title),1),e("div",{class:"lp-node-dot",style:b({"--dot-color":a.color})},null,4)],6)),64))])]),e("div",ve,[(c(),p(m,null,g(h,(a,n)=>e("div",{key:`icon-${n}`,class:r(["lp-icon-wrapper reveal",`reveal-delay-${n+1}`]),style:b({"--icon-color":a.color,"--node-index":n})},[e("div",he,[s[11]||(s[11]=e("div",{class:"lp-icon-bg"},null,-1)),s[12]||(s[12]=e("div",{class:"lp-icon-ring lp-ring-pulse"},null,-1)),(c(),B(E(a.icon),{class:"lp-icon","stroke-width":"1.5"}))])],6)),64))]),e("div",me,[(c(),p(m,null,g(h,(a,n)=>e("div",{key:`desc-${n}`,class:r(["lp-desc reveal",`reveal-delay-${n+1}`]),innerHTML:a.desc},null,10,ge)),64))])])])]),e("section",ye,[s[17]||(s[17]=e("div",{class:"section-header reveal"},[e("h2",{class:"section-title"},"快速开始"),e("p",{class:"section-desc"},"选择一个问题，立即开启对话")],-1)),e("div",ke,[(c(),p(m,null,g(d,(a,n)=>e("button",{key:n,class:r(["question-card reveal",`reveal-delay-${n+1}`]),onClick:s[2]||(s[2]=Me=>M(t).push("/chat"))},[s[15]||(s[15]=e("span",{class:"question-icon"},"↗",-1)),e("span",fe,v(a),1),s[16]||(s[16]=e("span",{class:"question-arrow"},"→",-1))],2)),64))])]),s[18]||(s[18]=e("footer",{class:"footer reveal"},[e("p",null,"EduMind — Personalized Learning Multi-Agent System")],-1))]))}}),_e=S(be,[["__scopeId","data-v-9f94d73e"]]);export{_e as default};
