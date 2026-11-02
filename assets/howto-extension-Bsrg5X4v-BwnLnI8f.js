import{$ as e,B as t,Q as n,T as r,V as i,Vt as a,Wt as o,Y as s,Zt as c,at as l,ct as u,dt as d,fn as f,ft as p,ht as m,it as h,jt as g,ln as _,lt as v,nt as y,on as ee,pn as b,qt as x,tt as S,un as C,ut as w,w as T,y as te,z as ne}from"./canvas-bridge-core.js-BbEMwLNz.js";import{l as E,o as D,u as O}from"./runtime-DVzLyx8h-DECx8zrB.js";import"./api-Dlwvgqdd.js";var k=f(`HowToService`),A=`system.howtos`,j=new class{constructor(){this.contributions=new Map,this.loadContributions(),C(h,e=>{e.target===`system.howtos`&&this.loadContributions()})}loadContributions(){let e=v.getContributions(A);this.contributions.clear();for(let t of e){if(!t.id){k.warn(`HowTo contribution missing id, skipping`);continue}if(t.label||=typeof t.title==`function`?t.title():t.title,!t.steps||t.steps.length===0){k.warn(`HowTo contribution "${t.id}" has no steps, skipping`);continue}let e=new Set;for(let n of t.steps){if(e.has(n.id)){k.warn(`HowTo contribution "${t.id}" has duplicate step ID: "${n.id}"`);continue}e.add(n.id)}this.contributions.set(t.id,t);let n=typeof t.title==`function`?t.title():t.title;k.debug(`Loaded HowTo contribution: ${n} (${t.id})`)}k.info(`Loaded ${this.contributions.size} HowTo contributions`)}getContribution(e){return this.contributions.get(e)}getAllContributions(){return Array.from(this.contributions.values())}getContributionsByCategory(e){return Array.from(this.contributions.values()).filter(t=>t.category===e)}hasContribution(e){return this.contributions.has(e)}},M=`welcome.txt`;async function N(){if(!await S.getWorkspace())return null;let e=await S.getFolders();return e.length===0?null:`${e[0].name}/${M}`}function P(e){return e&&typeof e.getFilePath==`function`}async function F(){return S.isConnected()}async function I(){let e=await N();if(!e)return!1;let t=await S.getWorkspace();if(!t)return!1;try{return await t.getResource(e)instanceof s}catch{return!1}}function L(){let e=l.get();if(!e||!P(e))return!1;let t=e.getFilePath();return t===M||t?.endsWith(`/welcome.txt`)===!0}function re(){if(!L())return!1;let e=l.get();return e?e.isDirty()===!1:!1}function ie(){return!L()}function R(){return T.getCurrentApp()?.name||`AppSpace`}v.registerContribution(A,{id:`docks.onboarding`,title:()=>`Welcome to ${R()}`,description:()=>`Get started with ${R()} by learning the basics of workspace and file management`,icon:`graduation-cap`,label:``,category:`Getting Started`,initialize:t=>{let r=[];return C(n,()=>{t.requestUpdate()}),C(e,()=>{t.requestUpdate()}),r.push(m(l,()=>{t.requestUpdate()})),r.push(m(w,()=>{t.requestUpdate()})),()=>{r.forEach(e=>e())}},steps:[{id:`create-text-file`,title:`Create welcome.txt`,description:`Create a new text file called "welcome.txt" in your workspace. If you don't have a workspace selected, choose one first.`,preCondition:async()=>await F(),postCondition:async()=>await I(),command:`touch`,commandParams:async()=>{let e=await N();return e?{path:e,contents:`Welcome to AppSpace!

This is your first file. You can edit it and save your changes.`}:{}}},{id:`open-text-file`,title:`Open welcome.txt`,description:`Open the "welcome.txt" file in the editor.`,preCondition:async()=>await I(),postCondition:()=>L(),command:`open_editor`,commandParams:async()=>{let e=await N();return e?{path:e}:{}}},{id:`edit-and-save`,title:`Type something and save`,description:`Type some text in the editor to modify the file, then save it using Ctrl+S or the save button.`,preCondition:()=>L(),postCondition:()=>re()},{id:`close-text-file`,title:`Close the file`,description:`Close the editor tab by clicking the X button on the tab.`,preCondition:()=>L(),postCondition:()=>ie()}]});function z(){let e=l.get();return e?e.input?.key===`.system.cognitive-ai-settings`||(e.tagName||e.localName||``).toLowerCase()===`docks-cognitive-settings-editor`:!1}async function B(){try{await O.whenReady();let e=O.getProvidersSettings();if(!e.defaultProviderId)return!1;let t=e.providers.find(t=>t.id===e.defaultProviderId);return t?.enabled?t.apiKey.trim()?!0:/ollama|webllm|localhost|127\.0\.0\.1/i.test(`${t.id} ${t.baseUrl}`):!1}catch{return!1}}function V(){let e=l.get();return!e||!z()?!1:e.isDirty?.()===!0}function H(){return z()&&!V()}function U(){return!z()}async function W(){try{await O.whenReady();for(let e of O.sessions.list())if(e.history.some(e=>e.role===`user`&&e.parts.some(e=>e.type===`text`&&e.text.trim()!==``)))return!0;return!1}catch{return!1}}function G(){return T.getCurrentApp()?.name||`AppSpace`}var K={id:`docks.ai-setup`,title:()=>`Set up AI in ${G()}`,description:()=>`Configure an LLM provider to enable AI chat features in ${G()}`,icon:`robot`,label:``,category:`Getting Started`,initialize:e=>{let t=[];return t.push(m(l,()=>e.requestUpdate())),t.push(m(w,()=>e.requestUpdate())),t.push(O.events.subscribe(E.providersChanged,()=>e.requestUpdate())),t.push(O.events.subscribe(E.sessionChanged,()=>e.requestUpdate())),()=>{t.forEach(e=>e())}},steps:[{id:`open-ai-settings`,title:`Open AI Settings`,description:`Open the AI settings editor from the chat gear menu or the command palette.`,preCondition:()=>!0,postCondition:()=>z(),command:D},{id:`configure-llm-provider`,title:`Configure LLM Provider`,description:`Select a provider as default and enter an API key when required. Save your changes.`,preCondition:()=>z(),postCondition:async()=>{let e=await B(),t=H();return e&&t}},{id:`save-and-close`,title:`Save and Close`,description:`Save your changes (if not already saved) and close the AI settings editor tab.`,preCondition:()=>z(),postCondition:()=>U()},{id:`type-in-chat`,title:`Type in Chat`,description:`Open the AI chat view and type a message to test your AI configuration.`,preCondition:async()=>await B(),postCondition:async()=>await W()}]};v.registerContribution(A,K);var q=`howto/show-panel`,J=`howto/toggle-panel`,Y=`howto-panel`,X={x:100,y:100},Z={width:400,height:300},Q=class extends y{constructor(...e){super(...e),this.contributions=[],this.activeContributionId=null,this.stepStates=new Map,this.isMinimized=!1,this.isVisible=!1,this.positionX=X.x,this.positionY=X.y,this.isDragging=!1,this.dragPreviewPosition=null,this.dragStartPosition={x:0,y:0},this.panelRef=ne(),this.handleDragStart=e=>{let t=e.target;if(this.isDragTarget(t)||!this.panelRef.value)return;let n=this.panelRef.value.getBoundingClientRect();this.dragStartPosition={x:e.clientX-n.left,y:e.clientY-n.top},this.isDragging=!0,this.dragPreviewPosition={x:this.positionX,y:this.positionY},this.requestUpdate(),e.preventDefault(),e.stopPropagation()},this.handleDragMove=e=>{if(!this.isDragging||!this.dragPreviewPosition)return;let t=this.getViewportBounds(),n=Math.max(0,Math.min(e.clientX-this.dragStartPosition.x,t.maxX)),r=Math.max(0,Math.min(e.clientY-this.dragStartPosition.y,t.maxY));(this.dragPreviewPosition.x!==n||this.dragPreviewPosition.y!==r)&&(this.dragPreviewPosition={x:n,y:r},this.requestUpdate())},this.handleDragEnd=async()=>{if(!this.isDragging||!this.dragPreviewPosition)return;this.isDragging=!1;let e=this.dragPreviewPosition;this.dragPreviewPosition=null,this.positionX=e.x,this.positionY=e.y,await this.saveSettings(),this.requestUpdate()}}async doBeforeUI(){if(this.loadContributions(),C(h,e=>{e.target===`system.howtos`&&(this.loadContributions(),this.requestUpdate())}),C(q,()=>this.showPanel()),C(J,()=>this.toggleVisibility()),await this.loadSettings(),!S.isConnected()&&this.isVisible===!1){let e=await r.getDialogSetting(Y);(!e||e.visible===void 0)&&(this.isVisible=!0,await this.saveSettings())}C(e,()=>{(async()=>{let e=await r.getDialogSetting(Y);!e||e.visible})()})}doInitUI(){this.boundHandleDragMove=this.handleDragMove.bind(this),this.boundHandleDragEnd=this.handleDragEnd.bind(this),document.addEventListener(`mousemove`,this.boundHandleDragMove),document.addEventListener(`mouseup`,this.boundHandleDragEnd)}firstUpdated(e){super.firstUpdated(e)}loadContributions(){this.contributions=j.getAllContributions()}async loadSettings(){let e=await r.getDialogSetting(Y);e&&(e.position&&(this.positionX=e.position.x||X.x,this.positionY=e.position.y||X.y),e.visible!==void 0&&(this.isVisible=e.visible))}async saveSettings(){await r.setDialogSetting(Y,{position:{x:this.positionX,y:this.positionY},visible:this.isVisible})}isDragTarget(e){return!!(e.closest(`.header-actions`)||e.closest(`wa-button`))}getViewportBounds(){let e=this.panelRef.value?.offsetWidth||Z.width,t=this.panelRef.value?.offsetHeight||Z.height;return{maxX:window.innerWidth-e,maxY:window.innerHeight-t}}async startHowTo(e){let t=j.getContribution(e);if(!t){p(`HowTo "${e}" not found`);return}this.cleanupHowTo(),this.activeContributionId=e,this.isMinimized=!1;let n=t.steps.map(e=>({step:e,status:`pending`}));if(this.stepStates.set(e,n),t.initialize){let n={requestUpdate:()=>this.recheckActiveStepConditions(),contributionId:e};this.howtoCleanup=t.initialize(n)||void 0}this.requestUpdate(),await this.checkPreConditions(e,0)}cleanupHowTo(){this.howtoCleanup&&=(this.howtoCleanup(),void 0)}getStepState(e,t){let n=this.stepStates.get(e);return n&&t<n.length?n[t]:null}async checkPreConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.preCondition){n.preConditionMet=!0,this.requestUpdate();return}try{n.preConditionMet=await n.step.preCondition(),this.requestUpdate()}catch(e){console.error(`Pre-condition check failed for step ${n.step.id}:`,e),n.preConditionMet=!1,this.requestUpdate()}}}async checkPostConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.postCondition){this.completeStep(e,t);return}try{let r=await n.step.postCondition();n.postConditionMet=r,n.status=r?`completed`:`failed`,r&&this.activateNextStep(e,t),this.requestUpdate()}catch(e){console.error(`Post-condition check failed for step ${n.step.id}:`,e),n.postConditionMet=!1,n.status=`failed`,this.requestUpdate()}}}completeStep(e,t){let n=this.getStepState(e,t);n&&(n.status=`completed`,this.activateNextStep(e,t),this.requestUpdate())}async activateNextStep(e,t){let n=this.stepStates.get(e);if(!n||t+1>=n.length)return;let r=n[t+1];r.status=`active`,await this.checkPreConditions(e,t+1)}async recheckActiveStepConditions(){if(!this.activeContributionId)return;let e=this.stepStates.get(this.activeContributionId);if(!e)return;let t=e.findIndex(e=>e.status===`active`);if(t!==-1){let n=e[t],r=n.step;if(r.postCondition)try{if(await r.postCondition()&&n.status===`active`){await this.checkPostConditions(this.activeContributionId,t);return}}catch{}}for(let t=0;t<e.length;t++){let n=e[t];n.status===`pending`&&n.step.preCondition&&await this.checkPreConditions(this.activeContributionId,t)}this.requestUpdate()}async executeStep(e,t){let n=this.getStepState(e,t);n&&await this.validatePreConditions(n,e,t)&&(n.status=`active`,this.requestUpdate(),(!n.step.command||await this.executeStepCommand(n))&&await this.checkPostConditions(e,t))}async validatePreConditions(e,t,n){return!e.step.preCondition||((e.preConditionMet===void 0||e.preConditionMet===!1)&&await this.checkPreConditions(t,n),e.preConditionMet===!0||(p(`Pre-conditions not met for step: ${e.step.title}`),!1))}async executeStepCommand(e){if(!e.step.command)return!0;try{let t=e.step.commandParams,n=typeof t==`function`?await t():t||{},r=u.createExecutionContext(n);return await u.execute(e.step.command,r),!0}catch(t){return console.error(`Failed to execute command for step ${e.step.id}:`,t),p(`Failed to execute step: ${e.step.title}`),e.status=`failed`,this.requestUpdate(),!1}}async runStepCommand(e,t){let n=this.getStepState(e,t);if(n&&n.step.command){if(n.step.preCondition&&!await n.step.preCondition()){p(`Pre-conditions not met for step: ${n.step.title}`);return}await this.executeStepCommand(n)&&await this.checkPostConditions(e,t)}}skipStep(e,t){let n=this.getStepState(e,t);n&&n.step.optional&&(n.status=`skipped`,this.activateNextStep(e,t),this.requestUpdate())}closeHowTo(){this.cleanupHowTo(),this.activeContributionId=null,this.stepStates.clear(),this.requestUpdate()}toggleMinimize(){this.isMinimized=!this.isMinimized,this.requestUpdate()}async showPanel(){this.isVisible=!0,this.isMinimized=!1,await this.saveSettings(),this.requestUpdate()}async hidePanel(){this.isVisible=!1,await this.saveSettings(),this.requestUpdate()}async toggleVisibility(){this.isVisible?await this.hidePanel():await this.showPanel()}renderStep(e,t,n){let{step:r,status:i,preConditionMet:a,postConditionMet:o}=e,s=i===`active`,l=i===`completed`,u=i===`failed`,d=i===`pending`,f=i===`skipped`;return c`
            <div class="step ${i}" ?data-active=${s}>
                <div class="step-header">
                    <div class="step-number">${t+1}</div>
                    <div class="step-title">${r.title}</div>
                    <div class="step-status">
                        ${r.command?c`
                            <wa-button 
                                size="s" 
                                appearance="plain" 
                                @click=${e=>{e.stopPropagation(),this.runStepCommand(n,t)}}
                                title="Run step command"
                            >
                                <wa-icon name="play"></wa-icon>
                            </wa-button>
                        `:x}
                        ${l?c`<wa-icon name="check-circle" class="status-icon completed"></wa-icon>`:x}
                        ${u?c`<wa-icon name="xmark-circle" class="status-icon failed"></wa-icon>`:x}
                        ${f?c`<wa-icon name="minus-circle" class="status-icon skipped"></wa-icon>`:x}
                        ${d?c`<wa-icon name="circle" class="status-icon pending"></wa-icon>`:x}
                        ${s?c`<wa-icon name="play-circle" class="status-icon active"></wa-icon>`:x}
                    </div>
                </div>
                <div class="step-description">${r.description}</div>
                ${r.preCondition&&a!==void 0?c`
                    <div class="condition pre-condition ${a?`met`:`not-met`}">
                        <wa-icon name="${a?`check`:`xmark`}"></wa-icon>
                        <span>Pre-condition: ${a?`Met`:`Not met`}</span>
                    </div>
                `:x}
                ${r.postCondition&&o!==void 0?c`
                    <div class="condition post-condition ${o?`met`:`not-met`}">
                        <wa-icon name="${o?`check`:`xmark`}"></wa-icon>
                        <span>Post-condition: ${o?`Met`:`Not met`}</span>
                    </div>
                `:x}
                ${s&&r.optional?c`
                    <div class="step-actions">
                        <wa-button size="s" appearance="outline" @click=${()=>this.skipStep(n,t)}>
                            <wa-icon name="forward"></wa-icon>
                            Skip
                        </wa-button>
                    </div>
                `:x}
            </div>
        `}render(){if(!this.isVisible)return x;let e=this.activeContributionId?j.getContribution(this.activeContributionId):null,n=this.activeContributionId&&this.stepStates.get(this.activeContributionId)||[];return c`
            ${this.dragPreviewPosition?c`
                <div 
                    class="howto-panel-drag-preview"
                style=${g({left:`${this.dragPreviewPosition.x}px`,top:`${this.dragPreviewPosition.y}px`,width:`${this.panelRef.value?.offsetWidth||Z.width}px`,height:`${this.panelRef.value?.offsetHeight||Z.height}px`,display:`block`,visibility:`visible`})}
                ></div>
            `:x}
            <div 
                class="howto-panel ${this.isMinimized?`minimized`:``} ${this.dragPreviewPosition?`dragging`:``}"
                style=${g({left:`${this.positionX}px`,top:`${this.positionY}px`,transform:`translateZ(0)`})}
                ${t(this.panelRef)}
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
                
                ${this.isMinimized?x:c`
                    <div class="panel-content">
                        ${e?c`
                            <div class="active-workflow">
                                <div class="workflow-header">
                                    <div class="workflow-title-section">
                                        <h3>${typeof e.title==`function`?e.title():e.title}</h3>
                                        ${e.description?c`
                                            <p class="workflow-description">${typeof e.description==`function`?e.description():e.description}</p>
                                        `:x}
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
                                    ${n.map((e,t)=>this.renderStep(e,t,this.activeContributionId))}
                                </div>
                            </div>
                        `:c`
                            <div class="workflows-list">
                                <h3>Available Workflows</h3>
                                ${this.contributions.length===0?c`
                                    <div class="empty-state">
                                        <wa-icon name="list-check" style="font-size: 2em; opacity: 0.5; margin-bottom: 12px;"></wa-icon>
                                        <p>No HowTo workflows available yet.</p>
                                        <p style="font-size: 0.9em; opacity: 0.7;">Extensions can register workflows via the contribution registry.</p>
                                    </div>
                                `:this.contributions.map(e=>{let t=typeof e.title==`function`?e.title():e.title,n=e.description?typeof e.description==`function`?e.description():e.description:null;return c`
                                    <div class="workflow-item" @click=${()=>this.startHowTo(e.id)}>
                                        ${e.icon?c`
                                            <wa-icon name="${e.icon}"></wa-icon>
                                        `:c`
                                            <wa-icon name="list-check"></wa-icon>
                                        `}
                                        <div class="workflow-info">
                                            <div class="workflow-title">${t}</div>
                                            ${n?c`
                                                <div class="workflow-desc">${n}</div>
                                            `:x}
                                            <div class="workflow-meta">${e.steps.length} step${e.steps.length===1?``:`s`}</div>
                                        </div>
                                    </div>
                                `})}
                            </div>
                        `}
                    </div>
                `}
            </div>
        `}static{this.styles=ee`
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
    `}};i([a()],Q.prototype,`contributions`,void 0),i([a()],Q.prototype,`activeContributionId`,void 0),i([a()],Q.prototype,`stepStates`,void 0),i([a()],Q.prototype,`isMinimized`,void 0),i([a()],Q.prototype,`isVisible`,void 0),i([a()],Q.prototype,`positionX`,void 0),i([a()],Q.prototype,`positionY`,void 0),i([a()],Q.prototype,`dragPreviewPosition`,void 0),Q=i([o(`docks-howto-panel`)],Q);var $=f(`HowToExtension`);function ae(e){$.info(`HowTo system extension loaded`),b.put(`howToService`,j);let t=()=>{if(document.querySelector(`docks-howto-panel`))return;let e=document.createElement(`docks-howto-panel`);document.body.appendChild(e),$.info(`HowTo panel added to DOM`)};if(document.body)requestAnimationFrame(()=>{t()});else{let e=()=>{document.body?t():requestAnimationFrame(e)};requestAnimationFrame(e)}d({command:{id:`howto.show-panel`,name:`Show HowTo Panel`,description:`Shows the HowTo workflows panel`,icon:`list-check`,parameters:[]},handler:{execute:()=>{_(q,null)}}}),d({command:{id:`howto.toggle-panel`,name:`Toggle HowTo Panel`,description:`Toggles the visibility of the HowTo workflows panel`,icon:`list-check`,keyBinding:`CTRL+SHIFT+H`,parameters:[]},handler:{execute:()=>{_(J,null)}},contribution:{target:te,icon:`list-check`,label:`HowTo`}}),$.info(`HowTo system extension initialized`)}export{A as HOWTO_CONTRIBUTION_TARGET,ae as default,j as howToService};