import{b as y,n as h,a as P,d as n,l as d,c as de,p as ce,t as A,q as pe,m as z,e as p,A as ue}from"./vendor-3BPrCeYx.js";import{c as _,w as he,j as J,b as f,L as se,t as T,f as R,u as ge,k as me,l as ve,s as K,m as re,n as fe,o as we,q as ae,r as be,T as ye,v as Ae}from"./monaco-Ck3pLLYn.js";import{C as W,a as xe,P as ie,K as k,b as D,T as oe,E as $e,c as Se,t as V,d as Ce}from"./ai-service-CcvmmqG9.js";const Me=`You are an assistant in a web application with workspace, editors, and AI chat.

**Tools:**
Commands are exposed as AI-callable tools. Tools are context-aware - available commands depend on active editor, selected files, and workspace state.

**Tool Usage Rules:**
1. If tools are available and match the request, use them - don't describe manual steps
2. Read tool descriptions/parameters to select the correct tool
3. Call tools in sequence for multi-step tasks
4. After successful tool execution, provide a final response - don't loop or call more tools unless explicitly requested
5. If no tools are available, explain what context is needed

Keep responses concise. Use tools when available rather than discussing alternatives.

`,Pe=[{label:"Ollama (Local)",name:"ollama",model:"gemma3:12b",chatApiEndpoint:"https://<your-server>/v1/chat/completions",apiKey:""},{label:"OpenWebUI (Self Hosted)",name:"openwebui",model:"gemma3:12b",chatApiEndpoint:"https://<your-server>/api/v1/chat/completion",apiKey:""},{label:"OpenAI",name:"openai",model:"gpt-4.1",chatApiEndpoint:"https://api.openai.com/v1/chat/completions",apiKey:"<your api key>"},{label:"Groq",name:"groq",model:"llama-3.1-8b-instant",chatApiEndpoint:"https://api.groq.com/openai/v1/chat/completions",apiKey:"<your api key>"},{label:"Cerebras",name:"cerebras",model:"llama3.1-8b",chatApiEndpoint:"https://api.cerebras.ai/v1/chat/completions",apiKey:"<your api key>"},{label:"WebLLM",name:"webllm",model:"gemma-2-9b-it-q4f16_1-MLC",chatApiEndpoint:"",apiKey:"",parameters:{context_window_size:4096}},{label:"Mistral",name:"mistral",model:"mistral-large-latest",chatApiEndpoint:"https://api.mistral.ai/v1/chat/completions",apiKey:"<your api key>"},{label:"LiteLLM",name:"litellm",model:"gpt-3.5-turbo",chatApiEndpoint:"https://<your-server>/v1/chat/completions",apiKey:"<your api key>"}];for(const{label:t,...e}of Pe)_.registerContribution(W,{target:W,label:t,provider:e});const Te={priority:20,enhance:async(t,e)=>{try{const a=await he.getWorkspace(),s=J.getEditorArea()?.getActiveEditor(),r={workspace:a?.getName()||null,activeEditor:s?{title:s.input?.title||null,editorId:s.input?.editorId||null}:null};return`${t}

***App's state:***
${JSON.stringify(r,null,2)}`}catch{return t}}};_.registerContribution(xe,{label:"App State Enhancer",enhancer:Te});class ke{constructor(){this.activeSession=null,this.pastSessions=[]}async load(){const e=await f.get("aiChatSessions");if(e){if(e.active&&Array.isArray(e.history))this.activeSession=e.active;else if(e.activeSessionId&&Array.isArray(e.sessions))this.activeSession=e.sessions.find(a=>a.id===e.activeSessionId)||null,this.pastSessions=e.sessions.filter(a=>a.id!==e.activeSessionId);else if(Array.isArray(e.all)){const[a,...s]=e.all.sort((r,i)=>i.updatedAt-r.updatedAt);this.activeSession=a||null,this.pastSessions=s}}}async persist(){const e=[];this.activeSession&&e.push(this.activeSession),e.push(...this.pastSessions),await f.set("aiChatSessions",{all:e,activeSessionId:this.activeSession?.id||null})}createSession(){const e={id:`session-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,history:[],title:"New Chat",createdAt:Date.now(),updatedAt:Date.now()};return this.activeSession&&this.pastSessions.unshift(this.activeSession),this.activeSession=e,this.persist(),e}getActiveSession(){return this.activeSession}getActiveSessionId(){return this.activeSession?.id||""}switchToSession(e){if(this.activeSession?.id===e)return!0;const a=this.pastSessions.findIndex(r=>r.id===e);if(a===-1)return!1;const[s]=this.pastSessions.splice(a,1);return s?(this.activeSession&&this.pastSessions.unshift(this.activeSession),this.activeSession=s,this.persist(),!0):!1}getPastSessions(){return this.pastSessions}deletePastSession(e){const a=this.pastSessions.findIndex(s=>s.id===e);return a===-1?!1:(this.pastSessions.splice(a,1),this.persist(),!0)}addMessage(e){this.activeSession&&(this.activeSession.history.push(e),this.activeSession.updatedAt=Date.now(),this.persist())}setTitle(e){this.activeSession&&(this.activeSession.title=e,this.persist())}generateTitle(e){const a=e.trim();return a?a.length<=30?a:a.substring(0,30).trim()+"...":"New Chat"}deleteActiveAndSwitchToFirst(){this.activeSession&&(this.activeSession=this.pastSessions.shift()||null,this.activeSession||this.createSession(),this.persist())}}class Ie{constructor(e){this.streamingMessages=new Map,this.currentIndex=-1,this.pendingUpdate=!1,this.onUpdate=e}createStreamingMessage(e){const a=++this.currentIndex;return this.streamingMessages.set(a,{message:{role:e,content:""},isStreaming:!0}),a}updateStreamingMessage(e,a){const s=this.streamingMessages.get(e);s&&(s.message.content+=a,this.scheduleUpdate())}completeStreamingMessage(e,a){const s=this.streamingMessages.get(e);s&&(s.message=a,s.isStreaming=!1)}removeStreamingMessage(e){this.streamingMessages.delete(e)}findStreamingMessage(e){return Array.from(this.streamingMessages.values()).find(a=>a.message.role===e)?.message}getAllStreamingMessages(){return Array.from(this.streamingMessages.values())}scheduleUpdate(){this.pendingUpdate||(this.pendingUpdate=!0,this.rafHandle=requestAnimationFrame(()=>{this.pendingUpdate=!1,this.onUpdate?.()}))}cancelUpdates(){this.rafHandle!==void 0&&(cancelAnimationFrame(this.rafHandle),this.rafHandle=void 0,this.pendingUpdate=!1)}reset(){this.streamingMessages.clear(),this.cancelUpdates(),this.currentIndex=-1}}const B="aiViewChat";class _e{constructor(e){this.aiService=e,this.providers=[],this.availableModels=[],this.loadingModels=!1,this.providerFactory=new ie}async initialize(){this.providers=await this.aiService.getProviders()||[];const e=await this.aiService.getDefaultProvider();e&&(this.selectedProvider=e)}getProviders(){return this.providers}getSelectedProvider(){return this.selectedProvider}setSelectedProvider(e){this.selectedProvider=e}getAvailableModels(){return this.availableModels}isLoadingModels(){return this.loadingModels}async saveSettings(e,a,s,r,i){const u={...await f.get(B)||{}};r!==void 0&&(u.requireToolApproval=r),i!==void 0&&(u.toolApprovalAllowlist=i),await f.set(B,u);const v=this.providers.find(w=>w.name===e);if(v){const w={...v,model:a,...s!==void 0&&{apiKey:s}};this.selectedProvider=w,await this.updateProviderInAIConfig(e,{model:a,...s!==void 0&&{apiKey:s}}),await this.aiService.setDefaultProvider(e)}}async updateProviderInAIConfig(e,a){const s=await f.get(k)||{};if(!s.providers||!Array.isArray(s.providers))return;const r=s.providers.findIndex(i=>i.name===e);r>=0&&(s.providers[r]={...s.providers[r],...a},await f.set(k,s))}async loadToolApprovalAllowlist(){return(await f.get(B)||{}).toolApprovalAllowlist||[]}async fetchModels(e){const a=this.providers.find(s=>s.name===e);if(a){this.loadingModels=!0,this.availableModels=[];try{const s=this.providerFactory.getProvider(a);this.availableModels=await s.getAvailableModels?.(a)??[]}finally{this.loadingModels=!1}}}}class Ee{constructor(){this.groups=new Map}createGroup(e,a,s,r,i){const o=`group-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;this.currentGroupId=o;const u={id:o,sessionId:e,userMessageIndex:a,userMessage:s,timestamp:new Date,agents:new Map,messageIndices:new Map};return r.forEach(v=>{const{label:w,icon:j}=i(v);u.agents.set(v,{role:v,label:w,icon:j,status:"streaming"})}),this.groups.set(o,u),o}getGroup(e){return this.groups.get(e)}updateAgentStatus(e,a,s,r,i){const o=this.groups.get(e);if(!o)return;const u=o.agents.get(a);u&&(u.status=s,r&&(u.message=r),i!==void 0&&(u.messageIndex=i,o.messageIndices.set(a,i)))}getGroupsForSession(e){return Array.from(this.groups.values()).filter(a=>a.sessionId===e)}findGroupForUserMessage(e,a,s){return Array.from(this.groups.values()).find(r=>r.sessionId===e&&r.userMessageIndex===a&&r.userMessage===s)}findGroupForMessage(e,a,s){return Array.from(this.groups.values()).find(r=>r.sessionId===e&&r.messageIndices.get(a)===s)}getCurrentGroupId(){return this.currentGroupId}setCurrentGroupId(e){this.currentGroupId=e}clearCurrentGroup(){this.currentGroupId=void 0}getAllGroups(){return Array.from(this.groups.values())}clearAll(){this.groups.clear(),this.currentGroupId=void 0}}var De=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,G=(t,e,a,s)=>{for(var r=s>1?void 0:s?qe(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&De(e,a,r),r};let M=class extends P{constructor(){super(...arguments),this.isStreaming=!1,this.showHeader=!0}updated(t){super.updated(t),(t.has("message")||!this.hasAttribute("data-is-user"))&&this.updateAlignment()}updateAlignment(){this.message&&this.setAttribute("data-is-user",String(this.message.role==="user"))}copyToClipboard(t){navigator.clipboard.writeText(t).catch(e=>console.error("Failed to copy:",e))}processMarkdownContent(t){return t.includes("code-blocwrapper")?t:t.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi,(e,a,s)=>`
            <div class="code-blocwrapper">
                <div class="code-blocheader">
                    <wa-copy-button value="${this.escapeHtmlAttribute(s.trim())}" size="small" label="Copy code"></wa-copy-button>
                </div>
                <div class="code-bloccontent">
                    <pre><code${a}>${s}</code></pre>
                </div>
            </div>`)}escapeHtmlAttribute(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}handleResend(t){t?.preventDefault(),t?.stopPropagation(),this.message&&this.dispatchEvent(new CustomEvent("resend",{detail:{message:this.message,messageIndex:this.messageIndex},bubbles:!0,composed:!0}))}render(){if(!this.message)return n``;const t=this.message,e=t.role==="user";return n`
            <div class="message-wrapper ${e?"user":"assistant"} ${this.isStreaming?"streaming":""}">
                ${d(this.showHeader&&!e,()=>n`
                    <div class="message-header">
                        <div class="message-meta">
                            <wa-icon name="robot" label="${t.role}"></wa-icon>
                            <span class="role-name">${t.role}</span>
                        </div>
                    <div class="message-actions">
                        <wa-button variant="neutral" appearance="plain" size="small" title="Copy"
                            @click="${()=>this.copyToClipboard(t.content)}">
                            <wa-icon slot="label" name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                    </div>
                `)}
                <div class="message-content-wrapper ${e?"user":""}">
                    <div class="message-content">
                        ${de(this.processMarkdownContent(ce.parse(t.content||"")))}
                        ${d(this.isStreaming,()=>n`<span class="streaming-cursor">▋</span>`)}
                    </div>
                    ${d(e,()=>n`
                        <wa-button variant="neutral" appearance="plain" size="small" title="Copy"
                            @click="${()=>this.copyToClipboard(t.content)}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                        <wa-button variant="neutral" appearance="plain" size="small" title="Resend"
                            @click="${a=>this.handleResend(a)}">
                            <wa-icon name="rotate-right" label="Resend"></wa-icon>
                        </wa-button>
                    `)}
                </div>
            </div>
        `}};M.styles=y`
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
    `;G([h({type:Object,attribute:!1})],M.prototype,"message",2);G([h({type:Boolean})],M.prototype,"isStreaming",2);G([h({type:Boolean})],M.prototype,"showHeader",2);G([h({type:Number,attribute:!1})],M.prototype,"messageIndex",2);M=G([A("lyra-ai-chat-message")],M);var Oe=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,E=(t,e,a,s)=>{for(var r=s>1?void 0:s?Ue(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&Oe(e,a,r),r};let $=class extends P{constructor(){super(...arguments),this.value="",this.disabled=!1,this.busy=!1,this.hasProvider=!0}onInput(t){this.value=t.target.value,this.dispatchEvent(new CustomEvent("input-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}onKeyDown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}async send(){if(!this.value.trim()||this.disabled||!this.hasProvider)return;const t=this.value;this.value="",this.requestUpdate(),await this.updateComplete,this.textareaElement&&(this.textareaElement.value="",this.textareaElement.focus()),this.dispatchEvent(new CustomEvent("send",{detail:{value:t},bubbles:!0,composed:!0}))}cancel(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}render(){return n`
            <div class="input-container">
                <div class="input-row">
                    <wa-textarea
                        placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                        size="small"
                        resize="auto"
                        rows="1"
                        .value="${this.value}"
                        ?disabled="${this.disabled||!this.hasProvider}"
                        @input="${this.onInput}"
                        @keydown="${this.onKeyDown}">
                    </wa-textarea>
                    ${d(this.busy,()=>n`
                        <wa-button appearance="plain" size="small" @click="${this.cancel}">
                            <wa-icon name="stop" label="Stop"></wa-icon>
                        </wa-button>
                    `)}
                </div>
            </div>
        `}};$.styles=y`
        :host { display: block; width: 100%; }
        .input-container { margin-bottom: 0.25rem; margin-left: 0.25rem; }
        .input-row { display: flex; gap: 0.5rem; align-items: flex-end; }
        wa-textarea { flex: 1; min-width: 0; }
    `;E([h({type:String})],$.prototype,"value",2);E([h({type:Boolean})],$.prototype,"disabled",2);E([h({type:Boolean})],$.prototype,"busy",2);E([h({type:Boolean})],$.prototype,"hasProvider",2);E([pe("wa-textarea")],$.prototype,"textareaElement",2);$=E([A("lyra-ai-chat-input")],$);var ze=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,X=(t,e,a,s)=>{for(var r=s>1?void 0:s?Ge(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&ze(e,a,r),r};let q=class extends P{copyToClipboard(t){navigator.clipboard.writeText(t).catch(e=>console.error("Failed to copy:",e))}renderStatusIcon(t){switch(t){case"streaming":return n`<wa-icon name="spinner" class="spinning"></wa-icon>`;case"completed":return n`<wa-icon name="check-circle" class="status-success"></wa-icon>`;case"error":return n`<wa-icon name="exclamation-circle" class="status-error"></wa-icon>`}}renderCard(t,e){return e?n`
            <div class="agent-card status-${t.status}">
                <div class="agent-card-header">
                    <wa-icon name="${t.icon}" label="${t.label}"></wa-icon>
                    <span>${t.label}</span>
                    ${this.renderStatusIcon(t.status)}
                    <div class="agent-card-actions">
                        <wa-button variant="neutral" appearance="plain" size="small" title="Copy"
                            @click="${()=>this.copyToClipboard(e.content||"")}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                <div class="agent-card-content">
                    <lyra-ai-chat-message
                        .message="${e}"
                        .isStreaming="${t.status==="streaming"}"
                        .showHeader="${!1}"
                        .messageIndex="${t.messageIndex}">
                    </lyra-ai-chat-message>
                </div>
            </div>
        `:n`
                <div class="agent-card status-${t.status}">
                    <div class="agent-card-header">
                        <wa-icon name="${t.icon}" label="${t.label}"></wa-icon>
                        <span>${t.label}</span>
                        ${this.renderStatusIcon(t.status)}
                    </div>
                    <div class="agent-card-content waiting">Waiting for response...</div>
                </div>
            `}render(){if(!this.group)return n``;const t=Array.from(this.group.agents.values()),e=t.filter(o=>o.status==="completed").length,a=t.filter(o=>o.status==="streaming").length,s=t.filter(o=>o.status==="error").length,r=t.length>0&&e+s===t.length,i=t.length===1;return n`
            <div class="agent-response-group">
                ${d(!i,()=>n`
                    <div class="group-header">
                        <wa-icon name="robot" label="Multiple Agents"></wa-icon>
                        <span>Multiple Agents</span>
                        <span class="status-badge">
                            ${d(a>0,()=>n`<span class="streaming">${a} responding</span>`)}
                            ${d(r,()=>n`<span class="done">All completed (${e})</span>`)}
                        </span>
                    </div>
                `)}
                <div class="group-content">
                    ${z(t,o=>o.role,o=>{const u=o.message||(o.status==="streaming"&&this.findStreamingMessage?this.findStreamingMessage(o.role):void 0);return this.renderCard(o,u)})}
                </div>
            </div>
        `}};q.styles=y`
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
    `;X([h({type:Object,attribute:!1})],q.prototype,"group",2);X([h({type:Function,attribute:!1})],q.prototype,"findStreamingMessage",2);q=X([A("lyra-ai-agent-response-group")],q);var je=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,ne=(t,e,a,s)=>{for(var r=s>1?void 0:s?Re(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&je(e,a,r),r};let N=class extends P{constructor(){super(...arguments),this.pendingApprovals=new Map}approve(t,e){this.dispatchEvent(new CustomEvent("approve",{detail:{approvalId:t,approval:e},bubbles:!0,composed:!0})),e.resolve(!0),this.pendingApprovals.delete(t),this.requestUpdate()}deny(t,e){e.resolve(!1),this.pendingApprovals.delete(t),this.requestUpdate()}formatArgs(t){let e={};try{e=JSON.parse(t)}catch{}return Object.entries(e).map(([a,s])=>`${a}=${JSON.stringify(s)}`).join(", ")}render(){return this.pendingApprovals.size===0?n``:n`
            <div class="approval-container">
                ${Array.from(this.pendingApprovals.entries()).map(([t,e])=>{const a=e.request.toolCalls,s=a[0],r=a.length===1?`AI wants to execute: ${s?.function.name}()`:`AI wants to execute ${a.length} tools`;return n`
                        <wa-details class="approval-item">
                            <span slot="summary" class="approval-summary">
                                <span>${r}</span>
                                <div class="approval-inline-actions">
                                    <wa-button appearance="plain" size="small" variant="neutral"
                                        @click="${i=>{i.stopPropagation(),this.deny(t,e)}}">
                                        <wa-icon name="xmark" label="Deny"></wa-icon>
                                    </wa-button>
                                    <wa-button appearance="plain" size="small" variant="success"
                                        @click="${async i=>{i.stopPropagation(),this.approve(t,e)}}">
                                        <wa-icon name="check" label="Approve"></wa-icon>
                                    </wa-button>
                                </div>
                            </span>
                            <div class="approval-detail">
                                <strong>${e.role} wants to execute:</strong>
                                <ul class="tool-list">
                                    ${z(a,i=>i.id,i=>{const o=this.formatArgs(i.function.arguments||"{}"),u=e.alwaysAllowSelections.get(i.id)||!1;return n`
                                            <li class="tool-item">
                                                <label class="always-allow-label">
                                                    <wa-checkbox
                                                        ?checked="${u}"
                                                        @change="${v=>{e.alwaysAllowSelections.set(i.id,v.target.checked),this.requestUpdate()}}">
                                                    </wa-checkbox>
                                                    <span>Always allow</span>
                                                </label>
                                                <code>${i.function.name}(${o})</code>
                                            </li>
                                        `})}
                                </ul>
                            </div>
                        </wa-details>
                    `})}
            </div>
        `}};N.styles=y`
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
    `;ne([h({type:Map,attribute:!1})],N.prototype,"pendingApprovals",2);N=ne([A("lyra-ai-tool-approval")],N);var Ne=Object.defineProperty,He=Object.getOwnPropertyDescriptor,Q=(t,e,a,s)=>{for(var r=s>1?void 0:s?He(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&Ne(e,a,r),r};let O=class extends P{constructor(){super(...arguments),this.message="No AI provider configured",this.hint="Click the settings icon to configure an AI provider"}render(){return n`
            <div class="empty-state">
                <wa-icon name="robot" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                <p>${this.message}</p>
                <p class="hint">${this.hint}</p>
            </div>
        `}};O.styles=y`
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
    `;Q([h({type:String})],O.prototype,"message",2);Q([h({type:String})],O.prototype,"hint",2);O=Q([A("lyra-ai-empty-state")],O);var Fe=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,Z=(t,e,a,s)=>{for(var r=s>1?void 0:s?Le(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&Fe(e,a,r),r};const Ve={running:"spinner",completed:"check-circle",failed:"exclamation-circle",skipped:"forward",pending:"circle"},Be={running:"var(--wa-color-brand-50)",completed:"var(--wa-color-success-60)",failed:"var(--wa-color-danger-60)",skipped:"var(--wa-color-neutral-40)",pending:"var(--wa-color-neutral-40)"};let U=class extends P{constructor(){super(...arguments),this.expanded=!0}render(){if(!this.plan)return n``;const t=this.plan.steps.filter(s=>s.status==="completed").length,e=this.plan.steps.length,a=e>0?Math.round(t/e*100):0;return n`
            <div class="taspanel">
                <div class="panel-header" @click="${()=>{this.expanded=!this.expanded}}">
                    <wa-icon name="diagram-project" label="Task Plan"></wa-icon>
                    <span class="panel-title">Task Plan</span>
                    <span class="progress-text">${t}/${e}</span>
                    <wa-progress-bar value="${a}" class="progress-bar"></wa-progress-bar>
                    <wa-icon name="${this.expanded?"chevron-up":"chevron-down"}" label="toggle"></wa-icon>
                </div>
                ${d(this.expanded,()=>n`
                    <div class="panel-body">
                        ${z(this.plan.steps,s=>s.id,s=>n`
                            <div class="step-row">
                                <wa-icon
                                    name="${Ve[s.status]??"circle"}"
                                    style="color: ${Be[s.status]??"var(--wa-color-neutral-40)"}; ${s.status==="running"?"animation: spin 1s linear infinite;":""}">
                                </wa-icon>
                                <div class="step-info">
                                    <span class="step-role">${s.role}</span>
                                    <span class="step-task">${s.subTask}</span>
                                </div>
                                ${d(s.revisions>0,()=>n`
                                    <span class="revisions-badge">${s.revisions} rev</span>
                                `)}
                            </div>
                        `)}
                    </div>
                `)}
            </div>
        `}};U.styles=y`
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
    `;Z([h({type:Object,attribute:!1})],U.prototype,"plan",2);Z([p()],U.prototype,"expanded",2);U=Z([A("lyra-ai-task-progress-panel")],U);var Ke=Object.defineProperty,We=Object.getOwnPropertyDescriptor,H=(t,e,a,s)=>{for(var r=s>1?void 0:s?We(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&Ke(e,a,r),r};const Ye={code:"code",json:"brackets-curly","file-list":"list",plan:"diagram-project",review:"magnifying-glass",text:"file-lines"};let I=class extends P{constructor(){super(...arguments),this.artifacts=[],this.expanded=!1}render(){return this.artifacts.length===0?n``:n`
            <div class="workspace-panel">
                <div class="panel-header" @click="${()=>{this.expanded=!this.expanded,this.selectedArtifact=void 0}}">
                    <wa-icon name="folder-open" label="Workspace"></wa-icon>
                    <span class="panel-title">Workspace</span>
                    <span class="count-badge">${this.artifacts.length} artifact${this.artifacts.length!==1?"s":""}</span>
                    <wa-icon name="${this.expanded?"chevron-up":"chevron-down"}" label="toggle"></wa-icon>
                </div>
                ${d(this.expanded,()=>n`
                    <div class="panel-body">
                        <div class="artifact-list">
                            ${z(this.artifacts,t=>t.id,t=>n`
                                <div
                                    class="artifact-item ${this.selectedArtifact?.id===t.id?"selected":""}"
                                    @click="${()=>{this.selectedArtifact=this.selectedArtifact?.id===t.id?void 0:t}}">
                                    <wa-icon name="${Ye[t.type]??"file-lines"}" label="${t.type}"></wa-icon>
                                    <div class="artifact-meta">
                                        <span class="artifact-id">${t.id}</span>
                                        <span class="artifact-producer">by ${t.producedBy}</span>
                                    </div>
                                    <span class="artifact-type">${t.type}</span>
                                </div>
                                ${d(this.selectedArtifact?.id===t.id,()=>n`
                                    <div class="artifact-content">
                                        <pre>${t.content}</pre>
                                    </div>
                                `)}
                            `)}
                        </div>
                    </div>
                `)}
            </div>
        `}};I.styles=y`
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
    `;H([h({type:Array,attribute:!1})],I.prototype,"artifacts",2);H([p()],I.prototype,"expanded",2);H([p()],I.prototype,"selectedArtifact",2);I=H([A("lyra-ai-workspace-panel")],I);var Je=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,S=(t,e,a,s)=>{for(var r=s>1?void 0:s?Xe(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&Je(e,a,r),r};let b=class extends se{constructor(){super(...arguments),this.sessionManager=new ke,this.streamManager=new Ie(()=>{this.requestUpdate(),this.scrollDebounceTimer&&clearTimeout(this.scrollDebounceTimer),this.scrollDebounceTimer=setTimeout(async()=>{await this.updateComplete,this.scrollToBottom(),this.scrollDebounceTimer=void 0},100)}),this.providerManager=new _e(D),this.agentGroupManager=new Ee,this.busy=!1,this.inputValue="",this.requireToolApproval=!0,this.showHistory=!1,this.currentArtifacts=[],this.pendingToolApprovals=new Map,this.toolApprovalAllowlist=new Set}async doBeforeUI(){this.subscribe(oe,()=>this.onAIConfigChanged()),await this.sessionManager.load(),this.sessionManager.getActiveSession()||this.sessionManager.createSession(),await this.providerManager.initialize(),await this.loadSettings(),this.requestUpdate()}async onAIConfigChanged(){await this.providerManager.initialize(),await this.loadSettings(),this.requestUpdate()}async loadSettings(){const t=await f.get(k)||{};this.requireToolApproval=t.requireToolApproval!==!1;const e=await this.providerManager.loadToolApprovalAllowlist();this.toolApprovalAllowlist=new Set(e)}async scrollToBottom(){await this.updateComplete;const t=this.shadowRoot?.querySelector("wa-scroller.chat-messages");if(!t)return;const e=t.shadowRoot?.querySelector(".scroll-container");e?e.scrollTop=e.scrollHeight:t.scrollTo&&t.scrollTo({top:t.scrollHeight,behavior:"smooth"})}resetViewState(){this.inputValue="",this.showHistory=!1,this.currentTaskPlan=void 0,this.currentArtifacts=[],this.requestUpdate(),this.updateToolbar()}createNewSession(){this.sessionManager.createSession(),this.resetViewState()}switchToSession(t){this.sessionManager.switchToSession(t)&&this.resetViewState()}deletePastSession(t){this.sessionManager.deletePastSession(t),this.requestUpdate(),this.updateToolbar()}async sendMessage(){const t=this.inputValue.trim();!t||this.busy||(this.inputValue="",await this.handlePrompt(t))}async handleResend(t){!t||t.role!=="user"||await this.handlePrompt(t.content)}cancelStream(){this.abortController?.abort(),this.abortController=void 0,this.busy=!1,this.streamManager.cancelUpdates()}async handlePrompt(t){if(t.startsWith("/")){await this.runCommand(t.substring(1));return}const e=this.providerManager.getSelectedProvider();if(!e){T("Please configure an AI provider in settings");return}const a=this.sessionManager.getActiveSession();if(!a)return;const s=D.createMessage(t);this.sessionManager.addMessage(s),a.history.length===1&&(this.sessionManager.setTitle(this.sessionManager.generateTitle(t)),this.updateToolbar()),this.requestUpdate(),await this.updateComplete,this.scrollToBottom(),this.busy=!0,this.currentTaskPlan=void 0,this.currentArtifacts=[],this.abortController=new AbortController;const r=new Map,i={history:[...a.history]},o=a.id,u=R.createExecutionContext(),v=ge.createChild({...u}),w=D.getAgentContributions();if(w.length===0){T("No agents are registered."),this.busy=!1;return}const j=w.filter(l=>!l.canHandle||l.canHandle({...v.getProxy(),userPrompt:t})).sort((l,c)=>(c.priority||0)-(l.priority||0));if(j.length===0){T(`No agents available. Available: ${w.map(l=>l.role).join(", ")}`),this.busy=!1;return}const ee=j.map(l=>l.role),te=this.sessionManager.getActiveSession();if(!te)return;const F=this.agentGroupManager.createGroup(o,te.history.length-1,s,ee,l=>{const c=w.find(g=>g.role===l);return{label:c?.label||l,icon:c?.icon||"robot"}});me.runAsync("Calling AI assistant",async()=>D.executeAgentWorkflow({chatContext:i,chatConfig:e,callContext:v,execution:"parallel",stream:!0,signal:this.abortController.signal,roles:ee,requireToolApproval:this.requireToolApproval,onToolApprovalRequest:async(l,c)=>c.toolCalls.every(C=>this.toolApprovalAllowlist.has(C.function.name))?!0:new Promise(C=>{const L=`approval-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,le={role:l,request:c,resolve:C,alwaysAllowSelections:new Map};this.pendingToolApprovals.set(L,le),this.requestUpdate()}),onAgentStart:async l=>{const c=this.streamManager.createStreamingMessage(l);r.set(l,c),this.agentGroupManager.updateAgentStatus(F,l,"streaming"),this.requestUpdate(),await this.updateComplete,this.scrollToBottom()},onToken:(l,c)=>{const g=r.get(l);g!==void 0&&this.streamManager.updateStreamingMessage(g,c)},onAgentComplete:async(l,c)=>{const g=this.sessionManager.getActiveSession();if(!g||g.id!==o)return;const C=r.get(l);if(C!==void 0){this.streamManager.completeStreamingMessage(C,c);const L=g.history.length;this.sessionManager.addMessage(c),r.delete(l),this.streamManager.removeStreamingMessage(C),this.agentGroupManager.updateAgentStatus(F,l,"completed",c,L),this.requestUpdate(),await this.updateComplete,this.scrollToBottom()}},onAgentError:(l,c)=>{const g=r.get(l);g!==void 0&&(this.streamManager.removeStreamingMessage(g),r.delete(l)),this.agentGroupManager.updateAgentStatus(F,l,"error",{role:l,content:`Error: ${c.message}`}),this.requestUpdate(),T(`Agent ${l} error: ${c.message}`)}}).then(()=>{this.agentGroupManager.clearCurrentGroup()})).catch(l=>{l?.name!=="AbortError"&&T(`${l}`)}).finally(async()=>{this.busy=!1,this.abortController=void 0,this.streamManager.reset(),this.agentGroupManager.clearCurrentGroup(),this.requestUpdate(),this.updateToolbar()})}async runCommand(t){const e=t.trim().split(/\s+/);if(e.length===0)return;const a=e.shift(),s=R.getCommand(a);if(!s){T(`Command not found: ${a}`);return}const r={};e.forEach((i,o)=>{s.parameters?.[o]&&(r[s.parameters[o].name]=i)}),await R.execute(a,R.createExecutionContext(r)),this.requestUpdate()}handleToolApproval(t){const{approvalId:e,approval:a}=t.detail;Array.from(a.alwaysAllowSelections.entries()).filter(([,r])=>r).map(([r])=>r).forEach(r=>this.toolApprovalAllowlist.add(r)),this.pendingToolApprovals.delete(e),this.requestUpdate()}renderMessage(t,e,a=!1){return n`
            <lyra-ai-chat-message
                .message="${t}"
                .isStreaming="${a}"
                .showHeader="${!0}"
                .messageIndex="${e}"
                @resend="${s=>this.handleResend(s.detail.message)}">
            </lyra-ai-chat-message>
        `}renderToolbar(){const t=this.sessionManager.getPastSessions(),e=this.sessionManager.getActiveSession();return n`
            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.875rem;font-weight:500;padding:0 0.25rem;">${e?.title||"New Chat"}</span>
            <wa-button appearance="plain" size="small" title="New chat"
                @click="${()=>this.createNewSession()}">
                <wa-icon name="plus" label="New chat"></wa-icon>
            </wa-button>
            ${t.length>0?n`
                <wa-dropdown
                    ?open="${this.showHistory}"
                    @wa-after-hide="${()=>{this.showHistory=!1}}"
                    placement="bottom-start">
                    <wa-button slot="trigger" appearance="plain" size="small" with-caret
                        title="Chat history"
                        @click="${()=>{this.showHistory=!this.showHistory}}">
                        <wa-icon name="clock-rotate-left" label="History"></wa-icon>
                    </wa-button>
                    ${t.map(a=>n`
                        <wa-dropdown-item @click="${()=>this.switchToSession(a.id)}">
                            <wa-icon name="message" label="Session" slot="icon"></wa-icon>
                            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.title||"Unnamed Chat"}</span>
                            <wa-button slot="details" appearance="plain" size="small" title="Delete"
                                @click="${s=>{s.stopPropagation(),this.deletePastSession(a.id)}}">
                                <wa-icon name="trash" label="Delete"></wa-icon>
                            </wa-button>
                        </wa-dropdown-item>
                    `)}
                </wa-dropdown>
            `:ue}
            <lyra-command cmd="open_ai_config" icon="gear" title="AI Settings"></lyra-command>
        `}render(){const t=this.sessionManager.getActiveSession(),e=this.providerManager.getSelectedProvider();return n`
            <div class="chat-container">
                <wa-scroller class="chat-messages" orientation="vertical">
                    <div class="chat-content">
                        ${d(!e,()=>n`
                            <lyra-ai-empty-state
                                message="No AI provider configured"
                                hint='Click the settings icon below to configure an AI provider'>
                            </lyra-ai-empty-state>
                        `,()=>d(!t||t.history.length===0,()=>n`
                            <lyra-ai-empty-state message="How can I help you?" hint=""></lyra-ai-empty-state>
                        `,()=>n`
                            ${t.history.map((a,s)=>{const r=this.agentGroupManager.findGroupForUserMessage(t.id,s,a);return r&&a.role==="user"?n`
                                        <lyra-ai-chat-message
                                            .message="${a}"
                                            .isStreaming="${!1}"
                                            .showHeader="${!0}"
                                            .messageIndex="${s}"
                                            @resend="${i=>this.handleResend(i.detail.message)}">
                                        </lyra-ai-chat-message>
                                        <lyra-ai-agent-response-group
                                            .group="${r}"
                                            .findStreamingMessage="${i=>this.streamManager.findStreamingMessage(i)}">
                                        </lyra-ai-agent-response-group>
                                    `:this.agentGroupManager.findGroupForMessage(t.id,a.role,s)?n``:this.renderMessage(a,s)})}

                            ${this.streamManager.getAllStreamingMessages().filter(a=>!this.agentGroupManager.getAllGroups().some(s=>s.sessionId===t.id&&s.agents.has(a.message.role))).map(a=>this.renderMessage(a.message,-1,a.isStreaming))}

                            ${d(this.busy&&this.streamManager.getAllStreamingMessages().length===0,()=>n`
                                <div class="thinking-indicator">
                                    <wa-progress-ring indeterminate size="small"></wa-progress-ring>
                                    <span>Thinking…</span>
                                </div>
                            `)}
                        `))}

                        ${d(this.currentTaskPlan,()=>n`
                            <lyra-ai-task-progress-panel .plan="${this.currentTaskPlan}"></lyra-ai-task-progress-panel>
                        `)}

                        ${d(this.currentArtifacts.length>0,()=>n`
                            <lyra-ai-workspace-panel .artifacts="${this.currentArtifacts}"></lyra-ai-workspace-panel>
                        `)}
                    </div>
                </wa-scroller>

                ${d(this.pendingToolApprovals.size>0,()=>n`
                    <lyra-ai-tool-approval
                        .pendingApprovals="${this.pendingToolApprovals}"
                        @approve="${a=>this.handleToolApproval(a)}">
                    </lyra-ai-tool-approval>
                `)}

                <div class="input-area">
                    <lyra-ai-chat-input
                        .value="${this.inputValue}"
                        .busy="${this.busy}"
                        .disabled="${!e}"
                        .hasProvider="${!!e}"
                        @input-change="${a=>{this.inputValue=a.detail.value}}"
                        @send="${a=>{this.inputValue=a.detail.value,this.sendMessage()}}"
                        @cancel="${()=>this.cancelStream()}">
                    </lyra-ai-chat-input>
                </div>
            </div>
        `}};b.styles=y`
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
    `;S([p()],b.prototype,"busy",2);S([p()],b.prototype,"inputValue",2);S([p()],b.prototype,"requireToolApproval",2);S([p()],b.prototype,"showHistory",2);S([p()],b.prototype,"currentTaskPlan",2);S([p()],b.prototype,"currentArtifacts",2);S([p()],b.prototype,"pendingToolApprovals",2);b=S([A("lyra-aiview")],b);var Qe=Object.getOwnPropertyDescriptor,Ze=(t,e,a,s)=>{for(var r=s>1?void 0:s?Qe(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=o(r)||r);return r};let Y=class extends ve{constructor(){super(...arguments),this.totalUsage={...$e},this.providerUsage={}}connectedCallback(){super.connectedCallback(),this.loadUsage(),K(Se,()=>{this.loadUsage()})}async loadUsage(){this.totalUsage=await V.getTotalUsage(),this.providerUsage=await V.getAllProviderUsage(),this.requestUpdate()}formatNumber(t){return t>=1e6?(t/1e6).toFixed(2)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toString()}async handleReset(){await re("Reset all token usage statistics?")&&(await V.reset(),await this.loadUsage())}renderStatItem(t,e){return n`
            <div class="stat-item">
                <span class="stat-label">${t}</span>
                <span class="stat-value">${this.formatNumber(e)}</span>
            </div>
        `}render(){return this.totalUsage.totalTokens===0?n``:n`
            <wa-dropdown placement="top-end" distance="8">
                <wa-button slot="trigger" appearance="plain" size="small" title="Token usage">
                    <wa-icon name="database" label="Tokens" slot="start"></wa-icon>
                    ${this.formatNumber(this.totalUsage.totalTokens)} tokens
                </wa-button>

                <h3>Token Usage</h3>

                <h6>Total</h6>
                <wa-dropdown-item>
                    <span>All providers</span>
                    <div class="stats-row">
                        ${this.renderStatItem("Prompt",this.totalUsage.promptTokens)}
                        ${this.renderStatItem("Completion",this.totalUsage.completionTokens)}
                        ${this.renderStatItem("Total",this.totalUsage.totalTokens)}
                        ${this.renderStatItem("Requests",this.totalUsage.requestCount)}
                    </div>
                </wa-dropdown-item>

                ${Object.keys(this.providerUsage).length>0?n`
                    <wa-divider></wa-divider>
                    <h6>By Provider</h6>
                    ${Object.entries(this.providerUsage).map(([t,e])=>n`
                        <wa-dropdown-item>
                            <span class="provider-name">${t}</span>
                            <div class="stats-row">
                                ${this.renderStatItem("Prompt",e.promptTokens)}
                                ${this.renderStatItem("Completion",e.completionTokens)}
                                ${this.renderStatItem("Total",e.totalTokens)}
                                ${this.renderStatItem("Req",e.requestCount)}
                            </div>
                        </wa-dropdown-item>
                    `)}
                `:""}

                <wa-divider></wa-divider>
                <wa-dropdown-item variant="danger" @click="${()=>this.handleReset()}">
                    <wa-icon name="trash" slot="icon"></wa-icon>
                    Reset statistics
                </wa-dropdown-item>
            </wa-dropdown>
        `}};Y.styles=y`
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
    `;Y=Ze([A("lyra-token-usage")],Y);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,x=(t,e,a,s)=>{for(var r=s>1?void 0:s?tt(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(s?o(e,a,r):o(r))||r);return s&&r&&et(e,a,r),r};let m=class extends se{constructor(){super(...arguments),this.providers=[],this.defaultProvider="",this.hasChanges=!1,this.availableModels=[],this.loadingModels=!1,this.requireToolApproval=!0,this.smartToolDetection=!1,this.editingState={},this.providerFactory=new ie}async doInitUI(){await this.loadConfig(),K(oe,()=>this.loadConfig()),K(fe,()=>this.loadConfig())}async loadConfig(){const t=await f.get(k);this.aiConfig=t;const e=_.getContributions(W).map(r=>r.provider),a=t?.providers||[],s=new Set(a.map(r=>r.name));this.providers=[...a,...e.filter(r=>!s.has(r.name))],this.defaultProvider=t?.defaultProvider||"",this.requireToolApproval=t?.requireToolApproval!==!1,this.smartToolDetection=t?.smartToolDetection!==void 0?t.smartToolDetection:!1,this.editingState={},this.hasChanges=!1,this.markDirty(!1)}getEditValue(t,e){const a=this.editingState[t];if(a&&e in a)return a[e]??"";const s=this.providers[t];return s?s[e]??"":""}setEditValue(t,e,a){this.editingState={...this.editingState,[t]:{...this.editingState[t]||{},[e]:a}},this.providers=this.providers.map((s,r)=>r===t?{...s,[e]:a}:s),this.markDirtyAndUpdate()}markDirtyAndUpdate(){this.hasChanges=!0,this.markDirty(!0)}async fetchModels(t){const e=this.providers[t];if(e){this.loadingModels=!0,this.availableModels=[];try{const a=this.providerFactory.getProvider(e);if(a.getAvailableModels){const s=await a.getAvailableModels(e);this.availableModels=Array.isArray(s)?s:[]}}finally{this.loadingModels=!1}}}async saveConfig(){const t={...this.aiConfig??{},defaultProvider:this.defaultProvider,providers:this.providers,requireToolApproval:this.requireToolApproval,smartToolDetection:this.smartToolDetection};await f.set(k,t),this.aiConfig=t,this.hasChanges=!1,this.markDirty(!1)}async save(){this.hasChanges&&await this.saveConfig()}addProvider(){this.providers=[...this.providers,{name:"new-provider",model:"",apiKey:"",chatApiEndpoint:""}],this.markDirtyAndUpdate()}async deleteProvider(t){const e=this.providers[t];await re(`Delete provider "${e.name}"?`)&&(this.defaultProvider===e.name&&(this.defaultProvider=""),this.providers=this.providers.filter((a,s)=>s!==t),this.markDirtyAndUpdate())}renderProviderField(t,e,a="text"){const s=this.getEditValue(t,e);return n`
            <wa-input
                type="${a}"
                ?password-toggle="${a==="password"}"
                .value="${s}"
                @input="${r=>this.setEditValue(t,e,r.target.value)}">
            </wa-input>
        `}render(){return n`
            <div class="editor">
                <div class="editor-header">
                    <h2>AI Providers</h2>
                    <wa-button variant="brand" appearance="filled" @click="${this.addProvider}">
                        Add Provider
                    </wa-button>
                </div>

                ${d(this.providers.length===0,()=>n`
                    <div class="empty-state"><p>No providers configured.</p></div>
                `,()=>n`
                    <div class="providers-list">
                        ${z(this.providers,(t,e)=>e,(t,e)=>n`
                            <div class="provider-card">
                                <div class="provider-card-header ${this.defaultProvider===t.name?"is-default":""}">
                                    <span class="provider-name">${t.name}</span>
                                    ${this.defaultProvider===t.name?n`<span class="default-badge">Default</span>`:n`<wa-button appearance="plain" size="small" title="Set as default"
                                                @click="${()=>{this.defaultProvider=t.name,this.markDirtyAndUpdate()}}">
                                                Set default
                                            </wa-button>`}
                                    <wa-button variant="danger" appearance="plain" size="small"
                                        @click="${()=>this.deleteProvider(e)}">
                                        Delete
                                    </wa-button>
                                </div>
                                <div class="provider-fields">
                                    <div class="field-row">
                                        <label>Name</label>
                                        ${this.renderProviderField(e,"name")}
                                    </div>
                                    <div class="field-row">
                                        <label>Model</label>
                                        <div class="model-row">
                                            ${this.renderProviderField(e,"model")}
                                            <wa-button appearance="plain" size="small"
                                                @click="${async()=>{await this.fetchModels(e)}}"
                                                title="Fetch available models">
                                                <wa-icon name="refresh" label="Refresh"></wa-icon>
                                            </wa-button>
                                        </div>
                                        ${d(this.loadingModels,()=>n`
                                            <wa-progress-ring indeterminate size="small"></wa-progress-ring>
                                        `)}
                                        ${d(this.availableModels.length>0,()=>n`
                                            <wa-dropdown
                                                @wa-select="${a=>{a.detail.item?.value&&this.setEditValue(e,"model",a.detail.item.value)}}">
                                                <wa-button slot="trigger" size="small" appearance="plain" with-caret>
                                                    Select model
                                                </wa-button>
                                                ${this.availableModels.map(a=>n`
                                                    <wa-dropdown-item value="${a.id}">${a.name||a.id}</wa-dropdown-item>
                                                `)}
                                            </wa-dropdown>
                                        `)}
                                    </div>
                                    <div class="field-row">
                                        <label>API Endpoint</label>
                                        ${this.renderProviderField(e,"chatApiEndpoint")}
                                    </div>
                                    <div class="field-row">
                                        <label>API Key</label>
                                        ${this.renderProviderField(e,"apiKey","password")}
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
                        @change="${t=>{this.requireToolApproval=t.target.checked,this.markDirtyAndUpdate()}}">
                        Require approval before executing tools
                    </wa-checkbox>
                    <wa-checkbox
                        ?checked="${this.smartToolDetection}"
                        @change="${t=>{this.smartToolDetection=t.target.checked,this.markDirtyAndUpdate()}}">
                        Smart tool detection (use ML to detect when tools are needed)
                    </wa-checkbox>
                </div>
            </div>
        `}};m.styles=y`
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
    `;x([h({attribute:!1})],m.prototype,"input",2);x([p()],m.prototype,"providers",2);x([p()],m.prototype,"defaultProvider",2);x([p()],m.prototype,"hasChanges",2);x([p()],m.prototype,"availableModels",2);x([p()],m.prototype,"loadingModels",2);x([p()],m.prototype,"requireToolApproval",2);x([p()],m.prototype,"smartToolDetection",2);x([p()],m.prototype,"editingState",2);m=x([A("lyra-ai-config-editor")],m);_.registerContribution(we,{name:"aiview",label:"AI Assistant",icon:"robot",component:t=>n`<lyra-aiview id="${t}"></lyra-aiview>`});_.registerContribution(Ce,{label:"App Support",description:"General-purpose assistant that can answer questions and execute app commands",role:"appsupport",priority:100,icon:"question-circle",sysPrompt:Me,tools:async()=>({enabled:!0,smartToolDetection:(await f.get(k))?.smartToolDetection??!1})});_.registerContribution(ae,{target:ae,label:"Token Usage",component:"<lyra-token-usage></lyra-token-usage>"});J.registerEditorInputHandler({editorId:"system.ai-config-editor",label:"AI Config",ranking:1e3,canHandle:t=>t.key===".system.ai-config",handle:async t=>(t.component=()=>n`<lyra-ai-config-editor .input="${t}"></lyra-ai-config-editor>`,t)});be({command:{id:"open_ai_config",name:"Open AI Configuration",description:"Open the AI system configuration editor",parameters:[]},handler:{execute:t=>{const e={title:"AI Settings",data:{},key:".system.ai-config",icon:"robot",state:{}};J.loadEditor(e).then()}},contribution:{target:ye,icon:"robot",label:"AI Config"}});Ae.put("aiService",D);
