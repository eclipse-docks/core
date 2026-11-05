import{Cn as e,Dn as t,Gt as n,Jt as r,Kt as i,Qt as a,Sn as o,Vt as s,Z as c,gn as l,ln as u,rn as d,sn as f,tn as p,un as m,ut as h,vn as g,wn as _,yn as v}from"./canvas-bridge-core.js-D8bbXC9R.js";import{E as y,S as b,T as x,_ as S,h as C,m as w,w as T,x as E,y as D}from"./canvas-bridge-canvas.js-DrvOvBhU.js";import{d as O,l as k,o as A}from"./runtime-BJlEES2l-qJYOnuta.js";import"./api-BPS9j-sG.js";var j=_(`HowToService`),M=`system.howtos`,N=new class{constructor(){this.contributions=new Map,this.loadContributions(),x(p,e=>{e.target===`system.howtos`&&this.loadContributions()})}loadContributions(){let e=m.getContributions(M);this.contributions.clear();for(let t of e){if(!t.id){j.warn(`HowTo contribution missing id, skipping`);continue}if(t.label||=typeof t.title==`function`?t.title():t.title,!t.steps||t.steps.length===0){j.warn(`HowTo contribution "${t.id}" has no steps, skipping`);continue}let e=new Set;for(let n of t.steps){if(e.has(n.id)){j.warn(`HowTo contribution "${t.id}" has duplicate step ID: "${n.id}"`);continue}e.add(n.id)}this.contributions.set(t.id,t);let n=typeof t.title==`function`?t.title():t.title;j.debug(`Loaded HowTo contribution: ${n} (${t.id})`)}j.info(`Loaded ${this.contributions.size} HowTo contributions`)}getContribution(e){return this.contributions.get(e)}getAllContributions(){return Array.from(this.contributions.values())}getContributionsByCategory(e){return Array.from(this.contributions.values()).filter(t=>t.category===e)}hasContribution(e){return this.contributions.has(e)}},P=`welcome.txt`;async function F(){if(!await r.getWorkspace())return null;let e=await r.getFolders();return e.length===0?null:`${e[0].name}/${P}`}function I(e){return e&&typeof e.getFilePath==`function`}async function L(){return r.isConnected()}async function R(){let e=await F();if(!e)return!1;let t=await r.getWorkspace();if(!t)return!1;try{return await t.getResource(e)instanceof s}catch{return!1}}function z(){let e=d.get();if(!e||!I(e))return!1;let t=e.getFilePath();return t===P||t?.endsWith(`/welcome.txt`)===!0}function B(){if(!z())return!1;let e=d.get();return e?e.isDirty()===!1:!1}function V(){return!z()}function H(){return h.getCurrentApp()?.name||`AppSpace`}m.registerContribution(M,{id:`docks.onboarding`,title:()=>`Welcome to ${H()}`,description:()=>`Get started with ${H()} by learning the basics of workspace and file management`,icon:`graduation-cap`,label:``,category:`Getting Started`,initialize:e=>{let t=[];return x(n,()=>{e.requestUpdate()}),x(i,()=>{e.requestUpdate()}),t.push(o(d,()=>{e.requestUpdate()})),t.push(o(l,()=>{e.requestUpdate()})),()=>{t.forEach(e=>e())}},steps:[{id:`create-text-file`,title:`Create welcome.txt`,description:`Create a new text file called "welcome.txt" in your workspace. If you don't have a workspace selected, choose one first.`,preCondition:async()=>await L(),postCondition:async()=>await R(),command:`touch`,commandParams:async()=>{let e=await F();return e?{path:e,contents:`Welcome to AppSpace!

This is your first file. You can edit it and save your changes.`}:{}}},{id:`open-text-file`,title:`Open welcome.txt`,description:`Open the "welcome.txt" file in the editor.`,preCondition:async()=>await R(),postCondition:()=>z(),command:`open_editor`,commandParams:async()=>{let e=await F();return e?{path:e}:{}}},{id:`edit-and-save`,title:`Type something and save`,description:`Type some text in the editor to modify the file, then save it using Ctrl+S or the save button.`,preCondition:()=>z(),postCondition:()=>B()},{id:`close-text-file`,title:`Close the file`,description:`Close the editor tab by clicking the X button on the tab.`,preCondition:()=>z(),postCondition:()=>V()}]});function U(){let e=d.get();return e?e.input?.key===`.system.cognitive-ai-settings`||(e.tagName||e.localName||``).toLowerCase()===`docks-cognitive-settings-editor`:!1}async function W(){try{await O.whenReady();let e=O.getProvidersSettings();if(!e.defaultProviderId)return!1;let t=e.providers.find(t=>t.id===e.defaultProviderId);return t?.enabled?t.apiKey.trim()?!0:/ollama|webllm|localhost|127\.0\.0\.1/i.test(`${t.id} ${t.baseUrl}`):!1}catch{return!1}}function G(){let e=d.get();return!e||!U()?!1:e.isDirty?.()===!0}function K(){return U()&&!G()}function q(){return!U()}async function ee(){try{await O.whenReady();for(let e of O.sessions.list())if(e.history.some(e=>e.role===`user`&&e.parts.some(e=>e.type===`text`&&e.text.trim()!==``)))return!0;return!1}catch{return!1}}function J(){return h.getCurrentApp()?.name||`AppSpace`}var te={id:`docks.ai-setup`,title:()=>`Set up AI in ${J()}`,description:()=>`Configure an LLM provider to enable AI chat features in ${J()}`,icon:`robot`,label:``,category:`Getting Started`,initialize:e=>{let t=[];t.push(o(d,()=>e.requestUpdate())),t.push(o(l,()=>e.requestUpdate()));let n=x(k.providersChanged,()=>e.requestUpdate()),r=x(k.sessionChanged,()=>e.requestUpdate());return t.push(()=>y(n),()=>y(r)),()=>{t.forEach(e=>e())}},steps:[{id:`open-ai-settings`,title:`Open AI Settings`,description:`Open the AI settings editor from the chat gear menu or the command palette.`,preCondition:()=>!0,postCondition:()=>U(),command:A},{id:`configure-llm-provider`,title:`Configure LLM Provider`,description:`Select a provider as default and enter an API key when required. Save your changes.`,preCondition:()=>U(),postCondition:async()=>{let e=await W(),t=K();return e&&t}},{id:`save-and-close`,title:`Save and Close`,description:`Save your changes (if not already saved) and close the AI settings editor tab.`,preCondition:()=>U(),postCondition:()=>q()},{id:`type-in-chat`,title:`Type in Chat`,description:`Open the AI chat view and type a message to test your AI configuration.`,preCondition:async()=>await W(),postCondition:async()=>await ee()}]};m.registerContribution(M,te);var Y=`howto/show-panel`,X=`howto/toggle-panel`,Z=`howto-panel`,Q=class extends a{constructor(...e){super(...e),this.contributions=[],this.activeContributionId=null,this.stepStates=new Map,this.isVisible=!1}async doBeforeUI(){if(this.loadContributions(),x(p,e=>{e.target===`system.howtos`&&(this.loadContributions(),this.requestUpdate())}),x(Y,()=>this.showPanel()),x(X,()=>this.toggleVisibility()),await this.loadSettings(),!r.isConnected()&&this.isVisible===!1){let e=await f.getDialogSetting(Z);(!e||e.visible===void 0)&&(this.isVisible=!0,await this.saveSettings())}x(i,()=>{(async()=>{let e=await f.getDialogSetting(Z);!e||e.visible})()})}loadContributions(){this.contributions=N.getAllContributions()}async loadSettings(){let e=await f.getDialogSetting(Z);e&&e.visible!==void 0&&(this.isVisible=e.visible)}async saveSettings(){let e=await f.getDialogSetting(Z),t=typeof e==`object`&&e?e:{};await f.setDialogSetting(Z,{...t,visible:this.isVisible})}expandPanel(){this.floatingPanel&&(this.floatingPanel.minimized=!1)}async startHowTo(e){let t=N.getContribution(e);if(!t){v(`HowTo "${e}" not found`);return}this.cleanupHowTo(),this.activeContributionId=e,this.expandPanel();let n=t.steps.map(e=>({step:e,status:`pending`}));if(this.stepStates.set(e,n),t.initialize){let n={requestUpdate:()=>this.recheckActiveStepConditions(),contributionId:e};this.howtoCleanup=t.initialize(n)||void 0}this.requestUpdate(),await this.checkPreConditions(e,0)}cleanupHowTo(){this.howtoCleanup&&=(this.howtoCleanup(),void 0)}getStepState(e,t){let n=this.stepStates.get(e);return n&&t<n.length?n[t]:null}async checkPreConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.preCondition){n.preConditionMet=!0,this.requestUpdate();return}try{n.preConditionMet=await n.step.preCondition(),this.requestUpdate()}catch(e){console.error(`Pre-condition check failed for step ${n.step.id}:`,e),n.preConditionMet=!1,this.requestUpdate()}}}async checkPostConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.postCondition){this.completeStep(e,t);return}try{let r=await n.step.postCondition();n.postConditionMet=r,n.status=r?`completed`:`failed`,r&&this.activateNextStep(e,t),this.requestUpdate()}catch(e){console.error(`Post-condition check failed for step ${n.step.id}:`,e),n.postConditionMet=!1,n.status=`failed`,this.requestUpdate()}}}completeStep(e,t){let n=this.getStepState(e,t);n&&(n.status=`completed`,this.activateNextStep(e,t),this.requestUpdate())}async activateNextStep(e,t){let n=this.stepStates.get(e);if(!n||t+1>=n.length)return;let r=n[t+1];r.status=`active`,await this.checkPreConditions(e,t+1)}async recheckActiveStepConditions(){if(!this.activeContributionId)return;let e=this.stepStates.get(this.activeContributionId);if(!e)return;let t=e.findIndex(e=>e.status===`active`);if(t!==-1){let n=e[t],r=n.step;if(r.postCondition)try{if(await r.postCondition()&&n.status===`active`){await this.checkPostConditions(this.activeContributionId,t);return}}catch{}}for(let t=0;t<e.length;t++){let n=e[t];n.status===`pending`&&n.step.preCondition&&await this.checkPreConditions(this.activeContributionId,t)}this.requestUpdate()}async executeStep(e,t){let n=this.getStepState(e,t);n&&await this.validatePreConditions(n,e,t)&&(n.status=`active`,this.requestUpdate(),(!n.step.command||await this.executeStepCommand(n))&&await this.checkPostConditions(e,t))}async validatePreConditions(e,t,n){return!e.step.preCondition||((e.preConditionMet===void 0||e.preConditionMet===!1)&&await this.checkPreConditions(t,n),e.preConditionMet===!0||(v(`Pre-conditions not met for step: ${e.step.title}`),!1))}async executeStepCommand(e){if(!e.step.command)return!0;try{let t=e.step.commandParams,n=typeof t==`function`?await t():t||{},r=u.createExecutionContext(n);return await u.execute(e.step.command,r),!0}catch(t){return console.error(`Failed to execute command for step ${e.step.id}:`,t),v(`Failed to execute step: ${e.step.title}`),e.status=`failed`,this.requestUpdate(),!1}}async runStepCommand(e,t){let n=this.getStepState(e,t);if(n&&n.step.command){if(n.step.preCondition&&!await n.step.preCondition()){v(`Pre-conditions not met for step: ${n.step.title}`);return}await this.executeStepCommand(n)&&await this.checkPostConditions(e,t)}}skipStep(e,t){let n=this.getStepState(e,t);n&&n.step.optional&&(n.status=`skipped`,this.activateNextStep(e,t),this.requestUpdate())}closeHowTo(){this.cleanupHowTo(),this.activeContributionId=null,this.stepStates.clear(),this.requestUpdate()}async showPanel(){this.isVisible=!0,await this.saveSettings(),this.requestUpdate(),await this.updateComplete,this.expandPanel()}async hidePanel(){this.isVisible=!1,await this.saveSettings(),this.requestUpdate()}async toggleVisibility(){this.isVisible?await this.hidePanel():await this.showPanel()}renderStep(e,t,n){let{step:r,status:i,preConditionMet:a,postConditionMet:o}=e,s=i===`active`,c=i===`completed`,l=i===`failed`,u=i===`pending`,d=i===`skipped`;return E`
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
            <docks-floating-panel
                label="HowTo Workflows"
                icon="list-check"
                .persistKey=${Z}
                @floating-close=${()=>{this.hidePanel()}}
            >
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
            </docks-floating-panel>
        `}static{this.styles=b`
        :host {
            display: contents;
        }

        .panel-content {
            width: 400px;
            max-height: 600px;
            box-sizing: border-box;
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
    `}};e([C()],Q.prototype,`contributions`,void 0),e([C()],Q.prototype,`activeContributionId`,void 0),e([C()],Q.prototype,`stepStates`,void 0),e([C()],Q.prototype,`isVisible`,void 0),e([w(`docks-floating-panel`)],Q.prototype,`floatingPanel`,void 0),Q=e([S(`docks-howto-panel`)],Q);var $=_(`HowToExtension`);function ne(e){$.info(`HowTo system extension loaded`),t.put(`howToService`,N);let n=()=>{if(document.querySelector(`docks-howto-panel`))return;let e=document.createElement(`docks-howto-panel`);document.body.appendChild(e),$.info(`HowTo panel added to DOM`)};if(document.body)requestAnimationFrame(()=>{n()});else{let e=()=>{document.body?n():requestAnimationFrame(e)};requestAnimationFrame(e)}g({command:{id:`howto.show-panel`,name:`Show HowTo Panel`,description:`Shows the HowTo workflows panel`,icon:`list-check`,parameters:[]},handler:{execute:()=>{T(Y,null)}}}),g({command:{id:`howto.toggle-panel`,name:`Toggle HowTo Panel`,description:`Toggles the visibility of the HowTo workflows panel`,icon:`list-check`,keyBinding:`CTRL+SHIFT+H`,parameters:[]},handler:{execute:()=>{T(X,null)}},contribution:{target:c,icon:`list-check`,label:`HowTo`}}),$.info(`HowTo system extension initialized`)}export{M as HOWTO_CONTRIBUTION_TARGET,ne as default,N as howToService};