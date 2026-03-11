const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-system-extension-CA5Fm0Y3.js","assets/index-lPSxnKn9.js","assets/index-CTYeukuQ.css","assets/ai-service-CEprjB7i.js","assets/command-palette-extension-DqEXEzqu.js","assets/command-shell-extension-CUgHKYBp.js","assets/dataviewer-extension-DwCL_NVF.js","assets/duckdb-extension-DTGd-HeC.js","assets/tslib.es6-D3hF0DQN.js","assets/howto-extension-DFjBbLge.js","assets/in-browser-ml-extension-CYBkTqcU.js","assets/in-browser-ml-service-CM11GSbS.js","assets/linuxterminal-DxI2dk9r.js","assets/md-editor-extension-BJ3AXa5M.js","assets/media-viewer-extension-C69eERao.js","assets/memory-usage-extension-BQm_bu-5.js","assets/monaco-editor-extension-ONhzI_-P.js","assets/monaco-widget-CUzJEZnu.js","assets/monaco-widget-Dvl_Svmm.css","assets/notebook-extension-BSPkry4V.js","assets/python-runtime-extension-BPR6GWT4.js","assets/pyservice-DYR08d9v.js","assets/package-manager-2OzH3U3f.js","assets/commands-Wuj_3FRk.js","assets/rag-system-extension-LEalHxPu.js","assets/settings-tree-extension-Bg_aIXY5.js","assets/index-De26Cn24.js","assets/webdav-extension-D9CnRJS1.js","assets/webllmservice-Djycb509.js","assets/webmcp-extension-BrbIAfkx.js"])))=>i.map(i=>d[i]);
import{e as E,_ as o,i as w,g as tt,a as de,b as ue,c as b,t as G,r as rt,d as D,S as nt,f as it,h as st,T as ot,E as at,L as lt,j as ct,k as dt}from"./index-lPSxnKn9.js";import"./monaco-widget-CUzJEZnu.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))_(a);new MutationObserver(a=>{for(const m of a)if(m.type==="childList")for(const y of m.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&_(y)}).observe(document,{childList:!0,subtree:!0});function h(a){const m={};return a.integrity&&(m.integrity=a.integrity),a.referrerPolicy&&(m.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?m.credentials="include":a.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function _(a){if(a.ep)return;a.ep=!0;const m=h(a);fetch(a.href,m)}})();const ut="@eclipse-lyra/extension-ai-system",pt={name:ut};E.registerExtension({id:pt.name,name:"AI System",description:"AI assistants, chat, and tool execution",loader:()=>o(()=>import("./ai-system-extension-CA5Fm0Y3.js"),__vite__mapDeps([0,1,2,3])),icon:"robot"});const mt="@eclipse-lyra/extension-command-palette",_t={name:mt},Ie=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BMUzmHSG.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BWYi1YcR.js"),[])}),!0);E.registerExtension({id:_t.name,name:Ie.EXT_COMMANDPALETTE_NAME,description:Ie.EXT_COMMANDPALETTE_DESC,loader:()=>o(()=>import("./command-palette-extension-DqEXEzqu.js"),__vite__mapDeps([4,1,2])),icon:"terminal"});const gt="@eclipse-lyra/extension-command-shell",ft={name:gt},$e=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BNyI7vyE.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BBFwxyT0.js"),[])}),!0);E.registerExtension({id:ft.name,name:$e.EXT_COMMANDSHELL_NAME,description:$e.EXT_COMMANDSHELL_DESC,loader:()=>o(()=>import("./command-shell-extension-CUgHKYBp.js"),__vite__mapDeps([5,1,2])),icon:"terminal",experimental:!0});const ht="@eclipse-lyra/extension-dataviewer",vt={name:ht};E.registerExtension({id:vt.name,name:"Data Viewer",description:"Tabular data views, persistence, and CSV/TSV/DuckDB integration",loader:()=>o(()=>import("./dataviewer-extension-DwCL_NVF.js"),__vite__mapDeps([6,1,2])),icon:"table"});const Et="@eclipse-lyra/extension-duckdb",yt={name:Et},Me=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CrncopA1.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-DrfEnFhW.js"),[])}),!0);E.registerExtension({id:yt.name,name:Me.EXT_DUCKDB_NAME,description:Me.EXT_DUCKDB_DESC,loader:()=>o(()=>import("./duckdb-extension-DTGd-HeC.js"),__vite__mapDeps([7,1,2,8])),icon:"database",dependencies:["@eclipse-lyra/extension-monaco-editor"],experimental:!0});const wt="@eclipse-lyra/extension-github-service",bt={name:wt},ke=await w(Object.assign({}),!0);E.registerExtension({id:bt.name,name:ke.EXT_GITHUB_SERVICE_NAME,description:ke.EXT_GITHUB_SERVICE_DESC,loader:()=>o(()=>import("./github-service-extension-9FP3M3ve.js"),[]),icon:"code-branch"});const xt="@eclipse-lyra/extension-howto-system",Tt={name:xt},je=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-DmIVUxyg.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-3uoiMzXB.js"),[])}),!0);E.registerExtension({id:Tt.name,name:je.EXT_HOWTO_NAME,description:je.EXT_HOWTO_DESC,loader:()=>o(()=>import("./howto-extension-DFjBbLge.js"),__vite__mapDeps([9,1,2,3])),icon:"list-check",experimental:!0});const Ot="@eclipse-lyra/extension-in-browser-ml",At={name:Ot},Ve=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BWHLrdUd.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BhDsH6Hy.js"),[])}),!0);E.registerExtension({id:At.name,name:Ve.EXT_IN_BROWSER_ML_NAME,description:Ve.EXT_IN_BROWSER_ML_DESC,loader:()=>o(()=>import("./in-browser-ml-extension-CYBkTqcU.js"),__vite__mapDeps([10,1,2,11])),icon:"brain",experimental:!0});const Lt="@eclipse-lyra/extension-linuxterminal",Rt={name:Lt},Ce=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-Cj9GZiwG.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B39_inUO.js"),[])}),!0);E.registerExtension({id:Rt.name,name:Ce.EXT_LINUXTERMINAL_NAME,description:Ce.EXT_LINUXTERMINAL_DESC,loader:()=>o(()=>import("./linuxterminal-DxI2dk9r.js"),__vite__mapDeps([12,1,2])),icon:"terminal",experimental:!0});const Dt="@eclipse-lyra/extension-md-editor",Pt={name:Dt},Ne=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-B2JDyIPq.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B8YbWLGf.js"),[])}),!0);E.registerExtension({id:Pt.name,name:Ne.EXT_MDEDITOR_NAME,description:Ne.EXT_MDEDITOR_DESC,loader:()=>o(()=>import("./md-editor-extension-BJ3AXa5M.js"),__vite__mapDeps([13,1,2])),icon:"book"});const St="@eclipse-lyra/extension-media-viewer",It={name:St},Xe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CuPIFKj6.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-CccBnscq.js"),[])}),!0);E.registerExtension({id:It.name,name:Xe.EXT_MEDIAVIEWER_NAME,description:Xe.EXT_MEDIAVIEWER_DESC,loader:()=>o(()=>import("./media-viewer-extension-C69eERao.js"),__vite__mapDeps([14,1,2])),icon:"image"});const $t="@eclipse-lyra/extension-memory-usage",Mt={name:$t},qe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BUzdyc_f.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B1paTwCo.js"),[])}),!0);E.registerExtension({id:Mt.name,name:qe.EXT_MEMORYUSAGE_NAME,description:qe.EXT_MEMORYUSAGE_DESC,loader:()=>o(()=>import("./memory-usage-extension-BQm_bu-5.js"),__vite__mapDeps([15,1,2])),icon:"microchip"});const kt="@eclipse-lyra/extension-monaco-editor",jt={name:kt},ze=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-xLvCUmQb.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-ChYDZfG0.js"),[])}),!0);E.registerExtension({id:jt.name,name:ze.EXT_MONACO_NAME,description:ze.EXT_MONACO_DESC,loader:()=>o(()=>import("./monaco-editor-extension-ONhzI_-P.js"),__vite__mapDeps([16,1,2,17,18])),icon:"file-pen"});const Vt="@eclipse-lyra/extension-notebook",Ct={name:Vt},We=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-NIP_kkww.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-azDELEle.js"),[])}),!0);E.registerExtension({id:Ct.name,name:We.EXT_NOTEBOOK_NAME,description:We.EXT_NOTEBOOK_DESC,loader:()=>o(()=>import("./notebook-extension-BSPkry4V.js"),__vite__mapDeps([19,1,2])),icon:"lyra jupyter",dependencies:["@eclipse-lyra/extension-python-runtime"]});const Nt="@eclipse-lyra/extension-python-runtime",Xt={name:Nt},Ue=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-Db2TPO8T.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-7WeX-Ffi.js"),[])}),!0);E.registerExtension({id:Xt.name,name:Ue.EXT_PYTHONRUNTIME_NAME,description:Ue.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([o(()=>import("./python-runtime-extension-BPR6GWT4.js").then(c=>c.a),__vite__mapDeps([20,1,2,21,22])),o(()=>import("./commands-Wuj_3FRk.js"),__vite__mapDeps([23,1,2,21]))]),icon:"lyra python"});const qt="@eclipse-lyra/extension-rag-system",zt={name:qt},Be=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-h3YwzzLh.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-xeLk_Fmf.js"),[])}),!0);E.registerExtension({id:zt.name,name:Be.EXT_RAG_SYSTEM_NAME,description:Be.EXT_RAG_SYSTEM_DESC,loader:()=>o(()=>import("./rag-system-extension-LEalHxPu.js").then(c=>c.b),__vite__mapDeps([24,1,2,11,3])),icon:"database",experimental:!0,dependencies:["@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-in-browser-ml"]});const Wt="@eclipse-lyra/extension-settings-tree",Ut={name:Wt},Fe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CNeg7psB.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BrbQnRTh.js"),[])}),!0);E.registerExtension({id:Ut.name,name:Fe.EXT_SETTINGS_TREE_NAME,description:Fe.EXT_SETTINGS_TREE_DESC,loader:()=>o(()=>import("./settings-tree-extension-Bg_aIXY5.js"),__vite__mapDeps([25,1,2])),icon:"sitemap"});const Bt="@eclipse-lyra/extension-utils",Ft={name:Bt},He=await w(Object.assign({"./i18n.en.json":()=>o(()=>import("./i18n.en-hWm4ZfID.js"),[])}),!0);E.registerExtension({id:Ft.name,name:He.EXT_UTILS_NAME,description:He.EXT_UTILS_DESC,loader:()=>o(()=>import("./index-De26Cn24.js"),__vite__mapDeps([26,1,2,21,22])),icon:"toolbox",dependencies:["@eclipse-lyra/extension-python-runtime"]});const Ht="@eclipse-lyra/extension-webdav",Gt={name:Ht},Ge=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-DQHncNMk.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BoMxiQmY.js"),[])}),!0);E.registerExtension({id:Gt.name,name:Ge.EXT_WEBDAV_NAME,description:Ge.EXT_WEBDAV_DESC,loader:()=>o(()=>import("./webdav-extension-D9CnRJS1.js"),__vite__mapDeps([27,1,2])),icon:"cloud",experimental:!0});const Yt="@eclipse-lyra/extension-webllm",Kt={name:Yt},Ye=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-0AYXcG1p.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-Cl_T3_Z9.js"),[])}),!0);E.registerExtension({id:Kt.name,name:Ye.EXT_WEBLLM_NAME,description:Ye.EXT_WEBLLM_DESC,loader:()=>o(()=>import("./webllmservice-Djycb509.js"),__vite__mapDeps([28,3,1,2])),icon:"robot",experimental:!0});const Jt="@eclipse-lyra/extension-webmcp",Qt={name:Jt};function Zt(){return typeof navigator<"u"&&"modelContext"in navigator&&navigator.modelContext!=null}E.registerExtension({id:Qt.name,name:"WebMCP",description:"Exposes app commands as WebMCP tools for browser agents and MCP clients",loader:async()=>{if(!Zt())throw new Error("WebMCP extension requires navigator.modelContext (Web Model Context API).");return o(()=>import("./webmcp-extension-BrbIAfkx.js"),__vite__mapDeps([29,1,2,3]))},icon:"plug",dependencies:["@eclipse-lyra/extension-ai-system"],experimental:!0});var F={exports:{}};var er=F.exports,Ke;function tr(){return Ke||(Ke=1,(function(c,d){(function(){var h,_,a,m,y,pe,me,Y,j,p,_e,ge,K,fe,he,V,S,ve,T,C,N,J,I,X,Ee,Q,Z,R,ye,O,g,q,ee,we,$,te,z,x,P,re,M,W,ne,U,B,be,xe,ie,Te,Oe,k=[].slice,Ae={}.hasOwnProperty,Le=function(t,e){for(var r in e)Ae.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},et=[].indexOf||function(t){for(var e=0,r=this.length;e<r;e++)if(e in this&&this[e]===t)return e;return-1},Re=function(t,e){return function(){return t.apply(e,arguments)}};for(J={className:"",catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},O=function(){var t;return(t=typeof performance<"u"&&performance!==null&&typeof performance.now=="function"?performance.now():void 0)!=null?t:+new Date},q=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,N=window.cancelAnimationFrame||window.mozCancelAnimationFrame,V=function(t,e,r){return typeof t.addEventListener=="function"?t.addEventListener(e,r,!1):(function(){if(typeof t["on"+e]!="function"||typeof t["on"+e].eventListeners!="object"){var n=new Y;typeof t["on"+e]=="function"&&n.on(e,t["on"+e]),t["on"+e]=function(i){return n.trigger(e,i)},t["on"+e].eventListeners=n}else var n=t["on"+e].eventListeners;n.on(e,r)})()},q==null&&(q=function(t){return setTimeout(t,50)},N=function(t){return clearTimeout(t)}),we=function(t){var e,r;return e=O(),r=function(){var n;return n=O()-e,n>=33?(e=O(),t(n,function(){return q(r)})):setTimeout(r,33-n)},r()},ee=function(){var t,e,r;return r=arguments[0],e=arguments[1],t=3<=arguments.length?k.call(arguments,2):[],typeof r[e]=="function"?r[e].apply(r,t):r[e]},I=function(){var t,e,r,n,i,s,l;for(e=arguments[0],n=2<=arguments.length?k.call(arguments,1):[],s=0,l=n.length;s<l;s++)if(r=n[s],r)for(t in r)Ae.call(r,t)&&(i=r[t],e[t]!=null&&typeof e[t]=="object"&&i!=null&&typeof i=="object"?I(e[t],i):e[t]=i);return e},ve=function(t){var e,r,n,i,s;for(r=e=0,i=0,s=t.length;i<s;i++)n=t[i],r+=Math.abs(n),e++;return r/e},Ee=function(t,e){var r,n,i;if(t==null&&(t="options"),e==null&&(e=!0),i=document.querySelector("[data-pace-"+t+"]"),!!i){if(r=i.getAttribute("data-pace-"+t),!e)return r;try{return JSON.parse(r)}catch(s){return n=s,typeof console<"u"&&console!==null?console.error("Error parsing inline pace options",n):void 0}}},me=(function(){function t(){}return t.prototype.on=function(e,r,n,i){var s;return i==null&&(i=!1),this.bindings==null&&(this.bindings={}),(s=this.bindings)[e]==null&&(s[e]=[]),this.bindings[e].push({handler:r,ctx:n,once:i})},t.prototype.once=function(e,r,n){return this.on(e,r,n,!0)},t.prototype.off=function(e,r){var n,i,s;if(((i=this.bindings)!=null?i[e]:void 0)!=null){if(r==null)return delete this.bindings[e];for(n=0,s=[];n<this.bindings[e].length;)this.bindings[e][n].handler===r?s.push(this.bindings[e].splice(n,1)):s.push(n++);return s}},t.prototype.trigger=function(){var e,r,n,i,s,l,u,f,v;if(n=arguments[0],e=2<=arguments.length?k.call(arguments,1):[],(u=this.bindings)!=null&&u[n]){for(s=0,v=[];s<this.bindings[n].length;)f=this.bindings[n][s],i=f.handler,r=f.ctx,l=f.once,i.apply(r??this,e),l?v.push(this.bindings[n].splice(s,1)):v.push(s++);return v}},t})(),p=window.Pace||{},window.Pace=p,I(p,me.prototype),g=p.options=I({},J,window.paceOptions,Ee()),ie=["ajax","document","eventLag","elements"],U=0,be=ie.length;U<be;U++)x=ie[U],g[x]===!0&&(g[x]=J[x]);j=(function(t){Le(e,t);function e(){return Te=e.__super__.constructor.apply(this,arguments),Te}return e})(Error),_=(function(){function t(){this.progress=0}return t.prototype.getElement=function(){var e;if(this.el==null){if(e=document.querySelector(g.target),!e)throw new j;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/(pace-done )|/,"pace-running ");var r=g.className!==""?" "+g.className:"";this.el.innerHTML='<div class="pace-progress'+r+`">
  <div class="pace-progress-inner"></div>
