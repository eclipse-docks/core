const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-system-extension-BiF6wzBj.js","assets/index-8WUZ8dwZ.js","assets/index-CTYeukuQ.css","assets/ai-service-BK0F4dEG.js","assets/command-palette-extension-BQ-Lwrcq.js","assets/command-shell-extension-DrE8BnWz.js","assets/dataviewer-extension-DMtEGmwj.js","assets/duckdb-extension-DlbXwtYX.js","assets/tslib.es6-D3hF0DQN.js","assets/howto-extension-Bfz32oxP.js","assets/in-browser-ml-extension-BGeqAMEM.js","assets/in-browser-ml-service-DGW73jUW.js","assets/linuxterminal-BxE4c6kI.js","assets/md-editor-extension-Dd7mWlJK.js","assets/media-viewer-extension-C-0ByWtV.js","assets/memory-usage-extension-C-MKNIF5.js","assets/monaco-editor-extension-DX9ayDb0.js","assets/monaco-widget-DMshPBnW.js","assets/monaco-widget-Dvl_Svmm.css","assets/notebook-extension-DMS_ZtwH.js","assets/pglite-extension-D-p--oRr.js","assets/python-runtime-extension-DyTryx8b.js","assets/pyservice-DrxERT7b.js","assets/package-manager-DDC2bl3o.js","assets/commands-IUQQMv2d.js","assets/rag-system-extension-Bm0m49kL.js","assets/settings-tree-extension-B6MP1g2w.js","assets/sqleditor-extension-BlXYL8cI.js","assets/index-Cw6JgZkp.js","assets/webdav-extension-CVfbJKA8.js","assets/webllmservice-COQU-6Bm.js","assets/webmcp-extension-C5Touuxq.js"])))=>i.map(i=>d[i]);
import{e as h,_ as o,i as w,g as tt,a as de,b as ue,c as b,t as G,r as rt,d as D,S as nt,f as it,h as st,T as ot,E as at,L as lt,j as ct,k as dt}from"./index-8WUZ8dwZ.js";import"./monaco-widget-DMshPBnW.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))_(a);new MutationObserver(a=>{for(const m of a)if(m.type==="childList")for(const y of m.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&_(y)}).observe(document,{childList:!0,subtree:!0});function v(a){const m={};return a.integrity&&(m.integrity=a.integrity),a.referrerPolicy&&(m.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?m.credentials="include":a.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function _(a){if(a.ep)return;a.ep=!0;const m=v(a);fetch(a.href,m)}})();const ut="@eclipse-lyra/extension-ai-system",pt={name:ut};h.registerExtension({id:pt.name,name:"AI System",description:"AI assistants, chat, and tool execution",loader:()=>o(()=>import("./ai-system-extension-BiF6wzBj.js"),__vite__mapDeps([0,1,2,3])),icon:"robot"});const mt="@eclipse-lyra/extension-command-palette",_t={name:mt},$e=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BMUzmHSG.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BWYi1YcR.js"),[])}),!0);h.registerExtension({id:_t.name,name:$e.EXT_COMMANDPALETTE_NAME,description:$e.EXT_COMMANDPALETTE_DESC,loader:()=>o(()=>import("./command-palette-extension-BQ-Lwrcq.js"),__vite__mapDeps([4,1,2])),icon:"terminal"});const gt="@eclipse-lyra/extension-command-shell",ft={name:gt},Ie=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BNyI7vyE.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BBFwxyT0.js"),[])}),!0);h.registerExtension({id:ft.name,name:Ie.EXT_COMMANDSHELL_NAME,description:Ie.EXT_COMMANDSHELL_DESC,loader:()=>o(()=>import("./command-shell-extension-DrE8BnWz.js"),__vite__mapDeps([5,1,2])),icon:"terminal",experimental:!0});const ht="@eclipse-lyra/extension-dataviewer",vt={name:ht};h.registerExtension({id:vt.name,name:"Data Viewer",description:"Tabular data views, persistence, and CSV/TSV/DuckDB integration",loader:()=>o(()=>import("./dataviewer-extension-DMtEGmwj.js"),__vite__mapDeps([6,1,2])),icon:"table"});const Et="@eclipse-lyra/extension-duckdb",yt={name:Et},ke=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CrncopA1.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-DrfEnFhW.js"),[])}),!0);h.registerExtension({id:yt.name,name:ke.EXT_DUCKDB_NAME,description:ke.EXT_DUCKDB_DESC,loader:()=>o(()=>import("./duckdb-extension-DlbXwtYX.js"),__vite__mapDeps([7,1,2,8])),icon:"database",dependencies:["@eclipse-lyra/extension-sqleditor"],experimental:!0});const wt="@eclipse-lyra/extension-github-service",bt={name:wt},Me=await w(Object.assign({}),!0);h.registerExtension({id:bt.name,name:Me.EXT_GITHUB_SERVICE_NAME,description:Me.EXT_GITHUB_SERVICE_DESC,loader:()=>o(()=>import("./github-service-extension-9FP3M3ve.js"),[]),icon:"code-branch"});const xt="@eclipse-lyra/extension-howto-system",Tt={name:xt},je=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-DmIVUxyg.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-3uoiMzXB.js"),[])}),!0);h.registerExtension({id:Tt.name,name:je.EXT_HOWTO_NAME,description:je.EXT_HOWTO_DESC,loader:()=>o(()=>import("./howto-extension-Bfz32oxP.js"),__vite__mapDeps([9,1,2,3])),icon:"list-check",experimental:!0});const Ot="@eclipse-lyra/extension-in-browser-ml",At={name:Ot},Ve=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BWHLrdUd.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BhDsH6Hy.js"),[])}),!0);h.registerExtension({id:At.name,name:Ve.EXT_IN_BROWSER_ML_NAME,description:Ve.EXT_IN_BROWSER_ML_DESC,loader:()=>o(()=>import("./in-browser-ml-extension-BGeqAMEM.js"),__vite__mapDeps([10,1,2,11])),icon:"brain",experimental:!0});const Lt="@eclipse-lyra/extension-linuxterminal",Rt={name:Lt},Ce=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-Cj9GZiwG.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B39_inUO.js"),[])}),!0);h.registerExtension({id:Rt.name,name:Ce.EXT_LINUXTERMINAL_NAME,description:Ce.EXT_LINUXTERMINAL_DESC,loader:()=>o(()=>import("./linuxterminal-BxE4c6kI.js"),__vite__mapDeps([12,1,2])),icon:"terminal",experimental:!0});const Dt="@eclipse-lyra/extension-md-editor",Pt={name:Dt},Ne=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-B2JDyIPq.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B8YbWLGf.js"),[])}),!0);h.registerExtension({id:Pt.name,name:Ne.EXT_MDEDITOR_NAME,description:Ne.EXT_MDEDITOR_DESC,loader:()=>o(()=>import("./md-editor-extension-Dd7mWlJK.js"),__vite__mapDeps([13,1,2])),icon:"book"});const St="@eclipse-lyra/extension-media-viewer",$t={name:St},Xe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CuPIFKj6.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-CccBnscq.js"),[])}),!0);h.registerExtension({id:$t.name,name:Xe.EXT_MEDIAVIEWER_NAME,description:Xe.EXT_MEDIAVIEWER_DESC,loader:()=>o(()=>import("./media-viewer-extension-C-0ByWtV.js"),__vite__mapDeps([14,1,2])),icon:"image"});const It="@eclipse-lyra/extension-memory-usage",kt={name:It},qe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-BUzdyc_f.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-B1paTwCo.js"),[])}),!0);h.registerExtension({id:kt.name,name:qe.EXT_MEMORYUSAGE_NAME,description:qe.EXT_MEMORYUSAGE_DESC,loader:()=>o(()=>import("./memory-usage-extension-C-MKNIF5.js"),__vite__mapDeps([15,1,2])),icon:"microchip"});const Mt="@eclipse-lyra/extension-monaco-editor",jt={name:Mt},ze=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-xLvCUmQb.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-ChYDZfG0.js"),[])}),!0);h.registerExtension({id:jt.name,name:ze.EXT_MONACO_NAME,description:ze.EXT_MONACO_DESC,loader:()=>o(()=>import("./monaco-editor-extension-DX9ayDb0.js"),__vite__mapDeps([16,1,2,17,18])),icon:"file-pen"});const Vt="@eclipse-lyra/extension-notebook",Ct={name:Vt},We=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-NIP_kkww.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-azDELEle.js"),[])}),!0);h.registerExtension({id:Ct.name,name:We.EXT_NOTEBOOK_NAME,description:We.EXT_NOTEBOOK_DESC,loader:()=>o(()=>import("./notebook-extension-DMS_ZtwH.js"),__vite__mapDeps([19,1,2])),icon:"lyra jupyter",dependencies:["@eclipse-lyra/extension-python-runtime"]});const Nt="@eclipse-lyra/extension-pglite",Xt={name:Nt};h.registerExtension({id:Xt.name,name:"PGlite",description:"In-browser PostgreSQL via PGlite",loader:()=>o(()=>import("./pglite-extension-D-p--oRr.js").then(l=>l.b),__vite__mapDeps([20,1,2])),icon:"database",dependencies:["@eclipse-lyra/extension-sqleditor"],experimental:!0});const qt="@eclipse-lyra/extension-python-runtime",zt={name:qt},Ue=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-Db2TPO8T.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-7WeX-Ffi.js"),[])}),!0);h.registerExtension({id:zt.name,name:Ue.EXT_PYTHONRUNTIME_NAME,description:Ue.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([o(()=>import("./python-runtime-extension-DyTryx8b.js").then(l=>l.a),__vite__mapDeps([21,1,2,22,23])),o(()=>import("./commands-IUQQMv2d.js"),__vite__mapDeps([24,1,2,22]))]),icon:"lyra python"});const Wt="@eclipse-lyra/extension-rag-system",Ut={name:Wt},Be=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-h3YwzzLh.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-xeLk_Fmf.js"),[])}),!0);h.registerExtension({id:Ut.name,name:Be.EXT_RAG_SYSTEM_NAME,description:Be.EXT_RAG_SYSTEM_DESC,loader:()=>o(()=>import("./rag-system-extension-Bm0m49kL.js").then(l=>l.b),__vite__mapDeps([25,1,2,11,3])),icon:"database",experimental:!0,dependencies:["@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-in-browser-ml"]});const Bt="@eclipse-lyra/extension-settings-tree",Ft={name:Bt},Fe=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-CNeg7psB.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BrbQnRTh.js"),[])}),!0);h.registerExtension({id:Ft.name,name:Fe.EXT_SETTINGS_TREE_NAME,description:Fe.EXT_SETTINGS_TREE_DESC,loader:()=>o(()=>import("./settings-tree-extension-B6MP1g2w.js"),__vite__mapDeps([26,1,2])),icon:"sitemap"});const Ht="@eclipse-lyra/extension-sqleditor",Gt={name:Ht};h.registerExtension({id:Gt.name,name:"SQL Editor",description:"Generic SQL editor with pluggable backends",loader:()=>o(()=>import("./sqleditor-extension-BlXYL8cI.js"),__vite__mapDeps([27,1,2])),icon:"database"});const Yt="@eclipse-lyra/extension-utils",Kt={name:Yt},He=await w(Object.assign({"./i18n.en.json":()=>o(()=>import("./i18n.en-hWm4ZfID.js"),[])}),!0);h.registerExtension({id:Kt.name,name:He.EXT_UTILS_NAME,description:He.EXT_UTILS_DESC,loader:()=>o(()=>import("./index-Cw6JgZkp.js"),__vite__mapDeps([28,1,2,22,23])),icon:"toolbox",dependencies:["@eclipse-lyra/extension-python-runtime"]});const Qt="@eclipse-lyra/extension-webdav",Jt={name:Qt},Ge=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-DQHncNMk.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-BoMxiQmY.js"),[])}),!0);h.registerExtension({id:Jt.name,name:Ge.EXT_WEBDAV_NAME,description:Ge.EXT_WEBDAV_DESC,loader:()=>o(()=>import("./webdav-extension-CVfbJKA8.js"),__vite__mapDeps([29,1,2])),icon:"cloud",experimental:!0});const Zt="@eclipse-lyra/extension-webllm",er={name:Zt},Ye=await w(Object.assign({"./i18n.de.json":()=>o(()=>import("./i18n.de-0AYXcG1p.js"),[]),"./i18n.en.json":()=>o(()=>import("./i18n.en-Cl_T3_Z9.js"),[])}),!0);h.registerExtension({id:er.name,name:Ye.EXT_WEBLLM_NAME,description:Ye.EXT_WEBLLM_DESC,loader:()=>o(()=>import("./webllmservice-COQU-6Bm.js"),__vite__mapDeps([30,1,2,3])),icon:"robot",experimental:!0});const tr="@eclipse-lyra/extension-webmcp",rr={name:tr};function nr(){return typeof navigator<"u"&&"modelContext"in navigator&&navigator.modelContext!=null}h.registerExtension({id:rr.name,name:"WebMCP",description:"Exposes app commands as WebMCP tools for browser agents and MCP clients",loader:async()=>{if(!nr())throw new Error("WebMCP extension requires navigator.modelContext (Web Model Context API).");return o(()=>import("./webmcp-extension-C5Touuxq.js"),__vite__mapDeps([31,1,2,3]))},icon:"plug",dependencies:["@eclipse-lyra/extension-ai-system"],experimental:!0});var F={exports:{}};var ir=F.exports,Ke;function sr(){return Ke||(Ke=1,(function(l,d){(function(){var v,_,a,m,y,pe,me,Y,j,p,_e,ge,K,fe,he,V,S,ve,T,C,N,Q,$,X,Ee,J,Z,R,ye,O,g,q,ee,we,I,te,z,x,P,re,k,W,ne,U,B,be,xe,ie,Te,Oe,M=[].slice,Ae={}.hasOwnProperty,Le=function(t,e){for(var r in e)Ae.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},et=[].indexOf||function(t){for(var e=0,r=this.length;e<r;e++)if(e in this&&this[e]===t)return e;return-1},Re=function(t,e){return function(){return t.apply(e,arguments)}};for(Q={className:"",catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},O=function(){var t;return(t=typeof performance<"u"&&performance!==null&&typeof performance.now=="function"?performance.now():void 0)!=null?t:+new Date},q=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,N=window.cancelAnimationFrame||window.mozCancelAnimationFrame,V=function(t,e,r){return typeof t.addEventListener=="function"?t.addEventListener(e,r,!1):(function(){if(typeof t["on"+e]!="function"||typeof t["on"+e].eventListeners!="object"){var n=new Y;typeof t["on"+e]=="function"&&n.on(e,t["on"+e]),t["on"+e]=function(i){return n.trigger(e,i)},t["on"+e].eventListeners=n}else var n=t["on"+e].eventListeners;n.on(e,r)})()},q==null&&(q=function(t){return setTimeout(t,50)},N=function(t){return clearTimeout(t)}),we=function(t){var e,r;return e=O(),r=function(){var n;return n=O()-e,n>=33?(e=O(),t(n,function(){return q(r)})):setTimeout(r,33-n)},r()},ee=function(){var t,e,r;return r=arguments[0],e=arguments[1],t=3<=arguments.length?M.call(arguments,2):[],typeof r[e]=="function"?r[e].apply(r,t):r[e]},$=function(){var t,e,r,n,i,s,c;for(e=arguments[0],n=2<=arguments.length?M.call(arguments,1):[],s=0,c=n.length;s<c;s++)if(r=n[s],r)for(t in r)Ae.call(r,t)&&(i=r[t],e[t]!=null&&typeof e[t]=="object"&&i!=null&&typeof i=="object"?$(e[t],i):e[t]=i);return e},ve=function(t){var e,r,n,i,s;for(r=e=0,i=0,s=t.length;i<s;i++)n=t[i],r+=Math.abs(n),e++;return r/e},Ee=function(t,e){var r,n,i;if(t==null&&(t="options"),e==null&&(e=!0),i=document.querySelector("[data-pace-"+t+"]"),!!i){if(r=i.getAttribute("data-pace-"+t),!e)return r;try{return JSON.parse(r)}catch(s){return n=s,typeof console<"u"&&console!==null?console.error("Error parsing inline pace options",n):void 0}}},me=(function(){function t(){}return t.prototype.on=function(e,r,n,i){var s;return i==null&&(i=!1),this.bindings==null&&(this.bindings={}),(s=this.bindings)[e]==null&&(s[e]=[]),this.bindings[e].push({handler:r,ctx:n,once:i})},t.prototype.once=function(e,r,n){return this.on(e,r,n,!0)},t.prototype.off=function(e,r){var n,i,s;if(((i=this.bindings)!=null?i[e]:void 0)!=null){if(r==null)return delete this.bindings[e];for(n=0,s=[];n<this.bindings[e].length;)this.bindings[e][n].handler===r?s.push(this.bindings[e].splice(n,1)):s.push(n++);return s}},t.prototype.trigger=function(){var e,r,n,i,s,c,u,f,E;if(n=arguments[0],e=2<=arguments.length?M.call(arguments,1):[],(u=this.bindings)!=null&&u[n]){for(s=0,E=[];s<this.bindings[n].length;)f=this.bindings[n][s],i=f.handler,r=f.ctx,c=f.once,i.apply(r??this,e),c?E.push(this.bindings[n].splice(s,1)):E.push(s++);return E}},t})(),p=window.Pace||{},window.Pace=p,$(p,me.prototype),g=p.options=$({},Q,window.paceOptions,Ee()),ie=["ajax","document","eventLag","elements"],U=0,be=ie.length;U<be;U++)x=ie[U],g[x]===!0&&(g[x]=Q[x]);j=(function(t){Le(e,t);function e(){return Te=e.__super__.constructor.apply(this,arguments),Te}return e})(Error),_=(function(){function t(){this.progress=0}return t.prototype.getElement=function(){var e;if(this.el==null){if(e=document.querySelector(g.target),!e)throw new j;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/(pace-done )|/,"pace-running ");var r=g.className!==""?" "+g.className:"";this.el.innerHTML='<div class="pace-progress'+r+`">
  <div class="pace-progress-inner"></div>
</div>
<div class="pace-activity"></div>`,e.firstChild!=null?e.insertBefore(this.el,e.firstChild):e.appendChild(this.el)}return this.el},t.prototype.finish=function(){var e;return e=this.getElement(),e.className=e.className.replace("pace-active","pace-inactive"),document.body.className=document.body.className.replace("pace-running ","pace-done ")},t.prototype.update=function(e){return this.progress=e,p.trigger("progress",e),this.render()},t.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(e){j=e}return this.el=void 0},t.prototype.render=function(){var e,r,n,i,s,c,u;if(document.querySelector(g.target)==null)return!1;for(e=this.getElement(),i="translate3d("+this.progress+"%, 0, 0)",u=["webkitTransform","msTransform","transform"],s=0,c=u.length;s<c;s++)r=u[s],e.children[0].style[r]=i;return(!this.lastRenderedProgress||this.lastRenderedProgress|this.progress!==0|0)&&(e.children[0].setAttribute("data-progress-text",""+(this.progress|0)+"%"),this.progress>=100?n="99":(n=this.progress<10?"0":"",n+=this.progress|0),e.children[0].setAttribute("data-progress",""+n)),p.trigger("change",this.progress),this.lastRenderedProgress=this.progress},t.prototype.done=function(){return this.progress>=100},t})(),Y=(function(){function t(){this.bindings={}}return t.prototype.trigger=function(e,r){var n,i,s,c,u;if(this.bindings[e]!=null){for(c=this.bindings[e],u=[],i=0,s=c.length;i<s;i++)n=c[i],u.push(n.call(this,r));return u}},t.prototype.on=function(e,r){var n;return(n=this.bindings)[e]==null&&(n[e]=[]),this.bindings[e].push(r)},t})(),ne=window.XMLHttpRequest,W=window.XDomainRequest,k=window.WebSocket,X=function(t,e){var r,n;n=[];for(r in e.prototype)try{t[r]==null&&typeof e[r]!="function"?typeof Object.defineProperty=="function"?n.push(Object.defineProperty(t,r,{get:(function(i){return function(){return e.prototype[i]}})(r),configurable:!0,enumerable:!0})):n.push(t[r]=e.prototype[r]):n.push(void 0)}catch{}return n},R=[],p.ignore=function(){var t,e,r;return e=arguments[0],t=2<=arguments.length?M.call(arguments,1):[],R.unshift("ignore"),r=e.apply(null,t),R.shift(),r},p.track=function(){var t,e,r;return e=arguments[0],t=2<=arguments.length?M.call(arguments,1):[],R.unshift("track"),r=e.apply(null,t),R.shift(),r},z=function(t){var e;if(t==null&&(t="GET"),R[0]==="track")return"force";if(!R.length&&g.ajax){if(t==="socket"&&g.ajax.trackWebSockets)return!0;if(e=t.toUpperCase(),et.call(g.ajax.trackMethods,e)>=0)return!0}return!1},_e=(function(t){Le(e,t);function e(){var r,n=this;e.__super__.constructor.apply(this,arguments),r=function(i){var s;return s=i.open,i.open=function(c,u,f){return z(c)&&n.trigger("request",{type:c,url:u,request:i}),s.apply(i,arguments)}},window.XMLHttpRequest=function(i){var s;return s=new ne(i),r(s),s};try{X(window.XMLHttpRequest,ne)}catch{}if(W!=null){window.XDomainRequest=function(){var i;return i=new W,r(i),i};try{X(window.XDomainRequest,W)}catch{}}if(k!=null&&g.ajax.trackWebSockets){window.WebSocket=function(i,s){var c;return s!=null?c=new k(i,s):c=new k(i),z("socket")&&n.trigger("request",{type:"socket",url:i,protocols:s,request:c}),c};try{X(window.WebSocket,k)}catch{}}}return e})(Y),B=null,J=function(){return B==null&&(B=new _e),B},te=function(t){var e,r,n,i;for(i=g.ajax.ignoreURLs,r=0,n=i.length;r<n;r++)if(e=i[r],typeof e=="string"){if(t.indexOf(e)!==-1)return!0}else if(e.test(t))return!0;return!1},J().on("request",function(t){var e,r,n,i,s;if(i=t.type,n=t.request,s=t.url,!te(s)&&!p.running&&(g.restartOnRequestAfter!==!1||z(i)==="force"))return r=arguments,e=g.restartOnRequestAfter||0,typeof e=="boolean"&&(e=0),setTimeout(function(){var c,u,f,E,A,L;if(i==="socket"?c=n.readyState<1:c=0<(E=n.readyState)&&E<4,c){for(p.restart(),A=p.sources,L=[],u=0,f=A.length;u<f;u++)if(x=A[u],x instanceof v){x.watch.apply(x,r);break}else L.push(void 0);return L}},e)}),v=(function(){function t(){this.complete=Re(this.complete,this);var e=this;this.elements=[],J().on("request",function(){return e.watch.apply(e,arguments)})}return t.prototype.watch=function(e){var r,n,i,s;if(i=e.type,r=e.request,s=e.url,!te(s))return i==="socket"?n=new fe(r,this.complete):n=new he(r,this.complete),this.elements.push(n)},t.prototype.complete=function(e){return this.elements=this.elements.filter(function(r){return r!==e})},t})(),he=(function(){function t(e,r){var n,i,s,c,u,f=this;if(this.progress=0,window.ProgressEvent!=null)for(V(e,"progress",function(E){return E.lengthComputable?f.progress=100*E.loaded/E.total:f.progress=f.progress+(100-f.progress)/2},!1),u=["load","abort","timeout","error"],i=0,s=u.length;i<s;i++)n=u[i],V(e,n,function(){return r(f),f.progress=100},!1);else c=e.onreadystatechange,e.onreadystatechange=function(){var E;return(E=e.readyState)===0||E===4?(r(f),f.progress=100):e.readyState===3&&(f.progress=50),typeof c=="function"?c.apply(null,arguments):void 0}}return t})(),fe=(function(){function t(e,r){var n,i,s,c,u=this;for(this.progress=0,c=["error","open"],i=0,s=c.length;i<s;i++)n=c[i],V(e,n,function(){return r(u),u.progress=100},!1)}return t})(),m=(function(){function t(e){var r,n,i,s;for(e==null&&(e={}),this.complete=Re(this.complete,this),this.elements=[],e.selectors==null&&(e.selectors=[]),s=e.selectors,n=0,i=s.length;n<i;n++)r=s[n],this.elements.push(new y(r,this.complete))}return t.prototype.complete=function(e){return this.elements=this.elements.filter(function(r){return r!==e})},t})(),y=(function(){function t(e,r){this.selector=e,this.completeCallback=r,this.progress=0,this.check()}return t.prototype.check=function(){var e=this;return document.querySelector(this.selector)?this.done():setTimeout((function(){return e.check()}),g.elements.checkInterval)},t.prototype.done=function(){return this.completeCallback(this),this.completeCallback=null,this.progress=100},t})(),a=(function(){t.prototype.states={loading:0,interactive:50,complete:100};function t(){var e,r,n=this;this.progress=(r=this.states[document.readyState])!=null?r:100,e=document.onreadystatechange,document.onreadystatechange=function(){return n.states[document.readyState]!=null&&(n.progress=n.states[document.readyState]),typeof e=="function"?e.apply(null,arguments):void 0}}return t})(),pe=(function(){function t(){var e,r,n,i,s,c=this;this.progress=0,e=0,s=[],i=0,n=O(),r=setInterval(function(){var u;return u=O()-n-50,n=O(),s.push(u),s.length>g.eventLag.sampleCount&&s.shift(),e=ve(s),++i>=g.eventLag.minSamples&&e<g.eventLag.lagThreshold?(c.progress=100,clearInterval(r)):c.progress=100*(3/(e+3))},50)}return t})(),K=(function(){function t(e){this.source=e,this.last=this.sinceLastUpdate=0,this.rate=g.initialRate,this.catchup=0,this.progress=this.lastProgress=0,this.source!=null&&(this.progress=ee(this.source,"progress"))}return t.prototype.tick=function(e,r){var n;return r==null&&(r=ee(this.source,"progress")),r>=100&&(this.done=!0),r===this.last?this.sinceLastUpdate+=e:(this.sinceLastUpdate&&(this.rate=(r-this.last)/this.sinceLastUpdate),this.catchup=(r-this.progress)/g.catchupTime,this.sinceLastUpdate=0,this.last=r),r>this.progress&&(this.progress+=this.catchup*e),n=1-Math.pow(this.progress/100,g.easeFactor),this.progress+=n*this.rate*e,this.progress=Math.min(this.lastProgress+g.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},t})(),P=null,I=null,T=null,re=null,S=null,C=null,p.running=!1,Z=function(){if(g.restartOnPushState)return p.restart()},window.history.pushState!=null&&(xe=window.history.pushState,window.history.pushState=function(){return Z(),xe.apply(window.history,arguments)}),window.history.replaceState!=null&&(Oe=window.history.replaceState,window.history.replaceState=function(){return Z(),Oe.apply(window.history,arguments)}),ge={ajax:v,elements:m,document:a,eventLag:pe},(ye=function(){var t,e,r,n,i,s,c,u;for(p.sources=P=[],s=["ajax","elements","document","eventLag"],e=0,n=s.length;e<n;e++)t=s[e],g[t]!==!1&&P.push(new ge[t](g[t]));for(u=(c=g.extraSources)!=null?c:[],r=0,i=u.length;r<i;r++)x=u[r],P.push(new x(g));return p.bar=T=new _,I=[],re=new K})(),p.stop=function(){return p.trigger("stop"),p.running=!1,T.destroy(),C=!0,S!=null&&(typeof N=="function"&&N(S),S=null),ye()},p.restart=function(){return p.trigger("restart"),p.stop(),p.start()},p.go=function(){var t;return p.running=!0,T.render(),t=O(),C=!1,S=we(function(e,r){var n,i,s,c,u,f,E,A,L,se,oe,ae,De,Pe,Se;for(100-T.progress,i=se=0,s=!0,f=oe=0,De=P.length;oe<De;f=++oe)for(x=P[f],L=I[f]!=null?I[f]:I[f]=[],u=(Se=x.elements)!=null?Se:[x],E=ae=0,Pe=u.length;ae<Pe;E=++ae)c=u[E],A=L[E]!=null?L[E]:L[E]=new K(c),s&=A.done,!A.done&&(i++,se+=A.tick(e));return n=se/i,T.update(re.tick(e,n)),T.done()||s||C?(T.update(100),p.trigger("done"),setTimeout(function(){return T.finish(),p.running=!1,p.trigger("hide")},Math.max(g.ghostTime,Math.max(g.minTime-(O()-t),0)))):r()})},p.start=function(t){$(g,t),p.running=!0;try{T.render()}catch(e){j=e}return document.querySelector(".pace")?(p.trigger("start"),p.go()):setTimeout(p.start,50)},l.exports=p}).call(ir)})(F)),F.exports}var or=sr();const ar=tt(or);var lr=Object.getOwnPropertyDescriptor,cr=(l,d,v,_)=>{for(var a=_>1?void 0:_?lr(d,v):d,m=l.length-1,y;m>=0;m--)(y=l[m])&&(a=y(a)||a);return a};const dr=3,ur=5,pr=[{title:"Standup",time:"Today 9:00",location:"Room A"},{title:"Sprint planning",time:"Tomorrow 14:00",location:"Room B"},{title:"Design review",time:"Wed 10:00",location:"Call"}];let le=class extends ue{render(){return b`
            <div class="overview">
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="list-check"></wa-icon>
                        Tasks
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">${ur}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${dr}</span>
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
                        ${pr.map(l=>b`
                                <li class="meeting-item">
                                    <span class="meeting-title">${l.title}</span>
                                    <span class="meeting-meta">${l.time} · ${l.location}</span>
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
    `;le=cr([G("lyra-dashboard-welcome")],le);var mr=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,Ze=(l,d,v,_)=>{for(var a=_>1?void 0:_?_r(d,v):d,m=l.length-1,y;m>=0;m--)(y=l[m])&&(a=(_?y(d,v,a):y(a))||a);return _&&a&&mr(d,v,a),a};const gr=[{id:"1",title:"Review pull request #142",done:!1,due:"Today"},{id:"2",title:"Update documentation",done:!0},{id:"3",title:"Fix login redirect bug",done:!1,due:"Tomorrow"},{id:"4",title:"Prepare sprint demo",done:!1,due:"Fri"},{id:"5",title:"Sync with design team",done:!0}];let H=class extends ue{constructor(){super(...arguments),this.tasks=[...gr]}toggleTask(l){this.tasks=this.tasks.map(d=>d.id===l?{...d,done:!d.done}:d)}render(){return b`
            <ul class="taslist">
                ${this.tasks.map(l=>b`
                        <li class="tasitem ${l.done?"done":""}">
                            <wa-checkbox
                                ?checked=${l.done}
                                @change=${()=>this.toggleTask(l.id)}
                                aria-label="${l.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${l.title}</span>
                            ${l.due?b`<span class="tasdue">${l.due}</span>`:""}
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
    `;Ze([rt()],H.prototype,"tasks",2);H=Ze([G("lyra-dashboard-my-tasks")],H);var fr=Object.getOwnPropertyDescriptor,hr=(l,d,v,_)=>{for(var a=_>1?void 0:_?fr(d,v):d,m=l.length-1,y;m>=0;m--)(y=l[m])&&(a=y(a)||a);return a};const Qe=[{title:"Standup",start:"9:00",end:"9:15",day:"Mon",location:"Room A"},{title:"Sprint planning",start:"14:00",end:"15:30",day:"Tue",location:"Room B"},{title:"Design review",start:"10:00",end:"11:00",day:"Wed",location:"Call"},{title:"1:1 with manager",start:"16:00",end:"16:30",day:"Thu",location:"Room C"},{title:"Retrospective",start:"11:00",end:"12:00",day:"Fri",location:"Room A"}];let ce=class extends ue{render(){const l=["Mon","Tue","Wed","Thu","Fri"];return b`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${l.map(d=>b`<span class="day-col">${d}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${l.map(d=>{const v=Qe.filter(_=>_.day===d);return b`
                            <div class="day-cell">
                                ${v.map(_=>b`
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
                    ${Qe.map(d=>b`
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
    `;ce=hr([G("lyra-dashboard-meetings")],ce);var vr=Object.getOwnPropertyDescriptor,Er=(l,d,v,_)=>{for(var a=_>1?void 0:_?vr(d,v):d,m=l.length-1,y;m>=0;m--)(y=l[m])&&(a=y(a)||a);return a};const yr=()=>b`
    <div style="padding: var(--wa-space-m); display: flex; justify-content: center; min-width: 48px; min-height: 48px; box-sizing: border-box;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="var(--wa-color-brand-fill, #0d6efd)"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
        </svg> <i>My Dashboard</i>
    </div>
`;D.registerContribution("dashboard-toolbar-top",{label:"Dashboard",slot:"start",component:yr});let Je=class extends lt{render(){return b`<slot></slot>`}};Je=Er([G("lyra-view-wrapper")],Je);const wr=(l,d,v,_,a)=>({name:l,label:d,icon:v,closable:a??!1,toolbar:!1,component:m=>_()}),br=[["dashboard-home","Overview","house",()=>b`<lyra-dashboard-welcome></lyra-dashboard-welcome>`,!1],["dashboard-tasks","My Tasks","list-check",()=>b`<lyra-dashboard-my-tasks></lyra-dashboard-my-tasks>`,!0],["dashboard-meetings","Meetings","calendar-days",()=>b`<lyra-dashboard-meetings></lyra-dashboard-meetings>`,!0]];for(const[l,d,v,_,a]of br)D.registerContribution(nt,wr(l,d,v,_,a)),D.registerContribution("dashboard-views",{label:d,icon:v,showLabel:!0,command:"open_view_as_editor",params:{name:l}});D.registerContribution("dashboard-views-toolbar-bottom",{label:"Profile",icon:"user",command:"open_user_profile"});D.registerContribution("dashboard-views-toolbar-bottom",{label:"Settings",icon:"gear",command:"open_settings"});const xr=()=>b`<style>
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
    </div>`;D.registerContribution(it,{id:"dashboard",name:"Dashboard",label:"Dashboard",icon:"table-cells",component:xr,onShow(){requestAnimationFrame(()=>{st.execute("open_view_as_editor",{params:{name:"dashboard-home"}})})}});ar.start();D.registerContribution(ct,{label:"Eclipse Lyra",slot:"start",component:()=>b`
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
