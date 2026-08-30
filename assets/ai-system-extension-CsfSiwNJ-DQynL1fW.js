import{_ as e,f as t,u as n,v as r}from"./fs-access-Cjcg0_Me-BYL2BwWI.js";import{F as i,G as a,I as o,J as s,L as c,M as l,O as u,S as d,W as f,a as p,dt as m,ft as h,ht as g,j as ee,l as _,m as v,mt as y,n as b,o as x,pt as S,q as C,ut as te,vt as w,x as T,y as ne,yt as E}from"./dist-bIYJ7gqD.js";import"./lit-C_vfTwkv.js";import{a as D,c as O,f as k,i as A,n as j,o as M,r as N,s as P,t as F,u as I}from"./ai-service-Cmafte5S-gmardGH1.js";var L=`You are an assistant in a web application with workspace, editors, and AI chat.

**Tools:**
Commands are exposed as AI-callable tools. Tools are context-aware - available commands depend on active editor, selected files, and workspace state.

**Tool Usage Rules:**
1. If tools are available and match the request, use them - don't describe manual steps
2. Read tool descriptions/parameters to select the correct tool
3. Call tools in sequence for multi-step tasks
4. After successful tool execution, provide a final response - don't loop or call more tools unless explicitly requested
5. If no tools are available, explain what context is needed

Keep responses concise. Use tools when available rather than discussing alternatives.

`;for(let{label:e,...t}of[{label:`Ollama (Local)`,name:`ollama`,model:`gemma3:12b`,chatApiEndpoint:`https://<your-server>/v1/chat/completions`,apiKey:``},{label:`OpenWebUI (Self Hosted)`,name:`openwebui`,model:`gemma3:12b`,chatApiEndpoint:`https://<your-server>/api/v1/chat/completion`,apiKey:``},{label:`OpenAI`,name:`openai`,model:`gpt-4.1`,chatApiEndpoint:`https://api.openai.com/v1/chat/completions`,apiKey:`<your api key>`},{label:`Groq`,name:`groq`,model:`llama-3.1-8b-instant`,chatApiEndpoint:`https://api.groq.com/openai/v1/chat/completions`,apiKey:`<your api key>`},{label:`Cerebras`,name:`cerebras`,model:`llama3.1-8b`,chatApiEndpoint:`https://api.cerebras.ai/v1/chat/completions`,apiKey:`<your api key>`},{label:`WebLLM`,name:`webllm`,model:`gemma-2-9b-it-q4f16_1-MLC`,chatApiEndpoint:``,apiKey:``,parameters:{context_window_size:4096}},{label:`Mistral`,name:`mistral`,model:`mistral-large-latest`,chatApiEndpoint:`https://api.mistral.ai/v1/chat/completions`,apiKey:`<your api key>`},{label:`LiteLLM`,name:`litellm`,model:`gpt-3.5-turbo`,chatApiEndpoint:`https://<your-server>/v1/chat/completions`,apiKey:`<your api key>`}])a.registerContribution(j,{target:j,label:e,provider:t});a.registerContribution(N,{label:`App State Enhancer`,enhancer:{priority:20,enhance:async(e,t)=>{try{let t=await n.getWorkspace(),r=b.getEditorArea()?.getActiveEditor(),i={workspace:t?.getName()||null,activeEditor:r?{title:r.input?.title||null,editorId:r.input?.editorId||null}:null};return`${e}\n\n***App's state:***\n${JSON.stringify(i,null,2)}`}catch{return e}}}});var R=class{constructor(){this.activeSession=null,this.pastSessions=[]}async load(){let e=await T.get(`aiChatSessions`);if(e){if(e.active&&Array.isArray(e.history))this.activeSession=e.active;else if(e.activeSessionId&&Array.isArray(e.sessions))this.activeSession=e.sessions.find(t=>t.id===e.activeSessionId)||null,this.pastSessions=e.sessions.filter(t=>t.id!==e.activeSessionId);else if(Array.isArray(e.all)){let[t,...n]=e.all.sort((e,t)=>t.updatedAt-e.updatedAt);this.activeSession=t||null,this.pastSessions=n}}}async persist(){let e=[];this.activeSession&&e.push(this.activeSession),e.push(...this.pastSessions),await T.set(`aiChatSessions`,{all:e,activeSessionId:this.activeSession?.id||null})}createSession(){let e={id:`session-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,history:[],title:`New Chat`,createdAt:Date.now(),updatedAt:Date.now()};return this.activeSession&&this.pastSessions.unshift(this.activeSession),this.activeSession=e,this.persist(),e}getActiveSession(){return this.activeSession}getActiveSessionId(){return this.activeSession?.id||``}switchToSession(e){if(this.activeSession?.id===e)return!0;let t=this.pastSessions.findIndex(t=>t.id===e);if(t===-1)return!1;let[n]=this.pastSessions.splice(t,1);return n?(this.activeSession&&this.pastSessions.unshift(this.activeSession),this.activeSession=n,this.persist(),!0):!1}getPastSessions(){return this.pastSessions}deletePastSession(e){let t=this.pastSessions.findIndex(t=>t.id===e);return t!==-1&&(this.pastSessions.splice(t,1),this.persist(),!0)}addMessage(e){this.activeSession&&(this.activeSession.history.push(e),this.activeSession.updatedAt=Date.now(),this.persist())}setTitle(e){this.activeSession&&(this.activeSession.title=e,this.persist())}generateTitle(e){let t=e.trim();return t?t.length<=30?t:t.substring(0,30).trim()+`...`:`New Chat`}deleteActiveAndSwitchToFirst(){this.activeSession&&(this.activeSession=this.pastSessions.shift()||null,this.activeSession||this.createSession(),this.persist())}},z=class{constructor(e){this.streamingMessages=new Map,this.currentIndex=-1,this.pendingUpdate=!1,this.onUpdate=e}createStreamingMessage(e){let t=++this.currentIndex;return this.streamingMessages.set(t,{message:{role:e,content:``},isStreaming:!0}),t}updateStreamingMessage(e,t){let n=this.streamingMessages.get(e);n&&(n.message.content+=t,this.scheduleUpdate())}completeStreamingMessage(e,t){let n=this.streamingMessages.get(e);n&&(n.message=t,n.isStreaming=!1)}removeStreamingMessage(e){this.streamingMessages.delete(e)}findStreamingMessage(e){return Array.from(this.streamingMessages.values()).find(t=>t.message.role===e)?.message}getAllStreamingMessages(){return Array.from(this.streamingMessages.values())}scheduleUpdate(){this.pendingUpdate||(this.pendingUpdate=!0,this.rafHandle=requestAnimationFrame(()=>{this.pendingUpdate=!1,this.onUpdate?.()}))}cancelUpdates(){this.rafHandle!==void 0&&(cancelAnimationFrame(this.rafHandle),this.rafHandle=void 0,this.pendingUpdate=!1)}reset(){this.streamingMessages.clear(),this.cancelUpdates(),this.currentIndex=-1}},B=`aiViewChat`,V=class{constructor(e){this.aiService=e,this.providers=[],this.availableModels=[],this.loadingModels=!1,this.providerFactory=new M}async initialize(){this.providers=await this.aiService.getProviders()||[];let e=await this.aiService.getDefaultProvider();e&&(this.selectedProvider=e)}getProviders(){return this.providers}getSelectedProvider(){return this.selectedProvider}setSelectedProvider(e){this.selectedProvider=e}getAvailableModels(){return this.availableModels}isLoadingModels(){return this.loadingModels}async saveSettings(e,t,n,r,i){let a={...await T.get(B)||{}};r!==void 0&&(a.requireToolApproval=r),i!==void 0&&(a.toolApprovalAllowlist=i),await T.set(B,a);let o=this.providers.find(t=>t.name===e);if(o){let r={...o,model:t,...n!==void 0&&{apiKey:n}};this.selectedProvider=r,await this.updateProviderInAIConfig(e,{model:t,...n!==void 0&&{apiKey:n}}),await this.aiService.setDefaultProvider(e)}}async updateProviderInAIConfig(e,t){let n=await T.get(`aiConfig`)||{};if(!n.providers||!Array.isArray(n.providers))return;let r=n.providers.findIndex(t=>t.name===e);r>=0&&(n.providers[r]={...n.providers[r],...t},await T.set(D,n))}async loadToolApprovalAllowlist(){return(await T.get(B)||{}).toolApprovalAllowlist||[]}async fetchModels(e){let t=this.providers.find(t=>t.name===e);if(t){this.loadingModels=!0,this.availableModels=[];try{let e=this.providerFactory.getProvider(t);this.availableModels=await e.getAvailableModels?.(t)??[]}finally{this.loadingModels=!1}}}},H=class{constructor(){this.groups=new Map}createGroup(e,t,n,r,i){let a=`group-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;this.currentGroupId=a;let o={id:a,sessionId:e,userMessageIndex:t,userMessage:n,timestamp:new Date,agents:new Map,messageIndices:new Map};return r.forEach(e=>{let{label:t,icon:n}=i(e);o.agents.set(e,{role:e,label:t,icon:n,status:`streaming`})}),this.groups.set(a,o),a}getGroup(e){return this.groups.get(e)}updateAgentStatus(e,t,n,r,i){let a=this.groups.get(e);if(!a)return;let o=a.agents.get(t);o&&(o.status=n,r&&(o.message=r),i!==void 0&&(o.messageIndex=i,a.messageIndices.set(t,i)))}getGroupsForSession(e){return Array.from(this.groups.values()).filter(t=>t.sessionId===e)}findGroupForUserMessage(e,t,n){return Array.from(this.groups.values()).find(r=>r.sessionId===e&&r.userMessageIndex===t&&r.userMessage===n)}findGroupForMessage(e,t,n){return Array.from(this.groups.values()).find(r=>r.sessionId===e&&r.messageIndices.get(t)===n)}getCurrentGroupId(){return this.currentGroupId}setCurrentGroupId(e){this.currentGroupId=e}clearCurrentGroup(){this.currentGroupId=void 0}getAllGroups(){return Array.from(this.groups.values())}clearAll(){this.groups.clear(),this.currentGroupId=void 0}},U=class extends y{constructor(...e){super(...e),this.isStreaming=!1,this.showHeader=!0}updated(e){super.updated(e),(e.has(`message`)||!this.hasAttribute(`data-is-user`))&&this.updateAlignment()}updateAlignment(){this.message&&this.setAttribute(`data-is-user`,String(this.message.role===`user`))}copyToClipboard(e){navigator.clipboard.writeText(e).catch(e=>console.error(`Failed to copy:`,e))}processMarkdownContent(e){return e.includes(`code-blocwrapper`)?e:e.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi,(e,t,n)=>`
            <div class="code-blocwrapper">
                <div class="code-blocheader">
                    <wa-copy-button value="${this.escapeHtmlAttribute(n.trim())}" size="s" label="Copy code"></wa-copy-button>
                </div>
                <div class="code-bloccontent">
                    <pre><code${t}>${n}</code></pre>
                </div>
            </div>`)}escapeHtmlAttribute(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}handleResend(e){e?.preventDefault(),e?.stopPropagation(),this.message&&this.dispatchEvent(new CustomEvent(`resend`,{detail:{message:this.message,messageIndex:this.messageIndex},bubbles:!0,composed:!0}))}render(){if(!this.message)return w``;let e=this.message,t=e.role===`user`;return w`
            <div class="message-wrapper ${t?`user`:`assistant`} ${this.isStreaming?`streaming`:``}">
                ${o(this.showHeader&&!t,()=>w`
                    <div class="message-header">
                        <div class="message-meta">
                            <wa-icon name="robot" label="${e.role}"></wa-icon>
                            <span class="role-name">${e.role}</span>
                        </div>
                    <div class="message-actions">
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${()=>this.copyToClipboard(e.content)}">
                            <wa-icon slot="label" name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                    </div>
                `)}
                <div class="message-content-wrapper ${t?`user`:``}">
                    <div class="message-content">
                        ${c(this.processMarkdownContent(u(e.content||``)))}
                        ${o(this.isStreaming,()=>w`<span class="streaming-cursor">▋</span>`)}
                    </div>
                    ${o(t,()=>w`
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${()=>this.copyToClipboard(e.content)}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                        <wa-button variant="neutral" appearance="plain" size="s" title="Resend"
                            @click="${e=>this.handleResend(e)}">
                            <wa-icon name="rotate-right" label="Resend"></wa-icon>
                        </wa-button>
                    `)}
                </div>
            </div>
        `}static{this.styles=E`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 85%;
            box-sizing: border-box;
            animation: slideIn 0.2s ease-out;
        }

        :host([data-is-user="true"]) { align-self: flex-end; }
        :host([data-is-user="false"]) { align-self: flex-start; }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
            padding: 0 0.5rem;
        }

        .message-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: var(--wa-color-text-quiet);
        }

        .role-name { text-transform: capitalize; }

        .message-actions {
            display: flex;
            gap: 0.25rem;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .message-wrapper:hover .message-actions,
        :host:hover .message-actions { opacity: 1; }

        .message-content-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            width: 100%;
        }

        .message-content-wrapper.user {
            flex-direction: row;
            align-items: center;
        }

        .message-content {
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            background-color: var(--wa-color-surface-default);
            word-break: breaword;
            overflow-wrap: breaword;
            max-width: 100%;
            box-sizing: border-box;
            line-height: 1.3;
            font-size: 0.9rem;
        }

        .message-content-wrapper.user .message-content {
            padding: 0.0625rem 0.75rem;
            background-color: var(--wa-color-brand-fill-quiet);
            color: var(--wa-color-text-normal);
            line-height: 1.4;
            flex: 1;
        }

        .message-content p { margin: 0; padding: 0; }
        .message-content ul, .message-content ol { margin: 0.25rem 0; padding-left: 1.25rem; }
        .message-content li { margin: 0.125rem 0; padding: 0; line-height: 1.3; }
        .message-content :first-child { margin-top: 0; padding-top: 0; }
        .message-content :last-child { margin-bottom: 0; padding-bottom: 0; }

        .message-content pre {
            white-space: pre-wrap;
            word-break: breaall;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: auto;
            margin: 0;
        }

        .message-content code {
            font-family: 'Courier New', monospace;
            background-color: var(--wa-color-surface-lowered);
            padding: 0.125rem 0.25rem;
            border-radius: 0.125rem;
        }

        .message-content pre code { background-color: transparent; padding: 0; display: block; }

        .code-blocwrapper {
            margin: 0.75rem 0;
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            border-radius: var(--wa-border-radius-m);
            background-color: var(--wa-color-surface-lowered);
            overflow: hidden;
        }

        .code-blocheader {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0.375rem 0.5rem;
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            background-color: var(--wa-color-surface-default);
        }

        .code-bloccontent { padding: 0.75rem; overflow-x: auto; }
        .code-bloccontent pre { margin: 0; background-color: transparent; }
        .code-bloccontent code { background-color: transparent; padding: 0; }

        .streaming-cursor {
            display: inline-block;
            animation: blink 1s infinite;
            color: var(--wa-color-brand-50);
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `}};i([h({type:Object,attribute:!1})],U.prototype,`message`,void 0),i([h({type:Boolean})],U.prototype,`isStreaming`,void 0),i([h({type:Boolean})],U.prototype,`showHeader`,void 0),i([h({type:Number,attribute:!1})],U.prototype,`messageIndex`,void 0),U=i([S(`docks-ai-chat-message`)],U);var W=class extends y{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.busy=!1,this.hasProvider=!0}onInput(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent(`input-change`,{detail:{value:this.value},bubbles:!0,composed:!0}))}onKeyDown(e){e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),this.send())}async send(){if(!this.value.trim()||this.disabled||!this.hasProvider)return;let e=this.value;this.value=``,this.requestUpdate(),await this.updateComplete,this.textareaElement&&(this.textareaElement.value=``,this.textareaElement.focus()),this.dispatchEvent(new CustomEvent(`send`,{detail:{value:e},bubbles:!0,composed:!0}))}cancel(){this.dispatchEvent(new CustomEvent(`cancel`,{bubbles:!0,composed:!0}))}render(){return w`
            <div class="input-container">
                <div class="input-row">
                    <wa-textarea
                        placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                        size="s"
                        resize="auto"
                        rows="1"
                        .value="${this.value}"
                        ?disabled="${this.disabled||!this.hasProvider}"
                        @input="${this.onInput}"
                        @keydown="${this.onKeyDown}">
                    </wa-textarea>
                    ${o(this.busy,()=>w`
                        <wa-button appearance="plain" size="s" @click="${this.cancel}">
                            <wa-icon name="stop" label="Stop"></wa-icon>
                        </wa-button>
                    `)}
                </div>
            </div>
        `}static{this.styles=E`
        :host { display: block; width: 100%; }
        .input-container { margin-bottom: 0.25rem; margin-left: 0.25rem; }
        .input-row { display: flex; gap: 0.5rem; align-items: flex-end; }
        wa-textarea { flex: 1; min-width: 0; }
    `}};i([h({type:String})],W.prototype,`value`,void 0),i([h({type:Boolean})],W.prototype,`disabled`,void 0),i([h({type:Boolean})],W.prototype,`busy`,void 0),i([h({type:Boolean})],W.prototype,`hasProvider`,void 0),i([te(`wa-textarea`)],W.prototype,`textareaElement`,void 0),W=i([S(`docks-ai-chat-input`)],W);var G=class extends y{copyToClipboard(e){navigator.clipboard.writeText(e).catch(e=>console.error(`Failed to copy:`,e))}renderStatusIcon(e){switch(e){case`streaming`:return w`<wa-icon name="spinner" class="spinning"></wa-icon>`;case`completed`:return w`<wa-icon name="check-circle" class="status-success"></wa-icon>`;case`error`:return w`<wa-icon name="exclamation-circle" class="status-error"></wa-icon>`}}renderCard(e,t){return t?w`
            <div class="agent-card status-${e.status}">
                <div class="agent-card-header">
                    <wa-icon name="${e.icon}" label="${e.label}"></wa-icon>
                    <span>${e.label}</span>
                    ${this.renderStatusIcon(e.status)}
                    <div class="agent-card-actions">
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${()=>this.copyToClipboard(t.content||``)}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                <div class="agent-card-content">
                    <docks-ai-chat-message
                        .message="${t}"
                        .isStreaming="${e.status===`streaming`}"
                        .showHeader="${!1}"
                        .messageIndex="${e.messageIndex}">
                    </docks-ai-chat-message>
                </div>
            </div>
        `:w`
                <div class="agent-card status-${e.status}">
                    <div class="agent-card-header">
                        <wa-icon name="${e.icon}" label="${e.label}"></wa-icon>
                        <span>${e.label}</span>
                        ${this.renderStatusIcon(e.status)}
                    </div>
                    <div class="agent-card-content waiting">Waiting for response...</div>
                </div>
            `}render(){if(!this.group)return w``;let e=Array.from(this.group.agents.values()),t=e.filter(e=>e.status===`completed`).length,n=e.filter(e=>e.status===`streaming`).length,r=e.filter(e=>e.status===`error`).length,i=e.length>0&&t+r===e.length,a=e.length===1;return w`
            <div class="agent-response-group">
                ${o(!a,()=>w`
                    <div class="group-header">
                        <wa-icon name="robot" label="Multiple Agents"></wa-icon>
                        <span>Multiple Agents</span>
                        <span class="status-badge">
                            ${o(n>0,()=>w`<span class="streaming">${n} responding</span>`)}
                            ${o(i,()=>w`<span class="done">All completed (${t})</span>`)}
                        </span>
                    </div>
                `)}
                <div class="group-content">
                    ${l(e,e=>e.role,e=>{let t=e.message||(e.status===`streaming`&&this.findStreamingMessage?this.findStreamingMessage(e.role):void 0);return this.renderCard(e,t)})}
                </div>
            </div>
        `}static{this.styles=E`
        :host { display: block; width: 100%; box-sizing: border-box; }

        .agent-response-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }

        .group-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background-color: var(--wa-color-surface-lowered);
            border: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            font-weight: 500;
        }

        .status-badge {
            display: flex;
            gap: 0.5rem;
            margin-left: auto;
            font-size: 0.875rem;
        }

        .streaming { color: var(--wa-color-brand-50); }
        .done { color: var(--wa-color-success-70); font-weight: 600; }

        .group-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }

        .agent-card {
            display: flex;
            flex-direction: column;
            border: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            background-color: var(--wa-color-surface-default);
        }

        .agent-card.status-streaming { border-color: var(--wa-color-brand-border-quiet); }
        .agent-card.status-completed { border-color: var(--wa-color-success-border-quiet); }
        .agent-card.status-error { border-color: var(--wa-color-danger-border-quiet); }

        .agent-card-header {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.375rem 0.5rem;
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            background-color: var(--wa-color-surface-lowered);
            font-weight: 500;
            font-size: 0.875rem;
        }

        .agent-card-actions { margin-left: auto; display: flex; gap: 0.25rem; }
        .agent-card-content { padding: 0.375rem; }
        .waiting { padding: 1rem; text-align: center; color: var(--wa-color-text-quiet); }

        .spinning { animation: spin 1s linear infinite; }
        .status-success { color: var(--wa-color-success-60); }
        .status-error { color: var(--wa-color-danger-60); }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `}};i([h({type:Object,attribute:!1})],G.prototype,`group`,void 0),i([h({type:Function,attribute:!1})],G.prototype,`findStreamingMessage`,void 0),G=i([S(`docks-ai-agent-response-group`)],G);var K=class extends y{constructor(...e){super(...e),this.pendingApprovals=new Map}approve(e,t){this.dispatchEvent(new CustomEvent(`approve`,{detail:{approvalId:e,approval:t},bubbles:!0,composed:!0})),t.resolve(!0),this.pendingApprovals.delete(e),this.requestUpdate()}deny(e,t){t.resolve(!1),this.pendingApprovals.delete(e),this.requestUpdate()}formatArgs(e){let t={};try{t=JSON.parse(e)}catch{}return Object.entries(t).map(([e,t])=>`${e}=${JSON.stringify(t)}`).join(`, `)}render(){return this.pendingApprovals.size===0?w``:w`
            <div class="approval-container">
                ${Array.from(this.pendingApprovals.entries()).map(([e,t])=>{let n=t.request.toolCalls,r=n[0],i=n.length===1?`AI wants to execute: ${r?.function.name}()`:`AI wants to execute ${n.length} tools`;return w`
                        <wa-details class="approval-item">
                            <span slot="summary" class="approval-summary">
                                <span>${i}</span>
                                <div class="approval-inline-actions">
                                    <wa-button appearance="plain" size="s" variant="neutral"
                                        @click="${n=>{n.stopPropagation(),this.deny(e,t)}}">
                                        <wa-icon name="xmark" label="Deny"></wa-icon>
                                    </wa-button>
                                    <wa-button appearance="plain" size="s" variant="success"
                                        @click="${async n=>{n.stopPropagation(),this.approve(e,t)}}">
                                        <wa-icon name="check" label="Approve"></wa-icon>
                                    </wa-button>
                                </div>
                            </span>
                            <div class="approval-detail">
                                <strong>${t.role} wants to execute:</strong>
                                <ul class="tool-list">
                                    ${l(n,e=>e.id,e=>{let n=this.formatArgs(e.function.arguments||`{}`),r=t.alwaysAllowSelections.get(e.id)||!1;return w`
                                            <li class="tool-item">
                                                <label class="always-allow-label">
                                                    <wa-checkbox
                                                        ?checked="${r}"
                                                        @change="${n=>{t.alwaysAllowSelections.set(e.id,n.target.checked),this.requestUpdate()}}">
                                                    </wa-checkbox>
                                                    <span>Always allow</span>
                                                </label>
                                                <code>${e.function.name}(${n})</code>
                                            </li>
                                        `})}
                                </ul>
                            </div>
                        </wa-details>
                    `})}
            </div>
        `}static{this.styles=E`
        :host { display: block; }

        .approval-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-warning-border-normal);
            background-color: var(--wa-color-warning-fill-quiet);
        }

        .approval-summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
        }

        .approval-inline-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

        .approval-detail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem 0;
            font-size: 0.875rem;
        }

        .tool-list { margin: 0.5rem 0 0 1.5rem; padding: 0; list-style: disc; }

        .tool-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }

        .always-allow-label {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            cursor: pointer;
        }

        code {
            font-family: var(--wa-font-mono);
            font-size: 0.875rem;
            padding: 0.125rem 0.25rem;
            background-color: var(--wa-color-neutral-fill-subtle);
            border-radius: var(--wa-border-radius-s);
        }
    `}};i([h({type:Map,attribute:!1})],K.prototype,`pendingApprovals`,void 0),K=i([S(`docks-ai-tool-approval`)],K);var q=class extends y{constructor(...e){super(...e),this.message=`No AI provider configured`,this.hint=`Click the settings icon to configure an AI provider`}render(){return w`
            <div class="empty-state">
                <wa-icon name="robot" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                <p>${this.message}</p>
                <p class="hint">${this.hint}</p>
            </div>
        `}static{this.styles=E`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            text-align: center;
            color: var(--wa-color-text-quiet);
        }

        .empty-state p { margin: 0.5rem 0; }
        .hint { font-size: 0.875rem; opacity: 0.7; }
    `}};i([h({type:String})],q.prototype,`message`,void 0),i([h({type:String})],q.prototype,`hint`,void 0),q=i([S(`docks-ai-empty-state`)],q);var J={running:`spinner`,completed:`check-circle`,failed:`exclamation-circle`,skipped:`forward`,pending:`circle`},re={running:`var(--wa-color-brand-50)`,completed:`var(--wa-color-success-60)`,failed:`var(--wa-color-danger-60)`,skipped:`var(--wa-color-neutral-40)`,pending:`var(--wa-color-neutral-40)`},Y=class extends y{constructor(...e){super(...e),this.expanded=!0}render(){if(!this.plan)return w``;let e=this.plan.steps.filter(e=>e.status===`completed`).length,t=this.plan.steps.length,n=t>0?Math.round(e/t*100):0;return w`
            <div class="taspanel">
                <div class="panel-header" @click="${()=>{this.expanded=!this.expanded}}">
                    <wa-icon name="diagram-project" label="Task Plan"></wa-icon>
                    <span class="panel-title">Task Plan</span>
                    <span class="progress-text">${e}/${t}</span>
                    <wa-progress-bar value="${n}" class="progress-bar"></wa-progress-bar>
                    <wa-icon name="${this.expanded?`chevron-up`:`chevron-down`}" label="toggle"></wa-icon>
                </div>
                ${o(this.expanded,()=>w`
                    <div class="panel-body">
                        ${l(this.plan.steps,e=>e.id,e=>w`
                            <div class="step-row">
                                <wa-icon
                                    name="${J[e.status]??`circle`}"
                                    style="color: ${re[e.status]??`var(--wa-color-neutral-40)`}; ${e.status===`running`?`animation: spin 1s linear infinite;`:``}">
                                </wa-icon>
                                <div class="step-info">
                                    <span class="step-role">${e.role}</span>
                                    <span class="step-task">${e.subTask}</span>
                                </div>
                                ${o(e.revisions>0,()=>w`
                                    <span class="revisions-badge">${e.revisions} rev</span>
                                `)}
                            </div>
                        `)}
                    </div>
                `)}
            </div>
        `}static{this.styles=E`
        :host { display: block; }

        .taspanel {
            border: solid var(--wa-border-width-s) var(--wa-color-brand-border-quiet);
            border-radius: var(--wa-border-radius-m);
            background: var(--wa-color-surface-default);
            margin: 0.5rem 0;
        }

        .panel-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            user-select: none;
        }

        .panel-title {
            font-weight: 500;
            flex: 0 0 auto;
        }

        .progress-text {
            font-size: 0.8rem;
            color: var(--wa-color-text-quiet);
        }

        .progress-bar {
            flex: 1;
            min-width: 60px;
        }

        .panel-body {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem 0.75rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .step-row {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 0.25rem 0;
        }

        .step-info {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            flex: 1;
            min-width: 0;
        }

        .step-role {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            text-transform: uppercase;
        }

        .step-task {
            font-size: 0.85rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .revisions-badge {
            font-size: 0.7rem;
            padding: 0.1rem 0.3rem;
            background: var(--wa-color-warning-fill-quiet);
            border-radius: var(--wa-border-radius-s);
            color: var(--wa-color-warning-70);
            flex-shrink: 0;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `}};i([h({type:Object,attribute:!1})],Y.prototype,`plan`,void 0),i([m()],Y.prototype,`expanded`,void 0),Y=i([S(`docks-ai-task-progress-panel`)],Y);var ie={code:`code`,json:`brackets-curly`,"file-list":`list`,plan:`diagram-project`,review:`magnifying-glass`,text:`file-lines`},X=class extends y{constructor(...e){super(...e),this.artifacts=[],this.expanded=!1}render(){return this.artifacts.length===0?w``:w`
            <div class="workspace-panel">
                <div class="panel-header" @click="${()=>{this.expanded=!this.expanded,this.selectedArtifact=void 0}}">
                    <wa-icon name="folder-open" label="Workspace"></wa-icon>
                    <span class="panel-title">Workspace</span>
                    <span class="count-badge">${this.artifacts.length} artifact${this.artifacts.length===1?``:`s`}</span>
                    <wa-icon name="${this.expanded?`chevron-up`:`chevron-down`}" label="toggle"></wa-icon>
                </div>
                ${o(this.expanded,()=>w`
                    <div class="panel-body">
                        <div class="artifact-list">
                            ${l(this.artifacts,e=>e.id,e=>w`
                                <div
                                    class="artifact-item ${this.selectedArtifact?.id===e.id?`selected`:``}"
                                    @click="${()=>{this.selectedArtifact=this.selectedArtifact?.id===e.id?void 0:e}}">
                                    <wa-icon name="${ie[e.type]??`file-lines`}" label="${e.type}"></wa-icon>
                                    <div class="artifact-meta">
                                        <span class="artifact-id">${e.id}</span>
                                        <span class="artifact-producer">by ${e.producedBy}</span>
                                    </div>
                                    <span class="artifact-type">${e.type}</span>
                                </div>
                                ${o(this.selectedArtifact?.id===e.id,()=>w`
                                    <div class="artifact-content">
                                        <pre>${e.content}</pre>
                                    </div>
                                `)}
                            `)}
                        </div>
                    </div>
                `)}
            </div>
        `}static{this.styles=E`
        :host { display: block; }

        .workspace-panel {
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            border-radius: var(--wa-border-radius-m);
            background: var(--wa-color-surface-default);
            margin: 0.5rem 0;
        }

        .panel-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            user-select: none;
        }

        .panel-title { font-weight: 500; }

        .count-badge {
            font-size: 0.8rem;
            color: var(--wa-color-text-quiet);
            margin-left: auto;
        }

        .panel-body {
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .artifact-list { display: flex; flex-direction: column; }

        .artifact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.75rem;
            cursor: pointer;
        }

        .artifact-item:hover { background: var(--wa-color-surface-lowered); }
        .artifact-item.selected { background: var(--wa-color-brand-fill-quiet); }

        .artifact-meta {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
        }

        .artifact-id {
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .artifact-producer {
            font-size: 0.75rem;
            color: var(--wa-color-text-quiet);
        }

        .artifact-type {
            font-size: 0.75rem;
            padding: 0.1rem 0.3rem;
            background: var(--wa-color-surface-lowered);
            border-radius: var(--wa-border-radius-s);
        }

        .artifact-content {
            padding: 0.5rem 0.75rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            background: var(--wa-color-surface-lowered);
        }

        .artifact-content pre {
            margin: 0;
            white-space: pre-wrap;
            word-break: breaword;
            font-size: 0.8rem;
            max-height: 200px;
            overflow-y: auto;
        }
    `}};i([h({type:Array,attribute:!1})],X.prototype,`artifacts`,void 0),i([m()],X.prototype,`expanded`,void 0),i([m()],X.prototype,`selectedArtifact`,void 0),X=i([S(`docks-ai-workspace-panel`)],X);var Z=class extends x{constructor(...e){super(...e),this.sessionManager=new R,this.streamManager=new z(()=>{this.requestUpdate(),this.scrollDebounceTimer&&clearTimeout(this.scrollDebounceTimer),this.scrollDebounceTimer=setTimeout(async()=>{await this.updateComplete,this.scrollToBottom(),this.scrollDebounceTimer=void 0},100)}),this.providerManager=new V(I),this.agentGroupManager=new H,this.busy=!1,this.inputValue=``,this.requireToolApproval=!0,this.showHistory=!1,this.currentArtifacts=[],this.pendingToolApprovals=new Map,this.toolApprovalAllowlist=new Set}async doBeforeUI(){this.subscribe(P,()=>this.onAIConfigChanged()),await this.sessionManager.load(),this.sessionManager.getActiveSession()||this.sessionManager.createSession(),await this.providerManager.initialize(),await this.loadSettings(),this.requestUpdate()}async onAIConfigChanged(){await this.providerManager.initialize(),await this.loadSettings(),this.requestUpdate()}async loadSettings(){let e=await T.get(`aiConfig`)||{};this.requireToolApproval=e.requireToolApproval!==!1;let t=await this.providerManager.loadToolApprovalAllowlist();this.toolApprovalAllowlist=new Set(t)}async scrollToBottom(){await this.updateComplete;let e=this.shadowRoot?.querySelector(`wa-scroller.chat-messages`);if(!e)return;let t=e.shadowRoot?.querySelector(`.scroll-container`);t?t.scrollTop=t.scrollHeight:e.scrollTo&&e.scrollTo({top:e.scrollHeight,behavior:`smooth`})}resetViewState(){this.inputValue=``,this.showHistory=!1,this.currentTaskPlan=void 0,this.currentArtifacts=[],this.requestUpdate()}createNewSession(){this.sessionManager.createSession(),this.resetViewState()}switchToSession(e){this.sessionManager.switchToSession(e)&&this.resetViewState()}deletePastSession(e){this.sessionManager.deletePastSession(e),this.requestUpdate()}async sendMessage(){let e=this.inputValue.trim();!e||this.busy||(this.inputValue=``,await this.handlePrompt(e))}async handleResend(e){!e||e.role!==`user`||await this.handlePrompt(e.content)}cancelStream(){this.abortController?.abort(),this.abortController=void 0,this.busy=!1,this.streamManager.cancelUpdates()}async handlePrompt(e){if(e.startsWith(`/`)){await this.runCommand(e.substring(1));return}let t=this.providerManager.getSelectedProvider();if(!t){s(`Please configure an AI provider in settings`);return}let n=this.sessionManager.getActiveSession();if(!n)return;let i=I.createMessage(e);this.sessionManager.addMessage(i),n.history.length===1&&this.sessionManager.setTitle(this.sessionManager.generateTitle(e)),this.requestUpdate(),await this.updateComplete,this.scrollToBottom(),this.busy=!0,this.currentTaskPlan=void 0,this.currentArtifacts=[],this.abortController=new AbortController;let a=new Map,o={history:[...n.history]},c=n.id,l=f.createExecutionContext(),u=r.createChild({...l}),d=I.getAgentContributions();if(d.length===0){s(`No agents are registered.`),this.busy=!1;return}let p=d.filter(t=>!t.canHandle||t.canHandle({...u.getProxy(),userPrompt:e})).sort((e,t)=>(t.priority||0)-(e.priority||0));if(p.length===0){s(`No agents available. Available: ${d.map(e=>e.role).join(`, `)}`),this.busy=!1;return}let m=p.map(e=>e.role),h=this.sessionManager.getActiveSession();if(!h)return;let g=this.agentGroupManager.createGroup(c,h.history.length-1,i,m,e=>{let t=d.find(t=>t.role===e);return{label:t?.label||e,icon:t?.icon||`robot`}});ee.runAsync(`Calling AI assistant`,async()=>I.executeAgentWorkflow({chatContext:o,chatConfig:t,callContext:u,execution:`parallel`,stream:!0,signal:this.abortController.signal,roles:m,requireToolApproval:this.requireToolApproval,onToolApprovalRequest:async(e,t)=>t.toolCalls.every(e=>this.toolApprovalAllowlist.has(e.function.name))?!0:new Promise(n=>{let r=`approval-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,i={role:e,request:t,resolve:n,alwaysAllowSelections:new Map};this.pendingToolApprovals.set(r,i),this.requestUpdate()}),onAgentStart:async e=>{let t=this.streamManager.createStreamingMessage(e);a.set(e,t),this.agentGroupManager.updateAgentStatus(g,e,`streaming`),this.requestUpdate(),await this.updateComplete,this.scrollToBottom()},onToken:(e,t)=>{let n=a.get(e);n!==void 0&&this.streamManager.updateStreamingMessage(n,t)},onAgentComplete:async(e,t)=>{let n=this.sessionManager.getActiveSession();if(!n||n.id!==c)return;let r=a.get(e);if(r!==void 0){this.streamManager.completeStreamingMessage(r,t);let i=n.history.length;this.sessionManager.addMessage(t),a.delete(e),this.streamManager.removeStreamingMessage(r),this.agentGroupManager.updateAgentStatus(g,e,`completed`,t,i),this.requestUpdate(),await this.updateComplete,this.scrollToBottom()}},onAgentError:(e,t)=>{let n=a.get(e);n!==void 0&&(this.streamManager.removeStreamingMessage(n),a.delete(e)),this.agentGroupManager.updateAgentStatus(g,e,`error`,{role:e,content:`Error: ${t.message}`}),this.requestUpdate(),s(`Agent ${e} error: ${t.message}`)}}).then(()=>{this.agentGroupManager.clearCurrentGroup()})).catch(e=>{e?.name!==`AbortError`&&s(`${e}`)}).finally(async()=>{this.busy=!1,this.abortController=void 0,this.streamManager.reset(),this.agentGroupManager.clearCurrentGroup(),this.requestUpdate()})}async runCommand(e){let t=e.trim().split(/\s+/);if(t.length===0)return;let n=t.shift(),r=f.getCommand(n);if(!r){s(`Command not found: ${n}`);return}let i={};t.forEach((e,t)=>{r.parameters?.[t]&&(i[r.parameters[t].name]=e)}),await f.execute(n,f.createExecutionContext(i)),this.requestUpdate()}handleToolApproval(e){let{approvalId:t,approval:n}=e.detail;Array.from(n.alwaysAllowSelections.entries()).filter(([,e])=>e).map(([e])=>e).forEach(e=>this.toolApprovalAllowlist.add(e)),this.pendingToolApprovals.delete(t),this.requestUpdate()}renderMessage(e,t,n=!1){return w`
            <docks-ai-chat-message
                .message="${e}"
                .isStreaming="${n}"
                .showHeader="${!0}"
                .messageIndex="${t}"
                @resend="${e=>this.handleResend(e.detail.message)}">
            </docks-ai-chat-message>
        `}renderToolbar(){let e=this.sessionManager.getPastSessions(),t=this.sessionManager.getActiveSession();return w`
            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.875rem;font-weight:500;padding:0 0.25rem;">${t?.title||`New Chat`}</span>
            <wa-button appearance="plain" size="s" title="New chat"
                @click="${()=>this.createNewSession()}">
                <wa-icon name="plus" label="New chat"></wa-icon>
            </wa-button>
            ${e.length>0?w`
                <wa-dropdown
                    ?open="${this.showHistory}"
                    @wa-after-hide="${()=>{this.showHistory=!1}}"
                    placement="bottom-start">
                    <wa-button slot="trigger" appearance="plain" size="s" with-caret
                        title="Chat history"
                        @click="${()=>{this.showHistory=!this.showHistory}}">
                        <wa-icon name="clock-rotate-left" label="History"></wa-icon>
                    </wa-button>
                    ${e.map(e=>w`
                        <wa-dropdown-item @click="${()=>this.switchToSession(e.id)}">
                            <wa-icon name="message" label="Session" slot="icon"></wa-icon>
                            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.title||`Unnamed Chat`}</span>
                            <wa-button slot="details" appearance="plain" size="s" title="Delete"
                                @click="${t=>{t.stopPropagation(),this.deletePastSession(e.id)}}">
                                <wa-icon name="trash" label="Delete"></wa-icon>
                            </wa-button>
                        </wa-dropdown-item>
                    `)}
                </wa-dropdown>
            `:g}
            <docks-command cmd="open_ai_config" icon="gear" title="AI Settings"></docks-command>
        `}renderContent(){let e=this.sessionManager.getActiveSession(),t=this.providerManager.getSelectedProvider();return w`
            <div class="chat-container">
                <wa-scroller class="chat-messages" orientation="vertical">
                    <div class="chat-content">
                        ${o(!t,()=>w`
                            <docks-ai-empty-state
                                message="No AI provider configured"
                                hint='Click the settings icon below to configure an AI provider'>
                            </docks-ai-empty-state>
                        `,()=>o(!e||e.history.length===0,()=>w`
                            <docks-ai-empty-state message="How can I help you?" hint=""></docks-ai-empty-state>
                        `,()=>w`
                            ${e.history.map((t,n)=>{let r=this.agentGroupManager.findGroupForUserMessage(e.id,n,t);return r&&t.role===`user`?w`
                                        <docks-ai-chat-message
                                            .message="${t}"
                                            .isStreaming="${!1}"
                                            .showHeader="${!0}"
                                            .messageIndex="${n}"
                                            @resend="${e=>this.handleResend(e.detail.message)}">
                                        </docks-ai-chat-message>
                                        <docks-ai-agent-response-group
                                            .group="${r}"
                                            .findStreamingMessage="${e=>this.streamManager.findStreamingMessage(e)}">
                                        </docks-ai-agent-response-group>
                                    `:this.agentGroupManager.findGroupForMessage(e.id,t.role,n)?w``:this.renderMessage(t,n)})}

                            ${this.streamManager.getAllStreamingMessages().filter(t=>!this.agentGroupManager.getAllGroups().some(n=>n.sessionId===e.id&&n.agents.has(t.message.role))).map(e=>this.renderMessage(e.message,-1,e.isStreaming))}

                            ${o(this.busy&&this.streamManager.getAllStreamingMessages().length===0,()=>w`
                                <div class="thinking-indicator">
                                    <wa-progress-ring indeterminate size="s"></wa-progress-ring>
                                    <span>Thinking…</span>
                                </div>
                            `)}
                        `))}

                        ${o(this.currentTaskPlan,()=>w`
                            <docks-ai-task-progress-panel .plan="${this.currentTaskPlan}"></docks-ai-task-progress-panel>
                        `)}

                        ${o(this.currentArtifacts.length>0,()=>w`
                            <docks-ai-workspace-panel .artifacts="${this.currentArtifacts}"></docks-ai-workspace-panel>
                        `)}
                    </div>
                </wa-scroller>

                ${o(this.pendingToolApprovals.size>0,()=>w`
                    <docks-ai-tool-approval
                        .pendingApprovals="${this.pendingToolApprovals}"
                        @approve="${e=>this.handleToolApproval(e)}">
                    </docks-ai-tool-approval>
                `)}

                <div class="input-area">
                    <docks-ai-chat-input
                        .value="${this.inputValue}"
                        .busy="${this.busy}"
                        .disabled="${!t}"
                        .hasProvider="${!!t}"
                        @input-change="${e=>{this.inputValue=e.detail.value}}"
                        @send="${e=>{this.inputValue=e.detail.value,this.sendMessage()}}"
                        @cancel="${()=>this.cancelStream()}">
                    </docks-ai-chat-input>
                </div>
            </div>
        `}static{this.styles=E`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            background: var(--wa-color-surface-default);
        }

        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .chat-messages {
            flex: 1;
            overflow: hidden;
        }

        .chat-content {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem;
            min-height: 100%;
            box-sizing: border-box;
        }

        .thinking-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            color: var(--wa-color-text-quiet);
            font-size: 0.875rem;
        }

        .input-area {
            padding: 0.5rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            flex-shrink: 0;
        }
    `}};i([m()],Z.prototype,`busy`,void 0),i([m()],Z.prototype,`inputValue`,void 0),i([m()],Z.prototype,`requireToolApproval`,void 0),i([m()],Z.prototype,`showHistory`,void 0),i([m()],Z.prototype,`currentTaskPlan`,void 0),i([m()],Z.prototype,`currentArtifacts`,void 0),i([m()],Z.prototype,`pendingToolApprovals`,void 0),Z=i([S(`docks-aiview`)],Z);var Q=class extends p{constructor(...e){super(...e),this.totalUsage={...A},this.providerUsage={}}connectedCallback(){super.connectedCallback(),this.loadUsage(),t(O,()=>{this.loadUsage()})}async loadUsage(){this.totalUsage=await k.getTotalUsage(),this.providerUsage=await k.getAllProviderUsage(),this.requestUpdate()}formatNumber(e){return e>=1e6?(e/1e6).toFixed(2)+`M`:e>=1e3?(e/1e3).toFixed(1)+`K`:e.toString()}async handleReset(){await d(`Reset all token usage statistics?`)&&(await k.reset(),await this.loadUsage())}renderStatItem(e,t){return w`
            <div class="stat-item">
                <span class="stat-label">${e}</span>
                <span class="stat-value">${this.formatNumber(t)}</span>
            </div>
        `}render(){return this.totalUsage.totalTokens===0?w``:w`
            <wa-dropdown placement="top-end" distance="8">
                <wa-button slot="trigger" appearance="plain" size="s" title="Token usage">
                    <wa-icon name="database" label="Tokens" slot="start"></wa-icon>
                    ${this.formatNumber(this.totalUsage.totalTokens)} tokens
                </wa-button>

                <h3>Token Usage</h3>

                <h6>Total</h6>
                <wa-dropdown-item>
                    <span>All providers</span>
                    <div class="stats-row">
                        ${this.renderStatItem(`Prompt`,this.totalUsage.promptTokens)}
                        ${this.renderStatItem(`Completion`,this.totalUsage.completionTokens)}
                        ${this.renderStatItem(`Total`,this.totalUsage.totalTokens)}
                        ${this.renderStatItem(`Requests`,this.totalUsage.requestCount)}
                    </div>
                </wa-dropdown-item>

                ${Object.keys(this.providerUsage).length>0?w`
                    <wa-divider></wa-divider>
                    <h6>By Provider</h6>
                    ${Object.entries(this.providerUsage).map(([e,t])=>w`
                        <wa-dropdown-item>
                            <span class="provider-name">${e}</span>
                            <div class="stats-row">
                                ${this.renderStatItem(`Prompt`,t.promptTokens)}
                                ${this.renderStatItem(`Completion`,t.completionTokens)}
                                ${this.renderStatItem(`Total`,t.totalTokens)}
                                ${this.renderStatItem(`Req`,t.requestCount)}
                            </div>
                        </wa-dropdown-item>
                    `)}
                `:``}

                <wa-divider></wa-divider>
                <wa-dropdown-item variant="danger" @click="${()=>this.handleReset()}">
                    <wa-icon name="trash" slot="icon"></wa-icon>
                    Reset statistics
                </wa-dropdown-item>
            </wa-dropdown>
        `}static{this.styles=E`
        :host { display: inline-block; }

        wa-dropdown::part(menu) { min-width: 320px; max-width: 420px; }

        h3 {
            padding: var(--wa-space-s) var(--wa-space-m);
            margin: 0;
            font-weight: 600;
            font-size: 0.95em;
        }

        h6 {
            padding: var(--wa-space-xs) var(--wa-space-m);
            margin: 0;
            font-weight: 600;
            font-size: 0.85em;
            color: var(--wa-color-neutral-text-subtle);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .provider-name { font-weight: 500; }

        .stats-row { display: flex; gap: var(--wa-space-m); font-size: 0.875rem; }

        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .stat-label { font-size: 0.8em; color: var(--wa-color-neutral-text-subtle); }
        .stat-value { font-weight: 600; }
    `}};Q=i([S(`docks-token-usage`)],Q);var $=class extends x{constructor(...e){super(...e),this.providers=[],this.defaultProvider=``,this.hasChanges=!1,this.availableModels=[],this.loadingModels=!1,this.requireToolApproval=!0,this.smartToolDetection=!1,this.editingState={},this.providerFactory=new M}async doInitUI(){await this.loadConfig(),t(P,()=>this.loadConfig()),t(ne,()=>this.loadConfig())}async loadConfig(){let e=await T.get(D);this.aiConfig=e;let t=a.getContributions(j).map(e=>e.provider),n=e?.providers||[],r=new Set(n.map(e=>e.name));this.providers=[...n,...t.filter(e=>!r.has(e.name))],this.defaultProvider=e?.defaultProvider||``,this.requireToolApproval=e?.requireToolApproval!==!1,this.smartToolDetection=e?.smartToolDetection!==void 0&&e.smartToolDetection,this.editingState={},this.hasChanges=!1,this.markDirty(!1)}getEditValue(e,t){let n=this.editingState[e];if(n&&t in n)return n[t]??``;let r=this.providers[e];return r?r[t]??``:``}setEditValue(e,t,n){this.editingState={...this.editingState,[e]:{...this.editingState[e]||{},[t]:n}},this.providers=this.providers.map((r,i)=>i===e?{...r,[t]:n}:r),this.markDirtyAndUpdate()}markDirtyAndUpdate(){this.hasChanges=!0,this.markDirty(!0)}async fetchModels(e){let t=this.providers[e];if(t){this.loadingModels=!0,this.availableModels=[];try{let e=this.providerFactory.getProvider(t);if(e.getAvailableModels){let n=await e.getAvailableModels(t);this.availableModels=Array.isArray(n)?n:[]}}finally{this.loadingModels=!1}}}async saveConfig(){let e={...this.aiConfig??{},defaultProvider:this.defaultProvider,providers:this.providers,requireToolApproval:this.requireToolApproval,smartToolDetection:this.smartToolDetection};await T.set(D,e),this.aiConfig=e,this.hasChanges=!1,this.markDirty(!1)}async save(){this.hasChanges&&await this.saveConfig()}addProvider(){this.providers=[...this.providers,{name:`new-provider`,model:``,apiKey:``,chatApiEndpoint:``}],this.markDirtyAndUpdate()}async deleteProvider(e){let t=this.providers[e];await d(`Delete provider "${t.name}"?`)&&(this.defaultProvider===t.name&&(this.defaultProvider=``),this.providers=this.providers.filter((t,n)=>n!==e),this.markDirtyAndUpdate())}renderProviderField(e,t,n=`text`){let r=this.getEditValue(e,t);return w`
            <wa-input
                type="${n}"
                ?password-toggle="${n===`password`}"
                .value="${r}"
                @input="${n=>this.setEditValue(e,t,n.target.value)}">
            </wa-input>
        `}renderContent(){return w`
            <div class="editor">
                <div class="editor-header">
                    <h2>AI Providers</h2>
                    <wa-button variant="brand" appearance="filled" @click="${this.addProvider}">
                        Add Provider
                    </wa-button>
                </div>

                ${o(this.providers.length===0,()=>w`
                    <div class="empty-state"><p>No providers configured.</p></div>
                `,()=>w`
                    <div class="providers-list">
                        ${l(this.providers,(e,t)=>t,(e,t)=>w`
                            <div class="provider-card">
                                <div class="provider-card-header ${this.defaultProvider===e.name?`is-default`:``}">
                                    <span class="provider-name">${e.name}</span>
                                    ${this.defaultProvider===e.name?w`<span class="default-badge">Default</span>`:w`<wa-button appearance="plain" size="s" title="Set as default"
                                                @click="${()=>{this.defaultProvider=e.name,this.markDirtyAndUpdate()}}">
                                                Set default
                                            </wa-button>`}
                                    <wa-button variant="danger" appearance="plain" size="s"
                                        @click="${()=>this.deleteProvider(t)}">
                                        Delete
                                    </wa-button>
                                </div>
                                <div class="provider-fields">
                                    <div class="field-row">
                                        <label>Name</label>
                                        ${this.renderProviderField(t,`name`)}
                                    </div>
                                    <div class="field-row">
                                        <label>Model</label>
                                        <div class="model-row">
                                            ${this.renderProviderField(t,`model`)}
                                            <wa-button appearance="plain" size="s"
                                                @click="${async()=>{await this.fetchModels(t)}}"
                                                title="Fetch available models">
                                                <wa-icon name="refresh" label="Refresh"></wa-icon>
                                            </wa-button>
                                        </div>
                                        ${o(this.loadingModels,()=>w`
                                            <wa-progress-ring indeterminate size="s"></wa-progress-ring>
                                        `)}
                                        ${o(this.availableModels.length>0,()=>w`
                                            <wa-dropdown
                                                @wa-select="${e=>{e.detail.item?.value&&this.setEditValue(t,`model`,e.detail.item.value)}}">
                                                <wa-button slot="trigger" size="s" appearance="plain" with-caret>
                                                    Select model
                                                </wa-button>
                                                ${this.availableModels.map(e=>w`
                                                    <wa-dropdown-item value="${e.id}">${e.name||e.id}</wa-dropdown-item>
                                                `)}
                                            </wa-dropdown>
                                        `)}
                                    </div>
                                    <div class="field-row">
                                        <label>API Endpoint</label>
                                        ${this.renderProviderField(t,`chatApiEndpoint`)}
                                    </div>
                                    <div class="field-row">
                                        <label>API Key</label>
                                        ${this.renderProviderField(t,`apiKey`,`password`)}
                                    </div>
                                </div>
                            </div>
                        `)}
                    </div>
                `)}

                <div class="settings-section">
                    <h3>Tool Settings</h3>
                    <wa-checkbox
                        ?checked="${this.requireToolApproval}"
                        @change="${e=>{this.requireToolApproval=e.target.checked,this.markDirtyAndUpdate()}}">
                        Require approval before executing tools
                    </wa-checkbox>
                    <wa-checkbox
                        ?checked="${this.smartToolDetection}"
                        @change="${e=>{this.smartToolDetection=e.target.checked,this.markDirtyAndUpdate()}}">
                        Smart tool detection (use ML to detect when tools are needed)
                    </wa-checkbox>
                </div>
            </div>
        `}static{this.styles=E`
        :host { display: block; height: 100%; overflow: auto; }

        .editor {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem;
        }

        .editor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .editor-header h2 { margin: 0; font-size: 1.25rem; }

        .providers-list { display: flex; flex-direction: column; gap: 1rem; }

        .provider-card {
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            border-radius: var(--wa-border-radius-m);
            overflow: hidden;
        }

        .provider-card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0.75rem;
            background: var(--wa-color-surface-lowered);
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .provider-card-header.is-default {
            background: var(--wa-color-brand-fill-quiet);
            border-bottom-color: var(--wa-color-brand-border-quiet);
        }

        .default-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.1rem 0.4rem;
            background: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            border-radius: var(--wa-border-radius-s);
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .provider-name {
            font-weight: 500;
            flex: 1;
        }

        .provider-fields {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.75rem;
        }

        .field-row {
            display: grid;
            grid-template-columns: 120px 1fr;
            align-items: start;
            gap: 0.5rem;
        }

        .field-row label {
            font-size: 0.875rem;
            color: var(--wa-color-text-quiet);
            padding-top: 0.4rem;
        }

        .model-row { display: flex; gap: 0.25rem; align-items: center; }
        .model-row wa-input { flex: 1; }

        .settings-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding-top: 1rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .settings-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }

        .empty-state {
            display: flex;
            justify-content: center;
            padding: 3rem;
            color: var(--wa-color-text-subtle);
        }
    `}};i([h({attribute:!1})],$.prototype,`input`,void 0),i([m()],$.prototype,`providers`,void 0),i([m()],$.prototype,`defaultProvider`,void 0),i([m()],$.prototype,`hasChanges`,void 0),i([m()],$.prototype,`availableModels`,void 0),i([m()],$.prototype,`loadingModels`,void 0),i([m()],$.prototype,`requireToolApproval`,void 0),i([m()],$.prototype,`smartToolDetection`,void 0),i([m()],$.prototype,`editingState`,void 0),$=i([S(`docks-ai-config-editor`)],$),a.registerContribution(_,{name:`aiview`,label:`AI Assistant`,icon:`robot`,component:e=>w`<docks-aiview id="${e}"></docks-aiview>`}),a.registerContribution(F,{label:`App Support`,description:`General-purpose assistant that can answer questions and execute app commands`,role:`appsupport`,priority:100,icon:`question-circle`,sysPrompt:L,tools:async()=>({enabled:!0,smartToolDetection:(await T.get(`aiConfig`))?.smartToolDetection??!1})}),a.registerContribution(v,{target:v,label:`Token Usage`,component:`<docks-token-usage></docks-token-usage>`}),b.registerEditorInputHandler({editorId:`system.ai-config-editor`,label:`AI Config`,ranking:1e3,canHandle:e=>e.key===`.system.ai-config`,handle:async e=>(e.component=t=>w`<docks-ai-config-editor id="${t}" .input=${e}></docks-ai-config-editor>`,e)}),C({command:{id:`open_ai_config`,name:`Open AI Configuration`,description:`Open the AI system configuration editor`,parameters:[]},handler:{execute:e=>{b.loadEditor({title:`AI Settings`,data:{},key:`.system.ai-config`,icon:`robot`,state:{}}).then()}}}),e.put(`aiService`,I);