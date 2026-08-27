const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-extension-BaUCo7Mu-D_mCRmy1.js","assets/dist-DEtSYi1q.js","assets/chunk-DseTPa7n.js","assets/preload-helper-ca-nBW7U.js","assets/fs-access-DTXPsV1W-Dp772n0E.js","assets/dist-CxYUgF8U.css","assets/install-prompt-capture-fZikSCg3-CQ9Cs5kR.js","assets/ai-system-extension-DhTYQGsx-BhdtN7Ld.js","assets/ai-service-Bwwozfwu-B5waomd0.js","assets/loader-DyT_Tdpd.js","assets/lit-CT7tEEDX.js","assets/cereusdb-extension-C1tQ1wM5-DqWD33KP.js","assets/api-C8YIEls5.js","assets/dist-CCxqvyfN.js","assets/notebook-metadata-Bh2hG7NA-Ca2xcq29.js","assets/dist-C7vV356V.js","assets/command-palette-extension-B1qH6ER4-BkUg6CzO.js","assets/dataviewer-extension-DhE3y4Rw-CC6bAXzp.js","assets/duckdb-extension-CkopoMAb-CrMH5-0x.js","assets/tslib.es6-BkH8hnGS.js","assets/github-service-extension-6avU7OHf-DyzzQrjV.js","assets/howto-extension-BDDzKdYl-CpUlShYc.js","assets/api-Cl67K0yN.js","assets/in-browser-ml-extension-B_JuNITB-BnqcjzTX.js","assets/in-browser-ml-service-18Xw5br1-DsSCOVKC.js","assets/md-editor-extension-8oqW93mK-BQ21Q81t.js","assets/media-viewer-extension-CpuQxfjF-CHblEOqZ.js","assets/memory-usage-extension-Yl6iXGvQ-B9J7ymF5.js","assets/monaco-editor-extension-BAeimqAZ-VrPEfmyd.js","assets/editor.api2-CmFNvybj-9BXlHVeW.js","assets/monaco.contribution-CdHWOuG1-BzvGnHi9.js","assets/workers-CGROc86k-WdwMR-mZ.js","assets/pglite-extension-Dn6v97Xh-C7xZfZlQ.js","assets/plain-editor-extension-RRv6pSQe-CAjqrl8p.js","assets/python-runtime-extension-u9NoE4Xj-r9o7EJCB.js","assets/editor-python-run-Cs68X5JL-ecafLbaX.js","assets/package-manager-DJaTJoVI-COnT1AaK.js","assets/pyservice-DGwNXWO4-B-oBOMuA.js","assets/js-terminal-backend-BcQIBeMe-BkOmmQ_R.js","assets/commands-Cn6_ogss-CMauXmQx.js","assets/rag-system-extension-tTT5Pglo-Cj4QsDVT.js","assets/rag-service-Cymd0ECr-b5mA5llL.js","assets/settings-tree-extension-BCSbBt-O-BMQRqCb2.js","assets/terminal-extension-BUc6e5ce-BfFWFAcZ.js","assets/commands-CvhhmqU3-fiKcZ_Kk.js","assets/api-DpvBDibr-CLFRr0S9.js","assets/webdav-extension-BnWGwdSi-BXW6_thj.js","assets/webllmservice-Bdz7vrud-DqSEqNL4.js","assets/__vite-browser-external-Cg7rivQW.js","assets/webmcp-extension-C9QPV2tP-CS47x25N.js"])))=>i.map(i=>d[i]);
import"./install-prompt-capture-fZikSCg3-CQ9Cs5kR.js";import{D as e,H as t,N as n,U as r,_t as i,b as a,dt as o,f as s,ft as c,g as l,gt as u,h as d,lt as ee,o as te,p as ne,r as f,s as re,v as p,w as m}from"./dist-DEtSYi1q.js";import{t as h}from"./preload-helper-ca-nBW7U.js";import"./dist-CCxqvyfN.js";import"./dist-C7vV356V.js";import"./lit-CT7tEEDX.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var ie={name:`@eclipse-docks/extension-pwa`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./vite":{types:`./dist/vite-pwa-plugin.d.ts`,import:`./dist/vite-pwa-plugin.js`},"./sw":{import:`./src/sw.ts`}},dependencies:{"@eclipse-docks/core":`*`,"vite-plugin-pwa":`^1.2.0`},devDependencies:{rolldown:`1.0.0-rc.15`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`,`src/sw.ts`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},g=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CorheGJa-Slbcd7c9.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BjSrybGY-CB88lpgc.js`),[])}),!0);m.registerExtension({id:ie.name,name:g.EXT_PWA_NAME,description:g.EXT_PWA_DESC,loader:()=>h(()=>import(`./pwa-extension-BaUCo7Mu-D_mCRmy1.js`),__vite__mapDeps([0,1,2,3,4,5,6])),icon:`download`}),m.registerExtension({id:{name:`@eclipse-docks/extension-ai-system`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`,lit:`^3.0.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`AI System`,description:`AI assistants, chat, and tool execution`,loader:()=>h(()=>import(`./ai-system-extension-DhTYQGsx-BhdtN7Ld.js`),__vite__mapDeps([7,1,2,3,4,5,8])),icon:`robot`}),m.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>h(()=>import(`./loader-DyT_Tdpd.js`),__vite__mapDeps([9,1,2,3,4,5,10])),icon:`book`}),m.registerExtension({id:{name:`@eclipse-docks/extension-cereusdb`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@cereusdb/full":`^0.1.2`,"@cereusdb/global":`^0.1.2`,"@cereusdb/minimal":`^0.1.2`,"@cereusdb/standard":`^0.1.2`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},eclipseDocks:{viteOptimizeDepsExclude:[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`]}}.name,name:`CereusDB`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`,loader:()=>h(()=>import(`./cereusdb-extension-C1tQ1wM5-DqWD33KP.js`),__vite__mapDeps([11,1,2,3,4,5,12,13,14,15])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var _={name:`@eclipse-docks/extension-command-palette`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},v=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BAIyaWGM-D2P9rm5w.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4m_srIpA-CngAN12b.js`),[])}),!0);m.registerExtension({id:_.name,name:v.EXT_COMMANDPALETTE_NAME,description:v.EXT_COMMANDPALETTE_DESC,loader:()=>h(()=>import(`./command-palette-extension-B1qH6ER4-BkUg6CzO.js`),__vite__mapDeps([16,1,2,3,4,5,10])),icon:`terminal`}),m.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.7.124`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./table":{types:`./dist/docks-data-table.d.ts`,import:`./dist/table.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`}}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>h(()=>import(`./dataviewer-extension-DhE3y4Rw-CC6bAXzp.js`),__vite__mapDeps([17,1,2,3,4,5,10])),icon:`table`});var y={name:`@eclipse-docks/extension-duckdb`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`1.33.1-dev20.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},b=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-DcvaIwdb-Di0w9YnX.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-CEVgAB1e-BrW23xgS.js`),[])}),!0);m.registerExtension({id:y.name,name:b.EXT_DUCKDB_NAME,description:b.EXT_DUCKDB_DESC,loader:()=>h(()=>import(`./duckdb-extension-CkopoMAb-CrMH5-0x.js`),__vite__mapDeps([18,1,2,3,4,5,19,12,13,14])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var x={name:`@eclipse-docks/extension-github-service`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},S=`https://api.github.com`;function C(){let e=a.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function ae(e=100){try{let t=C(),n=await fetch(`${S}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var w=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-GSWgOjeX-ByGks5sz.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-Bhvk9DkV-B__Ru8EQ.js`),[])}),!0);m.registerExtension({id:x.name,name:w.EXT_GITHUB_SERVICE_NAME,description:w.EXT_GITHUB_SERVICE_DESC,loader:()=>h(()=>import(`./github-service-extension-6avU7OHf-DyzzQrjV.js`),__vite__mapDeps([20,1,2,3,4,5])),icon:`code-branch`});var oe={name:`@eclipse-docks/extension-howto-system`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},T=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-5w94fisR-2NXn2uGt.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-LfC8hyxS-DLyAs7PY.js`),[])}),!0);m.registerExtension({id:oe.name,name:T.EXT_HOWTO_NAME,description:T.EXT_HOWTO_DESC,loader:()=>h(()=>import(`./howto-extension-BDDzKdYl-CpUlShYc.js`),__vite__mapDeps([21,1,2,3,4,5,8,22])),icon:`list-check`,experimental:!0});var se={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^3.8.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},E=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CeMAAFVI-Db2_nsgL.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4Ii3SXJ7-Cnb708oq.js`),[])}),!0);m.registerExtension({id:se.name,name:E.EXT_IN_BROWSER_ML_NAME,description:E.EXT_IN_BROWSER_ML_DESC,loader:()=>h(()=>import(`./in-browser-ml-extension-B_JuNITB-BnqcjzTX.js`),__vite__mapDeps([23,1,2,3,4,5,10,24])),icon:`brain`,experimental:!0});var ce={name:`@eclipse-docks/extension-md-editor`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},D=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-B-XSgGEO-DZwve6bc.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-C1spZCa1-BaBJ8-e4.js`),[])}),!0);m.registerExtension({id:ce.name,name:D.EXT_MDEDITOR_NAME,description:D.EXT_MDEDITOR_DESC,loader:()=>h(()=>import(`./md-editor-extension-8oqW93mK-BQ21Q81t.js`),__vite__mapDeps([25,1,2,3,4,5])),icon:`book`});var O={name:`@eclipse-docks/extension-media-viewer`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},k=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BgRO7Rh7-BavjlpKw.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DyeoJm7D-BAtfdJMC.js`),[])}),!0);m.registerExtension({id:O.name,name:k.EXT_MEDIAVIEWER_NAME,description:k.EXT_MEDIAVIEWER_DESC,loader:()=>h(()=>import(`./media-viewer-extension-CpuQxfjF-CHblEOqZ.js`),__vite__mapDeps([26,1,2,3,4,5])),icon:`image`});var A={name:`@eclipse-docks/extension-memory-usage`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},j=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CvKdEf6o-W0Pfowrj.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BMzjKj3o-91XQmKNP.js`),[])}),!0);m.registerExtension({id:A.name,name:j.EXT_MEMORYUSAGE_NAME,description:j.EXT_MEMORYUSAGE_DESC,loader:()=>h(()=>import(`./memory-usage-extension-Yl6iXGvQ-B9J7ymF5.js`),__vite__mapDeps([27,1,2,3,4,5])),icon:`microchip`});var M={name:`@eclipse-docks/extension-monaco-editor`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.55.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},N=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-TtWptOTJ-9wTVSdFm.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DY_jLw5Z-Qckmcvxe.js`),[])}),!0);m.registerExtension({id:M.name,name:N.EXT_MONACO_NAME,description:N.EXT_MONACO_DESC,loader:()=>h(()=>import(`./monaco-editor-extension-BAeimqAZ-VrPEfmyd.js`),__vite__mapDeps([28,1,2,3,4,5,29,30,31])),icon:`file-pen`}),m.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>h(()=>import(`./pglite-extension-Dn6v97Xh-C7xZfZlQ.js`),__vite__mapDeps([32,1,2,3,4,5,12,13,14])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var P={name:`@eclipse-docks/extension-plain-editor`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widgets":{types:`./dist/widgets.d.ts`,import:`./dist/widgets.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},F=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-Ddrm6naw-BRvRguqQ.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-Og49LNLR-CUx_tSl9.js`),[])}),!0);m.registerExtension({id:P.name,name:F.EXT_PLAIN_NAME,description:F.EXT_PLAIN_DESC,loader:()=>h(()=>import(`./plain-editor-extension-RRv6pSQe-CAjqrl8p.js`),__vite__mapDeps([33,1,2,3,4,5])),icon:`file-lines`});var I={name:`@eclipse-docks/extension-python-runtime`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-terminal":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},L=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CHoexpTu-BNqDqsZZ.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BSbqitYs-BR_anuQA.js`),[])}),!0);m.registerExtension({id:I.name,name:L.EXT_PYTHONRUNTIME_NAME,description:L.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([h(()=>import(`./python-runtime-extension-u9NoE4Xj-r9o7EJCB.js`),__vite__mapDeps([34,1,2,3,4,5,10,13,14,35,36,37,38])),h(()=>import(`./commands-Cn6_ogss-CMauXmQx.js`),__vite__mapDeps([39,1,2,3,4,5,37]))]),icon:`docks python`,dependencies:[`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-monaco-editor`]});var R={name:`@eclipse-docks/extension-rag-system`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},z=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-C4Oy9SoE-B2f6Qe4e.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BGbyrXax-BvMlqx_k.js`),[])}),!0);m.registerExtension({id:R.name,name:z.EXT_RAG_SYSTEM_NAME,description:z.EXT_RAG_SYSTEM_DESC,loader:()=>h(()=>import(`./rag-system-extension-tTT5Pglo-Cj4QsDVT.js`),__vite__mapDeps([40,1,2,3,4,5,41,8,22,24])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var B={name:`@eclipse-docks/extension-settings-tree`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},V=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BNVmjm3M-CjxlUG9F.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4qIo7_K0-W-M34TJd.js`),[])}),!0);m.registerExtension({id:B.name,name:V.EXT_SETTINGS_TREE_NAME,description:V.EXT_SETTINGS_TREE_DESC,loader:()=>h(()=>import(`./settings-tree-extension-BCSbBt-O-BMQRqCb2.js`),__vite__mapDeps([42,1,2,3,4,5])),icon:`sitemap`});var H={name:`@eclipse-docks/extension-terminal`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@xterm/addon-fit":`^0.10.0`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},U=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BVmQFS_U-DaulB6-K.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BzXd1VkS-BpN-0A47.js`),[])}),!0);m.registerExtension({id:H.name,name:U.EXT_TERMINAL_NAME,description:U.EXT_TERMINAL_DESC,loader:()=>h(()=>import(`./terminal-extension-BUc6e5ce-BfFWFAcZ.js`),__vite__mapDeps([43,1,2,3,4,5,10,38])),icon:`terminal`});var W={name:`@eclipse-docks/extension-utils`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{"fake-indexeddb":`^6.2.5`,jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.0.18`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},G=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-DpWotOVv-B8U-xtjz.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4j7sK8PT-B6N22kRC.js`),[])}),!0);m.registerExtension({id:W.name,name:G.EXT_UTILS_NAME,description:G.EXT_UTILS_DESC,loader:()=>h(()=>import(`./commands-CvhhmqU3-fiKcZ_Kk.js`),__vite__mapDeps([44,1,2,3,4,5,45,36,37])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var le={name:`@eclipse-docks/extension-webdav`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},K=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BGXJczCl-Cp8T_5wY.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-D2QUvBv9-AULLJAL-.js`),[])}),!0);m.registerExtension({id:le.name,name:K.EXT_WEBDAV_NAME,description:K.EXT_WEBDAV_DESC,loader:()=>h(()=>import(`./webdav-extension-BnWGwdSi-BXW6_thj.js`),__vite__mapDeps([46,1,2,3,4,5])),icon:`cloud`,experimental:!0});var ue={name:`@eclipse-docks/extension-webllm`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},q=await f(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CQxA5kmG-B3ALF-Xs.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BIC1ZmXn-BhhPBRUC.js`),[])}),!0);m.registerExtension({id:ue.name,name:q.EXT_WEBLLM_NAME,description:q.EXT_WEBLLM_DESC,loader:()=>h(()=>import(`./webllmservice-Bdz7vrud-DqSEqNL4.js`),__vite__mapDeps([47,1,2,3,4,5,8,22,48])),icon:`robot`,experimental:!0}),m.registerExtension({id:{name:`@eclipse-docks/extension-webmcp`,version:`0.7.124`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:()=>h(()=>import(`./webmcp-extension-C9QPV2tP-CS47x25N.js`),__vite__mapDeps([49,1,2,3,4,5,8,22])),icon:`plug`,dependencies:[`@eclipse-docks/extension-ai-system`],experimental:!0});var de=`<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>`;function fe(){e(`Eclipse legal`,de,!0)}r.registerContribution(d,{label:`Eclipse legal`,slot:`end`,component:()=>u`
      <wa-button
        appearance="plain"
        variant="brand"
        size="s"
        title="Eclipse Foundation legal information"
        @click=${fe}
      >
        Eclipse legal
      </wa-button>
    `});var pe=3,me=5,J=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends c{static{this.styles=i`
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
    `}render(){return u`
            <div class="overview">
                <wa-card>
                    <div slot="header" class="card-header">
                        <wa-icon name="list-check"></wa-icon>
                        Tasks
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">${me}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${pe}</span>
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
                        ${J.map(e=>u`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=n([o(`docks-dashboard-welcome`)],Y);var he=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends c{constructor(...e){super(...e),this.tasks=[...he]}static{this.styles=i`
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
    `}toggleTask(e){this.tasks=this.tasks.map(t=>t.id===e?{...t,done:!t.done}:t)}render(){return u`
            <ul class="taslist">
                ${this.tasks.map(e=>u`
                        <li class="tasitem ${e.done?`done`:``}">
                            <wa-checkbox
                                ?checked=${e.done}
                                @change=${()=>this.toggleTask(e.id)}
                                aria-label="${e.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${e.title}</span>
                            ${e.due?u`<span class="tasdue">${e.due}</span>`:``}
                        </li>
                    `)}
            </ul>
        `}};n([ee()],X.prototype,`tasks`,void 0),X=n([o(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends c{static{this.styles=i`
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
    `}render(){let e=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`];return u`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${e.map(e=>u`<span class="day-col">${e}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${e.map(e=>u`
                            <div class="day-cell">
                                ${Z.filter(t=>t.day===e).map(e=>u`
                                        <div class="meeting-card">
                                            <div class="title">${e.title}</div>
                                            <div class="time">${e.start} – ${e.end}</div>
                                            <div class="time">${e.location}</div>
                                        </div>
                                    `)}
                            </div>
                        `)}
                </div>
                <h3 style="margin-top: var(--wa-space-xl); margin-bottom: var(--wa-space-m);">This week</h3>
                <ul class="meeting-list">
                    ${Z.map(e=>u`
                            <li>
                                <span class="title">${e.title}</span>
                                <div class="meta">${e.day} ${e.start} – ${e.end} · ${e.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};Q=n([o(`docks-dashboard-meetings`)],Q),r.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>u`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends te{renderContent(){return u`<slot></slot>`}};$=n([o(`docks-view-wrapper`)],$);var ge=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),_e=[[`dashboard-home`,`Overview`,`house`,()=>u`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>u`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>u`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,n,i,a]of _e)r.registerContribution(ne,ge(e,t,n,i,a)),r.registerContribution(`dashboard-views`,{label:t,icon:n,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});r.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),r.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`docks settings`,command:`open_settings`}),r.registerContribution(s,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>u`<style>
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
        <docks-toolbar id="dashboard-toolbar-top"></docks-toolbar>
        <docks-toolbar id="dashboard-toolbar-top-center"></docks-toolbar>
        <docks-toolbar id=${p}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="l" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${re}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{t.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),r.registerContribution(l,{label:`Eclipse Docks`,slot:`start`,component:()=>u`
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
        alt="Eclipse Docks"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `});var ve=document.getElementById(`app-root`)??document.body;a.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,layoutId:`standard-full`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:ae,extensions:[`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-notebook`,`@eclipse-docks/extension-python-runtime`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-plain-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`,`@eclipse-docks/extension-webmcp`]},{autoStart:!0,hostConfig:!0,container:ve});