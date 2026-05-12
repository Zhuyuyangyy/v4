import{c as h,d as P,i as d,a as l,b as t,n as _,p as i,f as o,q as m,T as j,w as B,S as U,t as k,s as z,J as T,v as q,e as H,j as n,F as J,r as W,_ as X}from"./index-UowooDY3.js";import{P as $}from"./play-7hUBBQE_.js";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=h("file-code",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=h("image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=h("pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=h("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=h("terminal",[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=h("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Y={class:"code-canvas"},Z={class:"cc-toolbar"},ee={class:"cc-toolbar-left"},te={key:0,class:"cc-dot"},se={key:0,class:"cc-examples-wrapper"},ae={key:0,class:"cc-examples-dropdown"},le=["onClick"],ne={class:"cei-title"},ie={class:"cei-desc"},oe={class:"cc-toolbar-right"},ce=["disabled"],ue={class:"cc-body"},de={class:"cc-editor"},re={key:0,class:"cc-screenshot-overlay"},ve=["src"],pe={key:0,class:"cc-drawing-canvas"},me={class:"cc-screenshot-label"},ke={class:"cc-output"},fe={key:0,class:"cc-output-loading"},he={key:1,class:"cc-output-text"},ye={key:2,class:"cc-output-empty"},be={class:"cc-statusbar"},ge={class:"cc-lang"},xe={class:"cc-lines"},we={key:0,class:"cc-sep"},Ce={key:1,class:"cc-example-name"},_e=P({__name:"CodeCanvas",props:{examples:{},initialCode:{},language:{}},emits:["explain"],setup(y,{emit:I}){const C=y,L=I,s=d(C.initialCode??`# 在这里输入你的代码
print("Hello EduMind!")`),p=d(""),b=d(!1),c=d("editor"),g=d(!1),x=d(null),w=d(!1),M=d(null),f=d(null);function R(){if(!s.value.trim())return;b.value=!0,p.value="",c.value="preview",s.value.split(`
`);const r=[...s.value.matchAll(/print\((.*?)\)/g)];s.value.match(/error|raise|bug/i),setTimeout(()=>{let e="";if(r.length>0)for(const a of r)try{const u=a[1].replace(/^["']|["']$/g,"");e+=`${u}
`}catch{e+=`${a[1]}
`}else s.value.includes("import")&&s.value.includes("pandas")?e=`DataFrame shape: (1000, 8)
   age  income  score
0   25    5000   85.5
1   30    8000   90.2
2   22    3000   78.0
...`:s.value.includes("import")&&s.value.includes("sklearn")?e=`Model accuracy: 0.9567
Confusion Matrix:
[[32  1]
 [ 2  35]]`:s.value.includes("def ")&&s.value.includes("return")?e=`Function defined successfully ✓
Test result: 42`:e=`✓ 代码执行完成
（模拟运行环境，输出仅供参考）`;p.value=e,b.value=!1},600+Math.random()*400)}function V(){f.value?s.value=f.value.code:C.initialCode?s.value=C.initialCode:s.value=`# 在这里输入你的代码
print("Hello EduMind!")`,p.value="",c.value="editor"}function A(r){f.value=r,s.value=r.code,p.value="",c.value="editor",g.value=!1}function D(r){var u;const a=(u=r.target.files)==null?void 0:u[0];if(a)if(a.type.startsWith("image/")){const v=new FileReader;v.onload=()=>{x.value=v.result},v.readAsDataURL(a)}else{const v=new FileReader;v.onload=()=>{s.value=v.result},v.readAsText(a)}}function S(){x.value=null}function N(){L("explain",s.value)}return(r,e)=>(n(),l("div",Y,[t("div",Z,[t("div",ee,[t("button",{class:_(["cc-tab",{active:c.value==="editor"}]),onClick:e[0]||(e[0]=a=>c.value="editor")},[i(o(F),{size:14,"stroke-width":"1.5"}),e[6]||(e[6]=t("span",null,"代码",-1))],2),t("button",{class:_(["cc-tab",{active:c.value==="preview"}]),onClick:e[1]||(e[1]=a=>c.value="preview")},[i(o(O),{size:14,"stroke-width":"1.5"}),e[7]||(e[7]=t("span",null,"运行结果",-1)),p.value?(n(),l("span",te)):m("",!0)],2),e[9]||(e[9]=t("div",{class:"cc-divider"},null,-1)),y.examples&&y.examples.length>0?(n(),l("div",se,[t("button",{class:"cc-btn cc-examples-btn",onClick:e[2]||(e[2]=a=>g.value=!g.value)},[i(o(F),{size:13,"stroke-width":"1.5"}),e[8]||(e[8]=t("span",null,"示例代码",-1))]),i(j,{name:"fade"},{default:B(()=>[g.value?(n(),l("div",ae,[(n(!0),l(J,null,W(y.examples,(a,u)=>(n(),l("button",{key:u,class:"cc-example-item",onClick:v=>A(a)},[t("span",ne,k(a.title),1),t("span",ie,k(a.description),1)],8,le))),128))])):m("",!0)]),_:1})])):m("",!0)]),t("div",oe,[t("button",{class:"cc-btn",title:"上传截图",onClick:e[3]||(e[3]=a=>{var u;return(u=M.value)==null?void 0:u.click()})},[i(o(E),{size:13,"stroke-width":"1.5"})]),t("input",{ref_key:"fileInput",ref:M,type:"file",accept:"image/*,.py,.txt,.js,.ts",style:{display:"none"},onChange:D},null,544),t("button",{class:_(["cc-btn",{active:w.value}]),title:"涂鸦标注",onClick:e[4]||(e[4]=a=>w.value=!w.value)},[i(o(G),{size:13,"stroke-width":"1.5"})],2),t("button",{class:"cc-btn cc-explain-btn",title:"AI 解释代码",onClick:N},[i(o(U),{size:13,"stroke-width":"1.5"}),e[10]||(e[10]=t("span",null,"解释代码",-1))]),e[11]||(e[11]=t("div",{class:"cc-divider"},null,-1)),t("button",{class:"cc-btn",title:"重置代码",onClick:V},[i(o(K),{size:13,"stroke-width":"1.5"})]),t("button",{class:"cc-btn cc-run-btn",disabled:b.value,onClick:R},[i(o($),{size:13,"stroke-width":"1.5"}),t("span",null,k(b.value?"运行中...":"运行"),1)],8,ce)])]),t("div",ue,[z(t("div",de,[z(t("textarea",{"onUpdate:modelValue":e[5]||(e[5]=a=>s.value=a),class:"cc-textarea",spellcheck:"false",wrap:"off"},null,512),[[q,s.value]]),x.value?(n(),l("div",re,[t("img",{src:x.value,alt:"截图",class:"cc-screenshot-img"},null,8,ve),w.value?(n(),l("div",pe)):m("",!0),t("button",{class:"cc-screenshot-close",onClick:S},[i(o(Q),{size:14,"stroke-width":"1.5"})]),t("div",me,[i(o(E),{size:12,"stroke-width":"1.5"}),e[12]||(e[12]=H(" 截图参考 ",-1))])])):m("",!0)],512),[[T,c.value==="editor"]]),z(t("div",ke,[b.value?(n(),l("div",fe,[...e[13]||(e[13]=[t("div",{class:"cc-spinner"},null,-1),t("span",null,"执行中...",-1)])])):p.value?(n(),l("pre",he,k(p.value),1)):(n(),l("div",ye,[i(o($),{size:24,"stroke-width":"1"}),e[14]||(e[14]=t("span",null,"点击「运行」查看结果",-1))]))],512),[[T,c.value==="preview"]])]),t("div",be,[t("span",ge,k(y.language??"python"),1),e[15]||(e[15]=t("span",{class:"cc-sep"},"|",-1)),t("span",xe,k(s.value.split(`
`).length)+" 行",1),f.value?(n(),l("span",we,"|")):m("",!0),f.value?(n(),l("span",Ce,k(f.value.title),1)):m("",!0)])]))}}),Te=X(_e,[["__scopeId","data-v-1b899877"]]);export{Te as C,K as R};
