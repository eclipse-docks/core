import{t as e}from"./pyservice-B2zNJ0p2-Do3DxaTg.js";import{t}from"./package-manager-BOFFZoEr-BClrEKFJ.js";import"./api-DyQOGH0--6QETBN4P.js";import{c as n,i as r,o as i,s as a}from"./python-terminal-backend-DTLh7S34-CwMSUGFg.js";import{bn as o,k as s,wn as c}from"./canvas-bridge-core.js-Bffj0Hc4.js";import{C as l,_ as u,a as d,h as f,i as p,v as m,w as h,y as g}from"./canvas-bridge-canvas.js-D2E74L6t.js";import"./widget-DdLpUsPX.js";import{t as _}from"./api-i-r2uwtc.js";var v=class extends s{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.pyConnected=!1,this.pyConnecting=!1,this.widgetRef=p(),this.sessionId=crypto.randomUUID(),this.editorClosed=!1,this.attachedTerminal=new _(()=>{if(!this.pyenv)return Promise.resolve(void 0);let e=this.input?.data?.getName?.()??`Python`;return i(this.pyenv,this.sessionId,e)},()=>n(this.sessionId)),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getName(),this.requestUpdate()}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.editorClosed=!0,this.widgetRef.value?.dispose(),this.attachedTerminal.release(),this.pyenv&&=(this.pyenv.close(),void 0),this.pyConnected=!1,this.pyVersion=void 0}getLanguage(){return`python`}isLanguage(e){return e.toLowerCase()===`python`}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}getPyEnv(){return this.pyenv}async initPyEnv(){if(!this.pyenv){this.pyenv=new e,await this.pyenv.init(),this.pyConnected=!0;try{let e=await this.pyenv.execCode(`import sys; sys.version.split()[0]`);this.pyVersion=e?.result||`Unknown`}catch{this.pyVersion=`Unknown`}}}async connectPython(){if(!this.pyConnecting){if(this.pyConnected)await this.showSessionTerminal();else try{this.pyConnecting=!0,await this.initPyEnv(),await this.showSessionTerminal()}catch(e){o(e instanceof Error?e.message:String(e))}finally{this.pyConnecting=!1}}}async showSessionTerminal(){await this.attachedTerminal.show()||this.editorClosed||o(`Could not open the Python terminal`)}async runScript(){if((!this.pyConnected||!this.pyenv)&&(await this.connectPython(),!this.pyenv))return;let e=this.getContent()?.trim();if(!e)o(`No content to run`);else try{let t=a(e);t.length>0&&await this.pyenv.loadPackages(t),await this.pyenv.execCode(e)}catch(e){o(e instanceof Error?e.message:String(e))}}updateEditorPackagesLine(e){let t=this.getContent()??``,n=r(t,e);n!==t&&(this.widgetRef.value?.getModel()?.setValue(n),this.markDirty(!0))}openPackageManager(){if(!this.pyConnected||!this.pyenv)return;let e=this.getContent()??``,n=a(e);t.showPackageManager({packages:n,pyenv:this.pyenv,onPackageAdded:e=>{let t=[...a(this.getContent()??``),e];this.updateEditorPackagesLine(t)},onPackageRemoved:e=>{let t=a(this.getContent()??``).filter(t=>t!==e);this.updateEditorPackagesLine(t)}})}renderToolbar(){let e=this.pyConnecting?`Connecting to Python...`:this.pyConnected?`Show Python terminal`:`Python Disconnected - Click to connect`,t=this.pyConnecting?`Connecting...`:this.pyConnected&&this.pyVersion?`Python ${this.pyVersion}`:`Not connected`,n=this.pyConnected?`var(--wa-color-green-40)`:this.pyConnecting?`var(--wa-color-warning-500)`:`var(--wa-color-red-40)`;return l`
            <wa-button
                appearance="plain"
                size="s"
                style=${f({display:`flex`,alignItems:`center`,gap:`0.5rem`})}
                ?disabled=${this.pyConnecting}
                @click=${()=>this.connectPython()}
                title=${e}
            >
                <wa-icon name="circle" label="Python status" style=${f({color:n})}></wa-icon>
                ${t}
            </wa-button>
            <wa-button
                size="s"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${()=>this.runScript()}
                title="Run Python script"
            >
                <wa-icon name="play" label="Run"></wa-icon>
                Run
            </wa-button>
            <wa-button
                size="s"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${()=>this.openPackageManager()}
                title="Manage packages"
            >
                <wa-icon name="box" label="Packages"></wa-icon>
                Packages
            </wa-button>
        `}updated(e){super.updated(e),e.has(`pyConnected`)||e.has(`pyConnecting`)||e.has(`pyVersion`)}renderContent(){return this.initialContent===void 0?l`<div class="monaco-editor-placeholder"></div>`:l`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${`python`}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${d(this.widgetRef)}
            ></docks-monaco-widget>
        `}static{this.styles=h`
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
    `}};c([m({attribute:!1})],v.prototype,`input`,void 0),c([m({type:Boolean})],v.prototype,`readOnly`,void 0),c([u()],v.prototype,`initialContent`,void 0),c([u()],v.prototype,`initialUri`,void 0),c([u()],v.prototype,`pyenv`,void 0),c([u()],v.prototype,`pyConnected`,void 0),c([u()],v.prototype,`pyConnecting`,void 0),c([u()],v.prototype,`pyVersion`,void 0),v=c([g(`docks-python-editor`)],v);