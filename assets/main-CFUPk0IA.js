const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/github-service-extension-6avU7OHf-hCtyVRig.js","assets/dist-DrA4poZJ.js","assets/chunk-DseTPa7n.js","assets/preload-helper-rov5CBGT.js","assets/fs-access-D-fDaJ8V-BUpCKyMj.js","assets/dist-C8Q35nOq.css","assets/pwa-extension-B3u-NX-p-Bv6jgh_m.js","assets/install-prompt-capture-fZikSCg3-Ckf44rY7.js","assets/ai-system-extension-u12yX2lg-QvzNZLB4.js","assets/ai-service-_8yd8pWc-BrZ5NP4F.js","assets/command-palette-extension-DP53lL4g-mJJrcAy6.js","assets/lit-Di4ZofON.js","assets/command-shell-extension-B7Tkc0Kz-CMqXBGm5.js","assets/loader-rJ7A0l10.js","assets/dataviewer-extension-DKO_uqFP-cCf74NGz.js","assets/duckdb-extension-B40T7F65-DFLP7LUk.js","assets/tslib.es6-BkH8hnGS.js","assets/api-AiFzwpXu.js","assets/dist-DJgcVLiY.js","assets/notebook-kernel-api-c9l3_84P-BE65wnTu.js","assets/howto-extension-BQfgRwmb-BxJ7U0dG.js","assets/api-C8jPad6v.js","assets/in-browser-ml-extension-B_JuNITB-KTjN4VNw.js","assets/in-browser-ml-service-18Xw5br1-7xt2LVRz.js","assets/linuxterminal-Bv55CZiY-DXNYySE7.js","assets/md-editor-extension-8oqW93mK-BpufKGib.js","assets/media-viewer-extension-CpuQxfjF-DNR5U0bs.js","assets/memory-usage-extension-Yl6iXGvQ-DJEEl5zA.js","assets/monaco-editor-extension-BAeimqAZ-Baf-eShS.js","assets/editor.api2-CmFNvybj-TKp1xFMn.js","assets/monaco.contribution-CdHWOuG1-D-mWxQQH.js","assets/workers-CGROc86k-DhBevdl4.js","assets/pglite-extension-CLG4sGBr-LOm_Tdf0.js","assets/python-runtime-extension-CS7adESG-mWHJDFw9.js","assets/editor-python-run-Cs68X5JL-BE9XBhkR.js","assets/package-manager-DcDiJbD3-BVo8fsWk.js","assets/pyservice-DufKqR-H-PkXYRmIi.js","assets/commands-CgwOcWiX-_dwgrS5H.js","assets/rag-system-extension-BE7Q_0rq-uXzRymRL.js","assets/rag-service-Cymd0ECr-Cb5mATN7.js","assets/settings-tree-extension-BpPkyN9--C8jjfQGf.js","assets/sqleditor-extension-CFNQ6Cj0-CR9fPyz9.js","assets/commands-DXblDlOb-BimRqXeP.js","assets/api-DMEDbw7S-B3Rrctqu.js","assets/webdav-extension-BnWGwdSi-DErYY03k.js","assets/webllmservice-Bdz7vrud-CfBIKvPY.js","assets/__vite-browser-external-DeMpVq38.js","assets/webmcp-extension-vZl42m8K-BRohyG9j.js"])))=>i.map(i=>d[i]);
import{C as e,G as t,I as n,K as r,R as i,_ as a,d as ee,f as o,h as s,ht as c,j as l,mt as u,o as te,r as d,s as f,ut as p,y as m}from"./dist-DrA4poZJ.js";import{t as h}from"./preload-helper-rov5CBGT.js";import"./lit-Di4ZofON.js";import"./install-prompt-capture-fZikSCg3-Ckf44rY7.js";import"./dist-DJgcVLiY.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var g={name:`@eclipse-docks/extension-github-service`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},_=`https://api.github.com`;function v(){let e=m.getCurrentApp();if(e?.metadata?.github){let t=e.metadata.github;if(t.owner&&t.repo)return{owner:t.owner,repo:t.repo}}throw Error(`GitHub repository not configured. Specify metadata.github in AppDefinition.`)}async function y(e=100){try{let t=v(),n=await fetch(`${_}/repos/${t.owner}/${t.repo}/releases?per_page=${e}`);return n.ok?await n.json():[]}catch(e){return console.error(`Failed to fetch releases:`,e),[]}}var b=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-GSWgOjeX-ByGks5sz.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-Bhvk9DkV-B__Ru8EQ.js`),[])}),!0);e.registerExtension({id:g.name,name:b.EXT_GITHUB_SERVICE_NAME,description:b.EXT_GITHUB_SERVICE_DESC,loader:()=>h(()=>import(`./github-service-extension-6avU7OHf-hCtyVRig.js`),__vite__mapDeps([0,1,2,3,4,5])),icon:`code-branch`});var ne={name:`@eclipse-docks/extension-pwa`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},x=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-Dls2qCix-DdpRK-Td.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DZPstBWw-D84SirOo.js`),[])}),!0);e.registerExtension({id:ne.name,name:x.EXT_PWA_NAME,description:x.EXT_PWA_DESC,loader:()=>h(()=>import(`./pwa-extension-B3u-NX-p-Bv6jgh_m.js`),__vite__mapDeps([6,1,2,3,4,5,7])),icon:`download`}),e.registerExtension({id:{name:`@eclipse-docks/extension-ai-system`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`,lit:`^3.0.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`AI System`,description:`AI assistants, chat, and tool execution`,loader:()=>h(()=>import(`./ai-system-extension-u12yX2lg-QvzNZLB4.js`),__vite__mapDeps([8,1,2,3,4,5,9])),icon:`robot`});var S={name:`@eclipse-docks/extension-command-palette`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},C=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BAIyaWGM-DGj8DRBa.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4m_srIpA-BCu70mia.js`),[])}),!0);e.registerExtension({id:S.name,name:C.EXT_COMMANDPALETTE_NAME,description:C.EXT_COMMANDPALETTE_DESC,loader:()=>h(()=>import(`./command-palette-extension-DP53lL4g-mJJrcAy6.js`),__vite__mapDeps([10,1,2,3,4,5,11])),icon:`terminal`});var w={name:`@eclipse-docks/extension-command-shell`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},T=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-B28toTLm-8BLxsl5t.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-Bjs1E9b5-rzBkHVSf.js`),[])}),!0);e.registerExtension({id:w.name,name:T.EXT_COMMANDSHELL_NAME,description:T.EXT_COMMANDSHELL_DESC,loader:()=>h(()=>import(`./command-shell-extension-B7Tkc0Kz-CMqXBGm5.js`),__vite__mapDeps([12,1,2,3,4,5])),icon:`terminal`,experimental:!0}),e.registerExtension({id:`@eclipse-docks/extension-catalog`,name:`Catalog`,description:`Browse and checkout resources from a catalog`,loader:()=>h(()=>import(`./loader-rJ7A0l10.js`),__vite__mapDeps([13,1,2,3,4,5,11])),icon:`book`}),e.registerExtension({id:{name:`@eclipse-docks/extension-dataviewer`,version:`0.0.0`,repository:{type:`git`,url:`https://github.com/eclipse-docks/core`},type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,papaparse:`^5.5.3`},devDependencies:{"@types/papaparse":`^5.5.2`,typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`}}.name,name:`Data Viewer`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`,loader:()=>h(()=>import(`./dataviewer-extension-DKO_uqFP-cCf74NGz.js`),__vite__mapDeps([14,1,2,3,4,5,11])),icon:`table`});var E={name:`@eclipse-docks/extension-duckdb`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@duckdb/duckdb-wasm":`1.33.1-dev20.0`,"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},D=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-DcvaIwdb-Di0w9YnX.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-CEVgAB1e-BrW23xgS.js`),[])}),!0);e.registerExtension({id:E.name,name:D.EXT_DUCKDB_NAME,description:D.EXT_DUCKDB_DESC,loader:()=>h(()=>import(`./duckdb-extension-B40T7F65-DFLP7LUk.js`),__vite__mapDeps([15,1,2,3,4,5,16,17,18,19])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var O={name:`@eclipse-docks/extension-howto-system`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},k=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-5w94fisR-2NXn2uGt.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-LfC8hyxS-DLyAs7PY.js`),[])}),!0);e.registerExtension({id:O.name,name:k.EXT_HOWTO_NAME,description:k.EXT_HOWTO_DESC,loader:()=>h(()=>import(`./howto-extension-BQfgRwmb-BxJ7U0dG.js`),__vite__mapDeps([20,1,2,3,4,5,9,21])),icon:`list-check`,experimental:!0});var re={name:`@eclipse-docks/extension-in-browser-ml`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@huggingface/transformers":`^3.8.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},A=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CeMAAFVI-Db2_nsgL.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4Ii3SXJ7-Cnb708oq.js`),[])}),!0);e.registerExtension({id:re.name,name:A.EXT_IN_BROWSER_ML_NAME,description:A.EXT_IN_BROWSER_ML_DESC,loader:()=>h(()=>import(`./in-browser-ml-extension-B_JuNITB-KTjN4VNw.js`),__vite__mapDeps([22,1,2,3,4,5,11,23])),icon:`brain`,experimental:!0});var ie={name:`@eclipse-docks/extension-linuxterminal`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@xterm/xterm":`^5.5.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},j=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CvJHtYUb-JuokcoEF.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-xxZwzQa1-CD-XNwKY.js`),[])}),!0);e.registerExtension({id:ie.name,name:j.EXT_LINUXTERMINAL_NAME,description:j.EXT_LINUXTERMINAL_DESC,loader:()=>h(()=>import(`./linuxterminal-Bv55CZiY-DXNYySE7.js`),__vite__mapDeps([24,1,2,3,4,5])),icon:`terminal`,experimental:!0});var ae={name:`@eclipse-docks/extension-md-editor`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,marked:`^12.0.0 || ^16.4.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},M=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-B-XSgGEO-B3seUM_N.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-C1spZCa1-CDrkQixe.js`),[])}),!0);e.registerExtension({id:ae.name,name:M.EXT_MDEDITOR_NAME,description:M.EXT_MDEDITOR_DESC,loader:()=>h(()=>import(`./md-editor-extension-8oqW93mK-BpufKGib.js`),__vite__mapDeps([25,1,2,3,4,5])),icon:`book`});var N={name:`@eclipse-docks/extension-media-viewer`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},P=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BgRO7Rh7-BkVPWmLO.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DyeoJm7D-cUJLW6su.js`),[])}),!0);e.registerExtension({id:N.name,name:P.EXT_MEDIAVIEWER_NAME,description:P.EXT_MEDIAVIEWER_DESC,loader:()=>h(()=>import(`./media-viewer-extension-CpuQxfjF-DNR5U0bs.js`),__vite__mapDeps([26,1,2,3,4,5])),icon:`image`});var F={name:`@eclipse-docks/extension-memory-usage`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},I=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CvKdEf6o-BQQFVmOz.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BMzjKj3o-cC82HELS.js`),[])}),!0);e.registerExtension({id:F.name,name:I.EXT_MEMORYUSAGE_NAME,description:I.EXT_MEMORYUSAGE_DESC,loader:()=>h(()=>import(`./memory-usage-extension-Yl6iXGvQ-DJEEl5zA.js`),__vite__mapDeps([27,1,2,3,4,5])),icon:`microchip`});var L={name:`@eclipse-docks/extension-monaco-editor`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./widget":{types:`./dist/monaco-widget.d.ts`,import:`./dist/widget.js`}},dependencies:{"@eclipse-docks/core":`*`,"monaco-editor":`0.55.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},R=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-TtWptOTJ-BtvE1IK5.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-DY_jLw5Z-C-Re3qZ_.js`),[])}),!0);e.registerExtension({id:L.name,name:R.EXT_MONACO_NAME,description:R.EXT_MONACO_DESC,loader:()=>h(()=>import(`./monaco-editor-extension-BAeimqAZ-Baf-eShS.js`),__vite__mapDeps([28,1,2,3,4,5,29,30,31])),icon:`file-pen`}),e.registerExtension({id:{name:`@eclipse-docks/extension-pglite`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-catalog":`*`,"@eclipse-docks/extension-notebook":`*`,"@eclipse-docks/extension-sqleditor":`*`,"@electric-sql/pglite":`^0.3.0`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`PGlite`,description:`In-browser PostgreSQL via PGlite`,loader:()=>h(()=>import(`./pglite-extension-CLG4sGBr-LOm_Tdf0.js`),__vite__mapDeps([32,1,2,3,4,5,17,18,19])),icon:`database`,dependencies:[`@eclipse-docks/extension-sqleditor`],experimental:!0});var z={name:`@eclipse-docks/extension-python-runtime`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`,"@eclipse-docks/extension-notebook":`*`,pyodide:`^0.29.3`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},B=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CHoexpTu-CYmrDxSu.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BSbqitYs-lql6Z_UB.js`),[])}),!0);e.registerExtension({id:z.name,name:B.EXT_PYTHONRUNTIME_NAME,description:B.EXT_PYTHONRUNTIME_DESC,loader:()=>Promise.all([h(()=>import(`./python-runtime-extension-CS7adESG-mWHJDFw9.js`),__vite__mapDeps([33,1,2,3,4,5,18,19,34,35,36])),h(()=>import(`./commands-CgwOcWiX-_dwgrS5H.js`),__vite__mapDeps([37,1,2,3,4,5,36]))]),icon:`docks python`});var V={name:`@eclipse-docks/extension-rag-system`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`},"./api":{types:`./dist/api.d.ts`,import:`./dist/api.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@eclipse-docks/extension-in-browser-ml":`*`,"@langchain/core":`^1.0.0`,"@langchain/textsplitters":`^1.0.0`,"pdfjs-dist":`^4.0.0`,rxdb:`^17.1.0`,rxjs:`^7.8.2`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},H=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-C4Oy9SoE-Dk8FIl4f.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BGbyrXax-D8kK5CUu.js`),[])}),!0);e.registerExtension({id:V.name,name:H.EXT_RAG_SYSTEM_NAME,description:H.EXT_RAG_SYSTEM_DESC,loader:()=>h(()=>import(`./rag-system-extension-BE7Q_0rq-uXzRymRL.js`),__vite__mapDeps([38,1,2,3,4,5,39,9,21,23])),icon:`database`,experimental:!0,dependencies:[`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-in-browser-ml`]});var U={name:`@eclipse-docks/extension-settings-tree`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},W=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BNVmjm3M-CWmbMCIi.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4qIo7_K0-BdDHndkk.js`),[])}),!0);e.registerExtension({id:U.name,name:W.EXT_SETTINGS_TREE_NAME,description:W.EXT_SETTINGS_TREE_DESC,loader:()=>h(()=>import(`./settings-tree-extension-BpPkyN9--C8jjfQGf.js`),__vite__mapDeps([40,1,2,3,4,5])),icon:`sitemap`}),e.registerExtension({id:{name:`@eclipse-docks/extension-sqleditor`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,module:`./dist/index.js`,types:`./dist/index.d.ts`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},files:[`dist`],scripts:{build:`vite build`},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-monaco-editor":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}}.name,name:`SQL Editor`,description:`Generic SQL editor with pluggable backends`,loader:()=>h(()=>import(`./sqleditor-extension-CFNQ6Cj0-CR9fPyz9.js`),__vite__mapDeps([41,1,2,3,4,5,11])),icon:`database`});var G={name:`@eclipse-docks/extension-utils`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-python-runtime":`*`,jszip:`^3.10.1`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},K=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-DpWotOVv-B87l7z_5.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-4j7sK8PT-BxWZM3wB.js`),[])}),!0);e.registerExtension({id:G.name,name:K.EXT_UTILS_NAME,description:K.EXT_UTILS_DESC,loader:()=>h(()=>import(`./commands-DXblDlOb-BimRqXeP.js`),__vite__mapDeps([42,1,2,3,4,5,43,35,36])),icon:`toolbox`,dependencies:[`@eclipse-docks/extension-python-runtime`]});var oe={name:`@eclipse-docks/extension-webdav`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},q=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-BGXJczCl-CK3bMuK5.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-D2QUvBv9-BPbF3E9Z.js`),[])}),!0);e.registerExtension({id:oe.name,name:q.EXT_WEBDAV_NAME,description:q.EXT_WEBDAV_DESC,loader:()=>h(()=>import(`./webdav-extension-BnWGwdSi-DErYY03k.js`),__vite__mapDeps([44,1,2,3,4,5])),icon:`cloud`,experimental:!0});var se={name:`@eclipse-docks/extension-webllm`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`,"@mlc-ai/web-llm":`^0.2.79`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}},J=await d(Object.assign({"./i18n.de.json":()=>h(()=>import(`./i18n.de-CQxA5kmG-B_cdAJFR.js`),[]),"./i18n.en.json":()=>h(()=>import(`./i18n.en-BIC1ZmXn-CQKSXibX.js`),[])}),!0);e.registerExtension({id:se.name,name:J.EXT_WEBLLM_NAME,description:J.EXT_WEBLLM_DESC,loader:()=>h(()=>import(`./webllmservice-Bdz7vrud-CfBIKvPY.js`),__vite__mapDeps([45,1,2,3,4,5,9,21,46])),icon:`robot`,experimental:!0});var ce={name:`@eclipse-docks/extension-webmcp`,version:`0.0.0`,type:`module`,main:`./dist/index.js`,exports:{".":{types:`./dist/index.d.ts`,import:`./dist/index.js`}},dependencies:{"@eclipse-docks/core":`*`,"@eclipse-docks/extension-ai-system":`*`},devDependencies:{typescript:`^6.0.0`,vite:`^8.0.0`,"vite-plugin-dts":`^4.5.4`},module:`./dist/index.js`,types:`./dist/index.d.ts`,files:[`dist`],scripts:{build:`vite build`},repository:{type:`git`,url:`https://github.com/eclipse-docks/core`}};function le(){return typeof navigator<`u`&&`modelContext`in navigator&&navigator.modelContext!=null}e.registerExtension({id:ce.name,name:`WebMCP`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`,loader:async()=>{if(!le())throw Error(`WebMCP extension requires navigator.modelContext (Web Model Context API).`);return h(()=>import(`./webmcp-extension-vZl42m8K-BRohyG9j.js`),__vite__mapDeps([47,1,2,3,4,5,9,21]))},icon:`plug`,dependencies:[`@eclipse-docks/extension-ai-system`],experimental:!0});var ue=3,de=5,fe=[{title:`Standup`,time:`Today 9:00`,location:`Room A`},{title:`Sprint planning`,time:`Tomorrow 14:00`,location:`Room B`},{title:`Design review`,time:`Wed 10:00`,location:`Call`}],Y=class extends p{static{this.styles=c`
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
                            <span class="stat-value">${de}</span>
                            <span class="stat-label">Open</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${ue}</span>
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
                        ${fe.map(e=>u`
                                <li class="meeting-item">
                                    <span class="meeting-title">${e.title}</span>
                                    <span class="meeting-meta">${e.time} · ${e.location}</span>
                                </li>
                            `)}
                    </ul>
                </wa-card>
            </div>
        `}};Y=l([i(`docks-dashboard-welcome`)],Y);var pe=[{id:`1`,title:`Review pull request #142`,done:!1,due:`Today`},{id:`2`,title:`Update documentation`,done:!0},{id:`3`,title:`Fix login redirect bug`,done:!1,due:`Tomorrow`},{id:`4`,title:`Prepare sprint demo`,done:!1,due:`Fri`},{id:`5`,title:`Sync with design team`,done:!0}],X=class extends p{constructor(...e){super(...e),this.tasks=[...pe]}static{this.styles=c`
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
        `}};l([n()],X.prototype,`tasks`,void 0),X=l([i(`docks-dashboard-my-tasks`)],X);var Z=[{title:`Standup`,start:`9:00`,end:`9:15`,day:`Mon`,location:`Room A`},{title:`Sprint planning`,start:`14:00`,end:`15:30`,day:`Tue`,location:`Room B`},{title:`Design review`,start:`10:00`,end:`11:00`,day:`Wed`,location:`Call`},{title:`1:1 with manager`,start:`16:00`,end:`16:30`,day:`Thu`,location:`Room C`},{title:`Retrospective`,start:`11:00`,end:`12:00`,day:`Fri`,location:`Room A`}],Q=class extends p{static{this.styles=c`
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
        `}};Q=l([i(`docks-dashboard-meetings`)],Q),r.registerContribution(`dashboard-toolbar-top`,{label:`Dashboard`,slot:`start`,component:()=>u`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`});var $=class extends te{renderContent(){return u`<slot></slot>`}};$=l([i(`docks-view-wrapper`)],$);var me=(e,t,n,r,i)=>({name:e,label:t,icon:n,closable:i??!1,toolbar:!1,component:e=>r()}),he=[[`dashboard-home`,`Overview`,`house`,()=>u`<docks-dashboard-welcome></docks-dashboard-welcome>`,!1],[`dashboard-tasks`,`My Tasks`,`list-check`,()=>u`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`,!0],[`dashboard-meetings`,`Meetings`,`calendar-days`,()=>u`<docks-dashboard-meetings></docks-dashboard-meetings>`,!0]];for(let[e,t,n,i,a]of he)r.registerContribution(o,me(e,t,n,i,a)),r.registerContribution(`dashboard-views`,{label:t,icon:n,showLabel:!0,command:`open_view_as_editor`,params:{name:e}});r.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Profile`,icon:`user`,command:`open_user_profile`}),r.registerContribution(`dashboard-views-toolbar-bottom`,{label:`Settings`,icon:`gear`,command:`open_settings`}),r.registerContribution(ee,{id:`dashboard`,name:`Dashboard`,label:`Dashboard`,icon:`table-cells`,component:()=>u`<style>
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
        <docks-toolbar id=${a}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="large" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${f}></docks-tabs>
      </docks-resizable-grid>
    </div>`,onShow(){requestAnimationFrame(()=>{t.execute(`open_view_as_editor`,{params:{name:`dashboard-home`}}).catch(()=>{})})}}),r.registerContribution(s,{label:`Eclipse Docks`,slot:`start`,component:()=>u`
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
  `});var ge=document.getElementById(`app-root`)??document.body;m.registerApp({name:`Eclipse Docks`,description:`Eclipse Docks demo app with default extensions.`,layoutId:`standard-full`,metadata:{github:{owner:`eclipse-docks`,repo:`core`}},releaseHistory:y,extensions:[`@eclipse-docks/extension-command-palette`,`@eclipse-docks/extension-command-shell`,`@eclipse-docks/extension-catalog`,`@eclipse-docks/extension-md-editor`,`@eclipse-docks/extension-monaco-editor`,`@eclipse-docks/extension-media-viewer`,`@eclipse-docks/extension-settings-tree`,`@eclipse-docks/extension-memory-usage`,`@eclipse-docks/extension-pwa`,`@eclipse-docks/extension-ai-system`,`@eclipse-docks/extension-dataviewer`]},{autoStart:!0,hostConfig:!0,container:ge});