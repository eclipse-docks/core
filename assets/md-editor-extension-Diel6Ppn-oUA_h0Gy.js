import{Bt as e,Ot as t,Ut as n,j as r,l as i,wt as a}from"./canvas-bridge-core.js--vxKOYPl.js";import{S as o,_ as s,c,g as l,h as u,x as d,y as f}from"./canvas-bridge-canvas.js-DrvOvBhU.js";i.registerEditorInputHandler({editorId:`system.md-editor`,label:`Markdown`,icon:`book`,canHandle:e=>e instanceof n&&e.getName().toLowerCase().endsWith(`.md`),handle:async e=>{let t={title:e.getWorkspacePath(),data:e,key:e.getWorkspacePath(),icon:`book`,state:{}};return t.component=e=>d`
            <docks-md-editor id="${e}" .input=${t}></docks-md-editor>`,t},ranking:1e3});var p=class extends r{constructor(...e){super(...e),this.ready=!1,this.mode=`preview`,this.rendered=``,this.sourceText=``,this.onInput=e=>{let t=e.currentTarget,r=typeof t.value==`string`?t.value:this.sourceText;r!==this.sourceText&&(this.sourceText=r,this.input?.data instanceof n&&this.markDirty(!0))}}async doInitUI(){let e=this.input?.data;e instanceof n?this.sourceText=String(await e.getContents()??``):typeof e==`string`&&e.startsWith(`http`)?this.sourceText=await(await fetch(e)).text():typeof e==`string`&&(this.sourceText=e),this.rendered=t(this.sourceText),this.mode=this.input?.state?.mode===`source`?`source`:`preview`,this.scrollMode=this.mode===`source`?`none`:`scroller`,this.ready=!0}doClose(){this.input=void 0,this.sourceText=``,this.rendered=``,this.ready=!1}async save(){let e=this.readSource(),r=this.input?.data;r instanceof n&&await r.saveContents(e),this.rendered=t(e),this.markDirty(!1)}getContent(){return this.readSource()}getSelection(){let e=this.sourceField();if(!e)return null;let{selectionStart:t,selectionEnd:n,value:r}=e;return t===n?``:r.slice(t,n)}getSnippet(e=5){let t=this.sourceField(),n=this.getContent();if(!t||n==null)return null;let r=n.split(`
`),i=0,a=0;for(let e=0;e<r.length;e++)if(a+=r[e].length+1,a>t.selectionStart){i=e;break}let o=Math.max(0,i-e),s=Math.min(r.length,i+e+1);return{snippet:r.slice(o,s).join(`
`),cursorLine:i}}getLanguage(){return`markdown`}isLanguage(e){return e.toLowerCase()===`markdown`}getFilePath(){let e=this.input?.data;return e instanceof n?e.getWorkspacePath():null}toggleMode(){this.readSource();let e=this.mode===`preview`?`source`:`preview`;this.mode=e,this.input&&(this.input.state.mode=e),this.scrollMode=e===`source`?`none`:`scroller`,e===`preview`&&(this.rendered=t(this.sourceText))}readSource(){let e=this.renderRoot.querySelector(`wa-textarea`);return e&&typeof e.value==`string`&&(this.sourceText=e.value),this.sourceText}sourceField(){return this.renderRoot.querySelector(`wa-textarea`)?.shadowRoot?.querySelector(`textarea`)??null}renderToolbar(){if(!this.ready)return f;let e=this.mode===`preview`,t=e?`Source`:`Preview`;return d`
            <wa-button appearance="plain" size="s" title=${t} @click=${()=>this.toggleMode()}>
                ${a(e?`code`:`eye`,{slot:`start`})}
                ${t}
            </wa-button>
        `}renderContent(){return this.ready?this.mode===`source`?d`
                <wa-textarea
                    class="md-source"
                    resize="none"
                    .value=${this.sourceText}
                    ?readonly=${!(this.input?.data instanceof n)}
                    @input=${this.onInput}>
                </wa-textarea>
            `:d`<div class="md-preview">${c(this.rendered)}</div>`:d``}static{this.styles=o`
        :host {
            display: block;
            height: 100%;
            min-height: 0;
        }
        .md-preview {
            padding: var(--wa-space-m, 0.75rem);
            box-sizing: border-box;
        }
        .md-source {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 0;
        }
        .md-source::part(base) {
            height: 100%;
            min-height: 0;
        }
        .md-source::part(textarea) {
            height: 100%;
            min-height: 100%;
            resize: none;
            font-family: var(--wa-font-mono, ui-monospace, monospace);
        }
    `}};e([l({attribute:!1})],p.prototype,`input`,void 0),e([u()],p.prototype,`ready`,void 0),e([u()],p.prototype,`mode`,void 0),e([u()],p.prototype,`rendered`,void 0),p=e([s(`docks-md-editor`)],p);export{p as DocksMDEditor};