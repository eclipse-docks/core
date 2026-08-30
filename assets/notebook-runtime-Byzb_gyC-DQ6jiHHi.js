import{f as e,m as t,p as n}from"./fs-access-Cjcg0_Me-BYL2BwWI.js";import{B as r,F as i,G as a,L as o,M as s,N as c,O as l,P as u,dt as d,ft as f,o as p,pt as m,st as h,vt as g,yt as _}from"./dist-bIYJ7gqD.js";import{n as v,r as y,t as b}from"./notebook-metadata-0H6O-S7p-hSMBhMdC.js";var x=t(`NotebookRuntime`),S=class extends p{constructor(...e){super(...e),this.cellOutputs=new Map,this.executingCells=new Set,this.availableKernels=[],this.selectedKernelId=null,this.kernel=null,this.kernelConnected=!1,this.kernelConnecting=!1,this.kernelVersion=void 0,this.editingMarkdownCells=new Set,this.executionCounter=0,this.isRunningAll=!1,this.highlightedCellIndex=-1,this.focusedCellIndex=-1,this.cancelRunAll=!1,this.cellWidgetRefs=new Map,this.cellHeights=new Map}doClose(){this.input=void 0,this.notebook=void 0,this.cellOutputs.clear(),this.executingCells.clear(),this.cellWidgetRefs.clear(),this.cellHeights.clear(),this.focusedCellIndex=-1,this.unsubscribeContributionsToken&&=(n(this.unsubscribeContributionsToken),void 0),this.kernel?.close&&Promise.resolve(this.kernel.close()),this.kernel=null,this.kernelConnected=!1,this.kernelVersion=void 0}async save(){if(!(!this.notebook||!this.input))try{this.saveEditorContents(),this.notebook.cells.forEach((e,t)=>{if(e.cell_type===`code`){let n=this.cellOutputs.get(t);e.outputs=n?this.convertOutputToJupyter(n,e.execution_count):[]}});let e=JSON.stringify(this.notebook,null,2);await this.input.data.saveContents(e),this.markDirty(!1)}catch(e){throw console.error(`Failed to save notebook:`,e),e}}doBeforeUI(){this.loadNotebook()}async onKernelDropdownSelect(e){let t=(e.detail?.item?.value??``)||null;if(this.selectedKernelId!==t){if(this.kernel?.close&&Promise.resolve(this.kernel.close()),this.kernel=null,this.kernelConnected=!1,this.kernelVersion=void 0,this.selectedKernelId=t,this.notebook){let e=this.availableKernels.find(e=>e.id===t);this.notebook.metadata=v(this.notebook.metadata,e)}this.cellOutputs.clear(),this.executionCounter=0,this.notebook?.cells?.forEach(e=>{e.cell_type===`code`&&(e.execution_count=null,e.outputs=[])}),this.resetCellState(),await this.ensureKernelLoaded(),this.requestUpdate()}}renderToolbar(){let e=this.availableKernels;e.length;let t=this.selectedKernelId?e.find(e=>e.id===this.selectedKernelId)?.label??this.selectedKernelId:`Select kernel`,n=this.kernelConnecting?`Connecting...`:this.kernelConnected?`Kernel connected`:`Kernel disconnected`,r=this.kernelConnecting?`Connecting...`:this.kernelConnected?this.kernelVersion??`Connected`:`Not connected`,i=this.kernelConnected?`var(--wa-color-green-40)`:this.kernelConnecting?`var(--wa-color-warning-500)`:`var(--wa-color-red-40)`,a=this.isRunningAll?g`
            <wa-button size="s" appearance="plain" @click=${()=>this.cancelAllCells()} title="Cancel running all cells">
                <wa-icon name="stop" label="Stop"></wa-icon>
                Cancel All
            </wa-button>
        `:g`
            <wa-button size="s" appearance="plain" @click=${()=>this.runAllCells()} title="Run all code cells sequentially">
                <wa-icon name="play" label="Run"></wa-icon>
                Run All
            </wa-button>
        `;return g`
            <wa-dropdown
                class="kernel-select"
                placement="bottom-start"
                distance="4"
                size="s"
                @wa-select=${e=>void this.onKernelDropdownSelect(e)}
            >
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="s"
                    with-caret
                    title="Notebook kernel"
                >
                    ${t}
                </wa-button>
                ${e.map(e=>g`
                        <wa-dropdown-item
                            value=${e.id}
                            type="checkbox"
                            ?checked=${e.id===this.selectedKernelId}
                        >
                            ${e.label}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
            ${a}
            <wa-button
                size="s"
                appearance="plain"
                @click=${()=>this.clearAllOutputs()}
                title="Clear all outputs and reset execution counter"
            >
                <wa-icon name="eraser" label="Clear"></wa-icon>
                Clear Outputs
            </wa-button>
            ${this.kernel?.restart?g`
                <wa-button
                    size="s"
                    appearance="plain"
                    @click=${()=>void this.restartKernel()}
                    title="Restart kernel"
                    ?disabled=${!this.kernelConnected||this.kernelConnecting}
                >
                    <wa-icon name="arrows-rotate" label="Restart"></wa-icon>
                    Restart Kernel
                </wa-button>
            `:``}
            ${this.kernel?.openPackageManager?g`
                <wa-button
                    size="s"
                    appearance="plain"
                    @click=${()=>this.openPackageManager()}
                    title="Manage packages"
                >
                    <wa-icon name="box" label="Packages"></wa-icon>
                    Packages
                </wa-button>
            `:``}
            ${this.kernel?this.kernel.connect?g`
                <wa-button
                    appearance="plain"
                    size="s"
                    style="display: flex; align-items: center; gap: 0.5rem;"
                    ?disabled=${this.kernelConnecting}
                    @click=${()=>void this.connectKernel()}
                    title=${n}
                >
                    <wa-icon name="circle" label="Kernel status" style=${h({color:i})}></wa-icon>
                    ${r}
                </wa-button>
            `:g`
                <span style="display: flex; align-items: center; gap: 0.5rem;" title=${n}>
                    <wa-icon name="circle" label="Kernel status" style=${h({color:i})}></wa-icon>
                    ${r}
                </span>
            `:``}
        `}async connectKernel(){if(!(this.kernelConnecting||!this.kernel?.connect))try{this.kernelConnecting=!0,this.requestUpdate(),await this.connectKernelWithRequiredPackages(this.kernel),this.kernelConnected=!0,this.kernel.getVersion&&(this.kernelVersion=await this.kernel.getVersion())}catch(e){x.error(`Failed to connect kernel`,e)}finally{this.kernelConnecting=!1,this.requestUpdate()}}async doInitUI(){this.unsubscribeContributionsToken=e(r,e=>{e?.target===`system.notebookkernels`&&this.refreshKernels()}),await this.refreshKernels()}resolveDefaultKernelId(e){if(!e.length)return null;let t=y(this.notebook?.metadata,e);if(t)return t;let n=e.find(e=>e.id===`python`);if(n)return n.id;let r=e.find(e=>e.id===`javascript`);return r?r.id:e[0].id}async refreshKernels(){let e=a.getContributions(b);if(this.availableKernels=e,!this.selectedKernelId&&e.length&&(this.selectedKernelId=this.resolveDefaultKernelId(e),this.notebook&&this.selectedKernelId)){let t=e.find(e=>e.id===this.selectedKernelId);this.notebook.metadata=v(this.notebook.metadata,t)}this.selectedKernelId&&!e.some(e=>e.id===this.selectedKernelId)&&(this.selectedKernelId=e.length?e[0].id:null),this.requestUpdate(),await this.ensureKernelLoaded()}async ensureKernelLoaded(){let e=this.selectedKernelId;if(!e)return;if(this.kernel?.id===e){if(!this.kernel.connect)return;try{this.kernelConnecting=!0,this.requestUpdate(),await this.connectKernelWithRequiredPackages(this.kernel),this.kernelConnected=!0,this.kernel.getVersion&&(this.kernelVersion=await this.kernel.getVersion())}catch(t){x.error(`Failed to reconnect kernel with required packages`,e,t)}finally{this.kernelConnecting=!1,this.requestUpdate()}return}this.kernel?.close&&Promise.resolve(this.kernel.close()),this.kernel=null,this.kernelConnected=!1,this.kernelVersion=void 0;let t=this.availableKernels.find(t=>t.id===e);if(t)try{this.kernelConnecting=!0,this.requestUpdate();let n=await t.loadKernel();if(this.selectedKernelId!==e)return;this.kernel=n,n.connect&&await this.connectKernelWithRequiredPackages(n),this.kernelConnected=!0,n.getVersion&&(this.kernelVersion=await n.getVersion())}catch(t){x.error(`Failed to load kernel`,e,t)}finally{this.kernelConnecting=!1,this.requestUpdate()}}async loadNotebook(){let e=await this.input.data.getContents();try{this.notebook=JSON.parse(e)}catch(e){console.error(`Failed to parse notebook:`,e),this.notebook={cells:[{cell_type:`markdown`,source:[`# Error
Failed to parse notebook file.`]}]}}if(this.selectedKernelId=null,this.notebook?.cells){let e=this.notebook.cells.filter(e=>e.cell_type===`code`).map(e=>e.execution_count??0).reduce((e,t)=>Math.max(e,t),0);this.executionCounter=e,this.notebook.cells.forEach((e,t)=>{if(e.cell_type===`code`&&e.outputs&&e.outputs.length>0){let n=this.convertOutputFromJupyter(e.outputs[0]);n&&this.cellOutputs.set(t,n)}})}this.refreshKernels()}getCellSource(e){return Array.isArray(e.source)?e.source.join(``):e.source}convertOutputToJupyter(e,t){if(e.type===`execute_result`){let n={};return e.imageData&&(n[`image/png`]=e.imageData),e.data&&(n[`text/plain`]=e.data),[{output_type:`execute_result`,data:n,execution_count:t,metadata:{}}]}return e.type===`error`?[{output_type:`error`,ename:`Error`,evalue:e.data,traceback:[e.data]}]:[]}convertOutputFromJupyter(e){return e.output_type===`execute_result`&&e.data?{type:`execute_result`,data:e.data[`text/plain`]||``,imageData:e.data[`image/png`]||void 0}:e.output_type===`error`?{type:`error`,data:e.evalue||e.traceback?.join(`
`)||`Unknown error`}:null}renderHeaderActions(e,t){return g`
            <div class="cell-header-actions">
                ${t||``}
                ${t?g`<span class="divider"></span>`:``}
                <wa-button size="s" appearance="plain" @click=${()=>this.addCell(e,`code`)} title="Add code cell before">
                    <wa-icon name="plus"></wa-icon>
                    <wa-icon name="code" label="Code"></wa-icon>
                </wa-button>
                <wa-button size="s" appearance="plain" @click=${()=>this.addCell(e,`markdown`)} title="Add markdown cell before">
                    <wa-icon name="plus"></wa-icon>
                    <wa-icon name="font" label="Markdown"></wa-icon>
                </wa-button>
                <span class="divider"></span>
                <wa-button size="s" appearance="plain" @click=${()=>this.deleteCell(e)} title="Delete cell" ?disabled=${this.notebook.cells.length<=1}>
                    <wa-icon name="trash" label="Delete cell"></wa-icon>
                </wa-button>
            </div>
        `}renderFooterActions(e){return g`
            <div class="cell-footer">
                <wa-button size="s" appearance="plain" @click=${()=>this.addCell(e+1,`code`)} title="Add code cell after">
                    <wa-icon name="code" label="Code"></wa-icon>
                    <wa-icon name="plus"></wa-icon>
                </wa-button>
                <wa-button size="s" appearance="plain" @click=${()=>this.addCell(e+1,`markdown`)} title="Add markdown cell after">
                    <wa-icon name="font" label="Markdown"></wa-icon>
                    <wa-icon name="plus"></wa-icon>
                </wa-button>
            </div>
        `}stringToSourceArray(e){if(!e)return[``];let t=e.split(`
`).map(e=>e+`
`);return t.length>0&&(t[t.length-1]=t[t.length-1].replace(/\n$/,``)),t}createCell(e){let t={cell_type:e,source:[``],metadata:{}};return e===`code`&&(t.execution_count=null,t.outputs=[]),t}async executeCell(e){let t=this.notebook.cells[e];if(t.cell_type===`code`){this.executingCells.add(e),this.requestUpdate();try{await this.ensureKernelLoaded();let n=this.kernel;if(!n){this.executingCells.has(e)&&this.cellOutputs.set(e,{type:`error`,data:`No kernel selected`});return}let r=this.getCellWidgetRef(e).value,i=r&&typeof r.getContent==`function`?r.getContent():this.getCellSource(t);if(i==null)return;let a=await n.execute(i);a.error?this.cellOutputs.set(e,{type:`error`,data:a.error}):this.cellOutputs.set(e,{type:`execute_result`,data:a.data,imageData:a.imageData}),this.executionCounter++,t.execution_count=this.executionCounter,this.markDirty(!0)}catch(t){this.executingCells.has(e)&&this.cellOutputs.set(e,{type:`error`,data:t instanceof Error?t.message:String(t)})}finally{this.executingCells.delete(e),this.requestUpdate()}}}cancelExecution(e){this.kernel?.interrupt?this.kernel.interrupt():(this.cellOutputs.set(e,{type:`error`,data:`Cancellation not supported for this kernel`}),this.executingCells.delete(e),this.requestUpdate())}clearAllOutputs(){this.cellOutputs.clear(),this.executionCounter=0,this.notebook?.cells&&this.notebook.cells.forEach(e=>{e.cell_type===`code`&&(e.execution_count=null,e.outputs=[])}),this.markDirty(!0),this.requestUpdate()}async restartKernel(){if(!(!this.kernel?.restart||this.kernelConnecting))try{this.kernelConnecting=!0,this.requestUpdate(),await this.kernel.restart(),this.kernelConnected=!0,this.kernel.getVersion&&(this.kernelVersion=await this.kernel.getVersion())}catch(e){x.error(`Failed to restart kernel`,e)}finally{this.kernelConnecting=!1,this.requestUpdate()}}async runAllCells(){if(this.notebook?.cells){this.isRunningAll=!0,this.cancelRunAll=!1,this.requestUpdate();try{for(let e=0;e<this.notebook.cells.length&&!this.cancelRunAll;e++)this.notebook.cells[e].cell_type===`code`&&await this.executeCell(e)}finally{this.isRunningAll=!1,this.cancelRunAll=!1,this.requestUpdate()}}}cancelAllCells(){this.cancelRunAll=!0,this.kernel?.interrupt?.()}toggleMarkdownEdit(e){this.editingMarkdownCells.has(e)?this.editingMarkdownCells.delete(e):this.editingMarkdownCells.add(e),this.requestUpdate()}saveMarkdownEdit(e,t){let n=t.target.value;if(this.notebook&&this.notebook.cells[e]){let t=this.notebook.cells[e],r=this.getCellSource(t);t.source=this.stringToSourceArray(n),r!==n&&this.markDirty(!0)}this.editingMarkdownCells.delete(e),this.requestUpdate()}renderMarkdownCell(e,t){let n=this.getCellSource(e),r=!n||n.trim()===``;if(this.editingMarkdownCells.has(t)){let e=g`
                <wa-button 
                    size="s" 
                    appearance="plain"
                    @click=${e=>{let n=e.target.closest(`.markdown-cell`)?.querySelector(`textarea`);n&&this.saveMarkdownEdit(t,{target:n})}}
                    title="Save changes">
                    <wa-icon name="check" label="Save"></wa-icon>
                </wa-button>
                <wa-button 
                    size="s" 
                    appearance="plain"
                    @click=${()=>this.toggleMarkdownEdit(t)}
                    title="Cancel editing">
                    <wa-icon name="xmark" label="Cancel"></wa-icon>
                </wa-button>
            `;return g`
                <div class="cell-wrapper">
                    <wa-animation 
                        name="bounce" 
                        duration="1000" 
                        iterations="1"
                        ?play=${this.highlightedCellIndex===t}
                        @wa-finish=${()=>this.highlightedCellIndex=-1}>
                        <div class="cell markdown-cell editing">
                            <div class="cell-header">
                                ${this.renderHeaderActions(t,e)}
                                <span class="cell-label">Markdown</span>
                            </div>
                            <textarea 
                                class="markdown-editor"
                                .value=${n}
                                @blur=${e=>this.saveMarkdownEdit(t,e)}
                                placeholder="Enter markdown content here... (# for headings, ** for bold, etc.)"></textarea>
                            ${this.renderFooterActions(t)}
                        </div>
                    </wa-animation>
                </div>
            `}let i=l(n),a=g`
            <wa-button 
                size="s" 
                appearance="plain"
                @click=${()=>this.toggleMarkdownEdit(t)}
                title="Edit markdown">
                <wa-icon name="pencil" label="Edit"></wa-icon>
            </wa-button>
        `;return g`
            <div class="cell-wrapper">
                <wa-animation 
                    name="bounce" 
                    duration="1000" 
                    iterations="1"
                    ?play=${this.highlightedCellIndex===t}
                    @wa-finish=${()=>this.highlightedCellIndex=-1}>
                    <div class="cell markdown-cell ${r?`empty`:``}" @dblclick=${()=>this.toggleMarkdownEdit(t)}>
                        <div class="cell-header">
                            ${this.renderHeaderActions(t,a)}
                            <span class="cell-label"></span>
                        </div>
                        <div class="cell-content">
                            ${r?g`
                                <div class="markdown-placeholder">
                                    <wa-icon name="font" label="Markdown"></wa-icon>
                                    <span>Double-click or click the pencil icon to edit markdown</span>
                                </div>
                            `:o(i)}
                        </div>
                        ${this.renderFooterActions(t)}
                    </div>
                </wa-animation>
            </div>
        `}renderCodeCell(e,t){let n=this.cellOutputs.get(t),r=this.executingCells.has(t),i=this.getCellSource(e),a=this.kernel?.language??`javascript`,o=`${(this.input?.data)?.getWorkspacePath?.()??`notebook`}-cell-${t}`,s=this.cellHeights.get(t)??Math.max(100,i.split(`
`).length*19+10),c=r?g`
            <wa-button 
                size="s" 
                appearance="plain"
                @click=${()=>this.cancelExecution(t)}
                title="Stop execution">
                <wa-icon name="stop" label="Stop" style="color: var(--wa-color-danger-500);"></wa-icon>
            </wa-button>
        `:g`
            <docks-command 
                cmd="notebook.runCell"
                icon="play"
                title="Run cell"
                size="s"
                appearance="plain"
                .params=${{cellIndex:t}}>
            </docks-command>
        `;return g`
            <div class="cell-wrapper">
                <wa-animation 
                    name="bounce" 
                    duration="1000" 
                    iterations="1"
                    ?play=${this.highlightedCellIndex===t}
                    @wa-finish=${()=>this.highlightedCellIndex=-1}>
                    <div class="cell code-cell ${r?`executing`:``}">
                        <div class="cell-header">
                            <span class="cell-label">
                                ${r?g`
                                    In [<wa-animation name="pulse" duration="1000" iterations="Infinity" ?play=${r}>
                                        <span class="executing-indicator">*</span>
                                    </wa-animation>]
                                `:g`
                                    In [${e.execution_count??` `}]
                                `}
                            </span>
                            ${this.renderHeaderActions(t,c)}
                        </div>
                        <div
                            class="cell-input monaco-container"
                            style=${h({height:`${s}px`})}
                            @wheel=${e=>this.onCellWheel(t,e)}
                        >
                            <docks-monaco-widget
                                .value=${i}
                                .language=${a}
                                .uri=${o}
                                ?autoLayout=${!0}
                                @content-change=${()=>this.markDirty(!0)}
                                @editor-focus=${()=>{this.focusedCellIndex=t}}
                                @editor-blur=${()=>{this.focusedCellIndex===t&&(this.focusedCellIndex=-1)}}
                                @content-height-changed=${e=>this.onCellHeightChange(t,e.detail.height)}
                                ${u(this.getCellWidgetRef(t))}
                            ></docks-monaco-widget>
                        </div>
                        ${n?g`
                            <div class="cell-output ${n.type===`error`?`output-error`:``}">
                                <div class="output-label">Out [${t+1}]:</div>
                                ${n.imageData?g`
                                    <img src="data:image/png;base64,${n.imageData}" alt="Output image" class="output-image" />
                                `:``}
                                ${n.data?g`<pre><code>${n.data}</code></pre>`:``}
                            </div>
                        `:``}
                        ${this.renderFooterActions(t)}
                    </div>
                </wa-animation>
            </div>
        `}renderCell(e,t){if(e.cell_type===`markdown`)return this.renderMarkdownCell(e,t);if(e.cell_type===`code`)return this.renderCodeCell(e,t);{let t=this.getCellSource(e);return g`
                <div class="cell raw-cell">
                    <pre><code>${t}</code></pre>
                </div>
            `}}addCell(e,t=`code`){this.notebook&&(this.saveEditorContents(),this.shiftIndices(e,`up`),this.notebook.cells.splice(e,0,this.createCell(t)),t===`markdown`&&this.editingMarkdownCells.add(e),this.resetCellState(),this.highlightedCellIndex=e,this.updateComplete.then(()=>{this.scrollToCell(e)}))}scrollToCell(e){let t=this.shadowRoot?.querySelectorAll(`.cell-wrapper`)[e];if(!t)return;let n=this.closest(`wa-scroller`);if(!n){t.scrollIntoView({behavior:`smooth`,block:`center`,inline:`nearest`});return}let r=n.getBoundingClientRect(),i=t.getBoundingClientRect(),a=n.scrollTop+(i.top-r.top)-r.height/2+i.height/2;n.scrollTo({top:a,behavior:`smooth`})}saveEditorContents(){this.notebook?.cells.forEach((e,t)=>{if(e.cell_type!==`code`)return;let n=this.getCellWidgetRef(t).value,r=n&&typeof n.getContent==`function`?n.getContent():void 0;r!=null&&(e.source=this.stringToSourceArray(r))})}resetCellState(){this.markDirty(!0)}deleteCell(e){!this.notebook||this.notebook.cells.length<=1||(this.saveEditorContents(),this.cellOutputs.delete(e),this.executingCells.delete(e),this.editingMarkdownCells.delete(e),this.notebook.cells.splice(e,1),this.shiftIndices(e,`down`),this.resetCellState())}shiftIndices(e,t){let n=t===`up`?1:-1,r=t===`up`?t=>t>=e:t=>t>e,i=t===`up`?(e,t)=>t-e:(e,t)=>e-t,a=e=>{Array.from(e.keys()).filter(r).sort(i).forEach(t=>{let r=e.get(t);e.delete(t),e.set(t+n,r)})},o=e=>{Array.from(e).filter(r).sort(i).forEach(t=>{e.delete(t),e.add(t+n)})};a(this.cellOutputs),o(this.executingCells),o(this.editingMarkdownCells),a(this.cellWidgetRefs),a(this.cellHeights)}getCellWidgetRef(e){return this.cellWidgetRefs.has(e)||this.cellWidgetRefs.set(e,c()),this.cellWidgetRefs.get(e)}onCellHeightChange(e,t){let n=Math.max(100,t+10);this.cellHeights.get(e)!==n&&(this.cellHeights=new Map(this.cellHeights),this.cellHeights.set(e,n),this.requestUpdate(),this.updateComplete.then(()=>this.getCellWidgetRef(e).value?.layout?.()))}onCellWheel(e,t){let n=this.getCellWidgetRef(e).value?.getEditor();if(!n)return;let r=n.getScrollTop(),i=n.getScrollHeight(),a=n.getContentHeight(),o=i>a,s=t.deltaY<0&&r<=0||t.deltaY>0&&r+a>=i;(!o||s)&&t.stopImmediatePropagation()}openPackageManager(){if(!this.kernel?.openPackageManager)return;let e=this.notebook?.metadata?.required_packages??[];this.kernel.openPackageManager({requiredPackages:e,onPackageAdded:e=>{this.notebook&&(this.notebook.metadata||(this.notebook.metadata={}),this.notebook.metadata.required_packages||(this.notebook.metadata.required_packages=[]),this.notebook.metadata.required_packages.includes(e)||(this.notebook.metadata.required_packages.push(e),this.markDirty(!0),this.syncKernelPackages()))},onPackageRemoved:e=>{if(!this.notebook?.metadata?.required_packages)return;let t=this.notebook.metadata.required_packages.indexOf(e);t>-1&&(this.notebook.metadata.required_packages.splice(t,1),this.markDirty(!0),this.syncKernelPackages())}})}async connectKernelWithRequiredPackages(e){e.connect&&await e.connect({requiredPackages:this.notebook?.metadata?.required_packages??[]})}async syncKernelPackages(){if(this.kernel?.connect)try{await this.connectKernelWithRequiredPackages(this.kernel)}catch(e){x.error(`Failed to sync kernel packages`,e)}}updated(e){super.updated(e),e.has(`kernelConnected`)||e.has(`kernelConnecting`)||e.has(`kernelVersion`)||e.has(`isRunningAll`)||e.has(`availableKernels`)||e.has(`selectedKernelId`)}renderContent(){return this.notebook?g`
            <div class="noteboocells">
                ${s(this.notebook.cells,(e,t)=>t,(e,t)=>this.renderCell(e,t))}
            </div>
        `:g`<div class="loading">Loading notebook...</div>`}static{this.styles=_`
        :host {
            display: block;
            width: 100%;
        }

        .kernel-select {
            max-width: 10rem;
        }

        .noteboocells {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            width: 100%;
            box-sizing: border-box;
        }

        .cell-wrapper {
            position: relative;
        }

        .cell {
            border-radius: 4px;
            overflow: hidden;
            opacity: 0.9;
            position: relative;
        }

        .cell-header-actions {
            display: flex;
            gap: 0.25rem;
            align-items: center;
            opacity: 0.5;
            transition: opacity 0.2s;
        }

        .cell-header-actions .divider {
            width: 1px;
            height: 1rem;
            background: var(--wa-color-outline);
            margin: 0 0.25rem;
            opacity: 0.5;
        }

        .cell-header:hover .cell-header-actions {
            opacity: 1;
        }

        .cell-footer {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: flex-start;
            padding: 0.5rem;
            border-top: 1px solid var(--wa-color-outline);
            opacity: 0.5;
            transition: opacity 0.2s;
        }

        .cell-footer:hover {
            opacity: 1;
        }

        .markdown-cell {
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .markdown-cell:hover:not(.editing) {
            opacity: 0.9;
        }
        
        .markdown-cell .cell-content {
            padding: 1rem;
        }

        .markdown-cell.editing {
            cursor: default;
            padding: 0;
        }
        
        .markdown-cell.editing .cell-actions {
            display: none;
        }

        .markdown-editor {
            width: 100%;
            min-height: 200px;
            padding: 1rem;
            font-family: monospace;
            font-size: 0.95rem;
            line-height: 1.6;
            border: none;
            outline: none;
            resize: vertical;
            background: transparent;
            color: inherit;
        }

        .code-cell {
            border-left: 3px solid var(--wa-color-primary-500);
            transition: all 0.3s ease;
        }
        
        .code-cell.executing {
            border-left: 4px solid var(--wa-color-primary-500);
            box-shadow: 0 0 0 2px var(--wa-color-primary-500, rgba(59, 130, 246, 0.3));
            animation: pulse-cell 2s ease-in-out infinite;
        }
        
        @keyframes pulse-cell {
            0%, 100% {
                box-shadow: 0 0 0 2px var(--wa-color-primary-500, rgba(59, 130, 246, 0.3));
                opacity: 1;
            }
            50% {
                box-shadow: 0 0 0 4px var(--wa-color-primary-500, rgba(59, 130, 246, 0.5));
                opacity: 0.95;
            }
        }

        .cell-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            flex-wrap: nowrap;
        }

        .cell-label {
            font-family: monospace;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        .executing-indicator {
            display: inline-block;
            color: var(--wa-color-primary-500);
            font-weight: bold;
            font-size: 1.2em;
        }

        .cell-input {
            margin: 0;
        }

        .monaco-container {
            min-height: 100px;
            height: auto;
            width: 100%;
        }

        .cell-output {
            padding: 1rem;
        }

        .output-label {
            font-family: monospace;
            font-weight: bold;
            margin-bottom: 0.5rem;
            opacity: 0.7;
        }

        .cell-output pre {
            margin: 0;
            overflow-x: auto;
        }

        .cell-output code {
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .output-image {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0.5rem 0;
            border-radius: 4px;
        }

        .output-error {
            border-left: 3px solid var(--wa-color-danger-500);
        }

        .raw-cell {
            padding: 1rem;
        }

        .raw-cell pre {
            margin: 0;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 1.2rem;
        }

        .markdown-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 3rem 1rem;
            opacity: 0.5;
            font-style: italic;
            transition: opacity 0.2s;
        }

        .markdown-cell.empty:hover .markdown-placeholder {
            opacity: 0.8;
        }

        .markdown-placeholder wa-icon {
            font-size: 1.5rem;
        }
    `}};i([f({attribute:!1})],S.prototype,`input`,void 0),i([d()],S.prototype,`notebook`,void 0),i([d()],S.prototype,`cellOutputs`,void 0),i([d()],S.prototype,`executingCells`,void 0),i([d()],S.prototype,`availableKernels`,void 0),i([d()],S.prototype,`selectedKernelId`,void 0),i([d()],S.prototype,`kernel`,void 0),i([d()],S.prototype,`kernelConnected`,void 0),i([d()],S.prototype,`kernelConnecting`,void 0),i([d()],S.prototype,`kernelVersion`,void 0),i([d()],S.prototype,`editingMarkdownCells`,void 0),i([d()],S.prototype,`executionCounter`,void 0),i([d()],S.prototype,`isRunningAll`,void 0),i([d()],S.prototype,`highlightedCellIndex`,void 0),i([d()],S.prototype,`cellHeights`,void 0),S=i([m(`docks-notebook-editor`)],S);export{S as DocksNotebookEditor};