import{f as e,p as t}from"./fs-access-DTXPsV1W-Dp772n0E.js";import{E as n,H as r,M as i,N as a,P as o,V as s,W as c,_t as l,ft as u,o as d,u as f,ut as p,vt as m,z as h}from"./dist-DkbPbSj1.js";import"./lit-BXsh-fRu.js";var g,_=`catalog.root`,v=`No catalog entries yet. Install or enable extensions that contribute catalog items.`,y=class extends d{static{g=this}constructor(...e){super(...e),this.treeRef=i()}doBeforeUI(){this.rebuildTree(),this.contributionsSubscriptionToken=e(h,e=>{(e.target===`catalog.root`||e.target?.startsWith(`catalog.`))&&this.rebuildTree()})}doClose(){this.contributionsSubscriptionToken&&=(t(this.contributionsSubscriptionToken),void 0),super.doClose()}rebuildTree(){let e=c.getContributions(_);this.rootNodes=this.toTreeNodes(e),this.requestUpdate()}renderToolbar(){return l`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(s.get()instanceof g&&r.get()!==void 0)}
                .action=${()=>this.runWgetForSelection()}
            ></docks-command>
            <docks-command icon="arrows-rotate" title="Refresh Catalog" .action=${()=>this.refresh()}></docks-command>
            <docks-command icon="angles-down" slot="end" title="Expand All" .action=${()=>this.setAllExpanded(!0)}></docks-command>
            <docks-command icon="angles-up" slot="end" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}></docks-command>
        `}toTreeNodes(e){return e.map(e=>{let t={data:e.state,icon:e.icon,label:e.label,leaf:!1};if(e.contributionId){let n=c.getContributions(e.contributionId);t.leaf=n.length===0,t.children=this.toTreeNodes(n)}return t})}wgetParamsFromCatalogData(e){if(!e?.url)return null;let t={url:e.url};return typeof e.filename==`string`&&e.filename.trim()&&(t.filename=e.filename.trim()),t}onItemDblClicked(e){let t=e.currentTarget,n=t?.model;if(!n)return;let r=this.wgetParamsFromCatalogData(n.data);if(r){this.executeCommand(`wget`,r);return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}runWgetForSelection(){let e=r.get(),t=e&&this.wgetParamsFromCatalogData(e);t&&this.executeCommand(`wget`,t)}onSelectionChanged(e){let t=e.detail.selection[0].model;r.set(t.data)}renderContextMenu(){let e=s.get()instanceof g?r.get():void 0;return l`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(e&&`url`in e&&e.url)}
                .action=${()=>this.runWgetForSelection()}
            >Checkout</docks-command>
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e})}refresh(){this.rebuildTree()}createTreeItems(e,t=!1){return e?l`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${e}
                ?expanded=${t}
            >
                <span>${n(e.icon)} ${e.label}</span>
                ${e.children?.map(e=>this.createTreeItems(e))}
            </wa-tree-item>
        `:l``}renderContent(){return l`
            <div class="catalog-root">
                ${(this.rootNodes?.length??0)>0?l`
                          <wa-tree
                              ${a(this.treeRef)}
                              @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                              style="--indent-guide-width: 1px;"
                          >
                              ${this.rootNodes.map(e=>this.createTreeItems(e,!0))}
                          </wa-tree>
                      `:l`
                          <docks-no-content
                              message=${v}
                              icon="book"
                          ></docks-no-content>
                      `}
            </div>
        `}static{this.styles=m`
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
    `}};o([p()],y.prototype,`rootNodes`,void 0),y=g=o([u(`docks-catalog`)],y),c.registerContribution(f,{name:`catalog`,label:`Catalog`,icon:`book`,component:e=>l`<docks-catalog id="${e}"></docks-catalog>`});