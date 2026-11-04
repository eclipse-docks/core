const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/rag-integration-D70-Nch4-DQCUjJzh.js","assets/canvas-bridge-core.js-DfVkBxCr.js","assets/rolldown-runtime-Dd_uD5pT.js","assets/canvas-bridge-canvas.js-DrvOvBhU.js","assets/canvas-bridge-canvas-DBq2RCBQ.css","assets/runtime-BJlEES2l-DUe1qmxI.js","assets/api-Dsa-NrxT.js","assets/rag-service-DjDVUi1M-BSU9770W.js","assets/in-browser-ml-service-D773AigL-CF0qbmif.js"])))=>i.map(i=>d[i]);
import{Bt as e,Lt as t,Ut as n,Zt as r,_n as i,gn as a,j as o,l as s,on as c,ot as l,un as u,vn as d,xn as f}from"./canvas-bridge-core.js-DfVkBxCr.js";import{S as p,_ as m,a as h,g,h as _,i as v,o as y,x as b,y as x}from"./canvas-bridge-canvas.js-DrvOvBhU.js";import{a as S,i as C,l as w,o as T,s as E,t as D}from"./rag-service-DjDVUi1M-BSU9770W.js";var O=f(`RAGSystemManager`),k=new S,A=class extends o{constructor(...e){super(...e),this.documents=[],this.stats={totalDocuments:0,byWorkspace:{}},this.loading=!1,this.selectedDocument=null,this.searchQuery=``,this.filterWorkspace=null,this.filterByActiveWorkspace=!0,this.filteredDocuments=[],this.searchResults=new Map,this.reindexing=!1,this.treeRef=v(),this.searchInputValue=``}async doInitUI(){try{await T.initialize(),await Promise.all([this.loadDocuments(),this.loadStats()])}catch(e){O.error(`Failed to initialize document index manager: ${e}`),i(`Failed to initialize: ${e}`)}}async loadDocuments(){this.loading=!0,this.requestUpdate();try{let e;this.filterByActiveWorkspace&&(e=(await E())?.workspacePath),this.documents=await T.listDocuments(e),await this.updateFilteredDocuments()}catch(e){O.error(`Failed to load documents: ${e}`),i(`Failed to load documents: ${e}`)}finally{this.loading=!1}}async updateFilteredDocuments(){this.filteredDocuments=await this.getFilteredDocuments(),this.requestUpdate()}async loadStats(){try{this.stats=await T.getStats(),this.requestUpdate()}catch(e){O.error(`Failed to load stats: ${e}`)}}handleTreeSelection(e){let t=e.detail?.selection||[];if(t.length===0&&this.treeRef.value&&(t=this.treeRef.value.selectedItems||[]),t.length>0){let e=t[0];this.selectedDocument=e?.model?e.model:null}else this.selectedDocument=null}async getFilteredDocuments(){if(!this.documents||this.documents.length===0)return[];if(this.searchQuery.trim())try{let e=await w(this.searchQuery,{limit:50,workspacePath:this.filterWorkspace||void 0});this.searchResults.clear();let t=new Map,n=new Map;for(let r of e){let e=r.document.id;t.set(e,r.document);let i=n.get(e);if(!i)n.set(e,{document:r.document,relevance:r.relevance,matchedSnippets:[...r.matchedSnippets]});else{r.relevance>i.relevance&&(i.relevance=r.relevance);let e=new Set(i.matchedSnippets);for(let t of r.matchedSnippets)e.has(t)||(i.matchedSnippets.push(t),e.add(t))}}for(let[e,t]of n)this.searchResults.set(e,t);let r=Array.from(t.values());return this.filterWorkspace?r.filter(e=>e.workspacePath===this.filterWorkspace):r}catch(e){return O.debug(`RAG search failed in document manager: ${e}`),this.searchResults.clear(),[]}this.searchResults.clear();let e=[...this.documents];return this.filterWorkspace&&(e=e.filter(e=>e.workspacePath===this.filterWorkspace)),e}highlightMatches(e,t){if(!t||!t.trim())return b`${e}`;let n=t.toLowerCase(),r=e.toLowerCase(),i=[],a=0,o=r.indexOf(n,a);for(;o!==-1;)o>a&&i.push(e.substring(a,o)),i.push(b`<mark class="search-match">${e.substring(o,o+t.length)}</mark>`),a=o+t.length,o=r.indexOf(n,a);return a<e.length&&i.push(e.substring(a)),b`${i}`}getContentPreview(e){let t=this.searchResults.get(e.id);if(t&&t.matchedSnippets.length>0)return b`
                <table class="snippets-table">
                    <thead>
                        <tr>
                            <th class="snippet-number-col">#</th>
                            <th class="snippet-content-col">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.matchedSnippets.map((e,t)=>b`
                            <tr>
                                <td class="snippet-number">${t+1}</td>
                                <td class="snippet-content">${this.highlightMatches(e,this.searchQuery)}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            `;if(this.searchQuery&&this.searchQuery.trim()){let t=k.extractContextSnippets(e.content,this.searchQuery,C.CONTEXT);if(t.length>0)return b`
                    <table class="snippets-table">
                        <thead>
                            <tr>
                                <th class="snippet-number-col">#</th>
                                <th class="snippet-content-col">Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map((t,n)=>b`
                                <tr>
                                    <td class="snippet-number">${n+1}</td>
                                    <td class="snippet-content">${this.highlightMatches(e.content.substring(t.start,t.end),this.searchQuery)}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `}let n=k.extractSimpleSnippet(e.content,D.LONG);return b`
            <div class="snippet-preview">${n}</div>
        `}async deleteDocument(e){try{await T.deleteDocument(e.id),d(`Deleted: ${e.fileName}`),await this.loadDocuments(),await this.loadStats(),this.selectedDocument?.id===e.id&&(this.selectedDocument=null)}catch(e){i(`Failed to delete document: ${e}`)}}async reindexDocument(e){try{let r=await E();if(!r){i(`No workspace connected`);return}let a=await r.workspace.getResource(e.filePath);if(!a){i(`File not found: ${e.filePath}`);return}if(!(a instanceof n)){i(`Resource is not a file: ${e.filePath}`);return}let o=a;await t.runAsync(`Reindexing document`,async t=>{t.message=`Reindexing ${e.fileName}...`,await T.reindexDocument(o),t.progress=100}),d(`Reindexed: ${e.fileName}`),await this.loadDocuments(),this.selectedDocument?.id===e.id&&(this.selectedDocument=await T.getDocument(e.id))}catch(e){i(`Failed to reindex document: ${e}`)}}async reindexAllDocuments(){if(this.reindexing)return;let e=await T.getStats();if(e.totalDocuments===0){d(`No documents to reindex`);return}this.reindexing=!0,this.requestUpdate();try{let n=await t.runAsync(`Reindexing all documents`,async t=>{t.message=`Starting reindexing...`;let n=e.totalDocuments,r=await T.reindexAllDocuments(),i=r.succeeded+r.failed;return t.progress=n>0?i/n*100:100,t.message=`Reindexed ${r.succeeded}/${n} documents${r.failed>0?` (${r.failed} failed)`:``}`,r});await this.loadDocuments(),await this.loadStats(),d(`Reindexing completed: ${n.succeeded} succeeded, ${n.failed} failed`)}catch(e){O.error(`Failed to reindex all documents: ${e}`),i(`Failed to reindex all documents: ${e}`)}finally{this.reindexing=!1,this.requestUpdate()}}formatFileSize(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} MiB`:`${(e/1048576).toFixed(1)} MB`}formatDate(e){return new Date(e).toLocaleString()}getFileIcon(e){return s.getFileIcon(e)}renderToolbar(){let e=Object.keys(this.stats?.byWorkspace||{});return b`
            <wa-input
                type="search"
                placeholder="Search documents..."
                .value=${this.searchInputValue}
                @input=${e=>{this.searchInputValue=e.target.value,this.searchDebounceTimer&&clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=window.setTimeout(async()=>{this.searchQuery=this.searchInputValue,await this.updateFilteredDocuments()},200)}}
                @wa-clear=${async()=>{this.searchDebounceTimer&&clearTimeout(this.searchDebounceTimer),this.searchInputValue=``,this.searchQuery=``,await this.updateFilteredDocuments()}}
                size="s"
                with-clear
                autocomplete="off"
                style="flex: 1; max-width: 400px;">
                <wa-icon name="magnifying-glass" slot="start"></wa-icon>
            </wa-input>
            
            <wa-switch
                .checked=${this.filterByActiveWorkspace}
                @change=${async e=>{this.filterByActiveWorkspace=e.target.checked,await this.loadDocuments()}}
                size="s">
                Active workspace only
            </wa-switch>
            
            ${e.length>1?b`
                <wa-select 
                    .value=${this.filterWorkspace||``}
                    @change=${async e=>{this.filterWorkspace=e.target.value||null,await this.updateFilteredDocuments()}}
                    size="s"
                    style="width: 200px;">
                    <wa-option value="">All Workspaces</wa-option>
                    ${e.map(e=>b`
                        <wa-option value="${e}">${e} (${this.stats.byWorkspace[e]})</wa-option>
                    `)}
                </wa-select>
            `:x}
            
            <docks-command 
                size="s" 
                icon="arrow-rotate-right"
                title="Refresh document list"
                .action=${()=>this.loadDocuments()}
                ?disabled=${this.reindexing}>
                Refresh
            </docks-command>
            
            <docks-command 
                size="s" 
                icon="database"
                title="Re-index all documents"
                .action=${()=>this.reindexAllDocuments()}
                ?disabled=${this.reindexing||this.loading}>
                ${this.reindexing?`Reindexing...`:`Re-index All`}
            </docks-command>
        `}renderContent(){this.stats||={totalDocuments:0,byWorkspace:{}};let e=this.filteredDocuments,t=Object.keys(this.stats.byWorkspace||{});return b`
            <div class="rag-system-manager">
                <div class="header">
                    <div class="header-content">
                        <div class="stats">
                            <span>Total: ${this.stats.totalDocuments} documents</span>
                            ${t.length>0?b`
                                <span>Workspaces: ${t.length}</span>
                            `:x}
                        </div>
                    </div>
                </div>

                <wa-split-panel position="40" style="height: 100%;">
                    <div class="document-list" slot="start">
                        ${this.loading?b`
                            <div class="loading">
                                <wa-spinner></wa-spinner>
                                <span>Loading documents...</span>
                            </div>
                        `:e.length===0?b`
                            <div class="empty">
                                <wa-icon name="inbox" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                                <p>${this.searchQuery||this.filterWorkspace?`No documents match your filters`:`No documents indexed yet`}</p>
                            </div>
                        `:b`
                            <wa-tree 
                                ${h(this.treeRef)}
                                selection="leaf"
                                style="--indent-guide-width: 1px;"
                                @wa-selection-change=${e=>{this.handleTreeSelection(e)}}>
                                ${e.map(e=>b`
                                    <wa-tree-item 
                                        .model=${e}
                                        ?selected=${this.selectedDocument?.id===e.id}>
                                        <wa-icon name="${this.getFileIcon(e.fileType)}"></wa-icon>
                                            <div class="tree-item-info">
                                                <strong class="tree-item-path">${e.filePath}</strong>
                                                <div class="tree-item-meta">
                                                    <small class="meta-size">${this.formatFileSize(e.metadata.size)}</small>
                                                    <small class="meta-date">${this.formatDate(e.indexedAt)}</small>
                                                </div>
                                            </div>
                                            <div class="tree-item-actions" @click=${e=>e.stopPropagation()}>
                                                <wa-button
                                                    variant="neutral"
                                                    appearance="plain"
                                                    size="s"
                                                    title="Reindex"
                                                    @click=${()=>this.reindexDocument(e)}>
                                                    <wa-icon name="arrow-rotate-right"></wa-icon>
                                                </wa-button>
                                                <wa-button
                                                    variant="danger"
                                                    appearance="plain"
                                                    size="s"
                                                    title="Delete"
                                                    @click=${()=>this.deleteDocument(e)}>
                                                    <wa-icon name="trash"></wa-icon>
                                                </wa-button>
                                            </div>
                                    </wa-tree-item>
                                `)}
                            </wa-tree>
                        `}
                    </div>

                    <div slot="end">
                        ${this.selectedDocument?b`
                            <div class="document-details">
                                <div class="details-content">
                                    <div class="metadata-grid">
                                        <wa-input
                                            label="File Path"
                                            .value=${this.selectedDocument.filePath}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.filePath}
                                                size="s"
                                                label="Copy file path">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Workspace"
                                            .value=${this.selectedDocument.workspacePath}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.workspacePath}
                                                size="s"
                                                label="Copy workspace">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="File Type"
                                            .value=${this.selectedDocument.fileType}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.fileType}
                                                size="s"
                                                label="Copy file type">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Size"
                                            .value=${this.formatFileSize(this.selectedDocument.metadata.size)}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatFileSize(this.selectedDocument.metadata.size)}
                                                size="s"
                                                label="Copy size">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Indexed At"
                                            .value=${this.formatDate(this.selectedDocument.indexedAt)}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatDate(this.selectedDocument.indexedAt)}
                                                size="s"
                                                label="Copy indexed date">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Last Updated"
                                            .value=${this.formatDate(this.selectedDocument.updatedAt)}
                                            readonly
                                            size="s">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatDate(this.selectedDocument.updatedAt)}
                                                size="s"
                                                label="Copy updated date">
                                            </wa-copy-button>
                                        </wa-input>
                                    </div>
                                    
                                    ${this.selectedDocument.metadata.tags&&this.selectedDocument.metadata.tags.length>0?b`
                                        <div class="tags-section">
                                            <wa-input
                                                label="Tags"
                                                .value=${this.selectedDocument.metadata.tags.join(`, `)}
                                                readonly
                                                size="s">
                                                <wa-copy-button
                                                    slot="end"
                                                    .value=${this.selectedDocument.metadata.tags.join(`, `)}
                                                    size="s"
                                                    label="Copy tags">
                                                </wa-copy-button>
                                            </wa-input>
                                        </div>
                                    `:x}
                                
                                    <div class="detail-section">
                                        <label>Content Preview${this.searchQuery?b` <span class="search-hint">(showing matches for "${this.searchQuery}")</span>`:x}</label>
                                        <wa-scroller class="content-preview" orientation="vertical">
                                            <div class="content-preview-inner">
                                                ${this.getContentPreview(this.selectedDocument)}
                                            </div>
                                        </wa-scroller>
                                    </div>
                                </div>
                            </div>
                    `:b`
                            <div class="document-details empty">
                                <wa-icon name="file-lines" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                                <p>Select a document to view details</p>
                            </div>
                        `}
                    </div>
                </wa-split-panel>
            </div>
        `}static{this.styles=p`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            min-height: 0;
        }

        .rag-system-manager {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 0;
            overflow: hidden;
        }

        wa-split-panel {
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        .document-list {
            height: 100%;
            overflow-y: auto;
        }

        .tree-item-info {
            flex: 1;
            min-width: 0;
        }

        .tree-item-path {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .tree-item-meta {
            display: flex;
            align-items: center;
            gap: var(--wa-space-xs);
            flex-wrap: wrap;
            margin-top: var(--wa-space-xs);
        }

        .tree-item-actions {
            opacity: 0;
        }

        wa-tree-item:hover .tree-item-actions {
            opacity: 1;
        }

        .document-details {
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .details-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: var(--wa-space-s);
            min-height: 0;
            overflow: hidden;
        }

        .metadata-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--wa-space-s);
            flex-shrink: 0;
        }

        .tags-section {
            margin-top: var(--wa-space-s);
            flex-shrink: 0;
            margin-bottom: var(--wa-space-s);
        }

        .detail-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            position: relative;
        }

        .detail-section label {
            flex-shrink: 0;
            margin-bottom: var(--wa-space-xs);
        }

        .content-preview {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }

        .content-preview-inner {
            width: 100%;
        }

        .snippets-table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--wa-color-surface-raised);
        }

        .snippets-table thead {
            background-color: var(--wa-color-neutral-fill-quiet);
        }

        .snippets-table th {
            padding: var(--wa-space-xs) var(--wa-space-s);
            text-align: left;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            border-bottom: 1px solid var(--wa-color-surface-border);
        }

        .snippets-table td {
            padding: var(--wa-space-s);
            border-bottom: 1px solid var(--wa-color-surface-border);
            vertical-align: top;
        }

        .snippets-table tbody tr:last-child td {
            border-bottom: none;
        }

        .snippets-table tbody tr:hover {
            background-color: var(--wa-color-neutral-fill-quiet);
        }

        .snippet-number-col {
            width: 3rem;
            text-align: center;
        }

        .snippet-content-col {
            width: auto;
        }

        .snippet-number {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            text-align: center;
        }

        .snippet-content {
            white-space: pre-wrap;
            word-wrap: breaword;
            overflow-wrap: breaword;
            font-family: monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--wa-color-text-normal);
        }

        .snippet-preview {
            white-space: pre-wrap;
            word-wrap: breaword;
            overflow-wrap: breaword;
            font-family: monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--wa-color-text-normal);
            padding: var(--wa-space-s);
            background-color: var(--wa-color-surface-raised);
            border-radius: var(--wa-border-radius-medium);
        }

        .snippet-content mark.search-match {
            background: var(--wa-color-warning-fill-loud);
            color: var(--wa-color-warning-text-loud);
            padding: 0 2px;
            border-radius: 2px;
            font-weight: 600;
        }
    `}};e([g({attribute:!1})],A.prototype,`input`,void 0),e([_()],A.prototype,`documents`,void 0),e([_()],A.prototype,`stats`,void 0),e([_()],A.prototype,`loading`,void 0),e([_()],A.prototype,`selectedDocument`,void 0),e([_()],A.prototype,`searchQuery`,void 0),e([_()],A.prototype,`filterWorkspace`,void 0),e([_()],A.prototype,`filterByActiveWorkspace`,void 0),e([_()],A.prototype,`filteredDocuments`,void 0),e([_()],A.prototype,`searchResults`,void 0),e([_()],A.prototype,`reindexing`,void 0),A=e([m(`docks-rag-system-manager`)],A);var j=f(`RAGSystemExtension`);function M(e){T.initialize().catch(e=>{j.error(`Failed to initialize document index service: ${e}`)}),a({command:{id:`rag-system.index-file`,name:`Index Document`,description:`Index the currently selected file for search and retrieval`,parameters:[{name:`includeContent`,description:`Whether to include full content in index (default: true)`,required:!1}]},handler:{canExecute:e=>c.get()instanceof n,execute:async e=>{let r=c.get();if(!(r instanceof n)){i(`Please select a file to index`);return}let a=e.params?.includeContent!==!1;await t.runAsync(`Indexing document`,async e=>{e.message=`Indexing ${r.getName()}...`;try{let t=await T.indexDocument(r,{includeContent:a});e.progress=100,d(`Document indexed: ${t.fileName}`)}catch(e){throw i(`Failed to index document: ${e}`),e}})}}}),a({command:{id:`rag-system.index-workspace`,name:`Index Workspace`,description:`Index all indexable files in the current workspace`,parameters:[{name:`includeContent`,description:`Whether to include full content in index (default: true)`,required:!1},{name:`maxFileSize`,description:`Maximum file size in bytes to index (default: 5MB)`,required:!1}]},handler:{canExecute:e=>!0,execute:async e=>{let n=await r.getWorkspace();if(!n){i(`No workspace selected`);return}let a=e.params?.includeContent!==!1,o=e.params?.maxFileSize?parseInt(e.params.maxFileSize):void 0;await t.runAsync(`Indexing workspace`,async e=>{e.message=`Collecting files...`,e.progress=0;try{let t=await T.indexWorkspace(n,{includeContent:a,maxFileSize:o});e.progress=100,t.failed>0?i(`Indexing complete: ${t.indexed} indexed, ${t.failed} failed. Check console for details.`):d(`Workspace indexed: ${t.indexed} documents`)}catch(e){throw i(`Failed to index workspace: ${e}`),e}})}}}),a({command:{id:`rag-system.list-documents`,name:`List Indexed Documents`,description:`List all indexed documents in the current workspace`,parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{let n=(await r.getWorkspace())?.getName();await t.runAsync(`Loading indexed documents`,async e=>{try{let t=await T.listDocuments(n);e.progress=100,t.length===0?d(`No documents indexed in this workspace`):(j.info(`Found ${t.length} indexed documents`),d(`Found ${t.length} indexed documents (check console for details)`))}catch(e){throw i(`Failed to list documents: ${e}`),e}})}}}),a({command:{id:`rag-system.delete-document`,name:`Delete Document from Index`,description:`Remove the selected file from the document index`,parameters:[]},handler:{canExecute:e=>c.get()instanceof n,execute:async e=>{let r=c.get();if(!(r instanceof n)){i(`Please select a file to remove from index`);return}let a=r.getWorkspace().getName(),o=r.getWorkspacePath();await t.runAsync(`Deleting document from index`,async e=>{try{let t=await T.deleteDocumentByPath(a,o);e.progress=100,d(t?`Document removed from index: ${r.getName()}`:`Document not found in index: ${r.getName()}`)}catch(e){throw i(`Failed to delete document from index: ${e}`),e}})}}}),a({command:{id:`rag-system.clear-workspace`,name:`Clear Workspace Index`,description:`Remove all indexed documents from the current workspace`,parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{let n=await r.getWorkspace();if(!n){i(`No workspace selected`);return}let a=n.getName();await t.runAsync(`Clearing workspace index`,async e=>{try{let t=await T.deleteWorkspace(a);e.progress=100,d(`Removed ${t} documents from index`)}catch(e){throw i(`Failed to clear workspace index: ${e}`),e}})}}}),a({command:{id:`rag-system.get-stats`,name:`Document Index Statistics`,description:`Get statistics about the document index`,parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{await t.runAsync(`Loading statistics`,async e=>{try{let t=await T.getStats();e.progress=100,j.info(`Document index statistics: ${JSON.stringify(t)}`),d(`Index statistics: ${t.totalDocuments} total documents. Check console for details.`)}catch(e){throw i(`Failed to get statistics: ${e}`),e}})}}}),a({command:{id:`rag-system.reindex-file`,name:`Reindex Document`,description:`Reindex the selected file (useful after file changes)`,parameters:[]},handler:{canExecute:e=>c.get()instanceof n,execute:async e=>{let r=c.get();if(!(r instanceof n)){i(`Please select a file to reindex`);return}await t.runAsync(`Reindexing document`,async e=>{e.message=`Reindexing ${r.getName()}...`;try{let t=await T.reindexDocument(r);e.progress=100,d(`Document reindexed: ${t.fileName}`)}catch(e){throw i(`Failed to reindex document: ${e}`),e}})}}}),j.info(`RAG system extension loaded`),s.registerEditorInputHandler({editorId:`system.rag-system-manager`,label:`RAG System Manager`,ranking:1e3,canHandle:e=>e.key===`.system.rag-system`,handle:async e=>(e.component=t=>b`
                <docks-rag-system-manager id="${t}" .input=${e}></docks-rag-system-manager>
            `,e)}),a({command:{id:`open-rag-system-manager`,name:`Open RAG System Manager`,description:`Opens the RAG system manager to view and manage indexed documents`,parameters:[]},handler:{execute:e=>{s.loadEditor({title:`RAG System Manager`,data:{},key:`.system.rag-system`,icon:`database`,state:{}}).catch(e=>{j.error(`Failed to open document index manager: ${e}`)})}},contribution:{target:l,icon:`database`,label:`RAG System`}}),u.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.indexDocument`,command:`rag-system.index-file`,icon:`database`,label:`Index Document`,disabled:()=>!(c.get()instanceof n)}),y(()=>import(`./rag-integration-D70-Nch4-DQCUjJzh.js`).then(e=>{e.integrateRAGWithAI(),j.info(`RAG integration enabled`)}),__vite__mapDeps([0,1,2,3,4,5,6,7,8])).catch(e=>{j.warn(`Failed to load RAG integration: ${e}`)})}export{M as default};