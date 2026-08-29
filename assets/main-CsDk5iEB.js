const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-extension-VQuZNJbI-B0SXLmXs.js","assets/install-prompt-capture-CRH1BlxV-CKjbxl_q.js","assets/dist-DYBGRcnv.js","assets/rolldown-runtime-Dd_uD5pT.js","assets/fs-access-Cjcg0_Me-BYL2BwWI.js","assets/preload-helper-Czpn1I53.js","assets/dist-CxYUgF8U.css","assets/ai-system-extension-CxXghssk-9dMPmR7I.js","assets/ai-service-Cmafte5S-yrYkX8Fn.js","assets/loader-_1Qa4ft0.js","assets/lit-DdC8-2DS.js","assets/cereusdb-extension-unvXp_Oi-DBqRofor.js","assets/notebook-metadata-0H6O-S7p-hSMBhMdC.js","assets/dist-DzNar9Bu.js","assets/dist-zYIKGhwZ.js","assets/api-BjN-r1AS.js","assets/command-palette-extension-B5XF1D9L-BpG0kYjO.js","assets/dataviewer-extension-DcMrvTZy-BPiYTiY7.js","assets/duckdb-extension-jR5Rc6cP-DxNCTin7.js","assets/tslib.es6-Cukun91A.js","assets/github-service-extension-EyuYW1mK-dUcRUdCW.js","assets/howto-extension-BBND3mmj-BMaM_YTp.js","assets/api-DFxUyO4s.js","assets/in-browser-ml-extension-B3Odq1py-DDi_1G9T.js","assets/in-browser-ml-service-C1vdFP6M-CksIbXbI.js","assets/md-editor-extension-Cnpou48B-CzLrcWqm.js","assets/media-viewer-extension-DGwr_Jqs-Ba1JpDtW.js","assets/memory-usage-extension-Cgc9YTpR-DUg3DMvY.js","assets/monaco-editor-extension-CVlRTKeW-CDSDQpHm.js","assets/editor.api2-BZ1qaMAz-CAhwSWWI.js","assets/workers-CvauEILg-zK_00bxP.js","assets/monaco.contribution-faB-d0OZ-C_MLQrJF.js","assets/pglite-extension-BfD6-TQp-DFraKNq3.js","assets/plain-editor-extension-CMisvwJH-CFJ_JTRE.js","assets/python-runtime-extension-CtuvYHGh-ZWgqB1YE.js","assets/pyservice-0zxWD96J-CxgmKrJN.js","assets/package-manager-r7SHhPMa-Db8xyXJV.js","assets/editor-python-run-CVvqB_8X-DalTCeOv.js","assets/js-terminal-backend-C0HXZ2jf-YMZAsG_V.js","assets/commands-DGgiRbdx-DzkoISqk.js","assets/rag-system-extension-BW-FSxET-kOm196O8.js","assets/rag-service-BXPQTm_G-DcM2D9El.js","assets/settings-tree-extension-BdMFQxaf-Bhfza1xU.js","assets/terminal-extension-BR9T7h0X-DEO7BVzW.js","assets/commands-B5QrGERn-C1zx4t-i.js","assets/api-Ci-gf0BJ-DZm4yTfp.js","assets/webdav-extension-rnNsYJqQ-VKUPOqM6.js","assets/webllmservice-lr842hZg-DB6_6q_W.js","assets/webmcp-extension-DSJw4qd3-tU-UG9aG.js"])))=>i.map(i=>d[i]);
import"./install-prompt-capture-CRH1BlxV-CKjbxl_q.js";import{D as e,F as t,G as n,W as r,b as i,dt as a,f as ee,g as te,h as ne,mt as o,o as s,p as c,pt as l,r as u,s as re,v as d,vt as f,w as p,yt as m}from"./dist-DYBGRcnv.js";import{t as h}from"./preload-helper-Czpn1I53.js";import"./dist-DzNar9Bu.js";import"./dist-zYIKGhwZ.js";import"./lit-DdC8-2DS.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var g={name:`@eclipse-docks/extension-pwa`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./vite":{types:`./dist/vite-pwa-plugin.d.ts`,import:`./dist/vite-pwa-plugin.js`},"./sw":{import:`./src/sw.ts`}},dependencies:{"@eclipse-docks/core":`*`,"vite-plugin-pwa":`^1.2.0`},devDependencies:{rolldown:`1.0.0-rc.15`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`,`src/sw.ts`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},_=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BJRO1uvt-BEopteU1.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-CPtNgwwB-DndjAb8N.js`),[])}),!0);p.registerExtension({id:g.name,name:_.EXT_PWA_NAME,description:_.EXT_PWA_DESC,loader:()=>h(()=>import(`./pwa-extension-VQuZNJbI-B0SXLmXs.js`),__vite__mapDeps([0,1,2,3,4,5,6])),icon:`download`}),p.registerExtension({id:{name:`@eclipse-docks/extension-ai-system`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`,lit:`^3.0.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`AI System`,description:`AI assistants, chat, and tool execution`,loader:()=>h(()=>import(`./ai-system-extension-CxXghssk-9dMPmR7I.js`),__vite__mapDeps([7,4,2,3,5,6,8])),icon:`robot`}),p.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>h(()=>import(`./loader-_1Qa4ft0.js`),__vite__mapDeps([9,4,2,3,5,6,10])),icon:`book`}),p.registerExtension({id:{name:`@eclipse-docks/extension-cereusdb`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@cereusdb/full":`^0.1.2`,"@cereusdb/global":`^0.1.2`,"@cereusdb/minimal":`^0.1.2`,"@cereusdb/standard":`^0.1.2`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},eclipseDocks:{viteOptimizeDepsExclude:[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`]}}.name,name:`CereusDB`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`,loader:()=>h(()=>import(`./cereusdb-extension-unvXp_Oi-DBqRofor.js`),__vite__mapDeps([11,2,3,4,5,6,12,13,14,15])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var ie={name:`@eclipse-docks/extension-command-palette`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},v=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BJqgwiZN-DC7PTIzN.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DTH48ZpO-D-p4Cp5D.js`),[])}),!0);p.registerExtension({id:ie.name,name:v.EXT_COMMANDPALETTE_NAME,description:v.EXT_COMMANDPALETTE_DESC,loader:()=>h(()=>import(`./command-palette-extension-B5XF1D9L-BpG0kYjO.js`),__vite__mapDeps([16,4,2,3,5,6,10])),icon:`terminal`}),p.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.7.133`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./table":{types:`./dist/docks-data-table.d.ts`,import:`./dist/table.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`}}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>h(()=>import(`./dataviewer-extension-DcMrvTZy-BPiYTiY7.js`),__vite__mapDeps([17,3,4,2,5,6,10])),icon:`table`});var y={name:`@eclipse-docks/extension-duckdb`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`1.33.1-dev20.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},b=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-DuUamDgP-BtiK99I6.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-CuROhwi7-BzeUtJne.js`),[])}),!0);p.registerExtension({id:y.name,name:b.EXT_DUCKDB_NAME,description:b.EXT_DUCKDB_DESC,loader:()=>h(()=>import(`./duckdb-extension-jR5Rc6cP-DxNCTin7.js`),__vite__mapDeps([18,4,2,3,5,6,12,13,19,15])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var x={name:`@eclipse-docks/extension-github-service`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},S=`https://api.github.com`;function C(){let e=i.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function w(e=100){try{let t=C(),n=await fetch(`${S}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var T=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-Blosjvyo-DjjBiGZb.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DoMtyBni-DYu30JZ_.js`),[])}),!0);p.registerExtension({id:x.name,name:T.EXT_GITHUB_SERVICE_NAME,description:T.EXT_GITHUB_SERVICE_DESC,loader:()=>h(()=>import(`./github-service-extension-EyuYW1mK-dUcRUdCW.js`),__vite__mapDeps([20,2,3,4,5,6])),icon:`code-branch`});var E={name:`@eclipse-docks/extension-howto-system`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},D=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-6a7MkAVi-In-qgUr7.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-C6vlH27W-B0htSNfJ.js`),[])}),!0);p.registerExtension({id:E.name,name:D.EXT_HOWTO_NAME,description:D.EXT_HOWTO_DESC,loader:()=>h(()=>import(`./howto-extension-BBND3mmj-BMaM_YTp.js`),__vite__mapDeps([21,4,2,3,5,6,8,22])),icon:`list-check`,experimental:!0});var ae={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^3.8.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},O=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-COphal3B-5_86IHUA.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-ChrbGsAm-BzN3Lioj.js`),[])}),!0);p.registerExtension({id:ae.name,name:O.EXT_IN_BROWSER_ML_NAME,description:O.EXT_IN_BROWSER_ML_DESC,loader:()=>h(()=>import(`./in-browser-ml-extension-B3Odq1py-DDi_1G9T.js`),__vite__mapDeps([23,4,2,3,5,6,10,24])),icon:`brain`,experimental:!0});var oe={name:`@eclipse-docks/extension-md-editor`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},k=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CBUlWfRZ-Z5Qjp0Q_.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BM0RHyIg-CpFmxylo.js`),[])}),!0);p.registerExtension({id:oe.name,name:k.EXT_MDEDITOR_NAME,description:k.EXT_MDEDITOR_DESC,loader:()=>h(()=>import(`./md-editor-extension-Cnpou48B-CzLrcWqm.js`),__vite__mapDeps([25,4,2,3,5,6])),icon:`book`});var se={name:`@eclipse-docks/extension-media-viewer`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},A=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CgHihdaU-BimV_k60.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-55SVlTbu-Nzn1Ohvv.js`),[])}),!0);p.registerExtension({id:se.name,name:A.EXT_MEDIAVIEWER_NAME,description:A.EXT_MEDIAVIEWER_DESC,loader:()=>h(()=>import(`./media-viewer-extension-DGwr_Jqs-Ba1JpDtW.js`),__vite__mapDeps([26,4,2,3,5,6])),icon:`image`});var j={name:`@eclipse-docks/extension-memory-usage`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},M=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-Cawz0h_k-BZ7sKyv7.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DHKJc15g-3GHUBbWp.js`),[])}),!0);p.registerExtension({id:j.name,name:M.EXT_MEMORYUSAGE_NAME,description:M.EXT_MEMORYUSAGE_DESC,loader:()=>h(()=>import(`./memory-usage-extension-Cgc9YTpR-DUg3DMvY.js`),__vite__mapDeps([27,2,3,4,5,6])),icon:`microchip`});var N={name:`@eclipse-docks/extension-monaco-editor`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.55.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},P=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-D33vNqDe-DIkbKPLK.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-O6wqbi6s-5MVmV8G8.js`),[])}),!0);p.registerExtension({id:N.name,name:P.EXT_MONACO_NAME,description:P.EXT_MONACO_DESC,loader:()=>h(()=>import(`./monaco-editor-extension-CVlRTKeW-CDSDQpHm.js`),__vite__mapDeps([28,4,2,3,5,6,29,30,31])),icon:`file-pen`}),p.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>h(()=>import(`./pglite-extension-BfD6-TQp-DFraKNq3.js`),__vite__mapDeps([32,2,3,4,5,6,12,13,15])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var F={name:`@eclipse-docks/extension-plain-editor`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widgets":{types:`./dist/widgets.d.ts`,import:`./dist/widgets.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},I=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CcEUJHGN-aRiAceGJ.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DM0IIbWc-Cn-XejRY.js`),[])}),!0);p.registerExtension({id:F.name,name:I.EXT_PLAIN_NAME,description:I.EXT_PLAIN_DESC,loader:()=>h(()=>import(`./plain-editor-extension-CMisvwJH-CFJ_JTRE.js`),__vite__mapDeps([33,4,2,3,5,6])),icon:`file-lines`});var L={name:`@eclipse-docks/extension-python-runtime`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-terminal":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},R=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BE5yqHjX-DWpKtCRM.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BcKQJbtf-_Wp-_4ph.js`),[])}),!0);p.registerExtension({id:L.name,name:R.EXT_PYTHONRUNTIME_NAME,description:R.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([h(()=>import(`./python-runtime-extension-CtuvYHGh-ZWgqB1YE.js`),__vite__mapDeps([34,4,2,3,5,6,12,13,10,35,36,37,38])),h(()=>import(`./commands-DGgiRbdx-DzkoISqk.js`),__vite__mapDeps([39,2,3,4,5,6,35]))]),icon:`docks python`,dependencies:[`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-monaco-editor`]});var z={name:`@eclipse-docks/extension-rag-system`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},B=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BlIlaOdb-dD9Zfg5D.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-gnDJyJge-CEpSZl7e.js`),[])}),!0);p.registerExtension({id:z.name,name:B.EXT_RAG_SYSTEM_NAME,description:B.EXT_RAG_SYSTEM_DESC,loader:()=>h(()=>import(`./rag-system-extension-BW-FSxET-kOm196O8.js`),__vite__mapDeps([40,4,2,3,5,6,41,8,22,24])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var V={name:`@eclipse-docks/extension-settings-tree`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},H=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-2oUWFl6d-DayW3Txg.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-SG0YCiww-Do8HnAF3.js`),[])}),!0);p.registerExtension({id:V.name,name:H.EXT_SETTINGS_TREE_NAME,description:H.EXT_SETTINGS_TREE_DESC,loader:()=>h(()=>import(`./settings-tree-extension-BdMFQxaf-Bhfza1xU.js`),__vite__mapDeps([42,4,2,3,5,6])),icon:`sitemap`});var U={name:`@eclipse-docks/extension-terminal`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@xterm/addon-fit":`^0.10.0`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},W=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-1gFRm90o-B7uz0CPF.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BpQpiXOC-BxnQ5oIf.js`),[])}),!0);p.registerExtension({id:U.name,name:W.EXT_TERMINAL_NAME,description:W.EXT_TERMINAL_DESC,loader:()=>h(()=>import(`./terminal-extension-BR9T7h0X-DEO7BVzW.js`),__vite__mapDeps([43,3,4,2,5,6,10,38])),icon:`terminal`});var ce={name:`@eclipse-docks/extension-utils`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{"fake-indexeddb":`^6.2.5`,jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.0.18`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},G=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BeTB4qPD-DuB9kF_7.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DV96x3ri-CeC-oHR3.js`),[])}),!0);p.registerExtension({id:ce.name,name:G.EXT_UTILS_NAME,description:G.EXT_UTILS_DESC,loader:()=>h(()=>import(`./commands-B5QrGERn-C1zx4t-i.js`),__vite__mapDeps([44,3,4,2,5,6,35,36,45])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var le={name:`@eclipse-docks/extension-webdav`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},K=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BuxRWhrj-C_2umDbV.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BLnYsp38-TFZwxgT_.js`),[])}),!0);p.registerExtension({id:le.name,name:K.EXT_WEBDAV_NAME,description:K.EXT_WEBDAV_DESC,loader:()=>h(()=>import(`./webdav-extension-rnNsYJqQ-VKUPOqM6.js`),__vite__mapDeps([46,4,2,3,5,6])),icon:`cloud`,experimental:!0});var ue={name:`@eclipse-docks/extension-webllm`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},q=await u(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-1c_lhkQt-ClB76AjH.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-9kAjUGx0-C26KCfRj.js`),[])}),!0);p.registerExtension({id:ue.name,name:q.EXT_WEBLLM_NAME,description:q.EXT_WEBLLM_DESC,loader:()=>h(()=>import(`./webllmservice-lr842hZg-DB6_6q_W.js`),__vite__mapDeps([47,4,2,3,5,6,8,22])),icon:`robot`,experimental:!0}),p.registerExtension({id:{name:`@eclipse-docks/extension-webmcp`,version:`0.7.133`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:()=>h(()=>import(`./webmcp-extension-DSJw4qd3-tU-UG9aG.js`),__vite__mapDeps([48,4,2,3,5,6,8,22])),icon:`plug`,dependencies:[`@eclipse-docks/extension-ai-system`],experimental:!0});var de=`<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>`;function fe(){e(`Eclipse legal`,de,!0)}n.registerContribution(ne,{label:`Eclipse legal`,slot:`end`,component:()=>f`
      <wa-button
        appearance="plain"
        variant="brand"
        size="s"
        title="Eclipse Foundation legal information"
        @click=${fe}
      >
        Eclipse legal
      </wa-button>
    `});var pe=3,me=5,J=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends o{static{this.styles=m`
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
    `}render(){return f`
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
                        ${J.map(e=>f`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=t([l(`docks-dashboard-welcome`)],Y);var he=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends o{constructor(...e){super(...e),this.tasks=[...he]}static{this.styles=m`
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
    `}toggleTask(e){this.tasks=this.tasks.map(t=>t.id===e?{...t,done:!t.done}:t)}render(){return f`
            <ul class="taslist">
                ${this.tasks.map(e=>f`
                        <li class="tasitem ${e.done?`done`:``}">
                            <wa-checkbox
                                ?checked=${e.done}
                                @change=${()=>this.toggleTask(e.id)}
                                aria-label="${e.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${e.title}</span>
                            ${e.due?f`<span class="tasdue">${e.due}</span>`:``}
                        </li>
                    `)}
            </ul>
        `}};t([a()],X.prototype,`tasks`,void 0),X=t([l(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends o{static{this.styles=m`
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
    `}render(){let e=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`];return f`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${e.map(e=>f`<span class="day-col">${e}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${e.map(e=>{let t=Z.filter(t=>t.day===e);return f`
                            <div class="day-cell">
                                ${t.map(e=>f`
                                        <div class="meeting-card">
                                            <div class="title">${e.title}</div>
                                            <div class="time">${e.start} – ${e.end}</div>
                                            <div class="time">${e.location}</div>
                                        </div>
                                    `)}
                            </div>
                        `})}
                </div>
                <h3 style="margin-top: var(--wa-space-xl); margin-bottom: var(--wa-space-m);">This week</h3>
                <ul class="meeting-list">
                    ${Z.map(e=>f`
                            <li>
                                <span class="title">${e.title}</span>
                                <div class="meta">${e.day} ${e.start} – ${e.end} · ${e.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};Q=t([l(`docks-dashboard-meetings`)],Q),n.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>f`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends s{renderContent(){return f`<slot></slot>`}};$=t([l(`docks-view-wrapper`)],$);var ge=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),_e=[[`dashboard-home`,`Overview`,`house`,()=>f`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>f`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>f`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,r,i,a]of _e)n.registerContribution(c,ge(e,t,r,i,a)),n.registerContribution(`dashboard-views`,{label:t,icon:r,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});n.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),n.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`docks settings`,command:`open_settings`}),n.registerContribution(ee,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>f`<style>
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
        <docks-toolbar id=${d}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="l" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${re}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{r.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),n.registerContribution(te,{label:`Eclipse Docks`,slot:`start`,component:()=>f`
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
  `});var ve=document.getElementById(`app-root`)??document.body;i.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:w,extensions:[`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-notebook`,`@eclipse-docks/extension-python-runtime`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-plain-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`,`@eclipse-docks/extension-webmcp`]},{autoStart:!0,hostConfig:!0,container:ve});