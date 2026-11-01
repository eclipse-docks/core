const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pwa-extension-B0y8RpX6-BEvQ01O3.js","assets/install-prompt-capture-CRH1BlxV-CKjbxl_q.js","assets/canvas-bridge-core.js-CIMrG4cY.js","assets/rolldown-runtime-Dd_uD5pT.js","assets/canvas-bridge-core-DBq2RCBQ.css","assets/cognitive-extension-CG_d39K5-DGz4dEzT.js","assets/canvas-bridge-lit.js-CkZ9trmX.js","assets/runtime-DfNGzEjU-8BM2l-Sl.js","assets/canvas-bridge-urls.js-DLVkaJIT.js","assets/canvas-bridge-events.js-fAN7OEeT.js","assets/canvas-bridge-parts.js-B_1lcmA1.js","assets/canvas-bridge-third-party.js-X_17Byei.js","assets/canvas-extension-Cx91Ws_l.js","assets/workspace-file-Dzt8Oyob.js","assets/widget-YVToZBEk.js","assets/monaco-widget-CPYnLHgO-DJxAhH1X.js","assets/editor.api-BQsKFXrA-BRd36E2w.js","assets/toggleHighContrast-B8eG5Gwt-Df-i2iTV.js","assets/register-BJVDE20s-3F50bwvk.js","assets/loader-CjK1_TKR.js","assets/cereusdb-extension-9wwGRYzc-dYc3MuuL.js","assets/notebook-metadata-0H6O-S7p-hSMBhMdC.js","assets/dist-BXMe5aJJ.js","assets/dist-BXAPmmHJ.js","assets/api-BS5RSC14.js","assets/command-palette-extension-B5XF1D9L-CbK4Qv4b.js","assets/dataviewer-extension-DcMrvTZy-BM35tfQi.js","assets/duckdb-extension-BHI5fFJa-D7JuxQxA.js","assets/tslib.es6-DKyepyKb.js","assets/github-service-extension-EyuYW1mK-BVKozIJ7.js","assets/howto-extension-Bsrg5X4v-Cw8zOD2r.js","assets/api-DswqMvrI.js","assets/in-browser-ml-extension-inS0QtQv-Oj0TOUnK.js","assets/in-browser-ml-service-D773AigL-0dIe17Tx.js","assets/md-editor-extension-Cnpou48B-D_wta5oX.js","assets/media-viewer-extension-DGwr_Jqs-B4IGlKrt.js","assets/memory-usage-extension-Cgc9YTpR-BIySUMHr.js","assets/monaco-editor-extension-CgqbkH2f-rjK0PqRE.js","assets/pglite-extension-DwpdPI49-KbLp_FtV.js","assets/plain-editor-extension-CMisvwJH-RDY1hxX8.js","assets/python-runtime-extension-we0VsotG-e2-ihCsM.js","assets/pyservice-DY5XpzdI-DcrYi98o.js","assets/package-manager-r7SHhPMa-DWS6xCE5.js","assets/editor-python-run-CVvqB_8X-DalTCeOv.js","assets/js-terminal-backend-DV-i_yft-DmR20Eji.js","assets/commands-_s1Kauk4-BH81sPsu.js","assets/rag-system-extension-Cl4De43B-tbLbincn.js","assets/rag-service-DjDVUi1M-BXON1IhH.js","assets/settings-tree-extension-aAidrBGt-T5ZznnIe.js","assets/terminal-extension-CKb5tCLo-C14jV_rm.js","assets/commands-B5QrGERn-CE9-eFhd.js","assets/api-B52sy_xI-B-SUk2_G.js","assets/webdav-extension-rnNsYJqQ-j-G7aNwG.js","assets/webllmservice-Dk9S19ds-C4Qjrryi.js","assets/webmcp-extension-B8sAANqe-CMcghXmm.js"])))=>i.map(i=>d[i]);
import"./install-prompt-capture-CRH1BlxV-CKjbxl_q.js";import{A as e,C as t,D as n,Ht as r,Jt as i,R as a,Rt as ee,Vt as o,at as s,g as te,h as c,l as ne,o as l,ot as u,rn as d,u as f,v as p,x as m,y as h,z as g}from"./canvas-bridge-core.js-CIMrG4cY.js";import"./dist-BXMe5aJJ.js";import"./dist-BXAPmmHJ.js";import"./canvas-bridge-lit.js-CkZ9trmX.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var re={name:`@eclipse-docks/extension-pwa`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./vite":{types:`./dist/vite-pwa-plugin.d.ts`,import:`./dist/vite-pwa-plugin.js`},"./sw":{import:`./src/sw.ts`}},dependencies:{"@eclipse-docks/core":`*`,"vite-plugin-pwa":`^1.2.0`},devDependencies:{rolldown:`1.0.0-rc.15`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`,`src/sw.ts`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Service worker update indicator on the main toolbar and install prompt in the center toolbar when the browser supports them.`},_=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BJRO1uvt-BEopteU1.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-CPtNgwwB-DndjAb8N.js`),[])}),!0);n.registerExtension({id:re.name,name:_.EXT_PWA_NAME,description:_.EXT_PWA_DESC,loader:()=>g(()=>import(`./pwa-extension-B0y8RpX6-BEvQ01O3.js`),__vite__mapDeps([0,1,2,3,4])),icon:`download`});var v={name:`@eclipse-docks/extension-ai-system`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@opencode-ai/models":`^0.0.122`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`,"test:watch":`vitest`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`AI assistants, chat, and tool execution`},y=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BrLTiN56-C-vb3m33.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-MkwuLlOD-DquN-uck.js`),[])}),!0);n.registerExtension({id:v.name,name:y.EXT_COGNITIVE_NAME,description:y.EXT_COGNITIVE_DESC,loader:()=>g(()=>import(`./cognitive-extension-CG_d39K5-DGz4dEzT.js`),__vite__mapDeps([5,2,3,4,6,7,8,9,10,11])),icon:`robot`});var b={name:`@eclipse-docks/extension-canvas`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./contribution":{types:`./dist/contribution.d.ts`,import:`./dist/contribution.js`}},files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-monaco-editor":`*`},devDependencies:{jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Compile and open workspace canvas.js views, and list canvases registered by extensions`},x=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-zEYcREgF.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-frJHTQsX.js`),[])}),!0);n.registerExtension({id:b.name,name:x.EXT_CANVAS_NAME,description:x.EXT_CANVAS_DESC,loader:()=>g(()=>import(`./canvas-extension-Cx91Ws_l.js`),__vite__mapDeps([12,2,3,4,6,8,9,10,11,13,14,15,16,17,18])),icon:`table-columns`,dependencies:[`@eclipse-docks/extension-monaco-editor`]}),n.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>g(()=>import(`./loader-CjK1_TKR.js`),__vite__mapDeps([19,2,3,4,6])),icon:`book`}),n.registerExtension({id:{name:`@eclipse-docks/extension-cereusdb`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@cereusdb/full":`^0.3.0`,"@cereusdb/global":`^0.3.0`,"@cereusdb/minimal":`^0.3.0`,"@cereusdb/standard":`^0.3.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},eclipseDocks:{viteOptimizeDepsExclude:[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`]},license:`EPL-2.0`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`}.name,name:`CereusDB`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`,loader:()=>g(()=>import(`./cereusdb-extension-9wwGRYzc-dYc3MuuL.js`),__vite__mapDeps([20,2,3,4,21,22,23,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var S={name:`@eclipse-docks/extension-command-palette`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`VS Code-style command palette at the top center for quick command execution (Ctrl+Shift+P)`},C=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BJqgwiZN-DC7PTIzN.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DTH48ZpO-D-p4Cp5D.js`),[])}),!0);n.registerExtension({id:S.name,name:C.EXT_COMMANDPALETTE_NAME,description:C.EXT_COMMANDPALETTE_DESC,loader:()=>g(()=>import(`./command-palette-extension-B5XF1D9L-CbK4Qv4b.js`),__vite__mapDeps([25,2,3,4,6])),icon:`terminal`}),n.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.8.0`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./table":{types:`./dist/docks-data-table.d.ts`,import:`./dist/table.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},license:`EPL-2.0`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>g(()=>import(`./dataviewer-extension-DcMrvTZy-BM35tfQi.js`),__vite__mapDeps([26,3,2,4,6,11])),icon:`table`});var w={name:`@eclipse-docks/extension-duckdb`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`^1.33.1-dev65.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser SQL engine (DuckDB-WASM) for advanced queries, analytics, and Parquet/CSV/JSON.`},T=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-DuUamDgP-BtiK99I6.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-CuROhwi7-BzeUtJne.js`),[])}),!0);n.registerExtension({id:w.name,name:T.EXT_DUCKDB_NAME,description:T.EXT_DUCKDB_DESC,loader:()=>g(()=>import(`./duckdb-extension-BHI5fFJa-D7JuxQxA.js`),__vite__mapDeps([27,2,3,4,21,22,28,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var ie={name:`@eclipse-docks/extension-github-service`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`GitHub API integration for releases and repository information`},ae=`https://api.github.com`;function oe(){let e=t.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function se(e=100){try{let t=oe(),n=await fetch(`${ae}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var E=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-Blosjvyo-DjjBiGZb.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DoMtyBni-DYu30JZ_.js`),[])}),!0);n.registerExtension({id:ie.name,name:E.EXT_GITHUB_SERVICE_NAME,description:E.EXT_GITHUB_SERVICE_DESC,loader:()=>g(()=>import(`./github-service-extension-EyuYW1mK-BVKozIJ7.js`),__vite__mapDeps([29,2,3,4])),icon:`code-branch`});var ce={name:`@eclipse-docks/extension-howto-system`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Step-by-step workflow system with pre and post condition checks`},D=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-6a7MkAVi-In-qgUr7.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-C6vlH27W-B0htSNfJ.js`),[])}),!0);n.registerExtension({id:ce.name,name:D.EXT_HOWTO_NAME,description:D.EXT_HOWTO_DESC,loader:()=>g(()=>import(`./howto-extension-Bsrg5X4v-Cw8zOD2r.js`),__vite__mapDeps([30,2,3,4,7,31])),icon:`list-check`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`]});var le={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^4.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser machine learning service using transformers.js for specialized tasks (zero-shot classification, embeddings, etc.)`},O=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-COphal3B-5_86IHUA.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-ChrbGsAm-BzN3Lioj.js`),[])}),!0);n.registerExtension({id:le.name,name:O.EXT_IN_BROWSER_ML_NAME,description:O.EXT_IN_BROWSER_ML_DESC,loader:()=>g(()=>import(`./in-browser-ml-extension-inS0QtQv-Oj0TOUnK.js`),__vite__mapDeps([32,2,3,4,6,33])),icon:`brain`,experimental:!0});var k={name:`@eclipse-docks/extension-md-editor`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`View and render Markdown (.md) files`},A=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CBUlWfRZ-Z5Qjp0Q_.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BM0RHyIg-CpFmxylo.js`),[])}),!0);n.registerExtension({id:k.name,name:A.EXT_MDEDITOR_NAME,description:A.EXT_MDEDITOR_DESC,loader:()=>g(()=>import(`./md-editor-extension-Cnpou48B-D_wta5oX.js`),__vite__mapDeps([34,2,3,4])),icon:`book`});var j={name:`@eclipse-docks/extension-media-viewer`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`View PDF, image, and HTML files in the browser`},M=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CgHihdaU-BimV_k60.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-55SVlTbu-Nzn1Ohvv.js`),[])}),!0);n.registerExtension({id:j.name,name:M.EXT_MEDIAVIEWER_NAME,description:M.EXT_MEDIAVIEWER_DESC,loader:()=>g(()=>import(`./media-viewer-extension-DGwr_Jqs-B4IGlKrt.js`),__vite__mapDeps([35,2,3,4])),icon:`image`});var N={name:`@eclipse-docks/extension-memory-usage`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Displays JavaScript heap memory usage in the bottom toolbar`},P=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-Cawz0h_k-BZ7sKyv7.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DHKJc15g-3GHUBbWp.js`),[])}),!0);n.registerExtension({id:N.name,name:P.EXT_MEMORYUSAGE_NAME,description:P.EXT_MEMORYUSAGE_DESC,loader:()=>g(()=>import(`./memory-usage-extension-Cgc9YTpR-BIySUMHr.js`),__vite__mapDeps([36,2,3,4])),icon:`microchip`});var F={name:`@eclipse-docks/extension-monaco-editor`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.57.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Code editor with syntax highlighting, code completion, and Python execution support`},I=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-D33vNqDe-DIkbKPLK.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-O6wqbi6s-5MVmV8G8.js`),[])}),!0);n.registerExtension({id:F.name,name:I.EXT_MONACO_NAME,description:I.EXT_MONACO_DESC,loader:()=>g(()=>import(`./monaco-editor-extension-CgqbkH2f-rjK0PqRE.js`),__vite__mapDeps([37,2,3,4])),icon:`file-pen`}),n.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.5.0`,"@electric-sql/pglite-age":`^0.0.9`,"@electric-sql/pglite-pg_hashids":`^0.0.9`,"@electric-sql/pglite-pg_ivm":`^0.0.9`,"@electric-sql/pglite-pg_textsearch":`^0.0.10`,"@electric-sql/pglite-pg_uuidv7":`^0.0.9`,"@electric-sql/pglite-pgmq":`^0.0.6`,"@electric-sql/pglite-pgtap":`^0.0.9`,"@electric-sql/pglite-pgvector":`^0.0.9`,"@electric-sql/pglite-postgis":`^0.2.8`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-browser PostgreSQL via PGlite`}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>g(()=>import(`./pglite-extension-DwpdPI49-KbLp_FtV.js`),__vite__mapDeps([38,2,3,4,21,22,24])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var L={name:`@eclipse-docks/extension-plain-editor`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widgets":{types:`./dist/widgets.d.ts`,import:`./dist/widgets.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Default lightweight text and hex editor for workspace files`},R=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-CcEUJHGN-aRiAceGJ.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DM0IIbWc-Cn-XejRY.js`),[])}),!0);n.registerExtension({id:L.name,name:R.EXT_PLAIN_NAME,description:R.EXT_PLAIN_DESC,loader:()=>g(()=>import(`./plain-editor-extension-CMisvwJH-RDY1hxX8.js`),__vite__mapDeps([39,2,3,4])),icon:`file-lines`});var z={name:`@eclipse-docks/extension-python-runtime`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-terminal":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Pyodide runtime, Python package management, and Run Python Script command`},B=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BE5yqHjX-DWpKtCRM.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BcKQJbtf-_Wp-_4ph.js`),[])}),!0);n.registerExtension({id:z.name,name:B.EXT_PYTHONRUNTIME_NAME,description:B.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([g(()=>import(`./python-runtime-extension-we0VsotG-e2-ihCsM.js`),__vite__mapDeps([40,2,3,4,21,22,6,41,42,43,44])),g(()=>import(`./commands-_s1Kauk4-BH81sPsu.js`),__vite__mapDeps([45,2,3,4,41]))]),icon:`docks python`,dependencies:[`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-monaco-editor`]});var V={name:`@eclipse-docks/extension-rag-system`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Retrieval-Augmented Generation system for document indexing, search and retrieval`},H=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BlIlaOdb-dD9Zfg5D.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-gnDJyJge-CEpSZl7e.js`),[])}),!0);n.registerExtension({id:V.name,name:H.EXT_RAG_SYSTEM_NAME,description:H.EXT_RAG_SYSTEM_DESC,loader:()=>g(()=>import(`./rag-system-extension-Cl4De43B-tbLbincn.js`),__vite__mapDeps([46,2,3,4,47,7,31,33])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var U={name:`@eclipse-docks/extension-settings-tree`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Tree-based editor for settings with in-place editing`},W=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-2oUWFl6d-DayW3Txg.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-SG0YCiww-Do8HnAF3.js`),[])}),!0);n.registerExtension({id:U.name,name:W.EXT_SETTINGS_TREE_NAME,description:W.EXT_SETTINGS_TREE_DESC,loader:()=>g(()=>import(`./settings-tree-extension-aAidrBGt-T5ZznnIe.js`),__vite__mapDeps([48,2,3,4])),icon:`sitemap`});var ue={name:`@eclipse-docks/extension-terminal`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@xterm/addon-fit":`^0.10.0`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.1.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`VS Code-style terminal panel with pluggable profiles.`},G=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-1gFRm90o-B7uz0CPF.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BpQpiXOC-BxnQ5oIf.js`),[])}),!0);n.registerExtension({id:ue.name,name:G.EXT_TERMINAL_NAME,description:G.EXT_TERMINAL_DESC,loader:()=>g(()=>import(`./terminal-extension-CKb5tCLo-C14jV_rm.js`),__vite__mapDeps([49,3,2,4,6,44])),icon:`terminal`});var de={name:`@eclipse-docks/extension-utils`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{"fake-indexeddb":`^6.2.5`,jsdom:`^25.0.0`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`,vitest:`^4.0.18`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`,test:`vitest run`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Utility commands such as wget, unzip and certificate tools.`},K=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BeTB4qPD-DuB9kF_7.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-DV96x3ri-CeC-oHR3.js`),[])}),!0);n.registerExtension({id:de.name,name:K.EXT_UTILS_NAME,description:K.EXT_UTILS_DESC,loader:()=>g(()=>import(`./commands-B5QrGERn-CE9-eFhd.js`),__vite__mapDeps([50,3,2,4,41,42,51])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var fe={name:`@eclipse-docks/extension-webdav`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Connect to WebDAV servers (Nextcloud, ownCloud) as workspace folders for cloud storage integration`},q=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-BuxRWhrj-C_2umDbV.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-BLnYsp38-TFZwxgT_.js`),[])}),!0);n.registerExtension({id:fe.name,name:q.EXT_WEBDAV_NAME,description:q.EXT_WEBDAV_DESC,loader:()=>g(()=>import(`./webdav-extension-rnNsYJqQ-j-G7aNwG.js`),__vite__mapDeps([52,2,3,4])),icon:`cloud`,experimental:!0});var pe={name:`@eclipse-docks/extension-webllm`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`In-Browser LLM inference`},J=await l(Object.assign({"./i18n.de.json":()=>g(()=>import(`./i18n.de-1c_lhkQt-ClB76AjH.js`),[]),"./i18n.en.json":()=>g(()=>import(`./i18n.en-9kAjUGx0-C26KCfRj.js`),[])}),!0);n.registerExtension({id:pe.name,name:J.EXT_WEBLLM_NAME,description:J.EXT_WEBLLM_DESC,loader:()=>g(()=>import(`./webllmservice-Dk9S19ds-C4Qjrryi.js`),__vite__mapDeps([53,2,3,4,7,31])),icon:`robot`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`]}),n.registerExtension({id:{name:`@eclipse-docks/extension-webmcp`,version:`0.8.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},license:`EPL-2.0`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`}.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:()=>g(()=>import(`./webmcp-extension-B8sAANqe-CMcghXmm.js`),__vite__mapDeps([54,2,3,4])),icon:`plug`,experimental:!0});var me=`<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>`;function he(){e(`Eclipse legal`,me,!0)}u.registerContribution(p,{label:`Eclipse legal`,slot:`end`,component:()=>i`
      <wa-button
        appearance="plain"
        variant="brand"
        size="s"
        title="Eclipse Foundation legal information"
        @click=${he}
      >
        Eclipse legal
      </wa-button>
    `});var ge=3,_e=5,ve=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends r{static{this.styles=d`
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
    `}render(){return i`
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
                        ${ve.map(e=>i`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=a([o(`docks-dashboard-welcome`)],Y);var ye=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends r{constructor(...e){super(...e),this.tasks=[...ye]}static{this.styles=d`
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
    `}toggleTask(e){this.tasks=this.tasks.map(t=>t.id===e?{...t,done:!t.done}:t)}render(){return i`
            <ul class="taslist">
                ${this.tasks.map(e=>i`
                        <li class="tasitem ${e.done?`done`:``}">
                            <wa-checkbox
                                ?checked=${e.done}
                                @change=${()=>this.toggleTask(e.id)}
                                aria-label="${e.title}"
                            ></wa-checkbox>
                            <span class="tastitle">${e.title}</span>
                            ${e.due?i`<span class="tasdue">${e.due}</span>`:``}
                        </li>
                    `)}
            </ul>
        `}};a([ee()],X.prototype,`tasks`,void 0),X=a([o(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends r{static{this.styles=d`
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
    `}render(){let e=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`];return i`
            <div class="calendar-section">
                <div class="weeheader">
                    <span></span>
                    ${e.map(e=>i`<span class="day-col">${e}</span>`)}
                </div>
                <div class="meetings-grid">
                    <div class="time-slot"></div>
                    ${e.map(e=>{let t=Z.filter(t=>t.day===e);return i`
                            <div class="day-cell">
                                ${t.map(e=>i`
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
                    ${Z.map(e=>i`
                            <li>
                                <span class="title">${e.title}</span>
                                <div class="meta">${e.day} ${e.start} – ${e.end} · ${e.location}</div>
                            </li>
                        `)}
                </ul>
            </div>
        `}};Q=a([o(`docks-dashboard-meetings`)],Q),u.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>i`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends ne{renderContent(){return i`<slot></slot>`}};$=a([o(`docks-view-wrapper`)],$);var be=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),xe=[[`dashboard-home`,`Overview`,`house`,()=>i`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>i`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>i`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,n,r,i]of xe)u.registerContribution(te,be(e,t,n,r,i)),u.registerContribution(`dashboard-views`,{label:t,icon:n,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});u.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),u.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`docks settings`,command:`open_settings`}),u.registerContribution(c,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>i`<style>
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
        <docks-toolbar id="dashboard-views" size="l" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${f}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{s.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),u.registerContribution(h,{label:`Eclipse Docks`,slot:`start`,component:()=>i`
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
  `});var Se=document.getElementById(`app-root`)??document.body;t.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:se,extensions:[`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-terminal`,`@eclipse-docks/extension-notebook`,`@eclipse-docks/extension-python-runtime`,`@eclipse-docks/extension-canvas`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-plain-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`]},{autoStart:!0,hostConfig:!0,container:Se});