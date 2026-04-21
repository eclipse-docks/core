import{d as e,f as t}from"./fs-access-D-fDaJ8V-w6cEwJE-.js";import{B as n,E as r,G as i,J as a,K as o,M as s,N as c,R as l,U as u,_t as d,gt as f,j as p,o as m,u as h}from"./dist-DHeR2FNk.js";import"./lit-oEeQQU89.js";var g,_=`catalog.root`,v=`No catalog entries yet. Install or enable extensions that contribute catalog items.`,y=class extends m{static{g=this}constructor(...e){super(...e),this.treeRef=p()}doBeforeUI(){this.rebuildTree(),this.contributionsSubscriptionToken=e(u,e=>{(e.target===`catalog.root`||e.target?.startsWith(`catalog.`))&&this.rebuildTree()})}doClose(){this.contributionsSubscriptionToken&&=(t(this.contributionsSubscriptionToken),void 0),super.doClose()}rebuildTree(){let e=a.getContributions(_);this.rootNodes=this.toTreeNodes(e),this.requestUpdate()}renderToolbar(){return f`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(i.get()instanceof g&&o.get()!==void 0)}
                .action=${()=>this.runWgetForSelection()}
            ></docks-command>
            <docks-command icon="arrows-rotate" title="Refresh Catalog" .action=${()=>this.refresh()}></docks-command>
            <docks-command icon="angles-down" slot="end" title="Expand All" .action=${()=>this.setAllExpanded(!0)}></docks-command>
            <docks-command icon="angles-up" slot="end" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}></docks-command>
        `}toTreeNodes(e){return e.map(e=>{let t={data:e.state,icon:e.icon,label:e.label,leaf:!1};if(e.contributionId){let n=a.getContributions(e.contributionId);t.leaf=n.length===0,t.children=this.toTreeNodes(n)}return t})}wgetParamsFromCatalogData(e){if(!e?.url)return null;let t={url:e.url};return typeof e.filename==`string`&&e.filename.trim()&&(t.filename=e.filename.trim()),t}onItemDblClicked(e){let t=e.currentTarget,n=t?.model;if(!n)return;let r=this.wgetParamsFromCatalogData(n.data);if(r){this.executeCommand(`wget`,r);return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}runWgetForSelection(){let e=o.get(),t=e&&this.wgetParamsFromCatalogData(e);t&&this.executeCommand(`wget`,t)}onSelectionChanged(e){let t=e.detail.selection[0].model;o.set(t.data)}renderContextMenu(){let e=i.get()instanceof g?o.get():void 0;return f`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(e&&`url`in e&&e.url)}
                .action=${()=>this.runWgetForSelection()}
            >Checkout</docks-command>
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e})}refresh(){this.rebuildTree()}createTreeItems(e,t=!1){return e?f`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${e}
                ?expanded=${t}
            >
                <span>${r(e.icon)} ${e.label}</span>
                ${e.children?.map(e=>this.createTreeItems(e))}
            </wa-tree-item>
        `:f``}renderContent(){return f`
            <div class="catalog-root">
                ${(this.rootNodes?.length??0)>0?f`
                          <wa-tree
                              ${s(this.treeRef)}
                              @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                              style="--indent-guide-width: 1px;"
                          >
                              ${this.rootNodes.map(e=>this.createTreeItems(e,!0))}
                          </wa-tree>
                      `:f`
                          <docks-no-content
                              message=${v}
                              icon="book"
                          ></docks-no-content>
                      `}
            </div>
        `}static{this.styles=d`
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
    `}};c([l()],y.prototype,`rootNodes`,void 0),y=g=c([n(`docks-catalog`)],y),a.registerContribution(h,{name:`catalog`,label:`Catalog`,icon:`book`,component:e=>f`<docks-catalog id="${e}"></docks-catalog>`});