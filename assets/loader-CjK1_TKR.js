import{I as e,Jt as t,L as n,N as r,R as i,Rt as a,Vt as o,cn as s,it as c,k as l,l as u,ot as d,p as f,rn as p,rt as m,sn as h,tt as g}from"./canvas-bridge-core.js-CIMrG4cY.js";import"./canvas-bridge-lit.js-CkZ9trmX.js";var _,v=`catalog.root`,y=`No catalog entries yet. Install or enable extensions that contribute catalog items.`,b=class extends u{static{_=this}constructor(...t){super(...t),this.treeRef=e()}doBeforeUI(){this.rebuildTree(),this.contributionsSubscriptionToken=h(g,e=>{(e.target===`catalog.root`||e.target?.startsWith(`catalog.`))&&this.rebuildTree()})}doClose(){this.contributionsSubscriptionToken&&=(s(this.contributionsSubscriptionToken),void 0),super.doClose()}rebuildTree(){let e=d.getContributions(v);this.rootNodes=this.toTreeNodes(e),this.requestUpdate()}renderToolbar(){let e=m.get()instanceof _&&c.get()!==void 0;return t`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!e}
                .action=${()=>this.runActionForSelection()}
            ></docks-command>
            <docks-command icon="arrows-rotate" title="Refresh Catalog" .action=${()=>this.refresh()}></docks-command>
            <docks-command icon="angles-down" slot="end" title="Expand All" .action=${()=>this.setAllExpanded(!0)}></docks-command>
            <docks-command icon="angles-up" slot="end" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}></docks-command>
        `}toTreeNodes(e){return e.map(e=>{let t={data:e.state,icon:e.icon,label:e.label,leaf:!1};if(e.contributionId){let n=d.getContributions(e.contributionId);t.leaf=n.length===0,t.children=this.toTreeNodes(n)}return t})}wgetParamsFromCatalogData(e){if(!e?.url||e.openInNewTab)return null;let t={url:e.url};return typeof e.filename==`string`&&e.filename.trim()&&(t.filename=e.filename.trim()),t}openInNewTabFromCatalogData(e){return!e?.url||!e.openInNewTab?null:e.url}openCatalogUrl(e){window.open(e,`_blank`,`noopener,noreferrer`)}onItemDblClicked(e){let t=e.currentTarget,n=t?.model;if(!n)return;let r=this.openInNewTabFromCatalogData(n.data);if(r){this.openCatalogUrl(r);return}let i=this.wgetParamsFromCatalogData(n.data);if(i){this.executeCommand(`wget`,i);return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}runActionForSelection(){let e=c.get(),t=e&&this.openInNewTabFromCatalogData(e);if(t){this.openCatalogUrl(t);return}let n=e&&this.wgetParamsFromCatalogData(e);n&&this.executeCommand(`wget`,n)}onSelectionChanged(e){let t=e.detail.selection[0].model;c.set(t.data)}renderContextMenu(){let e=m.get()instanceof _?c.get():void 0,n=e&&`url`in e&&e.url,i=e&&`openInNewTab`in e&&e.openInNewTab;return t`
            ${r({icon:`file-arrow-down`,label:i?`Open download`:`Checkout`,title:i?`Open download in browser`:`Checkout`,disabled:!n,action:()=>this.runActionForSelection()})}
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e})}refresh(){this.rebuildTree()}createTreeItems(e,n=!1){if(!e)return t``;let r=!!(e.data&&`openInNewTab`in e.data&&e.data.openInNewTab);return t`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${e}
                ?expanded=${n}
            >
                <span class="catalog-tree-label">
                    ${l(e.icon)} ${e.label}
                    ${r?t`<span class="catalog-external-suffix" title="Opens in browser">${l(`arrow-up-right-from-square`)}</span>`:``}
                </span>
                ${e.children?.map(e=>this.createTreeItems(e))}
            </wa-tree-item>
        `}renderContent(){let e=(this.rootNodes?.length??0)>0;return t`
            <div class="catalog-root">
                ${e?t`
                          <wa-tree
                              ${n(this.treeRef)}
                              @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                              style="--indent-guide-width: 1px;"
                          >
                              ${this.rootNodes.map(e=>this.createTreeItems(e,!0))}
                          </wa-tree>
                      `:t`
                          <docks-no-content
                              message=${y}
                              icon="book"
                          ></docks-no-content>
                      `}
            </div>
        `}static{this.styles=p`
        :host {
            display: flex;
            flex-direction: column;
        }

        .catalog-root {
            height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .catalog-root wa-tree {
            flex: 1;
            min-height: 0;
        }

        .catalog-tree-label {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }

        .catalog-external-suffix {
            opacity: 0.65;
            font-size: 0.85em;
        }
    `}};i([a()],b.prototype,`rootNodes`,void 0),b=_=i([o(`docks-catalog`)],b),d.registerContribution(f,{name:`catalog`,label:`Catalog`,icon:`book`,component:e=>t`<docks-catalog id="${e}"></docks-catalog>`});