</div>
<div class="pace-activity"></div>`,e.firstChild!=null?e.insertBefore(this.el,e.firstChild):e.appendChild(this.el)}return this.el},t.prototype.finish=function(){var e;return e=this.getElement(),e.className=e.className.replace("pace-active","pace-inactive"),document.body.className=document.body.className.replace("pace-running ","pace-done ")},t.prototype.update=function(e){return this.progress=e,p.trigger("progress",e),this.render()},t.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(e){j=e}return this.el=void 0},t.prototype.render=function(){var e,r,n,i,s,l,u;if(document.querySelector(g.target)==null)return!1;for(e=this.getElement(),i="translate3d("+this.progress+"%, 0, 0)",u=["webkitTransform","msTransform","transform"],s=0,l=u.length;s<l;s++)r=u[s],e.children[0].style[r]=i;return(!this.lastRenderedProgress||this.lastRenderedProgress|this.progress!==0|0)&&(e.children[0].setAttribute("data-progress-text",""+(this.progress|0)+"%"),this.progress>=100?n="99":(n=this.progress<10?"0":"",n+=this.progress|0),e.children[0].setAttribute("data-progress",""+n)),p.trigger("change",this.progress),this.lastRenderedProgress=this.progress},t.prototype.done=function(){return this.progress>=100},t})(),Y=(function(){function t(){this.bindings={}}return t.prototype.trigger=function(e,r){var n,i,s,l,u;if(this.bindings[e]!=null){for(l=this.bindings[e],u=[],i=0,s=l.length;i<s;i++)n=l[i],u.push(n.call(this,r));return u}},t.prototype.on=function(e,r){var n;return(n=this.bindings)[e]==null&&(n[e]=[]),this.bindings[e].push(r)},t})(),ne=window.XMLHttpRequest,W=window.XDomainRequest,M=window.WebSocket,X=function(t,e){var r,n;n=[];for(r in e.prototype)try{t[r]==null&&typeof e[r]!="function"?typeof Object.defineProperty=="function"?n.push(Object.defineProperty(t,r,{get:(function(i){return function(){return e.prototype[i]}})(r),configurable:!0,enumerable:!0})):n.push(t[r]=e.prototype[r]):n.push(void 0)}catch{}return n},R=[],p.ignore=function(){var t,e,r;return e=arguments[0],t=2<=arguments.length?k.call(arguments,1):[],R.unshift("ignore"),r=e.apply(null,t),R.shift(),r},p.track=function(){var t,e,r;return e=arguments[0],t=2<=arguments.length?k.call(arguments,1):[],R.unshift("track"),r=e.apply(null,t),R.shift(),r},z=function(t){var e;if(t==null&&(t="GET"),R[0]==="track")return"force";if(!R.length&&g.ajax){if(t==="socket"&&g.ajax.trackWebSockets)return!0;if(e=t.toUpperCase(),et.call(g.ajax.trackMethods,e)>=0)return!0}return!1},_e=(function(t){Le(e,t);function e(){var r,n=this;e.__super__.constructor.apply(this,arguments),r=function(i){var s;return s=i.open,i.open=function(l,u,f){return z(l)&&n.trigger("request",{type:l,url:u,request:i}),s.apply(i,arguments)}},window.XMLHttpRequest=function(i){var s;return s=new ne(i),r(s),s};try{X(window.XMLHttpRequest,ne)}catch{}if(W!=null){window.XDomainRequest=function(){var i;return i=new W,r(i),i};try{X(window.XDomainRequest,W)}catch{}}if(M!=null&&g.ajax.trackWebSockets){window.WebSocket=function(i,s){var l;return s!=null?l=new M(i,s):l=new M(i),z("socket")&&n.trigger("request",{type:"socket",url:i,protocols:s,request:l}),l};try{X(window.WebSocket,M)}catch{}}}return e})(Y),B=null,Q=function(){return B==null&&(B=new _e),B},te=function(t){var e,r,n,i;for(i=g.ajax.ignoreURLs,r=0,n=i.length;r<n;r++)if(e=i[r],typeof e=="string"){if(t.indexOf(e)!==-1)return!0}else if(e.test(t))return!0;return!1},Q().on("request",function(t){var e,r,n,i,s;if(i=t.type,n=t.request,s=t.url,!te(s)&&!p.running&&(g.restartOnRequestAfter!==!1||z(i)==="force"))return r=arguments,e=g.restartOnRequestAfter||0,typeof e=="boolean"&&(e=0),setTimeout(function(){var l,u,f,v,A,L;if(i==="socket"?l=n.readyState<1:l=0<(v=n.readyState)&&v<4,l){for(p.restart(),A=p.sources,L=[],u=0,f=A.length;u<f;u++)if(x=A[u],x instanceof h){x.watch.apply(x,r);break}else L.push(void 0);return L}},e)}),h=(function(){function t(){this.complete=Re(this.complete,this);var e=this;this.elements=[],Q().on("request",function(){return e.watch.apply(e,arguments)})}return t.prototype.watch=function(e){var r,n,i,s;if(i=e.type,r=e.request,s=e.url,!te(s))return i==="socket"?n=new fe(r,this.complete):n=new he(r,this.complete),this.elements.push(n)},t.prototype.complete=function(e){return this.elements=this.elements.filter(function(r){return r!==e})},t})(),he=(function(){function t(e,r){var n,i,s,l,u,f=this;if(this.progress=0,window.ProgressEvent!=null)for(V(e,"progress",function(v){return v.lengthComputable?f.progress=100*v.loaded/v.total:f.progress=f.progress+(100-f.progress)/2},!1),u=["load","abort","timeout","error"],i=0,s=u.length;i<s;i++)n=u[i],V(e,n,function(){return r(f),f.progress=100},!1);else l=e.onreadystatechange,e.onreadystatechange=function(){var v;return(v=e.readyState)===0||v===4?(r(f),f.progress=100):e.readyState===3&&(f.progress=50),typeof l=="function"?l.apply(null,arguments):void 0}}return t})(),fe=(function(){function t(e,r){var n,i,s,l,u=this;for(this.progress=0,l=["error","open"],i=0,s=l.length;i<s;i++)n=l[i],V(e,n,function(){return r(u),u.progress=100},!1)}return t})(),m=(function(){function t(e){var r,n,i,s;for(e==null&&(e={}),this.complete=Re(this.complete,this),this.elements=[],e.selectors==null&&(e.selectors=[]),s=e.selectors,n=0,i=s.length;n<i;n++)r=s[n],this.elements.push(new y(r,this.complete))}return t.prototype.complete=function(e){return this.elements=this.elements.filter(function(r){return r!==e})},t})(),y=(function(){function t(e,r){this.selector=e,this.completeCallback=r,this.progress=0,this.check()}return t.prototype.check=function(){var e=this;return document.querySelector(this.selector)?this.done():setTimeout((function(){return e.check()}),g.elements.checkInterval)},t.prototype.done=function(){return this.completeCallback(this),this.completeCallback=null,this.progress=100},t})(),a=(function(){t.prototype.states={loading:0,interactive:50,complete:100};function t(){var e,r,n=this;this.progress=(r=this.states[document.readyState])!=null?r:100,e=document.onreadystatechange,document.onreadystatechange=function(){return n.states[document.readyState]!=null&&(n.progress=n.states[document.readyState]),typeof e=="function"?e.apply(null,arguments):void 0}}return t})(),pe=(function(){function t(){var e,r,n,i,s,l=this;this.progress=0,e=0,s=[],i=0,n=O(),r=setInterval(function(){var u;return u=O()-n-50,n=O(),s.push(u),s.length>g.eventLag.sampleCount&&s.shift(),e=ve(s),++i>=g.eventLag.minSamples&&e<g.eventLag.lagThreshold?(l.progress=100,clearInterval(r)):l.progress=100*(3/(e+3))},50)}return t})(),K=(function(){function t(e){this.source=e,this.last=this.sinceLastUpdate=0,this.rate=g.initialRate,this.catchup=0,this.progress=this.lastProgress=0,this.source!=null&&(this.progress=ee(this.source,"progress"))}return t.prototype.tick=function(e,r){var n;return r==null&&(r=ee(this.source,"progress")),r>=100&&(this.done=!0),r===this.last?this.sinceLastUpdate+=e:(this.sinceLastUpdate&&(this.rate=(r-this.last)/this.sinceLastUpdate),this.catchup=(r-this.progress)/g.catchupTime,this.sinceLastUpdate=0,this.last=r),r>this.progress&&(this.progress+=this.catchup*e),n=1-Math.pow(this.progress/100,g.easeFactor),this.progress+=n*this.rate*e,this.progress=Math.min(this.lastProgress+g.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},t})(),P=null,$=null,T=null,re=null,S=null,C=null,p.running=!1,Z=function(){if(g.restartOnPushState)return p.restart()},window.history.pushState!=null&&(xe=window.history.pushState,window.history.pushState=function(){return Z(),xe.apply(window.history,arguments)}),window.history.replaceState!=null&&(Oe=window.history.replaceState,window.history.replaceState=function(){return Z(),Oe.apply(window.history,arguments)}),ge={ajax:h,elements:m,document:a,eventLag:pe},(ye=function(){var t,e,r,n,i,s,l,u;for(p.sources=P=[],s=["ajax","elements","document","eventLag"],e=0,n=s.length;e<n;e++)t=s[e],g[t]!==!1&&P.push(new ge[t](g[t]));for(u=(l=g.extraSources)!=null?l:[],r=0,i=u.length;r<i;r++)x=u[r],P.push(new x(g));return p.bar=T=new _,$=[],re=new K})(),p.stop=function(){return p.trigger("stop"),p.running=!1,T.destroy(),C=!0,S!=null&&(typeof N=="function"&&N(S),S=null),ye()},p.restart=function(){return p.trigger("restart"),p.stop(),p.start()},p.go=function(){var t;return p.running=!0,T.render(),t=O(),C=!1,S=we(function(e,r){var n,i,s,l,u,f,v,A,L,se,oe,ae,De,Pe,Se;for(100-T.progress,i=se=0,s=!0,f=oe=0,De=P.length;oe<De;f=++oe)for(x=P[f],L=$[f]!=null?$[f]:$[f]=[],u=(Se=x.elements)!=null?Se:[x],v=ae=0,Pe=u.length;ae<Pe;v=++ae)l=u[v],A=L[v]!=null?L[v]:L[v]=new K(l),s&=A.done,!A.done&&(i++,se+=A.tick(e));return n=se/i,T.update(re.tick(e,n)),T.done()||s||C?(T.update(100),p.trigger("done"),setTimeout(function(){return T.finish(),p.running=!1,p.trigger("hide")},Math.max(g.ghostTime,Math.max(g.minTime-(O()-t),0)))):r()})},p.start=function(t){I(g,t),p.running=!0;try{T.render()}catch(e){j=e}return document.querySelector(".pace")?(p.trigger("start"),p.go()):setTimeout(p.start,50)},c.exports=p}).call(er)})(F)),F.exports}var rr=tr();const nr=tt(rr);var ir=Object.getOwnPropertyDescriptor,sr=(c,d,h,_)=>{for(var a=_>1?void 0:_?ir(d,h):d,m=c.length-1,y;m>=0;m--)(y=c[m])&&(a=y(a)||a);return a};const or=3,ar=5,lr=[{title:"Standup",time:"Today 9:00",location:"Room A"},{title:"Sprint planning",time:"Tomorrow 14:00",location:"Room B"},{title:"Design review",time:"Wed 10:00",location:"Call"}];let le=class extends ue{render(){return b`
            <div class="overview">
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="list-check"></wa-icon>
                        Tasks
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">${ar}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${or}</span>
                            <span class="stat-label">Done</span>
                        </div>
                    </div>
                </wa-card>
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="calendar-days"></wa-icon>
                        Next meetings
                    </div>
                    <ul class="meeting-list">
                        ${lr.map(c=>b`
                                <li class="meeting-item">
                                    <span class="meeting-title">${c.title}</span>
                                    <span class="meeting-meta">${c.time} · ${c.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};le.styles=de`
        :host {
            display: block;
            padding: var(--wa-space-l);
            height: 100%;
            box-sizing: border-box;
        }
        .overview {
            display: grid;
            gap: var(--wa-space-l);
            max-width: 800px;
        }
        .card-header {
            display: flex;
            align-items: center;
            gap: var(--wa-space-s);
            font-weight: 600;
        }
        .stats {
            display: flex;
            gap: var(--wa-space-xl);
            margin-top: var(--wa-space-s);
        }
        .stat {
            display: flex;
            flex-direction: column;
            gap: var(--wa-space-2xs);
        }
        .stat-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--wa-color-brand-fill);
        }
        .stat-label {
            font-size: var(--wa-font-size-s);
            color: var(--wa-color-text-quiet);
        }
        .meeting-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .meeting-item {
            display: flex;
            flex-direction: column;
            gap: var(--wa-space-2xs);
            padding: var(--wa-space-m) 0;
            border-bottom: 1px solid var(--wa-color-neutral-border-subtle);
        }
        .meeting-item:last-child {
            border-bottom: none;
        }
        .meeting-title {
            font-weight: 500;
        }
        .meeting-meta {
            font-size: var(--wa-font-size-s);
            color: var(--wa-color-text-quiet);
        }
    `;le=sr([G("lyra-dashboard-welcome")],le);var cr=Object.defineProperty,dr=Object.getOwnPropertyDescriptor,Ze=(c,d,h,_)=>{for(var a=_>1?void 0:_?dr(d,h):d,m=c.length-1,y;m>=0;m--)(y=c[m])&&(a=(_?y(d,h,a):y(a))||a);return _&&a&&cr(d,h,a),a};const ur=[{id:"1",title:"Review pull request #142",done:!1,due:"Today"},{id:"2",title:"Update documentation",done:!0},{id:"3",title:"Fix login redirect bug",done:!1,due:"Tomorrow"},{id:"4",title:"Prepare sprint demo",done:!1,due:"Fri"},{id:"5",title:"Sync with design team",done:!0}];let H=class extends ue{constructor(){super(...arguments),this.tasks=[...ur]}toggleTask(c){this.tasks=this.tasks.map(d=>d.id===c?{...d,done:!d.done}:d)}render(){return b`
            <ul class="taslist">
                ${this.tasks.map(c=>b`
                        <li class="tasitem ${c.done?"done":""}">
                            <wa-checkbox
                                ?checked=${c.done}
                                @change=${()=>this.toggleTask(c.id)}
                                aria-label="${c.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${c.title}</span>
                            ${c.due?b`<span class="tasdue">${c.due}</span>`:""}
                        </li>
                    `)}
            </ul>
        `}};H.styles=de`
        :host {
            display: block;
            padding: var(--wa-space-l);
            height: 100%;
            box-sizing: border-box;
        }
        .taslist {
            list-style: none;
            padding: 0;
            margin: 0;
            max-width: 600px;
        }
        .tasitem {
            display: flex;
            align-items: center;
            gap: var(--wa-space-m);
            padding: var(--wa-space-m) 0;
            border-bottom: 1px solid var(--wa-color-neutral-border-subtle);
        }
        .tasitem:last-child {
            border-bottom: none;
        }
        .tasitem.done .tastitle {
            text-decoration: line-through;
            color: var(--wa-color-text-quiet);
        }
        .tastitle {
            flex: 1;
        }
        .tasdue {
            font-size: var(--wa-font-size-s);
            color: var(--wa-color-text-quiet);
        }
    `;Ze([rt()],H.prototype,"tasks",2);H=Ze([G("lyra-dashboard-my-tasks")],H);var pr=Object.getOwnPropertyDescriptor,mr=(c,d,h,_)=>{for(var a=_>1?void 0:_?pr(d,h):d,m=c.length-1,y;m>=0;m--)(y=c[m])&&(a=y(a)||a);return a};const Je=[{title:"Standup",start:"9:00",end:"9:15",day:"Mon",location:"Room A"},{title:"Sprint planning",start:"14:00",end:"15:30",day:"Tue",location:"Room B"},{title:"Design review",start:"10:00",end:"11:00",day:"Wed",location:"Call"},{title:"1:1 with manager",start:"16:00",end:"16:30",day:"Thu",location:"Room C"},{title:"Retrospective",start:"11:00",end:"12:00",day:"Fri",location:"Room A"}];let ce=class extends ue{render(){const c=["Mon","Tue","Wed","Thu","Fri"];return b`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${c.map(d=>b`<span class="day-col">${d}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${c.map(d=>{const h=Je.filter(_=>_.day===d);return b`
                            <div class="day-cell">
                                ${h.map(_=>b`
                                        <div class="meeting-card">
                                            <div class="title">${_.title}</div>
                                            <div class="time">${_.start} – ${_.end}</div>
                                            <div class="time">${_.location}</div>
                                        </div>
                                    `)}
                            </div>
                        `})}
                </div>
                <h3 style="margin-top: var(--wa-space-xl); margin-bottom: var(--wa-space-m);">This week</h3>
                <ul class="meeting-list">
                    ${Je.map(d=>b`
                            <li>
                                <span class="title">${d.title}</span>
                                <div class="meta">${d.day} ${d.start} – ${d.end} · ${d.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};ce.styles=de`
        :host {
            display: block;
            padding: var(--wa-space-l);
            height: 100%;
            box-sizing: border-box;
        }
        .calendar-section {
            max-width: 700px;
        }
        .weeheader {
            display: grid;
            grid-template-columns: 3rem repeat(5, 1fr);
            gap: var(--wa-space-s);
            padding: var(--wa-space-s) 0;
            font-size: var(--wa-font-size-s);
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            border-bottom: 1px solid var(--wa-color-neutral-border-subtle);
        }
        .day-col {
            text-align: center;
        }
        .meetings-grid {
            display: grid;
            grid-template-columns: 3rem repeat(5, 1fr);
            gap: var(--wa-space-s);
            margin-top: var(--wa-space-m);
        }
        .time-slot {
            font-size: var(--wa-font-size-s);
            color: var(--wa-color-text-quiet);
            padding-top: var(--wa-space-2xs);
        }
        .day-cell {
            min-height: 80px;
            padding: var(--wa-space-s);
            border-radius: var(--wa-radius-m);
            background: var(--wa-color-neutral-fill-subtle);
        }
        .meeting-card {
            padding: var(--wa-space-s);
            margin-bottom: var(--wa-space-xs);
            border-radius: var(--wa-radius-s);
            background: var(--wa-color-brand-fill);
            color: var(--wa-color-neutral-fill);
            font-size: var(--wa-font-size-s);
        }
        .meeting-card .title {
            font-weight: 600;
        }
        .meeting-card .time {
            opacity: 0.9;
        }
        .meeting-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .meeting-list li {
            padding: var(--wa-space-m);
            border-radius: var(--wa-radius-m);
            background: var(--wa-color-neutral-fill-subtle);
            margin-bottom: var(--wa-space-s);
        }
        .meeting-list .title {
            font-weight: 600;
        }
        .meeting-list .meta {
            font-size: var(--wa-font-size-s);
            color: var(--wa-color-text-quiet);
            margin-top: var(--wa-space-2xs);
        }
    `;ce=mr([G("lyra-dashboard-meetings")],ce);var _r=Object.getOwnPropertyDescriptor,gr=(c,d,h,_)=>{for(var a=_>1?void 0:_?_r(d,h):d,m=c.length-1,y;m>=0;m--)(y=c[m])&&(a=y(a)||a);return a};const fr=()=>b`
    <div style="padding: var(--wa-space-m); display: flex; justify-content: center; min-width: 48px; min-height: 48px; box-sizing: border-box;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="var(--wa-color-brand-fill, #0d6efd)"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
        </svg> <i>My Dashboard</i>
    </div>
`;D.registerContribution("dashboard-toolbar-top",{label:"Dashboard",slot:"start",component:fr});let Qe=class extends lt{render(){return b`<slot></slot>`}};Qe=gr([G("lyra-view-wrapper")],Qe);const hr=(c,d,h,_,a)=>({name:c,label:d,icon:h,closable:a??!1,toolbar:!1,component:m=>_()}),vr=[["dashboard-home","Overview","house",()=>b`<lyra-dashboard-welcome></lyra-dashboard-welcome>`,!1],["dashboard-tasks","My Tasks","list-check",()=>b`<lyra-dashboard-my-tasks></lyra-dashboard-my-tasks>`,!0],["dashboard-meetings","Meetings","calendar-days",()=>b`<lyra-dashboard-meetings></lyra-dashboard-meetings>`,!0]];for(const[c,d,h,_,a]of vr)D.registerContribution(nt,hr(c,d,h,_,a)),D.registerContribution("dashboard-views",{label:d,icon:h,showLabel:!0,command:"open_view_as_editor",params:{name:c}});D.registerContribution("dashboard-views-toolbar-bottom",{label:"Profile",icon:"user",command:"open_user_profile"});D.registerContribution("dashboard-views-toolbar-bottom",{label:"Settings",icon:"gear",command:"open_settings"});const Er=()=>b`<style>
      .dashboard-shell {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        box-sizing: border-box;
        padding: var(--wa-space-m);
        gap: var(--wa-space-m);
      }

      .dashboard-main {
        flex: 1;
        min-height: 0;
      }

      .toolbar-top {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        border-radius: var(--wa-radius-l);
        padding: 0 var(--wa-space-m);
        min-height: 48px;
        background-color: var(--wa-color-neutral-fill-surface);
      }
    </style>

    <div class="dashboard-shell">
      <div class="toolbar-top">
        <lyra-toolbar id="dashboard-toolbar-top"></lyra-toolbar>
        <lyra-toolbar id="dashboard-toolbar-top-center"></lyra-toolbar>
        <lyra-toolbar id=${ot}></lyra-toolbar>
      </div>
      <lyra-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <lyra-toolbar id="dashboard-views" size="large" orientation="vertical"></lyra-toolbar>
        <lyra-tabs style="padding: 10px;" id=${at}></lyra-tabs>
      </lyra-resizable-grid>
    </div>`;D.registerContribution(it,{id:"dashboard",name:"Dashboard",label:"Dashboard",icon:"table-cells",component:Er,onShow(){requestAnimationFrame(()=>{st.execute("open_view_as_editor",{params:{name:"dashboard-home"}})})}});nr.start();D.registerContribution(ct,{label:"Eclipse Lyra",slot:"start",component:()=>b`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-s);
        padding: 0 var(--wa-space-s);
      "
    >
      <img
        src="/lyra-logo.svg"
        alt="Eclipse Lyra"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `});dt.registerApp({name:"Eclipse Lyra",description:"Eclipse Lyra demo app with default extensions.",layoutId:"standard-full",extensions:["@eclipse-lyra/extension-utils","@eclipse-lyra/extension-command-palette","@eclipse-lyra/extension-command-shell","@eclipse-lyra/extension-md-editor","@eclipse-lyra/extension-monaco-editor","@eclipse-lyra/extension-media-viewer","@eclipse-lyra/extension-settings-tree","@eclipse-lyra/extension-memory-usage","@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-dataviewer"]},{autoStart:!0,hostConfig:!0});
