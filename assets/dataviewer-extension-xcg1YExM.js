import{b as A,n as L,e as p,d as o,l as S,t as V,P as $}from"./vendor-3BPrCeYx.js";import{s as D,z as d,x as T,L as P,t as v,v as _,c as E,P as K,j as b,F as I}from"./monaco-Ck3pLLYn.js";function O(){return crypto.randomUUID()}const j="dataview/publish",f="dataview/added",g="dataview/",u=g+"index";class x{init(){this.subscriptionToken===void 0&&(this.subscriptionToken=D(j,t=>{this.handlePublish(t)}))}async handlePublish(t){const a=O(),s=Date.now(),i={id:t.id??a,title:t.title,data:t.data,source:t.source,createdAt:s};await d.persistObject(g+a,i);const r=await d.getObject(u),l=Array.isArray(r)?r:[];l.push({storageKey:a,title:t.title,source:t.source,createdAt:s}),await d.persistObject(u,l),T(f,{storageKey:a,title:t.title,createdAt:s})}async listViews(){const t=await d.getObject(u);return!Array.isArray(t)||t.length===0?[]:typeof t[0]=="string"?t.map(s=>({storageKey:s,title:s,createdAt:0})):[...t].sort((s,i)=>s.createdAt-i.createdAt)}async getView(t){return await d.getObject(g+t)??null}async deleteView(t){const a=await d.getObject(u),s=Array.isArray(a)?a.filter(i=>i.storageKey!==t):[];await d.persistObject(u,s),await d.persistObject(g+t,null)}}const w=new x;var C=Object.defineProperty,k=Object.getOwnPropertyDescriptor,h=(e,t,a,s)=>{for(var i=s>1?void 0:s?k(t,a):t,r=e.length-1,l;r>=0;r--)(l=e[r])&&(i=(s?l(t,a,i):l(i))||i);return s&&i&&C(t,a,i),i};let c=class extends P{constructor(){super(...arguments),this.dataview=null,this.persistedList=[],this.selectedStorageKey="",this.selectedView=null,this.loadingList=!0,this.autoActivateTab=!0}get displayed(){return this.selectedView??this.dataview}async doInitUI(){const e=await this.getDialogSetting();e&&typeof e.autoActivateTab=="boolean"&&(this.autoActivateTab=e.autoActivateTab),this.subscribe(f,async()=>{await this.refreshPersistedList(!0),this.autoActivateTab&&this.activateContainingTab()}),await this.refreshPersistedList(!1)}async refreshPersistedList(e){this.loadingList=!0,this.requestUpdate();try{if(this.persistedList=await w.listViews(),e&&this.persistedList.length>0){const t=this.persistedList[this.persistedList.length-1];this.selectedStorageKey=t.storageKey,this.selectedView=await w.getView(t.storageKey)}else this.selectedStorageKey?this.selectedView=await w.getView(this.selectedStorageKey):this.selectedView=null}catch(t){v(t instanceof Error?t.message:String(t)),this.persistedList=[],this.selectedView=null}finally{this.loadingList=!1,this.requestUpdate(),this.updateToolbar()}}async selectStorageKey(e){if(this.selectedStorageKey=e,!e){this.selectedView=null,this.requestUpdate(),this.updateToolbar();return}try{this.selectedView=await w.getView(e)}catch(t){v(t instanceof Error?t.message:String(t)),this.selectedView=null}this.requestUpdate(),this.updateToolbar()}async onAutoActivateChange(e){const t=e.target.checked;this.autoActivateTab=t;const a=await this.getDialogSetting()??{};await this.setDialogSetting({...a,autoActivateTab:t}),this.updateToolbar()}async onHistorySelect(e){const t=e.detail?.item?.value??"";!t||t==="__stats__"||await this.selectStorageKey(t)}async onDeleteView(e,t){e.stopPropagation(),e.preventDefault();try{await w.deleteView(t),this.selectedStorageKey===t&&(this.selectedStorageKey="",this.selectedView=null),await this.refreshPersistedList(!0)}catch(a){v(a instanceof Error?a.message:String(a))}}renderToolbar(){const e=this.selectedView??this.dataview,t=this.persistedList.find(n=>n.storageKey===this.selectedStorageKey),a=t?.title??e?.title??(this.persistedList.length>0?"Latest data view":"No data"),s=t?.createdAt??e?.createdAt?new Date(t?.createdAt??e?.createdAt).toLocaleString():null,i=e?.source??null,r=i?`${a} · ${i}`:a,l=s?`${r} (${s})`:r;return o`
        <wa-dropdown
          placement="bottom-start"
          distance="4"
          size="small"
          hoist
          @wa-select=${n=>this.onHistorySelect(n)}
        >
          <wa-button
            slot="trigger"
            appearance="plain"
            size="small"
            with-caret
            title="Data view history"
          >
            <wa-icon name="clock-rotate-left" label="History"></wa-icon>
          </wa-button>

          <wa-dropdown-item value="__stats__" disabled>
            ${this.persistedList.length} data view${this.persistedList.length===1?"":"s"}
          </wa-dropdown-item>

          ${this.persistedList.map(n=>o`
              <wa-dropdown-item value=${n.storageKey}>
                ${n.source?`${n.title} · ${n.source}`:n.title}
                ${n.createdAt?o`<span style="opacity: 0.7; margin-left: 0.5rem; font-size: 0.75em;">
                      (${new Date(n.createdAt).toLocaleString()})
                    </span>`:null}
                <wa-button
                  slot="details"
                  appearance="plain"
                  size="small"
                  title="Delete data view"
                  @click=${m=>this.onDeleteView(m,n.storageKey)}
                >
                  <wa-icon name="trash" label="Delete"></wa-icon>
                </wa-button>
              </wa-dropdown-item>
            `)}
        </wa-dropdown>

        <wa-divider orientation="vertical"></wa-divider>

        <wa-switch
          ?checked=${this.autoActivateTab}
          size="small"
          title="Switch to this tab when new results arrive"
          @change=${n=>this.onAutoActivateChange(n)}
          style="margin-top: 0.5rem;"
        >
          Auto-show
        </wa-switch>

        ${S(e,()=>o`<wa-divider orientation="vertical"></wa-divider><span>${l}</span>`)}
    `}renderTable(e){const{columns:t,rows:a}=e.data;return t.length===0&&a.length===0?o`<div class="result-empty">No data.</div>`:o`
      <div class="result-table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              ${t.map(s=>o`<th>${s}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${a.map(s=>o`
                <tr>
                  ${s.map(i=>o`<td>${String(i??"")}</td>`)}
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}render(){const e=this.displayed;return e!=null?this.renderTable(e):o`<div class="result-empty">No data.</div>`}};c.styles=A`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .result-empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
  `;h([L({attribute:!1})],c.prototype,"dataview",2);h([p()],c.prototype,"persistedList",2);h([p()],c.prototype,"selectedStorageKey",2);h([p()],c.prototype,"selectedView",2);h([p()],c.prototype,"loadingList",2);h([p()],c.prototype,"autoActivateTab",2);c=h([V("lyra-dataview")],c);function W(e){const t=$.parse(e,{header:!0,skipEmptyLines:!0}),a=t.meta.fields??[],s=t.data.map(i=>a.map(r=>i[r]));return{columns:a,rows:s}}const y=".dataview/";w.init();_.put("dataviewerService",w);E.registerContribution(K,{name:"view.dataviewer",label:"Data Views",icon:"table",component:e=>o`<lyra-dataview id="${e}"></lyra-dataview>`});b.registerEditorInputHandler({editorId:"system.dataviewer",label:"Data View",icon:"table",ranking:900,canHandle:e=>typeof e?.key=="string"&&e.key.startsWith(y),handle:async e=>{const t=e.data?.storageKey??e.key?.replace(y,""),a=await w.getView(t);if(!a)return Promise.reject(new Error("Data view not found"));const s=a.title||`Data: ${a.id}`;return{key:e.key,title:s,data:a,icon:"table",noOverflow:!1,state:{},component:()=>o`<lyra-dataview .dataview=${a}></lyra-dataview>`}}});b.registerEditorInputHandler({editorId:"system.dataviewer-table",label:"Table",icon:"table",ranking:800,canHandle:e=>{if(!(e instanceof I))return!1;const t=e.getName().toLowerCase();return t.endsWith(".csv")||t.endsWith(".tsv")},handle:async e=>{const t=e.getName(),a=await e.getContents(),{columns:s,rows:i}=W(a??""),r={title:t,data:{columns:s,rows:i}};return{title:t,data:r,key:t,icon:"table",noOverflow:!1,state:{},component:()=>o`<lyra-dataview .dataview=${r}></lyra-dataview>`}}});function N(){}export{N as default};
