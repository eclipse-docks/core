import{E as e,G as t,Ht as n,N as r,V as i,Vt as a,Wt as o,X as s,Y as c,Zt as l,a as u,dt as d,ft as f,k as p,l as m,lt as h,on as g,p as ee,pn as _,pt as v,qt as y,tt as b,zt as x}from"./canvas-bridge-core.js-DHNNFPcZ.js";import"./canvas-bridge-lit.js-By-bB90A.js";import{C as S,E as C,T as w,d as T,f as E,g as te,h as D,i as O,l as k,m as A,n as j,o as M,p as N,r as P,t as F,u as I,v as L}from"./runtime-CI4JObpD-BG_9LzYb.js";import"./canvas-bridge-urls.js-BGKNMgxn.js";var R=`Thinking…`,z=[`Bribing the hamster…`,`Consulting the rubber duck…`,`Untangling the spaghetti…`,`Herding tokens…`,`Warming up the crystals…`,`Counting electric sheep…`,`Negotiating with the compiler…`,`Teaching frogs to code…`,`Aligning the bits…`,`Feeding the GPU snacks…`,`Looking under the couch…`,`Summoning a specialist…`,`Checking the manual twice…`,`Reticulating splines…`,`Sharpening pencils…`,`Pedaling harder…`,`Buffering brilliance…`,`Reversing the polarity…`,`Convincing the bits to cooperate…`,`Dusting off the playbook…`,`Whispering to the model…`,`Calibrating optimism…`,`Unfolding the roadmap…`,`Polishing ones and zeros…`,`Asking politely…`],B=3e3;function V(){return B+Math.floor(Math.random()*9001)}function ne(e){let t=z.filter(t=>t!==e);return t.length?t[Math.floor(Math.random()*t.length)]:R}var H=class extends m{constructor(...e){super(...e),this.scrollMode=`none`,this.composerPasteBound=!1,this.sessions=[],this.focusedId=null,this.draft=``,this.pendingAttachmentIds=[],this.dragOver=!1,this.previewAttachmentId=null,this.toolDetail=null,this.busy=!1,this.busyStatus=R,this.queuedPrompt=null,this.pendingPermission=null,this.policyMode=`auto`,this.optimizeFor=`balance`,this.manualModel=``,this.manualEffort=`auto`,this.approvalMode=`auto_safe`,this.modelIds=[],this.streamingParts=[],this.historyOpen=!1,this.historyQuery=``,this.unsubs=[],this.promptController=null,this.nativePasteHandler=e=>void this.onComposerPaste(e),this.cancelKeyHandler=e=>{this.busy&&e.key===`Escape`&&(e.preventDefault(),this.cancelTurn())}}static{this.styles=g`
    :host {
      height: 100%;
      min-height: 0;
      background: var(--wa-color-surface-default);
      color: var(--wa-color-text-normal);
      font-family: var(--wa-font-family-body);
    }

    .part-content,
    .part-content-inner {
      height: 100%;
      min-height: 0;
    }

    .cognitive-shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      /* Establish a definite containing block for wa-scroller's height: 100%. */
      position: relative;
    }

    wa-dropdown.history-menu::part(menu) {
      min-width: 18rem;
      max-width: min(24rem, 92vw);
      max-height: min(28rem, 70vh);
      overflow-y: auto;
      padding-top: 0;
    }

    .history-search {
      position: sticky;
      top: 0;
      z-index: 1;
      display: block;
      padding: var(--wa-space-s);
      background: var(--wa-color-surface-raised);
      border-bottom: var(--wa-border-width-s) solid var(--wa-color-border-normal);
    }

    .history-search wa-input {
      width: 100%;
    }

    .history-item-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .history-item-meta {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
      flex-shrink: 0;
    }

    .history-empty {
      padding: var(--wa-space-m);
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
      text-align: center;
    }

    wa-scroller.transcript {
      /* flex-basis 0 so the host gets a definite height; wa-scroller vertical uses height:100%. */
      flex: 1 1 0;
      min-height: 0;
      height: 100%;
      overflow: hidden;
    }

    .transcript-inner {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-m);
      padding: var(--wa-space-m);
      min-height: 100%;
      box-sizing: border-box;
    }

    /* Pushes short threads to the bottom without breaking overflow scroll. */
    .transcript-spacer {
      flex: 1 0 0;
      min-height: 0;
    }

    .msg {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      width: 90%;
      min-width: 90%;
      max-width: 90%;
      align-self: flex-start;
      align-items: stretch;
    }

    .msg.user {
      align-self: flex-end;
    }

    .msg .bubble,
    .msg wa-details.msg-details {
      width: 100%;
      box-sizing: border-box;
    }

    .msg-meta {
      position: absolute;
      right: var(--wa-space-2xs);
      bottom: var(--wa-space-2xs);
      z-index: 1;
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
      max-width: calc(100% - var(--wa-space-s));
      padding: var(--wa-space-3xs) var(--wa-space-2xs);
      border-radius: var(--wa-border-radius-m);
      background: color-mix(in srgb, var(--wa-color-surface-default) 88%, transparent);
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--wa-transition-fast, 120ms) ease;
    }

    .msg:hover .msg-meta,
    .msg:focus-within .msg-meta {
      opacity: 1;
      pointer-events: auto;
    }

    .bubble {
      padding: var(--wa-space-s) var(--wa-space-m);
      border-radius: var(--wa-border-radius-l);
      background: var(--wa-color-surface-raised);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      white-space: pre-wrap;
      line-height: var(--wa-line-height-normal);
      max-width: 100%;
      overflow-wrap: anywhere;
    }

    .bubble.markdown {
      white-space: normal;
    }

    .bubble.markdown > :first-child {
      margin-block-start: 0;
    }

    .bubble.markdown > :last-child {
      margin-block-end: 0;
    }

    .bubble.markdown pre {
      overflow-x: auto;
      padding: var(--wa-space-s);
      border-radius: var(--wa-border-radius-m);
      background: color-mix(in srgb, var(--wa-color-neutral-fill-quiet) 55%, transparent);
    }

    .bubble.markdown code {
      font-family: var(--wa-font-family-code, ui-monospace, monospace);
      font-size: 0.92em;
    }

    .bubble.markdown pre code {
      font-size: inherit;
    }

    .bubble.markdown a {
      color: var(--wa-color-brand-on-normal);
    }

    .msg.user .bubble {
      background: color-mix(in srgb, var(--wa-color-brand-fill-normal) 22%, transparent);
      border-color: color-mix(in srgb, var(--wa-color-brand-fill-normal) 40%, transparent);
    }

    .streaming-meta {
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: center;
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .composer-shell {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      padding: var(--wa-space-s) var(--wa-space-m) var(--wa-space-m);
      border-top: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      flex-shrink: 0;
    }

    wa-dropdown.settings-menu::part(menu) {
      min-width: 16rem;
      max-width: min(28rem, 92vw);
    }

    wa-dropdown.context-menu::part(menu) {
      min-width: 17rem;
      max-width: min(22rem, 92vw);
      padding: var(--wa-space-s);
    }

    .context-ring {
      --size: 1.35rem;
      --track-width: 2.5px;
      --indicator-width: 2.5px;
      font-size: 0;
    }

    .context-panel {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
    }

    .context-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--wa-space-s);
    }

    .context-header strong {
      font-size: var(--wa-font-size-s);
    }

    .context-header span {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
    }

    .context-bars {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
    }

    .context-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--wa-space-2xs);
      font-size: var(--wa-font-size-xs);
    }

    .context-row-label {
      color: var(--wa-color-text-quiet);
    }

    .context-meter {
      grid-column: 1 / -1;
      height: 0.35rem;
      border-radius: var(--wa-border-radius-pill);
      background: var(--wa-color-neutral-fill-quiet);
      overflow: hidden;
    }

    .context-meter > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--bucket-color, var(--wa-color-brand-fill-normal));
    }

    .context-io {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--wa-space-2xs);
      padding-top: var(--wa-space-s);
      border-top: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      font-size: var(--wa-font-size-xs);
    }

    .context-io-heading {
      grid-column: 1 / -1;
      font-weight: var(--wa-font-weight-semibold, 600);
    }

    .context-io-item {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .context-io-item span {
      color: var(--wa-color-text-quiet);
    }

    .context-io-item strong {
      font-variant-numeric: tabular-nums;
    }

    .context-footer {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
    }

    .context-remaining {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
    }

    .composer {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      flex: 1;
      min-width: 0;
    }

    .queued-prompt {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-radius: var(--wa-border-radius-m);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      background: color-mix(in srgb, var(--wa-color-brand-fill-quiet) 40%, transparent);
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
      min-width: 0;
    }

    .queued-prompt-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .composer-row {
      display: flex;
      gap: var(--wa-space-s);
      align-items: flex-end;
    }

    .composer wa-textarea {
      flex: 1;
      min-width: 0;
    }

    .composer-actions {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      flex-shrink: 0;
    }

    .composer-shell.drag-over {
      outline: 2px dashed var(--wa-color-brand-border-normal);
      outline-offset: -2px;
      background: color-mix(in srgb, var(--wa-color-brand-fill-quiet) 35%, transparent);
    }

    wa-dropdown.attach-menu::part(menu) {
      min-width: 18rem;
      max-width: min(24rem, 92vw);
      padding: var(--wa-space-2xs);
    }

    .attach-panel {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      max-height: min(22rem, 50vh);
    }

    .attach-list {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      overflow: auto;
      min-height: 0;
    }

    .attach-row {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      min-width: 0;
    }

    .attach-preview-btn {
      display: flex;
      align-items: center;
      gap: var(--wa-space-s);
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: var(--wa-space-2xs);
      border: none;
      border-radius: var(--wa-border-radius-s);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .attach-preview-btn:hover {
      background: var(--wa-color-neutral-fill-quiet);
    }

    .attach-thumb,
    .msg-file-thumb {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
      border-radius: var(--wa-border-radius-s);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      flex-shrink: 0;
    }

    .attach-file-icon {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--wa-border-radius-s);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      color: var(--wa-color-text-quiet);
      flex-shrink: 0;
    }

    .attach-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: var(--wa-font-size-s);
    }

    .attach-empty {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
      padding: var(--wa-space-s);
    }

    .msg-file-thumb {
      width: 4.5rem;
      height: 4.5rem;
    }

    .attach-dialog-body {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      max-height: min(70vh, 40rem);
      overflow: auto;
    }

    .attach-dialog-image {
      max-width: 100%;
      height: auto;
      border-radius: var(--wa-border-radius-m);
    }

    .attach-dialog-text {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--wa-font-family-code, ui-monospace, monospace);
      font-size: var(--wa-font-size-s);
    }

    .msg-files {
      display: flex;
      flex-wrap: wrap;
      gap: var(--wa-space-2xs);
      margin-bottom: var(--wa-space-2xs);
    }

    .approval-actions {
      display: flex;
      gap: var(--wa-space-s);
      margin-top: var(--wa-space-s);
      flex-wrap: wrap;
    }

    pre.args {
      margin: var(--wa-space-s) 0 0;
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: var(--wa-font-size-xs);
      white-space: pre-wrap;
      overflow-x: auto;
    }

    wa-details {
      font-size: var(--wa-font-size-s);
    }

    wa-details.msg-details {
      width: 100%;
      font-size: var(--wa-font-size-s);
    }

    wa-details.msg-details::part(base),
    wa-details.msg-details::part(details) {
      border: none;
      background: transparent;
    }

    wa-details.msg-details::part(header) {
      align-items: flex-start;
      gap: var(--wa-space-2xs);
      padding: 0;
    }

    wa-details.msg-details::part(summary) {
      flex: 1;
      min-width: 0;
    }

    wa-details.msg-details::part(content) {
      padding: var(--wa-space-s) 0 0;
    }

    .msg-summary {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      width: 100%;
    }

    .msg-tech {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      margin-inline-start: var(--wa-space-l);
      padding-inline-start: var(--wa-space-m);
      border-inline-start: var(--wa-border-width-s) solid var(--wa-color-border-normal);
    }

    .tool-heading {
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
      margin-bottom: var(--wa-space-2xs);
    }

    .tool-row {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      flex-wrap: wrap;
    }

    .tool-row .tool-heading {
      margin-bottom: 0;
      flex: 1;
      min-width: 0;
    }

    .tool-detail-body {
      max-height: min(70vh, 36rem);
      overflow: auto;
    }

    .tool-detail-body pre {
      margin: 0;
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: var(--wa-font-size-xs);
      white-space: pre-wrap;
      word-break: break-word;
    }
  `}updated(){this.bindComposerPaste()}bindComposerPaste(){if(this.composerPasteBound)return;let e=this.textarea?.shadowRoot?.querySelector(`textarea`);e&&(e.addEventListener(`paste`,this.nativePasteHandler),this.composerPasteBound=!0)}doBeforeUI(){I.start(),this.syncSessions(),this.syncModels(),this.approvalMode=I.getApprovalMode(),I.whenReady().then(()=>{this.syncSessions(),this.restoreRoutingFromRuntime(),this.scheduleScrollToBottom()}),this.unsubs.push(I.events.subscribe(k.sessionChanged,()=>{this.syncSessions(),this.scheduleScrollToBottom()}),I.events.subscribe(k.providersChanged,()=>this.onProvidersChanged()),I.events.subscribe(k.approvalModeChanged,e=>{this.approvalMode=e}),I.events.subscribe(k.permissionAsked,e=>{this.pendingPermission=e,this.scheduleScrollToBottom()}),I.events.subscribe(k.messagePart,e=>{let{sessionId:t,part:n}=e;t===this.focusedId&&(this.streamingParts=se(this.streamingParts,n),this.scheduleScrollToBottom())}),I.events.subscribe(k.messageDone,()=>{this.streamingParts=[],this.syncSessions(),this.scheduleScrollToBottom()}))}doClose(){this.scrollDebounceTimer&&clearTimeout(this.scrollDebounceTimer),this.scrollDebounceTimer=void 0,this.cancelTurn(),this.stopBusyStatus(),(this.textarea?.shadowRoot?.querySelector(`textarea`))?.removeEventListener(`paste`,this.nativePasteHandler),this.composerPasteBound=!1;for(let e of this.unsubs)e();this.unsubs=[]}startBusyStatus(){this.stopBusyStatus(),this.busyStatus=R,window.addEventListener(`keydown`,this.cancelKeyHandler);let e=()=>{this.busyStatusTimer=setTimeout(()=>{this.busyStatus=ne(this.busyStatus),e()},V())};e()}stopBusyStatus(){this.busyStatusTimer&&clearTimeout(this.busyStatusTimer),this.busyStatusTimer=void 0,this.busyStatus=R,window.removeEventListener(`keydown`,this.cancelKeyHandler)}syncSessions(){let e=I.sessions.list();this.sessions=[...e].sort((e,t)=>e.createdAt-t.createdAt);let t=I.sessions.focused(),n=t?.id??e[0]?.id??null;n&&t?.id!==n&&I.sessions.focus(n),this.focusedId=n}scheduleScrollToBottom(){this.scrollDebounceTimer&&clearTimeout(this.scrollDebounceTimer),this.scrollDebounceTimer=setTimeout(()=>{this.scrollDebounceTimer=void 0,this.scrollToBottom()},50)}async scrollToBottom(){await this.updateComplete,await new Promise(e=>requestAnimationFrame(()=>e()));let e=this.renderRoot.querySelector(`wa-scroller.transcript`);if(!e?.shadowRoot)return;let t=e.shadowRoot.querySelector(`#content`);t instanceof HTMLElement&&(t.scrollTop=t.scrollHeight)}focusedSession(){return this.sessions.find(e=>e.id===this.focusedId)??this.sessions[0]}deleteSession(e){this.sessions.length<=1&&I.sessions.createSession({title:`Chat`}),I.removeSession(e),this.streamingParts=[],this.syncSessions()}openSession(e){I.sessions.focus(e)&&(this.streamingParts=[],this.syncSessions(),this.historyOpen=!1,this.historyQuery=``,I.commitSessions(),this.scheduleScrollToBottom())}newSession(){I.sessions.createSession({title:`Chat`}),this.streamingParts=[],this.historyOpen=!1,this.historyQuery=``,this.syncSessions(),I.commitSessions()}historySessions(){let e=this.historyQuery.trim().toLowerCase(),t=[...this.sessions].sort((e,t)=>t.updatedAt-e.updatedAt);return e?t.filter(t=>t.title.toLowerCase().includes(e)?!0:t.history.some(t=>t.parts.some(t=>t.type===`text`?t.text.toLowerCase().includes(e):t.type===`file`?t.name.toLowerCase().includes(e)||t.id.toLowerCase().includes(e)||(t.path?.toLowerCase().includes(e)??!1):!1))):t}syncModels(){this.modelIds=I.listConfiguredModels(),(!this.manualModel||!this.modelIds.includes(this.manualModel))&&(this.manualModel=this.modelIds[0]??I.defaultModelId())}restoreRoutingFromRuntime(){this.syncModels();let e=I.getModelPolicy();e.mode===`auto`?(this.policyMode=`auto`,this.optimizeFor=e.optimizeFor):(this.policyMode=`manual`,this.manualModel=e.model,this.manualEffort=e.effort??`auto`,(!this.manualModel||!this.modelIds.includes(this.manualModel))&&(this.manualModel=this.modelIds[0]??I.defaultModelId(),this.applyPolicy())),this.approvalMode=I.getApprovalMode()}onProvidersChanged(){this.syncModels(),this.policyMode===`manual`&&(this.manualModel&&this.modelIds.includes(this.manualModel)||(this.manualModel=this.modelIds[0]??I.defaultModelId(),this.applyPolicy()))}effortChoices(){let e=E(this.manualModel||I.defaultModelId());return e.supported?[`auto`,...e.levels]:[`auto`,`none`]}routerValue(){return this.policyMode===`auto`?`auto:${this.optimizeFor}`:`model:${this.manualModel}`}routerLabel(){return this.policyMode===`auto`?`Auto · ${W(this.optimizeFor)}`:this.modelIds.length?Q(this.manualModel||this.modelIds[0]):`No models`}activeModelRef(){return[...this.focusedSession()?.history??[]].reverse().find(e=>e.role===`assistant`&&e.routedModel)?.routedModel||(this.policyMode===`manual`?this.manualModel||this.modelIds[0]||I.defaultModelId():this.modelIds[0]||I.defaultModelId())}contextUsage(){return N(this.focusedSession(),this.activeModelRef())}async compactFocused(){this.focusedId&&(await I.compactSession(this.focusedId),this.syncSessions())}onRouterSelect(e){if(e.startsWith(`auto:`)){let t=e.slice(5);(t===`cost`||t===`balance`||t===`intelligence`)&&(this.policyMode=`auto`,this.optimizeFor=t,this.applyPolicy());return}if(e.startsWith(`model:`)){let t=e.slice(6);if(!t)return;this.policyMode=`manual`,this.manualModel=t,this.applyPolicy()}}applyPolicy(){let e=this.policyMode===`manual`?{mode:`manual`,model:this.manualModel||I.defaultModelId(),effort:this.manualEffort}:{mode:`auto`,optimizeFor:this.optimizeFor};I.setModelPolicy(e)}async setComposerText(e){this.draft=e,await this.updateComplete,this.textarea&&(this.textarea.value=e)}async clearComposer(){this.pendingAttachmentIds=[],this.fileInput&&(this.fileInput.value=``),await this.setComposerText(``)}sessionAttachments(){return this.focusedSession()?.attachments??[]}previewAttachment(){if(this.previewAttachmentId)return this.sessionAttachments().find(e=>e.id===this.previewAttachmentId)}openAttachmentPreview(e){this.previewAttachmentId=e}closeAttachmentPreview(){this.previewAttachmentId=null}removeSessionAttachment(e){let t=this.focusedId??I.ensureSessionId();I.removeAttachment(t,e),this.pendingAttachmentIds=this.pendingAttachmentIds.filter(t=>t!==e),this.previewAttachmentId===e&&(this.previewAttachmentId=null),this.syncSessions()}async saveAttachmentToWorkspace(e){let t=this.sessionAttachments().find(t=>t.id===e);if(!t)return;let n=G(t),r=await p(`directory`);if(r)try{let e=await b.getWorkspace();if(!e){f(`No workspace connected`);return}let i=r.replace(/\/$/,``),a=await q(e,i,n),o=`${i}/${a}`,l=await e.getResource(o,{create:!0});if(!(l instanceof c)){f(`Could not create file in the selected folder`);return}if(t.dataUrl){let e=await(await fetch(t.dataUrl)).blob(),n=new globalThis.File([e],a,{type:e.type||t.mime||``});await l.saveContents(n,{contentType:s.BINARY})}else if(t.text!=null)await l.saveContents(t.text);else{f(`Attachment has no payload to save`);return}v(`Saved ${a}`)}catch(e){f(e instanceof Error?e.message:String(e))}}async addFiles(e){let t=[...e];if(!t.length)return;let n=I.ensureSessionId(this.focusedId??void 0);this.focusedId=n;let r=this.sessionAttachments(),i=[];for(let e of t){if(r.length+i.length>=8){f(`At most 8 files per session`);break}if(r.some(t=>t.name===e.name&&t.byteLength===e.size)||i.some(t=>t.name===e.name&&t.byteLength===e.size))continue;let t=await w(e);if(!t.ok){f(t.error);continue}i.push(t.attachment)}let a=await I.addAttachments(n,i);a.length&&(this.pendingAttachmentIds=[...this.pendingAttachmentIds,...a.map(e=>e.id).filter(e=>!this.pendingAttachmentIds.includes(e))]),this.syncSessions()}openFilePicker(){this.fileInput?.click()}async onFileInputChange(e){let t=e.target;t.files?.length&&await this.addFiles(t.files),t.value=``}onComposerDragOver(e){e.dataTransfer?.types.includes(`Files`)&&(e.preventDefault(),this.dragOver=!0)}onComposerDragLeave(e){e.currentTarget===e.target&&(this.dragOver=!1)}async onComposerDrop(e){e.preventDefault(),this.dragOver=!1,e.dataTransfer?.files?.length&&await this.addFiles(e.dataTransfer.files)}async onComposerPaste(e){let t=ae(e.clipboardData);t.length&&(e.preventDefault(),await this.addFiles(t))}cancelTurn(){(this.busy||this.promptController)&&(this.promptController?.abort(),this.pendingPermission&&this.resolvePermission(`deny`))}clearQueuedPrompt(){this.queuedPrompt=null}async queueFollowUp(e,t){this.queuedPrompt={text:e,attachmentIds:t},this.pendingAttachmentIds=[],this.fileInput&&(this.fileInput.value=``),await this.setComposerText(``)}async send(){let e=this.draft.trim(),t=[...this.pendingAttachmentIds];if(!e&&!t.length)return;if(this.busy){await this.queueFollowUp(e,t);return}this.applyPolicy(),this.pendingAttachmentIds=[],this.fileInput&&(this.fileInput.value=``),await this.setComposerText(``);let n=new AbortController;this.promptController=n,this.busy=!0,this.streamingParts=[],this.startBusyStatus();try{await I.prompt({sessionId:this.focusedId??void 0,text:e,attachmentIds:t,signal:n.signal})}finally{this.promptController===n&&(this.promptController=null),this.stopBusyStatus(),this.busy=!1,this.streamingParts=[],this.syncSessions(),this.scheduleScrollToBottom();let e=this.queuedPrompt;if(this.queuedPrompt=null,e&&(e.text.trim()||e.attachmentIds.length)){this.draft=e.text,this.pendingAttachmentIds=e.attachmentIds,await this.updateComplete,this.textarea&&(this.textarea.value=e.text),await this.send();return}this.textarea?.focus()}}renderAttachmentDropdown(){let e=this.sessionAttachments(),t=e.length;return l`
      <wa-dropdown class="attach-menu" size="s" placement="top-end" distance="4">
        <wa-button
          slot="trigger"
          size="s"
          appearance="plain"
          title=${t?`${t} attachment${t===1?``:`s`}`:`Attachments`}
        >
          <wa-icon name="paperclip" label="Attachments"></wa-icon>
          ${t>0?l`<wa-badge pill>${t}</wa-badge>`:y}
        </wa-button>
        <div
          class="attach-panel"
          @click=${e=>e.stopPropagation()}
          @keydown=${e=>e.stopPropagation()}
        >
          ${t?l`
                <div class="attach-list">
                  ${e.map(e=>l`
                      <div class="attach-row">
                        <button
                          type="button"
                          class="attach-preview-btn"
                          title="Open ${e.name}"
                          @click=${()=>this.openAttachmentPreview(e.id)}
                        >
                          ${e.kind===`image`&&e.dataUrl?l`<img
                                class="attach-thumb"
                                src=${e.dataUrl}
                                alt=${e.name}
                              />`:l`
                                <span class="attach-file-icon">
                                  <wa-icon name="file" label=""></wa-icon>
                                </span>
                              `}
                          <span class="attach-name">${e.name}</span>
                        </button>
                        <wa-button
                          size="s"
                          appearance="plain"
                          title=${`Save ${e.name} to workspace folder`}
                          @click=${()=>void this.saveAttachmentToWorkspace(e.id)}
                        >
                          <wa-icon name="floppy-disk" label=${`Save ${e.name}`}></wa-icon>
                        </wa-button>
                        <wa-button
                          size="s"
                          appearance="plain"
                          title="Remove from session"
                          @click=${()=>this.removeSessionAttachment(e.id)}
                        >
                          <wa-icon name="xmark" label="Remove"></wa-icon>
                        </wa-button>
                      </div>
                    `)}
                </div>
              `:l`<div class="attach-empty">No attachments in this session</div>`}
          <wa-button
            size="s"
            appearance="outlined"
            ?disabled=${t>=8}
            @click=${()=>this.openFilePicker()}
          >
            <wa-icon slot="start" name="plus"></wa-icon>
            Add files…
          </wa-button>
        </div>
      </wa-dropdown>
    `}renderAttachmentDialog(){let e=this.previewAttachment();return e?l`
      <wa-dialog
        label=${e.name}
        open
        light-dismiss
        with-footer
        style="--width: min(40rem, 94vw)"
        @wa-after-hide=${()=>this.closeAttachmentPreview()}
      >
        <div class="attach-dialog-body">
          ${e.kind===`image`&&e.dataUrl?l`<img class="attach-dialog-image" src=${e.dataUrl} alt=${e.name} />`:y}
          ${e.text?l`<pre class="attach-dialog-text">${e.text}</pre>`:e.kind===`image`&&e.dataUrl?y:l`<pre class="attach-dialog-text"></pre>`}
        </div>
        <div slot="footer">
          <wa-button
            variant="danger"
            appearance="outlined"
            @click=${()=>this.removeSessionAttachment(e.id)}
          >
            Remove
          </wa-button>
          <wa-button variant="brand" @click=${()=>this.closeAttachmentPreview()}>Close</wa-button>
        </div>
      </wa-dialog>
    `:y}openToolDetail(e){this.toolDetail=e}closeToolDetail(){this.toolDetail=null}renderToolDetailDialog(){let e=this.toolDetail;if(!e)return y;let t=`${e.name} · ${e.status}${e.durationMs==null?``:` · ${e.durationMs}ms`}`,n=JSON.stringify({args:e.args??{},result:e.result??null},null,2);return l`
      <wa-dialog
        label=${t}
        open
        light-dismiss
        with-footer
        style="--width: min(44rem, 96vw)"
        @wa-after-hide=${()=>this.closeToolDetail()}
      >
        <div class="tool-detail-body">
          <pre>${n}</pre>
        </div>
        <div slot="footer">
          <wa-button variant="brand" @click=${()=>this.closeToolDetail()}>Close</wa-button>
        </div>
      </wa-dialog>
    `}resolvePermission(e){this.pendingPermission&&=(I.resolvePermission(this.pendingPermission.requestId,e),null)}renderToolbar(){let e=this.focusedSession()?.title||`Chat`;return l`
      <span class="toolbar-title" title=${e}>${e}</span>
      <wa-button size="s" appearance="plain" title="New chat" @click=${()=>this.newSession()}>
        <wa-icon name="plus" label="New chat"></wa-icon>
      </wa-button>
      ${this.renderHistoryDropdown()}
      <wa-button
        size="s"
        appearance="plain"
        title="Checkpoint"
        @click=${()=>{this.focusedId&&(I.sessions.checkpoint(this.focusedId),this.syncSessions(),I.commitSessions())}}
      >
        <wa-icon name="floppy-disk" label="Checkpoint"></wa-icon>
      </wa-button>
      ${this.renderSettingsDropdown()}
    `}contextRingStyle(e){let t=e===`critical`?`danger`:e===`warn`?`warning`:`success`;return[`--track-color: var(--wa-color-${t}-fill-quiet)`,`--indicator-color: var(--wa-color-${t}-fill-loud)`].join(`;`)}renderContextDropdown(){let e=this.contextUsage(),t=(this.focusedSession()?.history.length??0)>12,n=te(e.percent),r=`Context window ${n} · ~${L(e.used)} / ${L(e.limit)}`,i=Math.min(100,Math.max(e.percent,+(e.used>0)));return l`
      <wa-dropdown
        class="context-menu"
        size="s"
        placement="top-end"
        distance="4"
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          title=${r}
        >
          <wa-progress-ring
            class="context-ring"
            style=${this.contextRingStyle(e.level)}
            value=${i}
            label=${r}
          ></wa-progress-ring>
        </wa-button>

        <div
          class="context-panel"
          @click=${e=>e.stopPropagation()}
          @keydown=${e=>e.stopPropagation()}
        >
          <div class="context-header">
            <strong>Context window</strong>
            <span>${n}</span>
          </div>
          <div class="context-bars">
            ${e.buckets.map(t=>{let n=e.limit>0?t.tokens/e.limit*100:0;return l`
                <div class="context-row">
                  <span class="context-row-label">${t.label}</span>
                  <span>${D(t)}</span>
                  <div class="context-meter">
                    <span
                      style="width:${Math.max(n,t.tokens>0?.5:0)}%; --bucket-color: var(--wa-color-brand-fill-normal)"
                    ></span>
                  </div>
                </div>
              `})}
          </div>
          <div class="context-footer">
            <span class="context-remaining">
              ~${L(e.used)} in window · ${L(e.remaining)} free of
              ${L(e.limit)}
              · ${Q(e.modelRef)}
            </span>
          </div>
          <div
            class="context-io"
            title="Sum of provider-reported tokens across every model request in this chat. Each tool-loop call re-sends the prompt, so API input grows much faster than the context window fill."
          >
            <div class="context-io-heading">API usage (this chat)</div>
            <div class="context-io-item">
              <span>Input</span>
              <strong>${e.inputTokens?L(e.inputTokens):`—`}</strong>
            </div>
            <div class="context-io-item">
              <span>Output</span>
              <strong>${e.outputTokens?L(e.outputTokens):`—`}</strong>
            </div>
          </div>
          <div class="context-footer">
            <wa-button
              size="s"
              variant=${e.level===`critical`?`danger`:`neutral`}
              appearance=${t?`filled`:`outlined`}
              ?disabled=${!t||this.busy}
              @click=${()=>this.compactFocused()}
            >
              <wa-icon slot="start" name="arrows-down-to-line"></wa-icon>
              Compact conversation
            </wa-button>
          </div>
        </div>
      </wa-dropdown>
    `}renderContent(){let e=this.focusedSession();return l`
      <div class="cognitive-shell">
        <wa-scroller class="transcript" orientation="vertical">
          <div class="transcript-inner">
            <div class="transcript-spacer" aria-hidden="true"></div>
            ${e?this.renderTranscript(e):y}
          </div>
        </wa-scroller>

        <div
          class="composer-shell ${this.dragOver?`drag-over`:``}"
          @dragover=${e=>this.onComposerDragOver(e)}
          @dragleave=${e=>this.onComposerDragLeave(e)}
          @drop=${e=>void this.onComposerDrop(e)}
        >
          <input
            id="attach-file-input"
            type="file"
            multiple
            accept=${O}
            hidden
            @change=${e=>void this.onFileInputChange(e)}
          />
          <div class="composer">
            ${this.queuedPrompt?l`
                  <div class="queued-prompt" title="Sends automatically when the current turn finishes">
                    <wa-icon name="clock"></wa-icon>
                    <span class="queued-prompt-text">
                      Queued: ${this.queuedPrompt.text.trim()||`(${this.queuedPrompt.attachmentIds.length} attachment${this.queuedPrompt.attachmentIds.length===1?``:`s`})`}
                    </span>
                    <wa-button
                      size="s"
                      appearance="plain"
                      title="Remove queued follow-up"
                      @click=${()=>this.clearQueuedPrompt()}
                    >
                      <wa-icon name="xmark" label="Remove queue"></wa-icon>
                    </wa-button>
                  </div>
                `:y}
            <div class="composer-row">
              <wa-textarea
                placeholder=${this.busy?`Add a follow-up…`:`Enter your message here…`}
                size="s"
                resize="auto"
                rows="1"
                .value=${this.draft}
                @input=${e=>{this.draft=e.target.value}}
                @keydown=${e=>{if(e.key===`Escape`&&this.busy){e.preventDefault(),this.cancelTurn();return}e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),this.send())}}
              ></wa-textarea>
              <div class="composer-actions">
                ${this.busy?l`
                      <wa-button
                        size="s"
                        appearance="plain"
                        variant="danger"
                        title="Stop (Esc)"
                        @click=${()=>this.cancelTurn()}
                      >
                        <wa-icon name="stop" label="Stop"></wa-icon>
                      </wa-button>
                    `:y}
                ${this.renderAttachmentDropdown()}
                ${this.renderContextDropdown()}
              </div>
            </div>
          </div>
        </div>
        ${this.renderAttachmentDialog()}
        ${this.renderToolDetailDialog()}
      </div>
    `}renderTranscript(e){let t=this.busy||this.streamingParts.length>0,n=this.pendingPermission&&this.pendingPermission.sessionId===e.id;return l`
      ${e.history.map(e=>this.renderMessage(e))}
      ${t?this.renderAssistantMessage({id:`streaming`,role:`assistant`,parts:this.streamingParts,createdAt:Date.now()},{streaming:!0}):y}
      ${n?l`
            <wa-callout variant="warning" appearance="outlined">
              <wa-icon slot="icon" name="shield-halved"></wa-icon>
              Allow tool <code>${this.pendingPermission.toolName}</code>?
              <pre class="args">${JSON.stringify(this.pendingPermission.args,null,2)}</pre>
              <div class="approval-actions">
                <wa-button size="s" variant="success" @click=${()=>this.resolvePermission(`allow`)}>
                  <wa-icon slot="start" name="check"></wa-icon>
                  Allow
                </wa-button>
                <wa-button
                  size="s"
                  variant="neutral"
                  appearance="outlined"
                  @click=${()=>this.resolvePermission(`deny`)}
                >
                  <wa-icon slot="start" name="xmark"></wa-icon>
                  Deny
                </wa-button>
              </div>
            </wa-callout>
          `:y}
    `}renderHistoryDropdown(){let e=Z(this.historySessions());return l`
      <wa-dropdown
        class="history-menu"
        size="s"
        placement="bottom-end"
        distance="4"
        ?open=${this.historyOpen}
        @wa-after-show=${()=>{this.historyOpen=!0}}
        @wa-after-hide=${()=>{this.historyOpen=!1,this.historyQuery=``}}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title="Chat history"
          @click=${e=>{e.stopPropagation(),this.historyOpen=!this.historyOpen}}
        >
          <wa-icon name="clock-rotate-left" label="Chat history"></wa-icon>
        </wa-button>

        <div
          class="history-search"
          @click=${e=>e.stopPropagation()}
          @keydown=${e=>e.stopPropagation()}
        >
          <wa-input
            size="s"
            clearable
            placeholder="Search chats…"
            .value=${this.historyQuery}
            @input=${e=>{this.historyQuery=e.target.value}}
          >
            <wa-icon slot="start" name="magnifying-glass"></wa-icon>
          </wa-input>
        </div>

        ${e.length?e.map(e=>l`
                <h3>${e.label}</h3>
                ${e.sessions.map(e=>l`
                    <wa-dropdown-item @click=${()=>this.openSession(e.id)}>
                      <wa-icon
                        slot="icon"
                        name=${e.id===this.focusedId?`check`:`message`}
                      ></wa-icon>
                      <span class="history-item-title" title=${e.title}>${e.title}</span>
                      <div slot="details" style="display:flex;align-items:center;gap:0.25rem">
                        <span class="history-item-meta">${re(e.updatedAt)}</span>
                        <wa-button
                          appearance="plain"
                          size="s"
                          title="Delete chat"
                          @click=${t=>{t.stopPropagation(),this.deleteSession(e.id)}}
                        >
                          <wa-icon name="trash" label="Delete chat"></wa-icon>
                        </wa-button>
                      </div>
                    </wa-dropdown-item>
                  `)}
              `):l`<div class="history-empty">${this.historyQuery?`No matching chats`:`No chats yet`}</div>`}
      </wa-dropdown>
    `}onSettingsSelect(e){if(e===`settings`){this.executeCommand(M,{});return}if(e.startsWith(`approval:`)){let t=e.slice(9);(t===`manual`||t===`auto_safe`||t===`auto_all`)&&(this.approvalMode=t,I.setApprovalMode(t));return}if(e.startsWith(`effort:`)){this.manualEffort=e.slice(7)||`auto`,this.applyPolicy();return}this.onRouterSelect(e)}renderSettingsDropdown(){let e=this.routerValue(),t=[{value:`auto:cost`,label:`Auto · Cost`},{value:`auto:balance`,label:`Auto · Balance`},{value:`auto:intelligence`,label:`Auto · Intelligence`}],n=this.effortChoices();return l`
      <wa-dropdown
        class="settings-menu"
        size="s"
        placement="bottom-end"
        distance="4"
        @wa-select=${e=>{let t=e.detail?.item?.value;t!=null&&this.onSettingsSelect(t)}}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title=${`AI · ${this.routerLabel()}`}
        >
          <wa-icon name="gear" label="AI settings"></wa-icon>
        </wa-button>

        <h3>Auto</h3>
        ${t.map(t=>l`
            <wa-dropdown-item
              value=${t.value}
              type="checkbox"
              .checked=${t.value===e}
            >
              ${t.label}
            </wa-dropdown-item>
          `)}

        <wa-divider></wa-divider>
        <h3>Models</h3>
        ${this.modelIds.length?this.modelIds.map(t=>l`
                <wa-dropdown-item
                  value=${`model:${t}`}
                  type="checkbox"
                  .checked=${e===`model:${t}`}
                >
                  ${t}
                </wa-dropdown-item>
              `):l`<wa-dropdown-item disabled>No models configured</wa-dropdown-item>`}

        ${this.policyMode===`manual`?l`
              <wa-divider></wa-divider>
              <h3>Effort</h3>
              ${n.map(e=>l`
                  <wa-dropdown-item
                    value=${`effort:${e}`}
                    type="checkbox"
                    .checked=${this.manualEffort===e}
                  >
                    ${e}
                  </wa-dropdown-item>
                `)}
            `:y}

        <wa-divider></wa-divider>
        <h3>Tool approvals</h3>
        ${U.map(e=>l`
            <wa-dropdown-item
              value=${`approval:${e.value}`}
              type="checkbox"
              .checked=${this.approvalMode===e.value}
            >
              ${e.label}
            </wa-dropdown-item>
          `)}

        <wa-divider></wa-divider>
        <wa-dropdown-item value="settings">
          <wa-icon slot="icon" name="sliders"></wa-icon>
          Settings…
        </wa-dropdown-item>
      </wa-dropdown>
    `}resolveAttachmentDataUrl(e){return this.focusedSession()?.attachments?.find(t=>t.id===e)?.dataUrl}renderMessage(e){if(e.role===`user`){let t=e.parts.filter(e=>e.type===`file`),n=e.parts.filter(e=>e.type===`text`);return l`
        <div class="msg user">
          ${t.length?l`
                <div class="msg-files">
                  ${t.map(e=>{let t=e.kind===`image`?this.resolveAttachmentDataUrl(e.id):void 0;return t?l`<img
                          class="msg-file-thumb"
                          src=${t}
                          alt=${e.name}
                          title=${`${e.name} (${e.id})`}
                        />`:l`
                          <wa-tag
                            size="s"
                            appearance="outlined"
                            title=${`${e.path||e.name} (${e.id})`}
                          >
                            <wa-icon slot="start" name=${e.kind===`image`?`image`:`file`}></wa-icon>
                            ${e.name}
                          </wa-tag>
                        `})}
                </div>
              `:y}
          ${n.map(e=>this.renderTextPart(e))}
          ${this.renderMessageMeta(e)}
        </div>
      `}return this.renderAssistantMessage(e)}renderAssistantMessage(e,t={}){let{summaryText:n,techParts:r}=J(e.parts),i=t.streaming===!0||r.some(e=>(e.type===`reasoning`||e.type===`tool`)&&e.status===`streaming`),a=n.length?n.map(e=>this.renderTextPart(e,{markdown:!0})):t.streaming?y:l`<div class="bubble">${Y(r)}</div>`,o=l`
      <div slot="summary" class="msg-summary">
        ${t.streaming?l`
              <div class="streaming-meta">
                <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                <span>${this.busy?this.busyStatus:`streaming…`}</span>
              </div>
            `:y}
        ${a}
      </div>
    `;return r.length?l`
      <div class="msg assistant">
        <wa-details class="msg-details" appearance="plain" ?open=${i}>
          ${o}
          <div class="msg-tech">${r.map(e=>this.renderTechnicalPart(e))}</div>
        </wa-details>
        ${e.id===`streaming`?y:this.renderMessageMeta(e)}
      </div>
    `:l`
        <div class="msg assistant">
          ${t.streaming?l`
                <div class="streaming-meta">
                  <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                  <span>${this.busy?this.busyStatus:`streaming…`}</span>
                </div>
              `:y}
          ${a}
          ${e.id===`streaming`?y:this.renderMessageMeta(e)}
        </div>
      `}renderMessageMeta(e){let t=ie(e.createdAt);return l`
      <div class="msg-meta">
        <wa-tag size="s" appearance="outlined" title=${new Date(e.createdAt).toLocaleString()}>
          ${t}
        </wa-tag>
        ${e.routedModel?l`<wa-tag size="s" appearance="outlined">${e.routedModel}</wa-tag>`:y}
        ${e.effort?l`<wa-tag size="s" appearance="outlined">${e.effort}</wa-tag>`:y}
      </div>
    `}renderTextPart(e,n={}){return e.type===`text`?n.markdown?l`<div class="bubble markdown">${t(r(e.text))}</div>`:l`<div class="bubble">${e.text}</div>`:y}renderTechnicalPart(e){if(e.type===`reasoning`)return l`
        <div>
          <div class="tool-heading">Thinking</div>
          <div class="bubble">${e.text}</div>
        </div>
      `;if(e.type===`tool`){let t=`${e.name} · ${e.status}${e.durationMs==null?``:` · ${e.durationMs}ms`}`,n=e.args!=null||e.result!=null||e.status===`error`;return l`
        <div class="tool-row">
          <div class="tool-heading">${t}</div>
          ${n?l`
                <wa-button
                  size="s"
                  appearance="plain"
                  variant="neutral"
                  @click=${()=>this.openToolDetail(e)}
                >
                  Details
                </wa-button>
              `:y}
        </div>
      `}return e.type===`step`?l`<div class="tool-heading">Step: ${e.title} · ${e.status}</div>`:y}};i([x(`wa-textarea`)],H.prototype,`textarea`,void 0),i([x(`#attach-file-input`)],H.prototype,`fileInput`,void 0),i([a()],H.prototype,`sessions`,void 0),i([a()],H.prototype,`focusedId`,void 0),i([a()],H.prototype,`draft`,void 0),i([a()],H.prototype,`pendingAttachmentIds`,void 0),i([a()],H.prototype,`dragOver`,void 0),i([a()],H.prototype,`previewAttachmentId`,void 0),i([a()],H.prototype,`toolDetail`,void 0),i([a()],H.prototype,`busy`,void 0),i([a()],H.prototype,`busyStatus`,void 0),i([a()],H.prototype,`queuedPrompt`,void 0),i([a()],H.prototype,`pendingPermission`,void 0),i([a()],H.prototype,`policyMode`,void 0),i([a()],H.prototype,`optimizeFor`,void 0),i([a()],H.prototype,`manualModel`,void 0),i([a()],H.prototype,`manualEffort`,void 0),i([a()],H.prototype,`approvalMode`,void 0),i([a()],H.prototype,`modelIds`,void 0),i([a()],H.prototype,`streamingParts`,void 0),i([a()],H.prototype,`historyOpen`,void 0),i([a()],H.prototype,`historyQuery`,void 0),H=i([o(`docks-cognitive-view`)],H);var U=[{value:`auto_safe`,label:`Auto-approve non-critical`},{value:`manual`,label:`Manual`},{value:`auto_all`,label:`Approve all`}];function W(e){return e&&e[0].toUpperCase()+e.slice(1)}function G(e){return e.name.trim().split(/[/\\]/).pop()?.trim()||e.path?.split(/[/\\]/).pop()?.trim()||(e.kind===`image`?e.mime===`image/jpeg`?`attachment.jpg`:`attachment.png`:`attachment.txt`)}function K(e,t){let n=e.lastIndexOf(`.`);return n>0?`${e.slice(0,n)} (${t})${e.slice(n)}`:`${e} (${t})`}async function q(e,t,n){let r=e=>`${t}/${e}`;if(!await e.getResource(r(n)))return n;for(let t=1;t<1e4;t++){let i=K(n,t);if(!await e.getResource(r(i)))return i}return K(n,Date.now())}function J(e){let t=e.filter(e=>e.type!==`text`),n=-1;for(let t=0;t<e.length;t++)e[t].type!==`text`&&(n=t);if(n<0)return{summaryText:e.filter(e=>e.type===`text`),techParts:t};let r=e.slice(n+1).filter(e=>e.type===`text`).filter(e=>e.text.trim());return r.length?{summaryText:r,techParts:t}:{summaryText:[],techParts:t}}function Y(e){let t=e.filter(e=>e.type===`tool`),n=t.filter(e=>e.status===`done`).length,r=t.filter(e=>e.status===`error`).length;return t.length?r&&n?`Finished with ${r} issue${r===1?``:`s`} (${n} ok).`:r?`Couldn't complete ${r} step${r===1?``:`s`}.`:t.some(e=>e.status===`running`||e.status===`preparing`)?`Working…`:n===1?`Done.`:`Done · ${n} steps.`:e.some(e=>e.type===`reasoning`)?`Thinking…`:`Details`}function X(e){let t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}function Z(e){let t=X(Date.now()),n=t-864e5,r=t-6048e5,i={today:[],yesterday:[],week:[],older:[]};for(let a of e){let e=X(a.updatedAt);e>=t?i.today.push(a):e>=n?i.yesterday.push(a):e>=r?i.week.push(a):i.older.push(a)}return[{label:`Today`,sessions:i.today},{label:`Yesterday`,sessions:i.yesterday},{label:`Previous 7 Days`,sessions:i.week},{label:`Older`,sessions:i.older}].filter(e=>e.sessions.length>0)}function re(e){let t=Math.max(0,Date.now()-e),n=Math.floor(t/6e4);if(n<1)return`now`;if(n<60)return`${n}m`;let r=Math.floor(n/60);if(r<24)return`${r}h`;let i=Math.floor(r/24);return i<7?`${i}d`:new Date(e).toLocaleDateString(void 0,{month:`short`,day:`numeric`})}function ie(e){let t=new Date(e),n=new Date,r=t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate(),i=t.toLocaleTimeString(void 0,{hour:`numeric`,minute:`2-digit`});return r?i:`${t.toLocaleDateString(void 0,{month:`short`,day:`numeric`})} ${i}`}function Q(e){let t=e.indexOf(`/`);return t===-1?e:e.slice(t+1)}function ae(e){if(!e)return[];let t=[...e.files??[]].filter(e=>e&&e.size>0);if(t.length)return t;let n=[];for(let t of e.items??[]){if(t.kind!==`file`)continue;let e=t.getAsFile();!e||e.size<=0||n.push(oe(e,t.type))}return n}function oe(e,t){let n=(e.type||t||`application/octet-stream`).toLowerCase();if(e.name&&e.name!==`image.png`&&e.name!==`blob`)return e;let r=n===`image/jpeg`||n===`image/jpg`?`jpg`:n===`image/png`?`png`:n===`image/gif`?`gif`:n===`image/webp`?`webp`:n===`image/svg+xml`?`svg`:n.startsWith(`image/`)?`png`:`bin`,i=`clipboard-${Date.now()}.${r}`;return new File([e],i,{type:n||e.type,lastModified:e.lastModified})}function se(e,t){let n=[...e],r=n[n.length-1];return t.type===`text`&&r?.type===`text`?(n[n.length-1]={...r,text:r.text+t.text},n):t.type===`reasoning`&&r?.type===`reasoning`?(n[n.length-1]={...r,text:r.text+t.text,status:t.status},n):t.type===`tool`&&r?.type===`tool`&&r.id===t.id?(n[n.length-1]=t,n):(n.push(t),n)}var ce=[{value:`auto_safe`,label:`Auto-approve non-critical`,hint:`The agent classifies each tool as safe or critical; only critical ones ask for approval`},{value:`manual`,label:`Manual`,hint:`Confirm every tool before it runs`},{value:`auto_all`,label:`Approve all`,hint:`Run every tool without asking`}],$=class extends m{constructor(...e){super(...e),this.settings=T(),this.approvalMode=`auto_safe`,this.availableModels={},this.loadingModels={},this.modelErrors={},this.unsubs=[],this.fetchControllers=new Map,this.fetchTimers=new Map,this.autoFetchedKeys=new Set}doInitUI(){I.start(),this.loadFromRuntime(),this.unsubs.push(I.events.subscribe(k.providersChanged,()=>{this.isDirty()||this.loadFromRuntime()}),I.events.subscribe(k.approvalModeChanged,e=>{this.approvalMode=e}))}disconnectedCallback(){for(let e of this.unsubs)e();this.unsubs=[];for(let e of this.fetchTimers.values())clearTimeout(e);this.fetchTimers.clear();for(let e of this.fetchControllers.values())e.abort();this.fetchControllers.clear(),super.disconnectedCallback()}loadFromRuntime(){this.settings=I.getProvidersSettings(),this.approvalMode=I.getApprovalMode(),this.availableModels={},this.loadingModels={},this.modelErrors={},this.autoFetchedKeys.clear(),this.markDirty(!1),this.settings.providers.forEach((e,t)=>{e.apiKey.trim()&&e.baseUrl.trim()&&this.fetchModels(t,{auto:!0})})}setApprovalMode(e){this.approvalMode=e,I.setApprovalMode(e)}touch(e){this.settings=e,this.markDirty(!0)}updateProvider(e,t){let n=this.settings.providers[e],r=this.settings.providers.map((n,r)=>r===e?{...n,...t}:n),i=this.settings.defaultProviderId;if(t.id&&n?.id===i&&(i=t.id),this.touch({...this.settings,defaultProviderId:i,providers:r}),t.apiKey!==void 0||t.baseUrl!==void 0){let t=r[e];t?.apiKey.trim()&&t.baseUrl.trim()?this.scheduleFetchModels(e):t?.apiKey.trim()||this.clearModels(e)}}clearModels(e){this.fetchTimers.get(e)&&clearTimeout(this.fetchTimers.get(e)),this.fetchTimers.delete(e),this.fetchControllers.get(e)?.abort(),this.fetchControllers.delete(e);let{[e]:t,...n}=this.availableModels,{[e]:r,...i}=this.loadingModels,{[e]:a,...o}=this.modelErrors;this.availableModels=n,this.loadingModels=i,this.modelErrors=o}scheduleFetchModels(e){let t=this.fetchTimers.get(e);t&&clearTimeout(t),this.fetchTimers.set(e,setTimeout(()=>{this.fetchTimers.delete(e),this.fetchModels(e,{auto:!0})},400))}async fetchModels(e,t={}){let n=this.settings.providers[e];if(!n?.baseUrl.trim()){f(`Set a base URL before fetching models`);return}if(t.auto&&!n.apiKey.trim())return;let r=`${n.baseUrl}|${n.apiKey}`;if(t.auto&&this.autoFetchedKeys.has(r)&&this.availableModels[e]?.length)return;this.fetchControllers.get(e)?.abort();let i=new AbortController;this.fetchControllers.set(e,i),this.loadingModels={...this.loadingModels,[e]:!0},this.modelErrors={...this.modelErrors,[e]:``};try{let a=await A(n.baseUrl,n.apiKey||void 0,i.signal);if(i.signal.aborted)return;this.availableModels={...this.availableModels,[e]:a},this.autoFetchedKeys.add(r),t.auto||v(`Loaded ${a.length} models`)}catch(n){if(i.signal.aborted)return;let r=n instanceof Error?n.message:String(n);this.modelErrors={...this.modelErrors,[e]:r},this.availableModels={...this.availableModels,[e]:[]},t.auto||f(r)}finally{this.fetchControllers.get(e)===i&&(this.fetchControllers.delete(e),this.loadingModels={...this.loadingModels,[e]:!1})}}onModelsSelect(e,t){let n=t.target.value,r=Array.isArray(n)?n:n?[n]:[];this.updateProvider(e,{models:r.join(`,`)})}addProvider(){let e=le(this.settings.providers);this.touch({...this.settings,providers:[...this.settings.providers,{id:e,baseUrl:``,apiKey:``,models:``,enabled:!0}],defaultProviderId:this.settings.defaultProviderId||e})}async deleteProvider(t){let n=this.settings.providers[t];if(!n||!await e(`Delete provider "${n.id||`(unnamed)`}"?`))return;this.clearModels(t);let r=this.settings.providers.filter((e,n)=>n!==t),i=this.settings.defaultProviderId===n.id?r.find(e=>e.enabled)?.id??``:this.settings.defaultProviderId;this.touch({providers:r,defaultProviderId:i}),this.reindexModelState(t)}reindexModelState(e){let t=t=>{let n={};for(let[r,i]of Object.entries(t)){let t=Number(r);Number.isNaN(t)||t===e||(n[t>e?t-1:t]=i)}return n};this.availableModels=t(this.availableModels),this.loadingModels=t(this.loadingModels),this.modelErrors=t(this.modelErrors)}setDefault(e){this.touch({...this.settings,defaultProviderId:e})}async save(){if(this.isDirty())try{await I.setProvidersSettings(this.settings),this.loadFromRuntime(),v(`AI providers saved`)}catch(e){f(e instanceof Error?e.message:String(e))}}renderContent(){let e=this.settings.providers;return l`
      <div class="editor">
        <section class="section">
          <header class="header">
            <div>
              <h2>AI Providers</h2>
              <p class="hint">OpenAI-compatible endpoints. Edit cells in place, then save from the toolbar.</p>
            </div>
            <wa-button size="s" variant="brand" appearance="filled" @click=${()=>this.addProvider()}>
              <wa-icon slot="start" name="plus"></wa-icon>
              Add provider
            </wa-button>
          </header>

          ${e.length===0?l`<wa-callout variant="neutral" appearance="outlined">No providers configured.</wa-callout>`:l`
                <div class="table-wrap">
                  <table class="providers">
                    <thead>
                      <tr>
                        <th class="col-on">On</th>
                        <th class="col-id">ID</th>
                        <th class="col-url">Base URL</th>
                        <th class="col-key">API Key</th>
                        <th class="col-models">Models</th>
                        <th class="col-default">Default</th>
                        <th class="col-actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${e.map((e,t)=>this.renderRow(e,t))}
                    </tbody>
                  </table>
                </div>
              `}

          <wa-callout variant="neutral" appearance="plain" size="s">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Enter an API key to load available models. Catalog ids become
            <code>providerId/modelId</code> for Auto routing.
          </wa-callout>
        </section>

        <section class="section">
          <header class="header">
            <div>
              <h2>Tool approvals</h2>
              <p class="hint">How the agent handles tool confirmation — same options as GitHub Copilot.</p>
            </div>
          </header>
          <wa-radio-group
            name="approval-mode"
            label="Approval mode"
            orientation="vertical"
            .value=${this.approvalMode}
            @change=${e=>{let t=e.target.value;(t===`manual`||t===`auto_safe`||t===`auto_all`)&&this.setApprovalMode(t)}}
          >
            ${ce.map(e=>l`
                <wa-radio value=${e.value}>
                  <span class="approval-option">
                    <span class="approval-label">${e.label}</span>
                    <span class="approval-hint">${e.hint}</span>
                  </span>
                </wa-radio>
              `)}
          </wa-radio-group>
        </section>
      </div>
    `}renderRow(e,t){let n=this.settings.defaultProviderId===e.id;return l`
      <tr class=${n?`is-default`:``}>
        <td>
          <wa-checkbox
            ?checked=${e.enabled}
            @change=${e=>this.updateProvider(t,{enabled:e.target.checked})}
          ></wa-checkbox>
        </td>
        <td>
          <wa-input
            size="s"
            .value=${e.id}
            placeholder="openai"
            @input=${e=>this.updateProvider(t,{id:e.target.value})}
          ></wa-input>
        </td>
        <td>
          <wa-input
            size="s"
            .value=${e.baseUrl}
            placeholder="https://api.openai.com/v1"
            @input=${e=>this.updateProvider(t,{baseUrl:e.target.value})}
          ></wa-input>
        </td>
        <td>
          <wa-input
            size="s"
            type="password"
            password-toggle
            .value=${e.apiKey}
            placeholder="optional"
            @input=${e=>this.updateProvider(t,{apiKey:e.target.value})}
          ></wa-input>
        </td>
        <td>${this.renderModelsCell(e,t)}</td>
        <td class="col-default">
          ${n?l`<wa-tag size="s" variant="brand" pill>Default</wa-tag>`:l`
                <wa-button
                  size="s"
                  appearance="plain"
                  ?disabled=${!e.id}
                  @click=${()=>this.setDefault(e.id)}
                >
                  Set
                </wa-button>
              `}
        </td>
        <td class="col-actions">
          <wa-button
            size="s"
            appearance="plain"
            variant="danger"
            title="Delete"
            @click=${()=>void this.deleteProvider(t)}
          >
            <wa-icon name="trash" label="Delete"></wa-icon>
          </wa-button>
        </td>
      </tr>
    `}renderModelsCell(e,t){let n=!!e.apiKey.trim(),r=this.availableModels[t]??[],i=!!this.loadingModels[t],a=this.modelErrors[t],o=S(e.models);return n||r.length>0?l`
      <div class="models-cell">
        <wa-select
          size="s"
          multiple
          with-clear
          placeholder=${i?`Loading models…`:`Select models`}
          .value=${o}
          ?disabled=${i&&r.length===0}
          @change=${e=>this.onModelsSelect(t,e)}
        >
          ${r.map(e=>l`<wa-option value=${e.id}>${e.name===e.id?e.id:`${e.name} (${e.id})`}</wa-option>`)}
          ${o.filter(e=>!r.some(t=>t.id===e)).map(e=>l`<wa-option value=${e}>${e}</wa-option>`)}
        </wa-select>
        <wa-button
          size="s"
          appearance="plain"
          title="Reload models"
          ?disabled=${!e.baseUrl.trim()||i}
          ?loading=${i}
          @click=${()=>void this.fetchModels(t)}
        >
          <wa-icon name="arrows-rotate" label="Reload models"></wa-icon>
        </wa-button>
      </div>
      ${a?l`<div class="models-error">${a}</div>`:``}
    `:l`
        <div class="models-cell">
          <wa-input
            size="s"
            .value=${e.models}
            placeholder="gpt-4o-mini,gpt-4o"
            @input=${e=>this.updateProvider(t,{models:e.target.value})}
          ></wa-input>
          <wa-button
            size="s"
            appearance="plain"
            title="Fetch models"
            ?disabled=${!e.baseUrl.trim()||i}
            ?loading=${i}
            @click=${()=>void this.fetchModels(t)}
          >
            <wa-icon name="arrows-rotate" label="Reload models"></wa-icon>
          </wa-button>
        </div>
      `}static{this.styles=g`
    :host {
      display: block;
      height: 100%;
    }

    .editor {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xl);
      padding: var(--wa-space-l);
      min-width: 0;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-l);
      min-width: 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--wa-space-m);
      flex-wrap: wrap;
    }

    .header h2 {
      margin: 0;
      font-size: var(--wa-font-size-l);
    }

    wa-radio-group {
      max-width: 36rem;
    }

    .approval-option {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-3xs);
      padding-block: var(--wa-space-3xs);
    }

    .approval-label {
      font-weight: 500;
    }

    .approval-hint {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .hint {
      margin: var(--wa-space-2xs) 0 0;
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .table-wrap {
      overflow: auto;
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      border-radius: var(--wa-border-radius-m);
    }

    table.providers {
      width: 100%;
      border-collapse: collapse;
      min-width: 56rem;
    }

    th,
    td {
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-bottom: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      text-align: left;
      vertical-align: middle;
    }

    th {
      font-size: var(--wa-font-size-xs);
      font-weight: 600;
      color: var(--wa-color-text-quiet);
      background: var(--wa-color-surface-lowered);
      white-space: nowrap;
    }

    tr.is-default td {
      background: color-mix(in srgb, var(--wa-color-brand-fill-normal) 8%, transparent);
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    .col-on {
      width: 2.5rem;
    }

    .col-id {
      width: 8rem;
    }

    .col-key {
      width: 11rem;
    }

    .col-models {
      min-width: 16rem;
    }

    .col-default {
      width: 5.5rem;
      white-space: nowrap;
    }

    .col-actions {
      width: 2.75rem;
      text-align: end;
    }

    td wa-input {
      width: 100%;
    }

    .models-cell {
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: flex-start;
      min-width: 14rem;
    }

    .models-cell wa-input,
    .models-cell wa-select {
      flex: 1;
      min-width: 0;
    }

    .models-error {
      margin-top: var(--wa-space-3xs);
      color: var(--wa-color-danger-on-quiet);
      font-size: var(--wa-font-size-xs);
    }

    code {
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: 0.9em;
    }
  `}};i([n({attribute:!1})],$.prototype,`input`,void 0),i([a()],$.prototype,`settings`,void 0),i([a()],$.prototype,`approvalMode`,void 0),i([a()],$.prototype,`availableModels`,void 0),i([a()],$.prototype,`loadingModels`,void 0),i([a()],$.prototype,`modelErrors`,void 0),$=i([o(`docks-cognitive-settings-editor`)],$);function le(e){let t=new Set(e.map(e=>e.id));if(!t.has(`provider`))return`provider`;let n=2;for(;t.has(`provider-${n}`);)n+=1;return`provider-${n}`}I.start(),C(),_.put(`cognitiveRuntime`,I),h.registerContribution(ee,{name:P,label:`AI`,icon:`robot`,editorId:P,component:e=>l`<docks-cognitive-view id="${e}"></docks-cognitive-view>`}),u.registerEditorInputHandler({editorId:F,label:`AI Settings`,ranking:1e3,canHandle:e=>e.key===j,handle:async e=>(e.component=t=>l`<docks-cognitive-settings-editor id="${t}" .input=${e}></docks-cognitive-settings-editor>`,e)}),d({command:{id:M,name:`Open AI Settings`,description:`Configure AI model providers`,parameters:[]},handler:{execute:()=>{let e={title:`AI Settings`,data:{},key:j,icon:`gear`,state:{}};u.loadEditor(e)}}});