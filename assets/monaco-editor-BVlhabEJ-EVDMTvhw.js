import"./monaco-widget-bVmeI1xu-BYND2WmC.js";import{k as e,wn as t}from"./canvas-bridge-core.js-By6utgn9.js";import{C as n,_ as r,a as i,i as a,v as o,w as s,y as c}from"./canvas-bridge-canvas.js-D2E74L6t.js";var l=class extends e{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.initialLanguage=void 0,this.widgetRef=a(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getWorkspacePath(),this.initialLanguage=void 0,this.requestUpdate()}getEditor(){return this.widgetRef.value?.getEditor()??void 0}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose()}getLanguage(){return this.widgetRef.value?.getLanguage()??null}isLanguage(e){return this.widgetRef.value?.isLanguage(e)??!1}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderContent(){return this.initialContent===void 0?n`<div class="monaco-editor-placeholder"></div>`:n`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${this.initialLanguage}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${i(this.widgetRef)}
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
    `}};t([o({attribute:!1})],l.prototype,`input`,void 0),t([o()],l.prototype,`readOnly`,void 0),t([r()],l.prototype,`initialContent`,void 0),t([r()],l.prototype,`initialUri`,void 0),t([r()],l.prototype,`initialLanguage`,void 0),l=t([c(`docks-monaco-editor`)],l);