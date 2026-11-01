import{I as e,Jt as t,L as n,R as r,Rt as i,Vt as a,l as o,rn as s,zt as c}from"./canvas-bridge-core.js-CIMrG4cY.js";import"./monaco-widget-CPYnLHgO-DJxAhH1X.js";var l=class extends o{constructor(...t){super(...t),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.initialLanguage=void 0,this.widgetRef=e(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getWorkspacePath(),this.initialLanguage=void 0,this.requestUpdate()}getEditor(){return this.widgetRef.value?.getEditor()??void 0}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose()}getLanguage(){return this.widgetRef.value?.getLanguage()??null}isLanguage(e){return this.widgetRef.value?.isLanguage(e)??!1}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderContent(){return this.initialContent===void 0?t`<div class="monaco-editor-placeholder"></div>`:t`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${this.initialLanguage}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${n(this.widgetRef)}
            ></docks-monaco-widget>
        `}static{this.styles=s`
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
    `}};r([c({attribute:!1})],l.prototype,`input`,void 0),r([c()],l.prototype,`readOnly`,void 0),r([i()],l.prototype,`initialContent`,void 0),r([i()],l.prototype,`initialUri`,void 0),r([i()],l.prototype,`initialLanguage`,void 0),l=r([a(`docks-monaco-editor`)],l);