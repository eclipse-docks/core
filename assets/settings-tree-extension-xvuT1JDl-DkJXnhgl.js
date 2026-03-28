import{d as e}from"./fs-access-DHrXww7b-DkktKkYZ.js";import{A as t,E as n,G as r,I as i,K as a,L as o,O as s,R as c,_ as l,b as u,ht as d,j as f,k as p,mt as m,n as h,s as g,v as _}from"./dist-D9JGqkI-.js";var v,y=class extends g{static{v=this}constructor(...e){super(...e),this.settings={},this.categoryTree=[],this.selectedPath=null,this.detailRows=[],this.detailTitle=``,this.searchQuery=``,this.detailForPath=null,this.treeRef=p()}async doInitUI(){await this.loadSettings(),e(_,()=>this.loadSettings())}async loadSettings(){this.isDirty()||(this.settings=await u.getAll()??{},this.buildCategoryTree(),this.selectedPath&&this.updateDetailForPath(this.selectedPath))}buildCategoryTree(){let e=u.getCategories(),t=new Set(e.map(e=>e.id)),n=[];for(let t of e){let e=t.schema?.properties,r=this.settings[t.id],i=this.buildChildNodes(`${t.id}`,e,r),a=t.schema?.title??t.label;this.matchesSearch(a,t.id)&&n.push({path:t.id,label:a,children:i,expanded:!0})}for(let e of Object.keys(this.settings)){if(t.has(e))continue;let r=this.settings[e],i=this.buildChildNodes(e,void 0,r);this.matchesSearch(e,e)&&n.push({path:e,label:e,children:i,expanded:!0})}this.categoryTree=n}buildChildNodes(e,t,n){let r=[];if(t)for(let[i,a]of Object.entries(t)){let t=`${e}.${i}`,o=a?.title??i,s=v.isRecord(n)?n[i]:void 0,c=this.buildChildNodes(t,a?.properties,s);this.matchesSearch(o,t)&&r.push({path:t,label:o,children:c,expanded:!1})}if(v.isRecord(n)&&!t)for(let[t,i]of Object.entries(n)){let n=`${e}.${t}`,a=this.buildChildNodes(n,void 0,i);this.matchesSearch(t,n)&&r.push({path:n,label:t,children:a,expanded:!1})}return r}matchesSearch(e,t){if(!this.searchQuery.trim())return!0;let n=this.searchQuery.toLowerCase();return e.toLowerCase().includes(n)||t.toLowerCase().includes(n)}static isRecord(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}refreshAfterEdit(){this.markDirty(!0),this.selectedPath&&this.updateDetailForPath(this.selectedPath)}getValueAtPath(e){let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.settings;let n=this.settings;for(let e of t){if(typeof n!=`object`||!n)return;n=n[e]}return n}setAtInMemory(e,t){let n=e.split(`.`).filter(Boolean);n.length!==0&&(this.settings=this.deepSet(this.settings,n,t))}deepSet(e,t,n){if(t.length===1){let r=t[0];if(Array.isArray(e)){let t=parseInt(r,10);if(isNaN(t)||t<0)return e;let i=[...e];return i[t]=n,i}return{...e,[r]:n}}let[r,...i]=t;if(Array.isArray(e)){let t=parseInt(r,10);if(isNaN(t)||t<0)return e;let a=[...e],o=a[t],s=typeof o==`object`&&o?o:{};return a[t]=this.deepSet(s,i,n),a}let a=e,o=a[r],s=typeof o==`object`&&o?o:{};return{...a,[r]:this.deepSet(s,i,n)}}getArrayItemLabel(e,t){if(v.isRecord(e)){if(typeof e.id==`string`)return e.id;if(typeof e.name==`string`)return e.name}return`Item ${t}`}async updateDetailForPath(e){let t=u.getSchemaForSettingKey(e),n=this.getValueAtPath(e),r=v.isRecord(n)?n:null,i=Array.isArray(n),a;if(i){let t=n,r=[];t.forEach((t,n)=>{let i=`${e}.${n}`,a=this.getArrayItemLabel(t,n);v.isRecord(t)?Object.keys(t).forEach(e=>{r.push({key:e,path:`${i}.${e}`,title:e,description:``,schema:void 0,value:t[e],parentPath:i,groupLabel:a})}):r.push({key:String(n),path:i,title:a,description:`Array element ${n}.`,schema:void 0,value:t,parentPath:e,groupLabel:a})}),a=r}else if(r!==null){let n=t?.properties;a=Object.keys(n||r).map(t=>{let i=`${e}.${t}`,a=n?.[t],o=r[t];return{key:t,path:i,title:a?.title??t,description:a?.description??``,schema:a,value:o,parentPath:e}})}else if(n!=null&&typeof n!=`object`){let t=e.split(`.`).pop()??e;a=[{key:t,path:e,title:t,description:`Edit value (no schema).`,schema:void 0,value:n}]}else a=[];if(a.forEach(e=>{e.title===void 0&&(e.title=e.key)}),this.selectedPath!==e)return;let o=u.getCategories().find(t=>t.id===e);this.detailForPath=e,this.detailTitle=o?.label??t?.title??e,this.detailRows=a}selectPath(e){this.selectedPath=e,this.updateDetailForPath(e)}updated(e){super.updated?.(e),e.has(`selectedPath`)&&this.selectedPath!==this.detailForPath&&(this.selectedPath?this.updateDetailForPath(this.selectedPath):(this.detailForPath=null,this.detailRows=[],this.detailTitle=``))}setRowValue(e,t){this.setAtInMemory(e.path,t),this.refreshAfterEdit()}setRowValueFromJson(e,t){try{this.setRowValue(e,JSON.parse(t))}catch{this.refreshAfterEdit()}}renameKey(e,t,n){if(n.trim()===``||n===t)return;let r=this.getValueAtPath(e);if(!v.isRecord(r))return;let i=r[t],a={...r};delete a[t],a[n.trim()]=i,this.setAtInMemory(e,a),this.refreshAfterEdit()}deleteKey(e,t){let n=this.getValueAtPath(e);if(!v.isRecord(n))return;let r={...n};delete r[t],this.setAtInMemory(e,r),this.refreshAfterEdit()}async addKeyToGroup(e){let t=await n(`New key name:`,``);t?.trim()&&(this.setAtInMemory(`${e}.${t.trim()}`,null),this.refreshAfterEdit())}deleteTopLevelKey(e){if(!(e in this.settings))return;let t={...this.settings};delete t[e],this.settings=t,this.markDirty(!0),this.selectedPath===e&&(this.selectedPath=null,this.detailForPath=null,this.detailRows=[],this.detailTitle=``),this.buildCategoryTree(),this.selectedPath&&this.updateDetailForPath(this.selectedPath)}renderDetailControl(e){let t=e.schema,n=t?.type,r=t?.enum,i=e.value;if(r&&Array.isArray(r)&&r.length>0){let n=r.map(e=>String(e));return m`
                <wa-select
                    value=${i==null?t?.default===void 0?n[0]:String(t.default):String(i)}
                    @change=${t=>this.setRowValue(e,t.target.value)}
                    size="small">
                    ${n.map(e=>m`<wa-option value=${e}>${e}</wa-option>`)}
                </wa-select>
            `}if(n===`boolean`)return m`
                <wa-switch
                    ?checked=${i===!0||i===void 0&&t?.default===!0}
                    @change=${t=>this.setRowValue(e,t.target.checked)}
                    size="small">
                </wa-switch>
            `;if(n===`number`){let n=typeof i==`number`?i:typeof t?.default==`number`?t.default:0;return m`
                <wa-number-input
                    .value=${String(n)}
                    @change=${t=>this.setRowValue(e,Number(t.target.value))}
                    size="small">
                </wa-number-input>
            `}let a=typeof i==`object`&&!!i;return a&&!t&&v.isRecord(i)?this.renderObjectFields(e.path,i,0):a?m`
                <wa-textarea
                    .value=${JSON.stringify(i,null,2)}
                    @blur=${t=>this.setRowValueFromJson(e,t.target.value)}
                    rows="3">
                </wa-textarea>
            `:this.renderPrimitiveControl(e,i)}renderPrimitiveControl(e,t){return typeof t==`boolean`?m`
                <wa-switch
                    ?checked=${t}
                    @change=${t=>this.setRowValue(e,t.target.checked)}
                    size="small">
                </wa-switch>
            `:typeof t==`number`?m`
                <wa-number-input
                    .value=${String(t)}
                    @change=${t=>this.setRowValue(e,Number(t.target.value))}
                    size="small">
                </wa-number-input>
            `:m`
                <wa-input
                .value=${t==null?``:String(t)}
                @input=${t=>this.setRowValue(e,t.target.value)}
                size="small">
            </wa-input>
        `}renderObjectFields(e,t,n){if(n>=2){let n=JSON.stringify(t,null,2),r={key:``,path:e,title:``,description:``,value:t};return m`
                <wa-textarea
                    .value=${n}
                    @blur=${e=>this.setRowValueFromJson(r,e.target.value)}
                    rows="3">
                </wa-textarea>
            `}return m`
            <div class="nested-object" >
                ${Object.entries(t).map(([t,r])=>{let i=`${e}.${t}`,a={key:t,path:i,title:t,description:``,value:r,parentPath:e};return m`
                        <div class="nested-row">
                            <wa-input
                                .value=${t}
                                size="small"
                                style="width: 140px;"
                                @blur=${n=>{let r=n.target.value.trim();r&&r!==t&&this.renameKey(e,t,r)}}>
                            </wa-input>
                            <span class="nested-sep">:</span>
                            ${v.isRecord(r)?this.renderObjectFields(i,r,n+1):Array.isArray(r)?m`
                                        <wa-textarea
                                            .value=${JSON.stringify(r,null,2)}
                                            rows="2"
                                            style="min-width: 200px;"
                                            @blur=${e=>this.setRowValueFromJson(a,e.target.value)}>
                                        </wa-textarea>
                                    `:this.renderPrimitiveControl(a,r)}
                        </div>
                    `})}
            </div>
        `}renderDetailPanel(){if(!this.selectedPath)return m`
                <div class="detail-placeholder">
                    <wa-icon name="gear"></wa-icon>
                    <p>Select a category from the tree</p>
                </div>
            `;if(this.detailForPath!==this.selectedPath)return m`
                <div class="detail-panel">
                    <div class="detail-heading-row">
                        <h2 class="detail-heading">${this.selectedPath}</h2>
                    </div>
                    <div class="detail-placeholder">
                        <p>Loading…</p>
                    </div>
                </div>
            `;let e=this.detailRows.filter(e=>{if(!this.searchQuery.trim())return!0;let t=this.searchQuery.toLowerCase();return e.title.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)}),t=this.selectedPath?this.getValueAtPath(this.selectedPath):void 0,n=v.isRecord(t),r=this.selectedPath!==null&&!this.selectedPath.includes(`.`),i=n||r;return m`
            <div class="detail-panel">
                <div class="detail-heading-row">
                    <h2 class="detail-heading">${this.detailTitle}</h2>
                    ${i?m`
                        <lyra-command size="small" icon="plus" title="Add setting" .action=${()=>this.addKeyToGroup(this.selectedPath)}>Add</lyra-command>
                    `:``}
                    ${r?m`
                        <lyra-command size="small" icon="trash" title="Delete category" .action=${()=>this.deleteTopLevelKey(this.selectedPath)}></lyra-command>
                    `:``}
                </div>
                <wa-scroller class="detail-scroller" orientation="vertical">
                    ${e.length===0?m`
                        <div class="detail-empty">
                            ${this.detailRows.length===0?m`<p>No settings in this category. Add keys in the JSON file or register a JSON Schema for this path.</p>`:m`<p>No matching settings for the current search.</p>`}
                        </div>
                    `:s(e,e=>e.path,(t,n)=>{let r=n>0?e[n-1]:null,i=t.groupLabel&&r?.groupLabel!==t.groupLabel,a=!!t.groupLabel;return m`
                                    ${i?m`
                                        <div class="detail-group-header">
                                            <span>${t.groupLabel}</span>
                                            <lyra-command size="small" icon="plus" title="Add setting" .action=${()=>this.addKeyToGroup(t.parentPath)}>Add</lyra-command>
                                        </div>
                                    `:``}
                                    <div class="setting-row ${a?`setting-row-in-group`:``}">
                                        <div class="setting-meta">
                                            ${t.parentPath==null?m`<span class="setting-title">${t.title}</span>`:m`
                                                <wa-input
                                                    .value=${t.key}
                                                    size="small"
                                                    class="editable-key setting-control-key"
                                                    @blur=${e=>{let n=e.target.value.trim();n&&n!==t.key&&this.renameKey(t.parentPath,t.key,n)}}>
                                                </wa-input>
                                            `}
                                            ${t.description?m`<p class="setting-description">${t.description}</p>`:``}
                                        </div>
                                        <div class="setting-control">${this.renderDetailControl(t)}</div>
                                        ${t.parentPath==null?``:m`
                                            <lyra-command size="small" icon="trash" title="Delete setting" .action=${()=>this.deleteKey(t.parentPath,t.key)}></lyra-command>
                                        `}
                                    </div>
                                `})}
                </wa-scroller>
            </div>
        `}renderCategoryNode(e){let t=e.children.length>0,n=this.selectedPath===e.path;return m`
            <wa-tree-item ?expanded=${e.expanded}>
                <div
                    class="tree-node-content ${n?`selected`:``}"
                    @click=${()=>this.selectPath(e.path)}
                    role="button"
                    tabindex="0"
                    @keydown=${t=>t.key===`Enter`&&this.selectPath(e.path)}>
                    <span class="tree-node-label">${e.label}</span>
                </div>
                ${t?e.children.map(e=>this.renderCategoryNode(e)):``}
            </wa-tree-item>
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e}),this.categoryTree=this.categoryTree.map(t=>this.setExpanded(t,e)),this.requestUpdate()}setExpanded(e,t){return{...e,expanded:t,children:e.children.map(e=>this.setExpanded(e,t))}}async addKey(){let e=await n(`Enter new top-level key name:`,``);e?.trim()&&(this.setAtInMemory(e.trim(),null),this.markDirty(!0),this.buildCategoryTree())}save(){u.setAll(this.settings).then(()=>{this.markDirty(!1)}).catch(e=>{console.error(`Failed to save settings:`,e)})}renderToolbar(){return m`
            <wa-input
                placeholder="Search settings"
                .value=${this.searchQuery}
                @input=${e=>{this.searchQuery=e.target.value,this.buildCategoryTree()}}
                size="small"
                class="toolbar-search">
            </wa-input>
            <lyra-command size="small" icon="plus" title="Add Key" .action=${()=>this.addKey()}>Add Key</lyra-command>
            <lyra-command size="small" icon="chevron-down" title="Expand All" .action=${()=>this.setAllExpanded(!0)}>Expand All</lyra-command>
            <lyra-command size="small" icon="chevron-right" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}>Collapse All</lyra-command>
        `}renderContent(){return m`
            <div class="settings-editor-container">
                <wa-split-panel position="25" class="split-panel-fill">
                    <div slot="start" class="left-panel">
                        <wa-scroller class="tree-scroller" orientation="vertical">
                            ${this.categoryTree.length===0?m`
                                <div class="empty-state">
                                    <wa-icon name="gear"></wa-icon>
                                    <p>No settings.</p>
                                </div>
                            `:m`
                                <wa-tree ${t(this.treeRef)}>
                                    ${this.categoryTree.map(e=>this.renderCategoryNode(e))}
                                </wa-tree>
                            `}
                        </wa-scroller>
                    </div>
                    <div slot="end" class="right-panel">
                        ${this.renderDetailPanel()}
                    </div>
                </wa-split-panel>
            </div>
        `}static{this.styles=d`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .settings-editor-container {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .left-panel, .right-panel {
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .tree-scroller, .detail-scroller {
            flex: 1;
            min-height: 0;
        }

        .tree-node-content {
            cursor: pointer;
            user-select: none;
        }

        .tree-node-content.selected {
            font-weight: 600;
        }

        .detail-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: 32px;
        }

        .detail-panel {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .detail-heading-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            padding: 0 16px;
        }

        .detail-heading {
            margin: 0;
            flex: 1;
        }

        .detail-scroller {
            padding: 0 16px 16px;
        }

        .detail-empty {
            padding: 24px 0;
        }

        .detail-group-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            margin-bottom: 4px;
        }

        .detail-group-header:first-child {
            margin-top: 0;
        }

        .nested-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
        }

        .setting-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: flex-start;
            padding: 12px 0;
        }

        .setting-row-in-group {
            padding-left: 20px;
        }

        .setting-meta {
            flex: 0 0 auto;
            min-width: 140px;
        }

        .setting-title {
            font-weight: 600;
            display: block;
            margin-bottom: 4px;
        }

        .setting-control {
            flex: 1;
            min-width: 0;
            display: flex;
        }

        .setting-row command {
            flex-shrink: 0;
        }

        .setting-control wa-input,
        .setting-control wa-textarea,
        .setting-control wa-number-input,
        .setting-control wa-select {
            flex: 1;
            min-width: 0;
            width: 100%;
        }

        .setting-meta .setting-control-key {
            width: 160px;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
            text-align: center;
        }

        .nested-object {
            margin-left: 8px;
            padding-left: 8px;
            border-left: 2px solid var(--wa-color-neutral-85);
        }

        .toolbar-search {
            width: 200px;
            margin-right: 8px;
        }

        .split-panel-fill {
            height: 100%;
        }
    `}};f([o({attribute:!1})],y.prototype,`input`,void 0),f([i()],y.prototype,`settings`,void 0),f([i()],y.prototype,`categoryTree`,void 0),f([i()],y.prototype,`selectedPath`,void 0),f([i()],y.prototype,`detailRows`,void 0),f([i()],y.prototype,`detailTitle`,void 0),f([i()],y.prototype,`searchQuery`,void 0),y=v=f([c(`lyra-settings-tree`)],y);var b=e=>{h.registerEditorInputHandler({editorId:`system.settings-tree`,label:`Settings`,ranking:1e3,canHandle:e=>e.key===`.system.settings`,handle:async e=>(e.component=t=>m`
                <lyra-settings-tree id="${t}" .input=${e}></lyra-settings-tree>
            `,e)}),r.registerHandler(`open_settings`,{ranking:100,execute:()=>{h.loadEditor({title:`Settings`,data:{},key:`.system.settings`,icon:`gear`,state:{}})}}),a.registerContribution(l,{command:`open_settings`,icon:`gear`,label:`Settings`})};export{b as default};