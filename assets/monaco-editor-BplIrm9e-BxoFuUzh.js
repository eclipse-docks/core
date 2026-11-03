import{Cr as e,Gt as t,Kt as n,P as r,Wt as i,ar as a,ir as o,mr as s,sr as c}from"./canvas-bridge-core.js-DFQjSuZd.js";import"./monaco-widget-CPYnLHgO-cF5nveAV.js";var l=class extends r{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.initialLanguage=void 0,this.widgetRef=i(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getWorkspacePath(),this.initialLanguage=void 0,this.requestUpdate()}getEditor(){return this.widgetRef.value?.getEditor()??void 0}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose()}getLanguage(){return this.widgetRef.value?.getLanguage()??null}isLanguage(e){return this.widgetRef.value?.isLanguage(e)??!1}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderContent(){return this.initialContent===void 0?s`<div class="monaco-editor-placeholder"></div>`:s`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${this.initialLanguage}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${t(this.widgetRef)}
            ></docks-monaco-widget>
        `}static{this.styles=e`
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
    `}};n([a({attribute:!1})],l.prototype,`input`,void 0),n([a()],l.prototype,`readOnly`,void 0),n([o()],l.prototype,`initialContent`,void 0),n([o()],l.prototype,`initialUri`,void 0),n([o()],l.prototype,`initialLanguage`,void 0),l=n([c(`docks-monaco-editor`)],l);