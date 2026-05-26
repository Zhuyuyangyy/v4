var qf=Object.defineProperty;var Yf=(s,e,t)=>e in s?qf(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var rt=(s,e,t)=>Yf(s,typeof e!="symbol"?e+"":e,t);import{E as $f,i as Ke,G as ld,z as yt,d as bs,j as ke,a as We,b as X,g as jf,k as hs,t as je,q as Yt,e as Kf,p as pi,T as gs,w as vs,F as xs,r as nr,n as xi,_ as pr,l as mo,f as vi,H as ra,s as Zf,v as Jf,x as aa,D as Du,o as Qf,I as ep}from"./index-Q_FccUE5.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ac="184",tp=0,Lu=1,np=2,Ga=1,ip=2,Ar=3,Si=0,un=1,Un=2,ii=0,Hi=1,Bn=2,Iu=3,Uu=4,sp=5,os=100,rp=101,ap=102,op=103,lp=104,cp=200,up=201,hp=202,dp=203,xl=204,Ml=205,fp=206,pp=207,mp=208,_p=209,gp=210,vp=211,xp=212,Mp=213,yp=214,yl=0,Sl=1,bl=2,ir=3,El=4,Tl=5,wl=6,Al=7,Cc=0,Sp=1,bp=2,si=0,Rc=1,Pc=2,Dc=3,_o=4,Lc=5,Ic=6,Uc=7,cd=300,Ms=301,sr=302,Ha=303,Ao=304,go=306,Qa=1e3,Nn=1001,Cl=1002,jt=1003,Ep=1004,oa=1005,Dt=1006,Co=1007,Fi=1008,Sn=1009,ud=1010,hd=1011,Or=1012,Nc=1013,ri=1014,En=1015,Kt=1016,Fc=1017,Oc=1018,Br=1020,dd=35902,fd=35899,pd=1021,md=1022,Wn=1023,bi=1026,cs=1027,_d=1028,Bc=1029,ys=1030,zc=1031,kc=1033,Wa=33776,Xa=33777,qa=33778,Ya=33779,Rl=35840,Pl=35841,Dl=35842,Ll=35843,Il=36196,Ul=37492,Nl=37496,Fl=37488,Ol=37489,eo=37490,Bl=37491,zl=37808,kl=37809,Vl=37810,Gl=37811,Hl=37812,Wl=37813,Xl=37814,ql=37815,Yl=37816,$l=37817,jl=37818,Kl=37819,Zl=37820,Jl=37821,Ql=36492,ec=36494,tc=36495,nc=36283,ic=36284,to=36285,sc=36286,Tp=3200,no=0,wp=1,Jn="",on="srgb",zr="srgb-linear",io="linear",et="srgb",Rs=7680,Nu=519,Ap=512,Cp=513,Rp=514,Vc=515,Pp=516,Dp=517,Gc=518,Lp=519,rc=35044,Fu="300 es",ti=2e3,kr=2001;function Ip(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Vr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Up(){const s=Vr("canvas");return s.style.display="block",s}const Ou={};function so(...s){const e="THREE."+s.shift();console.log(e,...s)}function gd(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ae(...s){s=gd(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function $e(...s){s=gd(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ac(...s){const e=s.join(" ");e in Ou||(Ou[e]=!0,Ae(...s))}function Np(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Fp={[yl]:Sl,[bl]:wl,[El]:Al,[ir]:Tl,[Sl]:yl,[wl]:bl,[Al]:El,[Tl]:ir};class Es{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bu=1234567;const Dr=Math.PI/180,Gr=180/Math.PI;function Mi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[s&255]+Qt[s>>8&255]+Qt[s>>16&255]+Qt[s>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function Le(s,e,t){return Math.max(e,Math.min(t,s))}function Hc(s,e){return(s%e+e)%e}function Op(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Bp(s,e,t){return s!==e?(t-s)/(e-s):0}function Lr(s,e,t){return(1-t)*s+t*e}function zp(s,e,t,n){return Lr(s,e,1-Math.exp(-t*n))}function kp(s,e=1){return e-Math.abs(Hc(s,e*2)-e)}function Vp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Gp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Hp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Wp(s,e){return s+Math.random()*(e-s)}function Xp(s){return s*(.5-Math.random())}function qp(s){s!==void 0&&(Bu=s);let e=Bu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yp(s){return s*Dr}function $p(s){return s*Gr}function jp(s){return(s&s-1)===0&&s!==0}function Kp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Zp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Jp(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,l*h,l*d,o*c);break;case"YZY":s.set(l*d,o*u,l*h,o*c);break;case"ZXZ":s.set(l*h,l*d,o*u,o*c);break;case"XZX":s.set(o*u,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*u,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*u,o*c);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Gn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function tt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Qp={DEG2RAD:Dr,RAD2DEG:Gr,generateUUID:Mi,clamp:Le,euclideanModulo:Hc,mapLinear:Op,inverseLerp:Bp,lerp:Lr,damp:zp,pingpong:kp,smoothstep:Vp,smootherstep:Gp,randInt:Hp,randFloat:Wp,randFloatSpread:Xp,seededRandom:qp,degToRad:Yp,radToDeg:$p,isPowerOfTwo:jp,ceilPowerOfTwo:Kp,floorPowerOfTwo:Zp,setQuaternionFromProperEuler:Jp,normalize:tt,denormalize:Gn},vu=class vu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Le(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vu.prototype.isVector2=!0;let we=vu;class mr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(h!==_||l!==d||c!==f||u!==g){let p=l*d+c*f+u*g+h*_;p<0&&(d=-d,f=-f,g=-g,_=-_,p=-p);let m=1-o;if(p<.9995){const x=Math.acos(p),S=Math.sin(x);m=Math.sin(m*x)/S,o=Math.sin(o*x)/S,l=l*m+d*o,c=c*m+f*o,u=u*m+g*o,h=h*m+_*o}else{l=l*m+d*o,c=c*m+f*o,u=u*m+g*o,h=h*m+_*o;const x=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=x,c*=x,u*=x,h*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Le(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-r*l,this._y=i*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const xu=class xu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=i+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this.z=Le(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this.z=Le(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ro.copy(this).projectOnVector(e),this.sub(Ro)}reflect(e){return this.sub(Ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Le(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xu.prototype.isVector3=!0;let I=xu;const Ro=new I,zu=new mr,Mu=class Mu{constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],x=i[1],S=i[4],b=i[7],A=i[2],T=i[5],w=i[8];return r[0]=a*_+o*x+l*A,r[3]=a*p+o*S+l*T,r[6]=a*m+o*b+l*w,r[1]=c*_+u*x+h*A,r[4]=c*p+u*S+h*T,r[7]=c*m+u*b+h*w,r[2]=d*_+f*x+g*A,r[5]=d*p+f*S+g*T,r[8]=d*m+f*b+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,g=t*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(u*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Po.makeScale(e,t)),this}rotate(e){return this.premultiply(Po.makeRotation(-e)),this}translate(e,t){return this.premultiply(Po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Mu.prototype.isMatrix3=!0;let Ne=Mu;const Po=new Ne,ku=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vu=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function em(){const s={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(i.r=Js(i.r),i.g=Js(i.g),i.b=Js(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Jn?io:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ac("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ac("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[zr]:{primaries:e,whitePoint:n,transfer:io,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:e,whitePoint:n,transfer:et,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),s}const Ye=em();function yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Js(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ps;class tm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ps===void 0&&(Ps=Vr("canvas")),Ps.width=e.width,Ps.height=e.height;const i=Ps.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ps}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yi(t[n]/255)*255):t[n]=yi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nm=0;class Wc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=Mi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Do(i[a].image)):r.push(Do(i[a]))}else r=Do(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Do(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?tm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let im=0;const Lo=new I;class Vt extends Es{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=Nn,i=Nn,r=Dt,a=Fi,o=Wn,l=Sn,c=Vt.DEFAULT_ANISOTROPY,u=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Mi(),this.name="",this.source=new Wc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lo).x}get height(){return this.source.getSize(Lo).y}get depth(){return this.source.getSize(Lo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qa:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Cl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qa:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Cl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=cd;Vt.DEFAULT_ANISOTROPY=1;const yu=class yu{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,b=(f+1)/2,A=(m+1)/2,T=(u+d)/4,w=(h+_)/4,v=(g+p)/4;return S>b&&S>A?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=T/n,r=w/n):b>A?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=T/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=w/r,i=v/r),this.set(n,i,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(h-_)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this.z=Le(this.z,e.z,t.z),this.w=Le(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this.z=Le(this.z,e,t),this.w=Le(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yu.prototype.isVector4=!0;let ut=yu;class sm extends Es{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Vt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Wc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hn extends sm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class vd extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class rm extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const po=class po{constructor(e,t,n,i,r,a,o,l,c,u,h,d,f,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,u,h,d,f,g,_,p)}set(e,t,n,i,r,a,o,l,c,u,h,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new po().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ds.setFromMatrixColumn(e,0).length(),r=1/Ds.setFromMatrixColumn(e,1).length(),a=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(am,e,om)}lookAt(e,t,n){const i=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Pi.crossVectors(n,xn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Pi.crossVectors(n,xn)),Pi.normalize(),la.crossVectors(xn,Pi),i[0]=Pi.x,i[4]=la.x,i[8]=xn.x,i[1]=Pi.y,i[5]=la.y,i[9]=xn.y,i[2]=Pi.z,i[6]=la.z,i[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],x=n[3],S=n[7],b=n[11],A=n[15],T=i[0],w=i[4],v=i[8],M=i[12],P=i[1],R=i[5],D=i[9],z=i[13],O=i[2],L=i[6],N=i[10],k=i[14],K=i[3],J=i[7],te=i[11],_e=i[15];return r[0]=a*T+o*P+l*O+c*K,r[4]=a*w+o*R+l*L+c*J,r[8]=a*v+o*D+l*N+c*te,r[12]=a*M+o*z+l*k+c*_e,r[1]=u*T+h*P+d*O+f*K,r[5]=u*w+h*R+d*L+f*J,r[9]=u*v+h*D+d*N+f*te,r[13]=u*M+h*z+d*k+f*_e,r[2]=g*T+_*P+p*O+m*K,r[6]=g*w+_*R+p*L+m*J,r[10]=g*v+_*D+p*N+m*te,r[14]=g*M+_*z+p*k+m*_e,r[3]=x*T+S*P+b*O+A*K,r[7]=x*w+S*R+b*L+A*J,r[11]=x*v+S*D+b*N+A*te,r[15]=x*M+S*z+b*k+A*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15],x=l*f-c*d,S=o*f-c*h,b=o*d-l*h,A=a*f-c*u,T=a*d-l*u,w=a*h-o*u;return t*(_*x-p*S+m*b)-n*(g*x-p*A+m*T)+i*(g*S-_*A+m*w)-r*(g*b-_*T+p*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],x=t*o-n*a,S=t*l-i*a,b=t*c-r*a,A=n*l-i*o,T=n*c-r*o,w=i*c-r*l,v=u*_-h*g,M=u*p-d*g,P=u*m-f*g,R=h*p-d*_,D=h*m-f*_,z=d*m-f*p,O=x*z-S*D+b*R+A*P-T*M+w*v;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/O;return e[0]=(o*z-l*D+c*R)*L,e[1]=(i*D-n*z-r*R)*L,e[2]=(_*w-p*T+m*A)*L,e[3]=(d*T-h*w-f*A)*L,e[4]=(l*P-a*z-c*M)*L,e[5]=(t*z-i*P+r*M)*L,e[6]=(p*b-g*w-m*S)*L,e[7]=(u*w-d*b+f*S)*L,e[8]=(a*D-o*P+c*v)*L,e[9]=(n*P-t*D-r*v)*L,e[10]=(g*T-_*b+m*x)*L,e[11]=(h*b-u*T-f*x)*L,e[12]=(o*M-a*R-l*v)*L,e[13]=(t*R-n*M+i*v)*L,e[14]=(_*S-g*A-p*x)*L,e[15]=(u*A-h*S+d*x)*L,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,g=r*h,_=a*u,p=a*h,m=o*h,x=l*c,S=l*u,b=l*h,A=n.x,T=n.y,w=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+b)*A,i[2]=(g-S)*A,i[3]=0,i[4]=(f-b)*T,i[5]=(1-(d+m))*T,i[6]=(p+x)*T,i[7]=0,i[8]=(g+S)*w,i[9]=(p-x)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ds.set(i[0],i[1],i[2]).length();const o=Ds.set(i[4],i[5],i[6]).length(),l=Ds.set(i[8],i[9],i[10]).length();r<0&&(a=-a),zn.copy(this);const c=1/a,u=1/o,h=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,t.setFromRotationMatrix(zn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=ti,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===ti)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===kr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=ti,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===ti)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===kr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};po.prototype.isMatrix4=!0;let _t=po;const Ds=new I,zn=new _t,am=new I(0,0,0),om=new I(1,1,1),Pi=new I,la=new I,xn=new I,Gu=new _t,Hu=new mr;class Ei{constructor(e=0,t=0,n=0,i=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Xc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lm=0;const Wu=new I,Ls=new mr,li=new _t,ca=new I,Mr=new I,cm=new I,um=new mr,Xu=new I(1,0,0),qu=new I(0,1,0),Yu=new I(0,0,1),$u={type:"added"},hm={type:"removed"},Is={type:"childadded",child:null},Io={type:"childremoved",child:null};class Gt extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new I,t=new Ei,n=new mr,i=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ne}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Xu,e)}rotateY(e){return this.rotateOnAxis(qu,e)}rotateZ(e){return this.rotateOnAxis(Yu,e)}translateOnAxis(e,t){return Wu.copy(e).applyQuaternion(this.quaternion),this.position.add(Wu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xu,e)}translateY(e){return this.translateOnAxis(qu,e)}translateZ(e){return this.translateOnAxis(Yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ca.copy(e):ca.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Mr,ca,this.up):li.lookAt(ca,Mr,this.up),this.quaternion.setFromRotationMatrix(li),i&&(li.extractRotation(i.matrixWorld),Ls.setFromRotationMatrix(li),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($u),Is.child=e,this.dispatchEvent(Is),Is.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hm),Io.child=e,this.dispatchEvent(Io),Io.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($u),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,cm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,um,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Gt.DEFAULT_UP=new I(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oi extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dm={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(dm)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},ua={h:0,s:0,l:0};function No(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=on){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=Hc(e,1),t=Le(t,0,1),n=Le(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=No(a,r,e+1/3),this.g=No(a,r,e),this.b=No(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,i),this}setStyle(e,t=on){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=on){const n=xd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=on){return Ye.workingToColorSpace(en.copy(this),e),Math.round(Le(en.r*255,0,255))*65536+Math.round(Le(en.g*255,0,255))*256+Math.round(Le(en.b*255,0,255))}getHexString(e=on){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(en.copy(this),t);const n=en.r,i=en.g,r=en.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=on){Ye.workingToColorSpace(en.copy(this),e);const t=en.r,n=en.g,i=en.b;return e!==on?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(ua);const n=Lr(Di.h,ua.h,t),i=Lr(Di.s,ua.s,t),r=Lr(Di.l,ua.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Se;Se.NAMES=xd;class qc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Se(e),this.density=t}clone(){return new qc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class fm extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const kn=new I,ci=new I,Fo=new I,ui=new I,Us=new I,Ns=new I,ju=new I,Oo=new I,Bo=new I,zo=new I,ko=new ut,Vo=new ut,Go=new ut;class Hn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),kn.subVectors(e,t),i.cross(kn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){kn.subVectors(i,t),ci.subVectors(n,t),Fo.subVectors(e,t);const a=kn.dot(kn),o=kn.dot(ci),l=kn.dot(Fo),c=ci.dot(ci),u=ci.dot(Fo),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,g=(a*u-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return ko.setScalar(0),Vo.setScalar(0),Go.setScalar(0),ko.fromBufferAttribute(e,t),Vo.fromBufferAttribute(e,n),Go.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ko,r.x),a.addScaledVector(Vo,r.y),a.addScaledVector(Go,r.z),a}static isFrontFacing(e,t,n,i){return kn.subVectors(n,t),ci.subVectors(e,t),kn.cross(ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),kn.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Hn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Us.subVectors(i,n),Ns.subVectors(r,n),Oo.subVectors(e,n);const l=Us.dot(Oo),c=Ns.dot(Oo);if(l<=0&&c<=0)return t.copy(n);Bo.subVectors(e,i);const u=Us.dot(Bo),h=Ns.dot(Bo);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Us,a);zo.subVectors(e,r);const f=Us.dot(zo),g=Ns.dot(zo);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ns,o);const p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return ju.subVectors(r,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(ju,o);const m=1/(p+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(Us,a).addScaledVector(Ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ji{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Vn):Vn.fromBufferAttribute(r,a),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ha.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ha.copy(n.boundingBox)),ha.applyMatrix4(e.matrixWorld),this.union(ha)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yr),da.subVectors(this.max,yr),Fs.subVectors(e.a,yr),Os.subVectors(e.b,yr),Bs.subVectors(e.c,yr),Li.subVectors(Os,Fs),Ii.subVectors(Bs,Os),Ji.subVectors(Fs,Bs);let t=[0,-Li.z,Li.y,0,-Ii.z,Ii.y,0,-Ji.z,Ji.y,Li.z,0,-Li.x,Ii.z,0,-Ii.x,Ji.z,0,-Ji.x,-Li.y,Li.x,0,-Ii.y,Ii.x,0,-Ji.y,Ji.x,0];return!Ho(t,Fs,Os,Bs,da)||(t=[1,0,0,0,1,0,0,0,1],!Ho(t,Fs,Os,Bs,da))?!1:(fa.crossVectors(Li,Ii),t=[fa.x,fa.y,fa.z],Ho(t,Fs,Os,Bs,da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const hi=[new I,new I,new I,new I,new I,new I,new I,new I],Vn=new I,ha=new ji,Fs=new I,Os=new I,Bs=new I,Li=new I,Ii=new I,Ji=new I,yr=new I,da=new I,fa=new I,Qi=new I;function Ho(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Qi.fromArray(s,r);const o=i.x*Math.abs(Qi.x)+i.y*Math.abs(Qi.y)+i.z*Math.abs(Qi.z),l=e.dot(Qi),c=t.dot(Qi),u=n.dot(Qi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const gi=pm();function pm(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function mm(s){Math.abs(s)>65504&&Ae("DataUtils.toHalfFloat(): Value out of range."),s=Le(s,-65504,65504),gi.floatView[0]=s;const e=gi.uint32View[0],t=e>>23&511;return gi.baseTable[t]+((e&8388607)>>gi.shiftTable[t])}function _m(s){const e=s>>10;return gi.uint32View[0]=gi.mantissaTable[gi.offsetTable[e]+(s&1023)]+gi.exponentTable[e],gi.floatView[0]}class pa{static toHalfFloat(e){return mm(e)}static fromHalfFloat(e){return _m(e)}}const It=new I,ma=new we;let gm=0;class ft extends Es{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==rc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Md extends ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class yd extends ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bt extends ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}const vm=new ji,Sr=new I,Wo=new I;class _r{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);const t=Sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Sr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Wo)),this.expandByPoint(Sr.copy(e.center).sub(Wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xm=0;const Dn=new _t,Xo=new Gt,zs=new I,Mn=new ji,br=new ji,kt=new I;class Lt extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ip(e)?yd:Md)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,n){return Dn.makeTranslation(e,t,n),this.applyMatrix4(Dn),this}scale(e,t,n){return Dn.makeScale(e,t,n),this.applyMatrix4(Dn),this}lookAt(e){return Xo.lookAt(e),Xo.updateMatrix(),this.applyMatrix4(Xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zs).negate(),this.translate(zs.x,zs.y,zs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Mn.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];br.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(Mn.min,br.min),Mn.expandByPoint(kt),kt.addVectors(Mn.max,br.max),Mn.expandByPoint(kt)):(Mn.expandByPoint(br.min),Mn.expandByPoint(br.max))}Mn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)kt.fromBufferAttribute(o,c),l&&(zs.fromBufferAttribute(e,c),kt.add(zs)),i=Math.max(i,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ft(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new I,l[v]=new I;const c=new I,u=new I,h=new I,d=new we,f=new we,g=new we,_=new I,p=new I;function m(v,M,P){c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,P),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,P),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(R),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(R),o[v].add(_),o[M].add(_),o[P].add(_),l[v].add(p),l[M].add(p),l[P].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,M=x.length;v<M;++v){const P=x[v],R=P.start,D=P.count;for(let z=R,O=R+D;z<O;z+=3)m(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new I,b=new I,A=new I,T=new I;function w(v){A.fromBufferAttribute(i,v),T.copy(A);const M=o[v];S.copy(M),S.sub(A.multiplyScalar(A.dot(M))).normalize(),b.crossVectors(T,M);const R=b.dot(l[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,R)}for(let v=0,M=x.length;v<M;++v){const P=x[v],R=P.start,D=P.count;for(let z=R,O=R+D;z<O;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new ft(d,u,h)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rc,this.updateRanges=[],this.version=0,this.uuid=Mi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new I;class Bi{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){so("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Bi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){so("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ym=0;class Ts extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=Hi,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xl,this.blendDst=Ml,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rs,this.stencilZFail=Rs,this.stencilZPass=Rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xl&&(n.blendSrc=this.blendSrc),this.blendDst!==Ml&&(n.blendDst=this.blendDst),this.blendEquation!==os&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Rs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Rs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const di=new I,qo=new I,_a=new I,Ui=new I,Yo=new I,ga=new I,$o=new I;class Yc{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qo.copy(e).add(t).multiplyScalar(.5),_a.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(qo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(_a),o=Ui.dot(this.direction),l=-Ui.dot(_a),c=Ui.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*l-o,d=a*o-l,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(qo).addScaledVector(_a,d),f}intersectSphere(e,t){di.subVectors(e.center,this.origin);const n=di.dot(this.direction),i=di.dot(di)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,n,i,r){Yo.subVectors(t,e),ga.subVectors(n,e),$o.crossVectors(Yo,ga);let a=this.direction.dot($o),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);const l=o*this.direction.dot(ga.crossVectors(Ui,ga));if(l<0)return null;const c=o*this.direction.dot(Yo.cross(Ui));if(c<0||l+c>a)return null;const u=-o*Ui.dot($o);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Hr extends Ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ku=new _t,es=new Yc,va=new _r,Zu=new I,xa=new I,Ma=new I,ya=new I,jo=new I,Sa=new I,Ju=new I,ba=new I;class $t extends Gt{constructor(e=new Lt,t=new Hr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Sa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(jo.fromBufferAttribute(h,e),a?Sa.addScaledVector(jo,u):Sa.addScaledVector(jo.sub(t),u))}t.add(Sa)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(r),es.copy(e.ray).recast(e.near),!(va.containsPoint(es.origin)===!1&&(es.intersectSphere(va,Zu)===null||es.origin.distanceToSquared(Zu)>(e.far-e.near)**2))&&(Ku.copy(r).invert(),es.copy(e.ray).applyMatrix4(Ku),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,es)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),S=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=x,A=S;b<A;b+=3){const T=o.getX(b),w=o.getX(b+1),v=o.getX(b+2);i=Ea(this,m,e,n,c,u,h,T,w,v),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=o.getX(p),S=o.getX(p+1),b=o.getX(p+2);i=Ea(this,a,e,n,c,u,h,x,S,b),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),S=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=x,A=S;b<A;b+=3){const T=b,w=b+1,v=b+2;i=Ea(this,m,e,n,c,u,h,T,w,v),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=p,S=p+1,b=p+2;i=Ea(this,a,e,n,c,u,h,x,S,b),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Sm(s,e,t,n,i,r,a,o){let l;if(e.side===un?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Si,o),l===null)return null;ba.copy(o),ba.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ba);return c<t.near||c>t.far?null:{distance:c,point:ba.clone(),object:s}}function Ea(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,xa),s.getVertexPosition(l,Ma),s.getVertexPosition(c,ya);const u=Sm(s,e,t,n,xa,Ma,ya,Ju);if(u){const h=new I;Hn.getBarycoord(Ju,xa,Ma,ya,h),i&&(u.uv=Hn.getInterpolatedAttribute(i,o,l,c,h,new we)),r&&(u.uv1=Hn.getInterpolatedAttribute(r,o,l,c,h,new we)),a&&(u.normal=Hn.getInterpolatedAttribute(a,o,l,c,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};Hn.getNormal(xa,Ma,ya,d.normal),u.face=d,u.barycoord=h}return u}class Sd extends Vt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=jt,u=jt,h,d){super(null,a,o,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ko=new I,bm=new I,Em=new Ne;class rs{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ko.subVectors(n,t).cross(bm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Ko),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Em.getNormalMatrix(e),i=this.coplanarPoint(Ko).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ts=new _r,Tm=new we(.5,.5),Ta=new I;class $c{constructor(e=new rs,t=new rs,n=new rs,i=new rs,r=new rs,a=new rs){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],g=r[8],_=r[9],p=r[10],m=r[11],x=r[12],S=r[13],b=r[14],A=r[15];if(i[0].setComponents(c-a,f-u,m-g,A-x).normalize(),i[1].setComponents(c+a,f+u,m+g,A+x).normalize(),i[2].setComponents(c+o,f+h,m+_,A+S).normalize(),i[3].setComponents(c-o,f-h,m-_,A-S).normalize(),n)i[4].setComponents(l,d,p,b).normalize(),i[5].setComponents(c-l,f-d,m-p,A-b).normalize();else if(i[4].setComponents(c-l,f-d,m-p,A-b).normalize(),t===ti)i[5].setComponents(c+l,f+d,m+p,A+b).normalize();else if(t===kr)i[5].setComponents(l,d,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(e){ts.center.set(0,0,0);const t=Tm.distanceTo(e.center);return ts.radius=.7071067811865476+t,ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ta.x=i.normal.x>0?e.max.x:e.min.x,Ta.y=i.normal.y>0?e.max.y:e.min.y,Ta.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ta)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rr extends Ts{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qu=new _t,oc=new Yc,wa=new _r,Aa=new I;class Wr extends Gt{constructor(e=new Lt,t=new rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(i),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;Qu.copy(i).invert(),oc.copy(e.ray).applyMatrix4(Qu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);Aa.fromBufferAttribute(h,p),eh(Aa,p,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Aa.fromBufferAttribute(h,g),eh(Aa,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function eh(s,e,t,n,i,r,a){const o=oc.distanceSqToPoint(s);if(o<t){const l=new I;oc.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class bd extends Vt{constructor(e=[],t=Ms,n,i,r,a,o,l,c,u){super(e,t,n,i,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ro extends Vt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ar extends Vt{constructor(e,t,n=ri,i,r,a,o=jt,l=jt,c,u=bi,h=1){if(u!==bi&&u!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,i,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wm extends ar{constructor(e,t=ri,n=Ms,i,r,a=jt,o=jt,l,c=bi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ed extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qr extends Lt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(h,2));function g(_,p,m,x,S,b,A,T,w,v,M){const P=b/w,R=A/v,D=b/2,z=A/2,O=T/2,L=w+1,N=v+1;let k=0,K=0;const J=new I;for(let te=0;te<N;te++){const _e=te*R-z;for(let he=0;he<L;he++){const De=he*P-D;J[_]=De*x,J[p]=_e*S,J[m]=O,c.push(J.x,J.y,J.z),J[_]=0,J[p]=0,J[m]=T>0?1:-1,u.push(J.x,J.y,J.z),h.push(he/w),h.push(1-te/v),k+=1}}for(let te=0;te<v;te++)for(let _e=0;_e<w;_e++){const he=d+_e+L*te,De=d+_e+L*(te+1),Be=d+(_e+1)+L*(te+1),Ce=d+(_e+1)+L*te;l.push(he,De,Ce),l.push(De,Be,Ce),K+=6}o.addGroup(f,K,M),f+=K,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vo extends Lt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const x=m*d-a;for(let S=0;S<c;S++){const b=S*h-r;g.push(b,-x,0),_.push(0,0,1),p.push(S/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const S=x+c*m,b=x+c*(m+1),A=x+1+c*(m+1),T=x+1+c*m;f.push(S,b,T),f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(_,3)),this.setAttribute("uv",new bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.width,e.height,e.widthSegments,e.heightSegments)}}class jc extends Lt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new I,g=new we;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const m=r+p/n*a;f.x=h*Math.cos(m),f.y=h*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let _=0;_<i;_++){const p=_*(n+1);for(let m=0;m<n;m++){const x=m+p,S=x,b=x+n+1,A=x+n+2,T=x+1;o.push(S,b,T),o.push(b,A,T)}}this.setIndex(o),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(c,3)),this.setAttribute("uv",new bt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class js extends Lt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new I,d=new I,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const x=[],S=m/n;let b=0;m===0&&a===0?b=.5/t:m===n&&l===Math.PI&&(b=-.5/t);for(let A=0;A<=t;A++){const T=A/t;h.x=-e*Math.cos(i+T*r)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(i+T*r)*Math.sin(a+S*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),p.push(T+b,1-S),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const S=u[m][x+1],b=u[m][x],A=u[m+1][x],T=u[m+1][x+1];(m!==0||a>0)&&f.push(S,b,T),(m!==n-1||l<Math.PI)&&f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(_,3)),this.setAttribute("uv",new bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Kc extends Lt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],h=[],d=new I,f=new I,g=new I;for(let _=0;_<=n;_++){const p=a+_/n*o;for(let m=0;m<=i;m++){const x=m/i*r;f.x=(e+t*Math.cos(p))*Math.cos(x),f.y=(e+t*Math.cos(p))*Math.sin(x),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),g.subVectors(f,d).normalize(),u.push(g.x,g.y,g.z),h.push(m/i),h.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=i;p++){const m=(i+1)*_+p-1,x=(i+1)*(_-1)+p-1,S=(i+1)*(_-1)+p,b=(i+1)*_+p;l.push(m,x,b),l.push(x,S,b)}this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Am extends Lt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new I,r=new I;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let g=d,_=d+f;g<_;g+=3)for(let p=0;p<3;p++){const m=o.getX(g+p),x=o.getX(g+(p+1)%3);i.fromBufferAttribute(a,m),r.fromBufferAttribute(a,x),th(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,h=3*o+(c+1)%3;i.fromBufferAttribute(a,u),r.fromBufferAttribute(a,h),th(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new bt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function th(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}function or(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(nh(i))i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(nh(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function rn(s){const e={};for(let t=0;t<s.length;t++){const n=or(s[t]);for(const i in n)e[i]=n[i]}return e}function nh(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Cm(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Td(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Ss={clone:or,merge:rn};var Rm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nt extends Ts{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rm,this.fragmentShader=Pm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=Cm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wd extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ad extends Ts{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=no,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zo extends Ad{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Le(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Dm extends Ts{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Se(16777215),this.specular=new Se(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=no,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Cc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lm extends Ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Im extends Ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ir={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(ih(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!ih(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function ih(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Um{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Nm=new Um;class ea{constructor(e){this.manager=e!==void 0?e:Nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ea.DEFAULT_MATERIAL_NAME="__DEFAULT";const fi={};class Fm extends Error{constructor(e,t){super(e),this.response=t}}class Om extends ea{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ir.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(fi[e]!==void 0){fi[e].push({onLoad:t,onProgress:n,onError:i});return}fi[e]=[],fi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=fi[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){x();function x(){h.read().then(({done:S,value:b})=>{if(S)m.close();else{_+=b.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,w=u.length;T<w;T++){const v=u[T];v.onProgress&&v.onProgress(A)}m.enqueue(b),x()}},S=>{m.error(S)})}}});return new Response(p)}else throw new Fm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ir.add(`file:${e}`,c);const u=fi[e];delete fi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=fi[e];if(u===void 0)throw this.manager.itemError(e),c;delete fi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ks=new WeakMap;class Bm extends ea{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ir.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=ks.get(a);h===void 0&&(h=[],ks.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=Vr("img");function l(){u(),t&&t(this);const h=ks.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}ks.delete(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),Ir.remove(`image:${e}`);const d=ks.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(h)}ks.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ir.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class zm extends ea{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new Sd,o=new Om(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(u){i!==void 0?i(u):$e(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Nn,a.wrapT=c.wrapT!==void 0?c.wrapT:Nn,a.magFilter=c.magFilter!==void 0?c.magFilter:Dt,a.minFilter=c.minFilter!==void 0?c.minFilter:Dt,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=Fi),c.mipmapCount===1&&(a.minFilter=Dt),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class km extends ea{constructor(e){super(e)}load(e,t,n,i){const r=new Vt,a=new Bm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Zc extends Gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Vm extends Zc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Jo=new _t,sh=new I,rh=new I;class Gm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $c,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;sh.setFromMatrixPosition(e.matrixWorld),t.position.copy(sh),rh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rh),t.updateMatrixWorld(),Jo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===kr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ca=new I,Ra=new mr,Yn=new I;class Cd extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ca,Ra,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Ra,Yn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ca,Ra,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Ra,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new I,ah=new we,oh=new we;class In extends Cd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gr*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,ah,oh),t.subVectors(oh,ah)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xo extends Cd{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Hm extends Gm{constructor(){super(new xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wm extends Zc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new Hm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Xm extends Zc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class qm extends Lt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Vs=-90,Gs=1;class Ym extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new In(Vs,Gs,e,t);i.layers=this.layers,this.add(i);const r=new In(Vs,Gs,e,t);r.layers=this.layers,this.add(r);const a=new In(Vs,Gs,e,t);a.layers=this.layers,this.add(a);const o=new In(Vs,Gs,e,t);o.layers=this.layers,this.add(o);const l=new In(Vs,Gs,e,t);l.layers=this.layers,this.add(l);const c=new In(Vs,Gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class $m extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Rd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=jm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function jm(){this._document.hidden===!1&&this.reset()}class lc extends Mm{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const lh=new _t;class Km{constructor(e,t,n=0,i=1/0){this.ray=new Yc(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Xc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return lh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lh),this}intersectObject(e,t=!0,n=[]){return cc(e,this,n,t),n.sort(ch),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)cc(e[i],this,n,t);return n.sort(ch),n}}function ch(s,e){return s.distance-e.distance}function cc(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)cc(r[a],e,t,!0)}}class Zm{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Le(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Le(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Su=class Su{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};Su.prototype.isMatrix2=!0;let uh=Su;const hh=new I,Pa=new I,Hs=new I,Ws=new I,Qo=new I,Jm=new I,Qm=new I;class e_{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){hh.subVectors(e,this.start),Pa.subVectors(this.end,this.start);const n=Pa.dot(Pa);if(n===0)return 0;let r=Pa.dot(hh)/n;return t&&(r=Le(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=Jm,n=Qm){const i=10000000000000001e-32;let r,a;const o=this.start,l=e.start,c=this.end,u=e.end;Hs.subVectors(c,o),Ws.subVectors(u,l),Qo.subVectors(o,l);const h=Hs.dot(Hs),d=Ws.dot(Ws),f=Ws.dot(Qo);if(h<=i&&d<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(h<=i)r=0,a=f/d,a=Le(a,0,1);else{const g=Hs.dot(Qo);if(d<=i)a=0,r=Le(-g/h,0,1);else{const _=Hs.dot(Ws),p=h*d-_*_;p!==0?r=Le((_*f-g*d)/p,0,1):r=0,a=(_*r+f)/d,a<0?(a=0,r=Le(-g/h,0,1)):a>1&&(a=1,r=Le((_-g)/h,0,1))}}return t.copy(o).addScaledVector(Hs,r),n.copy(l).addScaledVector(Ws,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function dh(s,e,t,n){const i=t_(n);switch(t){case pd:return s*e;case _d:return s*e/i.components*i.byteLength;case Bc:return s*e/i.components*i.byteLength;case ys:return s*e*2/i.components*i.byteLength;case zc:return s*e*2/i.components*i.byteLength;case md:return s*e*3/i.components*i.byteLength;case Wn:return s*e*4/i.components*i.byteLength;case kc:return s*e*4/i.components*i.byteLength;case Wa:case Xa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case qa:case Ya:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Pl:case Ll:return Math.max(s,16)*Math.max(e,8)/4;case Rl:case Dl:return Math.max(s,8)*Math.max(e,8)/2;case Il:case Ul:case Fl:case Ol:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Nl:case eo:case Bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Wl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ql:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case $l:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case jl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Kl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Zl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Jl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ql:case ec:case tc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case nc:case ic:return Math.ceil(s/4)*Math.ceil(e/4)*8;case to:case sc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function t_(s){switch(s){case Sn:case ud:return{byteLength:1,components:1};case Or:case hd:case Kt:return{byteLength:2,components:1};case Fc:case Oc:return{byteLength:2,components:4};case ri:case Nc:case En:return{byteLength:4,components:1};case dd:case fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ac}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ac);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pd(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function n_(s){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(s.bindBuffer(c,o),h.length===0)s.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var i_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,r_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,h_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,d_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,__=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,g_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,v_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,b_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,E_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,T_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,w_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,A_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,C_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,R_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I_="gl_FragColor = linearToOutputTexel( gl_FragColor );",U_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,N_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,F_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,O_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,B_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,k_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,V_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,X_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,j_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,K_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,J_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ng=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ig=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ag=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ug=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_g=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ag=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ig=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ng=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,kg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,n0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const i0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,s0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,u0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,h0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,d0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,p0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,g0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,S0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,E0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,T0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,C0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,L0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:i_,alphahash_pars_fragment:s_,alphamap_fragment:r_,alphamap_pars_fragment:a_,alphatest_fragment:o_,alphatest_pars_fragment:l_,aomap_fragment:c_,aomap_pars_fragment:u_,batching_pars_vertex:h_,batching_vertex:d_,begin_vertex:f_,beginnormal_vertex:p_,bsdfs:m_,iridescence_fragment:__,bumpmap_pars_fragment:g_,clipping_planes_fragment:v_,clipping_planes_pars_fragment:x_,clipping_planes_pars_vertex:M_,clipping_planes_vertex:y_,color_fragment:S_,color_pars_fragment:b_,color_pars_vertex:E_,color_vertex:T_,common:w_,cube_uv_reflection_fragment:A_,defaultnormal_vertex:C_,displacementmap_pars_vertex:R_,displacementmap_vertex:P_,emissivemap_fragment:D_,emissivemap_pars_fragment:L_,colorspace_fragment:I_,colorspace_pars_fragment:U_,envmap_fragment:N_,envmap_common_pars_fragment:F_,envmap_pars_fragment:O_,envmap_pars_vertex:B_,envmap_physical_pars_fragment:j_,envmap_vertex:z_,fog_vertex:k_,fog_pars_vertex:V_,fog_fragment:G_,fog_pars_fragment:H_,gradientmap_pars_fragment:W_,lightmap_pars_fragment:X_,lights_lambert_fragment:q_,lights_lambert_pars_fragment:Y_,lights_pars_begin:$_,lights_toon_fragment:K_,lights_toon_pars_fragment:Z_,lights_phong_fragment:J_,lights_phong_pars_fragment:Q_,lights_physical_fragment:eg,lights_physical_pars_fragment:tg,lights_fragment_begin:ng,lights_fragment_maps:ig,lights_fragment_end:sg,lightprobes_pars_fragment:rg,logdepthbuf_fragment:ag,logdepthbuf_pars_fragment:og,logdepthbuf_pars_vertex:lg,logdepthbuf_vertex:cg,map_fragment:ug,map_pars_fragment:hg,map_particle_fragment:dg,map_particle_pars_fragment:fg,metalnessmap_fragment:pg,metalnessmap_pars_fragment:mg,morphinstance_vertex:_g,morphcolor_vertex:gg,morphnormal_vertex:vg,morphtarget_pars_vertex:xg,morphtarget_vertex:Mg,normal_fragment_begin:yg,normal_fragment_maps:Sg,normal_pars_fragment:bg,normal_pars_vertex:Eg,normal_vertex:Tg,normalmap_pars_fragment:wg,clearcoat_normal_fragment_begin:Ag,clearcoat_normal_fragment_maps:Cg,clearcoat_pars_fragment:Rg,iridescence_pars_fragment:Pg,opaque_fragment:Dg,packing:Lg,premultiplied_alpha_fragment:Ig,project_vertex:Ug,dithering_fragment:Ng,dithering_pars_fragment:Fg,roughnessmap_fragment:Og,roughnessmap_pars_fragment:Bg,shadowmap_pars_fragment:zg,shadowmap_pars_vertex:kg,shadowmap_vertex:Vg,shadowmask_pars_fragment:Gg,skinbase_vertex:Hg,skinning_pars_vertex:Wg,skinning_vertex:Xg,skinnormal_vertex:qg,specularmap_fragment:Yg,specularmap_pars_fragment:$g,tonemapping_fragment:jg,tonemapping_pars_fragment:Kg,transmission_fragment:Zg,transmission_pars_fragment:Jg,uv_pars_fragment:Qg,uv_pars_vertex:e0,uv_vertex:t0,worldpos_vertex:n0,background_vert:i0,background_frag:s0,backgroundCube_vert:r0,backgroundCube_frag:a0,cube_vert:o0,cube_frag:l0,depth_vert:c0,depth_frag:u0,distance_vert:h0,distance_frag:d0,equirect_vert:f0,equirect_frag:p0,linedashed_vert:m0,linedashed_frag:_0,meshbasic_vert:g0,meshbasic_frag:v0,meshlambert_vert:x0,meshlambert_frag:M0,meshmatcap_vert:y0,meshmatcap_frag:S0,meshnormal_vert:b0,meshnormal_frag:E0,meshphong_vert:T0,meshphong_frag:w0,meshphysical_vert:A0,meshphysical_frag:C0,meshtoon_vert:R0,meshtoon_frag:P0,points_vert:D0,points_frag:L0,shadow_vert:I0,shadow_frag:U0,sprite_vert:N0,sprite_frag:F0},ce={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},ln={basic:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Se(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:rn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:rn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Se(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:rn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:rn([ce.points,ce.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:rn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:rn([ce.common,ce.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:rn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:rn([ce.sprite,ce.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:rn([ce.common,ce.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:rn([ce.lights,ce.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ln.physical={uniforms:rn([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Da={r:0,b:0,g:0},O0=new _t,Dd=new Ne;Dd.set(-1,0,0,0,1,0,0,0,1);function B0(s,e,t,n,i,r){const a=new Se(0);let o=i===!0?0:1,l,c,u=null,h=0,d=null;function f(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const b=x.backgroundBlurriness>0;S=e.get(S,b)}return S}function g(x){let S=!1;const b=f(x);b===null?p(a,o):b&&b.isColor&&(p(b,1),S=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(x,S){const b=f(S);b&&(b.isCubeTexture||b.mapping===go)?(c===void 0&&(c=new $t(new Qr(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:or(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(O0.makeRotationFromEuler(S.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Dd),c.material.toneMapped=Ye.getTransfer(b.colorSpace)!==et,(u!==b||h!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=b,h=b.version,d=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new $t(new vo(2,2),new Nt({name:"BackgroundMaterial",uniforms:or(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(b.colorSpace)!==et,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||h!==b.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=b,h=b.version,d=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,S){x.getRGB(Da,Td(s)),t.buffers.color.setClear(Da.r,Da.g,Da.b,S,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,S=1){a.set(x),o=S,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:_,dispose:m}}function z0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(R,D,z,O,L){let N=!1;const k=h(R,O,z,D);r!==k&&(r=k,c(r.object)),N=f(R,O,z,L),N&&g(R,O,z,L),L!==null&&e.update(L,s.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,b(R,D,z,O),L!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function l(){return s.createVertexArray()}function c(R){return s.bindVertexArray(R)}function u(R){return s.deleteVertexArray(R)}function h(R,D,z,O){const L=O.wireframe===!0;let N=n[D.id];N===void 0&&(N={},n[D.id]=N);const k=R.isInstancedMesh===!0?R.id:0;let K=N[k];K===void 0&&(K={},N[k]=K);let J=K[z.id];J===void 0&&(J={},K[z.id]=J);let te=J[L];return te===void 0&&(te=d(l()),J[L]=te),te}function d(R){const D=[],z=[],O=[];for(let L=0;L<t;L++)D[L]=0,z[L]=0,O[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:O,object:R,attributes:{},index:null}}function f(R,D,z,O){const L=r.attributes,N=D.attributes;let k=0;const K=z.getAttributes();for(const J in K)if(K[J].location>=0){const _e=L[J];let he=N[J];if(he===void 0&&(J==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),J==="instanceColor"&&R.instanceColor&&(he=R.instanceColor)),_e===void 0||_e.attribute!==he||he&&_e.data!==he.data)return!0;k++}return r.attributesNum!==k||r.index!==O}function g(R,D,z,O){const L={},N=D.attributes;let k=0;const K=z.getAttributes();for(const J in K)if(K[J].location>=0){let _e=N[J];_e===void 0&&(J==="instanceMatrix"&&R.instanceMatrix&&(_e=R.instanceMatrix),J==="instanceColor"&&R.instanceColor&&(_e=R.instanceColor));const he={};he.attribute=_e,_e&&_e.data&&(he.data=_e.data),L[J]=he,k++}r.attributes=L,r.attributesNum=k,r.index=O}function _(){const R=r.newAttributes;for(let D=0,z=R.length;D<z;D++)R[D]=0}function p(R){m(R,0)}function m(R,D){const z=r.newAttributes,O=r.enabledAttributes,L=r.attributeDivisors;z[R]=1,O[R]===0&&(s.enableVertexAttribArray(R),O[R]=1),L[R]!==D&&(s.vertexAttribDivisor(R,D),L[R]=D)}function x(){const R=r.newAttributes,D=r.enabledAttributes;for(let z=0,O=D.length;z<O;z++)D[z]!==R[z]&&(s.disableVertexAttribArray(z),D[z]=0)}function S(R,D,z,O,L,N,k){k===!0?s.vertexAttribIPointer(R,D,z,L,N):s.vertexAttribPointer(R,D,z,O,L,N)}function b(R,D,z,O){_();const L=O.attributes,N=z.getAttributes(),k=D.defaultAttributeValues;for(const K in N){const J=N[K];if(J.location>=0){let te=L[K];if(te===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(te=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(te=R.instanceColor)),te!==void 0){const _e=te.normalized,he=te.itemSize,De=e.get(te);if(De===void 0)continue;const Be=De.buffer,Ce=De.type,Z=De.bytesPerElement,pe=Ce===s.INT||Ce===s.UNSIGNED_INT||te.gpuType===Nc;if(te.isInterleavedBufferAttribute){const re=te.data,Re=re.stride,Ue=te.offset;if(re.isInstancedInterleavedBuffer){for(let Pe=0;Pe<J.locationSize;Pe++)m(J.location+Pe,re.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Pe=0;Pe<J.locationSize;Pe++)p(J.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let Pe=0;Pe<J.locationSize;Pe++)S(J.location+Pe,he/J.locationSize,Ce,_e,Re*Z,(Ue+he/J.locationSize*Pe)*Z,pe)}else{if(te.isInstancedBufferAttribute){for(let re=0;re<J.locationSize;re++)m(J.location+re,te.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let re=0;re<J.locationSize;re++)p(J.location+re);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let re=0;re<J.locationSize;re++)S(J.location+re,he/J.locationSize,Ce,_e,he*Z,he/J.locationSize*re*Z,pe)}}else if(k!==void 0){const _e=k[K];if(_e!==void 0)switch(_e.length){case 2:s.vertexAttrib2fv(J.location,_e);break;case 3:s.vertexAttrib3fv(J.location,_e);break;case 4:s.vertexAttrib4fv(J.location,_e);break;default:s.vertexAttrib1fv(J.location,_e)}}}}x()}function A(){M();for(const R in n){const D=n[R];for(const z in D){const O=D[z];for(const L in O){const N=O[L];for(const k in N)u(N[k].object),delete N[k];delete O[L]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;const D=n[R.id];for(const z in D){const O=D[z];for(const L in O){const N=O[L];for(const k in N)u(N[k].object),delete N[k];delete O[L]}}delete n[R.id]}function w(R){for(const D in n){const z=n[D];for(const O in z){const L=z[O];if(L[R.id]===void 0)continue;const N=L[R.id];for(const k in N)u(N[k].object),delete N[k];delete L[R.id]}}}function v(R){for(const D in n){const z=n[D],O=R.isInstancedMesh===!0?R.id:0,L=z[O];if(L!==void 0){for(const N in L){const k=L[N];for(const K in k)u(k[K].object),delete k[K];delete L[N]}delete z[O],Object.keys(z).length===0&&delete n[D]}}}function M(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:M,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function k0(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(s.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function V0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==Wn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const v=w===Kt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Sn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==En&&!v)}function l(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ae("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:b,maxSamples:A,samples:T}}function G0(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new rs,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=s.get(h);if(!i||g===null||g.length===0||r&&!p)r?u(null):c();else{const x=r?0:n,S=x*4;let b=m.clippingState||null;l.value=b,b=u(g,d,S,f);for(let A=0;A!==S;++A)b[A]=t[A];m.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let S=0,b=f;S!==_;++S,b+=4)a.copy(h[S]).applyMatrix4(x,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const zi=4,fh=[.125,.215,.35,.446,.526,.582],ls=20,H0=256,Er=new xo,ph=new Se;let el=null,tl=0,nl=0,il=!1;const W0=new I;class mh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=W0}=r;el=this._renderer.getRenderTarget(),tl=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel(),il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(el,tl,nl),this._renderer.xr.enabled=il,e.scissorTest=!1,Xs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ms||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),el=this._renderer.getRenderTarget(),tl=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel(),il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Kt,format:Wn,colorSpace:zr,depthBuffer:!1},i=_h(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_h(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=X0(r)),this._blurMaterial=Y0(r,e,t),this._ggxMaterial=q0(r,e,t)}return i}_compileMaterial(e){const t=new $t(new Lt,e);this._renderer.compile(t,Er)}_sceneToCubeUV(e,t,n,i,r){const l=new In(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(ph),h.toneMapping=si,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new Qr,new Hr({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let m=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(ph),m=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):b===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));const A=this._cubeSize;Xs(i,b*A,S>2?A:0,A,A),h.setRenderTarget(i),m&&h.render(_,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ms||e.mapping===sr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gh());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Xs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Er)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:g}=this,_=this._sizeLods[n],p=3*_*(n>g-zi?n-g+zi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Xs(r,p,m,3*_,2*_),i.setRenderTarget(r),i.render(o,Er),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Xs(e,p,m,3*_,2*_),i.setRenderTarget(e),i.render(o,Er)}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[i];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ls-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):ls;p>ls&&Ae(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ls}`);const m=[];let x=0;for(let w=0;w<ls;++w){const v=w/_,M=Math.exp(-v*v/2);m.push(M),w===0?x+=M:w<p&&(x+=2*M)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const b=this._sizeLods[i],A=3*b*(i>S-zi?i-S+zi:0),T=4*(this._cubeSize-b);Xs(t,A,T,3*b,2*b),l.setRenderTarget(t),l.render(h,Er)}}function X0(s){const e=[],t=[],n=[];let i=s;const r=s-zi+1+fh.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-zi?l=fh[a-s+zi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*f),S=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,v=T>2?0:-1,M=[w,v,0,w+2/3,v,0,w+2/3,v+1,0,w,v,0,w+2/3,v+1,0,w,v+1,0];x.set(M,_*g*T),S.set(d,p*g*T);const P=[T,T,T,T,T,T];b.set(P,m*g*T)}const A=new Lt;A.setAttribute("position",new ft(x,_)),A.setAttribute("uv",new ft(S,p)),A.setAttribute("faceIndex",new ft(b,m)),n.push(new $t(A,null)),i>zi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function _h(s,e,t){const n=new hn(s,e,t);return n.texture.mapping=go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xs(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function q0(s,e,t){return new Nt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:H0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Y0(s,e,t){const n=new Float32Array(ls),i=new I(0,1,0);return new Nt({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function gh(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function vh(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ld extends hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new bd(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Qr(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:or(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:ii});r.uniforms.tEquirect.value=t;const a=new $t(i,r),o=t.minFilter;return t.minFilter===Fi&&(t.minFilter=Dt),new Ym(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function $0(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===Ha||f===Ao)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const _=new Ld(g.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,g=f===Ha||f===Ao,_=f===Ms||f===sr;if(g||_){let p=t.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new mh(s)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const x=d.image;return g&&x&&x.height>0||_&&x&&l(x)?(n===null&&(n=new mh(s)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function o(d,f){return f===Ha?d.mapping=Ms:f===Ao&&(d.mapping=sr),d}function l(d){let f=0;const g=6;for(let _=0;_<g;_++)d[_]!==void 0&&f++;return f===g}function c(d){const f=d.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function j0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ac("WebGLRenderer: "+n+" extension not supported."),i}}}function K0(s,e,t,n){const i={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(g===void 0)return;if(f!==null){const x=f.array;_=f.version;for(let S=0,b=x.length;S<b;S+=3){const A=x[S+0],T=x[S+1],w=x[S+2];d.push(A,T,T,w,w,A)}}else{const x=g.array;_=g.version;for(let S=0,b=x.length/3-1;S<b;S+=3){const A=S+0,T=S+1,w=S+2;d.push(A,T,T,w,w,A)}}const p=new(g.count>=65535?yd:Md)(d,1);p.version=_;const m=r.get(h);m&&e.remove(m),r.set(h,p)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Z0(s,e,t){let n;function i(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,d){s.drawElements(n,d,r,h*a),t.update(d,n,1)}function c(h,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,h*a,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,f);let _=0;for(let p=0;p<f;p++)_+=d[p];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function J0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Q0(s,e,t){const n=new WeakMap,i=new ut;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let M=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let b=o.attributes.position.count*S,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*A*4*h),w=new vd(T,b,A,h);w.type=En,w.needsUpdate=!0;const v=S*4;for(let P=0;P<h;P++){const R=p[P],D=m[P],z=x[P],O=b*A*4*P;for(let L=0;L<R.count;L++){const N=L*v;f===!0&&(i.fromBufferAttribute(R,L),T[O+N+0]=i.x,T[O+N+1]=i.y,T[O+N+2]=i.z,T[O+N+3]=0),g===!0&&(i.fromBufferAttribute(D,L),T[O+N+4]=i.x,T[O+N+5]=i.y,T[O+N+6]=i.z,T[O+N+7]=0),_===!0&&(i.fromBufferAttribute(z,L),T[O+N+8]=i.x,T[O+N+9]=i.y,T[O+N+10]=i.z,T[O+N+11]=z.itemSize===4?i.w:1)}}d={count:h,texture:w,size:new we(b,A)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function ev(s,e,t,n,i){let r=new WeakMap;function a(c){const u=i.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const tv={[Rc]:"LINEAR_TONE_MAPPING",[Pc]:"REINHARD_TONE_MAPPING",[Dc]:"CINEON_TONE_MAPPING",[_o]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Uc]:"NEUTRAL_TONE_MAPPING",[Lc]:"CUSTOM_TONE_MAPPING"};function nv(s,e,t,n,i){const r=new hn(e,t,{type:s,depthBuffer:n,stencilBuffer:i,depthTexture:n?new ar(e,t):void 0}),a=new hn(e,t,{type:Kt,depthBuffer:!1,stencilBuffer:!1}),o=new Lt;o.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new bt([0,2,0,0,2,0],2));const l=new wd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new $t(o,l),u=new xo(-1,1,1,-1,0,1);let h=null,d=null,f=!1,g,_=null,p=[],m=!1;this.setSize=function(x,S){r.setSize(x,S),a.setSize(x,S);for(let b=0;b<p.length;b++){const A=p[b];A.setSize&&A.setSize(x,S)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const S=r.width,b=r.height;for(let A=0;A<p.length;A++){const T=p[A];T.setSize&&T.setSize(S,b)}},this.begin=function(x,S){if(f||x.toneMapping===si&&p.length===0)return!1;if(_=S,S!==null){const b=S.width,A=S.height;(r.width!==b||r.height!==A)&&this.setSize(b,A)}return m===!1&&x.setRenderTarget(r),g=x.toneMapping,x.toneMapping=si,!0},this.hasRenderPass=function(){return m},this.end=function(x,S){x.toneMapping=g,f=!0;let b=r,A=a;for(let T=0;T<p.length;T++){const w=p[T];if(w.enabled!==!1&&(w.render(x,A,b,S),w.needsSwap!==!1)){const v=b;b=A,A=v}}if(h!==x.outputColorSpace||d!==x.toneMapping){h=x.outputColorSpace,d=x.toneMapping,l.defines={},Ye.getTransfer(h)===et&&(l.defines.SRGB_TRANSFER="");const T=tv[d];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(_),x.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Id=new Vt,uc=new ar(1,1),Ud=new vd,Nd=new rm,Fd=new bd,xh=[],Mh=[],yh=new Float32Array(16),Sh=new Float32Array(9),bh=new Float32Array(4);function gr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=xh[i];if(r===void 0&&(r=new Float32Array(i),xh[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Bt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function yo(s,e){let t=Mh[e];t===void 0&&(t=new Int32Array(e),Mh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function iv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function sv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2fv(this.addr,e),zt(t,e)}}function rv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;s.uniform3fv(this.addr,e),zt(t,e)}}function av(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4fv(this.addr,e),zt(t,e)}}function ov(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;bh.set(n),s.uniformMatrix2fv(this.addr,!1,bh),zt(t,n)}}function lv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;Sh.set(n),s.uniformMatrix3fv(this.addr,!1,Sh),zt(t,n)}}function cv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;yh.set(n),s.uniformMatrix4fv(this.addr,!1,yh),zt(t,n)}}function uv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function hv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2iv(this.addr,e),zt(t,e)}}function dv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;s.uniform3iv(this.addr,e),zt(t,e)}}function fv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4iv(this.addr,e),zt(t,e)}}function pv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function mv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2uiv(this.addr,e),zt(t,e)}}function _v(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;s.uniform3uiv(this.addr,e),zt(t,e)}}function gv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4uiv(this.addr,e),zt(t,e)}}function vv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(uc.compareFunction=t.isReversedDepthBuffer()?Gc:Vc,r=uc):r=Id,t.setTexture2D(e||r,i)}function xv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Nd,i)}function Mv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Fd,i)}function yv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ud,i)}function Sv(s){switch(s){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return av;case 35674:return ov;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return uv;case 35667:case 35671:return hv;case 35668:case 35672:return dv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return _v;case 36296:return gv;case 35678:case 36198:case 36298:case 36306:case 35682:return vv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return yv}}function bv(s,e){s.uniform1fv(this.addr,e)}function Ev(s,e){const t=gr(e,this.size,2);s.uniform2fv(this.addr,t)}function Tv(s,e){const t=gr(e,this.size,3);s.uniform3fv(this.addr,t)}function wv(s,e){const t=gr(e,this.size,4);s.uniform4fv(this.addr,t)}function Av(s,e){const t=gr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Cv(s,e){const t=gr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Rv(s,e){const t=gr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Pv(s,e){s.uniform1iv(this.addr,e)}function Dv(s,e){s.uniform2iv(this.addr,e)}function Lv(s,e){s.uniform3iv(this.addr,e)}function Iv(s,e){s.uniform4iv(this.addr,e)}function Uv(s,e){s.uniform1uiv(this.addr,e)}function Nv(s,e){s.uniform2uiv(this.addr,e)}function Fv(s,e){s.uniform3uiv(this.addr,e)}function Ov(s,e){s.uniform4uiv(this.addr,e)}function Bv(s,e,t){const n=this.cache,i=e.length,r=yo(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=uc:a=Id;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function zv(s,e,t){const n=this.cache,i=e.length,r=yo(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Nd,r[a])}function kv(s,e,t){const n=this.cache,i=e.length,r=yo(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Fd,r[a])}function Vv(s,e,t){const n=this.cache,i=e.length,r=yo(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ud,r[a])}function Gv(s){switch(s){case 5126:return bv;case 35664:return Ev;case 35665:return Tv;case 35666:return wv;case 35674:return Av;case 35675:return Cv;case 35676:return Rv;case 5124:case 35670:return Pv;case 35667:case 35671:return Dv;case 35668:case 35672:return Lv;case 35669:case 35673:return Iv;case 5125:return Uv;case 36294:return Nv;case 36295:return Fv;case 36296:return Ov;case 35678:case 36198:case 36298:case 36306:case 35682:return Bv;case 35679:case 36299:case 36307:return zv;case 35680:case 36300:case 36308:case 36293:return kv;case 36289:case 36303:case 36311:case 36292:return Vv}}class Hv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sv(t.type)}}class Wv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gv(t.type)}}class Xv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const sl=/(\w+)(\])?(\[|\.)?/g;function Eh(s,e){s.seq.push(e),s.map[e.id]=e}function qv(s,e,t){const n=s.name,i=n.length;for(sl.lastIndex=0;;){const r=sl.exec(n),a=sl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Eh(t,c===void 0?new Hv(o,s,e):new Wv(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Xv(o),Eh(t,h)),t=h}}}class $a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);qv(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Th(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Yv=37297;let $v=0;function jv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wh=new Ne;function Kv(s){Ye._getMatrix(wh,Ye.workingColorSpace,s);const e=`mat3( ${wh.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(s)){case io:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Ah(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+jv(s.getShaderSource(e),o)}else return r}function Zv(s,e){const t=Kv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Jv={[Rc]:"Linear",[Pc]:"Reinhard",[Dc]:"Cineon",[_o]:"ACESFilmic",[Ic]:"AgX",[Uc]:"Neutral",[Lc]:"Custom"};function Qv(s,e){const t=Jv[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const La=new I;function ex(){Ye.getLuminanceCoefficients(La);const s=La.x.toFixed(4),e=La.y.toFixed(4),t=La.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function nx(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ix(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Cr(s){return s!==""}function Ch(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sx=/^[ \t]*#include +<([\w\d./]+)>/gm;function hc(s){return s.replace(sx,ax)}const rx=new Map;function ax(s,e){let t=Ve[e];if(t===void 0){const n=rx.get(e);if(n!==void 0)t=Ve[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return hc(t)}const ox=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(s){return s.replace(ox,lx)}function lx(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Dh(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const cx={[Ga]:"SHADOWMAP_TYPE_PCF",[Ar]:"SHADOWMAP_TYPE_VSM"};function ux(s){return cx[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const hx={[Ms]:"ENVMAP_TYPE_CUBE",[sr]:"ENVMAP_TYPE_CUBE",[go]:"ENVMAP_TYPE_CUBE_UV"};function dx(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":hx[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const fx={[sr]:"ENVMAP_MODE_REFRACTION"};function px(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":fx[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const mx={[Cc]:"ENVMAP_BLENDING_MULTIPLY",[Sp]:"ENVMAP_BLENDING_MIX",[bp]:"ENVMAP_BLENDING_ADD"};function _x(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":mx[s.combine]||"ENVMAP_BLENDING_NONE"}function gx(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function vx(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=ux(t),c=dx(t),u=px(t),h=_x(t),d=gx(t),f=tx(t),g=nx(r),_=i.createProgram();let p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),m.length>0&&(m+=`
`)):(p=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),m=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?Ve.tonemapping_pars_fragment:"",t.toneMapping!==si?Qv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Zv("linearToOutputTexel",t.outputColorSpace),ex(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),a=hc(a),a=Ch(a,t),a=Rh(a,t),o=hc(o),o=Ch(o,t),o=Rh(o,t),a=Ph(a),o=Ph(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=x+p+a,b=x+m+o,A=Th(i,i.VERTEX_SHADER,S),T=Th(i,i.FRAGMENT_SHADER,b);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(R){if(s.debug.checkShaderErrors){const D=i.getProgramInfoLog(_)||"",z=i.getShaderInfoLog(A)||"",O=i.getShaderInfoLog(T)||"",L=D.trim(),N=z.trim(),k=O.trim();let K=!0,J=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{const te=Ah(i,A,"vertex"),_e=Ah(i,T,"fragment");$e("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+L+`
`+te+`
`+_e)}else L!==""?Ae("WebGLProgram: Program Info Log:",L):(N===""||k==="")&&(J=!1);J&&(R.diagnostics={runnable:K,programLog:L,vertexShader:{log:N,prefix:p},fragmentShader:{log:k,prefix:m}})}i.deleteShader(A),i.deleteShader(T),v=new $a(i,_),M=ix(i,_)}let v;this.getUniforms=function(){return v===void 0&&w(this),v};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,Yv)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$v++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let xx=0;class Mx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yx(e),t.set(e,n)),n}}class yx{constructor(e){this.id=xx++,this.code=e,this.usedTimes=0}}function Sx(s){return s===ys||s===eo||s===to}function bx(s,e,t,n,i,r){const a=new Xc,o=new Mx,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,M,P,R,D,z){const O=R.fog,L=D.geometry,N=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||N,k),J=K&&K.mapping===go?K.image.height:null,te=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Ae("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const _e=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,he=_e!==void 0?_e.length:0;let De=0;L.morphAttributes.position!==void 0&&(De=1),L.morphAttributes.normal!==void 0&&(De=2),L.morphAttributes.color!==void 0&&(De=3);let Be,Ce,Z,pe;if(te){const Fe=ln[te];Be=Fe.vertexShader,Ce=Fe.fragmentShader}else Be=v.vertexShader,Ce=v.fragmentShader,o.update(v),Z=o.getVertexShaderID(v),pe=o.getFragmentShaderID(v);const re=s.getRenderTarget(),Re=s.state.buffers.depth.getReversed(),Ue=D.isInstancedMesh===!0,Pe=D.isBatchedMesh===!0,gt=!!v.map,Xe=!!v.matcap,nt=!!K,pt=!!v.aoMap,He=!!v.lightMap,Ft=!!v.bumpMap,vt=!!v.normalMap,gn=!!v.displacementMap,F=!!v.emissiveMap,Ot=!!v.metalnessMap,qe=!!v.roughnessMap,ht=v.anisotropy>0,ue=v.clearcoat>0,Et=v.dispersion>0,C=v.iridescence>0,y=v.sheen>0,V=v.transmission>0,$=ht&&!!v.anisotropyMap,ee=ue&&!!v.clearcoatMap,ne=ue&&!!v.clearcoatNormalMap,le=ue&&!!v.clearcoatRoughnessMap,q=C&&!!v.iridescenceMap,j=C&&!!v.iridescenceThicknessMap,me=y&&!!v.sheenColorMap,xe=y&&!!v.sheenRoughnessMap,ae=!!v.specularMap,ie=!!v.specularColorMap,Ie=!!v.specularIntensityMap,ze=V&&!!v.transmissionMap,Qe=V&&!!v.thicknessMap,U=!!v.gradientMap,se=!!v.alphaMap,Y=v.alphaTest>0,ge=!!v.alphaHash,oe=!!v.extensions;let Q=si;v.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Q=s.toneMapping);const be={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:Be,fragmentShader:Ce,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:pe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Pe,batchingColor:Pe&&D._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&D.instanceColor!==null,instancingMorph:Ue&&D.morphTexture!==null,outputColorSpace:re===null?s.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:gt,matcap:Xe,envMap:nt,envMapMode:nt&&K.mapping,envMapCubeUVHeight:J,aoMap:pt,lightMap:He,bumpMap:Ft,normalMap:vt,displacementMap:gn,emissiveMap:F,normalMapObjectSpace:vt&&v.normalMapType===wp,normalMapTangentSpace:vt&&v.normalMapType===no,packedNormalMap:vt&&v.normalMapType===no&&Sx(v.normalMap.format),metalnessMap:Ot,roughnessMap:qe,anisotropy:ht,anisotropyMap:$,clearcoat:ue,clearcoatMap:ee,clearcoatNormalMap:ne,clearcoatRoughnessMap:le,dispersion:Et,iridescence:C,iridescenceMap:q,iridescenceThicknessMap:j,sheen:y,sheenColorMap:me,sheenRoughnessMap:xe,specularMap:ae,specularColorMap:ie,specularIntensityMap:Ie,transmission:V,transmissionMap:ze,thicknessMap:Qe,gradientMap:U,opaque:v.transparent===!1&&v.blending===Hi&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:Y,alphaHash:ge,combine:v.combine,mapUv:gt&&g(v.map.channel),aoMapUv:pt&&g(v.aoMap.channel),lightMapUv:He&&g(v.lightMap.channel),bumpMapUv:Ft&&g(v.bumpMap.channel),normalMapUv:vt&&g(v.normalMap.channel),displacementMapUv:gn&&g(v.displacementMap.channel),emissiveMapUv:F&&g(v.emissiveMap.channel),metalnessMapUv:Ot&&g(v.metalnessMap.channel),roughnessMapUv:qe&&g(v.roughnessMap.channel),anisotropyMapUv:$&&g(v.anisotropyMap.channel),clearcoatMapUv:ee&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(v.sheenRoughnessMap.channel),specularMapUv:ae&&g(v.specularMap.channel),specularColorMapUv:ie&&g(v.specularColorMap.channel),specularIntensityMapUv:Ie&&g(v.specularIntensityMap.channel),transmissionMapUv:ze&&g(v.transmissionMap.channel),thicknessMapUv:Qe&&g(v.thicknessMap.channel),alphaMapUv:se&&g(v.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(vt||ht),vertexNormals:!!L.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(gt||se),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||L.attributes.normal===void 0&&vt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Re,skinning:D.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:De,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Q,decodeVideoTexture:gt&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===et,decodeVideoTextureEmissive:F&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===et,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Un,flipSided:v.side===un,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:oe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&v.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function p(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)M.push(P),M.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(M,v),x(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function m(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function x(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function S(v){const M=f[v.type];let P;if(M){const R=ln[M];P=Ss.clone(R.uniforms)}else P=v.uniforms;return P}function b(v,M){let P=u.get(M);return P!==void 0?++P.usedTimes:(P=new vx(s,M,v,i),c.push(P),u.set(M,P)),P}function A(v){if(--v.usedTimes===0){const M=c.indexOf(v);c[M]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function w(){o.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:S,acquireProgram:b,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:w}}function Ex(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Tx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Lh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ih(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,_,p,m){let x=s[e];return x===void 0?(x={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:m},s[e]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=g,x.materialVariant=a(d),x.groupOrder=_,x.renderOrder=d.renderOrder,x.z=p,x.group=m),e++,x}function l(d,f,g,_,p,m){const x=o(d,f,g,_,p,m);g.transmission>0?n.push(x):g.transparent===!0?i.push(x):t.push(x)}function c(d,f,g,_,p,m){const x=o(d,f,g,_,p,m);g.transmission>0?n.unshift(x):g.transparent===!0?i.unshift(x):t.unshift(x)}function u(d,f){t.length>1&&t.sort(d||Tx),n.length>1&&n.sort(f||Lh),i.length>1&&i.sort(f||Lh)}function h(){for(let d=e,f=s.length;d<f;d++){const g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:h,sort:u}}function wx(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ih,s.set(n,[a])):i>=r.length?(a=new Ih,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ax(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Se};break;case"SpotLight":t={position:new I,direction:new I,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function Cx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Rx=0;function Px(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Dx(s){const e=new Ax,t=Cx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new _t,a=new _t;function o(c){let u=0,h=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,x=0,S=0,b=0,A=0,T=0,w=0;c.sort(Px);for(let M=0,P=c.length;M<P;M++){const R=c[M],D=R.color,z=R.intensity,O=R.distance;let L=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===ys?L=R.shadow.map.texture:L=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=D.r*z,h+=D.g*z,d+=D.b*z;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],z);w++}else if(R.isDirectionalLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const k=R.shadow,K=t.get(R);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,n.directionalShadow[f]=K,n.directionalShadowMap[f]=L,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=N,f++}else if(R.isSpotLight){const N=e.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(D).multiplyScalar(z),N.distance=O,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[_]=N;const k=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,k.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=k.matrix,R.castShadow){const K=t.get(R);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,n.spotShadow[_]=K,n.spotShadowMap[_]=L,b++}_++}else if(R.isRectAreaLight){const N=e.get(R);N.color.copy(D).multiplyScalar(z),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=N,p++}else if(R.isPointLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){const k=R.shadow,K=t.get(R);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,K.shadowCameraNear=k.camera.near,K.shadowCameraFar=k.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=L,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=N,g++}else if(R.isHemisphereLight){const N=e.get(R);N.skyColor.copy(R.color).multiplyScalar(z),N.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[m]=N,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const v=n.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==p||v.hemiLength!==m||v.numDirectionalShadows!==x||v.numPointShadows!==S||v.numSpotShadows!==b||v.numSpotMaps!==A||v.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=b+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,v.directionalLength=f,v.pointLength=g,v.spotLength=_,v.rectAreaLength=p,v.hemiLength=m,v.numDirectionalShadows=x,v.numPointShadows=S,v.numSpotShadows=b,v.numSpotMaps=A,v.numLightProbes=w,n.version=Rx++)}function l(c,u){let h=0,d=0,f=0,g=0,_=0;const p=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const S=c[m];if(S.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(p),h++}else if(S.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(p),f++}else if(S.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const b=n.point[d];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Uh(s){const e=new Dx(s),t=[],n=[],i=[];function r(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Lx(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Uh(s),e.set(i,[o])):r>=a.length?(o=new Uh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Ix=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ux=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nx=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Fx=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Nh=new _t,Tr=new I,rl=new I;function Ox(s,e,t){let n=new $c;const i=new we,r=new we,a=new ut,o=new Lm,l=new Im,c={},u=t.maxTextureSize,h={[Si]:un,[un]:Si,[Un]:Un},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:Ix,fragmentShader:Ux}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Lt;g.setAttribute("position",new ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $t(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ga;let m=this.type;this.render=function(T,w,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===ip&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ga);const M=s.getRenderTarget(),P=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),D=s.state;D.setBlending(ii),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const z=m!==this.type;z&&w.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(L=>L.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,L=T.length;O<L;O++){const N=T[O],k=N.shadow;if(k===void 0){Ae("WebGLShadowMap:",N,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const K=k.getFrameExtents();i.multiply(K),r.copy(k.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/K.x),i.x=r.x*K.x,k.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/K.y),i.y=r.y*K.y,k.mapSize.y=r.y));const J=s.state.buffers.depth.getReversed();if(k.camera._reversedDepth=J,k.map===null||z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ar){if(N.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new hn(i.x,i.y,{format:ys,type:Kt,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),k.map.texture.name=N.name+".shadowMap",k.map.depthTexture=new ar(i.x,i.y,En),k.map.depthTexture.name=N.name+".shadowMapDepth",k.map.depthTexture.format=bi,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=jt,k.map.depthTexture.magFilter=jt}else N.isPointLight?(k.map=new Ld(i.x),k.map.depthTexture=new wm(i.x,ri)):(k.map=new hn(i.x,i.y),k.map.depthTexture=new ar(i.x,i.y,ri)),k.map.depthTexture.name=N.name+".shadowMap",k.map.depthTexture.format=bi,this.type===Ga?(k.map.depthTexture.compareFunction=J?Gc:Vc,k.map.depthTexture.minFilter=Dt,k.map.depthTexture.magFilter=Dt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=jt,k.map.depthTexture.magFilter=jt);k.camera.updateProjectionMatrix()}const te=k.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<te;_e++){if(k.map.isWebGLCubeRenderTarget)s.setRenderTarget(k.map,_e),s.clear();else{_e===0&&(s.setRenderTarget(k.map),s.clear());const he=k.getViewport(_e);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),D.viewport(a)}if(N.isPointLight){const he=k.camera,De=k.matrix,Be=N.distance||he.far;Be!==he.far&&(he.far=Be,he.updateProjectionMatrix()),Tr.setFromMatrixPosition(N.matrixWorld),he.position.copy(Tr),rl.copy(he.position),rl.add(Nx[_e]),he.up.copy(Fx[_e]),he.lookAt(rl),he.updateMatrixWorld(),De.makeTranslation(-Tr.x,-Tr.y,-Tr.z),Nh.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Nh,he.coordinateSystem,he.reversedDepth)}else k.updateMatrices(N);n=k.getFrustum(),b(w,v,k.camera,N,this.type)}k.isPointLightShadow!==!0&&this.type===Ar&&x(k,v),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(M,P,R)};function x(T,w){const v=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new hn(i.x,i.y,{format:ys,type:Kt})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(w,null,v,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(w,null,v,f,_,null)}function S(T,w,v,M){let P=null;const R=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)P=R;else if(P=v.isPointLight===!0?l:o,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const D=P.uuid,z=w.uuid;let O=c[D];O===void 0&&(O={},c[D]=O);let L=O[z];L===void 0&&(L=P.clone(),O[z]=L,w.addEventListener("dispose",A)),P=L}if(P.visible=w.visible,P.wireframe=w.wireframe,M===Ar?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:h[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const D=s.properties.get(P);D.light=v}return P}function b(T,w,v,M,P){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&P===Ar)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const z=e.update(T),O=T.material;if(Array.isArray(O)){const L=z.groups;for(let N=0,k=L.length;N<k;N++){const K=L[N],J=O[K.materialIndex];if(J&&J.visible){const te=S(T,J,M,P);T.onBeforeShadow(s,T,w,v,z,te,K),s.renderBufferDirect(v,null,z,te,T,K),T.onAfterShadow(s,T,w,v,z,te,K)}}}else if(O.visible){const L=S(T,O,M,P);T.onBeforeShadow(s,T,w,v,z,L,null),s.renderBufferDirect(v,null,z,L,T,null),T.onAfterShadow(s,T,w,v,z,L,null)}}const D=T.children;for(let z=0,O=D.length;z<O;z++)b(D[z],w,v,M,P)}function A(T){T.target.removeEventListener("dispose",A);for(const v in c){const M=c[v],P=T.target.uuid;P in M&&(M[P].dispose(),delete M[P])}}}function Bx(s,e){function t(){let U=!1;const se=new ut;let Y=null;const ge=new ut(0,0,0,0);return{setMask:function(oe){Y!==oe&&!U&&(s.colorMask(oe,oe,oe,oe),Y=oe)},setLocked:function(oe){U=oe},setClear:function(oe,Q,be,Fe,At){At===!0&&(oe*=Fe,Q*=Fe,be*=Fe),se.set(oe,Q,be,Fe),ge.equals(se)===!1&&(s.clearColor(oe,Q,be,Fe),ge.copy(se))},reset:function(){U=!1,Y=null,ge.set(-1,0,0,0)}}}function n(){let U=!1,se=!1,Y=null,ge=null,oe=null;return{setReversed:function(Q){if(se!==Q){const be=e.get("EXT_clip_control");Q?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),se=Q;const Fe=oe;oe=null,this.setClear(Fe)}},getReversed:function(){return se},setTest:function(Q){Q?re(s.DEPTH_TEST):Re(s.DEPTH_TEST)},setMask:function(Q){Y!==Q&&!U&&(s.depthMask(Q),Y=Q)},setFunc:function(Q){if(se&&(Q=Fp[Q]),ge!==Q){switch(Q){case yl:s.depthFunc(s.NEVER);break;case Sl:s.depthFunc(s.ALWAYS);break;case bl:s.depthFunc(s.LESS);break;case ir:s.depthFunc(s.LEQUAL);break;case El:s.depthFunc(s.EQUAL);break;case Tl:s.depthFunc(s.GEQUAL);break;case wl:s.depthFunc(s.GREATER);break;case Al:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ge=Q}},setLocked:function(Q){U=Q},setClear:function(Q){oe!==Q&&(oe=Q,se&&(Q=1-Q),s.clearDepth(Q))},reset:function(){U=!1,Y=null,ge=null,oe=null,se=!1}}}function i(){let U=!1,se=null,Y=null,ge=null,oe=null,Q=null,be=null,Fe=null,At=null;return{setTest:function(it){U||(it?re(s.STENCIL_TEST):Re(s.STENCIL_TEST))},setMask:function(it){se!==it&&!U&&(s.stencilMask(it),se=it)},setFunc:function(it,oi,Xn){(Y!==it||ge!==oi||oe!==Xn)&&(s.stencilFunc(it,oi,Xn),Y=it,ge=oi,oe=Xn)},setOp:function(it,oi,Xn){(Q!==it||be!==oi||Fe!==Xn)&&(s.stencilOp(it,oi,Xn),Q=it,be=oi,Fe=Xn)},setLocked:function(it){U=it},setClear:function(it){At!==it&&(s.clearStencil(it),At=it)},reset:function(){U=!1,se=null,Y=null,ge=null,oe=null,Q=null,be=null,Fe=null,At=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,g=[],_=null,p=!1,m=null,x=null,S=null,b=null,A=null,T=null,w=null,v=new Se(0,0,0),M=0,P=!1,R=null,D=null,z=null,O=null,L=null;const N=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,K=0;const J=s.getParameter(s.VERSION);J.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(J)[1]),k=K>=1):J.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),k=K>=2);let te=null,_e={};const he=s.getParameter(s.SCISSOR_BOX),De=s.getParameter(s.VIEWPORT),Be=new ut().fromArray(he),Ce=new ut().fromArray(De);function Z(U,se,Y,ge){const oe=new Uint8Array(4),Q=s.createTexture();s.bindTexture(U,Q),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let be=0;be<Y;be++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(se,0,s.RGBA,1,1,ge,0,s.RGBA,s.UNSIGNED_BYTE,oe):s.texImage2D(se+be,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,oe);return Q}const pe={};pe[s.TEXTURE_2D]=Z(s.TEXTURE_2D,s.TEXTURE_2D,1),pe[s.TEXTURE_CUBE_MAP]=Z(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[s.TEXTURE_2D_ARRAY]=Z(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),pe[s.TEXTURE_3D]=Z(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(s.DEPTH_TEST),a.setFunc(ir),Ft(!1),vt(Lu),re(s.CULL_FACE),pt(ii);function re(U){u[U]!==!0&&(s.enable(U),u[U]=!0)}function Re(U){u[U]!==!1&&(s.disable(U),u[U]=!1)}function Ue(U,se){return d[U]!==se?(s.bindFramebuffer(U,se),d[U]=se,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=se),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=se),!0):!1}function Pe(U,se){let Y=g,ge=!1;if(U){Y=f.get(se),Y===void 0&&(Y=[],f.set(se,Y));const oe=U.textures;if(Y.length!==oe.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let Q=0,be=oe.length;Q<be;Q++)Y[Q]=s.COLOR_ATTACHMENT0+Q;Y.length=oe.length,ge=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,ge=!0);ge&&s.drawBuffers(Y)}function gt(U){return _!==U?(s.useProgram(U),_=U,!0):!1}const Xe={[os]:s.FUNC_ADD,[rp]:s.FUNC_SUBTRACT,[ap]:s.FUNC_REVERSE_SUBTRACT};Xe[op]=s.MIN,Xe[lp]=s.MAX;const nt={[cp]:s.ZERO,[up]:s.ONE,[hp]:s.SRC_COLOR,[xl]:s.SRC_ALPHA,[gp]:s.SRC_ALPHA_SATURATE,[mp]:s.DST_COLOR,[fp]:s.DST_ALPHA,[dp]:s.ONE_MINUS_SRC_COLOR,[Ml]:s.ONE_MINUS_SRC_ALPHA,[_p]:s.ONE_MINUS_DST_COLOR,[pp]:s.ONE_MINUS_DST_ALPHA,[vp]:s.CONSTANT_COLOR,[xp]:s.ONE_MINUS_CONSTANT_COLOR,[Mp]:s.CONSTANT_ALPHA,[yp]:s.ONE_MINUS_CONSTANT_ALPHA};function pt(U,se,Y,ge,oe,Q,be,Fe,At,it){if(U===ii){p===!0&&(Re(s.BLEND),p=!1);return}if(p===!1&&(re(s.BLEND),p=!0),U!==sp){if(U!==m||it!==P){if((x!==os||A!==os)&&(s.blendEquation(s.FUNC_ADD),x=os,A=os),it)switch(U){case Hi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bn:s.blendFunc(s.ONE,s.ONE);break;case Iu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Uu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$e("WebGLState: Invalid blending: ",U);break}else switch(U){case Hi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Iu:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uu:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",U);break}S=null,b=null,T=null,w=null,v.set(0,0,0),M=0,m=U,P=it}return}oe=oe||se,Q=Q||Y,be=be||ge,(se!==x||oe!==A)&&(s.blendEquationSeparate(Xe[se],Xe[oe]),x=se,A=oe),(Y!==S||ge!==b||Q!==T||be!==w)&&(s.blendFuncSeparate(nt[Y],nt[ge],nt[Q],nt[be]),S=Y,b=ge,T=Q,w=be),(Fe.equals(v)===!1||At!==M)&&(s.blendColor(Fe.r,Fe.g,Fe.b,At),v.copy(Fe),M=At),m=U,P=!1}function He(U,se){U.side===Un?Re(s.CULL_FACE):re(s.CULL_FACE);let Y=U.side===un;se&&(Y=!Y),Ft(Y),U.blending===Hi&&U.transparent===!1?pt(ii):pt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ge=U.stencilWrite;o.setTest(ge),ge&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),F(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?re(s.SAMPLE_ALPHA_TO_COVERAGE):Re(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(U){R!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),R=U)}function vt(U){U!==tp?(re(s.CULL_FACE),U!==D&&(U===Lu?s.cullFace(s.BACK):U===np?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Re(s.CULL_FACE),D=U}function gn(U){U!==z&&(k&&s.lineWidth(U),z=U)}function F(U,se,Y){U?(re(s.POLYGON_OFFSET_FILL),(O!==se||L!==Y)&&(O=se,L=Y,a.getReversed()&&(se=-se),s.polygonOffset(se,Y))):Re(s.POLYGON_OFFSET_FILL)}function Ot(U){U?re(s.SCISSOR_TEST):Re(s.SCISSOR_TEST)}function qe(U){U===void 0&&(U=s.TEXTURE0+N-1),te!==U&&(s.activeTexture(U),te=U)}function ht(U,se,Y){Y===void 0&&(te===null?Y=s.TEXTURE0+N-1:Y=te);let ge=_e[Y];ge===void 0&&(ge={type:void 0,texture:void 0},_e[Y]=ge),(ge.type!==U||ge.texture!==se)&&(te!==Y&&(s.activeTexture(Y),te=Y),s.bindTexture(U,se||pe[U]),ge.type=U,ge.texture=se)}function ue(){const U=_e[te];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Et(){try{s.compressedTexImage2D(...arguments)}catch(U){$e("WebGLState:",U)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(U){$e("WebGLState:",U)}}function y(){try{s.texSubImage2D(...arguments)}catch(U){$e("WebGLState:",U)}}function V(){try{s.texSubImage3D(...arguments)}catch(U){$e("WebGLState:",U)}}function $(){try{s.compressedTexSubImage2D(...arguments)}catch(U){$e("WebGLState:",U)}}function ee(){try{s.compressedTexSubImage3D(...arguments)}catch(U){$e("WebGLState:",U)}}function ne(){try{s.texStorage2D(...arguments)}catch(U){$e("WebGLState:",U)}}function le(){try{s.texStorage3D(...arguments)}catch(U){$e("WebGLState:",U)}}function q(){try{s.texImage2D(...arguments)}catch(U){$e("WebGLState:",U)}}function j(){try{s.texImage3D(...arguments)}catch(U){$e("WebGLState:",U)}}function me(U){return h[U]!==void 0?h[U]:s.getParameter(U)}function xe(U,se){h[U]!==se&&(s.pixelStorei(U,se),h[U]=se)}function ae(U){Be.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Be.copy(U))}function ie(U){Ce.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Ce.copy(U))}function Ie(U,se){let Y=c.get(se);Y===void 0&&(Y=new WeakMap,c.set(se,Y));let ge=Y.get(U);ge===void 0&&(ge=s.getUniformBlockIndex(se,U.name),Y.set(U,ge))}function ze(U,se){const ge=c.get(se).get(U);l.get(se)!==ge&&(s.uniformBlockBinding(se,ge,U.__bindingPointIndex),l.set(se,ge))}function Qe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},h={},te=null,_e={},d={},f=new WeakMap,g=[],_=null,p=!1,m=null,x=null,S=null,b=null,A=null,T=null,w=null,v=new Se(0,0,0),M=0,P=!1,R=null,D=null,z=null,O=null,L=null,Be.set(0,0,s.canvas.width,s.canvas.height),Ce.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:Re,bindFramebuffer:Ue,drawBuffers:Pe,useProgram:gt,setBlending:pt,setMaterial:He,setFlipSided:Ft,setCullFace:vt,setLineWidth:gn,setPolygonOffset:F,setScissorTest:Ot,activeTexture:qe,bindTexture:ht,unbindTexture:ue,compressedTexImage2D:Et,compressedTexImage3D:C,texImage2D:q,texImage3D:j,pixelStorei:xe,getParameter:me,updateUBOMapping:Ie,uniformBlockBinding:ze,texStorage2D:ne,texStorage3D:le,texSubImage2D:y,texSubImage3D:V,compressedTexSubImage2D:$,compressedTexSubImage3D:ee,scissor:ae,viewport:ie,reset:Qe}}function zx(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,y){return g?new OffscreenCanvas(C,y):Vr("canvas")}function p(C,y,V){let $=1;const ee=Et(C);if((ee.width>V||ee.height>V)&&($=V/Math.max(ee.width,ee.height)),$<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ne=Math.floor($*ee.width),le=Math.floor($*ee.height);d===void 0&&(d=_(ne,le));const q=y?_(ne,le):d;return q.width=ne,q.height=le,q.getContext("2d").drawImage(C,0,0,ne,le),Ae("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+ne+"x"+le+")."),q}else return"data"in C&&Ae("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function m(C){return C.generateMipmaps}function x(C){s.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(C,y,V,$,ee,ne=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let le;$&&(le=e.get("EXT_texture_norm16"),le||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=y;if(y===s.RED&&(V===s.FLOAT&&(q=s.R32F),V===s.HALF_FLOAT&&(q=s.R16F),V===s.UNSIGNED_BYTE&&(q=s.R8),V===s.UNSIGNED_SHORT&&le&&(q=le.R16_EXT),V===s.SHORT&&le&&(q=le.R16_SNORM_EXT)),y===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.R8UI),V===s.UNSIGNED_SHORT&&(q=s.R16UI),V===s.UNSIGNED_INT&&(q=s.R32UI),V===s.BYTE&&(q=s.R8I),V===s.SHORT&&(q=s.R16I),V===s.INT&&(q=s.R32I)),y===s.RG&&(V===s.FLOAT&&(q=s.RG32F),V===s.HALF_FLOAT&&(q=s.RG16F),V===s.UNSIGNED_BYTE&&(q=s.RG8),V===s.UNSIGNED_SHORT&&le&&(q=le.RG16_EXT),V===s.SHORT&&le&&(q=le.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RG8UI),V===s.UNSIGNED_SHORT&&(q=s.RG16UI),V===s.UNSIGNED_INT&&(q=s.RG32UI),V===s.BYTE&&(q=s.RG8I),V===s.SHORT&&(q=s.RG16I),V===s.INT&&(q=s.RG32I)),y===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RGB8UI),V===s.UNSIGNED_SHORT&&(q=s.RGB16UI),V===s.UNSIGNED_INT&&(q=s.RGB32UI),V===s.BYTE&&(q=s.RGB8I),V===s.SHORT&&(q=s.RGB16I),V===s.INT&&(q=s.RGB32I)),y===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),V===s.UNSIGNED_INT&&(q=s.RGBA32UI),V===s.BYTE&&(q=s.RGBA8I),V===s.SHORT&&(q=s.RGBA16I),V===s.INT&&(q=s.RGBA32I)),y===s.RGB&&(V===s.UNSIGNED_SHORT&&le&&(q=le.RGB16_EXT),V===s.SHORT&&le&&(q=le.RGB16_SNORM_EXT),V===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),V===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),y===s.RGBA){const j=ne?io:Ye.getTransfer(ee);V===s.FLOAT&&(q=s.RGBA32F),V===s.HALF_FLOAT&&(q=s.RGBA16F),V===s.UNSIGNED_BYTE&&(q=j===et?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT&&le&&(q=le.RGBA16_EXT),V===s.SHORT&&le&&(q=le.RGBA16_SNORM_EXT),V===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function A(C,y){let V;return C?y===null||y===ri||y===Br?V=s.DEPTH24_STENCIL8:y===En?V=s.DEPTH32F_STENCIL8:y===Or&&(V=s.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ri||y===Br?V=s.DEPTH_COMPONENT24:y===En?V=s.DEPTH_COMPONENT32F:y===Or&&(V=s.DEPTH_COMPONENT16),V}function T(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==jt&&C.minFilter!==Dt?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function w(C){const y=C.target;y.removeEventListener("dispose",w),M(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&h.delete(y)}function v(C){const y=C.target;y.removeEventListener("dispose",v),R(y)}function M(C){const y=n.get(C);if(y.__webglInit===void 0)return;const V=C.source,$=f.get(V);if($){const ee=$[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&P(C),Object.keys($).length===0&&f.delete(V)}n.remove(C)}function P(C){const y=n.get(C);s.deleteTexture(y.__webglTexture);const V=C.source,$=f.get(V);delete $[y.__cacheKey],a.memory.textures--}function R(C){const y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let ee=0;ee<y.__webglFramebuffer[$].length;ee++)s.deleteFramebuffer(y.__webglFramebuffer[$][ee]);else s.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)s.deleteFramebuffer(y.__webglFramebuffer[$]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=C.textures;for(let $=0,ee=V.length;$<ee;$++){const ne=n.get(V[$]);ne.__webglTexture&&(s.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(V[$])}n.remove(C)}let D=0;function z(){D=0}function O(){return D}function L(C){D=C}function N(){const C=D;return C>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),D+=1,C}function k(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function K(C,y){const V=n.get(C);if(C.isVideoTexture&&ht(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const $=C.image;if($===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(V,C,y);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+y)}function J(C,y){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){Re(V,C,y);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+y)}function te(C,y){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){Re(V,C,y);return}t.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+y)}function _e(C,y){const V=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){Ue(V,C,y);return}t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+y)}const he={[Qa]:s.REPEAT,[Nn]:s.CLAMP_TO_EDGE,[Cl]:s.MIRRORED_REPEAT},De={[jt]:s.NEAREST,[Ep]:s.NEAREST_MIPMAP_NEAREST,[oa]:s.NEAREST_MIPMAP_LINEAR,[Dt]:s.LINEAR,[Co]:s.LINEAR_MIPMAP_NEAREST,[Fi]:s.LINEAR_MIPMAP_LINEAR},Be={[Ap]:s.NEVER,[Lp]:s.ALWAYS,[Cp]:s.LESS,[Vc]:s.LEQUAL,[Rp]:s.EQUAL,[Gc]:s.GEQUAL,[Pp]:s.GREATER,[Dp]:s.NOTEQUAL};function Ce(C,y){if(y.type===En&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Dt||y.magFilter===Co||y.magFilter===oa||y.magFilter===Fi||y.minFilter===Dt||y.minFilter===Co||y.minFilter===oa||y.minFilter===Fi)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,he[y.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,he[y.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,he[y.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,De[y.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,De[y.minFilter]),y.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===jt||y.minFilter!==oa&&y.minFilter!==Fi||y.type===En&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Z(C,y){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",w));const $=y.source;let ee=f.get($);ee===void 0&&(ee={},f.set($,ee));const ne=k(y);if(ne!==C.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ee[ne].usedTimes++;const le=ee[C.__cacheKey];le!==void 0&&(ee[C.__cacheKey].usedTimes--,le.usedTimes===0&&P(y)),C.__cacheKey=ne,C.__webglTexture=ee[ne].texture}return V}function pe(C,y,V){return Math.floor(Math.floor(C/V)/y)}function re(C,y,V,$){const ne=C.updateRanges;if(ne.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,V,$,y.data);else{ne.sort((xe,ae)=>xe.start-ae.start);let le=0;for(let xe=1;xe<ne.length;xe++){const ae=ne[le],ie=ne[xe],Ie=ae.start+ae.count,ze=pe(ie.start,y.width,4),Qe=pe(ae.start,y.width,4);ie.start<=Ie+1&&ze===Qe&&pe(ie.start+ie.count-1,y.width,4)===ze?ae.count=Math.max(ae.count,ie.start+ie.count-ae.start):(++le,ne[le]=ie)}ne.length=le+1;const q=t.getParameter(s.UNPACK_ROW_LENGTH),j=t.getParameter(s.UNPACK_SKIP_PIXELS),me=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let xe=0,ae=ne.length;xe<ae;xe++){const ie=ne[xe],Ie=Math.floor(ie.start/4),ze=Math.ceil(ie.count/4),Qe=Ie%y.width,U=Math.floor(Ie/y.width),se=ze,Y=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(s.UNPACK_SKIP_ROWS,U),t.texSubImage2D(s.TEXTURE_2D,0,Qe,U,se,Y,V,$,y.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,q),t.pixelStorei(s.UNPACK_SKIP_PIXELS,j),t.pixelStorei(s.UNPACK_SKIP_ROWS,me)}}function Re(C,y,V){let $=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=s.TEXTURE_3D);const ee=Z(C,y),ne=y.source;t.bindTexture($,C.__webglTexture,s.TEXTURE0+V);const le=n.get(ne);if(ne.version!==le.__version||ee===!0){if(t.activeTexture(s.TEXTURE0+V),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const Y=Ye.getPrimaries(Ye.workingColorSpace),ge=y.colorSpace===Jn?null:Ye.getPrimaries(y.colorSpace),oe=y.colorSpace===Jn||Y===ge?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let j=p(y.image,!1,i.maxTextureSize);j=ue(y,j);const me=r.convert(y.format,y.colorSpace),xe=r.convert(y.type);let ae=b(y.internalFormat,me,xe,y.normalized,y.colorSpace,y.isVideoTexture);Ce($,y);let ie;const Ie=y.mipmaps,ze=y.isVideoTexture!==!0,Qe=le.__version===void 0||ee===!0,U=ne.dataReady,se=T(y,j);if(y.isDepthTexture)ae=A(y.format===cs,y.type),Qe&&(ze?t.texStorage2D(s.TEXTURE_2D,1,ae,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,ae,j.width,j.height,0,me,xe,null));else if(y.isDataTexture)if(Ie.length>0){ze&&Qe&&t.texStorage2D(s.TEXTURE_2D,se,ae,Ie[0].width,Ie[0].height);for(let Y=0,ge=Ie.length;Y<ge;Y++)ie=Ie[Y],ze?U&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(s.TEXTURE_2D,Y,ae,ie.width,ie.height,0,me,xe,ie.data);y.generateMipmaps=!1}else ze?(Qe&&t.texStorage2D(s.TEXTURE_2D,se,ae,j.width,j.height),U&&re(y,j,me,xe)):t.texImage2D(s.TEXTURE_2D,0,ae,j.width,j.height,0,me,xe,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ze&&Qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,se,ae,Ie[0].width,Ie[0].height,j.depth);for(let Y=0,ge=Ie.length;Y<ge;Y++)if(ie=Ie[Y],y.format!==Wn)if(me!==null)if(ze){if(U)if(y.layerUpdates.size>0){const oe=dh(ie.width,ie.height,y.format,y.type);for(const Q of y.layerUpdates){const be=ie.data.subarray(Q*oe/ie.data.BYTES_PER_ELEMENT,(Q+1)*oe/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,Q,ie.width,ie.height,1,me,be)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,j.depth,me,ie.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,ae,ie.width,ie.height,j.depth,0,ie.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?U&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,ie.width,ie.height,j.depth,me,xe,ie.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Y,ae,ie.width,ie.height,j.depth,0,me,xe,ie.data)}else{ze&&Qe&&t.texStorage2D(s.TEXTURE_2D,se,ae,Ie[0].width,Ie[0].height);for(let Y=0,ge=Ie.length;Y<ge;Y++)ie=Ie[Y],y.format!==Wn?me!==null?ze?U&&t.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,ie.width,ie.height,me,ie.data):t.compressedTexImage2D(s.TEXTURE_2D,Y,ae,ie.width,ie.height,0,ie.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?U&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(s.TEXTURE_2D,Y,ae,ie.width,ie.height,0,me,xe,ie.data)}else if(y.isDataArrayTexture)if(ze){if(Qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,se,ae,j.width,j.height,j.depth),U)if(y.layerUpdates.size>0){const Y=dh(j.width,j.height,y.format,y.type);for(const ge of y.layerUpdates){const oe=j.data.subarray(ge*Y/j.data.BYTES_PER_ELEMENT,(ge+1)*Y/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ge,j.width,j.height,1,me,xe,oe)}y.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,me,xe,j.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ae,j.width,j.height,j.depth,0,me,xe,j.data);else if(y.isData3DTexture)ze?(Qe&&t.texStorage3D(s.TEXTURE_3D,se,ae,j.width,j.height,j.depth),U&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,me,xe,j.data)):t.texImage3D(s.TEXTURE_3D,0,ae,j.width,j.height,j.depth,0,me,xe,j.data);else if(y.isFramebufferTexture){if(Qe)if(ze)t.texStorage2D(s.TEXTURE_2D,se,ae,j.width,j.height);else{let Y=j.width,ge=j.height;for(let oe=0;oe<se;oe++)t.texImage2D(s.TEXTURE_2D,oe,ae,Y,ge,0,me,xe,null),Y>>=1,ge>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){const Y=s.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),j.parentNode!==Y){Y.appendChild(j),h.add(y),Y.onpaint=Fe=>{const At=Fe.changedElements;for(const it of h)At.includes(it.image)&&(it.needsUpdate=!0)},Y.requestPaint();return}const ge=0,oe=s.RGBA,Q=s.RGBA,be=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,ge,oe,Q,be,j),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(ze&&Qe){const Y=Et(Ie[0]);t.texStorage2D(s.TEXTURE_2D,se,ae,Y.width,Y.height)}for(let Y=0,ge=Ie.length;Y<ge;Y++)ie=Ie[Y],ze?U&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,me,xe,ie):t.texImage2D(s.TEXTURE_2D,Y,ae,me,xe,ie);y.generateMipmaps=!1}else if(ze){if(Qe){const Y=Et(j);t.texStorage2D(s.TEXTURE_2D,se,ae,Y.width,Y.height)}U&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,xe,j)}else t.texImage2D(s.TEXTURE_2D,0,ae,me,xe,j);m(y)&&x($),le.__version=ne.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Ue(C,y,V){if(y.image.length!==6)return;const $=Z(C,y),ee=y.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+V);const ne=n.get(ee);if(ee.version!==ne.__version||$===!0){t.activeTexture(s.TEXTURE0+V);const le=Ye.getPrimaries(Ye.workingColorSpace),q=y.colorSpace===Jn?null:Ye.getPrimaries(y.colorSpace),j=y.colorSpace===Jn||le===q?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,xe=y.image[0]&&y.image[0].isDataTexture,ae=[];for(let Q=0;Q<6;Q++)!me&&!xe?ae[Q]=p(y.image[Q],!0,i.maxCubemapSize):ae[Q]=xe?y.image[Q].image:y.image[Q],ae[Q]=ue(y,ae[Q]);const ie=ae[0],Ie=r.convert(y.format,y.colorSpace),ze=r.convert(y.type),Qe=b(y.internalFormat,Ie,ze,y.normalized,y.colorSpace),U=y.isVideoTexture!==!0,se=ne.__version===void 0||$===!0,Y=ee.dataReady;let ge=T(y,ie);Ce(s.TEXTURE_CUBE_MAP,y);let oe;if(me){U&&se&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,Qe,ie.width,ie.height);for(let Q=0;Q<6;Q++){oe=ae[Q].mipmaps;for(let be=0;be<oe.length;be++){const Fe=oe[be];y.format!==Wn?Ie!==null?U?Y&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,Fe.width,Fe.height,Ie,Fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Qe,Fe.width,Fe.height,0,Fe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,Fe.width,Fe.height,Ie,ze,Fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Qe,Fe.width,Fe.height,0,Ie,ze,Fe.data)}}}else{if(oe=y.mipmaps,U&&se){oe.length>0&&ge++;const Q=Et(ae[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,Qe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(xe){U?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ae[Q].width,ae[Q].height,Ie,ze,ae[Q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Qe,ae[Q].width,ae[Q].height,0,Ie,ze,ae[Q].data);for(let be=0;be<oe.length;be++){const At=oe[be].image[Q].image;U?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,At.width,At.height,Ie,ze,At.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Qe,At.width,At.height,0,Ie,ze,At.data)}}else{U?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ie,ze,ae[Q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Qe,Ie,ze,ae[Q]);for(let be=0;be<oe.length;be++){const Fe=oe[be];U?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,Ie,ze,Fe.image[Q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Qe,Ie,ze,Fe.image[Q])}}}m(y)&&x(s.TEXTURE_CUBE_MAP),ne.__version=ee.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Pe(C,y,V,$,ee,ne){const le=r.convert(V.format,V.colorSpace),q=r.convert(V.type),j=b(V.internalFormat,le,q,V.normalized,V.colorSpace),me=n.get(y),xe=n.get(V);if(xe.__renderTarget=y,!me.__hasExternalTextures){const ae=Math.max(1,y.width>>ne),ie=Math.max(1,y.height>>ne);ee===s.TEXTURE_3D||ee===s.TEXTURE_2D_ARRAY?t.texImage3D(ee,ne,j,ae,ie,y.depth,0,le,q,null):t.texImage2D(ee,ne,j,ae,ie,0,le,q,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),qe(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,ee,xe.__webglTexture,0,Ot(y)):(ee===s.TEXTURE_2D||ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,ee,xe.__webglTexture,ne),t.bindFramebuffer(s.FRAMEBUFFER,null)}function gt(C,y,V){if(s.bindRenderbuffer(s.RENDERBUFFER,C),y.depthBuffer){const $=y.depthTexture,ee=$&&$.isDepthTexture?$.type:null,ne=A(y.stencilBuffer,ee),le=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;qe(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ot(y),ne,y.width,y.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ot(y),ne,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,ne,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,le,s.RENDERBUFFER,C)}else{const $=y.textures;for(let ee=0;ee<$.length;ee++){const ne=$[ee],le=r.convert(ne.format,ne.colorSpace),q=r.convert(ne.type),j=b(ne.internalFormat,le,q,ne.normalized,ne.colorSpace);qe(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ot(y),j,y.width,y.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ot(y),j,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,j,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Xe(C,y,V){const $=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(y.depthTexture);if(ee.__renderTarget=y,(!ee.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),$){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,y.depthTexture.addEventListener("dispose",w)),ee.__webglTexture===void 0){ee.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),Ce(s.TEXTURE_CUBE_MAP,y.depthTexture);const me=r.convert(y.depthTexture.format),xe=r.convert(y.depthTexture.type);let ae;y.depthTexture.format===bi?ae=s.DEPTH_COMPONENT24:y.depthTexture.format===cs&&(ae=s.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ae,y.width,y.height,0,me,xe,null)}}else K(y.depthTexture,0);const ne=ee.__webglTexture,le=Ot(y),q=$?s.TEXTURE_CUBE_MAP_POSITIVE_X+V:s.TEXTURE_2D,j=y.depthTexture.format===cs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===bi)qe(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,q,ne,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,j,q,ne,0);else if(y.depthTexture.format===cs)qe(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,q,ne,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,j,q,ne,0);else throw new Error("Unknown depthTexture format")}function nt(C){const y=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const $=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const ee=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",ee)};$.addEventListener("dispose",ee),y.__depthDisposeCallback=ee}y.__boundDepthTexture=$}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(V)for(let $=0;$<6;$++)Xe(y.__webglFramebuffer[$],C,$);else{const $=C.texture.mipmaps;$&&$.length>0?Xe(y.__webglFramebuffer[0],C,0):Xe(y.__webglFramebuffer,C,0)}else if(V){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=s.createRenderbuffer(),gt(y.__webglDepthbuffer[$],C,!1);else{const ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=y.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,ne)}}else{const $=C.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),gt(y.__webglDepthbuffer,C,!1);else{const ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,ne)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function pt(C,y,V){const $=n.get(C);y!==void 0&&Pe($.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&nt(C)}function He(C){const y=C.texture,V=n.get(C),$=n.get(y);C.addEventListener("dispose",v);const ee=C.textures,ne=C.isWebGLCubeRenderTarget===!0,le=ee.length>1;if(le||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=y.version,a.memory.textures++),ne){V.__webglFramebuffer=[];for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[q]=[];for(let j=0;j<y.mipmaps.length;j++)V.__webglFramebuffer[q][j]=s.createFramebuffer()}else V.__webglFramebuffer[q]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let q=0;q<y.mipmaps.length;q++)V.__webglFramebuffer[q]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(le)for(let q=0,j=ee.length;q<j;q++){const me=n.get(ee[q]);me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&qe(C)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let q=0;q<ee.length;q++){const j=ee[q];V.__webglColorRenderbuffer[q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[q]);const me=r.convert(j.format,j.colorSpace),xe=r.convert(j.type),ae=b(j.internalFormat,me,xe,j.normalized,j.colorSpace,C.isXRRenderTarget===!0),ie=Ot(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ie,ae,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+q,s.RENDERBUFFER,V.__webglColorRenderbuffer[q])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),gt(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ne){t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),Ce(s.TEXTURE_CUBE_MAP,y);for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)Pe(V.__webglFramebuffer[q][j],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,j);else Pe(V.__webglFramebuffer[q],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(y)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let q=0,j=ee.length;q<j;q++){const me=ee[q],xe=n.get(me);let ae=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ae,xe.__webglTexture),Ce(ae,me),Pe(V.__webglFramebuffer,C,me,s.COLOR_ATTACHMENT0+q,ae,0),m(me)&&x(ae)}t.unbindTexture()}else{let q=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(q=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(q,$.__webglTexture),Ce(q,y),y.mipmaps&&y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)Pe(V.__webglFramebuffer[j],C,y,s.COLOR_ATTACHMENT0,q,j);else Pe(V.__webglFramebuffer,C,y,s.COLOR_ATTACHMENT0,q,0);m(y)&&x(q),t.unbindTexture()}C.depthBuffer&&nt(C)}function Ft(C){const y=C.textures;for(let V=0,$=y.length;V<$;V++){const ee=y[V];if(m(ee)){const ne=S(C),le=n.get(ee).__webglTexture;t.bindTexture(ne,le),x(ne),t.unbindTexture()}}}const vt=[],gn=[];function F(C){if(C.samples>0){if(qe(C)===!1){const y=C.textures,V=C.width,$=C.height;let ee=s.COLOR_BUFFER_BIT;const ne=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=n.get(C),q=y.length>1;if(q)for(let me=0;me<y.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const j=C.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let me=0;me<y.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=s.STENCIL_BUFFER_BIT)),q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(y[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,xe,0)}s.blitFramebuffer(0,0,V,$,0,0,V,$,ee,s.NEAREST),l===!0&&(vt.length=0,gn.length=0,vt.push(s.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(vt.push(ne),gn.push(ne),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,gn)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),q)for(let me=0;me<y.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(y[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function Ot(C){return Math.min(i.maxSamples,C.samples)}function qe(C){const y=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ht(C){const y=a.render.frame;u.get(C)!==y&&(u.set(C,y),C.update())}function ue(C,y){const V=C.colorSpace,$=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==zr&&V!==Jn&&(Ye.getTransfer(V)===et?($!==Wn||ee!==Sn)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",V)),y}function Et(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=z,this.getTextureUnits=O,this.setTextureUnits=L,this.setTexture2D=K,this.setTexture2DArray=J,this.setTexture3D=te,this.setTextureCube=_e,this.rebindTextures=pt,this.setupRenderTarget=He,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function kx(s,e){function t(n,i=Jn){let r;const a=Ye.getTransfer(i);if(n===Sn)return s.UNSIGNED_BYTE;if(n===Fc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Oc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===dd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===fd)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ud)return s.BYTE;if(n===hd)return s.SHORT;if(n===Or)return s.UNSIGNED_SHORT;if(n===Nc)return s.INT;if(n===ri)return s.UNSIGNED_INT;if(n===En)return s.FLOAT;if(n===Kt)return s.HALF_FLOAT;if(n===pd)return s.ALPHA;if(n===md)return s.RGB;if(n===Wn)return s.RGBA;if(n===bi)return s.DEPTH_COMPONENT;if(n===cs)return s.DEPTH_STENCIL;if(n===_d)return s.RED;if(n===Bc)return s.RED_INTEGER;if(n===ys)return s.RG;if(n===zc)return s.RG_INTEGER;if(n===kc)return s.RGBA_INTEGER;if(n===Wa||n===Xa||n===qa||n===Ya)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ya)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Rl||n===Pl||n===Dl||n===Ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Dl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Il||n===Ul||n===Nl||n===Fl||n===Ol||n===eo||n===Bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Il||n===Ul)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Nl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Fl)return r.COMPRESSED_R11_EAC;if(n===Ol)return r.COMPRESSED_SIGNED_R11_EAC;if(n===eo)return r.COMPRESSED_RG11_EAC;if(n===Bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===zl||n===kl||n===Vl||n===Gl||n===Hl||n===Wl||n===Xl||n===ql||n===Yl||n===$l||n===jl||n===Kl||n===Zl||n===Jl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ql)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$l)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jl)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ql||n===ec||n===tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ql)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nc||n===ic||n===to||n===sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===nc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Br?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Hx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ed(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Nt({vertexShader:Vx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new vo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Wx extends Es{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",p=new Hx,m={},x=t.getContextAttributes();let S=null,b=null;const A=[],T=[],w=new we;let v=null;const M=new In;M.viewport=new ut;const P=new In;P.viewport=new ut;const R=[M,P],D=new $m;let z=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let pe=A[Z];return pe===void 0&&(pe=new Uo,A[Z]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(Z){let pe=A[Z];return pe===void 0&&(pe=new Uo,A[Z]=pe),pe.getGripSpace()},this.getHand=function(Z){let pe=A[Z];return pe===void 0&&(pe=new Uo,A[Z]=pe),pe.getHandSpace()};function L(Z){const pe=T.indexOf(Z.inputSource);if(pe===-1)return;const re=A[pe];re!==void 0&&(re.update(Z.inputSource,Z.frame,c||a),re.dispatchEvent({type:Z.type,data:Z.inputSource}))}function N(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",k);for(let Z=0;Z<A.length;Z++){const pe=T[Z];pe!==null&&(T[Z]=null,A[Z].disconnect(pe))}z=null,O=null,p.reset();for(const Z in m)delete m[Z];e.setRenderTarget(S),f=null,d=null,h=null,i=null,b=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(S=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",N),i.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Re=null,Ue=null;x.depth&&(Ue=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=x.stencil?cs:bi,Re=x.stencil?Br:ri);const Pe={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Pe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new hn(d.textureWidth,d.textureHeight,{format:Wn,type:Sn,depthTexture:new ar(d.textureWidth,d.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new hn(f.framebufferWidth,f.framebufferHeight,{format:Wn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ce.setContext(i),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(Z){for(let pe=0;pe<Z.removed.length;pe++){const re=Z.removed[pe],Re=T.indexOf(re);Re>=0&&(T[Re]=null,A[Re].disconnect(re))}for(let pe=0;pe<Z.added.length;pe++){const re=Z.added[pe];let Re=T.indexOf(re);if(Re===-1){for(let Pe=0;Pe<A.length;Pe++)if(Pe>=T.length){T.push(re),Re=Pe;break}else if(T[Pe]===null){T[Pe]=re,Re=Pe;break}if(Re===-1)break}const Ue=A[Re];Ue&&Ue.connect(re)}}const K=new I,J=new I;function te(Z,pe,re){K.setFromMatrixPosition(pe.matrixWorld),J.setFromMatrixPosition(re.matrixWorld);const Re=K.distanceTo(J),Ue=pe.projectionMatrix.elements,Pe=re.projectionMatrix.elements,gt=Ue[14]/(Ue[10]-1),Xe=Ue[14]/(Ue[10]+1),nt=(Ue[9]+1)/Ue[5],pt=(Ue[9]-1)/Ue[5],He=(Ue[8]-1)/Ue[0],Ft=(Pe[8]+1)/Pe[0],vt=gt*He,gn=gt*Ft,F=Re/(-He+Ft),Ot=F*-He;if(pe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ot),Z.translateZ(F),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ue[10]===-1)Z.projectionMatrix.copy(pe.projectionMatrix),Z.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const qe=gt+F,ht=Xe+F,ue=vt-Ot,Et=gn+(Re-Ot),C=nt*Xe/ht*qe,y=pt*Xe/ht*qe;Z.projectionMatrix.makePerspective(ue,Et,C,y,qe,ht),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function _e(Z,pe){pe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(pe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let pe=Z.near,re=Z.far;p.texture!==null&&(p.depthNear>0&&(pe=p.depthNear),p.depthFar>0&&(re=p.depthFar)),D.near=P.near=M.near=pe,D.far=P.far=M.far=re,(z!==D.near||O!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),z=D.near,O=D.far),D.layers.mask=Z.layers.mask|6,M.layers.mask=D.layers.mask&-5,P.layers.mask=D.layers.mask&-3;const Re=Z.parent,Ue=D.cameras;_e(D,Re);for(let Pe=0;Pe<Ue.length;Pe++)_e(Ue[Pe],Re);Ue.length===2?te(D,M,P):D.projectionMatrix.copy(M.projectionMatrix),he(Z,D,Re)};function he(Z,pe,re){re===null?Z.matrix.copy(pe.matrixWorld):(Z.matrix.copy(re.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(pe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(pe.projectionMatrix),Z.projectionMatrixInverse.copy(pe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Gr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function(Z){return m[Z]};let De=null;function Be(Z,pe){if(u=pe.getViewerPose(c||a),g=pe,u!==null){const re=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Re=!1;re.length!==D.cameras.length&&(D.cameras.length=0,Re=!0);for(let Xe=0;Xe<re.length;Xe++){const nt=re[Xe];let pt=null;if(f!==null)pt=f.getViewport(nt);else{const Ft=h.getViewSubImage(d,nt);pt=Ft.viewport,Xe===0&&(e.setRenderTargetTextures(b,Ft.colorTexture,Ft.depthStencilTexture),e.setRenderTarget(b))}let He=R[Xe];He===void 0&&(He=new In,He.layers.enable(Xe),He.viewport=new ut,R[Xe]=He),He.matrix.fromArray(nt.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(nt.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(pt.x,pt.y,pt.width,pt.height),Xe===0&&(D.matrix.copy(He.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Re===!0&&D.cameras.push(He)}const Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const Xe=h.getDepthInformation(re[0]);Xe&&Xe.isValid&&Xe.texture&&p.init(Xe,i.renderState)}if(Ue&&Ue.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let Xe=0;Xe<re.length;Xe++){const nt=re[Xe].camera;if(nt){let pt=m[nt];pt||(pt=new Ed,m[nt]=pt);const He=h.getCameraImage(nt);pt.sourceTexture=He}}}}for(let re=0;re<A.length;re++){const Re=T[re],Ue=A[re];Re!==null&&Ue!==void 0&&Ue.update(Re,pe,c||a)}De&&De(Z,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),g=null}const Ce=new Pd;Ce.setAnimationLoop(Be),this.setAnimationLoop=function(Z){De=Z},this.dispose=function(){}}}const Xx=new _t,Od=new Ne;Od.set(-1,0,0,0,1,0,0,0,1);function qx(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Td(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,S,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,x,S):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===un&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===un&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m),S=x.envMap,b=x.envMapRotation;S&&(p.envMap.value=S,p.envMapRotation.value.setFromMatrix4(Xx.makeRotationFromEuler(b)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Od),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,S){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=S*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===un&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Yx(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,S){const b=S.program;n.uniformBlockBinding(x,b)}function c(x,S){let b=i[x.id];b===void 0&&(g(x),b=u(x),i[x.id]=b,x.addEventListener("dispose",p));const A=S.program;n.updateUBOMapping(x,A);const T=e.render.frame;r[x.id]!==T&&(d(x),r[x.id]=T)}function u(x){const S=h();x.__bindingPointIndex=S;const b=s.createBuffer(),A=x.__size,T=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,A,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,b),b}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const S=i[x.id],b=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let T=0,w=b.length;T<w;T++){const v=Array.isArray(b[T])?b[T]:[b[T]];for(let M=0,P=v.length;M<P;M++){const R=v[M];if(f(R,T,M,A)===!0){const D=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let O=0;for(let L=0;L<z.length;L++){const N=z[L],k=_(N);typeof N=="number"||typeof N=="boolean"?(R.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,D+O,R.__data)):N.isMatrix3?(R.__data[0]=N.elements[0],R.__data[1]=N.elements[1],R.__data[2]=N.elements[2],R.__data[3]=0,R.__data[4]=N.elements[3],R.__data[5]=N.elements[4],R.__data[6]=N.elements[5],R.__data[7]=0,R.__data[8]=N.elements[6],R.__data[9]=N.elements[7],R.__data[10]=N.elements[8],R.__data[11]=0):ArrayBuffer.isView(N)?R.__data.set(new N.constructor(N.buffer,N.byteOffset,R.__data.length)):(N.toArray(R.__data,O),O+=k.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,S,b,A){const T=x.value,w=S+"_"+b;if(A[w]===void 0)return typeof T=="number"||typeof T=="boolean"?A[w]=T:ArrayBuffer.isView(T)?A[w]=T.slice():A[w]=T.clone(),!0;{const v=A[w];if(typeof T=="number"||typeof T=="boolean"){if(v!==T)return A[w]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(v.equals(T)===!1)return v.copy(T),!0}}return!1}function g(x){const S=x.uniforms;let b=0;const A=16;for(let w=0,v=S.length;w<v;w++){const M=Array.isArray(S[w])?S[w]:[S[w]];for(let P=0,R=M.length;P<R;P++){const D=M[P],z=Array.isArray(D.value)?D.value:[D.value];for(let O=0,L=z.length;O<L;O++){const N=z[O],k=_(N),K=b%A,J=K%k.boundary,te=K+J;b+=J,te!==0&&A-te<k.storage&&(b+=A-te),D.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=k.storage}}}const T=b%A;return T>0&&(b+=A-T),x.__size=b,x.__cache={},this}function _(x){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",x),S}function p(x){const S=x.target;S.removeEventListener("dispose",p);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:m}}const $x=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let $n=null;function jx(){return $n===null&&($n=new Sd($x,16,16,ys,Kt),$n.name="DFG_LUT",$n.minFilter=Dt,$n.magFilter=Dt,$n.wrapS=Nn,$n.wrapT=Nn,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}class Kx{constructor(e={}){const{canvas:t=Up(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Sn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=f,p=new Set([kc,zc,Bc]),m=new Set([Sn,ri,Or,Br,Fc,Oc]),x=new Uint32Array(4),S=new Int32Array(4),b=new I;let A=null,T=null;const w=[],v=[];let M=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,D=null;this._outputColorSpace=on;let z=0,O=0,L=null,N=-1,k=null;const K=new ut,J=new ut;let te=null;const _e=new Se(0);let he=0,De=t.width,Be=t.height,Ce=1,Z=null,pe=null;const re=new ut(0,0,De,Be),Re=new ut(0,0,De,Be);let Ue=!1;const Pe=new $c;let gt=!1,Xe=!1;const nt=new _t,pt=new I,He=new ut,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let vt=!1;function gn(){return L===null?Ce:1}let F=n;function Ot(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ac}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",Fe,!1),F===null){const B="webgl2";if(F=Ot(B,E),F===null)throw Ot(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw $e("WebGLRenderer: "+E.message),E}let qe,ht,ue,Et,C,y,V,$,ee,ne,le,q,j,me,xe,ae,ie,Ie,ze,Qe,U,se,Y;function ge(){qe=new j0(F),qe.init(),U=new kx(F,qe),ht=new V0(F,qe,e,U),ue=new Bx(F,qe),ht.reversedDepthBuffer&&d&&ue.buffers.depth.setReversed(!0),Et=new J0(F),C=new Ex,y=new zx(F,qe,ue,C,ht,U,Et),V=new $0(P),$=new n_(F),se=new z0(F,$),ee=new K0(F,$,Et,se),ne=new ev(F,ee,$,se,Et),Ie=new Q0(F,ht,y),xe=new G0(C),le=new bx(P,V,qe,ht,se,xe),q=new qx(P,C),j=new wx,me=new Lx(qe),ie=new B0(P,V,ue,ne,g,l),ae=new Ox(P,ne,ht),Y=new Yx(F,Et,ht,ue),ze=new k0(F,qe,Et),Qe=new Z0(F,qe,Et),Et.programs=le.programs,P.capabilities=ht,P.extensions=qe,P.properties=C,P.renderLists=j,P.shadowMap=ae,P.state=ue,P.info=Et}ge(),_!==Sn&&(M=new nv(_,t.width,t.height,i,r));const oe=new Wx(P,F);this.xr=oe,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const E=qe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=qe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Ce},this.setPixelRatio=function(E){E!==void 0&&(Ce=E,this.setSize(De,Be,!1))},this.getSize=function(E){return E.set(De,Be)},this.setSize=function(E,B,W=!0){if(oe.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}De=E,Be=B,t.width=Math.floor(E*Ce),t.height=Math.floor(B*Ce),W===!0&&(t.style.width=E+"px",t.style.height=B+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(De*Ce,Be*Ce).floor()},this.setDrawingBufferSize=function(E,B,W){De=E,Be=B,Ce=W,t.width=Math.floor(E*W),t.height=Math.floor(B*W),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(_===Sn){$e("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Ae("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(K)},this.getViewport=function(E){return E.copy(re)},this.setViewport=function(E,B,W,G){E.isVector4?re.set(E.x,E.y,E.z,E.w):re.set(E,B,W,G),ue.viewport(K.copy(re).multiplyScalar(Ce).round())},this.getScissor=function(E){return E.copy(Re)},this.setScissor=function(E,B,W,G){E.isVector4?Re.set(E.x,E.y,E.z,E.w):Re.set(E,B,W,G),ue.scissor(J.copy(Re).multiplyScalar(Ce).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(E){ue.setScissorTest(Ue=E)},this.setOpaqueSort=function(E){Z=E},this.setTransparentSort=function(E){pe=E},this.getClearColor=function(E){return E.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,W=!0){let G=0;if(E){let H=!1;if(L!==null){const fe=L.texture.format;H=p.has(fe)}if(H){const fe=L.texture.type,Me=m.has(fe),de=ie.getClearColor(),ye=ie.getClearAlpha(),Ee=de.r,Oe=de.g,Ge=de.b;Me?(x[0]=Ee,x[1]=Oe,x[2]=Ge,x[3]=ye,F.clearBufferuiv(F.COLOR,0,x)):(S[0]=Ee,S[1]=Oe,S[2]=Ge,S[3]=ye,F.clearBufferiv(F.COLOR,0,S))}else G|=F.COLOR_BUFFER_BIT}B&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),D=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",Fe,!1),ie.dispose(),j.dispose(),me.dispose(),C.dispose(),V.dispose(),ne.dispose(),se.dispose(),Y.dispose(),le.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",bu),oe.removeEventListener("sessionend",Eu),Zi.stop()};function Q(E){E.preventDefault(),so("WebGLRenderer: Context Lost."),R=!0}function be(){so("WebGLRenderer: Context Restored."),R=!1;const E=Et.autoReset,B=ae.enabled,W=ae.autoUpdate,G=ae.needsUpdate,H=ae.type;ge(),Et.autoReset=E,ae.enabled=B,ae.autoUpdate=W,ae.needsUpdate=G,ae.type=H}function Fe(E){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function At(E){const B=E.target;B.removeEventListener("dispose",At),it(B)}function it(E){oi(E),C.remove(E)}function oi(E){const B=C.get(E).programs;B!==void 0&&(B.forEach(function(W){le.releaseProgram(W)}),E.isShaderMaterial&&le.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,W,G,H,fe){B===null&&(B=Ft);const Me=H.isMesh&&H.matrixWorld.determinant()<0,de=kf(E,B,W,G,H);ue.setMaterial(G,Me);let ye=W.index,Ee=1;if(G.wireframe===!0){if(ye=ee.getWireframeAttribute(W),ye===void 0)return;Ee=2}const Oe=W.drawRange,Ge=W.attributes.position;let Te=Oe.start*Ee,st=(Oe.start+Oe.count)*Ee;fe!==null&&(Te=Math.max(Te,fe.start*Ee),st=Math.min(st,(fe.start+fe.count)*Ee)),ye!==null?(Te=Math.max(Te,0),st=Math.min(st,ye.count)):Ge!=null&&(Te=Math.max(Te,0),st=Math.min(st,Ge.count));const Ct=st-Te;if(Ct<0||Ct===1/0)return;se.setup(H,G,de,W,ye);let Tt,at=ze;if(ye!==null&&(Tt=$.get(ye),at=Qe,at.setIndex(Tt)),H.isMesh)G.wireframe===!0?(ue.setLineWidth(G.wireframeLinewidth*gn()),at.setMode(F.LINES)):at.setMode(F.TRIANGLES);else if(H.isLine){let Jt=G.linewidth;Jt===void 0&&(Jt=1),ue.setLineWidth(Jt*gn()),H.isLineSegments?at.setMode(F.LINES):H.isLineLoop?at.setMode(F.LINE_LOOP):at.setMode(F.LINE_STRIP)}else H.isPoints?at.setMode(F.POINTS):H.isSprite&&at.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(qe.get("WEBGL_multi_draw"))at.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Jt=H._multiDrawStarts,ve=H._multiDrawCounts,vn=H._multiDrawCount,Je=ye?$.get(ye).bytesPerElement:1,Pn=C.get(G).currentProgram.getUniforms();for(let qn=0;qn<vn;qn++)Pn.setValue(F,"_gl_DrawID",qn),at.render(Jt[qn]/Je,ve[qn])}else if(H.isInstancedMesh)at.renderInstances(Te,Ct,H.count);else if(W.isInstancedBufferGeometry){const Jt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ve=Math.min(W.instanceCount,Jt);at.renderInstances(Te,Ct,ve)}else at.render(Te,Ct)};function Xn(E,B,W){E.transparent===!0&&E.side===Un&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,sa(E,B,W),E.side=Si,E.needsUpdate=!0,sa(E,B,W),E.side=Un):sa(E,B,W)}this.compile=function(E,B,W=null){W===null&&(W=E),T=me.get(W),T.init(B),v.push(T),W.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),E!==W&&E.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights();const G=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const fe=H.material;if(fe)if(Array.isArray(fe))for(let Me=0;Me<fe.length;Me++){const de=fe[Me];Xn(de,W,H),G.add(de)}else Xn(fe,W,H),G.add(fe)}),T=v.pop(),G},this.compileAsync=function(E,B,W=null){const G=this.compile(E,B,W);return new Promise(H=>{function fe(){if(G.forEach(function(Me){C.get(Me).currentProgram.isReady()&&G.delete(Me)}),G.size===0){H(E);return}setTimeout(fe,10)}qe.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let To=null;function Bf(E){To&&To(E)}function bu(){Zi.stop()}function Eu(){Zi.start()}const Zi=new Pd;Zi.setAnimationLoop(Bf),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(E){To=E,oe.setAnimationLoop(E),E===null?Zi.stop():Zi.start()},oe.addEventListener("sessionstart",bu),oe.addEventListener("sessionend",Eu),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;D!==null&&D.renderStart(E,B);const W=oe.enabled===!0&&oe.isPresenting===!0,G=M!==null&&(L===null||W)&&M.begin(P,L);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(B),B=oe.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,B,L),T=me.get(E,v.length),T.init(B),T.state.textureUnits=y.getTextureUnits(),v.push(T),nt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Pe.setFromProjectionMatrix(nt,ti,B.reversedDepth),Xe=this.localClippingEnabled,gt=xe.init(this.clippingPlanes,Xe),A=j.get(E,w.length),A.init(),w.push(A),oe.enabled===!0&&oe.isPresenting===!0){const Me=P.xr.getDepthSensingMesh();Me!==null&&wo(Me,B,-1/0,P.sortObjects)}wo(E,B,0,P.sortObjects),A.finish(),P.sortObjects===!0&&A.sort(Z,pe),vt=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,vt&&ie.addToRenderList(A,E),this.info.render.frame++,gt===!0&&xe.beginShadows();const H=T.state.shadowsArray;if(ae.render(H,E,B),gt===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&M.hasRenderPass())===!1){const Me=A.opaque,de=A.transmissive;if(T.setupLights(),B.isArrayCamera){const ye=B.cameras;if(de.length>0)for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const Ge=ye[Ee];wu(Me,de,E,Ge)}vt&&ie.render(E);for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const Ge=ye[Ee];Tu(A,E,Ge,Ge.viewport)}}else de.length>0&&wu(Me,de,E,B),vt&&ie.render(E),Tu(A,E,B)}L!==null&&O===0&&(y.updateMultisampleRenderTarget(L),y.updateRenderTargetMipmap(L)),G&&M.end(P),E.isScene===!0&&E.onAfterRender(P,E,B),se.resetDefaultState(),N=-1,k=null,v.pop(),v.length>0?(T=v[v.length-1],y.setTextureUnits(T.state.textureUnits),gt===!0&&xe.setGlobalState(P.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?A=w[w.length-1]:A=null,D!==null&&D.renderEnd()};function wo(E,B,W,G){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Pe.intersectsSprite(E)){G&&He.setFromMatrixPosition(E.matrixWorld).applyMatrix4(nt);const Me=ne.update(E),de=E.material;de.visible&&A.push(E,Me,de,W,He.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Pe.intersectsObject(E))){const Me=ne.update(E),de=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),He.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),He.copy(Me.boundingSphere.center)),He.applyMatrix4(E.matrixWorld).applyMatrix4(nt)),Array.isArray(de)){const ye=Me.groups;for(let Ee=0,Oe=ye.length;Ee<Oe;Ee++){const Ge=ye[Ee],Te=de[Ge.materialIndex];Te&&Te.visible&&A.push(E,Me,Te,W,He.z,Ge)}}else de.visible&&A.push(E,Me,de,W,He.z,null)}}const fe=E.children;for(let Me=0,de=fe.length;Me<de;Me++)wo(fe[Me],B,W,G)}function Tu(E,B,W,G){const{opaque:H,transmissive:fe,transparent:Me}=E;T.setupLightsView(W),gt===!0&&xe.setGlobalState(P.clippingPlanes,W),G&&ue.viewport(K.copy(G)),H.length>0&&ia(H,B,W),fe.length>0&&ia(fe,B,W),Me.length>0&&ia(Me,B,W),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function wu(E,B,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[G.id]===void 0){const Te=qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[G.id]=new hn(1,1,{generateMipmaps:!0,type:Te?Kt:Sn,minFilter:Fi,samples:Math.max(4,ht.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const fe=T.state.transmissionRenderTarget[G.id],Me=G.viewport||K;fe.setSize(Me.z*P.transmissionResolutionScale,Me.w*P.transmissionResolutionScale);const de=P.getRenderTarget(),ye=P.getActiveCubeFace(),Ee=P.getActiveMipmapLevel();P.setRenderTarget(fe),P.getClearColor(_e),he=P.getClearAlpha(),he<1&&P.setClearColor(16777215,.5),P.clear(),vt&&ie.render(W);const Oe=P.toneMapping;P.toneMapping=si;const Ge=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),T.setupLightsView(G),gt===!0&&xe.setGlobalState(P.clippingPlanes,G),ia(E,W,G),y.updateMultisampleRenderTarget(fe),y.updateRenderTargetMipmap(fe),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let st=0,Ct=B.length;st<Ct;st++){const Tt=B[st],{object:at,geometry:Jt,material:ve,group:vn}=Tt;if(ve.side===Un&&at.layers.test(G.layers)){const Je=ve.side;ve.side=un,ve.needsUpdate=!0,Au(at,W,G,Jt,ve,vn),ve.side=Je,ve.needsUpdate=!0,Te=!0}}Te===!0&&(y.updateMultisampleRenderTarget(fe),y.updateRenderTargetMipmap(fe))}P.setRenderTarget(de,ye,Ee),P.setClearColor(_e,he),Ge!==void 0&&(G.viewport=Ge),P.toneMapping=Oe}function ia(E,B,W){const G=B.isScene===!0?B.overrideMaterial:null;for(let H=0,fe=E.length;H<fe;H++){const Me=E[H],{object:de,geometry:ye,group:Ee}=Me;let Oe=Me.material;Oe.allowOverride===!0&&G!==null&&(Oe=G),de.layers.test(W.layers)&&Au(de,B,W,ye,Oe,Ee)}}function Au(E,B,W,G,H,fe){E.onBeforeRender(P,B,W,G,H,fe),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(P,B,W,G,E,fe),H.transparent===!0&&H.side===Un&&H.forceSinglePass===!1?(H.side=un,H.needsUpdate=!0,P.renderBufferDirect(W,B,G,H,E,fe),H.side=Si,H.needsUpdate=!0,P.renderBufferDirect(W,B,G,H,E,fe),H.side=Un):P.renderBufferDirect(W,B,G,H,E,fe),E.onAfterRender(P,B,W,G,H,fe)}function sa(E,B,W){B.isScene!==!0&&(B=Ft);const G=C.get(E),H=T.state.lights,fe=T.state.shadowsArray,Me=H.state.version,de=le.getParameters(E,H.state,fe,B,W,T.state.lightProbeGridArray),ye=le.getProgramCacheKey(de);let Ee=G.programs;G.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,G.fog=B.fog;const Oe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;G.envMap=V.get(E.envMap||G.environment,Oe),G.envMapRotation=G.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Ee===void 0&&(E.addEventListener("dispose",At),Ee=new Map,G.programs=Ee);let Ge=Ee.get(ye);if(Ge!==void 0){if(G.currentProgram===Ge&&G.lightsStateVersion===Me)return Ru(E,de),Ge}else de.uniforms=le.getUniforms(E),D!==null&&E.isNodeMaterial&&D.build(E,W,de),E.onBeforeCompile(de,P),Ge=le.acquireProgram(de,ye),Ee.set(ye,Ge),G.uniforms=de.uniforms;const Te=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Te.clippingPlanes=xe.uniform),Ru(E,de),G.needsLights=Gf(E),G.lightsStateVersion=Me,G.needsLights&&(Te.ambientLightColor.value=H.state.ambient,Te.lightProbe.value=H.state.probe,Te.directionalLights.value=H.state.directional,Te.directionalLightShadows.value=H.state.directionalShadow,Te.spotLights.value=H.state.spot,Te.spotLightShadows.value=H.state.spotShadow,Te.rectAreaLights.value=H.state.rectArea,Te.ltc_1.value=H.state.rectAreaLTC1,Te.ltc_2.value=H.state.rectAreaLTC2,Te.pointLights.value=H.state.point,Te.pointLightShadows.value=H.state.pointShadow,Te.hemisphereLights.value=H.state.hemi,Te.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Te.spotLightMatrix.value=H.state.spotLightMatrix,Te.spotLightMap.value=H.state.spotLightMap,Te.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=T.state.lightProbeGridArray.length>0,G.currentProgram=Ge,G.uniformsList=null,Ge}function Cu(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=$a.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Ru(E,B){const W=C.get(E);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function zf(E,B){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;b.setFromMatrixPosition(B.matrixWorld);for(let W=0,G=E.length;W<G;W++){const H=E[W];if(H.texture!==null&&H.boundingBox.containsPoint(b))return H}return null}function kf(E,B,W,G,H){B.isScene!==!0&&(B=Ft),y.resetTextureUnits();const fe=B.fog,Me=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?B.environment:null,de=L===null?P.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ye.workingColorSpace,ye=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ee=V.get(G.envMap||Me,ye),Oe=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ge=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Te=!!W.morphAttributes.position,st=!!W.morphAttributes.normal,Ct=!!W.morphAttributes.color;let Tt=si;G.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Tt=P.toneMapping);const at=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Jt=at!==void 0?at.length:0,ve=C.get(G),vn=T.state.lights;if(gt===!0&&(Xe===!0||E!==k)){const dt=E===k&&G.id===N;xe.setState(G,E,dt)}let Je=!1;G.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==vn.state.version||ve.outputColorSpace!==de||H.isBatchedMesh&&ve.batching===!1||!H.isBatchedMesh&&ve.batching===!0||H.isBatchedMesh&&ve.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&ve.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&ve.instancing===!1||!H.isInstancedMesh&&ve.instancing===!0||H.isSkinnedMesh&&ve.skinning===!1||!H.isSkinnedMesh&&ve.skinning===!0||H.isInstancedMesh&&ve.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&ve.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&ve.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&ve.instancingMorph===!1&&H.morphTexture!==null||ve.envMap!==Ee||G.fog===!0&&ve.fog!==fe||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==xe.numPlanes||ve.numIntersection!==xe.numIntersection)||ve.vertexAlphas!==Oe||ve.vertexTangents!==Ge||ve.morphTargets!==Te||ve.morphNormals!==st||ve.morphColors!==Ct||ve.toneMapping!==Tt||ve.morphTargetsCount!==Jt||!!ve.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,ve.__version=G.version);let Pn=ve.currentProgram;Je===!0&&(Pn=sa(G,B,H),D&&G.isNodeMaterial&&D.onUpdateProgram(G,Pn,ve));let qn=!1,Ai=!1,As=!1;const ot=Pn.getUniforms(),Rt=ve.uniforms;if(ue.useProgram(Pn.program)&&(qn=!0,Ai=!0,As=!0),G.id!==N&&(N=G.id,Ai=!0),ve.needsLights){const dt=zf(T.state.lightProbeGridArray,H);ve.lightProbeGrid!==dt&&(ve.lightProbeGrid=dt,Ai=!0)}if(qn||k!==E){ue.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ot.setValue(F,"projectionMatrix",E.projectionMatrix),ot.setValue(F,"viewMatrix",E.matrixWorldInverse);const Ri=ot.map.cameraPosition;Ri!==void 0&&Ri.setValue(F,pt.setFromMatrixPosition(E.matrixWorld)),ht.logarithmicDepthBuffer&&ot.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ot.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),k!==E&&(k=E,Ai=!0,As=!0)}if(ve.needsLights&&(vn.state.directionalShadowMap.length>0&&ot.setValue(F,"directionalShadowMap",vn.state.directionalShadowMap,y),vn.state.spotShadowMap.length>0&&ot.setValue(F,"spotShadowMap",vn.state.spotShadowMap,y),vn.state.pointShadowMap.length>0&&ot.setValue(F,"pointShadowMap",vn.state.pointShadowMap,y)),H.isSkinnedMesh){ot.setOptional(F,H,"bindMatrix"),ot.setOptional(F,H,"bindMatrixInverse");const dt=H.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),ot.setValue(F,"boneTexture",dt.boneTexture,y))}H.isBatchedMesh&&(ot.setOptional(F,H,"batchingTexture"),ot.setValue(F,"batchingTexture",H._matricesTexture,y),ot.setOptional(F,H,"batchingIdTexture"),ot.setValue(F,"batchingIdTexture",H._indirectTexture,y),ot.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ot.setValue(F,"batchingColorTexture",H._colorsTexture,y));const Ci=W.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&Ie.update(H,W,Pn),(Ai||ve.receiveShadow!==H.receiveShadow)&&(ve.receiveShadow=H.receiveShadow,ot.setValue(F,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&B.environment!==null&&(Rt.envMapIntensity.value=B.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=jx()),Ai){if(ot.setValue(F,"toneMappingExposure",P.toneMappingExposure),ve.needsLights&&Vf(Rt,As),fe&&G.fog===!0&&q.refreshFogUniforms(Rt,fe),q.refreshMaterialUniforms(Rt,G,Ce,Be,T.state.transmissionRenderTarget[E.id]),ve.needsLights&&ve.lightProbeGrid){const dt=ve.lightProbeGrid;Rt.probesSH.value=dt.texture,Rt.probesMin.value.copy(dt.boundingBox.min),Rt.probesMax.value.copy(dt.boundingBox.max),Rt.probesResolution.value.copy(dt.resolution)}$a.upload(F,Cu(ve),Rt,y)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&($a.upload(F,Cu(ve),Rt,y),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ot.setValue(F,"center",H.center),ot.setValue(F,"modelViewMatrix",H.modelViewMatrix),ot.setValue(F,"normalMatrix",H.normalMatrix),ot.setValue(F,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const dt=G.uniformsGroups;for(let Ri=0,Cs=dt.length;Ri<Cs;Ri++){const Pu=dt[Ri];Y.update(Pu,Pn),Y.bind(Pu,Pn)}}return Pn}function Vf(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function Gf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,B,W){const G=C.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),C.get(E.texture).__webglTexture=B,C.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const W=C.get(E);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0};const Hf=F.createFramebuffer();this.setRenderTarget=function(E,B=0,W=0){L=E,z=B,O=W;let G=null,H=!1,fe=!1;if(E){const de=C.get(E);if(de.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(F.FRAMEBUFFER,de.__webglFramebuffer),K.copy(E.viewport),J.copy(E.scissor),te=E.scissorTest,ue.viewport(K),ue.scissor(J),ue.setScissorTest(te),N=-1;return}else if(de.__webglFramebuffer===void 0)y.setupRenderTarget(E);else if(de.__hasExternalTextures)y.rebindTextures(E,C.get(E.texture).__webglTexture,C.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Oe=E.depthTexture;if(de.__boundDepthTexture!==Oe){if(Oe!==null&&C.has(Oe)&&(E.width!==Oe.image.width||E.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(E)}}const ye=E.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(fe=!0);const Ee=C.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ee[B])?G=Ee[B][W]:G=Ee[B],H=!0):E.samples>0&&y.useMultisampledRTT(E)===!1?G=C.get(E).__webglMultisampledFramebuffer:Array.isArray(Ee)?G=Ee[W]:G=Ee,K.copy(E.viewport),J.copy(E.scissor),te=E.scissorTest}else K.copy(re).multiplyScalar(Ce).floor(),J.copy(Re).multiplyScalar(Ce).floor(),te=Ue;if(W!==0&&(G=Hf),ue.bindFramebuffer(F.FRAMEBUFFER,G)&&ue.drawBuffers(E,G),ue.viewport(K),ue.scissor(J),ue.setScissorTest(te),H){const de=C.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,de.__webglTexture,W)}else if(fe){const de=B;for(let ye=0;ye<E.textures.length;ye++){const Ee=C.get(E.textures[ye]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+ye,Ee.__webglTexture,W,de)}}else if(E!==null&&W!==0){const de=C.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,de.__webglTexture,W)}N=-1},this.readRenderTargetPixels=function(E,B,W,G,H,fe,Me,de=0){if(!(E&&E.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=C.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(ye=ye[Me]),ye){ue.bindFramebuffer(F.FRAMEBUFFER,ye);try{const Ee=E.textures[de],Oe=Ee.format,Ge=Ee.type;if(E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+de),!ht.textureFormatReadable(Oe)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(Ge)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-G&&W>=0&&W<=E.height-H&&F.readPixels(B,W,G,H,U.convert(Oe),U.convert(Ge),fe)}finally{const Ee=L!==null?C.get(L).__webglFramebuffer:null;ue.bindFramebuffer(F.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(E,B,W,G,H,fe,Me,de=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=C.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(ye=ye[Me]),ye)if(B>=0&&B<=E.width-G&&W>=0&&W<=E.height-H){ue.bindFramebuffer(F.FRAMEBUFFER,ye);const Ee=E.textures[de],Oe=Ee.format,Ge=Ee.type;if(E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+de),!ht.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Te),F.bufferData(F.PIXEL_PACK_BUFFER,fe.byteLength,F.STREAM_READ),F.readPixels(B,W,G,H,U.convert(Oe),U.convert(Ge),0);const st=L!==null?C.get(L).__webglFramebuffer:null;ue.bindFramebuffer(F.FRAMEBUFFER,st);const Ct=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Np(F,Ct,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Te),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,fe),F.deleteBuffer(Te),F.deleteSync(Ct),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,W=0){const G=Math.pow(2,-W),H=Math.floor(E.image.width*G),fe=Math.floor(E.image.height*G),Me=B!==null?B.x:0,de=B!==null?B.y:0;y.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,Me,de,H,fe),ue.unbindTexture()};const Wf=F.createFramebuffer(),Xf=F.createFramebuffer();this.copyTextureToTexture=function(E,B,W=null,G=null,H=0,fe=0){let Me,de,ye,Ee,Oe,Ge,Te,st,Ct;const Tt=E.isCompressedTexture?E.mipmaps[fe]:E.image;if(W!==null)Me=W.max.x-W.min.x,de=W.max.y-W.min.y,ye=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,Oe=W.min.y,Ge=W.isBox3?W.min.z:0;else{const Rt=Math.pow(2,-H);Me=Math.floor(Tt.width*Rt),de=Math.floor(Tt.height*Rt),E.isDataArrayTexture?ye=Tt.depth:E.isData3DTexture?ye=Math.floor(Tt.depth*Rt):ye=1,Ee=0,Oe=0,Ge=0}G!==null?(Te=G.x,st=G.y,Ct=G.z):(Te=0,st=0,Ct=0);const at=U.convert(B.format),Jt=U.convert(B.type);let ve;B.isData3DTexture?(y.setTexture3D(B,0),ve=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(y.setTexture2DArray(B,0),ve=F.TEXTURE_2D_ARRAY):(y.setTexture2D(B,0),ve=F.TEXTURE_2D),ue.activeTexture(F.TEXTURE0),ue.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),ue.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ue.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const vn=ue.getParameter(F.UNPACK_ROW_LENGTH),Je=ue.getParameter(F.UNPACK_IMAGE_HEIGHT),Pn=ue.getParameter(F.UNPACK_SKIP_PIXELS),qn=ue.getParameter(F.UNPACK_SKIP_ROWS),Ai=ue.getParameter(F.UNPACK_SKIP_IMAGES);ue.pixelStorei(F.UNPACK_ROW_LENGTH,Tt.width),ue.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Tt.height),ue.pixelStorei(F.UNPACK_SKIP_PIXELS,Ee),ue.pixelStorei(F.UNPACK_SKIP_ROWS,Oe),ue.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);const As=E.isDataArrayTexture||E.isData3DTexture,ot=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const Rt=C.get(E),Ci=C.get(B),dt=C.get(Rt.__renderTarget),Ri=C.get(Ci.__renderTarget);ue.bindFramebuffer(F.READ_FRAMEBUFFER,dt.__webglFramebuffer),ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ri.__webglFramebuffer);for(let Cs=0;Cs<ye;Cs++)As&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,C.get(E).__webglTexture,H,Ge+Cs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,C.get(B).__webglTexture,fe,Ct+Cs)),F.blitFramebuffer(Ee,Oe,Me,de,Te,st,Me,de,F.DEPTH_BUFFER_BIT,F.NEAREST);ue.bindFramebuffer(F.READ_FRAMEBUFFER,null),ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||E.isRenderTargetTexture||C.has(E)){const Rt=C.get(E),Ci=C.get(B);ue.bindFramebuffer(F.READ_FRAMEBUFFER,Wf),ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,Xf);for(let dt=0;dt<ye;dt++)As?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Rt.__webglTexture,H,Ge+dt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Rt.__webglTexture,H),ot?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ci.__webglTexture,fe,Ct+dt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ci.__webglTexture,fe),H!==0?F.blitFramebuffer(Ee,Oe,Me,de,Te,st,Me,de,F.COLOR_BUFFER_BIT,F.NEAREST):ot?F.copyTexSubImage3D(ve,fe,Te,st,Ct+dt,Ee,Oe,Me,de):F.copyTexSubImage2D(ve,fe,Te,st,Ee,Oe,Me,de);ue.bindFramebuffer(F.READ_FRAMEBUFFER,null),ue.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ot?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(ve,fe,Te,st,Ct,Me,de,ye,at,Jt,Tt.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(ve,fe,Te,st,Ct,Me,de,ye,at,Tt.data):F.texSubImage3D(ve,fe,Te,st,Ct,Me,de,ye,at,Jt,Tt):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,fe,Te,st,Me,de,at,Jt,Tt.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,fe,Te,st,Tt.width,Tt.height,at,Tt.data):F.texSubImage2D(F.TEXTURE_2D,fe,Te,st,Me,de,at,Jt,Tt);ue.pixelStorei(F.UNPACK_ROW_LENGTH,vn),ue.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Je),ue.pixelStorei(F.UNPACK_SKIP_PIXELS,Pn),ue.pixelStorei(F.UNPACK_SKIP_ROWS,qn),ue.pixelStorei(F.UNPACK_SKIP_IMAGES,Ai),fe===0&&B.generateMipmaps&&F.generateMipmap(ve),ue.unbindTexture()},this.initRenderTarget=function(E){C.get(E).__webglFramebuffer===void 0&&y.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?y.setTextureCube(E,0):E.isData3DTexture?y.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?y.setTexture2DArray(E,0):y.setTexture2D(E,0),ue.unbindTexture()},this.resetState=function(){z=0,O=0,L=null,ue.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}class Zx extends zm{constructor(e){super(e),this.type=Kt}parse(e){const a=function(v,M){switch(v){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(M||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(M||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(M||""))}},u=`
`,h=function(v,M,P){M=M||1024;let D=v.pos,z=-1,O=0,L="",N=String.fromCharCode.apply(null,new Uint16Array(v.subarray(D,D+128)));for(;0>(z=N.indexOf(u))&&O<M&&D<v.byteLength;)L+=N,O+=N.length,D+=128,N=String.fromCharCode.apply(null,new Uint16Array(v.subarray(D,D+128)));return-1<z?(v.pos+=O+z+1,L+N.slice(0,z)):!1},d=function(v){const M=/^#\?(\S+)/,P=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,z=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,O={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let L,N;for((v.pos>=v.byteLength||!(L=h(v)))&&a(1,"no header found"),(N=L.match(M))||a(3,"bad initial token"),O.valid|=1,O.programtype=N[1],O.string+=L+`
`;L=h(v),L!==!1;){if(O.string+=L+`
`,L.charAt(0)==="#"){O.comments+=L+`
`;continue}if((N=L.match(P))&&(O.gamma=parseFloat(N[1])),(N=L.match(R))&&(O.exposure=parseFloat(N[1])),(N=L.match(D))&&(O.valid|=2,O.format=N[1]),(N=L.match(z))&&(O.valid|=4,O.height=parseInt(N[1],10),O.width=parseInt(N[2],10)),O.valid&2&&O.valid&4)break}return O.valid&2||a(3,"missing format specifier"),O.valid&4||a(3,"missing image size specifier"),O},f=function(v,M,P){const R=M;if(R<8||R>32767||v[0]!==2||v[1]!==2||v[2]&128)return new Uint8Array(v);R!==(v[2]<<8|v[3])&&a(3,"wrong scanline width");const D=new Uint8Array(4*M*P);D.length||a(4,"unable to allocate buffer space");let z=0,O=0;const L=4*R,N=new Uint8Array(4),k=new Uint8Array(L);let K=P;for(;K>0&&O<v.byteLength;){O+4>v.byteLength&&a(1),N[0]=v[O++],N[1]=v[O++],N[2]=v[O++],N[3]=v[O++],(N[0]!=2||N[1]!=2||(N[2]<<8|N[3])!=R)&&a(3,"bad rgbe scanline format");let J=0,te;for(;J<L&&O<v.byteLength;){te=v[O++];const he=te>128;if(he&&(te-=128),(te===0||J+te>L)&&a(3,"bad scanline data"),he){const De=v[O++];for(let Be=0;Be<te;Be++)k[J++]=De}else k.set(v.subarray(O,O+te),J),J+=te,O+=te}const _e=R;for(let he=0;he<_e;he++){let De=0;D[z]=k[he+De],De+=R,D[z+1]=k[he+De],De+=R,D[z+2]=k[he+De],De+=R,D[z+3]=k[he+De],z+=4}K--}return D},g=function(v,M,P,R){const D=v[M+3],z=Math.pow(2,D-128)/255;P[R+0]=v[M+0]*z,P[R+1]=v[M+1]*z,P[R+2]=v[M+2]*z,P[R+3]=1},_=function(v,M,P,R){const D=v[M+3],z=Math.pow(2,D-128)/255;P[R+0]=pa.toHalfFloat(Math.min(v[M+0]*z,65504)),P[R+1]=pa.toHalfFloat(Math.min(v[M+1]*z,65504)),P[R+2]=pa.toHalfFloat(Math.min(v[M+2]*z,65504)),P[R+3]=pa.toHalfFloat(1)},p=new Uint8Array(e);p.pos=0;const m=d(p),x=m.width,S=m.height,b=f(p.subarray(p.pos),x,S);let A,T,w;switch(this.type){case En:w=b.length/4;const v=new Float32Array(w*4);for(let P=0;P<w;P++)g(b,P*4,v,P*4);A=v,T=En;break;case Kt:w=b.length/4;const M=new Uint16Array(w*4);for(let P=0;P<w;P++)_(b,P*4,M,P*4);A=M,T=Kt;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:x,height:S,data:A,header:m.string,gamma:m.gamma,exposure:m.exposure,type:T}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(a,o){switch(a.type){case En:case Kt:a.colorSpace=zr,a.minFilter=Dt,a.magFilter=Dt,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,i)}}class Jx extends Zx{constructor(e){console.warn("RGBELoader has been deprecated. Please use HDRLoader instead."),super(e)}}const ja={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class vr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Qx=new xo(-1,1,1,-1,0,1);class eM extends Lt{constructor(){super(),this.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new bt([0,2,0,0,2,0],2))}}const tM=new eM;class Jc{constructor(e){this._mesh=new $t(tM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Qx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class nM extends vr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ss.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Jc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fh extends vr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class iM extends vr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class sM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new we);this._width=n.width,this._height=n.height,t=new hn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nM(ja),this.copyPass.material.blending=ii,this.timer=new Rd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Fh!==void 0&&(a instanceof Fh?n=!0:a instanceof iM&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new we);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class rM extends vr{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Se}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const aM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Se(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class lr extends vr{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new we(e.x,e.y):new we(256,256),this.clearColor=new Se(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new hn(r,a,{type:Kt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new hn(r,a,{type:Kt});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new hn(r,a,{type:Kt});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=aM;this.highPassUniforms=Ss.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Nt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new we(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ss.clone(ja.uniforms),this.blendMaterial=new Nt({uniforms:this.copyUniforms,vertexShader:ja.vertexShader,fragmentShader:ja.fragmentShader,premultipliedAlpha:!0,blending:Bn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Se,this._oldClearAlpha=1,this._basic=new Hr,this._fsQuad=new Jc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new we(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=lr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=lr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Nt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new we(.5,.5)},direction:{value:new we(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Nt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}lr.BlurDirectionX=new we(1,0);lr.BlurDirectionY=new we(0,1);const Ia={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class oM extends vr{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ss.clone(Ia.uniforms),this.material=new wd({name:Ia.name,uniforms:this.uniforms,vertexShader:Ia.vertexShader,fragmentShader:Ia.fragmentShader}),this._fsQuad=new Jc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ye.getTransfer(this._outputColorSpace)===et&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Rc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Pc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Dc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===_o?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ic?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Uc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Ua=$f(null),al=Ke(!1);function lM(){function s(o){const l=new fm;l.background=new Se(131849),l.fog=new qc(132367,9e-5);const c=new In(60,window.innerWidth/window.innerHeight,.5,1e3);c.position.set(0,30,120),c.lookAt(0,0,0);const u=new Kx({canvas:o,antialias:!0,powerPreference:"high-performance"});u.setSize(window.innerWidth,window.innerHeight),u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.toneMapping=_o,u.toneMappingExposure=1.12,u.outputColorSpace=on;const h=new Xm(2372703,.35);l.add(h);const d=new Vm(2374254,197645,.42);l.add(d);const f=new Wm(16767152,.82);f.position.set(70,42,94),l.add(f);const g=new sM(u),_=new rM(l,c);g.addPass(_);const p=new lr(new we(window.innerWidth,window.innerHeight),1,.62,.58);g.addPass(p);const m=new oM;g.addPass(m),new Jx().load("/assets/hdri/kloppenheim_02_puresky_2k.hdr",M=>{M.mapping=Ha,l.environment=M,l.environmentIntensity=.22},void 0,M=>{console.warn("HDRI load failed (non-critical):",M)});const S=new Rd,b=new Oi,A=new Oi;l.add(b),l.add(A);const T=e(l),w=n(l),v={scene:l,camera:c,renderer:u,composer:g,bloomPass:p,timer:S,stars:b,ambientGroup:A,bgStarfield:T,bgGalaxies:w,animationId:0};return Ua.value=v,al.value=!0,v}function e(o){const c=new Float32Array(66e3),u=new Float32Array(22e3*3),h=new Float32Array(22e3);for(let _=0;_<22e3;_++){const p=Math.random()*Math.PI*2,m=Math.acos(2*Math.random()-1),x=Math.random(),S=x<.3?280+Math.random()*180:480+Math.random()*340;c[_*3]=S*Math.sin(m)*Math.cos(p),c[_*3+1]=S*Math.sin(m)*Math.sin(p)*(.8+Math.random()*.3),c[_*3+2]=S*Math.cos(m);const b=Math.random();if(b<.05)u[_*3]=.5,u[_*3+1]=.6,u[_*3+2]=1,h[_]=.6+Math.random()*.4;else if(b<.12)u[_*3]=1,u[_*3+1]=.7,u[_*3+2]=.4,h[_]=.5+Math.random()*.3;else if(b<.2)u[_*3]=1,u[_*3+1]=.95,u[_*3+2]=.7,h[_]=.4+Math.random()*.2;else{const A=.7+Math.random()*.3;u[_*3]=A,u[_*3+1]=A,u[_*3+2]=A,h[_]=.15+Math.random()*.3}x<.3&&(h[_]*=1.5)}const d=new Lt;d.setAttribute("position",new ft(c,3)),d.setAttribute("color",new ft(u,3)),d.setAttribute("size",new ft(h,1));const f=new rr({size:.34,sizeAttenuation:!0,map:t(),vertexColors:!0,transparent:!0,opacity:.94,blending:Bn,depthWrite:!1}),g=new Wr(d,f);return g.renderOrder=-1,o.add(g),g}function t(){const l=document.createElement("canvas");l.width=l.height=48;const c=l.getContext("2d"),u=c.createRadialGradient(48/2,48/2,0,48/2,48/2,48/2);return u.addColorStop(0,"rgba(255,255,255,1)"),u.addColorStop(.1,"rgba(255,255,255,0.9)"),u.addColorStop(.3,"rgba(255,255,255,0.3)"),u.addColorStop(.6,"rgba(255,255,255,0.02)"),u.addColorStop(1,"rgba(255,255,255,0)"),c.fillStyle=u,c.fillRect(0,0,48,48),new ro(l)}function n(o){const c=new Float32Array(252),u=new Float32Array(84*3),h=new Float32Array(84),d=[new Se(8939263),new Se(4491519),new Se(16737962),new Se(16746564),new Se(6737151),new Se(13404415)];for(let p=0;p<84;p++){const m=Math.random()*Math.PI*2,x=Math.acos(2*Math.random()-1),S=200+Math.random()*(Math.random()>.5?150:250);c[p*3]=S*Math.sin(x)*Math.cos(m),c[p*3+1]=S*Math.sin(x)*Math.sin(m)*(.4+Math.random()*.3),c[p*3+2]=S*Math.cos(x);const b=d[Math.floor(Math.random()*d.length)].clone(),A=.5+Math.random()*.3;u[p*3]=b.r*A,u[p*3+1]=b.g*A,u[p*3+2]=b.b*A,h[p]=6+Math.random()*26}const f=new Lt;f.setAttribute("position",new ft(c,3)),f.setAttribute("color",new ft(u,3)),f.setAttribute("size",new ft(h,1));const g=new rr({size:7,map:i(),vertexColors:!0,transparent:!0,opacity:.72,blending:Bn,depthWrite:!1,sizeAttenuation:!0}),_=new Wr(f,g);return _.renderOrder=-1,o.add(_),_}function i(){const l=document.createElement("canvas");l.width=l.height=64;const c=l.getContext("2d"),u=c.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return u.addColorStop(0,"rgba(255,255,255,1)"),u.addColorStop(.1,"rgba(255,255,255,0.6)"),u.addColorStop(.3,"rgba(255,255,255,0.15)"),u.addColorStop(.6,"rgba(255,255,255,0.03)"),u.addColorStop(1,"rgba(255,255,255,0)"),c.fillStyle=u,c.fillRect(0,0,64,64),new ro(l)}function r(o){o&&(cancelAnimationFrame(o.animationId),o.scene.traverse(l=>{const c=l;c.geometry&&c.geometry.dispose(),c.material&&(Array.isArray(c.material)?c.material.forEach(u=>{a(u),u.dispose()}):(a(c.material),c.material.dispose()))}),o.composer.dispose(),o.renderer.dispose(),o.scene.clear(),Ua.value=null,al.value=!1)}function a(o){for(const l of Object.keys(o)){const c=o[l];c instanceof Vt&&c.dispose()}}return{state:Ua,isReady:al,init:s,dispose:r,getState:()=>Ua.value}}function mi(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Bd(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var An={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Xr={duration:.5,overwrite:!1,delay:0},Qc,Zt,mt,Fn=1e8,ct=1/Fn,dc=Math.PI*2,cM=dc/4,uM=0,zd=Math.sqrt,hM=Math.cos,dM=Math.sin,Ht=function(e){return typeof e=="string"},wt=function(e){return typeof e=="function"},Ti=function(e){return typeof e=="number"},eu=function(e){return typeof e>"u"},ai=function(e){return typeof e=="object"},dn=function(e){return e!==!1},tu=function(){return typeof window<"u"},Na=function(e){return wt(e)||Ht(e)},kd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},nn=Array.isArray,fM=/random\([^)]+\)/g,pM=/,\s*/g,Oh=/(?:-?\.?\d|\.)+/gi,Vd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ks=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ol=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Gd=/[+-]=-?[.\d]+/,mM=/[^,'"\[\]\s]+/gi,_M=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Mt,Zn,fc,nu,Cn={},ao={},Hd,Wd=function(e){return(ao=cr(e,Cn))&&_n},iu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},qr=function(e,t){return!t&&console.warn(e)},Xd=function(e,t){return e&&(Cn[e]=t)&&ao&&(ao[e]=t)||Cn},Yr=function(){return 0},gM={suppressEvents:!0,isStart:!0,kill:!1},Ka={suppressEvents:!0,kill:!1},vM={suppressEvents:!0},su={},Wi=[],pc={},qd,yn={},ll={},Bh=30,Za=[],ru="",au=function(e){var t=e[0],n,i;if(ai(t)||wt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Za.length;i--&&!Za[i].targetTest(t););n=Za[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new mf(e[i],n)))||e.splice(i,1);return e},ds=function(e){return e._gsap||au(On(e))[0]._gsap},Yd=function(e,t,n){return(n=e[t])&&wt(n)?e[t]():eu(n)&&e.getAttribute&&e.getAttribute(t)||n},fn=function(e,t){return(e=e.split(",")).forEach(t)||e},Pt=function(e){return Math.round(e*1e5)/1e5||0},xt=function(e){return Math.round(e*1e7)/1e7||0},Qs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},xM=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},oo=function(){var e=Wi.length,t=Wi.slice(0),n,i;for(pc={},Wi.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},ou=function(e){return!!(e._initted||e._startAt||e.add)},$d=function(e,t,n,i){Wi.length&&!Zt&&oo(),e.render(t,n,!!(Zt&&t<0&&ou(e))),Wi.length&&!Zt&&oo()},jd=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(mM).length<2?t:Ht(e)?e.trim():e},Kd=function(e){return e},Rn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},MM=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},cr=function(e,t){for(var n in t)e[n]=t[n];return e},zh=function s(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=ai(t[n])?s(e[n]||(e[n]={}),t[n]):t[n]);return e},lo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ur=function(e){var t=e.parent||Mt,n=e.keyframes?MM(nn(e.keyframes)):Rn;if(dn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},yM=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Zd=function(e,t,n,i,r){var a=e[i],o;if(r)for(o=t[r];a&&a[r]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},So=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=t._prev,a=t._next;r?r._next=a:e[n]===t&&(e[n]=a),a?a._prev=r:e[i]===t&&(e[i]=r),t._next=t._prev=t.parent=null},qi=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},fs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},SM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},mc=function(e,t,n,i){return e._startAt&&(Zt?e._startAt.revert(Ka):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},bM=function s(e){return!e||e._ts&&s(e.parent)},kh=function(e){return e._repeat?ur(e._tTime,e=e.duration()+e._rDelay)*e:0},ur=function(e,t){var n=Math.floor(e=xt(e/t));return e&&n===e?n-1:n},co=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},bo=function(e){return e._end=xt(e._start+(e._tDur/Math.abs(e._ts||e._rts||ct)||0))},Eo=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=xt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),bo(e),n._dirty||fs(n,e)),e},Jd=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=co(e.rawTime(),t),(!t._dur||ta(0,t.totalDuration(),n)-t._tTime>ct)&&t.render(n,!0)),fs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-ct}},Qn=function(e,t,n,i){return t.parent&&qi(t),t._start=xt((Ti(n)?n:n||e!==Mt?Ln(e,n,t):e._time)+t._delay),t._end=xt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Zd(e,t,"_first","_last",e._sort?"_start":0),_c(t)||(e._recent=t),i||Jd(e,t),e._ts<0&&Eo(e,e._tTime),e},Qd=function(e,t){return(Cn.ScrollTrigger||iu("scrollTrigger",t))&&Cn.ScrollTrigger.create(t,e)},ef=function(e,t,n,i,r){if(cu(e,t,r),!e._initted)return 1;if(!n&&e._pt&&!Zt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&qd!==bn.frame)return Wi.push(e),e._lazy=[r,i],1},EM=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},_c=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},TM=function(e,t,n,i){var r=e.ratio,a=t<0||!t&&(!e._start&&EM(e)&&!(!e._initted&&_c(e))||(e._ts<0||e._dp._ts<0)&&!_c(e))?0:1,o=e._rDelay,l=0,c,u,h;if(o&&e._repeat&&(l=ta(0,e._tDur,t),u=ur(l,o),e._yoyo&&u&1&&(a=1-a),u!==ur(e._tTime,o)&&(r=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==r||Zt||i||e._zTime===ct||!t&&e._zTime){if(!e._initted&&ef(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?ct:0),n||(n=t&&!h),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&mc(e,t,n,!0),e._onUpdate&&!n&&Tn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Tn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&qi(e,1),!n&&!Zt&&(Tn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},wM=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},hr=function(e,t,n,i){var r=e._repeat,a=xt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=r?r<0?1e10:xt(a*(r+1)+e._rDelay*r):a,o>0&&!i&&Eo(e,e._tTime=e._tDur*o),e.parent&&bo(e),n||fs(e.parent,e),e},Vh=function(e){return e instanceof cn?fs(e):hr(e,e._dur)},AM={_start:0,endTime:Yr,totalDuration:Yr},Ln=function s(e,t,n){var i=e.labels,r=e._recent||AM,a=e.duration()>=Fn?r.endTime(!1):e._dur,o,l,c;return Ht(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(nn(n)?n[0]:n).totalDuration()),o>1?s(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Nr=function(e,t,n){var i=Ti(t[1]),r=(i?2:1)+(e<2?0:1),a=t[r],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=dn(l.vars.inherit)&&l.parent;a.immediateRender=dn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[r-1]}return new Ut(t[0],a,t[r+1])},Ki=function(e,t){return e||e===0?t(e):t},ta=function(e,t,n){return n<e?e:n>t?t:n},tn=function(e,t){return!Ht(e)||!(t=_M.exec(e))?"":t[1]},CM=function(e,t,n){return Ki(n,function(i){return ta(e,t,i)})},gc=[].slice,tf=function(e,t){return e&&ai(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ai(e[0]))&&!e.nodeType&&e!==Zn},RM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var r;return Ht(i)&&!t||tf(i,1)?(r=n).push.apply(r,On(i)):n.push(i)})||n},On=function(e,t,n){return mt&&!t&&mt.selector?mt.selector(e):Ht(e)&&!n&&(fc||!dr())?gc.call((t||nu).querySelectorAll(e),0):nn(e)?RM(e,n):tf(e)?gc.call(e,0):e?[e]:[]},vc=function(e){return e=On(e)[0]||qr("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return On(t,n.querySelectorAll?n:n===e?qr("Invalid scope")||nu.createElement("div"):e)}},nf=function(e){return e.sort(function(){return .5-Math.random()})},sf=function(e){if(wt(e))return e;var t=ai(e)?e:{each:e},n=ps(t.ease),i=t.from||0,r=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,u=i,h=i;return Ht(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],h=i[1]),function(d,f,g){var _=(g||t).length,p=a[_],m,x,S,b,A,T,w,v,M;if(!p){if(M=t.grid==="auto"?0:(t.grid||[1,Fn])[1],!M){for(w=-Fn;w<(w=g[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(p=a[_]=[],m=l?Math.min(M,_)*u-.5:i%M,x=M===Fn?0:l?_*h/M-.5:i/M|0,w=0,v=Fn,T=0;T<_;T++)S=T%M-m,b=x-(T/M|0),p[T]=A=c?Math.abs(c==="y"?b:S):zd(S*S+b*b),A>w&&(w=A),A<v&&(v=A);i==="random"&&nf(p),p.max=w-v,p.min=v,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(M>_?_-1:c?c==="y"?_/M:M:Math.max(M,_/M))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=tn(t.amount||t.each)||0,n=n&&_<0?GM(n):n}return _=(p[d]-p.min)/p.max||0,xt(p.b+(n?n(_):_)*p.v)+p.u}},xc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=xt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Ti(n)?0:tn(n))}},rf=function(e,t){var n=nn(e),i,r;return!n&&ai(e)&&(i=n=e.radius||Fn,e.values?(e=On(e.values),(r=!Ti(e[0]))&&(i*=i)):e=xc(e.increment)),Ki(t,n?wt(e)?function(a){return r=e(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Fn,u=0,h=e.length,d,f;h--;)r?(d=e[h].x-o,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-o),d<c&&(c=d,u=h);return u=!i||c<=i?e[u]:a,r||u===a||Ti(a)?u:u+tn(a)}:xc(e))},af=function(e,t,n,i){return Ki(nn(e)?!t:n===!0?!!(n=0):!i,function(){return nn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},PM=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(r,a){return a(r)},i)}},DM=function(e,t){return function(n){return e(parseFloat(n))+(t||tn(n))}},LM=function(e,t,n){return lf(e,t,0,1,n)},of=function(e,t,n){return Ki(n,function(i){return e[~~t(i)]})},IM=function s(e,t,n){var i=t-e;return nn(e)?of(e,s(0,e.length),t):Ki(n,function(r){return(i+(r-e)%i)%i+e})},UM=function s(e,t,n){var i=t-e,r=i*2;return nn(e)?of(e,s(0,e.length-1),t):Ki(n,function(a){return a=(r+(a-e)%r)%r||0,e+(a>i?r-a:a)})},$r=function(e){return e.replace(fM,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(pM);return af(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},lf=function(e,t,n,i,r){var a=t-e,o=i-n;return Ki(r,function(l){return n+((l-e)/a*o||0)})},NM=function s(e,t,n,i){var r=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!r){var a=Ht(e),o={},l,c,u,h,d;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(nn(e)&&!nn(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(s(e[c-1],e[c]));h--,r=function(g){g*=h;var _=Math.min(d,~~g);return u[_](g-_)},n=t}else i||(e=cr(nn(e)?[]:{},e));if(!u){for(l in t)lu.call(o,e,l,"get",t[l]);r=function(g){return du(g,o)||(a?e.p:e)}}}return Ki(n,r)},Gh=function(e,t,n){var i=e.labels,r=Fn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},Tn=function(e,t,n){var i=e.vars,r=i[t],a=mt,o=e._ctx,l,c,u;if(r)return l=i[t+"Params"],c=i.callbackScope||e,n&&Wi.length&&oo(),o&&(mt=o),u=l?r.apply(c,l):r.call(c),mt=a,u},Rr=function(e){return qi(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Zt),e.progress()<1&&Tn(e,"onInterrupt"),e},Zs,cf=[],uf=function(e){if(e)if(e=!e.name&&e.default||e,tu()||e.headless){var t=e.name,n=wt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,r={init:Yr,render:du,add:lu,kill:JM,modifier:ZM,rawVars:0},a={targetTest:0,get:0,getSetter:hu,aliases:{},register:0};if(dr(),e!==i){if(yn[t])return;Rn(i,Rn(lo(e,r),a)),cr(i.prototype,cr(r,lo(e,a))),yn[i.prop=t]=i,e.targetTest&&(Za.push(i),su[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Xd(t,i),e.register&&e.register(_n,i,pn)}else cf.push(e)},lt=255,Pr={aqua:[0,lt,lt],lime:[0,lt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,lt],navy:[0,0,128],white:[lt,lt,lt],olive:[128,128,0],yellow:[lt,lt,0],orange:[lt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[lt,0,0],pink:[lt,192,203],cyan:[0,lt,lt],transparent:[lt,lt,lt,0]},cl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*lt+.5|0},hf=function(e,t,n){var i=e?Ti(e)?[e>>16,e>>8&lt,e&lt]:0:Pr.black,r,a,o,l,c,u,h,d,f,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Pr[e])i=Pr[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+r+r+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&lt,i&lt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&lt,e&lt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Oh),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,r=u*2-a,i.length>3&&(i[3]*=1),i[0]=cl(l+1/3,r,a),i[1]=cl(l,r,a),i[2]=cl(l-1/3,r,a);else if(~e.indexOf("="))return i=e.match(Vd),n&&i.length<4&&(i[3]=1),i}else i=e.match(Oh)||Pr.transparent;i=i.map(Number)}return t&&!g&&(r=i[0]/lt,a=i[1]/lt,o=i[2]/lt,h=Math.max(r,a,o),d=Math.min(r,a,o),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===r?(a-o)/f+(a<o?6:0):h===a?(o-r)/f+2:(r-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},df=function(e){var t=[],n=[],i=-1;return e.split(Xi).forEach(function(r){var a=r.match(Ks)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Hh=function(e,t,n){var i="",r=(e+i).match(Xi),a=t?"hsla(":"rgba(",o=0,l,c,u,h;if(!r)return e;if(r=r.map(function(d){return(d=hf(d,t,1))&&a+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=df(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Xi,"1").split(Ks),h=c.length-1;o<h;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(u.length?u:r.length?r:n).shift());if(!c)for(c=e.split(Xi),h=c.length-1;o<h;o++)i+=c[o]+r[o];return i+c[h]},Xi=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Pr)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),FM=/hsl[a]?\(/,ff=function(e){var t=e.join(" "),n;if(Xi.lastIndex=0,Xi.test(t))return n=FM.test(t),e[1]=Hh(e[1],n),e[0]=Hh(e[0],n,df(e[1])),!0},jr,bn=function(){var s=Date.now,e=500,t=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,u,h,d,f,g=function _(p){var m=s()-i,x=p===!0,S,b,A,T;if((m>e||m<0)&&(n+=m-t),i+=m,A=i-n,S=A-a,(S>0||x)&&(T=++h.frame,d=A-h.time*1e3,h.time=A=A/1e3,a+=S+(S>=r?4:r-S),b=1),x||(l=c(_)),b)for(f=0;f<o.length;f++)o[f](A,d,T,p)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){Hd&&(!fc&&tu()&&(Zn=fc=window,nu=Zn.document||{},Cn.gsap=_n,(Zn.gsapVersions||(Zn.gsapVersions=[])).push(_n.version),Wd(ao||Zn.GreenSockGlobals||!Zn.gsap&&Zn||{}),cf.forEach(uf)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(p){return setTimeout(p,a-h.time*1e3+1|0)},jr=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),jr=0,c=Yr},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){r=1e3/(p||240),a=h.time*1e3+r},add:function(p,m,x){var S=m?function(b,A,T,w){p(b,A,T,w),h.remove(S)}:p;return h.remove(p),o[x?"unshift":"push"](S),dr(),S},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&f>=m&&f--},_listeners:o},h}(),dr=function(){return!jr&&bn.wake()},Ze={},OM=/^[\d.\-M][\d.\-,\s]/,BM=/["']/g,zM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(BM,"").trim():+c,i=l.substr(o+1).trim();return t},kM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},VM=function(e){var t=(e+"").split("("),n=Ze[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[zM(t[1])]:kM(e).split(",").map(jd)):Ze._CE&&OM.test(e)?Ze._CE("",e):n},GM=function(e){return function(t){return 1-e(1-t)}},ps=function(e,t){return e&&(wt(e)?e:Ze[e]||VM(e))||t},ws=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:n,easeInOut:i},a;return fn(e,function(o){Ze[o]=Cn[o]=r,Ze[a=o.toLowerCase()]=n;for(var l in r)Ze[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ze[o+"."+l]=r[l]}),r},pf=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},ul=function s(e,t,n){var i=t>=1?t:1,r=(n||(e?.3:.45))/(t<1?t:1),a=r/dc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*dM((u-a)*r)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:pf(o);return r=dc/r,l.config=function(c,u){return s(e,c,u)},l},hl=function s(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(r){return 1-n(1-r)}:pf(n);return i.config=function(r){return s(e,r)},i};fn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;ws(s+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Ze.Linear.easeNone=Ze.none=Ze.Linear.easeIn;ws("Elastic",ul("in"),ul("out"),ul());(function(s,e){var t=1/e,n=2*t,i=2.5*t,r=function(o){return o<t?s*o*o:o<n?s*Math.pow(o-1.5/e,2)+.75:o<i?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};ws("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);ws("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});ws("Circ",function(s){return-(zd(1-s*s)-1)});ws("Sine",function(s){return s===1?1:-hM(s*cM)+1});ws("Back",hl("in"),hl("out"),hl());Ze.SteppedEase=Ze.steps=Cn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),r=t?1:0,a=1-ct;return function(o){return((i*ta(0,a,o)|0)+r)*n}}};Xr.ease=Ze["quad.out"];fn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return ru+=s+","+s+"Params,"});var mf=function(e,t){this.id=uM++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Yd,this.set=t?t.getSetter:hu},Kr=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,hr(this,+t.duration,1,1),this.data=t.data,mt&&(this._ctx=mt,mt.data.push(this)),jr||bn.wake()}var e=s.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,hr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(dr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Eo(this,n),!r._dp||r.parent||Jd(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Qn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ct||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),$d(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+kh(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+kh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?ur(this._tTime,r)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-ct?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?co(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ct?0:this._rts,this.totalTime(ta(-Math.abs(this._delay),this.totalDuration(),r),i!==!1),bo(this),SM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(dr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ct&&(this._tTime-=ct)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=xt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Qn(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(dn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?co(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=vM);var i=Zt;return Zt=n,ou(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Zt=i,this},e.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Vh(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Vh(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Ln(this,n),dn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,dn(i)),this._dur||(this._zTime=-ct),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ct:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ct,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-ct)},e.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,r=i._prom;return new Promise(function(a){var o=wt(n)?n:Kd,l=function(){var u=i.then;i.then=null,r&&r(),wt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Rr(this)},s}();Rn(Kr.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ct,_prom:0,_ps:!1,_rts:1});var cn=function(s){Bd(e,s);function e(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=dn(n.sortChildren),Mt&&Qn(n.parent||Mt,mi(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Qd(mi(r),n.scrollTrigger),r}var t=e.prototype;return t.to=function(i,r,a){return Nr(0,arguments,this),this},t.from=function(i,r,a){return Nr(1,arguments,this),this},t.fromTo=function(i,r,a,o){return Nr(2,arguments,this),this},t.set=function(i,r,a){return r.duration=0,r.parent=this,Ur(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ut(i,r,Ln(this,a),1),this},t.call=function(i,r,a){return Qn(this,Ut.delayedCall(0,i,r),a)},t.staggerTo=function(i,r,a,o,l,c,u){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ut(i,a,Ln(this,l)),this},t.staggerFrom=function(i,r,a,o,l,c,u){return a.runBackwards=1,Ur(a).immediateRender=dn(a.immediateRender),this.staggerTo(i,r,a,o,l,c,u)},t.staggerFromTo=function(i,r,a,o,l,c,u,h){return o.startAt=a,Ur(o).immediateRender=dn(o.immediateRender),this.staggerTo(i,r,o,l,c,u,h)},t.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:xt(i),h=this._zTime<0!=i<0&&(this._initted||!c),d,f,g,_,p,m,x,S,b,A,T,w;if(this!==Mt&&u>l&&i>=0&&(u=l),u!==this._tTime||a||h){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),d=u,b=this._start,S=this._ts,m=!S,h&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,a);if(d=xt(u%p),u===l?(_=this._repeat,d=c):(A=xt(u/p),_=~~A,_&&_===A&&(d=c,_--),d>c&&(d=c)),A=ur(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(d=c-d,w=1),_!==A&&!this._lock){var v=T&&A&1,M=v===(T&&_&1);if(_<A&&(v=!v),o=v?0:u%c?c:u,this._lock=1,this.render(o||(w?0:xt(_*p)),r,!c)._lock=0,this._tTime=u,!r&&this.parent&&Tn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,o=v?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=wM(this,xt(o),xt(d)),x&&(u-=d-(d=x._start))),this._tTime=u,this._time=d,this._act=!!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!r&&!A&&(Tn(this,"onStart"),this._tTime!==u))return this;if(d>=o&&i>=0)for(f=this._first;f;){if(g=f._next,(f._act||d>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,r,a),d!==this._time||!this._ts&&!m){x=0,g&&(u+=this._zTime=-ct);break}}f=g}else{f=this._last;for(var P=i<0?i:d;f;){if(g=f._prev,(f._act||P<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(P-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(P-f._start)*f._ts,r,a||Zt&&ou(f)),d!==this._time||!this._ts&&!m){x=0,g&&(u+=this._zTime=P?-ct:ct);break}}f=g}}if(x&&!r&&(this.pause(),x.render(d>=o?0:-ct)._zTime=d>=o?1:-1,this._ts))return this._start=b,bo(this),this.render(i,r,a);this._onUpdate&&!r&&Tn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(b===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&qi(this,1),!r&&!(i<0&&!o)&&(u||o||!l)&&(Tn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,r){var a=this;if(Ti(r)||(r=Ln(this,r,i)),!(i instanceof Kr)){if(nn(i))return i.forEach(function(o){return a.add(o,r)}),this;if(Ht(i))return this.addLabel(i,r);if(wt(i))i=Ut.delayedCall(0,i);else return this}return this!==i?Qn(this,i,r):this},t.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Fn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ut?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},t.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},t.remove=function(i){return Ht(i)?this.removeLabel(i):wt(i)?this.killTweensOf(i):(i.parent===this&&So(this,i),i===this._recent&&(this._recent=this._last),fs(this))},t.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=xt(bn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},t.addLabel=function(i,r){return this.labels[i]=Ln(this,r),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,r,a){var o=Ut.delayedCall(0,r||Yr,a);return o.data="isPause",this._hasPause=1,Qn(this,o,Ln(this,i))},t.removePause=function(i){var r=this._first;for(i=Ln(this,i);r;)r._start===i&&r.data==="isPause"&&qi(r),r=r._next},t.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)ki!==o[l]&&o[l].kill(i,r);return this},t.getTweensOf=function(i,r){for(var a=[],o=On(i),l=this._first,c=Ti(r),u;l;)l instanceof Ut?xM(l._targets,o)&&(c?(!ki||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(u=l.getTweensOf(o,r)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(i,r){r=r||{};var a=this,o=Ln(a,i),l=r,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,g=Ut.to(a,Rn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ct,onStart:function(){if(a.pause(),!f){var p=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&hr(g,p,0,1).render(g._time,!0,!0),f=1}u&&u.apply(g,h||[])}},r));return d?g.render(0):g},t.tweenFromTo=function(i,r,a){return this.tweenTo(r,Rn({startAt:{time:Ln(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Gh(this,Ln(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Gh(this,Ln(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ct)},t.shiftChildren=function(i,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=xt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return fs(this)},t.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),fs(this)},t.totalDuration=function(i){var r=0,a=this,o=a._last,l=Fn,c,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Qn(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(r-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=xt(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;hr(a,a===Mt&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Mt._ts&&($d(Mt,co(i,Mt)),qd=bn.frame),bn.frame>=Bh){Bh+=An.autoSleep||120;var r=Mt._first;if((!r||!r._ts)&&An.autoSleep&&bn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||bn.sleep()}}},e}(Kr);Rn(cn.prototype,{_lock:0,_hasPause:0,_forcing:0});var HM=function(e,t,n,i,r,a,o){var l=new pn(this._pt,e,t,0,1,yf,null,r),c=0,u=0,h,d,f,g,_,p,m,x;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=$r(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),d=n.match(ol)||[];h=ol.exec(i);)g=h[0],_=i.substring(c,h.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),g!==d[u++]&&(p=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?Qs(p,g)-p:parseFloat(g)-p,m:f&&f<4?Math.round:0},c=ol.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Gd.test(i)||m)&&(l.e=0),this._pt=l,l},lu=function(e,t,n,i,r,a,o,l,c,u){wt(i)&&(i=i(r||0,e,a));var h=e[t],d=n!=="get"?n:wt(h)?c?e[t.indexOf("set")||!wt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,f=wt(h)?c?$M:xf:uu,g;if(Ht(i)&&(~i.indexOf("random(")&&(i=$r(i)),i.charAt(1)==="="&&(g=Qs(d,i)+(tn(d)||0),(g||g===0)&&(i=g))),!u||d!==i||Mc)return!isNaN(d*i)&&i!==""?(g=new pn(this._pt,e,t,+d||0,i-(d||0),typeof h=="boolean"?KM:Mf,0,f),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!h&&!(t in e)&&iu(t,i),HM.call(this,e,t,d,i,f,l||An.stringFilter,c))},WM=function(e,t,n,i,r){if(wt(e)&&(e=Fr(e,r,t,n,i)),!ai(e)||e.style&&e.nodeType||nn(e)||kd(e))return Ht(e)?Fr(e,r,t,n,i):e;var a={},o;for(o in e)a[o]=Fr(e[o],r,t,n,i);return a},_f=function(e,t,n,i,r,a){var o,l,c,u;if(yn[e]&&(o=new yn[e]).init(r,o.rawVars?t[e]:WM(t[e],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new pn(n._pt,r,e,0,1,o.render,o,0,o.priority),n!==Zs))for(c=n._ptLookup[n._targets.indexOf(r)],u=o._props.length;u--;)c[o._props[u]]=l;return o},ki,Mc,cu=function s(e,t,n){var i=e.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,d=i.keyframes,f=i.autoRevert,g=e._dur,_=e._startAt,p=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:p,S=e._overwrite==="auto"&&!Qc,b=e.timeline,A=i.easeReverse||h,T,w,v,M,P,R,D,z,O,L,N,k,K;if(b&&(!d||!r)&&(r="none"),e._ease=ps(r,Xr.ease),e._rEase=A&&(ps(A)||e._ease),e._from=!b&&!!i.runBackwards,e._from&&(e.ratio=1),!b||d&&!i.stagger){if(z=p[0]?ds(p[0]).harness:0,k=z&&i[z.prop],T=lo(i,su),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!f?_.render(-1,!0):_.revert(u&&g?Ka:gM),_._lazy=0),a){if(qi(e._startAt=Ut.set(p,Rn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&dn(l),startAt:null,delay:0,onUpdate:c&&function(){return Tn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Zt||!o&&!f)&&e._startAt.revert(Ka),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(o=!1),v=Rn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&dn(l),immediateRender:o,stagger:0,parent:m},T),k&&(v[z.prop]=k),qi(e._startAt=Ut.set(p,v)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Zt?e._startAt.revert(Ka):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,ct,ct);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&dn(l)||l&&!g,w=0;w<p.length;w++){if(P=p[w],D=P._gsap||au(p)[w]._gsap,e._ptLookup[w]=L={},pc[D.id]&&Wi.length&&oo(),N=x===p?w:x.indexOf(P),z&&(O=new z).init(P,k||T,e,N,x)!==!1&&(e._pt=M=new pn(e._pt,P,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(J){L[J]=M}),O.priority&&(R=1)),!z||k)for(v in T)yn[v]&&(O=_f(v,T,e,N,P,x))?O.priority&&(R=1):L[v]=M=lu.call(e,P,v,"get",T[v],N,x,0,i.stringFilter);e._op&&e._op[w]&&e.kill(P,e._op[w]),S&&e._pt&&(ki=e,Mt.killTweensOf(P,L,e.globalTime(t)),K=!e.parent,ki=0),e._pt&&l&&(pc[D.id]=1)}R&&Sf(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!K,d&&t<=0&&b.render(Fn,!0,!0)},XM=function(e,t,n,i,r,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Mc=1,e.vars[t]="+=0",cu(e,o),Mc=0,l?qr(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(i||i===0)&&!r?i:u.s+(i||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=Pt(n)+tn(h.e)),h.b&&(h.b=u.s+tn(h.b))},qM=function(e,t){var n=e[0]?ds(e[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return t;r=cr({},t);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},YM=function(e,t,n,i){var r=t.ease||i||"power1.inOut",a,o;if(nn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:r})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:r})},Fr=function(e,t,n,i,r){return wt(e)?e.call(t,n,i,r):Ht(e)&&~e.indexOf("random(")?$r(e):e},gf=ru+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",vf={};fn(gf+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return vf[s]=1});var Ut=function(s){Bd(e,s);function e(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:Ur(i))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Mt,x=(nn(n)||kd(n)?Ti(n[0]):"length"in i)?[n]:On(n),S,b,A,T,w,v,M,P;if(o._targets=x.length?au(x):qr("GSAP target "+n+" not found. https://gsap.com",!An.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,g||d||Na(c)||Na(u)){i=o.vars;var R=i.easeReverse||i.yoyoEase;if(S=o.timeline=new cn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:x}),S.kill(),S.parent=S._dp=mi(o),S._start=0,d||Na(c)||Na(u)){if(T=x.length,M=d&&sf(d),ai(d))for(w in d)~gf.indexOf(w)&&(P||(P={}),P[w]=d[w]);for(b=0;b<T;b++)A=lo(i,vf),A.stagger=0,R&&(A.easeReverse=R),P&&cr(A,P),v=x[b],A.duration=+Fr(c,mi(o),b,v,x),A.delay=(+Fr(u,mi(o),b,v,x)||0)-o._delay,!d&&T===1&&A.delay&&(o._delay=u=A.delay,o._start+=u,A.delay=0),S.to(v,A,M?M(b,v,x):0),S._ease=Ze.none;S.duration()?c=u=0:o.timeline=0}else if(g){Ur(Rn(S.vars.defaults,{ease:"none"})),S._ease=ps(g.ease||i.ease||"none");var D=0,z,O,L;if(nn(g))g.forEach(function(N){return S.to(x,N,">")}),S.duration();else{A={};for(w in g)w==="ease"||w==="easeEach"||YM(w,g[w],A,g.easeEach);for(w in A)for(z=A[w].sort(function(N,k){return N.t-k.t}),D=0,b=0;b<z.length;b++)O=z[b],L={ease:O.e,duration:(O.t-(b?z[b-1].t:0))/100*c},L[w]=O.v,S.to(x,L,D),D+=L.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||o.duration(c=S.duration())}else o.timeline=0;return f===!0&&!Qc&&(ki=mi(o),Mt.killTweensOf(x),ki=0),Qn(m,mi(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!c&&!g&&o._start===xt(m._time)&&dn(h)&&bM(mi(o))&&m.data!=="nested")&&(o._tTime=-ct,o.render(Math.max(0,-u)||0)),p&&Qd(mi(o),p),o}var t=e.prototype;return t.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-ct&&!u?l:i<ct?0:i,d,f,g,_,p,m,x,S;if(!c)TM(this,i,r,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=h,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,r,a);if(d=xt(h%_),h===l?(g=this._repeat,d=c):(p=xt(h/_),g=~~p,g&&g===p?(d=c,g--):d>c&&(d=c)),m=this._yoyo&&g&1,m&&(d=c-d),p=ur(this._tTime,_),d===o&&!a&&this._initted&&g===p)return this._tTime=h,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&d!==_&&this._initted&&(this._lock=a=1,this.render(xt(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(ef(this,u?i:d,a,r,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,r,a)}if(this._rEase){var b=d<o;if(b!==this._inv){var A=b?o:c-o;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(b?-1:1)/A:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(d/c);if(this._from&&(this.ratio=x=1-x),this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&h&&!r&&!p&&(Tn(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;S&&S.render(i<0?i:S._dur*S._ease(d/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(u&&mc(this,i,r,a),Tn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!r&&this.parent&&Tn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&mc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&qi(this,1),!r&&!(u&&!o)&&(h||o||m)&&(Tn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},t.resetTo=function(i,r,a,o,l){jr||bn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||cu(this,c),u=this._ease(c/this._dur),XM(this,i,r,a,o,u,c,l)?this.resetTo(i,r,a,o,1):(Eo(this,0),this.parent||Zd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Rr(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Zt),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,ki&&ki.vars.overwrite!==!0)._first||Rr(this),this.parent&&a!==this.timeline.totalDuration()&&hr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?On(i):o,c=this._ptLookup,u=this._pt,h,d,f,g,_,p,m;if((!r||r==="all")&&yM(o,l))return r==="all"&&(this._pt=0),Rr(this);for(h=this._op=this._op||[],r!=="all"&&(Ht(r)&&(_={},fn(r,function(x){return _[x]=1}),r=_),r=qM(o,r)),m=o.length;m--;)if(~l.indexOf(o[m])){d=c[m],r==="all"?(h[m]=r,g=d,f={}):(f=h[m]=h[m]||{},g=r);for(_ in g)p=d&&d[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&So(this,p,"_pt"),delete d[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&u&&Rr(this),this},e.to=function(i,r){return new e(i,r,arguments[2])},e.from=function(i,r){return Nr(1,arguments)},e.delayedCall=function(i,r,a,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,r,a){return Nr(2,arguments)},e.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(i,r)},e.killTweensOf=function(i,r,a){return Mt.killTweensOf(i,r,a)},e}(Kr);Rn(Ut.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});fn("staggerTo,staggerFrom,staggerFromTo",function(s){Ut[s]=function(){var e=new cn,t=gc.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var uu=function(e,t,n){return e[t]=n},xf=function(e,t,n){return e[t](n)},$M=function(e,t,n,i){return e[t](i.fp,n)},jM=function(e,t,n){return e.setAttribute(t,n)},hu=function(e,t){return wt(e[t])?xf:eu(e[t])&&e.setAttribute?jM:uu},Mf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},KM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},yf=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},du=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ZM=function(e,t,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(e,t,n),r=a},JM=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?So(this,t,"_pt"):t.dep||(n=1),t=i;return!n},QM=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Sf=function(e){for(var t=e._pt,n,i,r,a;t;){for(n=t._next,i=r;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:r=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=r},pn=function(){function s(t,n,i,r,a,o,l,c,u){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||Mf,this.d=l||this,this.set=c||uu,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=QM,this.m=n,this.mt=r,this.tween=i},s}();fn(ru+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return su[s]=1});Cn.TweenMax=Cn.TweenLite=Ut;Cn.TimelineLite=Cn.TimelineMax=cn;Mt=new cn({sortChildren:!1,defaults:Xr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});An.stringFilter=ff;var ms=[],Ja={},ey=[],Wh=0,ty=0,dl=function(e){return(Ja[e]||ey).map(function(t){return t()})},yc=function(){var e=Date.now(),t=[];e-Wh>2&&(dl("matchMediaInit"),ms.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=Zn.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),dl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Wh=e,dl("matchMedia"))},bf=function(){function s(t,n){this.selector=n&&vc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=ty++,t&&this.add(t)}var e=s.prototype;return e.add=function(n,i,r){wt(n)&&(r=i,i=n,n=wt);var a=this,o=function(){var c=mt,u=a.selector,h;return c&&c!==a&&c.data.push(a),r&&(a.selector=vc(r)),mt=a,h=i.apply(a,arguments),wt(h)&&a._r.push(h),mt=c,a.selector=u,a.isReverted=!1,h};return a.last=o,n===wt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=mt;mt=null,n(this),mt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Ut&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var r=this;if(n?function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof cn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ut)&&c.revert&&c.revert(n);r._r.forEach(function(u){return u(n,r)}),r.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=ms.length;a--;)ms[a].id===this.id&&ms.splice(a,1)},e.revert=function(n){this.kill(n||{})},s}(),ny=function(){function s(t){this.contexts=[],this.scope=t,mt&&mt.data.push(this)}var e=s.prototype;return e.add=function(n,i,r){ai(n)||(n={matches:n});var a=new bf(0,r||this.scope),o=a.conditions={},l,c,u;mt&&!a.selector&&(a.selector=mt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=Zn.matchMedia(n[c]),l&&(ms.indexOf(a)<0&&ms.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(yc):l.addEventListener("change",yc)));return u&&i(a,function(h){return a.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s}(),uo={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return uf(i)})},timeline:function(e){return new cn(e)},getTweensOf:function(e,t){return Mt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Ht(e)&&(e=On(e)[0]);var r=ds(e||{}).get,a=n?Kd:jd;return n==="native"&&(n=""),e&&(t?a((yn[t]&&yn[t].get||r)(e,t,n,i)):function(o,l,c){return a((yn[o]&&yn[o].get||r)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=On(e),e.length>1){var i=e.map(function(u){return _n.quickSetter(u,t,n)}),r=i.length;return function(u){for(var h=r;h--;)i[h](u)}}e=e[0]||{};var a=yn[t],o=ds(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var h=new a;Zs._pt=0,h.init(e,n?u+n:u,Zs,0,[e]),h.render(1,h),Zs._pt&&du(1,Zs)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,r=_n.to(e,Rn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return r.resetTo(t,l,c,u)};return a.tween=r,a},isTweening:function(e){return Mt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ps(e.ease,Xr.ease)),zh(Xr,e||{})},config:function(e){return zh(An,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,r=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!yn[o]&&!Cn[o]&&qr(t+" effect requires "+o+" plugin.")}),ll[t]=function(o,l,c){return n(On(o),Rn(l||{},r),c)},a&&(cn.prototype[t]=function(o,l,c){return this.add(ll[t](o,ai(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Ze[e]=ps(t)},parseEase:function(e,t){return arguments.length?ps(e,t):Ze},getById:function(e){return Mt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new cn(e),i,r;for(n.smoothChildTiming=dn(e.smoothChildTiming),Mt.remove(n),n._dp=0,n._time=n._tTime=Mt._time,i=Mt._first;i;)r=i._next,(t||!(!i._dur&&i instanceof Ut&&i.vars.onComplete===i._targets[0]))&&Qn(n,i,i._start-i._delay),i=r;return Qn(Mt,n,0),n},context:function(e,t){return e?new bf(e,t):mt},matchMedia:function(e){return new ny(e)},matchMediaRefresh:function(){return ms.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yc()},addEventListener:function(e,t){var n=Ja[e]||(Ja[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ja[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:IM,wrapYoyo:UM,distribute:sf,random:af,snap:rf,normalize:LM,getUnit:tn,clamp:CM,splitColor:hf,toArray:On,selector:vc,mapRange:lf,pipe:PM,unitize:DM,interpolate:NM,shuffle:nf},install:Wd,effects:ll,ticker:bn,updateRoot:cn.updateRoot,plugins:yn,globalTimeline:Mt,core:{PropTween:pn,globals:Xd,Tween:Ut,Timeline:cn,Animation:Kr,getCache:ds,_removeLinkedListItem:So,reverting:function(){return Zt},context:function(e){return e&&mt&&(mt.data.push(e),e._ctx=mt),mt},suppressOverwrites:function(e){return Qc=e}}};fn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return uo[s]=Ut[s]});bn.add(cn.updateRoot);Zs=uo.to({},{duration:0});var iy=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},sy=function(e,t){var n=e._targets,i,r,a;for(i in t)for(r=n.length;r--;)a=e._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=iy(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[r],i))},fl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(Ht(r)&&(l={},fn(r,function(u){return l[u]=1}),r=l),t){l={};for(c in r)l[c]=t(r[c]);r=l}sy(o,r)}}}},_n=uo.registerPlugin({name:"attr",init:function(e,t,n,i,r){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Zt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},fl("roundProps",xc),fl("modifiers"),fl("snap",rf))||uo;Ut.version=cn.version=_n.version="3.15.0";Hd=1;tu()&&dr();Ze.Power0;Ze.Power1;Ze.Power2;Ze.Power3;Ze.Power4;Ze.Linear;Ze.Quad;Ze.Cubic;Ze.Quart;Ze.Quint;Ze.Strong;Ze.Elastic;Ze.Back;Ze.SteppedEase;Ze.Bounce;Ze.Sine;Ze.Expo;Ze.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Xh,Vi,er,fu,us,qh,pu,ry=function(){return typeof window<"u"},wi={},as=180/Math.PI,tr=Math.PI/180,qs=Math.atan2,Yh=1e8,mu=/([A-Z])/g,ay=/(left|right|width|margin|padding|x)/i,oy=/[\s,\(]\S/,ni={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Sc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ly=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},cy=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},uy=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},hy=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Ef=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Tf=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},dy=function(e,t,n){return e.style[t]=n},fy=function(e,t,n){return e.style.setProperty(t,n)},py=function(e,t,n){return e._gsap[t]=n},my=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},_y=function(e,t,n,i,r){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},gy=function(e,t,n,i,r){var a=e._gsap;a[t]=n,a.renderTransform(r,a)},St="transform",mn=St+"Origin",vy=function s(e,t){var n=this,i=this.target,r=i.style,a=i._gsap;if(e in wi&&r){if(this.tfm=this.tfm||{},e!=="transform")e=ni[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=_i(i,o)}):this.tfm[e]=a.x?a[e]:_i(i,e),e===mn&&(this.tfm.zOrigin=a.zOrigin);else return ni.transform.split(",").forEach(function(o){return s.call(n,o,t)});if(this.props.indexOf(St)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(mn,t,"")),e=St}(r||t)&&this.props.push(e,t,r[e])},wf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},xy=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,r,a;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?n[e[r]]=e[r+2]:n.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(mu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=pu(),(!r||!r.isStart)&&!n[St]&&(wf(n),i.zOrigin&&n[mn]&&(n[mn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Af=function(e,t){var n={target:e,props:[],revert:xy,save:vy};return e._gsap||_n.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Cf,bc=function(e,t){var n=Vi.createElementNS?Vi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Vi.createElement(e);return n&&n.style?n:Vi.createElement(e)},wn=function s(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(mu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&s(e,fr(t)||t,1)||""},$h="O,Moz,ms,Ms,Webkit".split(","),fr=function(e,t,n){var i=t||us,r=i.style,a=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!($h[a]+e in r););return a<0?null:(a===3?"ms":a>=0?$h[a]:"")+e},Ec=function(){ry()&&window.document&&(Xh=window,Vi=Xh.document,er=Vi.documentElement,us=bc("div")||{style:{}},bc("div"),St=fr(St),mn=St+"Origin",us.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Cf=!!fr("perspective"),pu=_n.core.reverting,fu=1)},jh=function(e){var t=e.ownerSVGElement,n=bc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),r;i.style.display="block",n.appendChild(i),er.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),er.removeChild(n),r},Kh=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Rf=function(e){var t,n;try{t=e.getBBox()}catch{t=jh(e),n=1}return t&&(t.width||t.height)||n||(t=jh(e)),t&&!t.width&&!t.x&&!t.y?{x:+Kh(e,["x","cx","x1"])||0,y:+Kh(e,["y","cy","y1"])||0,width:0,height:0}:t},Pf=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Rf(e))},Yi=function(e,t){if(t){var n=e.style,i;t in wi&&t!==mn&&(t=St),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(mu,"-$1").toLowerCase())):n.removeAttribute(t)}},Gi=function(e,t,n,i,r,a){var o=new pn(e._pt,t,n,0,1,a?Tf:Ef);return e._pt=o,o.b=i,o.e=r,e._props.push(n),o},Zh={deg:1,rad:1,turn:1},My={grid:1,flex:1},$i=function s(e,t,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=us.style,l=ay.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=i==="px",f=i==="%",g,_,p,m;if(i===a||!r||Zh[i]||Zh[a])return r;if(a!=="px"&&!d&&(r=s(e,t,n,"px")),m=e.getCTM&&Pf(e),(f||a==="%")&&(wi[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[u],Pt(f?r/g*h:r/100*g);if(o[l?"width":"height"]=h+(d?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Vi||!_.appendChild)&&(_=Vi.body),p=_._gsap,p&&f&&p.width&&l&&p.time===bn.time&&!p.uncache)return Pt(r/p.width*h);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+i,g=e[u],x?e.style[t]=x:Yi(e,t)}else(f||a==="%")&&!My[wn(_,"display")]&&(o.position=wn(e,"position")),_===e&&(o.position="static"),_.appendChild(us),g=us[u],_.removeChild(us),o.position="absolute";return l&&f&&(p=ds(_),p.time=bn.time,p.width=_[u]),Pt(d?g*r/h:g&&r?h/g*r:0)},_i=function(e,t,n,i){var r;return fu||Ec(),t in ni&&t!=="transform"&&(t=ni[t],~t.indexOf(",")&&(t=t.split(",")[0])),wi[t]&&t!=="transform"?(r=Jr(e,i),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:fo(wn(e,mn))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=ho[t]&&ho[t](e,t,n)||wn(e,t)||Yd(e,t)||(t==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?$i(e,t,r,n)+n:r},yy=function(e,t,n,i){if(!n||n==="none"){var r=fr(t,e,1),a=r&&wn(e,r,1);a&&a!==n?(t=r,n=a):t==="borderColor"&&(n=wn(e,"borderTopColor"))}var o=new pn(this._pt,e.style,t,0,1,yf),l=0,c=0,u,h,d,f,g,_,p,m,x,S,b,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=wn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=wn(e,t)||i,_?e.style[t]=_:Yi(e,t)),u=[n,i],ff(u),n=u[0],i=u[1],d=n.match(Ks)||[],A=i.match(Ks)||[],A.length){for(;h=Ks.exec(i);)p=h[0],x=i.substring(l,h.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),p!==(_=d[c++]||"")&&(f=parseFloat(_)||0,b=_.substr((f+"").length),p.charAt(1)==="="&&(p=Qs(f,p)+b),m=parseFloat(p),S=p.substr((m+"").length),l=Ks.lastIndex-S.length,S||(S=S||An.units[t]||b,l===i.length&&(i+=S,o.e+=S)),b!==S&&(f=$i(e,t,_,S)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:m-f,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Tf:Ef;return Gd.test(i)&&(o.e=0),this._pt=o,o},Jh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Sy=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Jh[n]||n,t[1]=Jh[i]||i,t.join(" ")},by=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,r=t.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],wi[o]&&(l=1,o=o==="transformOrigin"?mn:St),Yi(n,o);l&&(Yi(n,St),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Jr(n,1),a.uncache=1,wf(i)))}},ho={clearProps:function(e,t,n,i,r){if(r.data!=="isFromStart"){var a=e._pt=new pn(e._pt,t,n,0,0,by);return a.u=i,a.pr=-10,a.tween=r,e._props.push(n),1}}},Zr=[1,0,0,1,0,0],Df={},Lf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Qh=function(e){var t=wn(e,St);return Lf(t)?Zr:t.substr(7).match(Vd).map(Pt)},_u=function(e,t){var n=e._gsap||ds(e),i=e.style,r=Qh(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Zr:r):(r===Zr&&!e.offsetParent&&e!==er&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,er.appendChild(e)),r=Qh(e),l?i.display=l:Yi(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):er.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Tc=function(e,t,n,i,r,a){var o=e._gsap,l=r||_u(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,d=o.yOffset||0,f=l[0],g=l[1],_=l[2],p=l[3],m=l[4],x=l[5],S=t.split(" "),b=parseFloat(S[0])||0,A=parseFloat(S[1])||0,T,w,v,M;n?l!==Zr&&(w=f*p-g*_)&&(v=b*(p/w)+A*(-_/w)+(_*x-p*m)/w,M=b*(-g/w)+A*(f/w)-(f*x-g*m)/w,b=v,A=M):(T=Rf(e),b=T.x+(~S[0].indexOf("%")?b/100*T.width:b),A=T.y+(~(S[1]||S[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(m=b-c,x=A-u,o.xOffset=h+(m*f+x*_)-m,o.yOffset=d+(m*g+x*p)-x):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=A,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[mn]="0px 0px",a&&(Gi(a,o,"xOrigin",c,b),Gi(a,o,"yOrigin",u,A),Gi(a,o,"xOffset",h,o.xOffset),Gi(a,o,"yOffset",d,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+A)},Jr=function(e,t){var n=e._gsap||new mf(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=wn(e,mn)||"0",u,h,d,f,g,_,p,m,x,S,b,A,T,w,v,M,P,R,D,z,O,L,N,k,K,J,te,_e,he,De,Be,Ce;return u=h=d=_=p=m=x=S=b=0,f=g=1,n.svg=!!(e.getCTM&&Pf(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[St]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[St]!=="none"?l[St]:"")),i.scale=i.rotate=i.translate="none"),w=_u(e,n.svg),n.svg&&(n.uncache?(K=e.getBBox(),c=n.xOrigin-K.x+"px "+(n.yOrigin-K.y)+"px",k=""):k=!t&&e.getAttribute("data-svg-origin"),Tc(e,k||c,!!k||n.originIsAbsolute,n.smooth!==!1,w)),A=n.xOrigin||0,T=n.yOrigin||0,w!==Zr&&(R=w[0],D=w[1],z=w[2],O=w[3],u=L=w[4],h=N=w[5],w.length===6?(f=Math.sqrt(R*R+D*D),g=Math.sqrt(O*O+z*z),_=R||D?qs(D,R)*as:0,x=z||O?qs(z,O)*as+_:0,x&&(g*=Math.abs(Math.cos(x*tr))),n.svg&&(u-=A-(A*R+T*z),h-=T-(A*D+T*O))):(Ce=w[6],De=w[7],te=w[8],_e=w[9],he=w[10],Be=w[11],u=w[12],h=w[13],d=w[14],v=qs(Ce,he),p=v*as,v&&(M=Math.cos(-v),P=Math.sin(-v),k=L*M+te*P,K=N*M+_e*P,J=Ce*M+he*P,te=L*-P+te*M,_e=N*-P+_e*M,he=Ce*-P+he*M,Be=De*-P+Be*M,L=k,N=K,Ce=J),v=qs(-z,he),m=v*as,v&&(M=Math.cos(-v),P=Math.sin(-v),k=R*M-te*P,K=D*M-_e*P,J=z*M-he*P,Be=O*P+Be*M,R=k,D=K,z=J),v=qs(D,R),_=v*as,v&&(M=Math.cos(v),P=Math.sin(v),k=R*M+D*P,K=L*M+N*P,D=D*M-R*P,N=N*M-L*P,R=k,L=K),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),f=Pt(Math.sqrt(R*R+D*D+z*z)),g=Pt(Math.sqrt(N*N+Ce*Ce)),v=qs(L,N),x=Math.abs(v)>2e-4?v*as:0,b=Be?1/(Be<0?-Be:Be):0),n.svg&&(k=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Lf(wn(e,St)),k&&e.setAttribute("transform",k))),Math.abs(x)>90&&Math.abs(x)<270&&(r?(f*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Pt(f),n.scaleY=Pt(g),n.rotation=Pt(_)+o,n.rotationX=Pt(p)+o,n.rotationY=Pt(m)+o,n.skewX=x+o,n.skewY=S+o,n.transformPerspective=b+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[mn]=fo(c)),n.xOffset=n.yOffset=0,n.force3D=An.force3D,n.renderTransform=n.svg?Ty:Cf?If:Ey,n.uncache=0,n},fo=function(e){return(e=e.split(" "))[0]+" "+e[1]},pl=function(e,t,n){var i=tn(t);return Pt(parseFloat(t)+parseFloat($i(e,"x",n+"px",i)))+i},Ey=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,If(e,t)},ns="0deg",wr="0px",is=") ",If=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,x=n.target,S=n.zOrigin,b="",A=m==="auto"&&e&&e!==1||m===!0;if(S&&(h!==ns||u!==ns)){var T=parseFloat(u)*tr,w=Math.sin(T),v=Math.cos(T),M;T=parseFloat(h)*tr,M=Math.cos(T),a=pl(x,a,w*M*-S),o=pl(x,o,-Math.sin(T)*-S),l=pl(x,l,v*M*-S+S)}p!==wr&&(b+="perspective("+p+is),(i||r)&&(b+="translate("+i+"%, "+r+"%) "),(A||a!==wr||o!==wr||l!==wr)&&(b+=l!==wr||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+is),c!==ns&&(b+="rotate("+c+is),u!==ns&&(b+="rotateY("+u+is),h!==ns&&(b+="rotateX("+h+is),(d!==ns||f!==ns)&&(b+="skew("+d+", "+f+is),(g!==1||_!==1)&&(b+="scale("+g+", "+_+is),x.style[St]=b||"translate(0, 0)"},Ty=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,x=n.forceCSS,S=parseFloat(a),b=parseFloat(o),A,T,w,v,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=tr,c*=tr,A=Math.cos(l)*h,T=Math.sin(l)*h,w=Math.sin(l-c)*-d,v=Math.cos(l-c)*d,c&&(u*=tr,M=Math.tan(c-u),M=Math.sqrt(1+M*M),w*=M,v*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),A*=M,T*=M)),A=Pt(A),T=Pt(T),w=Pt(w),v=Pt(v)):(A=h,v=d,T=w=0),(S&&!~(a+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(S=$i(f,"x",a,"px"),b=$i(f,"y",o,"px")),(g||_||p||m)&&(S=Pt(S+g-(g*A+_*w)+p),b=Pt(b+_-(g*T+_*v)+m)),(i||r)&&(M=f.getBBox(),S=Pt(S+i/100*M.width),b=Pt(b+r/100*M.height)),M="matrix("+A+","+T+","+w+","+v+","+S+","+b+")",f.setAttribute("transform",M),x&&(f.style[St]=M)},wy=function(e,t,n,i,r){var a=360,o=Ht(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?as:1),c=l-i,u=i+c+"deg",h,d;return o&&(h=r.split("_")[1],h==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),h==="cw"&&c<0?c=(c+a*Yh)%a-~~(c/a)*a:h==="ccw"&&c>0&&(c=(c-a*Yh)%a-~~(c/a)*a)),e._pt=d=new pn(e._pt,t,n,i,c,ly),d.e=u,d.u="deg",e._props.push(n),d},ed=function(e,t){for(var n in t)e[n]=t[n];return e},Ay=function(e,t,n){var i=ed({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,h,d,f,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[St]=t,o=Jr(n,1),Yi(n,St),n.setAttribute("transform",c)):(c=getComputedStyle(n)[St],a[St]=t,o=Jr(n,1),a[St]=c);for(l in wi)c=i[l],u=o[l],c!==u&&r.indexOf(l)<0&&(f=tn(c),g=tn(u),h=f!==g?$i(n,l,c,g):parseFloat(c),d=parseFloat(u),e._pt=new pn(e._pt,o,l,h,d-h,Sc),e._pt.u=g||0,e._props.push(l));ed(o,i)};fn("padding,margin,Width,Radius",function(s,e){var t="Top",n="Right",i="Bottom",r="Left",a=(e<3?[t,n,i,r]:[t+r,t+n,i+n,i+r]).map(function(o){return e<2?s+o:"border"+o+s});ho[e>1?"border"+s:s]=function(o,l,c,u,h){var d,f;if(arguments.length<4)return d=a.map(function(g){return _i(o,g,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},a.forEach(function(g,_){return f[g]=d[_]=d[_]||d[(_-1)/2|0]}),o.init(l,f,h)}});var Uf={name:"css",register:Ec,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,r){var a=this._props,o=e.style,l=n.vars.startAt,c,u,h,d,f,g,_,p,m,x,S,b,A,T,w,v,M;fu||Ec(),this.styles=this.styles||Af(e),v=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(yn[_]&&_f(_,t,n,i,e,r)))){if(f=typeof u,g=ho[_],f==="function"&&(u=u.call(n,i,e,r),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=$r(u)),g)g(this,e,_,u,n)&&(w=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Xi.lastIndex=0,Xi.test(c)||(p=tn(c),m=tn(u),m?p!==m&&(c=$i(e,_,c,m)+m):p&&(u+=p)),this.add(o,"setProperty",c,u,i,r,0,0,_),a.push(_),v.push(_,0,o[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,r):l[_],Ht(c)&&~c.indexOf("random(")&&(c=$r(c)),tn(c+"")||c==="auto"||(c+=An.units[_]||tn(_i(e,_))||""),(c+"").charAt(1)==="="&&(c=_i(e,_))):c=_i(e,_),d=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),h=parseFloat(u),_ in ni&&(_==="autoAlpha"&&(d===1&&_i(e,"visibility")==="hidden"&&h&&(d=0),v.push("visibility",0,o.visibility),Gi(this,o,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=ni[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in wi,S){if(this.styles.save(_),M=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=wn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=u,u=wn(e,"perspective"),P?e.style.perspective=P:Yi(e,"perspective")}h=parseFloat(u)}if(b||(A=e._gsap,A.renderTransform&&!t.parseTransform||Jr(e,t.parseTransform),T=t.smoothOrigin!==!1&&A.smooth,b=this._pt=new pn(this._pt,o,St,0,1,A.renderTransform,A,0,-1),b.dep=1),_==="scale")this._pt=new pn(this._pt,A,"scaleY",A.scaleY,(x?Qs(A.scaleY,x+h):h)-A.scaleY||0,Sc),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){v.push(mn,0,o[mn]),u=Sy(u),A.svg?Tc(e,u,0,T,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==A.zOrigin&&Gi(this,A,"zOrigin",A.zOrigin,m),Gi(this,o,_,fo(c),fo(u)));continue}else if(_==="svgOrigin"){Tc(e,u,1,T,0,this);continue}else if(_ in Df){wy(this,A,_,d,x?Qs(d,x+u):u);continue}else if(_==="smoothOrigin"){Gi(this,A,"smooth",A.smooth,u);continue}else if(_==="force3D"){A[_]=u;continue}else if(_==="transform"){Ay(this,u,e);continue}}else _ in o||(_=fr(_)||_);if(S||(h||h===0)&&(d||d===0)&&!oy.test(u)&&_ in o)p=(c+"").substr((d+"").length),h||(h=0),m=tn(u)||(_ in An.units?An.units[_]:p),p!==m&&(d=$i(e,_,c,m)),this._pt=new pn(this._pt,S?A:o,_,d,(x?Qs(d,x+h):h)-d,!S&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?hy:Sc),this._pt.u=m||0,S&&M!==u?(this._pt.b=c,this._pt.e=M,this._pt.r=uy):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=cy);else if(_ in o)yy.call(this,e,_,c,x?x+u:u);else if(_ in e)this.add(e,_,c||e[_],x?x+u:u,i,r);else if(_!=="parseTransform"){iu(_,u);continue}S||(_ in o?v.push(_,0,o[_]):typeof e[_]=="function"?v.push(_,2,e[_]()):v.push(_,1,c||e[_])),a.push(_)}}w&&Sf(this)},render:function(e,t){if(t.tween._time||!pu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:_i,aliases:ni,getSetter:function(e,t,n){var i=ni[t];return i&&i.indexOf(",")<0&&(t=i),t in wi&&t!==mn&&(e._gsap.x||_i(e,"x"))?n&&qh===n?t==="scale"?my:py:(qh=n||{})&&(t==="scale"?_y:gy):e.style&&!eu(e.style[t])?dy:~t.indexOf("-")?fy:hu(e,t)},core:{_removeProperty:Yi,_getMatrix:_u}};_n.utils.checkPrefix=fr;_n.core.getStyleSaver=Af;(function(s,e,t,n){var i=fn(s+","+e+","+t,function(r){wi[r]=1});fn(e,function(r){An.units[r]="deg",Df[r]=1}),ni[i[13]]=s+","+e,fn(n,function(r){var a=r.split(":");ni[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");fn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){An.units[s]="px"});_n.registerPlugin(Uf);var Ys=_n.registerPlugin(Uf)||_n;Ys.core.Tween;function Cy(){const s=Ke(new I(0,0,0)),e=Ke(!1),t=Ke(!1),n=Ke("universe"),i=Ke(null),r=Ke(0),a=Ke(!1),o=new we;let l=new Zm,c=0,u=0;function h(w){const v=w.camera.position;l.setFromVector3(v.clone().sub(s.value)),r.value=performance.now()}function d(w){const v=w.camera.position.distanceTo(s.value);v>150?n.value="universe":v>40?n.value="galaxy":v>10?n.value="system":n.value="planet"}function f(w,v,M){e.value=!0,c=-v*.005,u=-M*.005,_(w),r.value=performance.now(),a.value=!1}function g(){e.value=!1}function _(w){l.theta+=c,l.phi+=u,l.phi=Math.max(.1,Math.min(Math.PI*.45,l.phi));const v=new I().setFromSpherical(l).add(s.value);w.camera.position.copy(v),w.camera.lookAt(s.value),d(w)}function p(w){if(Math.abs(c)<1e-4&&Math.abs(u)<1e-4){c=0,u=0;return}c*=.94,u*=.94,_(w)}function m(w){if(e.value||t.value)return;performance.now()-r.value>3e4&&(a.value=!0,c=.001,u=0,_(w))}function x(w,v){l.radius-=v*3,l.radius=Math.max(3,Math.min(350,l.radius));const M=new I().setFromSpherical(l).add(s.value);Ys.to(w.camera.position,{x:M.x,y:M.y,z:M.z,duration:.25,ease:"power2.out",overwrite:!0}),w.camera.lookAt(s.value),d(w),r.value=performance.now(),a.value=!1}function S(w,v,M=null){t.value=!0;const P=setTimeout(()=>{t.value=!1},3e3);i.value=M,a.value=!1,c=0,u=0;const R=v.clone();Ys.to(s.value,{x:R.x,y:R.y,z:R.z,duration:1.2,ease:"power2.inOut",onUpdate:()=>w.camera.lookAt(s.value)});const D=w.camera.position.clone().sub(R).normalize(),z=R.clone().add(D.multiplyScalar(8));Ys.to(w.camera.position,{x:z.x,y:z.y,z:z.z,duration:1.2,ease:"power2.inOut",onUpdate:()=>{l.setFromVector3(w.camera.position.clone().sub(s.value))},onComplete:()=>{clearTimeout(P),t.value=!1,d(w)}}),r.value=performance.now()}function b(w){t.value=!0;const v=setTimeout(()=>{t.value=!1},3e3);i.value=null,a.value=!1,c=0,u=0,Ys.to(s.value,{x:0,y:0,z:0,duration:1,ease:"power2.inOut",onUpdate:()=>w.camera.lookAt(s.value)}),Ys.to(w.camera.position,{x:0,y:30,z:120,duration:1,ease:"power2.inOut",onUpdate:()=>{l.setFromVector3(w.camera.position.clone().sub(s.value))},onComplete:()=>{clearTimeout(v),t.value=!1,n.value="universe"}})}function A(w,v,M){const P=new I,R=new I;w.camera.getWorldDirection(new I),P.crossVectors(w.camera.up,new I().subVectors(w.camera.position,s.value).normalize()).normalize(),R.copy(w.camera.up).normalize();const D=l.radius*.002;s.value.add(P.multiplyScalar(-v*D)),s.value.add(R.multiplyScalar(M*D)),w.camera.lookAt(s.value),r.value=performance.now(),a.value=!1}function T(w){w.camera.aspect=window.innerWidth/window.innerHeight,w.camera.updateProjectionMatrix(),w.renderer.setSize(window.innerWidth,window.innerHeight)}return{target:s,isDragging:e,isAnimating:t,zoomLevel:n,selectedNodeId:i,autoRotating:a,dragStart:o,init:h,orbit:f,endDrag:g,zoom:x,flyTo:S,resetView:b,updateZoomLevel:d,onResize:T,applyInertia:p,startAutoRotate:m,pan:A}}function Ry(){const s=Ke(null),e=new Km;e.params.Points.threshold=.8;function t(r,a,o){e.setFromCamera(a,r.camera);const l=[];for(const c of o)for(const u of c.starNodes)l.push(u.mesh);return e.intersectObjects(l,!1)}function n(r,a,o){var c;const l=t(r,a,o);if(l.length>0){const u=l[0].object,h=(c=u.userData)==null?void 0:c.nodeId;if(h)return{nodeId:h,point:l[0].point,mesh:u}}return null}function i(r,a){return new we(r/window.innerWidth*2-1,-(a/window.innerHeight)*2+1)}return{hoveredNodeId:s,raycaster:e,getIntersections:t,raycast:n,toNDC:i}}function Py(){return{mouseDown:!1,mouseMoved:!1,prevMouse:new we,currMouse:new we,touchStartPos:null,touchStartDist:0,touchMoved:!1}}function Dy(s,e,t,n,i,r,a,o,l){const c=Py();function u(){return s()}function h(M){u()&&(c.mouseDown=!0,c.mouseMoved=!1,c.prevMouse.set(M.clientX,M.clientY),c.currMouse.set(M.clientX,M.clientY),t.dragStart.set(M.clientX,M.clientY))}function d(M){const P=u();if(P){if(c.currMouse.set(M.clientX,M.clientY),c.mouseDown){const R=M.clientX-c.prevMouse.x,D=M.clientY-c.prevMouse.y;(Math.abs(R)>1||Math.abs(D)>1)&&(c.mouseMoved=!0),c.mouseMoved&&!t.isAnimating.value&&t.orbit(P,R,D),c.prevMouse.set(M.clientX,M.clientY);return}if(!t.isAnimating.value){const R=n.toNDC(M.clientX,M.clientY),D=n.raycast(P,R,e());i.hoverNode((D==null?void 0:D.nodeId)??null)}}}function f(M){const P=u();if(!P||!c.mouseDown)return;if(c.mouseDown=!1,c.mouseMoved){t.endDrag();return}const R=n.toNDC(M.clientX,M.clientY),D=n.raycast(P,R,e());if(D){const z=new I;D.mesh.getWorldPosition(z),i.selectNode(D.nodeId),t.flyTo(P,z,D.nodeId),r.navigateTo(D.nodeId)}}function g(){const M=u();M&&(i.selectNode(null),t.resetView(M),r.refreshRecommendation())}function _(M){const P=u();P&&(M.preventDefault(),t.zoom(P,M.deltaY*.05))}function p(){const M=u();M&&(t.onResize(M),M.composer.setSize(window.innerWidth,window.innerHeight),M.bloomPass.resolution.set(window.innerWidth,window.innerHeight))}function m(M){if(u()){if(M.touches.length===1)c.touchStartPos={x:M.touches[0].clientX,y:M.touches[0].clientY},c.touchStartDist=0,c.touchMoved=!1,c.prevMouse.set(M.touches[0].clientX,M.touches[0].clientY),c.mouseDown=!0;else if(M.touches.length===2){const R=M.touches[0].clientX-M.touches[1].clientX,D=M.touches[0].clientY-M.touches[1].clientY;c.touchStartDist=Math.sqrt(R*R+D*D),c.mouseDown=!1}}}function x(M){const P=u();if(P){if(M.preventDefault(),M.touches.length===1&&c.mouseDown){const R=M.touches[0].clientX,D=M.touches[0].clientY;c.currMouse.set(R,D);const z=R-c.prevMouse.x,O=D-c.prevMouse.y;(Math.abs(z)>1||Math.abs(O)>1)&&(c.touchMoved=!0,c.mouseMoved=!0),c.touchMoved&&!t.isAnimating.value&&t.orbit(P,z,O),c.prevMouse.set(R,D),c.touchStartPos=null}else if(M.touches.length===2){const R=M.touches[0].clientX-M.touches[1].clientX,D=M.touches[0].clientY-M.touches[1].clientY,z=Math.sqrt(R*R+D*D);if(c.touchStartDist>0){const O=(c.touchStartDist-z)*.3;t.zoom(P,O)}c.touchStartDist=z,c.touchMoved=!0,c.mouseDown=!1}}}function S(){const M=u();if(M){if(c.mouseDown=!1,c.touchMoved){t.endDrag(),c.touchStartPos=null,c.touchMoved=!1;return}if(c.touchStartPos){const P=n.toNDC(c.touchStartPos.x,c.touchStartPos.y),R=n.raycast(M,P,e());if(R){const D=new I;R.mesh.getWorldPosition(D),i.selectNode(R.nodeId),t.flyTo(M,D,R.nodeId),r.navigateTo(R.nodeId)}else i.selectNode(null),t.resetView(M),r.refreshRecommendation()}c.touchStartPos=null,c.touchMoved=!1}}function b(M){const P=u();if(P)switch(M.key.toLowerCase()){case"escape":i.selectNode(null),t.resetView(P),r.refreshRecommendation();break;case"r":r.refreshRecommendation();break;case"w":l.w=!0;break;case"a":l.a=!0;break;case"s":l.s=!0;break;case"d":l.d=!0;break;case"f":(M.ctrlKey||M.metaKey)&&M.preventDefault();break}}function A(M){switch(M.key.toLowerCase()){case"w":l.w=!1;break;case"a":l.a=!1;break;case"s":l.s=!1;break;case"d":l.d=!1;break}}function T(M,P){const R=u();R&&t.flyTo(R,M,P)}function w(){typeof window>"u"||(window.addEventListener("mousedown",h),window.addEventListener("mousemove",d),window.addEventListener("mouseup",f),window.addEventListener("dblclick",g),window.addEventListener("wheel",_,{passive:!1}),window.addEventListener("resize",p),window.addEventListener("keydown",b),window.addEventListener("keyup",A),window.addEventListener("touchstart",m,{passive:!0}),window.addEventListener("touchmove",x,{passive:!1}),window.addEventListener("touchend",S))}function v(){typeof window>"u"||(window.removeEventListener("mousedown",h),window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",f),window.removeEventListener("dblclick",g),window.removeEventListener("wheel",_),window.removeEventListener("resize",p),window.removeEventListener("keydown",b),window.removeEventListener("keyup",A),window.removeEventListener("touchstart",m),window.removeEventListener("touchmove",x),window.removeEventListener("touchend",S))}return{es:c,flyTo:T,register:w,unregister:v,onResize:p}}const Ly=[{id:"sys_prog_basics",name:"编程与算法基础",galaxyId:"gal_main"},{id:"sys_computer",name:"计算机系统",galaxyId:"gal_main"},{id:"sys_software",name:"软件工程",galaxyId:"gal_main"},{id:"sys_ai",name:"人工智能方向",galaxyId:"gal_main"},{id:"sys_frontier",name:"前沿与应用",galaxyId:"gal_main"}],wc=[{id:"gal_main",name:"计算机科学",nameEn:"Computer Science",color:"#4a6cf7",position:[0,0,0],systems:Ly}],$s={sys_prog_basics:"#4A90D9",sys_computer:"#26A69A",sys_software:"#FFA726",sys_ai:"#AB47BC",sys_frontier:"#EF5350"},an=[{id:"c_c_lang",name:"C语言程序设计",nameEn:"C Programming",type:"knowledge",difficulty:.15,mastery:.85,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:[],next:["c_cpp_oop","c_ds","c_computer_arch"],position:[0,0,0],description:"数据类型、流程控制、函数、指针、动态内存管理、文件操作。"},{id:"c_python",name:"Python程序设计",nameEn:"Python Programming",type:"knowledge",difficulty:.15,mastery:.9,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:[],next:["c_java_oop","c_ds","c_ai_intro","c_ml"],position:[0,0,0],description:"基础语法、数据结构、函数式编程、面向对象、模块与包、高级特性。"},{id:"c_java_oop",name:"面向对象程序设计(Java)",nameEn:"Object-Oriented Programming (Java)",type:"project",difficulty:.4,mastery:.6,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:["c_python"],next:["c_software_eng","c_ds"],position:[0,0,0],description:"类与对象、封装继承多态、集合框架、多线程、Lambda与Stream API。"},{id:"c_cpp_oop",name:"面向对象程序设计(C++)",nameEn:"Object-Oriented Programming (C++)",type:"knowledge",difficulty:.4,mastery:.5,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:["c_c_lang"],next:["c_computer_graphics","c_ds"],position:[0,0,0],description:"引用、类与对象、继承多态、模板、STL容器、智能指针、移动语义。"},{id:"c_ds",name:"数据结构",nameEn:"Data Structures",type:"knowledge",difficulty:.45,mastery:.5,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:["c_c_lang","c_python"],next:["c_algorithm","c_compiler","c_db"],position:[0,0,0],description:"线性表、栈队列、树与二叉树、图、散列表、堆、并查集、平衡树。"},{id:"c_algorithm",name:"算法设计与分析",nameEn:"Algorithm Design & Analysis",type:"exercise",difficulty:.65,mastery:.25,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:["c_ds"],next:[],position:[0,0,0],description:"递归分治、动态规划、贪心算法、回溯法、图算法、NP完全理论、近似算法。"},{id:"c_compiler",name:"编译原理",nameEn:"Compiler Design",type:"exercise",difficulty:.7,mastery:.1,galaxy:"gal_main",system:"sys_prog_basics",prerequisites:["c_ds","c_cpp_oop"],next:[],position:[0,0,0],description:"词法分析、语法分析(LL/LR)、语义分析、中间代码生成、代码优化、目标代码生成。"},{id:"c_computer_arch",name:"计算机组成原理",nameEn:"Computer Organization",type:"knowledge",difficulty:.4,mastery:.45,galaxy:"gal_main",system:"sys_computer",prerequisites:["c_c_lang"],next:["c_os","c_network"],position:[0,0,0],description:"冯·诺依曼结构、数据表示、运算器、存储系统、指令系统、CPU流水线、总线与I/O。"},{id:"c_os",name:"操作系统",nameEn:"Operating Systems",type:"knowledge",difficulty:.5,mastery:.35,galaxy:"gal_main",system:"sys_computer",prerequisites:["c_computer_arch","c_c_lang"],next:["c_security","c_bigdata"],position:[0,0,0],description:"进程线程、CPU调度、同步互斥、死锁、内存管理、文件系统、设备管理、虚拟化。"},{id:"c_network",name:"计算机网络",nameEn:"Computer Networks",type:"knowledge",difficulty:.45,mastery:.4,galaxy:"gal_main",system:"sys_computer",prerequisites:["c_computer_arch"],next:["c_security","c_bigdata"],position:[0,0,0],description:"OSI/TCP/IP模型、物理层、数据链路层、IP路由、TCP/UDP、HTTP/HTTPS、网络安全。"},{id:"c_db",name:"数据库系统原理",nameEn:"Database Systems",type:"project",difficulty:.45,mastery:.35,galaxy:"gal_main",system:"sys_computer",prerequisites:["c_ds","c_software_eng"],next:["c_bigdata"],position:[0,0,0],description:"关系模型、SQL语言、范式设计、B+树索引、事务ACID、并发控制、查询优化、NoSQL。"},{id:"c_software_eng",name:"软件工程",nameEn:"Software Engineering",type:"knowledge",difficulty:.4,mastery:.3,galaxy:"gal_main",system:"sys_software",prerequisites:["c_java_oop","c_python"],next:["c_software_test","c_db"],position:[0,0,0],description:"需求工程、系统设计、架构模式(MVC/微服务)、UML建模、测试、DevOps/CI/CD。"},{id:"c_software_test",name:"软件测试",nameEn:"Software Testing",type:"knowledge",difficulty:.45,mastery:.2,galaxy:"gal_main",system:"sys_software",prerequisites:["c_software_eng"],next:[],position:[0,0,0],description:"黑盒/白盒测试、单元测试(JUnit/PyTest)、集成测试、自动化测试(Selenium)、性能测试。"},{id:"c_discrete_math",name:"离散数学",nameEn:"Discrete Mathematics",type:"knowledge",difficulty:.4,mastery:.5,galaxy:"gal_main",system:"sys_ai",prerequisites:[],next:["c_ai_intro"],position:[0,0,0],description:"数理逻辑、集合论、图论、代数系统(群环域)、组合数学。"},{id:"c_probability",name:"概率论与数理统计",nameEn:"Probability & Statistics",type:"knowledge",difficulty:.45,mastery:.6,galaxy:"gal_main",system:"sys_ai",prerequisites:[],next:["c_ml","c_rl"],position:[0,0,0],description:"概率基础、随机变量、多维随机变量、大数定律、参数估计、假设检验、回归分析。"},{id:"c_ai_intro",name:"人工智能导论",nameEn:"Introduction to AI",type:"knowledge",difficulty:.2,mastery:.55,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_python","c_discrete_math"],next:["c_ml"],position:[0,0,0],description:"AI定义、问题求解与搜索、知识与推理、机器学习入门、神经网络基础、AI伦理。"},{id:"c_ml",name:"机器学习",nameEn:"Machine Learning",type:"project",difficulty:.5,mastery:.3,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_python","c_probability","c_ai_intro"],next:["c_dl","c_rl"],position:[0,0,0],description:"KNN、决策树、SVM、随机森林、XGBoost、K-Means、PCA、模型评估与调参。"},{id:"c_dl",name:"深度学习",nameEn:"Deep Learning",type:"knowledge",difficulty:.55,mastery:.2,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_ml"],next:["c_nlp","c_cv"],position:[0,0,0],description:"感知机MLP、反向传播、CNN(LeNet/VGG/ResNet)、激活函数、BatchNorm、Dropout。"},{id:"c_nlp",name:"自然语言处理",nameEn:"Natural Language Processing",type:"project",difficulty:.5,mastery:.1,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_dl","c_python"],next:[],position:[0,0,0],description:"分词、词向量(Word2Vec/GloVe)、RNN/LSTM、注意力机制、Transformer(BERT/GPT)。"},{id:"c_cv",name:"计算机视觉",nameEn:"Computer Vision",type:"project",difficulty:.5,mastery:.1,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_dl"],next:[],position:[0,0,0],description:"图像分类(AlexNet/ResNet)、目标检测(Faster R-CNN/YOLO)、迁移学习、图像分割。"},{id:"c_rl",name:"强化学习与生成式AI",nameEn:"Reinforcement Learning & GenAI",type:"knowledge",difficulty:.7,mastery:0,galaxy:"gal_main",system:"sys_ai",prerequisites:["c_ml","c_probability"],next:[],position:[0,0,0],description:"MDP、贝尔曼方程、DQN、PPO、GAN、扩散模型、VAE、多模态生成(Stable Diffusion)。"},{id:"c_computer_graphics",name:"计算机图形学",nameEn:"Computer Graphics",type:"knowledge",difficulty:.65,mastery:.05,galaxy:"gal_main",system:"sys_frontier",prerequisites:["c_cpp_oop"],next:[],position:[0,0,0],description:"图形流水线、三维变换与投影、光照模型(Phong)、Bézier曲线曲面、光线追踪、纹理映射。"},{id:"c_security",name:"信息安全基础",nameEn:"Information Security",type:"knowledge",difficulty:.5,mastery:.1,galaxy:"gal_main",system:"sys_frontier",prerequisites:["c_network","c_os"],next:[],position:[0,0,0],description:"CIA三要素、对称/非对称加密、哈希与数字签名、身份认证、Web安全(OWASP Top 10)、隐私保护。"},{id:"c_bigdata",name:"大数据与云计算",nameEn:"Big Data & Cloud Computing",type:"knowledge",difficulty:.6,mastery:0,galaxy:"gal_main",system:"sys_frontier",prerequisites:["c_db","c_os","c_network"],next:[],position:[0,0,0],description:"HDFS、MapReduce、Spark、Hive、Kafka、Docker/Kubernetes、AWS/GCP云服务。"}],Nf="universe_bookmarks";function Iy(){try{const s=localStorage.getItem(Nf);return s?JSON.parse(s):[]}catch{return[]}}function Uy(s){try{localStorage.setItem(Nf,JSON.stringify(s))}catch{}}const na=ld("universe",()=>{const s=Ke(an),e=Ke(wc),t=Ke(null),n=Ke(null),i=Ke("universe"),r=Ke(Iy()),a=yt(()=>s.value.find(p=>p.id===t.value)??null),o=yt(()=>e.value.map(p=>{const m=s.value.filter(b=>b.galaxy===p.id),x=m.length,S=m.filter(b=>b.mastery>=.7).length;return{galaxy:p,progress:x>0?S/x:0,mastered:S,total:x}})),l=yt(()=>{const p=s.value.length,m=s.value.filter(x=>x.mastery>=.7).length;return p>0?m/p:0}),c=yt(()=>s.value.filter(p=>r.value.includes(p.id)));function u(p){t.value=p}function h(p){n.value=p}function d(p){i.value=p}function f(p,m){const x=s.value.find(S=>S.id===p);x&&(x.mastery=Math.max(0,Math.min(1,m)))}function g(p){const m=r.value.indexOf(p);m>=0?r.value.splice(m,1):r.value.push(p),Uy(r.value)}function _(p){return r.value.includes(p)}return{nodes:s,galaxyList:e,selectedNodeId:t,hoveredNodeId:n,currentZoomLevel:i,bookmarkedNodeIds:r,selectedNode:a,galaxyProgress:o,overallProgress:l,bookmarkedNodes:c,selectNode:u,hoverNode:h,setZoomLevel:d,updateMastery:f,toggleBookmark:g,isBookmarked:_}});function Ny(){const s=Ke(null),e=Ke([]);function t(){const u=new Map;for(const h of an)u.set(h.id,[...h.next]);return u}function n(u){const h=t(),d=new Map,f=u.map(_=>[_,0,[_]]),g=new Set;for(;f.length>0;){f.sort((S,b)=>S[1]-b[1]);const[_,p,m]=f.shift();if(g.has(_))continue;g.add(_),(!d.has(_)||d.get(_).dist>p)&&d.set(_,{dist:p,path:m});const x=h.get(_)||[];for(const S of x)g.has(S)||f.push([S,p+1,[...m,S]])}return d}function i(){return an.filter(u=>u.mastery>=.7)}function r(u,h){const d=u.difficulty*.35,f=Math.min(h,5)*.25,g=(1-u.mastery)*.3,_=Math.random()*.05;return d+f+g+_}function a(u,h,d){const f=[()=>h.length>1&&h[h.length-2]?`完成「${h[h.length-2].name}」后，建议继续深入「${u.name}」，这是自然的学习路径`:`「${u.name}」是当前最优的学习方向，难度适中，可以开始学习了`,()=>u.prerequisites.length>0?`前置知识「${u.prerequisites.map(p=>{var m;return(m=an.find(x=>x.id===p))==null?void 0:m.name}).filter(Boolean).join("、")}」已掌握，现在可以学习「${u.name}」了`:`「${u.name}」没有前置依赖，可以直接开始学习`,()=>u.difficulty<.3?`「${u.name}」难度较低，适合作为当前阶段的学习目标，快速建立信心`:u.difficulty>.7?`「${u.name}」难度较高，但你的知识储备已经足够，可以挑战一下`:`「${u.name}」难度适中，距离当前掌握的知识点很近，适合继续推进`,()=>{const _=an.filter(x=>x.galaxy===u.galaxy),p=_.filter(x=>x.mastery>=.7).length,m=_.length;if(m>0){const x=Math.round(p/m*100);return x<30?`在「${u.name}」所在星系的学习进度为 ${x}%，继续推进这个星系的知识点`:x>70?`这个星系即将完成（${x}%），学习「${u.name}」向新星系进发`:`当前星系进度 ${x}%，「${u.name}」是接下来的好目标`}return`推荐学习「${u.name}」，拓展你的知识版图`},()=>u.mastery<.2?`「${u.name}」掌握度较低（${Math.round(u.mastery*100)}%），建议优先巩固这个知识点`:`「${u.name}」已有 ${Math.round(u.mastery*100)}% 掌握度，再进一步就能完全掌握了`,()=>u.type==="project"?`理论之后需要实践，「${u.name}」是一个实战项目，可以动手试试`:u.type==="exercise"?`「${u.name}」是一个练习，通过练习巩固已学知识`:`探索「${u.name}」，扩展你的知识体系`,()=>h.length<=2?`「${u.name}」距离你已掌握的知识只有 ${h.length-1} 步，轻松可达`:`虽然「${u.name}」需要 ${h.length-1} 步的学习路径，但每一步都有前置支撑`,()=>{const _=u.next.map(p=>{var m;return(m=an.find(x=>x.id===p))==null?void 0:m.name}).filter(Boolean);return _.length>0?`掌握「${u.name}」后，可以继续学习 ${_.slice(0,2).join("、")}${_.length>2?" 等":""}，学习路径很清晰`:`「${u.name}」是一个终点知识点，掌握后可以考虑探索新的星系`}],g=Math.floor((u.difficulty*7+u.mastery*3+h.length*2+d)%f.length);return f[g]()}function o(){const u=new Set(i().map(p=>p.id)),h=[...u];if(h.length===0){const p=an.filter(x=>x.prerequisites.length===0).sort((x,S)=>x.difficulty-S.difficulty);if(p.length===0)return null;const m=p[0];return s.value=m,e.value=[m],{nodeId:m.id,node:m,pathLength:1,reason:a(m,[m],0)}}const d=n(h),f=[];for(const p of an){if(p.mastery>=.7)continue;const m=d.get(p.id);if(!m||m.dist<=0||m.dist>=15)continue;p.prerequisites.every(S=>u.has(S))&&f.push({node:p,dist:m.dist,path:m.path})}if(f.length===0)for(const p of an){if(p.mastery>=.7)continue;const m=d.get(p.id);m&&m.dist>0&&m.dist<15&&f.push({node:p,dist:m.dist,path:m.path})}if(f.length===0)return null;f.sort((p,m)=>r(p.node,p.dist)-r(m.node,m.dist));const g=f[0],_=g.path.map(p=>an.find(m=>m.id===p)).filter(Boolean);return s.value=g.node,e.value=_,{nodeId:g.node.id,node:g.node,pathLength:g.dist,reason:a(g.node,_,h.length)}}function l(u){const h=i().map(g=>g.id);if(h.length===0)return[];const f=n(h).get(u);return f?f.path.map(g=>an.find(_=>_.id===g)).filter(Boolean):[]}function c(){const u=new Set(i().map(h=>h.id));return an.filter(h=>h.mastery>=.7?!1:h.prerequisites.every(d=>u.has(d)))}return{recommendedNode:s,currentPath:e,recommendNext:o,getPathToNode:l,findMasteredNodes:i,findUnlockedNodes:c}}const xr=ld("agent",()=>{const{recommendedNode:s,currentPath:e,recommendNext:t,getPathToNode:n,findMasteredNodes:i,findUnlockedNodes:r}=Ny(),a=Ke(null),o=Ke(!1),l=Ke(0);function c(){a.value=t()}function u(d){const f=n(d),g=f[f.length-1];o.value=!0,l.value=0,g&&(a.value={nodeId:d,node:g,pathLength:f.length,reason:`正在导航到 ${g.name}`})}function h(d){o.value&&(l.value+=d*.3,l.value>=1&&(l.value=0,o.value=!1))}return{recommendation:a,recommendedNode:s,currentPath:e,isNavigating:o,shipProgress:l,refreshRecommendation:c,navigateTo:u,updateShipProgress:h,findMasteredNodes:i,findUnlockedNodes:r}}),Fy=`varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vDist;

uniform float uTime;

void main() {
  vec3 pos = position;

  // Very subtle surface shimmer (barely visible, just adds life)
  float wave = sin(pos.x * 5.0 + uTime * 1.5) * cos(pos.z * 5.0 + uTime * 1.0) * 0.005;
  pos += normal * wave;

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPos.xyz;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vNormal = normalize(normalMatrix * normal);
  vPosition = pos;
  vDist = length(mvPosition.xyz);
}
`,Oy=`varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vDist;

uniform vec3 uColor;
uniform float uTime;
uniform float uGlow;
uniform float uMastery;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = 1.0 - abs(dot(viewDir, vNormal));
  fresnel = pow(fresnel, 2.0);

  // Dual pulse: one fast shimmer, one slow breathing
  float fastPulse = sin(uTime * 3.0 + vPosition.x * 8.0 + vPosition.z * 6.0) * 0.15;
  float slowPulse = sin(uTime * 0.8) * 0.1 + 0.9;
  float pulse = (1.0 + fastPulse) * slowPulse;

  // Glow intensity scales with mastery and fresnel
  float glowIntensity = fresnel * uGlow * (0.4 + uMastery * 0.6) * pulse;

  // Core brightness
  float core = 0.6 + uMastery * 0.4 + fresnel * 0.3;

  // Color composition
  vec3 coreColor = uColor * 2.0 * core;
  vec3 glowColor = uColor * 0.8;
  vec3 rimColor = uColor * 1.4;

  vec3 finalColor = mix(glowColor, rimColor, fresnel * 0.6);
  finalColor += glowColor * glowIntensity * 0.6;

  // Add a bright center spot
  float centerDot = 1.0 - length(vPosition) * 0.8;
  centerDot = max(0.0, centerDot);
  finalColor += uColor * centerDot * 1.5 * (0.5 + uMastery * 0.5);

  // Alpha: bright in center, soft glow at edges
  float alpha = 0.7 + fresnel * 0.3 + uMastery * 0.2;
  alpha = clamp(alpha, 0.4, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
`,By=new km,Fa=new Map,zy={c_java_oop:{surface:"/assets/textures/premium/mars-4k.jpg",bump:"/assets/textures/premium/mars-bump-2k.jpg",bumpScale:.03,roughness:.94,metalness:.02,emissiveIntensity:.08,atmosphereColor:16752746,atmosphereOpacity:.12,rotationSpeed:.0024},c_db:{surface:"/assets/textures/premium/jupiter-4k.jpg",roughness:.98,metalness:.01,emissiveIntensity:.06,atmosphereColor:16765348,atmosphereOpacity:.12,rotationSpeed:.0021},c_ml:{surface:"/assets/textures/premium/earth-daymap-4k.jpg",normal:"/assets/textures/premium/earth-normal-2k.png",roughnessMap:"/assets/textures/premium/earth-roughness-2k.jpg",roughness:1,metalness:.02,emissiveIntensity:.03,atmosphereColor:7186687,atmosphereOpacity:.22,cloudMap:"/assets/textures/premium/earth-clouds-2k.jpg",cloudOpacity:.92,rotationSpeed:.0025},c_nlp:{surface:"/assets/textures/premium/venus-surface-4k.jpg",bump:"/assets/textures/premium/venus-surface-bump-2k.jpg",bumpScale:.018,roughness:.95,metalness:.01,emissiveIntensity:.04,atmosphereColor:16044460,atmosphereOpacity:.14,overlayMap:"/assets/textures/premium/venus-atmosphere-4k.jpg",overlayOpacity:.9,rotationSpeed:.0018},c_cv:{surface:"/assets/textures/premium/saturn-4k.jpg",roughness:.96,metalness:.01,emissiveIntensity:.05,atmosphereColor:15325374,atmosphereOpacity:.1,ringMap:"/assets/textures/premium/saturn-ring-4k.png",ringInnerScale:1.45,ringOuterScale:2.7,ringTilt:.42,rotationSpeed:.002},c_bigdata:{surface:"/assets/textures/premium/moon-4k.jpg",bump:"/assets/textures/premium/moon-bump-2k.jpg",bumpScale:.055,roughness:.99,metalness:0,emissiveIntensity:.03,atmosphereColor:13162495,atmosphereOpacity:.08,rotationSpeed:.0017},c_rl:{surface:"/assets/textures/premium/mercury-4k.jpg",bump:"/assets/textures/premium/mercury-bump-2k.jpg",bumpScale:.05,roughness:.98,metalness:.01,emissiveIntensity:.05,atmosphereColor:16765616,atmosphereOpacity:.08,rotationSpeed:.0019}};function ss(s,e=!0){const t=`${s}|${e?"srgb":"linear"}`;if(Fa.has(t))return Fa.get(t);const n=By.load(s,()=>{n.colorSpace=e?on:Jn,n.wrapS=Qa,n.wrapT=Nn,Fa.set(t,n)},void 0,()=>console.warn(`Planet texture failed: ${s}`));return n.colorSpace=e?on:Jn,Fa.set(t,n),n}class ky{constructor(e,t,n,i,r){rt(this,"mesh");rt(this,"node");rt(this,"ring",null);rt(this,"atmosphereMesh",null);rt(this,"cloudMesh",null);rt(this,"decorativeRingMesh",null);rt(this,"overlayMesh",null);rt(this,"rotationSpeed",.003);this.node=e;const a=.4+e.difficulty*.8+e.mastery*.4,o=new js(a,56,56),l=e.type==="project"?zy[e.id]:void 0;let c;if(l)c=new Zo({map:ss(l.surface),bumpMap:l.bump?ss(l.bump,!1):null,bumpScale:l.bumpScale??0,normalMap:l.normal?ss(l.normal,!1):null,roughnessMap:l.roughnessMap?ss(l.roughnessMap,!1):null,roughness:l.roughness??.9,metalness:l.metalness??.02,clearcoat:.08,clearcoatRoughness:.65,emissive:t.clone().multiplyScalar(.4),emissiveIntensity:l.emissiveIntensity??.06}),this.rotationSpeed=l.rotationSpeed??this.rotationSpeed;else if(e.type==="project")c=new Zo({color:t,roughness:.55,metalness:.08,clearcoat:.08,clearcoatRoughness:.45,emissive:t,emissiveIntensity:.2});else{const u={uColor:{value:t},uTime:{value:0},uGlow:{value:1.5},uMastery:{value:e.mastery}};c=new Nt({vertexShader:Fy,fragmentShader:Oy,uniforms:u,transparent:!0,blending:Bn,depthWrite:!1})}this.mesh=new $t(o,c),this.mesh.position.set(n,i,r),l&&(l.atmosphereColor&&this.buildAtmosphere(a,l.atmosphereColor,l.atmosphereOpacity??.14),l.cloudMap&&this.buildCloudLayer(a,l.cloudMap,l.cloudOpacity??.8),l.overlayMap&&this.buildOverlayLayer(a,l.overlayMap,l.overlayOpacity??.85),l.ringMap&&this.buildPlanetRing(a,l.ringMap,l.ringInnerScale??1.4,l.ringOuterScale??2.6,l.ringTilt??.38)),this.buildSelectionRing(a)}buildAtmosphere(e,t,n){const i=e*1.09,r=new js(i,40,40),a=new Nt({vertexShader:`
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPos.xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float rim = 1.0 - max(0.0, dot(normal, viewDir));
          rim = pow(rim, 3.0);
          float alpha = rim * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,uniforms:{uColor:{value:new Se(t)},uOpacity:{value:n}},transparent:!0,blending:Bn,depthWrite:!1,side:Si});this.atmosphereMesh=new $t(r,a),this.mesh.add(this.atmosphereMesh)}buildCloudLayer(e,t,n){const i=new js(e*1.025,40,40),r=ss(t,!1),a=new Dm({color:16251903,alphaMap:r,transparent:!0,opacity:n,depthWrite:!1,blending:Hi,side:Un,shininess:8});this.cloudMesh=new $t(i,a),this.mesh.add(this.cloudMesh)}buildOverlayLayer(e,t,n){const i=new js(e*1.04,48,48),r=new Ad({map:ss(t),transparent:!0,opacity:n,depthWrite:!1,roughness:.85,metalness:0,side:Un});this.overlayMesh=new $t(i,r),this.mesh.add(this.overlayMesh)}buildPlanetRing(e,t,n,i,r){const a=new jc(e*n,e*i,128),o=ss(t,!1),l=new Hr({color:15192755,alphaMap:o,transparent:!0,opacity:.88,depthWrite:!1,side:Un,blending:Hi});this.decorativeRingMesh=new $t(a,l),this.decorativeRingMesh.rotation.x=Math.PI/2-r,this.decorativeRingMesh.rotation.z=Math.random()*Math.PI,this.mesh.add(this.decorativeRingMesh)}buildSelectionRing(e){const t=new Kc(e*1.5,.04,12,48),n=new Hr({color:4491519,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,blending:Bn});this.ring=new $t(t,n),this.ring.renderOrder=999,this.ring.visible=!0,this.ring.rotation.x=Math.PI*.3,this.ring.rotation.z=Math.random()*Math.PI,this.mesh.add(this.ring)}update(e){if(this.mesh.material instanceof Nt?(this.mesh.material.uniforms.uTime.value=e,this.mesh.material.uniforms.uMastery.value=this.node.mastery):this.mesh.material instanceof Zo&&(this.mesh.material.emissiveIntensity=(this.node.type==="project"?.05:.2)+this.node.mastery*.08+Math.sin(e*1.2+this.mesh.position.x)*.015,this.mesh.rotation.y+=this.rotationSpeed),this.atmosphereMesh&&(this.atmosphereMesh.rotation.y+=8e-4),this.cloudMesh&&(this.cloudMesh.rotation.y+=this.rotationSpeed*1.45),this.overlayMesh&&(this.overlayMesh.rotation.y+=this.rotationSpeed*.9),this.decorativeRingMesh&&(this.decorativeRingMesh.rotation.z+=8e-4),this.ring){this.ring.rotation.z+=.005;const t=this.ring.material;t.opacity<.3?t.opacity=.08+Math.sin(e*.6+this.mesh.position.x)*.04:t.opacity=Math.max(.1,t.opacity-.004)}}highlight(e){if(!this.ring)return;this.ring.visible=!0;const t=this.ring.material;t.color.set(6333946),t.opacity=e?.5:0}select(e){if(!this.ring)return;this.ring.visible=!0;const t=this.ring.material;t.color.set(e?15777856:16777215),t.opacity=e?.8:0}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.atmosphereMesh&&(this.atmosphereMesh.geometry.dispose(),this.atmosphereMesh.material.dispose()),this.cloudMesh&&(this.cloudMesh.geometry.dispose(),this.cloudMesh.material.dispose()),this.overlayMesh&&(this.overlayMesh.geometry.dispose(),this.overlayMesh.material.dispose()),this.decorativeRingMesh&&(this.decorativeRingMesh.geometry.dispose(),this.decorativeRingMesh.material.dispose()),this.ring&&(this.ring.geometry.dispose(),this.ring.material.dispose())}}function Oa(s,e){let t=s*374761393+e*668265263+1274126177;return t=(t^t>>13)*1274126177,t=t^t>>16,(t&2147483647)/2147483647}function Vy(s,e){const t=Math.floor(s),n=Math.floor(e),i=s-t,r=e-n,a=i*i*(3-2*i),o=r*r*(3-2*r),l=Oa(t,n),c=Oa(t+1,n),u=Oa(t,n+1),h=Oa(t+1,n+1);return l+(c-l)*a+(u+(h-u)*a-(l+(c-l)*a))*o}function td(s,e,t=1){let n=0,i=1,r=1,a=0;for(let o=0;o<t;o++)n+=Vy(s*r,e*r)*i,a+=i,i*=.5,r*=2;return n/a}function Gy(s=64){const e=document.createElement("canvas");e.width=e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,255,255,0.9)"),n.addColorStop(.5,"rgba(255,255,255,0.4)"),n.addColorStop(.8,"rgba(255,255,255,0.05)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,s,s),new ro(e)}const nd=Gy(),ml={count:1e4,radius:28,branches:3,spin:1.5,randomness:.35,randomnessPower:2.5,thickness:.25,armWidth:.3};function Hy(s,e,t){const{count:n,radius:i,branches:r,spin:a,randomness:o,randomnessPower:l,thickness:c}=s,u=new Float32Array(n*3),h=new Float32Array(n*3),d=new Float32Array(n);for(let f=0;f<n;f++){const g=Math.pow(Math.random(),1.2)*i,_=f%r/r*Math.PI*2,p=g*a,m=Math.pow(Math.random(),l)*o*g,x=Math.random()*Math.PI*2,S=Math.cos(x)*m,b=Math.sin(x)*m*.8,A=(Math.random()-.5)*g*c*.5,T=_+p;u[f*3]=Math.cos(T)*g+S,u[f*3+1]=A,u[f*3+2]=Math.sin(T)*g+b;const w=g/i,v=e.clone().lerp(t,w),M=.6+Math.random()*.4;h[f*3]=v.r*M,h[f*3+1]=v.g*M,h[f*3+2]=v.b*M,d[f]=(.08+(1-w)*.3)*(.6+Math.random()*.8)}return{positions:u,colors:h,sizes:d}}class Wy{constructor(e){rt(this,"group");rt(this,"galaxy");rt(this,"starNodes",[]);rt(this,"spiralPoints",null);rt(this,"glowHalo",null);this.galaxy=e,this.group=new Oi;const t=e.position[0],n=e.position[1],i=e.position[2],r=e.position[0],a=e.position[2],o=(td(r*.1,a*.1,3)-.5)*20,l=(td(r*.1+100,a*.1+100,3)-.5)*20;this.group.position.set(t+o,n,i+l),this.buildSpiral(),this.buildHalo(),this.placeKnowledgeNodes()}buildSpiral(){const e=new Se(this.galaxy.color),t=new Se("#ffcc80"),n=e.clone(),i={...ml},r=this.galaxy.systems.length;i.count=1e4+r*2500,i.radius=30+r*6;const{positions:a,colors:o,sizes:l}=Hy(i,t,n),c=new Lt;c.setAttribute("position",new ft(a,3)),c.setAttribute("color",new ft(o,3)),c.setAttribute("size",new ft(l,1));const u=new rr({size:.25,map:nd,vertexColors:!0,transparent:!0,opacity:.85,blending:Bn,depthWrite:!1,sizeAttenuation:!0});this.spiralPoints=new Wr(c,u),this.spiralPoints.renderOrder=1,this.group.add(this.spiralPoints)}buildHalo(){const t=new Float32Array(600),n=new Float32Array(200),i=new Float32Array(200*3),r=new Se(this.galaxy.color),a=8;for(let c=0;c<200;c++){const u=Math.random()*Math.PI*2,h=Math.acos(2*Math.random()-1),d=Math.pow(Math.random(),.5)*a;t[c*3]=Math.sin(h)*Math.cos(u)*d,t[c*3+1]=Math.sin(h)*Math.sin(u)*d*.3,t[c*3+2]=Math.cos(h)*d;const f=r.clone(),g=.3+Math.random()*.4;i[c*3]=f.r*g,i[c*3+1]=f.g*g,i[c*3+2]=f.b*g,n[c]=(1+Math.random()*3)*(1-d/a)}const o=new Lt;o.setAttribute("position",new ft(t,3)),o.setAttribute("color",new ft(i,3)),o.setAttribute("size",new ft(n,1));const l=new rr({size:1.5,map:nd,vertexColors:!0,transparent:!0,opacity:.15,blending:Bn,depthWrite:!1,sizeAttenuation:!0});this.glowHalo=new Wr(o,l),this.glowHalo.renderOrder=0,this.group.add(this.glowHalo)}placeKnowledgeNodes(){const e=an.filter(o=>o.galaxy===this.galaxy.id);if(e.length===0)return;const t=[...e].sort((o,l)=>o.difficulty-l.difficulty),n=ml.branches,i=30+this.galaxy.systems.length*6,r=ml.spin,a=t.map((o,l)=>({node:o,branch:Math.floor(Math.random()*n),t:l/Math.max(t.length-1,1)*.8+.1,radialJitter:(Math.random()-.5)*10,angularJitter:(Math.random()-.5)*.4,heightJitter:(Math.random()-.5)*4}));for(const o of a){const{node:l,branch:c,t:u,radialJitter:h,angularJitter:d,heightJitter:f}=o,g=4+u*(i-6)+h,_=g*r,m=c/n*Math.PI*2+_+d,x=Math.cos(m)*Math.max(1,g),S=Math.sin(m)*Math.max(1,g),b=f;l.position=[this.group.position.x+x,this.group.position.y+b,this.group.position.z+S];const A=Xy(l),T=new ky(l,new Se(A),x,b,S);T.mesh.userData={nodeId:l.id,galaxyId:this.galaxy.id},this.starNodes.push(T),this.group.add(T.mesh)}}update(e){if(this.spiralPoints&&(this.spiralPoints.rotation.y+=8e-5),this.glowHalo){this.glowHalo.rotation.y+=15e-5;const t=this.glowHalo.material;t.opacity=.12+Math.sin(e*.3)*.04}for(const t of this.starNodes)t.update(e)}dispose(){for(const e of this.starNodes)e.dispose();this.spiralPoints&&(this.spiralPoints.geometry.dispose(),this.spiralPoints.material.dispose()),this.glowHalo&&(this.glowHalo.geometry.dispose(),this.glowHalo.material.dispose()),this.starNodes=[],this.spiralPoints=null,this.glowHalo=null}}function Xy(s){switch(s.type){case"knowledge":return"#60a5fa";case"project":return"#4ade80";case"exercise":return"#fb923c";default:return"#60a5fa"}}let Ba=null;function qy(){if(Ba)return Ba;const s=128,e=document.createElement("canvas");e.width=e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.1,"rgba(255,255,255,0.6)"),n.addColorStop(.3,"rgba(255,255,255,0.2)"),n.addColorStop(.6,"rgba(255,255,255,0.03)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,s,s),Ba=new ro(e),Ba}class Yy{constructor(e,t,n=1200,i=35,r=.25){rt(this,"mesh");rt(this,"baseOpacity");rt(this,"rotationSpeed");this.baseOpacity=r,this.rotationSpeed=1e-4+Math.random()*2e-4;const a=new Float32Array(n*3),o=new Float32Array(n),l=new Float32Array(n*3);for(let h=0;h<n;h++){const d=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1),g=Math.pow(Math.random(),.5)*i,_=.2+Math.random()*.15;a[h*3]=e.x+Math.sin(f)*Math.cos(d)*g,a[h*3+1]=e.y+Math.sin(f)*Math.sin(d)*g*_,a[h*3+2]=e.z+Math.cos(f)*g;const p=1-g/i;o[h]=(.5+p*3.5)*(.4+Math.random()*1.2);const m=t.clone(),x=.4+p*.6,S=(Math.random()-.5)*.05;m.r=Math.min(1,Math.max(0,m.r*x+(Math.random()-.5)*.08+S)),m.g=Math.min(1,Math.max(0,m.g*x+(Math.random()-.5)*.08-S*.5)),m.b=Math.min(1,Math.max(0,m.b*x+(Math.random()-.5)*.08+S*.5)),l[h*3]=m.r,l[h*3+1]=m.g,l[h*3+2]=m.b}const c=new Lt;c.setAttribute("position",new ft(a,3)),c.setAttribute("size",new ft(o,1)),c.setAttribute("color",new ft(l,3));const u=new rr({size:2,map:qy(),vertexColors:!0,transparent:!0,opacity:r,blending:Bn,depthWrite:!1,sizeAttenuation:!0});this.mesh=new Wr(c,u)}update(e){this.mesh.rotation.y+=this.rotationSpeed;const t=this.mesh.material;t.opacity=this.baseOpacity+Math.sin(e*.3+this.mesh.position.x)*.05}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const id=new ji,za=new I;class Ff extends qm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new bt(e,3)),this.setAttribute("uv",new bt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new lc(t,6,1);return this.setAttribute("instanceStart",new Bi(n,3,0)),this.setAttribute("instanceEnd",new Bi(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new lc(t,6,1);return this.setAttribute("instanceColorStart",new Bi(n,3,0)),this.setAttribute("instanceColorEnd",new Bi(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Am(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),id.setFromBufferAttribute(t),this.boundingBox.union(id))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)za.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(za)),za.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(za));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}ce.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new we(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ln.line={uniforms:Ss.merge([ce.common,ce.fog,ce.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class gu extends Nt{constructor(e){super({type:"LineMaterial",uniforms:Ss.clone(ln.line.uniforms),vertexShader:ln.line.vertexShader,fragmentShader:ln.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const _l=new ut,sd=new I,rd=new I,Wt=new ut,Xt=new ut,jn=new ut,gl=new I,vl=new _t,qt=new e_,ad=new I,ka=new ji,Va=new _r,Kn=new ut;let ei,_s;function od(s,e,t){return Kn.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Kn.multiplyScalar(1/Kn.w),Kn.x=_s/t.width,Kn.y=_s/t.height,Kn.applyMatrix4(s.projectionMatrixInverse),Kn.multiplyScalar(1/Kn.w),Math.abs(Math.max(Kn.x,Kn.y))}function $y(s,e){const t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){qt.start.fromBufferAttribute(i,o),qt.end.fromBufferAttribute(r,o),qt.applyMatrix4(t);const c=new I,u=new I;ei.distanceSqToSegment(qt.start,qt.end,u,c),u.distanceTo(c)<_s*.5&&e.push({point:u,pointOnLine:c,distance:ei.origin.distanceTo(u),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function jy(s,e,t){const n=e.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),h=-e.near;ei.at(1,jn),jn.w=1,jn.applyMatrix4(e.matrixWorldInverse),jn.applyMatrix4(n),jn.multiplyScalar(1/jn.w),jn.x*=r.x/2,jn.y*=r.y/2,jn.z=0,gl.copy(jn),vl.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=u;d<f;d++){if(Wt.fromBufferAttribute(l,d),Xt.fromBufferAttribute(c,d),Wt.w=1,Xt.w=1,Wt.applyMatrix4(vl),Xt.applyMatrix4(vl),Wt.z>h&&Xt.z>h)continue;if(Wt.z>h){const S=Wt.z-Xt.z,b=(Wt.z-h)/S;Wt.lerp(Xt,b)}else if(Xt.z>h){const S=Xt.z-Wt.z,b=(Xt.z-h)/S;Xt.lerp(Wt,b)}Wt.applyMatrix4(n),Xt.applyMatrix4(n),Wt.multiplyScalar(1/Wt.w),Xt.multiplyScalar(1/Xt.w),Wt.x*=r.x/2,Wt.y*=r.y/2,Xt.x*=r.x/2,Xt.y*=r.y/2,qt.start.copy(Wt),qt.start.z=0,qt.end.copy(Xt),qt.end.z=0;const _=qt.closestPointToPointParameter(gl,!0);qt.at(_,ad);const p=Qp.lerp(Wt.z,Xt.z,_),m=p>=-1&&p<=1,x=gl.distanceTo(ad)<_s*.5;if(m&&x){qt.start.fromBufferAttribute(l,d),qt.end.fromBufferAttribute(c,d),qt.start.applyMatrix4(a),qt.end.applyMatrix4(a);const S=new I,b=new I;ei.distanceSqToSegment(qt.start,qt.end,b,S),t.push({point:b,pointOnLine:S,distance:ei.origin.distanceTo(b),object:s,face:null,faceIndex:d,uv:null,uv1:null})}}}class Ky extends $t{constructor(e=new Ff,t=new gu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)sd.fromBufferAttribute(t,a),rd.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+sd.distanceTo(rd);const r=new lc(i,2,1);return e.setAttribute("instanceDistanceStart",new Bi(r,1,0)),e.setAttribute("instanceDistanceEnd",new Bi(r,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ei=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;_s=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Va.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=_s*.5;else{const h=Math.max(i.near,Va.distanceToPoint(ei.origin));c=od(i,h,l.resolution)}if(Va.radius+=c,ei.intersectsSphere(Va)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ka.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=_s*.5;else{const h=Math.max(i.near,ka.distanceToPoint(ei.origin));u=od(i,h,l.resolution)}ka.expandByScalar(u),ei.intersectsBox(ka)!==!1&&(n?$y(this,t):jy(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(_l),this.material.uniforms.resolution.value.set(_l.z,_l.w))}}class Of extends Ff{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Zy extends Ky{constructor(e=new Of,t=new gu({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}class Jy{constructor(e,t,n,i,r){rt(this,"line");rt(this,"fromId");rt(this,"toId");rt(this,"_baseOpacity",.16);rt(this,"_highlighted",!1);rt(this,"_dimmed",!1);this.fromId=e,this.toId=t;const a=this._curvePoints(n,i),o=new Of;o.setPositions(Array.from(a));const l=new gu({color:r.getHex(),linewidth:1.4,resolution:new we(window.innerWidth,window.innerHeight),transparent:!0,opacity:this._baseOpacity,blending:Bn,depthWrite:!1,worldUnits:!1});this.line=new Zy(o,l),this.line.renderOrder=2,this.line.frustumCulled=!1,this.line.userData={isGraphEdge:!0,fromId:e,toId:t}}_curvePoints(e,t,n=20){const i=this._computeMid(e,t),r=new Float32Array((n+1)*3);for(let a=0;a<=n;a++){const o=a/n,l=1-o;r[a*3]=l*l*e.x+2*l*o*i.x+o*o*t.x,r[a*3+1]=l*l*e.y+2*l*o*i.y+o*o*t.y,r[a*3+2]=l*l*e.z+2*l*o*i.z+o*o*t.z}return r}_computeMid(e,t){const n=new I().addVectors(e,t).multiplyScalar(.5),i=new I().subVectors(t,e).normalize(),r=new I(0,1,0);Math.abs(i.dot(r))>.9&&r.set(1,0,0);const a=new I().crossVectors(i,r).normalize(),o=e.distanceTo(t),l=Math.max(1.5,o*.1),c=(this.fromId.charCodeAt(0)+this.toId.charCodeAt(0))%2===0?1:-1;return a.multiplyScalar(c*l),a.y+=l*.2,n.add(a),n}setHighlight(e){this._highlighted=e,this._apply()}setDim(e){this._dimmed=e,this._apply()}_apply(){const e=this.line.material;this._highlighted?e.opacity=.8:this._dimmed?e.opacity=.025:e.opacity=this._baseOpacity}setResolution(e,t){this.line.material.resolution.set(e,t)}update(e){}dispose(){this.line.geometry.dispose(),this.line.material.dispose()}}class Qy{constructor(){rt(this,"group");rt(this,"_edges",new Map);rt(this,"_adjacency",new Map);rt(this,"_nodeMap",new Map);rt(this,"_colorMap",new Map);this.group=new Oi,this.group.renderOrder=1;for(const[e,t]of Object.entries($s))this._colorMap.set(e,new Se(t))}build(e){this.clear();for(const n of e)this._nodeMap.set(n.id,n);const t=new Set;for(const n of e){for(const i of n.next){const r=this._nodeMap.get(i);if(!r)continue;const a=[n.id,i].sort().join("::");t.has(a)||(t.add(a),this._createEdge(n,r))}for(const i of n.prerequisites){const r=this._nodeMap.get(i);if(!r)continue;const a=[n.id,i].sort().join("::");t.has(a)||(t.add(a),this._createEdge(r,n))}}}_getColor(e){return this._colorMap.get(e.system)??new Se(6710886)}_createEdge(e,t){const n=new I(...e.position),i=new I(...t.position),r=this._getColor(e).clone(),a=new Jy(e.id,t.id,n,i,r),o=`${e.id}->${t.id}`;this._edges.set(o,a),this._addAdjacency(e.id,o),this._addAdjacency(t.id,o),this.group.add(a.line)}update(e){for(const t of this._edges.values())t.update(e)}onNodeHover(e){if(!e){for(const n of this._edges.values())n.setHighlight(!1),n.setDim(!1);return}const t=this._adjacency.get(e);for(const[n,i]of this._edges)t!=null&&t.has(n)?i.setHighlight(!0):i.setDim(!0)}getConnectedNodeIds(e){const t=this._adjacency.get(e);if(!t)return[];const n=new Set;for(const i of t){const r=this._edges.get(i);r&&(r.fromId!==e&&n.add(r.fromId),r.toId!==e&&n.add(r.toId))}return Array.from(n)}_addAdjacency(e,t){this._adjacency.has(e)||this._adjacency.set(e,new Set),this._adjacency.get(e).add(t)}clear(){for(const e of this._edges.values())e.dispose();this._edges.clear(),this._adjacency.clear()}dispose(){this.clear(),this._nodeMap.clear()}}const eS={class:"top-bar glass-deep"},tS={class:"bar-left"},nS={key:0,class:"galaxy-info glass-light"},iS={class:"galaxy-copy"},sS={class:"galaxy-name"},rS={class:"bar-right"},aS={class:"progress-block"},oS={class:"progress-value"},lS={class:"progress-bar"},cS={class:"top-bar-actions"},uS={key:0,class:"bookmarks-dropdown"},hS={class:"text-xs"},dS={key:0,class:"bookmarks-list glass"},fS=["onClick"],pS={class:"text-xs text-white/75"},mS={class:"zoom-badge glass-light"},_S={class:"zoom-value"},gS=bs({__name:"TopBar",setup(s){const e=na(),t=xr(),n=Ke(!1),i=yt(()=>e.selectedNode?e.galaxyList.find(d=>{var f;return d.id===((f=e.selectedNode)==null?void 0:f.galaxy)})??null:null),r=yt(()=>e.overallProgress),a=yt(()=>e.nodes.filter(d=>d.mastery>=.7).length),o=yt(()=>e.nodes.length),l=yt(()=>e.bookmarkedNodes),c=yt(()=>{switch(e.currentZoomLevel){case"universe":return"宇宙总览";case"galaxy":return"银河层级";case"system":return"星系结构";case"planet":return"行星细节";default:return""}});function u(d){e.selectNode(d.id),t.navigateTo(d.id),n.value=!1}function h(d){switch(d.type){case"knowledge":return"dot-knowledge";case"project":return"dot-project";case"exercise":return"dot-exercise";default:return""}}return(d,f)=>(ke(),We("div",eS,[X("div",tS,[f[2]||(f[2]=jf('<div class="logo" data-v-41d2feff><div class="logo-badge" data-v-41d2feff><svg class="logo-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" data-v-41d2feff><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" data-v-41d2feff></polygon></svg></div><div class="logo-copy" data-v-41d2feff><span class="logo-kicker" data-v-41d2feff>Deep Space</span><span class="logo-text" data-v-41d2feff>AI 学习宇宙</span></div></div><div class="sep" data-v-41d2feff></div>',2)),i.value?(ke(),We("div",nS,[X("span",{class:"galaxy-dot",style:hs({background:i.value.color})},null,4),X("div",iS,[f[1]||(f[1]=X("span",{class:"galaxy-label"},"当前星域",-1)),X("span",sS,je(i.value.name),1)])])):Yt("",!0)]),X("div",rS,[X("div",aS,[f[3]||(f[3]=X("div",{class:"progress-label"},"Mastery",-1)),X("div",oS,[Kf(je(Math.round(r.value*100))+"% ",1),X("span",null,je(a.value)+"/"+je(o.value)+" 节点已掌握",1)]),X("div",lS,[X("div",{class:"progress-fill",style:hs({width:`${Math.round(r.value*100)}%`})},null,4)])]),X("div",cS,[l.value.length>0?(ke(),We("div",uS,[X("button",{class:"bookmarks-btn glass-light",onClick:f[0]||(f[0]=g=>n.value=!n.value)},[f[4]||(f[4]=X("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"currentColor",stroke:"none"},[X("polygon",{points:"12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"})],-1)),X("span",hS,je(l.value.length),1)]),pi(gs,{name:"dropdown"},{default:vs(()=>[n.value?(ke(),We("div",dS,[f[5]||(f[5]=X("div",{class:"bookmarks-title"},"收藏节点",-1)),(ke(!0),We(xs,null,nr(l.value,g=>(ke(),We("div",{key:g.id,class:"bookmark-item",onClick:_=>u(g)},[X("div",{class:xi(["bookmark-dot",h(g)])},null,2),X("span",pS,je(g.name),1)],8,fS))),128))])):Yt("",!0)]),_:1})])):Yt("",!0),X("div",mS,[f[6]||(f[6]=X("span",{class:"zoom-label"},"View",-1)),X("span",_S,je(c.value),1)])])])]))}}),vS=pr(gS,[["__scopeId","data-v-41d2feff"]]),xS={key:0,class:"agent-suggestion glass-card"},MS={class:"suggestion-header"},yS={class:"flex-1"},SS={class:"suggestion-name"},bS=["disabled"],ES={key:0,class:"nav-spinner"},TS={key:1,class:"text-xs"},wS={class:"suggestion-meta"},AS={class:"suggestion-reason"},CS=bs({__name:"AgentSuggestion",setup(s){const e=xr(),t=yt(()=>e.recommendation),n=yt(()=>{if(!t.value)return"--";const r=t.value.node.difficulty;return r<.2?"入门":r<.4?"初级":r<.6?"中级":r<.8?"高级":"专家"});function i(){t.value&&e.navigateTo(t.value.nodeId)}return(r,a)=>(ke(),mo(gs,{name:"slide-up"},{default:vs(()=>[t.value?(ke(),We("div",xS,[X("div",MS,[a[1]||(a[1]=X("div",{class:"agent-icon"},[X("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[X("path",{d:"M12 2L2 20h20L12 2z"}),X("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor"})])],-1)),X("div",yS,[a[0]||(a[0]=X("div",{class:"suggestion-label"},"AI Navigation",-1)),X("div",SS,je(t.value.node.name),1)]),X("button",{class:"nav-btn glass-light",onClick:i,disabled:vi(e).isNavigating},[vi(e).isNavigating?(ke(),We("span",ES)):(ke(),We("span",TS,"导航前往"))],8,bS)]),X("div",wS,[X("span",null,"难度 "+je(n.value),1),a[2]||(a[2]=X("span",{class:"meta-sep"},"路",-1)),X("span",null,"掌握度 "+je(Math.round(t.value.node.mastery*100))+"%",1),a[3]||(a[3]=X("span",{class:"meta-sep"},"路",-1)),X("span",null,"路径 "+je(t.value.pathLength)+" 步",1)]),X("div",AS,je(t.value.reason),1)])):Yt("",!0)]),_:1}))}}),RS=pr(CS,[["__scopeId","data-v-4b264f01"]]),PS={key:0,class:"knowledge-card glass"},DS={class:"card-header"},LS={class:"flex items-center gap-3"},IS={class:"text-lg font-bold hud-text mt-1"},US={class:"text-xs text-white/40 mt-1"},NS={class:"flex items-center gap-2"},FS=["title"],OS=["fill"],BS={class:"card-body"},zS={class:"text-sm text-white/64 leading-relaxed"},kS={class:"stats-grid"},VS={class:"stat"},GS={class:"stat-bar"},HS={class:"stat"},WS={class:"stat-bar"},XS={key:0,class:"info-row"},qS={class:"flex flex-wrap gap-1.5"},YS=["onClick"],$S={key:1,class:"info-row"},jS={class:"flex flex-wrap gap-1.5"},KS=["onClick"],ZS={class:"card-footer"},JS=bs({__name:"KnowledgeCard",setup(s){const e=na(),t=xr(),n=yt(()=>e.selectedNode),i=Ke(!1),r=yt(()=>n.value&&e.isBookmarked(n.value.id)),a=yt(()=>{if(!n.value)return"";switch(n.value.type){case"knowledge":return"知识";case"project":return"项目";case"exercise":return"练习"}}),o=yt(()=>{if(!n.value)return"";switch(n.value.type){case"knowledge":return"type-knowledge";case"project":return"type-project";case"exercise":return"type-exercise"}});function l(g){var _;return((_=e.nodes.find(p=>p.id===g))==null?void 0:_.name)??g}function c(){e.selectNode(null)}function u(g){e.selectNode(g),t.navigateTo(g)}function h(){n.value&&t.navigateTo(n.value.id)}function d(){n.value&&e.toggleBookmark(n.value.id)}function f(){if(!n.value)return;const g=n.value.mastery>=.7?.3:1;e.updateMastery(n.value.id,g),t.refreshRecommendation(),i.value=!0,setTimeout(()=>{i.value=!1},600)}return(g,_)=>(ke(),mo(gs,{name:"slide"},{default:vs(()=>[n.value?(ke(),We("div",PS,[X("div",DS,[X("div",LS,[X("div",{class:xi(["type-badge",o.value])},je(a.value),3),X("div",null,[_[0]||(_[0]=X("div",{class:"panel-kicker"},"Focused Node",-1)),X("div",IS,je(n.value.name),1),X("div",US,je(n.value.nameEn),1)])]),X("div",NS,[X("button",{class:xi(["bookmark-btn",{bookmarked:r.value}]),onClick:d,title:r.value?"取消收藏":"收藏节点"},[(ke(),We("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:r.value?"currentColor":"none",stroke:"currentColor","stroke-width":"1.5"},[..._[1]||(_[1]=[X("polygon",{points:"12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"},null,-1)])],8,OS))],10,FS),X("button",{class:"close-btn",onClick:c},"✕")])]),X("div",BS,[X("p",zS,je(n.value.description),1),X("div",kS,[X("div",VS,[_[2]||(_[2]=X("div",{class:"stat-label"},"难度强度",-1)),X("div",GS,[X("div",{class:"stat-fill difficulty",style:hs({width:`${n.value.difficulty*100}%`})},null,4)])]),X("div",HS,[_[3]||(_[3]=X("div",{class:"stat-label"},"掌握程度",-1)),X("div",WS,[X("div",{class:"stat-fill mastery",style:hs({width:`${n.value.mastery*100}%`})},null,4)])])]),n.value.prerequisites.length>0?(ke(),We("div",XS,[_[4]||(_[4]=X("div",{class:"text-xs text-white/40 mb-2"},"前置知识",-1)),X("div",qS,[(ke(!0),We(xs,null,nr(n.value.prerequisites,p=>(ke(),We("span",{key:p,class:"tag tag-prereq",onClick:m=>u(p)},je(l(p)),9,YS))),128))])])):Yt("",!0),n.value.next.length>0?(ke(),We("div",$S,[_[5]||(_[5]=X("div",{class:"text-xs text-white/40 mb-2"},"后续延展",-1)),X("div",jS,[(ke(!0),We(xs,null,nr(n.value.next,p=>(ke(),We("span",{key:p,class:"tag tag-next",onClick:m=>u(p)},je(l(p)),9,KS))),128))])])):Yt("",!0)]),X("div",ZS,[X("button",{class:"action-btn glass-light",onClick:h}," 开始学习 "),X("button",{class:xi(["action-btn-secondary text-xs",{"mastery-flash":i.value}]),onClick:f},je(n.value.mastery>=.7?"已掌握 ✓":"标记为已掌握"),3)])])):Yt("",!0)]),_:1}))}}),QS=pr(JS,[["__scopeId","data-v-3d4329f4"]]),eb={key:0,class:"path-panel glass-card"},tb={class:"panel-header"},nb={class:"header-text"},ib={class:"header-meta"},sb={class:"header-progress"},rb={class:"progress-ring"},ab={viewBox:"0 0 36 36",width:"28",height:"28"},ob=["stroke-dasharray"],lb={class:"progress-num"},cb={class:"path-timeline"},ub=["onClick"],hb={class:"stop-line"},db={class:"stop-dot"},fb={key:0,class:"dot-inner"},pb={key:0,class:"stop-connector"},mb={class:"stop-info"},_b={class:"stop-name"},gb={class:"stop-detail"},vb={key:0,class:"detail-diff"},xb={key:1,class:"detail-mastery"},Mb={class:"text-xs text-white/35"},yb=bs({__name:"PathMap",setup(s){const e=xr(),t=na(),n=Ke(!1),i=yt(()=>e.currentPath),r=yt(()=>n.value||i.value.length<=8?i.value:i.value.slice(0,6)),a=yt(()=>Math.floor(e.shipProgress*(i.value.length-1))),o=yt(()=>i.value.filter(f=>f.mastery>=.7).length),l=yt(()=>i.value.length>0?i.value.length-1:0),c=yt(()=>i.value.length===0?0:Math.round(o.value/i.value.length*100));function u(f){switch(f.type){case"knowledge":return"知识";case"project":return"项目";case"exercise":return"练习";default:return""}}function h(f){switch(f.type){case"knowledge":return"type-k";case"project":return"type-p";case"exercise":return"type-e";default:return""}}function d(f){t.selectNode(f),e.navigateTo(f)}return(f,g)=>(ke(),mo(gs,{name:"slide-up"},{default:vs(()=>[i.value.length>0?(ke(),We("div",eb,[X("div",tb,[g[4]||(g[4]=X("div",{class:"header-icon"},[X("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[X("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),X("path",{d:"M2 17l10 5 10-5"}),X("path",{d:"M2 12l10 5 10-5"})])],-1)),X("div",nb,[g[1]||(g[1]=X("div",{class:"panel-kicker"},"Pathway",-1)),g[2]||(g[2]=X("div",{class:"header-title"},"学习航线",-1)),X("div",ib,je(i.value.length)+" 个航点 · "+je(l.value)+" 步",1)]),X("div",sb,[X("div",rb,[(ke(),We("svg",ab,[g[3]||(g[3]=X("path",{class:"ring-bg",d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",fill:"none",stroke:"rgba(255,255,255,0.06)","stroke-width":"3"},null,-1)),X("path",{class:"ring-fill","stroke-dasharray":`${c.value}, 100`,d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",fill:"none",stroke:"#73f0d0","stroke-width":"3","stroke-linecap":"round"},null,8,ob)])),X("span",lb,je(o.value)+"/"+je(i.value.length),1)])])]),X("div",cb,[(ke(!0),We(xs,null,nr(r.value,(_,p)=>(ke(),We("div",{key:_.id,class:xi(["path-stop",{mastered:_.mastery>=.7,current:p===a.value,future:_.mastery<.7&&p!==a.value}]),onClick:m=>d(_.id)},[X("div",hb,[X("div",db,[_.mastery>=.7?(ke(),We("div",fb,"✓")):Yt("",!0)]),p<r.value.length-1?(ke(),We("div",pb)):Yt("",!0)]),X("div",mb,[X("div",_b,je(_.name),1),X("div",gb,[X("span",{class:xi(["detail-type",h(_)])},je(u(_)),3),_.difficulty>0?(ke(),We("span",vb," 难度 "+je(Math.round(_.difficulty*100)),1)):Yt("",!0),_.mastery>=.7?(ke(),We("span",xb,"已掌握")):Yt("",!0)])])],10,ub))),128))]),r.value.length<i.value.length?(ke(),We("div",{key:0,class:"expand-hint",onClick:g[0]||(g[0]=_=>n.value=!0)},[X("span",Mb,"还有 "+je(i.value.length-r.value.length)+" 个航点",1),g[5]||(g[5]=X("svg",{viewBox:"0 0 24 24",width:"14",height:"14",fill:"none",stroke:"currentColor","stroke-width":"1.5",class:"expand-arrow"},[X("path",{d:"m6 9 6 6 6-6"})],-1))])):Yt("",!0)])):Yt("",!0)]),_:1}))}}),Sb=pr(yb,[["__scopeId","data-v-49a25875"]]);function bb(){const s=Ke(""),e=Ke(!1),t=Ke(0),n=yt(()=>{const c=s.value.trim().toLowerCase();return c?an.filter(u=>u.name.toLowerCase().includes(c)||u.nameEn.toLowerCase().includes(c)||u.description.toLowerCase().includes(c)).slice(0,12):[]});function i(c){s.value=c,t.value=0,e.value=!0}function r(){e.value=!1,s.value="",t.value=0}function a(){n.value.length!==0&&(t.value=(t.value+1)%n.value.length)}function o(){n.value.length!==0&&(t.value=(t.value-1+n.value.length)%n.value.length)}function l(){return n.value[t.value]??null}return{query:s,isOpen:e,results:n,selectedIndex:t,search:i,close:r,selectNext:a,selectPrev:o,getSelected:l}}const Eb={class:"search-input-wrapper glass-light"},Tb={key:0,class:"search-results glass"},wb=["onClick","onMouseenter"],Ab={class:"result-left"},Cb={class:"result-name"},Rb={class:"result-name-en"},Pb={class:"result-meta"},Db={class:"result-mastery"},Lb=bs({__name:"SearchBar",props:{sceneState:{},galaxyClusters:{},cameraCtrl:{}},emits:["flyTo"],setup(s,{emit:e}){const t=e,n=na(),i=xr(),r=bb(),a=Ke(),o=Ke(""),l=Ke(!1),c=Ke([]);ra(()=>r.query.value,m=>{o.value=m}),ra(()=>o.value,m=>{r.query.value=m}),ra(()=>r.isOpen.value,m=>{l.value=m}),ra(()=>r.results.value,m=>{c.value=m});function u(){r.search(o.value)}function h(){var m;o.value="",r.close(),(m=a.value)==null||m.focus()}function d(){r.close()}function f(m){r.close(),n.selectNode(m.id);const x=new I(...m.position);t("flyTo",x,m.id),i.navigateTo(m.id)}function g(){const m=r.getSelected();m&&f(m)}function _(m){r.selectedIndex.value=m}function p(m){switch(m.type){case"knowledge":return"dot-knowledge";case"project":return"dot-project";case"exercise":return"dot-exercise";default:return""}}return(m,x)=>(ke(),We("div",{class:xi(["search-bar",{open:l.value&&c.value.length>0}])},[X("div",Eb,[x[3]||(x[3]=X("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor","stroke-width":"2"},[X("circle",{cx:"11",cy:"11",r:"8"}),X("path",{d:"m21 21-4.35-4.35"})],-1)),Zf(X("input",{ref_key:"inputRef",ref:a,"onUpdate:modelValue":x[0]||(x[0]=S=>o.value=S),type:"text",class:"search-input",placeholder:"搜索知识节点、课程方向、AI 推荐...",onInput:u,onKeydown:[aa(d,["escape"]),x[1]||(x[1]=aa(Du(S=>vi(r).selectNext(),["prevent"]),["down"])),x[2]||(x[2]=aa(Du(S=>vi(r).selectPrev(),["prevent"]),["up"])),aa(g,["enter"])]},null,544),[[Jf,o.value]]),o.value?(ke(),We("button",{key:0,class:"search-clear",onClick:h},"✕")):Yt("",!0)]),pi(gs,{name:"dropdown"},{default:vs(()=>[l.value&&c.value.length>0?(ke(),We("div",Tb,[(ke(!0),We(xs,null,nr(c.value,(S,b)=>(ke(),We("div",{key:S.id,class:xi(["search-result-item",{highlighted:b===vi(r).selectedIndex.value}]),onClick:A=>f(S),onMouseenter:A=>_(b)},[X("div",Ab,[X("span",{class:xi(["result-type-dot",p(S)])},null,2),X("div",null,[X("div",Cb,je(S.name),1),X("div",Rb,je(S.nameEn),1)])]),X("div",Pb,[X("span",Db,je(Math.round(S.mastery*100))+"%",1)])],42,wb))),128))])):Yt("",!0)]),_:1})],2))}}),Ib=pr(Lb,[["__scopeId","data-v-3c4e37b6"]]),Ub={key:0,class:"hud-layer"},Nb={class:"hud-safe-area"},Fb={class:"legend-panel glass-card"},Ob={class:"legend-items"},Bb={class:"legend-copy"},zb={class:"legend-label"},kb={class:"legend-value"},Vb={key:0,class:"loading-overlay"},Gb={class:"loading-content glass-card"},Hb={key:0,class:"error-box glass-light"},Wb={class:"error-desc"},Xb={class:"loading-text"},qb={class:"loading-progress-bar glass-light"},Yb={class:"loading-percent"},$b=bs({__name:"UniverseCanvas",props:{headerOffset:{default:60}},setup(s){const e=[{id:"sys_prog_basics",name:"编程与算法基础",nameEn:"Programming",color:$s.sys_prog_basics},{id:"sys_computer",name:"计算机系统",nameEn:"Systems",color:$s.sys_computer},{id:"sys_software",name:"软件工程",nameEn:"Engineering",color:$s.sys_software},{id:"sys_ai",name:"人工智能方向",nameEn:"AI",color:$s.sys_ai},{id:"sys_frontier",name:"前沿与应用",nameEn:"Frontier",color:$s.sys_frontier}],t=Ke(),n=Ke(!1),i=Ke("正在校准星图坐标..."),r=Ke(0),a=Ke(null),o=na(),l=xr(),{init:c,dispose:u}=lM(),h=Cy(),d=Ry();let f=null,g=[],_=[],p=null,m=null;const x={w:!1,a:!1,s:!1,d:!1},S=Dy(()=>f,()=>g,h,d,o,l,()=>{},()=>{},x);function b(){return new Promise(v=>setTimeout(v,50))}function A(){window.location.reload()}function T(){f&&(g=wc.map(v=>new Wy(v)),g.forEach(v=>f.stars.add(v.group)),_=wc.map(v=>{const M=new I(v.position[0],v.position[1],v.position[2]);return new Yy(M,new Se(v.color),400,25)}),_.forEach(v=>f.ambientGroup.add(v.mesh)),p=new Qy,p.build(an),f.scene.add(p.group))}Qf(async()=>{try{if(!t.value){a.value="Canvas 元素未找到";return}i.value="正在构建 Three.js 深空场景...",r.value=10,f=c(t.value),i.value="正在初始化星际镜头...",r.value=25,h.init(f),i.value="正在生成银河知识网络...",r.value=40,await b(),T(),i.value="正在部署 AI 导航建议...",r.value=65,await b(),l.refreshRecommendation(),i.value="正在点亮星际粒子与光流...",r.value=85,await b(),r.value=100,n.value=!0,w(),S.register()}catch(v){console.error("Universe init error:",v),a.value=`初始化失败：${v.message||String(v)}`}});function w(){if(!f)return;requestAnimationFrame(w);const v=f.timer.getElapsed();!h.isDragging.value&&!h.isAnimating.value&&(h.applyInertia(f),h.startAutoRotate(f)),x.w&&h.pan(f,0,-4),x.s&&h.pan(f,0,4),x.a&&h.pan(f,-4,0),x.d&&h.pan(f,4,0),f.bgStarfield.rotation.y+=6e-5,f.bgStarfield.rotation.x+=2e-5,f.bgGalaxies.rotation.y+=3e-5;for(const P of g)P.update(v);for(const P of _)P.update(v);p&&p.update(v);const M=o.hoveredNodeId;M!==m&&(m=M,p==null||p.onNodeHover(M)),h.updateZoomLevel(f),o.setZoomLevel(h.zoomLevel.value),f.composer.render()}return ep(()=>{S.unregister();for(const v of g)v.dispose();p&&(p.dispose(),f&&f.scene.remove(p.group),p=null),u(f)}),(v,M)=>(ke(),We("div",{ref:"container",class:"universe-canvas",style:hs({"--header-offset":s.headerOffset+"px"})},[X("canvas",{ref_key:"canvasRef",ref:t},null,512),M[8]||(M[8]=X("div",{class:"scene-bloom","aria-hidden":"true"},null,-1)),M[9]||(M[9]=X("div",{class:"scene-noise","aria-hidden":"true"},null,-1)),pi(gs,{name:"hud-fade"},{default:vs(()=>[n.value?(ke(),We("div",Ub,[X("div",Nb,[pi(vS),pi(Ib,{"scene-state":vi(f),"galaxy-clusters":vi(g),"camera-ctrl":vi(h),onFlyTo:vi(S).flyTo},null,8,["scene-state","galaxy-clusters","camera-ctrl","onFlyTo"]),M[3]||(M[3]=X("div",{class:"scene-hero glass-light"},[X("div",{class:"panel-kicker"},"Celestial Atlas"),X("div",{class:"panel-title"},"宇宙知识星图"),X("div",{class:"panel-caption"}," 在银河级视角里浏览知识节点、学习路径和 AI 导航建议。 ")],-1)),pi(RS),pi(QS),pi(Sb),X("div",Fb,[M[0]||(M[0]=X("div",{class:"panel-kicker"},"Constellation Map",-1)),M[1]||(M[1]=X("div",{class:"legend-title"},"课程星域",-1)),M[2]||(M[2]=X("div",{class:"legend-subtitle"}," 按知识体系切换观察维度，查看整张星图的结构分布。 ",-1)),X("div",Ob,[(ke(),We(xs,null,nr(e,P=>X("div",{class:"legend-item",key:P.id},[X("span",{class:"legend-dot",style:hs({"--dot-color":P.color})},null,4),X("div",Bb,[X("span",zb,je(P.name),1),X("span",kb,je(P.nameEn),1)])])),64))])]),M[4]||(M[4]=X("div",{class:"controls-hint glass-light"},[X("div",{class:"controls-hint-label"},"Navigation"),X("div",{class:"controls-hint-text"}," 拖拽旋转 · 滚轮缩放 · 点击星体查看详情 · 双击回到全景 ")],-1))])])):Yt("",!0)]),_:1}),pi(gs,{name:"hud-fade"},{default:vs(()=>[n.value?Yt("",!0):(ke(),We("div",Vb,[X("div",Gb,[a.value?(ke(),We("div",Hb,[M[5]||(M[5]=X("div",{class:"error-title"},"场景初始化失败",-1)),X("div",Wb,je(a.value),1),X("button",{class:"retry-btn glass",onClick:A},"重新加载")])):(ke(),We(xs,{key:1},[M[6]||(M[6]=X("div",{class:"loading-kicker"},"Entering Deep Space",-1)),M[7]||(M[7]=X("div",{class:"loading-spinner"},null,-1)),X("div",Xb,je(i.value),1),X("div",qb,[X("div",{class:"loading-progress-fill",style:hs({width:`${r.value}%`})},null,4)]),X("div",Yb,je(r.value)+"%",1)],64))])]))]),_:1})],4))}}),jb=pr($b,[["__scopeId","data-v-d2e73b80"]]),Jb=bs({__name:"LearningPath",setup(s){return(e,t)=>(ke(),mo(jb,{"header-offset":60}))}});export{Jb as default};
