const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-extension-B0y8RpX6-Dw1O924q.js","assets/install-prompt-capture-CRH1BlxV-CKjbxl_q.js","assets/canvas-bridge-core.js-DFQjSuZd.js","assets/rolldown-runtime-Dd_uD5pT.js","assets/canvas-bridge-core-DBq2RCBQ.css","assets/cognitive-extension-BPkYWZnr-BBKSjEWk.js","assets/canvas-bridge-lit.js-BKw8QR55.js","assets/runtime-BJlEES2l-CoclV4pc.js","assets/canvas-bridge-urls.js-CAN-z3sq.js","assets/canvas-bridge-events.js-CEqZGzoT.js","assets/canvas-bridge-parts.js-trmr1mcC.js","assets/canvas-bridge-third-party.js-DqUkkNZP.js","assets/canvas-extension-EsWmSerj.js","assets/api-CjHNxm14.js","assets/widget-CD-x4Pfv.js","assets/monaco-widget-CPYnLHgO-cF5nveAV.js","assets/editor.api-BQsKFXrA-EeZbE_nF.js","assets/toggleHighContrast-B8eG5Gwt-CahQyzqR.js","assets/register-BJVDE20s-BhDv0oaY.js","assets/loader-BK0msdqp.js","assets/cereusdb-extension-9wwGRYzc-iQoiL1-n.js","assets/notebook-metadata-0H6O-S7p-hSMBhMdC.js","assets/dist-B18xwFfX.js","assets/dist-BHxjD3wi.js","assets/api-CWwKoiip.js","assets/command-palette-extension-BbxFxWzP-DJ-ZSoek.js","assets/dataviewer-extension-DcMrvTZy-Dh_OGVwY.js","assets/duckdb-extension-BHI5fFJa-CcTfCoiT.js","assets/tslib.es6-DKyepyKb.js","assets/github-service-extension-EyuYW1mK-CWQTq3tM.js","assets/howto-extension-fQQtPaor-CWcoPCNk.js","assets/in-browser-ml-extension-inS0QtQv-DM5fGYfF.js","assets/in-browser-ml-service-D773AigL-DBmq4uYc.js","assets/md-editor-extension-Cnpou48B-Cwo6vB01.js","assets/media-viewer-extension-DGwr_Jqs-dheJNCKU.js","assets/memory-usage-extension-Cgc9YTpR-Cy-6YK8x.js","assets/monaco-editor-extension-CgqbkH2f-DdwMoInq.js","assets/pglite-extension-DwpdPI49-CLDbvPo4.js","assets/plain-editor-extension-CMisvwJH-dkkkWqKW.js","assets/python-runtime-extension-we0VsotG-4aNHxGTY.js","assets/pyservice-DY5XpzdI-B3vQrylD.js","assets/package-manager-r7SHhPMa-BV0KtFvh.js","assets/editor-python-run-CVvqB_8X-DalTCeOv.js","assets/js-terminal-backend-DV-i_yft-DZ868KR4.js","assets/commands-_s1Kauk4-C6oFasGO.js","assets/rag-system-extension-Cl4De43B-ByCbByi4.js","assets/rag-service-DjDVUi1M-DD926fXp.js","assets/settings-tree-extension-aAidrBGt-J0UB-Wgw.js","assets/terminal-extension-CKb5tCLo-Bo9vBfr6.js","assets/commands-B5QrGERn-DQGfyvbC.js","assets/api-B52sy_xI-CCZtUfDN.js","assets/webdav-extension-D416t8Hw-Bv9_uZWQ.js","assets/webllmservice-Dk9S19ds-DhvYDvnd.js","assets/webmcp-extension-B8sAANqe-Dbsm_EwG.js"])))=>i.map(i=>d[i]);
import"./install-prompt-capture-CRH1BlxV-CKjbxl_q.js";import{Cr as e,F as t,Kt as n,Ot as r,P as i,Sn as a,X as ee,Z as te,bt as o,cr as s,h as c,ht as l,ir as ne,lt as re,mr as u,qt as d,sr as f,st as p,tt as ie,xn as m}from"./canvas-bridge-core.js-DFQjSuZd.js";import"./dist-B18xwFfX.js";import"./dist-BHxjD3wi.js";import"./canvas-bridge-lit.js-BKw8QR55.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var h={name:`@eclipse-docks/extension-pwa`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./vite":{types:`./dist/vite-pwa-plugin.d.ts`,import:`./dist/vite-pwa-plugin.js`},"./sw":{import:`./src/sw.ts`}},dependencies:{"@eclipse-docks/core":`*`,"vite-plugin-pwa":`^1.2.0`},devDependencies:{rolldown:`1.0.0-rc.15`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`,`src/sw.ts`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Service worker update indicator on the main toolbar and install prompt in the center toolbar when the browser supports them.`},g=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BJRO1uvt-BEopteU1.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-CPtNgwwB-DndjAb8N.js`),[])}),!0);o.registerExtension({id:h.name,name:g.EXT_PWA_NAME,description:g.EXT_PWA_DESC,loader:()=>d(()=>import(`./pwa-extension-B0y8RpX6-Dw1O924q.js`),__vite__mapDeps([0,1,2,3,4])),icon:`download`});var ae={name:`@eclipse-docks/extension-ai-system`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@opencode-ai/models":`^0.0.122`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`,"test:watch":`vitest`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`AI assistants, chat, and tool execution`},_=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BrLTiN56-C-vb3m33.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-MkwuLlOD-DquN-uck.js`),[])}),!0);o.registerExtension({id:ae.name,name:_.EXT_COGNITIVE_NAME,description:_.EXT_COGNITIVE_DESC,loader:()=>d(()=>import(`./cognitive-extension-BPkYWZnr-BBKSjEWk.js`),__vite__mapDeps([5,2,3,4,6,7,8,9,10,11])),icon:`robot`});var v={name:`@eclipse-docks/extension-canvas`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./contribution":{types:`./dist/contribution.d.ts`,import:`./dist/contribution.js`}},files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"modern-screenshot":`^4.7.0`},devDependencies:{jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Compile and open workspace canvas.js views, and list canvases registered by extensions`},y=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-zEYcREgF.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-frJHTQsX.js`),[])}),!0);o.registerExtension({id:v.name,name:y.EXT_CANVAS_NAME,description:y.EXT_CANVAS_DESC,loader:()=>d(()=>import(`./canvas-extension-EsWmSerj.js`),__vite__mapDeps([12,2,3,4,6,7,13,8,9,10,11,14,15,16,17,18])),icon:`table-columns`,dependencies:[`@eclipse-docks/extension-monaco-editor`]}),o.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>d(()=>import(`./loader-BK0msdqp.js`),__vite__mapDeps([19,2,3,4,6])),icon:`book`}),o.registerExtension({id:{name:`@eclipse-docks/extension-cereusdb`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@cereusdb/full":`^0.3.0`,"@cereusdb/global":`^0.3.0`,"@cereusdb/minimal":`^0.3.0`,"@cereusdb/standard":`^0.3.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},eclipseDocks:{viteOptimizeDepsExclude:[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`]},license:`EPL-2.0`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`}.name,name:`CereusDB`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`,loader:()=>d(()=>import(`./cereusdb-extension-9wwGRYzc-iQoiL1-n.js`),__vite__mapDeps([20,2,3,4,21,22,23,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var b={name:`@eclipse-docks/extension-command-palette`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`VS Code-style command palette at the top center for quick command execution (Ctrl+Shift+P)`},x=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BJqgwiZN-DC7PTIzN.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-DTH48ZpO-D-p4Cp5D.js`),[])}),!0);o.registerExtension({id:b.name,name:x.EXT_COMMANDPALETTE_NAME,description:x.EXT_COMMANDPALETTE_DESC,loader:()=>d(()=>import(`./command-palette-extension-BbxFxWzP-DJ-ZSoek.js`),__vite__mapDeps([25,2,3,4,6])),icon:`terminal`}),o.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.8.8`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./table":{types:`./dist/docks-data-table.d.ts`,import:`./dist/table.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},license:`EPL-2.0`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>d(()=>import(`./dataviewer-extension-DcMrvTZy-Dh_OGVwY.js`),__vite__mapDeps([26,3,2,4,6,11])),icon:`table`});var S={name:`@eclipse-docks/extension-duckdb`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`^1.33.1-dev65.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser SQL engine (DuckDB-WASM) for advanced queries, analytics, and Parquet/CSV/JSON.`},C=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-DuUamDgP-BtiK99I6.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-CuROhwi7-BzeUtJne.js`),[])}),!0);o.registerExtension({id:S.name,name:C.EXT_DUCKDB_NAME,description:C.EXT_DUCKDB_DESC,loader:()=>d(()=>import(`./duckdb-extension-BHI5fFJa-CcTfCoiT.js`),__vite__mapDeps([27,2,3,4,21,22,28,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var w={name:`@eclipse-docks/extension-github-service`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`GitHub API integration for releases and repository information`},T=`https://api.github.com`;function oe(){let e=l.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function se(e=100){try{let t=oe(),n=await fetch(`${T}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var E=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-Blosjvyo-DjjBiGZb.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-DoMtyBni-DYu30JZ_.js`),[])}),!0);o.registerExtension({id:w.name,name:E.EXT_GITHUB_SERVICE_NAME,description:E.EXT_GITHUB_SERVICE_DESC,loader:()=>d(()=>import(`./github-service-extension-EyuYW1mK-CWQTq3tM.js`),__vite__mapDeps([29,2,3,4])),icon:`code-branch`});var ce={name:`@eclipse-docks/extension-howto-system`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Step-by-step workflow system with pre and post condition checks`},D=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-6a7MkAVi-In-qgUr7.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-C6vlH27W-B0htSNfJ.js`),[])}),!0);o.registerExtension({id:ce.name,name:D.EXT_HOWTO_NAME,description:D.EXT_HOWTO_DESC,loader:()=>d(()=>import(`./howto-extension-fQQtPaor-CWcoPCNk.js`),__vite__mapDeps([30,2,3,4,7,13])),icon:`list-check`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`]});var le={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^4.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser machine learning service using transformers.js for specialized tasks (zero-shot classification, embeddings, etc.)`},O=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-COphal3B-5_86IHUA.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-ChrbGsAm-BzN3Lioj.js`),[])}),!0);o.registerExtension({id:le.name,name:O.EXT_IN_BROWSER_ML_NAME,description:O.EXT_IN_BROWSER_ML_DESC,loader:()=>d(()=>import(`./in-browser-ml-extension-inS0QtQv-DM5fGYfF.js`),__vite__mapDeps([31,2,3,4,6,32])),icon:`brain`,experimental:!0});var ue={name:`@eclipse-docks/extension-md-editor`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`View and render Markdown (.md) files`},k=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-CBUlWfRZ-Z5Qjp0Q_.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-BM0RHyIg-CpFmxylo.js`),[])}),!0);o.registerExtension({id:ue.name,name:k.EXT_MDEDITOR_NAME,description:k.EXT_MDEDITOR_DESC,loader:()=>d(()=>import(`./md-editor-extension-Cnpou48B-Cwo6vB01.js`),__vite__mapDeps([33,2,3,4])),icon:`book`});var A={name:`@eclipse-docks/extension-media-viewer`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`View PDF, image, and HTML files in the browser`},j=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-CgHihdaU-BimV_k60.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-55SVlTbu-Nzn1Ohvv.js`),[])}),!0);o.registerExtension({id:A.name,name:j.EXT_MEDIAVIEWER_NAME,description:j.EXT_MEDIAVIEWER_DESC,loader:()=>d(()=>import(`./media-viewer-extension-DGwr_Jqs-dheJNCKU.js`),__vite__mapDeps([34,2,3,4])),icon:`image`});var M={name:`@eclipse-docks/extension-memory-usage`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Displays JavaScript heap memory usage in the bottom toolbar`},N=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-Cawz0h_k-BZ7sKyv7.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-DHKJc15g-3GHUBbWp.js`),[])}),!0);o.registerExtension({id:M.name,name:N.EXT_MEMORYUSAGE_NAME,description:N.EXT_MEMORYUSAGE_DESC,loader:()=>d(()=>import(`./memory-usage-extension-Cgc9YTpR-Cy-6YK8x.js`),__vite__mapDeps([35,2,3,4])),icon:`microchip`});var P={name:`@eclipse-docks/extension-monaco-editor`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.57.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Code editor with syntax highlighting, code completion, and Python execution support`},F=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-D33vNqDe-DIkbKPLK.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-O6wqbi6s-5MVmV8G8.js`),[])}),!0);o.registerExtension({id:P.name,name:F.EXT_MONACO_NAME,description:F.EXT_MONACO_DESC,loader:()=>d(()=>import(`./monaco-editor-extension-CgqbkH2f-DdwMoInq.js`),__vite__mapDeps([36,2,3,4])),icon:`file-pen`}),o.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.5.0`,"@electric-sql/pglite-age":`^0.0.9`,"@electric-sql/pglite-pg_hashids":`^0.0.9`,"@electric-sql/pglite-pg_ivm":`^0.0.9`,"@electric-sql/pglite-pg_textsearch":`^0.0.10`,"@electric-sql/pglite-pg_uuidv7":`^0.0.9`,"@electric-sql/pglite-pgmq":`^0.0.6`,"@electric-sql/pglite-pgtap":`^0.0.9`,"@electric-sql/pglite-pgvector":`^0.0.9`,"@electric-sql/pglite-postgis":`^0.2.8`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser PostgreSQL via PGlite`}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>d(()=>import(`./pglite-extension-DwpdPI49-CLDbvPo4.js`),__vite__mapDeps([37,2,3,4,21,22,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var I={name:`@eclipse-docks/extension-plain-editor`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widgets":{types:`./dist/widgets.d.ts`,import:`./dist/widgets.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Default lightweight text and hex editor for workspace files`},L=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-CcEUJHGN-aRiAceGJ.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-DM0IIbWc-Cn-XejRY.js`),[])}),!0);o.registerExtension({id:I.name,name:L.EXT_PLAIN_NAME,description:L.EXT_PLAIN_DESC,loader:()=>d(()=>import(`./plain-editor-extension-CMisvwJH-dkkkWqKW.js`),__vite__mapDeps([38,2,3,4])),icon:`file-lines`});var R={name:`@eclipse-docks/extension-python-runtime`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-terminal":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Pyodide runtime, Python package management, and Run Python Script command`},z=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BE5yqHjX-DWpKtCRM.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-BcKQJbtf-_Wp-_4ph.js`),[])}),!0);o.registerExtension({id:R.name,name:z.EXT_PYTHONRUNTIME_NAME,description:z.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([d(()=>import(`./python-runtime-extension-we0VsotG-4aNHxGTY.js`),__vite__mapDeps([39,2,3,4,21,22,6,40,41,42,43])),d(()=>import(`./commands-_s1Kauk4-C6oFasGO.js`),__vite__mapDeps([44,2,3,4,40]))]),icon:`docks python`,dependencies:[`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-monaco-editor`]});var B={name:`@eclipse-docks/extension-rag-system`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Retrieval-Augmented Generation system for document indexing, search and retrieval`},V=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BlIlaOdb-dD9Zfg5D.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-gnDJyJge-CEpSZl7e.js`),[])}),!0);o.registerExtension({id:B.name,name:V.EXT_RAG_SYSTEM_NAME,description:V.EXT_RAG_SYSTEM_DESC,loader:()=>d(()=>import(`./rag-system-extension-Cl4De43B-ByCbByi4.js`),__vite__mapDeps([45,2,3,4,46,7,13,32])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var H={name:`@eclipse-docks/extension-settings-tree`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Tree-based editor for settings with in-place editing`},U=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-2oUWFl6d-DayW3Txg.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-SG0YCiww-Do8HnAF3.js`),[])}),!0);o.registerExtension({id:H.name,name:U.EXT_SETTINGS_TREE_NAME,description:U.EXT_SETTINGS_TREE_DESC,loader:()=>d(()=>import(`./settings-tree-extension-aAidrBGt-J0UB-Wgw.js`),__vite__mapDeps([47,2,3,4])),icon:`sitemap`});var de={name:`@eclipse-docks/extension-terminal`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@xterm/addon-fit":`^0.10.0`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`VS Code-style terminal panel with pluggable profiles.`},W=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-1gFRm90o-B7uz0CPF.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-BpQpiXOC-BxnQ5oIf.js`),[])}),!0);o.registerExtension({id:de.name,name:W.EXT_TERMINAL_NAME,description:W.EXT_TERMINAL_DESC,loader:()=>d(()=>import(`./terminal-extension-CKb5tCLo-Bo9vBfr6.js`),__vite__mapDeps([48,3,2,4,6,43])),icon:`terminal`});var fe={name:`@eclipse-docks/extension-utils`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{"fake-indexeddb":`^6.2.5`,jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.0.18`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Utility commands such as wget, unzip and certificate tools.`},G=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BeTB4qPD-DuB9kF_7.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-DV96x3ri-CeC-oHR3.js`),[])}),!0);o.registerExtension({id:fe.name,name:G.EXT_UTILS_NAME,description:G.EXT_UTILS_DESC,loader:()=>d(()=>import(`./commands-B5QrGERn-DQGfyvbC.js`),__vite__mapDeps([49,3,2,4,40,41,50])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var pe={name:`@eclipse-docks/extension-webdav`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Connect to WebDAV servers (Nextcloud, ownCloud) as workspace folders for cloud storage integration`},K=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-BuxRWhrj-C_2umDbV.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-BLnYsp38-TFZwxgT_.js`),[])}),!0);o.registerExtension({id:pe.name,name:K.EXT_WEBDAV_NAME,description:K.EXT_WEBDAV_DESC,loader:()=>d(()=>import(`./webdav-extension-D416t8Hw-Bv9_uZWQ.js`),__vite__mapDeps([51,2,3,4])),icon:`cloud`,experimental:!0});var me={name:`@eclipse-docks/extension-webllm`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-Browser LLM inference`},q=await c(Object.assign({"./i18n.de.json":()=>d(()=>import(`./i18n.de-1c_lhkQt-ClB76AjH.js`),[]),"./i18n.en.json":()=>d(()=>import(`./i18n.en-9kAjUGx0-C26KCfRj.js`),[])}),!0);o.registerExtension({id:me.name,name:q.EXT_WEBLLM_NAME,description:q.EXT_WEBLLM_DESC,loader:()=>d(()=>import(`./webllmservice-Dk9S19ds-DhvYDvnd.js`),__vite__mapDeps([52,2,3,4,7,13])),icon:`robot`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`]}),o.registerExtension({id:{name:`@eclipse-docks/extension-webmcp`,version:`0.8.8`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`}.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:()=>d(()=>import(`./webmcp-extension-B8sAANqe-Dbsm_EwG.js`),__vite__mapDeps([53,2,3,4])),icon:`plug`,experimental:!0});var J=`<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>`;function he(){r(`Eclipse legal`,J,!0)}a.registerContribution(ie,{label:`Eclipse legal`,slot:`end`,component:()=>u`
      <wa-button
        appearance="plain"
        variant="brand"
        size="s"
        title="Eclipse Foundation legal information"
        @click=${he}
      >
        Eclipse legal
      </wa-button>
    `});var ge=3,_e=5,ve=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends s{static{this.styles=e`
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
                            <span class="stat-value">${_e}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${ge}</span>
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
                        ${ve.map(e=>u`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=n([f(`docks-dashboard-welcome`)],Y);var ye=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends s{constructor(...e){super(...e),this.tasks=[...ye]}static{this.styles=e`
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
        `}};n([ne()],X.prototype,`tasks`,void 0),X=n([f(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends s{static{this.styles=e`
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
                    ${e.map(e=>{let t=Z.filter(t=>t.day===e);return u`
                            <div class="day-cell">
                                ${t.map(e=>u`
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
                    ${Z.map(e=>u`
                            <li>
                                <span class="title">${e.title}</span>
                                <div class="meta">${e.day} ${e.start} – ${e.end} · ${e.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};Q=n([f(`docks-dashboard-meetings`)],Q),a.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>u`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends i{renderContent(){return u`<slot></slot>`}};$=n([f(`docks-view-wrapper`)],$);var be=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),xe=[[`dashboard-home`,`Overview`,`house`,()=>u`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>u`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>u`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,n,r,i]of xe)a.registerContribution(te,be(e,t,n,r,i)),a.registerContribution(`dashboard-views`,{label:t,icon:n,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});a.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),a.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`docks settings`,command:`open_settings`}),a.registerContribution(ee,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>u`<style>
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
        <docks-toolbar id=${re}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="l" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${t}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{m.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),a.registerContribution(p,{label:`Eclipse Docks`,slot:`start`,component:()=>u`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-s);
        padding: 0 var(--wa-space-s);
      "
    >
      <img
        src="/logo-loading.svg"
        alt="Eclipse Docks"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `});var Se=document.getElementById(`app-root`)??document.body;l.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:se,extensions:[`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-notebook`,`@eclipse-docks/extension-python-runtime`,`@eclipse-docks/extension-canvas`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-plain-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`]},{autoStart:!0,hostConfig:!0,container:Se});