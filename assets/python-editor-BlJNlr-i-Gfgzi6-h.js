import{Cr as e,Gt as t,Jn as n,Kt as r,P as i,Wt as a,ar as o,ir as s,kn as c,mr as l,sr as u}from"./canvas-bridge-core.js-DFQjSuZd.js";import"./widget-CD-x4Pfv.js";import{t as d}from"./pyservice-DY5XpzdI-B3vQrylD.js";import{t as f}from"./package-manager-r7SHhPMa-BV0KtFvh.js";import"./api-B52sy_xI-CCZtUfDN.js";import{n as p,t as m}from"./editor-python-run-CVvqB_8X-DalTCeOv.js";var h=class extends i{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.pyConnected=!1,this.pyConnecting=!1,this.widgetRef=a(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data,t=await e.getContents();this.initialContent=t,this.initialUri=e.getName(),this.requestUpdate()}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose(),this.pyenv&&=(this.pyenv.close(),void 0),this.pyConnected=!1,this.pyVersion=void 0}getLanguage(){return`python`}isLanguage(e){return e.toLowerCase()===`python`}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}getPyEnv(){return this.pyenv}async initPyEnv(){if(!this.pyenv){this.pyenv=new d,await this.pyenv.init(),this.pyConnected=!0;try{let e=await this.pyenv.execCode(`import sys; sys.version.split()[0]`);this.pyVersion=e?.result||`Unknown`}catch{this.pyVersion=`Unknown`}}}async connectPython(){if(!(this.pyConnecting||this.pyConnected))try{this.pyConnecting=!0,await this.initPyEnv()}catch(e){c(e instanceof Error?e.message:String(e))}finally{this.pyConnecting=!1}}async runScript(){if((!this.pyConnected||!this.pyenv)&&(await this.connectPython(),!this.pyenv))return;let e=this.getContent()?.trim();if(!e){c(`No content to run`);return}try{let t=p(e);t.length>0&&await this.pyenv.loadPackages(t),await this.pyenv.execCode(e)}catch(e){c(e instanceof Error?e.message:String(e))}}updateEditorPackagesLine(e){let t=this.getContent()??``,n=m(t,e);n!==t&&(this.widgetRef.value?.getModel()?.setValue(n),this.markDirty(!0))}openPackageManager(){if(!this.pyConnected||!this.pyenv)return;let e=this.getContent()??``,t=p(e);f.showPackageManager({packages:t,pyenv:this.pyenv,onPackageAdded:e=>{let t=[...p(this.getContent()??``),e];this.updateEditorPackagesLine(t)},onPackageRemoved:e=>{let t=p(this.getContent()??``).filter(t=>t!==e);this.updateEditorPackagesLine(t)}})}renderToolbar(){let e=this.pyConnecting?`Connecting to Python...`:this.pyConnected?`Python Connected`:`Python Disconnected - Click to connect`,t=this.pyConnecting?`Connecting...`:this.pyConnected&&this.pyVersion?`Python ${this.pyVersion}`:`Not connected`,r=this.pyConnected?`var(--wa-color-green-40)`:this.pyConnecting?`var(--wa-color-warning-500)`:`var(--wa-color-red-40)`;return l`
            <wa-button
                appearance="plain"
                size="s"
                style=${n({display:`flex`,alignItems:`center`,gap:`0.5rem`})}
                ?disabled=${this.pyConnecting}
                @click=${()=>this.connectPython()}
                title=${e}
            >
                <wa-icon name="circle" label="Python status" style=${n({color:r})}></wa-icon>
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
    `}};r([o({attribute:!1})],h.prototype,`input`,void 0),r([o({type:Boolean})],h.prototype,`readOnly`,void 0),r([s()],h.prototype,`initialContent`,void 0),r([s()],h.prototype,`initialUri`,void 0),r([s()],h.prototype,`pyenv`,void 0),r([s()],h.prototype,`pyConnected`,void 0),r([s()],h.prototype,`pyConnecting`,void 0),r([s()],h.prototype,`pyVersion`,void 0),h=r([u(`docks-python-editor`)],h);