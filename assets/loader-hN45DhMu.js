import{d as e,f as t}from"./fs-access-DHrXww7b-DkktKkYZ.js";import{A as n,I as r,K as i,R as a,T as o,U as s,V as c,W as l,ht as u,j as d,k as f,mt as p,s as m,u as h}from"./dist-D9JGqkI-.js";import"./lit-DgB-ByEp.js";var g,_=`catalog.root`,v=class extends m{static{g=this}constructor(...e){super(...e),this.treeRef=f()}doBeforeUI(){this.rebuildTree(),this.contributionsSubscriptionToken=e(c,e=>{(e.target===`catalog.root`||e.target?.startsWith(`catalog.`))&&this.rebuildTree()})}doClose(){this.contributionsSubscriptionToken&&=(t(this.contributionsSubscriptionToken),void 0),super.doClose()}rebuildTree(){let e=i.getContributions(_);this.rootNodes=this.toTreeNodes(e),this.requestUpdate()}renderToolbar(){return p`
            <lyra-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(s.get()instanceof g&&l.get()!==void 0)}
                .action=${()=>this.runWgetForSelection()}
            ></lyra-command>
            <lyra-command icon="arrows-rotate" title="Refresh Catalog" .action=${()=>this.refresh()}></lyra-command>
            <lyra-command icon="angles-down" slot="end" title="Expand All" .action=${()=>this.setAllExpanded(!0)}></lyra-command>
            <lyra-command icon="angles-up" slot="end" title="Collapse All" .action=${()=>this.setAllExpanded(!1)}></lyra-command>
        `}toTreeNodes(e){return e.map(e=>{let t={data:e.state,icon:e.icon,label:e.label,leaf:!1};if(e.contributionId){let n=i.getContributions(e.contributionId);t.leaf=n.length===0,t.children=this.toTreeNodes(n)}return t})}wgetParamsFromCatalogData(e){if(!e?.url)return null;let t={url:e.url};return typeof e.filename==`string`&&e.filename.trim()&&(t.filename=e.filename.trim()),t}onItemDblClicked(e){let t=e.currentTarget,n=t?.model;if(!n)return;let r=this.wgetParamsFromCatalogData(n.data);if(r){this.executeCommand(`wget`,r);return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}runWgetForSelection(){let e=l.get(),t=e&&this.wgetParamsFromCatalogData(e);t&&this.executeCommand(`wget`,t)}onSelectionChanged(e){let t=e.detail.selection[0].model;l.set(t.data)}renderContextMenu(){let e=s.get()instanceof g?l.get():void 0;return p`
            <lyra-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!(e&&`url`in e&&e.url)}
                .action=${()=>this.runWgetForSelection()}
            >Checkout</lyra-command>
        `}setAllExpanded(e){let t=this.treeRef.value;t&&t.querySelectorAll(`wa-tree-item`).forEach(t=>{t.expanded=e})}refresh(){this.rebuildTree()}createTreeItems(e,t=!1){return e?p`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${e}
                ?expanded=${t}
            >
                <span>${o(e.icon)} ${e.label}</span>
                ${e.children?.map(e=>this.createTreeItems(e))}
            </wa-tree-item>
        `:p``}renderContent(){return p`
            <wa-tree
                ${n(this.treeRef)}
                @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                style="--indent-guide-width: 1px;"
            >
                ${this.rootNodes?.map(e=>this.createTreeItems(e,!0))}
            </wa-tree>
        `}static{this.styles=u`
        :host {
            display: flex;
            flex-direction: column;
        }
    `}};d([r()],v.prototype,`rootNodes`,void 0),v=g=d([a(`lyra-catalog`)],v),i.registerContribution(h,{name:`catalog`,label:`Catalog`,icon:`book`,component:e=>p`<lyra-catalog id="${e}"></lyra-catalog>`});