const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-system-extension-Bh2DjfuQ.js","assets/vendor-3BPrCeYx.js","assets/vendor-CTYeukuQ.css","assets/monaco-Ck3pLLYn.js","assets/monaco-Dvl_Svmm.css","assets/ai-service-CcvmmqG9.js","assets/command-palette-extension-D3pUqYxv.js","assets/command-shell-extension-Di3Ii5zx.js","assets/dataviewer-extension-xcg1YExM.js","assets/duckdb-extension-CFgs8pDa.js","assets/howto-extension-DXV8PUC7.js","assets/in-browser-ml-extension-43bZ3KdG.js","assets/in-browser-ml-service-ChxUKe3K.js","assets/linuxterminal--HyAWysp.js","assets/md-editor-extension-jGASjR5-.js","assets/media-viewer-extension-BGVZY2iq.js","assets/memory-usage-extension-D1UH9hJN.js","assets/notebook-extension-COOA-Xhh.js","assets/python-runtime-extension-Di86u074.js","assets/pyservice-JEh15U3D.js","assets/package-manager-Bc788dVW.js","assets/commands-DQHrFx27.js","assets/rag-system-extension-IEsbOb8w.js","assets/settings-tree-extension-CERlnN9a.js","assets/sqleditor-extension-Bu77L4Q1.js","assets/index-DiTmTF7R.js","assets/webdav-extension-DZrq-QBz.js","assets/webllmservice-Fqr583Ak.js","assets/webmcp-extension-qyQA18or.js"])))=>i.map(i=>d[i]);
import{_ as e,b as g,a as v,d as l,t as m,e as k}from"./vendor-3BPrCeYx.js";import{e as s,i as d,c as _,S as N,d as X,f as z,T as W,E as B,L as U,g as q,h as G}from"./monaco-Ck3pLLYn.js";import"./pglite-CVGZoWXR.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const H="@eclipse-lyra/extension-ai-system",Y={name:H};s.registerExtension({id:Y.name,name:"AI System",description:"AI assistants, chat, and tool execution",loader:()=>e(()=>import("./ai-system-extension-Bh2DjfuQ.js"),__vite__mapDeps([0,1,2,3,4,5])),icon:"robot"});const K="@eclipse-lyra/extension-command-palette",F={name:K},b=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-BMUzmHSG.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BWYi1YcR.js"),[])}),!0);s.registerExtension({id:F.name,name:b.EXT_COMMANDPALETTE_NAME,description:b.EXT_COMMANDPALETTE_DESC,loader:()=>e(()=>import("./command-palette-extension-D3pUqYxv.js"),__vite__mapDeps([6,3,1,2,4])),icon:"terminal"});const Q="@eclipse-lyra/extension-command-shell",J={name:Q},w=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-BNyI7vyE.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BBFwxyT0.js"),[])}),!0);s.registerExtension({id:J.name,name:w.EXT_COMMANDSHELL_NAME,description:w.EXT_COMMANDSHELL_DESC,loader:()=>e(()=>import("./command-shell-extension-Di3Ii5zx.js"),__vite__mapDeps([7,1,2,3,4])),icon:"terminal",experimental:!0});const Z="@eclipse-lyra/extension-dataviewer",ee={name:Z};s.registerExtension({id:ee.name,name:"Data Viewer",description:"Tabular data views, persistence, and CSV/TSV/DuckDB integration",loader:()=>e(()=>import("./dataviewer-extension-xcg1YExM.js"),__vite__mapDeps([8,1,2,3,4])),icon:"table"});const te="@eclipse-lyra/extension-duckdb",ae={name:te},y=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CrncopA1.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DrfEnFhW.js"),[])}),!0);s.registerExtension({id:ae.name,name:y.EXT_DUCKDB_NAME,description:y.EXT_DUCKDB_DESC,loader:()=>e(()=>import("./duckdb-extension-CFgs8pDa.js"),__vite__mapDeps([9,3,1,2,4])),icon:"database",dependencies:["@eclipse-lyra/extension-sqleditor"],experimental:!0});const ie="@eclipse-lyra/extension-github-service",oe={name:ie},h=await d(Object.assign({}),!0);s.registerExtension({id:oe.name,name:h.EXT_GITHUB_SERVICE_NAME,description:h.EXT_GITHUB_SERVICE_DESC,loader:()=>e(()=>import("./github-service-extension-9FP3M3ve.js"),[]),icon:"code-branch"});const re="@eclipse-lyra/extension-howto-system",se={name:re},x=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-DmIVUxyg.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-3uoiMzXB.js"),[])}),!0);s.registerExtension({id:se.name,name:x.EXT_HOWTO_NAME,description:x.EXT_HOWTO_DESC,loader:()=>e(()=>import("./howto-extension-DXV8PUC7.js"),__vite__mapDeps([10,3,1,2,4,5])),icon:"list-check",experimental:!0});const ne="@eclipse-lyra/extension-in-browser-ml",le={name:ne},T=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-BWHLrdUd.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BhDsH6Hy.js"),[])}),!0);s.registerExtension({id:le.name,name:T.EXT_IN_BROWSER_ML_NAME,description:T.EXT_IN_BROWSER_ML_DESC,loader:()=>e(()=>import("./in-browser-ml-extension-43bZ3KdG.js"),__vite__mapDeps([11,3,1,2,4,12])),icon:"brain",experimental:!0});const de="@eclipse-lyra/extension-linuxterminal",ce={name:de},O=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Cj9GZiwG.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-B39_inUO.js"),[])}),!0);s.registerExtension({id:ce.name,name:O.EXT_LINUXTERMINAL_NAME,description:O.EXT_LINUXTERMINAL_DESC,loader:()=>e(()=>import("./linuxterminal--HyAWysp.js"),__vite__mapDeps([13,1,2,3,4])),icon:"terminal",experimental:!0});const _e="@eclipse-lyra/extension-md-editor",pe={name:_e},f=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-B2JDyIPq.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-B8YbWLGf.js"),[])}),!0);s.registerExtension({id:pe.name,name:f.EXT_MDEDITOR_NAME,description:f.EXT_MDEDITOR_DESC,loader:()=>e(()=>import("./md-editor-extension-jGASjR5-.js"),__vite__mapDeps([14,1,2,3,4])),icon:"book"});const me="@eclipse-lyra/extension-media-viewer",Ee={name:me},A=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CuPIFKj6.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-CccBnscq.js"),[])}),!0);s.registerExtension({id:Ee.name,name:A.EXT_MEDIAVIEWER_NAME,description:A.EXT_MEDIAVIEWER_DESC,loader:()=>e(()=>import("./media-viewer-extension-BGVZY2iq.js"),__vite__mapDeps([15,1,2,3,4])),icon:"image"});const ue="@eclipse-lyra/extension-memory-usage",ge={name:ue},D=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-BUzdyc_f.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-B1paTwCo.js"),[])}),!0);s.registerExtension({id:ge.name,name:D.EXT_MEMORYUSAGE_NAME,description:D.EXT_MEMORYUSAGE_DESC,loader:()=>e(()=>import("./memory-usage-extension-D1UH9hJN.js"),__vite__mapDeps([16,3,1,2,4])),icon:"microchip"});const ve="@eclipse-lyra/extension-notebook",be={name:ve},L=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-NIP_kkww.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-azDELEle.js"),[])}),!0);s.registerExtension({id:be.name,name:L.EXT_NOTEBOOK_NAME,description:L.EXT_NOTEBOOK_DESC,loader:()=>e(()=>import("./notebook-extension-COOA-Xhh.js"),__vite__mapDeps([17,1,2,3,4])),icon:"lyra jupyter",dependencies:["@eclipse-lyra/extension-python-runtime"]});const we="@eclipse-lyra/extension-python-runtime",ye={name:we},$=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Db2TPO8T.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-7WeX-Ffi.js"),[])}),!0);s.registerExtension({id:ye.name,name:$.EXT_PYTHONRUNTIME_NAME,description:$.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([e(()=>import("./python-runtime-extension-Di86u074.js").then(a=>a.a),__vite__mapDeps([18,1,2,3,4,19,20])),e(()=>import("./commands-DQHrFx27.js"),__vite__mapDeps([21,3,1,2,4,19]))]),icon:"lyra python"});const he="@eclipse-lyra/extension-rag-system",xe={name:he},R=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-h3YwzzLh.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-xeLk_Fmf.js"),[])}),!0);s.registerExtension({id:xe.name,name:R.EXT_RAG_SYSTEM_NAME,description:R.EXT_RAG_SYSTEM_DESC,loader:()=>e(()=>import("./rag-system-extension-IEsbOb8w.js").then(a=>a.b),__vite__mapDeps([22,1,2,3,4,12,5])),icon:"database",experimental:!0,dependencies:["@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-in-browser-ml"]});const Te="@eclipse-lyra/extension-settings-tree",Oe={name:Te},I=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CNeg7psB.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BrbQnRTh.js"),[])}),!0);s.registerExtension({id:Oe.name,name:I.EXT_SETTINGS_TREE_NAME,description:I.EXT_SETTINGS_TREE_DESC,loader:()=>e(()=>import("./settings-tree-extension-CERlnN9a.js"),__vite__mapDeps([23,1,2,3,4])),icon:"sitemap"});const fe="@eclipse-lyra/extension-sqleditor",Ae={name:fe};s.registerExtension({id:Ae.name,name:"SQL Editor",description:"Generic SQL editor with pluggable backends",loader:()=>e(()=>import("./sqleditor-extension-Bu77L4Q1.js"),__vite__mapDeps([24,3,1,2,4])),icon:"database"});const De="@eclipse-lyra/extension-utils",Le={name:De},P=await d(Object.assign({"./i18n.en.json":()=>e(()=>import("./i18n.en-hWm4ZfID.js"),[])}),!0);s.registerExtension({id:Le.name,name:P.EXT_UTILS_NAME,description:P.EXT_UTILS_DESC,loader:()=>e(()=>import("./index-DiTmTF7R.js"),__vite__mapDeps([25,3,1,2,4,19,20])),icon:"toolbox",dependencies:["@eclipse-lyra/extension-python-runtime"]});const $e="@eclipse-lyra/extension-webdav",Re={name:$e},S=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-DQHncNMk.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BoMxiQmY.js"),[])}),!0);s.registerExtension({id:Re.name,name:S.EXT_WEBDAV_NAME,description:S.EXT_WEBDAV_DESC,loader:()=>e(()=>import("./webdav-extension-DZrq-QBz.js"),__vite__mapDeps([26,3,1,2,4])),icon:"cloud",experimental:!0});const Ie="@eclipse-lyra/extension-webllm",Pe={name:Ie},M=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-0AYXcG1p.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-Cl_T3_Z9.js"),[])}),!0);s.registerExtension({id:Pe.name,name:M.EXT_WEBLLM_NAME,description:M.EXT_WEBLLM_DESC,loader:()=>e(()=>import("./webllmservice-Fqr583Ak.js"),__vite__mapDeps([27,1,2,3,4,5])),icon:"robot",experimental:!0});const Se="@eclipse-lyra/extension-webmcp",Me={name:Se};function Ve(){return typeof navigator<"u"&&"modelContext"in navigator&&navigator.modelContext!=null}s.registerExtension({id:Me.name,name:"WebMCP",description:"Exposes app commands as WebMCP tools for browser agents and MCP clients",loader:async()=>{if(!Ve())throw new Error("WebMCP extension requires navigator.modelContext (Web Model Context API).");return e(()=>import("./webmcp-extension-qyQA18or.js"),__vite__mapDeps([28,3,1,2,4,5]))},icon:"plug",dependencies:["@eclipse-lyra/extension-ai-system"],experimental:!0});var je=Object.getOwnPropertyDescriptor,Ce=(a,i,n,r)=>{for(var t=r>1?void 0:r?je(i,n):i,o=a.length-1,c;o>=0;o--)(c=a[o])&&(t=c(t)||t);return t};const ke=3,Ne=5,Xe=[{title:"Standup",time:"Today 9:00",location:"Room A"},{title:"Sprint planning",time:"Tomorrow 14:00",location:"Room B"},{title:"Design review",time:"Wed 10:00",location:"Call"}];let E=class extends v{render(){return l`
            <div class="overview">
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="list-check"></wa-icon>
                        Tasks
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">${Ne}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${ke}</span>
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
                        ${Xe.map(a=>l`
                                <li class="meeting-item">
                                    <span class="meeting-title">${a.title}</span>
                                    <span class="meeting-meta">${a.time} · ${a.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};E.styles=g`
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
    `;E=Ce([m("lyra-dashboard-welcome")],E);var ze=Object.defineProperty,We=Object.getOwnPropertyDescriptor,C=(a,i,n,r)=>{for(var t=r>1?void 0:r?We(i,n):i,o=a.length-1,c;o>=0;o--)(c=a[o])&&(t=(r?c(i,n,t):c(t))||t);return r&&t&&ze(i,n,t),t};const Be=[{id:"1",title:"Review pull request #142",done:!1,due:"Today"},{id:"2",title:"Update documentation",done:!0},{id:"3",title:"Fix login redirect bug",done:!1,due:"Tomorrow"},{id:"4",title:"Prepare sprint demo",done:!1,due:"Fri"},{id:"5",title:"Sync with design team",done:!0}];let p=class extends v{constructor(){super(...arguments),this.tasks=[...Be]}toggleTask(a){this.tasks=this.tasks.map(i=>i.id===a?{...i,done:!i.done}:i)}render(){return l`
            <ul class="taslist">
                ${this.tasks.map(a=>l`
                        <li class="tasitem ${a.done?"done":""}">
                            <wa-checkbox
                                ?checked=${a.done}
                                @change=${()=>this.toggleTask(a.id)}
                                aria-label="${a.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${a.title}</span>
                            ${a.due?l`<span class="tasdue">${a.due}</span>`:""}
                        </li>
                    `)}
            </ul>
        `}};p.styles=g`
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
    `;C([k()],p.prototype,"tasks",2);p=C([m("lyra-dashboard-my-tasks")],p);var Ue=Object.getOwnPropertyDescriptor,qe=(a,i,n,r)=>{for(var t=r>1?void 0:r?Ue(i,n):i,o=a.length-1,c;o>=0;o--)(c=a[o])&&(t=c(t)||t);return t};const V=[{title:"Standup",start:"9:00",end:"9:15",day:"Mon",location:"Room A"},{title:"Sprint planning",start:"14:00",end:"15:30",day:"Tue",location:"Room B"},{title:"Design review",start:"10:00",end:"11:00",day:"Wed",location:"Call"},{title:"1:1 with manager",start:"16:00",end:"16:30",day:"Thu",location:"Room C"},{title:"Retrospective",start:"11:00",end:"12:00",day:"Fri",location:"Room A"}];let u=class extends v{render(){const a=["Mon","Tue","Wed","Thu","Fri"];return l`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${a.map(i=>l`<span class="day-col">${i}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${a.map(i=>{const n=V.filter(r=>r.day===i);return l`
                            <div class="day-cell">
                                ${n.map(r=>l`
                                        <div class="meeting-card">
                                            <div class="title">${r.title}</div>
                                            <div class="time">${r.start} – ${r.end}</div>
                                            <div class="time">${r.location}</div>
                                        </div>
                                    `)}
                            </div>
                        `})}
                </div>
                <h3 style="margin-top: var(--wa-space-xl); margin-bottom: var(--wa-space-m);">This week</h3>
                <ul class="meeting-list">
                    ${V.map(i=>l`
                            <li>
                                <span class="title">${i.title}</span>
                                <div class="meta">${i.day} ${i.start} – ${i.end} · ${i.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};u.styles=g`
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
    `;u=qe([m("lyra-dashboard-meetings")],u);var Ge=Object.getOwnPropertyDescriptor,He=(a,i,n,r)=>{for(var t=r>1?void 0:r?Ge(i,n):i,o=a.length-1,c;o>=0;o--)(c=a[o])&&(t=c(t)||t);return t};const Ye=()=>l`
    <div style="padding: var(--wa-space-m); display: flex; justify-content: center; min-width: 48px; min-height: 48px; box-sizing: border-box;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="var(--wa-color-brand-fill, #0d6efd)"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
        </svg> <i>My Dashboard</i>
    </div>
`;_.registerContribution("dashboard-toolbar-top",{label:"Dashboard",slot:"start",component:Ye});let j=class extends U{render(){return l`<slot></slot>`}};j=He([m("lyra-view-wrapper")],j);const Ke=(a,i,n,r,t)=>({name:a,label:i,icon:n,closable:t??!1,toolbar:!1,component:o=>r()}),Fe=[["dashboard-home","Overview","house",()=>l`<lyra-dashboard-welcome></lyra-dashboard-welcome>`,!1],["dashboard-tasks","My Tasks","list-check",()=>l`<lyra-dashboard-my-tasks></lyra-dashboard-my-tasks>`,!0],["dashboard-meetings","Meetings","calendar-days",()=>l`<lyra-dashboard-meetings></lyra-dashboard-meetings>`,!0]];for(const[a,i,n,r,t]of Fe)_.registerContribution(N,Ke(a,i,n,r,t)),_.registerContribution("dashboard-views",{label:i,icon:n,showLabel:!0,command:"open_view_as_editor",params:{name:a}});_.registerContribution("dashboard-views-toolbar-bottom",{label:"Profile",icon:"user",command:"open_user_profile"});_.registerContribution("dashboard-views-toolbar-bottom",{label:"Settings",icon:"gear",command:"open_settings"});const Qe=()=>l`<style>
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
        <lyra-toolbar id=${W}></lyra-toolbar>
      </div>
      <lyra-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <lyra-toolbar id="dashboard-views" size="large" orientation="vertical"></lyra-toolbar>
        <lyra-tabs style="padding: 10px;" id=${B}></lyra-tabs>
      </lyra-resizable-grid>
    </div>`;_.registerContribution(X,{id:"dashboard",name:"Dashboard",label:"Dashboard",icon:"table-cells",component:Qe,onShow(){requestAnimationFrame(()=>{z.execute("open_view_as_editor",{params:{name:"dashboard-home"}})})}});_.registerContribution(q,{label:"Eclipse Lyra",slot:"start",component:()=>l`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-s);
        padding: 0 var(--wa-space-s);
      "
    >
      <img
        src="/logo.svg"
        alt="Eclipse Lyra"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `});const Je=document.getElementById("app-root")??document.body;G.registerApp({name:"Eclipse Lyra",description:"Eclipse Lyra demo app with default extensions.",layoutId:"standard-full",extensions:["@eclipse-lyra/extension-utils","@eclipse-lyra/extension-command-palette","@eclipse-lyra/extension-command-shell","@eclipse-lyra/extension-md-editor","@eclipse-lyra/extension-monaco-editor","@eclipse-lyra/extension-media-viewer","@eclipse-lyra/extension-settings-tree","@eclipse-lyra/extension-memory-usage","@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-dataviewer"]},{autoStart:!0,hostConfig:!0,container:Je});
