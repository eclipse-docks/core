import{Bt as e,Cn as t,Jt as n,Q as r,Ut as i,Zt as a,_n as o,bn as s,en as c,ft as l,gn as u,in as d,ln as f,mn as p,pt as m,qt as ee,rn as h,un as g,xn as _}from"./canvas-bridge-core.js-DfVkBxCr.js";import{E as v,S as y,T as b,_ as x,a as S,h as C,i as te,p as w,w as T,x as E,y as D}from"./canvas-bridge-canvas.js-DrvOvBhU.js";import{d as O,l as k,o as A}from"./runtime-BJlEES2l-DUe1qmxI.js";import"./api-Dsa-NrxT.js";var j=_(`HowToService`),M=`system.howtos`,N=new class{constructor(){this.contributions=new Map,this.loadContributions(),b(h,e=>{e.target===`system.howtos`&&this.loadContributions()})}loadContributions(){let e=g.getContributions(M);this.contributions.clear();for(let t of e){if(!t.id){j.warn(`HowTo contribution missing id, skipping`);continue}if(t.label||=typeof t.title==`function`?t.title():t.title,!t.steps||t.steps.length===0){j.warn(`HowTo contribution "${t.id}" has no steps, skipping`);continue}let e=new Set;for(let n of t.steps){if(e.has(n.id)){j.warn(`HowTo contribution "${t.id}" has duplicate step ID: "${n.id}"`);continue}e.add(n.id)}this.contributions.set(t.id,t);let n=typeof t.title==`function`?t.title():t.title;j.debug(`Loaded HowTo contribution: ${n} (${t.id})`)}j.info(`Loaded ${this.contributions.size} HowTo contributions`)}getContribution(e){return this.contributions.get(e)}getAllContributions(){return Array.from(this.contributions.values())}getContributionsByCategory(e){return Array.from(this.contributions.values()).filter(t=>t.category===e)}hasContribution(e){return this.contributions.has(e)}},P=`welcome.txt`;async function F(){if(!await a.getWorkspace())return null;let e=await a.getFolders();return e.length===0?null:`${e[0].name}/${P}`}function I(e){return e&&typeof e.getFilePath==`function`}async function L(){return a.isConnected()}async function R(){let e=await F();if(!e)return!1;let t=await a.getWorkspace();if(!t)return!1;try{return await t.getResource(e)instanceof i}catch{return!1}}function z(){let e=d.get();if(!e||!I(e))return!1;let t=e.getFilePath();return t===P||t?.endsWith(`/welcome.txt`)===!0}function B(){if(!z())return!1;let e=d.get();return e?e.isDirty()===!1:!1}function V(){return!z()}function H(){return l.getCurrentApp()?.name||`AppSpace`}g.registerContribution(M,{id:`docks.onboarding`,title:()=>`Welcome to ${H()}`,description:()=>`Get started with ${H()} by learning the basics of workspace and file management`,icon:`graduation-cap`,label:``,category:`Getting Started`,initialize:e=>{let t=[];return b(ee,()=>{e.requestUpdate()}),b(n,()=>{e.requestUpdate()}),t.push(s(d,()=>{e.requestUpdate()})),t.push(s(p,()=>{e.requestUpdate()})),()=>{t.forEach(e=>e())}},steps:[{id:`create-text-file`,title:`Create welcome.txt`,description:`Create a new text file called "welcome.txt" in your workspace. If you don't have a workspace selected, choose one first.`,preCondition:async()=>await L(),postCondition:async()=>await R(),command:`touch`,commandParams:async()=>{let e=await F();return e?{path:e,contents:`Welcome to AppSpace!

This is your first file. You can edit it and save your changes.`}:{}}},{id:`open-text-file`,title:`Open welcome.txt`,description:`Open the "welcome.txt" file in the editor.`,preCondition:async()=>await R(),postCondition:()=>z(),command:`open_editor`,commandParams:async()=>{let e=await F();return e?{path:e}:{}}},{id:`edit-and-save`,title:`Type something and save`,description:`Type some text in the editor to modify the file, then save it using Ctrl+S or the save button.`,preCondition:()=>z(),postCondition:()=>B()},{id:`close-text-file`,title:`Close the file`,description:`Close the editor tab by clicking the X button on the tab.`,preCondition:()=>z(),postCondition:()=>V()}]});function U(){let e=d.get();return e?e.input?.key===`.system.cognitive-ai-settings`||(e.tagName||e.localName||``).toLowerCase()===`docks-cognitive-settings-editor`:!1}async function W(){try{await O.whenReady();let e=O.getProvidersSettings();if(!e.defaultProviderId)return!1;let t=e.providers.find(t=>t.id===e.defaultProviderId);return t?.enabled?t.apiKey.trim()?!0:/ollama|webllm|localhost|127\.0\.0\.1/i.test(`${t.id} ${t.baseUrl}`):!1}catch{return!1}}function G(){let e=d.get();return!e||!U()?!1:e.isDirty?.()===!0}function ne(){return U()&&!G()}function re(){return!U()}async function ie(){try{await O.whenReady();for(let e of O.sessions.list())if(e.history.some(e=>e.role===`user`&&e.parts.some(e=>e.type===`text`&&e.text.trim()!==``)))return!0;return!1}catch{return!1}}function K(){return l.getCurrentApp()?.name||`AppSpace`}var ae={id:`docks.ai-setup`,title:()=>`Set up AI in ${K()}`,description:()=>`Configure an LLM provider to enable AI chat features in ${K()}`,icon:`robot`,label:``,category:`Getting Started`,initialize:e=>{let t=[];t.push(s(d,()=>e.requestUpdate())),t.push(s(p,()=>e.requestUpdate()));let n=b(k.providersChanged,()=>e.requestUpdate()),r=b(k.sessionChanged,()=>e.requestUpdate());return t.push(()=>v(n),()=>v(r)),()=>{t.forEach(e=>e())}},steps:[{id:`open-ai-settings`,title:`Open AI Settings`,description:`Open the AI settings editor from the chat gear menu or the command palette.`,preCondition:()=>!0,postCondition:()=>U(),command:A},{id:`configure-llm-provider`,title:`Configure LLM Provider`,description:`Select a provider as default and enter an API key when required. Save your changes.`,preCondition:()=>U(),postCondition:async()=>{let e=await W(),t=ne();return e&&t}},{id:`save-and-close`,title:`Save and Close`,description:`Save your changes (if not already saved) and close the AI settings editor tab.`,preCondition:()=>U(),postCondition:()=>re()},{id:`type-in-chat`,title:`Type in Chat`,description:`Open the AI chat view and type a message to test your AI configuration.`,preCondition:async()=>await W(),postCondition:async()=>await ie()}]};g.registerContribution(M,ae);var q=`howto/show-panel`,J=`howto/toggle-panel`,Y=`howto-panel`,X={x:100,y:100},Z={width:400,height:300},Q=class extends c{constructor(...e){super(...e),this.contributions=[],this.activeContributionId=null,this.stepStates=new Map,this.isMinimized=!1,this.isVisible=!1,this.positionX=X.x,this.positionY=X.y,this.isDragging=!1,this.dragPreviewPosition=null,this.dragStartPosition={x:0,y:0},this.panelRef=te(),this.handleDragStart=e=>{let t=e.target;if(this.isDragTarget(t)||!this.panelRef.value)return;let n=this.panelRef.value.getBoundingClientRect();this.dragStartPosition={x:e.clientX-n.left,y:e.clientY-n.top},this.isDragging=!0,this.dragPreviewPosition={x:this.positionX,y:this.positionY},this.requestUpdate(),e.preventDefault(),e.stopPropagation()},this.handleDragMove=e=>{if(!this.isDragging||!this.dragPreviewPosition)return;let t=this.getViewportBounds(),n=Math.max(0,Math.min(e.clientX-this.dragStartPosition.x,t.maxX)),r=Math.max(0,Math.min(e.clientY-this.dragStartPosition.y,t.maxY));(this.dragPreviewPosition.x!==n||this.dragPreviewPosition.y!==r)&&(this.dragPreviewPosition={x:n,y:r},this.requestUpdate())},this.handleDragEnd=async()=>{if(!this.isDragging||!this.dragPreviewPosition)return;this.isDragging=!1;let e=this.dragPreviewPosition;this.dragPreviewPosition=null,this.positionX=e.x,this.positionY=e.y,await this.saveSettings(),this.requestUpdate()}}async doBeforeUI(){if(this.loadContributions(),b(h,e=>{e.target===`system.howtos`&&(this.loadContributions(),this.requestUpdate())}),b(q,()=>this.showPanel()),b(J,()=>this.toggleVisibility()),await this.loadSettings(),!a.isConnected()&&this.isVisible===!1){let e=await m.getDialogSetting(Y);(!e||e.visible===void 0)&&(this.isVisible=!0,await this.saveSettings())}b(n,()=>{(async()=>{let e=await m.getDialogSetting(Y);!e||e.visible})()})}doInitUI(){this.boundHandleDragMove=this.handleDragMove.bind(this),this.boundHandleDragEnd=this.handleDragEnd.bind(this),document.addEventListener(`mousemove`,this.boundHandleDragMove),document.addEventListener(`mouseup`,this.boundHandleDragEnd)}firstUpdated(e){super.firstUpdated(e)}loadContributions(){this.contributions=N.getAllContributions()}async loadSettings(){let e=await m.getDialogSetting(Y);e&&(e.position&&(this.positionX=e.position.x||X.x,this.positionY=e.position.y||X.y),e.visible!==void 0&&(this.isVisible=e.visible))}async saveSettings(){await m.setDialogSetting(Y,{position:{x:this.positionX,y:this.positionY},visible:this.isVisible})}isDragTarget(e){return!!(e.closest(`.header-actions`)||e.closest(`wa-button`))}getViewportBounds(){let e=this.panelRef.value?.offsetWidth||Z.width,t=this.panelRef.value?.offsetHeight||Z.height;return{maxX:window.innerWidth-e,maxY:window.innerHeight-t}}async startHowTo(e){let t=N.getContribution(e);if(!t){o(`HowTo "${e}" not found`);return}this.cleanupHowTo(),this.activeContributionId=e,this.isMinimized=!1;let n=t.steps.map(e=>({step:e,status:`pending`}));if(this.stepStates.set(e,n),t.initialize){let n={requestUpdate:()=>this.recheckActiveStepConditions(),contributionId:e};this.howtoCleanup=t.initialize(n)||void 0}this.requestUpdate(),await this.checkPreConditions(e,0)}cleanupHowTo(){this.howtoCleanup&&=(this.howtoCleanup(),void 0)}getStepState(e,t){let n=this.stepStates.get(e);return n&&t<n.length?n[t]:null}async checkPreConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.preCondition){n.preConditionMet=!0,this.requestUpdate();return}try{n.preConditionMet=await n.step.preCondition(),this.requestUpdate()}catch(e){console.error(`Pre-condition check failed for step ${n.step.id}:`,e),n.preConditionMet=!1,this.requestUpdate()}}}async checkPostConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.postCondition){this.completeStep(e,t);return}try{let r=await n.step.postCondition();n.postConditionMet=r,n.status=r?`completed`:`failed`,r&&this.activateNextStep(e,t),this.requestUpdate()}catch(e){console.error(`Post-condition check failed for step ${n.step.id}:`,e),n.postConditionMet=!1,n.status=`failed`,this.requestUpdate()}}}completeStep(e,t){let n=this.getStepState(e,t);n&&(n.status=`completed`,this.activateNextStep(e,t),this.requestUpdate())}async activateNextStep(e,t){let n=this.stepStates.get(e);if(!n||t+1>=n.length)return;let r=n[t+1];r.status=`active`,await this.checkPreConditions(e,t+1)}async recheckActiveStepConditions(){if(!this.activeContributionId)return;let e=this.stepStates.get(this.activeContributionId);if(!e)return;let t=e.findIndex(e=>e.status===`active`);if(t!==-1){let n=e[t],r=n.step;if(r.postCondition)try{if(await r.postCondition()&&n.status===`active`){await this.checkPostConditions(this.activeContributionId,t);return}}catch{}}for(let t=0;t<e.length;t++){let n=e[t];n.status===`pending`&&n.step.preCondition&&await this.checkPreConditions(this.activeContributionId,t)}this.requestUpdate()}async executeStep(e,t){let n=this.getStepState(e,t);n&&await this.validatePreConditions(n,e,t)&&(n.status=`active`,this.requestUpdate(),(!n.step.command||await this.executeStepCommand(n))&&await this.checkPostConditions(e,t))}async validatePreConditions(e,t,n){return!e.step.preCondition||((e.preConditionMet===void 0||e.preConditionMet===!1)&&await this.checkPreConditions(t,n),e.preConditionMet===!0||(o(`Pre-conditions not met for step: ${e.step.title}`),!1))}async executeStepCommand(e){if(!e.step.command)return!0;try{let t=e.step.commandParams,n=typeof t==`function`?await t():t||{},r=f.createExecutionContext(n);return await f.execute(e.step.command,r),!0}catch(t){return console.error(`Failed to execute command for step ${e.step.id}:`,t),o(`Failed to execute step: ${e.step.title}`),e.status=`failed`,this.requestUpdate(),!1}}async runStepCommand(e,t){let n=this.getStepState(e,t);if(n&&n.step.command){if(n.step.preCondition&&!await n.step.preCondition()){o(`Pre-conditions not met for step: ${n.step.title}`);return}await this.executeStepCommand(n)&&await this.checkPostConditions(e,t)}}skipStep(e,t){let n=this.getStepState(e,t);n&&n.step.optional&&(n.status=`skipped`,this.activateNextStep(e,t),this.requestUpdate())}closeHowTo(){this.cleanupHowTo(),this.activeContributionId=null,this.stepStates.clear(),this.requestUpdate()}toggleMinimize(){this.isMinimized=!this.isMinimized,this.requestUpdate()}async showPanel(){this.isVisible=!0,this.isMinimized=!1,await this.saveSettings(),this.requestUpdate()}async hidePanel(){this.isVisible=!1,await this.saveSettings(),this.requestUpdate()}async toggleVisibility(){this.isVisible?await this.hidePanel():await this.showPanel()}renderStep(e,t,n){let{step:r,status:i,preConditionMet:a,postConditionMet:o}=e,s=i===`active`,c=i===`completed`,l=i===`failed`,u=i===`pending`,d=i===`skipped`;return E`
            <div class="step ${i}" ?data-active=${s}>
                <div class="step-header">
                    <div class="step-number">${t+1}</div>
                    <div class="step-title">${r.title}</div>
                    <div class="step-status">
                        ${r.command?E`
                            <wa-button 
                                size="s" 
                                appearance="plain" 
                                @click=${e=>{e.stopPropagation(),this.runStepCommand(n,t)}}
                                title="Run step command"
                            >
                                <wa-icon name="play"></wa-icon>
                            </wa-button>
                        `:D}
                        ${c?E`<wa-icon name="check-circle" class="status-icon completed"></wa-icon>`:D}
                        ${l?E`<wa-icon name="xmark-circle" class="status-icon failed"></wa-icon>`:D}
                        ${d?E`<wa-icon name="minus-circle" class="status-icon skipped"></wa-icon>`:D}
                        ${u?E`<wa-icon name="circle" class="status-icon pending"></wa-icon>`:D}
                        ${s?E`<wa-icon name="play-circle" class="status-icon active"></wa-icon>`:D}
                    </div>
                </div>
                <div class="step-description">${r.description}</div>
                ${r.preCondition&&a!==void 0?E`
                    <div class="condition pre-condition ${a?`met`:`not-met`}">
                        <wa-icon name="${a?`check`:`xmark`}"></wa-icon>
                        <span>Pre-condition: ${a?`Met`:`Not met`}</span>
                    </div>
                `:D}
                ${r.postCondition&&o!==void 0?E`
                    <div class="condition post-condition ${o?`met`:`not-met`}">
                        <wa-icon name="${o?`check`:`xmark`}"></wa-icon>
                        <span>Post-condition: ${o?`Met`:`Not met`}</span>
                    </div>
                `:D}
                ${s&&r.optional?E`
                    <div class="step-actions">
                        <wa-button size="s" appearance="outline" @click=${()=>this.skipStep(n,t)}>
                            <wa-icon name="forward"></wa-icon>
                            Skip
                        </wa-button>
                    </div>
                `:D}
            </div>
        `}render(){if(!this.isVisible)return D;let e=this.activeContributionId?N.getContribution(this.activeContributionId):null,t=this.activeContributionId&&this.stepStates.get(this.activeContributionId)||[];return E`
            ${this.dragPreviewPosition?E`
                <div 
                    class="howto-panel-drag-preview"
                style=${w({left:`${this.dragPreviewPosition.x}px`,top:`${this.dragPreviewPosition.y}px`,width:`${this.panelRef.value?.offsetWidth||Z.width}px`,height:`${this.panelRef.value?.offsetHeight||Z.height}px`,display:`block`,visibility:`visible`})}
                ></div>
            `:D}
            <div 
                class="howto-panel ${this.isMinimized?`minimized`:``} ${this.dragPreviewPosition?`dragging`:``}"
                style=${w({left:`${this.positionX}px`,top:`${this.positionY}px`,transform:`translateZ(0)`})}
                ${S(this.panelRef)}
            >
                <div class="panel-header" @mousedown=${this.handleDragStart}>
                    <div class="header-title">
                        <wa-icon name="list-check"></wa-icon>
                        <span>HowTo Workflows</span>
                    </div>
                    <div class="header-actions" @mousedown=${e=>e.stopPropagation()}>
                        <wa-button 
                            size="s" 
                            appearance="plain" 
                            @click=${this.toggleMinimize}
                            title="${this.isMinimized?`Expand`:`Minimize`}"
                        >
                            <wa-icon name="${this.isMinimized?`chevron-up`:`chevron-down`}"></wa-icon>
                        </wa-button>
                        <wa-button 
                            size="s" 
                            appearance="plain" 
                            @click=${this.hidePanel}
                            title="Hide Panel"
                        >
                            <wa-icon name="xmark"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                
                ${this.isMinimized?D:E`
                    <div class="panel-content">
                        ${e?E`
                            <div class="active-workflow">
                                <div class="workflow-header">
                                    <div class="workflow-title-section">
                                        <h3>${typeof e.title==`function`?e.title():e.title}</h3>
                                        ${e.description?E`
                                            <p class="workflow-description">${typeof e.description==`function`?e.description():e.description}</p>
                                        `:D}
                                    </div>
                                    <wa-button 
                                        size="s" 
                                        appearance="plain" 
                                        @click=${this.closeHowTo}
                                        title="Close HowTo"
                                    >
                                        <wa-icon name="xmark"></wa-icon>
                                    </wa-button>
                                </div>
                                <div class="steps-list">
                                    ${t.map((e,t)=>this.renderStep(e,t,this.activeContributionId))}
                                </div>
                            </div>
                        `:E`
                            <div class="workflows-list">
                                <h3>Available Workflows</h3>
                                ${this.contributions.length===0?E`
                                    <div class="empty-state">
                                        <wa-icon name="list-check" style="font-size: 2em; opacity: 0.5; margin-bottom: 12px;"></wa-icon>
                                        <p>No HowTo workflows available yet.</p>
                                        <p style="font-size: 0.9em; opacity: 0.7;">Extensions can register workflows via the contribution registry.</p>
                                    </div>
                                `:this.contributions.map(e=>{let t=typeof e.title==`function`?e.title():e.title,n=e.description?typeof e.description==`function`?e.description():e.description:null;return E`
                                    <div class="workflow-item" @click=${()=>this.startHowTo(e.id)}>
                                        ${e.icon?E`
                                            <wa-icon name="${e.icon}"></wa-icon>
                                        `:E`
                                            <wa-icon name="list-check"></wa-icon>
                                        `}
                                        <div class="workflow-info">
                                            <div class="workflow-title">${t}</div>
                                            ${n?E`
                                                <div class="workflow-desc">${n}</div>
                                            `:D}
                                            <div class="workflow-meta">${e.steps.length} step${e.steps.length===1?``:`s`}</div>
                                        </div>
                                    </div>
                                `})}
                            </div>
                        `}
                    </div>
                `}
            </div>
        `}static{this.styles=y`
        :host {
            display: block;
            position: fixed;
            z-index: 10000;
            pointer-events: none;
        }

        .howto-panel-drag-preview {
            position: fixed !important;
            border: 3px dashed var(--wa-color-primary-50, #0066cc) !important;
            background: var(--wa-color-primary-05, rgba(0, 102, 204, 0.05)) !important;
            border-radius: var(--wa-border-radius-medium, 8px);
            z-index: 10001 !important;
            pointer-events: none !important;
            opacity: 0.8 !important;
            box-sizing: border-box;
            display: block !important;
            visibility: visible !important;
            min-width: 100px;
            min-height: 100px;
        }

        :host-context(.wa-light) .howto-panel-drag-preview {
            background: var(--wa-color-primary-95);
            border-color: var(--wa-color-primary-50);
        }

        .howto-panel {
            position: fixed !important;
            width: 400px;
            max-height: 600px;
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-05));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            border-radius: var(--wa-border-radius-medium, 8px);
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.8));
            pointer-events: all;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        :host-context(.wa-light) .howto-panel {
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-95));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.2));
        }

        .howto-panel.minimized {
            max-height: auto;
        }

        .howto-panel.dragging {
            opacity: 0.5;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--wa-spacing-medium, 12px) var(--wa-spacing-large, 16px);
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border-bottom: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            cursor: move;
            user-select: none;
        }

        :host-context(.wa-light) .panel-header {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-bottom-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-small, 8px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .header-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .header-actions {
            display: flex;
            gap: var(--wa-spacing-x-small, 4px);
        }

        .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: var(--wa-spacing-large, 16px);
        }

        .workflows-list h3 {
            margin: 0 0 var(--wa-spacing-medium, 12px) 0;
            font-size: var(--wa-font-size-medium, 14px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-80));
        }

        :host-context(.wa-light) .workflows-list h3 {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-20));
        }

        .workflow-item {
            display: flex;
            align-items: flex-start;
            gap: var(--wa-spacing-medium, 12px);
            padding: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-small, 8px);
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-20));
            border-radius: var(--wa-border-radius-small, 6px);
            cursor: pointer;
            transition: all var(--wa-transition-medium, 0.2s);
        }

        :host-context(.wa-light) .workflow-item {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-color: var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-80));
        }

        .workflow-item:hover {
            background: var(--wa-color-mix-hover, var(--wa-color-neutral-15));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-30));
        }

        :host-context(.wa-light) .workflow-item:hover {
            background: var(--wa-color-mix-hover, var(--wa-color-neutral-85));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-70));
        }

        .workflow-info {
            flex: 1;
        }

        .workflow-title {
            font-weight: 600;
            margin-bottom: var(--wa-spacing-x-small, 4px);
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .workflow-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .workflow-desc {
            font-size: var(--wa-font-size-small, 12px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
            margin-bottom: var(--wa-spacing-x-small, 4px);
        }

        :host-context(.wa-light) .workflow-desc {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .workflow-meta {
            font-size: var(--wa-font-size-x-small, 11px);
            color: var(--wa-color-text-quiet, var(--wa-color-neutral-60));
        }

        :host-context(.wa-light) .workflow-meta {
            color: var(--wa-color-text-quiet, var(--wa-color-neutral-40));
        }

        .active-workflow {
            display: flex;
            flex-direction: column;
            gap: var(--wa-spacing-large, 16px);
        }

        .workflow-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-medium, 12px);
        }

        .workflow-title-section {
            flex: 1;
        }

        .workflow-header h3 {
            margin: 0 0 var(--wa-spacing-small, 8px) 0;
            font-size: var(--wa-font-size-large, 16px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .workflow-header h3 {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .workflow-description {
            margin: 0;
            font-size: var(--wa-font-size-medium, 13px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
        }

        :host-context(.wa-light) .workflow-description {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .steps-list {
            display: flex;
            flex-direction: column;
            gap: var(--wa-spacing-medium, 12px);
        }

        .step {
            padding: var(--wa-spacing-medium, 12px);
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-20));
            border-radius: var(--wa-border-radius-small, 6px);
            transition: all var(--wa-transition-medium, 0.2s);
        }

        :host-context(.wa-light) .step {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-color: var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-80));
        }

        .step[data-active="true"] {
            border-color: var(--wa-color-primary-50);
            background: var(--wa-color-primary-05);
        }

        :host-context(.wa-light) .step[data-active="true"] {
            background: var(--wa-color-primary-95);
            border-color: var(--wa-color-primary-50);
        }

        .step.completed {
            border-color: var(--wa-color-success-50);
            background: var(--wa-color-success-05);
        }

        :host-context(.wa-light) .step.completed {
            background: var(--wa-color-success-95);
            border-color: var(--wa-color-success-50);
        }

        .step.failed {
            border-color: var(--wa-color-danger-50);
            background: var(--wa-color-danger-05);
        }

        :host-context(.wa-light) .step.failed {
            background: var(--wa-color-danger-95);
            border-color: var(--wa-color-danger-50);
        }

        .step-header {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-small, 8px);
        }

        .step-number {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-20));
            border-radius: 50%;
            font-size: var(--wa-font-size-small, 12px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-80));
        }

        :host-context(.wa-light) .step-number {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-80));
            color: var(--wa-color-text-normal, var(--wa-color-neutral-20));
        }

        .step-title {
            flex: 1;
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .step-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .step-status {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-small, 8px);
        }

        .status-icon {
            width: 20px;
            height: 20px;
        }

        .status-icon.completed {
            color: var(--wa-color-success-50);
        }

        .status-icon.failed {
            color: var(--wa-color-danger-50);
        }

        .status-icon.skipped {
            color: var(--wa-color-neutral-50);
        }

        .status-icon.active {
            color: var(--wa-color-primary-50);
        }

        .status-icon.pending {
            color: var(--wa-color-neutral-50);
        }

        .step-description {
            font-size: var(--wa-font-size-medium, 13px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
            margin-bottom: var(--wa-spacing-small, 8px);
            line-height: 1.4;
        }

        :host-context(.wa-light) .step-description {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .condition {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-x-small, 6px);
            font-size: var(--wa-font-size-small, 12px);
            padding: var(--wa-spacing-x-small, 6px) var(--wa-spacing-small, 8px);
            border-radius: var(--wa-border-radius-x-small, 4px);
            margin-bottom: var(--wa-spacing-small, 8px);
        }

        .condition.met {
            background: var(--wa-color-success-10);
            color: var(--wa-color-success-70);
        }

        :host-context(.wa-light) .condition.met {
            background: var(--wa-color-success-90);
            color: var(--wa-color-success-30);
        }

        .condition.not-met {
            background: var(--wa-color-danger-10);
            color: var(--wa-color-danger-70);
        }

        :host-context(.wa-light) .condition.not-met {
            background: var(--wa-color-danger-90);
            color: var(--wa-color-danger-30);
        }

        .step-actions {
            display: flex;
            gap: var(--wa-spacing-small, 8px);
            margin-top: var(--wa-spacing-small, 8px);
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--wa-spacing-x-large, 40px) var(--wa-spacing-large, 20px);
            text-align: center;
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
        }

        :host-context(.wa-light) .empty-state {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .empty-state p {
            margin: var(--wa-spacing-small, 8px) 0;
        }
    `}};e([C()],Q.prototype,`contributions`,void 0),e([C()],Q.prototype,`activeContributionId`,void 0),e([C()],Q.prototype,`stepStates`,void 0),e([C()],Q.prototype,`isMinimized`,void 0),e([C()],Q.prototype,`isVisible`,void 0),e([C()],Q.prototype,`positionX`,void 0),e([C()],Q.prototype,`positionY`,void 0),e([C()],Q.prototype,`dragPreviewPosition`,void 0),Q=e([x(`docks-howto-panel`)],Q);var $=_(`HowToExtension`);function oe(e){$.info(`HowTo system extension loaded`),t.put(`howToService`,N);let n=()=>{if(document.querySelector(`docks-howto-panel`))return;let e=document.createElement(`docks-howto-panel`);document.body.appendChild(e),$.info(`HowTo panel added to DOM`)};if(document.body)requestAnimationFrame(()=>{n()});else{let e=()=>{document.body?n():requestAnimationFrame(e)};requestAnimationFrame(e)}u({command:{id:`howto.show-panel`,name:`Show HowTo Panel`,description:`Shows the HowTo workflows panel`,icon:`list-check`,parameters:[]},handler:{execute:()=>{T(q,null)}}}),u({command:{id:`howto.toggle-panel`,name:`Toggle HowTo Panel`,description:`Toggles the visibility of the HowTo workflows panel`,icon:`list-check`,keyBinding:`CTRL+SHIFT+H`,parameters:[]},handler:{execute:()=>{T(J,null)}},contribution:{target:r,icon:`list-check`,label:`HowTo`}}),$.info(`HowTo system extension initialized`)}export{M as HOWTO_CONTRIBUTION_TARGET,oe as default,N as howToService};