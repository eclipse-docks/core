import{En as e,I as t,Pt as n,Xt as r,d as i,xn as a,zn as o}from"./canvas-bridge-core.js-DzNT3DE6.js";import{C as s,_ as c,g as l,p as u,v as d,w as f,x as p,y as m}from"./canvas-bridge-canvas.js-D2E74L6t.js";import"./widget-BAz7pbbj.js";i.registerEditorInputHandler({editorId:`system.md-editor`,label:`Markdown`,icon:`book`,canHandle:e=>e instanceof r&&e.getName().toLowerCase().endsWith(`.md`),handle:async e=>{let t={title:e.getWorkspacePath(),data:e,key:e.getWorkspacePath(),icon:`book`,state:{}};return t.component=e=>s`
            <docks-md-editor id="${e}" .input=${t}></docks-md-editor>`,t},ranking:1e3});var h=class extends t{constructor(...e){super(...e),this.ready=!1,this.mode=`preview`,this.rendered=``,this.sourceText=``,this.sourceUri=`markdown.md`,this.onContentChange=()=>{let e=this.widget?.getContent()??this.sourceText;e!==this.sourceText&&(this.sourceText=e,this.input?.data instanceof r&&this.markDirty(!0))}}async doInitUI(){let e=this.input?.data;e instanceof r?(this.sourceText=String(await e.getContents()??``),this.sourceUri=e.getWorkspacePath()):typeof e==`string`&&e.startsWith(`http`)?(this.sourceText=await(await fetch(e)).text(),this.sourceUri=`remote.md`):typeof e==`string`&&(this.sourceText=e),this.rendered=n(this.sourceText),this.mode=this.input?.state?.mode===`source`?`source`:`preview`,this.scrollMode=this.mode===`source`?`none`:`scroller`,this.ready=!0}doClose(){this.widget?.dispose(),this.input=void 0,this.sourceText=``,this.rendered=``,this.ready=!1}updated(e){super.updated(e),this.mode===`source`&&this.widget?.layout()}async save(){let e=this.getContent()??``,t=this.input?.data;t instanceof r&&await t.saveContents(e),this.rendered=n(e),this.markDirty(!1)}getContent(){return this.widget?.getContent()??this.sourceText}getSelection(){return this.widget?.getSelection()??null}getSnippet(e=5){return this.widget?.getSnippet(e)??null}getLanguage(){return`markdown`}isLanguage(e){return e.toLowerCase()===`markdown`}getFilePath(){let e=this.input?.data;return e instanceof r?e.getWorkspacePath():null}async reloadFromFile(){let e=this.input?.data;if(!(e instanceof r))return;let t=String(await e.getContents()??``);this.sourceText=t,this.rendered=n(t),this.widget?.getModel()?.setValue(t),this.markDirty(!1)}isPlanFile(){let e=this.getFilePath();if(!e)return!1;let t=e.split(/[/\\]/).pop()??``;return/^plan-.+\.plan\.md$/i.test(t)}async buildPlan(){let e=this.getFilePath();e&&a.hasCommand(`build_plan`)&&(this.isDirty()&&await this.save(),await a.execute(`build_plan`,a.createExecutionContext({path:e})))}toggleMode(){this.sourceText=this.widget?.getContent()??this.sourceText;let e=this.mode===`preview`?`source`:`preview`;this.mode=e,this.input&&(this.input.state.mode=e),this.scrollMode=e===`source`?`none`:`scroller`,e===`preview`&&(this.rendered=n(this.sourceText))}renderToolbar(){if(!this.ready)return p;let t=this.mode===`preview`,n=t?`Source`:`Preview`,r=this.isPlanFile()&&a.hasCommand(`build_plan`);return s`
            ${r?s`
                    <wa-button appearance="plain" size="s" title="Build this plan" @click=${()=>void this.buildPlan()}>
                        ${e(`play`,{slot:`start`})}
                        Build
                    </wa-button>
                `:p}
            <wa-button appearance="plain" size="s" title=${n} @click=${()=>this.toggleMode()}>
                ${e(t?`code`:`eye`,{slot:`start`})}
                ${n}
            </wa-button>
        `}renderContent(){if(!this.ready)return s``;let e=this.mode===`preview`;return s`
            <div class="md-preview ${e?``:`md-hidden`}">${u(this.rendered)}</div>
            <docks-monaco-widget
                class=${e?`md-hidden`:``}
                .value=${this.sourceText}
                .language=${`markdown`}
                .uri=${this.sourceUri}
                .readOnly=${!(this.input?.data instanceof r)}
                @content-change=${this.onContentChange}>
            </docks-monaco-widget>
        `}static{this.styles=f`
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
    `}};o([d({attribute:!1})],h.prototype,`input`,void 0),o([c()],h.prototype,`ready`,void 0),o([c()],h.prototype,`mode`,void 0),o([c()],h.prototype,`rendered`,void 0),o([l(`docks-monaco-widget`)],h.prototype,`widget`,void 0),h=o([m(`docks-md-editor`)],h);export{h as DocksMDEditor};