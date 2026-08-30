import{F as e,N as t,P as n,dt as r,ft as i,o as a,pt as o,vt as s,yt as c}from"./dist-B5H1npoP.js";var l=class extends a{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.initialLanguage=void 0,this.widgetRef=t(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getWorkspacePath(),this.initialLanguage=void 0,this.requestUpdate()}getEditor(){return this.widgetRef.value?.getEditor()??void 0}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose()}getLanguage(){return this.widgetRef.value?.getLanguage()??null}isLanguage(e){return this.widgetRef.value?.isLanguage(e)??!1}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderContent(){return this.initialContent===void 0?s`<div class="monaco-editor-placeholder"></div>`:s`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${this.initialLanguage}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${n(this.widgetRef)}
            ></docks-monaco-widget>
        `}static{this.styles=c`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: 100%;
        }
        .monaco-editor-placeholder {
            flex: 1;
            min-height: 0;
        }
    `}};e([i({attribute:!1})],l.prototype,`input`,void 0),e([i()],l.prototype,`readOnly`,void 0),e([r()],l.prototype,`initialContent`,void 0),e([r()],l.prototype,`initialUri`,void 0),e([r()],l.prototype,`initialLanguage`,void 0),l=e([o(`docks-monaco-editor`)],l);