import{$t as e,Cn as t,Ht as n,Kt as r,On as i,Tn as a,Yt as o,Z as s,_n as c,bn as l,cn as u,dn as d,in as f,nn as p,qt as m,un as h,ut as g,wn as _,yn as v}from"./canvas-bridge-core.js-Bffj0Hc4.js";import"./api-CqfWY80I.js";import{d as y,l as b,o as x}from"./runtime-DWzodDsU-Ce8yj0vX.js";import{C as S,_ as C,d as w,g as T,l as E,u as D,w as ee,x as O,y as k}from"./canvas-bridge-canvas.js-D2E74L6t.js";var A=a(`HowToService`),j=`system.howtos`,M=new class{constructor(){this.contributions=new Map,this.loadContributions(),D(p,e=>{e.target===`system.howtos`&&this.loadContributions()})}loadContributions(){let e=d.getContributions(j);this.contributions.clear();for(let t of e){if(!t.id){A.warn(`HowTo contribution missing id, skipping`);continue}if(t.label||=typeof t.title==`function`?t.title():t.title,!t.steps||t.steps.length===0){A.warn(`HowTo contribution "${t.id}" has no steps, skipping`);continue}let e=new Set;for(let n of t.steps)e.has(n.id)?A.warn(`HowTo contribution "${t.id}" has duplicate step ID: "${n.id}"`):e.add(n.id);this.contributions.set(t.id,t);let n=typeof t.title==`function`?t.title():t.title;A.debug(`Loaded HowTo contribution: ${n} (${t.id})`)}A.info(`Loaded ${this.contributions.size} HowTo contributions`)}getContribution(e){return this.contributions.get(e)}getAllContributions(){return Array.from(this.contributions.values())}getContributionsByCategory(e){return Array.from(this.contributions.values()).filter(t=>t.category===e)}hasContribution(e){return this.contributions.has(e)}},N=`welcome.txt`;async function P(){if(!await o.getWorkspace())return null;let e=await o.getFolders();return e.length===0?null:`${e[0].name}/${N}`}function F(e){return e&&typeof e.getFilePath==`function`}async function I(){return o.isConnected()}async function L(){let e=await P();if(!e)return!1;let t=await o.getWorkspace();if(!t)return!1;try{return await t.getResource(e)instanceof n}catch{return!1}}function R(){let e=f.get();if(!e||!F(e))return!1;let t=e.getFilePath();return t===N||t?.endsWith(`/welcome.txt`)===!0}function z(){if(!R())return!1;let e=f.get();return e?e.isDirty()===!1:!1}function B(){return!R()}function V(){return g.getCurrentApp()?.name||`AppSpace`}d.registerContribution(j,{id:`docks.onboarding`,title:()=>`Welcome to ${V()}`,description:()=>`Get started with ${V()} by learning the basics of workspace and file management`,icon:`graduation-cap`,label:``,category:`Getting Started`,initialize:e=>{let n=[];return D(r,()=>{e.requestUpdate()}),D(m,()=>{e.requestUpdate()}),n.push(t(f,()=>{e.requestUpdate()})),n.push(t(c,()=>{e.requestUpdate()})),()=>{n.forEach(e=>e())}},steps:[{id:`create-text-file`,title:`Create welcome.txt`,description:`Create a new text file called "welcome.txt" in your workspace. If you don't have a workspace selected, choose one first.`,preCondition:async()=>await I(),postCondition:async()=>await L(),command:`touch`,commandParams:async()=>{let e=await P();return e?{path:e,contents:`Welcome to AppSpace!

This is your first file. You can edit it and save your changes.`}:{}}},{id:`open-text-file`,title:`Open welcome.txt`,description:`Open the "welcome.txt" file in the editor.`,preCondition:async()=>await L(),postCondition:()=>R(),command:`open_editor`,commandParams:async()=>{let e=await P();return e?{path:e}:{}}},{id:`edit-and-save`,title:`Type something and save`,description:`Type some text in the editor to modify the file, then save it using Ctrl+S or the save button.`,preCondition:()=>R(),postCondition:()=>z()},{id:`close-text-file`,title:`Close the file`,description:`Close the editor tab by clicking the X button on the tab.`,preCondition:()=>R(),postCondition:()=>B()}]});function H(){let e=f.get();return e?e.input?.key===`.system.cognitive-ai-settings`||(e.tagName||e.localName||``).toLowerCase()===`docks-cognitive-settings-editor`:!1}async function U(){try{await y.whenReady();let e=y.getProvidersSettings();if(!e.defaultProviderId)return!1;let t=e.providers.find(t=>t.id===e.defaultProviderId);return t?.enabled?t.apiKey.trim()?!0:/ollama|webllm|localhost|127\.0\.0\.1/i.test(`${t.id} ${t.baseUrl}`):!1}catch{return!1}}function W(){let e=f.get();return!e||!H()?!1:e.isDirty?.()===!0}function G(){return H()&&!W()}function K(){return!H()}async function q(){try{await y.whenReady();for(let e of y.sessions.list())if(e.history.some(e=>e.role===`user`&&e.parts.some(e=>e.type===`text`&&e.text.trim()!==``)))return!0;return!1}catch{return!1}}function J(){return g.getCurrentApp()?.name||`AppSpace`}var te={id:`docks.ai-setup`,title:()=>`Set up AI in ${J()}`,description:()=>`Configure an LLM provider to enable AI chat features in ${J()}`,icon:`robot`,label:``,category:`Getting Started`,initialize:e=>{let n=[];n.push(t(f,()=>e.requestUpdate())),n.push(t(c,()=>e.requestUpdate()));let r=D(b.providersChanged,()=>e.requestUpdate()),i=D(b.sessionChanged,()=>e.requestUpdate());return n.push(()=>w(r),()=>w(i)),()=>{n.forEach(e=>e())}},steps:[{id:`open-ai-settings`,title:`Open AI Settings`,description:`Open the AI settings editor from the chat gear menu or the command palette.`,preCondition:()=>!0,postCondition:()=>H(),command:x},{id:`configure-llm-provider`,title:`Configure LLM Provider`,description:`Select a provider as default and enter an API key when required. Save your changes.`,preCondition:()=>H(),postCondition:async()=>{let e=await U(),t=G();return e&&t}},{id:`save-and-close`,title:`Save and Close`,description:`Save your changes (if not already saved) and close the AI settings editor tab.`,preCondition:()=>H(),postCondition:()=>K()},{id:`type-in-chat`,title:`Type in Chat`,description:`Open the AI chat view and type a message to test your AI configuration.`,preCondition:async()=>await U(),postCondition:async()=>await q()}]};d.registerContribution(j,te);var Y=`howto/show-panel`,X=`howto/toggle-panel`,Z=`howto-panel`,Q=class extends e{constructor(...e){super(...e),this.contributions=[],this.activeContributionId=null,this.stepStates=new Map,this.isVisible=!1}async doBeforeUI(){if(this.loadContributions(),D(p,e=>{e.target===`system.howtos`&&(this.loadContributions(),this.requestUpdate())}),D(Y,()=>this.showPanel()),D(X,()=>this.toggleVisibility()),await this.loadSettings(),!o.isConnected()&&this.isVisible===!1){let e=await u.getDialogSetting(Z);e&&e.visible!==void 0||(this.isVisible=!0,await this.saveSettings())}D(m,()=>{(async()=>{let e=await u.getDialogSetting(Z);!e||e.visible})()})}loadContributions(){this.contributions=M.getAllContributions()}async loadSettings(){let e=await u.getDialogSetting(Z);e&&e.visible!==void 0&&(this.isVisible=e.visible)}async saveSettings(){let e=await u.getDialogSetting(Z),t=typeof e==`object`&&e?e:{};await u.setDialogSetting(Z,{...t,visible:this.isVisible})}expandPanel(){this.floatingPanel&&(this.floatingPanel.minimized=!1)}async startHowTo(e){let t=M.getContribution(e);if(!t){l(`HowTo "${e}" not found`);return}this.cleanupHowTo(),this.activeContributionId=e,this.expandPanel();let n=t.steps.map(e=>({step:e,status:`pending`}));if(this.stepStates.set(e,n),t.initialize){let n={requestUpdate:()=>this.recheckActiveStepConditions(),contributionId:e};this.howtoCleanup=t.initialize(n)||void 0}this.requestUpdate(),await this.checkPreConditions(e,0)}cleanupHowTo(){this.howtoCleanup&&=(this.howtoCleanup(),void 0)}getStepState(e,t){let n=this.stepStates.get(e);return n&&t<n.length?n[t]:null}async checkPreConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.preCondition)n.preConditionMet=!0,this.requestUpdate();else try{n.preConditionMet=await n.step.preCondition(),this.requestUpdate()}catch(e){console.error(`Pre-condition check failed for step ${n.step.id}:`,e),n.preConditionMet=!1,this.requestUpdate()}}}async checkPostConditions(e,t){let n=this.getStepState(e,t);if(n){if(!n.step.postCondition)this.completeStep(e,t);else try{let r=await n.step.postCondition();n.postConditionMet=r,n.status=r?`completed`:`failed`,r&&this.activateNextStep(e,t),this.requestUpdate()}catch(e){console.error(`Post-condition check failed for step ${n.step.id}:`,e),n.postConditionMet=!1,n.status=`failed`,this.requestUpdate()}}}completeStep(e,t){let n=this.getStepState(e,t);n&&(n.status=`completed`,this.activateNextStep(e,t),this.requestUpdate())}async activateNextStep(e,t){let n=this.stepStates.get(e);if(!n||t+1>=n.length)return;let r=n[t+1];r.status=`active`,await this.checkPreConditions(e,t+1)}async recheckActiveStepConditions(){if(!this.activeContributionId)return;let e=this.stepStates.get(this.activeContributionId);if(!e)return;let t=e.findIndex(e=>e.status===`active`);if(t!==-1){let n=e[t],r=n.step;if(r.postCondition)try{if(await r.postCondition()&&n.status===`active`){await this.checkPostConditions(this.activeContributionId,t);return}}catch{}}for(let t=0;t<e.length;t++){let n=e[t];n.status===`pending`&&n.step.preCondition&&await this.checkPreConditions(this.activeContributionId,t)}this.requestUpdate()}async executeStep(e,t){let n=this.getStepState(e,t);n&&await this.validatePreConditions(n,e,t)&&(n.status=`active`,this.requestUpdate(),(!n.step.command||await this.executeStepCommand(n))&&await this.checkPostConditions(e,t))}async validatePreConditions(e,t,n){return!e.step.preCondition||((e.preConditionMet===void 0||e.preConditionMet===!1)&&await this.checkPreConditions(t,n),e.preConditionMet===!0||(l(`Pre-conditions not met for step: ${e.step.title}`),!1))}async executeStepCommand(e){if(!e.step.command)return!0;try{let t=e.step.commandParams,n=typeof t==`function`?await t():t||{},r=h.createExecutionContext(n);return await h.execute(e.step.command,r),!0}catch(t){return console.error(`Failed to execute command for step ${e.step.id}:`,t),l(`Failed to execute step: ${e.step.title}`),e.status=`failed`,this.requestUpdate(),!1}}async runStepCommand(e,t){let n=this.getStepState(e,t);n&&n.step.command&&(n.step.preCondition&&!await n.step.preCondition()?l(`Pre-conditions not met for step: ${n.step.title}`):await this.executeStepCommand(n)&&await this.checkPostConditions(e,t))}skipStep(e,t){let n=this.getStepState(e,t);n&&n.step.optional&&(n.status=`skipped`,this.activateNextStep(e,t),this.requestUpdate())}closeHowTo(){this.cleanupHowTo(),this.activeContributionId=null,this.stepStates.clear(),this.requestUpdate()}async showPanel(){this.isVisible=!0,await this.saveSettings(),this.requestUpdate(),await this.updateComplete,this.expandPanel()}async hidePanel(){this.isVisible=!1,await this.saveSettings(),this.requestUpdate()}async toggleVisibility(){this.isVisible?await this.hidePanel():await this.showPanel()}renderStep(e,t,n){let{step:r,status:i,preConditionMet:a,postConditionMet:o}=e,s=i===`active`,c=i===`completed`,l=i===`failed`,u=i===`pending`,d=i===`skipped`;return S`
            <div class="step ${i}" ?data-active=${s}>
                <div class="step-header">
                    <div class="step-number">${t+1}</div>
                    <div class="step-title">${r.title}</div>
                    <div class="step-status">
                        ${r.command?S`
                            <wa-button 
                                size="s" 
                                appearance="plain" 
                                @click=${e=>{e.stopPropagation(),this.runStepCommand(n,t)}}
                                title="Run step command"
                            >
                                <wa-icon name="play"></wa-icon>
                            </wa-button>
                        `:O}
                        ${c?S`<wa-icon name="check-circle" class="status-icon completed"></wa-icon>`:O}
                        ${l?S`<wa-icon name="xmark-circle" class="status-icon failed"></wa-icon>`:O}
                        ${d?S`<wa-icon name="minus-circle" class="status-icon skipped"></wa-icon>`:O}
                        ${u?S`<wa-icon name="circle" class="status-icon pending"></wa-icon>`:O}
                        ${s?S`<wa-icon name="play-circle" class="status-icon active"></wa-icon>`:O}
                    </div>
                </div>
                <div class="step-description">${r.description}</div>
                ${r.preCondition&&a!==void 0?S`
                    <div class="condition pre-condition ${a?`met`:`not-met`}">
                        <wa-icon name="${a?`check`:`xmark`}"></wa-icon>
                        <span>Pre-condition: ${a?`Met`:`Not met`}</span>
                    </div>
                `:O}
                ${r.postCondition&&o!==void 0?S`
                    <div class="condition post-condition ${o?`met`:`not-met`}">
                        <wa-icon name="${o?`check`:`xmark`}"></wa-icon>
                        <span>Post-condition: ${o?`Met`:`Not met`}</span>
                    </div>
                `:O}
                ${s&&r.optional?S`
                    <div class="step-actions">
                        <wa-button size="s" appearance="outline" @click=${()=>this.skipStep(n,t)}>
                            <wa-icon name="forward"></wa-icon>
                            Skip
                        </wa-button>
                    </div>
                `:O}
            </div>
        `}render(){if(!this.isVisible)return O;let e=this.activeContributionId?M.getContribution(this.activeContributionId):null,t=this.activeContributionId&&this.stepStates.get(this.activeContributionId)||[];return S`
            <docks-floating-panel
                label="HowTo Workflows"
                icon="list-check"
                .persistKey=${Z}
                @floating-close=${()=>{this.hidePanel()}}
            >
                    <div class="panel-content">
                        ${e?S`
                            <div class="active-workflow">
                                <div class="workflow-header">
                                    <div class="workflow-title-section">
                                        <h3>${typeof e.title==`function`?e.title():e.title}</h3>
                                        ${e.description?S`
                                            <p class="workflow-description">${typeof e.description==`function`?e.description():e.description}</p>
                                        `:O}
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
                        `:S`
                            <div class="workflows-list">
                                <h3>Available Workflows</h3>
                                ${this.contributions.length===0?S`
                                    <div class="empty-state">
                                        <wa-icon name="list-check" style="font-size: 2em; opacity: 0.5; margin-bottom: 12px;"></wa-icon>
                                        <p>No HowTo workflows available yet.</p>
                                        <p style="font-size: 0.9em; opacity: 0.7;">Extensions can register workflows via the contribution registry.</p>
                                    </div>
                                `:this.contributions.map(e=>{let t=typeof e.title==`function`?e.title():e.title,n=e.description?typeof e.description==`function`?e.description():e.description:null;return S`
                                    <div class="workflow-item" @click=${()=>this.startHowTo(e.id)}>
                                        ${e.icon?S`
                                            <wa-icon name="${e.icon}"></wa-icon>
                                        `:S`
                                            <wa-icon name="list-check"></wa-icon>
                                        `}
                                        <div class="workflow-info">
                                            <div class="workflow-title">${t}</div>
                                            ${n?S`
                                                <div class="workflow-desc">${n}</div>
                                            `:O}
                                            <div class="workflow-meta">${e.steps.length} step${e.steps.length===1?``:`s`}</div>
                                        </div>
                                    </div>
                                `})}
                            </div>
                        `}
                    </div>
            </docks-floating-panel>
        `}static{this.styles=ee`
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
    `}};_([C()],Q.prototype,`contributions`,void 0),_([C()],Q.prototype,`activeContributionId`,void 0),_([C()],Q.prototype,`stepStates`,void 0),_([C()],Q.prototype,`isVisible`,void 0),_([T(`docks-floating-panel`)],Q.prototype,`floatingPanel`,void 0),Q=_([k(`docks-howto-panel`)],Q);var $=a(`HowToExtension`);function ne(e){$.info(`HowTo system extension loaded`),i.put(`howToService`,M);let t=()=>{if(document.querySelector(`docks-howto-panel`))return;let e=document.createElement(`docks-howto-panel`);document.body.appendChild(e),$.info(`HowTo panel added to DOM`)};if(document.body)requestAnimationFrame(()=>{t()});else{let e=()=>{document.body?t():requestAnimationFrame(e)};requestAnimationFrame(e)}v({command:{id:`howto.show-panel`,name:`Show HowTo Panel`,description:`Shows the HowTo workflows panel`,icon:`list-check`,parameters:[]},handler:{execute:()=>{E(Y,null)}}}),v({command:{id:`howto.toggle-panel`,name:`Toggle HowTo Panel`,description:`Toggles the visibility of the HowTo workflows panel`,icon:`list-check`,keyBinding:`CTRL+SHIFT+H`,parameters:[]},handler:{execute:()=>{E(X,null)}},contribution:{target:s,icon:`list-check`,label:`HowTo`}}),$.info(`HowTo system extension initialized`)}export{j as HOWTO_CONTRIBUTION_TARGET,ne as default,M as howToService};