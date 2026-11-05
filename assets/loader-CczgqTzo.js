import{B as e,an as t,dn as n,jt as r,k as i,nn as a,on as o,pn as s,wn as c}from"./canvas-bridge-core.js-Bffj0Hc4.js";import{C as l,_ as u,a as d,d as f,i as p,u as m,w as h,y as g}from"./canvas-bridge-canvas.js-D2E74L6t.js";var _,v=`catalog.root`,y=`No catalog entries yet. Install or enable extensions that contribute catalog items.`,b=class extends i{static{_=this}constructor(...e){super(...e),this.treeRef=p()}doBeforeUI(){this.rebuildTree(),this.contributionsSubscriptionToken=m(a,e=>{(e.target===`catalog.root`||e.target?.startsWith(`catalog.`))&&this.rebuildTree()})}doClose(){this.contributionsSubscriptionToken&&=(f(this.contributionsSubscriptionToken),void 0),super.doClose()}rebuildTree(){let e=n.getContributions(v);this.rootNodes=this.toTreeNodes(e),this.requestUpdate()}renderToolbar(){let e=t.get()instanceof _&&o.get()!==void 0;return l`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!e}
                .action=${()=>this.runActionForSelection()}
            ></docks-command>
            <docks-command icon="arrows-rotate" title="Refresh Catalog" .action=${()=>this.refresh()}></docks-command>
            <docks-command icon="angles-down" slot="end" title="Expand All" .action=${()=>this.setAllExpanded(!0)}></docks-command>
            <docks-command icon="angles-up" slot="end" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}></docks-command>
        `}toTreeNodes(e){return e.map(e=>{let t={data:e.state,icon:e.icon,label:e.label,leaf:!1};if(e.contributionId){let r=n.getContributions(e.contributionId);t.leaf=r.length===0,t.children=this.toTreeNodes(r)}return t})}wgetParamsFromCatalogData(e){if(!e?.url||e.openInNewTab)return null;let t={url:e.url};return typeof e.filename==`string`&&e.filename.trim()&&(t.filename=e.filename.trim()),t}openInNewTabFromCatalogData(e){return!e?.url||!e.openInNewTab?null:e.url}openCatalogUrl(e){window.open(e,`_blank`,`noopener,noreferrer`)}onItemDblClicked(e){let t=e.currentTarget,n=t?.model;if(!n)return;let r=this.openInNewTabFromCatalogData(n.data);if(r){this.openCatalogUrl(r);return}let i=this.wgetParamsFromCatalogData(n.data);i?this.executeCommand(`wget`,i):!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}runActionForSelection(){let e=o.get(),t=e&&this.openInNewTabFromCatalogData(e);if(t){this.openCatalogUrl(t);return}let n=e&&this.wgetParamsFromCatalogData(e);n&&this.executeCommand(`wget`,n)}onSelectionChanged(e){let t=e.detail.selection[0].model;o.set(t.data)}renderContextMenu(){let e=t.get()instanceof _?o.get():void 0,n=e&&`url`in e&&e.url,i=e&&`openInNewTab`in e&&e.openInNewTab;return l`
            ${r({icon:`file-arrow-down`,label:i?`Open download`:`Checkout`,title:i?`Open download in browser`:`Checkout`,disabled:!n,action:()=>this.runActionForSelection()})}
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e})}refresh(){this.rebuildTree()}createTreeItems(e,t=!1){if(!e)return l``;let n=!!(e.data&&`openInNewTab`in e.data&&e.data.openInNewTab);return l`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${e}
                ?expanded=${t}
            >
                <span class="catalog-tree-label">
                    ${s(e.icon)} ${e.label}
                    ${n?l`<span class="catalog-external-suffix" title="Opens in browser">${s(`arrow-up-right-from-square`)}</span>`:``}
                </span>
                ${e.children?.map(e=>this.createTreeItems(e))}
            </wa-tree-item>
        `}renderContent(){let e=(this.rootNodes?.length??0)>0;return l`
            <div class="catalog-root">
                ${e?l`
                          <wa-tree
                              ${d(this.treeRef)}
                              @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                              style="--indent-guide-width: 1px;"
                          >
                              ${this.rootNodes.map(e=>this.createTreeItems(e,!0))}
                          </wa-tree>
                      `:l`
                          <docks-no-content
                              message=${y}
                              icon="book"
                          ></docks-no-content>
                      `}
            </div>
        `}static{this.styles=h`
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
    `}};c([u()],b.prototype,`rootNodes`,void 0),b=_=c([g(`docks-catalog`)],b),n.registerContribution(e,{name:`catalog`,label:`Catalog`,icon:`book`,component:e=>l`<docks-catalog id="${e}"></docks-catalog>`});