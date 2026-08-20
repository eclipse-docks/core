const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-extension-BaUCo7Mu-b1PlajyP.js","assets/dist-BENzkcj9.js","assets/chunk-DseTPa7n.js","assets/preload-helper-ca-nBW7U.js","assets/fs-access-D-fDaJ8V-w6cEwJE-.js","assets/dist-BJy0yqVj.css","assets/install-prompt-capture-fZikSCg3-CQ9Cs5kR.js","assets/ai-system-extension-BP9gLT06-BpE_vaCE.js","assets/ai-service-_8yd8pWc-B7abI1q3.js","assets/loader-YJh232Vs.js","assets/lit-B2R8_rvx.js","assets/cereusdb-extension-C1tQ1wM5-Cj_B6s9S.js","assets/api-BOBMDyvu.js","assets/dist-D5zhwfnB.js","assets/notebook-kernel-api-c9l3_84P-DFy2usuT.js","assets/dist-CZKxIP8q.js","assets/command-palette-extension-am2W7u9d-CqtZlNxD.js","assets/dataviewer-extension-BW9umf3B-C17jI3Nj.js","assets/duckdb-extension-CkopoMAb-Bclr9BCY.js","assets/tslib.es6-C2YTNWJR.js","assets/github-service-extension-6avU7OHf-D81QaCDh.js","assets/howto-extension-BQfgRwmb-yQmKaSM2.js","assets/api-CapVPJdl.js","assets/in-browser-ml-extension-B_JuNITB-Ck5albMo.js","assets/in-browser-ml-service-18Xw5br1-D-700WTm.js","assets/md-editor-extension-8oqW93mK-B4cnVoEm.js","assets/media-viewer-extension-CpuQxfjF-BsBLASGp.js","assets/memory-usage-extension-Yl6iXGvQ-Dz4XED2S.js","assets/monaco-editor-extension-BAeimqAZ-D5fU3fNN.js","assets/editor.api2-CmFNvybj-BDK4B0fX.js","assets/monaco.contribution-CdHWOuG1-BS63wji7.js","assets/workers-CGROc86k-C1jl_dvh.js","assets/pglite-extension-Dn6v97Xh-CvmWRyrK.js","assets/plain-editor-extension-RRv6pSQe-DEbCqFJI.js","assets/python-runtime-extension-BZ3XkDRK-DAzcQF7g.js","assets/editor-python-run-Cs68X5JL-DY9Iemwf.js","assets/package-manager-DcDiJbD3-biBZZm2w.js","assets/pyservice-DGwNXWO4-UGXthhtG.js","assets/js-terminal-backend-BcQIBeMe-BtwjYUQk.js","assets/commands-D0y3XxCw-DjA33eKc.js","assets/rag-system-extension-BE7Q_0rq-DaEUHDH0.js","assets/rag-service-Cymd0ECr-BQZz_EGq.js","assets/settings-tree-extension-DMI1UwEH-DXz6BWg5.js","assets/terminal-extension-U1ZIJJzf-DB83jPOI.js","assets/commands-CvhhmqU3-BuPtJHsg.js","assets/api-C6Mnm5y_-ChIuAvPQ.js","assets/webdav-extension-BnWGwdSi-DPlJVi8m.js","assets/webllmservice-Bdz7vrud-DoL7j7TK.js","assets/__vite-browser-external-Cg7rivQW.js","assets/webmcp-extension-vZl42m8K-Bkljee65.js"])))=>i.map(i=>d[i]);
import"./install-prompt-capture-fZikSCg3-CQ9Cs5kR.js";import{B as e,D as t,J as n,N as r,R as i,_t as a,b as o,f as s,ft as c,g as l,gt as u,h as ee,o as te,p as d,q as f,r as p,s as ne,v as m,w as h}from"./dist-BENzkcj9.js";import{t as g}from"./preload-helper-ca-nBW7U.js";import"./dist-D5zhwfnB.js";import"./dist-CZKxIP8q.js";import"./lit-B2R8_rvx.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var re={name:`@eclipse-docks/extension-pwa`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./vite":{types:`./dist/vite-pwa-plugin.d.ts`,import:`./dist/vite-pwa-plugin.js`},"./sw":{import:`./src/sw.ts`}},dependencies:{"@eclipse-docks/core":`*`,"vite-plugin-pwa":`^1.2.0`},devDependencies:{rolldown:`1.0.0-rc.15`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`,`src/sw.ts`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},_=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CorheGJa-D0Uk5Evp.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BjSrybGY-FTNz_6BJ.js`),[])}),!0);h.registerExtension({id:re.name,name:_.EXT_PWA_NAME,description:_.EXT_PWA_DESC,loader:()=>g(()=>import(`./pwa-extension-BaUCo7Mu-b1PlajyP.js`),__vite__mapDeps([0,1,2,3,4,5,6])),icon:`download`}),h.registerExtension({id:{name:`@eclipse-docks/extension-ai-system`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`,lit:`^3.0.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`AI System`,description:`AI assistants, chat, and tool execution`,loader:()=>g(()=>import(`./ai-system-extension-BP9gLT06-BpE_vaCE.js`),__vite__mapDeps([7,1,2,3,4,5,8])),icon:`robot`}),h.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>g(()=>import(`./loader-YJh232Vs.js`),__vite__mapDeps([9,1,2,3,4,5,10])),icon:`book`}),h.registerExtension({id:{name:`@eclipse-docks/extension-cereusdb`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@cereusdb/full":`^0.1.2`,"@cereusdb/global":`^0.1.2`,"@cereusdb/minimal":`^0.1.2`,"@cereusdb/standard":`^0.1.2`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},eclipseDocks:{viteOptimizeDepsExclude:[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`]}}.name,name:`CereusDB`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`,loader:()=>g(()=>import(`./cereusdb-extension-C1tQ1wM5-Cj_B6s9S.js`),__vite__mapDeps([11,1,2,3,4,5,12,13,14,15])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var v={name:`@eclipse-docks/extension-command-palette`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},y=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BAIyaWGM-Dp4irGwk.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-4m_srIpA-BbSktQih.js`),[])}),!0);h.registerExtension({id:v.name,name:y.EXT_COMMANDPALETTE_NAME,description:y.EXT_COMMANDPALETTE_DESC,loader:()=>g(()=>import(`./command-palette-extension-am2W7u9d-CqtZlNxD.js`),__vite__mapDeps([16,1,2,3,4,5,10])),icon:`terminal`}),h.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.7.118`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./table":{types:`./dist/docks-data-table.d.ts`,import:`./dist/table.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`}}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>g(()=>import(`./dataviewer-extension-BW9umf3B-C17jI3Nj.js`),__vite__mapDeps([17,1,2,3,4,5,10])),icon:`table`});var b={name:`@eclipse-docks/extension-duckdb`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`1.33.1-dev20.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},x=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-DcvaIwdb-D8wVe_bG.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-CEVgAB1e-CorifD7K.js`),[])}),!0);h.registerExtension({id:b.name,name:x.EXT_DUCKDB_NAME,description:x.EXT_DUCKDB_DESC,loader:()=>g(()=>import(`./duckdb-extension-CkopoMAb-Bclr9BCY.js`),__vite__mapDeps([18,1,2,3,4,5,19,12,13,14])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var S={name:`@eclipse-docks/extension-github-service`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},C=`https://api.github.com`;function w(){let e=o.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function ie(e=100){try{let t=w(),n=await fetch(`${C}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var T=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-GSWgOjeX-Cb46j6xD.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-Bhvk9DkV-BFXlPXda.js`),[])}),!0);h.registerExtension({id:S.name,name:T.EXT_GITHUB_SERVICE_NAME,description:T.EXT_GITHUB_SERVICE_DESC,loader:()=>g(()=>import(`./github-service-extension-6avU7OHf-D81QaCDh.js`),__vite__mapDeps([20,1,2,3,4,5])),icon:`code-branch`});var ae={name:`@eclipse-docks/extension-howto-system`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},E=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-5w94fisR-BajNWXKv.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-LfC8hyxS-q1c1HZYK.js`),[])}),!0);h.registerExtension({id:ae.name,name:E.EXT_HOWTO_NAME,description:E.EXT_HOWTO_DESC,loader:()=>g(()=>import(`./howto-extension-BQfgRwmb-yQmKaSM2.js`),__vite__mapDeps([21,1,2,3,4,5,8,22])),icon:`list-check`,experimental:!0});var oe={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^3.8.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},D=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CeMAAFVI-BxdMLc4S.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-4Ii3SXJ7-DbRGE-mK.js`),[])}),!0);h.registerExtension({id:oe.name,name:D.EXT_IN_BROWSER_ML_NAME,description:D.EXT_IN_BROWSER_ML_DESC,loader:()=>g(()=>import(`./in-browser-ml-extension-B_JuNITB-Ck5albMo.js`),__vite__mapDeps([23,1,2,3,4,5,10,24])),icon:`brain`,experimental:!0});var se={name:`@eclipse-docks/extension-md-editor`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},O=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-B-XSgGEO-Cj5rfxjQ.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-C1spZCa1-oJO9UWrr.js`),[])}),!0);h.registerExtension({id:se.name,name:O.EXT_MDEDITOR_NAME,description:O.EXT_MDEDITOR_DESC,loader:()=>g(()=>import(`./md-editor-extension-8oqW93mK-B4cnVoEm.js`),__vite__mapDeps([25,1,2,3,4,5])),icon:`book`});var k={name:`@eclipse-docks/extension-media-viewer`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},A=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BgRO7Rh7-BoMgytNJ.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DyeoJm7D-CPZtuitT.js`),[])}),!0);h.registerExtension({id:k.name,name:A.EXT_MEDIAVIEWER_NAME,description:A.EXT_MEDIAVIEWER_DESC,loader:()=>g(()=>import(`./media-viewer-extension-CpuQxfjF-BsBLASGp.js`),__vite__mapDeps([26,1,2,3,4,5])),icon:`image`});var j={name:`@eclipse-docks/extension-memory-usage`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},M=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CvKdEf6o-CKybYrBG.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BMzjKj3o-CT75s1LN.js`),[])}),!0);h.registerExtension({id:j.name,name:M.EXT_MEMORYUSAGE_NAME,description:M.EXT_MEMORYUSAGE_DESC,loader:()=>g(()=>import(`./memory-usage-extension-Yl6iXGvQ-Dz4XED2S.js`),__vite__mapDeps([27,1,2,3,4,5])),icon:`microchip`});var N={name:`@eclipse-docks/extension-monaco-editor`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.55.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},P=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-TtWptOTJ-DaQac9IN.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DY_jLw5Z-DjsexpCy.js`),[])}),!0);h.registerExtension({id:N.name,name:P.EXT_MONACO_NAME,description:P.EXT_MONACO_DESC,loader:()=>g(()=>import(`./monaco-editor-extension-BAeimqAZ-D5fU3fNN.js`),__vite__mapDeps([28,1,2,3,4,5,29,30,31])),icon:`file-pen`}),h.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>g(()=>import(`./pglite-extension-Dn6v97Xh-CvmWRyrK.js`),__vite__mapDeps([32,1,2,3,4,5,12,13,14])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var F={name:`@eclipse-docks/extension-plain-editor`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widgets":{types:`./dist/widgets.d.ts`,import:`./dist/widgets.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},I=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-Ddrm6naw-CXjKLrPZ.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-Og49LNLR-CqzjMcqv.js`),[])}),!0);h.registerExtension({id:F.name,name:I.EXT_PLAIN_NAME,description:I.EXT_PLAIN_DESC,loader:()=>g(()=>import(`./plain-editor-extension-RRv6pSQe-DEbCqFJI.js`),__vite__mapDeps([33,1,2,3,4,5])),icon:`file-lines`});var L={name:`@eclipse-docks/extension-python-runtime`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-terminal":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},R=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CHoexpTu-BX9QiyZl.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BSbqitYs-CRe-YrBd.js`),[])}),!0);h.registerExtension({id:L.name,name:R.EXT_PYTHONRUNTIME_NAME,description:R.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([g(()=>import(`./python-runtime-extension-BZ3XkDRK-DAzcQF7g.js`),__vite__mapDeps([34,1,2,3,4,5,10,13,14,35,36,37,38])),g(()=>import(`./commands-D0y3XxCw-DjA33eKc.js`),__vite__mapDeps([39,1,2,3,4,5,37]))]),icon:`docks python`,dependencies:[`@eclipse-docks/extension-terminal`]});var z={name:`@eclipse-docks/extension-rag-system`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},B=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-C4Oy9SoE-CR_INrtX.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BGbyrXax-wtRwi1D6.js`),[])}),!0);h.registerExtension({id:z.name,name:B.EXT_RAG_SYSTEM_NAME,description:B.EXT_RAG_SYSTEM_DESC,loader:()=>g(()=>import(`./rag-system-extension-BE7Q_0rq-DaEUHDH0.js`),__vite__mapDeps([40,1,2,3,4,5,41,8,22,24])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var V={name:`@eclipse-docks/extension-settings-tree`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},H=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BNVmjm3M-DOmHRoir.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-4qIo7_K0-CRhYFilq.js`),[])}),!0);h.registerExtension({id:V.name,name:H.EXT_SETTINGS_TREE_NAME,description:H.EXT_SETTINGS_TREE_DESC,loader:()=>g(()=>import(`./settings-tree-extension-DMI1UwEH-DXz6BWg5.js`),__vite__mapDeps([42,1,2,3,4,5])),icon:`sitemap`});var U={name:`@eclipse-docks/extension-terminal`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@xterm/addon-fit":`^0.10.0`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},W=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BVmQFS_U-Dv35oCF0.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BzXd1VkS-DKDwoemt.js`),[])}),!0);h.registerExtension({id:U.name,name:W.EXT_TERMINAL_NAME,description:W.EXT_TERMINAL_DESC,loader:()=>g(()=>import(`./terminal-extension-U1ZIJJzf-DB83jPOI.js`),__vite__mapDeps([43,1,2,3,4,5,10,38])),icon:`terminal`});var G={name:`@eclipse-docks/extension-utils`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{"fake-indexeddb":`^6.2.5`,jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.0.18`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},K=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-DpWotOVv-DKzw0POj.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-4j7sK8PT-DMq9x23b.js`),[])}),!0);h.registerExtension({id:G.name,name:K.EXT_UTILS_NAME,description:K.EXT_UTILS_DESC,loader:()=>g(()=>import(`./commands-CvhhmqU3-BuPtJHsg.js`),__vite__mapDeps([44,1,2,3,4,5,45,36,37])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var ce={name:`@eclipse-docks/extension-webdav`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},q=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BGXJczCl-BQ-HFWV8.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-D2QUvBv9-BtyYtBvW.js`),[])}),!0);h.registerExtension({id:ce.name,name:q.EXT_WEBDAV_NAME,description:q.EXT_WEBDAV_DESC,loader:()=>g(()=>import(`./webdav-extension-BnWGwdSi-DPlJVi8m.js`),__vite__mapDeps([46,1,2,3,4,5])),icon:`cloud`,experimental:!0});var le={name:`@eclipse-docks/extension-webllm`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},J=await p(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CQxA5kmG-CvM3tbuB.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BIC1ZmXn-CcFNtFtQ.js`),[])}),!0);h.registerExtension({id:le.name,name:J.EXT_WEBLLM_NAME,description:J.EXT_WEBLLM_DESC,loader:()=>g(()=>import(`./webllmservice-Bdz7vrud-DoL7j7TK.js`),__vite__mapDeps([47,1,2,3,4,5,8,22,48])),icon:`robot`,experimental:!0});var ue={name:`@eclipse-docks/extension-webmcp`,version:`0.7.118`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}};function de(){return typeof navigator<`u`&&`modelContext`in navigator&&navigator.modelContext!=null}h.registerExtension({id:ue.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:async()=>{if(!de())throw Error(`WebMCP extension requires navigator.modelContext (Web Model Context API).`);return g(()=>import(`./webmcp-extension-vZl42m8K-Bkljee65.js`),__vite__mapDeps([49,1,2,3,4,5,8,22]))},icon:`plug`,dependencies:[`@eclipse-docks/extension-ai-system`],experimental:!0});var fe=`<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>`;function pe(){t(`Eclipse legal`,fe,!0)}n.registerContribution(ee,{label:`Eclipse legal`,slot:`end`,component:()=>u`
      <wa-button
        appearance="plain"
        variant="brand"
        size="small"
        title="Eclipse Foundation legal information"
        @click=${pe}
      >
        Eclipse legal
      </wa-button>
    `});var me=3,he=5,ge=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends c{static{this.styles=a`
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
                            <span class="stat-value">${he}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${me}</span>
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
                        ${ge.map(e=>u`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=r([e(`docks-dashboard-welcome`)],Y);var _e=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends c{constructor(...e){super(...e),this.tasks=[..._e]}static{this.styles=a`
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
        `}};r([i()],X.prototype,`tasks`,void 0),X=r([e(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends c{static{this.styles=a`
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
        `}};Q=r([e(`docks-dashboard-meetings`)],Q),n.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>u`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends te{renderContent(){return u`<slot></slot>`}};$=r([e(`docks-view-wrapper`)],$);var ve=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),ye=[[`dashboard-home`,`Overview`,`house`,()=>u`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>u`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>u`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,r,i,a]of ye)n.registerContribution(d,ve(e,t,r,i,a)),n.registerContribution(`dashboard-views`,{label:t,icon:r,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});n.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),n.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`docks settings`,command:`open_settings`}),n.registerContribution(s,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>u`<style>
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
        <docks-toolbar id=${m}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="large" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${ne}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{f.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),n.registerContribution(l,{label:`Eclipse Docks`,slot:`start`,component:()=>u`
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
  `});var be=document.getElementById(`app-root`)??document.body;o.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,layoutId:`standard-full`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:ie,extensions:[`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-python-runtime`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-plain-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`]},{autoStart:!0,hostConfig:!0,container:be});