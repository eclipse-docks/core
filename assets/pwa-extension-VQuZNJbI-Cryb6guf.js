import{n as e,r as t,t as n}from"./install-prompt-capture-CRH1BlxV-CKjbxl_q.js";import{F as r,G as i,_ as a,a as o,dt as s,g as c,pt as l,vt as u}from"./dist-B5H1npoP.js";var d=class extends o{constructor(...e){super(...e),this.updateAvailable=!1,this.updateProgress=0,this.updateProgressVisible=!1,this.updateCurrentFile=``,this.pendingReload=!1,this.registration=null,this.periodicInterval=null,this.pollInterval=null,this.pollAttempts=0,this.attachAbort=null,this.onControllerChange=()=>{this.pendingReload&&window.location.reload()},this.onServiceWorkerMessage=e=>{let t=e.data;if(!t||t.type!==`SW_UPDATE_PROGRESS`||t.total<=0)return;let n=Math.max(0,Math.min(1,t.completed/t.total));this.updateProgress=n,this.updateProgressVisible=!this.updateAvailable&&!t.done&&n<1,this.updateCurrentFile=this.toDisplayFileName(t.currentFile)},this.onUpdateFound=()=>{let e=this.registration;if(!e)return;this.syncUpdateState(e);let t=e.installing;if(!t)return;navigator.serviceWorker.controller&&(this.updateProgress=0,this.updateProgressVisible=!0,this.updateCurrentFile=``);let n=this.attachAbort?.signal;n&&t.addEventListener(`statechange`,()=>{if(t.state===`redundant`){this.updateProgress=0,this.updateProgressVisible=!1,this.updateCurrentFile=``;return}t.state===`installed`&&navigator.serviceWorker.controller&&this.syncUpdateState(e)},{signal:n})}}toDisplayFileName(e){if(!e)return``;let t=e.split(`?`)[0].split(`#`)[0],n=t.split(`/`).filter(Boolean).at(-1)??t;if(!n)return``;let r=decodeURIComponent(n);return r.length<=32?r:`${r.slice(0,29)}...`}connectedCallback(){super.connectedCallback(),`serviceWorker`in navigator&&(navigator.serviceWorker.addEventListener(`controllerchange`,this.onControllerChange),navigator.serviceWorker.addEventListener(`message`,this.onServiceWorkerMessage),this.findOrAttachRegistration())}disconnectedCallback(){super.disconnectedCallback(),navigator.serviceWorker.removeEventListener(`controllerchange`,this.onControllerChange),navigator.serviceWorker.removeEventListener(`message`,this.onServiceWorkerMessage),this.teardownAttachment()}async findOrAttachRegistration(){let e=await navigator.serviceWorker.getRegistration();if(e){this.attach(e);return}this.pollInterval=window.setInterval(async()=>{this.pollAttempts+=1;let e=await navigator.serviceWorker.getRegistration();if(e){this.clearPoll(),this.attach(e);return}this.pollAttempts>=30&&this.clearPoll()},1e3)}clearPoll(){this.pollInterval!==null&&(window.clearInterval(this.pollInterval),this.pollInterval=null)}teardownAttachment(){this.clearPoll(),this.periodicInterval!==null&&(window.clearInterval(this.periodicInterval),this.periodicInterval=null),this.attachAbort?.abort(),this.attachAbort=null,this.registration=null,this.updateAvailable=!1,this.updateProgress=0,this.updateProgressVisible=!1,this.updateCurrentFile=``}syncUpdateState(e){let t=!!e.waiting,n=!!navigator.serviceWorker.controller;this.updateAvailable=t&&n,this.updateAvailable&&(this.updateProgress=1,this.updateProgressVisible=!1,this.updateCurrentFile=``)}attach(e){if(this.registration===e)return;this.attachAbort?.abort(),this.attachAbort=new AbortController;let t=this.attachAbort.signal;this.registration=e,this.syncUpdateState(e),e.addEventListener(`updatefound`,this.onUpdateFound,{signal:t}),e.update().catch(()=>{}),this.periodicInterval=window.setInterval(()=>{e.update().catch(()=>{})},36e5),queueMicrotask(()=>{this.registration===e&&this.syncUpdateState(e)})}onActivateClick(){let e=this.registration?.waiting;if(e){this.pendingReload=!0,e.postMessage({type:`SKIP_WAITING`});return}window.location.reload()}render(){if(this.updateProgressVisible&&!this.updateAvailable){let e=Math.round(this.updateProgress*100);return u`
        <div
          style="display: inline-flex; align-items: center; gap: 0.5rem; min-width: 210px;"
          title="Downloading the latest update..."
          aria-label="Downloading the latest update"
        >
          <wa-progress-bar value=${e}></wa-progress-bar>
          <div style="display: inline-flex; flex-direction: column; gap: 0.1rem; max-width: 140px;">
            <span style="font-size: 0.75rem; opacity: 0.8;">${e}%</span>
            ${this.updateCurrentFile?u`<span
                  style="font-size: 0.7rem; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                  title=${this.updateCurrentFile}
                  >${this.updateCurrentFile}</span
                >`:u``}
          </div>
        </div>
      `}return this.updateAvailable?u`
      <wa-button
        variant="brand"
        title="A new version is available. Click to update."
        aria-label="Update available. Click to reload with the latest version."
        @click=${this.onActivateClick}
      >
        Update Available
      </wa-button>
    `:u``}};r([s()],d.prototype,`updateAvailable`,void 0),r([s()],d.prototype,`updateProgress`,void 0),r([s()],d.prototype,`updateProgressVisible`,void 0),r([s()],d.prototype,`updateCurrentFile`,void 0),d=r([l(`docks-sw-update-indicator`)],d);function f(){return window.matchMedia(`(display-mode: standalone)`).matches||window.matchMedia(`(display-mode: window-controls-overlay)`).matches||window.navigator.standalone===!0}var p=class extends o{constructor(...t){super(...t),this.showInstall=!1,this.deferredPrompt=null,this.onPromptAvailable=()=>{this.applyCapturedPrompt()},this.onAppInstalled=()=>{e(),this.deferredPrompt=null,this.showInstall=!1}}applyCapturedPrompt(){let e=t();e&&(this.deferredPrompt=e,this.showInstall=!0)}connectedCallback(){super.connectedCallback(),!f()&&(this.applyCapturedPrompt(),window.addEventListener(n,this.onPromptAvailable),window.addEventListener(`appinstalled`,this.onAppInstalled))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(n,this.onPromptAvailable),window.removeEventListener(`appinstalled`,this.onAppInstalled)}async onInstallClick(){let t=this.deferredPrompt;t&&(await t.prompt(),await t.userChoice.catch(()=>{}),e(),this.deferredPrompt=null,this.showInstall=!1)}render(){return this.showInstall?u`
      <wa-button
        appearance="plain"
        title="Install this app on your device"
        aria-label="Install app"
        @click=${()=>void this.onInstallClick()}
      >
        <wa-icon name="download" label=""></wa-icon>
      </wa-button>
    `:u``}};r([s()],p.prototype,`showInstall`,void 0),p=r([l(`docks-pwa-install`)],p),i.registerContribution(c,{name:`toolbar.swUpdate`,label:`App update`,slot:`end`,component:`<docks-sw-update-indicator></docks-sw-update-indicator>`}),i.registerContribution(a,{name:`toolbar.pwaInstall`,label:`Install app`,component:`<docks-pwa-install></docks-pwa-install>`});