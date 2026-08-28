import{M as e,N as t,P as n,_t as r,dt as i,ft as a,o,ut as s,vt as c}from"./dist-DkbPbSj1.js";var l=class extends o{constructor(...t){super(...t),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.initialLanguage=void 0,this.widgetRef=e(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data;this.initialContent=await e.getContents(),this.initialUri=e.getWorkspacePath(),this.initialLanguage=void 0,this.requestUpdate()}getEditor(){return this.widgetRef.value?.getEditor()??void 0}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose()}getLanguage(){return this.widgetRef.value?.getLanguage()??null}isLanguage(e){return this.widgetRef.value?.isLanguage(e)??!1}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderContent(){return this.initialContent===void 0?r`<div class="monaco-editor-placeholder"></div>`:r`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${this.initialLanguage}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${t(this.widgetRef)}
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
    `}};n([i({attribute:!1})],l.prototype,`input`,void 0),n([i()],l.prototype,`readOnly`,void 0),n([s()],l.prototype,`initialContent`,void 0),n([s()],l.prototype,`initialUri`,void 0),n([s()],l.prototype,`initialLanguage`,void 0),l=n([a(`docks-monaco-editor`)],l);