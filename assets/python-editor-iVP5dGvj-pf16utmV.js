import{L as u,J as C,y as h,a6 as g,d as y,K as v,b as f,n as d,r,t as w}from"./config-p6NjMHC3-D3NDp0il.js";import{P as m}from"./pyservice-CouhQq0D-DyQSByeW.js";import{p as P}from"./package-manager-DTcpwrMr-BaGrkPBn.js";import{p as c,c as k}from"./python-runtime-extension-DQ5UPcj8-w5-T1ZDF.js";import"./index-FX7Uqu1L.js";import"./notebook-kernel-api--RBL5TaE-2imfStcI.js";var b=Object.defineProperty,$=Object.getOwnPropertyDescriptor,a=(t,e,n,s)=>{for(var o=s>1?void 0:s?$(e,n):e,p=t.length-1,l;p>=0;p--)(l=t[p])&&(o=(s?l(e,n,o):l(o))||o);return s&&o&&b(e,n,o),o};let i=class extends u{constructor(){super(...arguments),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.pyConnected=!1,this.pyConnecting=!1,this.widgetRef=C(),this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){const t=this.input.data,e=await t.getContents();this.initialContent=e,this.initialUri=t.getName(),this.requestUpdate()}save(){const t=this.widgetRef.value?.getContent()??"";this.input?.data.saveContents(t),this.markDirty(!1)}doClose(){this.widgetRef.value?.dispose(),this.pyenv&&(this.pyenv.close(),this.pyenv=void 0),this.pyConnected=!1,this.pyVersion=void 0}getLanguage(){return"python"}isLanguage(t){return t.toLowerCase()==="python"}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(t=5){return this.widgetRef.value?.getSnippet(t)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}getPyEnv(){return this.pyenv}async initPyEnv(){if(!this.pyenv){this.pyenv=new m,await this.pyenv.init(),this.pyConnected=!0;try{const t=await this.pyenv.execCode("import sys; sys.version.split()[0]");this.pyVersion=t?.result||"Unknown"}catch{this.pyVersion="Unknown"}}}async connectPython(){if(!(this.pyConnecting||this.pyConnected))try{this.pyConnecting=!0,await this.initPyEnv()}catch(t){h(t instanceof Error?t.message:String(t))}finally{this.pyConnecting=!1}}async runScript(){if((!this.pyConnected||!this.pyenv)&&(await this.connectPython(),!this.pyenv))return;const t=this.getContent()?.trim();if(!t){h("No content to run");return}try{const e=c(t);e.length>0&&await this.pyenv.loadPackages(e),await this.pyenv.execCode(t)}catch(e){h(e instanceof Error?e.message:String(e))}}updateEditorPackagesLine(t){const e=this.getContent()??"",n=k(e,t);n!==e&&(this.widgetRef.value?.getModel()?.setValue(n),this.markDirty(!0))}openPackageManager(){if(!this.pyConnected||!this.pyenv)return;const t=this.getContent()??"",e=c(t);P.showPackageManager({packages:e,pyenv:this.pyenv,onPackageAdded:n=>{const s=[...c(this.getContent()??""),n];this.updateEditorPackagesLine(s)},onPackageRemoved:n=>{const s=c(this.getContent()??"").filter(o=>o!==n);this.updateEditorPackagesLine(s)}})}renderToolbar(){const t=this.pyConnecting?"Connecting to Python...":this.pyConnected?"Python Connected":"Python Disconnected - Click to connect",e=this.pyConnecting?"Connecting...":this.pyConnected&&this.pyVersion?`Python ${this.pyVersion}`:"Not connected",n=this.pyConnected?"var(--wa-color-green-40)":this.pyConnecting?"var(--wa-color-warning-500)":"var(--wa-color-red-40)";return y`
            <wa-button
                appearance="plain"
                size="small"
                style=${g({display:"flex",alignItems:"center",gap:"0.5rem"})}
                ?disabled=${this.pyConnecting}
                @click=${()=>this.connectPython()}
                title=${t}
            >
                <wa-icon name="circle" label="Python status" style=${g({color:n})}></wa-icon>
                ${e}
            </wa-button>
            <wa-button
                size="small"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${()=>this.runScript()}
                title="Run Python script"
            >
                <wa-icon name="play" label="Run"></wa-icon>
                Run
            </wa-button>
            <wa-button
                size="small"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${()=>this.openPackageManager()}
                title="Manage packages"
            >
                <wa-icon name="box" label="Packages"></wa-icon>
                Packages
            </wa-button>
        `}updated(t){super.updated(t),t.has("pyConnected")||t.has("pyConnecting")||t.has("pyVersion")}renderContent(){return this.initialContent===void 0?y`<div class="monaco-editor-placeholder"></div>`:y`
            <lyra-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${"python"}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${v(this.widgetRef)}
            ></lyra-monaco-widget>
        `}};i.styles=f`
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
    `;a([d({attribute:!1})],i.prototype,"input",2);a([d({type:Boolean})],i.prototype,"readOnly",2);a([r()],i.prototype,"initialContent",2);a([r()],i.prototype,"initialUri",2);a([r()],i.prototype,"pyenv",2);a([r()],i.prototype,"pyConnected",2);a([r()],i.prototype,"pyConnecting",2);a([r()],i.prototype,"pyVersion",2);i=a([w("lyra-python-editor")],i);export{i as LyraPythonEditor};
