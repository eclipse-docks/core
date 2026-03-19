const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/github-service-extension-B9550E0P-DNTB9frf.js","assets/config-BohSmpxh-KV7tAD5O.js","assets/config-BohSmpxh-Cw9IDlk8.css","assets/ai-system-extension-CR2RGyBs-D9ADRUCY.js","assets/ai-service-CHv1hGx1-B97E51K0.js","assets/command-palette-extension-DCiXclCm-_d2QhHEQ.js","assets/command-shell-extension-BLbUwFgU-DVf9bCVz.js","assets/loader-BkUaPWVR.js","assets/dataviewer-extension-xp4hbHtz-Cu_7W0n0.js","assets/duckdb-extension-DwbNB9x_-u_PybY4k.js","assets/index-D7yrUyno.js","assets/api-DSLsVv7B.js","assets/tslib.es6-D3hF0DQN.js","assets/notebook-kernel-api--RBL5TaE-2imfStcI.js","assets/howto-extension-8r07TyoY-VP9b8A4D.js","assets/in-browser-ml-extension-Brjz3rUR-DGqjdFtL.js","assets/in-browser-ml-service-BkNRK5pS-Dq0vIf2L.js","assets/linuxterminal-CNzBkP2x-C2SpfAi3.js","assets/md-editor-extension-BnLEZVXp-Bua8T30O.js","assets/media-viewer-extension-B7CpFkFz-CMwK_bgA.js","assets/memory-usage-extension-CU1A0tc3-wmWGHdxG.js","assets/monaco-editor-extension-CPjz_Vxe-CBVNHAa5.js","assets/monaco-editor-extension-CPjz_Vxe-Dvl_Svmm.css","assets/pglite-extension-BU2Y49uD-8NqROKN4.js","assets/python-runtime-extension-CtKxuNfa-1dUDvqle.js","assets/pyservice-CXj6dvu6-Dh3dVAVX.js","assets/package-manager-DTcpwrMr-DJHl9CQx.js","assets/commands-CXonsOoY-Czx8apZB.js","assets/rag-system-extension-BvmOXMX--n59igefU.js","assets/settings-tree-extension-qqh_Ohws-Dt1RcFZK.js","assets/sqleditor-extension-BFAaVI-7-Hz2cPdke.js","assets/index-t4Bwt-Mn-0B-gO-TT.js","assets/webdav-extension-T-6fb3Mi-DjKXkIh0.js","assets/webllmservice-Birv3OKf-CeHYG8tp.js","assets/webmcp-extension-CERaCVzg-CRHRibUc.js"])))=>i.map(i=>d[i]);
import{i as d,_ as e,e as n,a as C,b as g,c as v,d as l,t as m,r as N,f as _,S as X,g as z,h as B,T as W,E as G,L as U,j as q}from"./config-BohSmpxh-KV7tAD5O.js";import"./index-D7yrUyno.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const H="@eclipse-lyra/extension-github-service",Y={name:H},F="https://api.github.com";function K(){const a=C.getCurrentApp();if(a?.metadata?.github){const t=a.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw new Error("GitHub repository not configured. Specify metadata.github in AppDefinition.")}async function Q(a=100){try{const t=K(),s=await fetch(`${F}/repos/${t.owner}/${t.repo}/releases?per_page=${a}`);return s.ok?await s.json():[]}catch(t){return console.error("Failed to fetch releases:",t),[]}}const b=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-BULd5GVW-Bn_TGH4j.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-nhKFFW9C-Famg4yHh.js"),[])}),!0);n.registerExtension({id:Y.name,name:b.EXT_GITHUB_SERVICE_NAME,description:b.EXT_GITHUB_SERVICE_DESC,loader:()=>e(()=>import("./github-service-extension-B9550E0P-DNTB9frf.js"),__vite__mapDeps([0,1,2])),icon:"code-branch"});const J="@eclipse-lyra/extension-ai-system",Z={name:J};n.registerExtension({id:Z.name,name:"AI System",description:"AI assistants, chat, and tool execution",loader:()=>e(()=>import("./ai-system-extension-CR2RGyBs-D9ADRUCY.js"),__vite__mapDeps([3,1,2,4])),icon:"robot"});const ee="@eclipse-lyra/extension-command-palette",te={name:ee},w=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-B7G9mZre-BMUzmHSG.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DUXt8fIp-BWYi1YcR.js"),[])}),!0);n.registerExtension({id:te.name,name:w.EXT_COMMANDPALETTE_NAME,description:w.EXT_COMMANDPALETTE_DESC,loader:()=>e(()=>import("./command-palette-extension-DCiXclCm-_d2QhHEQ.js"),__vite__mapDeps([5,1,2])),icon:"terminal"});const ae="@eclipse-lyra/extension-command-shell",ie={name:ae},h=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-D7bPDIHm-BNyI7vyE.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DUgzk-l0-BBFwxyT0.js"),[])}),!0);n.registerExtension({id:ie.name,name:h.EXT_COMMANDSHELL_NAME,description:h.EXT_COMMANDSHELL_DESC,loader:()=>e(()=>import("./command-shell-extension-BLbUwFgU-DVf9bCVz.js"),__vite__mapDeps([6,1,2])),icon:"terminal",experimental:!0});n.registerExtension({id:"@eclipse-lyra/extension-catalog",name:"Catalog",description:"Browse and checkout resources from a catalog",loader:()=>e(()=>import("./loader-BkUaPWVR.js"),__vite__mapDeps([7,1,2])),icon:"book"});const oe="@eclipse-lyra/extension-dataviewer",re={name:oe};n.registerExtension({id:re.name,name:"Data Viewer",description:"Tabular data views, persistence, and CSV/TSV/DuckDB integration",loader:()=>e(()=>import("./dataviewer-extension-xp4hbHtz-Cu_7W0n0.js"),__vite__mapDeps([8,1,2])),icon:"table"});const ne="@eclipse-lyra/extension-duckdb",se={name:ne},y=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-vsrkdDrs-CrncopA1.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-rmgsXRJQ-DrfEnFhW.js"),[])}),!0);n.registerExtension({id:se.name,name:y.EXT_DUCKDB_NAME,description:y.EXT_DUCKDB_DESC,loader:()=>e(()=>import("./duckdb-extension-DwbNB9x_-u_PybY4k.js"),__vite__mapDeps([9,1,2,10,11,12,13])),icon:"database",dependencies:["@eclipse-lyra/extension-sqleditor"],experimental:!0});const le="@eclipse-lyra/extension-howto-system",de={name:le},x=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-O6hSgp0d-DmIVUxyg.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-iVM2YT5S-3uoiMzXB.js"),[])}),!0);n.registerExtension({id:de.name,name:x.EXT_HOWTO_NAME,description:x.EXT_HOWTO_DESC,loader:()=>e(()=>import("./howto-extension-8r07TyoY-VP9b8A4D.js"),__vite__mapDeps([14,1,2,4])),icon:"list-check",experimental:!0});const ce="@eclipse-lyra/extension-in-browser-ml",_e={name:ce},T=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-DZifr5sa-BWHLrdUd.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BQaemDaH-BhDsH6Hy.js"),[])}),!0);n.registerExtension({id:_e.name,name:T.EXT_IN_BROWSER_ML_NAME,description:T.EXT_IN_BROWSER_ML_DESC,loader:()=>e(()=>import("./in-browser-ml-extension-Brjz3rUR-DGqjdFtL.js"),__vite__mapDeps([15,1,2,16])),icon:"brain",experimental:!0});const pe="@eclipse-lyra/extension-linuxterminal",me={name:pe},f=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-DCxnzHzb-Cj9GZiwG.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-ALoq5MWB-B39_inUO.js"),[])}),!0);n.registerExtension({id:me.name,name:f.EXT_LINUXTERMINAL_NAME,description:f.EXT_LINUXTERMINAL_DESC,loader:()=>e(()=>import("./linuxterminal-CNzBkP2x-C2SpfAi3.js"),__vite__mapDeps([17,1,2])),icon:"terminal",experimental:!0});const Ee="@eclipse-lyra/extension-md-editor",ue={name:Ee},A=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CZaCz4W9-B2JDyIPq.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DA7lAJif-B8YbWLGf.js"),[])}),!0);n.registerExtension({id:ue.name,name:A.EXT_MDEDITOR_NAME,description:A.EXT_MDEDITOR_DESC,loader:()=>e(()=>import("./md-editor-extension-BnLEZVXp-Bua8T30O.js"),__vite__mapDeps([18,1,2])),icon:"book"});const ge="@eclipse-lyra/extension-media-viewer",ve={name:ge},O=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Dg_5Bnbh-CuPIFKj6.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-CvZfcZjj-CccBnscq.js"),[])}),!0);n.registerExtension({id:ve.name,name:O.EXT_MEDIAVIEWER_NAME,description:O.EXT_MEDIAVIEWER_DESC,loader:()=>e(()=>import("./media-viewer-extension-B7CpFkFz-CMwK_bgA.js"),__vite__mapDeps([19,1,2])),icon:"image"});const be="@eclipse-lyra/extension-memory-usage",we={name:be},D=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CvNymKu9-BUzdyc_f.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BWr8PWw0-B1paTwCo.js"),[])}),!0);n.registerExtension({id:we.name,name:D.EXT_MEMORYUSAGE_NAME,description:D.EXT_MEMORYUSAGE_DESC,loader:()=>e(()=>import("./memory-usage-extension-CU1A0tc3-wmWGHdxG.js"),__vite__mapDeps([20,1,2])),icon:"microchip"});const he="@eclipse-lyra/extension-monaco-editor",ye={name:he},L=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-pHDhYrCl-xLvCUmQb.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BFkkoMKw-ChYDZfG0.js"),[])}),!0);n.registerExtension({id:ye.name,name:L.EXT_MONACO_NAME,description:L.EXT_MONACO_DESC,loader:()=>e(()=>import("./monaco-editor-extension-CPjz_Vxe-CBVNHAa5.js").then(a=>a.m),__vite__mapDeps([21,1,2,22])),icon:"file-pen"});const xe="@eclipse-lyra/extension-pglite",Te={name:xe};n.registerExtension({id:Te.name,name:"PGlite",description:"In-browser PostgreSQL via PGlite",loader:()=>e(()=>import("./pglite-extension-BU2Y49uD-8NqROKN4.js"),__vite__mapDeps([23,1,2,10,11,13])),icon:"database",dependencies:["@eclipse-lyra/extension-sqleditor"],experimental:!0});const fe="@eclipse-lyra/extension-python-runtime",Ae={name:fe},$=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Db_mF4lT-Db2TPO8T.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DPL4EA5a-7WeX-Ffi.js"),[])}),!0);n.registerExtension({id:Ae.name,name:$.EXT_PYTHONRUNTIME_NAME,description:$.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([e(()=>import("./python-runtime-extension-CtKxuNfa-1dUDvqle.js"),__vite__mapDeps([24,1,2,10,25,26,13])).then(a=>a.a),e(()=>import("./commands-CXonsOoY-Czx8apZB.js"),__vite__mapDeps([27,1,2,25]))]),icon:"lyra python"});const Oe="@eclipse-lyra/extension-rag-system",De={name:Oe},I=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-CcQ_-YBM-h3YwzzLh.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BUMbE-M4-xeLk_Fmf.js"),[])}),!0);n.registerExtension({id:De.name,name:I.EXT_RAG_SYSTEM_NAME,description:I.EXT_RAG_SYSTEM_DESC,loader:()=>e(()=>import("./rag-system-extension-BvmOXMX--n59igefU.js").then(a=>a.b),__vite__mapDeps([28,1,2,16,4])),icon:"database",experimental:!0,dependencies:["@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-in-browser-ml"]});const Le="@eclipse-lyra/extension-settings-tree",$e={name:Le},P=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-DyWo8pOM-CNeg7psB.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-BsMBVteB-BrbQnRTh.js"),[])}),!0);n.registerExtension({id:$e.name,name:P.EXT_SETTINGS_TREE_NAME,description:P.EXT_SETTINGS_TREE_DESC,loader:()=>e(()=>import("./settings-tree-extension-qqh_Ohws-Dt1RcFZK.js"),__vite__mapDeps([29,1,2])),icon:"sitemap"});const Ie="@eclipse-lyra/extension-sqleditor",Pe={name:Ie};n.registerExtension({id:Pe.name,name:"SQL Editor",description:"Generic SQL editor with pluggable backends",loader:()=>e(()=>import("./sqleditor-extension-BFAaVI-7-Hz2cPdke.js"),__vite__mapDeps([30,1,2])),icon:"database"});const Re="@eclipse-lyra/extension-utils",Se={name:Re},R=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Co8ID32S-rdFQX5bT.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-SbpUszRA-UF1sqvEA.js"),[])}),!0);n.registerExtension({id:Se.name,name:R.EXT_UTILS_NAME,description:R.EXT_UTILS_DESC,loader:()=>e(()=>import("./index-t4Bwt-Mn-0B-gO-TT.js"),__vite__mapDeps([31,1,2,25,26])),icon:"toolbox",dependencies:["@eclipse-lyra/extension-python-runtime"]});const Me="@eclipse-lyra/extension-webdav",Ve={name:Me},S=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-C4Rq8srl-DQHncNMk.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-CW-FQ8N--BoMxiQmY.js"),[])}),!0);n.registerExtension({id:Ve.name,name:S.EXT_WEBDAV_NAME,description:S.EXT_WEBDAV_DESC,loader:()=>e(()=>import("./webdav-extension-T-6fb3Mi-DjKXkIh0.js"),__vite__mapDeps([32,1,2])),icon:"cloud",experimental:!0});const je="@eclipse-lyra/extension-webllm",Ce={name:je},M=await d(Object.assign({"./i18n.de.json":()=>e(()=>import("./i18n.de-Zh6IDMrM-0AYXcG1p.js"),[]),"./i18n.en.json":()=>e(()=>import("./i18n.en-DGw3X1Kw-Cl_T3_Z9.js"),[])}),!0);n.registerExtension({id:Ce.name,name:M.EXT_WEBLLM_NAME,description:M.EXT_WEBLLM_DESC,loader:()=>e(()=>import("./webllmservice-Birv3OKf-CeHYG8tp.js"),__vite__mapDeps([33,1,2,4])),icon:"robot",experimental:!0});const ke="@eclipse-lyra/extension-webmcp",Ne={name:ke};function Xe(){return typeof navigator<"u"&&"modelContext"in navigator&&navigator.modelContext!=null}n.registerExtension({id:Ne.name,name:"WebMCP",description:"Exposes app commands as WebMCP tools for browser agents and MCP clients",loader:async()=>{if(!Xe())throw new Error("WebMCP extension requires navigator.modelContext (Web Model Context API).");return e(()=>import("./webmcp-extension-CERaCVzg-CRHRibUc.js"),__vite__mapDeps([34,1,2,4]))},icon:"plug",dependencies:["@eclipse-lyra/extension-ai-system"],experimental:!0});var ze=Object.getOwnPropertyDescriptor,Be=(a,t,s,r)=>{for(var i=r>1?void 0:r?ze(t,s):t,o=a.length-1,c;o>=0;o--)(c=a[o])&&(i=c(i)||i);return i};const We=3,Ge=5,Ue=[{title:"Standup",time:"Today 9:00",location:"Room A"},{title:"Sprint planning",time:"Tomorrow 14:00",location:"Room B"},{title:"Design review",time:"Wed 10:00",location:"Call"}];let E=class extends v{render(){return l`
            <div class="overview">
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="list-check"></wa-icon>
                        Tasks
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">${Ge}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${We}</span>
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
                        ${Ue.map(a=>l`
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
    `;E=Be([m("lyra-dashboard-welcome")],E);var qe=Object.defineProperty,He=Object.getOwnPropertyDescriptor,k=(a,t,s,r)=>{for(var i=r>1?void 0:r?He(t,s):t,o=a.length-1,c;o>=0;o--)(c=a[o])&&(i=(r?c(t,s,i):c(i))||i);return r&&i&&qe(t,s,i),i};const Ye=[{id:"1",title:"Review pull request #142",done:!1,due:"Today"},{id:"2",title:"Update documentation",done:!0},{id:"3",title:"Fix login redirect bug",done:!1,due:"Tomorrow"},{id:"4",title:"Prepare sprint demo",done:!1,due:"Fri"},{id:"5",title:"Sync with design team",done:!0}];let p=class extends v{constructor(){super(...arguments),this.tasks=[...Ye]}toggleTask(a){this.tasks=this.tasks.map(t=>t.id===a?{...t,done:!t.done}:t)}render(){return l`
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
    `;k([N()],p.prototype,"tasks",2);p=k([m("lyra-dashboard-my-tasks")],p);var Fe=Object.getOwnPropertyDescriptor,Ke=(a,t,s,r)=>{for(var i=r>1?void 0:r?Fe(t,s):t,o=a.length-1,c;o>=0;o--)(c=a[o])&&(i=c(i)||i);return i};const V=[{title:"Standup",start:"9:00",end:"9:15",day:"Mon",location:"Room A"},{title:"Sprint planning",start:"14:00",end:"15:30",day:"Tue",location:"Room B"},{title:"Design review",start:"10:00",end:"11:00",day:"Wed",location:"Call"},{title:"1:1 with manager",start:"16:00",end:"16:30",day:"Thu",location:"Room C"},{title:"Retrospective",start:"11:00",end:"12:00",day:"Fri",location:"Room A"}];let u=class extends v{render(){const a=["Mon","Tue","Wed","Thu","Fri"];return l`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${a.map(t=>l`<span class="day-col">${t}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${a.map(t=>{const s=V.filter(r=>r.day===t);return l`
                            <div class="day-cell">
                                ${s.map(r=>l`
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
                    ${V.map(t=>l`
                            <li>
                                <span class="title">${t.title}</span>
                                <div class="meta">${t.day} ${t.start} – ${t.end} · ${t.location}</div>
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
    `;u=Ke([m("lyra-dashboard-meetings")],u);var Qe=Object.getOwnPropertyDescriptor,Je=(a,t,s,r)=>{for(var i=r>1?void 0:r?Qe(t,s):t,o=a.length-1,c;o>=0;o--)(c=a[o])&&(i=c(i)||i);return i};const Ze=()=>l`
    <div style="padding: var(--wa-space-m); display: flex; justify-content: center; min-width: 48px; min-height: 48px; box-sizing: border-box;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="var(--wa-color-brand-fill, #0d6efd)"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
        </svg> <i>My Dashboard</i>
    </div>
`;_.registerContribution("dashboard-toolbar-top",{label:"Dashboard",slot:"start",component:Ze});let j=class extends U{renderContent(){return l`<slot></slot>`}};j=Je([m("lyra-view-wrapper")],j);const et=(a,t,s,r,i)=>({name:a,label:t,icon:s,closable:i??!1,toolbar:!1,component:o=>r()}),tt=[["dashboard-home","Overview","house",()=>l`<lyra-dashboard-welcome></lyra-dashboard-welcome>`,!1],["dashboard-tasks","My Tasks","list-check",()=>l`<lyra-dashboard-my-tasks></lyra-dashboard-my-tasks>`,!0],["dashboard-meetings","Meetings","calendar-days",()=>l`<lyra-dashboard-meetings></lyra-dashboard-meetings>`,!0]];for(const[a,t,s,r,i]of tt)_.registerContribution(X,et(a,t,s,r,i)),_.registerContribution("dashboard-views",{label:t,icon:s,showLabel:!0,command:"open_view_as_editor",params:{name:a}});_.registerContribution("dashboard-views-toolbar-bottom",{label:"Profile",icon:"user",command:"open_user_profile"});_.registerContribution("dashboard-views-toolbar-bottom",{label:"Settings",icon:"gear",command:"open_settings"});const at=()=>l`<style>
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
        <lyra-tabs style="padding: 10px;" id=${G}></lyra-tabs>
      </lyra-resizable-grid>
    </div>`;_.registerContribution(z,{id:"dashboard",name:"Dashboard",label:"Dashboard",icon:"table-cells",component:at,onShow(){requestAnimationFrame(()=>{B.execute("open_view_as_editor",{params:{name:"dashboard-home"}})})}});_.registerContribution(q,{label:"Eclipse Lyra",slot:"start",component:()=>l`
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
  `});const it=document.getElementById("app-root")??document.body;C.registerApp({name:"Eclipse Lyra",description:"Eclipse Lyra demo app with default extensions.",layoutId:"standard-full",metadata:{github:{owner:"eclipse-lyra",repo:"core"}},releaseHistory:Q,extensions:["@eclipse-lyra/extension-command-palette","@eclipse-lyra/extension-command-shell","@eclipse-lyra/extension-catalog","@eclipse-lyra/extension-md-editor","@eclipse-lyra/extension-monaco-editor","@eclipse-lyra/extension-media-viewer","@eclipse-lyra/extension-settings-tree","@eclipse-lyra/extension-memory-usage","@eclipse-lyra/extension-ai-system","@eclipse-lyra/extension-dataviewer"]},{autoStart:!0,hostConfig:!0,container:it});
