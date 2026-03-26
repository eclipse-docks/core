import{d as e,h as t,l as n,n as r,u as i}from"./fs-access-BzDvih72-I3HNOLAJ.js";import{A as a,D as o,I as s,K as c,L as l,O as u,R as d,V as f,X as p,Y as m,ht as h,j as g,k as _,mt as v,n as y,s as b,ut as x,x as S}from"./dist-DG4qwUvd.js";import"./lit-Dr0iA5ch.js";var C=class extends x{constructor(...e){super(...e),this.open=!1,this.db=null,this.databaseLabel=``,this.extensions=[],this.loading=!1,this.updatingId=null,this.error=null,this.filterText=``}configure(e){this.db=e.db,this.databaseLabel=e.databaseLabel,this.extensions=[],this.error=null,this.refreshExtensions()}show(){!this.db||!this.db.listDbExtensions||(this.open=!0)}hide(){this.open=!1}async refreshExtensions(){if(!this.db||!this.db.listDbExtensions){this.extensions=[];return}this.loading=!0,this.error=null;try{let e=await o.runAsync(`Loading database extensions`,async()=>this.db.listDbExtensions());this.extensions=Array.isArray(e)?e:[]}catch(e){let t=e instanceof Error?e.message:String(e);this.error=t,m(t)}finally{this.loading=!1}}async enableExtension(e){if(!(!this.db||!this.db.enableDbExtension)){this.updatingId=e.id,this.error=null;try{await o.runAsync(`Enabling extension ${e.label||e.id}`,async()=>this.db.enableDbExtension(e.id)),await this.refreshExtensions()}catch(e){let t=e instanceof Error?e.message:String(e);this.error=t,m(t)}finally{this.updatingId=null}}}async disableExtension(e){if(!(!this.db||!this.db.disableDbExtension)){this.updatingId=e.id,this.error=null;try{await o.runAsync(`Disabling extension ${e.label||e.id}`,async()=>this.db.disableDbExtension(e.id)),await this.refreshExtensions()}catch(e){let t=e instanceof Error?e.message:String(e);this.error=t,m(t)}finally{this.updatingId=null}}}renderExtensionRow(e){let t=!!e.installed,n=t&&!!this.db?.disableDbExtension,r=this.updatingId===e.id;return v`
      <div class="extension-item">
        <div class="extension-main">
          <div class="extension-name">${e.label||e.id}</div>
          ${e.description?v`<div class="extension-desc">${e.description}</div>`:null}
        </div>
        <div class="extension-meta">
          <span
            class=${t?`badge badge-installed`:`badge badge-available`}
          >
            ${t?`Installed`:`Available`}
          </span>
          <div class="extension-actions">
            ${t?v`
                  <wa-button
                    size="small"
                    appearance="plain"
                    ?disabled=${!n||r}
                    @click=${()=>void this.disableExtension(e)}
                  >
                    <wa-icon
                      name="circle-minus"
                      label="Disable"
                    ></wa-icon>
                  </wa-button>
                `:v`
                  <wa-button
                    size="small"
                    appearance="plain"
                    ?disabled=${r}
                    @click=${()=>void this.enableExtension(e)}
                  >
                    <wa-icon
                      name="plug-circle-plus"
                      label="Enable"
                    ></wa-icon>
                  </wa-button>
                `}
          </div>
        </div>
      </div>
    `}render(){let e=!!(this.db&&this.db.listDbExtensions),t=this.filterText.trim().toLowerCase(),n=t?this.extensions.filter(e=>`${e.label??``} ${e.id} ${e.description??``}`.toLowerCase().includes(t)):this.extensions,r=n.length>0;return v`
      <wa-dialog
        label="Database extensions"
        ?open=${this.open}
        @wa-after-hide=${()=>{this.open=!1,this.dispatchEvent(new CustomEvent(`hide`,{bubbles:!0,composed:!0}))}}
      >
        <div class="extension-manager">
          <p class="extension-manager-description">
            Database:
            <strong>${this.databaseLabel||`Current connection`}</strong>
          </p>

          ${e?null:v`
                <wa-alert variant="warning" open>
                  <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                  The current SQL engine does not expose any extension information.
                </wa-alert>
              `}

          ${this.error?v`
                <wa-alert
                  variant="danger"
                  open
                  closable
                  @wa-after-hide=${()=>{this.error=null}}
                >
                  <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
                  ${this.error}
                </wa-alert>
              `:null}

          <wa-input
              size="small"
              placeholder="Filter extensions…"
              .value=${this.filterText}
              @input=${e=>{this.filterText=e.target?.value??``}}
              @wa-clear=${()=>{this.filterText=``}}
              with-clear
            >
              <wa-icon slot="prefix" name="magnifying-glass"></wa-icon>
            </wa-input>

          <div class="extension-list">
            ${this.loading?v`<div class="extension-list-empty">Loading extensions…</div>`:r?u(n,e=>e.id,e=>this.renderExtensionRow(e)):v`
                      <div class="extension-list-empty">
                        No extensions available for this connection.
                      </div>
                    `}
          </div>
        </div>
        <div slot="footer" class="extension-manager-footer">
          <wa-button variant="default" @click=${()=>this.hide()}>
            Close
          </wa-button>
        </div>
      </wa-dialog>
    `}static{this.styles=h`
    :host {
      display: contents;
    }

    .extension-manager {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      height: 420px;
      box-sizing: border-box;
    }

    .extension-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .extension-manager-description {
      margin: 0;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .extension-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
      min-height: 0;
      max-height: 100%;
      overflow-y: auto;
    }

    .extension-list-empty {
      font-size: 0.9rem;
      opacity: 0.8;
      padding: 0.5rem 0;
    }

    .extension-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }

    .extension-main {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;
    }

    .extension-name {
      font-weight: 500;
      font-size: 0.95rem;
    }

    .extension-desc {
      font-size: 0.85rem;
      opacity: 0.8;
    }

    .extension-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.35rem;
    }

    .extension-actions {
      display: flex;
      gap: 0.25rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.4rem;
      border-radius: 999px;
      font-size: 0.75rem;
      border: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }

    .badge-installed {
      background-color: var(--wa-color-success-50, #ecfdf3);
    }

    .badge-available {
      background-color: var(--wa-color-neutral-50, #f9fafb);
    }

    .extension-manager-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }
  `}};g([l({type:Boolean})],C.prototype,`open`,void 0),g([l({attribute:!1})],C.prototype,`db`,void 0),g([l()],C.prototype,`databaseLabel`,void 0),g([s()],C.prototype,`extensions`,void 0),g([s()],C.prototype,`loading`,void 0),g([s()],C.prototype,`updatingId`,void 0),g([s()],C.prototype,`error`,void 0),g([s()],C.prototype,`filterText`,void 0),C=g([d(`lyra-sql-extension-manager`)],C);var w=new class{constructor(){this.managerInstance=null}showExtensionManager(e){return!e.db||!e.db.listDbExtensions?(m(`The current SQL engine does not support extensions.`),null):(this.managerInstance||(this.managerInstance=document.createElement(`lyra-sql-extension-manager`),document.body.appendChild(this.managerInstance)),this.managerInstance.configure(e),this.managerInstance.show(),this.managerInstance)}getManager(){return this.managerInstance}};t.put(`sqlExtensionManagerService`,w);var T=28;function E(e){let t=e.replace(/\s+/g,` `).trim();return t.length<=T?t:`${t.slice(0,T)}…`}var D=class extends b{constructor(...e){super(...e),this.readOnly=!1,this.initialContent=void 0,this.initialUri=void 0,this.running=!1,this.availableAdapters=[],this.selectedEngineId=null,this.availableConnections=[],this.selectedConnectionId=null,this.widgetRef=_(),this.databases=new Map,this._onContentChange=()=>{this.markDirty(!0)}}async doInitUI(){let e=this.input.data;this.initialContent=await e.getContents(),this.initialUri=e.getWorkspacePath(),this.unsubscribeContributionsToken=i(f,e=>{e?.target===`system.sqladapters`&&this.refreshAdapters()}),await this.refreshAdapters(),this.requestUpdate()}async refreshAdapters(){let e=c.getContributions(`system.sqladapters`);if(this.availableAdapters=e,!e.length){this.selectedEngineId=null,this.availableConnections=[],this.selectedConnectionId=null,await this.updateComplete;return}this.selectedEngineId||=(e.find(e=>e.id===`duckdb`)??e[0]).id,this.requestUpdate(),await this.refreshConnections(),await this.updateComplete}async getOrLoadDatabase(e){let t=this.databases.get(e);if(t)return t;let n=this.availableAdapters.find(t=>t.id===e);if(!n)return null;try{let t=n.label||n.id,r=await o.runAsync(`Opening ${t} database`,async e=>(e.message=`Connecting to ${t}…`,n.loader()));return this.databases.set(e,r),r}catch(e){return m(e instanceof Error?e.message:String(e)),null}}async refreshConnections(){let e=this.selectedEngineId;if(!e){this.availableConnections=[],this.selectedConnectionId=null,await this.updateComplete;return}let t=await this.getOrLoadDatabase(e);if(!t){this.availableConnections=[],this.selectedConnectionId=null,await this.updateComplete;return}let n=await t.listConnections();this.availableConnections=n;let r=t.currentConnectionId;if(r!==null){this.selectedConnectionId=r,await this.updateComplete;return}let i=n.find(e=>e.isDefault)??n[0];this.selectedConnectionId=i?i.id:null,i&&await t.selectConnection(i.id??null),await this.updateComplete}async onEngineChange(e){let t=e.target?.value??``;this.selectedEngineId!==t&&(this.selectedEngineId=t||null,await this.refreshConnections(),this.requestUpdate())}async onConnectionChange(e){let t=e.target?.value??``,n=t===``?null:t;if(this.selectedConnectionId===n)return;this.selectedConnectionId=n;let r=this.selectedEngineId;if(!r)return;let i=await this.getOrLoadDatabase(r);i&&(await i.selectConnection(n),this.requestUpdate())}async onEngineDropdownSelect(e){let t=e.detail?.item?.value??``;this.selectedEngineId!==t&&(this.selectedEngineId=t||null,await this.refreshConnections(),this.requestUpdate())}async onConnectionDropdownSelect(e){let t=e.detail?.item?.value??``,n=t===``?null:t;if(this.selectedConnectionId===n)return;this.selectedConnectionId=n;let r=this.selectedEngineId;if(!r)return;let i=await this.getOrLoadDatabase(r);i&&(await i.selectConnection(n),this.requestUpdate())}async deleteConnectionById(e,t){e.stopPropagation(),e.preventDefault();let n=this.selectedEngineId;if(!n)return;let r=await this.getOrLoadDatabase(n);!r||!r.deleteConnection||await S(`Delete connection "${this.availableConnections.find(e=>e.id===t)?.label??(t===null?`In-memory`:t??`Current connection`)}"?`)&&(t===null?await r.selectConnection(null):await r.deleteConnection(t),await this.refreshConnections(),this.requestUpdate())}save(){let e=this.widgetRef.value?.getContent()??``;this.input?.data.saveContents(e),this.markDirty(!1)}async doClose(){this.unsubscribeContributionsToken&&=(e(this.unsubscribeContributionsToken),void 0),this.widgetRef.value?.dispose();for(let e of this.databases.values())await e.close();this.databases.clear()}getLanguage(){return`sql`}isLanguage(e){return e.toLowerCase()===`sql`}getContent(){return this.widgetRef.value?.getContent()??null}getSelection(){return this.widgetRef.value?.getSelection()??null}getSnippet(e=5){return this.widgetRef.value?.getSnippet(e)??null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}async runQuery(e=!1){let t=this.getSelection()?.trim(),r=this.getContent()?.trim(),i=e?t:r;if(!i){m(e?`No selection to run`:`No SQL to run`);return}if(this.running)return;let a=this.selectedEngineId;if(!a){m(`No SQL engine available`);return}let o=await this.getOrLoadDatabase(a);if(!o){m(`Could not initialize SQL engine`);return}if(!this.selectedConnectionId&&this.availableConnections.length){let e=this.availableConnections.find(e=>e.isDefault)??this.availableConnections[0];this.selectedConnectionId=e.id,await o.selectConnection(e.id??null)}this.running=!0;let s=E(i);this.requestUpdate();let c=window.setTimeout(()=>this.clearRunningState(),6e4);try{let e=await o.runQuery(i),t=this.availableAdapters.find(e=>e.id===a);n(`dataview/publish`,{title:s,data:{columns:e.columns,rows:e.rows},source:t?.label??a})}catch(e){m(e instanceof Error?e.message:String(e))}finally{window.clearTimeout(c),this.running=!1,this.requestUpdate()}}clearRunningState(){this.running&&(this.running=!1,this.requestUpdate())}async createConnection(){let e=this.selectedEngineId;if(!e)return;let t=await this.getOrLoadDatabase(e);if(!t||!t.createConnection)return;let n=await t.createConnection();n&&(await this.refreshConnections(),this.selectedConnectionId=n.id,await t.selectConnection(n.id??null),p(`Connection "${n.label}" created`),this.requestUpdate())}async deleteConnection(){let e=this.selectedEngineId;if(!e)return;let t=await this.getOrLoadDatabase(e);if(!t||!t.deleteConnection)return;let n=this.selectedConnectionId;await S(`Delete connection "${this.availableConnections.find(e=>e.id===n)?.label??(n===null?`In-memory`:n??`Current connection`)}"?`)&&(n===null?await t.selectConnection(null):await t.deleteConnection(n),await this.refreshConnections(),this.requestUpdate())}getCurrentConnectionLabel(){let e=this.selectedConnectionId;return e===null?`In-memory`:e?this.availableConnections.find(t=>t.id===e)?.label??e:null}async openExtensionManager(){let e=this.selectedEngineId;if(!e)return;let t=await this.getOrLoadDatabase(e);if(!t||!t.listDbExtensions){p(`Extensions are not available for the selected SQL engine.`);return}let n=(this.availableAdapters.find(t=>t.id===e)??null)?.label??e,r=this.getCurrentConnectionLabel(),i=r?`${n} – ${r}`:n;w.showExtensionManager({db:t,databaseLabel:i})}renderToolbar(){let e=this.availableAdapters,t=e.length>0,n=this.availableConnections.length>0,r=this.selectedEngineId,i=!!(r?this.databases.get(r):null)?.listDbExtensions;return v`
      <wa-dropdown
        class="engine-select"
        placement="bottom-start"
        distance="4"
        size="small"
        @wa-select=${e=>void this.onEngineDropdownSelect(e)}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="small"
          with-caret
          title="SQL engine"
        >
          ${this.selectedEngineId?e.find(e=>e.id===this.selectedEngineId)?.label??this.selectedEngineId:`Select engine`}
        </wa-button>
        ${e.map(e=>v`
            <wa-dropdown-item
              value=${e.id}
              type="checkbox"
              ?checked=${e.id===this.selectedEngineId}
            >
              ${e.label}
            </wa-dropdown-item>
          `)}
      </wa-dropdown>
      <wa-dropdown
        class="connection-select"
        placement="bottom-start"
        distance="4"
        size="small"
        @wa-select=${e=>void this.onConnectionDropdownSelect(e)}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="small"
          with-caret
          title="Connection"
          ?disabled=${!t||!n}
        >
          ${this.selectedConnectionId===null?`In-memory`:this.availableConnections.find(e=>e.id===this.selectedConnectionId)?.label??`Select connection`}
        </wa-button>
        ${this.availableConnections.map(e=>v`
            <wa-dropdown-item
              value=${e.id??``}
              type="checkbox"
              ?checked=${e.id===this.selectedConnectionId}
            >
              ${e.label}
              <wa-button
                slot="details"
                appearance="plain"
                size="small"
                title=${e.id===null?`Reset in-memory connection`:`Delete connection`}
                @click=${t=>this.deleteConnectionById(t,e.id)}
              >
                <wa-icon
                  name=${e.id===null?`rotate-right`:`trash`}
                  label=${e.id===null?`Reset`:`Delete`}
                ></wa-icon>
              </wa-button>
            </wa-dropdown-item>
          `)}
      </wa-dropdown>
      <wa-button
        size="small"
        appearance="plain"
        title="New connection"
        @click=${()=>void this.createConnection()}
      >
        <wa-icon name="plus" label="New"></wa-icon>
      </wa-button>
      ${i?v`
            <wa-button
              size="small"
              appearance="plain"
              title="Manage extensions"
              ?disabled=${!t||!n}
              @click=${()=>void this.openExtensionManager()}
            >
              <wa-icon name="puzzle-piece" label="Extensions"></wa-icon>
              Extensions
            </wa-button>
          `:null}
      <wa-button
        size="small"
        appearance="plain"
        ?disabled=${this.running}
        @click=${()=>void this.runQuery(!0)}
        title="Run selection only"
      >
        <wa-icon name="i-cursor" label="Run selection"></wa-icon>
        ${this.running?`Running…`:`Run selection`}
      </wa-button>
      <wa-button
        size="small"
        appearance="plain"
        ?disabled=${this.running}
        @click=${()=>void this.runQuery(!1)}
        title="Run all SQL"
      >
        <wa-icon name="play" label="Run"></wa-icon>
        ${this.running?`Running…`:`Run all`}
      </wa-button>
    `}renderContent(){return this.initialContent===void 0?v`<div class="editor-placeholder"></div>`:v`
      <div class="editor-area">
        <lyra-monaco-widget
          .value=${this.initialContent}
          .uri=${this.initialUri}
          .language=${`sql`}
          .readOnly=${this.readOnly}
          @content-change=${this._onContentChange}
          ${a(this.widgetRef)}
        ></lyra-monaco-widget>
      </div>
    `}static{this.styles=h`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .engine-select {
      max-width: 10rem;
    }
    .connection-select {
      max-width: 12rem;
    }
    .editor-area {
      flex: 1;
      min-height: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .editor-area lyra-monaco-widget,
    .editor-area monaco-widget {
      flex: 1;
      min-height: 0;
    }
    .editor-placeholder {
      flex: 1;
      min-height: 0;
    }
  `}};g([l({attribute:!1})],D.prototype,`input`,void 0),g([l({type:Boolean})],D.prototype,`readOnly`,void 0),g([s()],D.prototype,`initialContent`,void 0),g([s()],D.prototype,`initialUri`,void 0),g([s()],D.prototype,`running`,void 0),g([s()],D.prototype,`availableAdapters`,void 0),g([s()],D.prototype,`selectedEngineId`,void 0),g([s()],D.prototype,`availableConnections`,void 0),g([s()],D.prototype,`selectedConnectionId`,void 0),D=g([d(`lyra-sql-editor`)],D);function O(){y.registerEditorInputHandler({editorId:`system.sqleditor`,label:`SQL Editor`,icon:`database`,canHandle:e=>e instanceof r&&e.getName().toLowerCase().endsWith(`.sql`),ranking:900,handle:async e=>{let t={title:e.getWorkspacePath(),data:e,key:e.getWorkspacePath(),icon:`database`,state:{},component:()=>null};return t.component=e=>v`<lyra-sql-editor id="${e}" .input=${t}></lyra-sql-editor>`,t}})}export{O as default};