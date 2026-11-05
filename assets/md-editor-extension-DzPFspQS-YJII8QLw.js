import{Et as e,Ht as t,c as n,k as r,pn as i,wn as a}from"./canvas-bridge-core.js-Bffj0Hc4.js";import{C as o,_ as s,g as c,p as l,v as u,w as d,x as f,y as p}from"./canvas-bridge-canvas.js-D2E74L6t.js";import"./widget-DdLpUsPX.js";n.registerEditorInputHandler({editorId:`system.md-editor`,label:`Markdown`,icon:`book`,canHandle:e=>e instanceof t&&e.getName().toLowerCase().endsWith(`.md`),handle:async e=>{let t={title:e.getWorkspacePath(),data:e,key:e.getWorkspacePath(),icon:`book`,state:{}};return t.component=e=>o`
            <docks-md-editor id="${e}" .input=${t}></docks-md-editor>`,t},ranking:1e3});var m=class extends r{constructor(...e){super(...e),this.ready=!1,this.mode=`preview`,this.rendered=``,this.sourceText=``,this.sourceUri=`markdown.md`,this.onContentChange=()=>{let e=this.widget?.getContent()??this.sourceText;e!==this.sourceText&&(this.sourceText=e,this.input?.data instanceof t&&this.markDirty(!0))}}async doInitUI(){let n=this.input?.data;n instanceof t?(this.sourceText=String(await n.getContents()??``),this.sourceUri=n.getWorkspacePath()):typeof n==`string`&&n.startsWith(`http`)?(this.sourceText=await(await fetch(n)).text(),this.sourceUri=`remote.md`):typeof n==`string`&&(this.sourceText=n),this.rendered=e(this.sourceText),this.mode=this.input?.state?.mode===`source`?`source`:`preview`,this.scrollMode=this.mode===`source`?`none`:`scroller`,this.ready=!0}doClose(){this.widget?.dispose(),this.input=void 0,this.sourceText=``,this.rendered=``,this.ready=!1}updated(e){super.updated(e),this.mode===`source`&&this.widget?.layout()}async save(){let n=this.getContent()??``,r=this.input?.data;r instanceof t&&await r.saveContents(n),this.rendered=e(n),this.markDirty(!1)}getContent(){return this.widget?.getContent()??this.sourceText}getSelection(){return this.widget?.getSelection()??null}getSnippet(e=5){return this.widget?.getSnippet(e)??null}getLanguage(){return`markdown`}isLanguage(e){return e.toLowerCase()===`markdown`}getFilePath(){let e=this.input?.data;return e instanceof t?e.getWorkspacePath():null}toggleMode(){this.sourceText=this.widget?.getContent()??this.sourceText;let t=this.mode===`preview`?`source`:`preview`;this.mode=t,this.input&&(this.input.state.mode=t),this.scrollMode=t===`source`?`none`:`scroller`,t===`preview`&&(this.rendered=e(this.sourceText))}renderToolbar(){if(!this.ready)return f;let e=this.mode===`preview`,t=e?`Source`:`Preview`;return o`
            <wa-button appearance="plain" size="s" title=${t} @click=${()=>this.toggleMode()}>
                ${i(e?`code`:`eye`,{slot:`start`})}
                ${t}
            </wa-button>
        `}renderContent(){if(!this.ready)return o``;let e=this.mode===`preview`;return o`
            <div class="md-preview ${e?``:`md-hidden`}">${l(this.rendered)}</div>
            <docks-monaco-widget
                class=${e?`md-hidden`:``}
                .value=${this.sourceText}
                .language=${`markdown`}
                .uri=${this.sourceUri}
                .readOnly=${!(this.input?.data instanceof t)}
                @content-change=${this.onContentChange}>
            </docks-monaco-widget>
        `}static{this.styles=d`
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
    `}};a([u({attribute:!1})],m.prototype,`input`,void 0),a([s()],m.prototype,`ready`,void 0),a([s()],m.prototype,`mode`,void 0),a([s()],m.prototype,`rendered`,void 0),a([c(`docks-monaco-widget`)],m.prototype,`widget`,void 0),m=a([p(`docks-md-editor`)],m);export{m as DocksMDEditor};