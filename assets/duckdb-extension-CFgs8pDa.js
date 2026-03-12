import{A as k,v as y,c as $}from"./monaco-Ck3pLLYn.js";import{X as v,s as I,u as O,v as _,J as A,b as B,n as g,e as p,a as L,d as u,m as C,t as M}from"./vendor-3BPrCeYx.js";const o=k("DuckDBService"),F=A(),m="__memory__",h="duckdb-databases",P=/^[a-zA-Z][a-zA-Z0-9_]*$/,w=/^[a-zA-Z0-9_.-]+$/;function R(n){return`opfs://${h}/${n}.duckdb`}function j(n){return n==null?n:typeof n=="bigint"?Number(n):n instanceof Date?n.toISOString():typeof n=="object"&&n!==null&&typeof n.toJSON=="function"?n.toJSON():n}function z(n){const e=n.toArray?.(),t=Array.isArray(e)?e:[];if(t.length===0)return{columns:[],rows:[]};const s=Object.keys(t[0]),r=t.map(a=>s.map(i=>j(a[i])));return{columns:s,rows:r}}async function q(){await(await navigator.storage.getDirectory()).getDirectoryHandle(h,{create:!0})}async function N(n){const e=await v(F),t=URL.createObjectURL(new Blob([`importScripts("${e.mainWorker}");`],{type:"text/javascript"})),s=new Worker(t);URL.revokeObjectURL(t);const r=new O,a=new I(r,s);await a.instantiate(e.mainModule,e.pthreadWorker),n&&(await q(),await a.open({path:n,accessMode:_.READ_WRITE}),o.info(`DuckDB-WASM opened: ${n} (read-write)`));const i=await a.connect();return o.info("DuckDB-WASM initialized"),{db:a,conn:i,worker:s}}class T{constructor(e,t,s,r,a,i){this.name=e,this.db=t,this.conn=s,this.worker=r,this.onClose=a,this.onDeleteFromOPFS=i,this.key=e??m}async runQuery(e){const t=e.trim();if(!t)return{rows:[],columns:[]};try{const s=await this.conn.query(t);return z(s)}catch(s){const r=s instanceof Error?s.message:String(s);throw o.error(`Query failed: ${r}`),new Error(`Query failed: ${r}`)}}async enableExtension(e){if(!P.test(e))throw new Error(`Invalid extension name: ${e}`);const t=`INSTALL ${e}`,s=`LOAD ${e}`;try{await this.conn.query(t),await this.conn.query(s),o.info(`DuckDB extension enabled: ${e}`)}catch(r){const a=r instanceof Error?r.message:String(r);throw o.error(`Failed to enable extension ${e}: ${a}`),new Error(`Failed to enable extension ${e}: ${a}`)}}async close(){try{await this.conn.close()}catch(e){o.warn("Error closing DuckDB connection: "+(e instanceof Error?e.message:String(e)))}try{this.db.terminate()}catch(e){o.warn("Error terminating DuckDB: "+(e instanceof Error?e.message:String(e)))}this.onClose(this.key)}}class U{constructor(){this.databases=new Map}keyFor(e){return e===void 0||e===""?m:e}async open(e){const t=this.keyFor(e),s=this.databases.get(t);if(s)return s;if(t!==m&&!w.test(e))throw new Error(`Invalid database name: ${e}`);const r=e===void 0||e===""?null:e,a=r?R(r):null,{db:i,conn:D,worker:S}=await N(a),f=new T(r,i,D,S,b=>this.databases.delete(b),r?b=>this.removeOPFSDatabase(b):void 0);return this.databases.set(t,f),f}async listDatabases(){try{const t=await(await navigator.storage.getDirectory()).getDirectoryHandle(h,{create:!1}),s=[];for await(const[r,a]of t)a.kind==="file"&&r.endsWith(".duckdb")&&s.push(r.slice(0,-7));return s.sort()}catch(e){if(e instanceof Error&&e.name==="NotFoundError")return[];const t=e instanceof Error?e.message:String(e);return o.error(`listDatabases failed: ${t}`),[]}}async delete(e){if(!w.test(e))throw new Error(`Invalid database name: ${e}`);const t=this.databases.get(e);t&&await t.close(),await this.removeOPFSDatabase(e)}async removeOPFSDatabase(e){try{await(await(await navigator.storage.getDirectory()).getDirectoryHandle(h,{create:!1})).removeEntry(`${e}.duckdb`),o.info(`DuckDB removed: ${e}`)}catch(t){const s=t instanceof Error?t.message:String(t);throw o.error(`Failed to delete database ${e}: ${s}`),new Error(`Failed to delete database: ${s}`)}}}const d=new U;var W=Object.defineProperty,J=Object.getOwnPropertyDescriptor,l=(n,e,t,s)=>{for(var r=s>1?void 0:s?J(e,t):e,a=n.length-1,i;a>=0;a--)(i=n[a])&&(r=(s?i(e,t,r):i(r))||r);return s&&r&&W(e,t,r),r};const E=[{name:"json",description:"JSON file and functions"},{name:"parquet",description:"Parquet file support"},{name:"csv",description:"CSV file support"},{name:"httpfs",description:"HTTP(S) and S3 access"},{name:"fts",description:"Full-text search"},{name:"inet",description:"IP address types"},{name:"jemalloc",description:"Memory allocator"},{name:"substrait",description:"Substrait integration"}];let c=class extends L{constructor(){super(...arguments),this.open=!1,this.db=null,this.databaseLabel="In-memory",this.selectedExtensions=new Set,this.installing=!1,this.installError=null}configure(n){this.db=n.db,this.databaseLabel=n.databaseLabel,this.selectedExtensions=new Set,this.installError=null}show(){this.open=!0}hide(){this.open=!1}toggleExtension(n){const e=new Set(this.selectedExtensions);e.has(n)?e.delete(n):e.add(n),this.selectedExtensions=e,this.installError=null}async installSelected(){if(!this.db||this.selectedExtensions.size===0)return;this.installing=!0,this.installError=null;const n=[...this.selectedExtensions];try{for(const e of n)await this.db.enableExtension(e);this.selectedExtensions=new Set}catch(e){this.installError=e instanceof Error?e.message:String(e)}finally{this.installing=!1}}render(){const n=this.db!==null,e=n&&this.selectedExtensions.size>0&&!this.installing;return u`
      <wa-dialog
        label="DuckDB extensions"
        ?open=${this.open}
        @wa-after-hide=${()=>{this.open=!1,this.dispatchEvent(new CustomEvent("hide",{bubbles:!0,composed:!0}))}}
      >
        <div class="extension-manager">
          <p class="extension-manager-description">
            Database: <strong>${this.databaseLabel}</strong>. Select extensions to install.
          </p>

          ${n?"":u`
                <wa-alert variant="warning" open>
                  <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                  Open or create a database and run a query first so a connection exists.
                </wa-alert>
              `}

          ${this.installError?u`
                <wa-alert variant="danger" open closable @wa-after-hide=${()=>this.installError=null}>
                  <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
                  ${this.installError}
                </wa-alert>
              `:""}

          <div class="extension-list">
            <div class="extension-list-header">
              <strong>Available extensions</strong>
            </div>
            ${C(E,t=>t.name,t=>u`
                <div class="extension-item">
                  <wa-checkbox
                    ?checked=${this.selectedExtensions.has(t.name)}
                    ?disabled=${!n}
                    @wa-change=${()=>this.toggleExtension(t.name)}
                  >
                    <span class="extension-name">${t.name}</span>
                    <span class="extension-desc">${t.description}</span>
                  </wa-checkbox>
                </div>
              `)}
          </div>
        </div>
        <div slot="footer" class="extension-manager-footer">
          <wa-button
            variant="primary"
            ?disabled=${!e}
            @click=${()=>this.installSelected()}
          >
            ${this.installing?"Installing…":`Install selected (${this.selectedExtensions.size})`}
          </wa-button>
          <wa-button variant="default" @click=${()=>this.hide()}>
            Done
          </wa-button>
        </div>
      </wa-dialog>
    `}};c.styles=B`
    :host {
      display: contents;
    }

    .extension-manager {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .extension-manager-description {
      margin: 0;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .extension-list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      max-height: 360px;
      overflow-y: auto;
    }

    .extension-list-header {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--wa-color-neutral-200, #e5e7eb);
      margin-bottom: 0.25rem;
    }

    .extension-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
    }

    .extension-item wa-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }

    .extension-name {
      font-family: ui-monospace, monospace;
      font-size: 0.95rem;
      min-width: 6rem;
    }

    .extension-desc {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .extension-manager-footer {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }
  `;l([g({type:Boolean})],c.prototype,"open",2);l([g({attribute:!1})],c.prototype,"db",2);l([g()],c.prototype,"databaseLabel",2);l([p()],c.prototype,"selectedExtensions",2);l([p()],c.prototype,"installing",2);l([p()],c.prototype,"installError",2);c=l([M("lyra-duckdb-extension-manager")],c);class X{constructor(){this.managerInstance=null}showExtensionManager(e){return this.managerInstance||(this.managerInstance=document.createElement("lyra-duckdb-extension-manager"),document.body.appendChild(this.managerInstance)),this.managerInstance.configure(e),this.managerInstance.show(),this.managerInstance}getManager(){return this.managerInstance}}const x=new X;y.put("duckdbExtensionManagerService",x);class Q{constructor(){this.engineId="duckdb",this.current=null,this.currentId=null,this.extraActions=[{id:"duckdb.extensions",label:"DuckDB extensions",icon:"puzzle-piece",run:async()=>{const e=this.current,t=this.currentId??"In-memory";x.showExtensionManager({db:e,databaseLabel:t})}}]}get currentConnectionId(){return this.currentId}async listConnections(){const e=await d.listDatabases();return[{id:null,label:"In-memory",isDefault:!0},...e.map(s=>({id:s,label:s}))]}async selectConnection(e){if(this.current&&this.currentId===e)return;this.current&&(await this.current.close(),this.current=null);const t=e===null?await d.open():await d.open(e);this.current=t,this.currentId=t.name??null}async runQuery(e){if(this.current||await this.selectConnection(null),!this.current)return{columns:[],rows:[]};const t=await this.current.runQuery(e);return{columns:t.columns,rows:t.rows}}async createConnection(){return null}async deleteConnection(e){e&&(this.current&&this.current.name===e&&(await this.current.close(),this.current=null,this.currentId=null),await d.delete(e))}async listDbExtensions(){return E.map(e=>({id:e.name,label:e.name,description:e.description}))}async enableDbExtension(e){this.current&&await this.current.enableExtension(e)}async close(){this.current&&(await this.current.close(),this.current=null,this.currentId=null)}}const H={id:"duckdb",label:"DuckDB",icon:"database",loader:async()=>new Q};function G(){y.put("duckdbService",d),$.registerContribution("system.sqladapters",H)}export{G as default};
