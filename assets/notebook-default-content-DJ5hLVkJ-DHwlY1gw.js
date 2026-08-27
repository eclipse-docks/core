import{n as e}from"./notebook-metadata-Bh2hG7NA-Ca2xcq29.js";function t(e){return!!(e&&typeof e.executeCell==`function`&&typeof e.focusedCellIndex==`number`)}function n(e){switch(e.language){case`python`:return[`print("Hello, World!")
`];case`javascript`:return[`return "Hello, World!"`];case`sql`:return[`SELECT '${e.label}' AS engine;\n`];default:return[`# ${e.label}\n`]}}function r(t){return{cells:[{cell_type:`markdown`,source:[`# Notebook
`,`
`,`Press **Run** in the code cell below to execute it.
`],metadata:{}},{cell_type:`code`,source:n(t),execution_count:null,outputs:[],metadata:{}}],metadata:e(void 0,t),nbformat:4,nbformat_minor:4}}export{t as n,r as t};