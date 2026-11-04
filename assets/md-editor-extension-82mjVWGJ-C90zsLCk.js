import{Bt as e,Ot as t,Ut as n,j as r,l as i,wt as a}from"./canvas-bridge-core.js-DfVkBxCr.js";import{S as o,_ as s,c,g as l,h as u,m as d,x as f,y as p}from"./canvas-bridge-canvas.js-DrvOvBhU.js";import"./widget-DBIyMQoH.js";i.registerEditorInputHandler({editorId:`system.md-editor`,label:`Markdown`,icon:`book`,canHandle:e=>e instanceof n&&e.getName().toLowerCase().endsWith(`.md`),handle:async e=>{let t={title:e.getWorkspacePath(),data:e,key:e.getWorkspacePath(),icon:`book`,state:{}};return t.component=e=>f`
            <docks-md-editor id="${e}" .input=${t}></docks-md-editor>`,t},ranking:1e3});var m=class extends r{constructor(...e){super(...e),this.ready=!1,this.mode=`preview`,this.rendered=``,this.sourceText=``,this.sourceUri=`markdown.md`,this.onContentChange=()=>{let e=this.widget?.getContent()??this.sourceText;e!==this.sourceText&&(this.sourceText=e,this.input?.data instanceof n&&this.markDirty(!0))}}async doInitUI(){let e=this.input?.data;e instanceof n?(this.sourceText=String(await e.getContents()??``),this.sourceUri=e.getWorkspacePath()):typeof e==`string`&&e.startsWith(`http`)?(this.sourceText=await(await fetch(e)).text(),this.sourceUri=`remote.md`):typeof e==`string`&&(this.sourceText=e),this.rendered=t(this.sourceText),this.mode=this.input?.state?.mode===`source`?`source`:`preview`,this.scrollMode=this.mode===`source`?`none`:`scroller`,this.ready=!0}doClose(){this.widget?.dispose(),this.input=void 0,this.sourceText=``,this.rendered=``,this.ready=!1}updated(e){super.updated(e),this.mode===`source`&&this.widget?.layout()}async save(){let e=this.getContent()??``,r=this.input?.data;r instanceof n&&await r.saveContents(e),this.rendered=t(e),this.markDirty(!1)}getContent(){return this.widget?.getContent()??this.sourceText}getSelection(){return this.widget?.getSelection()??null}getSnippet(e=5){return this.widget?.getSnippet(e)??null}getLanguage(){return`markdown`}isLanguage(e){return e.toLowerCase()===`markdown`}getFilePath(){let e=this.input?.data;return e instanceof n?e.getWorkspacePath():null}toggleMode(){this.sourceText=this.widget?.getContent()??this.sourceText;let e=this.mode===`preview`?`source`:`preview`;this.mode=e,this.input&&(this.input.state.mode=e),this.scrollMode=e===`source`?`none`:`scroller`,e===`preview`&&(this.rendered=t(this.sourceText))}renderToolbar(){if(!this.ready)return p;let e=this.mode===`preview`,t=e?`Source`:`Preview`;return f`
            <wa-button appearance="plain" size="s" title=${t} @click=${()=>this.toggleMode()}>
                ${a(e?`code`:`eye`,{slot:`start`})}
                ${t}
            </wa-button>
        `}renderContent(){if(!this.ready)return f``;let e=this.mode===`preview`;return f`
            <div class="md-preview ${e?``:`md-hidden`}">${c(this.rendered)}</div>
            <docks-monaco-widget
                class=${e?`md-hidden`:``}
                .value=${this.sourceText}
                .language=${`markdown`}
                .uri=${this.sourceUri}
                .readOnly=${!(this.input?.data instanceof n)}
                @content-change=${this.onContentChange}>
            </docks-monaco-widget>
        `}static{this.styles=o`
        :host {
            display: block;
            height: 100%;
            min-height: 0;
        }
        .md-preview {
            padding: var(--wa-space-m, 0.75rem);
            box-sizing: border-box;
        }
        .md-preview.md-hidden, docks-monaco-widget.md-hidden { display: none; }
        docks-monaco-widget { display: block; height: 100%; min-height: 0; }
    `}};e([l({attribute:!1})],m.prototype,`input`,void 0),e([u()],m.prototype,`ready`,void 0),e([u()],m.prototype,`mode`,void 0),e([u()],m.prototype,`rendered`,void 0),e([d(`docks-monaco-widget`)],m.prototype,`widget`,void 0),m=e([s(`docks-md-editor`)],m);export{m as DocksMDEditor};